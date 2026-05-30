#!/usr/bin/env bash
# Provision Cursor (the Anysphere VSCode fork) on a Linux CI runner for headless
# extension testing. Downloads the pinned AppImage via Cursor's scriptable JSON
# API, extracts it (no FUSE on runners), and prints the launchable binary path.
#
# Output (last two lines, eval-able):
#   CURSOR_BIN=<path to squashfs-root/AppRun>
#   CURSOR_VERSION=<x.y.z>
#
# Usage:
#   bash test-matrix/provision/cursor.sh [--out-dir <dir>]
set -euo pipefail

OUT_DIR="${1:-}"
if [ "$OUT_DIR" = "--out-dir" ]; then OUT_DIR="${2:-}"; fi
OUT_DIR="${OUT_DIR:-$(mktemp -d)}"
mkdir -p "$OUT_DIR"

API="https://www.cursor.com/api/download?platform=linux-x64&releaseTrack=stable"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# 1. Resolve the pinned AppImage URL + version from the JSON API.
meta="$(curl -fsSL -A "$UA" "$API")"
url="$(printf '%s' "$meta" | python3 -c 'import sys,json;print(json.load(sys.stdin)["downloadUrl"])')"
ver="$(printf '%s' "$meta" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("version",""))')"
if [ -z "$url" ]; then
  echo "FAIL: could not resolve Cursor downloadUrl from $API" >&2
  exit 1
fi
echo "==> Cursor $ver  $url" >&2

# 2. Download the AppImage (retry; CDN can be flaky).
appimage="$OUT_DIR/cursor.AppImage"
curl -fSL --retry 3 --retry-delay 5 -A "$UA" -o "$appimage" "$url"
chmod +x "$appimage"

# 3. Extract without FUSE (runners have no FUSE). Produces squashfs-root/.
( cd "$OUT_DIR" && "$appimage" --appimage-extract >/dev/null 2>&1 )
bin="$OUT_DIR/squashfs-root/AppRun"
if [ ! -x "$bin" ]; then
  echo "FAIL: extracted Cursor AppRun not found/executable at $bin" >&2
  ls -la "$OUT_DIR/squashfs-root" 2>/dev/null | head >&2 || true
  exit 1
fi

echo "CURSOR_BIN=$bin"
echo "CURSOR_VERSION=$ver"
