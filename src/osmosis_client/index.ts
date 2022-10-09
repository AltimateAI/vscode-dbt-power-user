export interface OsmosisRunResult {
  column_names: string[],
  rows: any[][],
  raw_sql: string,
  compiled_sql: string,
}

export interface OsmosisCompileResult {
  result: string
}

export interface OsmosisResetResult {
  result: string
}

export enum OsmosisErrorCode {
  FailedToReachServer = -1,
  CompileSqlFailure = 1,
  ExecuteSqlFailure = 2,
  ProjectParseFailure = 3,
}

export interface OsmosisErrorContainer {
  error: {
    code: OsmosisErrorCode,
    message: string,
    data: { [key: string]: (string | number) },
  }
}

export function isError(result: OsmosisErrorContainer
  | OsmosisRunResult
  | OsmosisCompileResult
  | OsmosisResetResult): result is OsmosisErrorContainer {
  return (<OsmosisErrorContainer>result).error !== undefined;
}
