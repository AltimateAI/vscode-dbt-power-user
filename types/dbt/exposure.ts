// Reference: https://docs.getdbt.com/reference/exposure-properties
export type DbtExposure = {
  description?: string;
  depends_on: { macros: [string]; nodes: [string]; sources: [string] };
  label?: string;
  maturity?: "high" | "medium" | "low";
  name: string;
  owner: { email: string; name: string };
  tags: [string];
  unique_id: string;
  url?: string;
  type: "dashboard" | "notebook" | "analysis" | "ml" | "application";
  config: { enabled: boolean };
};
