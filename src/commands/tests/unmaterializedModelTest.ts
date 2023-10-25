import { Diagnostic, DiagnosticSeverity, Range } from "vscode";
import { AltimateScanAgent, ScanContext } from "../agent/agent";
import { AltimateScanStep } from "./step";

export class UnmaterializedModelTest implements AltimateScanStep {
  run(agent: AltimateScanAgent) {
    agent.unmaterializedModel(this);
  }
  public async flagUnmaterializedModels(scanContext: ScanContext) {
    const project = scanContext.project;
    const altimateCatalog = scanContext.catalog;
    const projectEventMap = scanContext.eventMap;
    const projectDiagnostics = scanContext.diagnostics;
    const projectName = project.getProjectName();
    const projectRootUri = project.projectRoot;
    if (projectEventMap === undefined) {
      return;
    }
    const { nodeMetaMap } = projectEventMap;
    for (const [key, value] of nodeMetaMap) {
      console.log(key, value);

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
        )
      ) {
        // When the model is not in model dict, we could not find the table in information schema.
        // meaning it was not materialized.
        // TODO - ignore ephemeral models here.
        const err_message = "Model " + value.alias + " not materialized: ";
        let modelDiagnostics = projectDiagnostics[value.path];
        if (modelDiagnostics === undefined) {
          projectDiagnostics[value.path] = modelDiagnostics = [];
        }
        modelDiagnostics.push(
          new Diagnostic(
            new Range(0, 0, 0, 0),
            err_message,
            DiagnosticSeverity.Information,
          ),
        );
      }
    }
  }
}
