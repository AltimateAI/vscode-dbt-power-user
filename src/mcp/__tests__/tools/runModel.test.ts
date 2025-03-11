import { runModelHandler } from "../../tools/runModel";
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

describe("runModelHandler", () => {
  const mockContext = {
    projectPath: "/test/project/path",
    dbtProfilesPath: "/test/profiles/path",
    altimateApiKey: "test-api-key",
    altimateInstance: "test-instance",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully run a model", async () => {
    // Mock the compiled SQL
    const mockCompiledSql = "SELECT id, name, created_at FROM test_table";

    // Mock the query results
    const mockQueryResults = [
      { id: 1, name: "Test 1", created_at: "2022-01-01" },
      { id: 2, name: "Test 2", created_at: "2022-01-02" },
    ];

    // Mock the dbt project
    const mockDbtProject = {
      compileModel: jest.fn().mockResolvedValue(mockCompiledSql),
      runQuery: jest.fn().mockResolvedValue(mockQueryResults),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler
    const result = await runModelHandler(
      { model: "test_model", limit: 100 },
      mockContext,
    );

    // Verify the result
    expect(result).toEqual({
      content: [
        {
          type: "json",
          json: {
            model: "test_model",
            results: mockQueryResults,
            rowCount: 2,
            message: "Model test_model executed successfully",
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
    expect(mockDbtProject.runQuery).toHaveBeenCalledWith(mockCompiledSql, 100);
  });

  test("should use default limit when not provided", async () => {
    // Mock the compiled SQL
    const mockCompiledSql = "SELECT id, name FROM test_table";

    // Mock the query results
    const mockQueryResults = [{ id: 1, name: "Test" }];

    // Mock the dbt project
    const mockDbtProject = {
      compileModel: jest.fn().mockResolvedValue(mockCompiledSql),
      runQuery: jest.fn().mockResolvedValue(mockQueryResults),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler without specifying a limit
    await runModelHandler({ model: "test_model" }, mockContext);

    // Verify the runQuery method was called with the default limit of 100
    expect(mockDbtProject.runQuery).toHaveBeenCalledWith(mockCompiledSql, 100);
  });

  test("should throw error when model name is not provided", async () => {
    await expect(runModelHandler({} as any, mockContext)).rejects.toThrow(
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
      runModelHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow("Failed to run model 'test_model': Compilation failed");
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
      runModelHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow("Failed to compile model: test_model");
  });
});
