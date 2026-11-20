// Pure helpers for the VS Code install check (.github/vscode-install/cell.mjs).
import { compareVersions } from "../cursor-install/lib.mjs";

export const MARKETPLACE_QUERY =
  "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery";

const PRE_RELEASE = "Microsoft.VisualStudio.Code.PreRelease";

// Request body for every version of one extension, with each version's properties
// (IncludeVersions | IncludeVersionProperties).
export function versionsQuery(extensionId) {
  return {
    filters: [
      {
        criteria: [{ filterType: 7, value: extensionId }],
        pageNumber: 1,
        pageSize: 1,
      },
    ],
    flags: 0x1 | 0x10,
  };
}

// The versions a Marketplace query lists: one entry per version and target.
export function versionsFromQuery(json) {
  const ext = json?.results?.[0]?.extensions?.[0];
  if (!ext) return [];
  return ext.versions.map((v) => ({
    version: v.version,
    target: v.targetPlatform || "universal",
    preRelease: (v.properties || []).some(
      (p) => p.key === PRE_RELEASE && p.value === "true",
    ),
  }));
}

// The release an upgrade starts from: the newest stable version, published for `target` or
// universal, that is older than `version`.
export function pickBaseline(versions, target, version) {
  const older = versions.filter(
    (v) =>
      !v.preRelease &&
      (v.target === target || v.target === "universal") &&
      compareVersions(v.version, version) < 0,
  );
  older.sort((a, b) => compareVersions(b.version, a.version));
  return older[0]?.version;
}

// The dbt project the check opens: one model, a DuckDB profile, no packages.
export function projectFiles(name, duckdbPath) {
  return {
    "dbt_project.yml": [
      `name: ${name}`,
      `profile: ${name}`,
      "version: '1.0.0'",
      "model-paths: ['models']",
      "",
    ].join("\n"),
    [`models/${name}.sql`]: "select 1 as id\n",
    "profiles/profiles.yml": [
      `${name}:`,
      "  target: dev",
      "  outputs:",
      "    dev:",
      "      type: duckdb",
      // Forward slashes: a Windows path in single quotes needs no escaping.
      `      path: '${duckdbPath.replace(/\\/g, "/")}'`,
      "      threads: 1",
      "",
    ].join("\n"),
  };
}

// Arguments for the editor's CLI on Windows, which runs `code.cmd` through a shell: quote what a
// shell would split.
export function shellQuote(args) {
  return args.map((a) => (/[\s"&|<>^]/.test(a) ? `"${a}"` : a));
}

// The file cell.mjs writes into a --work folder it creates.
export const WORK_MARKER = ".vscode-install-work";

// Whether cell.mjs may delete --work before a run: only a folder that doesn't exist, is empty, or
// was created by cell.mjs (it holds WORK_MARKER). `entries` is the folder's file names, or
// undefined when it doesn't exist.
export function mayClearWork(entries) {
  return (
    entries === undefined ||
    entries.length === 0 ||
    entries.includes(WORK_MARKER)
  );
}
