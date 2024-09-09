"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  c = require("@extension"),
  H = require("python-bridge"),
  Q = require("fs"),
  X = require("@nteract/messaging/lib/wire-protocol");
function Z(o) {
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
const q = Z(X),
  ee = (o) => ("getCells" in o ? o.getCells() : o.cells),
  te = (o) =>
    o instanceof l.NotebookCellData ? o.value : o.document.getText(),
  oe = (o) =>
    o instanceof l.NotebookCellData ? o.languageId : o.document.languageId,
  J = (o, e) => {
    var r;
    const t = [];
    for (const n of ee(o))
      t.push({
        cell_type: n.kind,
        source: te(n).split(/\r?\n/g),
        languageId: oe(n),
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
var re = function (o, e, t, r) {
  var n = arguments.length,
    i =
      n < 3 ? e : r === null ? (r = Object.getOwnPropertyDescriptor(e, t)) : r,
    a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(o, e, t, r);
  else
    for (var s = o.length - 1; s >= 0; s--)
      (a = o[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
let I = class {
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(e, t) {
    const r = new TextDecoder().decode(e);
    let n;
    try {
      n = JSON.parse(r);
    } catch {
      n = { cells: [] };
    }
    const i = n.cells.map((s) => {
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
    return (a.metadata = n.metadata), a;
  }
  async serializeNotebook(e, t) {
    const r = J(e);
    return new TextEncoder().encode(JSON.stringify(r));
  }
};
I = re([c.provideSingleton(I)], I);
var w;
(function (o) {
  (o.error = "application/vnd.code.notebook.error"),
    (o.stderr = "application/vnd.code.notebook.stderr"),
    (o.stdout = "application/vnd.code.notebook.stdout");
})(w || (w = {}));
const ne = ["text/plain", "text/markdown", w.stderr, w.stdout],
  L = [
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
function W(o) {
  const e = v.get(o.output_type);
  let t;
  return (
    e
      ? (t = e(o))
      : (console.warn(
          `Unable to translate cell from ${o.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = R(o))),
    t
  );
}
function K(o) {
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
function R(o) {
  const e = K(o);
  ("image/svg+xml" in o.data || "image/png" in o.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (o.data) for (const r in o.data) t.push(ae(r, o.data[r]));
  return new l.NotebookCellOutput(ie(t), e);
}
function ie(o) {
  return o.sort((e, t) => {
    const r = (a, s) => (
      a.endsWith(".*") && (a = a.substr(0, a.indexOf(".*"))), s.startsWith(a)
    );
    let n = L.findIndex((a) => r(a, e.mime)),
      i = L.findIndex((a) => r(a, t.mime));
    return (
      U(e) && (n = -1),
      U(t) && (i = -1),
      (n = n === -1 ? 100 : n),
      (i = i === -1 ? 100 : i),
      n - i
    );
  });
}
function U(o) {
  if (o.mime.startsWith("application/vnd."))
    try {
      return new TextDecoder().decode(o.data).length === 0;
    } catch {}
  return !1;
}
function ae(o, e) {
  if (!e) return l.NotebookCellOutputItem.text("", o);
  try {
    if (
      (o.startsWith("text/") || ne.includes(o)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? j(e) : e;
      return l.NotebookCellOutputItem.text(t, o);
    } else
      return o.startsWith("image/") &&
        typeof e == "string" &&
        o !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(se(e), o)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), o)
          : ((e = Array.isArray(e) ? j(e) : e),
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
function se(o) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(o, "base64")
    : Uint8Array.from(atob(o), (e) => e.charCodeAt(0));
}
function j(o) {
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
function le(o) {
  let e = o;
  do (o = e), (e = o.replace(/[^\n]\x08/gm, ""));
  while (e.length < o.length);
  return o;
}
function ce(o) {
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
function ue(o) {
  return ce(le(o));
}
function C(o) {
  if (o.parent_header && "msg_id" in o.parent_header)
    return o.parent_header.msg_id;
}
function de(o) {
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
const pe = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function B(o) {
  let e = typeof o == "string" ? o : "";
  return (
    typeof o != "string" &&
      "content" in o &&
      "code" in o.content &&
      typeof o.content.code == "string" &&
      (e = o.content.code),
    !e.includes(pe)
  );
}
function he(o) {
  const e = j(o.text),
    t =
      o.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], K(o));
}
function be(o) {
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
      { ...K(o), originalError: o },
    )
  );
}
var x;
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
})(x || (x = {}));
const M = "application/vnd.jupyter.widget-view+json";
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
function me(o = null) {
  return new fe(o);
}
var T = {};
Object.defineProperty(T, "__esModule", { value: !0 });
T.serialize = F = T.deserialize = void 0;
function ge(o) {
  let e;
  return typeof o == "string" ? (e = JSON.parse(o)) : (e = we(o)), e;
}
var F = (T.deserialize = ge);
function ye(o) {
  var e;
  let t;
  return (
    !((e = o.buffers) === null || e === void 0) && e.length
      ? (t = ke(o))
      : (t = JSON.stringify(o)),
    t
  );
}
T.serialize = ye;
function we(o) {
  const e = new DataView(o),
    t = e.getUint32(0),
    r = [];
  if (t < 2) throw new Error("Invalid incoming Kernel Message");
  for (let a = 1; a <= t; a++) r.push(e.getUint32(a * 4));
  const n = new Uint8Array(o.slice(r[0], r[1])),
    i = JSON.parse(new TextDecoder("utf8").decode(n));
  i.buffers = [];
  for (let a = 1; a < t; a++) {
    const s = r[a],
      u = r[a + 1] || o.byteLength;
    i.buffers.push(new DataView(o.slice(s, u)));
  }
  return i;
}
function ke(o) {
  const e = [],
    t = [],
    r = new TextEncoder();
  let n = [];
  o.buffers !== void 0 && ((n = o.buffers), delete o.buffers);
  const i = r.encode(JSON.stringify(o));
  t.push(i.buffer);
  for (let d = 0; d < n.length; d++) {
    const h = n[d];
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
function _e(o) {
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
const ve = require("path");
function k() {}
ve.join(__dirname, ".");
function Pe() {
  console.log("Trying to load zmq");
  const o = require("zeromq");
  return (o.context.blocky = !1), console.info("ZMQ loaded."), o;
}
function Ee(o, e) {
  const t = o.transport === "tcp" ? ":" : "-",
    r = o[`${e}_port`];
  if (!r) throw new Error(`Port not found for channel "${e}"`);
  return `${o.transport}://${o.ip}${t}${r}`;
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
function Ne(o) {
  if (o.channel !== "iopub") return;
  const e = o.header.msg_type;
  if (e in z) {
    const t = z[e];
    if (t === void 0) return;
    const r = Object.keys(t),
      n = o.content;
    for (let i = 0; i < r.length; i++) {
      let a = t[r[i]];
      Array.isArray(a) || (a = [a]);
      const s = r[i];
      if (!(s in n) || typeof n[s] !== a[0])
        switch (a[0]) {
          case "string":
            n[s] = "";
            break;
          case "boolean":
            n[s] = !1;
            break;
          case "object":
            n[s] = {};
            break;
          case "number":
            n[s] = 0;
            break;
        }
    }
  }
}
function Oe(o, e) {
  const t = o.header;
  Te.forEach((r) => {
    typeof t[r] != "string" && (t[r] = "");
  }),
    typeof o.channel != "string" && (o.channel = e),
    o.content || (o.content = {}),
    o.metadata || (o.metadata = {}),
    o.channel === "iopub" && Ne(o);
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
      n.connect(Ee(e, t)),
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
    const t = Pe(),
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
        Oe(e, t), this.onmessage({ data: e, type: "message", target: this });
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
let $;
class Ie {
  get postMessage() {
    return this._postMessageEmitter.event;
  }
  constructor(e, t, r, n) {
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
      a = require("@jupyterlab/services/lib/kernel/serialize");
    let s;
    class u extends Ce {
      constructor() {
        super(e.connection, a.serialize), (s = this);
      }
    }
    const d = i.ServerConnection.makeSettings({ WebSocket: u, wsUrl: "RAW" });
    $ || ($ = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const h = new $.KernelConnection({
      serverSettings: d,
      clientId: t,
      handleComms: !1,
      username: r,
      model: n,
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
      const r = F(e);
      if (r.channel === "shell" && r.header.msg_type === "execute_request") {
        if (!B(r)) return;
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
    var i, a, s, u, d, h, m, p, f;
    const t = P(),
      r = me();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: r,
      }),
      typeof e == "string"
        ? B(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: _e([e]),
          }),
      typeof e != "string" ||
        e.includes(M) ||
        e.includes(x.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg"))
    ) {
      const b = F(e);
      if (!B(b)) return;
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
const Me = require("path");
class _ {
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
        var r, n;
        this.dbtTerminal.debug(
          "Notebookclient",
          "isInitialized",
          !!((r = this.kernel) != null && r.rawKernel),
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
          (s) => s`notebook_kernel.get_connection_file()`,
        ),
        r = JSON.parse(Q.readFileSync(t, { encoding: "utf-8" })),
        n = await this.python.lock((s) => s`notebook_kernel.get_session_id()`),
        i = { connection: r, pid: n },
        a = new Ie(i, P(), P(), { name: r.kernel_name, id: P() });
      (this.kernel = a),
        this.disposables.push(
          a.postMessage((s) => this._postMessageEmitter.fire(s)),
        ),
        this.dbtTerminal.log(
          `Notebook Kernel started with PID: ${n} connection: ${JSON.stringify(r)}`,
        ),
        this.getDependenciesVersion();
    } catch (t) {
      let r = t.message;
      t instanceof H.PythonException && (r = t.exception.message),
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
  async storeContext(e) {
    this.dbtTerminal.log(`storeContext: ${e}`),
      await this.python.lock((t) => t`notebook_kernel.store_context(${e})`);
  }
  async storeDataInKernel(e, t) {
    return new Promise(async (r, n) => {
      try {
        this.dbtTerminal.log(`storeDataInKernel: ${e}`),
          await this.python.lock(
            (i) =>
              i`notebook_kernel.store_sql_result(${e}, ${JSON.stringify(t)})`,
          ),
          r(!0);
      } catch (i) {
        this.dbtTerminal.error(
          c.TelemetryEvents["Notebook/StoreDataInKernelError"],
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
    return t.realKernel.registerCommTarget(e, (r, n) => {
      this.dbtTerminal.log(`registerCommTarget registered: ${e}`, r, n);
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
              y && r(y);
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
    var r;
    this.ownedCommIds.add(e.content.comm_id);
    const t = ((r = e.content.data) == null ? void 0 : r.state) || void 0;
    e.content.target_name === x.DefaultCommTarget &&
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
    if (e.data && typeof e.data == "object" && M in e.data) {
      const a = e.data[M];
      if (a && "model_id" in a) {
        const s = _.modelIdsOwnedByCells.get(r) || new Set();
        s.add(a.model_id), _.modelIdsOwnedByCells.set(r, s);
      }
    }
    const n = W(e);
    if (r.document.isClosed) return;
    this.dbtTerminal.log(
      r.document.uri.fsPath,
      `Update output with mimes ${n.items.map((a) => a.mime).toString()}`,
    );
    const i = C(t);
    return (
      (this.outputsAreSpecificToAWidget.length &&
        this.outputsAreSpecificToAWidget[
          this.outputsAreSpecificToAWidget.length - 1
        ].msgIdsToSwallow === i &&
        n.items.every((a) => this.canMimeTypeBeRenderedByWidgetManager(a))) ||
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
    if (t === w.stderr || t === w.stdout || t === w.error) return !0;
    if (t === M) {
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
      C(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === C(e)
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
    const r = {
      output_type: "display_data",
      data: de(e.content.data),
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
Object.defineProperty(_, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
var De = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Se = function (o, e) {
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
  async verifyAndInstallDependenciesIfNeeded(e) {
    this.dbtTerminal.debug(
      "NotebookDependencies",
      "verifying required dependencies",
      e,
    );
    const t = [];
    for (const r of e) {
      const n = ["-m", "pip", "show", r],
        { stdout: i, stderr: a } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: this.pythonEnvironment.pythonPath,
            args: n,
            cwd: c.getFirstWorkspacePath(),
            envVars: this.pythonEnvironment.environmentVariables,
          })
          .completeWithTerminalOutput();
      a && t.push(r);
      const s = i.split(`
`);
      for (const u of s)
        if (u.startsWith("Version:")) {
          u.split(":")[1].trim();
          break;
        }
    }
    if (t.length > 0) {
      if (
        (this.dbtTerminal.debug(
          "Notebook",
          "asking user to install missing dependencies for notebook",
          t,
        ),
        (await l.window.showInformationMessage(
          `You need ${t.join(", ")} to use this notebook`,
          "Install",
          "Cancel",
        )) !== "Install")
      )
        return (
          this.telemetry.sendTelemetryEvent(
            c.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
          ),
          !1
        );
      this.dbtTerminal.debug("Notebook", "installing required dependencies", t),
        await l.window.withProgress(
          {
            title: "Installing required dependencies...",
            location: l.ProgressLocation.Notification,
            cancellable: !1,
          },
          async () => {
            try {
              const n = ["-m", "pip", "install", ...t],
                { stdout: i, stderr: a } =
                  await this.commandProcessExecutionFactory
                    .createCommandProcessExecution({
                      command: this.pythonEnvironment.pythonPath,
                      args: n,
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
            } catch (n) {
              return (
                this.telemetry.sendTelemetryError(
                  c.TelemetryEvents["Notebook/DependenciesInstallError"],
                  n,
                ),
                l.window.showErrorMessage(
                  c.extendErrorWithSupportLinks(n.message),
                ),
                !1
              );
            }
          },
        );
    }
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
      n.forEach((a) => {
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
exports.NotebookDependencies = De(
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
var je = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  xe = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
let D = class {
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
      const t = new _(
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
D = je(
  [
    c.provideSingleton(D),
    xe("design:paramtypes", [
      c.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      c.DBTTerminal,
    ]),
  ],
  D,
);
const Re = ["python", "sql", "jinja-sql"],
  Ae = "jinja-sql",
  Y = ".notebook",
  G = "datapilot",
  E = "datapilot-notebook";
var We = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Be = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
exports.DatapilotNotebookController = class {
  constructor(e, t, r, n, i, a) {
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
    const r = [
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
      n = await l.window.showQuickPick(r, {
        title: "Select a notebook",
        canPickMany: !1,
      });
    return n == null ? void 0 : n.template;
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
    const { notebookId: t, template: r, context: n } = e || {};
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
            const a = t ? null : await this.getNotebookByTemplate(r);
            if (
              ((i = a == null ? void 0 : a.metadata) != null &&
                i.dependencies &&
                (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
                  a.metadata.dependencies,
                )),
              n && a)
            )
              for (const g in n)
                n.hasOwnProperty(g) &&
                  typeof n[g] == "string" &&
                  (a.cells[0].source = a.cells[0].source.map((O) =>
                    O.replace(`%_${g}_%`, n[g]),
                  ));
            const s =
              await this.queryManifestService.getOrPickProjectFromWorkspace();
            if (!s) {
              l.window.showErrorMessage("No dbt project selected.");
              return;
            }
            const u = t || this.getUntitledFileName(),
              d = l.Uri.parse(`${s.projectRoot}/${u}${Y}`).with({ scheme: G });
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
              (N.newNotebookMetadata.context = n),
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
    const n = [];
    if (
      (e.forEach((i) => {
        let a = i.metadata.cellId;
        if (!a) {
          a = this.genUniqueId(i);
          const s = { ...i.metadata, cellId: a },
            u = l.NotebookEdit.updateCellMetadata(i.index, s);
          n.push(u);
        }
        this._onNotebookCellEvent.fire({
          cellId: a,
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
      r = await t.getKernel();
    if (!(r != null && r.realKernel))
      throw new Error("Unable to initialize kernel");
    this.disposables.push(
      t.postMessage((u) => {
        this.sendMessageToPreloadScript(u);
      }, this),
    );
    const n = e.getCells();
    if (
      (this.updateCellId(n, e),
      this.dbtTerminal.debug(
        "Notebook",
        "should auto run notebook?",
        (i = e.metadata) == null ? void 0 : i.autoRun,
      ),
      (a = e.metadata) != null && a.autoRun)
    ) {
      this.dbtTerminal.debug("Notebook", "auto running notebook");
      for (const u of n)
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
  _executeAll(e, t, r) {
    var i, a;
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
    for (const s of e)
      this._doExecution(
        s,
        n,
        (a = n.metadata) == null ? void 0 : a.isUserNotebook,
      );
  }
  filterIPyWidgets(e, t = !1) {
    return e.map((r) => {
      const i = r.items.find(
        (a) => a.mime === "application/vnd.jupyter.widget-view+json",
      )
        ? t
          ? [l.NotebookCellOutputItem.text("IPyWidgets not supported")]
          : []
        : r.items;
      return new l.NotebookCellOutput(i);
    });
  }
  async _doExecution(e, t, r) {
    this.dbtTerminal.debug("Notebook", "executing cell", e.index, t.uri.fsPath);
    const n = this.controller.createNotebookCellExecution(e);
    (n.executionOrder = ++this.executionOrder),
      n.start(Date.now()),
      n.token.onCancellationRequested((i) => {
        n.end(!0, Date.now());
      });
    try {
      n.clearOutput();
      const i = [],
        a = await this.clientMapper.getNotebookClient(t.uri);
      switch (e.document.languageId) {
        case "python":
          this.telemetry.startTelemetryEvent(
            c.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const s = await a.executePython(e.document.getText(), e, (h) => {
            n.appendOutput(this.filterIPyWidgets([h], r));
          });
          s && n.appendOutput(this.filterIPyWidgets(s, r));
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
            r ||
              (i.push(
                l.NotebookCellOutputItem.json(
                  d,
                  "application/perspective-json",
                ),
              ),
              n.appendOutput(new l.NotebookCellOutput(i))),
            await a.storeDataInKernel(e.metadata.cellId, d),
            r)
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
                n.appendOutput(this.filterIPyWidgets([p], r));
              });
            m && n.appendOutput(this.filterIPyWidgets(m, r));
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
        n.end(!0, Date.now());
    } catch (i) {
      n.replaceOutput([
        new l.NotebookCellOutput([l.NotebookCellOutputItem.error(i)]),
      ]),
        this.telemetry.endTelemetryEvent(
          c.TelemetryEvents["Notebook/Execute"],
          i,
          { language: e.document.languageId },
        ),
        n.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = We(
  [
    c.provideSingleton(exports.DatapilotNotebookController),
    Be("design:paramtypes", [
      D,
      c.QueryManifestService,
      c.TelemetryService,
      c.DBTTerminal,
      exports.NotebookDependencies,
      c.AltimateRequest,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class $e {
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
var Fe = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ke = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
const V = require("path");
let S = class {
  constructor(e, t, r) {
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
        value: r,
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
  delete(e, t) {
    const r = e.with({ path: V.posix.dirname(e.path) });
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
    return V.basename(e.fsPath, Y);
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
      const a = await l.window.showInputBox({ prompt: "Your notebook name?" });
      if (!a) return;
      this.saveNotebook(n, a);
      const s = this.getFileNameFromUri(e),
        u = e.with({ path: e.path.replace(s, a) });
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
    const r = J(e, t);
    return (
      this.dbtTerminal.log("saving notebook", t, r),
      this.altimate.addNotebook({
        name: t,
        description: "",
        data: r,
        tags_list: [],
      }),
      this.dbtTerminal.log("notebook saved", t, r),
      r
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
var qe = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Le = function (o, e) {
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
exports.NotebookService = qe(
  [
    c.provideSingleton(exports.NotebookService),
    Le("design:paramtypes", [exports.DatapilotNotebookController]),
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
var ze = function (o, e, t, r) {
    var n = arguments.length,
      i =
        n < 3
          ? e
          : r === null
            ? (r = Object.getOwnPropertyDescriptor(e, t))
            : r,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, r);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
    return n > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Ve = function (o, e) {
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
        l.notebooks.registerNotebookCellStatusBarItemProvider(E, new $e()),
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
