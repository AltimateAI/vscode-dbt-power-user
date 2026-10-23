import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";

/** Send a request to the extension, logging instead of throwing on failure. */
export const request = async <T>(
  command: string,
  args: Record<string, unknown> = {},
): Promise<T | undefined> => {
  try {
    return (await executeRequestInSync(command, args)) as T;
  } catch (err) {
    panelLogger.error(`onboarding: ${command} failed`, err);
    return undefined;
  }
};

export const runCommand = (vscodeCommand: string): Promise<unknown> =>
  request("executeCommand", { vscodeCommand });
