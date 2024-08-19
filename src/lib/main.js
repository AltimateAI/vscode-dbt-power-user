"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  c = require("@extension"),
  Q = require("python-bridge"),
  D = require("path"),
  X = require("fs"),
  Z = require("@nteract/messaging/lib/wire-protocol"),
  F = require("semver");
function ee(o) {
  const e = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (o) {
    for (const t in o)
      if (t !== "default") {
        const r = Object.getOwnPropertyDescriptor(o, t);
        Object.defineProperty(
          e,
          t,
          r.get ? r : { enumerable: !0, get: () => o[t] },
        );
      }
  }
  return (e.default = o), Object.freeze(e);
}
const q = ee(Z),
  te = ["python", "sql", "jinja-sql"],
  re = "jinja-sql",
  H = ".notebook",
  J = "datapilot",
  K = "datapilot-notebook",
  oe = (o) => ("getCells" in o ? o.getCells() : o.cells),
  ne = (o) =>
    o instanceof l.NotebookCellData ? o.value : o.document.getText(),
  ie = (o) =>
    o instanceof l.NotebookCellData ? o.languageId : o.document.languageId,
  G = (o, e) => {
    var r;
    const t = [];
    for (const n of oe(o))
      t.push({
        cell_type: n.kind === l.NotebookCellKind.Code ? "code" : "markdown",
        source: ne(n).split(/\r?\n/g),
        languageId: ie(n),
        metadata: n.metadata,
      });
    return {
      cells: t,
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
  P = () => Math.random().toString(36).substr(2, 9);
var ae = function (o, e, t, r) {
  var n = arguments.length,
    i =
      n < 3 ? e : r === null ? (r = Object.getOwnPropertyDescriptor(e, t)) : r,
    s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(o, e, t, r);
  else
    for (var a = o.length - 1; a >= 0; a--)
      (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
let T = class {
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(e, t) {
    const r = new TextDecoder().decode(e);
    let n;
    try {
      n = JSON.parse(r);
    } catch {
      n = {
        cells: [
          { cell_type: "code", source: [], languageId: re, metadata: {} },
        ],
      };
    }
    const i = n.cells.map((a) => {
        var u;
        return new l.NotebookCellData(
          l.NotebookCellKind.Code,
          (u = a.source) == null
            ? void 0
            : u.join(`
`),
          a.languageId,
        );
      }),
      s = new l.NotebookData(i);
    return (s.metadata = n.metadata), s;
  }
  async serializeNotebook(e, t) {
    const r = G(e);
    return new TextEncoder().encode(JSON.stringify(r));
  }
};
T = ae([c.provideSingleton(T)], T);
var y;
(function (o) {
  (o.error = "application/vnd.code.notebook.error"),
    (o.stderr = "application/vnd.code.notebook.stderr"),
    (o.stdout = "application/vnd.code.notebook.stdout");
})(y || (y = {}));
const se = ["text/plain", "text/markdown", y.stderr, y.stdout],
  $ = [
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
  O = new Map();
O.set("display_data", x);
O.set("error", ge);
O.set("execute_result", x);
O.set("stream", me);
O.set("update_display_data", x);
function R(o) {
  const e = O.get(o.output_type);
  let t;
  return (
    e
      ? (t = e(o))
      : (console.warn(
          `Unable to translate cell from ${o.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = x(o))),
    t
  );
}
function U(o) {
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
function x(o) {
  const e = U(o);
  ("image/svg+xml" in o.data || "image/png" in o.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (o.data) for (const r in o.data) t.push(ce(r, o.data[r]));
  return new l.NotebookCellOutput(le(t), e);
}
function le(o) {
  return o.sort((e, t) => {
    const r = (s, a) => (
      s.endsWith(".*") && (s = s.substr(0, s.indexOf(".*"))), a.startsWith(s)
    );
    let n = $.findIndex((s) => r(s, e.mime)),
      i = $.findIndex((s) => r(s, t.mime));
    return (
      z(e) && (n = -1),
      z(t) && (i = -1),
      (n = n === -1 ? 100 : n),
      (i = i === -1 ? 100 : i),
      n - i
    );
  });
}
function z(o) {
  if (o.mime.startsWith("application/vnd."))
    try {
      return new TextDecoder().decode(o.data).length === 0;
    } catch {}
  return !1;
}
function ce(o, e) {
  if (!e) return l.NotebookCellOutputItem.text("", o);
  try {
    if (
      (o.startsWith("text/") || se.includes(o)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? I(e) : e;
      return l.NotebookCellOutputItem.text(t, o);
    } else
      return o.startsWith("image/") &&
        typeof e == "string" &&
        o !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(ue(e), o)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), o)
          : ((e = Array.isArray(e) ? I(e) : e),
            l.NotebookCellOutputItem.text(e, o));
  } catch (t) {
    return (
      console.error(
        `Failed to convert ${o} output to a buffer ${typeof e}, ${e}`,
        t,
      ),
      l.NotebookCellOutputItem.text("")
    );
  }
}
function ue(o) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(o, "base64")
    : Uint8Array.from(atob(o), (e) => e.charCodeAt(0));
}
function I(o) {
  if (Array.isArray(o)) {
    let e = "";
    for (let t = 0; t < o.length; t += 1) {
      const r = o[t];
      t < o.length - 1 &&
      !r.endsWith(`
`)
        ? (e = e.concat(`${r}
`))
        : (e = e.concat(r));
    }
    return e;
  }
  return o.toString();
}
function de(o) {
  let e = o;
  do (o = e), (e = o.replace(/[^\n]\x08/gm, ""));
  while (e.length < o.length);
  return o;
}
function pe(o) {
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
function he(o) {
  return pe(de(o));
}
function N(o) {
  if (o.parent_header && "msg_id" in o.parent_header)
    return o.parent_header.msg_id;
}
function be(o) {
  if (o.hasOwnProperty("text/html")) {
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
const fe = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function A(o) {
  let e = typeof o == "string" ? o : "";
  return (
    typeof o != "string" &&
      "content" in o &&
      "code" in o.content &&
      typeof o.content.code == "string" &&
      (e = o.content.code),
    !e.includes(fe)
  );
}
function me(o) {
  const e = I(o.text),
    t =
      o.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], U(o));
}
function ge(o) {
  return (
    (o = o || { output_type: "error", ename: "", evalue: "", traceback: [] }),
    new l.NotebookCellOutput(
      [
        l.NotebookCellOutputItem.error({
          name: (o == null ? void 0 : o.ename) || "",
          message: (o == null ? void 0 : o.evalue) || "",
          stack: ((o == null ? void 0 : o.traceback) || []).join(`
`),
        }),
      ],
      { ...U(o), originalError: o },
    )
  );
}
var C;
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
})(C || (C = {}));
const w = "application/vnd.jupyter.widget-view+json";
function _() {}
class ye {
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
      (this._promise = new Promise((t, r) => {
        (this._resolve = t), (this._reject = r);
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
function V(o = null) {
  return new ye(o);
}
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.serialize = B = M.deserialize = void 0;
function we(o) {
  let e;
  return typeof o == "string" ? (e = JSON.parse(o)) : (e = _e(o)), e;
}
var B = (M.deserialize = we);
function ke(o) {
  var e;
  let t;
  return (
    !((e = o.buffers) === null || e === void 0) && e.length
      ? (t = ve(o))
      : (t = JSON.stringify(o)),
    t
  );
}
M.serialize = ke;
function _e(o) {
  const e = new DataView(o),
    t = e.getUint32(0),
    r = [];
  if (t < 2) throw new Error("Invalid incoming Kernel Message");
  for (let s = 1; s <= t; s++) r.push(e.getUint32(s * 4));
  const n = new Uint8Array(o.slice(r[0], r[1])),
    i = JSON.parse(new TextDecoder("utf8").decode(n));
  i.buffers = [];
  for (let s = 1; s < t; s++) {
    const a = r[s],
      u = r[s + 1] || o.byteLength;
    i.buffers.push(new DataView(o.slice(a, u)));
  }
  return i;
}
function ve(o) {
  const e = [],
    t = [],
    r = new TextEncoder();
  let n = [];
  o.buffers !== void 0 && ((n = o.buffers), delete o.buffers);
  const i = r.encode(JSON.stringify(o));
  t.push(i.buffer);
  for (let d = 0; d < n.length; d++) {
    const b = n[d];
    t.push(ArrayBuffer.isView(b) ? b.buffer : b);
  }
  const s = t.length;
  e.push(4 * (s + 1));
  for (let d = 0; d + 1 < t.length; d++)
    e.push(e[e.length - 1] + t[d].byteLength);
  const a = new Uint8Array(e[e.length - 1] + t[t.length - 1].byteLength),
    u = new DataView(a.buffer);
  u.setUint32(0, s);
  for (let d = 0; d < e.length; d++) u.setUint32(4 * (d + 1), e[d]);
  for (let d = 0; d < t.length; d++) a.set(new Uint8Array(t[d]), e[d]);
  return a.buffer;
}
function Oe(o) {
  if (!o || !Array.isArray(o) || o.length === 0) return;
  const e = [];
  for (let t = 0; t < o.length; t += 1) {
    const r = o[t];
    if ("buffer" in r && "byteOffset" in r) {
      const n = [...new Uint8Array(r.buffer)];
      e.push({
        ...r,
        byteLength: r.byteLength,
        byteOffset: r.byteOffset,
        buffer: n,
      });
    } else e.push([...new Uint8Array(r)]);
  }
  return e;
}
function k() {}
const Pe = D.join(__dirname, ".");
function Ee() {
  try {
    console.log("Trying to load zmq");
    const o = require("zeromq");
    return (o.context.blocky = !1), console.info("ZMQ loaded."), o;
  } catch (o) {
    try {
      console.log("Trying to load zeromqold");
      const e = require(D.join(Pe, "node_modules", "zeromqold"));
      return console.info("ZMQ loaded via fallback mechanism."), e;
    } catch (e) {
      throw (
        (console.warn("Exception while attempting zmq :", o.message || o),
        console.warn(
          "Exception while attempting zmq (fallback) :",
          e.message || e,
        ),
        e)
      );
    }
  }
}
function Ce(o, e) {
  const t = o.transport === "tcp" ? ":" : "-",
    r = o[`${e}_port`];
  if (!r) throw new Error(`Port not found for channel "${e}"`);
  return `${o.transport}://${o.ip}${t}${r}`;
}
const Me = ["username", "version", "session", "msg_id", "msg_type"],
  L = {
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
function Ne(o) {
  if (o.channel !== "iopub") return;
  const e = o.header.msg_type;
  if (e in L) {
    const t = L[e];
    if (t === void 0) return;
    const r = Object.keys(t),
      n = o.content;
    for (let i = 0; i < r.length; i++) {
      let s = t[r[i]];
      Array.isArray(s) || (s = [s]);
      const a = r[i];
      if (!(a in n) || typeof n[a] !== s[0])
        switch (s[0]) {
          case "string":
            n[a] = "";
            break;
          case "boolean":
            n[a] = !1;
            break;
          case "object":
            n[a] = {};
            break;
          case "number":
            n[a] = 0;
            break;
        }
    }
  }
}
function Te(o, e) {
  const t = o.header;
  Me.forEach((r) => {
    typeof t[r] != "string" && (t[r] = "");
  }),
    typeof o.channel != "string" && (o.channel = e),
    o.content || (o.content = {}),
    o.metadata || (o.metadata = {}),
    o.channel === "iopub" && Ne(o);
}
class je {
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
        value: k,
      }),
      Object.defineProperty(this, "onerror", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: k,
      }),
      Object.defineProperty(this, "onclose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: k,
      }),
      Object.defineProperty(this, "onmessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: k,
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
      (this.channels = this.generateChannels(e));
  }
  dispose() {
    this.closed || this.close();
  }
  close() {
    this.closed = !0;
    const e = (t) => {
      try {
        t.close();
      } catch (r) {
        console.error("Error during socket shutdown", r);
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
          error: "",
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
  generateChannel(e, t, r) {
    const n = r();
    return (
      n.connect(Ce(e, t)),
      this.processSocketMessages(t, n).catch((i) =>
        console.error(`Failed to read messages from channel ${t}`, i),
      ),
      n
    );
  }
  async processSocketMessages(e, t) {
    for await (const r of t) {
      if (this.closed) break;
      this.onIncomingMessage(e, r);
    }
  }
  generateChannels(e) {
    const t = Ee(),
      r = P(),
      n = {
        iopub: this.generateChannel(
          e,
          "iopub",
          () =>
            new t.Subscriber({ maxMessageSize: -1, receiveHighWaterMark: 0 }),
        ),
        shell: this.generateChannel(
          e,
          "shell",
          () =>
            new t.Dealer({
              routingId: r,
              sendHighWaterMark: 0,
              receiveHighWaterMark: 0,
              maxMessageSize: -1,
            }),
        ),
        control: this.generateChannel(
          e,
          "control",
          () =>
            new t.Dealer({
              routingId: r,
              sendHighWaterMark: 0,
              receiveHighWaterMark: 0,
              maxMessageSize: -1,
            }),
        ),
        stdin: this.generateChannel(
          e,
          "stdin",
          () =>
            new t.Dealer({
              routingId: r,
              sendHighWaterMark: 0,
              receiveHighWaterMark: 0,
              maxMessageSize: -1,
            }),
        ),
      };
    return n.iopub.subscribe(), n;
  }
  onIncomingMessage(e, t) {
    const r = this.closed
      ? {}
      : q.decode(t, this.connection.key, this.connection.signature_scheme);
    (r.channel = e),
      this.receiveHooks.length
        ? (this.msgChain = this.msgChain
            .then(() => {
              const n = this.serialize(r);
              return Promise.all(this.receiveHooks.map((i) => i(n)));
            })
            .then(() => this.fireOnMessage(r, e)))
        : (this.msgChain = this.msgChain.then(() => this.fireOnMessage(r, e)));
  }
  fireOnMessage(e, t) {
    if (!this.closed)
      try {
        Te(e, t), this.onmessage({ data: e, type: "message", target: this });
      } catch (r) {
        console.error(
          `Failed to handle message in Jupyter Kernel package ${JSON.stringify(e)}`,
          r,
        );
      }
  }
  sendMessage(e, t) {
    const r = q.encode(
      e,
      this.connection.key,
      this.connection.signature_scheme,
    );
    if (!t && this.sendHooks.length) {
      const n = this.serialize(e);
      this.sendChain = this.sendChain
        .then(() => Promise.all(this.sendHooks.map((i) => i(n, k))))
        .then(async () => {
          try {
            await this.postToSocket(e.channel, r);
          } catch (i) {
            console.error(
              `Failed to write data to the kernel channel ${e.channel}`,
              r,
              i,
            );
          }
        });
    } else
      this.sendChain = this.sendChain.then(() => {
        this.postToSocket(e.channel, r);
      });
    this.sendChain.catch(k);
  }
  postToSocket(e, t) {
    const r = this.channels[e];
    r
      ? r.send(t).catch((n) => {
          console.error("Error communicating with the kernel", n);
        })
      : console.error(`Attempting to send message on invalid channel: ${e}`);
  }
}
let W;
class Se {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, r, n) {
    Object.defineProperty(this, "isUsingIPyWidgets", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1,
    }),
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
        value: new l.EventEmitter(),
      }),
      (this.kernel = this.initializeKernel(e, t, r, n));
  }
  get rawKernel() {
    return this.kernel;
  }
  initializeKernel(e, t, r, n) {
    const i = require("@jupyterlab/services"),
      s = require("@jupyterlab/services/lib/kernel/serialize");
    let a;
    class u extends je {
      constructor() {
        super(e.connection, s.serialize), (a = this);
      }
    }
    const d = i.ServerConnection.makeSettings({ WebSocket: u, wsUrl: "RAW" });
    W || (W = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const b = new W.KernelConnection({
      serverSettings: d,
      clientId: t,
      handleComms: !0,
      username: r,
      model: n,
    });
    return (
      a &&
        (a.emit("open"),
        a.addReceiveHook(this.onKernelSocketMessage.bind(this)),
        a.addSendHook(this.mirrorSend.bind(this))),
      { realKernel: b, socket: a, kernelProcess: e }
    );
  }
  async mirrorSend(e, t) {
    if (
      typeof e == "string" &&
      e.includes("shell") &&
      e.includes("execute_request")
    ) {
      const r = B(e);
      if (r.channel === "shell" && r.header.msg_type === "execute_request") {
        if (!A(r)) return;
        const n = this.mirrorExecuteRequest(r);
        this.isUsingIPyWidgets && (await n);
      }
    }
  }
  raisePostMessage(e, t) {
    this._postMessageEmitter.fire({ payload: t, type: e });
  }
  mirrorExecuteRequest(e) {
    const t = V();
    return (
      this.waitingMessageIds.set(e.header.msg_id, {
        startTime: Date.now(),
        resultPromise: t,
      }),
      this.raisePostMessage("IPyWidgets_mirror_execute", {
        id: e.header.msg_id,
        msg: e,
      }),
      t.promise
    );
  }
  async onKernelSocketMessage(e) {
    var i, s, a, u, d, b, m, p, f;
    const t = P(),
      r = V();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: r,
      }),
      typeof e == "string"
        ? A(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: Oe([e]),
          }),
      typeof e != "string" ||
        e.includes(w) ||
        e.includes(C.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg"))
    ) {
      const h = B(e);
      if (!A(h)) return;
      h &&
        h.content &&
        h.content.data &&
        (h.content.data[w] || h.content.target_name === C.DefaultCommTarget) &&
        (this.isUsingIPyWidgets = !0);
      const g =
          ((i = h.header) == null ? void 0 : i.msg_type) === "comm_open" &&
          ((u =
            (a = (s = h.content) == null ? void 0 : s.data) == null
              ? void 0
              : a.state) == null
            ? void 0
            : u._model_module) === "@jupyter-widgets/output" &&
          ((m =
            (b = (d = h.content) == null ? void 0 : d.data) == null
              ? void 0
              : b.state) == null
            ? void 0
            : m._model_name) === "OutputModel",
        Y =
          ((p = h.header) == null ? void 0 : p.msg_type) === "comm_close" &&
          this.outputWidgetIds.has(
            (f = h.content) == null ? void 0 : f.comm_id,
          );
      g
        ? this.outputWidgetIds.add(h.content.comm_id)
        : Y && this.outputWidgetIds.delete(h.content.comm_id);
    }
  }
  onKernelSocketResponse(e) {
    const t = this.waitingMessageIds.get(e.id);
    t && (this.waitingMessageIds.delete(e.id), t.resultPromise.resolve());
  }
}
class v {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, r, n) {
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
        value: r,
      }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "_postMessageEmitter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new l.EventEmitter(),
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
      (this.python = this.executionInfrastructure.createPythonBridge(
        D.dirname(e),
      )),
      this.initializeNotebookKernel(e);
  }
  async dispose() {
    this.disposables.forEach((e) => e.dispose());
    try {
      await this.python.ex`
        notebook_kernel.close_notebook()
        `;
    } catch (e) {
      this.dbtTerminal.error(
        c.TelemetryEvents["Notebook/KernelCloseError"],
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
        var r;
        this.isInitializing ||
          (e((r = this.kernel) == null ? void 0 : r.rawKernel),
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
          (a) => a`notebook_kernel.get_connection_file()`,
        ),
        r = JSON.parse(X.readFileSync(t, { encoding: "utf-8" })),
        n = await this.python.lock((a) => a`notebook_kernel.get_session_id()`),
        i = { connection: r, pid: n },
        s = new Se(i, P(), P(), { name: r.kernel_name, id: P() });
      (this.kernel = s),
        this.disposables.push(
          s.postMessage((a) => this._postMessageEmitter.fire(a)),
        ),
        this.dbtTerminal.log(
          `Notebook Kernel started with PID: ${n} connection: ${JSON.stringify(r)}`,
        ),
        this.getDependenciesVersion();
    } catch (t) {
      let r = t.message;
      t instanceof Q.PythonException && (r = t.exception.message),
        this.dbtTerminal.error(
          c.TelemetryEvents["Notebook/KernelInitializationError"],
          r,
          t,
        ),
        l.window.showErrorMessage(r);
    }
    this.isInitializing = !1;
  }
  onKernelSocketResponse(e) {
    var t;
    (t = this.kernel) == null || t.onKernelSocketResponse(e);
  }
  async storeDataInKernel(e, t) {
    try {
      this.dbtTerminal.log(`storeDataInKernel: ${e}`, t),
        this.python.lock(
          (r) => r`notebook_kernel.store_sql_result(${e}, ${t})`,
        );
    } catch (r) {
      this.dbtTerminal.error(
        c.TelemetryEvents["Notebook/StoreDataInKernelError"],
        r.exception.message,
        r,
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
    return t.realKernel.registerCommTarget(e, (r, n) => {
      this.dbtTerminal.log(`registerCommTarget registered: ${e}`, r, n);
    });
  }
  async executePython(e, t, r) {
    return new Promise(async (n, i) => {
      var b, m;
      if (
        !(
          (m = (b = this.kernel) == null ? void 0 : b.rawKernel) != null &&
          m.realKernel
        )
      ) {
        i(new Error("Kernel not found"));
        return;
      }
      const s = t.metadata.cellId;
      this.dbtTerminal.log(`Executing python code in cell: ${s}`);
      const a = require("@jupyterlab/services");
      this.dbtTerminal.log(
        "kernel status",
        this.kernel.rawKernel.realKernel.status,
      );
      const u = await this.kernel.rawKernel.realKernel.requestExecute(
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
      if (!u) {
        i(new Error("Unknown request error"));
        return;
      }
      u.onReply = (p) => {
        if (t.document.isClosed) {
          u.dispose();
          return;
        }
        const f = p.content;
        f.payload &&
          f.payload.forEach((h) => {
            if (h.data && h.data.hasOwnProperty("text/plain")) {
              const g = this.addToCellData(
                {
                  output_type: "stream",
                  text: h.data["text/plain"].toString(),
                  name: "stdout",
                  metadata: {},
                  execution_count: f.execution_count,
                },
                p,
                t,
              );
              g && r(g);
            }
          });
      };
      const d = [];
      return (
        u.done.finally(() => {
          u.dispose(), n(d.filter((p) => !!p));
        }),
        (u.onStdin = (p) => {
          this.dbtTerminal.log("onStdin", p);
        }),
        (u.onIOPub = (p) => {
          if (a.KernelMessage.isCommOpenMsg(p)) this.handleCommOpen(p);
          else if (a.KernelMessage.isExecuteResultMsg(p))
            d.push(this.handleExecuteResult(p, t));
          else if (a.KernelMessage.isExecuteInputMsg(p))
            this.handleExecuteInput(p);
          else if (a.KernelMessage.isStatusMsg(p)) {
            const f = p;
            this.handleStatusMessage(f);
          } else
            a.KernelMessage.isStreamMsg(p)
              ? d.concat(this.handleStreamMessage(p, t))
              : a.KernelMessage.isDisplayDataMsg(p)
                ? d.push(this.handleDisplayData(p, t))
                : a.KernelMessage.isUpdateDisplayDataMsg(p)
                  ? this.handleUpdateDisplayDataMessage(p)
                  : a.KernelMessage.isClearOutputMsg(p)
                    ? this.handleClearOutput(p)
                    : a.KernelMessage.isErrorMsg(p)
                      ? d.push(this.handleError(p, t))
                      : a.KernelMessage.isCommOpenMsg(p) ||
                        (a.KernelMessage.isCommMsgMsg(p)
                          ? this.handleCommMsg(p)
                          : a.KernelMessage.isCommCloseMsg(p) ||
                            this.dbtTerminal.warn(
                              "NotebookUnknownIOPubMessage",
                              `Unknown message ${p.header.msg_type} : hasData=${"data" in p.content}`,
                            ));
        }),
        u
      );
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
    var r;
    this.ownedCommIds.add(e.content.comm_id);
    const t = ((r = e.content.data) == null ? void 0 : r.state) || void 0;
    e.content.target_name === C.DefaultCommTarget &&
      t &&
      t._model_module === "@jupyter-widgets/output" &&
      this.commIdsMappedToWidgetOutputModels.add(e.content.comm_id);
  }
  handleCommMsg(e) {
    const t = e.content.data;
    if (!(!t || t.method !== "update" || typeof t.state != "object")) {
      if ("msg_id" in t.state && typeof t.state.msg_id == "string") {
        const r = "msg_id" in e.parent_header ? e.parent_header : void 0;
        (this.ownedRequestMsgIds.has(e.content.comm_id) ||
          (r && this.ownedRequestMsgIds.has(r.msg_id))) &&
          (t.state.msg_id
            ? this.outputsAreSpecificToAWidget.push({
                handlingCommId: e.content.comm_id,
                msgIdsToSwallow: t.state.msg_id,
              })
            : this.outputsAreSpecificToAWidget.length &&
              this.outputsAreSpecificToAWidget[
                this.outputsAreSpecificToAWidget.length - 1
              ].handlingCommId === e.content.comm_id &&
              this.outputsAreSpecificToAWidget.pop());
      } else if (
        "children" in t.state &&
        Array.isArray(t.state.children) &&
        this.ownedCommIds.has(e.content.comm_id)
      ) {
        const r = "IPY_MODEL_";
        t.state.children.forEach((n) => {
          if (typeof n != "string")
            return this.dbtTerminal.warn(
              "Came across a comm update message a child that isn't a string",
              n,
            );
          if (!n.startsWith(r))
            return this.dbtTerminal.warn(
              `Came across a comm update message a child that start start with ${r}`,
              n,
            );
          const i = n.substring(r.length);
          this.ownedCommIds.add(i),
            this.commIdsMappedToParentWidgetModel.set(i, e.content.comm_id);
        });
      }
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
  addToCellData(e, t, r) {
    if (e.data && typeof e.data == "object" && w in e.data) {
      const s = e.data[w];
      if (s && "model_id" in s) {
        const a = v.modelIdsOwnedByCells.get(r) || new Set();
        a.add(s.model_id), v.modelIdsOwnedByCells.set(r, a);
      }
    }
    const n = R(e);
    if (r.document.isClosed) return;
    this.dbtTerminal.log(
      r.document.uri.fsPath,
      `Update output with mimes ${n.items.map((s) => s.mime).toString()}`,
    );
    const i = N(t);
    return (
      (this.outputsAreSpecificToAWidget.length &&
        this.outputsAreSpecificToAWidget[
          this.outputsAreSpecificToAWidget.length - 1
        ].msgIdsToSwallow === i &&
        n.items.every((s) => this.canMimeTypeBeRenderedByWidgetManager(s))) ||
        (this.outputsAreSpecificToAWidget.length &&
          this.outputsAreSpecificToAWidget[
            this.outputsAreSpecificToAWidget.length - 1
          ].msgIdsToSwallow === i &&
          this.dbtTerminal.warn("NotebookAddToCellData", "unknown operation")),
      n
    );
  }
  canMimeTypeBeRenderedByWidgetManager(e) {
    const t = e.mime;
    if (t === y.stderr || t === y.stdout || t === y.error) return !0;
    if (t === w) {
      const r = JSON.parse(new TextDecoder().decode(e.data));
      return !(
        typeof r.model_id == "string" &&
        this.commIdsMappedToWidgetOutputModels.has(r.model_id)
      );
    }
    return !t.startsWith("application/vnd");
  }
  handleExecuteInput(e) {}
  handleStatusMessage(e) {}
  handleStreamMessage(e, t) {
    var n;
    if (
      N(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === N(e)
    )
      return;
    const r =
      e.content.name === "stdout"
        ? l.NotebookCellOutputItem.stdout("").mime
        : l.NotebookCellOutputItem.stderr("").mime;
    if (
      (!this.streamsReAttachedToExecutingCell &&
        !this.lastUsedStreamOutput &&
        t.outputs.length &&
        t.outputs[t.outputs.length - 1].items.length >= 1 &&
        t.outputs[t.outputs.length - 1].items.every((i) => i.mime === r) &&
        (this.lastUsedStreamOutput = {
          output: t.outputs[0],
          stream: e.content.name,
        }),
      (this.streamsReAttachedToExecutingCell = !0),
      ((n = this.lastUsedStreamOutput) == null ? void 0 : n.stream) ===
        e.content.name)
    )
      return [
        R({
          output_type: "stream",
          name: e.content.name,
          text: e.content.text,
        }),
        this.lastUsedStreamOutput.output,
      ];
    {
      const i = he(I(e.content.text));
      return [R({ output_type: "stream", name: e.content.name, text: i })];
    }
  }
  handleDisplayData(e, t) {
    const r = {
      output_type: "display_data",
      data: be(e.content.data),
      metadata: e.content.metadata,
      transient: e.content.transient,
    };
    return this.addToCellData(r, e, t);
  }
  handleClearOutput(e) {
    if (
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === N(e)
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
    const r = e.content.traceback;
    this.dbtTerminal.log(`Traceback for error ${r}`);
    const n = {
      output_type: "error",
      ename: e.content.ename,
      evalue: e.content.evalue,
      traceback: r,
    };
    return this.addToCellData(n, e, t);
  }
}
Object.defineProperty(v, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
var Ie = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var a = o.length - 1; a >= 0; a--)
        (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  De = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
exports.NotebookDependencies = class {
  constructor(e, t, r, n) {
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
        value: r,
      }),
      Object.defineProperty(this, "pythonEnvironment", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      });
  }
  async getDependenciesVersion() {
    const e = ["-m", "jupyter", "--version"],
      { stdout: t, stderr: r } = await this.commandProcessExecutionFactory
        .createCommandProcessExecution({
          command: this.pythonEnvironment.pythonPath,
          args: e,
          cwd: c.getFirstWorkspacePath(),
          envVars: this.pythonEnvironment.environmentVariables,
        })
        .completeWithTerminalOutput();
    if (
      !t.includes("Successfully installed") &&
      !t.includes("Requirement already satisfied") &&
      r
    )
      throw new Error(r);
    const n = t.split(`
`),
      i = {};
    return (
      n.forEach((s) => {
        const [a, u] = s.split(":").map((d) => d.trim());
        a && u && (i[a] = u);
      }),
      i
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
        (await l.window.showInformationMessage(
          "You need [ipykernel](https://pypi.org/project/ipykernel/) and [jupyter_client](https://github.com/jupyter/jupyter_client) to use the notebook",
          "Install",
          "Cancel",
        )) !== "Install"
      )
        return (
          this.telemetry.sendTelemetryEvent(
            c.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
          ),
          !1
        );
      (await l.window.withProgress(
        {
          title: "Installing required dependencies...",
          location: l.ProgressLocation.Notification,
          cancellable: !1,
        },
        async () => {
          try {
            const r = [
                "-m",
                "pip",
                "install",
                "ipykernel",
                "jupyter_client",
                "jupyter_contrib_nbextensions",
                "ipywidgets",
              ],
              { stdout: n, stderr: i } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: r,
                    cwd: c.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !n.includes("Successfully installed") &&
              !n.includes("Requirement already satisfied") &&
              i
            )
              throw new Error(i);
            return (
              this.dbtTerminal.log(
                "Notebook dependencies have been installed successfully.",
              ),
              this.telemetry.sendTelemetryEvent(
                c.TelemetryEvents["Notebook/DependenciesInstalled"],
              ),
              !0
            );
          } catch (r) {
            return (
              this.telemetry.sendTelemetryError(
                c.TelemetryEvents["Notebook/DependenciesInstallError"],
                r,
              ),
              l.window.showErrorMessage(
                c.extendErrorWithSupportLinks(r.message),
              ),
              !1
            );
          }
        },
      )) &&
        (await l.window.showInformationMessage(
          "Notebook dependencies installed. Please reload the window to use the notebook.",
          "Reload Window",
        )) === "Reload Window" &&
        l.commands.executeCommand("workbench.action.reloadWindow");
    } catch (e) {
      throw (
        (this.dbtTerminal.error(
          c.TelemetryEvents["Notebook/DependenciesInstallError"],
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
            cwd: c.getFirstWorkspacePath(),
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
exports.NotebookDependencies = Ie(
  [
    c.provideSingleton(exports.NotebookDependencies),
    De("design:paramtypes", [
      c.DBTTerminal,
      c.TelemetryService,
      c.CommandProcessExecutionFactory,
      c.PythonEnvironment,
    ]),
  ],
  exports.NotebookDependencies,
);
var xe = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var a = o.length - 1; a >= 0; a--)
        (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Re = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
let E = class {
  constructor(e, t, r) {
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
        value: r,
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
      const t = new v(
        e.fsPath,
        this.executionInfrastructure,
        this.notebookDependencies,
        this.dbtTerminal,
      );
      this.clientMap.set(
        e.fsPath,
        new Promise((r) => {
          t.getKernel().then(() => r(t));
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
E = xe(
  [
    c.provideSingleton(E),
    Re("design:paramtypes", [
      c.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      c.DBTTerminal,
    ]),
  ],
  E,
);
var Ae = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var a = o.length - 1; a >= 0; a--)
        (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  We = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
let j = class {
  constructor(e, t) {
    Object.defineProperty(this, "clientMapper", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "messageChannel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "disposables", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "widgetOutputsPerNotebook", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new WeakMap(),
      }),
      (this.messageChannel = l.notebooks.createRendererMessaging(
        "datapilot-notebook-jupyter-renderer",
      )),
      this.messageChannel.onDidReceiveMessage(({ editor: r, message: n }) => {
        if (n && typeof n == "object" && n.command === "query-widget-state")
          return this.queryWidgetState(this.messageChannel, r, n);
        if (
          n &&
          typeof n == "object" &&
          n.command === "ipywidget-renderer-loaded"
        )
          return this.sendWidgetVersionAndState(this.messageChannel, r);
      });
  }
  hookupKernel(e, t) {
    e.iopubMessage.connect((r, n) => this.handler(n, t)),
      this.disposables.push(
        new l.Disposable(() =>
          e.iopubMessage.disconnect((r, n) => this.handler(n, t)),
        ),
      );
  }
  handler(e, t) {
    const r = require("@jupyterlab/services");
    (r.KernelMessage.isDisplayDataMsg(e) ||
      r.KernelMessage.isUpdateDisplayDataMsg(e) ||
      r.KernelMessage.isExecuteReplyMsg(e) ||
      r.KernelMessage.isExecuteResultMsg(e)) &&
      this.trackModelId(t, e);
  }
  trackModelId(e, t) {
    const r = t.content;
    if (r.data && typeof r.data == "object" && w in r.data) {
      const n = r.data[w];
      if (n && "model_id" in n) {
        const i = this.widgetOutputsPerNotebook.get(e) || new Set();
        i.add(n.model_id), this.widgetOutputsPerNotebook.set(e, i);
      }
    }
  }
  queryWidgetState(e, t, r) {
    const n = this.widgetOutputsPerNotebook.get(t.notebook),
      i = !0,
      s = !!(n != null && n.has(r.model_id));
    e.postMessage(
      {
        command: "query-widget-state",
        model_id: r.model_id,
        hasWidgetState: s,
        kernelSelected: i,
      },
      t,
    ).then(_, _);
  }
  async sendWidgetVersionAndState(e, t) {
    try {
      const n = (await this.clientMapper.getNotebookClient(t.notebook.uri))
        .jupyterPackagesVersions;
      if (!n) throw new Error("Dependency versions not found");
      const i = new F.SemVer(n.ipywidgets).major;
      e.postMessage(
        {
          command: "ipywidget-renderer-init",
          version: i,
          widgetState: void 0,
          kernelSelected: !0,
        },
        t,
      ).then(_, _);
    } catch (r) {
      this.dbtTerminal.error(
        c.TelemetryEvents["Notebook/WidgetVersionError"],
        r.message,
        r,
      );
    }
  }
  onNotebookClosed(e) {
    this.widgetOutputsPerNotebook.delete(e);
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
};
j = Ae([c.provideSingleton(j), We("design:paramtypes", [E, c.DBTTerminal])], j);
var Ke = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var a = o.length - 1; a >= 0; a--)
        (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Be = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
exports.DatapilotNotebookController = class {
  constructor(e, t, r, n, i, s) {
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
        value: r,
      }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "rendererMessageHandler", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i,
      }),
      Object.defineProperty(this, "altimate", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s,
      }),
      Object.defineProperty(this, "_id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "DatapilotNotebookController",
      }),
      Object.defineProperty(this, "_label", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Datapilot",
      }),
      Object.defineProperty(this, "_onNotebookCellEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new l.EventEmitter(),
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
      Object.defineProperty(this, "_executionOrder", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "_controller", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this._controller = l.notebooks.createNotebookController(
        this._id,
        K,
        this._label,
      )),
      (this._controller.supportedLanguages = te),
      (this._controller.supportsExecutionOrder = !0),
      (this._controller.executeHandler = this._executeAll.bind(this)),
      this._controller.onDidReceiveMessage(async (a) => {
        const u = await this.clientMapper.getNotebookClient(
          a.editor.notebook.uri,
        );
        switch (a.message.type) {
          case "IPyWidgets_registerCommTarget":
            u.registerCommTarget(a.message.payload);
            break;
          case "IPyWidgets_Request_Widget_Version":
            return this.sendIPyWidgetsVersion(u);
          case "IPyWidgets_Ready":
            this.sendKernelOptions(u);
            break;
          case "IPyWidgets_msg_received":
            u.onKernelSocketResponse(a.message.payload);
            break;
          case "IPyWidgets_RegisterMessageHook":
            this.registerMessageHook(a.message.payload);
            break;
        }
      }),
      this.disposables.push(
        l.workspace.onDidChangeNotebookDocument((a) => {
          a.contentChanges.forEach(async (u) => {
            u.addedCells &&
              (await this.updateCellId(a.notebook.getCells(), a.notebook)),
              u.removedCells &&
                u.removedCells.forEach((d) => {
                  this._onNotebookCellEvent.fire({
                    cellId: d.metadata.cellId,
                    notebook: a.notebook.uri.fsPath,
                    result: null,
                    event: "delete",
                    fragment: d.document.uri.fragment,
                    languageId: d.document.languageId,
                  });
                });
          });
        }),
      ),
      this.disposables.push(this._controller),
      this.disposables.push(
        l.workspace.onDidOpenNotebookDocument(async (a) => {
          await this.onNotebookOpen(a);
        }),
      ),
      this.disposables.push(
        l.workspace.onDidCloseNotebookDocument(async (a) => {
          await this.onNotebookClose(a);
        }),
      );
  }
  async getNotebookByTemplate(e) {
    var s;
    const t = await this.altimate.getNotebooks();
    if (e)
      return (s = t.notebooks.find((a) => a.name === e)) == null
        ? void 0
        : s.notebookData;
    const r = [
        { label: "Blank notebook", description: "", id: "" },
        ...t.notebooks.map((a) => ({
          label: a.name,
          description: a.description,
          id: a.id,
        })),
      ],
      n = await l.window.showQuickPick(r, {
        title: "Select a notebook",
        canPickMany: !1,
      }),
      i = n != null && n.id ? t.notebooks.find((a) => a.id === n.id) : void 0;
    return i == null ? void 0 : i.notebookData;
  }
  async createNotebook(e) {
    const { notebookId: t, template: r, query: n } = e || {},
      i = t ? null : await this.getNotebookByTemplate(r);
    if (
      (n && i && (i.cells[0].source = [n]),
      !(await this.queryManifestService.getOrPickProjectFromWorkspace()))
    ) {
      l.window.showErrorMessage("No dbt project selected.");
      return;
    }
    const a = t || "untitled",
      u = l.Uri.parse(`${J}:/${a}${H}`);
    l.workspace.openNotebookDocument(u).then(
      (d) => {
        l.window.showNotebookDocument(d).then(
          async (b) => {
            if (!i) return;
            const m = new l.WorkspaceEdit(),
              p = [];
            i.cells.forEach((f, h) => {
              const g = new l.NotebookCellData(
                f.cell_type === "code"
                  ? l.NotebookCellKind.Code
                  : l.NotebookCellKind.Markup,
                f.source.join(`
`),
                f.languageId,
              );
              (g.metadata = f.metadata),
                p.push(new l.NotebookEdit(new l.NotebookRange(h, h), [g]));
            }),
              m.set(b.notebook.uri, p),
              await l.workspace.applyEdit(m);
          },
          (b) => {
            l.window.showErrorMessage(b.message);
          },
        );
      },
      (d) => {
        l.window.showErrorMessage(d.message);
      },
    );
  }
  registerMessageHook(e) {
    this.dbtTerminal.log("Notebook registerMessageHook", e);
  }
  sendMessageToPreloadScript(e) {
    return this._controller.postMessage(e).then(_, _);
  }
  async sendIPyWidgetsVersion(e) {
    const t = e.jupyterPackagesVersions,
      r = t ? new F.SemVer(t.ipywidgets).major : 8;
    this.sendMessageToPreloadScript({
      type: "IPyWidgets_Reply_Widget_Version",
      payload: r,
    });
  }
  genUniqueId(e) {
    const t = (Math.random() + 1).toString(36).substring(7);
    return `${e.document.languageId.replace(/-/g, "_")}_${t}`;
  }
  async updateCellId(e, t) {
    const r = [];
    if (
      (e.forEach((n) => {
        let i = n.metadata.cellId;
        if (!i) {
          i = this.genUniqueId(n);
          const s = { ...n.metadata, cellId: i },
            a = l.NotebookEdit.updateCellMetadata(n.index, s);
          r.push(a);
        }
        this._onNotebookCellEvent.fire({
          cellId: i,
          notebook: t.uri.fsPath,
          event: "update",
          fragment: n.document.uri.fragment,
          languageId: n.document.languageId,
        });
      }),
      r.length > 0)
    ) {
      const n = new l.WorkspaceEdit();
      n.set(t.uri, r), await l.workspace.applyEdit(n);
    }
  }
  async sendKernelOptions(e) {
    const t = await (e == null ? void 0 : e.getKernel());
    if (t != null && t.realKernel) {
      this.sendMessageToPreloadScript({
        type: "IPyWidgets_kernelOptions",
        payload: {
          id: t.realKernel.id || "",
          clientId: t.realKernel.clientId || "",
          userName: t.realKernel.username || "",
          model: t.realKernel.model || { id: "", name: "" },
        },
      });
      return;
    }
  }
  async onNotebookClose(e) {
    const t = await this.clientMapper.getNotebookClient(e.uri);
    t && t.dispose(), this.rendererMessageHandler.onNotebookClosed(e);
  }
  async onNotebookOpen(e) {
    const t = await this.clientMapper.initializeNotebookClient(e.uri),
      r = await t.getKernel();
    if (!(r != null && r.realKernel))
      throw new Error("Unable to initialize kernel");
    this.rendererMessageHandler.hookupKernel(r.realKernel, e),
      this.disposables.push(
        t.postMessage((i) => {
          this.sendMessageToPreloadScript(i);
        }, this),
      );
    const n = e.getCells();
    this.updateCellId(n, e);
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
  _executeAll(e, t, r) {
    var i;
    const n = (i = l.window.activeNotebookEditor) == null ? void 0 : i.notebook;
    if (!n) {
      this.telemetry.sendTelemetryError(
        `${c.TelemetryEvents["Notebook/Execute"]}Error`,
        new Error("No active notebook found"),
      ),
        l.window.showErrorMessage(
          c.extendErrorWithSupportLinks("No active notebook found"),
        );
      return;
    }
    for (const s of e) this._doExecution(s, n);
  }
  async _doExecution(e, t) {
    const r = this._controller.createNotebookCellExecution(e);
    (r.executionOrder = ++this._executionOrder),
      r.start(Date.now()),
      r.token.onCancellationRequested((n) => {
        r.end(!0, Date.now());
      });
    try {
      r.clearOutput();
      const n = [],
        i = await this.clientMapper.getNotebookClient(t.uri);
      switch (e.document.languageId) {
        case "python":
          this.telemetry.startTelemetryEvent(
            c.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const s = await i.executePython(e.document.getText(), e, (d) => {
            r.appendOutput(d);
          });
          s && r.appendOutput(s);
          break;
        case "jinja-sql":
        case "sql":
          const a =
            await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!a) {
            l.window.showErrorMessage("No dbt project selected.");
            return;
          }
          this.telemetry.startTelemetryEvent(
            c.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const u = await a.executeSQL(e.document.getText(), "", !0);
          this._onNotebookCellEvent.fire({
            cellId: e.metadata.cellId,
            notebook: t.uri.fsPath,
            result: u,
            event: "add",
            languageId: e.document.languageId,
          }),
            n.push(
              l.NotebookCellOutputItem.json(u, "application/perspective-json"),
            ),
            r.appendOutput(new l.NotebookCellOutput(n)),
            await i.storeDataInKernel(e.metadata.cellId, u);
          break;
        default:
          l.window.showErrorMessage(
            `Language: ${e.document.languageId} not supported`,
          );
          break;
      }
      this.telemetry.endTelemetryEvent(c.TelemetryEvents["Notebook/Execute"], {
        language: e.document.languageId,
      }),
        r.end(!0, Date.now());
    } catch (n) {
      r.replaceOutput([
        new l.NotebookCellOutput([l.NotebookCellOutputItem.error(n)]),
      ]),
        this.telemetry.endTelemetryEvent(
          c.TelemetryEvents["Notebook/Execute"],
          n,
          { language: e.document.languageId },
        ),
        r.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = Ke(
  [
    c.provideSingleton(exports.DatapilotNotebookController),
    Be("design:paramtypes", [
      E,
      c.QueryManifestService,
      c.TelemetryService,
      c.DBTTerminal,
      j,
      c.AltimateRequest,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class Ue {
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
    return [];
  }
}
var qe = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var a = o.length - 1; a >= 0; a--)
        (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  $e = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
let S = class {
  constructor(e, t) {
    Object.defineProperty(this, "dbtProjectContainer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
      Object.defineProperty(this, "_emitter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new l.EventEmitter(),
      }),
      Object.defineProperty(this, "onDidChangeFile", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: this._emitter.event,
      });
  }
  watch(e, t) {
    return new l.Disposable(() => {});
  }
  stat(e) {
    return {
      type: l.FileType.File,
      ctime: Date.now(),
      mtime: Date.now(),
      size: 0,
    };
  }
  readDirectory(e) {
    return [];
  }
  createDirectory(e) {}
  readFile(e) {
    const t = this.getFileNameFromUri(e),
      n = (this.dbtProjectContainer.getFromGlobalState("notebooks") || {})[t];
    return new TextEncoder().encode(JSON.stringify(n));
  }
  async writeFile(e, t, r) {
    await this.customSave(e, t),
      this._emitter.fire([{ type: l.FileChangeType.Changed, uri: e }]);
  }
  delete(e, t) {}
  rename(e, t, r) {
    this._emitter.fire([
      { type: l.FileChangeType.Deleted, uri: e },
      { type: l.FileChangeType.Created, uri: t },
    ]);
  }
  getFileNameFromUri(e) {
    return D.basename(e.fsPath, H);
  }
  async customSave(e, t) {
    var r;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const n =
        (r = l.window.activeNotebookEditor) == null ? void 0 : r.notebook;
      if (!n) {
        this.dbtTerminal.warn(
          c.TelemetryEvents["Notebook/SaveError"],
          "No active notebook found",
        );
        return;
      }
      this.dbtTerminal.log("saving notebook", n);
      const i = n.metadata.name;
      if (i) {
        this.saveNotebook(n, i);
        return;
      }
      const s = await l.window.showInputBox({ prompt: "Your notebook name?" });
      if (!s) return;
      this.saveNotebook(n, s);
      const a = this.getFileNameFromUri(e),
        u = e.with({ path: e.path.replace(a, s) });
      await l.commands.executeCommand(
        "workbench.action.revertAndCloseActiveEditor",
      ),
        await l.window.showNotebookDocument(
          await l.workspace.openNotebookDocument(u),
        ),
        l.window.showInformationMessage("Notebook saved successfully");
    } catch (n) {
      this.dbtTerminal.error(
        c.TelemetryEvents["Notebook/SaveError"],
        n.message,
        n,
      );
    }
  }
  saveNotebook(e, t) {
    const r = G(e, t);
    this.dbtTerminal.log("saving notebook", t, r);
    const n = this.dbtProjectContainer.getFromGlobalState("notebooks") || {};
    return (
      this.dbtProjectContainer.setToGlobalState("notebooks", { ...n, [t]: r }),
      this.dbtTerminal.log("notebook saved", t, r),
      r
    );
  }
};
S = qe(
  [
    c.provideSingleton(S),
    $e("design:paramtypes", [c.DBTProjectContainer, c.DBTTerminal]),
  ],
  S,
);
var ze = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var a = o.length - 1; a >= 0; a--)
        (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ve = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
exports.NotebookService = class {
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
      r = this.cellByNotebookAutocompleteMap.get(e.notebook) || [];
    switch (e.event) {
      case "add":
      case "update":
        this.cellByNotebookAutocompleteMap.set(e.notebook, [
          ...r.filter((n) => n.cellId !== e.cellId),
          t,
        ]);
        break;
      case "delete":
        this.cellByNotebookAutocompleteMap.set(
          e.notebook,
          r.filter((n) => n.cellId !== e.cellId),
        );
        break;
    }
  }
};
exports.NotebookService = ze(
  [
    c.provideSingleton(exports.NotebookService),
    Ve("design:paramtypes", [exports.DatapilotNotebookController]),
  ],
  exports.NotebookService,
);
var Le = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var a = o.length - 1; a >= 0; a--)
        (s = o[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Fe = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
exports.NotebookProviders = class {
  constructor(e, t, r, n) {
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
        value: r,
      }),
      Object.defineProperty(this, "dbtTerminal", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      }),
      Object.defineProperty(this, "disposables", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      this.disposables.push(
        l.workspace.onDidChangeConfiguration((i) => {
          i.affectsConfiguration("dbt.enableNotebooks") &&
            this.bindNotebookActions();
        }),
      ),
      this.bindNotebookActions();
  }
  bindNotebookActions() {
    l.workspace.getConfiguration("dbt").get("enableNotebooks", !1) &&
      (this.dbtTerminal.log("Notebooks enabled, binding actions"),
      this.disposables.push(
        l.notebooks.registerNotebookCellStatusBarItemProvider(K, new Ue()),
        l.workspace.registerNotebookSerializer(K, this.notebookProvider, {}),
        this.notebookController,
      ),
      this.disposables.push(
        l.workspace.registerFileSystemProvider(
          J,
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
exports.NotebookProviders = Le(
  [
    c.provideSingleton(exports.NotebookProviders),
    Fe("design:paramtypes", [
      T,
      exports.DatapilotNotebookController,
      S,
      c.DBTTerminal,
    ]),
  ],
  exports.NotebookProviders,
);
exports.NotebookKernelClient = v;
