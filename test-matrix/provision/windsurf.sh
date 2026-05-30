#!/usr/bin/env bash
# Provision Windsurf (the Codeium VSCode fork) on a Linux CI runner for headless
# extension testing. Downloads the pinned tarball via Windsurf's scriptable update
# manifest API, verifies its sha256, extracts it, and prints the launchable binary.
#
# Output (last two lines, eval-able):
#   WINDSURF_BIN=<path to Windsurf/windsurf launcher>
#   WINDSURF_VERSION=<x.y.z>
#
# Usage:
#   bash test-matrix/provision/windsurf.sh [--out-dir <dir>]
set -euo pipefail

OUT_DIR="${1:-}"
if [ "$OUT_DIR" = "--out-dir" ]; then OUT_DIR="${2:-}"; fi
OUT_DIR="${OUT_DIR:-$(mktemp -d)}"
mkdir -p "$OUT_DIR"

API="https://windsurf-stable.codeium.com/api/update/linux-x64/stable/latest"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# 1. Resolve the pinned tarball URL + version + sha256 from the manifest API.
meta="$(curl -fsSL -A "$UA" "$API")"
url="$(printf '%s' "$meta" | python3 -c 'import sys,json;print(json.load(sys.stdin)["url"])')"
ver="$(printf '%s' "$meta" | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("windsurfVersion") or d.get("version",""))')"
sha="$(printf '%s' "$meta" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("sha256hash",""))')"
if [ -z "$url" ]; then
  echo "FAIL: could not resolve Windsurf url from $API" >&2
  exit 1
fi
echo "==> Windsurf $ver  $url" >&2

# 2. Download the tarball (retry; third-party CDN can be flaky).
tarball="$OUT_DIR/windsurf.tar.gz"
curl -fSL --retry 3 --retry-delay 5 -A "$UA" -o "$tarball" "$url"

# 3. Verify sha256 (manifest provides it; the URL is on a third-party CDN).
if [ -n "$sha" ]; then
  actual="$(sha256sum "$tarball" | cut -d' ' -f1)"
  if [ "$actual" != "$sha" ]; then
    echo "FAIL: sha256 mismatch (expected $sha, got $actual)" >&2
    exit 1
  fi
fi

# 4. Extract. Tarball top dir is "Windsurf/"; launcher is Windsurf/windsurf.
tar -xzf "$tarball" -C "$OUT_DIR"
bin="$OUT_DIR/Windsurf/windsurf"
if [ ! -x "$bin" ]; then
  echo "FAIL: extracted Windsurf launcher not found/executable at $bin" >&2
  ls -la "$OUT_DIR/Windsurf" 2>/dev/null | head >&2 || true
  exit 1
fi

echo "WINDSURF_BIN=$bin"
echo "WINDSURF_VERSION=$ver"
