import { Uri } from "vscode";
import { DBTProject } from "../dbtProject";

export interface OnProjectConfigChanged {
  onProjectConfigChanged: OnProjectConfigChangedHandler;
}

export type OnProjectConfigChangedHandler = (event: ProjectConfigChangedEvent) => void;

export class ProjectConfigChangedEvent {
  projectRoot: Uri;
  projectName: string;
  targetPath: string;
  sourcePaths: string[];

  constructor(projectRoot: Uri, projectConfig: any) {
    this.projectRoot = projectRoot;
    this.projectName = projectConfig.name;
    this.targetPath = projectConfig[DBTProject.TARGET_PATH_VAR] as string;
    this.sourcePaths = projectConfig[DBTProject.SOURCE_PATHS_VAR] as string[];
  }
}