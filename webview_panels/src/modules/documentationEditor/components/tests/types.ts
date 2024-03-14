import { DbtGenericTests } from "@modules/documentationEditor/state/types";

export interface SaveRequest {
  to?: string;
  field?: string;
  accepted_values?: string[];
  test?: DbtGenericTests;
}
