"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const u = require("vscode"),
  p = require("@extension"),
  le = require("python-bridge"),
  pe = require("fs"),
  oe = require("@jupyterlab/services");
function L(o, e, t, n) {
  var r = arguments.length,
    s =
      r < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, t)) : n,
    a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    s = Reflect.decorate(o, e, t, n);
  else
    for (var i = o.length - 1; i >= 0; i--)
      (a = o[i]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}
function $(o, e) {
  return function (t, n) {
    e(t, n, o);
  };
}
function me(o, e, t) {
  return Object.defineProperty(o, "name", { configurable: !0, value: e });
}
function q(o, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(o, e);
}
const he = (o) => ("getCells" in o ? o.getCells() : o.cells),
  be = (o) =>
    o instanceof u.NotebookCellData ? o.value : o.document.getText(),
  ge = (o) =>
    o instanceof u.NotebookCellData ? o.languageId : o.document.languageId,
  Z = (o, e, t) => {
    var r;
    const n = [];
    for (const s of he(o))
      n.push({
        cell_type: s.kind,
        source: be(s).split(/\r?\n/g),
        languageId: ge(s),
        metadata: s.metadata,
        outputs: t ? s.outputs : void 0,
      });
    return {
      cells: n,
      metadata: {
        ...o.metadata,
        name: e,
        createdAt:
          ((r = o.metadata) == null ? void 0 : r.createdAt) ||
          new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  },
  x = () => Math.random().toString(36).substr(2, 9);
function fe() {
  const o = new Date(),
    e = o.toLocaleDateString("en-GB").replace(/\//g, "-"),
    t = o.toLocaleTimeString("en-GB", { hour12: !1 }).replace(/:/g, "-");
  return `${e}-${t}`;
}
class ye {
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(e, t) {
    const n = new TextDecoder().decode(e);
    let r;
    try {
      r = JSON.parse(n);
    } catch {
      r = { cells: [] };
    }
    const s = r.cells.map((i) => {
        var c;
        const l = new u.NotebookCellData(
          i.cell_type,
          (c = i.source) == null
            ? void 0
            : c.join(`
`),
          i.languageId,
        );
        return (l.metadata = i.metadata), (l.outputs = i.outputs), l;
      }),
      a = new u.NotebookData(s);
    return (a.metadata = r.metadata), a;
  }
  async serializeNotebook(e, t) {
    const n = Z(e);
    return new TextEncoder().encode(JSON.stringify(n));
  }
}
var I;
(function (o) {
  (o.error = "application/vnd.code.notebook.error"),
    (o.stderr = "application/vnd.code.notebook.stderr"),
    (o.stdout = "application/vnd.code.notebook.stdout");
})(I || (I = {}));
const we = ["text/plain", "text/markdown", I.stderr, I.stdout],
  re = [
    "application/vnd.*",
    "application/vdom.*",
    "application/geo+json",
    "application/x-nteract-model-debug+json",
    "text/html",
    "application/javascript",
    "image/gif",
    "text/latex",
    "text/markdown",
    "image/png",
    "image/svg+xml",
    "image/jpeg",
    "application/json",
    "text/plain",
  ],
  M = new Map();
M.set("display_data", Y);
M.set("error", Ie);
M.set("execute_result", Y);
M.set("stream", Se);
M.set("update_display_data", Y);
function J(o) {
  const e = M.get(o.output_type);
  let t;
  return (
    e
      ? (t = e(o))
      : (console.warn(
          `Unable to translate cell from ${o.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = Y(o))),
    t
  );
}
function ne(o) {
  const e = { outputType: o.output_type };
  switch ((o.transient && (e.transient = o.transient), o.output_type)) {
    case "display_data":
    case "execute_result":
    case "update_display_data": {
      (e.executionCount = o.execution_count),
        (e.metadata = o.metadata ? JSON.parse(JSON.stringify(o.metadata)) : {});
      break;
    }
  }
  return e;
}
function Y(o) {
  const e = ne(o);
  ("image/svg+xml" in o.data || "image/png" in o.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (o.data) for (const n in o.data) t.push(Te(n, o.data[n]));
  return new u.NotebookCellOutput(ke(t), e);
}
function ke(o) {
  return o.sort((e, t) => {
    const n = (a, i) => (
      a.endsWith(".*") && (a = a.substr(0, a.indexOf(".*"))), i.startsWith(a)
    );
    let r = re.findIndex((a) => n(a, e.mime)),
      s = re.findIndex((a) => n(a, t.mime));
    return (
      se(e) && (r = -1),
      se(t) && (s = -1),
      (r = r === -1 ? 100 : r),
      (s = s === -1 ? 100 : s),
      r - s
    );
  });
}
function se(o) {
  if (o.mime.startsWith("application/vnd."))
    try {
      return new TextDecoder().decode(o.data).length === 0;
    } catch {
      console.error(`Failed to decode ${o.mime}`, o.data);
    }
  return !1;
}
function Te(o, e) {
  if (!e) return u.NotebookCellOutputItem.text("", o);
  try {
    if (
      (o.startsWith("text/") || we.includes(o)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? G(e) : e;
      return u.NotebookCellOutputItem.text(t, o);
    } else
      return o.startsWith("image/") &&
        typeof e == "string" &&
        o !== "image/svg+xml"
        ? new u.NotebookCellOutputItem(_e(e), o)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? u.NotebookCellOutputItem.text(JSON.stringify(e), o)
          : ((e = Array.isArray(e) ? G(e) : e),
            u.NotebookCellOutputItem.text(e, o));
  } catch (t) {
    return (
      console.error(
        `Failed to convert ${o} output to a buffer ${typeof e}, ${e}`,
        t,
      ),
      u.NotebookCellOutputItem.text("")
    );
  }
}
function _e(o) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(o, "base64")
    : Uint8Array.from(atob(o), (e) => e.charCodeAt(0));
}
function G(o) {
  if (Array.isArray(o)) {
    let e = "";
    for (let t = 0; t < o.length; t += 1) {
      const n = o[t];
      t < o.length - 1 &&
      !n.endsWith(`
`)
        ? (e = e.concat(`${n}
`))
        : (e = e.concat(n));
    }
    return e;
  }
  return o.toString();
}
function Ee(o) {
  let e = o;
  do (o = e), (e = o.replace(/[^\n]\x08/gm, ""));
  while (e.length < o.length);
  return o;
}
function ve(o) {
  for (
    o = o.replace(
      /\r+\n/gm,
      `
`,
    );
    o.search(/\r[^$]/g) > -1;

  ) {
    const e = o.match(/^(.*)\r+/m)[1];
    let t = o.match(/\r+(.*)$/m)[1];
    (t = t + e.slice(t.length, e.length)),
      (o = o.replace(/\r+.*$/m, "\r").replace(/^.*\r/m, t));
  }
  return o;
}
function Ne(o) {
  return ve(Ee(o));
}
function K(o) {
  if (o.parent_header && "msg_id" in o.parent_header)
    return o.parent_header.msg_id;
}
function Oe(o) {
  if (Object.prototype.hasOwnProperty.call(o, "text/html")) {
    const e = o["text/html"];
    typeof e == "string" &&
      e.includes('<iframe id="tensorboard-frame-') &&
      (o["text/html"] = e.replace(
        /new URL\((.*), window.location\)/,
        'new URL("http://localhost")',
      ));
  }
  return o;
}
const Ce = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function Q(o) {
  let e = typeof o == "string" ? o : "";
  return (
    typeof o != "string" &&
      "content" in o &&
      "code" in o.content &&
      typeof o.content.code == "string" &&
      (e = o.content.code),
    !e.includes(Ce)
  );
}
function Se(o) {
  const e = G(o.text),
    t =
      o.name === "stderr"
        ? u.NotebookCellOutputItem.stderr
        : u.NotebookCellOutputItem.stdout;
  return new u.NotebookCellOutput([t(e)], ne(o));
}
function Ie(o) {
  return (
    (o = o || { output_type: "error", ename: "", evalue: "", traceback: [] }),
    new u.NotebookCellOutput(
      [
        u.NotebookCellOutputItem.error({
          name: (o == null ? void 0 : o.ename) || "",
          message: (o == null ? void 0 : o.evalue) || "",
          stack: ((o == null ? void 0 : o.traceback) || []).join(`
`),
        }),
      ],
      { ...ne(o), originalError: o },
    )
  );
}
var ee;
(function (o) {
  (o.GeneratedThemeName = "ipython-theme"),
    (o.MatplotLibDefaultParams = "_VSCode_defaultMatplotlib_Params"),
    (o.MatplotLibFigureFormats = "_VSCode_matplotLib_FigureFormats"),
    (o.DefaultCodeCellMarker = "# %%"),
    (o.DefaultCommTarget = "jupyter.widget"),
    (o.ALL_VARIABLES = "ALL_VARIABLES"),
    (o.KERNEL_VARIABLES = "KERNEL_VARIABLES"),
    (o.DEBUGGER_VARIABLES = "DEBUGGER_VARIABLES"),
    (o.PYTHON_VARIABLES_REQUESTER = "PYTHON_VARIABLES_REQUESTER"),
    (o.MULTIPLEXING_DEBUGSERVICE = "MULTIPLEXING_DEBUGSERVICE"),
    (o.RUN_BY_LINE_DEBUGSERVICE = "RUN_BY_LINE_DEBUGSERVICE"),
    (o.REMOTE_URI = "https://remote/"),
    (o.REMOTE_URI_ID_PARAM = "id"),
    (o.REMOTE_URI_HANDLE_PARAM = "uriHandle"),
    (o.REMOTE_URI_EXTENSION_ID_PARAM = "extensionId");
})(ee || (ee = {}));
const z = "application/vnd.jupyter.widget-view+json";
class Pe {
  get value() {
    return this._value;
  }
  constructor(e = null) {
    Object.defineProperty(this, "scope", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "_resolve", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "_reject", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "_resolved", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "_rejected", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "_promise", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "_value", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this._promise = new Promise((t, n) => {
        (this._resolve = t), (this._reject = n);
      }));
  }
  resolve(e) {
    (this._value = e),
      this._resolve.apply(this.scope ? this.scope : this, arguments),
      (this._resolved = !0);
  }
  reject(e) {
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
}
function Me(o = null) {
  return new Pe(o);
}
var j = {};
Object.defineProperty(j, "__esModule", { value: !0 });
j.serialize = H = j.deserialize = void 0;
function De(o) {
  let e;
  return typeof o == "string" ? (e = JSON.parse(o)) : (e = Ae(o)), e;
}
var H = (j.deserialize = De);
function xe(o) {
  var e;
  let t;
  return (
    !((e = o.buffers) === null || e === void 0) && e.length
      ? (t = je(o))
      : (t = JSON.stringify(o)),
    t
  );
}
j.serialize = xe;
function Ae(o) {
  const e = new DataView(o),
    t = e.getUint32(0),
    n = [];
  if (t < 2) throw new Error("Invalid incoming Kernel Message");
  for (let a = 1; a <= t; a++) n.push(e.getUint32(a * 4));
  const r = new Uint8Array(o.slice(n[0], n[1])),
    s = JSON.parse(new TextDecoder("utf8").decode(r));
  s.buffers = [];
  for (let a = 1; a < t; a++) {
    const i = n[a],
      l = n[a + 1] || o.byteLength;
    s.buffers.push(new DataView(o.slice(i, l)));
  }
  return s;
}
function je(o) {
  const e = [],
    t = [],
    n = new TextEncoder();
  let r = [];
  o.buffers !== void 0 && ((r = o.buffers), delete o.buffers);
  const s = n.encode(JSON.stringify(o));
  t.push(s.buffer);
  for (let c = 0; c < r.length; c++) {
    const m = r[c];
    t.push(ArrayBuffer.isView(m) ? m.buffer : m);
  }
  const a = t.length;
  e.push(4 * (a + 1));
  for (let c = 0; c + 1 < t.length; c++)
    e.push(e[e.length - 1] + t[c].byteLength);
  const i = new Uint8Array(e[e.length - 1] + t[t.length - 1].byteLength),
    l = new DataView(i.buffer);
  l.setUint32(0, a);
  for (let c = 0; c < e.length; c++) l.setUint32(4 * (c + 1), e[c]);
  for (let c = 0; c < t.length; c++) i.set(new Uint8Array(t[c]), e[c]);
  return i.buffer;
}
function Re(o) {
  if (!o || !Array.isArray(o) || o.length === 0) return;
  const e = [];
  for (let t = 0; t < o.length; t += 1) {
    const n = o[t];
    if ("buffer" in n && "byteOffset" in n) {
      const r = n,
        s = [...new Uint8Array(r.buffer)];
      e.push({ byteLength: r.byteLength, byteOffset: r.byteOffset, buffer: s });
    } else e.push([...new Uint8Array(n)]);
  }
  return e;
}
const Le = require("path");
function V() {}
Le.join(__dirname, ".");
function $e() {
  console.log("Trying to load zmq");
  const o = require("zeromq");
  return (o.context.blocky = !1), console.info("ZMQ loaded."), o;
}
function qe(o, e) {
  const t = o.transport === "tcp" ? ":" : "-",
    n = o[`${e}_port`];
  if (!n) throw new Error(`Port not found for channel "${e}"`);
  return `${o.transport}://${o.ip}${t}${n}`;
}
const Fe = ["username", "version", "session", "msg_id", "msg_type"],
  ae = {
    stream: { name: "string", text: "string" },
    display_data: { data: "object", metadata: "object" },
    execute_input: { code: "string", execution_count: "number" },
    execute_result: {
      execution_count: "number",
      data: "object",
      metadata: "object",
    },
    error: { ename: "string", evalue: "string", traceback: "object" },
    status: {
      execution_state: [
        "string",
        ["starting", "idle", "busy", "restarting", "dead"],
      ],
    },
    clear_output: { wait: "boolean" },
    comm_open: { comm_id: "string", target_name: "string", data: "object" },
    comm_msg: { comm_id: "string", data: "object" },
    comm_close: { comm_id: "string" },
    shutdown_reply: { restart: "boolean" },
  };
function We(o) {
  if (o.channel !== "iopub") return;
  const e = o.header.msg_type;
  if (e in ae) {
    const t = ae[e];
    if (t === void 0) return;
    const n = Object.keys(t),
      r = o.content;
    for (let s = 0; s < n.length; s++) {
      const a = t[n[s]],
        i = Array.isArray(a) ? a : [a, []],
        l = n[s];
      if (!(l in r) || typeof r[l] !== i[0])
        switch (i[0]) {
          case "string":
            r[l] = "";
            break;
          case "boolean":
            r[l] = !1;
            break;
          case "object":
            r[l] = {};
            break;
          case "number":
            r[l] = 0;
            break;
        }
    }
  }
}
function Be(o, e) {
  const t = o.header;
  Fe.forEach((n) => {
    typeof t[n] != "string" && (t[n] = "");
  }),
    typeof o.channel != "string" && (o.channel = e),
    o.content || (o.content = {}),
    o.metadata || (o.metadata = {}),
    o.channel === "iopub" && We(o);
}
console.log(Be);
class Ue {
  constructor(e, t) {
    Object.defineProperty(this, "connection", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "serialize", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "onopen", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: V,
      }),
      Object.defineProperty(this, "onerror", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: V,
      }),
      Object.defineProperty(this, "onclose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: V,
      }),
      Object.defineProperty(this, "onmessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: V,
      }),
      Object.defineProperty(this, "receiveHooks", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "sendHooks", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "msgChain", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Promise.resolve(),
      }),
      Object.defineProperty(this, "sendChain", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Promise.resolve(),
      }),
      Object.defineProperty(this, "channels", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "closed", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      (this.channels = this.generateChannels(this.connection));
  }
  dispose() {
    this.closed || this.close();
  }
  close() {
    this.closed = !0;
    const e = (t) => {
      try {
        t.close();
      } catch (n) {
        console.error("Error during socket shutdown", n);
      }
    };
    e(this.channels.control),
      e(this.channels.iopub),
      e(this.channels.shell),
      e(this.channels.stdin);
  }
  emit(e, ...t) {
    switch (e) {
      case "message":
        this.onmessage({ data: t[0], type: "message", target: this });
        break;
      case "close":
        this.onclose({ wasClean: !0, code: 0, reason: "", target: this });
        break;
      case "error":
        this.onerror({
          error: new Error(),
          message: "to do",
          type: "error",
          target: this,
        });
        break;
      case "open":
        this.onopen({ target: this });
        break;
    }
    return !0;
  }
  send(e, t) {
    this.sendMessage(e, !1);
  }
  addReceiveHook(e) {
    this.receiveHooks.push(e);
  }
  removeReceiveHook(e) {
    this.receiveHooks = this.receiveHooks.filter((t) => t !== e);
  }
  addSendHook(e) {
    this.sendHooks.push(e);
  }
  removeSendHook(e) {
    this.sendHooks = this.sendHooks.filter((t) => t !== e);
  }
  generateChannel(e, t, n) {
    const r = n();
    return (
      r.connect(qe(e, t)),
      this.processSocketMessages(t, r).catch((s) =>
        console.error(`Failed to read messages from channel ${t}`, s),
      ),
      r
    );
  }
  async processSocketMessages(e, t) {
    for await (const n of t) {
      if (this.closed) break;
      this.onIncomingMessage(e, n);
    }
  }
  generateChannels(e) {
    const t = $e(),
      n = x();
    return {
      iopub: this.generateChannel(
        e,
        "iopub",
        () => new t.Subscriber({ maxMessageSize: -1, receiveHighWaterMark: 0 }),
      ),
      shell: this.generateChannel(
        e,
        "shell",
        () => new t.Dealer({ routingId: n, maxMessageSize: -1 }),
      ),
      control: this.generateChannel(
        e,
        "control",
        () => new t.Dealer({ routingId: n, maxMessageSize: -1 }),
      ),
      stdin: this.generateChannel(
        e,
        "stdin",
        () => new t.Dealer({ routingId: n, maxMessageSize: -1 }),
      ),
    };
  }
  onIncomingMessage(e, t) {
    this.msgChain = this.msgChain
      .then(() => this.handleIncomingMessage(e, t))
      .catch((n) => {
        console.error("Failed to handle incoming message", n);
      });
  }
  async handleIncomingMessage(e, t) {
    for (const n of this.receiveHooks) await n(t);
    this.emit("message", t);
  }
  sendMessage(e, t) {
    this.sendChain = this.sendChain
      .then(() => this.handleOutgoingMessage(e, t))
      .catch((n) => {
        console.error("Failed to handle outgoing message", n);
      });
  }
  async handleOutgoingMessage(e, t) {
    if (!t) for (const s of this.sendHooks) await s(e);
    let n, r;
    try {
      if (typeof e == "string") (n = H(e)), (r = n.channel);
      else throw new Error("Not supported");
    } catch {
      (r = "shell"), (n = e);
    }
    this.postToSocket(r, n);
  }
  postToSocket(e, t) {
    const n = this.channels[e];
    n && n.send(this.serialize(t));
  }
}
let X;
class Ke {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, n, r) {
    Object.defineProperty(this, "outputWidgetIds", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new Set(),
    }),
      Object.defineProperty(this, "waitingMessageIds", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      }),
      Object.defineProperty(this, "kernel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "_postMessageEmitter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new u.EventEmitter(),
      }),
      (this.kernel = this.initializeKernel(e, t, n, r));
  }
  get rawKernel() {
    return this.kernel;
  }
  initializeKernel(e, t, n, r) {
    var s;
    const a = require("@jupyterlab/services"),
      i = require("@jupyterlab/services/lib/kernel/serialize");
    let l;
    const c =
        ((s = class extends Ue {
          constructor() {
            super(e.connection, i.serialize), (l = this);
          }
        }),
        me(s, "RawSocketWrapper"),
        Object.defineProperty(s, "CONNECTING", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(s, "OPEN", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 1,
        }),
        Object.defineProperty(s, "CLOSING", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 2,
        }),
        Object.defineProperty(s, "CLOSED", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 3,
        }),
        s),
      m = a.ServerConnection.makeSettings({ WebSocket: c, wsUrl: "RAW" });
    X || (X = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const h = new X.KernelConnection({
      serverSettings: m,
      clientId: t,
      handleComms: !1,
      username: n,
      model: r,
    });
    return (
      l &&
        (l.emit("open"),
        l.addReceiveHook(this.onKernelSocketMessage.bind(this)),
        l.addSendHook(this.mirrorSend.bind(this))),
      { realKernel: h, socket: l, kernelProcess: e }
    );
  }
  async mirrorSend(e, t) {
    if (
      typeof e == "string" &&
      e.includes("shell") &&
      e.includes("execute_request")
    ) {
      const n = H(e);
      if (
        n.channel === "shell" &&
        n.header.msg_type === "execute_request" &&
        "content" in n &&
        typeof n.content == "object" &&
        n.content !== null &&
        "code" in n.content
      ) {
        const r = n;
        if (!Q(r)) return;
        this.mirrorExecuteRequest(r);
      }
    }
  }
  raisePostMessage(e, t) {
    this._postMessageEmitter.fire({ payload: t, type: e });
  }
  mirrorExecuteRequest(e) {
    this.raisePostMessage("IPyWidgets_mirror_execute", {
      id: e.header.msg_id,
      msg: e,
    });
  }
  async onKernelSocketMessage(e) {
    var s;
    const t = x(),
      n = Me();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: n,
      }),
      typeof e == "string"
        ? Q(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) &&
          this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: Re([e]),
          }),
      (typeof e != "string" ||
        e.includes(z) ||
        e.includes(ee.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg")) &&
        typeof e == "string")
    ) {
      const a = H(e);
      if (!Q(a)) return;
      if (oe.KernelMessage.isCommOpenMsg(a)) {
        const i = a.content,
          l = (s = i.data) == null ? void 0 : s.state;
        l &&
          typeof l == "object" &&
          "_model_module" in l &&
          "_model_name" in l &&
          l._model_module === "@jupyter-widgets/output" &&
          l._model_name === "OutputModel" &&
          this.outputWidgetIds.add(i.comm_id);
      } else if (oe.KernelMessage.isCommCloseMsg(a)) {
        const i = a.content;
        this.outputWidgetIds.has(i.comm_id) &&
          this.outputWidgetIds.delete(i.comm_id);
      }
    }
  }
  onKernelSocketResponse(e) {
    const t = this.waitingMessageIds.get(e.id);
    t && (this.waitingMessageIds.delete(e.id), t.resultPromise.resolve());
  }
}
const Ve = require("path");
class P {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, n, r) {
    Object.defineProperty(this, "executionInfrastructure", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t,
    }),
      Object.defineProperty(this, "notebookDependencies", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r,
      }),
      Object.defineProperty(this, "_postMessageEmitter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new u.EventEmitter(),
      }),
      Object.defineProperty(this, "disposables", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "lastUsedStreamOutput", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "python", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "kernel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "isInitializing", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !0,
      }),
      Object.defineProperty(this, "ownedCommIds", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set(),
      }),
      Object.defineProperty(this, "commIdsMappedToWidgetOutputModels", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set(),
      }),
      Object.defineProperty(this, "ownedRequestMsgIds", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set(),
      }),
      Object.defineProperty(this, "commIdsMappedToParentWidgetModel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      }),
      Object.defineProperty(this, "streamsReAttachedToExecutingCell", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "registerdCommTargets", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set(),
      }),
      Object.defineProperty(this, "outputsAreSpecificToAWidget", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "versions", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      this.dbtTerminal.debug(
        "NotebookKernelClient",
        "creating python bridge for notebook:",
        e,
      ),
      (this.python = this.executionInfrastructure.createPythonBridge(
        Ve.dirname(e),
      )),
      this.initializeNotebookKernel(e),
      console.log(
        "NotebookKernelClient",
        this.commIdsMappedToParentWidgetModel,
        this.ownedRequestMsgIds,
        this.ownedCommIds,
      );
  }
  async isInitialized() {
    return new Promise((e) => {
      const t = setInterval(() => {
        var n, r;
        this.dbtTerminal.debug(
          "Notebookclient",
          "isInitialized",
          !!((n = this.kernel) != null && n.rawKernel),
        ),
          (r = this.kernel) != null && r.rawKernel && (e(!0), clearInterval(t));
      }, 500);
    });
  }
  async dispose() {
    this.disposables.forEach((e) => e.dispose());
    try {
      await this.python.ex`
        notebook_kernel.close_notebook()
        `;
    } catch (e) {
      this.dbtTerminal.error(
        p.TelemetryEvents["Notebook/KernelCloseError"],
        e.exception.message,
        e,
      );
    }
  }
  get jupyterPackagesVersions() {
    return this.versions;
  }
  async getDependenciesVersion() {
    this.versions = await this.notebookDependencies.getDependenciesVersion();
  }
  async getKernel() {
    return new Promise((e) => {
      const t = setInterval(() => {
        var n;
        this.isInitializing ||
          (e((n = this.kernel) == null ? void 0 : n.rawKernel),
          clearInterval(t));
      }, 500);
    });
  }
  async initializeNotebookKernel(e) {
    try {
      if (
        !(await this.notebookDependencies.validateAndInstallNotebookDependencies())
      )
        return;
      await this.python.ex`
        from altimate_notebook_kernel import AltimateNotebookKernel
        notebook_kernel = AltimateNotebookKernel(${e})
        `;
      const t = await this.python.lock(
          (i) => i`notebook_kernel.get_connection_file()`,
        ),
        n = JSON.parse(pe.readFileSync(t, { encoding: "utf-8" })),
        r = await this.python.lock((i) => i`notebook_kernel.get_session_id()`),
        s = { connection: n, pid: r },
        a = new Ke(s, x(), x(), {
          name: n.kernel_name,
          id: x(),
          language: "python",
          argv: [],
          display_name: n.kernel_name,
          resources: {},
        });
      (this.kernel = a),
        this.disposables.push(
          a.postMessage((i) => this._postMessageEmitter.fire(i)),
        ),
        this.dbtTerminal.log(
          `Notebook Kernel started with PID: ${r} connection: ${JSON.stringify(n)}`,
        ),
        this.getDependenciesVersion();
    } catch (t) {
      let n = t.message;
      t instanceof le.PythonException && (n = t.exception.message),
        this.dbtTerminal.error(
          p.TelemetryEvents["Notebook/KernelInitializationError"],
          n,
          t,
        ),
        u.window.showErrorMessage(n);
    }
    this.isInitializing = !1;
  }
  onKernelSocketResponse(e) {
    var t;
    (t = this.kernel) == null || t.onKernelSocketResponse(e);
  }
  async storeContext(e) {
    this.dbtTerminal.log(`storeContext: ${e}`),
      await this.python.lock((t) => t`notebook_kernel.store_context(${e})`);
  }
  async storeDataInKernel(e, t) {
    try {
      return (
        this.dbtTerminal.log(`storeDataInKernel: ${e}`),
        await this.python.lock(
          (n) =>
            n`notebook_kernel.store_sql_result(${e}, ${JSON.stringify(t)})`,
        ),
        !0
      );
    } catch (n) {
      throw (
        (this.dbtTerminal.error(
          p.TelemetryEvents["Notebook/StoreDataInKernelError"],
          n.exception.message,
          n,
        ),
        n)
      );
    }
  }
  async registerCommTarget(e) {
    if (this.registerdCommTargets.has(e)) {
      this.dbtTerminal.log(`registerCommTarget already registered: ${e}`);
      return;
    }
    this.registerdCommTargets.add(e),
      this.dbtTerminal.log(`registerCommTarget registering: ${e}`);
    const t = await this.getKernel();
    if (!t)
      throw (
        (this.registerdCommTargets.delete(e),
        new Error("Kernel not found for registering comm target"))
      );
    return t.realKernel.registerCommTarget(e, (n, r) => {
      this.dbtTerminal.log(`registerCommTarget registered: ${e}`, n, r);
    });
  }
  async getPythonCodeByType(e, t) {
    return (
      this.dbtTerminal.debug("getPythonCodeByType", e, t),
      await this.python.lock(
        (n) => n`notebook_kernel.get_python_code_by_type(${e}, ${t})`,
      )
    );
  }
  async executePython(e, t, n) {
    return new Promise((r, s) => {
      var i, l;
      if (
        !(
          (l = (i = this.kernel) == null ? void 0 : i.rawKernel) != null &&
          l.realKernel
        )
      ) {
        s(new Error("Kernel not found"));
        return;
      }
      (async () => {
        try {
          const c = t.metadata.cellId;
          this.dbtTerminal.log(`Executing python code in cell: ${c}`, e);
          const m = require("@jupyterlab/services");
          this.dbtTerminal.log(
            "kernel status",
            this.kernel.rawKernel.realKernel.status,
          );
          const h = await this.kernel.rawKernel.realKernel.requestExecute(
            {
              code: e,
              silent: !1,
              stop_on_error: !1,
              allow_stdin: !0,
              store_history: !0,
            },
            !1,
            { cellId: t.document.uri.toString() },
          );
          if (!h) {
            s(new Error("Unknown request error"));
            return;
          }
          h.onReply = (d) => {
            if (t.document.isClosed) {
              h.dispose();
              return;
            }
            const y = d.content;
            y.payload &&
              y.payload.forEach((k) => {
                if (
                  k.data &&
                  Object.prototype.hasOwnProperty.call(k.data, "text/plain")
                ) {
                  const v = this.addToCellData(
                    {
                      output_type: "stream",
                      text: k.data["text/plain"].toString(),
                      name: "stdout",
                      metadata: {},
                      execution_count: y.execution_count,
                    },
                    d,
                    t,
                  );
                  v && n(v);
                }
              });
          };
          const b = [];
          h.done.finally(() => {
            h.dispose(), r(b.filter((d) => !!d));
          }),
            (h.onStdin = (d) => {
              this.dbtTerminal.log("onStdin", d);
            }),
            (h.onIOPub = (d) => {
              if (m.KernelMessage.isCommOpenMsg(d)) this.handleCommOpen(d);
              else if (m.KernelMessage.isExecuteResultMsg(d))
                b.push(this.handleExecuteResult(d, t));
              else if (m.KernelMessage.isExecuteInputMsg(d))
                this.handleExecuteInput(d);
              else if (m.KernelMessage.isStatusMsg(d)) {
                const y = d;
                this.handleStatusMessage(y);
              } else if (m.KernelMessage.isStreamMsg(d)) {
                const y = this.handleStreamMessage(d, t);
                y == null ||
                  y.forEach((k) => {
                    b.push(k);
                  });
              } else
                m.KernelMessage.isDisplayDataMsg(d)
                  ? b.push(this.handleDisplayData(d, t))
                  : m.KernelMessage.isUpdateDisplayDataMsg(d)
                    ? this.handleUpdateDisplayDataMessage(d)
                    : m.KernelMessage.isClearOutputMsg(d)
                      ? this.handleClearOutput(d)
                      : m.KernelMessage.isErrorMsg(d)
                        ? b.push(this.handleError(d, t))
                        : m.KernelMessage.isCommMsgMsg(d)
                          ? this.handleCommMsg(d)
                          : m.KernelMessage.isCommCloseMsg(d) ||
                            this.dbtTerminal.warn(
                              "NotebookUnknownIOPubMessage",
                              `Unknown message ${d.header.msg_type} : hasData=${"data" in d.content}`,
                            );
            });
        } catch (c) {
          s(c);
        }
      })().catch(s);
    });
  }
  handleUpdateDisplayDataMessage(e) {
    if (
      (this.dbtTerminal.log("handleUpdateDisplayDataMessage", e),
      !e.content.transient.display_id)
    ) {
      this.dbtTerminal.warn(
        "NotebookUpdateDisplayDataMessageReceivedButNoDisplayId",
        "Update display data message received, but no display id",
        !1,
        e.content,
      );
      return;
    }
  }
  handleCommOpen(e) {
    var s;
    const t = e.content,
      n = (s = t.data) == null ? void 0 : s.state;
    n &&
      n._model_module === "@jupyter-widgets/output" &&
      n._model_name === "OutputModel" &&
      this.commIdsMappedToWidgetOutputModels.add(t.comm_id);
  }
  handleCommMsg(e) {
    const t = e.content,
      n = t.data,
      r = n.method,
      s = n.state;
    if (r === "update" && s != null && s.msg_id) {
      const a = s.msg_id,
        i = t.comm_id,
        l = this.outputsAreSpecificToAWidget.find(
          (c) => c.handlingCommId === i,
        );
      l
        ? ((l.msgIdsToSwallow = a), (l.clearOutputOnNextUpdateToOutput = !0))
        : this.outputsAreSpecificToAWidget.push({
            handlingCommId: i,
            msgIdsToSwallow: a,
            clearOutputOnNextUpdateToOutput: !0,
          });
    }
  }
  handleExecuteResult(e, t) {
    return this.addToCellData(
      {
        output_type: "execute_result",
        data: e.content.data,
        metadata: e.content.metadata,
        transient: e.content.transient,
        execution_count: e.content.execution_count,
      },
      e,
      t,
    );
  }
  addToCellData(e, t, n) {
    if (e.data && typeof e.data == "object" && z in e.data) {
      const a = e.data[z];
      if (a && "model_id" in a) {
        const i = P.modelIdsOwnedByCells.get(n) || new Set();
        i.add(a.model_id), P.modelIdsOwnedByCells.set(n, i);
      }
    }
    const r = J(e);
    if (n.document.isClosed) return;
    this.dbtTerminal.log(
      n.document.uri.fsPath,
      `Update output with mimes ${r.items.map((a) => a.mime).toString()}`,
    );
    const s = K(t);
    return (
      (this.outputsAreSpecificToAWidget.length &&
        this.outputsAreSpecificToAWidget[
          this.outputsAreSpecificToAWidget.length - 1
        ].msgIdsToSwallow === s &&
        r.items.every((a) => this.canMimeTypeBeRenderedByWidgetManager(a))) ||
        (this.outputsAreSpecificToAWidget.length &&
          this.outputsAreSpecificToAWidget[
            this.outputsAreSpecificToAWidget.length - 1
          ].msgIdsToSwallow === s &&
          this.dbtTerminal.warn("NotebookAddToCellData", "unknown operation")),
      r
    );
  }
  canMimeTypeBeRenderedByWidgetManager(e) {
    const t = e.mime;
    if (t === I.stderr || t === I.stdout || t === I.error) return !0;
    if (t === z) {
      const n = JSON.parse(new TextDecoder().decode(e.data));
      return !(
        typeof n.model_id == "string" &&
        this.commIdsMappedToWidgetOutputModels.has(n.model_id)
      );
    }
    return !t.startsWith("application/vnd");
  }
  handleExecuteInput(e) {}
  handleStatusMessage(e) {}
  handleStreamMessage(e, t) {
    var r;
    if (
      K(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === K(e)
    )
      return;
    const n =
      e.content.name === "stdout"
        ? u.NotebookCellOutputItem.stdout("").mime
        : u.NotebookCellOutputItem.stderr("").mime;
    if (
      (!this.streamsReAttachedToExecutingCell &&
        !this.lastUsedStreamOutput &&
        t.outputs.length &&
        t.outputs[t.outputs.length - 1].items.length >= 1 &&
        t.outputs[t.outputs.length - 1].items.every((s) => s.mime === n) &&
        (this.lastUsedStreamOutput = {
          output: t.outputs[0],
          stream: e.content.name,
        }),
      (this.streamsReAttachedToExecutingCell = !0),
      ((r = this.lastUsedStreamOutput) == null ? void 0 : r.stream) ===
        e.content.name)
    )
      return [
        J({
          output_type: "stream",
          name: e.content.name,
          text: e.content.text,
        }),
        this.lastUsedStreamOutput.output,
      ];
    {
      const s = Ne(G(e.content.text));
      return [J({ output_type: "stream", name: e.content.name, text: s })];
    }
  }
  handleDisplayData(e, t) {
    const n = {
      output_type: "display_data",
      data: Oe(e.content.data),
      metadata: e.content.metadata,
      transient: e.content.transient,
    };
    return this.addToCellData(n, e, t);
  }
  handleClearOutput(e) {
    if (
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === K(e)
    ) {
      e.content.wait &&
        this.outputsAreSpecificToAWidget.length &&
        (this.outputsAreSpecificToAWidget[
          this.outputsAreSpecificToAWidget.length - 1
        ].clearOutputOnNextUpdateToOutput = !0);
      return;
    }
  }
  handleError(e, t) {
    const n = e.content.traceback;
    this.dbtTerminal.log(`Traceback for error ${n}`);
    const r = {
      output_type: "error",
      ename: e.content.ename,
      evalue: e.content.evalue,
      traceback: n,
    };
    return this.addToCellData(r, e, t);
  }
}
Object.defineProperty(P, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
exports.NotebookDependencies = class {
  constructor(e, t, n, r) {
    Object.defineProperty(this, "dbtTerminal", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "telemetry", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "commandProcessExecutionFactory", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "pythonEnvironment", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r,
      });
  }
  async checkPythonDependencies(e) {
    const t = [];
    for (const n of e) {
      const r = ["-m", "pip", "show", n],
        { stderr: s } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: this.pythonEnvironment.pythonPath,
            args: r,
            cwd: p.getFirstWorkspacePath(),
            envVars: this.pythonEnvironment.environmentVariables,
          })
          .completeWithTerminalOutput();
      s && t.push(n);
    }
    return t;
  }
  checkDbtDependencies(e, t) {
    return e
      .map((n) => {
        try {
          return t.findPackageVersion(n), null;
        } catch {
          return n;
        }
      })
      .filter(Boolean);
  }
  async installMissingPythonPackages(e, t) {
    const n = await this.checkPythonDependencies(e);
    if (!n.length) return;
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing python dependencies for notebook",
        n,
      ),
      (await u.window.showInformationMessage(
        `You need the following python packages to use this notebook: ${n.join(", ")}`,
        "Install",
        "Cancel",
      )) !== "Install")
    )
      throw (
        (this.telemetry.sendTelemetryEvent(
          p.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
        ),
        new Error("User cancelled python package installation"))
      );
    return (
      this.dbtTerminal.debug("Notebook", "installing required dependencies", n),
      await u.window.withProgress(
        {
          title: "Installing python packages...",
          location: u.ProgressLocation.Notification,
          cancellable: !1,
        },
        async () => {
          try {
            const s = ["-m", "pip", "install", ...n],
              { stdout: a, stderr: i } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: s,
                    cwd: p.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !a.includes("Successfully installed") &&
              !a.includes("Requirement already satisfied") &&
              i
            )
              throw new Error(i);
            return (
              this.dbtTerminal.log(
                "Notebook dependencies have been installed successfully.",
              ),
              this.telemetry.sendTelemetryEvent(
                p.TelemetryEvents["Notebook/DependenciesInstalled"],
              ),
              await t.initialize(),
              !0
            );
          } catch (s) {
            this.telemetry.sendTelemetryError(
              p.TelemetryEvents["Notebook/DependenciesInstallError"],
              s,
            ),
              u.window.showErrorMessage(
                p.extendErrorWithSupportLinks(s.message),
              );
          }
        },
      )
    );
  }
  async installMissingDbtPackages(e, t) {
    const n = this.checkDbtDependencies(
      e.map((a) => `${a.name}`),
      t,
    );
    if (!n.length) return;
    const r = e.filter((a) => (a.name ? n.includes(a.name) : !1));
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing dbt dependencies for notebook",
        r,
      ),
      (await u.window.showInformationMessage(
        `You need following dbt packages to use this notebook: ${r.map((a) => `${a.package}`).join(", ")}`,
        "Install",
        "Cancel",
      )) !== "Install")
    )
      throw (
        (this.telemetry.sendTelemetryEvent(
          p.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
        ),
        new Error("User cancelled dbt package installation"))
      );
    return await u.window.withProgress(
      {
        title: "Installing dbt packages...",
        location: u.ProgressLocation.Notification,
        cancellable: !1,
      },
      async () => {
        try {
          const a = r.map((l) => `${l.package}@${l.version}`);
          this.dbtTerminal.debug("Notebook", "installing dbt packages", a),
            await t.installDbtPackages(a),
            await t.initialize();
          const i = this.checkDbtDependencies(
            e.map((l) => `${l.name}`),
            t,
          );
          if (i.length)
            throw new Error(`Failed to install dbt packages ${i.join(", ")}`);
          return (
            this.dbtTerminal.log(
              "Notebook dependencies have been installed successfully.",
            ),
            this.telemetry.sendTelemetryEvent(
              p.TelemetryEvents["Notebook/DependenciesInstalled"],
            ),
            !0
          );
        } catch (a) {
          this.telemetry.sendTelemetryError(
            p.TelemetryEvents["Notebook/DependenciesInstallError"],
            a,
          ),
            u.window.showErrorMessage(p.extendErrorWithSupportLinks(a.message));
        }
      },
    );
  }
  async verifyAndInstallDependenciesIfNeeded(e, t) {
    this.dbtTerminal.debug(
      "NotebookDependencies",
      "verifying required dependencies",
      e,
    ),
      await Promise.all([
        this.validateAndInstallNotebookDependencies(),
        this.installMissingPythonPackages(
          e.filter((n) => n.type === "python").map((n) => n.package),
          t,
        ),
        this.installMissingDbtPackages(
          e.filter((n) => n.type === "dbt"),
          t,
        ),
      ]);
  }
  async getDependenciesVersion() {
    const e = ["-m", "jupyter", "--version"],
      { stdout: t, stderr: n } = await this.commandProcessExecutionFactory
        .createCommandProcessExecution({
          command: this.pythonEnvironment.pythonPath,
          args: e,
          cwd: p.getFirstWorkspacePath(),
          envVars: this.pythonEnvironment.environmentVariables,
        })
        .completeWithTerminalOutput();
    if (
      !t.includes("Successfully installed") &&
      !t.includes("Requirement already satisfied") &&
      n
    )
      throw new Error(n);
    const r = t.split(`
`),
      s = {};
    return (
      r.forEach((a) => {
        const [i, l] = a.split(":").map((c) => c.trim());
        i && l && (s[i] = l);
      }),
      s
    );
  }
  async validateAndInstallNotebookDependencies() {
    try {
      if (await this.notebookDependenciesAreInstalled())
        return (
          this.dbtTerminal.log("Notebook dependencies are already installed."),
          !0
        );
      if (
        (await u.window.showInformationMessage(
          "You need [ipykernel](https://pypi.org/project/ipykernel/) and [jupyter_client](https://github.com/jupyter/jupyter_client) to use the notebook",
          "Install",
          "Cancel",
        )) !== "Install"
      )
        return (
          this.telemetry.sendTelemetryEvent(
            p.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
          ),
          !1
        );
      (await u.window.withProgress(
        {
          title: "Installing required dependencies...",
          location: u.ProgressLocation.Notification,
          cancellable: !1,
        },
        async () => {
          try {
            const n = [
                "-m",
                "pip",
                "install",
                "ipykernel",
                "jupyter_client",
                "jupyter_contrib_nbextensions",
                "ipywidgets",
              ],
              { stdout: r, stderr: s } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: n,
                    cwd: p.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !r.includes("Successfully installed") &&
              !r.includes("Requirement already satisfied") &&
              s
            )
              throw new Error(s);
            return (
              this.dbtTerminal.log(
                "Notebook dependencies have been installed successfully.",
              ),
              this.telemetry.sendTelemetryEvent(
                p.TelemetryEvents["Notebook/DependenciesInstalled"],
              ),
              !0
            );
          } catch (n) {
            return (
              this.telemetry.sendTelemetryError(
                p.TelemetryEvents["Notebook/DependenciesInstallError"],
                n,
              ),
              u.window.showErrorMessage(
                p.extendErrorWithSupportLinks(n.message),
              ),
              !1
            );
          }
        },
      )) &&
        (await u.window.showInformationMessage(
          "Notebook dependencies installed. Please reload the window to use the notebook.",
          "Reload Window",
        )) === "Reload Window" &&
        u.commands.executeCommand("workbench.action.reloadWindow");
    } catch (e) {
      throw (
        (this.dbtTerminal.error(
          p.TelemetryEvents["Notebook/DependenciesInstallError"],
          e.message,
          e,
        ),
        e)
      );
    }
  }
  async notebookDependenciesAreInstalled() {
    try {
      const e =
          this.commandProcessExecutionFactory.createCommandProcessExecution({
            command: this.pythonEnvironment.pythonPath,
            args: ["-c", "import jupyter_client"],
            cwd: p.getFirstWorkspacePath(),
            envVars: this.pythonEnvironment.environmentVariables,
          }),
        { stderr: t } = await e.complete();
      if (t) throw new Error(t);
      return !0;
    } catch {
      return !1;
    }
  }
};
exports.NotebookDependencies = L(
  [
    $(0, p.inject("DBTTerminal")),
    q("design:paramtypes", [
      p.DBTTerminal,
      p.TelemetryService,
      p.CommandProcessExecutionFactory,
      p.PythonEnvironment,
    ]),
  ],
  exports.NotebookDependencies,
);
let te = class {
  constructor(e, t, n) {
    Object.defineProperty(this, "executionInfrastructure", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "notebookDependencies", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "clientMap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      });
  }
  async initializeNotebookClient(e) {
    if (!this.clientMap.has(e.fsPath)) {
      this.dbtTerminal.debug(
        "ClientMapper",
        "initializing notebook client",
        e.fsPath,
      );
      const t = new P(
        e.fsPath,
        this.executionInfrastructure,
        this.notebookDependencies,
        this.dbtTerminal,
      );
      this.clientMap.set(
        e.fsPath,
        new Promise((n) => {
          t.getKernel().then(() => n(t));
        }),
      );
    }
    return this.clientMap.get(e.fsPath);
  }
  getNotebookClient(e) {
    if (!this.clientMap.has(e.fsPath))
      throw new Error("Notebook client not initialized");
    return this.clientMap.get(e.fsPath);
  }
};
te = L(
  [
    $(2, p.inject("DBTTerminal")),
    q("design:paramtypes", [
      p.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      p.DBTTerminal,
    ]),
  ],
  te,
);
const ze = ["python", "sql", "jinja-sql"],
  Ge = "jinja-sql",
  ue = ".notebook",
  ce = "datapilot",
  A = "datapilot-notebook",
  He = require("path");
exports.DatapilotNotebookController = class {
  constructor(e, t, n, r, s, a) {
    Object.defineProperty(this, "clientMapper", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "queryManifestService", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "telemetry", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r,
      }),
      Object.defineProperty(this, "notebookDependencies", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s,
      }),
      Object.defineProperty(this, "altimate", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: a,
      }),
      Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "DatapilotNotebookController",
      }),
      Object.defineProperty(this, "label", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Datapilot",
      }),
      Object.defineProperty(this, "_onNotebookCellEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new u.EventEmitter(),
      }),
      Object.defineProperty(this, "onNotebookCellChangeEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: this._onNotebookCellEvent.event,
      }),
      Object.defineProperty(this, "disposables", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [this._onNotebookCellEvent],
      }),
      Object.defineProperty(this, "associatedNotebooks", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set(),
      }),
      Object.defineProperty(this, "executionOrder", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "controller", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "getRandomString", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: () => (Math.random() + 1).toString(36).substring(7),
      }),
      (this.controller = u.notebooks.createNotebookController(
        this.id,
        A,
        this.label,
      )),
      (this.controller.supportedLanguages = ze),
      (this.controller.supportsExecutionOrder = !0),
      (this.controller.executeHandler = this._executeAll.bind(this)),
      this.disposables.push(
        u.workspace.onDidChangeNotebookDocument((i) => {
          i.contentChanges.forEach(async (l) => {
            l.addedCells &&
              (await this.updateCellId(i.notebook.getCells(), i.notebook)),
              l.removedCells &&
                l.removedCells.forEach((c) => {
                  this._onNotebookCellEvent.fire({
                    cellId: c.metadata.cellId,
                    notebook: i.notebook.uri.fsPath,
                    result: void 0,
                    event: "delete",
                    fragment: c.document.uri.fragment,
                    languageId: c.document.languageId,
                  });
                });
          });
        }),
      ),
      this.disposables.push(this.controller),
      this.controller.onDidChangeSelectedNotebooks(
        this.onDidChangeSelectedNotebooks,
        this,
        this.disposables,
      ),
      this.disposables.push(
        u.workspace.onDidOpenNotebookDocument(async (i) => {
          await this.onNotebookOpen(i);
        }),
      ),
      this.disposables.push(
        u.workspace.onDidCloseNotebookDocument(async (i) => {
          await this.onNotebookClose(i);
        }),
      );
  }
  async getNotebookByTemplate(e) {
    var n;
    return (
      this.dbtTerminal.debug("Notebook", "getting notebook by template", e),
      e
        ? (n = (await this.altimate.getPreConfiguredNotebooks()).find(
            (r) => r.name === e,
          )) == null
          ? void 0
          : n.data
        : (this.dbtTerminal.debug("Notebook", "sending blank notebook"),
          {
            cells: [
              {
                cell_type: u.NotebookCellKind.Markup,
                source: [
                  "### Welcome to your new dbt Power User Notebook!",
                  "> Note: Remember, you can delete any or all of these example cells to start fresh with your own work. Enjoy exploring and analyzing your data!",
                  "#### Documentation and Feedback",
                  "For more detailed information on how to use this notebook and the dbt Power User extension, please refer to our documentation:",
                  "[dbt Power User Documentation](https://docs.myaltimate.com/govern/notebooks/)",
                  "  ",
                  "We value your feedback! If you have any suggestions, encounter issues, or want to share your experience, please let us know:",
                  "[Share Feedback](https://docs.google.com/forms/d/e/1FAIpQLScwN3wRTAniQzvcO6Hn3jC0WtBoFE2NP4X_6qGQ09IZKZ3Ojw/viewform?usp=sf_link)",
                  "  ",
                  "Happy analyzing with your new dbt Power User Notebook!",
                  "  ",
                  "This notebook allows you to combine Jinja SQL queries, Python code, and Markdown text. Let's explore each of these features.",
                  "##### 1. Jinja SQL Queries",
                  "You can write and execute Jinja SQL queries directly in this notebook. Here's an example:",
                ],
                languageId: "markdown",
                metadata: {},
              },
              {
                cell_type: u.NotebookCellKind.Code,
                source: [
                  "select * from {{ ref('your_model_name') }}",
                  "{# Replace 'your_model_name' with the name of your dbt model. #}",
                ],
                languageId: Ge,
                metadata: { cellId: "jinja_sql_0" },
              },
              {
                cell_type: u.NotebookCellKind.Markup,
                source: [
                  "##### 2. Python Code",
                  "You can also write and execute Python code on top of the results of previous `jinja-sql` cell in this notebook. Here's a simple example:",
                ],
                languageId: "markdown",
                metadata: {},
              },
              {
                cell_type: u.NotebookCellKind.Code,
                source: [
                  "import pandas as pd",
                  "from IPython.display import display, HTML",
                  "from ydata_profiling import ProfileReport",
                  "from io import StringIO",
                  "",
                  "# Extract the data field",
                  "# NOTE: we use the cell id from previous cell to extract the data",
                  "data = cell_jinja_sql_0['data']",
                  "",
                  "# Create a DataFrame",
                  "df = pd.DataFrame(data)",
                  "",
                  "# Display the DataFrame",
                  "# display(HTML(df.to_html()))",
                  "",
                  'profile = ProfileReport(df, title="Profiling Report")',
                  "profile.to_notebook_iframe()",
                ],
                languageId: "python",
                metadata: {},
              },
              {
                cell_type: u.NotebookCellKind.Markup,
                source: [
                  "This Python code creates a profile report of your query results. You can customize the code to suit your needs.",
                  "##### 3. Markdown Text",
                  "As you can see, you can use Markdown to structure your notebook with headings, lists, and more. You can also use it to add explanations and documentation to your queries and code.",
                  "##### Tips for Using This Notebook",
                  "- Use Jinja cells for your dbt model queries and data exploration",
                  "- Use Python cells for data analysis, visualization, and custom transformations. The jinja data can be referenced using the cell id",
                  "- Use Markdown cells to explain your process, document your findings, and create a narrative for your analysis",
                ],
                languageId: "markdown",
                metadata: {},
              },
            ],
          })
    );
  }
  async modelTestSuggestions(e) {
    this.dbtTerminal.log("modelTestSuggestions", e);
  }
  async generateDbtSourceYaml(e) {
    this.dbtTerminal.log("generateDbtSourceYaml", e);
  }
  async generateDbtDbtModelSql(e) {
    this.dbtTerminal.log("generateDbtDbtModelSql", e);
  }
  async generateDbtDbtModelYaml(e) {
    this.dbtTerminal.log("generateDbtDbtModelYaml", e);
  }
  async generateDbtDbtModelCTE(e) {
    this.dbtTerminal.log("generateDbtDbtModelCTE", e);
  }
  async extractExposuresFromMetabase(e) {
    this.dbtTerminal.log("extractExposuresFromMetabase", e);
  }
  async extractExposuresFromTableau(e) {
    this.dbtTerminal.log("extractExposuresFromTableau", e);
  }
  async getFileName(e, t) {
    if (e) return e;
    const n = fe();
    if (
      (
        await this.altimate.addNotebook({
          name: n,
          description: "",
          data: t
            ? { ...t, metadata: { ...(t.metadata || {}), isDraft: !0 } }
            : {},
          tags_list: [],
        })
      ).ok &&
      (await this.altimate.getNotebooks(n)).length > 0
    )
      return n;
  }
  async createNotebook(e) {
    var a;
    const {
      notebookId: t,
      template: n,
      context: r = {},
      notebookSchema: s,
    } = e || {};
    if (
      (this.dbtTerminal.info(
        p.TelemetryEvents["Notebook/Launch"],
        "creating notebook",
        !0,
        e,
      ),
      !r.model &&
        (a = u.window.activeTextEditor) != null &&
        a.document.uri.fsPath.endsWith(".sql"))
    ) {
      const i = He.basename(
          u.window.activeTextEditor.document.uri.fsPath,
          ".sql",
        ),
        l = u.window.activeTextEditor.document.getText();
      (r.model = i), (r.query = l);
    }
    u.window.withProgress(
      {
        location: u.ProgressLocation.Notification,
        title: "Launching notebook...",
        cancellable: !1,
      },
      async () => {
        var i;
        try {
          const l = s || (t ? null : await this.getNotebookByTemplate(n)),
            c = await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!c) {
            u.window.showErrorMessage("No dbt project selected.");
            return;
          }
          if (
            ((i = l == null ? void 0 : l.metadata) != null &&
              i.dependencies &&
              (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
                l.metadata.dependencies,
                c,
              )),
            r && l)
          )
            for (const d in r)
              Object.prototype.hasOwnProperty.call(r, d) &&
                typeof r[d] == "string" &&
                (l.cells[0].source = l.cells[0].source.map((y) =>
                  y.replace(`%_${d}_%`, r[d]),
                ));
          const m = await this.getFileName(t, l),
            h = u.Uri.parse(`${c.projectRoot}/${m}${ue}`).with({ scheme: ce });
          this.dbtTerminal.debug("Notebook", "opening notebook", h);
          const b = await u.workspace.openNotebookDocument(h);
          await u.window.showNotebookDocument(b);
        } catch (l) {
          const c =
            l instanceof le.PythonException ? l.exception.message : l.message;
          this.dbtTerminal.error(
            `${p.TelemetryEvents["Notebook/LaunchError"]}`,
            c,
            l,
          ),
            u.window.showErrorMessage(p.extendErrorWithSupportLinks(c));
        }
      },
    );
  }
  sendMessageToPreloadScript(e) {}
  genUniqueId(e) {
    return `${e.document.languageId.replace(/-/g, "_")}_${this.getRandomString()}`;
  }
  async updateCellId(e, t) {
    if (
      !!!u.window.visibleNotebookEditors.find(
        (s) => s.notebook.uri.fsPath === t.uri.fsPath,
      )
    )
      return;
    const r = [];
    if (
      (e.forEach((s) => {
        let a = s.metadata.cellId;
        if (!a) {
          a = this.genUniqueId(s);
          const i = { ...s.metadata, cellId: a },
            l = u.NotebookEdit.updateCellMetadata(s.index, i);
          r.push(l);
        }
        this._onNotebookCellEvent.fire({
          cellId: a,
          notebook: t.uri.fsPath,
          event: "update",
          fragment: s.document.uri.fragment,
          languageId: s.document.languageId,
        });
      }),
      r.length > 0)
    ) {
      const s = new u.WorkspaceEdit();
      s.set(t.uri, r), await u.workspace.applyEdit(s);
    }
  }
  async onNotebookClose(e) {
    if (e.notebookType !== A) return;
    const t = await this.clientMapper.getNotebookClient(e.uri);
    t && t.dispose(),
      this.dbtTerminal.debug(
        "Notebookcontroller",
        `notebook closed: ${e.uri.fsPath}`,
        e.isUntitled,
      ),
      e.isUntitled && (await u.workspace.fs.delete(e.uri));
  }
  async onDidChangeSelectedNotebooks({ notebook: e, selected: t }) {
    this.dbtTerminal.debug(
      "Notebookcontroller",
      `notebook controller selected: ${e.uri.fsPath}`,
      t,
    );
    const n = e.uri.toString();
    t ? this.associatedNotebooks.add(n) : this.associatedNotebooks.delete(n);
  }
  async onNotebookOpen(e) {
    var s;
    if (e.notebookType !== A) return;
    this.controller.updateNotebookAffinity(
      e,
      u.NotebookControllerAffinity.Default,
    ),
      this.dbtTerminal.debug(
        "Notebookcontroller",
        `notebook open and controller associated: ${e.uri.fsPath}`,
      );
    const t = await this.clientMapper.initializeNotebookClient(e.uri),
      n = await t.getKernel();
    if (!(n != null && n.realKernel))
      throw new Error("Unable to initialize kernel");
    this.disposables.push(
      t.postMessage((a) => {
        this.sendMessageToPreloadScript(a);
      }, this),
    );
    const r = e.getCells();
    await this.updateCellId(r, e);
    try {
      await this.waitForControllerAssociation(e);
    } catch {
      this.dbtTerminal.warn(
        "Notebookcontroller",
        `Controller association timeout for ${e.uri.fsPath}. Proceeding anyway.`,
      ),
        this.associatedNotebooks.add(e.uri.toString());
    }
    (s = e.metadata) != null &&
      s.autoRun &&
      (await this._executeAll(e.getCells(), e, this.controller));
  }
  async waitForControllerAssociation(e, t = 2e3) {
    const n = Date.now();
    for (; !this.isControllerAssociatedWithNotebook(e); ) {
      if (Date.now() - n > t)
        throw new Error("Timeout waiting for controller association");
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  isControllerAssociatedWithNotebook(e) {
    return this.associatedNotebooks.has(e.uri.toString());
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
  async _executeAll(e, t, n) {
    var a, i;
    const r = await this.queryManifestService.getOrPickProjectFromWorkspace();
    if (!r) {
      u.window.showErrorMessage("No dbt project selected.");
      return;
    }
    (a = t.metadata) != null &&
      a.dependencies &&
      (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
        t.metadata.dependencies,
        r,
      ));
    const s = await this.clientMapper.getNotebookClient(t.uri);
    await this.updateContextVariablesInKernel(r, s, e[0]);
    for (const l of e)
      await this._doExecution(
        l,
        t,
        (i = t.metadata) == null ? void 0 : i.isUserNotebook,
        n,
        r,
        s,
      );
  }
  filterIPyWidgets(e, t = !1) {
    return e.map((n) => {
      const s = n.items.find(
        (a) => a.mime === "application/vnd.jupyter.widget-view+json",
      )
        ? t
          ? [u.NotebookCellOutputItem.text("IPyWidgets not supported")]
          : []
        : n.items;
      return new u.NotebookCellOutput(s);
    });
  }
  updateContextVariablesInKernel(e, t, n) {
    return t.executePython(
      `
manifest_path="${e.getManifestPath()}"
project_name="${e.getProjectName()}"
            `,
      n,
      () => {},
    );
  }
  async _doExecution(e, t, n, r, s, a) {
    this.dbtTerminal.debug("Notebook", "executing cell", e.index, t.uri.fsPath);
    let i;
    try {
      const l = [];
      switch (
        ((i = r.createNotebookCellExecution(e)),
        (i.executionOrder = ++this.executionOrder),
        i.start(Date.now()),
        i.token.onCancellationRequested((c) => {
          i == null || i.end(!0, Date.now());
        }),
        i.clearOutput(),
        e.document.languageId)
      ) {
        case "markdown":
          break;
        case "python":
          {
            this.telemetry.startTelemetryEvent(
              p.TelemetryEvents["Notebook/Execute"],
              { language: e.document.languageId },
            );
            const c = await (a == null
              ? void 0
              : a.executePython(e.document.getText(), e, (m) => {
                  i == null || i.appendOutput(this.filterIPyWidgets([m], n));
                }));
            c && i.appendOutput(this.filterIPyWidgets(c, n));
          }
          break;
        case "jinja-sql":
        case "sql":
          {
            this.dbtTerminal.debug(
              "Notebook",
              "executing sql",
              e.document.getText(),
            ),
              this.telemetry.startTelemetryEvent(
                p.TelemetryEvents["Notebook/Execute"],
                { language: e.document.languageId },
              );
            const { metadata: c } = e;
            if ((c == null ? void 0 : c.execution_type) === "compile") {
              const m = await s.unsafeCompileQuery(e.document.getText());
              i.appendOutput(
                new u.NotebookCellOutput([
                  u.NotebookCellOutputItem.text(
                    m,
                    c == null ? void 0 : c.output_mime_type,
                  ),
                ]),
              );
            } else {
              const m = await s.executeSQL(e.document.getText(), "", !0);
              this._onNotebookCellEvent.fire({
                cellId: e.metadata.cellId,
                notebook: t.uri.fsPath,
                result: m,
                event: "add",
                languageId: e.document.languageId,
              }),
                n ||
                  (l.push(
                    u.NotebookCellOutputItem.json(
                      m,
                      "application/perspective-json",
                    ),
                  ),
                  i.appendOutput(new u.NotebookCellOutput(l))),
                await a.storeDataInKernel(e.metadata.cellId, m);
            }
          }
          break;
        default:
          u.window.showErrorMessage(
            `Language: ${e.document.languageId} not supported`,
          );
          break;
      }
      this.telemetry.endTelemetryEvent(p.TelemetryEvents["Notebook/Execute"], {
        language: e.document.languageId,
      }),
        i.end(!0, Date.now());
    } catch (l) {
      this.dbtTerminal.error(
        "Notebook",
        `Error executing cell: ${l.message}`,
        l,
        !1,
      ),
        i == null ||
          i.replaceOutput([
            new u.NotebookCellOutput([u.NotebookCellOutputItem.error(l)]),
          ]),
        this.telemetry.endTelemetryEvent(
          p.TelemetryEvents["Notebook/Execute"],
          l,
          { language: e.document.languageId },
        ),
        i == null || i.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = L(
  [
    $(3, p.inject("DBTTerminal")),
    q("design:paramtypes", [
      te,
      p.QueryManifestService,
      p.TelemetryService,
      p.DBTTerminal,
      exports.NotebookDependencies,
      p.AltimateRequest,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class Ye {
  constructor() {
    Object.defineProperty(this, "_disposables", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: [],
    });
  }
  dispose() {
    this._disposables.forEach((e) => e.dispose());
  }
  provideCellStatusBarItems(e) {
    if (e.document.languageId !== "jinja-sql") return;
    const t = new u.NotebookCellStatusBarItem(
      "$(globe) Profile your query",
      u.NotebookCellStatusBarAlignment.Left,
    );
    return (
      (t.command = "dbtPowerUser.datapilotProfileYourQuery"),
      (t.tooltip = "Profile your query"),
      []
    );
  }
}
const ie = require("path");
exports.NotebookFileSystemProvider = class {
  constructor(e, t) {
    Object.defineProperty(this, "dbtTerminal", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "altimate", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "_emitter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new u.EventEmitter(),
      }),
      Object.defineProperty(this, "onDidChangeFile", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: this._emitter.event,
      }),
      Object.defineProperty(this, "notebookDataMap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      });
  }
  watch(e, t) {
    return new u.Disposable(() => {});
  }
  stat(e) {
    return {
      type: u.FileType.File,
      ctime: Date.now(),
      mtime: Date.now(),
      size: 0,
    };
  }
  readDirectory(e) {
    return [];
  }
  createDirectory(e) {}
  async getNotebookData(e) {
    if (this.notebookDataMap.has(e)) return this.notebookDataMap.get(e);
    const t = (await this.altimate.getNotebooks(e)) || [];
    return t.length ? t[0] : null;
  }
  async readFile(e) {
    const t = this.getFileNameFromUri(e),
      n = await this.getNotebookData(t),
      r = (n == null ? void 0 : n.data) || {};
    return (
      "cells" in r &&
        "metadata" in r &&
        (r.metadata
          ? (r.metadata = { ...r.metadata, id: n == null ? void 0 : n.id })
          : (r.metadata = { id: n == null ? void 0 : n.id })),
      n && this.notebookDataMap.set(t, n),
      new TextEncoder().encode(JSON.stringify(r))
    );
  }
  async writeFile(e, t, n) {
    await this.customSave(e, t);
  }
  delete(e, t) {
    const n = e.with({ path: ie.posix.dirname(e.path) });
    this._emitter.fire([
      { type: u.FileChangeType.Changed, uri: n },
      { uri: e, type: u.FileChangeType.Deleted },
    ]);
  }
  rename(e, t, n) {
    this._emitter.fire([
      { type: u.FileChangeType.Deleted, uri: e },
      { type: u.FileChangeType.Created, uri: t },
    ]);
  }
  getFileNameFromUri(e) {
    return ie.basename(e.fsPath, ue);
  }
  async customSave(e, t) {
    var n;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const r =
        (n = u.window.activeNotebookEditor) == null ? void 0 : n.notebook;
      if (!r)
        return (
          this.dbtTerminal.warn(
            p.TelemetryEvents["Notebook/SaveError"],
            "No active notebook found",
          ),
          !1
        );
      this.dbtTerminal.log("saving notebook", r);
      const { name: s } = r.metadata;
      return (
        await this.saveNotebook(r, s),
        this._emitter.fire([{ type: u.FileChangeType.Changed, uri: e }]),
        !0
      );
    } catch (r) {
      this.dbtTerminal.error(
        p.TelemetryEvents["Notebook/SaveError"],
        r.message,
        r,
      ),
        u.window.showErrorMessage(
          p.extendErrorWithSupportLinks(
            `Failed to save notebook. Error: ${r.message}`,
          ),
        );
    }
    return !1;
  }
  async saveNotebook(e, t) {
    try {
      const n = Z(e, t);
      this.dbtTerminal.log("saving notebook", t, n),
        await this.altimate.updateNotebook(e.metadata.id, {
          name: t,
          description: "",
          data: n,
          tags_list: [],
        }),
        this.dbtTerminal.log("notebook saved", t, n);
      const r = this.getFileNameFromUri(e.uri),
        s = this.notebookDataMap.get(r);
      return s && ((s.data = Z(e, t, !0)), this.notebookDataMap.set(r, s)), n;
    } catch (n) {
      this.dbtTerminal.error(
        p.TelemetryEvents["Notebook/SaveError"],
        n.message,
        n,
      ),
        u.window.showErrorMessage(
          p.extendErrorWithSupportLinks(
            `Failed to save notebook. Error: ${n.message}`,
          ),
        );
    }
  }
};
exports.NotebookFileSystemProvider = L(
  [
    $(0, p.inject("DBTTerminal")),
    q("design:paramtypes", [p.DBTTerminal, p.AltimateRequest]),
  ],
  exports.NotebookFileSystemProvider,
);
class Je {
  constructor(e) {
    Object.defineProperty(this, "notebookKernel", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "disposables", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "cellByNotebookAutocompleteMap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      }),
      this.disposables.push(
        this.notebookKernel.onNotebookCellChangeEvent((t) => {
          this.onNotebookCellChanged(t);
        }),
      );
  }
  dispose() {
    for (; this.disposables.length; ) {
      const e = this.disposables.pop();
      e && e.dispose();
    }
  }
  getCellByNotebookAutocompleteMap() {
    return this.cellByNotebookAutocompleteMap;
  }
  onNotebookCellChanged(e) {
    if (!e.fragment) return;
    const t = {
        cellId: e.cellId,
        fragment: e.fragment,
        languageId: e.languageId,
      },
      n = this.cellByNotebookAutocompleteMap.get(e.notebook) || [];
    switch (e.event) {
      case "add":
      case "update":
        this.cellByNotebookAutocompleteMap.set(e.notebook, [
          ...n.filter((r) => r.cellId !== e.cellId),
          t,
        ]);
        break;
      case "delete":
        this.cellByNotebookAutocompleteMap.set(
          e.notebook,
          n.filter((r) => r.cellId !== e.cellId),
        );
        break;
    }
  }
}
const Qe = {
  notebooks: [
    {
      name: "Profile your query",
      description: "Notebook to profile your query",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      id: "1",
      data: {
        cells: [
          {
            cell_type: u.NotebookCellKind.Code,
            source: ["{{context.query}}"],
            languageId: "jinja-sql",
            metadata: { cellId: "jinja_sql_cu6pt" },
          },
          {
            cell_type: u.NotebookCellKind.Code,
            source: [
              "import pandas as pd",
              "from IPython.display import display, HTML",
              "from ydata_profiling import ProfileReport",
              "from io import StringIO",
              "",
              "# Extract the data field",
              "data = cell_jinja_sql_cu6pt['data']",
              "",
              "# Create a DataFrame",
              "df = pd.DataFrame(data)",
              "",
              "# Display the DataFrame",
              "# display(HTML(df.to_html()))",
              "",
              'profile = ProfileReport(df, title="Profiling Report")',
              "profile.to_notebook_iframe()",
            ],
            languageId: "python",
            metadata: {},
          },
        ],
        metadata: { dependencies: ["pandas", "ydata_profiling"], autoRun: !0 },
      },
      tags: ["profile"],
    },
  ],
};
exports.NotebookProviders = class {
  constructor(e, t, n, r) {
    Object.defineProperty(this, "notebookProvider", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "notebookController", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "notebookFileSystemProvider", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r,
      }),
      Object.defineProperty(this, "disposables", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      this.disposables.push(
        u.workspace.onDidChangeConfiguration((s) => {
          s.affectsConfiguration("dbt.enableNotebooks") &&
            this.bindNotebookActions();
        }),
      ),
      this.bindNotebookActions();
  }
  bindNotebookActions() {
    u.workspace.getConfiguration("dbt").get("enableNotebooks", !1) &&
      (this.dbtTerminal.log("Notebooks enabled, binding actions"),
      this.disposables.push(
        u.notebooks.registerNotebookCellStatusBarItemProvider(A, new Ye()),
        u.workspace.registerNotebookSerializer(A, this.notebookProvider, {}),
        this.notebookController,
      ),
      this.disposables.push(
        u.workspace.registerFileSystemProvider(
          ce,
          this.notebookFileSystemProvider,
          { isCaseSensitive: !0, isReadonly: !1 },
        ),
      ));
  }
  dispose() {
    for (; this.disposables.length; ) {
      const e = this.disposables.pop();
      e && e.dispose();
    }
  }
};
exports.NotebookProviders = L(
  [
    $(3, p.inject("DBTTerminal")),
    q("design:paramtypes", [
      ye,
      exports.DatapilotNotebookController,
      exports.NotebookFileSystemProvider,
      p.DBTTerminal,
    ]),
  ],
  exports.NotebookProviders,
);
const F = (o) => (o === "bigquery" ? "RAND" : "RANDOM"),
  R = async (o, e) => {
    const t = await e(o);
    return (t == null ? void 0 : t.data) || [];
  },
  W = (o, e, t) =>
    o.filter((n) => !e.includes(n.column) && !t.includes(n.dtype)),
  Xe = (o) => ["timestamp", "date"].includes(o.dtype.toLowerCase()),
  Ze = (o) =>
    [
      "char",
      "character",
      "varchar",
      "string",
      "text",
      "nchar",
      "nvarchar",
      "variant",
      "character varying",
      "citext",
      "name",
      "json",
      "jsonb",
      "bstring",
      "bpchar",
      "tinytext",
      "mediumtext",
      "longtext",
      "enum",
    ].includes(o.dtype.toLowerCase()),
  et = (o) => {
    const e = [
        "int",
        "integer",
        "bigint",
        "smallint",
        "tinyint",
        "decimal",
        "numeric",
        "float",
        "real",
        "double",
        "number",
      ],
      t = o.dtype.toLowerCase();
    return e.some((n) => t.includes(n));
  },
  D = (o) => Number(o),
  B = (o = {}, e) => {
    if (!o) return e || {};
    if (!e) return o;
    const t = {},
      n = [...new Set([...Object.keys(o), ...Object.keys(e)])].filter((r) =>
        ["models", "sources", "seeds"].includes(r),
      );
    for (const r of n) {
      if (!o[r]) {
        t[r] = e[r];
        continue;
      }
      if (!e[r]) {
        t[r] = o[r];
        continue;
      }
      const s = o[r] || [],
        a = e[r] || [],
        i = new Map(s.map((h) => [h.name, h])),
        l = new Map(a.map((h) => [h.name, h])),
        m = [
          ...new Set([...s.map((h) => h.name), ...a.map((h) => h.name)]),
        ].map((h) => {
          var f, N, _, T;
          const b = i.get(h),
            d = l.get(h),
            y = [
              ...((b == null ? void 0 : b.tests) || []),
              ...((d == null ? void 0 : d.tests) || []),
            ],
            k = new Map(
              ((f = b == null ? void 0 : b.columns) == null
                ? void 0
                : f.map((g) => [g.name, g])) || [],
            ),
            v = new Map(
              ((N = d == null ? void 0 : d.columns) == null
                ? void 0
                : N.map((g) => [g.name, g])) || [],
            ),
            w = [
              ...new Set([
                ...(((_ = b == null ? void 0 : b.columns) == null
                  ? void 0
                  : _.map((g) => g.name)) || []),
                ...(((T = d == null ? void 0 : d.columns) == null
                  ? void 0
                  : T.map((g) => g.name)) || []),
              ]),
            ].map((g) => {
              const C = k.get(g),
                S = v.get(g);
              return C
                ? S
                  ? {
                      ...C,
                      ...S,
                      name: g,
                      tests: [...(C.tests || []), ...(S.tests || [])],
                    }
                  : C
                : S;
            }),
            E = { name: h, columns: w };
          return y.length > 0 && (E.tests = y), E;
        });
      t[r] = m;
    }
    return t;
  };
class U {
  constructor(e, t) {
    Object.defineProperty(this, "quote", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "adapter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "queryFn", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.quote = (n, r) =>
        r ? `adapter.quote('${n}')` : `{{adapter.quote('${n}')}}`),
      (this.adapter = e),
      (this.queryFn = t);
  }
}
class tt extends U {
  async generateRangeTests({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    stddevs: r,
    limit: s,
    sample: a,
    columnConfig: i,
    resourceType: l,
    dbtConfig: c,
    columnsInRelation: m,
  }) {
    const b = W(m, n, t).filter((f) => et(f));
    if (b.length === 0) return c;
    let d = "";
    s !== null &&
      (a
        ? (d = `ORDER BY ${F(this.adapter)}() LIMIT ${s}`)
        : (d = `LIMIT ${s}`));
    const y = b.map(
        (f, N) =>
          `SELECT '${f.column}' AS COLNAME, MIN(${this.quote(f.column)}) as COL_MIN, MAX(${this.quote(f.column)}) as COL_MAX, STDDEV(${this.quote(f.column)}) as COL_STDDEV, ${N + 1} AS ORDERING FROM base`,
      ),
      k = `
            WITH base AS (
                SELECT * FROM {{ref('${e}')}}
                ${d}
            )
            SELECT * FROM (
                ${y.join(`
UNION ALL
`)}
            ) t1
            ORDER BY ORDERING ASC
        `,
      O = (await R(k, this.queryFn)).map((f) => {
        const N = D(f[1]),
          _ = D(f[2]),
          T = D(f[3]);
        return {
          ...{
            name: f[0],
            tests: [
              {
                "dbt_utils.accepted_range": {
                  min_value: D(N - (r * T) / 2),
                  max_value: D(_ + (r * T) / 2),
                },
              },
            ],
          },
          ...i,
        };
      }),
      w = { name: e, columns: O },
      E = { [l]: [w] };
    return B(c, E);
  }
}
class nt extends U {
  getColumnCombinations(e, t) {
    const n = [];
    for (let r = 0; r < t; r++) n.push(...this.combinations(e, r + 1));
    return n;
  }
  combinations(e, t) {
    if (t === 0) return [[]];
    if (e.length === 0) return [];
    const [n, ...r] = e,
      s = this.combinations(r, t),
      a = this.combinations(r, t - 1).map((i) => [n, ...i]);
    return [...s, ...a];
  }
  buildLimitStatement(e, t, n) {
    return t === null ? "" : n ? `ORDER BY ${F(e)}() LIMIT ${t}` : `LIMIT ${t}`;
  }
  buildCountDistinctQuery(e, t, n) {
    const r = e.map((s, a) => {
      const i = s.map((l) => this.quote(l));
      return `
                SELECT ${a + 1} AS ORDERING, count(1) AS CARDINALITY
                from (
                    SELECT 1 FROM base
                    GROUP BY ${i.join(", ")}
                ) t
            `;
    });
    return `
            WITH base AS (
                SELECT * FROM {{ref('${t}')}}
                ${n}
            )
            ${r.join(`
UNION ALL
`)}
            ORDER BY ordering ASC
        `;
  }
  async generateUniquenessTests({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    compositeKeyLength: r,
    limit: s,
    sample: a,
    columnConfig: i,
    resourceType: l,
    dbtConfig: c,
    columnsInRelation: m,
  }) {
    const b = W(m, n, t).map((_) => _.column);
    if (b.length === 0) return c;
    const d = this.getColumnCombinations(b, r),
      y = this.buildLimitStatement(this.adapter, s, a),
      k = this.buildCountDistinctQuery(d, e, y),
      O = (
        await R(
          `
              WITH base AS (
                  SELECT * FROM {{ref('${e}')}}
                  ${y}
              )
              SELECT count(1) AS TABLE_COUNT FROM base
          `,
          this.queryFn,
        )
      )[0][0],
      w = await R(k, this.queryFn),
      E = d.filter((_, T) => w[T][1] === O),
      f = { name: e, columns: [], tests: [] };
    E.forEach((_) => {
      _.length === 1
        ? f.columns.push({ name: _[0], tests: ["unique", "not_null"], ...i })
        : f.tests.push({
            "dbt_utils.unique_combination_of_columns": {
              combination_of_columns: _,
            },
          });
    });
    const N = { [l]: [f] };
    return B(c, N);
  }
}
class ot extends U {
  async getAcceptedValuesTestSuggestions({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    limit: r,
    sample: s,
    columnConfig: a,
    resourceType: i,
    dbtConfig: l,
    columnsInRelation: c,
    maxCardinality: m = 5,
  }) {
    const h = (T, g) => {
        switch (T) {
          case "bigquery":
            return `array_agg(CAST(${this.quote(g)} AS STRING))`;
          case "redshift":
            return `split_to_array(listagg(${this.quote(g)}::VARCHAR, '|'), '|') `;
          case "databricks":
            return `to_json(array_agg(CAST(${this.quote(g)} AS STRING)))`;
          default:
            return `array_agg(${this.quote(g)}::VARCHAR)`;
        }
      },
      b = W(c, n, t);
    if (b.length === 0) return l;
    const d = b.map(
        (T, g) => `
            select ${g + 1} AS ORDERING,
                '${T.column}' AS COLNAME,
                count(1) as CARDINALITY,
                ${h(this.adapter, T.column)} AS UNIQUE_VALUES
            from (
                select ${this.quote(T.column)}
                from base
                group by ${this.quote(T.column)}
            ) t1
        `,
      ),
      y = r
        ? s
          ? `ORDER BY ${F(this.adapter)}() LIMIT ${r}`
          : `LIMIT ${r}`
        : "",
      k = `
            WITH base AS (
                SELECT * FROM {{ref('${e}')}}
                ${y}
            )
            SELECT * FROM (
                ${d.join(`
UNION ALL
`)}
            ) t2
            WHERE CARDINALITY <= ${m}
            ORDER BY ORDERING ASC
        `,
      v = await this.queryFn(k);
    if (!v) return l;
    const { columnNames: O, data: w } = v,
      E = O.indexOf("COLNAME"),
      f = O.indexOf("UNIQUE_VALUES"),
      N = w
        .map((T) => {
          const g = T[f];
          if (!g) return null;
          const C = typeof g == "string" ? JSON.parse(g) : g;
          return {
            name: T[E],
            tests: [{ accepted_values: { values: C.sort() } }],
            ...a,
          };
        })
        .filter(Boolean),
      _ = { [i]: [{ name: e, columns: N }] };
    return B(l, _);
  }
}
class rt extends U {
  async generateStringLengthTests({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    stddevs: r,
    limit: s,
    sample: a,
    columnConfig: i,
    resourceType: l,
    dbtConfig: c,
    columnsInRelation: m,
  }) {
    const b = W(m, n, t).filter((f) => Ze(f));
    if (b.length === 0) return c;
    const d = s
        ? a
          ? `ORDER BY ${F(this.adapter)}() LIMIT ${s}`
          : `LIMIT ${s}`
        : "",
      y = b.map(
        (f, N) => `
            SELECT '${f.column}' AS COLNAME,
                MIN(LENGTH(CAST(${this.quote(f.column)} as varchar))) as COL_MIN,
                MAX(LENGTH(CAST(${this.quote(f.column)} as varchar))) as COL_MAX,
                STDDEV(LENGTH(CAST(${this.quote(f.column)} as varchar))) as COL_STDDEV,
                ${N + 1} AS ORDERING
            FROM base
            WHERE ${this.quote(f.column)} IS NOT NULL
        `,
      ),
      k = `
            WITH base AS (
                SELECT * FROM {{ref('${e}')}}
                ${d}
            )
            SELECT * FROM (
                ${y.join(`
UNION ALL
`)}
            ) t1
            ORDER BY ORDERING ASC
        `,
      O = (await R(k, this.queryFn)).map((f) => {
        const [N, _, T, g] = f;
        let C;
        if (_ === T)
          C = {
            "dbt_expectations.expect_column_value_lengths_to_equal": {
              value: _,
              row_condition: `${this.quote(N)} is not null`,
            },
          };
        else {
          let S = _ - r * g;
          const de = T + r * g;
          S < 0 && (S = 0),
            (C = {
              "dbt_expectations.expect_column_value_lengths_to_be_between": {
                min_value: Math.floor(S),
                max_value: Math.ceil(de),
                row_condition: `${this.quote(N)} is not null`,
              },
            });
        }
        return { name: N, tests: [C], ...i };
      }),
      w = { name: e, columns: O },
      E = { [l]: [w] };
    return B(c, E);
  }
}
class st extends U {
  async generateRecencyTests({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    stddevs: r,
    limit: s,
    sample: a,
    resourceType: i,
    dbtConfig: l,
    columnsInRelation: c,
  }) {
    const h = W(c, n, t).filter(Xe);
    if (h.length === 0) return l;
    const b = s
        ? a
          ? `ORDER BY ${F(this.adapter)}() LIMIT ${s}`
          : `LIMIT ${s}`
        : "",
      d = `
    WITH base AS (
      SELECT * FROM {{ref('${e}')}}
      ${b}
    )
    ${h.map(
      (w, E) => `
      SELECT 
        MAX(minutes_diff) AS max_minutes_diff,
        AVG(minutes_diff) AS avg_minutes_diff,
        STDDEV(minutes_diff) AS stddev_minutes_diff,
        ${E + 1} AS ordering
      FROM (
      SELECT 
        {{ dbt.datediff("LAG("~${this.quote(w.column, !0)}~", 1) OVER(ORDER BY "~${this.quote(w.column, !0)}~")", ${this.quote(w.column, !0)}, "minute") }} AS minutes_diff
            FROM  base
      ) t2
      WHERE minutes_diff <> 0
    `,
    ).join(`
UNION ALL
`)}
    ORDER BY ordering ASC
  `,
      y = await R(d, this.queryFn),
      k = h.map((w, E) => {
        const [, f, N] = y[E],
          _ = f + N * r;
        let T, g;
        return (
          _ >= 60 * 24
            ? ((T = "day"), (g = Math.floor(_ / (60 * 24))))
            : _ >= 60
              ? ((T = "hour"), (g = Math.floor(_ / 60)))
              : ((T = "minute"), (g = Math.floor(_))),
          { "dbt_utils.recency": { field: w.column, datepart: T, interval: g } }
        );
      }),
      v = { name: e, ...(k.length > 0 && { tests: k }) },
      O = { [i]: [v] };
    return B(l, O);
  }
}
const at = async ({
  tableRelation: o,
  sample: e = !1,
  limit: t = 1e4,
  resourceType: n = "models",
  columnConfig: r = {},
  excludeTypes: s = [],
  excludeCols: a = [],
  tests: i = [
    "uniqueness",
    "accepted_values",
    "range",
    "string_length",
    "recency",
  ],
  uniquenessCompositeKeyLength: l = 1,
  acceptedValuesMaxCardinality: c = 5,
  rangeStddevs: m = 0,
  stringLengthStddevs: h = 0,
  recencyStddevs: b = 1,
  dbtConfig: d,
  returnObject: y = !1,
  columnsInRelation: k,
  adapter: v,
  queryFn: O,
}) => {
  console.log("testgen getTestSuggestions args", {
    tableRelation: o,
    sample: e,
    limit: t,
    resourceType: n,
    columnConfig: r,
    excludeTypes: s,
    excludeCols: a,
    tests: i,
    uniquenessCompositeKeyLength: l,
    acceptedValuesMaxCardinality: c,
    rangeStddevs: m,
    stringLengthStddevs: h,
    recencyStddevs: b,
    dbtConfig: d,
    returnObject: y,
    columnsInRelation: k,
  });
  let w = d;
  return (
    i.includes("uniqueness") &&
      (w = await new nt(v, O).generateUniquenessTests({
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: w,
        columnsInRelation: k,
        compositeKeyLength: l,
      })),
    i.includes("accepted_values") &&
      (w = await new ot(v, O).getAcceptedValuesTestSuggestions({
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: w,
        columnsInRelation: k,
        maxCardinality: c,
      })),
    i.includes("range") &&
      (w = await new tt(v, O).generateRangeTests({
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: w,
        columnsInRelation: k,
        stddevs: m,
      })),
    i.includes("string_length") &&
      (w = await new rt(v, O).generateStringLengthTests({
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: w,
        columnsInRelation: k,
        stddevs: h,
      })),
    i.includes("recency") &&
      (w = await new st(v, O).generateRecencyTests({
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        resourceType: n,
        dbtConfig: w,
        columnsInRelation: k,
        stddevs: b,
      })),
    w
  );
};
exports.CustomNotebooks = Qe;
exports.NotebookKernelClient = P;
exports.NotebookService = Je;
exports.getTestSuggestions = at;
