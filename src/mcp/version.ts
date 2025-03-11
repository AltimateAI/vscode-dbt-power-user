import * as fs from "fs";
import * as path from "path";

/**
 * Gets the extension version from package.json
 */
export const extensionVersion = (() => {
  try {
    // Find package.json by walking up from the current directory
    let currentDir = __dirname;
    let packagePath = "";

    // Try to find package.json by going up directories
    while (currentDir !== path.parse(currentDir).root) {
      const possiblePath = path.join(currentDir, "package.json");
      if (fs.existsSync(possiblePath)) {
        packagePath = possiblePath;
        break;
      }

      // Go up one directory
      currentDir = path.dirname(currentDir);
    }

    if (!packagePath) {
      console.warn("Could not find package.json to determine version");
      return "unknown";
    }

    // Read package.json and get version
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return packageJson.version || "unknown";
  } catch (error) {
    console.error("Error reading extension version:", error);
    return "unknown";
  }
})();
