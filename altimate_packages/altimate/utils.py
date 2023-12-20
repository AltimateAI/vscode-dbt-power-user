import re

import sqlglot
from sqlglot.executor import execute
from sqlglot.expressions import Table
from sqlglot.optimizer import traverse_scope
from sqlglot.optimizer.qualify import qualify

ADAPTER_MAPPING = {
    "bigquery": "bigquery",
    "clickhouse": "clickhouse",
    "databricks": "databricks",
    "duckdb": "duckdb",
    "hive": "hive",
    "mysql": "mysql",
    "oracle": "oracle",
    "postgres": "postgres",
    "redshift": "redshift",
    "snowflake": "snowflake",
    "spark": "spark",
    "starrocks": "starrocks",
    "teradata": "teradata",
    "trino": "trino",
    "synapse": "tsql",
    "sqlserver": "tsql",
    "doris": "doris",
}

MULTIPLE_OCCURENCES_STR = "Unable to highlight the exact location in the SQL code due to multiple occurrences."
MAPPING_FAILED_STR = "Unable to highlight the exact location in the SQL code."


def extract_column_name(text):
    # List of regex patterns
    regex_patterns = [
        r"Column '\"(\w+)\"' could not be resolved",
        r"Unknown column: (\w+)",
        r"Column '(\w+)' could not be resolved",
        r"Unknown output column: (\w+)",
        r"Cannot automatically join: (\w+)",
    ]

    # Iterate over each regex pattern
    for regex in regex_patterns:
        matches = re.findall(regex, text)
        if matches:
            return matches[0]

    return None


def find_single_occurrence_indices(main_string, substring):
    # Convert both strings to lowercase for case-insensitive comparison
    main_string = main_string.lower()
    substring = substring.lower() if substring else ""

    if not substring:
        return None, None

    num_occurrences = main_string.count(substring)
    # Check if the substring occurs only once in the main string
    if num_occurrences == 1:
        start_index = main_string.find(substring)
        return start_index, start_index + len(substring), num_occurrences

    # Return None if the substring doesn't occur exactly once
    return None, None, num_occurrences


def map_adapter_to_dialect(adapter: str):
    return ADAPTER_MAPPING.get(adapter, adapter)


def get_str_position(str, row, col):
    """
    Get the position of a grid position in a string
    """
    lines = str.split("\n")
    position = 0
    for i in range(row - 1):
        position += len(lines[i]) + 1
    position += col
    return position


def get_line_and_column_from_position(text, start_index):
    """
    Finds the grid position (row and column) in a multiline string given a Python start index.
    Rows and columns are 1-indexed.

    :param text: Multiline string.
    :param start_index: Python start index (0-indexed).
    :return: Tuple of (row, column).
    """
    row = 0
    current_length = 0

    # Split the text into lines
    lines = text.split("\n")

    for line in lines:
        # Check if the start_index is in the current line
        if current_length + len(line) >= start_index:
            # Column is the difference between start_index and the length of processed characters
            column = start_index - current_length + 1
            return row, column

        # Update the row and current length for the next iteration
        row += 1
        current_length += len(line) + 1  # +1 for the newline character

    return None, None


def _build_message(sql: str, error: dict):
    len_highlight = len(error.get("highlight", ""))
    len_prefix = len(error.get("start_context", ""))
    if error.get("line") and error.get("col"):
        end_position = get_str_position(sql, error["line"], error["col"])
        start_position = end_position - len_highlight - len_prefix
        row, col = get_line_and_column_from_position(sql, start_position)
        return {
            "description": "Failed to parse the sql query",
            "start_position": [row, col],
            "end_position": [error["line"], error["col"]],
        }
    return {"description": "Failed to parse the sql query"}


def sql_parse_errors(sql: str, dialect: str):
    errors = []
    try:
        sqlglot.transpile(sql, read=dialect)
        ast = sqlglot.parse_one(sql, read=dialect)
        if isinstance(ast, sqlglot.exp.Alias):
            return [
                {
                    "description": "Failed to parse the sql query.",
                }
            ]
    except sqlglot.errors.ParseError as e:
        for error in e.errors:
            errors.append(_build_message(sql, error))
    return errors


def get_start_and_end_position(sql: str, invalid_string: str):
    start, end, num_occurences = find_single_occurrence_indices(sql, invalid_string)
    if start and end:
        return (
            list(get_line_and_column_from_position(sql, start)),
            list(get_line_and_column_from_position(sql, end)),
            num_occurences,
        )
    return None, None, num_occurences


def form_error(
    error: str, invalid_entity: str, start_position, end_position, num_occurences
):
    if num_occurences > 1:
        error = (
            f"{error}\n {MULTIPLE_OCCURENCES_STR.format(invalid_entity=invalid_entity)}"
        )
        return {
            "description": error,
        }

    if not start_position or not end_position:
        error = (
            f"{error}\n {MAPPING_FAILED_STR.format(invalid_entity=invalid_entity)}"
            if invalid_entity
            else error
        )
        return {
            "description": error,
        }

    return {
        "description": error,
        "start_position": start_position,
        "end_position": end_position,
    }


def validate_tables_and_columns(
    sql: str,
    dialect: str,
    schemas: dict,
):
    try:
        parsed_sql = sqlglot.parse_one(sql, read=dialect)
        qualify(parsed_sql, dialect=dialect, schema=schemas)
    except sqlglot.errors.OptimizeError as e:
        error = str(e)
        if "sqlglot" in error:
            error = "Failed to validate the query."
        invalid_entity = extract_column_name(error)
        if not invalid_entity:
            return [
                {
                    "description": error,
                }
            ]
        start_position, end_position, num_occurences = get_start_and_end_position(
            sql, invalid_entity
        )
        error = error if error[-1] == "." else error + "."
        return [
            form_error(
                error, invalid_entity, start_position, end_position, num_occurences
            )
        ]

    return None


def sql_execute_errors(
    sql: str,
    dialect: str,
    schemas: dict,
):
    tables = {}
    for db in schemas:
        if db not in tables:
            tables[db] = {}
        for schema in schemas[db]:
            if schema not in tables[db]:
                tables[db][schema] = {}
            for table in schemas[db][schema]:
                tables[db][schema][table] = []

    try:
        execute(
            sql=sql,
            read=dialect,
            schema=schemas,
            tables=tables,
        )
    except sqlglot.errors.ExecuteError as e:
        return [
            {
                "description": str(e),
            }
        ]
    return None


def qualify_columns(expression):
    """
    Qualify the columns in the given SQL expression.
    """
    try:
        return qualify(
            expression,
            qualify_columns=True,
            isolate_tables=True,
            validate_qualify_columns=False,
        )
    except sqlglot.errors.OptimizeError as error:
        return expression


def parse_sql_query(sql_query, dialect):
    """
    Parses the SQL query and returns an AST.
    """
    return sqlglot.parse_one(sql_query, read=dialect)


def extract_physical_columns(ast):
    """
    Extracts physical columns from the given AST.
    """
    physical_columns = {}
    for scope in traverse_scope(ast):
        for column in scope.columns:
            table = scope.sources.get(column.table)
            if isinstance(table, Table):
                db, schema, table_name = table.catalog, table.db, table.name
                if db is None or schema is None:
                    continue
                path = f"{db}.{schema}.{table_name}".lower()
                physical_columns.setdefault(path, set()).add(column.name)
    return physical_columns


def get_columns_used(sql_query, dialect):
    """
    Process the SQL query to extract physical columns.
    """
    ast = parse_sql_query(sql_query, dialect)
    qualified_ast = qualify_columns(ast)
    return extract_physical_columns(qualified_ast)


def validate_columns_present_in_schema(sql_query, dialect, schemas, model_mapping):
    """
    Validate that the columns in the SQL query are present in the schema.
    """
    errors = []
    new_schemas = {}
    for db in schemas:
        for schema in schemas[db]:
            for table in schemas[db][schema]:
                path = f"{db}.{schema}.{table}".lower()
                new_schemas.setdefault(path, set()).update(
                    [column.lower() for column in schemas[db][schema][table].keys()]
                )
    schemas = new_schemas
    try:
        columns_used = get_columns_used(sql_query, dialect)

        for table, columns_set in columns_used.items():
            if table not in schemas:
                (
                    start_position,
                    end_position,
                    num_occurences,
                ) = get_start_and_end_position(sql_query, table)
                error = f"Error: Table '{table}' not found. This issue often occurs when a table is used directly\n in dbt instead of being referenced through the appropriate syntax.\n To resolve this, ensure that '{table}' is propaerly defined in your project and use the 'ref()' function to reference it in your models."

                errors.append(
                    form_error(
                        error, table, start_position, end_position, num_occurences
                    )
                )
                continue

            columns = schemas[table]
            for column in columns_set:
                if column.lower() not in columns:
                    (
                        start_position,
                        end_position,
                        num_occurences,
                    ) = get_start_and_end_position(sql_query, column)
                    table = model_mapping.get(table, table)
                    error = f"Error: Column '{column}' not found in '{table}'. \nPossible causes: 1) Typo in column name. 2) Column not materialized. 3) Column not selected in parent cte."
                    errors.append(
                        form_error(
                            error,
                            column,
                            start_position,
                            end_position,
                            num_occurences,
                        )
                    )
    except Exception as e:
        pass
    return errors
