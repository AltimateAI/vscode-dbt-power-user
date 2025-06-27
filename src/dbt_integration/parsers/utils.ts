import * as path from "path";
import { existsSync, readFileSync } from "fs";
import { parse } from "yaml";

export const getExternalProjectNamesFromDbtLoomConfig = (
  projectRoot: string,
) => {
  const dbtLoomConfigPath =
    process.env.DBT_LOOM_CONFIG_PATH ||
    path.join(projectRoot, "dbt_loom.config.yml");

  try {
    const fileContents = readFileSync(dbtLoomConfigPath, "utf8");
    if (fileContents) {
      const dbtLoomConfig = (parse(fileContents, {
        strict: false,
        uniqueKeys: false,
        maxAliasCount: -1,
      }) || {}) as { manifests?: { name: string }[] };

      return dbtLoomConfig.manifests?.map((manifest) => manifest.name);
    }
  } catch (error) {
    console.debug(
      "NodeParser",
      `Error reading dbt_loom.config.yml at ${dbtLoomConfigPath}`,
      error,
    );
  }
  return null;
};

export const createFullPathForNode: (
  projectName: string,
  rootPath: string,
  packageName: string,
  packagePath: string,
  relativeFilePath: string,
) => string | undefined = (
  projectName,
  rootPath,
  packageName,
  packagePath,
  relativeFilePath,
) => {
  if (packageName !== projectName) {
    const rootPathWithPackage = path.join(
      packagePath,
      packageName,
      relativeFilePath,
    );
    if (existsSync(rootPathWithPackage)) {
      return rootPathWithPackage;
    }
    return undefined;
  }
  return path.join(rootPath, relativeFilePath);
};
