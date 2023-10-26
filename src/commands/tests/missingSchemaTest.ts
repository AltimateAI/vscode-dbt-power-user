import { Diagnostic, DiagnosticSeverity, Range } from "vscode";
import { AltimateScanAgent, ScanContext } from "../agent/agent";
import { AltimateScanStep } from "./step";

export class MissingSchemaTest implements AltimateScanStep {
  run(agent: AltimateScanAgent) {
    agent.missingSchema(this);
  }

  public async flagMissingSchemas(scanContext: ScanContext) {
    const projectEventMap = scanContext.eventMap;
    const projectDiagnostics = scanContext.diagnostics;
    // TODO
    // const scanResults = scanContext.scanResults;
    if (projectEventMap === undefined) {
      return;
    }
    const { nodeMetaMap } = projectEventMap;
    for (const [key, value] of nodeMetaMap) {
      console.log(key, value);
      // blacklisting node types.. should we instead whitelist just models and sources?
      if (
        value.config.materialized === "seed" ||
        value.config.materialized === "ephemeral"
      ) {
      }
      if (!value.patch_path) {
        const err_message = "No documentation for model: " + value.name;
        console.log(err_message);
        let projDiagnostic = projectDiagnostics[value.path];
        if (projDiagnostic === undefined) {
          projectDiagnostics[value.path] = projDiagnostic = [];
        }
        projDiagnostic.push(
          new Diagnostic(
            new Range(0, 0, 0, 0),
            err_message,
            DiagnosticSeverity.Information,
          ),
        );
        // TODO - set a note that this model is missing documentation
        // so that we dont keep telling users that x column doc is missing

        // const missingDocsDict = scanResults["missingDoc"];
        // [value.uniqueId];
      }
    }
  }
}
