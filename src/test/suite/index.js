"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
require("reflect-metadata");
const path = require("path");
const Mocha = require("mocha");
const glob_1 = require("glob");
function run() {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
    timeout: 100000,
  });
  const testsRoot = path.resolve(__dirname, "..");
  console.log("testsRoot", testsRoot);
  return new Promise((resolve, reject) => {
    // mocha.addFile(path.resolve( "./dist/test/", "suite/lineage.test"));
    //     try {
    //       // Run the mocha test
    //       mocha.run((failures) => {
    //         if (failures > 0) {
    //           reject(new Error(`${failures} tests failed.`));
    //         } else {
    //         }
    //       });
    //     } catch (err) {
    //       console.error(err);
    //       reject(err);
    //     }
    (0, glob_1.glob)("**/lineage.test.js", { cwd: testsRoot })
      .then((files) => {
        //   if (err) {
        //     return reject(err);
        //   }
        // Add files to the test suite
        files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
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
exports.run = run;
//# sourceMappingURL=index.js.map
