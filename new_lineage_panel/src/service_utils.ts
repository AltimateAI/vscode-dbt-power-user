declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

const vscode = acquireVsCodeApi();

let id = 0;
const requestMap: Map<
  number,
  { resolve: (k: unknown) => void; reject: (reason?: string) => void }
> = new Map();

export const handleResponse = (args: {
  id: number;
  body: unknown;
  status: boolean;
  error: string;
}) => {
  const obj = requestMap.get(args.id);
  if (!obj) return;
  const { resolve, reject } = obj;
  if (args.status) {
    resolve(args.body);
  } else {
    reject(args.error);
  }
  requestMap.delete(args.id);
};

export const requestExecutor = (url: string, params: unknown) => {
  return new Promise((resolve, reject) => {
    requestMap.set(id, { resolve, reject });
    vscode.postMessage({ command: url, args: { id, params } });
    id++;
  });
};

export const openFile = (url: string) => {
  vscode.postMessage({ command: "openFile", args: { url } });
};

export const openURL = (url: string) => {
  vscode.postMessage({ command: "openURL", args: { url } });
};

// This does not post like the above. Need an update
export const exportToSVG = () => {
  console.log('Export function started.');

  try {
    // Select the iframe by ID
    const iframe = document.querySelector('#active-frame');

    if (!iframe) {
      console.error('No iframe found.');
      return;
    }

    // Access the content of the iframe
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Select the SVG element within the iframe
    const svgElement = iframeDocument.querySelector('svg');

    if (!svgElement) {
      console.error('No SVG element found to export.');
      return;
    }

    console.log('SVG element found:', svgElement);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    console.log('SVG string serialized:', svgString);

    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    console.log('SVG Blob URL created:', svgUrl);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'exported_image.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    console.log('Download link clicked.');

    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
    console.log('Temporary elements removed and URL revoked.');
  } catch (error) {
    console.error('Error during export:', error);
  }

};

export const openChat = () => openURL("https://app.myaltimate.com/contactus");

export const exportLineage = () => exportToSVG();

export const previewFeature = () => {
  vscode.postMessage({ command: "previewFeature", args: {} });
};

export const showInfoNotification = (message: string) => {
  vscode.postMessage({ command: "showInfoNotification", args: { message } });
};

export const init = () => vscode.postMessage({ command: "init", args: {} });

export const setLegacyLineageView = () =>
  vscode.postMessage({ command: "setLegacyLineageView" });

// column lineage with cancellation

export enum CllEvents {
  START = "start",
  END = "end",
  CANCEL = "cancel",
}

export class CLL {
  static isCancelled = false;
  static inProgress = false;
  static linkCount = 0;

  static onCancel() {
    CLL.isCancelled = true;
    CLL.inProgress = false;
  }

  static cancel() {
    // this is used to cancel from webview
    CLL.onCancel();
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.CANCEL },
    });
  }

  static start() {
    CLL.inProgress = true;
    CLL.isCancelled = false;
    CLL.linkCount = 0;
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.START },
    });
  }

  static end() {
    CLL.inProgress = false;
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.END },
    });
    vscode.postMessage({
      command: "telemetryEvents",
      args: {
        id: "columnLineageNumLinks",
        params: { num: CLL.linkCount },
      },
    });
    CLL.linkCount = 0;
  }

  static addLinks(n: number) {
    CLL.linkCount += n;
  }

  static showCllInProgressMsg() {
    showInfoNotification(
      "Column lineage is in progress. Either wait for it to complete or cancel the current one."
    );
  }
}

export const columnLineage = ({ event }: { event: CllEvents }) => {
  if (event === CllEvents.CANCEL) {
    CLL.onCancel();
  }
};
