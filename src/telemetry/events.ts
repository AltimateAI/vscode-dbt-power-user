export enum TelemetryEventPriority {
  "Critical" = "Critical",
  "High" = "High",
  "Medium" = "Medium",
  "Low" = "Low",
}

export const getTelemetryEventName = (
  name: TelemetryEvents,
  type: "event" | "error" = "event",
  errorPriority?: TelemetryEventPriority,
) => {
  if (errorPriority) {
    return `${name}/${type}/${errorPriority}`;
  }
  if (type === "error") {
    return `${name}/${type}`;
  }
  return name;
};

// List of event names
export enum TelemetryEvents {
  "DocumentationEditor/GenerateColumnsDescription" = "DocumentationEditor/GenerateColumnsDescription",
}
