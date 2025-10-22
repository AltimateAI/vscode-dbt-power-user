import { Catalog } from "@altimateai/dbt-integration";
import { Diagnostic } from "vscode";
import { DBTProject } from "../../dbt_client/dbtProject";
import { ManifestCacheProjectAddedEvent } from "../../dbt_client/event/manifestCacheChangedEvent";

export interface AltimateCatalog {
  [projectName: string]: { [key: string]: Catalog };
}
export class ScanContext {
  project: DBTProject;
  catalog: AltimateCatalog = {};
  eventMap: ManifestCacheProjectAddedEvent | undefined;
  diagnostics: { [filepath: string]: Diagnostic[] };
  scanResults: { [key: string]: any } = {};

  constructor(
    project: DBTProject,
    eventMap: ManifestCacheProjectAddedEvent | undefined,
  ) {
    this.project = project;
    this.catalog = {};
    this.eventMap = eventMap;
    this.diagnostics = {};
  }
}
