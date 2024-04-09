import './main.css';
import * as Ee from "react";
import oe, { createContext as Qe, useReducer as Uo, useCallback as Ke, useMemo as lt, useContext as et, useLayoutEffect as zo, useEffect as Ae, useRef as Te, useState as ge, useId as Ir, useInsertionEffect as Vo, cloneElement as qo, Children as Ge, isValidElement as xr, Component as Wo, createElement as Yn, lazy as Yo } from "react";
import { Tooltip as Ko, Button as Pt, Spinner as Go, Card as Ft, CardTitle as Nr, CardBody as Mt, CloseButton as Xo } from "reactstrap";
import Zo, { createPortal as jr } from "react-dom";
import { Light as bn } from "react-syntax-highlighter";
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var un = { exports: {} }, it = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kn;
function Qo() {
  if (Kn)
    return it;
  Kn = 1;
  var e = oe, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(a, c, f) {
    var u, l = {}, d = null, h = null;
    f !== void 0 && (d = "" + f), c.key !== void 0 && (d = "" + c.key), c.ref !== void 0 && (h = c.ref);
    for (u in c)
      n.call(c, u) && !i.hasOwnProperty(u) && (l[u] = c[u]);
    if (a && a.defaultProps)
      for (u in c = a.defaultProps, c)
        l[u] === void 0 && (l[u] = c[u]);
    return { $$typeof: t, type: a, key: d, ref: h, props: l, _owner: r.current };
  }
  return it.Fragment = o, it.jsx = s, it.jsxs = s, it;
}
var st = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gn;
function ei() {
  return Gn || (Gn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = oe, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), p = Symbol.iterator, m = "@@iterator";
    function v(g) {
      if (g === null || typeof g != "object")
        return null;
      var j = p && g[p] || g[m];
      return typeof j == "function" ? j : null;
    }
    var _ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(g) {
      {
        for (var j = arguments.length, H = new Array(j > 1 ? j - 1 : 0), Z = 1; Z < j; Z++)
          H[Z - 1] = arguments[Z];
        S("error", g, H);
      }
    }
    function S(g, j, H) {
      {
        var Z = _.ReactDebugCurrentFrame, ie = Z.getStackAddendum();
        ie !== "" && (j += "%s", H = H.concat([ie]));
        var ue = H.map(function(re) {
          return String(re);
        });
        ue.unshift("Warning: " + j), Function.prototype.apply.call(console[g], console, ue);
      }
    }
    var R = !1, y = !1, x = !1, F = !1, E = !1, B;
    B = Symbol.for("react.module.reference");
    function O(g) {
      return !!(typeof g == "string" || typeof g == "function" || g === n || g === i || E || g === r || g === f || g === u || F || g === h || R || y || x || typeof g == "object" && g !== null && (g.$$typeof === d || g.$$typeof === l || g.$$typeof === s || g.$$typeof === a || g.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      g.$$typeof === B || g.getModuleId !== void 0));
    }
    function M(g, j, H) {
      var Z = g.displayName;
      if (Z)
        return Z;
      var ie = j.displayName || j.name || "";
      return ie !== "" ? H + "(" + ie + ")" : H;
    }
    function G(g) {
      return g.displayName || "Context";
    }
    function W(g) {
      if (g == null)
        return null;
      if (typeof g.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof g == "function")
        return g.displayName || g.name || null;
      if (typeof g == "string")
        return g;
      switch (g) {
        case n:
          return "Fragment";
        case o:
          return "Portal";
        case i:
          return "Profiler";
        case r:
          return "StrictMode";
        case f:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof g == "object")
        switch (g.$$typeof) {
          case a:
            var j = g;
            return G(j) + ".Consumer";
          case s:
            var H = g;
            return G(H._context) + ".Provider";
          case c:
            return M(g, g.render, "ForwardRef");
          case l:
            var Z = g.displayName || null;
            return Z !== null ? Z : W(g.type) || "Memo";
          case d: {
            var ie = g, ue = ie._payload, re = ie._init;
            try {
              return W(re(ue));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var N = Object.assign, D = 0, T, I, w, L, C, A, U;
    function z() {
    }
    z.__reactDisabledLog = !0;
    function V() {
      {
        if (D === 0) {
          T = console.log, I = console.info, w = console.warn, L = console.error, C = console.group, A = console.groupCollapsed, U = console.groupEnd;
          var g = {
            configurable: !0,
            enumerable: !0,
            value: z,
            writable: !0
          };
          Object.defineProperties(console, {
            info: g,
            log: g,
            warn: g,
            error: g,
            group: g,
            groupCollapsed: g,
            groupEnd: g
          });
        }
        D++;
      }
    }
    function X() {
      {
        if (D--, D === 0) {
          var g = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: N({}, g, {
              value: T
            }),
            info: N({}, g, {
              value: I
            }),
            warn: N({}, g, {
              value: w
            }),
            error: N({}, g, {
              value: L
            }),
            group: N({}, g, {
              value: C
            }),
            groupCollapsed: N({}, g, {
              value: A
            }),
            groupEnd: N({}, g, {
              value: U
            })
          });
        }
        D < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Y = _.ReactCurrentDispatcher, K;
    function J(g, j, H) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (ie) {
            var Z = ie.stack.trim().match(/\n( *(at )?)/);
            K = Z && Z[1] || "";
          }
        return `
` + K + g;
      }
    }
    var Q = !1, q;
    {
      var ce = typeof WeakMap == "function" ? WeakMap : Map;
      q = new ce();
    }
    function k(g, j) {
      if (!g || Q)
        return "";
      {
        var H = q.get(g);
        if (H !== void 0)
          return H;
      }
      var Z;
      Q = !0;
      var ie = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ue;
      ue = Y.current, Y.current = null, V();
      try {
        if (j) {
          var re = function() {
            throw Error();
          };
          if (Object.defineProperty(re.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(re, []);
            } catch (Ie) {
              Z = Ie;
            }
            Reflect.construct(g, [], re);
          } else {
            try {
              re.call();
            } catch (Ie) {
              Z = Ie;
            }
            g.call(re.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ie) {
            Z = Ie;
          }
          g();
        }
      } catch (Ie) {
        if (Ie && Z && typeof Ie.stack == "string") {
          for (var ne = Ie.stack.split(`
`), ve = Z.stack.split(`
`), fe = ne.length - 1, pe = ve.length - 1; fe >= 1 && pe >= 0 && ne[fe] !== ve[pe]; )
            pe--;
          for (; fe >= 1 && pe >= 0; fe--, pe--)
            if (ne[fe] !== ve[pe]) {
              if (fe !== 1 || pe !== 1)
                do
                  if (fe--, pe--, pe < 0 || ne[fe] !== ve[pe]) {
                    var Se = `
` + ne[fe].replace(" at new ", " at ");
                    return g.displayName && Se.includes("<anonymous>") && (Se = Se.replace("<anonymous>", g.displayName)), typeof g == "function" && q.set(g, Se), Se;
                  }
                while (fe >= 1 && pe >= 0);
              break;
            }
        }
      } finally {
        Q = !1, Y.current = ue, X(), Error.prepareStackTrace = ie;
      }
      var ze = g ? g.displayName || g.name : "", Wn = ze ? J(ze) : "";
      return typeof g == "function" && q.set(g, Wn), Wn;
    }
    function he(g, j, H) {
      return k(g, !1);
    }
    function He(g) {
      var j = g.prototype;
      return !!(j && j.isReactComponent);
    }
    function Me(g, j, H) {
      if (g == null)
        return "";
      if (typeof g == "function")
        return k(g, He(g));
      if (typeof g == "string")
        return J(g);
      switch (g) {
        case f:
          return J("Suspense");
        case u:
          return J("SuspenseList");
      }
      if (typeof g == "object")
        switch (g.$$typeof) {
          case c:
            return he(g.render);
          case l:
            return Me(g.type, j, H);
          case d: {
            var Z = g, ie = Z._payload, ue = Z._init;
            try {
              return Me(ue(ie), j, H);
            } catch {
            }
          }
        }
      return "";
    }
    var vt = Object.prototype.hasOwnProperty, Pn = {}, Fn = _.ReactDebugCurrentFrame;
    function mt(g) {
      if (g) {
        var j = g._owner, H = Me(g.type, g._source, j ? j.type : null);
        Fn.setExtraStackFrame(H);
      } else
        Fn.setExtraStackFrame(null);
    }
    function So(g, j, H, Z, ie) {
      {
        var ue = Function.call.bind(vt);
        for (var re in g)
          if (ue(g, re)) {
            var ne = void 0;
            try {
              if (typeof g[re] != "function") {
                var ve = Error((Z || "React class") + ": " + H + " type `" + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ve.name = "Invariant Violation", ve;
              }
              ne = g[re](j, re, Z, H, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (fe) {
              ne = fe;
            }
            ne && !(ne instanceof Error) && (mt(ie), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Z || "React class", H, re, typeof ne), mt(null)), ne instanceof Error && !(ne.message in Pn) && (Pn[ne.message] = !0, mt(ie), b("Failed %s type: %s", H, ne.message), mt(null));
          }
      }
    }
    var Co = Array.isArray;
    function Vt(g) {
      return Co(g);
    }
    function To(g) {
      {
        var j = typeof Symbol == "function" && Symbol.toStringTag, H = j && g[Symbol.toStringTag] || g.constructor.name || "Object";
        return H;
      }
    }
    function Oo(g) {
      try {
        return Mn(g), !1;
      } catch {
        return !0;
      }
    }
    function Mn(g) {
      return "" + g;
    }
    function $n(g) {
      if (Oo(g))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", To(g)), Mn(g);
    }
    var ot = _.ReactCurrentOwner, Ro = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, kn, Ln, qt;
    qt = {};
    function Ao(g) {
      if (vt.call(g, "ref")) {
        var j = Object.getOwnPropertyDescriptor(g, "ref").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return g.ref !== void 0;
    }
    function Do(g) {
      if (vt.call(g, "key")) {
        var j = Object.getOwnPropertyDescriptor(g, "key").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return g.key !== void 0;
    }
    function wo(g, j) {
      if (typeof g.ref == "string" && ot.current && j && ot.current.stateNode !== j) {
        var H = W(ot.current.type);
        qt[H] || (b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', W(ot.current.type), g.ref), qt[H] = !0);
      }
    }
    function Io(g, j) {
      {
        var H = function() {
          kn || (kn = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        H.isReactWarning = !0, Object.defineProperty(g, "key", {
          get: H,
          configurable: !0
        });
      }
    }
    function xo(g, j) {
      {
        var H = function() {
          Ln || (Ln = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        H.isReactWarning = !0, Object.defineProperty(g, "ref", {
          get: H,
          configurable: !0
        });
      }
    }
    var No = function(g, j, H, Z, ie, ue, re) {
      var ne = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: g,
        key: j,
        ref: H,
        props: re,
        // Record the component responsible for creating this element.
        _owner: ue
      };
      return ne._store = {}, Object.defineProperty(ne._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ne, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Z
      }), Object.defineProperty(ne, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ie
      }), Object.freeze && (Object.freeze(ne.props), Object.freeze(ne)), ne;
    };
    function jo(g, j, H, Z, ie) {
      {
        var ue, re = {}, ne = null, ve = null;
        H !== void 0 && ($n(H), ne = "" + H), Do(j) && ($n(j.key), ne = "" + j.key), Ao(j) && (ve = j.ref, wo(j, ie));
        for (ue in j)
          vt.call(j, ue) && !Ro.hasOwnProperty(ue) && (re[ue] = j[ue]);
        if (g && g.defaultProps) {
          var fe = g.defaultProps;
          for (ue in fe)
            re[ue] === void 0 && (re[ue] = fe[ue]);
        }
        if (ne || ve) {
          var pe = typeof g == "function" ? g.displayName || g.name || "Unknown" : g;
          ne && Io(re, pe), ve && xo(re, pe);
        }
        return No(g, ne, ve, ie, Z, ot.current, re);
      }
    }
    var Wt = _.ReactCurrentOwner, Bn = _.ReactDebugCurrentFrame;
    function Ue(g) {
      if (g) {
        var j = g._owner, H = Me(g.type, g._source, j ? j.type : null);
        Bn.setExtraStackFrame(H);
      } else
        Bn.setExtraStackFrame(null);
    }
    var Yt;
    Yt = !1;
    function Kt(g) {
      return typeof g == "object" && g !== null && g.$$typeof === t;
    }
    function Hn() {
      {
        if (Wt.current) {
          var g = W(Wt.current.type);
          if (g)
            return `

Check the render method of \`` + g + "`.";
        }
        return "";
      }
    }
    function Po(g) {
      {
        if (g !== void 0) {
          var j = g.fileName.replace(/^.*[\\\/]/, ""), H = g.lineNumber;
          return `

Check your code at ` + j + ":" + H + ".";
        }
        return "";
      }
    }
    var Un = {};
    function Fo(g) {
      {
        var j = Hn();
        if (!j) {
          var H = typeof g == "string" ? g : g.displayName || g.name;
          H && (j = `

Check the top-level render call using <` + H + ">.");
        }
        return j;
      }
    }
    function zn(g, j) {
      {
        if (!g._store || g._store.validated || g.key != null)
          return;
        g._store.validated = !0;
        var H = Fo(j);
        if (Un[H])
          return;
        Un[H] = !0;
        var Z = "";
        g && g._owner && g._owner !== Wt.current && (Z = " It was passed a child from " + W(g._owner.type) + "."), Ue(g), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', H, Z), Ue(null);
      }
    }
    function Vn(g, j) {
      {
        if (typeof g != "object")
          return;
        if (Vt(g))
          for (var H = 0; H < g.length; H++) {
            var Z = g[H];
            Kt(Z) && zn(Z, j);
          }
        else if (Kt(g))
          g._store && (g._store.validated = !0);
        else if (g) {
          var ie = v(g);
          if (typeof ie == "function" && ie !== g.entries)
            for (var ue = ie.call(g), re; !(re = ue.next()).done; )
              Kt(re.value) && zn(re.value, j);
        }
      }
    }
    function Mo(g) {
      {
        var j = g.type;
        if (j == null || typeof j == "string")
          return;
        var H;
        if (typeof j == "function")
          H = j.propTypes;
        else if (typeof j == "object" && (j.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        j.$$typeof === l))
          H = j.propTypes;
        else
          return;
        if (H) {
          var Z = W(j);
          So(H, g.props, "prop", Z, g);
        } else if (j.PropTypes !== void 0 && !Yt) {
          Yt = !0;
          var ie = W(j);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ie || "Unknown");
        }
        typeof j.getDefaultProps == "function" && !j.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function $o(g) {
      {
        for (var j = Object.keys(g.props), H = 0; H < j.length; H++) {
          var Z = j[H];
          if (Z !== "children" && Z !== "key") {
            Ue(g), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Z), Ue(null);
            break;
          }
        }
        g.ref !== null && (Ue(g), b("Invalid attribute `ref` supplied to `React.Fragment`."), Ue(null));
      }
    }
    function qn(g, j, H, Z, ie, ue) {
      {
        var re = O(g);
        if (!re) {
          var ne = "";
          (g === void 0 || typeof g == "object" && g !== null && Object.keys(g).length === 0) && (ne += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ve = Po(ie);
          ve ? ne += ve : ne += Hn();
          var fe;
          g === null ? fe = "null" : Vt(g) ? fe = "array" : g !== void 0 && g.$$typeof === t ? (fe = "<" + (W(g.type) || "Unknown") + " />", ne = " Did you accidentally export a JSX literal instead of a component?") : fe = typeof g, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", fe, ne);
        }
        var pe = jo(g, j, H, ie, ue);
        if (pe == null)
          return pe;
        if (re) {
          var Se = j.children;
          if (Se !== void 0)
            if (Z)
              if (Vt(Se)) {
                for (var ze = 0; ze < Se.length; ze++)
                  Vn(Se[ze], g);
                Object.freeze && Object.freeze(Se);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Vn(Se, g);
        }
        return g === n ? $o(pe) : Mo(pe), pe;
      }
    }
    function ko(g, j, H) {
      return qn(g, j, H, !0);
    }
    function Lo(g, j, H) {
      return qn(g, j, H, !1);
    }
    var Bo = Lo, Ho = ko;
    st.Fragment = n, st.jsx = Bo, st.jsxs = Ho;
  }()), st;
}
process.env.NODE_ENV === "production" ? un.exports = Qo() : un.exports = ei();
var P = un.exports;
const ti = () => {
  var t, o, n;
  const e = (n = (o = (t = window.location.hash) == null ? void 0 : t.split("#")[1]) == null ? void 0 : o.replace("!/", "")) == null ? void 0 : n.split("/");
  return { name: e == null ? void 0 : e[1], resourceType: e == null ? void 0 : e[0] };
};
var Ce = /* @__PURE__ */ ((e) => (e[e.LOADING = 0] = "LOADING", e[e.UNINITIALIZED = 1] = "UNINITIALIZED", e[e.INITIALIZED = 2] = "INITIALIZED", e))(Ce || {});
function ni(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function ri(e) {
  return ni(e) && "type" in e && typeof e.type == "string";
}
var Pr = Symbol.for("immer-nothing"), Xn = Symbol.for("immer-draftable"), be = Symbol.for("immer-state"), oi = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function ye(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const o = oi[e], n = typeof o == "function" ? o.apply(null, t) : o;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Xe = Object.getPrototypeOf;
function Pe(e) {
  return !!e && !!e[be];
}
function Ne(e) {
  var t;
  return e ? Fr(e) || Array.isArray(e) || !!e[Xn] || !!((t = e.constructor) != null && t[Xn]) || kt(e) || Lt(e) : !1;
}
var ii = Object.prototype.constructor.toString();
function Fr(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Xe(e);
  if (t === null)
    return !0;
  const o = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return o === Object ? !0 : typeof o == "function" && Function.toString.call(o) === ii;
}
function At(e, t) {
  $t(e) === 0 ? Reflect.ownKeys(e).forEach((o) => {
    t(o, e[o], e);
  }) : e.forEach((o, n) => t(n, o, e));
}
function $t(e) {
  const t = e[be];
  return t ? t.type_ : Array.isArray(e) ? 1 : kt(e) ? 2 : Lt(e) ? 3 : 0;
}
function cn(e, t) {
  return $t(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Mr(e, t, o) {
  const n = $t(e);
  n === 2 ? e.set(t, o) : n === 3 ? e.add(o) : e[t] = o;
}
function si(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function kt(e) {
  return e instanceof Map;
}
function Lt(e) {
  return e instanceof Set;
}
function $e(e) {
  return e.copy_ || e.base_;
}
function ln(e, t) {
  if (kt(e))
    return new Map(e);
  if (Lt(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && Fr(e))
    return Xe(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const o = Object.getOwnPropertyDescriptors(e);
  delete o[be];
  let n = Reflect.ownKeys(o);
  for (let r = 0; r < n.length; r++) {
    const i = n[r], s = o[i];
    s.writable === !1 && (s.writable = !0, s.configurable = !0), (s.get || s.set) && (o[i] = {
      configurable: !0,
      writable: !0,
      // could live with !!desc.set as well here...
      enumerable: s.enumerable,
      value: e[i]
    });
  }
  return Object.create(Xe(e), o);
}
function _n(e, t = !1) {
  return Bt(e) || Pe(e) || !Ne(e) || ($t(e) > 1 && (e.set = e.add = e.clear = e.delete = ai), Object.freeze(e), t && Object.entries(e).forEach(([o, n]) => _n(n, !0))), e;
}
function ai() {
  ye(2);
}
function Bt(e) {
  return Object.isFrozen(e);
}
var ui = {};
function Be(e) {
  const t = ui[e];
  return t || ye(0, e), t;
}
var ft;
function $r() {
  return ft;
}
function ci(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function Zn(e, t) {
  t && (Be("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function fn(e) {
  dn(e), e.drafts_.forEach(li), e.drafts_ = null;
}
function dn(e) {
  e === ft && (ft = e.parent_);
}
function Jn(e) {
  return ft = ci(ft, e);
}
function li(e) {
  const t = e[be];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Qn(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const o = t.drafts_[0];
  return e !== void 0 && e !== o ? (o[be].modified_ && (fn(t), ye(4)), Ne(e) && (e = Dt(t, e), t.parent_ || wt(t, e)), t.patches_ && Be("Patches").generateReplacementPatches_(
    o[be].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Dt(t, o, []), fn(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Pr ? e : void 0;
}
function Dt(e, t, o) {
  if (Bt(t))
    return t;
  const n = t[be];
  if (!n)
    return At(
      t,
      (r, i) => er(e, n, t, r, i, o)
    ), t;
  if (n.scope_ !== e)
    return t;
  if (!n.modified_)
    return wt(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    n.finalized_ = !0, n.scope_.unfinalizedDrafts_--;
    const r = n.copy_;
    let i = r, s = !1;
    n.type_ === 3 && (i = new Set(r), r.clear(), s = !0), At(
      i,
      (a, c) => er(e, n, r, a, c, o, s)
    ), wt(e, r, !1), o && e.patches_ && Be("Patches").generatePatches_(
      n,
      o,
      e.patches_,
      e.inversePatches_
    );
  }
  return n.copy_;
}
function er(e, t, o, n, r, i, s) {
  if (process.env.NODE_ENV !== "production" && r === o && ye(5), Pe(r)) {
    const a = i && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !cn(t.assigned_, n) ? i.concat(n) : void 0, c = Dt(e, r, a);
    if (Mr(o, n, c), Pe(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    s && o.add(r);
  if (Ne(r) && !Bt(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Dt(e, r), (!t || !t.scope_.parent_) && typeof n != "symbol" && Object.prototype.propertyIsEnumerable.call(o, n) && wt(e, r);
  }
}
function wt(e, t, o = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && _n(t, o);
}
function fi(e, t) {
  const o = Array.isArray(e), n = {
    type_: o ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : $r(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let r = n, i = Sn;
  o && (r = [n], i = dt);
  const { revoke: s, proxy: a } = Proxy.revocable(r, i);
  return n.draft_ = a, n.revoke_ = s, a;
}
var Sn = {
  get(e, t) {
    if (t === be)
      return e;
    const o = $e(e);
    if (!cn(o, t))
      return di(e, o, t);
    const n = o[t];
    return e.finalized_ || !Ne(n) ? n : n === Gt(e.base_, t) ? (Xt(e), e.copy_[t] = hn(n, e)) : n;
  },
  has(e, t) {
    return t in $e(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys($e(e));
  },
  set(e, t, o) {
    const n = kr($e(e), t);
    if (n != null && n.set)
      return n.set.call(e.draft_, o), !0;
    if (!e.modified_) {
      const r = Gt($e(e), t), i = r == null ? void 0 : r[be];
      if (i && i.base_ === o)
        return e.copy_[t] = o, e.assigned_[t] = !1, !0;
      if (si(o, r) && (o !== void 0 || cn(e.base_, t)))
        return !0;
      Xt(e), pn(e);
    }
    return e.copy_[t] === o && // special case: handle new props with value 'undefined'
    (o !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(o) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = o, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Gt(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Xt(e), pn(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const o = $e(e), n = Reflect.getOwnPropertyDescriptor(o, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: o[t]
    };
  },
  defineProperty() {
    ye(11);
  },
  getPrototypeOf(e) {
    return Xe(e.base_);
  },
  setPrototypeOf() {
    ye(12);
  }
}, dt = {};
At(Sn, (e, t) => {
  dt[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
dt.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && ye(13), dt.set.call(this, e, t, void 0);
};
dt.set = function(e, t, o) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && ye(14), Sn.set.call(this, e[0], t, o, e[0]);
};
function Gt(e, t) {
  const o = e[be];
  return (o ? $e(o) : e)[t];
}
function di(e, t, o) {
  var r;
  const n = kr(t, o);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (r = n.get) == null ? void 0 : r.call(e.draft_)
  ) : void 0;
}
function kr(e, t) {
  if (!(t in e))
    return;
  let o = Xe(e);
  for (; o; ) {
    const n = Object.getOwnPropertyDescriptor(o, t);
    if (n)
      return n;
    o = Xe(o);
  }
}
function pn(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && pn(e.parent_));
}
function Xt(e) {
  e.copy_ || (e.copy_ = ln(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var pi = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, o, n) => {
      if (typeof t == "function" && typeof o != "function") {
        const i = o;
        o = t;
        const s = this;
        return function(c = i, ...f) {
          return s.produce(c, (u) => o.call(this, u, ...f));
        };
      }
      typeof o != "function" && ye(6), n !== void 0 && typeof n != "function" && ye(7);
      let r;
      if (Ne(t)) {
        const i = Jn(this), s = hn(t, void 0);
        let a = !0;
        try {
          r = o(s), a = !1;
        } finally {
          a ? fn(i) : dn(i);
        }
        return Zn(i, n), Qn(r, i);
      } else if (!t || typeof t != "object") {
        if (r = o(t), r === void 0 && (r = t), r === Pr && (r = void 0), this.autoFreeze_ && _n(r, !0), n) {
          const i = [], s = [];
          Be("Patches").generateReplacementPatches_(t, r, i, s), n(i, s);
        }
        return r;
      } else
        ye(1, t);
    }, this.produceWithPatches = (t, o) => {
      if (typeof t == "function")
        return (s, ...a) => this.produceWithPatches(s, (c) => t(c, ...a));
      let n, r;
      return [this.produce(t, o, (s, a) => {
        n = s, r = a;
      }), n, r];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Ne(e) || ye(8), Pe(e) && (e = Lr(e));
    const t = Jn(this), o = hn(e, void 0);
    return o[be].isManual_ = !0, dn(t), o;
  }
  finishDraft(e, t) {
    const o = e && e[be];
    (!o || !o.isManual_) && ye(9);
    const { scope_: n } = o;
    return Zn(n, t), Qn(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let o;
    for (o = t.length - 1; o >= 0; o--) {
      const r = t[o];
      if (r.path.length === 0 && r.op === "replace") {
        e = r.value;
        break;
      }
    }
    o > -1 && (t = t.slice(o + 1));
    const n = Be("Patches").applyPatches_;
    return Pe(e) ? n(e, t) : this.produce(
      e,
      (r) => n(r, t)
    );
  }
};
function hn(e, t) {
  const o = kt(e) ? Be("MapSet").proxyMap_(e, t) : Lt(e) ? Be("MapSet").proxySet_(e, t) : fi(e, t);
  return (t ? t.scope_ : $r()).drafts_.push(o), o;
}
function Lr(e) {
  return Pe(e) || ye(10, e), Br(e);
}
function Br(e) {
  if (!Ne(e) || Bt(e))
    return e;
  const t = e[be];
  let o;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, o = ln(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    o = ln(e, !0);
  return At(o, (n, r) => {
    Mr(o, n, Br(r));
  }), t && (t.finalized_ = !1), o;
}
var _e = new pi(), Hr = _e.produce;
_e.produceWithPatches.bind(
  _e
);
_e.setAutoFreeze.bind(_e);
_e.setUseStrictShallowCopy.bind(_e);
_e.applyPatches.bind(_e);
_e.createDraft.bind(_e);
_e.finishDraft.bind(_e);
var hi = (e, t, o) => {
  if (t.length === 1 && t[0] === o) {
    let n = !1;
    try {
      const r = {};
      e(r) === r && (n = !0);
    } catch {
    }
    if (n) {
      let r;
      try {
        throw new Error();
      } catch (i) {
        ({ stack: r } = i);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: r }
      );
    }
  }
}, gi = (e, t, o) => {
  const { memoize: n, memoizeOptions: r } = t, { inputSelectorResults: i, inputSelectorResultsCopy: s } = e, a = n(() => ({}), ...r);
  if (!(a.apply(null, i) === a.apply(null, s))) {
    let f;
    try {
      throw new Error();
    } catch (u) {
      ({ stack: f } = u);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: o,
        firstInputs: i,
        secondInputs: s,
        stack: f
      }
    );
  }
}, vi = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function mi(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function yi(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function Ei(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((o) => typeof o == "function")) {
    const o = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${o}]`);
  }
}
var tr = (e) => Array.isArray(e) ? e : [e];
function bi(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return Ei(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function nr(e, t) {
  const o = [], { length: n } = e;
  for (let r = 0; r < n; r++)
    o.push(e[r].apply(null, t));
  return o;
}
var _i = (e, t) => {
  const { identityFunctionCheck: o, inputStabilityCheck: n } = {
    ...vi,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: o === "always" || o === "once" && e,
      run: hi
    },
    inputStabilityCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: gi
    }
  };
}, Si = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Ci = typeof WeakRef < "u" ? WeakRef : Si, Ti = 0, rr = 1;
function yt() {
  return {
    s: Ti,
    v: void 0,
    o: null,
    p: null
  };
}
function Cn(e, t = {}) {
  let o = yt();
  const { resultEqualityCheck: n } = t;
  let r, i = 0;
  function s() {
    var l;
    let a = o;
    const { length: c } = arguments;
    for (let d = 0, h = c; d < h; d++) {
      const p = arguments[d];
      if (typeof p == "function" || typeof p == "object" && p !== null) {
        let m = a.o;
        m === null && (a.o = m = /* @__PURE__ */ new WeakMap());
        const v = m.get(p);
        v === void 0 ? (a = yt(), m.set(p, a)) : a = v;
      } else {
        let m = a.p;
        m === null && (a.p = m = /* @__PURE__ */ new Map());
        const v = m.get(p);
        v === void 0 ? (a = yt(), m.set(p, a)) : a = v;
      }
    }
    const f = a;
    let u;
    if (a.s === rr ? u = a.v : (u = e.apply(null, arguments), i++), f.s = rr, n) {
      const d = ((l = r == null ? void 0 : r.deref) == null ? void 0 : l.call(r)) ?? r;
      d != null && n(d, u) && (u = d, i !== 0 && i--), r = typeof u == "object" && u !== null || typeof u == "function" ? new Ci(u) : u;
    }
    return f.v = u, u;
  }
  return s.clearCache = () => {
    o = yt(), s.resetResultsCount();
  }, s.resultsCount = () => i, s.resetResultsCount = () => {
    i = 0;
  }, s;
}
function Ur(e, ...t) {
  const o = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...r) => {
    let i = 0, s = 0, a, c = {}, f = r.pop();
    typeof f == "object" && (c = f, f = r.pop()), mi(
      f,
      `createSelector expects an output function after the inputs, but received: [${typeof f}]`
    );
    const u = {
      ...o,
      ...c
    }, {
      memoize: l,
      memoizeOptions: d = [],
      argsMemoize: h = Cn,
      argsMemoizeOptions: p = [],
      devModeChecks: m = {}
    } = u, v = tr(d), _ = tr(p), b = bi(r), S = l(function() {
      return i++, f.apply(
        null,
        arguments
      );
    }, ...v);
    let R = !0;
    const y = h(function() {
      s++;
      const F = nr(
        b,
        arguments
      );
      if (a = S.apply(null, F), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: E, inputStabilityCheck: B } = _i(R, m);
        if (E.shouldRun && E.run(
          f,
          F,
          a
        ), B.shouldRun) {
          const O = nr(
            b,
            arguments
          );
          B.run(
            { inputSelectorResults: F, inputSelectorResultsCopy: O },
            { memoize: l, memoizeOptions: v },
            arguments
          );
        }
        R && (R = !1);
      }
      return a;
    }, ..._);
    return Object.assign(y, {
      resultFunc: f,
      memoizedResultFunc: S,
      dependencies: b,
      dependencyRecomputations: () => s,
      resetDependencyRecomputations: () => {
        s = 0;
      },
      lastResult: () => a,
      recomputations: () => i,
      resetRecomputations: () => {
        i = 0;
      },
      memoize: l,
      argsMemoize: h
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var Oi = /* @__PURE__ */ Ur(Cn), Ri = Object.assign(
  (e, t = Oi) => {
    yi(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const o = Object.keys(e), n = o.map(
      (i) => e[i]
    );
    return t(
      n,
      (...i) => i.reduce((s, a, c) => (s[o[c]] = a, s), {})
    );
  },
  { withTypes: () => Ri }
), Ai = (...e) => {
  const t = Ur(...e), o = Object.assign((...n) => {
    const r = t(...n), i = (s, ...a) => r(Pe(s) ? Lr(s) : s, ...a);
    return Object.assign(i, r), i;
  }, {
    withTypes: () => o
  });
  return o;
};
Ai(Cn);
function Ze(e, t) {
  function o(...n) {
    if (t) {
      let r = t(...n);
      if (!r)
        throw new Error(process.env.NODE_ENV === "production" ? de(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: r.payload,
        ..."meta" in r && {
          meta: r.meta
        },
        ..."error" in r && {
          error: r.error
        }
      };
    }
    return {
      type: e,
      payload: n[0]
    };
  }
  return o.toString = () => `${e}`, o.type = e, o.match = (n) => ri(n) && n.type === e, o;
}
function or(e) {
  return Ne(e) ? Hr(e, () => {
  }) : e;
}
function ir(e, t, o) {
  if (e.has(t)) {
    let r = e.get(t);
    return o.update && (r = o.update(r, t, e), e.set(t, r)), r;
  }
  if (!o.insert)
    throw new Error(process.env.NODE_ENV === "production" ? de(10) : "No insert provided for key not already in map");
  const n = o.insert(t, e);
  return e.set(t, n), n;
}
process.env.NODE_ENV;
function zr(e) {
  const t = {}, o = [];
  let n;
  const r = {
    addCase(i, s) {
      if (process.env.NODE_ENV !== "production") {
        if (o.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? de(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error(process.env.NODE_ENV === "production" ? de(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const a = typeof i == "string" ? i : i.type;
      if (!a)
        throw new Error(process.env.NODE_ENV === "production" ? de(28) : "`builder.addCase` cannot be called with an empty action type");
      if (a in t)
        throw new Error(process.env.NODE_ENV === "production" ? de(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${a}'`);
      return t[a] = s, r;
    },
    addMatcher(i, s) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? de(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return o.push({
        matcher: i,
        reducer: s
      }), r;
    },
    addDefaultCase(i) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? de(31) : "`builder.addDefaultCase` can only be called once");
      return n = i, r;
    }
  };
  return e(r), [t, o, n];
}
function Di(e) {
  return typeof e == "function";
}
function wi(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? de(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [o, n, r] = zr(t), i;
  if (Di(e))
    i = () => or(e());
  else {
    const a = or(e);
    i = () => a;
  }
  function s(a = i(), c) {
    let f = [o[c.type], ...n.filter(({
      matcher: u
    }) => u(c)).map(({
      reducer: u
    }) => u)];
    return f.filter((u) => !!u).length === 0 && (f = [r]), f.reduce((u, l) => {
      if (l)
        if (Pe(u)) {
          const h = l(u, c);
          return h === void 0 ? u : h;
        } else {
          if (Ne(u))
            return Hr(u, (d) => l(d, c));
          {
            const d = l(u, c);
            if (d === void 0) {
              if (u === null)
                return u;
              throw new Error(process.env.NODE_ENV === "production" ? de(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return d;
          }
        }
      return u;
    }, a);
  }
  return s.getInitialState = i, s;
}
var Ii = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", xi = (e = 21) => {
  let t = "", o = e;
  for (; o--; )
    t += Ii[Math.random() * 64 | 0];
  return t;
}, Ni = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function ji(e, t) {
  return `${e}/${t}`;
}
function Pi({
  creators: e
} = {}) {
  var o;
  const t = (o = e == null ? void 0 : e.asyncThunk) == null ? void 0 : o[Ni];
  return function(r) {
    const {
      name: i,
      reducerPath: s = i
    } = r;
    if (!i)
      throw new Error(process.env.NODE_ENV === "production" ? de(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && r.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const a = (typeof r.reducers == "function" ? r.reducers($i()) : r.reducers) || {}, c = Object.keys(a), f = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, u = {
      addCase(S, R) {
        const y = typeof S == "string" ? S : S.type;
        if (!y)
          throw new Error(process.env.NODE_ENV === "production" ? de(12) : "`context.addCase` cannot be called with an empty action type");
        if (y in f.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? de(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + y);
        return f.sliceCaseReducersByType[y] = R, u;
      },
      addMatcher(S, R) {
        return f.sliceMatchers.push({
          matcher: S,
          reducer: R
        }), u;
      },
      exposeAction(S, R) {
        return f.actionCreators[S] = R, u;
      },
      exposeCaseReducer(S, R) {
        return f.sliceCaseReducersByName[S] = R, u;
      }
    };
    c.forEach((S) => {
      const R = a[S], y = {
        reducerName: S,
        type: ji(i, S),
        createNotation: typeof r.reducers == "function"
      };
      Li(R) ? Hi(y, R, u, t) : ki(y, R, u);
    });
    function l() {
      if (process.env.NODE_ENV !== "production" && typeof r.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? de(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [S = {}, R = [], y = void 0] = typeof r.extraReducers == "function" ? zr(r.extraReducers) : [r.extraReducers], x = {
        ...S,
        ...f.sliceCaseReducersByType
      };
      return wi(r.initialState, (F) => {
        for (let E in x)
          F.addCase(E, x[E]);
        for (let E of f.sliceMatchers)
          F.addMatcher(E.matcher, E.reducer);
        for (let E of R)
          F.addMatcher(E.matcher, E.reducer);
        y && F.addDefaultCase(y);
      });
    }
    const d = (S) => S, h = /* @__PURE__ */ new Map();
    let p;
    function m(S, R) {
      return p || (p = l()), p(S, R);
    }
    function v() {
      return p || (p = l()), p.getInitialState();
    }
    function _(S, R = !1) {
      function y(F) {
        let E = F[S];
        if (typeof E > "u") {
          if (R)
            E = v();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? de(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return E;
      }
      function x(F = d) {
        const E = ir(h, R, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return ir(E, F, {
          insert: () => {
            const B = {};
            for (const [O, M] of Object.entries(r.selectors ?? {}))
              B[O] = Fi(M, F, v, R);
            return B;
          }
        });
      }
      return {
        reducerPath: S,
        getSelectors: x,
        get selectors() {
          return x(y);
        },
        selectSlice: y
      };
    }
    const b = {
      name: i,
      reducer: m,
      actions: f.actionCreators,
      caseReducers: f.sliceCaseReducersByName,
      getInitialState: v,
      ..._(s),
      injectInto(S, {
        reducerPath: R,
        ...y
      } = {}) {
        const x = R ?? s;
        return S.inject({
          reducerPath: x,
          reducer: m
        }, y), {
          ...b,
          ..._(x, !0)
        };
      }
    };
    return b;
  };
}
function Fi(e, t, o, n) {
  function r(i, ...s) {
    let a = t(i);
    if (typeof a > "u") {
      if (n)
        a = o();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? de(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(a, ...s);
  }
  return r.unwrapped = e, r;
}
var Mi = /* @__PURE__ */ Pi();
function $i() {
  function e(t, o) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...o
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...o) {
          return t(...o);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, o) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: o
      };
    },
    asyncThunk: e
  };
}
function ki({
  type: e,
  reducerName: t,
  createNotation: o
}, n, r) {
  let i, s;
  if ("reducer" in n) {
    if (o && !Bi(n))
      throw new Error(process.env.NODE_ENV === "production" ? de(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    i = n.reducer, s = n.prepare;
  } else
    i = n;
  r.addCase(e, i).exposeCaseReducer(t, i).exposeAction(t, s ? Ze(e, s) : Ze(e));
}
function Li(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Bi(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Hi({
  type: e,
  reducerName: t
}, o, n, r) {
  if (!r)
    throw new Error(process.env.NODE_ENV === "production" ? de(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: i,
    fulfilled: s,
    pending: a,
    rejected: c,
    settled: f,
    options: u
  } = o, l = r(e, i, u);
  n.exposeAction(t, l), s && n.addCase(l.fulfilled, s), a && n.addCase(l.pending, a), c && n.addCase(l.rejected, c), f && n.addMatcher(l.settled, f), n.exposeCaseReducer(t, {
    fulfilled: s || Et,
    pending: a || Et,
    rejected: c || Et,
    settled: f || Et
  });
}
function Et() {
}
var Ui = (e, t) => {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? de(32) : `${t} is not a function`);
}, Tn = "listenerMiddleware", zi = (e) => {
  let {
    type: t,
    actionCreator: o,
    matcher: n,
    predicate: r,
    effect: i
  } = e;
  if (t)
    r = Ze(t).match;
  else if (o)
    t = o.type, r = o.match;
  else if (n)
    r = n;
  else if (!r)
    throw new Error(process.env.NODE_ENV === "production" ? de(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return Ui(i, "options.listener"), {
    predicate: r,
    type: t,
    effect: i
  };
}, Vi = Object.assign((e) => {
  const {
    type: t,
    predicate: o,
    effect: n
  } = zi(e);
  return {
    id: xi(),
    effect: n,
    type: t,
    predicate: o,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? de(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => Vi
}), qi = Object.assign(Ze(`${Tn}/add`), {
  withTypes: () => qi
});
Ze(`${Tn}/removeAll`);
var Wi = Object.assign(Ze(`${Tn}/remove`), {
  withTypes: () => Wi
});
function de(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Yi = {
  users: {},
  isRightPanelOpen: !1,
  selectedConversationId: void 0,
  conversations: {},
  conversationsLoadingState: Ce.UNINITIALIZED,
  newConversation: void 0,
  shareId: void 0,
  docsAppRendered: !1,
  currentPage: ti(),
  codeblockLoaded: !1,
  source: void 0
}, It = Mi({
  name: "appState",
  initialState: Yi,
  reducers: {
    setDocsAppRendered: (e, t) => {
      e.docsAppRendered = t.payload;
    },
    updateCurrentPage: (e, t) => {
      e.currentPage = t.payload;
    },
    setConversationSource: (e, t) => {
      e.source = t.payload;
    },
    updateCodeblockLoaded: (e, t) => {
      e.codeblockLoaded = t.payload;
    },
    setShareId: (e, t) => {
      e.shareId = t.payload;
    },
    setCurrentUserId: (e, t) => {
      e.currentUserId = t.payload;
    },
    setConversationsLoadingState: (e, t) => {
      e.conversationsLoadingState = t.payload;
    },
    refetchConversations: (e) => {
      e.conversationsLoadingState = Ce.UNINITIALIZED;
    },
    setUsers: (e, t) => {
      var o;
      return (o = t.payload) != null && o.length ? {
        ...e,
        users: t.payload.reduce((n, r) => (n[r.id] = r, n), {})
      } : e;
    },
    updateRightPanelState: (e, t) => {
      e.isRightPanelOpen = t.payload;
    },
    updateSelectedConversationId: (e, t) => {
      e.selectedConversationId = t.payload;
    },
    upsertConversation: (e, t) => {
      e.conversations = {
        ...e.conversations,
        [t.payload.conversation_group_id]: {
          ...e.conversations[t.payload.conversation_group_id],
          ...t.payload
        }
      };
    },
    resolveConversationGroup: (e, {
      payload: { conversationGroupId: t }
    }) => {
      e.conversations[t] && delete e.conversations[t];
    },
    updateNewConversation: (e, t) => {
      e.newConversation = { ...e.newConversation, ...t.payload };
    },
    resetNewConversation: (e) => {
      e.newConversation = void 0;
    },
    setConversations: (e, t) => {
      t.payload && (e.conversations = t.payload.reduce(
        (o, n) => (o[n.conversation_group_id] = n, o),
        {}
      ));
    }
  }
}), {
  setCurrentUserId: Dc,
  setShareId: wc,
  updateSelectedConversationId: On,
  updateRightPanelState: Rn,
  setUsers: Ki,
  setConversations: Gi,
  resetNewConversation: Vr,
  updateNewConversation: Xi,
  upsertConversation: Ic,
  setDocsAppRendered: xc,
  updateCurrentPage: Nc,
  updateCodeblockLoaded: jc,
  resolveConversationGroup: Zi,
  setConversationsLoadingState: sr,
  refetchConversations: qr,
  setConversationSource: Pc
} = It.actions, Ht = Qe({
  state: It.getInitialState(),
  dispatch: () => null,
  getValue: () => null
}), Ji = ({
  children: e,
  shareId: t,
  userId: o,
  conversationGroupId: n,
  source: r
}) => {
  const [i, s] = Uo(It.reducer, {
    ...It.getInitialState(),
    shareId: t,
    currentUserId: o,
    selectedConversationId: n,
    isRightPanelOpen: !!n,
    source: r
  }), a = Ke(
    (f) => f(i),
    [i]
  ), c = lt(
    () => ({
      state: i,
      dispatch: s,
      getValue: a
    }),
    [i, s, a]
  );
  return /* @__PURE__ */ P.jsx(Ht.Provider, { value: c, children: e });
}, Qi = Ji, es = () => et(Ht), le = (e) => {
  const { getValue: t } = et(Ht);
  return t(e);
}, De = () => {
  const { dispatch: e } = et(Ht);
  return e;
}, ts = Qe({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
}), ns = Qe(null), rs = typeof document < "u", Wr = rs ? zo : Ae;
class ar {
  constructor() {
    this.order = [], this.scheduled = /* @__PURE__ */ new Set();
  }
  add(t) {
    if (!this.scheduled.has(t))
      return this.scheduled.add(t), this.order.push(t), !0;
  }
  remove(t) {
    const o = this.order.indexOf(t);
    o !== -1 && (this.order.splice(o, 1), this.scheduled.delete(t));
  }
  clear() {
    this.order.length = 0, this.scheduled.clear();
  }
}
function os(e) {
  let t = new ar(), o = new ar(), n = 0, r = !1, i = !1;
  const s = /* @__PURE__ */ new WeakSet(), a = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, f = !1, u = !1) => {
      const l = u && r, d = l ? t : o;
      return f && s.add(c), d.add(c) && l && r && (n = t.order.length), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      o.remove(c), s.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (r) {
        i = !0;
        return;
      }
      if (r = !0, [t, o] = [o, t], o.clear(), n = t.order.length, n)
        for (let f = 0; f < n; f++) {
          const u = t.order[f];
          s.has(u) && (a.schedule(u), e()), u(c);
        }
      r = !1, i && (i = !1, a.process(c));
    }
  };
  return a;
}
const bt = [
  "read",
  "resolveKeyframes",
  "update",
  "preRender",
  "render",
  "postRender"
  // Compute
], is = 40;
function ss(e, t) {
  let o = !1, n = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = bt.reduce((l, d) => (l[d] = os(() => o = !0), l), {}), s = (l) => {
    i[l].process(r);
  }, a = () => {
    const l = performance.now();
    o = !1, r.delta = n ? 1e3 / 60 : Math.max(Math.min(l - r.timestamp, is), 1), r.timestamp = l, r.isProcessing = !0, bt.forEach(s), r.isProcessing = !1, o && t && (n = !1, e(a));
  }, c = () => {
    o = !0, n = !0, r.isProcessing || e(a);
  };
  return { schedule: bt.reduce((l, d) => {
    const h = i[d];
    return l[d] = (p, m = !1, v = !1) => (o || c(), h.schedule(p, m, v)), l;
  }, {}), cancel: (l) => bt.forEach((d) => i[d].cancel(l)), state: r, steps: i };
}
const as = Qe({});
function us(e) {
  const t = Te(null);
  return t.current === null && (t.current = e()), t.current;
}
const cs = (e) => e, { schedule: ls, cancel: Fc, state: Mc, steps: $c } = ss(typeof requestAnimationFrame < "u" ? requestAnimationFrame : cs, !0);
function Yr() {
  const e = Te(!1);
  return Wr(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function fs() {
  const e = Yr(), [t, o] = ge(0), n = Ke(() => {
    e.current && o(t + 1);
  }, [t]);
  return [Ke(() => ls.postRender(n), [n]), t];
}
class ds extends Ee.Component {
  getSnapshotBeforeUpdate(t) {
    const o = this.props.childRef.current;
    if (o && t.isPresent && !this.props.isPresent) {
      const n = this.props.sizeRef.current;
      n.height = o.offsetHeight || 0, n.width = o.offsetWidth || 0, n.top = o.offsetTop, n.left = o.offsetLeft;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function ps({ children: e, isPresent: t }) {
  const o = Ir(), n = Te(null), r = Te({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }), { nonce: i } = et(ts);
  return Vo(() => {
    const { width: s, height: a, top: c, left: f } = r.current;
    if (t || !n.current || !s || !a)
      return;
    n.current.dataset.motionPopId = o;
    const u = document.createElement("style");
    return i && (u.nonce = i), document.head.appendChild(u), u.sheet && u.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${a}px !important;
            top: ${c}px !important;
            left: ${f}px !important;
          }
        `), () => {
      document.head.removeChild(u);
    };
  }, [t]), Ee.createElement(ds, { isPresent: t, childRef: n, sizeRef: r }, Ee.cloneElement(e, { ref: n }));
}
const Zt = ({ children: e, initial: t, isPresent: o, onExitComplete: n, custom: r, presenceAffectsLayout: i, mode: s }) => {
  const a = us(hs), c = Ir(), f = lt(
    () => ({
      id: c,
      initial: t,
      isPresent: o,
      custom: r,
      onExitComplete: (u) => {
        a.set(u, !0);
        for (const l of a.values())
          if (!l)
            return;
        n && n();
      },
      register: (u) => (a.set(u, !1), () => a.delete(u))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    i ? void 0 : [o]
  );
  return lt(() => {
    a.forEach((u, l) => a.set(l, !1));
  }, [o]), Ee.useEffect(() => {
    !o && !a.size && n && n();
  }, [o]), s === "popLayout" && (e = Ee.createElement(ps, { isPresent: o }, e)), Ee.createElement(ns.Provider, { value: f }, e);
};
function hs() {
  return /* @__PURE__ */ new Map();
}
function gs(e) {
  return Ae(() => () => e(), []);
}
const ke = (e) => e.key || "";
function vs(e, t) {
  e.forEach((o) => {
    const n = ke(o);
    t.set(n, o);
  });
}
function ms(e) {
  const t = [];
  return Ge.forEach(e, (o) => {
    xr(o) && t.push(o);
  }), t;
}
const ys = ({ children: e, custom: t, initial: o = !0, onExitComplete: n, exitBeforeEnter: r, presenceAffectsLayout: i = !0, mode: s = "sync" }) => {
  const a = et(as).forceRender || fs()[0], c = Yr(), f = ms(e);
  let u = f;
  const l = Te(/* @__PURE__ */ new Map()).current, d = Te(u), h = Te(/* @__PURE__ */ new Map()).current, p = Te(!0);
  if (Wr(() => {
    p.current = !1, vs(f, h), d.current = u;
  }), gs(() => {
    p.current = !0, h.clear(), l.clear();
  }), p.current)
    return Ee.createElement(Ee.Fragment, null, u.map((b) => Ee.createElement(Zt, { key: ke(b), isPresent: !0, initial: o ? void 0 : !1, presenceAffectsLayout: i, mode: s }, b)));
  u = [...u];
  const m = d.current.map(ke), v = f.map(ke), _ = m.length;
  for (let b = 0; b < _; b++) {
    const S = m[b];
    v.indexOf(S) === -1 && !l.has(S) && l.set(S, void 0);
  }
  return s === "wait" && l.size && (u = []), l.forEach((b, S) => {
    if (v.indexOf(S) !== -1)
      return;
    const R = h.get(S);
    if (!R)
      return;
    const y = m.indexOf(S);
    let x = b;
    if (!x) {
      const F = () => {
        l.delete(S);
        const E = Array.from(h.keys()).filter((B) => !v.includes(B));
        if (E.forEach((B) => h.delete(B)), d.current = f.filter((B) => {
          const O = ke(B);
          return (
            // filter out the node exiting
            O === S || // filter out the leftover children
            E.includes(O)
          );
        }), !l.size) {
          if (c.current === !1)
            return;
          a(), n && n();
        }
      };
      x = Ee.createElement(Zt, { key: ke(R), isPresent: !1, onExitComplete: F, custom: t, presenceAffectsLayout: i, mode: s }, R), l.set(S, x);
    }
    u.splice(y, 0, x);
  }), u = u.map((b) => {
    const S = b.key;
    return l.has(S) ? b : Ee.createElement(Zt, { key: ke(b), isPresent: !0, presenceAffectsLayout: i, mode: s }, b);
  }), process.env.NODE_ENV !== "production" && s === "wait" && u.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`), Ee.createElement(Ee.Fragment, null, l.size ? u : u.map((b) => qo(b)));
}, Ut = "altimate-display-", Es = `${Ut}-highlight`, ur = `${Ut}-highlight-hover`, bs = `${Ut}-active-highlight`, _s = 1049, An = ({
  icon: e,
  className: t = "",
  ...o
}) => /* @__PURE__ */ P.jsx("i", { className: `${t} codicon codicon-${e}`, ...o }), Ss = (e) => /* @__PURE__ */ P.jsx(An, { icon: "comment", ...e }), Cs = (e) => /* @__PURE__ */ P.jsx(An, { icon: "check", ...e }), Ts = (e) => /* @__PURE__ */ P.jsx(An, { icon: "send", ...e }), Os = "_iconButton_eti7u_1", Rs = {
  iconButton: Os
}, As = (e) => /* @__PURE__ */ P.jsx(js, { title: e.title, children: /* @__PURE__ */ P.jsx(
  "button",
  {
    ...e,
    className: `btn ${e.color ? `btn-${e.color}` : ""} ${e.className ?? ""} ${Rs.iconButton}`,
    type: e.type ?? "button",
    children: e.children
  }
) }), Ds = As, ws = Qe(null), Jt = {
  didCatch: !1,
  error: null
};
class Is extends Wo {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Jt;
  }
  static getDerivedStateFromError(t) {
    return {
      didCatch: !0,
      error: t
    };
  }
  resetErrorBoundary() {
    const {
      error: t
    } = this.state;
    if (t !== null) {
      for (var o, n, r = arguments.length, i = new Array(r), s = 0; s < r; s++)
        i[s] = arguments[s];
      (o = (n = this.props).onReset) === null || o === void 0 || o.call(n, {
        args: i,
        reason: "imperative-api"
      }), this.setState(Jt);
    }
  }
  componentDidCatch(t, o) {
    var n, r;
    (n = (r = this.props).onError) === null || n === void 0 || n.call(r, t, o);
  }
  componentDidUpdate(t, o) {
    const {
      didCatch: n
    } = this.state, {
      resetKeys: r
    } = this.props;
    if (n && o.error !== null && xs(t.resetKeys, r)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: r,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(Jt);
    }
  }
  render() {
    const {
      children: t,
      fallbackRender: o,
      FallbackComponent: n,
      fallback: r
    } = this.props, {
      didCatch: i,
      error: s
    } = this.state;
    let a = t;
    if (i) {
      const c = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof o == "function")
        a = o(c);
      else if (n)
        a = Yn(n, c);
      else if (r === null || xr(r))
        a = r;
      else
        throw s;
    }
    return Yn(ws.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, a);
  }
}
function xs() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((o, n) => !Object.is(o, t[n]));
}
const Ns = (e) => {
  const [t, o] = ge(!1), n = () => o(!t), r = Te(
    (e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`).replace(/\s/g, "-")
  );
  return /* @__PURE__ */ P.jsxs(Is, { fallback: /* @__PURE__ */ P.jsx("span", { id: r.current, children: e.children }), children: [
    /* @__PURE__ */ P.jsx("span", { id: r.current, children: e.children }),
    e.title ? /* @__PURE__ */ P.jsx(
      Ko,
      {
        isOpen: t,
        target: r.current,
        toggle: n,
        className: e.className,
        children: e.title
      }
    ) : null
  ] });
}, js = Ns, Ps = "_loadingBtn_gadec_1", Fs = {
  loadingBtn: Ps
}, Ms = ({ loading: e, ...t }) => /* @__PURE__ */ P.jsx(
  Pt,
  {
    ...t,
    disabled: e ?? t.disabled,
    className: `${t.className ?? ""} ${Fs.loadingBtn}`,
    children: e ? /* @__PURE__ */ P.jsx(Go, {}) : t.children
  }
), $s = Ms;
function Kr(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function ks(...e) {
  return e.map((o) => Kr(o)).join("");
}
function Qt(...e) {
  return "(" + e.map((o) => Kr(o)).join("|") + ")";
}
function Ls(e) {
  const t = e.COMMENT("--", "$"), o = {
    className: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [
          { begin: /''/ }
        ]
      }
    ]
  }, n = {
    begin: /"/,
    end: /"/,
    contains: [{ begin: /""/ }]
  }, r = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ], i = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ], s = [
    "bigint",
    "binary",
    "blob",
    "boolean",
    "char",
    "character",
    "clob",
    "date",
    "dec",
    "decfloat",
    "decimal",
    "float",
    "int",
    "integer",
    "interval",
    "nchar",
    "nclob",
    "national",
    "numeric",
    "real",
    "row",
    "smallint",
    "time",
    "timestamp",
    "varchar",
    "varying",
    // modifier (character varying)
    "varbinary"
  ], a = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ], c = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update   ",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year"
  ], f = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket"
  ], u = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ], l = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ], d = f, h = [...c, ...a].filter((b) => !f.includes(b)), p = {
    className: "variable",
    begin: /@[a-z0-9]+/
  }, m = {
    className: "operator",
    begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, v = {
    begin: ks(/\b/, Qt(...d), /\s*\(/),
    keywords: {
      built_in: d
    }
  };
  function _(b, { exceptions: S, when: R } = {}) {
    const y = R;
    return S = S || [], b.map((x) => x.match(/\|\d+$/) || S.includes(x) ? x : y(x) ? `${x}|0` : x);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: _(h, { when: (b) => b.length < 3 }),
      literal: r,
      type: s,
      built_in: u
    },
    contains: [
      {
        begin: Qt(...l),
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: h.concat(l),
          literal: r,
          type: s
        }
      },
      {
        className: "type",
        begin: Qt(...i)
      },
      v,
      p,
      o,
      n,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      t,
      m
    ]
  };
}
var Bs = Ls;
const Hs = /* @__PURE__ */ tt(Bs);
function Us(e) {
  var t = "true false yes no null", o = "[\\w#;/?:@&=+$,.~*'()[\\]]+", n = {
    className: "attr",
    variants: [
      { begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)" },
      { begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)' },
      // double quoted keys
      { begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)" }
      // single quoted keys
    ]
  }, r = {
    className: "template-variable",
    variants: [
      { begin: /\{\{/, end: /\}\}/ },
      // jinja templates Ansible
      { begin: /%\{/, end: /\}/ }
      // Ruby i18n
    ]
  }, i = {
    className: "string",
    relevance: 0,
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /\S+/ }
    ],
    contains: [
      e.BACKSLASH_ESCAPE,
      r
    ]
  }, s = e.inherit(i, {
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /[^\s,{}[\]]+/ }
    ]
  }), a = "[0-9]{4}(-[0-9][0-9]){0,2}", c = "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?", f = "(\\.[0-9]*)?", u = "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?", l = {
    className: "number",
    begin: "\\b" + a + c + f + u + "\\b"
  }, d = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: t,
    relevance: 0
  }, h = {
    begin: /\{/,
    end: /\}/,
    contains: [d],
    illegal: "\\n",
    relevance: 0
  }, p = {
    begin: "\\[",
    end: "\\]",
    contains: [d],
    illegal: "\\n",
    relevance: 0
  }, m = [
    n,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Ruby/Rails erb
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0
    },
    {
      // named tags
      className: "type",
      begin: "!\\w+!" + o
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + o + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + o
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + o
    },
    {
      // fragment id &ref
      className: "meta",
      begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // fragment reference *ref
      className: "meta",
      begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // array listing
      className: "bullet",
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    e.HASH_COMMENT_MODE,
    {
      beginKeywords: t,
      keywords: { literal: t }
    },
    l,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: e.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    h,
    p,
    i
  ], v = [...m];
  return v.pop(), v.push(s), d.contains = v, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: m
  };
}
var zs = Us;
const Vs = /* @__PURE__ */ tt(zs), qs = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    background: "#002b36",
    color: "#839496"
  },
  "hljs-comment": {
    color: "#586e75"
  },
  "hljs-quote": {
    color: "#586e75"
  },
  "hljs-keyword": {
    color: "#859900"
  },
  "hljs-selector-tag": {
    color: "#859900"
  },
  "hljs-addition": {
    color: "#859900"
  },
  "hljs-number": {
    color: "#2aa198"
  },
  "hljs-string": {
    color: "#2aa198"
  },
  "hljs-meta .hljs-meta-string": {
    color: "#2aa198"
  },
  "hljs-literal": {
    color: "#2aa198"
  },
  "hljs-doctag": {
    color: "#2aa198"
  },
  "hljs-regexp": {
    color: "#2aa198"
  },
  "hljs-title": {
    color: "#268bd2"
  },
  "hljs-section": {
    color: "#268bd2"
  },
  "hljs-name": {
    color: "#268bd2"
  },
  "hljs-selector-id": {
    color: "#268bd2"
  },
  "hljs-selector-class": {
    color: "#268bd2"
  },
  "hljs-attribute": {
    color: "#b58900"
  },
  "hljs-attr": {
    color: "#b58900"
  },
  "hljs-variable": {
    color: "#b58900"
  },
  "hljs-template-variable": {
    color: "#b58900"
  },
  "hljs-class .hljs-title": {
    color: "#b58900"
  },
  "hljs-type": {
    color: "#b58900"
  },
  "hljs-symbol": {
    color: "#cb4b16"
  },
  "hljs-bullet": {
    color: "#cb4b16"
  },
  "hljs-subst": {
    color: "#cb4b16"
  },
  "hljs-meta": {
    color: "#cb4b16"
  },
  "hljs-meta .hljs-keyword": {
    color: "#cb4b16"
  },
  "hljs-selector-attr": {
    color: "#cb4b16"
  },
  "hljs-selector-pseudo": {
    color: "#cb4b16"
  },
  "hljs-link": {
    color: "#cb4b16"
  },
  "hljs-built_in": {
    color: "#dc322f"
  },
  "hljs-deletion": {
    color: "#dc322f"
  },
  "hljs-formula": {
    background: "#073642"
  },
  "hljs-emphasis": {
    fontStyle: "italic"
  },
  "hljs-strong": {
    fontWeight: "bold"
  }
}, Ws = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    background: "#fdf6e3",
    color: "#657b83"
  },
  "hljs-comment": {
    color: "#93a1a1"
  },
  "hljs-quote": {
    color: "#93a1a1"
  },
  "hljs-keyword": {
    color: "#859900"
  },
  "hljs-selector-tag": {
    color: "#859900"
  },
  "hljs-addition": {
    color: "#859900"
  },
  "hljs-number": {
    color: "#2aa198"
  },
  "hljs-string": {
    color: "#2aa198"
  },
  "hljs-meta .hljs-meta-string": {
    color: "#2aa198"
  },
  "hljs-literal": {
    color: "#2aa198"
  },
  "hljs-doctag": {
    color: "#2aa198"
  },
  "hljs-regexp": {
    color: "#2aa198"
  },
  "hljs-title": {
    color: "#268bd2"
  },
  "hljs-section": {
    color: "#268bd2"
  },
  "hljs-name": {
    color: "#268bd2"
  },
  "hljs-selector-id": {
    color: "#268bd2"
  },
  "hljs-selector-class": {
    color: "#268bd2"
  },
  "hljs-attribute": {
    color: "#b58900"
  },
  "hljs-attr": {
    color: "#b58900"
  },
  "hljs-variable": {
    color: "#b58900"
  },
  "hljs-template-variable": {
    color: "#b58900"
  },
  "hljs-class .hljs-title": {
    color: "#b58900"
  },
  "hljs-type": {
    color: "#b58900"
  },
  "hljs-symbol": {
    color: "#cb4b16"
  },
  "hljs-bullet": {
    color: "#cb4b16"
  },
  "hljs-subst": {
    color: "#cb4b16"
  },
  "hljs-meta": {
    color: "#cb4b16"
  },
  "hljs-meta .hljs-keyword": {
    color: "#cb4b16"
  },
  "hljs-selector-attr": {
    color: "#cb4b16"
  },
  "hljs-selector-pseudo": {
    color: "#cb4b16"
  },
  "hljs-link": {
    color: "#cb4b16"
  },
  "hljs-built_in": {
    color: "#dc322f"
  },
  "hljs-deletion": {
    color: "#dc322f"
  },
  "hljs-formula": {
    background: "#eee8d5"
  },
  "hljs-emphasis": {
    fontStyle: "italic"
  },
  "hljs-strong": {
    fontWeight: "bold"
  }
}, Ys = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    background: "white",
    color: "black"
  },
  "hljs-comment": {
    color: "#008000"
  },
  "hljs-quote": {
    color: "#008000"
  },
  "hljs-variable": {
    color: "#008000"
  },
  "hljs-keyword": {
    color: "#00f"
  },
  "hljs-selector-tag": {
    color: "#00f"
  },
  "hljs-built_in": {
    color: "#00f"
  },
  "hljs-name": {
    color: "#00f"
  },
  "hljs-tag": {
    color: "#00f"
  },
  "hljs-string": {
    color: "#a31515"
  },
  "hljs-title": {
    color: "#a31515"
  },
  "hljs-section": {
    color: "#a31515"
  },
  "hljs-attribute": {
    color: "#a31515"
  },
  "hljs-literal": {
    color: "#a31515"
  },
  "hljs-template-tag": {
    color: "#a31515"
  },
  "hljs-template-variable": {
    color: "#a31515"
  },
  "hljs-type": {
    color: "#a31515"
  },
  "hljs-addition": {
    color: "#a31515"
  },
  "hljs-deletion": {
    color: "#2b91af"
  },
  "hljs-selector-attr": {
    color: "#2b91af"
  },
  "hljs-selector-pseudo": {
    color: "#2b91af"
  },
  "hljs-meta": {
    color: "#2b91af"
  },
  "hljs-doctag": {
    color: "#808080"
  },
  "hljs-attr": {
    color: "#f00"
  },
  "hljs-symbol": {
    color: "#00b0e8"
  },
  "hljs-bullet": {
    color: "#00b0e8"
  },
  "hljs-link": {
    color: "#00b0e8"
  },
  "hljs-emphasis": {
    fontStyle: "italic"
  },
  "hljs-strong": {
    fontWeight: "bold"
  }
}, Ks = "_codeblock_1dekk_1", Gs = {
  codeblock: Ks
};
bn.registerLanguage("javascript", Hs);
bn.registerLanguage("javascript", Vs);
const Xs = { vs: Ys, solarizedDark: qs, solarizedLight: Ws }, Zs = ({
  code: e,
  language: t,
  fileName: o,
  theme: n = "vs",
  showLineNumbers: r
}) => /* @__PURE__ */ P.jsxs(Ft, { className: Gs.codeblock, children: [
  o ? /* @__PURE__ */ P.jsx(Nr, { children: o }) : null,
  /* @__PURE__ */ P.jsx(Mt, { children: /* @__PURE__ */ P.jsx(
    bn,
    {
      showLineNumbers: r,
      language: t,
      style: Xs[n],
      children: e
    }
  ) })
] }), Js = Zs, Qs = ({ pos: e, onAddComment: t }) => jr(
  /* @__PURE__ */ P.jsx(ys, { children: e && /* @__PURE__ */ P.jsx(
    Pt,
    {
      onClick: t,
      id: `${Ut}-highlight`,
      style: {
        position: "absolute",
        top: e.y,
        left: e.x,
        // right: "15px",
        zIndex: _s + 5,
        cursor: "pointer",
        background: "#007AFF",
        width: 26,
        height: 26,
        borderRadius: "100%",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        border: "2px solid rgba(255,255,255,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "13px",
        fontWeight: "bold",
        color: "#fff"
      },
      children: /* @__PURE__ */ P.jsx(Ss, {})
    }
  ) }),
  e.element.parentElement
), ea = Qs, ta = () => {
  const {
    state: { isRightPanelOpen: e }
  } = es(), t = De(), o = () => {
    t(Rn(!e));
  };
  return /* @__PURE__ */ P.jsx(Pt, { onClick: o, children: e ? "Hide conversations" : "Show conversations" });
}, na = ta, nt = {
  get: async (e, t, o) => ({}),
  post: async (e, t, o) => ({})
}, ra = (e) => nt.get(`dbt/dbt_docs_share/${e}`), oa = (e, t) => nt.post(`dbt/dbt_docs_share/${e}/conversation_group`, t), ia = (e, t, o) => nt.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`,
  o
), sa = (e) => nt.get(`dbt/dbt_docs_share/${e}/conversations`), aa = (e) => nt.get("/users/", { company: e }), ua = (e, t) => nt.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`,
  { resolved: !0 }
), ca = () => {
  const e = le(
    (s) => s.shareId
  ), [t, o] = ge(
    null
  ), [n, r] = ge(!1), i = Ke(async () => {
    if (!e)
      return;
    r(!0);
    const s = await ra(e);
    if (s) {
      o(s);
      const a = document.getElementById("collapse-sidebar");
      a == null || a.click();
    }
    r(!1);
  }, [e]);
  return Ae(() => {
    !e || t || n || i();
  }, [e, t, i, n]), { shareDetails: t, loading: n };
};
var Gr = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function(e, t) {
  (function(o, n) {
    e.exports = n();
  })(window, function() {
    return function(o) {
      var n = {};
      function r(i) {
        if (n[i])
          return n[i].exports;
        var s = n[i] = { i, l: !1, exports: {} };
        return o[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
      }
      return r.m = o, r.c = n, r.d = function(i, s, a) {
        r.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: a });
      }, r.r = function(i) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
      }, r.t = function(i, s) {
        if (1 & s && (i = r(i)), 8 & s || 4 & s && typeof i == "object" && i && i.__esModule)
          return i;
        var a = /* @__PURE__ */ Object.create(null);
        if (r.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: i }), 2 & s && typeof i != "string")
          for (var c in i)
            r.d(a, c, (function(f) {
              return i[f];
            }).bind(null, c));
        return a;
      }, r.n = function(i) {
        var s = i && i.__esModule ? function() {
          return i.default;
        } : function() {
          return i;
        };
        return r.d(s, "a", s), s;
      }, r.o = function(i, s) {
        return Object.prototype.hasOwnProperty.call(i, s);
      }, r.p = "", r(r.s = 7);
    }([function(o, n, r) {
      var i, s = this && this.__extends || (i = function(l, d) {
        return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, p) {
          h.__proto__ = p;
        } || function(h, p) {
          for (var m in p)
            Object.prototype.hasOwnProperty.call(p, m) && (h[m] = p[m]);
        })(l, d);
      }, function(l, d) {
        function h() {
          this.constructor = l;
        }
        i(l, d), l.prototype = d === null ? Object.create(d) : (h.prototype = d.prototype, new h());
      }), a = this && this.__importDefault || function(l) {
        return l && l.__esModule ? l : { default: l };
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.eventEmitter = n.INTERNAL_ERROR_EVENT = n.UNKNOWN_IDX = n.ROOT_IDX = n.getStylesheet = n.getDefaultOptions = n.CAMEL_DATASET_SPLIT_TYPE = n.CAMEL_DATASET_IDENTIFIER_EXTRA = n.CAMEL_DATASET_IDENTIFIER = n.DATASET_SPLIT_TYPE = n.DATASET_IDENTIFIER_EXTRA = n.DATASET_IDENTIFIER = n.STYLESHEET_ID = n.LOCAL_STORE_KEY = n.ID_DIVISION = void 0;
      var c = a(r(10)), f = a(r(2));
      n.ID_DIVISION = ";", n.LOCAL_STORE_KEY = "highlight-mengshou", n.STYLESHEET_ID = "highlight-mengshou-style", n.DATASET_IDENTIFIER = "highlight-id", n.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra", n.DATASET_SPLIT_TYPE = "highlight-split-type", n.CAMEL_DATASET_IDENTIFIER = c.default(n.DATASET_IDENTIFIER), n.CAMEL_DATASET_IDENTIFIER_EXTRA = c.default(n.DATASET_IDENTIFIER_EXTRA), n.CAMEL_DATASET_SPLIT_TYPE = c.default(n.DATASET_SPLIT_TYPE), n.getDefaultOptions = function() {
        return { $root: document || document.documentElement, exceptSelectors: null, wrapTag: "span", verbose: !1, style: { className: "highlight-mengshou-wrap" } };
      }, n.getStylesheet = function() {
        return `
    .` + n.getDefaultOptions().style.className + ` {
        background: #ff9;
        cursor: pointer;
    }
    .` + n.getDefaultOptions().style.className + `.active {
        background: #ffb;
    }
`;
      }, n.ROOT_IDX = -2, n.UNKNOWN_IDX = -1, n.INTERNAL_ERROR_EVENT = "error";
      var u = function(l) {
        function d() {
          return l !== null && l.apply(this, arguments) || this;
        }
        return s(d, l), d;
      }(f.default);
      n.eventEmitter = new u();
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.UserInputEvent = n.SelectedNodeType = n.CreateFrom = n.EventType = n.ERROR = n.SplitType = void 0, function(i) {
        i.none = "none", i.head = "head", i.tail = "tail", i.both = "both";
      }(n.SplitType || (n.SplitType = {})), function(i) {
        i.DOM_TYPE_ERROR = "[DOM] Receive wrong node type.", i.DOM_SELECTION_EMPTY = "[DOM] The selection contains no dom node, may be you except them.", i.RANGE_INVALID = "[RANGE] Got invalid dom range, can't convert to a valid highlight range.", i.RANGE_NODE_INVALID = "[RANGE] Start or end node isn't a text node, it may occur an error.", i.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict.", i.CACHE_SET_ERROR = "[CACHE] Cache.data can't be set manually, please use .save().", i.SOURCE_TYPE_ERROR = "[SOURCE] Object isn't a highlight source instance.", i.HIGHLIGHT_RANGE_FROZEN = "[HIGHLIGHT_RANGE] A highlight range must be frozen before render.", i.HIGHLIGHT_SOURCE_RECREATE = "[HIGHLIGHT_SOURCE] Recreate highlights from sources error.", i.HIGHLIGHT_SOURCE_NONE_RENDER = "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.";
      }(n.ERROR || (n.ERROR = {})), function(i) {
        i.CREATE = "selection:create", i.REMOVE = "selection:remove", i.MODIFY = "selection:modify", i.HOVER = "selection:hover", i.HOVER_OUT = "selection:hover-out", i.CLICK = "selection:click";
      }(n.EventType || (n.EventType = {})), function(i) {
        i.STORE = "from-store", i.INPUT = "from-input";
      }(n.CreateFrom || (n.CreateFrom = {})), function(i) {
        i.text = "text", i.span = "span";
      }(n.SelectedNodeType || (n.SelectedNodeType = {})), function(i) {
        i.touchend = "touchend", i.mouseup = "mouseup", i.touchstart = "touchstart", i.click = "click", i.mouseover = "mouseover";
      }(n.UserInputEvent || (n.UserInputEvent = {}));
    }, function(o, n, r) {
      var i = this && this.__read || function(c, f) {
        var u = typeof Symbol == "function" && c[Symbol.iterator];
        if (!u)
          return c;
        var l, d, h = u.call(c), p = [];
        try {
          for (; (f === void 0 || f-- > 0) && !(l = h.next()).done; )
            p.push(l.value);
        } catch (m) {
          d = { error: m };
        } finally {
          try {
            l && !l.done && (u = h.return) && u.call(h);
          } finally {
            if (d)
              throw d.error;
          }
        }
        return p;
      }, s = this && this.__spread || function() {
        for (var c = [], f = 0; f < arguments.length; f++)
          c = c.concat(i(arguments[f]));
        return c;
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var a = function() {
        function c() {
          this.handlersMap = /* @__PURE__ */ Object.create(null);
        }
        return c.prototype.on = function(f, u) {
          return this.handlersMap[f] || (this.handlersMap[f] = []), this.handlersMap[f].push(u), this;
        }, c.prototype.off = function(f, u) {
          return this.handlersMap[f] && this.handlersMap[f].splice(this.handlersMap[f].indexOf(u) >>> 0, 1), this;
        }, c.prototype.emit = function(f) {
          for (var u = [], l = 1; l < arguments.length; l++)
            u[l - 1] = arguments[l];
          return this.handlersMap[f] && this.handlersMap[f].slice().forEach(function(d) {
            d.apply(void 0, s(u));
          }), this;
        }, c;
      }();
      n.default = a;
    }, function(o, n, r) {
      var i = this && this.__importDefault || function(f) {
        return f && f.__esModule ? f : { default: f };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var s = i(r(5)), a = r(9), c = function() {
        function f(u, l, d, h, p) {
          this.startMeta = u, this.endMeta = l, this.text = d, this.id = h, this.__isHighlightSource = {}, p && (this.extra = p);
        }
        return f.prototype.deSerialize = function(u, l) {
          var d = a.queryElementNode(this, u), h = d.start, p = d.end, m = a.getTextChildByOffset(h, this.startMeta.textOffset), v = a.getTextChildByOffset(p, this.endMeta.textOffset);
          if (!l.Serialize.Restore.isEmpty()) {
            var _ = l.Serialize.Restore.call(this, m, v) || [];
            m = _[0] || m, v = _[1] || v;
          }
          return new s.default(m, v, this.text, this.id, !0);
        }, f;
      }();
      n.default = c;
    }, function(o, n, r) {
      var i = this && this.__values || function(u) {
        var l = typeof Symbol == "function" && Symbol.iterator, d = l && u[l], h = 0;
        if (d)
          return d.call(u);
        if (u && typeof u.length == "number")
          return { next: function() {
            return u && h >= u.length && (u = void 0), { value: u && u[h++], done: !u };
          } };
        throw new TypeError(l ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, s = this && this.__read || function(u, l) {
        var d = typeof Symbol == "function" && u[Symbol.iterator];
        if (!d)
          return u;
        var h, p, m = d.call(u), v = [];
        try {
          for (; (l === void 0 || l-- > 0) && !(h = m.next()).done; )
            v.push(h.value);
        } catch (_) {
          p = { error: _ };
        } finally {
          try {
            h && !h.done && (d = m.return) && d.call(m);
          } finally {
            if (p)
              throw p.error;
          }
        }
        return v;
      }, a = this && this.__spread || function() {
        for (var u = [], l = 0; l < arguments.length; l++)
          u = u.concat(s(arguments[l]));
        return u;
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.hasClass = n.removeAllClass = n.removeClass = n.addClass = n.addEventListener = n.removeEventListener = n.forEach = n.getHighlightById = n.getHighlightsByRoot = n.getExtraHighlightId = n.getHighlightId = n.isHighlightWrapNode = void 0;
      var c = r(0);
      n.isHighlightWrapNode = function(u) {
        return !!u.dataset && !!u.dataset[c.CAMEL_DATASET_IDENTIFIER];
      };
      var f = function(u, l) {
        for (var d = !1, h = null; u; ) {
          if (n.isHighlightWrapNode(u) && (h = u), u === l) {
            d = !0;
            break;
          }
          u = u.parentNode;
        }
        return d ? h : null;
      };
      n.getHighlightId = function(u, l) {
        return (u = f(u, l)) ? u.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
      }, n.getExtraHighlightId = function(u, l) {
        return (u = f(u, l)) ? u.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA].split(c.ID_DIVISION).filter(function(d) {
          return d;
        }) : [];
      }, n.getHighlightsByRoot = function(u, l) {
        var d, h;
        Array.isArray(u) || (u = [u]);
        var p = [];
        try {
          for (var m = i(u), v = m.next(); !v.done; v = m.next()) {
            var _ = v.value.querySelectorAll(l + "[data-" + c.DATASET_IDENTIFIER + "]");
            p.push.apply(p, _);
          }
        } catch (b) {
          d = { error: b };
        } finally {
          try {
            v && !v.done && (h = m.return) && h.call(m);
          } finally {
            if (d)
              throw d.error;
          }
        }
        return p;
      }, n.getHighlightById = function(u, l, d) {
        var h, p, m = [], v = new RegExp("(" + l + "\\" + c.ID_DIVISION + "|\\" + c.ID_DIVISION + "?" + l + "$)"), _ = u.querySelectorAll(d + "[data-" + c.DATASET_IDENTIFIER + "]");
        try {
          for (var b = i(_), S = b.next(); !S.done; S = b.next()) {
            var R = S.value;
            if (R.dataset[c.CAMEL_DATASET_IDENTIFIER] !== l) {
              var y = R.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
              v.test(y) && m.push(R);
            } else
              m.push(R);
          }
        } catch (x) {
          h = { error: x };
        } finally {
          try {
            S && !S.done && (p = b.return) && p.call(b);
          } finally {
            if (h)
              throw h.error;
          }
        }
        return m;
      }, n.forEach = function(u, l) {
        for (var d = 0; d < u.length; d++)
          l(u[d], d, u);
      }, n.removeEventListener = function(u, l, d) {
        u.removeEventListener(l, d);
      }, n.addEventListener = function(u, l, d) {
        return u.addEventListener(l, d), function() {
          n.removeEventListener(u, l, d);
        };
      }, n.addClass = function(u, l) {
        var d;
        Array.isArray(l) || (l = [l]), (d = u.classList).add.apply(d, a(l));
      }, n.removeClass = function(u, l) {
        u.classList.remove(l);
      }, n.removeAllClass = function(u) {
        u.className = "";
      }, n.hasClass = function(u, l) {
        return u.classList.contains(l);
      };
    }, function(o, n, r) {
      var i = this && this.__importDefault || function(h) {
        return h && h.__esModule ? h : { default: h };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var s = i(r(3)), a = r(1), c = r(11), f = i(r(6)), u = r(12), l = r(0), d = function() {
        function h(p, m, v, _, b) {
          b === void 0 && (b = !1), p.$node.nodeType === 3 && m.$node.nodeType === 3 || l.eventEmitter.emit(l.INTERNAL_ERROR_EVENT, { type: a.ERROR.RANGE_NODE_INVALID }), this.start = u.formatDomNode(p), this.end = u.formatDomNode(m), this.text = v, this.frozen = b, this.id = _;
        }
        return h.fromSelection = function(p) {
          var m = c.getDomRange();
          if (!m)
            return null;
          var v = { $node: m.startContainer, offset: m.startOffset }, _ = { $node: m.endContainer, offset: m.endOffset }, b = m.toString(), S = p.call(v, _, b);
          return new h(v, _, b, S = S ?? f.default());
        }, h.prototype.serialize = function(p, m) {
          var v, _ = u.getDomMeta(this.start.$node, this.start.offset, p), b = u.getDomMeta(this.end.$node, this.end.offset, p);
          return m.Serialize.RecordInfo.isEmpty() || (v = m.Serialize.RecordInfo.call(this.start, this.end, p)), this.frozen = !0, new s.default(_, b, this.text, this.id, v);
        }, h.removeDomRange = c.removeSelection, h;
      }();
      n.default = d;
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.default = function i(s) {
        return s ? (s ^ 16 * Math.random() >> s / 4).toString(16) : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, i);
      };
    }, function(o, n, r) {
      o.exports = r(8);
    }, function(o, n, r) {
      var i, s = this && this.__extends || (i = function(y, x) {
        return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(F, E) {
          F.__proto__ = E;
        } || function(F, E) {
          for (var B in E)
            Object.prototype.hasOwnProperty.call(E, B) && (F[B] = E[B]);
        })(y, x);
      }, function(y, x) {
        function F() {
          this.constructor = y;
        }
        i(y, x), y.prototype = x === null ? Object.create(x) : (F.prototype = x.prototype, new F());
      }), a = this && this.__assign || function() {
        return (a = Object.assign || function(y) {
          for (var x, F = 1, E = arguments.length; F < E; F++)
            for (var B in x = arguments[F])
              Object.prototype.hasOwnProperty.call(x, B) && (y[B] = x[B]);
          return y;
        }).apply(this, arguments);
      }, c = this && this.__importDefault || function(y) {
        return y && y.__esModule ? y : { default: y };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var f = c(r(2)), u = c(r(5)), l = c(r(3)), d = c(r(6)), h = c(r(13)), p = c(r(14)), m = c(r(16)), v = c(r(17)), _ = r(0), b = r(1), S = r(4), R = function(y) {
        function x(F) {
          var E = y.call(this) || this;
          E.event = p.default(), E.run = function() {
            return S.addEventListener(E.options.$root, E.event.PointerEnd, E._handleSelection);
          }, E.stop = function() {
            S.removeEventListener(E.options.$root, E.event.PointerEnd, E._handleSelection);
          }, E.addClass = function(O, M) {
            E.getDoms(M).forEach(function(G) {
              S.addClass(G, O);
            });
          }, E.removeClass = function(O, M) {
            E.getDoms(M).forEach(function(G) {
              S.removeClass(G, O);
            });
          }, E.getIdByDom = function(O) {
            return S.getHighlightId(O, E.options.$root);
          }, E.getExtraIdByDom = function(O) {
            return S.getExtraHighlightId(O, E.options.$root);
          }, E.getDoms = function(O) {
            return O ? S.getHighlightById(E.options.$root, O, E.options.wrapTag) : S.getHighlightsByRoot(E.options.$root, E.options.wrapTag);
          }, E.dispose = function() {
            var O = E.options.$root;
            S.removeEventListener(O, E.event.PointerOver, E._handleHighlightHover), S.removeEventListener(O, E.event.PointerEnd, E._handleSelection), S.removeEventListener(O, E.event.PointerTap, E._handleHighlightClick), E.removeAll();
          }, E.setOption = function(O) {
            E.options = a(a({}, E.options), O), E.painter = new v.default({ $root: E.options.$root, wrapTag: E.options.wrapTag, className: E.options.style.className, exceptSelectors: E.options.exceptSelectors }, E.hooks);
          }, E.fromRange = function(O) {
            var M = { $node: O.startContainer, offset: O.startOffset }, G = { $node: O.endContainer, offset: O.endOffset }, W = O.toString(), N = E.hooks.Render.UUID.call(M, G, W);
            N = N ?? d.default();
            var D = new u.default(M, G, W, N);
            return D ? E._highlightFromHRange(D) : (_.eventEmitter.emit(_.INTERNAL_ERROR_EVENT, { type: b.ERROR.RANGE_INVALID }), null);
          }, E.fromStore = function(O, M, G, W, N) {
            var D = new l.default(O, M, G, W, N);
            try {
              return E._highlightFromHSource(D), D;
            } catch (T) {
              return _.eventEmitter.emit(_.INTERNAL_ERROR_EVENT, { type: b.ERROR.HIGHLIGHT_SOURCE_RECREATE, error: T, detail: D }), null;
            }
          }, E._getHooks = function() {
            return { Render: { UUID: new h.default("Render.UUID"), SelectedNodes: new h.default("Render.SelectedNodes"), WrapNode: new h.default("Render.WrapNode") }, Serialize: { Restore: new h.default("Serialize.Restore"), RecordInfo: new h.default("Serialize.RecordInfo") }, Remove: { UpdateNodes: new h.default("Remove.UpdateNodes") } };
          }, E._highlightFromHRange = function(O) {
            var M = O.serialize(E.options.$root, E.hooks);
            return E.painter.highlightRange(O).length === 0 ? (_.eventEmitter.emit(_.INTERNAL_ERROR_EVENT, { type: b.ERROR.DOM_SELECTION_EMPTY }), null) : (E.cache.save(M), E.emit(b.EventType.CREATE, { sources: [M], type: b.CreateFrom.INPUT }, E), M);
          }, E._handleSelection = function() {
            var O = u.default.fromSelection(E.hooks.Render.UUID);
            O && (E._highlightFromHRange(O), u.default.removeDomRange());
          }, E._handleHighlightHover = function(O) {
            var M = O.target;
            if (!S.isHighlightWrapNode(M))
              return E._hoverId && E.emit(b.EventType.HOVER_OUT, { id: E._hoverId }, E, O), void (E._hoverId = null);
            var G = S.getHighlightId(M, E.options.$root);
            E._hoverId !== G && (E._hoverId && E.emit(b.EventType.HOVER_OUT, { id: E._hoverId }, E, O), E._hoverId = G, E.emit(b.EventType.HOVER, { id: E._hoverId }, E, O));
          }, E._handleError = function(O) {
            E.options.verbose && console.warn(O);
          }, E._handleHighlightClick = function(O) {
            var M = O.target;
            if (S.isHighlightWrapNode(M)) {
              var G = S.getHighlightId(M, E.options.$root);
              E.emit(b.EventType.CLICK, { id: G }, E, O);
            }
          }, E.options = _.getDefaultOptions(), E.hooks = E._getHooks(), E.setOption(F), E.cache = new m.default();
          var B = E.options.$root;
          return S.addEventListener(B, E.event.PointerOver, E._handleHighlightHover), S.addEventListener(B, E.event.PointerTap, E._handleHighlightClick), _.eventEmitter.on(_.INTERNAL_ERROR_EVENT, E._handleError), E;
        }
        return s(x, y), x.prototype.remove = function(F) {
          if (F) {
            var E = this.painter.removeHighlight(F);
            this.cache.remove(F), E && this.emit(b.EventType.REMOVE, { ids: [F] }, this);
          }
        }, x.prototype.removeAll = function() {
          this.painter.removeAllHighlight();
          var F = this.cache.removeAll();
          this.emit(b.EventType.REMOVE, { ids: F }, this);
        }, x.prototype._highlightFromHSource = function(F) {
          F === void 0 && (F = []);
          var E = this.painter.highlightSource(F);
          this.emit(b.EventType.CREATE, { sources: E, type: b.CreateFrom.STORE }, this), this.cache.save(F);
        }, x.event = b.EventType, x.isHighlightWrapNode = S.isHighlightWrapNode, x.isHighlightSource = function(F) {
          return !!F.__isHighlightSource;
        }, x;
      }(f.default);
      n.default = R;
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.queryElementNode = n.getTextChildByOffset = void 0;
      var i = r(0);
      n.getTextChildByOffset = function(s, a) {
        for (var c = [s], f = null, u = 0, l = 0; f = c.pop(); ) {
          for (var d = f.childNodes, h = d.length - 1; h >= 0; h--)
            c.push(d[h]);
          if (f.nodeType === 3 && (l = a - u, (u += f.textContent.length) >= a))
            break;
        }
        return f || (f = s), { $node: f, offset: l };
      }, n.queryElementNode = function(s, a) {
        return { start: s.startMeta.parentIndex === i.ROOT_IDX ? a : a.getElementsByTagName(s.startMeta.parentTagName)[s.startMeta.parentIndex], end: s.endMeta.parentIndex === i.ROOT_IDX ? a : a.getElementsByTagName(s.endMeta.parentTagName)[s.endMeta.parentIndex] };
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.default = function(i) {
        return i.split("-").reduce(function(s, a, c) {
          return s + (c === 0 ? a : a[0].toUpperCase() + a.slice(1));
        }, "");
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.removeSelection = n.getDomRange = void 0, n.getDomRange = function() {
        var i = window.getSelection();
        return i.isCollapsed ? (console.debug("no text selected"), null) : i.getRangeAt(0);
      }, n.removeSelection = function() {
        window.getSelection().removeAllRanges();
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.formatDomNode = n.getDomMeta = void 0;
      var i = r(0);
      n.getDomMeta = function(s, a, c) {
        var f = function(d) {
          if (d instanceof HTMLElement && (!d.dataset || !d.dataset[i.CAMEL_DATASET_IDENTIFIER]))
            return d;
          for (var h = d.parentNode; h != null && h.dataset[i.CAMEL_DATASET_IDENTIFIER]; )
            h = h.parentNode;
          return h;
        }(s), u = f === c ? i.ROOT_IDX : function(d, h) {
          for (var p = d.tagName, m = h.getElementsByTagName(p), v = 0; v < m.length; v++)
            if (d === m[v])
              return v;
          return i.UNKNOWN_IDX;
        }(f, c), l = function(d, h) {
          for (var p = [d], m = null, v = 0; m = p.pop(); ) {
            for (var _ = m.childNodes, b = _.length - 1; b >= 0; b--)
              p.push(_[b]);
            if (m.nodeType === 3 && m !== h)
              v += m.textContent.length;
            else if (m.nodeType === 3)
              break;
          }
          return v;
        }(f, s);
        return { parentTagName: f.tagName, parentIndex: u, textOffset: l + a };
      }, n.formatDomNode = function(s) {
        return s.$node.nodeType === 3 || s.$node.nodeType === 4 || s.$node.nodeType === 8 ? s : { $node: s.$node.childNodes[s.offset], offset: 0 };
      };
    }, function(o, n, r) {
      var i = this && this.__read || function(c, f) {
        var u = typeof Symbol == "function" && c[Symbol.iterator];
        if (!u)
          return c;
        var l, d, h = u.call(c), p = [];
        try {
          for (; (f === void 0 || f-- > 0) && !(l = h.next()).done; )
            p.push(l.value);
        } catch (m) {
          d = { error: m };
        } finally {
          try {
            l && !l.done && (u = h.return) && u.call(h);
          } finally {
            if (d)
              throw d.error;
          }
        }
        return p;
      }, s = this && this.__spread || function() {
        for (var c = [], f = 0; f < arguments.length; f++)
          c = c.concat(i(arguments[f]));
        return c;
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var a = function() {
        function c(f) {
          this.name = "", this.ops = [], this.name = f;
        }
        return c.prototype.tap = function(f) {
          var u = this;
          return this.ops.indexOf(f) === -1 && this.ops.push(f), function() {
            u.remove(f);
          };
        }, c.prototype.remove = function(f) {
          var u = this.ops.indexOf(f);
          u < 0 || this.ops.splice(u, 1);
        }, c.prototype.isEmpty = function() {
          return this.ops.length === 0;
        }, c.prototype.call = function() {
          for (var f, u = [], l = 0; l < arguments.length; l++)
            u[l] = arguments[l];
          return this.ops.forEach(function(d) {
            f = d.apply(void 0, s(u));
          }), f;
        }, c;
      }();
      n.default = a;
    }, function(o, n, r) {
      var i = this && this.__importDefault || function(c) {
        return c && c.__esModule ? c : { default: c };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var s = r(1), a = i(r(15));
      n.default = function() {
        var c = a.default(window.navigator.userAgent);
        return { PointerEnd: c ? s.UserInputEvent.touchend : s.UserInputEvent.mouseup, PointerTap: c ? s.UserInputEvent.touchstart : s.UserInputEvent.click, PointerOver: c ? s.UserInputEvent.touchstart : s.UserInputEvent.mouseover };
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 });
      var i = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
      n.default = function(s) {
        return i.test(s);
      };
    }, function(o, n, r) {
      var i, s = this && this.__extends || (i = function(d, h) {
        return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, m) {
          p.__proto__ = m;
        } || function(p, m) {
          for (var v in m)
            Object.prototype.hasOwnProperty.call(m, v) && (p[v] = m[v]);
        })(d, h);
      }, function(d, h) {
        function p() {
          this.constructor = d;
        }
        i(d, h), d.prototype = h === null ? Object.create(h) : (p.prototype = h.prototype, new p());
      }), a = this && this.__values || function(d) {
        var h = typeof Symbol == "function" && Symbol.iterator, p = h && d[h], m = 0;
        if (p)
          return p.call(d);
        if (d && typeof d.length == "number")
          return { next: function() {
            return d && m >= d.length && (d = void 0), { value: d && d[m++], done: !d };
          } };
        throw new TypeError(h ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, c = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var f = c(r(2)), u = r(1), l = function(d) {
        function h() {
          var p = d !== null && d.apply(this, arguments) || this;
          return p._data = /* @__PURE__ */ new Map(), p;
        }
        return s(h, d), Object.defineProperty(h.prototype, "data", { get: function() {
          return this.getAll();
        }, set: function(p) {
          throw u.ERROR.CACHE_SET_ERROR;
        }, enumerable: !1, configurable: !0 }), h.prototype.save = function(p) {
          var m = this;
          Array.isArray(p) ? p.forEach(function(v) {
            return m._data.set(v.id, v);
          }) : this._data.set(p.id, p);
        }, h.prototype.get = function(p) {
          return this._data.get(p);
        }, h.prototype.remove = function(p) {
          this._data.delete(p);
        }, h.prototype.getAll = function() {
          var p, m, v = [];
          try {
            for (var _ = a(this._data), b = _.next(); !b.done; b = _.next()) {
              var S = b.value;
              v.push(S[1]);
            }
          } catch (R) {
            p = { error: R };
          } finally {
            try {
              b && !b.done && (m = _.return) && m.call(_);
            } finally {
              if (p)
                throw p.error;
            }
          }
          return v;
        }, h.prototype.removeAll = function() {
          var p, m, v = [];
          try {
            for (var _ = a(this._data), b = _.next(); !b.done; b = _.next()) {
              var S = b.value;
              v.push(S[0]);
            }
          } catch (R) {
            p = { error: R };
          } finally {
            try {
              b && !b.done && (m = _.return) && m.call(_);
            } finally {
              if (p)
                throw p.error;
            }
          }
          return this._data = /* @__PURE__ */ new Map(), v;
        }, h;
      }(f.default);
      n.default = l;
    }, function(o, n, r) {
      var i = this && this.__values || function(v) {
        var _ = typeof Symbol == "function" && Symbol.iterator, b = _ && v[_], S = 0;
        if (b)
          return b.call(v);
        if (v && typeof v.length == "number")
          return { next: function() {
            return v && S >= v.length && (v = void 0), { value: v && v[S++], done: !v };
          } };
        throw new TypeError(_ ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, s = this && this.__read || function(v, _) {
        var b = typeof Symbol == "function" && v[Symbol.iterator];
        if (!b)
          return v;
        var S, R, y = b.call(v), x = [];
        try {
          for (; (_ === void 0 || _-- > 0) && !(S = y.next()).done; )
            x.push(S.value);
        } catch (F) {
          R = { error: F };
        } finally {
          try {
            S && !S.done && (b = y.return) && b.call(y);
          } finally {
            if (R)
              throw R.error;
          }
        }
        return x;
      }, a = this && this.__spread || function() {
        for (var v = [], _ = 0; _ < arguments.length; _++)
          v = v.concat(s(arguments[_]));
        return v;
      }, c = this && this.__importDefault || function(v) {
        return v && v.__esModule ? v : { default: v };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var f = c(r(3)), u = r(18), l = r(4), d = r(1), h = r(20), p = r(0), m = function() {
        function v(_, b) {
          this.options = { $root: _.$root, wrapTag: _.wrapTag, exceptSelectors: _.exceptSelectors, className: _.className }, this.hooks = b, h.initDefaultStylesheet();
        }
        return v.prototype.highlightRange = function(_) {
          var b = this;
          if (!_.frozen)
            throw d.ERROR.HIGHLIGHT_RANGE_FROZEN;
          var S = this.options, R = S.$root, y = S.className, x = S.exceptSelectors, F = this.hooks, E = u.getSelectedNodes(R, _.start, _.end, x);
          return F.Render.SelectedNodes.isEmpty() || (E = F.Render.SelectedNodes.call(_.id, E) || []), E.map(function(B) {
            var O = u.wrapHighlight(B, _, y, b.options.wrapTag);
            return F.Render.WrapNode.isEmpty() || (O = F.Render.WrapNode.call(_.id, O)), O;
          });
        }, v.prototype.highlightSource = function(_) {
          var b = this, S = Array.isArray(_) ? _ : [_], R = [];
          return S.forEach(function(y) {
            if (y instanceof f.default) {
              var x = y.deSerialize(b.options.$root, b.hooks);
              b.highlightRange(x).length > 0 ? R.push(y) : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, { type: d.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER, detail: y });
            } else
              p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, { type: d.ERROR.SOURCE_TYPE_ERROR });
          }), R;
        }, v.prototype.removeHighlight = function(_) {
          var b, S, R = new RegExp("(" + _ + "\\" + p.ID_DIVISION + "|\\" + p.ID_DIVISION + "?" + _ + "$)"), y = this.hooks, x = this.options.wrapTag, F = document.querySelectorAll(x + "[data-" + p.DATASET_IDENTIFIER + "]"), E = [], B = [], O = [];
          try {
            for (var M = i(F), G = M.next(); !G.done; G = M.next()) {
              var W = G.value, N = W.dataset[p.CAMEL_DATASET_IDENTIFIER], D = W.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
              N !== _ || D ? N === _ ? B.push(W) : N !== _ && R.test(D) && O.push(W) : E.push(W);
            }
          } catch (T) {
            b = { error: T };
          } finally {
            try {
              G && !G.done && (S = M.return) && S.call(M);
            } finally {
              if (b)
                throw b.error;
            }
          }
          return E.forEach(function(T) {
            var I = T.parentNode, w = document.createDocumentFragment();
            l.forEach(T.childNodes, function(A) {
              return w.appendChild(A.cloneNode(!1));
            });
            var L = T.previousSibling, C = T.nextSibling;
            I.replaceChild(w, T), u.normalizeSiblingText(L, !0), u.normalizeSiblingText(C, !1), y.Remove.UpdateNodes.call(_, T, "remove");
          }), B.forEach(function(T) {
            var I = T.dataset, w = I[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(p.ID_DIVISION), L = w.shift(), C = document.querySelector(x + "[data-" + p.DATASET_IDENTIFIER + '="' + L + '"]');
            C && (l.removeAllClass(T), l.addClass(T, a(C.classList))), I[p.CAMEL_DATASET_IDENTIFIER] = L, I[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = w.join(p.ID_DIVISION), y.Remove.UpdateNodes.call(_, T, "id-update");
          }), O.forEach(function(T) {
            var I = T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
            T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = I.replace(R, ""), y.Remove.UpdateNodes.call(_, T, "extra-update");
          }), E.length + B.length + O.length !== 0;
        }, v.prototype.removeAllHighlight = function() {
          var _ = this.options, b = _.wrapTag, S = _.$root;
          l.getHighlightsByRoot(S, b).forEach(function(R) {
            var y = R.parentNode, x = document.createDocumentFragment();
            l.forEach(R.childNodes, function(F) {
              return x.appendChild(F.cloneNode(!1));
            }), y.replaceChild(x, R);
          });
        }, v;
      }();
      n.default = m;
    }, function(o, n, r) {
      var i = this && this.__read || function(p, m) {
        var v = typeof Symbol == "function" && p[Symbol.iterator];
        if (!v)
          return p;
        var _, b, S = v.call(p), R = [];
        try {
          for (; (m === void 0 || m-- > 0) && !(_ = S.next()).done; )
            R.push(_.value);
        } catch (y) {
          b = { error: y };
        } finally {
          try {
            _ && !_.done && (v = S.return) && v.call(S);
          } finally {
            if (b)
              throw b.error;
          }
        }
        return R;
      }, s = this && this.__spread || function() {
        for (var p = [], m = 0; m < arguments.length; m++)
          p = p.concat(i(arguments[m]));
        return p;
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.normalizeSiblingText = n.wrapHighlight = n.getSelectedNodes = void 0;
      var a = r(1), c = r(4), f = r(0), u = r(19), l = function(p, m) {
        if (!p)
          return !1;
        if (/^\./.test(m)) {
          var v = m.replace(/^\./, "");
          return p && c.hasClass(p, v);
        }
        if (/^#/.test(m)) {
          var _ = m.replace(/^#/, "");
          return p && p.id === _;
        }
        var b = m.toUpperCase();
        return p && p.tagName === b;
      };
      n.getSelectedNodes = function(p, m, v, _) {
        var b = m.$node, S = v.$node, R = m.offset, y = v.offset;
        if (b === S && b instanceof Text)
          return function(N, D, T, I) {
            for (var w = N, L = function(A) {
              return I == null ? void 0 : I.some(function(U) {
                return l(A, U);
              });
            }; w; ) {
              if (w.nodeType === 1 && L(w))
                return [];
              w = w.parentNode;
            }
            N.splitText(D);
            var C = N.nextSibling;
            return C.splitText(T - D), [{ $node: C, type: a.SelectedNodeType.text, splitType: a.SplitType.both }];
          }(b, R, y, _);
        for (var x = [p], F = [], E = function(N) {
          return _ == null ? void 0 : _.some(function(D) {
            return l(N, D);
          });
        }, B = !1, O = null; O = x.pop(); )
          if (O.nodeType !== 1 || !E(O)) {
            for (var M = O.childNodes, G = M.length - 1; G >= 0; G--)
              x.push(M[G]);
            if (O === b) {
              if (O.nodeType === 3) {
                O.splitText(R);
                var W = O.nextSibling;
                F.push({ $node: W, type: a.SelectedNodeType.text, splitType: a.SplitType.head });
              }
              B = !0;
            } else {
              if (O === S) {
                O.nodeType === 3 && ((W = O).splitText(y), F.push({ $node: W, type: a.SelectedNodeType.text, splitType: a.SplitType.tail }));
                break;
              }
              B && O.nodeType === 3 && F.push({ $node: O, type: a.SelectedNodeType.text, splitType: a.SplitType.none });
            }
          }
        return F;
      };
      var d = function(p, m) {
        var v = Array.isArray(m) ? m : [m];
        return (v = v.length === 0 ? [f.getDefaultOptions().style.className] : v).forEach(function(_) {
          c.addClass(p, _);
        }), p;
      }, h = function(p) {
        return !p || !p.textContent;
      };
      n.wrapHighlight = function(p, m, v, _) {
        var b = p.$node.parentNode, S = p.$node.previousSibling, R = p.$node.nextSibling;
        return c.isHighlightWrapNode(b) ? !c.isHighlightWrapNode(b) || h(S) && h(R) ? function(y, x, F) {
          var E = y.$node.parentNode, B = E;
          c.removeAllClass(B), d(B, F);
          var O = E.dataset, M = O[f.CAMEL_DATASET_IDENTIFIER];
          return O[f.CAMEL_DATASET_IDENTIFIER] = x.id, O[f.CAMEL_DATASET_IDENTIFIER_EXTRA] = O[f.CAMEL_DATASET_IDENTIFIER_EXTRA] ? M + f.ID_DIVISION + O[f.CAMEL_DATASET_IDENTIFIER_EXTRA] : M, B;
        }(p, m, v) : function(y, x, F, E) {
          var B = document.createElement(E), O = y.$node.parentNode, M = y.$node.previousSibling, G = y.$node.nextSibling, W = document.createDocumentFragment(), N = O.dataset[f.CAMEL_DATASET_IDENTIFIER], D = O.dataset[f.CAMEL_DATASET_IDENTIFIER_EXTRA], T = D ? N + f.ID_DIVISION + D : N;
          B.setAttribute("data-" + f.DATASET_IDENTIFIER, x.id), B.setAttribute("data-" + f.DATASET_IDENTIFIER_EXTRA, T), B.appendChild(y.$node.cloneNode(!1));
          var I, w = !1, L = !1;
          M && ((C = O.cloneNode(!1)).textContent = M.textContent, W.appendChild(C), w = !0);
          var C, A = [];
          return Array.isArray(F) ? A.push.apply(A, s(F)) : A.push(F), d(B, u.unique(A)), W.appendChild(B), G && ((C = O.cloneNode(!1)).textContent = G.textContent, W.appendChild(C), L = !0), I = w && L ? a.SplitType.both : w ? a.SplitType.head : L ? a.SplitType.tail : a.SplitType.none, B.setAttribute("data-" + f.DATASET_SPLIT_TYPE, I), O.parentNode.replaceChild(W, O), B;
        }(p, m, v, _) : function(y, x, F, E) {
          var B = document.createElement(E);
          return d(B, F), B.appendChild(y.$node.cloneNode(!1)), y.$node.parentNode.replaceChild(B, y.$node), B.setAttribute("data-" + f.DATASET_IDENTIFIER, x.id), B.setAttribute("data-" + f.DATASET_SPLIT_TYPE, y.splitType), B.setAttribute("data-" + f.DATASET_IDENTIFIER_EXTRA, ""), B;
        }(p, m, v, _);
      }, n.normalizeSiblingText = function(p, m) {
        if (m === void 0 && (m = !0), p && p.nodeType === 3) {
          var v = m ? p.nextSibling : p.previousSibling;
          if (v.nodeType === 3) {
            var _ = v.nodeValue;
            p.nodeValue = m ? p.nodeValue + _ : _ + p.nodeValue, v.parentNode.removeChild(v);
          }
        }
      };
    }, function(o, n, r) {
      var i = this && this.__values || function(s) {
        var a = typeof Symbol == "function" && Symbol.iterator, c = a && s[a], f = 0;
        if (c)
          return c.call(s);
        if (s && typeof s.length == "number")
          return { next: function() {
            return s && f >= s.length && (s = void 0), { value: s && s[f++], done: !s };
          } };
        throw new TypeError(a ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.unique = void 0, n.unique = function(s) {
        var a, c, f = [];
        try {
          for (var u = i(s), l = u.next(); !l.done; l = u.next()) {
            var d = l.value;
            f.indexOf(d) === -1 && f.push(d);
          }
        } catch (h) {
          a = { error: h };
        } finally {
          try {
            l && !l.done && (c = u.return) && c.call(u);
          } finally {
            if (a)
              throw a.error;
          }
        }
        return f;
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.initDefaultStylesheet = void 0;
      var i = r(0);
      n.initDefaultStylesheet = function() {
        var s = i.STYLESHEET_ID, a = document.getElementById(s);
        if (!a) {
          var c = document.createTextNode(i.getStylesheet());
          (a = document.createElement("style")).id = s, a.appendChild(c), document.head.appendChild(a);
        }
        return a;
      };
    }]).default;
  });
})(Gr);
var la = Gr.exports;
const Xr = /* @__PURE__ */ tt(la), We = new Xr({
  style: {
    className: Es
  }
  // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
}), Dn = new Xr({
  style: {
    className: bs
  }
  // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
}), Zr = (e, t) => t.filter(
  (o) => {
    var n;
    return ((n = o.$node.nodeValue) == null ? void 0 : n.trim()) !== "";
  }
), Jr = (e, t, o) => {
  const n = t, r = o, i = ["BR", "HR"];
  return i.includes(n.$node.nodeName) && n.$node.parentNode && (n.$node = n.$node.parentNode), i.includes(r.$node.nodeName) && r.$node.parentNode && (r.$node = r.$node.parentNode), [n, r];
};
We.hooks.Render.SelectedNodes.tap(Zr);
We.hooks.Serialize.Restore.tap(Jr);
Dn.hooks.Render.SelectedNodes.tap(Zr);
Dn.hooks.Serialize.Restore.tap(Jr);
We.on("selection:hover", ({ id: e }) => {
  We.addClass(ur, e);
}).on("selection:hover-out", ({ id: e }) => {
  We.removeClass(ur, e);
});
const fa = (e) => {
  var t, o;
  return (t = e.meta) != null && t.highlight ? JSON.parse((o = e.meta) == null ? void 0 : o.highlight) : null;
}, da = (e) => {
  const t = fa(e);
  t && (We.remove(t.id), Dn.remove(t.id));
}, Qr = () => {
  var e, t, o;
  return (o = (t = (e = document.getElementById("code")) == null ? void 0 : e.parentElement) == null ? void 0 : t.querySelector("code-block")) == null ? void 0 : o.querySelector("code.ng-binding.highlight");
}, pa = () => {
  const e = le(
    (u) => u.selectedConversationId ? u.conversations[u.selectedConversationId] : null
  ), t = le(
    (u) => u.docsAppRendered
  ), o = le(
    (u) => u.newConversation
  ), n = De(), [r, i] = ge(null), [s, a] = ge(null);
  Ae(() => {
    o && (i(null), a(null));
  }, [o]);
  const c = Ke(() => {
    console.log("resetHighlights"), r && da(r), a(null), i(null);
  }, [r]);
  return Ae(() => {
    !e || !t || e.meta.resource_type && e.meta.uniqueId && (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`);
  }, [e, t, n]), {
    getHighlightedSelectionData: () => r,
    pos: s,
    onSelectionEnd: (u) => {
      var G;
      const { end: l, start: d } = u.detail.selectionRange, h = document.getSelection();
      if (!h || !h.rangeCount)
        return c(), null;
      const m = h.getRangeAt(0).toString(), v = Qr(), _ = v == null ? void 0 : v.innerText;
      if (!m || !_)
        return;
      const b = v.querySelectorAll(
        ".line-numbers-rows > span"
      ), S = m.split(`
`), R = Math.max(d.y, l.y), y = Array.from(b).findIndex((W) => {
        const { height: N, y: D } = W.getBoundingClientRect();
        return R >= D && R <= D + N;
      }), x = b[y], F = y - S.length + 1;
      console.log("start and end lines found", F, y);
      const E = window.location.hash, B = E.split("#"), O = (G = B.find((W) => W.startsWith("!"))) == null ? void 0 : G.split("/");
      if (!O || O.length < 3) {
        console.error("Unable to find model parts", B, O);
        return;
      }
      console.log("model parts found", O);
      const M = {
        meta: {
          filePath: `${E}.sql`,
          highlight: m,
          uniqueId: O[2],
          resource_type: O[1],
          range: {
            end: { line: y, character: 0 },
            start: { line: F, character: 0 }
          }
        }
      };
      a({
        x: x.offsetLeft,
        y: x.offsetTop + x.offsetHeight / 2,
        element: v
      }), i(M);
    }
  };
}, ha = ({
  conversationGroup: e,
  codeSection: t
}) => {
  const o = le(
    (a) => a.selectedConversationId
  ), n = De(), r = Te(null), i = () => {
    n(
      On(e.conversation_group_id)
    );
  }, s = lt(() => {
    if (!t)
      return;
    let a = 0, c = 0;
    for (let f = e.meta.range.start.line; f <= e.meta.range.end.line; f++) {
      const u = t.querySelector(
        `.line-numbers-rows > span:nth-child(${f + 1})`
      );
      u && (f === e.meta.range.start.line && (a = u.offsetTop), f === e.meta.range.end.line && (c = u.offsetTop + u.offsetHeight));
    }
    return { top: a, bottom: c };
  }, [
    t,
    e.meta.range.end.line,
    e.meta.range.start.line
  ]);
  return Ae(() => {
    var a;
    o && ((a = r.current) == null || a.scrollIntoView({
      behavior: "smooth",
      block: "center"
    }));
  }, [o]), !s || !(t != null && t.parentElement) ? null : jr(
    /* @__PURE__ */ P.jsx(
      "div",
      {
        ref: r,
        className: `altimate-highlighter ${o === e.conversation_group_id ? "active" : ""}`,
        style: { top: s.top + 15, height: s.bottom - s.top },
        onClick: i
      }
    ),
    t.parentElement
  );
}, ga = ha, va = () => {
  const e = le(
    (i) => Object.values(i.conversations || {})
  ), t = le(
    (i) => i.codeblockLoaded
  ), o = le(
    (i) => i.currentPage
  ), n = e == null ? void 0 : e.filter(
    (i) => i.meta.resource_type === o.resourceType && i.meta.uniqueId === o.name
  );
  if (!(n != null && n.length) || !t)
    return null;
  const r = Qr();
  return /* @__PURE__ */ P.jsx(P.Fragment, { children: n.map((i) => /* @__PURE__ */ P.jsx(
    ga,
    {
      codeSection: r,
      conversationGroup: i
    },
    i.conversation_group_id
  )) });
}, ma = va, ya = "_dbtDocs_1yt0b_1", Ea = "_conversationRightPanelCloseButton_1yt0b_14", ba = "_conversationRightPanel_1yt0b_14", _a = "_newConversationForm_1yt0b_46", Sa = "_highlightText_1yt0b_60", Ca = "_conversationInputForm_1yt0b_81", Ta = "_conversationGroup_1yt0b_107", Oa = "_replyForm_1yt0b_139", Ra = "_resolveButton_1yt0b_165", Fe = {
  dbtDocs: ya,
  conversationRightPanelCloseButton: Ea,
  conversationRightPanel: ba,
  newConversationForm: _a,
  highlightText: Sa,
  conversationInputForm: Ca,
  conversationGroup: Ta,
  replyForm: Oa,
  resolveButton: Ra
}, Aa = "_profileImage_11vaf_1", Da = {
  profileImage: Aa
}, wa = ({ user: e }) => {
  var t;
  return /* @__PURE__ */ P.jsx("div", { className: Da.profileImage, children: ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "" });
}, eo = wa;
function Ia(e) {
  if (Array.isArray(e)) {
    for (var t = 0, o = new Array(e.length); t < e.length; t++)
      o[t] = e[t];
    return o;
  }
}
function xa(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]")
    return Array.from(e);
}
function Na() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function xt(e) {
  return Ia(e) || xa(e) || Na();
}
function Oe() {
  return Oe = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, Oe.apply(this, arguments);
}
function ja(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function cr(e, t) {
  for (var o = 0; o < t.length; o++) {
    var n = t[o];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Pa(e, t, o) {
  return t && cr(e.prototype, t), o && cr(e, o), e;
}
function te(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function gn(e, t) {
  return gn = Object.setPrototypeOf || function(n, r) {
    return n.__proto__ = r, n;
  }, gn(e, t);
}
function Fa(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && gn(e, t);
}
function Ye(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ye = function(o) {
    return typeof o;
  } : Ye = function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, Ye(e);
}
function Tt(e) {
  return typeof Symbol == "function" && Ye(Symbol.iterator) === "symbol" ? Tt = function(o) {
    return Ye(o);
  } : Tt = function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : Ye(o);
  }, Tt(e);
}
function Ma(e, t) {
  return t && (Tt(t) === "object" || typeof t == "function") ? t : te(e);
}
function Nt(e) {
  return Nt = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, Nt(e);
}
function ee(e, t, o) {
  return t in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}
var $a = function(e, t, o, n, r, i, s, a) {
  if (process.env.NODE_ENV !== "production" && t === void 0)
    throw new Error("invariant requires an error message argument");
  if (!e) {
    var c;
    if (t === void 0)
      c = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    else {
      var f = [o, n, r, i, s, a], u = 0;
      c = new Error(
        t.replace(/%s/g, function() {
          return f[u++];
        })
      ), c.name = "Invariant Violation";
    }
    throw c.framesToPop = 1, c;
  }
}, ka = $a;
const Je = /* @__PURE__ */ tt(ka);
function La(e) {
  if (Array.isArray(e))
    return e;
}
function Ba(e, t) {
  var o = [], n = !0, r = !1, i = void 0;
  try {
    for (var s = e[Symbol.iterator](), a; !(n = (a = s.next()).done) && (o.push(a.value), !(t && o.length === t)); n = !0)
      ;
  } catch (c) {
    r = !0, i = c;
  } finally {
    try {
      !n && s.return != null && s.return();
    } finally {
      if (r)
        throw i;
    }
  }
  return o;
}
function Ha() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function jt(e, t) {
  return La(e) || Ba(e, t) || Ha();
}
function Ua(e, t) {
  if (e == null)
    return {};
  var o = {}, n = Object.keys(e), r, i;
  for (i = 0; i < n.length; i++)
    r = n[i], !(t.indexOf(r) >= 0) && (o[r] = e[r]);
  return o;
}
function za(e, t) {
  if (e == null)
    return {};
  var o = Ua(e, t), n, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++)
      n = i[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function pt(e) {
  "@babel/helpers - typeof";
  return pt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pt(e);
}
function Va(e, t) {
  if (pt(e) != "object" || !e)
    return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var n = o.call(e, t || "default");
    if (pt(n) != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function qa(e) {
  var t = Va(e, "string");
  return pt(t) == "symbol" ? t : t + "";
}
function ht(e, t, o) {
  return t = qa(t), t in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}
function vn(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, n = new Array(t); o < t; o++)
    n[o] = e[o];
  return n;
}
function Wa(e) {
  if (Array.isArray(e))
    return vn(e);
}
function Ya(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Ka(e, t) {
  if (e) {
    if (typeof e == "string")
      return vn(e, t);
    var o = Object.prototype.toString.call(e).slice(8, -1);
    if (o === "Object" && e.constructor && (o = e.constructor.name), o === "Map" || o === "Set")
      return Array.from(e);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return vn(e, t);
  }
}
function Ga() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xe(e) {
  return Wa(e) || Ya(e) || Ka(e) || Ga();
}
var rt = function(t) {
  return t === Object(t) ? Object.keys(t) : [];
}, to = function(t) {
  return t === Object(t) ? Object.values(t) : [];
};
function no(e, t) {
  var o = Object.assign({}, e);
  return Ot(e) && Ot(t) && rt(t).forEach(function(n) {
    Ot(t[n]) ? n in e ? o[n] = no(e[n], t[n]) : Object.assign(o, ht({}, n, t[n])) : Object.assign(o, ht({}, n, t[n]));
  }), o;
}
var mn = function(t) {
  for (var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, s) {
    return no(i, s);
  }, t);
}, Xa = function(t, o) {
  var n = Object.assign({}, t);
  if (o)
    for (var r = 0; r < o.length; r++)
      delete n[o[r]];
  return n;
}, Ot = function(t) {
  return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
}, Za = function(t) {
  return (t || []).filter(Boolean);
}, wn = function(t) {
  return t[0] === "&";
}, Ja = function(t) {
  return !wn(t);
}, lr = function(t) {
  return t.replace(/-(\w)/g, function(o, n) {
    return n.toUpperCase();
  });
}, Qa = function(t) {
  for (var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = rt(t), r = {}, i = 0, s = n.length; i < s; i += 1) {
    var a = n[i], c = Object.prototype.toString.call(t[a]) !== "[object Object]" || // style defs
    a[0] === ":" || // pseudo selectors
    a[0] === "@" || // @media / @keyframes / @supports / @font-face
    o.indexOf(a) >= 0;
    c && (r[a] = t[a]);
  }
  return r;
}, ro = function(t, o) {
  for (var n = o.map(lr), r = rt(t), i = {}, s = 0, a = r.length; s < a; s += 1) {
    var c = r[s];
    (o.indexOf(c) >= 0 || n.indexOf(lr(c)) >= 0) && (i[c] = t[c]);
  }
  return i;
}, eu = function e(t, o) {
  for (var n = mn.apply(void 0, [{}, Xa(t, o)].concat(xe(to(ro(t, o))))), r = rt(n).filter(wn), i = 0, s = r.length; i < s; i += 1) {
    var a = r[i], c = e(n[a], o);
    o.indexOf(a) >= 0 ? (delete n[a], n = mn({}, n, c)) : n[a] = c;
  }
  return n;
};
function fr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function dr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fr(Object(o), !0).forEach(function(n) {
      ht(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : fr(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
var tu = ["animationName"], nu = function(t) {
  var o = t.style, n = t.className;
  return dr(dr({}, o ? {
    style: Qa(o, tu)
  } : {}), n ? {
    className: n
  } : {});
};
const oo = nu;
var io = /* @__PURE__ */ Qe(oo);
io.Provider;
var so = function(t) {
  if (t) {
    if (typeof t == "string")
      return [t];
    if (!Array.isArray(t)) {
      var o = t;
      return rt(t).reduce(function(n, r) {
        return n.concat(o[r] ? [r] : []);
      }, []);
    }
  } else
    return [];
  return t;
}, ru = {}, ou = function(t) {
  return function(o, n) {
    var r = n || ru;
    t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
    var i;
    t.memoize.has(r) ? i = t.memoize.get(r) : (i = {}, t.memoize.set(r, i));
    var s = so(o).join(" ");
    return s in i ? i[s] : i[s] = t(o || [], n);
  };
};
function pr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function Ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pr(Object(o), !0).forEach(function(n) {
      ht(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : pr(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
var iu = function(t) {
  var o = t && rt(t)[0];
  return o && o.split("__")[0].split("--")[0];
}, su = function(t, o, n) {
  if (t) {
    var r = t.split(" ")[0], i = [].concat(xe(o.length === 0 ? n.map(function(s) {
      return "".concat(r, "--").concat(s.substring(1));
    }) : []), xe(o.map(function(s) {
      return "".concat(r, "__").concat(s);
    })));
    return o.length === 0 ? [t].concat(xe(i)) : i;
  }
};
function ao(e) {
  var t = e.style, o = e.className, n = e.classNames, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : oo, i = o || iu(n) || (t == null ? void 0 : t.className), s = typeof t == "function" ? t : ou(function(l, d) {
    var h = so(l);
    Je(Array.isArray(h), "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value."), Je(!d || Ot(d), "Optional second parameter must be a plain object.");
    var p = h.filter(wn), m = h.filter(Ja), v = m.length > 0 ? function(S) {
      return to(ro(S, m));
    } : function(S) {
      return [S];
    }, _ = function() {
      var R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return v(eu(R, p));
    }, b = su(i, m, p);
    return ao(Ve(Ve(Ve({}, (t || d) && {
      style: mn.apply(void 0, [{}].concat(xe(_(d)), xe(_(t))))
    }), b && {
      className: b.join(" ")
    }), n && {
      classNames: n
    }), r);
  }), a = Ve({}, typeof t == "function" ? t : {
    style: t
  }), c = xe(new Set([].concat(xe(a.className ? a.className.split(" ") : []), xe(i ? i.split(" ") : [])))), f = n ? Za(c.map(function(l) {
    return n[l];
  })) : c, u = r(Ve(Ve({}, a), f.length > 0 ? {
    className: f.join(" ")
  } : {}));
  return Object.assign(s, u), s;
}
function hr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function at(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hr(Object(o), !0).forEach(function(n) {
      ht(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : hr(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
var au = function() {
  for (var t = arguments.length, o = new Array(t), n = 0; n < t; n++)
    o[n] = arguments[n];
  return o.reduce(function(r, i) {
    return at(at(at({}, r), typeof i == "function" ? i : {}), {}, {
      style: at(at({}, r.style), typeof i == "function" ? i.style : i)
    });
  }, {});
}, In = function(t, o, n) {
  var r = o.style, i = o.className, s = o.classNames, a = et(io), c = lt(function() {
    return ao({
      style: r,
      className: i,
      classNames: s
    }, a);
  }, [r, i, s, a]);
  return c(n, t);
}, yn = { exports: {} }, _t = { exports: {} }, se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gr;
function uu() {
  if (gr)
    return se;
  gr = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, r = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, l = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, p = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, b = e ? Symbol.for("react.scope") : 60119;
  function S(y) {
    if (typeof y == "object" && y !== null) {
      var x = y.$$typeof;
      switch (x) {
        case t:
          switch (y = y.type, y) {
            case c:
            case f:
            case n:
            case i:
            case r:
            case l:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case a:
                case u:
                case p:
                case h:
                case s:
                  return y;
                default:
                  return x;
              }
          }
        case o:
          return x;
      }
    }
  }
  function R(y) {
    return S(y) === f;
  }
  return se.AsyncMode = c, se.ConcurrentMode = f, se.ContextConsumer = a, se.ContextProvider = s, se.Element = t, se.ForwardRef = u, se.Fragment = n, se.Lazy = p, se.Memo = h, se.Portal = o, se.Profiler = i, se.StrictMode = r, se.Suspense = l, se.isAsyncMode = function(y) {
    return R(y) || S(y) === c;
  }, se.isConcurrentMode = R, se.isContextConsumer = function(y) {
    return S(y) === a;
  }, se.isContextProvider = function(y) {
    return S(y) === s;
  }, se.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, se.isForwardRef = function(y) {
    return S(y) === u;
  }, se.isFragment = function(y) {
    return S(y) === n;
  }, se.isLazy = function(y) {
    return S(y) === p;
  }, se.isMemo = function(y) {
    return S(y) === h;
  }, se.isPortal = function(y) {
    return S(y) === o;
  }, se.isProfiler = function(y) {
    return S(y) === i;
  }, se.isStrictMode = function(y) {
    return S(y) === r;
  }, se.isSuspense = function(y) {
    return S(y) === l;
  }, se.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === f || y === i || y === r || y === l || y === d || typeof y == "object" && y !== null && (y.$$typeof === p || y.$$typeof === h || y.$$typeof === s || y.$$typeof === a || y.$$typeof === u || y.$$typeof === v || y.$$typeof === _ || y.$$typeof === b || y.$$typeof === m);
  }, se.typeOf = S, se;
}
var ae = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vr;
function cu() {
  return vr || (vr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, r = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, l = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, p = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, b = e ? Symbol.for("react.scope") : 60119;
    function S(k) {
      return typeof k == "string" || typeof k == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      k === n || k === f || k === i || k === r || k === l || k === d || typeof k == "object" && k !== null && (k.$$typeof === p || k.$$typeof === h || k.$$typeof === s || k.$$typeof === a || k.$$typeof === u || k.$$typeof === v || k.$$typeof === _ || k.$$typeof === b || k.$$typeof === m);
    }
    function R(k) {
      if (typeof k == "object" && k !== null) {
        var he = k.$$typeof;
        switch (he) {
          case t:
            var He = k.type;
            switch (He) {
              case c:
              case f:
              case n:
              case i:
              case r:
              case l:
                return He;
              default:
                var Me = He && He.$$typeof;
                switch (Me) {
                  case a:
                  case u:
                  case p:
                  case h:
                  case s:
                    return Me;
                  default:
                    return he;
                }
            }
          case o:
            return he;
        }
      }
    }
    var y = c, x = f, F = a, E = s, B = t, O = u, M = n, G = p, W = h, N = o, D = i, T = r, I = l, w = !1;
    function L(k) {
      return w || (w = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C(k) || R(k) === c;
    }
    function C(k) {
      return R(k) === f;
    }
    function A(k) {
      return R(k) === a;
    }
    function U(k) {
      return R(k) === s;
    }
    function z(k) {
      return typeof k == "object" && k !== null && k.$$typeof === t;
    }
    function V(k) {
      return R(k) === u;
    }
    function X(k) {
      return R(k) === n;
    }
    function Y(k) {
      return R(k) === p;
    }
    function K(k) {
      return R(k) === h;
    }
    function J(k) {
      return R(k) === o;
    }
    function Q(k) {
      return R(k) === i;
    }
    function q(k) {
      return R(k) === r;
    }
    function ce(k) {
      return R(k) === l;
    }
    ae.AsyncMode = y, ae.ConcurrentMode = x, ae.ContextConsumer = F, ae.ContextProvider = E, ae.Element = B, ae.ForwardRef = O, ae.Fragment = M, ae.Lazy = G, ae.Memo = W, ae.Portal = N, ae.Profiler = D, ae.StrictMode = T, ae.Suspense = I, ae.isAsyncMode = L, ae.isConcurrentMode = C, ae.isContextConsumer = A, ae.isContextProvider = U, ae.isElement = z, ae.isForwardRef = V, ae.isFragment = X, ae.isLazy = Y, ae.isMemo = K, ae.isPortal = J, ae.isProfiler = Q, ae.isStrictMode = q, ae.isSuspense = ce, ae.isValidElementType = S, ae.typeOf = R;
  }()), ae;
}
var mr;
function uo() {
  return mr || (mr = 1, process.env.NODE_ENV === "production" ? _t.exports = uu() : _t.exports = cu()), _t.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var en, yr;
function lu() {
  if (yr)
    return en;
  yr = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function r() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, a = 0; a < 10; a++)
        s["_" + String.fromCharCode(a)] = a;
      var c = Object.getOwnPropertyNames(s).map(function(u) {
        return s[u];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var f = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        f[u] = u;
      }), Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return en = r() ? Object.assign : function(i, s) {
    for (var a, c = n(i), f, u = 1; u < arguments.length; u++) {
      a = Object(arguments[u]);
      for (var l in a)
        t.call(a, l) && (c[l] = a[l]);
      if (e) {
        f = e(a);
        for (var d = 0; d < f.length; d++)
          o.call(a, f[d]) && (c[f[d]] = a[f[d]]);
      }
    }
    return c;
  }, en;
}
var tn, Er;
function xn() {
  if (Er)
    return tn;
  Er = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return tn = e, tn;
}
var nn, br;
function co() {
  return br || (br = 1, nn = Function.call.bind(Object.prototype.hasOwnProperty)), nn;
}
var rn, _r;
function fu() {
  if (_r)
    return rn;
  _r = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = xn(), o = {}, n = co();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function r(i, s, a, c, f) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in i)
        if (n(i, u)) {
          var l;
          try {
            if (typeof i[u] != "function") {
              var d = Error(
                (c || "React class") + ": " + a + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            l = i[u](s, u, c, a, null, t);
          } catch (p) {
            l = p;
          }
          if (l && !(l instanceof Error) && e(
            (c || "React class") + ": type specification of " + a + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof l + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), l instanceof Error && !(l.message in o)) {
            o[l.message] = !0;
            var h = f ? f() : "";
            e(
              "Failed " + a + " type: " + l.message + (h ?? "")
            );
          }
        }
    }
  }
  return r.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (o = {});
  }, rn = r, rn;
}
var on, Sr;
function du() {
  if (Sr)
    return on;
  Sr = 1;
  var e = uo(), t = lu(), o = xn(), n = co(), r = fu(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(a) {
    var c = "Warning: " + a;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return on = function(a, c) {
    var f = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function l(C) {
      var A = C && (f && C[f] || C[u]);
      if (typeof A == "function")
        return A;
    }
    var d = "<<anonymous>>", h = {
      array: _("array"),
      bigint: _("bigint"),
      bool: _("boolean"),
      func: _("function"),
      number: _("number"),
      object: _("object"),
      string: _("string"),
      symbol: _("symbol"),
      any: b(),
      arrayOf: S,
      element: R(),
      elementType: y(),
      instanceOf: x,
      node: O(),
      objectOf: E,
      oneOf: F,
      oneOfType: B,
      shape: G,
      exact: W
    };
    function p(C, A) {
      return C === A ? C !== 0 || 1 / C === 1 / A : C !== C && A !== A;
    }
    function m(C, A) {
      this.message = C, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function v(C) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, U = 0;
      function z(X, Y, K, J, Q, q, ce) {
        if (J = J || d, q = q || K, ce !== o) {
          if (c) {
            var k = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw k.name = "Invariant Violation", k;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var he = J + ":" + K;
            !A[he] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + q + "` prop on `" + J + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[he] = !0, U++);
          }
        }
        return Y[K] == null ? X ? Y[K] === null ? new m("The " + Q + " `" + q + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new m("The " + Q + " `" + q + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : C(Y, K, J, Q, q);
      }
      var V = z.bind(null, !1);
      return V.isRequired = z.bind(null, !0), V;
    }
    function _(C) {
      function A(U, z, V, X, Y, K) {
        var J = U[z], Q = T(J);
        if (Q !== C) {
          var q = I(J);
          return new m(
            "Invalid " + X + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + V + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
          );
        }
        return null;
      }
      return v(A);
    }
    function b() {
      return v(s);
    }
    function S(C) {
      function A(U, z, V, X, Y) {
        if (typeof C != "function")
          return new m("Property `" + Y + "` of component `" + V + "` has invalid PropType notation inside arrayOf.");
        var K = U[z];
        if (!Array.isArray(K)) {
          var J = T(K);
          return new m("Invalid " + X + " `" + Y + "` of type " + ("`" + J + "` supplied to `" + V + "`, expected an array."));
        }
        for (var Q = 0; Q < K.length; Q++) {
          var q = C(K, Q, V, X, Y + "[" + Q + "]", o);
          if (q instanceof Error)
            return q;
        }
        return null;
      }
      return v(A);
    }
    function R() {
      function C(A, U, z, V, X) {
        var Y = A[U];
        if (!a(Y)) {
          var K = T(Y);
          return new m("Invalid " + V + " `" + X + "` of type " + ("`" + K + "` supplied to `" + z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(C);
    }
    function y() {
      function C(A, U, z, V, X) {
        var Y = A[U];
        if (!e.isValidElementType(Y)) {
          var K = T(Y);
          return new m("Invalid " + V + " `" + X + "` of type " + ("`" + K + "` supplied to `" + z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(C);
    }
    function x(C) {
      function A(U, z, V, X, Y) {
        if (!(U[z] instanceof C)) {
          var K = C.name || d, J = L(U[z]);
          return new m("Invalid " + X + " `" + Y + "` of type " + ("`" + J + "` supplied to `" + V + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return v(A);
    }
    function F(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(U, z, V, X, Y) {
        for (var K = U[z], J = 0; J < C.length; J++)
          if (p(K, C[J]))
            return null;
        var Q = JSON.stringify(C, function(ce, k) {
          var he = I(k);
          return he === "symbol" ? String(k) : k;
        });
        return new m("Invalid " + X + " `" + Y + "` of value `" + String(K) + "` " + ("supplied to `" + V + "`, expected one of " + Q + "."));
      }
      return v(A);
    }
    function E(C) {
      function A(U, z, V, X, Y) {
        if (typeof C != "function")
          return new m("Property `" + Y + "` of component `" + V + "` has invalid PropType notation inside objectOf.");
        var K = U[z], J = T(K);
        if (J !== "object")
          return new m("Invalid " + X + " `" + Y + "` of type " + ("`" + J + "` supplied to `" + V + "`, expected an object."));
        for (var Q in K)
          if (n(K, Q)) {
            var q = C(K, Q, V, X, Y + "." + Q, o);
            if (q instanceof Error)
              return q;
          }
        return null;
      }
      return v(A);
    }
    function B(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < C.length; A++) {
        var U = C[A];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + w(U) + " at index " + A + "."
          ), s;
      }
      function z(V, X, Y, K, J) {
        for (var Q = [], q = 0; q < C.length; q++) {
          var ce = C[q], k = ce(V, X, Y, K, J, o);
          if (k == null)
            return null;
          k.data && n(k.data, "expectedType") && Q.push(k.data.expectedType);
        }
        var he = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new m("Invalid " + K + " `" + J + "` supplied to " + ("`" + Y + "`" + he + "."));
      }
      return v(z);
    }
    function O() {
      function C(A, U, z, V, X) {
        return N(A[U]) ? null : new m("Invalid " + V + " `" + X + "` supplied to " + ("`" + z + "`, expected a ReactNode."));
      }
      return v(C);
    }
    function M(C, A, U, z, V) {
      return new m(
        (C || "React class") + ": " + A + " type `" + U + "." + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + V + "`."
      );
    }
    function G(C) {
      function A(U, z, V, X, Y) {
        var K = U[z], J = T(K);
        if (J !== "object")
          return new m("Invalid " + X + " `" + Y + "` of type `" + J + "` " + ("supplied to `" + V + "`, expected `object`."));
        for (var Q in C) {
          var q = C[Q];
          if (typeof q != "function")
            return M(V, X, Y, Q, I(q));
          var ce = q(K, Q, V, X, Y + "." + Q, o);
          if (ce)
            return ce;
        }
        return null;
      }
      return v(A);
    }
    function W(C) {
      function A(U, z, V, X, Y) {
        var K = U[z], J = T(K);
        if (J !== "object")
          return new m("Invalid " + X + " `" + Y + "` of type `" + J + "` " + ("supplied to `" + V + "`, expected `object`."));
        var Q = t({}, U[z], C);
        for (var q in Q) {
          var ce = C[q];
          if (n(C, q) && typeof ce != "function")
            return M(V, X, Y, q, I(ce));
          if (!ce)
            return new m(
              "Invalid " + X + " `" + Y + "` key `" + q + "` supplied to `" + V + "`.\nBad object: " + JSON.stringify(U[z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var k = ce(K, q, V, X, Y + "." + q, o);
          if (k)
            return k;
        }
        return null;
      }
      return v(A);
    }
    function N(C) {
      switch (typeof C) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !C;
        case "object":
          if (Array.isArray(C))
            return C.every(N);
          if (C === null || a(C))
            return !0;
          var A = l(C);
          if (A) {
            var U = A.call(C), z;
            if (A !== C.entries) {
              for (; !(z = U.next()).done; )
                if (!N(z.value))
                  return !1;
            } else
              for (; !(z = U.next()).done; ) {
                var V = z.value;
                if (V && !N(V[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function D(C, A) {
      return C === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function T(C) {
      var A = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : D(A, C) ? "symbol" : A;
    }
    function I(C) {
      if (typeof C > "u" || C === null)
        return "" + C;
      var A = T(C);
      if (A === "object") {
        if (C instanceof Date)
          return "date";
        if (C instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function w(C) {
      var A = I(C);
      switch (A) {
        case "array":
        case "object":
          return "an " + A;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + A;
        default:
          return A;
      }
    }
    function L(C) {
      return !C.constructor || !C.constructor.name ? d : C.constructor.name;
    }
    return h.checkPropTypes = r, h.resetWarningCache = r.resetWarningCache, h.PropTypes = h, h;
  }, on;
}
var sn, Cr;
function pu() {
  if (Cr)
    return sn;
  Cr = 1;
  var e = xn();
  function t() {
  }
  function o() {
  }
  return o.resetWarningCache = t, sn = function() {
    function n(s, a, c, f, u, l) {
      if (l !== e) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
      }
    }
    n.isRequired = n;
    function r() {
      return n;
    }
    var i = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: r,
      element: n,
      elementType: n,
      instanceOf: r,
      node: n,
      objectOf: r,
      oneOf: r,
      oneOfType: r,
      shape: r,
      exact: r,
      checkPropTypes: o,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, sn;
}
if (process.env.NODE_ENV !== "production") {
  var hu = uo(), gu = !0;
  yn.exports = du()(hu.isElement, gu);
} else
  yn.exports = pu()();
var vu = yn.exports;
const $ = /* @__PURE__ */ tt(vu);
var Rt = function(t) {
  return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}, we = {
  id: "__id__",
  display: "__display__"
}, Tr = function(t, o) {
  Je(o === "id" || o === "display", 'Second arg must be either "id" or "display", got: "'.concat(o, '"'));
  var n = t.indexOf(we.display), r = t.indexOf(we.id);
  return n < 0 && (n = null), r < 0 && (r = null), Je(n !== null || r !== null, "The markup '".concat(t, "' does not contain either of the placeholders '__id__' or '__display__'")), n !== null && r !== null ? o === "id" && r <= n || o === "display" && n <= r ? 0 : 1 : 0;
}, mu = function(t) {
  var o = /^\/(.+)\/(\w+)?$/;
  return new RegExp(t.map(function(n) {
    var r = o.exec(n.toString()), i = jt(r, 3), s = i[1], a = i[2];
    return Je(!a, "RegExp flags are not supported. Change /".concat(s, "/").concat(a, " into /").concat(s, "/")), "(".concat(s, ")");
  }).join("|"), "g");
}, lo = function(t) {
  var o = 0;
  return t.indexOf("__id__") >= 0 && o++, t.indexOf("__display__") >= 0 && o++, o;
}, yu = function() {
}, gt = function(t, o, n) {
  for (var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : yu, i = mu(o.map(function(y) {
    return y.regex;
  })), s = 2, a = o.map(function(y) {
    var x = y.markup, F = s;
    return s += lo(x) + 1, F;
  }), c, f = 0, u = 0; (c = i.exec(t)) !== null; ) {
    var l = a.find(function(y) {
      return !!c[y];
    }), d = a.indexOf(l), h = o[d], p = h.markup, m = h.displayTransform, v = l + Tr(p, "id"), _ = l + Tr(p, "display"), b = c[v], S = m(b, c[_]), R = t.substring(f, c.index);
    r(R, f, u), u += R.length, n(c[0], c.index, u, b, S, d, f), u += S.length, f = i.lastIndex;
  }
  f < t.length && r(t.substring(f), f, u);
}, Le = function(t, o) {
  var n = "";
  return gt(t, o, function(r, i, s, a, c) {
    n += c;
  }, function(r) {
    n += r;
  }), n;
}, me = function(t, o, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
  if (typeof n != "number")
    return n;
  var i, s = function(f, u, l) {
    i === void 0 && l + f.length >= n && (i = u + n - l);
  }, a = function(f, u, l, d, h, p, m) {
    i === void 0 && l + h.length > n && (r === "NULL" ? i = null : i = u + (r === "END" ? f.length : 0));
  };
  return gt(t, o, a, s), i === void 0 ? t.length : i;
}, ct = function(t, o, n, r) {
  return t.substring(0, o) + r + t.substring(n);
}, Eu = function(t, o, n, r) {
  var i = n.selectionStartBefore, s = n.selectionEndBefore, a = n.selectionEndAfter, c = Le(t, r), f = c.length - o.length;
  i === "undefined" && (i = a + f), s === "undefined" && (s = i), i === s && s === a && c.length === o.length && (i = i - 1);
  var u = o.slice(i, a), l = Math.min(i, a), d = s;
  i === a && (d = Math.max(s, i + f));
  var h = me(t, r, l, "START"), p = me(t, r, d, "END"), m = me(t, r, l, "NULL"), v = me(t, r, d, "NULL"), _ = m === null || v === null, b = ct(t, h, p, u);
  if (!_) {
    var S = Le(b, r);
    if (S !== o) {
      for (l = 0; o[l] === S[l]; )
        l++;
      u = o.slice(l, a), d = c.lastIndexOf(o.substring(a)), h = me(t, r, l, "START"), p = me(t, r, d, "END"), b = ct(t, h, p, u);
    }
  }
  return b;
}, Or = function(t, o, n) {
  var r = n, i = !1, s = function(c, f, u, l, d, h, p) {
    u <= n && u + d.length > n && (r = u, i = !0);
  };
  if (gt(t, o, s), i)
    return r;
}, ut = function(t, o) {
  var n = [];
  return gt(t, o, function(r, i, s, a, c, f, u) {
    n.push({
      id: a,
      display: c,
      childIndex: f,
      index: i,
      plainTextIndex: s
    });
  }), n;
}, fo = function(t, o) {
  return "".concat(t, "-").concat(o);
}, St = function(t) {
  return Object.values(t).reduce(function(o, n) {
    var r = n.results;
    return o + r.length;
  }, 0);
}, bu = function(t, o) {
  var n = ut(t, o), r = n[n.length - 1];
  return r ? r.plainTextIndex + r.display.length : 0;
}, _u = function(t) {
  var o = Rt(t), n = t[t.indexOf(we.display) + we.display.length], r = t[t.indexOf(we.id) + we.id.length];
  return new RegExp(o.replace(we.display, "([^".concat(Rt(n || ""), "]+?)")).replace(we.id, "([^".concat(Rt(r || ""), "]+?)")));
}, je = function(t) {
  return Ge.toArray(t).map(function(o) {
    var n = o.props, r = n.markup, i = n.regex, s = n.displayTransform;
    return {
      markup: r,
      regex: i ? Su(i, r) : _u(r),
      displayTransform: s || function(a, c) {
        return c || a;
      }
    };
  });
}, Su = function(t, o) {
  var n = new RegExp(t.toString() + "|").exec("").length - 1, r = lo(o);
  return Je(n === r, "Number of capturing groups in RegExp ".concat(t.toString(), " (").concat(n, ") does not match the number of placeholders in the markup '").concat(o, "' (").concat(r, ")")), t;
}, Cu = function(t, o, n) {
  return t.replace(we.id, o).replace(we.display, n);
}, Tu = [{
  base: "A",
  letters: /(&#65;|&#9398;|&#65313;|&#192;|&#193;|&#194;|&#7846;|&#7844;|&#7850;|&#7848;|&#195;|&#256;|&#258;|&#7856;|&#7854;|&#7860;|&#7858;|&#550;|&#480;|&#196;|&#478;|&#7842;|&#197;|&#506;|&#461;|&#512;|&#514;|&#7840;|&#7852;|&#7862;|&#7680;|&#260;|&#570;|&#11375;|[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F])/g
}, {
  base: "AA",
  letters: /(&#42802;|[\uA732])/g
}, {
  base: "AE",
  letters: /(&#198;|&#508;|&#482;|[\u00C6\u01FC\u01E2])/g
}, {
  base: "AO",
  letters: /(&#42804;|[\uA734])/g
}, {
  base: "AU",
  letters: /(&#42806;|[\uA736])/g
}, {
  base: "AV",
  letters: /(&#42808;|&#42810;|[\uA738\uA73A])/g
}, {
  base: "AY",
  letters: /(&#42812;|[\uA73C])/g
}, {
  base: "B",
  letters: /(&#66;|&#9399;|&#65314;|&#7682;|&#7684;|&#7686;|&#579;|&#386;|&#385;|[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181])/g
}, {
  base: "C",
  letters: /(&#67;|&#9400;|&#65315;|&#262;|&#264;|&#266;|&#268;|&#199;|&#7688;|&#391;|&#571;|&#42814;|[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E])/g
}, {
  base: "D",
  letters: /(&#68;|&#9401;|&#65316;|&#7690;|&#270;|&#7692;|&#7696;|&#7698;|&#7694;|&#272;|&#395;|&#394;|&#393;|&#42873;|&#208;|[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0])/g
}, {
  base: "DZ",
  letters: /(&#497;|&#452;|[\u01F1\u01C4])/g
}, {
  base: "Dz",
  letters: /(&#498;|&#453;|[\u01F2\u01C5])/g
}, {
  base: "E",
  letters: /(&#69;|&#9402;|&#65317;|&#200;|&#201;|&#202;|&#7872;|&#7870;|&#7876;|&#7874;|&#7868;|&#274;|&#7700;|&#7702;|&#276;|&#278;|&#203;|&#7866;|&#282;|&#516;|&#518;|&#7864;|&#7878;|&#552;|&#7708;|&#280;|&#7704;|&#7706;|&#400;|&#398;|[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E])/g
}, {
  base: "F",
  letters: /(&#70;|&#9403;|&#65318;|&#7710;|&#401;|&#42875;|[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B])/g
}, {
  base: "G",
  letters: /(&#71;|&#9404;|&#65319;|&#500;|&#284;|&#7712;|&#286;|&#288;|&#486;|&#290;|&#484;|&#403;|&#42912;|&#42877;|&#42878;|[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E])/g
}, {
  base: "H",
  letters: /(&#72;|&#9405;|&#65320;|&#292;|&#7714;|&#7718;|&#542;|&#7716;|&#7720;|&#7722;|&#294;|&#11367;|&#11381;|&#42893;|[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D])/g
}, {
  base: "I",
  letters: /(&#73;|&#9406;|&#65321;|&#204;|&#205;|&#206;|&#296;|&#298;|&#300;|&#304;|&#207;|&#7726;|&#7880;|&#463;|&#520;|&#522;|&#7882;|&#302;|&#7724;|&#407;|[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197])/g
}, {
  base: "J",
  letters: /(&#74;|&#9407;|&#65322;|&#308;|&#584;|[\u004A\u24BF\uFF2A\u0134\u0248])/g
}, {
  base: "K",
  letters: /(&#75;|&#9408;|&#65323;|&#7728;|&#488;|&#7730;|&#310;|&#7732;|&#408;|&#11369;|&#42816;|&#42818;|&#42820;|&#42914;|[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2])/g
}, {
  base: "L",
  letters: /(&#76;|&#9409;|&#65324;|&#319;|&#313;|&#317;|&#7734;|&#7736;|&#315;|&#7740;|&#7738;|&#321;|&#573;|&#11362;|&#11360;|&#42824;|&#42822;|&#42880;|[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780])/g
}, {
  base: "LJ",
  letters: /(&#455;|[\u01C7])/g
}, {
  base: "Lj",
  letters: /(&#456;|[\u01C8])/g
}, {
  base: "M",
  letters: /(&#77;|&#9410;|&#65325;|&#7742;|&#7744;|&#7746;|&#11374;|&#412;|[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C])/g
}, {
  base: "N",
  letters: /(&#78;|&#9411;|&#65326;|&#504;|&#323;|&#209;|&#7748;|&#327;|&#7750;|&#325;|&#7754;|&#7752;|&#544;|&#413;|&#42896;|&#42916;|&#330;|[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4\u014A])/g
}, {
  base: "NJ",
  letters: /(&#458;|[\u01CA])/g
}, {
  base: "Nj",
  letters: /(&#459;|[\u01CB])/g
}, {
  base: "O",
  letters: /(&#79;|&#9412;|&#65327;|&#210;|&#211;|&#212;|&#7890;|&#7888;|&#7894;|&#7892;|&#213;|&#7756;|&#556;|&#7758;|&#332;|&#7760;|&#7762;|&#334;|&#558;|&#560;|&#214;|&#554;|&#7886;|&#336;|&#465;|&#524;|&#526;|&#416;|&#7900;|&#7898;|&#7904;|&#7902;|&#7906;|&#7884;|&#7896;|&#490;|&#492;|&#216;|&#510;|&#390;|&#415;|&#42826;|&#42828;|[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C])/g
}, {
  base: "OE",
  letters: /(&#338;|[\u0152])/g
}, {
  base: "OI",
  letters: /(&#418;|[\u01A2])/g
}, {
  base: "OO",
  letters: /(&#42830;|[\uA74E])/g
}, {
  base: "OU",
  letters: /(&#546;|[\u0222])/g
}, {
  base: "P",
  letters: /(&#80;|&#9413;|&#65328;|&#7764;|&#7766;|&#420;|&#11363;|&#42832;|&#42834;|&#42836;|[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754])/g
}, {
  base: "Q",
  letters: /(&#81;|&#9414;|&#65329;|&#42838;|&#42840;|&#586;|[\u0051\u24C6\uFF31\uA756\uA758\u024A])/g
}, {
  base: "R",
  letters: /(&#82;|&#9415;|&#65330;|&#340;|&#7768;|&#344;|&#528;|&#530;|&#7770;|&#7772;|&#342;|&#7774;|&#588;|&#11364;|&#42842;|&#42918;|&#42882;|[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782])/g
}, {
  base: "S",
  letters: /(&#83;|&#9416;|&#65331;|&#7838;|&#346;|&#7780;|&#348;|&#7776;|&#352;|&#7782;|&#7778;|&#7784;|&#536;|&#350;|&#11390;|&#42920;|&#42884;|[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784])/g
}, {
  base: "T",
  letters: /(&#84;|&#9417;|&#65332;|&#7786;|&#356;|&#7788;|&#538;|&#354;|&#7792;|&#7790;|&#358;|&#428;|&#430;|&#574;|&#42886;|[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786])/g
}, {
  base: "TH",
  letters: /(&#222;|[\u00DE])/g
}, {
  base: "TZ",
  letters: /(&#42792;|[\uA728])/g
}, {
  base: "U",
  letters: /(&#85;|&#9418;|&#65333;|&#217;|&#218;|&#219;|&#360;|&#7800;|&#362;|&#7802;|&#364;|&#220;|&#475;|&#471;|&#469;|&#473;|&#7910;|&#366;|&#368;|&#467;|&#532;|&#534;|&#431;|&#7914;|&#7912;|&#7918;|&#7916;|&#7920;|&#7908;|&#7794;|&#370;|&#7798;|&#7796;|&#580;|[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244])/g
}, {
  base: "V",
  letters: /(&#86;|&#9419;|&#65334;|&#7804;|&#7806;|&#434;|&#42846;|&#581;|[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245])/g
}, {
  base: "VY",
  letters: /(&#42848;|[\uA760])/g
}, {
  base: "W",
  letters: /(&#87;|&#9420;|&#65335;|&#7808;|&#7810;|&#372;|&#7814;|&#7812;|&#7816;|&#11378;|[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72])/g
}, {
  base: "X",
  letters: /(&#88;|&#9421;|&#65336;|&#7818;|&#7820;|[\u0058\u24CD\uFF38\u1E8A\u1E8C])/g
}, {
  base: "Y",
  letters: /(&#89;|&#9422;|&#65337;|&#7922;|&#221;|&#374;|&#7928;|&#562;|&#7822;|&#376;|&#7926;|&#7924;|&#435;|&#590;|&#7934;|[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE])/g
}, {
  base: "Z",
  letters: /(&#90;|&#9423;|&#65338;|&#377;|&#7824;|&#379;|&#381;|&#7826;|&#7828;|&#437;|&#548;|&#11391;|&#11371;|&#42850;|[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762])/g
}, {
  base: "a",
  letters: /(&#97;|&#9424;|&#65345;|&#7834;|&#224;|&#225;|&#226;|&#7847;|&#7845;|&#7851;|&#7849;|&#227;|&#257;|&#259;|&#7857;|&#7855;|&#7861;|&#7859;|&#551;|&#481;|&#228;|&#479;|&#7843;|&#229;|&#507;|&#462;|&#513;|&#515;|&#7841;|&#7853;|&#7863;|&#7681;|&#261;|&#11365;|&#592;|[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250])/g
}, {
  base: "aa",
  letters: /(&#42803;|[\uA733])/g
}, {
  base: "ae",
  letters: /(&#230;|&#509;|&#483;|[\u00E6\u01FD\u01E3])/g
}, {
  base: "ao",
  letters: /(&#42805;|[\uA735])/g
}, {
  base: "au",
  letters: /(&#42807;|[\uA737])/g
}, {
  base: "av",
  letters: /(&#42809;|&#42811;|[\uA739\uA73B])/g
}, {
  base: "ay",
  letters: /(&#42813;|[\uA73D])/g
}, {
  base: "b",
  letters: /(&#98;|&#9425;|&#65346;|&#7683;|&#7685;|&#7687;|&#384;|&#387;|&#595;|[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253])/g
}, {
  base: "c",
  letters: /(&#99;|&#9426;|&#65347;|&#263;|&#265;|&#267;|&#269;|&#231;|&#7689;|&#392;|&#572;|&#42815;|&#8580;|[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184])/g
}, {
  base: "d",
  letters: /(&#100;|&#9427;|&#65348;|&#7691;|&#271;|&#7693;|&#7697;|&#7699;|&#7695;|&#273;|&#396;|&#598;|&#599;|&#42874;|&#240;|[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A\u00F0])/g
}, {
  base: "dz",
  letters: /(&#499;|&#454;|[\u01F3\u01C6])/g
}, {
  base: "e",
  letters: /(&#101;|&#9428;|&#65349;|&#232;|&#233;|&#234;|&#7873;|&#7871;|&#7877;|&#7875;|&#7869;|&#275;|&#7701;|&#7703;|&#277;|&#279;|&#235;|&#7867;|&#283;|&#517;|&#519;|&#7865;|&#7879;|&#553;|&#7709;|&#281;|&#7705;|&#7707;|&#583;|&#603;|&#477;|[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD])/g
}, {
  base: "f",
  letters: /(&#102;|&#9429;|&#65350;|&#7711;|&#402;|&#42876;|[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C])/g
}, {
  base: "g",
  letters: /(&#103;|&#9430;|&#65351;|&#501;|&#285;|&#7713;|&#287;|&#289;|&#487;|&#291;|&#485;|&#608;|&#42913;|&#7545;|&#42879;|[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F])/g
}, {
  base: "h",
  letters: /(&#104;|&#9431;|&#65352;|&#293;|&#7715;|&#7719;|&#543;|&#7717;|&#7721;|&#7723;|&#7830;|&#295;|&#11368;|&#11382;|&#613;|[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265])/g
}, {
  base: "hv",
  letters: /(&#405;|[\u0195])/g
}, {
  base: "i",
  letters: /(&#105;|&#9432;|&#65353;|&#236;|&#237;|&#238;|&#297;|&#299;|&#301;|&#239;|&#7727;|&#7881;|&#464;|&#521;|&#523;|&#7883;|&#303;|&#7725;|&#616;|&#305;|[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131])/g
}, {
  base: "ij",
  letters: /(&#307;|[\u0133])/g
}, {
  base: "j",
  letters: /(&#106;|&#9433;|&#65354;|&#309;|&#496;|&#585;|[\u006A\u24D9\uFF4A\u0135\u01F0\u0249])/g
}, {
  base: "k",
  letters: /(&#107;|&#9434;|&#65355;|&#7729;|&#489;|&#7731;|&#311;|&#7733;|&#409;|&#11370;|&#42817;|&#42819;|&#42821;|&#42915;|[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3])/g
}, {
  base: "l",
  letters: /(&#108;|&#9435;|&#65356;|&#320;|&#314;|&#318;|&#7735;|&#7737;|&#316;|&#7741;|&#7739;|&#322;|&#410;|&#619;|&#11361;|&#42825;|&#42881;|&#42823;|[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u0142\u019A\u026B\u2C61\uA749\uA781\uA747])/g
}, {
  base: "lj",
  letters: /(&#457;|[\u01C9])/g
}, {
  base: "m",
  letters: /(&#109;|&#9436;|&#65357;|&#7743;|&#7745;|&#7747;|&#625;|&#623;|[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F])/g
}, {
  base: "n",
  letters: /(&#110;|&#9437;|&#65358;|&#505;|&#324;|&#241;|&#7749;|&#328;|&#7751;|&#326;|&#7755;|&#7753;|&#414;|&#626;|&#329;|&#42897;|&#42917;|&#331;|[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5\u014B])/g
}, {
  base: "nj",
  letters: /(&#460;|[\u01CC])/g
}, {
  base: "o",
  letters: /(&#111;|&#9438;|&#65359;|&#242;|&#243;|&#244;|&#7891;|&#7889;|&#7895;|&#7893;|&#245;|&#7757;|&#557;|&#7759;|&#333;|&#7761;|&#7763;|&#335;|&#559;|&#561;|&#246;|&#555;|&#7887;|&#337;|&#466;|&#525;|&#527;|&#417;|&#7901;|&#7899;|&#7905;|&#7903;|&#7907;|&#7885;|&#7897;|&#491;|&#493;|&#248;|&#511;|&#596;|&#42827;|&#42829;|&#629;|[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275])/g
}, {
  base: "oe",
  letters: /(&#339;|[\u0153])/g
}, {
  base: "oi",
  letters: /(&#419;|[\u01A3])/g
}, {
  base: "ou",
  letters: /(&#547;|[\u0223])/g
}, {
  base: "oo",
  letters: /(&#42831;|[\uA74F])/g
}, {
  base: "p",
  letters: /(&#112;|&#9439;|&#65360;|&#7765;|&#7767;|&#421;|&#7549;|&#42833;|&#42835;|&#42837;|[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755])/g
}, {
  base: "q",
  letters: /(&#113;|&#9440;|&#65361;|&#587;|&#42839;|&#42841;|[\u0071\u24E0\uFF51\u024B\uA757\uA759])/g
}, {
  base: "r",
  letters: /(&#114;|&#9441;|&#65362;|&#341;|&#7769;|&#345;|&#529;|&#531;|&#7771;|&#7773;|&#343;|&#7775;|&#589;|&#637;|&#42843;|&#42919;|&#42883;|[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783])/g
}, {
  base: "s",
  letters: /(&#115;|&#9442;|&#65363;|&#347;|&#7781;|&#349;|&#7777;|&#353;|&#7783;|&#7779;|&#7785;|&#537;|&#351;|&#575;|&#42921;|&#42885;|&#7835;|&#383;|[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B\u017F])/g
}, {
  base: "ss",
  letters: /(&#223;|[\u00DF])/g
}, {
  base: "t",
  letters: /(&#116;|&#9443;|&#65364;|&#7787;|&#7831;|&#357;|&#7789;|&#539;|&#355;|&#7793;|&#7791;|&#359;|&#429;|&#648;|&#11366;|&#42887;|[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787])/g
}, {
  base: "th",
  letters: /(&#254;|[\u00FE])/g
}, {
  base: "tz",
  letters: /(&#42793;|[\uA729])/g
}, {
  base: "u",
  letters: /(&#117;|&#9444;|&#65365;|&#249;|&#250;|&#251;|&#361;|&#7801;|&#363;|&#7803;|&#365;|&#252;|&#476;|&#472;|&#470;|&#474;|&#7911;|&#367;|&#369;|&#468;|&#533;|&#535;|&#432;|&#7915;|&#7913;|&#7919;|&#7917;|&#7921;|&#7909;|&#7795;|&#371;|&#7799;|&#7797;|&#649;|[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289])/g
}, {
  base: "v",
  letters: /(&#118;|&#9445;|&#65366;|&#7805;|&#7807;|&#651;|&#42847;|&#652;|[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C])/g
}, {
  base: "vy",
  letters: /(&#42849;|[\uA761])/g
}, {
  base: "w",
  letters: /(&#119;|&#9446;|&#65367;|&#7809;|&#7811;|&#373;|&#7815;|&#7813;|&#7832;|&#7817;|&#11379;|[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73])/g
}, {
  base: "x",
  letters: /(&#120;|&#9447;|&#65368;|&#7819;|&#7821;|[\u0078\u24E7\uFF58\u1E8B\u1E8D])/g
}, {
  base: "y",
  letters: /(&#121;|&#9448;|&#65369;|&#7923;|&#253;|&#375;|&#7929;|&#563;|&#7823;|&#255;|&#7927;|&#7833;|&#7925;|&#436;|&#591;|&#7935;|[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF])/g
}, {
  base: "z",
  letters: /(&#122;|&#9449;|&#65370;|&#378;|&#7825;|&#380;|&#382;|&#7827;|&#7829;|&#438;|&#549;|&#576;|&#11372;|&#42851;|[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763])/g
}], Ou = function(t) {
  var o = t;
  return Tu.forEach(function(n) {
    o = o.replace(n.letters, n.base);
  }), o;
}, Rr = function(t) {
  return Ou(t).toLowerCase();
}, po = function(t, o, n) {
  return n ? Rr(t).indexOf(Rr(o)) : t.toLowerCase().indexOf(o.toLowerCase());
}, Ru = function() {
  return !!document.documentMode;
}, En = function(t) {
  return typeof t == "number";
}, Au = function(t) {
  return t === Object(t) ? Object.keys(t) : [];
}, Du = function(t) {
  for (var o, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  var s = (o = []).concat.apply(o, r);
  return Object.keys(t).reduce(function(a, c) {
    return t.hasOwnProperty(c) && !s.includes(c) && t[c] !== void 0 && (a[c] = t[c]), a;
  }, {});
}, wu = ["style", "className", "classNames"];
function Ar(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function Dr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ar(Object(o), !0).forEach(function(n) {
      ee(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : Ar(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
function zt(e, t) {
  var o = function(r) {
    var i = function(c) {
      var f = c.style, u = c.className, l = c.classNames, d = za(c, wu), h = t ? t(d) : void 0, p = In(e, {
        style: f,
        className: u,
        classNames: l
      }, h);
      return /* @__PURE__ */ oe.createElement(r, Oe({}, d, {
        style: p
      }));
    }, s = r.displayName || r.name || "Component";
    return i.displayName = "defaultStyle(".concat(s, ")"), /* @__PURE__ */ oe.forwardRef(function(a, c) {
      return i(Dr(Dr({}, a), {}, {
        ref: c
      }));
    });
  };
  return o;
}
var Iu = function(t, o) {
  return t.hasOwnProperty(o) ? t[o]++ : t[o] = 0, o + "_" + t[o];
};
function ho(e) {
  var t = e.selectionStart, o = e.selectionEnd, n = e.value, r = n === void 0 ? "" : n, i = e.onCaretPositionChange, s = e.containerRef, a = e.children;
  e.singleLine;
  var c = e.style, f = ge({
    left: void 0,
    top: void 0
  }), u = jt(f, 2), l = u[0], d = u[1], h = ge(), p = jt(h, 2), m = p[0], v = p[1];
  Ae(function() {
    _();
  });
  var _ = function() {
    if (m) {
      var N = m.offsetLeft, D = m.offsetTop;
      if (!(l.left === N && l.top === D)) {
        var T = {
          left: N,
          top: D
        };
        d(T), i(T);
      }
    }
  }, b = je(a), S;
  o === t && (S = me(r, b, t, "START"));
  var R = [], y = {}, x = R, F = 0, E = function(N, D, T) {
    if (En(S) && S >= D && S <= D + N.length) {
      var I = S - D;
      x.push(O(N.substring(0, I), F)), x = [O(N.substring(I), F)];
    } else
      x.push(O(N, F));
    F++;
  }, B = function(N, D, T, I, w, L, C) {
    var A = Iu(y, I);
    x.push(M(I, w, L, A));
  }, O = function(N, D) {
    return /* @__PURE__ */ oe.createElement("span", Oe({}, c("substring"), {
      key: D
    }), N);
  }, M = function(N, D, T, I) {
    var w = {
      id: N,
      display: D,
      key: I
    }, L = Ge.toArray(a)[T];
    return /* @__PURE__ */ oe.cloneElement(L, w);
  }, G = function(N) {
    return /* @__PURE__ */ oe.createElement("span", Oe({}, c("caret"), {
      ref: v,
      key: "caret"
    }), N);
  };
  return gt(r, b, B, E), x.push(" "), x !== R && R.push(G(x)), /* @__PURE__ */ oe.createElement("div", Oe({}, c, {
    ref: s
  }), R);
}
ho.propTypes = {
  selectionStart: $.number,
  selectionEnd: $.number,
  value: $.string.isRequired,
  onCaretPositionChange: $.func.isRequired,
  containerRef: $.oneOfType([$.func, $.shape({
    current: typeof Element > "u" ? $.any : $.instanceOf(Element)
  })]),
  children: $.oneOfType([$.element, $.arrayOf($.element)]).isRequired
};
var xu = zt({
  position: "relative",
  boxSizing: "border-box",
  width: "100%",
  color: "transparent",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  border: "1px solid transparent",
  textAlign: "start",
  "&singleLine": {
    whiteSpace: "pre",
    wordWrap: null
  },
  substring: {
    visibility: "hidden"
  }
}, function(e) {
  return {
    "&singleLine": e.singleLine
  };
}), Nu = xu(ho);
function go(e) {
  var t = e.id, o = e.focused, n = e.ignoreAccents, r = e.index, i = e.onClick, s = e.onMouseEnter, a = e.query, c = e.renderSuggestion, f = e.suggestion, u = e.style;
  e.className, e.classNames;
  var l = {
    onClick: i,
    onMouseEnter: s
  }, d = function() {
    var v = h(), _ = p(v);
    return c ? c(f, a, _, r, o) : _;
  }, h = function() {
    if (typeof f == "string")
      return f;
    var v = f.id, _ = f.display;
    return v === void 0 || !_ ? v : _;
  }, p = function(v) {
    var _ = po(v, a, n);
    return _ === -1 ? /* @__PURE__ */ oe.createElement("span", u("display"), v) : /* @__PURE__ */ oe.createElement("span", u("display"), v.substring(0, _), /* @__PURE__ */ oe.createElement("b", u("highlight"), v.substring(_, _ + a.length)), v.substring(_ + a.length));
  };
  return /* @__PURE__ */ oe.createElement("li", Oe({
    id: t,
    role: "option",
    "aria-selected": o
  }, l, u), d());
}
go.propTypes = {
  id: $.string.isRequired,
  query: $.string.isRequired,
  index: $.number.isRequired,
  ignoreAccents: $.bool,
  suggestion: $.oneOfType([$.string, $.shape({
    id: $.oneOfType([$.string, $.number]).isRequired,
    display: $.string
  })]).isRequired,
  renderSuggestion: $.func,
  focused: $.bool
};
var ju = zt({
  cursor: "pointer"
}, function(e) {
  return {
    "&focused": e.focused
  };
}), Pu = ju(go);
function Fu(e) {
  var t = e.style, o = e.className, n = e.classNames, r = In(Mu, {
    style: t,
    className: o,
    classNames: n
  }), i = r("spinner");
  return /* @__PURE__ */ oe.createElement("div", r, /* @__PURE__ */ oe.createElement("div", i, /* @__PURE__ */ oe.createElement("div", i(["element", "element1"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element2"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element3"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element4"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element5"]))));
}
var Mu = {};
function vo(e) {
  var t = e.id, o = e.suggestions, n = o === void 0 ? {} : o, r = e.a11ySuggestionsListLabel, i = e.focusIndex, s = e.position, a = e.left, c = e.right, f = e.top, u = e.scrollFocusedIntoView, l = e.isLoading, d = e.isOpened, h = e.onSelect, p = h === void 0 ? function() {
    return null;
  } : h, m = e.ignoreAccents, v = e.containerRef, _ = e.children, b = e.style, S = e.customSuggestionsContainer, R = e.onMouseDown, y = e.onMouseEnter, x = ge(void 0), F = jt(x, 2), E = F[0], B = F[1];
  Ae(function() {
    if (!(!E || E.offsetHeight >= E.scrollHeight || !u)) {
      var T = E.scrollTop, I = E.children[i].getBoundingClientRect(), w = I.top, L = I.bottom, C = E.getBoundingClientRect(), A = C.top;
      w = w - A + T, L = L - A + T, w < T ? E.scrollTop = w : L > E.offsetHeight && (E.scrollTop = L - E.offsetHeight);
    }
  }, [i, u, E]);
  var O = function() {
    var I = /* @__PURE__ */ oe.createElement("ul", Oe({
      ref: B,
      id: t,
      role: "listbox",
      "aria-label": r
    }, b("list")), Object.values(n).reduce(function(w, L) {
      var C = L.results, A = L.queryInfo;
      return [].concat(xt(w), xt(C.map(function(U, z) {
        return M(U, A, w.length + z);
      })));
    }, []));
    return S ? S(I) : I;
  }, M = function(I, w, L) {
    var C = L === i, A = w.childIndex, U = w.query, z = Ge.toArray(_)[A].props.renderSuggestion;
    return /* @__PURE__ */ oe.createElement(Pu, {
      style: b("item"),
      key: "".concat(A, "-").concat(D(I)),
      id: fo(t, L),
      query: U,
      index: L,
      ignoreAccents: m,
      renderSuggestion: z,
      suggestion: I,
      focused: C,
      onClick: function() {
        return N(I, w);
      },
      onMouseEnter: function() {
        return W(L);
      }
    });
  }, G = function() {
    if (l)
      return /* @__PURE__ */ oe.createElement(Fu, {
        style: b("loadingIndicator")
      });
  }, W = function(I, w) {
    y && y(I);
  }, N = function(I, w) {
    p(I, w);
  }, D = function(I) {
    return typeof I == "string" ? I : I.id;
  };
  return d ? /* @__PURE__ */ oe.createElement("div", Oe({}, au({
    position: s || "absolute",
    left: a,
    right: c,
    top: f
  }, b), {
    onMouseDown: R,
    ref: v
  }), O(), G()) : null;
}
vo.propTypes = {
  id: $.string.isRequired,
  suggestions: $.object.isRequired,
  a11ySuggestionsListLabel: $.string,
  focusIndex: $.number,
  position: $.string,
  left: $.number,
  right: $.number,
  top: $.number,
  scrollFocusedIntoView: $.bool,
  isLoading: $.bool,
  isOpened: $.bool.isRequired,
  onSelect: $.func,
  ignoreAccents: $.bool,
  customSuggestionsContainer: $.func,
  containerRef: $.oneOfType([$.func, $.shape({
    current: typeof Element > "u" ? $.any : $.instanceOf(Element)
  })])
};
var $u = zt({
  zIndex: 1,
  backgroundColor: "white",
  marginTop: 14,
  minWidth: 100,
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
}), ku = $u(vo);
function wr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wr(Object(o), !0).forEach(function(n) {
      ee(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : wr(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
function Lu(e) {
  var t = Bu();
  return function() {
    var n = Nt(e), r;
    if (t) {
      var i = Nt(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else
      r = n.apply(this, arguments);
    return Ma(this, r);
  };
}
function Bu() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var Hu = function(t) {
  var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t instanceof RegExp)
    return t;
  var n = o.allowSpaceInQuery, r = Rt(t);
  return new RegExp("(?:^|\\s)(".concat(r, "([^").concat(n ? "" : "\\s").concat(r, "]*))$"));
}, Uu = function(t, o) {
  return t instanceof Array ? function(n, r) {
    for (var i = [], s = 0, a = t.length; s < a; ++s) {
      var c = t[s].display || t[s].id;
      po(c, n, o) >= 0 && i.push(t[s]);
    }
    return i;
  } : t;
}, qe = {
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  UP: 38,
  DOWN: 40
}, Ct = !1, mo = {
  /**
   * If set to `true` a regular text input element will be rendered
   * instead of a textarea
   */
  singleLine: $.bool,
  allowSpaceInQuery: $.bool,
  allowSuggestionsAboveCursor: $.bool,
  forceSuggestionsAboveCursor: $.bool,
  ignoreAccents: $.bool,
  a11ySuggestionsListLabel: $.string,
  value: $.string,
  onKeyDown: $.func,
  customSuggestionsContainer: $.func,
  onSelect: $.func,
  onBlur: $.func,
  onChange: $.func,
  suggestionsPortalHost: typeof Element > "u" ? $.any : $.PropTypes.instanceOf(Element),
  inputRef: $.oneOfType([$.func, $.shape({
    current: typeof Element > "u" ? $.any : $.instanceOf(Element)
  })]),
  children: $.oneOfType([$.element, $.arrayOf($.element)]).isRequired
}, Nn = /* @__PURE__ */ function(e) {
  Fa(o, e);
  var t = Lu(o);
  function o(n) {
    var r;
    return ja(this, o), r = t.call(this, n), ee(te(r), "setContainerElement", function(i) {
      r.containerElement = i;
    }), ee(te(r), "getInputProps", function() {
      var i = r.props, s = i.readOnly, a = i.disabled, c = i.style, f = Du(
        r.props,
        ["style", "classNames", "className"],
        // substyle props
        Au(mo)
      );
      return Re(Re(Re(Re({}, f), c("input")), {}, {
        value: r.getPlainText(),
        onScroll: r.updateHighlighterScroll
      }, !s && !a && {
        onChange: r.handleChange,
        onSelect: r.handleSelect,
        onKeyDown: r.handleKeyDown,
        onBlur: r.handleBlur,
        onCompositionStart: r.handleCompositionStart,
        onCompositionEnd: r.handleCompositionEnd
      }), r.isOpened() && {
        role: "combobox",
        "aria-controls": r.uuidSuggestionsOverlay,
        "aria-expanded": !0,
        "aria-autocomplete": "list",
        "aria-haspopup": "listbox",
        "aria-activedescendant": fo(r.uuidSuggestionsOverlay, r.state.focusIndex)
      });
    }), ee(te(r), "renderControl", function() {
      var i = r.props, s = i.singleLine, a = i.style, c = r.getInputProps();
      return /* @__PURE__ */ oe.createElement("div", a("control"), r.renderHighlighter(), s ? r.renderInput(c) : r.renderTextarea(c));
    }), ee(te(r), "renderInput", function(i) {
      return /* @__PURE__ */ oe.createElement("input", Oe({
        type: "text",
        ref: r.setInputRef
      }, i));
    }), ee(te(r), "renderTextarea", function(i) {
      return /* @__PURE__ */ oe.createElement("textarea", Oe({
        ref: r.setInputRef
      }, i));
    }), ee(te(r), "setInputRef", function(i) {
      r.inputElement = i;
      var s = r.props.inputRef;
      typeof s == "function" ? s(i) : s && (s.current = i);
    }), ee(te(r), "setSuggestionsElement", function(i) {
      r.suggestionsElement = i;
    }), ee(te(r), "renderSuggestionsOverlay", function() {
      if (!En(r.state.selectionStart))
        return null;
      var i = r.state.suggestionsPosition, s = i.position, a = i.left, c = i.top, f = i.right, u = /* @__PURE__ */ oe.createElement(ku, {
        id: r.uuidSuggestionsOverlay,
        style: r.props.style("suggestions"),
        position: s,
        left: a,
        top: c,
        right: f,
        focusIndex: r.state.focusIndex,
        scrollFocusedIntoView: r.state.scrollFocusedIntoView,
        containerRef: r.setSuggestionsElement,
        suggestions: r.state.suggestions,
        customSuggestionsContainer: r.props.customSuggestionsContainer,
        onSelect: r.addMention,
        onMouseDown: r.handleSuggestionsMouseDown,
        onMouseEnter: r.handleSuggestionsMouseEnter,
        isLoading: r.isLoading(),
        isOpened: r.isOpened(),
        ignoreAccents: r.props.ignoreAccents,
        a11ySuggestionsListLabel: r.props.a11ySuggestionsListLabel
      }, r.props.children);
      return r.props.suggestionsPortalHost ? /* @__PURE__ */ Zo.createPortal(u, r.props.suggestionsPortalHost) : u;
    }), ee(te(r), "renderHighlighter", function() {
      var i = r.state, s = i.selectionStart, a = i.selectionEnd, c = r.props, f = c.singleLine, u = c.children, l = c.value, d = c.style;
      return /* @__PURE__ */ oe.createElement(Nu, {
        containerRef: r.setHighlighterElement,
        style: d("highlighter"),
        value: l,
        singleLine: f,
        selectionStart: s,
        selectionEnd: a,
        onCaretPositionChange: r.handleCaretPositionChange
      }, u);
    }), ee(te(r), "setHighlighterElement", function(i) {
      r.highlighterElement = i;
    }), ee(te(r), "handleCaretPositionChange", function(i) {
      r.setState({
        caretPosition: i
      });
    }), ee(te(r), "getPlainText", function() {
      return Le(r.props.value || "", je(r.props.children));
    }), ee(te(r), "executeOnChange", function(i) {
      for (var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), c = 1; c < s; c++)
        a[c - 1] = arguments[c];
      if (r.props.onChange) {
        var f;
        return (f = r.props).onChange.apply(f, [i].concat(a));
      }
      if (r.props.valueLink) {
        var u;
        return (u = r.props.valueLink).requestChange.apply(u, [i.target.value].concat(a));
      }
    }), ee(te(r), "handleChange", function(i) {
      if (Ct = !1, Ru()) {
        var s = document.activeElement && document.activeElement.contentDocument || document;
        if (s.activeElement !== i.target)
          return;
      }
      var a = r.props.value || "", c = je(r.props.children), f = i.target.value, u = r.state.selectionStart;
      u == null && (u = i.target.selectionStart);
      var l = r.state.selectionEnd;
      l == null && (l = i.target.selectionEnd);
      var d = Eu(a, f, {
        selectionStartBefore: u,
        selectionEndBefore: l,
        selectionEndAfter: i.target.selectionEnd
      }, c);
      f = Le(d, c);
      var h = i.target.selectionStart, p = i.target.selectionEnd, m = !1, v = Or(a, c, h);
      v !== void 0 && r.state.selectionEnd > v && (h = v + (i.nativeEvent.data ? i.nativeEvent.data.length : 0), p = h, m = !0), r.setState({
        selectionStart: h,
        selectionEnd: p,
        setSelectionAfterMentionChange: m
      });
      var _ = ut(d, c);
      i.nativeEvent.isComposing && h === p && r.updateMentionsQueries(r.inputElement.value, h);
      var b = {
        target: {
          value: d
        }
      };
      r.executeOnChange(b, d, f, _);
    }), ee(te(r), "handleSelect", function(i) {
      if (r.setState({
        selectionStart: i.target.selectionStart,
        selectionEnd: i.target.selectionEnd
      }), !Ct) {
        var s = r.inputElement;
        i.target.selectionStart === i.target.selectionEnd ? r.updateMentionsQueries(s.value, i.target.selectionStart) : r.clearSuggestions(), r.updateHighlighterScroll(), r.props.onSelect(i);
      }
    }), ee(te(r), "handleKeyDown", function(i) {
      var s = St(r.state.suggestions);
      if (s === 0 || !r.suggestionsElement) {
        r.props.onKeyDown(i);
        return;
      }
      switch (Object.values(qe).indexOf(i.keyCode) >= 0 && (i.preventDefault(), i.stopPropagation()), i.keyCode) {
        case qe.ESC: {
          r.clearSuggestions();
          return;
        }
        case qe.DOWN: {
          r.shiftFocus(1);
          return;
        }
        case qe.UP: {
          r.shiftFocus(-1);
          return;
        }
        case qe.RETURN: {
          r.selectFocused();
          return;
        }
        case qe.TAB: {
          r.selectFocused();
          return;
        }
        default:
          return;
      }
    }), ee(te(r), "shiftFocus", function(i) {
      var s = St(r.state.suggestions);
      r.setState({
        focusIndex: (s + r.state.focusIndex + i) % s,
        scrollFocusedIntoView: !0
      });
    }), ee(te(r), "selectFocused", function() {
      var i = r.state, s = i.suggestions, a = i.focusIndex, c = Object.values(s).reduce(function(l, d) {
        var h = d.results, p = d.queryInfo;
        return [].concat(xt(l), xt(h.map(function(m) {
          return {
            result: m,
            queryInfo: p
          };
        })));
      }, [])[a], f = c.result, u = c.queryInfo;
      r.addMention(f, u), r.setState({
        focusIndex: 0
      });
    }), ee(te(r), "handleBlur", function(i) {
      var s = r._suggestionsMouseDown;
      r._suggestionsMouseDown = !1, s || r.setState({
        selectionStart: null,
        selectionEnd: null
      }), window.setTimeout(function() {
        r.updateHighlighterScroll();
      }, 1), r.props.onBlur(i, s);
    }), ee(te(r), "handleSuggestionsMouseDown", function(i) {
      r._suggestionsMouseDown = !0;
    }), ee(te(r), "handleSuggestionsMouseEnter", function(i) {
      r.setState({
        focusIndex: i,
        scrollFocusedIntoView: !1
      });
    }), ee(te(r), "updateSuggestionsPosition", function() {
      var i = r.state.caretPosition, s = r.props, a = s.suggestionsPortalHost, c = s.allowSuggestionsAboveCursor, f = s.forceSuggestionsAboveCursor;
      if (!(!i || !r.suggestionsElement)) {
        var u = r.suggestionsElement, l = r.highlighterElement, d = l.getBoundingClientRect(), h = an(l, "font-size"), p = {
          left: d.left + i.left,
          top: d.top + i.top + h
        }, m = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (u) {
          var v = {};
          if (a) {
            v.position = "fixed";
            var _ = p.left, b = p.top;
            _ -= an(u, "margin-left"), b -= an(u, "margin-top"), _ -= l.scrollLeft, b -= l.scrollTop;
            var S = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            _ + u.offsetWidth > S ? v.left = Math.max(0, S - u.offsetWidth) : v.left = _, c && b + u.offsetHeight > m && u.offsetHeight < b - h || f ? v.top = Math.max(0, b - u.offsetHeight - h) : v.top = b;
          } else {
            var R = i.left - l.scrollLeft, y = i.top - l.scrollTop;
            R + u.offsetWidth > r.containerElement.offsetWidth ? v.right = 0 : v.left = R, c && p.top - l.scrollTop + u.offsetHeight > m && u.offsetHeight < d.top - h - l.scrollTop || f ? v.top = y - u.offsetHeight - h : v.top = y;
          }
          v.left === r.state.suggestionsPosition.left && v.top === r.state.suggestionsPosition.top && v.position === r.state.suggestionsPosition.position || r.setState({
            suggestionsPosition: v
          });
        }
      }
    }), ee(te(r), "updateHighlighterScroll", function() {
      var i = r.inputElement, s = r.highlighterElement;
      !i || !s || (s.scrollLeft = i.scrollLeft, s.scrollTop = i.scrollTop, s.height = i.height);
    }), ee(te(r), "handleCompositionStart", function() {
      Ct = !0;
    }), ee(te(r), "handleCompositionEnd", function() {
      Ct = !1;
    }), ee(te(r), "setSelection", function(i, s) {
      if (!(i === null || s === null)) {
        var a = r.inputElement;
        if (a.setSelectionRange)
          a.setSelectionRange(i, s);
        else if (a.createTextRange) {
          var c = a.createTextRange();
          c.collapse(!0), c.moveEnd("character", s), c.moveStart("character", i), c.select();
        }
      }
    }), ee(te(r), "updateMentionsQueries", function(i, s) {
      r._queryId++, r.suggestions = {}, r.setState({
        suggestions: {}
      });
      var a = r.props.value || "", c = r.props.children, f = je(c), u = me(a, f, s, "NULL");
      if (u !== null) {
        var l = bu(a.substring(0, u), f), d = i.substring(l, s);
        oe.Children.forEach(c, function(h, p) {
          if (h) {
            var m = Hu(h.props.trigger, r.props), v = d.match(m);
            if (v) {
              var _ = l + d.indexOf(v[1], v.index);
              r.queryData(v[2], p, _, _ + v[1].length, i);
            }
          }
        });
      }
    }), ee(te(r), "clearSuggestions", function() {
      r._queryId++, r.suggestions = {}, r.setState({
        suggestions: {},
        focusIndex: 0
      });
    }), ee(te(r), "queryData", function(i, s, a, c, f) {
      var u = r.props, l = u.children, d = u.ignoreAccents, h = Ge.toArray(l)[s], p = Uu(h.props.data, d), m = p(i, r.updateSuggestions.bind(null, r._queryId, s, i, a, c, f));
      m instanceof Array && r.updateSuggestions(r._queryId, s, i, a, c, f, m);
    }), ee(te(r), "updateSuggestions", function(i, s, a, c, f, u, l) {
      if (i === r._queryId) {
        r.suggestions = Re(Re({}, r.suggestions), {}, ee({}, s, {
          queryInfo: {
            childIndex: s,
            query: a,
            querySequenceStart: c,
            querySequenceEnd: f,
            plainTextValue: u
          },
          results: l
        }));
        var d = r.state.focusIndex, h = St(r.suggestions);
        r.setState({
          suggestions: r.suggestions,
          focusIndex: d >= h ? Math.max(h - 1, 0) : d
        });
      }
    }), ee(te(r), "addMention", function(i, s) {
      var a = i.id, c = i.display, f = s.childIndex, u = s.querySequenceStart, l = s.querySequenceEnd, d = s.plainTextValue, h = r.props.value || "", p = je(r.props.children), m = Ge.toArray(r.props.children)[f], v = m.props, _ = v.markup, b = v.displayTransform, S = v.appendSpaceOnAdd, R = v.onAdd, y = me(h, p, u, "START"), x = y + l - u, F = Cu(_, a, c);
      S && (F += " ");
      var E = ct(h, y, x, F);
      r.inputElement.focus();
      var B = b(a, c);
      S && (B += " ");
      var O = u + B.length;
      r.setState({
        selectionStart: O,
        selectionEnd: O,
        setSelectionAfterMentionChange: !0
      });
      var M = {
        target: {
          value: E
        }
      }, G = ut(E, p), W = ct(d, u, l, B);
      r.executeOnChange(M, E, W, G), R && R(a, c, y, x), r.clearSuggestions();
    }), ee(te(r), "isLoading", function() {
      var i = !1;
      return oe.Children.forEach(r.props.children, function(s) {
        i = i || s && s.props.isLoading;
      }), i;
    }), ee(te(r), "isOpened", function() {
      return En(r.state.selectionStart) && (St(r.state.suggestions) !== 0 || r.isLoading());
    }), ee(te(r), "_queryId", 0), r.suggestions = {}, r.uuidSuggestionsOverlay = Math.random().toString(16).substring(2), r.handleCopy = r.handleCopy.bind(te(r)), r.handleCut = r.handleCut.bind(te(r)), r.handlePaste = r.handlePaste.bind(te(r)), r.state = {
      focusIndex: 0,
      selectionStart: null,
      selectionEnd: null,
      suggestions: {},
      caretPosition: null,
      suggestionsPosition: {},
      setSelectionAfterHandlePaste: !1
    }, r;
  }
  return Pa(o, [{
    key: "componentDidMount",
    value: function() {
      document.addEventListener("copy", this.handleCopy), document.addEventListener("cut", this.handleCut), document.addEventListener("paste", this.handlePaste), this.updateSuggestionsPosition();
    }
  }, {
    key: "componentDidUpdate",
    value: function(r, i) {
      i.suggestionsPosition === this.state.suggestionsPosition && this.updateSuggestionsPosition(), this.state.setSelectionAfterMentionChange && (this.setState({
        setSelectionAfterMentionChange: !1
      }), this.setSelection(this.state.selectionStart, this.state.selectionEnd)), this.state.setSelectionAfterHandlePaste && (this.setState({
        setSelectionAfterHandlePaste: !1
      }), this.setSelection(this.state.selectionStart, this.state.selectionEnd));
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("copy", this.handleCopy), document.removeEventListener("cut", this.handleCut), document.removeEventListener("paste", this.handlePaste);
    }
  }, {
    key: "render",
    value: function() {
      return /* @__PURE__ */ oe.createElement("div", Oe({
        ref: this.setContainerElement
      }, this.props.style), this.renderControl(), this.renderSuggestionsOverlay());
    }
  }, {
    key: "handlePaste",
    value: function(r) {
      if (r.target === this.inputElement && this.supportsClipboardActions(r)) {
        r.preventDefault();
        var i = this.state, s = i.selectionStart, a = i.selectionEnd, c = this.props, f = c.value, u = c.children, l = je(u), d = me(f, l, s, "START"), h = me(f, l, a, "END"), p = r.clipboardData.getData("text/react-mentions"), m = r.clipboardData.getData("text/plain"), v = ct(f, d, h, p || m).replace(/\r/g, ""), _ = Le(v, l), b = {
          target: Re(Re({}, r.target), {}, {
            value: v
          })
        };
        this.executeOnChange(b, v, _, ut(v, l));
        var S = Or(f, l, s), R = (S || s) + Le(p || m, l).length;
        this.setState({
          selectionStart: R,
          selectionEnd: R,
          setSelectionAfterHandlePaste: !0
        });
      }
    }
  }, {
    key: "saveSelectionToClipboard",
    value: function(r) {
      var i = this.inputElement.selectionStart, s = this.inputElement.selectionEnd, a = this.props, c = a.children, f = a.value, u = je(c), l = me(f, u, i, "START"), d = me(f, u, s, "END");
      r.clipboardData.setData("text/plain", r.target.value.slice(i, s)), r.clipboardData.setData("text/react-mentions", f.slice(l, d));
    }
  }, {
    key: "supportsClipboardActions",
    value: function(r) {
      return !!r.clipboardData;
    }
  }, {
    key: "handleCopy",
    value: function(r) {
      r.target === this.inputElement && this.supportsClipboardActions(r) && (r.preventDefault(), this.saveSelectionToClipboard(r));
    }
  }, {
    key: "handleCut",
    value: function(r) {
      if (r.target === this.inputElement && this.supportsClipboardActions(r)) {
        r.preventDefault(), this.saveSelectionToClipboard(r);
        var i = this.state, s = i.selectionStart, a = i.selectionEnd, c = this.props, f = c.children, u = c.value, l = je(f), d = me(u, l, s, "START"), h = me(u, l, a, "END"), p = [u.slice(0, d), u.slice(h)].join(""), m = Le(p, l), v = {
          target: Re(Re({}, r.target), {}, {
            value: m
          })
        };
        this.executeOnChange(v, p, m, ut(u, l));
      }
    }
    // Handle input element's change event
  }]), o;
}(oe.Component);
ee(Nn, "propTypes", mo);
ee(Nn, "defaultProps", {
  ignoreAccents: !1,
  singleLine: !1,
  allowSuggestionsAboveCursor: !1,
  onKeyDown: function() {
    return null;
  },
  onSelect: function() {
    return null;
  },
  onBlur: function() {
    return null;
  }
});
var an = function(t, o) {
  var n = parseFloat(window.getComputedStyle(t, null).getPropertyValue(o));
  return isFinite(n) ? n : 0;
}, zu = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent), Vu = zt({
  position: "relative",
  overflowY: "visible",
  input: {
    display: "block",
    width: "100%",
    position: "absolute",
    margin: 0,
    top: 0,
    left: 0,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit"
  },
  "&multiLine": {
    input: Re({
      height: "100%",
      bottom: 0,
      overflow: "hidden",
      resize: "none"
    }, zu ? {
      marginTop: 1,
      marginLeft: -3
    } : null)
  }
}, function(e) {
  var t = e.singleLine;
  return {
    "&singleLine": t,
    "&multiLine": !t
  };
}), qu = Vu(Nn), Wu = {
  fontWeight: "inherit"
}, jn = function(t) {
  var o = t.display, n = t.style, r = t.className, i = t.classNames, s = In(Wu, {
    style: n,
    className: r,
    classNames: i
  });
  return /* @__PURE__ */ oe.createElement("strong", s, o);
};
jn.propTypes = {
  /**
   * Called when a new mention is added in the input
   *
   * Example:
   *
   * ```js
   * function(id, display) {
   *   console.log("user " + display + " was mentioned!");
   * }
   * ```
   */
  onAdd: $.func,
  onRemove: $.func,
  renderSuggestion: $.func,
  trigger: $.oneOfType([$.string, $.instanceOf(RegExp)]),
  markup: $.string,
  displayTransform: $.func,
  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: $.bool,
  isLoading: $.bool
};
jn.defaultProps = {
  trigger: "@",
  markup: "@[__display__](__id__)",
  displayTransform: function(t, o) {
    return o || t;
  },
  onAdd: function() {
    return null;
  },
  onRemove: function() {
    return null;
  },
  renderSuggestion: null,
  isLoading: !1,
  appendSpaceOnAdd: !1
};
const Yu = {
  "&multiLine": {
    minHeight: "40px"
  },
  input: {
    border: "none",
    outline: "none",
    fontWeight: "500",
    fontSize: "15px",
    color: "rgba(0, 5, 15, 0.85)"
  },
  suggestions: {
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "8px",
    padding: "5px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    minWidth: "150px",
    maxHeight: "200px",
    overflowY: "auto",
    item: {
      fontSize: "15px",
      padding: "4px 11px 4px 11px",
      borderRadius: "4px",
      fontWeight: "500",
      "&focused": {
        backgroundColor: "#F5F6F8"
      }
    }
  }
}, Ku = ({ value: e, setValue: t }) => {
  const o = le((a) => a.users), n = Object.values(o).map((a) => ({
    ...a,
    display: a.display_name
  })), r = (a) => {
    a.stopPropagation();
  }, i = (a, c) => {
    console.info("[MentionsInputComponent] on mention select", { id: a, display: c });
  }, s = (a) => {
    t(a.target.value);
  };
  return /* @__PURE__ */ P.jsx(
    qu,
    {
      autoFocus: !0,
      value: e,
      onChange: s,
      style: {
        ...Yu,
        minHeight: "40px",
        marginBottom: "10px"
      },
      placeholder: "Type your reply here...",
      className: "mentions-input",
      onKeyDown: r,
      children: /* @__PURE__ */ P.jsx(
        jn,
        {
          displayTransform: (a, c) => `@${c}`,
          trigger: "@",
          data: n,
          appendSpaceOnAdd: !0,
          renderSuggestion: (a, c) => /* @__PURE__ */ P.jsx("div", { className: `user ${c ? "focused" : ""}`, children: a.display }),
          onAdd: i
        }
      )
    }
  );
}, Gu = Ku, Xu = ({ comment: e, setComment: t, loading: o }) => {
  const n = le(
    (r) => r.currentUserId ? r.users[r.currentUserId] : null
  );
  return /* @__PURE__ */ P.jsxs("div", { className: Fe.conversationInputForm, children: [
    /* @__PURE__ */ P.jsx(eo, { user: n }),
    /* @__PURE__ */ P.jsx(Gu, { value: e, setValue: t }),
    /* @__PURE__ */ P.jsx($s, { loading: o, color: "primary", children: /* @__PURE__ */ P.jsx(Ts, {}) })
  ] });
}, yo = Xu, Zu = ({
  text: e,
  filePath: t
}) => e ? /* @__PURE__ */ P.jsx("div", { className: Fe.highlightText, children: /* @__PURE__ */ P.jsx(
  Js,
  {
    code: e,
    language: "sql",
    showLineNumbers: !0,
    fileName: t
  }
) }) : null, Eo = Zu, Ju = () => {
  var c, f;
  const e = le(
    (u) => u.newConversation
  ), t = le(
    (u) => u.shareId
  ), o = De(), [n, r] = ge(!1), [i, s] = ge(""), a = async (u) => {
    if (u.stopPropagation(), u.preventDefault(), !(!e || !t)) {
      r(!0);
      try {
        console.log("saving conversation", e, i);
        const l = await oa(t, {
          ...e,
          message: i
        });
        if (!l.conversation_group_id) {
          console.error(
            "Unable to create conversation group",
            l
          );
          return;
        }
        console.log(
          "Successfully created conversation group",
          l
        );
      } catch (l) {
        console.error("error while saving conversation", e, l);
      }
      o(qr()), r(!1), o(Rn(!0)), o(Vr()), s("");
    }
  };
  return /* @__PURE__ */ P.jsx(Ft, { className: Fe.newConversationForm, children: /* @__PURE__ */ P.jsx(Mt, { children: /* @__PURE__ */ P.jsxs("form", { onSubmit: a, children: [
    /* @__PURE__ */ P.jsx("h4", { children: "Add comment" }),
    /* @__PURE__ */ P.jsx(
      Eo,
      {
        text: (c = e == null ? void 0 : e.meta) == null ? void 0 : c.highlight,
        filePath: ((f = e == null ? void 0 : e.meta) == null ? void 0 : f.filePath) || ""
      }
    ),
    /* @__PURE__ */ P.jsx(
      yo,
      {
        comment: i,
        setComment: s,
        loading: n
      }
    )
  ] }) }) });
}, Qu = Ju;
var bo = { exports: {} };
(function(e, t) {
  (function(o, n) {
    e.exports = n();
  })(Jo, function() {
    var o = 1e3, n = 6e4, r = 36e5, i = "millisecond", s = "second", a = "minute", c = "hour", f = "day", u = "week", l = "month", d = "quarter", h = "year", p = "date", m = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, _ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, b = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(N) {
      var D = ["th", "st", "nd", "rd"], T = N % 100;
      return "[" + N + (D[(T - 20) % 10] || D[T] || D[0]) + "]";
    } }, S = function(N, D, T) {
      var I = String(N);
      return !I || I.length >= D ? N : "" + Array(D + 1 - I.length).join(T) + N;
    }, R = { s: S, z: function(N) {
      var D = -N.utcOffset(), T = Math.abs(D), I = Math.floor(T / 60), w = T % 60;
      return (D <= 0 ? "+" : "-") + S(I, 2, "0") + ":" + S(w, 2, "0");
    }, m: function N(D, T) {
      if (D.date() < T.date())
        return -N(T, D);
      var I = 12 * (T.year() - D.year()) + (T.month() - D.month()), w = D.clone().add(I, l), L = T - w < 0, C = D.clone().add(I + (L ? -1 : 1), l);
      return +(-(I + (T - w) / (L ? w - C : C - w)) || 0);
    }, a: function(N) {
      return N < 0 ? Math.ceil(N) || 0 : Math.floor(N);
    }, p: function(N) {
      return { M: l, y: h, w: u, d: f, D: p, h: c, m: a, s, ms: i, Q: d }[N] || String(N || "").toLowerCase().replace(/s$/, "");
    }, u: function(N) {
      return N === void 0;
    } }, y = "en", x = {};
    x[y] = b;
    var F = "$isDayjsObject", E = function(N) {
      return N instanceof G || !(!N || !N[F]);
    }, B = function N(D, T, I) {
      var w;
      if (!D)
        return y;
      if (typeof D == "string") {
        var L = D.toLowerCase();
        x[L] && (w = L), T && (x[L] = T, w = L);
        var C = D.split("-");
        if (!w && C.length > 1)
          return N(C[0]);
      } else {
        var A = D.name;
        x[A] = D, w = A;
      }
      return !I && w && (y = w), w || !I && y;
    }, O = function(N, D) {
      if (E(N))
        return N.clone();
      var T = typeof D == "object" ? D : {};
      return T.date = N, T.args = arguments, new G(T);
    }, M = R;
    M.l = B, M.i = E, M.w = function(N, D) {
      return O(N, { locale: D.$L, utc: D.$u, x: D.$x, $offset: D.$offset });
    };
    var G = function() {
      function N(T) {
        this.$L = B(T.locale, null, !0), this.parse(T), this.$x = this.$x || T.x || {}, this[F] = !0;
      }
      var D = N.prototype;
      return D.parse = function(T) {
        this.$d = function(I) {
          var w = I.date, L = I.utc;
          if (w === null)
            return /* @__PURE__ */ new Date(NaN);
          if (M.u(w))
            return /* @__PURE__ */ new Date();
          if (w instanceof Date)
            return new Date(w);
          if (typeof w == "string" && !/Z$/i.test(w)) {
            var C = w.match(v);
            if (C) {
              var A = C[2] - 1 || 0, U = (C[7] || "0").substring(0, 3);
              return L ? new Date(Date.UTC(C[1], A, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, U)) : new Date(C[1], A, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, U);
            }
          }
          return new Date(w);
        }(T), this.init();
      }, D.init = function() {
        var T = this.$d;
        this.$y = T.getFullYear(), this.$M = T.getMonth(), this.$D = T.getDate(), this.$W = T.getDay(), this.$H = T.getHours(), this.$m = T.getMinutes(), this.$s = T.getSeconds(), this.$ms = T.getMilliseconds();
      }, D.$utils = function() {
        return M;
      }, D.isValid = function() {
        return this.$d.toString() !== m;
      }, D.isSame = function(T, I) {
        var w = O(T);
        return this.startOf(I) <= w && w <= this.endOf(I);
      }, D.isAfter = function(T, I) {
        return O(T) < this.startOf(I);
      }, D.isBefore = function(T, I) {
        return this.endOf(I) < O(T);
      }, D.$g = function(T, I, w) {
        return M.u(T) ? this[I] : this.set(w, T);
      }, D.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, D.valueOf = function() {
        return this.$d.getTime();
      }, D.startOf = function(T, I) {
        var w = this, L = !!M.u(I) || I, C = M.p(T), A = function(Q, q) {
          var ce = M.w(w.$u ? Date.UTC(w.$y, q, Q) : new Date(w.$y, q, Q), w);
          return L ? ce : ce.endOf(f);
        }, U = function(Q, q) {
          return M.w(w.toDate()[Q].apply(w.toDate("s"), (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(q)), w);
        }, z = this.$W, V = this.$M, X = this.$D, Y = "set" + (this.$u ? "UTC" : "");
        switch (C) {
          case h:
            return L ? A(1, 0) : A(31, 11);
          case l:
            return L ? A(1, V) : A(0, V + 1);
          case u:
            var K = this.$locale().weekStart || 0, J = (z < K ? z + 7 : z) - K;
            return A(L ? X - J : X + (6 - J), V);
          case f:
          case p:
            return U(Y + "Hours", 0);
          case c:
            return U(Y + "Minutes", 1);
          case a:
            return U(Y + "Seconds", 2);
          case s:
            return U(Y + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, D.endOf = function(T) {
        return this.startOf(T, !1);
      }, D.$set = function(T, I) {
        var w, L = M.p(T), C = "set" + (this.$u ? "UTC" : ""), A = (w = {}, w[f] = C + "Date", w[p] = C + "Date", w[l] = C + "Month", w[h] = C + "FullYear", w[c] = C + "Hours", w[a] = C + "Minutes", w[s] = C + "Seconds", w[i] = C + "Milliseconds", w)[L], U = L === f ? this.$D + (I - this.$W) : I;
        if (L === l || L === h) {
          var z = this.clone().set(p, 1);
          z.$d[A](U), z.init(), this.$d = z.set(p, Math.min(this.$D, z.daysInMonth())).$d;
        } else
          A && this.$d[A](U);
        return this.init(), this;
      }, D.set = function(T, I) {
        return this.clone().$set(T, I);
      }, D.get = function(T) {
        return this[M.p(T)]();
      }, D.add = function(T, I) {
        var w, L = this;
        T = Number(T);
        var C = M.p(I), A = function(V) {
          var X = O(L);
          return M.w(X.date(X.date() + Math.round(V * T)), L);
        };
        if (C === l)
          return this.set(l, this.$M + T);
        if (C === h)
          return this.set(h, this.$y + T);
        if (C === f)
          return A(1);
        if (C === u)
          return A(7);
        var U = (w = {}, w[a] = n, w[c] = r, w[s] = o, w)[C] || 1, z = this.$d.getTime() + T * U;
        return M.w(z, this);
      }, D.subtract = function(T, I) {
        return this.add(-1 * T, I);
      }, D.format = function(T) {
        var I = this, w = this.$locale();
        if (!this.isValid())
          return w.invalidDate || m;
        var L = T || "YYYY-MM-DDTHH:mm:ssZ", C = M.z(this), A = this.$H, U = this.$m, z = this.$M, V = w.weekdays, X = w.months, Y = w.meridiem, K = function(q, ce, k, he) {
          return q && (q[ce] || q(I, L)) || k[ce].slice(0, he);
        }, J = function(q) {
          return M.s(A % 12 || 12, q, "0");
        }, Q = Y || function(q, ce, k) {
          var he = q < 12 ? "AM" : "PM";
          return k ? he.toLowerCase() : he;
        };
        return L.replace(_, function(q, ce) {
          return ce || function(k) {
            switch (k) {
              case "YY":
                return String(I.$y).slice(-2);
              case "YYYY":
                return M.s(I.$y, 4, "0");
              case "M":
                return z + 1;
              case "MM":
                return M.s(z + 1, 2, "0");
              case "MMM":
                return K(w.monthsShort, z, X, 3);
              case "MMMM":
                return K(X, z);
              case "D":
                return I.$D;
              case "DD":
                return M.s(I.$D, 2, "0");
              case "d":
                return String(I.$W);
              case "dd":
                return K(w.weekdaysMin, I.$W, V, 2);
              case "ddd":
                return K(w.weekdaysShort, I.$W, V, 3);
              case "dddd":
                return V[I.$W];
              case "H":
                return String(A);
              case "HH":
                return M.s(A, 2, "0");
              case "h":
                return J(1);
              case "hh":
                return J(2);
              case "a":
                return Q(A, U, !0);
              case "A":
                return Q(A, U, !1);
              case "m":
                return String(U);
              case "mm":
                return M.s(U, 2, "0");
              case "s":
                return String(I.$s);
              case "ss":
                return M.s(I.$s, 2, "0");
              case "SSS":
                return M.s(I.$ms, 3, "0");
              case "Z":
                return C;
            }
            return null;
          }(q) || C.replace(":", "");
        });
      }, D.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, D.diff = function(T, I, w) {
        var L, C = this, A = M.p(I), U = O(T), z = (U.utcOffset() - this.utcOffset()) * n, V = this - U, X = function() {
          return M.m(C, U);
        };
        switch (A) {
          case h:
            L = X() / 12;
            break;
          case l:
            L = X();
            break;
          case d:
            L = X() / 3;
            break;
          case u:
            L = (V - z) / 6048e5;
            break;
          case f:
            L = (V - z) / 864e5;
            break;
          case c:
            L = V / r;
            break;
          case a:
            L = V / n;
            break;
          case s:
            L = V / o;
            break;
          default:
            L = V;
        }
        return w ? L : M.a(L);
      }, D.daysInMonth = function() {
        return this.endOf(l).$D;
      }, D.$locale = function() {
        return x[this.$L];
      }, D.locale = function(T, I) {
        if (!T)
          return this.$L;
        var w = this.clone(), L = B(T, I, !0);
        return L && (w.$L = L), w;
      }, D.clone = function() {
        return M.w(this.$d, this);
      }, D.toDate = function() {
        return new Date(this.valueOf());
      }, D.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, D.toISOString = function() {
        return this.$d.toISOString();
      }, D.toString = function() {
        return this.$d.toUTCString();
      }, N;
    }(), W = G.prototype;
    return O.prototype = W, [["$ms", i], ["$s", s], ["$m", a], ["$H", c], ["$W", f], ["$M", l], ["$y", h], ["$D", p]].forEach(function(N) {
      W[N[1]] = function(D) {
        return this.$g(D, N[0], N[1]);
      };
    }), O.extend = function(N, D) {
      return N.$i || (N(D, G, O), N.$i = !0), O;
    }, O.locale = B, O.isDayjs = E, O.unix = function(N) {
      return O(1e3 * N);
    }, O.en = x[y], O.Ls = x, O.p = {}, O;
  });
})(bo);
var ec = bo.exports;
const tc = /* @__PURE__ */ tt(ec), nc = ({
  conversationGroupId: e
}) => {
  const t = le(
    (s) => s.shareId
  ), o = De(), [n, r] = ge(!1), i = async () => {
    e && (r(!0), await ua(t, e), o(Zi({ conversationGroupId: e, shareId: t })), r(!1));
  };
  return e ? /* @__PURE__ */ P.jsx(
    Ds,
    {
      disabled: n,
      className: Fe.resolveButton,
      title: "Resolve conversation",
      onClick: i,
      children: /* @__PURE__ */ P.jsx(Cs, {})
    }
  ) : null;
}, rc = nc, oc = ({
  user: e,
  timestamp: t,
  showResolveButton: o,
  conversationGroupId: n
}) => /* @__PURE__ */ P.jsxs(Nr, { className: "d-flex align-items-center justify-content-between mb-0", children: [
  /* @__PURE__ */ P.jsxs("div", { className: "d-flex align-items-center gap-1", children: [
    /* @__PURE__ */ P.jsx(eo, { user: e }),
    /* @__PURE__ */ P.jsxs("h4", { children: [
      e == null ? void 0 : e.first_name,
      " ",
      e == null ? void 0 : e.last_name
    ] }),
    /* @__PURE__ */ P.jsx("span", { children: tc(t).format("HH:mm, DD MMM YY") })
  ] }),
  o ? /* @__PURE__ */ P.jsx(rc, { conversationGroupId: n }) : null
] }), _o = oc, ic = ({ conversation: e }) => {
  const t = le((o) => {
    var n;
    return (n = o.users) == null ? void 0 : n[e == null ? void 0 : e.user_id];
  });
  return /* @__PURE__ */ P.jsxs(Ft, { children: [
    /* @__PURE__ */ P.jsx(_o, { user: t, timestamp: e.timestamp }),
    /* @__PURE__ */ P.jsx(Mt, { children: /* @__PURE__ */ P.jsx("p", { children: e.message.replace(/@\[(.*?)\]\(\w+\)/g, "@$1") }) })
  ] });
}, sc = ic, ac = ({ conversationGroupId: e }) => {
  const t = le(
    (c) => c.shareId
  ), [o, n] = ge(""), [r, i] = ge(!1), s = De(), a = async (c) => {
    if (c.stopPropagation(), c.preventDefault(), !(!t || !e)) {
      i(!0), console.log("saving reply", t, e, {
        message: o
      });
      try {
        await ia(t, e, {
          message: o
        });
      } catch (f) {
        console.error("error while saving reply", f);
      }
      s(qr()), i(!1), n("");
    }
  };
  return /* @__PURE__ */ P.jsx("div", { className: Fe.replyForm, children: /* @__PURE__ */ P.jsx("form", { onSubmit: a, className: "", children: /* @__PURE__ */ P.jsx(
    yo,
    {
      comment: o,
      setComment: n,
      loading: r
    }
  ) }) });
}, uc = ac, cc = ({ conversationGroup: e }) => {
  var l, d;
  const t = Te(null), o = le((h) => {
    var p;
    return (p = h.users) == null ? void 0 : p[e == null ? void 0 : e.owner];
  }), n = le(
    (h) => h.selectedConversationId
  ), r = De(), [i, s] = ge(!1);
  if (Ae(() => {
    var h;
    n && ((h = t.current) == null || h.scrollIntoView({
      behavior: "smooth",
      block: "center"
    }));
  }, [n]), !((l = e == null ? void 0 : e.conversations) != null && l.length) || (e == null ? void 0 : e.status) !== "Pending")
    return null;
  const a = () => {
    r(
      On(e.conversation_group_id)
    );
  }, [c, ...f] = e.conversations, u = f.length ? f.length > 1 ? `${f.length} replies` : `${f.length} reply` : "Reply";
  return /* @__PURE__ */ P.jsxs(
    Ft,
    {
      className: `${Fe.conversationGroup} ${n === e.conversation_group_id ? "active" : ""}`,
      onClick: a,
      ref: t,
      children: [
        /* @__PURE__ */ P.jsx(
          _o,
          {
            user: o,
            timestamp: c.timestamp,
            showResolveButton: !0,
            conversationGroupId: e.conversation_group_id
          }
        ),
        /* @__PURE__ */ P.jsxs(Mt, { children: [
          /* @__PURE__ */ P.jsx(
            Eo,
            {
              text: (d = e.meta) == null ? void 0 : d.highlight,
              filePath: e.meta.filePath
            }
          ),
          /* @__PURE__ */ P.jsx("p", { children: c.message.replace(/@\[(.*?)\]\(\w+\)/g, "@$1") }),
          /* @__PURE__ */ P.jsx(Pt, { onClick: () => s((h) => !h), color: "link", children: u }),
          f.length ? /* @__PURE__ */ P.jsx(P.Fragment, { children: i ? /* @__PURE__ */ P.jsx(P.Fragment, { children: f.map((h) => /* @__PURE__ */ P.jsx(sc, { conversation: h }, h.conversation_id)) }) : null }) : null,
          i ? /* @__PURE__ */ P.jsx(
            uc,
            {
              conversationGroupId: e.conversation_group_id
            }
          ) : null
        ] })
      ]
    }
  );
}, lc = cc, fc = () => {
  const e = le(
    (t) => t.conversations
  );
  return !e || !Object.keys(e).length ? /* @__PURE__ */ P.jsx("div", { children: "No conversations yet!" }) : /* @__PURE__ */ P.jsx("div", { children: Object.values(e).map((t) => /* @__PURE__ */ P.jsx(
    lc,
    {
      conversationGroup: t
    },
    t.conversation_group_id
  )) });
}, dc = fc, pc = () => {
  const e = le((s) => s.isRightPanelOpen), t = le(
    (s) => s.selectedConversationId
  ), o = le((s) => s.newConversation), n = De(), r = () => {
    n(Rn(!1)), n(On(void 0)), n(Vr());
  };
  return !!o || e || t ? /* @__PURE__ */ P.jsxs(P.Fragment, { children: [
    /* @__PURE__ */ P.jsx(
      Xo,
      {
        onClick: r,
        className: Fe.conversationRightPanelCloseButton
      }
    ),
    /* @__PURE__ */ P.jsxs("div", { className: Fe.conversationRightPanel, children: [
      /* @__PURE__ */ P.jsx("h3", { children: "Comments" }),
      o ? /* @__PURE__ */ P.jsx(Qu, {}) : /* @__PURE__ */ P.jsx(dc, {})
    ] })
  ] }) : null;
}, hc = pc, gc = 120, vc = () => {
  const e = Te(), t = le(
    (s) => s.shareId
  ), o = le(
    (s) => s.conversationsLoadingState
  ), n = De(), r = le(
    (s) => Object.keys(s.conversations || {})
  ), i = Ke(
    (s) => {
      clearTimeout(e.current), sa(s).then(
        (a) => {
          console.log("useConversations", a), n(Gi(a == null ? void 0 : a.dbt_docs_share_conversations)), e.current = setTimeout(() => {
            i(s);
          }, gc * 1e3);
        }
      ).catch(
        (a) => console.error("error while fetching conversations list", a)
      ).finally(() => {
        n(sr(Ce.INITIALIZED));
      });
    },
    [n]
  );
  return Ae(() => {
    o !== Ce.UNINITIALIZED || !t || (n(sr(Ce.LOADING)), i(t));
  }, [n, o, r, t, i]), { isLoading: o === Ce.LOADING };
}, mc = () => {
  const e = De(), t = le(
    (r) => Object.keys(r.users || {})
  ), [o, n] = ge(Ce.UNINITIALIZED);
  return Ae(() => {
    o !== Ce.UNINITIALIZED || Object.keys(t).length || (n(Ce.LOADING), aa().then((r) => {
      console.log("useConversationUsers", r), e(Ki(r));
    }).catch((r) => console.error("error while fetching users list", r)).finally(() => {
      n(Ce.INITIALIZED);
    }));
  }, [e, o, t]), { isLoading: o === Ce.LOADING };
}, yc = () => (mc(), vc(), /* @__PURE__ */ P.jsxs("div", { children: [
  /* @__PURE__ */ P.jsx(hc, {}),
  /* @__PURE__ */ P.jsx(ma, {})
] })), Ec = yc, bc = Yo(() => import("./DbtDocsRenderer.js")), _c = () => {
  const { loading: e, shareDetails: t } = ca(), o = De(), { getHighlightedSelectionData: n, pos: r, onSelectionEnd: i } = pa(), s = () => {
    const a = n();
    a && o(Xi(a));
  };
  return e ? /* @__PURE__ */ P.jsx("div", { children: "Loading..." }) : !(t != null && t.catalog_presigned_url) || !(t != null && t.manifest_presigned_url) ? /* @__PURE__ */ P.jsx("div", { children: "Unable to load required artifacts. Please try again." }) : /* @__PURE__ */ P.jsxs("div", { children: [
    /* @__PURE__ */ P.jsx("div", { className: "d-flex justify-content-end mb-2", children: /* @__PURE__ */ P.jsx(na, {}) }),
    /* @__PURE__ */ P.jsx(Ec, {}),
    /* @__PURE__ */ P.jsx(
      bc,
      {
        shareDetails: t,
        onSelectionEnd: i
      }
    ),
    r ? /* @__PURE__ */ P.jsx(ea, { pos: r, onAddComment: s }) : null
  ] });
}, Sc = _c, Cc = ({ shareId: e, userId: t, conversationGroupId: o, source: n }) => /* @__PURE__ */ P.jsx("div", { className: "altimate-component", children: /* @__PURE__ */ P.jsx(
  Qi,
  {
    shareId: e,
    userId: t,
    conversationGroupId: o,
    source: n,
    children: /* @__PURE__ */ P.jsx(Sc, {})
  }
) }), kc = Cc;
export {
  nt as A,
  Js as C,
  kc as D,
  le as a,
  Nc as b,
  jc as c,
  Qr as d,
  Fe as e,
  ti as g,
  P as j,
  xc as s,
  De as u
};
