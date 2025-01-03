"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const l = require("vscode"),
  p = require("@extension"),
  le = require("python-bridge"),
  me = require("fs"),
  pe = require("@nteract/messaging/lib/wire-protocol");
function he(o) {
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
const oe = he(pe),
  fe = (o) => ("getCells" in o ? o.getCells() : o.cells),
  be = (o) =>
    o instanceof l.NotebookCellData ? o.value : o.document.getText(),
  ge = (o) =>
    o instanceof l.NotebookCellData ? o.languageId : o.document.languageId,
  ee = (o, e, t) => {
    var r;
    const n = [];
    for (const s of fe(o))
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
function ye() {
  const o = new Date(),
    e = o.toLocaleDateString("en-GB").replace(/\//g, "-"),
    t = o.toLocaleTimeString("en-GB", { hour12: !1 }).replace(/:/g, "-");
  return `${e}-${t}`;
}
var we = function (o, e, t, n) {
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
};
let B = class {
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
        var u;
        const c = new l.NotebookCellData(
          i.cell_type,
          (u = i.source) == null
            ? void 0
            : u.join(`
`),
          i.languageId,
        );
        return (c.metadata = i.metadata), (c.outputs = i.outputs), c;
      }),
      a = new l.NotebookData(s);
    return (a.metadata = r.metadata), a;
  }
  async serializeNotebook(e, t) {
    const n = ee(e);
    return new TextEncoder().encode(JSON.stringify(n));
  }
};
B = we([p.provideSingleton(B)], B);
var I;
(function (o) {
  (o.error = "application/vnd.code.notebook.error"),
    (o.stderr = "application/vnd.code.notebook.stderr"),
    (o.stdout = "application/vnd.code.notebook.stdout");
})(I || (I = {}));
const ke = ["text/plain", "text/markdown", I.stderr, I.stdout],
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
  j = new Map();
j.set("display_data", G);
j.set("error", Ie);
j.set("execute_result", G);
j.set("stream", Pe);
j.set("update_display_data", G);
function Q(o) {
  const e = j.get(o.output_type);
  let t;
  return (
    e
      ? (t = e(o))
      : (console.warn(
          `Unable to translate cell from ${o.output_type} to NotebookCellData for VS Code.`,
        ),
        (t = G(o))),
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
function G(o) {
  const e = ne(o);
  ("image/svg+xml" in o.data || "image/png" in o.data) &&
    (e.__displayOpenPlotIcon = !0);
  const t = [];
  if (o.data) for (const n in o.data) t.push(Te(n, o.data[n]));
  return new l.NotebookCellOutput(_e(t), e);
}
function _e(o) {
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
    } catch {}
  return !1;
}
function Te(o, e) {
  if (!e) return l.NotebookCellOutputItem.text("", o);
  try {
    if (
      (o.startsWith("text/") || ke.includes(o)) &&
      (Array.isArray(e) || typeof e == "string")
    ) {
      const t = Array.isArray(e) ? z(e) : e;
      return l.NotebookCellOutputItem.text(t, o);
    } else
      return o.startsWith("image/") &&
        typeof e == "string" &&
        o !== "image/svg+xml"
        ? new l.NotebookCellOutputItem(ve(e), o)
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? l.NotebookCellOutputItem.text(JSON.stringify(e), o)
          : ((e = Array.isArray(e) ? z(e) : e),
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
function ve(o) {
  return typeof Buffer < "u" && typeof Buffer.from == "function"
    ? Buffer.from(o, "base64")
    : Uint8Array.from(atob(o), (e) => e.charCodeAt(0));
}
function z(o) {
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
function Ne(o) {
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
function Oe(o) {
  return Ne(Ee(o));
}
function U(o) {
  if (o.parent_header && "msg_id" in o.parent_header)
    return o.parent_header.msg_id;
}
function Se(o) {
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
const Ce = "e976ee50-99ed-4aba-9b6b-9dcd5634d07d:IPyWidgets:";
function X(o) {
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
function Pe(o) {
  const e = z(o.text),
    t =
      o.name === "stderr"
        ? l.NotebookCellOutputItem.stderr
        : l.NotebookCellOutputItem.stdout;
  return new l.NotebookCellOutput([t(e)], ne(o));
}
function Ie(o) {
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
      { ...ne(o), originalError: o },
    )
  );
}
var H;
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
})(H || (H = {}));
const K = "application/vnd.jupyter.widget-view+json";
class Me {
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
function De(o = null) {
  return new Me(o);
}
var $ = {};
Object.defineProperty($, "__esModule", { value: !0 });
$.serialize = te = $.deserialize = void 0;
function je(o) {
  let e;
  return typeof o == "string" ? (e = JSON.parse(o)) : (e = xe(o)), e;
}
var te = ($.deserialize = je);
function Ae(o) {
  var e;
  let t;
  return (
    !((e = o.buffers) === null || e === void 0) && e.length
      ? (t = Re(o))
      : (t = JSON.stringify(o)),
    t
  );
}
$.serialize = Ae;
function xe(o) {
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
      c = n[a + 1] || o.byteLength;
    s.buffers.push(new DataView(o.slice(i, c)));
  }
  return s;
}
function Re(o) {
  const e = [],
    t = [],
    n = new TextEncoder();
  let r = [];
  o.buffers !== void 0 && ((r = o.buffers), delete o.buffers);
  const s = n.encode(JSON.stringify(o));
  t.push(s.buffer);
  for (let u = 0; u < r.length; u++) {
    const b = r[u];
    t.push(ArrayBuffer.isView(b) ? b.buffer : b);
  }
  const a = t.length;
  e.push(4 * (a + 1));
  for (let u = 0; u + 1 < t.length; u++)
    e.push(e[e.length - 1] + t[u].byteLength);
  const i = new Uint8Array(e[e.length - 1] + t[t.length - 1].byteLength),
    c = new DataView(i.buffer);
  c.setUint32(0, a);
  for (let u = 0; u < e.length; u++) c.setUint32(4 * (u + 1), e[u]);
  for (let u = 0; u < t.length; u++) i.set(new Uint8Array(t[u]), e[u]);
  return i.buffer;
}
function $e(o) {
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
const Le = require("path");
function M() {}
Le.join(__dirname, ".");
function We() {
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
  ie = {
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
function Ue(o) {
  if (o.channel !== "iopub") return;
  const e = o.header.msg_type;
  if (e in ie) {
    const t = ie[e];
    if (t === void 0) return;
    const n = Object.keys(t),
      r = o.content;
    for (let s = 0; s < n.length; s++) {
      let a = t[n[s]];
      Array.isArray(a) || (a = [a]);
      const i = n[s];
      if (!(i in r) || typeof r[i] !== a[0])
        switch (a[0]) {
          case "string":
            r[i] = "";
            break;
          case "boolean":
            r[i] = !1;
            break;
          case "object":
            r[i] = {};
            break;
          case "number":
            r[i] = 0;
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
    o.channel === "iopub" && Ue(o);
}
class Ke {
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
        value: M,
      }),
      Object.defineProperty(this, "onerror", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: M,
      }),
      Object.defineProperty(this, "onclose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: M,
      }),
      Object.defineProperty(this, "onmessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: M,
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
    const t = We(),
      n = x(),
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
      : oe.decode(t, this.connection.key, this.connection.signature_scheme);
    (n.channel = e),
      this.receiveHooks.length
        ? (this.msgChain = this.msgChain
            .then(() => {
              const r = this.serialize(n);
              return Promise.all(this.receiveHooks.map((s) => s(r)));
            })
            .then(() => this.fireOnMessage(n, e)))
        : (this.msgChain = this.msgChain.then(() => this.fireOnMessage(n, e)));
  }
  fireOnMessage(e, t) {
    if (!this.closed)
      try {
        Be(e, t), this.onmessage({ data: e, type: "message", target: this });
      } catch (n) {
        console.error(
          `Failed to handle message in Jupyter Kernel package ${JSON.stringify(e)}`,
          n,
        );
      }
  }
  sendMessage(e, t) {
    const n = oe.encode(
      e,
      this.connection.key,
      this.connection.signature_scheme,
    );
    if (!t && this.sendHooks.length) {
      const r = this.serialize(e);
      this.sendChain = this.sendChain
        .then(() => Promise.all(this.sendHooks.map((s) => s(r, M))))
        .then(async () => {
          try {
            await this.postToSocket(e.channel, n);
          } catch (s) {
            console.error(
              `Failed to write data to the kernel channel ${e.channel}`,
              n,
              s,
            );
          }
        });
    } else
      this.sendChain = this.sendChain.then(() => {
        this.postToSocket(e.channel, n);
      });
    this.sendChain.catch(M);
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
let Z;
class Ve {
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
    const s = require("@jupyterlab/services"),
      a = require("@jupyterlab/services/lib/kernel/serialize");
    let i;
    class c extends Ke {
      constructor() {
        super(e.connection, a.serialize), (i = this);
      }
    }
    const u = s.ServerConnection.makeSettings({ WebSocket: c, wsUrl: "RAW" });
    Z || (Z = require("@jupyterlab/services/lib/kernel/nonSerializingKernel"));
    const b = new Z.KernelConnection({
      serverSettings: u,
      clientId: t,
      handleComms: !1,
      username: n,
      model: r,
    });
    return (
      i &&
        (i.emit("open"),
        i.addReceiveHook(this.onKernelSocketMessage.bind(this)),
        i.addSendHook(this.mirrorSend.bind(this))),
      { realKernel: b, socket: i, kernelProcess: e }
    );
  }
  async mirrorSend(e, t) {
    if (
      typeof e == "string" &&
      e.includes("shell") &&
      e.includes("execute_request")
    ) {
      const n = te(e);
      if (n.channel === "shell" && n.header.msg_type === "execute_request") {
        if (!X(n)) return;
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
    var s, a, i, c, u, b, m, d, h;
    const t = x(),
      n = De();
    if (
      (this.waitingMessageIds.set(t, {
        startTime: Date.now(),
        resultPromise: n,
      }),
      typeof e == "string"
        ? X(e) && this.raisePostMessage("IPyWidgets_msg", { id: t, data: e })
        : this.raisePostMessage("IPyWidgets_binary_msg", {
            id: t,
            data: $e([e]),
          }),
      typeof e != "string" ||
        e.includes(K) ||
        e.includes(H.DefaultCommTarget) ||
        e.includes("comm_open") ||
        e.includes("comm_close") ||
        e.includes("comm_msg"))
    ) {
      const g = te(e);
      if (!X(g)) return;
      const w =
          ((s = g.header) == null ? void 0 : s.msg_type) === "comm_open" &&
          ((c =
            (i = (a = g.content) == null ? void 0 : a.data) == null
              ? void 0
              : i.state) == null
            ? void 0
            : c._model_module) === "@jupyter-widgets/output" &&
          ((m =
            (b = (u = g.content) == null ? void 0 : u.data) == null
              ? void 0
              : b.state) == null
            ? void 0
            : m._model_name) === "OutputModel",
        T =
          ((d = g.header) == null ? void 0 : d.msg_type) === "comm_close" &&
          this.outputWidgetIds.has(
            (h = g.content) == null ? void 0 : h.comm_id,
          );
      w
        ? this.outputWidgetIds.add(g.content.comm_id)
        : T && this.outputWidgetIds.delete(g.content.comm_id);
    }
  }
  onKernelSocketResponse(e) {
    const t = this.waitingMessageIds.get(e.id);
    t && (this.waitingMessageIds.delete(e.id), t.resultPromise.resolve());
  }
}
const ze = require("path");
class D {
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
        ze.dirname(e),
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
        n = JSON.parse(me.readFileSync(t, { encoding: "utf-8" })),
        r = await this.python.lock((i) => i`notebook_kernel.get_session_id()`),
        s = { connection: n, pid: r },
        a = new Ve(s, x(), x(), { name: n.kernel_name, id: x() });
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
        l.window.showErrorMessage(n);
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
    return new Promise(async (n, r) => {
      try {
        this.dbtTerminal.log(`storeDataInKernel: ${e}`),
          await this.python.lock(
            (s) =>
              s`notebook_kernel.store_sql_result(${e}, ${JSON.stringify(t)})`,
          ),
          n(!0);
      } catch (s) {
        this.dbtTerminal.error(
          p.TelemetryEvents["Notebook/StoreDataInKernelError"],
          s.exception.message,
          s,
        ),
          r(s);
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
    return new Promise(async (r, s) => {
      var b, m;
      if (
        !(
          (m = (b = this.kernel) == null ? void 0 : b.rawKernel) != null &&
          m.realKernel
        )
      ) {
        s(new Error("Kernel not found"));
        return;
      }
      const a = t.metadata.cellId;
      this.dbtTerminal.log(`Executing python code in cell: ${a}`, e);
      const i = require("@jupyterlab/services");
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
        s(new Error("Unknown request error"));
        return;
      }
      c.onReply = (d) => {
        if (t.document.isClosed) {
          c.dispose();
          return;
        }
        const h = d.content;
        h.payload &&
          h.payload.forEach((g) => {
            if (g.data && g.data.hasOwnProperty("text/plain")) {
              const w = this.addToCellData(
                {
                  output_type: "stream",
                  text: g.data["text/plain"].toString(),
                  name: "stdout",
                  metadata: {},
                  execution_count: h.execution_count,
                },
                d,
                t,
              );
              w && n(w);
            }
          });
      };
      const u = [];
      return (
        c.done.finally(() => {
          c.dispose(), r(u.filter((d) => !!d));
        }),
        (c.onStdin = (d) => {
          this.dbtTerminal.log("onStdin", d);
        }),
        (c.onIOPub = (d) => {
          if (i.KernelMessage.isCommOpenMsg(d)) this.handleCommOpen(d);
          else if (i.KernelMessage.isExecuteResultMsg(d))
            u.push(this.handleExecuteResult(d, t));
          else if (i.KernelMessage.isExecuteInputMsg(d))
            this.handleExecuteInput(d);
          else if (i.KernelMessage.isStatusMsg(d)) {
            const h = d;
            this.handleStatusMessage(h);
          } else if (i.KernelMessage.isStreamMsg(d)) {
            const h = this.handleStreamMessage(d, t);
            h == null ||
              h.forEach((g) => {
                u.push(g);
              });
          } else
            i.KernelMessage.isDisplayDataMsg(d)
              ? u.push(this.handleDisplayData(d, t))
              : i.KernelMessage.isUpdateDisplayDataMsg(d)
                ? this.handleUpdateDisplayDataMessage(d)
                : i.KernelMessage.isClearOutputMsg(d)
                  ? this.handleClearOutput(d)
                  : i.KernelMessage.isErrorMsg(d)
                    ? u.push(this.handleError(d, t))
                    : i.KernelMessage.isCommOpenMsg(d) ||
                      (i.KernelMessage.isCommMsgMsg(d)
                        ? this.handleCommMsg(d)
                        : i.KernelMessage.isCommCloseMsg(d) ||
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
    e.content.target_name === H.DefaultCommTarget &&
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
          const s = r.substring(n.length);
          this.ownedCommIds.add(s),
            this.commIdsMappedToParentWidgetModel.set(s, e.content.comm_id);
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
    if (e.data && typeof e.data == "object" && K in e.data) {
      const a = e.data[K];
      if (a && "model_id" in a) {
        const i = D.modelIdsOwnedByCells.get(n) || new Set();
        i.add(a.model_id), D.modelIdsOwnedByCells.set(n, i);
      }
    }
    const r = Q(e);
    if (n.document.isClosed) return;
    this.dbtTerminal.log(
      n.document.uri.fsPath,
      `Update output with mimes ${r.items.map((a) => a.mime).toString()}`,
    );
    const s = U(t);
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
    if (t === K) {
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
      U(e) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === U(e)
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
        Q({
          output_type: "stream",
          name: e.content.name,
          text: e.content.text,
        }),
        this.lastUsedStreamOutput.output,
      ];
    {
      const s = Oe(z(e.content.text));
      return [Q({ output_type: "stream", name: e.content.name, text: s })];
    }
  }
  handleDisplayData(e, t) {
    const n = {
      output_type: "display_data",
      data: Se(e.content.data),
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
      ].msgIdsToSwallow === U(e)
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
Object.defineProperty(D, "modelIdsOwnedByCells", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new WeakMap(),
});
var He = function (o, e, t, n) {
    var r = arguments.length,
      s =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      s = Reflect.decorate(o, e, t, n);
    else
      for (var i = o.length - 1; i >= 0; i--)
        (a = o[i]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
    return r > 3 && s && Object.defineProperty(e, t, s), s;
  },
  Ge = function (o, e) {
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
      (await l.window.showInformationMessage(
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
      await l.window.withProgress(
        {
          title: "Installing python packages...",
          location: l.ProgressLocation.Notification,
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
              l.window.showErrorMessage(
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
      (await l.window.showInformationMessage(
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
          const i = this.checkDbtDependencies(
            e.map((c) => `${c.name}`),
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
            l.window.showErrorMessage(p.extendErrorWithSupportLinks(a.message));
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
        const [i, c] = a.split(":").map((u) => u.trim());
        i && c && (s[i] = c);
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
        (await l.window.showInformationMessage(
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
              l.window.showErrorMessage(
                p.extendErrorWithSupportLinks(n.message),
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
exports.NotebookDependencies = He(
  [
    p.provideSingleton(exports.NotebookDependencies),
    Ge("design:paramtypes", [
      p.DBTTerminal,
      p.TelemetryService,
      p.CommandProcessExecutionFactory,
      p.PythonEnvironment,
    ]),
  ],
  exports.NotebookDependencies,
);
var Ye = function (o, e, t, n) {
    var r = arguments.length,
      s =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      s = Reflect.decorate(o, e, t, n);
    else
      for (var i = o.length - 1; i >= 0; i--)
        (a = o[i]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
    return r > 3 && s && Object.defineProperty(e, t, s), s;
  },
  Je = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
let V = class {
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
      const t = new D(
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
V = Ye(
  [
    p.provideSingleton(V),
    Je("design:paramtypes", [
      p.DBTCommandExecutionInfrastructure,
      exports.NotebookDependencies,
      p.DBTTerminal,
    ]),
  ],
  V,
);
const Qe = ["python", "sql", "jinja-sql"],
  Xe = "jinja-sql",
  ce = ".notebook",
  ue = "datapilot",
  R = "datapilot-notebook";
var Ze = function (o, e, t, n) {
    var r = arguments.length,
      s =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      s = Reflect.decorate(o, e, t, n);
    else
      for (var i = o.length - 1; i >= 0; i--)
        (a = o[i]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
    return r > 3 && s && Object.defineProperty(e, t, s), s;
  },
  et = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
const tt = require("path");
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
        R,
        this.label,
      )),
      (this.controller.supportedLanguages = Qe),
      (this.controller.supportsExecutionOrder = !0),
      (this.controller.executeHandler = this._executeAll.bind(this)),
      this.disposables.push(
        l.workspace.onDidChangeNotebookDocument((i) => {
          i.contentChanges.forEach(async (c) => {
            c.addedCells &&
              (await this.updateCellId(i.notebook.getCells(), i.notebook)),
              c.removedCells &&
                c.removedCells.forEach((u) => {
                  this._onNotebookCellEvent.fire({
                    cellId: u.metadata.cellId,
                    notebook: i.notebook.uri.fsPath,
                    result: null,
                    event: "delete",
                    fragment: u.document.uri.fragment,
                    languageId: u.document.languageId,
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
        l.workspace.onDidOpenNotebookDocument(async (i) => {
          await this.onNotebookOpen(i);
        }),
      ),
      this.disposables.push(
        l.workspace.onDidCloseNotebookDocument(async (i) => {
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
                languageId: Xe,
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
    const n = ye();
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
        (a = l.window.activeTextEditor) != null &&
        a.document.uri.fsPath.endsWith(".sql"))
    ) {
      const i = tt.basename(
          l.window.activeTextEditor.document.uri.fsPath,
          ".sql",
        ),
        c = l.window.activeTextEditor.document.getText();
      (r.model = i), (r.query = c);
    }
    l.window.withProgress(
      {
        location: l.ProgressLocation.Notification,
        title: "Launching notebook...",
        cancellable: !1,
      },
      async () => {
        var i;
        try {
          const c = s || (t ? null : await this.getNotebookByTemplate(n)),
            u = await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!u) {
            l.window.showErrorMessage("No dbt project selected.");
            return;
          }
          if (
            ((i = c == null ? void 0 : c.metadata) != null &&
              i.dependencies &&
              (await this.notebookDependencies.verifyAndInstallDependenciesIfNeeded(
                c.metadata.dependencies,
                u,
              )),
            r && c)
          )
            for (const h in r)
              r.hasOwnProperty(h) &&
                typeof r[h] == "string" &&
                (c.cells[0].source = c.cells[0].source.map((g) =>
                  g.replace(`%_${h}_%`, r[h]),
                ));
          const b = await this.getFileName(t, c),
            m = l.Uri.parse(`${u.projectRoot}/${b}${ce}`).with({ scheme: ue });
          this.dbtTerminal.debug("Notebook", "opening notebook", m);
          const d = await l.workspace.openNotebookDocument(m);
          await l.window.showNotebookDocument(d);
        } catch (c) {
          const u =
            c instanceof le.PythonException ? c.exception.message : c.message;
          this.dbtTerminal.error(
            `${p.TelemetryEvents["Notebook/LaunchError"]}`,
            u,
            c,
          ),
            l.window.showErrorMessage(p.extendErrorWithSupportLinks(u));
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
            c = l.NotebookEdit.updateCellMetadata(s.index, i);
          r.push(c);
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
      const s = new l.WorkspaceEdit();
      s.set(t.uri, r), await l.workspace.applyEdit(s);
    }
  }
  async onNotebookClose(e) {
    if (e.notebookType !== R) return;
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
    const n = e.uri.toString();
    t ? this.associatedNotebooks.add(n) : this.associatedNotebooks.delete(n);
  }
  async onNotebookOpen(e) {
    var s;
    if (e.notebookType !== R) return;
    this.controller.updateNotebookAffinity(
      e,
      l.NotebookControllerAffinity.Default,
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
      l.window.showErrorMessage("No dbt project selected.");
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
    for (const c of e)
      await this._doExecution(
        c,
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
          ? [l.NotebookCellOutputItem.text("IPyWidgets not supported")]
          : []
        : n.items;
      return new l.NotebookCellOutput(s);
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
      const c = [];
      switch (
        ((i = r.createNotebookCellExecution(e)),
        (i.executionOrder = ++this.executionOrder),
        i.start(Date.now()),
        i.token.onCancellationRequested((u) => {
          i == null || i.end(!0, Date.now());
        }),
        i.clearOutput(),
        e.document.languageId)
      ) {
        case "markdown":
          break;
        case "python":
          this.telemetry.startTelemetryEvent(
            p.TelemetryEvents["Notebook/Execute"],
            { language: e.document.languageId },
          );
          const u = await (a == null
            ? void 0
            : a.executePython(e.document.getText(), e, (m) => {
                i == null || i.appendOutput(this.filterIPyWidgets([m], n));
              }));
          u && i.appendOutput(this.filterIPyWidgets(u, n));
          break;
        case "jinja-sql":
        case "sql":
          this.dbtTerminal.debug(
            "Notebook",
            "executing sql",
            e.document.getText(),
          ),
            this.telemetry.startTelemetryEvent(
              p.TelemetryEvents["Notebook/Execute"],
              { language: e.document.languageId },
            );
          const { metadata: b } = e;
          if ((b == null ? void 0 : b.execution_type) === "compile") {
            const m = await s.unsafeCompileQuery(e.document.getText());
            i.appendOutput(
              new l.NotebookCellOutput([
                l.NotebookCellOutputItem.text(
                  m,
                  b == null ? void 0 : b.output_mime_type,
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
                (c.push(
                  l.NotebookCellOutputItem.json(
                    m,
                    "application/perspective-json",
                  ),
                ),
                i.appendOutput(new l.NotebookCellOutput(c))),
              await a.storeDataInKernel(e.metadata.cellId, m);
          }
          break;
        default:
          l.window.showErrorMessage(
            `Language: ${e.document.languageId} not supported`,
          );
          break;
      }
      this.telemetry.endTelemetryEvent(p.TelemetryEvents["Notebook/Execute"], {
        language: e.document.languageId,
      }),
        i.end(!0, Date.now());
    } catch (c) {
      this.dbtTerminal.error(
        "Notebook",
        `Error executing cell: ${c.message}`,
        c,
        !1,
      ),
        i == null ||
          i.replaceOutput([
            new l.NotebookCellOutput([l.NotebookCellOutputItem.error(c)]),
          ]),
        this.telemetry.endTelemetryEvent(
          p.TelemetryEvents["Notebook/Execute"],
          c,
          { language: e.document.languageId },
        ),
        i == null || i.end(!1, Date.now());
    }
  }
};
exports.DatapilotNotebookController = Ze(
  [
    p.provideSingleton(exports.DatapilotNotebookController),
    et("design:paramtypes", [
      V,
      p.QueryManifestService,
      p.TelemetryService,
      p.DBTTerminal,
      exports.NotebookDependencies,
      p.AltimateRequest,
    ]),
  ],
  exports.DatapilotNotebookController,
);
class nt {
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
var ot = function (o, e, t, n) {
    var r = arguments.length,
      s =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      s = Reflect.decorate(o, e, t, n);
    else
      for (var i = o.length - 1; i >= 0; i--)
        (a = o[i]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
    return r > 3 && s && Object.defineProperty(e, t, s), s;
  },
  rt = function (o, e) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(o, e);
  };
const ae = require("path");
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
    const n = e.with({ path: ae.posix.dirname(e.path) });
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
    return ae.basename(e.fsPath, ce);
  }
  async customSave(e, t) {
    var n;
    try {
      console.log("custom save", e, new TextDecoder().decode(t));
      const r =
        (n = l.window.activeNotebookEditor) == null ? void 0 : n.notebook;
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
        this._emitter.fire([{ type: l.FileChangeType.Changed, uri: e }]),
        !0
      );
    } catch (r) {
      this.dbtTerminal.error(
        p.TelemetryEvents["Notebook/SaveError"],
        r.message,
        r,
      ),
        l.window.showErrorMessage(
          p.extendErrorWithSupportLinks(
            `Failed to save notebook. Error: ${r.message}`,
          ),
        );
    }
    return !1;
  }
  async saveNotebook(e, t) {
    try {
      const n = ee(e, t);
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
      return s && ((s.data = ee(e, t, !0)), this.notebookDataMap.set(r, s)), n;
    } catch (n) {
      this.dbtTerminal.error(
        p.TelemetryEvents["Notebook/SaveError"],
        n.message,
        n,
      ),
        l.window.showErrorMessage(
          p.extendErrorWithSupportLinks(
            `Failed to save notebook. Error: ${n.message}`,
          ),
        );
    }
  }
};
exports.NotebookFileSystemProvider = ot(
  [
    p.provideSingleton(exports.NotebookFileSystemProvider),
    rt("design:paramtypes", [p.DBTTerminal, p.AltimateRequest]),
  ],
  exports.NotebookFileSystemProvider,
);
var st = function (o, e, t, n) {
    var r = arguments.length,
      s =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      s = Reflect.decorate(o, e, t, n);
    else
      for (var i = o.length - 1; i >= 0; i--)
        (a = o[i]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
    return r > 3 && s && Object.defineProperty(e, t, s), s;
  },
  it = function (o, e) {
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
exports.NotebookService = st(
  [
    p.provideSingleton(exports.NotebookService),
    it("design:paramtypes", [exports.DatapilotNotebookController]),
  ],
  exports.NotebookService,
);
const at = {
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
var lt = function (o, e, t, n) {
    var r = arguments.length,
      s =
        r < 3
          ? e
          : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, t))
            : n,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      s = Reflect.decorate(o, e, t, n);
    else
      for (var i = o.length - 1; i >= 0; i--)
        (a = o[i]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
    return r > 3 && s && Object.defineProperty(e, t, s), s;
  },
  ct = function (o, e) {
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
        l.workspace.onDidChangeConfiguration((s) => {
          s.affectsConfiguration("dbt.enableNotebooks") &&
            this.bindNotebookActions();
        }),
      ),
      this.bindNotebookActions();
  }
  bindNotebookActions() {
    l.workspace.getConfiguration("dbt").get("enableNotebooks", !1) &&
      (this.dbtTerminal.log("Notebooks enabled, binding actions"),
      this.disposables.push(
        l.notebooks.registerNotebookCellStatusBarItemProvider(R, new nt()),
        l.workspace.registerNotebookSerializer(R, this.notebookProvider, {}),
        this.notebookController,
      ),
      this.disposables.push(
        l.workspace.registerFileSystemProvider(
          ue,
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
exports.NotebookProviders = lt(
  [
    p.provideSingleton(exports.NotebookProviders),
    ct("design:paramtypes", [
      B,
      exports.DatapilotNotebookController,
      exports.NotebookFileSystemProvider,
      p.DBTTerminal,
    ]),
  ],
  exports.NotebookProviders,
);
const W = (o) => (o === "bigquery" ? "RAND" : "RANDOM"),
  L = async (o, e) => {
    const t = await e(o);
    return (t == null ? void 0 : t.table.rows) || [];
  },
  S = (o, e) => (o === "bigquery" ? `\`${e}\`` : `"${e}"`),
  q = (o, e, t) =>
    o.filter((n) => !e.includes(n.column) && !t.includes(n.dtype)),
  ut = (o) => ["timestamp", "date"].includes(o.dtype.toLowerCase()),
  dt = (o) =>
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
  mt = (o) => {
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
  A = (o) => Number(o),
  F = (o = {}, e) => {
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
        i = new Map(s.map((m) => [m.name, m])),
        c = new Map(a.map((m) => [m.name, m])),
        b = [
          ...new Set([...s.map((m) => m.name), ...a.map((m) => m.name)]),
        ].map((m) => {
          var O, P, y, E;
          const d = i.get(m),
            h = c.get(m),
            g = [
              ...((d == null ? void 0 : d.tests) || []),
              ...((h == null ? void 0 : h.tests) || []),
            ],
            w = new Map(
              ((O = d == null ? void 0 : d.columns) == null
                ? void 0
                : O.map((f) => [f.name, f])) || [],
            ),
            T = new Map(
              ((P = h == null ? void 0 : h.columns) == null
                ? void 0
                : P.map((f) => [f.name, f])) || [],
            ),
            _ = [
              ...new Set([
                ...(((y = d == null ? void 0 : d.columns) == null
                  ? void 0
                  : y.map((f) => f.name)) || []),
                ...(((E = h == null ? void 0 : h.columns) == null
                  ? void 0
                  : E.map((f) => f.name)) || []),
              ]),
            ].map((f) => {
              const k = w.get(f),
                C = T.get(f);
              return k
                ? C
                  ? {
                      ...k,
                      ...C,
                      name: f,
                      tests: [...(k.tests || []), ...(C.tests || [])],
                    }
                  : k
                : C;
            }),
            N = { name: m, columns: _ };
          return g.length > 0 && (N.tests = g), N;
        });
      t[r] = b;
    }
    return t;
  };
class pt {
  async generateRangeTests({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    stddevs: r,
    limit: s,
    sample: a,
    columnConfig: i,
    resourceType: c,
    dbtConfig: u,
    columnsInRelation: b,
    adapter: m,
    queryFn: d,
  }) {
    const g = q(b, n, t).filter((y) => mt(y));
    if (g.length === 0) return u;
    let w = "";
    s !== null &&
      (a ? (w = `ORDER BY ${W(m)}() LIMIT ${s}`) : (w = `LIMIT ${s}`));
    const T = g.map(
        (y, E) =>
          `SELECT '${y.column}' AS COLNAME, MIN(${S(m, y.column)}) as COL_MIN, MAX(${S(m, y.column)}) as COL_MAX, STDDEV(${S(m, y.column)}) as COL_STDDEV, ${E + 1} AS ORDERING FROM base`,
      ),
      v = `
            WITH base AS (
                SELECT * FROM {{ref('${e}')}}
                ${w}
            )
            SELECT * FROM (
                ${T.join(`
UNION ALL
`)}
            ) t1
            ORDER BY ORDERING ASC
        `,
      N = (await L(v, d)).map((y) => {
        const E = A(y[1]),
          f = A(y[2]),
          k = A(y[3]);
        return {
          ...{
            name: y[0],
            tests: [
              {
                "dbt_utils.accepted_range": {
                  min_value: A(E - (r * k) / 2),
                  max_value: A(f + (r * k) / 2),
                },
              },
            ],
          },
          ...i,
        };
      }),
      O = { name: e, columns: N },
      P = { [c]: [O] };
    return F(u, P);
  }
}
class ht {
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
    return t === null ? "" : n ? `ORDER BY ${W(e)}() LIMIT ${t}` : `LIMIT ${t}`;
  }
  buildCountDistinctQuery(e, t, n, r) {
    const s = t.map((a, i) => {
      const c = a.map((u) => S(e, u));
      return `
                SELECT ${i + 1} AS ORDERING, count(1) AS CARDINALITY
                from (
                    SELECT 1 FROM base
                    GROUP BY ${c.join(", ")}
                ) t
            `;
    });
    return `
            WITH base AS (
                SELECT * FROM {{ref('${n}')}}
                ${r}
            )
            ${s.join(`
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
    resourceType: c,
    dbtConfig: u,
    columnsInRelation: b,
    adapter: m,
    queryFn: d,
  }) {
    const g = q(b, n, t).map((f) => f.column);
    if (g.length === 0) return u;
    const w = this.getColumnCombinations(g, r),
      T = this.buildLimitStatement(m, s, a),
      v = this.buildCountDistinctQuery(m, w, e, T),
      N = (
        await L(
          `
              WITH base AS (
                  SELECT * FROM {{ref('${e}')}}
                  ${T}
              )
              SELECT count(1) AS TABLE_COUNT FROM base
          `,
          d,
        )
      )[0][0],
      O = await L(v, d),
      P = w.filter((f, k) => O[k][1] === N),
      y = { name: e, columns: [], tests: [] };
    P.forEach((f) => {
      f.length === 1
        ? y.columns.push({ name: f[0], tests: ["unique", "not_null"], ...i })
        : y.tests.push({
            "dbt_utils.unique_combination_of_columns": {
              combination_of_columns: f,
            },
          });
    });
    const E = { [c]: [y] };
    return F(u, E);
  }
}
const ft = (o, e) => {
  switch (o) {
    case "bigquery":
      return `array_agg(CAST(${S(o, e)} AS STRING))`;
    case "redshift":
      return `split_to_array(listagg(${S(o, e)}::VARCHAR, '|'), '|') `;
    case "databricks":
      return `to_json(array_agg(CAST(${S(o, e)} AS STRING)))`;
    default:
      return `array_agg(${S(o, e)}::VARCHAR)`;
  }
};
class bt {
  async getAcceptedValuesTestSuggestions({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    limit: r,
    sample: s,
    columnConfig: a,
    resourceType: i,
    dbtConfig: c,
    columnsInRelation: u,
    adapter: b,
    maxCardinality: m = 5,
    queryFn: d,
  }) {
    const h = q(u, n, t);
    if (h.length === 0) return c;
    const g = h.map(
        (f, k) => `
            select ${k + 1} AS ORDERING,
                '${f.column}' AS COLNAME,
                count(1) as CARDINALITY,
                ${ft(b, f.column)} AS UNIQUE_VALUES
            from (
                select ${S(b, f.column)}
                from base
                group by ${S(b, f.column)}
            ) t1
        `,
      ),
      w = r ? (s ? `ORDER BY ${W(b)}() LIMIT ${r}` : `LIMIT ${r}`) : "",
      T = `
            WITH base AS (
                SELECT * FROM {{ref('${e}')}}
                ${w}
            )
            SELECT * FROM (
                ${g.join(`
UNION ALL
`)}
            ) t2
            WHERE CARDINALITY <= ${m}
            ORDER BY ORDERING ASC
        `,
      v = await d(T);
    if (!v) return c;
    const {
        table: { column_names: _, rows: N },
      } = v,
      O = _.indexOf("COLNAME"),
      P = _.indexOf("UNIQUE_VALUES"),
      y = N.map((f) => {
        const k = f[P],
          C = typeof k == "string" ? JSON.parse(k) : k;
        return {
          name: f[O],
          tests: [{ accepted_values: { values: C.sort() } }],
          ...a,
        };
      }),
      E = { [i]: [{ name: e, columns: y }] };
    return F(c, E);
  }
}
class gt {
  async generateStringLengthTests({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    stddevs: r,
    limit: s,
    sample: a,
    columnConfig: i,
    resourceType: c,
    dbtConfig: u,
    columnsInRelation: b,
    adapter: m,
    queryFn: d,
  }) {
    const g = q(b, n, t).filter((y) => dt(y));
    if (g.length === 0) return u;
    const w = s ? (a ? `ORDER BY ${W(m)}() LIMIT ${s}` : `LIMIT ${s}`) : "",
      T = g.map(
        (y, E) => `
            SELECT '${y.column}' AS COLNAME,
                MIN(LENGTH(CAST(${S(m, y.column)} as varchar))) as COL_MIN,
                MAX(LENGTH(CAST(${S(m, y.column)} as varchar))) as COL_MAX,
                STDDEV(LENGTH(CAST(${S(m, y.column)} as varchar))) as COL_STDDEV,
                ${E + 1} AS ORDERING
            FROM base
            WHERE ${S(m, y.column)} IS NOT NULL
        `,
      ),
      v = `
            WITH base AS (
                SELECT * FROM {{ref('${e}')}}
                ${w}
            )
            SELECT * FROM (
                ${T.join(`
UNION ALL
`)}
            ) t1
            ORDER BY ORDERING ASC
        `,
      N = (await L(v, d)).map((y) => {
        const [E, f, k, C] = y;
        let Y;
        if (f === k)
          Y = {
            "dbt_expectations.expect_column_value_lengths_to_equal": {
              value: f,
              row_condition: `${S(m, E)} is not null`,
            },
          };
        else {
          let J = f - r * C;
          const de = k + r * C;
          J < 0 && (J = 0),
            (Y = {
              "dbt_expectations.expect_column_value_lengths_to_be_between": {
                min_value: Math.floor(J),
                max_value: Math.ceil(de),
                row_condition: `${S(m, E)} is not null`,
              },
            });
        }
        return { name: E, tests: [Y], ...i };
      }),
      O = { name: e, columns: N },
      P = { [c]: [O] };
    return F(u, P);
  }
}
class yt {
  async generateRecencyTests({
    tableRelation: e,
    excludeTypes: t,
    excludeCols: n,
    stddevs: r,
    limit: s,
    sample: a,
    resourceType: i,
    dbtConfig: c,
    columnsInRelation: u,
    adapter: b,
    queryFn: m,
  }) {
    const h = q(u, n, t).filter(ut);
    if (h.length === 0) return c;
    const g = s ? (a ? `ORDER BY ${W(b)}() LIMIT ${s}` : `LIMIT ${s}`) : "",
      w = `
    WITH base AS (
      SELECT * FROM {{ref('${e}')}}
      ${g}
    )
    ${h.map(
      (O, P) => `
      SELECT 
        MAX(minutes_diff) AS max_minutes_diff,
        AVG(minutes_diff) AS avg_minutes_diff,
        STDDEV(minutes_diff) AS stddev_minutes_diff,
        ${P + 1} AS ordering
      FROM (
        SELECT 
          DATEDIFF('minute', LAG(${O.column}, 1) OVER(ORDER BY ${O.column}), ${O.column}) AS minutes_diff
        FROM base
      ) t2
      WHERE minutes_diff <> 0
    `,
    ).join(`
UNION ALL
`)}
    ORDER BY ordering ASC
  `,
      T = await L(w, m),
      v = h.map((O, P) => {
        const [, y, E] = T[P],
          f = y + E * r;
        let k, C;
        return (
          f >= 60 * 24
            ? ((k = "day"), (C = Math.floor(f / (60 * 24))))
            : f >= 60
              ? ((k = "hour"), (C = Math.floor(f / 60)))
              : ((k = "minute"), (C = Math.floor(f))),
          { "dbt_utils.recency": { field: O.column, datepart: k, interval: C } }
        );
      }),
      _ = { name: e, ...(v.length > 0 && { tests: v }) },
      N = { [i]: [_] };
    return F(c, N);
  }
}
const wt = async ({
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
  uniquenessCompositeKeyLength: c = 1,
  acceptedValuesMaxCardinality: u = 5,
  rangeStddevs: b = 0,
  stringLengthStddevs: m = 0,
  recencyStddevs: d = 1,
  dbtConfig: h,
  returnObject: g = !1,
  columnsInRelation: w,
  adapter: T,
  queryFn: v,
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
    uniquenessCompositeKeyLength: c,
    acceptedValuesMaxCardinality: u,
    rangeStddevs: b,
    stringLengthStddevs: m,
    recencyStddevs: d,
    dbtConfig: h,
    returnObject: g,
    columnsInRelation: w,
  });
  let _ = h;
  return (
    i.includes("uniqueness") &&
      (_ = await new ht().generateUniquenessTests({
        adapter: T,
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: _,
        columnsInRelation: w,
        queryFn: v,
        compositeKeyLength: c,
      })),
    i.includes("accepted_values") &&
      (_ = await new bt().getAcceptedValuesTestSuggestions({
        adapter: T,
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: _,
        columnsInRelation: w,
        queryFn: v,
        maxCardinality: u,
      })),
    i.includes("range") &&
      (_ = await new pt().generateRangeTests({
        adapter: T,
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: _,
        columnsInRelation: w,
        queryFn: v,
        stddevs: b,
      })),
    i.includes("string_length") &&
      (_ = await new gt().generateStringLengthTests({
        adapter: T,
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        columnConfig: r,
        resourceType: n,
        dbtConfig: _,
        columnsInRelation: w,
        queryFn: v,
        stddevs: m,
      })),
    i.includes("recency") &&
      (_ = await new yt().generateRecencyTests({
        adapter: T,
        tableRelation: o,
        excludeTypes: s,
        excludeCols: a,
        limit: t,
        sample: e,
        resourceType: n,
        dbtConfig: _,
        columnsInRelation: w,
        queryFn: v,
        stddevs: d,
      })),
    _
  );
};
exports.CustomNotebooks = at;
exports.NotebookKernelClient = D;
exports.getTestSuggestions = wt;
