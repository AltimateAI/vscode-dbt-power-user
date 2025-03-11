import { compileModelHandler } from "../../tools/compileModel";
import { initializeDbtProject } from "../../tools/utils/dbtProject";
import { createLogger } from "../../logger";

// Mock dependencies
jest.mock("../../tools/utils/dbtProject", () => ({
  initializeDbtProject: jest.fn(),
}));

jest.mock("../../logger", () => ({
  createLogger: jest.fn(() => ({
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  })),
}));

describe("compileModelHandler", () => {
  const mockContext = {
    projectPath: "/test/project/path",
    dbtProfilesPath: "/test/profiles/path",
    altimateApiKey: "test-api-key",
    altimateInstance: "test-instance",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully compile a model", async () => {
    // Mock the dbt project
    const mockDbtProject = {
      compileModel: jest.fn().mockResolvedValue("SELECT * FROM test"),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler
    const result = await compileModelHandler(
      { model: "test_model" },
      mockContext,
    );

    // Verify the result
    expect(result).toEqual({
      content: [
        {
          type: "text",
          text: "SELECT * FROM test",
        },
      ],
    });

    // Verify dbt project was initialized with the correct parameters
    expect(initializeDbtProject).toHaveBeenCalledWith({
      projectPath: mockContext.projectPath,
      profilesPath: mockContext.dbtProfilesPath,
    });

    // Verify the compile method was called with the correct model name
    expect(mockDbtProject.compileModel).toHaveBeenCalledWith("test_model");
  });

  test("should throw error when model name is not provided", async () => {
    await expect(compileModelHandler({} as any, mockContext)).rejects.toThrow(
      "Model name is required",
    );
  });

  test("should throw error when compilation fails", async () => {
    // Mock a failed compilation
    const mockDbtProject = {
      compileModel: jest
        .fn()
        .mockRejectedValue(new Error("Compilation failed")),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler and expect it to throw
    await expect(
      compileModelHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow(
      "Failed to compile model 'test_model': Compilation failed",
    );
  });

  test("should throw error when compilation returns null", async () => {
    // Mock a compilation that returns null
    const mockDbtProject = {
      compileModel: jest.fn().mockResolvedValue(null),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler and expect it to throw
    await expect(
      compileModelHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow("Failed to compile model: test_model");
  });
});
