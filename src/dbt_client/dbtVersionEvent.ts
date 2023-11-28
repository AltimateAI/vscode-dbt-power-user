export interface DBTInstallationVerificationEvent {
  inProgress: boolean;
  pythonInstalled: boolean;
  dbtInstallationFound?: {
    installed: boolean;
    latestVersion?: string;
    installedVersion?: string;
    upToDate?: boolean;
    plugins?: string[];
  };
}
