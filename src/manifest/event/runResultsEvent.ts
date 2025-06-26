import { DBTProject } from "../dbtProject";

export class RunResultsEvent {
  constructor(
    public project: DBTProject,
    public uniqueIds?: string[],
  ) {}
}
