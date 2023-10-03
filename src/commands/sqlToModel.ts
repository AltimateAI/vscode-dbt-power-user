import { AltimateRequest } from "../altimate";
import { NodeMetaData } from "../domain";
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

  async getModelFromSql() {
    if (!window.activeTextEditor) {
      return;
    }
    const activedoc = window.activeTextEditor;
    const currentFilePath = activedoc.document.uri;
    const allmodels: NodeMetaData[] = [];
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (project === undefined) {
      return undefined;
    }
    // uncomment this line in case you need to pass everything
    // const reciter = this.eventMap.values();

    // for now, restrict it to this project only.
    // assuming user has narrowed down to a project.
    const event = this.eventMap.get(project.projectRoot.fsPath);
    if (event === undefined) {
      return undefined;
    }
    const rriter = event.nodeMetaMap.values();
    for (const rrvalue of rriter) {
      allmodels.push(rrvalue);
    }

    const fileText = activedoc.document.getText();
    const compiled_sql = await project.compileQuery(fileText);

    const retobj = await this.altimate.runModeller({
      // if we can run this through compile sql, we can also do
      // conversions that were half done. if it fails, just send the text as is.
      sql: compiled_sql || fileText,
      adapter: project.getAdapterType(),
      models: allmodels,
    });
    console.log(retobj);
    if (retobj === undefined) {
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
