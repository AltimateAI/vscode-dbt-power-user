import { ToolContext } from "../types";
import { createLogger } from "../logger";
import { initializeDbtProject } from "./utils/dbtProject";

const logger = createLogger("explainLineageHandler");

/**
 * Handler for the explain_lineage tool
 * Provides a natural language explanation of a model's lineage
 */
export async function explainLineageHandler(
  args: Record<string, any>,
  context: ToolContext,
): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
  const { model, depth = 2 } = args;

  if (!model) {
    throw new Error("Model name is required");
  }

  logger.info(`Explaining lineage for model: ${model}`);

  try {
    // Initialize the dbt project
    const dbt = await initializeDbtProject({
      projectPath: context.projectPath,
      profilesPath: context.dbtProfilesPath,
    });

    // Get the lineage information using the getLineage method
    const lineage = await dbt.getLineage(model, { depth, direction: "both" });

    if (!lineage) {
      throw new Error(`Failed to get lineage for model: ${model}`);
    }

    // Generate a natural language explanation of the lineage
    // In a real implementation, this might use AI to generate a more detailed explanation
    const parentsCount = lineage.parents?.length || 0;
    const childrenCount = lineage.children?.length || 0;

    let explanation = `The model "${model}" has ${parentsCount} parent models and ${childrenCount} child models.\n\n`;

    if (parentsCount > 0) {
      explanation += `*Upstream Dependencies:*\n`;
      explanation += `The model depends on ${parentsCount} upstream models: ${lineage.parents.join(", ")}.\n`;
      explanation += `This means that "${model}" uses data from these models as inputs.\n\n`;
    } else {
      explanation += `*Upstream Dependencies:*\n`;
      explanation += `This model has no upstream dependencies. It likely sources data directly from the raw data.\n\n`;
    }

    if (childrenCount > 0) {
      explanation += `*Downstream Dependencies:*\n`;
      explanation += `${childrenCount} models depend on "${model}": ${lineage.children.join(", ")}.\n`;
      explanation += `Changes to "${model}" will impact these downstream models.\n\n`;
    } else {
      explanation += `*Downstream Dependencies:*\n`;
      explanation += `No models depend on "${model}". It's likely an end-user facing model used for reporting or analytics.\n\n`;
    }

    explanation += `*Data Flow Impact:*\n`;
    explanation += `When running "${model}", dbt will ensure all ${parentsCount} upstream dependencies are built first.\n`;
    explanation += `Changes to the structure or logic of "${model}" could potentially impact ${childrenCount} downstream models.`;

    return {
      content: [
        {
          type: "json",
          json: lineage,
        },
        {
          type: "text",
          text: explanation,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`Failed to explain lineage: ${errorMessage}`);
    throw new Error(
      `Failed to explain lineage for model '${model}': ${errorMessage}`,
    );
  }
}
