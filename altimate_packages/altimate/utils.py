import re

import sqlglot
from sqlglot.executor import execute
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

    # Check if the substring occurs only once in the main string
    if main_string.count(substring) == 1:
        start_index = main_string.find(substring)
        return start_index, start_index + len(substring)

    # Return None if the substring doesn't occur exactly once
    return None, None


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


def get_line_and_column_from_position(sql: str, position: int):
    """
    Get row and column from position in a string
    """
    position = min(position, len(sql))
    lines = sql.split("\n")
    row = 1
    col = 1
    for line in lines:
        if position <= len(line):
            col = position + 1
            break
        else:
            position -= len(line) + 1
            row += 1
    return row, col


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
    except sqlglot.errors.ParseError as e:
        for error in e.errors:
            errors.append(_build_message(sql, error))
    return errors


def validate_tables_and_columns(
    sql: str,
    dialect: str,
    schemas: dict,
):
    parsed_sql = sqlglot.parse_one(sql, read=dialect)

    try:
        qualify(parsed_sql, dialect=dialect, schema=schemas)
    except sqlglot.errors.OptimizeError as e:
        error = str(e)
        if "sqlglot" in error:
            error = "Failed to validate the query"
        invalid_entity = extract_column_name(error)
        if not invalid_entity:
            return [
                {
                    "description": error,
                }
            ]
        start, end = find_single_occurrence_indices(sql, invalid_entity)
        if start and end:
            return [
                {
                    "description": error,
                    "start_position": list(
                        get_line_and_column_from_position(sql, start)
                    ),
                    "end_position": list(get_line_and_column_from_position(sql, end)),
                }
            ]
        return [
            {
                "description": error,
            }
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
