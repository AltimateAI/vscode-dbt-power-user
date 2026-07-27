import * as path from "path";
import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  commands,
  Disposable,
  Event,
  EventEmitter,
  extensions,
  ProviderResult,
  Range,
  TextDocument,
  Uri,
  window,
} from "vscode";
import { CST, LineCounter, Parser } from "yaml";
import { AltimateCodeChatService } from "../services/altimateCodeChatService";

interface GitChange {
  uri: Uri;
}

interface GitRepoState {
  workingTreeChanges: GitChange[];
  indexChanges: GitChange[];
  onDidChange: Event<void>;
}

interface GitRepository {
  state: GitRepoState;
}

interface GitAPI {
  repositories: GitRepository[];
  onDidOpenRepository: Event<GitRepository>;
}

export class SqlActionsCodeLensProvider
  implements CodeLensProvider, Disposable
{
  private _onDidChangeCodeLenses = new EventEmitter<void>();
  readonly onDidChangeCodeLenses: Event<void> =
    this._onDidChangeCodeLenses.event;
  private disposables: Disposable[] = [];
  private changedFiles = new Set<string>();
  private gitWatcherInitialized = false;

  constructor(private altimateCodeChatService: AltimateCodeChatService) {
    // Git watching is initialized lazily (see `ensureGitWatcher`, called from
    // `provideCodeLenses`) rather than here. This provider is constructed during
    // extension activation, which races the built-in Git extension's own model
    // initialization — `getAPI(1)` throws "Git model not found" in that window.
    // Git is only needed to gate a single codelens ("Review changes with
    // Altimate") on files with uncommitted changes, so we don't need it until a
    // SQL/YAML file is actually opened — by which point git has activated and
    // the race is gone.
    this.disposables.push(
      window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
          const isChanged = this.changedFiles.has(editor.document.uri.fsPath);
          commands.executeCommand(
            "setContext",
            "dbtPowerUser.fileHasGitChanges",
            isChanged,
          );
        }
      }),
    );
    this.disposables.push(
      commands.registerCommand(
        "dbtPowerUser.reviewCodeWithAltimate",
        async (uri?: Uri) => {
          const docUri = uri ?? window.activeTextEditor?.document.uri;
          if (!docUri) {
            return;
          }
          const filename = path.basename(docUri.fsPath);
          const relativePath =
            this.altimateCodeChatService.getRelativePath(docUri);
          await this.altimateCodeChatService.openChat({
            initialMessage: `Review \`@${relativePath}\` for dbt best practices, performance, and maintainability.`,
            title: `Review: ${filename}`,
          });
        },
      ),
    );
  }

  private ensureGitWatcher() {
    // Init exactly once, on first codelens request. The flag is set up front so
    // a failed/racing attempt never re-attaches duplicate watchers.
    if (this.gitWatcherInitialized) {
      return;
    }
    this.gitWatcherInitialized = true;
    this.initGitWatcher();
  }

  private initGitWatcher() {
    const gitExt = extensions.getExtension("vscode.git");
    if (!gitExt) {
      return;
    }
    if (!gitExt.isActive) {
      gitExt.activate().then(
        () => this.watchGitState(),
        () => {
          // Git extension failed to activate — codelens git decorations are
          // best-effort, so skip silently rather than leaking an unhandled
          // rejection.
        },
      );
      return;
    }
    this.watchGitState();
  }

  private watchGitState() {
    let git: GitAPI | undefined;
    try {
      git = extensions.getExtension("vscode.git")?.exports?.getAPI(1);
    } catch {
      // The built-in Git extension's getAPI(1) throws "Git model not found"
      // when its model isn't initialized yet (lazy-activation race) or git is
      // disabled. Git codelens decorations are best-effort — skip silently
      // instead of surfacing an unhandled rejection (catchAllError).
      return;
    }
    if (!git) {
      return;
    }

    for (const repo of git.repositories) {
      this.attachRepoWatcher(repo);
    }

    this.disposables.push(
      git.onDidOpenRepository((repo: GitRepository) => {
        this.attachRepoWatcher(repo);
      }),
    );
  }

  private attachRepoWatcher(repo: GitRepository) {
    this.updateChangedFiles(repo);
    this.disposables.push(
      repo.state.onDidChange(() => {
        this.updateChangedFiles(repo);
        this._onDidChangeCodeLenses.fire();
        // Update context key for the active editor
        const activeUri = window.activeTextEditor?.document.uri;
        if (activeUri) {
          commands.executeCommand(
            "setContext",
            "dbtPowerUser.fileHasGitChanges",
            this.changedFiles.has(activeUri.fsPath),
          );
        }
      }),
    );
  }

  private updateChangedFiles(repo: GitRepository) {
    const allChanges = [
      ...repo.state.workingTreeChanges,
      ...repo.state.indexChanges,
    ];
    for (const change of allChanges) {
      this.changedFiles.add(change.uri.fsPath);
    }
    const currentPaths = new Set(allChanges.map((c) => c.uri.fsPath));
    for (const p of this.changedFiles) {
      if (!currentPaths.has(p)) {
        this.changedFiles.delete(p);
      }
    }
  }

  provideCodeLenses(
    document: TextDocument,
    _token: CancellationToken,
  ): ProviderResult<CodeLens[]> {
    // Lazily start watching git the first time codelenses are requested — by
    // now the Git extension has activated, so `getAPI(1)` won't throw.
    this.ensureGitWatcher();
    if (document.fileName.endsWith(".sql")) {
      return this.provideSqlCodeLenses(document);
    }
    return this.provideYamlCodeLenses(document);
  }

  private provideSqlCodeLenses(document: TextDocument): CodeLens[] {
    const codeLenses: CodeLens[] = [
      new CodeLens(new Range(0, 0, 0, 0), {
        title: "$(play) Execute Query",
        tooltip: "Execute this SQL query",
        command: "dbtPowerUser.executeSQL",
        arguments: [],
      }),
      new CodeLens(new Range(0, 0, 0, 0), {
        title: "$(sparkle) Explain",
        tooltip: "Explain this code with Altimate",
        command: "dbtPowerUser.explainWithAltimate",
        arguments: [],
      }),
      new CodeLens(new Range(0, 0, 0, 0), {
        title: "$(zap) Optimize",
        tooltip: "Optimize this SQL with Altimate",
        command: "dbtPowerUser.optimizeWithAltimate",
        arguments: [],
      }),
      new CodeLens(new Range(0, 0, 0, 0), {
        title: "$(book) Document",
        tooltip: "Add documentation or tests for this model",
        command: "dbtPowerUser.DocsEdit.focus",
        arguments: [],
      }),
    ];

    if (this.changedFiles.has(document.uri.fsPath)) {
      codeLenses.push(
        new CodeLens(new Range(0, 0, 0, 0), {
          title: "$(sparkle) Review",
          tooltip: "Review code changes with Altimate",
          command: "dbtPowerUser.reviewCodeWithAltimate",
          arguments: [document.uri],
        }),
      );
    }

    return codeLenses;
  }

  private provideYamlCodeLenses(document: TextDocument): CodeLens[] {
    const codeLenses: CodeLens[] = [];
    const lineCounter = new LineCounter();
    for (const token of new Parser(lineCounter.addNewLine).parse(
      document.getText(),
    )) {
      if (!(token.type === "document" && CST.isCollection(token.value))) {
        continue;
      }
      for (const item of token.value.items) {
        if (
          !(
            CST.isScalar(item.key) &&
            item.key.source === "models" &&
            CST.isCollection(item.value)
          )
        ) {
          continue;
        }
        for (const modelItem of item.value.items) {
          if (!CST.isCollection(modelItem.value)) {
            continue;
          }
          for (const properties of modelItem.value.items) {
            if (
              CST.isScalar(properties.key) &&
              CST.isScalar(properties.value) &&
              properties.key.source === "name"
            ) {
              const position = lineCounter.linePos(properties.key.offset);
              const lensRange = new Range(
                position.line - 1,
                position.col,
                position.line - 1,
                position.col,
              );
              codeLenses.push(
                new CodeLens(lensRange, {
                  title: "$(play) Run",
                  tooltip: `Run model ${properties.value.source}`,
                  command: "dbtPowerUser.yamlRunModel",
                  arguments: [document.uri, properties.value.source],
                }),
                new CodeLens(lensRange, {
                  title: "$(beaker) Test",
                  tooltip: `Run tests for model ${properties.value.source}`,
                  command: "dbtPowerUser.yamlTestModel",
                  arguments: [document.uri, properties.value.source],
                }),
                new CodeLens(lensRange, {
                  title: "$(book) Document",
                  tooltip: "Add documentation or tests for this model",
                  command: "dbtPowerUser.showDocumentation",
                  arguments: [properties.value.source],
                }),
              );
            }
          }
        }
      }
    }

    if (this.changedFiles.has(document.uri.fsPath)) {
      codeLenses.unshift(
        new CodeLens(new Range(0, 0, 0, 0), {
          title: "$(sparkle) Review",
          tooltip: "Review code changes with Altimate",
          command: "dbtPowerUser.reviewCodeWithAltimate",
          arguments: [document.uri],
        }),
      );
    }

    return codeLenses;
  }

  dispose() {
    this._onDidChangeCodeLenses.dispose();
    while (this.disposables.length) {
      this.disposables.pop()?.dispose();
    }
  }
}
