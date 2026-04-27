# dbt Power User — Error Analysis Dashboard

A local Flask web app that queries the `dbt-power-user-telemetry-staging` Application Insights instance and visualises error patterns across all extension users.

## Prerequisites

- Python 3.9+
- Azure CLI: `brew install azure-cli`
- Logged in to Azure: `az login`
- Access to the `altimate-staging` resource group

## Running Locally

```bash
cd monitoring
pip install -r requirements.txt
python app.py
```

Open **http://localhost:5050** in your browser.

> Note: macOS reserves port 5000 for AirPlay. The app uses port **5050** by default.

## Dashboard Sections

| #   | Section                  | What it shows                                                                         |
| --- | ------------------------ | ------------------------------------------------------------------------------------- |
| 1   | **Summary**              | Total errors, unique error types, affected instances in the selected time window      |
| 2   | **Error Trend**          | Line chart — errors per hour (≤2 days) or per day (>2 days)                           |
| 3   | **Top Errors**           | Horizontal bar chart of top 10 + full table of top 15 with integration mode breakdown |
| 4   | **By Integration Mode**  | Doughnut chart — core vs cloud vs fusion vs corecommand                               |
| 5   | **By OS / Architecture** | Bar chart — darwin/win32/linux × x64/arm64                                            |
| 6   | **By Extension Version** | Bar chart — error count per version (regression detection)                            |
| 7   | **Unhandled Errors**     | Table — `unhandlederror` events grouped by message pattern                            |
| 8   | **Error Details**        | Full paginated table (500 rows, 50/page) with expandable stack traces                 |

## Filters

All sections respond to the three filters in the header bar:

| Filter                | Default     | Options                                       |
| --------------------- | ----------- | --------------------------------------------- |
| **Days**              | Last 7 days | 24h, 7d, 14d, 30d                             |
| **Integration Mode**  | All         | All, core, cloud, fusion, corecommand         |
| **Extension Version** | All         | All + live-fetched versions from App Insights |

Click **↺ Refresh** to re-fetch all data without changing filters.

## App Insights Resource

| Field          | Value                                  |
| -------------- | -------------------------------------- |
| Resource name  | `dbt-power-user-telemetry-staging`     |
| Resource group | `altimate-staging`                     |
| Subscription   | `6ff315ea-c5a6-43fc-aabf-7f1bf1287582` |

The backend queries the `customEvents` table. Error events are identified by:

- `name` containing `"Error"` or `"error"`, **or**
- `name == "unhandlederror"` (uncaught exceptions from the telemetry library)

## API Endpoints

All endpoints accept `days`, `mode`, and `version` query parameters:

| Endpoint                       | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| `GET /api/summary`             | Total errors, unique types, affected instances |
| `GET /api/trend`               | Errors per time bin (hourly or daily)          |
| `GET /api/top-errors?limit=15` | Top N error types with counts and modes        |
| `GET /api/by-mode`             | Count by dbt integration mode                  |
| `GET /api/by-platform`         | Count by OS / architecture                     |
| `GET /api/by-version`          | Count by extension version                     |
| `GET /api/unhandled`           | Unhandled error message groups                 |
| `GET /api/details?limit=500`   | Raw error rows with stack traces               |
| `GET /api/versions`            | Distinct extension versions (for dropdown)     |

## Telemetry Source

Errors are logged from the extension via `src/telemetry/index.ts` using
`sendTelemetryError(eventName, error, properties)`. The TelemetryService
automatically attaches `dbtIntegrationMode`, `instanceName`, `ide`, and
`localMode` to every event, and strips secrets from stack traces.

Named error events are enumerated in `src/telemetry/events.ts`.
