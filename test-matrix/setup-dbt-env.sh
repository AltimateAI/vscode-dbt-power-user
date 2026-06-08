#!/usr/bin/env bash
# Creates a hermetic dbt env for the dbt-core-sample-duckdb fixture and prints,
# on the LAST line, the python interpreter path (for dbt.dbtPythonPathOverride).
# Also writes a profiles dir with a tmp duckdb path and exports DBT_PROFILES_DIR.
#
#   eval "$(bash test-matrix/setup-dbt-env.sh)"   # exports PY_INTERP + DBT_PROFILES_DIR
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIXTURE="$REPO_ROOT/test-fixtures/dbt-core-sample-duckdb"
VENV="${MATRIX_VENV:-$REPO_ROOT/.matrix-venv}"
PROFILES_DIR="${MATRIX_PROFILES_DIR:-$(mktemp -d)}"

python3 -m venv "$VENV"
# shellcheck disable=SC1091
"$VENV/bin/pip" install --quiet --upgrade pip
"$VENV/bin/pip" install --quiet "dbt-core==1.9.6" "dbt-duckdb==1.9.3"

# Hermetic profiles.yml: same profile name as the fixture, duckdb at a tmp path.
cat > "$PROFILES_DIR/profiles.yml" <<EOF
dbt_core_sample_duckdb:
  target: go_sales
  outputs:
    go_sales:
      type: duckdb
      path: '$PROFILES_DIR/go_sales.duckdb'
EOF

# Resolve dbt packages (dbt_utils) so parse/manifest can succeed.
( cd "$FIXTURE" && DBT_PROFILES_DIR="$PROFILES_DIR" "$VENV/bin/dbt" deps >/dev/null 2>&1 || true )

# Emit shell-eval-able exports.
echo "export PY_INTERP='$VENV/bin/python'"
echo "export DBT_PROFILES_DIR='$PROFILES_DIR'"
