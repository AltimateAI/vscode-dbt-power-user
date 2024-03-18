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
import { provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { DocsGenPanelView } from "./docsEditPanel";
import { TestMetaData } from "../domain";
import { parse, stringify } from "yaml";
import { DbtTestService } from "../services/dbtTestService";

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
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
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

    const project = this.queryManifestService.getProject()?.getProjectName();
    const tests = await this.dbtTestService.getTestsForCurrentModel();
    this.sendResponseToWebview({
      command: "renderTests",
      tests,
      project,
    });
  }

  private stringifyTest = (
    tests: Record<string, unknown>[],
    test: TestMetaData,
  ) => {
    if (!tests?.length) {
      return null;
    }

    const selectedTest = tests.find((t: Record<string, unknown>) => {
      if (!test.test_metadata) {
        return false;
      }
      const { name, namespace } = test.test_metadata;
      const fullName = namespace ? `${namespace}.${name}` : name;
      return Boolean(t[fullName]);
    });

    if (!selectedTest) {
      this.dbtTerminal.debug("getDbtTestCode", "no test available in yml");
      return null;
    }

    this.dbtTerminal.debug(
      "getDbtTestCode",
      "sending selected test from yml",
      selectedTest,
    );
    return stringify(selectedTest);
  };

  private getDbtTestCode(test: TestMetaData, modelName: string) {
    const { path, column_name } = test;
    if (path.endsWith(".sql")) {
      this.dbtTerminal.debug("getDbtTestCode", "reading sql test", path);
      return readFileSync(path, { encoding: "utf-8" });
    }

    if (path.endsWith(".yml")) {
      this.dbtTerminal.debug("getDbtTestCode", "finding test from yaml", path);
      const parsedDocFile = parse(readFileSync(path, { encoding: "utf-8" }), {
        strict: false,
        uniqueKeys: false,
        maxAliasCount: -1,
      });

      if (!parsedDocFile) {
        this.dbtTerminal.debug(
          "getDbtTestCode",
          "yml file does not have any content",
          path,
        );
        return null;
      }

      const model = parsedDocFile.models?.find(
        (m: any) => m.name === modelName,
      );

      // model test
      if (!column_name) {
        this.dbtTerminal.debug(
          "getDbtTestCode",
          "finding model test from yml",
          parsedDocFile,
          model,
        );
        return this.stringifyTest(model?.tests, test);
      }

      const column =
        model.columns &&
        model.columns.find(
          (yamlColumn: any) => yamlColumn.name === column_name,
        );
      this.dbtTerminal.debug(
        "getDbtTestCode",
        "finding column test from yml",
        parsedDocFile,
        model,
        column,
      );

      return this.stringifyTest(column?.tests, test);
    }

    return null;
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...args } = message;

    switch (command) {
      case "getTestCode":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            return {
              code: this.getDbtTestCode(
                args.test as TestMetaData,
                args.model as string,
              ),
            };
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

        const documentation = await this.docGenService.getDocumentation();
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
