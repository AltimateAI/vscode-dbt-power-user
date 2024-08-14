/* eslint-disable no-underscore-dangle */
import { panelLogger } from "@modules/logger";
import OpenIcon from "./openIcon.svg?raw";
import type { Schema } from "@finos/perspective";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

// Dispatches a custom event with the given event name and message
function dispatchCustomEvent(
  eventName: string,
  message: string,
  columnName: string,
  type: string
) {
  const event = new CustomEvent(eventName, {
    detail: { columnName, message, type },
  });
  window.dispatchEvent(event);
}

// Checks if the given string is a valid JSON
const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Appends an image to the td element
function appendImage(tdArg: HTMLTableCellElement) {
  const td = tdArg;
  if (!td.querySelector("span")) {
    const div = document.createElement("div");
    const text = document.createElement("div");

    // Setting text content to a div element to avoid base perspective viewer styling
    text.textContent = td.textContent;
    td.textContent = "";

    // Adding svg icon to the span element
    const span = document.createElement("span");

    // Adding class to the elements
    span.classList.add("open-icon");
    div.classList.add("clickable-cell-div");
    text.classList.add("clickable-cell-text");

    // Appending the image to the span element and the text to the div element
    // Appending the div element to the td element
    span.innerHTML = OpenIcon;
    span.title = "Click to view complete value";
    div.appendChild(text);
    div.appendChild(span);
    td.appendChild(div);
  }
}

// Adds click event to the td element
function makeClickEvent(
  tdArg: HTMLTableCellElement,
  metadata: TableCellMetadata
) {
  const td = tdArg;
  // If string length is greater than 20, truncate and add ellipsis
  if (metadata.value.length > 20) {
    // td.textContent = metadata.value.slice(0, 20) + "...";
    td.style.cursor = "pointer";
  }

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
        "json"
      );
    };
    return;
  }

  if (metadata.value.length > 20) {
    appendImage(td);
    // else if string is greater than 20, add click event to view full string
    td.onclick = () => {
      dispatchCustomEvent(
        "string-json-viewer",
        metadata.value,
        columnName,
        "string"
      );
    };
  }
}

// Custom perspective plugin to add click event to the td element
class PerspectiveDatagridJSONViewerPlugin extends (customElements.get(
  "perspective-viewer-datagrid"
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
  PerspectiveDatagridJSONViewerPlugin
);

void customElements
  .get("perspective-viewer")
  .registerPlugin("perspective-datagrid-json-viewer-plugin");
