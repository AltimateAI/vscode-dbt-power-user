import {
  CancellationToken,
  Disposable,
  GlobPattern,
  Location,
  RelativePattern,
  TestController,
  TestItem,
  TestItemCollection,
  TestMessage,
  TestRun,
  TestRunRequest,
  tests,
  Uri,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

@provideSingleton(DbtTestController)
export class DbtTestController implements Disposable {
  private ctrl: TestController;
  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.ctrl = tests.createTestController("dbtTestController", "dbt Tests");
    const runHandler = (
      request: TestRunRequest,
      cancellation: CancellationToken
    ) => {
      const queue: { test: TestItem; data: DbtTest }[] = [];
      const run = this.ctrl.createTestRun(request);

      // Map of file URIs to statements on each line:
      const discoverTests = async (tests: Iterable<TestItem>) => {
        for (const test of tests) {
          if (request.exclude?.includes(test)) {
            continue;
          }

          const data = testData.get(test);
          if (data instanceof GenericTest) {
            run.enqueued(test);
            queue.push({ test, data });
          } else {
            if (data instanceof SingularTest && !true) {
              // await ...;
            }

            await discoverTests(gatherTestItems(test.children));
          }

          // if (test.uri && !coveredLines.has(test.uri.toString())) {
          //   try {
          //     const lines = (await getContentFromFilesystem(test.uri)).split('\n');
          //     coveredLines.set(
          //       test.uri.toString(),
          //       lines.map((lineText, lineNo) =>
          //         lineText.trim().length ? new vscode.StatementCoverage(0, new vscode.Position(lineNo, 0)) : undefined
          //       )
          //     );
          //   } catch {
          //     // ignored
          //   }
          // }
        }
      };

      const runTestQueue = async () => {
        for (const { test, data } of queue) {
          run.appendOutput(`Running ${test.id}\r\n`);
          if (cancellation.isCancellationRequested) {
            run.skipped(test);
          } else {
            run.started(test);
            await data.run(test, run);
          }

          const lineNo = test.range!.start.line;
          // const fileCoverage = coveredLines.get(test.uri!.toString());
          // if (fileCoverage) {
          //   fileCoverage[lineNo]!.executionCount++;
          // }

          run.appendOutput(`Completed ${test.id}\r\n`);
        }

        run.end();
      };

      // run.coverageProvider = {
      //   provideFileCoverage() {
      //     const coverage: FileCoverage[] = [];
      //     for (const [uri, statements] of coveredLines) {
      //       coverage.push(
      //         FileCoverage.fromDetails(
      //           Uri.parse(uri),
      //           statements.filter((s): s is StatementCoverage => !!s)
      //         )
      //       );
      //     }

      //     return coverage;
      //   },
      // };

      discoverTests(request.include ?? gatherTestItems(this.ctrl.items)).then(
        runTestQueue
      );
    };

    this.ctrl.refreshHandler = async () => {
      // await Promise.all(getWorkspaceTestPatterns().map(({ pattern }) => findInitialFiles(ctrl, pattern)));
    };

    // this.ctrl.createRunProfile('Run Tests', vscode.TestRunProfileKind.Run, runHandler, true);

    this.ctrl.resolveHandler = async (item) => {
      if (!item) {
        // context.subscriptions.push(...startWatchingWorkspace(ctrl));
        return;
      }

      const data = testData.get(item);
      if (data instanceof SingularTest) {
        // await data.updateFromDisk(ctrl, item);
      }
    };
  }

  dispose(): void {
    this.ctrl.dispose();
  }
}

type DbtTest = SingularTest | GenericTest;

const testData = new WeakMap<TestItem, DbtTest>();

// let generationCounter = 0;

/*
A singular test is testing in its simplest form: If you can write a SQL query that returns
failing rows, you can save that query in a .sql file within your test directory. It's now a test,
and it will be executed by the dbt test command.
*/
class SingularTest {
  constructor(
    private readonly name: string,
    private readonly path: string,
    public generation: number
  ) {}

  getLabel() {
    return this.name;
  }

  async run(item: TestItem, options: TestRun): Promise<void> {
    const start = Date.now();
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );
    const actual = this.evaluate();
    const duration = Date.now() - start;

    if (actual === null) {
      // Pass
      options.passed(item, duration);
    } else {
      // Fail
      const message = TestMessage.diff(
        `Expected ${item.label}`,
        "fixme",
        String(actual)
      );
      message.location = new Location(item.uri!, item.range!);
      options.failed(item, message, duration);
    }
  }

  // Evaluation logic, should run dbt test on the host
  private evaluate() {
    switch (1 /*this.operator*/) {
      default:
        "fixme";
    }
  }
}

/*
A generic test is a parametrized query that accepts arguments. The test query is defined in
a special test block (like a macro). Once defined, you can reference the generic test by name
throughout your .yml files—define it on models, columns, sources, snapshots, and seeds. dbt ships
with four generic tests built in, and we think you should use them!
*/
class GenericTest {
  constructor(
    private readonly name: string,
    private readonly path: string,
    public generation: number
  ) {}

  getLabel() {
    return this.name;
  }

  async run(item: TestItem, options: TestRun): Promise<void> {
    const start = Date.now();
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );
    const actual = this.evaluate();
    const duration = Date.now() - start;

    if (actual === null) {
      // Pass
      options.passed(item, duration);
    } else {
      // Fail
      const message = TestMessage.diff(
        `Expected ${item.label}`,
        "fixme",
        String(actual)
      );
      message.location = new Location(item.uri!, item.range!);
      options.failed(item, message, duration);
    }
  }

  // Evaluation logic, should run dbt test on the host
  private evaluate() {
    switch (1 /*this.operator*/) {
      default:
        "fixme";
    }
  }
}

function getOrCreateFile(controller: TestController, uri: Uri) {
  const existing = controller.items.get(uri.toString());
  if (existing) {
    return { file: existing, data: testData.get(existing) as SingularTest };
  }

  // const file = controller.createTestItem(uri.toString(), uri.path.split('/').pop()!, uri);
  // controller.items.add(file);

  // const data = new TestFile();
  // testData.set(file, data);

  // file.canResolveChildren = true;
  // return { file, data };
}

function gatherTestItems(collection: TestItemCollection) {
  const items: TestItem[] = [];
  collection.forEach((item) => items.push(item));
  return items;
}

function getWorkspaceTestPatterns() {
  if (!workspace.workspaceFolders) {
    return [];
  }

  return workspace.workspaceFolders.map((workspaceFolder) => ({
    workspaceFolder,
    pattern: new RelativePattern(workspaceFolder, "**/*.md"),
  }));
}

async function findInitialFiles(
  controller: TestController,
  pattern: GlobPattern
) {
  for (const file of await workspace.findFiles(pattern)) {
    getOrCreateFile(controller, file);
  }
}

function startWatchingWorkspace(controller: TestController) {
  return getWorkspaceTestPatterns().map(({ workspaceFolder, pattern }) => {
    const watcher = workspace.createFileSystemWatcher(pattern);

    watcher.onDidCreate((uri) => getOrCreateFile(controller, uri));
    watcher.onDidChange((uri) => {
      // const { file, data } = getOrCreateFile(controller, uri);
      // if (data.didResolve) {
      //   data.updateFromDisk(controller, file);
      // }
    });
    watcher.onDidDelete((uri) => controller.items.delete(uri.toString()));

    findInitialFiles(controller, pattern);

    return watcher;
  });
}
