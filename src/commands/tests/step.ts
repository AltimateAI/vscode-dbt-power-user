import { AltimateScanAgent } from "../agent/agent";

export interface AltimateScanStep {
  run(agent: AltimateScanAgent): void;
}
