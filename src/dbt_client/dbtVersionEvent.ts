export interface DBTInstallationVerificationEvent {
  inProgress: boolean;
  dbtInstallationFound?: {
    installed: boolean;
    latestVersion?: string;
    installedVersion?: string;
    upToDate?: boolean;
    plugins?: string[];
  };
  dbtOsmosisInstallationFound?: boolean;
}
