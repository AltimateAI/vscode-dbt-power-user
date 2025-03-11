import { generateTestHandler } from "../../tools/generateTest";
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

describe("generateTestHandler", () => {
  const mockContext = {
    projectPath: "/test/project/path",
    dbtProfilesPath: "/test/profiles/path",
    altimateApiKey: "test-api-key",
    altimateInstance: "test-instance",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully generate schema tests by default", async () => {
    // Mock the compiled SQL
    const mockCompiledSql = "SELECT id, user_id, status FROM test_table";

    // Mock the dbt project
    const mockDbtProject = {
      compileModel: jest.fn().mockResolvedValue(mockCompiledSql),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler
    const result = await generateTestHandler(
      { model: "test_model" },
      mockContext,
    );

    // Verify the result
    expect(result).toEqual({
      content: expect.arrayContaining([
        expect.objectContaining({
          type: "json",
          json: expect.objectContaining({
            model: "test_model",
            schema_tests: expect.objectContaining({
              models: expect.arrayContaining([
                expect.objectContaining({
                  name: "test_model",
                  columns: expect.any(Array),
                }),
              ]),
            }),
          }),
        }),
        expect.objectContaining({
          type: "text",
          text: expect.stringContaining(
            "Schema tests generated for test_model",
          ),
        }),
      ]),
    });

    // Verify dbt project was initialized with the correct parameters
    expect(initializeDbtProject).toHaveBeenCalledWith({
      projectPath: mockContext.projectPath,
      profilesPath: mockContext.dbtProfilesPath,
    });

    // Verify the compile method was called with the correct model name
    expect(mockDbtProject.compileModel).toHaveBeenCalledWith("test_model");
  });

  test("should generate data tests when specified", async () => {
    // Mock the compiled SQL
    const mockCompiledSql = "SELECT id, user_id, created_at FROM test_table";

    // Mock the dbt project
    const mockDbtProject = {
      compileModel: jest.fn().mockResolvedValue(mockCompiledSql),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler with tests_type = "data"
    const result = await generateTestHandler(
      { model: "test_model", tests_type: "data" },
      mockContext,
    );

    // Verify the result contains data tests (SQL text)
    const textContent = result.content.find((c) => c.type === "text");
    expect(textContent).toBeDefined();
    expect(textContent?.text).toContain("FROM {{ ref('test_model') }}");
    expect(textContent?.text).toContain("GROUP BY");
    expect(textContent?.text).toContain("HAVING COUNT");
  });

  test("should throw error when model name is not provided", async () => {
    await expect(generateTestHandler({} as any, mockContext)).rejects.toThrow(
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
      generateTestHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow(
      "Failed to generate tests for model 'test_model': Compilation failed",
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
      generateTestHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow("Failed to compile model: test_model");
  });
});
