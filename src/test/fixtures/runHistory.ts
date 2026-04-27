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

export const createTestResult = (
  overrides: Partial<RunResultEntry> = {},
): RunResultEntry => ({
  name: "abc123def456",
  uniqueId: "test.my_project.not_null_orders_order_id.abc123def456",
  status: "success",
  executionTime: 0.5,
  resourceType: "test",
  ...overrides,
});

export const createEntry = (
  overrides: Partial<RunResultsEventData> & { command: string },
): RunResultsEventData => ({
  id: "test-invocation",
  args: [],
  completedAt: new Date("2024-01-15T10:30:00"),
  projectName: "test-project",
  results: [createResult()],
  elapsedTime: 1.0,
  ...overrides,
});
