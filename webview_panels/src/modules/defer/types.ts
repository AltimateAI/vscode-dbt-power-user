import { ManifestPathType } from "./constants";

export enum DbtIntegrationMode {
  CLOUD = "cloud",
  CORE = "core",
}

export interface DropdownOptions {
  label: string;
  value: number;
}

export interface DeferToProductionProps {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
  manifestPathType: ManifestPathType;
  projectIntegrations: DropdownOptions[];
  dbtCoreIntegrationId: number;
}

export interface ManifestSelectionProps {
  fetchingProjectIntegrations: boolean;
  dbtProjectRoot: string;
  manifestPathForDeferral: string;
  manifestPathType: ManifestPathType;
  projectIntegrations: DropdownOptions[];
  dbtCoreIntegrationId: number;
  setDeferState: React.Dispatch<React.SetStateAction<DeferToProductionProps>>;
  setProjectIntegrations: (clearCache?: boolean) => Promise<void>;
}

export interface DbtProject {
  projectRoot: string;
  projectName: string;
}
