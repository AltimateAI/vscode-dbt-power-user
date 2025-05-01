import { env } from "vscode";

export const isCursor = (): boolean => {
  return env.appName === "Cursor";
};
