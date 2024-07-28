import { CancellationTokenSource } from "vscode";
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
} from "./dbtIntegration";

@provideSingleton(DBTCoreCommandDetection)
export class DBTCoreCommandDetection extends DBTCoreDetection {}

@provideSingleton(DBTCoreCommandProjectDetection)
export class DBTCoreCommandProjectDetection extends DBTCoreProjectDetection {}

@provideSingleton(DBTCoreProjectIntegration)
export class DBTCoreCommandProjectIntegration extends DBTCoreProjectIntegration {
  async executeSQL(
    query: string,
    limit: number,
    modelName: string,
  ): Promise<QueryExecution> {
    this.throwBridgeErrorIfAvailable();
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
    this.throwBridgeErrorIfAvailable();
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
          line.data.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async unsafeCompileQuery(query: string): Promise<string> {
    this.throwBridgeErrorIfAvailable();
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
          line.data.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async validateSQLDryRun(query: string): Promise<{ bytes_processed: string }> {
    this.throwBridgeErrorIfAvailable();
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
          line.data.hasOwnProperty("compiled"),
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
    this.throwBridgeErrorIfAvailable();
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
          line.data.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getColumnsOfModel(modelName: string): Promise<DBColumn[]> {
    this.throwBridgeErrorIfAvailable();
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
          line.data.hasOwnProperty("compiled"),
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
    this.throwBridgeErrorIfAvailable();
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
          line.data.hasOwnProperty("compiled"),
      );
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    const result: Catalog = JSON.parse(compiledLine[0].data.compiled);
    return result;
  }
}
