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
  document.getElementById("sql-container").style.display = "block";
  document.getElementById("results-container").style.display = "block";
  document.getElementById("error-container").style.display = "none";

  document.getElementById("status").textContent = "✅ " + stateMessage.rows.length + " rows loaded at " + ts;
  document.getElementById("sql").textContent = stateMessage.compiled_sql;
}

function showLoader(stateMessage) {
  const previousState = vscode.getState();
  const windowRenderTime = new Date();
  const title = stateMessage.title ?? "untitled.sql preview";
  vscode.setState({ ...previousState, windowRenderTime: windowRenderTime, title: title });

  document.getElementById("loader").style.display = "block";
  document.getElementById("sql-container").style.display = "none";
  document.getElementById("results-container").style.display = "none";
  document.getElementById("error-container").style.display = "none";
}

function showError(stateMessage, ts) {
  const fullErrorMessage = stateMessage.error?.data?.message || (stateMessage.error?.message || "No error message");
  const [errorTitle, ...errorMessages] = fullErrorMessage.split(/\r?\n/);
  const errorMessage = errorMessages.join(" ");
  const shortErrorTitle = (errorTitle !== undefined) ? errorTitle : "Error";
  const shortErrorMessage = (errorTitle !== undefined) ? errorMessage : "";

  document.getElementById("loader").style.display = "none";
  document.getElementById("sql-container").style.display = "block";
  document.getElementById("results-container").style.display = "none";
  document.getElementById("error-container").style.display = "block";

  document.getElementById("status").textContent = "❌ query failed at " + ts;
  document.getElementById("sql").textContent = stateMessage.compiled_sql;
  document.getElementById("error-title").textContent = shortErrorTitle;
  document.getElementById("error-message").textContent = shortErrorMessage;
  document.getElementById("error-details").textContent = JSON.stringify(
    stateMessage.error,
    null,
    2
  );
}

document.getElementById("clipboard-sql").addEventListener("click", () => clipboardCopyAction("sql"));
document.getElementById("clipboard-error").addEventListener("click", () => clipboardCopyAction("error-details"));

function clipboardCopyAction(elementId) {
  const copyText = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(copyText);
}

function dispatchAction(stateMessage, ts) {
  switch (stateMessage.action) {
  case "queryResults":
    showQuery(stateMessage, ts);
    break;
  case "loading":
    showLoader(stateMessage);
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
  const previousState = vscode.getState();
  const renderTime = (previousState ? previousState?.windowRenderTime : undefined) || windowRenderTime;
  vscode.setState({ ...previousState, message, timestamp });
  dispatchAction(message, timestamp);

  if (!message.error && message.action !== 'loading') {
    vscode.postMessage({
      command: "info",
      text:
        "Query compiled and executed in " +
        Math.abs(timestamp - renderTime) / 1000 +
        "s",
    });
  }
});
