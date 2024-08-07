import type * as nbformat from "@jupyterlab/nbformat";
import { NotebookCellOutput, NotebookCellOutputItem } from "vscode";

export enum CellOutputMimeTypes {
  error = "application/vnd.code.notebook.error",
  stderr = "application/vnd.code.notebook.stderr",
  stdout = "application/vnd.code.notebook.stdout",
}

const orderOfMimeTypes = [
  "application/vnd.*",
  "application/vdom.*",
  "application/geo+json",
  "application/x-nteract-model-debug+json",
  "text/html",
  "application/javascript",
  "image/gif",
  "text/latex",
  "text/markdown",
  "image/png",
  "image/svg+xml",
  "image/jpeg",
  "application/json",
  "text/plain",
];
const textMimeTypes = [
  "text/plain",
  "text/markdown",
  CellOutputMimeTypes.stderr,
  CellOutputMimeTypes.stdout,
];

/**
 * Metadata we store in VS Code cell output items.
 * This contains the original metadata from the Jupyuter Outputs.
 */
interface CellOutputMetadata {
  /**
   * Cell output metadata.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
  /**
   * Transient data from Jupyter.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transient?: {
    /**
     * This is used for updating the output in other cells.
     * We don't know of others properties, but this is definitely used.
     */
    display_id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  };
  /**
   * Original cell output type
   */
  outputType: nbformat.OutputType | string;
  executionCount?: nbformat.IExecuteResult["ExecutionCount"];
  /**
   * Whether the original Mime data is JSON or not.
   * This properly only exists in metadata for NotebookCellOutputItems
   * (this is something we have added)
   */
  __isJson?: boolean;
  /**
   * Whether to display the open plot icon.
   */
  __displayOpenPlotIcon?: boolean;
}

function getOutputMetadata(output: nbformat.IOutput): CellOutputMetadata {
  // Add on transient data if we have any. This should be removed by our save functions elsewhere.
  const metadata: CellOutputMetadata = {
    outputType: output.output_type,
  };
  if (output.transient) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata.transient = output.transient as any;
  }

  switch (output.output_type as nbformat.OutputType) {
    case "display_data":
    case "execute_result":
    case "update_display_data": {
      metadata.executionCount = output.execution_count;
      metadata.metadata = output.metadata
        ? JSON.parse(JSON.stringify(output.metadata))
        : {};
      break;
    }
    default:
      break;
  }

  return metadata;
}

/**
 * Converts a Jupyter display cell output into a VSCode cell output format.
 * Handles sizing, adding backgrounds to images and the like.
 * E.g. Jupyter cell output contains metadata to add backgrounds to images.
 */
export function translateDisplayDataOutput(
  output:
    | nbformat.IDisplayData
    | nbformat.IDisplayUpdate
    | nbformat.IExecuteResult,
): NotebookCellOutput {
  // Metadata could be as follows:
  // We'll have metadata specific to each mime type as well as generic metadata.
  /*
    IDisplayData = {
        output_type: 'display_data',
        data: {
            'image/jpg': '/////'
            'image/png': '/////'
            'text/plain': '/////'
        },
        metadata: {
            'image/png': '/////',
            'background': true,
            'xyz': '///
        }
    }
    */
  const metadata = getOutputMetadata(output);
  // If we have SVG or PNG, then add special metadata to indicate whether to display `open plot`
  if ("image/svg+xml" in output.data || "image/png" in output.data) {
    metadata.__displayOpenPlotIcon = true;
  }
  const items: NotebookCellOutputItem[] = [];
  if (output.data) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in output.data) {
      items.push(convertJupyterOutputToBuffer(key, output.data[key]));
    }
  }

  return new NotebookCellOutput(
    sortOutputItemsBasedOnDisplayOrder(items),
    metadata,
  );
}

function isEmptyVendoredMimeType(outputItem: NotebookCellOutputItem) {
  if (outputItem.mime.startsWith("application/vnd.")) {
    try {
      return new TextDecoder().decode(outputItem.data).length === 0;
    } catch {}
  }
  return false;
}

function sortOutputItemsBasedOnDisplayOrder(
  outputItems: NotebookCellOutputItem[],
): NotebookCellOutputItem[] {
  return outputItems.sort((outputItemA, outputItemB) => {
    const isMimeTypeMatch = (value: string, compareWith: string) => {
      if (value.endsWith(".*")) {
        value = value.substr(0, value.indexOf(".*"));
      }
      return compareWith.startsWith(value);
    };
    let indexOfMimeTypeA = orderOfMimeTypes.findIndex((mime) =>
      isMimeTypeMatch(mime, outputItemA.mime),
    );
    let indexOfMimeTypeB = orderOfMimeTypes.findIndex((mime) =>
      isMimeTypeMatch(mime, outputItemB.mime),
    );
    // Sometimes we can have mime types with empty data, e.g. when using holoview we can have `application/vnd.holoviews_load.v0+json` with empty value.
    // & in these cases we have HTML/JS and those take precedence.
    // https://github.com/microsoft/vscode-jupyter/issues/6109
    if (isEmptyVendoredMimeType(outputItemA)) {
      indexOfMimeTypeA = -1;
    }
    if (isEmptyVendoredMimeType(outputItemB)) {
      indexOfMimeTypeB = -1;
    }
    indexOfMimeTypeA = indexOfMimeTypeA == -1 ? 100 : indexOfMimeTypeA;
    indexOfMimeTypeB = indexOfMimeTypeB == -1 ? 100 : indexOfMimeTypeB;
    return indexOfMimeTypeA - indexOfMimeTypeB;
  });
}

export function concatMultilineString(str: nbformat.MultilineString): string {
  if (Array.isArray(str)) {
    let result = "";
    for (let i = 0; i < str.length; i += 1) {
      const s = str[i];
      if (i < str.length - 1 && !s.endsWith("\n")) {
        result = result.concat(`${s}\n`);
      } else {
        result = result.concat(s);
      }
    }
    return result;
  }
  return str.toString();
}

export function base64ToUint8Array(base64: string): Uint8Array {
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
    return Buffer.from(base64, "base64");
  } else {
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  }
}

function convertJupyterOutputToBuffer(
  mime: string,
  value: unknown,
): NotebookCellOutputItem {
  if (!value) {
    return NotebookCellOutputItem.text("", mime);
  }
  try {
    if (
      (mime.startsWith("text/") || textMimeTypes.includes(mime)) &&
      (Array.isArray(value) || typeof value === "string")
    ) {
      const stringValue = Array.isArray(value)
        ? concatMultilineString(value)
        : value;
      return NotebookCellOutputItem.text(stringValue, mime);
    } else if (
      mime.startsWith("image/") &&
      typeof value === "string" &&
      mime !== "image/svg+xml"
    ) {
      // Images in Jupyter are stored in base64 encoded format.
      // VS Code expects bytes when rendering images.
      return new NotebookCellOutputItem(base64ToUint8Array(value), mime);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      return NotebookCellOutputItem.text(JSON.stringify(value), mime);
    } else {
      // For everything else, treat the data as strings (or multi-line strings).
      value = Array.isArray(value) ? concatMultilineString(value) : value;
      return NotebookCellOutputItem.text(value as string, mime);
    }
  } catch (ex) {
    console.error(
      `Failed to convert ${mime} output to a buffer ${typeof value}, ${value}`,
      ex,
    );
    return NotebookCellOutputItem.text("");
  }
}

function translateStreamOutput(output: nbformat.IStream): NotebookCellOutput {
  const value = concatMultilineString(output.text);
  const factoryFn =
    output.name === "stderr"
      ? NotebookCellOutputItem.stderr
      : NotebookCellOutputItem.stdout;
  return new NotebookCellOutput([factoryFn(value)], getOutputMetadata(output));
}

/**
 * We will display the error message in the status of the cell.
 * The `ename` & `evalue` is displayed at the top of the output by VS Code.
 * As we're displaying the error in the statusbar, we don't want this dup error in output.
 * Hence remove this.
 */
function translateErrorOutput(output?: nbformat.IError): NotebookCellOutput {
  output = output || {
    output_type: "error",
    ename: "",
    evalue: "",
    traceback: [],
  };
  return new NotebookCellOutput(
    [
      NotebookCellOutputItem.error({
        name: output?.ename || "",
        message: output?.evalue || "",
        stack: (output?.traceback || []).join("\n"),
      }),
    ],
    { ...getOutputMetadata(output), originalError: output },
  );
}

export const cellOutputMappers = new Map<
  nbformat.OutputType,
  (output: nbformat.IOutput) => NotebookCellOutput
>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
cellOutputMappers.set("display_data", translateDisplayDataOutput as any);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
cellOutputMappers.set("error", translateErrorOutput as any);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
cellOutputMappers.set("execute_result", translateDisplayDataOutput as any);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
cellOutputMappers.set("stream", translateStreamOutput as any);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
cellOutputMappers.set("update_display_data", translateDisplayDataOutput as any);

export function cellOutputToVSCCellOutput(
  output: nbformat.IOutput,
): NotebookCellOutput {
  const fn = cellOutputMappers.get(output.output_type as nbformat.OutputType);
  let result: NotebookCellOutput;
  if (fn) {
    result = fn(output);
  } else {
    console.warn(
      `Unable to translate cell from ${output.output_type} to NotebookCellData for VS Code.`,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result = translateDisplayDataOutput(output as any);
  }
  return result;
}

export function handleTensorBoardDisplayDataOutput(data: nbformat.IMimeBundle) {
  if (data.hasOwnProperty("text/html")) {
    const text = data["text/html"];
    if (
      typeof text === "string" &&
      text.includes('<iframe id="tensorboard-frame-')
    ) {
      data["text/html"] = text.replace(
        /new URL\((.*), window.location\)/,
        'new URL("http://localhost")',
      );
    }
  }
  return data;
}
