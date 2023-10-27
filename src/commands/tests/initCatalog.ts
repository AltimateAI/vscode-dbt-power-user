import { DBTProject } from "../../manifest/dbtProject";
import { AltimateScanAgent } from "../agent/agent";
import { BaseAltimateScanAgent } from "../agent/baseAltimateScanAgent";
import { AltimateScanStep } from "./step";

export class InitCatalog implements AltimateScanStep {
  async run(agent: AltimateScanAgent) {
    // This one has to await
    // CAUTION - not sure why this isnt giving me circular dependency warning.
    await (agent as BaseAltimateScanAgent).runStep(this);
  }

  public async getProjectCatalog(project: DBTProject) {
    try {
      const cata = await project.getCatalog();
      const modelDict: { [key: string]: any[] } = cata.reduce(
        (mdict: { [key: string]: any[] }, model) => {
          const modelKey: string = JSON.stringify({
            projectroot: project.projectRoot.fsPath,
            project: project.getProjectName(),
            database: model.table_database.toLowerCase(),
            schema: model.table_schema.toLowerCase(),
            name: model.table_name.toLowerCase(),
          });
          mdict[modelKey] = mdict[modelKey] || [];
          mdict[modelKey].push(model);
          return mdict;
        },
        Object.create(null),
      );
      return modelDict;
    } catch (err) {
      console.log(
        "Error in getting schema for project: " + project.getProjectName(),
        err,
      );
      console.log(err);
      return {};
    }
  }
}
