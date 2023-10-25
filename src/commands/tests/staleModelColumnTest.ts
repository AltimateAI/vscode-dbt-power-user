import { Diagnostic, DiagnosticSeverity, Range, Uri } from "vscode";
import { AltimateScanAgent, ScanContext } from "../agent/agent";
import { AltimateScanStep } from "./step";

export class StaleModelColumnTest implements AltimateScanStep {
  run(agent: AltimateScanAgent) {
    agent.staleModelColumn(this);
  }
  public async flagStaleColumns(scanContext: ScanContext) {
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
        Object.keys(altimateCatalog[projectName + projectRootUri]).includes(
          modelKey,
        )
      ) {
        // do model-level checks here.
        const modelDict =
          altimateCatalog[projectName + projectRootUri][modelKey];
        const existingColumnsLowered = Object.keys(value.columns).map((key) =>
          key.toLowerCase(),
        );
        const allDBColumns = modelDict.map(({ column_name }) =>
          column_name.toLowerCase(),
        );
        for (const existingCol of Object.keys(value.columns)) {
          if (!allDBColumns.includes(existingCol.toLowerCase())) {
            const err_message =
              "Column not found in DB for model: " +
              value.name +
              "\n" +
              "The column named `" +
              existingCol +
              "` is documented but might be out of sync with the existing model.";
            // If we are here, the patch_path is guaranteed to be defined since
            // we catch missing doc errors before we enter this function.
            const schemaPath = Uri.joinPath(
              project.projectRoot,
              value.patch_path.split("://")[1],
            ).fsPath;
            let schemaDiagnostics = projectDiagnostics[schemaPath];
            if (schemaDiagnostics === undefined) {
              projectDiagnostics[schemaPath] = schemaDiagnostics = [];
            }
            schemaDiagnostics.push(
              new Diagnostic(
                new Range(0, 0, 0, 0),
                err_message,
                DiagnosticSeverity.Warning,
              ),
            );
            console.log(err_message);
          }
        }
      }
    }
  }
}
