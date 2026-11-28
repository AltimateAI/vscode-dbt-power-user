import { closeSync, constants, fstatSync, openSync, readSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { homedir } from "os";
import * as path from "path";

/**
 * The file where a dbt Core mode window records that dbt Core worked, for
 * every VS Code build and profile of this OS user (globalState is kept per
 * build and profile). A remote window writes it on the remote host, where its
 * dbt runs.
 */
export function dbtCoreRecordFile(): string {
  return path.join(
    homedir(),
    ".altimate",
    "dbt-power-user",
    "dbt-core-worked.json",
  );
}

/** manifest.json opens with its metadata: this is plenty to hold `dbt_version`. */
const MANIFEST_HEAD_BYTES = 512;
/** The record is a few bytes: a bigger file isn't one. */
const RECORD_MAX_BYTES = 256;
/**
 * Opening a pipe for reading waits for a writer, which would block the window:
 * O_NONBLOCK returns at once and the open file is then checked. Windows has no
 * pipes in the file system, and no such flag.
 */
const OPEN_FLAGS = constants.O_RDONLY | (constants.O_NONBLOCK ?? 0);
/**
 * `{"metadata": {"dbt_schema_version": "…", "dbt_version": "1.12.6", …`, as
 * dbt Core 1.5 to 1.12 write it; dbt Fusion writes its 2.x version the same
 * way. Only a whole `dbt_version` before any nested object counts: the
 * metadata's own.
 */
const MANIFEST_DBT_MAJOR =
  /^\s*\{\s*"metadata"\s*:\s*\{[^{}]*?"dbt_version"\s*:\s*"(\d+)\.[^"\\]*"/;

/** The first `bytes` of a regular file, its size and mtime; undefined when it can't be read. */
function readHead(
  file: string,
  bytes: number,
): { text: string; size: number; mtimeMs: number } | undefined {
  let fd: number | undefined;
  try {
    fd = openSync(file, OPEN_FLAGS);
    const stats = fstatSync(fd);
    if (!stats.isFile()) {
      return undefined;
    }
    const buffer = Buffer.alloc(bytes);
    const read = readSync(fd, buffer, 0, bytes, 0);
    return {
      text: buffer.toString("utf8", 0, read),
      size: stats.size,
      mtimeMs: stats.mtimeMs,
    };
  } catch {
    return undefined;
  } finally {
    if (fd !== undefined) {
      try {
        closeSync(fd);
      } catch {
        // Nothing to do: the file was only read.
      }
    }
  }
}

/**
 * When dbt Core last wrote the manifest.json in this target path, which every
 * dbt Core command and every dbt Core mode rebuild rewrites. Undefined when
 * there is none, it can't be read, or another dbt (dbt Fusion) wrote it.
 */
export function dbtCoreManifestWrittenAt(
  targetPath: string,
): number | undefined {
  const head = readHead(
    path.join(targetPath, "manifest.json"),
    MANIFEST_HEAD_BYTES,
  );
  return head && MANIFEST_DBT_MAJOR.exec(head.text)?.[1] === "1"
    ? head.mtimeMs
    : undefined;
}

/** The time in a record file; undefined when it is missing, unreadable or not a record. */
export function readDbtCoreRecord(file: string): number | undefined {
  const head = readHead(file, RECORD_MAX_BYTES);
  if (!head || head.size > RECORD_MAX_BYTES) {
    return undefined;
  }
  try {
    const record: unknown = JSON.parse(head.text);
    const at =
      typeof record === "object" && record !== null
        ? (record as Record<string, unknown>).dbtCoreWorkedAt
        : undefined;
    return typeof at === "number" && Number.isFinite(at) ? at : undefined;
  } catch {
    return undefined;
  }
}

/** Writes a record file, creating its folder; rejects when either fails. */
export async function writeDbtCoreRecord(
  file: string,
  at: number,
): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify({ dbtCoreWorkedAt: at }));
}
