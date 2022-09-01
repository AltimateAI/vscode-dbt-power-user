const vscode = acquireVsCodeApi();

function showQuery(stateMessage, ts) {
  var table = new Tabulator("#results-panel", {
    height: 455,
    data: stateMessage.rows,
    layout: "fitDataFill",
    columns: stateMessage.columns,
    clipboard: true,
    movableColumns: true,
    minWidth: "180px",
  });

  document.getElementById("loader").style.display = "none";
  document.getElementById("results-break").style.display = "inline";
  document.getElementById("error-container").style.display = "none";

  document.getElementById("status").textContent = "✅ " + stateMessage.rows.length + " rows loaded at " + ts;
  document.getElementById("sql").textContent = stateMessage.compiled_sql;
}

function showError(stateMessage, ts) {
  const errorTitle = stateMessage.error?.code ? `Error Code ${stateMessage.error.code}` : "Error";
  const errorType = stateMessage.error?.data?.type ? stateMessage.error.data.type : "No error type";
  const errorMessage = stateMessage.error?.data?.message || (stateMessage.error?.message || "No error message");

  document.getElementById("loader").style.display = "none";
  document.getElementById("results-break").style.display = "none";
  document.getElementById("error-container").style.display = "block";

  document.getElementById("status").textContent = "❌ query failed at " + ts;
  document.getElementById("sql").textContent = stateMessage.compiled_sql;
  document.getElementById("error-container-title").textContent = errorTitle;
  document.getElementById("error-type").textContent = errorType;
  document.getElementById("error-message").textContent = errorMessage;
  document.getElementById("error-details").textContent = JSON.stringify(
    stateMessage.error,
    null,
    2
  );
}

document.getElementById("clipboard-sql").addEventListener("click", () => clipboardCopyAction("sql"));
document.getElementById("clipboard-error").addEventListener("click", () => clipboardCopyAction("error"));

function clipboardCopyAction(elementId) {
  const copyText = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(copyText);
}

function dispatchAction(stateMessage, ts) {
  switch (stateMessage.action) {
    case "queryResults":
      showQuery(stateMessage, ts);
      break;
    case "error":
      showError(stateMessage, ts);
      break;
  }
}

// Restore State
const windowRenderTime = new Date();
const previousState = vscode.getState();
const stateMessage = previousState ? previousState.message : undefined;
if (stateMessage) {
  dispatchAction(stateMessage, previousState.timestamp);
}

// Listen For Data
window.addEventListener("message", (event) => {
  const message = event.data; // The JSON data our extension sent
  const timestamp = new Date();

  vscode.setState({ message, timestamp, title: "${title}" });
  dispatchAction(message, timestamp);

  if (!message.error) {
    vscode.postMessage({
      command: "info",
      text:
        "Query compiled and executed in " +
        Math.abs(timestamp - windowRenderTime) / 1000 +
        "s",
    });
  }
});
