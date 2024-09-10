"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  c = require("@extension"),
  H = require("python-bridge"),
  Q = require("fs"),
  X = require("@nteract/messaging/lib/wire-protocol");
function Z(n) {
  const e = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (n) {
    for (const t in n)
      if (t !== "default") {
        const o = Object.getOwnPropertyDescriptor(n, t);
        Object.defineProperty(
          e,
          t,
          o.get ? o : { enumerable: !0, get: () => n[t] },
        );
      }
  }
  return (e.default = n), Object.freeze(e);
}
const L = Z(X),
  ee = (n) => ("getCells" in n ? n.getCells() : n.cells),
  te = (n) =>
    n instanceof l.NotebookCellData ? n.value : n.document.getText(),
  oe = (n) =>
    n instanceof l.NotebookCellData ? n.languageId : n.document.languageId,
  Y = (n, e) => {
    var o;
    const t = [];
    for (const r of ee(n))
      t.push({
        cell_type: r.kind,
        source: te(r).split(/\r?\n/g),
        languageId: oe(r),
        metadata: r.metadata,
      });
    return {
      cells: t,
      metadata: {
        ...n.metadata,
        name: e,
        createdAt:
          ((o = n.metadata) == null ? void 0 : o.createdAt) ||
          new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  },
  P = () => Math.random().toString(36).substr(2, 9);
var ne = function (n, e, t, o) {
  var r = arguments.length,
    i =
      r < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, t)) : o,
    a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(n, e, t, o);
  else
    for (var s = n.length - 1; s >= 0; s--)
      (a = n[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let I = class {
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(e, t) {
    const o = new TextDecoder().decode(e);
    let r;
    try {
      r = JSON.parse(o);
    } catch {
      r = { cells: [] };
    }
    const i = r.cells.map((s) => {
        var u;
        return new l.NotebookCellData(
          l.NotebookCellKind.Code,
          (u = s.source) == null
            ? void 0
            : u.join(`
`),
          s.languageId,
        );
      }),
      a = new l.NotebookData(i);
    return (a.metadata = r.metadata), a;
  }
  async serializeNotebook(e, t) {
    const o = Y(e);
    return new TextEncoder().encode(JSON.stringify(o));
  }
};
I = ne([c.provideSingleton(I)], I);
var w;
(function (n) {
  (n.error = "application/vnd.code.notebook.error"),
    (n.stderr = "application/vnd.code.notebook.stderr"),
    (n.stdout = "application/vnd.code.notebook.stdout");
})(w || (w = {}));
const re = ["text/plain", "text/markdown", w.stderr, w.stdout],
  q = [
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
  v = new Map();
v.set("display_data", R);
v.set("error", be);
v.set("execute_result", R);
v.set("stream", he);
v.set("update_display_data", R);
function W(n) {
  const e = v.get(n.output_type);
  let t;
  return (
    e
      ? (t = e(n))
      : (console.warn(
          `Unable to translate cell from ${n.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = R(n))),
    t
  );
}
function K(n) {
  const e = { outputType: n.output_type };
  switch ((n.transient && (e.transient = n.transient), n.output_type)) {
    case "display_data":
    case "execute_result":
    case "update_display_data": {
      (e.executionCount = n.execution_count),
        (e.metadata = n.metadata ? JSON.parse(JSON.stringify(n.metadata)) : {});
      break;
    }
  }
  return e;
}
function R(n) {
  const e = K(n);
  ("image/svg+xml" in n.data || "image/png" in n.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (n.data) for (const o in n.data) t.push(ae(o, n.data[o]));
  return new l.NotebookCellOutput(ie(t), e);
}
function ie(n) {
  return n.sort((e, t) => {
    const o = (a, s) => (
      a.endsWith(".*") && (a = a.substr(0, a.indexOf(".*"))), s.startsWith(a)
    );
    let r = q.findIndex((a) => o(a, e.mime)),
      i = q.findIndex((a) => o(a, t.mime));
    return (
      U(e) && (r = -1),
      U(t) && (i = -1),
      (r = r === -1 ? 100 : r),
      (i = i === -1 ? 100 : i),
      r - i
    );
  });
}
function U(n) {
  if (n.mime.startsWith("application/vnd."))
    try {
      return new TextDecoder().decode(n.data).length === 0;
    } catch {}
  return !1;
}
function ae(n, e) {
  if (!e) return l.NotebookCellOutputItem.text("", n);
  try {
    if (
      (n.startsWith("text/") || re.includes(n)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? j(e) : e;
      return l.NotebookCellOutputItem.text(t, n);
    } else
      return n.startsWith("image/") &&
        typeof e == "string" &&
        n !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(se(e), n)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), n)
          : ((e = Array.isArray(e) ? j(e) : e),
            l.NotebookCellOutputItem.text(e, n));
  } catch (t) {
    return (
      console.error(
        `Failed to convert ${n} output to a buffer ${typeof e}, ${e}`,
        t,
      ),
      l.NotebookCellOutputItem.text("")
    );
  }
}
function se(n) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(n, "base64")
    : Uint8Array.from(atob(n), (e) => e.charCodeAt(0));
}
function j(n) {
  if (Array.isArray(n)) {
    let e = "";
    for (let t = 0; t < n.length; t += 1) {
      const o = n[t];
      t < n.length - 1 &&
      !o.endsWith(`
`)
        ? (e = e.concat(`${o}
`))
        : (e = e.concat(o));
    }
    return e;
  }
  return n.toString();
}
function le(n) {
  let e = n;
  do (n = e), (e = n.replace(/[^\n]\x08/gm, ""));
  while (e.length < n.length);
  return n;
}
function ce(n) {
  for (
    n = n.replace(
      /\r+\n/gm,
      `
`,
    );
    n.search(/\r[^$]/g) > -1;

  ) {
    const e = n.match(/^(.*)\r+/m)[1];
    let t = n.match(/\r+(.*)$/m)[1];
    (t = t + e.slice(t.length, e.length)),
      (n = n.replace(/\r+.*$/m, "\r").replace(/^.*\r/m, t));
  }
  return n;
}
function ue(n) {
  return ce(le(n));
}
function C(n) {
  if (n.parent_header && "msg_id" in n.parent_header)
    return n.parent_header.msg_id;
}
function de(n) {
  if (n.hasOwnProperty("text/html")) {
    const e = n["text/html"];
    typeof e == "string" &&
      e.includes('<iframe id="tensorboard-frame-') &&
      (n["text/html"] = e.replace(
        /new URL\((.*), window.location\)/,
        'new URL("http://localhost")',
      ));
  }
  return n;
}
const pe = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function $(n) {
  let e = typeof n == "string" ? n : "";
  return (
    typeof n != "string" &&
      "content" in n &&
      "code" in n.content &&
      typeof n.content.code == "string" &&
      (e = n.content.code),
    !e.includes(pe)
  );
}
function he(n) {
  const e = j(n.text),
    t =
      n.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], K(n));
}
function be(n) {
  return (
    (n = n || { output_type: "error", ename: "", evalue: "", traceback: [] }),
    new l.NotebookCellOutput(
      [
        l.NotebookCellOutputItem.error({
          name: (n == null ? void 0 : n.ename) || "",
          message: (n == null ? void 0 : n.evalue) || "",
          stack: ((n == null ? void 0 : n.traceback) || []).join(`
`),
        }),
      ],
      { ...K(n), originalError: n },
    )
  );
}
var x;
(function (n) {
  (n.GeneratedThemeName = "ipython-theme"),
    (n.MatplotLibDefaultParams = "_VSCode_defaultMatplotlib_Params"),
    (n.MatplotLibFigureFormats = "_VSCode_matplotLib_FigureFormats"),
    (n.DefaultCodeCellMarker = "# %%"),
    (n.DefaultCommTarget = "jupyter.widget"),
    (n.ALL_VARIABLES = "ALL_VARIABLES"),
    (n.KERNEL_VARIABLES = "KERNEL_VARIABLES"),
    (n.DEBUGGER_VARIABLES = "DEBUGGER_VARIABLES"),
    (n.PYTHON_VARIABLES_REQUESTER = "PYTHON_VARIABLES_REQUESTER"),
    (n.MULTIPLEXING_DEBUGSERVICE = "MULTIPLEXING_DEBUGSERVICE"),
    (n.RUN_BY_LINE_DEBUGSERVICE = "RUN_BY_LINE_DEBUGSERVICE"),
    (n.REMOTE_URI = "https://remote/"),
    (n.REMOTE_URI_ID_PARAM = "id"),
    (n.REMOTE_URI_HANDLE_PARAM = "uriHandle"),
    (n.REMOTE_URI_EXTENSION_ID_PARAM = "extensionId");
})(x || (x = {}));
const D = "application/vnd.jupyter.widget-view+json";
class fe {
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
      (this._promise = new Promise((t, o) => {
        (this._resolve = t), (this._reject = o);
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
function me(n = null) {
  return new fe(n);
}
var T = {};
Object.defineProperty(T, "__esModule", { value: !0 });
T.serialize = F = T.deserialize = void 0;
function ge(n) {
  let e;
  return typeof n == "string" ? (e = JSON.parse(n)) : (e = we(n)), e;
}
var F = (T.deserialize = ge);
function ye(n) {
  var e;
  let t;
  return (
    !((e = n.buffers) === null || e === void 0) && e.length
      ? (t = ke(n))
      : (t = JSON.stringify(n)),
    t
  );
}
T.serialize = ye;
function we(n) {
  const e = new DataView(n),
    t = e.getUint32(0),
    o = [];
  if (t < 2) throw new Error("Invalid incoming Kernel Message");
  for (let a = 1; a <= t; a++) o.push(e.getUint32(a * 4));
  const r = new Uint8Array(n.slice(o[0], o[1])),
    i = JSON.parse(new TextDecoder("utf8").decode(r));
  i.buffers = [];
  for (let a = 1; a < t; a++) {
    const s = o[a],
      u = o[a + 1] || n.byteLength;
    i.buffers.push(new DataView(n.slice(s, u)));
  }
  return i;
}
function ke(n) {
  const e = [],
    t = [],
    o = new TextEncoder();
  let r = [];
  n.buffers !== void 0 && ((r = n.buffers), delete n.buffers);
  const i = o.encode(JSON.stringify(n));
  t.push(i.buffer);
  for (let d = 0; d < r.length; d++) {
    const h = r[d];
    t.push(ArrayBuffer.isView(h) ? h.buffer : h);
  }
  const a = t.length;
  e.push(4 * (a + 1));
  for (let d = 0; d + 1 < t.length; d++)
    e.push(e[e.length - 1] + t[d].byteLength);
  const s = new Uint8Array(e[e.length - 1] + t[t.length - 1].byteLength),
    u = new DataView(s.buffer);
  u.setUint32(0, a);
  for (let d = 0; d < e.length; d++) u.setUint32(4 * (d + 1), e[d]);
  for (let d = 0; d < t.length; d++) s.set(new Uint8Array(t[d]), e[d]);
  return s.buffer;
}
function _e(n) {
  if (!n || !Array.isArray(n) || n.length === 0) return;
  const e = [];
  for (let t = 0; t < n.length; t += 1) {
    const o = n[t];
    if ("buffer" in o && "byteOffset" in o) {
      const r = [...new Uint8Array(o.buffer)];
      e.push({
        ...o,
        byteLength: o.byteLength,
        byteOffset: o.byteOffset,
        buffer: r,
      });
    } else e.push([...new Uint8Array(o)]);
  }
  return e;
}
const ve = require("path");
function k() {}
ve.join(__dirname, ".");
function Pe() {
  console.log("Trying to load zmq");
  const n = require("zeromq");
  return (n.context.blocky = !1), console.info("ZMQ loaded."), n;
}
function Ee(n, e) {
  const t = n.transport === "tcp" ? ":" : "-",
    o = n[`${e}_port`];
  if (!o) throw new Error(`Port not found for channel "${e}"`);
  return `${n.transport}://${n.ip}${t}${o}`;
}
const Te = ["username", "version", "session", "msg_id", "msg_type"],
  z = {
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
function Ne(n) {
  if (n.channel !== "iopub") return;
  const e = n.header.msg_type;
  if (e in z) {
    const t = z[e];
    if (t === void 0) return;
    const o = Object.keys(t),
      r = n.content;
    for (let i = 0; i < o.length; i++) {
      let a = t[o[i]];
      Array.isArray(a) || (a = [a]);
      const s = o[i];
      if (!(s in r) || typeof r[s] !== a[0])
        switch (a[0]) {
          case "string":
            r[s] = "";
            break;
          case "boolean":
            r[s] = !1;
            break;
          case "object":
            r[s] = {};
            break;
          case "number":
            r[s] = 0;
            break;
        }
    }
  }
}
function Oe(n, e) {
  const t = n.header;
  Te.forEach((o) => {
    typeof t[o] != "string" && (t[o] = "");
  }),
    typeof n.channel != "string" && (n.channel = e),
    n.content || (n.content = {}),
    n.metadata || (n.metadata = {}),
    n.channel === "iopub" && Ne(n);
}
class Ce {
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
      } catch (o) {
        console.error("Error during socket shutdown", o);
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
  generateChannel(e, t, o) {
    const r = o();
    return (
      r.connect(Ee(e, t)),
      this.processSocketMessages(t, r).catch((i) =>
        console.error(`Failed to read messages from channel ${t}`, i),
      ),
      r
    );
  }
  async processSocketMessages(e, t) {
    for await (const o of t) {
      if (this.closed) break;
      this.onIncomingMessage(e, o);
    }
  }
  generateChannels(e) {
    const t = Pe(),
      o = P(),
      r = {
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
              routingId: o,
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
              routingId: o,
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
              routingId: o,
              sendHighWaterMark: 0,
              receiveHighWaterMark: 0,
              maxMessageSize: -1,
            }),
        ),
      };
    return r.iopub.subscribe(), r;
  }
  onIncomingMessage(e, t) {
    const o = this.closed
      ? {}
      : L.decode(t, this.connection.key, this.connection.signature_scheme);
    (o.channel = e),
      this.receiveHooks.length
        ? (this.msgChain = this.msgChain
            .then(() => {
              const r = this.serialize(o);
              return Promise.all(this.receiveHooks.map((i) => i(r)));
            })
            .then(() => this.fireOnMessage(o, e)))
        : (this.msgChain = this.msgChain.then(() => this.fireOnMessage(o, e)));
  }
  fireOnMessage(e, t) {
    if (!this.closed)
      try {
        Oe(e, t), this.onmessage({ data: e, type: "message", target: this });
      } catch (o) {
        console.error(
          `Failed to handle message in Jupyter Kernel package ${JSON.stringify(e)}`,
          o,
        );
      }
  }
  sendMessage(e, t) {
    const o = L.encode(
      e,
      this.connection.key,
      this.connection.signature_scheme,
    );
    if (!t && this.sendHooks.length) {
      const r = this.serialize(e);
      this.sendChain = this.sendChain
        .then(() => Promise.all(this.sendHooks.map((i) => i(r, k))))
        .then(async () => {
          try {
            await this.postToSocket(e.channel, o);
          } catch (i) {
            console.error(
              `Failed to write data to the kernel channel ${e.channel}`,
              o,
              i,
            );
          }
        });
    } else
      this.sendChain = this.sendChain.then(() => {
        this.postToSocket(e.channel, o);
      });
    this.sendChain.catch(k);
  }
  postToSocket(e, t) {
    const o = this.channels[e];
    o
      ? o.send(t).catch((r) => {
          console.error("Error communicating with the kernel", r);
        })
      : console.error(`Attempting to send message on invalid channel: ${e}`);
  }
}
let B;
class Ie {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, o, r) {
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
      (this.kernel = this.initializeKernel(e, t, o, r));
  }
  get rawKernel() {
    return this.kernel;
  }
  initializeKernel(e, t, o, r) {
    const i = require("@jupyterlab/services"),
      a = require("@jupyterlab/services/lib/kernel/serialize");
    let s;
    class u extends Ce {
      constructor() {
        super(e.connection, a.serialize), (s = this);
      }
    }
    const d = i.ServerConnection.makeSettings({ WebSocket: u, wsUrl: "RAW" });
    B || (B = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const h = new B.KernelConnection({
      serverSettings: d,
      clientId: t,
      handleComms: !1,
      username: o,
      model: r,
    });
    return (
      s &&
        (s.emit("open"),
        s.addReceiveHook(this.onKernelSocketMessage.bind(this)),
        s.addSendHook(this.mirrorSend.bind(this))),
      { realKernel: h, socket: s, kernelProcess: e }
    );
  }
  async mirrorSend(e, t) {
    if (
      typeof e == "string" &&
      e.includes("shell") &&
      e.includes("execute_request")
    ) {
      const o = F(e);
      if (o.channel === "shell" && o.header.msg_type === "execute_request") {
        if (!$(o)) return;
        this.mirrorExecuteRequest(o);
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
    var i, a, s, u, d, h, m, p, f;
    const t = P(),
      o = me();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: o,
      }),
      typeof e == "string"
        ? $(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: _e([e]),
          }),
      typeof e != "string" ||
        e.includes(D) ||
        e.includes(x.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg"))
    ) {
      const b = F(e);
      if (!$(b)) return;
      const y =
          ((i = b.header) == null ? void 0 : i.msg_type) === "comm_open" &&
          ((u =
            (s = (a = b.content) == null ? void 0 : a.data) == null
              ? void 0
              : s.state) == null
            ? void 0
            : u._model_module) === "@jupyter-widgets/output" &&
          ((m =
            (h = (d = b.content) == null ? void 0 : d.data) == null
              ? void 0
              : h.state) == null
            ? void 0
            : m._model_name) === "OutputModel",
        N =
          ((p = b.header) == null ? void 0 : p.msg_type) === "comm_close" &&
          this.outputWidgetIds.has(
            (f = b.content) == null ? void 0 : f.comm_id,
          );
      y
        ? this.outputWidgetIds.add(b.content.comm_id)
        : N && this.outputWidgetIds.delete(b.content.comm_id);
    }
  }
  onKernelSocketResponse(e) {
    const t = this.waitingMessageIds.get(e.id);
    t && (this.waitingMessageIds.delete(e.id), t.resultPromise.resolve());
  }
}
const De = require("path");
class _ {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, o, r) {
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
        value: o,
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
      this.dbtTerminal.debug(
        "NotebookKernelClient",
        "creating python bridge for notebook:",
        e,
      ),
      (this.python = this.executionInfrastructure.createPythonBridge(
        De.dirname(e),
      )),
      this.initializeNotebookKernel(e);
  }
  async isInitialized() {
    return new Promise((e) => {
      const t = setInterval(() => {
        var o, r;
        this.dbtTerminal.debug(
          "Notebookclient",
          "isInitialized",
          !!((o = this.kernel) != null && o.rawKernel),
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
        var o;
        this.isInitializing ||
          (e((o = this.kernel) == null ? void 0 : o.rawKernel),
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
          (s) => s`notebook_kernel.get_connection_file()`,
        ),
        o = JSON.parse(Q.readFileSync(t, { encoding: "utf-8" })),
        r = await this.python.lock((s) => s`notebook_kernel.get_session_id()`),
        i = { connection: o, pid: r },
        a = new Ie(i, P(), P(), { name: o.kernel_name, id: P() });
      (this.kernel = a),
        this.disposables.push(
          a.postMessage((s) => this._postMessageEmitter.fire(s)),
        ),
        this.dbtTerminal.log(
          `Notebook Kernel started with PID: ${r} connection: ${JSON.stringify(o)}`,
        ),
        this.getDependenciesVersion();
    } catch (t) {
      let o = t.message;
      t instanceof H.PythonException && (o = t.exception.message),
        this.dbtTerminal.error(
          c.TelemetryEvents["Notebook/KernelInitializationError"],
          o,
          t,
        ),
        l.window.showErrorMessage(o);
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
    return new Promise(async (o, r) => {
      try {
        this.dbtTerminal.log(`storeDataInKernel: ${e}`),
          await this.python.lock(
            (i) =>
              i`notebook_kernel.store_sql_result(${e}, ${JSON.stringify(t)})`,
          ),
          o(!0);
      } catch (i) {
        this.dbtTerminal.error(
          c.TelemetryEvents["Notebook/StoreDataInKernelError"],
          i.exception.message,
          i,
        ),
          r(i);
      }
    });
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
    return t.realKernel.registerCommTarget(e, (o, r) => {
      this.dbtTerminal.log(`registerCommTarget registered: ${e}`, o, r);
    });
  }
  async getPythonCodeByType(e, t) {
    return (
      this.dbtTerminal.debug("getPythonCodeByType", e, t),
      await this.python.lock(
        (o) => o`notebook_kernel.get_python_code_by_type(${e}, ${t})`,
      )
    );
  }
  async executePython(e, t, o) {
    return new Promise(async (r, i) => {
      var h, m;
      if (
        !(
          (m = (h = this.kernel) == null ? void 0 : h.rawKernel) != null &&
          m.realKernel
        )
      ) {
        i(new Error("Kernel not found"));
        return;
      }
      const a = t.metadata.cellId;
      this.dbtTerminal.log(`Executing python code in cell: ${a}`);
      const s = require("@jupyterlab/services");
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
          f.payload.forEach((b) => {
            if (b.data && b.data.hasOwnProperty("text/plain")) {
              const y = this.addToCellData(
                {
                  output_type: "stream",
                  text: b.data["text/plain"].toString(),
                  name: "stdout",
                  metadata: {},
                  execution_count: f.execution_count,
                },
                p,
                t,
              );
              y && o(y);
            }
          });
      };
      const d = [];
      return (
        u.done.finally(() => {
          u.dispose(), r(d.filter((p) => !!p));
        }),
        (u.onStdin = (p) => {
          this.dbtTerminal.log("onStdin", p);
        }),
        (u.onIOPub = (p) => {
          if (s.KernelMessage.isCommOpenMsg(p)) this.handleCommOpen(p);
          else if (s.KernelMessage.isExecuteResultMsg(p))
            d.push(this.handleExecuteResult(p, t));
          else if (s.KernelMessage.isExecuteInputMsg(p))
            this.handleExecuteInput(p);
          else if (s.KernelMessage.isStatusMsg(p)) {
            const f = p;
            this.handleStatusMessage(f);
          } else if (s.KernelMessage.isStreamMsg(p)) {
            const f = this.handleStreamMessage(p, t);
            f == null ||
              f.forEach((b) => {
                d.push(b);
              });
          } else
            s.KernelMessage.isDisplayDataMsg(p)
              ? d.push(this.handleDisplayData(p, t))
              : s.KernelMessage.isUpdateDisplayDataMsg(p)
                ? this.handleUpdateDisplayDataMessage(p)
                : s.KernelMessage.isClearOutputMsg(p)
                  ? this.handleClearOutput(p)
                  : s.KernelMessage.isErrorMsg(p)
                    ? d.push(this.handleError(p, t))
                    : s.KernelMessage.isCommOpenMsg(p) ||
                      (s.KernelMessage.isCommMsgMsg(p)
                        ? this.handleCommMsg(p)
                        : s.KernelMessage.isCommCloseMsg(p) ||
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
    var o;
    this.ownedCommIds.add(e.content.comm_id);
    const t = ((o = e.content.data) == null ? void 0 : o.state) || void 0;
    e.content.target_name === x.DefaultCommTarget &&
      t &&
      t._model_module === "@jupyter-widgets/output" &&
      this.commIdsMappedToWidgetOutputModels.add(e.content.comm_id);
  }
  handleCommMsg(e) {
    const t = e.content.data;
    if (!(!t || t.method !== "update" || typeof t.state != "object")) {
      if ("msg_id" in t.state && typeof t.state.msg_id == "string") {
        const o = "msg_id" in e.parent_header ? e.parent_header : void 0;
        (this.ownedRequestMsgIds.has(e.content.comm_id) ||
          (o && this.ownedRequestMsgIds.has(o.msg_id))) &&
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
        const o = "IPY_MODEL_";
        t.state.children.forEach((r) => {
          if (typeof r != "string")
            return this.dbtTerminal.warn(
              "Came across a comm update message a child that isn't a string",
              r,
            );
          if (!r.startsWith(o))
            return this.dbtTerminal.warn(
              `Came across a comm update message a child that start start with ${o}`,
              r,
            );
          const i = r.substring(o.length);
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
  addToCellData(e, t, o) {
    if (e.data && typeof e.data == "object" && D in e.data) {
      const a = e.data[D];
      if (a && "model_id" in a) {
        const s = _.modelIdsOwnedByCells.get(o) || new Set();
        s.add(a.model_id), _.modelIdsOwnedByCells.set(o, s);
      }
    }
    const r = W(e);
    if (o.document.isClosed) return;
    this.dbtTerminal.log(
      o.document.uri.fsPath,
      `Update output with mimes ${r.items.map((a) => a.mime).toString()}`,
    );
    const i = C(t);
    return (
      (this.outputsAreSpecificToAWidget.length &&
        this.outputsAreSpecificToAWidget[
          this.outputsAreSpecificToAWidget.length - 1
        ].msgIdsToSwallow === i &&
        r.items.every((a) => this.canMimeTypeBeRenderedByWidgetManager(a))) ||
        (this.outputsAreSpecificToAWidget.length &&
          this.outputsAreSpecificToAWidget[
            this.outputsAreSpecificToAWidget.length - 1
          ].msgIdsToSwallow === i &&
          this.dbtTerminal.warn("NotebookAddToCellData", "unknown operation")),
      r
    );
  }
  canMimeTypeBeRenderedByWidgetManager(e) {
    const t = e.mime;
    if (t === w.stderr || t === w.stdout || t === w.error) return !0;
    if (t === D) {
      const o = JSON.parse(new TextDecoder().decode(e.data));
      return !(
        typeof o.model_id == "string" &&
        this.commIdsMappedToWidgetOutputModels.has(o.model_id)
      );
    }
    return !t.startsWith("application/vnd");
  }
  handleExecuteInput(e) {}
  handleStatusMessage(e) {}
  handleStreamMessage(e, t) {
    var r;
    if (
      C(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === C(e)
    )
      return;
    const o =
      e.content.name === "stdout"
        ? l.NotebookCellOutputItem.stdout("").mime
        : l.NotebookCellOutputItem.stderr("").mime;
    if (
      (!this.streamsReAttachedToExecutingCell &&
        !this.lastUsedStreamOutput &&
        t.outputs.length &&
        t.outputs[t.outputs.length - 1].items.length >= 1 &&
        t.outputs[t.outputs.length - 1].items.every((i) => i.mime === o) &&
        (this.lastUsedStreamOutput = {
          output: t.outputs[0],
          stream: e.content.name,
        }),
      (this.streamsReAttachedToExecutingCell = !0),
      ((r = this.lastUsedStreamOutput) == null ? void 0 : r.stream) ===
        e.content.name)
    )
      return [
        W({
          output_type: "stream",
          name: e.content.name,
          text: e.content.text,
        }),
        this.lastUsedStreamOutput.output,
      ];
    {
      const i = ue(j(e.content.text));
      return [W({ output_type: "stream", name: e.content.name, text: i })];
    }
  }
  handleDisplayData(e, t) {
    const o = {
      output_type: "display_data",
      data: de(e.content.data),
      metadata: e.content.metadata,
      transient: e.content.transient,
    };
    return this.addToCellData(o, e, t);
  }
  handleClearOutput(e) {
    if (
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === C(e)
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
    const o = e.content.traceback;
    this.dbtTerminal.log(`Traceback for error ${o}`);
    const r = {
      output_type: "error",
      ename: e.content.ename,
      evalue: e.content.evalue,
      traceback: o,
    };
    return this.addToCellData(r, e, t);
  }
}
Object.defineProperty(_, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
var Me = function (n, e, t, o) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, o);
    else
      for (var s = n.length - 1; s >= 0; s--)
        (a = n[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Se = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
exports.NotebookDependencies = class {
  constructor(e, t, o, r) {
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
        value: o,
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
    for (const o of e) {
      const r = ["-m", "pip", "show", o],
        { stderr: i } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: this.pythonEnvironment.pythonPath,
            args: r,
            cwd: c.getFirstWorkspacePath(),
            envVars: this.pythonEnvironment.environmentVariables,
          })
          .completeWithTerminalOutput();
      i && t.push(o);
    }
    return t;
  }
  checkDbtDependencies(e, t) {
    return e
      .map((o) => {
        try {
          return t.findPackageVersion(o), null;
        } catch {
          return o;
        }
      })
      .filter(Boolean);
  }
  async installMissingPythonPackages(e) {
    const t = await this.checkPythonDependencies(e);
    if (!t.length) return;
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing python dependencies for notebook",
        t,
      ),
      (await l.window.showInformationMessage(
        `You need these python packages ${t.join(", ")} to use this notebook`,
        "Install",
        "Cancel",
      )) !== "Install")
    )
      throw (
        (this.telemetry.sendTelemetryEvent(
          c.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
        ),
        new Error("User cancelled dbt package installation"))
      );
    this.dbtTerminal.debug("Notebook", "installing required dependencies", t),
      await l.window.withProgress(
        {
          title: "Installing python packages...",
          location: l.ProgressLocation.Notification,
          cancellable: !1,
        },
        async () => {
          try {
            const r = ["-m", "pip", "install", ...t],
              { stdout: i, stderr: a } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: r,
                    cwd: c.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !i.includes("Successfully installed") &&
              !i.includes("Requirement already satisfied") &&
              a
            )
              throw new Error(a);
            this.dbtTerminal.log(
              "Notebook dependencies have been installed successfully.",
            ),
              this.telemetry.sendTelemetryEvent(
                c.TelemetryEvents["Notebook/DependenciesInstalled"],
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
      );
  }
  async installMissingDbtPackages(e, t) {
    const o = this.checkDbtDependencies(
      e.map((a) => `${a.name}`),
      t,
    );
    if (!o.length) return;
    const r = e.filter((a) => o.includes(a.package));
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing dbt dependencies for notebook",
        r,
      ),
      (await l.window.showInformationMessage(
        `You need these dbt packages ${r.map((a) => `${a.package}`).join(", ")} to use this notebook`,
        "Install",
        "Cancel",
      )) !== "Install")
    )
      throw (
        (this.telemetry.sendTelemetryEvent(
          c.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
        ),
        new Error("User cancelled dbt package installation"))
      );
    await l.window.withProgress(
      {
        title: "Installing dbt packages...",
        location: l.ProgressLocation.Notification,
        cancellable: !1,
      },
      async () => {
        try {
          const a = r.map((u) => `${u.package}@${u.version}`);
          this.dbtTerminal.debug("Notebook", "installing dbt packages", a);
          const s = await t.installDbtPackages(a);
          a.forEach((u) => {
            if (!s.includes(`Added new package ${u}`))
              throw new Error(`Failed to install dbt package ${u}`);
          }),
            this.dbtTerminal.log(
              "Notebook dependencies have been installed successfully.",
              s,
            ),
            this.telemetry.sendTelemetryEvent(
              c.TelemetryEvents["Notebook/DependenciesInstalled"],
            );
        } catch (a) {
          return (
            this.telemetry.sendTelemetryError(
              c.TelemetryEvents["Notebook/DependenciesInstallError"],
              a,
            ),
            l.window.showErrorMessage(c.extendErrorWithSupportLinks(a.message)),
            !1
          );
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
        this.installMissingPythonPackages(
          e.filter((o) => o.type === "python").map((o) => o.package),
        ),
        this.installMissingDbtPackages(
          e.filter((o) => o.type === "dbt"),
          t,
        ),
      ]);
  }
  async getDependenciesVersion() {
    const e = ["-m", "jupyter", "--version"],
      { stdout: t, stderr: o } = await this.commandProcessExecutionFactory
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
      o
    )
      throw new Error(o);
    const r = t.split(`
`),
      i = {};
    return (
      r.forEach((a) => {
        const [s, u] = a.split(":").map((d) => d.trim());
        s && u && (i[s] = u);
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
            const o = [
                "-m",
                "pip",
                "install",
                "ipykernel",
                "jupyter_client",
                "jupyter_contrib_nbextensions",
                "ipywidgets",
              ],
              { stdout: r, stderr: i } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: o,
                    cwd: c.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !r.includes("Successfully installed") &&
              !r.includes("Requirement already satisfied") &&
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
          } catch (o) {
            return (
              this.telemetry.sendTelemetryError(
                c.TelemetryEvents["Notebook/DependenciesInstallError"],
                o,
              ),
              l.window.showErrorMessage(
                c.extendErrorWithSupportLinks(o.message),
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
exports.NotebookDependencies = Me(
  [
    c.provideSingleton(exports.NotebookDependencies),
    Se("design:paramtypes", [
      c.DBTTerminal,
      c.TelemetryService,
      c.CommandProcessExecutionFactory,
      c.PythonEnvironment,
    ]),
  ],
  exports.NotebookDependencies,
);
var je = function (n, e, t, o) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, o);
    else
      for (var s = n.length - 1; s >= 0; s--)
        (a = n[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  xe = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
let M = class {
  constructor(e, t, o) {
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
        value: o,
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
      const t = new _(
        e.fsPath,
        this.executionInfrastructure,
        this.notebookDependencies,
        this.dbtTerminal,
      );
      this.clientMap.set(
        e.fsPath,
        new Promise((o) => {
          t.getKernel().then(() => o(t));
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
M = je(
  [
    c.provideSingleton(M),
    xe("design:paramtypes", [
      c.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      c.DBTTerminal,
    ]),
  ],
  M,
);
const Re = ["python", "sql", "jinja-sql"],
  Ae = "jinja-sql",
  J = ".notebook",
  G = "datapilot",
  E = "datapilot-notebook";
var We = function (n, e, t, o) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, o);
    else
      for (var s = n.length - 1; s >= 0; s--)
        (a = n[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  $e = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
exports.DatapilotNotebookController = class {
  constructor(e, t, o, r, i, a) {
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
        value: o,
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
        value: i,
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
      Object.defineProperty(this, "executionOrder", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "untitledCounter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: -1,
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
      (this.controller = l.notebooks.createNotebookController(
        this.id,
        E,
        this.label,
      )),
      (this.controller.supportedLanguages = Re),
      (this.controller.supportsExecutionOrder = !0),
      (this.controller.executeHandler = this._executeAll.bind(this)),
      this.disposables.push(
        l.workspace.onDidChangeNotebookDocument((s) => {
          s.contentChanges.forEach(async (u) => {
            u.addedCells &&
              (await this.updateCellId(s.notebook.getCells(), s.notebook)),
              u.removedCells &&
                u.removedCells.forEach((d) => {
                  this._onNotebookCellEvent.fire({
                    cellId: d.metadata.cellId,
                    notebook: s.notebook.uri.fsPath,
                    result: null,
                    event: "delete",
                    fragment: d.document.uri.fragment,
                    languageId: d.document.languageId,
                  });
                });
          });
        }),
      ),
      this.disposables.push(this.controller),
      this.disposables.push(
        l.workspace.onDidOpenNotebookDocument(async (s) => {
          await this.onNotebookOpen(s);
        }),
      ),
      this.disposables.push(
        l.workspace.onDidCloseNotebookDocument(async (s) => {
          await this.onNotebookClose(s);
        }),
      );
  }
  async getNotebookByTemplate(e) {
    var i;
    this.dbtTerminal.debug("Notebook", "getting notebook by template", e);
    const t = await this.altimate.getNotebooks();
    if (e) return (i = t.find((a) => a.name === e)) == null ? void 0 : i.data;
    this.dbtTerminal.debug("Notebook", "picking template notebook");
    const o = [
        {
          label: "Blank notebook",
          description: "",
          id: "",
          template: {
            cells: [
              {
                cell_type: l.NotebookCellKind.Code,
                source: [],
                languageId: Ae,
                metadata: {},
              },
            ],
          },
        },
        ...t.map((a) => ({
          label: a.name,
          description: a.description,
          id: a.id,
          template: a.data,
        })),
      ],
      r = await l.window.showQuickPick(o, {
        title: "Select a notebook",
        canPickMany: !1,
      });
    return r == null ? void 0 : r.template;
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
  getUntitledFileName() {
    return (
      this.untitledCounter++,
      this.untitledCounter === 0
        ? "untitled"
        : `untitled-${this.untitledCounter}`
    );
  }
  async createNotebook(e) {
    const { notebookId: t, template: o, context: r } = e || {};
    this.dbtTerminal.debug("Notebook", "creating notebook", e),
      l.window.withProgress(
        {
          location: l.ProgressLocation.Notification,
          title: "Launching notebook...",
          cancellable: !1,
        },
        async () => {
          var i;
          try {
            const a = t ? null : await this.getNotebookByTemplate(o),
              s =
                await this.queryManifestService.getOrPickProjectFromWorkspace();
            if (!s) {
              l.window.showErrorMessage("No dbt project selected.");
              return;
            }
            if (
              ((i = a == null ? void 0 : a.metadata) != null &&
                i.dependencies &&
                (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
                  a.metadata.dependencies,
                  s,
                )),
              r && a)
            )
              for (const g in r)
                r.hasOwnProperty(g) &&
                  typeof r[g] == "string" &&
                  (a.cells[0].source = a.cells[0].source.map((O) =>
                    O.replace(`%_${g}_%`, r[g]),
                  ));
            const u = t || this.getUntitledFileName(),
              d = l.Uri.parse(`${s.projectRoot}/${u}${J}`).with({ scheme: G });
            this.dbtTerminal.debug("Notebook", "opening notebook", d);
            const h = await l.workspace.openNotebookDocument(d),
              m = await l.window.showNotebookDocument(h);
            if (!a) return;
            const p = new l.WorkspaceEdit(),
              f = new l.NotebookEdit(new l.NotebookRange(0, 0), []);
            f.newNotebookMetadata = a.metadata || {};
            const b = [f],
              y = [];
            a.cells.forEach((g, O) => {
              const A = new l.NotebookCellData(
                g.cell_type,
                g.source.join(`
`),
                g.languageId,
              );
              (A.metadata = g.metadata),
                b.push(new l.NotebookEdit(new l.NotebookRange(O, O), [A])),
                y.push(A);
            });
            const N = new l.NotebookEdit(new l.NotebookRange(0, 0), y);
            (N.newNotebookMetadata = a.metadata || {}),
              (N.newNotebookMetadata.context = r),
              p.set(m.notebook.uri, b),
              await l.workspace.applyEdit(p);
          } catch (a) {
            const s =
              a instanceof H.PythonException ? a.exception.message : a.message;
            this.dbtTerminal.error(
              `${c.TelemetryEvents["Notebook/LaunchError"]}`,
              s,
              a,
            ),
              l.window.showErrorMessage(c.extendErrorWithSupportLinks(s));
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
      !!!l.window.visibleNotebookEditors.find(
        (i) => i.notebook.uri.fsPath === t.uri.fsPath,
      )
    )
      return;
    const r = [];
    if (
      (e.forEach((i) => {
        let a = i.metadata.cellId;
        if (!a) {
          a = this.genUniqueId(i);
          const s = { ...i.metadata, cellId: a },
            u = l.NotebookEdit.updateCellMetadata(i.index, s);
          r.push(u);
        }
        this._onNotebookCellEvent.fire({
          cellId: a,
          notebook: t.uri.fsPath,
          event: "update",
          fragment: i.document.uri.fragment,
          languageId: i.document.languageId,
        });
      }),
      r.length > 0)
    ) {
      const i = new l.WorkspaceEdit();
      i.set(t.uri, r), await l.workspace.applyEdit(i);
    }
  }
  async onNotebookClose(e) {
    if (e.notebookType !== E) return;
    const t = await this.clientMapper.getNotebookClient(e.uri);
    t && t.dispose(),
      this.dbtTerminal.debug(
        "Notebookcontroller",
        `notebook closed: ${e.uri.fsPath}`,
        e.isUntitled,
      ),
      e.isUntitled && (await l.workspace.fs.delete(e.uri));
  }
  async onNotebookOpen(e) {
    var i, a, s;
    if (e.notebookType !== E) return;
    this.dbtTerminal.debug(
      "Notebookcontroller",
      `notebook open: ${e.uri.fsPath}`,
    );
    const t = await this.clientMapper.initializeNotebookClient(e.uri),
      o = await t.getKernel();
    if (!(o != null && o.realKernel))
      throw new Error("Unable to initialize kernel");
    this.disposables.push(
      t.postMessage((u) => {
        this.sendMessageToPreloadScript(u);
      }, this),
    );
    const r = e.getCells();
    if (
      (this.updateCellId(r, e),
      this.dbtTerminal.debug(
        "Notebook",
        "should auto run notebook?",
        (i = e.metadata) == null ? void 0 : i.autoRun,
      ),
      (a = e.metadata) != null && a.autoRun)
    ) {
      this.dbtTerminal.debug("Notebook", "auto running notebook");
      for (const u of r)
        u.document.getText().trim() &&
          (await this._doExecution(
            u,
            e,
            (s = e.metadata) == null ? void 0 : s.isUserNotebook,
          ));
    }
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
  _executeAll(e, t, o) {
    var i, a;
    const r = (i = l.window.activeNotebookEditor) == null ? void 0 : i.notebook;
    if (!r) {
      this.telemetry.sendTelemetryError(
        `${c.TelemetryEvents["Notebook/Execute"]}Error`,
        new Error("No active notebook found"),
      ),
        l.window.showErrorMessage(
          c.extendErrorWithSupportLinks("No active notebook found"),
        );
      return;
    }
    for (const s of e)
      this._doExecution(
        s,
        r,
        (a = r.metadata) == null ? void 0 : a.isUserNotebook,
      );
  }
  filterIPyWidgets(e, t = !1) {
    return e.map((o) => {
      const i = o.items.find(
        (a) => a.mime === "application/vnd.jupyter.widget-view+json",
      )
        ? t
          ? [l.NotebookCellOutputItem.text("IPyWidgets not supported")]
          : []
        : o.items;
      return new l.NotebookCellOutput(i);
    });
  }
  async _doExecution(e, t, o) {
    this.dbtTerminal.debug("Notebook", "executing cell", e.index, t.uri.fsPath);
    const r = this.controller.createNotebookCellExecution(e);
    (r.executionOrder = ++this.executionOrder),
      r.start(Date.now()),
      r.token.onCancellationRequested((i) => {
        r.end(!0, Date.now());
      });
    try {
      r.clearOutput();
      const i = [],
        a = await this.clientMapper.getNotebookClient(t.uri);
      switch (e.document.languageId) {
        case "python":
          this.telemetry.startTelemetryEvent(
            c.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const s = await a.executePython(e.document.getText(), e, (h) => {
            r.appendOutput(this.filterIPyWidgets([h], o));
          });
          s && r.appendOutput(this.filterIPyWidgets(s, o));
          break;
        case "jinja-sql":
        case "sql":
          this.dbtTerminal.debug(
            "Notebook",
            "executing sql",
            e.document.getText(),
          );
          const u =
            await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!u) {
            l.window.showErrorMessage("No dbt project selected.");
            return;
          }
          this.telemetry.startTelemetryEvent(
            c.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const d = await u.executeSQL(e.document.getText(), "", !0);
          if (
            (this._onNotebookCellEvent.fire({
              cellId: e.metadata.cellId,
              notebook: t.uri.fsPath,
              result: d,
              event: "add",
              languageId: e.document.languageId,
            }),
            o ||
              (i.push(
                l.NotebookCellOutputItem.json(
                  d,
                  "application/perspective-json",
                ),
              ),
              r.appendOutput(new l.NotebookCellOutput(i))),
            await a.storeDataInKernel(e.metadata.cellId, d),
            o)
          ) {
            const h = `
import pandas as pd
from IPython.display import display, HTML
from ydata_profiling import ProfileReport
from io import StringIO

data = cell_${e.metadata.cellId}['data']
# Create a DataFrame
df = pd.DataFrame(data)

# Display the DataFrame
# display(HTML(df.to_html()))

profile = ProfileReport(df, title="Profiling Report")
profile.to_notebook_iframe()
`,
              m = await a.executePython(h, e, (p) => {
                r.appendOutput(this.filterIPyWidgets([p], o));
              });
            m && r.appendOutput(this.filterIPyWidgets(m, o));
          }
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
    } catch (i) {
      r.replaceOutput([
        new l.NotebookCellOutput([l.NotebookCellOutputItem.error(i)]),
      ]),
        this.telemetry.endTelemetryEvent(
          c.TelemetryEvents["Notebook/Execute"],
          i,
          { language: e.document.languageId },
        ),
        r.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = We(
  [
    c.provideSingleton(exports.DatapilotNotebookController),
    $e("design:paramtypes", [
      M,
      c.QueryManifestService,
      c.TelemetryService,
      c.DBTTerminal,
      exports.NotebookDependencies,
      c.AltimateRequest,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class Be {
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
    const t = new l.NotebookCellStatusBarItem(
      "$(globe) Profile your query",
      l.NotebookCellStatusBarAlignment.Left,
    );
    return (
      (t.command = "dbtPowerUser.datapilotProfileYourQuery"),
      (t.tooltip = "Profile your query"),
      []
    );
  }
}
var Fe = function (n, e, t, o) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, o);
    else
      for (var s = n.length - 1; s >= 0; s--)
        (a = n[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ke = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
const V = require("path");
let S = class {
  constructor(e, t, o) {
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
      Object.defineProperty(this, "altimate", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o,
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
      r = (this.dbtProjectContainer.getFromGlobalState("notebooks") || {})[t];
    return new TextEncoder().encode(JSON.stringify(r));
  }
  async writeFile(e, t, o) {
    await this.customSave(e, t),
      this._emitter.fire([{ type: l.FileChangeType.Changed, uri: e }]);
  }
  delete(e, t) {
    const o = e.with({ path: V.posix.dirname(e.path) });
    this._emitter.fire([
      { type: l.FileChangeType.Changed, uri: o },
      { uri: e, type: l.FileChangeType.Deleted },
    ]);
  }
  rename(e, t, o) {
    this._emitter.fire([
      { type: l.FileChangeType.Deleted, uri: e },
      { type: l.FileChangeType.Created, uri: t },
    ]);
  }
  getFileNameFromUri(e) {
    return V.basename(e.fsPath, J);
  }
  async customSave(e, t) {
    var o;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const r =
        (o = l.window.activeNotebookEditor) == null ? void 0 : o.notebook;
      if (!r) {
        this.dbtTerminal.warn(
          c.TelemetryEvents["Notebook/SaveError"],
          "No active notebook found",
        );
        return;
      }
      this.dbtTerminal.log("saving notebook", r);
      const i = r.metadata.name;
      if (i) {
        this.saveNotebook(r, i);
        return;
      }
      const a = await l.window.showInputBox({ prompt: "Your notebook name?" });
      if (!a) return;
      this.saveNotebook(r, a);
      const s = this.getFileNameFromUri(e),
        u = e.with({ path: e.path.replace(s, a) });
      await l.commands.executeCommand(
        "workbench.action.revertAndCloseActiveEditor",
      ),
        await l.window.showNotebookDocument(
          await l.workspace.openNotebookDocument(u),
        ),
        l.window.showInformationMessage("Notebook saved successfully");
    } catch (r) {
      this.dbtTerminal.error(
        c.TelemetryEvents["Notebook/SaveError"],
        r.message,
        r,
      );
    }
  }
  saveNotebook(e, t) {
    const o = Y(e, t);
    return (
      this.dbtTerminal.log("saving notebook", t, o),
      this.altimate.addNotebook({
        name: t,
        description: "",
        data: o,
        tags_list: [],
      }),
      this.dbtTerminal.log("notebook saved", t, o),
      o
    );
  }
};
S = Fe(
  [
    c.provideSingleton(S),
    Ke("design:paramtypes", [
      c.DBTProjectContainer,
      c.DBTTerminal,
      c.AltimateRequest,
    ]),
  ],
  S,
);
var Le = function (n, e, t, o) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, o);
    else
      for (var s = n.length - 1; s >= 0; s--)
        (a = n[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  qe = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
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
      o = this.cellByNotebookAutocompleteMap.get(e.notebook) || [];
    switch (e.event) {
      case "add":
      case "update":
        this.cellByNotebookAutocompleteMap.set(e.notebook, [
          ...o.filter((r) => r.cellId !== e.cellId),
          t,
        ]);
        break;
      case "delete":
        this.cellByNotebookAutocompleteMap.set(
          e.notebook,
          o.filter((r) => r.cellId !== e.cellId),
        );
        break;
    }
  }
};
exports.NotebookService = Le(
  [
    c.provideSingleton(exports.NotebookService),
    qe("design:paramtypes", [exports.DatapilotNotebookController]),
  ],
  exports.NotebookService,
);
const Ue = {
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
            cell_type: l.NotebookCellKind.Code,
            source: ["{{context.query}}"],
            languageId: "jinja-sql",
            metadata: { cellId: "jinja_sql_cu6pt" },
          },
          {
            cell_type: l.NotebookCellKind.Code,
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
var ze = function (n, e, t, o) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, o);
    else
      for (var s = n.length - 1; s >= 0; s--)
        (a = n[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ve = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
exports.NotebookProviders = class {
  constructor(e, t, o, r) {
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
        value: o,
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
        l.notebooks.registerNotebookCellStatusBarItemProvider(E, new Be()),
        l.workspace.registerNotebookSerializer(E, this.notebookProvider, {}),
        this.notebookController,
      ),
      this.disposables.push(
        l.workspace.registerFileSystemProvider(
          G,
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
exports.NotebookProviders = ze(
  [
    c.provideSingleton(exports.NotebookProviders),
    Ve("design:paramtypes", [
      I,
      exports.DatapilotNotebookController,
      S,
      c.DBTTerminal,
    ]),
  ],
  exports.NotebookProviders,
);
exports.CustomNotebooks = Ue;
exports.NotebookKernelClient = _;