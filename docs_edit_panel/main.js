import { createApp } from "vue";
const vscode = acquireVsCodeApi();

async function executeCommand(command, args) {
  return await vscode.postMessage({ command, ...args });
}

const app = createApp({
  data() {
    return {
      modelName: "",
      modelDocumentation: "",
      columns: [],
      columnsFromDatabase: [],
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
      await executeCommand("generateDocsForColumn", { columnName });
    },
    async fetchMetadataFromDatabase() {
      await executeCommand("fetchMetadataFromDatabase");
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
  },
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
