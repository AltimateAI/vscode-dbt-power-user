import type { CollectColumn, Details } from "@altimateai/ui-components/lineage";

export interface MissingLineageMessage {
  message: string;
  type: "warning" | "error";
}

export interface StaticLineageProps {
  selectedColumn?: { table: string; name: string };
  collectColumns?: Record<string, CollectColumn[]>;
  columnEdges?: [string, string][];
  tableEdges: [string, string][];
  details: Details;
}

// The banner over a graph drawn while an error stops the project from parsing:
// the graph is the last manifest that parsed. The extension builds it
// (src/webview_provider/lineageStaleGraph.ts); the webview lays it out and
// sends the chosen action back.
export type LineageBannerActionId = "openFile" | "showProblems" | "tryAgain";

export interface LineageBannerAction {
  id: LineageBannerActionId;
  label: string;
  // The file to open and its line.
  args?: { path: string; line?: number };
}

export interface LineageBanner {
  id: "stale-graph-startup" | "stale-graph-midsession";
  severity: "warning";
  title: string;
  // The error, in one line.
  detail: string;
  // dbt's own message, verbatim.
  dbtMessage: string;
  // The first action is the primary button.
  actions: LineageBannerAction[];
}
