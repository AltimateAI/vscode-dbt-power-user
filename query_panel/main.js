import { createApp } from 'vue';
import 'tabulator'; // Exposes Tabulator class
import 'prism'; // Exposes Prism object

const vscode = acquireVsCodeApi();

async function executeCommand(command, config) {
  return await vscode.postMessage({ command, ...config });
}

async function updateConfig(config) {
  return await executeCommand("updateConfig", config);
}

const app = createApp({
  data() {
    return {
      count: 0,
      table: undefined,
      rawCode: "",
      compiledCode: "",
      error: {},
      loading: false,
      limit: 500,
      queryStart: Date.now(),
      queryEnd: undefined,
      timer: undefined
    };
  },
  methods: {
    updateTable(data) {
      this.count = data.rows.length;
      this.table = new Tabulator("#query-results", {
        height: this.tableHeight,
        data: data.rows,
        columns: data.columns,
        layout: "fitDataFill",
      });
    },
    updateError(data) {
      this.error = data.error;
    },
    updateConfig(data) {
      if (data.limit) {
        this.limit = data.limit;
      }
    },
    updateDispatchedCode(raw_stmt, compiled_stmt) {
      this.rawCode = raw_stmt;
      this.compiledCode = compiled_stmt;
    },
    clearData() {
      this.count = 0;
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
    }
  },
  computed: {
    tableHeight() { return this.count * 65 < 455 ? this.count * 65 : 455; },
    hasData() { return this.count > 0; },
    hasError() { return this.error?.data; },
    hasCode() { return this.compiledCode !== ""; },
    isLoading() { return this.loading === true; },
    elapsedTime() { return Math.round((this.queryEnd - this.queryStart) / 100) / 10; },
    queryExecutionInfo() {
      if (this.hasData || this.hasError || this.elapsedTime) {
        return `${this.count} rows in ${this.elapsedTime}s`;
      }
      return "...";
    },
    compiledCodeMarkup() { return Prism.highlight(this.compiledCode, Prism.languages.sql, 'sql'); },
    errorTitle() { return this.error.message?.split(/\r?\n/)[0] ?? "Error"; },
    errorMessage() { return this.error.message?.split(/\r?\n/).slice(1).join(" ") ?? ""; },
    errorData() { return JSON.stringify(this.error, null, 2); },
    errorDataMarkup() { return Prism.highlight(this.errorData, Prism.languages.javascript, 'javascript'); }
  },
  watch: {
    async limit(limit) {
      await updateConfig({ limit });
    }
  },
  mounted() {
    window.addEventListener('message', (event) => {
      switch (event.data.command) {
        case 'renderQuery':
          this.updateTable(event.data);
          this.updateDispatchedCode(event.data.raw_sql, event.data.compiled_sql);
          this.focusPreviewPane();
          this.loading = false;
          this.endTimer();
          break;
        case 'renderLoading':
          this.clearData();
          this.focusPreviewPane();
          this.loading = true;
          this.timeExecution();
          break;
        case 'renderError':
          this.updateError(event.data);
          this.focusPreviewPane();
          this.loading = false;
          this.endTimer();
          break;
        case 'injectConfig':
          this.updateConfig(event.data);
          break;
        case 'resetState':
          this.clearData();
          break;
      }
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount('#app');
