const path = require("path");
const fs = require("fs");

const extensionFolder = path.join(__dirname);
const distNodeModules = path.join(extensionFolder, "dist", "node_modules");

function getVsceTarget() {
  // Possible values include the platforms supported by `vsce package --target`, see
  // https://code.visualstudio.com/api/working-with-extensions/publishing-extension#platformspecific-extensions
  return process.env.VSC_VSCE_TARGET || process.env.VSCE_TARGET;
}

/** Every file below `dir`, as absolute paths. */
function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(child) : [child];
  });
}

/** Delete the directories below `dir` that are left empty, deepest first. */
function removeEmptyDirs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const child = path.join(dir, entry.name);
      removeEmptyDirs(child);
      if (fs.readdirSync(child).length === 0) {
        fs.rmdirSync(child);
      }
    }
  }
}

/**
 * The zeromq addon runtime a VS Code target needs, in the terms of the
 * `build/manifest.json` that zeromq's cmake-ts loader filters on.
 */
function getZeromqRuntime(vsceTarget) {
  const match = /^(win32|linux|alpine|darwin)-(x64|arm64|armhf|ia32)$/.exec(
    vsceTarget,
  );
  if (!match) {
    throw new Error(`Unsupported VSCE_TARGET '${vsceTarget}' for zeromq`);
  }
  const [, platform, arch] = match;
  return {
    os: platform === "alpine" ? "linux" : platform,
    arch: arch === "armhf" ? "arm" : arch,
    libc: { win32: "msvc", linux: "glibc", alpine: "musl", darwin: "libc" }[
      platform
    ],
  };
}

/**
 * Keep only the zeromq addons the target can load. zeromq loads its addon
 * through cmake-ts `loadAddon(build/)`, which reads build/manifest.json, keeps
 * the entries matching the running os, arch and libc, and tries them from the
 * newest ABI down. The manifest is rewritten to list only the addons kept, so
 * the loader never tries a file that isn't shipped.
 */
function pruneZeromqAddons(zeromqDir, vsceTarget) {
  const buildDir = path.join(zeromqDir, "build");
  const manifestPath = path.join(buildDir, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const runtime = getZeromqRuntime(vsceTarget);

  const kept = {};
  for (const [key, addonPath] of Object.entries(manifest)) {
    const config = JSON.parse(key);
    if (
      config.os === runtime.os &&
      config.arch === runtime.arch &&
      config.libc === runtime.libc
    ) {
      kept[key] = addonPath;
    }
  }
  // Windows entries use backslashes; packaging may run on Linux.
  const keptFiles = new Set(
    Object.values(kept).map((addonPath) =>
      path.resolve(buildDir, addonPath.replace(/\\/g, "/")),
    ),
  );
  const missing = [...keptFiles].filter((file) => !fs.existsSync(file));
  if (keptFiles.size === 0 || missing.length > 0) {
    throw new Error(
      `No zeromq addon for VSCE_TARGET '${vsceTarget}' (${JSON.stringify(
        runtime,
      )}) in ${buildDir}${missing.length ? `: missing ${missing.join(", ")}` : ""}`,
    );
  }

  for (const file of listFiles(buildDir)) {
    if (file !== manifestPath && !keptFiles.has(file)) {
      fs.rmSync(file);
    }
  }
  removeEmptyDirs(buildDir);
  fs.writeFileSync(manifestPath, JSON.stringify(kept));
  console.log(
    `kept zeromq addons for ${vsceTarget}:`,
    Object.values(kept).join(", "),
  );
}

/**
 * Strip zeromq and cmake-ts down to what loads at runtime: zeromq's lib/ and
 * entry points plus its target addon, and cmake-ts' build/loader.js. Sources,
 * install scripts, node-addon-api headers, type declarations and build configs
 * are only used when compiling the addon. `prebuilds/` is never read by
 * zeromq 6, whose loader looks only in `build/`.
 */
function pruneZeromq() {
  const zeromqDir = path.join(distNodeModules, "zeromq");
  const cmakeTsDir = path.join(distNodeModules, "cmake-ts");
  for (const dir of [zeromqDir, cmakeTsDir]) {
    if (!fs.existsSync(dir)) {
      throw new Error(`Required asset missing: ${dir}`);
    }
  }

  for (const entry of [
    "src",
    "script",
    "node_modules",
    "prebuilds",
    "CMakeLists.txt",
    "vcpkg.json",
    "tsconfig.json",
    ".mocharc.js",
    path.join("lib", "tsconfig.tsbuildinfo"),
  ]) {
    fs.rmSync(path.join(zeromqDir, entry), { recursive: true, force: true });
  }
  for (const file of listFiles(zeromqDir)) {
    if (file.endsWith(".d.ts")) {
      fs.rmSync(file);
    }
  }
  removeEmptyDirs(zeromqDir);

  const cmakeTsKeep = new Set(
    ["package.json", path.join("build", "loader.js")].map((file) =>
      path.join(cmakeTsDir, file),
    ),
  );
  for (const file of listFiles(cmakeTsDir)) {
    if (!cmakeTsKeep.has(file)) {
      fs.rmSync(file);
    }
  }
  removeEmptyDirs(cmakeTsDir);
  const missing = [...cmakeTsKeep].filter((file) => !fs.existsSync(file));
  if (missing.length > 0) {
    throw new Error(`Required asset missing: ${missing.join(", ")}`);
  }

  const vsceTarget = getVsceTarget();
  if (!vsceTarget) {
    // Keep every platform's addon, as we're not building a platform-specific bundle.
    console.log("vsceTarget is not set, keeping all zeromq addons");
    return;
  }
  pruneZeromqAddons(zeromqDir, vsceTarget);
}

/**
 * Map VSC_VSCE_TARGET to the altimate-core platform package suffix to keep.
 * Returns empty array if no target is set (keep all).
 */
function getAltimateCorePackagesToKeep() {
  const vsceTarget = process.env.VSC_VSCE_TARGET || process.env.VSCE_TARGET;
  if (!vsceTarget) {
    return [];
  }
  if (vsceTarget.includes("darwin")) {
    if (vsceTarget.includes("arm64")) return ["darwin-arm64"];
    if (vsceTarget.includes("x64")) return ["darwin-x64"];
    return ["darwin-arm64", "darwin-x64"];
  }
  if (vsceTarget.includes("linux") || vsceTarget.includes("alpine")) {
    if (vsceTarget.includes("arm64")) return ["linux-arm64-gnu"];
    if (vsceTarget.includes("x64")) return ["linux-x64-gnu"];
    return ["linux-arm64-gnu", "linux-x64-gnu"];
  }
  if (vsceTarget.includes("win32")) {
    return ["win32-x64-msvc"];
  }
  return [];
}

function deleteUnnecessaryAltimateCorePackages() {
  const vsceTarget = process.env.VSC_VSCE_TARGET || process.env.VSCE_TARGET;
  if (!vsceTarget) {
    console.log(
      "vsceTarget is not set, keeping all altimate-core platform packages",
    );
    return;
  }

  console.log(
    "pruning altimate-core platform packages for target:",
    vsceTarget,
  );
  const keepSuffixes = getAltimateCorePackagesToKeep();
  const altimateCoreDir = path.join(
    extensionFolder,
    "dist",
    "node_modules",
    "@altimateai",
  );

  if (!fs.existsSync(altimateCoreDir)) {
    console.log("altimate-core dist directory not found, skipping");
    return;
  }

  const entries = fs.readdirSync(altimateCoreDir);
  for (const entry of entries) {
    // Only prune platform-specific packages (altimate-core-<platform>)
    if (!entry.startsWith("altimate-core-")) continue;
    const suffix = entry.replace("altimate-core-", "");
    if (!keepSuffixes.includes(suffix)) {
      const fullPath = path.join(altimateCoreDir, entry);
      console.log("deleting", fullPath);
      fs.rmSync(fullPath, { recursive: true });
    }
  }

  // Also prune .node files from the altimate-core/ directory that don't
  // match the target platform (these are copied by webpack for direct resolution)
  const coreDir = path.join(altimateCoreDir, "altimate-core");
  if (fs.existsSync(coreDir)) {
    const coreEntries = fs.readdirSync(coreDir);
    for (const file of coreEntries) {
      if (!file.endsWith(".node")) continue;
      // e.g. "altimate-core.darwin-arm64.node" → check if "darwin-arm64" is kept
      const match = file.match(/^altimate-core\.(.+)\.node$/);
      if (match && !keepSuffixes.includes(match[1])) {
        const fullPath = path.join(coreDir, file);
        console.log("deleting .node file", fullPath);
        fs.rmSync(fullPath);
      }
    }
  }

  console.log("pruned altimate-core platform packages");
}

/**
 * The Python bridge must be spawned hidden: the extension host has no console,
 * so on Windows a bridge spawned without `windowsHide` gets its own visible
 * console window (issue 2016). The flag lives in @altimateai/dbt-integration's
 * vendored bridge and reaches users only through this bundle, so assert it on
 * the built artifact instead of trusting the dependency graph. Exactly one
 * bridge copy is required as well: a second copy breaks
 * `instanceof PythonException` across the bundle.
 */
function assertPythonBridgeSpawnHidden() {
  const bundlePath = path.join(extensionFolder, "dist", "extension.js");
  const bundle = fs.readFileSync(bundlePath, "utf8");
  const marker = "node_python_bridge.py";
  const copies = bundle.split(marker).length - 1;
  if (copies !== 1) {
    throw new Error(
      `Expected exactly one Python bridge in dist/extension.js, found ${copies}`,
    );
  }
  const start = bundle.indexOf(marker);
  const region = bundle.slice(start, start + 4000);
  // The spawn options are located by the channel's env key: the bridge talks
  // newline-JSON over a plain fd-3 pipe named by NODE_CHANNEL_FD (the
  // IPC-era anchor was the literal 'ipc' stdio entry).
  const anchor = region.search(/NODE_CHANNEL_FD/);
  if (anchor === -1) {
    throw new Error(
      "Could not locate the Python bridge spawn options in dist/extension.js",
    );
  }
  const options = region.slice(anchor, anchor + 200);
  if (!/stdio:\s*\[[^\]]*["']pipe["']\]/.test(options)) {
    throw new Error(
      `Python bridge spawn options lack the fd-3 "pipe" channel in dist/extension.js: ${options}`,
    );
  }
  if (!/windowsHide:\s*(true|!0)/.test(options)) {
    throw new Error(
      `Python bridge spawn options lack windowsHide in dist/extension.js: ${options}`,
    );
  }
  console.log(
    "python bridge spawn is hidden (windowsHide) in dist/extension.js",
  );
}

pruneZeromq();
deleteUnnecessaryAltimateCorePackages();
assertPythonBridgeSpawnHidden();
