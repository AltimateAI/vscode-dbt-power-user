#!/usr/bin/env bash
# Tests ovsx-publish.sh against a stub ovsx command and a stub Open VSX API.
# Usage: test-ovsx-publish.sh. Prints one PASS/FAIL line per case; exits 1 on a failure.
set -u
here=$(cd "$(dirname "$0")" && pwd)
wrapper="$here/../ovsx-publish.sh"
failures=0

# run_case <name> <ovsx mode: inactive|ok|fail> <visible after N requests, 0 = never> [API delay, s]
# Sets: status, attempts, polls, output, elapsed.
run_case() {
  dir=$(mktemp -d)
  cat > "$dir/ovsx" <<'STUB'
n=$(( $(cat "$STUB_DIR/attempts" 2>/dev/null || echo 0) + 1 )); echo "$n" > "$STUB_DIR/attempts"
case "$STUB_MODE" in
  inactive) echo "❌  Extension innoverio.vscode-dbt-power-user 9.9.9 (linux-x64) is already published, but currently isn't active and therefore not visible."; exit 1 ;;
  ok) echo "🚀  Published innoverio.vscode-dbt-power-user v9.9.9@linux-x64"; exit 0 ;;
  *) echo "❌  Service Unavailable (503)"; exit 1 ;;
esac
STUB
  python3 "$here/openvsx_stub.py" "$dir/port" "$dir/polls" "$3" "${4:-0}" &
  server=$!
  for _ in $(seq 50); do [ -s "$dir/port" ] && break; sleep 0.1; done
  started=$SECONDS
  output=$(STUB_DIR=$dir STUB_MODE=$2 OVSX="bash $dir/ovsx" \
    OVSX_API="http://127.0.0.1:$(cat "$dir/port")" RETRY_DELAYS="0 0" \
    VISIBLE_POLL_INTERVAL=1 VISIBLE_POLL_LIMIT=3 \
    "$wrapper" "$dir/x.vsix" linux-x64 9.9.9 2>&1)
  status=$?
  elapsed=$((SECONDS - started))
  kill "$server" 2>/dev/null
  wait "$server" 2>/dev/null
  attempts=$(cat "$dir/attempts" 2>/dev/null || echo 0)
  polls=$(cat "$dir/polls" 2>/dev/null || echo 0)
  rm -rf "${dir:?}"
  name=$1
}

# check <description> <condition...>
check() {
  local description=$1
  shift
  if "$@"; then
    echo "PASS $name: $description"
  else
    echo "FAIL $name: $description (exit $status, $attempts attempts, $polls polls)"
    printf '%s\n' "$output" | sed 's/^::\([a-z]*\)::/  \1: /; s/^/    /'
    failures=$((failures + 1))
  fi
}

run_case "inactive message" inactive 2
check "one attempt, then success once visible" \
  test "$status" = 0 -a "$attempts" = 1 -a "$polls" = 2
check "warns that the upload landed" grep -q "hasn't activated it yet" <<< "$output"

run_case "visible after 3 polls" ok 3
check "success on the third poll" test "$status" = 0 -a "$attempts" = 1 -a "$polls" = 3

run_case "never visible" ok 0
check "fails after the poll limit" test "$status" = 1 -a "$attempts" = 1
check "says it isn't visible" \
  grep -q "uploaded but not visible on Open VSX after 3 s" <<< "$output"

run_case "ordinary failure" fail 1
check "three attempts, no polling" \
  test "$status" = 1 -a "$attempts" = 3 -a "$polls" = 0

run_case "API slower than the limit" ok 1 6
check "fails at the limit instead of waiting for the slow answer" \
  test "$status" = 1 -a "$elapsed" -lt 6

[ "$failures" -eq 0 ]
