#!/usr/bin/env bash
# Run the FULL install/update matrix inside a CI-identical Linux container, so
# "green here == green in CI" — including the Cursor/Windsurf/Kiro fork lanes that
# a macOS host can't run natively.
#
# Usage:
#   bash test-matrix/run-in-docker.sh                 # all lanes vs latest published
#   bash test-matrix/run-in-docker.sh --from 0.60.7   # override the upgrade baseline
#   bash test-matrix/run-in-docker.sh --vsix pu.vsix  # test a locally-built linux-x64 VSIX
#                                                     #   (must be a linux-x64 build)
#
# Notes:
#  - Forces linux/amd64 to match GitHub's x64 runners (on Apple Silicon this runs
#    under emulation — correct but slower).
#  - First `docker build` needs network (pulls Ubuntu, Node, npm, pip). After that
#    the editors/extensions are still downloaded at run time by the matrix itself.
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

IMAGE="dbt-matrix-parity:local"
PLATFORM="linux/amd64"
RUN_ARGS=()
VSIX_MOUNT=()

while [ $# -gt 0 ]; do
  case "$1" in
    --vsix)
      host_vsix="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
      [ -f "$host_vsix" ] || { echo "vsix not found: $2"; exit 1; }
      VSIX_MOUNT=(-v "$host_vsix:/vsix/target.vsix:ro")
      RUN_ARGS+=(--vsix /vsix/target.vsix)
      shift 2;;
    *) RUN_ARGS+=("$1"); shift;;
  esac
done

command -v docker >/dev/null || { echo "docker required"; exit 1; }
docker info >/dev/null 2>&1 || { echo "docker daemon not running"; exit 1; }

echo "==> Building parity image ($PLATFORM) — first build is slow, then cached"
DOCKER_BUILDKIT=1 docker build --platform "$PLATFORM" \
  -f test-matrix/Dockerfile -t "$IMAGE" . || { echo "build failed"; exit 1; }

echo "==> Running the full matrix inside the container"
# A host dir to collect the rendered board/results out of the container.
OUT_DIR="$REPO_ROOT/.matrix-docker-out"
mkdir -p "$OUT_DIR"
docker run --rm --platform "$PLATFORM" \
  --shm-size=1g \
  "${VSIX_MOUNT[@]}" \
  -v "$OUT_DIR:/work/.matrix-docker-out" \
  -e MATRIX_HOST_OUT=/work/.matrix-docker-out \
  "$IMAGE" "${RUN_ARGS[@]}"
echo "==> Done. Container ran the same lanes CI runs (incl. forks)."
