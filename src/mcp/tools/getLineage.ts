import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("getLineageHandler");

/**
 * Handler for the get_lineage tool
 * Returns lineage information (parents and children) for a given model
 */
export async function getLineageHandler(
  args: Record<string, any>,
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { model, depth = 1, direction = "both" } = args;

  if (!model) {
    throw new Error("Model name is required");
  }

  logger.info(`Getting lineage for model: ${model}`);

  try {
    // Initialize the dbt project
    const dbt = await initializeDbtProject({
      projectPath: context.projectPath,
      profilesPath: context.dbtProfilesPath,
    });

    // Get lineage information
    const lineage = await dbt.getLineage(model, { depth, direction });

    return {
      content: [
        {
          type: "json",
          json: lineage,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to get lineage: ${errorMessage}`);
    throw new Error(
      `Failed to get lineage for model '${model}': ${errorMessage}`,
    );
  }
}
