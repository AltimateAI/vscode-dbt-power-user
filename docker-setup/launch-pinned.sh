#!/usr/bin/env bash
# launch-pinned.sh — ONE command to bring up dbt Power User in code-server
# (VS Code in the browser, running in Docker) with a SPECIFIC code-server/IDE
# version, a SPECIFIC dbt Power User extension version, and a SPECIFIC dbt-core
# version. Copies the sample dbt project in and leaves the container running.
#
# Nothing is installed on your host — everything lives in a throwaway container.
#
# Usage:
#   bash docker-setup/launch-pinned.sh --extension 0.61.5 --dbt 1.10.18
#   bash docker-setup/launch-pinned.sh --extension 0.61.5 --dbt 1.10.18 --code-server 4.99.1 --port 3001
#
# Options:
#   --extension <x.y.z|latest>   dbt Power User version (marketplace/OpenVSX). Default: latest.
#   --dbt <x.y.z>                dbt-core version to pin in the container. Optional.
#   --code-server <tag|latest>   code-server (browser IDE) version. Default: latest.
#   --port <n>                   Host port. Default: 3001.
#   --name <name>                Container name. Default: dbt-pu-demo.
set -euo pipefail

EXT_ID="innoverio.vscode-dbt-power-user"
EXT_VERSION="latest"
DBT_VERSION=""
CS_TAG="latest"
PORT="${PORT:-3001}"
NAME="dbt-pu-demo"

while [ $# -gt 0 ]; do
  case "$1" in
    --extension) EXT_VERSION="$2"; shift 2;;
    --dbt) DBT_VERSION="$2"; shift 2;;
    --code-server|--ide) CS_TAG="$2"; shift 2;;
    --port) PORT="$2"; shift 2;;
    --name) NAME="$2"; shift 2;;
    -h|--help) sed -n '2,20p' "$0"; exit 0;;
    *) echo "unknown arg: $1" >&2; exit 2;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
FIXTURES_DIR="$REPO_ROOT/test-fixtures"
# Open the self-contained jaffle-shop project by default — it `dbt build`s cleanly
# on a pinned dbt-core (seeds + SQL only). dbt-core-sample is also copied in but
# needs an external MySQL source, so it can't fully build offline.
PROJECT_DIR="/home/coder/jaffle-shop-duckdb"

green() { printf '\033[0;32m%s\033[0m\n' "$*"; }
say()   { printf '\033[0;36m==> %s\033[0m\n' "$*"; }
die()   { printf '\033[0;31mFAIL: %s\033[0m\n' "$*" >&2; exit 1; }

command -v docker >/dev/null || die "docker not found"
docker info >/dev/null 2>&1 || die "docker daemon not running"
[ -d "$FIXTURES_DIR/jaffle-shop-duckdb" ] || die "fixture not found: $FIXTURES_DIR/jaffle-shop-duckdb"

# code-server installs from OpenVSX, which treats a bare extension id as "any
# version is fine". Resolve "latest" to a concrete semver so the pin is exact.
if [ "$EXT_VERSION" = "latest" ]; then
  EXT_VERSION="$(curl -sf "https://open-vsx.org/api/innoverio/vscode-dbt-power-user/latest" \
    | python3 -c 'import json,sys;print(json.load(sys.stdin)["version"])')" \
    || die "could not resolve latest extension version from OpenVSX"
  say "resolved latest extension -> $EXT_VERSION"
fi

IMAGE="dbt-pu-pinned:${CS_TAG}"
say "Building code-server image (code-server=${CS_TAG}; layers cached after first build)"
docker build -t "$IMAGE" --build-arg "CS_TAG=${CS_TAG}" \
  -f "$SCRIPT_DIR/Dockerfile" "$SCRIPT_DIR" >/tmp/launch-pinned-build.log 2>&1 \
  || { tail -30 /tmp/launch-pinned-build.log; die "docker build"; }
green "    image $IMAGE built"

docker rm -f "$NAME" >/dev/null 2>&1 || true
say "Starting code-server on port ${PORT}"
docker run -d --rm --name "$NAME" -p "${PORT}:3001" -e PORT=3001 "$IMAGE" >/dev/null

say "Waiting for code-server health"
for i in $(seq 1 45); do
  curl -sf "http://localhost:${PORT}/healthz" >/dev/null 2>&1 && break
  [ "$i" -eq 45 ] && { docker logs "$NAME" 2>&1 | tail -30; die "code-server did not respond on /healthz within 90s"; }
  sleep 2
done
green "    code-server healthy"

say "Installing dbt Power User ${EXT_VERSION}"
docker exec "$NAME" code-server --install-extension "${EXT_ID}@${EXT_VERSION}" >/tmp/launch-pinned-ext.log 2>&1 \
  || { cat /tmp/launch-pinned-ext.log; die "extension install exited non-zero"; }
docker exec "$NAME" code-server --list-extensions --show-versions \
  | grep -Fq "${EXT_ID}@${EXT_VERSION}" \
  || { docker exec "$NAME" code-server --list-extensions --show-versions; die "${EXT_ID}@${EXT_VERSION} not present after install"; }
green "    ${EXT_ID}@${EXT_VERSION} installed"

if [ -n "$DBT_VERSION" ]; then
  maj="${DBT_VERSION%%.*}"; rest="${DBT_VERSION#*.}"; min="${rest%%.*}"
  adapter="dbt-duckdb>=${maj}.${min},<${maj}.$((min + 1))"
  say "Pinning dbt-core==${DBT_VERSION} (+ ${adapter})"
  docker exec "$NAME" pip3 install --break-system-packages --quiet \
    "dbt-core==${DBT_VERSION}" "$adapter" >/tmp/launch-pinned-dbt.log 2>&1 \
    || { cat /tmp/launch-pinned-dbt.log; die "dbt-core pin failed"; }
  got="$(docker exec "$NAME" dbt --version 2>&1 | grep -oE 'installed: [0-9]+\.[0-9]+\.[0-9]+' | head -1 | awk '{print $2}')"
  [ "$got" = "$DBT_VERSION" ] || die "dbt-core resolved to ${got:-unknown}, expected ${DBT_VERSION}"
  green "    dbt-core ${got} active"
fi

# Copy the sample dbt projects into the container (no source mount => the image's
# startup copy is skipped, so /home/coder/{jaffle-shop,dbt-core-sample}-duckdb
# don't exist and code-server's default workspace 404s). Seed BOTH so whichever
# folder code-server opens is real, then resolve packages so they open ready.
say "Loading sample dbt projects"
for proj in jaffle-shop-duckdb dbt-core-sample-duckdb; do
  src="$FIXTURES_DIR/$proj"
  [ -d "$src" ] || continue
  dst="/home/coder/$proj"
  docker exec "$NAME" rm -rf "$dst" >/dev/null 2>&1 || true
  docker cp "$src" "${NAME}:${dst}" >/dev/null
  # docker cp lands files as root/host-uid, but code-server runs as `coder` — fix
  # ownership so dbt can write logs/, target/, and the duckdb file.
  docker exec -u root "$NAME" chown -R coder:coder "$dst" >/dev/null 2>&1 || true
  # Fixtures can ship a stale absolute duckdb path and a require-dbt-version guard
  # that rejects the version we deliberately pinned — fix both so it just runs.
  docker exec -u coder "$NAME" sed -i 's#/home/u0001/#/home/coder/#g' "$dst/profiles.yml" >/dev/null 2>&1 || true
  if [ -n "$DBT_VERSION" ]; then
    docker exec -u coder "$NAME" sed -i 's/^require-dbt-version:.*/require-dbt-version: [">=1.0.0", "<99.0.0"]/' "$dst/dbt_project.yml" >/dev/null 2>&1 || true
  fi
  docker exec -u coder "$NAME" bash -lc "cd '$dst' && dbt deps" >/dev/null 2>&1 || true
  green "    project ready at $dst"
done

echo
green "READY — open in your browser:"
echo "  http://localhost:${PORT}/?folder=${PROJECT_DIR}"
echo
echo "  IDE (code-server): ${CS_TAG}"
echo "  Extension:         ${EXT_ID}@${EXT_VERSION}"
[ -n "$DBT_VERSION" ] && echo "  dbt-core:          ${DBT_VERSION}"
echo "  Logs:  docker logs -f ${NAME}"
echo "  Stop:  docker rm -f ${NAME}"
