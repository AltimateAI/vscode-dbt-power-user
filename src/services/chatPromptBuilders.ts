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

export function buildRunResultFailurePrompt(
  result: RunResultEntry,
  parentCommand?: string,
): string {
  const lines = [
    `A dbt ${result.resourceType} failed. Help me diagnose and fix the error.\n`,
    `**${result.resourceType.charAt(0).toUpperCase() + result.resourceType.slice(1)}:** \`${result.name}\``,
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

export function buildCommandErrorPrompt(
  command: string,
  errorMessage: string,
): string {
  return (
    `dbt command \`${command}\` failed with an error before completing.\n\n` +
    `**Error:**\n\`\`\`\n${errorMessage}\n\`\`\`\n\n` +
    `Help me understand and fix this error.`
  );
}

export function buildManifestErrorPrompt(
  modelName: string,
  rawSql: string | undefined,
  reason: string,
): string {
  const sqlSection = rawSql
    ? `\n\n**Model SQL:**\n\`\`\`sql\n${rawSql}\n\`\`\``
    : "";
  return (
    `Validate SQL on model \`${modelName}\` failed: ${reason}.${sqlSection}\n\n` +
    `Help me understand and fix this issue.`
  );
}

export function buildSqlCompileErrorPrompt(
  modelName: string,
  rawSql: string | undefined,
): string {
  const sqlSection = rawSql
    ? `\n\n**Model SQL:**\n\`\`\`sql\n${rawSql}\n\`\`\``
    : "";
  return (
    `SQL for model \`${modelName}\` failed to compile. ` +
    `This usually means a referenced model or source does not exist.` +
    `${sqlSection}\n\n` +
    `Help me understand and fix the compilation error.`
  );
}
