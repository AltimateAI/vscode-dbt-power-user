/**
 * Tests for RunModel.runTestsOnActiveWindow().
 *
 * Issue #1720: Running tests from a singular test file should call
 *              `runTest()` (not `runModelTest()`), so the correct
 *              dbt command is dispatched for singular tests.
 */
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { Uri, window } from "vscode";
import { RunModel } from "../../commands/runModel";
import { createMockDBTProjectContainer } from "../helpers/mockProjectContainer";

describe("RunModel", () => {
  let runModel: RunModel;
  let mockContainer: ReturnType<typeof createMockDBTProjectContainer>;

  beforeEach(() => {
    mockContainer = createMockDBTProjectContainer();
    runModel = new RunModel(mockContainer as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Reset activeTextEditor
    (window as any).activeTextEditor = undefined;
  });

  /**
   * Helper to set up a fake active text editor with a specific file path.
   */
  function setActiveEditor(fsPath: string) {
    (window as any).activeTextEditor = {
      document: {
        uri: { fsPath } as Uri,
        getText: jest.fn().mockReturnValue("select 1"),
      },
      selection: { isEmpty: true },
    };
  }

  describe("runTestsOnActiveWindow (Issue #1720)", () => {
    it("should call runModelTest for model files", () => {
      setActiveEditor("/project/models/my_model.sql");

      runModel.runTestsOnActiveWindow();

      // For model files, runModelTest is the expected call
      expect(mockContainer.runModelTest).toHaveBeenCalledWith(
        expect.objectContaining({ fsPath: "/project/models/my_model.sql" }),
        "my_model",
      );
    });

    it("should call runTest (not runModelTest) for singular test files", () => {
      // BUG: current code on line 33 always calls this.runDBTModelTest(fullPath)
      // which always calls dbtProjectContainer.runModelTest().
      // For singular tests in the tests/ directory, it should call runTest() instead.
      setActiveEditor("/project/tests/my_singular_test.sql");

      runModel.runTestsOnActiveWindow();

      // This test should FAIL before the fix:
      // The code currently calls runModelTest even for singular test files
      expect(mockContainer.runTest).toHaveBeenCalled();
      expect(mockContainer.runModelTest).not.toHaveBeenCalled();
    });

    it("should not call any method when no active editor", () => {
      (window as any).activeTextEditor = undefined;

      runModel.runTestsOnActiveWindow();

      expect(mockContainer.runModelTest).not.toHaveBeenCalled();
      expect(mockContainer.runTest).not.toHaveBeenCalled();
    });
  });

  describe("runModelOnActiveWindow", () => {
    it("should call runModel with the active file URI", () => {
      setActiveEditor("/project/models/my_model.sql");

      runModel.runModelOnActiveWindow();

      expect(mockContainer.runModel).toHaveBeenCalledWith(
        expect.objectContaining({ fsPath: "/project/models/my_model.sql" }),
        undefined,
      );
    });

    it("should not call runModel when no active editor", () => {
      (window as any).activeTextEditor = undefined;

      runModel.runModelOnActiveWindow();

      expect(mockContainer.runModel).not.toHaveBeenCalled();
    });
  });
});
