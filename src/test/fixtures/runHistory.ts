import type {
  RunResultEntry,
  RunResultsEventData,
} from "@altimateai/dbt-integration";

export const createResult = (
  overrides: Partial<RunResultEntry> = {},
): RunResultEntry => ({
  name: "model1",
  uniqueId: "model.project.model1",
  status: "success",
  executionTime: 1.0,
  resourceType: "model",
  ...overrides,
});

export const createEntry = (
  overrides: Partial<RunResultsEventData> = {},
): RunResultsEventData => ({
  id: "test-invocation",
  command: "run",
  args: [],
  completedAt: new Date("2024-01-15T10:30:00"),
  projectName: "test-project",
  results: [createResult()],
  elapsedTime: 1.0,
  ...overrides,
});
