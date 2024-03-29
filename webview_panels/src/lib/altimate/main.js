import './main.css';
import * as ue from "react";
import cn, { createContext as rt, useLayoutEffect as za, useEffect as We, useContext as ne, useRef as we, useInsertionEffect as As, useCallback as Ve, useMemo as tt, forwardRef as Is, Fragment as Wa, createElement as Ya, useId as ur, useState as he, cloneElement as Ga, Children as Ka, isValidElement as Xa, useReducer as qa, lazy as Za } from "react";
import { Button as it, CardTitle as Ja, Card as Os, CardBody as Ms, Input as Qa } from "reactstrap";
var el = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ns(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Un = { exports: {} }, Et = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oi;
function tl() {
  if (oi)
    return Et;
  oi = 1;
  var e = cn, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(a, l, u) {
    var c, f = {}, d = null, p = null;
    u !== void 0 && (d = "" + u), l.key !== void 0 && (d = "" + l.key), l.ref !== void 0 && (p = l.ref);
    for (c in l)
      r.call(l, c) && !s.hasOwnProperty(c) && (f[c] = l[c]);
    if (a && a.defaultProps)
      for (c in l = a.defaultProps, l)
        f[c] === void 0 && (f[c] = l[c]);
    return { $$typeof: t, type: a, key: d, ref: p, props: f, _owner: i.current };
  }
  return Et.Fragment = n, Et.jsx = o, Et.jsxs = o, Et;
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
var ai;
function nl() {
  return ai || (ai = 1, process.env.NODE_ENV !== "production" && function() {
    var e = cn, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = Symbol.iterator, g = "@@iterator";
    function y(m) {
      if (m === null || typeof m != "object")
        return null;
      var C = h && m[h] || m[g];
      return typeof C == "function" ? C : null;
    }
    var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(m) {
      {
        for (var C = arguments.length, M = new Array(C > 1 ? C - 1 : 0), $ = 1; $ < C; $++)
          M[$ - 1] = arguments[$];
        E("error", m, M);
      }
    }
    function E(m, C, M) {
      {
        var $ = b.ReactDebugCurrentFrame, Y = $.getStackAddendum();
        Y !== "" && (C += "%s", M = M.concat([Y]));
        var G = M.map(function(W) {
          return String(W);
        });
        G.unshift("Warning: " + C), Function.prototype.apply.call(console[m], console, G);
      }
    }
    var w = !1, _ = !1, P = !1, A = !1, v = !1, N;
    N = Symbol.for("react.module.reference");
    function S(m) {
      return !!(typeof m == "string" || typeof m == "function" || m === r || m === s || v || m === i || m === u || m === c || A || m === p || w || _ || P || typeof m == "object" && m !== null && (m.$$typeof === d || m.$$typeof === f || m.$$typeof === o || m.$$typeof === a || m.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      m.$$typeof === N || m.getModuleId !== void 0));
    }
    function V(m, C, M) {
      var $ = m.displayName;
      if ($)
        return $;
      var Y = C.displayName || C.name || "";
      return Y !== "" ? M + "(" + Y + ")" : M;
    }
    function H(m) {
      return m.displayName || "Context";
    }
    function z(m) {
      if (m == null)
        return null;
      if (typeof m.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof m == "function")
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
        case c:
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
          case l:
            return V(m, m.render, "ForwardRef");
          case f:
            var $ = m.displayName || null;
            return $ !== null ? $ : z(m.type) || "Memo";
          case d: {
            var Y = m, G = Y._payload, W = Y._init;
            try {
              return z(W(G));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, R = 0, x, O, D, k, L, B, K;
    function q() {
    }
    q.__reactDisabledLog = !0;
    function re() {
      {
        if (R === 0) {
          x = console.log, O = console.info, D = console.warn, k = console.error, L = console.group, B = console.groupCollapsed, K = console.groupEnd;
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
    function fe() {
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
              value: D
            }),
            error: I({}, m, {
              value: k
            }),
            group: I({}, m, {
              value: L
            }),
            groupCollapsed: I({}, m, {
              value: B
            }),
            groupEnd: I({}, m, {
              value: K
            })
          });
        }
        R < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _e = b.ReactCurrentDispatcher, be;
    function xe(m, C, M) {
      {
        if (be === void 0)
          try {
            throw Error();
          } catch (Y) {
            var $ = Y.stack.trim().match(/\n( *(at )?)/);
            be = $ && $[1] || "";
          }
        return `
` + be + m;
      }
    }
    var Se = !1, te;
    {
      var Re = typeof WeakMap == "function" ? WeakMap : Map;
      te = new Re();
    }
    function Le(m, C) {
      if (!m || Se)
        return "";
      {
        var M = te.get(m);
        if (M !== void 0)
          return M;
      }
      var $;
      Se = !0;
      var Y = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var G;
      G = _e.current, _e.current = null, re();
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
            } catch (Pe) {
              $ = Pe;
            }
            Reflect.construct(m, [], W);
          } else {
            try {
              W.call();
            } catch (Pe) {
              $ = Pe;
            }
            m.call(W.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Pe) {
            $ = Pe;
          }
          m();
        }
      } catch (Pe) {
        if (Pe && $ && typeof Pe.stack == "string") {
          for (var U = Pe.stack.split(`
`), ce = $.stack.split(`
`), Z = U.length - 1, ee = ce.length - 1; Z >= 1 && ee >= 0 && U[Z] !== ce[ee]; )
            ee--;
          for (; Z >= 1 && ee >= 0; Z--, ee--)
            if (U[Z] !== ce[ee]) {
              if (Z !== 1 || ee !== 1)
                do
                  if (Z--, ee--, ee < 0 || U[Z] !== ce[ee]) {
                    var ye = `
` + U[Z].replace(" at new ", " at ");
                    return m.displayName && ye.includes("<anonymous>") && (ye = ye.replace("<anonymous>", m.displayName)), typeof m == "function" && te.set(m, ye), ye;
                  }
                while (Z >= 1 && ee >= 0);
              break;
            }
        }
      } finally {
        Se = !1, _e.current = G, fe(), Error.prepareStackTrace = Y;
      }
      var ct = m ? m.displayName || m.name : "", si = ct ? xe(ct) : "";
      return typeof m == "function" && te.set(m, si), si;
    }
    function at(m, C, M) {
      return Le(m, !1);
    }
    function _a(m) {
      var C = m.prototype;
      return !!(C && C.isReactComponent);
    }
    function $t(m, C, M) {
      if (m == null)
        return "";
      if (typeof m == "function")
        return Le(m, _a(m));
      if (typeof m == "string")
        return xe(m);
      switch (m) {
        case u:
          return xe("Suspense");
        case c:
          return xe("SuspenseList");
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case l:
            return at(m.render);
          case f:
            return $t(m.type, C, M);
          case d: {
            var $ = m, Y = $._payload, G = $._init;
            try {
              return $t(G(Y), C, M);
            } catch {
            }
          }
        }
      return "";
    }
    var Bt = Object.prototype.hasOwnProperty, Gr = {}, Kr = b.ReactDebugCurrentFrame;
    function Ht(m) {
      if (m) {
        var C = m._owner, M = $t(m.type, m._source, C ? C.type : null);
        Kr.setExtraStackFrame(M);
      } else
        Kr.setExtraStackFrame(null);
    }
    function xa(m, C, M, $, Y) {
      {
        var G = Function.call.bind(Bt);
        for (var W in m)
          if (G(m, W)) {
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
            U && !(U instanceof Error) && (Ht(Y), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", $ || "React class", M, W, typeof U), Ht(null)), U instanceof Error && !(U.message in Gr) && (Gr[U.message] = !0, Ht(Y), T("Failed %s type: %s", M, U.message), Ht(null));
          }
      }
    }
    var Ra = Array.isArray;
    function Sn(m) {
      return Ra(m);
    }
    function wa(m) {
      {
        var C = typeof Symbol == "function" && Symbol.toStringTag, M = C && m[Symbol.toStringTag] || m.constructor.name || "Object";
        return M;
      }
    }
    function Ca(m) {
      try {
        return Xr(m), !1;
      } catch {
        return !0;
      }
    }
    function Xr(m) {
      return "" + m;
    }
    function qr(m) {
      if (Ca(m))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wa(m)), Xr(m);
    }
    var Tt = b.ReactCurrentOwner, Da = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Zr, Jr, _n;
    _n = {};
    function Pa(m) {
      if (Bt.call(m, "ref")) {
        var C = Object.getOwnPropertyDescriptor(m, "ref").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return m.ref !== void 0;
    }
    function Aa(m) {
      if (Bt.call(m, "key")) {
        var C = Object.getOwnPropertyDescriptor(m, "key").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return m.key !== void 0;
    }
    function Ia(m, C) {
      if (typeof m.ref == "string" && Tt.current && C && Tt.current.stateNode !== C) {
        var M = z(Tt.current.type);
        _n[M] || (T('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', z(Tt.current.type), m.ref), _n[M] = !0);
      }
    }
    function Oa(m, C) {
      {
        var M = function() {
          Zr || (Zr = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        M.isReactWarning = !0, Object.defineProperty(m, "key", {
          get: M,
          configurable: !0
        });
      }
    }
    function Ma(m, C) {
      {
        var M = function() {
          Jr || (Jr = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        M.isReactWarning = !0, Object.defineProperty(m, "ref", {
          get: M,
          configurable: !0
        });
      }
    }
    var Na = function(m, C, M, $, Y, G, W) {
      var U = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: m,
        key: C,
        ref: M,
        props: W,
        // Record the component responsible for creating this element.
        _owner: G
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
        value: Y
      }), Object.freeze && (Object.freeze(U.props), Object.freeze(U)), U;
    };
    function Va(m, C, M, $, Y) {
      {
        var G, W = {}, U = null, ce = null;
        M !== void 0 && (qr(M), U = "" + M), Aa(C) && (qr(C.key), U = "" + C.key), Pa(C) && (ce = C.ref, Ia(C, Y));
        for (G in C)
          Bt.call(C, G) && !Da.hasOwnProperty(G) && (W[G] = C[G]);
        if (m && m.defaultProps) {
          var Z = m.defaultProps;
          for (G in Z)
            W[G] === void 0 && (W[G] = Z[G]);
        }
        if (U || ce) {
          var ee = typeof m == "function" ? m.displayName || m.name || "Unknown" : m;
          U && Oa(W, ee), ce && Ma(W, ee);
        }
        return Na(m, U, ce, Y, $, Tt.current, W);
      }
    }
    var xn = b.ReactCurrentOwner, Qr = b.ReactDebugCurrentFrame;
    function lt(m) {
      if (m) {
        var C = m._owner, M = $t(m.type, m._source, C ? C.type : null);
        Qr.setExtraStackFrame(M);
      } else
        Qr.setExtraStackFrame(null);
    }
    var Rn;
    Rn = !1;
    function wn(m) {
      return typeof m == "object" && m !== null && m.$$typeof === t;
    }
    function ei() {
      {
        if (xn.current) {
          var m = z(xn.current.type);
          if (m)
            return `

Check the render method of \`` + m + "`.";
        }
        return "";
      }
    }
    function ja(m) {
      {
        if (m !== void 0) {
          var C = m.fileName.replace(/^.*[\\\/]/, ""), M = m.lineNumber;
          return `

Check your code at ` + C + ":" + M + ".";
        }
        return "";
      }
    }
    var ti = {};
    function La(m) {
      {
        var C = ei();
        if (!C) {
          var M = typeof m == "string" ? m : m.displayName || m.name;
          M && (C = `

Check the top-level render call using <` + M + ">.");
        }
        return C;
      }
    }
    function ni(m, C) {
      {
        if (!m._store || m._store.validated || m.key != null)
          return;
        m._store.validated = !0;
        var M = La(C);
        if (ti[M])
          return;
        ti[M] = !0;
        var $ = "";
        m && m._owner && m._owner !== xn.current && ($ = " It was passed a child from " + z(m._owner.type) + "."), lt(m), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', M, $), lt(null);
      }
    }
    function ri(m, C) {
      {
        if (typeof m != "object")
          return;
        if (Sn(m))
          for (var M = 0; M < m.length; M++) {
            var $ = m[M];
            wn($) && ni($, C);
          }
        else if (wn(m))
          m._store && (m._store.validated = !0);
        else if (m) {
          var Y = y(m);
          if (typeof Y == "function" && Y !== m.entries)
            for (var G = Y.call(m), W; !(W = G.next()).done; )
              wn(W.value) && ni(W.value, C);
        }
      }
    }
    function ka(m) {
      {
        var C = m.type;
        if (C == null || typeof C == "string")
          return;
        var M;
        if (typeof C == "function")
          M = C.propTypes;
        else if (typeof C == "object" && (C.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        C.$$typeof === f))
          M = C.propTypes;
        else
          return;
        if (M) {
          var $ = z(C);
          xa(M, m.props, "prop", $, m);
        } else if (C.PropTypes !== void 0 && !Rn) {
          Rn = !0;
          var Y = z(C);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Y || "Unknown");
        }
        typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Fa(m) {
      {
        for (var C = Object.keys(m.props), M = 0; M < C.length; M++) {
          var $ = C[M];
          if ($ !== "children" && $ !== "key") {
            lt(m), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", $), lt(null);
            break;
          }
        }
        m.ref !== null && (lt(m), T("Invalid attribute `ref` supplied to `React.Fragment`."), lt(null));
      }
    }
    function ii(m, C, M, $, Y, G) {
      {
        var W = S(m);
        if (!W) {
          var U = "";
          (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (U += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = ja(Y);
          ce ? U += ce : U += ei();
          var Z;
          m === null ? Z = "null" : Sn(m) ? Z = "array" : m !== void 0 && m.$$typeof === t ? (Z = "<" + (z(m.type) || "Unknown") + " />", U = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof m, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, U);
        }
        var ee = Va(m, C, M, Y, G);
        if (ee == null)
          return ee;
        if (W) {
          var ye = C.children;
          if (ye !== void 0)
            if ($)
              if (Sn(ye)) {
                for (var ct = 0; ct < ye.length; ct++)
                  ri(ye[ct], m);
                Object.freeze && Object.freeze(ye);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ri(ye, m);
        }
        return m === r ? Fa(ee) : ka(ee), ee;
      }
    }
    function $a(m, C, M) {
      return ii(m, C, M, !0);
    }
    function Ba(m, C, M) {
      return ii(m, C, M, !1);
    }
    var Ha = Ba, Ua = $a;
    bt.Fragment = r, bt.jsx = Ha, bt.jsxs = Ua;
  }()), bt;
}
process.env.NODE_ENV === "production" ? Un.exports = tl() : Un.exports = nl();
var j = Un.exports;
function rl(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function il(e) {
  return rl(e) && "type" in e && typeof e.type == "string";
}
var Vs = Symbol.for("immer-nothing"), li = Symbol.for("immer-draftable"), pe = Symbol.for("immer-state"), sl = process.env.NODE_ENV !== "production" ? [
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
function de(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = sl[e], r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var pt = Object.getPrototypeOf;
function Be(e) {
  return !!e && !!e[pe];
}
function je(e) {
  var t;
  return e ? js(e) || Array.isArray(e) || !!e[li] || !!((t = e.constructor) != null && t[li]) || fn(e) || dn(e) : !1;
}
var ol = Object.prototype.constructor.toString();
function js(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = pt(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === ol;
}
function Zt(e, t) {
  un(e) === 0 ? Reflect.ownKeys(e).forEach((n) => {
    t(n, e[n], e);
  }) : e.forEach((n, r) => t(r, n, e));
}
function un(e) {
  const t = e[pe];
  return t ? t.type_ : Array.isArray(e) ? 1 : fn(e) ? 2 : dn(e) ? 3 : 0;
}
function zn(e, t) {
  return un(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Ls(e, t, n) {
  const r = un(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
}
function al(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function fn(e) {
  return e instanceof Map;
}
function dn(e) {
  return e instanceof Set;
}
function Ke(e) {
  return e.copy_ || e.base_;
}
function Wn(e, t) {
  if (fn(e))
    return new Map(e);
  if (dn(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && js(e))
    return pt(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[pe];
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
function fr(e, t = !1) {
  return hn(e) || Be(e) || !je(e) || (un(e) > 1 && (e.set = e.add = e.clear = e.delete = ll), Object.freeze(e), t && Object.entries(e).forEach(([n, r]) => fr(r, !0))), e;
}
function ll() {
  de(2);
}
function hn(e) {
  return Object.isFrozen(e);
}
var cl = {};
function nt(e) {
  const t = cl[e];
  return t || de(0, e), t;
}
var Dt;
function ks() {
  return Dt;
}
function ul(e, t) {
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
function ci(e, t) {
  t && (nt("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Yn(e) {
  Gn(e), e.drafts_.forEach(fl), e.drafts_ = null;
}
function Gn(e) {
  e === Dt && (Dt = e.parent_);
}
function ui(e) {
  return Dt = ul(Dt, e);
}
function fl(e) {
  const t = e[pe];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function fi(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[pe].modified_ && (Yn(t), de(4)), je(e) && (e = Jt(t, e), t.parent_ || Qt(t, e)), t.patches_ && nt("Patches").generateReplacementPatches_(
    n[pe].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Jt(t, n, []), Yn(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Vs ? e : void 0;
}
function Jt(e, t, n) {
  if (hn(t))
    return t;
  const r = t[pe];
  if (!r)
    return Zt(
      t,
      (i, s) => di(e, r, t, i, s, n)
    ), t;
  if (r.scope_ !== e)
    return t;
  if (!r.modified_)
    return Qt(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    r.finalized_ = !0, r.scope_.unfinalizedDrafts_--;
    const i = r.copy_;
    let s = i, o = !1;
    r.type_ === 3 && (s = new Set(i), i.clear(), o = !0), Zt(
      s,
      (a, l) => di(e, r, i, a, l, n, o)
    ), Qt(e, i, !1), n && e.patches_ && nt("Patches").generatePatches_(
      r,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return r.copy_;
}
function di(e, t, n, r, i, s, o) {
  if (process.env.NODE_ENV !== "production" && i === n && de(5), Be(i)) {
    const a = s && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !zn(t.assigned_, r) ? s.concat(r) : void 0, l = Jt(e, i, a);
    if (Ls(n, r, l), Be(l))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    o && n.add(i);
  if (je(i) && !hn(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Jt(e, i), (!t || !t.scope_.parent_) && typeof r != "symbol" && Object.prototype.propertyIsEnumerable.call(n, r) && Qt(e, i);
  }
}
function Qt(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && fr(t, n);
}
function dl(e, t) {
  const n = Array.isArray(e), r = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : ks(),
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
  let i = r, s = dr;
  n && (i = [r], s = Pt);
  const { revoke: o, proxy: a } = Proxy.revocable(i, s);
  return r.draft_ = a, r.revoke_ = o, a;
}
var dr = {
  get(e, t) {
    if (t === pe)
      return e;
    const n = Ke(e);
    if (!zn(n, t))
      return hl(e, n, t);
    const r = n[t];
    return e.finalized_ || !je(r) ? r : r === Cn(e.base_, t) ? (Dn(e), e.copy_[t] = Xn(r, e)) : r;
  },
  has(e, t) {
    return t in Ke(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Ke(e));
  },
  set(e, t, n) {
    const r = Fs(Ke(e), t);
    if (r != null && r.set)
      return r.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const i = Cn(Ke(e), t), s = i == null ? void 0 : i[pe];
      if (s && s.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (al(n, i) && (n !== void 0 || zn(e.base_, t)))
        return !0;
      Dn(e), Kn(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Cn(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Dn(e), Kn(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const n = Ke(e), r = Reflect.getOwnPropertyDescriptor(n, t);
    return r && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: r.enumerable,
      value: n[t]
    };
  },
  defineProperty() {
    de(11);
  },
  getPrototypeOf(e) {
    return pt(e.base_);
  },
  setPrototypeOf() {
    de(12);
  }
}, Pt = {};
Zt(dr, (e, t) => {
  Pt[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Pt.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && de(13), Pt.set.call(this, e, t, void 0);
};
Pt.set = function(e, t, n) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && de(14), dr.set.call(this, e[0], t, n, e[0]);
};
function Cn(e, t) {
  const n = e[pe];
  return (n ? Ke(n) : e)[t];
}
function hl(e, t, n) {
  var i;
  const r = Fs(t, n);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = r.get) == null ? void 0 : i.call(e.draft_)
  ) : void 0;
}
function Fs(e, t) {
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
function Kn(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Kn(e.parent_));
}
function Dn(e) {
  e.copy_ || (e.copy_ = Wn(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var pl = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, r) => {
      if (typeof t == "function" && typeof n != "function") {
        const s = n;
        n = t;
        const o = this;
        return function(l = s, ...u) {
          return o.produce(l, (c) => n.call(this, c, ...u));
        };
      }
      typeof n != "function" && de(6), r !== void 0 && typeof r != "function" && de(7);
      let i;
      if (je(t)) {
        const s = ui(this), o = Xn(t, void 0);
        let a = !0;
        try {
          i = n(o), a = !1;
        } finally {
          a ? Yn(s) : Gn(s);
        }
        return ci(s, r), fi(i, s);
      } else if (!t || typeof t != "object") {
        if (i = n(t), i === void 0 && (i = t), i === Vs && (i = void 0), this.autoFreeze_ && fr(i, !0), r) {
          const s = [], o = [];
          nt("Patches").generateReplacementPatches_(t, i, s, o), r(s, o);
        }
        return i;
      } else
        de(1, t);
    }, this.produceWithPatches = (t, n) => {
      if (typeof t == "function")
        return (o, ...a) => this.produceWithPatches(o, (l) => t(l, ...a));
      let r, i;
      return [this.produce(t, n, (o, a) => {
        r = o, i = a;
      }), r, i];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    je(e) || de(8), Be(e) && (e = $s(e));
    const t = ui(this), n = Xn(e, void 0);
    return n[pe].isManual_ = !0, Gn(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[pe];
    (!n || !n.isManual_) && de(9);
    const { scope_: r } = n;
    return ci(r, t), fi(void 0, r);
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
    const r = nt("Patches").applyPatches_;
    return Be(e) ? r(e, t) : this.produce(
      e,
      (i) => r(i, t)
    );
  }
};
function Xn(e, t) {
  const n = fn(e) ? nt("MapSet").proxyMap_(e, t) : dn(e) ? nt("MapSet").proxySet_(e, t) : dl(e, t);
  return (t ? t.scope_ : ks()).drafts_.push(n), n;
}
function $s(e) {
  return Be(e) || de(10, e), Bs(e);
}
function Bs(e) {
  if (!je(e) || hn(e))
    return e;
  const t = e[pe];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = Wn(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = Wn(e, !0);
  return Zt(n, (r, i) => {
    Ls(n, r, Bs(i));
  }), t && (t.finalized_ = !1), n;
}
var me = new pl(), Hs = me.produce;
me.produceWithPatches.bind(
  me
);
me.setAutoFreeze.bind(me);
me.setUseStrictShallowCopy.bind(me);
me.applyPatches.bind(me);
me.createDraft.bind(me);
me.finishDraft.bind(me);
var ml = (e, t, n) => {
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
}, gl = (e, t, n) => {
  const { memoize: r, memoizeOptions: i } = t, { inputSelectorResults: s, inputSelectorResultsCopy: o } = e, a = r(() => ({}), ...i);
  if (!(a.apply(null, s) === a.apply(null, o))) {
    let u;
    try {
      throw new Error();
    } catch (c) {
      ({ stack: u } = c);
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
}, yl = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function vl(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function Tl(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function El(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (r) => typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var hi = (e) => Array.isArray(e) ? e : [e];
function bl(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return El(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function pi(e, t) {
  const n = [], { length: r } = e;
  for (let i = 0; i < r; i++)
    n.push(e[i].apply(null, t));
  return n;
}
var Sl = (e, t) => {
  const { identityFunctionCheck: n, inputStabilityCheck: r } = {
    ...yl,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: ml
    },
    inputStabilityCheck: {
      shouldRun: r === "always" || r === "once" && e,
      run: gl
    }
  };
}, _l = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, xl = typeof WeakRef < "u" ? WeakRef : _l, Rl = 0, mi = 1;
function Ut() {
  return {
    s: Rl,
    v: void 0,
    o: null,
    p: null
  };
}
function hr(e, t = {}) {
  let n = Ut();
  const { resultEqualityCheck: r } = t;
  let i, s = 0;
  function o() {
    var f;
    let a = n;
    const { length: l } = arguments;
    for (let d = 0, p = l; d < p; d++) {
      const h = arguments[d];
      if (typeof h == "function" || typeof h == "object" && h !== null) {
        let g = a.o;
        g === null && (a.o = g = /* @__PURE__ */ new WeakMap());
        const y = g.get(h);
        y === void 0 ? (a = Ut(), g.set(h, a)) : a = y;
      } else {
        let g = a.p;
        g === null && (a.p = g = /* @__PURE__ */ new Map());
        const y = g.get(h);
        y === void 0 ? (a = Ut(), g.set(h, a)) : a = y;
      }
    }
    const u = a;
    let c;
    if (a.s === mi ? c = a.v : (c = e.apply(null, arguments), s++), u.s = mi, r) {
      const d = ((f = i == null ? void 0 : i.deref) == null ? void 0 : f.call(i)) ?? i;
      d != null && r(d, c) && (c = d, s !== 0 && s--), i = typeof c == "object" && c !== null || typeof c == "function" ? new xl(c) : c;
    }
    return u.v = c, c;
  }
  return o.clearCache = () => {
    n = Ut(), o.resetResultsCount();
  }, o.resultsCount = () => s, o.resetResultsCount = () => {
    s = 0;
  }, o;
}
function Us(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, r = (...i) => {
    let s = 0, o = 0, a, l = {}, u = i.pop();
    typeof u == "object" && (l = u, u = i.pop()), vl(
      u,
      `createSelector expects an output function after the inputs, but received: [${typeof u}]`
    );
    const c = {
      ...n,
      ...l
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: p = hr,
      argsMemoizeOptions: h = [],
      devModeChecks: g = {}
    } = c, y = hi(d), b = hi(h), T = bl(i), E = f(function() {
      return s++, u.apply(
        null,
        arguments
      );
    }, ...y);
    let w = !0;
    const _ = p(function() {
      o++;
      const A = pi(
        T,
        arguments
      );
      if (a = E.apply(null, A), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: v, inputStabilityCheck: N } = Sl(w, g);
        if (v.shouldRun && v.run(
          u,
          A,
          a
        ), N.shouldRun) {
          const S = pi(
            T,
            arguments
          );
          N.run(
            { inputSelectorResults: A, inputSelectorResultsCopy: S },
            { memoize: f, memoizeOptions: y },
            arguments
          );
        }
        w && (w = !1);
      }
      return a;
    }, ...b);
    return Object.assign(_, {
      resultFunc: u,
      memoizedResultFunc: E,
      dependencies: T,
      dependencyRecomputations: () => o,
      resetDependencyRecomputations: () => {
        o = 0;
      },
      lastResult: () => a,
      recomputations: () => s,
      resetRecomputations: () => {
        s = 0;
      },
      memoize: f,
      argsMemoize: p
    });
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var wl = /* @__PURE__ */ Us(hr), Cl = Object.assign(
  (e, t = wl) => {
    Tl(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), r = n.map(
      (s) => e[s]
    );
    return t(
      r,
      (...s) => s.reduce((o, a, l) => (o[n[l]] = a, o), {})
    );
  },
  { withTypes: () => Cl }
), Dl = (...e) => {
  const t = Us(...e), n = Object.assign((...r) => {
    const i = t(...r), s = (o, ...a) => i(Be(o) ? $s(o) : o, ...a);
    return Object.assign(s, i), s;
  }, {
    withTypes: () => n
  });
  return n;
};
Dl(hr);
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
  return n.toString = () => `${e}`, n.type = e, n.match = (r) => il(r) && r.type === e, n;
}
function gi(e) {
  return je(e) ? Hs(e, () => {
  }) : e;
}
function yi(e, t, n) {
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
function zs(e) {
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
function Pl(e) {
  return typeof e == "function";
}
function Al(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? Q(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, r, i] = zs(t), s;
  if (Pl(e))
    s = () => gi(e());
  else {
    const a = gi(e);
    s = () => a;
  }
  function o(a = s(), l) {
    let u = [n[l.type], ...r.filter(({
      matcher: c
    }) => c(l)).map(({
      reducer: c
    }) => c)];
    return u.filter((c) => !!c).length === 0 && (u = [i]), u.reduce((c, f) => {
      if (f)
        if (Be(c)) {
          const p = f(c, l);
          return p === void 0 ? c : p;
        } else {
          if (je(c))
            return Hs(c, (d) => f(d, l));
          {
            const d = f(c, l);
            if (d === void 0) {
              if (c === null)
                return c;
              throw new Error(process.env.NODE_ENV === "production" ? Q(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return d;
          }
        }
      return c;
    }, a);
  }
  return o.getInitialState = s, o;
}
var Il = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Ol = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Il[Math.random() * 64 | 0];
  return t;
}, Ml = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Nl(e, t) {
  return `${e}/${t}`;
}
function Vl({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Ml];
  return function(i) {
    const {
      name: s,
      reducerPath: o = s
    } = i;
    if (!s)
      throw new Error(process.env.NODE_ENV === "production" ? Q(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && i.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const a = (typeof i.reducers == "function" ? i.reducers(kl()) : i.reducers) || {}, l = Object.keys(a), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, c = {
      addCase(E, w) {
        const _ = typeof E == "string" ? E : E.type;
        if (!_)
          throw new Error(process.env.NODE_ENV === "production" ? Q(12) : "`context.addCase` cannot be called with an empty action type");
        if (_ in u.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? Q(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + _);
        return u.sliceCaseReducersByType[_] = w, c;
      },
      addMatcher(E, w) {
        return u.sliceMatchers.push({
          matcher: E,
          reducer: w
        }), c;
      },
      exposeAction(E, w) {
        return u.actionCreators[E] = w, c;
      },
      exposeCaseReducer(E, w) {
        return u.sliceCaseReducersByName[E] = w, c;
      }
    };
    l.forEach((E) => {
      const w = a[E], _ = {
        reducerName: E,
        type: Nl(s, E),
        createNotation: typeof i.reducers == "function"
      };
      $l(w) ? Hl(_, w, c, t) : Fl(_, w, c);
    });
    function f() {
      if (process.env.NODE_ENV !== "production" && typeof i.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? Q(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [E = {}, w = [], _ = void 0] = typeof i.extraReducers == "function" ? zs(i.extraReducers) : [i.extraReducers], P = {
        ...E,
        ...u.sliceCaseReducersByType
      };
      return Al(i.initialState, (A) => {
        for (let v in P)
          A.addCase(v, P[v]);
        for (let v of u.sliceMatchers)
          A.addMatcher(v.matcher, v.reducer);
        for (let v of w)
          A.addMatcher(v.matcher, v.reducer);
        _ && A.addDefaultCase(_);
      });
    }
    const d = (E) => E, p = /* @__PURE__ */ new Map();
    let h;
    function g(E, w) {
      return h || (h = f()), h(E, w);
    }
    function y() {
      return h || (h = f()), h.getInitialState();
    }
    function b(E, w = !1) {
      function _(A) {
        let v = A[E];
        if (typeof v > "u") {
          if (w)
            v = y();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? Q(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return v;
      }
      function P(A = d) {
        const v = yi(p, w, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return yi(v, A, {
          insert: () => {
            const N = {};
            for (const [S, V] of Object.entries(i.selectors ?? {}))
              N[S] = jl(V, A, y, w);
            return N;
          }
        });
      }
      return {
        reducerPath: E,
        getSelectors: P,
        get selectors() {
          return P(_);
        },
        selectSlice: _
      };
    }
    const T = {
      name: s,
      reducer: g,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: y,
      ...b(o),
      injectInto(E, {
        reducerPath: w,
        ..._
      } = {}) {
        const P = w ?? o;
        return E.inject({
          reducerPath: P,
          reducer: g
        }, _), {
          ...T,
          ...b(P, !0)
        };
      }
    };
    return T;
  };
}
function jl(e, t, n, r) {
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
var Ll = /* @__PURE__ */ Vl();
function kl() {
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
function Fl({
  type: e,
  reducerName: t,
  createNotation: n
}, r, i) {
  let s, o;
  if ("reducer" in r) {
    if (n && !Bl(r))
      throw new Error(process.env.NODE_ENV === "production" ? Q(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    s = r.reducer, o = r.prepare;
  } else
    s = r;
  i.addCase(e, s).exposeCaseReducer(t, s).exposeAction(t, o ? mt(e, o) : mt(e));
}
function $l(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Bl(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Hl({
  type: e,
  reducerName: t
}, n, r, i) {
  if (!i)
    throw new Error(process.env.NODE_ENV === "production" ? Q(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: s,
    fulfilled: o,
    pending: a,
    rejected: l,
    settled: u,
    options: c
  } = n, f = i(e, s, c);
  r.exposeAction(t, f), o && r.addCase(f.fulfilled, o), a && r.addCase(f.pending, a), l && r.addCase(f.rejected, l), u && r.addMatcher(f.settled, u), r.exposeCaseReducer(t, {
    fulfilled: o || zt,
    pending: a || zt,
    rejected: l || zt,
    settled: u || zt
  });
}
function zt() {
}
var Ul = (e, t) => {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? Q(32) : `${t} is not a function`);
}, pr = "listenerMiddleware", zl = (e) => {
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
  return Ul(s, "options.listener"), {
    predicate: i,
    type: t,
    effect: s
  };
}, Wl = Object.assign((e) => {
  const {
    type: t,
    predicate: n,
    effect: r
  } = zl(e);
  return {
    id: Ol(),
    effect: r,
    type: t,
    predicate: n,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? Q(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => Wl
}), Yl = Object.assign(mt(`${pr}/add`), {
  withTypes: () => Yl
});
mt(`${pr}/removeAll`);
var Gl = Object.assign(mt(`${pr}/remove`), {
  withTypes: () => Gl
});
function Q(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Kl = {
  users: {},
  isSelectingTarget: !1,
  isRightPanelOpen: !1,
  selectedConversationId: void 0,
  conversations: {},
  newConversation: void 0,
  shareId: void 0
}, en = Ll({
  name: "appState",
  initialState: Kl,
  reducers: {
    setShareId: (e, t) => {
      e.shareId = t.payload;
    },
    setUsers: (e, t) => {
      var n;
      return (n = t.payload) != null && n.length ? {
        ...e,
        users: t.payload.reduce((r, i) => (r[i.id] = i, r), {})
      } : e;
    },
    updateSelectingTargetState: (e, t) => {
      e.isSelectingTarget = t.payload;
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
  setShareId: Sp,
  updateSelectedConversationId: _p,
  updateRightPanelState: Ws,
  setUsers: Xl,
  updateSelectingTargetState: ql,
  setConversations: Zl,
  resetNewConversation: Jl,
  updateNewConversation: vi,
  upsertConversation: xp
} = en.actions, st = "altimate-display-", Ql = `${st}-highlight`, Ti = `${st}-highlight-hover`, ec = `${st}-active-highlight`, tc = "altimate-highlight-wrapper", nc = 1049, rc = [
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
], ic = (e) => e.hasAttribute("altimate-anchor") && e.id !== `${st}highlight-blocker`, sc = (e) => document != null && document.body ? document.body.contains(e) : (console.error(
  "Error in utils isElementInsideBody: document or document.body is not available"
), !1), oc = (e, t, n, r, i, s) => i > e && i < t && s > n && s < r, Ys = (e, t) => {
  var o, a;
  const n = window.getSelection();
  if (!n)
    return { offset: 0 };
  const { anchorNode: r, anchorOffset: i } = n, s = (o = r == null ? void 0 : r.parentElement) == null ? void 0 : o.getBoundingClientRect();
  return s && !oc(
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
}, ac = (e) => {
  if (rc.includes(e.tagName.toLowerCase()) || e.nodeType === Node.TEXT_NODE)
    return !0;
  {
    let t = !1;
    return e.childNodes.forEach((n) => {
      var r;
      n.nodeType === Node.TEXT_NODE && ((r = n.textContent) == null ? void 0 : r.trim()) !== "" && (t = !0);
    }), t;
  }
}, lc = (e, t) => {
  try {
    const n = document.elementsFromPoint(e, t);
    let r = [], i = !1;
    n.forEach((o) => {
      ic(o) ? (r = [], i = !0) : sc(o) && ac(o) && r.push(o);
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
}, cc = (e) => {
  let t = e.startContainer === document.body ? e.endContainer : e.startContainer;
  return t = t.nodeType === Node.TEXT_NODE && t.parentNode ? t.parentNode : t, t;
}, mr = (e) => {
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
      return mr(e.parentElement) + "/" + e.tagName.toLowerCase() + // @ts-expect-error valid
      (s.length > 1 ? "[" + ([].indexOf.call(s, e) + 1) + "]" : "");
    }
    return "";
  } catch (s) {
    return console.error("Error in DomService calculateXPath:", void 0, s), null;
  }
}, gr = rt({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
}), pn = rt({}), mn = rt(null), yr = typeof document < "u", vr = yr ? za : We, Gs = rt({ strict: !1 }), Tr = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), uc = "framerAppearId", Ks = "data-" + Tr(uc), fc = {
  skipAnimations: !1,
  useManualTiming: !1
};
class Ei {
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
function dc(e) {
  let t = new Ei(), n = new Ei(), r = 0, i = !1, s = !1;
  const o = /* @__PURE__ */ new WeakSet(), a = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (l, u = !1, c = !1) => {
      const f = c && i, d = f ? t : n;
      return u && o.add(l), d.add(l) && f && i && (r = t.order.length), l;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (l) => {
      n.remove(l), o.delete(l);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (l) => {
      if (i) {
        s = !0;
        return;
      }
      if (i = !0, [t, n] = [n, t], n.clear(), r = t.order.length, r)
        for (let u = 0; u < r; u++) {
          const c = t.order[u];
          o.has(c) && (a.schedule(c), e()), c(l);
        }
      i = !1, s && (s = !1, a.process(l));
    }
  };
  return a;
}
const Wt = [
  "read",
  "resolveKeyframes",
  "update",
  "preRender",
  "render",
  "postRender"
  // Compute
], hc = 40;
function Xs(e, t) {
  let n = !1, r = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, s = Wt.reduce((f, d) => (f[d] = dc(() => n = !0), f), {}), o = (f) => {
    s[f].process(i);
  }, a = () => {
    const f = performance.now();
    n = !1, i.delta = r ? 1e3 / 60 : Math.max(Math.min(f - i.timestamp, hc), 1), i.timestamp = f, i.isProcessing = !0, Wt.forEach(o), i.isProcessing = !1, n && t && (r = !1, e(a));
  }, l = () => {
    n = !0, r = !0, i.isProcessing || e(a);
  };
  return { schedule: Wt.reduce((f, d) => {
    const p = s[d];
    return f[d] = (h, g = !1, y = !1) => (n || l(), p.schedule(h, g, y)), f;
  }, {}), cancel: (f) => Wt.forEach((d) => s[d].cancel(f)), state: i, steps: s };
}
const { schedule: Er, cancel: Rp } = Xs(queueMicrotask, !1);
function pc(e, t, n, r) {
  const { visualElement: i } = ne(pn), s = ne(Gs), o = ne(mn), a = ne(gr).reducedMotion, l = we();
  r = r || s.renderer, !l.current && r && (l.current = r(e, {
    visualState: t,
    parent: i,
    props: n,
    presenceContext: o,
    blockInitialAnimation: o ? o.initial === !1 : !1,
    reducedMotionConfig: a
  }));
  const u = l.current;
  As(() => {
    u && u.update(n, o);
  });
  const c = we(!!(n[Ks] && !window.HandoffComplete));
  return vr(() => {
    u && (Er.postRender(u.render), c.current && u.animationState && u.animationState.animateChanges());
  }), We(() => {
    u && (u.updateFeatures(), !c.current && u.animationState && u.animationState.animateChanges(), c.current && (c.current = !1, window.HandoffComplete = !0));
  }), u;
}
function ut(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function mc(e, t, n) {
  return Ve(
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
function At(e) {
  return typeof e == "string" || Array.isArray(e);
}
function gn(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const br = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Sr = ["initial", ...br];
function yn(e) {
  return gn(e.animate) || Sr.some((t) => At(e[t]));
}
function qs(e) {
  return !!(yn(e) || e.variants);
}
function gc(e, t) {
  if (yn(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || At(n) ? n : void 0,
      animate: At(r) ? r : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function yc(e) {
  const { initial: t, animate: n } = gc(e, ne(pn));
  return tt(() => ({ initial: t, animate: n }), [bi(t), bi(n)]);
}
function bi(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Si = {
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
}, It = {};
for (const e in Si)
  It[e] = {
    isEnabled: (t) => Si[e].some((n) => !!t[n])
  };
function vc(e) {
  for (const t in e)
    It[t] = {
      ...It[t],
      ...e[t]
    };
}
const _r = rt({}), Zs = rt({}), Tc = Symbol.for("motionComponentSymbol");
function Ec({ preloadedFeatures: e, createVisualElement: t, useRender: n, useVisualState: r, Component: i }) {
  e && vc(e);
  function s(a, l) {
    let u;
    const c = {
      ...ne(gr),
      ...a,
      layoutId: bc(a)
    }, { isStatic: f } = c, d = yc(a), p = r(a, f);
    if (!f && yr) {
      d.visualElement = pc(i, p, c, t);
      const h = ne(Zs), g = ne(Gs).strict;
      d.visualElement && (u = d.visualElement.loadFeatures(
        // Note: Pass the full new combined props to correctly re-render dynamic feature components.
        c,
        g,
        e,
        h
      ));
    }
    return ue.createElement(
      pn.Provider,
      { value: d },
      u && d.visualElement ? ue.createElement(u, { visualElement: d.visualElement, ...c }) : null,
      n(i, a, mc(p, d.visualElement, l), p, f, d.visualElement)
    );
  }
  const o = Is(s);
  return o[Tc] = i, o;
}
function bc({ layoutId: e }) {
  const t = ne(_r).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function Sc(e) {
  function t(r, i = {}) {
    return Ec(e(r, i));
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
const _c = [
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
function xr(e) {
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
      !!(_c.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
const tn = {};
function xc(e) {
  Object.assign(tn, e);
}
const Nt = [
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
], ot = new Set(Nt);
function Js(e, { layout: t, layoutId: n }) {
  return ot.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!tn[e] || e === "opacity");
}
const le = (e) => !!(e && e.getVelocity), Rc = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, wc = Nt.length;
function Cc(e, { enableHardwareAcceleration: t = !0, allowTransformNone: n = !0 }, r, i) {
  let s = "";
  for (let o = 0; o < wc; o++) {
    const a = Nt[o];
    if (e[a] !== void 0) {
      const l = Rc[a] || a;
      s += `${l}(${e[a]}) `;
    }
  }
  return t && !e.z && (s += "translateZ(0)"), s = s.trim(), i ? s = i(e, r ? "" : s) : n && r && (s = "none"), s;
}
const Qs = (e) => (t) => typeof t == "string" && t.startsWith(e), eo = Qs("--"), Dc = Qs("var(--"), Rr = (e) => Dc(e) ? Pc.test(e.split("/*")[0].trim()) : !1, Pc = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Ac = (e, t) => t && typeof e == "number" ? t.transform(e) : e, He = (e, t, n) => n > t ? t : n < e ? e : n, yt = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, xt = {
  ...yt,
  transform: (e) => He(0, 1, e)
}, Yt = {
  ...yt,
  default: 1
}, Rt = (e) => Math.round(e * 1e5) / 1e5, wr = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu, Ic = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu, Oc = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function Vt(e) {
  return typeof e == "string";
}
const jt = (e) => ({
  test: (t) => Vt(t) && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), ke = jt("deg"), Ce = jt("%"), F = jt("px"), Mc = jt("vh"), Nc = jt("vw"), _i = {
  ...Ce,
  parse: (e) => Ce.parse(e) / 100,
  transform: (e) => Ce.transform(e * 100)
}, xi = {
  ...yt,
  transform: Math.round
}, to = {
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
  rotate: ke,
  rotateX: ke,
  rotateY: ke,
  rotateZ: ke,
  scale: Yt,
  scaleX: Yt,
  scaleY: Yt,
  scaleZ: Yt,
  skew: ke,
  skewX: ke,
  skewY: ke,
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
  originX: _i,
  originY: _i,
  originZ: F,
  // Misc
  zIndex: xi,
  backgroundPositionX: F,
  backgroundPositionY: F,
  // SVG
  fillOpacity: xt,
  strokeOpacity: xt,
  numOctaves: xi
};
function Cr(e, t, n, r) {
  const { style: i, vars: s, transform: o, transformOrigin: a } = e;
  let l = !1, u = !1, c = !0;
  for (const f in t) {
    const d = t[f];
    if (eo(f)) {
      s[f] = d;
      continue;
    }
    const p = to[f], h = Ac(d, p);
    if (ot.has(f)) {
      if (l = !0, o[f] = h, !c)
        continue;
      d !== (p.default || 0) && (c = !1);
    } else
      f.startsWith("origin") ? (u = !0, a[f] = h) : i[f] = h;
  }
  if (t.transform || (l || r ? i.transform = Cc(e.transform, n, c, r) : i.transform && (i.transform = "none")), u) {
    const { originX: f = "50%", originY: d = "50%", originZ: p = 0 } = a;
    i.transformOrigin = `${f} ${d} ${p}`;
  }
}
const Dr = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function no(e, t, n) {
  for (const r in t)
    !le(t[r]) && !Js(r, n) && (e[r] = t[r]);
}
function Vc({ transformTemplate: e }, t, n) {
  return tt(() => {
    const r = Dr();
    return Cr(r, t, { enableHardwareAcceleration: !n }, e), Object.assign({}, r.vars, r.style);
  }, [t]);
}
function jc(e, t, n) {
  const r = e.style || {}, i = {};
  return no(i, r, e), Object.assign(i, Vc(e, t, n)), i;
}
function Lc(e, t, n) {
  const r = {}, i = jc(e, t, n);
  return e.drag && e.dragListener !== !1 && (r.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (r.tabIndex = 0), r.style = i, r;
}
const kc = /* @__PURE__ */ new Set([
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
function nn(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || kc.has(e);
}
let ro = (e) => !nn(e);
function Fc(e) {
  e && (ro = (t) => t.startsWith("on") ? !nn(t) : e(t));
}
try {
  Fc(require("@emotion/is-prop-valid").default);
} catch {
}
function $c(e, t, n) {
  const r = {};
  for (const i in e)
    i === "values" && typeof e.values == "object" || (ro(i) || n === !0 && nn(i) || !t && !nn(i) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && i.startsWith("onDrag")) && (r[i] = e[i]);
  return r;
}
function Ri(e, t, n) {
  return typeof e == "string" ? e : F.transform(t + n * e);
}
function Bc(e, t, n) {
  const r = Ri(t, e.x, e.width), i = Ri(n, e.y, e.height);
  return `${r} ${i}`;
}
const Hc = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Uc = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function zc(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const s = i ? Hc : Uc;
  e[s.offset] = F.transform(-r);
  const o = F.transform(t), a = F.transform(n);
  e[s.array] = `${o} ${a}`;
}
function Pr(e, {
  attrX: t,
  attrY: n,
  attrScale: r,
  originX: i,
  originY: s,
  pathLength: o,
  pathSpacing: a = 1,
  pathOffset: l = 0,
  // This is object creation, which we try to avoid per-frame.
  ...u
}, c, f, d) {
  if (Cr(e, u, c, d), f) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: p, style: h, dimensions: g } = e;
  p.transform && (g && (h.transform = p.transform), delete p.transform), g && (i !== void 0 || s !== void 0 || h.transform) && (h.transformOrigin = Bc(g, i !== void 0 ? i : 0.5, s !== void 0 ? s : 0.5)), t !== void 0 && (p.x = t), n !== void 0 && (p.y = n), r !== void 0 && (p.scale = r), o !== void 0 && zc(p, o, a, l, !1);
}
const io = () => ({
  ...Dr(),
  attrs: {}
}), Ar = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function Wc(e, t, n, r) {
  const i = tt(() => {
    const s = io();
    return Pr(s, t, { enableHardwareAcceleration: !1 }, Ar(r), e.transformTemplate), {
      ...s.attrs,
      style: { ...s.style }
    };
  }, [t]);
  if (e.style) {
    const s = {};
    no(s, e.style, e), i.style = { ...s, ...i.style };
  }
  return i;
}
function Yc(e = !1) {
  return (n, r, i, { latestValues: s }, o) => {
    const l = (xr(n) ? Wc : Lc)(r, s, o, n), u = $c(r, typeof n == "string", e), c = n !== Wa ? { ...u, ...l, ref: i } : {}, { children: f } = r, d = tt(() => le(f) ? f.get() : f, [f]);
    return Ya(n, {
      ...c,
      children: d
    });
  };
}
function so(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const s in n)
    e.style.setProperty(s, n[s]);
}
const oo = /* @__PURE__ */ new Set([
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
function ao(e, t, n, r) {
  so(e, t, void 0, r);
  for (const i in t.attrs)
    e.setAttribute(oo.has(i) ? i : Tr(i), t.attrs[i]);
}
function Ir(e, t) {
  const { style: n } = e, r = {};
  for (const i in n)
    (le(n[i]) || t.style && le(t.style[i]) || Js(i, e)) && (r[i] = n[i]);
  return r;
}
function lo(e, t) {
  const n = Ir(e, t);
  for (const r in e)
    if (le(e[r]) || le(t[r])) {
      const i = Nt.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      n[i] = e[r];
    }
  return n;
}
function Or(e, t, n, r = {}, i = {}) {
  return typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)), typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)), t;
}
function co(e) {
  const t = we(null);
  return t.current === null && (t.current = e()), t.current;
}
const qn = (e) => Array.isArray(e), Gc = (e) => !!(e && typeof e == "object" && e.mix && e.toValue), Kc = (e) => qn(e) ? e[e.length - 1] || 0 : e;
function Kt(e) {
  const t = le(e) ? e.get() : e;
  return Gc(t) ? t.toValue() : t;
}
function Xc({ scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n }, r, i, s) {
  const o = {
    latestValues: qc(r, i, s, e),
    renderState: t()
  };
  return n && (o.mount = (a) => n(r, a, o)), o;
}
const uo = (e) => (t, n) => {
  const r = ne(pn), i = ne(mn), s = () => Xc(e, t, r, i);
  return n ? s() : co(s);
};
function qc(e, t, n, r) {
  const i = {}, s = r(e, {});
  for (const d in s)
    i[d] = Kt(s[d]);
  let { initial: o, animate: a } = e;
  const l = yn(e), u = qs(e);
  t && u && !l && e.inherit !== !1 && (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const f = c ? a : o;
  return f && typeof f != "boolean" && !gn(f) && (Array.isArray(f) ? f : [f]).forEach((p) => {
    const h = Or(e, p);
    if (!h)
      return;
    const { transitionEnd: g, transition: y, ...b } = h;
    for (const T in b) {
      let E = b[T];
      if (Array.isArray(E)) {
        const w = c ? E.length - 1 : 0;
        E = E[w];
      }
      E !== null && (i[T] = E);
    }
    for (const T in g)
      i[T] = g[T];
  }), i;
}
const oe = (e) => e, { schedule: ie, cancel: Ue, state: se, steps: Pn } = Xs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : oe, !0), Zc = {
  useVisualState: uo({
    scrapeMotionValuesFromProps: lo,
    createRenderState: io,
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
        Pr(n, r, { enableHardwareAcceleration: !1 }, Ar(t.tagName), e.transformTemplate), ao(t, n);
      });
    }
  })
}, Jc = {
  useVisualState: uo({
    scrapeMotionValuesFromProps: Ir,
    createRenderState: Dr
  })
};
function Qc(e, { forwardMotionProps: t = !1 }, n, r) {
  return {
    ...xr(e) ? Zc : Jc,
    preloadedFeatures: n,
    useRender: Yc(t),
    createVisualElement: r,
    Component: e
  };
}
function Ae(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const fo = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1;
function vn(e, t = "page") {
  return {
    point: {
      x: e[t + "X"],
      y: e[t + "Y"]
    }
  };
}
const eu = (e) => (t) => fo(t) && e(t, vn(t));
function Ie(e, t, n, r) {
  return Ae(e, t, eu(n), r);
}
const tu = (e, t) => (n) => t(e(n)), Oe = (...e) => e.reduce(tu);
function ho(e) {
  let t = null;
  return () => {
    const n = () => {
      t = null;
    };
    return t === null ? (t = e, n) : !1;
  };
}
const wi = ho("dragHorizontal"), Ci = ho("dragVertical");
function po(e) {
  let t = !1;
  if (e === "y")
    t = Ci();
  else if (e === "x")
    t = wi();
  else {
    const n = wi(), r = Ci();
    n && r ? t = () => {
      n(), r();
    } : (n && n(), r && r());
  }
  return t;
}
function mo() {
  const e = po(!0);
  return e ? (e(), !1) : !0;
}
class Ye {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
function Di(e, t) {
  const n = "pointer" + (t ? "enter" : "leave"), r = "onHover" + (t ? "Start" : "End"), i = (s, o) => {
    if (s.pointerType === "touch" || mo())
      return;
    const a = e.getProps();
    e.animationState && a.whileHover && e.animationState.setActive("whileHover", t), a[r] && a[r](s, o);
  };
  return Ie(e.current, n, i, {
    passive: !e.getProps()[r]
  });
}
class nu extends Ye {
  mount() {
    this.unmount = Oe(Di(this.node, !0), Di(this.node, !1));
  }
  unmount() {
  }
}
class ru extends Ye {
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
    this.unmount = Oe(Ae(this.node.current, "focus", () => this.onFocus()), Ae(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
const go = (e, t) => t ? e === t ? !0 : go(e, t.parentElement) : !1;
function An(e, t) {
  if (!t)
    return;
  const n = new PointerEvent("pointer" + e);
  t(n, vn(n));
}
class iu extends Ye {
  constructor() {
    super(...arguments), this.removeStartListeners = oe, this.removeEndListeners = oe, this.removeAccessibleListeners = oe, this.startPointerPress = (t, n) => {
      if (this.isPressing)
        return;
      this.removeEndListeners();
      const r = this.node.getProps(), s = Ie(window, "pointerup", (a, l) => {
        if (!this.checkPressEnd())
          return;
        const { onTap: u, onTapCancel: c, globalTapTarget: f } = this.node.getProps();
        !f && !go(this.node.current, a.target) ? c && c(a, l) : u && u(a, l);
      }, { passive: !(r.onTap || r.onPointerUp) }), o = Ie(window, "pointercancel", (a, l) => this.cancelPress(a, l), { passive: !(r.onTapCancel || r.onPointerCancel) });
      this.removeEndListeners = Oe(s, o), this.startPress(t, n);
    }, this.startAccessiblePress = () => {
      const t = (s) => {
        if (s.key !== "Enter" || this.isPressing)
          return;
        const o = (a) => {
          a.key !== "Enter" || !this.checkPressEnd() || An("up", (l, u) => {
            const { onTap: c } = this.node.getProps();
            c && c(l, u);
          });
        };
        this.removeEndListeners(), this.removeEndListeners = Ae(this.node.current, "keyup", o), An("down", (a, l) => {
          this.startPress(a, l);
        });
      }, n = Ae(this.node.current, "keydown", t), r = () => {
        this.isPressing && An("cancel", (s, o) => this.cancelPress(s, o));
      }, i = Ae(this.node.current, "blur", r);
      this.removeAccessibleListeners = Oe(n, i);
    };
  }
  startPress(t, n) {
    this.isPressing = !0;
    const { onTapStart: r, whileTap: i } = this.node.getProps();
    i && this.node.animationState && this.node.animationState.setActive("whileTap", !0), r && r(t, n);
  }
  checkPressEnd() {
    return this.removeEndListeners(), this.isPressing = !1, this.node.getProps().whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1), !mo();
  }
  cancelPress(t, n) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel: r } = this.node.getProps();
    r && r(t, n);
  }
  mount() {
    const t = this.node.getProps(), n = Ie(t.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, { passive: !(t.onTapStart || t.onPointerStart) }), r = Ae(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = Oe(n, r);
  }
  unmount() {
    this.removeStartListeners(), this.removeEndListeners(), this.removeAccessibleListeners();
  }
}
const Zn = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new WeakMap(), su = (e) => {
  const t = Zn.get(e.target);
  t && t(e);
}, ou = (e) => {
  e.forEach(su);
};
function au({ root: e, ...t }) {
  const n = e || document;
  In.has(n) || In.set(n, {});
  const r = In.get(n), i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(ou, { root: e, ...t })), r[i];
}
function lu(e, t, n) {
  const r = au(t);
  return Zn.set(e, n), r.observe(e), () => {
    Zn.delete(e), r.unobserve(e);
  };
}
const cu = {
  some: 0,
  all: 1
};
class uu extends Ye {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: r, amount: i = "some", once: s } = t, o = {
      root: n ? n.current : void 0,
      rootMargin: r,
      threshold: typeof i == "number" ? i : cu[i]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, s && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: f } = this.node.getProps(), d = u ? c : f;
      d && d(l);
    };
    return lu(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(fu(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function fu({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const du = {
  inView: {
    Feature: uu
  },
  tap: {
    Feature: iu
  },
  focus: {
    Feature: ru
  },
  hover: {
    Feature: nu
  }
};
function yo(e, t) {
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
function hu(e) {
  const t = {};
  return e.values.forEach((n, r) => t[r] = n.get()), t;
}
function pu(e) {
  const t = {};
  return e.values.forEach((n, r) => t[r] = n.getVelocity()), t;
}
function Tn(e, t, n) {
  const r = e.getProps();
  return Or(r, t, n !== void 0 ? n : r.custom, hu(e), pu(e));
}
const Me = (e) => e * 1e3, Ne = (e) => e / 1e3, mu = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, gu = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), yu = {
  type: "keyframes",
  duration: 0.8
}, vu = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Tu = (e, { keyframes: t }) => t.length > 2 ? yu : ot.has(e) ? e.startsWith("scale") ? gu(t[1]) : mu : vu;
function Eu({ when: e, delay: t, delayChildren: n, staggerChildren: r, staggerDirection: i, repeat: s, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
function Mr(e, t) {
  return e[t] || e.default || e;
}
const bu = (e) => e !== null;
function En(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(bu), s = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !s || r === void 0 ? i[s] : r;
}
let Xt;
function Su() {
  Xt = void 0;
}
const $e = {
  now: () => (Xt === void 0 && $e.set(se.isProcessing || fc.useManualTiming ? se.timestamp : performance.now()), Xt),
  set: (e) => {
    Xt = e, queueMicrotask(Su);
  }
}, vo = (e) => /^0[^.\s]+$/u.test(e);
function _u(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || vo(e) : !0;
}
let Lt = oe, De = oe;
process.env.NODE_ENV !== "production" && (Lt = (e, t) => {
  !e && typeof console < "u" && console.warn(t);
}, De = (e, t) => {
  if (!e)
    throw new Error(t);
});
const To = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), xu = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ru(e) {
  const t = xu.exec(e);
  if (!t)
    return [,];
  const [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
const wu = 4;
function Eo(e, t, n = 1) {
  De(n <= wu, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`);
  const [r, i] = Ru(e);
  if (!r)
    return;
  const s = window.getComputedStyle(t).getPropertyValue(r);
  if (s) {
    const o = s.trim();
    return To(o) ? parseFloat(o) : o;
  }
  return Rr(i) ? Eo(i, t, n + 1) : i;
}
const Cu = /* @__PURE__ */ new Set([
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
]), Pi = (e) => e === yt || e === F, Ai = (e, t) => parseFloat(e.split(", ")[t]), Ii = (e, t) => (n, { transform: r }) => {
  if (r === "none" || !r)
    return 0;
  const i = r.match(/^matrix3d\((.+)\)$/u);
  if (i)
    return Ai(i[1], t);
  {
    const s = r.match(/^matrix\((.+)\)$/u);
    return s ? Ai(s[1], e) : 0;
  }
}, Du = /* @__PURE__ */ new Set(["x", "y", "z"]), Pu = Nt.filter((e) => !Du.has(e));
function Oi(e) {
  const t = [];
  return Pu.forEach((n) => {
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
  x: Ii(4, 13),
  y: Ii(5, 14)
};
gt.translateX = gt.x;
gt.translateY = gt.y;
const bo = (e) => (t) => t.test(e), Au = {
  test: (e) => e === "auto",
  parse: (e) => e
}, So = [yt, F, Ce, ke, Nc, Mc, Au], Mi = (e) => So.find(bo(e)), Qe = /* @__PURE__ */ new Set();
let Jn = !1, Qn = !1;
function _o() {
  if (Qn) {
    const e = Array.from(Qe).filter((r) => r.needsMeasurement), t = new Set(e.map((r) => r.element)), n = /* @__PURE__ */ new Map();
    t.forEach((r) => {
      Oi(r).length && (n.set(r, Oi(r)), r.render());
    }), e.forEach((r) => r.measureInitialState()), t.forEach((r) => {
      r.render();
    }), e.forEach((r) => r.measureEndState()), e.forEach((r) => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
    });
  }
  Qn = !1, Jn = !1, Qe.forEach((e) => e.complete()), Qe.clear();
}
function xo() {
  Qe.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Qn = !0);
  });
}
function Iu() {
  xo(), _o();
}
class Nr {
  constructor(t, n, r, i, s, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = r, this.motionValue = i, this.element = s, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? (Qe.add(this), Jn || (Jn = !0, ie.read(xo), ie.resolveKeyframes(_o))) : (this.readKeyframes(), this.complete());
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
            const l = r.readValue(n, a);
            l != null && (t[0] = l);
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
    this.isComplete = !0, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), Qe.delete(this);
  }
  cancel() {
    this.isComplete || (this.isScheduled = !1, Qe.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const Vr = (e, t) => (n) => !!(Vt(n) && Oc.test(n) && n.startsWith(e) || t && Object.prototype.hasOwnProperty.call(n, t)), Ro = (e, t, n) => (r) => {
  if (!Vt(r))
    return r;
  const [i, s, o, a] = r.match(wr);
  return {
    [e]: parseFloat(i),
    [t]: parseFloat(s),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Ou = (e) => He(0, 255, e), On = {
  ...yt,
  transform: (e) => Math.round(Ou(e))
}, Je = {
  test: Vr("rgb", "red"),
  parse: Ro("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + On.transform(e) + ", " + On.transform(t) + ", " + On.transform(n) + ", " + Rt(xt.transform(r)) + ")"
};
function Mu(e) {
  let t = "", n = "", r = "", i = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(r, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const er = {
  test: Vr("#"),
  parse: Mu,
  transform: Je.transform
}, ft = {
  test: Vr("hsl", "hue"),
  parse: Ro("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + Ce.transform(Rt(t)) + ", " + Ce.transform(Rt(n)) + ", " + Rt(xt.transform(r)) + ")"
}, ae = {
  test: (e) => Je.test(e) || er.test(e) || ft.test(e),
  parse: (e) => Je.test(e) ? Je.parse(e) : ft.test(e) ? ft.parse(e) : er.parse(e),
  transform: (e) => Vt(e) ? e : e.hasOwnProperty("red") ? Je.transform(e) : ft.transform(e)
};
function Nu(e) {
  var t, n;
  return isNaN(e) && Vt(e) && (((t = e.match(wr)) === null || t === void 0 ? void 0 : t.length) || 0) + (((n = e.match(Ic)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const wo = "number", Co = "color", Vu = "var", ju = "var(", Ni = "${}", Lu = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function rn(e) {
  const t = e.toString(), n = [], r = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let s = 0;
  const a = t.replace(Lu, (l) => (ae.test(l) ? (r.color.push(s), i.push(Co), n.push(ae.parse(l))) : l.startsWith(ju) ? (r.var.push(s), i.push(Vu), n.push(l)) : (r.number.push(s), i.push(wo), n.push(parseFloat(l))), ++s, Ni)).split(Ni);
  return { values: n, split: a, indexes: r, types: i };
}
function Do(e) {
  return rn(e).values;
}
function Po(e) {
  const { split: t, types: n } = rn(e), r = t.length;
  return (i) => {
    let s = "";
    for (let o = 0; o < r; o++)
      if (s += t[o], i[o] !== void 0) {
        const a = n[o];
        a === wo ? s += Rt(i[o]) : a === Co ? s += ae.transform(i[o]) : s += i[o];
      }
    return s;
  };
}
const ku = (e) => typeof e == "number" ? 0 : e;
function Fu(e) {
  const t = Do(e);
  return Po(e)(t.map(ku));
}
const ze = {
  test: Nu,
  parse: Do,
  createTransformer: Po,
  getAnimatableNone: Fu
}, $u = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Bu(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [r] = n.match(wr) || [];
  if (!r)
    return e;
  const i = n.replace(r, "");
  let s = $u.has(t) ? 1 : 0;
  return r !== n && (s *= 100), t + "(" + s + i + ")";
}
const Hu = /\b([a-z-]*)\(.*?\)/gu, tr = {
  ...ze,
  getAnimatableNone: (e) => {
    const t = e.match(Hu);
    return t ? t.map(Bu).join(" ") : e;
  }
}, Uu = {
  ...to,
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
  filter: tr,
  WebkitFilter: tr
}, jr = (e) => Uu[e];
function Ao(e, t) {
  let n = jr(e);
  return n !== tr && (n = ze), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
function zu(e, t, n) {
  let r = 0, i;
  for (; r < e.length && !i; )
    typeof e[r] == "string" && e[r] !== "none" && e[r] !== "0" && (i = e[r]), r++;
  if (i && n)
    for (const s of t)
      e[s] = Ao(n, i);
}
class Io extends Nr {
  constructor(t, n, r, i) {
    super(t, n, r, i, i == null ? void 0 : i.owner, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      const u = t[l];
      if (typeof u == "string" && Rr(u)) {
        const c = Eo(u, n.current);
        c !== void 0 && (t[l] = c);
      }
    }
    if (!Cu.has(r) || t.length !== 2)
      return this.resolveNoneKeyframes();
    const [i, s] = t, o = Mi(i), a = Mi(s);
    if (o !== a)
      if (Pi(o) && Pi(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else
        this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, r = [];
    for (let i = 0; i < t.length; i++)
      _u(t[i]) && r.push(i);
    r.length && zu(t, r, n);
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
    i[o] = gt[r](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && (this.finalKeyframe = a), !((t = this.removedTransforms) === null || t === void 0) && t.length && this.removedTransforms.forEach(([l, u]) => {
      n.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
function Wu(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Vi = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(ze.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function Yu(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function Gu(e, t, n, r) {
  const i = e[0];
  if (i === null)
    return !1;
  const s = e[e.length - 1], o = Vi(i, t), a = Vi(s, t);
  return Lt(o === a, `You are trying to animate ${t} from "${i}" to "${s}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${s} via the \`style\` property.`), !o || !a ? !1 : Yu(e) || n === "spring" && r;
}
class Oo {
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
    return !this._resolved && !this.hasAttemptedResolve && Iu(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(t, n) {
    this.hasAttemptedResolve = !0;
    const { name: r, type: i, velocity: s, delay: o, onComplete: a, onUpdate: l, isGenerator: u } = this.options;
    if (!u && !Gu(t, r, i, s))
      if (o)
        this.options.duration = 0;
      else {
        l == null || l(En(t, this.options, n)), a == null || a(), this.resolveFinishedPromise();
        return;
      }
    const c = this.initPlayback(t, n);
    c !== !1 && (this._resolved = {
      keyframes: t,
      finalKeyframe: n,
      ...c
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
function Mo(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Ku = 5;
function No(e, t, n) {
  const r = Math.max(t - Ku, 0);
  return Mo(n - e(r), t - r);
}
const Mn = 1e-3, Xu = 0.01, ji = 10, qu = 0.05, Zu = 1;
function Ju({ duration: e = 800, bounce: t = 0.25, velocity: n = 0, mass: r = 1 }) {
  let i, s;
  Lt(e <= Me(ji), "Spring duration must be 10 seconds or less");
  let o = 1 - t;
  o = He(qu, Zu, o), e = He(Xu, ji, Ne(e)), o < 1 ? (i = (u) => {
    const c = u * o, f = c * e, d = c - n, p = nr(u, o), h = Math.exp(-f);
    return Mn - d / p * h;
  }, s = (u) => {
    const f = u * o * e, d = f * n + n, p = Math.pow(o, 2) * Math.pow(u, 2) * e, h = Math.exp(-f), g = nr(Math.pow(u, 2), o);
    return (-i(u) + Mn > 0 ? -1 : 1) * ((d - p) * h) / g;
  }) : (i = (u) => {
    const c = Math.exp(-u * e), f = (u - n) * e + 1;
    return -Mn + c * f;
  }, s = (u) => {
    const c = Math.exp(-u * e), f = (n - u) * (e * e);
    return c * f;
  });
  const a = 5 / e, l = ef(i, s, a);
  if (e = Me(e), isNaN(l))
    return {
      stiffness: 100,
      damping: 10,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * r;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(r * u),
      duration: e
    };
  }
}
const Qu = 12;
function ef(e, t, n) {
  let r = n;
  for (let i = 1; i < Qu; i++)
    r = r - e(r) / t(r);
  return r;
}
function nr(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const tf = ["duration", "bounce"], nf = ["stiffness", "damping", "mass"];
function Li(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function rf(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Li(e, nf) && Li(e, tf)) {
    const n = Ju(e);
    t = {
      ...t,
      ...n,
      mass: 1
    }, t.isResolvedFromDuration = !0;
  }
  return t;
}
function Vo({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
  const i = e[0], s = e[e.length - 1], o = { done: !1, value: i }, { stiffness: a, damping: l, mass: u, duration: c, velocity: f, isResolvedFromDuration: d } = rf({
    ...r,
    velocity: -Ne(r.velocity || 0)
  }), p = f || 0, h = l / (2 * Math.sqrt(a * u)), g = s - i, y = Ne(Math.sqrt(a / u)), b = Math.abs(g) < 5;
  n || (n = b ? 0.01 : 2), t || (t = b ? 5e-3 : 0.5);
  let T;
  if (h < 1) {
    const E = nr(y, h);
    T = (w) => {
      const _ = Math.exp(-h * y * w);
      return s - _ * ((p + h * y * g) / E * Math.sin(E * w) + g * Math.cos(E * w));
    };
  } else if (h === 1)
    T = (E) => s - Math.exp(-y * E) * (g + (p + y * g) * E);
  else {
    const E = y * Math.sqrt(h * h - 1);
    T = (w) => {
      const _ = Math.exp(-h * y * w), P = Math.min(E * w, 300);
      return s - _ * ((p + h * y * g) * Math.sinh(P) + E * g * Math.cosh(P)) / E;
    };
  }
  return {
    calculatedDuration: d && c || null,
    next: (E) => {
      const w = T(E);
      if (d)
        o.done = E >= c;
      else {
        let _ = p;
        E !== 0 && (h < 1 ? _ = No(T, E, w) : _ = 0);
        const P = Math.abs(_) <= n, A = Math.abs(s - w) <= t;
        o.done = P && A;
      }
      return o.value = o.done ? s : w, o;
    }
  };
}
function ki({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: s = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const f = e[0], d = {
    done: !1,
    value: f
  }, p = (v) => a !== void 0 && v < a || l !== void 0 && v > l, h = (v) => a === void 0 ? l : l === void 0 || Math.abs(a - v) < Math.abs(l - v) ? a : l;
  let g = n * t;
  const y = f + g, b = o === void 0 ? y : o(y);
  b !== y && (g = b - f);
  const T = (v) => -g * Math.exp(-v / r), E = (v) => b + T(v), w = (v) => {
    const N = T(v), S = E(v);
    d.done = Math.abs(N) <= u, d.value = d.done ? b : S;
  };
  let _, P;
  const A = (v) => {
    p(d.value) && (_ = v, P = Vo({
      keyframes: [d.value, h(d.value)],
      velocity: No(E, v, d.value),
      damping: i,
      stiffness: s,
      restDelta: u,
      restSpeed: c
    }));
  };
  return A(0), {
    calculatedDuration: null,
    next: (v) => {
      let N = !1;
      return !P && _ === void 0 && (N = !0, w(v), A(v)), _ !== void 0 && v >= _ ? P.next(v - _) : (!N && w(v), d);
    }
  };
}
const jo = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, sf = 1e-7, of = 12;
function af(e, t, n, r, i) {
  let s, o, a = 0;
  do
    o = t + (n - t) / 2, s = jo(o, r, i) - e, s > 0 ? n = o : t = o;
  while (Math.abs(s) > sf && ++a < of);
  return o;
}
function kt(e, t, n, r) {
  if (e === t && n === r)
    return oe;
  const i = (s) => af(s, 0, 1, e, n);
  return (s) => s === 0 || s === 1 ? s : jo(i(s), t, r);
}
const lf = kt(0.42, 0, 1, 1), cf = kt(0, 0, 0.58, 1), Lo = kt(0.42, 0, 0.58, 1), uf = (e) => Array.isArray(e) && typeof e[0] != "number", ko = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Fo = (e) => (t) => 1 - e(1 - t), Lr = (e) => 1 - Math.sin(Math.acos(e)), $o = Fo(Lr), ff = ko(Lr), Bo = kt(0.33, 1.53, 0.69, 0.99), kr = Fo(Bo), df = ko(kr), hf = (e) => (e *= 2) < 1 ? 0.5 * kr(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), Fi = {
  linear: oe,
  easeIn: lf,
  easeInOut: Lo,
  easeOut: cf,
  circIn: Lr,
  circInOut: ff,
  circOut: $o,
  backIn: kr,
  backInOut: df,
  backOut: Bo,
  anticipate: hf
}, $i = (e) => {
  if (Array.isArray(e)) {
    De(e.length === 4, "Cubic bezier arrays must contain four numerical values.");
    const [t, n, r, i] = e;
    return kt(t, n, r, i);
  } else if (typeof e == "string")
    return De(Fi[e] !== void 0, `Invalid easing type '${e}'`), Fi[e];
  return e;
}, Ot = (e, t, n) => {
  const r = t - e;
  return r === 0 ? 1 : (n - e) / r;
}, X = (e, t, n) => e + (t - e) * n;
function Nn(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function pf({ hue: e, saturation: t, lightness: n, alpha: r }) {
  e /= 360, t /= 100, n /= 100;
  let i = 0, s = 0, o = 0;
  if (!t)
    i = s = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    i = Nn(l, a, e + 1 / 3), s = Nn(l, a, e), o = Nn(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(s * 255),
    blue: Math.round(o * 255),
    alpha: r
  };
}
const Vn = (e, t, n) => {
  const r = e * e, i = n * (t * t - r) + r;
  return i < 0 ? 0 : Math.sqrt(i);
}, mf = [er, Je, ft], gf = (e) => mf.find((t) => t.test(e));
function Bi(e) {
  const t = gf(e);
  De(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`);
  let n = t.parse(e);
  return t === ft && (n = pf(n)), n;
}
const Hi = (e, t) => {
  const n = Bi(e), r = Bi(t), i = { ...n };
  return (s) => (i.red = Vn(n.red, r.red, s), i.green = Vn(n.green, r.green, s), i.blue = Vn(n.blue, r.blue, s), i.alpha = X(n.alpha, r.alpha, s), Je.transform(i));
};
function rr(e, t) {
  return (n) => n > 0 ? t : e;
}
function yf(e, t) {
  return (n) => X(e, t, n);
}
function Fr(e) {
  return typeof e == "number" ? yf : typeof e == "string" ? Rr(e) ? rr : ae.test(e) ? Hi : Ef : Array.isArray(e) ? Ho : typeof e == "object" ? ae.test(e) ? Hi : vf : rr;
}
function Ho(e, t) {
  const n = [...e], r = n.length, i = e.map((s, o) => Fr(s)(s, t[o]));
  return (s) => {
    for (let o = 0; o < r; o++)
      n[o] = i[o](s);
    return n;
  };
}
function vf(e, t) {
  const n = { ...e, ...t }, r = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (r[i] = Fr(e[i])(e[i], t[i]));
  return (i) => {
    for (const s in r)
      n[s] = r[s](i);
    return n;
  };
}
function Tf(e, t) {
  var n;
  const r = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < t.values.length; s++) {
    const o = t.types[s], a = e.indexes[o][i[o]], l = (n = e.values[a]) !== null && n !== void 0 ? n : 0;
    r[s] = l, i[o]++;
  }
  return r;
}
const Ef = (e, t) => {
  const n = ze.createTransformer(t), r = rn(e), i = rn(t);
  return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? Oe(Ho(Tf(r, i), i.values), n) : (Lt(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`), rr(e, t));
};
function Uo(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? X(e, t, n) : Fr(e)(e, t);
}
function bf(e, t, n) {
  const r = [], i = n || Uo, s = e.length - 1;
  for (let o = 0; o < s; o++) {
    let a = i(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || oe : t;
      a = Oe(l, a);
    }
    r.push(a);
  }
  return r;
}
function Sf(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const s = e.length;
  if (De(s === t.length, "Both input and output ranges must be the same length"), s === 1)
    return () => t[0];
  if (s === 2 && e[0] === e[1])
    return () => t[1];
  e[0] > e[s - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const o = bf(t, r, i), a = o.length, l = (u) => {
    let c = 0;
    if (a > 1)
      for (; c < e.length - 2 && !(u < e[c + 1]); c++)
        ;
    const f = Ot(e[c], e[c + 1], u);
    return o[c](f);
  };
  return n ? (u) => l(He(e[0], e[s - 1], u)) : l;
}
function _f(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = Ot(0, t, r);
    e.push(X(n, 1, i));
  }
}
function xf(e) {
  const t = [0];
  return _f(t, e.length - 1), t;
}
function Rf(e, t) {
  return e.map((n) => n * t);
}
function wf(e, t) {
  return e.map(() => t || Lo).splice(0, e.length - 1);
}
function sn({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
  const i = uf(r) ? r.map($i) : $i(r), s = {
    done: !1,
    value: t[0]
  }, o = Rf(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : xf(t),
    e
  ), a = Sf(o, t, {
    ease: Array.isArray(i) ? i : wf(t, i)
  });
  return {
    calculatedDuration: e,
    next: (l) => (s.value = a(l), s.done = l >= e, s)
  };
}
const Ui = 2e4;
function Cf(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < Ui; )
    t += n, r = e.next(t);
  return t >= Ui ? 1 / 0 : t;
}
const Df = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: () => ie.update(t, !0),
    stop: () => Ue(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => se.isProcessing ? se.timestamp : $e.now()
  };
}, Pf = {
  decay: ki,
  inertia: ki,
  tween: sn,
  keyframes: sn,
  spring: Vo
}, Af = (e) => e / 100;
class $r extends Oo {
  constructor({ KeyframeResolver: t = Nr, ...n }) {
    super(n), this.holdTime = null, this.startTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.state = "idle";
    const { name: r, motionValue: i, keyframes: s } = this.options, o = (a, l) => this.onKeyframesResolved(a, l);
    r && i && i.owner ? this.resolver = i.owner.resolveKeyframes(s, o, r, i) : this.resolver = new t(s, o, r, i), this.resolver.scheduleResolve();
  }
  initPlayback(t) {
    const { type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: s, velocity: o = 0 } = this.options, a = Pf[n] || sn;
    let l, u;
    a !== sn && typeof t[0] != "number" && (process.env.NODE_ENV !== "production" && De(t.length === 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${t}`), l = Oe(Af, Uo(t[0], t[1])), t = [0, 100]);
    const c = a({ ...this.options, keyframes: t });
    s === "mirror" && (u = a({
      ...this.options,
      keyframes: [...t].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = Cf(c));
    const { calculatedDuration: f } = c, d = f + i, p = d * (r + 1) - i;
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: l,
      calculatedDuration: f,
      resolvedDuration: d,
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
      const { keyframes: v } = this.options;
      return { done: !0, value: v[v.length - 1] };
    }
    const { finalKeyframe: i, generator: s, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: u, totalDuration: c, resolvedDuration: f } = r;
    if (this.startTime === null)
      return s.next(0);
    const { delay: d, repeat: p, repeatType: h, repeatDelay: g, onUpdate: y } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - c / this.speed, this.startTime)), n ? this.currentTime = t : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(t - this.startTime) * this.speed;
    const b = this.currentTime - d * (this.speed >= 0 ? 1 : -1), T = this.speed >= 0 ? b < 0 : b > c;
    this.currentTime = Math.max(b, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let E = this.currentTime, w = s;
    if (p) {
      const v = Math.min(this.currentTime, c) / f;
      let N = Math.floor(v), S = v % 1;
      !S && v >= 1 && (S = 1), S === 1 && N--, N = Math.min(N, p + 1), !!(N % 2) && (h === "reverse" ? (S = 1 - S, g && (S -= g / f)) : h === "mirror" && (w = o)), E = He(0, 1, S) * f;
    }
    const _ = T ? { done: !1, value: l[0] } : w.next(E);
    a && (_.value = a(_.value));
    let { done: P } = _;
    !T && u !== null && (P = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const A = this.holdTime === null && (this.state === "finished" || this.state === "running" && P);
    return A && i !== void 0 && (_.value = En(l, this.options, i)), y && y(_.value), A && this.finish(), _;
  }
  get duration() {
    const { resolved: t } = this;
    return t ? Ne(t.calculatedDuration) : 0;
  }
  get time() {
    return Ne(this.currentTime);
  }
  set time(t) {
    t = Me(t), this.currentTime = t, this.holdTime !== null || this.speed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = Ne(this.currentTime));
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver: t = Df, onPlay: n } = this.options;
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
const zo = (e) => Array.isArray(e) && typeof e[0] == "number";
function Wo(e) {
  return !!(!e || typeof e == "string" && Yo[e] || zo(e) || Array.isArray(e) && e.every(Wo));
}
const _t = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, Yo = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: _t([0, 0.65, 0.55, 1]),
  circOut: _t([0.55, 0, 1, 0.45]),
  backIn: _t([0.31, 0.01, 0.66, -0.59]),
  backOut: _t([0.33, 1.53, 0.69, 0.99])
};
function Go(e) {
  if (e)
    return zo(e) ? _t(e) : Array.isArray(e) ? e.map(Go) : Yo[e];
}
function If(e, t, n, { delay: r = 0, duration: i = 300, repeat: s = 0, repeatType: o = "loop", ease: a, times: l } = {}) {
  const u = { [t]: n };
  l && (u.offset = l);
  const c = Go(a);
  return Array.isArray(c) && (u.easing = c), e.animate(u, {
    delay: r,
    duration: i,
    easing: Array.isArray(c) ? "linear" : c,
    fill: "both",
    iterations: s + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const Of = Wu(() => Object.hasOwnProperty.call(Element.prototype, "animate")), Mf = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), on = 10, Nf = 2e4;
function Vf(e) {
  return e.type === "spring" || e.name === "backgroundColor" || !Wo(e.ease);
}
function jf(e, t) {
  const n = new $r({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let r = { done: !1, value: e[0] };
  const i = [];
  let s = 0;
  for (; !r.done && s < Nf; )
    r = n.sample(s), i.push(r.value), s += on;
  return {
    times: void 0,
    keyframes: i,
    duration: s - on,
    ease: "linear"
  };
}
class zi extends Oo {
  constructor(t) {
    super(t);
    const { name: n, motionValue: r, keyframes: i } = this.options;
    this.resolver = new Io(i, (s, o) => this.onKeyframesResolved(s, o), n, r), this.resolver.scheduleResolve();
  }
  initPlayback(t, n) {
    var r;
    let { duration: i = 300, times: s, ease: o, type: a, motionValue: l, name: u } = this.options;
    if (!(!((r = l.owner) === null || r === void 0) && r.current))
      return !1;
    if (Vf(this.options)) {
      const { onComplete: f, onUpdate: d, motionValue: p, ...h } = this.options, g = jf(t, h);
      t = g.keyframes, t.length === 1 && (t[1] = t[0]), i = g.duration, s = g.times, o = g.ease, a = "keyframes";
    }
    const c = If(l.owner.current, u, t, { ...this.options, duration: i, times: s, ease: o });
    return c.startTime = $e.now(), this.pendingTimeline ? (c.timeline = this.pendingTimeline, this.pendingTimeline = void 0) : c.onfinish = () => {
      const { onComplete: f } = this.options;
      l.set(En(t, this.options, n)), f && f(), this.cancel(), this.resolveFinishedPromise();
    }, {
      animation: c,
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
    return Ne(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t)
      return 0;
    const { animation: n } = t;
    return Ne(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: r } = n;
    r.currentTime = Me(t);
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
        const { motionValue: l, onUpdate: u, onComplete: c, ...f } = this.options, d = new $r({
          ...f,
          keyframes: r,
          duration: i,
          type: s,
          ease: o,
          times: a,
          isGenerator: !0
        }), p = Me(this.time);
        l.setWithVelocity(d.sample(p - on).value, d.sample(p).value, on);
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
    return Of() && r && Mf.has(r) && n && n.owner && n.owner.current instanceof HTMLElement && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !n.owner.getProps().onUpdate && !i && s !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const Br = (e, t, n, r = {}, i, s) => (o) => {
  const a = Mr(r, e) || {}, l = a.delay || r.delay || 0;
  let { elapsed: u = 0 } = r;
  u = u - Me(l);
  let c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      t.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: s ? void 0 : i
  };
  Eu(a) || (c = {
    ...c,
    ...Tu(e, c)
  }), c.duration && (c.duration = Me(c.duration)), c.repeatDelay && (c.repeatDelay = Me(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let f = !1;
  if (c.type === !1 && (c.duration = 0, c.delay === 0 && (f = !0)), f && !s && t.get() !== void 0) {
    const d = En(c.keyframes, a);
    if (d !== void 0) {
      ie.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return !s && zi.supports(c) ? new zi(c) : new $r(c);
};
function an(e) {
  return !!(le(e) && e.add);
}
function Hr(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Ur(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class zr {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Hr(this.subscriptions, t), () => Ur(this.subscriptions, t);
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
const Wi = /* @__PURE__ */ new Set();
function Wr(e, t, n) {
  e || Wi.has(t) || (console.warn(t), n && console.warn(n), Wi.add(t));
}
const Yi = 30, Lf = (e) => !isNaN(parseFloat(e));
class kf {
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
      const s = $e.now();
      this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(t), this.canTrackVelocity = Lf(this.current), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = $e.now();
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
    return process.env.NODE_ENV !== "production" && Wr(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new zr());
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
    const t = $e.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Yi)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Yi);
    return Mo(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
function Mt(e, t) {
  return new kf(e, t);
}
function Ff(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Mt(n));
}
function $f(e, t) {
  const n = Tn(e, t);
  let { transitionEnd: r = {}, transition: i = {}, ...s } = n || {};
  s = { ...s, ...r };
  for (const o in s) {
    const a = Kc(s[o]);
    Ff(e, o, a);
  }
}
function Bf({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, r;
}
function Ko(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var s;
  let { transition: o = e.getDefaultTransition(), transitionEnd: a, ...l } = t;
  const u = e.getValue("willChange");
  r && (o = r);
  const c = [], f = i && e.animationState && e.animationState.getState()[i];
  for (const d in l) {
    const p = e.getValue(d, (s = e.latestValues[d]) !== null && s !== void 0 ? s : null), h = l[d];
    if (h === void 0 || f && Bf(f, d))
      continue;
    const g = {
      delay: n,
      elapsed: 0,
      ...Mr(o || {}, d)
    };
    let y = !1;
    if (window.HandoffAppearAnimations) {
      const T = e.getProps()[Ks];
      if (T) {
        const E = window.HandoffAppearAnimations(T, d);
        E !== null && (g.elapsed = E, y = !0);
      }
    }
    p.start(Br(d, p, h, e.shouldReduceMotion && ot.has(d) ? { type: !1 } : g, e, y));
    const b = p.animation;
    b && (an(u) && (u.add(d), b.then(() => u.remove(d))), c.push(b));
  }
  return a && Promise.all(c).then(() => {
    ie.update(() => {
      a && $f(e, a);
    });
  }), c;
}
function ir(e, t, n = {}) {
  var r;
  const i = Tn(e, t, n.type === "exit" ? (r = e.presenceContext) === null || r === void 0 ? void 0 : r.custom : void 0);
  let { transition: s = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(Ko(e, i, n)) : () => Promise.resolve(), a = e.variantChildren && e.variantChildren.size ? (u = 0) => {
    const { delayChildren: c = 0, staggerChildren: f, staggerDirection: d } = s;
    return Hf(e, t, c + u, f, d, n);
  } : () => Promise.resolve(), { when: l } = s;
  if (l) {
    const [u, c] = l === "beforeChildren" ? [o, a] : [a, o];
    return u().then(() => c());
  } else
    return Promise.all([o(), a(n.delay)]);
}
function Hf(e, t, n = 0, r = 0, i = 1, s) {
  const o = [], a = (e.variantChildren.size - 1) * r, l = i === 1 ? (u = 0) => u * r : (u = 0) => a - u * r;
  return Array.from(e.variantChildren).sort(Uf).forEach((u, c) => {
    u.notify("AnimationStart", t), o.push(ir(u, t, {
      ...s,
      delay: n + l(c)
    }).then(() => u.notify("AnimationComplete", t)));
  }), Promise.all(o);
}
function Uf(e, t) {
  return e.sortNodePosition(t);
}
function zf(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((s) => ir(e, s, n));
    r = Promise.all(i);
  } else if (typeof t == "string")
    r = ir(e, t, n);
  else {
    const i = typeof t == "function" ? Tn(e, t, n.custom) : t;
    r = Promise.all(Ko(e, i, n));
  }
  return r.then(() => {
    ie.postRender(() => {
      e.notify("AnimationComplete", t);
    });
  });
}
const Wf = [...br].reverse(), Yf = br.length;
function Gf(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => zf(e, n, r)));
}
function Kf(e) {
  let t = Gf(e);
  const n = qf();
  let r = !0;
  const i = (l) => (u, c) => {
    var f;
    const d = Tn(e, c, l === "exit" ? (f = e.presenceContext) === null || f === void 0 ? void 0 : f.custom : void 0);
    if (d) {
      const { transition: p, transitionEnd: h, ...g } = d;
      u = { ...u, ...g, ...h };
    }
    return u;
  };
  function s(l) {
    t = l(e);
  }
  function o(l) {
    const u = e.getProps(), c = e.getVariantContext(!0) || {}, f = [], d = /* @__PURE__ */ new Set();
    let p = {}, h = 1 / 0;
    for (let y = 0; y < Yf; y++) {
      const b = Wf[y], T = n[b], E = u[b] !== void 0 ? u[b] : c[b], w = At(E), _ = b === l ? T.isActive : null;
      _ === !1 && (h = y);
      let P = E === c[b] && E !== u[b] && w;
      if (P && r && e.manuallyAnimateOnMount && (P = !1), T.protectedKeys = { ...p }, // If it isn't active and hasn't *just* been set as inactive
      !T.isActive && _ === null || // If we didn't and don't have any defined prop for this animation type
      !E && !T.prevProp || // Or if the prop doesn't define an animation
      gn(E) || typeof E == "boolean")
        continue;
      let v = Xf(T.prevProp, E) || // If we're making this variant active, we want to always make it active
      b === l && T.isActive && !P && w || // If we removed a higher-priority variant (i is in reverse order)
      y > h && w, N = !1;
      const S = Array.isArray(E) ? E : [E];
      let V = S.reduce(i(b), {});
      _ === !1 && (V = {});
      const { prevResolvedValues: H = {} } = T, z = {
        ...H,
        ...V
      }, I = (R) => {
        v = !0, d.has(R) && (N = !0, d.delete(R)), T.needsAnimating[R] = !0;
      };
      for (const R in z) {
        const x = V[R], O = H[R];
        if (p.hasOwnProperty(R))
          continue;
        let D = !1;
        qn(x) && qn(O) ? D = !yo(x, O) : D = x !== O, D ? x != null ? I(R) : d.add(R) : x !== void 0 && d.has(R) ? I(R) : T.protectedKeys[R] = !0;
      }
      T.prevProp = E, T.prevResolvedValues = V, T.isActive && (p = { ...p, ...V }), r && e.blockInitialAnimation && (v = !1), v && (!P || N) && f.push(...S.map((R) => ({
        animation: R,
        options: { type: b }
      })));
    }
    if (d.size) {
      const y = {};
      d.forEach((b) => {
        const T = e.getBaseTarget(b);
        y[b] = T === void 0 ? null : T;
      }), f.push({ animation: y });
    }
    let g = !!f.length;
    return r && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (g = !1), r = !1, g ? t(f) : Promise.resolve();
  }
  function a(l, u) {
    var c;
    if (n[l].isActive === u)
      return Promise.resolve();
    (c = e.variantChildren) === null || c === void 0 || c.forEach((d) => {
      var p;
      return (p = d.animationState) === null || p === void 0 ? void 0 : p.setActive(l, u);
    }), n[l].isActive = u;
    const f = o(l);
    for (const d in n)
      n[d].protectedKeys = {};
    return f;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: s,
    getState: () => n
  };
}
function Xf(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !yo(t, e) : !1;
}
function Ge(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function qf() {
  return {
    animate: Ge(!0),
    whileInView: Ge(),
    whileHover: Ge(),
    whileTap: Ge(),
    whileDrag: Ge(),
    whileFocus: Ge(),
    exit: Ge()
  };
}
class Zf extends Ye {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = Kf(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    this.unmount(), gn(t) && (this.unmount = t.subscribe(this.node));
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
let Jf = 0;
class Qf extends Ye {
  constructor() {
    super(...arguments), this.id = Jf++;
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
const ed = {
  animation: {
    Feature: Zf
  },
  exit: {
    Feature: Qf
  }
}, Gi = (e, t) => Math.abs(e - t);
function td(e, t) {
  const n = Gi(e.x, t.x), r = Gi(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class Xo {
  constructor(t, n, { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: s = !1 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = Ln(this.lastMoveEventInfo, this.history), d = this.startEvent !== null, p = td(f.offset, { x: 0, y: 0 }) >= 3;
      if (!d && !p)
        return;
      const { point: h } = f, { timestamp: g } = se;
      this.history.push({ ...h, timestamp: g });
      const { onStart: y, onMove: b } = this.handlers;
      d || (y && y(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), b && b(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, d) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = jn(d, this.transformPagePoint), ie.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, d) => {
      this.end();
      const { onEnd: p, onSessionEnd: h, resumeAnimation: g } = this.handlers;
      if (this.dragSnapToOrigin && g && g(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const y = Ln(f.type === "pointercancel" ? this.lastMoveEventInfo : jn(d, this.transformPagePoint), this.history);
      this.startEvent && p && p(f, y), h && h(f, y);
    }, !fo(t))
      return;
    this.dragSnapToOrigin = s, this.handlers = n, this.transformPagePoint = r, this.contextWindow = i || window;
    const o = vn(t), a = jn(o, this.transformPagePoint), { point: l } = a, { timestamp: u } = se;
    this.history = [{ ...l, timestamp: u }];
    const { onSessionStart: c } = n;
    c && c(t, Ln(a, this.history)), this.removeListeners = Oe(Ie(this.contextWindow, "pointermove", this.handlePointerMove), Ie(this.contextWindow, "pointerup", this.handlePointerUp), Ie(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), Ue(this.updatePoint);
  }
}
function jn(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Ki(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Ln({ point: e }, t) {
  return {
    point: e,
    delta: Ki(e, qo(t)),
    offset: Ki(e, nd(t)),
    velocity: rd(t, 0.1)
  };
}
function nd(e) {
  return e[0];
}
function qo(e) {
  return e[e.length - 1];
}
function rd(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, r = null;
  const i = qo(e);
  for (; n >= 0 && (r = e[n], !(i.timestamp - r.timestamp > Me(t))); )
    n--;
  if (!r)
    return { x: 0, y: 0 };
  const s = Ne(i.timestamp - r.timestamp);
  if (s === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (i.x - r.x) / s,
    y: (i.y - r.y) / s
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function ge(e) {
  return e.max - e.min;
}
function sr(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function Xi(e, t, n, r = 0.5) {
  e.origin = r, e.originPoint = X(t.min, t.max, e.origin), e.scale = ge(n) / ge(t), (sr(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1), e.translate = X(n.min, n.max, e.origin) - e.originPoint, (sr(e.translate) || isNaN(e.translate)) && (e.translate = 0);
}
function wt(e, t, n, r) {
  Xi(e.x, t.x, n.x, r ? r.originX : void 0), Xi(e.y, t.y, n.y, r ? r.originY : void 0);
}
function qi(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + ge(t);
}
function id(e, t, n) {
  qi(e.x, t.x, n.x), qi(e.y, t.y, n.y);
}
function Zi(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + ge(t);
}
function Ct(e, t, n) {
  Zi(e.x, t.x, n.x), Zi(e.y, t.y, n.y);
}
function sd(e, { min: t, max: n }, r) {
  return t !== void 0 && e < t ? e = r ? X(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? X(n, e, r.max) : Math.min(e, n)), e;
}
function Ji(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function od(e, { top: t, left: n, bottom: r, right: i }) {
  return {
    x: Ji(e.x, n, i),
    y: Ji(e.y, t, r)
  };
}
function Qi(e, t) {
  let n = t.min - e.min, r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function ad(e, t) {
  return {
    x: Qi(e.x, t.x),
    y: Qi(e.y, t.y)
  };
}
function ld(e, t) {
  let n = 0.5;
  const r = ge(e), i = ge(t);
  return i > r ? n = Ot(t.min, t.max - r, e.min) : r > i && (n = Ot(e.min, e.max - i, t.min)), He(0, 1, n);
}
function cd(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const or = 0.35;
function ud(e = or) {
  return e === !1 ? e = 0 : e === !0 && (e = or), {
    x: es(e, "left", "right"),
    y: es(e, "top", "bottom")
  };
}
function es(e, t, n) {
  return {
    min: ts(e, t),
    max: ts(e, n)
  };
}
function ts(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const ns = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), dt = () => ({
  x: ns(),
  y: ns()
}), rs = () => ({ min: 0, max: 0 }), J = () => ({
  x: rs(),
  y: rs()
});
function Te(e) {
  return [e("x"), e("y")];
}
function Zo({ top: e, left: t, right: n, bottom: r }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: r }
  };
}
function fd({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function dd(e, t) {
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
function kn(e) {
  return e === void 0 || e === 1;
}
function ar({ scale: e, scaleX: t, scaleY: n }) {
  return !kn(e) || !kn(t) || !kn(n);
}
function Xe(e) {
  return ar(e) || Jo(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function Jo(e) {
  return is(e.x) || is(e.y);
}
function is(e) {
  return e && e !== "0%";
}
function ln(e, t, n) {
  const r = e - n, i = t * r;
  return n + i;
}
function ss(e, t, n, r, i) {
  return i !== void 0 && (e = ln(e, i, r)), ln(e, n, r) + t;
}
function lr(e, t = 0, n = 1, r, i) {
  e.min = ss(e.min, t, n, r, i), e.max = ss(e.max, t, n, r, i);
}
function Qo(e, { x: t, y: n }) {
  lr(e.x, t.translate, t.scale, t.originPoint), lr(e.y, n.translate, n.scale, n.originPoint);
}
function hd(e, t, n, r = !1) {
  const i = n.length;
  if (!i)
    return;
  t.x = t.y = 1;
  let s, o;
  for (let a = 0; a < i; a++) {
    s = n[a], o = s.projectionDelta;
    const l = s.instance;
    l && l.style && l.style.display === "contents" || (r && s.options.layoutScroll && s.scroll && s !== s.root && ht(e, {
      x: -s.scroll.offset.x,
      y: -s.scroll.offset.y
    }), o && (t.x *= o.x.scale, t.y *= o.y.scale, Qo(e, o)), r && Xe(s.latestValues) && ht(e, s.latestValues));
  }
  t.x = os(t.x), t.y = os(t.y);
}
function os(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999 ? e : 1;
}
function Fe(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function as(e, t, [n, r, i]) {
  const s = t[i] !== void 0 ? t[i] : 0.5, o = X(e.min, e.max, s);
  lr(e, t[n], t[r], o, t.scale);
}
const pd = ["x", "scaleX", "originX"], md = ["y", "scaleY", "originY"];
function ht(e, t) {
  as(e.x, t, pd), as(e.y, t, md);
}
function ea(e, t) {
  return Zo(dd(e.getBoundingClientRect(), t));
}
function gd(e, t, n) {
  const r = ea(e, n), { scroll: i } = t;
  return i && (Fe(r.x, i.offset.x), Fe(r.y, i.offset.y)), r;
}
const ta = ({ current: e }) => e ? e.ownerDocument.defaultView : null, yd = /* @__PURE__ */ new WeakMap();
class vd {
  constructor(t) {
    this.openGlobalLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = J(), this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const i = (c) => {
      const { dragSnapToOrigin: f } = this.getProps();
      f ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(vn(c, "page").point);
    }, s = (c, f) => {
      const { drag: d, dragPropagation: p, onDragStart: h } = this.getProps();
      if (d && !p && (this.openGlobalLock && this.openGlobalLock(), this.openGlobalLock = po(d), !this.openGlobalLock))
        return;
      this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Te((y) => {
        let b = this.getAxisMotionValue(y).get() || 0;
        if (Ce.test(b)) {
          const { projection: T } = this.visualElement;
          if (T && T.layout) {
            const E = T.layout.layoutBox[y];
            E && (b = ge(E) * (parseFloat(b) / 100));
          }
        }
        this.originPoint[y] = b;
      }), h && h(c, f);
      const { animationState: g } = this.visualElement;
      g && g.setActive("whileDrag", !0);
    }, o = (c, f) => {
      const { dragPropagation: d, dragDirectionLock: p, onDirectionLock: h, onDrag: g } = this.getProps();
      if (!d && !this.openGlobalLock)
        return;
      const { offset: y } = f;
      if (p && this.currentDirection === null) {
        this.currentDirection = Td(y), this.currentDirection !== null && h && h(this.currentDirection);
        return;
      }
      this.updateAxis("x", f.point, y), this.updateAxis("y", f.point, y), this.visualElement.render(), g && g(c, f);
    }, a = (c, f) => this.stop(c, f), l = () => Te((c) => {
      var f;
      return this.getAnimationState(c) === "paused" && ((f = this.getAxisMotionValue(c).animation) === null || f === void 0 ? void 0 : f.play());
    }), { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new Xo(t, {
      onSessionStart: i,
      onStart: s,
      onMove: o,
      onSessionEnd: a,
      resumeAnimation: l
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: u,
      contextWindow: ta(this.visualElement)
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
    if (!r || !Gt(t, i, this.currentDirection))
      return;
    const s = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + r[t];
    this.constraints && this.constraints[t] && (o = sd(o, this.constraints[t], this.elastic[t])), s.set(o);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: r } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (t = this.visualElement.projection) === null || t === void 0 ? void 0 : t.layout, s = this.constraints;
    n && ut(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && i ? this.constraints = od(i.layoutBox, n) : this.constraints = !1, this.elastic = ud(r), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && Te((o) => {
      this.getAxisMotionValue(o) && (this.constraints[o] = cd(i.layoutBox[o], this.constraints[o]));
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
    const s = gd(r, i.root, this.visualElement.getTransformPagePoint());
    let o = ad(i.layout.layoutBox, s);
    if (n) {
      const a = n(fd(o));
      this.hasMutatedConstraints = !!a, a && (o = Zo(a));
    }
    return o;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: r, dragElastic: i, dragTransition: s, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = Te((c) => {
      if (!Gt(c, n, this.currentDirection))
        return;
      let f = l && l[c] || {};
      o && (f = { min: 0, max: 0 });
      const d = i ? 200 : 1e6, p = i ? 40 : 1e7, h = {
        type: "inertia",
        velocity: r ? t[c] : 0,
        bounceStiffness: d,
        bounceDamping: p,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...s,
        ...f
      };
      return this.startAxisValueAnimation(c, h);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return r.start(Br(t, r, 0, n, this.visualElement));
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
      if (!Gt(n, r, this.currentDirection))
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
        const l = a.get();
        i[o] = ld({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: s } = this.visualElement.getProps();
    this.visualElement.current.style.transform = s ? s({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.resolveConstraints(), Te((o) => {
      if (!Gt(o, t, null))
        return;
      const a = this.getAxisMotionValue(o), { min: l, max: u } = this.constraints[o];
      a.set(X(l, u, i[o]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    yd.set(this.visualElement, this);
    const t = this.visualElement.current, n = Ie(t, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), r = () => {
      const { dragConstraints: l } = this.getProps();
      ut(l) && (this.constraints = this.resolveRefConstraints());
    }, { projection: i } = this.visualElement, s = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), r();
    const o = Ae(window, "resize", () => this.scalePositionWithinConstraints()), a = i.addEventListener("didUpdate", ({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (Te((c) => {
        const f = this.getAxisMotionValue(c);
        f && (this.originPoint[c] += l[c].translate, f.set(f.get() + l[c].translate));
      }), this.visualElement.render());
    });
    return () => {
      o(), n(), s(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: r = !1, dragPropagation: i = !1, dragConstraints: s = !1, dragElastic: o = or, dragMomentum: a = !0 } = t;
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
function Gt(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function Td(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class Ed extends Ye {
  constructor(t) {
    super(t), this.removeGroupControls = oe, this.removeListeners = oe, this.controls = new vd(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || oe;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const ls = (e) => (t, n) => {
  e && e(t, n);
};
class bd extends Ye {
  constructor() {
    super(...arguments), this.removePointerDownListener = oe;
  }
  onPointerDown(t) {
    this.session = new Xo(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: ta(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: ls(t),
      onStart: ls(n),
      onMove: r,
      onEnd: (s, o) => {
        delete this.session, i && i(s, o);
      }
    };
  }
  mount() {
    this.removePointerDownListener = Ie(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function Sd() {
  const e = ne(mn);
  if (e === null)
    return [!0, null];
  const { isPresent: t, onExitComplete: n, register: r } = e, i = ur();
  return We(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0];
}
const qt = {
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
function cs(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const St = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (F.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = cs(e, t.target.x), r = cs(e, t.target.y);
    return `${n}% ${r}%`;
  }
}, _d = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const r = e, i = ze.parse(e);
    if (i.length > 5)
      return r;
    const s = ze.createTransformer(e), o = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * t.x, l = n.y.scale * t.y;
    i[0 + o] /= a, i[1 + o] /= l;
    const u = X(a, l, 0.5);
    return typeof i[2 + o] == "number" && (i[2 + o] /= u), typeof i[3 + o] == "number" && (i[3 + o] /= u), s(i);
  }
};
class xd extends cn.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: i } = this.props, { projection: s } = t;
    xc(Rd), s && (n.group && n.group.add(s), r && r.register && i && r.register(s), s.root.didUpdate(), s.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), s.setOptions({
      ...s.options,
      onExitComplete: () => this.safeToRemove()
    })), qt.hasEverUpdated = !0;
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
    t && (t.root.didUpdate(), Er.postRender(() => {
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
function na(e) {
  const [t, n] = Sd(), r = ne(_r);
  return cn.createElement(xd, { ...e, layoutGroup: r, switchLayoutGroup: ne(Zs), isPresent: t, safeToRemove: n });
}
const Rd = {
  borderRadius: {
    ...St,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: St,
  borderTopRightRadius: St,
  borderBottomLeftRadius: St,
  borderBottomRightRadius: St,
  boxShadow: _d
}, ra = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], wd = ra.length, us = (e) => typeof e == "string" ? parseFloat(e) : e, fs = (e) => typeof e == "number" || F.test(e);
function Cd(e, t, n, r, i, s) {
  i ? (e.opacity = X(
    0,
    // TODO Reinstate this if only child
    n.opacity !== void 0 ? n.opacity : 1,
    Dd(r)
  ), e.opacityExit = X(t.opacity !== void 0 ? t.opacity : 1, 0, Pd(r))) : s && (e.opacity = X(t.opacity !== void 0 ? t.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, r));
  for (let o = 0; o < wd; o++) {
    const a = `border${ra[o]}Radius`;
    let l = ds(t, a), u = ds(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || fs(l) === fs(u) ? (e[a] = Math.max(X(us(l), us(u), r), 0), (Ce.test(u) || Ce.test(l)) && (e[a] += "%")) : e[a] = u;
  }
  (t.rotate || n.rotate) && (e.rotate = X(t.rotate || 0, n.rotate || 0, r));
}
function ds(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const Dd = ia(0, 0.5, $o), Pd = ia(0.5, 0.95, oe);
function ia(e, t, n) {
  return (r) => r < e ? 0 : r > t ? 1 : n(Ot(e, t, r));
}
function hs(e, t) {
  e.min = t.min, e.max = t.max;
}
function ve(e, t) {
  hs(e.x, t.x), hs(e.y, t.y);
}
function ps(e, t, n, r, i) {
  return e -= t, e = ln(e, 1 / n, r), i !== void 0 && (e = ln(e, 1 / i, r)), e;
}
function Ad(e, t = 0, n = 1, r = 0.5, i, s = e, o = e) {
  if (Ce.test(t) && (t = parseFloat(t), t = X(o.min, o.max, t / 100) - o.min), typeof t != "number")
    return;
  let a = X(s.min, s.max, r);
  e === s && (a -= t), e.min = ps(e.min, t, n, a, i), e.max = ps(e.max, t, n, a, i);
}
function ms(e, t, [n, r, i], s, o) {
  Ad(e, t[n], t[r], t[i], t.scale, s, o);
}
const Id = ["x", "scaleX", "originX"], Od = ["y", "scaleY", "originY"];
function gs(e, t, n, r) {
  ms(e.x, t, Id, n ? n.x : void 0, r ? r.x : void 0), ms(e.y, t, Od, n ? n.y : void 0, r ? r.y : void 0);
}
function ys(e) {
  return e.translate === 0 && e.scale === 1;
}
function sa(e) {
  return ys(e.x) && ys(e.y);
}
function Md(e, t) {
  return e.x.min === t.x.min && e.x.max === t.x.max && e.y.min === t.y.min && e.y.max === t.y.max;
}
function oa(e, t) {
  return Math.round(e.x.min) === Math.round(t.x.min) && Math.round(e.x.max) === Math.round(t.x.max) && Math.round(e.y.min) === Math.round(t.y.min) && Math.round(e.y.max) === Math.round(t.y.max);
}
function vs(e) {
  return ge(e.x) / ge(e.y);
}
class Nd {
  constructor() {
    this.members = [];
  }
  add(t) {
    Hr(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (Ur(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
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
function Ts(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x, s = e.y.translate / t.y, o = (n == null ? void 0 : n.z) || 0;
  if ((i || s || o) && (r = `translate3d(${i}px, ${s}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { rotate: u, rotateX: c, rotateY: f, skewX: d, skewY: p } = n;
    u && (r += `rotate(${u}deg) `), c && (r += `rotateX(${c}deg) `), f && (r += `rotateY(${f}deg) `), d && (r += `skewX(${d}deg) `), p && (r += `skewY(${p}deg) `);
  }
  const a = e.x.scale * t.x, l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none";
}
const Vd = (e, t) => e.depth - t.depth;
class jd {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    Hr(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    Ur(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(Vd), this.isDirty = !1, this.children.forEach(t);
  }
}
function Ld(e, t) {
  const n = $e.now(), r = ({ timestamp: i }) => {
    const s = i - n;
    s >= t && (Ue(r), e(s - t));
  };
  return ie.read(r, !0), () => Ue(r);
}
function kd(e) {
  window.MotionDebug && window.MotionDebug.record(e);
}
function Fd(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
function $d(e, t, n) {
  const r = le(e) ? e : Mt(e);
  return r.start(Br("", r, t, n)), r.animation;
}
const Fn = ["", "X", "Y", "Z"], Bd = { visibility: "hidden" }, Es = 1e3;
let Hd = 0;
const qe = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function $n(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && (n[e] = i[e], t.setStaticValue(e, 0), r && (r[e] = 0));
}
function aa({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i }) {
  return class {
    constructor(o = {}, a = t == null ? void 0 : t()) {
      this.id = Hd++, this.animationId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, qe.totalNodes = qe.resolvedTargetDeltas = qe.recalculatedProjection = 0, this.nodes.forEach(Wd), this.nodes.forEach(qd), this.nodes.forEach(Zd), this.nodes.forEach(Yd), kd(qe);
      }, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new jd());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new zr()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
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
      this.isSVG = Fd(o), this.instance = o;
      const { layoutId: l, layout: u, visualElement: c } = this.options;
      if (c && !c.current && c.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), a && (u || l) && (this.isLayoutDirty = !0), e) {
        let f;
        const d = () => this.root.updateBlockedByResize = !1;
        e(o, () => {
          this.root.updateBlockedByResize = !0, f && f(), f = Ld(d, 250), qt.hasAnimatedSinceResize && (qt.hasAnimatedSinceResize = !1, this.nodes.forEach(Ss));
        });
      }
      l && this.root.registerSharedNode(l, this), this.options.animate !== !1 && c && (l || u) && this.addEventListener("didUpdate", ({ delta: f, hasLayoutChanged: d, hasRelativeTargetChanged: p, layout: h }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const g = this.options.transition || c.getDefaultTransition() || nh, { onLayoutAnimationStart: y, onLayoutAnimationComplete: b } = c.getProps(), T = !this.targetLayout || !oa(this.targetLayout, h) || p, E = !d && p;
        if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || E || d && (T || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0), this.setAnimationOrigin(f, E);
          const w = {
            ...Mr(g, "layout"),
            onPlay: y,
            onComplete: b
          };
          (c.shouldReduceMotion || this.options.layoutRoot) && (w.delay = 0, w.type = !1), this.startAnimation(w);
        } else
          d || Ss(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = h;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, Ue(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Jd), this.animationId++);
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
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        f.shouldResetTransform = !0, f.updateScroll("snapshot"), f.options.layoutRoot && f.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(bs);
        return;
      }
      this.isUpdating || this.nodes.forEach(Kd), this.isUpdating = !1, window.HandoffCancelAllAnimations && window.HandoffCancelAllAnimations(), this.nodes.forEach(Xd), this.nodes.forEach(Ud), this.nodes.forEach(zd), this.clearAllSnapshots();
      const a = $e.now();
      se.delta = He(0, 1e3 / 60, a - se.timestamp), se.timestamp = a, se.isProcessing = !0, Pn.update.process(se), Pn.preRender.process(se), Pn.render.process(se), se.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Er.read(() => this.update()));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Gd), this.sharedNodes.forEach(Qd);
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
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
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
      const o = this.isLayoutDirty || this.shouldResetTransform, a = this.projectionDelta && !sa(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      o && (a || Xe(this.latestValues) || c) && (i(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), rh(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: o } = this.options;
      if (!o)
        return J();
      const a = o.measureViewportBox(), { scroll: l } = this.root;
      return l && (Fe(a.x, l.offset.x), Fe(a.y, l.offset.y)), a;
    }
    removeElementScroll(o) {
      const a = J();
      ve(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: f } = u;
        if (u !== this.root && c && f.layoutScroll) {
          if (c.isRoot) {
            ve(a, o);
            const { scroll: d } = this.root;
            d && (Fe(a.x, -d.offset.x), Fe(a.y, -d.offset.y));
          }
          Fe(a.x, c.offset.x), Fe(a.y, c.offset.y);
        }
      }
      return a;
    }
    applyTransform(o, a = !1) {
      const l = J();
      ve(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && ht(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), Xe(c.latestValues) && ht(l, c.latestValues);
      }
      return Xe(this.latestValues) && ht(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = J();
      ve(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !Xe(u.latestValues))
          continue;
        ar(u.latestValues) && u.updateSnapshot();
        const c = J(), f = u.measurePageBox();
        ve(c, f), gs(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return Xe(this.latestValues) && gs(a, this.latestValues), a;
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
      const l = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l.isSharedProjectionDirty);
      const u = !!this.resumingFrom || this !== l;
      if (!(o || u && this.isSharedProjectionDirty || this.isProjectionDirty || !((a = this.parent) === null || a === void 0) && a.isProjectionDirty || this.attemptToResolveRelativeTarget))
        return;
      const { layout: f, layoutId: d } = this.options;
      if (!(!this.layout || !(f || d))) {
        if (this.resolvedRelativeTargetAt = se.timestamp, !this.targetDelta && !this.relativeTarget) {
          const p = this.getClosestProjectingParent();
          p && p.layout && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = J(), this.relativeTargetOrigin = J(), Ct(this.relativeTargetOrigin, this.layout.layoutBox, p.layout.layoutBox), ve(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (this.target || (this.target = J(), this.targetWithTransforms = J()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), id(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : ve(this.target, this.layout.layoutBox), Qo(this.target, this.targetDelta)) : ve(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget) {
            this.attemptToResolveRelativeTarget = !1;
            const p = this.getClosestProjectingParent();
            p && !!p.resumingFrom == !!this.resumingFrom && !p.options.layoutScroll && p.target && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = J(), this.relativeTargetOrigin = J(), Ct(this.relativeTargetOrigin, this.target, p.target), ve(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
          }
          qe.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || ar(this.parent.latestValues) || Jo(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var o;
      const a = this.getLead(), l = !!this.resumingFrom || this !== a;
      let u = !0;
      if ((this.isProjectionDirty || !((o = this.parent) === null || o === void 0) && o.isProjectionDirty) && (u = !1), l && (this.isSharedProjectionDirty || this.isTransformDirty) && (u = !1), this.resolvedRelativeTargetAt === se.timestamp && (u = !1), u)
        return;
      const { layout: c, layoutId: f } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(c || f))
        return;
      ve(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x, p = this.treeScale.y;
      hd(this.layoutCorrected, this.treeScale, this.path, l), a.layout && !a.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (a.target = a.layout.layoutBox, a.targetWithTransforms = J());
      const { target: h } = a;
      if (!h) {
        this.projectionTransform && (this.projectionDelta = dt(), this.projectionTransform = "none", this.scheduleRender());
        return;
      }
      this.projectionDelta || (this.projectionDelta = dt(), this.projectionDeltaWithTransform = dt());
      const g = this.projectionTransform;
      wt(this.projectionDelta, this.layoutCorrected, h, this.latestValues), this.projectionTransform = Ts(this.projectionDelta, this.treeScale), (this.projectionTransform !== g || this.treeScale.x !== d || this.treeScale.y !== p) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", h)), qe.recalculatedProjection++;
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
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, f = dt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const d = J(), p = l ? l.source : void 0, h = this.layout ? this.layout.source : void 0, g = p !== h, y = this.getStack(), b = !y || y.members.length <= 1, T = !!(g && !b && this.options.crossfade === !0 && !this.path.some(th));
      this.animationProgress = 0;
      let E;
      this.mixTargetDelta = (w) => {
        const _ = w / 1e3;
        _s(f.x, o.x, _), _s(f.y, o.y, _), this.setTargetDelta(f), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Ct(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), eh(this.relativeTarget, this.relativeTargetOrigin, d, _), E && Md(this.relativeTarget, E) && (this.isProjectionDirty = !1), E || (E = J()), ve(E, this.relativeTarget)), g && (this.animationValues = c, Cd(c, u, this.latestValues, _, T, b)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = _;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this.pendingAnimation && (Ue(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = ie.update(() => {
        qt.hasAnimatedSinceResize = !0, this.currentAnimation = $d(0, Es, {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Es), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = o;
      if (!(!a || !l || !u)) {
        if (this !== o && this.layout && u && la(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || J();
          const f = ge(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + f;
          const d = ge(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + d;
        }
        ve(a, l), ht(a, c), wt(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new Nd()), this.sharedNodes.get(o).add(a);
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
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
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
      const { latestValues: l } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && $n("z", o, u, this.animationValues);
      for (let c = 0; c < Fn.length; c++)
        $n(`rotate${Fn[c]}`, o, u, this.animationValues), $n(`skew${Fn[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    getProjectionStyles(o) {
      var a, l;
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible)
        return Bd;
      const u = {
        visibility: ""
      }, c = this.getTransformTemplate();
      if (this.needsReset)
        return this.needsReset = !1, u.opacity = "", u.pointerEvents = Kt(o == null ? void 0 : o.pointerEvents) || "", u.transform = c ? c(this.latestValues, "") : "none", u;
      const f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        const g = {};
        return this.options.layoutId && (g.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, g.pointerEvents = Kt(o == null ? void 0 : o.pointerEvents) || ""), this.hasProjected && !Xe(this.latestValues) && (g.transform = c ? c({}, "") : "none", this.hasProjected = !1), g;
      }
      const d = f.animationValues || f.latestValues;
      this.applyTransformsToTarget(), u.transform = Ts(this.projectionDeltaWithTransform, this.treeScale, d), c && (u.transform = c(d, u.transform));
      const { x: p, y: h } = this.projectionDelta;
      u.transformOrigin = `${p.origin * 100}% ${h.origin * 100}% 0`, f.animationValues ? u.opacity = f === this ? (l = (a = d.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !== null && l !== void 0 ? l : 1 : this.preserveOpacity ? this.latestValues.opacity : d.opacityExit : u.opacity = f === this ? d.opacity !== void 0 ? d.opacity : "" : d.opacityExit !== void 0 ? d.opacityExit : 0;
      for (const g in tn) {
        if (d[g] === void 0)
          continue;
        const { correct: y, applyTo: b } = tn[g], T = u.transform === "none" ? d[g] : y(d[g], f);
        if (b) {
          const E = b.length;
          for (let w = 0; w < E; w++)
            u[b[w]] = T;
        } else
          u[g] = T;
      }
      return this.options.layoutId && (u.pointerEvents = f === this ? Kt(o == null ? void 0 : o.pointerEvents) || "" : "none"), u;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) === null || a === void 0 ? void 0 : a.stop();
      }), this.root.nodes.forEach(bs), this.root.sharedNodes.clear();
    }
  };
}
function Ud(e) {
  e.updateLayout();
}
function zd(e) {
  var t;
  const n = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout, { animationType: s } = e.options, o = n.source !== e.layout.source;
    s === "size" ? Te((f) => {
      const d = o ? n.measuredBox[f] : n.layoutBox[f], p = ge(d);
      d.min = r[f].min, d.max = d.min + p;
    }) : la(s, n.layoutBox, r) && Te((f) => {
      const d = o ? n.measuredBox[f] : n.layoutBox[f], p = ge(r[f]);
      d.max = d.min + p, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[f].max = e.relativeTarget[f].min + p);
    });
    const a = dt();
    wt(a, r, n.layoutBox);
    const l = dt();
    o ? wt(l, e.applyTransform(i, !0), n.measuredBox) : wt(l, r, n.layoutBox);
    const u = !sa(a);
    let c = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const { snapshot: d, layout: p } = f;
        if (d && p) {
          const h = J();
          Ct(h, n.layoutBox, d.layoutBox);
          const g = J();
          Ct(g, r, p.layoutBox), oa(h, g) || (c = !0), f.options.layoutRoot && (e.relativeTarget = g, e.relativeTargetOrigin = h, e.relativeParent = f);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: c
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function Wd(e) {
  qe.totalNodes++, e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function Yd(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function Gd(e) {
  e.clearSnapshot();
}
function bs(e) {
  e.clearMeasurements();
}
function Kd(e) {
  e.isLayoutDirty = !1;
}
function Xd(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function Ss(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function qd(e) {
  e.resolveTargetDelta();
}
function Zd(e) {
  e.calcProjection();
}
function Jd(e) {
  e.resetSkewAndRotation();
}
function Qd(e) {
  e.removeLeadSnapshot();
}
function _s(e, t, n) {
  e.translate = X(t.translate, 0, n), e.scale = X(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function xs(e, t, n, r) {
  e.min = X(t.min, n.min, r), e.max = X(t.max, n.max, r);
}
function eh(e, t, n, r) {
  xs(e.x, t.x, n.x, r), xs(e.y, t.y, n.y, r);
}
function th(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const nh = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Rs = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), ws = Rs("applewebkit/") && !Rs("chrome/") ? Math.round : oe;
function Cs(e) {
  e.min = ws(e.min), e.max = ws(e.max);
}
function rh(e) {
  Cs(e.x), Cs(e.y);
}
function la(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !sr(vs(t), vs(n), 0.2);
}
const ih = aa({
  attachResizeListener: (e, t) => Ae(e, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Bn = {
  current: void 0
}, ca = aa({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!Bn.current) {
      const e = new ih({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), Bn.current = e;
    }
    return Bn.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), sh = {
  pan: {
    Feature: bd
  },
  drag: {
    Feature: Ed,
    ProjectionNode: ca,
    MeasureLayout: na
  }
}, cr = { current: null }, ua = { current: !1 };
function oh() {
  if (ua.current = !0, !!yr)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => cr.current = e.matches;
      e.addListener(t), t();
    } else
      cr.current = !1;
}
function ah(e, t, n) {
  const { willChange: r } = t;
  for (const i in t) {
    const s = t[i], o = n[i];
    if (le(s))
      e.addValue(i, s), an(r) && r.add(i), process.env.NODE_ENV === "development" && Wr(s.version === "11.0.23", `Attempting to mix Framer Motion versions ${s.version} with 11.0.23 may not work as expected.`);
    else if (le(o))
      e.addValue(i, Mt(s, { owner: e })), an(r) && r.remove(i);
    else if (o !== s)
      if (e.hasValue(i)) {
        const a = e.getValue(i);
        !a.hasAnimated && a.set(s);
      } else {
        const a = e.getStaticValue(i);
        e.addValue(i, Mt(a !== void 0 ? a : s, { owner: e }));
      }
  }
  for (const i in n)
    t[i] === void 0 && e.removeValue(i);
  return t;
}
const Ds = /* @__PURE__ */ new WeakMap(), lh = [...So, ae, ze], ch = (e) => lh.find(bo(e)), fa = Object.keys(It), uh = fa.length, Ps = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
], fh = Sr.length;
class dh {
  constructor({ parent: t, props: n, presenceContext: r, reducedMotionConfig: i, blockInitialAnimation: s, visualState: o }, a = {}) {
    this.resolveKeyframes = (d, p, h, g) => new this.KeyframeResolver(d, p, h, g, this), this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Nr, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.scheduleRender = () => ie.render(this.render, !1, !0);
    const { latestValues: l, renderState: u } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = n, this.presenceContext = r, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!s, this.isControllingVariants = yn(n), this.isVariantNode = qs(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: c, ...f } = this.scrapeMotionValuesFromProps(n, {});
    for (const d in f) {
      const p = f[d];
      l[d] !== void 0 && le(p) && (p.set(l[d], !1), an(c) && c.add(d));
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
    this.current = t, Ds.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, r) => this.bindToMotionValue(r, n)), ua.current || oh(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : cr.current, process.env.NODE_ENV !== "production" && Wr(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected."), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    Ds.delete(this.current), this.projection && this.projection.unmount(), Ue(this.notifyUpdate), Ue(this.render), this.valueSubscriptions.forEach((t) => t()), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features)
      this.features[t].unmount();
    this.current = null;
  }
  bindToMotionValue(t, n) {
    const r = ot.has(t), i = n.on("change", (o) => {
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
      const l = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
      n.ignoreStrict ? Lt(!1, l) : De(!1, l);
    }
    for (let l = 0; l < uh; l++) {
      const u = fa[l], { isEnabled: c, Feature: f, ProjectionNode: d, MeasureLayout: p } = It[u];
      d && (o = d), c(n) && (!this.features[u] && f && (this.features[u] = new f(this)), p && (a = p));
    }
    if ((this.type === "html" || this.type === "svg") && !this.projection && o) {
      this.projection = new o(this.latestValues, this.parent && this.parent.projection);
      const { layoutId: l, layout: u, drag: c, dragConstraints: f, layoutScroll: d, layoutRoot: p } = n;
      this.projection.setOptions({
        layoutId: l,
        layout: u,
        alwaysMeasureLayout: !!c || f && ut(f),
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
        layoutScroll: d,
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
    for (let r = 0; r < Ps.length; r++) {
      const i = Ps[r];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const s = t["on" + i];
      s && (this.propEventSubscriptions[i] = this.on(i, s));
    }
    this.prevMotionValues = ah(this, this.scrapeMotionValuesFromProps(t, this.prevProps), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    for (let r = 0; r < fh; r++) {
      const i = Sr[r], s = this.props[i];
      (At(s) || s === !1) && (n[i] = s);
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
    return r === void 0 && n !== void 0 && (r = Mt(n === null ? void 0 : n, { owner: this }), this.addValue(t, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    var r;
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : (r = this.getBaseTargetFromProps(this.props, t)) !== null && r !== void 0 ? r : this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (To(i) || vo(i)) ? i = parseFloat(i) : !ch(i) && ze.test(n) && (i = Ao(t, n)), this.setBaseTarget(t, le(i) ? i.get() : i)), le(i) ? i.get() : i;
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
    const { initial: i } = this.props, s = typeof i == "string" || typeof i == "object" ? (r = Or(this.props, i, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom)) === null || r === void 0 ? void 0 : r[t] : void 0;
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !le(o) ? o : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new zr()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class da extends dh {
  constructor() {
    super(...arguments), this.KeyframeResolver = Io;
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
function hh(e) {
  return window.getComputedStyle(e);
}
class ph extends da {
  constructor() {
    super(...arguments), this.type = "html";
  }
  readValueFromInstance(t, n) {
    if (ot.has(n)) {
      const r = jr(n);
      return r && r.default || 0;
    } else {
      const r = hh(t), i = (eo(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return ea(t, n);
  }
  build(t, n, r, i) {
    Cr(t, n, r, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n) {
    return Ir(t, n);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    le(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
  renderInstance(t, n, r, i) {
    so(t, n, r, i);
  }
}
class mh extends da {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (ot.has(n)) {
      const r = jr(n);
      return r && r.default || 0;
    }
    return n = oo.has(n) ? n : Tr(n), t.getAttribute(n);
  }
  measureInstanceViewportBox() {
    return J();
  }
  scrapeMotionValuesFromProps(t, n) {
    return lo(t, n);
  }
  build(t, n, r, i) {
    Pr(t, n, r, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    ao(t, n, r, i);
  }
  mount(t) {
    this.isSVGTag = Ar(t.tagName), super.mount(t);
  }
}
const gh = (e, t) => xr(e) ? new mh(t, { enableHardwareAcceleration: !1 }) : new ph(t, { enableHardwareAcceleration: !0 }), yh = {
  layout: {
    ProjectionNode: ca,
    MeasureLayout: na
  }
}, vh = {
  ...ed,
  ...du,
  ...sh,
  ...yh
}, Th = /* @__PURE__ */ Sc((e, t) => Qc(e, t, vh, gh));
function ha() {
  const e = we(!1);
  return vr(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function Eh() {
  const e = ha(), [t, n] = he(0), r = Ve(() => {
    e.current && n(t + 1);
  }, [t]);
  return [Ve(() => ie.postRender(r), [r]), t];
}
class bh extends ue.Component {
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
function Sh({ children: e, isPresent: t }) {
  const n = ur(), r = we(null), i = we({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }), { nonce: s } = ne(gr);
  return As(() => {
    const { width: o, height: a, top: l, left: u } = i.current;
    if (t || !r.current || !o || !a)
      return;
    r.current.dataset.motionPopId = n;
    const c = document.createElement("style");
    return s && (c.nonce = s), document.head.appendChild(c), c.sheet && c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${o}px !important;
            height: ${a}px !important;
            top: ${l}px !important;
            left: ${u}px !important;
          }
        `), () => {
      document.head.removeChild(c);
    };
  }, [t]), ue.createElement(bh, { isPresent: t, childRef: r, sizeRef: i }, ue.cloneElement(e, { ref: r }));
}
const Hn = ({ children: e, initial: t, isPresent: n, onExitComplete: r, custom: i, presenceAffectsLayout: s, mode: o }) => {
  const a = co(_h), l = ur(), u = tt(
    () => ({
      id: l,
      initial: t,
      isPresent: n,
      custom: i,
      onExitComplete: (c) => {
        a.set(c, !0);
        for (const f of a.values())
          if (!f)
            return;
        r && r();
      },
      register: (c) => (a.set(c, !1), () => a.delete(c))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    s ? void 0 : [n]
  );
  return tt(() => {
    a.forEach((c, f) => a.set(f, !1));
  }, [n]), ue.useEffect(() => {
    !n && !a.size && r && r();
  }, [n]), o === "popLayout" && (e = ue.createElement(Sh, { isPresent: n }, e)), ue.createElement(mn.Provider, { value: u }, e);
};
function _h() {
  return /* @__PURE__ */ new Map();
}
function xh(e) {
  return We(() => () => e(), []);
}
const Ze = (e) => e.key || "";
function Rh(e, t) {
  e.forEach((n) => {
    const r = Ze(n);
    t.set(r, n);
  });
}
function wh(e) {
  const t = [];
  return Ka.forEach(e, (n) => {
    Xa(n) && t.push(n);
  }), t;
}
const pa = ({ children: e, custom: t, initial: n = !0, onExitComplete: r, exitBeforeEnter: i, presenceAffectsLayout: s = !0, mode: o = "sync" }) => {
  De(!i, "Replace exitBeforeEnter with mode='wait'");
  const a = ne(_r).forceRender || Eh()[0], l = ha(), u = wh(e);
  let c = u;
  const f = we(/* @__PURE__ */ new Map()).current, d = we(c), p = we(/* @__PURE__ */ new Map()).current, h = we(!0);
  if (vr(() => {
    h.current = !1, Rh(u, p), d.current = c;
  }), xh(() => {
    h.current = !0, p.clear(), f.clear();
  }), h.current)
    return ue.createElement(ue.Fragment, null, c.map((T) => ue.createElement(Hn, { key: Ze(T), isPresent: !0, initial: n ? void 0 : !1, presenceAffectsLayout: s, mode: o }, T)));
  c = [...c];
  const g = d.current.map(Ze), y = u.map(Ze), b = g.length;
  for (let T = 0; T < b; T++) {
    const E = g[T];
    y.indexOf(E) === -1 && !f.has(E) && f.set(E, void 0);
  }
  return o === "wait" && f.size && (c = []), f.forEach((T, E) => {
    if (y.indexOf(E) !== -1)
      return;
    const w = p.get(E);
    if (!w)
      return;
    const _ = g.indexOf(E);
    let P = T;
    if (!P) {
      const A = () => {
        f.delete(E);
        const v = Array.from(p.keys()).filter((N) => !y.includes(N));
        if (v.forEach((N) => p.delete(N)), d.current = u.filter((N) => {
          const S = Ze(N);
          return (
            // filter out the node exiting
            S === E || // filter out the leftover children
            v.includes(S)
          );
        }), !f.size) {
          if (l.current === !1)
            return;
          a(), r && r();
        }
      };
      P = ue.createElement(Hn, { key: Ze(w), isPresent: !1, onExitComplete: A, custom: t, presenceAffectsLayout: s, mode: o }, w), f.set(E, P);
    }
    c.splice(_, 0, P);
  }), c = c.map((T) => {
    const E = T.key;
    return f.has(E) ? T : ue.createElement(Hn, { key: Ze(T), isPresent: !0, presenceAffectsLayout: s, mode: o }, T);
  }), process.env.NODE_ENV !== "production" && o === "wait" && c.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`), ue.createElement(ue.Fragment, null, f.size ? c : c.map((T) => Ga(T)));
}, Ch = Is(
  ({ onClick: e, rect: t }, n) => /* @__PURE__ */ j.jsx(pa, { children: t && /* @__PURE__ */ j.jsx(
    Th.div,
    {
      ref: n,
      onClick: (r) => e(r.nativeEvent),
      id: `${st}highlight-blocker`,
      style: {
        position: "absolute",
        pointerEvents: "all",
        top: `${t.top + window.scrollY - 80}px`,
        left: `${t.left + window.scrollX - 240}px`,
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
);
var ma = { exports: {} };
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
          for (var l in s)
            i.d(a, l, (function(u) {
              return s[u];
            }).bind(null, l));
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
      var s, o = this && this.__extends || (s = function(f, d) {
        return (s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, h) {
          p.__proto__ = h;
        } || function(p, h) {
          for (var g in h)
            Object.prototype.hasOwnProperty.call(h, g) && (p[g] = h[g]);
        })(f, d);
      }, function(f, d) {
        function p() {
          this.constructor = f;
        }
        s(f, d), f.prototype = d === null ? Object.create(d) : (p.prototype = d.prototype, new p());
      }), a = this && this.__importDefault || function(f) {
        return f && f.__esModule ? f : { default: f };
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.eventEmitter = r.INTERNAL_ERROR_EVENT = r.UNKNOWN_IDX = r.ROOT_IDX = r.getStylesheet = r.getDefaultOptions = r.CAMEL_DATASET_SPLIT_TYPE = r.CAMEL_DATASET_IDENTIFIER_EXTRA = r.CAMEL_DATASET_IDENTIFIER = r.DATASET_SPLIT_TYPE = r.DATASET_IDENTIFIER_EXTRA = r.DATASET_IDENTIFIER = r.STYLESHEET_ID = r.LOCAL_STORE_KEY = r.ID_DIVISION = void 0;
      var l = a(i(10)), u = a(i(2));
      r.ID_DIVISION = ";", r.LOCAL_STORE_KEY = "highlight-mengshou", r.STYLESHEET_ID = "highlight-mengshou-style", r.DATASET_IDENTIFIER = "highlight-id", r.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra", r.DATASET_SPLIT_TYPE = "highlight-split-type", r.CAMEL_DATASET_IDENTIFIER = l.default(r.DATASET_IDENTIFIER), r.CAMEL_DATASET_IDENTIFIER_EXTRA = l.default(r.DATASET_IDENTIFIER_EXTRA), r.CAMEL_DATASET_SPLIT_TYPE = l.default(r.DATASET_SPLIT_TYPE), r.getDefaultOptions = function() {
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
      var c = function(f) {
        function d() {
          return f !== null && f.apply(this, arguments) || this;
        }
        return o(d, f), d;
      }(u.default);
      r.eventEmitter = new c();
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
      var s = this && this.__read || function(l, u) {
        var c = typeof Symbol == "function" && l[Symbol.iterator];
        if (!c)
          return l;
        var f, d, p = c.call(l), h = [];
        try {
          for (; (u === void 0 || u-- > 0) && !(f = p.next()).done; )
            h.push(f.value);
        } catch (g) {
          d = { error: g };
        } finally {
          try {
            f && !f.done && (c = p.return) && c.call(p);
          } finally {
            if (d)
              throw d.error;
          }
        }
        return h;
      }, o = this && this.__spread || function() {
        for (var l = [], u = 0; u < arguments.length; u++)
          l = l.concat(s(arguments[u]));
        return l;
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var a = function() {
        function l() {
          this.handlersMap = /* @__PURE__ */ Object.create(null);
        }
        return l.prototype.on = function(u, c) {
          return this.handlersMap[u] || (this.handlersMap[u] = []), this.handlersMap[u].push(c), this;
        }, l.prototype.off = function(u, c) {
          return this.handlersMap[u] && this.handlersMap[u].splice(this.handlersMap[u].indexOf(c) >>> 0, 1), this;
        }, l.prototype.emit = function(u) {
          for (var c = [], f = 1; f < arguments.length; f++)
            c[f - 1] = arguments[f];
          return this.handlersMap[u] && this.handlersMap[u].slice().forEach(function(d) {
            d.apply(void 0, o(c));
          }), this;
        }, l;
      }();
      r.default = a;
    }, function(n, r, i) {
      var s = this && this.__importDefault || function(u) {
        return u && u.__esModule ? u : { default: u };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var o = s(i(5)), a = i(9), l = function() {
        function u(c, f, d, p, h) {
          this.startMeta = c, this.endMeta = f, this.text = d, this.id = p, this.__isHighlightSource = {}, h && (this.extra = h);
        }
        return u.prototype.deSerialize = function(c, f) {
          var d = a.queryElementNode(this, c), p = d.start, h = d.end, g = a.getTextChildByOffset(p, this.startMeta.textOffset), y = a.getTextChildByOffset(h, this.endMeta.textOffset);
          if (!f.Serialize.Restore.isEmpty()) {
            var b = f.Serialize.Restore.call(this, g, y) || [];
            g = b[0] || g, y = b[1] || y;
          }
          return new o.default(g, y, this.text, this.id, !0);
        }, u;
      }();
      r.default = l;
    }, function(n, r, i) {
      var s = this && this.__values || function(c) {
        var f = typeof Symbol == "function" && Symbol.iterator, d = f && c[f], p = 0;
        if (d)
          return d.call(c);
        if (c && typeof c.length == "number")
          return { next: function() {
            return c && p >= c.length && (c = void 0), { value: c && c[p++], done: !c };
          } };
        throw new TypeError(f ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, o = this && this.__read || function(c, f) {
        var d = typeof Symbol == "function" && c[Symbol.iterator];
        if (!d)
          return c;
        var p, h, g = d.call(c), y = [];
        try {
          for (; (f === void 0 || f-- > 0) && !(p = g.next()).done; )
            y.push(p.value);
        } catch (b) {
          h = { error: b };
        } finally {
          try {
            p && !p.done && (d = g.return) && d.call(g);
          } finally {
            if (h)
              throw h.error;
          }
        }
        return y;
      }, a = this && this.__spread || function() {
        for (var c = [], f = 0; f < arguments.length; f++)
          c = c.concat(o(arguments[f]));
        return c;
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.hasClass = r.removeAllClass = r.removeClass = r.addClass = r.addEventListener = r.removeEventListener = r.forEach = r.getHighlightById = r.getHighlightsByRoot = r.getExtraHighlightId = r.getHighlightId = r.isHighlightWrapNode = void 0;
      var l = i(0);
      r.isHighlightWrapNode = function(c) {
        return !!c.dataset && !!c.dataset[l.CAMEL_DATASET_IDENTIFIER];
      };
      var u = function(c, f) {
        for (var d = !1, p = null; c; ) {
          if (r.isHighlightWrapNode(c) && (p = c), c === f) {
            d = !0;
            break;
          }
          c = c.parentNode;
        }
        return d ? p : null;
      };
      r.getHighlightId = function(c, f) {
        return (c = u(c, f)) ? c.dataset[l.CAMEL_DATASET_IDENTIFIER] : "";
      }, r.getExtraHighlightId = function(c, f) {
        return (c = u(c, f)) ? c.dataset[l.CAMEL_DATASET_IDENTIFIER_EXTRA].split(l.ID_DIVISION).filter(function(d) {
          return d;
        }) : [];
      }, r.getHighlightsByRoot = function(c, f) {
        var d, p;
        Array.isArray(c) || (c = [c]);
        var h = [];
        try {
          for (var g = s(c), y = g.next(); !y.done; y = g.next()) {
            var b = y.value.querySelectorAll(f + "[data-" + l.DATASET_IDENTIFIER + "]");
            h.push.apply(h, b);
          }
        } catch (T) {
          d = { error: T };
        } finally {
          try {
            y && !y.done && (p = g.return) && p.call(g);
          } finally {
            if (d)
              throw d.error;
          }
        }
        return h;
      }, r.getHighlightById = function(c, f, d) {
        var p, h, g = [], y = new RegExp("(" + f + "\\" + l.ID_DIVISION + "|\\" + l.ID_DIVISION + "?" + f + "$)"), b = c.querySelectorAll(d + "[data-" + l.DATASET_IDENTIFIER + "]");
        try {
          for (var T = s(b), E = T.next(); !E.done; E = T.next()) {
            var w = E.value;
            if (w.dataset[l.CAMEL_DATASET_IDENTIFIER] !== f) {
              var _ = w.dataset[l.CAMEL_DATASET_IDENTIFIER_EXTRA];
              y.test(_) && g.push(w);
            } else
              g.push(w);
          }
        } catch (P) {
          p = { error: P };
        } finally {
          try {
            E && !E.done && (h = T.return) && h.call(T);
          } finally {
            if (p)
              throw p.error;
          }
        }
        return g;
      }, r.forEach = function(c, f) {
        for (var d = 0; d < c.length; d++)
          f(c[d], d, c);
      }, r.removeEventListener = function(c, f, d) {
        c.removeEventListener(f, d);
      }, r.addEventListener = function(c, f, d) {
        return c.addEventListener(f, d), function() {
          r.removeEventListener(c, f, d);
        };
      }, r.addClass = function(c, f) {
        var d;
        Array.isArray(f) || (f = [f]), (d = c.classList).add.apply(d, a(f));
      }, r.removeClass = function(c, f) {
        c.classList.remove(f);
      }, r.removeAllClass = function(c) {
        c.className = "";
      }, r.hasClass = function(c, f) {
        return c.classList.contains(f);
      };
    }, function(n, r, i) {
      var s = this && this.__importDefault || function(p) {
        return p && p.__esModule ? p : { default: p };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var o = s(i(3)), a = i(1), l = i(11), u = s(i(6)), c = i(12), f = i(0), d = function() {
        function p(h, g, y, b, T) {
          T === void 0 && (T = !1), h.$node.nodeType === 3 && g.$node.nodeType === 3 || f.eventEmitter.emit(f.INTERNAL_ERROR_EVENT, { type: a.ERROR.RANGE_NODE_INVALID }), this.start = c.formatDomNode(h), this.end = c.formatDomNode(g), this.text = y, this.frozen = T, this.id = b;
        }
        return p.fromSelection = function(h) {
          var g = l.getDomRange();
          if (!g)
            return null;
          var y = { $node: g.startContainer, offset: g.startOffset }, b = { $node: g.endContainer, offset: g.endOffset }, T = g.toString(), E = h.call(y, b, T);
          return new p(y, b, T, E = E ?? u.default());
        }, p.prototype.serialize = function(h, g) {
          var y, b = c.getDomMeta(this.start.$node, this.start.offset, h), T = c.getDomMeta(this.end.$node, this.end.offset, h);
          return g.Serialize.RecordInfo.isEmpty() || (y = g.Serialize.RecordInfo.call(this.start, this.end, h)), this.frozen = !0, new o.default(b, T, this.text, this.id, y);
        }, p.removeDomRange = l.removeSelection, p;
      }();
      r.default = d;
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.default = function s(o) {
        return o ? (o ^ 16 * Math.random() >> o / 4).toString(16) : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, s);
      };
    }, function(n, r, i) {
      n.exports = i(8);
    }, function(n, r, i) {
      var s, o = this && this.__extends || (s = function(_, P) {
        return (s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(A, v) {
          A.__proto__ = v;
        } || function(A, v) {
          for (var N in v)
            Object.prototype.hasOwnProperty.call(v, N) && (A[N] = v[N]);
        })(_, P);
      }, function(_, P) {
        function A() {
          this.constructor = _;
        }
        s(_, P), _.prototype = P === null ? Object.create(P) : (A.prototype = P.prototype, new A());
      }), a = this && this.__assign || function() {
        return (a = Object.assign || function(_) {
          for (var P, A = 1, v = arguments.length; A < v; A++)
            for (var N in P = arguments[A])
              Object.prototype.hasOwnProperty.call(P, N) && (_[N] = P[N]);
          return _;
        }).apply(this, arguments);
      }, l = this && this.__importDefault || function(_) {
        return _ && _.__esModule ? _ : { default: _ };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var u = l(i(2)), c = l(i(5)), f = l(i(3)), d = l(i(6)), p = l(i(13)), h = l(i(14)), g = l(i(16)), y = l(i(17)), b = i(0), T = i(1), E = i(4), w = function(_) {
        function P(A) {
          var v = _.call(this) || this;
          v.event = h.default(), v.run = function() {
            return E.addEventListener(v.options.$root, v.event.PointerEnd, v._handleSelection);
          }, v.stop = function() {
            E.removeEventListener(v.options.$root, v.event.PointerEnd, v._handleSelection);
          }, v.addClass = function(S, V) {
            v.getDoms(V).forEach(function(H) {
              E.addClass(H, S);
            });
          }, v.removeClass = function(S, V) {
            v.getDoms(V).forEach(function(H) {
              E.removeClass(H, S);
            });
          }, v.getIdByDom = function(S) {
            return E.getHighlightId(S, v.options.$root);
          }, v.getExtraIdByDom = function(S) {
            return E.getExtraHighlightId(S, v.options.$root);
          }, v.getDoms = function(S) {
            return S ? E.getHighlightById(v.options.$root, S, v.options.wrapTag) : E.getHighlightsByRoot(v.options.$root, v.options.wrapTag);
          }, v.dispose = function() {
            var S = v.options.$root;
            E.removeEventListener(S, v.event.PointerOver, v._handleHighlightHover), E.removeEventListener(S, v.event.PointerEnd, v._handleSelection), E.removeEventListener(S, v.event.PointerTap, v._handleHighlightClick), v.removeAll();
          }, v.setOption = function(S) {
            v.options = a(a({}, v.options), S), v.painter = new y.default({ $root: v.options.$root, wrapTag: v.options.wrapTag, className: v.options.style.className, exceptSelectors: v.options.exceptSelectors }, v.hooks);
          }, v.fromRange = function(S) {
            var V = { $node: S.startContainer, offset: S.startOffset }, H = { $node: S.endContainer, offset: S.endOffset }, z = S.toString(), I = v.hooks.Render.UUID.call(V, H, z);
            I = I ?? d.default();
            var R = new c.default(V, H, z, I);
            return R ? v._highlightFromHRange(R) : (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: T.ERROR.RANGE_INVALID }), null);
          }, v.fromStore = function(S, V, H, z, I) {
            var R = new f.default(S, V, H, z, I);
            try {
              return v._highlightFromHSource(R), R;
            } catch (x) {
              return b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: T.ERROR.HIGHLIGHT_SOURCE_RECREATE, error: x, detail: R }), null;
            }
          }, v._getHooks = function() {
            return { Render: { UUID: new p.default("Render.UUID"), SelectedNodes: new p.default("Render.SelectedNodes"), WrapNode: new p.default("Render.WrapNode") }, Serialize: { Restore: new p.default("Serialize.Restore"), RecordInfo: new p.default("Serialize.RecordInfo") }, Remove: { UpdateNodes: new p.default("Remove.UpdateNodes") } };
          }, v._highlightFromHRange = function(S) {
            var V = S.serialize(v.options.$root, v.hooks);
            return v.painter.highlightRange(S).length === 0 ? (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: T.ERROR.DOM_SELECTION_EMPTY }), null) : (v.cache.save(V), v.emit(T.EventType.CREATE, { sources: [V], type: T.CreateFrom.INPUT }, v), V);
          }, v._handleSelection = function() {
            var S = c.default.fromSelection(v.hooks.Render.UUID);
            S && (v._highlightFromHRange(S), c.default.removeDomRange());
          }, v._handleHighlightHover = function(S) {
            var V = S.target;
            if (!E.isHighlightWrapNode(V))
              return v._hoverId && v.emit(T.EventType.HOVER_OUT, { id: v._hoverId }, v, S), void (v._hoverId = null);
            var H = E.getHighlightId(V, v.options.$root);
            v._hoverId !== H && (v._hoverId && v.emit(T.EventType.HOVER_OUT, { id: v._hoverId }, v, S), v._hoverId = H, v.emit(T.EventType.HOVER, { id: v._hoverId }, v, S));
          }, v._handleError = function(S) {
            v.options.verbose && console.warn(S);
          }, v._handleHighlightClick = function(S) {
            var V = S.target;
            if (E.isHighlightWrapNode(V)) {
              var H = E.getHighlightId(V, v.options.$root);
              v.emit(T.EventType.CLICK, { id: H }, v, S);
            }
          }, v.options = b.getDefaultOptions(), v.hooks = v._getHooks(), v.setOption(A), v.cache = new g.default();
          var N = v.options.$root;
          return E.addEventListener(N, v.event.PointerOver, v._handleHighlightHover), E.addEventListener(N, v.event.PointerTap, v._handleHighlightClick), b.eventEmitter.on(b.INTERNAL_ERROR_EVENT, v._handleError), v;
        }
        return o(P, _), P.prototype.remove = function(A) {
          if (A) {
            var v = this.painter.removeHighlight(A);
            this.cache.remove(A), v && this.emit(T.EventType.REMOVE, { ids: [A] }, this);
          }
        }, P.prototype.removeAll = function() {
          this.painter.removeAllHighlight();
          var A = this.cache.removeAll();
          this.emit(T.EventType.REMOVE, { ids: A }, this);
        }, P.prototype._highlightFromHSource = function(A) {
          A === void 0 && (A = []);
          var v = this.painter.highlightSource(A);
          this.emit(T.EventType.CREATE, { sources: v, type: T.CreateFrom.STORE }, this), this.cache.save(A);
        }, P.event = T.EventType, P.isHighlightWrapNode = E.isHighlightWrapNode, P.isHighlightSource = function(A) {
          return !!A.__isHighlightSource;
        }, P;
      }(u.default);
      r.default = w;
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.queryElementNode = r.getTextChildByOffset = void 0;
      var s = i(0);
      r.getTextChildByOffset = function(o, a) {
        for (var l = [o], u = null, c = 0, f = 0; u = l.pop(); ) {
          for (var d = u.childNodes, p = d.length - 1; p >= 0; p--)
            l.push(d[p]);
          if (u.nodeType === 3 && (f = a - c, (c += u.textContent.length) >= a))
            break;
        }
        return u || (u = o), { $node: u, offset: f };
      }, r.queryElementNode = function(o, a) {
        return { start: o.startMeta.parentIndex === s.ROOT_IDX ? a : a.getElementsByTagName(o.startMeta.parentTagName)[o.startMeta.parentIndex], end: o.endMeta.parentIndex === s.ROOT_IDX ? a : a.getElementsByTagName(o.endMeta.parentTagName)[o.endMeta.parentIndex] };
      };
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.default = function(s) {
        return s.split("-").reduce(function(o, a, l) {
          return o + (l === 0 ? a : a[0].toUpperCase() + a.slice(1));
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
      r.getDomMeta = function(o, a, l) {
        var u = function(d) {
          if (d instanceof HTMLElement && (!d.dataset || !d.dataset[s.CAMEL_DATASET_IDENTIFIER]))
            return d;
          for (var p = d.parentNode; p != null && p.dataset[s.CAMEL_DATASET_IDENTIFIER]; )
            p = p.parentNode;
          return p;
        }(o), c = u === l ? s.ROOT_IDX : function(d, p) {
          for (var h = d.tagName, g = p.getElementsByTagName(h), y = 0; y < g.length; y++)
            if (d === g[y])
              return y;
          return s.UNKNOWN_IDX;
        }(u, l), f = function(d, p) {
          for (var h = [d], g = null, y = 0; g = h.pop(); ) {
            for (var b = g.childNodes, T = b.length - 1; T >= 0; T--)
              h.push(b[T]);
            if (g.nodeType === 3 && g !== p)
              y += g.textContent.length;
            else if (g.nodeType === 3)
              break;
          }
          return y;
        }(u, o);
        return { parentTagName: u.tagName, parentIndex: c, textOffset: f + a };
      }, r.formatDomNode = function(o) {
        return o.$node.nodeType === 3 || o.$node.nodeType === 4 || o.$node.nodeType === 8 ? o : { $node: o.$node.childNodes[o.offset], offset: 0 };
      };
    }, function(n, r, i) {
      var s = this && this.__read || function(l, u) {
        var c = typeof Symbol == "function" && l[Symbol.iterator];
        if (!c)
          return l;
        var f, d, p = c.call(l), h = [];
        try {
          for (; (u === void 0 || u-- > 0) && !(f = p.next()).done; )
            h.push(f.value);
        } catch (g) {
          d = { error: g };
        } finally {
          try {
            f && !f.done && (c = p.return) && c.call(p);
          } finally {
            if (d)
              throw d.error;
          }
        }
        return h;
      }, o = this && this.__spread || function() {
        for (var l = [], u = 0; u < arguments.length; u++)
          l = l.concat(s(arguments[u]));
        return l;
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var a = function() {
        function l(u) {
          this.name = "", this.ops = [], this.name = u;
        }
        return l.prototype.tap = function(u) {
          var c = this;
          return this.ops.indexOf(u) === -1 && this.ops.push(u), function() {
            c.remove(u);
          };
        }, l.prototype.remove = function(u) {
          var c = this.ops.indexOf(u);
          c < 0 || this.ops.splice(c, 1);
        }, l.prototype.isEmpty = function() {
          return this.ops.length === 0;
        }, l.prototype.call = function() {
          for (var u, c = [], f = 0; f < arguments.length; f++)
            c[f] = arguments[f];
          return this.ops.forEach(function(d) {
            u = d.apply(void 0, o(c));
          }), u;
        }, l;
      }();
      r.default = a;
    }, function(n, r, i) {
      var s = this && this.__importDefault || function(l) {
        return l && l.__esModule ? l : { default: l };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var o = i(1), a = s(i(15));
      r.default = function() {
        var l = a.default(window.navigator.userAgent);
        return { PointerEnd: l ? o.UserInputEvent.touchend : o.UserInputEvent.mouseup, PointerTap: l ? o.UserInputEvent.touchstart : o.UserInputEvent.click, PointerOver: l ? o.UserInputEvent.touchstart : o.UserInputEvent.mouseover };
      };
    }, function(n, r, i) {
      Object.defineProperty(r, "__esModule", { value: !0 });
      var s = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
      r.default = function(o) {
        return s.test(o);
      };
    }, function(n, r, i) {
      var s, o = this && this.__extends || (s = function(d, p) {
        return (s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, g) {
          h.__proto__ = g;
        } || function(h, g) {
          for (var y in g)
            Object.prototype.hasOwnProperty.call(g, y) && (h[y] = g[y]);
        })(d, p);
      }, function(d, p) {
        function h() {
          this.constructor = d;
        }
        s(d, p), d.prototype = p === null ? Object.create(p) : (h.prototype = p.prototype, new h());
      }), a = this && this.__values || function(d) {
        var p = typeof Symbol == "function" && Symbol.iterator, h = p && d[p], g = 0;
        if (h)
          return h.call(d);
        if (d && typeof d.length == "number")
          return { next: function() {
            return d && g >= d.length && (d = void 0), { value: d && d[g++], done: !d };
          } };
        throw new TypeError(p ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, l = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var u = l(i(2)), c = i(1), f = function(d) {
        function p() {
          var h = d !== null && d.apply(this, arguments) || this;
          return h._data = /* @__PURE__ */ new Map(), h;
        }
        return o(p, d), Object.defineProperty(p.prototype, "data", { get: function() {
          return this.getAll();
        }, set: function(h) {
          throw c.ERROR.CACHE_SET_ERROR;
        }, enumerable: !1, configurable: !0 }), p.prototype.save = function(h) {
          var g = this;
          Array.isArray(h) ? h.forEach(function(y) {
            return g._data.set(y.id, y);
          }) : this._data.set(h.id, h);
        }, p.prototype.get = function(h) {
          return this._data.get(h);
        }, p.prototype.remove = function(h) {
          this._data.delete(h);
        }, p.prototype.getAll = function() {
          var h, g, y = [];
          try {
            for (var b = a(this._data), T = b.next(); !T.done; T = b.next()) {
              var E = T.value;
              y.push(E[1]);
            }
          } catch (w) {
            h = { error: w };
          } finally {
            try {
              T && !T.done && (g = b.return) && g.call(b);
            } finally {
              if (h)
                throw h.error;
            }
          }
          return y;
        }, p.prototype.removeAll = function() {
          var h, g, y = [];
          try {
            for (var b = a(this._data), T = b.next(); !T.done; T = b.next()) {
              var E = T.value;
              y.push(E[0]);
            }
          } catch (w) {
            h = { error: w };
          } finally {
            try {
              T && !T.done && (g = b.return) && g.call(b);
            } finally {
              if (h)
                throw h.error;
            }
          }
          return this._data = /* @__PURE__ */ new Map(), y;
        }, p;
      }(u.default);
      r.default = f;
    }, function(n, r, i) {
      var s = this && this.__values || function(y) {
        var b = typeof Symbol == "function" && Symbol.iterator, T = b && y[b], E = 0;
        if (T)
          return T.call(y);
        if (y && typeof y.length == "number")
          return { next: function() {
            return y && E >= y.length && (y = void 0), { value: y && y[E++], done: !y };
          } };
        throw new TypeError(b ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, o = this && this.__read || function(y, b) {
        var T = typeof Symbol == "function" && y[Symbol.iterator];
        if (!T)
          return y;
        var E, w, _ = T.call(y), P = [];
        try {
          for (; (b === void 0 || b-- > 0) && !(E = _.next()).done; )
            P.push(E.value);
        } catch (A) {
          w = { error: A };
        } finally {
          try {
            E && !E.done && (T = _.return) && T.call(_);
          } finally {
            if (w)
              throw w.error;
          }
        }
        return P;
      }, a = this && this.__spread || function() {
        for (var y = [], b = 0; b < arguments.length; b++)
          y = y.concat(o(arguments[b]));
        return y;
      }, l = this && this.__importDefault || function(y) {
        return y && y.__esModule ? y : { default: y };
      };
      Object.defineProperty(r, "__esModule", { value: !0 });
      var u = l(i(3)), c = i(18), f = i(4), d = i(1), p = i(20), h = i(0), g = function() {
        function y(b, T) {
          this.options = { $root: b.$root, wrapTag: b.wrapTag, exceptSelectors: b.exceptSelectors, className: b.className }, this.hooks = T, p.initDefaultStylesheet();
        }
        return y.prototype.highlightRange = function(b) {
          var T = this;
          if (!b.frozen)
            throw d.ERROR.HIGHLIGHT_RANGE_FROZEN;
          var E = this.options, w = E.$root, _ = E.className, P = E.exceptSelectors, A = this.hooks, v = c.getSelectedNodes(w, b.start, b.end, P);
          return A.Render.SelectedNodes.isEmpty() || (v = A.Render.SelectedNodes.call(b.id, v) || []), v.map(function(N) {
            var S = c.wrapHighlight(N, b, _, T.options.wrapTag);
            return A.Render.WrapNode.isEmpty() || (S = A.Render.WrapNode.call(b.id, S)), S;
          });
        }, y.prototype.highlightSource = function(b) {
          var T = this, E = Array.isArray(b) ? b : [b], w = [];
          return E.forEach(function(_) {
            if (_ instanceof u.default) {
              var P = _.deSerialize(T.options.$root, T.hooks);
              T.highlightRange(P).length > 0 ? w.push(_) : h.eventEmitter.emit(h.INTERNAL_ERROR_EVENT, { type: d.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER, detail: _ });
            } else
              h.eventEmitter.emit(h.INTERNAL_ERROR_EVENT, { type: d.ERROR.SOURCE_TYPE_ERROR });
          }), w;
        }, y.prototype.removeHighlight = function(b) {
          var T, E, w = new RegExp("(" + b + "\\" + h.ID_DIVISION + "|\\" + h.ID_DIVISION + "?" + b + "$)"), _ = this.hooks, P = this.options.wrapTag, A = document.querySelectorAll(P + "[data-" + h.DATASET_IDENTIFIER + "]"), v = [], N = [], S = [];
          try {
            for (var V = s(A), H = V.next(); !H.done; H = V.next()) {
              var z = H.value, I = z.dataset[h.CAMEL_DATASET_IDENTIFIER], R = z.dataset[h.CAMEL_DATASET_IDENTIFIER_EXTRA];
              I !== b || R ? I === b ? N.push(z) : I !== b && w.test(R) && S.push(z) : v.push(z);
            }
          } catch (x) {
            T = { error: x };
          } finally {
            try {
              H && !H.done && (E = V.return) && E.call(V);
            } finally {
              if (T)
                throw T.error;
            }
          }
          return v.forEach(function(x) {
            var O = x.parentNode, D = document.createDocumentFragment();
            f.forEach(x.childNodes, function(B) {
              return D.appendChild(B.cloneNode(!1));
            });
            var k = x.previousSibling, L = x.nextSibling;
            O.replaceChild(D, x), c.normalizeSiblingText(k, !0), c.normalizeSiblingText(L, !1), _.Remove.UpdateNodes.call(b, x, "remove");
          }), N.forEach(function(x) {
            var O = x.dataset, D = O[h.CAMEL_DATASET_IDENTIFIER_EXTRA].split(h.ID_DIVISION), k = D.shift(), L = document.querySelector(P + "[data-" + h.DATASET_IDENTIFIER + '="' + k + '"]');
            L && (f.removeAllClass(x), f.addClass(x, a(L.classList))), O[h.CAMEL_DATASET_IDENTIFIER] = k, O[h.CAMEL_DATASET_IDENTIFIER_EXTRA] = D.join(h.ID_DIVISION), _.Remove.UpdateNodes.call(b, x, "id-update");
          }), S.forEach(function(x) {
            var O = x.dataset[h.CAMEL_DATASET_IDENTIFIER_EXTRA];
            x.dataset[h.CAMEL_DATASET_IDENTIFIER_EXTRA] = O.replace(w, ""), _.Remove.UpdateNodes.call(b, x, "extra-update");
          }), v.length + N.length + S.length !== 0;
        }, y.prototype.removeAllHighlight = function() {
          var b = this.options, T = b.wrapTag, E = b.$root;
          f.getHighlightsByRoot(E, T).forEach(function(w) {
            var _ = w.parentNode, P = document.createDocumentFragment();
            f.forEach(w.childNodes, function(A) {
              return P.appendChild(A.cloneNode(!1));
            }), _.replaceChild(P, w);
          });
        }, y;
      }();
      r.default = g;
    }, function(n, r, i) {
      var s = this && this.__read || function(h, g) {
        var y = typeof Symbol == "function" && h[Symbol.iterator];
        if (!y)
          return h;
        var b, T, E = y.call(h), w = [];
        try {
          for (; (g === void 0 || g-- > 0) && !(b = E.next()).done; )
            w.push(b.value);
        } catch (_) {
          T = { error: _ };
        } finally {
          try {
            b && !b.done && (y = E.return) && y.call(E);
          } finally {
            if (T)
              throw T.error;
          }
        }
        return w;
      }, o = this && this.__spread || function() {
        for (var h = [], g = 0; g < arguments.length; g++)
          h = h.concat(s(arguments[g]));
        return h;
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.normalizeSiblingText = r.wrapHighlight = r.getSelectedNodes = void 0;
      var a = i(1), l = i(4), u = i(0), c = i(19), f = function(h, g) {
        if (!h)
          return !1;
        if (/^\./.test(g)) {
          var y = g.replace(/^\./, "");
          return h && l.hasClass(h, y);
        }
        if (/^#/.test(g)) {
          var b = g.replace(/^#/, "");
          return h && h.id === b;
        }
        var T = g.toUpperCase();
        return h && h.tagName === T;
      };
      r.getSelectedNodes = function(h, g, y, b) {
        var T = g.$node, E = y.$node, w = g.offset, _ = y.offset;
        if (T === E && T instanceof Text)
          return function(I, R, x, O) {
            for (var D = I, k = function(B) {
              return O == null ? void 0 : O.some(function(K) {
                return f(B, K);
              });
            }; D; ) {
              if (D.nodeType === 1 && k(D))
                return [];
              D = D.parentNode;
            }
            I.splitText(R);
            var L = I.nextSibling;
            return L.splitText(x - R), [{ $node: L, type: a.SelectedNodeType.text, splitType: a.SplitType.both }];
          }(T, w, _, b);
        for (var P = [h], A = [], v = function(I) {
          return b == null ? void 0 : b.some(function(R) {
            return f(I, R);
          });
        }, N = !1, S = null; S = P.pop(); )
          if (S.nodeType !== 1 || !v(S)) {
            for (var V = S.childNodes, H = V.length - 1; H >= 0; H--)
              P.push(V[H]);
            if (S === T) {
              if (S.nodeType === 3) {
                S.splitText(w);
                var z = S.nextSibling;
                A.push({ $node: z, type: a.SelectedNodeType.text, splitType: a.SplitType.head });
              }
              N = !0;
            } else {
              if (S === E) {
                S.nodeType === 3 && ((z = S).splitText(_), A.push({ $node: z, type: a.SelectedNodeType.text, splitType: a.SplitType.tail }));
                break;
              }
              N && S.nodeType === 3 && A.push({ $node: S, type: a.SelectedNodeType.text, splitType: a.SplitType.none });
            }
          }
        return A;
      };
      var d = function(h, g) {
        var y = Array.isArray(g) ? g : [g];
        return (y = y.length === 0 ? [u.getDefaultOptions().style.className] : y).forEach(function(b) {
          l.addClass(h, b);
        }), h;
      }, p = function(h) {
        return !h || !h.textContent;
      };
      r.wrapHighlight = function(h, g, y, b) {
        var T = h.$node.parentNode, E = h.$node.previousSibling, w = h.$node.nextSibling;
        return l.isHighlightWrapNode(T) ? !l.isHighlightWrapNode(T) || p(E) && p(w) ? function(_, P, A) {
          var v = _.$node.parentNode, N = v;
          l.removeAllClass(N), d(N, A);
          var S = v.dataset, V = S[u.CAMEL_DATASET_IDENTIFIER];
          return S[u.CAMEL_DATASET_IDENTIFIER] = P.id, S[u.CAMEL_DATASET_IDENTIFIER_EXTRA] = S[u.CAMEL_DATASET_IDENTIFIER_EXTRA] ? V + u.ID_DIVISION + S[u.CAMEL_DATASET_IDENTIFIER_EXTRA] : V, N;
        }(h, g, y) : function(_, P, A, v) {
          var N = document.createElement(v), S = _.$node.parentNode, V = _.$node.previousSibling, H = _.$node.nextSibling, z = document.createDocumentFragment(), I = S.dataset[u.CAMEL_DATASET_IDENTIFIER], R = S.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA], x = R ? I + u.ID_DIVISION + R : I;
          N.setAttribute("data-" + u.DATASET_IDENTIFIER, P.id), N.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, x), N.appendChild(_.$node.cloneNode(!1));
          var O, D = !1, k = !1;
          V && ((L = S.cloneNode(!1)).textContent = V.textContent, z.appendChild(L), D = !0);
          var L, B = [];
          return Array.isArray(A) ? B.push.apply(B, o(A)) : B.push(A), d(N, c.unique(B)), z.appendChild(N), H && ((L = S.cloneNode(!1)).textContent = H.textContent, z.appendChild(L), k = !0), O = D && k ? a.SplitType.both : D ? a.SplitType.head : k ? a.SplitType.tail : a.SplitType.none, N.setAttribute("data-" + u.DATASET_SPLIT_TYPE, O), S.parentNode.replaceChild(z, S), N;
        }(h, g, y, b) : function(_, P, A, v) {
          var N = document.createElement(v);
          return d(N, A), N.appendChild(_.$node.cloneNode(!1)), _.$node.parentNode.replaceChild(N, _.$node), N.setAttribute("data-" + u.DATASET_IDENTIFIER, P.id), N.setAttribute("data-" + u.DATASET_SPLIT_TYPE, _.splitType), N.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, ""), N;
        }(h, g, y, b);
      }, r.normalizeSiblingText = function(h, g) {
        if (g === void 0 && (g = !0), h && h.nodeType === 3) {
          var y = g ? h.nextSibling : h.previousSibling;
          if (y.nodeType === 3) {
            var b = y.nodeValue;
            h.nodeValue = g ? h.nodeValue + b : b + h.nodeValue, y.parentNode.removeChild(y);
          }
        }
      };
    }, function(n, r, i) {
      var s = this && this.__values || function(o) {
        var a = typeof Symbol == "function" && Symbol.iterator, l = a && o[a], u = 0;
        if (l)
          return l.call(o);
        if (o && typeof o.length == "number")
          return { next: function() {
            return o && u >= o.length && (o = void 0), { value: o && o[u++], done: !o };
          } };
        throw new TypeError(a ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(r, "__esModule", { value: !0 }), r.unique = void 0, r.unique = function(o) {
        var a, l, u = [];
        try {
          for (var c = s(o), f = c.next(); !f.done; f = c.next()) {
            var d = f.value;
            u.indexOf(d) === -1 && u.push(d);
          }
        } catch (p) {
          a = { error: p };
        } finally {
          try {
            f && !f.done && (l = c.return) && l.call(c);
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
          var l = document.createTextNode(s.getStylesheet());
          (a = document.createElement("style")).id = o, a.appendChild(l), document.head.appendChild(a);
        }
        return a;
      };
    }]).default;
  });
})(ma);
var Dh = ma.exports;
const ga = /* @__PURE__ */ Ns(Dh), et = new ga({
  style: {
    className: Ql
  }
  // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
}), Yr = new ga({
  style: {
    className: ec
  }
  // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
}), ya = (e, t) => t.filter(
  (n) => {
    var r;
    return ((r = n.$node.nodeValue) == null ? void 0 : r.trim()) !== "";
  }
), va = (e, t, n) => {
  const r = t, i = n, s = ["BR", "HR"];
  return s.includes(r.$node.nodeName) && r.$node.parentNode && (r.$node = r.$node.parentNode), s.includes(i.$node.nodeName) && i.$node.parentNode && (i.$node = i.$node.parentNode), [r, i];
};
et.hooks.Render.SelectedNodes.tap(ya);
et.hooks.Serialize.Restore.tap(va);
Yr.hooks.Render.SelectedNodes.tap(ya);
Yr.hooks.Serialize.Restore.tap(va);
et.on("selection:hover", ({ id: e }) => {
  et.addClass(Ti, e);
}).on("selection:hover-out", ({ id: e }) => {
  et.removeClass(Ti, e);
});
const Ph = et, Ah = (e) => e.highlight ? JSON.parse(e.highlight) : null, Ih = (e) => {
  const t = Ah(e);
  t && (et.remove(t.id), Yr.remove(t.id));
}, Oh = () => {
  const [e, t] = he(null), [n, r] = he(null), i = Ve(() => {
    console.log("resetHighlights"), e && Ih(e), r(null), t(null);
  }, [e]), s = Ve(async () => {
    const o = document.getSelection();
    if (!o || !o.rangeCount)
      return i(), null;
    const a = o.getRangeAt(0), l = a.startContainer.parentNode, u = a.endContainer.parentNode;
    if (!l || !u)
      return i(), null;
    const c = cc(a);
    if (!c)
      return i(), null;
    let f = c;
    f.tagName.toLocaleLowerCase() === tc && f.parentElement && (f = f.parentElement);
    const d = mr(f);
    if (!d || d.includes(st))
      return null;
    const { width: p } = a.getBoundingClientRect();
    if (console.log(o, p, a.toString()), !p || !a.toString().trim())
      return i(), null;
    const { x: h, y: g } = a.getClientRects()[0], y = Ys(h, g), b = {
      xpath: d,
      left_percentage: 100,
      top_percentage: 0,
      anchor_text: (y == null ? void 0 : y.text) ?? null,
      text_offset: y.offset,
      highlight_text: a.toString(),
      highlight: JSON.stringify(Ph.fromRange(a)),
      rectangle_height: null,
      rectangle_width: null,
      page_url: window.location.href
    };
    r({
      x: h + window.scrollX,
      y: g + window.scrollY
    }), t(b);
  }, [i]);
  return We(() => (document.addEventListener("selectionend", s), () => {
    document.removeEventListener("selectionend", s);
  }), [s, i]), { getHighlightedSelectionData: () => e, pos: n };
}, Mh = ({ pos: e, onAddComment: t }) => /* @__PURE__ */ j.jsx(pa, { children: e && /* @__PURE__ */ j.jsx(
  it,
  {
    onClick: t,
    id: `${st}-highlight`,
    style: {
      position: "absolute",
      top: e.y,
      left: e.x,
      // right: "15px",
      zIndex: nc + 5,
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
) }), Nh = Mh, Vh = "_dbtDocs_mnsm0_1", jh = "_conversationRightPanel_mnsm0_13", Lh = {
  dbtDocs: Vh,
  conversationRightPanel: jh
}, Ft = {
  get: async (e, t, n) => ({}),
  post: async (e, t, n) => ({})
}, kh = (e) => Ft.get(`dbt/dbt_docs_share/${e}`), Fh = (e, t) => Ft.post(`dbt/dbt_docs_share/${e}/conversation_group`, t), $h = (e, t, n) => Ft.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`,
  n
), Bh = (e) => Ft.get(`dbt/dbt_docs_share/${e}/conversations`), Hh = (e) => Ft.get("/users/", { company: e }), Uh = () => {
  const e = Ee(
    (l) => l.newConversation
  ), t = Ee(
    (l) => l.shareId
  ), [n, r] = he(!1), [i, s] = he(""), o = (l) => s(l.target.value), a = async (l) => {
    if (l.stopPropagation(), l.preventDefault(), !(!e || !t)) {
      r(!0);
      try {
        console.log("saving conversation", e, i);
        const u = await Fh(t, {
          xpath: e.xpath
        });
        if (!u.conversation_group_id) {
          console.error(
            "Unable to create conversation group",
            u
          );
          return;
        }
        console.log(
          "Successfully created conversation group",
          u
        );
      } catch (u) {
        console.error("error while saving conversation", e, u);
      }
      r(!1);
    }
  };
  return /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsxs("form", { onSubmit: a, children: [
    /* @__PURE__ */ j.jsx(
      "textarea",
      {
        placeholder: "Share your comment",
        value: i,
        onChange: o
      }
    ),
    /* @__PURE__ */ j.jsx(it, { disabled: n, children: "Submit" })
  ] }) });
}, zh = Uh;
var Ta = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(el, function() {
    var n = 1e3, r = 6e4, i = 36e5, s = "millisecond", o = "second", a = "minute", l = "hour", u = "day", c = "week", f = "month", d = "quarter", p = "year", h = "date", g = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, T = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(I) {
      var R = ["th", "st", "nd", "rd"], x = I % 100;
      return "[" + I + (R[(x - 20) % 10] || R[x] || R[0]) + "]";
    } }, E = function(I, R, x) {
      var O = String(I);
      return !O || O.length >= R ? I : "" + Array(R + 1 - O.length).join(x) + I;
    }, w = { s: E, z: function(I) {
      var R = -I.utcOffset(), x = Math.abs(R), O = Math.floor(x / 60), D = x % 60;
      return (R <= 0 ? "+" : "-") + E(O, 2, "0") + ":" + E(D, 2, "0");
    }, m: function I(R, x) {
      if (R.date() < x.date())
        return -I(x, R);
      var O = 12 * (x.year() - R.year()) + (x.month() - R.month()), D = R.clone().add(O, f), k = x - D < 0, L = R.clone().add(O + (k ? -1 : 1), f);
      return +(-(O + (x - D) / (k ? D - L : L - D)) || 0);
    }, a: function(I) {
      return I < 0 ? Math.ceil(I) || 0 : Math.floor(I);
    }, p: function(I) {
      return { M: f, y: p, w: c, d: u, D: h, h: l, m: a, s: o, ms: s, Q: d }[I] || String(I || "").toLowerCase().replace(/s$/, "");
    }, u: function(I) {
      return I === void 0;
    } }, _ = "en", P = {};
    P[_] = T;
    var A = "$isDayjsObject", v = function(I) {
      return I instanceof H || !(!I || !I[A]);
    }, N = function I(R, x, O) {
      var D;
      if (!R)
        return _;
      if (typeof R == "string") {
        var k = R.toLowerCase();
        P[k] && (D = k), x && (P[k] = x, D = k);
        var L = R.split("-");
        if (!D && L.length > 1)
          return I(L[0]);
      } else {
        var B = R.name;
        P[B] = R, D = B;
      }
      return !O && D && (_ = D), D || !O && _;
    }, S = function(I, R) {
      if (v(I))
        return I.clone();
      var x = typeof R == "object" ? R : {};
      return x.date = I, x.args = arguments, new H(x);
    }, V = w;
    V.l = N, V.i = v, V.w = function(I, R) {
      return S(I, { locale: R.$L, utc: R.$u, x: R.$x, $offset: R.$offset });
    };
    var H = function() {
      function I(x) {
        this.$L = N(x.locale, null, !0), this.parse(x), this.$x = this.$x || x.x || {}, this[A] = !0;
      }
      var R = I.prototype;
      return R.parse = function(x) {
        this.$d = function(O) {
          var D = O.date, k = O.utc;
          if (D === null)
            return /* @__PURE__ */ new Date(NaN);
          if (V.u(D))
            return /* @__PURE__ */ new Date();
          if (D instanceof Date)
            return new Date(D);
          if (typeof D == "string" && !/Z$/i.test(D)) {
            var L = D.match(y);
            if (L) {
              var B = L[2] - 1 || 0, K = (L[7] || "0").substring(0, 3);
              return k ? new Date(Date.UTC(L[1], B, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, K)) : new Date(L[1], B, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, K);
            }
          }
          return new Date(D);
        }(x), this.init();
      }, R.init = function() {
        var x = this.$d;
        this.$y = x.getFullYear(), this.$M = x.getMonth(), this.$D = x.getDate(), this.$W = x.getDay(), this.$H = x.getHours(), this.$m = x.getMinutes(), this.$s = x.getSeconds(), this.$ms = x.getMilliseconds();
      }, R.$utils = function() {
        return V;
      }, R.isValid = function() {
        return this.$d.toString() !== g;
      }, R.isSame = function(x, O) {
        var D = S(x);
        return this.startOf(O) <= D && D <= this.endOf(O);
      }, R.isAfter = function(x, O) {
        return S(x) < this.startOf(O);
      }, R.isBefore = function(x, O) {
        return this.endOf(O) < S(x);
      }, R.$g = function(x, O, D) {
        return V.u(x) ? this[O] : this.set(D, x);
      }, R.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, R.valueOf = function() {
        return this.$d.getTime();
      }, R.startOf = function(x, O) {
        var D = this, k = !!V.u(O) || O, L = V.p(x), B = function(Se, te) {
          var Re = V.w(D.$u ? Date.UTC(D.$y, te, Se) : new Date(D.$y, te, Se), D);
          return k ? Re : Re.endOf(u);
        }, K = function(Se, te) {
          return V.w(D.toDate()[Se].apply(D.toDate("s"), (k ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(te)), D);
        }, q = this.$W, re = this.$M, fe = this.$D, _e = "set" + (this.$u ? "UTC" : "");
        switch (L) {
          case p:
            return k ? B(1, 0) : B(31, 11);
          case f:
            return k ? B(1, re) : B(0, re + 1);
          case c:
            var be = this.$locale().weekStart || 0, xe = (q < be ? q + 7 : q) - be;
            return B(k ? fe - xe : fe + (6 - xe), re);
          case u:
          case h:
            return K(_e + "Hours", 0);
          case l:
            return K(_e + "Minutes", 1);
          case a:
            return K(_e + "Seconds", 2);
          case o:
            return K(_e + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, R.endOf = function(x) {
        return this.startOf(x, !1);
      }, R.$set = function(x, O) {
        var D, k = V.p(x), L = "set" + (this.$u ? "UTC" : ""), B = (D = {}, D[u] = L + "Date", D[h] = L + "Date", D[f] = L + "Month", D[p] = L + "FullYear", D[l] = L + "Hours", D[a] = L + "Minutes", D[o] = L + "Seconds", D[s] = L + "Milliseconds", D)[k], K = k === u ? this.$D + (O - this.$W) : O;
        if (k === f || k === p) {
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
        var D, k = this;
        x = Number(x);
        var L = V.p(O), B = function(re) {
          var fe = S(k);
          return V.w(fe.date(fe.date() + Math.round(re * x)), k);
        };
        if (L === f)
          return this.set(f, this.$M + x);
        if (L === p)
          return this.set(p, this.$y + x);
        if (L === u)
          return B(1);
        if (L === c)
          return B(7);
        var K = (D = {}, D[a] = r, D[l] = i, D[o] = n, D)[L] || 1, q = this.$d.getTime() + x * K;
        return V.w(q, this);
      }, R.subtract = function(x, O) {
        return this.add(-1 * x, O);
      }, R.format = function(x) {
        var O = this, D = this.$locale();
        if (!this.isValid())
          return D.invalidDate || g;
        var k = x || "YYYY-MM-DDTHH:mm:ssZ", L = V.z(this), B = this.$H, K = this.$m, q = this.$M, re = D.weekdays, fe = D.months, _e = D.meridiem, be = function(te, Re, Le, at) {
          return te && (te[Re] || te(O, k)) || Le[Re].slice(0, at);
        }, xe = function(te) {
          return V.s(B % 12 || 12, te, "0");
        }, Se = _e || function(te, Re, Le) {
          var at = te < 12 ? "AM" : "PM";
          return Le ? at.toLowerCase() : at;
        };
        return k.replace(b, function(te, Re) {
          return Re || function(Le) {
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
                return be(D.monthsShort, q, fe, 3);
              case "MMMM":
                return be(fe, q);
              case "D":
                return O.$D;
              case "DD":
                return V.s(O.$D, 2, "0");
              case "d":
                return String(O.$W);
              case "dd":
                return be(D.weekdaysMin, O.$W, re, 2);
              case "ddd":
                return be(D.weekdaysShort, O.$W, re, 3);
              case "dddd":
                return re[O.$W];
              case "H":
                return String(B);
              case "HH":
                return V.s(B, 2, "0");
              case "h":
                return xe(1);
              case "hh":
                return xe(2);
              case "a":
                return Se(B, K, !0);
              case "A":
                return Se(B, K, !1);
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
                return L;
            }
            return null;
          }(te) || L.replace(":", "");
        });
      }, R.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, R.diff = function(x, O, D) {
        var k, L = this, B = V.p(O), K = S(x), q = (K.utcOffset() - this.utcOffset()) * r, re = this - K, fe = function() {
          return V.m(L, K);
        };
        switch (B) {
          case p:
            k = fe() / 12;
            break;
          case f:
            k = fe();
            break;
          case d:
            k = fe() / 3;
            break;
          case c:
            k = (re - q) / 6048e5;
            break;
          case u:
            k = (re - q) / 864e5;
            break;
          case l:
            k = re / i;
            break;
          case a:
            k = re / r;
            break;
          case o:
            k = re / n;
            break;
          default:
            k = re;
        }
        return D ? k : V.a(k);
      }, R.daysInMonth = function() {
        return this.endOf(f).$D;
      }, R.$locale = function() {
        return P[this.$L];
      }, R.locale = function(x, O) {
        if (!x)
          return this.$L;
        var D = this.clone(), k = N(x, O, !0);
        return k && (D.$L = k), D;
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
    return S.prototype = z, [["$ms", s], ["$s", o], ["$m", a], ["$H", l], ["$W", u], ["$M", f], ["$y", p], ["$D", h]].forEach(function(I) {
      z[I[1]] = function(R) {
        return this.$g(R, I[0], I[1]);
      };
    }), S.extend = function(I, R) {
      return I.$i || (I(R, H, S), I.$i = !0), S;
    }, S.locale = N, S.isDayjs = v, S.unix = function(I) {
      return S(1e3 * I);
    }, S.en = P[_], S.Ls = P, S.p = {}, S;
  });
})(Ta);
var Wh = Ta.exports;
const Yh = /* @__PURE__ */ Ns(Wh), Gh = ({ user: e }) => {
  var t, n;
  return /* @__PURE__ */ j.jsx("div", { children: (((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "") + (((n = e == null ? void 0 : e.last_name) == null ? void 0 : n[0]) || "") });
}, Ea = Gh, Kh = ({ user: e, timestamp: t }) => /* @__PURE__ */ j.jsxs(Ja, { className: "d-flex", children: [
  /* @__PURE__ */ j.jsx(Ea, { user: e }),
  /* @__PURE__ */ j.jsxs("h4", { children: [
    e == null ? void 0 : e.first_name,
    " ",
    e == null ? void 0 : e.last_name
  ] }),
  /* @__PURE__ */ j.jsx("span", { children: Yh(t).format("HH:mm, DD MMM YY") })
] }), ba = Kh, Xh = ({ conversation: e }) => {
  const t = Ee((n) => {
    var r;
    return (r = n.users) == null ? void 0 : r[e == null ? void 0 : e.user_id];
  });
  return /* @__PURE__ */ j.jsxs(Os, { children: [
    /* @__PURE__ */ j.jsx(ba, { user: t, timestamp: e.timestamp }),
    /* @__PURE__ */ j.jsx(Ms, { children: /* @__PURE__ */ j.jsx("p", { children: e.message }) })
  ] });
}, qh = Xh, Zh = ({ user: e, conversationGroupId: t }) => {
  const n = Ee(
    (u) => u.shareId
  ), [r, i] = he(""), [s, o] = he(!1), a = (u) => i(u.target.value), l = async (u) => {
    if (u.stopPropagation(), u.preventDefault(), !(!n || !t)) {
      o(!0), console.log("saving reply", n, t, {
        message: r
      });
      try {
        await $h(n, t, {
          message: r
        });
      } catch (c) {
        console.error("error while saving reply", c);
      }
      o(!1);
    }
  };
  return /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsxs("form", { onSubmit: l, className: "d-flex position-relative", children: [
    /* @__PURE__ */ j.jsx("span", { className: "position-absolute", style: { zIndex: 4 }, children: /* @__PURE__ */ j.jsx(Ea, { user: e }) }),
    /* @__PURE__ */ j.jsx(
      Qa,
      {
        placeholder: "Enter your reply",
        onChange: a,
        value: r,
        type: "textarea"
      }
    ),
    /* @__PURE__ */ j.jsx(
      it,
      {
        className: "position-absolute",
        disabled: s,
        type: "submit",
        style: { zIndex: 4, right: 0 },
        children: "Send"
      }
    )
  ] }) });
}, Jh = Zh, Qh = ({ conversationGroup: e }) => {
  var o;
  const t = Ee((a) => {
    var l;
    return (l = a.users) == null ? void 0 : l[e == null ? void 0 : e.owner];
  }), [n, r] = he(!1);
  if (!((o = e == null ? void 0 : e.conversations) != null && o.length) || (e == null ? void 0 : e.status) !== "Pending")
    return null;
  const [i, ...s] = e.conversations;
  return /* @__PURE__ */ j.jsxs(Os, { children: [
    /* @__PURE__ */ j.jsx(ba, { user: t, timestamp: i.timestamp }),
    /* @__PURE__ */ j.jsxs(Ms, { children: [
      /* @__PURE__ */ j.jsx("p", { children: i.message }),
      s.length ? /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
        /* @__PURE__ */ j.jsxs(
          it,
          {
            onClick: () => r((a) => !a),
            color: "link",
            children: [
              s.length,
              " replies"
            ]
          }
        ),
        n ? /* @__PURE__ */ j.jsx(j.Fragment, { children: s.map((a) => /* @__PURE__ */ j.jsx(qh, { conversation: a }, a.conversation_id)) }) : null
      ] }) : null,
      /* @__PURE__ */ j.jsx(
        Jh,
        {
          user: t,
          conversationGroupId: e.conversation_group_id
        }
      )
    ] })
  ] });
}, ep = Qh, tp = () => {
  const e = Ee(
    (s) => s.shareId
  ), t = vt(), n = Ee(
    (s) => Object.keys(s.conversations || {})
  ), [r, i] = he(!1);
  return We(() => {
    r || !e || Object.keys(n).length || (i(!0), Bh(e).then((s) => {
      console.log("useConversations", s), t(Zl(s == null ? void 0 : s.dbt_docs_share_conversations));
    }).catch(
      (s) => console.error("error while fetching conversations list", s)
    ).finally(() => {
      i(!1);
    }));
  }, [t, r, n, e]), { isLoading: r };
}, np = () => {
  const { isLoading: e } = tp(), t = Ee(
    (n) => n.conversations
  );
  return e ? /* @__PURE__ */ j.jsx("div", { children: "Loading..." }) : !t || !Object.keys(t).length ? /* @__PURE__ */ j.jsx("div", { children: "No conversations yet!" }) : /* @__PURE__ */ j.jsx("div", { children: Object.values(t).map((n) => /* @__PURE__ */ j.jsx(
    ep,
    {
      conversationGroup: n
    },
    n.conversation_group_id
  )) });
}, rp = np, ip = () => {
  const e = Ee((s) => s.isRightPanelOpen), t = Ee((s) => s.newConversation), n = vt(), r = () => {
    n(Ws(!1)), n(Jl());
  };
  return !!t || e ? /* @__PURE__ */ j.jsxs("div", { className: Lh.conversationRightPanel, children: [
    /* @__PURE__ */ j.jsx(it, { onClick: r, children: "Close" }),
    t ? /* @__PURE__ */ j.jsx(zh, {}) : null,
    /* @__PURE__ */ j.jsx(rp, {})
  ] }) : null;
}, sp = ip, op = () => {
  const e = vt(), t = Ee(
    (i) => Object.keys(i.users || {})
  ), [n, r] = he(
    1
    /* UNINITIALIZED */
  );
  return We(() => {
    n !== 1 || Object.keys(t).length || (r(
      0
      /* LOADING */
    ), Hh().then((i) => {
      console.log("useConversationUsers", i), e(Xl(i));
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
}, ap = () => {
  const {
    state: { isSelectingTarget: e }
  } = Sa(), t = vt(), { getHighlightedSelectionData: n, pos: r } = Oh();
  op();
  const [i] = he(null), [, s] = he(null), o = () => {
    const u = n();
    u && t(vi(u));
  }, a = Ve((u) => {
    u && s(u);
  }, []), l = Ve(
    (u) => {
      u.preventDefault(), u.stopPropagation();
      const c = u.clientX, f = u.clientY, d = lc(u.clientX, u.clientY) || u.target, p = mr(d);
      if (!p)
        return;
      const h = d.getBoundingClientRect(), g = Ys(c, f), y = {
        xpath: p,
        left_percentage: 100 * (c - h.x) / (h.width || 1),
        top_percentage: 100 * (f - h.y) / (h.height || 1),
        anchor_text: g.text || null,
        text_offset: g.offset
      };
      t(vi(y));
    },
    [t]
  );
  return /* @__PURE__ */ j.jsxs("div", { children: [
    r ? /* @__PURE__ */ j.jsx(Nh, { pos: r, onAddComment: o }) : null,
    e && /* @__PURE__ */ j.jsx(
      Ch,
      {
        onClick: l,
        rect: i,
        ref: a
      }
    ),
    /* @__PURE__ */ j.jsx(sp, {})
  ] });
}, lp = ap, bn = rt({
  state: en.getInitialState(),
  dispatch: () => null,
  getValue: () => null
}), cp = ({
  children: e,
  shareId: t
}) => {
  const [n, r] = qa(en.reducer, {
    ...en.getInitialState(),
    shareId: t
  }), i = Ve(
    (o) => o(n),
    [n]
  ), s = tt(
    () => ({
      state: n,
      dispatch: r,
      getValue: i
    }),
    [n, r, i]
  );
  return /* @__PURE__ */ j.jsxs(bn.Provider, { value: s, children: [
    /* @__PURE__ */ j.jsx(lp, {}),
    e
  ] });
}, up = cp, Sa = () => ne(bn), Ee = (e) => {
  const { getValue: t } = ne(bn);
  return t(e);
}, vt = () => {
  const { dispatch: e } = ne(bn);
  return e;
}, fp = () => {
  const {
    state: { isRightPanelOpen: e }
  } = Sa(), t = vt(), n = () => {
    t(Ws(!e));
  };
  return /* @__PURE__ */ j.jsx(it, { onClick: n, children: e ? "Hide conversations" : "Show conversations" });
}, dp = fp, hp = () => {
  const e = Ee(
    (o) => o.shareId
  ), [t, n] = he(
    null
  ), [r, i] = he(!1), s = Ve(async () => {
    if (!e)
      return;
    i(!0);
    const o = await kh(e);
    if (o) {
      n(o);
      const a = document.getElementById("collapse-sidebar");
      a == null || a.click();
    }
    i(!1);
  }, [e]);
  return We(() => {
    !e || t || r || s();
  }, [e, t, s, r]), { shareDetails: t, loading: r };
}, pp = () => {
  const e = vt(), t = (n) => {
    n.stopPropagation(), n.preventDefault(), e(ql(!0));
  };
  return /* @__PURE__ */ j.jsx(it, { onClick: t, style: { zIndex: 1, marginRight: "1rem" }, children: "Add comment" });
}, mp = pp, gp = Za(() => import("./DbtDocsRenderer.js")), yp = () => {
  const { loading: e, shareDetails: t } = hp();
  return e ? /* @__PURE__ */ j.jsx("div", { children: "Loading..." }) : !(t != null && t.catalog_presigned_url) || !(t != null && t.manifest_presigned_url) ? /* @__PURE__ */ j.jsx("div", { children: "Unable to load required artifacts. Please try again." }) : /* @__PURE__ */ j.jsxs("div", { children: [
    /* @__PURE__ */ j.jsxs("div", { className: "d-flex justify-content-end mb-2", children: [
      /* @__PURE__ */ j.jsx(mp, {}),
      /* @__PURE__ */ j.jsx(dp, {})
    ] }),
    /* @__PURE__ */ j.jsx(gp, { shareDetails: t })
  ] });
}, vp = yp, Tp = ({ shareId: e }) => /* @__PURE__ */ j.jsx(up, { shareId: e, children: /* @__PURE__ */ j.jsx(vp, {}) }), Cp = Tp;
export {
  Ft as A,
  Cp as D,
  Lh as c,
  j
};
