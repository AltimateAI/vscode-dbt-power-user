import * as os from "os";
import {
  commands,
  CommentReply,
  CommentThread,
  Disposable,
  languages,
  TextEditor,
  ViewColumn,
  window,
  workspace,
  version,
  extensions,
  Uri,
  Range,
  ProgressLocation,
  TextEditorDecorationType,
  DecorationRangeBehavior,
  WorkspaceEdit,
  NotebookCellData,
  NotebookCellKind,
  NotebookRange,
  NotebookEdit,
} from "vscode";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";
import { RunModelType } from "../domain";
import {
  deepEqual,
  extendErrorWithSupportLinks,
  getFirstWorkspacePath,
  getFormattedDateTime,
  provideSingleton,
} from "../utils";
import { RunModel } from "./runModel";
import { SqlToModel } from "./sqlToModel";
import { AltimateScan } from "./altimateScan";
import { WalkthroughCommands } from "./walkthroughCommands";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ProjectQuickPickItem } from "../quickpick/projectQuickPick";
import { ValidateSql } from "./validateSql";
import { BigQueryCostEstimate } from "./bigQueryCostEstimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { SharedStateService } from "../services/sharedStateService";
import {
  ConversationProvider,
  ConversationCommentThread,
} from "../comment_provider/conversationProvider";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { DBTClient } from "../dbt_client";
import { existsSync, readFileSync } from "fs";
import { DBTProject } from "../manifest/dbtProject";
import { SQLLineagePanel } from "../webview_provider/sqlLineagePanel";
import { QueryManifestService } from "../services/queryManifestService";
import { NotebookFileSystemProvider } from "../file_system_providers/notebookFileSystemProvider";
import { join } from "path";
import {
  RawNotebook,
  RawNotebookCell,
} from "../notebook_provider/sampleSerializer";

@provideSingleton(VSCodeCommands)
export class VSCodeCommands implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private runModel: RunModel,
    private sqlToModel: SqlToModel,
    private validateSql: ValidateSql,
    private altimateScan: AltimateScan,
    private walkthroughCommands: WalkthroughCommands,
    private bigQueryCostEstimate: BigQueryCostEstimate,
    private dbtTerminal: DBTTerminal,
    private eventEmitterService: SharedStateService,
    private conversationController: ConversationProvider,
    private pythonEnvironment: PythonEnvironment,
    private dbtClient: DBTClient,
    private sqlLineagePanel: SQLLineagePanel,
    private queryManifestService: QueryManifestService,
  ) {
    this.disposables.push(
      commands.registerCommand(
        "dbtPowerUser.checkIfDbtIsInstalled",
        async () => {
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        },
      ),
      commands.registerCommand("dbtPowerUser.installDbt", () =>
        this.walkthroughCommands.installDbt(),
      ),
      commands.registerCommand("dbtPowerUser.runCurrentModel", () =>
        this.runModel.runModelOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.testCurrentModel", () =>
        this.runModel.runTestsOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.compileCurrentModel", () =>
        this.runModel.compileModelOnActiveWindow(),
      ),
      commands.registerCommand(
        "dbtPowerUser.bigqueryCostEstimate",
        ({ returnResult }: { returnResult?: boolean }) =>
          this.bigQueryCostEstimate.estimateCost({ returnResult }),
      ),
      commands.registerTextEditorCommand(
        "dbtPowerUser.sqlPreview",
        async (editor: TextEditor) => {
          const uri = editor.document.uri.with({
            scheme: SqlPreviewContentProvider.SCHEME,
          });
          const doc = await workspace.openTextDocument(uri);
          const isOpen = window.visibleTextEditors.some(
            (e) => e.document.uri === uri,
          );
          await window.showTextDocument(doc, ViewColumn.Beside, false);
          await languages.setTextDocumentLanguage(doc, "sql");
          if (!isOpen) {
            await commands.executeCommand("workbench.action.lockEditorGroup");
            await commands.executeCommand(
              "workbench.action.focusPreviousGroup",
            );
          } else {
            await commands.executeCommand("workbench.action.closeActiveEditor");
            return;
          }
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.goToDocumentationEditor",
        async () => {
          await commands.executeCommand(
            "workbench.view.extension.docs_edit_view",
          );
        },
      ),
      commands.registerCommand("dbtPowerUser.runTest", (model) =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.TEST)(model),
      ),
      commands.registerCommand("dbtPowerUser.runChildrenModels", (model) =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.RUN_CHILDREN)(model),
      ),
      commands.registerCommand("dbtPowerUser.runParentModels", (model) =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.RUN_PARENTS)(model),
      ),
      commands.registerCommand("dbtPowerUser.showRunSQL", () =>
        this.runModel.showRunSQLOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.showCompiledSQL", () =>
        this.runModel.showCompiledSQLOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.generateSchemaYML", () =>
        this.runModel.generateSchemaYMLOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.generateDBTDocs", () =>
        this.runModel.generateDBTDocsOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.executeSQL", () =>
        this.runModel.executeQueryOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.summarizeQuery", () =>
        this.eventEmitterService.fire({
          command: "dbtPowerUser.summarizeQuery",
          payload: {},
        }),
      ),
      commands.registerCommand("dbtPowerUser.changeQuery", () =>
        this.eventEmitterService.fire({
          command: "dbtPowerUser.changeQuery",
          payload: {},
        }),
      ),
      commands.registerCommand("dbtPowerUser.translateQuery", () =>
        this.eventEmitterService.fire({
          command: "dbtPowerUser.translateQuery",
          payload: {},
        }),
      ),
      commands.registerCommand(
        "dbtPowerUser.createModelBasedonSourceConfig",
        (params) => {
          this.runModel.createModelBasedonSourceConfig(params);
        },
      ),
      commands.registerCommand("dbtPowerUser.buildCurrentModel", () =>
        this.runModel.buildModelOnActiveWindow(),
      ),
      commands.registerCommand("dbtPowerUser.buildCurrentProject", () => {
        if (!window.activeTextEditor) {
          return;
        }
        const activeFileUri = window.activeTextEditor.document.uri;
        if (!activeFileUri) {
          this.dbtTerminal.debug(
            "buildCurrentProject",
            "skipping buildCurrentProject without active file",
          );
          return;
        }

        const dbtProject =
          this.dbtProjectContainer.findDBTProject(activeFileUri);
        if (!dbtProject) {
          this.dbtTerminal.debug(
            "buildCurrentProject",
            `buildCurrentProject unable to find dbtproject by active file: ${activeFileUri.path}`,
          );
          return;
        }
        this.dbtTerminal.debug(
          "buildCurrentProject",
          `building current project: ${dbtProject.getProjectName()} with active file: ${
            activeFileUri.path
          }`,
        );

        dbtProject.buildProject();
      }),
      commands.registerCommand("dbtPowerUser.buildChildrenModels", () =>
        this.runModel.buildModelOnActiveWindow(RunModelType.BUILD_CHILDREN),
      ),
      commands.registerCommand("dbtPowerUser.buildParentModels", () =>
        this.runModel.buildModelOnActiveWindow(RunModelType.BUILD_PARENTS),
      ),
      commands.registerCommand("dbtPowerUser.buildChildrenParentModels", () =>
        this.runModel.buildModelOnActiveWindow(
          RunModelType.BUILD_CHILDREN_PARENTS,
        ),
      ),
      commands.registerCommand("dbtPowerUser.sqlToModel", () =>
        this.sqlToModel.getModelFromSql(),
      ),
      commands.registerCommand("dbtPowerUser.validateSql", () =>
        this.validateSql.validateSql(),
      ),
      commands.registerCommand("dbtPowerUser.altimateScan", () =>
        this.altimateScan.getProblems(),
      ),
      commands.registerCommand("dbtPowerUser.clearAltimateScanResults", () =>
        this.altimateScan.clearProblems(),
      ),
      commands.registerCommand(
        "dbtPowerUser.switchDbtIntegration",
        async () => {
          const dbtIntegration = workspace
            .getConfiguration("dbt")
            .get<string>("dbtIntegration", "core");
          const target = dbtIntegration === "cloud" ? "core" : "cloud";
          const message = `Switching to dbt ${target} requires reloading the window, any unsaved changes will be lost.`;
          const answer = await window.showInformationMessage(
            message,
            "Confirm",
          );
          if (answer === "Confirm") {
            await workspace
              .getConfiguration("dbt")
              .update(
                "dbtIntegration",
                dbtIntegration === "cloud" ? "core" : "cloud",
              );
            await commands.executeCommand("workbench.action.reloadWindow");
          }
        },
      ),
      commands.registerCommand("dbtPowerUser.validateProject", () => {
        const pickedProject: ProjectQuickPickItem | undefined =
          this.dbtProjectContainer.getFromWorkspaceState(
            "dbtPowerUser.projectSelected",
          );

        this.walkthroughCommands.validateProjects(pickedProject);
      }),
      commands.registerCommand("dbtPowerUser.installDeps", () => {
        this.dbtProjectContainer.setToGlobalState(
          "showSetupWalkthrough",
          false,
        );

        const pickedProject: ProjectQuickPickItem | undefined =
          this.dbtProjectContainer.getFromWorkspaceState(
            "dbtPowerUser.projectSelected",
          );
        this.walkthroughCommands.installDeps(pickedProject);
      }),
      commands.registerCommand(
        "dbtPowerUser.openSetupWalkthrough",
        async () => {
          await commands.executeCommand("workbench.action.openWalkthrough");
          commands.executeCommand(
            "workbench.action.openWalkthrough",
            `${this.dbtProjectContainer.extensionId}#initialSetup`,
            true,
          );
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.openTutorialWalkthrough",
        async () => {
          await commands.executeCommand("workbench.action.openWalkthrough");
          commands.executeCommand(
            "workbench.action.openWalkthrough",
            `${this.dbtProjectContainer.extensionId}#tutorials`,
            false,
          );
        },
      ),
      commands.registerCommand("dbtPowerUser.associateFileExts", async () => {
        commands.executeCommand(
          "workbench.action.openSettings",
          "@id:files.associations",
        );
      }),
      commands.registerCommand("dbtPowerUser.openDatapilotWithQuery", () =>
        this.eventEmitterService.fire({
          command: "dbtPowerUser.openDatapilotWithQuery",
          payload: {},
        }),
      ),
      commands.registerCommand("dbtPowerUser.showHelpDatapilot", () =>
        this.eventEmitterService.fire({
          command: "dbtPowerUser.openHelpInDatapilot",
          payload: {},
        }),
      ),
      commands.registerCommand(
        "dbtPowerUser.createConversation",
        (reply: CommentReply) => {
          try {
            this.conversationController.createConversation(reply);
          } catch (err) {
            window.showErrorMessage(
              extendErrorWithSupportLinks((err as Error).message),
            );
          }
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.replyToConversation",
        (reply: CommentReply) => {
          try {
            this.conversationController.replyToConversation(reply);
          } catch (err) {
            window.showErrorMessage(
              extendErrorWithSupportLinks((err as Error).message),
            );
          }
        },
      ),

      commands.registerCommand(
        "dbtPowerUser.resolveConversation",
        (thread: CommentThread) => {
          try {
            this.conversationController.resolveConversation(
              thread as ConversationCommentThread,
            );
          } catch (err) {
            window.showErrorMessage(
              extendErrorWithSupportLinks((err as Error).message),
            );
          }
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.copyDbtDocsLink",
        (thread: CommentThread) => {
          try {
            this.conversationController.copyThreadLink(
              thread as ConversationCommentThread,
            );
          } catch (err) {
            window.showErrorMessage(
              extendErrorWithSupportLinks((err as Error).message),
            );
          }
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.viewInDocEditor",
        (thread: CommentThread) => {
          try {
            this.conversationController.viewInDocEditor(
              thread as ConversationCommentThread,
            );
          } catch (err) {
            window.showErrorMessage(
              extendErrorWithSupportLinks((err as Error).message),
            );
          }
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.viewInDbtDocs",
        (thread: CommentThread) => {
          try {
            this.conversationController.viewInDbtDocs(
              thread as ConversationCommentThread,
            );
          } catch (err) {
            window.showErrorMessage(
              extendErrorWithSupportLinks((err as Error).message),
            );
          }
        },
      ),
      commands.registerCommand("dbtPowerUser.printEnvVars", () =>
        this.pythonEnvironment.printEnvVars(),
      ),
      commands.registerCommand("dbtPowerUser.diagnostics", async () => {
        try {
          await this.dbtTerminal.show(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          this.dbtTerminal.logLine("Diagnostics started...");
          this.dbtTerminal.logNewLine();

          // Printing env vars
          this.dbtTerminal.logBlockWithHeader(
            [
              "Printing environment variables...",
              "* Please remove any sensitive information before sending it to us",
            ],
            Object.entries(this.pythonEnvironment.environmentVariables).map(
              ([key, value]) => `${key}=${value}`,
            ),
          );
          this.dbtTerminal.logNewLine();

          // Printing env vars
          this.dbtTerminal.logBlockWithHeader(
            [
              "Printing all python paths...",
              "* Please remove any sensitive information before sending it to us",
            ],
            this.pythonEnvironment.allPythonPaths.map(({ path }) => path),
          );
          this.dbtTerminal.logNewLine();

          // Printing extension settings
          const dbtSettings = workspace.getConfiguration().inspect("dbt");
          const globalValue: any = dbtSettings?.globalValue || {};
          const defaultValue: any = dbtSettings?.defaultValue || {};
          const workspaceValue: any = dbtSettings?.workspaceValue || {};
          const settingKeys = [
            ...Object.keys(globalValue),
            ...Object.keys(defaultValue),
            ...Object.keys(workspaceValue),
          ];
          this.dbtTerminal.logBlockWithHeader(
            [
              "Printing extension settings...",
              "* Please remove any sensitive information before sending it to us",
            ],
            settingKeys.map((key) => {
              const value = workspace.getConfiguration("dbt").get(key);
              let overridenText = "";
              if (!deepEqual(value, defaultValue[key])) {
                if (deepEqual(value, workspaceValue[key])) {
                  overridenText = `${key} is overridden in workspace settings`;
                } else if (deepEqual(value, globalValue[key])) {
                  overridenText = `${key} is overridden in user settings`;
                }
              }

              const valueText =
                Array.isArray(value) || typeof value === "object"
                  ? JSON.stringify(value)
                  : value;
              return `${key}=${valueText}\t\t${overridenText}`;
            }),
          );
          this.dbtTerminal.logNewLine();

          // Printing extension and setup info
          const dbtIntegrationMode = workspace
            .getConfiguration("dbt")
            .get<string>("dbtIntegration", "core");
          const allowListFolders = workspace
            .getConfiguration("dbt")
            .get<string[]>("allowListFolders", []);
          this.dbtTerminal.logBlock([
            `Python Path=${this.pythonEnvironment.pythonPath}`,
            `VSCode version=${version}`,
            `Extension version=${
              extensions.getExtension("innoverio.vscode-dbt-power-user")
                ?.packageJSON?.version
            }`,
            `DBT integration mode=${dbtIntegrationMode}`,
            `First workspace path=${getFirstWorkspacePath()}`,
            `AllowList Folders=${allowListFolders}`,
          ]);
          this.dbtTerminal.logNewLine();

          if (!this.dbtClient.pythonInstalled) {
            this.dbtTerminal.logLine("Python is not installed");
            this.dbtTerminal.logLine(
              "Can't proceed further without fixing python installation",
            );
            return;
          }
          this.dbtTerminal.logLine("Python is installed");
          if (!this.dbtClient.dbtInstalled) {
            this.dbtTerminal.logLine("DBT is not installed");
            this.dbtTerminal.logLine(
              "Can't proceed further without fixing dbt installation",
            );
            return;
          }
          this.dbtTerminal.logLine("DBT is installed");
          const dbtWorkspaces = this.dbtProjectContainer.dbtWorkspaceFolders;
          this.dbtTerminal.logLine(
            `Number of workspaces=${dbtWorkspaces.length}`,
          );
          for (const w of dbtWorkspaces) {
            this.dbtTerminal.logHorizontalRule();
            this.dbtTerminal.logLine(
              `Workspace Path=${w.workspaceFolder.uri.fsPath}`,
            );
            this.dbtTerminal.logLine(`Adapters=${w.getAdapters()}`);
            this.dbtTerminal.logLine(
              `AllowList Folders=${w.getAllowListFolders()}`,
            );
            w.projectDiscoveryDiagnostics.forEach((uri, diagnostics) => {
              this.dbtTerminal.logLine(`Problems for ${uri.fsPath}`);
              diagnostics.forEach((d) => {
                this.dbtTerminal.logLine(
                  `source=${d.source}\tmessage=${d.message}`,
                );
              });
            });
            this.dbtTerminal.logHorizontalRule();
          }

          const projects = this.dbtProjectContainer.getProjects();
          this.dbtTerminal.logLine(`Number of projects=${projects.length}`);
          if (projects.length === 0) {
            this.dbtTerminal.logLine("No project detected");
            this.dbtTerminal.logLine("Can't proceed further without project");
            return;
          }
          this.dbtTerminal.logNewLine();

          for (const project of projects) {
            try {
              this.dbtTerminal.logHorizontalRule();
              this.dbtTerminal.logLine(
                `Printing information for ${project.getProjectName()}`,
              );
              this.dbtTerminal.logHorizontalRule();
              await this.printProjectInfo(project);
            } catch (e) {
              this.dbtTerminal.logNewLine();
              this.dbtTerminal.logLine(
                "Failed to print all the info for the project...",
              );
              this.dbtTerminal.logLine(`Error=${e}`);
            } finally {
              this.dbtTerminal.logHorizontalRule();
            }
          }
          this.dbtTerminal.logNewLine();
          this.dbtTerminal.logLine("Diagnostics completed successfully...");
        } catch (e) {
          this.dbtTerminal.logNewLine();
          this.dbtTerminal.logLine("Diagnostics ended with error...");
          this.dbtTerminal.logLine(`Error=${e}`);
        }
      }),
      commands.registerCommand(
        "dbtPowerUser.createJinjaSqlNotebook",
        async (
          args: { notebookId?: string; fileName?: string } | undefined,
        ) => {
          const { notebookId, fileName } = args || {};
          // TODO: is this needed
          // workspace.updateWorkspaceFolders(0, 0, {
          //   uri: Uri.parse("memfs:/"),
          //   name: "MemFS - Sample",
          // });
          const project =
            await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!project) {
            window.showErrorMessage("No dbt project selected.");
            return;
          }

          const memFs = new NotebookFileSystemProvider();
          const fileNamePrefix = notebookId || fileName || "poweruser";
          const uri = Uri.parse(
            `${project.projectRoot}/${fileNamePrefix}.notebook`,
          ).with({ scheme: "untitled" });
          //         const hashedProjectRoot = DBTProject.hashProjectRoot(project.projectRoot.fsPath);
          // const tempFolder = join(os.tmpdir(), hashedProjectRoot);

          // const uri = Uri.parse(`${tempFolder}/untitled.notebook`, true).with({ scheme: "memfs" });;
          // await memFs.writeFile(uri, Buffer.from(''), { create: true, overwrite: true });
          workspace.openNotebookDocument(uri).then((doc) => {
            // set this to sql language so we can bind codelens and other features
            // languages.setTextDocumentLanguage(doc, "jinja-sql");
            window.showNotebookDocument(doc).then((editor) => {
              if (!notebookId) {
                return;
              }
              const notebooks =
                this.dbtProjectContainer.getFromGlobalState("notebooks") || {};
              const contents = notebooks[notebookId];

              let raw: RawNotebookCell[];
              try {
                raw = (<RawNotebook>JSON.parse(contents)).cells;
              } catch {
                raw = [
                  {
                    cell_type: "code",
                    source: [],
                  },
                ];
              }

              const cellData = raw.map(
                (item) =>
                  new NotebookCellData(
                    NotebookCellKind.Code,
                    item.source?.join("\n"),
                    "jinja-sql",
                  ),
              );

              // Get the active notebook editor
              const notebookEditor = window.activeNotebookEditor;
              if (notebookEditor) {
                // Create notebook cells
                const cells = cellData.map(
                  (data) =>
                    new NotebookCellData(
                      data.kind,
                      data.value,
                      data.languageId,
                    ),
                );

                // Apply the cell data to the notebook
                const edit = new WorkspaceEdit();
                // edit.replace(notebookEditor.notebook.uri, new NotebookEdit(new NotebookRange(0, 0), cells));
                edit.set(notebookEditor.notebook.uri, [
                  new NotebookEdit(new NotebookRange(0, 0), cells),
                ]);
                workspace.applyEdit(edit);
              }
            });
          });
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.createSqlFile",
        async (args: { code?: string; fileName?: string } | undefined) => {
          const { code, fileName } = args || {};
          try {
            const project =
              await this.queryManifestService.getOrPickProjectFromWorkspace();
            if (!project) {
              window.showErrorMessage("No dbt project selected.");
              return;
            }

            const fileNamePrefix = fileName || "poweruser";
            const uri = Uri.parse(
              `${project.projectRoot}/${fileNamePrefix}-${getFormattedDateTime()}.sql`,
            ).with({ scheme: "untitled" });
            const annotationDecoration: TextEditorDecorationType =
              window.createTextEditorDecorationType({
                rangeBehavior: DecorationRangeBehavior.OpenOpen,
              });

            const contentText =
              "Enter your query here and execute it just like any dbt model file. This file is unsaved, you can either save it to your project or save it as a bookmark for later usage or share it with your team members.";

            const decorations = [
              {
                renderOptions: {
                  before: {
                    color: "#666666",
                    contentText,
                    // hacking to add more css properties
                    width: "90%;display: block;white-space: pre-line;",
                  },
                },
                range: new Range(2, 0, 2, 0),
              },
            ];

            workspace.openTextDocument(uri).then((doc) => {
              // set this to sql language so we can bind codelens and other features
              languages.setTextDocumentLanguage(doc, "jinja-sql");
              window.showTextDocument(doc).then((editor) => {
                editor.edit((editBuilder) => {
                  const entireDocumentRange = new Range(
                    doc.positionAt(0),
                    doc.positionAt(doc.getText().length),
                  );
                  editBuilder.replace(entireDocumentRange, code || "\n");

                  editor.setDecorations(annotationDecoration, decorations);
                  setTimeout(() => {
                    commands.executeCommand("cursorMove", {
                      to: "up",
                      by: "line",
                      value: 1,
                    });
                  }, 0);
                  const disposable = workspace.onDidChangeTextDocument((e) => {
                    const activeEditor = window.activeTextEditor;
                    if (activeEditor && e.document === editor.document) {
                      if (activeEditor.document.getText().trim()) {
                        activeEditor.setDecorations(annotationDecoration, []);
                        disposable.dispose();
                      }
                    }
                  });
                });
              });
            });
          } catch (e) {
            const message = (e as Error).message;
            this.dbtTerminal.error("createSqlFile", message, e, true);
            window.showErrorMessage(message);
          }
        },
      ),
      commands.registerCommand("dbtPowerUser.sqlLineage", async () => {
        window.withProgress(
          {
            title: "Retrieving SQL visualization",
            location: ProgressLocation.Notification,
            cancellable: false,
          },
          async (_, token) => {
            try {
              const modelName = this.sqlLineagePanel.getActiveEditorFilename();
              const lineage = await this.sqlLineagePanel.getSQLLineage(token);
              const panel = window.createWebviewPanel(
                SQLLineagePanel.viewType,
                `${modelName} - visualization`,
                ViewColumn.Two,
                { retainContextWhenHidden: true, enableScripts: true },
              );
              this.sqlLineagePanel.resolveWebviewView(panel, lineage);
            } catch (e) {
              const errorMessage = (e as Error)?.message;
              this.dbtTerminal.error("sqlLineage", errorMessage, e, true);
              window.showErrorMessage(errorMessage);
            }
          },
        );
      }),
    );
  }

  private async printProjectInfo(project: DBTProject) {
    this.dbtTerminal.logLine(`Project Name=${project.getProjectName()}`);
    this.dbtTerminal.logLine(`Adapter Type=${project.getAdapterType()}`);

    const dbtVersion = project.getDBTVersion();
    if (!dbtVersion) {
      this.dbtTerminal.logLine("DBT is not initialized properly");
    } else {
      this.dbtTerminal.logLine(`DBT version=${dbtVersion.join(".")}`);
    }

    if (!project.getPythonBridgeStatus()) {
      this.dbtTerminal.logLine("Python bridge is not connected");
    } else {
      this.dbtTerminal.logLine("Python bridge is connected");
    }

    this.dbtTerminal.logNewLine();

    const paths = [
      {
        pathType: "DBT Project File",
        path: project.getDBTProjectFilePath(),
      },
      { pathType: "Target", path: project.getTargetPath() },
      {
        pathType: "PackageInstall",
        path: project.getPackageInstallPath(),
      },
      { pathType: "Manifest", path: project.getManifestPath() },
      { pathType: "Catalog", path: project.getCatalogPath() },
      ...(project.getModelPaths() || []).map((path) => ({
        pathType: "Model",
        path,
      })),
      ...(project.getSeedPaths() || []).map((path) => ({
        pathType: "Seed",
        path,
      })),
      ...(project.getMacroPaths() || []).map((path) => ({
        pathType: "Macro",
        path,
      })),
    ];

    for (const p of paths) {
      if (!p.path) {
        this.dbtTerminal.logLine(`${p.pathType} path not found`);
        continue;
      }
      let line = `${p.pathType} path=${p.path}\t\t`;
      if (!existsSync(p.path)) {
        line += "File doesn't exists at location";
      } else {
        line += "File exists at location";
      }
      this.dbtTerminal.logLine(line);
    }

    const dbtProjectFilePath = project.getDBTProjectFilePath();
    if (existsSync(dbtProjectFilePath)) {
      this.dbtTerminal.logNewLine();
      this.dbtTerminal.logNewLine();
      this.dbtTerminal.logLine("dbt_project.yml");
      this.dbtTerminal.logHorizontalRule();
      const fileContent = readFileSync(dbtProjectFilePath, "utf8");
      this.dbtTerminal.logLine(fileContent.replace(/\n/g, "\r\n"));
      this.dbtTerminal.logHorizontalRule();
    }

    this.dbtTerminal.logNewLine();
    const diagnostics = project.getAllDiagnostic();
    this.dbtTerminal.logLine(
      `Number of diagnostics issues=${diagnostics.length}`,
    );
    for (const d of diagnostics) {
      this.dbtTerminal.logLine(d.message);
    }
    await project.debug();
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
