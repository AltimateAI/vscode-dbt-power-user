import {
  DBTTerminal,
  ExposureMetaData,
  FunctionMetaData,
  NodeMetaData,
  Ref,
  RelationshipParser,
  RESOURCE_TYPE_FUNCTION,
  RESOURCE_TYPE_SOURCE,
  SourceTable,
  Table,
} from "@altimateai/dbt-integration";
import { inject } from "inversify";
import * as path from "path";
import {
  CancellationToken,
  CancellationTokenSource,
  ColorThemeKind,
  commands,
  ProgressLocation,
  TextEditor,
  Webview,
  window,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProject } from "../dbt_client/dbtProject";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../dbt_client/event/manifestCacheChangedEvent";
import { AltimateAuthService } from "../services/altimateAuthService";
import { CllEvents, DbtLineageService } from "../services/dbtLineageService";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks } from "../utils";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";
import { LineagePanelView } from "./lineagePanel";

class DerivedCancellationTokenSource extends CancellationTokenSource {
  constructor(linkedToken: CancellationToken) {
    super();
    linkedToken.onCancellationRequested(() => {
      super.cancel();
    });
  }
}

export class NewLineagePanel
  extends AltimateWebviewProvider
  implements LineagePanelView
{
  protected viewPath = "/lineage";
  protected panelDescription = "Lineage panel";
  private cllProgressResolve: () => void = () => {};
  private cancellationTokenSource: CancellationTokenSource | undefined;

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    private altimate: AltimateRequest,
    protected telemetry: TelemetryService,
    @inject("DBTTerminal")
    private terminal: DBTTerminal,
    private dbtLineageService: DbtLineageService,
    eventEmitterService: SharedStateService,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
    protected altimateAuthService: AltimateAuthService,
  ) {
    super(
      dbtProjectContainer,
      altimate,
      telemetry,
      eventEmitterService,
      terminal,
      queryManifestService,
      usersService,
      altimateAuthService,
    );
  }

  public changedActiveTextEditor(event: TextEditor | undefined) {
    if (event === undefined) {
      return;
    }
    if (!this._panel) {
      return;
    }
    this.renderStartingNode();
  }

  eventMapChanged(eventMap: Map<string, ManifestCacheProjectAddedEvent>): void {
    this.eventMap = eventMap;
    this.renderStartingNode();
  }

  protected onWebviewReady() {
    super.onWebviewReady();
    this.renderStartingNode();
  }

  changedActiveColorTheme() {
    if (!this._panel) {
      return;
    }
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";
    this._panel.webview.postMessage({
      command: "setTheme",
      args: { theme },
    });
  }

  init() {
    this.terminal.debug("newLineagePanel:init", "init", this._panel);
    this.changedActiveColorTheme();
    this.renderStartingNode();
  }

  private renderStartingNode() {
    if (!this._panel) {
      return;
    }
    this._panel.webview.postMessage({
      command: "render",
      args: this.getStartingNode(),
    });
  }

  async handleCommand(message: {
    command: string;
    args: any;
    syncRequestId?: string;
  }): Promise<void> {
    const { command, args = {}, syncRequestId } = message;
    const { id = syncRequestId, params } = args;

    if (command === "openProblemsTab") {
      commands.executeCommand("workbench.action.problems.focus");
      return;
    }
    if (command === "upstreamTables") {
      const body = this.dbtLineageService.getUpstreamTables(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "downstreamTables") {
      const body = this.dbtLineageService.getDownstreamTables(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getColumns") {
      const body = await this.getColumns(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getExposureDetails") {
      const body = await this.getExposureDetails(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getRelationships") {
      const body = this.getRelationships();
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getFunctionDetails") {
      const body = await this.getFunctionDetails(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getConnectedColumns") {
      try {
        const body = await this.dbtLineageService.getConnectedColumns(
          {
            ...params,
            eventType: "column_lineage",
          },
          this.cancellationTokenSource ?? new CancellationTokenSource(),
        );
        this._panel?.webview.postMessage({
          command: "response",
          args: { id, syncRequestId, body, status: !!body },
        });
      } catch (error) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Unable to generate lineage: " + (error as Error).message,
          ),
        );
        this._panel?.webview.postMessage({
          command: "response",
          args: { id, error, status: false },
        });
        this.telemetry.sendTelemetryError("columnLineageUnknownError", {
          params,
        });
      }
      return;
    }

    if (command === "sendFeedback") {
      try {
        await this.altimate.sendFeedback({
          feedback_src: "dbtpu-extension",
          feedback_text: params.feedback_text,
          feedback_value: params.feedback_value,
          data: {},
        });
        this._panel?.webview.postMessage({
          command: "response",
          args: { id, syncRequestId, status: true },
        });
      } catch (error) {
        this._panel?.webview.postMessage({
          command: "response",
          args: { id, syncRequestId, status: false },
        });
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Could not send feedback: " + (error as Error).message,
          ),
        );
        this.telemetry.sendTelemetryError(
          "altimateLineageSendFeedbackError",
          error,
        );
      }
      return;
    }

    if (command === "columnLineage") {
      this.handleColumnLineage(args, () => {
        this._panel?.webview.postMessage({
          command: "columnLineage",
          args: { event: CllEvents.CANCEL },
        });
      });
      return;
    }

    if (command === "telemetryEvents") {
      this.telemetry.sendTelemetryEvent(id, params);
      return;
    }

    if (command === "previewFeature") {
      this.altimateAuthService.handlePreviewFeatures();
      return;
    }

    if (command === "showInfoNotification") {
      window.showInformationMessage(params.message);
      return;
    }

    if (command === "getLineageSettings") {
      const config = workspace.getConfiguration("dbt.lineage");
      this._panel?.webview.postMessage({
        command: "response",
        args: {
          id,
          syncRequestId,
          status: true,
          body: {
            showSelectEdges: config.get("showSelectEdges", true),
            showNonSelectEdges: config.get("showNonSelectEdges", false),
            defaultExpansion: Math.min(
              config.get<number>("defaultExpansion", 1),
              5,
            ),
          },
        },
      });
      return;
    }

    if (command === "persistLineageSettings") {
      const config = workspace.getConfiguration("dbt.lineage");
      for (const k in params) {
        await config.update(k, params[k]);
      }
      this._panel?.webview.postMessage({
        command: "response",
        args: {
          id,
          syncRequestId,
          status: true,
          body: { ok: true },
        },
      });
      return;
    }

    this.terminal.debug(
      "newLineagePanel:handleCommand",
      "Unsupported command",
      message,
    );
    super.handleCommand(message);
  }

  private async handleColumnLineage(
    { event }: { event: CllEvents },
    onCancel: () => void,
  ) {
    if (event === CllEvents.START) {
      window.withProgress(
        {
          title: "Retrieving column level lineage",
          location: ProgressLocation.Notification,
          cancellable: true,
        },
        async (_, token) => {
          await new Promise<void>((resolve) => {
            this.cancellationTokenSource = new DerivedCancellationTokenSource(
              token,
            );
            this.cllProgressResolve = resolve;
            token.onCancellationRequested(() => {
              onCancel();
            });
          });
        },
      );
      return;
    }
    if (event === CllEvents.END) {
      this.cllProgressResolve();
      this.cancellationTokenSource?.dispose();
      return;
    }
    if (event === CllEvents.CANCEL) {
      this.cllProgressResolve();
      this.cancellationTokenSource?.cancel();
      return;
    }
  }

  private async addModelColumnsFromDB(project: DBTProject, node: NodeMetaData) {
    const columnsFromDB = await project.getColumnsOfModel(node.name);
    console.log("addColumnsFromDB: ", node.name, " -> ", columnsFromDB);
    return project.mergeColumnsFromDB(node, columnsFromDB);
  }

  private async addSourceColumnsFromDB(
    project: DBTProject,
    nodeName: string,
    table: SourceTable,
  ) {
    const columnsFromDB = await project.getColumnsOfSource(
      nodeName,
      table.name,
    );
    console.log("addColumnsFromDB: ", nodeName, " -> ", columnsFromDB);
    return project.mergeColumnsFromDB(table, columnsFromDB);
  }

  /**
   * ERD overlay: extract PK/FK relationships from the current project's
   * manifest. Phase 1 only derives refs from dbt `relationships` data tests;
   * later phases will add model contracts and naming-convention inference.
   *
   * Gated behind the Altimate API key — same gate as other premium lineage
   * features. Returns an empty list when no key is configured so the UI
   * silently renders no overlay.
   */
  private getRelationships(): { refs: Ref[] } {
    if (!this.altimate.enabled()) {
      return { refs: [] };
    }
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return { refs: [] };
    }
    const { testMetaMap } = event.event;
    const parser = new RelationshipParser(this.terminal);
    const refs = parser.fromTests(testMetaMap);
    this.terminal.debug(
      "NewLineagePanel",
      `getRelationships returning ${refs.length} refs`,
    );
    return { refs };
  }

  private async getExposureDetails({
    name,
  }: {
    name: string;
  }): Promise<ExposureMetaData | undefined> {
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }

    const { exposureMetaMap } = event.event;

    // Node IDs use unique_id format (exposure.project.name), but
    // exposureMetaMap is keyed by simple exposure name.
    const splits = name.split(".");
    const exposureName = splits.length >= 3 ? splits[2] : name;
    return exposureMetaMap.get(exposureName);
  }

  private async getFunctionDetails({
    name,
  }: {
    name: string;
  }): Promise<FunctionMetaData | undefined> {
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const { functionMetaMap } = event.event;
    // Node IDs use unique_id format (function.project.name), but
    // functionMetaMap is keyed by simple function name.
    const splits = name.split(".");
    const functionName = splits.length >= 3 ? splits[2] : name;
    return functionMetaMap.get(functionName);
  }

  private async getColumns({
    table,
    refresh,
  }: {
    table: string;
    refresh: boolean;
  }): Promise<
    | {
        id: string;
        purpose: string;
        columns: {
          table: string;
          name: string;
          datatype: string;
          can_lineage_expand: boolean;
          description: string;
        }[];
        returns?: {
          datatype: string;
          description: string;
        };
        meta?: { [key: string]: any };
      }
    | undefined
  > {
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }
    const splits = table.split(".");
    const nodeType = splits[0];
    if (nodeType === RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = event.event;
      const sourceName = splits[2];
      const tableName = splits[3];
      const node = sourceMetaMap.get(sourceName);
      if (!node) {
        return;
      }
      const _table = node.tables.find((t) => t.name === tableName);
      if (!_table) {
        return;
      }
      if (refresh) {
        const ok = await window.withProgress(
          {
            title: "Fetching metadata",
            location: ProgressLocation.Notification,
            cancellable: false,
          },
          async () => {
            return await this.addSourceColumnsFromDB(
              project,
              node.name,
              _table,
            );
          },
        );
        if (!ok) {
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Unable to get columns from DB for model: " +
                node.name +
                " table: " +
                _table.name +
                ".",
            ),
          );
          return;
        }
      }
      return {
        id: table,
        purpose: _table.description,
        columns: Object.values(_table.columns)
          .map((c) => ({
            table,
            name: c.name,
            datatype: c.data_type?.toLowerCase() || "",
            can_lineage_expand: false,
            description: c.description,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
    }
    if (nodeType === RESOURCE_TYPE_FUNCTION) {
      const tableName = splits[2];
      const { functionMetaMap } = event.event;
      const fn = functionMetaMap.get(tableName);
      if (!fn) {
        return;
      }
      const columns: {
        table: string;
        name: string;
        datatype: string;
        can_lineage_expand: boolean;
        description: string;
      }[] = [];
      if (fn.arguments) {
        for (const arg of fn.arguments) {
          columns.push({
            table,
            name: arg.name,
            datatype: arg.data_type || "",
            can_lineage_expand: false,
            description: arg.description || "",
          });
        }
      }
      return {
        id: table,
        purpose: fn.description || "",
        columns,
        returns: fn.returns
          ? {
              datatype: fn.returns.data_type || "",
              description: fn.returns.description || "",
            }
          : undefined,
      };
    }
    const { nodeMetaMap } = event.event;
    const node = nodeMetaMap.lookupByUniqueId(table);
    if (!node) {
      return;
    }
    if (refresh) {
      if (node.config.materialized === "ephemeral") {
        window.showInformationMessage(
          "Cannot fetch columns for ephemeral models.",
        );
        return;
      }
      const ok = await window.withProgress(
        {
          title: "Fetching metadata",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          return await this.addModelColumnsFromDB(project, node);
        },
      );
      if (!ok) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Unable to get columns from DB for model: " +
              node.name +
              " table: " +
              table +
              ".",
          ),
        );
        return;
      }
    }

    return {
      id: table,
      purpose: node.description,
      columns: Object.values(node.columns)
        .map((c) => ({
          table,
          name: c.name,
          datatype: c.data_type?.toLowerCase() || "",
          can_lineage_expand: false,
          description: c.description,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
      meta: node.meta,
    };
  }

  private static readonly DBT_FILE_EXTENSIONS = [".sql", ".py", ".csv"];

  private getFilename(): string | undefined {
    const editor = window.activeTextEditor;
    if (!editor) {
      return undefined;
    }
    const fileName = editor.document.fileName;
    const ext = path.extname(fileName).toLowerCase();
    if (NewLineagePanel.DBT_FILE_EXTENSIONS.includes(ext)) {
      return path.basename(fileName, ext);
    }
    return path.basename(fileName);
  }

  private getMissingLineageMessage() {
    const message =
      "A valid dbt file (model, seed etc.) needs to be open and active in the editor area above to view lineage";
    try {
      this.queryManifestService
        .getProject()
        ?.throwDiagnosticsErrorIfAvailable();
    } catch (err) {
      this.dbtTerminal.error(
        "Lineage:getMissingLineageMessage",
        (err as Error).message,
        err,
      );
      return { message: (err as Error).message, type: "error" };
    }

    return { message, type: "warning" };
  }

  private getStartingNode():
    | {
        node?: Table;
        aiEnabled: boolean;
        missingLineageMessage?: { message: string; type: string };
      }
    | undefined {
    const aiEnabled = this.altimate.enabled();
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      this.dbtTerminal.info("Lineage:getStartingNode", "No event found");
      return {
        aiEnabled,
        missingLineageMessage: this.getMissingLineageMessage(),
      };
    }
    const { nodeMetaMap, functionMetaMap } = event.event;
    const editor = window.activeTextEditor;
    const tableName = this.getFilename();
    if (!editor || !tableName) {
      return {
        aiEnabled,
        missingLineageMessage: this.getMissingLineageMessage(),
      };
    }
    const url = editor.document.uri.path;
    const ext = path.extname(editor.document.fileName).toLowerCase();

    // For .py files, prioritize function lookup to avoid model/function
    // basename collisions (both could share the same name).
    if (ext === ".py") {
      const fn = functionMetaMap.get(tableName);
      if (fn) {
        const node = this.dbtLineageService.createTable(
          event.event,
          url,
          fn.unique_id,
        );
        return { node, aiEnabled };
      }
    }

    const _node = nodeMetaMap.lookupByBaseName(tableName);
    if (_node) {
      const key = _node.unique_id;
      const node = this.dbtLineageService.createTable(event.event, url, key);
      return { node, aiEnabled };
    }

    // Non-.py fallback: check if the active file is a dbt function.
    const fn = functionMetaMap.get(tableName);
    if (fn) {
      const node = this.dbtLineageService.createTable(
        event.event,
        url,
        fn.unique_id,
      );
      return { node, aiEnabled };
    }

    this.dbtTerminal.info(
      "Lineage:getStartingNode",
      `No node found for ${tableName}`,
    );
    return {
      aiEnabled,
      missingLineageMessage: this.getMissingLineageMessage(),
    };
  }

  protected renderWebviewView(webview: Webview) {
    this._panel!.webview.html = super.getHtml(
      webview,
      this.dbtProjectContainer.extensionUri,
    );
  }
}
