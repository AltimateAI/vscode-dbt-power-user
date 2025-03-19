// Copied from https://github.com/microsoft/vscode-jupyter/blob/main/build/ci/postInstall.js
const { downloadZMQ } = require("@vscode/zeromq");

async function downloadZmqBinaries() {
  //   if (common.getBundleConfiguration() === common.bundleConfiguration.web) {
  //     // No need to download zmq binaries for web.
  //     return;
  //   }
  await downloadZMQ();
}

downloadZmqBinaries()
  .then(() => process.exit(0))
  .catch((ex) => {
    console.error("Failed to download ZMQ", ex);
    process.exit(1);
  });
