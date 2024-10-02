import Ce from "react";
import { z as E } from "zod";
var _r = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hr(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Q = { exports: {} }, F = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function vr() {
  if (Oe) return F;
  Oe = 1;
  var u = Ce, j = Symbol.for("react.element"), V = Symbol.for("react.fragment"), T = Object.prototype.hasOwnProperty, L = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, W = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(h, d, O) {
    var g, _ = {}, m = null, U = null;
    O !== void 0 && (m = "" + O), d.key !== void 0 && (m = "" + d.key), d.ref !== void 0 && (U = d.ref);
    for (g in d) T.call(d, g) && !W.hasOwnProperty(g) && (_[g] = d[g]);
    if (h && h.defaultProps) for (g in d = h.defaultProps, d) _[g] === void 0 && (_[g] = d[g]);
    return { $$typeof: j, type: h, key: m, ref: U, props: _, _owner: L.current };
  }
  return F.Fragment = V, F.jsx = x, F.jsxs = x, F;
}
var I = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function pr() {
  return we || (we = 1, process.env.NODE_ENV !== "production" && function() {
    var u = Ce, j = Symbol.for("react.element"), V = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), W = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), h = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), U = Symbol.for("react.offscreen"), ee = Symbol.iterator, xe = "@@iterator";
    function ke(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = ee && e[ee] || e[xe];
      return typeof r == "function" ? r : null;
    }
    var w = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function c(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Ae("error", e, t);
      }
    }
    function Ae(e, r, t) {
      {
        var n = w.ReactDebugCurrentFrame, o = n.getStackAddendum();
        o !== "" && (r += "%s", t = t.concat([o]));
        var s = t.map(function(i) {
          return String(i);
        });
        s.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var De = !1, Fe = !1, Ie = !1, Le = !1, We = !1, re;
    re = Symbol.for("react.module.reference");
    function Ue(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === T || e === W || We || e === L || e === O || e === g || Le || e === U || De || Fe || Ie || typeof e == "object" && e !== null && (e.$$typeof === m || e.$$typeof === _ || e.$$typeof === x || e.$$typeof === h || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === re || e.getModuleId !== void 0));
    }
    function Ye(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var o = r.displayName || r.name || "";
      return o !== "" ? t + "(" + o + ")" : t;
    }
    function te(e) {
      return e.displayName || "Context";
    }
    function y(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case T:
          return "Fragment";
        case V:
          return "Portal";
        case W:
          return "Profiler";
        case L:
          return "StrictMode";
        case O:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            var r = e;
            return te(r) + ".Consumer";
          case x:
            var t = e;
            return te(t._context) + ".Provider";
          case d:
            return Ye(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : y(e.type) || "Memo";
          case m: {
            var o = e, s = o._payload, i = o._init;
            try {
              return y(i(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var R = Object.assign, k = 0, ne, ae, ie, oe, ue, se, le;
    function fe() {
    }
    fe.__reactDisabledLog = !0;
    function $e() {
      {
        if (k === 0) {
          ne = console.log, ae = console.info, ie = console.warn, oe = console.error, ue = console.group, se = console.groupCollapsed, le = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: fe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        k++;
      }
    }
    function Ne() {
      {
        if (k--, k === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: R({}, e, {
              value: ne
            }),
            info: R({}, e, {
              value: ae
            }),
            warn: R({}, e, {
              value: ie
            }),
            error: R({}, e, {
              value: oe
            }),
            group: R({}, e, {
              value: ue
            }),
            groupCollapsed: R({}, e, {
              value: se
            }),
            groupEnd: R({}, e, {
              value: le
            })
          });
        }
        k < 0 && c("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var B = w.ReactCurrentDispatcher, G;
    function Y(e, r, t) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (o) {
            var n = o.stack.trim().match(/\n( *(at )?)/);
            G = n && n[1] || "";
          }
        return `
` + G + e;
      }
    }
    var q = !1, $;
    {
      var Me = typeof WeakMap == "function" ? WeakMap : Map;
      $ = new Me();
    }
    function ce(e, r) {
      if (!e || q)
        return "";
      {
        var t = $.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      q = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = B.current, B.current = null, $e();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (p) {
              n = p;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (p) {
              n = p;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (p) {
            n = p;
          }
          e();
        }
      } catch (p) {
        if (p && n && typeof p.stack == "string") {
          for (var a = p.stack.split(`
`), v = n.stack.split(`
`), l = a.length - 1, f = v.length - 1; l >= 1 && f >= 0 && a[l] !== v[f]; )
            f--;
          for (; l >= 1 && f >= 0; l--, f--)
            if (a[l] !== v[f]) {
              if (l !== 1 || f !== 1)
                do
                  if (l--, f--, f < 0 || a[l] !== v[f]) {
                    var b = `
` + a[l].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && $.set(e, b), b;
                  }
                while (l >= 1 && f >= 0);
              break;
            }
        }
      } finally {
        q = !1, B.current = s, Ne(), Error.prepareStackTrace = o;
      }
      var P = e ? e.displayName || e.name : "", S = P ? Y(P) : "";
      return typeof e == "function" && $.set(e, S), S;
    }
    function Ve(e, r, t) {
      return ce(e, !1);
    }
    function Be(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function N(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ce(e, Be(e));
      if (typeof e == "string")
        return Y(e);
      switch (e) {
        case O:
          return Y("Suspense");
        case g:
          return Y("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Ve(e.render);
          case _:
            return N(e.type, r, t);
          case m: {
            var n = e, o = n._payload, s = n._init;
            try {
              return N(s(o), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var A = Object.prototype.hasOwnProperty, de = {}, ve = w.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        ve.setExtraStackFrame(t);
      } else
        ve.setExtraStackFrame(null);
    }
    function Ge(e, r, t, n, o) {
      {
        var s = Function.call.bind(A);
        for (var i in e)
          if (s(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var v = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (l) {
              a = l;
            }
            a && !(a instanceof Error) && (M(o), c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), M(null)), a instanceof Error && !(a.message in de) && (de[a.message] = !0, M(o), c("Failed %s type: %s", t, a.message), M(null));
          }
      }
    }
    var qe = Array.isArray;
    function J(e) {
      return qe(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ke(e) {
      try {
        return pe(e), !1;
      } catch {
        return !0;
      }
    }
    function pe(e) {
      return "" + e;
    }
    function ge(e) {
      if (Ke(e))
        return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), pe(e);
    }
    var D = w.ReactCurrentOwner, Xe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ee, be, K;
    K = {};
    function ze(e) {
      if (A.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function He(e) {
      if (A.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      if (typeof e.ref == "string" && D.current && r && D.current.stateNode !== r) {
        var t = y(D.current.type);
        K[t] || (c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y(D.current.type), e.ref), K[t] = !0);
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          Ee || (Ee = !0, c("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var t = function() {
          be || (be = !0, c("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, t, n, o, s, i) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: j,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: s
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function tr(e, r, t, n, o) {
      {
        var s, i = {}, a = null, v = null;
        t !== void 0 && (ge(t), a = "" + t), He(r) && (ge(r.key), a = "" + r.key), ze(r) && (v = r.ref, Ze(r, o));
        for (s in r)
          A.call(r, s) && !Xe.hasOwnProperty(s) && (i[s] = r[s]);
        if (e && e.defaultProps) {
          var l = e.defaultProps;
          for (s in l)
            i[s] === void 0 && (i[s] = l[s]);
        }
        if (a || v) {
          var f = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Qe(i, f), v && er(i, f);
        }
        return rr(e, a, v, o, n, D.current, i);
      }
    }
    var X = w.ReactCurrentOwner, ye = w.ReactDebugCurrentFrame;
    function C(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(t);
      } else
        ye.setExtraStackFrame(null);
    }
    var z;
    z = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === j;
    }
    function _e() {
      {
        if (X.current) {
          var e = y(X.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function nr(e) {
      return "";
    }
    var he = {};
    function ar(e) {
      {
        var r = _e();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function me(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = ar(r);
        if (he[t])
          return;
        he[t] = !0;
        var n = "";
        e && e._owner && e._owner !== X.current && (n = " It was passed a child from " + y(e._owner.type) + "."), C(e), c('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), C(null);
      }
    }
    function Re(e, r) {
      {
        if (typeof e != "object")
          return;
        if (J(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            H(n) && me(n, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var o = ke(e);
          if (typeof o == "function" && o !== e.entries)
            for (var s = o.call(e), i; !(i = s.next()).done; )
              H(i.value) && me(i.value, r);
        }
      }
    }
    function ir(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = y(r);
          Ge(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !z) {
          z = !0;
          var o = y(r);
          c("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && c("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function or(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            C(e), c("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), C(null);
            break;
          }
        }
        e.ref !== null && (C(e), c("Invalid attribute `ref` supplied to `React.Fragment`."), C(null));
      }
    }
    var Se = {};
    function Te(e, r, t, n, o, s) {
      {
        var i = Ue(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var v = nr();
          v ? a += v : a += _e();
          var l;
          e === null ? l = "null" : J(e) ? l = "array" : e !== void 0 && e.$$typeof === j ? (l = "<" + (y(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : l = typeof e, c("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", l, a);
        }
        var f = tr(e, r, t, o, s);
        if (f == null)
          return f;
        if (i) {
          var b = r.children;
          if (b !== void 0)
            if (n)
              if (J(b)) {
                for (var P = 0; P < b.length; P++)
                  Re(b[P], e);
                Object.freeze && Object.freeze(b);
              } else
                c("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Re(b, e);
        }
        if (A.call(r, "key")) {
          var S = y(e), p = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), Z = p.length > 0 ? "{key: someKey, " + p.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Se[S + Z]) {
            var cr = p.length > 0 ? "{" + p.join(": ..., ") + ": ...}" : "{}";
            c(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Z, S, cr, S), Se[S + Z] = !0;
          }
        }
        return e === T ? or(f) : ir(f), f;
      }
    }
    function ur(e, r, t) {
      return Te(e, r, t, !0);
    }
    function sr(e, r, t) {
      return Te(e, r, t, !1);
    }
    var lr = sr, fr = ur;
    I.Fragment = T, I.jsx = lr, I.jsxs = fr;
  }()), I;
}
process.env.NODE_ENV === "production" ? Q.exports = vr() : Q.exports = pr();
var mr = Q.exports, Pe = /* @__PURE__ */ ((u) => (u.TERM_CLARIFICATION = "TermClarification", u.GENERAL_GUIDELINES = "GeneralGuidelines", u.BUSINESS_EXPLANATION = "BusinessExplanation", u))(Pe || {}), gr = /* @__PURE__ */ ((u) => (u.DocGen = "DocGen", u.ChartBot = "ChartBot", u.SqlBot = "SqlExpert", u))(gr || {}), je = /* @__PURE__ */ ((u) => (u.USER_SPECIFIC = "UserSpecific", u.ALL_USERS = "AllUsers", u))(je || {});
const Rr = E.object({
  train_doc_uid: E.string(),
  userId: E.string(),
  display_name: E.string(),
  taskLabel: E.string(),
  category: E.enum(Object.values(Pe)),
  personalizationScope: E.enum(Object.values(je)).default(
    "UserSpecific"
    /* USER_SPECIFIC */
  ),
  createdDate: E.string(),
  updatedDate: E.string(),
  content: E.string().min(10, { message: "Learning must be at least 10 characters" }).max(500, { message: "Learning must not exceed 500 characters" }).min(1, { message: "Learning is required" }),
  metadata: E.record(E.unknown()).optional(),
  isActive: E.boolean().default(!0)
});
var Er = /* @__PURE__ */ ((u) => (u.EXTENSION = "extension", u.SAAS = "saas", u))(Er || {});
export {
  Pe as C,
  je as P,
  Er as T,
  gr as a,
  _r as c,
  hr as g,
  mr as j,
  Rr as l
};
