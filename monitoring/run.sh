#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
VENV="$DIR/.venv"

if [ ! -d "$VENV" ]; then
  echo "Creating virtualenv in $VENV …"
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install -q -r "$DIR/requirements.txt"
elif [ "$DIR/requirements.txt" -nt "$VENV/.installed" ]; then
  echo "Updating dependencies …"
  "$VENV/bin/pip" install -q -r "$DIR/requirements.txt"
fi
touch "$VENV/.installed"

exec "$VENV/bin/python" "$DIR/app.py" "$@"
