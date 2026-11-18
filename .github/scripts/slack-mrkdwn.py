"""Convert GitHub Markdown (release notes) to Slack mrkdwn: stdin to stdout.

Rules, in order:
  1. Strip HTML comments.
  2. Escape `&`, `<` and `>` everywhere, code included.
  3. Outside code: `#`-`######` headings become `*Heading*` (trailing `#`s and
     `**` dropped); `* `, `- ` and `+ ` bullets become `• `, keeping the indent;
     `**x**` and `__x__` become `*x*`; `~~x~~` becomes `~x~`; `[t](u)` and
     `![a](u)` become `<u|t>`, with `&` restored in the URL.
  4. Inline code spans and fenced blocks keep their text apart from step 2.
     @mentions, bare URLs, tables and `---` are left alone.
"""

import re
import sys

COMMENT = re.compile(r"<!--.*?-->", re.S)
FENCE = re.compile(r"^\s*(```|~~~)")
HEADING = re.compile(r"^#{1,6}[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$")
BULLET = re.compile(r"^([ \t]*)[*+-][ \t]+")
CODE_SPAN = re.compile(r"(?<!`)(`+)(?!`).+?(?<!`)\1(?!`)")
LINK = re.compile(r"!?\[([^\]]*)\]\(([^)\s]+)\)")
BOLD = re.compile(r"\*\*(.+?)\*\*|__(.+?)__")
STRIKE = re.compile(r"~~(.+?)~~")


def escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def slack_link(match):
    url = match.group(2).replace("&amp;", "&")
    return f"<{url}|{match.group(1)}>"


def convert_text(text):
    """Inline conversions for text that holds no code span."""
    text = LINK.sub(slack_link, text)
    text = BOLD.sub(lambda m: f"*{m.group(1) or m.group(2)}*", text)
    return STRIKE.sub(r"~\1~", text)


def convert_inline(line):
    """Apply convert_text to everything but the inline code spans."""
    out, pos = [], 0
    for span in CODE_SPAN.finditer(line):
        out += [convert_text(line[pos : span.start()]), span.group(0)]
        pos = span.end()
    return "".join(out + [convert_text(line[pos:])])


def convert_line(line):
    heading = HEADING.match(line)
    if heading:
        return f"*{convert_inline(heading.group(1).replace('**', ''))}*"
    return convert_inline(BULLET.sub(r"\1• ", line, count=1))


def convert(markdown):
    lines, in_fence = [], False
    for line in escape(COMMENT.sub("", markdown)).split("\n"):
        if FENCE.match(line):
            in_fence = not in_fence
            lines.append(line)
        else:
            lines.append(line if in_fence else convert_line(line))
    return "\n".join(lines)


if __name__ == "__main__":
    sys.stdout.write(convert(sys.stdin.read()))
