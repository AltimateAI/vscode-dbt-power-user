// Classifies the errors the lineage panel shows, for telemetry. The first
// matching rule wins, so the order matters: a packages error raised while dbt
// parses the project is "packages", not "project".
export type LineageErrorKind =
  | "integration"
  | "dbt_not_found"
  | "packages"
  | "unclosed_jinja"
  | "env_var"
  | "profile"
  | "missing_reference"
  | "project"
  | "other";

const RULES: [LineageErrorKind, string[]][] = [
  // The bridge, the dbt Cloud CLI or the manifest file, not the user's project.
  [
    "integration",
    [
      "sigkill",
      "sigterm",
      "python process closed",
      "python bridge",
      "session occupied",
      "unable to parse dbt cloud cli response",
      "writablemanifest",
    ],
  ],
  [
    "dbt_not_found",
    [
      "dbt not found",
      "command not found",
      "no module named",
      "is not installed",
    ],
  ],
  [
    "packages",
    [
      "packages.yml",
      "dbt deps",
      "failed to read package",
      "dbt_packages",
      "dbt_modules",
    ],
  ],
  [
    "unclosed_jinja",
    [
      "unexpected eof",
      "reached eof",
      "close tag",
      "nested tags",
      "control flow",
      "unclosed",
    ],
  ],
  ["env_var", ["env var required"]],
  ["profile", ["profile", "credential", "does not have a target named"]],
  [
    "missing_reference",
    ["depends on a node named", "depends on a source named", "depends on doc"],
  ],
  [
    "project",
    [
      "compilation",
      "parsing error",
      "runtime error",
      "problem in your dbt project",
      "no such file",
      "dbt configuration is invalid",
      "dbt_project.yml is invalid",
    ],
  ],
];

export function classifyLineageError(message: string): LineageErrorKind {
  const text = message.toLowerCase();
  for (const [kind, patterns] of RULES) {
    if (patterns.some((pattern) => text.includes(pattern))) {
      return kind;
    }
  }
  return "other";
}

// The size of a project as a bucket, so the success event can be split by it
// without sending exact counts.
export function nodeCountBucket(count: number): string {
  if (count === 0) {
    return "0";
  }
  if (count < 100) {
    return "1-99";
  }
  if (count < 500) {
    return "100-499";
  }
  if (count < 2000) {
    return "500-1999";
  }
  if (count < 10000) {
    return "2000-9999";
  }
  return "10000+";
}
