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
 * Install altimate-core platform binaries.
 *
 * When VSCE_TARGET is set (CI builds platform-specific VSIXs), only install the
 * matching platform binary. Otherwise (local dev), install all platforms so the
 * extension works regardless of which machine it runs on.
 *
 * npm only installs optional dependencies for the current platform.
 * We use npm pack + tar to manually extract the tarballs into node_modules.
 */
async function installAltimateCoreAllPlatforms() {
  const { execSync } = require("child_process");

  // Read version from the main altimate-core package to keep platform
  // packages in sync (npm pack without a version would fetch "latest").
  const corePkgPath = path.join(
    "node_modules",
    "@altimateai",
    "altimate-core",
    "package.json",
  );
  if (!fs.existsSync(corePkgPath)) {
    console.warn(
      "@altimateai/altimate-core not found in node_modules, skipping platform binary install",
    );
    return;
  }
  const { version: coreVersion } = JSON.parse(
    fs.readFileSync(corePkgPath, "utf8"),
  );
  console.log(`altimate-core version: ${coreVersion}`);

  // Map VS Code target platforms to altimate-core npm package names
  const vsceTargetToPackage = {
    "darwin-arm64": "@altimateai/altimate-core-darwin-arm64",
    "darwin-x64": "@altimateai/altimate-core-darwin-x64",
    "linux-arm64": "@altimateai/altimate-core-linux-arm64-gnu",
    "linux-x64": "@altimateai/altimate-core-linux-x64-gnu",
    "win32-x64": "@altimateai/altimate-core-win32-x64-msvc",
  };

  const allPackages = Object.values(vsceTargetToPackage);
  const vsceTarget = process.env.VSCE_TARGET;

  let packagesToInstall;
  if (vsceTarget) {
    const pkg = vsceTargetToPackage[vsceTarget];
    if (!pkg) {
      console.warn(
        `Unknown VSCE_TARGET "${vsceTarget}", installing all platforms`,
      );
      packagesToInstall = allPackages;
    } else {
      console.log(`VSCE_TARGET=${vsceTarget} — installing only ${pkg}`);
      packagesToInstall = [pkg];
    }
  } else {
    packagesToInstall = allPackages;
  }

  const missing = packagesToInstall.filter((pkg) => {
    const pkgDir = path.join("node_modules", ...pkg.split("/"));
    return !fs.existsSync(pkgDir);
  });

  if (missing.length === 0) {
    console.log(
      "All required altimate-core platform packages already installed",
    );
    return;
  }

  console.log(
    `Installing altimate-core platform packages via npm pack: ${missing.join(", ")}`,
  );

  const os = require("os");
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "altimate-core-"));

  for (const pkg of missing) {
    try {
      // npm pack downloads the tarball without os/cpu filtering
      const tgzFile = execSync(
        `npm pack ${pkg}@${coreVersion} --pack-destination ${tmpDir}`,
        { encoding: "utf8" },
      ).trim();
      const tgzPath = path.join(tmpDir, tgzFile);
      const destDir = path.join("node_modules", ...pkg.split("/"));
      fs.mkdirSync(destDir, { recursive: true });
      execSync(`tar xzf "${tgzPath}" --strip-components=1 -C "${destDir}"`);
      console.log(`Installed ${pkg} via npm pack + tar`);
    } catch (ex) {
      console.error(`Failed to install ${pkg}: ${ex.message}`);
    }
  }

  // Clean up temp dir
  try {
    fs.rmSync(tmpDir, { recursive: true });
  } catch {}

  // Verify required packages are present
  const stillMissing = packagesToInstall.filter((pkg) => {
    const pkgDir = path.join("node_modules", ...pkg.split("/"));
    return !fs.existsSync(pkgDir);
  });
  if (stillMissing.length > 0) {
    console.error(
      `ERROR: These altimate-core packages are still missing: ${stillMissing.join(", ")}`,
    );
  } else {
    console.log(
      "All required altimate-core platform packages installed successfully",
    );
  }
}

/**
 * Map VSCE_TARGET to the zeromq prebuild folder names to keep.
 * Returns empty array when no target is set (keep all).
 * Mirrors getZeroMQPreBuildsFoldersToKeep() in prepareBuild.js.
 */
function getZeroMQPreBuildsFoldersToKeep(vsceTarget) {
  if (!vsceTarget) {
    return [];
  } else if (vsceTarget.includes("win32")) {
    if (vsceTarget.includes("x64")) {
      return ["win32-x64"];
    } else if (vsceTarget.includes("arm64")) {
      return ["win32-arm64"];
    } else {
      return ["win32-x64", "win32-arm64"];
    }
  } else if (vsceTarget.includes("linux") || vsceTarget.includes("alpine")) {
    if (vsceTarget.includes("arm64")) {
      return ["linux-arm64"];
    } else if (vsceTarget.includes("x64")) {
      return ["linux-x64"];
    } else if (vsceTarget.includes("armhf") || vsceTarget.includes("arm")) {
      return ["linux-arm"];
    } else {
      return ["linux-arm64", "linux-x64", "linux-arm"];
    }
  } else if (vsceTarget.includes("darwin")) {
    if (vsceTarget.includes("arm64")) {
      return ["darwin-arm64"];
    } else if (vsceTarget.includes("x64")) {
      return ["darwin-x64"];
    } else {
      return ["darwin-x64", "darwin-arm64"];
    }
  } else {
    console.warn(
      `Unknown VSCE_TARGET "${vsceTarget}", keeping all zeromq prebuilds`,
    );
    return [];
  }
}

/**
 * Prune zeromq prebuilds for non-target platforms right after download.
 * This avoids webpack copying ~13MB of unused prebuilds into dist/.
 * prepareBuild.js still acts as a safety net for dist/.
 */
function pruneZeromqPrebuilds() {
  const vsceTarget = process.env.VSCE_TARGET;
  if (!vsceTarget) {
    return;
  }

  const keepFolders = getZeroMQPreBuildsFoldersToKeep(vsceTarget);
  if (keepFolders.length === 0) {
    return;
  }

  const prebuildsDir = path.join("node_modules", "zeromq", "prebuilds");
  if (!fs.existsSync(prebuildsDir)) {
    return;
  }

  const entries = fs.readdirSync(prebuildsDir);
  for (const entry of entries) {
    if (!keepFolders.includes(entry)) {
      fs.rmSync(path.join(prebuildsDir, entry), { recursive: true });
      console.log(`Pruned zeromq prebuild: ${entry}`);
    }
  }
  console.log(
    `Kept zeromq prebuilds for VSCE_TARGET=${vsceTarget}: ${keepFolders.join(", ")}`,
  );
}

createJupyterKernelWithoutSerialization();
Promise.all([downloadZmqBinaries(), installAltimateCoreAllPlatforms()])
  .then(() => {
    pruneZeromqPrebuilds();
    process.exit(0);
  })
  .catch((ex) => {
    console.error("Post-install failed", ex);
    process.exit(1);
  });
