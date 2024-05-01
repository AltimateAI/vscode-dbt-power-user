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
} from "vscode";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";
import { RunModelType } from "../domain";
import {
  extendErrorWithSupportLinks,
  getFirstWorkspacePath,
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
      commands.registerCommand("dbtPowerUser.troubleshoot", async () => {
        try {
          await this.dbtTerminal.show(true);
          this.dbtTerminal.log("Troubleshooting started...\r\n");
          this.dbtTerminal.log(
            `Python Path=${this.pythonEnvironment.pythonPath}\r\n`,
          );
          if (!this.dbtClient.pythonInstalled) {
            this.dbtTerminal.log("\r\nPython not detected\r\n");
            return;
          }
          const dbtIntegrationMode = workspace
            .getConfiguration("dbt")
            .get<string>("dbtIntegration", "core");
          this.dbtTerminal.log(
            `DBT integration mode=${dbtIntegrationMode}\r\n`,
          );
          this.dbtTerminal.log(
            `First workspace path=${getFirstWorkspacePath()}\r\n`,
          );
          if (!this.dbtClient.dbtInstalled) {
            this.dbtTerminal.log("\r\nDBT not detected\r\n");
            return;
          }
          const projects = this.dbtProjectContainer.getProjects();
          this.dbtTerminal.log(`Number of projects=${projects.length}\r\n`);
          if (projects.length === 0) {
            this.dbtTerminal.log("\r\nProjects not detected\r\n");
            return;
          }
          const project = projects[0];
          const dbtVersion = project.getDBTVersion();
          if (!dbtVersion) {
            this.dbtTerminal.log("\r\nDBT is not initialized properly\r\n");
            return;
          }
          this.dbtTerminal.log(`DBT version=${dbtVersion.join(".")}\r\n`);
          this.dbtTerminal.log(`DBT adapter=${project.getAdapterType()}\r\n`);
          await project.debug();
          this.dbtTerminal.log("\r\n\r\nEverything looks good\r\n");
        } catch (e) {
          this.dbtTerminal.log(`\r\nError occurred=${e}\r\n`);
        }
      }),
    );
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
