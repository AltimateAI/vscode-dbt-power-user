"""Tests for slack-mrkdwn.py. Run: python3 -m unittest discover .github/scripts/tests"""

import importlib.util
import pathlib
import unittest

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location(
    "slack_mrkdwn", HERE.parent / "slack-mrkdwn.py"
)
slack_mrkdwn = importlib.util.module_from_spec(spec)
spec.loader.exec_module(slack_mrkdwn)
convert = slack_mrkdwn.convert


class Escaping(unittest.TestCase):
    def test_escapes_control_characters(self):
        self.assertEqual(convert("a & b < c > d"), "a &amp; b &lt; c &gt; d")

    def test_escapes_inside_code(self):
        self.assertEqual(convert("`<a>&`"), "`&lt;a&gt;&amp;`")
        self.assertEqual(convert("```\n<b>\n```"), "```\n&lt;b&gt;\n```")


class HtmlComments(unittest.TestCase):
    def test_strips_comments_before_escaping(self):
        self.assertEqual(convert("<!-- generated -->\nNotes"), "\nNotes")
        self.assertEqual(convert("a <!-- one\ntwo --> b"), "a  b")


class Headings(unittest.TestCase):
    def test_every_level(self):
        for level in range(1, 7):
            self.assertEqual(convert("#" * level + " Title"), "*Title*")

    def test_trailing_hashes_and_bold_dropped(self):
        self.assertEqual(convert("## **Known** issues ##"), "*Known issues*")

    def test_not_a_heading(self):
        self.assertEqual(convert("#2144 and ####### seven"), "#2144 and ####### seven")


class Emphasis(unittest.TestCase):
    def test_bold(self):
        self.assertEqual(convert("**Full Changelog**: x"), "*Full Changelog*: x")
        self.assertEqual(convert("__bold__"), "*bold*")

    def test_strikethrough(self):
        self.assertEqual(convert("~~gone~~"), "~gone~")


class Links(unittest.TestCase):
    def test_link(self):
        self.assertEqual(convert("[PR](https://x.test/1)"), "<https://x.test/1|PR>")

    def test_image(self):
        self.assertEqual(
            convert("![shot](https://x.test/a.png)"), "<https://x.test/a.png|shot>"
        )

    def test_url_keeps_ampersand(self):
        self.assertEqual(
            convert("[q](https://x.test/?a=1&b=2)"), "<https://x.test/?a=1&b=2|q>"
        )


class Bullets(unittest.TestCase):
    def test_markers(self):
        self.assertEqual(convert("* a\n- b\n+ c"), "• a\n• b\n• c")

    def test_indent_kept(self):
        self.assertEqual(convert("  - nested"), "  • nested")

    def test_bullet_with_bold(self):
        self.assertEqual(convert("* **feat**: x"), "• *feat*: x")


class Code(unittest.TestCase):
    def test_code_span_untouched(self):
        self.assertEqual(convert("use `**x**` and [t](u)"), "use `**x**` and <u|t>")
        self.assertEqual(convert("`[t](u)` ``a ` b``"), "`[t](u)` ``a ` b``")

    def test_fence_untouched(self):
        text = "```\n## h\n* b\n**x** [t](u)\n```\n## after"
        self.assertEqual(convert(text), "```\n## h\n* b\n**x** [t](u)\n```\n*after*")

    def test_tilde_fence(self):
        self.assertEqual(convert("~~~\n- b\n~~~"), "~~~\n- b\n~~~")


class LeftAlone(unittest.TestCase):
    def test_mentions_urls_tables_rules(self):
        text = "by @someone in https://x.test/pull/1\n| a | b |\n|---|---|\n---"
        self.assertEqual(convert(text), text)


class ReleaseNotes(unittest.TestCase):
    def test_0_70_0(self):
        # .txt, not .md: the pre-commit hook's prettier would rewrite the bullets.
        notes = (HERE / "release-notes-0.70.0.txt").read_text()
        self.assertIn("\n* feat: run dbt Fusion", notes)
        lines = convert(notes).split("\n")
        self.assertIn("*Known issues*", lines)
        self.assertIn("*What's Changed*", lines)
        self.assertEqual(
            lines[lines.index("*What's Changed*") + 1],
            "• feat: run dbt Fusion without the Python extension by @ralphstodomingo"
            " in https://github.com/AltimateAI/vscode-dbt-power-user/pull/2124",
        )
        last = [line for line in lines if line][-1]
        self.assertTrue(last.startswith("*Full Changelog*: https://github.com/"))
        self.assertFalse(any(line.startswith(("* ", "## ")) for line in lines))
        self.assertIn("`{# #}`", "\n".join(lines))


if __name__ == "__main__":
    unittest.main()
