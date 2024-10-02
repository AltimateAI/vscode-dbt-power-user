"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  u = require("@extension"),
  L = require("python-bridge"),
  H = require("fs"),
  J = require("@nteract/messaging/lib/wire-protocol");
function Y(n) {
  const e = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (n) {
    for (const t in n)
      if (t !== "default") {
        const r = Object.getOwnPropertyDescriptor(n, t);
        Object.defineProperty(
          e,
          t,
          r.get ? r : { enumerable: !0, get: () => n[t] },
        );
      }
  }
  return (e.default = n), Object.freeze(e);
}
const $ = Y(J),
  G = (n) => ("getCells" in n ? n.getCells() : n.cells),
  Q = (n) => (n instanceof l.NotebookCellData ? n.value : n.document.getText()),
  X = (n) =>
    n instanceof l.NotebookCellData ? n.languageId : n.document.languageId,
  A = (n, e, t) => {
    var o;
    const r = [];
    for (const i of G(n))
      r.push({
        cell_type: i.kind,
        source: Q(i).split(/\r?\n/g),
        languageId: X(i),
        metadata: i.metadata,
        outputs: t ? i.outputs : void 0,
      });
    return {
      cells: r,
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
  _ = () => Math.random().toString(36).substr(2, 9);
function Z() {
  const n = new Date(),
    e = n.toLocaleDateString("en-GB").replace(/\//g, "-"),
    t = n.toLocaleTimeString("en-GB", { hour12: !1 }).replace(/:/g, "-");
  return `${e}-${t}`;
}
var ee = function (n, e, t, r) {
  var o = arguments.length,
    i =
      o < 3 ? e : r === null ? (r = Object.getOwnPropertyDescriptor(e, t)) : r,
    s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(n, e, t, r);
  else
    for (var a = n.length - 1; a >= 0; a--)
      (s = n[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(e, t, i) : s(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let E = class {
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(e, t) {
    const r = new TextDecoder().decode(e);
    let o;
    try {
      o = JSON.parse(r);
    } catch {
      o = { cells: [] };
    }
    const i = o.cells.map((a) => {
        var d;
        const c = new l.NotebookCellData(
          a.cell_type,
          (d = a.source) == null
            ? void 0
            : d.join(`
`),
          a.languageId,
        );
        return (c.metadata = a.metadata), (c.outputs = a.outputs), c;
      }),
      s = new l.NotebookData(i);
    return (s.metadata = o.metadata), s;
  }
  async serializeNotebook(e, t) {
    const r = A(e);
    return new TextEncoder().encode(JSON.stringify(r));
  }
};
E = ee([u.provideSingleton(E)], E);
var g;
(function (n) {
  (n.error = "application/vnd.code.notebook.error"),
    (n.stderr = "application/vnd.code.notebook.stderr"),
    (n.stdout = "application/vnd.code.notebook.stdout");
})(g || (g = {}));
const te = ["text/plain", "text/markdown", g.stderr, g.stdout],
  F = [
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
  k = new Map();
k.set("display_data", S);
k.set("error", de);
k.set("execute_result", S);
k.set("stream", ue);
k.set("update_display_data", S);
function M(n) {
  const e = k.get(n.output_type);
  let t;
  return (
    e
      ? (t = e(n))
      : (console.warn(
          `Unable to translate cell from ${n.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = S(n))),
    t
  );
}
function W(n) {
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
function S(n) {
  const e = W(n);
  ("image/svg+xml" in n.data || "image/png" in n.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (n.data) for (const r in n.data) t.push(ne(r, n.data[r]));
  return new l.NotebookCellOutput(re(t), e);
}
function re(n) {
  return n.sort((e, t) => {
    const r = (s, a) => (
      s.endsWith(".*") && (s = s.substr(0, s.indexOf(".*"))), a.startsWith(s)
    );
    let o = F.findIndex((s) => r(s, e.mime)),
      i = F.findIndex((s) => r(s, t.mime));
    return (
      B(e) && (o = -1),
      B(t) && (i = -1),
      (o = o === -1 ? 100 : o),
      (i = i === -1 ? 100 : i),
      o - i
    );
  });
}
function B(n) {
  if (n.mime.startsWith("application/vnd."))
    try {
      return new TextDecoder().decode(n.data).length === 0;
    } catch {}
  return !1;
}
function ne(n, e) {
  if (!e) return l.NotebookCellOutputItem.text("", n);
  try {
    if (
      (n.startsWith("text/") || te.includes(n)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? D(e) : e;
      return l.NotebookCellOutputItem.text(t, n);
    } else
      return n.startsWith("image/") &&
        typeof e == "string" &&
        n !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(oe(e), n)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), n)
          : ((e = Array.isArray(e) ? D(e) : e),
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
function oe(n) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(n, "base64")
    : Uint8Array.from(atob(n), (e) => e.charCodeAt(0));
}
function D(n) {
  if (Array.isArray(n)) {
    let e = "";
    for (let t = 0; t < n.length; t += 1) {
      const r = n[t];
      t < n.length - 1 &&
      !r.endsWith(`
`)
        ? (e = e.concat(`${r}
`))
        : (e = e.concat(r));
    }
    return e;
  }
  return n.toString();
}
function ie(n) {
  let e = n;
  do (n = e), (e = n.replace(/[^\n]\x08/gm, ""));
  while (e.length < n.length);
  return n;
}
function ae(n) {
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
function se(n) {
  return ae(ie(n));
}
function N(n) {
  if (n.parent_header && "msg_id" in n.parent_header)
    return n.parent_header.msg_id;
}
function le(n) {
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
const ce = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function j(n) {
  let e = typeof n == "string" ? n : "";
  return (
    typeof n != "string" &&
      "content" in n &&
      "code" in n.content &&
      typeof n.content.code == "string" &&
      (e = n.content.code),
    !e.includes(ce)
  );
}
function ue(n) {
  const e = D(n.text),
    t =
      n.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], W(n));
}
function de(n) {
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
      { ...W(n), originalError: n },
    )
  );
}
var I;
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
})(I || (I = {}));
const O = "application/vnd.jupyter.widget-view+json";
class pe {
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
function he(n = null) {
  return new pe(n);
}
var P = {};
Object.defineProperty(P, "__esModule", { value: !0 });
P.serialize = R = P.deserialize = void 0;
function be(n) {
  let e;
  return typeof n == "string" ? (e = JSON.parse(n)) : (e = me(n)), e;
}
var R = (P.deserialize = be);
function fe(n) {
  var e;
  let t;
  return (
    !((e = n.buffers) === null || e === void 0) && e.length
      ? (t = ge(n))
      : (t = JSON.stringify(n)),
    t
  );
}
P.serialize = fe;
function me(n) {
  const e = new DataView(n),
    t = e.getUint32(0),
    r = [];
  if (t < 2) throw new Error("Invalid incoming Kernel Message");
  for (let s = 1; s <= t; s++) r.push(e.getUint32(s * 4));
  const o = new Uint8Array(n.slice(r[0], r[1])),
    i = JSON.parse(new TextDecoder("utf8").decode(o));
  i.buffers = [];
  for (let s = 1; s < t; s++) {
    const a = r[s],
      c = r[s + 1] || n.byteLength;
    i.buffers.push(new DataView(n.slice(a, c)));
  }
  return i;
}
function ge(n) {
  const e = [],
    t = [],
    r = new TextEncoder();
  let o = [];
  n.buffers !== void 0 && ((o = n.buffers), delete n.buffers);
  const i = r.encode(JSON.stringify(n));
  t.push(i.buffer);
  for (let d = 0; d < o.length; d++) {
    const h = o[d];
    t.push(ArrayBuffer.isView(h) ? h.buffer : h);
  }
  const s = t.length;
  e.push(4 * (s + 1));
  for (let d = 0; d + 1 < t.length; d++)
    e.push(e[e.length - 1] + t[d].byteLength);
  const a = new Uint8Array(e[e.length - 1] + t[t.length - 1].byteLength),
    c = new DataView(a.buffer);
  c.setUint32(0, s);
  for (let d = 0; d < e.length; d++) c.setUint32(4 * (d + 1), e[d]);
  for (let d = 0; d < t.length; d++) a.set(new Uint8Array(t[d]), e[d]);
  return a.buffer;
}
function ye(n) {
  if (!n || !Array.isArray(n) || n.length === 0) return;
  const e = [];
  for (let t = 0; t < n.length; t += 1) {
    const r = n[t];
    if ("buffer" in r && "byteOffset" in r) {
      const o = [...new Uint8Array(r.buffer)];
      e.push({
        ...r,
        byteLength: r.byteLength,
        byteOffset: r.byteOffset,
        buffer: o,
      });
    } else e.push([...new Uint8Array(r)]);
  }
  return e;
}
const we = require("path");
function y() {}
we.join(__dirname, ".");
function ke() {
  console.log("Trying to load zmq");
  const n = require("zeromq");
  return (n.context.blocky = !1), console.info("ZMQ loaded."), n;
}
function _e(n, e) {
  const t = n.transport === "tcp" ? ":" : "-",
    r = n[`${e}_port`];
  if (!r) throw new Error(`Port not found for channel "${e}"`);
  return `${n.transport}://${n.ip}${t}${r}`;
}
const ve = ["username", "version", "session", "msg_id", "msg_type"],
  q = {
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
function Pe(n) {
  if (n.channel !== "iopub") return;
  const e = n.header.msg_type;
  if (e in q) {
    const t = q[e];
    if (t === void 0) return;
    const r = Object.keys(t),
      o = n.content;
    for (let i = 0; i < r.length; i++) {
      let s = t[r[i]];
      Array.isArray(s) || (s = [s]);
      const a = r[i];
      if (!(a in o) || typeof o[a] !== s[0])
        switch (s[0]) {
          case "string":
            o[a] = "";
            break;
          case "boolean":
            o[a] = !1;
            break;
          case "object":
            o[a] = {};
            break;
          case "number":
            o[a] = 0;
            break;
        }
    }
  }
}
function Te(n, e) {
  const t = n.header;
  ve.forEach((r) => {
    typeof t[r] != "string" && (t[r] = "");
  }),
    typeof n.channel != "string" && (n.channel = e),
    n.content || (n.content = {}),
    n.metadata || (n.metadata = {}),
    n.channel === "iopub" && Pe(n);
}
class Ne {
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
        value: y,
      }),
      Object.defineProperty(this, "onerror", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: y,
      }),
      Object.defineProperty(this, "onclose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: y,
      }),
      Object.defineProperty(this, "onmessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: y,
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
    const o = r();
    return (
      o.connect(_e(e, t)),
      this.processSocketMessages(t, o).catch((i) =>
        console.error(`Failed to read messages from channel ${t}`, i),
      ),
      o
    );
  }
  async processSocketMessages(e, t) {
    for await (const r of t) {
      if (this.closed) break;
      this.onIncomingMessage(e, r);
    }
  }
  generateChannels(e) {
    const t = ke(),
      r = _(),
      o = {
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
    return o.iopub.subscribe(), o;
  }
  onIncomingMessage(e, t) {
    const r = this.closed
      ? {}
      : $.decode(t, this.connection.key, this.connection.signature_scheme);
    (r.channel = e),
      this.receiveHooks.length
        ? (this.msgChain = this.msgChain
            .then(() => {
              const o = this.serialize(r);
              return Promise.all(this.receiveHooks.map((i) => i(o)));
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
    const r = $.encode(
      e,
      this.connection.key,
      this.connection.signature_scheme,
    );
    if (!t && this.sendHooks.length) {
      const o = this.serialize(e);
      this.sendChain = this.sendChain
        .then(() => Promise.all(this.sendHooks.map((i) => i(o, y))))
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
    this.sendChain.catch(y);
  }
  postToSocket(e, t) {
    const r = this.channels[e];
    r
      ? r.send(t).catch((o) => {
          console.error("Error communicating with the kernel", o);
        })
      : console.error(`Attempting to send message on invalid channel: ${e}`);
  }
}
let x;
class Ee {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, r, o) {
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
      (this.kernel = this.initializeKernel(e, t, r, o));
  }
  get rawKernel() {
    return this.kernel;
  }
  initializeKernel(e, t, r, o) {
    const i = require("@jupyterlab/services"),
      s = require("@jupyterlab/services/lib/kernel/serialize");
    let a;
    class c extends Ne {
      constructor() {
        super(e.connection, s.serialize), (a = this);
      }
    }
    const d = i.ServerConnection.makeSettings({ WebSocket: c, wsUrl: "RAW" });
    x || (x = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const h = new x.KernelConnection({
      serverSettings: d,
      clientId: t,
      handleComms: !1,
      username: r,
      model: o,
    });
    return (
      a &&
        (a.emit("open"),
        a.addReceiveHook(this.onKernelSocketMessage.bind(this)),
        a.addSendHook(this.mirrorSend.bind(this))),
      { realKernel: h, socket: a, kernelProcess: e }
    );
  }
  async mirrorSend(e, t) {
    if (
      typeof e == "string" &&
      e.includes("shell") &&
      e.includes("execute_request")
    ) {
      const r = R(e);
      if (r.channel === "shell" && r.header.msg_type === "execute_request") {
        if (!j(r)) return;
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
    var i, s, a, c, d, h, b, p, f;
    const t = _(),
      r = he();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: r,
      }),
      typeof e == "string"
        ? j(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: ye([e]),
          }),
      typeof e != "string" ||
        e.includes(O) ||
        e.includes(I.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg"))
    ) {
      const m = R(e);
      if (!j(m)) return;
      const T =
          ((i = m.header) == null ? void 0 : i.msg_type) === "comm_open" &&
          ((c =
            (a = (s = m.content) == null ? void 0 : s.data) == null
              ? void 0
              : a.state) == null
            ? void 0
            : c._model_module) === "@jupyter-widgets/output" &&
          ((b =
            (h = (d = m.content) == null ? void 0 : d.data) == null
              ? void 0
              : h.state) == null
            ? void 0
            : b._model_name) === "OutputModel",
        V =
          ((p = m.header) == null ? void 0 : p.msg_type) === "comm_close" &&
          this.outputWidgetIds.has(
            (f = m.content) == null ? void 0 : f.comm_id,
          );
      T
        ? this.outputWidgetIds.add(m.content.comm_id)
        : V && this.outputWidgetIds.delete(m.content.comm_id);
    }
  }
  onKernelSocketResponse(e) {
    const t = this.waitingMessageIds.get(e.id);
    t && (this.waitingMessageIds.delete(e.id), t.resultPromise.resolve());
  }
}
const Oe = require("path");
class w {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, r, o) {
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
        value: o,
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
        Oe.dirname(e),
      )),
      this.initializeNotebookKernel(e);
  }
  async isInitialized() {
    return new Promise((e) => {
      const t = setInterval(() => {
        var r, o;
        this.dbtTerminal.debug(
          "Notebookclient",
          "isInitialized",
          !!((r = this.kernel) != null && r.rawKernel),
        ),
          (o = this.kernel) != null && o.rawKernel && (e(!0), clearInterval(t));
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
        r = JSON.parse(H.readFileSync(t, { encoding: "utf-8" })),
        o = await this.python.lock((a) => a`notebook_kernel.get_session_id()`),
        i = { connection: r, pid: o },
        s = new Ee(i, _(), _(), { name: r.kernel_name, id: _() });
      (this.kernel = s),
        this.disposables.push(
          s.postMessage((a) => this._postMessageEmitter.fire(a)),
        ),
        this.dbtTerminal.log(
          `Notebook Kernel started with PID: ${o} connection: ${JSON.stringify(r)}`,
        ),
        this.getDependenciesVersion();
    } catch (t) {
      let r = t.message;
      t instanceof L.PythonException && (r = t.exception.message),
        this.dbtTerminal.error(
          u.TelemetryEvents["Notebook/KernelInitializationError"],
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
  async storeContext(e) {
    this.dbtTerminal.log(`storeContext: ${e}`),
      await this.python.lock((t) => t`notebook_kernel.store_context(${e})`);
  }
  async storeDataInKernel(e, t) {
    return new Promise(async (r, o) => {
      try {
        this.dbtTerminal.log(`storeDataInKernel: ${e}`),
          await this.python.lock(
            (i) =>
              i`notebook_kernel.store_sql_result(${e}, ${JSON.stringify(t)})`,
          ),
          r(!0);
      } catch (i) {
        this.dbtTerminal.error(
          u.TelemetryEvents["Notebook/StoreDataInKernelError"],
          i.exception.message,
          i,
        ),
          o(i);
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
    return t.realKernel.registerCommTarget(e, (r, o) => {
      this.dbtTerminal.log(`registerCommTarget registered: ${e}`, r, o);
    });
  }
  async getPythonCodeByType(e, t) {
    return (
      this.dbtTerminal.debug("getPythonCodeByType", e, t),
      await this.python.lock(
        (r) => r`notebook_kernel.get_python_code_by_type(${e}, ${t})`,
      )
    );
  }
  async executePython(e, t, r) {
    return new Promise(async (o, i) => {
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
      const s = t.metadata.cellId;
      this.dbtTerminal.log(`Executing python code in cell: ${s}`, e);
      const a = require("@jupyterlab/services");
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
              const T = this.addToCellData(
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
              T && r(T);
            }
          });
      };
      const d = [];
      return (
        c.done.finally(() => {
          c.dispose(), o(d.filter((p) => !!p));
        }),
        (c.onStdin = (p) => {
          this.dbtTerminal.log("onStdin", p);
        }),
        (c.onIOPub = (p) => {
          if (a.KernelMessage.isCommOpenMsg(p)) this.handleCommOpen(p);
          else if (a.KernelMessage.isExecuteResultMsg(p))
            d.push(this.handleExecuteResult(p, t));
          else if (a.KernelMessage.isExecuteInputMsg(p))
            this.handleExecuteInput(p);
          else if (a.KernelMessage.isStatusMsg(p)) {
            const f = p;
            this.handleStatusMessage(f);
          } else if (a.KernelMessage.isStreamMsg(p)) {
            const f = this.handleStreamMessage(p, t);
            f == null ||
              f.forEach((m) => {
                d.push(m);
              });
          } else
            a.KernelMessage.isDisplayDataMsg(p)
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
    var r;
    this.ownedCommIds.add(e.content.comm_id);
    const t = ((r = e.content.data) == null ? void 0 : r.state) || void 0;
    e.content.target_name === I.DefaultCommTarget &&
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
        t.state.children.forEach((o) => {
          if (typeof o != "string")
            return this.dbtTerminal.warn(
              "Came across a comm update message a child that isn't a string",
              o,
            );
          if (!o.startsWith(r))
            return this.dbtTerminal.warn(
              `Came across a comm update message a child that start start with ${r}`,
              o,
            );
          const i = o.substring(r.length);
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
    if (e.data && typeof e.data == "object" && O in e.data) {
      const s = e.data[O];
      if (s && "model_id" in s) {
        const a = w.modelIdsOwnedByCells.get(r) || new Set();
        a.add(s.model_id), w.modelIdsOwnedByCells.set(r, a);
      }
    }
    const o = M(e);
    if (r.document.isClosed) return;
    this.dbtTerminal.log(
      r.document.uri.fsPath,
      `Update output with mimes ${o.items.map((s) => s.mime).toString()}`,
    );
    const i = N(t);
    return (
      (this.outputsAreSpecificToAWidget.length &&
        this.outputsAreSpecificToAWidget[
          this.outputsAreSpecificToAWidget.length - 1
        ].msgIdsToSwallow === i &&
        o.items.every((s) => this.canMimeTypeBeRenderedByWidgetManager(s))) ||
        (this.outputsAreSpecificToAWidget.length &&
          this.outputsAreSpecificToAWidget[
            this.outputsAreSpecificToAWidget.length - 1
          ].msgIdsToSwallow === i &&
          this.dbtTerminal.warn("NotebookAddToCellData", "unknown operation")),
      o
    );
  }
  canMimeTypeBeRenderedByWidgetManager(e) {
    const t = e.mime;
    if (t === g.stderr || t === g.stdout || t === g.error) return !0;
    if (t === O) {
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
    var o;
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
      ((o = this.lastUsedStreamOutput) == null ? void 0 : o.stream) ===
        e.content.name)
    )
      return [
        M({
          output_type: "stream",
          name: e.content.name,
          text: e.content.text,
        }),
        this.lastUsedStreamOutput.output,
      ];
    {
      const i = se(D(e.content.text));
      return [M({ output_type: "stream", name: e.content.name, text: i })];
    }
  }
  handleDisplayData(e, t) {
    const r = {
      output_type: "display_data",
      data: le(e.content.data),
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
    const o = {
      output_type: "error",
      ename: e.content.ename,
      evalue: e.content.evalue,
      traceback: r,
    };
    return this.addToCellData(o, e, t);
  }
}
Object.defineProperty(w, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
var Ce = function (n, e, t, r) {
    var o = arguments.length,
      i =
        o < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, r);
    else
      for (var a = n.length - 1; a >= 0; a--)
        (s = n[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(e, t, i) : s(e, t)) || i);
    return o > 3 && i && Object.defineProperty(e, t, i), i;
  },
  De = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
exports.NotebookDependencies = class {
  constructor(e, t, r, o) {
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
        value: o,
      });
  }
  async checkPythonDependencies(e) {
    const t = [];
    for (const r of e) {
      const o = ["-m", "pip", "show", r],
        { stderr: i } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: this.pythonEnvironment.pythonPath,
            args: o,
            cwd: u.getFirstWorkspacePath(),
            envVars: this.pythonEnvironment.environmentVariables,
          })
          .completeWithTerminalOutput();
      i && t.push(r);
    }
    return t;
  }
  checkDbtDependencies(e, t) {
    return e
      .map((r) => {
        try {
          return t.findPackageVersion(r), null;
        } catch {
          return r;
        }
      })
      .filter(Boolean);
  }
  async installMissingPythonPackages(e, t) {
    const r = await this.checkPythonDependencies(e);
    if (!r.length) return;
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing python dependencies for notebook",
        r,
      ),
      (await l.window.showInformationMessage(
        `You need the following python packages to use this notebook: ${r.join(", ")}`,
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
      this.dbtTerminal.debug("Notebook", "installing required dependencies", r),
      await l.window.withProgress(
        {
          title: "Installing python packages...",
          location: l.ProgressLocation.Notification,
          cancellable: !1,
        },
        async () => {
          try {
            const i = ["-m", "pip", "install", ...r],
              { stdout: s, stderr: a } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: i,
                    cwd: u.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !s.includes("Successfully installed") &&
              !s.includes("Requirement already satisfied") &&
              a
            )
              throw new Error(a);
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
    const r = this.checkDbtDependencies(
      e.map((s) => `${s.name}`),
      t,
    );
    if (!r.length) return;
    const o = e.filter((s) => (s.name ? r.includes(s.name) : !1));
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing dbt dependencies for notebook",
        o,
      ),
      (await l.window.showInformationMessage(
        `You need following dbt packages to use this notebook: ${o.map((s) => `${s.package}`).join(", ")}`,
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
          const s = o.map((c) => `${c.package}@${c.version}`);
          this.dbtTerminal.debug("Notebook", "installing dbt packages", s),
            await t.installDbtPackages(s),
            await t.initialize();
          const a = this.checkDbtDependencies(
            e.map((c) => `${c.name}`),
            t,
          );
          if (a.length)
            throw new Error(`Failed to install dbt packages ${a.join(", ")}`);
          return (
            this.dbtTerminal.log(
              "Notebook dependencies have been installed successfully.",
            ),
            this.telemetry.sendTelemetryEvent(
              u.TelemetryEvents["Notebook/DependenciesInstalled"],
            ),
            !0
          );
        } catch (s) {
          this.telemetry.sendTelemetryError(
            u.TelemetryEvents["Notebook/DependenciesInstallError"],
            s,
          ),
            l.window.showErrorMessage(u.extendErrorWithSupportLinks(s.message));
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
          e.filter((r) => r.type === "python").map((r) => r.package),
          t,
        ),
        this.installMissingDbtPackages(
          e.filter((r) => r.type === "dbt"),
          t,
        ),
      ]);
  }
  async getDependenciesVersion() {
    const e = ["-m", "jupyter", "--version"],
      { stdout: t, stderr: r } = await this.commandProcessExecutionFactory
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
      r
    )
      throw new Error(r);
    const o = t.split(`
`),
      i = {};
    return (
      o.forEach((s) => {
        const [a, c] = s.split(":").map((d) => d.trim());
        a && c && (i[a] = c);
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
            const r = [
                "-m",
                "pip",
                "install",
                "ipykernel",
                "jupyter_client",
                "jupyter_contrib_nbextensions",
                "ipywidgets",
              ],
              { stdout: o, stderr: i } =
                await this.commandProcessExecutionFactory
                  .createCommandProcessExecution({
                    command: this.pythonEnvironment.pythonPath,
                    args: r,
                    cwd: u.getFirstWorkspacePath(),
                    envVars: this.pythonEnvironment.environmentVariables,
                  })
                  .completeWithTerminalOutput();
            if (
              !o.includes("Successfully installed") &&
              !o.includes("Requirement already satisfied") &&
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
          } catch (r) {
            return (
              this.telemetry.sendTelemetryError(
                u.TelemetryEvents["Notebook/DependenciesInstallError"],
                r,
              ),
              l.window.showErrorMessage(
                u.extendErrorWithSupportLinks(r.message),
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
exports.NotebookDependencies = Ce(
  [
    u.provideSingleton(exports.NotebookDependencies),
    De("design:paramtypes", [
      u.DBTTerminal,
      u.TelemetryService,
      u.CommandProcessExecutionFactory,
      u.PythonEnvironment,
    ]),
  ],
  exports.NotebookDependencies,
);
var Ie = function (n, e, t, r) {
    var o = arguments.length,
      i =
        o < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, r);
    else
      for (var a = n.length - 1; a >= 0; a--)
        (s = n[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(e, t, i) : s(e, t)) || i);
    return o > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Se = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
let C = class {
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
      this.dbtTerminal.debug(
        "ClientMapper",
        "initializing notebook client",
        e.fsPath,
      );
      const t = new w(
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
C = Ie(
  [
    u.provideSingleton(C),
    Se("design:paramtypes", [
      u.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      u.DBTTerminal,
    ]),
  ],
  C,
);
const Me = ["python", "sql", "jinja-sql"],
  je = "jinja-sql",
  U = ".notebook",
  z = "datapilot",
  v = "datapilot-notebook";
var xe = function (n, e, t, r) {
    var o = arguments.length,
      i =
        o < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, r);
    else
      for (var a = n.length - 1; a >= 0; a--)
        (s = n[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(e, t, i) : s(e, t)) || i);
    return o > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ae = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
const Re = require("path");
exports.DatapilotNotebookController = class {
  constructor(e, t, r, o, i, s) {
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
        value: o,
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
        value: s,
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
      (this.controller = l.notebooks.createNotebookController(
        this.id,
        v,
        this.label,
      )),
      (this.controller.supportedLanguages = Me),
      (this.controller.supportsExecutionOrder = !0),
      (this.controller.executeHandler = this._executeAll.bind(this)),
      this.disposables.push(
        l.workspace.onDidChangeNotebookDocument((a) => {
          a.contentChanges.forEach(async (c) => {
            c.addedCells &&
              (await this.updateCellId(a.notebook.getCells(), a.notebook)),
              c.removedCells &&
                c.removedCells.forEach((d) => {
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
      this.disposables.push(this.controller),
      this.controller.onDidChangeSelectedNotebooks(
        this.onDidChangeSelectedNotebooks,
        this,
        this.disposables,
      ),
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
    var r;
    return (
      this.dbtTerminal.debug("Notebook", "getting notebook by template", e),
      e
        ? (r = (await this.altimate.getPreConfiguredNotebooks()).find(
            (o) => o.name === e,
          )) == null
          ? void 0
          : r.data
        : (this.dbtTerminal.debug("Notebook", "sending blank notebook"),
          {
            cells: [
              {
                cell_type: l.NotebookCellKind.Code,
                source: [],
                languageId: je,
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
    const r = Z();
    if (
      (
        await this.altimate.addNotebook({
          name: r,
          description: "",
          data: t
            ? { ...t, metadata: { ...(t.metadata || {}), isDraft: !0 } }
            : {},
          tags_list: [],
        })
      ).ok &&
      (await this.altimate.getNotebooks(r)).length > 0
    )
      return r;
  }
  async createNotebook(e) {
    var s;
    const {
      notebookId: t,
      template: r,
      context: o = {},
      notebookSchema: i,
    } = e || {};
    if (
      (this.dbtTerminal.info(
        u.TelemetryEvents["Notebook/Launch"],
        "creating notebook",
        !0,
        e,
      ),
      !o.model &&
        (s = l.window.activeTextEditor) != null &&
        s.document.uri.fsPath.endsWith(".sql"))
    ) {
      const a = Re.basename(
          l.window.activeTextEditor.document.uri.fsPath,
          ".sql",
        ),
        c = l.window.activeTextEditor.document.getText();
      (o.model = a), (o.query = c);
    }
    l.window.withProgress(
      {
        location: l.ProgressLocation.Notification,
        title: "Launching notebook...",
        cancellable: !1,
      },
      async () => {
        var a;
        try {
          const c = i || (t ? null : await this.getNotebookByTemplate(r)),
            d = await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!d) {
            l.window.showErrorMessage("No dbt project selected.");
            return;
          }
          if (
            ((a = c == null ? void 0 : c.metadata) != null &&
              a.dependencies &&
              (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
                c.metadata.dependencies,
                d,
              )),
            o && c)
          )
            for (const f in o)
              o.hasOwnProperty(f) &&
                typeof o[f] == "string" &&
                (c.cells[0].source = c.cells[0].source.map((m) =>
                  m.replace(`%_${f}_%`, o[f]),
                ));
          const h = await this.getFileName(t, c),
            b = l.Uri.parse(`${d.projectRoot}/${h}${U}`).with({ scheme: z });
          this.dbtTerminal.debug("Notebook", "opening notebook", b);
          const p = await l.workspace.openNotebookDocument(b);
          await l.window.showNotebookDocument(p);
        } catch (c) {
          const d =
            c instanceof L.PythonException ? c.exception.message : c.message;
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
    const o = [];
    if (
      (e.forEach((i) => {
        let s = i.metadata.cellId;
        if (!s) {
          s = this.genUniqueId(i);
          const a = { ...i.metadata, cellId: s },
            c = l.NotebookEdit.updateCellMetadata(i.index, a);
          o.push(c);
        }
        this._onNotebookCellEvent.fire({
          cellId: s,
          notebook: t.uri.fsPath,
          event: "update",
          fragment: i.document.uri.fragment,
          languageId: i.document.languageId,
        });
      }),
      o.length > 0)
    ) {
      const i = new l.WorkspaceEdit();
      i.set(t.uri, o), await l.workspace.applyEdit(i);
    }
  }
  async onNotebookClose(e) {
    if (e.notebookType !== v) return;
    const t = await this.clientMapper.getNotebookClient(e.uri);
    t && t.dispose(),
      this.dbtTerminal.debug(
        "Notebookcontroller",
        `notebook closed: ${e.uri.fsPath}`,
        e.isUntitled,
      ),
      e.isUntitled && (await l.workspace.fs.delete(e.uri));
  }
  async onDidChangeSelectedNotebooks({ notebook: e, selected: t }) {
    this.dbtTerminal.debug(
      "Notebookcontroller",
      `notebook controller selected: ${e.uri.fsPath}`,
      t,
    );
    const r = e.uri.toString();
    t ? this.associatedNotebooks.add(r) : this.associatedNotebooks.delete(r);
  }
  async onNotebookOpen(e) {
    var i;
    if (e.notebookType !== v) return;
    this.controller.updateNotebookAffinity(
      e,
      l.NotebookControllerAffinity.Default,
    ),
      this.dbtTerminal.debug(
        "Notebookcontroller",
        `notebook open and controller associated: ${e.uri.fsPath}`,
      );
    const t = await this.clientMapper.initializeNotebookClient(e.uri),
      r = await t.getKernel();
    if (!(r != null && r.realKernel))
      throw new Error("Unable to initialize kernel");
    this.disposables.push(
      t.postMessage((s) => {
        this.sendMessageToPreloadScript(s);
      }, this),
    );
    const o = e.getCells();
    await this.updateCellId(o, e);
    try {
      await this.waitForControllerAssociation(e);
    } catch {
      this.dbtTerminal.warn(
        "Notebookcontroller",
        `Controller association timeout for ${e.uri.fsPath}. Proceeding anyway.`,
      ),
        this.associatedNotebooks.add(e.uri.toString());
    }
    (i = e.metadata) != null &&
      i.autoRun &&
      (await this._executeAll(e.getCells(), e, this.controller));
  }
  async waitForControllerAssociation(e, t = 2e3) {
    const r = Date.now();
    for (; !this.isControllerAssociatedWithNotebook(e); ) {
      if (Date.now() - r > t)
        throw new Error("Timeout waiting for controller association");
      await new Promise((o) => setTimeout(o, 500));
    }
  }
  isControllerAssociatedWithNotebook(e) {
    return this.associatedNotebooks.has(e.uri.toString());
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
  async _executeAll(e, t, r) {
    var s, a;
    const o = await this.queryManifestService.getOrPickProjectFromWorkspace();
    if (!o) {
      l.window.showErrorMessage("No dbt project selected.");
      return;
    }
    (s = t.metadata) != null &&
      s.dependencies &&
      (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
        t.metadata.dependencies,
        o,
      ));
    const i = await this.clientMapper.getNotebookClient(t.uri);
    await this.updateContextVariablesInKernel(o, i, e[0]);
    for (const c of e)
      await this._doExecution(
        c,
        t,
        (a = t.metadata) == null ? void 0 : a.isUserNotebook,
        r,
        o,
        i,
      );
  }
  filterIPyWidgets(e, t = !1) {
    return e.map((r) => {
      const i = r.items.find(
        (s) => s.mime === "application/vnd.jupyter.widget-view+json",
      )
        ? t
          ? [l.NotebookCellOutputItem.text("IPyWidgets not supported")]
          : []
        : r.items;
      return new l.NotebookCellOutput(i);
    });
  }
  updateContextVariablesInKernel(e, t, r) {
    return t.executePython(
      `
manifest_path="${e.getManifestPath()}"
project_name="${e.getProjectName()}"
            `,
      r,
      () => {},
    );
  }
  async _doExecution(e, t, r, o, i, s) {
    this.dbtTerminal.debug("Notebook", "executing cell", e.index, t.uri.fsPath);
    let a;
    try {
      const c = [];
      switch (
        ((a = o.createNotebookCellExecution(e)),
        (a.executionOrder = ++this.executionOrder),
        a.start(Date.now()),
        a.token.onCancellationRequested((d) => {
          a == null || a.end(!0, Date.now());
        }),
        a.clearOutput(),
        e.document.languageId)
      ) {
        case "python":
          this.telemetry.startTelemetryEvent(
            u.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const d = await (s == null
            ? void 0
            : s.executePython(e.document.getText(), e, (b) => {
                a == null || a.appendOutput(this.filterIPyWidgets([b], r));
              }));
          d && a.appendOutput(this.filterIPyWidgets(d, r));
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
            const b = await i.unsafeCompileQuery(e.document.getText());
            a.appendOutput(
              new l.NotebookCellOutput([
                l.NotebookCellOutputItem.text(
                  b,
                  h == null ? void 0 : h.output_mime_type,
                ),
              ]),
            );
          } else {
            const b = await i.executeSQL(e.document.getText(), "", !0);
            this._onNotebookCellEvent.fire({
              cellId: e.metadata.cellId,
              notebook: t.uri.fsPath,
              result: b,
              event: "add",
              languageId: e.document.languageId,
            }),
              r ||
                (c.push(
                  l.NotebookCellOutputItem.json(
                    b,
                    "application/perspective-json",
                  ),
                ),
                a.appendOutput(new l.NotebookCellOutput(c))),
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
        a.end(!0, Date.now());
    } catch (c) {
      this.dbtTerminal.error(
        "Notebook",
        `Error executing cell: ${c.message}`,
        c,
        !1,
      ),
        a == null ||
          a.replaceOutput([
            new l.NotebookCellOutput([l.NotebookCellOutputItem.error(c)]),
          ]),
        this.telemetry.endTelemetryEvent(
          u.TelemetryEvents["Notebook/Execute"],
          c,
          { language: e.document.languageId },
        ),
        a == null || a.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = xe(
  [
    u.provideSingleton(exports.DatapilotNotebookController),
    Ae("design:paramtypes", [
      C,
      u.QueryManifestService,
      u.TelemetryService,
      u.DBTTerminal,
      exports.NotebookDependencies,
      u.AltimateRequest,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class We {
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
var $e = function (n, e, t, r) {
    var o = arguments.length,
      i =
        o < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, r);
    else
      for (var a = n.length - 1; a >= 0; a--)
        (s = n[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(e, t, i) : s(e, t)) || i);
    return o > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Fe = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
const K = require("path");
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
      }),
      Object.defineProperty(this, "notebookDataMap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
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
  async getNotebookData(e) {
    if (this.notebookDataMap.has(e)) return this.notebookDataMap.get(e);
    const t = (await this.altimate.getNotebooks(e)) || [];
    return t.length ? t[0] : null;
  }
  async readFile(e) {
    const t = this.getFileNameFromUri(e),
      r = await this.getNotebookData(t),
      o = (r == null ? void 0 : r.data) || {};
    return (
      "cells" in o &&
        "metadata" in o &&
        (o.metadata
          ? (o.metadata = { ...o.metadata, id: r == null ? void 0 : r.id })
          : (o.metadata = { id: r == null ? void 0 : r.id })),
      r && this.notebookDataMap.set(t, r),
      new TextEncoder().encode(JSON.stringify(o))
    );
  }
  async writeFile(e, t, r) {
    await this.customSave(e, t);
  }
  delete(e, t) {
    const r = e.with({ path: K.posix.dirname(e.path) });
    this._emitter.fire([
      { type: l.FileChangeType.Changed, uri: r },
      { uri: e, type: l.FileChangeType.Deleted },
    ]);
  }
  rename(e, t, r) {
    this._emitter.fire([
      { type: l.FileChangeType.Deleted, uri: e },
      { type: l.FileChangeType.Created, uri: t },
    ]);
  }
  getFileNameFromUri(e) {
    return K.basename(e.fsPath, U);
  }
  async customSave(e, t) {
    var r;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const o =
        (r = l.window.activeNotebookEditor) == null ? void 0 : r.notebook;
      if (!o)
        return (
          this.dbtTerminal.warn(
            u.TelemetryEvents["Notebook/SaveError"],
            "No active notebook found",
          ),
          !1
        );
      this.dbtTerminal.log("saving notebook", o);
      const { name: i } = o.metadata;
      return (
        await this.saveNotebook(o, i),
        this._emitter.fire([{ type: l.FileChangeType.Changed, uri: e }]),
        !0
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
    return !1;
  }
  async saveNotebook(e, t) {
    try {
      const r = A(e, t);
      this.dbtTerminal.log("saving notebook", t, r),
        await this.altimate.updateNotebook(e.metadata.id, {
          name: t,
          description: "",
          data: r,
          tags_list: [],
        }),
        this.dbtTerminal.log("notebook saved", t, r);
      const o = this.getFileNameFromUri(e.uri),
        i = this.notebookDataMap.get(o);
      return i && ((i.data = A(e, t, !0)), this.notebookDataMap.set(o, i)), r;
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
  }
};
exports.NotebookFileSystemProvider = $e(
  [
    u.provideSingleton(exports.NotebookFileSystemProvider),
    Fe("design:paramtypes", [u.DBTTerminal, u.AltimateRequest]),
  ],
  exports.NotebookFileSystemProvider,
);
var Be = function (n, e, t, r) {
    var o = arguments.length,
      i =
        o < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, r);
    else
      for (var a = n.length - 1; a >= 0; a--)
        (s = n[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(e, t, i) : s(e, t)) || i);
    return o > 3 && i && Object.defineProperty(e, t, i), i;
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
      r = this.cellByNotebookAutocompleteMap.get(e.notebook) || [];
    switch (e.event) {
      case "add":
      case "update":
        this.cellByNotebookAutocompleteMap.set(e.notebook, [
          ...r.filter((o) => o.cellId !== e.cellId),
          t,
        ]);
        break;
      case "delete":
        this.cellByNotebookAutocompleteMap.set(
          e.notebook,
          r.filter((o) => o.cellId !== e.cellId),
        );
        break;
    }
  }
};
exports.NotebookService = Be(
  [
    u.provideSingleton(exports.NotebookService),
    qe("design:paramtypes", [exports.DatapilotNotebookController]),
  ],
  exports.NotebookService,
);
const Ke = {
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
var Le = function (n, e, t, r) {
    var o = arguments.length,
      i =
        o < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(n, e, t, r);
    else
      for (var a = n.length - 1; a >= 0; a--)
        (s = n[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(e, t, i) : s(e, t)) || i);
    return o > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ue = function (n, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, e);
  };
exports.NotebookProviders = class {
  constructor(e, t, r, o) {
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
        value: o,
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
        l.notebooks.registerNotebookCellStatusBarItemProvider(v, new We()),
        l.workspace.registerNotebookSerializer(v, this.notebookProvider, {}),
        this.notebookController,
      ),
      this.disposables.push(
        l.workspace.registerFileSystemProvider(
          z,
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
    u.provideSingleton(exports.NotebookProviders),
    Ue("design:paramtypes", [
      E,
      exports.DatapilotNotebookController,
      exports.NotebookFileSystemProvider,
      u.DBTTerminal,
    ]),
  ],
  exports.NotebookProviders,
);
exports.CustomNotebooks = Ke;
exports.NotebookKernelClient = w;
