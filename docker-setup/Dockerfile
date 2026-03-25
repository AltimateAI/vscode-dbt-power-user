FROM codercom/code-server:latest

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
