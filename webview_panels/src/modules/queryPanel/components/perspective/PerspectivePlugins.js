/* eslint-disable */

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
      span.style.marginLeft = "5px";
      span.style.color = "var(--primary-color)";
      span.style.width = "30px !important";
      span.style.height = "30px !important";
      span.appendChild(svg);
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
