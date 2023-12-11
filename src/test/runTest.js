"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const cp = require("child_process");
const test_electron_1 = require("@vscode/test-electron");
const environment_1 = require("./utils/environment");
function main() {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
      const python = (0, environment_1.getPythonExecutable)();
      console.log(`Python executable is ${python}`);
      const version = "1.85.0";
      // The folder containing the Extension Manifest package.json
      // Passed to `--extensionDevelopmentPath`
      const extensionDevelopmentPath = path.resolve(__dirname, "../../");
      // The path to the extension test script
      // Passed to --extensionTestsPath
      const extensionTestsPath = path.resolve(__dirname, "./suite/index.js");
      console.log(extensionTestsPath, "extensionTestsPath");
      // Download VS Code, unzip it and run the integration test
      const vscodeExecutablePath = yield (0,
      test_electron_1.downloadAndUnzipVSCode)(version);
      const [cliPath, ...args] = (0,
      test_electron_1.resolveCliArgsFromVSCodeExecutablePath)(
        vscodeExecutablePath,
      );
      // Use cp.spawn / cp.exec for custom setup
      cp.spawnSync(
        cliPath,
        [...args, "--install-extension", "ms-python.python"],
        {
          encoding: "utf-8",
          stdio: "inherit",
        },
      );
      cp.spawnSync(
        cliPath,
        [...args, "--install-extension", "samuelcolvin.jinjahtml"],
        {
          encoding: "utf-8",
          stdio: "inherit",
        },
      );
      // Run the extension test
      yield (0, test_electron_1.runTests)({
        // Use the specified `code` executable
        vscodeExecutablePath: vscodeExecutablePath,
        extensionDevelopmentPath: extensionDevelopmentPath,
        extensionTestsPath: extensionTestsPath,
        version: version,
        launchArgs: [path.join(__dirname, "../../test/sample_projects")],
      });
      console.log("Tests passed");
    } catch (err) {
      console.error("Failed to run tests");
      process.exit(1);
    }
  });
}
main().catch((err) => {
  console.error("Run ended with error", err);
  process.exit(1);
});
//# sourceMappingURL=runTest.js.map
