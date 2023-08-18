import { createApp } from "vue";
const vscode = acquireVsCodeApi();

async function executeCommand(command, config) {
  return await vscode.postMessage({ command, ...config });
}

const app = createApp({
  data() {
    return {
      modelName: "",
      modelDocumentation: "",
      columns: [],
    };
  },
  methods: {
    updateDocs(docs) {
      this.modelName = docs.modelName;
      this.modelDocumentation = docs.modelDocumentation;
      this.columns = docs.columns;
    },
    async generateDocsForModel() {
      await executeCommand("generateDocsForModel");
    },
    async generateDocsForColumn(columnName) {
      await executeCommand("generateDocsForColumn", columnName);
    },
  },
  mounted() {
    window.addEventListener("message", (event) => {
      console.log(event);
      const { command } = event?.data;
      if (command === "renderDocumentation") {
        this.updateDocs(event.data.docs);
      }
    });
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
