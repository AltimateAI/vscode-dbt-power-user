import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("explainQueryHandler");

/**
 * Handler for the explain_query tool
 * Provides an AI-generated explanation of a SQL query
 */
export async function explainQueryHandler(
  args: { sql?: string; model?: string },
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { sql, model } = args;

  if (!sql && !model) {
    throw new Error("Either sql or model must be provided");
  }

  logger.info("Explaining query");

  try {
    let queryToExplain = sql;

    // If a model is provided but no SQL, compile the model to get its SQL
    if (!queryToExplain && model) {
      // Initialize the dbt project
      const dbt = await initializeDbtProject({
        projectPath: context.projectPath,
        profilesPath: context.dbtProfilesPath,
      });

      // Compile the model to get its SQL
      queryToExplain = await dbt.compileModel(model);
    }

    if (!queryToExplain) {
      throw new Error("Could not get query to explain");
    }

    // Use Altimate API to explain the query
    // This is a placeholder for the actual API call
    const explanation = `This is a placeholder explanation for the query: ${queryToExplain.substring(0, 50)}...`;

    return {
      content: [
        {
          type: "text",
          text: explanation,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to explain query: ${errorMessage}`);
    throw new Error(`Failed to explain query: ${errorMessage}`);
  }
}
