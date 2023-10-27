import { Uri } from "vscode";
import { DBTProject } from "../../manifest/dbtProject";
import { InitCatalog } from "../tests/initCatalog";
import { ManifestCacheProjectAddedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import { AltimateScanAgent } from "./agent";
import { ScanContext } from "./agent";
import { AltimateScanStep } from "../tests/step";

export class BaseAltimateScanAgent implements AltimateScanAgent {
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

  public async runStep(test: AltimateScanStep): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
