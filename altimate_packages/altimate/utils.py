import sqlglot
from sqlglot.optimizer.qualify import qualify
from sqlglot.executor import execute


def _build_message(error: dict):
    message = ""
    if error["description"]:
        message += error["description"]
    if error["line"]:
        message += f" on line {error['line']}"
    if error["col"]:
        message += f", column {error['col']}"
    if error["start_context"]:
        message += f"\n{error['start_context']}"
    return message


def sql_parse_errors(sql: str, dialect: str):
    errors = []
    try:
        sqlglot.transpile(sql, read=dialect)
    except sqlglot.errors.ParseError as e:
        for error in e.errors:
            errors.append(_build_message(error))
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
        return [str(e)]

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
        return [str(e)]
    return None
