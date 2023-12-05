import { basename } from "path";
import { AltimateRequest, ModelNode } from "../altimate";
import {
  ColumnMetaData,
  NodeMetaData,
  SourceMetaData,
  SourceTable,
} from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { ProgressLocation, window } from "vscode";
import { DBTProject } from "../manifest/dbtProject";
import {
  Diagnostic,
  DiagnosticSeverity,
  languages,
  Position,
  Range,
} from "vscode";

@provideSingleton(ValidateSql)
export class ValidateSql {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  async validateSql() {
    this.telemetry.sendTelemetryEvent("validateSql");
    if (!window.activeTextEditor) {
      return;
    }
    const activedoc = window.activeTextEditor;
    const currentFilePath = activedoc.document.uri;
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (project) {
      const modelName = basename(currentFilePath.fsPath, ".sql");

      const event = this.getEvent();
      if (!event) {
        return;
      }
      const { graphMetaMap } = event;
      const node = event.nodeMetaMap.get(modelName);
      if (!node) {
        return;
      }
      const parentNodes = graphMetaMap.parents.get(node.uniqueId)?.nodes;
      if (!parentNodes) {
        return;
      }
      const models = await Promise.all(
        parentNodes?.map((parentNode) =>
          this.getNodeWithDBColumns(parentNode.key),
        ),
      );
      const compiledQuery = await project.compileNode(modelName);
      if (compiledQuery) {
        const request = {
          sql: compiledQuery,
          dialect: project.getAdapterType(),
          models: models.map((model) => model!.node),
        };
        const response = await this.getProject()?.validateSql(request);
        const diagnosticsCollection = languages.createDiagnosticCollection();

        const diagnostics = response?.errors?.map(
          (e) =>
            new Diagnostic(
              new Range(new Position(10, 10), new Position(11, 11)),
              e,
              DiagnosticSeverity.Error,
            ),
        );

        diagnosticsCollection.set(
          window.activeTextEditor?.document.uri,
          diagnostics,
        );
      }
    }
  }

  private getProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }

  private getEvent(): ManifestCacheProjectAddedEvent | undefined {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }

    const event = this.eventMap.get(projectRootpath.fsPath);
    if (event === undefined) {
      return;
    }
    return event;
  }

  private async addModelColumnsFromDB(project: DBTProject, node: NodeMetaData) {
    // Disabling cache
    // const now = Date.now();
    // if (
    //   !this.dbCache.has(node.name) ||
    //   (this.lruCache.get(node.name) || 0) < now - CACHE_VALID_TIME
    // ) {
    //   const _columnsFromDB = await project.getColumnsOfModel(node.name);
    //   this.dbCache.set(node.name, _columnsFromDB);
    //   if (this.dbCache.size > CACHE_SIZE) {
    //     const arr = Array.from(this.lruCache.entries());
    //     arr.sort((a, b) => b[1] - a[1]);
    //     arr.slice(CACHE_SIZE).forEach(([k]) => {
    //       this.lruCache.delete(k);
    //       this.dbCache.delete(k);
    //     });
    //   }
    // }
    // this.lruCache.set(node.name, now);
    // const columnsFromDB = this.dbCache.get(node.name)!;
    const columnsFromDB = await project.getColumnsOfModel(node.name);
    console.log("addColumnsFromDB: ", node.name, " -> ", columnsFromDB);
    if (!columnsFromDB || columnsFromDB.length === 0) {
      return false;
    }
    if (columnsFromDB.length > 100) {
      // Flagging events where more than 100 columns are fetched from db to get a sense of how many of these happen
      this.telemetry.sendTelemetryEvent(
        "columnLineageExcessiveColumnsFetchedFromDB",
      );
    }
    const columns: Record<string, ColumnMetaData> = {};
    Object.entries(node.columns).forEach(([k, v]) => {
      columns[k.toLowerCase()] = v;
    });

    columnsFromDB.forEach((c) => {
      const existing_column = columns[c.column.toLowerCase()];
      if (existing_column) {
        existing_column.data_type = existing_column.data_type || c.dtype;
        return;
      }
      node.columns[c.column] = {
        name: c.column,
        data_type: c.dtype,
        description: "",
      };
    });
    if (Object.keys(node.columns).length > columnsFromDB.length) {
      // Flagging events where columns fetched from db are less than the number of columns in the manifest
      this.telemetry.sendTelemetryEvent("columnLineagePossibleStaleSchema");
    }
    return true;
  }

  private async addSourceColumnsFromDB(
    project: DBTProject,
    nodeName: string,
    table: SourceTable,
  ) {
    const now = Date.now();
    const columnsFromDB = await project.getColumnsOfSource(
      nodeName,
      table.name,
    );
    console.log("addColumnsFromDB: ", nodeName, " -> ", columnsFromDB);
    if (!columnsFromDB || columnsFromDB.length === 0) {
      return false;
    }
    if (columnsFromDB.length > 100) {
      // Flagging events where more than 100 columns are fetched from db to get a sense of how many of these happen
      this.telemetry.sendTelemetryEvent(
        "columnLineageExcessiveColumnsFetchedFromDB",
      );
    }
    const columns: Record<string, ColumnMetaData> = {};
    Object.entries(table.columns).forEach(([k, v]) => {
      columns[k.toLowerCase()] = v;
    });

    columnsFromDB.forEach((c) => {
      const existing_column = columns[c.column.toLowerCase()];
      if (existing_column) {
        existing_column.data_type = existing_column.data_type || c.dtype;
        return;
      }
      table.columns[c.column] = {
        name: c.column,
        data_type: c.dtype,
        description: "",
      };
    });
    if (Object.keys(table.columns).length > columnsFromDB.length) {
      // Flagging events where columns fetched from db are less than the number of columns in the manifest
      this.telemetry.sendTelemetryEvent("columnLineagePossibleStaleSchema");
    }
    return true;
  }

  private async getColumns(table: string): Promise<
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
      }
    | undefined
  > {
    const event = this.getEvent();
    if (!event) {
      return;
    }
    const project = this.getProject();
    if (!project) {
      return;
    }
    const splits = table.split(".");
    const nodeType = splits[0];
    if (nodeType === DBTProject.RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = event;
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
      const ok = await window.withProgress(
        {
          title: "Fetching metadata",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          // TODO: the cache should also support sources
          // this.lruCache.delete(node.name);
          // this.dbCache.delete(node.name);
          return await this.addSourceColumnsFromDB(project, node.name, _table);
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
      return {
        id: table,
        purpose: _table.description,
        columns: Object.values(_table.columns)
          .map((c) => ({
            table,
            name: c.name,
            datatype: c.data_type || "",
            can_lineage_expand: false,
            description: c.description,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
    }
    const tableName = splits[2];
    const { nodeMetaMap } = event;
    const node = nodeMetaMap.get(tableName);
    if (!node) {
      return;
    }
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
        // this.lruCache.delete(node.name);
        // this.dbCache.delete(node.name);
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

    return {
      id: table,
      purpose: node.description,
      columns: Object.values(node.columns)
        .map((c) => ({
          table,
          name: c.name,
          datatype: c.data_type || "",
          can_lineage_expand: false,
          description: c.description,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }

  private async getNodeWithDBColumns(
    key: string,
  ): Promise<
    | { dbColumnAdded: boolean; node: ModelNode; isEphemeral?: boolean }
    | undefined
  > {
    const event = this.getEvent();
    if (!event) {
      return;
    }
    const project = this.getProject();
    if (!project) {
      return;
    }
    const splits = key.split(".");
    const nodeType = splits[0];
    const { nodeMetaMap, sourceMetaMap } = event;
    if (nodeType === DBTProject.RESOURCE_TYPE_SOURCE) {
      const source = sourceMetaMap.get(splits[2]);
      const tableName = splits[3];
      if (!source) {
        return;
      }
      const table = source?.tables.find((t) => t.name === tableName);
      if (!table) {
        return;
      }
      const dbColumnAdded = await this.addSourceColumnsFromDB(
        project,
        source.name,
        table,
      );
      const node = {
        database: source.database,
        schema: source.schema,
        name: table.name,
        alias: table.name,
        uniqueId: key,
        columns: table.columns,
      };
      return { dbColumnAdded, node };
    }
    const node = nodeMetaMap.get(splits[2]);
    if (!node) {
      return;
    }
    if (node.config.materialized === "ephemeral") {
      return { dbColumnAdded: false, node, isEphemeral: true };
    }
    const dbColumnAdded = await this.addModelColumnsFromDB(project, node);
    return { dbColumnAdded, node };
  }
}
