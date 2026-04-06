"""
dbt Power User — Error Analysis Dashboard
Flask backend that queries Azure Application Insights telemetry.
Authentication: uses AzureCliCredential (requires `az login`).
"""

from datetime import timedelta
from flask import Flask, jsonify, render_template, request
from azure.identity import AzureCliCredential
from azure.monitor.query import LogsQueryClient, LogsQueryStatus

app = Flask(__name__)

RESOURCE_ID = (
    "/subscriptions/6ff315ea-c5a6-43fc-aabf-7f1bf1287582"
    "/resourceGroups/altimate-staging"
    "/providers/microsoft.insights/components/dbt-power-user-telemetry-staging"
)

ERROR_FILTER = """(name contains "Error" or name contains "error" or name == "unhandlederror")"""
SHORT_NAME_KQL = 'iif(name contains "/", tostring(split(name, "/", 1)[0]), name)'

VALID_MODES = {"All", "core", "cloud", "fusion", "corecommand"}

_client: LogsQueryClient | None = None


def get_client() -> LogsQueryClient:
    global _client
    if _client is None:
        _client = LogsQueryClient(AzureCliCredential())
    return _client


def run_query(kql: str, days: int) -> list[dict]:
    """Execute a KQL query against App Insights and return rows as list of dicts."""
    response = get_client().query_resource(
        RESOURCE_ID,
        kql,
        timespan=timedelta(days=days),
    )
    if response.status == LogsQueryStatus.PARTIAL:
        table = response.partial_data[0]
    elif response.status == LogsQueryStatus.SUCCESS:
        table = response.tables[0]
    else:
        raise RuntimeError(f"Query failed: {response.partial_error}")

    columns = list(table.columns)
    rows = []
    for row in table.rows:
        record = {}
        for col, val in zip(columns, row):
            if hasattr(val, "isoformat"):
                val = val.isoformat()
            record[col] = val
        rows.append(record)
    return rows


def dim_filter(key: str, value: str) -> str:
    """KQL fragment that filters on a customDimensions key; no-op when value is 'All'."""
    if value == "All":
        return ""
    return f'| where tostring(customDimensions["{key}"]) == "{value}"'


def get_params() -> tuple[int, str, str]:
    days = int(request.args.get("days", 7))
    mode = request.args.get("mode", "All")
    version = request.args.get("version", "All")
    if mode not in VALID_MODES:
        mode = "All"
    return days, mode, version


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/versions")
def api_versions():
    days, _, _ = get_params()
    kql = """
customEvents
| extend extVersion = tostring(customDimensions["common.extversion"])
| where isnotempty(extVersion) and extVersion != "undefined"
| summarize by extVersion
| order by extVersion desc
| project extVersion
"""
    rows = run_query(kql, days)
    return jsonify([r["extVersion"] for r in rows])


@app.route("/api/summary")
def api_summary():
    days, mode, version = get_params()
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("dbtIntegrationMode", mode)}
{dim_filter("common.extversion", version)}
| extend instanceName = tostring(customDimensions["instanceName"])
| extend shortName = {SHORT_NAME_KQL}
| summarize
    TotalErrors = count(),
    UniqueTypes = dcount(shortName),
    AffectedInstances = dcountif(instanceName, isnotempty(instanceName) and instanceName != "undefined" and instanceName != "")
"""
    rows = run_query(kql, days)
    if rows:
        r = rows[0]
        return jsonify({
            "totalErrors": r.get("TotalErrors", 0),
            "uniqueTypes": r.get("UniqueTypes", 0),
            "affectedInstances": r.get("AffectedInstances", 0),
        })
    return jsonify({"totalErrors": 0, "uniqueTypes": 0, "affectedInstances": 0})


@app.route("/api/trend")
def api_trend():
    days, mode, version = get_params()
    grain = "1h" if days <= 2 else "1d"
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("dbtIntegrationMode", mode)}
{dim_filter("common.extversion", version)}
| summarize Count = count() by bin(timestamp, {grain})
| order by timestamp asc
"""
    rows = run_query(kql, days)
    return jsonify([{"timestamp": r["timestamp"], "count": r["Count"]} for r in rows])


@app.route("/api/top-errors")
def api_top_errors():
    days, mode, version = get_params()
    limit = int(request.args.get("limit", 15))
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("dbtIntegrationMode", mode)}
{dim_filter("common.extversion", version)}
| extend shortName = {SHORT_NAME_KQL}
| extend integrationMode = tostring(customDimensions["dbtIntegrationMode"])
| summarize Count = count(), Modes = make_set(integrationMode, 10) by shortName
| top {limit} by Count desc
| extend ModeList = strcat_array(Modes, ", ")
| project shortName, Count, ModeList
| order by Count desc
"""
    rows = run_query(kql, days)
    return jsonify([
        {"name": r["shortName"], "count": r["Count"], "modes": r["ModeList"]}
        for r in rows
    ])


@app.route("/api/by-mode")
def api_by_mode():
    days, _, version = get_params()
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("common.extversion", version)}
| extend integrationMode = tostring(customDimensions["dbtIntegrationMode"])
| extend integrationMode = iif(isempty(integrationMode) or integrationMode == "undefined", "unknown", integrationMode)
| summarize Count = count() by integrationMode
| order by Count desc
"""
    rows = run_query(kql, days)
    return jsonify([{"mode": r["integrationMode"], "count": r["Count"]} for r in rows])


@app.route("/api/by-platform")
def api_by_platform():
    days, mode, version = get_params()
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("dbtIntegrationMode", mode)}
{dim_filter("common.extversion", version)}
| extend os = tostring(customDimensions["common.os"])
| extend arch = tostring(customDimensions["common.nodeArch"])
| extend os = iif(isempty(os) or os == "undefined", "unknown", os)
| extend arch = iif(isempty(arch) or arch == "undefined", "unknown", arch)
| extend platform = strcat(os, " / ", arch)
| summarize Count = count() by platform
| order by Count desc
"""
    rows = run_query(kql, days)
    return jsonify([{"platform": r["platform"], "count": r["Count"]} for r in rows])


@app.route("/api/by-version")
def api_by_version():
    days, mode, _ = get_params()
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("dbtIntegrationMode", mode)}
| extend extVersion = tostring(customDimensions["common.extversion"])
| extend extVersion = iif(isempty(extVersion) or extVersion == "undefined", "unknown", extVersion)
| summarize Count = count() by extVersion
| order by Count desc
"""
    rows = run_query(kql, days)
    return jsonify([{"version": r["extVersion"], "count": r["Count"]} for r in rows])


@app.route("/api/unhandled")
def api_unhandled():
    days, mode, version = get_params()
    kql = f"""
customEvents
| where name == "unhandlederror"
{dim_filter("dbtIntegrationMode", mode)}
{dim_filter("common.extversion", version)}
| extend
    errorMessage = tostring(customDimensions["message"]),
    extVersion = tostring(customDimensions["common.extversion"]),
    integrationMode = tostring(customDimensions["dbtIntegrationMode"])
| extend messageGroup = case(
    errorMessage contains "Channel closed",      "Channel closed (python-bridge)",
    errorMessage contains "ENOENT",              "File not found (ENOENT)",
    errorMessage contains "ECONNREFUSED",        "Connection refused (ECONNREFUSED)",
    errorMessage contains "ETIMEDOUT",           "Connection timeout (ETIMEDOUT)",
    errorMessage contains "EPERM",               "Permission denied (EPERM)",
    isempty(errorMessage) or errorMessage == "undefined", "(no message)",
    substring(errorMessage, 0, 80))
| summarize
    Count = count(),
    Versions = strcat_array(make_set(extVersion, 5), ", "),
    Modes = strcat_array(make_set(integrationMode, 5), ", ")
    by messageGroup
| order by Count desc
"""
    rows = run_query(kql, days)
    return jsonify([
        {"group": r["messageGroup"], "count": r["Count"], "versions": r["Versions"], "modes": r["Modes"]}
        for r in rows
    ])


@app.route("/api/details")
def api_details():
    days, mode, version = get_params()
    limit = int(request.args.get("limit", 500))
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("dbtIntegrationMode", mode)}
{dim_filter("common.extversion", version)}
| extend
    shortName      = {SHORT_NAME_KQL},
    errorMessage   = tostring(customDimensions["message"]),
    integrationMode = tostring(customDimensions["dbtIntegrationMode"]),
    extVersion     = tostring(customDimensions["common.extversion"]),
    os             = tostring(customDimensions["common.os"]),
    arch           = tostring(customDimensions["common.nodeArch"]),
    ideApp         = tostring(customDimensions["ide"]),
    stackTrace     = tostring(customDimensions["stack"])
| project timestamp, shortName, errorMessage, integrationMode, extVersion, os, arch, ideApp, stackTrace
| order by timestamp desc
| take {limit}
"""
    rows = run_query(kql, days)
    return jsonify([
        {
            "timestamp": r["timestamp"],
            "name": r["shortName"],
            "message": r["errorMessage"],
            "mode": r["integrationMode"],
            "version": r["extVersion"],
            "os": r["os"],
            "arch": r["arch"],
            "ide": r["ideApp"],
            "stack": r["stackTrace"],
        }
        for r in rows
    ])


@app.route("/api/stack-analysis")
def api_stack_analysis():
    days, mode, version = get_params()
    kql = f"""
customEvents
| where {ERROR_FILTER}
{dim_filter("dbtIntegrationMode", mode)}
{dim_filter("common.extversion", version)}
| extend stack = tostring(customDimensions["stack"])
| where isnotempty(stack) and stack != "undefined"
| extend shortName = {SHORT_NAME_KQL}
| extend integrationMode = tostring(customDimensions["dbtIntegrationMode"])
| extend extVersion = tostring(customDimensions["common.extversion"])
| extend RootCause = case(
    stack contains "no profile was specified for this dbt project",    "No Profile Specified",
    stack contains "Could not find profile named",                      "Profile Not Found",
    stack contains "No module named 'dbt.adapters.",                   "dbt Adapters Module Missing",
    stack contains "No module named 'dbt'",                            "dbt Module Not Installed",
    stack contains "No module named",                                   "Python Module Not Found",
    stack contains "dbt.exceptions.FailedToConnectError",              "dbt: Failed to Connect",
    stack contains "dbt.exceptions.EnvVarMissingError",                "dbt: Env Var Missing",
    stack contains "dbt.exceptions.UninstalledPackagesFoundError",     "dbt: Uninstalled Packages",
    stack contains "dbt.exceptions.ParsingException",                  "dbt: Parsing Exception",
    stack contains "dbt.exceptions.ParsingError",                      "dbt: Parsing Error",
    stack contains "dbt.exceptions.CompilationException",              "dbt: Compilation Exception",
    stack contains "dbt.exceptions.CompilationError",                  "dbt: Compilation Error",
    stack contains "dbt.exceptions.TargetNotFoundError",               "dbt: Target Not Found",
    stack contains "dbt.exceptions.DbtProfileError",                   "dbt: Profile Error",
    stack contains "dbt.exceptions.DbtProjectError",                   "dbt: Project Error",
    stack contains "dbt.exceptions.DbtValidationError",                "dbt: Validation Error",
    stack contains "dbt.exceptions.CaughtMacroErrorWithNodeError",     "dbt: Caught Macro Error",
    stack contains "dbt.exceptions",                                    "dbt: Generic Exception",
    stack contains "YAMLParseError",                                    "YAML Parse Error",
    stack contains "DB::Exception",                                     "Database Exception",
    stack contains "FileNotFoundError",                                 "Python: File Not Found",
    stack contains "KeyError",                                          "Python: Key Error",
    stack contains "ImportError",                                       "Python: Import Error",
    stack contains "NotImplementedError",                               "Python: Not Implemented",
    stack contains "NameError:",                                        "Python: Name Error",
    stack contains "RuntimeError: release unlocked lock",              "Python: Unlocked Lock",
    stack contains "codec can't decode bytes",                          "Python: Codec Decode Error",
    stack contains "Python process closed with exit code",             "Python Process Exited",
    stack contains "spawn ENOENT",                                      "spawn: dbt Not Found (ENOENT)",
    stack contains "spawn EBADF",                                       "spawn: Bad File Descriptor",
    stack contains "spawn ECONNRESET",                                  "spawn: Connection Reset",
    stack contains "Error: ENOENT: no such file or directory, open",   "ENOENT: File Not Found",
    stack contains "Cannot read properties of",                        "JS: Cannot Read Properties",
    stack contains "AbortError",                                        "JS: Abort Error",
    stack contains "Channel closed",                                    "python-bridge: Channel Closed",
    stack contains "not found: sqlfmt",                                 "sqlfmt Not Found",
    stack contains "ENOTFOUND api.myaltimate.com",                     "Cannot Reach api.myaltimate.com",
    stack contains "FetchError",                                        "JS: Fetch Error",
    stack contains "dbt found following issue: Compilation Error",     "dbt CLI: Compilation Error",
    stack contains "DeprecationWarning",                                "Python: Deprecation Warning",
    stack contains "NotOpenSSLWarning",                                 "Python: OpenSSL Warning",
    "Other / Unclassified")
| summarize
    Count = count(),
    TopEvents = strcat_array(make_set(shortName, 5), ", "),
    TopModes  = strcat_array(make_set(integrationMode, 4), ", "),
    TopVersions = strcat_array(make_set(extVersion, 4), ", ")
    by RootCause
| order by Count desc
| take 100
"""
    rows = run_query(kql, days)
    return jsonify([
        {
            "rootCause": r["RootCause"],
            "count": r["Count"],
            "topEvents": r["TopEvents"],
            "topModes": r["TopModes"],
            "topVersions": r["TopVersions"],
        }
        for r in rows
    ])


if __name__ == "__main__":
    app.run(debug=True, port=5050)
