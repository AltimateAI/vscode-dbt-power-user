"""Convert GitHub Markdown (release notes) to Slack mrkdwn: stdin to stdout.

Kept identical to the shared release-notify converter; update both together.
Everything between the slack_mrkdwn markers is that converter, copied verbatim.
"""

import re
import sys

# --- slack_mrkdwn begin ---
# GitHub Markdown -> Slack mrkdwn. The same rules as Power User's release
# notify (.github/scripts/slack-mrkdwn.py there); keep the two in step.
#  1. & < > are escaped everywhere, code and URLs included.
#  2. HTML comments are dropped.
#  3. # to ###### headings become *Heading* (bold inside them dropped).
#  4. **x** and __x__ become *x*; ~~x~~ becomes ~x~.
#  5. [t](u) becomes <u|t>; ![a](u) becomes <u|a>.
#  6. *, - and + bullets become •, keeping their indent.
#  7. Inline code and fenced blocks are only escaped.
#  8. @mentions, bare URLs, tables and rules are left as they are.
_FENCE = re.compile(r"^\s*(```|~~~)")
_HEADING = re.compile(r"^\s{0,3}#{1,6}\s+(.*?)(?:\s+#+)?\s*$")
_RULE = re.compile(r"^\s*([*_-])(?:\s*\1){2,}\s*$")
_BULLET = re.compile(r"^(\s*)[*+-]\s+")
_LINK = re.compile(r"!?\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
_BARE_URL = re.compile(r"https?://[^\s<>|]+")


def _esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _inline(s):
    # Links and bare URLs are set aside so the bold and strike rules
    # never touch a URL.
    kept = []

    def keep(token):
        kept.append(token)
        return f"\x00{len(kept) - 1}\x00"

    def link(m):
        text = re.sub(r"\*\*|__", "", m.group(1))
        return keep(f"<{m.group(2)}|{text}>" if text else f"<{m.group(2)}>")

    s = _LINK.sub(link, _esc(s))
    s = _BARE_URL.sub(lambda m: keep(m.group(0)), s)
    s = re.sub(r"\*\*(.+?)\*\*", r"*\1*", s)
    s = re.sub(r"__(.+?)__", r"*\1*", s)
    s = re.sub(r"~~(.+?)~~", r"~\1~", s)
    return re.sub(r"\x00(\d+)\x00", lambda m: kept[int(m.group(1))], s)


def _text(s):
    parts = re.split(r"(`[^`]*`)", s)
    return "".join(_esc(p) if i % 2 else _inline(p) for i, p in enumerate(parts))


def slack_mrkdwn(md):
    md = re.sub(r"<!--.*?-->", "", md.replace("\r\n", "\n"), flags=re.S)
    out, fenced = [], False
    for line in md.split("\n"):
        if _FENCE.match(line):
            fenced = not fenced
            out.append(_esc(line))
        elif fenced or _RULE.match(line):
            out.append(_esc(line))
        elif _HEADING.match(line):
            title = re.sub(r"\*\*|__", "", _HEADING.match(line).group(1))
            out.append(f"*{_text(title)}*" if title else "")
        else:
            b = _BULLET.match(line)
            if b:
                line = f"{b.group(1)}• {line[b.end():]}"
            out.append(_text(line))
    return "\n".join(out).strip()
# --- slack_mrkdwn end ---


if __name__ == "__main__":
    sys.stdout.write(slack_mrkdwn(sys.stdin.read()))
