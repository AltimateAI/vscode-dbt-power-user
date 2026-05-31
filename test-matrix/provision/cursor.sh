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

# 3. Extract into squashfs-root/.
#    Primary: --appimage-extract (no FUSE; works on native x86 CI runners).
#    Fallback: when the x86_64 self-extract runtime can't execute (Docker Desktop
#    QEMU emulation on Apple Silicon → exit 126), read the squashfs offset from
#    the ELF header and unsquashfs it directly — no execution of the AppImage
#    runtime required. Identical bytes either way.
extracted="$OUT_DIR/squashfs-root"
if ! ( cd "$OUT_DIR" && "$appimage" --appimage-extract >/dev/null 2>&1 ) || [ ! -d "$extracted" ]; then
  echo "==> --appimage-extract unavailable (likely emulation); extracting via unsquashfs" >&2
  command -v readelf   >/dev/null || { echo "FAIL: readelf (binutils) required for fallback extract" >&2; exit 1; }
  command -v unsquashfs >/dev/null || { echo "FAIL: unsquashfs (squashfs-tools) required for fallback extract" >&2; exit 1; }
  # AppImage type-2 = ELF runtime followed by an appended squashfs. The squashfs
  # begins right after the section-header table: offset = e_shoff + e_shentsize*e_shnum.
  offset="$(readelf -h "$appimage" | awk '
    /Start of section headers:/ {s=$5}
    /Size of section headers:/  {ss=$5}
    /Number of section headers:/{n=$5}
    END {print s + ss*n}')"
  if ! [ "${offset:-0}" -gt 0 ] 2>/dev/null; then
    echo "FAIL: could not compute AppImage squashfs offset" >&2; exit 1
  fi
  rm -rf "$extracted"
  unsquashfs -f -d "$extracted" -o "$offset" "$appimage" >/dev/null 2>&1 \
    || { echo "FAIL: unsquashfs extraction failed at offset $offset" >&2; exit 1; }
fi
bin="$extracted/AppRun"
if [ ! -x "$bin" ]; then
  echo "FAIL: extracted Cursor AppRun not found/executable at $bin" >&2
  ls -la "$extracted" 2>/dev/null | head >&2 || true
  exit 1
fi

echo "CURSOR_BIN=$bin"
echo "CURSOR_VERSION=$ver"
