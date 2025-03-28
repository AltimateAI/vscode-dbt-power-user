import portfinder from "portfinder";
import { env } from "vscode";

export const findAvailablePort = async (): Promise<number> => {
  return await portfinder.getPortPromise({ port: 7700, stopPort: 7900 });
};

export const isCursor = (): boolean => {
  return env.appName === "Cursor";
};
