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
    const currentTheme = getGlobalTheme();
    const iconColor = currentTheme === "dark" ? "white" : "black";
    img.src = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2030%2030'%20width='12px'%20fill='${iconColor}'%20height='12px'%3E%3Cpath%20d='M%2025.980469%202.9902344%20A%201.0001%201.0001%200%200%200%2025.869141%203%20L%2020%203%20A%201.0001%201.0001%200%201%200%2020%205%20L%2023.585938%205%20L%2013.292969%2015.292969%20A%201.0001%201.0001%200%201%200%2014.707031%2016.707031%20L%2025%206.4140625%20L%2025%2010%20A%201.0001%201.0001%200%201%200%2027%2010%20L%2027%204.1269531%20A%201.0001%201.0001%200%200%200%2025.980469%202.9902344%20z%20M%206%207%20C%204.9069372%207%204%207.9069372%204%209%20L%204%2024%20C%204%2025.093063%204.9069372%2026%206%2026%20L%2021%2026%20C%2022.093063%2026%2023%2025.093063%2023%2024%20L%2023%2014%20L%2023%2011.421875%20L%2021%2013.421875%20L%2021%2016%20L%2021%2024%20L%206%2024%20L%206%209%20L%2014%209%20L%2016%209%20L%2016.578125%209%20L%2018.578125%207%20L%2016%207%20L%2014%207%20L%206%207%20z'%3E%3C/path%3E%3C/svg%3E`;

    // Styling the image element
    img.style.paddingTop = "5px";

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
    span.appendChild(img);
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
