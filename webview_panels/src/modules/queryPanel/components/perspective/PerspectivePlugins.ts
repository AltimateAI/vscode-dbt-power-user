/* eslint-disable no-underscore-dangle */
import OpenIcon from "./openIcon.svg?raw";
import type { Schema } from "@finos/perspective";

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
    // Styling the span element
    span.classList.add("open-icon");

    // Styling the div element
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";

    // Styling the text element
    text.style.overflow = "hidden";
    text.style.textOverflow = "ellipsis";
    text.style.whiteSpace = "nowrap";
    text.style.width = "100px";

    // Appending the image to the span element and the text to the div element
    // Appending the div element to the td element
    span.innerHTML = OpenIcon;
    div.appendChild(text);
    div.appendChild(span);
    td.appendChild(div);
  }
}

// Adds click event to the td element
function makeClickEvent(
  tdArg: HTMLTableCellElement,
  metadata: TableCellMetadata,
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
        "json",
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
        "string",
      );
    };
  }
}

// Custom perspective plugin to add click event to the td element
class CustomDatagridPlugin extends (customElements.get(
  "perspective-viewer-datagrid",
) as unknown as typeof HTMLPerspectiveViewerDatagridPluginElement) {
  private readonly pluginName = "Custom Datagrid";
  private _view?: PerspectiveViewerView;
  private _dirty?: boolean;
  private _custom_initialized?: boolean;
  private _table_schema?: Schema;
  private _schema?: Schema;
  private _column_paths?: string[];
  private _group_by?: string[];

  get name() {
    return this.pluginName;
  }

  getType(metadata: TableCellMetadata) {
    if (!this._column_paths) {
      return;
    }
    // This function returns the data type of the cell
    if (this._schema && metadata.x >= 0) {
      const columnPath = this._column_paths[metadata.x];
      const columnPathParts = columnPath.split("|");
      return this._schema[columnPathParts[columnPathParts.length - 1]];
    }
    const columnPath = this._group_by?.[metadata.row_header_x - 1];
    return columnPath ? this._table_schema?.[columnPath] : undefined;
  }

  async styleListener() {
    const datagrid = this.regular_table;
    if (this._dirty) {
      await this.refresh_cache();
    }

    for (const td of datagrid.querySelectorAll("td")) {
      const metadata = datagrid.getMeta(td);
      const type = this.getType(metadata);

      if (type === "string") {
        makeClickEvent(td, metadata);
      }
    }
  }

  async refresh_cache() {
    const view = this._view;
    if (!view) {
      return;
    }
    this._column_paths = await view.column_paths();
    this._group_by = (await view.get_config()).group_by;
    this._schema = await view.schema();
    this._dirty = false;
  }

  async activate(view: PerspectiveViewerView) {
    await super.activate(view);
    this._view = view;
    this._dirty = true;
    if (!this._custom_initialized) {
      const viewer = this.parentElement;
      const datagrid = this.regular_table;
      await this.refresh_cache();
      const table = await viewer?.getTable(true);
      this._table_schema = await table.schema();
      viewer.addEventListener("perspective-config-update", () => {
        this._dirty = true;
      });

      this._custom_initialized = true;
      datagrid.addStyleListener(this.styleListener.bind(this));
    }
  }
}

customElements.define(
  "perspective-viewer-custom-datagrid",
  CustomDatagridPlugin,
);

void customElements
  .get("perspective-viewer")
  .registerPlugin("perspective-viewer-custom-datagrid");
