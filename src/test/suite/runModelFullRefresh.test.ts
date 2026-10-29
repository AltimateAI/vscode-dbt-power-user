import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Uri, window } from "vscode";
import { RunModel } from "../../commands/runModel";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";

/**
 * Regression tests for AltimateAI/vscode-dbt-power-user#1670.
 *
 * `RunModel.compileModelOnActiveWindow` and `executeQueryOnActiveWindow`
 * both gained an optional `fullRefresh` parameter. When true, the flag is
 * threaded down through `DBTProjectContainer.compileModel` / `executeSQL`
 * into `altimate-dbt-integration`, which either appends `--full-refresh`
 * to the CLI compile args or sets `node.config.full_refresh = True` on
 * the cloned node in the Python bridge. Downstream, dbt's
 * `should_full_refresh()` macro returns true and `is_incremental()`
 * returns false so users can preview the full-refresh shape of the
 * compiled SQL without dropping the warehouse relation.
 */
describe("RunModel — fullRefresh dispatch (#1670)", () => {
  let mockContainer: jest.Mocked<DBTProjectContainer>;
  let runModel: RunModel;

  const modelPath = "/workspace/jaffle/models/orders_incremental.sql";

  const setActiveEditor = (fsPath: string | null) => {
    Object.defineProperty(window, "activeTextEditor", {
      value:
        fsPath === null
          ? undefined
          : {
              document: {
                uri: Uri.file(fsPath),
                getText: () => "select * from {{ ref('stg_orders') }}",
              },
              selection: { isEmpty: true },
            },
      writable: true,
      configurable: true,
    });
  };

  beforeEach(() => {
    mockContainer = {
      compileModel: jest.fn(),
      executeSQL: jest.fn(),
    } as unknown as jest.Mocked<DBTProjectContainer>;

    runModel = new RunModel(mockContainer);
  });

  describe("compileModelOnActiveWindow", () => {
    it("passes fullRefresh=false by default (existing behavior)", () => {
      setActiveEditor(modelPath);

      runModel.compileModelOnActiveWindow();

      expect(mockContainer.compileModel).toHaveBeenCalledWith(
        expect.anything(),
        undefined,
        false,
      );
    });

    it("passes fullRefresh=true when the full-refresh variant is invoked (#1670)", () => {
      setActiveEditor(modelPath);

      runModel.compileModelOnActiveWindow(true);

      expect(mockContainer.compileModel).toHaveBeenCalledWith(
        expect.anything(),
        undefined,
        true,
      );
    });

    it("no-ops when there is no active editor", () => {
      setActiveEditor(null);

      runModel.compileModelOnActiveWindow(true);

      expect(mockContainer.compileModel).not.toHaveBeenCalled();
    });
  });

  describe("executeQueryOnActiveWindow", () => {
    it("passes fullRefresh=false by default (existing Ctrl+Enter behavior)", () => {
      setActiveEditor(modelPath);

      runModel.executeQueryOnActiveWindow();

      expect(mockContainer.executeSQL).toHaveBeenCalledWith(
        expect.anything(),
        expect.any(String),
        expect.any(String),
        false,
      );
    });

    it("passes fullRefresh=true when the full-refresh variant is invoked (#1670)", () => {
      setActiveEditor(modelPath);

      runModel.executeQueryOnActiveWindow(true);

      expect(mockContainer.executeSQL).toHaveBeenCalledWith(
        expect.anything(),
        expect.any(String),
        expect.any(String),
        true,
      );
    });

    it("no-ops when there is no active editor", () => {
      setActiveEditor(null);

      runModel.executeQueryOnActiveWindow(true);

      expect(mockContainer.executeSQL).not.toHaveBeenCalled();
    });
  });
});
