"""Analyze a VSIX file and output size data as JSON.

Reads the first .vsix file in the current directory, categorizes its
contents, and writes bundle-baseline.json with the results. Also sets
the vsix_size GitHub Actions output variable.
"""

import json
import os
import sys
import zipfile

CATEGORIES = [
    (lambda n: "altimate-core" in n and n.endswith(".node"), "Native: altimate-core"),
    (lambda n: "zeromq/" in n and n.endswith(".node"), "Native: zeromq"),
    (lambda n: "dist/node_modules/" in n, "Native: other node_modules"),
    (lambda n: n.endswith("extension.js") and "dist/" in n, "Extension backend (JS)"),
    (lambda n: "webview_panels/dist/" in n and n.endswith(".js"), "Webview JS bundles"),
    (lambda n: "webview_panels/dist/" in n and n.endswith(".css"), "Webview CSS"),
    (
        lambda n: "webview_panels/dist/" in n
        and (n.endswith(".gif") or n.endswith(".png")),
        "Webview images",
    ),
    (lambda n: "webview_panels/dist/" in n, "Webview other"),
    (
        lambda n: "altimate_python_packages/" in n
        or (n.endswith(".py") and "dist/" in n),
        "Python packages",
    ),
    (lambda n: "media/" in n, "Media assets"),
]


def categorize(filename):
    for predicate, category in CATEGORIES:
        if predicate(filename):
            return category
    return "Other"


def main():
    vsix_files = [f for f in os.listdir(".") if f.endswith(".vsix")]
    if not vsix_files:
        print("No .vsix file found", file=sys.stderr)
        sys.exit(1)

    vsix = vsix_files[0]
    z = zipfile.ZipFile(vsix)
    vsix_mb = os.path.getsize(vsix) / 1024 / 1024

    categories = {}
    for info in z.infolist():
        cat = categorize(info.filename)
        if cat not in categories:
            categories[cat] = {"raw": 0, "compressed": 0, "count": 0}
        categories[cat]["raw"] += info.file_size
        categories[cat]["compressed"] += info.compress_size
        categories[cat]["count"] += 1

    baseline = {"vsix_mb": round(vsix_mb, 1), "categories": categories}
    with open("bundle-baseline.json", "w") as f:
        json.dump(baseline, f)

    gh_output = os.environ.get("GITHUB_OUTPUT")
    if gh_output:
        with open(gh_output, "a") as f:
            f.write(f"vsix_size={vsix_mb:.1f}\n")

    print(f"VSIX size: {vsix_mb:.1f} MB")


if __name__ == "__main__":
    main()
