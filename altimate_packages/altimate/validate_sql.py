from typing import Dict, List

from altimate.utils import (
    map_adapter_to_dialect,
    sql_execute_errors,
    sql_parse_errors,
    validate_columns_present_in_schema,
    validate_tables_and_columns,
)


def _get_key(
    key: str,
    dialect: str,
):
    if dialect == "bigquery":
        return key.lower()

    if dialect == "snowflake":
        return key.upper()
    return key


def _build_schemas(
    models: List[Dict],
    dialect: str,
):
    """
    TODO: Duplicated in multiple places with slight variations. Fix this.
    """
    schemas = {}
    for model in models:
        schema = {}
        for column in model["columns"]:
            schema[_get_key(model["columns"][column]["name"], dialect)] = model[
                "columns"
            ][column].get("data_type", "string")

        db = _get_key(model["database"], dialect)
        schema_name = _get_key(model["schema"], dialect)
        table = _get_key(model["alias"], dialect)
        if db not in schemas:
            schemas[db] = {}

        if schema_name not in schemas[db]:
            schemas[db][schema_name] = {}

        schemas[db][schema_name][table] = schema

    return schemas


def _build_model_mapping(
    models: List[Dict],
):
    map = {}
    for model in models:
        db = model["database"]
        schema = model["schema"]
        table = model["alias"]
        map[f"{db}.{schema}.{table}".lower()] = model["name"]
    return map


def validate_sql_from_models(
    sql: str,
    dialect: str,
    models: List[Dict],
):
    """
    Validate SQL from models
    """
    try:
        dialect = map_adapter_to_dialect(dialect)
        schemas = _build_schemas(models, dialect)
        model_mapping = _build_model_mapping(models)
        errors = sql_parse_errors(sql, dialect)

        if len(errors) > 0:
            return {
                "error_type": "sql_parse_error",
                "errors": errors,
            }

        errors = validate_columns_present_in_schema(
            sql, dialect, schemas, model_mapping
        )
        if len(errors) > 0:
            return {
                "error_type": "sql_invalid_error",
                "errors": errors,
            }

        errors = validate_tables_and_columns(sql, dialect, schemas)

        if errors:
            return {
                "error_type": "sql_invalid_error",
                "errors": errors,
            }

        # errors = sql_execute_errors(sql, dialect, schemas)

        # if errors:
        #     return {"error_type": "sql_execute_error", "errors": errors}

    except Exception as e:
        return {
            "error_type": "sql_unknown_error",
            "errors": [
                {"description": f"Unknown error. Cannot validate SQL. {str(e)}"}
            ],
        }
    return {}
