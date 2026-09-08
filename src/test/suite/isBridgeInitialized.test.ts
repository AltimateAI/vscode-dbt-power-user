import { describe, expect, it } from "@jest/globals";
import { DBTProject } from "../../dbt_client/dbtProject";

/**
 * The scan-skip contract (altimateScan) rests on this one method: it must
 * report exactly what the integration adapter's isInitialized() says. The
 * adapter delegation exists since dbt-integration 0.3.11, which is this
 * package's dependency floor — an adapter without the member is out of
 * contract. (The original feature detection probed for the member and fell
 * back to "ready"; it silently never fired because no released adapter
 * carried the method before 0.3.11.)
 */
describe("DBTProject.isBridgeInitialized", () => {
  const call = (integration: unknown): boolean =>
    DBTProject.prototype.isBridgeInitialized.call({
      dbtProjectIntegration: integration,
    } as unknown as DBTProject);

  it("reports the adapter's isInitialized verdict — both ways", () => {
    expect(call({ isInitialized: () => true })).toBe(true);
    expect(call({ isInitialized: () => false })).toBe(false);
  });
});
