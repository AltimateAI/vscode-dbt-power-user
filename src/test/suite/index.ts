import "reflect-metadata";
import * as path from "path";
import Mocha from "mocha";
import { glob } from "glob";
import { setupCoverage } from "./coverage";

export async function run(): Promise<void> {
  // Initialize coverage
  setupCoverage();

  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
    timeout: 60000, // Increased timeout for extension tests
  });

  const testsRoot = path.resolve(__dirname, ".");

  try {
    const files = await glob("**/**.test.js", { cwd: testsRoot });
    // Add files to the test suite
    files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

    return new Promise<void>((resolve, reject) => {
      // Run the mocha test
      mocha.run((failures: number) => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
