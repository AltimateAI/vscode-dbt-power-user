import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
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

/** Get Started events sent from the page. The extension sends the rest. */
export type OnboardingEvent =
  | "onboardingStepViewed"
  | "onboardingValidation"
  | "onboardingValidationAction"
  | "onboardingCheckChanged"
  | "onboardingAccountAction"
  | "onboardingWorkspaceAction"
  | "onboardingHelpLinkOpened";

/** Record a Get Started action. Properties carry choices only, never names, paths or keys. */
export const track = (
  eventName: OnboardingEvent,
  properties?: Record<string, string>,
): void =>
  executeRequestInAsync("sendTelemetryEvent", { eventName, properties });

export const runCommand = (vscodeCommand: string): Promise<unknown> =>
  request("executeCommand", { vscodeCommand });
