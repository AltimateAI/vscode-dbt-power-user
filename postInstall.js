// Copied from https://github.com/microsoft/vscode-jupyter/blob/main/build/ci/postInstall.js
const fs = require("fs");
const { downloadZMQ } = require("@vscode/zeromq");
const path = require("path");

/**
 * In order to get raw kernels working, we reuse the default kernel that jupyterlab ships.
 * However it expects to be talking to a websocket which is serializing the messages to strings.
 * Our raw kernel is not a web socket and needs to do its own serialization. To do so, we make a copy
 * of the default kernel with the serialization stripped out. This is simpler than making a copy of the module
 * at runtime.
 */
function createJupyterKernelWithoutSerialization() {
  var relativePath = path.join(
    "node_modules",
    "@jupyterlab",
    "services",
    "lib",
    "kernel",
    "default.js",
  );
  var filePath = path.join("", relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "Jupyter lab default kernel not found '" +
        filePath +
        "' (Jupyter Extension post install script)",
    );
  }
  var fileContents = fs.readFileSync(filePath, { encoding: "utf8" });

  // Strip websocket serialization by replacing serializer calls with pass-through.
  var replacedContents = fileContents
    .replace(
      /this\.serverSettings\.serializer\.deserialize\(([^,]+),\s*this\._ws\.protocol\)/g,
      "$1",
    )
    .replace(
      /this\.serverSettings\.serializer\.serialize\(([^,]+),\s*this\._ws\.protocol\)/g,
      "$1",
    );

  if (replacedContents === fileContents) {
    throw new Error(
      "Jupyter lab default kernel cannot be made non serializing",
    );
  }
  var destPath = path.join(path.dirname(filePath), "nonSerializingKernel.js");
  fs.writeFileSync(destPath, replacedContents);
  console.log(destPath + " file generated (by Jupyter VSC)");
}

async function downloadZmqBinaries() {
  //   if (common.getBundleConfiguration() === common.bundleConfiguration.web) {
  //     // No need to download zmq binaries for web.
  //     return;
  //   }
  await downloadZMQ();
}

/**
 * npm only installs optional dependencies for the current platform.
 * For a multi-platform VSIX we need all @altimateai/altimate-core platform
 * packages installed so they can be bundled. Force-install any missing ones.
 */
async function installAltimateCoreAllPlatforms() {
  const { execSync } = require("child_process");
  const altimateCorePackages = [
    "@altimateai/altimate-core-darwin-arm64",
    "@altimateai/altimate-core-darwin-x64",
    "@altimateai/altimate-core-linux-arm64-gnu",
    "@altimateai/altimate-core-linux-x64-gnu",
    "@altimateai/altimate-core-win32-x64-msvc",
  ];

  const missing = altimateCorePackages.filter((pkg) => {
    try {
      require.resolve(pkg);
      return false;
    } catch {
      return true;
    }
  });

  if (missing.length === 0) {
    console.log("All altimate-core platform packages already installed");
    return;
  }

  console.log(
    `Installing missing altimate-core platform packages: ${missing.join(", ")}`,
  );
  try {
    execSync(
      `npm install --no-save --no-audit --no-fund ${missing.join(" ")}`,
      { stdio: "inherit" },
    );
    console.log("Installed all altimate-core platform packages");
  } catch (ex) {
    console.error("Failed to install altimate-core platform packages", ex);
  }
}

createJupyterKernelWithoutSerialization();
Promise.all([downloadZmqBinaries(), installAltimateCoreAllPlatforms()])
  .then(() => process.exit(0))
  .catch((ex) => {
    console.error("Post-install failed", ex);
    process.exit(1);
  });
