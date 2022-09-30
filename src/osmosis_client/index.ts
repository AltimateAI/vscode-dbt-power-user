import { window, workspace } from 'vscode';
import fetch from 'node-fetch';
import { AbortController } from 'node-abort-controller';

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

export enum OsmosisFullReparse {
    True = "true",
    False = "false"
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
        data: { [index: string]: (string | number) },
    }
}

const failedToReachServerError: OsmosisErrorContainer = {
    error: {
        code: OsmosisErrorCode.FailedToReachServer,
        message: "Query failed to reach dbt sync server",
        data: {
            "error": `Is the server listening on http://${getHost()}:${getPort()} address?`,
        },
    }
};

export function getHost(): string {
    return workspace
        .getConfiguration("dbt")
        .get<string>("osmosisHost", "localhost");
}

export function getPort(): number {
    return workspace
        .getConfiguration("dbt")
        .get<number>("osmosisPort", 8581);
}

async function osmosisFetch<T>(endpoint: string, fetchArgs = {}, timeout: number = 25000) {
    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
        abortController.abort();
    }, timeout);
    let response;
    try {
        response = await fetch(
            `http://${getHost()}:${getPort()}/${endpoint}`,
            {
                method: "GET",
                ...fetchArgs,
                signal: abortController.signal
            }
        );
    } catch (e) {
        clearTimeout(timeoutHandler);
        return failedToReachServerError;
    };
    clearTimeout(timeoutHandler);
    return await response.json() as T;
}

export async function runQuery(query: string, limit: number = 200) {
    return await osmosisFetch<OsmosisRunResult | OsmosisErrorContainer>(
        "run" + "?" + new URLSearchParams({ limit: limit.toString() }),
        {
            method: "POST",
            headers: {
                "content-type": "text/plain",
            },
            body: query,
        }
    );
}

export async function compileQuery(query: string) {
    return await osmosisFetch<OsmosisCompileResult | OsmosisErrorContainer>(
        "compile",
        {
            method: "POST",
            headers: {
                "content-type": "text/plain",
            },
            body: query,
        }
    );
}

export async function reparseProject(
    target: string | undefined = undefined,
    reset: OsmosisFullReparse = OsmosisFullReparse.False
) {
    let endpoint = "parse";
    let params = new URLSearchParams({ reset });
    if (target) {
        params.append("target", target);
    }
    endpoint += "?" + params;
    return await osmosisFetch<OsmosisResetResult | OsmosisErrorContainer>(
        endpoint
    );
}

export function isError(result: OsmosisErrorContainer
    | OsmosisRunResult
    | OsmosisCompileResult
    | OsmosisResetResult): result is OsmosisErrorContainer {
    return (<OsmosisErrorContainer>result).error !== undefined;
}
