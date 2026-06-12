import { DBTTerminal } from "@altimateai/dbt-integration";
import { inject } from "inversify";
import { basename } from "path";
import { PythonException } from "python-bridge";
import {
  CancellationToken,
  commands,
  Diagnostic,
  DiagnosticCollection,
  DiagnosticSeverity,
  env,
  languages,
  Position,
  ProgressLocation,
  Range,
  Uri,
  ViewColumn,
  window,
  workspace,
} from "vscode";
import { AltimateRequest, ModelNode } from "../altimate";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../dbt_client/event/manifestCacheChangedEvent";
import { AltimateCodeChatService } from "../services/altimateCodeChatService";
import {
  buildManifestErrorPrompt,
  buildSqlCompileErrorPrompt,
  buildSqlValidationPrompt,
} from "../services/chatPromptBuilders";
import { TelemetryService } from "../telemetry";
import { TelemetryEvents } from "../telemetry/events";
import { extendErrorWithSupportLinks } from "../utils";

export class ValidateSql {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private diagnosticsCollection: DiagnosticCollection;
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
    private altimateCodeChatService: AltimateCodeChatService,
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
    if (currentFilePath.scheme === SqlPreviewContentProvider.SCHEME) {
      // The compiled-SQL preview is a read-only derived artifact served by a
      // TextDocumentContentProvider; workspace.fs has no provider for its
      // scheme, so reading it throws ENOPRO. Validate SQL operates on the
      // source model, so there is nothing to validate from the preview.
      window.showInformationMessage(
        "Validate SQL runs on a dbt model file, not the compiled SQL preview.",
      );
      return;
    }
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (!project) {
      await window.showErrorMessage("Unable to build project");
      return;
    }
    const modelName = basename(currentFilePath.fsPath, ".sql");

    // Read model SQL early so all error paths can include it in the chat prompt.
    let rawSql: string | undefined;
    try {
      const bytes = await workspace.fs.readFile(currentFilePath);
      rawSql = bytes.toString();
    } catch {
      // Best-effort — proceed without SQL in the error prompt if the read fails.
    }

    const event = this.getEvent();
    if (!event) {
      const clicked = await window.showErrorMessage(
        extendErrorWithSupportLinks(
          "dbt manifest not loaded. Run `dbt parse` or wait for the manifest to load, then try again.",
        ),
        "Fix with Altimate Code",
      );
      if (clicked === "Fix with Altimate Code") {
        this.telemetry.sendTelemetryEvent(
          TelemetryEvents["AltimateCode/ValidateSqlManifestErrorClick"],
          { modelName, reason: "manifest_not_loaded" },
        );
        await this.altimateCodeChatService.openChat({
          initialMessage: buildManifestErrorPrompt(
            modelName,
            rawSql,
            "dbt manifest is not loaded (dbt parse may be failing due to a broken ref or config error)",
          ),
          title: `Fix parse error: ${modelName}`,
          beside: true,
        });
      }
      return;
    }
    const { graphMetaMap, nodeMetaMap } = event;
    const node = nodeMetaMap.lookupByBaseName(modelName);
    if (!node) {
      const clicked = await window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Model '${modelName}' not found in the manifest. Run \`dbt parse\` to refresh the manifest.`,
        ),
        "Fix with Altimate Code",
      );
      if (clicked === "Fix with Altimate Code") {
        this.telemetry.sendTelemetryEvent(
          TelemetryEvents["AltimateCode/ValidateSqlManifestErrorClick"],
          { modelName, reason: "model_not_found" },
        );
        await this.altimateCodeChatService.openChat({
          initialMessage: buildManifestErrorPrompt(
            modelName,
            rawSql,
            "model not found in manifest after dbt parse",
          ),
          title: `Fix parse error: ${modelName}`,
          beside: true,
        });
      }
      return;
    }
    const parentNodes = graphMetaMap.parents.get(node.unique_id)?.nodes;
    if (!parentNodes) {
      const clicked = await window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to resolve parent models for '${modelName}'. Check that all referenced models exist and run \`dbt parse\`.`,
        ),
        "Fix with Altimate Code",
      );
      if (clicked === "Fix with Altimate Code") {
        this.telemetry.sendTelemetryEvent(
          TelemetryEvents["AltimateCode/ValidateSqlManifestErrorClick"],
          { modelName, reason: "parent_graph_missing" },
        );
        await this.altimateCodeChatService.openChat({
          initialMessage: buildManifestErrorPrompt(
            modelName,
            rawSql,
            "could not resolve parent models (broken ref or missing source)",
          ),
          title: `Fix parse error: ${modelName}`,
          beside: true,
        });
      }
      return;
    }

    const parentModels: ModelNode[] = [];
    let relationsWithoutColumns: string[] = [];
    let compiledQuery: string | undefined;
    let cancellationToken: CancellationToken | undefined;
    let abortController: AbortController | undefined;
    await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Validating SQL",
        cancellable: true,
      },
      async (_, token) => {
        try {
          cancellationToken = token;
          abortController = new AbortController();
          token.onCancellationRequested(() => abortController!.abort());
          const fileContentBytes = await workspace.fs.readFile(currentFilePath);
          if (cancellationToken.isCancellationRequested) {
            return;
          }
          try {
            compiledQuery = await project.unsafeCompileQuery(
              fileContentBytes.toString(),
              modelName,
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
          if (cancellationToken.isCancellationRequested) {
            return;
          }
          const modelsToFetch = project.getNonEphemeralParents([
            node.unique_id,
          ]);
          const {
            mappedNode,
            relationsWithoutColumns: _relationsWithoutColumns,
          } = await project.getNodesWithDBColumns(
            modelsToFetch,
            abortController!.signal,
          );
          parentModels.push(...modelsToFetch.map((n) => mappedNode[n]));
          relationsWithoutColumns = _relationsWithoutColumns;
        } catch (exc) {
          this.showError(exc);
        }
      },
    );
    if (cancellationToken?.isCancellationRequested) {
      return;
    }
    if (!compiledQuery) {
      const clicked = await window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to compile SQL for model '${modelName}'. Check that all referenced models and sources exist.`,
        ),
        "Fix with Altimate Code",
      );
      if (clicked === "Fix with Altimate Code") {
        this.telemetry.sendTelemetryEvent(
          TelemetryEvents["AltimateCode/ValidateSqlCompileErrorClick"],
          { modelName },
        );
        await this.altimateCodeChatService.openChat({
          initialMessage: buildSqlCompileErrorPrompt(modelName, rawSql),
          title: `Fix compile error: ${modelName}`,
          beside: true,
        });
      }
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
    const compileSQLUri = currentFilePath.with({
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
        const diagnostic = new Diagnostic(
          new Range(startPos, endPos),
          description,
          DiagnosticSeverity.Error,
        );
        diagnostic.source = "dbt Power User";
        diagnostic.code = {
          value: "Fix with Altimate Code",
          target: Uri.parse(
            `${env.uriScheme}://innoverio.vscode-dbt-power-user/troubleshoot?source=dbt&error=${encodeURIComponent(description)}`,
          ),
        };
        return diagnostic;
      },
    );

    this.diagnosticsCollection.set(compileSQLUri, diagnostics);

    const sqlErrors = response.errors ?? [];
    if (sqlErrors.length > 0) {
      const errorSummary = sqlErrors
        .slice(0, 2)
        .map((e: { description: string }) => e.description)
        .join("; ");
      const clicked = await window.showErrorMessage(
        `SQL validation: ${sqlErrors.length} error(s) — ${errorSummary}`,
        "Fix this SQL",
      );
      if (clicked === "Fix this SQL") {
        this.telemetry.sendTelemetryEvent(
          TelemetryEvents["AltimateCode/SqlValidationFixClick"],
          { modelName },
          { errorCount: sqlErrors.length },
        );
        await this.altimateCodeChatService.openChat({
          initialMessage: buildSqlValidationPrompt(
            compiledQuery,
            sqlErrors,
            modelName,
            project.getAdapterType(),
          ),
          title: `Fix SQL: ${modelName}`,
          beside: true,
        });
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
}
