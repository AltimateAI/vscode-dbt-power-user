import sqlglot
from sqlglot.optimizer.qualify import qualify
from altimate.utils import map_adapter_to_dialect


def fetch_schema(sql: str, dialect: str):
    parsed_query = sqlglot.parse_one(sql=sql, dialect=map_adapter_to_dialect(dialect))
    columns = []
    for c in parsed_query.selects:
        if c.key == "column":
            if c.args["this"].key == "star":
                raise Exception(
                    f"unable fetched schema due to star: {c.sql(pretty=True)}"
                )
            columns.append(c.alias_or_name)
        elif c.key == "alias":
            columns.append(c.alias_or_name)
        else:
            raise Exception(f"unknown key '{c.key}' detected for {c.sql(pretty=True)}")
    return columns


def validate_whether_sql_has_columns(sql: str, dialect: str):
    try:
        parsed_query = sqlglot.parse_one(sql=sql, dialect=map_adapter_to_dialect(dialect))
        qualify(
            parsed_query,
            schema={},
            dialect=dialect,
            quote_identifiers=False,
            validate_qualify_columns=True,
        )
        return True
    except Exception as e:
        return False