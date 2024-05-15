import { Diagnostic, DiagnosticSeverity, Range, Uri } from "vscode";
import { ScanContext } from "./scanContext";
import { AltimateScanStep } from "./step";
import { readFileSync } from "fs";
import { getColumnNameByCase, provideSingleton } from "../../utils";
import { createFullPathForNode } from "../../manifest/parsers";

@provideSingleton(StaleModelColumnTest)
export class StaleModelColumnTest implements AltimateScanStep {
  private getTextLocation(
    modelname: string,
    colname: string,
    schemaPath: string,
  ): Range | undefined {
    // 1) Read the file at filepath
    const docContent: string = readFileSync(schemaPath, "utf-8");

    // Use regex to find whole word matches for model
    const modelRegex = new RegExp(`\\bname\\:\\s*?${modelname}\\b`);
    const modelMatch = docContent.match(modelRegex);
    if (!modelMatch) {
      return undefined;
    }

    // 2) Search for exact matches of 'colname' that occur after 'modelname'
    const colRegex = new RegExp(
      `\\bname\\:\\s*?${colname}\\b|\\balias\\:\\s*?${colname}\\b`,
      "g",
    );
    let colMatch;
    while ((colMatch = colRegex.exec(docContent)) !== null) {
      if (colMatch.index > (modelMatch.index || 0)) {
        // Calculate line and character number for the match
        const beforeMatch = docContent.substring(0, colMatch.index);
        const lines = beforeMatch.split("\n");
        const line = lines.length - 1;
        const char = lines[line].length; // +1 to make it 1-based
        // doing this because regex contains variable number of chars.
        const matchLength = colMatch[0].length;

        // 3) Return the line number and character number
        return new Range(
          line,
          char + matchLength - colname.length,
          line,
          char + matchLength,
        );
      }
    }

    return undefined;
  }

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
        // ephemeral models by nature wont be materialized so we cant verify if they are stale.
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
        const allDBColumns = modelDict.map(({ column_name }) =>
          getColumnNameByCase(column_name),
        );
        const packagePath = project.getPackageInstallPath();
        if (packagePath === undefined) {
          throw new Error(
            "packagePath is not defined in " + project.projectRoot.fsPath,
          );
        }
        for (const existingCol of Object.keys(value.columns)) {
          if (!allDBColumns.includes(getColumnNameByCase(existingCol))) {
            const errMessage = `Column ${existingCol} listed in model ${value.name} is not found in the database.
            It may be outdated or misspelled.`;
            // If we are here, the patch_path is guaranteed to be defined since
            // we catch missing doc errors before we enter this function.

            const schemaPath =
              createFullPathForNode(
                projectName,
                projectRootUri.fsPath,
                value.package_name,
                packagePath,
                value.patch_path.split("://")[1],
              ) ||
              Uri.joinPath(
                project.projectRoot,
                value.patch_path.split("://")[1],
              ).fsPath;

            const colInDocRange = this.getTextLocation(
              value.name,
              existingCol,
              schemaPath,
            );

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
          }
        }
      }
    }
  }
}
