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
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { QueryManifestService } from "../services/queryManifestService";
import { DocGenService } from "../services/docGenService";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { DocsGenPanelView } from "./docsEditPanel";
import { PythonException } from "python-bridge";
import { TestMetaData } from "../domain";
import { DbtTestService } from "../services/dbtTestsService";

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
    private dbtTestsService: DbtTestService,
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
    if (!this._panel) {
      return;
    }

    const projectName = this.queryManifestService
      .getProject()
      ?.getProjectName();
    const tests = await this.docGenService.getTestsForCurrentModel();
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
      config: this.dbtTestsService.getConfigByTest(
        test,
        modelName,
        column_name,
      ),
    };
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...args } = message;

    switch (command) {
      case "getTestCode":
        this.sendResponseToWebview({
          command: "response",
          data: this.getDbtTestCode(
            args.test as TestMetaData,
            args.model as string,
          ),
          syncRequestId,
        });
        break;
      case "getDistinctColumnValues":
        try {
          const result = await this.queryManifestService
            .getProject()
            ?.getColumnValues(args.model as string, args.column as string);
          this.sendResponseToWebview({
            command: "response",
            data: result,
            syncRequestId,
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getDistinctColumnValues",
            "Unable to find distinct values for column",
            error,
            true,
            args,
          );

          const message =
            error instanceof PythonException
              ? error.exception.message
              : (error as Error).message;
          window.showErrorMessage(extendErrorWithSupportLinks(message));
          this.sendResponseToWebview({
            command: "response",
            data: [],
            syncRequestId,
          });
        }
        break;
      case "enableNewDocsPanel":
        this.toggleDocsPanel(args);
        break;
      case "getCurrentModelDocumentation":
        if (!this._panel) {
          return;
        }

        const documentation = await this.docGenService.getDocumentation();
        this.sendResponseToWebview({
          command: "renderDocumentation",
          docs: documentation,
          project: this.queryManifestService.getProject()?.getProjectName(),
        });
      case "getColumnsOfSources":
        try {
          const columnsFromSources = await this.queryManifestService
            .getProject()
            ?.getColumnsOfSource(args.source as string, args.table as string);
          this.sendResponseToWebview({
            command: "response",
            data: {
              columns: columnsFromSources
                ? columnsFromSources.map((c) => c.column)
                : [],
            },
            syncRequestId,
          });
        } catch (error) {
          this.dbtTerminal.error(
            "newDocsGenPanel:getColumnsOfSources",
            "unable to get columns of sources",
            error,
          );
          const message =
            error instanceof PythonException
              ? error.exception.message
              : (error as Error).message;
          window.showErrorMessage(extendErrorWithSupportLinks(message));
          this.sendResponseToWebview({
            command: "response",
            data: { columns: [] },
            syncRequestId,
          });
        }
        break;
      case "getColumnsOfModel":
        try {
          const columns = await this.queryManifestService
            .getProject()
            ?.getColumnsOfModel(args.model as string);
          this.sendResponseToWebview({
            command: "response",
            data: {
              columns: columns ? columns.map((c) => c.column) : [],
            },
            syncRequestId,
          });
        } catch (error) {
          this.dbtTerminal.error(
            "newDocsGenPanel:getColumnsOfModel",
            "unable to get columns of models",
            error,
          );
          const message =
            error instanceof PythonException
              ? error.exception.message
              : (error as Error).message;
          window.showErrorMessage(extendErrorWithSupportLinks(message));
          this.sendResponseToWebview({
            command: "response",
            data: { columns: [] },
            syncRequestId,
          });
        }
        break;
      case "getSourcesInProject":
        const sources = this.queryManifestService.getSourcesInProject(
          window.activeTextEditor?.document.uri,
        );

        this.sendResponseToWebview({
          command: "response",
          data: {
            sources,
          },
          syncRequestId,
        });
        break;
      case "getModelsInProject":
        const models = this.queryManifestService.getModelsInProject(
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
