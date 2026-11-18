#!/usr/bin/env bash
# Usage: ovsx-publish.sh <vsix> <target> <version>
#
# Publishes a VSIX to Open VSX with retries, then waits until Open VSX serves
# that version for that target.
#   - Each attempt runs `ovsx publish <vsix> --skip-duplicate` through retry.sh.
#     An upload Open VSX has accepted but not yet activated ("is already
#     published, but currently isn't active") counts as landed: no more attempts.
#   - Then it polls the Open VSX API until it returns 200 with that version, and
#     fails if that hasn't happened by the limit. No request starts after the
#     deadline, each one is cut off at it, and no wait runs past it, so a 200
#     only counts when it came within the limit.
#
# Env: OVSX (publish command, default "npx ovsx"); OVSX_API (default
# https://open-vsx.org/api/innoverio/vscode-dbt-power-user); VISIBLE_POLL_INTERVAL
# and VISIBLE_POLL_LIMIT in seconds (default 30 and 1200); RETRY_DELAYS for retry.sh.
set -u
here=$(cd "$(dirname "$0")" && pwd)

if [ "${1:-}" = "--attempt" ]; then
  vsix=$2 target=$3 version=$4
  read -r -a ovsx <<< "${OVSX:-npx ovsx}"
  log=$(mktemp)
  "${ovsx[@]}" publish "$vsix" --skip-duplicate 2>&1 | tee "$log"
  status=${PIPESTATUS[0]}
  if [ "$status" -ne 0 ] && grep -q "is already published, but currently isn't active" "$log"; then
    echo "::warning::Open VSX has $version for $target but hasn't activated it yet; waiting for it instead of publishing again"
    status=0
  fi
  rm -f "$log"
  exit "$status"
fi

vsix=$1 target=$2 version=$3
api=${OVSX_API:-https://open-vsx.org/api/innoverio/vscode-dbt-power-user}
interval=${VISIBLE_POLL_INTERVAL:-30}
limit=${VISIBLE_POLL_LIMIT:-1200}

"$here/retry.sh" "$0" --attempt "$vsix" "$target" "$version" || exit $?

# Times in milliseconds (bash 5's EPOCHREALTIME), so the deadline holds to the
# millisecond rather than to SECONDS' whole seconds.
now_ms() { local t=${EPOCHREALTIME/[.,]/}; echo $((10#$t / 1000)); }
as_secs() { printf '%d.%03d' $(($1 / 1000)) $(($1 % 1000)); }

response=$(mktemp)
deadline=$(($(now_ms) + limit * 1000))
while true; do
  # No request starts at or after the deadline, and each one gets only the
  # time left, so a 200 can only arrive within the limit.
  left=$((deadline - $(now_ms)))
  [ "$left" -gt 0 ] || break
  code=$(curl -sS --max-time "$(as_secs "$left")" -o "$response" -w '%{http_code}' "$api/$target/$version" 2>/dev/null || true)
  if [ "$code" = 200 ] && python3 -c '
import json, sys
data = json.load(open(sys.argv[1]))
found = (data.get("version"), data.get("targetPlatform", sys.argv[3]))
sys.exit(0 if found == (sys.argv[2], sys.argv[3]) else 1)
' "$response" "$version" "$target" 2>/dev/null; then
    echo "Open VSX serves $version for $target"
    exit 0
  fi
  # The wait before the next request never runs past the deadline either.
  left=$((deadline - $(now_ms)))
  [ "$left" -gt 0 ] || break
  pause=$((interval * 1000 < left ? interval * 1000 : left))
  echo "Open VSX doesn't serve $version for $target yet (HTTP ${code:-none}); checking again in $(as_secs "$pause")s"
  sleep "$(as_secs "$pause")"
done
if [ $((limit % 60)) -eq 0 ]; then wait_for="$((limit / 60)) min"; else wait_for="${limit} s"; fi
echo "::error::$version for $target uploaded but not visible on Open VSX after $wait_for"
exit 1
