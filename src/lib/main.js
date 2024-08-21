"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  u = require("@extension"),
  X = require("python-bridge"),
  M = require("path"),
  Z = require("fs"),
  ee = require("@nteract/messaging/lib/wire-protocol");
function te(o) {
  const e = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (o) {
    for (const t in o)
      if (t !== "default") {
        const n = Object.getOwnPropertyDescriptor(o, t);
        Object.defineProperty(
          e,
          t,
          n.get ? n : { enumerable: !0, get: () => o[t] },
        );
      }
  }
  return (e.default = o), Object.freeze(e);
}
const L = te(ee),
  oe = ["python", "sql", "jinja-sql"],
  ne = "jinja-sql",
  J = ".notebook",
  G = "datapilot",
  v = "datapilot-notebook";
var $;
(function (o) {
  o.ProfileQuery = "profileQuery";
})($ || ($ = {}));
const re = (o) => ("getCells" in o ? o.getCells() : o.cells),
  ie = (o) =>
    o instanceof l.NotebookCellData ? o.value : o.document.getText(),
  ae = (o) =>
    o instanceof l.NotebookCellData ? o.languageId : o.document.languageId,
  Y = (o, e) => {
    var n;
    const t = [];
    for (const r of re(o))
      t.push({
        cell_type: r.kind === l.NotebookCellKind.Code ? "code" : "markdown",
        source: ie(r).split(/\r?\n/g),
        languageId: ae(r),
        metadata: r.metadata,
      });
    return {
      cells: t,
      metadata: {
        ...o.metadata,
        name: e,
        createdAt:
          ((n = o.metadata) == null ? void 0 : n.createdAt) ||
          new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  },
  P = () => Math.random().toString(36).substr(2, 9);
var se = function (o, e, t, n) {
  var r = arguments.length,
    i =
      r < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, t)) : n,
    a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(o, e, t, n);
  else
    for (var s = o.length - 1; s >= 0; s--)
      (a = o[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let C = class {
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(e, t) {
    const n = new TextDecoder().decode(e);
    let r;
    try {
      r = JSON.parse(n);
    } catch {
      r = {
        cells: [
          { cell_type: "code", source: [], languageId: ne, metadata: {} },
        ],
      };
    }
    const i = r.cells.map((s) => {
        var c;
        return new l.NotebookCellData(
          l.NotebookCellKind.Code,
          (c = s.source) == null
            ? void 0
            : c.join(`
`),
          s.languageId,
        );
      }),
      a = new l.NotebookData(i);
    return (a.metadata = r.metadata), a;
  }
  async serializeNotebook(e, t) {
    const n = Y(e);
    return new TextEncoder().encode(JSON.stringify(n));
  }
};
C = se([u.provideSingleton(C)], C);
var y;
(function (o) {
  (o.error = "application/vnd.code.notebook.error"),
    (o.stderr = "application/vnd.code.notebook.stderr"),
    (o.stdout = "application/vnd.code.notebook.stdout");
})(y || (y = {}));
const le = ["text/plain", "text/markdown", y.stderr, y.stdout],
  z = [
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
  _ = new Map();
_.set("display_data", x);
_.set("error", ye);
_.set("execute_result", x);
_.set("stream", ge);
_.set("update_display_data", x);
function W(o) {
  const e = _.get(o.output_type);
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
  if (o.data) for (const n in o.data) t.push(ce(n, o.data[n]));
  return new l.NotebookCellOutput(ue(t), e);
}
function ue(o) {
  return o.sort((e, t) => {
    const n = (a, s) => (
      a.endsWith(".*") && (a = a.substr(0, a.indexOf(".*"))), s.startsWith(a)
    );
    let r = z.findIndex((a) => n(a, e.mime)),
      i = z.findIndex((a) => n(a, t.mime));
    return (
      V(e) && (r = -1),
      V(t) && (i = -1),
      (r = r === -1 ? 100 : r),
      (i = i === -1 ? 100 : i),
      r - i
    );
  });
}
function V(o) {
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
      (o.startsWith("text/") || le.includes(o)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? S(e) : e;
      return l.NotebookCellOutputItem.text(t, o);
    } else
      return o.startsWith("image/") &&
        typeof e == "string" &&
        o !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(de(e), o)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), o)
          : ((e = Array.isArray(e) ? S(e) : e),
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
function de(o) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(o, "base64")
    : Uint8Array.from(atob(o), (e) => e.charCodeAt(0));
}
function S(o) {
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
function pe(o) {
  let e = o;
  do (o = e), (e = o.replace(/[^\n]\x08/gm, ""));
  while (e.length < o.length);
  return o;
}
function he(o) {
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
function be(o) {
  return he(pe(o));
}
function O(o) {
  if (o.parent_header && "msg_id" in o.parent_header)
    return o.parent_header.msg_id;
}
function fe(o) {
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
const me = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function B(o) {
  let e = typeof o == "string" ? o : "";
  return (
    typeof o != "string" &&
      "content" in o &&
      "code" in o.content &&
      typeof o.content.code == "string" &&
      (e = o.content.code),
    !e.includes(me)
  );
}
function ge(o) {
  const e = S(o.text),
    t =
      o.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], U(o));
}
function ye(o) {
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
var D;
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
})(D || (D = {}));
const T = "application/vnd.jupyter.widget-view+json";
class we {
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
function ke(o = null) {
  return new we(o);
}
var E = {};
Object.defineProperty(E, "__esModule", { value: !0 });
E.serialize = F = E.deserialize = void 0;
function _e(o) {
  let e;
  return typeof o == "string" ? (e = JSON.parse(o)) : (e = Pe(o)), e;
}
var F = (E.deserialize = _e);
function ve(o) {
  var e;
  let t;
  return (
    !((e = o.buffers) === null || e === void 0) && e.length
      ? (t = Ee(o))
      : (t = JSON.stringify(o)),
    t
  );
}
E.serialize = ve;
function Pe(o) {
  const e = new DataView(o),
    t = e.getUint32(0),
    n = [];
  if (t < 2) throw new Error("Invalid incoming Kernel Message");
  for (let a = 1; a <= t; a++) n.push(e.getUint32(a * 4));
  const r = new Uint8Array(o.slice(n[0], n[1])),
    i = JSON.parse(new TextDecoder("utf8").decode(r));
  i.buffers = [];
  for (let a = 1; a < t; a++) {
    const s = n[a],
      c = n[a + 1] || o.byteLength;
    i.buffers.push(new DataView(o.slice(s, c)));
  }
  return i;
}
function Ee(o) {
  const e = [],
    t = [],
    n = new TextEncoder();
  let r = [];
  o.buffers !== void 0 && ((r = o.buffers), delete o.buffers);
  const i = n.encode(JSON.stringify(o));
  t.push(i.buffer);
  for (let p = 0; p < r.length; p++) {
    const h = r[p];
    t.push(ArrayBuffer.isView(h) ? h.buffer : h);
  }
  const a = t.length;
  e.push(4 * (a + 1));
  for (let p = 0; p + 1 < t.length; p++)
    e.push(e[e.length - 1] + t[p].byteLength);
  const s = new Uint8Array(e[e.length - 1] + t[t.length - 1].byteLength),
    c = new DataView(s.buffer);
  c.setUint32(0, a);
  for (let p = 0; p < e.length; p++) c.setUint32(4 * (p + 1), e[p]);
  for (let p = 0; p < t.length; p++) s.set(new Uint8Array(t[p]), e[p]);
  return s.buffer;
}
function Ne(o) {
  if (!o || !Array.isArray(o) || o.length === 0) return;
  const e = [];
  for (let t = 0; t < o.length; t += 1) {
    const n = o[t];
    if ("buffer" in n && "byteOffset" in n) {
      const r = [...new Uint8Array(n.buffer)];
      e.push({
        ...n,
        byteLength: n.byteLength,
        byteOffset: n.byteOffset,
        buffer: r,
      });
    } else e.push([...new Uint8Array(n)]);
  }
  return e;
}
function w() {}
M.join(__dirname, ".");
function Oe() {
  console.log("Trying to load zmq");
  const o = require("zeromq");
  return (o.context.blocky = !1), console.info("ZMQ loaded."), o;
}
function Ce(o, e) {
  const t = o.transport === "tcp" ? ":" : "-",
    n = o[`${e}_port`];
  if (!n) throw new Error(`Port not found for channel "${e}"`);
  return `${o.transport}://${o.ip}${t}${n}`;
}
const Te = ["username", "version", "session", "msg_id", "msg_type"],
  H = {
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
function Ie(o) {
  if (o.channel !== "iopub") return;
  const e = o.header.msg_type;
  if (e in H) {
    const t = H[e];
    if (t === void 0) return;
    const n = Object.keys(t),
      r = o.content;
    for (let i = 0; i < n.length; i++) {
      let a = t[n[i]];
      Array.isArray(a) || (a = [a]);
      const s = n[i];
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
function je(o, e) {
  const t = o.header;
  Te.forEach((n) => {
    typeof t[n] != "string" && (t[n] = "");
  }),
    typeof o.channel != "string" && (o.channel = e),
    o.content || (o.content = {}),
    o.metadata || (o.metadata = {}),
    o.channel === "iopub" && Ie(o);
}
class Me {
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
        value: w,
      }),
      Object.defineProperty(this, "onerror", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: w,
      }),
      Object.defineProperty(this, "onclose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: w,
      }),
      Object.defineProperty(this, "onmessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: w,
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
  generateChannel(e, t, n) {
    const r = n();
    return (
      r.connect(Ce(e, t)),
      this.processSocketMessages(t, r).catch((i) =>
        console.error(`Failed to read messages from channel ${t}`, i),
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
    const t = Oe(),
      n = P(),
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
              routingId: n,
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
              routingId: n,
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
              routingId: n,
              sendHighWaterMark: 0,
              receiveHighWaterMark: 0,
              maxMessageSize: -1,
            }),
        ),
      };
    return r.iopub.subscribe(), r;
  }
  onIncomingMessage(e, t) {
    const n = this.closed
      ? {}
      : L.decode(t, this.connection.key, this.connection.signature_scheme);
    (n.channel = e),
      this.receiveHooks.length
        ? (this.msgChain = this.msgChain
            .then(() => {
              const r = this.serialize(n);
              return Promise.all(this.receiveHooks.map((i) => i(r)));
            })
            .then(() => this.fireOnMessage(n, e)))
        : (this.msgChain = this.msgChain.then(() => this.fireOnMessage(n, e)));
  }
  fireOnMessage(e, t) {
    if (!this.closed)
      try {
        je(e, t), this.onmessage({ data: e, type: "message", target: this });
      } catch (n) {
        console.error(
          `Failed to handle message in Jupyter Kernel package ${JSON.stringify(e)}`,
          n,
        );
      }
  }
  sendMessage(e, t) {
    const n = L.encode(
      e,
      this.connection.key,
      this.connection.signature_scheme,
    );
    if (!t && this.sendHooks.length) {
      const r = this.serialize(e);
      this.sendChain = this.sendChain
        .then(() => Promise.all(this.sendHooks.map((i) => i(r, w))))
        .then(async () => {
          try {
            await this.postToSocket(e.channel, n);
          } catch (i) {
            console.error(
              `Failed to write data to the kernel channel ${e.channel}`,
              n,
              i,
            );
          }
        });
    } else
      this.sendChain = this.sendChain.then(() => {
        this.postToSocket(e.channel, n);
      });
    this.sendChain.catch(w);
  }
  postToSocket(e, t) {
    const n = this.channels[e];
    n
      ? n.send(t).catch((r) => {
          console.error("Error communicating with the kernel", r);
        })
      : console.error(`Attempting to send message on invalid channel: ${e}`);
  }
}
let K;
class Se {
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
        value: new l.EventEmitter(),
      }),
      (this.kernel = this.initializeKernel(e, t, n, r));
  }
  get rawKernel() {
    return this.kernel;
  }
  initializeKernel(e, t, n, r) {
    const i = require("@jupyterlab/services"),
      a = require("@jupyterlab/services/lib/kernel/serialize");
    let s;
    class c extends Me {
      constructor() {
        super(e.connection, a.serialize), (s = this);
      }
    }
    const p = i.ServerConnection.makeSettings({ WebSocket: c, wsUrl: "RAW" });
    K || (K = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const h = new K.KernelConnection({
      serverSettings: p,
      clientId: t,
      handleComms: !1,
      username: n,
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
      const n = F(e);
      if (n.channel === "shell" && n.header.msg_type === "execute_request") {
        if (!B(n)) return;
        this.mirrorExecuteRequest(n);
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
    var i, a, s, c, p, h, m, d, f;
    const t = P(),
      n = ke();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: n,
      }),
      typeof e == "string"
        ? B(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: Ne([e]),
          }),
      typeof e != "string" ||
        e.includes(T) ||
        e.includes(D.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg"))
    ) {
      const b = F(e);
      if (!B(b)) return;
      const g =
          ((i = b.header) == null ? void 0 : i.msg_type) === "comm_open" &&
          ((c =
            (s = (a = b.content) == null ? void 0 : a.data) == null
              ? void 0
              : s.state) == null
            ? void 0
            : c._model_module) === "@jupyter-widgets/output" &&
          ((m =
            (h = (p = b.content) == null ? void 0 : p.data) == null
              ? void 0
              : h.state) == null
            ? void 0
            : m._model_name) === "OutputModel",
        A =
          ((d = b.header) == null ? void 0 : d.msg_type) === "comm_close" &&
          this.outputWidgetIds.has(
            (f = b.content) == null ? void 0 : f.comm_id,
          );
      g
        ? this.outputWidgetIds.add(b.content.comm_id)
        : A && this.outputWidgetIds.delete(b.content.comm_id);
    }
  }
  onKernelSocketResponse(e) {
    const t = this.waitingMessageIds.get(e.id);
    t && (this.waitingMessageIds.delete(e.id), t.resultPromise.resolve());
  }
}
class k {
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
        M.dirname(e),
      )),
      this.initializeNotebookKernel(e);
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
          (s) => s`notebook_kernel.get_connection_file()`,
        ),
        n = JSON.parse(Z.readFileSync(t, { encoding: "utf-8" })),
        r = await this.python.lock((s) => s`notebook_kernel.get_session_id()`),
        i = { connection: n, pid: r },
        a = new Se(i, P(), P(), { name: n.kernel_name, id: P() });
      (this.kernel = a),
        this.disposables.push(
          a.postMessage((s) => this._postMessageEmitter.fire(s)),
        ),
        this.dbtTerminal.log(
          `Notebook Kernel started with PID: ${r} connection: ${JSON.stringify(n)}`,
        ),
        this.getDependenciesVersion();
    } catch (t) {
      let n = t.message;
      t instanceof X.PythonException && (n = t.exception.message),
        this.dbtTerminal.error(
          u.TelemetryEvents["Notebook/KernelInitializationError"],
          n,
          t,
        ),
        l.window.showErrorMessage(n);
    }
    this.isInitializing = !1;
  }
  onKernelSocketResponse(e) {
    var t;
    (t = this.kernel) == null || t.onKernelSocketResponse(e);
  }
  async storeDataInKernel(e, t) {
    return new Promise(async (n, r) => {
      try {
        this.dbtTerminal.log(`storeDataInKernel: ${e}`),
          await this.python.lock(
            (i) =>
              i`notebook_kernel.store_sql_result(${e}, ${JSON.stringify(t)})`,
          ),
          n(!0);
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
      c.onReply = (d) => {
        if (t.document.isClosed) {
          c.dispose();
          return;
        }
        const f = d.content;
        f.payload &&
          f.payload.forEach((b) => {
            if (b.data && b.data.hasOwnProperty("text/plain")) {
              const g = this.addToCellData(
                {
                  output_type: "stream",
                  text: b.data["text/plain"].toString(),
                  name: "stdout",
                  metadata: {},
                  execution_count: f.execution_count,
                },
                d,
                t,
              );
              g && n(g);
            }
          });
      };
      const p = [];
      return (
        c.done.finally(() => {
          c.dispose(), r(p.filter((d) => !!d));
        }),
        (c.onStdin = (d) => {
          this.dbtTerminal.log("onStdin", d);
        }),
        (c.onIOPub = (d) => {
          if (s.KernelMessage.isCommOpenMsg(d)) this.handleCommOpen(d);
          else if (s.KernelMessage.isExecuteResultMsg(d))
            p.push(this.handleExecuteResult(d, t));
          else if (s.KernelMessage.isExecuteInputMsg(d))
            this.handleExecuteInput(d);
          else if (s.KernelMessage.isStatusMsg(d)) {
            const f = d;
            this.handleStatusMessage(f);
          } else if (s.KernelMessage.isStreamMsg(d)) {
            const f = this.handleStreamMessage(d, t);
            f == null ||
              f.forEach((b) => {
                p.push(b);
              });
          } else
            s.KernelMessage.isDisplayDataMsg(d)
              ? p.push(this.handleDisplayData(d, t))
              : s.KernelMessage.isUpdateDisplayDataMsg(d)
                ? this.handleUpdateDisplayDataMessage(d)
                : s.KernelMessage.isClearOutputMsg(d)
                  ? this.handleClearOutput(d)
                  : s.KernelMessage.isErrorMsg(d)
                    ? p.push(this.handleError(d, t))
                    : s.KernelMessage.isCommOpenMsg(d) ||
                      (s.KernelMessage.isCommMsgMsg(d)
                        ? this.handleCommMsg(d)
                        : s.KernelMessage.isCommCloseMsg(d) ||
                          this.dbtTerminal.warn(
                            "NotebookUnknownIOPubMessage",
                            `Unknown message ${d.header.msg_type} : hasData=${"data" in d.content}`,
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
    var n;
    this.ownedCommIds.add(e.content.comm_id);
    const t = ((n = e.content.data) == null ? void 0 : n.state) || void 0;
    e.content.target_name === D.DefaultCommTarget &&
      t &&
      t._model_module === "@jupyter-widgets/output" &&
      this.commIdsMappedToWidgetOutputModels.add(e.content.comm_id);
  }
  handleCommMsg(e) {
    const t = e.content.data;
    if (!(!t || t.method !== "update" || typeof t.state != "object")) {
      if ("msg_id" in t.state && typeof t.state.msg_id == "string") {
        const n = "msg_id" in e.parent_header ? e.parent_header : void 0;
        (this.ownedRequestMsgIds.has(e.content.comm_id) ||
          (n && this.ownedRequestMsgIds.has(n.msg_id))) &&
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
        const n = "IPY_MODEL_";
        t.state.children.forEach((r) => {
          if (typeof r != "string")
            return this.dbtTerminal.warn(
              "Came across a comm update message a child that isn't a string",
              r,
            );
          if (!r.startsWith(n))
            return this.dbtTerminal.warn(
              `Came across a comm update message a child that start start with ${n}`,
              r,
            );
          const i = r.substring(n.length);
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
  addToCellData(e, t, n) {
    if (e.data && typeof e.data == "object" && T in e.data) {
      const a = e.data[T];
      if (a && "model_id" in a) {
        const s = k.modelIdsOwnedByCells.get(n) || new Set();
        s.add(a.model_id), k.modelIdsOwnedByCells.set(n, s);
      }
    }
    const r = W(e);
    if (n.document.isClosed) return;
    this.dbtTerminal.log(
      n.document.uri.fsPath,
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
    if (t === y.stderr || t === y.stdout || t === y.error) return !0;
    if (t === T) {
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
      O(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === O(e)
    )
      return;
    const n =
      e.content.name === "stdout"
        ? l.NotebookCellOutputItem.stdout("").mime
        : l.NotebookCellOutputItem.stderr("").mime;
    if (
      (!this.streamsReAttachedToExecutingCell &&
        !this.lastUsedStreamOutput &&
        t.outputs.length &&
        t.outputs[t.outputs.length - 1].items.length >= 1 &&
        t.outputs[t.outputs.length - 1].items.every((i) => i.mime === n) &&
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
      const i = be(S(e.content.text));
      return [W({ output_type: "stream", name: e.content.name, text: i })];
    }
  }
  handleDisplayData(e, t) {
    const n = {
      output_type: "display_data",
      data: fe(e.content.data),
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
Object.defineProperty(k, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
var De = function (o, e, t, n) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, n);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  xe = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
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
  async verifyAndInstallDependenciesIfNeeded(e) {
    this.dbtTerminal.debug(
      "NotebookDependencies",
      "verifying required dependencies",
      e,
    );
    const t = [];
    for (const n of e) {
      const r = ["-m", "pip", "show", n],
        { stdout: i, stderr: a } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: this.pythonEnvironment.pythonPath,
            args: r,
            cwd: u.getFirstWorkspacePath(),
            envVars: this.pythonEnvironment.environmentVariables,
          })
          .completeWithTerminalOutput();
      a && t.push(n);
      const s = i.split(`
`);
      for (const c of s)
        if (c.startsWith("Version:")) {
          c.split(":")[1].trim();
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
            u.TelemetryEvents["Notebook/DependenciesInstallCancelled"],
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
              const r = ["-m", "pip", "install", ...t],
                { stdout: i, stderr: a } =
                  await this.commandProcessExecutionFactory
                    .createCommandProcessExecution({
                      command: this.pythonEnvironment.pythonPath,
                      args: r,
                      cwd: u.getFirstWorkspacePath(),
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
                  u.TelemetryEvents["Notebook/DependenciesInstalled"],
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
        );
    }
  }
  async getDependenciesVersion() {
    const e = ["-m", "jupyter", "--version"],
      { stdout: t, stderr: n } = await this.commandProcessExecutionFactory
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
      n
    )
      throw new Error(n);
    const r = t.split(`
`),
      i = {};
    return (
      r.forEach((a) => {
        const [s, c] = a.split(":").map((p) => p.trim());
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
            const n = [
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
                    args: n,
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
          } catch (n) {
            return (
              this.telemetry.sendTelemetryError(
                u.TelemetryEvents["Notebook/DependenciesInstallError"],
                n,
              ),
              l.window.showErrorMessage(
                u.extendErrorWithSupportLinks(n.message),
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
exports.NotebookDependencies = De(
  [
    u.provideSingleton(exports.NotebookDependencies),
    xe("design:paramtypes", [
      u.DBTTerminal,
      u.TelemetryService,
      u.CommandProcessExecutionFactory,
      u.PythonEnvironment,
    ]),
  ],
  exports.NotebookDependencies,
);
var Ae = function (o, e, t, n) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, n);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Re = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
let I = class {
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
      const t = new k(
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
I = Ae(
  [
    u.provideSingleton(I),
    Re("design:paramtypes", [
      u.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      u.DBTTerminal,
    ]),
  ],
  I,
);
const Q = {
  notebooks: [
    {
      name: "Profile your query",
      description: "Notebook to profile your query",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      id: "1",
      notebookData: {
        cells: [
          {
            cell_type: "code",
            source: [],
            languageId: "jinja-sql",
            metadata: { cellId: "jinja_sql_cu6pt" },
          },
          {
            cell_type: "code",
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
var We = function (o, e, t, n) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, n);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Be = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
exports.DatapilotNotebookController = class {
  constructor(e, t, n, r, i) {
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
        value: i,
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
        v,
        this.label,
      )),
      (this.controller.supportedLanguages = oe),
      (this.controller.supportsExecutionOrder = !0),
      (this.controller.executeHandler = this._executeAll.bind(this)),
      this.disposables.push(
        l.workspace.onDidChangeNotebookDocument((a) => {
          a.contentChanges.forEach(async (s) => {
            s.addedCells &&
              (await this.updateCellId(a.notebook.getCells(), a.notebook)),
              s.removedCells &&
                s.removedCells.forEach((c) => {
                  this._onNotebookCellEvent.fire({
                    cellId: c.metadata.cellId,
                    notebook: a.notebook.uri.fsPath,
                    result: null,
                    event: "delete",
                    fragment: c.document.uri.fragment,
                    languageId: c.document.languageId,
                  });
                });
          });
        }),
      ),
      this.disposables.push(this.controller),
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
    var a;
    this.dbtTerminal.debug("Notebook", "getting notebook by template", e);
    const t = Q;
    if (e)
      return (a = t.notebooks.find((s) => s.name === e)) == null
        ? void 0
        : a.notebookData;
    this.dbtTerminal.debug("Notebook", "picking template notebook");
    const n = [
        { label: "Blank notebook", description: "", id: "" },
        ...t.notebooks.map((s) => ({
          label: s.name,
          description: s.description,
          id: s.id,
        })),
      ],
      r = await l.window.showQuickPick(n, {
        title: "Select a notebook",
        canPickMany: !1,
      }),
      i = r != null && r.id ? t.notebooks.find((s) => s.id === r.id) : void 0;
    return i == null ? void 0 : i.notebookData;
  }
  async profileYourQuery(e) {
    var r;
    this.dbtTerminal.log("profileYourQuery", e);
    const t = (r = l.window.activeNotebookEditor) == null ? void 0 : r.notebook,
      n = t == null ? void 0 : t.getCells()[0];
    if (!t || !n) {
      this.telemetry.sendTelemetryError(
        `${u.TelemetryEvents["Notebook/Execute"]}Error`,
        new Error("No active notebook found"),
      ),
        l.window.showErrorMessage(
          u.extendErrorWithSupportLinks("No active notebook found"),
        );
      return;
    }
    this._doExecution(n, t, $.ProfileQuery);
  }
  getUntitledFileName() {
    return (
      this.untitledCounter++,
      this.untitledCounter === 0
        ? "untitled"
        : `untitled${this.untitledCounter}`
    );
  }
  async createNotebook(e) {
    var p;
    const { notebookId: t, template: n, query: r } = e || {};
    this.dbtTerminal.debug("Notebook", "creating notebook", e);
    const i = t ? null : await this.getNotebookByTemplate(n);
    (p = i == null ? void 0 : i.metadata) != null &&
      p.dependencies &&
      (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
        i.metadata.dependencies,
      )),
      r && i && (i.cells[0].source = [r]);
    const a = await this.queryManifestService.getOrPickProjectFromWorkspace();
    if (!a) {
      l.window.showErrorMessage("No dbt project selected.");
      return;
    }
    const s = t || this.getUntitledFileName(),
      c = l.Uri.parse(`${a.projectRoot}/${s}${J}`).with({ scheme: G });
    this.dbtTerminal.debug("Notebook", "opening notebook", c),
      l.workspace.openNotebookDocument(c).then(
        (h) => {
          l.window.showNotebookDocument(h).then(
            async (m) => {
              if (!i) return;
              const d = new l.WorkspaceEdit(),
                f = new l.NotebookEdit(new l.NotebookRange(0, 0), []);
              f.newNotebookMetadata = i.metadata;
              const b = [f],
                g = [];
              i.cells.forEach((N, q) => {
                const R = new l.NotebookCellData(
                  N.cell_type === "code"
                    ? l.NotebookCellKind.Code
                    : l.NotebookCellKind.Markup,
                  N.source.join(`
`),
                  N.languageId,
                );
                (R.metadata = N.metadata),
                  b.push(new l.NotebookEdit(new l.NotebookRange(q, q), [R])),
                  g.push(R);
              });
              const A = new l.NotebookEdit(new l.NotebookRange(0, 0), g);
              (A.newNotebookMetadata = i.metadata),
                d.set(m.notebook.uri, b),
                await l.workspace.applyEdit(d);
            },
            (m) => {
              l.window.showErrorMessage(m.message);
            },
          );
        },
        (h) => {
          l.window.showErrorMessage(h.message);
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
  async onNotebookOpen(e) {
    var i, a;
    if (e.notebookType !== v) return;
    this.dbtTerminal.debug(
      "Notebookcontroller",
      `notebook open: ${e.uri.fsPath}`,
    );
    const t = await this.clientMapper.initializeNotebookClient(e.uri),
      n = await t.getKernel();
    if (!(n != null && n.realKernel))
      throw new Error("Unable to initialize kernel");
    this.disposables.push(
      t.postMessage((s) => {
        this.sendMessageToPreloadScript(s);
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
      for (const s of r)
        s.document.getText().trim() && (await this._doExecution(s, e));
    }
  }
  dispose() {
    this.disposables.forEach((e) => e.dispose());
  }
  _executeAll(e, t, n) {
    var i;
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
    for (const a of e) this._doExecution(a, r);
  }
  filterIPyWidgets(e, t = !1) {
    return e.map((n) => {
      const i = n.items.find(
        (a) => a.mime === "application/vnd.jupyter.widget-view+json",
      )
        ? t
          ? [l.NotebookCellOutputItem.text("IPyWidgets not supported")]
          : []
        : n.items;
      return new l.NotebookCellOutput(i);
    });
  }
  async _doExecution(e, t, n) {
    this.dbtTerminal.debug(
      "Notebook",
      "executing cell",
      e.index,
      t.uri.fsPath,
      n,
    );
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
            u.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const s = await a.executePython(e.document.getText(), e, (h) => {
            r.appendOutput(this.filterIPyWidgets([h], !n));
          });
          s && r.appendOutput(this.filterIPyWidgets(s, !n));
          break;
        case "jinja-sql":
        case "sql":
          this.dbtTerminal.debug(
            "Notebook",
            "executing sql",
            e.document.getText(),
          );
          const c =
            await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!c) {
            l.window.showErrorMessage("No dbt project selected.");
            return;
          }
          this.telemetry.startTelemetryEvent(
            u.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const p = await c.executeSQL(e.document.getText(), "", !0);
          if (
            (this._onNotebookCellEvent.fire({
              cellId: e.metadata.cellId,
              notebook: t.uri.fsPath,
              result: p,
              event: "add",
              languageId: e.document.languageId,
            }),
            n ||
              (i.push(
                l.NotebookCellOutputItem.json(
                  p,
                  "application/perspective-json",
                ),
              ),
              r.appendOutput(new l.NotebookCellOutput(i))),
            await a.storeDataInKernel(e.metadata.cellId, p),
            n)
          ) {
            const h = await a.getPythonCodeByType(n, e.metadata.cellId),
              m = await a.executePython(h, e, (d) => {
                r.appendOutput(this.filterIPyWidgets([d], !n));
              });
            m && r.appendOutput(this.filterIPyWidgets(m, !n));
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
    } catch (i) {
      r.replaceOutput([
        new l.NotebookCellOutput([l.NotebookCellOutputItem.error(i)]),
      ]),
        this.telemetry.endTelemetryEvent(
          u.TelemetryEvents["Notebook/Execute"],
          i,
          { language: e.document.languageId },
        ),
        r.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = We(
  [
    u.provideSingleton(exports.DatapilotNotebookController),
    Be("design:paramtypes", [
      I,
      u.QueryManifestService,
      u.TelemetryService,
      u.DBTTerminal,
      exports.NotebookDependencies,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class Ke {
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
var $e = function (o, e, t, n) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, n);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  Fe = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
let j = class {
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
      r = (this.dbtProjectContainer.getFromGlobalState("notebooks") || {})[t];
    return new TextEncoder().encode(JSON.stringify(r));
  }
  async writeFile(e, t, n) {
    await this.customSave(e, t),
      this._emitter.fire([{ type: l.FileChangeType.Changed, uri: e }]);
  }
  delete(e, t) {
    const n = e.with({ path: M.posix.dirname(e.path) });
    this._emitter.fire([
      { type: l.FileChangeType.Changed, uri: n },
      { uri: e, type: l.FileChangeType.Deleted },
    ]);
  }
  rename(e, t, n) {
    this._emitter.fire([
      { type: l.FileChangeType.Deleted, uri: e },
      { type: l.FileChangeType.Created, uri: t },
    ]);
  }
  getFileNameFromUri(e) {
    return M.basename(e.fsPath, J);
  }
  async customSave(e, t) {
    var n;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const r =
        (n = l.window.activeNotebookEditor) == null ? void 0 : n.notebook;
      if (!r) {
        this.dbtTerminal.warn(
          u.TelemetryEvents["Notebook/SaveError"],
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
        c = e.with({ path: e.path.replace(s, a) });
      await l.commands.executeCommand(
        "workbench.action.revertAndCloseActiveEditor",
      ),
        await l.window.showNotebookDocument(
          await l.workspace.openNotebookDocument(c),
        ),
        l.window.showInformationMessage("Notebook saved successfully");
    } catch (r) {
      this.dbtTerminal.error(
        u.TelemetryEvents["Notebook/SaveError"],
        r.message,
        r,
      );
    }
  }
  saveNotebook(e, t) {
    const n = Y(e, t);
    this.dbtTerminal.log("saving notebook", t, n);
    const r = this.dbtProjectContainer.getFromGlobalState("notebooks") || {};
    return (
      this.dbtProjectContainer.setToGlobalState("notebooks", { ...r, [t]: n }),
      this.dbtTerminal.log("notebook saved", t, n),
      n
    );
  }
};
j = $e(
  [
    u.provideSingleton(j),
    Fe("design:paramtypes", [u.DBTProjectContainer, u.DBTTerminal]),
  ],
  j,
);
var Ue = function (o, e, t, n) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, n);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  qe = function (o, e) {
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
};
exports.NotebookService = Ue(
  [
    u.provideSingleton(exports.NotebookService),
    qe("design:paramtypes", [exports.DatapilotNotebookController]),
  ],
  exports.NotebookService,
);
var Le = function (o, e, t, n) {
    var r = arguments.length,
      i =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      i = Reflect.decorate(o, e, t, n);
    else
      for (var s = o.length - 1; s >= 0; s--)
        (a = o[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(e, t, i) : a(e, t)) || i);
    return r > 3 && i && Object.defineProperty(e, t, i), i;
  },
  ze = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
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
        l.notebooks.registerNotebookCellStatusBarItemProvider(v, new Ke()),
        l.workspace.registerNotebookSerializer(v, this.notebookProvider, {}),
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
exports.NotebookProviders = Le(
  [
    u.provideSingleton(exports.NotebookProviders),
    ze("design:paramtypes", [
      C,
      exports.DatapilotNotebookController,
      j,
      u.DBTTerminal,
    ]),
  ],
  exports.NotebookProviders,
);
exports.CustomNotebooks = Q;
exports.NotebookKernelClient = k;
