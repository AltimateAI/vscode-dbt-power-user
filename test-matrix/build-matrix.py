#!/usr/bin/env python3
"""Compute the install/update matrix `include` array for GitHub Actions.

Upgrade-from versions are chosen by COVERAGE: the fewest most-installed published
versions whose combined install share (with the target's own share) reaches
TARGET_COVERAGE_PCT of the live running base. Live data comes from App Insights
when APPINSIGHTS_API_KEY is set; otherwise a hardcoded fallback is used (fork PRs
/ telemetry outage) so CI never breaks.

Every chosen upgrade-from version is tested on ALL THREE OSes (linux/macos/
windows), plus a fresh-install cell per OS and an Insiders fresh cell on Linux.

Emits GITHUB_OUTPUT-style lines on stdout:
  matrix=<compact json {"include":[...]}>
  baselines=<csv>
  source=live|fallback
  coverage=<pct or "n/a">
"""
from __future__ import annotations

import importlib.util
import json
import os
import pathlib
import sys

# Coverage goal: pick enough upgrade-from versions to test this % of the base.
TARGET_COVERAGE_PCT = 90.0
# Hard cap so a pathological distribution can't explode CI (3 OSes per baseline).
MAX_BASELINES = 10

# Fallback when telemetry is unavailable (fork PRs / unset secret / query error).
# Snapshot of the 2026-05-30 live distribution reaching ~90% coverage; refresh
# occasionally by running `active-versions.py` with the secret.
FALLBACK_TARGET = "0.61.5"
FALLBACK_BASELINES = ["0.60.7", "0.61.0", "0.61.1", "0.61.2", "0.61.3", "0.61.4"]

OSES = [
    ("ubuntu-latest", "linux", "linux-x64"),
    ("macos-latest", "macos", "darwin-arm64"),
    ("windows-latest", "windows", "win32-x64"),
]

# Reuse the tested query/selection logic from active-versions.py (hyphenated
# filename -> load via importlib, same as the unit tests do).
_HERE = pathlib.Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location(
    "active_versions", _HERE / "active-versions.py"
)
av = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(av)


def live_plan(window_days: int = 30):
    """Return (target, baselines, coverage_pct, impact) chosen DYNAMICALLY from
    live App Insights — via the REST API when APPINSIGHTS_API_KEY is set (CI) or
    the az CLI when logged in (local). Returns None if no backend / query fails /
    empty. `impact` is the per-version×OS install-share map (or {} if the impact
    query is unavailable — version selection still succeeds without it)."""
    app_id = os.environ.get("APPINSIGHTS_APP_ID", av.DEFAULT_APP_ID)
    try:
        rows = av.query_rows(app_id, window_days)
    except Exception as e:  # noqa: BLE001 - any failure => fall back, never crash CI
        print(
            f"::warning::App Insights query failed ({e}); using fallback",
            file=sys.stderr,
        )
        return None
    if not rows:
        return None
    dist = av.dist_from_rows(rows)
    total = sum(n for (_v, n, _s) in dist) or 1
    published = av.published_versions()
    target = av.pick_target(dist, published)
    baselines = av.pick_by_coverage(
        dist, target, TARGET_COVERAGE_PCT, published, MAX_BASELINES
    )
    if not target or not baselines:
        return None
    covered = sum(n for (v, n, _s) in dist if v == target or v in set(baselines))
    # Per-version×OS impact share (best-effort; board degrades to no-% if empty).
    try:
        rows_by_os = av.query_rows_by_os(app_id, window_days)
        impact = av.impact_by_version_os(rows_by_os) if rows_by_os else {}
    except Exception as e:  # noqa: BLE001 - impact is optional, never block the plan
        print(
            f"::warning::impact query failed ({e}); board will omit %", file=sys.stderr
        )
        impact = {}
    return target, baselines, round(100 * covered / total, 1), impact


def _cell(os_name, osl, target, vscode, mode, frm):
    # "from" is a Python keyword, so build the dict explicitly.
    return {
        "os": os_name,
        "osl": osl,
        "target": target,
        "vscode": vscode,
        "mode": mode,
        "from": frm,
    }


def build_include(baselines: list[str]) -> list[dict]:
    """Construct the matrix include list.

    - For EACH OS (linux/macos/windows): one stock-VSCode fresh cell + one
      stock-VSCode upgrade cell per chosen upgrade-from version.
    - Plus one Insiders fresh cell on Linux (non-blocking early-warning).
    """
    inc: list[dict] = []
    for os_name, osl, tgt in OSES:
        inc.append(_cell(os_name, osl, tgt, "stable", "fresh", ""))
        for b in baselines:
            inc.append(_cell(os_name, osl, tgt, "stable", "upgrade", b))
    inc.append(_cell("ubuntu-latest", "linux", "linux-x64", "insiders", "fresh", ""))
    return inc


def main() -> int:
    plan = live_plan()
    if plan:
        target, baselines, coverage, impact = plan
        source, coverage_s = "live", str(coverage)
    else:
        target, baselines, impact = FALLBACK_TARGET, FALLBACK_BASELINES, {}
        source, coverage_s = "fallback", "n/a"

    include = build_include(baselines)
    print("matrix=" + json.dumps({"include": include}, separators=(",", ":")))
    print("baselines=" + ",".join(baselines))
    print("source=" + source)
    print("coverage=" + coverage_s)
    # Per-version×OS install-share map for the board's "% users impacted" column.
    # Empty {} on fallback / impact-query failure — the board then omits the %.
    print("impact=" + json.dumps(impact, separators=(",", ":")))
    print(
        f"target={target} source={source} coverage={coverage_s}% "
        f"baselines={baselines} cells={len(include)} impact_versions={len(impact)}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
