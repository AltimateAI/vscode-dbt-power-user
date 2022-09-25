import { Uri } from "vscode";
import { ProfilesMetaData } from "../../domain";
export class ProjectConfigChangedEvent {
  constructor(
    public projectRoot: Uri,
    public projectName: string,
    public profilesMetaData: ProfilesMetaData,
    public targetPath: string,
    public sourcePaths: string[]
  ) {}
}
