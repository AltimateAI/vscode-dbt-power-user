import {
  DBTCommandFactory,
  DBTFusionCommandProjectIntegration,
} from "@altimateai/dbt-integration";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

/**
 * REPRODUCTION: "Unexpected end of JSON input" via per-line JSON.parse
 * ------------------------------------------------------------------
 * Production family (App Insights, 30d, innoverio.vscode-dbt-power-user):
 *   "Unexpected end of JSON input" -> catchAllError 131,317
 *
 * REAL root cause (verified against the bundled npm package
 *   node_modules/@altimateai/dbt-integration, version 0.3.2 — source map points
 *   to src/dbtFusionCommandIntegration.ts:517):
 *
 *   DBTFusionCommandProjectIntegration.executeSQL() runs
 *   `dbt show --inline <sql> --limit N --output json --log-format json`
 *   and, inside the QueryExecution callback, parses stdout with:
 *
 *       let d = i.trim().split("\n").map(h => JSON.parse(h.trim()));   // <-- BUG
 *
 *   There is NO per-line try/catch and NO empty-line filter here (unlike the
 *   sibling Cloud/Core paths in the same file, which wrap each parse in
 *   `try { ... } catch {}` and filter falsy results). So any line that is
 *   blank after trimming reaches JSON.parse("") and throws V8's exact message
 *   "Unexpected end of JSON input". `i.trim()` strips only the OUTER
 *   whitespace, so these all crash the whole batch:
 *       - completely empty stdout                 ("")
 *       - whitespace-only stdout                  ("   ")
 *       - an INTERIOR blank line between two valid JSON objects
 *         (common in dbt's --log-format json debug stream)
 *   The raw SyntaxError propagates UNWRAPPED through
 *   QueryExecution.executeQuery(), which is why App Insights logs the bare
 *   field string.
 *
 *   (A *truncated* content line like '{"a":1' throws a DIFFERENT V8 message —
 *   "Expected ',' or '}' after property value..." — so it is NOT part of THIS
 *   family. The 131k "Unexpected end of JSON input" hits come specifically
 *   from blank/empty lines reaching JSON.parse(""). That distinction is pinned
 *   below so the reproduction is precise, not hand-wavy.)
 *
 * This test drives the REAL, unmodified library code. No `dbt` subprocess is
 * spawned: we inject a `cliDBTCommandExecutionStrategyFactory` whose
 * strategy.execute() returns crafted stdout — exactly what the spawned
 * `dbt show` process would have streamed back. Everything downstream
 * (trim/split/JSON.parse, preview extraction, tabular transform) is the
 * library's own code. The parser is NOT re-implemented here.
 *
 * Every expected value below was confirmed empirically against the real
 * package before being written.
 */

// V8's exact field message recorded 131,317 times in App Insights.
const RAW_JSON_FIELD_ERROR = "Unexpected end of JSON input";

const dbtConfiguration = {
  getQueryTemplate: () => "select * from ({query}) as query limit {limit}",
  getQueryLimit: () => 500,
} as any;

const terminal = {
  show: async () => {},
  log: () => {},
  trace: () => {},
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  dispose: () => {},
} as any;

const pythonEnvironment = {
  pythonPath: "python3",
  getEnvironmentVariables: () => ({}),
} as any;

const pythonEnvironmentProvider = {
  getCurrentEnvironment: () => pythonEnvironment,
  onEnvironmentChanged: () => () => {},
} as any;

/**
 * Build a real DBTFusionCommandProjectIntegration whose command execution
 * returns `stdout`/`stderr` verbatim (no `dbt` binary involved).
 */
function makeFusionIntegration(stdout: string, stderr = "") {
  const execute = jest.fn(async () => ({
    stdout,
    stderr,
    fullOutput: stdout + stderr,
  }));
  // wrapCommand() calls this factory with (projectRoot, dbtPath) and uses the
  // returned strategy as the command's execution strategy.
  const strategyFactory = (_path: string, _dbtPath: string) => ({ execute });

  const commandFactory = new DBTCommandFactory(dbtConfiguration);

  const instance = new DBTFusionCommandProjectIntegration(
    /* _executionInfrastructure */ {} as any,
    /* dbtCommandFactory        */ commandFactory,
    /* cliDBTCommandExecutionStrategyFactory */ strategyFactory as any,
    /* pythonEnvironment        */ pythonEnvironment,
    /* _pythonEnvironmentProvider */ pythonEnvironmentProvider,
    /* terminal                 */ terminal,
    /* projectRoot              */ "/tmp/fusion-proj",
    /* projectConfigDiagnostics */ [],
    /* deferConfig              */ {
      deferToProduction: false,
      favorState: false,
    } as any,
    /* onDiagnosticsChanged     */ () => {},
  );

  // The Fusion constructor does not assign these; wrapCommand()/executeSQL()
  // read them. They are plain (non-frozen) instance fields.
  (instance as any).dbtConfiguration = dbtConfiguration;
  (instance as any).dbtPath = "dbt";
  (instance as any).profilesDir = undefined;

  return { instance, execute };
}

/** Drive the public path end-to-end; returns whatever it produced/threw. */
async function runExecuteSQL(stdout: string, stderr = "") {
  const { instance } = makeFusionIntegration(stdout, stderr);
  const queryExecution = await instance.executeSQL("select 1", 10, "my_model");
  return queryExecution.executeQuery();
}

// One valid dbt-show line carrying the preview rows (preview is itself a
// JSON-encoded string, exactly as dbt emits it).
const previewLine = JSON.stringify({
  data: { preview: JSON.stringify([{ col_a: 1 }]) },
});
// One valid line carrying the compiled sql.
const sqlLine = JSON.stringify({ data: { sql: "select 1 as col_a" } });

describe('dbt Fusion executeSQL — "Unexpected end of JSON input" via per-line JSON.parse', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ----- PINS: current (buggy) behaviour. GREEN today. -----

  test("completely empty stdout throws the exact production field error (unwrapped)", async () => {
    // "".trim() -> "" -> split("\n") -> [""] -> JSON.parse("") throws.
    // No empty-result guard, no error wrapper: the raw SyntaxError surfaces.
    let caught: Error | undefined;
    try {
      await runExecuteSQL("");
    } catch (e) {
      caught = e as Error;
    }
    expect(caught).toBeInstanceOf(SyntaxError);
    expect((caught as Error).message).toBe(RAW_JSON_FIELD_ERROR);
  });

  test("whitespace-only stdout throws the exact production field error", async () => {
    // "   ".trim() -> "" -> JSON.parse("") -> "Unexpected end of JSON input".
    await expect(runExecuteSQL("   ")).rejects.toThrow(RAW_JSON_FIELD_ERROR);
  });

  test("an INTERIOR blank line between two valid JSON objects crashes the whole batch", async () => {
    // i.trim() removes only outer whitespace; an interior empty line survives
    // split("\n") and is handed to JSON.parse(""). Both surrounding lines are
    // perfectly valid yet the entire result is discarded with the field error.
    await expect(runExecuteSQL(previewLine + "\n\n" + sqlLine)).rejects.toThrow(
      RAW_JSON_FIELD_ERROR,
    );
  });

  test("a spaced (non-empty) blank line between valid objects also crashes the parse", async () => {
    // A line that is " " (a single space) is non-trimmable as part of the
    // OUTER string, survives split("\n"), and after per-line h.trim() becomes
    // "" -> JSON.parse("") -> the field error. This is the realistic shape of
    // dbt's --log-format json debug stream interleaving blank progress lines
    // between data lines. (Confirmed empirically against the real package.)
    await expect(
      runExecuteSQL(previewLine + "\n \n" + sqlLine),
    ).rejects.toThrow(RAW_JSON_FIELD_ERROR);
  });

  test("a truncated content line throws a DIFFERENT V8 message (NOT this family)", async () => {
    // Boundary pin: '{"a":1' is malformed-but-non-empty, so V8 reports
    // "Expected ',' or '}' ...", not "Unexpected end of JSON input". This keeps
    // the family attribution honest — only blank/empty lines yield the 131k msg.
    let caught: Error | undefined;
    try {
      await runExecuteSQL('{"a":1');
    } catch (e) {
      caught = e as Error;
    }
    expect(caught).toBeInstanceOf(SyntaxError);
    expect((caught as Error).message).not.toBe(RAW_JSON_FIELD_ERROR);
    expect((caught as Error).message).toBe(
      "Expected ',' or '}' after property value in JSON at position 6 (line 1 column 7)",
    );
  });

  // ----- CONTROL: the path works when every line is valid JSON. -----

  test("valid preview+sql stdout parses into the expected tabular ExecuteSQLResult", async () => {
    const result = await runExecuteSQL(previewLine + "\n" + sqlLine);
    // Exact-value assertions only (the library's own tabular transform output).
    expect(result.table.column_names).toEqual(["col_a"]);
    expect(result.table.column_types).toEqual(["string"]);
    expect(result.table.rows).toEqual([[1]]);
    expect(result.raw_sql).toBe("select 1");
    expect(result.compiled_sql).toBe("select 1 as col_a");
    expect(result.modelName).toBe("my_model");
  });

  test("a valid line lacking a preview yields the specific previewLine error, NOT a JSON error", async () => {
    // Proves the JSON-input crash above is specific to unparseable/blank lines:
    // a well-formed line with no preview reaches the intended domain guard.
    await expect(runExecuteSQL(sqlLine)).rejects.toThrow(
      "Could not find previewLine in " + sqlLine,
    );
  });

  // ----- CORRECT behaviour, encoded with test.failing. -----
  // GREEN now (the calls currently throw). Each flips RED the moment the
  // library skips blank/empty lines before JSON.parse and adds an empty-result
  // guard — matching the resilient pattern the sibling parse paths already use.

  test.failing(
    "an interior blank line SHOULD be skipped, leaving the valid batch intact",
    async () => {
      const result = await runExecuteSQL(previewLine + "\n\n" + sqlLine);
      expect(result.table.column_names).toEqual(["col_a"]);
      expect(result.table.rows).toEqual([[1]]);
      expect(result.compiled_sql).toBe("select 1 as col_a");
    },
  );

  test.failing(
    "empty stdout SHOULD resolve to an empty result rather than throwing",
    async () => {
      // After a fix, an empty show output should surface as a benign empty
      // table, never a raw 'Unexpected end of JSON input'.
      const result = await runExecuteSQL("");
      expect(result.table.rows).toEqual([]);
    },
  );
});
