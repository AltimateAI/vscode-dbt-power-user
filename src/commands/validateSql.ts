import { basename } from "path";
import { AltimateRequest, ModelNode } from "../altimate";
import { ColumnMetaData, NodeMetaData, SourceTable } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import {
  DiagnosticCollection,
  ProgressLocation,
  Uri,
  ViewColumn,
  window,
} from "vscode";
import { DBTProject } from "../manifest/dbtProject";
import {
  commands,
  Diagnostic,
  DiagnosticSeverity,
  languages,
  Position,
  Range,
  workspace,
} from "vscode";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";
import { PythonException } from "python-bridge";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

@provideSingleton(ValidateSql)
export class ValidateSql {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private diagnosticsCollection: DiagnosticCollection;
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
    private dbtTerminal: DBTTerminal,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
    this.diagnosticsCollection = languages.createDiagnosticCollection();
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  private showError(exc: unknown) {
    if (exc instanceof PythonException) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `An error occured while trying to compile your model: ` +
            exc.exception.message +
            ".",
        ),
      );
      this.telemetry.sendTelemetryError(
        "validateSQLCompileNodePythonError",
        exc,
      );
      this.dbtTerminal.error(
        "validateSQLError",
        "Error encountered while compiling/retrieving schema for model",
        exc,
      );
      return;
    }
    this.telemetry.sendTelemetryError(
      "validateSQLCompileNodeUnknownError",
      exc,
    );
    // Unknown error
    window.showErrorMessage(
      extendErrorWithSupportLinks(
        "Could not validate SQL: " + (exc as Error).message,
      ),
    );
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
    const { graphMetaMap, nodeMetaMap } = event;
    const node = nodeMetaMap.get(modelName);
    if (!node) {
      return;
    }
    const parentNodes = graphMetaMap.parents.get(node.uniqueId)?.nodes;
    if (!parentNodes) {
      return;
    }

    const parentModels: ModelNode[] = [];
    let relationsWithoutColumns: string[] = [];
    let compiledQuery: string | undefined;
    await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Fetching metadata",
        cancellable: false,
      },
      async () => {
        try {
          const fileContentBytes = await workspace.fs.readFile(currentFilePath);
          try {
            compiledQuery = await project.unsafeCompileQuery(
              fileContentBytes.toString(),
            );
          } catch (error) {
            window.showErrorMessage(
              extendErrorWithSupportLinks(
                "Unable to compile query for model " +
                  node.name +
                  " : " +
                  error,
              ),
            );
            return;
          }
          const modelsToFetch = DBTProject.getNonEphemeralParents(event, [
            node.uniqueId,
          ]);
          const {
            mappedNode,
            relationsWithoutColumns: _relationsWithoutColumns,
          } = await project.getNodesWithDBColumns(event, modelsToFetch);
          parentModels.push(...modelsToFetch.map((n) => mappedNode[n]));
          relationsWithoutColumns = _relationsWithoutColumns;
        } catch (exc) {
          this.showError(exc);
        }
      },
    );
    if (!compiledQuery) {
      return;
    }

    if (relationsWithoutColumns.length !== 0) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Failed to fetch columns for " +
            relationsWithoutColumns.join(", ") +
            ". Probably the dbt models are not yet materialized.",
        ),
      );
    }

    const request = {
      sql: compiledQuery,
      dialect: project.getAdapterType(),
      models: parentModels,
    };
    const response = await this.getProject()?.validateSql(request);
    const activeUri = window.activeTextEditor?.document.uri;
    if (activeUri.scheme === SqlPreviewContentProvider.SCHEME) {
      // current focus on compiled sql document
      return;
    }
    const compileSQLUri = activeUri.with({
      scheme: SqlPreviewContentProvider.SCHEME,
    });
    const isOpen = !!window.visibleTextEditors.find(
      (item) => item.document.uri === compileSQLUri,
    );
    if (!response || !response?.error_type) {
      const tabGroup = window.tabGroups.all.find(
        (tabGroup) =>
          (tabGroup.activeTab?.input as { uri: Uri })?.uri.toString() ===
          compileSQLUri.toString(),
      );
      if (tabGroup) {
        await window.tabGroups.close(tabGroup);
      }
      window.showInformationMessage("SQL is valid.");
      this.diagnosticsCollection.set(compileSQLUri, []);
      return;
    }
    if (response.error_type === "sql_unknown_error") {
      window.showErrorMessage("Unable to validate SQL.");
      this.telemetry.sendTelemetryError(
        "validateSQLError",
        response.errors[0].description,
      );
      this.diagnosticsCollection.set(compileSQLUri, []);
      return;
    }
    if (
      response.error_type === "sql_parse_error" ||
      (response.errors.length > 0 && response.errors[0].start_position)
    ) {
      if (!isOpen) {
        const doc = await workspace.openTextDocument(compileSQLUri);
        await window.showTextDocument(doc, ViewColumn.Beside, true);
        await languages.setTextDocumentLanguage(doc, "sql");
      }
    }
    commands.executeCommand("workbench.action.problems.focus");

    const diagnostics = response?.errors?.map(
      ({ description, start_position, end_position }) => {
        let startPos = new Position(0, 1);
        let endPos = new Position(0, 1);
        if (start_position) {
          startPos = new Position(start_position[0], start_position[1]);
        }
        if (end_position) {
          endPos = new Position(end_position[0], end_position[1]);
        }
        return new Diagnostic(
          new Range(startPos, endPos),
          description,
          DiagnosticSeverity.Error,
        );
      },
    );

    this.diagnosticsCollection.set(compileSQLUri, diagnostics);
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
}
