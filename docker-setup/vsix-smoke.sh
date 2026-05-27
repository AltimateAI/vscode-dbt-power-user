#!/usr/bin/env bash
#
# vsix-smoke.sh — verifies the dbt Power User VSIX installs and activates
# cleanly in a fresh code-server container.
#
# Two modes:
#   --version X         install marketplace version X (default: latest)
#   --vsix-file PATH    install a local .vsix file (used by ci.yml release gate
#                       to test the freshly-built VSIX before vsce publish runs)
#
# Optional --from-version PREV runs the upgrade scenario: install PREV from the
# marketplace first, then install the target (marketplace version or local file)
# on top. Catches migration bugs that fresh-install cannot.
#
# Same script runs:
#   - daily in CI from .github/workflows/vsix-smoke.yml
#   - pre-release in ci.yml as a gate before vsce publish
#   - locally on any laptop with Docker:
#       bash docker-setup/vsix-smoke.sh                                       # latest
#       bash docker-setup/vsix-smoke.sh --version 0.61.5
#       bash docker-setup/vsix-smoke.sh --from-version 0.61.4 --version 0.61.5   # upgrade
#       bash docker-setup/vsix-smoke.sh --vsix-file ./local.vsix                 # local file
#       bash docker-setup/vsix-smoke.sh --from-version 0.61.4 --vsix-file ./local.vsix
#       bash docker-setup/vsix-smoke.sh --keep                                # leave container up
#
# Reuses docker-setup/Dockerfile so Python, dbt-duckdb, and the three
# dependency extensions (ms-python.python, samuelcolvin.jinjahtml,
# altimateai.vscode-altimate-mcp-server) are already baked in.

set -euo pipefail

EXTENSION_ID="innoverio.vscode-dbt-power-user"
VERSION="latest"
VSIX_FILE=""
FROM_VERSION=""
KEEP=0

usage() {
  cat <<EOF
Usage: $0 [--version VERSION | --vsix-file PATH] [--from-version PREV] [--keep]
  --version VERSION       Marketplace version. Default: latest.
  --vsix-file PATH        Install a local .vsix file instead of fetching from marketplace.
  --from-version PREV     If set, install PREV from marketplace first, then upgrade to the target.
  --keep                  Leave the container running after the test for manual inspection.
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --version) VERSION="$2"; shift 2 ;;
    --vsix-file) VSIX_FILE="$2"; shift 2 ;;
    --from-version) FROM_VERSION="$2"; shift 2 ;;
    --keep) KEEP=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; usage >&2; exit 2 ;;
  esac
done

if [ -n "$VSIX_FILE" ]; then
  if [ ! -f "$VSIX_FILE" ]; then
    echo "FAIL: --vsix-file '$VSIX_FILE' does not exist" >&2
    exit 2
  fi
  VSIX_FILE="$(cd "$(dirname "$VSIX_FILE")" && pwd)/$(basename "$VSIX_FILE")"
fi

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
  # $1: "marketplace" or "file"
  # $2: when source=marketplace: version (or "latest"); when source=file: host path to .vsix
  local source="$1"
  local arg="$2"
  local target install_label expected_version=""

  if [ "$source" = "file" ]; then
    local base
    base=$(basename "$arg")
    docker cp "$arg" "${CONTAINER_NAME}:/tmp/${base}" >/dev/null
    target="/tmp/${base}"
    install_label="local file $base"
    # Best-effort version sniff from filename: name-X.Y.Z[-target].vsix
    expected_version=$(echo "$base" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || true)
  else
    target="$EXTENSION_ID"
    [ "$arg" != "latest" ] && target="${EXTENSION_ID}@${arg}"
    install_label="$target"
    [ "$arg" != "latest" ] && expected_version="$arg"
  fi

  echo "==> Installing $install_label"
  if ! docker exec "$CONTAINER_NAME" code-server --install-extension "$target" 2>&1; then
    red "FAIL: --install-extension exited non-zero for $install_label"
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

  if [ -n "$expected_version" ]; then
    if ! echo "$listed" | grep -qE "^${EXTENSION_ID//./\\.}@${expected_version}$"; then
      red "FAIL: expected version $expected_version but installed list shows:"
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

target_label() {
  if [ -n "$VSIX_FILE" ]; then echo "local file $(basename "$VSIX_FILE")"; else echo "$VERSION"; fi
}

if [ -n "$FROM_VERSION" ]; then
  echo "==> Phase 1/2: baseline install of $FROM_VERSION from marketplace"
  install_and_verify "marketplace" "$FROM_VERSION"
  echo
  echo "==> Phase 2/2: upgrade to $(target_label)"
  if [ -n "$VSIX_FILE" ]; then
    install_and_verify "file" "$VSIX_FILE"
  else
    install_and_verify "marketplace" "$VERSION"
  fi
else
  if [ -n "$VSIX_FILE" ]; then
    install_and_verify "file" "$VSIX_FILE"
  else
    install_and_verify "marketplace" "$VERSION"
  fi
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
