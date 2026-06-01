import type {
  RunResultEntry,
  RunResultsEventData,
} from "../services/runHistoryService";

export function buildRunFailurePrompt(
  entry: RunResultsEventData,
  failed: RunResultEntry[],
): string {
  const lines = failed.map(
    (r) => `- **${r.resourceType}** \`${r.name}\`: ${r.message ?? "failed"}`,
  );
  return (
    `The following dbt command failed:\n` +
    `\`\`\`\n${entry.command}\n\`\`\`\n\n` +
    `**Errors (${failed.length}):**\n${lines.join("\n")}\n\n` +
    `Help me diagnose and fix these failures.`
  );
}

export function buildSqlValidationPrompt(
  compiledSql: string,
  errors: Array<{ description: string }>,
  modelName: string,
  dialect: string,
): string {
  const errorLines = errors.map((e) => `- ${e.description}`).join("\n");
  return (
    `This compiled SQL (${dialect}) has validation errors. Fix the SQL so it passes validation.\n\n` +
    `**Model:** \`${modelName}\`\n\n` +
    `**Compiled SQL:**\n\`\`\`sql\n${compiledSql}\n\`\`\`\n\n` +
    `**Errors:**\n${errorLines}`
  );
}

export function buildTestFailurePrompt(
  result: RunResultEntry,
  parentCommand?: string,
): string {
  const lines = [
    `A dbt test failed. Explain why it failed and how to fix it.\n`,
    `**Test:** \`${result.name}\``,
    `**Unique ID:** \`${result.uniqueId}\``,
    `**Status:** ${result.status}`,
  ];
  if (result.message) {
    lines.push(`**Failure message:** ${result.message}`);
  }
  if (parentCommand) {
    lines.push(`**Run command:** \`${parentCommand}\``);
  }
  return lines.join("\n");
}
