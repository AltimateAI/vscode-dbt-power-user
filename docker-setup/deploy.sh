#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "Building extension VSIX..."
npm run build-vsix

# Find the generated VSIX file (name includes version)
VSIX_FILE=$(ls -t *.vsix 2>/dev/null | head -1)
if [ -z "$VSIX_FILE" ]; then
    echo "Error: No VSIX file found"
    exit 1
fi

echo "Copying $VSIX_FILE to docker-setup..."
cp "$VSIX_FILE" "$SCRIPT_DIR/extension.vsix"

echo "Building and starting code-server container..."
cd "$SCRIPT_DIR"
docker-compose up --build -d

echo ""
echo "Done! Open http://localhost:3001 in your browser."
echo "Use 'npm run docker:logs' to view logs."
