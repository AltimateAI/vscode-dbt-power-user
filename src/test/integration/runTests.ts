import { runTests } from "@vscode/test-electron";
import * as path from "path";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../../../");
    const extensionTestsPath = path.resolve(__dirname, "./index");

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--disable-extensions"],
      // Forward PATH and SQLFMT_PATH to the extension host process so
      // that sqlfmt installed in a virtualenv is discoverable.
      // macOS Electron apps often reset PATH to system defaults.
      extensionTestsEnv: {
        PATH: process.env.PATH,
        SQLFMT_PATH: process.env.SQLFMT_PATH,
      },
    });
  } catch (err) {
    console.error("Failed to run integration tests:", err);
    process.exit(1);
  }
}

main();
