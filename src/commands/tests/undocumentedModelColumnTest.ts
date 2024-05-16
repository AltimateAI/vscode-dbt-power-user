import { Diagnostic, DiagnosticSeverity, Range } from "vscode";
import { ScanContext } from "./scanContext";
import { AltimateScanStep } from "./step";
import { getColumnNameByCase, provideSingleton } from "../../utils";

@provideSingleton(UndocumentedModelColumnTest)
export class UndocumentedModelColumnTest implements AltimateScanStep {
  public async run(scanContext: ScanContext) {
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
          getColumnNameByCase(key, project.getAdapterType()),
        );
        for (const column of modelDict) {
          if (
            !existingColumnsLowered.includes(
              getColumnNameByCase(column.column_name, project.getAdapterType()),
            )
          ) {
            const errMessage = `Column ${column.column_name} is undocumented in model: ${value.name}`;

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
  }
}
