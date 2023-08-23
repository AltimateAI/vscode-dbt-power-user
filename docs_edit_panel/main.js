import { createApp } from "vue";
const vscode = acquireVsCodeApi();

async function executeCommand(command, args) {
  return await vscode.postMessage({ command, ...args });
}

const app = createApp({
  data() {
    return {
      pending_req: 1,
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
    showRating(columName) {
      this.$refs["rating_" + columName][0].style.display = "grid";
    },
    async generateDocsForModel() {
      this.pending_req += 1;
      await executeCommand("generateDocsForModel");
    },
    async generateDocsForColumn(columnName) {
      this.pending_req += 1;
      await executeCommand("generateDocsForColumn", { columnName });
    },
    async fetchMetadataFromDatabase() {
      this.pending_req += 1;
      await executeCommand("fetchMetadataFromDatabase");
    },
  },
  computed: {
    isLoading() {
      return this.pending_req > 0;
    },
    hasData() {
      return this.modelName !== "";
    },
  },
  mounted() {
    window.addEventListener("message", (event) => {
      console.log(event);
      const { command } = event?.data;
      switch (command) {
        case "renderDocumentation":
          this.updateDocs(event.data.docs);
        case "renderError":
          // do whatever needs to be done in case of something going wrong
          if (this.pending_req > 0) {
            this.pending_req -= 1;
          }
          break;
        default:
          break;
      }
    });
  },
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
