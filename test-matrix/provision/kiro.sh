#!/usr/bin/env bash
# Provision Kiro (the AWS agentic VSCode fork) on a Linux CI runner for headless
# extension testing. Downloads the pinned tarball via Kiro's public metadata JSON
# endpoint, extracts it, and prints the launchable binary path.
#
# Output (last two lines, eval-able):
#   KIRO_BIN=<path to Kiro/kiro launcher>
#   KIRO_VERSION=<x.y.z>
#
# Usage:
#   bash test-matrix/provision/kiro.sh [--out-dir <dir>]
set -euo pipefail

OUT_DIR="${1:-}"
if [ "$OUT_DIR" = "--out-dir" ]; then OUT_DIR="${2:-}"; fi
OUT_DIR="${OUT_DIR:-$(mktemp -d)}"
mkdir -p "$OUT_DIR"

API="https://prod.download.desktop.kiro.dev/stable/metadata-linux-x64-stable.json"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# 1. Resolve the release whose URL is the actual .tar.gz. NOTE: the metadata
# lists multiple entries per version (certificate.pem, the tar.gz, signature.bin) —
# pick the .tar.gz, not just the highest version (else you download the cert).
meta="$(curl -fsSL -A "$UA" "$API")"
read -r url ver < <(printf '%s' "$meta" | python3 -c '
import sys, json
d = json.load(sys.stdin)
cur = d.get("currentRelease", "")
cands = [r["updateTo"] for r in d.get("releases", [])
         if str(r["updateTo"].get("url", "")).endswith(".tar.gz")]
if not cands:
    print("", ""); sys.exit()
# prefer the entry matching currentRelease, else the first tar.gz
best = next((u for u in cands if cur and cur in u.get("url", "")), cands[0])
ver = best.get("name", "")
# derive a clean version (e.g. 0.12.263) from the url path if name is the full label
import re
m = re.search(r"/signed/([0-9]+\.[0-9]+\.[0-9]+)/", best["url"])
print(best["url"], (m.group(1) if m else ver))
')
if [ -z "$url" ]; then
  echo "FAIL: could not resolve Kiro tarball url from $API" >&2
  exit 1
fi
echo "==> Kiro $ver  $url" >&2

# 2. Download the tarball (retry; CDN can be flaky).
tarball="$OUT_DIR/kiro.tar.gz"
curl -fSL --retry 3 --retry-delay 5 -A "$UA" -o "$tarball" "$url"

# 3. Extract, then DISCOVER the launcher rather than hardcoding "$OUT_DIR/Kiro/kiro"
# — the same fragility that broke the Windsurf lane when it was repackaged as Devin.
# Find the product's top-level ELF launcher (the GUI binary cursor-cell.mjs spawns),
# skipping the Chromium helper executables; fall back to the bin/ CLI launcher
# (VSCode-fork convention) if no top-level ELF is present.
tar -xzf "$tarball" -C "$OUT_DIR"
top="$(find "$OUT_DIR" -mindepth 1 -maxdepth 1 -type d | head -1)"
if [ -z "$top" ]; then
  echo "FAIL: Kiro tarball extracted no top-level directory into $OUT_DIR" >&2
  ls -la "$OUT_DIR" >&2 || true
  exit 1
fi
bin=""
for cand in "$top"/*; do
  [ -f "$cand" ] && [ -x "$cand" ] || continue
  case "$(basename "$cand")" in
    chrome-sandbox|chrome_crashpad_handler) continue ;;
  esac
  if file -b "$cand" | grep -q "executable"; then bin="$cand"; break; fi
done
if [ -z "$bin" ]; then
  bin="$(find "$top/bin" -maxdepth 1 -type f -perm -u+x 2>/dev/null | head -1)"
fi
if [ -z "$bin" ] || [ ! -x "$bin" ]; then
  echo "FAIL: could not locate the Kiro launcher under $top" >&2
  ls -la "$top" "$top/bin" 2>/dev/null >&2 || true
  exit 1
fi

echo "KIRO_BIN=$bin"
echo "KIRO_VERSION=$ver"
