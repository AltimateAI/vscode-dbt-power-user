import { createApp } from "vue";
const vscode = acquireVsCodeApi();

async function executeCommand(command, args) {
  return await vscode.postMessage({ command, ...args });
}

const app = createApp({
  data() {
    return {
      model: undefined,
      explanation: undefined,
      aiEnabled: false,
    };
  },
  methods: {
    updateModel(model) {
      this.model = model;
      this.aiEnabled = model?.aiEnabled;
    },
    updateExplanation(explanation) {
      this.explanation = explanation;
    },
    async explainQuery() {
      await executeCommand("explainQuery");
    },
    aiEnabledChanged(config) {
      this.aiEnabled = config.aiEnabled;
    },
  },
  computed: {
    hasData() {
      return true;
    },
    aiEnabled() {
      return this.aiEnabled || false;
    },
    name() {
      return this.model ? this.model.name : "";
    },
  },
  mounted() {
    window.addEventListener("message", (event) => {
      console.log(event);
      const { command } = event?.data;
      switch (command) {
        case "renderModel":
          this.updateModel(event.data.model);
          break;
        case "updateConfig":
          this.aiEnabledChanged(event.data.config);
          break;
        case "renderExplainQuery":
          this.updateExplanation(event.data.explanation);
          break;
      }
    });
  },
});

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
