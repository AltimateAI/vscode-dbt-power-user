import type { CollectColumn, Details } from "@altimateai/ui-components/lineage";

export interface MissingLineageMessage {
  message: string;
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
  // The file to open and its line, and its dbt package when it isn't the
  // root project's.
  args?: { path: string; line?: number; package?: string };
}

export type LineageBanner = StaleGraphBanner | PartialGraphBanner;

export interface StaleGraphBanner {
  id: "stale-graph-startup" | "stale-graph-midsession";
  severity: "warning";
  // The chip's text after "Out of date", e.g. "last parse 2 hours ago".
  age?: string;
  title: string;
  // The error, in one line.
  detail: string;
  // dbt's own message, verbatim.
  dbtMessage: string;
  // The first action is the primary button.
  actions: LineageBannerAction[];
}

// The notice over a graph drawn from a partial manifest: dbt Fusion wrote it
// although some files failed to parse (src/webview_provider/lineagePartialGraph.ts).
export interface PartialGraphFile {
  // Relative to the project when inside it.
  path: string;
  line?: number;
  // The first error's reason, in one line.
  summary: string;
  errorCount: number;
  // Opens the file at that line, where its Problems entry points.
  action: LineageBannerAction;
}

export interface PartialGraphBanner {
  id: "partial-graph";
  severity: "warning";
  // The chip's text after "Partial graph", e.g. "customers.sql failed to parse".
  age: string;
  title: string;
  detail: string;
  files: PartialGraphFile[];
  // dbt's messages, verbatim.
  dbtMessage: string;
  actions: LineageBannerAction[];
}

// The card shown when an error stops the panel from drawing a graph. The
// extension builds it (src/webview_provider/lineageStateCard.ts); the webview
// lays it out and sends the chosen action back.
export interface LineageCardAction {
  id: string;
  label: string;
  args?: { path: string; line?: number; package?: string };
}

export interface LineageCard {
  kind: string;
  severity: "error" | "info";
  title: string;
  detail: string;
  // dbt's own message, verbatim.
  dbtMessage: string;
  // The first action is the primary button.
  actions: LineageCardAction[];
  // A problem with the setup: the card links the Get Started page.
  setup: boolean;
}
