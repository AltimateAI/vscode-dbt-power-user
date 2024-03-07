import { createApp } from "vue";
const vscode = acquireVsCodeApi();

async function executeCommand(command, args) {
  return await vscode.postMessage({ command, ...args });
}

const app = createApp({
  data() {
    return {
      docs: undefined,
      aiEnabled: false,
      dialogType: "Existing file",
    };
  },
  methods: {
    updateDocs(docs) {
      this.docs = docs;
      this.aiEnabled = docs?.aiEnabled;
    },
    updateColumns(columns) {
      this.docs.columns = columns.map((column) => {
        const existingColumn = this.docs?.columns.find(
          (existingColumn) =>
            column.name.toLowerCase() === existingColumn.name.toLowerCase(),
        );
        return {
          name: column.name,
          type: column.type,
          description: existingColumn?.description || "",
          generated: existingColumn?.generated || false,
          source: existingColumn !== undefined ? "YAML" : "DATABASE",
        };
      });
    },
    updateAIGeneratedModelDocs(description) {
      this.docs.description = description;
      this.docs.generated = true;
    },
    updateAIGeneratedColumnDocs(generatedColumnDescriptions) {
      const generatedColumns = Object.fromEntries(
        generatedColumnDescriptions.map((d) => [d.name, d.description]),
      );
      const columns = this.docs.columns.reduce((agg, current) => {
        agg.push({
          ...current,
          description: generatedColumns[current.name] || current.description,
          generated:
            generatedColumns[current.name] !== undefined || current.generated,
        });
        return agg;
      }, []);

      this.docs = {
        ...this.docs,
        columns: columns,
      };
    },
    aiEnabledChanged(config) {
      this.aiEnabled = config.aiEnabled;
    },
    async generateDocsForModel(promptHint) {
      await executeCommand("generateDocsForModel", {
        description: this.docs?.description,
        user_instructions: {
          promptHint,
          language: "English",
          persona: "Data Analyst",
        },
        columns: this.docs?.columns.map((col) => ({
          name: col.name,
          type: col.type,
          description: col.description,
        })),
      });
    },
    async generateDocsForColumn(columnName, promptHint) {
      await executeCommand("generateDocsForColumn", {
        description: this.docs?.description,
        columnName,
        promptHint,
        columns: this.docs?.columns.map((col) => ({
          name: col.name,
          type: col.type,
          description: col.description,
        })),
      });
    },
    async fetchMetadataFromDatabase() {
      await executeCommand("fetchMetadataFromDatabase");
    },
    async showBetaUX() {
      await executeCommand("enableNewDocsPanel", { enable: true });
    },
    async saveDocumentation() {
      await executeCommand(
        "saveDocumentation",
        JSON.parse(
          JSON.stringify({
            patchPath: this.patchPath,
            name: this.name,
            description: this.docs?.description,
            columns: this.docs?.columns,
            dialogType: this.dialogType,
          }),
        ),
      );
    },
  },
  computed: {
    hasData() {
      return this.docs;
    },
    name() {
      return this.docs ? this.docs.name : "";
    },
    generated() {
      return this.docs ? this.docs.generated : false;
    },
    aiEnabled() {
      return this.aiEnabled || false;
    },
    patchPath() {
      return this.docs ? this.docs.patchPath : "";
    },
  },
  mounted() {
    window.addEventListener("message", (event) => {
      console.log(event);
      const { command } = event?.data;
      switch (command) {
        case "renderDocumentation":
          this.updateDocs(event.data.docs);
          break;
        case "renderColumnsFromMetadataFetch":
          this.updateColumns(event.data.columns);
          break;
        case "renderAIGeneratedModelDocs":
          this.updateAIGeneratedModelDocs(event.data.description);
          break;
        case "renderAIGeneratedColumnDocs":
          this.updateAIGeneratedColumnDocs(event.data.columns);
          break;
        case "updateConfig":
          this.aiEnabledChanged(event.data.config);
          break;
      }
    });
  },
});

const Comment = {
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
      this.comment = "";
      this.toggle();
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

const Documentation = {
  props: [
    "ai-enabled",
    "generated",
    "title",
    "modelValue",
    "placeholder",
    "comment-ref",
    "prompt-options",
  ],
  data() {
    return {
      promptHint: "",
    };
  },
  emits: ["generate-docs"],
  methods: {
    toggleRating(ref) {
      let element = this.$refs[ref];
      if (Array.isArray(element)) {
        element = element[0];
      }
      element.toggle();
    },
  },
  template: `
    <div class="documentation">
      <vscode-text-area
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        resize="vertical"
        rows="5"
      >
        <h2>
          {{ title }} &nbsp;<vscode-tag
            v-show="generated && aiEnabled"
            >DataPilot</vscode-tag
          >
        </h2>
      </vscode-text-area>
      <div class="column-actions">
        <vscode-dropdown v-if="generated" v-model="promptHint" class="documentation-options">
          <vscode-option value="">Regenerate</vscode-option>
          <vscode-option value="short">Make it shorter</vscode-option>
          <vscode-option value="long">Make it longer</vscode-option>
          <vscode-option value="funny">Make it fun</vscode-option>
          <vscode-option value="business_user">Generate for Business User</vscode-option>
        </vscode-dropdown>
        <vscode-button @click="$emit('generate-docs', this.promptHint)" appearance="primary" aria-label="Generate documentation"
          ><span
            class="codicon codicon-hubot"
          ></span>&nbsp;<span v-if="generated" class="gen-button">Go!</span><span v-else class="gen-button">Generate</span>
          &nbsp;<PreviewIcon />
        </vscode-button>
        <vscode-button
          appearance="secondary"
          v-show="generated"
          @click="toggleRating(commentRef)"
          >Give Feedback
          <span slot="start" class="codicon codicon-comment"></span>
        </vscode-button>
      </div>
      <Comment :data="modelValue" :ref="commentRef"></Comment>
    </div>`,
};

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

app.component("Documentation", Documentation);
app.component("PreviewIcon", PreviewIcon);

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
