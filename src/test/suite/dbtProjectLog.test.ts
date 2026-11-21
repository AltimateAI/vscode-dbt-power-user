// DBTProjectLog mirrors <project>/logs/dbt.log into the "<project> dbt logs" output channel.
// A multi-GB log used to be read whole, synchronously, on the first project-config event, which
// blocked the extension host and grew it until it crashed. These tests pin the bounded, async
// behaviour: a tail on open, only appended bytes afterwards, and a restart when the file shrinks.
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { EventEmitter, Uri, window, workspace } from "vscode";
import { DBTProjectLog } from "../../dbt_client/dbtProjectLog";

const MB = 1024 * 1024;
// Generous bound for "only the recent part of the log": anything that copies the whole file fails.
const MAX_APPENDED_BYTES = 8 * MB;
const LINE =
  "\u001b[0m10:00:00.000000 [debug] [MainThread]: running dbt with arguments {...}\n";

type FakeChannel = { name: string; text: string };

describe("DBTProjectLog", () => {
  let dir: string;
  let logFile: string;
  let channels: FakeChannel[];
  let watcherChange: (() => void) | undefined;
  let emitter: EventEmitter<any>;
  let log: DBTProjectLog;

  const writeMegabytes = (megabytes: number, flag: "w" | "a") => {
    const block = Buffer.from(LINE.repeat(Math.ceil(MB / LINE.length)));
    const fd = fs.openSync(logFile, flag);
    for (let i = 0; i < megabytes; i++) {
      fs.writeSync(fd, block);
    }
    fs.closeSync(fd);
  };

  const fireConfig = (projectName = "jaffle_shop") =>
    emitter.fire({
      project: {
        projectRoot: Uri.file(dir),
        getProjectName: () => projectName,
      },
    });

  // Resolves once every read queued so far has finished.
  const idle = () => (log as any).readChain as Promise<void>;

  const lastChannel = () => channels[channels.length - 1];
  const lines = (text: string) => text.split("\n").filter(Boolean);

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "dbt-log-"));
    fs.mkdirSync(path.join(dir, "logs"));
    logFile = path.join(dir, "logs", "dbt.log");
    channels = [];
    watcherChange = undefined;
    jest.spyOn(window, "createOutputChannel").mockImplementation(((
      name: string,
    ) => {
      const channel: FakeChannel = { name, text: "" };
      channels.push(channel);
      return {
        append: jest.fn((s: string) => {
          channel.text += s;
        }),
        appendLine: jest.fn((s: string) => {
          channel.text += s + "\n";
        }),
        clear: jest.fn(),
        show: jest.fn(),
        hide: jest.fn(),
        dispose: jest.fn(),
      };
    }) as any);
    jest.spyOn(workspace, "createFileSystemWatcher").mockReturnValue({
      onDidChange: jest.fn((handler: () => void) => {
        watcherChange = handler;
        return { dispose: jest.fn() };
      }),
      onDidCreate: jest.fn(() => ({ dispose: jest.fn() })),
      onDidDelete: jest.fn(() => ({ dispose: jest.fn() })),
      dispose: jest.fn(),
    } as any);
    emitter = new EventEmitter<any>();
    log = new DBTProjectLog(emitter.event as any);
  });

  afterEach(() => {
    log.dispose();
    jest.restoreAllMocks();
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("appends a bounded tail of a large log, not the whole file", async () => {
    writeMegabytes(64, "w");
    fireConfig();
    await idle();
    const { text } = lastChannel();
    // Master: about 63.5 MB, the whole file minus ANSI codes
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(MAX_APPENDED_BYTES);
    expect(text).toContain("Skipped");
    expect(text).toContain(logFile);
    // The tail starts on a line boundary and ends with the file's last line.
    const body = text.slice(text.indexOf("\n") + 1);
    expect(body.startsWith("10:00:00.000000 [debug]")).toBe(true);
    expect(body.endsWith("running dbt with arguments {...}\n")).toBe(true);
  });

  it("keeps a line that starts exactly where the tail is cut", async () => {
    // 2 MB of 1 KB lines after some older output: the cut lands on a line start.
    const recent = ("a".repeat(1023) + "\n").repeat(2048);
    fs.writeFileSync(logFile, "older\n".repeat(1000) + recent);
    fireConfig();
    await idle();
    const shown = lines(lastChannel().text);
    expect(shown[0]).toContain("Skipped");
    expect(shown.slice(1)).toEqual(lines(recent));
  });

  it("counts a long partial line at the cut in the skipped amount", async () => {
    // A 3 MB line crosses the cut, so 3 MB is skipped and only the 1 MB after it is shown.
    fs.writeFileSync(
      logFile,
      "x".repeat(3 * MB - 1) + "\n" + "y\n".repeat(MB / 2),
    );
    fireConfig();
    await idle();
    const shown = lines(lastChannel().text);
    expect(shown[0]).toMatch(/^Skipped 3\.0 MB of earlier output/);
    expect(shown).toHaveLength(MB / 2 + 1);
    expect(shown.slice(1).every((line) => line === "y")).toBe(true);
  });

  it("reads off the calling turn, so a project-config event never blocks", async () => {
    fs.writeFileSync(logFile, LINE);
    fireConfig();
    expect(lastChannel().text).toBe("");
    await idle();
    expect(lastChannel().text).toBe(
      "10:00:00.000000 [debug] [MainThread]: running dbt with arguments {...}\n",
    );
  });

  it("shows a normal-size log whole, without a skip notice", async () => {
    fs.writeFileSync(logFile, LINE.repeat(1000));
    fireConfig();
    await idle();
    const { name, text } = lastChannel();
    expect(name).toBe("jaffle_shop dbt logs");
    expect(text).not.toContain("Skipped");
    expect(lines(text)).toHaveLength(1000);
  });

  it("reads only the bytes appended since the last read", async () => {
    fs.writeFileSync(logFile, "first run\n");
    fireConfig();
    await idle();
    fs.appendFileSync(logFile, "second run\n");
    watcherChange!();
    await idle();
    fs.appendFileSync(logFile, "third run\n");
    watcherChange!();
    await idle();
    expect(lines(lastChannel().text)).toEqual([
      "first run",
      "second run",
      "third run",
    ]);
  });

  it("bounds a large burst of appended output", async () => {
    fs.writeFileSync(logFile, "first run\n");
    fireConfig();
    await idle();
    writeMegabytes(32, "a");
    watcherChange!();
    await idle();
    const { text } = lastChannel();
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(MAX_APPENDED_BYTES);
    expect(text.startsWith("first run\n")).toBe(true);
    expect(text).toContain("Skipped");
  });

  it("starts over when the log shrinks (rotation or truncation)", async () => {
    fs.writeFileSync(logFile, LINE.repeat(100));
    fireConfig();
    await idle();
    // dbt rotates by renaming dbt.log and starting a new, smaller file.
    fs.renameSync(logFile, `${logFile}.1`);
    fs.writeFileSync(logFile, "after rotation\n");
    watcherChange!();
    await idle();
    const shown = lines(lastChannel().text);
    expect(shown).toHaveLength(101);
    expect(shown[100]).toBe("after rotation");
  });

  it("starts a new channel from the tail when the project is renamed", async () => {
    writeMegabytes(16, "w");
    fireConfig("jaffle_shop");
    await idle();
    fireConfig("jaffle_shop_v2");
    await idle();
    expect(channels.map((c) => c.name)).toEqual([
      "jaffle_shop dbt logs",
      "jaffle_shop_v2 dbt logs",
    ]);
    const { text } = lastChannel();
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(MAX_APPENDED_BYTES);
    expect(text).toContain("Skipped");
  });
});
