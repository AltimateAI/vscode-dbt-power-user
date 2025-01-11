import "reflect-metadata";
import * as path from "path";
import { glob } from "glob";
import { setupCoverage } from "./coverage";

export async function run(): Promise<void> {
  // Initialize coverage
  setupCoverage();

  const testsRoot = path.resolve(__dirname, ".");

  try {
    const files = await glob("**/**.test.js", { cwd: testsRoot });
    // Add files to the test suite
    files.forEach((f) => {
      require(path.resolve(testsRoot, f));
    });

    return new Promise<void>((resolve, reject) => {
      // Run the Jest test
      process.on("unhandledRejection", (err) => {
        console.error(err);
        reject(err);
      });

      resolve();
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
