#!/usr/bin/env bash
#
# vsix-smoke.sh — verifies the published dbt Power User VSIX installs and
# activates cleanly in a fresh code-server container.
#
# Same script runs:
#   - in CI from .github/workflows/vsix-smoke.yml (daily + manual)
#   - locally on any laptop with Docker:
#       bash docker-setup/vsix-smoke.sh                       # latest
#       bash docker-setup/vsix-smoke.sh --version 0.61.5
#       bash docker-setup/vsix-smoke.sh --from-version 0.61.4 --version 0.61.5   # upgrade path
#       bash docker-setup/vsix-smoke.sh --keep                # leave container up
#
# Reuses docker-setup/Dockerfile so Python, dbt-duckdb, and the three
# dependency extensions (ms-python.python, samuelcolvin.jinjahtml,
# altimateai.vscode-altimate-mcp-server) are already baked in. Tests the
# PUBLISHED extension (fetched from OpenVSX via code-server), not local source.

set -euo pipefail

EXTENSION_ID="innoverio.vscode-dbt-power-user"
VERSION="latest"
FROM_VERSION=""
KEEP=0

usage() {
  cat <<EOF
Usage: $0 [--version VERSION] [--from-version PREV] [--keep]
  --version VERSION       Version under test. Default: latest (whatever marketplace has).
  --from-version PREV     If set, install PREV first, then upgrade to --version.
  --keep                  Leave the container running after the test for manual inspection.
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --version) VERSION="$2"; shift 2 ;;
    --from-version) FROM_VERSION="$2"; shift 2 ;;
    --keep) KEEP=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; usage >&2; exit 2 ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$REPO_ROOT"

IMAGE_TAG="vsix-smoke-base:latest"
CONTAINER_NAME="vsix-smoke-$(date +%s)"
PORT="${VSIX_SMOKE_PORT:-3015}"

red()   { printf '\033[0;31m%s\033[0m\n' "$*"; }
green() { printf '\033[0;32m%s\033[0m\n' "$*"; }
dim()   { printf '\033[0;2m%s\033[0m\n' "$*"; }

cleanup() {
  local code=$?
  if [ "$KEEP" -eq 0 ]; then
    docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
  fi
  exit "$code"
}
trap cleanup EXIT

echo "==> Building smoke base image (reuses docker-setup/Dockerfile)"
docker build -t "$IMAGE_TAG" -f docker-setup/Dockerfile docker-setup/ >/tmp/vsix-smoke-build.log 2>&1 || {
  red "FAIL: docker build"
  tail -30 /tmp/vsix-smoke-build.log
  exit 1
}
dim "    image $IMAGE_TAG built"

echo "==> Starting fresh code-server container (no dev source mount)"
docker run -d --rm \
  --name "$CONTAINER_NAME" \
  -p "${PORT}:3001" \
  -e PORT=3001 \
  "$IMAGE_TAG" >/dev/null

echo -n "==> Waiting for code-server healthz"
for i in $(seq 1 45); do
  if curl -sf "http://localhost:${PORT}/healthz" >/dev/null 2>&1; then
    echo " ✓ (${i}x2s)"
    break
  fi
  if [ "$i" -eq 45 ]; then
    echo
    red "FAIL: code-server did not respond on /healthz within 90s"
    docker logs "$CONTAINER_NAME" 2>&1 | tail -30
    exit 1
  fi
  printf '.'
  sleep 2
done

install_and_verify() {
  local version="$1"
  local target="$EXTENSION_ID"
  [ "$version" != "latest" ] && target="${EXTENSION_ID}@${version}"

  echo "==> Installing $target"
  if ! docker exec "$CONTAINER_NAME" code-server --install-extension "$target" 2>&1; then
    red "FAIL: --install-extension exited non-zero for $target"
    return 1
  fi

  echo "==> Verifying with --list-extensions"
  local listed
  listed=$(docker exec "$CONTAINER_NAME" code-server --list-extensions --show-versions)
  echo "$listed"

  if ! echo "$listed" | grep -qE "^${EXTENSION_ID//./\\.}@"; then
    red "FAIL: $EXTENSION_ID not present in installed extensions"
    return 1
  fi

  if [ "$version" != "latest" ]; then
    if ! echo "$listed" | grep -qE "^${EXTENSION_ID//./\\.}@${version}$"; then
      red "FAIL: expected version $version but installed list shows:"
      echo "$listed" | grep "^${EXTENSION_ID}" || true
      return 1
    fi
  fi

  echo "==> Verifying activation (scanning code-server logs for activation errors)"
  curl -sf "http://localhost:${PORT}/?folder=/home/coder/jaffle_shop_duckdb" >/dev/null 2>&1 || true
  sleep 15

  local logs activation_errors
  logs=$(docker logs "$CONTAINER_NAME" 2>&1)
  activation_errors=$(echo "$logs" | grep -E "Failed to activate extension '${EXTENSION_ID}|Activation failed.*${EXTENSION_ID}|UnhandledRejection.*${EXTENSION_ID}|Cannot activate the '${EXTENSION_ID}" || true)

  if [ -n "$activation_errors" ]; then
    red "FAIL: activation errors in code-server logs"
    echo "$activation_errors" | tail -10
    return 1
  fi

  green "    install + activation OK"
}

if [ -n "$FROM_VERSION" ]; then
  echo "==> Phase 1/2: baseline install of $FROM_VERSION"
  install_and_verify "$FROM_VERSION"
  echo
  echo "==> Phase 2/2: upgrade to $VERSION"
  install_and_verify "$VERSION"
else
  install_and_verify "$VERSION"
fi

echo
green "==> PASS"
if [ "$KEEP" -eq 1 ]; then
  echo
  dim "Container left running for manual inspection:"
  dim "  URL:  http://localhost:${PORT}/?folder=/home/coder/jaffle_shop_duckdb"
  dim "  Logs: docker logs ${CONTAINER_NAME}"
  dim "  Stop: docker rm -f ${CONTAINER_NAME}"
fi
