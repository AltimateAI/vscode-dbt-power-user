"""Unit tests for shared_utils.config.get_db_config."""

import json
from unittest import mock
import pytest
from shared_utils.config import get_db_config
from tests.test_data import mock_config_data


@mock.patch("builtins.open", new_callable=mock.mock_open, read_data=json.dumps(mock_config_data))
def test_get_db_config_valid(_):
    """Test get_db_config returns config for valid DB key."""
    result = get_db_config("GOSales")
    assert result == mock_config_data["GOSales"]


@mock.patch("builtins.open", new_callable=mock.mock_open, read_data=json.dumps(mock_config_data))
def test_get_db_config_invalid(_):
    """Test get_db_config raises ValueError for unsupported DB key."""
    with pytest.raises(ValueError, match="Unsupported database: InvalidDB"):
        get_db_config("InvalidDB")
