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

createJupyterKernelWithoutSerialization();
downloadZmqBinaries()
  .then(() => process.exit(0))
  .catch((ex) => {
    console.error("Failed to download ZMQ", ex);
    process.exit(1);
  });
