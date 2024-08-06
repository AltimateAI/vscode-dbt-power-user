var H = (o, r) => () => (o && (r = o((o = 0))), r);
var l = H(() => {
  "use strict";
});
l();
l();
l();
function x(o) {
  if (typeof document != "undefined") {
    var r = document.createElement("style"),
      s = document.createTextNode(o);
    r.appendChild(s), document.head.appendChild(r);
  }
}
var O = `.cell-output-ipywidget-background{background:white!important}
`;
x(O);
l();
l();
l();
l();
var G = "ms-toolsai.jupyter";
var v;
((s) => (
  (s.PythonInteractiveHelpLink = "https://aka.ms/pyaiinstall"),
  (s.JupyterDataRateHelpLink = "https://aka.ms/AA5ggm0")
))(v || (v = {}));
var g;
((t) => (
  (t.JupyterServerRemoteLaunchNameSeparator = `
`),
  (t.JupyterServerRemoteLaunchService = G),
  (t.JupyterServerUriListMax = 10),
  (t.IntellisenseTimeout = 2e3),
  (t.IntellisenseResolveTimeout = 5e3)
))(g || (g = {}));
var D;
((c) => (
  (c.GeneratedThemeName = "ipython-theme"),
  (c.MatplotLibDefaultParams = "_VSCode_defaultMatplotlib_Params"),
  (c.MatplotLibFigureFormats = "_VSCode_matplotLib_FigureFormats"),
  (c.DefaultCodeCellMarker = "# %%"),
  (c.DefaultCommTarget = "jupyter.widget"),
  (c.ALL_VARIABLES = "ALL_VARIABLES"),
  (c.KERNEL_VARIABLES = "KERNEL_VARIABLES"),
  (c.DEBUGGER_VARIABLES = "DEBUGGER_VARIABLES"),
  (c.PYTHON_VARIABLES_REQUESTER = "PYTHON_VARIABLES_REQUESTER"),
  (c.MULTIPLEXING_DEBUGSERVICE = "MULTIPLEXING_DEBUGSERVICE"),
  (c.RUN_BY_LINE_DEBUGSERVICE = "RUN_BY_LINE_DEBUGSERVICE"),
  (c.REMOTE_URI = "https://remote/"),
  (c.REMOTE_URI_ID_PARAM = "id"),
  (c.REMOTE_URI_HANDLE_PARAM = "uriHandle"),
  (c.REMOTE_URI_EXTENSION_ID_PARAM = "extensionId")
))(D || (D = {}));
var y;
((i) => (
  (i.ImportIPython = `{0}
from IPython import get_ipython

{1}`),
  (i.MatplotLibInit = `import matplotlib
%matplotlib inline
${D.MatplotLibDefaultParams} = dict(matplotlib.rcParams)
`),
  (i.DisableJedi = "%config Completer.use_jedi = False")
))(y || (y = {}));
var u;
((e) => (
  (e.RunAllCells = "jupyter.runallcells"),
  (e.RunAllCellsAbove = "jupyter.runallcellsabove"),
  (e.RunCellAndAllBelow = "jupyter.runcellandallbelow"),
  (e.RunAllCellsAbovePalette = "jupyter.runallcellsabove.palette"),
  (e.RunCellAndAllBelowPalette = "jupyter.runcurrentcellandallbelow.palette"),
  (e.RunToLine = "jupyter.runtoline"),
  (e.RunFromLine = "jupyter.runfromline"),
  (e.RunCell = "jupyter.runcell"),
  (e.RunCurrentCell = "jupyter.runcurrentcell"),
  (e.RunCurrentCellAdvance = "jupyter.runcurrentcelladvance"),
  (e.CreateNewInteractive = "jupyter.createnewinteractive"),
  (e.ImportNotebook = "jupyter.importnotebook"),
  (e.ImportNotebookFile = "jupyter.importnotebookfile"),
  (e.ExportFileAsNotebook = "jupyter.exportfileasnotebook"),
  (e.ExportFileAndOutputAsNotebook = "jupyter.exportfileandoutputasnotebook"),
  (e.InterruptKernel = "jupyter.interruptkernel"),
  (e.RestartKernel = "jupyter.restartkernel"),
  (e.RestartKernelAndRunAllCells = "jupyter.restartkernelandrunallcells"),
  (e.RestartKernelAndRunUpToSelectedCell =
    "jupyter.restartkernelandrunuptoselectedcell"),
  (e.NotebookEditorRemoveAllCells = "jupyter.notebookeditor.removeallcells"),
  (e.NotebookEditorRunAllCells = "jupyter.notebookeditor.runallcells"),
  (e.NotebookEditorRunSelectedCell = "jupyter.notebookeditor.runselectedcell"),
  (e.NotebookEditorAddCellBelow = "jupyter.notebookeditor.addcellbelow"),
  (e.ExpandAllCells = "jupyter.expandallcells"),
  (e.CollapseAllCells = "jupyter.collapseallcells"),
  (e.ExportOutputAsNotebook = "jupyter.exportoutputasnotebook"),
  (e.ExecSelectionInInteractiveWindow = "jupyter.execSelectionInteractive"),
  (e.RunFileInInteractiveWindows = "jupyter.runFileInteractive"),
  (e.DebugFileInInteractiveWindows = "jupyter.debugFileInteractive"),
  (e.AddCellBelow = "jupyter.addcellbelow"),
  (e.DebugCurrentCellPalette = "jupyter.debugcurrentcell.palette"),
  (e.DebugCell = "jupyter.debugcell"),
  (e.DebugStepOver = "jupyter.debugstepover"),
  (e.DebugContinue = "jupyter.debugcontinue"),
  (e.DebugStop = "jupyter.debugstop"),
  (e.RunCurrentCellAndAddBelow = "jupyter.runcurrentcellandaddbelow"),
  (e.InsertCellBelowPosition = "jupyter.insertCellBelowPosition"),
  (e.InsertCellBelow = "jupyter.insertCellBelow"),
  (e.InsertCellAbove = "jupyter.insertCellAbove"),
  (e.DeleteCells = "jupyter.deleteCells"),
  (e.SelectCell = "jupyter.selectCell"),
  (e.SelectCellContents = "jupyter.selectCellContents"),
  (e.ExtendSelectionByCellAbove = "jupyter.extendSelectionByCellAbove"),
  (e.ExtendSelectionByCellBelow = "jupyter.extendSelectionByCellBelow"),
  (e.MoveCellsUp = "jupyter.moveCellsUp"),
  (e.MoveCellsDown = "jupyter.moveCellsDown"),
  (e.ChangeCellToMarkdown = "jupyter.changeCellToMarkdown"),
  (e.ChangeCellToCode = "jupyter.changeCellToCode"),
  (e.GotoNextCellInFile = "jupyter.gotoNextCellInFile"),
  (e.GotoPrevCellInFile = "jupyter.gotoPrevCellInFile"),
  (e.ScrollToCell = "jupyter.scrolltocell"),
  (e.CreateNewNotebook = "jupyter.createnewnotebook"),
  (e.ViewJupyterOutput = "jupyter.viewOutput"),
  (e.ExportAsPythonScript = "jupyter.exportAsPythonScript"),
  (e.ExportToHTML = "jupyter.exportToHTML"),
  (e.ExportToPDF = "jupyter.exportToPDF"),
  (e.Export = "jupyter.export"),
  (e.NativeNotebookExport = "jupyter.notebookeditor.export"),
  (e.LatestExtension = "jupyter.latestExtension"),
  (e.EnableLoadingWidgetsFrom3rdPartySource =
    "jupyter.enableLoadingWidgetScriptsFromThirdPartySource"),
  (e.ShowDataViewer = "jupyter.showDataViewer"),
  (e.ShowJupyterDataViewer = "jupyter.showJupyterDataViewer"),
  (e.RefreshDataViewer = "jupyter.refreshDataViewer"),
  (e.ClearSavedJupyterUris = "jupyter.clearSavedJupyterUris"),
  (e.OpenVariableView = "jupyter.openVariableView"),
  (e.OpenOutlineView = "jupyter.openOutlineView"),
  (e.InteractiveClearAll = "jupyter.interactive.clearAllCells"),
  (e.InteractiveGoToCode = "jupyter.interactive.goToCode"),
  (e.InteractiveCopyCell = "jupyter.interactive.copyCell"),
  (e.InteractiveExportAsNotebook = "jupyter.interactive.exportasnotebook"),
  (e.InteractiveExportAs = "jupyter.interactive.exportas"),
  (e.RunByLine = "jupyter.runByLine"),
  (e.RunAndDebugCell = "jupyter.runAndDebugCell"),
  (e.RunByLineNext = "jupyter.runByLineNext"),
  (e.RunByLineStop = "jupyter.runByLineStop"),
  (e.ReplayPylanceLog = "jupyter.replayPylanceLog"),
  (e.ReplayPylanceLogStep = "jupyter.replayPylanceLogStep"),
  (e.InstallPythonExtensionViaKernelPicker =
    "jupyter.installPythonExtensionViaKernelPicker"),
  (e.InstallPythonViaKernelPicker = "jupyter.installPythonViaKernelPicker"),
  (e.ContinueEditSessionInCodespace = "jupyter.continueEditSessionInCodespace")
))(u || (u = {}));
var h;
((i) => (
  (i.DefaultDesignLenses = [u.RunCurrentCell, u.RunAllCellsAbove, u.DebugCell]),
  (i.DefaultDebuggingLenses = [u.DebugContinue, u.DebugStop, u.DebugStepOver]),
  (i.DebuggerCommands = [u.DebugContinue, u.DebugStop, u.DebugStepOver])
))(h || (h = {}));
var b;
((n) => (
  (n.HasCodeCells = "jupyter.hascodecells"),
  (n.IsInteractiveActive = "jupyter.isinteractiveactive"),
  (n.OwnsSelection = "jupyter.ownsSelection"),
  (n.HaveNativeCells = "jupyter.havenativecells"),
  (n.HaveNative = "jupyter.havenative"),
  (n.IsNativeActive = "jupyter.isnativeactive"),
  (n.IsInteractiveOrNativeActive = "jupyter.isinteractiveornativeactive"),
  (n.IsPythonOrNativeActive = "jupyter.ispythonornativeactive"),
  (n.IsPythonOrInteractiveActive = "jupyter.ispythonorinteractiveeactive"),
  (n.IsPythonOrInteractiveOrNativeActive =
    "jupyter.ispythonorinteractiveornativeeactive"),
  (n.CanRestartNotebookKernel =
    "jupyter.notebookeditor.canrestartNotebookkernel"),
  (n.CanInterruptNotebookKernel =
    "jupyter.notebookeditor.canInterruptNotebookKernel"),
  (n.CanRestartInteractiveWindowKernel =
    "jupyter.interactive.canRestartNotebookKernel"),
  (n.CanInterruptInteractiveWindowKernel =
    "jupyter.interactive.canInterruptNotebookKernel"),
  (n.RunByLineCells = "jupyter.notebookeditor.runByLineCells"),
  (n.RunByLineDocuments = "jupyter.notebookeditor.runByLineDocuments"),
  (n.DebugDocuments = "jupyter.notebookeditor.debugDocuments"),
  (n.IsPythonNotebook = "jupyter.ispythonnotebook"),
  (n.IsJupyterKernelSelected = "jupyter.kernel.isjupyter"),
  (n.IsDataViewerActive = "jupyter.dataViewerActive"),
  (n.HasNativeNotebookOrInteractiveWindowOpen =
    "jupyter.hasNativeNotebookOrInteractiveWindowOpen"),
  (n.ZmqAvailable = "jupyter.zmqavailable"),
  (n.ReplayLogLoaded = "jupyter.replayLogLoaded"),
  (n.KernelSource = "jupyter.kernelSource")
))(b || (b = {}));
var f;
((a) => (
  (a.PythonCellMarker =
    /^(#\s*%%|#\s*\<codecell\>|#\s*In\[\d*?\]|#\s*In\[ \])/),
  (a.PythonMarkdownCellMarker =
    /^(#\s*%%\s*\[markdown\]|#\s*\<markdowncell\>)/),
  (a.UrlPatternRegEx =
    "(?<PREFIX>https?:\\/\\/)((\\(.+\\s+or\\s+(?<IP>.+)\\))|(?<LOCAL>[^\\s]+))(?<REST>:.+)"),
  (a.HttpPattern = /https?:\/\//),
  (a.ShapeSplitterRegEx = /.*,\s*(\d+).*/),
  (a.SvgHeightRegex = /(\<svg.*height=\")(.*?)\"/),
  (a.SvgWidthRegex = /(\<svg.*width=\")(.*?)\"/),
  (a.SvgSizeTagRegex = /\<svg.*tag=\"sizeTag=\{(.*),\s*(.*)\}\"/)
))(f || (f = {}));
var Et = Symbol("DataScienceStartupTime");
l();
var J = Symbol("MicrotaskDelay");
var P = class {
  constructor(r = null) {
    this.scope = r;
    this._resolved = !1;
    this._rejected = !1;
    this._promise = new Promise((s, i) => {
      (this._resolve = s), (this._reject = i);
    });
  }
  get value() {
    return this._value;
  }
  resolve(r) {
    (this._value = r),
      this._resolve.apply(this.scope ? this.scope : this, arguments),
      (this._resolved = !0);
  }
  reject(r) {
    this._reject.apply(this.scope ? this.scope : this, arguments),
      (this._rejected = !0);
  }
  get promise() {
    return this._promise;
  }
  get resolved() {
    return this._resolved;
  }
  get rejected() {
    return this._rejected;
  }
  get completed() {
    return this._rejected || this._resolved;
  }
};
function C(o = null) {
  return new P(o);
}
l();
var w;
function U(o) {
  w && w("error", o);
}
function m(o) {
  return o.mime.toLowerCase().includes("json") ? o.json() : o.text();
}
var R = class extends Error {
  constructor() {
    super(), (this.name = "vscode.fallbackToNextRenderer");
  }
};
async function X() {
  return new Promise((r) => {
    let s = () => {
      var N, t;
      let i =
        ((N = window.ipywidgetsKernel) == null ? void 0 : N.renderOutput) ||
        ((t = this.ipywidgetsKernel) == null ? void 0 : t.renderOutput);
      i ? (window.ipywidgetsKernel.initialize(), r(i)) : setTimeout(s, 100);
    };
    s();
  });
}
var bt = (o) => {
  let r = (t, E) => {
    o.postMessage && o.postMessage({ command: "log", message: t, category: E }),
      E === "error" && console.error(t);
  };
  r("Jupyter IPyWidget Renderer Activated"), q(o);
  let s = new Map(),
    i = C();
  o.postMessage && o.postMessage({ command: "ipywidget-renderer-loaded" }),
    o.onDidReceiveMessage &&
      o.onDidReceiveMessage(async (t) => {
        var E;
        if (
          (t.command === "query-widget-state" &&
            t.model_id &&
            ((E = s.get(t.model_id)) == null || E.resolve(t),
            s.delete(t.model_id)),
          t.command === "ipywidget-renderer-init")
        ) {
          let _ = window.ipywidgetsKernel;
          if (t.version) {
            let a = new Promise((p) => {
                let A = () => {
                  if (window.vscIPyWidgets7) return p();
                  setTimeout(A, 500);
                };
                setTimeout(A, 500);
              }),
              S = new Promise((p) => {
                let A = () => {
                  if (window.vscIPyWidgets8) return p();
                  setTimeout(A, 500);
                };
                setTimeout(A, 500);
              });
            await Promise.all([a, S]);
            let T = () => {
                try {
                  window.vscIPyWidgets8.unload();
                } catch (p) {}
              },
              d = () => {
                try {
                  window.vscIPyWidgets7.unload();
                } catch (p) {}
              };
            t.version === 7
              ? (T(),
                window.vscIPyWidgets7.load(),
                r("Loaded IPYWidgets 7.x", "info"))
              : t.version === 8 &&
                (d(),
                window.vscIPyWidgets8.load(),
                r("Loaded IPYWidgets 8.x", "info"));
          }
          t.widgetState && _ && t.version
            ? (await _.restoreWidgets(t.widgetState),
              i.resolve(Object.assign({}, t, { widgetStateLoaded: !0 })))
            : i.resolve(Object.assign({}, t, { widgetStateLoaded: !1 }));
        }
      });
  async function N(t) {
    if (!o.postMessage) return { hasWidgetState: !1, kernelSelected: !1 };
    let E = s.get(t) || C();
    return (
      s.set(t, E),
      o.postMessage({ command: "query-widget-state", model_id: t }),
      E.promise
    );
  }
  return {
    async renderOutputItem(t, E, _) {
      r(`Got item for Rendering ${t.id}}`);
      try {
        let a = m(t);
        if (!a)
          throw (
            (r(`Error: Model not found to render output ${t.id}`, "error"),
            new R())
          );
        let S = X(),
          { hasWidgetState: T, kernelSelected: d } = await N(a.model_id),
          p = T && d ? await S : void 0;
        if (!T)
          throw (
            (r(
              `Model not found in Kernel state to render output ${t.id}, rendering a fallback mime type`,
              "info"
            ),
            new R())
          );
        if (!d)
          throw (
            (r(
              `No Kernel selected, hence not rendering widget output ${t.id}`,
              "error"
            ),
            new R())
          );
        if (p)
          return (
            r(`Rendering ${t.id} widget renderer found *************`),
            (E.className =
              (E.className || "") + " cell-output-ipywidget-background"),
            p(t, a, E, r, N)
          );
        throw new R();
      } catch (a) {
        throw (U(`Failed to render output ${t.id}, ${a}`), a);
      } finally {
        Q(o, t, E);
      }
    },
    disposeOutputItem(t) {
      var _, a;
      r(`Disposing rendered output for ${t}`);
      let E =
        ((_ = window.ipywidgetsKernel) == null ? void 0 : _.disposeOutput) ||
        ((a = this.ipywidgetsKernel) == null ? void 0 : a.disposeOutput);
      if (E) return E(t);
    },
  };
};
function q(o) {
  let r = window;
  if (
    !r.widgetEntryPoint ||
    typeof r.widgetEntryPoint.initialize != "function"
  ) {
    o.postMessage &&
      o.postMessage({ command: "log", message: "Hook not registered" });
    return;
  }
  r.widgetEntryPoint.initialize(o);
}
function Q(o, r, s) {
  let i = window;
  !i.widgetEntryPoint ||
    typeof i.widgetEntryPoint.renderOutputItem != "function" ||
    (o.postMessage &&
      o.postMessage({ command: "log", message: "rendering output" }),
    i.widgetEntryPoint.renderOutputItem(r, s));
}
export { bt as activate };
