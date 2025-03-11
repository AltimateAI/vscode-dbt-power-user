import { explainLineageHandler } from "../../tools/explainLineage";
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

describe("explainLineageHandler", () => {
  const mockContext = {
    projectPath: "/test/project/path",
    dbtProfilesPath: "/test/profiles/path",
    altimateApiKey: "test-api-key",
    altimateInstance: "test-instance",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully explain lineage with both parents and children", async () => {
    // Mock lineage data
    const mockLineage = {
      model: "test_model",
      parents: ["parent_model1", "parent_model2"],
      children: ["child_model1", "child_model2", "child_model3"],
    };

    // Mock the dbt project
    const mockDbtProject = {
      getLineage: jest.fn().mockResolvedValue(mockLineage),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler
    const result = await explainLineageHandler(
      { model: "test_model", depth: 2 },
      mockContext,
    );

    // Verify the result
    expect(result.content).toHaveLength(2);
    expect(result.content[0]).toEqual({
      type: "json",
      json: mockLineage,
    });

    // Check the text content
    const textContent = result.content[1];
    expect(textContent.type).toBe("text");
    expect(textContent.text).toContain("test_model");
    expect(textContent.text).toContain("2 parent models");
    expect(textContent.text).toContain("3 child models");
    expect(textContent.text).toContain("parent_model1, parent_model2");
    expect(textContent.text).toContain(
      "child_model1, child_model2, child_model3",
    );

    // Verify dbt project was initialized with the correct parameters
    expect(initializeDbtProject).toHaveBeenCalledWith({
      projectPath: mockContext.projectPath,
      profilesPath: mockContext.dbtProfilesPath,
    });

    // Verify the getLineage method was called with the correct parameters
    expect(mockDbtProject.getLineage).toHaveBeenCalledWith("test_model", {
      depth: 2,
      direction: "both",
    });
  });

  test("should explain lineage with no parents", async () => {
    // Mock lineage data with no parents
    const mockLineage = {
      model: "test_model",
      parents: [],
      children: ["child_model1", "child_model2"],
    };

    // Mock the dbt project
    const mockDbtProject = {
      getLineage: jest.fn().mockResolvedValue(mockLineage),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler
    const result = await explainLineageHandler(
      { model: "test_model" },
      mockContext,
    );

    // Check the text content
    const textContent = result.content[1];
    expect(textContent.type).toBe("text");
    expect(textContent.text).toContain("no upstream dependencies");
    expect(textContent.text).toContain("2 models depend on");
  });

  test("should explain lineage with no children", async () => {
    // Mock lineage data with no children
    const mockLineage = {
      model: "test_model",
      parents: ["parent_model1"],
      children: [],
    };

    // Mock the dbt project
    const mockDbtProject = {
      getLineage: jest.fn().mockResolvedValue(mockLineage),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler
    const result = await explainLineageHandler(
      { model: "test_model" },
      mockContext,
    );

    // Check the text content
    const textContent = result.content[1];
    expect(textContent.type).toBe("text");
    expect(textContent.text).toContain("1 parent models");
    expect(textContent.text).toContain("No models depend on");
  });

  test("should use default depth when not specified", async () => {
    // Mock lineage data
    const mockLineage = {
      model: "test_model",
      parents: ["parent_model"],
      children: ["child_model"],
    };

    // Mock the dbt project
    const mockDbtProject = {
      getLineage: jest.fn().mockResolvedValue(mockLineage),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler without specifying a depth
    await explainLineageHandler({ model: "test_model" }, mockContext);

    // Verify the getLineage method was called with the default depth of 2
    expect(mockDbtProject.getLineage).toHaveBeenCalledWith("test_model", {
      depth: 2,
      direction: "both",
    });
  });

  test("should throw error when model name is not provided", async () => {
    await expect(explainLineageHandler({} as any, mockContext)).rejects.toThrow(
      "Model name is required",
    );
  });

  test("should throw error when getLineage fails", async () => {
    // Mock a failed lineage retrieval
    const mockDbtProject = {
      getLineage: jest
        .fn()
        .mockRejectedValue(new Error("Lineage retrieval failed")),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler and expect it to throw
    await expect(
      explainLineageHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow(
      "Failed to explain lineage for model 'test_model': Lineage retrieval failed",
    );
  });

  test("should throw error when getLineage returns null", async () => {
    // Mock a lineage retrieval that returns null
    const mockDbtProject = {
      getLineage: jest.fn().mockResolvedValue(null),
    };

    // Setup the mock implementation
    (initializeDbtProject as jest.Mock).mockResolvedValue(mockDbtProject);

    // Call the handler and expect it to throw
    await expect(
      explainLineageHandler({ model: "test_model" }, mockContext),
    ).rejects.toThrow("Failed to get lineage for model: test_model");
  });
});
