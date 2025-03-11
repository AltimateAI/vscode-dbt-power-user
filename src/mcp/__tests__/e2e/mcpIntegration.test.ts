import * as path from "path";
import * as fs from "fs";
import { DBTPowerUserMCPServer } from "../../mcpServer";
import { createLogger } from "../../logger";

// Mock the logger
jest.mock("../../logger", () => ({
  createLogger: jest.fn(() => ({
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  })),
}));

// Increase the timeout for E2E tests
jest.setTimeout(10000);

describe("MCP Server E2E Test", () => {
  let server: DBTPowerUserMCPServer;
  const testProjectPath = path.resolve(
    __dirname,
    "../fixtures/sample_dbt_project",
  );

  beforeAll(async () => {
    // Ensure test fixtures directory exists
    if (!fs.existsSync(testProjectPath)) {
      fs.mkdirSync(testProjectPath, { recursive: true });
    }

    // Create a minimal dbt_project.yml file for testing
    const dbtProjectContent = `
name: 'test_project'
version: '1.0.0'
config-version: 2
profile: 'test_profile'
model-paths: ["models"]
seed-paths: ["seeds"]
test-paths: ["tests"]
analysis-paths: ["analyses"]
macro-paths: ["macros"]
snapshot-paths: ["snapshots"]
    `;
    fs.writeFileSync(
      path.join(testProjectPath, "dbt_project.yml"),
      dbtProjectContent,
    );

    // Create a models directory with a sample model
    const modelsDir = path.join(testProjectPath, "models");
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }

    // Create a sample model file
    const sampleModelContent = `
{{ config(materialized='table') }}

SELECT 1 as id, 'test' as name
    `;
    fs.writeFileSync(
      path.join(modelsDir, "sample_model.sql"),
      sampleModelContent,
    );

    // Create the server instance
    server = new DBTPowerUserMCPServer({
      projectPath: testProjectPath,
      dbtProfilesPath: path.join(testProjectPath, "profiles"),
      altimateApiKey: "test-api-key",
      altimateInstance: "test-instance",
    });
  });

  afterAll(() => {
    // Clean up test fixtures
    if (fs.existsSync(testProjectPath)) {
      fs.rm(testProjectPath, { recursive: true, force: true }, (err) => {
        if (err) {
          console.error("Error cleaning up test fixtures:", err);
        }
      });
    }
  });

  // Helper to create a test that verifies a tool
  const testTool = (
    name: string,
    toolName: string,
    args: Record<string, any>,
    expectedStatusCode: number,
  ) => {
    test(name, async () => {
      try {
        // First, list available tools
        // @ts-ignore - Accessing private method for testing
        const listResponse = server.listTools();

        // Verify the tool exists in the list
        expect(listResponse.tools).toBeDefined();
        const foundTool = listResponse.tools.find((t) => t.name === toolName);

        if (toolName === "non_existent_tool") {
          expect(foundTool).toBeUndefined();

          // Try to call the non-existent tool and expect it to throw
          try {
            // @ts-ignore - Accessing private method for testing
            await server.callTool(toolName, args);
            fail("Should have thrown an error for non-existent tool");
          } catch (error) {
            expect(error).toBeDefined();
            expect((error as Error).message).toContain("not found");
          }
          return;
        }

        expect(foundTool).toBeDefined();

        if (toolName === "compile_model" && !args.model) {
          // Try to call the tool with missing required args and expect it to throw
          try {
            // @ts-ignore - Accessing private method for testing
            await server.callTool(toolName, args);
            fail("Should have thrown an error for missing model name");
          } catch (error) {
            expect(error).toBeDefined();
            expect((error as Error).message).toContain("required");
          }
          return;
        }

        // Call the tool
        // @ts-ignore - Accessing private method for testing
        const callResponse = await server.callTool(toolName, args);

        // Verify response format
        expect(callResponse).toBeDefined();
        expect(callResponse.content).toBeDefined();
        expect(Array.isArray(callResponse.content)).toBe(true);

        // Specific checks for certain tools
        if (toolName === "list_models") {
          const models = callResponse.content.find((c) => c.type === "json")
            ?.json?.models;
          expect(Array.isArray(models)).toBe(true);
        } else if (toolName === "compile_model") {
          const compiledSql = callResponse.content.find(
            (c) => c.type === "text",
          )?.text;
          expect(typeof compiledSql).toBe("string");
          expect(compiledSql.length).toBeGreaterThan(0);
        } else if (toolName === "get_model_columns") {
          const columns = callResponse.content.find((c) => c.type === "json")
            ?.json?.columns;
          expect(Array.isArray(columns)).toBe(true);
          expect(columns.length).toBeGreaterThan(0);
          expect(columns[0]).toHaveProperty("name");
          expect(columns[0]).toHaveProperty("type");
        } else if (toolName === "run_model") {
          const results = callResponse.content.find((c) => c.type === "json")
            ?.json?.results;
          expect(Array.isArray(results)).toBe(true);
        } else if (toolName === "generate_test") {
          if (args.tests_type === "data") {
            const sqlTests = callResponse.content.find(
              (c) => c.type === "text",
            )?.text;
            expect(typeof sqlTests).toBe("string");
            expect(sqlTests).toContain("SELECT");
          } else {
            const schemaTests = callResponse.content.find(
              (c) => c.type === "json",
            )?.json?.schema_tests;
            expect(schemaTests).toBeDefined();
            expect(schemaTests.models).toBeDefined();
          }
        } else if (toolName === "explain_lineage") {
          const lineageData = callResponse.content.find(
            (c) => c.type === "json",
          )?.json;
          const explanation = callResponse.content.find(
            (c) => c.type === "text",
          )?.text;
          expect(lineageData).toBeDefined();
          expect(typeof explanation).toBe("string");
          expect(explanation).toContain(args.model);
        }
      } catch (error) {
        // If the test wasn't expecting an error, fail
        if (expectedStatusCode < 400) {
          console.error(`Error testing ${toolName}:`, error);
          throw error;
        }
      }
    });
  };

  // Define tests for each tool
  testTool("should list models in the project", "list_models", {}, 200);

  testTool(
    "should compile a model",
    "compile_model",
    { model: "sample_model" },
    200,
  );

  testTool(
    "should return error when non-existent tool is called",
    "non_existent_tool",
    {},
    404,
  );

  testTool(
    "should return error when model is not specified for compile_model",
    "compile_model",
    {},
    400,
  );

  // Tests for the new tools

  testTool(
    "should get column information for a model",
    "get_model_columns",
    { model: "sample_model" },
    200,
  );

  testTool(
    "should run a model and return results",
    "run_model",
    { model: "sample_model", limit: 10 },
    200,
  );

  testTool(
    "should generate schema tests for a model",
    "generate_test",
    { model: "sample_model" },
    200,
  );

  testTool(
    "should generate data tests for a model",
    "generate_test",
    { model: "sample_model", tests_type: "data" },
    200,
  );

  testTool(
    "should explain lineage for a model",
    "explain_lineage",
    { model: "sample_model", depth: 2 },
    200,
  );
});
