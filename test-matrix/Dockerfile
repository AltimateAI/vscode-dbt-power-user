# Parity container for the install/update matrix.
#
# Goal: "green here == green in CI". This image mirrors the GitHub `ubuntu-latest`
# runner (Ubuntu 24.04, Node 20, Python 3, xvfb + Electron's headless libs) and
# runs the SAME test-matrix scripts, so the VSCode lane AND the Linux-only fork
# lanes (Cursor/Windsurf/Kiro/code-server) all execute exactly as they do in CI —
# which a macOS host cannot do natively.
#
# Build context = repo root; excludes via test-matrix/Dockerfile.dockerignore.
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "-c"]

# Base tooling + everything Electron needs to launch headless under xvfb.
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates curl gnupg git unzip jq sudo xvfb \
      python3 python3-venv python3-pip \
      libnss3 libnspr4 libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64 \
      libdrm2 libgbm1 libgtk-3-0t64 libasound2t64 libxkbcommon0 libxshmfence1 \
      libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libxext6 libx11-6 \
      libpango-1.0-0 libcairo2 libatspi2.0-0t64 libwayland-client0 libsecret-1-0 \
    && rm -rf /var/lib/apt/lists/*

# Node 20 (matches the workflow's setup-node node-version: "20").
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work

# Install JS deps first (cached unless lockfiles change) — fresh linux node_modules,
# NOT the host's mac build (excluded via the scoped .dockerignore).
COPY package.json package-lock.json ./
COPY webview_panels/package.json webview_panels/package-lock.json ./webview_panels/
RUN npm ci --no-audit --no-fund

# Now the rest of the repo + compile the in-host test suite.
COPY . .
RUN npm run compile

# pip cache warm so setup-dbt-env.sh is fast/offline-capable after build.
RUN python3 -m pip install --break-system-packages --no-cache-dir "dbt-core==1.9.6" "dbt-duckdb==1.9.3"

# Default: run the whole matrix (all lanes; forks run because this is Linux).
# Pass args through, e.g. `docker run <img> --vsix /vsix/pu.vsix`.
ENTRYPOINT ["bash", "test-matrix/run-local.sh"]
