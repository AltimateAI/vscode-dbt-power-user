# tests/test_data.py
"""
This module contains mock configuration data for testing purposes.

Attributes:
    mock_config_data (dict): A dictionary containing mock database connection
        configurations for various databases, such as "GOSales". The configuration
        includes host, port, user, password, and database name.
"""

mock_config_data = {
    "GOSales": {
        "host": "dummy-host.local",
        "port": 1234,
        "user": "test_user",
        "password": "test_password",
        "database": "dummy_db"
    }
}
