import { Uri, workspace } from "vscode";

interface DeferConfig {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
}

export const getDeferParams = async (projectRoot: Uri): Promise<string[]> => {
  const currentConfig: Record<string, DeferConfig> = await workspace
    .getConfiguration("dbt")
    .get("deferConfigPerProject", {});
  const deferConfigInProject = currentConfig[projectRoot.path];
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
