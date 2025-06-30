import {
  DecorationOptions,
  Disposable,
  Hover,
  HoverProvider,
  MarkdownString,
  Position,
  Range,
  TextDocument,
  TextEditor,
  TextEditorDecorationType,
  window,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { getDepthColor } from "../utils";

export class DepthDecorationProvider implements HoverProvider, Disposable {
  private disposables: Disposable[] = [];
  private readonly REF_PATTERN =
    /\{\{\s*ref\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/;
  private readonly decorationType: TextEditorDecorationType;
  private projectToDepthMap: Map<string, Map<string, number>> = new Map();

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.decorationType = window.createTextEditorDecorationType({
      after: {
        margin: "0 0 0 5px",
        textDecoration: "none",
      },
    });

    this.dbtProjectContainer.onManifestChanged((event) => {
      event.added?.forEach((added) => {
        this.projectToDepthMap.set(
          added.project.projectRoot.fsPath,
          added.modelDepthMap,
        );
      });
      event.removed?.forEach((removed) => {
        this.projectToDepthMap.delete(removed.projectRoot.fsPath);
      });

      window.visibleTextEditors.forEach((editor) => {
        this.updateDecorations(editor);
      });
    });

    this.disposables.push(
      window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
          this.updateDecorations(editor);
        }
      }),
      workspace.onDidChangeTextDocument((event) => {
        if (
          window.activeTextEditor &&
          event.document === window.activeTextEditor.document
        ) {
          this.updateDecorations(window.activeTextEditor);
        }
      }),
      workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("dbt")) {
          window.visibleTextEditors.forEach((editor) => {
            this.updateDecorations(editor);
          });
        }
      }),
    );
  }

  dispose() {
    this.decorationType.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private updateDecorations(editor: TextEditor): void {
    const project = this.dbtProjectContainer.findDBTProject(
      editor.document.uri,
    );
    if (!project) {
      return;
    }

    const projectRoot = project.projectRoot.fsPath;
    const depthMapForProject = this.projectToDepthMap.get(projectRoot);
    if (!depthMapForProject) {
      return;
    }

    const text = editor.document.getText();
    const decorations: DecorationOptions[] = [];
    const pattern = new RegExp(this.REF_PATTERN, "g");
    let match;

    while ((match = pattern.exec(text)) !== null) {
      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);
      const refRange = new Range(startPos, endPos);

      const modelName = match[1];
      const depth = depthMapForProject.get(modelName);

      if (depth !== undefined) {
        decorations.push(this.createDepthDecoration(refRange, depth));
      }
    }

    editor.setDecorations(this.decorationType, decorations);
  }

  private createDepthDecoration(
    refRange: Range,
    depth: number,
  ): DecorationOptions {
    const color = getDepthColor(depth);
    const depthText = `(${depth})`;

    return {
      range: refRange,
      renderOptions: {
        after: {
          contentText: depthText,
          backgroundColor: color,
          color: "white",
          fontWeight: "bold",
          margin: "0 0 0 5px",
        },
      },
    };
  }

  public provideHover(
    document: TextDocument,
    position: Position,
  ): Hover | undefined {
    const project = this.dbtProjectContainer.findDBTProject(document.uri);
    if (!project) {
      return;
    }

    const projectRoot = project.projectRoot.fsPath;
    const depthMapForProject = this.projectToDepthMap.get(projectRoot);
    if (!depthMapForProject) {
      return;
    }

    const text = document.getText();
    let matches: RegExpMatchArray[] = [];
    try {
      const pattern = new RegExp(this.REF_PATTERN, "g");
      matches = Array.from(text.matchAll(pattern));
    } catch (error) {
      console.error("Error matching ref pattern in provideHover:", error);
      return undefined;
    }

    for (const match of matches) {
      if (match.index === undefined) {
        continue;
      }
      const startPos = document.positionAt(match.index);
      const endPos = document.positionAt(match.index + match[0].length);
      const refRange = new Range(startPos, endPos);

      if (refRange.contains(position)) {
        const modelName = match[1];
        const depth = depthMapForProject.get(modelName);

        if (depth !== undefined) {
          const color = getDepthColor(depth);
          const markdown = new MarkdownString(
            `**DAG Depth:** <span style="color:${color}">${depth}</span>\n\n` +
              `The longest path of models between a source and this model is ${depth} nodes long.`,
          );
          markdown.isTrusted = true;
          markdown.supportHtml = true;
          return new Hover(markdown, refRange);
        }
      }
    }

    return undefined;
  }
}
