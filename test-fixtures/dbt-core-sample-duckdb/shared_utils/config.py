"""Configuration utility to provide database connection settings."""

import json
import os


def get_db_config(database: str) -> dict:
    """
    Returns database connection configuration for the specified database.

    Args:
        database (str): The name of the database.

    Returns:
        dict: A dictionary with connection parameters.

    Raises:
        ValueError: If the specified database is not supported.
    """
    config_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "credentials",
        "go-sales.json"
    )

    with open(config_path, "r", encoding="utf-8") as f:
        config_map = json.load(f)

    if database not in config_map:
        raise ValueError(f"Unsupported database: {database}")

    return config_map[database]
