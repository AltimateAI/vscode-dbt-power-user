import { Uri } from "vscode";
import { DBTProject } from "../dbtProject";

export class RunResultsEvent {
  constructor(
    public project: DBTProject,
    public file: Uri,
  ) {}
}
