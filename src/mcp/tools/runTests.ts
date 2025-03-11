import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("runTestsHandler");

/**
 * Handler for the run_tests tool
 * Runs dbt tests on a specific model or the entire project
 */
export async function runTestsHandler(
  args: {
    model?: string;
    data_tests_only?: boolean;
    schema_tests_only?: boolean;
  },
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { model, data_tests_only, schema_tests_only } = args;

  logger.info(`Running tests${model ? ` for model: ${model}` : ""}`);

  try {
    // Initialize the dbt project
    const dbt = await initializeDbtProject({
      projectPath: context.projectPath,
      profilesPath: context.dbtProfilesPath,
    });

    // Run tests
    const testResults = await dbt.runTests({
      model,
      dataTestsOnly: data_tests_only,
      schemaTestsOnly: schema_tests_only,
    });

    return {
      content: [
        {
          type: "json",
          json: testResults,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to run tests: ${errorMessage}`);
    throw new Error(`Failed to run tests: ${errorMessage}`);
  }
}
