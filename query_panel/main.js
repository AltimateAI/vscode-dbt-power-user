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

const DEFAULT_HEIGHT = 455;

const app = createApp({
  data() {
    return {
      count: 0,
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
        headerSortElement: function(column, dir){
          //dir - current sort direction ("asc", "desc", "none")
          switch(dir){
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
    },
    updateDispatchedCode(raw_stmt, compiled_stmt) {
      this.rawCode = raw_stmt;

      try {
        const queryRegex = new RegExp(this.queryTemplate
          .replace(/\(/g, "\\(")
          .replace(/\)/g, "\\)")
          .replace(/\*/g, "\\*")
          .replace("{query}", "([\\w\\W]+)")
          .replace("{limit}", this.limit.toString()), 'gm');
        const result = queryRegex.exec(compiled_stmt);
        this.compiledCode = result[1];
        return;
      } catch (err) {}
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
      };
    },  
  },
  computed: {
    tableHeight() {
      return this.count * 65 < this.windowHeight
        ? this.count * 65
        : this.windowHeight;
    },
    hasData() { return this.count > 0; },
    hasError() { return this.error?.data; },
    hasCode() { return this.compiledCode !== ""; },
    isLoading() { return this.loading === true; },
    elapsedTime() { 
      const elapsedTime = Math.round((this.queryEnd - this.queryStart) / 100) / 10
      return isNaN(elapsedTime) ? 0 : elapsedTime; 
    },
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
    },
    scale(newVal) {
      this.$nextTick(() => {
        this.scale = newVal;
      });
    },
  },
  mounted() {
    window.addEventListener('message', (event) => {
      console.log(event);
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
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount('#app');
