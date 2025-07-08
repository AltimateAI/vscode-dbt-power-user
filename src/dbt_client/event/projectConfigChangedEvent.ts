import { DBTProject } from "../dbtProject";
export class ProjectConfigChangedEvent {
  constructor(public project: DBTProject) {}
}
