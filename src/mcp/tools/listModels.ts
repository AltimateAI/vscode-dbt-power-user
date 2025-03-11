import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("listModelsHandler");

/**
 * Handler for the list_models tool
 * Lists all models in the dbt project
 */
export async function listModelsHandler(
  args: { model_type?: string; include_disabled?: boolean },
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  logger.info("Listing models");

  try {
    // Initialize the dbt project
    const dbt = await initializeDbtProject({
      projectPath: context.projectPath,
      profilesPath: context.dbtProfilesPath,
    });

    // Get models from manifest using dbt ls command
    // This is a placeholder - implementation would use dbt ls to get models
    const models = ["model1", "model2", "model3"]; // Placeholder

    return {
      content: [
        {
          type: "json",
          json: {
            models,
          },
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to list models: ${errorMessage}`);
    throw new Error(`Failed to list models: ${errorMessage}`);
  }
}
