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

# Clone jaffle_shop_duckdb sample project
RUN git clone https://github.com/dbt-labs/jaffle_shop_duckdb.git /home/coder/jaffle_shop_duckdb

# Set up dbt profiles directory and create profile for jaffle_shop
RUN mkdir -p ~/.dbt && \
    echo "jaffle_shop:\n\
  target: dev\n\
  outputs:\n\
    dev:\n\
      type: duckdb\n\
      path: /home/coder/jaffle_shop_duckdb/jaffle_shop.duckdb\n\
      threads: 4\n" > ~/.dbt/profiles.yml

# Install dbt dependencies for the project
WORKDIR /home/coder/jaffle_shop_duckdb
RUN dbt deps

# Install all required extensions for dbt Power User (extensionDependencies in package.json)
RUN code-server --install-extension ms-python.python \
    && code-server --install-extension samuelcolvin.jinjahtml \
    && code-server --install-extension altimateai.vscode-altimate-mcp-server

EXPOSE 3001

WORKDIR /home/coder
COPY --chown=coder:coder start-code-server.sh /usr/local/bin/
ENTRYPOINT []
CMD ["/usr/local/bin/start-code-server.sh"]
