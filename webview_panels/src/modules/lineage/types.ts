import { CollectColumn, Details } from "@lib";

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
