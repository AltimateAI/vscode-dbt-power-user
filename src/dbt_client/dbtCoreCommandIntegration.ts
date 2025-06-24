import { provideSingleton } from "../utils";
import {
  DBTCoreDetection,
  DBTCoreProjectDetection,
  DBTCoreProjectIntegration,
} from "./dbtCoreIntegration";
import {
  QueryExecution,
  DBTCommand,
  DBColumn,
  Catalog,
  DBTNode,
} from "./dbtIntegration";
import { getDBTPath } from "./dbtCloudIntegration";

// TODO: either fix this class or remove it
@provideSingleton(DBTCoreCommandDetection)
export class DBTCoreCommandDetection extends DBTCoreDetection {}

// TODO: either fix this class or remove it
@provideSingleton(DBTCoreCommandProjectDetection)
export class DBTCoreCommandProjectDetection extends DBTCoreProjectDetection {}

@provideSingleton(DBTCoreProjectIntegration)
export class DBTCoreCommandProjectIntegration extends DBTCoreProjectIntegration {
  private dbtPath = "dbt";

  refreshProjectConfig(): Promise<void> {
    this.dbtPath = getDBTPath(this.pythonEnvironment, this.dbtTerminal);
    return super.refreshProjectConfig();
  }

  async executeSQL(
    query: string,
    limit: number,
    modelName: string,
  ): Promise<QueryExecution> {
    const showCommand = this.dbtCoreCommand(
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
    const abortController = new AbortController();
    showCommand.setSignal(abortController.signal);
    return new QueryExecution(
      async () => {
        abortController.abort();
      },
      async () => {
        const { stdout, stderr } = await showCommand.execute(
          abortController.signal,
        );
        const exception = this.processJSONErrors(stderr);
        if (exception) {
          throw exception;
        }
        const parsedLines = stdout
          .trim()
          .split("\n")
          .map((line) => {
            try {
              return JSON.parse(line.trim());
            } catch (err) {}
          });
        const previewLine = parsedLines.filter(
          (line) =>
            line &&
            line.hasOwnProperty("data") &&
            line.data.hasOwnProperty("preview"),
        );
        const compiledSqlLines = parsedLines.filter(
          (line) =>
            line &&
            line.hasOwnProperty("data") &&
            line.data.hasOwnProperty("sql"),
        );
        const preview = JSON.parse(previewLine[0].data.preview);
        const compiledSql =
          compiledSqlLines[compiledSqlLines.length - 1].data.sql;
        return {
          table: {
            column_names: preview.length > 0 ? Object.keys(preview[0]) : [],
            column_types:
              preview.length > 0
                ? Object.keys(preview[0]).map(() => "string")
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

  protected dbtCoreCommand(command: DBTCommand) {
    const newCommand = super.dbtCoreCommand(command);
    newCommand.setExecutionStrategy(
      this.cliDBTCommandExecutionStrategyFactory(
        this.projectRoot,
        this.dbtPath,
      ),
    );
    return newCommand;
  }

  // internal commands
  async unsafeCompileNode(modelName: string): Promise<string> {
    const compileQueryCommand = this.dbtCoreCommand(
      new DBTCommand("Compiling model...", [
        "compile",
        "--model",
        modelName,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line.trim());
        } catch (err) {}
      })
      .filter(
        (line) =>
          line &&
          line.hasOwnProperty("data") &&
          line.data?.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async unsafeCompileQuery(query: string): Promise<string> {
    const compileQueryCommand = this.dbtCoreCommand(
      new DBTCommand("Compiling sql...", [
        "compile",
        "--inline",
        query,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line.trim());
        } catch (err) {}
      })
      .filter(
        (line) =>
          line &&
          line.hasOwnProperty("data") &&
          line.data?.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async validateSQLDryRun(query: string): Promise<{ bytes_processed: string }> {
    const validateSqlCommand = this.dbtCoreCommand(
      new DBTCommand("Estimating BigQuery cost...", [
        "compile",
        "--inline",
        `{{ validate_sql('${query}') }}`,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await validateSqlCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line.trim());
        } catch (err) {}
      })
      .filter(
        (line) =>
          line &&
          line.hasOwnProperty("data") &&
          line.data?.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<DBColumn[]> {
    const compileQueryCommand = this.dbtCoreCommand(
      new DBTCommand("Getting columns of source...", [
        "compile",
        "--inline",
        `{% set output = [] %}{% for result in adapter.get_columns_in_relation(source('${sourceName}', '${tableName}')) %} {% do output.append({"column": result.name, "dtype": result.dtype}) %} {% endfor %} {{ tojson(output) }}`,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line.trim());
        } catch (err) {}
      })
      .filter(
        (line) =>
          line &&
          line.hasOwnProperty("data") &&
          line.data?.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getColumnsOfModel(modelName: string): Promise<DBColumn[]> {
    const compileQueryCommand = this.dbtCoreCommand(
      new DBTCommand("Getting columns of model...", [
        "compile",
        "--inline",
        `{% set output = [] %}{% for result in adapter.get_columns_in_relation(ref('${modelName}')) %} {% do output.append({"column": result.name, "dtype": result.dtype}) %} {% endfor %} {{ tojson(output) }}`,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line.trim());
        } catch (err) {}
      })
      .filter(
        (line) =>
          line &&
          line.hasOwnProperty("data") &&
          line.data?.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  private processJSONErrors(jsonErrors: string) {
    if (!jsonErrors) {
      return;
    }
    try {
      const errorLines: string[] = [];
      // eslint-disable-next-line prefer-spread
      errorLines.push.apply(
        errorLines,
        jsonErrors
          .trim()
          .split("\n")
          .map((line) => {
            try {
              return JSON.parse(line.trim());
            } catch (err) {}
          })
          .filter(
            (line) =>
              line &&
              line.hasOwnProperty("info") &&
              line.info.hasOwnProperty("level") &&
              (line.info.level === "error" || line.info.level === "fatal"),
          )
          .map((line) => line.info.msg),
      );
      if (errorLines.length) {
        return new Error(errorLines.join(", "));
      }
    } catch (error) {
      // ideally we never come here, this is a bug in our code
      return new Error("Could not process " + jsonErrors + ": " + error);
    }
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

    const compileQueryCommand = this.dbtCoreCommand(
      new DBTCommand("Getting catalog...", [
        "compile",
        "--inline",
        bulkModelQuery.trim().split("\n").join(""),
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line.trim());
        } catch (err) {}
      })
      .filter(
        (line) =>
          line &&
          line.hasOwnProperty("data") &&
          line.data?.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    const result: Catalog = JSON.parse(compiledLine[0].data.compiled);
    return result;
  }

  async getBulkSchemaFromDB(
    nodes: DBTNode[],
    signal: AbortSignal,
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
    const compileQueryCommand = this.dbtCoreCommand(
      new DBTCommand("Getting catalog...", [
        "compile",
        "--inline",
        bulkModelQuery,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute(signal);
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter(
        (line) =>
          line.hasOwnProperty("data") && line.data?.hasOwnProperty("compiled"),
      );
    if (compiledLine.length === 0) {
      throw new Error("Could not get bulk schema from response: " + stdout);
    }
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }
}
