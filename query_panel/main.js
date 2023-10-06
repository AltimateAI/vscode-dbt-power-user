import { createApp } from "vue";
import "tabulator"; // Exposes Tabulator class
import "prism"; // Exposes Prism object

const vscode = acquireVsCodeApi();

async function executeCommand(command, config) {
  return await vscode.postMessage({ command, ...config });
}

async function updateConfig(config) {
  return await executeCommand("updateConfig", config);
}

const DEFAULT_HEIGHT = 455;

import perspective from "perspective";
import "perspective-viewer";

class Grid {
  constructor() {}

  async init() {
    this.worker = perspective.worker();
    this.elem = document.querySelector("perspective-viewer");
  }

  async load(rows) {
    const table = await this.worker.table(rows);
    await this.elem.load(table);
    await this.elem.restore({
      settings: true,
      title: "query result",
      plugin_config: { editable: false },
    });
  }
}

const grid = new Grid();

window.addEventListener("DOMContentLoaded", async function () {
  grid.init();
});

const app = createApp({
  data() {
    return {
      count: 0,
      data: null,
      table: undefined,
      rawCode: "",
      compiledCode: "",
      error: {},
      loading: false,
      limit: undefined,
      queryTemplate: undefined,
      queryStart: Date.now(),
      queryEnd: undefined,
      timer: undefined,
      resizeTimer: undefined,
      windowHeight: DEFAULT_HEIGHT,
      scale: 1,
      clipboardText: "",
      enableNewQueryPanel: true,
      isDarkMode: false,
    };
  },
  methods: {
    // Converts the provided data to CSV format.
    dataToCsv(data) {
      if (!data || data.length === 0) {
        console.error("No data available to convert to CSV");
        return "";
      }
      const replacer = (key, value) => (value === null ? "" : value);
      const header = Object.keys(data[0]);
      const csv = [
        header.join(","),
        ...data.map((row) =>
          header
            .map((fieldName) => {
              let fieldData = row[fieldName];
              if (fieldData && typeof fieldData === "string") {
                fieldData = fieldData.replace(/"/g, '""'); // Escape double quotes
                return `"${fieldData}"`; // Wrap in double quotes
              }
              return JSON.stringify(fieldData, replacer);
            })
            .join(","),
        ),
      ].join("\r\n");
      return csv;
    },
    downloadAsCSV() {
      const data = this.table.getData(); // Get the data the same way you do for copying
      try {
        if (!data || data.length === 0) {
          console.error("No data available for downloading.");
          return;
        }
        const csvContent = this.dataToCsv(data);
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `power_user_data_${new Date().toISOString()}.csv`; // Filename with a timestamp
        a.click();
      } catch (error) {
        // Show error message
        vscode.window.showErrorMessage(
          "Unable to download data as CSV. " + error.message,
        );
        // Log error for debugging
        console.error("Failed to download CSV:", error);
      }
    },
    copyTextToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
    // Copies the table's data to the clipboard in CSV format.
    async copyResultsToClipboard() {
      try {
        const data = this.table.getData();
        const csv = this.dataToCsv(data);
        this.copyTextToClipboard(csv);
      } catch (error) {
        console.error("Error copying results to clipboard:", error);
        // Show error message
        vscode.window.showErrorMessage(
          "Unable to convert data to CSV. " + error.message,
        );
      }
    },
    updateTable(data) {
      console.log(data);
      this.count = data.rows.length;
      grid.load(data.rows);
      setTimeout(() => {
        const shadowRoot =
          document.querySelector("perspective-viewer").shadowRoot;
        const children = shadowRoot.children;
        console.log(
          "export -> ",
          children,
          children["app_panel"],
          children[10],
          (shadowRoot.getElementById("export").style = "display: block;"),
        );
      }, 1000);
      this.table = new Tabulator("#query-results", {
        height: this.tableHeight,
        data: data.rows,
        columns: data.columns,
        layout: "fitDataFill",
        headerSortElement: function (column, dir) {
          //dir - current sort direction ("asc", "desc", "none")
          switch (dir) {
            case "asc":
              return "<p>&#9660;</p>";
            case "desc":
              return "<p>&#9650;</p>";
            default:
              return "<p>&#9661;</p>";
          }
        },
      });
    },
    updateError(data) {
      this.error = data.error;
    },
    updateConfig(data) {
      if (data.limit) {
        this.limit = data.limit;
      }
      if (data.queryTemplate) {
        this.queryTemplate = data.queryTemplate;
      }
      if (data.scale) {
        this.scale = data.scale;
      }
      this.enableNewQueryPanel = data.enableNewQueryPanel;
      this.isDarkMode = data.darkMode;
    },
    updateDispatchedCode(raw_stmt, compiled_stmt) {
      this.rawCode = raw_stmt;

      try {
        const queryRegex = new RegExp(
          this.queryTemplate
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)")
            .replace(/\*/g, "\\*")
            .replace("{query}", "([\\w\\W]+)")
            .replace("{limit}", this.limit.toString()),
          "gm",
        );
        const result = queryRegex.exec(compiled_stmt);
        this.compiledCode = result[1];
        return;
      } catch (err) {}
      this.compiledCode = compiled_stmt;
    },
    clearData() {
      this.count = 0;
      this.cacheData = null;
      this.table = undefined;
      this.rawCode = "";
      this.compiledCode = "";
      this.error = {};
      this.queryStart = Date.now();
      this.queryEnd = undefined;
      this.timer = undefined;
    },
    focusPreviewPane() {
      const panelManager = document.querySelector("#panel-manager");
      if (["tab-1", "tab-2"].includes(panelManager.activeid)) {
        return;
      }
      panelManager.activeid = this.enableNewQueryPanel ? "tab-2" : "tab-1";
    },
    timeExecution() {
      this.timer = setInterval(() => {
        this.queryEnd = Date.now();
      }, 100);
    },
    endTimer() {
      clearTimeout(this.timer);
    },
    setTableHeight() {
      this.table.setHeight(this.windowHeight);
    },
    handleResize(event) {
      const currentHeight = window.innerHeight;
      if (this.windowHeight !== currentHeight) {
        this.windowHeight = currentHeight;
        if (currentHeight < DEFAULT_HEIGHT) {
          this.windowHeight = DEFAULT_HEIGHT;
        }
        cancelAnimationFrame(this.resizeTimer);
        this.resizeTimer = requestAnimationFrame(this.setTableHeight);
      }
    },
    getTableStyles() {
      return {
        fontSize: `${this.scale}em`,
        lineHeight: `${this.scale}`,
        display: "block",
      };
    },
    getPerspectiveStyles() {
      return {
        width: "100%",
        height: "100%",
        minHeight: "400px",
        display: "block",
      };
    },
    getPerspectiveTheme() {
      return this.isDarkMode ? "Pro Dark" : "Pro Light";
    },
    onLegacyPanel() {
      updateConfig({ enableNewQueryPanel: false });
    },
    onNewPanel() {
      updateConfig({ enableNewQueryPanel: true });
    },
  },
  computed: {
    tableHeight() {
      return this.count * 65 < this.windowHeight
        ? this.count * 65
        : this.windowHeight;
    },
    hasData() {
      return this.count > 0;
    },
    hasError() {
      return this.error?.data;
    },
    hasCode() {
      return this.compiledCode !== "";
    },
    isLoading() {
      return this.loading === true;
    },
    elapsedTime() {
      const elapsedTime =
        Math.round((this.queryEnd - this.queryStart) / 100) / 10;
      return isNaN(elapsedTime) ? 0 : elapsedTime;
    },
    queryExecutionInfo() {
      if (this.hasData || this.hasError || this.elapsedTime) {
        return `${this.count} rows in ${this.elapsedTime}s`;
      }
      return "...";
    },
    compiledCodeMarkup() {
      return Prism.highlight(this.compiledCode, Prism.languages.sql, "sql");
    },
    errorTitle() {
      return this.error.message?.split(/\r?\n/)[0] ?? "Error";
    },
    errorMessage() {
      return this.error.message?.split(/\r?\n/).slice(1).join(" ") ?? "";
    },
    errorData() {
      return JSON.stringify(this.error, null, 2);
    },
    errorDataMarkup() {
      return Prism.highlight(
        this.errorData,
        Prism.languages.javascript,
        "javascript",
      );
    },
  },
  watch: {
    async limit(limit) {
      await updateConfig({ limit });
    },
    async scale(scale) {
      await updateConfig({ scale });
    },
  },
  mounted() {
    window.addEventListener("message", (event) => {
      console.log(event);
      switch (event.data.command) {
        case "renderQuery":
          this.cacheData = event.data;
          this.updateTable(event.data);
          this.updateDispatchedCode(
            event.data.raw_sql,
            event.data.compiled_sql,
          );
          this.focusPreviewPane();
          this.loading = false;
          this.endTimer();
          break;
        case "renderLoading":
          this.clearData();
          this.focusPreviewPane();
          this.loading = true;
          this.timeExecution();
          break;
        case "renderError":
          this.updateError(event.data);
          this.focusPreviewPane();
          this.loading = false;
          this.endTimer();
          break;
        case "injectConfig":
          this.updateConfig(event.data);
          break;
        case "resetState":
          this.clearData();
          break;
      }
    });
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
