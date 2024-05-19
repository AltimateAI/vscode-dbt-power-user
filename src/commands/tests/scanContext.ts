import { Catalog } from "../../dbt_client/dbtIntegration";
import { DBTProject } from "../../manifest/dbtProject";
import { ManifestCacheProjectAddedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import { Diagnostic } from "vscode";

export interface AltimateCatalog {
  [projectName: string]: { [key: string]: Catalog };
}
export class ScanContext {
  project: DBTProject;
  catalog: AltimateCatalog = {};
  eventMap: ManifestCacheProjectAddedEvent | undefined;
  diagnostics: { [uniqueId: string]: Diagnostic[] };
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
