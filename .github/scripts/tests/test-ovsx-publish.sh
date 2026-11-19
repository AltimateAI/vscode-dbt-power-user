#!/usr/bin/env bash
# Tests ovsx-publish.sh against a stub ovsx command and a stub Open VSX API.
# Usage: test-ovsx-publish.sh. Prints one PASS/FAIL line per case; exits 1 on a failure.
set -u
here=$(cd "$(dirname "$0")" && pwd)
wrapper="$here/../ovsx-publish.sh"
failures=0

# run_case <name> <ovsx mode: inactive|ok|fail> <visible after N requests, 0 = never> [API delay, s]
# Polls every CASE_INTERVAL seconds (default 1) with a CASE_LIMIT s limit (default 3).
# With CASE_CURL_SLEEP, a stub curl on PATH answers 200 for the requested version
# only after sleeping that long, whatever --max-time says: an answer that arrives
# after the deadline although the request started before it.
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
  path=$PATH
  if [ -n "${CASE_CURL_SLEEP:-}" ]; then
    mkdir -p "$dir/bin"
    cat > "$dir/bin/curl" <<'CURL'
#!/usr/bin/env bash
out="" url=""
while [ $# -gt 0 ]; do
  case "$1" in -o|-w|--max-time) [ "$1" = -o ] && out=$2; shift 2 ;; -*) shift ;; *) url=$1; shift ;; esac
done
sleep "$CASE_CURL_SLEEP"
target=${url%/*}; target=${target##*/}
printf '{"version": "%s", "targetPlatform": "%s"}' "${url##*/}" "$target" > "$out"
printf 200
CURL
    chmod +x "$dir/bin/curl"
    path="$dir/bin:$PATH"
  fi
  server=$!
  for _ in $(seq 50); do [ -s "$dir/port" ] && break; sleep 0.1; done
  started=$SECONDS
  output=$(PATH=$path CASE_CURL_SLEEP=${CASE_CURL_SLEEP:-} STUB_DIR=$dir STUB_MODE=$2 OVSX="bash $dir/ovsx" \
    OVSX_API="http://127.0.0.1:$(cat "$dir/port")" RETRY_DELAYS="0 0" \
    VISIBLE_POLL_INTERVAL=${CASE_INTERVAL:-1} VISIBLE_POLL_LIMIT=${CASE_LIMIT:-3} \
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

# Requests at 0 s and 2 s miss; a third, where the version would first be
# served, would fall after the 3 s limit, so it must not be made.
CASE_INTERVAL=2 run_case "first served after the deadline" ok 3
check "fails without a request past the limit" test "$status" = 1 -a "$polls" = 2
check "says it isn't visible" \
  grep -q "uploaded but not visible on Open VSX after 3 s" <<< "$output"

# The only answer is a matching 200 that arrives 0.5 s after the 1 s limit.
CASE_LIMIT=1 CASE_CURL_SLEEP=1.5 run_case "matching 200 after the deadline" ok 0
check "is not accepted" test "$status" = 1
check "says it isn't visible" \
  grep -q "uploaded but not visible on Open VSX after 1 s" <<< "$output"

# Without EPOCHREALTIME (bash before 5) the script stops before publishing.
name="no EPOCHREALTIME"
dir=$(mktemp -d)
printf 'n=$(( $(cat "$STUB_DIR/attempts" 2>/dev/null || echo 0) + 1 )); echo "$n" > "$STUB_DIR/attempts"\n' > "$dir/ovsx"
output=$(STUB_DIR=$dir OVSX="bash $dir/ovsx" timeout 20 bash -c 'unset EPOCHREALTIME; . "$0" "$@"' \
  "$wrapper" "$dir/x.vsix" linux-x64 9.9.9 2>&1)
status=$?
attempts=$(cat "$dir/attempts" 2>/dev/null || echo 0)
polls=0
rm -rf "${dir:?}"
check "stops with exit 2 and publishes nothing" test "$status" = 2 -a "$attempts" = 0
check "says it needs bash 5" grep -q "needs bash 5 or later" <<< "$output"

[ "$failures" -eq 0 ]
