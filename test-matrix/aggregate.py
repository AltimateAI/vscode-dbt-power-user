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
import sys

# Only these runtimes can fail a release. Everything else is informational.
BLOCKING_RUNTIMES = {"vscode"}

# Stable display order; runtimes not listed are appended alphabetically.
RUNTIME_ORDER = ["vscode", "vscode-insiders", "cursor", "windsurf", "kiro", "code-server"]
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


def build_matrices(results: list[dict]) -> dict:
    install = [r for r in results if r.get("scenario") == "fresh"]
    upgrade = [r for r in results if r.get("scenario") == "upgrade"]

    has_blocking_failure = any(
        r.get("status") == "fail" and r.get("runtime") in BLOCKING_RUNTIMES
        for r in results
    )

    install_md = _render_install(install)
    update_md = _render_update(upgrade)
    slack_blocks = _render_slack(results, has_blocking_failure)

    return {
        "install_md": install_md,
        "update_md": update_md,
        "slack_blocks": slack_blocks,
        "has_blocking_failure": has_blocking_failure,
    }


def _render_install(cells: list[dict]) -> str:
    runtimes = sorted({c["runtime"] for c in cells}, key=_runtime_sort_key)
    oses = sorted({c["os"] for c in cells}, key=_os_sort_key)
    by = {(c["runtime"], c["os"]): c for c in cells}

    lines = ["### Install matrix (fresh install of target)", ""]
    lines.append("| Runtime | " + " | ".join(oses) + " |")
    lines.append("|---|" + "---|" * len(oses))
    for rt in runtimes:
        row = [rt]
        for os_name in oses:
            cell = by.get((rt, os_name))
            row.append(_cell_symbol(cell) if cell else "—")
        lines.append("| " + " | ".join(row) + " |")
    lines.append("")
    return "\n".join(lines)


def _render_update(cells: list[dict]) -> str:
    lines = ["### Update matrix (upgrade baseline → target)", ""]
    if not cells:
        lines.append("_no upgrade cells in this run_")
        lines.append("")
        return "\n".join(lines)
    # Row = (runtime, os) so OS-specific upgrade cells (e.g. linux vs windows
    # both upgrading from 0.61.4) don't collide into one row.
    rows = sorted(
        {(c["runtime"], c["os"]) for c in cells},
        key=lambda k: (_runtime_sort_key(k[0]), _os_sort_key(k[1])),
    )
    baselines = sorted({c.get("from") for c in cells if c.get("from")})
    by = {(c["runtime"], c["os"], c.get("from")): c for c in cells}

    lines.append("| Runtime / OS | " + " | ".join(f"from {b}" for b in baselines) + " |")
    lines.append("|---|" + "---|" * len(baselines))
    for rt, os_name in rows:
        row = [f"{rt} ({os_name})"]
        for b in baselines:
            cell = by.get((rt, os_name, b))
            row.append(_cell_symbol(cell) if cell else "—")
        lines.append("| " + " | ".join(row) + " |")
    lines.append("")
    return "\n".join(lines)


def _render_slack(results: list[dict], has_blocking_failure: bool) -> list[dict]:
    total = len(results)
    passed = sum(1 for r in results if r.get("status") == "pass")
    failed = [r for r in results if r.get("status") == "fail"]
    skipped = [r for r in results if r.get("status") == "skip"]
    headline = "❌ Install/Update matrix: BLOCKING failure" if has_blocking_failure else (
        "⚠️ Install/Update matrix: non-blocking issues" if failed else "✅ Install/Update matrix: all green"
    )
    detail = f"{passed}/{total} cells passed"
    if failed:
        detail += "\nFailures:\n" + "\n".join(
            f"• {r.get('runtime','?')}/{r.get('os','?')}/{r.get('scenario','?')}"
            + (f" (from {r['from']})" if r.get("from") else "")
            + f": {r.get('reason') or 'failed'}"
            for r in failed
        )
    if skipped:
        detail += "\nSkipped:\n" + "\n".join(
            f"• {r.get('runtime','?')}/{r.get('os','?')}: {r.get('reason') or 'skipped'}" for r in skipped
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
    for path in sorted(glob.glob(os.path.join(results_dir, "**", "*.json"), recursive=True)):
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
    args = ap.parse_args()

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
                {"blocks": [{"type": "section", "text": {"type": "mrkdwn", "text": f"*❌ {note}*"}}]},
                f, indent=2,
            )
        return 1

    out = build_matrices(results)
    header = f"## VSIX Install + Update Matrix — target `{args.target or 'latest'}` ({args.trigger})\n\n"
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
