import { Uri } from "vscode";

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
  statusMessage: string;
  processExecutionParams: CommandProcessExecutionParams;
  focus?: boolean;
}

export class DBTCommandFactory {
  static createVersionCommand(): DBTCommand {
    return {
      statusMessage: "Detecting DBT version...",
      processExecutionParams: {
        args: ["-c", DBTCommandFactory.dbtCommand("'--version'")],
      },
    };
  }

  static createListCommand(projectRoot: Uri): DBTCommand {
    return {
      statusMessage: "Listing DBT models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: ["-c", this.dbtCommand("'list'")],
      },
    };
  }

  static createRunModelCommand(projectRoot: Uri, params: RunModelParams) {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    return {
      statusMessage: "Listing DBT models...",
      processExecutionParams: {
        cwd: projectRoot.fsPath,
        args: [
          "-c",
          this.dbtCommand([
            "'run'",
            "'--model'",
            `"${plusOperatorLeft}"`,
            `"${modelName}"`,
            `"${plusOperatorRight}"`,
          ]),
        ],
      },
      focus: true,
    };
  }

  static createInstallDBTCommand() {
    return {
      statusMessage: "Installing DBT...",
      processExecutionParams: { args: ["-m", "pip", "install", "dbt"] },
      focus: true,
    };
  }

  static createUpdateDBTCommand() {
    return {
      statusMessage: "Updating DBT...",
      processExecutionParams: { args: ["-m", "pip", "install", "dbt", "--upgrade"] },
      focus: true,
    };
  }

  private static dbtCommand(cmd: string | string[]): string {
    return `import dbt.main; dbt.main.main([${cmd}])`;
  }
}
