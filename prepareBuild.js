const path = require("path");
const fs = require("fs");

function getZeroMQPreBuildsFoldersToKeep() {
  // Possible values of 'VSC_VSCE_TARGET' include platforms supported by `vsce package --target`
  // See here https://code.visualstudio.com/api/working-with-extensions/publishing-extension#platformspecific-extensions
  const vsceTarget = process.env.VSC_VSCE_TARGET;
  console.log("vsceTarget", vsceTarget);
  if (!vsceTarget) {
    // Keep all of them, as we're not building platform specific bundles.
    return [];
  } else if (vsceTarget === "web") {
    throw new Error("Not supported when targeting the Web");
  } else if (vsceTarget.includes("win32")) {
    if (vsceTarget.includes("x64")) {
      return ["win32-x64"];
    } else if (vsceTarget.includes("arm64")) {
      return ["win32-arm64"];
    } else {
      return ["win32-x64", "win32-arm64"];
    }
  } else if (vsceTarget.includes("linux")) {
    if (vsceTarget.includes("arm64")) {
      return ["linux-arm64"];
    } else if (vsceTarget.includes("x64")) {
      return ["linux-x64"];
    } else if (vsceTarget.includes("arm")) {
      return ["linux-arm"];
    } else {
      return ["linux-arm64", "linux-x64", "linux-arm"];
    }
  } else if (vsceTarget.includes("alpine")) {
    if (vsceTarget.includes("arm64")) {
      return ["linux-arm64"];
    } else if (vsceTarget.includes("x64")) {
      return ["linux-x64"];
    } else if (vsceTarget.includes("armhf")) {
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
    throw new Error(`Unknown platform '${vsceTarget}'}`);
  }
}

function shouldCopyFileFromZmqFolder(resourcePath) {
  const parentFolder = path.dirname(resourcePath);
  if (fs.statSync(resourcePath).isDirectory()) {
    return true;
  }
  // return true;
  const filename = path.basename(resourcePath);
  // Ensure the code is platform agnostic.
  resourcePath = (resourcePath || "")
    .toString()
    .toLowerCase()
    .replace(/\\/g, "/");
  // We do not need to bundle these folders
  const foldersToIgnore = ["build", "script", "src", "node_modules", "vendor"];
  if (
    foldersToIgnore.some((folder) =>
      resourcePath
        .toLowerCase()
        .startsWith(
          path.join(parentFolder, folder).replace(/\\/g, "/").toLowerCase(),
        ),
    )
  ) {
    return false;
  }

  if (
    resourcePath.endsWith(".js") ||
    resourcePath.endsWith(".json") ||
    resourcePath.endsWith(".md") ||
    resourcePath.endsWith("license")
  ) {
    return true;
  }
  // if (!resourcePath.includes(path.join(parentFolder, 'prebuilds').replace(/\\/g, '/').toLowerCase())) {
  if (!parentFolder.includes(`${path.sep}prebuilds${path.sep}`)) {
    // We do not ship any other sub directory.
    return false;
  }
  if (filename.includes("electron.") && resourcePath.endsWith(".node")) {
    // We do not ship electron binaries.
    return false;
  }
  const preBuildsFoldersToCopy = getZeroMQPreBuildsFoldersToKeep();
  console.log("preBuildsFoldersToCopy", preBuildsFoldersToCopy);
  if (preBuildsFoldersToCopy.length === 0) {
    // Copy everything from all prebuilds folder.
    return true;
  }
  // Copy if this is a prebuilds folder that needs to be copied across.
  // Use path.sep as the delimiter, as we do not want linux-arm64 to get compiled with search criteria is linux-arm.
  if (
    preBuildsFoldersToCopy.some((folder) =>
      resourcePath.includes(`${folder.toLowerCase()}/`),
    )
  ) {
    return true;
  }
  return false;
}

const extensionFolder = path.join(__dirname);

async function deleteUnnecessaryZeromqPrebuilts() {
  const vsceTarget = process.env.VSC_VSCE_TARGET;
  if (!vsceTarget) {
    // Keep all of them, as we're not building platform specific bundles.
    console.log("vsceTarget is not set");
    return;
  }

  console.log("deleting ZeroMQ prebuilts");
  const necessaryPrebuilds = getZeroMQPreBuildsFoldersToKeep();

  const zmqPrebuildFolder = path.join(
    extensionFolder,
    "dist",
    "node_modules",
    "zeromq",
    "prebuilds",
  );
  // delete all folders except the ones in necessaryPrebuilds
  const files = fs.readdirSync(zmqPrebuildFolder);
  for (const file of files) {
    if (!necessaryPrebuilds.includes(file)) {
      console.log("deleting", path.join(zmqPrebuildFolder, file));
      fs.rmSync(path.join(zmqPrebuildFolder, file), { recursive: true });
    }
  }

  console.log("copied ZeroMQ");
}

deleteUnnecessaryZeromqPrebuilts();
