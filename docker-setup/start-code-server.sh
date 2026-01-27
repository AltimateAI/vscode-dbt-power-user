#!/bin/bash

# Start code-server with jaffle_shop_duckdb project open by default
exec code-server \
    --bind-addr 0.0.0.0:${PORT:-3001} \
    --auth none \
    --disable-telemetry \
    /home/coder/jaffle_shop_duckdb
