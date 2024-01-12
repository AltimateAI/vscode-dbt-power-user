import { workspace } from "vscode";

export const getDeferParams = (): string[] => {
  const deferToProduction = workspace
    .getConfiguration("dbt")
    .get<boolean>("deferToProduction", false);
  if (!deferToProduction) {
    return [];
  }
  const manifestPathForDeferral = workspace
    .getConfiguration("dbt")
    .get<string>("manifestPathForDeferral");
  if (!manifestPathForDeferral) {
    return [];
  }
  const favorState = workspace
    .getConfiguration("dbt")
    .get<boolean>("favorState", false);

  return [
    "--defer",
    "--state",
    manifestPathForDeferral,
    favorState ? "--favor-state" : "",
  ];
};
