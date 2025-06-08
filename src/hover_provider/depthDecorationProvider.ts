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
import { provideSingleton } from "../utils";

@provideSingleton(DepthDecorationProvider)
export class DepthDecorationProvider implements HoverProvider, Disposable {
  private disposables: Disposable[] = [];
  private readonly REF_PATTERN =
    /\{\{\s*ref\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;
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
        if (event.affectsConfiguration("altimate")) {
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
    let match;

    while ((match = this.REF_PATTERN.exec(text)) !== null) {
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
    const config = workspace.getConfiguration("altimate");
    const mediumThreshold =
      config.get<number>("depthDecoration.mediumDepthThreshold") || 3;
    const highThreshold =
      config.get<number>("depthDecoration.highDepthThreshold") || 6;

    let color =
      config.get<string>("depthDecoration.colorLow") || "rgba(0, 200, 0, 0.7)";
    const adjustedDepth = depth + 1;

    if (adjustedDepth >= highThreshold) {
      color =
        config.get<string>("depthDecoration.colorHigh") ||
        "rgba(200, 0, 0, 0.7)";
    } else if (adjustedDepth >= mediumThreshold) {
      color =
        config.get<string>("depthDecoration.colorMedium") ||
        "rgba(200, 200, 0, 0.7)";
    }

    const depthText = `(${adjustedDepth})`;

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
    let match;
    this.REF_PATTERN.lastIndex = 0;

    while ((match = this.REF_PATTERN.exec(text)) !== null) {
      const startPos = document.positionAt(match.index);
      const endPos = document.positionAt(match.index + match[0].length);
      const range = new Range(startPos, endPos);

      if (
        endPos.line === position.line &&
        position.character >= endPos.character &&
        position.character <= endPos.character + 5
      ) {
        const modelName = match[1];
        const depth = depthMapForProject.get(modelName);

        if (depth !== undefined) {
          const adjustedDepth = depth + 1;
          const hoverContent = new MarkdownString();
          hoverContent.appendMarkdown(
            `The referenced model \`${modelName}\` has a DAG depth of ${adjustedDepth}.\n\n`,
          );
          hoverContent.appendMarkdown(
            `The longest path of models between a source and \`${modelName}\` is ${adjustedDepth} nodes long.\n\n`,
          );
          hoverContent.isTrusted = true;

          return new Hover(hoverContent, range);
        }
      }
    }
  }
}
