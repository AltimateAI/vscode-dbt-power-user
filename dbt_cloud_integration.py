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


def to_dict(obj, visited=None):
    if visited is None:
        visited = set()
    
    # Check for circular references using object id
    obj_id = id(obj)
    if obj_id in visited:
        return "<circular reference>"
    
    if isinstance(obj, str):
        return obj
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, (datetime, date, time)):
        return obj.isoformat()
    elif isinstance(obj, dict):
        visited.add(obj_id)
        result = dict((key, to_dict(val, visited)) for key, val in obj.items())
        visited.remove(obj_id)
        return result
    elif isinstance(obj, Iterable):
        visited.add(obj_id)
        result = [to_dict(val, visited) for val in obj]
        visited.remove(obj_id)
        return result
    elif hasattr(obj, "__dict__"):
        visited.add(obj_id)
        result = to_dict(vars(obj), visited)
        visited.remove(obj_id)
        return result
    elif hasattr(obj, "__slots__"):
        visited.add(obj_id)
        result = to_dict(
            dict((name, getattr(obj, name)) for name in getattr(obj, "__slots__")), visited
        )
        visited.remove(obj_id)
        return result
    return obj
