import { ToolContext } from "../types";
import { createLogger } from "../logger";

const logger = createLogger("generateModelFromSqlHandler");

/**
 * Handler for the generate_model_from_sql tool
 * Uses AI to generate a dbt model from raw SQL
 */
export async function generateModelFromSqlHandler(
  args: Record<string, any>,
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { sql, model_name } = args;

  if (!sql) {
    throw new Error("SQL query is required");
  }

  logger.info("Generating dbt model from SQL");

  try {
    // This would typically call the Altimate API to generate the model
    // For now, we're just returning a placeholder

    const modelName = model_name || "new_model";

    // Placeholder model code
    const modelCode = `-- models/${modelName}.sql
{{ config(
    materialized='table'
) }}

-- Generated from SQL
${sql}`;

    return {
      content: [
        {
          type: "text",
          text: modelCode,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to generate model from SQL: ${errorMessage}`);
    throw new Error(`Failed to generate model from SQL: ${errorMessage}`);
  }
}
