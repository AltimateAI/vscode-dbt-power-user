import { describe, expect, it } from "@jest/globals";
import * as path from "path";
import {
  ENV_VAR_DOCS_URL,
  lineageCard,
  LineageCardInput,
  lineageCardKind,
  needsSetupToast,
  resolveProfilesPath,
  setupToastMessage,
} from "../../webview_provider/lineageStateCard";

const COMPILE_PREFIX =
  "There is a problem in your dbt project. Compilation failed: ";
const CONFIG_PREFIX = "dbt configuration is invalid : ";

const card = (message: string, extra: Partial<LineageCardInput> = {}) =>
  lineageCard({
    message,
    projectName: "jaffle_shop",
    pythonPath: "/ws/.venv/bin/python",
    profilesPath: "/home/me/.dbt/profiles.yml",
    canReparse: true,
    ...extra,
  });
const actionIds = (message: string, extra?: Partial<LineageCardInput>) =>
  card(message, extra).actions.map((action) => action.id);

describe("lineageCardKind", () => {
  it.each([
    [
      "project-error",
      `${COMPILE_PREFIX}Compilation Error in model orders (models/orders.sql)\n  Model 'model.jaffle_shop.orders' (models/orders.sql) depends on a node named 'stg_orderz' which was not found`,
    ],
    ["project-error", `${CONFIG_PREFIX}Parsing Error\n  Invalid thing`],
    [
      "project-error",
      "Compilation Error\n  Reached EOF without finding a close tag",
    ],
    [
      "space-in-name",
      `${CONFIG_PREFIX}Runtime Error\n  Resource names cannot contain spaces:\n  * 'model.jaffle_shop.stg_orders copy' (models/staging/stg_orders copy.sql)\n  Please rename the resource.`,
    ],
    [
      "dbt-not-found",
      `${CONFIG_PREFIX}dbt not found. Please install dbt to use this extension.`,
    ],
    ["dbt-not-found", "No module named 'dbt'"],
    ["dbt-not-found", "ModuleNotFoundError: No module named dbt"],
    ["dbt-broken", "No module named 'dbt.adapters.duckdb'"],
    ["dbt-broken", "No module named 'agate'"],
    [
      "dbt-broken",
      "ImportError: cannot import name 'BaseRelation' from 'dbt.adapters.base' (/x/site-packages/dbt/adapters/base/__init__.py)",
    ],
    [
      "dbt-broken",
      'Runtime Error\n  Credentials in profile "p", target "dev" invalid: Runtime Error\n  Could not find adapter type duckdb!',
    ],
    [
      "profile-not-found",
      "Runtime Error\n  Could not find profile named 'jaffle_shop'",
    ],
    [
      "profile-invalid",
      "The profile 'jaffle_shop' does not have a target named 'prod'",
    ],
    [
      "profile-invalid",
      "Runtime Error\n  No profile was specified in dbt_project.yml",
    ],
    ["env-var", "Env var required but not provided: 'DBT_ENV_SECRET_PASSWORD'"],
    [
      "env-var",
      // Names in the message don't decide the kind.
      "Env var required but not provided: 'PACKAGES_ROOT'",
    ],
    [
      "packages",
      `dbt found 2 package(s) specified in packages.yml, but only 0 package(s) installed in dbt_packages. Run "dbt deps" to install package dependencies.`,
    ],
    [
      "bridge-stopped",
      "Python process closed with exit code null (signal SIGKILL)",
    ],
    ["cloud-busy", "Session occupied by another command"],
    ["other", "Unable to parse dbt cloud cli response"],
    ["other", "Something nobody has seen"],
    ["other", "Could not find development credentials for this project"],
    ["other", "Unable to locate credentials"],
  ])("%s: %s", (kind, message) => {
    expect(lineageCardKind(message)).toBe(kind);
  });

  it("takes a missing ref in a model whose name looks like a setup problem as a project error", () => {
    expect(
      lineageCardKind(
        "Compilation Error\n  Model 'model.p.user_profile' depends on a node named 'dbt_packages_x' which was not found",
      ),
    ).toBe("project-error");
  });
});

describe("lineageCard", () => {
  it("names the file and line of a project error and opens them", () => {
    const result = card(
      `${COMPILE_PREFIX}Compilation Error in model orders (models/marts/orders.sql)\n  line 14\n  depends on a node named 'stg_orderz' which was not found`,
    );
    expect(result.title).toBe("Your dbt project has an error");
    expect(result.detail).toBe(
      "dbt stopped at models/marts/orders.sql, line 14. Fix it and the graph updates when you save.",
    );
    expect(result.actions).toEqual([
      {
        id: "openFile",
        label: "Open orders.sql",
        args: { path: "models/marts/orders.sql", line: 14 },
      },
      { id: "showProblems", label: "Show all problems" },
      { id: "tryAgain", label: "Try again" },
    ]);
    expect(result.setup).toBe(false);
    expect(result.severity).toBe("error");
  });

  it("drops the extension's prefix from dbt's message", () => {
    expect(
      card(`${CONFIG_PREFIX}Runtime Error\n  Could not find profile named 'p'`)
        .dbtMessage,
    ).toBe("Runtime Error\n  Could not find profile named 'p'");
  });

  it("has no file button when dbt names no file", () => {
    expect(actionIds(`${CONFIG_PREFIX}Parsing Error\n  Invalid thing`)).toEqual(
      ["showProblems", "tryAgain"],
    );
  });

  it("reveals a file with a space in its name", () => {
    const result = card(
      `${CONFIG_PREFIX}Runtime Error\n  Resource names cannot contain spaces:\n  * 'model.p.stg_orders copy' (models/staging/stg_orders copy.sql)\n  Please rename.`,
    );
    expect(result.detail).toContain(
      "models/staging/stg_orders copy.sql has a space in its name.",
    );
    expect(result.actions[0]).toEqual({
      id: "revealFile",
      label: "Reveal stg_orders copy.sql",
      args: { path: "models/staging/stg_orders copy.sql" },
    });
  });

  it("names the interpreter when dbt isn't there", () => {
    const result = card("No module named 'dbt'");
    expect(result.title).toBe(
      "dbt isn't installed in the selected Python environment",
    );
    expect(result.detail).toContain("/ws/.venv/bin/python");
    expect(result.actions.map((action) => action.id)).toEqual([
      "selectInterpreter",
      "installDbt",
      "tryAgain",
    ]);
    expect(result.setup).toBe(true);
  });

  it("still reads when the interpreter isn't known", () => {
    expect(
      card("No module named 'dbt'", { pythonPath: undefined }).detail,
    ).toContain("the selected Python environment");
  });

  it("names a missing adapter", () => {
    const result = card(
      'Runtime Error\n  Credentials in profile "p", target "dev" invalid: Runtime Error\n    Could not find adapter type duckdb!',
    );
    expect(result.kind).toBe("dbt-broken");
    expect(result.detail).toBe(
      "dbt in /ws/.venv/bin/python has no duckdb adapter. Install dbt-duckdb there, or pick the environment that has it.",
    );
  });

  it("names the profile and where dbt looked for it", () => {
    const result = card("Could not find profile named 'jaffle_shop'");
    expect(result.title).toBe("dbt can't find the profile 'jaffle_shop'");
    expect(result.detail).toBe(
      "dbt_project.yml uses the profile 'jaffle_shop', but it isn't in /home/me/.dbt/profiles.yml.",
    );
    expect(result.actions[0].id).toBe("openProfiles");
  });

  it("says the profile reads a secret variable and the project reads the rest", () => {
    expect(
      card("Env var required but not provided: 'DBT_ENV_SECRET_PASSWORD'")
        .detail,
    ).toContain("Your profile reads it with env_var()");
    const plain = card("Env var required but not provided: 'SCHEMA'");
    expect(plain.title).toBe("The environment variable SCHEMA isn't set");
    expect(plain.detail).toContain("Your project reads it with env_var()");
    expect(plain.actions[0].id).toBe("openEnvVarDocs");
  });

  it("links the env var docs with UTM", () => {
    expect(ENV_VAR_DOCS_URL).toContain("utm_source=dbt-power-user");
    expect(ENV_VAR_DOCS_URL).toContain("utm_medium=extension");
  });

  it("counts packages, and offers dbt deps without Try again", () => {
    const result = card(
      `dbt found 1 package(s) specified in packages.yml, but only 0 package(s) installed in dbt_packages. Run "dbt deps" to install package dependencies.`,
    );
    expect(result.detail).toBe(
      "packages.yml lists 1 package and 0 are installed.",
    );
    expect(result.actions).toEqual([
      { id: "runDeps", label: "Run dbt deps" },
      {
        id: "openFile",
        label: "Open packages.yml",
        args: { path: "packages.yml" },
      },
    ]);
  });

  it("opens dependencies.yml when dbt says the packages are declared there", () => {
    const result = card(
      `dbt found 2 package(s) specified in dependencies.yml, but only 0 package(s) installed in dbt_packages. Run "dbt deps" to install package dependencies.`,
    );
    expect(result.kind).toBe("packages");
    expect(result.detail).toBe(
      "dependencies.yml lists 2 packages and 0 are installed.",
    );
    expect(result.actions[1]).toEqual({
      id: "openFile",
      label: "Open dependencies.yml",
      args: { path: "dependencies.yml" },
    });
  });

  it("says plainly that dbt Cloud is busy, without promising a retry", () => {
    const result = card("Session occupied by another command");
    expect(result.severity).toBe("info");
    expect(result.detail).not.toMatch(/will try again/i);
    expect(result.actions.map((action) => action.id)).toEqual(["tryAgain"]);
  });

  it("leaves Try again out until the re-parse command is registered", () => {
    expect(
      actionIds("Could not find profile named 'p'", { canReparse: false }),
    ).toEqual(["openProfiles"]);
    expect(
      actionIds("Session occupied by another command", { canReparse: false }),
    ).toEqual([]);
  });

  it("marks only setup problems for the toast", () => {
    const setup = (message: string) => card(message).setup;
    expect(setup("No module named 'dbt'")).toBe(true);
    expect(setup("cannot import name 'x' from 'dbt.adapters.base'")).toBe(true);
    expect(setup("Could not find profile named 'p'")).toBe(true);
    expect(setup("The profile 'p' does not have a target named 't'")).toBe(
      true,
    );
    expect(setup("Env var required but not provided: 'X'")).toBe(true);
    expect(setup("Run dbt deps to install package dependencies")).toBe(true);
    expect(setup("Compilation Error\n  Reached EOF")).toBe(false);
    expect(setup("Python process closed with exit code 1")).toBe(false);
    expect(setup("Session occupied")).toBe(false);
    expect(setup("Something nobody has seen")).toBe(false);
  });

  it("leaves dbt not found to the toast it already has", () => {
    expect(needsSetupToast(card("No module named 'dbt'"))).toBe(false);
    expect(needsSetupToast(card("Could not find profile named 'p'"))).toBe(
      true,
    );
    expect(needsSetupToast(card("Compilation Error\n  Reached EOF"))).toBe(
      false,
    );
  });

  it("words the toast from the card's title", () => {
    expect(setupToastMessage(card("No module named 'dbt'"))).toBe(
      "dbt Power User: dbt isn't installed in the selected Python environment, so lineage and other features can't load.",
    );
    expect(setupToastMessage(card("No module named 'dbt'"), "shop")).toBe(
      "dbt Power User (shop): dbt isn't installed in the selected Python environment, so lineage and other features can't load.",
    );
  });
});

describe("resolveProfilesPath", () => {
  const none = () => false;
  // Native paths: on Windows these resolve to the current drive.
  const ws = path.resolve("/ws");
  const home = path.resolve("/home/me");

  it("uses an absolute DBT_PROFILES_DIR", () => {
    const dir = path.resolve("/etc/dbt");
    expect(resolveProfilesPath(ws, dir, home, none)).toBe(
      path.join(dir, "profiles.yml"),
    );
  });

  it("resolves a relative DBT_PROFILES_DIR against the project", () => {
    expect(resolveProfilesPath(ws, "conf", home, none)).toBe(
      path.join(ws, "conf", "profiles.yml"),
    );
  });

  it("expands ~ in DBT_PROFILES_DIR", () => {
    expect(resolveProfilesPath(ws, "~/dbt", home, none)).toBe(
      path.join(home, "dbt", "profiles.yml"),
    );
  });

  it("prefers the project's own profiles.yml over ~/.dbt", () => {
    const own = path.join(ws, "profiles.yml");
    expect(
      resolveProfilesPath(ws, undefined, home, (file) => file === own),
    ).toBe(own);
  });

  it("falls back to ~/.dbt", () => {
    expect(resolveProfilesPath(ws, undefined, home, none)).toBe(
      path.join(home, ".dbt", "profiles.yml"),
    );
  });
});
