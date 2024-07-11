import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { TelemetryEvents } from "../../../../../../src/telemetry/events";

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
