export interface DBTInstallationFoundEvent {
  installed?: boolean;
  latestVersion?: string;
  installedVersion?: string;
  upToDate?: boolean;
}
