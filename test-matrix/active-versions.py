#!/usr/bin/env python3
"""Query the extension's Azure Application Insights for the live version
distribution (which versions are still running, by distinct install) and pick a
data-driven set of upgrade-from baselines for the test matrix.

Backends (auto-detected):
  - REST API : set APPINSIGHTS_APP_ID + APPINSIGHTS_API_KEY   (CI-friendly)
  - az CLI   : falls back to `az monitor app-insights query`  (local, AAD login)

Writes <out> JSON:
  { "generated_at", "app_id", "window_days", "target",
    "baselines": [...], "distribution": [ {"version","installs","share"} ... ] }

NOTE: the output contains per-version install counts (business metrics). Do NOT
commit it to a public repo — it is .gitignored. CI regenerates it from the
secret, or the workflow falls back to a hardcoded baseline list.

Usage:
  python3 test-matrix/active-versions.py --out test-matrix/active-versions.json
"""
from __future__ import annotations

import argparse
import datetime
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request

DEFAULT_APP_ID = "429da6f5-e7b0-40e6-a602-adaa8dcde8b9"
OPENVSX_API = "https://open-vsx.org/api/innoverio/vscode-dbt-power-user"

# Per-install latest extension version over the window.
KQL = (
    "customEvents "
    "| where isnotempty(tostring(customDimensions['common.vscodemachineid'])) "
    "| extend m=tostring(customDimensions['common.vscodemachineid']), "
    "v=tostring(customDimensions['common.extversion']) "
    "| where isnotempty(v) "
    "| summarize arg_max(timestamp, v) by m "
    "| summarize installs=count() by v "
    "| sort by installs desc "
    "| take 60"
)

# Per-install latest (version, os) over the window — same arg_max-per-machine
# logic, additionally bucketed by common.os ('darwin'/'win32'/'linux'). Powers
# the per-version×OS "% of users impacted" figures on the board. Each install is
# counted once at its most-recent (version, os).
KQL_BY_OS = (
    "customEvents "
    "| where isnotempty(tostring(customDimensions['common.vscodemachineid'])) "
    "| extend m=tostring(customDimensions['common.vscodemachineid']), "
    "v=tostring(customDimensions['common.extversion']), "
    "os=tostring(customDimensions['common.os']) "
    "| where isnotempty(v) and isnotempty(os) "
    "| summarize arg_max(timestamp, v, os) by m "
    "| summarize installs=count() by v, os "
    "| sort by installs desc "
    "| take 200"
)

# common.os value -> the board's OS label (matches build-matrix OSES / aggregate OS_ORDER).
OS_LABEL = {"darwin": "macos", "win32": "windows", "linux": "linux"}

_SEMVER = re.compile(r"^\d+\.\d+\.\d+$")  # plain release versions only (no -pre)


def _rows_from_table(table) -> list[tuple[str, int]]:
    cols = [c["name"] for c in table["columns"]]
    vi, ni = cols.index("v"), cols.index("installs")
    return [(row[vi], int(row[ni])) for row in table["rows"]]


def _query_rest(app_id: str, api_key: str, window_days: int) -> list[tuple[str, int]]:
    url = f"https://api.applicationinsights.io/v1/apps/{app_id}/query?timespan=P{window_days}D"
    req = urllib.request.Request(
        url,
        data=json.dumps({"query": KQL}).encode(),
        headers={"x-api-key": api_key, "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.load(r)
    return _rows_from_table(data["tables"][0])


def _query_az(app_id: str, window_days: int) -> list[tuple[str, int]]:
    out = subprocess.run(
        [
            "az",
            "monitor",
            "app-insights",
            "query",
            "--app",
            app_id,
            "--offset",
            f"{window_days}d",
            "--analytics-query",
            KQL,
            "-o",
            "json",
        ],
        capture_output=True,
        text=True,
        check=True,
    ).stdout
    return _rows_from_table(json.loads(out)["tables"][0])


def query_rows(app_id: str, window_days: int) -> list[tuple[str, int]] | None:
    """Fetch the per-install latest-version rows via whichever backend is
    available: the REST API when APPINSIGHTS_API_KEY is set (CI), else the az CLI
    when logged in (local). Returns None if neither backend is usable."""
    api_key = os.environ.get("APPINSIGHTS_API_KEY")
    if api_key:
        return _query_rest(app_id, api_key, window_days)
    if shutil.which("az"):
        return _query_az(app_id, window_days)
    return None


def _rows_by_os_from_table(table) -> list[tuple[str, str, int]]:
    cols = [c["name"] for c in table["columns"]]
    vi, oi, ni = cols.index("v"), cols.index("os"), cols.index("installs")
    return [(row[vi], row[oi], int(row[ni])) for row in table["rows"]]


def query_rows_by_os(
    app_id: str, window_days: int
) -> list[tuple[str, str, int]] | None:
    """Per-install latest (version, os) rows via REST (APPINSIGHTS_API_KEY) or az
    CLI. Returns None if neither backend is usable, or [] if the query yields
    nothing (so callers can degrade to version-only impact gracefully)."""
    api_key = os.environ.get("APPINSIGHTS_API_KEY")
    try:
        if api_key:
            url = f"https://api.applicationinsights.io/v1/apps/{app_id}/query?timespan=P{window_days}D"
            req = urllib.request.Request(
                url,
                data=json.dumps({"query": KQL_BY_OS}).encode(),
                headers={"x-api-key": api_key, "Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=60) as r:
                data = json.load(r)
            return _rows_by_os_from_table(data["tables"][0])
        if shutil.which("az"):
            out = subprocess.run(
                [
                    "az",
                    "monitor",
                    "app-insights",
                    "query",
                    "--app",
                    app_id,
                    "--offset",
                    f"{window_days}d",
                    "--analytics-query",
                    KQL_BY_OS,
                    "-o",
                    "json",
                ],
                capture_output=True,
                text=True,
                check=True,
            ).stdout
            return _rows_by_os_from_table(json.loads(out)["tables"][0])
    except Exception as e:  # noqa: BLE001 - impact data is optional; never crash CI
        print(f"::warning::version×OS impact query failed ({e})", file=sys.stderr)
        return None
    return None


def impact_by_version_os(rows_by_os: list[tuple[str, str, int]]) -> dict:
    """Collapse (version, os) rows into a nested share map over the FULL running
    base (every install counts in the denominator, so shares are honest):

        { "<version>": {
              "total_installs": int, "total_share": float,    # all OSes
              "os": { "<board-os-label>": {"installs": int, "share": float} } } }

    'share' is percent of all installs (version-total and version×OS). os labels
    use the board's macos/windows/linux naming."""
    total = sum(n for (_v, _o, n) in rows_by_os) or 1
    vmap: dict[str, dict] = {}
    for v, raw_os, n in rows_by_os:
        if not _SEMVER.match(v):
            continue  # junk/fork version strings can't be a tested baseline
        os_label = OS_LABEL.get(raw_os, raw_os)
        e = vmap.setdefault(v, {"total_installs": 0, "os": {}})
        e["total_installs"] += n
        oe = e["os"].setdefault(os_label, {"installs": 0})
        oe["installs"] += n
    for v, e in vmap.items():
        e["total_share"] = round(100 * e["total_installs"] / total, 2)
        for oe in e["os"].values():
            oe["share"] = round(100 * oe["installs"] / total, 2)
    return vmap


def dist_from_rows(rows: list[tuple[str, int]]) -> list[tuple[str, int, float]]:
    """Collapse duplicate version rows (App Insights sharding) and attach share %.
    Returns (version, installs, share) sorted by installs descending."""
    merged: dict[str, int] = {}
    for v, n in rows:
        merged[v] = merged.get(v, 0) + n
    total = sum(merged.values()) or 1
    return [
        (v, n, round(100 * n / total, 2))
        for v, n in sorted(merged.items(), key=lambda x: x[1], reverse=True)
    ]


def published_versions() -> set[str]:
    """Real installable releases from Open VSX. This is the authoritative list of
    published versions (verified complete, ~100+ entries) and correctly excludes
    junk/fork version strings (e.g. 1.2.16, 0.34.2003) that appear in telemetry."""
    try:
        with urllib.request.urlopen(OPENVSX_API, timeout=30) as r:
            data = json.load(r)
        return {v for v in data.get("allVersions", {}) if _SEMVER.match(v)}
    except Exception as e:  # noqa: BLE001 - network optional; degrade gracefully
        print(
            f"::warning::could not fetch Open VSX versions ({e}); skipping publish filter",
            file=sys.stderr,
        )
        return set()


def _semver_key(v: str) -> tuple[int, int, int]:
    a, b, c = v.split(".")
    return (int(a), int(b), int(c))


def pick_target(dist, published) -> str:
    """The version we upgrade TO: the highest published semver still seen running."""
    cand = [
        v
        for (v, _n, _s) in dist
        if _SEMVER.match(v) and (not published or v in published)
    ]
    return max(cand, key=_semver_key, default="")


def pick_baselines(
    dist, target, min_share, max_baselines, include_oldest_above, published
):
    """dist: list of (version, installs, share). Returns a semver-sorted baseline list:
    the most-run older *published* versions (common upgrade paths) plus the oldest
    version still meaningfully present (big-gap upgrade coverage)."""
    eligible = [
        (v, n, s)
        for (v, n, s) in dist
        if v != target and _SEMVER.match(v) and (not published or v in published)
    ]
    popular = [
        v
        for (v, n, s) in sorted(eligible, key=lambda x: x[1], reverse=True)
        if s >= min_share
    ][: max(0, max_baselines - 1)]
    oldish = sorted(
        [v for (v, n, s) in eligible if s >= include_oldest_above], key=_semver_key
    )
    chosen = set(popular)
    if oldish:
        chosen.add(oldish[0])
    return sorted(chosen, key=_semver_key)[:max_baselines]


def pick_by_coverage(dist, target, coverage_pct, published, max_baselines):
    """Pick the fewest published upgrade-from versions (most-installed first) whose
    install share — together with the target's own share — reaches coverage_pct of
    the total running base. Returns a semver-sorted baseline list (excludes target).

    Junk/unpublished version strings are skipped (they can't be installed as a
    baseline), but their installs still count in the denominator so coverage is
    honest about what fraction of the REAL running base we test."""
    total = sum(n for (_v, n, _s) in dist) or 1
    target_installs = sum(n for (v, n, _s) in dist if v == target)
    eligible = sorted(
        [
            (v, n)
            for (v, n, _s) in dist
            if v != target and _SEMVER.match(v) and (not published or v in published)
        ],
        key=lambda x: x[1],
        reverse=True,
    )
    chosen: list[str] = []
    covered = target_installs
    for v, n in eligible:
        if 100.0 * covered / total >= coverage_pct or len(chosen) >= max_baselines:
            break
        chosen.append(v)
        covered += n
    return sorted(chosen, key=_semver_key)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--app-id", default=os.environ.get("APPINSIGHTS_APP_ID", DEFAULT_APP_ID)
    )
    ap.add_argument("--window-days", type=int, default=30)
    ap.add_argument(
        "--min-share",
        type=float,
        default=1.0,
        help="min %% share for a popular baseline",
    )
    ap.add_argument(
        "--include-oldest-above",
        type=float,
        default=0.5,
        help="also include the oldest version whose share is >= this %%",
    )
    ap.add_argument("--max-baselines", type=int, default=6)
    ap.add_argument(
        "--target",
        default="",
        help="version we upgrade TO; default = highest published semver seen",
    )
    ap.add_argument("--out", default="test-matrix/active-versions.json")
    ap.add_argument(
        "--generated-at", default="", help="ISO timestamp to stamp; default = now (UTC)"
    )
    args = ap.parse_args()

    rows = query_rows(args.app_id, args.window_days)
    if rows is None:
        print(
            "::error::no APPINSIGHTS_API_KEY and az CLI not available", file=sys.stderr
        )
        return 2

    dist = dist_from_rows(rows)
    total = sum(n for _v, n, _s in dist) or 1
    published = published_versions()
    target = args.target or pick_target(dist, published)
    baselines = pick_baselines(
        dist,
        target,
        args.min_share,
        args.max_baselines,
        args.include_oldest_above,
        published,
    )

    stamp = args.generated_at or datetime.datetime.now(datetime.timezone.utc).isoformat(
        timespec="seconds"
    )
    payload = {
        "generated_at": stamp,
        "app_id": args.app_id,
        "window_days": args.window_days,
        "target": target,
        "baselines": baselines,
        "distribution": [{"version": v, "installs": n, "share": s} for v, n, s in dist],
    }
    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w") as f:
        json.dump(payload, f, indent=2)
        f.write("\n")
    print(
        f"target={target}  baselines={baselines}  ({len(dist)} versions, {total} installs)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
