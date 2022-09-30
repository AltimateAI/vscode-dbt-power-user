const vscode = acquireVsCodeApi();

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

// Init Globals & hide spinner
const initRenderTime = new Date();
queryErrorCopyButton.addEventListener("click", () => clipboardCopyAction("error-details"));
spinnerImage.style.display = "none";
let queryTime = 0;

// Listen For Data
window.addEventListener("message", (event) => {
  // Update state message & timestamp
  const timestamp = new Date();
  const previousState = vscode.getState();
  vscode.setState({
    ...previousState,
    message: event.data,
    timestamp: timestamp
  });

  // Actions based on event.data.action
  dispatchAction(event.data, timestamp);

  // Update query time when we receive new data
  if (event.data.rows) {
    queryTime = Math.abs(new Date().getTime() - previousState.startQueryTime) / 1000;
  }
});

/** Shows query output in dbt query view panel */
function showQuery(event, time) {
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
  const previousState = vscode.getState();
  queryTime = Math.abs(time.getTime() - previousState.startQueryTime) / 1000;
  rowsLoadedBadge.textContent = `${event.rows.length} rows in ${queryTime}s`;
  sqlCodeBlock.textContent = event.compiled_sql;
  Prism.highlightAll(); // Prism is imported in HTML
}

/** Shows loading spinner in dbt query view panel and logs load init
 * time for query run time calculation
 */
function showLoader(event, time) {
  // Grab state and update windowRenderTime + title
  const previousState = vscode.getState();
  vscode.setState({
    ...previousState,
    startQueryTime: time.getTime(),
    title: event.title ?? "Ad Hoc Query"
  });

  // Hide
  compiledSqlContainer.style.display = "none";
  queryResultsContainer.style.display = "none";
  errorContainer.style.display = "none";

  // Show
  spinnerImage.style.display = "block";
}

/** Shows error result on error message received. This can be errors from 
 * data warehouse or jinja wither of which help user during development
 */
function showError(event, time) {
  const fullErrorMessage = event.error?.data?.message || (event.error?.message || "No error message");
  const [errorTitle, ...errorMessages] = fullErrorMessage.split(/\r?\n/);
  const errorMessage = errorMessages.join(" ");
  const shortErrorTitle = (errorTitle !== undefined) ? errorTitle : "Error";
  const shortErrorMessage = (errorTitle !== undefined) ? errorMessage : "";

  spinnerImage.style.display = "none";
  compiledSqlContainer.style.display = "block";
  queryResultsContainer.style.display = "none";
  errorContainer.style.display = "block";

  sqlCodeBlock.textContent = event.compiled_sql;
  errorTitle.textContent = shortErrorTitle;
  errorMessage.textContent = shortErrorMessage;
  errorDetails.textContent = JSON.stringify(event.error, null, 2);
}

/** Used to copy dispatch SQL to clipboard */
function clipboardCopyAction(elementId) {
  const copyText = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(copyText);
}

/** Dispatcher which uses the action key of the input */
function dispatchAction(input, time) {
  switch (input.action) {
    case "queryResults":
      showQuery(input, time);
      break;
    case "loading":
      showLoader(input, time);
      break;
    case "error":
      showError(input, time);
      break;
  }
}

// Restore State
const previousState = vscode.getState();
const stateMessage = previousState ? previousState.message : undefined;

// if (stateMessage) {
//   dispatchAction(stateMessage, previousState.timestamp);
// }
