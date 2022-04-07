import { Uri } from "vscode";
export class ProjectConfigChangedEvent {
  constructor(
    public projectRoot: Uri,
    public projectName: string,
    public targetPath: string,
    public sourcePaths: string[]
  ) {}
}
