import "reflect-metadata";
import * as path from "path";
import * as Mocha from "mocha";
import { glob } from "glob";

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
    timeout: 100000,
  });

  const testsRoot = path.resolve(__dirname, "..");

  return new Promise((resolve, reject) => {
    glob("**/lineage.test.js", { cwd: testsRoot })
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
