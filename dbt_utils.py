import os
import sys
import contextlib
from typing import (
    Dict,
    List,
    Optional,
)
from decimal import Decimal
from collections.abc import Iterable
from datetime import date, datetime, time

try:
    import agate
    HAS_AGATE = True
except ImportError:
    HAS_AGATE = False


def to_dict(obj):
    if HAS_AGATE and isinstance(obj, agate.Table):
        return {
            "rows": [to_dict(row) for row in obj.rows],
            "column_names": obj.column_names,
            "column_types": list(map(lambda x: x.__class__.__name__, obj.column_types)),
        }
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


@contextlib.contextmanager
def add_path(path):
    sys.path.append(path)
    try:
        yield
    finally:
        sys.path.remove(path)

    
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


def project_healthcheck(
    manifest_path, catalog_path=None, config_path=None, config=None, token=None, tenant=None, backend_url: Optional[str] = None,
):
    try:
        import logging
        import json

        from datapilot.config.config import load_config
        from datapilot.core.platforms.dbt.utils import load_catalog
        from datapilot.core.platforms.dbt.utils import load_manifest
        from datapilot.core.platforms.dbt.constants import MODEL
        from datapilot.core.platforms.dbt.executor import DBTInsightGenerator

        logging.basicConfig(level=logging.INFO)
        manifest = load_manifest(manifest_path)
        catalog = load_catalog(catalog_path) if catalog_path else None
        if not config and config_path:
            config = load_config(config_path)
        insight_generator = DBTInsightGenerator(
            manifest=manifest,
            catalog=catalog,
            config=config,
            token=token,
            instance_name=tenant,
            backend_url=backend_url,
        )
        reports = insight_generator.run()

        # package_insights = reports[PROJECT]
        model_insights = {
            k: [json.loads(item.json()) for item in v]
            for k, v in reports[MODEL].items()
        }

        return {"model_insights": model_insights}

    except Exception as e:
        raise Exception(str(e))
