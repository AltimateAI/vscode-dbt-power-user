"""
GitHub Issues Dashboard
Flask backend that fetches issues from the GitHub REST API with local file-based caching.

Authentication:
  Set GITHUB_TOKEN env var for 5 000 req/hr (unauthenticated = 60 req/hr).

AI analysis:
  Requires the `claude` CLI to be in PATH.
  Uses your existing Claude Code auth (Claude Code Max subscription works).
  No separate ANTHROPIC_API_KEY needed.

Usage:
  cd monitoring/github_issues
  pip install -r requirements.txt
  GITHUB_TOKEN=<pat> python app.py
  # Open http://localhost:5051
"""

import json
import os
import shutil
import subprocess
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path

import requests
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

REPO = "AltimateAI/vscode-dbt-power-user"
GITHUB_API = "https://api.github.com"

CACHE_DIR = Path(__file__).parent / ".cache"
ISSUES_CACHE = CACHE_DIR / "issues.json"
AI_THEMES_CACHE = CACHE_DIR / "ai_themes.json"
ISSUES_CACHE_TTL = 3600   # 1 hour
AI_CACHE_TTL = 14400      # 4 hours


# ---------------------------------------------------------------------------
# GitHub data fetching + caching
# ---------------------------------------------------------------------------

def _github_headers() -> dict:
    token = os.environ.get("GITHUB_TOKEN")
    headers = {"Accept": "application/vnd.github.v3+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def _fetch_all_issues() -> list[dict]:
    """Fetch every issue (not PR) from GitHub with full pagination.

    GitHub's REST Issues API caps pagination at 1000 results (page 10 × per_page 100).
    A 422 on page > 10 means we've hit that ceiling — stop gracefully.
    """
    issues: list[dict] = []
    page = 1
    while True:
        resp = requests.get(
            f"{GITHUB_API}/repos/{REPO}/issues",
            headers=_github_headers(),
            params={"state": "all", "per_page": 100, "page": page},
            timeout=30,
        )
        if resp.status_code == 422:
            # GitHub caps the Issues API at 1000 results; stop here
            print(f"[github] page {page} returned 422 (API cap reached), stopping")
            break
        if resp.status_code == 403:
            remaining = resp.headers.get("X-RateLimit-Remaining", "?")
            reset = resp.headers.get("X-RateLimit-Reset", "?")
            raise RuntimeError(
                f"GitHub API rate limit exceeded (remaining={remaining}, reset={reset}). "
                "Set the GITHUB_TOKEN environment variable to increase the limit to 5000 req/hr: "
                "  GITHUB_TOKEN=<your-pat> python app.py"
            )
        resp.raise_for_status()
        batch = resp.json()
        if not batch:
            break
        # GitHub's issues endpoint returns PRs too — exclude them
        issues.extend(i for i in batch if "pull_request" not in i)
        if len(batch) < 100:
            break
        page += 1
    print(f"[github] fetched {len(issues)} issues across {page} page(s)")
    return issues


def load_issues(force: bool = False) -> list[dict]:
    """Return cached issues, refreshing from GitHub if cache is stale."""
    if not force and ISSUES_CACHE.exists():
        data = json.loads(ISSUES_CACHE.read_text())
        if time.time() - data["fetched_at"] < ISSUES_CACHE_TTL:
            return data["issues"]
    CACHE_DIR.mkdir(exist_ok=True)
    issues = _fetch_all_issues()
    ISSUES_CACHE.write_text(json.dumps({"fetched_at": time.time(), "issues": issues}))
    return issues


# ---------------------------------------------------------------------------
# Date helpers
# ---------------------------------------------------------------------------

def _parse(s: str | None) -> datetime | None:
    if not s:
        return None
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def _now() -> datetime:
    return datetime.now(tz=timezone.utc)


# ---------------------------------------------------------------------------
# Filter helpers
# ---------------------------------------------------------------------------

def _get_params() -> tuple[int, str, str, str]:
    days = int(request.args.get("days", 90))
    state = request.args.get("state", "all")   # open | closed | all
    label = request.args.get("label", "All")
    milestone = request.args.get("milestone", "All")
    return days, state, label, milestone


def _apply_filters(
    issues: list[dict],
    state: str,
    label: str,
    milestone: str,
) -> list[dict]:
    out = issues
    if state != "all":
        out = [i for i in out if i["state"] == state]
    if label != "All":
        out = [i for i in out if any(lb["name"] == label for lb in i.get("labels", []))]
    if milestone != "All":
        out = [i for i in out if i.get("milestone") and i["milestone"]["title"] == milestone]
    return out


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/refresh", methods=["POST"])
def api_refresh():
    load_issues(force=True)
    if AI_THEMES_CACHE.exists():
        AI_THEMES_CACHE.unlink()
    return jsonify({"ok": True})


@app.route("/api/filter-options")
def api_filter_options():
    issues = load_issues()
    labels: dict[str, str] = {}
    milestones: set[str] = set()
    for issue in issues:
        for lb in issue.get("labels", []):
            labels.setdefault(lb["name"], lb.get("color", "888888"))
        ms = issue.get("milestone")
        if ms:
            milestones.add(ms["title"])
    return jsonify({
        "labels": [{"name": n, "color": c} for n, c in sorted(labels.items())],
        "milestones": sorted(milestones),
    })


@app.route("/api/summary")
def api_summary():
    days, state, label, milestone = _get_params()
    issues = load_issues()
    cutoff = _now() - timedelta(days=days)

    # "Open count" always reflects current open state (filtered by label/milestone only)
    open_issues = _apply_filters(issues, "open", label, milestone)

    # "Opened / closed in period" respects all filters
    all_filtered = _apply_filters(issues, state if state != "all" else "all", label, milestone)

    opened = [i for i in all_filtered if _parse(i["created_at"]) and _parse(i["created_at"]) >= cutoff]
    closed_in_period = [
        i for i in all_filtered
        if i["state"] == "closed" and _parse(i.get("closed_at")) and _parse(i["closed_at"]) >= cutoff
    ]

    close_times = []
    for i in closed_in_period:
        c = _parse(i["created_at"])
        cl = _parse(i["closed_at"])
        if c and cl:
            close_times.append((cl - c).total_seconds() / 86400)
    avg_close = round(sum(close_times) / len(close_times), 1) if close_times else None

    no_response = [
        i for i in open_issues
        if i.get("comments", 0) == 0 and not i.get("assignee")
    ]

    return jsonify({
        "openCount": len(open_issues),
        "openedInPeriod": len(opened),
        "closedInPeriod": len(closed_in_period),
        "avgDaysToClose": avg_close,
        "noResponseCount": len(no_response),
    })


@app.route("/api/trend")
def api_trend():
    days, _, label, milestone = _get_params()
    issues = load_issues()
    cutoff = _now() - timedelta(days=days)
    filtered = _apply_filters(issues, "all", label, milestone)

    use_weeks = days > 60
    grain = timedelta(days=7 if use_weeks else 1)

    # Build ordered bucket keys
    buckets: dict[str, dict] = {}
    ptr = cutoff.replace(hour=0, minute=0, second=0, microsecond=0)
    end = _now().replace(hour=0, minute=0, second=0, microsecond=0)
    while ptr <= end:
        key = ptr.strftime("%Y-%m-%d")
        buckets[key] = {"date": key, "opened": 0, "closed": 0}
        ptr += grain

    def _bucket(dt: datetime) -> str:
        if use_weeks:
            delta_days = max(0, (dt - cutoff).days)
            bucket_start = cutoff + timedelta(days=(delta_days // 7) * 7)
            bucket_start = bucket_start.replace(hour=0, minute=0, second=0, microsecond=0)
        else:
            bucket_start = dt.replace(hour=0, minute=0, second=0, microsecond=0)
        return bucket_start.strftime("%Y-%m-%d")

    for issue in filtered:
        created = _parse(issue["created_at"])
        if created and created >= cutoff:
            k = _bucket(created)
            if k in buckets:
                buckets[k]["opened"] += 1
        if issue["state"] == "closed":
            closed_dt = _parse(issue.get("closed_at"))
            if closed_dt and closed_dt >= cutoff:
                k = _bucket(closed_dt)
                if k in buckets:
                    buckets[k]["closed"] += 1

    return jsonify(sorted(buckets.values(), key=lambda x: x["date"]))


@app.route("/api/labels")
def api_labels():
    _, state, _, milestone = _get_params()
    issues = load_issues()
    # Show label distribution across all labels (don't filter by label here)
    filtered = _apply_filters(issues, state, "All", milestone)

    counts: dict[str, dict] = {}
    for issue in filtered:
        for lb in issue.get("labels", []):
            name = lb["name"]
            counts.setdefault(name, {"name": name, "color": lb.get("color", "888888"), "count": 0})
            counts[name]["count"] += 1

    result = sorted(counts.values(), key=lambda x: x["count"], reverse=True)[:20]
    return jsonify(result)


@app.route("/api/age-buckets")
def api_age_buckets():
    _, _, label, milestone = _get_params()
    issues = load_issues()
    open_issues = _apply_filters(issues, "open", label, milestone)

    buckets = {
        "< 7 days": 0,
        "7–30 days": 0,
        "1–3 months": 0,
        "3–6 months": 0,
        "> 6 months": 0,
    }
    now = _now()
    for issue in open_issues:
        created = _parse(issue["created_at"])
        if not created:
            continue
        age = (now - created).days
        if age < 7:
            buckets["< 7 days"] += 1
        elif age < 30:
            buckets["7–30 days"] += 1
        elif age < 90:
            buckets["1–3 months"] += 1
        elif age < 180:
            buckets["3–6 months"] += 1
        else:
            buckets["> 6 months"] += 1

    return jsonify([{"bucket": k, "count": v} for k, v in buckets.items()])


@app.route("/api/time-to-close")
def api_time_to_close():
    days, _, label, milestone = _get_params()
    issues = load_issues()
    cutoff = _now() - timedelta(days=days)

    closed = [
        i for i in issues
        if i["state"] == "closed"
        and _parse(i.get("closed_at")) is not None
        and _parse(i["closed_at"]) >= cutoff
    ]
    closed = _apply_filters(closed, "closed", label, milestone)

    buckets = {
        "< 1 day": 0,
        "1–7 days": 0,
        "1–4 weeks": 0,
        "1–3 months": 0,
        "> 3 months": 0,
    }
    for issue in closed:
        created = _parse(issue["created_at"])
        closed_at = _parse(issue["closed_at"])
        if not created or not closed_at:
            continue
        age = (closed_at - created).total_seconds() / 86400
        if age < 1:
            buckets["< 1 day"] += 1
        elif age < 7:
            buckets["1–7 days"] += 1
        elif age < 28:
            buckets["1–4 weeks"] += 1
        elif age < 90:
            buckets["1–3 months"] += 1
        else:
            buckets["> 3 months"] += 1

    return jsonify([{"bucket": k, "count": v} for k, v in buckets.items()])


@app.route("/api/milestones")
def api_milestones():
    _, state, label, _ = _get_params()
    issues = load_issues()
    if label != "All":
        issues = [i for i in issues if any(lb["name"] == label for lb in i.get("labels", []))]
    if state != "all":
        issues = [i for i in issues if i["state"] == state]

    ms_data: dict[str, dict] = {}
    for issue in issues:
        ms = issue.get("milestone")
        if not ms:
            continue
        title = ms["title"]
        ms_data.setdefault(title, {
            "title": title,
            "url": ms.get("html_url", ""),
            "open": 0,
            "closed": 0,
        })
        ms_data[title][issue["state"]] = ms_data[title].get(issue["state"], 0) + 1

    result = sorted(ms_data.values(), key=lambda x: x["open"] + x["closed"], reverse=True)
    return jsonify(result)


@app.route("/api/attention")
def api_attention():
    _, _, label, milestone = _get_params()
    issues = load_issues()
    open_issues = _apply_filters(issues, "open", label, milestone)

    now = _now()
    stale_age_cutoff = now - timedelta(days=90)
    stale_activity_cutoff = now - timedelta(days=30)

    def _fmt(i: dict) -> dict:
        created = _parse(i["created_at"])
        age_days = (now - created).days if created else 0
        return {
            "number": i["number"],
            "title": i["title"],
            "url": i["html_url"],
            "age_days": age_days,
            "comments": i.get("comments", 0),
            "labels": [lb["name"] for lb in i.get("labels", [])],
            "assignee": i["assignee"]["login"] if i.get("assignee") else None,
            "updated_at": i.get("updated_at"),
        }

    no_response = sorted(
        [_fmt(i) for i in open_issues if i.get("comments", 0) == 0 and not i.get("assignee")],
        key=lambda x: x["age_days"],
        reverse=True,
    )[:30]

    no_labels = sorted(
        [_fmt(i) for i in open_issues if not i.get("labels")],
        key=lambda x: x["age_days"],
        reverse=True,
    )[:30]

    stale = sorted(
        [
            _fmt(i) for i in open_issues
            if _parse(i["created_at"]) and _parse(i["created_at"]) <= stale_age_cutoff
            and _parse(i.get("updated_at") or i["created_at"]) <= stale_activity_cutoff
        ],
        key=lambda x: x["age_days"],
        reverse=True,
    )[:30]

    return jsonify({"noResponse": no_response, "noLabels": no_labels, "stale": stale})


@app.route("/api/details")
def api_details():
    _, state, label, milestone = _get_params()
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 50))

    issues = load_issues()
    filtered = _apply_filters(issues, state, label, milestone)
    # Sort by most recently updated
    filtered = sorted(
        filtered,
        key=lambda i: i.get("updated_at") or i["created_at"],
        reverse=True,
    )

    now = _now()
    total = len(filtered)
    start = (page - 1) * per_page
    page_issues = filtered[start : start + per_page]

    def _fmt(i: dict) -> dict:
        created = _parse(i["created_at"])
        age_days = (now - created).days if created else 0
        return {
            "number": i["number"],
            "title": i["title"],
            "url": i["html_url"],
            "state": i["state"],
            "created_at": i["created_at"],
            "age_days": age_days,
            "comments": i.get("comments", 0),
            "labels": [
                {"name": lb["name"], "color": lb.get("color", "888888")}
                for lb in i.get("labels", [])
            ],
            "assignee": i["assignee"]["login"] if i.get("assignee") else None,
            "milestone": i["milestone"]["title"] if i.get("milestone") else None,
        }

    return jsonify({
        "issues": [_fmt(i) for i in page_issues],
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": max(1, (total + per_page - 1) // per_page),
    })


@app.route("/api/ai-themes")
def api_ai_themes():
    if not shutil.which("claude"):
        return jsonify({"enabled": False, "reason": "claude CLI not found in PATH"})

    issues = load_issues()
    open_issues = [i for i in issues if i["state"] == "open"]
    issue_count = len(open_issues)

    # Return cached result if still fresh and issue count matches
    if AI_THEMES_CACHE.exists():
        cached = json.loads(AI_THEMES_CACHE.read_text())
        if (
            time.time() - cached["fetched_at"] < AI_CACHE_TTL
            and cached.get("issue_count") == issue_count
        ):
            return jsonify({"enabled": True, "themes": cached["themes"]})

    # Build the prompt — cap at 80 issues to keep prompt size manageable
    sample = open_issues[:80]
    # Compact plain-text list is smaller than JSON and easier for the model
    issue_lines = "\n".join(f"#{i['number']}: {i['title']}" for i in sample)

    prompt = (
        f"You are analyzing GitHub issues for the 'vscode-dbt-power-user' VS Code extension "
        f"(a dbt development tool by Altimate AI).\n\n"
        f"Here are {len(sample)} open issues:\n"
        f"{issue_lines}\n\n"
        f"Group these issues into 8-12 meaningful themes based on their titles. "
        f"Each theme should represent a distinct area of concern (bug category, feature area, etc.).\n\n"
        f"Respond with ONLY valid JSON — no markdown fences, no explanation text. "
        f"The output must be a JSON array where each element has exactly these keys:\n"
        f'  "theme": short theme name (3-6 words),\n'
        f'  "description": one sentence describing what these issues share,\n'
        f'  "issue_numbers": array of integer issue numbers that belong to this theme.\n\n'
        f"Order themes from most issues to fewest."
    )

    try:
        result = subprocess.run(
            ["claude", "--model", "haiku", "-p", prompt],
            capture_output=True,
            text=True,
            timeout=300,
        )
    except subprocess.TimeoutExpired:
        return jsonify({"enabled": True, "error": "Claude CLI timed out after 300s", "themes": []})

    if result.returncode != 0:
        err = (result.stderr or result.stdout)[:300]
        return jsonify({"enabled": True, "error": f"claude CLI exited {result.returncode}: {err}", "themes": []})

    output = result.stdout.strip()

    # Strip markdown code fences if Claude wrapped the JSON anyway
    if output.startswith("```"):
        lines = output.splitlines()
        # Drop first line (```json or ```) and last line (```)
        inner = lines[1:-1] if lines[-1].strip() == "```" else lines[1:]
        output = "\n".join(inner).strip()

    try:
        themes = json.loads(output)
    except json.JSONDecodeError as exc:
        return jsonify({"enabled": True, "error": f"JSON parse error: {exc}", "themes": [], "raw": output[:500]})

    # Enrich each theme with full issue details (title + URL)
    issue_map = {i["number"]: i["title"] for i in sample}  # sample is still the list of dicts
    for theme in themes:
        numbers = theme.get("issue_numbers", [])
        theme["issues"] = [
            {
                "number": n,
                "title": issue_map.get(n, ""),
                "url": f"https://github.com/{REPO}/issues/{n}",
            }
            for n in numbers[:10]  # cap at 10 representative issues per theme
        ]

    CACHE_DIR.mkdir(exist_ok=True)
    AI_THEMES_CACHE.write_text(json.dumps({
        "fetched_at": time.time(),
        "issue_count": issue_count,
        "themes": themes,
    }))

    return jsonify({"enabled": True, "themes": themes})


if __name__ == "__main__":
    app.run(debug=True, port=5051)
