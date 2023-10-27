import { Diagnostic, DiagnosticSeverity, Range } from "vscode";
import { AltimateScanAgent, ScanContext } from "../agent/agent";
import { AltimateScanStep } from "./step";

export class UndocumentedModelColumnTest implements AltimateScanStep {
  run(agent: AltimateScanAgent) {
    agent.undocumentedModelColumn(this);
  }

  public async flagUndocumentedColumns(scanContext: ScanContext) {
    const {
      project,
      catalog: altimateCatalog,
      eventMap: projectEventMap,
      diagnostics: projectDiagnostics,
      scanResults,
    } = scanContext;
    const projectName = project.getProjectName();
    const projectRootUri = project.projectRoot;
    if (projectEventMap === undefined) {
      return;
    }
    const { nodeMetaMap } = projectEventMap;
    for (const [key, value] of nodeMetaMap) {
      console.log(key, value);
      if (
        (scanResults["missingDoc"] !== undefined &&
          scanResults["missingDoc"].has(value.uniqueId)) ||
        value.config.materialized === "seed" ||
        value.config.materialized === "ephemeral"
      ) {
        // schema is missing, no point in looking for undocumented columns
        // or the model is not materialized / seed type
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
        for (const column of modelDict) {
          if (
            !existingColumnsLowered.includes(column.column_name.toLowerCase())
          ) {
            const errMessage =
              "Column undocumented for model: " +
              value.name +
              "\n" +
              "Expected an entry for: " +
              column.column_name;

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
            console.log(errMessage);
          }
        }
      }
    }
  }
}
