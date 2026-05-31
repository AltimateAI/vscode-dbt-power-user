#!/usr/bin/env bash
# Run the install/update matrix LOCALLY so you can watch it work end to end.
#
# What runs where:
#   - VSCode lane (fresh + upgrade): runs natively on macOS/Linux/Windows — this
#     downloads REAL VS Code, installs the extension + deps, opens the dbt
#     fixture, and asserts activation + dbt init. This is the blocking lane.
#   - code-server lane: runs via Docker if available (proves the fork-style
#     download+unzip install path that Cursor/Windsurf/Kiro also use).
#   - Cursor/Windsurf/Kiro: Linux-only (need the fork's Linux binary + xvfb) —
#     they run in CI, not on a Mac. This script says so and skips them.
#   - Version selection + aggregator + board: run locally.
#
# Usage:
#   bash test-matrix/run-local.sh                 # VSCode fresh+upgrade vs latest published
#   bash test-matrix/run-local.sh --vsix path.vsix   # test a locally-built VSIX
#   bash test-matrix/run-local.sh --from 0.60.7      # override the upgrade baseline
#   bash test-matrix/run-local.sh --with-codeserver  # also run the Docker code-server cell
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

VSIX="latest"
FROM=""
WITH_CODESERVER=0
while [ $# -gt 0 ]; do
  case "$1" in
    --vsix) VSIX="$2"; shift 2;;
    --from) FROM="$2"; shift 2;;
    --with-codeserver) WITH_CODESERVER=1; shift;;
    *) echo "unknown arg: $1"; exit 2;;
  esac
done

say() { printf '\n\033[1;36m== %s ==\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
warn(){ printf '\033[1;33m! %s\033[0m\n' "$*"; }

RESULTS="$(mktemp -d)"
say "Local matrix run — results in $RESULTS"

# 0. Prereqs
command -v node >/dev/null || { echo "node required"; exit 1; }
command -v python3 >/dev/null || { echo "python3 required"; exit 1; }
[ -d node_modules ] || { warn "node_modules missing — running npm ci (slow)"; npm ci; }

# 1. Aggregator unit tests (fast proof the matrix/version logic is correct)
say "1. Aggregator + version-selector unit tests"
if python3 -m pytest tests/matrix/ -q; then ok "unit tests pass"; else echo "unit tests FAILED"; exit 1; fi

# 2. Show the data-driven version selection (live via az, else fallback)
say "2. Version selection (which versions we test)"
python3 test-matrix/build-matrix.py >/tmp/.bm.out 2>/tmp/.bm.err || true
grep -E '^(source|baselines)=' /tmp/.bm.out || true
LIVE_FROM="$(grep '^baselines=' /tmp/.bm.out | cut -d= -f2 | tr ',' '\n' | tail -1)"
[ -z "$FROM" ] && FROM="${LIVE_FROM:-0.61.4}"
ok "upgrade baseline for this local run: $FROM"

# 3. Compile the in-host test suite (needed by the VSCode cell)
say "3. Compile in-host test suite"
npm run compile >/tmp/.compile.log 2>&1 && ok "compiled" || { echo "compile failed:"; tail -20 /tmp/.compile.log; exit 1; }

# 4. Hermetic dbt env (venv + dbt-duckdb + tmp profiles)
say "4. Hermetic dbt environment"
eval "$(bash test-matrix/setup-dbt-env.sh)"
ok "dbt env: $PY_INTERP"

# On Linux (incl. the parity container) VS Code is an Electron GUI needing a
# display — wrap in xvfb-run, exactly like CI. macOS has a real display: run bare.
XVFB=""
if [ "$(uname)" = "Linux" ]; then
  if command -v xvfb-run >/dev/null 2>&1; then XVFB="xvfb-run -a"; else warn "xvfb-run missing — VS Code lane will fail on Linux"; fi
fi
OSL="$(uname | tr '[:upper:]' '[:lower:]')"

# 5. VSCode lane — FRESH install (downloads real VS Code for this OS)
say "5. VSCode lane — FRESH install of '$VSIX'"
$XVFB node test-matrix/vscode-cell.mjs --mode fresh --target "$VSIX" \
  --out "$RESULTS/result-$OSL-stable-fresh-.json" || true

# 6. VSCode lane — UPGRADE from $FROM
say "6. VSCode lane — UPGRADE from $FROM -> '$VSIX'"
$XVFB node test-matrix/vscode-cell.mjs --mode upgrade --from "$FROM" --target "$VSIX" \
  --out "$RESULTS/result-$OSL-stable-upgrade-$FROM.json" || true

# 7. Optional: code-server lane via Docker (the fork-style install path)
if [ "$WITH_CODESERVER" = "1" ]; then
  if command -v docker >/dev/null && docker info >/dev/null 2>&1; then
    say "7. code-server lane (Docker)"
    if [ "$VSIX" = "latest" ]; then
      bash test-matrix/codeserver-cell.sh --mode fresh --target latest --out "$RESULTS/result-codeserver-fresh.json" || true
    else
      bash test-matrix/codeserver-cell.sh --mode fresh --vsix-file "$VSIX" --out "$RESULTS/result-codeserver-fresh.json" || true
    fi
  else
    warn "Docker not running — skipping code-server lane"
  fi
fi

# 8. Fork lanes (Cursor / Windsurf / Kiro) — Linux only (need the fork's Linux
#    binary + xvfb). They RUN here when on Linux (e.g. inside the parity Docker
#    container), and are skipped with a note on macOS.
say "8. Fork lanes (Cursor / Windsurf / Kiro)"
if [ "$(uname)" = "Linux" ] && command -v xvfb-run >/dev/null 2>&1; then
  TARGET_ARG=(--target "$VSIX"); [ "$VSIX" != "latest" ] || TARGET_ARG=(--target latest)
  for fork in cursor windsurf kiro; do
    prov="test-matrix/provision/$fork.sh"
    [ -f "$prov" ] || { warn "$fork: no provisioner, skipping"; continue; }
    say "   $fork — provisioning + fresh install"
    if ! prov_out="$(bash "$prov" 2>"/tmp/prov-$fork.err")" || [ -z "$prov_out" ]; then
      warn "$fork: provision failed, skipping"; sed 's/^/      /' "/tmp/prov-$fork.err" 2>/dev/null | tail -4; continue
    fi
    eval "$prov_out"
    BINVAR="$(echo "$fork" | tr '[:lower:]' '[:upper:]')_BIN"; BIN="${!BINVAR:-}"
    if [ -z "$BIN" ] || [ ! -x "$BIN" ]; then warn "$fork: binary not found, skipping"; continue; fi
    # fresh
    xvfb-run -a node test-matrix/cursor-cell.mjs --runtime "$fork" --bin "$BIN" \
      --mode fresh --target "$VSIX" --out "$RESULTS/result-$fork-fresh.json" || true
    # upgrade (only meaningful for a published target; skip for a local custom vsix
    # since the baseline still comes from Open VSX which is independent of $VSIX)
    xvfb-run -a node test-matrix/cursor-cell.mjs --runtime "$fork" --bin "$BIN" \
      --mode upgrade --from "$FROM" --target "$VSIX" --out "$RESULTS/result-$fork-upgrade-$FROM.json" || true
  done
else
  warn "Not on Linux (or no xvfb) — fork lanes skipped. Run inside the parity container"
  warn "(bash test-matrix/run-in-docker.sh) to exercise Cursor/Windsurf/Kiro exactly as CI does."
fi

# 9. Aggregate -> board
say "9. Aggregate into the install/update board"
# aggregate.py already prints the combined board to stdout; don't cat it again.
python3 test-matrix/aggregate.py --results-dir "$RESULTS" --out-dir "$RESULTS/agg" --target "$VSIX" --trigger local || warn "no board produced"
echo
say "Per-cell results"
for f in "$RESULTS"/result-*.json; do
  [ -f "$f" ] && python3 -c "import json,sys;d=json.load(open('$f'));print(f\"  {d['runtime']}/{d['os']}/{d['scenario']}\"+((' from '+str(d['from'])) if d.get('from') else '')+f\": {d['status']}  ({d.get('reason','') or 'ok'})\")"
done
echo
# When run inside the parity container, copy the board + results out to the host.
if [ -n "${MATRIX_HOST_OUT:-}" ] && [ -d "$MATRIX_HOST_OUT" ]; then
  cp -f "$RESULTS"/result-*.json "$MATRIX_HOST_OUT"/ 2>/dev/null || true
  cp -rf "$RESULTS/agg" "$MATRIX_HOST_OUT"/ 2>/dev/null || true
  ok "Board + results copied to host: .matrix-docker-out/"
fi
ok "Local run complete. Results dir: $RESULTS"
