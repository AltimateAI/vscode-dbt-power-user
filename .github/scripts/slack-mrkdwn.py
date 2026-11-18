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
# A link's "(url)" or "(url "title")": the url may hold one level of
# balanced parentheses.
_LINK_TAIL = re.compile(r"\(\s*((?:[^()\s]|\([^()\s]*\))+)(?:\s+\"[^\"]*\")?\s*\)")
_BARE_URL = re.compile(r"https?://[^\s<>|\x00]+")
_BOLD = re.compile(r"\*\*(.+?)\*\*|__(.+?)__")


def _esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _code_end(s, i):
    # The backtick run at i opens a code span that ends after the next run
    # of the same length: that end index, or -1 when there is none.
    n = len(re.match(r"`+", s[i:]).group(0))
    for m in re.finditer(r"`+", s[i + n:]):
        if len(m.group(0)) == n:
            return i + n + m.end()
    return -1


def _link_at(s, i):
    # [label](url) or ![label](url) starting at i: (label, url, end), or
    # None. Code spans in the label are skipped over whole.
    j = i + 1 if s[i] == "!" else i
    if s[j:j + 1] != "[":
        return None
    k, depth = j + 1, 1
    while k < len(s):
        if s[k] == "`" and _code_end(s, k) > 0:
            k = _code_end(s, k)
            continue
        depth += {"[": 1, "]": -1}.get(s[k], 0)
        if depth == 0:
            m = _LINK_TAIL.match(s, k + 1)
            return (s[j + 1:k], m.group(1), m.end()) if m else None
        k += 1
    return None


def _text(s, heading=False):
    # Left to right, inline code and links are kept whole as
    # placeholders, then bare URLs; the bold and strike rules run on what
    # is left. Code is only escaped. In a heading or a link label, which
    # Slack can't nest bold in, bold markers are dropped.
    kept, plain, i = [], [], 0

    def keep(token):
        kept.append(token)
        return f"\x00{len(kept) - 1}\x00"

    while i < len(s):
        link = _link_at(s, i) if s[i] in "[!" else None
        end = _code_end(s, i) if s[i] == "`" else -1
        if link:
            label, url, i = link
            label = _esc(label) if _BARE_URL.fullmatch(label) else _text(label, heading=True)
            plain.append(keep(f"<{_esc(url)}|{label}>" if label else f"<{_esc(url)}>"))
        elif end > 0:
            plain.append(keep(_esc(s[i:end])))
            i = end
        elif s[i] == "`":
            run = re.match(r"`+", s[i:]).group(0)  # no partner: plain text
            plain.append(run)
            i += len(run)
        else:
            plain.append(s[i])
            i += 1
    t = _BARE_URL.sub(lambda m: keep(m.group(0)), _esc("".join(plain)))
    t = _BOLD.sub(lambda b: (b.group(1) or b.group(2)) if heading else f"*{b.group(1) or b.group(2)}*", t)
    t = re.sub(r"~~(.+?)~~", r"~\1~", t)
    # Kept tokens hold no placeholders (a label is restored by its own
    # _text call), so one pass restores them all.
    return re.sub(r"\x00(\d+)\x00", lambda m: kept[int(m.group(1))], t)


def _drop_comments(s):
    # HTML comments go, except inside inline code (spans found as in _text).
    out, i = [], 0
    while i < len(s):
        if s[i] == "`" and _code_end(s, i) > 0:
            out.append(s[i:_code_end(s, i)])
            i = _code_end(s, i)
        elif s[i] == "`":
            run = re.match(r"`+", s[i:]).group(0)
            out.append(run)
            i += len(run)
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
    # NUL is the placeholder marker in _text, so none may come from the notes.
    for fenced, lines in _blocks(md.replace("\r\n", "\n").replace("\x00", "")):
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
