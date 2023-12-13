import "reflect-metadata";
import * as path from "path";
import * as Mocha from "mocha";
import { glob } from "glob";
import { TestTypes } from "../constants";

const getTestSuite = () => {
  switch (process.env.testType) {
    case TestTypes.NoExtensions:
      return "./suite/envCheck/noExtensions.test.js";
    case TestTypes.MissingPythonExtension:
      return "./suite/envCheck/missingPythonExtension.test.js";
    default:
      return "./suite/tests/**/*.test.js";
  }
};
export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");

  const testSuite = getTestSuite();

  console.log("testsRoot", testsRoot, testSuite);

  return new Promise((resolve, reject) => {
    glob(testSuite, { cwd: testsRoot })
      .then((files: any[]) => {
        //   if (err) {
        //     return reject(err);
        //   }

        // Add files to the test suite
        files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

        try {
          // Run the mocha test
          mocha.run((failures) => {
            if (failures > 0) {
              reject(new Error(`${failures} tests failed.`));
            } else {
              resolve();
            }
          });
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
      .catch((err) => console.log(err));
  });
}
