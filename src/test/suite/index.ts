import "reflect-metadata";
import * as path from "path";
import Mocha from "mocha";
import { glob } from "glob";

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
    timeout: 60000, // Increased timeout for extension tests
  });

  const testsRoot = path.resolve(__dirname, ".");

  return new Promise((resolve, reject) => {
    glob("**/**.test.js", { cwd: testsRoot })
      .then((files: string[]) => {
        try {
          // Add files to the test suite
          files.forEach((file: string) =>
            mocha.addFile(path.resolve(testsRoot, file)),
          );

          // Run the mocha test
          mocha.run((failures: number) => {
            if (failures > 0) {
              reject(new Error(`${failures} tests failed.`));
            } else {
              resolve();
            }
          });
        } catch (err) {
          reject(err);
        }
      })
      .catch((err) => reject(err));
  });
}
