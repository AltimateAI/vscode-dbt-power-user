import { Uri, workspace } from "vscode";
import { provideSingleton } from "../utils";

export interface RunModelParams {
  plusOperatorLeft: string;
  modelName: string;
  plusOperatorRight: string;
}

export interface SubProcessExecutionParams {
  cwd?: string;
  args: string[];
}

export interface PythonExecutionParams {
  code: TemplateStringsArray | string;
  params: any[];
}

export interface DBTCommand {
  commandAsString?: string;
  statusMessage: string;
  processExecutionParams: SubProcessExecutionParams;
  focus?: boolean;
}

@provideSingleton(DBTCommandFactory)
export class DBTCommandFactory {
  private profilesDirParams(dbtProfilesDir: string): string[] {
    return dbtProfilesDir ? ["'--profiles-dir'", `r'${dbtProfilesDir}'`] : [];
  }

  private getFirstWorkspacePath(): string {
    // If we are executing python via a wrapper like Meltano,
    // we need to execute it from a (any) project directory
    // By default, Command execution is in an ext dir context
    const folders = workspace.workspaceFolders;
    if (folders) {
      return folders[0].uri.fsPath;
    } else {
      // TODO: this shouldn't happen but we should make sure this is valid fallback
      return Uri.file("./").fsPath;
    }
  }

  createVerifyDbtInstalledCommand(): DBTCommand {
    return {
      statusMessage: "Detecting dbt installation...",
      processExecutionParams: {
        cwd: this.getFirstWorkspacePath(),
        args: ["-c", 'import dbt; print("dbt is installed")'],
      },
    };
  }

  createVersionCommand(): DBTCommand {
    return {
      statusMessage: "Detecting dbt version...",
      processExecutionParams: {
        cwd: this.getFirstWorkspacePath(),
        args: ["-c", this.dbtCommand("'--version'")],
      },
    };
  }

  createRunModelCommand(
    projectRoot: Uri,
    profilesDir: string,
    params: RunModelParams
  ): DBTCommand {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const profilesDirParams = this.profilesDirParams(profilesDir);

    const runModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("runModelCommandAdditionalParams", []);

    return {
      commandAsString: `dbt run --select ${params.plusOperatorLeft}${
        params.modelName
      }${params.plusOperatorRight}${
        runModelCommandAdditionalParams.length > 0
          ? " " + runModelCommandAdditionalParams.join(" ")
          : ""
      }`,
      statusMessage: "Running dbt models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "-c",
          this.dbtCommand([
            "'run'",
            "'--select'",
            `'${plusOperatorLeft}${modelName}${plusOperatorRight}'`,
            ...runModelCommandAdditionalParams.map((param) => `'${param}'`),
            ...profilesDirParams,
          ]),
        ],
      },
      focus: true,
    };
  }

  createBuildModelCommand(
    projectRoot: Uri,
    profilesDir: string,
    params: RunModelParams
  ): DBTCommand {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const profilesDirParams = this.profilesDirParams(profilesDir);

    const buildModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("buildModelCommandAdditionalParams", []);

    return {
      commandAsString: `dbt build --select ${params.plusOperatorLeft}${
        params.modelName
      }${params.plusOperatorRight}${
        buildModelCommandAdditionalParams.length > 0
          ? " " + buildModelCommandAdditionalParams.join(" ")
          : ""
      }`,
      statusMessage: "Building dbt models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "-c",
          this.dbtCommand([
            "'build'",
            "'--select'",
            `'${plusOperatorLeft}${modelName}${plusOperatorRight}'`,
            ...buildModelCommandAdditionalParams.map((param) => `'${param}'`),
            ...profilesDirParams,
          ]),
        ],
      },
      focus: true,
    };
  }

  createTestModelCommand(
    projectRoot: Uri,
    profilesDir: string,
    testName: string
  ): DBTCommand {
    const profilesDirParams = this.profilesDirParams(profilesDir);

    // Lets pass through these params here too
    const runModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("runModelCommandAdditionalParams", []);

    return {
      commandAsString: `dbt test --select ${testName}${
        runModelCommandAdditionalParams.length > 0
          ? " " + runModelCommandAdditionalParams.join(" ")
          : ""
      }`,
      statusMessage: "Testing dbt model...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "-c",
          this.dbtCommand([
            "'test'",
            "'--select'",
            `'${testName}'`,
            ...runModelCommandAdditionalParams.map((param) => `'${param}'`),
            ...profilesDirParams,
          ]),
        ],
      },
      focus: true,
    };
  }

  createCompileModelCommand(
    projectRoot: Uri,
    profilesDir: string,
    params: RunModelParams
  ): DBTCommand {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const profilesDirParams = this.profilesDirParams(profilesDir);

    return {
      commandAsString: `dbt compile --model ${params.plusOperatorLeft}${params.modelName}${params.plusOperatorRight}`,
      statusMessage: "Compiling dbt models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "-c",
          this.dbtCommand([
            "'compile'",
            "'--select'",
            `'${plusOperatorLeft}${modelName}${plusOperatorRight}'`,
            ...profilesDirParams,
          ]),
        ],
      },
      focus: true,
    };
  }

  private dbtCommand(cmd: string | string[]): string {
    return `has_dbt_runner = True
try: 
    from dbt.cli.main import dbtRunner
except:
    has_dbt_runner = False
if has_dbt_runner:
    dbt_cli = dbtRunner()
    dbt_cli.invoke([${cmd}])
else:
    import dbt.main
    dbt.main.main([${cmd}])`;
  }
}
