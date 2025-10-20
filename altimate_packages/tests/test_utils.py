import sys
import unittest
sys.path.insert(0, 'altimate_packages')
from altimate.utils import get_start_and_end_position

class TestGetStartEndPosition(unittest.TestCase):
    def test_invalid_token_at_beginning(self):
        sql = "invalid_token SELECT * FROM table"
        start, end, count = get_start_and_end_position(sql, "invalid_token")
        self.assertEqual(start, [0, 1])
        self.assertEqual(end, [0, len("invalid_token") + 1])
        self.assertEqual(count, 1)

if __name__ == "__main__":
    unittest.main()
