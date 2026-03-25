"""Unit tests for db_query function."""

from unittest import mock
import pandas as pd
from shared_utils.db_utils import db_query
from tests.test_data import mock_config_data


@mock.patch("shared_utils.db_utils.get_db_config")
@mock.patch("shared_utils.db_utils.mysql.connector.connect")
@mock.patch("shared_utils.db_utils.pd.read_sql")
def test_db_query_success(mock_read_sql, mock_connect, mock_get_config):
    """Test db_query runs SQL and returns DataFrame correctly."""
    fake_config = mock_config_data["GOSales"]
    mock_conn = mock.Mock()
    mock_get_config.return_value = fake_config
    mock_connect.return_value = mock_conn

    expected_df = pd.DataFrame({"id": [1], "name": ["Test"]})
    mock_read_sql.return_value = expected_df

    result = db_query("SELECT * FROM dummy_table", "GOSales")

    mock_get_config.assert_called_once_with("GOSales")
    mock_connect.assert_called_once_with(**fake_config)
    mock_read_sql.assert_called_once_with("SELECT * FROM dummy_table", mock_conn)
    mock_conn.close.assert_called_once()
    pd.testing.assert_frame_equal(result, expected_df)
