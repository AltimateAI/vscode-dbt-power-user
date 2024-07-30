import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { TelemetryEvents } from "@telemetryEvents";

export const sendTelemetryEvent = (
  eventName: TelemetryEvents,
  properties?: Record<string, string>,
  measurements?: Record<string, number>,
): void => {
  executeRequestInAsync("sendTelemetryEvent", {
    eventName,
    properties,
    measurements,
  });
};
