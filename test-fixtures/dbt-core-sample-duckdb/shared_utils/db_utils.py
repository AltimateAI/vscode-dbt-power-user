"""
This module provides a function to execute SQL queries on supported databases
and return the result as a pandas DataFrame.
"""

import mysql.connector
import pandas as pd
from shared_utils.config import get_db_config


def db_query(sql: str, database: str) -> pd.DataFrame:
    """
    Executes a SQL query on the specified database and returns the result
    as a pandas DataFrame.

    Args:
        sql (str): The SQL query to execute.
        database (str): The name of the database to connect to.
                        Supported values are keys in the config_map.

    Returns:
        pd.DataFrame: The result of the SQL query.

    Raises:
        ValueError: If the specified database is not supported.
    """
    config = get_db_config(database)

    print(f"\nRunning SQL query:\n{sql}")
    conn = mysql.connector.connect(**config)

    try:
        df = pd.read_sql(sql, conn)
    finally:
        conn.close()

    print(f"\nshape: {df.shape} \n")
    return df
