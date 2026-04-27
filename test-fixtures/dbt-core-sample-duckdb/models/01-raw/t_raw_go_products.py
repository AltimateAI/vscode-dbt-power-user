"""       
--------------------------------------------------------------------------------
Path:           models/01-raw
Program:        t_raw_go_products.py
Project:        duckdb-core-sample-go-sales
Description:    Raw model for the GO Sales data go_products
Author:         Manzar Ahmed
First Created:  Jun 2025
--------------------------------------------------------------------------------
Program history:
--------------------------------------------------------------------------------
Date        Programmer             Description
----------  ---------------------  ---------------------------------------------
2025-06-11  Manzar Ahmed           v0.01/Initial version
--------------------------------------------------------------------------------
"""

from shared_utils.db_utils import db_query


def model(dbt, session):  # pylint: disable=unused-argument # noqa: ARG001
    """
    Executes a SQL query against the 'GOSales' database using the provided SQL
    from dbt configuration, and returns the result as a DataFrame.
    """
    sql = dbt.config.get('sql')
    df = db_query(sql, 'GOSales')
    return df
