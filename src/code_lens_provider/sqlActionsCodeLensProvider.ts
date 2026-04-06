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

  constructor(private altimateCodeChatService: AltimateCodeChatService) {
    this.initGitWatcher();
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

  private initGitWatcher() {
    const gitExt = extensions.getExtension("vscode.git");
    if (!gitExt) {
      return;
    }
    if (!gitExt.isActive) {
      gitExt.activate().then(() => this.watchGitState());
      return;
    }
    this.watchGitState();
  }

  private watchGitState() {
    const git: GitAPI | undefined = extensions
      .getExtension("vscode.git")
      ?.exports?.getAPI(1);
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
              codeLenses.push(
                new CodeLens(
                  new Range(
                    position.line - 1,
                    position.col,
                    position.line - 1,
                    position.col,
                  ),
                  {
                    title: "Add documentation or tests",
                    tooltip: "Add documentation or tests for this model",
                    command: "dbtPowerUser.showDocumentation",
                    arguments: [properties.value.source],
                  },
                ),
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
