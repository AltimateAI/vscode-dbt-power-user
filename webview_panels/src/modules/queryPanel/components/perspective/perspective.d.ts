import { HTMLPerspectiveViewerDatagridPluginElement as FinosHTMLPerspectiveViewerDatagridPluginElement } from "@finos/perspective-viewer-datagrid";
import { HTMLPerspectiveViewerElement } from "@finos/perspective-viewer";
import type { Schema } from "@finos/perspective";

declare global {
  interface TableCellMetadata {
    value: string;
    column_header: string;
    x: number;
    row_header_x: number;
  }

  interface PerspectiveViewerView {
    column_paths: () => Promise<string[]>;
    get_config: () => Promise<{ group_by: string[] }>;
    schema: () => Promise<Schema>;
  }

  interface CustomElementRegistry {
    get(
      tagName: "perspective-viewer-datagrid",
    ): HTMLPerspectiveViewerDatagridPluginElement;
  }

  declare class HTMLPerspectiveViewerDatagridPluginElement extends FinosHTMLPerspectiveViewerDatagridPluginElement {
    constructor();
    activate(view: PerspectiveViewerView): Promise<void>;
    regular_table: PerspectiveViewerRegularTableElement;
    parentElement: HTMLPerspectiveViewerElement;
  }

  interface PerspectiveViewerRegularTableElement extends HTMLElement {
    table_model: unknown;
    addStyleListener: (listener: () => void) => void;
    getMeta: (td: HTMLElement) => TableCellMetadata;
  }
}
