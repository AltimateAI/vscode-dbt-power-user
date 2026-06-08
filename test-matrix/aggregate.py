#!/usr/bin/env python3
"""Aggregate per-cell RESULT_JSON files into the install + update matrices,
a Slack payload, and a blocking-gate exit code.

Usage:
  python3 aggregate.py --results-dir <dir> --out-dir <dir> [--target <ver>] [--trigger pr|schedule|release]
"""
from __future__ import annotations

import argparse
import glob
import json
import os
import re
import sys

# Only these runtimes can fail a release. Everything else is informational.
BLOCKING_RUNTIMES = {"vscode"}

# Stable display order; runtimes not listed are appended alphabetically.
RUNTIME_ORDER = [
    "vscode",
    "vscode-insiders",
    "cursor",
    "windsurf",
    "kiro",
    "code-server",
]
OS_ORDER = ["linux", "windows", "macos"]


def _cell_symbol(cell: dict) -> str:
    if cell.get("status") == "skip":
        return "⏭️"
    if cell.get("status") == "pass":
        return "✅"
    # failed
    return "❌" if cell.get("runtime") in BLOCKING_RUNTIMES else "⚠️"


def _runtime_sort_key(rt: str):
    return (RUNTIME_ORDER.index(rt) if rt in RUNTIME_ORDER else len(RUNTIME_ORDER), rt)


def _os_sort_key(os_name: str):
    return (OS_ORDER.index(os_name) if os_name in OS_ORDER else len(OS_ORDER), os_name)


def _os_share(impact: dict, version: str, os_name: str):
    """Percent of the running base on (version, os), or None if unknown.
    `impact` is the build-matrix per-version×OS map."""
    v = impact.get(version)
    if not v:
        return None
    oe = v.get("os", {}).get(os_name)
    return oe.get("share") if oe else None


def _version_share(impact: dict, version: str):
    """Percent of the running base on a version across all OSes, or None."""
    v = impact.get(version)
    return v.get("total_share") if v else None


def _pct(x) -> str:
    return f"{x:.1f}%" if isinstance(x, (int, float)) else "?"


def _is_semver(v) -> bool:
    return bool(re.match(r"^\d+\.\d+\.\d+$", v)) if isinstance(v, str) else False


def _semver_key(v: str):
    """Sort key for plain x.y.z versions; non-semver sorts last."""
    try:
        a, b, c = v.split(".")
        return (0, int(a), int(b), int(c))
    except (ValueError, AttributeError):
        return (1, 0, 0, 0)


def _newest_impact_version(impact: dict) -> str:
    """Highest semver present in the impact map (the de-facto 'latest' a fresh
    install lands on), so the install board can show target-version impact even
    when result cells label `to` as 'latest'/'pr-build' rather than a semver."""
    sv = [v for v in impact if _is_semver(v)]
    return max(sv, key=_semver_key) if sv else ""


LEGEND = (
    "**Legend:** ✅ pass · ❌ blocking failure (fails the release gate) · "
    "⚠️ non-blocking issue (forks/Insiders — informational) · ⏭️ skipped · — not run. "
    "Percentages are the share of the live user base on that version×OS."
)


def build_matrices(results: list[dict], impact: dict | None = None) -> dict:
    impact = impact or {}
    install = [r for r in results if r.get("scenario") == "fresh"]
    upgrade = [r for r in results if r.get("scenario") == "upgrade"]

    has_blocking_failure = any(
        r.get("status") == "fail" and r.get("runtime") in BLOCKING_RUNTIMES
        for r in results
    )

    install_md = _render_install(install, impact)
    update_md = _render_update(upgrade, impact)
    slack_blocks = _render_slack(results, has_blocking_failure, impact)

    return {
        "install_md": install_md,
        "update_md": update_md,
        "slack_blocks": slack_blocks,
        "has_blocking_failure": has_blocking_failure,
    }


def _render_install(cells: list[dict], impact: dict | None = None) -> str:
    impact = impact or {}
    runtimes = sorted({c["runtime"] for c in cells}, key=_runtime_sort_key)
    oses = sorted({c["os"] for c in cells}, key=_os_sort_key)
    by = {(c["runtime"], c["os"]): c for c in cells}
    # Target version (what a fresh install lands on). Cells label `to` as a
    # semver, or "latest"/"pr-build" in CI — in those cases fall back to the
    # newest version in the impact map so the per-OS target share still renders.
    raw_target = next(
        (
            c.get("to") or c.get("target")
            for c in cells
            if c.get("to") or c.get("target")
        ),
        "",
    )
    target = raw_target if _is_semver(raw_target) else _newest_impact_version(impact)

    lines = [
        "### Install matrix (fresh install of target)",
        "",
        "_Scenario: clean install of the latest published build (no prior version)._",
        "",
    ]
    lines.append("| Runtime | " + " | ".join(oses) + " |")
    lines.append("|---|" + "---|" * len(oses))
    for rt in runtimes:
        row = [rt]
        for os_name in oses:
            cell = by.get((rt, os_name))
            row.append(_cell_symbol(cell) if cell else "—")
        lines.append("| " + " | ".join(row) + " |")
    lines.append("")
    # Impact context: % of the running base already on the target version, by OS —
    # i.e. who a broken fresh install would affect among current users of latest.
    if impact and target and impact.get(target):
        parts = []
        for os_name in oses:
            sh = _os_share(impact, target, os_name)
            if sh is not None:
                parts.append(f"{os_name} {_pct(sh)}")
        if parts:
            lines.append(
                f"_Users on target `{target}` (share of running base): "
                + " · ".join(parts)
                + "._"
            )
            lines.append("")
    return "\n".join(lines)


def _cell_text(cell: dict, impact: dict, version: str, os_name: str) -> str:
    """A status glyph plus, when known, the version×OS user-impact share."""
    sym = _cell_symbol(cell)
    sh = _os_share(impact, version, os_name)
    return f"{sym} {_pct(sh)}" if sh is not None else sym


def _render_update(cells: list[dict], impact: dict | None = None) -> str:
    impact = impact or {}
    lines = [
        "### Update matrix — upgrade to latest",
        "",
        "_Existing install on an older version is updated **directly to latest** "
        "(VS Code upgrades in one hop — it does not step through intermediate "
        "versions). Each cell: result + share of the live user base on that "
        "version×OS = who a broken upgrade hits._",
        "",
    ]
    if not cells:
        lines.append("_No upgrade cells in this run._")
        lines.append("")
        return "\n".join(lines)

    by = {(c["runtime"], c["os"], c.get("from")): c for c in cells}
    # Split by runtime CLASS, not baseline count: the blocking runtimes (vscode)
    # get the dense version×OS grid even if telemetry picks only one baseline;
    # forks/code-server (which only test latest-minus-one) get the compact list so
    # the grid isn't a wall of "—". (Splitting on len(baselines) mislabels a
    # single-baseline vscode run as "Forks".)
    base_by_rt: dict[str, set] = {}
    for c in cells:
        if c.get("from"):
            base_by_rt.setdefault(c["runtime"], set()).add(c["from"])
    grid_rts = sorted(
        (rt for rt in base_by_rt if rt in BLOCKING_RUNTIMES), key=_runtime_sort_key
    )
    single_rts = sorted(
        (rt for rt in base_by_rt if rt not in BLOCKING_RUNTIMES), key=_runtime_sort_key
    )

    # --- Dense grid: blocking runtimes (e.g. vscode), newest baseline first.
    for rt in grid_rts:
        # Newest real version first; any non-semver string sorts to the END
        # (reverse=True alone would push non-semver to the front).
        all_b = base_by_rt[rt]
        semver_b = sorted(
            (v for v in all_b if _is_semver(v)), key=_semver_key, reverse=True
        )
        non_semver_b = sorted(v for v in all_b if not _is_semver(v))
        baselines = semver_b + non_semver_b
        oses = sorted({c["os"] for c in cells if c["runtime"] == rt}, key=_os_sort_key)
        lines.append(f"**{rt}** — upgrade from each version → latest")
        lines.append("")
        lines.append("| from \\ OS | " + " | ".join(oses) + " |")
        lines.append("|:--|" + ":-:|" * len(oses))
        for b in baselines:
            row = [f"`{b}`"]
            for os_name in oses:
                cell = by.get((rt, os_name, b))
                row.append(_cell_text(cell, impact, b, os_name) if cell else "—")
            lines.append("| " + " | ".join(row) + " |")
        lines.append("")

    # --- Compact list: single-baseline runtimes (forks / code-server).
    if single_rts:
        lines.append("**Forks & code-server** — upgrade from latest-minus-one → latest")
        lines.append("")
        lines.append("| Runtime | OS | From | Result | Users on that version×OS |")
        lines.append("|:--|:--|:--|:-:|:--|")
        srows = sorted(
            [c for c in cells if c["runtime"] in single_rts],
            key=lambda c: (_runtime_sort_key(c["runtime"]), _os_sort_key(c["os"])),
        )
        for c in srows:
            sh = _os_share(impact, c.get("from"), c.get("os"))
            lines.append(
                f"| {c['runtime']} | {c['os']} | `{c.get('from')}` | "
                f"{_cell_symbol(c)} | {_pct(sh) if sh is not None else '—'} |"
            )
        lines.append("")

    # Worst blocking failures, ranked by user impact (actionable triage list).
    fails = []
    for c in cells:
        if c.get("status") == "fail" and c.get("runtime") in BLOCKING_RUNTIMES:
            sh = _os_share(impact, c.get("from"), c.get("os"))
            fails.append((sh if sh is not None else -1.0, c))
    if fails:
        fails.sort(key=lambda x: x[0], reverse=True)
        lines.append("**⛔ Blocking upgrade failures (most users first):**")
        for sh, c in fails:
            tag = f"**{_pct(sh)} of users**" if sh >= 0 else "impact unknown"
            lines.append(
                f"- `{c.get('from')}` → latest on **{c.get('os')}** — {tag}"
                + (f" — {c.get('reason')}" if c.get("reason") else "")
            )
        lines.append("")
    return "\n".join(lines)


def _render_slack(
    results: list[dict], has_blocking_failure: bool, impact: dict | None = None
) -> list[dict]:
    impact = impact or {}
    total = len(results)
    passed = sum(1 for r in results if r.get("status") == "pass")
    failed = [r for r in results if r.get("status") == "fail"]
    skipped = [r for r in results if r.get("status") == "skip"]
    headline = (
        "❌ Install/Update matrix: BLOCKING failure"
        if has_blocking_failure
        else (
            "⚠️ Install/Update matrix: non-blocking issues"
            if failed
            else "✅ Install/Update matrix: all green"
        )
    )
    detail = f"{passed}/{total} cells passed"
    if failed:

        def _impact_tag(r):
            sh = (
                _os_share(impact, r.get("from"), r.get("os"))
                if (impact and r.get("from"))
                else None
            )
            return f" [{_pct(sh)} users]" if sh is not None else ""

        detail += "\nFailures:\n" + "\n".join(
            f"• {r.get('runtime','?')}/{r.get('os','?')}/{r.get('scenario','?')}"
            + (f" (from {r['from']})" if r.get("from") else "")
            + _impact_tag(r)
            + f": {r.get('reason') or 'failed'}"
            for r in failed
        )
    if skipped:
        detail += "\nSkipped:\n" + "\n".join(
            f"• {r.get('runtime','?')}/{r.get('os','?')}: {r.get('reason') or 'skipped'}"
            for r in skipped
        )
    return [
        {"type": "section", "text": {"type": "mrkdwn", "text": f"*{headline}*"}},
        {"type": "section", "text": {"type": "mrkdwn", "text": detail}},
    ]


def _load_results(results_dir: str):
    """Load every RESULT_JSON. Returns (results, errors) where errors is a list
    of (path, message) for files that could not be parsed."""
    out = []
    errors = []
    for path in sorted(
        glob.glob(os.path.join(results_dir, "**", "*.json"), recursive=True)
    ):
        try:
            with open(path) as f:
                out.append(json.load(f))
        except (json.JSONDecodeError, OSError) as e:
            errors.append((path, str(e)))
    return out, errors


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--results-dir", required=True)
    ap.add_argument("--out-dir", required=True)
    ap.add_argument("--target", default="")
    ap.add_argument("--trigger", default="manual")
    ap.add_argument(
        "--impact-file",
        default="",
        help="path to JSON file with the per-version×OS impact map "
        "(build-matrix.py `impact=` output). Optional; board omits %% if absent.",
    )
    args = ap.parse_args()

    impact = {}
    if args.impact_file and os.path.exists(args.impact_file):
        try:
            with open(args.impact_file) as f:
                impact = json.load(f) or {}
        except (json.JSONDecodeError, OSError) as e:
            print(f"::warning::could not read impact file {args.impact_file}: {e}")

    results, load_errors = _load_results(args.results_dir)
    os.makedirs(args.out_dir, exist_ok=True)
    for path, msg in load_errors:
        print(f"::warning::unreadable result file {path}: {msg}")

    if not results:
        # No cell produced a result (e.g. every runner died before writing one).
        # We cannot certify the matrix, so block and still emit a visible board.
        note = "No result files found — treating as a blocking failure"
        print(f"::error::{note}")
        board = f"## VSIX Install + Update Matrix\n\n:x: {note}\n"
        for name in ("install-matrix.md", "update-matrix.md", "matrix.md"):
            with open(os.path.join(args.out_dir, name), "w") as f:
                f.write(board)
        with open(os.path.join(args.out_dir, "slack.json"), "w") as f:
            json.dump(
                {
                    "blocks": [
                        {
                            "type": "section",
                            "text": {"type": "mrkdwn", "text": f"*❌ {note}*"},
                        }
                    ]
                },
                f,
                indent=2,
            )
        return 1

    out = build_matrices(results, impact)
    total = len(results)
    passed = sum(1 for r in results if r.get("status") == "pass")
    failed_cells = [r for r in results if r.get("status") == "fail"]
    blocking_failed = sum(
        1 for r in failed_cells if r.get("runtime") in BLOCKING_RUNTIMES
    )
    nonblocking_failed = len(failed_cells) - blocking_failed
    status_line = (
        "❌ **Blocking failure**"
        if out["has_blocking_failure"]
        else ("⚠️ **Non-blocking issues**" if failed_cells else "✅ **All green**")
    )
    # Resolve the title to the actual target VERSION. `--target latest` (the usual
    # workflow_dispatch value) is not a version; show the semver a fresh install
    # really lands on so the title agrees with the per-version numbers in the body.
    resolved = (
        args.target if _is_semver(args.target) else _newest_impact_version(impact)
    )
    if resolved and not _is_semver(args.target):
        title_target = (
            f"{resolved} ({args.target or 'latest'})"  # e.g. "0.61.6 (latest)"
        )
    else:
        title_target = resolved or args.target or "latest"
    # Count line: separate blocking from non-blocking so "N failed" can't be misread
    # as N release-blocking failures when they are informational fork/Insiders ⚠️.
    counts = f"**{passed}/{total}** cells passed"
    if failed_cells:
        counts += (
            f" · {blocking_failed} blocking ❌ · {nonblocking_failed} non-blocking ⚠️"
        )
    header = (
        f"## VSIX Install + Update Matrix — target `{title_target}` ({args.trigger})\n\n"
        f"{status_line} · {counts}\n\n" + LEGEND + "\n\n"
    )
    combined = header + out["install_md"] + "\n" + out["update_md"]
    with open(os.path.join(args.out_dir, "install-matrix.md"), "w") as f:
        f.write(out["install_md"])
    with open(os.path.join(args.out_dir, "update-matrix.md"), "w") as f:
        f.write(out["update_md"])
    with open(os.path.join(args.out_dir, "matrix.md"), "w") as f:
        f.write(combined)
    with open(os.path.join(args.out_dir, "slack.json"), "w") as f:
        json.dump({"blocks": out["slack_blocks"]}, f, indent=2)

    print(combined)
    if out["has_blocking_failure"]:
        print("::error::Blocking-lane cell(s) failed — see matrix above")
        return 1
    if load_errors:
        # A result file existed but was corrupt — we can't confirm that cell, so block.
        print("::error::Some result files were unreadable — cannot certify the matrix")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
