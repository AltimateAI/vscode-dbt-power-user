import { Uri, workspace } from "vscode";
import { getProjectRelativePath } from "../utils";

interface DeferConfig {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
}

export const getDeferParams = async (projectRoot: Uri): Promise<string[]> => {
  const currentConfig: Record<string, DeferConfig> = await workspace
    .getConfiguration("dbt")
    .get("deferConfigPerProject", {});
  const deferConfigInProject =
    currentConfig[getProjectRelativePath(projectRoot)];
  if (!deferConfigInProject) {
    return [];
  }
  const { deferToProduction, manifestPathForDeferral, favorState } =
    deferConfigInProject;
  if (!deferToProduction) {
    return [];
  }
  if (!manifestPathForDeferral) {
    return [];
  }
  return [
    "--defer",
    "--state",
    manifestPathForDeferral,
    favorState ? "--favor-state" : "",
  ];
};
