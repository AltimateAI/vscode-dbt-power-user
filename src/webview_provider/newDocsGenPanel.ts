import { readFileSync } from "fs";
import {
  CancellationToken,
  CommentThreadCollapsibleState,
  Range,
  TextEditor,
  WebviewView,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { QueryManifestService } from "../services/queryManifestService";
import { DocGenService } from "../services/docGenService";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { DocsGenPanelView } from "./docsEditPanel";
import { TestMetaData } from "../domain";
import { DbtTestService } from "../services/dbtTestService";
import { UsersService } from "../services/usersService";
import { ConversationProvider } from "../comment_provider/conversationProvider";
import { DbtDocsView } from "./DbtDocsView";

@provideSingleton(NewDocsGenPanel)
export class NewDocsGenPanel
  extends AltimateWebviewProvider
  implements DocsGenPanelView
{
  public static readonly viewType = "dbtPowerUser.DocsEdit";
  protected viewPath = "/docs-generator";
  protected panelDescription = "Generate documentation for your models";

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    telemetry: TelemetryService,
    private docGenService: DocGenService,
    protected emitterService: SharedStateService,
    protected queryManifestService: QueryManifestService,
    protected dbtTerminal: DBTTerminal,
    private dbtTestService: DbtTestService,
    protected userService: UsersService,
    private dbtDocsView: DbtDocsView,
    private conversationProvider: ConversationProvider,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
      userService,
    );

    this._disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          if (event === undefined) {
            return;
          }
          this.transmitTestsData();
        },
      ),
    );
  }

  protected onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    super.onManifestCacheChanged(event);

    // Start sending tests data only after webview is ready
    if (this.isWebviewReady) {
      this.transmitTestsData();
    }
  }

  protected onWebviewReady() {
    super.onWebviewReady();
    this.transmitTestsData();
  }

  resolveWebview(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    token: CancellationToken,
  ): void {
    super.resolveWebviewView(panel, context, token);
  }

  private async transmitTestsData() {
    if (!this._panel) {
      return;
    }

    const projectName = this.queryManifestService
      .getProject()
      ?.getProjectName();
    const tests = await this.dbtTestService.getTestsForCurrentModel();
    this.sendResponseToWebview({
      command: "renderTests",
      tests,
      project: projectName,
    });
  }

  private getDbtTestCode(test: TestMetaData, modelName: string) {
    const { path: testPath, column_name } = test;
    this.dbtTerminal.debug(
      "getDbtTestCode",
      "getting sql and config",
      testPath,
      column_name,
      modelName,
    );

    return {
      sql: testPath.endsWith(".sql")
        ? readFileSync(testPath, { encoding: "utf-8" })
        : undefined,
      config: this.dbtTestService.getConfigByTest(test, modelName, column_name),
    };
  }

  private createConversation({
    comment,
    ...params
  }: {
    meta?: Record<string, unknown>;
    comment?: string;
  }) {
    if (!window.activeTextEditor?.document.uri) {
      throw new Error("Invalid file");
    }
    if (!comment) {
      throw new Error("Invalid comment");
    }

    const range = new Range(0, 0, 0, 0);
    const thread = this.conversationProvider.createCommentThread(
      window.activeTextEditor.document.uri,
      range,
    );

    if (!thread) {
      throw new Error("Unable to create comment, Please try again");
    }
    thread.collapsibleState = CommentThreadCollapsibleState.Expanded;

    // model editor loses focus when creating comment thread
    window.showTextDocument(window.activeTextEditor.document);

    this.conversationProvider.createConversation(
      {
        text: comment as string,
        thread,
      },
      params.meta,
    );
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...args } = message;

    switch (command) {
      case "createConversation":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            return this.createConversation(args);
          },
          command,
        );
        break;
      case "getTestCode":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            return this.getDbtTestCode(
              args.test as TestMetaData,
              args.model as string,
            );
          },
          command,
        );
        break;

      case "getDistinctColumnValues":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const result = await this.queryManifestService
              .getProject()
              ?.getColumnValues(args.model as string, args.column as string);
            return result;
          },
          command,
          true,
        );

        break;

      case "enableNewDocsPanel":
        this.toggleDocsPanel(args);
        break;

      case "getCurrentModelDocumentation":
        if (!this._panel) {
          return;
        }

        const documentation =
          await this.docGenService.getDocumentationForCurrentActiveFile();
        this.sendResponseToWebview({
          command: "renderDocumentation",
          docs: documentation,
          project: this.queryManifestService.getProject()?.getProjectName(),
        });
        break;

      case "getColumnsOfSources":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const columnsFromSources = await this.queryManifestService
              .getProject()
              ?.getColumnsOfSource(args.source as string, args.table as string);
            return {
              columns: columnsFromSources
                ? columnsFromSources.map((c) => c.column)
                : [],
            };
          },
          command,
          true,
        );
        break;

      case "getColumnsOfModel":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const columns = await this.queryManifestService
              .getProject()
              ?.getColumnsOfModel(args.model as string);
            return {
              columns: columns ? columns.map((c) => c.column) : [],
            };
          },
          command,
          true,
        );
        break;

      case "getSourcesInProject":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const sources = this.queryManifestService.getSourcesInProject(
              window.activeTextEditor?.document.uri,
            );

            return {
              sources,
            };
          },
          command,
          true,
        );
        break;

      case "getModelsInProject":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const models = this.queryManifestService.getModelsInProject(
              window.activeTextEditor?.document.uri,
            );

            return {
              models,
            };
          },
          command,
        );
        break;

      default:
        super.handleCommand(message);
        break;
    }
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "docgen:insert":
      case "testgen:insert":
        this.sendResponseToWebview({
          command,
          ...payload,
        });
        break;
      case "enableNewDocsPanel":
        this.toggleDocsPanel(payload);
      default:
        break;
    }
  }

  private async toggleDocsPanel({ enable }: Record<string, unknown>) {
    await workspace
      .getConfiguration("dbt")
      .update("enableNewDocsPanel", enable);
    this.telemetry.sendTelemetryEvent(
      enable ? "NewDocsPanelEnabled" : "NewDocsPanelDisabled",
    );
  }
}
