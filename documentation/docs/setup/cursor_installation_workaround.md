---
title: Cursor Installation Troubleshooting — Power User for dbt
description: "What to do when installing Power User for dbt in Cursor IDE spins without progress, or when the extension does not show up in search."
---

# Cursor IDE: Installation Troubleshooting

## Install spins with no progress

In Cursor versions before 3.11.13, clicking **Install** on a Power User for dbt release before 0.70.0 in the Extensions view can spin with no progress. Cursor's pre-install dependency check keeps re-querying the marketplace for the Python extension and never finishes, so nothing downloads. Sometimes it ends with a **"Failed to fetch"** error and the button goes back to **Install**.

Try these fixes in order:

1. **Update Cursor to 3.11.13 or later.** Cursor fixed this in 3.11.13 (July 2026). After updating, install from the Extensions view as usual.
2. **Install from the command line.** This skips the dependency check:

    ```bash
    cursor --install-extension innoverio.vscode-dbt-power-user
    ```

From Power User **0.70.0**, the Python extension and Better Jinja are no longer required dependencies, so the install does not get stuck even on older Cursor versions.

### Fallback: install from a VSIX file

If neither fix works, install the extension from a `.vsix` file:

1. Open the [Power User for dbt page on Open VSX](https://open-vsx.org/extension/innoverio/vscode-dbt-power-user) and download the latest version for your operating system.
2. In Cursor, open the Command Palette (`Cmd + Shift + P` on macOS, `Ctrl + Shift + P` on Windows/Linux), run **Extensions: Install from VSIX...**, and select the downloaded file.

## Extension does not appear in search

When you are not signed in to Cursor, the Extensions view is hidden and marketplace search returns nothing, for every extension. Install Power User by ID with the command line above, or sign in and try again.

## What a fresh install brings

Installing Power User for dbt also installs the Altimate MCP server, and on releases before 0.70.0 also the Python extension and Better Jinja; before installing, Cursor asks whether you trust their publishers.

The Python extension is still needed for the dbt Core and dbt Cloud CLI integrations, and Power User prompts you to install it; dbt Fusion works without it.

---

/// admonition | Still having issues?
    type: tip

If none of these steps resolves the problem, please reach out on the [#tools-dbt-power-user](https://getdbt.slack.com/archives/C05KPDGRMDW) Slack channel or [contact support](https://www.altimate.ai/support?utm_source=help-docs&utm_medium=referral&utm_campaign=docs-inline-link).
///
