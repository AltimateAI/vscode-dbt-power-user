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
  env,
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
import { AltimateRequest } from "../altimate";
import { DatapilotNotebookController, OpenNotebookRequest } from "@lib";
import { NotebookQuickPick } from "../quickpick/notebookQuickPick";
import { CteInfo } from "../code_lens_provider/cteCodeLensProvider";

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
    private altimate: AltimateRequest,
    private notebookController: DatapilotNotebookController,
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
      commands.registerCommand("dbtPowerUser.copyModelName", (model) =>
        env.clipboard.writeText(model.label.toString()),
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
      commands.registerCommand(
        "dbtPowerUser.runSelectedQuery",
        (uri: Uri, range: Range) => this.runSelectedQuery(uri, range),
      ),
      commands.registerCommand(
        "dbtPowerUser.runCteWithDependencies",
        (uri: Uri, cteIndex: number, ctes: CteInfo[]) =>
          this.runCteWithDependencies(uri, cteIndex, ctes),
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
      commands.registerCommand("dbtPowerUser.cleanCurrentProject", () => {
        if (!window.activeTextEditor) {
          return;
        }
        const activeFileUri = window.activeTextEditor.document.uri;
        if (!activeFileUri) {
          this.dbtTerminal.debug(
            "cleanCurrentProject",
            "skipping cleanCurrentProject without active file",
          );
          return;
        }

        const dbtProject =
          this.dbtProjectContainer.findDBTProject(activeFileUri);
        if (!dbtProject) {
          this.dbtTerminal.debug(
            "cleanCurrentProject",
            `cleanCurrentProject unable to find dbtproject by active file: ${activeFileUri.path}`,
          );
          return;
        }
        this.dbtTerminal.debug(
          "cleanCurrentProject",
          `cleaning current project: ${dbtProject.getProjectName()} with active file: ${
            activeFileUri.path
          }`,
        );

        dbtProject.clean();
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
          const integrationModes = ["dbt core", "dbt cloud", "dbt fusion"];
          const selectedIntegrationMode = (
            await window.showQuickPick(integrationModes, {
              title: "Select your flavour of dbt",
              canPickMany: false,
            })
          )?.replace(/dbt /, "");
          if (selectedIntegrationMode === dbtIntegration) {
            return;
          }
          const message = `Switching to dbt ${selectedIntegrationMode} requires reloading the window, any unsaved changes will be lost.`;
          const answer = await window.showInformationMessage(
            message,
            "Confirm",
          );
          if (answer === "Confirm") {
            await workspace
              .getConfiguration("dbt")
              .update("dbtIntegration", selectedIntegrationMode);
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
          const apiConnectivity = await this.altimate.checkApiConnectivity();
          this.dbtTerminal.logBlock([
            `Python Path=${this.pythonEnvironment.pythonPath}`,
            `VSCode version=${version}`,
            `Extension version=${
              extensions.getExtension("innoverio.vscode-dbt-power-user")
                ?.packageJSON?.version
            }`,
            `DBT integration mode=${dbtIntegrationMode}`,
            `First workspace path=${getFirstWorkspacePath()}`,
            `Altimate API connectivity=${apiConnectivity.status}`,
            apiConnectivity.errorMsg
              ? `Altimate API connectivity error=${apiConnectivity.errorMsg}`
              : "",
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
        "dbtPowerUser.createDatapilotNotebook",
        async (args: OpenNotebookRequest | undefined) => {
          this.notebookController.createNotebook(args);
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.openTargetSelector",
        async (targets, project: DBTProject, statusBar) => {
          try {
            if (!targets) {
              return;
            }
            this.dbtTerminal.debug(
              "OpenTargetSelector",
              "Showing following targets",
              targets,
            );
            const target = await window.showQuickPick(targets, {
              title: "Select your target",
              canPickMany: false,
            });
            if (target) {
              await project.setSelectedTarget(target);
              await statusBar.updateStatusBar();
              this.dbtTerminal.info(
                "OpenTargetSelector",
                "Selecting target",
                true,
                target,
              );
            }
          } catch (error) {
            this.dbtTerminal.error(
              "OpenTargetSelector",
              "An error occurred while changing target",
              error,
            );
            window.showErrorMessage(
              "An error occurred while changing target: " + error,
            );
          }
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

            // Open a new untitled sql file by default
            let docOpenPromise = workspace.openTextDocument({
              language: "jinja-sql",
            });
            // If file name is provided, open the file in the project
            if (fileName) {
              const uri = Uri.parse(
                `${project.projectRoot}/${fileName}-${getFormattedDateTime()}.sql`,
              ).with({ scheme: "untitled" });
              docOpenPromise = workspace.openTextDocument(uri);
            }

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

            docOpenPromise.then((doc) => {
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
              this.sqlLineagePanel.renderSqlVisualizer(panel, lineage);
            } catch (e) {
              const errorMessage = (e as Error)?.message;
              this.dbtTerminal.error("sqlLineage", errorMessage, e, true);
              window.showErrorMessage(errorMessage);
            }
          },
        );
      }),
      commands.registerCommand(
        "dbtPowerUser.showDocumentation",
        async (modelName) => {
          const result = queryManifestService.getEventByCurrentProject();
          if (!result) {
            return;
          }
          const { event } = result;
          if (!event) {
            return;
          }
          const { nodeMetaMap } = event;
          const model = nodeMetaMap.lookupByBaseName(modelName);
          if (!model?.path) {
            return;
          }
          const doc = await workspace.openTextDocument(Uri.file(model.path));
          await window.showTextDocument(doc);
          await commands.executeCommand("dbtPowerUser.DocsEdit.focus");
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.showDatapilotNotebooksQuickPick",
        async () => {
          const notebookQuickPick = new NotebookQuickPick();
          await notebookQuickPick.showNotebookPicker();
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.showNotebookProfileQuery",
        async () => {
          await commands.executeCommand(
            "dbtPowerUser.createDatapilotNotebook",
            {
              template: "Profile your query",
            },
          );
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.showNotebookTestSuggestions",
        async () => {
          await commands.executeCommand(
            "dbtPowerUser.createDatapilotNotebook",
            {
              template: "Get test suggestions",
            },
          );
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.showNotebookGenerateBaseModelSql",
        async () => {
          await commands.executeCommand(
            "dbtPowerUser.createDatapilotNotebook",
            {
              template: "Generate dbt base model sql",
            },
          );
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.showNotebookGenerateModelYaml",
        async () => {
          await commands.executeCommand(
            "dbtPowerUser.createDatapilotNotebook",
            {
              template: "Generate dbt model yaml",
            },
          );
        },
      ),
      commands.registerCommand(
        "dbtPowerUser.showNotebookGenerateModelCTE",
        async () => {
          await commands.executeCommand(
            "dbtPowerUser.createDatapilotNotebook",
            {
              template: "Generate dbt model CTE",
            },
          );
        },
      ),
      commands.registerCommand("dbtPowerUser.applyDeferConfig", async () => {
        const projects = this.dbtProjectContainer.getProjects();
        try {
          await Promise.all(
            projects.map((project) => project.applyDeferConfig()),
          );
          window.showInformationMessage("Applied defer configuration");
        } catch (error) {
          this.dbtTerminal.error(
            "applyDeferConfig",
            "Failed to apply defer configuration",
            error,
          );
          window.showErrorMessage(
            `Failed to apply defer configuration: ${error}`,
          );
        }
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

  private runSelectedQuery(uri: Uri, range: Range): void {
    // Get the document and extract the selected text
    const document = workspace.textDocuments.find(
      (doc) => doc.uri.toString() === uri.toString(),
    );
    if (!document) {
      window.showErrorMessage("Document not found");
      return;
    }

    const selectedQuery = document.getText(range);
    if (!selectedQuery.trim()) {
      window.showErrorMessage("No query selected");
      return;
    }

    // Create a model name based on the selection - use "cte_query" as default
    const modelName = "cte_query";

    // Execute the selected query using the existing infrastructure
    this.dbtProjectContainer.executeSQL(uri, selectedQuery, modelName);
  }

  private async runCteWithDependencies(
    uri: Uri,
    cteIndex: number,
    ctes: CteInfo[],
  ): Promise<void> {
    this.dbtTerminal.debug(
      "CteExecution",
      `Starting CTE execution for index ${cteIndex} with ${ctes.length} total CTEs`,
    );

    try {
      // Get the document asynchronously
      let document = workspace.textDocuments.find(
        (doc) => doc.uri.toString() === uri.toString(),
      );

      if (!document) {
        // Try to open the document if not found in workspace
        try {
          document = await workspace.openTextDocument(uri);
        } catch (error) {
          this.dbtTerminal.error(
            "CteExecution",
            `Failed to open document: ${uri.toString()}`,
            error,
          );
          window.showErrorMessage("Document not found and could not be opened");
          return;
        }
      }

      const text = document.getText();

      // Find the target CTE and all its dependencies
      const targetCte = ctes[cteIndex];
      if (!targetCte) {
        this.dbtTerminal.warn(
          "CteExecution",
          `CTE not found at index ${cteIndex}, available CTEs: ${ctes.length}`,
        );
        window.showErrorMessage("CTE not found");
        return;
      }

      this.dbtTerminal.debug(
        "CteExecution",
        `Target CTE: ${targetCte.name} (index: ${targetCte.index})`,
      );

      // Get all CTEs from the same WITH clause that come before or at the target index
      const sameScopeCtesUpToTarget = ctes.filter(
        (cte) =>
          cte.withClauseStart === targetCte.withClauseStart &&
          cte.index <= targetCte.index,
      );

      this.dbtTerminal.debug(
        "CteExecution",
        `Found ${sameScopeCtesUpToTarget.length} CTEs in dependency chain: ${sameScopeCtesUpToTarget.map((c) => c.name).join(", ")}`,
      );

      // Build the complete query with dependencies
      const cteDefinitions: string[] = [];

      for (const cte of sameScopeCtesUpToTarget) {
        // Extract the full CTE definition (name + AS + query)
        const cteStart = cte.range.start;

        // Get from CTE name to end of its query
        const cteStartPos = document.offsetAt(cteStart);

        // Improved regex to handle quoted identifiers, dotted names, and complex column lists
        // Supports: identifier, "quoted identifier", schema.table, `backtick quoted`, [bracket quoted]
        const cteNameMatch = text
          .substring(cteStartPos)
          .match(
            /^((?:[a-zA-Z_][a-zA-Z0-9_]*|"[^"]+"|`[^`]+`|\[[^\]]+\])(?:\.(?:[a-zA-Z_][a-zA-Z0-9_]*|"[^"]+"|`[^`]+`|\[[^\]]+\]))*(?:\s*\([^)]*\))?)\s+as\s*\(/i,
          );

        if (cteNameMatch) {
          const cteQuery = document.getText(cte.queryRange);
          const fullCteDefinition = `${cteNameMatch[1]} AS (\n${cteQuery}\n)`;
          cteDefinitions.push(fullCteDefinition);

          this.dbtTerminal.debug(
            "CteExecution",
            `Added CTE to query: ${cteNameMatch[1]} (${cteQuery.length} chars)`,
          );
        } else {
          this.dbtTerminal.warn(
            "CteExecution",
            `Could not parse CTE definition for: ${cte.name}`,
          );
        }
      }

      // Check if we have any valid CTE definitions
      if (cteDefinitions.length === 0) {
        this.dbtTerminal.warn(
          "CteExecution",
          "No valid CTE definitions found, cannot build query",
        );
        window.showErrorMessage("Failed to extract CTE definitions");
        return;
      }

      // Build the complete query including preamble before WITH clause
      // Extract everything before the WITH clause (dbt configs, variables, etc.)
      const preamble = text.substring(0, targetCte.withClauseStart).trim();

      let query = "";
      if (preamble) {
        query += preamble + "\n\n";
        this.dbtTerminal.debug(
          "CteExecution",
          `Including preamble (${preamble.length} chars) before WITH clause`,
        );
      }

      query += "WITH ";
      query += cteDefinitions.join(",\n");

      // Add a simple SELECT to execute the target CTE with proper quoting
      const quotedTargetName = this.quoteSqlIdentifier(targetCte.name);
      query += `\nSELECT * FROM ${quotedTargetName}`;

      this.dbtTerminal.debug(
        "CteExecution",
        `Generated query length: ${query.length} characters`,
      );

      // Create a unique model name with timestamp to prevent collisions
      const timestamp = Date.now();
      const hash = this.generateShortHash(targetCte.name + timestamp);
      const modelName = `cte_${targetCte.name}_${hash}`;

      this.dbtTerminal.debug(
        "CteExecution",
        `Executing CTE query with model name: ${modelName}`,
      );

      // Execute the complete query with dependencies
      this.dbtProjectContainer.executeSQL(uri, query, modelName);
    } catch (error) {
      this.dbtTerminal.error(
        "CteExecution",
        "Unexpected error in runCteWithDependencies",
        error,
      );
      window.showErrorMessage(
        `Failed to execute CTE: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  private quoteSqlIdentifier(identifier: string): string {
    // If identifier is already quoted or contains dots, return as-is
    if (identifier.match(/^["'`\[]/) || identifier.includes(".")) {
      return identifier;
    }

    // If identifier contains special characters or spaces, quote it
    if (!identifier.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
      return `"${identifier}"`;
    }

    return identifier;
  }

  private generateShortHash(input: string): string {
    // Simple hash function to generate a short unique suffix
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).substring(0, 6);
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
