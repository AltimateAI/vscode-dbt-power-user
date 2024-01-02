import { workspace, Uri, languages, Disposable } from "vscode";
import { provideSingleton } from "../utils";
import {
  CLIDBTCommandExecutionStrategy,
  DBTCommand,
  DBTCommandExecutionInfrastructure,
  DBTCommandFactory,
  DBTDetection,
  DBTProjectIntegration,
  ExecuteSQLResult,
} from "./dbtIntegration";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { PythonBridge } from "python-bridge";
import { join } from "path";
import { ValidateSqlParseErrorResponse } from "../altimate";

@provideSingleton(DBTCloudDetection)
export class DBTCloudDetection implements DBTDetection {
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
  ) {}

  async detectDBT(): Promise<boolean> {
    try {
      const checkDBTInstalledProcess =
        this.commandProcessExecutionFactory.createCommandProcessExecution({
          command: "dbt",
          args: ["--version"],
          cwd: this.getFirstWorkspacePath(),
        });
      const output = await checkDBTInstalledProcess.complete();
      if (output.includes("dbt Cloud CLI")) {
        return true;
      }
    } catch (error) {
      console.warn(error);
    }
    return false;
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
}

@provideSingleton(DBTCloudProjectIntegration)
export class DBTCloudProjectIntegration
  implements DBTProjectIntegration, Disposable
{
  private targetPath?: string;
  private adapterType: string = "unknown";
  private packagesInstallPath?: string;
  private modelPaths?: string[];
  private macroPaths?: string[];
  private python: PythonBridge;
  private disposables: Disposable[] = [];
  private readonly rebuildManifestDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private readonly pythonBridgeDiagnostics =
    languages.createDiagnosticCollection("dbt");

  constructor(
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private dbtCommandFactory: DBTCommandFactory,
    private cliDBTCommandExecutionStrategyFactory: (
      path: Uri,
    ) => CLIDBTCommandExecutionStrategy,
    private projectRoot: Uri,
  ) {
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    console.log(`Registering dbt cloud project ${this.projectRoot}`);

    this.disposables.push(
      this.rebuildManifestDiagnostics,
      this.pythonBridgeDiagnostics,
    );
  }

  async refreshProjectConfig(): Promise<void> {
    await this.initializePaths();
  }

  executeSQL(query: string): Promise<ExecuteSQLResult> {
    throw new Error("Method not implemented.");
  }

  async initializeProject(): Promise<void> {}

  getTargetPath(): string | undefined {
    return this.targetPath;
  }

  getModelPaths(): string[] | undefined {
    return this.modelPaths;
  }

  getMacroPaths(): string[] | undefined {
    return this.macroPaths;
  }

  getPackageInstallPath(): string | undefined {
    return this.packagesInstallPath;
  }

  getAdapterType(): string {
    return this.adapterType;
  }

  async findAdapterType(): Promise<string | undefined> {
    // TODO: get adapter type from cloud?
    return this.adapterType;
  }

  async rebuildManifest(_init: boolean): Promise<void> {
    const command = this.dbtCommandFactory.createParseCommand();
    this.addCommandToQueue(this.dbtCloudCommand(command));
  }

  async findVersion(): Promise<number[]> {
    // TODO: get version
    return [0, 0, 0];
  }

  async runModel(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCloudCommand(command));
  }

  async buildModel(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCloudCommand(command));
  }

  async runTest(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCloudCommand(command));
  }

  async runModelTest(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCloudCommand(command));
  }

  async compileModel(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCloudCommand(command));
  }

  async generateDocs(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCloudCommand(command));
  }

  async deps(command: DBTCommand) {
    return this.dbtCloudCommand(command).execute();
  }

  async debug(command: DBTCommand) {
    return this.dbtCloudCommand(command).execute();
  }

  private dbtCloudCommand(command: DBTCommand) {
    command.setExecutionStrategy(
      this.cliDBTCommandExecutionStrategyFactory(this.projectRoot),
    );
    return command;
  }

  private addCommandToQueue(command: DBTCommand) {
    this.executionInfrastructure.addCommandToQueue(command);
  }

  // internal commands
  unsafeCompileNode(modelName: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }

  unsafeCompileQuery(query: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }

  validateSql(
    query: string,
    dialect: string,
    models: any,
  ): Promise<ValidateSqlParseErrorResponse> {
    throw new Error("Method not implemented.");
  }

  validateSQLDryRun(query: string): Promise<{ bytes_processed: string }> {
    throw new Error("Method not implemented.");
  }

  getColumnsOfSource(
    _sourceName: string,
    _tableName: string,
  ): Promise<{ [key: string]: string }[]> {
    throw new Error("Method not implemented.");
  }

  getColumnsOfModel(modelName: string): Promise<{ [key: string]: string }[]> {
    throw new Error("Method not implemented.");
  }

  getCatalog(): Promise<{ [key: string]: string }[]> {
    throw new Error("Method not implemented.");
  }

  // get dbt config
  private async initializePaths() {
    // all hardcoded as there is no way to get them reliably
    //  we can't parse jinja
    this.targetPath = join(this.projectRoot.fsPath, "target");
    this.modelPaths = [join(this.projectRoot.fsPath, "models")];
    this.macroPaths = [join(this.projectRoot.fsPath, "macros")];
    this.packagesInstallPath = join(this.projectRoot.fsPath, "dbt_packages");
  }

  async dispose() {
    try {
      await this.executionInfrastructure.closePythonBridge(this.python);
    } catch (error) {} // We don't care about errors here.
    this.rebuildManifestDiagnostics.clear();
    this.pythonBridgeDiagnostics.clear();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
