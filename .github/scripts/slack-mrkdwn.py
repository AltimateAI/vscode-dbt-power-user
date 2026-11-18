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
# Code (fenced blocks, inline code) and URLs are set aside before any
# other rule runs, so no rule can reach into them.
_FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")
_HEADING = re.compile(r"^\s{0,3}#{1,6}\s+(.*?)(?:\s+#+)?\s*$")
_RULE = re.compile(r"^\s*([*_-])(?:\s*\1){2,}\s*$")
_BULLET = re.compile(r"^(\s*)[*+-]\s+")
_LINK = re.compile(r"!?\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
_BARE_URL = re.compile(r"https?://[^\s<>|]+")
_BOLD = re.compile(r"\*\*(.+?)\*\*|__(.+?)__")


def _esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _inline(s, heading=False):
    # Links and bare URLs are kept aside while the bold and strike rules
    # run. In a heading, which is bold as a whole, bold markers are dropped.
    kept = []

    def keep(token):
        kept.append(token)
        return f"\x00{len(kept) - 1}\x00"

    def link(m):
        text = m.group(1)
        if not _BARE_URL.fullmatch(text):
            text = _BOLD.sub(lambda b: b.group(1) or b.group(2), text)
        return keep(f"<{m.group(2)}|{text}>" if text else f"<{m.group(2)}>")

    s = _LINK.sub(link, _esc(s))
    s = _BARE_URL.sub(lambda m: keep(m.group(0)), s)
    s = _BOLD.sub(lambda b: (b.group(1) or b.group(2)) if heading else f"*{b.group(1) or b.group(2)}*", s)
    s = re.sub(r"~~(.+?)~~", r"~\1~", s)
    return re.sub(r"\x00(\d+)\x00", lambda m: kept[int(m.group(1))], s)


def _text(s, heading=False):
    parts = re.split(r"(`[^`]*`)", s)
    return "".join(_esc(p) if i % 2 else _inline(p, heading) for i, p in enumerate(parts))


def _drop_comments(s):
    # HTML comments go, except inside inline code. A backtick with no
    # partner is plain text, as in _text.
    out, i = [], 0
    while i < len(s):
        if s[i] == "`" and s.find("`", i + 1) >= 0:
            j = s.find("`", i + 1) + 1
            out.append(s[i:j])
            i = j
        elif s.startswith("<!--", i) and s.find("-->", i + 4) >= 0:
            i = s.find("-->", i + 4) + 3
        else:
            out.append(s[i])
            i += 1
    return "".join(out)


def _blocks(md):
    # (fenced, lines) runs. A fence closes only on a line of the same
    # character, at least as long, with nothing after it; an unclosed
    # fence runs to the end.
    runs, fence, run = [], None, []
    for line in md.split("\n"):
        m = _FENCE.match(line)
        if fence is None and m:
            if run:
                runs.append((False, run))
            fence, run = m.group(1), [line]
        elif fence is not None:
            run.append(line)
            if m and m.group(1)[0] == fence[0] and len(m.group(1)) >= len(fence) and not m.group(2).strip():
                runs.append((True, run))
                fence, run = None, []
        else:
            run.append(line)
    if run:
        runs.append((fence is not None, run))
    return runs


def slack_mrkdwn(md):
    out = []
    for fenced, lines in _blocks(md.replace("\r\n", "\n")):
        if fenced:
            out.extend(_esc(line) for line in lines)
            continue
        for line in _drop_comments("\n".join(lines)).split("\n"):
            if _RULE.match(line):
                out.append(_esc(line))
            elif _HEADING.match(line):
                title = _HEADING.match(line).group(1)
                out.append(f"*{_text(title, heading=True)}*" if title else "")
            else:
                b = _BULLET.match(line)
                if b:
                    line = f"{b.group(1)}• {line[b.end():]}"
                out.append(_text(line))
    return "\n".join(out).strip()
# --- slack_mrkdwn end ---


if __name__ == "__main__":
    sys.stdout.write(slack_mrkdwn(sys.stdin.read()))
