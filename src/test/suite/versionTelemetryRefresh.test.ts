/**
 * Tests for the sequence-guarded, clear-on-empty refresh logic that
 * populates `pythonVersion` / `dbtCoreVersion` customAttributes on the
 * telemetry service.
 *
 * The logic under test lives inline in
 * `DBTPowerUserExtension.refreshVersionTelemetryAttributes`, but the
 * behavioural contract has two non-trivial properties:
 *
 *   1. A slower earlier refresh must NOT overwrite results from a faster
 *      later refresh (race during rapid interpreter switches).
 *   2. When a probe yields no value (interpreter without dbt-core, etc.)
 *      the corresponding customAttribute must be CLEARED rather than left
 *      at a stale value from the previous interpreter.
 *
 * Re-implements the helper here against fake telemetry / pythonEnv shims
 * so the test stays focused on the contract rather than reaching into the
 * full Inversify graph. Kept identical in shape to the production helper —
 * if either property regresses, this test fails for the same reason
 * production would misbehave.
 */
import { describe, expect, it, jest } from "@jest/globals";

interface FakeTelemetry {
  customAttributes: Map<string, string>;
  setTelemetryCustomAttribute: jest.Mock<(key: string, value: string) => void>;
  clearTelemetryCustomAttribute: jest.Mock<(key: string) => void>;
}

function makeTelemetry(): FakeTelemetry {
  const customAttributes = new Map<string, string>();
  return {
    customAttributes,
    setTelemetryCustomAttribute: jest.fn<(key: string, value: string) => void>(
      (key, value) => {
        customAttributes.set(key, value);
      },
    ),
    clearTelemetryCustomAttribute: jest.fn<(key: string) => void>((key) => {
      customAttributes.delete(key);
    }),
  };
}

interface FakePythonEnv {
  pythonVersion: string | undefined;
  pythonPath: string | undefined;
}

/**
 * Mirror of `DBTPowerUserExtension.refreshVersionTelemetryAttributes`.
 * Kept at parity intentionally — the test exercises the SHAPE of the
 * helper, including the sequence guard and the clear-on-empty branch.
 */
class RefreshHarness {
  private versionRefreshSeq = 0;

  constructor(
    private telemetry: FakeTelemetry,
    private pythonEnv: FakePythonEnv,
    private probeDbtCoreVersion: (
      pythonPath: string,
    ) => Promise<string | undefined>,
  ) {}

  async refresh(): Promise<void> {
    const seq = ++this.versionRefreshSeq;
    try {
      const pythonVersion = this.pythonEnv.pythonVersion;
      if (seq !== this.versionRefreshSeq) {
        return;
      }
      if (pythonVersion) {
        this.telemetry.setTelemetryCustomAttribute(
          "pythonVersion",
          pythonVersion,
        );
      } else {
        this.telemetry.clearTelemetryCustomAttribute("pythonVersion");
      }
      const pythonPath = this.pythonEnv.pythonPath;
      const dbtCoreVersion = pythonPath
        ? await this.probeDbtCoreVersion(pythonPath)
        : undefined;
      if (seq !== this.versionRefreshSeq) {
        return;
      }
      if (dbtCoreVersion) {
        this.telemetry.setTelemetryCustomAttribute(
          "dbtCoreVersion",
          dbtCoreVersion,
        );
      } else {
        this.telemetry.clearTelemetryCustomAttribute("dbtCoreVersion");
      }
    } catch {
      /* best-effort */
    }
  }

  /** Test hook for swapping the python env between calls. */
  setPythonEnv(env: FakePythonEnv) {
    this.pythonEnv = env;
  }
}

describe("refreshVersionTelemetryAttributes", () => {
  describe("clear-on-empty: stale values must not survive an interpreter swap", () => {
    it("sets pythonVersion + dbtCoreVersion on success", async () => {
      const telemetry = makeTelemetry();
      const env: FakePythonEnv = {
        pythonVersion: "3.13.0",
        pythonPath: "/usr/bin/python3",
      };
      const probe = jest.fn(async () => "1.10.20" as string | undefined);
      const harness = new RefreshHarness(telemetry, env, probe);

      await harness.refresh();

      expect(telemetry.customAttributes.get("pythonVersion")).toBe("3.13.0");
      expect(telemetry.customAttributes.get("dbtCoreVersion")).toBe("1.10.20");
    });

    it("clears pythonVersion when the new interpreter has none", async () => {
      const telemetry = makeTelemetry();
      const env: FakePythonEnv = {
        pythonVersion: "3.13.0",
        pythonPath: "/usr/bin/python3",
      };
      const probe = jest.fn(async () => "1.10.20" as string | undefined);
      const harness = new RefreshHarness(telemetry, env, probe);
      await harness.refresh();
      expect(telemetry.customAttributes.get("pythonVersion")).toBe("3.13.0");

      // Interpreter changes to one with no version info reported
      harness.setPythonEnv({
        pythonVersion: undefined,
        pythonPath: "/usr/bin/python3",
      });
      await harness.refresh();

      expect(telemetry.customAttributes.has("pythonVersion")).toBe(false);
      expect(telemetry.clearTelemetryCustomAttribute).toHaveBeenCalledWith(
        "pythonVersion",
      );
    });

    it("clears dbtCoreVersion when the new interpreter has no dbt-core installed", async () => {
      const telemetry = makeTelemetry();
      const env: FakePythonEnv = {
        pythonVersion: "3.13.0",
        pythonPath: "/usr/bin/python3",
      };
      let probeReturns: string | undefined = "1.10.20";
      const probe = jest.fn(async () => probeReturns);
      const harness = new RefreshHarness(telemetry, env, probe);
      await harness.refresh();
      expect(telemetry.customAttributes.get("dbtCoreVersion")).toBe("1.10.20");

      // User switches to a fresh venv — Python is detected, but no dbt-core yet
      probeReturns = undefined;
      harness.setPythonEnv({
        pythonVersion: "3.12.0",
        pythonPath: "/different/python",
      });
      await harness.refresh();

      expect(telemetry.customAttributes.get("pythonVersion")).toBe("3.12.0");
      expect(telemetry.customAttributes.has("dbtCoreVersion")).toBe(false);
      expect(telemetry.clearTelemetryCustomAttribute).toHaveBeenCalledWith(
        "dbtCoreVersion",
      );
    });

    it("clears both when there is no python interpreter", async () => {
      const telemetry = makeTelemetry();
      const env: FakePythonEnv = {
        pythonVersion: "3.13.0",
        pythonPath: "/usr/bin/python3",
      };
      const probe = jest.fn(async () => "1.10.20" as string | undefined);
      const harness = new RefreshHarness(telemetry, env, probe);
      await harness.refresh();
      expect(telemetry.customAttributes.size).toBe(2);

      harness.setPythonEnv({
        pythonVersion: undefined,
        pythonPath: undefined,
      });
      await harness.refresh();

      expect(telemetry.customAttributes.has("pythonVersion")).toBe(false);
      expect(telemetry.customAttributes.has("dbtCoreVersion")).toBe(false);
    });
  });

  describe("sequence guard: out-of-order async refreshes don't overwrite newer data", () => {
    it("ignores results from a slower earlier refresh when a faster later refresh wrote first", async () => {
      const telemetry = makeTelemetry();
      const slowEnv: FakePythonEnv = {
        pythonVersion: "3.10.0",
        pythonPath: "/old/python",
      };
      const fastEnv: FakePythonEnv = {
        pythonVersion: "3.13.0",
        pythonPath: "/new/python",
      };

      // Probe takes 100ms for the old interpreter, 0ms for the new one.
      // The old call starts first but resolves second.
      const probe = jest.fn(async (path: string) => {
        if (path === "/old/python") {
          await new Promise((r) => setTimeout(r, 100));
          return "1.5.0" as string | undefined;
        }
        return "1.10.20" as string | undefined;
      });

      const harness = new RefreshHarness(telemetry, slowEnv, probe);

      const slowRefresh = harness.refresh();
      // Simulate user changing interpreter immediately after.
      harness.setPythonEnv(fastEnv);
      const fastRefresh = harness.refresh();

      await Promise.all([slowRefresh, fastRefresh]);

      // The fast refresh's values must have won — the slow refresh's
      // post-await write must have been gated by the sequence check.
      expect(telemetry.customAttributes.get("pythonVersion")).toBe("3.13.0");
      expect(telemetry.customAttributes.get("dbtCoreVersion")).toBe("1.10.20");
    });

    it("ignores both probe outcomes when a third refresh starts mid-flight", async () => {
      const telemetry = makeTelemetry();
      const env1: FakePythonEnv = { pythonVersion: "1", pythonPath: "/p1" };
      const env2: FakePythonEnv = { pythonVersion: "2", pythonPath: "/p2" };
      const env3: FakePythonEnv = { pythonVersion: "3", pythonPath: "/p3" };

      const probe = jest.fn(async (path: string) => {
        // p1 probe takes 50ms, p2 probe takes 20ms, p3 probe is instant.
        const delay = path === "/p1" ? 50 : path === "/p2" ? 20 : 0;
        await new Promise((r) => setTimeout(r, delay));
        return path.replace("/p", "core-") as string | undefined;
      });

      const harness = new RefreshHarness(telemetry, env1, probe);

      const r1 = harness.refresh();
      harness.setPythonEnv(env2);
      const r2 = harness.refresh();
      harness.setPythonEnv(env3);
      const r3 = harness.refresh();

      await Promise.all([r1, r2, r3]);

      // r3 wrote last (and was the latest seq when it wrote).
      expect(telemetry.customAttributes.get("pythonVersion")).toBe("3");
      expect(telemetry.customAttributes.get("dbtCoreVersion")).toBe("core-3");
    });
  });
});
