import * as path from "path";
import * as fs from "fs";
import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("compileModelHandler");

/**
 * Handler for the compile_model tool
 * Compiles a dbt model and returns the generated SQL
 */
export async function compileModelHandler(
  args: Record<string, any>,
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { model } = args;

  if (!model) {
    throw new Error("Model name is required");
  }

  logger.info(`Compiling model: ${model}`);

  try {
    // Initialize the dbt project
    const dbt = await initializeDbtProject({
      projectPath: context.projectPath,
      profilesPath: context.dbtProfilesPath,
    });

    // Compile the model
    const compiledSql = await dbt.compileModel(model);

    if (!compiledSql) {
      throw new Error(`Failed to compile model: ${model}`);
    }

    logger.info(`Model compiled successfully: ${model}`);

    // Return the compiled SQL
    return {
      content: [
        {
          type: "text",
          text: compiledSql,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to compile model: ${errorMessage}`);
    throw new Error(`Failed to compile model '${model}': ${errorMessage}`);
  }
}
