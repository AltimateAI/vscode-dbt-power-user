import { getModelColumnsHandler } from "../../tools/getModelColumns";
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

describe("getModelColumnsHandler", () => {
  const mockContext = {
    projectPath: "/test/project/path",
    dbtProfilesPath: "/test/profiles/path",
    altimateApiKey: "test-api-key",
    altimateInstance: "test-instance",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully retrieve column information", async () => {
    // Mock the compiled SQL
    const mockCompiledSql = "SELECT id, name, created_at FROM test_table";

    // Mock the query results with explicit type
    const mockQueryResults: Record<string, any>[] = []; // Empty array representing LIMIT 0 results

    // Mock the dbt project
    const mockDbtProject = {
      compileModel: jest.fn().mockResolvedValue(mockCompiledSql),
      runQuery: jest.fn().mockResolvedValue(mockQueryResults),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler
    const result = await getModelColumnsHandler(
      { model: "test_model" },
      mockContext,
    );

    // Verify the result
    expect(result).toEqual({
      content: [
        {
          type: "json",
          json: {
            model: "test_model",
            columns: expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                type: expect.any(String),
                description: expect.any(String),
                tests: expect.any(Array),
              }),
            ]),
          },
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

    // Verify the runQuery method was called with the SQL and a LIMIT
    expect(mockDbtProject.runQuery).toHaveBeenCalledWith(
      expect.stringContaining(mockCompiledSql),
      0,
    );
  });

  test("should throw error when model name is not provided", async () => {
    await expect(
      getModelColumnsHandler({} as any, mockContext),
    ).rejects.toThrow("Model name is required");
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
      getModelColumnsHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow(
      "Failed to get column information for model 'test_model': Compilation failed",
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
      getModelColumnsHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow("Failed to compile model: test_model");
  });
});
