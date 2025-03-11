import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("generateDocsHandler");

/**
 * Handler for the generate_docs tool
 * Uses AI to generate documentation for a model
 */
export async function generateDocsHandler(
  args: Record<string, any>,
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { model } = args;

  if (!model) {
    throw new Error("Model name is required");
  }

  logger.info(`Generating documentation for model: ${model}`);

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

    // This would typically call the Altimate API to generate documentation
    // For now, we're just returning a placeholder
    const documentation = {
      description: `This is a placeholder description for the ${model} model.`,
      columns: [
        {
          name: "id",
          description: "Primary key for the table",
        },
        {
          name: "created_at",
          description: "Timestamp when the record was created",
        },
      ],
    };

    return {
      content: [
        {
          type: "json",
          json: documentation,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to generate documentation: ${errorMessage}`);
    throw new Error(
      `Failed to generate documentation for model '${model}': ${errorMessage}`,
    );
  }
}
