import * as path from "path";
import { runTests } from "@vscode/test-electron";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");
    const workspaceFolder = path.resolve(__dirname, "../../test-workspace");
    const dbtProjectPath = path.join(workspaceFolder, "dbt_project.yml");

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        workspaceFolder,
        "--enable-proposed-api=innoverio.vscode-dbt-power-user",
        "--install-extension=samuelcolvin.jinjahtml",
      ],
    });
  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }
}

main();
