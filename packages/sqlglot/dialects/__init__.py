"""
## Dialects

While there is a SQL standard, most SQL engines support a variation of that standard. This makes it difficult
to write portable SQL code. SQLGlot bridges all the different variations, called "dialects", with an extensible
SQL transpilation framework. 

The base `sqlglot.dialects.dialect.Dialect` class implements a generic dialect that aims to be as universal as possible.

Each SQL variation has its own `Dialect` subclass, extending the corresponding `Tokenizer`, `Parser` and `Generator`
classes as needed.

### Implementing a custom Dialect

Consider the following example:

```python
from packages.sqlglot import exp
from packages.sqlglot.dialects.dialect import Dialect
from packages.sqlglot.generator import Generator
from packages.sqlglot.tokens import Tokenizer, TokenType


class Custom(Dialect):
    class Tokenizer(Tokenizer):
        QUOTES = ["'", '"']
        IDENTIFIERS = ["`"]

        KEYWORDS = {
            **Tokenizer.KEYWORDS,
            "INT64": TokenType.BIGINT,
            "FLOAT64": TokenType.DOUBLE,
        }

    class Generator(Generator):
        TRANSFORMS = {exp.Array: lambda self, e: f"[{self.expressions(e)}]"}

        TYPE_MAPPING = {
            exp.DataType.Type.TINYINT: "INT64",
            exp.DataType.Type.SMALLINT: "INT64",
            exp.DataType.Type.INT: "INT64",
            exp.DataType.Type.BIGINT: "INT64",
            exp.DataType.Type.DECIMAL: "NUMERIC",
            exp.DataType.Type.FLOAT: "FLOAT64",
            exp.DataType.Type.DOUBLE: "FLOAT64",
            exp.DataType.Type.BOOLEAN: "BOOL",
            exp.DataType.Type.TEXT: "STRING",
        }
```

This is a typical example of adding a new dialect implementation in SQLGlot: we specify its identifier and string
delimiters, as well as what tokens it uses for its types and how they're associated with SQLGlot types. Since
the `Expression` classes are common for each dialect supported in SQLGlot, we may also need to override the generation
logic for some expressions; this is usually done by adding new entries to the `TRANSFORMS` mapping.

----
"""

from packages.sqlglot.dialects.bigquery import BigQuery
from packages.sqlglot.dialects.clickhouse import ClickHouse
from packages.sqlglot.dialects.databricks import Databricks
from packages.sqlglot.dialects.dialect import Dialect, Dialects
from packages.sqlglot.dialects.doris import Doris
from packages.sqlglot.dialects.drill import Drill
from packages.sqlglot.dialects.duckdb import DuckDB
from packages.sqlglot.dialects.hive import Hive
from packages.sqlglot.dialects.mysql import MySQL
from packages.sqlglot.dialects.oracle import Oracle
from packages.sqlglot.dialects.postgres import Postgres
from packages.sqlglot.dialects.presto import Presto
from packages.sqlglot.dialects.redshift import Redshift
from packages.sqlglot.dialects.snowflake import Snowflake
from packages.sqlglot.dialects.spark import Spark
from packages.sqlglot.dialects.spark2 import Spark2
from packages.sqlglot.dialects.sqlite import SQLite
from packages.sqlglot.dialects.starrocks import StarRocks
from packages.sqlglot.dialects.tableau import Tableau
from packages.sqlglot.dialects.teradata import Teradata
from packages.sqlglot.dialects.trino import Trino
from packages.sqlglot.dialects.tsql import TSQL
