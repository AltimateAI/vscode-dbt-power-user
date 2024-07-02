import sqlglot

def fetch_schema(sql: str, dialect: str):
    parsed_query = sqlglot.parse_one(sql=sql, dialect=dialect)
    columns = []
    for c in parsed_query.selects:
        if c.key == "column":
            columns.append(c.alias_or_name)
        elif c.key == "alias":
            columns.append(c.alias_or_name)
        else:
            raise Exception(f"unknown key '{c.key}' detected for {c.sql(pretty=True)}")
    return columns