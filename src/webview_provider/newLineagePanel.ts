import {
  DBTTerminal,
  ExposureMetaData,
  FunctionMetaData,
  NodeMetaData,
  RESOURCE_TYPE_FUNCTION,
  RESOURCE_TYPE_SOURCE,
  SourceMetaMap,
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
  TextDocument,
  TextEditor,
  Webview,
  window,
  workspace,
} from "vscode";
import { isMap, isScalar, isSeq, parseDocument } from "yaml";
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

// A source table resolved to the dbt unique_id key the lineage should root at
// (`source.<pkg>.<source>.<table>`).
interface ResolvedSourceTable {
  key: string;
  sourceName: string;
  table: SourceTable;
}

// 0-based line of `offset` within `text`.
function lineAtOffset(text: string, offset: number): number {
  let line = 0;
  for (let i = 0; i < offset && i < text.length; i++) {
    if (text.charCodeAt(i) === 10) {
      line++;
    }
  }
  return line;
}

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
  // The source unique_id the panel last rooted at when a source YAML is the
  // active file. Used to avoid redundant re-renders on every cursor move; the
  // panel only re-roots when the cursor moves onto a different source table.
  private lastRenderedSourceKey: string | undefined;

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
    // A different file is now active; forget the previously rooted source so a
    // source YAML re-rooted later (or on return) is always re-rendered.
    this.lastRenderedSourceKey = undefined;
    this.renderStartingNode();
  }

  // Re-root the lineage when the cursor moves to a different source table
  // within an open source YAML. This is what makes opening a `sources:` file
  // and clicking on a `- name:` entry show that source's lineage, mirroring the
  // dbt Cloud IDE. Guarded so ordinary cursor movement (same table, or any
  // non-source file) never triggers a redundant re-render.
  public changedTextEditorSelection(editor: TextEditor) {
    if (!this._panel) {
      return;
    }
    if (editor !== window.activeTextEditor) {
      return;
    }
    const ext = path.extname(editor.document.fileName).toLowerCase();
    if (!NewLineagePanel.SOURCE_YAML_EXTENSIONS.includes(ext)) {
      return;
    }
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const resolved = this.resolveSourceStartingNode(event.event, editor);
    const key = resolved?.key;
    if (key === this.lastRenderedSourceKey) {
      return;
    }
    // Thread the resolution into the render so getStartingNode doesn't have
    // to traverse sourceMetaMap a second time for the same cursor position.
    this.renderStartingNode(resolved);
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

  private renderStartingNode(resolvedSource?: ResolvedSourceTable) {
    if (!this._panel) {
      return;
    }
    this._panel.webview.postMessage({
      command: "render",
      args: this.getStartingNode(resolvedSource),
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

    if (command === "exportLineage") {
      try {
        const body = await this.altimate.exportLineage({
          name: params.name,
          lineage_data: params.lineage_data,
        });
        this._panel?.webview.postMessage({
          command: "response",
          args: { id, syncRequestId, body, status: true },
        });
      } catch (error) {
        this._panel?.webview.postMessage({
          command: "response",
          args: {
            id,
            syncRequestId,
            error: (error as Error).message,
            status: false,
          },
        });
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Could not export lineage: " + (error as Error).message,
          ),
        );
        this.telemetry.sendTelemetryError(
          "altimateLineageExportLineageError",
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

  // Sources are declared in YAML, which has no 1:1 file→node mapping (one file
  // can define many sources/tables). These extensions opt a file into the
  // cursor-aware source resolution in `getStartingNode`.
  private static readonly SOURCE_YAML_EXTENSIONS = [".yml", ".yaml"];

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

  private getStartingNode(resolvedSource?: ResolvedSourceTable):
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

    // Source YAML: a model/seed/function basename never matches, so by here the
    // active file may be a `sources:` definition. Root at the source the cursor
    // is on (or the file's only source table).
    if (NewLineagePanel.SOURCE_YAML_EXTENSIONS.includes(ext)) {
      const resolved =
        resolvedSource ?? this.resolveSourceStartingNode(event.event, editor);
      if (resolved) {
        // Record the key before the createTable null-check: if the service
        // fails for this key, the selection guard must still short-circuit
        // instead of re-triggering a full render on every cursor move.
        this.lastRenderedSourceKey = resolved.key;
        const node = this.dbtLineageService.createTable(
          event.event,
          resolved.table.path ?? url,
          resolved.key,
        );
        if (node) {
          return { node, aiEnabled };
        }
      }
    }

    // Only report this as telemetry for actual dbt files. A non-dbt file (e.g. a
    // .sh/.md script) can never be a dbt node, so the panel re-rendering on every
    // editor switch would otherwise emit this event constantly — pure noise. Keep
    // the output-channel log for debugging but skip telemetry for non-dbt files.
    const isDbtFile = NewLineagePanel.DBT_FILE_EXTENSIONS.includes(ext);
    this.dbtTerminal.info(
      "Lineage:getStartingNode",
      `No node found for ${tableName}`,
      isDbtFile,
    );
    return {
      aiEnabled,
      missingLineageMessage: this.getMissingLineageMessage(),
    };
  }

  // Resolve which source table the active YAML file should root the lineage at.
  // Returns the dbt unique_id key (`source.<pkg>.<source>.<table>`) and the
  // matched table. Prefers the table the cursor is on/under; falls back to the
  // file's single table, then to the first declared table for determinism.
  private resolveSourceStartingNode(
    event: ManifestCacheProjectAddedEvent,
    editor: TextEditor,
  ): ResolvedSourceTable | undefined {
    const { sourceMetaMap } = event;
    const matches = this.getSourceTablesForFile(
      sourceMetaMap,
      editor.document.uri.fsPath,
    );
    if (matches.length === 0) {
      return undefined;
    }
    if (matches.length === 1) {
      return matches[0];
    }
    return this.pickSourceTableByCursor(matches, editor) ?? matches[0];
  }

  // All source tables whose definition file is `filePath`. One YAML can declare
  // several sources, each with several tables, so this can return many matches.
  private getSourceTablesForFile(
    sourceMetaMap: SourceMetaMap,
    filePath: string,
  ): ResolvedSourceTable[] {
    const target = path.normalize(filePath);
    const matches: ResolvedSourceTable[] = [];
    for (const source of sourceMetaMap.values()) {
      for (const table of source.tables) {
        if (!table.path) {
          continue;
        }
        if (path.normalize(table.path) !== target) {
          continue;
        }
        matches.push({
          key: `${RESOURCE_TYPE_SOURCE}.${source.package_name}.${source.name}.${table.name}`,
          sourceName: source.name,
          table,
        });
      }
    }
    return matches;
  }

  // Of the candidate tables in the file, pick the one whose `name:` declaration
  // is the closest line at or above the cursor — i.e. the table the cursor sits
  // within. Returns undefined when the cursor is above every declaration.
  private pickSourceTableByCursor(
    matches: ResolvedSourceTable[],
    editor: TextEditor,
  ): ResolvedSourceTable | undefined {
    const cursorLine = editor.selection.active.line;
    const declLines = this.findSourceTableLines(editor.document);
    let best: ResolvedSourceTable | undefined;
    let bestLine = -1;
    for (const match of matches) {
      const declLine =
        declLines.get(`${match.sourceName}.${match.table.name}`) ?? -1;
      if (declLine >= 0 && declLine <= cursorLine && declLine > bestLine) {
        best = match;
        bestLine = declLine;
      }
    }
    return best;
  }

  // Line numbers of the `- name: <table>` declarations inside each source's
  // `tables:` block, keyed by `<source>.<table>`. Walks the YAML AST so a
  // source-level `name:`, a model name in a mixed-purpose schema file, or a
  // column that happens to share a table's name is never mistaken for a table
  // declaration — and the same table name under two sources in one file maps
  // to two distinct lines.
  private findSourceTableLines(document: TextDocument): Map<string, number> {
    const declLines = new Map<string, number>();
    const text = document.getText();
    let parsed;
    try {
      parsed = parseDocument(text);
    } catch {
      // Mid-edit YAML can be arbitrarily broken; fall back to "no
      // declarations found" and let the caller use its first-match default.
      return declLines;
    }
    const sources = parsed.get("sources");
    if (!isSeq(sources)) {
      return declLines;
    }
    for (const source of sources.items) {
      if (!isMap(source)) {
        continue;
      }
      const sourceName = source.get("name");
      const tables = source.get("tables");
      if (typeof sourceName !== "string" || !isSeq(tables)) {
        continue;
      }
      for (const table of tables.items) {
        if (!isMap(table)) {
          continue;
        }
        const nameNode = table.get("name", true);
        if (!isScalar(nameNode) || typeof nameNode.value !== "string") {
          continue;
        }
        const offset = nameNode.range?.[0];
        if (offset === undefined) {
          continue;
        }
        declLines.set(
          `${sourceName}.${nameNode.value}`,
          lineAtOffset(text, offset),
        );
      }
    }
    return declLines;
  }

  protected renderWebviewView(webview: Webview) {
    this._panel!.webview.html = super.getHtml(
      webview,
      this.dbtProjectContainer.extensionUri,
    );
  }
}
