# Pin the code-server (browser IDE) version with --build-arg CS_TAG=<tag>.
# Default "latest" preserves existing behaviour for deploy.sh / vsix-smoke.sh.
ARG CS_TAG=latest
FROM codercom/code-server:${CS_TAG}

USER root

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && corepack enable

# Install Python 3, pip, git, and other dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    git \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Install dbt-duckdb globally (available for all users)
RUN pip3 install --break-system-packages dbt-duckdb

USER coder

# Give the non-root `coder` user a writable npm global prefix. Without this,
# `npm install -g` writes to the root-owned /usr prefix and fails with EACCES —
# which is exactly what the extension's in-IDE "Install Altimate Code" step
# (npm install -g altimate-code) hit. Setting NPM_CONFIG_PREFIX (an env var npm
# honors) routes global installs to a coder-owned dir and puts its bin on PATH.
ENV NPM_CONFIG_PREFIX=/home/coder/.npm-global
ENV PATH=/home/coder/.npm-global/bin:$PATH
# ENV PATH covers the code-server process + extension host (non-login). The
# integrated terminal runs a login shell that re-sources /etc/profile and resets
# PATH, so also persist the prefix in the user's shell profiles — otherwise
# `altimate-code` is on PATH for the extension but not when typed in the terminal.
RUN mkdir -p /home/coder/.npm-global/bin \
    && printf '\nexport PATH=/home/coder/.npm-global/bin:$PATH\n' \
       | tee -a /home/coder/.bashrc /home/coder/.profile >/dev/null

# Pre-install the Altimate Code CLI so the web IDE is ready out of the box (the
# "Install Altimate Code" panel's "Check Again" then passes without manual steps).
RUN npm install -g altimate-code

# Create altimate directory
RUN mkdir -p ~/.altimate

# Set up dbt profiles for both test projects
# Projects are copied from the read-only extension-src mount to writable home dirs at container startup
RUN mkdir -p ~/.dbt && printf '%s\n' \
    'jaffle_shop:' \
    '  target: dev' \
    '  outputs:' \
    '    dev:' \
    '      type: duckdb' \
    '      path: /home/coder/jaffle-shop-duckdb/jaffle_shop.duckdb' \
    '      threads: 4' \
    '' \
    'dbt_core_sample_duckdb:' \
    '  target: go_sales' \
    '  outputs:' \
    '    go_sales:' \
    '      type: duckdb' \
    '      path: /home/coder/dbt-core-sample-duckdb/go_sales.db' \
    > ~/.dbt/profiles.yml

# Install all required extensions for dbt Power User (extensionDependencies in package.json)
RUN code-server --install-extension ms-python.python \
    && code-server --install-extension samuelcolvin.jinjahtml \
    && code-server --install-extension altimateai.vscode-altimate-mcp-server

EXPOSE 3001

WORKDIR /home/coder
COPY --chown=coder:coder start-code-server.sh /usr/local/bin/
ENTRYPOINT []
CMD ["/usr/local/bin/start-code-server.sh"]
