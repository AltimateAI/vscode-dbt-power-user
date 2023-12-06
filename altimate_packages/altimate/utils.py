import sqlglot
from sqlglot.optimizer.qualify import qualify
from sqlglot.executor import execute


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
    len_highlight = len(error["highlight"])
    len_prefix = len(error["start_context"])
    end_position = get_str_position(sql, error["line"], error["col"])
    start_position = end_position - len_highlight - len_prefix
    row, col = get_line_and_column_from_position(sql, start_position)
    return {
        "description": error["description"],
        "start_position": [row, col],
        "end_position": [error["line"], error["col"]],
    }


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
        return [
            {
                "description": str(e),
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


if __name__ == "__main__":
    sql = """SELECT1 * FROM table1"""
    e = sql_parse_errors(sql, "bigquery")
