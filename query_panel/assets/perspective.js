var Ae = Object.create;
var X = Object.defineProperty;
var Be = Object.getOwnPropertyDescriptor;
var He = Object.getOwnPropertyNames;
var Xe = Object.getPrototypeOf,
  et = Object.prototype.hasOwnProperty;
var tt = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports),
  rt = (r, e) => {
    for (var t in e) X(r, t, { get: e[t], enumerable: !0 });
  },
  nt = (r, e, t, n) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let i of He(e))
        !et.call(r, i) &&
          i !== t &&
          X(r, i, {
            get: () => e[i],
            enumerable: !(n = Be(e, i)) || n.enumerable,
          });
    return r;
  };
var it = (r, e, t) => (
  (t = r != null ? Ae(Xe(r)) : {}),
  nt(
    e || !r || !r.__esModule
      ? X(t, "default", { value: r, enumerable: !0 })
      : t,
    r,
  )
);
var ze = tt((ir, Se) => {
  "use strict";
  Se.exports = function () {
    throw new Error(
      "ws does not work in the browser. Browser clients must use the native WebSocket object",
    );
  };
});
var te = {};
rt(te, {
  COLUMN_SEPARATOR_STRING: () => dt,
  CONFIG_ALIASES: () => at,
  CONFIG_VALID_KEYS: () => st,
  DATA_TYPES: () => ot,
  FILTER_OPERATORS: () => l,
  SORT_ORDERS: () => ut,
  SORT_ORDER_IDS: () => ft,
  TYPE_AGGREGATES: () => ct,
  TYPE_FILTERS: () => yt,
});
var ot = {
    integer: "integer",
    float: "float",
    string: "string",
    boolean: "boolean",
    date: "date",
    datetime: "datetime",
    object: "object",
  },
  at = {
    row_pivot: "group_by",
    "row-pivot": "group_by",
    "row-pivots": "group_by",
    col_pivot: "split_by",
    col_pivots: "split_by",
    column_pivot: "split_by",
    "column-pivot": "split_by",
    "column-pivots": "split_by",
    filters: "filter",
    sorts: "sort",
  },
  st = [
    "viewport",
    "group_by",
    "split_by",
    "aggregates",
    "columns",
    "filter",
    "sort",
    "computed_columns",
    "expressions",
    "group_by_depth",
    "split_by_depth",
    "filter_op",
  ],
  Oe = [
    "any",
    "avg",
    "abs sum",
    "count",
    "distinct count",
    "dominant",
    "first by index",
    "last by index",
    "last minus first",
    "last",
    "high",
    "join",
    "low",
    "high minus low",
    "max",
    "mean",
    "median",
    "min",
    "pct sum parent",
    "pct sum grand total",
    "stddev",
    "sum",
    "sum abs",
    "sum not null",
    "unique",
    "var",
  ],
  ee = [
    "any",
    "count",
    "distinct count",
    "distinct leaf",
    "dominant",
    "first by index",
    "join",
    "last by index",
    "last",
    "unique",
  ],
  lt = [
    "any",
    "count",
    "distinct count",
    "distinct leaf",
    "dominant",
    "first by index",
    "last by index",
    "last",
    "unique",
  ],
  ut = [
    "none",
    "asc",
    "desc",
    "col asc",
    "col desc",
    "asc abs",
    "desc abs",
    "col asc abs",
    "col desc abs",
  ],
  ft = [2, 0, 1, 0, 1, 3, 4, 3, 4],
  ct = {
    string: ee,
    float: Oe,
    integer: Oe,
    boolean: lt,
    datetime: ee,
    date: ee,
  },
  l = {
    lessThan: "<",
    greaterThan: ">",
    equals: "==",
    lessThanOrEquals: "<=",
    greaterThanOrEquals: ">=",
    doesNotEqual: "!=",
    isNull: "is null",
    isNotNull: "is not null",
    isIn: "in",
    isNotIn: "not in",
    contains: "contains",
    bitwiseAnd: "&",
    bitwiseOr: "|",
    and: "and",
    or: "or",
    beginsWith: "begins with",
    endsWith: "ends with",
  },
  ht = [
    l.bitwiseAnd,
    l.bitwiseOr,
    l.equals,
    l.doesNotEqual,
    l.or,
    l.and,
    l.isNull,
    l.isNotNull,
  ],
  Ce = [
    l.lessThan,
    l.greaterThan,
    l.equals,
    l.lessThanOrEquals,
    l.greaterThanOrEquals,
    l.doesNotEqual,
    l.isNull,
    l.isNotNull,
  ],
  pt = [
    l.equals,
    l.contains,
    l.doesNotEqual,
    l.isIn,
    l.isNotIn,
    l.beginsWith,
    l.endsWith,
    l.isNull,
    l.isNotNull,
  ],
  Re = [
    l.lessThan,
    l.greaterThan,
    l.equals,
    l.lessThanOrEquals,
    l.greaterThanOrEquals,
    l.doesNotEqual,
    l.isNull,
    l.isNotNull,
  ],
  dt = "|",
  yt = {
    string: pt,
    float: Ce,
    integer: Ce,
    boolean: ht,
    datetime: Re,
    date: Re,
  };
var re = {
  types: {
    float: {
      filter_operator: "==",
      aggregate: "sum",
      format: {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
    string: { filter_operator: "==", aggregate: "count" },
    integer: { filter_operator: "==", aggregate: "sum", format: {} },
    boolean: { filter_operator: "==", aggregate: "count" },
    datetime: {
      filter_operator: "==",
      aggregate: "count",
      format: { dateStyle: "short", timeStyle: "medium" },
      null_value: -1,
    },
    date: {
      filter_operator: "==",
      aggregate: "count",
      format: { dateStyle: "short" },
      null_value: -1,
    },
  },
};
function ie(r) {
  let e = {};
  if ((Q().types[r] && Object.assign(e, Q().types[r]), e.type)) {
    let t = ie(e.type);
    return Object.assign(t, e), t;
  } else return e;
}
function ne(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function J(r, ...e) {
  if (!e.length) return r;
  let t = e.shift();
  if (ne(r) && ne(t))
    for (let n in t)
      ne(t[n])
        ? (r[n] || Object.assign(r, { [n]: {} }), J(r[n], t[n]))
        : Object.assign(r, { [n]: t[n] });
  return J(r, ...e);
}
function be(r) {
  globalThis.__PERSPECTIVE_CONFIG__ &&
    console.warn("Config already initialized!"),
    (globalThis.__PERSPECTIVE_CONFIG__ = J(re, r));
}
function Q() {
  return (
    globalThis.__PERSPECTIVE_CONFIG__ ||
      (globalThis.__PERSPECTIVE_CONFIG__ = J(
        re,
        globalThis.__TEMPLATE_CONFIG__ || {},
      )),
    globalThis.__PERSPECTIVE_CONFIG__
  );
}
var ae = new WeakMap(),
  oe = 0;
function x(r, e) {
  return function () {
    let t,
      n = () => {},
      i = Array.prototype.slice.call(arguments, 0, arguments.length);
    for (let f = i.length - 1; f >= 0; f--)
      typeof i[f] == "function" && (t = i.splice(f, 1)[0]);
    let s = ae.get(t);
    ae.delete(t);
    let d = {
      cmd: e || "view_method",
      name: this._name,
      method: r,
      args: i,
      subscribe: !0,
      callback_id: s,
    };
    this._worker.post(d, t, n), this._worker.unsubscribe(e, t);
  };
}
function q(r, e) {
  return function () {
    let t,
      n = () => {},
      i = Array.prototype.slice.call(arguments, 0, arguments.length);
    for (let d = i.length - 1; d >= 0; d--)
      typeof i[d] == "function" && (t = i.splice(d, 1)[0]);
    oe++, ae.set(t, oe);
    let s = {
      cmd: e || "view_method",
      name: this._name,
      method: r,
      args: i,
      subscribe: !0,
      callback_id: oe,
    };
    this._worker.post(s, t, n, !0);
  };
}
function a(r, e) {
  return function () {
    var t = Array.prototype.slice.call(arguments, 0, arguments.length);
    return new Promise(
      function (n, i) {
        var s = {
          cmd: e || "view_method",
          name: this._name,
          method: r,
          args: t,
          subscribe: !1,
        };
        this._worker.post(s, n, i);
      }.bind(this),
    );
  };
}
function h(r, e, t) {
  return new Promise((n, i) => {
    (this._worker = r),
      (this._name = Math.random() + ""),
      this._worker.post(
        { cmd: "view", view_name: this._name, table_name: e, config: t },
        () => {
          n(this);
        },
        i,
      ),
      this._worker._initialized === !0 &&
        !this._worker._features?.wait_for_response &&
        n(this);
  });
}
function gt(r, e) {
  (this._worker = r), (this._name = e);
}
gt.prototype = h.prototype;
h.prototype.get_config = a("get_config");
h.prototype.get_min_max = a("get_min_max");
h.prototype.to_json = a("to_json");
h.prototype.to_arrow = a("to_arrow");
h.prototype.to_columns = a("to_columns");
h.prototype.to_columns_string = a("to_columns_string");
h.prototype.to_csv = a("to_csv");
h.prototype.schema = a("schema");
h.prototype.expression_schema = a("expression_schema");
h.prototype.column_paths = a("column_paths");
h.prototype.num_columns = a("num_columns");
h.prototype.num_rows = a("num_rows");
h.prototype.dimensions = a("dimensions");
h.prototype.set_depth = a("set_depth");
h.prototype.get_row_expanded = a("get_row_expanded");
h.prototype.expand = a("expand");
h.prototype.collapse = a("collapse");
h.prototype.delete = a("delete");
h.prototype.col_to_js_typed_array = a("col_to_js_typed_array");
h.prototype.on_update = q("on_update", "view_method", !0);
h.prototype.remove_update = x("remove_update", "view_method", !0);
h.prototype.on_delete = q("on_delete", "view_method", !0);
h.prototype.remove_delete = x("remove_delete", "view_method", !0);
function Y(r) {
  let e = r;
  do
    for (let t of Object.getOwnPropertyNames(e)) {
      let n = r[t];
      t !== "constructor" && typeof n == "function" && (r[t] = n.bind(r));
    }
  while ((e = e !== Object && Object.getPrototypeOf(e)));
}
String.prototype.includes ||
  (String.prototype.includes = function (r, e) {
    return (
      typeof e != "number" && (e = 0),
      e + r.length > this.length ? !1 : this.indexOf(r, e) !== -1
    );
  });
Array.prototype.includes ||
  Object.defineProperty(Array.prototype, "includes", {
    value: function (r, e) {
      if (this == null) throw new TypeError('"this" is null or not defined');
      var t = Object(this),
        n = t.length >>> 0;
      if (n === 0) return !1;
      var i = e | 0,
        s = Math.max(i >= 0 ? i : n - Math.abs(i), 0);
      function d(f, o) {
        return (
          f === o ||
          (typeof f == "number" && typeof o == "number" && isNaN(f) && isNaN(o))
        );
      }
      for (; s < n; ) {
        if (d(t[s], r)) return !0;
        s++;
      }
      return !1;
    },
  });
function p(r, e, t) {
  return new Promise((n, i) => {
    (this._worker = r),
      (this._name = t.name || Math.random() + ""),
      Y(this),
      e.to_arrow
        ? (this._worker.post({
            cmd: "table",
            name: this._name,
            args: [],
            options: t || {},
          }),
          e.to_arrow().then((s) => {
            this._worker.post(
              { cmd: "table", name: this._name, args: [s], options: t || {} },
              () => {
                e.on_update(
                  (d) => {
                    this.update(d.delta);
                  },
                  { mode: "row" },
                ),
                  n(this);
              },
              i,
            );
          }))
        : this._worker.post(
            { cmd: "table", name: this._name, args: [e], options: t || {} },
            () => {
              n(this);
            },
            i,
          ),
      this._worker._initialized === !0 &&
        !this._worker._features?.wait_for_response &&
        n(this);
  });
}
p.prototype.type = "table";
function se(r, e) {
  (this._worker = r), (this._name = e);
}
se.prototype = p.prototype;
p.prototype.view = function (r) {
  return new h(this._worker, this._name, r);
};
p.prototype.query_columns = a("query_columns", "table_method");
p.prototype.get_index = a("get_index", "table_method");
p.prototype.get_limit = a("get_limit", "table_method");
p.prototype.get_num_views = a("get_num_views", "table_method");
p.prototype.make_port = a("make_port", "table_method");
p.prototype.remove_port = a("remove_port", "table_method");
p.prototype.schema = a("schema", "table_method");
p.prototype.validate_expressions = a("validate_expressions", "table_method");
p.prototype.is_valid_filter = a("is_valid_filter", "table_method");
p.prototype.size = a("size", "table_method");
p.prototype.num_rows = a("num_rows", "table_method");
p.prototype.num_columns = a("num_columns", "table_method");
p.prototype.columns = a("columns", "table_method");
p.prototype.clear = a("clear", "table_method");
p.prototype.replace = a("replace", "table_method");
p.prototype.delete = a("delete", "table_method");
p.prototype.on_delete = q("on_delete", "table_method", !0);
p.prototype.remove = a("remove", "table_method");
p.prototype.remove_delete = x("remove_delete", "table_method", !0);
p.prototype.update = function (r, e) {
  return new Promise((t, n) => {
    this._worker.post(
      {
        name: this._name,
        cmd: "table_method",
        method: "update",
        args: [r, e || {}],
      },
      t,
      n,
      !1,
    );
  });
};
p.prototype.execute = function (r) {
  this._worker.post({
    cmd: "table_execute",
    name: this._name,
    f: r.toString(),
  });
};
var L = class {
  constructor() {
    (this._initialized = !1),
      (this._worker = {
        initialized: { value: !1 },
        transferable: !1,
        msg_id: 0,
        handlers: {},
        messages: [],
      }),
      Y(this);
  }
  unsubscribe(e, t) {
    for (let n of Object.keys(this._worker.handlers))
      this._worker.handlers[n].resolve === t && delete this._worker.handlers[n];
  }
  post(e, t, n, i = !1) {
    ++this._worker.msg_id,
      (t || n) &&
        (this._worker.handlers[this._worker.msg_id] = {
          resolve: t,
          reject: n,
          keep_alive: i,
        }),
      (e.id = this._worker.msg_id),
      this._worker.initialized.value
        ? this.send(e)
        : this._worker.messages.push(() => {
            this.send(e),
              (e.cmd === "table" || e.cmd === "view") &&
                !this._features?.wait_for_response &&
                t &&
                t();
          });
  }
  async memory_usage() {
    return await new Promise((e, t) => {
      this.post({ cmd: "memory_usage" }, e, t);
    });
  }
  async get_hosted_table_names() {
    return await new Promise((e, t) => {
      this.post({ cmd: "get_hosted_table_names" }, e, t);
    });
  }
  initialize_profile_thread() {
    this._worker.initialized.value
      ? this.send({ id: -1, cmd: "init_profile_thread" })
      : this._worker.messages.push(() =>
          this.send({ id: -1, cmd: "init_profile_thread" }),
        );
  }
  send() {
    throw new Error("send() not implemented");
  }
  async open_table(e) {
    return new se(this, e);
  }
  _handle(e) {
    if (!this._worker.initialized.value) {
      this._initialized || (this._initialized = !0);
      let t = this._worker.messages;
      if (
        ((this._worker.initialized.value = !0),
        (this._worker.messages = []),
        e.data?.data)
      ) {
        this._features = {};
        for (let n of e.data.data) this._features[n] = !0;
      }
      if (t) for (let n in t) t.hasOwnProperty(n) && t[n]();
    }
    if (e.data.id) {
      let t = this._worker.handlers[e.data.id];
      t &&
        (e.data.error ? t.reject(e.data.error) : t.resolve(e.data.data),
        t.keep_alive || delete this._worker.handlers[e.data.id]);
    }
  }
  table(e, t) {
    return new p(this, e, t || {});
  }
  terminate() {
    this._worker.terminate(), (this._worker = void 0);
  }
};
var Ge = it(ze()),
  mt = 3e4,
  F = class extends L {
    _ping() {
      this._ping_loop && this._ws.send("ping"),
        (this._ping_loop = setTimeout(this._ping.bind(this), mt));
    }
    _close() {
      clearTimeout(this._ping_loop),
        (this._ping_loop = void 0),
        this._on_close_callback?.();
    }
    _onmessage(e) {
      if (e.data !== "pong")
        if (this._pending_binary) {
          let t = e.data;
          if (
            (this._full_binary.set(new Uint8Array(t), this._total_chunk_length),
            (this._total_chunk_length += t.byteLength),
            this._total_chunk_length === this._pending_binary_length)
          )
            t = this._full_binary.buffer;
          else return;
          let n = { data: { id: this._pending_binary, data: t } };
          if (this._pending_port_id !== void 0) {
            let i = { port_id: this._pending_port_id, delta: t };
            n.data.data = i;
          }
          this._handle(n),
            delete this._pending_binary,
            delete this._pending_binary_length,
            delete this._pending_port_id,
            (this._total_chunk_length = 0),
            (this._full_binary = null);
        } else
          (e = JSON.parse(e.data)),
            e.binary_length
              ? ((this._pending_binary = e.id),
                (this._pending_binary_length = e.binary_length),
                e.data &&
                  e.data.port_id !== void 0 &&
                  (this._pending_port_id = e.data.port_id),
                (this._full_binary = new Uint8Array(
                  this._pending_binary_length,
                )))
              : this._handle({ data: e });
    }
    constructor(e) {
      super(),
        (this._ws = e),
        (this._ws.binaryType = "arraybuffer"),
        this._full_binary,
        (this._total_chunk_length = 0),
        (this._pending_binary_length = 0),
        (this._ws.onopen = () => {
          this.send({ id: -1, cmd: "init" });
        }),
        this._ping(),
        (this._ws.onclose = this._close.bind(this)),
        (this._ws.onmessage = this._onmessage.bind(this));
    }
    send(e) {
      if (this._ws.readyState === Ge.default.CLOSED) {
        console.warn("Websocket connection is already closed.");
        return;
      }
      if (
        e.args &&
        e.args.length > 0 &&
        e.args[0] instanceof ArrayBuffer &&
        e.args[0].byteLength !== void 0
      ) {
        let t = e;
        (e.binary_length = e.args[0].byteLength),
          this._ws.send(JSON.stringify(t)),
          this._ws.send(e.args[0]);
        return;
      }
      this._ws.send(JSON.stringify(e));
    }
    terminate() {
      return new Promise((e) => {
        (this._on_close_callback = e), this._ws.close();
      });
    }
  };
var g = Uint8Array,
  b = Uint16Array,
  Le = Uint32Array,
  Te = new g([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 0, 0, 0,
  ]),
  Ne = new g([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  vt = new g([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
  ]),
  Ze = function (r, e) {
    for (var t = new b(31), n = 0; n < 31; ++n) t[n] = e += 1 << r[n - 1];
    for (var i = new Le(t[30]), n = 1; n < 30; ++n)
      for (var s = t[n]; s < t[n + 1]; ++s) i[s] = ((s - t[n]) << 5) | n;
    return [t, i];
  },
  xe = Ze(Te, 2),
  qe = xe[0],
  _t = xe[1];
(qe[28] = 258), (_t[258] = 28);
var Ve = Ze(Ne, 0),
  wt = Ve[0],
  sr = Ve[1],
  fe = new b(32768);
for (u = 0; u < 32768; ++u)
  (O = ((u & 43690) >>> 1) | ((u & 21845) << 1)),
    (O = ((O & 52428) >>> 2) | ((O & 13107) << 2)),
    (O = ((O & 61680) >>> 4) | ((O & 3855) << 4)),
    (fe[u] = (((O & 65280) >>> 8) | ((O & 255) << 8)) >>> 1);
var O,
  u,
  V = function (r, e, t) {
    for (var n = r.length, i = 0, s = new b(e); i < n; ++i)
      r[i] && ++s[r[i] - 1];
    var d = new b(e);
    for (i = 0; i < e; ++i) d[i] = (d[i - 1] + s[i - 1]) << 1;
    var f;
    if (t) {
      f = new b(1 << e);
      var o = 15 - e;
      for (i = 0; i < n; ++i)
        if (r[i])
          for (
            var c = (i << 4) | r[i],
              y = e - r[i],
              v = d[r[i] - 1]++ << y,
              R = v | ((1 << y) - 1);
            v <= R;
            ++v
          )
            f[fe[v] >>> o] = c;
    } else
      for (f = new b(n), i = 0; i < n; ++i)
        r[i] && (f[i] = fe[d[r[i] - 1]++] >>> (15 - r[i]));
    return f;
  },
  W = new g(288);
for (u = 0; u < 144; ++u) W[u] = 8;
var u;
for (u = 144; u < 256; ++u) W[u] = 9;
var u;
for (u = 256; u < 280; ++u) W[u] = 7;
var u;
for (u = 280; u < 288; ++u) W[u] = 8;
var u,
  We = new g(32);
for (u = 0; u < 32; ++u) We[u] = 5;
var u;
var kt = V(W, 9, 1);
var Ot = V(We, 5, 1),
  le = function (r) {
    for (var e = r[0], t = 1; t < r.length; ++t) r[t] > e && (e = r[t]);
    return e;
  },
  w = function (r, e, t) {
    var n = (e / 8) | 0;
    return ((r[n] | (r[n + 1] << 8)) >> (e & 7)) & t;
  },
  ue = function (r, e) {
    var t = (e / 8) | 0;
    return (r[t] | (r[t + 1] << 8) | (r[t + 2] << 16)) >> (e & 7);
  },
  Ct = function (r) {
    return ((r + 7) / 8) | 0;
  },
  E = function (r, e, t) {
    (e == null || e < 0) && (e = 0),
      (t == null || t > r.length) && (t = r.length);
    var n = new (
      r.BYTES_PER_ELEMENT == 2 ? b : r.BYTES_PER_ELEMENT == 4 ? Le : g
    )(t - e);
    return n.set(r.subarray(e, t)), n;
  };
var Rt = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data",
  ],
  m = function (r, e, t) {
    var n = new Error(e || Rt[r]);
    if (
      ((n.code = r),
      Error.captureStackTrace && Error.captureStackTrace(n, m),
      !t)
    )
      throw n;
    return n;
  },
  bt = function (r, e, t) {
    var n = r.length;
    if (!n || (t && t.f && !t.l)) return e || new g(0);
    var i = !e || t,
      s = !t || t.i;
    t || (t = {}), e || (e = new g(n * 3));
    var d = function (_e) {
        var we = e.length;
        if (_e > we) {
          var ke = new g(Math.max(we * 2, _e));
          ke.set(e), (e = ke);
        }
      },
      f = t.f || 0,
      o = t.p || 0,
      c = t.b || 0,
      y = t.l,
      v = t.d,
      R = t.m,
      T = t.n,
      j = n * 8;
    do {
      if (!y) {
        f = w(r, o, 1);
        var M = w(r, o + 1, 3);
        if (((o += 3), M))
          if (M == 1) (y = kt), (v = Ot), (R = 9), (T = 5);
          else if (M == 2) {
            var P = w(r, o, 31) + 257,
              he = w(r, o + 10, 15) + 4,
              pe = P + w(r, o + 5, 31) + 1;
            o += 14;
            for (var N = new g(pe), D = new g(19), _ = 0; _ < he; ++_)
              D[vt[_]] = w(r, o + _ * 3, 7);
            o += he * 3;
            for (
              var de = le(D), Ie = (1 << de) - 1, $e = V(D, de, 1), _ = 0;
              _ < pe;

            ) {
              var ye = $e[w(r, o, Ie)];
              o += ye & 15;
              var k = ye >>> 4;
              if (k < 16) N[_++] = k;
              else {
                var z = 0,
                  K = 0;
                for (
                  k == 16
                    ? ((K = 3 + w(r, o, 3)), (o += 2), (z = N[_ - 1]))
                    : k == 17
                    ? ((K = 3 + w(r, o, 7)), (o += 3))
                    : k == 18 && ((K = 11 + w(r, o, 127)), (o += 7));
                  K--;

                )
                  N[_++] = z;
              }
            }
            var ge = N.subarray(0, P),
              C = N.subarray(P);
            (R = le(ge)), (T = le(C)), (y = V(ge, R, 1)), (v = V(C, T, 1));
          } else m(1);
        else {
          var k = Ct(o) + 4,
            I = r[k - 4] | (r[k - 3] << 8),
            $ = k + I;
          if ($ > n) {
            s && m(0);
            break;
          }
          i && d(c + I),
            e.set(r.subarray(k, $), c),
            (t.b = c += I),
            (t.p = o = $ * 8),
            (t.f = f);
          continue;
        }
        if (o > j) {
          s && m(0);
          break;
        }
      }
      i && d(c + 131072);
      for (var Pe = (1 << R) - 1, De = (1 << T) - 1, A = o; ; A = o) {
        var z = y[ue(r, o) & Pe],
          G = z >>> 4;
        if (((o += z & 15), o > j)) {
          s && m(0);
          break;
        }
        if ((z || m(2), G < 256)) e[c++] = G;
        else if (G == 256) {
          (A = o), (y = null);
          break;
        } else {
          var me = G - 254;
          if (G > 264) {
            var _ = G - 257,
              Z = Te[_];
            (me = w(r, o, (1 << Z) - 1) + qe[_]), (o += Z);
          }
          var B = v[ue(r, o) & De],
            H = B >>> 4;
          B || m(3), (o += B & 15);
          var C = wt[H];
          if (H > 3) {
            var Z = Ne[H];
            (C += ue(r, o) & ((1 << Z) - 1)), (o += Z);
          }
          if (o > j) {
            s && m(0);
            break;
          }
          i && d(c + 131072);
          for (var ve = c + me; c < ve; c += 4)
            (e[c] = e[c - C]),
              (e[c + 1] = e[c + 1 - C]),
              (e[c + 2] = e[c + 2 - C]),
              (e[c + 3] = e[c + 3 - C]);
          c = ve;
        }
      }
      (t.l = y),
        (t.p = A),
        (t.b = c),
        (t.f = f),
        y && ((f = 1), (t.m = R), (t.d = v), (t.n = T));
    } while (!f);
    return c == e.length ? e : E(e, 0, c);
  };
var St = new g(0);
var zt = function (r) {
  (r[0] != 31 || r[1] != 139 || r[2] != 8) && m(6, "invalid gzip data");
  var e = r[3],
    t = 10;
  e & 4 && (t += r[10] | ((r[11] << 8) + 2));
  for (var n = ((e >> 3) & 1) + ((e >> 4) & 1); n > 0; n -= !r[t++]);
  return t + (e & 2);
};
var S = (function () {
  function r(e) {
    (this.s = {}), (this.p = new g(0)), (this.ondata = e);
  }
  return (
    (r.prototype.e = function (e) {
      this.ondata || m(5), this.d && m(4);
      var t = this.p.length,
        n = new g(t + e.length);
      n.set(this.p), n.set(e, t), (this.p = n);
    }),
    (r.prototype.c = function (e) {
      this.d = this.s.i = e || !1;
      var t = this.s.b,
        n = bt(this.p, this.o, this.s);
      this.ondata(E(n, t, this.s.b), this.d),
        (this.o = E(n, this.s.b - 32768)),
        (this.s.b = this.o.length),
        (this.p = E(this.p, (this.s.p / 8) | 0)),
        (this.s.p &= 7);
    }),
    (r.prototype.push = function (e, t) {
      this.e(e), this.c(t);
    }),
    r
  );
})();
var Gt = (function () {
  function r(e) {
    (this.v = 1), S.call(this, e);
  }
  return (
    (r.prototype.push = function (e, t) {
      if ((S.prototype.e.call(this, e), this.v)) {
        var n = this.p.length > 3 ? zt(this.p) : 4;
        if (n >= this.p.length && !t) return;
        (this.p = this.p.subarray(n)), (this.v = 0);
      }
      t &&
        (this.p.length < 8 && m(6, "invalid gzip data"),
        (this.p = this.p.subarray(0, -8))),
        S.prototype.c.call(this, t);
    }),
    r
  );
})();
var Lt = (function () {
  function r(e) {
    (this.v = 1), S.call(this, e);
  }
  return (
    (r.prototype.push = function (e, t) {
      if ((S.prototype.e.call(this, e), this.v)) {
        if (this.p.length < 2 && !t) return;
        (this.p = this.p.subarray(2)), (this.v = 0);
      }
      t &&
        (this.p.length < 4 && m(6, "invalid zlib data"),
        (this.p = this.p.subarray(0, -4))),
        S.prototype.c.call(this, t);
    }),
    r
  );
})();
var Ke = (function () {
  function r(e) {
    (this.G = Gt), (this.I = S), (this.Z = Lt), (this.ondata = e);
  }
  return (
    (r.prototype.push = function (e, t) {
      if ((this.ondata || m(5), this.s)) this.s.push(e, t);
      else {
        if (this.p && this.p.length) {
          var n = new g(this.p.length + e.length);
          n.set(this.p), n.set(e, this.p.length);
        } else this.p = e;
        if (this.p.length > 2) {
          var i = this,
            s = function () {
              i.ondata.apply(i, arguments);
            };
          (this.s =
            this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8
              ? new this.G(s)
              : (this.p[0] & 15) != 8 ||
                this.p[0] >> 4 > 7 ||
                ((this.p[0] << 8) | this.p[1]) % 31
              ? new this.I(s)
              : new this.Z(s)),
            this.s.push(this.p, t),
            (this.p = null);
        }
      }
    }),
    r
  );
})();
var Tt = typeof TextDecoder < "u" && new TextDecoder(),
  Nt = 0;
try {
  Tt.decode(St, { stream: !0 }), (Nt = 1);
} catch {}
var Je = "./perspective.worker.js";
async function xt() {
  let r = new URL(Je, import.meta.url);
  return await (await fetch(r)).text();
}
function Qe(r, e) {
  function t(i, s) {
    r.push(s);
  }
  function n(i) {
    if (Object.keys(i).length > 0) for (let s of e) s({ data: i });
  }
  return { addEventListener: t, postMessage: n, location: { href: "" } };
}
function Ye(r) {
  let e = Function("const self = arguments[0];" + r),
    t = [],
    n = [];
  return e(Qe(t, n)), Qe(n, t);
}
var qt = xt(),
  Vt = async function () {
    let r = await qt;
    if (window.location.protocol.startsWith("file") && !window.isElectron)
      return (
        console.warn("file:// protocol does not support Web Workers"), Ye(r)
      );
    try {
      let e = new Blob([r], { type: "application/javascript" }),
        t = URL.createObjectURL(e);
      return new Worker(t, { type: "module" });
    } catch (e) {
      return (
        console.warn(
          "Failed to instantiate worker, falling back to single-threaded runtime",
          e,
        ),
        Ye(r)
      );
    }
  },
  Fe = Vt;
var Ee = "./perspective.cpp.wasm";
async function Kt() {
  return new URL(Ee, import.meta.url);
}
var Ue = Kt();
var Me = !1;
function je(r) {
  return new Uint32Array(r.slice(0, 4))[0] == 559903;
}
var ce = (function () {
    let r;
    return function () {
      return (
        r ||
          (r = new (class {
            async worker() {
              return await Fe();
            }
            async wasm() {
              let e = await Ue,
                t = [],
                n = 0,
                i = new Ke((f) => {
                  f && ((n += f.byteLength), t.push(f));
                });
              if (
                (e instanceof ArrayBuffer &&
                  !e.buffer &&
                  (e = new Uint8Array(e)),
                e.buffer && e.buffer instanceof ArrayBuffer)
              )
                (Me = !0),
                  je(e.buffer)
                    ? i.push(e, !0)
                    : ((n = e.byteLength), (t = [e]));
              else if (e instanceof ArrayBuffer)
                (n = e.byteLength), (t = [new Uint8Array(e)]);
              else {
                let o = (await fetch(e)).body.getReader(),
                  c = 0;
                for (;;) {
                  let { value: y, done: v } = await o.read();
                  if (v) break;
                  (c === 0 && je(y.buffer)) || c === 1
                    ? ((c = 1), i.push(y, v))
                    : ((c = 2), (n += y.byteLength), t.push(y));
                }
              }
              let s = 0,
                d = new Uint8Array(n);
              for (let f of t) d.set(f, s), (s += f.byteLength);
              return (this._wasm = d.buffer), this._wasm;
            }
          })()),
        r
      );
    };
  })(),
  U = class extends L {
    constructor(e) {
      e && be(e), super(), this.register();
    }
    async register() {
      let e,
        t = { cmd: "init", config: Q() };
      if (typeof WebAssembly > "u")
        throw new Error("WebAssembly not supported.");
      [e, t.buffer] = await Promise.all([ce().worker(), ce().wasm()]);
      for (var n in this._worker) e[n] = this._worker[n];
      (this._worker = e),
        this._worker.addEventListener("message", this._handle.bind(this)),
        this._worker.postMessage(t),
        this._detect_transferable();
    }
    send(e) {
      this._worker.transferable && e.args && e.args[0] instanceof ArrayBuffer
        ? this._worker.postMessage(e, [e.args[0]])
        : this._worker.postMessage(e);
    }
    terminate() {
      this._worker.terminate(), (this._worker = void 0);
    }
    get transferable() {
      return this._worker?.transferable || !1;
    }
    get inline() {
      return Me;
    }
    _detect_transferable() {
      var e = new ArrayBuffer(1);
      this._worker.postMessage(e, [e]),
        (this._worker.transferable = e.byteLength === 0);
    }
  },
  Jt = (function () {
    let r, e;
    return {
      getInstance: function (t) {
        r === void 0 && (r = new U(t));
        let n = JSON.stringify(t);
        if (e && n !== e)
          throw new Error(
            "Configuration object for shared_worker() has changed - this is probably a bug in your application.",
          );
        return (e = n), r;
      },
    };
  })(),
  Or = ie;
function Qt(r) {
  return ce().set(r);
}
function Yt(r) {
  return new U(r);
}
function Ft(r = window.location.origin.replace("http", "ws")) {
  return new F(new WebSocket(r));
}
function Et(r) {
  return Jt.getInstance(r);
}
var Cr = {
  override: Qt,
  worker: Yt,
  websocket: Ft,
  shared_worker: Et,
  ...Object.keys(te),
};
export {
  Cr as default,
  Or as get_type_config,
  Qt as override,
  Et as shared_worker,
  Ft as websocket,
  Yt as worker,
};
//# sourceMappingURL=perspective.js.map
