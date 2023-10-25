import { Uri, Diagnostic, Range, DiagnosticSeverity } from "vscode";
import { NodeMetaData } from "../domain";
import { DBTProject } from "../manifest/dbtProject";

export function findModelProblems(
  projectModel: NodeMetaData,
  modelDict: any[],
  name: string,
  project: DBTProject,
  allDiagnostic: { [fullFilePath: string]: Diagnostic[] },
) {
  const existingColumnsLowered = Object.keys(projectModel.columns).map((key) =>
    key.toLowerCase(),
  );
  const allDBColumns = modelDict.map(({ column_name }) =>
    column_name.toLowerCase(),
  );
  if (!projectModel.patch_path) {
    // TODO - file an error if the model is not documented at all (no doc entry exists)
    // const err_message = "No documentation for model: " + name;
    // console.log(err_message);
    // let projDiagnostic = allDiagnostic[projectModel.path];
    // if (projDiagnostic === undefined) {
    //   allDiagnostic[projectModel.path] = projDiagnostic = [];
    // }
    // projDiagnostic.push(
    //   new Diagnostic(
    //     new Range(0, 0, 0, 0),
    //     err_message,
    //     DiagnosticSeverity.Information,
    //   ),
    // );
    // if schema doesnt exist, nothing else to do here.
    return;
  }
  // for (const column of modelDict) {
  //   if (!existingColumnsLowered.includes(column.column_name.toLowerCase())) {
  //     const err_message =
  //       "Column undocumented for model: " +
  //       name +
  //       "\n" +
  //       "Expected an entry for: " +
  //       column.column_name;

  //     // TODO - this should point to the model file ?
  //     let modelDiagnostics = allDiagnostic[projectModel.path];
  //     if (modelDiagnostics === undefined) {
  //       allDiagnostic[projectModel.path] = modelDiagnostics = [];
  //     }
  //     modelDiagnostics.push(
  //       new Diagnostic(
  //         new Range(0, 0, 0, 0),
  //         err_message,
  //         DiagnosticSeverity.Information,
  //       ),
  //     );
  //     console.log(err_message);
  //   }
  // }

  // for (const existingCol of Object.keys(projectModel.columns)) {
  //   if (!allDBColumns.includes(existingCol.toLowerCase())) {
  //     const err_message =
  //       "Column not found in DB for model: " +
  //       name +
  //       "\n" +
  //       "The column named `" +
  //       existingCol +
  //       "` is documented but might be out of sync with the existing model.";
  //     // If we are here, the patch_path is guaranteed to be defined since
  //     // we catch missing doc errors before we enter this function.
  //     const schemaPath = Uri.joinPath(
  //       project.projectRoot,
  //       projectModel.patch_path.split("://")[1],
  //     ).fsPath;
  //     let schemaDiagnostics = allDiagnostic[schemaPath];
  //     if (schemaDiagnostics === undefined) {
  //       allDiagnostic[schemaPath] = schemaDiagnostics = [];
  //     }
  //     schemaDiagnostics.push(
  //       new Diagnostic(
  //         new Range(0, 0, 0, 0),
  //         err_message,
  //         DiagnosticSeverity.Warning,
  //       ),
  //     );
  //     console.log(err_message);
  //   }
  // }
}
