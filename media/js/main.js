const vscode = acquireVsCodeApi();
const initState = vscode.getState();

// Listen For Data
window.addEventListener("message", (event) => {
  dispatchAction(event.data);
});

// Actions from VS Code
const DO_LOADING = "loading";
const DO_QUERY = "queryResults";
const DO_ERROR = "error";
const DO_CONFIG = "renderConfig";

/** Compiled SQL container housing SQL dispatched to data warehouse */
const compiledSqlContainer = document.getElementById("sql-container");

/** Query result container housing Tabulator table with query output */
const queryResultsContainer = document.getElementById("results-container");
const rowsLoadedBadge = document.getElementById("row-badge");
const queryErrorCopyButton = document.getElementById("clipboard-error");

/** Error container housing error output for user */
const errorContainer = document.getElementById("error-container");
const errorTitle = document.getElementById("error-title");
const errorMessage = document.getElementById("error-message");
const errorDetails = document.getElementById("error-details");

/** The \<pre\> element which holds SQL */
const sqlCodeBlock = document.getElementById("sql");

/** Loading spinner */
const spinnerImage = document.getElementById("loader");

/** Text field for adjusting the limit for query view */
const limitControl = document.getElementById("limit-ctrl");
limitControl.onchange = (e) => { vscode.postMessage({ command: "updateConfig", limit: e.target.value }); };
if (initState.limit) {
  limitControl.value = initState.limit;
}

/** Webview ui toolkit tab container */
const panelManager = document.getElementById("panel-manager");

// Init Globals & hide spinner
const initRenderTime = new Date();
queryErrorCopyButton.addEventListener("click", () => clipboardCopyAction("error-details"));
spinnerImage.style.display = "none";

/** Shows query output in dbt query view panel */
function showQuery(event, time, state) {
  // Update table
  let tableHeightDyn = event.rows.length * 65;
  new Tabulator("#results-panel", {
    height: tableHeightDyn < 455 ? tableHeightDyn : 455,
    data: event.rows,
    layout: "fitDataFill",
    columns: event.columns,
    clipboard: true,
    movableColumns: true,
    minWidth: "180px",
  });

  // Hide
  spinnerImage.style.display = "none";
  errorContainer.style.display = "none";

  // Show
  compiledSqlContainer.style.display = "block";
  queryResultsContainer.style.display = "block";

  // Update view
  panelManager.activeid = "tab-1";
  sqlCodeBlock.textContent = event.compiled_sql;
  Prism.highlightAll(); // Prism is imported in HTML

  // Update var
  rowsLoadedBadge.textContent = `${event.rows.length} rows in ${state.queryTime || 0.0}s`;
}

/** Shows loading spinner in dbt query view panel and logs load init
 * time for query run time calculation
 */
function showLoader(event, time, state) {
  delete state.queryTime;
  state.startQueryTime = time;
  state.queryTitle = event.title ?? "Ad Hoc Query";

  // Hide
  compiledSqlContainer.style.display = "none";
  queryResultsContainer.style.display = "none";
  errorContainer.style.display = "none";

  // Show
  spinnerImage.style.display = "block";
  panelManager.activeid = "tab-1";
  rowsLoadedBadge.textContent = "0";
}

/** Shows error result on error message received. This can be errors from 
 * data warehouse or jinja wither of which help user during development
 */
function showError(event, time, state) {
  const fullErrorMessage = event.error?.message ?? "No error message";
  const [errorTitleText, ...errorMessages] = fullErrorMessage.split(/\r?\n/);

  const errorMessageText = errorMessages.join(" ");
  const shortErrorTitle = errorTitleText ?? "Error";
  const shortErrorMessage = errorMessageText ?? "";

  spinnerImage.style.display = "none";
  compiledSqlContainer.style.display = "block";
  queryResultsContainer.style.display = "none";
  errorContainer.style.display = "block";
  panelManager.activeid = "tab-1";

  sqlCodeBlock.textContent = event.compiled_sql;
  errorTitle.textContent = shortErrorTitle;
  errorMessage.textContent = shortErrorMessage;
  errorDetails.textContent = JSON.stringify(event.error, null, 2);
}

/** Dispatcher which uses the action key of the input */
function dispatchAction(eventData) {
  let t1 = new Date().getTime();
  let state = vscode.getState();
  state.message = eventData;
  if (eventData.rows && state.startQueryTime && !state.queryTime) {
    state.queryTime = Math.abs((Number(t1) - Number(state.startQueryTime))) / 1000;
  }
  switch (eventData.action) {
    case DO_QUERY:
      showQuery(eventData, t1, state);
      vscode.setState(state);
      break;
    case DO_LOADING:
      showLoader(eventData, t1, state);
      vscode.setState(state);
      break;
    case DO_ERROR:
      showError(eventData, t1, state);
      vscode.setState(state);
      break;
    case DO_CONFIG:
      if (eventData.limit) {
        state.limit = eventData.limit;
        limitControl.value = eventData.limit;
      };
      vscode.setState(state);
      break;
  }
}

// Restore State
if (initState) {
  dispatchAction(initState.message);
}

/** Used to copy dispatch SQL to clipboard */
function clipboardCopyAction(elementId) {
  const copyText = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(copyText);
}
