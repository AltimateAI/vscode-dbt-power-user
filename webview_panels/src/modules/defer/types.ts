import { ManifestPathType } from "./constants";

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
  dbt_core_integration_id: number;
}

export interface ManifestSelectionProps {
  dbtProjectRoot: string;
  manifestPathForDeferral: string;
  manifestPathType: ManifestPathType;
  projectIntegrations: DropdownOptions[];
  dbt_core_integration_id: number;
  setDeferState: React.Dispatch<React.SetStateAction<DeferToProductionProps>>;
  setProjectIntegrations: () => Promise<void>;
}

export interface DbtProject {
  projectRoot: string;
  projectName: string;
}
