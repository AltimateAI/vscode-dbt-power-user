import { DBTTerminal } from "@altimateai/dbt-integration";

/**
 * Creates a jest-mocked DBTTerminal with all logging methods stubbed.
 * Extracted from the repeated pattern in cteCodeLensProvider.test.ts
 * and other test files.
 */
export function createMockDBTTerminal(): jest.Mocked<DBTTerminal> {
  return {
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    trace: jest.fn(),
  } as any;
}
