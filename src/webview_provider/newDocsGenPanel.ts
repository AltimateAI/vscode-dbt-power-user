import { readFileSync } from "fs";
import {
  CancellationToken,
  TextEditor,
  WebviewView,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { DbtProjectService } from "../services/dbtProjectService";
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
import { DBTTerminal } from "../dbt_client/dbtTerminal";

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
    protected dbtProjectService: DbtProjectService,
    protected dbtTerminal: DBTTerminal,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
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
    const tests = await this.docGenService.getTestsForCurrentModel(
      this.eventMap,
    );
    this.sendResponseToWebview({
      command: "renderTests",
      tests,
      project: this.dbtProjectService.getProject()?.getProjectName(),
    });
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...args } = message;

    switch (command) {
      case "getTestCode":
        this.sendResponseToWebview({
          command: "response",
          data: {
            code: readFileSync(args.path as string, { encoding: "utf-8" }),
          },
          syncRequestId,
        });
        break;
      case "enableNewDocsPanel":
        this.toggleDocsPanel(args);
        break;
      case "getCurrentModelDocumentation":
        if (!this.eventMap || !this._panel) {
          return;
        }

        const documentation = await this.docGenService.getDocumentation(
          this.eventMap,
        );
        this.sendResponseToWebview({
          command: "renderDocumentation",
          docs: documentation,
          project: this.dbtProjectService.getProject()?.getProjectName(),
          testsEnabled: workspace
            .getConfiguration("dbt")
            .get<boolean>("enableTests", false),
        });
      case "getColumnsOfModel":
        const columns = await this.dbtProjectService
          .getProject()
          ?.getColumnsOfModel(args.model as string);
        this.sendResponseToWebview({
          command: "response",
          data: {
            columns: columns ? columns.map((c) => c.column) : [],
          },
          syncRequestId,
        });
        break;
      case "getModelsFromProject":
        const models = this.dbtProjectService.getModelsFromProject(
          this.eventMap,
          window.activeTextEditor?.document.uri,
        );

        this.sendResponseToWebview({
          command: "response",
          data: {
            models,
          },
          syncRequestId,
        });
      default:
        super.handleCommand(message);
        break;
    }
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "docgen:insert":
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
