import { describe, expect, it } from "@jest/globals";
import * as path from "path";
import {
  droppedModelCard,
  fusionErrorLine,
  fusionErrorSummary,
  partialGraphBanner,
  partialGraphFiles,
  partialGraphKey,
} from "../../webview_provider/lineagePartialGraph";

// A POSIX test path as the platform writes it ("\\ws\\..." on Windows).
const native = (posixPath: string) => path.join(posixPath);
const ROOT = native("/ws");

// dbt Fusion 2.0.12's messages, as its `--log-format json` lines carry them.
const BROKEN_REF =
  "[error] [DependencyNotFound (dbt1048)]: Ref 'stg_orderz' not found in project. Searched for 'jaffle_shop.stg_orderz, stg_orderz'\n  --> models/customers.sql:9:19";
const SYNTAX =
  "[error] [MacroSyntaxInvalid (dbt1502)]: Failed to render SQL syntax error: unexpected `}`, expected end of variable block\n(in models/customers.sql:9:40)\n  --> models/customers.sql:9:40";
const NO_LOCATION =
  "[error] [InvalidConfig (dbt1005)]: Something in the project is wrong";

const error = (file: string, message: string) => ({
  filePath: native(`/ws/${file}`),
  message,
});

describe("fusionErrorSummary and fusionErrorLine", () => {
  it("keeps the reason and puts the dbt code after it", () => {
    expect(fusionErrorSummary(BROKEN_REF)).toBe(
      "Ref 'stg_orderz' not found in project. Searched for 'jaffle_shop.stg_orderz, stg_orderz' (dbt1048)",
    );
  });

  it("reads the line from the --> location, not the message text", () => {
    expect(fusionErrorLine(BROKEN_REF)).toBe(9);
    expect(fusionErrorLine(SYNTAX)).toBe(9);
    expect(fusionErrorLine(NO_LOCATION)).toBeUndefined();
  });

  it("cuts a long reason", () => {
    const summary = fusionErrorSummary(`[error] ${"x".repeat(300)}`);
    expect(summary).toHaveLength(200);
    expect(summary.endsWith("…")).toBe(true);
  });
});

describe("partialGraphFiles", () => {
  it("lists each failed file once, relative to the project, with its first error", () => {
    const files = partialGraphFiles(
      {
        errors: [
          error("models/customers.sql", BROKEN_REF),
          error("models/orders.sql", SYNTAX.replace(/customers/g, "orders")),
          error("models/customers.sql", SYNTAX),
        ],
      },
      ROOT,
    );
    expect(
      files.map(({ path: file, errorCount }) => [file, errorCount]),
    ).toEqual([
      ["models/customers.sql", 2],
      ["models/orders.sql", 1],
    ]);
    expect(files[0]).toMatchObject({
      line: 9,
      action: {
        id: "openFile",
        label: "Open customers.sql",
        args: { path: "models/customers.sql", line: 9 },
      },
    });
  });

  it("opens a file with no line at its top", () => {
    const [file] = partialGraphFiles(
      { errors: [error("dbt_project.yml", NO_LOCATION)] },
      ROOT,
    );
    expect(file.line).toBeUndefined();
    expect(file.action.args).toEqual({ path: "dbt_project.yml" });
  });
});

describe("partialGraphBanner", () => {
  it("names the one file that failed to parse", () => {
    const banner = partialGraphBanner({
      graphDrawn: true,
      partial: { errors: [error("models/customers.sql", BROKEN_REF)] },
      projectRoot: ROOT,
    });
    expect(banner).toMatchObject({
      id: "partial-graph",
      severity: "warning",
      age: "customers.sql failed to parse",
      title:
        "This graph is missing parts because customers.sql failed to parse.",
      dbtMessage: BROKEN_REF,
      actions: [{ id: "showProblems", label: "Show all problems" }],
    });
    expect(banner?.files).toHaveLength(1);
  });

  it("counts the files when more than one failed", () => {
    const banner = partialGraphBanner({
      graphDrawn: true,
      partial: {
        errors: [
          error("models/customers.sql", BROKEN_REF),
          error("models/orders.sql", SYNTAX),
        ],
      },
      projectRoot: ROOT,
    });
    expect(banner?.age).toBe("2 files failed to parse");
    expect(banner?.title).toBe(
      "This graph is missing parts because 2 files failed to parse.",
    );
  });

  it("is undefined for a whole manifest or when no graph is drawn", () => {
    const partial = { errors: [error("models/customers.sql", BROKEN_REF)] };
    expect(
      partialGraphBanner({ graphDrawn: true, projectRoot: ROOT }),
    ).toBeUndefined();
    expect(
      partialGraphBanner({
        graphDrawn: true,
        partial: { errors: [] },
        projectRoot: ROOT,
      }),
    ).toBeUndefined();
    expect(
      partialGraphBanner({ graphDrawn: false, partial, projectRoot: ROOT }),
    ).toBeUndefined();
  });
});

describe("droppedModelCard", () => {
  const partial = {
    errors: [
      error("models/customers.sql", SYNTAX),
      error("models/schema.yml", NO_LOCATION),
    ],
  };

  it("says the active model was left out because its file failed to parse", () => {
    expect(
      droppedModelCard({
        partial,
        projectRoot: ROOT,
        filePath: native("/ws/models/customers.sql"),
        modelName: "customers",
      }),
    ).toEqual({
      kind: "model-not-parsed",
      severity: "error",
      title: "customers isn't in the graph",
      detail:
        "models/customers.sql failed to parse (line 9), so dbt Fusion left customers out of the manifest. Fix it and the graph updates when you save.",
      dbtMessage: SYNTAX,
      actions: [
        {
          id: "openFile",
          label: "Open customers.sql",
          args: { path: "models/customers.sql", line: 9 },
        },
        { id: "showProblems", label: "Show all problems" },
      ],
      setup: false,
    });
  });

  it("is undefined for a file that parsed, or a whole manifest", () => {
    expect(
      droppedModelCard({
        partial,
        projectRoot: ROOT,
        filePath: native("/ws/models/orders.sql"),
        modelName: "orders",
      }),
    ).toBeUndefined();
    expect(
      droppedModelCard({
        projectRoot: ROOT,
        filePath: native("/ws/models/customers.sql"),
        modelName: "customers",
      }),
    ).toBeUndefined();
  });
});

describe("partialGraphKey", () => {
  it("changes with the failed files, not their messages or order", () => {
    const a = error("models/a.sql", BROKEN_REF);
    const b = error("models/b.sql", SYNTAX);
    expect(partialGraphKey()).toBe("");
    expect(partialGraphKey({ errors: [] })).toBe("");
    expect(partialGraphKey({ errors: [a, b] })).toBe(
      partialGraphKey({ errors: [b, { ...a, message: SYNTAX }] }),
    );
    expect(partialGraphKey({ errors: [a] })).not.toBe(
      partialGraphKey({ errors: [a, b] }),
    );
  });

  it("stays the same when a file that failed gets more errors", () => {
    const a = error("models/a.sql", BROKEN_REF);
    expect(partialGraphKey({ errors: [a, { ...a, message: SYNTAX }] })).toBe(
      partialGraphKey({ errors: [a] }),
    );
  });
});
