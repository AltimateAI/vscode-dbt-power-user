import { DBTProject } from "../../manifest/dbtProject";
import { InitCatalog } from "../tests/initCatalog";
import { UndocumentedModelColumnTest } from "../tests/undocumentedModelColumnTest";
import { StaleModelColumnTest } from "../tests/staleModelColumnTest";
import { ManifestCacheProjectAddedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import { MissingSchemaTest } from "../tests/missingSchemaTest";
import { UnmaterializedModelTest } from "../tests/unmaterializedModelTest";
import { Diagnostic } from "vscode";

export interface AltimateScanAgent {
  scanContext: ScanContext;
  missingSchema(test: MissingSchemaTest): void;
  initCatalog(test: InitCatalog): void;
  unmaterializedModel(test: UnmaterializedModelTest): void;
  undocumentedModelColumn(test: UndocumentedModelColumnTest): void;
  staleModelColumn(test: StaleModelColumnTest): void;
  //duplicateSource(test: DuplicateSourceTest): void;
}

export interface AltimateCatalog {
  [projectName: string]: { [key: string]: any[] };
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
