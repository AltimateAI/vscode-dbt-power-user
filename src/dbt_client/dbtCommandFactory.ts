import { join } from "path";
import * as os from "os";
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
  private profilesDir() {
    return workspace
      .getConfiguration("dbt")
      .get<string>("profilesDirOverride") || join( os.homedir(), ".dbt");
  }

  private profilesDirParams(): string[] {
    const dbtProfilesDir = workspace
      .getConfiguration("dbt")
      .get<string>("profilesDirOverride");
    return dbtProfilesDir ? ["'--profiles-dir'", `'${dbtProfilesDir}'`] : [];
  }

  createVerifyDbtInstalledCommand(): DBTCommand {
    return {
      statusMessage: "Detecting dbt installation...",
      processExecutionParams: {
        args: ["-c", 'import dbt.main; print("dbt is installed")'],
      },
    };
  }

  createVerifyDbtOsmosisInstalledCommand(): DBTCommand {
    return {
      statusMessage: "Detecting dbt osmosis installation...",
      processExecutionParams: {
        args: ["-c", 'import dbt_osmosis.core.osmosis; print("dbt osmosis is installed")'],
      },
    };
  }

  createDbtOsmosisInstallCommand() {
    return {
      commandAsString: "pip install dbt_osmosis",
      statusMessage: "Installing dbt-osmosis...",
      processExecutionParams: { args: ["-m", "pip", "install", "--upgrade", "dbt-osmosis==0.7.16"] },
      focus: true,
    };
  }

  createRunQueryCommand(sql: string, projectRoot: Uri, target: string): DBTCommand {
    const limit = workspace
      .getConfiguration("dbt")
      .get<number>("queryLimit", 200);

    const queryTemplate = workspace
      .getConfiguration("dbt")
      .get<string>("queryTemplate", "select * from ({query}) as osmosis_query limit {limit}");

    const queryRegex = queryTemplate
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/\*/g, "\\*")
      .replace("{query}", "([\\w\\W]+)")
      .replace("{limit}", limit.toString());

    const code = `\
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

def default(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError

def json_dumps(body):
    return orjson.dumps(body, default=default).decode("utf-8")

try:
    import decimal
    import json
    import re
    import sys
    import traceback

    import orjson
    from dbt_osmosis.core.osmosis import DbtOsmosis

    runner = DbtOsmosis(
        profiles_dir=r"${this.profilesDir()}",
        project_dir=r"${projectRoot.fsPath.replace(/"/g, '\\"')}",
        target=r"${target.replace(/"/g, '\\"')}",
    )
    limit = ${limit}
    query = """${sql.replace(/"/g, '\\"')}"""
    query_with_limit = f"${queryTemplate}"
    result = runner.execute_sql(query_with_limit)
    print(json_dumps({
        "rows": [list(row) for row in result.table.rows],
        "column_names": result.table.column_names,
        "compiled_sql": re.search(r"${queryRegex}", result.compiled_sql).groups()[0]
    }))
    sys.exit(0)
except Exception as exc:
    eprint(json_dumps({"message": str(exc), "data": traceback.format_exc()}))
    sys.exit(-1)`;

    return {
      statusMessage: "Running query...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: ["-c", code],
      },
    };
  }

  createQueryPreviewCommand(sql: string, projectRoot: Uri, target: string): DBTCommand {
    const code = `\
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

def default(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError

def json_dumps(body):
    return orjson.dumps(body, default=default).decode("utf-8")

try:
    import decimal
    import json
    import re
    import sys
    import traceback

    import orjson
    from dbt_osmosis.core.osmosis import DbtOsmosis
    runner = DbtOsmosis(
        profiles_dir=r"${this.profilesDir()}",
        project_dir=r"${projectRoot.fsPath.replace(/"/g, '\\"')}",
        target=r"${target.replace(/"/g, '\\"')}",
    )
    result = runner.compile_sql("""${sql.replace(/"/g, '\\"')}""")
    print(json_dumps({
        "compiled_sql": result,
    }))
    sys.exit(0)
except Exception as exc:
    eprint(json_dumps({"message": str(exc), "data": traceback.format_exc()}))
    sys.exit(-1)`;
    return {
      statusMessage: "Running query...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: ["-c", code],
      },
    };
  }

  createVersionCommand(): DBTCommand {
    return {
      statusMessage: "Detecting dbt version...",
      processExecutionParams: {
        args: ["-c", this.dbtCommand("'--version'")],
      },
    };
  }

  createListCommand(projectRoot: Uri): DBTCommand {
    const profilesDirParams = this.profilesDirParams();

    return {
      commandAsString: "dbt list",
      statusMessage: "Listing dbt models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: ["-c", this.dbtCommand(["'list'", ...profilesDirParams])],
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

  createCompileModelCommand(projectRoot: Uri, params: RunModelParams) {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const profilesDirParams = this.profilesDirParams();

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
    return `import dbt.main; dbt.main.main([${cmd}])`;
  }
}
