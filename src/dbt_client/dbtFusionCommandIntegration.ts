import {
  CancellationToken,
  CancellationTokenSource,
  Diagnostic,
  DiagnosticSeverity,
  Range,
  Uri,
  window,
} from "vscode";
import { getFirstWorkspacePath, provideSingleton } from "../utils";
import {
  QueryExecution,
  DBTCommand,
  DBColumn,
  Catalog,
  DBTNode,
  DBTDetection,
  DBTProjectDetection,
  DBTCommandExecutionInfrastructure,
  DBTCommandFactory,
  DBTCommandExecutionStrategy,
} from "./dbtIntegration";
import {
  CommandProcessExecutionFactory,
  DBTProject,
  DBTTerminal,
  PythonEnvironment,
  TelemetryService,
  AltimateRequest,
} from "../modules";
import { ValidationProvider } from "../validation_provider";
import { DeferToProdService } from "../services/deferToProdService";
import { DBTCloudProjectIntegration } from "./dbtCloudIntegration";
import path, { join } from "path";
import which from "which";

/**
 * Resolves the dbtf alias from shell configuration
 * @returns The resolved path/command that dbtf aliases to, or null if not found
 */
async function resolveDbtfAlias(
  commandProcessExecutionFactory: CommandProcessExecutionFactory,
  terminal: DBTTerminal,
): Promise<string | null> {
  const platform = process.platform;

  // Windows: Use doskey to check for aliases/macros
  if (platform === "win32") {
    try {
      const aliasProcess =
        commandProcessExecutionFactory.createCommandProcessExecution({
          command: "doskey",
          args: ["/macros"],
          cwd: getFirstWorkspacePath(),
        });

      const { stdout } = await aliasProcess.complete();

      // Parse output like: "dbtf=path\to\dbt $*"
      const match = stdout.match(/dbtf=(.+?)(?:\s+\$\*)?$/m);
      if (match) {
        const resolved = match[1].trim();
        terminal.debug("resolveDbtfAlias", `Found Windows macro: ${resolved}`);
        return resolved;
      }
    } catch (error) {
      terminal.debug(
        "resolveDbtfAlias",
        "Windows doskey resolution failed",
        error,
      );
    }
    return null;
  }

  // Unix-like systems: Use shell alias command
  const shell = process.env.SHELL || "/bin/bash";

  try {
    const aliasProcess =
      commandProcessExecutionFactory.createCommandProcessExecution({
        command: shell,
        args: ["-i", "-c", "alias dbtf 2>/dev/null || echo ''"],
        cwd: getFirstWorkspacePath(),
      });

    const { stdout } = await aliasProcess.complete();
    terminal.debug("resolveDbtfAlias", `alias command output: ${stdout}`);

    // Parse different alias formats
    // Bash: alias dbtf='path' or alias dbtf="path"
    // Zsh: dbtf: aliased to path
    // Direct: dbtf=path
    const bashMatch = stdout.match(/alias dbtf=['"](.+?)['"]/);
    const zshMatch = stdout.match(/dbtf.*aliased to (.+?)$/m);
    const directMatch = stdout.match(/dbtf=(.+?)$/m);

    if (bashMatch) {
      const resolved = bashMatch[1].trim();
      terminal.debug("resolveDbtfAlias", `Found bash alias: ${resolved}`);
      return resolved;
    }
    if (zshMatch) {
      const resolved = zshMatch[1].trim();
      terminal.debug("resolveDbtfAlias", `Found zsh alias: ${resolved}`);
      return resolved;
    }
    if (directMatch) {
      const resolved = directMatch[1].trim();
      terminal.debug("resolveDbtfAlias", `Found direct alias: ${resolved}`);
      return resolved;
    }
  } catch (error) {
    terminal.debug("resolveDbtfAlias", "Shell alias resolution failed", error);
  }

  return null;
}

/**
 * Resolves the dbtf command path with fallback chain:
 * 1. Try to resolve shell alias for dbtf
 * 2. Try to find dbt in PATH
 * 3. Fallback to "dbt" as command name
 * @returns The resolved path to the dbt/dbtf command
 */
async function resolveDbtfPath(
  commandProcessExecutionFactory: CommandProcessExecutionFactory,
  terminal: DBTTerminal,
): Promise<string> {
  // Try to resolve alias via shell
  const aliasResolved = await resolveDbtfAlias(
    commandProcessExecutionFactory,
    terminal,
  );
  if (aliasResolved) {
    terminal.debug("resolveDbtfPath", `Resolved via alias: ${aliasResolved}`);
    return aliasResolved;
  }

  // Try which/where for dbt
  try {
    const dbtPath = await which("dbt");
    terminal.debug("resolveDbtfPath", `Found dbt in PATH: ${dbtPath}`);
    return dbtPath;
  } catch {
    // dbt not in PATH either
  }

  // Fallback to just "dbt" command name
  terminal.debug("resolveDbtfPath", "Falling back to 'dbt' command");
  return "dbt";
}

@provideSingleton(DBTFusionCommandDetection)
export class DBTFusionCommandDetection implements DBTDetection {
  constructor(
    protected commandProcessExecutionFactory: CommandProcessExecutionFactory,
    protected pythonEnvironment: PythonEnvironment,
    protected terminal: DBTTerminal,
  ) {}

  async detectDBT(): Promise<boolean> {
    try {
      this.terminal.debug("DBTCLIDetection", "Detecting dbt fusion cli");

      // Resolve dbtf command (handles aliases, symlinks, PATH)
      const dbtfPath = await resolveDbtfPath(
        this.commandProcessExecutionFactory,
        this.terminal,
      );
      this.terminal.debug(
        "DBTCLIDetection",
        `Resolved dbtf command to: ${dbtfPath}`,
      );

      const checkDBTInstalledProcess =
        this.commandProcessExecutionFactory.createCommandProcessExecution({
          command: dbtfPath,
          args: ["--version"],
          cwd: getFirstWorkspacePath(),
        });
      const { stdout, stderr } = await checkDBTInstalledProcess.complete();
      if (stderr) {
        throw new Error(stderr);
      }
      if (stdout.includes("dbt-fusion")) {
        this.terminal.debug(
          "DBTCLIDetectionSuccess",
          "dbt fusion cli detected",
        );
        return true;
      } else {
        this.terminal.debug(
          "DBTCLIDetectionFailed",
          "dbt fusion cli was not found. Detection command returned :  " +
            stdout,
        );
      }
    } catch (error) {
      this.terminal.warn(
        "DBTCLIDetectionError",
        "Detection failed with error : " + (error as Error).message,
      );
    }
    this.terminal.debug(
      "DBTCLIDetectionFailed",
      "dbt fusion cli was not found. Detection command returning false",
    );
    return false;
  }
}

@provideSingleton(DBTFusionCommandProjectDetection)
export class DBTFusionCommandProjectDetection implements DBTProjectDetection {
  async discoverProjects(projectDirectories: Uri[]): Promise<Uri[]> {
    const packagesInstallPaths = projectDirectories.map((projectDirectory) =>
      path.join(projectDirectory.fsPath, "dbt_packages"),
    );
    const filteredProjectFiles = projectDirectories.filter((uri) => {
      return !packagesInstallPaths.some((packageInstallPath) => {
        return uri.fsPath.startsWith(packageInstallPath!);
      });
    });
    if (filteredProjectFiles.length > 20) {
      window.showWarningMessage(
        `dbt Power User detected ${filteredProjectFiles.length} projects in your workspace, this will negatively affect performance.`,
      );
    }
    return filteredProjectFiles;
  }
}

@provideSingleton(DBTFusionCommandProjectIntegration)
export class DBTFusionCommandProjectIntegration extends DBTCloudProjectIntegration {
  constructor(
    executionInfrastructure: DBTCommandExecutionInfrastructure,
    dbtCommandFactory: DBTCommandFactory,
    cliDBTCommandExecutionStrategyFactory: (
      path: Uri,
      dbtPath: string,
    ) => DBTCommandExecutionStrategy,
    telemetry: TelemetryService,
    pythonEnvironment: PythonEnvironment,
    terminal: DBTTerminal,
    validationProvider: ValidationProvider,
    deferToProdService: DeferToProdService,
    projectRoot: Uri,
    altimateRequest: AltimateRequest,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
  ) {
    super(
      executionInfrastructure,
      dbtCommandFactory,
      cliDBTCommandExecutionStrategyFactory,
      telemetry,
      pythonEnvironment,
      terminal,
      validationProvider,
      deferToProdService,
      projectRoot,
      altimateRequest,
    );
  }

  protected dbtCloudCommand(command: DBTCommand) {
    command.setExecutionStrategy(
      this.cliDBTCommandExecutionStrategyFactory(
        this.projectRoot,
        this.dbtPath,
      ),
    );
    return command;
  }

  async initializeProject(): Promise<void> {
    await super.initializeProject();
    // Resolve dbtf command (handles aliases, symlinks, PATH)
    this.dbtPath = await resolveDbtfPath(
      this.commandProcessExecutionFactory,
      this.terminal,
    );
    this.terminal.debug(
      "DBTFusionInitialization",
      `Resolved dbtf command to: ${this.dbtPath}`,
    );
  }

  protected async initializePaths() {
    // No way to get these paths from the fusion executable
    this.targetPath = join(this.projectRoot.fsPath, "target");
    this.modelPaths = [join(this.projectRoot.fsPath, "models")];
    this.seedPaths = [join(this.projectRoot.fsPath, "seeds")];
    this.macroPaths = [join(this.projectRoot.fsPath, "macros")];
    this.packagesInstallPath = join(this.projectRoot.fsPath, "dbt_packages");
    try {
      const projectConfig = DBTProject.readAndParseProjectConfig(
        this.projectRoot,
      );
      this.projectName = projectConfig.name;
    } catch (error) {
      this.terminal.warn(
        "DbtCloudIntegrationProjectNameFromConfigExceptionError",
        "project name could not be read from dbt_project.yml, ignoring",
        true,
        error,
      );
    }
  }

  async rebuildManifest(): Promise<void> {
    // TODO: check whether we should allow parsing for unauthenticated users
    // this.throwIfNotAuthenticated();
    if (this.rebuildManifestCancellationTokenSource) {
      this.rebuildManifestCancellationTokenSource.cancel();
      this.rebuildManifestCancellationTokenSource = undefined;
    }
    const command = this.dbtCloudCommand(
      this.dbtCommandFactory.createParseCommand(),
    );
    command.addArgument("--log-format");
    command.addArgument("json");
    this.rebuildManifestCancellationTokenSource = new CancellationTokenSource();
    command.setToken(this.rebuildManifestCancellationTokenSource.token);

    try {
      const result = await command.execute();
      const stderr = result.stderr;
      // sending stderr everytime to verify in logs whether is coming as empty or not.
      this.telemetry.sendTelemetryEvent("dbtCloudParseProjectUserError", {
        error: stderr,
        adapter: this.getAdapterType() || "unknown",
      });
      this.terminal.info(
        "dbtFusionParseProject",
        "dbt fusion response",
        false,
        {
          command: command.getCommandAsString(),
          stderr,
        },
      );
      const errorsAndWarnings = stderr
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => Boolean(line))
        .map((line) =>
          this.parseJSON(
            "RebuildManifestErrorsAndWarningsJSONParsing",
            line,
            false,
          ),
        );
      const errors = errorsAndWarnings
        .filter(
          (line) =>
            line &&
            line.hasOwnProperty("info") &&
            line.info.hasOwnProperty("level") &&
            line.info.hasOwnProperty("msg") &&
            ["error", "fatal"].includes(line.info.level),
        )
        .map((line) => line.info.msg);
      const warnings = errorsAndWarnings
        .filter(
          (line) =>
            line &&
            line.hasOwnProperty("info") &&
            line.info.hasOwnProperty("level") &&
            line.info.hasOwnProperty("msg") &&
            line.info.level === "warn",
        )
        .map((line) => line.info.msg);
      this.rebuildManifestDiagnostics.clear();
      const diagnostics: Array<Diagnostic> = errors
        .map(
          (error) =>
            new Diagnostic(
              new Range(0, 0, 999, 999),
              error,
              DiagnosticSeverity.Error,
            ),
        )
        .concat(
          warnings.map(
            (warning) =>
              new Diagnostic(
                new Range(0, 0, 999, 999),
                warning,
                DiagnosticSeverity.Warning,
              ),
          ),
        );
      if (diagnostics) {
        // user error
        this.rebuildManifestDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          diagnostics,
        );
      }
    } catch (error) {
      this.telemetry.sendTelemetryError(
        "dbtCloudCannotParseProjectCommandExecuteError",
        error,
        {
          adapter: this.getAdapterType() || "unknown",
          command: command.getCommandAsString(),
        },
      );
      this.rebuildManifestDiagnostics.set(
        Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
        [
          new Diagnostic(
            new Range(0, 0, 999, 999),
            "Unable to parse dbt cloud cli response. If the problem persists please reach out to us: " +
              error,
            DiagnosticSeverity.Error,
          ),
        ],
      );
    }
  }

  async executeSQL(
    query: string,
    limit: number,
    modelName: string,
  ): Promise<QueryExecution> {
    const showCommand = this.dbtCloudCommand(
      new DBTCommand("Running sql...", [
        "show",
        "--log-level",
        "debug",
        "--inline",
        query,
        "--limit",
        limit.toString(),
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const cancellationTokenSource = new CancellationTokenSource();
    showCommand.setToken(cancellationTokenSource.token);
    return new QueryExecution(
      async () => {
        cancellationTokenSource.cancel();
      },
      async () => {
        const { stdout, stderr } = await showCommand.execute(
          cancellationTokenSource.token,
        );
        const exception = this.processJSONErrors(stderr);
        if (exception) {
          throw exception;
        }
        const parsedLines = stdout
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line.trim()));
        const previewLine = parsedLines.filter(
          (line) =>
            line.hasOwnProperty("data") && line.data.hasOwnProperty("preview"),
        );
        if (previewLine.length === 0) {
          throw new Error("Could not find previewLine in " + stdout);
        }
        const compiledSqlLines = parsedLines.filter(
          (line) =>
            line.hasOwnProperty("data") && line.data.hasOwnProperty("sql"),
        );
        if (previewLine.length === 0) {
          throw new Error("Could not find previewLine in " + stdout);
        }
        const preview = JSON.parse(previewLine[0].data.preview);
        let compiledSql = "";
        // TODO: is there a way to get the last compiled SQL line in fusion?
        if (compiledSqlLines.length !== 0) {
          compiledSql = compiledSqlLines[compiledSqlLines.length - 1].data.sql;
        }
        return {
          table: {
            column_names: preview.length > 0 ? Object.keys(preview[0]) : [],
            column_types:
              preview.length > 0
                ? Object.keys(preview[0]).map((obj: any) => "string")
                : [],
            rows: preview.map((obj: any) => Object.values(obj)),
          },
          compiled_sql: compiledSql,
          raw_sql: query,
          modelName,
        };
      },
    );
  }

  // internal commands
  async unsafeCompileNode(modelName: string): Promise<string> {
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Compiling model...", [
        "compile",
        "--model",
        modelName,
        "--quiet",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout.trim();
  }

  async unsafeCompileQuery(query: string): Promise<string> {
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Compiling sql...", [
        "compile",
        "--inline",
        query,
        "--quiet",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout.trim();
  }

  async getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<DBColumn[]> {
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting columns of source...", [
        "compile",
        "--inline",
        `{% set output = [] %}{% for result in adapter.get_columns_in_relation(source('${sourceName}', '${tableName}')) %} {% do output.append({"column": result.name, "dtype": result.dtype}) %} {% endfor %} {{ tojson(output) }}`,
        "--quiet",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return JSON.parse(stdout.trim());
  }

  async getColumnsOfModel(modelName: string): Promise<DBColumn[]> {
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting columns of model...", [
        "compile",
        "--inline",
        `{% set output = [] %}{% for result in adapter.get_columns_in_relation(ref('${modelName}')) %} {% do output.append({"column": result.name, "dtype": result.dtype}) %} {% endfor %} {{ tojson(output) }}`,
        "--quiet",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return JSON.parse(stdout.trim());
  }

  async getBulkSchemaFromDB(
    nodes: DBTNode[],
    cancellationToken: CancellationToken,
  ): Promise<Record<string, DBColumn[]>> {
    if (nodes.length === 0) {
      return {};
    }
    const bulkModelQuery = `
{% set result = {} %}
{% for n in ${JSON.stringify(nodes)} %}
  {% set columns = adapter.get_columns_in_relation(ref(n["name"])) %}
  {% set new_columns = [] %}
  {% for column in columns %}
    {% do new_columns.append({"column": column.name, "dtype": column.dtype}) %}
  {% endfor %}
  {% do result.update({n["unique_id"]:new_columns}) %}
{% endfor %}
{% for n in graph.sources.values() %}
  {% set columns = adapter.get_columns_in_relation(source(n["source_name"], n["identifier"])) %}
  {% set new_columns = [] %}
  {% for column in columns %}
    {% do new_columns.append({"column": column.name, "dtype": column.dtype}) %}
  {% endfor %}
  {% do result.update({n["unique_id"]:new_columns}) %}
{% endfor %}
{{ tojson(result) }}`;
    console.log(bulkModelQuery);
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting catalog...", [
        "compile",
        "--inline",
        bulkModelQuery.trim().split("\n").join(""),
        "--quiet",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return JSON.parse(stdout.trim());
  }

  async getCatalog(): Promise<Catalog> {
    const bulkModelQuery = `
{% set result = [] %}
{% for n in graph.nodes.values() %}
  {% if n.resource_type == "test" or 
  n.resource_type == "analysis" or 
  n.resource_type == "sql_operation" or 
  n.config.materialized == "ephemeral" %}
    {% continue %}
  {% endif %}
  {% set columns = adapter.get_columns_in_relation(ref(n["name"])) %}
  {% for column in columns %}
    {% do result.append({
      "table_database": n.database,
      "table_schema": n.schema,
      "table_name": n.name,
      "column_name": column.name,
      "column_type": column.dtype,
    }) %}
  {% endfor %}
{% endfor %}
{% for n in graph.sources.values() %}
  {% set columns = adapter.get_columns_in_relation(source(n["source_name"], n["identifier"])) %}
  {% for column in columns %}
    {% do result.append({
      "table_database": n.database,
      "table_schema": n.schema,
      "table_name": n.name,
      "column_name": column.name,
      "column_type": column.dtype,
    }) %}
  {% endfor %}
{% endfor %}
{{ tojson(result) }}`;

    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting catalog...", [
        "compile",
        "--inline",
        bulkModelQuery,
        "--quiet",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    if (!stdout) {
      throw new Error("Could not get bulk schema from response: " + stdout);
    }
    if (stderr) {
      throw new Error(stderr);
    }
    const result: Catalog = JSON.parse(stdout);
    return result;
  }

  async debug(command: DBTCommand): Promise<string> {
    const { stdout, stderr } = await this.dbtCloudCommand(command).execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  }

  async generateDocs(_: DBTCommand) {
    throw new Error("dbt fusion does not support docs generation");
  }

  async clean(command: DBTCommand): Promise<string> {
    const { stdout, stderr } = await this.dbtCloudCommand(command).execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  }
}
