import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("generateTestHandler");

/**
 * Handler for the generate_test tool
 * Uses AI to generate dbt tests for a model
 */
export async function generateTestHandler(
  args: Record<string, any>,
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { model, tests_type = "schema" } = args;

  if (!model) {
    throw new Error("Model name is required");
  }

  logger.info(`Generating tests for model: ${model}`);

  try {
    // Initialize the dbt project
    const dbt = await initializeDbtProject({
      projectPath: context.projectPath,
      profilesPath: context.dbtProfilesPath,
    });

    // Compile the model to get its SQL
    const sql = await dbt.compileModel(model);

    if (!sql) {
      throw new Error(`Failed to compile model: ${model}`);
    }

    // This would typically call an AI service to generate tests based on the model SQL
    // For now, we're returning some sample tests
    const sampleSchemaTests = {
      version: 2,
      models: [
        {
          name: model,
          description: `Tests for ${model} model`,
          columns: [
            {
              name: "id",
              tests: ["not_null", "unique"],
            },
            {
              name: "user_id",
              tests: [
                "not_null",
                { relationships: { to: "ref('users')", field: "id" } },
              ],
            },
            {
              name: "status",
              tests: [
                {
                  accepted_values: {
                    values: ["active", "inactive", "pending"],
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    const sampleDataTests = `
-- Test to ensure no duplicate records based on composite key
SELECT
  id,
  user_id,
  COUNT(*) as count
FROM {{ ref('${model}') }}
GROUP BY id, user_id
HAVING COUNT(*) > 1

-- Test to ensure created_at is not in the future
SELECT *
FROM {{ ref('${model}') }}
WHERE created_at > CURRENT_TIMESTAMP()
`;

    return {
      content: [
        {
          type: "json",
          json: {
            model,
            schema_tests: sampleSchemaTests,
          },
        },
        {
          type: "text",
          text:
            tests_type === "data"
              ? sampleDataTests
              : `Schema tests generated for ${model}`,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to generate tests: ${errorMessage}`);
    throw new Error(
      `Failed to generate tests for model '${model}': ${errorMessage}`,
    );
  }
}
