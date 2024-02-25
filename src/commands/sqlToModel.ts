import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { CustomUnknownException } from "../dbt_client/exception";
import { NodeMetaData, SourceMetaData } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import { Position, Range, window } from "vscode";

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
    const allmodels: NodeMetaData[] = [];
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (project === undefined) {
      window.showErrorMessage(
        "Could not find a dbt project. \
      Please put the new model in a dbt project before converting to a model.",
      );
      this.telemetry.sendTelemetryError("sqlToModelNoProjectError");
      return undefined;
    }
    const event = this.eventMap.get(project.projectRoot.fsPath);
    if (event === undefined) {
      window.showErrorMessage(
        "Could not convert to model due to pending initiation, \
      Please retry again.",
      );
      this.telemetry.sendTelemetryError("sqlToModelNoManifestError");
      return undefined;
    }
    const rriter = event.nodeMetaMap.values();
    for (const rrvalue of rriter) {
      allmodels.push(rrvalue);
    }

    const allsources: SourceMetaData[] = [];
    const srcriter = event.sourceMetaMap.values();
    for (const srcvalue of srcriter) {
      allsources.push(srcvalue);
    }

    const fileText = activedoc.document.getText();
    let compiledSql;
    try {
      compiledSql = await project.unsafeCompileQuery(fileText);
    } catch (error) {
      window.showErrorMessage(
        "Could not compile the SQL: " + (error as Error).message,
      );
      return;
    }

    const retobj = await this.altimate
      .runModeller({
        // if we can run this through compile sql, we can also do
        // conversions that were half done. if it fails, just send the text as is.
        sql: compiledSql || fileText,
        adapter: project.getAdapterType(),
        models: allmodels,
        sources: allsources,
      })
      .catch((err) => {
        window.showErrorMessage(
          "Could not convert sql to model. \
        Encountered unknown error when converting sql to model.",
        );
        this.dbtTerminal.error(
          new CustomUnknownException(
            "Could not convert sql to model. \
        Encountered unknown error when converting sql to model.",
            err,
          ),
        );
        return undefined;
      });
    // if somehow the response isnt there or got an error response
    if (retobj === undefined || retobj.sql === undefined) {
      window.showErrorMessage(
        "Could not convert sql to model. \
        Encountered unknown error when converting sql to model.",
      );
      this.telemetry.sendTelemetryError("sqlToModelEmptyBackendResponseError");
      return undefined;
    }

    const startpos = new Position(0, 0);
    const endpos = new Position(
      activedoc.document.lineCount,
      activedoc.document.lineAt(activedoc.document.lineCount - 1).text.length,
    );
    activedoc.edit((editBuilder) => {
      editBuilder.replace(new Range(startpos, endpos), retobj.sql);
    });
    return;
  }
}
