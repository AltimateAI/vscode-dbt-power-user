#!/usr/bin/env python3
"""Compute the install/update matrix `include` array for GitHub Actions.

Upgrade baselines come from the LIVE App Insights version distribution when
APPINSIGHTS_API_KEY is set (a CI secret); otherwise a hardcoded fallback is used
(e.g. fork PRs with no secret access, or a telemetry outage). Emits
GITHUB_OUTPUT-style lines on stdout:

  matrix=<compact json {"include":[...]}>
  baselines=<csv>
  source=live|fallback

so a workflow step can do:  python3 test-matrix/build-matrix.py >> "$GITHUB_OUTPUT"
"""
from __future__ import annotations

import importlib.util
import json
import os
import pathlib
import sys

# Fallback when telemetry is unavailable (fork PRs / unset secret / query error).
# Snapshot of the 2026-05-30 live distribution; refresh occasionally.
FALLBACK_BASELINES = ["0.55.5", "0.60.7", "0.61.0", "0.61.2", "0.61.3", "0.61.4"]
MAX_LINUX_BASELINES = 6  # cap CI breadth on the full-upgrade Linux lane

# Reuse the tested query/selection logic from active-versions.py (hyphenated
# filename -> load via importlib, same as the unit tests do).
_HERE = pathlib.Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("active_versions", _HERE / "active-versions.py")
av = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(av)


def live_baselines(window_days: int = 30):
    """Return data-driven baselines from App Insights, or None if unavailable."""
    api_key = os.environ.get("APPINSIGHTS_API_KEY")
    if not api_key:
        return None
    app_id = os.environ.get("APPINSIGHTS_APP_ID", av.DEFAULT_APP_ID)
    try:
        rows = av._query_rest(app_id, api_key, window_days)
    except Exception as e:  # noqa: BLE001 - any failure => fall back, never crash CI
        print(f"::warning::App Insights query failed ({e}); using fallback baselines", file=sys.stderr)
        return None
    merged: dict[str, int] = {}
    for v, n in rows:
        merged[v] = merged.get(v, 0) + n
    total = sum(merged.values()) or 1
    dist = [(v, n, round(100 * n / total, 2))
            for v, n in sorted(merged.items(), key=lambda x: x[1], reverse=True)]
    published = av.published_versions()
    target = av.pick_target(dist, published)
    chosen = av.pick_baselines(dist, target, 1.0, MAX_LINUX_BASELINES, 0.5, published)
    return chosen or None


def _cell(os_name, osl, target, vscode, mode, frm):
    # "from" is a Python keyword, so build the dict explicitly.
    return {"os": os_name, "osl": osl, "target": target, "vscode": vscode, "mode": mode, "from": frm}


def build_include(baselines: list[str]) -> list[dict]:
    """Construct the matrix include list from the chosen upgrade baselines.

    - Linux (blocking): stock VSCode fresh + an upgrade cell per baseline.
    - macOS + Windows (blocking): fresh + ONE representative upgrade (highest baseline).
    - Insiders (non-blocking): fresh on Linux.
    """
    rep = baselines[-1] if baselines else ""  # highest baseline = most common recent prior
    inc = [_cell("ubuntu-latest", "linux", "linux-x64", "stable", "fresh", "")]
    for b in baselines:
        inc.append(_cell("ubuntu-latest", "linux", "linux-x64", "stable", "upgrade", b))
    inc.append(_cell("macos-latest", "macos", "darwin-arm64", "stable", "fresh", ""))
    if rep:
        inc.append(_cell("macos-latest", "macos", "darwin-arm64", "stable", "upgrade", rep))
    inc.append(_cell("windows-latest", "windows", "win32-x64", "stable", "fresh", ""))
    if rep:
        inc.append(_cell("windows-latest", "windows", "win32-x64", "stable", "upgrade", rep))
    inc.append(_cell("ubuntu-latest", "linux", "linux-x64", "insiders", "fresh", ""))
    return inc


def main() -> int:
    chosen = live_baselines()
    source = "live" if chosen else "fallback"
    baselines = chosen if chosen else FALLBACK_BASELINES
    include = build_include(baselines)
    print("matrix=" + json.dumps({"include": include}, separators=(",", ":")))
    print("baselines=" + ",".join(baselines))
    print("source=" + source)
    print(f"baselines({source}): {baselines}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
