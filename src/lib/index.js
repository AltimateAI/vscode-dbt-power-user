"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  u = require("@extension"),
  B = require("python-bridge"),
  H = require("fs"),
  J = require("@nteract/messaging/lib/wire-protocol");
function Y(r) {
  const e = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (r) {
    for (const t in r)
      if (t !== "default") {
        const o = Object.getOwnPropertyDescriptor(r, t);
        Object.defineProperty(
          e,
          t,
          o.get ? o : { enumerable: !0, get: () => r[t] },
        );
      }
  }
  return (e.default = r), Object.freeze(e);
}
const $ = Y(J),
  G = (r) => ("getCells" in r ? r.getCells() : r.cells),
  Q = (r) => (r instanceof l.NotebookCellData ? r.value : r.document.getText()),
  X = (r) =>
    r instanceof l.NotebookCellData ? r.languageId : r.document.languageId,
  A = (r, e, t) => {
    var n;
    const o = [];
    for (const i of G(r))
      o.push({
        cell_type: i.kind,
        source: Q(i).split(/\r?\n/g),
        languageId: X(i),
        metadata: i.metadata,
        outputs: t ? i.outputs : void 0,
      });
    return {
      cells: o,
      metadata: {
        ...r.metadata,
        name: e,
        createdAt:
          ((n = r.metadata) == null ? void 0 : n.createdAt) ||
          new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  },
  _ = () => Math.random().toString(36).substr(2, 9);
function Z() {
  const r = new Date(),
    e = r.toLocaleDateString("en-GB").replace(/\//g, "-"),
    t = r.toLocaleTimeString("en-GB", { hour12: !1 }).replace(/:/g, "-");
  return `${e}-${t}`;
}
var ee = function (r, e, t, o) {
  var n = arguments.length,
    i =
      n < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, t)) : o,
    s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(r, e, t, o);
  else
    for (var a = r.length - 1; a >= 0; a--)
      (s = r[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
let E = class {
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(e, t) {
    const o = new TextDecoder().decode(e);
    let n;
    try {
      n = JSON.parse(o);
    } catch {
      n = { cells: [] };
    }
    const i = n.cells.map((a) => {
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
    return (s.metadata = n.metadata), s;
  }
  async serializeNotebook(e, t) {
    const o = A(e);
    return new TextEncoder().encode(JSON.stringify(o));
  }
};
E = ee([u.provideSingleton(E)], E);
var g;
(function (r) {
  (r.error = "application/vnd.code.notebook.error"),
    (r.stderr = "application/vnd.code.notebook.stderr"),
    (r.stdout = "application/vnd.code.notebook.stdout");
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
k.set("display_data", M);
k.set("error", de);
k.set("execute_result", M);
k.set("stream", ue);
k.set("update_display_data", M);
function S(r) {
  const e = k.get(r.output_type);
  let t;
  return (
    e
      ? (t = e(r))
      : (console.warn(
          `Unable to translate cell from ${r.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = M(r))),
    t
  );
}
function W(r) {
  const e = { outputType: r.output_type };
  switch ((r.transient && (e.transient = r.transient), r.output_type)) {
    case "display_data":
    case "execute_result":
    case "update_display_data": {
      (e.executionCount = r.execution_count),
        (e.metadata = r.metadata ? JSON.parse(JSON.stringify(r.metadata)) : {});
      break;
    }
  }
  return e;
}
function M(r) {
  const e = W(r);
  ("image/svg+xml" in r.data || "image/png" in r.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (r.data) for (const o in r.data) t.push(re(o, r.data[o]));
  return new l.NotebookCellOutput(oe(t), e);
}
function oe(r) {
  return r.sort((e, t) => {
    const o = (s, a) => (
      s.endsWith(".*") && (s = s.substr(0, s.indexOf(".*"))), a.startsWith(s)
    );
    let n = F.findIndex((s) => o(s, e.mime)),
      i = F.findIndex((s) => o(s, t.mime));
    return (
      q(e) && (n = -1),
      q(t) && (i = -1),
      (n = n === -1 ? 100 : n),
      (i = i === -1 ? 100 : i),
      n - i
    );
  });
}
function q(r) {
  if (r.mime.startsWith("application/vnd."))
    try {
      return new TextDecoder().decode(r.data).length === 0;
    } catch {}
  return !1;
}
function re(r, e) {
  if (!e) return l.NotebookCellOutputItem.text("", r);
  try {
    if (
      (r.startsWith("text/") || te.includes(r)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? D(e) : e;
      return l.NotebookCellOutputItem.text(t, r);
    } else
      return r.startsWith("image/") &&
        typeof e == "string" &&
        r !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(ne(e), r)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), r)
          : ((e = Array.isArray(e) ? D(e) : e),
            l.NotebookCellOutputItem.text(e, r));
  } catch (t) {
    return (
      console.error(
        `Failed to convert ${r} output to a buffer ${typeof e}, ${e}`,
        t,
      ),
      l.NotebookCellOutputItem.text("")
    );
  }
}
function ne(r) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(r, "base64")
    : Uint8Array.from(atob(r), (e) => e.charCodeAt(0));
}
function D(r) {
  if (Array.isArray(r)) {
    let e = "";
    for (let t = 0; t < r.length; t += 1) {
      const o = r[t];
      t < r.length - 1 &&
      !o.endsWith(`
`)
        ? (e = e.concat(`${o}
`))
        : (e = e.concat(o));
    }
    return e;
  }
  return r.toString();
}
function ie(r) {
  let e = r;
  do (r = e), (e = r.replace(/[^\n]\x08/gm, ""));
  while (e.length < r.length);
  return r;
}
function ae(r) {
  for (
    r = r.replace(
      /\r+\n/gm,
      `
`,
    );
    r.search(/\r[^$]/g) > -1;

  ) {
    const e = r.match(/^(.*)\r+/m)[1];
    let t = r.match(/\r+(.*)$/m)[1];
    (t = t + e.slice(t.length, e.length)),
      (r = r.replace(/\r+.*$/m, "\r").replace(/^.*\r/m, t));
  }
  return r;
}
function se(r) {
  return ae(ie(r));
}
function N(r) {
  if (r.parent_header && "msg_id" in r.parent_header)
    return r.parent_header.msg_id;
}
function le(r) {
  if (r.hasOwnProperty("text/html")) {
    const e = r["text/html"];
    typeof e == "string" &&
      e.includes('<iframe id="tensorboard-frame-') &&
      (r["text/html"] = e.replace(
        /new URL\((.*), window.location\)/,
        'new URL("http://localhost")',
      ));
  }
  return r;
}
const ce = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function j(r) {
  let e = typeof r == "string" ? r : "";
  return (
    typeof r != "string" &&
      "content" in r &&
      "code" in r.content &&
      typeof r.content.code == "string" &&
      (e = r.content.code),
    !e.includes(ce)
  );
}
function ue(r) {
  const e = D(r.text),
    t =
      r.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], W(r));
}
function de(r) {
  return (
    (r = r || { output_type: "error", ename: "", evalue: "", traceback: [] }),
    new l.NotebookCellOutput(
      [
        l.NotebookCellOutputItem.error({
          name: (r == null ? void 0 : r.ename) || "",
          message: (r == null ? void 0 : r.evalue) || "",
          stack: ((r == null ? void 0 : r.traceback) || []).join(`
`),
        }),
      ],
      { ...W(r), originalError: r },
    )
  );
}
var I;
(function (r) {
  (r.GeneratedThemeName = "ipython-theme"),
    (r.MatplotLibDefaultParams = "_VSCode_defaultMatplotlib_Params"),
    (r.MatplotLibFigureFormats = "_VSCode_matplotLib_FigureFormats"),
    (r.DefaultCodeCellMarker = "# %%"),
    (r.DefaultCommTarget = "jupyter.widget"),
    (r.ALL_VARIABLES = "ALL_VARIABLES"),
    (r.KERNEL_VARIABLES = "KERNEL_VARIABLES"),
    (r.DEBUGGER_VARIABLES = "DEBUGGER_VARIABLES"),
    (r.PYTHON_VARIABLES_REQUESTER = "PYTHON_VARIABLES_REQUESTER"),
    (r.MULTIPLEXING_DEBUGSERVICE = "MULTIPLEXING_DEBUGSERVICE"),
    (r.RUN_BY_LINE_DEBUGSERVICE = "RUN_BY_LINE_DEBUGSERVICE"),
    (r.REMOTE_URI = "https://remote/"),
    (r.REMOTE_URI_ID_PARAM = "id"),
    (r.REMOTE_URI_HANDLE_PARAM = "uriHandle"),
    (r.REMOTE_URI_EXTENSION_ID_PARAM = "extensionId");
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
function he(r = null) {
  return new pe(r);
}
var P = {};
Object.defineProperty(P, "__esModule", { value: !0 });
P.serialize = R = P.deserialize = void 0;
function me(r) {
  let e;
  return typeof r == "string" ? (e = JSON.parse(r)) : (e = be(r)), e;
}
var R = (P.deserialize = me);
function fe(r) {
  var e;
  let t;
  return (
    !((e = r.buffers) === null || e === void 0) && e.length
      ? (t = ge(r))
      : (t = JSON.stringify(r)),
    t
  );
}
P.serialize = fe;
function be(r) {
  const e = new DataView(r),
    t = e.getUint32(0),
    o = [];
  if (t < 2) throw new Error("Invalid incoming Kernel Message");
  for (let s = 1; s <= t; s++) o.push(e.getUint32(s * 4));
  const n = new Uint8Array(r.slice(o[0], o[1])),
    i = JSON.parse(new TextDecoder("utf8").decode(n));
  i.buffers = [];
  for (let s = 1; s < t; s++) {
    const a = o[s],
      c = o[s + 1] || r.byteLength;
    i.buffers.push(new DataView(r.slice(a, c)));
  }
  return i;
}
function ge(r) {
  const e = [],
    t = [],
    o = new TextEncoder();
  let n = [];
  r.buffers !== void 0 && ((n = r.buffers), delete r.buffers);
  const i = o.encode(JSON.stringify(r));
  t.push(i.buffer);
  for (let d = 0; d < n.length; d++) {
    const h = n[d];
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
function ye(r) {
  if (!r || !Array.isArray(r) || r.length === 0) return;
  const e = [];
  for (let t = 0; t < r.length; t += 1) {
    const o = r[t];
    if ("buffer" in o && "byteOffset" in o) {
      const n = [...new Uint8Array(o.buffer)];
      e.push({
        ...o,
        byteLength: o.byteLength,
        byteOffset: o.byteOffset,
        buffer: n,
      });
    } else e.push([...new Uint8Array(o)]);
  }
  return e;
}
const we = require("path");
function y() {}
we.join(__dirname, ".");
function ke() {
  console.log("Trying to load zmq");
  const r = require("zeromq");
  return (r.context.blocky = !1), console.info("ZMQ loaded."), r;
}
function _e(r, e) {
  const t = r.transport === "tcp" ? ":" : "-",
    o = r[`${e}_port`];
  if (!o) throw new Error(`Port not found for channel "${e}"`);
  return `${r.transport}://${r.ip}${t}${o}`;
}
const ve = ["username", "version", "session", "msg_id", "msg_type"],
  K = {
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
function Pe(r) {
  if (r.channel !== "iopub") return;
  const e = r.header.msg_type;
  if (e in K) {
    const t = K[e];
    if (t === void 0) return;
    const o = Object.keys(t),
      n = r.content;
    for (let i = 0; i < o.length; i++) {
      let s = t[o[i]];
      Array.isArray(s) || (s = [s]);
      const a = o[i];
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
function Te(r, e) {
  const t = r.header;
  ve.forEach((o) => {
    typeof t[o] != "string" && (t[o] = "");
  }),
    typeof r.channel != "string" && (r.channel = e),
    r.content || (r.content = {}),
    r.metadata || (r.metadata = {}),
    r.channel === "iopub" && Pe(r);
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
    const n = o();
    return (
      n.connect(_e(e, t)),
      this.processSocketMessages(t, n).catch((i) =>
        console.error(`Failed to read messages from channel ${t}`, i),
      ),
      n
    );
  }
  async processSocketMessages(e, t) {
    for await (const o of t) {
      if (this.closed) break;
      this.onIncomingMessage(e, o);
    }
  }
  generateChannels(e) {
    const t = ke(),
      o = _(),
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
    return n.iopub.subscribe(), n;
  }
  onIncomingMessage(e, t) {
    const o = this.closed
      ? {}
      : $.decode(t, this.connection.key, this.connection.signature_scheme);
    (o.channel = e),
      this.receiveHooks.length
        ? (this.msgChain = this.msgChain
            .then(() => {
              const n = this.serialize(o);
              return Promise.all(this.receiveHooks.map((i) => i(n)));
            })
            .then(() => this.fireOnMessage(o, e)))
        : (this.msgChain = this.msgChain.then(() => this.fireOnMessage(o, e)));
  }
  fireOnMessage(e, t) {
    if (!this.closed)
      try {
        Te(e, t), this.onmessage({ data: e, type: "message", target: this });
      } catch (o) {
        console.error(
          `Failed to handle message in Jupyter Kernel package ${JSON.stringify(e)}`,
          o,
        );
      }
  }
  sendMessage(e, t) {
    const o = $.encode(
      e,
      this.connection.key,
      this.connection.signature_scheme,
    );
    if (!t && this.sendHooks.length) {
      const n = this.serialize(e);
      this.sendChain = this.sendChain
        .then(() => Promise.all(this.sendHooks.map((i) => i(n, y))))
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
    this.sendChain.catch(y);
  }
  postToSocket(e, t) {
    const o = this.channels[e];
    o
      ? o.send(t).catch((n) => {
          console.error("Error communicating with the kernel", n);
        })
      : console.error(`Attempting to send message on invalid channel: ${e}`);
  }
}
let x;
class Ee {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, o, n) {
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
      (this.kernel = this.initializeKernel(e, t, o, n));
  }
  get rawKernel() {
    return this.kernel;
  }
  initializeKernel(e, t, o, n) {
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
      username: o,
      model: n,
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
      const o = R(e);
      if (o.channel === "shell" && o.header.msg_type === "execute_request") {
        if (!j(o)) return;
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
    var i, s, a, c, d, h, m, p, f;
    const t = _(),
      o = he();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: o,
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
      const b = R(e);
      if (!j(b)) return;
      const T =
          ((i = b.header) == null ? void 0 : i.msg_type) === "comm_open" &&
          ((c =
            (a = (s = b.content) == null ? void 0 : s.data) == null
              ? void 0
              : a.state) == null
            ? void 0
            : c._model_module) === "@jupyter-widgets/output" &&
          ((m =
            (h = (d = b.content) == null ? void 0 : d.data) == null
              ? void 0
              : h.state) == null
            ? void 0
            : m._model_name) === "OutputModel",
        V =
          ((p = b.header) == null ? void 0 : p.msg_type) === "comm_close" &&
          this.outputWidgetIds.has(
            (f = b.content) == null ? void 0 : f.comm_id,
          );
      T
        ? this.outputWidgetIds.add(b.content.comm_id)
        : V && this.outputWidgetIds.delete(b.content.comm_id);
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
  constructor(e, t, o, n) {
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
        var o, n;
        this.dbtTerminal.debug(
          "Notebookclient",
          "isInitialized",
          !!((o = this.kernel) != null && o.rawKernel),
        ),
          (n = this.kernel) != null && n.rawKernel && (e(!0), clearInterval(t));
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
          (a) => a`notebook_kernel.get_connection_file()`,
        ),
        o = JSON.parse(H.readFileSync(t, { encoding: "utf-8" })),
        n = await this.python.lock((a) => a`notebook_kernel.get_session_id()`),
        i = { connection: o, pid: n },
        s = new Ee(i, _(), _(), { name: o.kernel_name, id: _() });
      (this.kernel = s),
        this.disposables.push(
          s.postMessage((a) => this._postMessageEmitter.fire(a)),
        ),
        this.dbtTerminal.log(
          `Notebook Kernel started with PID: ${n} connection: ${JSON.stringify(o)}`,
        ),
        this.getDependenciesVersion();
    } catch (t) {
      let o = t.message;
      t instanceof B.PythonException && (o = t.exception.message),
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
    return new Promise(async (o, n) => {
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
          n(i);
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
    return t.realKernel.registerCommTarget(e, (o, n) => {
      this.dbtTerminal.log(`registerCommTarget registered: ${e}`, o, n);
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
    return new Promise(async (n, i) => {
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
          f.payload.forEach((b) => {
            if (b.data && b.data.hasOwnProperty("text/plain")) {
              const T = this.addToCellData(
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
              T && o(T);
            }
          });
      };
      const d = [];
      return (
        c.done.finally(() => {
          c.dispose(), n(d.filter((p) => !!p));
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
              f.forEach((b) => {
                d.push(b);
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
    var o;
    this.ownedCommIds.add(e.content.comm_id);
    const t = ((o = e.content.data) == null ? void 0 : o.state) || void 0;
    e.content.target_name === I.DefaultCommTarget &&
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
        t.state.children.forEach((n) => {
          if (typeof n != "string")
            return this.dbtTerminal.warn(
              "Came across a comm update message a child that isn't a string",
              n,
            );
          if (!n.startsWith(o))
            return this.dbtTerminal.warn(
              `Came across a comm update message a child that start start with ${o}`,
              n,
            );
          const i = n.substring(o.length);
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
    if (e.data && typeof e.data == "object" && O in e.data) {
      const s = e.data[O];
      if (s && "model_id" in s) {
        const a = w.modelIdsOwnedByCells.get(o) || new Set();
        a.add(s.model_id), w.modelIdsOwnedByCells.set(o, a);
      }
    }
    const n = S(e);
    if (o.document.isClosed) return;
    this.dbtTerminal.log(
      o.document.uri.fsPath,
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
    if (t === g.stderr || t === g.stdout || t === g.error) return !0;
    if (t === O) {
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
    var n;
    if (
      N(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === N(e)
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
      ((n = this.lastUsedStreamOutput) == null ? void 0 : n.stream) ===
        e.content.name)
    )
      return [
        S({
          output_type: "stream",
          name: e.content.name,
          text: e.content.text,
        }),
        this.lastUsedStreamOutput.output,
      ];
    {
      const i = se(D(e.content.text));
      return [S({ output_type: "stream", name: e.content.name, text: i })];
    }
  }
  handleDisplayData(e, t) {
    const o = {
      output_type: "display_data",
      data: le(e.content.data),
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
    const o = e.content.traceback;
    this.dbtTerminal.log(`Traceback for error ${o}`);
    const n = {
      output_type: "error",
      ename: e.content.ename,
      evalue: e.content.evalue,
      traceback: o,
    };
    return this.addToCellData(n, e, t);
  }
}
Object.defineProperty(w, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
var Ce = function (r, e, t, o) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(r, e, t, o);
    else
      for (var a = r.length - 1; a >= 0; a--)
        (s = r[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  De = function (r, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(r, e);
  };
exports.NotebookDependencies = class {
  constructor(e, t, o, n) {
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
        value: n,
      });
  }
  async checkPythonDependencies(e) {
    const t = [];
    for (const o of e) {
      const n = ["-m", "pip", "show", o],
        { stderr: i } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: this.pythonEnvironment.pythonPath,
            args: n,
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
    const o = this.checkDbtDependencies(
      e.map((s) => `${s.name}`),
      t,
    );
    if (!o.length) return;
    const n = e.filter((s) => (s.name ? o.includes(s.name) : !1));
    if (
      (this.dbtTerminal.debug(
        "Notebook",
        "asking user to install missing dbt dependencies for notebook",
        n,
      ),
      (await l.window.showInformationMessage(
        `You need following dbt packages to use this notebook: ${n.map((s) => `${s.package}`).join(", ")}`,
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
          const s = n.map((c) => `${c.package}@${c.version}`);
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
    const n = t.split(`
`),
      i = {};
    return (
      n.forEach((s) => {
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
            const o = [
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
                    args: o,
                    cwd: u.getFirstWorkspacePath(),
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
var Ie = function (r, e, t, o) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(r, e, t, o);
    else
      for (var a = r.length - 1; a >= 0; a--)
        (s = r[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Me = function (r, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(r, e);
  };
let C = class {
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
      const t = new w(
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
C = Ie(
  [
    u.provideSingleton(C),
    Me("design:paramtypes", [
      u.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      u.DBTTerminal,
    ]),
  ],
  C,
);
const Se = ["python", "sql", "jinja-sql"],
  je = "jinja-sql",
  U = ".notebook",
  z = "datapilot",
  v = "datapilot-notebook";
var xe = function (r, e, t, o) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(r, e, t, o);
    else
      for (var a = r.length - 1; a >= 0; a--)
        (s = r[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ae = function (r, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(r, e);
  };
const Re = require("path");
exports.DatapilotNotebookController = class {
  constructor(e, t, o, n, i, s) {
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
        value: n,
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
      (this.controller.supportedLanguages = Se),
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
    var o;
    return (
      this.dbtTerminal.debug("Notebook", "getting notebook by template", e),
      e
        ? (o = (await this.altimate.getPreConfiguredNotebooks()).find(
            (n) => n.name === e,
          )) == null
          ? void 0
          : o.data
        : (this.dbtTerminal.debug("Notebook", "sending blank notebook"),
          {
            cells: [
              {
                cell_type: l.NotebookCellKind.Markup,
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
                cell_type: l.NotebookCellKind.Code,
                source: [
                  "select * from {{ ref('your_model_name') }}",
                  "{# Replace 'your_model_name' with the name of your dbt model. #}",
                ],
                languageId: je,
                metadata: { cellId: "jinja_sql_0" },
              },
              {
                cell_type: l.NotebookCellKind.Markup,
                source: [
                  "##### 2. Python Code",
                  "You can also write and execute Python code on top of the results of previous `jinja-sql` cell in this notebook. Here's a simple example:",
                ],
                languageId: "markdown",
                metadata: {},
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
                cell_type: l.NotebookCellKind.Markup,
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
    const o = Z();
    if (
      (
        await this.altimate.addNotebook({
          name: o,
          description: "",
          data: t
            ? { ...t, metadata: { ...(t.metadata || {}), isDraft: !0 } }
            : {},
          tags_list: [],
        })
      ).ok &&
      (await this.altimate.getNotebooks(o)).length > 0
    )
      return o;
  }
  async createNotebook(e) {
    var s;
    const {
      notebookId: t,
      template: o,
      context: n = {},
      notebookSchema: i,
    } = e || {};
    if (
      (this.dbtTerminal.info(
        u.TelemetryEvents["Notebook/Launch"],
        "creating notebook",
        !0,
        e,
      ),
      !n.model &&
        (s = l.window.activeTextEditor) != null &&
        s.document.uri.fsPath.endsWith(".sql"))
    ) {
      const a = Re.basename(
          l.window.activeTextEditor.document.uri.fsPath,
          ".sql",
        ),
        c = l.window.activeTextEditor.document.getText();
      (n.model = a), (n.query = c);
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
          const c = i || (t ? null : await this.getNotebookByTemplate(o)),
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
            n && c)
          )
            for (const f in n)
              n.hasOwnProperty(f) &&
                typeof n[f] == "string" &&
                (c.cells[0].source = c.cells[0].source.map((b) =>
                  b.replace(`%_${f}_%`, n[f]),
                ));
          const h = await this.getFileName(t, c),
            m = l.Uri.parse(`${d.projectRoot}/${h}${U}`).with({ scheme: z });
          this.dbtTerminal.debug("Notebook", "opening notebook", m);
          const p = await l.workspace.openNotebookDocument(m);
          await l.window.showNotebookDocument(p);
        } catch (c) {
          const d =
            c instanceof B.PythonException ? c.exception.message : c.message;
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
    const n = [];
    if (
      (e.forEach((i) => {
        let s = i.metadata.cellId;
        if (!s) {
          s = this.genUniqueId(i);
          const a = { ...i.metadata, cellId: s },
            c = l.NotebookEdit.updateCellMetadata(i.index, a);
          n.push(c);
        }
        this._onNotebookCellEvent.fire({
          cellId: s,
          notebook: t.uri.fsPath,
          event: "update",
          fragment: i.document.uri.fragment,
          languageId: i.document.languageId,
        });
      }),
      n.length > 0)
    ) {
      const i = new l.WorkspaceEdit();
      i.set(t.uri, n), await l.workspace.applyEdit(i);
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
    const o = e.uri.toString();
    t ? this.associatedNotebooks.add(o) : this.associatedNotebooks.delete(o);
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
      o = await t.getKernel();
    if (!(o != null && o.realKernel))
      throw new Error("Unable to initialize kernel");
    this.disposables.push(
      t.postMessage((s) => {
        this.sendMessageToPreloadScript(s);
      }, this),
    );
    const n = e.getCells();
    await this.updateCellId(n, e);
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
    const o = Date.now();
    for (; !this.isControllerAssociatedWithNotebook(e); ) {
      if (Date.now() - o > t)
        throw new Error("Timeout waiting for controller association");
      await new Promise((n) => setTimeout(n, 500));
    }
  }
  isControllerAssociatedWithNotebook(e) {
    return this.associatedNotebooks.has(e.uri.toString());
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
  async _executeAll(e, t, o) {
    var s, a;
    const n = await this.queryManifestService.getOrPickProjectFromWorkspace();
    if (!n) {
      l.window.showErrorMessage("No dbt project selected.");
      return;
    }
    (s = t.metadata) != null &&
      s.dependencies &&
      (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
        t.metadata.dependencies,
        n,
      ));
    const i = await this.clientMapper.getNotebookClient(t.uri);
    await this.updateContextVariablesInKernel(n, i, e[0]);
    for (const c of e)
      await this._doExecution(
        c,
        t,
        (a = t.metadata) == null ? void 0 : a.isUserNotebook,
        o,
        n,
        i,
      );
  }
  filterIPyWidgets(e, t = !1) {
    return e.map((o) => {
      const i = o.items.find(
        (s) => s.mime === "application/vnd.jupyter.widget-view+json",
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
  async _doExecution(e, t, o, n, i, s) {
    this.dbtTerminal.debug("Notebook", "executing cell", e.index, t.uri.fsPath);
    let a;
    try {
      const c = [];
      switch (
        ((a = n.createNotebookCellExecution(e)),
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
            : s.executePython(e.document.getText(), e, (m) => {
                a == null || a.appendOutput(this.filterIPyWidgets([m], o));
              }));
          d && a.appendOutput(this.filterIPyWidgets(d, o));
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
            const m = await i.unsafeCompileQuery(e.document.getText());
            a.appendOutput(
              new l.NotebookCellOutput([
                l.NotebookCellOutputItem.text(
                  m,
                  h == null ? void 0 : h.output_mime_type,
                ),
              ]),
            );
          } else {
            const m = await i.executeSQL(e.document.getText(), "", !0);
            this._onNotebookCellEvent.fire({
              cellId: e.metadata.cellId,
              notebook: t.uri.fsPath,
              result: m,
              event: "add",
              languageId: e.document.languageId,
            }),
              o ||
                (c.push(
                  l.NotebookCellOutputItem.json(
                    m,
                    "application/perspective-json",
                  ),
                ),
                a.appendOutput(new l.NotebookCellOutput(c))),
              await s.storeDataInKernel(e.metadata.cellId, m);
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
var $e = function (r, e, t, o) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(r, e, t, o);
    else
      for (var a = r.length - 1; a >= 0; a--)
        (s = r[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Fe = function (r, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(r, e);
  };
const L = require("path");
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
      o = await this.getNotebookData(t),
      n = (o == null ? void 0 : o.data) || {};
    return (
      "cells" in n &&
        "metadata" in n &&
        (n.metadata
          ? (n.metadata = { ...n.metadata, id: o == null ? void 0 : o.id })
          : (n.metadata = { id: o == null ? void 0 : o.id })),
      o && this.notebookDataMap.set(t, o),
      new TextEncoder().encode(JSON.stringify(n))
    );
  }
  async writeFile(e, t, o) {
    await this.customSave(e, t);
  }
  delete(e, t) {
    const o = e.with({ path: L.posix.dirname(e.path) });
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
    return L.basename(e.fsPath, U);
  }
  async customSave(e, t) {
    var o;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const n =
        (o = l.window.activeNotebookEditor) == null ? void 0 : o.notebook;
      if (!n)
        return (
          this.dbtTerminal.warn(
            u.TelemetryEvents["Notebook/SaveError"],
            "No active notebook found",
          ),
          !1
        );
      this.dbtTerminal.log("saving notebook", n);
      const { name: i } = n.metadata;
      return (
        await this.saveNotebook(n, i),
        this._emitter.fire([{ type: l.FileChangeType.Changed, uri: e }]),
        !0
      );
    } catch (n) {
      this.dbtTerminal.error(
        u.TelemetryEvents["Notebook/SaveError"],
        n.message,
        n,
      ),
        l.window.showErrorMessage(
          u.extendErrorWithSupportLinks(
            `Failed to save notebook. Error: ${n.message}`,
          ),
        );
    }
    return !1;
  }
  async saveNotebook(e, t) {
    try {
      const o = A(e, t);
      this.dbtTerminal.log("saving notebook", t, o),
        await this.altimate.updateNotebook(e.metadata.id, {
          name: t,
          description: "",
          data: o,
          tags_list: [],
        }),
        this.dbtTerminal.log("notebook saved", t, o);
      const n = this.getFileNameFromUri(e.uri),
        i = this.notebookDataMap.get(n);
      return i && ((i.data = A(e, t, !0)), this.notebookDataMap.set(n, i)), o;
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
};
exports.NotebookFileSystemProvider = $e(
  [
    u.provideSingleton(exports.NotebookFileSystemProvider),
    Fe("design:paramtypes", [u.DBTTerminal, u.AltimateRequest]),
  ],
  exports.NotebookFileSystemProvider,
);
var qe = function (r, e, t, o) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(r, e, t, o);
    else
      for (var a = r.length - 1; a >= 0; a--)
        (s = r[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ke = function (r, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(r, e);
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
          ...o.filter((n) => n.cellId !== e.cellId),
          t,
        ]);
        break;
      case "delete":
        this.cellByNotebookAutocompleteMap.set(
          e.notebook,
          o.filter((n) => n.cellId !== e.cellId),
        );
        break;
    }
  }
};
exports.NotebookService = qe(
  [
    u.provideSingleton(exports.NotebookService),
    Ke("design:paramtypes", [exports.DatapilotNotebookController]),
  ],
  exports.NotebookService,
);
const Le = {
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
var Be = function (r, e, t, o) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : o === null
            ? (o = Object.getOwnPropertyDescriptor(e, t))
            : o,
      s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(r, e, t, o);
    else
      for (var a = r.length - 1; a >= 0; a--)
        (s = r[a]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, t, i) : s(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ue = function (r, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(r, e);
  };
exports.NotebookProviders = class {
  constructor(e, t, o, n) {
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
exports.NotebookProviders = Be(
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
exports.CustomNotebooks = Le;
exports.NotebookKernelClient = w;
