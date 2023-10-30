import { Diagnostic, DiagnosticSeverity, Range } from "vscode";
import { ScanContext } from "./scanContext";
import { AltimateScanStep } from "./step";
import { provideSingleton } from "../../utils";
import { DBTProject } from "../../manifest/dbtProject";

@provideSingleton(MissingSchemaTest)
export class MissingSchemaTest implements AltimateScanStep {
  public async run(scanContext: ScanContext) {
    const {
      eventMap: projectEventMap,
      diagnostics: projectDiagnostics,
      scanResults,
    } = scanContext;

    if (projectEventMap === undefined) {
      return;
    }
    const { nodeMetaMap } = projectEventMap;
    for (const [key, value] of nodeMetaMap) {
      // blacklisting node types.. should we instead whitelist just models and sources?
      if (
        // TODO - need to filter out only models here but the resource type isnt available
        !value.uniqueId.startsWith(DBTProject.RESOURCE_TYPE_MODEL) ||
        value.config.materialized === "seed" ||
        value.config.materialized === "ephemeral"
      ) {
        continue;
      }
      if (!value.patch_path) {
        const errMessage = `Documentation missing for model: ${value.name}`;
        let projDiagnostic = projectDiagnostics[value.path];
        if (projDiagnostic === undefined) {
          projectDiagnostics[value.path] = projDiagnostic = [];
        }
        projDiagnostic.push(
          new Diagnostic(
            new Range(0, 0, 0, 0),
            errMessage,
            DiagnosticSeverity.Information,
          ),
        );
        // TODO - set a note that this model is missing documentation
        // so that we dont keep telling users that x column doc is missing
        let missingDocsDict = scanResults["missingDoc"];
        if (missingDocsDict === undefined) {
          scanResults["missingDoc"] = missingDocsDict = new Set<string>();
        }
        missingDocsDict.add(value.uniqueId);
      }
    }
  }
}
