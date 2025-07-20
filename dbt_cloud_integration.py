from decimal import Decimal

import os
import sys
import contextlib
from collections.abc import Iterable
from datetime import date, datetime, time
from typing import (
    Dict,
    List,
)


@contextlib.contextmanager
def add_path(path):
    sys.path.append(path)
    try:
        yield
    finally:
        sys.path.remove(path)


def validate_sql(
    sql: str,
    dialect: str,
    models: List[Dict],
):
    try:
        ALTIMATE_PACKAGE_PATH = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "altimate_packages"
        )
        with add_path(ALTIMATE_PACKAGE_PATH):
            from altimate.validate_sql import validate_sql_from_models

            return validate_sql_from_models(sql, dialect, models)
    except Exception as e:
        raise Exception(str(e))


def fetch_schema_from_sql(sql: str, dialect: str):
    try:
        ALTIMATE_PACKAGE_PATH = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "altimate_packages"
        )
        with add_path(ALTIMATE_PACKAGE_PATH):
            from altimate.fetch_schema import fetch_schema

            return fetch_schema(sql, dialect)
    except Exception as e:
        raise Exception(str(e))

def validate_whether_sql_has_columns(sql: str, dialect: str):
    try:
        ALTIMATE_PACKAGE_PATH = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "altimate_packages"
        )
        with add_path(ALTIMATE_PACKAGE_PATH):
            from altimate.fetch_schema import validate_whether_sql_has_columns

            return validate_whether_sql_has_columns(sql, dialect)
    except Exception as e:
        raise Exception(str(e))


def to_dict(obj):
    if isinstance(obj, str):
        return obj
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, (datetime, date, time)):
        return obj.isoformat()
    elif isinstance(obj, dict):
        return dict((key, to_dict(val)) for key, val in obj.items())
    elif isinstance(obj, Iterable):
        return [to_dict(val) for val in obj]
    elif hasattr(obj, "__dict__"):
        return to_dict(vars(obj))
    elif hasattr(obj, "__slots__"):
        return to_dict(
            dict((name, getattr(obj, name)) for name in getattr(obj, "__slots__"))
        )
    return obj
