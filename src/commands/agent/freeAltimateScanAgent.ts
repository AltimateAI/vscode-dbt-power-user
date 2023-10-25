import { Uri } from "vscode";
import { DBTProject } from "../../manifest/dbtProject";
import { InitCatalog } from "../tests/initCatalog";
import { UndocumentedModelColumnTest } from "../tests/undocumentedModelColumnTest";
import { StaleModelColumnTest } from "../tests/staleModelColumnTest";
import { MissingSchemaTest } from "../tests/missingSchemaTest";
import { UnmaterializedModelTest } from "../tests/unmaterializedModelTest";
import { ManifestCacheProjectAddedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import { AltimateScanAgent } from "./agent";
import { ScanContext } from "./agent";

export class FreeAltimateScanAgent implements AltimateScanAgent {
  scanContext: ScanContext;

  constructor(
    project: DBTProject,
    eventMap: ManifestCacheProjectAddedEvent | undefined,
  ) {
    this.scanContext = new ScanContext(project, eventMap);
  }
  showDiagnostics() {
    this.scanContext.project.projectHealth.clear();
    for (const [filePath, fileDiagnostics] of Object.entries(
      this.scanContext.diagnostics,
    )) {
      this.scanContext.project.projectHealth.set(
        Uri.file(filePath),
        fileDiagnostics,
      );
    }
  }

  public async initCatalog(test: InitCatalog): Promise<void> {
    const projectCatalog = await test.getProjectCatalog(
      this.scanContext.project,
    );
    this.scanContext.catalog[
      this.scanContext.project.getProjectName() +
        this.scanContext.project.projectRoot
    ] = projectCatalog;
  }
  public async unmaterializedModel(test: UnmaterializedModelTest) {
    await test.flagUnmaterializedModels(this.scanContext);
  }
  public async undocumentedModelColumn(test: UndocumentedModelColumnTest) {
    await test.flagUndocumentedColumns(this.scanContext);
  }
  public async staleModelColumn(test: StaleModelColumnTest) {
    await test.flagStaleColumns(this.scanContext);
  }
  public async missingSchema(test: MissingSchemaTest) {
    await test.flagMissingSchemas(this.scanContext);
  }
}
