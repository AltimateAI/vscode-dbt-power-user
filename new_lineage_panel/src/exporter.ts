import * as htmlToImage from 'html-to-image';

declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

const vscode = acquireVsCodeApi();
// Adding these lines to enable debug logging

function saveLineage(elementId: string) {
  console.log('Starting saveLineage function.');

  const element = document.getElementById(elementId);

  if (!element) {
    vscode.postMessage({ command: "error", text: `Element with ID ${elementId} not found.` });
    return;
  }

  console.log('Element found, converting to SVG.');

  function filter(node: Node): boolean {
    return (node.nodeName !== 'I'); // Filter out <i> tags
  }

  htmlToImage.toSvg(element, { filter: filter })
    .then((dataUrl: string) => {
      console.log('SVG conversion successful.');

      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'exported_image.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      console.log('SVG download initiated and cleanup done.');
    })
    .catch((error: Error) => {
      vscode.postMessage({ command: "error", text: `Error during SVG export: ${error.message}` });
    });
}

export { saveLineage };
