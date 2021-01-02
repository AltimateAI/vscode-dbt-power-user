export interface DBTInstallationFoundEvent {
  installed?: boolean;
  latestVersion?: string;
  installedVersion?: string;
  upToDate?: boolean;
}

export interface OnDBTInstallationFound {
  onDBTInstallationFound: (event:DBTInstallationFoundEvent) => void;
}