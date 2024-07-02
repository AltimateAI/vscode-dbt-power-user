import sqlglot


def fetch_schema(sql: str, dialect: str):
    parsed_query = sqlglot.parse_one(sql=sql, dialect=dialect)
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
