#!/usr/bin/env bash
# Usage: retry.sh <command> [args...]
#
# Runs the command, and after a failure runs it again after each delay in
# RETRY_DELAYS (seconds, default "30 90"): three attempts in all by default.
# Exits with the command's last status. Only wrap commands that are safe to
# repeat, such as a publish with --skip-duplicate.
set -u
read -r -a delays <<< "${RETRY_DELAYS:-30 90}"
attempt=1
while true; do
  "$@"
  status=$?
  if [ "$status" -eq 0 ]; then
    exit 0
  fi
  if [ "$attempt" -gt "${#delays[@]}" ]; then
    echo "::error::failed after $attempt attempts (exit $status): $*"
    exit "$status"
  fi
  delay=${delays[$((attempt - 1))]}
  echo "::warning::attempt $attempt failed (exit $status); retrying in ${delay}s"
  sleep "$delay"
  attempt=$((attempt + 1))
done
