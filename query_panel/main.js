import { createApp } from "vue";
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
      isDarkMode: false,
      clickTimer: null,
    };
  },
  methods: {
    // Converts the provided data to CSV format.
    dataToCsv(columns, rows) {
      if (!rows || rows.length === 0) {
        console.error("No data available to convert to CSV");
        return "";
      }
      const replacer = (key, value) => (value === null ? "" : value);
      const csv = [
        columns.map((c) => c.title).join(","),
        ...rows.map((row) =>
          columns
            .map((c) => {
              const fieldName = c.field;
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
      const data = this.cacheData;
      try {
        if (!data || data.length === 0) {
          console.error("No data available for downloading.");
          return;
        }
        const csvContent = this.dataToCsv(data.columns, data.rows);
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
    updateTable(data) {
      this.count = data.rows.length;
      grid.load(data.rows);
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
    onFeedback() {
      const prevTab = document.querySelector("#panel-manager").activeid;
      executeCommand("openUrl", {
        url: "https://docs.google.com/forms/d/19wX5b5_xXL6J_Q_GpuWzYddIXbvLxuarv09Y3VRk_EU/edit",
      });
      setTimeout(() => {
        document.querySelector("#panel-manager").activeid = prevTab;
      }, 100);
    },
  },
  computed: {
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
    this.clickTimer = setInterval(() => {
      const shadowRoot =
        document.querySelector("perspective-viewer").shadowRoot;
      const exportButton = shadowRoot.getElementById("export");
      if (!exportButton) {
        return;
      }
      exportButton.removeEventListener("click", this.downloadAsCSV);
      exportButton.addEventListener("click", this.downloadAsCSV);
    }, 1000);
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
  },
  unmounted() {},
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.clickTimer);
  },
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
