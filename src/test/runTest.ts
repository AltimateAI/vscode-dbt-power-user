import * as path from "path";
import * as cp from "child_process";

import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests,
} from "@vscode/test-electron";
import { TestTypes } from "./constants";

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    const version = "1.85.0";

    // Download VS Code, unzip it and run the integration test
    const vscodeExecutablePath = await downloadAndUnzipVSCode(version);
    const [cliPath, ...args] =
      resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath);

    // Without python and jinja extensions
    await runTests({
      // Use the specified `code` executable
      vscodeExecutablePath: vscodeExecutablePath,
      extensionDevelopmentPath: extensionDevelopmentPath,
      extensionTestsPath: path.resolve(__dirname, "./suite/index.js"),
      version: version,
      launchArgs: [path.join(__dirname, "../../src/test/sample_projects")],
      extensionTestsEnv: { testType: TestTypes.NoExtensions },
    });

    cp.spawnSync(
      cliPath,
      [...args, "--install-extension", "samuelcolvin.jinjahtml"],
      {
        encoding: "utf-8",
        stdio: "inherit",
      },
    );

    // Run the extension test without python extension
    await runTests({
      // Use the specified `code` executable
      vscodeExecutablePath: vscodeExecutablePath,
      extensionDevelopmentPath: extensionDevelopmentPath,
      extensionTestsPath: path.resolve(__dirname, "./suite/index.js"),
      version: version,
      launchArgs: [path.join(__dirname, "../../src/test/sample_projects")],
      extensionTestsEnv: { testType: TestTypes.MissingPythonExtension },
    });

    // install python extension
    cp.spawnSync(
      cliPath,
      [...args, "--install-extension", "ms-python.python"],
      {
        encoding: "utf-8",
        stdio: "inherit",
      },
    );
    // Run the extension test without python extension
    await runTests({
      // Use the specified `code` executable
      vscodeExecutablePath: vscodeExecutablePath,
      extensionDevelopmentPath: extensionDevelopmentPath,
      extensionTestsPath: path.resolve(__dirname, "./suite/index.js"),
      version: version,
      launchArgs: [path.join(__dirname, "../../src/test/sample_projects")],
      extensionTestsEnv: { testType: TestTypes.All },
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
