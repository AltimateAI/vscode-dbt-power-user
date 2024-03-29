import './main.css';
import * as ue from "react";
import un, { useRef as Se, useState as he, useEffect as ke, createContext as it, useReducer as Ya, useCallback as xe, useMemo as nt, useContext as ne, useLayoutEffect as Ka, useInsertionEffect as Vs, forwardRef as js, Fragment as Xa, createElement as qa, useId as dr, cloneElement as Za, Children as Ja, isValidElement as Qa, lazy as el } from "react";
import { Card as fr, CardBody as hr, Input as ks, Button as yt, CardTitle as tl, CloseButton as nl } from "reactstrap";
var rl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ls(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var zn = { exports: {} }, Tt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var di;
function il() {
  if (di)
    return Tt;
  di = 1;
  var e = un, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(a, c, u) {
    var l, d = {}, f = null, p = null;
    u !== void 0 && (f = "" + u), c.key !== void 0 && (f = "" + c.key), c.ref !== void 0 && (p = c.ref);
    for (l in c)
      r.call(c, l) && !s.hasOwnProperty(l) && (d[l] = c[l]);
    if (a && a.defaultProps)
      for (l in c = a.defaultProps, c)
        d[l] === void 0 && (d[l] = c[l]);
    return { $$typeof: t, type: a, key: f, ref: p, props: d, _owner: i.current };
  }
  return Tt.Fragment = n, Tt.jsx = o, Tt.jsxs = o, Tt;
}
var bt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fi;
function sl() {
  return fi || (fi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = un, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = Symbol.iterator, g = "@@iterator";
    function v(m) {
      if (m === null || typeof m != "object")
        return null;
      var C = h && m[h] || m[g];
      return typeof C == "function" ? C : null;
    }
    var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(m) {
      {
        for (var C = arguments.length, M = new Array(C > 1 ? C - 1 : 0), $ = 1; $ < C; $++)
          M[$ - 1] = arguments[$];
        T("error", m, M);
      }
    }
    function T(m, C, M) {
      {
        var $ = b.ReactDebugCurrentFrame, G = $.getStackAddendum();
        G !== "" && (C += "%s", M = M.concat([G]));
        var Y = M.map(function(W) {
          return String(W);
        });
        Y.unshift("Warning: " + C), Function.prototype.apply.call(console[m], console, Y);
      }
    }
    var w = !1, S = !1, D = !1, A = !1, y = !1, N;
    N = Symbol.for("react.module.reference");
    function _(m) {
      return !!(typeof m == "string" || typeof m == "function" || m === r || m === s || y || m === i || m === u || m === l || A || m === p || w || S || D || typeof m == "object" && m !== null && (m.$$typeof === f || m.$$typeof === d || m.$$typeof === o || m.$$typeof === a || m.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      m.$$typeof === N || m.getModuleId !== void 0));
    }
    function V(m, C, M) {
      var $ = m.displayName;
      if ($)
        return $;
      var G = C.displayName || C.name || "";
      return G !== "" ? M + "(" + G + ")" : M;
    }
    function H(m) {
      return m.displayName || "Context";
    }
    function z(m) {
      if (m == null)
        return null;
      if (typeof m.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof m == "function")
        return m.displayName || m.name || null;
      if (typeof m == "string")
        return m;
      switch (m) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case s:
          return "Profiler";
        case i:
          return "StrictMode";
        case u:
          return "Suspense";
        case l:
          return "SuspenseList";
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case a:
            var C = m;
            return H(C) + ".Consumer";
          case o:
            var M = m;
            return H(M._context) + ".Provider";
          case c:
            return V(m, m.render, "ForwardRef");
          case d:
            var $ = m.displayName || null;
            return $ !== null ? $ : z(m.type) || "Memo";
          case f: {
            var G = m, Y = G._payload, W = G._init;
            try {
              return z(W(Y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, R = 0, x, O, P, L, k, B, K;
    function q() {
    }
    q.__reactDisabledLog = !0;
    function re() {
      {
        if (R === 0) {
          x = console.log, O = console.info, P = console.warn, L = console.error, k = console.group, B = console.groupCollapsed, K = console.groupEnd;
          var m = {
            configurable: !0,
            enumerable: !0,
            value: q,
            writable: !0
          };
          Object.defineProperties(console, {
            info: m,
            log: m,
            warn: m,
            error: m,
            group: m,
            groupCollapsed: m,
            groupEnd: m
          });
        }
        R++;
      }
    }
    function de() {
      {
        if (R--, R === 0) {
          var m = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, m, {
              value: x
            }),
            info: I({}, m, {
              value: O
            }),
            warn: I({}, m, {
              value: P
            }),
            error: I({}, m, {
              value: L
            }),
            group: I({}, m, {
              value: k
            }),
            groupCollapsed: I({}, m, {
              value: B
            }),
            groupEnd: I({}, m, {
              value: K
            })
          });
        }
        R < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var we = b.ReactCurrentDispatcher, be;
    function Re(m, C, M) {
      {
        if (be === void 0)
          try {
            throw Error();
          } catch (G) {
            var $ = G.stack.trim().match(/\n( *(at )?)/);
            be = $ && $[1] || "";
          }
        return `
` + be + m;
      }
    }
    var _e = !1, te;
    {
      var Ce = typeof WeakMap == "function" ? WeakMap : Map;
      te = new Ce();
    }
    function Le(m, C) {
      if (!m || _e)
        return "";
      {
        var M = te.get(m);
        if (M !== void 0)
          return M;
      }
      var $;
      _e = !0;
      var G = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Y;
      Y = we.current, we.current = null, re();
      try {
        if (C) {
          var W = function() {
            throw Error();
          };
          if (Object.defineProperty(W.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(W, []);
            } catch (Ae) {
              $ = Ae;
            }
            Reflect.construct(m, [], W);
          } else {
            try {
              W.call();
            } catch (Ae) {
              $ = Ae;
            }
            m.call(W.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ae) {
            $ = Ae;
          }
          m();
        }
      } catch (Ae) {
        if (Ae && $ && typeof Ae.stack == "string") {
          for (var U = Ae.stack.split(`
`), ce = $.stack.split(`
`), Z = U.length - 1, ee = ce.length - 1; Z >= 1 && ee >= 0 && U[Z] !== ce[ee]; )
            ee--;
          for (; Z >= 1 && ee >= 0; Z--, ee--)
            if (U[Z] !== ce[ee]) {
              if (Z !== 1 || ee !== 1)
                do
                  if (Z--, ee--, ee < 0 || U[Z] !== ce[ee]) {
                    var ve = `
` + U[Z].replace(" at new ", " at ");
                    return m.displayName && ve.includes("<anonymous>") && (ve = ve.replace("<anonymous>", m.displayName)), typeof m == "function" && te.set(m, ve), ve;
                  }
                while (Z >= 1 && ee >= 0);
              break;
            }
        }
      } finally {
        _e = !1, we.current = Y, de(), Error.prepareStackTrace = G;
      }
      var ct = m ? m.displayName || m.name : "", ui = ct ? Re(ct) : "";
      return typeof m == "function" && te.set(m, ui), ui;
    }
    function at(m, C, M) {
      return Le(m, !1);
    }
    function Ra(m) {
      var C = m.prototype;
      return !!(C && C.isReactComponent);
    }
    function Bt(m, C, M) {
      if (m == null)
        return "";
      if (typeof m == "function")
        return Le(m, Ra(m));
      if (typeof m == "string")
        return Re(m);
      switch (m) {
        case u:
          return Re("Suspense");
        case l:
          return Re("SuspenseList");
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case c:
            return at(m.render);
          case d:
            return Bt(m.type, C, M);
          case f: {
            var $ = m, G = $._payload, Y = $._init;
            try {
              return Bt(Y(G), C, M);
            } catch {
            }
          }
        }
      return "";
    }
    var Ht = Object.prototype.hasOwnProperty, Jr = {}, Qr = b.ReactDebugCurrentFrame;
    function Ut(m) {
      if (m) {
        var C = m._owner, M = Bt(m.type, m._source, C ? C.type : null);
        Qr.setExtraStackFrame(M);
      } else
        Qr.setExtraStackFrame(null);
    }
    function Ca(m, C, M, $, G) {
      {
        var Y = Function.call.bind(Ht);
        for (var W in m)
          if (Y(m, W)) {
            var U = void 0;
            try {
              if (typeof m[W] != "function") {
                var ce = Error(($ || "React class") + ": " + M + " type `" + W + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof m[W] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ce.name = "Invariant Violation", ce;
              }
              U = m[W](C, W, $, M, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              U = Z;
            }
            U && !(U instanceof Error) && (Ut(G), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", $ || "React class", M, W, typeof U), Ut(null)), U instanceof Error && !(U.message in Jr) && (Jr[U.message] = !0, Ut(G), E("Failed %s type: %s", M, U.message), Ut(null));
          }
      }
    }
    var Pa = Array.isArray;
    function Sn(m) {
      return Pa(m);
    }
    function Da(m) {
      {
        var C = typeof Symbol == "function" && Symbol.toStringTag, M = C && m[Symbol.toStringTag] || m.constructor.name || "Object";
        return M;
      }
    }
    function Aa(m) {
      try {
        return ei(m), !1;
      } catch {
        return !0;
      }
    }
    function ei(m) {
      return "" + m;
    }
    function ti(m) {
      if (Aa(m))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Da(m)), ei(m);
    }
    var Et = b.ReactCurrentOwner, Ia = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ni, ri, xn;
    xn = {};
    function Oa(m) {
      if (Ht.call(m, "ref")) {
        var C = Object.getOwnPropertyDescriptor(m, "ref").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return m.ref !== void 0;
    }
    function Ma(m) {
      if (Ht.call(m, "key")) {
        var C = Object.getOwnPropertyDescriptor(m, "key").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return m.key !== void 0;
    }
    function Na(m, C) {
      if (typeof m.ref == "string" && Et.current && C && Et.current.stateNode !== C) {
        var M = z(Et.current.type);
        xn[M] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', z(Et.current.type), m.ref), xn[M] = !0);
      }
    }
    function Va(m, C) {
      {
        var M = function() {
          ni || (ni = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        M.isReactWarning = !0, Object.defineProperty(m, "key", {
          get: M,
          configurable: !0
        });
      }
    }
    function ja(m, C) {
      {
        var M = function() {
          ri || (ri = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        M.isReactWarning = !0, Object.defineProperty(m, "ref", {
          get: M,
          configurable: !0
        });
      }
    }
    var ka = function(m, C, M, $, G, Y, W) {
      var U = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: m,
        key: C,
        ref: M,
        props: W,
        // Record the component responsible for creating this element.
        _owner: Y
      };
      return U._store = {}, Object.defineProperty(U._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(U, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: $
      }), Object.defineProperty(U, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.freeze && (Object.freeze(U.props), Object.freeze(U)), U;
    };
    function La(m, C, M, $, G) {
      {
        var Y, W = {}, U = null, ce = null;
        M !== void 0 && (ti(M), U = "" + M), Ma(C) && (ti(C.key), U = "" + C.key), Oa(C) && (ce = C.ref, Na(C, G));
        for (Y in C)
          Ht.call(C, Y) && !Ia.hasOwnProperty(Y) && (W[Y] = C[Y]);
        if (m && m.defaultProps) {
          var Z = m.defaultProps;
          for (Y in Z)
            W[Y] === void 0 && (W[Y] = Z[Y]);
        }
        if (U || ce) {
          var ee = typeof m == "function" ? m.displayName || m.name || "Unknown" : m;
          U && Va(W, ee), ce && ja(W, ee);
        }
        return ka(m, U, ce, G, $, Et.current, W);
      }
    }
    var wn = b.ReactCurrentOwner, ii = b.ReactDebugCurrentFrame;
    function lt(m) {
      if (m) {
        var C = m._owner, M = Bt(m.type, m._source, C ? C.type : null);
        ii.setExtraStackFrame(M);
      } else
        ii.setExtraStackFrame(null);
    }
    var Rn;
    Rn = !1;
    function Cn(m) {
      return typeof m == "object" && m !== null && m.$$typeof === t;
    }
    function si() {
      {
        if (wn.current) {
          var m = z(wn.current.type);
          if (m)
            return `

Check the render method of \`` + m + "`.";
        }
        return "";
      }
    }
    function Fa(m) {
      {
        if (m !== void 0) {
          var C = m.fileName.replace(/^.*[\\\/]/, ""), M = m.lineNumber;
          return `

Check your code at ` + C + ":" + M + ".";
        }
        return "";
      }
    }
    var oi = {};
    function $a(m) {
      {
        var C = si();
        if (!C) {
          var M = typeof m == "string" ? m : m.displayName || m.name;
          M && (C = `

Check the top-level render call using <` + M + ">.");
        }
        return C;
      }
    }
    function ai(m, C) {
      {
        if (!m._store || m._store.validated || m.key != null)
          return;
        m._store.validated = !0;
        var M = $a(C);
        if (oi[M])
          return;
        oi[M] = !0;
        var $ = "";
        m && m._owner && m._owner !== wn.current && ($ = " It was passed a child from " + z(m._owner.type) + "."), lt(m), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', M, $), lt(null);
      }
    }
    function li(m, C) {
      {
        if (typeof m != "object")
          return;
        if (Sn(m))
          for (var M = 0; M < m.length; M++) {
            var $ = m[M];
            Cn($) && ai($, C);
          }
        else if (Cn(m))
          m._store && (m._store.validated = !0);
        else if (m) {
          var G = v(m);
          if (typeof G == "function" && G !== m.entries)
            for (var Y = G.call(m), W; !(W = Y.next()).done; )
              Cn(W.value) && ai(W.value, C);
        }
      }
    }
    function Ba(m) {
      {
        var C = m.type;
        if (C == null || typeof C == "string")
          return;
        var M;
        if (typeof C == "function")
          M = C.propTypes;
        else if (typeof C == "object" && (C.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        C.$$typeof === d))
          M = C.propTypes;
        else
          return;
        if (M) {
          var $ = z(C);
          Ca(M, m.props, "prop", $, m);
        } else if (C.PropTypes !== void 0 && !Rn) {
          Rn = !0;
          var G = z(C);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", G || "Unknown");
        }
        typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ha(m) {
      {
        for (var C = Object.keys(m.props), M = 0; M < C.length; M++) {
          var $ = C[M];
          if ($ !== "children" && $ !== "key") {
            lt(m), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", $), lt(null);
            break;
          }
        }
        m.ref !== null && (lt(m), E("Invalid attribute `ref` supplied to `React.Fragment`."), lt(null));
      }
    }
    function ci(m, C, M, $, G, Y) {
      {
        var W = _(m);
        if (!W) {
          var U = "";
          (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (U += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = Fa(G);
          ce ? U += ce : U += si();
          var Z;
          m === null ? Z = "null" : Sn(m) ? Z = "array" : m !== void 0 && m.$$typeof === t ? (Z = "<" + (z(m.type) || "Unknown") + " />", U = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof m, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, U);
        }
        var ee = La(m, C, M, G, Y);
        if (ee == null)
          return ee;
        if (W) {
          var ve = C.children;
          if (ve !== void 0)
            if ($)
              if (Sn(ve)) {
                for (var ct = 0; ct < ve.length; ct++)
                  li(ve[ct], m);
                Object.freeze && Object.freeze(ve);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              li(ve, m);
        }
        return m === r ? Ha(ee) : Ba(ee), ee;
      }
    }
    function Ua(m, C, M) {
      return ci(m, C, M, !0);
    }
    function za(m, C, M) {
      return ci(m, C, M, !1);
    }
    var Wa = za, Ga = Ua;
    bt.Fragment = r, bt.jsx = Wa, bt.jsxs = Ga;
  }()), bt;
}
process.env.NODE_ENV === "production" ? zn.exports = il() : zn.exports = sl();
var j = zn.exports;
function ol(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function al(e) {
  return ol(e) && "type" in e && typeof e.type == "string";
}
var Fs = Symbol.for("immer-nothing"), hi = Symbol.for("immer-draftable"), me = Symbol.for("immer-state"), ll = process.env.NODE_ENV !== "production" ? [
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
function fe(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = ll[e], r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var pt = Object.getPrototypeOf;
function He(e) {
  return !!e && !!e[me];
}
function je(e) {
  var t;
  return e ? $s(e) || Array.isArray(e) || !!e[hi] || !!((t = e.constructor) != null && t[hi]) || fn(e) || hn(e) : !1;
}
var cl = Object.prototype.constructor.toString();
function $s(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = pt(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === cl;
}
function Jt(e, t) {
  dn(e) === 0 ? Reflect.ownKeys(e).forEach((n) => {
    t(n, e[n], e);
  }) : e.forEach((n, r) => t(r, n, e));
}
function dn(e) {
  const t = e[me];
  return t ? t.type_ : Array.isArray(e) ? 1 : fn(e) ? 2 : hn(e) ? 3 : 0;
}
function Wn(e, t) {
  return dn(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Bs(e, t, n) {
  const r = dn(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
}
function ul(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function fn(e) {
  return e instanceof Map;
}
function hn(e) {
  return e instanceof Set;
}
function Xe(e) {
  return e.copy_ || e.base_;
}
function Gn(e, t) {
  if (fn(e))
    return new Map(e);
  if (hn(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && $s(e))
    return pt(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[me];
  let r = Reflect.ownKeys(n);
  for (let i = 0; i < r.length; i++) {
    const s = r[i], o = n[s];
    o.writable === !1 && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (n[s] = {
      configurable: !0,
      writable: !0,
      // could live with !!desc.set as well here...
      enumerable: o.enumerable,
      value: e[s]
    });
  }
  return Object.create(pt(e), n);
}
function pr(e, t = !1) {
  return pn(e) || He(e) || !je(e) || (dn(e) > 1 && (e.set = e.add = e.clear = e.delete = dl), Object.freeze(e), t && Object.entries(e).forEach(([n, r]) => pr(r, !0))), e;
}
function dl() {
  fe(2);
}
function pn(e) {
  return Object.isFrozen(e);
}
var fl = {};
function rt(e) {
  const t = fl[e];
  return t || fe(0, e), t;
}
var Pt;
function Hs() {
  return Pt;
}
function hl(e, t) {
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
function pi(e, t) {
  t && (rt("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Yn(e) {
  Kn(e), e.drafts_.forEach(pl), e.drafts_ = null;
}
function Kn(e) {
  e === Pt && (Pt = e.parent_);
}
function mi(e) {
  return Pt = hl(Pt, e);
}
function pl(e) {
  const t = e[me];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function gi(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[me].modified_ && (Yn(t), fe(4)), je(e) && (e = Qt(t, e), t.parent_ || en(t, e)), t.patches_ && rt("Patches").generateReplacementPatches_(
    n[me].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Qt(t, n, []), Yn(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Fs ? e : void 0;
}
function Qt(e, t, n) {
  if (pn(t))
    return t;
  const r = t[me];
  if (!r)
    return Jt(
      t,
      (i, s) => yi(e, r, t, i, s, n)
    ), t;
  if (r.scope_ !== e)
    return t;
  if (!r.modified_)
    return en(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    r.finalized_ = !0, r.scope_.unfinalizedDrafts_--;
    const i = r.copy_;
    let s = i, o = !1;
    r.type_ === 3 && (s = new Set(i), i.clear(), o = !0), Jt(
      s,
      (a, c) => yi(e, r, i, a, c, n, o)
    ), en(e, i, !1), n && e.patches_ && rt("Patches").generatePatches_(
      r,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return r.copy_;
}
function yi(e, t, n, r, i, s, o) {
  if (process.env.NODE_ENV !== "production" && i === n && fe(5), He(i)) {
    const a = s && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Wn(t.assigned_, r) ? s.concat(r) : void 0, c = Qt(e, i, a);
    if (Bs(n, r, c), He(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    o && n.add(i);
  if (je(i) && !pn(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Qt(e, i), (!t || !t.scope_.parent_) && typeof r != "symbol" && Object.prototype.propertyIsEnumerable.call(n, r) && en(e, i);
  }
}
function en(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && pr(t, n);
}
function ml(e, t) {
  const n = Array.isArray(e), r = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Hs(),
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
  let i = r, s = mr;
  n && (i = [r], s = Dt);
  const { revoke: o, proxy: a } = Proxy.revocable(i, s);
  return r.draft_ = a, r.revoke_ = o, a;
}
var mr = {
  get(e, t) {
    if (t === me)
      return e;
    const n = Xe(e);
    if (!Wn(n, t))
      return gl(e, n, t);
    const r = n[t];
    return e.finalized_ || !je(r) ? r : r === Pn(e.base_, t) ? (Dn(e), e.copy_[t] = qn(r, e)) : r;
  },
  has(e, t) {
    return t in Xe(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Xe(e));
  },
  set(e, t, n) {
    const r = Us(Xe(e), t);
    if (r != null && r.set)
      return r.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const i = Pn(Xe(e), t), s = i == null ? void 0 : i[me];
      if (s && s.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (ul(n, i) && (n !== void 0 || Wn(e.base_, t)))
        return !0;
      Dn(e), Xn(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Pn(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Dn(e), Xn(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const n = Xe(e), r = Reflect.getOwnPropertyDescriptor(n, t);
    return r && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: r.enumerable,
      value: n[t]
    };
  },
  defineProperty() {
    fe(11);
  },
  getPrototypeOf(e) {
    return pt(e.base_);
  },
  setPrototypeOf() {
    fe(12);
  }
}, Dt = {};
Jt(mr, (e, t) => {
  Dt[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Dt.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && fe(13), Dt.set.call(this, e, t, void 0);
};
Dt.set = function(e, t, n) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && fe(14), mr.set.call(this, e[0], t, n, e[0]);
};
function Pn(e, t) {
  const n = e[me];
  return (n ? Xe(n) : e)[t];
}
function gl(e, t, n) {
  var i;
  const r = Us(t, n);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = r.get) == null ? void 0 : i.call(e.draft_)
  ) : void 0;
}
function Us(e, t) {
  if (!(t in e))
    return;
  let n = pt(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r)
      return r;
    n = pt(n);
  }
}
function Xn(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Xn(e.parent_));
}
function Dn(e) {
  e.copy_ || (e.copy_ = Gn(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var yl = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, r) => {
      if (typeof t == "function" && typeof n != "function") {
        const s = n;
        n = t;
        const o = this;
        return function(c = s, ...u) {
          return o.produce(c, (l) => n.call(this, l, ...u));
        };
      }
      typeof n != "function" && fe(6), r !== void 0 && typeof r != "function" && fe(7);
      let i;
      if (je(t)) {
        const s = mi(this), o = qn(t, void 0);
        let a = !0;
        try {
          i = n(o), a = !1;
        } finally {
          a ? Yn(s) : Kn(s);
        }
        return pi(s, r), gi(i, s);
      } else if (!t || typeof t != "object") {
        if (i = n(t), i === void 0 && (i = t), i === Fs && (i = void 0), this.autoFreeze_ && pr(i, !0), r) {
          const s = [], o = [];
          rt("Patches").generateReplacementPatches_(t, i, s, o), r(s, o);
        }
        return i;
      } else
        fe(1, t);
    }, this.produceWithPatches = (t, n) => {
      if (typeof t == "function")
        return (o, ...a) => this.produceWithPatches(o, (c) => t(c, ...a));
      let r, i;
      return [this.produce(t, n, (o, a) => {
        r = o, i = a;
      }), r, i];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    je(e) || fe(8), He(e) && (e = zs(e));
    const t = mi(this), n = qn(e, void 0);
    return n[me].isManual_ = !0, Kn(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[me];
    (!n || !n.isManual_) && fe(9);
    const { scope_: r } = n;
    return pi(r, t), gi(void 0, r);
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
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const i = t[n];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = rt("Patches").applyPatches_;
    return He(e) ? r(e, t) : this.produce(
      e,
      (i) => r(i, t)
    );
  }
};
function qn(e, t) {
  const n = fn(e) ? rt("MapSet").proxyMap_(e, t) : hn(e) ? rt("MapSet").proxySet_(e, t) : ml(e, t);
  return (t ? t.scope_ : Hs()).drafts_.push(n), n;
}
function zs(e) {
  return He(e) || fe(10, e), Ws(e);
}
function Ws(e) {
  if (!je(e) || pn(e))
    return e;
  const t = e[me];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = Gn(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = Gn(e, !0);
  return Jt(n, (r, i) => {
    Bs(n, r, Ws(i));
  }), t && (t.finalized_ = !1), n;
}
var ge = new yl(), Gs = ge.produce;
ge.produceWithPatches.bind(
  ge
);
ge.setAutoFreeze.bind(ge);
ge.setUseStrictShallowCopy.bind(ge);
ge.applyPatches.bind(ge);
ge.createDraft.bind(ge);
ge.finishDraft.bind(ge);
var vl = (e, t, n) => {
  if (t.length === 1 && t[0] === n) {
    let r = !1;
    try {
      const i = {};
      e(i) === i && (r = !0);
    } catch {
    }
    if (r) {
      let i;
      try {
        throw new Error();
      } catch (s) {
        ({ stack: i } = s);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: i }
      );
    }
  }
}, El = (e, t, n) => {
  const { memoize: r, memoizeOptions: i } = t, { inputSelectorResults: s, inputSelectorResultsCopy: o } = e, a = r(() => ({}), ...i);
  if (!(a.apply(null, s) === a.apply(null, o))) {
    let u;
    try {
      throw new Error();
    } catch (l) {
      ({ stack: u } = l);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: n,
        firstInputs: s,
        secondInputs: o,
        stack: u
      }
    );
  }
}, Tl = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function bl(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function _l(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function Sl(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (r) => typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var vi = (e) => Array.isArray(e) ? e : [e];
function xl(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return Sl(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function Ei(e, t) {
  const n = [], { length: r } = e;
  for (let i = 0; i < r; i++)
    n.push(e[i].apply(null, t));
  return n;
}
var wl = (e, t) => {
  const { identityFunctionCheck: n, inputStabilityCheck: r } = {
    ...Tl,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: vl
    },
    inputStabilityCheck: {
      shouldRun: r === "always" || r === "once" && e,
      run: El
    }
  };
}, Rl = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Cl = typeof WeakRef < "u" ? WeakRef : Rl, Pl = 0, Ti = 1;
function zt() {
  return {
    s: Pl,
    v: void 0,
    o: null,
    p: null
  };
}
function gr(e, t = {}) {
  let n = zt();
  const { resultEqualityCheck: r } = t;
  let i, s = 0;
  function o() {
    var d;
    let a = n;
    const { length: c } = arguments;
    for (let f = 0, p = c; f < p; f++) {
      const h = arguments[f];
      if (typeof h == "function" || typeof h == "object" && h !== null) {
        let g = a.o;
        g === null && (a.o = g = /* @__PURE__ */ new WeakMap());
        const v = g.get(h);
        v === void 0 ? (a = zt(), g.set(h, a)) : a = v;
      } else {
        let g = a.p;
        g === null && (a.p = g = /* @__PURE__ */ new Map());
        const v = g.get(h);
        v === void 0 ? (a = zt(), g.set(h, a)) : a = v;
      }
    }
    const u = a;
    let l;
    if (a.s === Ti ? l = a.v : (l = e.apply(null, arguments), s++), u.s = Ti, r) {
      const f = ((d = i == null ? void 0 : i.deref) == null ? void 0 : d.call(i)) ?? i;
      f != null && r(f, l) && (l = f, s !== 0 && s--), i = typeof l == "object" && l !== null || typeof l == "function" ? new Cl(l) : l;
    }
    return u.v = l, l;
  }
  return o.clearCache = () => {
    n = zt(), o.resetResultsCount();
  }, o.resultsCount = () => s, o.resetResultsCount = () => {
    s = 0;
  }, o;
}
function Ys(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, r = (...i) => {
    let s = 0, o = 0, a, c = {}, u = i.pop();
    typeof u == "object" && (c = u, u = i.pop()), bl(
      u,
      `createSelector expects an output function after the inputs, but received: [${typeof u}]`
    );
    const l = {
      ...n,
      ...c
    }, {
      memoize: d,
      memoizeOptions: f = [],
      argsMemoize: p = gr,
      argsMemoizeOptions: h = [],
      devModeChecks: g = {}
    } = l, v = vi(f), b = vi(h), E = xl(i), T = d(function() {
      return s++, u.apply(
        null,
        arguments
      );
    }, ...v);
    let w = !0;
    const S = p(function() {
      o++;
      const A = Ei(
        E,
        arguments
      );
      if (a = T.apply(null, A), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: y, inputStabilityCheck: N } = wl(w, g);
        if (y.shouldRun && y.run(
          u,
          A,
          a
        ), N.shouldRun) {
          const _ = Ei(
            E,
            arguments
          );
          N.run(
            { inputSelectorResults: A, inputSelectorResultsCopy: _ },
            { memoize: d, memoizeOptions: v },
            arguments
          );
        }
        w && (w = !1);
      }
      return a;
    }, ...b);
    return Object.assign(S, {
      resultFunc: u,
      memoizedResultFunc: T,
      dependencies: E,
      dependencyRecomputations: () => o,
      resetDependencyRecomputations: () => {
        o = 0;
      },
      lastResult: () => a,
      recomputations: () => s,
      resetRecomputations: () => {
        s = 0;
      },
      memoize: d,
      argsMemoize: p
    });
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var Dl = /* @__PURE__ */ Ys(gr), Al = Object.assign(
  (e, t = Dl) => {
    _l(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), r = n.map(
      (s) => e[s]
    );
    return t(
      r,
      (...s) => s.reduce((o, a, c) => (o[n[c]] = a, o), {})
    );
  },
  { withTypes: () => Al }
), Il = (...e) => {
  const t = Ys(...e), n = Object.assign((...r) => {
    const i = t(...r), s = (o, ...a) => i(He(o) ? zs(o) : o, ...a);
    return Object.assign(s, i), s;
  }, {
    withTypes: () => n
  });
  return n;
};
Il(gr);
function mt(e, t) {
  function n(...r) {
    if (t) {
      let i = t(...r);
      if (!i)
        throw new Error(process.env.NODE_ENV === "production" ? Q(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: i.payload,
        ..."meta" in i && {
          meta: i.meta
        },
        ..."error" in i && {
          error: i.error
        }
      };
    }
    return {
      type: e,
      payload: r[0]
    };
  }
  return n.toString = () => `${e}`, n.type = e, n.match = (r) => al(r) && r.type === e, n;
}
function bi(e) {
  return je(e) ? Gs(e, () => {
  }) : e;
}
function _i(e, t, n) {
  if (e.has(t)) {
    let i = e.get(t);
    return n.update && (i = n.update(i, t, e), e.set(t, i)), i;
  }
  if (!n.insert)
    throw new Error(process.env.NODE_ENV === "production" ? Q(10) : "No insert provided for key not already in map");
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
process.env.NODE_ENV;
function Ks(e) {
  const t = {}, n = [];
  let r;
  const i = {
    addCase(s, o) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? Q(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (r)
          throw new Error(process.env.NODE_ENV === "production" ? Q(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const a = typeof s == "string" ? s : s.type;
      if (!a)
        throw new Error(process.env.NODE_ENV === "production" ? Q(28) : "`builder.addCase` cannot be called with an empty action type");
      if (a in t)
        throw new Error(process.env.NODE_ENV === "production" ? Q(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${a}'`);
      return t[a] = o, i;
    },
    addMatcher(s, o) {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error(process.env.NODE_ENV === "production" ? Q(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: s,
        reducer: o
      }), i;
    },
    addDefaultCase(s) {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error(process.env.NODE_ENV === "production" ? Q(31) : "`builder.addDefaultCase` can only be called once");
      return r = s, i;
    }
  };
  return e(i), [t, n, r];
}
function Ol(e) {
  return typeof e == "function";
}
function Ml(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? Q(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, r, i] = Ks(t), s;
  if (Ol(e))
    s = () => bi(e());
  else {
    const a = bi(e);
    s = () => a;
  }
  function o(a = s(), c) {
    let u = [n[c.type], ...r.filter(({
      matcher: l
    }) => l(c)).map(({
      reducer: l
    }) => l)];
    return u.filter((l) => !!l).length === 0 && (u = [i]), u.reduce((l, d) => {
      if (d)
        if (He(l)) {
          const p = d(l, c);
          return p === void 0 ? l : p;
        } else {
          if (je(l))
            return Gs(l, (f) => d(f, c));
          {
            const f = d(l, c);
            if (f === void 0) {
              if (l === null)
                return l;
              throw new Error(process.env.NODE_ENV === "production" ? Q(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return f;
          }
        }
      return l;
    }, a);
  }
  return o.getInitialState = s, o;
}
var Nl = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Vl = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Nl[Math.random() * 64 | 0];
  return t;
}, jl = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function kl(e, t) {
  return `${e}/${t}`;
}
function Ll({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[jl];
  return function(i) {
    const {
      name: s,
      reducerPath: o = s
    } = i;
    if (!s)
      throw new Error(process.env.NODE_ENV === "production" ? Q(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && i.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const a = (typeof i.reducers == "function" ? i.reducers(Bl()) : i.reducers) || {}, c = Object.keys(a), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, l = {
      addCase(T, w) {
        const S = typeof T == "string" ? T : T.type;
        if (!S)
          throw new Error(process.env.NODE_ENV === "production" ? Q(12) : "`context.addCase` cannot be called with an empty action type");
        if (S in u.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? Q(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + S);
        return u.sliceCaseReducersByType[S] = w, l;
      },
      addMatcher(T, w) {
        return u.sliceMatchers.push({
          matcher: T,
          reducer: w
        }), l;
      },
      exposeAction(T, w) {
        return u.actionCreators[T] = w, l;
      },
      exposeCaseReducer(T, w) {
        return u.sliceCaseReducersByName[T] = w, l;
      }
    };
    c.forEach((T) => {
      const w = a[T], S = {
        reducerName: T,
        type: kl(s, T),
        createNotation: typeof i.reducers == "function"
      };
      Ul(w) ? Wl(S, w, l, t) : Hl(S, w, l);
    });
    function d() {
      if (process.env.NODE_ENV !== "production" && typeof i.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? Q(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [T = {}, w = [], S = void 0] = typeof i.extraReducers == "function" ? Ks(i.extraReducers) : [i.extraReducers], D = {
        ...T,
        ...u.sliceCaseReducersByType
      };
      return Ml(i.initialState, (A) => {
        for (let y in D)
          A.addCase(y, D[y]);
        for (let y of u.sliceMatchers)
          A.addMatcher(y.matcher, y.reducer);
        for (let y of w)
          A.addMatcher(y.matcher, y.reducer);
        S && A.addDefaultCase(S);
      });
    }
    const f = (T) => T, p = /* @__PURE__ */ new Map();
    let h;
    function g(T, w) {
      return h || (h = d()), h(T, w);
    }
    function v() {
      return h || (h = d()), h.getInitialState();
    }
    function b(T, w = !1) {
      function S(A) {
        let y = A[T];
        if (typeof y > "u") {
          if (w)
            y = v();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? Q(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return y;
      }
      function D(A = f) {
        const y = _i(p, w, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return _i(y, A, {
          insert: () => {
            const N = {};
            for (const [_, V] of Object.entries(i.selectors ?? {}))
              N[_] = Fl(V, A, v, w);
            return N;
          }
        });
      }
      return {
        reducerPath: T,
        getSelectors: D,
        get selectors() {
          return D(S);
        },
        selectSlice: S
      };
    }
    const E = {
      name: s,
      reducer: g,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: v,
      ...b(o),
      injectInto(T, {
        reducerPath: w,
        ...S
      } = {}) {
        const D = w ?? o;
        return T.inject({
          reducerPath: D,
          reducer: g
        }, S), {
          ...E,
          ...b(D, !0)
        };
      }
    };
    return E;
  };
}
function Fl(e, t, n, r) {
  function i(s, ...o) {
    let a = t(s);
    if (typeof a > "u") {
      if (r)
        a = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? Q(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(a, ...o);
  }
  return i.unwrapped = e, i;
}
var $l = /* @__PURE__ */ Ll();
function Bl() {
  function e(t, n) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...n
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...n) {
          return t(...n);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, n) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: n
      };
    },
    asyncThunk: e
  };
}
function Hl({
  type: e,
  reducerName: t,
  createNotation: n
}, r, i) {
  let s, o;
  if ("reducer" in r) {
    if (n && !zl(r))
      throw new Error(process.env.NODE_ENV === "production" ? Q(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    s = r.reducer, o = r.prepare;
  } else
    s = r;
  i.addCase(e, s).exposeCaseReducer(t, s).exposeAction(t, o ? mt(e, o) : mt(e));
}
function Ul(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function zl(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Wl({
  type: e,
  reducerName: t
}, n, r, i) {
  if (!i)
    throw new Error(process.env.NODE_ENV === "production" ? Q(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: s,
    fulfilled: o,
    pending: a,
    rejected: c,
    settled: u,
    options: l
  } = n, d = i(e, s, l);
  r.exposeAction(t, d), o && r.addCase(d.fulfilled, o), a && r.addCase(d.pending, a), c && r.addCase(d.rejected, c), u && r.addMatcher(d.settled, u), r.exposeCaseReducer(t, {
    fulfilled: o || Wt,
    pending: a || Wt,
    rejected: c || Wt,
    settled: u || Wt
  });
}
function Wt() {
}
var Gl = (e, t) => {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? Q(32) : `${t} is not a function`);
}, yr = "listenerMiddleware", Yl = (e) => {
  let {
    type: t,
    actionCreator: n,
    matcher: r,
    predicate: i,
    effect: s
  } = e;
  if (t)
    i = mt(t).match;
  else if (n)
    t = n.type, i = n.match;
  else if (r)
    i = r;
  else if (!i)
    throw new Error(process.env.NODE_ENV === "production" ? Q(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return Gl(s, "options.listener"), {
    predicate: i,
    type: t,
    effect: s
  };
}, Kl = Object.assign((e) => {
  const {
    type: t,
    predicate: n,
    effect: r
  } = Yl(e);
  return {
    id: Vl(),
    effect: r,
    type: t,
    predicate: n,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? Q(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => Kl
}), Xl = Object.assign(mt(`${yr}/add`), {
  withTypes: () => Xl
});
mt(`${yr}/removeAll`);
var ql = Object.assign(mt(`${yr}/remove`), {
  withTypes: () => ql
});
function Q(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Zl = {
  users: {},
  isRightPanelOpen: !1,
  selectedConversationId: void 0,
  conversations: {},
  newConversation: void 0,
  shareId: void 0
}, tn = $l({
  name: "appState",
  initialState: Zl,
  reducers: {
    setShareId: (e, t) => {
      e.shareId = t.payload;
    },
    setCurrentUserId: (e, t) => {
      e.currentUserId = t.payload;
    },
    setUsers: (e, t) => {
      var n;
      return (n = t.payload) != null && n.length ? {
        ...e,
        users: t.payload.reduce((r, i) => (r[i.id] = i, r), {})
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
    updateNewConversation: (e, t) => {
      e.newConversation = { ...e.newConversation, ...t.payload };
    },
    resetNewConversation: (e) => {
      e.newConversation = void 0;
    },
    setConversations: (e, t) => {
      t.payload && (e.conversations = t.payload.reduce(
        (n, r) => (n[r.conversation_group_id] = r, n),
        {}
      ));
    }
  }
}), {
  setCurrentUserId: Rp,
  setShareId: Cp,
  updateSelectedConversationId: Pp,
  updateRightPanelState: vr,
  setUsers: Jl,
  setConversations: Er,
  resetNewConversation: Xs,
  updateNewConversation: qs,
  upsertConversation: Dp
} = tn.actions, Ql = "_dbtDocs_1k8cn_1", ec = "_conversationRightPanelCloseButton_1k8cn_14", tc = "_conversationRightPanel_1k8cn_14", nc = "_newConversationForm_1k8cn_41", rc = "_conversationGroup_1k8cn_66", ic = "_replyForm_1k8cn_79", At = {
  dbtDocs: Ql,
  conversationRightPanelCloseButton: ec,
  conversationRightPanel: tc,
  newConversationForm: nc,
  conversationGroup: rc,
  replyForm: ic
}, Vt = {
  get: async (e, t, n) => ({}),
  post: async (e, t, n) => ({})
}, sc = (e) => Vt.get(`dbt/dbt_docs_share/${e}`), oc = (e, t) => Vt.post(`dbt/dbt_docs_share/${e}/conversation_group`, t), ac = (e, t, n) => Vt.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`,
  n
), lc = (e) => Vt.get(`dbt/dbt_docs_share/${e}/conversations`), cc = (e) => Vt.get("/users/", { company: e }), uc = ({ user: e }) => {
  var t, n;
  return /* @__PURE__ */ j.jsx("div", { className: "rounded-circle d-inline-block p-2", children: (((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "") + (((n = e == null ? void 0 : e.last_name) == null ? void 0 : n[0]) || "") });
}, Zs = uc, dc = () => {
  const e = pe(
    (d) => d.newConversation
  ), t = Se(null), n = pe(
    (d) => d.currentUserId ? d.users[d.currentUserId] : null
  ), r = pe(
    (d) => d.shareId
  ), i = Ge(), [s, o] = he(!1), [a, c] = he(""), u = (d) => {
    const f = d.target;
    c(f.value), f.style.minHeight = f.scrollHeight + "px";
  }, l = async (d) => {
    if (d.stopPropagation(), d.preventDefault(), !(!e || !r)) {
      o(!0);
      try {
        console.log("saving conversation", e, a);
        const f = await oc(r, {
          xpath: e.xpath,
          message: a
        });
        if (!f.conversation_group_id) {
          console.error(
            "Unable to create conversation group",
            f
          );
          return;
        }
        console.log(
          "Successfully created conversation group",
          f
        );
      } catch (f) {
        console.error("error while saving conversation", e, f);
      }
      i(Er([])), o(!1), i(vr(!0)), i(Xs()), c("");
    }
  };
  return /* @__PURE__ */ j.jsx(fr, { className: At.newConversationForm, children: /* @__PURE__ */ j.jsx(hr, { children: /* @__PURE__ */ j.jsxs("form", { onSubmit: l, children: [
    /* @__PURE__ */ j.jsxs("div", { children: [
      /* @__PURE__ */ j.jsx(Zs, { user: n }),
      /* @__PURE__ */ j.jsx(
        ks,
        {
          ref: t,
          placeholder: "Type comment",
          value: a,
          onChange: u,
          type: "textarea",
          rows: 1
        }
      )
    ] }),
    /* @__PURE__ */ j.jsx(yt, { disabled: s, children: "Submit" })
  ] }) }) });
}, fc = dc;
var Js = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(rl, function() {
    var n = 1e3, r = 6e4, i = 36e5, s = "millisecond", o = "second", a = "minute", c = "hour", u = "day", l = "week", d = "month", f = "quarter", p = "year", h = "date", g = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, E = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(I) {
      var R = ["th", "st", "nd", "rd"], x = I % 100;
      return "[" + I + (R[(x - 20) % 10] || R[x] || R[0]) + "]";
    } }, T = function(I, R, x) {
      var O = String(I);
      return !O || O.length >= R ? I : "" + Array(R + 1 - O.length).join(x) + I;
    }, w = { s: T, z: function(I) {
      var R = -I.utcOffset(), x = Math.abs(R), O = Math.floor(x / 60), P = x % 60;
      return (R <= 0 ? "+" : "-") + T(O, 2, "0") + ":" + T(P, 2, "0");
    }, m: function I(R, x) {
      if (R.date() < x.date())
        return -I(x, R);
      var O = 12 * (x.year() - R.year()) + (x.month() - R.month()), P = R.clone().add(O, d), L = x - P < 0, k = R.clone().add(O + (L ? -1 : 1), d);
      return +(-(O + (x - P) / (L ? P - k : k - P)) || 0);
    }, a: function(I) {
      return I < 0 ? Math.ceil(I) || 0 : Math.floor(I);
    }, p: function(I) {
      return { M: d, y: p, w: l, d: u, D: h, h: c, m: a, s: o, ms: s, Q: f }[I] || String(I || "").toLowerCase().replace(/s$/, "");
    }, u: function(I) {
      return I === void 0;
    } }, S = "en", D = {};
    D[S] = E;
    var A = "$isDayjsObject", y = function(I) {
      return I instanceof H || !(!I || !I[A]);
    }, N = function I(R, x, O) {
      var P;
      if (!R)
        return S;
      if (typeof R == "string") {
        var L = R.toLowerCase();
        D[L] && (P = L), x && (D[L] = x, P = L);
        var k = R.split("-");
        if (!P && k.length > 1)
          return I(k[0]);
      } else {
        var B = R.name;
        D[B] = R, P = B;
      }
      return !O && P && (S = P), P || !O && S;
    }, _ = function(I, R) {
      if (y(I))
        return I.clone();
      var x = typeof R == "object" ? R : {};
      return x.date = I, x.args = arguments, new H(x);
    }, V = w;
    V.l = N, V.i = y, V.w = function(I, R) {
      return _(I, { locale: R.$L, utc: R.$u, x: R.$x, $offset: R.$offset });
    };
    var H = function() {
      function I(x) {
        this.$L = N(x.locale, null, !0), this.parse(x), this.$x = this.$x || x.x || {}, this[A] = !0;
      }
      var R = I.prototype;
      return R.parse = function(x) {
        this.$d = function(O) {
          var P = O.date, L = O.utc;
          if (P === null)
            return /* @__PURE__ */ new Date(NaN);
          if (V.u(P))
            return /* @__PURE__ */ new Date();
          if (P instanceof Date)
            return new Date(P);
          if (typeof P == "string" && !/Z$/i.test(P)) {
            var k = P.match(v);
            if (k) {
              var B = k[2] - 1 || 0, K = (k[7] || "0").substring(0, 3);
              return L ? new Date(Date.UTC(k[1], B, k[3] || 1, k[4] || 0, k[5] || 0, k[6] || 0, K)) : new Date(k[1], B, k[3] || 1, k[4] || 0, k[5] || 0, k[6] || 0, K);
            }
          }
          return new Date(P);
        }(x), this.init();
      }, R.init = function() {
        var x = this.$d;
        this.$y = x.getFullYear(), this.$M = x.getMonth(), this.$D = x.getDate(), this.$W = x.getDay(), this.$H = x.getHours(), this.$m = x.getMinutes(), this.$s = x.getSeconds(), this.$ms = x.getMilliseconds();
      }, R.$utils = function() {
        return V;
      }, R.isValid = function() {
        return this.$d.toString() !== g;
      }, R.isSame = function(x, O) {
        var P = _(x);
        return this.startOf(O) <= P && P <= this.endOf(O);
      }, R.isAfter = function(x, O) {
        return _(x) < this.startOf(O);
      }, R.isBefore = function(x, O) {
        return this.endOf(O) < _(x);
      }, R.$g = function(x, O, P) {
        return V.u(x) ? this[O] : this.set(P, x);
      }, R.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, R.valueOf = function() {
        return this.$d.getTime();
      }, R.startOf = function(x, O) {
        var P = this, L = !!V.u(O) || O, k = V.p(x), B = function(_e, te) {
          var Ce = V.w(P.$u ? Date.UTC(P.$y, te, _e) : new Date(P.$y, te, _e), P);
          return L ? Ce : Ce.endOf(u);
        }, K = function(_e, te) {
          return V.w(P.toDate()[_e].apply(P.toDate("s"), (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(te)), P);
        }, q = this.$W, re = this.$M, de = this.$D, we = "set" + (this.$u ? "UTC" : "");
        switch (k) {
          case p:
            return L ? B(1, 0) : B(31, 11);
          case d:
            return L ? B(1, re) : B(0, re + 1);
          case l:
            var be = this.$locale().weekStart || 0, Re = (q < be ? q + 7 : q) - be;
            return B(L ? de - Re : de + (6 - Re), re);
          case u:
          case h:
            return K(we + "Hours", 0);
          case c:
            return K(we + "Minutes", 1);
          case a:
            return K(we + "Seconds", 2);
          case o:
            return K(we + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, R.endOf = function(x) {
        return this.startOf(x, !1);
      }, R.$set = function(x, O) {
        var P, L = V.p(x), k = "set" + (this.$u ? "UTC" : ""), B = (P = {}, P[u] = k + "Date", P[h] = k + "Date", P[d] = k + "Month", P[p] = k + "FullYear", P[c] = k + "Hours", P[a] = k + "Minutes", P[o] = k + "Seconds", P[s] = k + "Milliseconds", P)[L], K = L === u ? this.$D + (O - this.$W) : O;
        if (L === d || L === p) {
          var q = this.clone().set(h, 1);
          q.$d[B](K), q.init(), this.$d = q.set(h, Math.min(this.$D, q.daysInMonth())).$d;
        } else
          B && this.$d[B](K);
        return this.init(), this;
      }, R.set = function(x, O) {
        return this.clone().$set(x, O);
      }, R.get = function(x) {
        return this[V.p(x)]();
      }, R.add = function(x, O) {
        var P, L = this;
        x = Number(x);
        var k = V.p(O), B = function(re) {
          var de = _(L);
          return V.w(de.date(de.date() + Math.round(re * x)), L);
        };
        if (k === d)
          return this.set(d, this.$M + x);
        if (k === p)
          return this.set(p, this.$y + x);
        if (k === u)
          return B(1);
        if (k === l)
          return B(7);
        var K = (P = {}, P[a] = r, P[c] = i, P[o] = n, P)[k] || 1, q = this.$d.getTime() + x * K;
        return V.w(q, this);
      }, R.subtract = function(x, O) {
        return this.add(-1 * x, O);
      }, R.format = function(x) {
        var O = this, P = this.$locale();
        if (!this.isValid())
          return P.invalidDate || g;
        var L = x || "YYYY-MM-DDTHH:mm:ssZ", k = V.z(this), B = this.$H, K = this.$m, q = this.$M, re = P.weekdays, de = P.months, we = P.meridiem, be = function(te, Ce, Le, at) {
          return te && (te[Ce] || te(O, L)) || Le[Ce].slice(0, at);
        }, Re = function(te) {
          return V.s(B % 12 || 12, te, "0");
        }, _e = we || function(te, Ce, Le) {
          var at = te < 12 ? "AM" : "PM";
          return Le ? at.toLowerCase() : at;
        };
        return L.replace(b, function(te, Ce) {
          return Ce || function(Le) {
            switch (Le) {
              case "YY":
                return String(O.$y).slice(-2);
              case "YYYY":
                return V.s(O.$y, 4, "0");
              case "M":
                return q + 1;
              case "MM":
                return V.s(q + 1, 2, "0");
              case "MMM":
                return be(P.monthsShort, q, de, 3);
              case "MMMM":
                return be(de, q);
              case "D":
                return O.$D;
              case "DD":
                return V.s(O.$D, 2, "0");
              case "d":
                return String(O.$W);
              case "dd":
                return be(P.weekdaysMin, O.$W, re, 2);
              case "ddd":
                return be(P.weekdaysShort, O.$W, re, 3);
              case "dddd":
                return re[O.$W];
              case "H":
                return String(B);
              case "HH":
                return V.s(B, 2, "0");
              case "h":
                return Re(1);
              case "hh":
                return Re(2);
              case "a":
                return _e(B, K, !0);
              case "A":
                return _e(B, K, !1);
              case "m":
                return String(K);
              case "mm":
                return V.s(K, 2, "0");
              case "s":
                return String(O.$s);
              case "ss":
                return V.s(O.$s, 2, "0");
              case "SSS":
                return V.s(O.$ms, 3, "0");
              case "Z":
                return k;
            }
            return null;
          }(te) || k.replace(":", "");
        });
      }, R.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, R.diff = function(x, O, P) {
        var L, k = this, B = V.p(O), K = _(x), q = (K.utcOffset() - this.utcOffset()) * r, re = this - K, de = function() {
          return V.m(k, K);
        };
        switch (B) {
          case p:
            L = de() / 12;
            break;
          case d:
            L = de();
            break;
          case f:
            L = de() / 3;
            break;
          case l:
            L = (re - q) / 6048e5;
            break;
          case u:
            L = (re - q) / 864e5;
            break;
          case c:
            L = re / i;
            break;
          case a:
            L = re / r;
            break;
          case o:
            L = re / n;
            break;
          default:
            L = re;
        }
        return P ? L : V.a(L);
      }, R.daysInMonth = function() {
        return this.endOf(d).$D;
      }, R.$locale = function() {
        return D[this.$L];
      }, R.locale = function(x, O) {
        if (!x)
          return this.$L;
        var P = this.clone(), L = N(x, O, !0);
        return L && (P.$L = L), P;
      }, R.clone = function() {
        return V.w(this.$d, this);
      }, R.toDate = function() {
        return new Date(this.valueOf());
      }, R.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, R.toISOString = function() {
        return this.$d.toISOString();
      }, R.toString = function() {
        return this.$d.toUTCString();
      }, I;
    }(), z = H.prototype;
    return _.prototype = z, [["$ms", s], ["$s", o], ["$m", a], ["$H", c], ["$W", u], ["$M", d], ["$y", p], ["$D", h]].forEach(function(I) {
      z[I[1]] = function(R) {
        return this.$g(R, I[0], I[1]);
      };
    }), _.extend = function(I, R) {
      return I.$i || (I(R, H, _), I.$i = !0), _;
    }, _.locale = N, _.isDayjs = y, _.unix = function(I) {
      return _(1e3 * I);
    }, _.en = D[S], _.Ls = D, _.p = {}, _;
  });
})(Js);
var hc = Js.exports;
const pc = /* @__PURE__ */ Ls(hc), mc = ({ user: e, timestamp: t }) => /* @__PURE__ */ j.jsxs(tl, { className: "d-flex align-items-center justify-content-between", children: [
  /* @__PURE__ */ j.jsxs("div", { className: "d-flex align-items-center", children: [
    /* @__PURE__ */ j.jsx(Zs, { user: e }),
    /* @__PURE__ */ j.jsxs("h4", { children: [
      e == null ? void 0 : e.first_name,
      " ",
      e == null ? void 0 : e.last_name
    ] })
  ] }),
  /* @__PURE__ */ j.jsx("span", { children: pc(t).format("HH:mm, DD MMM YY") })
] }), Qs = mc, gc = ({ conversation: e }) => {
  const t = pe((n) => {
    var r;
    return (r = n.users) == null ? void 0 : r[e == null ? void 0 : e.user_id];
  });
  return /* @__PURE__ */ j.jsxs(fr, { children: [
    /* @__PURE__ */ j.jsx(Qs, { user: t, timestamp: e.timestamp }),
    /* @__PURE__ */ j.jsx(hr, { children: /* @__PURE__ */ j.jsx("p", { children: e.message }) })
  ] });
}, yc = gc, vc = ({ conversationGroupId: e }) => {
  const t = pe(
    (u) => u.shareId
  ), [n, r] = he(""), [i, s] = he(!1), o = Ge(), a = (u) => r(u.target.value), c = async (u) => {
    if (u.stopPropagation(), u.preventDefault(), !(!t || !e)) {
      s(!0), console.log("saving reply", t, e, {
        message: n
      });
      try {
        await ac(t, e, {
          message: n
        });
      } catch (l) {
        console.error("error while saving reply", l);
      }
      o(Er([])), s(!1);
    }
  };
  return /* @__PURE__ */ j.jsx("div", { className: At.replyForm, children: /* @__PURE__ */ j.jsxs("form", { onSubmit: c, className: "", children: [
    /* @__PURE__ */ j.jsx(
      ks,
      {
        placeholder: "Enter your reply",
        onChange: a,
        value: n,
        rows: 1,
        type: "textarea"
      }
    ),
    /* @__PURE__ */ j.jsx(
      yt,
      {
        className: "mt-2 float-right",
        disabled: i,
        type: "submit",
        style: { zIndex: 4, right: 0 },
        children: "Send"
      }
    )
  ] }) });
}, Ec = vc, Tc = ({ conversationGroup: e }) => {
  var o;
  const t = pe((a) => {
    var c;
    return (c = a.users) == null ? void 0 : c[e == null ? void 0 : e.owner];
  }), [n, r] = he(!1);
  if (!((o = e == null ? void 0 : e.conversations) != null && o.length) || (e == null ? void 0 : e.status) !== "Pending")
    return null;
  const [i, ...s] = e.conversations;
  return /* @__PURE__ */ j.jsxs(fr, { className: At.conversationGroup, children: [
    /* @__PURE__ */ j.jsx(Qs, { user: t, timestamp: i.timestamp }),
    /* @__PURE__ */ j.jsxs(hr, { children: [
      /* @__PURE__ */ j.jsx("p", { children: i.message }),
      s.length ? /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
        /* @__PURE__ */ j.jsx(
          yt,
          {
            onClick: () => r((a) => !a),
            color: "link",
            children: s.length > 1 ? `${s.length} replies` : `${s.length} reply`
          }
        ),
        n ? /* @__PURE__ */ j.jsx(j.Fragment, { children: s.map((a) => /* @__PURE__ */ j.jsx(yc, { conversation: a }, a.conversation_id)) }) : null
      ] }) : null,
      /* @__PURE__ */ j.jsx(
        Ec,
        {
          conversationGroupId: e.conversation_group_id
        }
      )
    ] })
  ] });
}, bc = Tc, _c = () => {
  const e = pe(
    (s) => s.shareId
  ), t = Ge(), n = pe(
    (s) => Object.keys(s.conversations || {})
  ), [r, i] = he(!1);
  return ke(() => {
    r || !e || Object.keys(n).length || (i(!0), lc(e).then((s) => {
      console.log("useConversations", s), t(Er(s == null ? void 0 : s.dbt_docs_share_conversations));
    }).catch(
      (s) => console.error("error while fetching conversations list", s)
    ).finally(() => {
      i(!1);
    }));
  }, [t, r, n, e]), { isLoading: r };
}, Sc = () => {
  const { isLoading: e } = _c(), t = pe(
    (n) => n.conversations
  );
  return e ? /* @__PURE__ */ j.jsx("div", { children: "Loading..." }) : !t || !Object.keys(t).length ? /* @__PURE__ */ j.jsx("div", { children: "No conversations yet!" }) : /* @__PURE__ */ j.jsx("div", { children: Object.values(t).map((n) => /* @__PURE__ */ j.jsx(
    bc,
    {
      conversationGroup: n
    },
    n.conversation_group_id
  )) });
}, xc = Sc, wc = () => {
  const e = pe((s) => s.isRightPanelOpen), t = pe((s) => s.newConversation), n = Ge(), r = () => {
    n(vr(!1)), n(Xs());
  };
  return !!t || e ? /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
    /* @__PURE__ */ j.jsx(
      nl,
      {
        onClick: r,
        className: At.conversationRightPanelCloseButton
      }
    ),
    /* @__PURE__ */ j.jsxs("div", { className: At.conversationRightPanel, children: [
      t ? /* @__PURE__ */ j.jsx(fc, {}) : null,
      /* @__PURE__ */ j.jsx(xc, {})
    ] })
  ] }) : null;
}, Rc = wc, Cc = () => {
  const e = Ge(), t = pe(
    (i) => Object.keys(i.users || {})
  ), [n, r] = he(
    1
    /* UNINITIALIZED */
  );
  return ke(() => {
    n !== 1 || Object.keys(t).length || (r(
      0
      /* LOADING */
    ), cc().then((i) => {
      console.log("useConversationUsers", i), e(Jl(i));
    }).catch((i) => console.error("error while fetching users list", i)).finally(() => {
      r(
        2
        /* INITIALIZED */
      );
    }));
  }, [e, n, t]), {
    isLoading: n === 0
    /* LOADING */
  };
}, Pc = () => (Cc(), /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsx(Rc, {}) })), Dc = Pc, mn = it({
  state: tn.getInitialState(),
  dispatch: () => null,
  getValue: () => null
}), Ac = ({
  children: e,
  shareId: t,
  userId: n
}) => {
  const [r, i] = Ya(tn.reducer, {
    ...tn.getInitialState(),
    shareId: t,
    currentUserId: n
  }), s = xe(
    (a) => a(r),
    [r]
  ), o = nt(
    () => ({
      state: r,
      dispatch: i,
      getValue: s
    }),
    [r, i, s]
  );
  return /* @__PURE__ */ j.jsxs(mn.Provider, { value: o, children: [
    /* @__PURE__ */ j.jsx(Dc, {}),
    e
  ] });
}, Ic = Ac, Oc = () => ne(mn), pe = (e) => {
  const { getValue: t } = ne(mn);
  return t(e);
}, Ge = () => {
  const { dispatch: e } = ne(mn);
  return e;
}, Tr = it({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
}), gn = it({}), yn = it(null), br = typeof document < "u", _r = br ? Ka : ke, eo = it({ strict: !1 }), Sr = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Mc = "framerAppearId", to = "data-" + Sr(Mc), Nc = {
  skipAnimations: !1,
  useManualTiming: !1
};
class Si {
  constructor() {
    this.order = [], this.scheduled = /* @__PURE__ */ new Set();
  }
  add(t) {
    if (!this.scheduled.has(t))
      return this.scheduled.add(t), this.order.push(t), !0;
  }
  remove(t) {
    const n = this.order.indexOf(t);
    n !== -1 && (this.order.splice(n, 1), this.scheduled.delete(t));
  }
  clear() {
    this.order.length = 0, this.scheduled.clear();
  }
}
function Vc(e) {
  let t = new Si(), n = new Si(), r = 0, i = !1, s = !1;
  const o = /* @__PURE__ */ new WeakSet(), a = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, u = !1, l = !1) => {
      const d = l && i, f = d ? t : n;
      return u && o.add(c), f.add(c) && d && i && (r = t.order.length), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      n.remove(c), o.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (i) {
        s = !0;
        return;
      }
      if (i = !0, [t, n] = [n, t], n.clear(), r = t.order.length, r)
        for (let u = 0; u < r; u++) {
          const l = t.order[u];
          o.has(l) && (a.schedule(l), e()), l(c);
        }
      i = !1, s && (s = !1, a.process(c));
    }
  };
  return a;
}
const Gt = [
  "read",
  "resolveKeyframes",
  "update",
  "preRender",
  "render",
  "postRender"
  // Compute
], jc = 40;
function no(e, t) {
  let n = !1, r = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, s = Gt.reduce((d, f) => (d[f] = Vc(() => n = !0), d), {}), o = (d) => {
    s[d].process(i);
  }, a = () => {
    const d = performance.now();
    n = !1, i.delta = r ? 1e3 / 60 : Math.max(Math.min(d - i.timestamp, jc), 1), i.timestamp = d, i.isProcessing = !0, Gt.forEach(o), i.isProcessing = !1, n && t && (r = !1, e(a));
  }, c = () => {
    n = !0, r = !0, i.isProcessing || e(a);
  };
  return { schedule: Gt.reduce((d, f) => {
    const p = s[f];
    return d[f] = (h, g = !1, v = !1) => (n || c(), p.schedule(h, g, v)), d;
  }, {}), cancel: (d) => Gt.forEach((f) => s[f].cancel(d)), state: i, steps: s };
}
const { schedule: xr, cancel: Ap } = no(queueMicrotask, !1);
function kc(e, t, n, r) {
  const { visualElement: i } = ne(gn), s = ne(eo), o = ne(yn), a = ne(Tr).reducedMotion, c = Se();
  r = r || s.renderer, !c.current && r && (c.current = r(e, {
    visualState: t,
    parent: i,
    props: n,
    presenceContext: o,
    blockInitialAnimation: o ? o.initial === !1 : !1,
    reducedMotionConfig: a
  }));
  const u = c.current;
  Vs(() => {
    u && u.update(n, o);
  });
  const l = Se(!!(n[to] && !window.HandoffComplete));
  return _r(() => {
    u && (xr.postRender(u.render), l.current && u.animationState && u.animationState.animateChanges());
  }), ke(() => {
    u && (u.updateFeatures(), !l.current && u.animationState && u.animationState.animateChanges(), l.current && (l.current = !1, window.HandoffComplete = !0));
  }), u;
}
function ut(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function Lc(e, t, n) {
  return xe(
    (r) => {
      r && e.mount && e.mount(r), t && (r ? t.mount(r) : t.unmount()), n && (typeof n == "function" ? n(r) : ut(n) && (n.current = r));
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [t]
  );
}
function It(e) {
  return typeof e == "string" || Array.isArray(e);
}
function vn(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const wr = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Rr = ["initial", ...wr];
function En(e) {
  return vn(e.animate) || Rr.some((t) => It(e[t]));
}
function ro(e) {
  return !!(En(e) || e.variants);
}
function Fc(e, t) {
  if (En(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || It(n) ? n : void 0,
      animate: It(r) ? r : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function $c(e) {
  const { initial: t, animate: n } = Fc(e, ne(gn));
  return nt(() => ({ initial: t, animate: n }), [xi(t), xi(n)]);
}
function xi(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const wi = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, Ot = {};
for (const e in wi)
  Ot[e] = {
    isEnabled: (t) => wi[e].some((n) => !!t[n])
  };
function Bc(e) {
  for (const t in e)
    Ot[t] = {
      ...Ot[t],
      ...e[t]
    };
}
const Cr = it({}), io = it({}), Hc = Symbol.for("motionComponentSymbol");
function Uc({ preloadedFeatures: e, createVisualElement: t, useRender: n, useVisualState: r, Component: i }) {
  e && Bc(e);
  function s(a, c) {
    let u;
    const l = {
      ...ne(Tr),
      ...a,
      layoutId: zc(a)
    }, { isStatic: d } = l, f = $c(a), p = r(a, d);
    if (!d && br) {
      f.visualElement = kc(i, p, l, t);
      const h = ne(io), g = ne(eo).strict;
      f.visualElement && (u = f.visualElement.loadFeatures(
        // Note: Pass the full new combined props to correctly re-render dynamic feature components.
        l,
        g,
        e,
        h
      ));
    }
    return ue.createElement(
      gn.Provider,
      { value: f },
      u && f.visualElement ? ue.createElement(u, { visualElement: f.visualElement, ...l }) : null,
      n(i, a, Lc(p, f.visualElement, c), p, d, f.visualElement)
    );
  }
  const o = js(s);
  return o[Hc] = i, o;
}
function zc({ layoutId: e }) {
  const t = ne(Cr).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function Wc(e) {
  function t(r, i = {}) {
    return Uc(e(r, i));
  }
  if (typeof Proxy > "u")
    return t;
  const n = /* @__PURE__ */ new Map();
  return new Proxy(t, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, i) => (n.has(i) || n.set(i, t(i)), n.get(i))
  });
}
const Gc = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Pr(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(Gc.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
const nn = {};
function Yc(e) {
  Object.assign(nn, e);
}
const jt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], st = new Set(jt);
function so(e, { layout: t, layoutId: n }) {
  return st.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!nn[e] || e === "opacity");
}
const le = (e) => !!(e && e.getVelocity), Kc = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Xc = jt.length;
function qc(e, { enableHardwareAcceleration: t = !0, allowTransformNone: n = !0 }, r, i) {
  let s = "";
  for (let o = 0; o < Xc; o++) {
    const a = jt[o];
    if (e[a] !== void 0) {
      const c = Kc[a] || a;
      s += `${c}(${e[a]}) `;
    }
  }
  return t && !e.z && (s += "translateZ(0)"), s = s.trim(), i ? s = i(e, r ? "" : s) : n && r && (s = "none"), s;
}
const oo = (e) => (t) => typeof t == "string" && t.startsWith(e), ao = oo("--"), Zc = oo("var(--"), Dr = (e) => Zc(e) ? Jc.test(e.split("/*")[0].trim()) : !1, Jc = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Qc = (e, t) => t && typeof e == "number" ? t.transform(e) : e, Ue = (e, t, n) => n > t ? t : n < e ? e : n, vt = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, xt = {
  ...vt,
  transform: (e) => Ue(0, 1, e)
}, Yt = {
  ...vt,
  default: 1
}, wt = (e) => Math.round(e * 1e5) / 1e5, Ar = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu, eu = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu, tu = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function kt(e) {
  return typeof e == "string";
}
const Lt = (e) => ({
  test: (t) => kt(t) && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), Fe = Lt("deg"), Pe = Lt("%"), F = Lt("px"), nu = Lt("vh"), ru = Lt("vw"), Ri = {
  ...Pe,
  parse: (e) => Pe.parse(e) / 100,
  transform: (e) => Pe.transform(e * 100)
}, Ci = {
  ...vt,
  transform: Math.round
}, lo = {
  // Border props
  borderWidth: F,
  borderTopWidth: F,
  borderRightWidth: F,
  borderBottomWidth: F,
  borderLeftWidth: F,
  borderRadius: F,
  radius: F,
  borderTopLeftRadius: F,
  borderTopRightRadius: F,
  borderBottomRightRadius: F,
  borderBottomLeftRadius: F,
  // Positioning props
  width: F,
  maxWidth: F,
  height: F,
  maxHeight: F,
  size: F,
  top: F,
  right: F,
  bottom: F,
  left: F,
  // Spacing props
  padding: F,
  paddingTop: F,
  paddingRight: F,
  paddingBottom: F,
  paddingLeft: F,
  margin: F,
  marginTop: F,
  marginRight: F,
  marginBottom: F,
  marginLeft: F,
  // Transform props
  rotate: Fe,
  rotateX: Fe,
  rotateY: Fe,
  rotateZ: Fe,
  scale: Yt,
  scaleX: Yt,
  scaleY: Yt,
  scaleZ: Yt,
  skew: Fe,
  skewX: Fe,
  skewY: Fe,
  distance: F,
  translateX: F,
  translateY: F,
  translateZ: F,
  x: F,
  y: F,
  z: F,
  perspective: F,
  transformPerspective: F,
  opacity: xt,
  originX: Ri,
  originY: Ri,
  originZ: F,
  // Misc
  zIndex: Ci,
  backgroundPositionX: F,
  backgroundPositionY: F,
  // SVG
  fillOpacity: xt,
  strokeOpacity: xt,
  numOctaves: Ci
};
function Ir(e, t, n, r) {
  const { style: i, vars: s, transform: o, transformOrigin: a } = e;
  let c = !1, u = !1, l = !0;
  for (const d in t) {
    const f = t[d];
    if (ao(d)) {
      s[d] = f;
      continue;
    }
    const p = lo[d], h = Qc(f, p);
    if (st.has(d)) {
      if (c = !0, o[d] = h, !l)
        continue;
      f !== (p.default || 0) && (l = !1);
    } else
      d.startsWith("origin") ? (u = !0, a[d] = h) : i[d] = h;
  }
  if (t.transform || (c || r ? i.transform = qc(e.transform, n, l, r) : i.transform && (i.transform = "none")), u) {
    const { originX: d = "50%", originY: f = "50%", originZ: p = 0 } = a;
    i.transformOrigin = `${d} ${f} ${p}`;
  }
}
const Or = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function co(e, t, n) {
  for (const r in t)
    !le(t[r]) && !so(r, n) && (e[r] = t[r]);
}
function iu({ transformTemplate: e }, t, n) {
  return nt(() => {
    const r = Or();
    return Ir(r, t, { enableHardwareAcceleration: !n }, e), Object.assign({}, r.vars, r.style);
  }, [t]);
}
function su(e, t, n) {
  const r = e.style || {}, i = {};
  return co(i, r, e), Object.assign(i, iu(e, t, n)), i;
}
function ou(e, t, n) {
  const r = {}, i = su(e, t, n);
  return e.drag && e.dragListener !== !1 && (r.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (r.tabIndex = 0), r.style = i, r;
}
const au = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function rn(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || au.has(e);
}
let uo = (e) => !rn(e);
function lu(e) {
  e && (uo = (t) => t.startsWith("on") ? !rn(t) : e(t));
}
try {
  lu(require("@emotion/is-prop-valid").default);
} catch {
}
function cu(e, t, n) {
  const r = {};
  for (const i in e)
    i === "values" && typeof e.values == "object" || (uo(i) || n === !0 && rn(i) || !t && !rn(i) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && i.startsWith("onDrag")) && (r[i] = e[i]);
  return r;
}
function Pi(e, t, n) {
  return typeof e == "string" ? e : F.transform(t + n * e);
}
function uu(e, t, n) {
  const r = Pi(t, e.x, e.width), i = Pi(n, e.y, e.height);
  return `${r} ${i}`;
}
const du = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, fu = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function hu(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const s = i ? du : fu;
  e[s.offset] = F.transform(-r);
  const o = F.transform(t), a = F.transform(n);
  e[s.array] = `${o} ${a}`;
}
function Mr(e, {
  attrX: t,
  attrY: n,
  attrScale: r,
  originX: i,
  originY: s,
  pathLength: o,
  pathSpacing: a = 1,
  pathOffset: c = 0,
  // This is object creation, which we try to avoid per-frame.
  ...u
}, l, d, f) {
  if (Ir(e, u, l, f), d) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: p, style: h, dimensions: g } = e;
  p.transform && (g && (h.transform = p.transform), delete p.transform), g && (i !== void 0 || s !== void 0 || h.transform) && (h.transformOrigin = uu(g, i !== void 0 ? i : 0.5, s !== void 0 ? s : 0.5)), t !== void 0 && (p.x = t), n !== void 0 && (p.y = n), r !== void 0 && (p.scale = r), o !== void 0 && hu(p, o, a, c, !1);
}
const fo = () => ({
  ...Or(),
  attrs: {}
}), Nr = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function pu(e, t, n, r) {
  const i = nt(() => {
    const s = fo();
    return Mr(s, t, { enableHardwareAcceleration: !1 }, Nr(r), e.transformTemplate), {
      ...s.attrs,
      style: { ...s.style }
    };
  }, [t]);
  if (e.style) {
    const s = {};
    co(s, e.style, e), i.style = { ...s, ...i.style };
  }
  return i;
}
function mu(e = !1) {
  return (n, r, i, { latestValues: s }, o) => {
    const c = (Pr(n) ? pu : ou)(r, s, o, n), u = cu(r, typeof n == "string", e), l = n !== Xa ? { ...u, ...c, ref: i } : {}, { children: d } = r, f = nt(() => le(d) ? d.get() : d, [d]);
    return qa(n, {
      ...l,
      children: f
    });
  };
}
function ho(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const s in n)
    e.style.setProperty(s, n[s]);
}
const po = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function mo(e, t, n, r) {
  ho(e, t, void 0, r);
  for (const i in t.attrs)
    e.setAttribute(po.has(i) ? i : Sr(i), t.attrs[i]);
}
function Vr(e, t) {
  const { style: n } = e, r = {};
  for (const i in n)
    (le(n[i]) || t.style && le(t.style[i]) || so(i, e)) && (r[i] = n[i]);
  return r;
}
function go(e, t) {
  const n = Vr(e, t);
  for (const r in e)
    if (le(e[r]) || le(t[r])) {
      const i = jt.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      n[i] = e[r];
    }
  return n;
}
function jr(e, t, n, r = {}, i = {}) {
  return typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)), typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)), t;
}
function yo(e) {
  const t = Se(null);
  return t.current === null && (t.current = e()), t.current;
}
const Zn = (e) => Array.isArray(e), gu = (e) => !!(e && typeof e == "object" && e.mix && e.toValue), yu = (e) => Zn(e) ? e[e.length - 1] || 0 : e;
function Xt(e) {
  const t = le(e) ? e.get() : e;
  return gu(t) ? t.toValue() : t;
}
function vu({ scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n }, r, i, s) {
  const o = {
    latestValues: Eu(r, i, s, e),
    renderState: t()
  };
  return n && (o.mount = (a) => n(r, a, o)), o;
}
const vo = (e) => (t, n) => {
  const r = ne(gn), i = ne(yn), s = () => vu(e, t, r, i);
  return n ? s() : yo(s);
};
function Eu(e, t, n, r) {
  const i = {}, s = r(e, {});
  for (const f in s)
    i[f] = Xt(s[f]);
  let { initial: o, animate: a } = e;
  const c = En(e), u = ro(e);
  t && u && !c && e.inherit !== !1 && (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let l = n ? n.initial === !1 : !1;
  l = l || o === !1;
  const d = l ? a : o;
  return d && typeof d != "boolean" && !vn(d) && (Array.isArray(d) ? d : [d]).forEach((p) => {
    const h = jr(e, p);
    if (!h)
      return;
    const { transitionEnd: g, transition: v, ...b } = h;
    for (const E in b) {
      let T = b[E];
      if (Array.isArray(T)) {
        const w = l ? T.length - 1 : 0;
        T = T[w];
      }
      T !== null && (i[E] = T);
    }
    for (const E in g)
      i[E] = g[E];
  }), i;
}
const oe = (e) => e, { schedule: ie, cancel: ze, state: se, steps: An } = no(typeof requestAnimationFrame < "u" ? requestAnimationFrame : oe, !0), Tu = {
  useVisualState: vo({
    scrapeMotionValuesFromProps: go,
    createRenderState: fo,
    onMount: (e, t, { renderState: n, latestValues: r }) => {
      ie.read(() => {
        try {
          n.dimensions = typeof t.getBBox == "function" ? t.getBBox() : t.getBoundingClientRect();
        } catch {
          n.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
      }), ie.render(() => {
        Mr(n, r, { enableHardwareAcceleration: !1 }, Nr(t.tagName), e.transformTemplate), mo(t, n);
      });
    }
  })
}, bu = {
  useVisualState: vo({
    scrapeMotionValuesFromProps: Vr,
    createRenderState: Or
  })
};
function _u(e, { forwardMotionProps: t = !1 }, n, r) {
  return {
    ...Pr(e) ? Tu : bu,
    preloadedFeatures: n,
    useRender: mu(t),
    createVisualElement: r,
    Component: e
  };
}
function Ie(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const Eo = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1;
function Tn(e, t = "page") {
  return {
    point: {
      x: e[t + "X"],
      y: e[t + "Y"]
    }
  };
}
const Su = (e) => (t) => Eo(t) && e(t, Tn(t));
function Oe(e, t, n, r) {
  return Ie(e, t, Su(n), r);
}
const xu = (e, t) => (n) => t(e(n)), Me = (...e) => e.reduce(xu);
function To(e) {
  let t = null;
  return () => {
    const n = () => {
      t = null;
    };
    return t === null ? (t = e, n) : !1;
  };
}
const Di = To("dragHorizontal"), Ai = To("dragVertical");
function bo(e) {
  let t = !1;
  if (e === "y")
    t = Ai();
  else if (e === "x")
    t = Di();
  else {
    const n = Di(), r = Ai();
    n && r ? t = () => {
      n(), r();
    } : (n && n(), r && r());
  }
  return t;
}
function _o() {
  const e = bo(!0);
  return e ? (e(), !1) : !0;
}
class Ye {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
function Ii(e, t) {
  const n = "pointer" + (t ? "enter" : "leave"), r = "onHover" + (t ? "Start" : "End"), i = (s, o) => {
    if (s.pointerType === "touch" || _o())
      return;
    const a = e.getProps();
    e.animationState && a.whileHover && e.animationState.setActive("whileHover", t), a[r] && a[r](s, o);
  };
  return Oe(e.current, n, i, {
    passive: !e.getProps()[r]
  });
}
class wu extends Ye {
  mount() {
    this.unmount = Me(Ii(this.node, !0), Ii(this.node, !1));
  }
  unmount() {
  }
}
class Ru extends Ye {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Me(Ie(this.node.current, "focus", () => this.onFocus()), Ie(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
const So = (e, t) => t ? e === t ? !0 : So(e, t.parentElement) : !1;
function In(e, t) {
  if (!t)
    return;
  const n = new PointerEvent("pointer" + e);
  t(n, Tn(n));
}
class Cu extends Ye {
  constructor() {
    super(...arguments), this.removeStartListeners = oe, this.removeEndListeners = oe, this.removeAccessibleListeners = oe, this.startPointerPress = (t, n) => {
      if (this.isPressing)
        return;
      this.removeEndListeners();
      const r = this.node.getProps(), s = Oe(window, "pointerup", (a, c) => {
        if (!this.checkPressEnd())
          return;
        const { onTap: u, onTapCancel: l, globalTapTarget: d } = this.node.getProps();
        !d && !So(this.node.current, a.target) ? l && l(a, c) : u && u(a, c);
      }, { passive: !(r.onTap || r.onPointerUp) }), o = Oe(window, "pointercancel", (a, c) => this.cancelPress(a, c), { passive: !(r.onTapCancel || r.onPointerCancel) });
      this.removeEndListeners = Me(s, o), this.startPress(t, n);
    }, this.startAccessiblePress = () => {
      const t = (s) => {
        if (s.key !== "Enter" || this.isPressing)
          return;
        const o = (a) => {
          a.key !== "Enter" || !this.checkPressEnd() || In("up", (c, u) => {
            const { onTap: l } = this.node.getProps();
            l && l(c, u);
          });
        };
        this.removeEndListeners(), this.removeEndListeners = Ie(this.node.current, "keyup", o), In("down", (a, c) => {
          this.startPress(a, c);
        });
      }, n = Ie(this.node.current, "keydown", t), r = () => {
        this.isPressing && In("cancel", (s, o) => this.cancelPress(s, o));
      }, i = Ie(this.node.current, "blur", r);
      this.removeAccessibleListeners = Me(n, i);
    };
  }
  startPress(t, n) {
    this.isPressing = !0;
    const { onTapStart: r, whileTap: i } = this.node.getProps();
    i && this.node.animationState && this.node.animationState.setActive("whileTap", !0), r && r(t, n);
  }
  checkPressEnd() {
    return this.removeEndListeners(), this.isPressing = !1, this.node.getProps().whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1), !_o();
  }
  cancelPress(t, n) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel: r } = this.node.getProps();
    r && r(t, n);
  }
  mount() {
    const t = this.node.getProps(), n = Oe(t.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, { passive: !(t.onTapStart || t.onPointerStart) }), r = Ie(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = Me(n, r);
  }
  unmount() {
    this.removeStartListeners(), this.removeEndListeners(), this.removeAccessibleListeners();
  }
}
const Jn = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap(), Pu = (e) => {
  const t = Jn.get(e.target);
  t && t(e);
}, Du = (e) => {
  e.forEach(Pu);
};
function Au({ root: e, ...t }) {
  const n = e || document;
  On.has(n) || On.set(n, {});
  const r = On.get(n), i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(Du, { root: e, ...t })), r[i];
}
function Iu(e, t, n) {
  const r = Au(t);
  return Jn.set(e, n), r.observe(e), () => {
    Jn.delete(e), r.unobserve(e);
  };
}
const Ou = {
  some: 0,
  all: 1
};
class Mu extends Ye {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: r, amount: i = "some", once: s } = t, o = {
      root: n ? n.current : void 0,
      rootMargin: r,
      threshold: typeof i == "number" ? i : Ou[i]
    }, a = (c) => {
      const { isIntersecting: u } = c;
      if (this.isInView === u || (this.isInView = u, s && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: l, onViewportLeave: d } = this.node.getProps(), f = u ? l : d;
      f && f(c);
    };
    return Iu(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Nu(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Nu({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Vu = {
  inView: {
    Feature: Mu
  },
  tap: {
    Feature: Cu
  },
  focus: {
    Feature: Ru
  },
  hover: {
    Feature: wu
  }
};
function xo(e, t) {
  if (!Array.isArray(t))
    return !1;
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let r = 0; r < n; r++)
    if (t[r] !== e[r])
      return !1;
  return !0;
}
function ju(e) {
  const t = {};
  return e.values.forEach((n, r) => t[r] = n.get()), t;
}
function ku(e) {
  const t = {};
  return e.values.forEach((n, r) => t[r] = n.getVelocity()), t;
}
function bn(e, t, n) {
  const r = e.getProps();
  return jr(r, t, n !== void 0 ? n : r.custom, ju(e), ku(e));
}
const Ne = (e) => e * 1e3, Ve = (e) => e / 1e3, Lu = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Fu = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), $u = {
  type: "keyframes",
  duration: 0.8
}, Bu = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Hu = (e, { keyframes: t }) => t.length > 2 ? $u : st.has(e) ? e.startsWith("scale") ? Fu(t[1]) : Lu : Bu;
function Uu({ when: e, delay: t, delayChildren: n, staggerChildren: r, staggerDirection: i, repeat: s, repeatType: o, repeatDelay: a, from: c, elapsed: u, ...l }) {
  return !!Object.keys(l).length;
}
function kr(e, t) {
  return e[t] || e.default || e;
}
const zu = (e) => e !== null;
function _n(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(zu), s = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !s || r === void 0 ? i[s] : r;
}
let qt;
function Wu() {
  qt = void 0;
}
const Be = {
  now: () => (qt === void 0 && Be.set(se.isProcessing || Nc.useManualTiming ? se.timestamp : performance.now()), qt),
  set: (e) => {
    qt = e, queueMicrotask(Wu);
  }
}, wo = (e) => /^0[^.\s]+$/u.test(e);
function Gu(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || wo(e) : !0;
}
let Ft = oe, De = oe;
process.env.NODE_ENV !== "production" && (Ft = (e, t) => {
  !e && typeof console < "u" && console.warn(t);
}, De = (e, t) => {
  if (!e)
    throw new Error(t);
});
const Ro = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), Yu = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ku(e) {
  const t = Yu.exec(e);
  if (!t)
    return [,];
  const [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
const Xu = 4;
function Co(e, t, n = 1) {
  De(n <= Xu, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`);
  const [r, i] = Ku(e);
  if (!r)
    return;
  const s = window.getComputedStyle(t).getPropertyValue(r);
  if (s) {
    const o = s.trim();
    return Ro(o) ? parseFloat(o) : o;
  }
  return Dr(i) ? Co(i, t, n + 1) : i;
}
const qu = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y",
  "translateX",
  "translateY"
]), Oi = (e) => e === vt || e === F, Mi = (e, t) => parseFloat(e.split(", ")[t]), Ni = (e, t) => (n, { transform: r }) => {
  if (r === "none" || !r)
    return 0;
  const i = r.match(/^matrix3d\((.+)\)$/u);
  if (i)
    return Mi(i[1], t);
  {
    const s = r.match(/^matrix\((.+)\)$/u);
    return s ? Mi(s[1], e) : 0;
  }
}, Zu = /* @__PURE__ */ new Set(["x", "y", "z"]), Ju = jt.filter((e) => !Zu.has(e));
function Vi(e) {
  const t = [];
  return Ju.forEach((n) => {
    const r = e.getValue(n);
    r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const gt = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: Ni(4, 13),
  y: Ni(5, 14)
};
gt.translateX = gt.x;
gt.translateY = gt.y;
const Po = (e) => (t) => t.test(e), Qu = {
  test: (e) => e === "auto",
  parse: (e) => e
}, Do = [vt, F, Pe, Fe, ru, nu, Qu], ji = (e) => Do.find(Po(e)), et = /* @__PURE__ */ new Set();
let Qn = !1, er = !1;
function Ao() {
  if (er) {
    const e = Array.from(et).filter((r) => r.needsMeasurement), t = new Set(e.map((r) => r.element)), n = /* @__PURE__ */ new Map();
    t.forEach((r) => {
      Vi(r).length && (n.set(r, Vi(r)), r.render());
    }), e.forEach((r) => r.measureInitialState()), t.forEach((r) => {
      r.render();
    }), e.forEach((r) => r.measureEndState()), e.forEach((r) => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
    });
  }
  er = !1, Qn = !1, et.forEach((e) => e.complete()), et.clear();
}
function Io() {
  et.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (er = !0);
  });
}
function ed() {
  Io(), Ao();
}
class Lr {
  constructor(t, n, r, i, s, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = r, this.motionValue = i, this.element = s, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? (et.add(this), Qn || (Qn = !0, ie.read(Io), ie.resolveKeyframes(Ao))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: r, motionValue: i } = this;
    for (let s = 0; s < t.length; s++)
      if (t[s] === null)
        if (s === 0) {
          const o = i == null ? void 0 : i.get(), a = t[t.length - 1];
          if (o !== void 0)
            t[0] = o;
          else if (r && n) {
            const c = r.readValue(n, a);
            c != null && (t[0] = c);
          }
          t[0] === void 0 && (t[0] = a), i && o === void 0 && i.set(t[0]);
        } else
          t[s] = t[s - 1];
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete() {
    this.isComplete = !0, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), et.delete(this);
  }
  cancel() {
    this.isComplete || (this.isScheduled = !1, et.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const Fr = (e, t) => (n) => !!(kt(n) && tu.test(n) && n.startsWith(e) || t && Object.prototype.hasOwnProperty.call(n, t)), Oo = (e, t, n) => (r) => {
  if (!kt(r))
    return r;
  const [i, s, o, a] = r.match(Ar);
  return {
    [e]: parseFloat(i),
    [t]: parseFloat(s),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, td = (e) => Ue(0, 255, e), Mn = {
  ...vt,
  transform: (e) => Math.round(td(e))
}, Qe = {
  test: Fr("rgb", "red"),
  parse: Oo("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + Mn.transform(e) + ", " + Mn.transform(t) + ", " + Mn.transform(n) + ", " + wt(xt.transform(r)) + ")"
};
function nd(e) {
  let t = "", n = "", r = "", i = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(r, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const tr = {
  test: Fr("#"),
  parse: nd,
  transform: Qe.transform
}, dt = {
  test: Fr("hsl", "hue"),
  parse: Oo("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + Pe.transform(wt(t)) + ", " + Pe.transform(wt(n)) + ", " + wt(xt.transform(r)) + ")"
}, ae = {
  test: (e) => Qe.test(e) || tr.test(e) || dt.test(e),
  parse: (e) => Qe.test(e) ? Qe.parse(e) : dt.test(e) ? dt.parse(e) : tr.parse(e),
  transform: (e) => kt(e) ? e : e.hasOwnProperty("red") ? Qe.transform(e) : dt.transform(e)
};
function rd(e) {
  var t, n;
  return isNaN(e) && kt(e) && (((t = e.match(Ar)) === null || t === void 0 ? void 0 : t.length) || 0) + (((n = e.match(eu)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const Mo = "number", No = "color", id = "var", sd = "var(", ki = "${}", od = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function sn(e) {
  const t = e.toString(), n = [], r = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let s = 0;
  const a = t.replace(od, (c) => (ae.test(c) ? (r.color.push(s), i.push(No), n.push(ae.parse(c))) : c.startsWith(sd) ? (r.var.push(s), i.push(id), n.push(c)) : (r.number.push(s), i.push(Mo), n.push(parseFloat(c))), ++s, ki)).split(ki);
  return { values: n, split: a, indexes: r, types: i };
}
function Vo(e) {
  return sn(e).values;
}
function jo(e) {
  const { split: t, types: n } = sn(e), r = t.length;
  return (i) => {
    let s = "";
    for (let o = 0; o < r; o++)
      if (s += t[o], i[o] !== void 0) {
        const a = n[o];
        a === Mo ? s += wt(i[o]) : a === No ? s += ae.transform(i[o]) : s += i[o];
      }
    return s;
  };
}
const ad = (e) => typeof e == "number" ? 0 : e;
function ld(e) {
  const t = Vo(e);
  return jo(e)(t.map(ad));
}
const We = {
  test: rd,
  parse: Vo,
  createTransformer: jo,
  getAnimatableNone: ld
}, cd = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function ud(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [r] = n.match(Ar) || [];
  if (!r)
    return e;
  const i = n.replace(r, "");
  let s = cd.has(t) ? 1 : 0;
  return r !== n && (s *= 100), t + "(" + s + i + ")";
}
const dd = /\b([a-z-]*)\(.*?\)/gu, nr = {
  ...We,
  getAnimatableNone: (e) => {
    const t = e.match(dd);
    return t ? t.map(ud).join(" ") : e;
  }
}, fd = {
  ...lo,
  // Color props
  color: ae,
  backgroundColor: ae,
  outlineColor: ae,
  fill: ae,
  stroke: ae,
  // Border props
  borderColor: ae,
  borderTopColor: ae,
  borderRightColor: ae,
  borderBottomColor: ae,
  borderLeftColor: ae,
  filter: nr,
  WebkitFilter: nr
}, $r = (e) => fd[e];
function ko(e, t) {
  let n = $r(e);
  return n !== nr && (n = We), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
function hd(e, t, n) {
  let r = 0, i;
  for (; r < e.length && !i; )
    typeof e[r] == "string" && e[r] !== "none" && e[r] !== "0" && (i = e[r]), r++;
  if (i && n)
    for (const s of t)
      e[s] = ko(n, i);
}
class Lo extends Lr {
  constructor(t, n, r, i) {
    super(t, n, r, i, i == null ? void 0 : i.owner, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n.current)
      return;
    super.readKeyframes();
    for (let c = 0; c < t.length; c++) {
      const u = t[c];
      if (typeof u == "string" && Dr(u)) {
        const l = Co(u, n.current);
        l !== void 0 && (t[c] = l);
      }
    }
    if (!qu.has(r) || t.length !== 2)
      return this.resolveNoneKeyframes();
    const [i, s] = t, o = ji(i), a = ji(s);
    if (o !== a)
      if (Oi(o) && Oi(a))
        for (let c = 0; c < t.length; c++) {
          const u = t[c];
          typeof u == "string" && (t[c] = parseFloat(u));
        }
      else
        this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, r = [];
    for (let i = 0; i < t.length; i++)
      Gu(t[i]) && r.push(i);
    r.length && hd(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t.current)
      return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = gt[r](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    var t;
    const { element: n, name: r, unresolvedKeyframes: i } = this;
    if (!n.current)
      return;
    const s = n.getValue(r);
    s && s.jump(this.measuredOrigin, !1);
    const o = i.length - 1, a = i[o];
    i[o] = gt[r](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && (this.finalKeyframe = a), !((t = this.removedTransforms) === null || t === void 0) && t.length && this.removedTransforms.forEach(([c, u]) => {
      n.getValue(c).set(u);
    }), this.resolveNoneKeyframes();
  }
}
function pd(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Li = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(We.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function md(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function gd(e, t, n, r) {
  const i = e[0];
  if (i === null)
    return !1;
  const s = e[e.length - 1], o = Li(i, t), a = Li(s, t);
  return Ft(o === a, `You are trying to animate ${t} from "${i}" to "${s}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${s} via the \`style\` property.`), !o || !a ? !1 : md(e) || n === "spring" && r;
}
class Fo {
  constructor({ autoplay: t = !0, delay: n = 0, type: r = "keyframes", repeat: i = 0, repeatDelay: s = 0, repeatType: o = "loop", ...a }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.options = {
      autoplay: t,
      delay: n,
      type: r,
      repeat: i,
      repeatDelay: s,
      repeatType: o,
      ...a
    }, this.updateFinishedPromise();
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && ed(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(t, n) {
    this.hasAttemptedResolve = !0;
    const { name: r, type: i, velocity: s, delay: o, onComplete: a, onUpdate: c, isGenerator: u } = this.options;
    if (!u && !gd(t, r, i, s))
      if (o)
        this.options.duration = 0;
      else {
        c == null || c(_n(t, this.options, n)), a == null || a(), this.resolveFinishedPromise();
        return;
      }
    const l = this.initPlayback(t, n);
    l !== !1 && (this._resolved = {
      keyframes: t,
      finalKeyframe: n,
      ...l
    }, this.onPostResolved());
  }
  onPostResolved() {
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.currentFinishedPromise.then(t, n);
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t;
    });
  }
}
function $o(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const yd = 5;
function Bo(e, t, n) {
  const r = Math.max(t - yd, 0);
  return $o(n - e(r), t - r);
}
const Nn = 1e-3, vd = 0.01, Fi = 10, Ed = 0.05, Td = 1;
function bd({ duration: e = 800, bounce: t = 0.25, velocity: n = 0, mass: r = 1 }) {
  let i, s;
  Ft(e <= Ne(Fi), "Spring duration must be 10 seconds or less");
  let o = 1 - t;
  o = Ue(Ed, Td, o), e = Ue(vd, Fi, Ve(e)), o < 1 ? (i = (u) => {
    const l = u * o, d = l * e, f = l - n, p = rr(u, o), h = Math.exp(-d);
    return Nn - f / p * h;
  }, s = (u) => {
    const d = u * o * e, f = d * n + n, p = Math.pow(o, 2) * Math.pow(u, 2) * e, h = Math.exp(-d), g = rr(Math.pow(u, 2), o);
    return (-i(u) + Nn > 0 ? -1 : 1) * ((f - p) * h) / g;
  }) : (i = (u) => {
    const l = Math.exp(-u * e), d = (u - n) * e + 1;
    return -Nn + l * d;
  }, s = (u) => {
    const l = Math.exp(-u * e), d = (n - u) * (e * e);
    return l * d;
  });
  const a = 5 / e, c = Sd(i, s, a);
  if (e = Ne(e), isNaN(c))
    return {
      stiffness: 100,
      damping: 10,
      duration: e
    };
  {
    const u = Math.pow(c, 2) * r;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(r * u),
      duration: e
    };
  }
}
const _d = 12;
function Sd(e, t, n) {
  let r = n;
  for (let i = 1; i < _d; i++)
    r = r - e(r) / t(r);
  return r;
}
function rr(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const xd = ["duration", "bounce"], wd = ["stiffness", "damping", "mass"];
function $i(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function Rd(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!$i(e, wd) && $i(e, xd)) {
    const n = bd(e);
    t = {
      ...t,
      ...n,
      mass: 1
    }, t.isResolvedFromDuration = !0;
  }
  return t;
}
function Ho({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
  const i = e[0], s = e[e.length - 1], o = { done: !1, value: i }, { stiffness: a, damping: c, mass: u, duration: l, velocity: d, isResolvedFromDuration: f } = Rd({
    ...r,
    velocity: -Ve(r.velocity || 0)
  }), p = d || 0, h = c / (2 * Math.sqrt(a * u)), g = s - i, v = Ve(Math.sqrt(a / u)), b = Math.abs(g) < 5;
  n || (n = b ? 0.01 : 2), t || (t = b ? 5e-3 : 0.5);
  let E;
  if (h < 1) {
    const T = rr(v, h);
    E = (w) => {
      const S = Math.exp(-h * v * w);
      return s - S * ((p + h * v * g) / T * Math.sin(T * w) + g * Math.cos(T * w));
    };
  } else if (h === 1)
    E = (T) => s - Math.exp(-v * T) * (g + (p + v * g) * T);
  else {
    const T = v * Math.sqrt(h * h - 1);
    E = (w) => {
      const S = Math.exp(-h * v * w), D = Math.min(T * w, 300);
      return s - S * ((p + h * v * g) * Math.sinh(D) + T * g * Math.cosh(D)) / T;
    };
  }
  return {
    calculatedDuration: f && l || null,
    next: (T) => {
      const w = E(T);
      if (f)
        o.done = T >= l;
      else {
        let S = p;
        T !== 0 && (h < 1 ? S = Bo(E, T, w) : S = 0);
        const D = Math.abs(S) <= n, A = Math.abs(s - w) <= t;
        o.done = D && A;
      }
      return o.value = o.done ? s : w, o;
    }
  };
}
function Bi({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: s = 500, modifyTarget: o, min: a, max: c, restDelta: u = 0.5, restSpeed: l }) {
  const d = e[0], f = {
    done: !1,
    value: d
  }, p = (y) => a !== void 0 && y < a || c !== void 0 && y > c, h = (y) => a === void 0 ? c : c === void 0 || Math.abs(a - y) < Math.abs(c - y) ? a : c;
  let g = n * t;
  const v = d + g, b = o === void 0 ? v : o(v);
  b !== v && (g = b - d);
  const E = (y) => -g * Math.exp(-y / r), T = (y) => b + E(y), w = (y) => {
    const N = E(y), _ = T(y);
    f.done = Math.abs(N) <= u, f.value = f.done ? b : _;
  };
  let S, D;
  const A = (y) => {
    p(f.value) && (S = y, D = Ho({
      keyframes: [f.value, h(f.value)],
      velocity: Bo(T, y, f.value),
      damping: i,
      stiffness: s,
      restDelta: u,
      restSpeed: l
    }));
  };
  return A(0), {
    calculatedDuration: null,
    next: (y) => {
      let N = !1;
      return !D && S === void 0 && (N = !0, w(y), A(y)), S !== void 0 && y >= S ? D.next(y - S) : (!N && w(y), f);
    }
  };
}
const Uo = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, Cd = 1e-7, Pd = 12;
function Dd(e, t, n, r, i) {
  let s, o, a = 0;
  do
    o = t + (n - t) / 2, s = Uo(o, r, i) - e, s > 0 ? n = o : t = o;
  while (Math.abs(s) > Cd && ++a < Pd);
  return o;
}
function $t(e, t, n, r) {
  if (e === t && n === r)
    return oe;
  const i = (s) => Dd(s, 0, 1, e, n);
  return (s) => s === 0 || s === 1 ? s : Uo(i(s), t, r);
}
const Ad = $t(0.42, 0, 1, 1), Id = $t(0, 0, 0.58, 1), zo = $t(0.42, 0, 0.58, 1), Od = (e) => Array.isArray(e) && typeof e[0] != "number", Wo = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Go = (e) => (t) => 1 - e(1 - t), Br = (e) => 1 - Math.sin(Math.acos(e)), Yo = Go(Br), Md = Wo(Br), Ko = $t(0.33, 1.53, 0.69, 0.99), Hr = Go(Ko), Nd = Wo(Hr), Vd = (e) => (e *= 2) < 1 ? 0.5 * Hr(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), Hi = {
  linear: oe,
  easeIn: Ad,
  easeInOut: zo,
  easeOut: Id,
  circIn: Br,
  circInOut: Md,
  circOut: Yo,
  backIn: Hr,
  backInOut: Nd,
  backOut: Ko,
  anticipate: Vd
}, Ui = (e) => {
  if (Array.isArray(e)) {
    De(e.length === 4, "Cubic bezier arrays must contain four numerical values.");
    const [t, n, r, i] = e;
    return $t(t, n, r, i);
  } else if (typeof e == "string")
    return De(Hi[e] !== void 0, `Invalid easing type '${e}'`), Hi[e];
  return e;
}, Mt = (e, t, n) => {
  const r = t - e;
  return r === 0 ? 1 : (n - e) / r;
}, X = (e, t, n) => e + (t - e) * n;
function Vn(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function jd({ hue: e, saturation: t, lightness: n, alpha: r }) {
  e /= 360, t /= 100, n /= 100;
  let i = 0, s = 0, o = 0;
  if (!t)
    i = s = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, c = 2 * n - a;
    i = Vn(c, a, e + 1 / 3), s = Vn(c, a, e), o = Vn(c, a, e - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(s * 255),
    blue: Math.round(o * 255),
    alpha: r
  };
}
const jn = (e, t, n) => {
  const r = e * e, i = n * (t * t - r) + r;
  return i < 0 ? 0 : Math.sqrt(i);
}, kd = [tr, Qe, dt], Ld = (e) => kd.find((t) => t.test(e));
function zi(e) {
  const t = Ld(e);
  De(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`);
  let n = t.parse(e);
  return t === dt && (n = jd(n)), n;
}
const Wi = (e, t) => {
  const n = zi(e), r = zi(t), i = { ...n };
  return (s) => (i.red = jn(n.red, r.red, s), i.green = jn(n.green, r.green, s), i.blue = jn(n.blue, r.blue, s), i.alpha = X(n.alpha, r.alpha, s), Qe.transform(i));
};
function ir(e, t) {
  return (n) => n > 0 ? t : e;
}
function Fd(e, t) {
  return (n) => X(e, t, n);
}
function Ur(e) {
  return typeof e == "number" ? Fd : typeof e == "string" ? Dr(e) ? ir : ae.test(e) ? Wi : Hd : Array.isArray(e) ? Xo : typeof e == "object" ? ae.test(e) ? Wi : $d : ir;
}
function Xo(e, t) {
  const n = [...e], r = n.length, i = e.map((s, o) => Ur(s)(s, t[o]));
  return (s) => {
    for (let o = 0; o < r; o++)
      n[o] = i[o](s);
    return n;
  };
}
function $d(e, t) {
  const n = { ...e, ...t }, r = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (r[i] = Ur(e[i])(e[i], t[i]));
  return (i) => {
    for (const s in r)
      n[s] = r[s](i);
    return n;
  };
}
function Bd(e, t) {
  var n;
  const r = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < t.values.length; s++) {
    const o = t.types[s], a = e.indexes[o][i[o]], c = (n = e.values[a]) !== null && n !== void 0 ? n : 0;
    r[s] = c, i[o]++;
  }
  return r;
}
const Hd = (e, t) => {
  const n = We.createTransformer(t), r = sn(e), i = sn(t);
  return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? Me(Xo(Bd(r, i), i.values), n) : (Ft(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`), ir(e, t));
};
function qo(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? X(e, t, n) : Ur(e)(e, t);
}
function Ud(e, t, n) {
  const r = [], i = n || qo, s = e.length - 1;
  for (let o = 0; o < s; o++) {
    let a = i(e[o], e[o + 1]);
    if (t) {
      const c = Array.isArray(t) ? t[o] || oe : t;
      a = Me(c, a);
    }
    r.push(a);
  }
  return r;
}
function zd(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const s = e.length;
  if (De(s === t.length, "Both input and output ranges must be the same length"), s === 1)
    return () => t[0];
  if (s === 2 && e[0] === e[1])
    return () => t[1];
  e[0] > e[s - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const o = Ud(t, r, i), a = o.length, c = (u) => {
    let l = 0;
    if (a > 1)
      for (; l < e.length - 2 && !(u < e[l + 1]); l++)
        ;
    const d = Mt(e[l], e[l + 1], u);
    return o[l](d);
  };
  return n ? (u) => c(Ue(e[0], e[s - 1], u)) : c;
}
function Wd(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = Mt(0, t, r);
    e.push(X(n, 1, i));
  }
}
function Gd(e) {
  const t = [0];
  return Wd(t, e.length - 1), t;
}
function Yd(e, t) {
  return e.map((n) => n * t);
}
function Kd(e, t) {
  return e.map(() => t || zo).splice(0, e.length - 1);
}
function on({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
  const i = Od(r) ? r.map(Ui) : Ui(r), s = {
    done: !1,
    value: t[0]
  }, o = Yd(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : Gd(t),
    e
  ), a = zd(o, t, {
    ease: Array.isArray(i) ? i : Kd(t, i)
  });
  return {
    calculatedDuration: e,
    next: (c) => (s.value = a(c), s.done = c >= e, s)
  };
}
const Gi = 2e4;
function Xd(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < Gi; )
    t += n, r = e.next(t);
  return t >= Gi ? 1 / 0 : t;
}
const qd = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: () => ie.update(t, !0),
    stop: () => ze(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => se.isProcessing ? se.timestamp : Be.now()
  };
}, Zd = {
  decay: Bi,
  inertia: Bi,
  tween: on,
  keyframes: on,
  spring: Ho
}, Jd = (e) => e / 100;
class zr extends Fo {
  constructor({ KeyframeResolver: t = Lr, ...n }) {
    super(n), this.holdTime = null, this.startTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.state = "idle";
    const { name: r, motionValue: i, keyframes: s } = this.options, o = (a, c) => this.onKeyframesResolved(a, c);
    r && i && i.owner ? this.resolver = i.owner.resolveKeyframes(s, o, r, i) : this.resolver = new t(s, o, r, i), this.resolver.scheduleResolve();
  }
  initPlayback(t) {
    const { type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: s, velocity: o = 0 } = this.options, a = Zd[n] || on;
    let c, u;
    a !== on && typeof t[0] != "number" && (process.env.NODE_ENV !== "production" && De(t.length === 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${t}`), c = Me(Jd, qo(t[0], t[1])), t = [0, 100]);
    const l = a({ ...this.options, keyframes: t });
    s === "mirror" && (u = a({
      ...this.options,
      keyframes: [...t].reverse(),
      velocity: -o
    })), l.calculatedDuration === null && (l.calculatedDuration = Xd(l));
    const { calculatedDuration: d } = l, f = d + i, p = f * (r + 1) - i;
    return {
      generator: l,
      mirroredGenerator: u,
      mapPercentToKeyframes: c,
      calculatedDuration: d,
      resolvedDuration: f,
      totalDuration: p
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    this.play(), this.pendingPlayState === "paused" || !t ? this.pause() : this.state = this.pendingPlayState;
  }
  tick(t, n = !1) {
    const { resolved: r } = this;
    if (!r) {
      const { keyframes: y } = this.options;
      return { done: !0, value: y[y.length - 1] };
    }
    const { finalKeyframe: i, generator: s, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: c, calculatedDuration: u, totalDuration: l, resolvedDuration: d } = r;
    if (this.startTime === null)
      return s.next(0);
    const { delay: f, repeat: p, repeatType: h, repeatDelay: g, onUpdate: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - l / this.speed, this.startTime)), n ? this.currentTime = t : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(t - this.startTime) * this.speed;
    const b = this.currentTime - f * (this.speed >= 0 ? 1 : -1), E = this.speed >= 0 ? b < 0 : b > l;
    this.currentTime = Math.max(b, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = l);
    let T = this.currentTime, w = s;
    if (p) {
      const y = Math.min(this.currentTime, l) / d;
      let N = Math.floor(y), _ = y % 1;
      !_ && y >= 1 && (_ = 1), _ === 1 && N--, N = Math.min(N, p + 1), !!(N % 2) && (h === "reverse" ? (_ = 1 - _, g && (_ -= g / d)) : h === "mirror" && (w = o)), T = Ue(0, 1, _) * d;
    }
    const S = E ? { done: !1, value: c[0] } : w.next(T);
    a && (S.value = a(S.value));
    let { done: D } = S;
    !E && u !== null && (D = this.speed >= 0 ? this.currentTime >= l : this.currentTime <= 0);
    const A = this.holdTime === null && (this.state === "finished" || this.state === "running" && D);
    return A && i !== void 0 && (S.value = _n(c, this.options, i)), v && v(S.value), A && this.finish(), S;
  }
  get duration() {
    const { resolved: t } = this;
    return t ? Ve(t.calculatedDuration) : 0;
  }
  get time() {
    return Ve(this.currentTime);
  }
  set time(t) {
    t = Ne(t), this.currentTime = t, this.holdTime !== null || this.speed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = Ve(this.currentTime));
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver: t = qd, onPlay: n } = this.options;
    this.driver || (this.driver = t((i) => this.tick(i))), n && n();
    const r = this.driver.now();
    this.holdTime !== null ? this.startTime = r - this.holdTime : (!this.startTime || this.state === "finished") && (this.startTime = r), this.state === "finished" && this.updateFinishedPromise(), this.cancelTime = this.startTime, this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused", this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0;
  }
  stop() {
    if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
      return;
    this.teardown();
    const { onStop: t } = this.options;
    t && t();
  }
  complete() {
    this.state !== "running" && this.play(), this.pendingPlayState = this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.teardown(), this.state = "finished";
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime), this.teardown(), this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.resolveFinishedPromise(), this.updateFinishedPromise(), this.startTime = this.cancelTime = null, this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
}
const Zo = (e) => Array.isArray(e) && typeof e[0] == "number";
function Jo(e) {
  return !!(!e || typeof e == "string" && Qo[e] || Zo(e) || Array.isArray(e) && e.every(Jo));
}
const St = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, Qo = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: St([0, 0.65, 0.55, 1]),
  circOut: St([0.55, 0, 1, 0.45]),
  backIn: St([0.31, 0.01, 0.66, -0.59]),
  backOut: St([0.33, 1.53, 0.69, 0.99])
};
function ea(e) {
  if (e)
    return Zo(e) ? St(e) : Array.isArray(e) ? e.map(ea) : Qo[e];
}
function Qd(e, t, n, { delay: r = 0, duration: i = 300, repeat: s = 0, repeatType: o = "loop", ease: a, times: c } = {}) {
  const u = { [t]: n };
  c && (u.offset = c);
  const l = ea(a);
  return Array.isArray(l) && (u.easing = l), e.animate(u, {
    delay: r,
    duration: i,
    easing: Array.isArray(l) ? "linear" : l,
    fill: "both",
    iterations: s + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const ef = pd(() => Object.hasOwnProperty.call(Element.prototype, "animate")), tf = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), an = 10, nf = 2e4;
function rf(e) {
  return e.type === "spring" || e.name === "backgroundColor" || !Jo(e.ease);
}
function sf(e, t) {
  const n = new zr({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let r = { done: !1, value: e[0] };
  const i = [];
  let s = 0;
  for (; !r.done && s < nf; )
    r = n.sample(s), i.push(r.value), s += an;
  return {
    times: void 0,
    keyframes: i,
    duration: s - an,
    ease: "linear"
  };
}
class Yi extends Fo {
  constructor(t) {
    super(t);
    const { name: n, motionValue: r, keyframes: i } = this.options;
    this.resolver = new Lo(i, (s, o) => this.onKeyframesResolved(s, o), n, r), this.resolver.scheduleResolve();
  }
  initPlayback(t, n) {
    var r;
    let { duration: i = 300, times: s, ease: o, type: a, motionValue: c, name: u } = this.options;
    if (!(!((r = c.owner) === null || r === void 0) && r.current))
      return !1;
    if (rf(this.options)) {
      const { onComplete: d, onUpdate: f, motionValue: p, ...h } = this.options, g = sf(t, h);
      t = g.keyframes, t.length === 1 && (t[1] = t[0]), i = g.duration, s = g.times, o = g.ease, a = "keyframes";
    }
    const l = Qd(c.owner.current, u, t, { ...this.options, duration: i, times: s, ease: o });
    return l.startTime = Be.now(), this.pendingTimeline ? (l.timeline = this.pendingTimeline, this.pendingTimeline = void 0) : l.onfinish = () => {
      const { onComplete: d } = this.options;
      c.set(_n(t, this.options, n)), d && d(), this.cancel(), this.resolveFinishedPromise();
    }, {
      animation: l,
      duration: i,
      times: s,
      type: a,
      ease: o,
      keyframes: t
    };
  }
  get duration() {
    const { resolved: t } = this;
    if (!t)
      return 0;
    const { duration: n } = t;
    return Ve(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t)
      return 0;
    const { animation: n } = t;
    return Ve(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: r } = n;
    r.currentTime = Ne(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t)
      return 1;
    const { animation: n } = t;
    return n.playbackRate;
  }
  set speed(t) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: r } = n;
    r.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t)
      return "idle";
    const { animation: n } = t;
    return n.playState;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(t) {
    if (!this._resolved)
      this.pendingTimeline = t;
    else {
      const { resolved: n } = this;
      if (!n)
        return oe;
      const { animation: r } = n;
      r.timeline = t, r.onfinish = null;
    }
    return oe;
  }
  play() {
    if (this.isStopped)
      return;
    const { resolved: t } = this;
    if (!t)
      return;
    const { animation: n } = t;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: t } = this;
    if (!t)
      return;
    const { animation: n } = t;
    n.pause();
  }
  stop() {
    if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
      return;
    const { resolved: t } = this;
    if (!t)
      return;
    const { animation: n, keyframes: r, duration: i, type: s, ease: o, times: a } = t;
    if (!(n.playState === "idle" || n.playState === "finished")) {
      if (this.time) {
        const { motionValue: c, onUpdate: u, onComplete: l, ...d } = this.options, f = new zr({
          ...d,
          keyframes: r,
          duration: i,
          type: s,
          ease: o,
          times: a,
          isGenerator: !0
        }), p = Ne(this.time);
        c.setWithVelocity(f.sample(p - an).value, f.sample(p).value, an);
      }
      this.cancel();
    }
  }
  complete() {
    const { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    const { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    const { motionValue: n, name: r, repeatDelay: i, repeatType: s, damping: o, type: a } = t;
    return ef() && r && tf.has(r) && n && n.owner && n.owner.current instanceof HTMLElement && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !n.owner.getProps().onUpdate && !i && s !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const Wr = (e, t, n, r = {}, i, s) => (o) => {
  const a = kr(r, e) || {}, c = a.delay || r.delay || 0;
  let { elapsed: u = 0 } = r;
  u = u - Ne(c);
  let l = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (f) => {
      t.set(f), a.onUpdate && a.onUpdate(f);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: s ? void 0 : i
  };
  Uu(a) || (l = {
    ...l,
    ...Hu(e, l)
  }), l.duration && (l.duration = Ne(l.duration)), l.repeatDelay && (l.repeatDelay = Ne(l.repeatDelay)), l.from !== void 0 && (l.keyframes[0] = l.from);
  let d = !1;
  if (l.type === !1 && (l.duration = 0, l.delay === 0 && (d = !0)), d && !s && t.get() !== void 0) {
    const f = _n(l.keyframes, a);
    if (f !== void 0) {
      ie.update(() => {
        l.onUpdate(f), l.onComplete();
      });
      return;
    }
  }
  return !s && Yi.supports(l) ? new Yi(l) : new zr(l);
};
function ln(e) {
  return !!(le(e) && e.add);
}
function Gr(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Yr(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class Kr {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Gr(this.subscriptions, t), () => Yr(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](t, n, r);
      else
        for (let s = 0; s < i; s++) {
          const o = this.subscriptions[s];
          o && o(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Ki = /* @__PURE__ */ new Set();
function Xr(e, t, n) {
  e || Ki.has(t) || (console.warn(t), n && console.warn(n), Ki.add(t));
}
const Xi = 30, of = (e) => !isNaN(parseFloat(e));
class af {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(t, n = {}) {
    this.version = "11.0.23", this.canTrackVelocity = !1, this.events = {}, this.updateAndNotify = (r, i = !0) => {
      const s = Be.now();
      this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(t), this.canTrackVelocity = of(this.current), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Be.now();
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return process.env.NODE_ENV !== "production" && Xr(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Kr());
    const r = this.events[t].add(n);
    return t === "change" ? () => {
      r(), ie.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : r;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(t, n) : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, r) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - r;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = Be.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Xi)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Xi);
    return $o(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Nt(e, t) {
  return new af(e, t);
}
function lf(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Nt(n));
}
function cf(e, t) {
  const n = bn(e, t);
  let { transitionEnd: r = {}, transition: i = {}, ...s } = n || {};
  s = { ...s, ...r };
  for (const o in s) {
    const a = yu(s[o]);
    lf(e, o, a);
  }
}
function uf({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, r;
}
function ta(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var s;
  let { transition: o = e.getDefaultTransition(), transitionEnd: a, ...c } = t;
  const u = e.getValue("willChange");
  r && (o = r);
  const l = [], d = i && e.animationState && e.animationState.getState()[i];
  for (const f in c) {
    const p = e.getValue(f, (s = e.latestValues[f]) !== null && s !== void 0 ? s : null), h = c[f];
    if (h === void 0 || d && uf(d, f))
      continue;
    const g = {
      delay: n,
      elapsed: 0,
      ...kr(o || {}, f)
    };
    let v = !1;
    if (window.HandoffAppearAnimations) {
      const E = e.getProps()[to];
      if (E) {
        const T = window.HandoffAppearAnimations(E, f);
        T !== null && (g.elapsed = T, v = !0);
      }
    }
    p.start(Wr(f, p, h, e.shouldReduceMotion && st.has(f) ? { type: !1 } : g, e, v));
    const b = p.animation;
    b && (ln(u) && (u.add(f), b.then(() => u.remove(f))), l.push(b));
  }
  return a && Promise.all(l).then(() => {
    ie.update(() => {
      a && cf(e, a);
    });
  }), l;
}
function sr(e, t, n = {}) {
  var r;
  const i = bn(e, t, n.type === "exit" ? (r = e.presenceContext) === null || r === void 0 ? void 0 : r.custom : void 0);
  let { transition: s = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(ta(e, i, n)) : () => Promise.resolve(), a = e.variantChildren && e.variantChildren.size ? (u = 0) => {
    const { delayChildren: l = 0, staggerChildren: d, staggerDirection: f } = s;
    return df(e, t, l + u, d, f, n);
  } : () => Promise.resolve(), { when: c } = s;
  if (c) {
    const [u, l] = c === "beforeChildren" ? [o, a] : [a, o];
    return u().then(() => l());
  } else
    return Promise.all([o(), a(n.delay)]);
}
function df(e, t, n = 0, r = 0, i = 1, s) {
  const o = [], a = (e.variantChildren.size - 1) * r, c = i === 1 ? (u = 0) => u * r : (u = 0) => a - u * r;
  return Array.from(e.variantChildren).sort(ff).forEach((u, l) => {
    u.notify("AnimationStart", t), o.push(sr(u, t, {
      ...s,
      delay: n + c(l)
    }).then(() => u.notify("AnimationComplete", t)));
  }), Promise.all(o);
}
function ff(e, t) {
  return e.sortNodePosition(t);
}
function hf(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((s) => sr(e, s, n));
    r = Promise.all(i);
  } else if (typeof t == "string")
    r = sr(e, t, n);
  else {
    const i = typeof t == "function" ? bn(e, t, n.custom) : t;
    r = Promise.all(ta(e, i, n));
  }
  return r.then(() => {
    ie.postRender(() => {
      e.notify("AnimationComplete", t);
    });
  });
}
const pf = [...wr].reverse(), mf = wr.length;
function gf(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => hf(e, n, r)));
}
function yf(e) {
  let t = gf(e);
  const n = Ef();
  let r = !0;
  const i = (c) => (u, l) => {
    var d;
    const f = bn(e, l, c === "exit" ? (d = e.presenceContext) === null || d === void 0 ? void 0 : d.custom : void 0);
    if (f) {
      const { transition: p, transitionEnd: h, ...g } = f;
      u = { ...u, ...g, ...h };
    }
    return u;
  };
  function s(c) {
    t = c(e);
  }
  function o(c) {
    const u = e.getProps(), l = e.getVariantContext(!0) || {}, d = [], f = /* @__PURE__ */ new Set();
    let p = {}, h = 1 / 0;
    for (let v = 0; v < mf; v++) {
      const b = pf[v], E = n[b], T = u[b] !== void 0 ? u[b] : l[b], w = It(T), S = b === c ? E.isActive : null;
      S === !1 && (h = v);
      let D = T === l[b] && T !== u[b] && w;
      if (D && r && e.manuallyAnimateOnMount && (D = !1), E.protectedKeys = { ...p }, // If it isn't active and hasn't *just* been set as inactive
      !E.isActive && S === null || // If we didn't and don't have any defined prop for this animation type
      !T && !E.prevProp || // Or if the prop doesn't define an animation
      vn(T) || typeof T == "boolean")
        continue;
      let y = vf(E.prevProp, T) || // If we're making this variant active, we want to always make it active
      b === c && E.isActive && !D && w || // If we removed a higher-priority variant (i is in reverse order)
      v > h && w, N = !1;
      const _ = Array.isArray(T) ? T : [T];
      let V = _.reduce(i(b), {});
      S === !1 && (V = {});
      const { prevResolvedValues: H = {} } = E, z = {
        ...H,
        ...V
      }, I = (R) => {
        y = !0, f.has(R) && (N = !0, f.delete(R)), E.needsAnimating[R] = !0;
      };
      for (const R in z) {
        const x = V[R], O = H[R];
        if (p.hasOwnProperty(R))
          continue;
        let P = !1;
        Zn(x) && Zn(O) ? P = !xo(x, O) : P = x !== O, P ? x != null ? I(R) : f.add(R) : x !== void 0 && f.has(R) ? I(R) : E.protectedKeys[R] = !0;
      }
      E.prevProp = T, E.prevResolvedValues = V, E.isActive && (p = { ...p, ...V }), r && e.blockInitialAnimation && (y = !1), y && (!D || N) && d.push(..._.map((R) => ({
        animation: R,
        options: { type: b }
      })));
    }
    if (f.size) {
      const v = {};
      f.forEach((b) => {
        const E = e.getBaseTarget(b);
        v[b] = E === void 0 ? null : E;
      }), d.push({ animation: v });
    }
    let g = !!d.length;
    return r && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (g = !1), r = !1, g ? t(d) : Promise.resolve();
  }
  function a(c, u) {
    var l;
    if (n[c].isActive === u)
      return Promise.resolve();
    (l = e.variantChildren) === null || l === void 0 || l.forEach((f) => {
      var p;
      return (p = f.animationState) === null || p === void 0 ? void 0 : p.setActive(c, u);
    }), n[c].isActive = u;
    const d = o(c);
    for (const f in n)
      n[f].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: s,
    getState: () => n
  };
}
function vf(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !xo(t, e) : !1;
}
function Ke(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Ef() {
  return {
    animate: Ke(!0),
    whileInView: Ke(),
    whileHover: Ke(),
    whileTap: Ke(),
    whileDrag: Ke(),
    whileFocus: Ke(),
    exit: Ke()
  };
}
class Tf extends Ye {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = yf(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    this.unmount(), vn(t) && (this.unmount = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
  }
}
let bf = 0;
class _f extends Ye {
  constructor() {
    super(...arguments), this.id = bf++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext, { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r)
      return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => n(this.id));
  }
  mount() {
    const { register: t } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const Sf = {
  animation: {
    Feature: Tf
  },
  exit: {
    Feature: _f
  }
}, qi = (e, t) => Math.abs(e - t);
function xf(e, t) {
  const n = qi(e.x, t.x), r = qi(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class na {
  constructor(t, n, { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: s = !1 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const d = Ln(this.lastMoveEventInfo, this.history), f = this.startEvent !== null, p = xf(d.offset, { x: 0, y: 0 }) >= 3;
      if (!f && !p)
        return;
      const { point: h } = d, { timestamp: g } = se;
      this.history.push({ ...h, timestamp: g });
      const { onStart: v, onMove: b } = this.handlers;
      f || (v && v(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), b && b(this.lastMoveEvent, d);
    }, this.handlePointerMove = (d, f) => {
      this.lastMoveEvent = d, this.lastMoveEventInfo = kn(f, this.transformPagePoint), ie.update(this.updatePoint, !0);
    }, this.handlePointerUp = (d, f) => {
      this.end();
      const { onEnd: p, onSessionEnd: h, resumeAnimation: g } = this.handlers;
      if (this.dragSnapToOrigin && g && g(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const v = Ln(d.type === "pointercancel" ? this.lastMoveEventInfo : kn(f, this.transformPagePoint), this.history);
      this.startEvent && p && p(d, v), h && h(d, v);
    }, !Eo(t))
      return;
    this.dragSnapToOrigin = s, this.handlers = n, this.transformPagePoint = r, this.contextWindow = i || window;
    const o = Tn(t), a = kn(o, this.transformPagePoint), { point: c } = a, { timestamp: u } = se;
    this.history = [{ ...c, timestamp: u }];
    const { onSessionStart: l } = n;
    l && l(t, Ln(a, this.history)), this.removeListeners = Me(Oe(this.contextWindow, "pointermove", this.handlePointerMove), Oe(this.contextWindow, "pointerup", this.handlePointerUp), Oe(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), ze(this.updatePoint);
  }
}
function kn(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Zi(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Ln({ point: e }, t) {
  return {
    point: e,
    delta: Zi(e, ra(t)),
    offset: Zi(e, wf(t)),
    velocity: Rf(t, 0.1)
  };
}
function wf(e) {
  return e[0];
}
function ra(e) {
  return e[e.length - 1];
}
function Rf(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, r = null;
  const i = ra(e);
  for (; n >= 0 && (r = e[n], !(i.timestamp - r.timestamp > Ne(t))); )
    n--;
  if (!r)
    return { x: 0, y: 0 };
  const s = Ve(i.timestamp - r.timestamp);
  if (s === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (i.x - r.x) / s,
    y: (i.y - r.y) / s
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function ye(e) {
  return e.max - e.min;
}
function or(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function Ji(e, t, n, r = 0.5) {
  e.origin = r, e.originPoint = X(t.min, t.max, e.origin), e.scale = ye(n) / ye(t), (or(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1), e.translate = X(n.min, n.max, e.origin) - e.originPoint, (or(e.translate) || isNaN(e.translate)) && (e.translate = 0);
}
function Rt(e, t, n, r) {
  Ji(e.x, t.x, n.x, r ? r.originX : void 0), Ji(e.y, t.y, n.y, r ? r.originY : void 0);
}
function Qi(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + ye(t);
}
function Cf(e, t, n) {
  Qi(e.x, t.x, n.x), Qi(e.y, t.y, n.y);
}
function es(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + ye(t);
}
function Ct(e, t, n) {
  es(e.x, t.x, n.x), es(e.y, t.y, n.y);
}
function Pf(e, { min: t, max: n }, r) {
  return t !== void 0 && e < t ? e = r ? X(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? X(n, e, r.max) : Math.min(e, n)), e;
}
function ts(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function Df(e, { top: t, left: n, bottom: r, right: i }) {
  return {
    x: ts(e.x, n, i),
    y: ts(e.y, t, r)
  };
}
function ns(e, t) {
  let n = t.min - e.min, r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function Af(e, t) {
  return {
    x: ns(e.x, t.x),
    y: ns(e.y, t.y)
  };
}
function If(e, t) {
  let n = 0.5;
  const r = ye(e), i = ye(t);
  return i > r ? n = Mt(t.min, t.max - r, e.min) : r > i && (n = Mt(e.min, e.max - i, t.min)), Ue(0, 1, n);
}
function Of(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const ar = 0.35;
function Mf(e = ar) {
  return e === !1 ? e = 0 : e === !0 && (e = ar), {
    x: rs(e, "left", "right"),
    y: rs(e, "top", "bottom")
  };
}
function rs(e, t, n) {
  return {
    min: is(e, t),
    max: is(e, n)
  };
}
function is(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const ss = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), ft = () => ({
  x: ss(),
  y: ss()
}), os = () => ({ min: 0, max: 0 }), J = () => ({
  x: os(),
  y: os()
});
function Te(e) {
  return [e("x"), e("y")];
}
function ia({ top: e, left: t, right: n, bottom: r }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: r }
  };
}
function Nf({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Vf(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), r = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x
  };
}
function Fn(e) {
  return e === void 0 || e === 1;
}
function lr({ scale: e, scaleX: t, scaleY: n }) {
  return !Fn(e) || !Fn(t) || !Fn(n);
}
function qe(e) {
  return lr(e) || sa(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function sa(e) {
  return as(e.x) || as(e.y);
}
function as(e) {
  return e && e !== "0%";
}
function cn(e, t, n) {
  const r = e - n, i = t * r;
  return n + i;
}
function ls(e, t, n, r, i) {
  return i !== void 0 && (e = cn(e, i, r)), cn(e, n, r) + t;
}
function cr(e, t = 0, n = 1, r, i) {
  e.min = ls(e.min, t, n, r, i), e.max = ls(e.max, t, n, r, i);
}
function oa(e, { x: t, y: n }) {
  cr(e.x, t.translate, t.scale, t.originPoint), cr(e.y, n.translate, n.scale, n.originPoint);
}
function jf(e, t, n, r = !1) {
  const i = n.length;
  if (!i)
    return;
  t.x = t.y = 1;
  let s, o;
  for (let a = 0; a < i; a++) {
    s = n[a], o = s.projectionDelta;
    const c = s.instance;
    c && c.style && c.style.display === "contents" || (r && s.options.layoutScroll && s.scroll && s !== s.root && ht(e, {
      x: -s.scroll.offset.x,
      y: -s.scroll.offset.y
    }), o && (t.x *= o.x.scale, t.y *= o.y.scale, oa(e, o)), r && qe(s.latestValues) && ht(e, s.latestValues));
  }
  t.x = cs(t.x), t.y = cs(t.y);
}
function cs(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999 ? e : 1;
}
function $e(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function us(e, t, [n, r, i]) {
  const s = t[i] !== void 0 ? t[i] : 0.5, o = X(e.min, e.max, s);
  cr(e, t[n], t[r], o, t.scale);
}
const kf = ["x", "scaleX", "originX"], Lf = ["y", "scaleY", "originY"];
function ht(e, t) {
  us(e.x, t, kf), us(e.y, t, Lf);
}
function aa(e, t) {
  return ia(Vf(e.getBoundingClientRect(), t));
}
function Ff(e, t, n) {
  const r = aa(e, n), { scroll: i } = t;
  return i && ($e(r.x, i.offset.x), $e(r.y, i.offset.y)), r;
}
const la = ({ current: e }) => e ? e.ownerDocument.defaultView : null, $f = /* @__PURE__ */ new WeakMap();
class Bf {
  constructor(t) {
    this.openGlobalLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = J(), this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const i = (l) => {
      const { dragSnapToOrigin: d } = this.getProps();
      d ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(Tn(l, "page").point);
    }, s = (l, d) => {
      const { drag: f, dragPropagation: p, onDragStart: h } = this.getProps();
      if (f && !p && (this.openGlobalLock && this.openGlobalLock(), this.openGlobalLock = bo(f), !this.openGlobalLock))
        return;
      this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Te((v) => {
        let b = this.getAxisMotionValue(v).get() || 0;
        if (Pe.test(b)) {
          const { projection: E } = this.visualElement;
          if (E && E.layout) {
            const T = E.layout.layoutBox[v];
            T && (b = ye(T) * (parseFloat(b) / 100));
          }
        }
        this.originPoint[v] = b;
      }), h && h(l, d);
      const { animationState: g } = this.visualElement;
      g && g.setActive("whileDrag", !0);
    }, o = (l, d) => {
      const { dragPropagation: f, dragDirectionLock: p, onDirectionLock: h, onDrag: g } = this.getProps();
      if (!f && !this.openGlobalLock)
        return;
      const { offset: v } = d;
      if (p && this.currentDirection === null) {
        this.currentDirection = Hf(v), this.currentDirection !== null && h && h(this.currentDirection);
        return;
      }
      this.updateAxis("x", d.point, v), this.updateAxis("y", d.point, v), this.visualElement.render(), g && g(l, d);
    }, a = (l, d) => this.stop(l, d), c = () => Te((l) => {
      var d;
      return this.getAnimationState(l) === "paused" && ((d = this.getAxisMotionValue(l).animation) === null || d === void 0 ? void 0 : d.play());
    }), { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new na(t, {
      onSessionStart: i,
      onStart: s,
      onMove: o,
      onSessionEnd: a,
      resumeAnimation: c
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: u,
      contextWindow: la(this.visualElement)
    });
  }
  stop(t, n) {
    const r = this.isDragging;
    if (this.cancel(), !r)
      return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: s } = this.getProps();
    s && s(t, n);
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: r } = this.getProps();
    !r && this.openGlobalLock && (this.openGlobalLock(), this.openGlobalLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Kt(t, i, this.currentDirection))
      return;
    const s = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + r[t];
    this.constraints && this.constraints[t] && (o = Pf(o, this.constraints[t], this.elastic[t])), s.set(o);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: r } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (t = this.visualElement.projection) === null || t === void 0 ? void 0 : t.layout, s = this.constraints;
    n && ut(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && i ? this.constraints = Df(i.layoutBox, n) : this.constraints = !1, this.elastic = Mf(r), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && Te((o) => {
      this.getAxisMotionValue(o) && (this.constraints[o] = Of(i.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !ut(t))
      return !1;
    const r = t.current;
    De(r !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    const s = Ff(r, i.root, this.visualElement.getTransformPagePoint());
    let o = Af(i.layout.layoutBox, s);
    if (n) {
      const a = n(Nf(o));
      this.hasMutatedConstraints = !!a, a && (o = ia(a));
    }
    return o;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: r, dragElastic: i, dragTransition: s, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), c = this.constraints || {}, u = Te((l) => {
      if (!Kt(l, n, this.currentDirection))
        return;
      let d = c && c[l] || {};
      o && (d = { min: 0, max: 0 });
      const f = i ? 200 : 1e6, p = i ? 40 : 1e7, h = {
        type: "inertia",
        velocity: r ? t[l] : 0,
        bounceStiffness: f,
        bounceDamping: p,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...s,
        ...d
      };
      return this.startAxisValueAnimation(l, h);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return r.start(Wr(t, r, 0, n, this.visualElement));
  }
  stopAnimation() {
    Te((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    Te((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = "_drag" + t.toUpperCase(), r = this.visualElement.getProps(), i = r[n];
    return i || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    Te((n) => {
      const { drag: r } = this.getProps();
      if (!Kt(n, r, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, s = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: o, max: a } = i.layout.layoutBox[n];
        s.set(t[n] - X(o, a, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: t, dragConstraints: n } = this.getProps(), { projection: r } = this.visualElement;
    if (!ut(n) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    Te((o) => {
      const a = this.getAxisMotionValue(o);
      if (a) {
        const c = a.get();
        i[o] = If({ min: c, max: c }, this.constraints[o]);
      }
    });
    const { transformTemplate: s } = this.visualElement.getProps();
    this.visualElement.current.style.transform = s ? s({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.resolveConstraints(), Te((o) => {
      if (!Kt(o, t, null))
        return;
      const a = this.getAxisMotionValue(o), { min: c, max: u } = this.constraints[o];
      a.set(X(c, u, i[o]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    $f.set(this.visualElement, this);
    const t = this.visualElement.current, n = Oe(t, "pointerdown", (c) => {
      const { drag: u, dragListener: l = !0 } = this.getProps();
      u && l && this.start(c);
    }), r = () => {
      const { dragConstraints: c } = this.getProps();
      ut(c) && (this.constraints = this.resolveRefConstraints());
    }, { projection: i } = this.visualElement, s = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), r();
    const o = Ie(window, "resize", () => this.scalePositionWithinConstraints()), a = i.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: u }) => {
      this.isDragging && u && (Te((l) => {
        const d = this.getAxisMotionValue(l);
        d && (this.originPoint[l] += c[l].translate, d.set(d.get() + c[l].translate));
      }), this.visualElement.render());
    });
    return () => {
      o(), n(), s(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: r = !1, dragPropagation: i = !1, dragConstraints: s = !1, dragElastic: o = ar, dragMomentum: a = !0 } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: s,
      dragElastic: o,
      dragMomentum: a
    };
  }
}
function Kt(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function Hf(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class Uf extends Ye {
  constructor(t) {
    super(t), this.removeGroupControls = oe, this.removeListeners = oe, this.controls = new Bf(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || oe;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const ds = (e) => (t, n) => {
  e && e(t, n);
};
class zf extends Ye {
  constructor() {
    super(...arguments), this.removePointerDownListener = oe;
  }
  onPointerDown(t) {
    this.session = new na(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: la(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: ds(t),
      onStart: ds(n),
      onMove: r,
      onEnd: (s, o) => {
        delete this.session, i && i(s, o);
      }
    };
  }
  mount() {
    this.removePointerDownListener = Oe(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function Wf() {
  const e = ne(yn);
  if (e === null)
    return [!0, null];
  const { isPresent: t, onExitComplete: n, register: r } = e, i = dr();
  return ke(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0];
}
const Zt = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function fs(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const _t = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (F.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = fs(e, t.target.x), r = fs(e, t.target.y);
    return `${n}% ${r}%`;
  }
}, Gf = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const r = e, i = We.parse(e);
    if (i.length > 5)
      return r;
    const s = We.createTransformer(e), o = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * t.x, c = n.y.scale * t.y;
    i[0 + o] /= a, i[1 + o] /= c;
    const u = X(a, c, 0.5);
    return typeof i[2 + o] == "number" && (i[2 + o] /= u), typeof i[3 + o] == "number" && (i[3 + o] /= u), s(i);
  }
};
class Yf extends un.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: i } = this.props, { projection: s } = t;
    Yc(Kf), s && (n.group && n.group.add(s), r && r.register && i && r.register(s), s.root.didUpdate(), s.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), s.setOptions({
      ...s.options,
      onExitComplete: () => this.safeToRemove()
    })), Zt.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: r, drag: i, isPresent: s } = this.props, o = r.projection;
    return o && (o.isPresent = s, i || t.layoutDependency !== n || n === void 0 ? o.willUpdate() : this.safeToRemove(), t.isPresent !== s && (s ? o.promote() : o.relegate() || ie.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t && (t.root.didUpdate(), xr.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r } = this.props, { projection: i } = t;
    i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function ca(e) {
  const [t, n] = Wf(), r = ne(Cr);
  return un.createElement(Yf, { ...e, layoutGroup: r, switchLayoutGroup: ne(io), isPresent: t, safeToRemove: n });
}
const Kf = {
  borderRadius: {
    ..._t,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: _t,
  borderTopRightRadius: _t,
  borderBottomLeftRadius: _t,
  borderBottomRightRadius: _t,
  boxShadow: Gf
}, ua = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Xf = ua.length, hs = (e) => typeof e == "string" ? parseFloat(e) : e, ps = (e) => typeof e == "number" || F.test(e);
function qf(e, t, n, r, i, s) {
  i ? (e.opacity = X(
    0,
    // TODO Reinstate this if only child
    n.opacity !== void 0 ? n.opacity : 1,
    Zf(r)
  ), e.opacityExit = X(t.opacity !== void 0 ? t.opacity : 1, 0, Jf(r))) : s && (e.opacity = X(t.opacity !== void 0 ? t.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, r));
  for (let o = 0; o < Xf; o++) {
    const a = `border${ua[o]}Radius`;
    let c = ms(t, a), u = ms(n, a);
    if (c === void 0 && u === void 0)
      continue;
    c || (c = 0), u || (u = 0), c === 0 || u === 0 || ps(c) === ps(u) ? (e[a] = Math.max(X(hs(c), hs(u), r), 0), (Pe.test(u) || Pe.test(c)) && (e[a] += "%")) : e[a] = u;
  }
  (t.rotate || n.rotate) && (e.rotate = X(t.rotate || 0, n.rotate || 0, r));
}
function ms(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const Zf = da(0, 0.5, Yo), Jf = da(0.5, 0.95, oe);
function da(e, t, n) {
  return (r) => r < e ? 0 : r > t ? 1 : n(Mt(e, t, r));
}
function gs(e, t) {
  e.min = t.min, e.max = t.max;
}
function Ee(e, t) {
  gs(e.x, t.x), gs(e.y, t.y);
}
function ys(e, t, n, r, i) {
  return e -= t, e = cn(e, 1 / n, r), i !== void 0 && (e = cn(e, 1 / i, r)), e;
}
function Qf(e, t = 0, n = 1, r = 0.5, i, s = e, o = e) {
  if (Pe.test(t) && (t = parseFloat(t), t = X(o.min, o.max, t / 100) - o.min), typeof t != "number")
    return;
  let a = X(s.min, s.max, r);
  e === s && (a -= t), e.min = ys(e.min, t, n, a, i), e.max = ys(e.max, t, n, a, i);
}
function vs(e, t, [n, r, i], s, o) {
  Qf(e, t[n], t[r], t[i], t.scale, s, o);
}
const eh = ["x", "scaleX", "originX"], th = ["y", "scaleY", "originY"];
function Es(e, t, n, r) {
  vs(e.x, t, eh, n ? n.x : void 0, r ? r.x : void 0), vs(e.y, t, th, n ? n.y : void 0, r ? r.y : void 0);
}
function Ts(e) {
  return e.translate === 0 && e.scale === 1;
}
function fa(e) {
  return Ts(e.x) && Ts(e.y);
}
function nh(e, t) {
  return e.x.min === t.x.min && e.x.max === t.x.max && e.y.min === t.y.min && e.y.max === t.y.max;
}
function ha(e, t) {
  return Math.round(e.x.min) === Math.round(t.x.min) && Math.round(e.x.max) === Math.round(t.x.max) && Math.round(e.y.min) === Math.round(t.y.min) && Math.round(e.y.max) === Math.round(t.y.max);
}
function bs(e) {
  return ye(e.x) / ye(e.y);
}
class rh {
  constructor() {
    this.members = [];
  }
  add(t) {
    Gr(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (Yr(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0)
      return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const s = this.members[i];
      if (s.isPresent !== !1) {
        r = s;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && (this.prevLead = r, this.lead = t, t.show(), r)) {
      r.instance && r.scheduleRender(), t.scheduleRender(), t.resumeFrom = r, n && (t.resumeFrom.preserveOpacity = !0), r.snapshot && (t.snapshot = r.snapshot, t.snapshot.latestValues = r.animationValues || r.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(), r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function _s(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x, s = e.y.translate / t.y, o = (n == null ? void 0 : n.z) || 0;
  if ((i || s || o) && (r = `translate3d(${i}px, ${s}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { rotate: u, rotateX: l, rotateY: d, skewX: f, skewY: p } = n;
    u && (r += `rotate(${u}deg) `), l && (r += `rotateX(${l}deg) `), d && (r += `rotateY(${d}deg) `), f && (r += `skewX(${f}deg) `), p && (r += `skewY(${p}deg) `);
  }
  const a = e.x.scale * t.x, c = e.y.scale * t.y;
  return (a !== 1 || c !== 1) && (r += `scale(${a}, ${c})`), r || "none";
}
const ih = (e, t) => e.depth - t.depth;
class sh {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    Gr(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    Yr(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(ih), this.isDirty = !1, this.children.forEach(t);
  }
}
function oh(e, t) {
  const n = Be.now(), r = ({ timestamp: i }) => {
    const s = i - n;
    s >= t && (ze(r), e(s - t));
  };
  return ie.read(r, !0), () => ze(r);
}
function ah(e) {
  window.MotionDebug && window.MotionDebug.record(e);
}
function lh(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
function ch(e, t, n) {
  const r = le(e) ? e : Nt(e);
  return r.start(Wr("", r, t, n)), r.animation;
}
const $n = ["", "X", "Y", "Z"], uh = { visibility: "hidden" }, Ss = 1e3;
let dh = 0;
const Ze = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function Bn(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && (n[e] = i[e], t.setStaticValue(e, 0), r && (r[e] = 0));
}
function pa({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i }) {
  return class {
    constructor(o = {}, a = t == null ? void 0 : t()) {
      this.id = dh++, this.animationId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, Ze.totalNodes = Ze.resolvedTargetDeltas = Ze.recalculatedProjection = 0, this.nodes.forEach(ph), this.nodes.forEach(Eh), this.nodes.forEach(Th), this.nodes.forEach(mh), ah(Ze);
      }, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let c = 0; c < this.path.length; c++)
        this.path[c].shouldResetTransform = !0;
      this.root === this && (this.nodes = new sh());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new Kr()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const c = this.eventHandlers.get(o);
      c && c.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    /**
     * Lifecycles
     */
    mount(o, a = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = lh(o), this.instance = o;
      const { layoutId: c, layout: u, visualElement: l } = this.options;
      if (l && !l.current && l.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), a && (u || c) && (this.isLayoutDirty = !0), e) {
        let d;
        const f = () => this.root.updateBlockedByResize = !1;
        e(o, () => {
          this.root.updateBlockedByResize = !0, d && d(), d = oh(f, 250), Zt.hasAnimatedSinceResize && (Zt.hasAnimatedSinceResize = !1, this.nodes.forEach(ws));
        });
      }
      c && this.root.registerSharedNode(c, this), this.options.animate !== !1 && l && (c || u) && this.addEventListener("didUpdate", ({ delta: d, hasLayoutChanged: f, hasRelativeTargetChanged: p, layout: h }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const g = this.options.transition || l.getDefaultTransition() || wh, { onLayoutAnimationStart: v, onLayoutAnimationComplete: b } = l.getProps(), E = !this.targetLayout || !ha(this.targetLayout, h) || p, T = !f && p;
        if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || T || f && (E || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0), this.setAnimationOrigin(d, T);
          const w = {
            ...kr(g, "layout"),
            onPlay: v,
            onComplete: b
          };
          (l.shouldReduceMotion || this.options.layoutRoot) && (w.delay = 0, w.type = !1), this.startAnimation(w);
        } else
          f || ws(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = h;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, ze(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(bh), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let l = 0; l < this.path.length; l++) {
        const d = this.path[l];
        d.shouldResetTransform = !0, d.updateScroll("snapshot"), d.options.layoutRoot && d.willUpdate(!1);
      }
      const { layoutId: a, layout: c } = this.options;
      if (a === void 0 && !c)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(xs);
        return;
      }
      this.isUpdating || this.nodes.forEach(yh), this.isUpdating = !1, window.HandoffCancelAllAnimations && window.HandoffCancelAllAnimations(), this.nodes.forEach(vh), this.nodes.forEach(fh), this.nodes.forEach(hh), this.clearAllSnapshots();
      const a = Be.now();
      se.delta = Ue(0, 1e3 / 60, a - se.timestamp), se.timestamp = a, se.isProcessing = !0, An.update.process(se), An.preRender.process(se), An.render.process(se), se.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, xr.read(() => this.update()));
    }
    clearAllSnapshots() {
      this.nodes.forEach(gh), this.sharedNodes.forEach(_h);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, ie.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      ie.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let c = 0; c < this.path.length; c++)
          this.path[c].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = J(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && (this.scroll = {
        animationId: this.root.animationId,
        phase: o,
        isRoot: r(this.instance),
        offset: n(this.instance)
      });
    }
    resetTransform() {
      if (!i)
        return;
      const o = this.isLayoutDirty || this.shouldResetTransform, a = this.projectionDelta && !fa(this.projectionDelta), c = this.getTransformTemplate(), u = c ? c(this.latestValues, "") : void 0, l = u !== this.prevTransformTemplateValue;
      o && (a || qe(this.latestValues) || l) && (i(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let c = this.removeElementScroll(a);
      return o && (c = this.removeTransform(c)), Rh(c), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: c,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: o } = this.options;
      if (!o)
        return J();
      const a = o.measureViewportBox(), { scroll: c } = this.root;
      return c && ($e(a.x, c.offset.x), $e(a.y, c.offset.y)), a;
    }
    removeElementScroll(o) {
      const a = J();
      Ee(a, o);
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c], { scroll: l, options: d } = u;
        if (u !== this.root && l && d.layoutScroll) {
          if (l.isRoot) {
            Ee(a, o);
            const { scroll: f } = this.root;
            f && ($e(a.x, -f.offset.x), $e(a.y, -f.offset.y));
          }
          $e(a.x, l.offset.x), $e(a.y, l.offset.y);
        }
      }
      return a;
    }
    applyTransform(o, a = !1) {
      const c = J();
      Ee(c, o);
      for (let u = 0; u < this.path.length; u++) {
        const l = this.path[u];
        !a && l.options.layoutScroll && l.scroll && l !== l.root && ht(c, {
          x: -l.scroll.offset.x,
          y: -l.scroll.offset.y
        }), qe(l.latestValues) && ht(c, l.latestValues);
      }
      return qe(this.latestValues) && ht(c, this.latestValues), c;
    }
    removeTransform(o) {
      const a = J();
      Ee(a, o);
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c];
        if (!u.instance || !qe(u.latestValues))
          continue;
        lr(u.latestValues) && u.updateSnapshot();
        const l = J(), d = u.measurePageBox();
        Ee(l, d), Es(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, l);
      }
      return qe(this.latestValues) && Es(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== se.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      var a;
      const c = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = c.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = c.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = c.isSharedProjectionDirty);
      const u = !!this.resumingFrom || this !== c;
      if (!(o || u && this.isSharedProjectionDirty || this.isProjectionDirty || !((a = this.parent) === null || a === void 0) && a.isProjectionDirty || this.attemptToResolveRelativeTarget))
        return;
      const { layout: d, layoutId: f } = this.options;
      if (!(!this.layout || !(d || f))) {
        if (this.resolvedRelativeTargetAt = se.timestamp, !this.targetDelta && !this.relativeTarget) {
          const p = this.getClosestProjectingParent();
          p && p.layout && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = J(), this.relativeTargetOrigin = J(), Ct(this.relativeTargetOrigin, this.layout.layoutBox, p.layout.layoutBox), Ee(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (this.target || (this.target = J(), this.targetWithTransforms = J()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Cf(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : Ee(this.target, this.layout.layoutBox), oa(this.target, this.targetDelta)) : Ee(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget) {
            this.attemptToResolveRelativeTarget = !1;
            const p = this.getClosestProjectingParent();
            p && !!p.resumingFrom == !!this.resumingFrom && !p.options.layoutScroll && p.target && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = J(), this.relativeTargetOrigin = J(), Ct(this.relativeTargetOrigin, this.target, p.target), Ee(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
          }
          Ze.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || lr(this.parent.latestValues) || sa(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var o;
      const a = this.getLead(), c = !!this.resumingFrom || this !== a;
      let u = !0;
      if ((this.isProjectionDirty || !((o = this.parent) === null || o === void 0) && o.isProjectionDirty) && (u = !1), c && (this.isSharedProjectionDirty || this.isTransformDirty) && (u = !1), this.resolvedRelativeTargetAt === se.timestamp && (u = !1), u)
        return;
      const { layout: l, layoutId: d } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(l || d))
        return;
      Ee(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x, p = this.treeScale.y;
      jf(this.layoutCorrected, this.treeScale, this.path, c), a.layout && !a.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (a.target = a.layout.layoutBox, a.targetWithTransforms = J());
      const { target: h } = a;
      if (!h) {
        this.projectionTransform && (this.projectionDelta = ft(), this.projectionTransform = "none", this.scheduleRender());
        return;
      }
      this.projectionDelta || (this.projectionDelta = ft(), this.projectionDeltaWithTransform = ft());
      const g = this.projectionTransform;
      Rt(this.projectionDelta, this.layoutCorrected, h, this.latestValues), this.projectionTransform = _s(this.projectionDelta, this.treeScale), (this.projectionTransform !== g || this.treeScale.x !== f || this.treeScale.y !== p) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", h)), Ze.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      if (this.options.scheduleRender && this.options.scheduleRender(), o) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    setAnimationOrigin(o, a = !1) {
      const c = this.snapshot, u = c ? c.latestValues : {}, l = { ...this.latestValues }, d = ft();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = J(), p = c ? c.source : void 0, h = this.layout ? this.layout.source : void 0, g = p !== h, v = this.getStack(), b = !v || v.members.length <= 1, E = !!(g && !b && this.options.crossfade === !0 && !this.path.some(xh));
      this.animationProgress = 0;
      let T;
      this.mixTargetDelta = (w) => {
        const S = w / 1e3;
        Rs(d.x, o.x, S), Rs(d.y, o.y, S), this.setTargetDelta(d), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Ct(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Sh(this.relativeTarget, this.relativeTargetOrigin, f, S), T && nh(this.relativeTarget, T) && (this.isProjectionDirty = !1), T || (T = J()), Ee(T, this.relativeTarget)), g && (this.animationValues = l, qf(l, u, this.latestValues, S, E, b)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = S;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this.pendingAnimation && (ze(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = ie.update(() => {
        Zt.hasAnimatedSinceResize = !0, this.currentAnimation = ch(0, Ss, {
          ...o,
          onUpdate: (a) => {
            this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
          },
          onComplete: () => {
            o.onComplete && o.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Ss), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: c, layout: u, latestValues: l } = o;
      if (!(!a || !c || !u)) {
        if (this !== o && this.layout && u && ma(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          c = this.target || J();
          const d = ye(this.layout.layoutBox.x);
          c.x.min = o.target.x.min, c.x.max = c.x.min + d;
          const f = ye(this.layout.layoutBox.y);
          c.y.min = o.target.y.min, c.y.max = c.y.min + f;
        }
        Ee(a, c), ht(a, l), Rt(this.projectionDeltaWithTransform, this.layoutCorrected, a, l);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new rh()), this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      var o;
      const { layoutId: a } = this.options;
      return a ? ((o = this.getStack()) === null || o === void 0 ? void 0 : o.lead) || this : this;
    }
    getPrevLead() {
      var o;
      const { layoutId: a } = this.options;
      return a ? (o = this.getStack()) === null || o === void 0 ? void 0 : o.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o)
        return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: c } = {}) {
      const u = this.getStack();
      u && u.promote(this, c), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o)
        return;
      let a = !1;
      const { latestValues: c } = o;
      if ((c.z || c.rotate || c.rotateX || c.rotateY || c.rotateZ || c.skewX || c.skewY) && (a = !0), !a)
        return;
      const u = {};
      c.z && Bn("z", o, u, this.animationValues);
      for (let l = 0; l < $n.length; l++)
        Bn(`rotate${$n[l]}`, o, u, this.animationValues), Bn(`skew${$n[l]}`, o, u, this.animationValues);
      o.render();
      for (const l in u)
        o.setStaticValue(l, u[l]), this.animationValues && (this.animationValues[l] = u[l]);
      o.scheduleRender();
    }
    getProjectionStyles(o) {
      var a, c;
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible)
        return uh;
      const u = {
        visibility: ""
      }, l = this.getTransformTemplate();
      if (this.needsReset)
        return this.needsReset = !1, u.opacity = "", u.pointerEvents = Xt(o == null ? void 0 : o.pointerEvents) || "", u.transform = l ? l(this.latestValues, "") : "none", u;
      const d = this.getLead();
      if (!this.projectionDelta || !this.layout || !d.target) {
        const g = {};
        return this.options.layoutId && (g.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, g.pointerEvents = Xt(o == null ? void 0 : o.pointerEvents) || ""), this.hasProjected && !qe(this.latestValues) && (g.transform = l ? l({}, "") : "none", this.hasProjected = !1), g;
      }
      const f = d.animationValues || d.latestValues;
      this.applyTransformsToTarget(), u.transform = _s(this.projectionDeltaWithTransform, this.treeScale, f), l && (u.transform = l(f, u.transform));
      const { x: p, y: h } = this.projectionDelta;
      u.transformOrigin = `${p.origin * 100}% ${h.origin * 100}% 0`, d.animationValues ? u.opacity = d === this ? (c = (a = f.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !== null && c !== void 0 ? c : 1 : this.preserveOpacity ? this.latestValues.opacity : f.opacityExit : u.opacity = d === this ? f.opacity !== void 0 ? f.opacity : "" : f.opacityExit !== void 0 ? f.opacityExit : 0;
      for (const g in nn) {
        if (f[g] === void 0)
          continue;
        const { correct: v, applyTo: b } = nn[g], E = u.transform === "none" ? f[g] : v(f[g], d);
        if (b) {
          const T = b.length;
          for (let w = 0; w < T; w++)
            u[b[w]] = E;
        } else
          u[g] = E;
      }
      return this.options.layoutId && (u.pointerEvents = d === this ? Xt(o == null ? void 0 : o.pointerEvents) || "" : "none"), u;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) === null || a === void 0 ? void 0 : a.stop();
      }), this.root.nodes.forEach(xs), this.root.sharedNodes.clear();
    }
  };
}
function fh(e) {
  e.updateLayout();
}
function hh(e) {
  var t;
  const n = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout, { animationType: s } = e.options, o = n.source !== e.layout.source;
    s === "size" ? Te((d) => {
      const f = o ? n.measuredBox[d] : n.layoutBox[d], p = ye(f);
      f.min = r[d].min, f.max = f.min + p;
    }) : ma(s, n.layoutBox, r) && Te((d) => {
      const f = o ? n.measuredBox[d] : n.layoutBox[d], p = ye(r[d]);
      f.max = f.min + p, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[d].max = e.relativeTarget[d].min + p);
    });
    const a = ft();
    Rt(a, r, n.layoutBox);
    const c = ft();
    o ? Rt(c, e.applyTransform(i, !0), n.measuredBox) : Rt(c, r, n.layoutBox);
    const u = !fa(a);
    let l = !1;
    if (!e.resumeFrom) {
      const d = e.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: f, layout: p } = d;
        if (f && p) {
          const h = J();
          Ct(h, n.layoutBox, f.layoutBox);
          const g = J();
          Ct(g, r, p.layoutBox), ha(h, g) || (l = !0), d.options.layoutRoot && (e.relativeTarget = g, e.relativeTargetOrigin = h, e.relativeParent = d);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: c,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: l
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function ph(e) {
  Ze.totalNodes++, e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function mh(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function gh(e) {
  e.clearSnapshot();
}
function xs(e) {
  e.clearMeasurements();
}
function yh(e) {
  e.isLayoutDirty = !1;
}
function vh(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function ws(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function Eh(e) {
  e.resolveTargetDelta();
}
function Th(e) {
  e.calcProjection();
}
function bh(e) {
  e.resetSkewAndRotation();
}
function _h(e) {
  e.removeLeadSnapshot();
}
function Rs(e, t, n) {
  e.translate = X(t.translate, 0, n), e.scale = X(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function Cs(e, t, n, r) {
  e.min = X(t.min, n.min, r), e.max = X(t.max, n.max, r);
}
function Sh(e, t, n, r) {
  Cs(e.x, t.x, n.x, r), Cs(e.y, t.y, n.y, r);
}
function xh(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const wh = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Ps = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Ds = Ps("applewebkit/") && !Ps("chrome/") ? Math.round : oe;
function As(e) {
  e.min = Ds(e.min), e.max = Ds(e.max);
}
function Rh(e) {
  As(e.x), As(e.y);
}
function ma(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !or(bs(t), bs(n), 0.2);
}
const Ch = pa({
  attachResizeListener: (e, t) => Ie(e, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Hn = {
  current: void 0
}, ga = pa({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!Hn.current) {
      const e = new Ch({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), Hn.current = e;
    }
    return Hn.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), Ph = {
  pan: {
    Feature: zf
  },
  drag: {
    Feature: Uf,
    ProjectionNode: ga,
    MeasureLayout: ca
  }
}, ur = { current: null }, ya = { current: !1 };
function Dh() {
  if (ya.current = !0, !!br)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => ur.current = e.matches;
      e.addListener(t), t();
    } else
      ur.current = !1;
}
function Ah(e, t, n) {
  const { willChange: r } = t;
  for (const i in t) {
    const s = t[i], o = n[i];
    if (le(s))
      e.addValue(i, s), ln(r) && r.add(i), process.env.NODE_ENV === "development" && Xr(s.version === "11.0.23", `Attempting to mix Framer Motion versions ${s.version} with 11.0.23 may not work as expected.`);
    else if (le(o))
      e.addValue(i, Nt(s, { owner: e })), ln(r) && r.remove(i);
    else if (o !== s)
      if (e.hasValue(i)) {
        const a = e.getValue(i);
        !a.hasAnimated && a.set(s);
      } else {
        const a = e.getStaticValue(i);
        e.addValue(i, Nt(a !== void 0 ? a : s, { owner: e }));
      }
  }
  for (const i in n)
    t[i] === void 0 && e.removeValue(i);
  return t;
}
const Is = /* @__PURE__ */ new WeakMap(), Ih = [...Do, ae, We], Oh = (e) => Ih.find(Po(e)), va = Object.keys(Ot), Mh = va.length, Os = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
], Nh = Rr.length;
class Vh {
  constructor({ parent: t, props: n, presenceContext: r, reducedMotionConfig: i, blockInitialAnimation: s, visualState: o }, a = {}) {
    this.resolveKeyframes = (f, p, h, g) => new this.KeyframeResolver(f, p, h, g, this), this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Lr, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.scheduleRender = () => ie.render(this.render, !1, !0);
    const { latestValues: c, renderState: u } = o;
    this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = n.initial ? { ...c } : {}, this.renderState = u, this.parent = t, this.props = n, this.presenceContext = r, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!s, this.isControllingVariants = En(n), this.isVariantNode = ro(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: l, ...d } = this.scrapeMotionValuesFromProps(n, {});
    for (const f in d) {
      const p = d[f];
      c[f] !== void 0 && le(p) && (p.set(c[f], !1), ln(l) && l.add(f));
    }
  }
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n) {
    return {};
  }
  mount(t) {
    this.current = t, Is.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, r) => this.bindToMotionValue(r, n)), ya.current || Dh(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : ur.current, process.env.NODE_ENV !== "production" && Xr(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected."), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    Is.delete(this.current), this.projection && this.projection.unmount(), ze(this.notifyUpdate), ze(this.render), this.valueSubscriptions.forEach((t) => t()), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features)
      this.features[t].unmount();
    this.current = null;
  }
  bindToMotionValue(t, n) {
    const r = st.has(t), i = n.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && ie.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0);
    }), s = n.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(t, () => {
      i(), s(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  loadFeatures({ children: t, ...n }, r, i, s) {
    let o, a;
    if (process.env.NODE_ENV !== "production" && i && r) {
      const c = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
      n.ignoreStrict ? Ft(!1, c) : De(!1, c);
    }
    for (let c = 0; c < Mh; c++) {
      const u = va[c], { isEnabled: l, Feature: d, ProjectionNode: f, MeasureLayout: p } = Ot[u];
      f && (o = f), l(n) && (!this.features[u] && d && (this.features[u] = new d(this)), p && (a = p));
    }
    if ((this.type === "html" || this.type === "svg") && !this.projection && o) {
      this.projection = new o(this.latestValues, this.parent && this.parent.projection);
      const { layoutId: c, layout: u, drag: l, dragConstraints: d, layoutScroll: f, layoutRoot: p } = n;
      this.projection.setOptions({
        layoutId: c,
        layout: u,
        alwaysMeasureLayout: !!l || d && ut(d),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof u == "string" ? u : "both",
        initialPromotionConfig: s,
        layoutScroll: f,
        layoutRoot: p
      });
    }
    return a;
  }
  updateFeatures() {
    for (const t in this.features) {
      const n = this.features[t];
      n.isMounted ? n.update() : (n.mount(), n.isMounted = !0);
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : J();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let r = 0; r < Os.length; r++) {
      const i = Os[r];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const s = t["on" + i];
      s && (this.propEventSubscriptions[i] = this.on(i, s));
    }
    this.prevMotionValues = Ah(this, this.scrapeMotionValuesFromProps(t, this.prevProps), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  getVariantContext(t = !1) {
    if (t)
      return this.parent ? this.parent.getVariantContext() : void 0;
    if (!this.isControllingVariants) {
      const r = this.parent ? this.parent.getVariantContext() || {} : {};
      return this.props.initial !== void 0 && (r.initial = this.props.initial), r;
    }
    const n = {};
    for (let r = 0; r < Nh; r++) {
      const i = Rr[r], s = this.props[i];
      (It(s) || s === !1) && (n[i] = s);
    }
    return n;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    n !== this.values.get(t) && (this.removeValue(t), this.bindToMotionValue(t, n)), this.values.set(t, n), this.latestValues[t] = n.get();
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let r = this.values.get(t);
    return r === void 0 && n !== void 0 && (r = Nt(n === null ? void 0 : n, { owner: this }), this.addValue(t, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    var r;
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : (r = this.getBaseTargetFromProps(this.props, t)) !== null && r !== void 0 ? r : this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (Ro(i) || wo(i)) ? i = parseFloat(i) : !Oh(i) && We.test(n) && (i = ko(t, n)), this.setBaseTarget(t, le(i) ? i.get() : i)), le(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var n, r;
    const { initial: i } = this.props, s = typeof i == "string" || typeof i == "object" ? (r = jr(this.props, i, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom)) === null || r === void 0 ? void 0 : r[t] : void 0;
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !le(o) ? o : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Kr()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class Ea extends Vh {
  constructor() {
    super(...arguments), this.KeyframeResolver = Lo;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
}
function jh(e) {
  return window.getComputedStyle(e);
}
class kh extends Ea {
  constructor() {
    super(...arguments), this.type = "html";
  }
  readValueFromInstance(t, n) {
    if (st.has(n)) {
      const r = $r(n);
      return r && r.default || 0;
    } else {
      const r = jh(t), i = (ao(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return aa(t, n);
  }
  build(t, n, r, i) {
    Ir(t, n, r, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n) {
    return Vr(t, n);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    le(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
  renderInstance(t, n, r, i) {
    ho(t, n, r, i);
  }
}
class Lh extends Ea {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (st.has(n)) {
      const r = $r(n);
      return r && r.default || 0;
    }
    return n = po.has(n) ? n : Sr(n), t.getAttribute(n);
  }
  measureInstanceViewportBox() {
    return J();
  }
  scrapeMotionValuesFromProps(t, n) {
    return go(t, n);
  }
  build(t, n, r, i) {
    Mr(t, n, r, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    mo(t, n, r, i);
  }
  mount(t) {
    this.isSVGTag = Nr(t.tagName), super.mount(t);
  }
}
const Fh = (e, t) => Pr(e) ? new Lh(t, { enableHardwareAcceleration: !1 }) : new kh(t, { enableHardwareAcceleration: !0 }), $h = {
  layout: {
    ProjectionNode: ga,
    MeasureLayout: ca
  }
}, Bh = {
  ...Sf,
  ...Vu,
  ...Ph,
  ...$h
}, Hh = /* @__PURE__ */ Wc((e, t) => _u(e, t, Bh, Fh));
function Ta() {
  const e = Se(!1);
  return _r(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function Uh() {
  const e = Ta(), [t, n] = he(0), r = xe(() => {
    e.current && n(t + 1);
  }, [t]);
  return [xe(() => ie.postRender(r), [r]), t];
}
class zh extends ue.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const r = this.props.sizeRef.current;
      r.height = n.offsetHeight || 0, r.width = n.offsetWidth || 0, r.top = n.offsetTop, r.left = n.offsetLeft;
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
function Wh({ children: e, isPresent: t }) {
  const n = dr(), r = Se(null), i = Se({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }), { nonce: s } = ne(Tr);
  return Vs(() => {
    const { width: o, height: a, top: c, left: u } = i.current;
    if (t || !r.current || !o || !a)
      return;
    r.current.dataset.motionPopId = n;
    const l = document.createElement("style");
    return s && (l.nonce = s), document.head.appendChild(l), l.sheet && l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${o}px !important;
            height: ${a}px !important;
            top: ${c}px !important;
            left: ${u}px !important;
          }
        `), () => {
      document.head.removeChild(l);
    };
  }, [t]), ue.createElement(zh, { isPresent: t, childRef: r, sizeRef: i }, ue.cloneElement(e, { ref: r }));
}
const Un = ({ children: e, initial: t, isPresent: n, onExitComplete: r, custom: i, presenceAffectsLayout: s, mode: o }) => {
  const a = yo(Gh), c = dr(), u = nt(
    () => ({
      id: c,
      initial: t,
      isPresent: n,
      custom: i,
      onExitComplete: (l) => {
        a.set(l, !0);
        for (const d of a.values())
          if (!d)
            return;
        r && r();
      },
      register: (l) => (a.set(l, !1), () => a.delete(l))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    s ? void 0 : [n]
  );
  return nt(() => {
    a.forEach((l, d) => a.set(d, !1));
  }, [n]), ue.useEffect(() => {
    !n && !a.size && r && r();
  }, [n]), o === "popLayout" && (e = ue.createElement(Wh, { isPresent: n }, e)), ue.createElement(yn.Provider, { value: u }, e);
};
function Gh() {
  return /* @__PURE__ */ new Map();
}
function Yh(e) {
  return ke(() => () => e(), []);
}
const Je = (e) => e.key || "";
function Kh(e, t) {
  e.forEach((n) => {
    const r = Je(n);
    t.set(r, n);
  });
}
function Xh(e) {
  const t = [];
  return Ja.forEach(e, (n) => {
    Qa(n) && t.push(n);
  }), t;
}
const ba = ({ children: e, custom: t, initial: n = !0, onExitComplete: r, exitBeforeEnter: i, presenceAffectsLayout: s = !0, mode: o = "sync" }) => {
  De(!i, "Replace exitBeforeEnter with mode='wait'");
  const a = ne(Cr).forceRender || Uh()[0], c = Ta(), u = Xh(e);
  let l = u;
  const d = Se(/* @__PURE__ */ new Map()).current, f = Se(l), p = Se(/* @__PURE__ */ new Map()).current, h = Se(!0);
  if (_r(() => {
    h.current = !1, Kh(u, p), f.current = l;
  }), Yh(() => {
    h.current = !0, p.clear(), d.clear();
  }), h.current)
    return ue.createElement(ue.Fragment, null, l.map((E) => ue.createElement(Un, { key: Je(E), isPresent: !0, initial: n ? void 0 : !1, presenceAffectsLayout: s, mode: o }, E)));
  l = [...l];
  const g = f.current.map(Je), v = u.map(Je), b = g.length;
  for (let E = 0; E < b; E++) {
    const T = g[E];
    v.indexOf(T) === -1 && !d.has(T) && d.set(T, void 0);
  }
  return o === "wait" && d.size && (l = []), d.forEach((E, T) => {
    if (v.indexOf(T) !== -1)
      return;
    const w = p.get(T);
    if (!w)
      return;
    const S = g.indexOf(T);
    let D = E;
    if (!D) {
      const A = () => {
        d.delete(T);
        const y = Array.from(p.keys()).filter((N) => !v.includes(N));
        if (y.forEach((N) => p.delete(N)), f.current = u.filter((N) => {
          const _ = Je(N);
          return (
            // filter out the node exiting
            _ === T || // filter out the leftover children
            y.includes(_)
          );
        }), !d.size) {
          if (c.current === !1)
            return;
          a(), r && r();
        }
      };
      D = ue.createElement(Un, { key: Je(w), isPresent: !1, onExitComplete: A, custom: t, presenceAffectsLayout: s, mode: o }, w), d.set(T, D);
    }
    l.splice(S, 0, D);
  }), l = l.map((E) => {
    const T = E.key;
    return d.has(T) ? E : ue.createElement(Un, { key: Je(E), isPresent: !0, presenceAffectsLayout: s, mode: o }, E);
  }), process.env.NODE_ENV !== "production" && o === "wait" && l.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`), ue.createElement(ue.Fragment, null, d.size ? l : l.map((E) => Za(E)));
}, ot = "altimate-display-", qh = `${ot}-highlight`, Ms = `${ot}-highlight-hover`, Zh = `${ot}-active-highlight`, Jh = "altimate-highlight-wrapper", Qh = 1049, ep = ({ pos: e, onAddComment: t }) => /* @__PURE__ */ j.jsx(ba, { children: e && /* @__PURE__ */ j.jsx(
  yt,
  {
    onClick: t,
    id: `${ot}-highlight`,
    style: {
      position: "absolute",
      top: e.y,
      left: e.x,
      // right: "15px",
      zIndex: Qh + 5,
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
    children: "+"
  }
) }), tp = ep, np = () => {
  const {
    state: { isRightPanelOpen: e }
  } = Oc(), t = Ge(), n = () => {
    t(vr(!e));
  };
  return /* @__PURE__ */ j.jsx(yt, { onClick: n, children: e ? "Hide conversations" : "Show conversations" });
}, rp = np, ip = () => {
  const e = pe(
    (o) => o.shareId
  ), [t, n] = he(
    null
  ), [r, i] = he(!1), s = xe(async () => {
    if (!e)
      return;
    i(!0);
    const o = await sc(e);
    if (o) {
      n(o);
      const a = document.getElementById("collapse-sidebar");
      a == null || a.click();
    }
    i(!1);
  }, [e]);
  return ke(() => {
    !e || t || r || s();
  }, [e, t, s, r]), { shareDetails: t, loading: r };
};
var _a = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(window, function() {
    return function(n) {
      var r = {};
      function i(s) {
        if (r[s])
          return r[s].exports;
        var o = r[s] = { i: s, l: !1, exports: {} };
        return n[s].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
      }
      return i.m = n, i.c = r, i.d = function(s, o, a) {
        i.o(s, o) || Object.defineProperty(s, o, { enumerable: !0, get: a });
      }, i.r = function(s) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s, "__esModule", { value: !0 });
      }, i.t = function(s, o) {
        if (1 & o && (s = i(s)), 8 & o || 4 & o && typeof s == "object" && s && s.__esModule)
          return s;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: s }), 2 & o && typeof s != "string")
          for (var c in s)
            i.d(a, c, (function(u) {
              return s[u];
            }).bind(null, c));
        return a;
      }, i.n = function(s) {
        var o = s && s.__esModule ? function() {
          return s.default;
        } : function() {
          return s;
        };
        return i.d(o, "a", o), o;
      }, i.o = function(s, o) {
        return Object.prototype.hasOwnProperty.call(s, o);
      }, i.p = "", i(i.s = 7);
    }([function(n, r, i) {
      var s, o = this && this.__extends || (s = function(d, f) {
        return (s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, h) {
          p.__proto__ = h;
        } || function(p, h) {
          for (var g in h)
            Object.prototype.hasOwnProperty.call(h, g) && (p[g] = h[g]);
        })(d, f);
      }, function(d, f) {
        function p() {
          this.constructor = d;
        }
        s(d, f), d.prototype = f === null ? Object.create(f) : (p.prototype = f.prototype, new p());
      }), a = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.eventEmitter = r.INTERNAL_ERROR_EVENT = r.UNKNOWN_IDX = r.ROOT_IDX = r.getStylesheet = r.getDefaultOptions = r.CAMEL_DATASET_SPLIT_TYPE = r.CAMEL_DATASET_IDENTIFIER_EXTRA = r.CAMEL_DATASET_IDENTIFIER = r.DATASET_SPLIT_TYPE = r.DATASET_IDENTIFIER_EXTRA = r.DATASET_IDENTIFIER = r.STYLESHEET_ID = r.LOCAL_STORE_KEY = r.ID_DIVISION = void 0;
      var c = a(i(10)), u = a(i(2));
      r.ID_DIVISION = ";", r.LOCAL_STORE_KEY = "highlight-mengshou", r.STYLESHEET_ID = "highlight-mengshou-style", r.DATASET_IDENTIFIER = "highlight-id", r.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra", r.DATASET_SPLIT_TYPE = "highlight-split-type", r.CAMEL_DATASET_IDENTIFIER = c.default(r.DATASET_IDENTIFIER), r.CAMEL_DATASET_IDENTIFIER_EXTRA = c.default(r.DATASET_IDENTIFIER_EXTRA), r.CAMEL_DATASET_SPLIT_TYPE = c.default(r.DATASET_SPLIT_TYPE), r.getDefaultOptions = function() {
        return { $root: document || document.documentElement, exceptSelectors: null, wrapTag: "span", verbose: !1, style: { className: "highlight-mengshou-wrap" } };
      }, r.getStylesheet = function() {
        return `
    .` + r.getDefaultOptions().style.className + ` {
        background: #ff9;
        cursor: pointer;
    }
    .` + r.getDefaultOptions().style.className + `.active {
        background: #ffb;
    }
`;
      }, r.ROOT_IDX = -2, r.UNKNOWN_IDX = -1, r.INTERNAL_ERROR_EVENT = "error";
      var l = function(d) {
        function f() {
          return d !== null && d.apply(this, arguments) || this;
        }
        return o(f, d), f;
      }(u.default);
      r.eventEmitter = new l();
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.UserInputEvent = r.SelectedNodeType = r.CreateFrom = r.EventType = r.ERROR = r.SplitType = void 0, function(s) {
        s.none = "none", s.head = "head", s.tail = "tail", s.both = "both";
      }(r.SplitType || (r.SplitType = {})), function(s) {
        s.DOM_TYPE_ERROR = "[DOM] Receive wrong node type.", s.DOM_SELECTION_EMPTY = "[DOM] The selection contains no dom node, may be you except them.", s.RANGE_INVALID = "[RANGE] Got invalid dom range, can't convert to a valid highlight range.", s.RANGE_NODE_INVALID = "[RANGE] Start or end node isn't a text node, it may occur an error.", s.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict.", s.CACHE_SET_ERROR = "[CACHE] Cache.data can't be set manually, please use .save().", s.SOURCE_TYPE_ERROR = "[SOURCE] Object isn't a highlight source instance.", s.HIGHLIGHT_RANGE_FROZEN = "[HIGHLIGHT_RANGE] A highlight range must be frozen before render.", s.HIGHLIGHT_SOURCE_RECREATE = "[HIGHLIGHT_SOURCE] Recreate highlights from sources error.", s.HIGHLIGHT_SOURCE_NONE_RENDER = "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.";
      }(r.ERROR || (r.ERROR = {})), function(s) {
        s.CREATE = "selection:create", s.REMOVE = "selection:remove", s.MODIFY = "selection:modify", s.HOVER = "selection:hover", s.HOVER_OUT = "selection:hover-out", s.CLICK = "selection:click";
      }(r.EventType || (r.EventType = {})), function(s) {
        s.STORE = "from-store", s.INPUT = "from-input";
      }(r.CreateFrom || (r.CreateFrom = {})), function(s) {
        s.text = "text", s.span = "span";
      }(r.SelectedNodeType || (r.SelectedNodeType = {})), function(s) {
        s.touchend = "touchend", s.mouseup = "mouseup", s.touchstart = "touchstart", s.click = "click", s.mouseover = "mouseover";
      }(r.UserInputEvent || (r.UserInputEvent = {}));
    }, function(n, r, i) {
      var s = this && this.__read || function(c, u) {
        var l = typeof Symbol == "function" && c[Symbol.iterator];
        if (!l)
          return c;
        var d, f, p = l.call(c), h = [];
        try {
          for (; (u === void 0 || u-- > 0) && !(d = p.next()).done; )
            h.push(d.value);
        } catch (g) {
          f = { error: g };
        } finally {
          try {
            d && !d.done && (l = p.return) && l.call(p);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return h;
      }, o = this && this.__spread || function() {
        for (var c = [], u = 0; u < arguments.length; u++)
          c = c.concat(s(arguments[u]));
        return c;
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var a = function() {
        function c() {
          this.handlersMap = /* @__PURE__ */ Object.create(null);
        }
        return c.prototype.on = function(u, l) {
          return this.handlersMap[u] || (this.handlersMap[u] = []), this.handlersMap[u].push(l), this;
        }, c.prototype.off = function(u, l) {
          return this.handlersMap[u] && this.handlersMap[u].splice(this.handlersMap[u].indexOf(l) >>> 0, 1), this;
        }, c.prototype.emit = function(u) {
          for (var l = [], d = 1; d < arguments.length; d++)
            l[d - 1] = arguments[d];
          return this.handlersMap[u] && this.handlersMap[u].slice().forEach(function(f) {
            f.apply(void 0, o(l));
          }), this;
        }, c;
      }();
      r.default = a;
    }, function(n, r, i) {
      var s = this && this.__importDefault || function(u) {
        return u && u.__esModule ? u : { default: u };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var o = s(i(5)), a = i(9), c = function() {
        function u(l, d, f, p, h) {
          this.startMeta = l, this.endMeta = d, this.text = f, this.id = p, this.__isHighlightSource = {}, h && (this.extra = h);
        }
        return u.prototype.deSerialize = function(l, d) {
          var f = a.queryElementNode(this, l), p = f.start, h = f.end, g = a.getTextChildByOffset(p, this.startMeta.textOffset), v = a.getTextChildByOffset(h, this.endMeta.textOffset);
          if (!d.Serialize.Restore.isEmpty()) {
            var b = d.Serialize.Restore.call(this, g, v) || [];
            g = b[0] || g, v = b[1] || v;
          }
          return new o.default(g, v, this.text, this.id, !0);
        }, u;
      }();
      r.default = c;
    }, function(n, r, i) {
      var s = this && this.__values || function(l) {
        var d = typeof Symbol == "function" && Symbol.iterator, f = d && l[d], p = 0;
        if (f)
          return f.call(l);
        if (l && typeof l.length == "number")
          return { next: function() {
            return l && p >= l.length && (l = void 0), { value: l && l[p++], done: !l };
          } };
        throw new TypeError(d ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, o = this && this.__read || function(l, d) {
        var f = typeof Symbol == "function" && l[Symbol.iterator];
        if (!f)
          return l;
        var p, h, g = f.call(l), v = [];
        try {
          for (; (d === void 0 || d-- > 0) && !(p = g.next()).done; )
            v.push(p.value);
        } catch (b) {
          h = { error: b };
        } finally {
          try {
            p && !p.done && (f = g.return) && f.call(g);
          } finally {
            if (h)
              throw h.error;
          }
        }
        return v;
      }, a = this && this.__spread || function() {
        for (var l = [], d = 0; d < arguments.length; d++)
          l = l.concat(o(arguments[d]));
        return l;
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.hasClass = r.removeAllClass = r.removeClass = r.addClass = r.addEventListener = r.removeEventListener = r.forEach = r.getHighlightById = r.getHighlightsByRoot = r.getExtraHighlightId = r.getHighlightId = r.isHighlightWrapNode = void 0;
      var c = i(0);
      r.isHighlightWrapNode = function(l) {
        return !!l.dataset && !!l.dataset[c.CAMEL_DATASET_IDENTIFIER];
      };
      var u = function(l, d) {
        for (var f = !1, p = null; l; ) {
          if (r.isHighlightWrapNode(l) && (p = l), l === d) {
            f = !0;
            break;
          }
          l = l.parentNode;
        }
        return f ? p : null;
      };
      r.getHighlightId = function(l, d) {
        return (l = u(l, d)) ? l.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
      }, r.getExtraHighlightId = function(l, d) {
        return (l = u(l, d)) ? l.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA].split(c.ID_DIVISION).filter(function(f) {
          return f;
        }) : [];
      }, r.getHighlightsByRoot = function(l, d) {
        var f, p;
        Array.isArray(l) || (l = [l]);
        var h = [];
        try {
          for (var g = s(l), v = g.next(); !v.done; v = g.next()) {
            var b = v.value.querySelectorAll(d + "[data-" + c.DATASET_IDENTIFIER + "]");
            h.push.apply(h, b);
          }
        } catch (E) {
          f = { error: E };
        } finally {
          try {
            v && !v.done && (p = g.return) && p.call(g);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return h;
      }, r.getHighlightById = function(l, d, f) {
        var p, h, g = [], v = new RegExp("(" + d + "\\" + c.ID_DIVISION + "|\\" + c.ID_DIVISION + "?" + d + "$)"), b = l.querySelectorAll(f + "[data-" + c.DATASET_IDENTIFIER + "]");
        try {
          for (var E = s(b), T = E.next(); !T.done; T = E.next()) {
            var w = T.value;
            if (w.dataset[c.CAMEL_DATASET_IDENTIFIER] !== d) {
              var S = w.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
              v.test(S) && g.push(w);
            } else
              g.push(w);
          }
        } catch (D) {
          p = { error: D };
        } finally {
          try {
            T && !T.done && (h = E.return) && h.call(E);
          } finally {
            if (p)
              throw p.error;
          }
        }
        return g;
      }, r.forEach = function(l, d) {
        for (var f = 0; f < l.length; f++)
          d(l[f], f, l);
      }, r.removeEventListener = function(l, d, f) {
        l.removeEventListener(d, f);
      }, r.addEventListener = function(l, d, f) {
        return l.addEventListener(d, f), function() {
          r.removeEventListener(l, d, f);
        };
      }, r.addClass = function(l, d) {
        var f;
        Array.isArray(d) || (d = [d]), (f = l.classList).add.apply(f, a(d));
      }, r.removeClass = function(l, d) {
        l.classList.remove(d);
      }, r.removeAllClass = function(l) {
        l.className = "";
      }, r.hasClass = function(l, d) {
        return l.classList.contains(d);
      };
    }, function(n, r, i) {
      var s = this && this.__importDefault || function(p) {
        return p && p.__esModule ? p : { default: p };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var o = s(i(3)), a = i(1), c = i(11), u = s(i(6)), l = i(12), d = i(0), f = function() {
        function p(h, g, v, b, E) {
          E === void 0 && (E = !1), h.$node.nodeType === 3 && g.$node.nodeType === 3 || d.eventEmitter.emit(d.INTERNAL_ERROR_EVENT, { type: a.ERROR.RANGE_NODE_INVALID }), this.start = l.formatDomNode(h), this.end = l.formatDomNode(g), this.text = v, this.frozen = E, this.id = b;
        }
        return p.fromSelection = function(h) {
          var g = c.getDomRange();
          if (!g)
            return null;
          var v = { $node: g.startContainer, offset: g.startOffset }, b = { $node: g.endContainer, offset: g.endOffset }, E = g.toString(), T = h.call(v, b, E);
          return new p(v, b, E, T = T ?? u.default());
        }, p.prototype.serialize = function(h, g) {
          var v, b = l.getDomMeta(this.start.$node, this.start.offset, h), E = l.getDomMeta(this.end.$node, this.end.offset, h);
          return g.Serialize.RecordInfo.isEmpty() || (v = g.Serialize.RecordInfo.call(this.start, this.end, h)), this.frozen = !0, new o.default(b, E, this.text, this.id, v);
        }, p.removeDomRange = c.removeSelection, p;
      }();
      r.default = f;
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.default = function s(o) {
        return o ? (o ^ 16 * Math.random() >> o / 4).toString(16) : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, s);
      };
    }, function(n, r, i) {
      n.exports = i(8);
    }, function(n, r, i) {
      var s, o = this && this.__extends || (s = function(S, D) {
        return (s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(A, y) {
          A.__proto__ = y;
        } || function(A, y) {
          for (var N in y)
            Object.prototype.hasOwnProperty.call(y, N) && (A[N] = y[N]);
        })(S, D);
      }, function(S, D) {
        function A() {
          this.constructor = S;
        }
        s(S, D), S.prototype = D === null ? Object.create(D) : (A.prototype = D.prototype, new A());
      }), a = this && this.__assign || function() {
        return (a = Object.assign || function(S) {
          for (var D, A = 1, y = arguments.length; A < y; A++)
            for (var N in D = arguments[A])
              Object.prototype.hasOwnProperty.call(D, N) && (S[N] = D[N]);
          return S;
        }).apply(this, arguments);
      }, c = this && this.__importDefault || function(S) {
        return S && S.__esModule ? S : { default: S };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var u = c(i(2)), l = c(i(5)), d = c(i(3)), f = c(i(6)), p = c(i(13)), h = c(i(14)), g = c(i(16)), v = c(i(17)), b = i(0), E = i(1), T = i(4), w = function(S) {
        function D(A) {
          var y = S.call(this) || this;
          y.event = h.default(), y.run = function() {
            return T.addEventListener(y.options.$root, y.event.PointerEnd, y._handleSelection);
          }, y.stop = function() {
            T.removeEventListener(y.options.$root, y.event.PointerEnd, y._handleSelection);
          }, y.addClass = function(_, V) {
            y.getDoms(V).forEach(function(H) {
              T.addClass(H, _);
            });
          }, y.removeClass = function(_, V) {
            y.getDoms(V).forEach(function(H) {
              T.removeClass(H, _);
            });
          }, y.getIdByDom = function(_) {
            return T.getHighlightId(_, y.options.$root);
          }, y.getExtraIdByDom = function(_) {
            return T.getExtraHighlightId(_, y.options.$root);
          }, y.getDoms = function(_) {
            return _ ? T.getHighlightById(y.options.$root, _, y.options.wrapTag) : T.getHighlightsByRoot(y.options.$root, y.options.wrapTag);
          }, y.dispose = function() {
            var _ = y.options.$root;
            T.removeEventListener(_, y.event.PointerOver, y._handleHighlightHover), T.removeEventListener(_, y.event.PointerEnd, y._handleSelection), T.removeEventListener(_, y.event.PointerTap, y._handleHighlightClick), y.removeAll();
          }, y.setOption = function(_) {
            y.options = a(a({}, y.options), _), y.painter = new v.default({ $root: y.options.$root, wrapTag: y.options.wrapTag, className: y.options.style.className, exceptSelectors: y.options.exceptSelectors }, y.hooks);
          }, y.fromRange = function(_) {
            var V = { $node: _.startContainer, offset: _.startOffset }, H = { $node: _.endContainer, offset: _.endOffset }, z = _.toString(), I = y.hooks.Render.UUID.call(V, H, z);
            I = I ?? f.default();
            var R = new l.default(V, H, z, I);
            return R ? y._highlightFromHRange(R) : (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: E.ERROR.RANGE_INVALID }), null);
          }, y.fromStore = function(_, V, H, z, I) {
            var R = new d.default(_, V, H, z, I);
            try {
              return y._highlightFromHSource(R), R;
            } catch (x) {
              return b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: E.ERROR.HIGHLIGHT_SOURCE_RECREATE, error: x, detail: R }), null;
            }
          }, y._getHooks = function() {
            return { Render: { UUID: new p.default("Render.UUID"), SelectedNodes: new p.default("Render.SelectedNodes"), WrapNode: new p.default("Render.WrapNode") }, Serialize: { Restore: new p.default("Serialize.Restore"), RecordInfo: new p.default("Serialize.RecordInfo") }, Remove: { UpdateNodes: new p.default("Remove.UpdateNodes") } };
          }, y._highlightFromHRange = function(_) {
            var V = _.serialize(y.options.$root, y.hooks);
            return y.painter.highlightRange(_).length === 0 ? (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: E.ERROR.DOM_SELECTION_EMPTY }), null) : (y.cache.save(V), y.emit(E.EventType.CREATE, { sources: [V], type: E.CreateFrom.INPUT }, y), V);
          }, y._handleSelection = function() {
            var _ = l.default.fromSelection(y.hooks.Render.UUID);
            _ && (y._highlightFromHRange(_), l.default.removeDomRange());
          }, y._handleHighlightHover = function(_) {
            var V = _.target;
            if (!T.isHighlightWrapNode(V))
              return y._hoverId && y.emit(E.EventType.HOVER_OUT, { id: y._hoverId }, y, _), void (y._hoverId = null);
            var H = T.getHighlightId(V, y.options.$root);
            y._hoverId !== H && (y._hoverId && y.emit(E.EventType.HOVER_OUT, { id: y._hoverId }, y, _), y._hoverId = H, y.emit(E.EventType.HOVER, { id: y._hoverId }, y, _));
          }, y._handleError = function(_) {
            y.options.verbose && console.warn(_);
          }, y._handleHighlightClick = function(_) {
            var V = _.target;
            if (T.isHighlightWrapNode(V)) {
              var H = T.getHighlightId(V, y.options.$root);
              y.emit(E.EventType.CLICK, { id: H }, y, _);
            }
          }, y.options = b.getDefaultOptions(), y.hooks = y._getHooks(), y.setOption(A), y.cache = new g.default();
          var N = y.options.$root;
          return T.addEventListener(N, y.event.PointerOver, y._handleHighlightHover), T.addEventListener(N, y.event.PointerTap, y._handleHighlightClick), b.eventEmitter.on(b.INTERNAL_ERROR_EVENT, y._handleError), y;
        }
        return o(D, S), D.prototype.remove = function(A) {
          if (A) {
            var y = this.painter.removeHighlight(A);
            this.cache.remove(A), y && this.emit(E.EventType.REMOVE, { ids: [A] }, this);
          }
        }, D.prototype.removeAll = function() {
          this.painter.removeAllHighlight();
          var A = this.cache.removeAll();
          this.emit(E.EventType.REMOVE, { ids: A }, this);
        }, D.prototype._highlightFromHSource = function(A) {
          A === void 0 && (A = []);
          var y = this.painter.highlightSource(A);
          this.emit(E.EventType.CREATE, { sources: y, type: E.CreateFrom.STORE }, this), this.cache.save(A);
        }, D.event = E.EventType, D.isHighlightWrapNode = T.isHighlightWrapNode, D.isHighlightSource = function(A) {
          return !!A.__isHighlightSource;
        }, D;
      }(u.default);
      r.default = w;
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.queryElementNode = r.getTextChildByOffset = void 0;
      var s = i(0);
      r.getTextChildByOffset = function(o, a) {
        for (var c = [o], u = null, l = 0, d = 0; u = c.pop(); ) {
          for (var f = u.childNodes, p = f.length - 1; p >= 0; p--)
            c.push(f[p]);
          if (u.nodeType === 3 && (d = a - l, (l += u.textContent.length) >= a))
            break;
        }
        return u || (u = o), { $node: u, offset: d };
      }, r.queryElementNode = function(o, a) {
        return { start: o.startMeta.parentIndex === s.ROOT_IDX ? a : a.getElementsByTagName(o.startMeta.parentTagName)[o.startMeta.parentIndex], end: o.endMeta.parentIndex === s.ROOT_IDX ? a : a.getElementsByTagName(o.endMeta.parentTagName)[o.endMeta.parentIndex] };
      };
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.default = function(s) {
        return s.split("-").reduce(function(o, a, c) {
          return o + (c === 0 ? a : a[0].toUpperCase() + a.slice(1));
        }, "");
      };
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.removeSelection = r.getDomRange = void 0, r.getDomRange = function() {
        var s = window.getSelection();
        return s.isCollapsed ? (console.debug("no text selected"), null) : s.getRangeAt(0);
      }, r.removeSelection = function() {
        window.getSelection().removeAllRanges();
      };
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.formatDomNode = r.getDomMeta = void 0;
      var s = i(0);
      r.getDomMeta = function(o, a, c) {
        var u = function(f) {
          if (f instanceof HTMLElement && (!f.dataset || !f.dataset[s.CAMEL_DATASET_IDENTIFIER]))
            return f;
          for (var p = f.parentNode; p != null && p.dataset[s.CAMEL_DATASET_IDENTIFIER]; )
            p = p.parentNode;
          return p;
        }(o), l = u === c ? s.ROOT_IDX : function(f, p) {
          for (var h = f.tagName, g = p.getElementsByTagName(h), v = 0; v < g.length; v++)
            if (f === g[v])
              return v;
          return s.UNKNOWN_IDX;
        }(u, c), d = function(f, p) {
          for (var h = [f], g = null, v = 0; g = h.pop(); ) {
            for (var b = g.childNodes, E = b.length - 1; E >= 0; E--)
              h.push(b[E]);
            if (g.nodeType === 3 && g !== p)
              v += g.textContent.length;
            else if (g.nodeType === 3)
              break;
          }
          return v;
        }(u, o);
        return { parentTagName: u.tagName, parentIndex: l, textOffset: d + a };
      }, r.formatDomNode = function(o) {
        return o.$node.nodeType === 3 || o.$node.nodeType === 4 || o.$node.nodeType === 8 ? o : { $node: o.$node.childNodes[o.offset], offset: 0 };
      };
    }, function(n, r, i) {
      var s = this && this.__read || function(c, u) {
        var l = typeof Symbol == "function" && c[Symbol.iterator];
        if (!l)
          return c;
        var d, f, p = l.call(c), h = [];
        try {
          for (; (u === void 0 || u-- > 0) && !(d = p.next()).done; )
            h.push(d.value);
        } catch (g) {
          f = { error: g };
        } finally {
          try {
            d && !d.done && (l = p.return) && l.call(p);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return h;
      }, o = this && this.__spread || function() {
        for (var c = [], u = 0; u < arguments.length; u++)
          c = c.concat(s(arguments[u]));
        return c;
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var a = function() {
        function c(u) {
          this.name = "", this.ops = [], this.name = u;
        }
        return c.prototype.tap = function(u) {
          var l = this;
          return this.ops.indexOf(u) === -1 && this.ops.push(u), function() {
            l.remove(u);
          };
        }, c.prototype.remove = function(u) {
          var l = this.ops.indexOf(u);
          l < 0 || this.ops.splice(l, 1);
        }, c.prototype.isEmpty = function() {
          return this.ops.length === 0;
        }, c.prototype.call = function() {
          for (var u, l = [], d = 0; d < arguments.length; d++)
            l[d] = arguments[d];
          return this.ops.forEach(function(f) {
            u = f.apply(void 0, o(l));
          }), u;
        }, c;
      }();
      r.default = a;
    }, function(n, r, i) {
      var s = this && this.__importDefault || function(c) {
        return c && c.__esModule ? c : { default: c };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var o = i(1), a = s(i(15));
      r.default = function() {
        var c = a.default(window.navigator.userAgent);
        return { PointerEnd: c ? o.UserInputEvent.touchend : o.UserInputEvent.mouseup, PointerTap: c ? o.UserInputEvent.touchstart : o.UserInputEvent.click, PointerOver: c ? o.UserInputEvent.touchstart : o.UserInputEvent.mouseover };
      };
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 });
      var s = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
      r.default = function(o) {
        return s.test(o);
      };
    }, function(n, r, i) {
      var s, o = this && this.__extends || (s = function(f, p) {
        return (s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, g) {
          h.__proto__ = g;
        } || function(h, g) {
          for (var v in g)
            Object.prototype.hasOwnProperty.call(g, v) && (h[v] = g[v]);
        })(f, p);
      }, function(f, p) {
        function h() {
          this.constructor = f;
        }
        s(f, p), f.prototype = p === null ? Object.create(p) : (h.prototype = p.prototype, new h());
      }), a = this && this.__values || function(f) {
        var p = typeof Symbol == "function" && Symbol.iterator, h = p && f[p], g = 0;
        if (h)
          return h.call(f);
        if (f && typeof f.length == "number")
          return { next: function() {
            return f && g >= f.length && (f = void 0), { value: f && f[g++], done: !f };
          } };
        throw new TypeError(p ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, c = this && this.__importDefault || function(f) {
        return f && f.__esModule ? f : { default: f };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var u = c(i(2)), l = i(1), d = function(f) {
        function p() {
          var h = f !== null && f.apply(this, arguments) || this;
          return h._data = /* @__PURE__ */ new Map(), h;
        }
        return o(p, f), Object.defineProperty(p.prototype, "data", { get: function() {
          return this.getAll();
        }, set: function(h) {
          throw l.ERROR.CACHE_SET_ERROR;
        }, enumerable: !1, configurable: !0 }), p.prototype.save = function(h) {
          var g = this;
          Array.isArray(h) ? h.forEach(function(v) {
            return g._data.set(v.id, v);
          }) : this._data.set(h.id, h);
        }, p.prototype.get = function(h) {
          return this._data.get(h);
        }, p.prototype.remove = function(h) {
          this._data.delete(h);
        }, p.prototype.getAll = function() {
          var h, g, v = [];
          try {
            for (var b = a(this._data), E = b.next(); !E.done; E = b.next()) {
              var T = E.value;
              v.push(T[1]);
            }
          } catch (w) {
            h = { error: w };
          } finally {
            try {
              E && !E.done && (g = b.return) && g.call(b);
            } finally {
              if (h)
                throw h.error;
            }
          }
          return v;
        }, p.prototype.removeAll = function() {
          var h, g, v = [];
          try {
            for (var b = a(this._data), E = b.next(); !E.done; E = b.next()) {
              var T = E.value;
              v.push(T[0]);
            }
          } catch (w) {
            h = { error: w };
          } finally {
            try {
              E && !E.done && (g = b.return) && g.call(b);
            } finally {
              if (h)
                throw h.error;
            }
          }
          return this._data = /* @__PURE__ */ new Map(), v;
        }, p;
      }(u.default);
      r.default = d;
    }, function(n, r, i) {
      var s = this && this.__values || function(v) {
        var b = typeof Symbol == "function" && Symbol.iterator, E = b && v[b], T = 0;
        if (E)
          return E.call(v);
        if (v && typeof v.length == "number")
          return { next: function() {
            return v && T >= v.length && (v = void 0), { value: v && v[T++], done: !v };
          } };
        throw new TypeError(b ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, o = this && this.__read || function(v, b) {
        var E = typeof Symbol == "function" && v[Symbol.iterator];
        if (!E)
          return v;
        var T, w, S = E.call(v), D = [];
        try {
          for (; (b === void 0 || b-- > 0) && !(T = S.next()).done; )
            D.push(T.value);
        } catch (A) {
          w = { error: A };
        } finally {
          try {
            T && !T.done && (E = S.return) && E.call(S);
          } finally {
            if (w)
              throw w.error;
          }
        }
        return D;
      }, a = this && this.__spread || function() {
        for (var v = [], b = 0; b < arguments.length; b++)
          v = v.concat(o(arguments[b]));
        return v;
      }, c = this && this.__importDefault || function(v) {
        return v && v.__esModule ? v : { default: v };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var u = c(i(3)), l = i(18), d = i(4), f = i(1), p = i(20), h = i(0), g = function() {
        function v(b, E) {
          this.options = { $root: b.$root, wrapTag: b.wrapTag, exceptSelectors: b.exceptSelectors, className: b.className }, this.hooks = E, p.initDefaultStylesheet();
        }
        return v.prototype.highlightRange = function(b) {
          var E = this;
          if (!b.frozen)
            throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
          var T = this.options, w = T.$root, S = T.className, D = T.exceptSelectors, A = this.hooks, y = l.getSelectedNodes(w, b.start, b.end, D);
          return A.Render.SelectedNodes.isEmpty() || (y = A.Render.SelectedNodes.call(b.id, y) || []), y.map(function(N) {
            var _ = l.wrapHighlight(N, b, S, E.options.wrapTag);
            return A.Render.WrapNode.isEmpty() || (_ = A.Render.WrapNode.call(b.id, _)), _;
          });
        }, v.prototype.highlightSource = function(b) {
          var E = this, T = Array.isArray(b) ? b : [b], w = [];
          return T.forEach(function(S) {
            if (S instanceof u.default) {
              var D = S.deSerialize(E.options.$root, E.hooks);
              E.highlightRange(D).length > 0 ? w.push(S) : h.eventEmitter.emit(h.INTERNAL_ERROR_EVENT, { type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER, detail: S });
            } else
              h.eventEmitter.emit(h.INTERNAL_ERROR_EVENT, { type: f.ERROR.SOURCE_TYPE_ERROR });
          }), w;
        }, v.prototype.removeHighlight = function(b) {
          var E, T, w = new RegExp("(" + b + "\\" + h.ID_DIVISION + "|\\" + h.ID_DIVISION + "?" + b + "$)"), S = this.hooks, D = this.options.wrapTag, A = document.querySelectorAll(D + "[data-" + h.DATASET_IDENTIFIER + "]"), y = [], N = [], _ = [];
          try {
            for (var V = s(A), H = V.next(); !H.done; H = V.next()) {
              var z = H.value, I = z.dataset[h.CAMEL_DATASET_IDENTIFIER], R = z.dataset[h.CAMEL_DATASET_IDENTIFIER_EXTRA];
              I !== b || R ? I === b ? N.push(z) : I !== b && w.test(R) && _.push(z) : y.push(z);
            }
          } catch (x) {
            E = { error: x };
          } finally {
            try {
              H && !H.done && (T = V.return) && T.call(V);
            } finally {
              if (E)
                throw E.error;
            }
          }
          return y.forEach(function(x) {
            var O = x.parentNode, P = document.createDocumentFragment();
            d.forEach(x.childNodes, function(B) {
              return P.appendChild(B.cloneNode(!1));
            });
            var L = x.previousSibling, k = x.nextSibling;
            O.replaceChild(P, x), l.normalizeSiblingText(L, !0), l.normalizeSiblingText(k, !1), S.Remove.UpdateNodes.call(b, x, "remove");
          }), N.forEach(function(x) {
            var O = x.dataset, P = O[h.CAMEL_DATASET_IDENTIFIER_EXTRA].split(h.ID_DIVISION), L = P.shift(), k = document.querySelector(D + "[data-" + h.DATASET_IDENTIFIER + '="' + L + '"]');
            k && (d.removeAllClass(x), d.addClass(x, a(k.classList))), O[h.CAMEL_DATASET_IDENTIFIER] = L, O[h.CAMEL_DATASET_IDENTIFIER_EXTRA] = P.join(h.ID_DIVISION), S.Remove.UpdateNodes.call(b, x, "id-update");
          }), _.forEach(function(x) {
            var O = x.dataset[h.CAMEL_DATASET_IDENTIFIER_EXTRA];
            x.dataset[h.CAMEL_DATASET_IDENTIFIER_EXTRA] = O.replace(w, ""), S.Remove.UpdateNodes.call(b, x, "extra-update");
          }), y.length + N.length + _.length !== 0;
        }, v.prototype.removeAllHighlight = function() {
          var b = this.options, E = b.wrapTag, T = b.$root;
          d.getHighlightsByRoot(T, E).forEach(function(w) {
            var S = w.parentNode, D = document.createDocumentFragment();
            d.forEach(w.childNodes, function(A) {
              return D.appendChild(A.cloneNode(!1));
            }), S.replaceChild(D, w);
          });
        }, v;
      }();
      r.default = g;
    }, function(n, r, i) {
      var s = this && this.__read || function(h, g) {
        var v = typeof Symbol == "function" && h[Symbol.iterator];
        if (!v)
          return h;
        var b, E, T = v.call(h), w = [];
        try {
          for (; (g === void 0 || g-- > 0) && !(b = T.next()).done; )
            w.push(b.value);
        } catch (S) {
          E = { error: S };
        } finally {
          try {
            b && !b.done && (v = T.return) && v.call(T);
          } finally {
            if (E)
              throw E.error;
          }
        }
        return w;
      }, o = this && this.__spread || function() {
        for (var h = [], g = 0; g < arguments.length; g++)
          h = h.concat(s(arguments[g]));
        return h;
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.normalizeSiblingText = r.wrapHighlight = r.getSelectedNodes = void 0;
      var a = i(1), c = i(4), u = i(0), l = i(19), d = function(h, g) {
        if (!h)
          return !1;
        if (/^\./.test(g)) {
          var v = g.replace(/^\./, "");
          return h && c.hasClass(h, v);
        }
        if (/^#/.test(g)) {
          var b = g.replace(/^#/, "");
          return h && h.id === b;
        }
        var E = g.toUpperCase();
        return h && h.tagName === E;
      };
      r.getSelectedNodes = function(h, g, v, b) {
        var E = g.$node, T = v.$node, w = g.offset, S = v.offset;
        if (E === T && E instanceof Text)
          return function(I, R, x, O) {
            for (var P = I, L = function(B) {
              return O == null ? void 0 : O.some(function(K) {
                return d(B, K);
              });
            }; P; ) {
              if (P.nodeType === 1 && L(P))
                return [];
              P = P.parentNode;
            }
            I.splitText(R);
            var k = I.nextSibling;
            return k.splitText(x - R), [{ $node: k, type: a.SelectedNodeType.text, splitType: a.SplitType.both }];
          }(E, w, S, b);
        for (var D = [h], A = [], y = function(I) {
          return b == null ? void 0 : b.some(function(R) {
            return d(I, R);
          });
        }, N = !1, _ = null; _ = D.pop(); )
          if (_.nodeType !== 1 || !y(_)) {
            for (var V = _.childNodes, H = V.length - 1; H >= 0; H--)
              D.push(V[H]);
            if (_ === E) {
              if (_.nodeType === 3) {
                _.splitText(w);
                var z = _.nextSibling;
                A.push({ $node: z, type: a.SelectedNodeType.text, splitType: a.SplitType.head });
              }
              N = !0;
            } else {
              if (_ === T) {
                _.nodeType === 3 && ((z = _).splitText(S), A.push({ $node: z, type: a.SelectedNodeType.text, splitType: a.SplitType.tail }));
                break;
              }
              N && _.nodeType === 3 && A.push({ $node: _, type: a.SelectedNodeType.text, splitType: a.SplitType.none });
            }
          }
        return A;
      };
      var f = function(h, g) {
        var v = Array.isArray(g) ? g : [g];
        return (v = v.length === 0 ? [u.getDefaultOptions().style.className] : v).forEach(function(b) {
          c.addClass(h, b);
        }), h;
      }, p = function(h) {
        return !h || !h.textContent;
      };
      r.wrapHighlight = function(h, g, v, b) {
        var E = h.$node.parentNode, T = h.$node.previousSibling, w = h.$node.nextSibling;
        return c.isHighlightWrapNode(E) ? !c.isHighlightWrapNode(E) || p(T) && p(w) ? function(S, D, A) {
          var y = S.$node.parentNode, N = y;
          c.removeAllClass(N), f(N, A);
          var _ = y.dataset, V = _[u.CAMEL_DATASET_IDENTIFIER];
          return _[u.CAMEL_DATASET_IDENTIFIER] = D.id, _[u.CAMEL_DATASET_IDENTIFIER_EXTRA] = _[u.CAMEL_DATASET_IDENTIFIER_EXTRA] ? V + u.ID_DIVISION + _[u.CAMEL_DATASET_IDENTIFIER_EXTRA] : V, N;
        }(h, g, v) : function(S, D, A, y) {
          var N = document.createElement(y), _ = S.$node.parentNode, V = S.$node.previousSibling, H = S.$node.nextSibling, z = document.createDocumentFragment(), I = _.dataset[u.CAMEL_DATASET_IDENTIFIER], R = _.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA], x = R ? I + u.ID_DIVISION + R : I;
          N.setAttribute("data-" + u.DATASET_IDENTIFIER, D.id), N.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, x), N.appendChild(S.$node.cloneNode(!1));
          var O, P = !1, L = !1;
          V && ((k = _.cloneNode(!1)).textContent = V.textContent, z.appendChild(k), P = !0);
          var k, B = [];
          return Array.isArray(A) ? B.push.apply(B, o(A)) : B.push(A), f(N, l.unique(B)), z.appendChild(N), H && ((k = _.cloneNode(!1)).textContent = H.textContent, z.appendChild(k), L = !0), O = P && L ? a.SplitType.both : P ? a.SplitType.head : L ? a.SplitType.tail : a.SplitType.none, N.setAttribute("data-" + u.DATASET_SPLIT_TYPE, O), _.parentNode.replaceChild(z, _), N;
        }(h, g, v, b) : function(S, D, A, y) {
          var N = document.createElement(y);
          return f(N, A), N.appendChild(S.$node.cloneNode(!1)), S.$node.parentNode.replaceChild(N, S.$node), N.setAttribute("data-" + u.DATASET_IDENTIFIER, D.id), N.setAttribute("data-" + u.DATASET_SPLIT_TYPE, S.splitType), N.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, ""), N;
        }(h, g, v, b);
      }, r.normalizeSiblingText = function(h, g) {
        if (g === void 0 && (g = !0), h && h.nodeType === 3) {
          var v = g ? h.nextSibling : h.previousSibling;
          if (v.nodeType === 3) {
            var b = v.nodeValue;
            h.nodeValue = g ? h.nodeValue + b : b + h.nodeValue, v.parentNode.removeChild(v);
          }
        }
      };
    }, function(n, r, i) {
      var s = this && this.__values || function(o) {
        var a = typeof Symbol == "function" && Symbol.iterator, c = a && o[a], u = 0;
        if (c)
          return c.call(o);
        if (o && typeof o.length == "number")
          return { next: function() {
            return o && u >= o.length && (o = void 0), { value: o && o[u++], done: !o };
          } };
        throw new TypeError(a ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.unique = void 0, r.unique = function(o) {
        var a, c, u = [];
        try {
          for (var l = s(o), d = l.next(); !d.done; d = l.next()) {
            var f = d.value;
            u.indexOf(f) === -1 && u.push(f);
          }
        } catch (p) {
          a = { error: p };
        } finally {
          try {
            d && !d.done && (c = l.return) && c.call(l);
          } finally {
            if (a)
              throw a.error;
          }
        }
        return u;
      };
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.initDefaultStylesheet = void 0;
      var s = i(0);
      r.initDefaultStylesheet = function() {
        var o = s.STYLESHEET_ID, a = document.getElementById(o);
        if (!a) {
          var c = document.createTextNode(s.getStylesheet());
          (a = document.createElement("style")).id = o, a.appendChild(c), document.head.appendChild(a);
        }
        return a;
      };
    }]).default;
  });
})(_a);
var sp = _a.exports;
const Sa = /* @__PURE__ */ Ls(sp), tt = new Sa({
  style: {
    className: qh
  }
  // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
}), qr = new Sa({
  style: {
    className: Zh
  }
  // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
}), xa = (e, t) => t.filter(
  (n) => {
    var r;
    return ((r = n.$node.nodeValue) == null ? void 0 : r.trim()) !== "";
  }
), wa = (e, t, n) => {
  const r = t, i = n, s = ["BR", "HR"];
  return s.includes(r.$node.nodeName) && r.$node.parentNode && (r.$node = r.$node.parentNode), s.includes(i.$node.nodeName) && i.$node.parentNode && (i.$node = i.$node.parentNode), [r, i];
};
tt.hooks.Render.SelectedNodes.tap(xa);
tt.hooks.Serialize.Restore.tap(wa);
qr.hooks.Render.SelectedNodes.tap(xa);
qr.hooks.Serialize.Restore.tap(wa);
tt.on("selection:hover", ({ id: e }) => {
  tt.addClass(Ms, e);
}).on("selection:hover-out", ({ id: e }) => {
  tt.removeClass(Ms, e);
});
const op = tt, ap = (e) => e.highlight ? JSON.parse(e.highlight) : null, lp = (e) => {
  const t = ap(e);
  t && (tt.remove(t.id), qr.remove(t.id));
}, cp = [
  "img",
  "a",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "caption",
  "code",
  "caption",
  "td",
  "button",
  "input",
  "label",
  "select",
  "textarea"
], up = (e) => e.hasAttribute("altimate-anchor") && e.id !== `${ot}highlight-blocker`, dp = (e) => document != null && document.body ? document.body.contains(e) : (console.error(
  "Error in utils isElementInsideBody: document or document.body is not available"
), !1), fp = (e, t, n, r, i, s) => i > e && i < t && s > n && s < r, hp = (e, t) => {
  var o, a;
  const n = window.getSelection();
  if (!n)
    return { offset: 0 };
  const { anchorNode: r, anchorOffset: i } = n, s = (o = r == null ? void 0 : r.parentElement) == null ? void 0 : o.getBoundingClientRect();
  return s && !fp(
    s.x,
    s.y,
    s.x + s.width,
    s.y + s.height,
    e,
    t
  ) ? { offset: 0 } : {
    offset: i,
    text: (a = r == null ? void 0 : r.textContent) == null ? void 0 : a.substring(
      Math.max(i - 10, 0),
      i + 10
    )
  };
}, pp = (e) => {
  if (cp.includes(e.tagName.toLowerCase()) || e.nodeType === Node.TEXT_NODE)
    return !0;
  {
    let t = !1;
    return e.childNodes.forEach((n) => {
      var r;
      n.nodeType === Node.TEXT_NODE && ((r = n.textContent) == null ? void 0 : r.trim()) !== "" && (t = !0);
    }), t;
  }
}, Ns = (e, t) => {
  try {
    const n = document.elementsFromPoint(e, t);
    let r = [], i = !1;
    n.forEach((o) => {
      up(o) ? (r = [], i = !0) : dp(o) && pp(o) && r.push(o);
    });
    let s = 0;
    return !r.length || i ? null : (r.forEach((o, a) => {
      o.tagName.toLowerCase() === "svg" && (s = a);
    }), r[s]);
  } catch (n) {
    return console.error(
      "Error in CommentService getBackgroundElement: ",
      void 0,
      n
    ), null;
  }
}, mp = (e) => {
  let t = e.startContainer === document.body ? e.endContainer : e.startContainer;
  return t = t.nodeType === Node.TEXT_NODE && t.parentNode ? t.parentNode : t, t;
}, Zr = (e) => {
  let t, n, r, i;
  try {
    if (e) {
      if (!e || e.nodeType != 1)
        return "";
      if (e.id && ((t = e == null ? void 0 : e.tagName) === null || t === void 0 ? void 0 : t.toLowerCase()) !== "svg" && ((n = document.querySelectorAll(`[id='${e.id}']`)) === null || n === void 0 ? void 0 : n.length) === 1)
        return "//*[@id='" + e.id + "']";
      let s = [].filter.call(
        !((r = e.parentNode) === null || r === void 0) && r.children ? (i = e.parentNode) === null || i === void 0 ? void 0 : i.children : [],
        function(o) {
          return o.tagName == e.tagName;
        }
      );
      return Zr(e.parentElement) + "/" + e.tagName.toLowerCase() + // @ts-expect-error valid
      (s.length > 1 ? "[" + ([].indexOf.call(s, e) + 1) + "]" : "");
    }
    return "";
  } catch (s) {
    return console.error("Error in DomService calculateXPath:", void 0, s), null;
  }
}, gp = () => {
  const [e, t] = he(null), [n, r] = he(null), i = xe(() => {
    console.log("resetHighlights"), e && lp(e), r(null), t(null);
  }, [e]), s = xe(async () => {
    const a = document.getSelection();
    if (!a || !a.rangeCount)
      return i(), null;
    const c = a.getRangeAt(0), u = c.startContainer.parentNode, l = c.endContainer.parentNode;
    if (!u || !l)
      return i(), null;
    const d = mp(c);
    if (!d)
      return i(), null;
    let f = d;
    f.tagName.toLocaleLowerCase() === Jh && f.parentElement && (f = f.parentElement);
    const p = Zr(f);
    if (!p || p.includes(ot))
      return null;
    const { width: h } = c.getBoundingClientRect();
    if (!h || !c.toString().trim())
      return i(), null;
    const {
      x: g,
      y: v,
      height: b,
      width: E
    } = c.getClientRects()[0], T = hp(g, v), w = {
      xpath: p,
      left_percentage: 100,
      top_percentage: 0,
      anchor_text: (T == null ? void 0 : T.text) ?? null,
      text_offset: T.offset,
      highlight_text: c.toString(),
      highlight: JSON.stringify(op.fromRange(c)),
      rectangle_height: null,
      rectangle_width: null,
      page_url: window.location.href
    };
    r({
      x: g + window.scrollX + E,
      y: v + window.scrollY + b
    }), t(w);
  }, [i]), o = xe(() => {
    i();
  }, [i]);
  return ke(() => () => {
  }, [o, s, i]), {
    getHighlightedSelectionData: () => e,
    pos: n,
    onSelectionEnd: s
  };
}, yp = js(
  ({ onClick: e, rect: t }, n) => /* @__PURE__ */ j.jsx(ba, { children: t && /* @__PURE__ */ j.jsx(
    Hh.div,
    {
      ref: n,
      onClick: (r) => e(r.nativeEvent),
      id: `${ot}highlight-blocker`,
      style: {
        position: "absolute",
        pointerEvents: "all",
        top: `${t.top + window.scrollY}px`,
        left: `${t.left + window.scrollX}px`,
        width: `${t.width}px`,
        height: `${t.height}px`,
        borderRadius: "2px",
        backgroundColor: "rgba(212, 233, 255, 0.8)",
        outline: "2px solid #007aff",
        zIndex: 1,
        transition: "all 0.15s cubic-bezier(0, 0, 1, 1)"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  ) })
), vp = () => {
  const e = Ge(), [t, n] = he(!1), [r, i] = he(null), s = xe((u) => {
    const l = Ns(u.clientX, u.clientY);
    i(
      l ? l.getBoundingClientRect() : null
    );
  }, []);
  ke(() => (document.body.removeEventListener("pointermove", s), t && document.body.addEventListener("pointermove", s), () => {
    document.body.removeEventListener("pointermove", s);
  }), [t, s]);
  const o = xe((u) => {
    u && console.log(u);
  }, []), a = xe(
    (u) => {
      u.preventDefault(), u.stopPropagation();
      const l = Ns(u.clientX, u.clientY) || u.target, d = Zr(l);
      if (!d)
        return;
      e(qs({
        xpath: d
      })), n(!1);
    },
    [e]
  ), c = (u) => {
    u.stopPropagation(), u.preventDefault(), n(!0);
  };
  return /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
    t && /* @__PURE__ */ j.jsx(
      yp,
      {
        onClick: a,
        rect: r,
        ref: o
      }
    ),
    /* @__PURE__ */ j.jsx(yt, { onClick: c, style: { zIndex: 1, marginRight: "1rem" }, children: "Add comment" })
  ] });
}, Ep = vp, Tp = el(() => import("./DbtDocsRenderer.js")), bp = () => {
  const { loading: e, shareDetails: t } = ip(), n = Ge(), { getHighlightedSelectionData: r, pos: i, onSelectionEnd: s } = gp(), o = () => {
    const a = r();
    a && n(qs(a));
  };
  return e ? /* @__PURE__ */ j.jsx("div", { children: "Loading..." }) : !(t != null && t.catalog_presigned_url) || !(t != null && t.manifest_presigned_url) ? /* @__PURE__ */ j.jsx("div", { children: "Unable to load required artifacts. Please try again." }) : /* @__PURE__ */ j.jsxs("div", { children: [
    /* @__PURE__ */ j.jsxs("div", { className: "d-flex justify-content-end mb-2", children: [
      /* @__PURE__ */ j.jsx(Ep, {}),
      /* @__PURE__ */ j.jsx(rp, {})
    ] }),
    /* @__PURE__ */ j.jsx(
      Tp,
      {
        shareDetails: t,
        onSelectionEnd: s
      }
    ),
    i ? /* @__PURE__ */ j.jsx(tp, { pos: i, onAddComment: o }) : null
  ] });
}, _p = bp, Sp = ({ shareId: e, userId: t }) => /* @__PURE__ */ j.jsx(Ic, { shareId: e, userId: t, children: /* @__PURE__ */ j.jsx(_p, {}) }), Op = Sp;
export {
  Vt as A,
  Op as D,
  At as c,
  j
};
