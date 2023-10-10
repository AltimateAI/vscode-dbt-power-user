var ot = Object.defineProperty,
  ct = (t, e) => {
    for (var n in e) ot(t, n, { get: e[n], enumerable: !0 });
  },
  at = class extends HTMLElement {
    constructor() {
      super();
    }
    get name() {
      return "Debug";
    }
    get select_mode() {
      return "select";
    }
    get min_config_columns() {}
    get config_column_names() {}
    get priority() {
      return 0;
    }
    async update(t) {
      return this.draw(t);
    }
    async draw(t) {
      this.style.backgroundColor = "#fff";
      let e = await t.to_csv(),
        n = "margin:0;overflow:scroll;position:absolute;width:100%;height:100%";
      this.innerHTML = `<pre style='${n}'>${e}</pre>`;
    }
    async clear() {
      this.innerHTML = "";
    }
    async resize() {}
    async restyle() {}
    async save() {}
    async restore() {}
    async delete() {}
  };
document.createElement("perspective-viewer-plugin").constructor ===
  HTMLElement && window.customElements.define("perspective-viewer-plugin", at);
var ke = {};
ct(ke, {
  ColumnDropDownElement: () => St,
  CopyDropDownMenuElement: () => fe,
  ExportDropDownMenuElement: () => we,
  FilterDropDownElement: () => Tt,
  FunctionDropDownElement: () => At,
  PerspectiveDateColumnStyleElement: () => de,
  PerspectiveDatetimeColumnStyleElement: () => pe,
  PerspectiveDebugPluginElement: () => me,
  PerspectiveNumberColumnStyleElement: () => he,
  PerspectiveStringColumnStyleElement: () => ve,
  PerspectiveViewerElement: () => V,
  default: () => ze,
  defineWebComponents: () => Ne,
  getExprTKCommands: () => xt,
  initSync: () => Pt,
  registerPlugin: () => kt,
});
var ut = window.ClipboardItem,
  bt = window.ResizeObserver;
function lt(t, e, n, r) {
  let i = t[n],
    a = i.prototype;
  class b extends HTMLElement {
    constructor() {
      super(), (this._instance = new i(this));
    }
  }
  let w = Object.getOwnPropertyNames(a);
  for (let s of w)
    "get" in Object.getOwnPropertyDescriptor(a, s)
      ? Object.defineProperty(b.prototype, s, {
          get: function () {
            return this._instance[s];
          },
        })
      : Object.defineProperty(b.prototype, s, {
          value: function (...m) {
            return this._instance[s].call(this._instance, ...m);
          },
        });
  for (let s of r)
    Object.defineProperty(b, s, {
      value: function (...m) {
        return t[s].call(t, ...m);
      },
    });
  customElements.define(e, b);
}
var o,
  S = new Array(128).fill(void 0);
S.push(void 0, null, !0, !1);
function _(t) {
  return S[t];
}
function f(t) {
  return t == null;
}
var M = null;
function Be() {
  return (
    (M === null || M.byteLength === 0) &&
      (M = new Float64Array(o.memory.buffer)),
    M
  );
}
var N = null;
function u() {
  return (
    (N === null || N.byteLength === 0) && (N = new Int32Array(o.memory.buffer)),
    N
  );
}
var h = 0,
  W = null;
function Z() {
  return (
    (W === null || W.byteLength === 0) && (W = new Uint8Array(o.memory.buffer)),
    W
  );
}
var G = new TextEncoder("utf-8"),
  st =
    typeof G.encodeInto == "function"
      ? function (t, e) {
          return G.encodeInto(t, e);
        }
      : function (t, e) {
          let n = G.encode(t);
          return e.set(n), { read: t.length, written: n.length };
        };
function v(t, e, n) {
  if (n === void 0) {
    let w = G.encode(t),
      s = e(w.length);
    return (
      Z()
        .subarray(s, s + w.length)
        .set(w),
      (h = w.length),
      s
    );
  }
  let r = t.length,
    i = e(r),
    a = Z(),
    b = 0;
  for (; b < r; b++) {
    let w = t.charCodeAt(b);
    if (w > 127) break;
    a[i + b] = w;
  }
  if (b !== r) {
    b !== 0 && (t = t.slice(b)), (i = n(i, r, (r = b + t.length * 3)));
    let w = Z().subarray(i + b, i + r);
    b += st(t, w).written;
  }
  return (h = b), i;
}
var z = S.length;
function c(t) {
  z === S.length && S.push(S.length + 1);
  let e = z;
  return (z = S[e]), (S[e] = t), e;
}
var Ie = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
Ie.decode();
function d(t, e) {
  return Ie.decode(Z().subarray(t, t + e));
}
function gt(t) {
  t < 132 || ((S[t] = z), (z = t));
}
function g(t) {
  let e = _(t);
  return gt(t), e;
}
var H = null;
function ft() {
  return (
    (H === null || H.byteLength === 0) &&
      (H = new BigInt64Array(o.memory.buffer)),
    H
  );
}
function ge(t) {
  let e = typeof t;
  if (e == "number" || e == "boolean" || t == null) return `${t}`;
  if (e == "string") return `"${t}"`;
  if (e == "symbol") {
    let i = t.description;
    return i == null ? "Symbol" : `Symbol(${i})`;
  }
  if (e == "function") {
    let i = t.name;
    return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
  }
  if (Array.isArray(t)) {
    let i = t.length,
      a = "[";
    i > 0 && (a += ge(t[0]));
    for (let b = 1; b < i; b++) a += ", " + ge(t[b]);
    return (a += "]"), a;
  }
  let n = /\[object ([^\]]+)\]/.exec(toString.call(t)),
    r;
  if (n.length > 1) r = n[1];
  else return toString.call(t);
  if (r == "Object")
    try {
      return "Object(" + JSON.stringify(t) + ")";
    } catch {
      return "Object";
    }
  return t instanceof Error
    ? `${t.name}: ${t.message}
${t.stack}`
    : r;
}
function ue(t, e, n, r) {
  let i = { a: t, b: e, cnt: 1, dtor: n },
    a = (...b) => {
      i.cnt++;
      try {
        return r(i.a, i.b, ...b);
      } finally {
        --i.cnt === 0 &&
          (o.__wbindgen_export_2.get(i.dtor)(i.a, i.b), (i.a = 0));
      }
    };
  return (a.original = i), a;
}
function wt(t, e, n) {
  let r = o.__wbindgen_export_3(t, e, c(n));
  return g(r);
}
function U(t, e, n, r) {
  let i = { a: t, b: e, cnt: 1, dtor: n },
    a = (...b) => {
      i.cnt++;
      let w = i.a;
      i.a = 0;
      try {
        return r(w, i.b, ...b);
      } finally {
        --i.cnt === 0 ? o.__wbindgen_export_2.get(i.dtor)(w, i.b) : (i.a = w);
      }
    };
  return (a.original = i), a;
}
function $e(t, e, n) {
  o.__wbindgen_export_4(t, e, c(n));
}
function Ue(t, e, n) {
  o.__wbindgen_export_5(t, e, c(n));
}
function dt(t, e) {
  try {
    let i = o.__wbindgen_add_to_stack_pointer(-16);
    o.__wbindgen_export_6(i, t, e);
    var n = u()[i / 4 + 0],
      r = u()[i / 4 + 1];
    if (r) throw g(n);
  } finally {
    o.__wbindgen_add_to_stack_pointer(16);
  }
}
function pt(t, e) {
  o.__wbindgen_export_7(t, e);
}
function mt(t, e, n) {
  o.__wbindgen_export_8(t, e, c(n));
}
var Q = 128;
function ht(t) {
  if (Q == 1) throw new Error("out of js stack");
  return (S[--Q] = t), Q;
}
function vt(t, e, n) {
  try {
    o.__wbindgen_export_9(t, e, ht(n));
  } finally {
    S[Q++] = void 0;
  }
}
var F = null;
function Ye() {
  return (
    (F === null || F.byteLength === 0) &&
      (F = new Uint32Array(o.memory.buffer)),
    F
  );
}
function yt(t, e) {
  let n = e(t.length * 4),
    r = Ye();
  for (let i = 0; i < t.length; i++) r[n / 4 + i] = c(t[i]);
  return (h = t.length), n;
}
function l(t, e) {
  try {
    return t.apply(this, e);
  } catch (n) {
    o.__wbindgen_export_11(c(n));
  }
}
function kt(t) {
  let e = v(t, o.__wbindgen_export_0, o.__wbindgen_export_1),
    n = h;
  o.registerPlugin(e, n);
}
function Me(t, e) {
  let n = Ye().subarray(t / 4, t / 4 + e),
    r = [];
  for (let i = 0; i < n.length; i++) r.push(g(n[i]));
  return r;
}
function xt() {
  try {
    let a = o.__wbindgen_add_to_stack_pointer(-16);
    o.getExprTKCommands(a);
    var t = u()[a / 4 + 0],
      e = u()[a / 4 + 1],
      n = u()[a / 4 + 2],
      r = u()[a / 4 + 3];
    if (r) throw g(n);
    var i = Me(t, e).slice();
    return o.__wbindgen_export_10(t, e * 4), i;
  } finally {
    o.__wbindgen_add_to_stack_pointer(16);
  }
}
function Ne() {
  o.defineWebComponents();
}
function Et(t, e, n, r) {
  o.__wbindgen_export_12(t, e, c(n), c(r));
}
var St = class {
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_columndropdownelement_free(t);
    }
  },
  fe = class {
    static __wrap(t) {
      let e = Object.create(fe.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_copydropdownmenuelement_free(t);
    }
    constructor(t) {
      let e = o.copydropdownmenuelement_new(c(t));
      return fe.__wrap(e);
    }
    open(t) {
      o.copydropdownmenuelement_open(this.ptr, c(t));
    }
    hide() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.copydropdownmenuelement_hide(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    unsafe_set_model(t) {
      o.copydropdownmenuelement_unsafe_set_model(this.ptr, t);
    }
    connected_callback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
  },
  we = class {
    static __wrap(t) {
      let e = Object.create(we.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_exportdropdownmenuelement_free(t);
    }
    constructor(t) {
      let e = o.copydropdownmenuelement_new(c(t));
      return we.__wrap(e);
    }
    open(t) {
      o.exportdropdownmenuelement_open(this.ptr, c(t));
    }
    hide() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.copydropdownmenuelement_hide(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    unsafe_set_model(t) {
      o.exportdropdownmenuelement_unsafe_set_model(this.ptr, t);
    }
    connected_callback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
  },
  Tt = class {
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_filterdropdownelement_free(t);
    }
  },
  At = class {
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_functiondropdownelement_free(t);
    }
  },
  de = class {
    static __wrap(t) {
      let e = Object.create(de.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_perspectivedatecolumnstyleelement_free(t);
    }
    constructor(t) {
      let e = o.perspectivedatecolumnstyleelement_new(c(t));
      return de.__wrap(e);
    }
    reset(t) {
      try {
        let r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_reset(r, this.ptr, c(t));
        var e = u()[r / 4 + 0],
          n = u()[r / 4 + 1];
        if (n) throw g(e);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    open(t, e, n) {
      try {
        let a = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_open(a, this.ptr, c(t), c(e), c(n));
        var r = u()[a / 4 + 0],
          i = u()[a / 4 + 1];
        if (i) throw g(r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    close() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_close(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    destroy() {
      try {
        let n = this.__destroy_into_raw(),
          r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_destroy(r, n);
        var t = u()[r / 4 + 0],
          e = u()[r / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    connected_callback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
  },
  pe = class {
    static __wrap(t) {
      let e = Object.create(pe.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_perspectivedatetimecolumnstyleelement_free(t);
    }
    constructor(t) {
      let e = o.perspectivedatecolumnstyleelement_new(c(t));
      return pe.__wrap(e);
    }
    reset(t) {
      try {
        let r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_reset(r, this.ptr, c(t));
        var e = u()[r / 4 + 0],
          n = u()[r / 4 + 1];
        if (n) throw g(e);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    open(t, e, n) {
      try {
        let a = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatetimecolumnstyleelement_open(
          a,
          this.ptr,
          c(t),
          c(e),
          c(n),
        );
        var r = u()[a / 4 + 0],
          i = u()[a / 4 + 1];
        if (i) throw g(r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    close() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_close(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    destroy() {
      try {
        let n = this.__destroy_into_raw(),
          r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_destroy(r, n);
        var t = u()[r / 4 + 0],
          e = u()[r / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    connected_callback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
  },
  me = class {
    static __wrap(t) {
      let e = Object.create(me.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_perspectivedebugpluginelement_free(t);
    }
    constructor(t) {
      let e = o.perspectivedebugpluginelement_new(c(t));
      return me.__wrap(e);
    }
    get name() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedebugpluginelement_name(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        return d(t, e);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_10(t, e);
      }
    }
    get select_mode() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedebugpluginelement_select_mode(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        return d(t, e);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_10(t, e);
      }
    }
    get min_config_columns() {
      let t = o.perspectivedebugpluginelement_config_column_names(this.ptr);
      return g(t);
    }
    get config_column_names() {
      let t = o.perspectivedebugpluginelement_config_column_names(this.ptr);
      return g(t);
    }
    update(t) {
      let e = o.perspectivedebugpluginelement_draw(this.ptr, c(t));
      return g(e);
    }
    draw(t) {
      let e = o.perspectivedebugpluginelement_draw(this.ptr, c(t));
      return g(e);
    }
    clear() {
      let t = o.perspectivedebugpluginelement_clear(this.ptr);
      return g(t);
    }
    resize() {
      let t = o.perspectivedebugpluginelement_clear(this.ptr);
      return g(t);
    }
    restyle() {
      let t = o.perspectivedebugpluginelement_clear(this.ptr);
      return g(t);
    }
    save() {
      let t = o.perspectivedebugpluginelement_clear(this.ptr);
      return g(t);
    }
    restore() {
      let t = o.perspectivedebugpluginelement_clear(this.ptr);
      return g(t);
    }
    delete() {
      let t = o.perspectivedebugpluginelement_clear(this.ptr);
      return g(t);
    }
    connectedCallback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
  },
  he = class {
    static __wrap(t) {
      let e = Object.create(he.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_perspectivenumbercolumnstyleelement_free(t);
    }
    constructor(t) {
      let e = o.perspectivedatecolumnstyleelement_new(c(t));
      return he.__wrap(e);
    }
    reset(t, e) {
      try {
        let i = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivenumbercolumnstyleelement_reset(i, this.ptr, c(t), c(e));
        var n = u()[i / 4 + 0],
          r = u()[i / 4 + 1];
        if (r) throw g(n);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    open(t, e, n) {
      try {
        let a = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivenumbercolumnstyleelement_open(
          a,
          this.ptr,
          c(t),
          c(e),
          c(n),
        );
        var r = u()[a / 4 + 0],
          i = u()[a / 4 + 1];
        if (i) throw g(r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    close() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_close(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    destroy() {
      try {
        let n = this.__destroy_into_raw(),
          r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivenumbercolumnstyleelement_destroy(r, n);
        var t = u()[r / 4 + 0],
          e = u()[r / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    connected_callback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
  },
  ve = class {
    static __wrap(t) {
      let e = Object.create(ve.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_perspectivestringcolumnstyleelement_free(t);
    }
    constructor(t) {
      let e = o.perspectivedatecolumnstyleelement_new(c(t));
      return ve.__wrap(e);
    }
    reset(t) {
      try {
        let r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivestringcolumnstyleelement_reset(r, this.ptr, c(t));
        var e = u()[r / 4 + 0],
          n = u()[r / 4 + 1];
        if (n) throw g(e);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    open(t, e, n) {
      try {
        let a = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivestringcolumnstyleelement_open(
          a,
          this.ptr,
          c(t),
          c(e),
          c(n),
        );
        var r = u()[a / 4 + 0],
          i = u()[a / 4 + 1];
        if (i) throw g(r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    close() {
      try {
        let n = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivedatecolumnstyleelement_close(n, this.ptr);
        var t = u()[n / 4 + 0],
          e = u()[n / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    destroy() {
      try {
        let n = this.__destroy_into_raw(),
          r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectivestringcolumnstyleelement_destroy(r, n);
        var t = u()[r / 4 + 0],
          e = u()[r / 4 + 1];
        if (e) throw g(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    connected_callback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
  },
  V = class {
    static __wrap(t) {
      let e = Object.create(V.prototype);
      return (e.ptr = t), e;
    }
    __destroy_into_raw() {
      let t = this.ptr;
      return (this.ptr = 0), t;
    }
    free() {
      let t = this.__destroy_into_raw();
      o.__wbg_perspectiveviewerelement_free(t);
    }
    constructor(t) {
      let e = o.perspectiveviewerelement_new(c(t));
      return V.__wrap(e);
    }
    connectedCallback() {
      o.copydropdownmenuelement_connected_callback(this.ptr);
    }
    load(t) {
      let e = o.perspectiveviewerelement_load(this.ptr, c(t));
      return g(e);
    }
    delete() {
      let t = o.perspectiveviewerelement_delete(this.ptr);
      return g(t);
    }
    getView() {
      let t = o.perspectiveviewerelement_getView(this.ptr);
      return g(t);
    }
    getTable(t) {
      let e = o.perspectiveviewerelement_getTable(
        this.ptr,
        f(t) ? 16777215 : t ? 1 : 0,
      );
      return g(e);
    }
    flush() {
      let t = o.perspectiveviewerelement_flush(this.ptr);
      return g(t);
    }
    restore(t) {
      let e = o.perspectiveviewerelement_restore(this.ptr, c(t));
      return g(e);
    }
    save(t) {
      var e = f(t) ? 0 : v(t, o.__wbindgen_export_0, o.__wbindgen_export_1),
        n = h;
      let r = o.perspectiveviewerelement_save(this.ptr, e, n);
      return g(r);
    }
    download(t) {
      let e = o.perspectiveviewerelement_download(
        this.ptr,
        f(t) ? 16777215 : t ? 1 : 0,
      );
      return g(e);
    }
    copy(t) {
      let e = o.perspectiveviewerelement_copy(
        this.ptr,
        f(t) ? 16777215 : t ? 1 : 0,
      );
      return g(e);
    }
    reset(t) {
      let e = o.perspectiveviewerelement_reset(
        this.ptr,
        f(t) ? 16777215 : t ? 1 : 0,
      );
      return g(e);
    }
    notifyResize(t) {
      let e = o.perspectiveviewerelement_notifyResize(
        this.ptr,
        f(t) ? 16777215 : t ? 1 : 0,
      );
      return g(e);
    }
    setAutoSize(t) {
      o.perspectiveviewerelement_setAutoSize(this.ptr, t);
    }
    getEditPort() {
      try {
        let r = o.__wbindgen_add_to_stack_pointer(-16);
        o.perspectiveviewerelement_getEditPort(r, this.ptr);
        var t = Be()[r / 8 + 0],
          e = u()[r / 4 + 2],
          n = u()[r / 4 + 3];
        if (n) throw g(e);
        return t;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    restyleElement() {
      let t = o.perspectiveviewerelement_restyleElement(this.ptr);
      return g(t);
    }
    resetThemes(t) {
      var e = f(t) ? 0 : yt(t, o.__wbindgen_export_0),
        n = h;
      let r = o.perspectiveviewerelement_resetThemes(this.ptr, e, n);
      return g(r);
    }
    setThrottle(t) {
      o.perspectiveviewerelement_setThrottle(this.ptr, !f(t), f(t) ? 0 : t);
    }
    toggleConfig(t) {
      let e = o.perspectiveviewerelement_toggleConfig(
        this.ptr,
        f(t) ? 16777215 : t ? 1 : 0,
      );
      return g(e);
    }
    getAllPlugins() {
      let t = o.perspectiveviewerelement_getAllPlugins(this.ptr);
      return g(t);
    }
    getPlugin(t) {
      try {
        let b = o.__wbindgen_add_to_stack_pointer(-16);
        var e = f(t) ? 0 : v(t, o.__wbindgen_export_0, o.__wbindgen_export_1),
          n = h;
        o.perspectiveviewerelement_getPlugin(b, this.ptr, e, n);
        var r = u()[b / 4 + 0],
          i = u()[b / 4 + 1],
          a = u()[b / 4 + 2];
        if (a) throw g(i);
        return g(r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    unsafeGetModel() {
      return o.perspectiveviewerelement_unsafeGetModel(this.ptr);
    }
  };
async function Dt(t, e) {
  if (typeof Response == "function" && t instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(t, e);
      } catch (r) {
        if (t.headers.get("Content-Type") != "application/wasm")
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            r,
          );
        else throw r;
      }
    let n = await t.arrayBuffer();
    return await WebAssembly.instantiate(n, e);
  } else {
    let n = await WebAssembly.instantiate(t, e);
    return n instanceof WebAssembly.Instance ? { instance: n, module: t } : n;
  }
}
function We() {
  let t = {};
  return (
    (t.wbg = {}),
    (t.wbg.__wbindgen_is_undefined = function (e) {
      return _(e) === void 0;
    }),
    (t.wbg.__wbindgen_in = function (e, n) {
      return _(e) in _(n);
    }),
    (t.wbg.__wbindgen_number_get = function (e, n) {
      let r = _(n),
        i = typeof r == "number" ? r : void 0;
      (Be()[e / 8 + 1] = f(i) ? 0 : i), (u()[e / 4 + 0] = !f(i));
    }),
    (t.wbg.__wbindgen_boolean_get = function (e) {
      let n = _(e);
      return typeof n == "boolean" ? (n ? 1 : 0) : 2;
    }),
    (t.wbg.__wbindgen_string_get = function (e, n) {
      let r = _(n),
        i = typeof r == "string" ? r : void 0;
      var a = f(i) ? 0 : v(i, o.__wbindgen_export_0, o.__wbindgen_export_1),
        b = h;
      (u()[e / 4 + 1] = b), (u()[e / 4 + 0] = a);
    }),
    (t.wbg.__wbindgen_is_bigint = function (e) {
      return typeof _(e) == "bigint";
    }),
    (t.wbg.__wbindgen_is_object = function (e) {
      let n = _(e);
      return typeof n == "object" && n !== null;
    }),
    (t.wbg.__wbindgen_is_string = function (e) {
      return typeof _(e) == "string";
    }),
    (t.wbg.__wbindgen_bigint_from_i64 = function (e) {
      return c(e);
    }),
    (t.wbg.__wbindgen_bigint_from_u64 = function (e) {
      let n = BigInt.asUintN(64, e);
      return c(n);
    }),
    (t.wbg.__wbindgen_error_new = function (e, n) {
      let r = new Error(d(e, n));
      return c(r);
    }),
    (t.wbg.__wbg_static_accessor_PSP_c3cc6465cd22dc65 = function () {
      return c(ke);
    }),
    (t.wbg.__wbindgen_object_clone_ref = function (e) {
      let n = _(e);
      return c(n);
    }),
    (t.wbg.__wbindgen_jsval_eq = function (e, n) {
      return _(e) === _(n);
    }),
    (t.wbg.__wbindgen_string_new = function (e, n) {
      let r = d(e, n);
      return c(r);
    }),
    (t.wbg.__wbg_supportedValuesOf_7f9d607b73d4b93f = function (e) {
      let n = Intl.supportedValuesOf(_(e));
      return c(n);
    }),
    (t.wbg.__wbindgen_object_drop_ref = function (e) {
      g(e);
    }),
    (t.wbg.__wbindgen_cb_drop = function (e) {
      let n = g(e).original;
      return n.cnt-- == 1 ? ((n.a = 0), !0) : !1;
    }),
    (t.wbg.__wbg_expressionschema_788fca34e22af890 = function (e) {
      let n = _(e).expression_schema;
      return c(n);
    }),
    (t.wbg.__wbg_restore_82330eb8b51f1c2e = function (e, n) {
      _(e).restore(_(n));
    }),
    (t.wbg.__wbindgen_is_null = function (e) {
      return _(e) === null;
    }),
    (t.wbg.__wbg_contentRect_6f8b110706101237 = function (e) {
      let n = _(e).contentRect;
      return c(n);
    }),
    (t.wbg.__wbg_new_64deb56650054ff6 = function (e) {
      let n = new ut(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_update_be3f5c16508431b0 = function () {
      return l(function (e, n, r, i, a, b, w) {
        let s = _(e).update(
          _(n),
          r === 0 ? void 0 : i >>> 0,
          a === 0 ? void 0 : b >>> 0,
          w !== 0,
        );
        return c(s);
      }, arguments);
    }),
    (t.wbg.__wbg_draw_4eeb9a0dd4ffc75d = function () {
      return l(function (e, n, r, i, a, b, w) {
        let s = _(e).draw(
          _(n),
          r === 0 ? void 0 : i >>> 0,
          a === 0 ? void 0 : b >>> 0,
          w !== 0,
        );
        return c(s);
      }, arguments);
    }),
    (t.wbg.__wbg_delete_f76c6d94e53ca8ee = function (e) {
      _(e).delete();
    }),
    (t.wbg.__wbg_setrenderwarning_649c5c341cc50637 = function (e, n) {
      _(e).render_warning = n !== 0;
    }),
    (t.wbg.__wbg_size_a7de7fac79238ca7 = function () {
      return l(function (e) {
        let n = _(e).size();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_columns_b24dd4bbefe3200b = function () {
      return l(function (e) {
        let n = _(e).columns();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_schema_af14e98ed1e4f1d5 = function () {
      return l(function (e) {
        let n = _(e).schema();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_makeport_8684f2db90086a39 = function () {
      return l(function (e) {
        let n = _(e).make_port();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_numtablerows_307b87e4fe1533a1 = function (e) {
      return _(e).num_table_rows;
    }),
    (t.wbg.__wbg_numtablecolumns_bad80cff2495d41d = function (e) {
      return _(e).num_table_columns;
    }),
    (t.wbg.__wbg_numviewrows_cfa9a57cb2ec99a9 = function (e) {
      return _(e).num_view_rows;
    }),
    (t.wbg.__wbg_numviewcolumns_b3aaf0fbd9b3779d = function (e) {
      return _(e).num_view_columns;
    }),
    (t.wbg.__wbg_errors_50b148fcb81ba283 = function (e) {
      let n = _(e).errors;
      return c(n);
    }),
    (t.wbg.__wbg_tocolumns_8eba54822424b891 = function () {
      return l(function (e) {
        let n = _(e).to_columns();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbindgen_number_new = function (e) {
      return c(e);
    }),
    (t.wbg.__wbg_onupdate_65b7122464f09d3b = function (e, n) {
      _(e).on_update(_(n));
    }),
    (t.wbg.__wbg_removeupdate_0fadacb61b1462fb = function (e, n) {
      _(e).remove_update(_(n));
    }),
    (t.wbg.__wbg_expressionalias_3488a9b7aacadd11 = function (e) {
      let n = _(e).expression_alias;
      return c(n);
    }),
    (t.wbg.__wbg_validateexpressions_d9013e9e5cb9abf8 = function () {
      return l(function (e, n) {
        let r = _(e).validate_expressions(g(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_view_d586c6b29c5a3c92 = function () {
      return l(function (e, n) {
        let r = _(e).view(_(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_tocsv_be185c4fa437ea1e = function () {
      return l(function (e, n) {
        let r = _(e).to_csv(g(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_toarrow_63dec4b8c6da0f42 = function () {
      return l(function (e) {
        let n = _(e).to_arrow();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_dimensions_dd863c67d2e0c8e1 = function () {
      return l(function (e) {
        let n = _(e).dimensions();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_schema_65b19bbd170c69a6 = function () {
      return l(function (e) {
        let n = _(e).schema();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_delete_a4b8b5c5b3cc1e24 = function () {
      return l(function (e) {
        let n = _(e).delete();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_name_4333e7eabaf68eb0 = function (e, n) {
      let r = _(n).name,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_category_d3d7ec259363ec41 = function (e, n) {
      let r = _(n).category;
      var i = f(r) ? 0 : v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_maxcolumns_af24b7aad3c0ab5a = function (e, n) {
      let r = _(n).max_columns;
      (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
    }),
    (t.wbg.__wbg_maxcells_7b09002042ca29b0 = function (e, n) {
      let r = _(n).max_cells;
      (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
    }),
    (t.wbg.__wbg_renderwarning_4ac79c1e8e5ddbaa = function (e) {
      let n = _(e).render_warning;
      return f(n) ? 16777215 : n ? 1 : 0;
    }),
    (t.wbg.__wbg_selectmode_c9535e91f95ba112 = function (e) {
      let n = _(e).select_mode;
      return c(n);
    }),
    (t.wbg.__wbg_minconfigcolumns_562e640bd275bbfa = function (e, n) {
      let r = _(n).min_config_columns;
      (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
    }),
    (t.wbg.__wbg_configcolumnnames_749034786f1c8485 = function (e) {
      let n = _(e).config_column_names;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_priority_c7ea73cb6bca0e6f = function (e, n) {
      let r = _(n).priority;
      (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
    }),
    (t.wbg.__wbg_save_36ac3c95fbca4e4e = function (e) {
      let n = _(e).save();
      return c(n);
    }),
    (t.wbg.__wbg_restyle_6aec2b9f5f37ddd3 = function () {
      return l(function (e, n) {
        let r = _(e).restyle(_(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_resize_2eb3fc255ec5516a = function () {
      return l(function (e) {
        let n = _(e).resize();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_new_f3559e5f9b1b1de0 = function (e) {
      let n = new bt(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_observe_8b4a2db443f0ef99 = function (e, n) {
      _(e).observe(_(n));
    }),
    (t.wbg.__wbg_unobserve_6b7a70e94afeeb9e = function (e, n) {
      _(e).unobserve(_(n));
    }),
    (t.wbg.__wbg_bootstrap_3adef9edb5d25859 = function (e, n, r, i, a, b) {
      let w = lt(_(e), d(n, r), d(i, a), g(b));
      return c(w);
    }),
    (t.wbg.__wbg_listenerid_12315eee21527820 = function (e, n) {
      let r = _(n).__yew_listener_id;
      (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
    }),
    (t.wbg.__wbg_setlistenerid_3183aae8fa5840fb = function (e, n) {
      _(e).__yew_listener_id = n >>> 0;
    }),
    (t.wbg.__wbg_setsubtreeid_d32e6327eef1f7fc = function (e, n) {
      _(e).__yew_subtree_id = n >>> 0;
    }),
    (t.wbg.__wbg_setcachekey_80183b7cfc421143 = function (e, n) {
      _(e).__yew_subtree_cache_key = n >>> 0;
    }),
    (t.wbg.__wbg_subtreeid_e348577f7ef777e3 = function (e, n) {
      let r = _(n).__yew_subtree_id;
      (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
    }),
    (t.wbg.__wbg_cachekey_b61393159c57fd7b = function (e, n) {
      let r = _(n).__yew_subtree_cache_key;
      (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
    }),
    (t.wbg.__wbg_new_abda76e883ba8a5f = function () {
      let e = new Error();
      return c(e);
    }),
    (t.wbg.__wbg_stack_658279fe44541cf6 = function (e, n) {
      let r = _(n).stack,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_error_f851667af71bcfc6 = function (e, n) {
      try {
        console.error(d(e, n));
      } finally {
        o.__wbindgen_export_10(e, n);
      }
    }),
    (t.wbg.__wbindgen_jsval_loose_eq = function (e, n) {
      return _(e) == _(n);
    }),
    (t.wbg.__wbg_String_91fba7ded13ba54c = function (e, n) {
      let r = String(_(n)),
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_getwithrefkey_15c62c2b8546208d = function (e, n) {
      let r = _(e)[_(n)];
      return c(r);
    }),
    (t.wbg.__wbg_set_20cbc34131e76824 = function (e, n, r) {
      _(e)[g(n)] = g(r);
    }),
    (t.wbg.__wbg_error_c0a7dc7e3b138aad = function (e, n) {
      var r = Me(e, n).slice();
      o.__wbindgen_export_10(e, n * 4), console.error(...r);
    }),
    (t.wbg.__wbg_newwithu8arraysequence_fede89c6795cc33e = function () {
      return l(function (e) {
        let n = new Blob(_(e));
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_newwithstrsequenceandoptions_710e3955c3af1c1f = function () {
      return l(function (e, n) {
        let r = new Blob(_(e), _(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_write_835b6fdc840018db = function (e, n) {
      let r = _(e).write(_(n));
      return c(r);
    }),
    (t.wbg.__wbg_length_cb56788f94a79587 = function (e) {
      return _(e).length;
    }),
    (t.wbg.__wbg_item_cd42d84b8a35d126 = function (e, n) {
      let r = _(e).item(n >>> 0);
      return f(r) ? 0 : c(r);
    }),
    (t.wbg.__wbg_length_eef5266d0b30c7d7 = function (e) {
      return _(e).length;
    }),
    (t.wbg.__wbg_getPropertyValue_05e910529ab6e32a = function () {
      return l(function (e, n, r, i) {
        let a = _(n).getPropertyValue(d(r, i)),
          b = v(a, o.__wbindgen_export_0, o.__wbindgen_export_1),
          w = h;
        (u()[e / 4 + 1] = w), (u()[e / 4 + 0] = b);
      }, arguments);
    }),
    (t.wbg.__wbg_item_4c111cb0cc721409 = function (e, n, r) {
      let i = _(n).item(r >>> 0),
        a = v(i, o.__wbindgen_export_0, o.__wbindgen_export_1),
        b = h;
      (u()[e / 4 + 1] = b), (u()[e / 4 + 0] = a);
    }),
    (t.wbg.__wbg_setProperty_21e2e7868b86a93e = function () {
      return l(function (e, n, r, i, a) {
        _(e).setProperty(d(n, r), d(i, a));
      }, arguments);
    }),
    (t.wbg.__wbg_instanceof_CssStyleRule_6e8af49f43f0b7ab = function (e) {
      let n;
      try {
        n = _(e) instanceof CSSStyleRule;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_selectorText_62ef3bed9323aefc = function (e, n) {
      let r = _(n).selectorText,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_style_71d307158ce61414 = function (e) {
      let n = _(e).style;
      return c(n);
    }),
    (t.wbg.__wbg_cssRules_d2d7f924cdcf6c4c = function () {
      return l(function (e) {
        let n = _(e).cssRules;
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_new_6ed14e2e6f8b5a03 = function () {
      return l(function (e, n) {
        let r = new CustomEvent(d(e, n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_newwitheventinitdict_3607f3d9a58509d5 = function () {
      return l(function (e, n, r) {
        let i = new CustomEvent(d(e, n), _(r));
        return c(i);
      }, arguments);
    }),
    (t.wbg.__wbg_setdropEffect_95e777b58aabb679 = function (e, n, r) {
      _(e).dropEffect = d(n, r);
    }),
    (t.wbg.__wbg_setData_7cbabb43b90bb947 = function () {
      return l(function (e, n, r, i, a) {
        _(e).setData(d(n, r), d(i, a));
      }, arguments);
    }),
    (t.wbg.__wbg_setDragImage_12deaa947a938ec4 = function (e, n, r, i) {
      _(e).setDragImage(_(n), r, i);
    }),
    (t.wbg.__wbg_readyState_70087d592b243b36 = function (e, n) {
      let r = _(n).readyState,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_body_be46234bb33edd63 = function (e) {
      let n = _(e).body;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_activeElement_4f793763dfcc99d7 = function (e) {
      let n = _(e).activeElement;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_styleSheets_bdce530fbe6c099e = function (e) {
      let n = _(e).styleSheets;
      return c(n);
    }),
    (t.wbg.__wbg_fonts_dfcbe0032e3ae560 = function (e) {
      let n = _(e).fonts;
      return c(n);
    }),
    (t.wbg.__wbg_createElement_e2a0e21263eb5416 = function () {
      return l(function (e, n, r) {
        let i = _(e).createElement(d(n, r));
        return c(i);
      }, arguments);
    }),
    (t.wbg.__wbg_createElementNS_0047de728927ea00 = function () {
      return l(function (e, n, r, i, a) {
        let b = _(e).createElementNS(n === 0 ? void 0 : d(n, r), d(i, a));
        return c(b);
      }, arguments);
    }),
    (t.wbg.__wbg_createTextNode_866e33a51b47f04c = function (e, n, r) {
      let i = _(e).createTextNode(d(n, r));
      return c(i);
    }),
    (t.wbg.__wbg_width_f0cbf7dcbbe056da = function (e) {
      return _(e).width;
    }),
    (t.wbg.__wbg_height_e46975153da440ae = function (e) {
      return _(e).height;
    }),
    (t.wbg.__wbg_width_6762f1c0e103466e = function (e) {
      return _(e).width;
    }),
    (t.wbg.__wbg_height_7228c2f4dd8e75bd = function (e) {
      return _(e).height;
    }),
    (t.wbg.__wbg_top_98bc5382de3ec5d2 = function (e) {
      return _(e).top;
    }),
    (t.wbg.__wbg_left_09342c290d46b4a6 = function (e) {
      return _(e).left;
    }),
    (t.wbg.__wbg_get_36817a0b6bd3b305 = function (e, n, r, i) {
      let a = _(n)[d(r, i)];
      var b = f(a) ? 0 : v(a, o.__wbindgen_export_0, o.__wbindgen_export_1),
        w = h;
      (u()[e / 4 + 1] = w), (u()[e / 4 + 0] = b);
    }),
    (t.wbg.__wbg_set_6903780050f0d9a9 = function () {
      return l(function (e, n, r, i, a) {
        _(e)[d(n, r)] = d(i, a);
      }, arguments);
    }),
    (t.wbg.__wbg_delete_d197db23212363f3 = function (e, n, r) {
      delete _(e)[d(n, r)];
    }),
    (t.wbg.__wbg_add_ea314b325ad27189 = function () {
      return l(function (e, n) {
        _(e).add(..._(n));
      }, arguments);
    }),
    (t.wbg.__wbg_add_73f794d491a0e44f = function () {
      return l(function (e, n, r) {
        _(e).add(d(n, r));
      }, arguments);
    }),
    (t.wbg.__wbg_remove_10fbe66510bfee98 = function () {
      return l(function (e, n) {
        _(e).remove(..._(n));
      }, arguments);
    }),
    (t.wbg.__wbg_remove_f021903057d23f5e = function () {
      return l(function (e, n, r) {
        _(e).remove(d(n, r));
      }, arguments);
    }),
    (t.wbg.__wbg_toggle_e36c504dbc3d7694 = function () {
      return l(function (e, n, r) {
        return _(e).toggle(d(n, r));
      }, arguments);
    }),
    (t.wbg.__wbg_dataTransfer_445ade328cdd17c8 = function (e) {
      let n = _(e).dataTransfer;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_instanceof_Element_cb847a3fc7b1b1a4 = function (e) {
      let n;
      try {
        n = _(e) instanceof Element;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_namespaceURI_436d78f0f18e05c1 = function (e, n) {
      let r = _(n).namespaceURI;
      var i = f(r) ? 0 : v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_tagName_92d4c105959ede9f = function (e, n) {
      let r = _(n).tagName,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_classList_c4ebb3813d3a2f5d = function (e) {
      let n = _(e).classList;
      return c(n);
    }),
    (t.wbg.__wbg_scrollTop_296f89e3a4486106 = function (e) {
      return _(e).scrollTop;
    }),
    (t.wbg.__wbg_scrollLeft_7d962ecb3da16acc = function (e) {
      return _(e).scrollLeft;
    }),
    (t.wbg.__wbg_setscrollLeft_5124e83b21ab4746 = function (e, n) {
      _(e).scrollLeft = n;
    }),
    (t.wbg.__wbg_clientWidth_1fa51f20a3bebbbf = function (e) {
      return _(e).clientWidth;
    }),
    (t.wbg.__wbg_clientHeight_0fe149fdad1fe046 = function (e) {
      return _(e).clientHeight;
    }),
    (t.wbg.__wbg_setinnerHTML_76167cda24d9b96b = function (e, n, r) {
      _(e).innerHTML = d(n, r);
    }),
    (t.wbg.__wbg_children_93bcc921a4904ad4 = function (e) {
      let n = _(e).children;
      return c(n);
    }),
    (t.wbg.__wbg_attachShadow_c071102f3dae5d9a = function () {
      return l(function (e, n) {
        let r = _(e).attachShadow(_(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_getAttribute_2c20e00a5cd314af = function (e, n, r, i) {
      let a = _(n).getAttribute(d(r, i));
      var b = f(a) ? 0 : v(a, o.__wbindgen_export_0, o.__wbindgen_export_1),
        w = h;
      (u()[e / 4 + 1] = w), (u()[e / 4 + 0] = b);
    }),
    (t.wbg.__wbg_getBoundingClientRect_aaa701cbcb448965 = function (e) {
      let n = _(e).getBoundingClientRect();
      return c(n);
    }),
    (t.wbg.__wbg_hasAttribute_8d21af81e8fc2f17 = function (e, n, r) {
      return _(e).hasAttribute(d(n, r));
    }),
    (t.wbg.__wbg_matches_bda2f7b6478030a6 = function () {
      return l(function (e, n, r) {
        return _(e).matches(d(n, r));
      }, arguments);
    }),
    (t.wbg.__wbg_releasePointerCapture_b0063bfa1890f17b = function () {
      return l(function (e, n) {
        _(e).releasePointerCapture(n);
      }, arguments);
    }),
    (t.wbg.__wbg_removeAttribute_ad7a5bf2eed30373 = function () {
      return l(function (e, n, r) {
        _(e).removeAttribute(d(n, r));
      }, arguments);
    }),
    (t.wbg.__wbg_setAttribute_79c9562d32d05e66 = function () {
      return l(function (e, n, r, i, a) {
        _(e).setAttribute(d(n, r), d(i, a));
      }, arguments);
    }),
    (t.wbg.__wbg_setPointerCapture_5479dc0d082282b7 = function () {
      return l(function (e, n) {
        _(e).setPointerCapture(n);
      }, arguments);
    }),
    (t.wbg.__wbg_toggleAttribute_b07fecd058040a59 = function () {
      return l(function (e, n, r, i) {
        return _(e).toggleAttribute(d(n, r), i !== 0);
      }, arguments);
    }),
    (t.wbg.__wbg_target_b629c177f9bee3da = function (e) {
      let n = _(e).target;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_bubbles_80a0700df9c59aee = function (e) {
      return _(e).bubbles;
    }),
    (t.wbg.__wbg_cancelBubble_c9a8182589205d54 = function (e) {
      return _(e).cancelBubble;
    }),
    (t.wbg.__wbg_composedPath_d4428cc409ddd3e6 = function (e) {
      let n = _(e).composedPath();
      return c(n);
    }),
    (t.wbg.__wbg_preventDefault_16b2170b12f56317 = function (e) {
      _(e).preventDefault();
    }),
    (t.wbg.__wbg_stopPropagation_7647c9985222f9b0 = function (e) {
      _(e).stopPropagation();
    }),
    (t.wbg.__wbg_addEventListener_615d4590d38da1c9 = function () {
      return l(function (e, n, r, i) {
        _(e).addEventListener(d(n, r), _(i));
      }, arguments);
    }),
    (t.wbg.__wbg_addEventListener_cf5b03cd29763277 = function () {
      return l(function (e, n, r, i, a) {
        _(e).addEventListener(d(n, r), _(i), _(a));
      }, arguments);
    }),
    (t.wbg.__wbg_dispatchEvent_615d1ccbba577081 = function () {
      return l(function (e, n) {
        return _(e).dispatchEvent(_(n));
      }, arguments);
    }),
    (t.wbg.__wbg_removeEventListener_86fd19ed073cd1ed = function () {
      return l(function (e, n, r, i) {
        _(e).removeEventListener(d(n, r), _(i));
      }, arguments);
    }),
    (t.wbg.__wbg_instanceof_FontFace_52e8786298dcabeb = function (e) {
      let n;
      try {
        n = _(e) instanceof FontFace;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_family_afd8897a6b516d76 = function (e, n) {
      let r = _(n).family,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_weight_a1f1e299df7b3fa2 = function (e, n) {
      let r = _(n).weight,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_loaded_02544538272a8a04 = function () {
      return l(function (e) {
        let n = _(e).loaded;
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_values_aafc66d1486c9292 = function (e) {
      let n = _(e).values();
      return c(n);
    }),
    (t.wbg.__wbg_next_92f073c7b53427b2 = function () {
      return l(function (e) {
        let n = _(e).next();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_item_2ab86c1e3cb70ed3 = function (e, n) {
      let r = _(e).item(n >>> 0);
      return f(r) ? 0 : c(r);
    }),
    (t.wbg.__wbg_getwithindex_aec05ea9d2417c75 = function (e, n) {
      let r = _(e)[n >>> 0];
      return f(r) ? 0 : c(r);
    }),
    (t.wbg.__wbg_scrollTop_99ac74051927ce93 = function (e) {
      return _(e).scrollTop;
    }),
    (t.wbg.__wbg_setscrollTop_a800ac5312e75de8 = function (e, n) {
      _(e).scrollTop = n;
    }),
    (t.wbg.__wbg_dataset_704ec547006a213c = function (e) {
      let n = _(e).dataset;
      return c(n);
    }),
    (t.wbg.__wbg_style_2141664e428fef46 = function (e) {
      let n = _(e).style;
      return c(n);
    }),
    (t.wbg.__wbg_offsetParent_fadc40e6ce156dc2 = function (e) {
      let n = _(e).offsetParent;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_offsetWidth_56caa7d0f7e171a2 = function (e) {
      return _(e).offsetWidth;
    }),
    (t.wbg.__wbg_offsetHeight_31cde48f5fbc2368 = function (e) {
      return _(e).offsetHeight;
    }),
    (t.wbg.__wbg_blur_b94a30ed202c3612 = function () {
      return l(function (e) {
        _(e).blur();
      }, arguments);
    }),
    (t.wbg.__wbg_click_f3e37a4a2595187d = function (e) {
      _(e).click();
    }),
    (t.wbg.__wbg_focus_6497e1b44dabfb24 = function () {
      return l(function (e) {
        _(e).focus();
      }, arguments);
    }),
    (t.wbg.__wbg_checked_44c09d0c819e33ad = function (e) {
      return _(e).checked;
    }),
    (t.wbg.__wbg_setchecked_cbd6f423c4deba69 = function (e, n) {
      _(e).checked = n !== 0;
    }),
    (t.wbg.__wbg_value_1f2c9e357d18d3ea = function (e, n) {
      let r = _(n).value,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_setvalue_a706abe70dab1b65 = function (e, n, r) {
      _(e).value = d(n, r);
    }),
    (t.wbg.__wbg_selectedIndex_1e9fee59fa44bd02 = function (e) {
      return _(e).selectedIndex;
    }),
    (t.wbg.__wbg_setvalue_7f698ba375d14330 = function (e, n, r) {
      _(e).value = d(n, r);
    }),
    (t.wbg.__wbg_value_00fb0fdc46959169 = function (e, n) {
      let r = _(n).value,
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbg_setvalue_f92ff20dd33356a8 = function (e, n, r) {
      _(e).value = d(n, r);
    }),
    (t.wbg.__wbg_setselectionStart_dd9b85d67b4216ee = function () {
      return l(function (e, n, r) {
        _(e).selectionStart = n === 0 ? void 0 : r >>> 0;
      }, arguments);
    }),
    (t.wbg.__wbg_selectionEnd_cd4e4c1adfe0d246 = function () {
      return l(function (e, n) {
        let r = _(n).selectionEnd;
        (u()[e / 4 + 1] = f(r) ? 0 : r), (u()[e / 4 + 0] = !f(r));
      }, arguments);
    }),
    (t.wbg.__wbg_setselectionEnd_7c74ebb970b35942 = function () {
      return l(function (e, n, r) {
        _(e).selectionEnd = n === 0 ? void 0 : r >>> 0;
      }, arguments);
    }),
    (t.wbg.__wbg_keyCode_b33194be2ceec53b = function (e) {
      return _(e).keyCode;
    }),
    (t.wbg.__wbg_shiftKey_31e62e9d172b26f0 = function (e) {
      return _(e).shiftKey;
    }),
    (t.wbg.__wbg_clientX_35f23f953e04ec0e = function (e) {
      return _(e).clientX;
    }),
    (t.wbg.__wbg_clientY_8104e462abc0b3ec = function (e) {
      return _(e).clientY;
    }),
    (t.wbg.__wbg_offsetX_413d9f02022e72ad = function (e) {
      return _(e).offsetX;
    }),
    (t.wbg.__wbg_offsetY_488f80a0a9666028 = function (e) {
      return _(e).offsetY;
    }),
    (t.wbg.__wbg_shiftKey_fdd99b6df96e25c5 = function (e) {
      return _(e).shiftKey;
    }),
    (t.wbg.__wbg_button_a1c470d5e4c997f2 = function (e) {
      return _(e).button;
    }),
    (t.wbg.__wbg_relatedTarget_66d2be52fe1361a2 = function (e) {
      let n = _(e).relatedTarget;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_clipboard_72ae7717d527a067 = function (e) {
      let n = _(e).clipboard;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_isConnected_93fb8849454bdb93 = function (e) {
      return _(e).isConnected;
    }),
    (t.wbg.__wbg_parentNode_e81e6d5dc2fc35b0 = function (e) {
      let n = _(e).parentNode;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_parentElement_0e8c9afce5cb9d6e = function (e) {
      let n = _(e).parentElement;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_lastChild_e0fcecf63df5f824 = function (e) {
      let n = _(e).lastChild;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_nextSibling_653f43ab9380175f = function (e) {
      let n = _(e).nextSibling;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_setnodeValue_10d5890cd7e3f998 = function (e, n, r) {
      _(e).nodeValue = n === 0 ? void 0 : d(n, r);
    }),
    (t.wbg.__wbg_settextContent_19dc6a6146112f16 = function (e, n, r) {
      _(e).textContent = n === 0 ? void 0 : d(n, r);
    }),
    (t.wbg.__wbg_appendChild_b8199dc1655c852d = function () {
      return l(function (e, n) {
        let r = _(e).appendChild(_(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_cloneNode_4c5e9ec3203eb137 = function () {
      return l(function (e, n) {
        let r = _(e).cloneNode(n !== 0);
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_contains_d7dbb4dfe10d9428 = function (e, n) {
      return _(e).contains(_(n));
    }),
    (t.wbg.__wbg_getRootNode_d1b23203c654b1e5 = function (e) {
      let n = _(e).getRootNode();
      return c(n);
    }),
    (t.wbg.__wbg_insertBefore_77a7d032a91abf86 = function () {
      return l(function (e, n, r) {
        let i = _(e).insertBefore(_(n), _(r));
        return c(i);
      }, arguments);
    }),
    (t.wbg.__wbg_removeChild_794db72cbb6f21d3 = function () {
      return l(function (e, n) {
        let r = _(e).removeChild(_(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_getEntriesByName_bf69b2da670dc020 = function (e, n, r, i, a) {
      let b = _(e).getEntriesByName(d(n, r), d(i, a));
      return c(b);
    }),
    (t.wbg.__wbg_mark_88960258286b2684 = function () {
      return l(function (e, n, r) {
        _(e).mark(d(n, r));
      }, arguments);
    }),
    (t.wbg.__wbg_measure_6cfb450367bf8564 = function () {
      return l(function (e, n, r, i, a) {
        _(e).measure(d(n, r), d(i, a));
      }, arguments);
    }),
    (t.wbg.__wbg_now_c644db5194be8437 = function (e) {
      return _(e).now();
    }),
    (t.wbg.__wbg_startTime_0f0e575a7b97165d = function (e) {
      return _(e).startTime;
    }),
    (t.wbg.__wbg_pointerId_d2caae4465ba386f = function (e) {
      return _(e).pointerId;
    }),
    (t.wbg.__wbg_instanceof_ShadowRoot_7088dfa874f5499c = function (e) {
      let n;
      try {
        n = _(e) instanceof ShadowRoot;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_host_33f0224f975dc46a = function (e) {
      let n = _(e).host;
      return c(n);
    }),
    (t.wbg.__wbg_length_551f829bae645f61 = function (e) {
      return _(e).length;
    }),
    (t.wbg.__wbg_item_494a4f50d5ab293f = function (e, n) {
      let r = _(e).item(n >>> 0);
      return f(r) ? 0 : c(r);
    }),
    (t.wbg.__wbg_which_0dd05aa408002d08 = function (e) {
      return _(e).which;
    }),
    (t.wbg.__wbg_createObjectURL_adf40f2719ba3b9b = function () {
      return l(function (e, n) {
        let r = URL.createObjectURL(_(n)),
          i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
          a = h;
        (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
      }, arguments);
    }),
    (t.wbg.__wbg_instanceof_Window_e266f02eee43b570 = function (e) {
      let n;
      try {
        n = _(e) instanceof Window;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_document_950215a728589a2d = function (e) {
      let n = _(e).document;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_navigator_b18e629f7f0b75fa = function (e) {
      let n = _(e).navigator;
      return c(n);
    }),
    (t.wbg.__wbg_innerWidth_7e9d12e05bcb598e = function () {
      return l(function (e) {
        let n = _(e).innerWidth;
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_innerHeight_3ef25a30618357e0 = function () {
      return l(function (e) {
        let n = _(e).innerHeight;
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_performance_8629f414811abc46 = function (e) {
      let n = _(e).performance;
      return f(n) ? 0 : c(n);
    }),
    (t.wbg.__wbg_getComputedStyle_ae586cab8f5c81f8 = function () {
      return l(function (e, n) {
        let r = _(e).getComputedStyle(_(n));
        return f(r) ? 0 : c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_requestAnimationFrame_afe426b568f84138 = function () {
      return l(function (e, n) {
        return _(e).requestAnimationFrame(_(n));
      }, arguments);
    }),
    (t.wbg.__wbg_setTimeout_6609c9aa64f32bfc = function () {
      return l(function (e, n, r) {
        return _(e).setTimeout(_(n), r);
      }, arguments);
    }),
    (t.wbg.__wbg_debug_7960d327fd96f71a = function (e, n, r, i) {
      console.debug(_(e), _(n), _(r), _(i));
    }),
    (t.wbg.__wbg_error_fe807da27c4a4ced = function (e) {
      console.error(_(e));
    }),
    (t.wbg.__wbg_error_62b53e8733a5a02b = function (e, n, r) {
      console.error(_(e), _(n), _(r));
    }),
    (t.wbg.__wbg_error_fd84ca2a8a977774 = function (e, n, r, i) {
      console.error(_(e), _(n), _(r), _(i));
    }),
    (t.wbg.__wbg_info_5566be377f5b52ae = function (e, n, r, i) {
      console.info(_(e), _(n), _(r), _(i));
    }),
    (t.wbg.__wbg_trace_62f71326d384be35 = function (e, n, r, i) {
      console.trace(_(e), _(n), _(r), _(i));
    }),
    (t.wbg.__wbg_warn_e57696dbb3977030 = function (e) {
      console.warn(_(e));
    }),
    (t.wbg.__wbg_warn_48cbddced45e5414 = function (e, n, r, i) {
      console.warn(_(e), _(n), _(r), _(i));
    }),
    (t.wbg.__wbindgen_is_function = function (e) {
      return typeof _(e) == "function";
    }),
    (t.wbg.__wbg_self_e7c1f827057f6584 = function () {
      return l(function () {
        let e = self.self;
        return c(e);
      }, arguments);
    }),
    (t.wbg.__wbg_window_a09ec664e14b1b81 = function () {
      return l(function () {
        let e = window.window;
        return c(e);
      }, arguments);
    }),
    (t.wbg.__wbg_globalThis_87cbb8506fecf3a9 = function () {
      return l(function () {
        let e = globalThis.globalThis;
        return c(e);
      }, arguments);
    }),
    (t.wbg.__wbg_global_c85a9259e621f3db = function () {
      return l(function () {
        let e = global.global;
        return c(e);
      }, arguments);
    }),
    (t.wbg.__wbg_newnoargs_2b8b6bd7753c76ba = function (e, n) {
      let r = new Function(d(e, n));
      return c(r);
    }),
    (t.wbg.__wbg_new_b525de17f44a8943 = function () {
      let e = new Array();
      return c(e);
    }),
    (t.wbg.__wbg_new_f841cc6f2098f4b5 = function () {
      return c(new Map());
    }),
    (t.wbg.__wbg_next_b7d530c04fd8b217 = function (e) {
      let n = _(e).next;
      return c(n);
    }),
    (t.wbg.__wbg_value_6ac8da5cc5b3efda = function (e) {
      let n = _(e).value;
      return c(n);
    }),
    (t.wbg.__wbg_iterator_55f114446221aa5a = function () {
      return c(Symbol.iterator);
    }),
    (t.wbg.__wbg_new_f9876326328f45ed = function () {
      let e = new Object();
      return c(e);
    }),
    (t.wbg.__wbg_new_1a153916efe94e88 = function (e, n) {
      let r = new Intl.DateTimeFormat(_(e), _(n));
      return c(r);
    }),
    (t.wbg.__wbg_at_155d8a5ce48004cd = function (e, n) {
      let r = _(e).at(n);
      return c(r);
    }),
    (t.wbg.__wbg_get_27fe3dac1c4d0224 = function (e, n) {
      let r = _(e)[n >>> 0];
      return c(r);
    }),
    (t.wbg.__wbg_set_17224bc548dd1d7b = function (e, n, r) {
      _(e)[n >>> 0] = g(r);
    }),
    (t.wbg.__wbg_from_67ca20fa722467e6 = function (e) {
      let n = Array.from(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_isArray_39d28997bf6b96b4 = function (e) {
      return Array.isArray(_(e));
    }),
    (t.wbg.__wbg_length_e498fbc24f9c1d4f = function (e) {
      return _(e).length;
    }),
    (t.wbg.__wbg_push_49c286f04dd3bf59 = function (e, n) {
      return _(e).push(_(n));
    }),
    (t.wbg.__wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065 = function (e) {
      let n;
      try {
        n = _(e) instanceof ArrayBuffer;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_slice_cd850bbc3b09b547 = function (e, n, r) {
      let i = _(e).slice(n >>> 0, r >>> 0);
      return c(i);
    }),
    (t.wbg.__wbg_instanceof_Error_749a7378f4439ee0 = function (e) {
      let n;
      try {
        n = _(e) instanceof Error;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_message_a95c3ef248e4b57a = function (e) {
      let n = _(e).message;
      return c(n);
    }),
    (t.wbg.__wbg_call_95d1ea488d03e4e8 = function () {
      return l(function (e, n) {
        let r = _(e).call(_(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_call_9495de66fdbe016b = function () {
      return l(function (e, n, r) {
        let i = _(e).call(_(n), _(r));
        return c(i);
      }, arguments);
    }),
    (t.wbg.__wbg_set_388c4c6422704173 = function (e, n, r) {
      let i = _(e).set(_(n), _(r));
      return c(i);
    }),
    (t.wbg.__wbg_next_88560ec06a094dea = function () {
      return l(function (e) {
        let n = _(e).next();
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_done_1ebec03bbd919843 = function (e) {
      return _(e).done;
    }),
    (t.wbg.__wbg_isSafeInteger_8c4789029e885159 = function (e) {
      return Number.isSafeInteger(_(e));
    }),
    (t.wbg.__wbg_getTimezoneOffset_2a6b27fb18493a56 = function (e) {
      return _(e).getTimezoneOffset();
    }),
    (t.wbg.__wbg_new_f127e324c1313064 = function (e) {
      let n = new Date(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_entries_4e1315b774245952 = function (e) {
      let n = Object.entries(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_is_8f1618fe9a4fd388 = function (e, n) {
      return Object.is(_(e), _(n));
    }),
    (t.wbg.__wbg_keys_60443f4f867207f9 = function (e) {
      let n = Object.keys(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_get_baf4855f9a986186 = function () {
      return l(function (e, n) {
        let r = Reflect.get(_(e), _(n));
        return c(r);
      }, arguments);
    }),
    (t.wbg.__wbg_has_3feea89d34bd7ad5 = function () {
      return l(function (e, n) {
        return Reflect.has(_(e), _(n));
      }, arguments);
    }),
    (t.wbg.__wbg_set_6aa458a4ebdb65cb = function () {
      return l(function (e, n, r) {
        return Reflect.set(_(e), _(n), _(r));
      }, arguments);
    }),
    (t.wbg.__wbg_buffer_cf65c07de34b9a08 = function (e) {
      let n = _(e).buffer;
      return c(n);
    }),
    (t.wbg.__wbg_stringify_029a979dfb73aa17 = function () {
      return l(function (e) {
        let n = JSON.stringify(_(e));
        return c(n);
      }, arguments);
    }),
    (t.wbg.__wbg_resolvedOptions_8d355f78be16b46d = function (e) {
      let n = _(e).resolvedOptions();
      return c(n);
    }),
    (t.wbg.__wbg_instanceof_Promise_4333c4e5587e8936 = function (e) {
      let n;
      try {
        n = _(e) instanceof Promise;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_new_9d3a9ce4282a18a8 = function (e, n) {
      try {
        var r = { a: e, b: n },
          i = (b, w) => {
            let s = r.a;
            r.a = 0;
            try {
              return Et(s, r.b, b, w);
            } finally {
              r.a = s;
            }
          };
        let a = new Promise(i);
        return c(a);
      } finally {
        r.a = r.b = 0;
      }
    }),
    (t.wbg.__wbg_resolve_fd40f858d9db1a04 = function (e) {
      let n = Promise.resolve(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_then_ec5db6d509eb475f = function (e, n) {
      let r = _(e).then(_(n));
      return c(r);
    }),
    (t.wbg.__wbg_then_f753623316e2873a = function (e, n, r) {
      let i = _(e).then(_(n), _(r));
      return c(i);
    }),
    (t.wbg.__wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5 = function (
      e,
      n,
      r,
    ) {
      let i = new Uint8Array(_(e), n >>> 0, r >>> 0);
      return c(i);
    }),
    (t.wbg.__wbg_new_537b7341ce90bb31 = function (e) {
      let n = new Uint8Array(_(e));
      return c(n);
    }),
    (t.wbg.__wbg_instanceof_Uint8Array_01cebe79ca606cca = function (e) {
      let n;
      try {
        n = _(e) instanceof Uint8Array;
      } catch {
        n = !1;
      }
      return n;
    }),
    (t.wbg.__wbg_buffer_5f1fc856188c4b44 = function (e) {
      let n = _(e).buffer;
      return c(n);
    }),
    (t.wbg.__wbg_length_27a2afe8ab42b09f = function (e) {
      return _(e).length;
    }),
    (t.wbg.__wbg_byteLength_29d6f6f493852fd4 = function (e) {
      return _(e).byteLength;
    }),
    (t.wbg.__wbg_byteOffset_85a4ff4bd899e78b = function (e) {
      return _(e).byteOffset;
    }),
    (t.wbg.__wbg_set_17499e8aa4003ebd = function (e, n, r) {
      _(e).set(_(n), r >>> 0);
    }),
    (t.wbg.__wbindgen_bigint_get_as_i64 = function (e, n) {
      let r = _(n),
        i = typeof r == "bigint" ? r : void 0;
      (ft()[e / 8 + 1] = f(i) ? BigInt(0) : i), (u()[e / 4 + 0] = !f(i));
    }),
    (t.wbg.__wbindgen_debug_string = function (e, n) {
      let r = ge(_(n)),
        i = v(r, o.__wbindgen_export_0, o.__wbindgen_export_1),
        a = h;
      (u()[e / 4 + 1] = a), (u()[e / 4 + 0] = i);
    }),
    (t.wbg.__wbindgen_throw = function (e, n) {
      throw new Error(d(e, n));
    }),
    (t.wbg.__wbindgen_memory = function () {
      let e = o.memory;
      return c(e);
    }),
    (t.wbg.__wbindgen_closure_wrapper3628 = function (e, n, r) {
      let i = ue(e, n, 40, wt);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper3630 = function (e, n, r) {
      let i = U(e, n, 40, $e);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper3632 = function (e, n, r) {
      let i = U(e, n, 40, $e);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper3634 = function (e, n, r) {
      let i = ue(e, n, 40, Ue);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper3636 = function (e, n, r) {
      let i = U(e, n, 42, dt);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper3638 = function (e, n, r) {
      let i = ue(e, n, 42, Ue);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper9893 = function (e, n, r) {
      let i = U(e, n, 2352, pt);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper9917 = function (e, n, r) {
      let i = U(e, n, 2357, mt);
      return c(i);
    }),
    (t.wbg.__wbindgen_closure_wrapper9978 = function (e, n, r) {
      let i = U(e, n, 2373, vt);
      return c(i);
    }),
    t
  );
}
function He(t, e) {
  return (
    (o = t.exports),
    (Fe.__wbindgen_wasm_module = e),
    (H = null),
    (M = null),
    (N = null),
    (F = null),
    (W = null),
    o
  );
}
function Pt(t) {
  let e = We();
  t instanceof WebAssembly.Module || (t = new WebAssembly.Module(t));
  let n = new WebAssembly.Instance(t, e);
  return He(n, t);
}
async function Fe(t) {
  let e = We();
  (typeof t == "string" ||
    (typeof Request == "function" && t instanceof Request) ||
    (typeof URL == "function" && t instanceof URL)) &&
    (t = fetch(t));
  let { instance: n, module: r } = await Dt(await t, e);
  return He(n, r);
}
var ze = Fe;
function sn(t, { warn: e = !0, replace_defaults: n = !1 } = {}) {
  if (typeof t == "object" && !(t instanceof ArrayBuffer)) {
    let r = JSON.parse(JSON.stringify(t));
    return "viewers" in r && "detail" in r
      ? Lt(r, { warn: e, replace_defaults: n })
      : Xe(r, !1, { warn: e, replace_defaults: n });
  } else return t;
}
function Lt(t, e) {
  for (let n in t.viewers)
    (t.viewers[n] = Xe(t.viewers[n], !0, e)),
      "master" in t.viewers[n] ||
        ((t.viewers[n].master = !1),
        e.warn &&
          console.warn(
            'Deprecated perspective missing attribute "master" set to default',
          )),
      "linked" in t.viewers[n] ||
        ((t.viewers[n].linked = !1),
        e.warn &&
          console.warn(
            'Deprecated perspective missing attribute "linked" set to default',
          ));
  return t;
}
function Xe(t, e, n) {
  return Ot(
    t,
    [
      jt,
      Rt,
      $t,
      It,
      n.replace_defaults ? Ct : !1,
      Yt,
      Mt,
      Bt,
      Ht,
      e ? Wt : Nt,
    ].filter((r) => !!r),
    n,
  );
}
function Ot(t, e, n) {
  for (let r of e) t = r(t, n);
  return t;
}
function Ct(t, e) {
  for (let n of ["group_by", "split_by", "filter", "sort"])
    t[n] === null &&
      ((t[n] = []),
      e.warn &&
        console.warn(
          `Deprecated perspective missing attribute "${n}" set to default"`,
        )),
      "aggregates" in t &&
        t.aggregates === null &&
        ((t.aggregates = {}),
        e.warn &&
          console.warn(
            'Deprecated perspective missing attribute "aggregates" set to default"',
          ));
  return t;
}
function xe(t, e) {
  return function (n, r) {
    let i = 0;
    for (let a of e)
      if (a in n) {
        if (i++ > 0) throw new Error(`Duplicate "${t}" fields`);
        (n[t] = n[a]),
          a !== t &&
            (delete n[a],
            r.warn &&
              console.warn(
                `Deprecated perspective attribute "${a}" renamed "${t}"`,
              ));
      }
    return n;
  };
}
var jt = xe("group_by", [
    "group_by",
    "row_pivots",
    "row-pivot",
    "row-pivots",
    "row_pivot",
  ]),
  Rt = xe("split_by", [
    "split_by",
    "column_pivots",
    "column-pivot",
    "column-pivots",
    "column_pivot",
    "col_pivots",
    "col-pivot",
    "col-pivots",
    "col_pivot",
  ]),
  $t = xe("filter", ["filter", "filters"]);
function Ut(t, e, n, r, i) {
  if (t.test(n)) {
    let a = n.replace(t, e);
    i.warn &&
      console.warn(
        `Deprecated perspective "expression" attribute value "${n}" updated to "${a}"`,
      );
    for (let b of ["group_by", "split_by"])
      if (b in r)
        for (let w in r[b])
          r[b][w] === n.replace(/"/g, "") &&
            ((r[b][w] = a),
            i.warn &&
              console.warn(
                `Deprecated perspective expression in "${b}" attribute "${n}" replaced with "${a}"`,
              ));
    for (let b of r.filter || [])
      b[0] === n.replace(/"/g, "") &&
        ((b[0] = a),
        i.warn &&
          console.warn(
            `Deprecated perspective expression in "filter" attribute "${n}" replaced with "${a}"`,
          ));
    for (let b of r.sort || [])
      b[0] === n.replace(/"/g, "") &&
        ((b[0] = a),
        i.warn &&
          console.warn(
            `Deprecated perspective expression in "sort" attribute "${n}" replaced with "${a}"`,
          ));
    return a;
  } else return n;
}
function Bt(t) {
  return t.title === void 0 && (t.title = null), t;
}
function It(t, e) {
  if (t["computed-columns"]) {
    if ("expressions" in t)
      throw new Error('Duplicate "expressions" and "computed-columns');
    (t.expressions = t["computed-columns"]),
      delete t["computed-columns"],
      e.warn &&
        console.warn(
          'Deprecated perspective attribute "computed-columns" renamed "expressions"',
        );
    let n = [
      [/^year_bucket\("(.+?)"\)/, `bucket("$1", 'y')`],
      [/^month_bucket\("(.+?)"\)/, `bucket("$1", 'M')`],
      [/^day_bucket\("(.+?)"\)/, `bucket("$1", 'd')`],
      [/^hour_bucket\("(.+?)"\)/, `bucket("$1", 'h')`],
      [/^minute_bucket\("(.+?)"\)/, `bucket("$1", 'm')`],
      [/^second_bucket\("(.+?)"\)/, `bucket("$1", 's')`],
    ];
    for (let r in t.expressions) {
      let i = t.expressions[r];
      for (let [a, b] of n) i = Ut(a, b, i, t, e);
      t.expressions[r] = i;
    }
  }
  return t;
}
function Yt(t, e) {
  let n = {
    datagrid: "Datagrid",
    Datagrid: "Datagrid",
    d3_y_area: "Y Area",
    "Y Area": "Y Area",
    d3_y_line: "Y Line",
    "Y Line": "Y Line",
    d3_xy_line: "X/Y Line",
    "X/Y Line": "X/Y Line",
    d3_y_scatter: "Y Scatter",
    "Y Scatter": "Y Scatter",
    d3_xy_scatter: "X/Y Scatter",
    "X/Y Scatter": "X/Y Scatter",
    d3_x_bar: "X Bar",
    "X Bar": "X Bar",
    d3_y_bar: "Y Bar",
    "Y Bar": "Y Bar",
    d3_heatmap: "Heatmap",
    Heatmap: "Heatmap",
    d3_treemap: "Treemap",
    Treemap: "Treemap",
    d3_sunburst: "Sunburst",
    Sunburst: "Sunburst",
  };
  return (
    "plugin" in t &&
      t.plugin !== n[t.plugin] &&
      ((t.plugin = n[t.plugin]),
      e.warn &&
        console.warn(
          `Deprecated perspective "plugin" attribute value "${
            t.plugin
          }" updated to "${n[t.plugin]}"`,
        )),
    t
  );
}
function Mt(t, e) {
  if (t.plugin === "Datagrid" && !!t.plugin_config) {
    if (!t.plugin_config.columns) {
      e.warn &&
        console.warn(
          'Deprecated perspective attribute "plugin_config" moved to "plugin_config.columns"',
        );
      let n = {};
      for (let r of Object.keys(t.plugin_config)) {
        let i = t.plugin_config[r];
        delete t.plugin_config[r],
          typeof i.color_mode == "string" &&
            (i.color_mode === "foreground"
              ? (i.number_fg_mode = "color")
              : i.color_mode === "bar"
              ? (i.number_fg_mode = "bar")
              : i.color_mode === "background"
              ? (i.number_bg_mode = "color")
              : i.color_mode === "gradient"
              ? (i.number_bg_mode = "gradient")
              : console.warn(`Unknown color_mode ${i.color_mode}`),
            delete i.color_mode,
            e.warn &&
              console.warn(
                'Deprecated perspective attribute "color_mode" renamed "number_bg_mode"',
              )),
          (n[r] = i);
      }
      (t.plugin_config.columns = n),
        e.replace_defaults &&
          ((t.plugin_config.editable = !1), (t.plugin_config.scroll_lock = !0));
    }
    for (let n of Object.keys(t.plugin_config.columns)) {
      let r = t.plugin_config.columns[n];
      typeof r.number_color_mode == "string" &&
        (r.number_color_mode === "foreground"
          ? (r.number_fg_mode = "color")
          : r.number_color_mode === "bar"
          ? (r.number_fg_mode = "bar")
          : r.number_color_mode === "background"
          ? (r.number_bg_mode = "color")
          : r.number_color_mode === "gradient" &&
            (r.number_bg_mode = "gradient"),
        delete r.number_color_mode,
        e.warn &&
          console.warn(
            'Deprecated perspective attribute "number_color_mode" renamed "number_bg_mode"',
          )),
        r.gradient !== void 0 &&
          (r.number_bg_mode === "gradient"
            ? (r.bg_gradient = r.gradient)
            : r.number_fg_mode === "bar" && (r.fg_gradient = r.gradient),
          delete r.gradient,
          e.warn &&
            console.warn(
              'Deprecated perspective attribute "gradient" renamed "bg_gradient"',
            )),
        r.pos_color !== void 0 &&
          (r.number_bg_mode !== void 0
            ? (r.pos_bg_color = r.pos_color)
            : r.number_fg_mode !== void 0 && (r.pos_fg_color = r.pos_color),
          delete r.pos_color,
          e.warn &&
            console.warn(
              'Deprecated perspective attribute "pos_color" renamed "pos_bg_color"',
            )),
        r.neg_color !== void 0 &&
          (r.number_bg_mode !== void 0
            ? (r.neg_bg_color = r.neg_color)
            : r.number_fg_mode !== void 0 && (r.neg_fg_color = r.neg_color),
          delete r.neg_color,
          e.warn &&
            console.warn(
              'Deprecated perspective attribute "neg_color" renamed "neg_bg_color"',
            ));
    }
  }
  return t;
}
function Nt(t, e) {
  let n = ["editable", "selectable", "name", "table", "master", "linked"];
  for (let r of n)
    r in t &&
      (delete t[r],
      e.warn &&
        console.warn(`Deprecated perspective attribute "${r}" removed`));
  return t;
}
function Wt(t, e) {
  let n = ["editable", "selectable", "name", "table", "master", "linked"];
  for (let r of n)
    r in t &&
      t[r] === null &&
      (delete t[r],
      e.warn &&
        console.warn(`Deprecated perspective attribute "${r}" removed`));
  return t;
}
function Ht(t, e) {
  return (
    "name" in t &&
      ("title" in t &&
        t.title !== void 0 &&
        ((t.title = t.name),
        e.warn && console.warn('"name" conflicts with "title"')),
      delete t.name,
      e.warn && console.warn('"name" unified with "title"')),
    t
  );
}
var y = Uint8Array,
  C = Uint16Array,
  Ve = Uint32Array,
  qe = new y([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 0, 0, 0,
  ]),
  Je = new y([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  Ft = new y([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
  ]),
  Ze = function (t, e) {
    for (var n = new C(31), r = 0; r < 31; ++r) n[r] = e += 1 << t[r - 1];
    for (var i = new Ve(n[30]), r = 1; r < 30; ++r)
      for (var a = n[r]; a < n[r + 1]; ++a) i[a] = ((a - n[r]) << 5) | r;
    return [n, i];
  },
  Ge = Ze(qe, 2),
  Qe = Ge[0],
  zt = Ge[1];
(Qe[28] = 258), (zt[258] = 28);
var Ke = Ze(Je, 0),
  Xt = Ke[0],
  gn = Ke[1],
  ye = new C(32768);
for (p = 0; p < 32768; ++p)
  (P = ((p & 43690) >>> 1) | ((p & 21845) << 1)),
    (P = ((P & 52428) >>> 2) | ((P & 13107) << 2)),
    (P = ((P & 61680) >>> 4) | ((P & 3855) << 4)),
    (ye[p] = (((P & 65280) >>> 8) | ((P & 255) << 8)) >>> 1);
var P,
  p,
  X = function (t, e, n) {
    for (var r = t.length, i = 0, a = new C(e); i < r; ++i)
      t[i] && ++a[t[i] - 1];
    var b = new C(e);
    for (i = 0; i < e; ++i) b[i] = (b[i - 1] + a[i - 1]) << 1;
    var w;
    if (n) {
      w = new C(1 << e);
      var s = 15 - e;
      for (i = 0; i < r; ++i)
        if (t[i])
          for (
            var m = (i << 4) | t[i],
              T = e - t[i],
              D = b[t[i] - 1]++ << T,
              O = D | ((1 << T) - 1);
            D <= O;
            ++D
          )
            w[ye[D] >>> s] = m;
    } else
      for (w = new C(r), i = 0; i < r; ++i)
        t[i] && (w[i] = ye[b[t[i] - 1]++] >>> (15 - t[i]));
    return w;
  },
  q = new y(288);
for (p = 0; p < 144; ++p) q[p] = 8;
var p;
for (p = 144; p < 256; ++p) q[p] = 9;
var p;
for (p = 256; p < 280; ++p) q[p] = 7;
var p;
for (p = 280; p < 288; ++p) q[p] = 8;
var p,
  et = new y(32);
for (p = 0; p < 32; ++p) et[p] = 5;
var p,
  Vt = X(q, 9, 1),
  qt = X(et, 5, 1),
  be = function (t) {
    for (var e = t[0], n = 1; n < t.length; ++n) t[n] > e && (e = t[n]);
    return e;
  },
  E = function (t, e, n) {
    var r = (e / 8) | 0;
    return ((t[r] | (t[r + 1] << 8)) >> (e & 7)) & n;
  },
  le = function (t, e) {
    var n = (e / 8) | 0;
    return (t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) >> (e & 7);
  },
  Jt = function (t) {
    return ((t + 7) / 8) | 0;
  },
  K = function (t, e, n) {
    (e == null || e < 0) && (e = 0),
      (n == null || n > t.length) && (n = t.length);
    var r = new (
      t.BYTES_PER_ELEMENT == 2 ? C : t.BYTES_PER_ELEMENT == 4 ? Ve : y
    )(n - e);
    return r.set(t.subarray(e, n)), r;
  },
  Zt = [
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
  k = function (t, e, n) {
    var r = new Error(e || Zt[t]);
    if (
      ((r.code = t),
      Error.captureStackTrace && Error.captureStackTrace(r, k),
      !n)
    )
      throw r;
    return r;
  },
  Gt = function (t, e, n) {
    var r = t.length;
    if (!r || (n && n.f && !n.l)) return e || new y(0);
    var i = !e || n,
      a = !n || n.i;
    n || (n = {}), e || (e = new y(r * 3));
    var b = function (Ce) {
        var je = e.length;
        if (Ce > je) {
          var Re = new y(Math.max(je * 2, Ce));
          Re.set(e), (e = Re);
        }
      },
      w = n.f || 0,
      s = n.p || 0,
      m = n.b || 0,
      T = n.l,
      D = n.d,
      O = n.m,
      B = n.n,
      ee = r * 8;
    do {
      if (!T) {
        w = E(t, s, 1);
        var te = E(t, s + 1, 3);
        if (((s += 3), te))
          if (te == 1) (T = Vt), (D = qt), (O = 9), (B = 5);
          else if (te == 2) {
            var ne = E(t, s, 31) + 257,
              Se = E(t, s + 10, 15) + 4,
              Te = ne + E(t, s + 5, 31) + 1;
            s += 14;
            for (var I = new y(Te), re = new y(19), x = 0; x < Se; ++x)
              re[Ft[x]] = E(t, s + x * 3, 7);
            s += Se * 3;
            for (
              var Ae = be(re), nt = (1 << Ae) - 1, rt = X(re, Ae, 1), x = 0;
              x < Te;

            ) {
              var De = rt[E(t, s, nt)];
              s += De & 15;
              var A = De >>> 4;
              if (A < 16) I[x++] = A;
              else {
                var R = 0,
                  J = 0;
                for (
                  A == 16
                    ? ((J = 3 + E(t, s, 3)), (s += 2), (R = I[x - 1]))
                    : A == 17
                    ? ((J = 3 + E(t, s, 7)), (s += 3))
                    : A == 18 && ((J = 11 + E(t, s, 127)), (s += 7));
                  J--;

                )
                  I[x++] = R;
              }
            }
            var Pe = I.subarray(0, ne),
              L = I.subarray(ne);
            (O = be(Pe)), (B = be(L)), (T = X(Pe, O, 1)), (D = X(L, B, 1));
          } else k(1);
        else {
          var A = Jt(s) + 4,
            _e = t[A - 4] | (t[A - 3] << 8),
            ie = A + _e;
          if (ie > r) {
            a && k(0);
            break;
          }
          i && b(m + _e),
            e.set(t.subarray(A, ie), m),
            (n.b = m += _e),
            (n.p = s = ie * 8),
            (n.f = w);
          continue;
        }
        if (s > ee) {
          a && k(0);
          break;
        }
      }
      i && b(m + 131072);
      for (var _t = (1 << O) - 1, it = (1 << B) - 1, oe = s; ; oe = s) {
        var R = T[le(t, s) & _t],
          $ = R >>> 4;
        if (((s += R & 15), s > ee)) {
          a && k(0);
          break;
        }
        if ((R || k(2), $ < 256)) e[m++] = $;
        else if ($ == 256) {
          (oe = s), (T = null);
          break;
        } else {
          var Le = $ - 254;
          if ($ > 264) {
            var x = $ - 257,
              Y = qe[x];
            (Le = E(t, s, (1 << Y) - 1) + Qe[x]), (s += Y);
          }
          var ce = D[le(t, s) & it],
            ae = ce >>> 4;
          ce || k(3), (s += ce & 15);
          var L = Xt[ae];
          if (ae > 3) {
            var Y = Je[ae];
            (L += le(t, s) & ((1 << Y) - 1)), (s += Y);
          }
          if (s > ee) {
            a && k(0);
            break;
          }
          i && b(m + 131072);
          for (var Oe = m + Le; m < Oe; m += 4)
            (e[m] = e[m - L]),
              (e[m + 1] = e[m + 1 - L]),
              (e[m + 2] = e[m + 2 - L]),
              (e[m + 3] = e[m + 3 - L]);
          m = Oe;
        }
      }
      (n.l = T),
        (n.p = oe),
        (n.b = m),
        (n.f = w),
        T && ((w = 1), (n.m = O), (n.d = D), (n.n = B));
    } while (!w);
    return m == e.length ? e : K(e, 0, m);
  },
  Qt = new y(0),
  Kt = function (t) {
    (t[0] != 31 || t[1] != 139 || t[2] != 8) && k(6, "invalid gzip data");
    var e = t[3],
      n = 10;
    e & 4 && (n += t[10] | ((t[11] << 8) + 2));
    for (var r = ((e >> 3) & 1) + ((e >> 4) & 1); r > 0; r -= !t[n++]);
    return n + (e & 2);
  },
  j = (function () {
    function t(e) {
      (this.s = {}), (this.p = new y(0)), (this.ondata = e);
    }
    return (
      (t.prototype.e = function (e) {
        this.ondata || k(5), this.d && k(4);
        var n = this.p.length,
          r = new y(n + e.length);
        r.set(this.p), r.set(e, n), (this.p = r);
      }),
      (t.prototype.c = function (e) {
        this.d = this.s.i = e || !1;
        var n = this.s.b,
          r = Gt(this.p, this.o, this.s);
        this.ondata(K(r, n, this.s.b), this.d),
          (this.o = K(r, this.s.b - 32768)),
          (this.s.b = this.o.length),
          (this.p = K(this.p, (this.s.p / 8) | 0)),
          (this.s.p &= 7);
      }),
      (t.prototype.push = function (e, n) {
        this.e(e), this.c(n);
      }),
      t
    );
  })(),
  en = (function () {
    function t(e) {
      (this.v = 1), j.call(this, e);
    }
    return (
      (t.prototype.push = function (e, n) {
        if ((j.prototype.e.call(this, e), this.v)) {
          var r = this.p.length > 3 ? Kt(this.p) : 4;
          if (r >= this.p.length && !n) return;
          (this.p = this.p.subarray(r)), (this.v = 0);
        }
        n &&
          (this.p.length < 8 && k(6, "invalid gzip data"),
          (this.p = this.p.subarray(0, -8))),
          j.prototype.c.call(this, n);
      }),
      t
    );
  })(),
  tn = (function () {
    function t(e) {
      (this.v = 1), j.call(this, e);
    }
    return (
      (t.prototype.push = function (e, n) {
        if ((j.prototype.e.call(this, e), this.v)) {
          if (this.p.length < 2 && !n) return;
          (this.p = this.p.subarray(2)), (this.v = 0);
        }
        n &&
          (this.p.length < 4 && k(6, "invalid zlib data"),
          (this.p = this.p.subarray(0, -4))),
          j.prototype.c.call(this, n);
      }),
      t
    );
  })(),
  nn = (function () {
    function t(e) {
      (this.G = en), (this.I = j), (this.Z = tn), (this.ondata = e);
    }
    return (
      (t.prototype.push = function (e, n) {
        if ((this.ondata || k(5), this.s)) this.s.push(e, n);
        else {
          if (this.p && this.p.length) {
            var r = new y(this.p.length + e.length);
            r.set(this.p), r.set(e, this.p.length);
          } else this.p = e;
          if (this.p.length > 2) {
            var i = this,
              a = function () {
                i.ondata.apply(i, arguments);
              };
            (this.s =
              this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8
                ? new this.G(a)
                : (this.p[0] & 15) != 8 ||
                  this.p[0] >> 4 > 7 ||
                  ((this.p[0] << 8) | this.p[1]) % 31
                ? new this.I(a)
                : new this.Z(a)),
              this.s.push(this.p, n),
              (this.p = null);
          }
        }
      }),
      t
    );
  })(),
  rn = typeof TextDecoder < "u" && new TextDecoder(),
  _n = 0;
try {
  rn.decode(Qt, { stream: !0 }), (_n = 1);
} catch {}
var on = "./perspective_bg.wasm";
async function cn() {
  return new URL(on, import.meta.url);
}
var an = cn();
window.addEventListener("unhandledrejection", (t) => {
  t.reason?.message === "View method cancelled" && t.preventDefault();
});
function se(t) {
  return new Uint32Array(t.slice(0, 4))[0] == 559903;
}
async function un() {
  let t = await an,
    e = [],
    n = 0,
    r = new nn((b) => {
      b && ((n += b.byteLength), e.push(b));
    });
  if (t instanceof URL || typeof t == "string") {
    let b = (await fetch(t.toString())).body?.getReader(),
      w = 0;
    if (b !== void 0)
      for (;;) {
        let { value: s, done: m } = await b.read();
        if (m || s === void 0) break;
        (w === 0 && se(s?.buffer)) || w === 1
          ? ((w = 1), r.push(s, m))
          : ((w = 2), (n += s.byteLength), e.push(s));
      }
  } else if (t instanceof Uint8Array)
    se(t.buffer) ? r.push(t, !0) : ((n = t.byteLength), (e = [t]));
  else {
    let b = new Uint8Array(t);
    se(t) ? r.push(b, !0) : ((n = b.byteLength), (e = [b]));
  }
  let i = 0,
    a = new Uint8Array(n);
  for (let b of e) a.set(b, i), (i += b.byteLength);
  return await ze(a), Ne(), ke;
}
var tt = un(),
  Ee = class extends HTMLElement {
    constructor() {
      super(), this.__load_wasm();
    }
    async __load_wasm() {
      await tt, this._instance === void 0 && (this._instance = new V(this));
    }
  },
  bn = V.prototype,
  ln = Object.getOwnPropertyNames(bn);
for (let t of ln)
  Object.defineProperty(Ee.prototype, t, {
    value: async function (...e) {
      return (
        await this.__load_wasm(),
        await this._instance[t].call(this._instance, ...e)
      );
    },
  });
for (let t of ["registerPlugin", "getExprTKCommands"])
  Object.defineProperty(Ee, t, {
    value: async function (...e) {
      let n = await tt;
      return n[t].call(n, ...e);
    },
  });
customElements.define("perspective-viewer", Ee);
var fn = {};
export {
  at as HTMLPerspectiveViewerPluginElement,
  sn as convert,
  fn as default,
};
//# sourceMappingURL=perspective-viewer.js.map
