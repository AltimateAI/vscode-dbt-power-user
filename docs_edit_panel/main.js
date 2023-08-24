import { createApp } from "vue";
const vscode = acquireVsCodeApi();

async function executeCommand(command, args) {
  return await vscode.postMessage({ command, ...args });
}

const app = createApp({
  data() {
    return {
      name: "",
      description: "",
      generated: false,
      columns: [],
      aiEnabled: false,
      patchPath: "",
      pathPathExists: false,
      patchPaths: [],
    };
  },
  methods: {
    updateDocs(docs) {
      this.name = docs?.name || "";
      this.description = docs?.description || "";
      this.generated = docs?.generated || false;
      this.columns = docs?.columns || [];
      this.aiEnabled = docs?.aiEnabled || false;
      this.patchPath = docs?.patchPath || "";
      this.pathPathExists = docs?.pathPathExists || false;
      this.patchPaths = docs?.patchPaths || [];
    },
    toggleRating(ref) {
      this.$refs[ref][0].toggle();
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
    async saveDocumentation() {
      await executeCommand(
        "saveDocumentation",
        JSON.parse(
          JSON.stringify({
            patchPath: this.patchPath,
            name: this.name,
            description: this.description,
            columns: this.columns,
          }),
        ),
      );
    },
  },
  computed: {
    isLoading() {
      return this.pending_req > 0;
    },
    hasData() {
      return this.name !== "";
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

Comment = {
  props: ["data"],
  data() {
    return {
      isActive: false,
      comment: "",
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    async sendFeedback(rating) {
      await executeCommand("sendFeedback", {
        data: {
          column: this.data.hasOwnProperty("name") ? this.data.name : undefined,
          description: this.data.description,
          model: this.modelname,
        },
        rating,
        comment: this.comment,
      });
    },
  },
  template: `
    <div class="rating" v-show="isActive">
      <vscode-text-area
        v-model="comment"
        placeholder="Tell us what you think about the AI generated documentation"
        resize="vertical"
        rows="5">
        <h3>Rate the generated documentation</h3>
      </vscode-text-area>
      <div class="column-actions">
        <vscode-button @click="sendFeedback('good')">
          <span slot="start" class="codicon codicon-thumbsup"></span>
        </vscode-button>
        <vscode-button @click="sendFeedback('bad')">
          <span slot="start" class="codicon codicon-thumbsdown"></span>
        </vscode-button>
      </div>
    </div>`,
};

app.component("Comment", Comment);

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
