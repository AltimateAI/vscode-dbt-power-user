import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("runModelHandler");

/**
 * Handler for the run_model tool
 * Runs a dbt model and returns the results
 */
export async function runModelHandler(
  args: Record<string, any>,
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { model, limit = 100 } = args;

  if (!model) {
    throw new Error("Model name is required");
  }

  logger.info(`Running model: ${model}`);

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

    // Run the query from the compiled SQL
    const results = await dbt.runQuery(sql, limit);

    logger.info(`Model run successfully: ${model}`);

    return {
      content: [
        {
          type: "json",
          json: {
            model,
            results,
            rowCount: results.length,
            message: `Model ${model} executed successfully`,
          },
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to run model: ${errorMessage}`);
    throw new Error(`Failed to run model '${model}': ${errorMessage}`);
  }
}
