"""Generate a bundle size report comparing current build against master baseline.

Reads bundle-baseline.json (current build) and optionally master-baseline.json
(cached master baseline). Outputs:
  - bundle-report.md: collapsible markdown report for PR comments
  - GITHUB_OUTPUT: status_desc for the commit status API

Expects VSCE_TARGET env var to label the platform.
"""

import json
import os
import sys


def format_size(bytes_val):
    if bytes_val >= 100 * 1024:
        return f"{bytes_val / 1024 / 1024:.1f} MB"
    return f"{bytes_val / 1024:.0f} KB"


def main():
    target = os.environ.get("VSCE_TARGET", "unknown")
    current = json.load(open("bundle-baseline.json"))
    vsix_mb = current["vsix_mb"]
    categories = current["categories"]

    # Try to load master baseline for comparison
    baseline_mb = None
    baseline_cats = None
    if os.path.exists("master-baseline.json"):
        try:
            master = json.load(open("master-baseline.json"))
            baseline_mb = master["vsix_mb"]
            baseline_cats = master.get("categories", {})
        except Exception:
            pass

    # Build delta string for commit status
    if baseline_mb is not None:
        delta = vsix_mb - baseline_mb
        sign = "+" if delta >= 0 else ""
        delta_str = f" ({sign}{delta:.1f} MB vs master)"
    else:
        delta_str = ""

    status_desc = f"VSIX: {vsix_mb:.1f} MB{delta_str}"

    # Build summary line for collapsible header
    if baseline_mb is not None:
        delta = vsix_mb - baseline_mb
        sign = "+" if delta >= 0 else ""
        icon = "\U0001f534" if delta > 1 else "\U0001f7e2" if delta < -1 else "\u26aa"
        summary = f"{target}: {vsix_mb:.1f} MB \u00b7 {icon} {sign}{delta:.1f} MB vs master"
    else:
        summary = f"{target}: {vsix_mb:.1f} MB"

    total_raw = sum(v["raw"] for v in categories.values())
    total_compressed = sum(v["compressed"] for v in categories.values())
    total_files = sum(v["count"] for v in categories.values())

    # Build collapsible markdown report
    lines = [
        "<details>",
        f"<summary><strong>{summary}</strong></summary>",
        "",
        "| Category | Size | Compressed | Files |",
        "|---|---:|---:|---:|",
    ]

    sorted_cats = sorted(categories.items(), key=lambda x: x[1]["raw"], reverse=True)
    for cat, v in sorted_cats:
        raw = v["raw"]
        if raw < 1024:
            continue
        raw_s = format_size(raw)
        comp_s = format_size(v["compressed"])
        delta_s = ""
        if baseline_cats and cat in baseline_cats:
            d = (raw - baseline_cats[cat]["raw"]) / 1024 / 1024
            if abs(d) >= 0.1:
                s = "+" if d >= 0 else ""
                delta_s = f" ({s}{d:.1f})"
        lines.append(f"| {cat} | {raw_s}{delta_s} | {comp_s} | {v['count']} |")

    lines.append(
        f"| **Total** | **{total_raw / 1024 / 1024:.1f} MB** "
        f"| **{total_compressed / 1024 / 1024:.1f} MB** | **{total_files}** |"
    )
    lines.extend(["", "</details>"])

    report = "\n".join(lines)
    with open("bundle-report.md", "w") as f:
        f.write(report)

    gh_output = os.environ.get("GITHUB_OUTPUT")
    if gh_output:
        with open(gh_output, "a") as f:
            f.write(f"status_desc={status_desc}\n")

    print(report)


if __name__ == "__main__":
    main()
