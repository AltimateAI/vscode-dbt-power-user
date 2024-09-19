"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  u = require("@extension"),
  J = require("python-bridge"),
  X = require("fs"),
  Z = require("@nteract/messaging/lib/wire-protocol");
function ee(n) {
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
const L = ee(Z),
  te = (n) => ("getCells" in n ? n.getCells() : n.cells),
  oe = (n) =>
    n instanceof l.NotebookCellData ? n.value : n.document.getText(),
  ne = (n) =>
    n instanceof l.NotebookCellData ? n.languageId : n.document.languageId,
  Y = (n, e) => {
    var o;
    const t = [];
    for (const r of te(n))
      t.push({
        cell_type: r.kind,
        source: oe(r).split(/\r?\n/g),
        languageId: ne(r),
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
  E = () => Math.random().toString(36).substr(2, 9);
var re = function (n, e, t, o) {
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
        var d;
        const c = new l.NotebookCellData(
          s.cell_type,
          (d = s.source) == null
            ? void 0
            : d.join(`
`),
          s.languageId,
        );
        return (c.metadata = s.metadata), c;
      }),
      a = new l.NotebookData(i);
    return (a.metadata = r.metadata), a;
  }
  async serializeNotebook(e, t) {
    const o = Y(e);
    return new TextEncoder().encode(JSON.stringify(o));
  }
};
I = re([u.provideSingleton(I)], I);
var w;
(function (n) {
  (n.error = "application/vnd.code.notebook.error"),
    (n.stderr = "application/vnd.code.notebook.stderr"),
    (n.stdout = "application/vnd.code.notebook.stdout");
})(w || (w = {}));
const ie = ["text/plain", "text/markdown", w.stderr, w.stdout],
  U = [
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
v.set("display_data", x);
v.set("error", me);
v.set("execute_result", x);
v.set("stream", be);
v.set("update_display_data", x);
function R(n) {
  const e = v.get(n.output_type);
  let t;
  return (
    e
      ? (t = e(n))
      : (console.warn(
          `Unable to translate cell from ${n.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = x(n))),
    t
  );
}
function B(n) {
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
function x(n) {
  const e = B(n);
  ("image/svg+xml" in n.data || "image/png" in n.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (n.data) for (const o in n.data) t.push(se(o, n.data[o]));
  return new l.NotebookCellOutput(ae(t), e);
}
function ae(n) {
  return n.sort((e, t) => {
    const o = (a, s) => (
      a.endsWith(".*") && (a = a.substr(0, a.indexOf(".*"))), s.startsWith(a)
    );
    let r = U.findIndex((a) => o(a, e.mime)),
      i = U.findIndex((a) => o(a, t.mime));
    return (
      z(e) && (r = -1),
      z(t) && (i = -1),
      (r = r === -1 ? 100 : r),
      (i = i === -1 ? 100 : i),
      r - i
    );
  });
}
function z(n) {
  if (n.mime.startsWith("application/vnd."))
    try {
      return new TextDecoder().decode(n.data).length === 0;
    } catch {}
  return !1;
}
function se(n, e) {
  if (!e) return l.NotebookCellOutputItem.text("", n);
  try {
    if (
      (n.startsWith("text/") || ie.includes(n)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? S(e) : e;
      return l.NotebookCellOutputItem.text(t, n);
    } else
      return n.startsWith("image/") &&
        typeof e == "string" &&
        n !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(le(e), n)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), n)
          : ((e = Array.isArray(e) ? S(e) : e),
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
function le(n) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(n, "base64")
    : Uint8Array.from(atob(n), (e) => e.charCodeAt(0));
}
function S(n) {
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
function ce(n) {
  let e = n;
  do (n = e), (e = n.replace(/[^\n]\x08/gm, ""));
  while (e.length < n.length);
  return n;
}
function ue(n) {
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
function de(n) {
  return ue(ce(n));
}
function O(n) {
  if (n.parent_header && "msg_id" in n.parent_header)
    return n.parent_header.msg_id;
}
function pe(n) {
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
const he = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function W(n) {
  let e = typeof n == "string" ? n : "";
  return (
    typeof n != "string" &&
      "content" in n &&
      "code" in n.content &&
      typeof n.content.code == "string" &&
      (e = n.content.code),
    !e.includes(he)
  );
}
function be(n) {
  const e = S(n.text),
    t =
      n.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], B(n));
}
function me(n) {
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
      { ...B(n), originalError: n },
    )
  );
}
var j;
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
})(j || (j = {}));
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
function ge(n = null) {
  return new fe(n);
}
var N = {};
Object.defineProperty(N, "__esModule", { value: !0 });
N.serialize = F = N.deserialize = void 0;
function ye(n) {
  let e;
  return typeof n == "string" ? (e = JSON.parse(n)) : (e = ke(n)), e;
}
var F = (N.deserialize = ye);
function we(n) {
  var e;
  let t;
  return (
    !((e = n.buffers) === null || e === void 0) && e.length
      ? (t = _e(n))
      : (t = JSON.stringify(n)),
    t
  );
}
N.serialize = we;
function ke(n) {
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
      c = o[a + 1] || n.byteLength;
    i.buffers.push(new DataView(n.slice(s, c)));
  }
  return i;
}
function _e(n) {
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
    c = new DataView(s.buffer);
  c.setUint32(0, a);
  for (let d = 0; d < e.length; d++) c.setUint32(4 * (d + 1), e[d]);
  for (let d = 0; d < t.length; d++) s.set(new Uint8Array(t[d]), e[d]);
  return s.buffer;
}
function ve(n) {
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
const Ee = require("path");
function k() {}
Ee.join(__dirname, ".");
function Pe() {
  console.log("Trying to load zmq");
  const n = require("zeromq");
  return (n.context.blocky = !1), console.info("ZMQ loaded."), n;
}
function Ne(n, e) {
  const t = n.transport === "tcp" ? ":" : "-",
    o = n[`${e}_port`];
  if (!o) throw new Error(`Port not found for channel "${e}"`);
  return `${n.transport}://${n.ip}${t}${o}`;
}
const Te = ["username", "version", "session", "msg_id", "msg_type"],
  V = {
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
function Ce(n) {
  if (n.channel !== "iopub") return;
  const e = n.header.msg_type;
  if (e in V) {
    const t = V[e];
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
    n.channel === "iopub" && Ce(n);
}
class Ie {
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
      r.connect(Ne(e, t)),
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
      o = E(),
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
let $;
class De {
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
    class c extends Ie {
      constructor() {
        super(e.connection, a.serialize), (s = this);
      }
    }
    const d = i.ServerConnection.makeSettings({ WebSocket: c, wsUrl: "RAW" });
    $ || ($ = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const h = new $.KernelConnection({
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
        if (!W(o)) return;
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
    var i, a, s, c, d, h, b, p, f;
    const t = E(),
      o = ge();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: o,
      }),
      typeof e == "string"
        ? W(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: ve([e]),
          }),
      typeof e != "string" ||
        e.includes(D) ||
        e.includes(j.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg"))
    ) {
      const m = F(e);
      if (!W(m)) return;
      const y =
          ((i = m.header) == null ? void 0 : i.msg_type) === "comm_open" &&
          ((c =
            (s = (a = m.content) == null ? void 0 : a.data) == null
              ? void 0
              : s.state) == null
            ? void 0
            : c._model_module) === "@jupyter-widgets/output" &&
          ((b =
            (h = (d = m.content) == null ? void 0 : d.data) == null
              ? void 0
              : h.state) == null
            ? void 0
            : b._model_name) === "OutputModel",
        T =
          ((p = m.header) == null ? void 0 : p.msg_type) === "comm_close" &&
          this.outputWidgetIds.has(
            (f = m.content) == null ? void 0 : f.comm_id,
          );
      y
        ? this.outputWidgetIds.add(m.content.comm_id)
        : T && this.outputWidgetIds.delete(m.content.comm_id);
    }
  }
  onKernelSocketResponse(e) {
    const t = this.waitingMessageIds.get(e.id);
    t && (this.waitingMessageIds.delete(e.id), t.resultPromise.resolve());
  }
}
const Me = require("path");
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
        Me.dirname(e),
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
        u.TelemetryEvents["Notebook/KernelCloseError"],
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
        o = JSON.parse(X.readFileSync(t, { encoding: "utf-8" })),
        r = await this.python.lock((s) => s`notebook_kernel.get_session_id()`),
        i = { connection: o, pid: r },
        a = new De(i, E(), E(), { name: o.kernel_name, id: E() });
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
      t instanceof J.PythonException && (o = t.exception.message),
        this.dbtTerminal.error(
          u.TelemetryEvents["Notebook/KernelInitializationError"],
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
          u.TelemetryEvents["Notebook/StoreDataInKernelError"],
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
      var h, b;
      if (
        !(
          (b = (h = this.kernel) == null ? void 0 : h.rawKernel) != null &&
          b.realKernel
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
      const c = await this.kernel.rawKernel.realKernel.requestExecute(
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
      if (!c) {
        i(new Error("Unknown request error"));
        return;
      }
      c.onReply = (p) => {
        if (t.document.isClosed) {
          c.dispose();
          return;
        }
        const f = p.content;
        f.payload &&
          f.payload.forEach((m) => {
            if (m.data && m.data.hasOwnProperty("text/plain")) {
              const y = this.addToCellData(
                {
                  output_type: "stream",
                  text: m.data["text/plain"].toString(),
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
        c.done.finally(() => {
          c.dispose(), r(d.filter((p) => !!p));
        }),
        (c.onStdin = (p) => {
          this.dbtTerminal.log("onStdin", p);
        }),
        (c.onIOPub = (p) => {
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
              f.forEach((m) => {
                d.push(m);
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
        c
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
    e.content.target_name === j.DefaultCommTarget &&
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
    const r = R(e);
    if (o.document.isClosed) return;
    this.dbtTerminal.log(
      o.document.uri.fsPath,
      `Update output with mimes ${r.items.map((a) => a.mime).toString()}`,
    );
    const i = O(t);
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
      O(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === O(e)
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
        R({
          output_type: "stream",
          name: e.content.name,
          text: e.content.text,
        }),
        this.lastUsedStreamOutput.output,
      ];
    {
      const i = de(S(e.content.text));
      return [R({ output_type: "stream", name: e.content.name, text: i })];
    }
  }
  handleDisplayData(e, t) {
    const o = {
      output_type: "display_data",
      data: pe(e.content.data),
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
      ].msgIdsToSwallow === O(e)
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
var Se = function (n, e, t, o) {
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
  je = function (n, e) {
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
            cwd: u.getFirstWorkspacePath(),
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
  async installMissingPythonPackages(e, t) {
    const o = await this.checkPythonDependencies(e);
    if (!o.length) return;
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing python dependencies for notebook",
        o,
      ),
      (await l.window.showInformationMessage(
        `You need the following python packages to use this notebook: ${o.join(", ")}`,
        "Install",
        "Cancel",
      )) !== "Install")
    )
      throw (
        (this.telemetry.sendTelemetryEvent(
          u.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
        ),
        new Error("User cancelled python package installation"))
      );
    return (
      this.dbtTerminal.debug("Notebook", "installing required dependencies", o),
      await l.window.withProgress(
        {
          title: "Installing python packages...",
          location: l.ProgressLocation.Notification,
          cancellable: !1,
        },
        async () => {
          try {
            const i = ["-m", "pip", "install", ...o],
              { stdout: a, stderr: s } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: i,
                    cwd: u.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !a.includes("Successfully installed") &&
              !a.includes("Requirement already satisfied") &&
              s
            )
              throw new Error(s);
            return (
              this.dbtTerminal.log(
                "Notebook dependencies have been installed successfully.",
              ),
              this.telemetry.sendTelemetryEvent(
                u.TelemetryEvents["Notebook/DependenciesInstalled"],
              ),
              await t.initialize(),
              !0
            );
          } catch (i) {
            this.telemetry.sendTelemetryError(
              u.TelemetryEvents["Notebook/DependenciesInstallError"],
              i,
            ),
              l.window.showErrorMessage(
                u.extendErrorWithSupportLinks(i.message),
              );
          }
        },
      )
    );
  }
  async installMissingDbtPackages(e, t) {
    const o = this.checkDbtDependencies(
      e.map((a) => `${a.name}`),
      t,
    );
    if (!o.length) return;
    const r = e.filter((a) => (a.name ? o.includes(a.name) : !1));
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing dbt dependencies for notebook",
        r,
      ),
      (await l.window.showInformationMessage(
        `You need following dbt packages to use this notebook: ${r.map((a) => `${a.package}`).join(", ")}`,
        "Install",
        "Cancel",
      )) !== "Install")
    )
      throw (
        (this.telemetry.sendTelemetryEvent(
          u.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
        ),
        new Error("User cancelled dbt package installation"))
      );
    return await l.window.withProgress(
      {
        title: "Installing dbt packages...",
        location: l.ProgressLocation.Notification,
        cancellable: !1,
      },
      async () => {
        try {
          const a = r.map((c) => `${c.package}@${c.version}`);
          this.dbtTerminal.debug("Notebook", "installing dbt packages", a),
            await t.installDbtPackages(a),
            await t.initialize();
          const s = this.checkDbtDependencies(
            e.map((c) => `${c.name}`),
            t,
          );
          if (s.length)
            throw new Error(`Failed to install dbt packages ${s.join(", ")}`);
          return (
            this.dbtTerminal.log(
              "Notebook dependencies have been installed successfully.",
            ),
            this.telemetry.sendTelemetryEvent(
              u.TelemetryEvents["Notebook/DependenciesInstalled"],
            ),
            !0
          );
        } catch (a) {
          this.telemetry.sendTelemetryError(
            u.TelemetryEvents["Notebook/DependenciesInstallError"],
            a,
          ),
            l.window.showErrorMessage(u.extendErrorWithSupportLinks(a.message));
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
          t,
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
          cwd: u.getFirstWorkspacePath(),
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
        const [s, c] = a.split(":").map((d) => d.trim());
        s && c && (i[s] = c);
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
            u.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
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
                    cwd: u.getFirstWorkspacePath(),
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
                u.TelemetryEvents["Notebook/DependenciesInstalled"],
              ),
              !0
            );
          } catch (o) {
            return (
              this.telemetry.sendTelemetryError(
                u.TelemetryEvents["Notebook/DependenciesInstallError"],
                o,
              ),
              l.window.showErrorMessage(
                u.extendErrorWithSupportLinks(o.message),
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
          u.TelemetryEvents["Notebook/DependenciesInstallError"],
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
            cwd: u.getFirstWorkspacePath(),
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
exports.NotebookDependencies = Se(
  [
    u.provideSingleton(exports.NotebookDependencies),
    je("design:paramtypes", [
      u.DBTTerminal,
      u.TelemetryService,
      u.CommandProcessExecutionFactory,
      u.PythonEnvironment,
    ]),
  ],
  exports.NotebookDependencies,
);
var xe = function (n, e, t, o) {
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
  Ae = function (n, e) {
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
M = xe(
  [
    u.provideSingleton(M),
    Ae("design:paramtypes", [
      u.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      u.DBTTerminal,
    ]),
  ],
  M,
);
const Re = ["python", "sql", "jinja-sql"],
  We = "jinja-sql",
  G = ".notebook",
  Q = "datapilot",
  P = "datapilot-notebook";
var $e = function (n, e, t, o) {
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
  Fe = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
const Be = require("path");
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
        P,
        this.label,
      )),
      (this.controller.supportedLanguages = Re),
      (this.controller.supportsExecutionOrder = !0),
      (this.controller.executeHandler = this._executeAll.bind(this)),
      this.disposables.push(
        l.workspace.onDidChangeNotebookDocument((s) => {
          s.contentChanges.forEach(async (c) => {
            c.addedCells &&
              (await this.updateCellId(s.notebook.getCells(), s.notebook)),
              c.removedCells &&
                c.removedCells.forEach((d) => {
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
    var o;
    return (
      this.dbtTerminal.debug("Notebook", "getting notebook by template", e),
      e
        ? (o = (await this.altimate.getPreConfiguredNotebooks()).find(
            (r) => r.name === e,
          )) == null
          ? void 0
          : o.data
        : (this.dbtTerminal.debug("Notebook", "sending blank notebook"),
          {
            cells: [
              {
                cell_type: l.NotebookCellKind.Code,
                source: [],
                languageId: We,
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
  getUntitledFileName() {
    return (
      this.untitledCounter++,
      this.untitledCounter === 0
        ? "untitled"
        : `untitled-${this.untitledCounter}`
    );
  }
  async createNotebook(e) {
    var a;
    const {
      notebookId: t,
      template: o,
      context: r = {},
      notebookSchema: i,
    } = e || {};
    if (
      (this.dbtTerminal.debug("Notebook", "creating notebook", e),
      !r.model &&
        (a = l.window.activeTextEditor) != null &&
        a.document.uri.fsPath.endsWith(".sql"))
    ) {
      const s = Be.basename(
          l.window.activeTextEditor.document.uri.fsPath,
          ".sql",
        ),
        c = l.window.activeTextEditor.document.getText();
      (r.model = s), (r.query = c);
    }
    l.window.withProgress(
      {
        location: l.ProgressLocation.Notification,
        title: "Launching notebook...",
        cancellable: !1,
      },
      async () => {
        var s;
        try {
          const c = i || (t ? null : await this.getNotebookByTemplate(o)),
            d = await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!d) {
            l.window.showErrorMessage("No dbt project selected.");
            return;
          }
          if (
            ((s = c == null ? void 0 : c.metadata) != null &&
              s.dependencies &&
              (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
                c.metadata.dependencies,
                d,
              )),
            r && c)
          )
            for (const g in r)
              r.hasOwnProperty(g) &&
                typeof r[g] == "string" &&
                (c.cells[0].source = c.cells[0].source.map((C) =>
                  C.replace(`%_${g}_%`, r[g]),
                ));
          const h = t || this.getUntitledFileName(),
            b = l.Uri.parse(`${d.projectRoot}/${h}${G}`).with({ scheme: Q });
          this.dbtTerminal.debug("Notebook", "opening notebook", b);
          const p = await l.workspace.openNotebookDocument(b),
            f = await l.window.showNotebookDocument(p);
          if (!c) return;
          const m = new l.WorkspaceEdit(),
            y = new l.NotebookEdit(new l.NotebookRange(0, 0), []);
          y.newNotebookMetadata = c.metadata || {};
          const T = [y],
            q = [];
          c.cells.forEach((g, C) => {
            const A = new l.NotebookCellData(
              g.cell_type,
              g.source.join(`
`),
              g.languageId,
            );
            (A.metadata = g.metadata),
              T.push(new l.NotebookEdit(new l.NotebookRange(C, C), [A])),
              q.push(A);
          });
          const K = new l.NotebookEdit(new l.NotebookRange(0, 0), q);
          (K.newNotebookMetadata = c.metadata || {}),
            (K.newNotebookMetadata.context = r),
            m.set(f.notebook.uri, T),
            await l.workspace.applyEdit(m),
            this.handleMetadataUpdateInNotebook(f.notebook);
        } catch (c) {
          const d =
            c instanceof J.PythonException ? c.exception.message : c.message;
          this.dbtTerminal.error(
            `${u.TelemetryEvents["Notebook/LaunchError"]}`,
            d,
            c,
          ),
            l.window.showErrorMessage(u.extendErrorWithSupportLinks(d));
        }
      },
    );
  }
  async handleMetadataUpdateInNotebook(e) {
    var o, r, i;
    const t = e.getCells();
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "[handleMetadataUpdateInNotebook] should auto run notebook?",
        (o = e.metadata) == null ? void 0 : o.autoRun,
      ),
      (r = e.metadata) != null && r.autoRun)
    ) {
      this.dbtTerminal.debug("Notebook", "auto running notebook");
      for (const a of t)
        a.document.getText().trim() &&
          (await this._doExecution(
            a,
            e,
            (i = e.metadata) == null ? void 0 : i.isUserNotebook,
          ));
    }
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
            c = l.NotebookEdit.updateCellMetadata(i.index, s);
          r.push(c);
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
    if (e.notebookType !== P) return;
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
    var i;
    if (e.notebookType !== P) return;
    this.dbtTerminal.debug(
      "Notebookcontroller",
      `notebook open: ${e.uri.fsPath}`,
    );
    const t = await this.clientMapper.initializeNotebookClient(e.uri),
      o = await t.getKernel();
    if (!(o != null && o.realKernel))
      throw new Error("Unable to initialize kernel");
    this.disposables.push(
      t.postMessage((a) => {
        this.sendMessageToPreloadScript(a);
      }, this),
    );
    const r = e.getCells();
    this.updateCellId(r, e),
      this.dbtTerminal.debug(
        "Notebook",
        "should auto run notebook?",
        (i = e.metadata) == null ? void 0 : i.autoRun,
      );
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
  _executeAll(e, t, o) {
    var i, a;
    const r = (i = l.window.activeNotebookEditor) == null ? void 0 : i.notebook;
    if (!r) {
      this.telemetry.sendTelemetryError(
        `${u.TelemetryEvents["Notebook/Execute"]}Error`,
        new Error("No active notebook found"),
      ),
        l.window.showErrorMessage(
          u.extendErrorWithSupportLinks("No active notebook found"),
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
  updateContextVariablesInKernel(e, t, o) {
    return t.executePython(
      `
manifest_path="${e.getManifestPath()}"
project_name="${e.getProjectName()}"
            `,
      o,
      () => {},
    );
  }
  async _doExecution(e, t, o) {
    var i;
    this.dbtTerminal.debug("Notebook", "executing cell", e.index, t.uri.fsPath);
    const r = this.controller.createNotebookCellExecution(e);
    (r.executionOrder = ++this.executionOrder),
      r.start(Date.now()),
      r.token.onCancellationRequested((a) => {
        r.end(!0, Date.now());
      });
    try {
      r.clearOutput();
      const a = [],
        s = await this.clientMapper.getNotebookClient(t.uri),
        c = await this.queryManifestService.getOrPickProjectFromWorkspace();
      if (!c) {
        l.window.showErrorMessage("No dbt project selected."),
          r.end(!0, Date.now());
        return;
      }
      switch (
        ((i = t.metadata) != null &&
          i.dependencies &&
          (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
            t.metadata.dependencies,
            c,
          )),
        await this.updateContextVariablesInKernel(c, s, e),
        e.document.languageId)
      ) {
        case "python":
          this.telemetry.startTelemetryEvent(
            u.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const d = await s.executePython(e.document.getText(), e, (b) => {
            r.appendOutput(this.filterIPyWidgets([b], o));
          });
          d && r.appendOutput(this.filterIPyWidgets(d, o));
          break;
        case "jinja-sql":
        case "sql":
          this.dbtTerminal.debug(
            "Notebook",
            "executing sql",
            e.document.getText(),
          ),
            this.telemetry.startTelemetryEvent(
              u.TelemetryEvents["Notebook/Execute"],
              { language: e.document.languageId },
            );
          const { metadata: h } = e;
          if ((h == null ? void 0 : h.execution_type) === "compile") {
            const b = await c.unsafeCompileQuery(e.document.getText());
            r.appendOutput(
              new l.NotebookCellOutput([
                l.NotebookCellOutputItem.text(
                  b,
                  h == null ? void 0 : h.output_mime_type,
                ),
              ]),
            );
          } else {
            const b = await c.executeSQL(e.document.getText(), "", !0);
            this._onNotebookCellEvent.fire({
              cellId: e.metadata.cellId,
              notebook: t.uri.fsPath,
              result: b,
              event: "add",
              languageId: e.document.languageId,
            }),
              o ||
                (a.push(
                  l.NotebookCellOutputItem.json(
                    b,
                    "application/perspective-json",
                  ),
                ),
                r.appendOutput(new l.NotebookCellOutput(a))),
              await s.storeDataInKernel(e.metadata.cellId, b);
          }
          break;
        default:
          l.window.showErrorMessage(
            `Language: ${e.document.languageId} not supported`,
          );
          break;
      }
      this.telemetry.endTelemetryEvent(u.TelemetryEvents["Notebook/Execute"], {
        language: e.document.languageId,
      }),
        r.end(!0, Date.now());
    } catch (a) {
      r.replaceOutput([
        new l.NotebookCellOutput([l.NotebookCellOutputItem.error(a)]),
      ]),
        this.telemetry.endTelemetryEvent(
          u.TelemetryEvents["Notebook/Execute"],
          a,
          { language: e.document.languageId },
        ),
        r.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = $e(
  [
    u.provideSingleton(exports.DatapilotNotebookController),
    Fe("design:paramtypes", [
      M,
      u.QueryManifestService,
      u.TelemetryService,
      u.DBTTerminal,
      exports.NotebookDependencies,
      u.AltimateRequest,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class qe {
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
var Ke = function (n, e, t, o) {
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
  Le = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
const H = require("path");
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
  async readFile(e) {
    const t = this.getFileNameFromUri(e);
    if (t.includes("untitled"))
      return new TextEncoder().encode(JSON.stringify({ cells: [] }));
    {
      const o = (await this.altimate.getNotebooks(t)) || [],
        r = o.length ? o[0].data : {};
      return (
        "cells" in r &&
          "metadata" in r &&
          (r.metadata
            ? (r.metadata = { ...r.metadata, id: o[0].id })
            : (r.metadata = { id: o[0].id })),
        new TextEncoder().encode(JSON.stringify(r))
      );
    }
  }
  async writeFile(e, t, o) {
    (await this.customSave(e, t)) || this.markFileAsDirty(e);
  }
  delete(e, t) {
    const o = e.with({ path: H.posix.dirname(e.path) });
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
    return H.basename(e.fsPath, G);
  }
  async customSave(e, t) {
    var o;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const r =
        (o = l.window.activeNotebookEditor) == null ? void 0 : o.notebook;
      if (!r)
        return (
          this.dbtTerminal.warn(
            u.TelemetryEvents["Notebook/SaveError"],
            "No active notebook found",
          ),
          !1
        );
      this.dbtTerminal.log("saving notebook", r);
      const i = r.metadata.name;
      if (i)
        return (
          await this.saveNotebook(r, i),
          this._emitter.fire([{ type: l.FileChangeType.Changed, uri: e }]),
          !0
        );
      const a = await l.window.showInputBox({ prompt: "Your notebook name?" });
      if (!a) return !1;
      await this.saveNotebook(r, a);
      const s = this.getFileNameFromUri(e),
        c = e.with({ path: e.path.replace(s, a) });
      return (
        await l.commands.executeCommand(
          "workbench.action.revertAndCloseActiveEditor",
        ),
        await l.window.showNotebookDocument(
          await l.workspace.openNotebookDocument(c),
        ),
        this._emitter.fire([{ type: l.FileChangeType.Created, uri: e }]),
        l.window.showInformationMessage("Notebook saved successfully"),
        !0
      );
    } catch (r) {
      this.dbtTerminal.error(
        u.TelemetryEvents["Notebook/SaveError"],
        r.message,
        r,
      ),
        l.window.showErrorMessage(
          u.extendErrorWithSupportLinks(
            `Failed to save notebook. Error: ${r.message}`,
          ),
        );
    }
    return !1;
  }
  async saveNotebook(e, t) {
    try {
      const o = Y(e, t);
      return (
        this.dbtTerminal.log("saving notebook", t, o),
        "id" in e.metadata
          ? await this.altimate.updateNotebook(e.metadata.id, {
              name: t,
              description: "",
              data: o,
              tags_list: [],
            })
          : await this.altimate.addNotebook({
              name: t,
              description: "",
              data: o,
              tags_list: [],
            }),
        this.dbtTerminal.log("notebook saved", t, o),
        o
      );
    } catch (o) {
      this.dbtTerminal.error(
        u.TelemetryEvents["Notebook/SaveError"],
        o.message,
        o,
      ),
        l.window.showErrorMessage(
          u.extendErrorWithSupportLinks(
            `Failed to save notebook. Error: ${o.message}`,
          ),
        );
    }
  }
  async markFileAsDirty(e) {
    const t = l.workspace.notebookDocuments.find(
      (o) => o.uri.toString() === e.toString(),
    );
    if (t) {
      const o = t.cellAt(0),
        r = o.document,
        i = r.lineCount - 1,
        a = r.lineAt(i).text.length,
        s = new l.WorkspaceEdit();
      s.insert(o.document.uri, new l.Position(i, a), " "),
        await l.workspace.applyEdit(s);
      const c = new l.WorkspaceEdit();
      c.delete(o.document.uri, new l.Range(i, a, i, a + 1)),
        await l.workspace.applyEdit(c);
    }
  }
};
exports.NotebookFileSystemProvider = Ke(
  [
    u.provideSingleton(exports.NotebookFileSystemProvider),
    Le("design:paramtypes", [u.DBTTerminal, u.AltimateRequest]),
  ],
  exports.NotebookFileSystemProvider,
);
var Ue = function (n, e, t, o) {
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
  ze = function (n, e) {
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
exports.NotebookService = Ue(
  [
    u.provideSingleton(exports.NotebookService),
    ze("design:paramtypes", [exports.DatapilotNotebookController]),
  ],
  exports.NotebookService,
);
const Ve = {
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
var He = function (n, e, t, o) {
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
  Je = function (n, e) {
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
        l.notebooks.registerNotebookCellStatusBarItemProvider(P, new qe()),
        l.workspace.registerNotebookSerializer(P, this.notebookProvider, {}),
        this.notebookController,
      ),
      this.disposables.push(
        l.workspace.registerFileSystemProvider(
          Q,
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
exports.NotebookProviders = He(
  [
    u.provideSingleton(exports.NotebookProviders),
    Je("design:paramtypes", [
      I,
      exports.DatapilotNotebookController,
      exports.NotebookFileSystemProvider,
      u.DBTTerminal,
    ]),
  ],
  exports.NotebookProviders,
);
exports.CustomNotebooks = Ve;
exports.NotebookKernelClient = _;
