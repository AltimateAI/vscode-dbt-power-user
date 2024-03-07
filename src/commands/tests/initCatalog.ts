import { Catalog } from "../../dbt_client/dbtIntegration";
import { provideSingleton } from "../../utils";
import { ScanContext } from "./scanContext";
import { AltimateScanStep } from "./step";

@provideSingleton(InitCatalog)
export class InitCatalog implements AltimateScanStep {
  public async run(scanContext: ScanContext) {
    const project = scanContext.project;
    const scanResults = scanContext.scanResults;
    const cata = await project.getCatalog();
    if (cata.length === 0) {
      let catalogResults = scanResults["missingCatalog"];
      if (catalogResults === undefined) {
        catalogResults = scanResults["missingCatalog"] = {};
      }
      scanResults["missingCatalog"][
        project.getProjectName() + project.projectRoot
      ] = true;
    }
    const modelDict: Record<string, Catalog> = Object.create(null);
    cata.forEach((model) => {
      const modelKey = JSON.stringify({
        projectroot: project.projectRoot.fsPath,
        project: project.getProjectName(),
        database: model.table_database.toLowerCase(),
        schema: model.table_schema.toLowerCase(),
        name: model.table_name.toLowerCase(),
      });
      modelDict[modelKey] = modelDict[modelKey] || [];
      modelDict[modelKey].push(model);
    });
    return modelDict;
  }
}
