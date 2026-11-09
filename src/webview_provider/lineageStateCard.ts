import * as path from "path";
import { openFileAction, summarizeDbtError } from "./lineageStaleGraph";
import { classifyLineageError } from "./lineageTelemetry";

// The card the lineage panel shows when an error stops it from drawing a graph:
// the problem in plain words, dbt's message, and the action that fixes it.
// Mirrors webview_panels/src/modules/lineage/types.ts.

export type LineageCardKind =
  | "project-error"
  | "space-in-name"
  | "dbt-not-found"
  | "dbt-broken"
  | "profile-not-found"
  | "profile-invalid"
  | "env-var"
  | "packages"
  | "bridge-stopped"
  | "cloud-busy"
  | "other";

export type LineageCardActionId =
  | "openFile"
  | "revealFile"
  | "showProblems"
  | "tryAgain"
  | "selectInterpreter"
  | "installDbt"
  | "runDeps"
  | "showOutput"
  | "openProfiles"
  | "openEnvVarDocs"
  | "getStarted";

export interface LineageCardAction {
  id: LineageCardActionId;
  label: string;
  // The file to open or reveal, its line, and its dbt package when it isn't the
  // root project's.
  args?: { path: string; line?: number; package?: string };
}

export interface LineageCard {
  kind: LineageCardKind;
  severity: "error" | "info";
  title: string;
  detail: string;
  // dbt's message, verbatim.
  dbtMessage: string;
  // The first action is the primary button.
  actions: LineageCardAction[];
  // A problem with the setup, not the project: links the Get Started page, and
  // gets the one toast of the window.
  setup: boolean;
}

export interface LineageCardInput {
  // The error that stops the project from working.
  message: string;
  projectName?: string;
  // The interpreter dbt runs in.
  pythonPath?: string;
  // The profiles.yml dbt reads for this project.
  profilesPath?: string;
  // The re-parse command is registered.
  canReparse: boolean;
}

export const ENV_VAR_DOCS_URL =
  "https://help.altimate.ai/dbt-power-user/setup/optConfig/?utm_source=dbt-power-user&utm_medium=extension#environment-variables-setup";

const SETUP_KINDS: ReadonlySet<LineageCardKind> = new Set([
  "dbt-not-found",
  "dbt-broken",
  "profile-not-found",
  "profile-invalid",
  "env-var",
  "packages",
]);

const IMPORT_FAILURE =
  /no module named|cannot import name|importerror|modulenotfounderror|could not find adapter type/;
// The import that failed is dbt itself, not an adapter or a dependency of dbt.
const DBT_MODULE_MISSING = /no module named '?dbt'?(?![\w.])/;
const PROFILE_PROBLEM =
  /no profile was specified|profiles\.yml|does not have a target named|credentials in profile|not specified in profile/;
const BRIDGE_STOPPED = /sigkill|sigterm|python process closed|python bridge/;

export function lineageCardKind(message: string): LineageCardKind {
  const text = message.toLowerCase();
  if (text.includes("session occupied")) {
    return "cloud-busy";
  }
  if (text.includes("resource names cannot contain spaces")) {
    return "space-in-name";
  }
  const errorKind = classifyLineageError(message);
  if (errorKind === "env_var") {
    return "env-var";
  }
  if (errorKind === "missing_reference") {
    return "project-error";
  }
  if (IMPORT_FAILURE.test(text)) {
    return DBT_MODULE_MISSING.test(text) ? "dbt-not-found" : "dbt-broken";
  }
  switch (errorKind) {
    case "integration":
      return BRIDGE_STOPPED.test(text) ? "bridge-stopped" : "other";
    case "dbt_not_found":
      return "dbt-not-found";
    case "packages":
      return "packages";
    case "profile":
      if (/could not find profile named/.test(text)) {
        return "profile-not-found";
      }
      // dbt Cloud and cloud credential lookups have no profile to open.
      return PROFILE_PROBLEM.test(text) ? "profile-invalid" : "other";
    case "unclosed_jinja":
    case "project":
      return "project-error";
    default:
      return "other";
  }
}

const ADAPTER_MISSING = /could not find adapter type ([\w-]+)/i;
const PROFILE_NAME = /could not find profile named '([^']+)'/i;
const ENV_VAR_NAME = /env var required but not provided: '([^']+)'/i;
// dbt names the file that declares the packages: packages.yml or
// dependencies.yml.
const PACKAGE_COUNTS =
  /found (\d+) package\(s\) specified in (packages|dependencies)\.yml, but only (\d+) package\(s\) installed/i;
// Unlike a file dbt names in an error, this one has a space in its name.
const FILE_WITH_SPACE = /\(([^()]+ [^()]*\.(?:sql|py|yml|yaml|csv))\)/;

const SELECT_INTERPRETER: LineageCardAction = {
  id: "selectInterpreter",
  label: "Select Python interpreter",
};
const SHOW_PROBLEMS: LineageCardAction = {
  id: "showProblems",
  label: "Show all problems",
};
const SHOW_OUTPUT: LineageCardAction = {
  id: "showOutput",
  label: "Show output",
};
const OPEN_PROFILES: LineageCardAction = {
  id: "openProfiles",
  label: "Open profiles.yml",
};

export function lineageCard(input: LineageCardInput): LineageCard {
  const kind = lineageCardKind(input.message);
  const error = summarizeDbtError(input.message);
  const python = input.pythonPath ?? "the selected Python environment";
  const profiles = input.profilesPath ?? "profiles.yml";
  const copy = (
    title: string,
    detail: string,
    actions: LineageCardAction[],
  ): LineageCard => ({
    kind,
    severity: kind === "cloud-busy" ? "info" : "error",
    title,
    detail,
    dbtMessage: error.message,
    actions: input.canReparse
      ? [...actions, { id: "tryAgain", label: "Try again" }]
      : actions,
    setup: SETUP_KINDS.has(kind),
  });

  switch (kind) {
    case "project-error": {
      const where = error.file
        ? `dbt stopped at ${error.file}${error.line !== undefined ? `, line ${error.line}` : ""}. `
        : "";
      const open = openFileAction(error, input.projectName);
      return copy(
        "Your dbt project has an error",
        `${where}Fix it and the graph updates when you save.`,
        open ? [open, SHOW_PROBLEMS] : [SHOW_PROBLEMS],
      );
    }
    case "space-in-name": {
      const file = FILE_WITH_SPACE.exec(error.message)?.[1];
      return copy(
        "dbt doesn't allow spaces in model names",
        `${file ?? "A file in this project"} has a space in its name. This often happens when a file is duplicated. Rename or delete it.`,
        file
          ? [
              {
                id: "revealFile",
                label: `Reveal ${path.posix.basename(file)}`,
                args: { path: file },
              },
            ]
          : [SHOW_PROBLEMS],
      );
    }
    case "dbt-not-found":
      return copy(
        "dbt isn't installed in the selected Python environment",
        `Power User looks for dbt in ${python}. Pick the environment where dbt is installed, or install dbt into this one.`,
        [SELECT_INTERPRETER, { id: "installDbt", label: "Install dbt" }],
      );
    case "dbt-broken": {
      const adapter = ADAPTER_MISSING.exec(error.message)?.[1];
      return copy(
        "dbt is installed but won't load",
        adapter
          ? `dbt in ${python} has no ${adapter} adapter. Install dbt-${adapter} there, or pick the environment that has it.`
          : `Importing dbt in ${python} failed. This usually means an adapter or a dependency is missing or the wrong version.`,
        [SELECT_INTERPRETER, SHOW_OUTPUT],
      );
    }
    case "profile-not-found": {
      const name = PROFILE_NAME.exec(error.message)?.[1] ?? "";
      return copy(
        `dbt can't find the profile '${name}'`,
        `dbt_project.yml uses the profile '${name}', but it isn't in ${profiles}.`,
        [OPEN_PROFILES],
      );
    }
    case "profile-invalid":
      return copy(
        "dbt can't use this project's profile",
        `Check the profile in ${profiles}.`,
        [OPEN_PROFILES],
      );
    case "env-var": {
      const name = ENV_VAR_NAME.exec(error.message)?.[1] ?? "";
      // dbt only allows secret variables in profiles.yml and packages.yml.
      const reader = name.startsWith("DBT_ENV_SECRET")
        ? "Your profile reads it"
        : "Your project reads it";
      return copy(
        `The environment variable ${name} isn't set`,
        `${reader} with env_var(). Set it where VS Code can see it, then try again.`,
        [{ id: "openEnvVarDocs", label: "How to set it" }],
      );
    }
    case "packages": {
      const counts = PACKAGE_COUNTS.exec(error.message);
      const file = `${counts?.[2].toLowerCase() ?? "packages"}.yml`;
      const listed = counts && Number(counts[1]);
      const installed = counts && Number(counts[3]);
      return {
        ...copy(
          "This project's packages aren't installed",
          counts
            ? `${file} lists ${listed} ${listed === 1 ? "package" : "packages"} and ${installed} ${installed === 1 ? "is" : "are"} installed.`
            : `Run dbt deps to install what ${file} lists.`,
          [],
        ),
        // Installing packages re-checks the project, so there's no Try again.
        actions: [
          { id: "runDeps", label: "Run dbt deps" },
          {
            id: "openFile",
            label: `Open ${file}`,
            args: { path: file },
          },
        ],
      };
    }
    case "bridge-stopped":
      return copy(
        "Power User lost its connection to dbt",
        "The Python process that runs dbt stopped. Try again starts it again.",
        [SHOW_OUTPUT],
      );
    case "cloud-busy":
      return copy(
        "dbt Cloud is busy with another command",
        "It runs one command at a time. Try again when that one finishes.",
        [],
      );
    default:
      return copy(
        "dbt couldn't load this project",
        "dbt's message says why. The graph updates when that's fixed.",
        [SHOW_PROBLEMS, SHOW_OUTPUT],
      );
  }
}

// dbt not found has its own toast already (dbt_client's "Please ensure dbt core
// cli is installed"), with the install and detect buttons.
export function needsSetupToast(card: LineageCard): boolean {
  return card.setup && card.kind !== "dbt-not-found";
}

// The one non-modal warning a window gets for a setup problem. In a window with
// several projects it says which one.
export function setupToastMessage(
  card: LineageCard,
  projectLabel?: string,
): string {
  const where = projectLabel ? ` (${projectLabel})` : "";
  return `dbt Power User${where}: ${card.title}, so lineage and other features can't load.`;
}

// The profiles.yml dbt reads: the directory in DBT_PROFILES_DIR (relative to the
// project), else the project's own file, else the one in ~/.dbt. Follows
// default_profiles_dir in dbt-integration's Python.
export function resolveProfilesPath(
  projectRoot: string,
  profilesDirEnv: string | undefined,
  homeDir: string,
  exists: (filePath: string) => boolean,
): string {
  if (profilesDirEnv) {
    const dir = profilesDirEnv.replace(/^~(?=$|[\\/])/, homeDir);
    return path.join(path.resolve(projectRoot, dir), "profiles.yml");
  }
  const inProject = path.join(projectRoot, "profiles.yml");
  return exists(inProject)
    ? inProject
    : path.join(homeDir, ".dbt", "profiles.yml");
}
