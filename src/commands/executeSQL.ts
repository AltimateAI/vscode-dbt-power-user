import path = require("path");
import { Disposable, window } from "vscode";
import { NodeMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { QueryView } from "../query_view";
import { provideSingleton } from "../utils";

@provideSingleton(ExecuteSQL)
export class ExecuteSQL {
  private disposables: Disposable[] = [];
  private modelToFQNMap: Map<string, NodeMetaMap> = new Map();

  constructor(private dbtProjectContainer: DBTProjectContainer, private queryView: QueryView) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event)
      )
    );
  }

  async executeSQL() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      const sqlQuery = window.activeTextEditor?.document.getText();
      if (sqlQuery === undefined) {
        return;
      }
      const dbtProject = this.dbtProjectContainer.findDBTProject(fullPath);
      if (dbtProject === undefined) {
        return;
      }
      const sqlTitle = path.basename(window.activeTextEditor?.document.uri.fsPath ?? "Untitled.sql") + " " + new Date().toTimeString().split(" ")[0];
      const sqlPreview = `select * from (${sqlQuery}) as __dbt_preview limit 500`;
      const data = await this.dbtProjectContainer.executeSQL(dbtProject.projectRoot, sqlPreview);
      // this.dbtProjectContainer.previewSQL(sqlPreview, sqlTitle);
      this.queryView.createWebviewPanel(sqlPreview, data);
    }
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.modelToFQNMap.set(added.projectRoot.fsPath, added.nodeMetaMap);
    });
    event.removed?.forEach((removed) => {
      this.modelToFQNMap.delete(removed.projectRoot.fsPath);
    });
  }
}
