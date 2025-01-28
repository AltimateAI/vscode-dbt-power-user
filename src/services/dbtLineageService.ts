import {
  AltimateRequest,
  DBTProject,
  DBTTerminal,
  QueryManifestService,
  TelemetryService,
} from "@extension";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { ColumnMetaData, GraphMetaMap, NodeGraphMap } from "../domain";
import {
  CancellationToken,
  CancellationTokenSource,
  env,
  ProgressLocation,
  Uri,
  window,
  workspace,
} from "vscode";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { ModelInfo } from "../altimate";
import { AbortError } from "node-fetch";

export enum CllEvents {
  START = "start",
  END = "end",
  CANCEL = "cancel",
}

const CAN_COMPILE_SQL_NODE = [
  DBTProject.RESOURCE_TYPE_MODEL,
  DBTProject.RESOURCE_TYPE_SNAPSHOT,
  DBTProject.RESOURCE_TYPE_ANALYSIS,
];
const canCompileSQL = (nodeType: string) =>
  CAN_COMPILE_SQL_NODE.includes(nodeType);

export type Table = {
  label: string;
  table: string;
  url: string | undefined;
  downstreamCount: number;
  upstreamCount: number;
  nodeType: string;
  materialization?: string;
  description?: string;
  tests: any[];
  meta?: Map<string, any>;
  isExternalProject: boolean;
  columns: { [columnName: string]: ColumnMetaData };
  patchPath?: string;
  packageName?: string;
};

class DerivedCancellationTokenSource extends CancellationTokenSource {
  constructor(linkedToken: CancellationToken) {
    super();
    linkedToken.onCancellationRequested(() => {
      super.cancel();
    });
  }
}

@provideSingleton(DbtLineageService)
export class DbtLineageService {
  private cllProgressResolve: () => void = () => {};

  public constructor(
    private altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
    private queryManifestService: QueryManifestService,
  ) {}

  async handleColumnLineage(
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
    this.cancellationTokenSource?.token.onCancellationRequested((e) => {
      console.log(e);
    });
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

  getUpstreamTables({ table }: { table: string }) {
    return { tables: this.getConnectedTables("children", table) };
  }

  getDownstreamTables({ table }: { table: string }) {
    return { tables: this.getConnectedTables("parents", table) };
  }

  private getConnectedTables(
    key: keyof GraphMetaMap,
    table: string,
  ): Table[] | undefined {
    const _event = this.queryManifestService.getEventByCurrentProject();
    if (!_event) {
      return;
    }
    const { event } = _event;
    if (!event) {
      return;
    }
    const { graphMetaMap } = event;
    const dependencyNodes = graphMetaMap[key];
    const node = dependencyNodes.get(table);
    if (!node) {
      return;
    }
    const tables: Map<string, Table> = new Map();
    node.nodes.forEach(({ url, key }) => {
      const _node = this.createTable(event, url, key);
      if (!_node) {
        return;
      }
      if (!tables.has(_node.table)) {
        tables.set(_node.table, _node);
      }
    });
    return Array.from(tables.values()).sort((a, b) =>
      a.table.localeCompare(b.table),
    );
  }

  createTable(
    event: ManifestCacheProjectAddedEvent,
    tableUrl: string | undefined,
    key: string,
  ): Table | undefined {
    const splits = key.split(".");
    const nodeType = splits[0];
    const { graphMetaMap, testMetaMap } = event;
    const upstreamCount = this.getConnectedNodeCount(
      graphMetaMap["children"],
      key,
    );
    const downstreamCount = this.getConnectedNodeCount(
      graphMetaMap["parents"],
      key,
    );
    if (nodeType === DBTProject.RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = event;
      const schema = splits[2];
      const table = splits[3];
      const _node = sourceMetaMap.get(schema);
      if (!_node) {
        return;
      }
      const _table = _node.tables.find((t) => t.name === table);
      if (!_table) {
        return;
      }
      return {
        table: key,
        label: table,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        isExternalProject: _node.is_external_project,
        tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
          const testKey = n.label.split(".")[0];
          return { ...testMetaMap.get(testKey), key: testKey };
        }),
        columns: _table.columns,
        description: _table?.description,
        packageName: _node.package_name,
      };
    }
    if (nodeType === DBTProject.RESOURCE_TYPE_METRIC) {
      return {
        table: key,
        label: splits[2],
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        materialization: undefined,
        tests: [],
        columns: {},
        isExternalProject: false,
      };
    }
    const { nodeMetaMap } = event;

    const table = splits[2];
    if (nodeType === DBTProject.RESOURCE_TYPE_EXPOSURE) {
      return {
        table: key,
        label: table,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        materialization: undefined,
        tests: [],
        columns: {},
        isExternalProject: false,
      };
    }

    const node = nodeMetaMap.lookupByUniqueId(key);
    if (!node) {
      return;
    }

    const materialization = node.config.materialized;
    return {
      table: key,
      label: node.alias,
      url: tableUrl,
      upstreamCount,
      downstreamCount,
      isExternalProject: node.is_external_project,
      nodeType,
      materialization,
      description: node.description,
      columns: node.columns,
      patchPath: node.patch_path,
      tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
        const testKey = n.label.split(".")[0];
        return { ...testMetaMap.get(testKey), key: testKey };
      }),
      packageName: node.package_name,
      meta: node.meta,
    };
  }

  private getConnectedNodeCount(g: NodeGraphMap, key: string) {
    return g.get(key)?.nodes.length || 0;
  }

  cancellationTokenSource: CancellationTokenSource | undefined;
  async getConnectedColumns({
    targets,
    upstreamExpansion,
    currAnd1HopTables,
    selectedColumn,
    showIndirectEdges,
    eventType,
  }: {
    targets: [string, string][];
    upstreamExpansion: boolean;
    currAnd1HopTables: string[];
    // select_column is used for pricing not business logic
    selectedColumn: { name: string; table: string };
    showIndirectEdges: boolean;
    eventType: string;
  }) {
    const _event = this.queryManifestService.getEventByCurrentProject();
    if (!_event) {
      return;
    }
    const { event } = _event;
    if (!event) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }

    const modelInfos: ModelInfo[] = [];
    let upstream_models: string[] = [];
    let auxiliaryTables: string[] = []; // these are used for better sqlglot parsing
    let sqlTables: string[] = []; // these are used which models should be compiled sql
    currAnd1HopTables = Array.from(new Set(currAnd1HopTables));
    const currTables = new Set(targets.map((t) => t[0]));
    if (upstreamExpansion) {
      const hop1Tables = currAnd1HopTables.filter((t) => !currTables.has(t));
      upstream_models = [...hop1Tables];
      sqlTables = [...hop1Tables];
      auxiliaryTables = DBTProject.getNonEphemeralParents(event, hop1Tables);
    } else {
      auxiliaryTables = DBTProject.getNonEphemeralParents(
        event,
        Array.from(currTables),
      );
      sqlTables = Array.from(currTables);
    }
    currAnd1HopTables = Array.from(new Set(currAnd1HopTables));
    const modelsToFetch = Array.from(
      new Set([...currAnd1HopTables, ...auxiliaryTables, selectedColumn.table]),
    );
    // using artifacts(mappedCompiledSql) from getNodesWithDBColumns as optimization
    const { mappedNode, relationsWithoutColumns, mappedCompiledSql } =
      await project.getNodesWithDBColumns(
        event,
        modelsToFetch,
        this.cancellationTokenSource!.token,
      );

    const selected_column = {
      model_node: mappedNode[selectedColumn.table],
      column: selectedColumn.name,
    };

    if (this.cancellationTokenSource?.token.isCancellationRequested) {
      return { column_lineage: [] };
    }

    const modelsToCompile = modelsToFetch.filter((key) => {
      if (!sqlTables.includes(key)) {
        return false;
      }
      const nodeType = key.split(".")[0];
      if (!canCompileSQL(nodeType)) {
        return false;
      }
      return true;
    });
    const bulkCompiledSql = await project.getBulkCompiledSql(
      event,
      modelsToCompile.filter((m) => !mappedCompiledSql[m]),
    );
    for (const key of modelsToFetch) {
      const node = mappedNode[key];
      if (!node) {
        continue;
      }
      if (modelsToCompile.includes(key)) {
        // rawSql only for debuging propose in backend
        let rawSql: string = "";
        if (node.path) {
          try {
            rawSql = (
              await workspace.fs.readFile(Uri.file(node.path))
            ).toString();
          } catch (e) {
            this.dbtTerminal.warn(
              "readRawSql",
              `Unable to read raw sql file ${node.path}`,
            );
          }
        }
        modelInfos.push({
          model_node: node,
          compiled_sql: mappedCompiledSql[key] || bulkCompiledSql[key],
          raw_sql: rawSql,
        });
      } else {
        modelInfos.push({ model_node: node });
      }
    }

    if (relationsWithoutColumns.length !== 0) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Failed to fetch columns for " +
            relationsWithoutColumns.join(", ") +
            ". Probably the dbt models are not yet materialized.",
        ),
      );
      // we still show the lineage for the rest of the models whose
      // schemas we could get so not returning here
    }

    const targetTables = Array.from(new Set(targets.map((t) => t[0])));
    // targets should not empty
    if (targets.length === 0 || modelInfos.length < targetTables.length) {
      this.telemetry.sendTelemetryError("columnLineageLogicError", {
        targets,
        modelInfos,
        upstreamExpansion,
        currAnd1HopTables,
        selectedColumn,
      });
      return { column_lineage: [] };
    }

    // the case where upstream/downstream only has ephemeral models
    if (modelInfos.length === targetTables.length) {
      return { column_lineage: [] };
    }
    const models = modelInfos.map((m) => m.model_node.uniqueId);
    const hasAllModels = targets.every((t) => models.includes(t[0]));
    if (!hasAllModels) {
      // most probably error message is already shown in above checks
      return { column_lineage: [] };
    }

    const modelDialect = project.getAdapterType();
    try {
      if (this.cancellationTokenSource?.token.isCancellationRequested) {
        return { column_lineage: [] };
      }
      const sessionId = `${env.sessionId}-${selectedColumn.table}-${selectedColumn.name}`;
      const request = {
        model_dialect: modelDialect,
        model_info: modelInfos,
        upstream_expansion: upstreamExpansion,
        upstream_models,
        targets: targets.map((t) => ({ uniqueId: t[0], column_name: t[1] })),
        selected_column: selected_column!,
        session_id: sessionId,
        show_indirect_edges: showIndirectEdges,
        event_type: eventType,
      };
      this.dbtTerminal.debug(
        "newLineagePanel:getConnectedColumns",
        "request",
        request,
      );
      const startTime = Date.now();
      const result = await this.altimateRequest.getColumnLevelLineage(request);
      const apiTime = Date.now() - startTime;
      this.dbtTerminal.debug(
        "newLineagePanel:getConnectedColumns",
        "response",
        result,
      );
      this.telemetry.sendTelemetryEvent("columnLineageTimes", {
        apiTime: apiTime.toString(),
        modelInfosLength: modelInfos.length.toString(),
      });
      console.log("lineageTimings:", {
        apiTime: apiTime.toString(),
        modelInfosLength: modelInfos.length.toString(),
      });
      if (!result.errors_dict && result.errors && result.errors.length > 0) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(result.errors.join("\n")),
        );
        this.telemetry.sendTelemetryError("columnLineageApiError", {
          errors: result.errors,
        });
      }
      const column_lineage =
        result.column_lineage.map((c) => ({
          source: [c.source.uniqueId, c.source.column_name],
          target: [c.target.uniqueId, c.target.column_name],
          type: c.type,
          viewsType: c.views_type,
          viewsCode: c.views_code,
        })) || [];
      return {
        column_lineage,
        confidence: result.confidence,
        errors: result.errors_dict,
      };
    } catch (error) {
      if (error instanceof AbortError) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Fetching column level lineage timed out.",
          ),
        );
        this.telemetry.sendTelemetryError(
          "columnLevelLineageRequestTimeout",
          error,
        );
        return;
      }
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not generate column level lineage: " +
            (error as Error).message,
        ),
      );
      this.telemetry.sendTelemetryError("ColumnLevelLineageError", error);
      return;
    }
  }
}
