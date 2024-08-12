/* eslint-disable */
import { getGlobalTheme } from "./PerspectiveViewer";

// Declare type
type TableCellMetadata = {
  value: string;
  column_header: string;
  x: number;
  row_header_x: number;
};

// Dispatches a custom event with the given event name and message
function dispatchCustomEvent(
  eventName: string,
  message: any,
  columnName: any,
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
function appendImage(td: HTMLTableCellElement) {
  if (!td.querySelector("span")) {
    const div = document.createElement("div");
    const text = document.createElement("div");

    // Setting text content to a div element to avoid base perspective viewer styling
    text.textContent = td.textContent;
    td.textContent = "";

    // Adding svg icon to the span element
    const span = document.createElement("span");
    const img = document.createElement("img");

    // Getting the current theme and setting the icon color
    const svg = document.createElement("svg");
    const path = document.createElement("path");
    path.setAttribute(
      "d",
      "M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"
    );
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("viewBox", "0 0 30 30");
    svg.setAttribute("width", "30px");
    svg.setAttribute("height", "30px");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.appendChild(path);

    // Styling the span element
    span.style.marginLeft = "5px";
    span.style.color = "var(--primary-color)";

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
    span.appendChild(svg);
    div.appendChild(text);
    div.appendChild(span);
    td.appendChild(div);
  }
}

// Adds click event to the td element
function makeClickEvent(td: HTMLTableCellElement, metadata: TableCellMetadata) {
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
class CustomDatagridPlugin extends customElements.get(
  "perspective-viewer-datagrid"
) {
  get name() {
    return "Custom Datagrid";
  }

  getType(metadata: TableCellMetadata) {
    // This function returns the data type of the cell
    if (metadata.x >= 0) {
      const column_path = this._column_paths[metadata.x];
      const column_path_parts = column_path.split("|");
      return this._schema[column_path_parts[column_path_parts.length - 1]];
    }
    const column_path = this._group_by[metadata.row_header_x - 1];
    return this._table_schema[column_path];
  }

  async styleListener() {
    const viewer = this.parentElement;
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
    this._column_paths = await view.column_paths();
    this._group_by = await view.get_config()["group_by"];
    this._schema = await view.schema();
    this._dirty = false;
  }

  async activate(view) {
    await super.activate(view);
    this._view = view;
    this._dirty = true;
    if (!this._custom_initialized) {
      const viewer = this.parentElement;
      const datagrid = this.regular_table;
      this._max = -Infinity;
      await this.refresh_cache(view);
      const table = await viewer.getTable(true);
      this._table_schema = await table.schema();
      viewer.addEventListener("perspective-config-update", async () => {
        this._max = -Infinity;
        this._dirty = true;
      });

      this._custom_initialized = true;
      datagrid.addStyleListener(this.styleListener.bind(this));
    }
  }
}

customElements.define(
  "perspective-viewer-custom-datagrid",
  CustomDatagridPlugin
);

void customElements
  .get("perspective-viewer")
  .registerPlugin("perspective-viewer-custom-datagrid");
