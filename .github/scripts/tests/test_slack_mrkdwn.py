"""Tests for slack-mrkdwn.py. Run: python3 -m unittest discover .github/scripts/tests

slack-mrkdwn.cases.json holds the shared converter's cases, copied verbatim; every
case must convert to exactly its expected text.
"""

import importlib.util
import json
import pathlib
import unittest

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location(
    "slack_mrkdwn", HERE.parent / "slack-mrkdwn.py"
)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
slack_mrkdwn = module.slack_mrkdwn


CASES = json.loads((HERE / "slack-mrkdwn.cases.json").read_text("utf-8"))


class SharedCases(unittest.TestCase):
    """One test per shared case, named after it."""

    def test_case_count(self):
        self.assertEqual(len(CASES), 43)


def shared_case(case):
    def test(self):
        self.assertEqual(slack_mrkdwn(case["input"]), case["expected"])

    return test


for number, case in enumerate(CASES, 1):
    name = "".join(c if c.isalnum() else "_" for c in case["name"].lower())
    setattr(SharedCases, f"test_{number:02d}_{name}", shared_case(case))


class ReleaseNotes(unittest.TestCase):
    def test_0_70_0(self):
        # .txt, not .md: the pre-commit hook's prettier would rewrite the bullets.
        notes = (HERE / "release-notes-0.70.0.txt").read_text("utf-8")
        self.assertIn("\n* feat: run dbt Fusion", notes)
        lines = slack_mrkdwn(notes).split("\n")
        self.assertIn("*Known issues*", lines)
        self.assertIn("*What's Changed*", lines)
        self.assertEqual(
            lines[lines.index("*What's Changed*") + 1],
            "• feat: run dbt Fusion without the Python extension by @ralphstodomingo"
            " in https://github.com/AltimateAI/vscode-dbt-power-user/pull/2124",
        )
        self.assertTrue(lines[-1].startswith("*Full Changelog*: https://github.com/"))
        self.assertFalse(any(line.startswith(("* ", "## ")) for line in lines))
        self.assertIn("`{# #}`", "\n".join(lines))


if __name__ == "__main__":
    unittest.main()
