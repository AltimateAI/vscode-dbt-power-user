import { Uri, workspace } from "vscode";
import { provideSingleton } from "../utils";

export interface RunModelParams {
  plusOperatorLeft: string;
  modelName: string;
  plusOperatorRight: string;
}

export interface CommandProcessExecutionParams {
  cwd?: string;
  args: string[];
}

export interface DBTCommand {
  commandAsString?: string;
  statusMessage: string;
  processExecutionParams: CommandProcessExecutionParams;
  focus?: boolean;
}

@provideSingleton(DBTCommandFactory)
export class DBTCommandFactory {
  private profilesDirParams(): string[] {
    const dbtProfilesDir = workspace
      .getConfiguration("dbt")
      .get<string>("profilesDirOverride");
    return dbtProfilesDir ? ["--profiles-dir", `${dbtProfilesDir}`] : [];
  }

  createImportDBTCommand(): DBTCommand {
    return {
      statusMessage: "Detecting dbt installation...",
      processExecutionParams: {
        cwd: workspace.workspaceFolders?.values().next().value.uri.fsPath,
        args: ["--help"],
      },
    };
  }

  createVersionCommand(): DBTCommand {
    return {
      statusMessage: "Detecting dbt version...",
      processExecutionParams: {
        cwd: workspace.workspaceFolders?.values().next().value.uri.fsPath,
        args: ["--version"],
      },
    };
  }

  createListCommand(): DBTCommand {
    const profilesDirParams = this.profilesDirParams();

    return {
      commandAsString: "dbt list",
      statusMessage: "Listing dbt models...",
      processExecutionParams: {
        cwd: workspace.workspaceFolders?.values().next().value.uri.fsPath,
        args: ["ls", ...profilesDirParams],
      },
    };
  }

  createRunModelCommand(projectRoot: Uri, params: RunModelParams) {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const profilesDirParams = this.profilesDirParams();

    const runModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("runModelCommandAdditionalParams", []);

    return {
      commandAsString: `dbt run --select ${params.plusOperatorLeft}${params.modelName
        }${params.plusOperatorRight}${runModelCommandAdditionalParams.length > 0
          ? " " + runModelCommandAdditionalParams.join(" ")
          : ""
        }`,
      statusMessage: "Running dbt models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "run",
          "--select",
          `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
          ...runModelCommandAdditionalParams.map((param) => `${param}`),
          ...profilesDirParams,
        ],
      },
      focus: true,
    };
  }

  createTestModelCommand(projectRoot: Uri, testName: string) {
    const profilesDirParams = this.profilesDirParams();

    // Lets pass through these params here too
    const runModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("runModelCommandAdditionalParams", []);

    return {
      commandAsString: `dbt test --select ${testName}${runModelCommandAdditionalParams.length > 0
        ? " " + runModelCommandAdditionalParams.join(" ")
        : ""
        }`,
      statusMessage: "Testing dbt model...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "test",
          "--select",
          `${testName}`,
          ...runModelCommandAdditionalParams.map((param) => `${param}`),
          ...profilesDirParams,
        ],
      },
      focus: true,
    };
  }

  createCompileModelCommand(projectRoot: Uri, params: RunModelParams) {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const profilesDirParams = this.profilesDirParams();

    return {
      commandAsString: `dbt compile --model ${params.plusOperatorLeft}${params.modelName}${params.plusOperatorRight}`,
      statusMessage: "Compiling dbt models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "compile",
          "--select",
          `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
          ...profilesDirParams,
        ],
      },
      focus: true,
    };
  }
}
