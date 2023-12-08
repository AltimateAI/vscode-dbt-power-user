import { DbtExposure } from "./dbt/exposure";

export interface ExposureMetaData extends DbtExposure {
  path: string;
  unique_id: string;
  sources?: [string];
  metrics?: unknown[];
  meta?: Record<string, unknown>;
}
