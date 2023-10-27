import { Diagnostic, DiagnosticSeverity, Range, Uri } from "vscode";
import { AltimateScanAgent, ScanContext } from "../agent/agent";
import { AltimateScanStep } from "./step";
import { readFileSync } from "fs";

export class StaleModelColumnTest implements AltimateScanStep {
  run(agent: AltimateScanAgent) {
    agent.runStep(this);
  }
  private getTextLocation(colname: string, schemaPath: string) {
    const StopException = {};
    let returnVal = undefined;
    try {
      const doctext: string = readFileSync(schemaPath).toString("utf8");
      const astring = doctext.split("\n");
      const match = new RegExp(colname);

      astring.forEach(function (line, number) {
        if (match.exec(line)) {
          let colStart = line.indexOf(colname);
          if (colStart === -1) {
            colStart = 0;
          }
          returnVal = new Range(
            number,
            colStart,
            number,
            colStart + colname.length,
          );
          throw StopException;
        }
      });
    } catch (e) {
      if (e !== StopException) {
        console.log(
          `Could not find column ${colname} in schema file ${schemaPath}`,
        );
      }
    }
    return returnVal;
  }
  public async flagStaleColumns(scanContext: ScanContext) {
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
            const errMessage =
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

            const colInDocRange = this.getTextLocation(existingCol, schemaPath);

            let schemaDiagnostics = projectDiagnostics[schemaPath];
            if (schemaDiagnostics === undefined) {
              projectDiagnostics[schemaPath] = schemaDiagnostics = [];
            }
            schemaDiagnostics.push(
              new Diagnostic(
                colInDocRange || new Range(0, 0, 0, 0),
                errMessage,
                DiagnosticSeverity.Warning,
              ),
            );
            console.log(errMessage);
          }
        }
      }
    }
  }
}
