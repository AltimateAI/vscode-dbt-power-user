export interface Insight {
  name: string;
  type: string;
  message: string;
  recommendation: string;
  reason_to_flag: string;
  metadata: {
    model?: string;
    model_unique_id?: string;
    model_type?: string;
    convention?: string | null;
  };
}

export type Severity = "ERROR" | "WARNING";

export interface ModelInsight {
  insight: Insight;
  severity: Severity;
  unique_id: string;
  package_name: string;
  path: string;
  original_file_path: string;
}

export interface ProjectHealthcheck {
  model_insights: Record<string, ModelInsight[]>;
  // package_insights: any;
}
