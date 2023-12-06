import { basename } from "path";
import {
  AltimateRequest,
  ModelNode,
  ValidateSqlParseErrorType,
} from "../altimate";
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
  commands,
} from "vscode";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";

const ValidateSqlErrorSeverity: Record<
  ValidateSqlParseErrorType,
  DiagnosticSeverity
> = {
  sql_parse_error: DiagnosticSeverity.Error,
  sql_invalid_error: DiagnosticSeverity.Error,
  sql_execute_error: DiagnosticSeverity.Warning,
};

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
    if (!project) {
      await window.showErrorMessage("Unable to build project");
      return;
    }
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

    const models: ModelNode[] = [];
    let compiledQuery: string | undefined;
    await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Validating SQL",
        cancellable: false,
      },
      async () => {
        compiledQuery = await project.compileNode(modelName);
        if (!compiledQuery) {
          return;
        }
        const queue: string[] = parentNodes.map((n) => n.key);
        const visited: Record<string, boolean> = {};
        while (queue.length > 0) {
          const curr = queue.shift()!;
          if (visited[curr]) {
            continue;
          }
          visited[curr] = true;
          const model = await this.getNodeWithDBColumns(curr);
          if (!model) {
            continue;
          }
          const { node, isEphemeral } = model;
          if (isEphemeral) {
            queue.push(
              ...(graphMetaMap.parents.get(curr)?.nodes?.map((n) => n.key) ||
                []),
            );
          } else {
            models.push(node);
          }
        }
      },
    );
    if (!compiledQuery || models.length === 0) {
      await window.showErrorMessage("Unable to compile sql query");
      return;
    }

    const request = {
      sql: compiledQuery,
      dialect: project.getAdapterType(),
      models,
    };
    const response = await this.getProject()?.validateSql(request);
    if (!response || !response?.error_type) {
      await window.showInformationMessage("SQL is valid.");
      return;
    }
    let uri = window.activeTextEditor?.document.uri;
    if (response.error_type === "sql_parse_error") {
      await commands.executeCommand("dbtPowerUser.sqlPreview");
      uri = window.activeTextEditor?.document.uri.with({
        scheme: SqlPreviewContentProvider.SCHEME,
      });
    }
    commands.executeCommand("workbench.action.problems.focus");
    const diagnosticsCollection = languages.createDiagnosticCollection();

    const diagnostics = response?.errors?.map(
      ({ description, start_position, end_position }) =>
        new Diagnostic(
          new Range(
            new Position(start_position?.[0] || 0, start_position?.[1] || 0),
            new Position(end_position?.[0] || 0, end_position?.[1] || 0),
          ),
          description,
          ValidateSqlErrorSeverity[response.error_type!],
        ),
    );

    diagnosticsCollection.set(uri, diagnostics);
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
