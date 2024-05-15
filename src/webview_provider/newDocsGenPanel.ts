import { readFileSync } from "fs";
import {
  CancellationToken,
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
import { ConversationService } from "../services/conversationService";

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
    private conversationService: ConversationService,
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
  }

  protected onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    super.onManifestCacheChanged(event);
  }

  protected onWebviewReady() {
    super.onWebviewReady();
    this.transmitConversationsData();
  }

  private transmitConversationsData() {
    const conversations = this.conversationService.getConversations();
    if (!conversations) {
      return;
    }
    Object.entries(conversations).forEach(([shareId, conversationGroups]) => {
      this.sendResponseToWebview({
        command: "conversations:updates",
        shareId,
        conversationGroups,
      });
    });
  }

  resolveWebview(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    token: CancellationToken,
  ): void {
    super.resolveWebviewView(panel, context, token);
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

  private async createConversation({
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

    const result = await this.conversationProvider.saveConversation(
      comment as string,
      window.activeTextEditor.document.uri,

      params.meta,
      new Range(0, 0, 0, 0),
      "documentation-editor",
    );
    if (!result?.shareId) {
      return;
    }
    return {
      [result.shareId]:
        await this.conversationService.loadConversationsByShareId(
          result.shareId,
        ),
    };
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...args } = message;

    switch (command) {
      case "refetchConversations":
        this.emitterService.fire({ command, payload: args });
        break;
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

      case "getCurrentModelDocumentation":
        if (!this._panel) {
          return;
        }

        const documentation =
          await this.docGenService.getDocumentationForCurrentActiveFile();
        this.sendResponseToWebview({
          command: "renderDocumentation",
          docs: documentation,
          tests: await this.dbtTestService.getTestsForCurrentModel(),
          project: this.queryManifestService.getProject()?.getProjectName(),
          collaborationEnabled: workspace
            .getConfiguration("dbt")
            .get<boolean>("enableCollaboration", false),
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
      case "viewConversation":
        this.sendResponseToWebview({ command, ...payload });
        break;
      case "conversations:updates":
        this.sendResponseToWebview({ command, ...payload });
        break;
      case "docgen:insert":
      case "testgen:insert":
        this.sendResponseToWebview({
          command,
          ...payload,
        });
        break;
      default:
        break;
    }
  }
}
