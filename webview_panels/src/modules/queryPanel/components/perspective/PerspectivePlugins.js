/* eslint-disable */
import { getGlobalTheme } from "./PerspectiveViewer";

function dispatchCustomEvent(eventName, message, columnName, type) {
  const event = new CustomEvent(eventName, {
    detail: { columnName, message, type },
  });
  window.dispatchEvent(event);
}

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

function makeClickEvent(td, metadata) {
  // If string length is greater than 20, truncate and add ellipsis
  if (metadata.value.length > 20) {
    td.textContent = metadata.value.slice(0, 20) + "...";
    td.style.cursor = "pointer";
  }

  const columnName = metadata.column_header;
  if (isJson(metadata.value)) {
    if (!td.querySelector("span")) {
      const span = document.createElement("span");
      const img = document.createElement("img");
      const currentTheme = getGlobalTheme();
      const iconColor = currentTheme === "Pro Light" ? "black" : "white";
      img.src = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2030%2030'%20width='12px'%20fill='${iconColor}'%20height='12px'%3E%3Cpath%20d='M%2025.980469%202.9902344%20A%201.0001%201.0001%200%200%200%2025.869141%203%20L%2020%203%20A%201.0001%201.0001%200%201%200%2020%205%20L%2023.585938%205%20L%2013.292969%2015.292969%20A%201.0001%201.0001%200%201%200%2014.707031%2016.707031%20L%2025%206.4140625%20L%2025%2010%20A%201.0001%201.0001%200%201%200%2027%2010%20L%2027%204.1269531%20A%201.0001%201.0001%200%200%200%2025.980469%202.9902344%20z%20M%206%207%20C%204.9069372%207%204%207.9069372%204%209%20L%204%2024%20C%204%2025.093063%204.9069372%2026%206%2026%20L%2021%2026%20C%2022.093063%2026%2023%2025.093063%2023%2024%20L%2023%2014%20L%2023%2011.421875%20L%2021%2013.421875%20L%2021%2016%20L%2021%2024%20L%206%2024%20L%206%209%20L%2014%209%20L%2016%209%20L%2016.578125%209%20L%2018.578125%207%20L%2016%207%20L%2014%207%20L%206%207%20z'%3E%3C/path%3E%3C/svg%3E`;
      span.style.marginLeft = "5px";
      span.style.color = "var(--primary-color)";
      span.appendChild(img);
      td.appendChild(span);
    }
    td.style.cursor = "pointer";
    td.onclick = () => {
      dispatchCustomEvent(
        "string-json-viewer",
        metadata.value,
        columnName,
        "json"
      );
    };
  } else if (metadata.value.length > 20) {
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

class CustomDatagridPlugin extends customElements.get(
  "perspective-viewer-datagrid"
) {
  get name() {
    return "Custom Datagrid";
  }

  async styleListener() {
    const viewer = this.parentElement;
    const datagrid = this.regular_table;
    if (this._dirty) {
      await this.refresh_cache();
    }

    for (const td of datagrid.querySelectorAll("td")) {
      const metadata = datagrid.getMeta(td);

      let type;
      if (metadata.x >= 0) {
        const column_path = this._column_paths[metadata.x];
        const column_path_parts = column_path.split("|");
        type = this._schema[column_path_parts[column_path_parts.length - 1]];
      } else {
        const column_path = this._group_by[metadata.row_header_x - 1];
        type = this._table_schema[column_path];
      }

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
