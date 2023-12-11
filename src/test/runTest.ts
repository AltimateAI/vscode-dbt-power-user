import * as path from "path";
import * as cp from "child_process";

import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests,
} from "@vscode/test-electron";
import { getPythonExecutable } from "./utils/environment";

async function main() {
  try {
    const python = getPythonExecutable();
    console.log(`Python executable is ${python}`);
    const version = "1.85.0";

    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./suite/index.js");
    // Download VS Code, unzip it and run the integration test
    const vscodeExecutablePath = await downloadAndUnzipVSCode(version);
    const [cliPath, ...args] =
      resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath);

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
    await runTests({
      // Use the specified `code` executable
      vscodeExecutablePath: vscodeExecutablePath,
      extensionDevelopmentPath: extensionDevelopmentPath,
      extensionTestsPath: extensionTestsPath,
      version: version,
      launchArgs: [path.join(__dirname, "../../src/test/sample_projects")],
    });
    console.log("Tests passed");
  } catch (err) {
    console.error("Failed to run tests");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Run ended with error", err);
  process.exit(1);
});
