import { Diagnostic, DiagnosticSeverity, Range } from "vscode";
import { ScanContext } from "./scanContext";
import { AltimateScanStep } from "./step";
import { provideSingleton } from "../../utils";

@provideSingleton(UnmaterializedModelTest)
export class UnmaterializedModelTest implements AltimateScanStep {
  public async run(scanContext: ScanContext) {
    const {
      project,
      catalog: altimateCatalog,
      eventMap: projectEventMap,
      diagnostics: projectDiagnostics,
    } = scanContext;
    const projectName = project.getProjectName();
    const projectRootUri = project.projectRoot;
    if (projectEventMap === undefined) {
      return;
    }
    const { nodeMetaMap } = projectEventMap;
    for (const [key, value] of nodeMetaMap) {
      if (value.config.materialized === "ephemeral") {
        // ephemeral models by nature wont be materialized.
        // seeds should be materialized so that other features
        // work well so we'll raise errors for those
        continue;
      }

      const modelKey = JSON.stringify({
        projectroot: projectRootUri.fsPath,
        project: projectName,
        database: value.database.toLowerCase(),
        schema: value.schema.toLowerCase(),
        name: value.alias.toLowerCase(),
      });
      if (
        !Object.keys(altimateCatalog[projectName + projectRootUri]).includes(
          modelKey,
        ) &&
        value.path
      ) {
        // When the model is not in model dict, we could not find the table or view in
        // information schema. meaning it was not materialized.
        const errMessage = `Model ${value.name} does not exist in the database`;
        let modelDiagnostics = projectDiagnostics[value.path];
        if (modelDiagnostics === undefined) {
          projectDiagnostics[value.path] = modelDiagnostics = [];
        }
        modelDiagnostics.push(
          new Diagnostic(
            new Range(0, 0, 0, 0),
            errMessage,
            DiagnosticSeverity.Information,
          ),
        );
      }
    }
  }
}
