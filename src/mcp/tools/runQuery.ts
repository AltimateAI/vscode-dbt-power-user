import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("runQueryHandler");

/**
 * Handler for the run_query tool
 * Executes a SQL query against the data warehouse and returns results
 */
export async function runQueryHandler(
  args: { sql?: string; model?: string; limit?: number },
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { sql, model, limit = 100 } = args;

  if (!sql && !model) {
    throw new Error("Either sql or model must be provided");
  }

  logger.info("Running query");

  try {
    // Initialize the dbt project
    const dbt = await initializeDbtProject({
      projectPath: context.projectPath,
      profilesPath: context.dbtProfilesPath,
    });

    let results: any[] = [];

    if (model) {
      // Run query for a specific model
      // This is a placeholder - implementation would compile and run the model
      results = [{ id: 1, name: "Test" }]; // Placeholder
    } else if (sql) {
      // Run custom SQL query
      results = await dbt.runQuery(sql, limit);
    }

    return {
      content: [
        {
          type: "json",
          json: {
            rows: results,
            rowCount: results.length,
          },
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to run query: ${errorMessage}`);
    throw new Error(`Failed to run query: ${errorMessage}`);
  }
}
