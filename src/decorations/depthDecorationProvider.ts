import * as vscode from 'vscode';
import { DBTProjectContainer } from '../manifest/dbtProjectContainer';
import { TelemetryService } from '../telemetry';
import { DBTTerminal } from '../dbt_client/dbtTerminal';
import { ManifestCacheProjectAddedEvent } from '../manifest/event/manifestCacheChangedEvent';

export class DepthDecorationProvider implements vscode.Disposable {
  private readonly REF_PATTERN = /\{\{\s*ref\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;
  private readonly decorationType: vscode.TextEditorDecorationType;
  public readonly hoverProvider: vscode.Disposable;
  private projectToDepthMap: Map<string, Map<string, number>> = new Map();

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
  ) {
    this.decorationType = vscode.window.createTextEditorDecorationType({
      after: {
        margin: '0 0 0 5px',
        textDecoration: 'none',
      },
    });

    this.hoverProvider = vscode.languages.registerHoverProvider(['sql', 'jinja-sql'], {
      provideHover: (document, position, token) => {
        return this.provideHoverForDepthIndicator(document, position, token);
      },
    });

    this.dbtProjectContainer.onManifestChanged((event) => {
      event.added?.forEach((added) => {
        this.projectToDepthMap.set(added.project.projectRoot.fsPath, added.modelDepthMap);
      });
      event.removed?.forEach((removed) => {
        this.projectToDepthMap.delete(removed.projectRoot.fsPath);
      });

      vscode.window.visibleTextEditors.forEach(editor => {
        this.updateDecorations(editor);
      });
    });
  }

  dispose() {
    this.decorationType.dispose();
    this.hoverProvider.dispose();
  }

  public updateDecorations(editor: vscode.TextEditor): void {
    if (!this.isDbtFile(editor.document)) {
      return;
    }

    const project = this.dbtProjectContainer.findDBTProject(editor.document.uri);
    if (!project) {
      return;
    }

    const projectRoot = project.projectRoot.fsPath;
    const depthMapForProject = this.projectToDepthMap.get(projectRoot);
    if (!depthMapForProject) {
      return;
    }

    const text = editor.document.getText();
    const decorations: vscode.DecorationOptions[] = [];
    let match;

    while ((match = this.REF_PATTERN.exec(text)) !== null) {
      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);
      const refRange = new vscode.Range(startPos, endPos);
      
      const modelName = match[1];
      const depth = depthMapForProject.get(modelName);
      
      if (depth !== undefined) {
        decorations.push(this.createDepthDecoration(refRange, depth));
      }
    }

    editor.setDecorations(this.decorationType, decorations);
  }

  private createDepthDecoration(refRange: vscode.Range, depth: number): vscode.DecorationOptions {
    const config = vscode.workspace.getConfiguration('altimate');
    const mediumThreshold = config.get<number>('depthDecoration.mediumDepthThreshold') || 3;
    const highThreshold = config.get<number>('depthDecoration.highDepthThreshold') || 6;
    
    let color = config.get<string>('depthDecoration.colorLow') || 'rgba(0, 200, 0, 0.7)';
    const adjustedDepth = depth + 1;
    
    if (adjustedDepth >= highThreshold) {
      color = config.get<string>('depthDecoration.colorHigh') || 'rgba(200, 0, 0, 0.7)';
    } else if (adjustedDepth >= mediumThreshold) {
      color = config.get<string>('depthDecoration.colorMedium') || 'rgba(200, 200, 0, 0.7)';
    }
    
    const depthText = `(${adjustedDepth})`;

    return {
      range: refRange,
      renderOptions: {
        after: {
          contentText: depthText,
          backgroundColor: color,
          color: 'white',
          fontWeight: 'bold',
          margin: '0 0 0 5px'
        }
      }
    };
  }

  private provideHoverForDepthIndicator(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.Hover | undefined {
    if (!this.isDbtFile(document)) {
      return;
    }

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
      const range = new vscode.Range(startPos, endPos);
      
      if (endPos.line === position.line && 
          position.character >= endPos.character && 
          position.character <= endPos.character + 5) {
        const modelName = match[1];
        const depth = depthMapForProject.get(modelName);
        
        if (depth !== undefined) {
          const adjustedDepth = depth + 1;
          const hoverContent = new vscode.MarkdownString();
          hoverContent.appendMarkdown(`The referenced model \`${modelName}\` has a DAG depth of ${adjustedDepth}.\n\n`);
          hoverContent.appendMarkdown(`The longest path of models between a source and \`${modelName}\` is ${adjustedDepth} nodes long.\n\n`);
          hoverContent.appendMarkdown(`Annotation from Altimate`);
          hoverContent.isTrusted = true;
          
          return new vscode.Hover(hoverContent, range);
        }
      }
    }
  }

  private isDbtFile(document: vscode.TextDocument): boolean {
    const isSqlFile = document.languageId === 'sql' || 
                     document.languageId === 'jinja-sql' ||
                     document.fileName.endsWith('.sql');
    
    if (!isSqlFile) {
      return false;
    }
    
    return document.getText().includes('ref(') || 
           document.fileName.includes('/models/') ||
           document.fileName.includes('\\models\\');
  }
}
