import { describe, expect, it, jest } from "@jest/globals";
import { DBTTerminal } from "@altimateai/dbt-integration";
import { BigQueryCostEstimate } from "../../commands/bigQueryCostEstimate";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { TelemetryService } from "../../telemetry";

/**
 * Telemetry on 0.60.7 surfaced an `unhandlederror`:
 *
 *   Cannot destructure property 'returnResult' of 'undefined' as it is undefined.
 *
 * Root cause: `BigQueryCostEstimate.estimateCost` destructures its argument
 * without a default. When the command is invoked from the command palette
 * (`dbtPowerUser.bigQueryCostEstimate`), VS Code passes `undefined` instead
 * of `{ returnResult: true }` (which only the insights panel call site provides),
 * crashing on the destructure before any method body runs.
 */
describe("BigQueryCostEstimate.estimateCost arg destructure", () => {
  // Mirrors the pre-fix signature exactly:
  //   async estimateCost({ returnResult }: { returnResult?: boolean })
  function preFixDestructure(arg: { returnResult?: boolean }) {
    const { returnResult } = arg;
    return returnResult;
  }

  // Mirrors the post-fix signature:
  //   async estimateCost({ returnResult }: { returnResult?: boolean } = {})
  function postFixDestructure(arg: { returnResult?: boolean } = {}) {
    const { returnResult } = arg;
    return returnResult;
  }

  describe("pre-fix characterization (regression guard)", () => {
    it("crashes when invoked with undefined (command palette path)", () => {
      expect(() => preFixDestructure(undefined as never)).toThrow(
        /Cannot destructure/,
      );
    });

    it("works when invoked with explicit args (insights panel path)", () => {
      expect(preFixDestructure({ returnResult: true })).toBe(true);
    });
  });

  describe("post-fix behaviour", () => {
    it("does not crash when invoked with undefined", () => {
      expect(() => postFixDestructure(undefined)).not.toThrow();
      expect(postFixDestructure(undefined)).toBeUndefined();
    });

    it("does not crash when invoked with no argument at all", () => {
      expect(() => (postFixDestructure as () => unknown)()).not.toThrow();
    });

    it("preserves the explicit-arg path", () => {
      expect(postFixDestructure({ returnResult: true })).toBe(true);
      expect(postFixDestructure({ returnResult: false })).toBe(false);
    });
  });

  /**
   * Hits the actual production class so the test result depends on whether
   * the source-level fix has been applied. The destructure runs before any
   * other code in the method, so this test cleanly isolates the bug from
   * downstream behaviour: pre-fix master throws `TypeError: Cannot
   * destructure property 'returnResult' of 'undefined'` synchronously;
   * post-fix the call passes the destructure and only fails further
   * downstream on the `window.activeTextEditor` access — proving the
   * specific telemetry-reported crash is gone.
   */
  describe("production class (master vs fix branch)", () => {
    const buildEstimator = () => {
      const terminal = {
        show: jest.fn(),
        log: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
      } as unknown as DBTTerminal;
      const container = {
        findDBTProject: jest.fn(),
      } as unknown as DBTProjectContainer;
      const telemetry = {
        sendTelemetryError: jest.fn(),
        sendTelemetryEvent: jest.fn(),
      } as unknown as TelemetryService;
      return new BigQueryCostEstimate(container, terminal, telemetry);
    };

    it("no longer throws the destructure TypeError when invoked with no args", async () => {
      const estimator = buildEstimator();
      let caught: unknown;
      try {
        await (estimator.estimateCost as () => Promise<unknown>)();
      } catch (e) {
        caught = e;
      }
      // Whatever happens further down the method body, the specific
      // unhandlederror reported in 0.60.7 telemetry must not reappear.
      expect(String(caught ?? "")).not.toMatch(
        /Cannot destructure property 'returnResult'/,
      );
    });
  });

  /**
   * The command-palette path goes through the registerCommand wrapper in
   * `commands/index.ts:294`, which ALSO destructures `{ returnResult }`
   * from its argument. VS Code invokes the handler with `undefined` when
   * the command is run without args, so the wrapper crashes before
   * `estimateCost` is ever called. Both call-sites must default to `{}`
   * for the fix to actually reach the user.
   */
  describe("registerCommand wrapper destructure (commands/index.ts:294)", () => {
    function preFixWrapper({
      returnResult,
    }: {
      returnResult?: boolean;
    }): boolean | undefined {
      return returnResult;
    }

    function postFixWrapper(
      { returnResult }: { returnResult?: boolean } = {},
    ): boolean | undefined {
      return returnResult;
    }

    it("pre-fix wrapper crashes when VS Code passes undefined", () => {
      expect(() => preFixWrapper(undefined as never)).toThrow(
        /Cannot destructure/,
      );
    });

    it("post-fix wrapper survives VS Code passing undefined", () => {
      expect(() => postFixWrapper(undefined)).not.toThrow();
      expect(postFixWrapper(undefined)).toBeUndefined();
    });

    it("post-fix wrapper preserves explicit-arg behaviour", () => {
      expect(postFixWrapper({ returnResult: true })).toBe(true);
    });
  });
});
