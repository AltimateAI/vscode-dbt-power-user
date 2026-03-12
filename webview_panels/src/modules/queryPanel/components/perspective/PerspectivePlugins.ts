import { panelLogger } from "@modules/logger";
import OpenIcon from "./openIcon.svg?raw";
import type { Schema } from "@finos/perspective";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

// Dispatches a custom event with the given event name and message
function dispatchCustomEvent(
  eventName: string,
  message: string,
  columnName: string,
  type: string,
) {
  const event = new CustomEvent(eventName, {
    detail: { columnName, message, type },
  });
  window.dispatchEvent(event);
}

// Checks if the given string is a valid JSON
const isJson = (str: string) => {
  try {
    const parsedAssumingJson: unknown = JSON.parse(str);
    return (
      typeof parsedAssumingJson === "object" && parsedAssumingJson !== null
    );
  } catch (e) {
    return false;
  }
};

// Appends an image to the td element
function appendImage(tdArg: HTMLTableCellElement) {
  const td = tdArg;
  if (!td.querySelector("span")) {
    // Adding svg icon to the span element
    const span = document.createElement("span");

    // Adding class to the elements
    span.classList.add("open-icon");

    span.innerHTML = OpenIcon;
    span.title = "Click to view complete value";
    td.appendChild(span);
  }
}

// Removes the image and click event from the td element
function removeImageAndClickEvent(tdArg: HTMLTableCellElement) {
  const td = tdArg;
  const span = td.querySelector("span");
  if (span) {
    span.remove();
  }
  td.style.cursor = "";
  td.onclick = null;
}

// Adds click event to the td element
function makeClickEvent(
  tdArg: HTMLTableCellElement,
  metadata: TableCellMetadata,
) {
  const td = tdArg;

  const columnName = metadata.column_header;
  if (isJson(metadata.value)) {
    appendImage(td);
    td.style.cursor = "pointer";
    // If string is a valid JSON, add click event to view JSON
    td.onclick = () => {
      dispatchCustomEvent(
        "string-json-viewer",
        metadata.value,
        columnName,
        "json",
      );
    };
    return;
  }

  if (td.offsetWidth < 11 * metadata.value.length) {
    td.style.cursor = "pointer";
    appendImage(td);
    // else if string is greater than 20, add click event to view full string
    td.onclick = () => {
      dispatchCustomEvent(
        "string-json-viewer",
        metadata.value,
        columnName,
        "string",
      );
    };
    return;
  }

  removeImageAndClickEvent(td);
}

// Custom perspective plugin to add click event to the td element
class PerspectiveDatagridJSONViewerPlugin extends (customElements.get(
  "perspective-viewer-datagrid",
) as unknown as typeof HTMLPerspectiveViewerDatagridPluginElement) {
  private readonly pluginName = "PerspectiveDatagridJSONViewerPlugin";
  private view?: PerspectiveViewerView;
  private dirty?: boolean;
  private customInitialized?: boolean;
  private tableSchema?: Schema;
  private schema?: Schema;
  private columnPaths?: string[];
  private groupBy?: string[];

  get name() {
    return this.pluginName;
  }

  getType(metadata: TableCellMetadata) {
    if (!this.columnPaths) {
      return;
    }
    // This function returns the data type of the cell
    if (this.schema && metadata.x >= 0) {
      const columnPath = this.columnPaths[metadata.x];
      const columnPathParts = columnPath.split("|");
      return this.schema[columnPathParts[columnPathParts.length - 1]];
    }
    const columnPath = this.groupBy?.[metadata.row_header_x - 1];
    return columnPath ? this.tableSchema?.[columnPath] : undefined;
  }

  async styleListener() {
    try {
      const datagrid = this.regular_table;
      if (this.dirty) {
        await this.refresh_cache();
      }

      for (const td of datagrid.querySelectorAll("td")) {
        const metadata = datagrid.getMeta(td);
        const type = this.getType(metadata);

        if (type === "string") {
          makeClickEvent(td, metadata);
        }
      }
    } catch (e) {
      panelLogger.error("Failed to add click event to td element:", e);
      executeRequestInAsync("error", {
        text:
          "Failed to add click event to td element. " + (e as Error).message,
      });
    }
  }

  async refresh_cache() {
    try {
      const view = this.view;
      if (!view) {
        return;
      }
      this.columnPaths = await view.column_paths();
      this.groupBy = (await view.get_config()).group_by;
      this.schema = await view.schema();
      this.dirty = false;
    } catch (e) {
      panelLogger.error("Failed to refresh cache:", e);
      executeRequestInAsync("error", {
        text: "Failed to refresh cache. " + (e as Error).message,
      });
    }
  }

  async activate(view: PerspectiveViewerView) {
    await super.activate(view);
    this.view = view;
    this.dirty = true;
    if (!this.customInitialized) {
      const viewer = this.parentElement;
      const datagrid = this.regular_table;
      await this.refresh_cache();
      const table = await viewer?.getTable(true);
      this.tableSchema = await table.schema();
      viewer.addEventListener("perspective-config-update", () => {
        this.dirty = true;
      });

      this.customInitialized = true;
      datagrid.addStyleListener(this.styleListener.bind(this));
    }
  }
}

customElements.define(
  "perspective-datagrid-json-viewer-plugin",
  PerspectiveDatagridJSONViewerPlugin,
);

void customElements
  .get("perspective-viewer")
  .registerPlugin("perspective-datagrid-json-viewer-plugin");
