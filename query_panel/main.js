import { createApp } from "vue";
import "tabulator"; // Exposes Tabulator class
import "prism"; // Exposes Prism object
import perspective from "perspective";
import "perspective-viewer";

const vscode = acquireVsCodeApi();

async function executeCommand(command, config) {
  return await vscode.postMessage({ command, ...config });
}

async function updateConfig(config) {
  return await executeCommand("updateConfig", config);
}

const DEFAULT_HEIGHT = 455;

class Grid {
  constructor() {}

  async init() {
    this.worker = perspective.worker({
      types: {
        integer: {
          format: {
            useGrouping: false,
          },
        },
        float: {
          format: {
            maximumFractionDigits: 20,
            minimumFractionDigits: 0,
            useGrouping: false,
          },
        },
      },
    });
    this.elem = document.querySelector("perspective-viewer");
  }

  mapType(agateType) {
    switch (agateType) {
      case "Text":
        return "string";
      case "Integer":
        return "float";
      // case "Boolean":
      //   return "boolean"; // TODO: uncomment when material icons are added
      // case "Date":
      //   return "date";
      // case "DateTime":
      //   return "datetime";
      case "Number":
        return "float";
      default:
        // treat any unknown types as string
        return "string";
    }
  }

  async load(result) {
    const schema = {};
    for (let i = 0; i < result.columnNames.length; i++) {
      schema[result.columnNames[i]] = this.mapType(result.columnTypes[i]);
    }
    const table = await this.worker.table(schema);
    await table.replace(JSON.parse(JSON.stringify(result.rows)));
    await this.elem.load(table);
    await this.elem.restore({
      columns: [], // reset columns
      settings: false,
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
      data: undefined,
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
      isDarkMode: false,
      clickTimer: null,
      table: undefined,
      isPerspective: true,
      summary: undefined,
      previousSummary: undefined,
      previousCode: undefined,
      aiEnabled: false,
    };
  },
  methods: {
    togglePerspective() {
      this.isPerspective = !this.isPerspective;
      updateConfig({ enableNewQueryPanel: this.isPerspective });
      this.updateTable(this.data);
      setTimeout(() => {
        document.querySelector("#panel-manager").activeid = "tab-1";
      }, 100);
    },
    // Converts the provided data to CSV format.
    dataToCsv(columns, rows) {
      if (!rows || rows.length === 0) {
        console.error("No data available to convert to CSV");
        return "";
      }
      const replacer = (key, value) => (value === null ? "" : value);
      const csv = [
        columns.join(","),
        ...rows.map((row) =>
          columns
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
      const data = this.data;
      try {
        if (!data || data.rows.length === 0) {
          console.error("No data available for downloading.");
          return;
        }
        const csvContent = this.dataToCsv(data.columnNames, data.rows);
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `power_user_data_${new Date().toISOString()}.csv`; // Filename with a timestamp
        a.click();
      } catch (error) {
        // Log error for debugging
        console.error("Failed to download CSV:", error);
        executeCommand("error", {
          text: "Unable to download data as CSV. " + error.message,
        });
      }
    },
    copyTextToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
    // Copies the table's data to the clipboard in CSV format.
    async copyResultsToClipboard() {
      try {
        const data = this.data;
        const csv = this.dataToCsv(data.columnNames, data.rows);
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
      this.count = data.rows.length;
      if (!this.isPerspective) {
        this.table = new Tabulator("#query-results", {
          height: this.tableHeight,
          data: data.rows,
          columns: data.columnNames.map((def) => ({ title: def, field: def })),
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
      } else {
        this.table?.destroy();
        this.table = undefined;
        grid.load(data);
      }
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
      this.isPerspective = data.enableNewQueryPanel;
      this.isDarkMode = data.darkMode;
      this.aiEnabled = data.aiEnabled || false;
    },
    updateSummary(data) {
      if (data.summary) {
        // this.summary = data.summary;
        console.log(data);
        // If the query we're getting summary for is different from the one
        // we're currently displaying, clear the data as it will create confusion.
        let newCompiledCode = data.compiled_sql;
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
          const result = queryRegex.exec(data.compiled_sql);
          newCompiledCode = result[1];
        } catch (err) {}

        if (this.hasCode && newCompiledCode !== this.compiledCode) {
          this.clearData();
        }
        this.summary = data.summary;
        this.compiledCode = newCompiledCode;
      }
    },
    focusSummaryTab() {
      document.querySelector("#panel-manager").activeid = "tab-6";
    },
    updateDispatchedCode(raw_stmt, compiled_stmt) {
      this.rawCode = raw_stmt;
      let newCompiledCode = compiled_stmt;
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
        newCompiledCode = result[1].trim();
      } catch (err) {}
      if (newCompiledCode !== this.previousCode && this.previousSummary) {
        this.summary = undefined;
        this.previousCode = undefined;
        this.previousSummary = undefined;
      }
      this.compiledCode = newCompiledCode;
      this.summary = this.previousSummary;
    },
    clearData() {
      this.previousCode = this.compiledCode;
      this.previousSummary = this.summary;
      this.count = 0;
      this.data = undefined;
      this.table = undefined;
      this.rawCode = "";
      this.compiledCode = "";
      this.error = {};
      this.queryStart = Date.now();
      this.queryEnd = undefined;
      this.timer = undefined;
    },
    focusPreviewPane() {
      document.querySelector("#panel-manager").activeid = "tab-1";
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
      if (!this.table) {
        return;
      }
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
        display: "inline-block",
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
    onGetSummary() {
      if (!this.hasCode) {
        // This will never be the case but adding for type safety
        return;
      }
      executeCommand("getSummary", {
        compiledSql: this.compiledCode,
      });
    },
    onFeedback() {
      const prevTab = document.querySelector("#panel-manager").activeid;
      executeCommand("openUrl", {
        url: "https://docs.google.com/forms/d/19wX5b5_xXL6J_Q_GpuWzYddIXbvLxuarv09Y3VRk_EU/viewform",
      });
      setTimeout(() => {
        document.querySelector("#panel-manager").activeid = prevTab;
      }, 100);
    },
  },
  computed: {
    tableHeight() {
      return this.count * 65 < this.windowHeight
        ? this.count * 65
        : this.windowHeight;
    },
    hasData() {
      return !!this.data;
    },
    hasSummary() {
      return !!this.summary;
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
    isQueryLimitValid() {
      return this.limit <= 0;
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
    this.clickTimer = setInterval(() => {
      const shadowRoot =
        document.querySelector("perspective-viewer")?.shadowRoot;
      if (!shadowRoot) {
        return;
      }
      const exportButton = shadowRoot.getElementById("export");
      if (!exportButton) {
        return;
      }
      exportButton.removeEventListener("click", this.downloadAsCSV);
      exportButton.addEventListener("click", this.downloadAsCSV);
    }, 1000);
    window.addEventListener("message", (event) => {
      switch (event.data.command) {
        case "renderQuery":
          this.data = event.data;
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
          if (this.loading) {
            break;
          }
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
        case "renderSummary":
          this.updateSummary(event.data);
          this.focusSummaryTab();
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
    clearInterval(this.clickTimer);
  },
});

const PreviewIcon = {
  template: `
<div class="tooltip-container">
  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6.5" r="6" fill="#FFCE73" />
    <path
        d="M6.0013 7.33073C6.46154 7.33073 6.83464 6.95763 6.83464 6.4974C6.83464 6.03716 6.46154 5.66406 6.0013 5.66406C5.54106 5.66406 5.16797 6.03716 5.16797 6.4974C5.16797 6.95763 5.54106 7.33073 6.0013 7.33073Z"
        fill="#082247" />
    <path
        d="M10.1423 6.3533C9.47099 4.65934 7.82261 3.55656 6.00066 3.58248C4.17871 3.55656 2.53033 4.65934 1.85899 6.3533C1.82565 6.44767 1.82565 6.55062 1.85899 6.64497C2.53033 8.33892 4.17871 9.4417 6.00066 9.41581C7.82261 9.4417 9.47099 8.33892 10.1423 6.64497C10.1757 6.55059 10.1757 6.44767 10.1423 6.3533ZM6.00157 8.16581H6.00066C5.08017 8.16581 4.33399 7.41961 4.33399 6.49914C4.33399 5.57866 5.08017 4.83248 6.00066 4.83248C6.92114 4.83248 7.66732 5.57866 7.66732 6.49914C7.66758 7.41935 6.92181 8.16556 6.00157 8.16581Z"
        fill="#082247" />
  </svg>
  <div class="tooltip-text">Preview Feature</div>
</div>
`,
};
app.component("PreviewIcon", PreviewIcon);

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
