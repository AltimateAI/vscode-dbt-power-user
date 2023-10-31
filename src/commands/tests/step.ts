import { ScanContext } from "./scanContext";

export interface AltimateScanStep {
  run(scanContext: ScanContext): Promise<any>;
}
