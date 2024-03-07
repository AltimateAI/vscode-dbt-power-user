import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { Position, ProgressLocation, Range, window } from "vscode";
import * as path from "path";

@provideSingleton(SqlToModel)
export class SqlToModel {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
    private dbtTerminal: DBTTerminal,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  async getModelFromSql() {
    if (!this.altimate.handlePreviewFeatures()) {
      return;
    }
    this.telemetry.sendTelemetryEvent("sqlToModel");
    if (!window.activeTextEditor) {
      return;
    }
    const activedoc = window.activeTextEditor;
    const currentFilePath = activedoc.document.uri;
    const model = path.basename(
      window.activeTextEditor!.document.fileName,
      ".sql",
    );
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (!project) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not find a dbt project. Please put the new model in a dbt project before converting to a model.",
        ),
      );
      this.telemetry.sendTelemetryError("sqlToModelNoProjectError");
      return;
    }
    const event = this.eventMap.get(project.projectRoot.fsPath);
    if (!event) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not convert to model due to pending initiation, Please retry again.",
        ),
      );
      this.telemetry.sendTelemetryError("sqlToModelNoManifestError");
      return;
    }
    const { nodeMetaMap, sourceMetaMap } = event;
    const allmodels = Array.from(nodeMetaMap.values());
    const allsources = Array.from(sourceMetaMap.values());

    const fileText = activedoc.document.getText();
    try {
      const sqlToModelResponse = await window.withProgress(
        {
          location: ProgressLocation.Notification,
          title: "Convert SQL to Model...",
          cancellable: false,
        },
        async () => {
          let compiledSql: string | undefined;
          try {
            compiledSql = await project.unsafeCompileQuery(fileText);
          } catch (error) {
            window.showErrorMessage(
              extendErrorWithSupportLinks(
                "Could not compile the SQL: " + (error as Error).message,
              ),
            );
            return;
          }
          return await this.altimate.runModeller({
            // if we can run this through compile sql, we can also do
            // conversions that were half done. if it fails, just send the text as is.
            sql: compiledSql || fileText,
            adapter: project.getAdapterType(),
            models: allmodels,
            sources: allsources,
          });
        },
      );

      // if somehow the response isnt there or got an error response
      if (
        sqlToModelResponse === undefined ||
        sqlToModelResponse.sql === undefined
      ) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Could not convert sql to model. Encountered unknown error when converting sql to model.",
          ),
        );
        this.dbtTerminal.error(
          "sqlToModelEmptyBackendResponseError",
          `Could not convert sql to model for query: ${fileText}`,
          new Error("Empty response from backend"),
        );
        return;
      }

      const startpos = new Position(0, 0);
      const endpos = new Position(
        activedoc.document.lineCount,
        activedoc.document.lineAt(activedoc.document.lineCount - 1).text.length,
      );
      activedoc.edit((editBuilder) => {
        editBuilder.replace(
          new Range(startpos, endpos),
          sqlToModelResponse.sql,
        );
      });
      window.showInformationMessage(
        `SQL successfully converted to model ${model}`,
      );
    } catch (err) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not convert SQL to model: " + (err as Error).message,
        ),
      );
      this.dbtTerminal.error(
        "sqlToModelError",
        `Could not convert sql to model for query: ${fileText}`,
        err,
      );
    }
  }
}
