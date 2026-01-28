/**
 * Tests for package.json configuration correctness.
 *
 * Issue #1682: `enableNewLineagePanel` should default to `true`.
 */
import { describe, expect, it } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";

const packageJsonPath = path.resolve(__dirname, "../../../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

describe("package.json configuration", () => {
  describe("Issue #1682: enableNewLineagePanel default value", () => {
    // `configuration` can be an array of config sections
    const configSections = Array.isArray(packageJson.contributes?.configuration)
      ? packageJson.contributes.configuration
      : [packageJson.contributes?.configuration].filter(Boolean);

    let prop: any;
    for (const section of configSections) {
      if (section?.properties?.["dbt.enableNewLineagePanel"]) {
        prop = section.properties["dbt.enableNewLineagePanel"];
        break;
      }
    }

    it("should have the enableNewLineagePanel setting defined", () => {
      expect(prop).toBeDefined();
    });

    it("should default to true", () => {
      // BUG: currently missing default — this test should FAIL before the fix
      expect(prop.default).toBe(true);
    });
  });
});
