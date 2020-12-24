import { FileSystemWatcher, RelativePattern, Uri, workspace } from "vscode";
import { setupWatcherhHandler } from "../../utils";
import { DBTProject } from "../dbtProject";

export class ProjectConfigWatcherFactory {
  static createProjectConfigWatcher(projectRoot: Uri, handler: Function): FileSystemWatcher {
    const dbtProjectWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        projectRoot.path,
        DBTProject.DBT_PROJECT_FILE
      )
    );
    setupWatcherhHandler(dbtProjectWatcher, () => handler());
    return dbtProjectWatcher;
  }
}