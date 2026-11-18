#!/usr/bin/env bash
# Usage: release-slack-text.sh <tag> <run-attempt>
#
# Prints the Slack text for a release: a header line, then the release's notes
# from this repository ($GITHUB_REPOSITORY) converted to Slack mrkdwn. When the
# notes can't be read, warns with gh's error and prints "No release notes
# provided." instead, so the status still posts.
set -u
tag=$1
attempt=$2
header="🚀 *Release $tag*"
if [ "$attempt" -gt 1 ]; then
  header="$header (re-run, attempt $attempt)"
fi
errors=$(mktemp)
if notes=$(gh release view "$tag" -R "$GITHUB_REPOSITORY" --json body --jq .body 2>"$errors"); then
  if [ -n "$notes" ] && [ "$notes" != "null" ]; then
    body=$(printf '%s' "$notes" | python3 "$(dirname "$0")/slack-mrkdwn.py")
  else
    body="No release notes provided."
  fi
else
  echo "::warning::Could not read the release notes for $tag from $GITHUB_REPOSITORY: $(tr '\n' ' ' < "$errors")" >&2
  body="No release notes provided."
fi
rm -f "$errors"
printf '%s\n\n%s\n' "$header" "$body"
