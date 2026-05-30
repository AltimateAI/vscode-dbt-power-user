#!/usr/bin/env bash
# Runs the existing docker-setup/vsix-smoke.sh and converts its PASS/FAIL into a
# matrix RESULT_JSON. Usage:
#   bash test-matrix/codeserver-cell.sh --mode fresh|upgrade [--from <ver>] \
#        [--vsix-file <path>|--target latest] --out <result.json>
set -uo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

MODE="fresh"; FROM=""; VSIX=""; TARGET="latest"; OUT="/tmp/codeserver.json"
while [ $# -gt 0 ]; do
  case "$1" in
    --mode) MODE="$2"; shift 2;;
    --from) FROM="$2"; shift 2;;
    --vsix-file) VSIX="$2"; shift 2;;
    --target) TARGET="$2"; shift 2;;
    --out) OUT="$2"; shift 2;;
    *) shift;;
  esac
done

args=()
[ -n "$VSIX" ] && args+=(--vsix-file "$VSIX")
[ "$MODE" = "upgrade" ] && [ -n "$FROM" ] && args+=(--from-version "$FROM")

start=$(date +%s)
if VSIX_SMOKE_REPORT=/tmp/cs-smoke.md bash "$REPO_ROOT/docker-setup/vsix-smoke.sh" "${args[@]}"; then
  STATUS="pass"; REASON=""; OKS=true
else
  STATUS="fail"; REASON="$(tail -3 /tmp/cs-smoke.md 2>/dev/null | tr '\n' ' ' | sed 's/"/'"'"'/g')"; OKS=false
fi
end=$(date +%s)

python3 - "$OUT" "$MODE" "$FROM" "$TARGET" "$STATUS" "$REASON" "$OKS" $((end-start)) <<'PY'
import json, sys
out, mode, frm, target, status, reason, oks, dur = sys.argv[1:9]
ok = oks == "true"
json.dump({
  "runtime": "code-server", "os": "linux", "scenario": mode,
  "from": frm or None, "to": "pr-build" if target != "latest" else "latest",
  "install_ok": ok, "deps_resolved": {}, "activation_ok": ok, "dbt_flow_ok": ok,
  "status": status, "reason": reason, "duration_s": int(dur),
  "log_artifact": "codeserver.json",
}, open(out, "w"), indent=2)
print("wrote", out, status)
PY
[ "$STATUS" = "pass" ]
