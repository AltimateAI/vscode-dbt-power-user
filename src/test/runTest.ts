import * as path from "path";
import { runTests } from "@vscode/test-electron";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");
    const workspaceFolder = path.resolve(__dirname, "../../test-workspace");

    // Create coverage directory if it doesn't exist
    const coverageDirectory = path.resolve(__dirname, "../../coverage");

    // Run tests with coverage enabled
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        workspaceFolder,
        "--enable-proposed-api=innoverio.vscode-dbt-power-user",
        "--install-extension=samuelcolvin.jinjahtml",
      ],
      extensionTestsEnv: {
        COVERAGE_DIR: coverageDirectory,
        CODE_COVERAGE: "1",
      },
    });
  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }
}

main();
