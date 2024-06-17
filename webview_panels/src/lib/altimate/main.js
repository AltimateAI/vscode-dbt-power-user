import './main.css';
var R1 = Object.defineProperty;
var z1 = (e, t, n) => t in e ? R1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Lo = (e, t, n) => (z1(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as B from "react";
import H, { createContext as pt, Component as I1, createElement as nl, isValidElement as Ou, useState as fe, useRef as ae, useReducer as Nu, useCallback as me, useMemo as Ee, useContext as Ye, useLayoutEffect as L1, useEffect as ie, useId as Du, useInsertionEffect as F1, cloneElement as j1, Children as Dn, lazy as P1, memo as Te, forwardRef as Ru } from "react";
import { Prism as H1 } from "react-syntax-highlighter";
import { Tooltip as B1, Button as qe, Spinner as $1, Card as Eo, CardTitle as zu, CardBody as _o, CloseButton as W1, Popover as Iu, PopoverBody as Lu, UncontrolledTooltip as V1, Input as ur, Label as na, Modal as q1, ModalBody as U1 } from "reactstrap";
import Y1, { createPortal as hn } from "react-dom";
var wi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Si = { exports: {} }, qn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ol;
function Z1() {
  if (ol)
    return qn;
  ol = 1;
  var e = H, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(s, c, u) {
    var l, d = {}, f = null, g = null;
    u !== void 0 && (f = "" + u), c.key !== void 0 && (f = "" + c.key), c.ref !== void 0 && (g = c.ref);
    for (l in c)
      o.call(c, l) && !a.hasOwnProperty(l) && (d[l] = c[l]);
    if (s && s.defaultProps)
      for (l in c = s.defaultProps, c)
        d[l] === void 0 && (d[l] = c[l]);
    return { $$typeof: t, type: s, key: f, ref: g, props: d, _owner: r.current };
  }
  return qn.Fragment = n, qn.jsx = i, qn.jsxs = i, qn;
}
var Un = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rl;
function K1() {
  return rl || (rl = 1, process.env.NODE_ENV !== "production" && function() {
    var e = H, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), p = Symbol.iterator, h = "@@iterator";
    function m(L) {
      if (L === null || typeof L != "object")
        return null;
      var Y = p && L[p] || L[h];
      return typeof Y == "function" ? Y : null;
    }
    var x = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(L) {
      {
        for (var Y = arguments.length, ee = new Array(Y > 1 ? Y - 1 : 0), re = 1; re < Y; re++)
          ee[re - 1] = arguments[re];
        y("error", L, ee);
      }
    }
    function y(L, Y, ee) {
      {
        var re = x.ReactDebugCurrentFrame, he = re.getStackAddendum();
        he !== "" && (Y += "%s", ee = ee.concat([he]));
        var ve = ee.map(function(ge) {
          return String(ge);
        });
        ve.unshift("Warning: " + Y), Function.prototype.apply.call(console[L], console, ve);
      }
    }
    var w = !1, S = !1, k = !1, M = !1, C = !1, T;
    T = Symbol.for("react.module.reference");
    function D(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === o || L === a || C || L === r || L === u || L === l || M || L === g || w || S || k || typeof L == "object" && L !== null && (L.$$typeof === f || L.$$typeof === d || L.$$typeof === i || L.$$typeof === s || L.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === T || L.getModuleId !== void 0));
    }
    function F(L, Y, ee) {
      var re = L.displayName;
      if (re)
        return re;
      var he = Y.displayName || Y.name || "";
      return he !== "" ? ee + "(" + he + ")" : ee;
    }
    function $(L) {
      return L.displayName || "Context";
    }
    function P(L) {
      if (L == null)
        return null;
      if (typeof L.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof L == "function")
        return L.displayName || L.name || null;
      if (typeof L == "string")
        return L;
      switch (L) {
        case o:
          return "Fragment";
        case n:
          return "Portal";
        case a:
          return "Profiler";
        case r:
          return "StrictMode";
        case u:
          return "Suspense";
        case l:
          return "SuspenseList";
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case s:
            var Y = L;
            return $(Y) + ".Consumer";
          case i:
            var ee = L;
            return $(ee._context) + ".Provider";
          case c:
            return F(L, L.render, "ForwardRef");
          case d:
            var re = L.displayName || null;
            return re !== null ? re : P(L.type) || "Memo";
          case f: {
            var he = L, ve = he._payload, ge = he._init;
            try {
              return P(ge(ve));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var E = Object.assign, A = 0, _, z, R, N, O, I, j;
    function V() {
    }
    V.__reactDisabledLog = !0;
    function W() {
      {
        if (A === 0) {
          _ = console.log, z = console.info, R = console.warn, N = console.error, O = console.group, I = console.groupCollapsed, j = console.groupEnd;
          var L = {
            configurable: !0,
            enumerable: !0,
            value: V,
            writable: !0
          };
          Object.defineProperties(console, {
            info: L,
            log: L,
            warn: L,
            error: L,
            group: L,
            groupCollapsed: L,
            groupEnd: L
          });
        }
        A++;
      }
    }
    function U() {
      {
        if (A--, A === 0) {
          var L = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: E({}, L, {
              value: _
            }),
            info: E({}, L, {
              value: z
            }),
            warn: E({}, L, {
              value: R
            }),
            error: E({}, L, {
              value: N
            }),
            group: E({}, L, {
              value: O
            }),
            groupCollapsed: E({}, L, {
              value: I
            }),
            groupEnd: E({}, L, {
              value: j
            })
          });
        }
        A < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Z = x.ReactCurrentDispatcher, K;
    function Q(L, Y, ee) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (he) {
            var re = he.stack.trim().match(/\n( *(at )?)/);
            K = re && re[1] || "";
          }
        return `
` + K + L;
      }
    }
    var te = !1, q;
    {
      var se = typeof WeakMap == "function" ? WeakMap : Map;
      q = new se();
    }
    function G(L, Y) {
      if (!L || te)
        return "";
      {
        var ee = q.get(L);
        if (ee !== void 0)
          return ee;
      }
      var re;
      te = !0;
      var he = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ve;
      ve = Z.current, Z.current = null, W();
      try {
        if (Y) {
          var ge = function() {
            throw Error();
          };
          if (Object.defineProperty(ge.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ge, []);
            } catch (lt) {
              re = lt;
            }
            Reflect.construct(L, [], ge);
          } else {
            try {
              ge.call();
            } catch (lt) {
              re = lt;
            }
            L.call(ge.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (lt) {
            re = lt;
          }
          L();
        }
      } catch (lt) {
        if (lt && re && typeof lt.stack == "string") {
          for (var ce = lt.stack.split(`
`), ze = re.stack.split(`
`), _e = ce.length - 1, Ae = ze.length - 1; _e >= 1 && Ae >= 0 && ce[_e] !== ze[Ae]; )
            Ae--;
          for (; _e >= 1 && Ae >= 0; _e--, Ae--)
            if (ce[_e] !== ze[Ae]) {
              if (_e !== 1 || Ae !== 1)
                do
                  if (_e--, Ae--, Ae < 0 || ce[_e] !== ze[Ae]) {
                    var We = `
` + ce[_e].replace(" at new ", " at ");
                    return L.displayName && We.includes("<anonymous>") && (We = We.replace("<anonymous>", L.displayName)), typeof L == "function" && q.set(L, We), We;
                  }
                while (_e >= 1 && Ae >= 0);
              break;
            }
        }
      } finally {
        te = !1, Z.current = ve, U(), Error.prepareStackTrace = he;
      }
      var Wt = L ? L.displayName || L.name : "", Io = Wt ? Q(Wt) : "";
      return typeof L == "function" && q.set(L, Io), Io;
    }
    function pe(L, Y, ee) {
      return G(L, !1);
    }
    function Fe(L) {
      var Y = L.prototype;
      return !!(Y && Y.isReactComponent);
    }
    function Se(L, Y, ee) {
      if (L == null)
        return "";
      if (typeof L == "function")
        return G(L, Fe(L));
      if (typeof L == "string")
        return Q(L);
      switch (L) {
        case u:
          return Q("Suspense");
        case l:
          return Q("SuspenseList");
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case c:
            return pe(L.render);
          case d:
            return Se(L.type, Y, ee);
          case f: {
            var re = L, he = re._payload, ve = re._init;
            try {
              return Se(ve(he), Y, ee);
            } catch {
            }
          }
        }
      return "";
    }
    var Pe = Object.prototype.hasOwnProperty, xe = {}, oe = x.ReactDebugCurrentFrame;
    function Re(L) {
      if (L) {
        var Y = L._owner, ee = Se(L.type, L._source, Y ? Y.type : null);
        oe.setExtraStackFrame(ee);
      } else
        oe.setExtraStackFrame(null);
    }
    function At(L, Y, ee, re, he) {
      {
        var ve = Function.call.bind(Pe);
        for (var ge in L)
          if (ve(L, ge)) {
            var ce = void 0;
            try {
              if (typeof L[ge] != "function") {
                var ze = Error((re || "React class") + ": " + ee + " type `" + ge + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof L[ge] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ze.name = "Invariant Violation", ze;
              }
              ce = L[ge](Y, ge, re, ee, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_e) {
              ce = _e;
            }
            ce && !(ce instanceof Error) && (Re(he), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", re || "React class", ee, ge, typeof ce), Re(null)), ce instanceof Error && !(ce.message in xe) && (xe[ce.message] = !0, Re(he), b("Failed %s type: %s", ee, ce.message), Re(null));
          }
      }
    }
    var en = Array.isArray;
    function vt(L) {
      return en(L);
    }
    function Pt(L) {
      {
        var Y = typeof Symbol == "function" && Symbol.toStringTag, ee = Y && L[Symbol.toStringTag] || L.constructor.name || "Object";
        return ee;
      }
    }
    function at(L) {
      try {
        return Mt(L), !1;
      } catch {
        return !0;
      }
    }
    function Mt(L) {
      return "" + L;
    }
    function xt(L) {
      if (at(L))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pt(L)), Mt(L);
    }
    var Ze = x.ReactCurrentOwner, Ht = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Tt, Bt, De;
    De = {};
    function Ke(L) {
      if (Pe.call(L, "ref")) {
        var Y = Object.getOwnPropertyDescriptor(L, "ref").get;
        if (Y && Y.isReactWarning)
          return !1;
      }
      return L.ref !== void 0;
    }
    function Ot(L) {
      if (Pe.call(L, "key")) {
        var Y = Object.getOwnPropertyDescriptor(L, "key").get;
        if (Y && Y.isReactWarning)
          return !1;
      }
      return L.key !== void 0;
    }
    function Nt(L, Y) {
      if (typeof L.ref == "string" && Ze.current && Y && Ze.current.stateNode !== Y) {
        var ee = P(Ze.current.type);
        De[ee] || (b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(Ze.current.type), L.ref), De[ee] = !0);
      }
    }
    function Dt(L, Y) {
      {
        var ee = function() {
          Tt || (Tt = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
        };
        ee.isReactWarning = !0, Object.defineProperty(L, "key", {
          get: ee,
          configurable: !0
        });
      }
    }
    function it(L, Y) {
      {
        var ee = function() {
          Bt || (Bt = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
        };
        ee.isReactWarning = !0, Object.defineProperty(L, "ref", {
          get: ee,
          configurable: !0
        });
      }
    }
    var Je = function(L, Y, ee, re, he, ve, ge) {
      var ce = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: L,
        key: Y,
        ref: ee,
        props: ge,
        // Record the component responsible for creating this element.
        _owner: ve
      };
      return ce._store = {}, Object.defineProperty(ce._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ce, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: re
      }), Object.defineProperty(ce, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: he
      }), Object.freeze && (Object.freeze(ce.props), Object.freeze(ce)), ce;
    };
    function tn(L, Y, ee, re, he) {
      {
        var ve, ge = {}, ce = null, ze = null;
        ee !== void 0 && (xt(ee), ce = "" + ee), Ot(Y) && (xt(Y.key), ce = "" + Y.key), Ke(Y) && (ze = Y.ref, Nt(Y, he));
        for (ve in Y)
          Pe.call(Y, ve) && !Ht.hasOwnProperty(ve) && (ge[ve] = Y[ve]);
        if (L && L.defaultProps) {
          var _e = L.defaultProps;
          for (ve in _e)
            ge[ve] === void 0 && (ge[ve] = _e[ve]);
        }
        if (ce || ze) {
          var Ae = typeof L == "function" ? L.displayName || L.name || "Unknown" : L;
          ce && Dt(ge, Ae), ze && it(ge, Ae);
        }
        return Je(L, ce, ze, he, re, Ze.current, ge);
      }
    }
    var nn = x.ReactCurrentOwner, $t = x.ReactDebugCurrentFrame;
    function wt(L) {
      if (L) {
        var Y = L._owner, ee = Se(L.type, L._source, Y ? Y.type : null);
        $t.setExtraStackFrame(ee);
      } else
        $t.setExtraStackFrame(null);
    }
    var yn;
    yn = !1;
    function st(L) {
      return typeof L == "object" && L !== null && L.$$typeof === t;
    }
    function To() {
      {
        if (nn.current) {
          var L = P(nn.current.type);
          if (L)
            return `

Check the render method of \`` + L + "`.";
        }
        return "";
      }
    }
    function Zr(L) {
      {
        if (L !== void 0) {
          var Y = L.fileName.replace(/^.*[\\\/]/, ""), ee = L.lineNumber;
          return `

Check your code at ` + Y + ":" + ee + ".";
        }
        return "";
      }
    }
    var Oo = {};
    function Kr(L) {
      {
        var Y = To();
        if (!Y) {
          var ee = typeof L == "string" ? L : L.displayName || L.name;
          ee && (Y = `

Check the top-level render call using <` + ee + ">.");
        }
        return Y;
      }
    }
    function No(L, Y) {
      {
        if (!L._store || L._store.validated || L.key != null)
          return;
        L._store.validated = !0;
        var ee = Kr(Y);
        if (Oo[ee])
          return;
        Oo[ee] = !0;
        var re = "";
        L && L._owner && L._owner !== nn.current && (re = " It was passed a child from " + P(L._owner.type) + "."), wt(L), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ee, re), wt(null);
      }
    }
    function Do(L, Y) {
      {
        if (typeof L != "object")
          return;
        if (vt(L))
          for (var ee = 0; ee < L.length; ee++) {
            var re = L[ee];
            st(re) && No(re, Y);
          }
        else if (st(L))
          L._store && (L._store.validated = !0);
        else if (L) {
          var he = m(L);
          if (typeof he == "function" && he !== L.entries)
            for (var ve = he.call(L), ge; !(ge = ve.next()).done; )
              st(ge.value) && No(ge.value, Y);
        }
      }
    }
    function Gr(L) {
      {
        var Y = L.type;
        if (Y == null || typeof Y == "string")
          return;
        var ee;
        if (typeof Y == "function")
          ee = Y.propTypes;
        else if (typeof Y == "object" && (Y.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        Y.$$typeof === d))
          ee = Y.propTypes;
        else
          return;
        if (ee) {
          var re = P(Y);
          At(ee, L.props, "prop", re, L);
        } else if (Y.PropTypes !== void 0 && !yn) {
          yn = !0;
          var he = P(Y);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", he || "Unknown");
        }
        typeof Y.getDefaultProps == "function" && !Y.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Xr(L) {
      {
        for (var Y = Object.keys(L.props), ee = 0; ee < Y.length; ee++) {
          var re = Y[ee];
          if (re !== "children" && re !== "key") {
            wt(L), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", re), wt(null);
            break;
          }
        }
        L.ref !== null && (wt(L), b("Invalid attribute `ref` supplied to `React.Fragment`."), wt(null));
      }
    }
    function Ro(L, Y, ee, re, he, ve) {
      {
        var ge = D(L);
        if (!ge) {
          var ce = "";
          (L === void 0 || typeof L == "object" && L !== null && Object.keys(L).length === 0) && (ce += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ze = Zr(he);
          ze ? ce += ze : ce += To();
          var _e;
          L === null ? _e = "null" : vt(L) ? _e = "array" : L !== void 0 && L.$$typeof === t ? (_e = "<" + (P(L.type) || "Unknown") + " />", ce = " Did you accidentally export a JSX literal instead of a component?") : _e = typeof L, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _e, ce);
        }
        var Ae = tn(L, Y, ee, he, ve);
        if (Ae == null)
          return Ae;
        if (ge) {
          var We = Y.children;
          if (We !== void 0)
            if (re)
              if (vt(We)) {
                for (var Wt = 0; Wt < We.length; Wt++)
                  Do(We[Wt], L);
                Object.freeze && Object.freeze(We);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Do(We, L);
        }
        return L === o ? Xr(Ae) : Gr(Ae), Ae;
      }
    }
    function Qr(L, Y, ee) {
      return Ro(L, Y, ee, !0);
    }
    function Jr(L, Y, ee) {
      return Ro(L, Y, ee, !1);
    }
    var ea = Jr, zo = Qr;
    Un.Fragment = o, Un.jsx = ea, Un.jsxs = zo;
  }()), Un;
}
process.env.NODE_ENV === "production" ? Si.exports = Z1() : Si.exports = K1();
var v = Si.exports, nr = {}, Fu = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Fu);
var G1 = Fu.exports, oa = {}, al;
function X1() {
  return al || (al = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "black",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        maxHeight: "inherit",
        height: "inherit",
        padding: "0 1em",
        display: "block",
        overflow: "auto"
      },
      'pre[class*="language-"]': {
        color: "black",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        position: "relative",
        margin: ".5em 0",
        overflow: "visible",
        padding: "1px",
        backgroundColor: "#fdfdfd",
        WebkitBoxSizing: "border-box",
        MozBoxSizing: "border-box",
        boxSizing: "border-box",
        marginBottom: "1em"
      },
      'pre[class*="language-"] > code': {
        position: "relative",
        zIndex: "1",
        borderLeft: "10px solid #358ccb",
        boxShadow: "-1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf",
        backgroundColor: "#fdfdfd",
        backgroundImage: "linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)",
        backgroundSize: "3em 3em",
        backgroundOrigin: "content-box",
        backgroundAttachment: "local"
      },
      ':not(pre) > code[class*="language-"]': {
        backgroundColor: "#fdfdfd",
        WebkitBoxSizing: "border-box",
        MozBoxSizing: "border-box",
        boxSizing: "border-box",
        marginBottom: "1em",
        position: "relative",
        padding: ".2em",
        borderRadius: "0.3em",
        color: "#c92c2c",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        display: "inline",
        whiteSpace: "normal"
      },
      'pre[class*="language-"]:before': {
        content: "''",
        display: "block",
        position: "absolute",
        bottom: "0.75em",
        left: "0.18em",
        width: "40%",
        height: "20%",
        maxHeight: "13em",
        boxShadow: "0px 13px 8px #979797",
        WebkitTransform: "rotate(-2deg)",
        MozTransform: "rotate(-2deg)",
        msTransform: "rotate(-2deg)",
        OTransform: "rotate(-2deg)",
        transform: "rotate(-2deg)"
      },
      'pre[class*="language-"]:after': {
        content: "''",
        display: "block",
        position: "absolute",
        bottom: "0.75em",
        left: "auto",
        width: "40%",
        height: "20%",
        maxHeight: "13em",
        boxShadow: "0px 13px 8px #979797",
        WebkitTransform: "rotate(2deg)",
        MozTransform: "rotate(2deg)",
        msTransform: "rotate(2deg)",
        OTransform: "rotate(2deg)",
        transform: "rotate(2deg)",
        right: "0.75em"
      },
      comment: {
        color: "#7D8B99"
      },
      "block-comment": {
        color: "#7D8B99"
      },
      prolog: {
        color: "#7D8B99"
      },
      doctype: {
        color: "#7D8B99"
      },
      cdata: {
        color: "#7D8B99"
      },
      punctuation: {
        color: "#5F6364"
      },
      property: {
        color: "#c92c2c"
      },
      tag: {
        color: "#c92c2c"
      },
      boolean: {
        color: "#c92c2c"
      },
      number: {
        color: "#c92c2c"
      },
      "function-name": {
        color: "#c92c2c"
      },
      constant: {
        color: "#c92c2c"
      },
      symbol: {
        color: "#c92c2c"
      },
      deleted: {
        color: "#c92c2c"
      },
      selector: {
        color: "#2f9c0a"
      },
      "attr-name": {
        color: "#2f9c0a"
      },
      string: {
        color: "#2f9c0a"
      },
      char: {
        color: "#2f9c0a"
      },
      function: {
        color: "#2f9c0a"
      },
      builtin: {
        color: "#2f9c0a"
      },
      inserted: {
        color: "#2f9c0a"
      },
      operator: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      entity: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)",
        cursor: "help"
      },
      url: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      variable: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      atrule: {
        color: "#1990b8"
      },
      "attr-value": {
        color: "#1990b8"
      },
      keyword: {
        color: "#1990b8"
      },
      "class-name": {
        color: "#1990b8"
      },
      regex: {
        color: "#e90"
      },
      important: {
        color: "#e90",
        fontWeight: "normal"
      },
      ".language-css .token.string": {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      ".style .token.string": {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      namespace: {
        Opacity: ".7"
      },
      'pre[class*="language-"].line-numbers.line-numbers': {
        paddingLeft: "0"
      },
      'pre[class*="language-"].line-numbers.line-numbers code': {
        paddingLeft: "3.8em"
      },
      'pre[class*="language-"].line-numbers.line-numbers .line-numbers-rows': {
        left: "0"
      },
      'pre[class*="language-"][data-line]': {
        paddingTop: "0",
        paddingBottom: "0",
        paddingLeft: "0"
      },
      "pre[data-line] code": {
        position: "relative",
        paddingLeft: "4em"
      },
      "pre .line-highlight": {
        marginTop: "0"
      }
    };
    e.default = t;
  }(oa)), oa;
}
var ra = {}, il;
function Q1() {
  return il || (il = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "white",
        background: "none",
        textShadow: "0 -.1em .2em black",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "white",
        background: "hsl(30, 20%, 25%)",
        textShadow: "0 -.1em .2em black",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        border: ".3em solid hsl(30, 20%, 40%)",
        borderRadius: ".5em",
        boxShadow: "1px 1px .5em black inset"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "hsl(30, 20%, 25%)",
        padding: ".15em .2em .05em",
        borderRadius: ".3em",
        border: ".13em solid hsl(30, 20%, 40%)",
        boxShadow: "1px 1px .3em -.1em black inset",
        whiteSpace: "normal"
      },
      comment: {
        color: "hsl(30, 20%, 50%)"
      },
      prolog: {
        color: "hsl(30, 20%, 50%)"
      },
      doctype: {
        color: "hsl(30, 20%, 50%)"
      },
      cdata: {
        color: "hsl(30, 20%, 50%)"
      },
      punctuation: {
        Opacity: ".7"
      },
      namespace: {
        Opacity: ".7"
      },
      property: {
        color: "hsl(350, 40%, 70%)"
      },
      tag: {
        color: "hsl(350, 40%, 70%)"
      },
      boolean: {
        color: "hsl(350, 40%, 70%)"
      },
      number: {
        color: "hsl(350, 40%, 70%)"
      },
      constant: {
        color: "hsl(350, 40%, 70%)"
      },
      symbol: {
        color: "hsl(350, 40%, 70%)"
      },
      selector: {
        color: "hsl(75, 70%, 60%)"
      },
      "attr-name": {
        color: "hsl(75, 70%, 60%)"
      },
      string: {
        color: "hsl(75, 70%, 60%)"
      },
      char: {
        color: "hsl(75, 70%, 60%)"
      },
      builtin: {
        color: "hsl(75, 70%, 60%)"
      },
      inserted: {
        color: "hsl(75, 70%, 60%)"
      },
      operator: {
        color: "hsl(40, 90%, 60%)"
      },
      entity: {
        color: "hsl(40, 90%, 60%)",
        cursor: "help"
      },
      url: {
        color: "hsl(40, 90%, 60%)"
      },
      ".language-css .token.string": {
        color: "hsl(40, 90%, 60%)"
      },
      ".style .token.string": {
        color: "hsl(40, 90%, 60%)"
      },
      variable: {
        color: "hsl(40, 90%, 60%)"
      },
      atrule: {
        color: "hsl(350, 40%, 70%)"
      },
      "attr-value": {
        color: "hsl(350, 40%, 70%)"
      },
      keyword: {
        color: "hsl(350, 40%, 70%)"
      },
      regex: {
        color: "#e90"
      },
      important: {
        color: "#e90",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      deleted: {
        color: "red"
      }
    };
    e.default = t;
  }(ra)), ra;
}
var aa = {}, sl;
function J1() {
  return sl || (sl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "black",
        color: "white",
        boxShadow: "-.3em 0 0 .3em black, .3em 0 0 .3em black"
      },
      'pre[class*="language-"]': {
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: ".4em .8em",
        margin: ".5em 0",
        overflow: "auto",
        background: `url('data:image/svg+xml;charset=utf-8,<svg%20version%3D"1.1"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20width%3D"100"%20height%3D"100"%20fill%3D"rgba(0%2C0%2C0%2C.2)">%0D%0A<polygon%20points%3D"0%2C50%2050%2C0%200%2C0"%20%2F>%0D%0A<polygon%20points%3D"0%2C100%2050%2C100%20100%2C50%20100%2C0"%20%2F>%0D%0A<%2Fsvg>')`,
        backgroundSize: "1em 1em"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".2em",
        borderRadius: ".3em",
        boxShadow: "none",
        whiteSpace: "normal"
      },
      comment: {
        color: "#aaa"
      },
      prolog: {
        color: "#aaa"
      },
      doctype: {
        color: "#aaa"
      },
      cdata: {
        color: "#aaa"
      },
      punctuation: {
        color: "#999"
      },
      namespace: {
        Opacity: ".7"
      },
      property: {
        color: "#0cf"
      },
      tag: {
        color: "#0cf"
      },
      boolean: {
        color: "#0cf"
      },
      number: {
        color: "#0cf"
      },
      constant: {
        color: "#0cf"
      },
      symbol: {
        color: "#0cf"
      },
      selector: {
        color: "yellow"
      },
      "attr-name": {
        color: "yellow"
      },
      string: {
        color: "yellow"
      },
      char: {
        color: "yellow"
      },
      builtin: {
        color: "yellow"
      },
      operator: {
        color: "yellowgreen"
      },
      entity: {
        color: "yellowgreen",
        cursor: "help"
      },
      url: {
        color: "yellowgreen"
      },
      ".language-css .token.string": {
        color: "yellowgreen"
      },
      variable: {
        color: "yellowgreen"
      },
      inserted: {
        color: "yellowgreen"
      },
      atrule: {
        color: "deeppink"
      },
      "attr-value": {
        color: "deeppink"
      },
      keyword: {
        color: "deeppink"
      },
      regex: {
        color: "orange"
      },
      important: {
        color: "orange",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      deleted: {
        color: "red"
      },
      "pre.diff-highlight.diff-highlight > code .token.deleted:not(.prefix)": {
        backgroundColor: "rgba(255, 0, 0, .3)",
        display: "inline"
      },
      "pre > code.diff-highlight.diff-highlight .token.deleted:not(.prefix)": {
        backgroundColor: "rgba(255, 0, 0, .3)",
        display: "inline"
      },
      "pre.diff-highlight.diff-highlight > code .token.inserted:not(.prefix)": {
        backgroundColor: "rgba(0, 255, 128, .3)",
        display: "inline"
      },
      "pre > code.diff-highlight.diff-highlight .token.inserted:not(.prefix)": {
        backgroundColor: "rgba(0, 255, 128, .3)",
        display: "inline"
      }
    };
    e.default = t;
  }(aa)), aa;
}
var ia = {}, ll;
function eg() {
  return ll || (ll = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#f8f8f2",
        background: "none",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#f8f8f2",
        background: "#272822",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#272822",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#8292a2"
      },
      prolog: {
        color: "#8292a2"
      },
      doctype: {
        color: "#8292a2"
      },
      cdata: {
        color: "#8292a2"
      },
      punctuation: {
        color: "#f8f8f2"
      },
      namespace: {
        Opacity: ".7"
      },
      property: {
        color: "#f92672"
      },
      tag: {
        color: "#f92672"
      },
      constant: {
        color: "#f92672"
      },
      symbol: {
        color: "#f92672"
      },
      deleted: {
        color: "#f92672"
      },
      boolean: {
        color: "#ae81ff"
      },
      number: {
        color: "#ae81ff"
      },
      selector: {
        color: "#a6e22e"
      },
      "attr-name": {
        color: "#a6e22e"
      },
      string: {
        color: "#a6e22e"
      },
      char: {
        color: "#a6e22e"
      },
      builtin: {
        color: "#a6e22e"
      },
      inserted: {
        color: "#a6e22e"
      },
      operator: {
        color: "#f8f8f2"
      },
      entity: {
        color: "#f8f8f2",
        cursor: "help"
      },
      url: {
        color: "#f8f8f2"
      },
      ".language-css .token.string": {
        color: "#f8f8f2"
      },
      ".style .token.string": {
        color: "#f8f8f2"
      },
      variable: {
        color: "#f8f8f2"
      },
      atrule: {
        color: "#e6db74"
      },
      "attr-value": {
        color: "#e6db74"
      },
      function: {
        color: "#e6db74"
      },
      "class-name": {
        color: "#e6db74"
      },
      keyword: {
        color: "#66d9ef"
      },
      regex: {
        color: "#fd971f"
      },
      important: {
        color: "#fd971f",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(ia)), ia;
}
var sa = {}, cl;
function tg() {
  return cl || (cl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#657b83",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#657b83",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em",
        backgroundColor: "#fdf6e3"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#073642"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#073642"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#073642"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#073642"
      },
      'pre[class*="language-"]::selection': {
        background: "#073642"
      },
      'pre[class*="language-"] ::selection': {
        background: "#073642"
      },
      'code[class*="language-"]::selection': {
        background: "#073642"
      },
      'code[class*="language-"] ::selection': {
        background: "#073642"
      },
      ':not(pre) > code[class*="language-"]': {
        backgroundColor: "#fdf6e3",
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#93a1a1"
      },
      prolog: {
        color: "#93a1a1"
      },
      doctype: {
        color: "#93a1a1"
      },
      cdata: {
        color: "#93a1a1"
      },
      punctuation: {
        color: "#586e75"
      },
      namespace: {
        Opacity: ".7"
      },
      property: {
        color: "#268bd2"
      },
      tag: {
        color: "#268bd2"
      },
      boolean: {
        color: "#268bd2"
      },
      number: {
        color: "#268bd2"
      },
      constant: {
        color: "#268bd2"
      },
      symbol: {
        color: "#268bd2"
      },
      deleted: {
        color: "#268bd2"
      },
      selector: {
        color: "#2aa198"
      },
      "attr-name": {
        color: "#2aa198"
      },
      string: {
        color: "#2aa198"
      },
      char: {
        color: "#2aa198"
      },
      builtin: {
        color: "#2aa198"
      },
      url: {
        color: "#2aa198"
      },
      inserted: {
        color: "#2aa198"
      },
      entity: {
        color: "#657b83",
        background: "#eee8d5",
        cursor: "help"
      },
      atrule: {
        color: "#859900"
      },
      "attr-value": {
        color: "#859900"
      },
      keyword: {
        color: "#859900"
      },
      function: {
        color: "#b58900"
      },
      "class-name": {
        color: "#b58900"
      },
      regex: {
        color: "#cb4b16"
      },
      important: {
        color: "#cb4b16",
        fontWeight: "bold"
      },
      variable: {
        color: "#cb4b16"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(sa)), sa;
}
var la = {}, ul;
function ng() {
  return ul || (ul = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#ccc",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#ccc",
        background: "#2d2d2d",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#2d2d2d",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#999"
      },
      "block-comment": {
        color: "#999"
      },
      prolog: {
        color: "#999"
      },
      doctype: {
        color: "#999"
      },
      cdata: {
        color: "#999"
      },
      punctuation: {
        color: "#ccc"
      },
      tag: {
        color: "#e2777a"
      },
      "attr-name": {
        color: "#e2777a"
      },
      namespace: {
        color: "#e2777a"
      },
      deleted: {
        color: "#e2777a"
      },
      "function-name": {
        color: "#6196cc"
      },
      boolean: {
        color: "#f08d49"
      },
      number: {
        color: "#f08d49"
      },
      function: {
        color: "#f08d49"
      },
      property: {
        color: "#f8c555"
      },
      "class-name": {
        color: "#f8c555"
      },
      constant: {
        color: "#f8c555"
      },
      symbol: {
        color: "#f8c555"
      },
      selector: {
        color: "#cc99cd"
      },
      important: {
        color: "#cc99cd",
        fontWeight: "bold"
      },
      atrule: {
        color: "#cc99cd"
      },
      keyword: {
        color: "#cc99cd"
      },
      builtin: {
        color: "#cc99cd"
      },
      string: {
        color: "#7ec699"
      },
      char: {
        color: "#7ec699"
      },
      "attr-value": {
        color: "#7ec699"
      },
      regex: {
        color: "#7ec699"
      },
      variable: {
        color: "#7ec699"
      },
      operator: {
        color: "#67cdcc"
      },
      entity: {
        color: "#67cdcc",
        cursor: "help"
      },
      url: {
        color: "#67cdcc"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      inserted: {
        color: "green"
      }
    };
    e.default = t;
  }(la)), la;
}
var ca = {}, dl;
function og() {
  return dl || (dl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "white",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        textShadow: "0 -.1em .2em black",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "white",
        background: "hsl(0, 0%, 8%)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        textShadow: "0 -.1em .2em black",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        borderRadius: ".5em",
        border: ".3em solid hsl(0, 0%, 33%)",
        boxShadow: "1px 1px .5em black inset",
        margin: ".5em 0",
        overflow: "auto",
        padding: "1em"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "hsl(0, 0%, 8%)",
        borderRadius: ".3em",
        border: ".13em solid hsl(0, 0%, 33%)",
        boxShadow: "1px 1px .3em -.1em black inset",
        padding: ".15em .2em .05em",
        whiteSpace: "normal"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "hsla(0, 0%, 93%, 0.15)",
        textShadow: "none"
      },
      'pre[class*="language-"]::selection': {
        background: "hsla(0, 0%, 93%, 0.15)",
        textShadow: "none"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "hsla(0, 0%, 93%, 0.15)"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "hsla(0, 0%, 93%, 0.15)"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "hsla(0, 0%, 93%, 0.15)"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "hsla(0, 0%, 93%, 0.15)"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "hsla(0, 0%, 93%, 0.15)"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "hsla(0, 0%, 93%, 0.15)"
      },
      comment: {
        color: "hsl(0, 0%, 47%)"
      },
      prolog: {
        color: "hsl(0, 0%, 47%)"
      },
      doctype: {
        color: "hsl(0, 0%, 47%)"
      },
      cdata: {
        color: "hsl(0, 0%, 47%)"
      },
      punctuation: {
        Opacity: ".7"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "hsl(14, 58%, 55%)"
      },
      boolean: {
        color: "hsl(14, 58%, 55%)"
      },
      number: {
        color: "hsl(14, 58%, 55%)"
      },
      deleted: {
        color: "hsl(14, 58%, 55%)"
      },
      keyword: {
        color: "hsl(53, 89%, 79%)"
      },
      property: {
        color: "hsl(53, 89%, 79%)"
      },
      selector: {
        color: "hsl(53, 89%, 79%)"
      },
      constant: {
        color: "hsl(53, 89%, 79%)"
      },
      symbol: {
        color: "hsl(53, 89%, 79%)"
      },
      builtin: {
        color: "hsl(53, 89%, 79%)"
      },
      "attr-name": {
        color: "hsl(76, 21%, 52%)"
      },
      "attr-value": {
        color: "hsl(76, 21%, 52%)"
      },
      string: {
        color: "hsl(76, 21%, 52%)"
      },
      char: {
        color: "hsl(76, 21%, 52%)"
      },
      operator: {
        color: "hsl(76, 21%, 52%)"
      },
      entity: {
        color: "hsl(76, 21%, 52%)",
        cursor: "help"
      },
      url: {
        color: "hsl(76, 21%, 52%)"
      },
      ".language-css .token.string": {
        color: "hsl(76, 21%, 52%)"
      },
      ".style .token.string": {
        color: "hsl(76, 21%, 52%)"
      },
      variable: {
        color: "hsl(76, 21%, 52%)"
      },
      inserted: {
        color: "hsl(76, 21%, 52%)"
      },
      atrule: {
        color: "hsl(218, 22%, 55%)"
      },
      regex: {
        color: "hsl(42, 75%, 65%)"
      },
      important: {
        color: "hsl(42, 75%, 65%)",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      ".language-markup .token.tag": {
        color: "hsl(33, 33%, 52%)"
      },
      ".language-markup .token.attr-name": {
        color: "hsl(33, 33%, 52%)"
      },
      ".language-markup .token.punctuation": {
        color: "hsl(33, 33%, 52%)"
      },
      "": {
        position: "relative",
        zIndex: "1"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, hsla(0, 0%, 33%, .1) 70%, hsla(0, 0%, 33%, 0))",
        borderBottom: "1px dashed hsl(0, 0%, 33%)",
        borderTop: "1px dashed hsl(0, 0%, 33%)",
        marginTop: "0.75em",
        zIndex: "0"
      },
      ".line-highlight.line-highlight:before": {
        backgroundColor: "hsl(215, 15%, 59%)",
        color: "hsl(24, 20%, 95%)"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        backgroundColor: "hsl(215, 15%, 59%)",
        color: "hsl(24, 20%, 95%)"
      }
    };
    e.default = t;
  }(ca)), ca;
}
var ua = {}, fl;
function rg() {
  return fl || (fl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "black",
        background: "none",
        textShadow: "0 1px white",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "black",
        background: "#f5f2f0",
        textShadow: "0 1px white",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#b3d4fc"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#f5f2f0",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "slategray"
      },
      prolog: {
        color: "slategray"
      },
      doctype: {
        color: "slategray"
      },
      cdata: {
        color: "slategray"
      },
      punctuation: {
        color: "#999"
      },
      namespace: {
        Opacity: ".7"
      },
      property: {
        color: "#905"
      },
      tag: {
        color: "#905"
      },
      boolean: {
        color: "#905"
      },
      number: {
        color: "#905"
      },
      constant: {
        color: "#905"
      },
      symbol: {
        color: "#905"
      },
      deleted: {
        color: "#905"
      },
      selector: {
        color: "#690"
      },
      "attr-name": {
        color: "#690"
      },
      string: {
        color: "#690"
      },
      char: {
        color: "#690"
      },
      builtin: {
        color: "#690"
      },
      inserted: {
        color: "#690"
      },
      operator: {
        color: "#9a6e3a",
        background: "hsla(0, 0%, 100%, .5)"
      },
      entity: {
        color: "#9a6e3a",
        background: "hsla(0, 0%, 100%, .5)",
        cursor: "help"
      },
      url: {
        color: "#9a6e3a",
        background: "hsla(0, 0%, 100%, .5)"
      },
      ".language-css .token.string": {
        color: "#9a6e3a",
        background: "hsla(0, 0%, 100%, .5)"
      },
      ".style .token.string": {
        color: "#9a6e3a",
        background: "hsla(0, 0%, 100%, .5)"
      },
      atrule: {
        color: "#07a"
      },
      "attr-value": {
        color: "#07a"
      },
      keyword: {
        color: "#07a"
      },
      function: {
        color: "#DD4A68"
      },
      "class-name": {
        color: "#DD4A68"
      },
      regex: {
        color: "#e90"
      },
      important: {
        color: "#e90",
        fontWeight: "bold"
      },
      variable: {
        color: "#e90"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(ua)), ua;
}
var da = {}, gl;
function ag() {
  return gl || (gl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#f8f8f2",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#f8f8f2",
        background: "#2b2b2b",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto",
        borderRadius: "0.3em"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#2b2b2b",
        padding: "0.1em",
        borderRadius: "0.3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#d4d0ab"
      },
      prolog: {
        color: "#d4d0ab"
      },
      doctype: {
        color: "#d4d0ab"
      },
      cdata: {
        color: "#d4d0ab"
      },
      punctuation: {
        color: "#fefefe"
      },
      property: {
        color: "#ffa07a"
      },
      tag: {
        color: "#ffa07a"
      },
      constant: {
        color: "#ffa07a"
      },
      symbol: {
        color: "#ffa07a"
      },
      deleted: {
        color: "#ffa07a"
      },
      boolean: {
        color: "#00e0e0"
      },
      number: {
        color: "#00e0e0"
      },
      selector: {
        color: "#abe338"
      },
      "attr-name": {
        color: "#abe338"
      },
      string: {
        color: "#abe338"
      },
      char: {
        color: "#abe338"
      },
      builtin: {
        color: "#abe338"
      },
      inserted: {
        color: "#abe338"
      },
      operator: {
        color: "#00e0e0"
      },
      entity: {
        color: "#00e0e0",
        cursor: "help"
      },
      url: {
        color: "#00e0e0"
      },
      ".language-css .token.string": {
        color: "#00e0e0"
      },
      ".style .token.string": {
        color: "#00e0e0"
      },
      variable: {
        color: "#00e0e0"
      },
      atrule: {
        color: "#ffd700"
      },
      "attr-value": {
        color: "#ffd700"
      },
      function: {
        color: "#ffd700"
      },
      keyword: {
        color: "#00e0e0"
      },
      regex: {
        color: "#ffd700"
      },
      important: {
        color: "#ffd700",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(da)), da;
}
var fa = {}, pl;
function ig() {
  return pl || (pl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#c5c8c6",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#c5c8c6",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em",
        background: "#1d1f21"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#1d1f21",
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#7C7C7C"
      },
      prolog: {
        color: "#7C7C7C"
      },
      doctype: {
        color: "#7C7C7C"
      },
      cdata: {
        color: "#7C7C7C"
      },
      punctuation: {
        color: "#c5c8c6"
      },
      ".namespace": {
        Opacity: ".7"
      },
      property: {
        color: "#96CBFE"
      },
      keyword: {
        color: "#96CBFE"
      },
      tag: {
        color: "#96CBFE"
      },
      "class-name": {
        color: "#FFFFB6",
        textDecoration: "underline"
      },
      boolean: {
        color: "#99CC99"
      },
      constant: {
        color: "#99CC99"
      },
      symbol: {
        color: "#f92672"
      },
      deleted: {
        color: "#f92672"
      },
      number: {
        color: "#FF73FD"
      },
      selector: {
        color: "#A8FF60"
      },
      "attr-name": {
        color: "#A8FF60"
      },
      string: {
        color: "#A8FF60"
      },
      char: {
        color: "#A8FF60"
      },
      builtin: {
        color: "#A8FF60"
      },
      inserted: {
        color: "#A8FF60"
      },
      variable: {
        color: "#C6C5FE"
      },
      operator: {
        color: "#EDEDED"
      },
      entity: {
        color: "#FFFFB6",
        cursor: "help"
      },
      url: {
        color: "#96CBFE"
      },
      ".language-css .token.string": {
        color: "#87C38A"
      },
      ".style .token.string": {
        color: "#87C38A"
      },
      atrule: {
        color: "#F9EE98"
      },
      "attr-value": {
        color: "#F9EE98"
      },
      function: {
        color: "#DAD085"
      },
      regex: {
        color: "#E9C062"
      },
      important: {
        color: "#fd971f",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(fa)), fa;
}
var ga = {}, hl;
function sg() {
  return hl || (hl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#f5f7ff",
        color: "#5e6687"
      },
      'pre[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#f5f7ff",
        color: "#5e6687",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#dfe2f1"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#898ea4"
      },
      prolog: {
        color: "#898ea4"
      },
      doctype: {
        color: "#898ea4"
      },
      cdata: {
        color: "#898ea4"
      },
      punctuation: {
        color: "#5e6687"
      },
      namespace: {
        Opacity: ".7"
      },
      operator: {
        color: "#c76b29"
      },
      boolean: {
        color: "#c76b29"
      },
      number: {
        color: "#c76b29"
      },
      property: {
        color: "#c08b30"
      },
      tag: {
        color: "#3d8fd1"
      },
      string: {
        color: "#22a2c9"
      },
      selector: {
        color: "#6679cc"
      },
      "attr-name": {
        color: "#c76b29"
      },
      entity: {
        color: "#22a2c9",
        cursor: "help"
      },
      url: {
        color: "#22a2c9"
      },
      ".language-css .token.string": {
        color: "#22a2c9"
      },
      ".style .token.string": {
        color: "#22a2c9"
      },
      "attr-value": {
        color: "#ac9739"
      },
      keyword: {
        color: "#ac9739"
      },
      control: {
        color: "#ac9739"
      },
      directive: {
        color: "#ac9739"
      },
      unit: {
        color: "#ac9739"
      },
      statement: {
        color: "#22a2c9"
      },
      regex: {
        color: "#22a2c9"
      },
      atrule: {
        color: "#22a2c9"
      },
      placeholder: {
        color: "#3d8fd1"
      },
      variable: {
        color: "#3d8fd1"
      },
      deleted: {
        textDecoration: "line-through"
      },
      inserted: {
        borderBottom: "1px dotted #202746",
        textDecoration: "none"
      },
      italic: {
        fontStyle: "italic"
      },
      important: {
        fontWeight: "bold",
        color: "#c94922"
      },
      bold: {
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: "0.4em solid #c94922",
        OutlineOffset: ".4em"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#dfe2f1"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#979db4"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(107, 115, 148, 0.2) 70%, rgba(107, 115, 148, 0))"
      }
    };
    e.default = t;
  }(ga)), ga;
}
var pa = {}, ml;
function lg() {
  return ml || (ml = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#fff",
        textShadow: "0 1px 1px #000",
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        direction: "ltr",
        textAlign: "left",
        wordSpacing: "normal",
        whiteSpace: "pre",
        wordWrap: "normal",
        lineHeight: "1.4",
        background: "none",
        border: "0",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#fff",
        textShadow: "0 1px 1px #000",
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        direction: "ltr",
        textAlign: "left",
        wordSpacing: "normal",
        whiteSpace: "pre",
        wordWrap: "normal",
        lineHeight: "1.4",
        background: "#222",
        border: "0",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "15px",
        margin: "1em 0",
        overflow: "auto",
        MozBorderRadius: "8px",
        WebkitBorderRadius: "8px",
        borderRadius: "8px"
      },
      'pre[class*="language-"] code': {
        float: "left",
        padding: "0 15px 0 0"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#222",
        padding: "5px 10px",
        lineHeight: "1",
        MozBorderRadius: "3px",
        WebkitBorderRadius: "3px",
        borderRadius: "3px"
      },
      comment: {
        color: "#797979"
      },
      prolog: {
        color: "#797979"
      },
      doctype: {
        color: "#797979"
      },
      cdata: {
        color: "#797979"
      },
      selector: {
        color: "#fff"
      },
      operator: {
        color: "#fff"
      },
      punctuation: {
        color: "#fff"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "#ffd893"
      },
      boolean: {
        color: "#ffd893"
      },
      atrule: {
        color: "#B0C975"
      },
      "attr-value": {
        color: "#B0C975"
      },
      hex: {
        color: "#B0C975"
      },
      string: {
        color: "#B0C975"
      },
      property: {
        color: "#c27628"
      },
      entity: {
        color: "#c27628",
        cursor: "help"
      },
      url: {
        color: "#c27628"
      },
      "attr-name": {
        color: "#c27628"
      },
      keyword: {
        color: "#c27628"
      },
      regex: {
        color: "#9B71C6"
      },
      function: {
        color: "#e5a638"
      },
      constant: {
        color: "#e5a638"
      },
      variable: {
        color: "#fdfba8"
      },
      number: {
        color: "#8799B0"
      },
      important: {
        color: "#E45734"
      },
      deliminator: {
        color: "#E45734"
      },
      ".line-highlight.line-highlight": {
        background: "rgba(255, 255, 255, .2)"
      },
      ".line-highlight.line-highlight:before": {
        top: ".3em",
        backgroundColor: "rgba(255, 255, 255, .3)",
        color: "#fff",
        MozBorderRadius: "8px",
        WebkitBorderRadius: "8px",
        borderRadius: "8px"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        top: ".3em",
        backgroundColor: "rgba(255, 255, 255, .3)",
        color: "#fff",
        MozBorderRadius: "8px",
        WebkitBorderRadius: "8px",
        borderRadius: "8px"
      },
      ".line-numbers .line-numbers-rows > span": {
        borderRight: "3px #d9d336 solid"
      }
    };
    e.default = t;
  }(pa)), pa;
}
var ha = {}, bl;
function cg() {
  return bl || (bl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#111b27",
        background: "none",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#111b27",
        background: "#e3eaf2",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#8da1b9"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#8da1b9"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#8da1b9"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#8da1b9"
      },
      'pre[class*="language-"]::selection': {
        background: "#8da1b9"
      },
      'pre[class*="language-"] ::selection': {
        background: "#8da1b9"
      },
      'code[class*="language-"]::selection': {
        background: "#8da1b9"
      },
      'code[class*="language-"] ::selection': {
        background: "#8da1b9"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#e3eaf2",
        padding: "0.1em 0.3em",
        borderRadius: "0.3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#3c526d"
      },
      prolog: {
        color: "#3c526d"
      },
      doctype: {
        color: "#3c526d"
      },
      cdata: {
        color: "#3c526d"
      },
      punctuation: {
        color: "#111b27"
      },
      "delimiter.important": {
        color: "#006d6d",
        fontWeight: "inherit"
      },
      "selector.parent": {
        color: "#006d6d"
      },
      tag: {
        color: "#006d6d"
      },
      "tag.punctuation": {
        color: "#006d6d"
      },
      "attr-name": {
        color: "#755f00"
      },
      boolean: {
        color: "#755f00"
      },
      "boolean.important": {
        color: "#755f00"
      },
      number: {
        color: "#755f00"
      },
      constant: {
        color: "#755f00"
      },
      "selector.attribute": {
        color: "#755f00"
      },
      "class-name": {
        color: "#005a8e"
      },
      key: {
        color: "#005a8e"
      },
      parameter: {
        color: "#005a8e"
      },
      property: {
        color: "#005a8e"
      },
      "property-access": {
        color: "#005a8e"
      },
      variable: {
        color: "#005a8e"
      },
      "attr-value": {
        color: "#116b00"
      },
      inserted: {
        color: "#116b00"
      },
      color: {
        color: "#116b00"
      },
      "selector.value": {
        color: "#116b00"
      },
      string: {
        color: "#116b00"
      },
      "string.url-link": {
        color: "#116b00"
      },
      builtin: {
        color: "#af00af"
      },
      "keyword-array": {
        color: "#af00af"
      },
      package: {
        color: "#af00af"
      },
      regex: {
        color: "#af00af"
      },
      function: {
        color: "#7c00aa"
      },
      "selector.class": {
        color: "#7c00aa"
      },
      "selector.id": {
        color: "#7c00aa"
      },
      "atrule.rule": {
        color: "#a04900"
      },
      combinator: {
        color: "#a04900"
      },
      keyword: {
        color: "#a04900"
      },
      operator: {
        color: "#a04900"
      },
      "pseudo-class": {
        color: "#a04900"
      },
      "pseudo-element": {
        color: "#a04900"
      },
      selector: {
        color: "#a04900"
      },
      unit: {
        color: "#a04900"
      },
      deleted: {
        color: "#c22f2e"
      },
      important: {
        color: "#c22f2e",
        fontWeight: "bold"
      },
      "keyword-this": {
        color: "#005a8e",
        fontWeight: "bold"
      },
      this: {
        color: "#005a8e",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      entity: {
        cursor: "help"
      },
      ".language-markdown .token.title": {
        color: "#005a8e",
        fontWeight: "bold"
      },
      ".language-markdown .token.title .token.punctuation": {
        color: "#005a8e",
        fontWeight: "bold"
      },
      ".language-markdown .token.blockquote.punctuation": {
        color: "#af00af"
      },
      ".language-markdown .token.code": {
        color: "#006d6d"
      },
      ".language-markdown .token.hr.punctuation": {
        color: "#005a8e"
      },
      ".language-markdown .token.url > .token.content": {
        color: "#116b00"
      },
      ".language-markdown .token.url-link": {
        color: "#755f00"
      },
      ".language-markdown .token.list.punctuation": {
        color: "#af00af"
      },
      ".language-markdown .token.table-header": {
        color: "#111b27"
      },
      ".language-json .token.operator": {
        color: "#111b27"
      },
      ".language-scss .token.variable": {
        color: "#006d6d"
      },
      "token.tab:not(:empty):before": {
        color: "#3c526d"
      },
      "token.cr:before": {
        color: "#3c526d"
      },
      "token.lf:before": {
        color: "#3c526d"
      },
      "token.space:before": {
        color: "#3c526d"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
        color: "#e3eaf2",
        background: "#005a8e"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
        color: "#e3eaf2",
        background: "#005a8e"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
        color: "#e3eaf2",
        background: "#005a8eda",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
        color: "#e3eaf2",
        background: "#005a8eda",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
        color: "#e3eaf2",
        background: "#005a8eda",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
        color: "#e3eaf2",
        background: "#005a8eda",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
        color: "#e3eaf2",
        background: "#3c526d"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
        color: "#e3eaf2",
        background: "#3c526d"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
        color: "#e3eaf2",
        background: "#3c526d"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, #8da1b92f 70%, #8da1b925)"
      },
      ".line-highlight.line-highlight:before": {
        backgroundColor: "#3c526d",
        color: "#e3eaf2",
        boxShadow: "0 1px #8da1b9"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        backgroundColor: "#3c526d",
        color: "#e3eaf2",
        boxShadow: "0 1px #8da1b9"
      },
      "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before": {
        backgroundColor: "#3c526d1f"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRight: "1px solid #8da1b97a",
        background: "#d0dae77a"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#3c526dda"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-1": {
        color: "#755f00"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-5": {
        color: "#755f00"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-9": {
        color: "#755f00"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-2": {
        color: "#af00af"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-6": {
        color: "#af00af"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-10": {
        color: "#af00af"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-3": {
        color: "#005a8e"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-7": {
        color: "#005a8e"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-11": {
        color: "#005a8e"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-4": {
        color: "#7c00aa"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-8": {
        color: "#7c00aa"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-12": {
        color: "#7c00aa"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
        backgroundColor: "#c22f2e1f"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
        backgroundColor: "#c22f2e1f"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
        backgroundColor: "#116b001f"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
        backgroundColor: "#116b001f"
      },
      ".command-line .command-line-prompt": {
        borderRight: "1px solid #8da1b97a"
      },
      ".command-line .command-line-prompt > span:before": {
        color: "#3c526dda"
      }
    };
    e.default = t;
  }(ha)), ha;
}
var ma = {}, yl;
function ug() {
  return yl || (yl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#e3eaf2",
        background: "none",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#e3eaf2",
        background: "#111b27",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#3c526d"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#3c526d"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#3c526d"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#3c526d"
      },
      'pre[class*="language-"]::selection': {
        background: "#3c526d"
      },
      'pre[class*="language-"] ::selection': {
        background: "#3c526d"
      },
      'code[class*="language-"]::selection': {
        background: "#3c526d"
      },
      'code[class*="language-"] ::selection': {
        background: "#3c526d"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#111b27",
        padding: "0.1em 0.3em",
        borderRadius: "0.3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#8da1b9"
      },
      prolog: {
        color: "#8da1b9"
      },
      doctype: {
        color: "#8da1b9"
      },
      cdata: {
        color: "#8da1b9"
      },
      punctuation: {
        color: "#e3eaf2"
      },
      "delimiter.important": {
        color: "#66cccc",
        fontWeight: "inherit"
      },
      "selector.parent": {
        color: "#66cccc"
      },
      tag: {
        color: "#66cccc"
      },
      "tag.punctuation": {
        color: "#66cccc"
      },
      "attr-name": {
        color: "#e6d37a"
      },
      boolean: {
        color: "#e6d37a"
      },
      "boolean.important": {
        color: "#e6d37a"
      },
      number: {
        color: "#e6d37a"
      },
      constant: {
        color: "#e6d37a"
      },
      "selector.attribute": {
        color: "#e6d37a"
      },
      "class-name": {
        color: "#6cb8e6"
      },
      key: {
        color: "#6cb8e6"
      },
      parameter: {
        color: "#6cb8e6"
      },
      property: {
        color: "#6cb8e6"
      },
      "property-access": {
        color: "#6cb8e6"
      },
      variable: {
        color: "#6cb8e6"
      },
      "attr-value": {
        color: "#91d076"
      },
      inserted: {
        color: "#91d076"
      },
      color: {
        color: "#91d076"
      },
      "selector.value": {
        color: "#91d076"
      },
      string: {
        color: "#91d076"
      },
      "string.url-link": {
        color: "#91d076"
      },
      builtin: {
        color: "#f4adf4"
      },
      "keyword-array": {
        color: "#f4adf4"
      },
      package: {
        color: "#f4adf4"
      },
      regex: {
        color: "#f4adf4"
      },
      function: {
        color: "#c699e3"
      },
      "selector.class": {
        color: "#c699e3"
      },
      "selector.id": {
        color: "#c699e3"
      },
      "atrule.rule": {
        color: "#e9ae7e"
      },
      combinator: {
        color: "#e9ae7e"
      },
      keyword: {
        color: "#e9ae7e"
      },
      operator: {
        color: "#e9ae7e"
      },
      "pseudo-class": {
        color: "#e9ae7e"
      },
      "pseudo-element": {
        color: "#e9ae7e"
      },
      selector: {
        color: "#e9ae7e"
      },
      unit: {
        color: "#e9ae7e"
      },
      deleted: {
        color: "#cd6660"
      },
      important: {
        color: "#cd6660",
        fontWeight: "bold"
      },
      "keyword-this": {
        color: "#6cb8e6",
        fontWeight: "bold"
      },
      this: {
        color: "#6cb8e6",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      entity: {
        cursor: "help"
      },
      ".language-markdown .token.title": {
        color: "#6cb8e6",
        fontWeight: "bold"
      },
      ".language-markdown .token.title .token.punctuation": {
        color: "#6cb8e6",
        fontWeight: "bold"
      },
      ".language-markdown .token.blockquote.punctuation": {
        color: "#f4adf4"
      },
      ".language-markdown .token.code": {
        color: "#66cccc"
      },
      ".language-markdown .token.hr.punctuation": {
        color: "#6cb8e6"
      },
      ".language-markdown .token.url .token.content": {
        color: "#91d076"
      },
      ".language-markdown .token.url-link": {
        color: "#e6d37a"
      },
      ".language-markdown .token.list.punctuation": {
        color: "#f4adf4"
      },
      ".language-markdown .token.table-header": {
        color: "#e3eaf2"
      },
      ".language-json .token.operator": {
        color: "#e3eaf2"
      },
      ".language-scss .token.variable": {
        color: "#66cccc"
      },
      "token.tab:not(:empty):before": {
        color: "#8da1b9"
      },
      "token.cr:before": {
        color: "#8da1b9"
      },
      "token.lf:before": {
        color: "#8da1b9"
      },
      "token.space:before": {
        color: "#8da1b9"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
        color: "#111b27",
        background: "#6cb8e6"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
        color: "#111b27",
        background: "#6cb8e6"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
        color: "#111b27",
        background: "#8da1b9"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
        color: "#111b27",
        background: "#8da1b9"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
        color: "#111b27",
        background: "#8da1b9"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, #3c526d5f 70%, #3c526d55)"
      },
      ".line-highlight.line-highlight:before": {
        backgroundColor: "#8da1b9",
        color: "#111b27",
        boxShadow: "0 1px #3c526d"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        backgroundColor: "#8da1b9",
        color: "#111b27",
        boxShadow: "0 1px #3c526d"
      },
      "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before": {
        backgroundColor: "#8da1b918"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRight: "1px solid #0b121b",
        background: "#0b121b7a"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#8da1b9da"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-1": {
        color: "#e6d37a"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-5": {
        color: "#e6d37a"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-9": {
        color: "#e6d37a"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-2": {
        color: "#f4adf4"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-6": {
        color: "#f4adf4"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-10": {
        color: "#f4adf4"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-3": {
        color: "#6cb8e6"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-7": {
        color: "#6cb8e6"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-11": {
        color: "#6cb8e6"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-4": {
        color: "#c699e3"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-8": {
        color: "#c699e3"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-12": {
        color: "#c699e3"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
        backgroundColor: "#cd66601f"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
        backgroundColor: "#cd66601f"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
        backgroundColor: "#91d0761f"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
        backgroundColor: "#91d0761f"
      },
      ".command-line .command-line-prompt": {
        borderRight: "1px solid #0b121b"
      },
      ".command-line .command-line-prompt > span:before": {
        color: "#8da1b9da"
      }
    };
    e.default = t;
  }(ma)), ma;
}
var ba = {}, vl;
function dg() {
  return vl || (vl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "black",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "black",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        position: "relative",
        borderLeft: "10px solid #358ccb",
        boxShadow: "-1px 0 0 0 #358ccb, 0 0 0 1px #dfdfdf",
        backgroundColor: "#fdfdfd",
        backgroundImage: "linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)",
        backgroundSize: "3em 3em",
        backgroundOrigin: "content-box",
        backgroundAttachment: "local",
        margin: ".5em 0",
        padding: "0 1em"
      },
      'pre[class*="language-"] > code': {
        display: "block"
      },
      ':not(pre) > code[class*="language-"]': {
        position: "relative",
        padding: ".2em",
        borderRadius: "0.3em",
        color: "#c92c2c",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        display: "inline",
        whiteSpace: "normal",
        backgroundColor: "#fdfdfd",
        WebkitBoxSizing: "border-box",
        MozBoxSizing: "border-box",
        boxSizing: "border-box"
      },
      comment: {
        color: "#7D8B99"
      },
      "block-comment": {
        color: "#7D8B99"
      },
      prolog: {
        color: "#7D8B99"
      },
      doctype: {
        color: "#7D8B99"
      },
      cdata: {
        color: "#7D8B99"
      },
      punctuation: {
        color: "#5F6364"
      },
      property: {
        color: "#c92c2c"
      },
      tag: {
        color: "#c92c2c"
      },
      boolean: {
        color: "#c92c2c"
      },
      number: {
        color: "#c92c2c"
      },
      "function-name": {
        color: "#c92c2c"
      },
      constant: {
        color: "#c92c2c"
      },
      symbol: {
        color: "#c92c2c"
      },
      deleted: {
        color: "#c92c2c"
      },
      selector: {
        color: "#2f9c0a"
      },
      "attr-name": {
        color: "#2f9c0a"
      },
      string: {
        color: "#2f9c0a"
      },
      char: {
        color: "#2f9c0a"
      },
      function: {
        color: "#2f9c0a"
      },
      builtin: {
        color: "#2f9c0a"
      },
      inserted: {
        color: "#2f9c0a"
      },
      operator: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      entity: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)",
        cursor: "help"
      },
      url: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      variable: {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      atrule: {
        color: "#1990b8"
      },
      "attr-value": {
        color: "#1990b8"
      },
      keyword: {
        color: "#1990b8"
      },
      "class-name": {
        color: "#1990b8"
      },
      regex: {
        color: "#e90"
      },
      important: {
        color: "#e90",
        fontWeight: "normal"
      },
      ".language-css .token.string": {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      ".style .token.string": {
        color: "#a67f59",
        background: "rgba(255, 255, 255, 0.5)"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      namespace: {
        Opacity: ".7"
      }
    };
    e.default = t;
  }(ba)), ba;
}
var ya = {}, xl;
function fg() {
  return xl || (xl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#a9b7c6",
        fontFamily: "Consolas, Monaco, 'Andale Mono', monospace",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#a9b7c6",
        fontFamily: "Consolas, Monaco, 'Andale Mono', monospace",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        background: "#2b2b2b"
      },
      'pre[class*="language-"]::-moz-selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      'pre[class*="language-"] ::-moz-selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      'code[class*="language-"]::-moz-selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      'code[class*="language-"] ::-moz-selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      'pre[class*="language-"]::selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      'pre[class*="language-"] ::selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      'code[class*="language-"]::selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      'code[class*="language-"] ::selection': {
        color: "inherit",
        background: "rgba(33, 66, 131, .85)"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#2b2b2b",
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#808080"
      },
      prolog: {
        color: "#808080"
      },
      cdata: {
        color: "#808080"
      },
      delimiter: {
        color: "#cc7832"
      },
      boolean: {
        color: "#cc7832"
      },
      keyword: {
        color: "#cc7832"
      },
      selector: {
        color: "#cc7832"
      },
      important: {
        color: "#cc7832"
      },
      atrule: {
        color: "#cc7832"
      },
      operator: {
        color: "#a9b7c6"
      },
      punctuation: {
        color: "#a9b7c6"
      },
      "attr-name": {
        color: "#a9b7c6"
      },
      tag: {
        color: "#e8bf6a"
      },
      "tag.punctuation": {
        color: "#e8bf6a"
      },
      doctype: {
        color: "#e8bf6a"
      },
      builtin: {
        color: "#e8bf6a"
      },
      entity: {
        color: "#6897bb"
      },
      number: {
        color: "#6897bb"
      },
      symbol: {
        color: "#6897bb"
      },
      property: {
        color: "#9876aa"
      },
      constant: {
        color: "#9876aa"
      },
      variable: {
        color: "#9876aa"
      },
      string: {
        color: "#6a8759"
      },
      char: {
        color: "#6a8759"
      },
      "attr-value": {
        color: "#a5c261"
      },
      "attr-value.punctuation": {
        color: "#a5c261"
      },
      "attr-value.punctuation:first-child": {
        color: "#a9b7c6"
      },
      url: {
        color: "#287bde",
        textDecoration: "underline"
      },
      function: {
        color: "#ffc66d"
      },
      regex: {
        background: "#364135"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      inserted: {
        background: "#294436"
      },
      deleted: {
        background: "#484a4a"
      },
      "code.language-css .token.property": {
        color: "#a9b7c6"
      },
      "code.language-css .token.property + .token.punctuation": {
        color: "#a9b7c6"
      },
      "code.language-css .token.id": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.class": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.attribute": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.pseudo-class": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.pseudo-element": {
        color: "#ffc66d"
      }
    };
    e.default = t;
  }(ya)), ya;
}
var va = {}, wl;
function gg() {
  return wl || (wl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#f8f8f2",
        background: "none",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#f8f8f2",
        background: "#282a36",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#282a36",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#6272a4"
      },
      prolog: {
        color: "#6272a4"
      },
      doctype: {
        color: "#6272a4"
      },
      cdata: {
        color: "#6272a4"
      },
      punctuation: {
        color: "#f8f8f2"
      },
      ".namespace": {
        Opacity: ".7"
      },
      property: {
        color: "#ff79c6"
      },
      tag: {
        color: "#ff79c6"
      },
      constant: {
        color: "#ff79c6"
      },
      symbol: {
        color: "#ff79c6"
      },
      deleted: {
        color: "#ff79c6"
      },
      boolean: {
        color: "#bd93f9"
      },
      number: {
        color: "#bd93f9"
      },
      selector: {
        color: "#50fa7b"
      },
      "attr-name": {
        color: "#50fa7b"
      },
      string: {
        color: "#50fa7b"
      },
      char: {
        color: "#50fa7b"
      },
      builtin: {
        color: "#50fa7b"
      },
      inserted: {
        color: "#50fa7b"
      },
      operator: {
        color: "#f8f8f2"
      },
      entity: {
        color: "#f8f8f2",
        cursor: "help"
      },
      url: {
        color: "#f8f8f2"
      },
      ".language-css .token.string": {
        color: "#f8f8f2"
      },
      ".style .token.string": {
        color: "#f8f8f2"
      },
      variable: {
        color: "#f8f8f2"
      },
      atrule: {
        color: "#f1fa8c"
      },
      "attr-value": {
        color: "#f1fa8c"
      },
      function: {
        color: "#f1fa8c"
      },
      "class-name": {
        color: "#f1fa8c"
      },
      keyword: {
        color: "#8be9fd"
      },
      regex: {
        color: "#ffb86c"
      },
      important: {
        color: "#ffb86c",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(va)), va;
}
var xa = {}, Sl;
function pg() {
  return Sl || (Sl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#2a2734",
        color: "#9a86fd"
      },
      'pre[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#2a2734",
        color: "#9a86fd",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#6a51e6"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#6c6783"
      },
      prolog: {
        color: "#6c6783"
      },
      doctype: {
        color: "#6c6783"
      },
      cdata: {
        color: "#6c6783"
      },
      punctuation: {
        color: "#6c6783"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "#e09142"
      },
      operator: {
        color: "#e09142"
      },
      number: {
        color: "#e09142"
      },
      property: {
        color: "#9a86fd"
      },
      function: {
        color: "#9a86fd"
      },
      "tag-id": {
        color: "#eeebff"
      },
      selector: {
        color: "#eeebff"
      },
      "atrule-id": {
        color: "#eeebff"
      },
      "code.language-javascript": {
        color: "#c4b9fe"
      },
      "attr-name": {
        color: "#c4b9fe"
      },
      "code.language-css": {
        color: "#ffcc99"
      },
      "code.language-scss": {
        color: "#ffcc99"
      },
      boolean: {
        color: "#ffcc99"
      },
      string: {
        color: "#ffcc99"
      },
      entity: {
        color: "#ffcc99",
        cursor: "help"
      },
      url: {
        color: "#ffcc99"
      },
      ".language-css .token.string": {
        color: "#ffcc99"
      },
      ".language-scss .token.string": {
        color: "#ffcc99"
      },
      ".style .token.string": {
        color: "#ffcc99"
      },
      "attr-value": {
        color: "#ffcc99"
      },
      keyword: {
        color: "#ffcc99"
      },
      control: {
        color: "#ffcc99"
      },
      directive: {
        color: "#ffcc99"
      },
      unit: {
        color: "#ffcc99"
      },
      statement: {
        color: "#ffcc99"
      },
      regex: {
        color: "#ffcc99"
      },
      atrule: {
        color: "#ffcc99"
      },
      placeholder: {
        color: "#ffcc99"
      },
      variable: {
        color: "#ffcc99"
      },
      deleted: {
        textDecoration: "line-through"
      },
      inserted: {
        borderBottom: "1px dotted #eeebff",
        textDecoration: "none"
      },
      italic: {
        fontStyle: "italic"
      },
      important: {
        fontWeight: "bold",
        color: "#c4b9fe"
      },
      bold: {
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: ".4em solid #8a75f5",
        OutlineOffset: ".4em"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#2c2937"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#3c3949"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(224, 145, 66, 0.2) 70%, rgba(224, 145, 66, 0))"
      }
    };
    e.default = t;
  }(xa)), xa;
}
var wa = {}, Cl;
function hg() {
  return Cl || (Cl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#322d29",
        color: "#88786d"
      },
      'pre[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#322d29",
        color: "#88786d",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#6f5849"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#6a5f58"
      },
      prolog: {
        color: "#6a5f58"
      },
      doctype: {
        color: "#6a5f58"
      },
      cdata: {
        color: "#6a5f58"
      },
      punctuation: {
        color: "#6a5f58"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "#bfa05a"
      },
      operator: {
        color: "#bfa05a"
      },
      number: {
        color: "#bfa05a"
      },
      property: {
        color: "#88786d"
      },
      function: {
        color: "#88786d"
      },
      "tag-id": {
        color: "#fff3eb"
      },
      selector: {
        color: "#fff3eb"
      },
      "atrule-id": {
        color: "#fff3eb"
      },
      "code.language-javascript": {
        color: "#a48774"
      },
      "attr-name": {
        color: "#a48774"
      },
      "code.language-css": {
        color: "#fcc440"
      },
      "code.language-scss": {
        color: "#fcc440"
      },
      boolean: {
        color: "#fcc440"
      },
      string: {
        color: "#fcc440"
      },
      entity: {
        color: "#fcc440",
        cursor: "help"
      },
      url: {
        color: "#fcc440"
      },
      ".language-css .token.string": {
        color: "#fcc440"
      },
      ".language-scss .token.string": {
        color: "#fcc440"
      },
      ".style .token.string": {
        color: "#fcc440"
      },
      "attr-value": {
        color: "#fcc440"
      },
      keyword: {
        color: "#fcc440"
      },
      control: {
        color: "#fcc440"
      },
      directive: {
        color: "#fcc440"
      },
      unit: {
        color: "#fcc440"
      },
      statement: {
        color: "#fcc440"
      },
      regex: {
        color: "#fcc440"
      },
      atrule: {
        color: "#fcc440"
      },
      placeholder: {
        color: "#fcc440"
      },
      variable: {
        color: "#fcc440"
      },
      deleted: {
        textDecoration: "line-through"
      },
      inserted: {
        borderBottom: "1px dotted #fff3eb",
        textDecoration: "none"
      },
      italic: {
        fontStyle: "italic"
      },
      important: {
        fontWeight: "bold",
        color: "#a48774"
      },
      bold: {
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: ".4em solid #816d5f",
        OutlineOffset: ".4em"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#35302b"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#46403d"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(191, 160, 90, 0.2) 70%, rgba(191, 160, 90, 0))"
      }
    };
    e.default = t;
  }(wa)), wa;
}
var Sa = {}, El;
function mg() {
  return El || (El = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#2a2d2a",
        color: "#687d68"
      },
      'pre[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#2a2d2a",
        color: "#687d68",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#435643"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#435643"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#435643"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#435643"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#435643"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#435643"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#435643"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#435643"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#535f53"
      },
      prolog: {
        color: "#535f53"
      },
      doctype: {
        color: "#535f53"
      },
      cdata: {
        color: "#535f53"
      },
      punctuation: {
        color: "#535f53"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "#a2b34d"
      },
      operator: {
        color: "#a2b34d"
      },
      number: {
        color: "#a2b34d"
      },
      property: {
        color: "#687d68"
      },
      function: {
        color: "#687d68"
      },
      "tag-id": {
        color: "#f0fff0"
      },
      selector: {
        color: "#f0fff0"
      },
      "atrule-id": {
        color: "#f0fff0"
      },
      "code.language-javascript": {
        color: "#b3d6b3"
      },
      "attr-name": {
        color: "#b3d6b3"
      },
      "code.language-css": {
        color: "#e5fb79"
      },
      "code.language-scss": {
        color: "#e5fb79"
      },
      boolean: {
        color: "#e5fb79"
      },
      string: {
        color: "#e5fb79"
      },
      entity: {
        color: "#e5fb79",
        cursor: "help"
      },
      url: {
        color: "#e5fb79"
      },
      ".language-css .token.string": {
        color: "#e5fb79"
      },
      ".language-scss .token.string": {
        color: "#e5fb79"
      },
      ".style .token.string": {
        color: "#e5fb79"
      },
      "attr-value": {
        color: "#e5fb79"
      },
      keyword: {
        color: "#e5fb79"
      },
      control: {
        color: "#e5fb79"
      },
      directive: {
        color: "#e5fb79"
      },
      unit: {
        color: "#e5fb79"
      },
      statement: {
        color: "#e5fb79"
      },
      regex: {
        color: "#e5fb79"
      },
      atrule: {
        color: "#e5fb79"
      },
      placeholder: {
        color: "#e5fb79"
      },
      variable: {
        color: "#e5fb79"
      },
      deleted: {
        textDecoration: "line-through"
      },
      inserted: {
        borderBottom: "1px dotted #f0fff0",
        textDecoration: "none"
      },
      italic: {
        fontStyle: "italic"
      },
      important: {
        fontWeight: "bold",
        color: "#b3d6b3"
      },
      bold: {
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: ".4em solid #5c705c",
        OutlineOffset: ".4em"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#2c302c"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#3b423b"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(162, 179, 77, 0.2) 70%, rgba(162, 179, 77, 0))"
      }
    };
    e.default = t;
  }(Sa)), Sa;
}
var Ca = {}, _l;
function bg() {
  return _l || (_l = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#faf8f5",
        color: "#728fcb"
      },
      'pre[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#faf8f5",
        color: "#728fcb",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#faf8f5"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#b6ad9a"
      },
      prolog: {
        color: "#b6ad9a"
      },
      doctype: {
        color: "#b6ad9a"
      },
      cdata: {
        color: "#b6ad9a"
      },
      punctuation: {
        color: "#b6ad9a"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "#063289"
      },
      operator: {
        color: "#063289"
      },
      number: {
        color: "#063289"
      },
      property: {
        color: "#b29762"
      },
      function: {
        color: "#b29762"
      },
      "tag-id": {
        color: "#2d2006"
      },
      selector: {
        color: "#2d2006"
      },
      "atrule-id": {
        color: "#2d2006"
      },
      "code.language-javascript": {
        color: "#896724"
      },
      "attr-name": {
        color: "#896724"
      },
      "code.language-css": {
        color: "#728fcb"
      },
      "code.language-scss": {
        color: "#728fcb"
      },
      boolean: {
        color: "#728fcb"
      },
      string: {
        color: "#728fcb"
      },
      entity: {
        color: "#728fcb",
        cursor: "help"
      },
      url: {
        color: "#728fcb"
      },
      ".language-css .token.string": {
        color: "#728fcb"
      },
      ".language-scss .token.string": {
        color: "#728fcb"
      },
      ".style .token.string": {
        color: "#728fcb"
      },
      "attr-value": {
        color: "#728fcb"
      },
      keyword: {
        color: "#728fcb"
      },
      control: {
        color: "#728fcb"
      },
      directive: {
        color: "#728fcb"
      },
      unit: {
        color: "#728fcb"
      },
      statement: {
        color: "#728fcb"
      },
      regex: {
        color: "#728fcb"
      },
      atrule: {
        color: "#728fcb"
      },
      placeholder: {
        color: "#93abdc"
      },
      variable: {
        color: "#93abdc"
      },
      deleted: {
        textDecoration: "line-through"
      },
      inserted: {
        borderBottom: "1px dotted #2d2006",
        textDecoration: "none"
      },
      italic: {
        fontStyle: "italic"
      },
      important: {
        fontWeight: "bold",
        color: "#896724"
      },
      bold: {
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: ".4em solid #896724",
        OutlineOffset: ".4em"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#ece8de"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#cdc4b1"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(45, 32, 6, 0.2) 70%, rgba(45, 32, 6, 0))"
      }
    };
    e.default = t;
  }(Ca)), Ca;
}
var Ea = {}, kl;
function yg() {
  return kl || (kl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#1d262f",
        color: "#57718e"
      },
      'pre[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#1d262f",
        color: "#57718e",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#004a9e"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#4a5f78"
      },
      prolog: {
        color: "#4a5f78"
      },
      doctype: {
        color: "#4a5f78"
      },
      cdata: {
        color: "#4a5f78"
      },
      punctuation: {
        color: "#4a5f78"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "#0aa370"
      },
      operator: {
        color: "#0aa370"
      },
      number: {
        color: "#0aa370"
      },
      property: {
        color: "#57718e"
      },
      function: {
        color: "#57718e"
      },
      "tag-id": {
        color: "#ebf4ff"
      },
      selector: {
        color: "#ebf4ff"
      },
      "atrule-id": {
        color: "#ebf4ff"
      },
      "code.language-javascript": {
        color: "#7eb6f6"
      },
      "attr-name": {
        color: "#7eb6f6"
      },
      "code.language-css": {
        color: "#47ebb4"
      },
      "code.language-scss": {
        color: "#47ebb4"
      },
      boolean: {
        color: "#47ebb4"
      },
      string: {
        color: "#47ebb4"
      },
      entity: {
        color: "#47ebb4",
        cursor: "help"
      },
      url: {
        color: "#47ebb4"
      },
      ".language-css .token.string": {
        color: "#47ebb4"
      },
      ".language-scss .token.string": {
        color: "#47ebb4"
      },
      ".style .token.string": {
        color: "#47ebb4"
      },
      "attr-value": {
        color: "#47ebb4"
      },
      keyword: {
        color: "#47ebb4"
      },
      control: {
        color: "#47ebb4"
      },
      directive: {
        color: "#47ebb4"
      },
      unit: {
        color: "#47ebb4"
      },
      statement: {
        color: "#47ebb4"
      },
      regex: {
        color: "#47ebb4"
      },
      atrule: {
        color: "#47ebb4"
      },
      placeholder: {
        color: "#47ebb4"
      },
      variable: {
        color: "#47ebb4"
      },
      deleted: {
        textDecoration: "line-through"
      },
      inserted: {
        borderBottom: "1px dotted #ebf4ff",
        textDecoration: "none"
      },
      italic: {
        fontStyle: "italic"
      },
      important: {
        fontWeight: "bold",
        color: "#7eb6f6"
      },
      bold: {
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: ".4em solid #34659d",
        OutlineOffset: ".4em"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#1f2932"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#2c3847"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(10, 163, 112, 0.2) 70%, rgba(10, 163, 112, 0))"
      }
    };
    e.default = t;
  }(Ea)), Ea;
}
var _a = {}, Al;
function vg() {
  return Al || (Al = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#24242e",
        color: "#767693"
      },
      'pre[class*="language-"]': {
        fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
        fontSize: "14px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        background: "#24242e",
        color: "#767693",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "#5151e6"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#5b5b76"
      },
      prolog: {
        color: "#5b5b76"
      },
      doctype: {
        color: "#5b5b76"
      },
      cdata: {
        color: "#5b5b76"
      },
      punctuation: {
        color: "#5b5b76"
      },
      namespace: {
        Opacity: ".7"
      },
      tag: {
        color: "#dd672c"
      },
      operator: {
        color: "#dd672c"
      },
      number: {
        color: "#dd672c"
      },
      property: {
        color: "#767693"
      },
      function: {
        color: "#767693"
      },
      "tag-id": {
        color: "#ebebff"
      },
      selector: {
        color: "#ebebff"
      },
      "atrule-id": {
        color: "#ebebff"
      },
      "code.language-javascript": {
        color: "#aaaaca"
      },
      "attr-name": {
        color: "#aaaaca"
      },
      "code.language-css": {
        color: "#fe8c52"
      },
      "code.language-scss": {
        color: "#fe8c52"
      },
      boolean: {
        color: "#fe8c52"
      },
      string: {
        color: "#fe8c52"
      },
      entity: {
        color: "#fe8c52",
        cursor: "help"
      },
      url: {
        color: "#fe8c52"
      },
      ".language-css .token.string": {
        color: "#fe8c52"
      },
      ".language-scss .token.string": {
        color: "#fe8c52"
      },
      ".style .token.string": {
        color: "#fe8c52"
      },
      "attr-value": {
        color: "#fe8c52"
      },
      keyword: {
        color: "#fe8c52"
      },
      control: {
        color: "#fe8c52"
      },
      directive: {
        color: "#fe8c52"
      },
      unit: {
        color: "#fe8c52"
      },
      statement: {
        color: "#fe8c52"
      },
      regex: {
        color: "#fe8c52"
      },
      atrule: {
        color: "#fe8c52"
      },
      placeholder: {
        color: "#fe8c52"
      },
      variable: {
        color: "#fe8c52"
      },
      deleted: {
        textDecoration: "line-through"
      },
      inserted: {
        borderBottom: "1px dotted #ebebff",
        textDecoration: "none"
      },
      italic: {
        fontStyle: "italic"
      },
      important: {
        fontWeight: "bold",
        color: "#aaaaca"
      },
      bold: {
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: ".4em solid #7676f4",
        OutlineOffset: ".4em"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#262631"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#393949"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(221, 103, 44, 0.2) 70%, rgba(221, 103, 44, 0))"
      }
    };
    e.default = t;
  }(_a)), _a;
}
var ka = {}, Ml;
function xg() {
  return Ml || (Ml = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#393A34",
        fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        fontSize: ".9em",
        lineHeight: "1.2em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#393A34",
        fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        fontSize: ".9em",
        lineHeight: "1.2em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        border: "1px solid #dddddd",
        backgroundColor: "white"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#b3d4fc"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#b3d4fc"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#b3d4fc"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#b3d4fc"
      },
      'pre[class*="language-"]::selection': {
        background: "#b3d4fc"
      },
      'pre[class*="language-"] ::selection': {
        background: "#b3d4fc"
      },
      'code[class*="language-"]::selection': {
        background: "#b3d4fc"
      },
      'code[class*="language-"] ::selection': {
        background: "#b3d4fc"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".2em",
        paddingTop: "1px",
        paddingBottom: "1px",
        background: "#f8f8f8",
        border: "1px solid #dddddd"
      },
      comment: {
        color: "#999988",
        fontStyle: "italic"
      },
      prolog: {
        color: "#999988",
        fontStyle: "italic"
      },
      doctype: {
        color: "#999988",
        fontStyle: "italic"
      },
      cdata: {
        color: "#999988",
        fontStyle: "italic"
      },
      namespace: {
        Opacity: ".7"
      },
      string: {
        color: "#e3116c"
      },
      "attr-value": {
        color: "#e3116c"
      },
      punctuation: {
        color: "#393A34"
      },
      operator: {
        color: "#393A34"
      },
      entity: {
        color: "#36acaa"
      },
      url: {
        color: "#36acaa"
      },
      symbol: {
        color: "#36acaa"
      },
      number: {
        color: "#36acaa"
      },
      boolean: {
        color: "#36acaa"
      },
      variable: {
        color: "#36acaa"
      },
      constant: {
        color: "#36acaa"
      },
      property: {
        color: "#36acaa"
      },
      regex: {
        color: "#36acaa"
      },
      inserted: {
        color: "#36acaa"
      },
      atrule: {
        color: "#00a4db"
      },
      keyword: {
        color: "#00a4db"
      },
      "attr-name": {
        color: "#00a4db"
      },
      ".language-autohotkey .token.selector": {
        color: "#00a4db"
      },
      function: {
        color: "#9a050f",
        fontWeight: "bold"
      },
      deleted: {
        color: "#9a050f"
      },
      ".language-autohotkey .token.tag": {
        color: "#9a050f"
      },
      tag: {
        color: "#00009f"
      },
      selector: {
        color: "#00009f"
      },
      ".language-autohotkey .token.keyword": {
        color: "#00009f"
      },
      important: {
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(ka)), ka;
}
var Aa = {}, Tl;
function wg() {
  return Tl || (Tl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#ebdbb2",
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#ebdbb2",
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto",
        background: "#1d2021"
      },
      'pre[class*="language-"]::-moz-selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      'pre[class*="language-"] ::-moz-selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      'code[class*="language-"]::-moz-selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      'code[class*="language-"] ::-moz-selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      'pre[class*="language-"]::selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      'pre[class*="language-"] ::selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      'code[class*="language-"]::selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      'code[class*="language-"] ::selection': {
        color: "#fbf1c7",
        background: "#7c6f64"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#1d2021",
        padding: "0.1em",
        borderRadius: "0.3em"
      },
      comment: {
        color: "#a89984"
      },
      prolog: {
        color: "#a89984"
      },
      cdata: {
        color: "#a89984"
      },
      delimiter: {
        color: "#fb4934"
      },
      boolean: {
        color: "#fb4934"
      },
      keyword: {
        color: "#fb4934"
      },
      selector: {
        color: "#fb4934"
      },
      important: {
        color: "#fb4934"
      },
      atrule: {
        color: "#fb4934"
      },
      operator: {
        color: "#a89984"
      },
      punctuation: {
        color: "#a89984"
      },
      "attr-name": {
        color: "#a89984"
      },
      tag: {
        color: "#fabd2f"
      },
      "tag.punctuation": {
        color: "#fabd2f"
      },
      doctype: {
        color: "#fabd2f"
      },
      builtin: {
        color: "#fabd2f"
      },
      entity: {
        color: "#d3869b"
      },
      number: {
        color: "#d3869b"
      },
      symbol: {
        color: "#d3869b"
      },
      property: {
        color: "#fb4934"
      },
      constant: {
        color: "#fb4934"
      },
      variable: {
        color: "#fb4934"
      },
      string: {
        color: "#b8bb26"
      },
      char: {
        color: "#b8bb26"
      },
      "attr-value": {
        color: "#a89984"
      },
      "attr-value.punctuation": {
        color: "#a89984"
      },
      url: {
        color: "#b8bb26",
        textDecoration: "underline"
      },
      function: {
        color: "#fabd2f"
      },
      regex: {
        background: "#b8bb26"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      inserted: {
        background: "#a89984"
      },
      deleted: {
        background: "#fb4934"
      }
    };
    e.default = t;
  }(Aa)), Aa;
}
var Ma = {}, Ol;
function Sg() {
  return Ol || (Ol = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#3c3836",
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#3c3836",
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto",
        background: "#f9f5d7"
      },
      'pre[class*="language-"]::-moz-selection': {
        color: "#282828",
        background: "#a89984"
      },
      'pre[class*="language-"] ::-moz-selection': {
        color: "#282828",
        background: "#a89984"
      },
      'code[class*="language-"]::-moz-selection': {
        color: "#282828",
        background: "#a89984"
      },
      'code[class*="language-"] ::-moz-selection': {
        color: "#282828",
        background: "#a89984"
      },
      'pre[class*="language-"]::selection': {
        color: "#282828",
        background: "#a89984"
      },
      'pre[class*="language-"] ::selection': {
        color: "#282828",
        background: "#a89984"
      },
      'code[class*="language-"]::selection': {
        color: "#282828",
        background: "#a89984"
      },
      'code[class*="language-"] ::selection': {
        color: "#282828",
        background: "#a89984"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#f9f5d7",
        padding: "0.1em",
        borderRadius: "0.3em"
      },
      comment: {
        color: "#7c6f64"
      },
      prolog: {
        color: "#7c6f64"
      },
      cdata: {
        color: "#7c6f64"
      },
      delimiter: {
        color: "#9d0006"
      },
      boolean: {
        color: "#9d0006"
      },
      keyword: {
        color: "#9d0006"
      },
      selector: {
        color: "#9d0006"
      },
      important: {
        color: "#9d0006"
      },
      atrule: {
        color: "#9d0006"
      },
      operator: {
        color: "#7c6f64"
      },
      punctuation: {
        color: "#7c6f64"
      },
      "attr-name": {
        color: "#7c6f64"
      },
      tag: {
        color: "#b57614"
      },
      "tag.punctuation": {
        color: "#b57614"
      },
      doctype: {
        color: "#b57614"
      },
      builtin: {
        color: "#b57614"
      },
      entity: {
        color: "#8f3f71"
      },
      number: {
        color: "#8f3f71"
      },
      symbol: {
        color: "#8f3f71"
      },
      property: {
        color: "#9d0006"
      },
      constant: {
        color: "#9d0006"
      },
      variable: {
        color: "#9d0006"
      },
      string: {
        color: "#797403"
      },
      char: {
        color: "#797403"
      },
      "attr-value": {
        color: "#7c6f64"
      },
      "attr-value.punctuation": {
        color: "#7c6f64"
      },
      url: {
        color: "#797403",
        textDecoration: "underline"
      },
      function: {
        color: "#b57614"
      },
      regex: {
        background: "#797403"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      inserted: {
        background: "#7c6f64"
      },
      deleted: {
        background: "#9d0006"
      }
    };
    e.default = t;
  }(Ma)), Ma;
}
var Ta = {}, Nl;
function Cg() {
  return Nl || (Nl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      "code[class*='language-']": {
        color: "#d6e7ff",
        background: "#030314",
        textShadow: "none",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: "1em",
        lineHeight: "1.5",
        letterSpacing: ".2px",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        textAlign: "left",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      "pre[class*='language-']": {
        color: "#d6e7ff",
        background: "#030314",
        textShadow: "none",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: "1em",
        lineHeight: "1.5",
        letterSpacing: ".2px",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        textAlign: "left",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        border: "1px solid #2a4555",
        borderRadius: "5px",
        padding: "1.5em 1em",
        margin: "1em 0",
        overflow: "auto"
      },
      "pre[class*='language-']::-moz-selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      "pre[class*='language-'] ::-moz-selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      "code[class*='language-']::-moz-selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      "code[class*='language-'] ::-moz-selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      "pre[class*='language-']::selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      "pre[class*='language-'] ::selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      "code[class*='language-']::selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      "code[class*='language-'] ::selection": {
        color: "inherit",
        background: "#1d3b54",
        textShadow: "none"
      },
      ":not(pre) > code[class*='language-']": {
        color: "#f0f6f6",
        background: "#2a4555",
        padding: "0.2em 0.3em",
        borderRadius: "0.2em",
        boxDecorationBreak: "clone"
      },
      comment: {
        color: "#446e69"
      },
      prolog: {
        color: "#446e69"
      },
      doctype: {
        color: "#446e69"
      },
      cdata: {
        color: "#446e69"
      },
      punctuation: {
        color: "#d6b007"
      },
      property: {
        color: "#d6e7ff"
      },
      tag: {
        color: "#d6e7ff"
      },
      boolean: {
        color: "#d6e7ff"
      },
      number: {
        color: "#d6e7ff"
      },
      constant: {
        color: "#d6e7ff"
      },
      symbol: {
        color: "#d6e7ff"
      },
      deleted: {
        color: "#d6e7ff"
      },
      selector: {
        color: "#e60067"
      },
      "attr-name": {
        color: "#e60067"
      },
      builtin: {
        color: "#e60067"
      },
      inserted: {
        color: "#e60067"
      },
      string: {
        color: "#49c6ec"
      },
      char: {
        color: "#49c6ec"
      },
      operator: {
        color: "#ec8e01",
        background: "transparent"
      },
      entity: {
        color: "#ec8e01",
        background: "transparent"
      },
      url: {
        color: "#ec8e01",
        background: "transparent"
      },
      ".language-css .token.string": {
        color: "#ec8e01",
        background: "transparent"
      },
      ".style .token.string": {
        color: "#ec8e01",
        background: "transparent"
      },
      atrule: {
        color: "#0fe468"
      },
      "attr-value": {
        color: "#0fe468"
      },
      keyword: {
        color: "#0fe468"
      },
      function: {
        color: "#78f3e9"
      },
      "class-name": {
        color: "#78f3e9"
      },
      regex: {
        color: "#d6e7ff"
      },
      important: {
        color: "#d6e7ff"
      },
      variable: {
        color: "#d6e7ff"
      }
    };
    e.default = t;
  }(Ta)), Ta;
}
var Oa = {}, Dl;
function Eg() {
  return Dl || (Dl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        fontFamily: '"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',
        fontSize: "16px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        wordSpacing: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        wordWrap: "break-word",
        background: "#322931",
        color: "#b9b5b8"
      },
      'pre[class*="language-"]': {
        fontFamily: '"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',
        fontSize: "16px",
        lineHeight: "1.375",
        direction: "ltr",
        textAlign: "left",
        wordSpacing: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        wordWrap: "break-word",
        background: "#322931",
        color: "#b9b5b8",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#797379"
      },
      prolog: {
        color: "#797379"
      },
      doctype: {
        color: "#797379"
      },
      cdata: {
        color: "#797379"
      },
      punctuation: {
        color: "#b9b5b8"
      },
      ".namespace": {
        Opacity: ".7"
      },
      null: {
        color: "#fd8b19"
      },
      operator: {
        color: "#fd8b19"
      },
      boolean: {
        color: "#fd8b19"
      },
      number: {
        color: "#fd8b19"
      },
      property: {
        color: "#fdcc59"
      },
      tag: {
        color: "#1290bf"
      },
      string: {
        color: "#149b93"
      },
      selector: {
        color: "#c85e7c"
      },
      "attr-name": {
        color: "#fd8b19"
      },
      entity: {
        color: "#149b93",
        cursor: "help"
      },
      url: {
        color: "#149b93"
      },
      ".language-css .token.string": {
        color: "#149b93"
      },
      ".style .token.string": {
        color: "#149b93"
      },
      "attr-value": {
        color: "#8fc13e"
      },
      keyword: {
        color: "#8fc13e"
      },
      control: {
        color: "#8fc13e"
      },
      directive: {
        color: "#8fc13e"
      },
      unit: {
        color: "#8fc13e"
      },
      statement: {
        color: "#149b93"
      },
      regex: {
        color: "#149b93"
      },
      atrule: {
        color: "#149b93"
      },
      placeholder: {
        color: "#1290bf"
      },
      variable: {
        color: "#1290bf"
      },
      important: {
        color: "#dd464c",
        fontWeight: "bold"
      },
      "pre > code.highlight": {
        Outline: ".4em solid red",
        OutlineOffset: ".4em"
      }
    };
    e.default = t;
  }(Oa)), Oa;
}
var Na = {}, Rl;
function _g() {
  return Rl || (Rl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#f8f8f2",
        background: "none",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#f8f8f2",
        background: "#263E52",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#263E52",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#5c98cd"
      },
      prolog: {
        color: "#5c98cd"
      },
      doctype: {
        color: "#5c98cd"
      },
      cdata: {
        color: "#5c98cd"
      },
      punctuation: {
        color: "#f8f8f2"
      },
      ".namespace": {
        Opacity: ".7"
      },
      property: {
        color: "#F05E5D"
      },
      tag: {
        color: "#F05E5D"
      },
      constant: {
        color: "#F05E5D"
      },
      symbol: {
        color: "#F05E5D"
      },
      deleted: {
        color: "#F05E5D"
      },
      boolean: {
        color: "#BC94F9"
      },
      number: {
        color: "#BC94F9"
      },
      selector: {
        color: "#FCFCD6"
      },
      "attr-name": {
        color: "#FCFCD6"
      },
      string: {
        color: "#FCFCD6"
      },
      char: {
        color: "#FCFCD6"
      },
      builtin: {
        color: "#FCFCD6"
      },
      inserted: {
        color: "#FCFCD6"
      },
      operator: {
        color: "#f8f8f2"
      },
      entity: {
        color: "#f8f8f2",
        cursor: "help"
      },
      url: {
        color: "#f8f8f2"
      },
      ".language-css .token.string": {
        color: "#f8f8f2"
      },
      ".style .token.string": {
        color: "#f8f8f2"
      },
      variable: {
        color: "#f8f8f2"
      },
      atrule: {
        color: "#66D8EF"
      },
      "attr-value": {
        color: "#66D8EF"
      },
      function: {
        color: "#66D8EF"
      },
      "class-name": {
        color: "#66D8EF"
      },
      keyword: {
        color: "#6EB26E"
      },
      regex: {
        color: "#F05E5D"
      },
      important: {
        color: "#F05E5D",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(Na)), Na;
}
var Da = {}, zl;
function kg() {
  return zl || (zl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        color: "#eee",
        background: "#2f2f2f",
        fontFamily: "Roboto Mono, monospace",
        fontSize: "1em",
        lineHeight: "1.5em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        color: "#eee",
        background: "#2f2f2f",
        fontFamily: "Roboto Mono, monospace",
        fontSize: "1em",
        lineHeight: "1.5em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        overflow: "auto",
        position: "relative",
        margin: "0.5em 0",
        padding: "1.25em 1em"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#363636"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#363636"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#363636"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#363636"
      },
      'code[class*="language-"]::selection': {
        background: "#363636"
      },
      'pre[class*="language-"]::selection': {
        background: "#363636"
      },
      'code[class*="language-"] ::selection': {
        background: "#363636"
      },
      'pre[class*="language-"] ::selection': {
        background: "#363636"
      },
      ':not(pre) > code[class*="language-"]': {
        whiteSpace: "normal",
        borderRadius: "0.2em",
        padding: "0.1em"
      },
      ".language-css > code": {
        color: "#fd9170"
      },
      ".language-sass > code": {
        color: "#fd9170"
      },
      ".language-scss > code": {
        color: "#fd9170"
      },
      '[class*="language-"] .namespace': {
        Opacity: "0.7"
      },
      atrule: {
        color: "#c792ea"
      },
      "attr-name": {
        color: "#ffcb6b"
      },
      "attr-value": {
        color: "#a5e844"
      },
      attribute: {
        color: "#a5e844"
      },
      boolean: {
        color: "#c792ea"
      },
      builtin: {
        color: "#ffcb6b"
      },
      cdata: {
        color: "#80cbc4"
      },
      char: {
        color: "#80cbc4"
      },
      class: {
        color: "#ffcb6b"
      },
      "class-name": {
        color: "#f2ff00"
      },
      comment: {
        color: "#616161"
      },
      constant: {
        color: "#c792ea"
      },
      deleted: {
        color: "#ff6666"
      },
      doctype: {
        color: "#616161"
      },
      entity: {
        color: "#ff6666"
      },
      function: {
        color: "#c792ea"
      },
      hexcode: {
        color: "#f2ff00"
      },
      id: {
        color: "#c792ea",
        fontWeight: "bold"
      },
      important: {
        color: "#c792ea",
        fontWeight: "bold"
      },
      inserted: {
        color: "#80cbc4"
      },
      keyword: {
        color: "#c792ea"
      },
      number: {
        color: "#fd9170"
      },
      operator: {
        color: "#89ddff"
      },
      prolog: {
        color: "#616161"
      },
      property: {
        color: "#80cbc4"
      },
      "pseudo-class": {
        color: "#a5e844"
      },
      "pseudo-element": {
        color: "#a5e844"
      },
      punctuation: {
        color: "#89ddff"
      },
      regex: {
        color: "#f2ff00"
      },
      selector: {
        color: "#ff6666"
      },
      string: {
        color: "#a5e844"
      },
      symbol: {
        color: "#c792ea"
      },
      tag: {
        color: "#ff6666"
      },
      unit: {
        color: "#fd9170"
      },
      url: {
        color: "#ff6666"
      },
      variable: {
        color: "#ff6666"
      }
    };
    e.default = t;
  }(Da)), Da;
}
var Ra = {}, Il;
function Ag() {
  return Il || (Il = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        color: "#90a4ae",
        background: "#fafafa",
        fontFamily: "Roboto Mono, monospace",
        fontSize: "1em",
        lineHeight: "1.5em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        color: "#90a4ae",
        background: "#fafafa",
        fontFamily: "Roboto Mono, monospace",
        fontSize: "1em",
        lineHeight: "1.5em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        overflow: "auto",
        position: "relative",
        margin: "0.5em 0",
        padding: "1.25em 1em"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#cceae7",
        color: "#263238"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#cceae7",
        color: "#263238"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#cceae7",
        color: "#263238"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#cceae7",
        color: "#263238"
      },
      'code[class*="language-"]::selection': {
        background: "#cceae7",
        color: "#263238"
      },
      'pre[class*="language-"]::selection': {
        background: "#cceae7",
        color: "#263238"
      },
      'code[class*="language-"] ::selection': {
        background: "#cceae7",
        color: "#263238"
      },
      'pre[class*="language-"] ::selection': {
        background: "#cceae7",
        color: "#263238"
      },
      ':not(pre) > code[class*="language-"]': {
        whiteSpace: "normal",
        borderRadius: "0.2em",
        padding: "0.1em"
      },
      ".language-css > code": {
        color: "#f76d47"
      },
      ".language-sass > code": {
        color: "#f76d47"
      },
      ".language-scss > code": {
        color: "#f76d47"
      },
      '[class*="language-"] .namespace': {
        Opacity: "0.7"
      },
      atrule: {
        color: "#7c4dff"
      },
      "attr-name": {
        color: "#39adb5"
      },
      "attr-value": {
        color: "#f6a434"
      },
      attribute: {
        color: "#f6a434"
      },
      boolean: {
        color: "#7c4dff"
      },
      builtin: {
        color: "#39adb5"
      },
      cdata: {
        color: "#39adb5"
      },
      char: {
        color: "#39adb5"
      },
      class: {
        color: "#39adb5"
      },
      "class-name": {
        color: "#6182b8"
      },
      comment: {
        color: "#aabfc9"
      },
      constant: {
        color: "#7c4dff"
      },
      deleted: {
        color: "#e53935"
      },
      doctype: {
        color: "#aabfc9"
      },
      entity: {
        color: "#e53935"
      },
      function: {
        color: "#7c4dff"
      },
      hexcode: {
        color: "#f76d47"
      },
      id: {
        color: "#7c4dff",
        fontWeight: "bold"
      },
      important: {
        color: "#7c4dff",
        fontWeight: "bold"
      },
      inserted: {
        color: "#39adb5"
      },
      keyword: {
        color: "#7c4dff"
      },
      number: {
        color: "#f76d47"
      },
      operator: {
        color: "#39adb5"
      },
      prolog: {
        color: "#aabfc9"
      },
      property: {
        color: "#39adb5"
      },
      "pseudo-class": {
        color: "#f6a434"
      },
      "pseudo-element": {
        color: "#f6a434"
      },
      punctuation: {
        color: "#39adb5"
      },
      regex: {
        color: "#6182b8"
      },
      selector: {
        color: "#e53935"
      },
      string: {
        color: "#f6a434"
      },
      symbol: {
        color: "#7c4dff"
      },
      tag: {
        color: "#e53935"
      },
      unit: {
        color: "#f76d47"
      },
      url: {
        color: "#e53935"
      },
      variable: {
        color: "#e53935"
      }
    };
    e.default = t;
  }(Ra)), Ra;
}
var za = {}, Ll;
function Mg() {
  return Ll || (Ll = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        color: "#c3cee3",
        background: "#263238",
        fontFamily: "Roboto Mono, monospace",
        fontSize: "1em",
        lineHeight: "1.5em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        color: "#c3cee3",
        background: "#263238",
        fontFamily: "Roboto Mono, monospace",
        fontSize: "1em",
        lineHeight: "1.5em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        overflow: "auto",
        position: "relative",
        margin: "0.5em 0",
        padding: "1.25em 1em"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#363636"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#363636"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#363636"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#363636"
      },
      'code[class*="language-"]::selection': {
        background: "#363636"
      },
      'pre[class*="language-"]::selection': {
        background: "#363636"
      },
      'code[class*="language-"] ::selection': {
        background: "#363636"
      },
      'pre[class*="language-"] ::selection': {
        background: "#363636"
      },
      ':not(pre) > code[class*="language-"]': {
        whiteSpace: "normal",
        borderRadius: "0.2em",
        padding: "0.1em"
      },
      ".language-css > code": {
        color: "#fd9170"
      },
      ".language-sass > code": {
        color: "#fd9170"
      },
      ".language-scss > code": {
        color: "#fd9170"
      },
      '[class*="language-"] .namespace': {
        Opacity: "0.7"
      },
      atrule: {
        color: "#c792ea"
      },
      "attr-name": {
        color: "#ffcb6b"
      },
      "attr-value": {
        color: "#c3e88d"
      },
      attribute: {
        color: "#c3e88d"
      },
      boolean: {
        color: "#c792ea"
      },
      builtin: {
        color: "#ffcb6b"
      },
      cdata: {
        color: "#80cbc4"
      },
      char: {
        color: "#80cbc4"
      },
      class: {
        color: "#ffcb6b"
      },
      "class-name": {
        color: "#f2ff00"
      },
      color: {
        color: "#f2ff00"
      },
      comment: {
        color: "#546e7a"
      },
      constant: {
        color: "#c792ea"
      },
      deleted: {
        color: "#f07178"
      },
      doctype: {
        color: "#546e7a"
      },
      entity: {
        color: "#f07178"
      },
      function: {
        color: "#c792ea"
      },
      hexcode: {
        color: "#f2ff00"
      },
      id: {
        color: "#c792ea",
        fontWeight: "bold"
      },
      important: {
        color: "#c792ea",
        fontWeight: "bold"
      },
      inserted: {
        color: "#80cbc4"
      },
      keyword: {
        color: "#c792ea",
        fontStyle: "italic"
      },
      number: {
        color: "#fd9170"
      },
      operator: {
        color: "#89ddff"
      },
      prolog: {
        color: "#546e7a"
      },
      property: {
        color: "#80cbc4"
      },
      "pseudo-class": {
        color: "#c3e88d"
      },
      "pseudo-element": {
        color: "#c3e88d"
      },
      punctuation: {
        color: "#89ddff"
      },
      regex: {
        color: "#f2ff00"
      },
      selector: {
        color: "#f07178"
      },
      string: {
        color: "#c3e88d"
      },
      symbol: {
        color: "#c792ea"
      },
      tag: {
        color: "#f07178"
      },
      unit: {
        color: "#f07178"
      },
      url: {
        color: "#fd9170"
      },
      variable: {
        color: "#f07178"
      }
    };
    e.default = t;
  }(za)), za;
}
var Ia = {}, Fl;
function Tg() {
  return Fl || (Fl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#d6deeb",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        fontSize: "1em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "white",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        fontSize: "1em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto",
        background: "#011627"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      ':not(pre) > code[class*="language-"]': {
        color: "white",
        background: "#011627",
        padding: "0.1em",
        borderRadius: "0.3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      },
      prolog: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      },
      cdata: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      },
      punctuation: {
        color: "rgb(199, 146, 234)"
      },
      ".namespace": {
        color: "rgb(178, 204, 214)"
      },
      deleted: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      },
      symbol: {
        color: "rgb(128, 203, 196)"
      },
      property: {
        color: "rgb(128, 203, 196)"
      },
      tag: {
        color: "rgb(127, 219, 202)"
      },
      operator: {
        color: "rgb(127, 219, 202)"
      },
      keyword: {
        color: "rgb(127, 219, 202)"
      },
      boolean: {
        color: "rgb(255, 88, 116)"
      },
      number: {
        color: "rgb(247, 140, 108)"
      },
      constant: {
        color: "rgb(130, 170, 255)"
      },
      function: {
        color: "rgb(130, 170, 255)"
      },
      builtin: {
        color: "rgb(130, 170, 255)"
      },
      char: {
        color: "rgb(130, 170, 255)"
      },
      selector: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      },
      doctype: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      },
      "attr-name": {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      },
      inserted: {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      },
      string: {
        color: "rgb(173, 219, 103)"
      },
      url: {
        color: "rgb(173, 219, 103)"
      },
      entity: {
        color: "rgb(173, 219, 103)"
      },
      ".language-css .token.string": {
        color: "rgb(173, 219, 103)"
      },
      ".style .token.string": {
        color: "rgb(173, 219, 103)"
      },
      "class-name": {
        color: "rgb(255, 203, 139)"
      },
      atrule: {
        color: "rgb(255, 203, 139)"
      },
      "attr-value": {
        color: "rgb(255, 203, 139)"
      },
      regex: {
        color: "rgb(214, 222, 235)"
      },
      important: {
        color: "rgb(214, 222, 235)",
        fontWeight: "bold"
      },
      variable: {
        color: "rgb(214, 222, 235)"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(Ia)), Ia;
}
var La = {}, jl;
function Og() {
  return jl || (jl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#f8f8f2",
        background: "none",
        fontFamily: `"Fira Code", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#f8f8f2",
        background: "#2E3440",
        fontFamily: `"Fira Code", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#2E3440",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#636f88"
      },
      prolog: {
        color: "#636f88"
      },
      doctype: {
        color: "#636f88"
      },
      cdata: {
        color: "#636f88"
      },
      punctuation: {
        color: "#81A1C1"
      },
      ".namespace": {
        Opacity: ".7"
      },
      property: {
        color: "#81A1C1"
      },
      tag: {
        color: "#81A1C1"
      },
      constant: {
        color: "#81A1C1"
      },
      symbol: {
        color: "#81A1C1"
      },
      deleted: {
        color: "#81A1C1"
      },
      number: {
        color: "#B48EAD"
      },
      boolean: {
        color: "#81A1C1"
      },
      selector: {
        color: "#A3BE8C"
      },
      "attr-name": {
        color: "#A3BE8C"
      },
      string: {
        color: "#A3BE8C"
      },
      char: {
        color: "#A3BE8C"
      },
      builtin: {
        color: "#A3BE8C"
      },
      inserted: {
        color: "#A3BE8C"
      },
      operator: {
        color: "#81A1C1"
      },
      entity: {
        color: "#81A1C1",
        cursor: "help"
      },
      url: {
        color: "#81A1C1"
      },
      ".language-css .token.string": {
        color: "#81A1C1"
      },
      ".style .token.string": {
        color: "#81A1C1"
      },
      variable: {
        color: "#81A1C1"
      },
      atrule: {
        color: "#88C0D0"
      },
      "attr-value": {
        color: "#88C0D0"
      },
      function: {
        color: "#88C0D0"
      },
      "class-name": {
        color: "#88C0D0"
      },
      keyword: {
        color: "#81A1C1"
      },
      regex: {
        color: "#EBCB8B"
      },
      important: {
        color: "#EBCB8B",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(La)), La;
}
var Fa = {}, Pl;
function Ng() {
  return Pl || (Pl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        background: "hsl(220, 13%, 18%)",
        color: "hsl(220, 14%, 71%)",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "2",
        OTabSize: "2",
        tabSize: "2",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        background: "hsl(220, 13%, 18%)",
        color: "hsl(220, 14%, 71%)",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "2",
        OTabSize: "2",
        tabSize: "2",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto",
        borderRadius: "0.3em"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "hsl(220, 13%, 28%)",
        color: "inherit",
        textShadow: "none"
      },
      'code[class*="language-"] *::-moz-selection': {
        background: "hsl(220, 13%, 28%)",
        color: "inherit",
        textShadow: "none"
      },
      'pre[class*="language-"] *::-moz-selection': {
        background: "hsl(220, 13%, 28%)",
        color: "inherit",
        textShadow: "none"
      },
      'code[class*="language-"]::selection': {
        background: "hsl(220, 13%, 28%)",
        color: "inherit",
        textShadow: "none"
      },
      'code[class*="language-"] *::selection': {
        background: "hsl(220, 13%, 28%)",
        color: "inherit",
        textShadow: "none"
      },
      'pre[class*="language-"] *::selection': {
        background: "hsl(220, 13%, 28%)",
        color: "inherit",
        textShadow: "none"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: "0.2em 0.3em",
        borderRadius: "0.3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "hsl(220, 10%, 40%)",
        fontStyle: "italic"
      },
      prolog: {
        color: "hsl(220, 10%, 40%)"
      },
      cdata: {
        color: "hsl(220, 10%, 40%)"
      },
      doctype: {
        color: "hsl(220, 14%, 71%)"
      },
      punctuation: {
        color: "hsl(220, 14%, 71%)"
      },
      entity: {
        color: "hsl(220, 14%, 71%)",
        cursor: "help"
      },
      "attr-name": {
        color: "hsl(29, 54%, 61%)"
      },
      "class-name": {
        color: "hsl(29, 54%, 61%)"
      },
      boolean: {
        color: "hsl(29, 54%, 61%)"
      },
      constant: {
        color: "hsl(29, 54%, 61%)"
      },
      number: {
        color: "hsl(29, 54%, 61%)"
      },
      atrule: {
        color: "hsl(29, 54%, 61%)"
      },
      keyword: {
        color: "hsl(286, 60%, 67%)"
      },
      property: {
        color: "hsl(355, 65%, 65%)"
      },
      tag: {
        color: "hsl(355, 65%, 65%)"
      },
      symbol: {
        color: "hsl(355, 65%, 65%)"
      },
      deleted: {
        color: "hsl(355, 65%, 65%)"
      },
      important: {
        color: "hsl(355, 65%, 65%)"
      },
      selector: {
        color: "hsl(95, 38%, 62%)"
      },
      string: {
        color: "hsl(95, 38%, 62%)"
      },
      char: {
        color: "hsl(95, 38%, 62%)"
      },
      builtin: {
        color: "hsl(95, 38%, 62%)"
      },
      inserted: {
        color: "hsl(95, 38%, 62%)"
      },
      regex: {
        color: "hsl(95, 38%, 62%)"
      },
      "attr-value": {
        color: "hsl(95, 38%, 62%)"
      },
      "attr-value > .token.punctuation": {
        color: "hsl(95, 38%, 62%)"
      },
      variable: {
        color: "hsl(207, 82%, 66%)"
      },
      operator: {
        color: "hsl(207, 82%, 66%)"
      },
      function: {
        color: "hsl(207, 82%, 66%)"
      },
      url: {
        color: "hsl(187, 47%, 55%)"
      },
      "attr-value > .token.punctuation.attr-equals": {
        color: "hsl(220, 14%, 71%)"
      },
      "special-attr > .token.attr-value > .token.value.css": {
        color: "hsl(220, 14%, 71%)"
      },
      ".language-css .token.selector": {
        color: "hsl(355, 65%, 65%)"
      },
      ".language-css .token.property": {
        color: "hsl(220, 14%, 71%)"
      },
      ".language-css .token.function": {
        color: "hsl(187, 47%, 55%)"
      },
      ".language-css .token.url > .token.function": {
        color: "hsl(187, 47%, 55%)"
      },
      ".language-css .token.url > .token.string.url": {
        color: "hsl(95, 38%, 62%)"
      },
      ".language-css .token.important": {
        color: "hsl(286, 60%, 67%)"
      },
      ".language-css .token.atrule .token.rule": {
        color: "hsl(286, 60%, 67%)"
      },
      ".language-javascript .token.operator": {
        color: "hsl(286, 60%, 67%)"
      },
      ".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation": {
        color: "hsl(5, 48%, 51%)"
      },
      ".language-json .token.operator": {
        color: "hsl(220, 14%, 71%)"
      },
      ".language-json .token.null.keyword": {
        color: "hsl(29, 54%, 61%)"
      },
      ".language-markdown .token.url": {
        color: "hsl(220, 14%, 71%)"
      },
      ".language-markdown .token.url > .token.operator": {
        color: "hsl(220, 14%, 71%)"
      },
      ".language-markdown .token.url-reference.url > .token.string": {
        color: "hsl(220, 14%, 71%)"
      },
      ".language-markdown .token.url > .token.content": {
        color: "hsl(207, 82%, 66%)"
      },
      ".language-markdown .token.url > .token.url": {
        color: "hsl(187, 47%, 55%)"
      },
      ".language-markdown .token.url-reference.url": {
        color: "hsl(187, 47%, 55%)"
      },
      ".language-markdown .token.blockquote.punctuation": {
        color: "hsl(220, 10%, 40%)",
        fontStyle: "italic"
      },
      ".language-markdown .token.hr.punctuation": {
        color: "hsl(220, 10%, 40%)",
        fontStyle: "italic"
      },
      ".language-markdown .token.code-snippet": {
        color: "hsl(95, 38%, 62%)"
      },
      ".language-markdown .token.bold .token.content": {
        color: "hsl(29, 54%, 61%)"
      },
      ".language-markdown .token.italic .token.content": {
        color: "hsl(286, 60%, 67%)"
      },
      ".language-markdown .token.strike .token.content": {
        color: "hsl(355, 65%, 65%)"
      },
      ".language-markdown .token.strike .token.punctuation": {
        color: "hsl(355, 65%, 65%)"
      },
      ".language-markdown .token.list.punctuation": {
        color: "hsl(355, 65%, 65%)"
      },
      ".language-markdown .token.title.important > .token.punctuation": {
        color: "hsl(355, 65%, 65%)"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      namespace: {
        Opacity: "0.8"
      },
      "token.tab:not(:empty):before": {
        color: "hsla(220, 14%, 71%, 0.15)",
        textShadow: "none"
      },
      "token.cr:before": {
        color: "hsla(220, 14%, 71%, 0.15)",
        textShadow: "none"
      },
      "token.lf:before": {
        color: "hsla(220, 14%, 71%, 0.15)",
        textShadow: "none"
      },
      "token.space:before": {
        color: "hsla(220, 14%, 71%, 0.15)",
        textShadow: "none"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item": {
        marginRight: "0.4em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
        background: "hsl(220, 13%, 26%)",
        color: "hsl(220, 9%, 55%)",
        padding: "0.1em 0.4em",
        borderRadius: "0.3em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
        background: "hsl(220, 13%, 26%)",
        color: "hsl(220, 9%, 55%)",
        padding: "0.1em 0.4em",
        borderRadius: "0.3em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
        background: "hsl(220, 13%, 26%)",
        color: "hsl(220, 9%, 55%)",
        padding: "0.1em 0.4em",
        borderRadius: "0.3em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
        background: "hsl(220, 13%, 28%)",
        color: "hsl(220, 14%, 71%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
        background: "hsl(220, 13%, 28%)",
        color: "hsl(220, 14%, 71%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
        background: "hsl(220, 13%, 28%)",
        color: "hsl(220, 14%, 71%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
        background: "hsl(220, 13%, 28%)",
        color: "hsl(220, 14%, 71%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
        background: "hsl(220, 13%, 28%)",
        color: "hsl(220, 14%, 71%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
        background: "hsl(220, 13%, 28%)",
        color: "hsl(220, 14%, 71%)"
      },
      ".line-highlight.line-highlight": {
        background: "hsla(220, 100%, 80%, 0.04)"
      },
      ".line-highlight.line-highlight:before": {
        background: "hsl(220, 13%, 26%)",
        color: "hsl(220, 14%, 71%)",
        padding: "0.1em 0.6em",
        borderRadius: "0.3em",
        boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        background: "hsl(220, 13%, 26%)",
        color: "hsl(220, 14%, 71%)",
        padding: "0.1em 0.6em",
        borderRadius: "0.3em",
        boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)"
      },
      "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before": {
        backgroundColor: "hsla(220, 100%, 80%, 0.04)"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "hsla(220, 14%, 71%, 0.15)"
      },
      ".command-line .command-line-prompt": {
        borderRightColor: "hsla(220, 14%, 71%, 0.15)"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "hsl(220, 14%, 45%)"
      },
      ".command-line .command-line-prompt > span:before": {
        color: "hsl(220, 14%, 45%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-1": {
        color: "hsl(355, 65%, 65%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-5": {
        color: "hsl(355, 65%, 65%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-9": {
        color: "hsl(355, 65%, 65%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-2": {
        color: "hsl(95, 38%, 62%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-6": {
        color: "hsl(95, 38%, 62%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-10": {
        color: "hsl(95, 38%, 62%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-3": {
        color: "hsl(207, 82%, 66%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-7": {
        color: "hsl(207, 82%, 66%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-11": {
        color: "hsl(207, 82%, 66%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-4": {
        color: "hsl(286, 60%, 67%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-8": {
        color: "hsl(286, 60%, 67%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-12": {
        color: "hsl(286, 60%, 67%)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
        backgroundColor: "hsla(353, 100%, 66%, 0.15)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
        backgroundColor: "hsla(353, 100%, 66%, 0.15)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
        backgroundColor: "hsla(137, 100%, 55%, 0.15)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
        backgroundColor: "hsla(137, 100%, 55%, 0.15)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      ".prism-previewer.prism-previewer:before": {
        borderColor: "hsl(224, 13%, 17%)"
      },
      ".prism-previewer-gradient.prism-previewer-gradient div": {
        borderColor: "hsl(224, 13%, 17%)",
        borderRadius: "0.3em"
      },
      ".prism-previewer-color.prism-previewer-color:before": {
        borderRadius: "0.3em"
      },
      ".prism-previewer-easing.prism-previewer-easing:before": {
        borderRadius: "0.3em"
      },
      ".prism-previewer.prism-previewer:after": {
        borderTopColor: "hsl(224, 13%, 17%)"
      },
      ".prism-previewer-flipped.prism-previewer-flipped.after": {
        borderBottomColor: "hsl(224, 13%, 17%)"
      },
      ".prism-previewer-angle.prism-previewer-angle:before": {
        background: "hsl(219, 13%, 22%)"
      },
      ".prism-previewer-time.prism-previewer-time:before": {
        background: "hsl(219, 13%, 22%)"
      },
      ".prism-previewer-easing.prism-previewer-easing": {
        background: "hsl(219, 13%, 22%)"
      },
      ".prism-previewer-angle.prism-previewer-angle circle": {
        stroke: "hsl(220, 14%, 71%)",
        strokeOpacity: "1"
      },
      ".prism-previewer-time.prism-previewer-time circle": {
        stroke: "hsl(220, 14%, 71%)",
        strokeOpacity: "1"
      },
      ".prism-previewer-easing.prism-previewer-easing circle": {
        stroke: "hsl(220, 14%, 71%)",
        fill: "transparent"
      },
      ".prism-previewer-easing.prism-previewer-easing path": {
        stroke: "hsl(220, 14%, 71%)"
      },
      ".prism-previewer-easing.prism-previewer-easing line": {
        stroke: "hsl(220, 14%, 71%)"
      }
    };
    e.default = t;
  }(Fa)), Fa;
}
var ja = {}, Hl;
function Dg() {
  return Hl || (Hl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        background: "hsl(230, 1%, 98%)",
        color: "hsl(230, 8%, 24%)",
        fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "2",
        OTabSize: "2",
        tabSize: "2",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        background: "hsl(230, 1%, 98%)",
        color: "hsl(230, 8%, 24%)",
        fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "2",
        OTabSize: "2",
        tabSize: "2",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto",
        borderRadius: "0.3em"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "hsl(230, 1%, 90%)",
        color: "inherit"
      },
      'code[class*="language-"] *::-moz-selection': {
        background: "hsl(230, 1%, 90%)",
        color: "inherit"
      },
      'pre[class*="language-"] *::-moz-selection': {
        background: "hsl(230, 1%, 90%)",
        color: "inherit"
      },
      'code[class*="language-"]::selection': {
        background: "hsl(230, 1%, 90%)",
        color: "inherit"
      },
      'code[class*="language-"] *::selection': {
        background: "hsl(230, 1%, 90%)",
        color: "inherit"
      },
      'pre[class*="language-"] *::selection': {
        background: "hsl(230, 1%, 90%)",
        color: "inherit"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: "0.2em 0.3em",
        borderRadius: "0.3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "hsl(230, 4%, 64%)",
        fontStyle: "italic"
      },
      prolog: {
        color: "hsl(230, 4%, 64%)"
      },
      cdata: {
        color: "hsl(230, 4%, 64%)"
      },
      doctype: {
        color: "hsl(230, 8%, 24%)"
      },
      punctuation: {
        color: "hsl(230, 8%, 24%)"
      },
      entity: {
        color: "hsl(230, 8%, 24%)",
        cursor: "help"
      },
      "attr-name": {
        color: "hsl(35, 99%, 36%)"
      },
      "class-name": {
        color: "hsl(35, 99%, 36%)"
      },
      boolean: {
        color: "hsl(35, 99%, 36%)"
      },
      constant: {
        color: "hsl(35, 99%, 36%)"
      },
      number: {
        color: "hsl(35, 99%, 36%)"
      },
      atrule: {
        color: "hsl(35, 99%, 36%)"
      },
      keyword: {
        color: "hsl(301, 63%, 40%)"
      },
      property: {
        color: "hsl(5, 74%, 59%)"
      },
      tag: {
        color: "hsl(5, 74%, 59%)"
      },
      symbol: {
        color: "hsl(5, 74%, 59%)"
      },
      deleted: {
        color: "hsl(5, 74%, 59%)"
      },
      important: {
        color: "hsl(5, 74%, 59%)"
      },
      selector: {
        color: "hsl(119, 34%, 47%)"
      },
      string: {
        color: "hsl(119, 34%, 47%)"
      },
      char: {
        color: "hsl(119, 34%, 47%)"
      },
      builtin: {
        color: "hsl(119, 34%, 47%)"
      },
      inserted: {
        color: "hsl(119, 34%, 47%)"
      },
      regex: {
        color: "hsl(119, 34%, 47%)"
      },
      "attr-value": {
        color: "hsl(119, 34%, 47%)"
      },
      "attr-value > .token.punctuation": {
        color: "hsl(119, 34%, 47%)"
      },
      variable: {
        color: "hsl(221, 87%, 60%)"
      },
      operator: {
        color: "hsl(221, 87%, 60%)"
      },
      function: {
        color: "hsl(221, 87%, 60%)"
      },
      url: {
        color: "hsl(198, 99%, 37%)"
      },
      "attr-value > .token.punctuation.attr-equals": {
        color: "hsl(230, 8%, 24%)"
      },
      "special-attr > .token.attr-value > .token.value.css": {
        color: "hsl(230, 8%, 24%)"
      },
      ".language-css .token.selector": {
        color: "hsl(5, 74%, 59%)"
      },
      ".language-css .token.property": {
        color: "hsl(230, 8%, 24%)"
      },
      ".language-css .token.function": {
        color: "hsl(198, 99%, 37%)"
      },
      ".language-css .token.url > .token.function": {
        color: "hsl(198, 99%, 37%)"
      },
      ".language-css .token.url > .token.string.url": {
        color: "hsl(119, 34%, 47%)"
      },
      ".language-css .token.important": {
        color: "hsl(301, 63%, 40%)"
      },
      ".language-css .token.atrule .token.rule": {
        color: "hsl(301, 63%, 40%)"
      },
      ".language-javascript .token.operator": {
        color: "hsl(301, 63%, 40%)"
      },
      ".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation": {
        color: "hsl(344, 84%, 43%)"
      },
      ".language-json .token.operator": {
        color: "hsl(230, 8%, 24%)"
      },
      ".language-json .token.null.keyword": {
        color: "hsl(35, 99%, 36%)"
      },
      ".language-markdown .token.url": {
        color: "hsl(230, 8%, 24%)"
      },
      ".language-markdown .token.url > .token.operator": {
        color: "hsl(230, 8%, 24%)"
      },
      ".language-markdown .token.url-reference.url > .token.string": {
        color: "hsl(230, 8%, 24%)"
      },
      ".language-markdown .token.url > .token.content": {
        color: "hsl(221, 87%, 60%)"
      },
      ".language-markdown .token.url > .token.url": {
        color: "hsl(198, 99%, 37%)"
      },
      ".language-markdown .token.url-reference.url": {
        color: "hsl(198, 99%, 37%)"
      },
      ".language-markdown .token.blockquote.punctuation": {
        color: "hsl(230, 4%, 64%)",
        fontStyle: "italic"
      },
      ".language-markdown .token.hr.punctuation": {
        color: "hsl(230, 4%, 64%)",
        fontStyle: "italic"
      },
      ".language-markdown .token.code-snippet": {
        color: "hsl(119, 34%, 47%)"
      },
      ".language-markdown .token.bold .token.content": {
        color: "hsl(35, 99%, 36%)"
      },
      ".language-markdown .token.italic .token.content": {
        color: "hsl(301, 63%, 40%)"
      },
      ".language-markdown .token.strike .token.content": {
        color: "hsl(5, 74%, 59%)"
      },
      ".language-markdown .token.strike .token.punctuation": {
        color: "hsl(5, 74%, 59%)"
      },
      ".language-markdown .token.list.punctuation": {
        color: "hsl(5, 74%, 59%)"
      },
      ".language-markdown .token.title.important > .token.punctuation": {
        color: "hsl(5, 74%, 59%)"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      namespace: {
        Opacity: "0.8"
      },
      "token.tab:not(:empty):before": {
        color: "hsla(230, 8%, 24%, 0.2)"
      },
      "token.cr:before": {
        color: "hsla(230, 8%, 24%, 0.2)"
      },
      "token.lf:before": {
        color: "hsla(230, 8%, 24%, 0.2)"
      },
      "token.space:before": {
        color: "hsla(230, 8%, 24%, 0.2)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item": {
        marginRight: "0.4em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
        background: "hsl(230, 1%, 90%)",
        color: "hsl(230, 6%, 44%)",
        padding: "0.1em 0.4em",
        borderRadius: "0.3em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
        background: "hsl(230, 1%, 90%)",
        color: "hsl(230, 6%, 44%)",
        padding: "0.1em 0.4em",
        borderRadius: "0.3em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
        background: "hsl(230, 1%, 90%)",
        color: "hsl(230, 6%, 44%)",
        padding: "0.1em 0.4em",
        borderRadius: "0.3em"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
        background: "hsl(230, 1%, 78%)",
        color: "hsl(230, 8%, 24%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
        background: "hsl(230, 1%, 78%)",
        color: "hsl(230, 8%, 24%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
        background: "hsl(230, 1%, 78%)",
        color: "hsl(230, 8%, 24%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
        background: "hsl(230, 1%, 78%)",
        color: "hsl(230, 8%, 24%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
        background: "hsl(230, 1%, 78%)",
        color: "hsl(230, 8%, 24%)"
      },
      "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
        background: "hsl(230, 1%, 78%)",
        color: "hsl(230, 8%, 24%)"
      },
      ".line-highlight.line-highlight": {
        background: "hsla(230, 8%, 24%, 0.05)"
      },
      ".line-highlight.line-highlight:before": {
        background: "hsl(230, 1%, 90%)",
        color: "hsl(230, 8%, 24%)",
        padding: "0.1em 0.6em",
        borderRadius: "0.3em",
        boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        background: "hsl(230, 1%, 90%)",
        color: "hsl(230, 8%, 24%)",
        padding: "0.1em 0.6em",
        borderRadius: "0.3em",
        boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)"
      },
      "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before": {
        backgroundColor: "hsla(230, 8%, 24%, 0.05)"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "hsla(230, 8%, 24%, 0.2)"
      },
      ".command-line .command-line-prompt": {
        borderRightColor: "hsla(230, 8%, 24%, 0.2)"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "hsl(230, 1%, 62%)"
      },
      ".command-line .command-line-prompt > span:before": {
        color: "hsl(230, 1%, 62%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-1": {
        color: "hsl(5, 74%, 59%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-5": {
        color: "hsl(5, 74%, 59%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-9": {
        color: "hsl(5, 74%, 59%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-2": {
        color: "hsl(119, 34%, 47%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-6": {
        color: "hsl(119, 34%, 47%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-10": {
        color: "hsl(119, 34%, 47%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-3": {
        color: "hsl(221, 87%, 60%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-7": {
        color: "hsl(221, 87%, 60%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-11": {
        color: "hsl(221, 87%, 60%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-4": {
        color: "hsl(301, 63%, 40%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-8": {
        color: "hsl(301, 63%, 40%)"
      },
      ".rainbow-braces .token.token.punctuation.brace-level-12": {
        color: "hsl(301, 63%, 40%)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
        backgroundColor: "hsla(353, 100%, 66%, 0.15)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
        backgroundColor: "hsla(353, 100%, 66%, 0.15)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection": {
        backgroundColor: "hsla(353, 95%, 66%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
        backgroundColor: "hsla(137, 100%, 55%, 0.15)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
        backgroundColor: "hsla(137, 100%, 55%, 0.15)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection": {
        backgroundColor: "hsla(135, 73%, 55%, 0.25)"
      },
      ".prism-previewer.prism-previewer:before": {
        borderColor: "hsl(0, 0, 95%)"
      },
      ".prism-previewer-gradient.prism-previewer-gradient div": {
        borderColor: "hsl(0, 0, 95%)",
        borderRadius: "0.3em"
      },
      ".prism-previewer-color.prism-previewer-color:before": {
        borderRadius: "0.3em"
      },
      ".prism-previewer-easing.prism-previewer-easing:before": {
        borderRadius: "0.3em"
      },
      ".prism-previewer.prism-previewer:after": {
        borderTopColor: "hsl(0, 0, 95%)"
      },
      ".prism-previewer-flipped.prism-previewer-flipped.after": {
        borderBottomColor: "hsl(0, 0, 95%)"
      },
      ".prism-previewer-angle.prism-previewer-angle:before": {
        background: "hsl(0, 0%, 100%)"
      },
      ".prism-previewer-time.prism-previewer-time:before": {
        background: "hsl(0, 0%, 100%)"
      },
      ".prism-previewer-easing.prism-previewer-easing": {
        background: "hsl(0, 0%, 100%)"
      },
      ".prism-previewer-angle.prism-previewer-angle circle": {
        stroke: "hsl(230, 8%, 24%)",
        strokeOpacity: "1"
      },
      ".prism-previewer-time.prism-previewer-time circle": {
        stroke: "hsl(230, 8%, 24%)",
        strokeOpacity: "1"
      },
      ".prism-previewer-easing.prism-previewer-easing circle": {
        stroke: "hsl(230, 8%, 24%)",
        fill: "transparent"
      },
      ".prism-previewer-easing.prism-previewer-easing path": {
        stroke: "hsl(230, 8%, 24%)"
      },
      ".prism-previewer-easing.prism-previewer-easing line": {
        stroke: "hsl(230, 8%, 24%)"
      }
    };
    e.default = t;
  }(ja)), ja;
}
var Pa = {}, Bl;
function Rg() {
  return Bl || (Bl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        wordWrap: "break-word",
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: "15px",
        lineHeight: "1.5",
        color: "#dccf8f",
        textShadow: "0"
      },
      'pre[class*="language-"]': {
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        wordWrap: "break-word",
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: "15px",
        lineHeight: "1.5",
        color: "#DCCF8F",
        textShadow: "0",
        borderRadius: "5px",
        border: "1px solid #000",
        background: "#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",
        padding: "12px",
        overflow: "auto"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      ':not(pre) > code[class*="language-"]': {
        borderRadius: "5px",
        border: "1px solid #000",
        color: "#DCCF8F",
        background: "#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",
        padding: "2px 6px"
      },
      namespace: {
        Opacity: ".7"
      },
      comment: {
        color: "#586e75",
        fontStyle: "italic"
      },
      prolog: {
        color: "#586e75",
        fontStyle: "italic"
      },
      doctype: {
        color: "#586e75",
        fontStyle: "italic"
      },
      cdata: {
        color: "#586e75",
        fontStyle: "italic"
      },
      number: {
        color: "#b89859"
      },
      string: {
        color: "#468966"
      },
      char: {
        color: "#468966"
      },
      builtin: {
        color: "#468966"
      },
      inserted: {
        color: "#468966"
      },
      "attr-name": {
        color: "#b89859"
      },
      operator: {
        color: "#dccf8f"
      },
      entity: {
        color: "#dccf8f",
        cursor: "help"
      },
      url: {
        color: "#dccf8f"
      },
      ".language-css .token.string": {
        color: "#dccf8f"
      },
      ".style .token.string": {
        color: "#dccf8f"
      },
      selector: {
        color: "#859900"
      },
      regex: {
        color: "#859900"
      },
      atrule: {
        color: "#cb4b16"
      },
      keyword: {
        color: "#cb4b16"
      },
      "attr-value": {
        color: "#468966"
      },
      function: {
        color: "#b58900"
      },
      variable: {
        color: "#b58900"
      },
      placeholder: {
        color: "#b58900"
      },
      property: {
        color: "#b89859"
      },
      tag: {
        color: "#ffb03b"
      },
      boolean: {
        color: "#b89859"
      },
      constant: {
        color: "#b89859"
      },
      symbol: {
        color: "#b89859"
      },
      important: {
        color: "#dc322f"
      },
      statement: {
        color: "#dc322f"
      },
      deleted: {
        color: "#dc322f"
      },
      punctuation: {
        color: "#dccf8f"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(Pa)), Pa;
}
var Ha = {}, $l;
function zg() {
  return $l || ($l = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      "code[class*='language-']": {
        color: "#9efeff",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        fontFamily: "'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontWeight: "400",
        fontSize: "17px",
        lineHeight: "25px",
        letterSpacing: "0.5px",
        textShadow: "0 1px #222245"
      },
      "pre[class*='language-']": {
        color: "#9efeff",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        fontFamily: "'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontWeight: "400",
        fontSize: "17px",
        lineHeight: "25px",
        letterSpacing: "0.5px",
        textShadow: "0 1px #222245",
        padding: "2em",
        margin: "0.5em 0",
        overflow: "auto",
        background: "#1e1e3f"
      },
      "pre[class*='language-']::-moz-selection": {
        color: "inherit",
        background: "#a599e9"
      },
      "pre[class*='language-'] ::-moz-selection": {
        color: "inherit",
        background: "#a599e9"
      },
      "code[class*='language-']::-moz-selection": {
        color: "inherit",
        background: "#a599e9"
      },
      "code[class*='language-'] ::-moz-selection": {
        color: "inherit",
        background: "#a599e9"
      },
      "pre[class*='language-']::selection": {
        color: "inherit",
        background: "#a599e9"
      },
      "pre[class*='language-'] ::selection": {
        color: "inherit",
        background: "#a599e9"
      },
      "code[class*='language-']::selection": {
        color: "inherit",
        background: "#a599e9"
      },
      "code[class*='language-'] ::selection": {
        color: "inherit",
        background: "#a599e9"
      },
      ":not(pre) > code[class*='language-']": {
        background: "#1e1e3f",
        padding: "0.1em",
        borderRadius: "0.3em"
      },
      "": {
        fontWeight: "400"
      },
      comment: {
        color: "#b362ff"
      },
      prolog: {
        color: "#b362ff"
      },
      cdata: {
        color: "#b362ff"
      },
      delimiter: {
        color: "#ff9d00"
      },
      keyword: {
        color: "#ff9d00"
      },
      selector: {
        color: "#ff9d00"
      },
      important: {
        color: "#ff9d00"
      },
      atrule: {
        color: "#ff9d00"
      },
      operator: {
        color: "rgb(255, 180, 84)",
        background: "none"
      },
      "attr-name": {
        color: "rgb(255, 180, 84)"
      },
      punctuation: {
        color: "#ffffff"
      },
      boolean: {
        color: "rgb(255, 98, 140)"
      },
      tag: {
        color: "rgb(255, 157, 0)"
      },
      "tag.punctuation": {
        color: "rgb(255, 157, 0)"
      },
      doctype: {
        color: "rgb(255, 157, 0)"
      },
      builtin: {
        color: "rgb(255, 157, 0)"
      },
      entity: {
        color: "#6897bb",
        background: "none"
      },
      symbol: {
        color: "#6897bb"
      },
      number: {
        color: "#ff628c"
      },
      property: {
        color: "#ff628c"
      },
      constant: {
        color: "#ff628c"
      },
      variable: {
        color: "#ff628c"
      },
      string: {
        color: "#a5ff90"
      },
      char: {
        color: "#a5ff90"
      },
      "attr-value": {
        color: "#a5c261"
      },
      "attr-value.punctuation": {
        color: "#a5c261"
      },
      "attr-value.punctuation:first-child": {
        color: "#a9b7c6"
      },
      url: {
        color: "#287bde",
        textDecoration: "underline",
        background: "none"
      },
      function: {
        color: "rgb(250, 208, 0)"
      },
      regex: {
        background: "#364135"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      inserted: {
        background: "#00ff00"
      },
      deleted: {
        background: "#ff000d"
      },
      "code.language-css .token.property": {
        color: "#a9b7c6"
      },
      "code.language-css .token.property + .token.punctuation": {
        color: "#a9b7c6"
      },
      "code.language-css .token.id": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.class": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.attribute": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.pseudo-class": {
        color: "#ffc66d"
      },
      "code.language-css .token.selector > .token.pseudo-element": {
        color: "#ffc66d"
      },
      "class-name": {
        color: "#fb94ff"
      },
      ".language-css .token.string": {
        background: "none"
      },
      ".style .token.string": {
        background: "none"
      },
      ".line-highlight.line-highlight": {
        marginTop: "36px",
        background: "linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent)"
      },
      ".line-highlight.line-highlight:before": {
        content: "''"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        content: "''"
      }
    };
    e.default = t;
  }(Ha)), Ha;
}
var Ba = {}, Wl;
function Ig() {
  return Wl || (Wl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#839496",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#839496",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em",
        background: "#002b36"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#002b36",
        padding: ".1em",
        borderRadius: ".3em"
      },
      comment: {
        color: "#586e75"
      },
      prolog: {
        color: "#586e75"
      },
      doctype: {
        color: "#586e75"
      },
      cdata: {
        color: "#586e75"
      },
      punctuation: {
        color: "#93a1a1"
      },
      ".namespace": {
        Opacity: ".7"
      },
      property: {
        color: "#268bd2"
      },
      keyword: {
        color: "#268bd2"
      },
      tag: {
        color: "#268bd2"
      },
      "class-name": {
        color: "#FFFFB6",
        textDecoration: "underline"
      },
      boolean: {
        color: "#b58900"
      },
      constant: {
        color: "#b58900"
      },
      symbol: {
        color: "#dc322f"
      },
      deleted: {
        color: "#dc322f"
      },
      number: {
        color: "#859900"
      },
      selector: {
        color: "#859900"
      },
      "attr-name": {
        color: "#859900"
      },
      string: {
        color: "#859900"
      },
      char: {
        color: "#859900"
      },
      builtin: {
        color: "#859900"
      },
      inserted: {
        color: "#859900"
      },
      variable: {
        color: "#268bd2"
      },
      operator: {
        color: "#EDEDED"
      },
      function: {
        color: "#268bd2"
      },
      regex: {
        color: "#E9C062"
      },
      important: {
        color: "#fd971f",
        fontWeight: "bold"
      },
      entity: {
        color: "#FFFFB6",
        cursor: "help"
      },
      url: {
        color: "#96CBFE"
      },
      ".language-css .token.string": {
        color: "#87C38A"
      },
      ".style .token.string": {
        color: "#87C38A"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      atrule: {
        color: "#F9EE98"
      },
      "attr-value": {
        color: "#F9EE98"
      }
    };
    e.default = t;
  }(Ba)), Ba;
}
var $a = {}, Vl;
function Lg() {
  return Vl || (Vl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#f92aad",
        textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#f92aad",
        textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
        background: "none",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        fontSize: "1em",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        backgroundColor: "transparent !important",
        backgroundImage: "linear-gradient(to bottom, #2a2139 75%, #34294f)"
      },
      ':not(pre) > code[class*="language-"]': {
        backgroundColor: "transparent !important",
        backgroundImage: "linear-gradient(to bottom, #2a2139 75%, #34294f)",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal"
      },
      comment: {
        color: "#8e8e8e"
      },
      "block-comment": {
        color: "#8e8e8e"
      },
      prolog: {
        color: "#8e8e8e"
      },
      doctype: {
        color: "#8e8e8e"
      },
      cdata: {
        color: "#8e8e8e"
      },
      punctuation: {
        color: "#ccc"
      },
      tag: {
        color: "#e2777a"
      },
      "attr-name": {
        color: "#e2777a"
      },
      namespace: {
        color: "#e2777a"
      },
      number: {
        color: "#e2777a"
      },
      unit: {
        color: "#e2777a"
      },
      hexcode: {
        color: "#e2777a"
      },
      deleted: {
        color: "#e2777a"
      },
      property: {
        color: "#72f1b8",
        textShadow: "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475"
      },
      selector: {
        color: "#72f1b8",
        textShadow: "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475"
      },
      "function-name": {
        color: "#6196cc"
      },
      boolean: {
        color: "#fdfdfd",
        textShadow: "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"
      },
      "selector.id": {
        color: "#fdfdfd",
        textShadow: "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"
      },
      function: {
        color: "#fdfdfd",
        textShadow: "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"
      },
      "class-name": {
        color: "#fff5f6",
        textShadow: "0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75"
      },
      constant: {
        color: "#f92aad",
        textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"
      },
      symbol: {
        color: "#f92aad",
        textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"
      },
      important: {
        color: "#f4eee4",
        textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
        fontWeight: "bold"
      },
      atrule: {
        color: "#f4eee4",
        textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
      },
      keyword: {
        color: "#f4eee4",
        textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
      },
      "selector.class": {
        color: "#f4eee4",
        textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
      },
      builtin: {
        color: "#f4eee4",
        textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
      },
      string: {
        color: "#f87c32"
      },
      char: {
        color: "#f87c32"
      },
      "attr-value": {
        color: "#f87c32"
      },
      regex: {
        color: "#f87c32"
      },
      variable: {
        color: "#f87c32"
      },
      operator: {
        color: "#67cdcc"
      },
      entity: {
        color: "#67cdcc",
        cursor: "help"
      },
      url: {
        color: "#67cdcc"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      inserted: {
        color: "green"
      }
    };
    e.default = t;
  }($a)), $a;
}
var Wa = {}, ql;
function Fg() {
  return ql || (ql = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#393A34",
        fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        fontSize: ".9em",
        lineHeight: "1.2em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]': {
        color: "#393A34",
        fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        fontSize: ".9em",
        lineHeight: "1.2em",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        border: "1px solid #dddddd",
        backgroundColor: "white"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      'pre[class*="language-"]::-moz-selection': {
        background: "#C1DEF1"
      },
      'pre[class*="language-"] ::-moz-selection': {
        background: "#C1DEF1"
      },
      'code[class*="language-"]::-moz-selection': {
        background: "#C1DEF1"
      },
      'code[class*="language-"] ::-moz-selection': {
        background: "#C1DEF1"
      },
      'pre[class*="language-"]::selection': {
        background: "#C1DEF1"
      },
      'pre[class*="language-"] ::selection': {
        background: "#C1DEF1"
      },
      'code[class*="language-"]::selection': {
        background: "#C1DEF1"
      },
      'code[class*="language-"] ::selection': {
        background: "#C1DEF1"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".2em",
        paddingTop: "1px",
        paddingBottom: "1px",
        background: "#f8f8f8",
        border: "1px solid #dddddd"
      },
      comment: {
        color: "#008000",
        fontStyle: "italic"
      },
      prolog: {
        color: "#008000",
        fontStyle: "italic"
      },
      doctype: {
        color: "#008000",
        fontStyle: "italic"
      },
      cdata: {
        color: "#008000",
        fontStyle: "italic"
      },
      namespace: {
        Opacity: ".7"
      },
      string: {
        color: "#A31515"
      },
      punctuation: {
        color: "#393A34"
      },
      operator: {
        color: "#393A34"
      },
      url: {
        color: "#36acaa"
      },
      symbol: {
        color: "#36acaa"
      },
      number: {
        color: "#36acaa"
      },
      boolean: {
        color: "#36acaa"
      },
      variable: {
        color: "#36acaa"
      },
      constant: {
        color: "#36acaa"
      },
      inserted: {
        color: "#36acaa"
      },
      atrule: {
        color: "#0000ff"
      },
      keyword: {
        color: "#0000ff"
      },
      "attr-value": {
        color: "#0000ff"
      },
      ".language-autohotkey .token.selector": {
        color: "#0000ff"
      },
      ".language-json .token.boolean": {
        color: "#0000ff"
      },
      ".language-json .token.number": {
        color: "#0000ff"
      },
      'code[class*="language-css"]': {
        color: "#0000ff"
      },
      function: {
        color: "#393A34"
      },
      deleted: {
        color: "#9a050f"
      },
      ".language-autohotkey .token.tag": {
        color: "#9a050f"
      },
      selector: {
        color: "#800000"
      },
      ".language-autohotkey .token.keyword": {
        color: "#00009f"
      },
      important: {
        color: "#e90",
        fontWeight: "bold"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      },
      "class-name": {
        color: "#2B91AF"
      },
      ".language-json .token.property": {
        color: "#2B91AF"
      },
      tag: {
        color: "#800000"
      },
      "attr-name": {
        color: "#ff0000"
      },
      property: {
        color: "#ff0000"
      },
      regex: {
        color: "#ff0000"
      },
      entity: {
        color: "#ff0000"
      },
      "directive.tag.tag": {
        background: "#ffff00",
        color: "#393A34"
      },
      ".line-numbers.line-numbers .line-numbers-rows": {
        borderRightColor: "#a5a5a5"
      },
      ".line-numbers .line-numbers-rows > span:before": {
        color: "#2B91AF"
      },
      ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, rgba(193, 222, 241, 0.2) 70%, rgba(221, 222, 241, 0))"
      }
    };
    e.default = t;
  }(Wa)), Wa;
}
var Va = {}, Ul;
function jg() {
  return Ul || (Ul = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'pre[class*="language-"]': {
        color: "#d4d4d4",
        fontSize: "13px",
        textShadow: "none",
        fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        background: "#1e1e1e"
      },
      'code[class*="language-"]': {
        color: "#d4d4d4",
        fontSize: "13px",
        textShadow: "none",
        fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "#264F78"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "#264F78"
      },
      'pre[class*="language-"] *::selection': {
        textShadow: "none",
        background: "#264F78"
      },
      'code[class*="language-"] *::selection': {
        textShadow: "none",
        background: "#264F78"
      },
      ':not(pre) > code[class*="language-"]': {
        padding: ".1em .3em",
        borderRadius: ".3em",
        color: "#db4c69",
        background: "#1e1e1e"
      },
      ".namespace": {
        Opacity: ".7"
      },
      "doctype.doctype-tag": {
        color: "#569CD6"
      },
      "doctype.name": {
        color: "#9cdcfe"
      },
      comment: {
        color: "#6a9955"
      },
      prolog: {
        color: "#6a9955"
      },
      punctuation: {
        color: "#d4d4d4"
      },
      ".language-html .language-css .token.punctuation": {
        color: "#d4d4d4"
      },
      ".language-html .language-javascript .token.punctuation": {
        color: "#d4d4d4"
      },
      property: {
        color: "#9cdcfe"
      },
      tag: {
        color: "#569cd6"
      },
      boolean: {
        color: "#569cd6"
      },
      number: {
        color: "#b5cea8"
      },
      constant: {
        color: "#9cdcfe"
      },
      symbol: {
        color: "#b5cea8"
      },
      inserted: {
        color: "#b5cea8"
      },
      unit: {
        color: "#b5cea8"
      },
      selector: {
        color: "#d7ba7d"
      },
      "attr-name": {
        color: "#9cdcfe"
      },
      string: {
        color: "#ce9178"
      },
      char: {
        color: "#ce9178"
      },
      builtin: {
        color: "#ce9178"
      },
      deleted: {
        color: "#ce9178"
      },
      ".language-css .token.string.url": {
        textDecoration: "underline"
      },
      operator: {
        color: "#d4d4d4"
      },
      entity: {
        color: "#569cd6"
      },
      "operator.arrow": {
        color: "#569CD6"
      },
      atrule: {
        color: "#ce9178"
      },
      "atrule.rule": {
        color: "#c586c0"
      },
      "atrule.url": {
        color: "#9cdcfe"
      },
      "atrule.url.function": {
        color: "#dcdcaa"
      },
      "atrule.url.punctuation": {
        color: "#d4d4d4"
      },
      keyword: {
        color: "#569CD6"
      },
      "keyword.module": {
        color: "#c586c0"
      },
      "keyword.control-flow": {
        color: "#c586c0"
      },
      function: {
        color: "#dcdcaa"
      },
      "function.maybe-class-name": {
        color: "#dcdcaa"
      },
      regex: {
        color: "#d16969"
      },
      important: {
        color: "#569cd6"
      },
      italic: {
        fontStyle: "italic"
      },
      "class-name": {
        color: "#4ec9b0"
      },
      "maybe-class-name": {
        color: "#4ec9b0"
      },
      console: {
        color: "#9cdcfe"
      },
      parameter: {
        color: "#9cdcfe"
      },
      interpolation: {
        color: "#9cdcfe"
      },
      "punctuation.interpolation-punctuation": {
        color: "#569cd6"
      },
      variable: {
        color: "#9cdcfe"
      },
      "imports.maybe-class-name": {
        color: "#9cdcfe"
      },
      "exports.maybe-class-name": {
        color: "#9cdcfe"
      },
      escape: {
        color: "#d7ba7d"
      },
      "tag.punctuation": {
        color: "#808080"
      },
      cdata: {
        color: "#808080"
      },
      "attr-value": {
        color: "#ce9178"
      },
      "attr-value.punctuation": {
        color: "#ce9178"
      },
      "attr-value.punctuation.attr-equals": {
        color: "#d4d4d4"
      },
      namespace: {
        color: "#4ec9b0"
      },
      'pre[class*="language-javascript"]': {
        color: "#9cdcfe"
      },
      'code[class*="language-javascript"]': {
        color: "#9cdcfe"
      },
      'pre[class*="language-jsx"]': {
        color: "#9cdcfe"
      },
      'code[class*="language-jsx"]': {
        color: "#9cdcfe"
      },
      'pre[class*="language-typescript"]': {
        color: "#9cdcfe"
      },
      'code[class*="language-typescript"]': {
        color: "#9cdcfe"
      },
      'pre[class*="language-tsx"]': {
        color: "#9cdcfe"
      },
      'code[class*="language-tsx"]': {
        color: "#9cdcfe"
      },
      'pre[class*="language-css"]': {
        color: "#ce9178"
      },
      'code[class*="language-css"]': {
        color: "#ce9178"
      },
      'pre[class*="language-html"]': {
        color: "#d4d4d4"
      },
      'code[class*="language-html"]': {
        color: "#d4d4d4"
      },
      ".language-regex .token.anchor": {
        color: "#dcdcaa"
      },
      ".language-html .token.punctuation": {
        color: "#808080"
      },
      'pre[class*="language-"] > code[class*="language-"]': {
        position: "relative",
        zIndex: "1"
      },
      ".line-highlight.line-highlight": {
        background: "#f7ebc6",
        boxShadow: "inset 5px 0 0 #f7d87c",
        zIndex: "0"
      }
    };
    e.default = t;
  }(Va)), Va;
}
var qa = {}, Yl;
function Pg() {
  return Yl || (Yl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        MozTabSize: "2",
        OTabSize: "2",
        tabSize: "2",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        whiteSpace: "pre-wrap",
        wordWrap: "normal",
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: "14px",
        color: "#76d9e6",
        textShadow: "none"
      },
      'pre[class*="language-"]': {
        MozTabSize: "2",
        OTabSize: "2",
        tabSize: "2",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        whiteSpace: "pre-wrap",
        wordWrap: "normal",
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: "14px",
        color: "#76d9e6",
        textShadow: "none",
        background: "#2a2a2a",
        padding: "15px",
        borderRadius: "4px",
        border: "1px solid #e1e1e8",
        overflow: "auto",
        position: "relative"
      },
      'pre > code[class*="language-"]': {
        fontSize: "1em"
      },
      ':not(pre) > code[class*="language-"]': {
        background: "#2a2a2a",
        padding: "0.15em 0.2em 0.05em",
        borderRadius: ".3em",
        border: "0.13em solid #7a6652",
        boxShadow: "1px 1px 0.3em -0.1em #000 inset"
      },
      'pre[class*="language-"] code': {
        whiteSpace: "pre",
        display: "block"
      },
      namespace: {
        Opacity: ".7"
      },
      comment: {
        color: "#6f705e"
      },
      prolog: {
        color: "#6f705e"
      },
      doctype: {
        color: "#6f705e"
      },
      cdata: {
        color: "#6f705e"
      },
      operator: {
        color: "#a77afe"
      },
      boolean: {
        color: "#a77afe"
      },
      number: {
        color: "#a77afe"
      },
      "attr-name": {
        color: "#e6d06c"
      },
      string: {
        color: "#e6d06c"
      },
      entity: {
        color: "#e6d06c",
        cursor: "help"
      },
      url: {
        color: "#e6d06c"
      },
      ".language-css .token.string": {
        color: "#e6d06c"
      },
      ".style .token.string": {
        color: "#e6d06c"
      },
      selector: {
        color: "#a6e22d"
      },
      inserted: {
        color: "#a6e22d"
      },
      atrule: {
        color: "#ef3b7d"
      },
      "attr-value": {
        color: "#ef3b7d"
      },
      keyword: {
        color: "#ef3b7d"
      },
      important: {
        color: "#ef3b7d",
        fontWeight: "bold"
      },
      deleted: {
        color: "#ef3b7d"
      },
      regex: {
        color: "#76d9e6"
      },
      statement: {
        color: "#76d9e6",
        fontWeight: "bold"
      },
      placeholder: {
        color: "#fff"
      },
      variable: {
        color: "#fff"
      },
      bold: {
        fontWeight: "bold"
      },
      punctuation: {
        color: "#bebec5"
      },
      italic: {
        fontStyle: "italic"
      },
      "code.language-markup": {
        color: "#f9f9f9"
      },
      "code.language-markup .token.tag": {
        color: "#ef3b7d"
      },
      "code.language-markup .token.attr-name": {
        color: "#a6e22d"
      },
      "code.language-markup .token.attr-value": {
        color: "#e6d06c"
      },
      "code.language-markup .token.style": {
        color: "#76d9e6"
      },
      "code.language-markup .token.script": {
        color: "#76d9e6"
      },
      "code.language-markup .token.script .token.keyword": {
        color: "#76d9e6"
      },
      ".line-highlight.line-highlight": {
        padding: "0",
        background: "rgba(255, 255, 255, 0.08)"
      },
      ".line-highlight.line-highlight:before": {
        padding: "0.2em 0.5em",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        color: "black",
        height: "1em",
        lineHeight: "1em",
        boxShadow: "0 1px 1px rgba(255, 255, 255, 0.7)"
      },
      ".line-highlight.line-highlight[data-end]:after": {
        padding: "0.2em 0.5em",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        color: "black",
        height: "1em",
        lineHeight: "1em",
        boxShadow: "0 1px 1px rgba(255, 255, 255, 0.7)"
      }
    };
    e.default = t;
  }(qa)), qa;
}
var Ua = {}, Zl;
function Hg() {
  return Zl || (Zl = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var t = {
      'code[class*="language-"]': {
        color: "#22da17",
        fontFamily: "monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        lineHeight: "25px",
        fontSize: "18px",
        margin: "5px 0"
      },
      'pre[class*="language-"]': {
        color: "white",
        fontFamily: "monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        lineHeight: "25px",
        fontSize: "18px",
        margin: "0.5em 0",
        background: "#0a143c",
        padding: "1em",
        overflow: "auto"
      },
      'pre[class*="language-"] *': {
        fontFamily: "monospace"
      },
      ':not(pre) > code[class*="language-"]': {
        color: "white",
        background: "#0a143c",
        padding: "0.1em",
        borderRadius: "0.3em",
        whiteSpace: "normal"
      },
      'pre[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'pre[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"]::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"] ::-moz-selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'pre[class*="language-"]::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'pre[class*="language-"] ::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"]::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      'code[class*="language-"] ::selection': {
        textShadow: "none",
        background: "rgba(29, 59, 83, 0.99)"
      },
      comment: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      },
      prolog: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      },
      cdata: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      },
      punctuation: {
        color: "rgb(199, 146, 234)"
      },
      ".namespace": {
        color: "rgb(178, 204, 214)"
      },
      deleted: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      },
      symbol: {
        color: "rgb(128, 203, 196)"
      },
      property: {
        color: "rgb(128, 203, 196)"
      },
      tag: {
        color: "rgb(127, 219, 202)"
      },
      operator: {
        color: "rgb(127, 219, 202)"
      },
      keyword: {
        color: "rgb(127, 219, 202)"
      },
      boolean: {
        color: "rgb(255, 88, 116)"
      },
      number: {
        color: "rgb(247, 140, 108)"
      },
      constant: {
        color: "rgb(34 183 199)"
      },
      function: {
        color: "rgb(34 183 199)"
      },
      builtin: {
        color: "rgb(34 183 199)"
      },
      char: {
        color: "rgb(34 183 199)"
      },
      selector: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      },
      doctype: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      },
      "attr-name": {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      },
      inserted: {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      },
      string: {
        color: "rgb(173, 219, 103)"
      },
      url: {
        color: "rgb(173, 219, 103)"
      },
      entity: {
        color: "rgb(173, 219, 103)"
      },
      ".language-css .token.string": {
        color: "rgb(173, 219, 103)"
      },
      ".style .token.string": {
        color: "rgb(173, 219, 103)"
      },
      "class-name": {
        color: "rgb(255, 203, 139)"
      },
      atrule: {
        color: "rgb(255, 203, 139)"
      },
      "attr-value": {
        color: "rgb(255, 203, 139)"
      },
      regex: {
        color: "rgb(214, 222, 235)"
      },
      important: {
        color: "rgb(214, 222, 235)",
        fontWeight: "bold"
      },
      variable: {
        color: "rgb(214, 222, 235)"
      },
      bold: {
        fontWeight: "bold"
      },
      italic: {
        fontStyle: "italic"
      }
    };
    e.default = t;
  }(Ua)), Ua;
}
(function(e) {
  var t = G1;
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "a11yDark", {
    enumerable: !0,
    get: function() {
      return l.default;
    }
  }), Object.defineProperty(e, "atomDark", {
    enumerable: !0,
    get: function() {
      return d.default;
    }
  }), Object.defineProperty(e, "base16AteliersulphurpoolLight", {
    enumerable: !0,
    get: function() {
      return f.default;
    }
  }), Object.defineProperty(e, "cb", {
    enumerable: !0,
    get: function() {
      return g.default;
    }
  }), Object.defineProperty(e, "coldarkCold", {
    enumerable: !0,
    get: function() {
      return p.default;
    }
  }), Object.defineProperty(e, "coldarkDark", {
    enumerable: !0,
    get: function() {
      return h.default;
    }
  }), Object.defineProperty(e, "coy", {
    enumerable: !0,
    get: function() {
      return n.default;
    }
  }), Object.defineProperty(e, "coyWithoutShadows", {
    enumerable: !0,
    get: function() {
      return m.default;
    }
  }), Object.defineProperty(e, "darcula", {
    enumerable: !0,
    get: function() {
      return x.default;
    }
  }), Object.defineProperty(e, "dark", {
    enumerable: !0,
    get: function() {
      return o.default;
    }
  }), Object.defineProperty(e, "dracula", {
    enumerable: !0,
    get: function() {
      return b.default;
    }
  }), Object.defineProperty(e, "duotoneDark", {
    enumerable: !0,
    get: function() {
      return y.default;
    }
  }), Object.defineProperty(e, "duotoneEarth", {
    enumerable: !0,
    get: function() {
      return w.default;
    }
  }), Object.defineProperty(e, "duotoneForest", {
    enumerable: !0,
    get: function() {
      return S.default;
    }
  }), Object.defineProperty(e, "duotoneLight", {
    enumerable: !0,
    get: function() {
      return k.default;
    }
  }), Object.defineProperty(e, "duotoneSea", {
    enumerable: !0,
    get: function() {
      return M.default;
    }
  }), Object.defineProperty(e, "duotoneSpace", {
    enumerable: !0,
    get: function() {
      return C.default;
    }
  }), Object.defineProperty(e, "funky", {
    enumerable: !0,
    get: function() {
      return r.default;
    }
  }), Object.defineProperty(e, "ghcolors", {
    enumerable: !0,
    get: function() {
      return T.default;
    }
  }), Object.defineProperty(e, "gruvboxDark", {
    enumerable: !0,
    get: function() {
      return D.default;
    }
  }), Object.defineProperty(e, "gruvboxLight", {
    enumerable: !0,
    get: function() {
      return F.default;
    }
  }), Object.defineProperty(e, "holiTheme", {
    enumerable: !0,
    get: function() {
      return $.default;
    }
  }), Object.defineProperty(e, "hopscotch", {
    enumerable: !0,
    get: function() {
      return P.default;
    }
  }), Object.defineProperty(e, "lucario", {
    enumerable: !0,
    get: function() {
      return E.default;
    }
  }), Object.defineProperty(e, "materialDark", {
    enumerable: !0,
    get: function() {
      return A.default;
    }
  }), Object.defineProperty(e, "materialLight", {
    enumerable: !0,
    get: function() {
      return _.default;
    }
  }), Object.defineProperty(e, "materialOceanic", {
    enumerable: !0,
    get: function() {
      return z.default;
    }
  }), Object.defineProperty(e, "nightOwl", {
    enumerable: !0,
    get: function() {
      return R.default;
    }
  }), Object.defineProperty(e, "nord", {
    enumerable: !0,
    get: function() {
      return N.default;
    }
  }), Object.defineProperty(e, "okaidia", {
    enumerable: !0,
    get: function() {
      return a.default;
    }
  }), Object.defineProperty(e, "oneDark", {
    enumerable: !0,
    get: function() {
      return O.default;
    }
  }), Object.defineProperty(e, "oneLight", {
    enumerable: !0,
    get: function() {
      return I.default;
    }
  }), Object.defineProperty(e, "pojoaque", {
    enumerable: !0,
    get: function() {
      return j.default;
    }
  }), Object.defineProperty(e, "prism", {
    enumerable: !0,
    get: function() {
      return u.default;
    }
  }), Object.defineProperty(e, "shadesOfPurple", {
    enumerable: !0,
    get: function() {
      return V.default;
    }
  }), Object.defineProperty(e, "solarizedDarkAtom", {
    enumerable: !0,
    get: function() {
      return W.default;
    }
  }), Object.defineProperty(e, "solarizedlight", {
    enumerable: !0,
    get: function() {
      return i.default;
    }
  }), Object.defineProperty(e, "synthwave84", {
    enumerable: !0,
    get: function() {
      return U.default;
    }
  }), Object.defineProperty(e, "tomorrow", {
    enumerable: !0,
    get: function() {
      return s.default;
    }
  }), Object.defineProperty(e, "twilight", {
    enumerable: !0,
    get: function() {
      return c.default;
    }
  }), Object.defineProperty(e, "vs", {
    enumerable: !0,
    get: function() {
      return Z.default;
    }
  }), Object.defineProperty(e, "vscDarkPlus", {
    enumerable: !0,
    get: function() {
      return K.default;
    }
  }), Object.defineProperty(e, "xonokai", {
    enumerable: !0,
    get: function() {
      return Q.default;
    }
  }), Object.defineProperty(e, "zTouch", {
    enumerable: !0,
    get: function() {
      return te.default;
    }
  });
  var n = t(X1()), o = t(Q1()), r = t(J1()), a = t(eg()), i = t(tg()), s = t(ng()), c = t(og()), u = t(rg()), l = t(ag()), d = t(ig()), f = t(sg()), g = t(lg()), p = t(cg()), h = t(ug()), m = t(dg()), x = t(fg()), b = t(gg()), y = t(pg()), w = t(hg()), S = t(mg()), k = t(bg()), M = t(yg()), C = t(vg()), T = t(xg()), D = t(wg()), F = t(Sg()), $ = t(Cg()), P = t(Eg()), E = t(_g()), A = t(kg()), _ = t(Ag()), z = t(Mg()), R = t(Tg()), N = t(Og()), O = t(Ng()), I = t(Dg()), j = t(Rg()), V = t(zg()), W = t(Ig()), U = t(Lg()), Z = t(Fg()), K = t(jg()), Q = t(Pg()), te = t(Hg());
})(nr);
const Bg = "_codeblock_tsha5_1", $g = {
  codeblock: Bg
}, Wg = "_iconButton_eti7u_1", Vg = {
  iconButton: Wg
}, qg = (e) => /* @__PURE__ */ v.jsx(as, { title: e.title, children: /* @__PURE__ */ v.jsx(
  "button",
  {
    ...e,
    className: `btn ${e.color ? `btn-${e.color}` : ""} ${e.className ?? ""} ${Vg.iconButton}`,
    type: e.type ?? "button",
    children: e.children
  }
) }), rs = qg, Ug = pt(null), Ya = {
  didCatch: !1,
  error: null
};
class Yg extends I1 {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Ya;
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
      for (var n, o, r = arguments.length, a = new Array(r), i = 0; i < r; i++)
        a[i] = arguments[i];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: a,
        reason: "imperative-api"
      }), this.setState(Ya);
    }
  }
  componentDidCatch(t, n) {
    var o, r;
    (o = (r = this.props).onError) === null || o === void 0 || o.call(r, t, n);
  }
  componentDidUpdate(t, n) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: r
    } = this.props;
    if (o && n.error !== null && Zg(t.resetKeys, r)) {
      var a, i;
      (a = (i = this.props).onReset) === null || a === void 0 || a.call(i, {
        next: r,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(Ya);
    }
  }
  render() {
    const {
      children: t,
      fallbackRender: n,
      FallbackComponent: o,
      fallback: r
    } = this.props, {
      didCatch: a,
      error: i
    } = this.state;
    let s = t;
    if (a) {
      const c = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        s = n(c);
      else if (o)
        s = nl(o, c);
      else if (r === null || Ou(r))
        s = r;
      else
        throw i;
    }
    return nl(Ug.Provider, {
      value: {
        didCatch: a,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, s);
  }
}
function Zg() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, o) => !Object.is(n, t[o]));
}
const Kg = (e) => {
  const [t, n] = fe(!1), o = () => n(!t), r = ae(
    (e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`).replace(/\s/g, "-")
  );
  return /* @__PURE__ */ v.jsxs(Yg, { fallback: /* @__PURE__ */ v.jsx("span", { id: r.current, children: e.children }), children: [
    /* @__PURE__ */ v.jsx("span", { id: r.current, children: e.children }),
    e.title ? /* @__PURE__ */ v.jsx(
      B1,
      {
        isOpen: t,
        target: r.current,
        toggle: o,
        className: e.className,
        children: e.title
      }
    ) : null
  ] });
}, as = Kg, Gg = "_loadingBtn_gadec_1", Xg = {
  loadingBtn: Gg
}, Qg = ({ loading: e, ...t }) => /* @__PURE__ */ v.jsx(
  qe,
  {
    ...t,
    disabled: e ?? t.disabled,
    className: `${t.className ?? ""} ${Xg.loadingBtn}`,
    children: e ? /* @__PURE__ */ v.jsx($1, {}) : t.children
  }
), Jg = Qg, e0 = { vs: nr.vs, "vsc-dark-plus": nr.vscDarkPlus, solarizedLight: nr.solarizedlight }, t0 = ({
  code: e,
  language: t,
  fileName: n,
  theme: o = "vs",
  showLineNumbers: r
}) => /* @__PURE__ */ v.jsxs(Eo, { className: $g.codeblock, children: [
  n ? /* @__PURE__ */ v.jsx(zu, { children: n }) : null,
  /* @__PURE__ */ v.jsx(_o, { children: /* @__PURE__ */ v.jsx(
    H1,
    {
      showLineNumbers: r,
      language: t,
      style: e0[o],
      children: e
    }
  ) })
] }), n0 = t0, Ne = {
  get: async (e, t, n) => ({}),
  post: async (e, t, n) => ({})
};
var is = /* @__PURE__ */ ((e) => (e.DBT_DOCS = "dbt-docs", e.DOCUMENTATION_EDITOR = "documentation-editor", e.SAAS = "saas", e))(is || {});
const o0 = () => {
  var t, n, o;
  const e = (o = (n = (t = window.location.hash) == null ? void 0 : t.split("#")[1]) == null ? void 0 : n.replace("!/", "")) == null ? void 0 : o.split("/");
  return { name: e == null ? void 0 : e[1], resourceType: e == null ? void 0 : e[0] };
};
var ju = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function(e, t) {
  (function(n, o) {
    e.exports = o();
  })(window, function() {
    return function(n) {
      var o = {};
      function r(a) {
        if (o[a])
          return o[a].exports;
        var i = o[a] = { i: a, l: !1, exports: {} };
        return n[a].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
      }
      return r.m = n, r.c = o, r.d = function(a, i, s) {
        r.o(a, i) || Object.defineProperty(a, i, { enumerable: !0, get: s });
      }, r.r = function(a) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 });
      }, r.t = function(a, i) {
        if (1 & i && (a = r(a)), 8 & i || 4 & i && typeof a == "object" && a && a.__esModule)
          return a;
        var s = /* @__PURE__ */ Object.create(null);
        if (r.r(s), Object.defineProperty(s, "default", { enumerable: !0, value: a }), 2 & i && typeof a != "string")
          for (var c in a)
            r.d(s, c, (function(u) {
              return a[u];
            }).bind(null, c));
        return s;
      }, r.n = function(a) {
        var i = a && a.__esModule ? function() {
          return a.default;
        } : function() {
          return a;
        };
        return r.d(i, "a", i), i;
      }, r.o = function(a, i) {
        return Object.prototype.hasOwnProperty.call(a, i);
      }, r.p = "", r(r.s = 7);
    }([function(n, o, r) {
      var a, i = this && this.__extends || (a = function(d, f) {
        return (a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(g, p) {
          g.__proto__ = p;
        } || function(g, p) {
          for (var h in p)
            Object.prototype.hasOwnProperty.call(p, h) && (g[h] = p[h]);
        })(d, f);
      }, function(d, f) {
        function g() {
          this.constructor = d;
        }
        a(d, f), d.prototype = f === null ? Object.create(f) : (g.prototype = f.prototype, new g());
      }), s = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(o, "__esModule", { value: !0 }), o.eventEmitter = o.INTERNAL_ERROR_EVENT = o.UNKNOWN_IDX = o.ROOT_IDX = o.getStylesheet = o.getDefaultOptions = o.CAMEL_DATASET_SPLIT_TYPE = o.CAMEL_DATASET_IDENTIFIER_EXTRA = o.CAMEL_DATASET_IDENTIFIER = o.DATASET_SPLIT_TYPE = o.DATASET_IDENTIFIER_EXTRA = o.DATASET_IDENTIFIER = o.STYLESHEET_ID = o.LOCAL_STORE_KEY = o.ID_DIVISION = void 0;
      var c = s(r(10)), u = s(r(2));
      o.ID_DIVISION = ";", o.LOCAL_STORE_KEY = "highlight-mengshou", o.STYLESHEET_ID = "highlight-mengshou-style", o.DATASET_IDENTIFIER = "highlight-id", o.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra", o.DATASET_SPLIT_TYPE = "highlight-split-type", o.CAMEL_DATASET_IDENTIFIER = c.default(o.DATASET_IDENTIFIER), o.CAMEL_DATASET_IDENTIFIER_EXTRA = c.default(o.DATASET_IDENTIFIER_EXTRA), o.CAMEL_DATASET_SPLIT_TYPE = c.default(o.DATASET_SPLIT_TYPE), o.getDefaultOptions = function() {
        return { $root: document || document.documentElement, exceptSelectors: null, wrapTag: "span", verbose: !1, style: { className: "highlight-mengshou-wrap" } };
      }, o.getStylesheet = function() {
        return `
    .` + o.getDefaultOptions().style.className + ` {
        background: #ff9;
        cursor: pointer;
    }
    .` + o.getDefaultOptions().style.className + `.active {
        background: #ffb;
    }
`;
      }, o.ROOT_IDX = -2, o.UNKNOWN_IDX = -1, o.INTERNAL_ERROR_EVENT = "error";
      var l = function(d) {
        function f() {
          return d !== null && d.apply(this, arguments) || this;
        }
        return i(f, d), f;
      }(u.default);
      o.eventEmitter = new l();
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 }), o.UserInputEvent = o.SelectedNodeType = o.CreateFrom = o.EventType = o.ERROR = o.SplitType = void 0, function(a) {
        a.none = "none", a.head = "head", a.tail = "tail", a.both = "both";
      }(o.SplitType || (o.SplitType = {})), function(a) {
        a.DOM_TYPE_ERROR = "[DOM] Receive wrong node type.", a.DOM_SELECTION_EMPTY = "[DOM] The selection contains no dom node, may be you except them.", a.RANGE_INVALID = "[RANGE] Got invalid dom range, can't convert to a valid highlight range.", a.RANGE_NODE_INVALID = "[RANGE] Start or end node isn't a text node, it may occur an error.", a.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict.", a.CACHE_SET_ERROR = "[CACHE] Cache.data can't be set manually, please use .save().", a.SOURCE_TYPE_ERROR = "[SOURCE] Object isn't a highlight source instance.", a.HIGHLIGHT_RANGE_FROZEN = "[HIGHLIGHT_RANGE] A highlight range must be frozen before render.", a.HIGHLIGHT_SOURCE_RECREATE = "[HIGHLIGHT_SOURCE] Recreate highlights from sources error.", a.HIGHLIGHT_SOURCE_NONE_RENDER = "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.";
      }(o.ERROR || (o.ERROR = {})), function(a) {
        a.CREATE = "selection:create", a.REMOVE = "selection:remove", a.MODIFY = "selection:modify", a.HOVER = "selection:hover", a.HOVER_OUT = "selection:hover-out", a.CLICK = "selection:click";
      }(o.EventType || (o.EventType = {})), function(a) {
        a.STORE = "from-store", a.INPUT = "from-input";
      }(o.CreateFrom || (o.CreateFrom = {})), function(a) {
        a.text = "text", a.span = "span";
      }(o.SelectedNodeType || (o.SelectedNodeType = {})), function(a) {
        a.touchend = "touchend", a.mouseup = "mouseup", a.touchstart = "touchstart", a.click = "click", a.mouseover = "mouseover";
      }(o.UserInputEvent || (o.UserInputEvent = {}));
    }, function(n, o, r) {
      var a = this && this.__read || function(c, u) {
        var l = typeof Symbol == "function" && c[Symbol.iterator];
        if (!l)
          return c;
        var d, f, g = l.call(c), p = [];
        try {
          for (; (u === void 0 || u-- > 0) && !(d = g.next()).done; )
            p.push(d.value);
        } catch (h) {
          f = { error: h };
        } finally {
          try {
            d && !d.done && (l = g.return) && l.call(g);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return p;
      }, i = this && this.__spread || function() {
        for (var c = [], u = 0; u < arguments.length; u++)
          c = c.concat(a(arguments[u]));
        return c;
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var s = function() {
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
            f.apply(void 0, i(l));
          }), this;
        }, c;
      }();
      o.default = s;
    }, function(n, o, r) {
      var a = this && this.__importDefault || function(u) {
        return u && u.__esModule ? u : { default: u };
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var i = a(r(5)), s = r(9), c = function() {
        function u(l, d, f, g, p) {
          this.startMeta = l, this.endMeta = d, this.text = f, this.id = g, this.__isHighlightSource = {}, p && (this.extra = p);
        }
        return u.prototype.deSerialize = function(l, d) {
          var f = s.queryElementNode(this, l), g = f.start, p = f.end, h = s.getTextChildByOffset(g, this.startMeta.textOffset), m = s.getTextChildByOffset(p, this.endMeta.textOffset);
          if (!d.Serialize.Restore.isEmpty()) {
            var x = d.Serialize.Restore.call(this, h, m) || [];
            h = x[0] || h, m = x[1] || m;
          }
          return new i.default(h, m, this.text, this.id, !0);
        }, u;
      }();
      o.default = c;
    }, function(n, o, r) {
      var a = this && this.__values || function(l) {
        var d = typeof Symbol == "function" && Symbol.iterator, f = d && l[d], g = 0;
        if (f)
          return f.call(l);
        if (l && typeof l.length == "number")
          return { next: function() {
            return l && g >= l.length && (l = void 0), { value: l && l[g++], done: !l };
          } };
        throw new TypeError(d ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, i = this && this.__read || function(l, d) {
        var f = typeof Symbol == "function" && l[Symbol.iterator];
        if (!f)
          return l;
        var g, p, h = f.call(l), m = [];
        try {
          for (; (d === void 0 || d-- > 0) && !(g = h.next()).done; )
            m.push(g.value);
        } catch (x) {
          p = { error: x };
        } finally {
          try {
            g && !g.done && (f = h.return) && f.call(h);
          } finally {
            if (p)
              throw p.error;
          }
        }
        return m;
      }, s = this && this.__spread || function() {
        for (var l = [], d = 0; d < arguments.length; d++)
          l = l.concat(i(arguments[d]));
        return l;
      };
      Object.defineProperty(o, "__esModule", { value: !0 }), o.hasClass = o.removeAllClass = o.removeClass = o.addClass = o.addEventListener = o.removeEventListener = o.forEach = o.getHighlightById = o.getHighlightsByRoot = o.getExtraHighlightId = o.getHighlightId = o.isHighlightWrapNode = void 0;
      var c = r(0);
      o.isHighlightWrapNode = function(l) {
        return !!l.dataset && !!l.dataset[c.CAMEL_DATASET_IDENTIFIER];
      };
      var u = function(l, d) {
        for (var f = !1, g = null; l; ) {
          if (o.isHighlightWrapNode(l) && (g = l), l === d) {
            f = !0;
            break;
          }
          l = l.parentNode;
        }
        return f ? g : null;
      };
      o.getHighlightId = function(l, d) {
        return (l = u(l, d)) ? l.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
      }, o.getExtraHighlightId = function(l, d) {
        return (l = u(l, d)) ? l.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA].split(c.ID_DIVISION).filter(function(f) {
          return f;
        }) : [];
      }, o.getHighlightsByRoot = function(l, d) {
        var f, g;
        Array.isArray(l) || (l = [l]);
        var p = [];
        try {
          for (var h = a(l), m = h.next(); !m.done; m = h.next()) {
            var x = m.value.querySelectorAll(d + "[data-" + c.DATASET_IDENTIFIER + "]");
            p.push.apply(p, x);
          }
        } catch (b) {
          f = { error: b };
        } finally {
          try {
            m && !m.done && (g = h.return) && g.call(h);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return p;
      }, o.getHighlightById = function(l, d, f) {
        var g, p, h = [], m = new RegExp("(" + d + "\\" + c.ID_DIVISION + "|\\" + c.ID_DIVISION + "?" + d + "$)"), x = l.querySelectorAll(f + "[data-" + c.DATASET_IDENTIFIER + "]");
        try {
          for (var b = a(x), y = b.next(); !y.done; y = b.next()) {
            var w = y.value;
            if (w.dataset[c.CAMEL_DATASET_IDENTIFIER] !== d) {
              var S = w.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
              m.test(S) && h.push(w);
            } else
              h.push(w);
          }
        } catch (k) {
          g = { error: k };
        } finally {
          try {
            y && !y.done && (p = b.return) && p.call(b);
          } finally {
            if (g)
              throw g.error;
          }
        }
        return h;
      }, o.forEach = function(l, d) {
        for (var f = 0; f < l.length; f++)
          d(l[f], f, l);
      }, o.removeEventListener = function(l, d, f) {
        l.removeEventListener(d, f);
      }, o.addEventListener = function(l, d, f) {
        return l.addEventListener(d, f), function() {
          o.removeEventListener(l, d, f);
        };
      }, o.addClass = function(l, d) {
        var f;
        Array.isArray(d) || (d = [d]), (f = l.classList).add.apply(f, s(d));
      }, o.removeClass = function(l, d) {
        l.classList.remove(d);
      }, o.removeAllClass = function(l) {
        l.className = "";
      }, o.hasClass = function(l, d) {
        return l.classList.contains(d);
      };
    }, function(n, o, r) {
      var a = this && this.__importDefault || function(g) {
        return g && g.__esModule ? g : { default: g };
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var i = a(r(3)), s = r(1), c = r(11), u = a(r(6)), l = r(12), d = r(0), f = function() {
        function g(p, h, m, x, b) {
          b === void 0 && (b = !1), p.$node.nodeType === 3 && h.$node.nodeType === 3 || d.eventEmitter.emit(d.INTERNAL_ERROR_EVENT, { type: s.ERROR.RANGE_NODE_INVALID }), this.start = l.formatDomNode(p), this.end = l.formatDomNode(h), this.text = m, this.frozen = b, this.id = x;
        }
        return g.fromSelection = function(p) {
          var h = c.getDomRange();
          if (!h)
            return null;
          var m = { $node: h.startContainer, offset: h.startOffset }, x = { $node: h.endContainer, offset: h.endOffset }, b = h.toString(), y = p.call(m, x, b);
          return new g(m, x, b, y = y ?? u.default());
        }, g.prototype.serialize = function(p, h) {
          var m, x = l.getDomMeta(this.start.$node, this.start.offset, p), b = l.getDomMeta(this.end.$node, this.end.offset, p);
          return h.Serialize.RecordInfo.isEmpty() || (m = h.Serialize.RecordInfo.call(this.start, this.end, p)), this.frozen = !0, new i.default(x, b, this.text, this.id, m);
        }, g.removeDomRange = c.removeSelection, g;
      }();
      o.default = f;
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 }), o.default = function a(i) {
        return i ? (i ^ 16 * Math.random() >> i / 4).toString(16) : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, a);
      };
    }, function(n, o, r) {
      n.exports = r(8);
    }, function(n, o, r) {
      var a, i = this && this.__extends || (a = function(S, k) {
        return (a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(M, C) {
          M.__proto__ = C;
        } || function(M, C) {
          for (var T in C)
            Object.prototype.hasOwnProperty.call(C, T) && (M[T] = C[T]);
        })(S, k);
      }, function(S, k) {
        function M() {
          this.constructor = S;
        }
        a(S, k), S.prototype = k === null ? Object.create(k) : (M.prototype = k.prototype, new M());
      }), s = this && this.__assign || function() {
        return (s = Object.assign || function(S) {
          for (var k, M = 1, C = arguments.length; M < C; M++)
            for (var T in k = arguments[M])
              Object.prototype.hasOwnProperty.call(k, T) && (S[T] = k[T]);
          return S;
        }).apply(this, arguments);
      }, c = this && this.__importDefault || function(S) {
        return S && S.__esModule ? S : { default: S };
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var u = c(r(2)), l = c(r(5)), d = c(r(3)), f = c(r(6)), g = c(r(13)), p = c(r(14)), h = c(r(16)), m = c(r(17)), x = r(0), b = r(1), y = r(4), w = function(S) {
        function k(M) {
          var C = S.call(this) || this;
          C.event = p.default(), C.run = function() {
            return y.addEventListener(C.options.$root, C.event.PointerEnd, C._handleSelection);
          }, C.stop = function() {
            y.removeEventListener(C.options.$root, C.event.PointerEnd, C._handleSelection);
          }, C.addClass = function(D, F) {
            C.getDoms(F).forEach(function($) {
              y.addClass($, D);
            });
          }, C.removeClass = function(D, F) {
            C.getDoms(F).forEach(function($) {
              y.removeClass($, D);
            });
          }, C.getIdByDom = function(D) {
            return y.getHighlightId(D, C.options.$root);
          }, C.getExtraIdByDom = function(D) {
            return y.getExtraHighlightId(D, C.options.$root);
          }, C.getDoms = function(D) {
            return D ? y.getHighlightById(C.options.$root, D, C.options.wrapTag) : y.getHighlightsByRoot(C.options.$root, C.options.wrapTag);
          }, C.dispose = function() {
            var D = C.options.$root;
            y.removeEventListener(D, C.event.PointerOver, C._handleHighlightHover), y.removeEventListener(D, C.event.PointerEnd, C._handleSelection), y.removeEventListener(D, C.event.PointerTap, C._handleHighlightClick), C.removeAll();
          }, C.setOption = function(D) {
            C.options = s(s({}, C.options), D), C.painter = new m.default({ $root: C.options.$root, wrapTag: C.options.wrapTag, className: C.options.style.className, exceptSelectors: C.options.exceptSelectors }, C.hooks);
          }, C.fromRange = function(D) {
            var F = { $node: D.startContainer, offset: D.startOffset }, $ = { $node: D.endContainer, offset: D.endOffset }, P = D.toString(), E = C.hooks.Render.UUID.call(F, $, P);
            E = E ?? f.default();
            var A = new l.default(F, $, P, E);
            return A ? C._highlightFromHRange(A) : (x.eventEmitter.emit(x.INTERNAL_ERROR_EVENT, { type: b.ERROR.RANGE_INVALID }), null);
          }, C.fromStore = function(D, F, $, P, E) {
            var A = new d.default(D, F, $, P, E);
            try {
              return C._highlightFromHSource(A), A;
            } catch (_) {
              return x.eventEmitter.emit(x.INTERNAL_ERROR_EVENT, { type: b.ERROR.HIGHLIGHT_SOURCE_RECREATE, error: _, detail: A }), null;
            }
          }, C._getHooks = function() {
            return { Render: { UUID: new g.default("Render.UUID"), SelectedNodes: new g.default("Render.SelectedNodes"), WrapNode: new g.default("Render.WrapNode") }, Serialize: { Restore: new g.default("Serialize.Restore"), RecordInfo: new g.default("Serialize.RecordInfo") }, Remove: { UpdateNodes: new g.default("Remove.UpdateNodes") } };
          }, C._highlightFromHRange = function(D) {
            var F = D.serialize(C.options.$root, C.hooks);
            return C.painter.highlightRange(D).length === 0 ? (x.eventEmitter.emit(x.INTERNAL_ERROR_EVENT, { type: b.ERROR.DOM_SELECTION_EMPTY }), null) : (C.cache.save(F), C.emit(b.EventType.CREATE, { sources: [F], type: b.CreateFrom.INPUT }, C), F);
          }, C._handleSelection = function() {
            var D = l.default.fromSelection(C.hooks.Render.UUID);
            D && (C._highlightFromHRange(D), l.default.removeDomRange());
          }, C._handleHighlightHover = function(D) {
            var F = D.target;
            if (!y.isHighlightWrapNode(F))
              return C._hoverId && C.emit(b.EventType.HOVER_OUT, { id: C._hoverId }, C, D), void (C._hoverId = null);
            var $ = y.getHighlightId(F, C.options.$root);
            C._hoverId !== $ && (C._hoverId && C.emit(b.EventType.HOVER_OUT, { id: C._hoverId }, C, D), C._hoverId = $, C.emit(b.EventType.HOVER, { id: C._hoverId }, C, D));
          }, C._handleError = function(D) {
            C.options.verbose && console.warn(D);
          }, C._handleHighlightClick = function(D) {
            var F = D.target;
            if (y.isHighlightWrapNode(F)) {
              var $ = y.getHighlightId(F, C.options.$root);
              C.emit(b.EventType.CLICK, { id: $ }, C, D);
            }
          }, C.options = x.getDefaultOptions(), C.hooks = C._getHooks(), C.setOption(M), C.cache = new h.default();
          var T = C.options.$root;
          return y.addEventListener(T, C.event.PointerOver, C._handleHighlightHover), y.addEventListener(T, C.event.PointerTap, C._handleHighlightClick), x.eventEmitter.on(x.INTERNAL_ERROR_EVENT, C._handleError), C;
        }
        return i(k, S), k.prototype.remove = function(M) {
          if (M) {
            var C = this.painter.removeHighlight(M);
            this.cache.remove(M), C && this.emit(b.EventType.REMOVE, { ids: [M] }, this);
          }
        }, k.prototype.removeAll = function() {
          this.painter.removeAllHighlight();
          var M = this.cache.removeAll();
          this.emit(b.EventType.REMOVE, { ids: M }, this);
        }, k.prototype._highlightFromHSource = function(M) {
          M === void 0 && (M = []);
          var C = this.painter.highlightSource(M);
          this.emit(b.EventType.CREATE, { sources: C, type: b.CreateFrom.STORE }, this), this.cache.save(M);
        }, k.event = b.EventType, k.isHighlightWrapNode = y.isHighlightWrapNode, k.isHighlightSource = function(M) {
          return !!M.__isHighlightSource;
        }, k;
      }(u.default);
      o.default = w;
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 }), o.queryElementNode = o.getTextChildByOffset = void 0;
      var a = r(0);
      o.getTextChildByOffset = function(i, s) {
        for (var c = [i], u = null, l = 0, d = 0; u = c.pop(); ) {
          for (var f = u.childNodes, g = f.length - 1; g >= 0; g--)
            c.push(f[g]);
          if (u.nodeType === 3 && (d = s - l, (l += u.textContent.length) >= s))
            break;
        }
        return u || (u = i), { $node: u, offset: d };
      }, o.queryElementNode = function(i, s) {
        return { start: i.startMeta.parentIndex === a.ROOT_IDX ? s : s.getElementsByTagName(i.startMeta.parentTagName)[i.startMeta.parentIndex], end: i.endMeta.parentIndex === a.ROOT_IDX ? s : s.getElementsByTagName(i.endMeta.parentTagName)[i.endMeta.parentIndex] };
      };
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 }), o.default = function(a) {
        return a.split("-").reduce(function(i, s, c) {
          return i + (c === 0 ? s : s[0].toUpperCase() + s.slice(1));
        }, "");
      };
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 }), o.removeSelection = o.getDomRange = void 0, o.getDomRange = function() {
        var a = window.getSelection();
        return a.isCollapsed ? (console.debug("no text selected"), null) : a.getRangeAt(0);
      }, o.removeSelection = function() {
        window.getSelection().removeAllRanges();
      };
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 }), o.formatDomNode = o.getDomMeta = void 0;
      var a = r(0);
      o.getDomMeta = function(i, s, c) {
        var u = function(f) {
          if (f instanceof HTMLElement && (!f.dataset || !f.dataset[a.CAMEL_DATASET_IDENTIFIER]))
            return f;
          for (var g = f.parentNode; g != null && g.dataset[a.CAMEL_DATASET_IDENTIFIER]; )
            g = g.parentNode;
          return g;
        }(i), l = u === c ? a.ROOT_IDX : function(f, g) {
          for (var p = f.tagName, h = g.getElementsByTagName(p), m = 0; m < h.length; m++)
            if (f === h[m])
              return m;
          return a.UNKNOWN_IDX;
        }(u, c), d = function(f, g) {
          for (var p = [f], h = null, m = 0; h = p.pop(); ) {
            for (var x = h.childNodes, b = x.length - 1; b >= 0; b--)
              p.push(x[b]);
            if (h.nodeType === 3 && h !== g)
              m += h.textContent.length;
            else if (h.nodeType === 3)
              break;
          }
          return m;
        }(u, i);
        return { parentTagName: u.tagName, parentIndex: l, textOffset: d + s };
      }, o.formatDomNode = function(i) {
        return i.$node.nodeType === 3 || i.$node.nodeType === 4 || i.$node.nodeType === 8 ? i : { $node: i.$node.childNodes[i.offset], offset: 0 };
      };
    }, function(n, o, r) {
      var a = this && this.__read || function(c, u) {
        var l = typeof Symbol == "function" && c[Symbol.iterator];
        if (!l)
          return c;
        var d, f, g = l.call(c), p = [];
        try {
          for (; (u === void 0 || u-- > 0) && !(d = g.next()).done; )
            p.push(d.value);
        } catch (h) {
          f = { error: h };
        } finally {
          try {
            d && !d.done && (l = g.return) && l.call(g);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return p;
      }, i = this && this.__spread || function() {
        for (var c = [], u = 0; u < arguments.length; u++)
          c = c.concat(a(arguments[u]));
        return c;
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var s = function() {
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
            u = f.apply(void 0, i(l));
          }), u;
        }, c;
      }();
      o.default = s;
    }, function(n, o, r) {
      var a = this && this.__importDefault || function(c) {
        return c && c.__esModule ? c : { default: c };
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var i = r(1), s = a(r(15));
      o.default = function() {
        var c = s.default(window.navigator.userAgent);
        return { PointerEnd: c ? i.UserInputEvent.touchend : i.UserInputEvent.mouseup, PointerTap: c ? i.UserInputEvent.touchstart : i.UserInputEvent.click, PointerOver: c ? i.UserInputEvent.touchstart : i.UserInputEvent.mouseover };
      };
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 });
      var a = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
      o.default = function(i) {
        return a.test(i);
      };
    }, function(n, o, r) {
      var a, i = this && this.__extends || (a = function(f, g) {
        return (a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, h) {
          p.__proto__ = h;
        } || function(p, h) {
          for (var m in h)
            Object.prototype.hasOwnProperty.call(h, m) && (p[m] = h[m]);
        })(f, g);
      }, function(f, g) {
        function p() {
          this.constructor = f;
        }
        a(f, g), f.prototype = g === null ? Object.create(g) : (p.prototype = g.prototype, new p());
      }), s = this && this.__values || function(f) {
        var g = typeof Symbol == "function" && Symbol.iterator, p = g && f[g], h = 0;
        if (p)
          return p.call(f);
        if (f && typeof f.length == "number")
          return { next: function() {
            return f && h >= f.length && (f = void 0), { value: f && f[h++], done: !f };
          } };
        throw new TypeError(g ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, c = this && this.__importDefault || function(f) {
        return f && f.__esModule ? f : { default: f };
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var u = c(r(2)), l = r(1), d = function(f) {
        function g() {
          var p = f !== null && f.apply(this, arguments) || this;
          return p._data = /* @__PURE__ */ new Map(), p;
        }
        return i(g, f), Object.defineProperty(g.prototype, "data", { get: function() {
          return this.getAll();
        }, set: function(p) {
          throw l.ERROR.CACHE_SET_ERROR;
        }, enumerable: !1, configurable: !0 }), g.prototype.save = function(p) {
          var h = this;
          Array.isArray(p) ? p.forEach(function(m) {
            return h._data.set(m.id, m);
          }) : this._data.set(p.id, p);
        }, g.prototype.get = function(p) {
          return this._data.get(p);
        }, g.prototype.remove = function(p) {
          this._data.delete(p);
        }, g.prototype.getAll = function() {
          var p, h, m = [];
          try {
            for (var x = s(this._data), b = x.next(); !b.done; b = x.next()) {
              var y = b.value;
              m.push(y[1]);
            }
          } catch (w) {
            p = { error: w };
          } finally {
            try {
              b && !b.done && (h = x.return) && h.call(x);
            } finally {
              if (p)
                throw p.error;
            }
          }
          return m;
        }, g.prototype.removeAll = function() {
          var p, h, m = [];
          try {
            for (var x = s(this._data), b = x.next(); !b.done; b = x.next()) {
              var y = b.value;
              m.push(y[0]);
            }
          } catch (w) {
            p = { error: w };
          } finally {
            try {
              b && !b.done && (h = x.return) && h.call(x);
            } finally {
              if (p)
                throw p.error;
            }
          }
          return this._data = /* @__PURE__ */ new Map(), m;
        }, g;
      }(u.default);
      o.default = d;
    }, function(n, o, r) {
      var a = this && this.__values || function(m) {
        var x = typeof Symbol == "function" && Symbol.iterator, b = x && m[x], y = 0;
        if (b)
          return b.call(m);
        if (m && typeof m.length == "number")
          return { next: function() {
            return m && y >= m.length && (m = void 0), { value: m && m[y++], done: !m };
          } };
        throw new TypeError(x ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, i = this && this.__read || function(m, x) {
        var b = typeof Symbol == "function" && m[Symbol.iterator];
        if (!b)
          return m;
        var y, w, S = b.call(m), k = [];
        try {
          for (; (x === void 0 || x-- > 0) && !(y = S.next()).done; )
            k.push(y.value);
        } catch (M) {
          w = { error: M };
        } finally {
          try {
            y && !y.done && (b = S.return) && b.call(S);
          } finally {
            if (w)
              throw w.error;
          }
        }
        return k;
      }, s = this && this.__spread || function() {
        for (var m = [], x = 0; x < arguments.length; x++)
          m = m.concat(i(arguments[x]));
        return m;
      }, c = this && this.__importDefault || function(m) {
        return m && m.__esModule ? m : { default: m };
      };
      Object.defineProperty(o, "__esModule", { value: !0 });
      var u = c(r(3)), l = r(18), d = r(4), f = r(1), g = r(20), p = r(0), h = function() {
        function m(x, b) {
          this.options = { $root: x.$root, wrapTag: x.wrapTag, exceptSelectors: x.exceptSelectors, className: x.className }, this.hooks = b, g.initDefaultStylesheet();
        }
        return m.prototype.highlightRange = function(x) {
          var b = this;
          if (!x.frozen)
            throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
          var y = this.options, w = y.$root, S = y.className, k = y.exceptSelectors, M = this.hooks, C = l.getSelectedNodes(w, x.start, x.end, k);
          return M.Render.SelectedNodes.isEmpty() || (C = M.Render.SelectedNodes.call(x.id, C) || []), C.map(function(T) {
            var D = l.wrapHighlight(T, x, S, b.options.wrapTag);
            return M.Render.WrapNode.isEmpty() || (D = M.Render.WrapNode.call(x.id, D)), D;
          });
        }, m.prototype.highlightSource = function(x) {
          var b = this, y = Array.isArray(x) ? x : [x], w = [];
          return y.forEach(function(S) {
            if (S instanceof u.default) {
              var k = S.deSerialize(b.options.$root, b.hooks);
              b.highlightRange(k).length > 0 ? w.push(S) : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, { type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER, detail: S });
            } else
              p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, { type: f.ERROR.SOURCE_TYPE_ERROR });
          }), w;
        }, m.prototype.removeHighlight = function(x) {
          var b, y, w = new RegExp("(" + x + "\\" + p.ID_DIVISION + "|\\" + p.ID_DIVISION + "?" + x + "$)"), S = this.hooks, k = this.options.wrapTag, M = document.querySelectorAll(k + "[data-" + p.DATASET_IDENTIFIER + "]"), C = [], T = [], D = [];
          try {
            for (var F = a(M), $ = F.next(); !$.done; $ = F.next()) {
              var P = $.value, E = P.dataset[p.CAMEL_DATASET_IDENTIFIER], A = P.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
              E !== x || A ? E === x ? T.push(P) : E !== x && w.test(A) && D.push(P) : C.push(P);
            }
          } catch (_) {
            b = { error: _ };
          } finally {
            try {
              $ && !$.done && (y = F.return) && y.call(F);
            } finally {
              if (b)
                throw b.error;
            }
          }
          return C.forEach(function(_) {
            var z = _.parentNode, R = document.createDocumentFragment();
            d.forEach(_.childNodes, function(I) {
              return R.appendChild(I.cloneNode(!1));
            });
            var N = _.previousSibling, O = _.nextSibling;
            z.replaceChild(R, _), l.normalizeSiblingText(N, !0), l.normalizeSiblingText(O, !1), S.Remove.UpdateNodes.call(x, _, "remove");
          }), T.forEach(function(_) {
            var z = _.dataset, R = z[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(p.ID_DIVISION), N = R.shift(), O = document.querySelector(k + "[data-" + p.DATASET_IDENTIFIER + '="' + N + '"]');
            O && (d.removeAllClass(_), d.addClass(_, s(O.classList))), z[p.CAMEL_DATASET_IDENTIFIER] = N, z[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = R.join(p.ID_DIVISION), S.Remove.UpdateNodes.call(x, _, "id-update");
          }), D.forEach(function(_) {
            var z = _.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
            _.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = z.replace(w, ""), S.Remove.UpdateNodes.call(x, _, "extra-update");
          }), C.length + T.length + D.length !== 0;
        }, m.prototype.removeAllHighlight = function() {
          var x = this.options, b = x.wrapTag, y = x.$root;
          d.getHighlightsByRoot(y, b).forEach(function(w) {
            var S = w.parentNode, k = document.createDocumentFragment();
            d.forEach(w.childNodes, function(M) {
              return k.appendChild(M.cloneNode(!1));
            }), S.replaceChild(k, w);
          });
        }, m;
      }();
      o.default = h;
    }, function(n, o, r) {
      var a = this && this.__read || function(p, h) {
        var m = typeof Symbol == "function" && p[Symbol.iterator];
        if (!m)
          return p;
        var x, b, y = m.call(p), w = [];
        try {
          for (; (h === void 0 || h-- > 0) && !(x = y.next()).done; )
            w.push(x.value);
        } catch (S) {
          b = { error: S };
        } finally {
          try {
            x && !x.done && (m = y.return) && m.call(y);
          } finally {
            if (b)
              throw b.error;
          }
        }
        return w;
      }, i = this && this.__spread || function() {
        for (var p = [], h = 0; h < arguments.length; h++)
          p = p.concat(a(arguments[h]));
        return p;
      };
      Object.defineProperty(o, "__esModule", { value: !0 }), o.normalizeSiblingText = o.wrapHighlight = o.getSelectedNodes = void 0;
      var s = r(1), c = r(4), u = r(0), l = r(19), d = function(p, h) {
        if (!p)
          return !1;
        if (/^\./.test(h)) {
          var m = h.replace(/^\./, "");
          return p && c.hasClass(p, m);
        }
        if (/^#/.test(h)) {
          var x = h.replace(/^#/, "");
          return p && p.id === x;
        }
        var b = h.toUpperCase();
        return p && p.tagName === b;
      };
      o.getSelectedNodes = function(p, h, m, x) {
        var b = h.$node, y = m.$node, w = h.offset, S = m.offset;
        if (b === y && b instanceof Text)
          return function(E, A, _, z) {
            for (var R = E, N = function(I) {
              return z == null ? void 0 : z.some(function(j) {
                return d(I, j);
              });
            }; R; ) {
              if (R.nodeType === 1 && N(R))
                return [];
              R = R.parentNode;
            }
            E.splitText(A);
            var O = E.nextSibling;
            return O.splitText(_ - A), [{ $node: O, type: s.SelectedNodeType.text, splitType: s.SplitType.both }];
          }(b, w, S, x);
        for (var k = [p], M = [], C = function(E) {
          return x == null ? void 0 : x.some(function(A) {
            return d(E, A);
          });
        }, T = !1, D = null; D = k.pop(); )
          if (D.nodeType !== 1 || !C(D)) {
            for (var F = D.childNodes, $ = F.length - 1; $ >= 0; $--)
              k.push(F[$]);
            if (D === b) {
              if (D.nodeType === 3) {
                D.splitText(w);
                var P = D.nextSibling;
                M.push({ $node: P, type: s.SelectedNodeType.text, splitType: s.SplitType.head });
              }
              T = !0;
            } else {
              if (D === y) {
                D.nodeType === 3 && ((P = D).splitText(S), M.push({ $node: P, type: s.SelectedNodeType.text, splitType: s.SplitType.tail }));
                break;
              }
              T && D.nodeType === 3 && M.push({ $node: D, type: s.SelectedNodeType.text, splitType: s.SplitType.none });
            }
          }
        return M;
      };
      var f = function(p, h) {
        var m = Array.isArray(h) ? h : [h];
        return (m = m.length === 0 ? [u.getDefaultOptions().style.className] : m).forEach(function(x) {
          c.addClass(p, x);
        }), p;
      }, g = function(p) {
        return !p || !p.textContent;
      };
      o.wrapHighlight = function(p, h, m, x) {
        var b = p.$node.parentNode, y = p.$node.previousSibling, w = p.$node.nextSibling;
        return c.isHighlightWrapNode(b) ? !c.isHighlightWrapNode(b) || g(y) && g(w) ? function(S, k, M) {
          var C = S.$node.parentNode, T = C;
          c.removeAllClass(T), f(T, M);
          var D = C.dataset, F = D[u.CAMEL_DATASET_IDENTIFIER];
          return D[u.CAMEL_DATASET_IDENTIFIER] = k.id, D[u.CAMEL_DATASET_IDENTIFIER_EXTRA] = D[u.CAMEL_DATASET_IDENTIFIER_EXTRA] ? F + u.ID_DIVISION + D[u.CAMEL_DATASET_IDENTIFIER_EXTRA] : F, T;
        }(p, h, m) : function(S, k, M, C) {
          var T = document.createElement(C), D = S.$node.parentNode, F = S.$node.previousSibling, $ = S.$node.nextSibling, P = document.createDocumentFragment(), E = D.dataset[u.CAMEL_DATASET_IDENTIFIER], A = D.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA], _ = A ? E + u.ID_DIVISION + A : E;
          T.setAttribute("data-" + u.DATASET_IDENTIFIER, k.id), T.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, _), T.appendChild(S.$node.cloneNode(!1));
          var z, R = !1, N = !1;
          F && ((O = D.cloneNode(!1)).textContent = F.textContent, P.appendChild(O), R = !0);
          var O, I = [];
          return Array.isArray(M) ? I.push.apply(I, i(M)) : I.push(M), f(T, l.unique(I)), P.appendChild(T), $ && ((O = D.cloneNode(!1)).textContent = $.textContent, P.appendChild(O), N = !0), z = R && N ? s.SplitType.both : R ? s.SplitType.head : N ? s.SplitType.tail : s.SplitType.none, T.setAttribute("data-" + u.DATASET_SPLIT_TYPE, z), D.parentNode.replaceChild(P, D), T;
        }(p, h, m, x) : function(S, k, M, C) {
          var T = document.createElement(C);
          return f(T, M), T.appendChild(S.$node.cloneNode(!1)), S.$node.parentNode.replaceChild(T, S.$node), T.setAttribute("data-" + u.DATASET_IDENTIFIER, k.id), T.setAttribute("data-" + u.DATASET_SPLIT_TYPE, S.splitType), T.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, ""), T;
        }(p, h, m, x);
      }, o.normalizeSiblingText = function(p, h) {
        if (h === void 0 && (h = !0), p && p.nodeType === 3) {
          var m = h ? p.nextSibling : p.previousSibling;
          if (m.nodeType === 3) {
            var x = m.nodeValue;
            p.nodeValue = h ? p.nodeValue + x : x + p.nodeValue, m.parentNode.removeChild(m);
          }
        }
      };
    }, function(n, o, r) {
      var a = this && this.__values || function(i) {
        var s = typeof Symbol == "function" && Symbol.iterator, c = s && i[s], u = 0;
        if (c)
          return c.call(i);
        if (i && typeof i.length == "number")
          return { next: function() {
            return i && u >= i.length && (i = void 0), { value: i && i[u++], done: !i };
          } };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(o, "__esModule", { value: !0 }), o.unique = void 0, o.unique = function(i) {
        var s, c, u = [];
        try {
          for (var l = a(i), d = l.next(); !d.done; d = l.next()) {
            var f = d.value;
            u.indexOf(f) === -1 && u.push(f);
          }
        } catch (g) {
          s = { error: g };
        } finally {
          try {
            d && !d.done && (c = l.return) && c.call(l);
          } finally {
            if (s)
              throw s.error;
          }
        }
        return u;
      };
    }, function(n, o, r) {
      Object.defineProperty(o, "__esModule", { value: !0 }), o.initDefaultStylesheet = void 0;
      var a = r(0);
      o.initDefaultStylesheet = function() {
        var i = a.STYLESHEET_ID, s = document.getElementById(i);
        if (!s) {
          var c = document.createTextNode(a.getStylesheet());
          (s = document.createElement("style")).id = i, s.appendChild(c), document.head.appendChild(s);
        }
        return s;
      };
    }]).default;
  });
})(ju);
var r0 = ju.exports;
const Pu = /* @__PURE__ */ mn(r0), Rr = "altimate-display-", a0 = `${Rr}-highlight`, Kl = `${Rr}-highlight-hover`, i0 = `${Rr}-active-highlight`, s0 = 1049, kn = new Pu({
  style: {
    className: a0
  }
  // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
}), ss = new Pu({
  style: {
    className: i0
  }
  // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
}), Hu = (e, t) => t.filter(
  (n) => {
    var o;
    return ((o = n.$node.nodeValue) == null ? void 0 : o.trim()) !== "";
  }
), Bu = (e, t, n) => {
  const o = t, r = n, a = ["BR", "HR"];
  return a.includes(o.$node.nodeName) && o.$node.parentNode && (o.$node = o.$node.parentNode), a.includes(r.$node.nodeName) && r.$node.parentNode && (r.$node = r.$node.parentNode), [o, r];
};
kn.hooks.Render.SelectedNodes.tap(Hu);
kn.hooks.Serialize.Restore.tap(Bu);
ss.hooks.Render.SelectedNodes.tap(Hu);
ss.hooks.Serialize.Restore.tap(Bu);
kn.on("selection:hover", ({ id: e }) => {
  kn.addClass(Kl, e);
}).on("selection:hover-out", ({ id: e }) => {
  kn.removeClass(Kl, e);
});
const l0 = (e) => {
  var t, n;
  return (t = e.meta) != null && t.highlight ? JSON.parse((n = e.meta) == null ? void 0 : n.highlight) : null;
}, c0 = (e) => {
  const t = l0(e);
  t && (kn.remove(t.id), ss.remove(t.id));
}, ls = () => {
  var n, o;
  const e = cs(), t = (e == null ? void 0 : e[1]) === "analysis" ? document.getElementById("sql") : document.getElementById("code");
  return (o = (n = t == null ? void 0 : t.parentElement) == null ? void 0 : n.querySelector("code-block")) == null ? void 0 : o.querySelector("code.ng-binding.highlight");
}, cs = () => {
  var t;
  return (t = window.location.hash.split("#").find((n) => n.startsWith("!"))) == null ? void 0 : t.split("/");
}, us = () => document.querySelector(
  '[marked="model.description"]'
), u0 = (e) => {
  var t, n, o;
  return e.field ? e.column ? (n = (t = Array.from(
    document.querySelectorAll(
      "column-details tr:not(.ng-hide) td:first-child"
    )
  ).find((a) => a.innerText === e.column)) == null ? void 0 : t.parentElement) == null ? void 0 : n.querySelector("td:nth-child(3)") : (o = us()) == null ? void 0 : o.firstChild : ls();
}, d0 = (e) => {
  if (e.getAttribute("marked") === "model.description")
    return "description";
}, f0 = (e, t, n, o, r) => {
  if (e === "description")
    return {
      start: 0,
      end: 0,
      x: 0,
      y: 0
    };
  const a = t.querySelectorAll(".line-numbers-rows > span"), i = n.split(`
`), s = Math.max(r.y, o.y), c = Array.from(a).findIndex((d) => {
    const { height: f, y: g } = d.getBoundingClientRect();
    return s >= g && s <= g + f;
  }), u = a[c], l = c - i.length + 1;
  return console.log("start and end lines found", l, c), {
    x: u.offsetLeft,
    y: u.offsetTop + u.offsetHeight / 2,
    start: l,
    end: c
  };
}, Jy = () => {
  var e;
  return [
    (e = ls()) == null ? void 0 : e.parentElement,
    us()
  ];
};
var et = /* @__PURE__ */ ((e) => (e[e.LOADING = 0] = "LOADING", e[e.UNINITIALIZED = 1] = "UNINITIALIZED", e[e.INITIALIZED = 2] = "INITIALIZED", e))(et || {});
function g0(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function p0(e) {
  return g0(e) && "type" in e && typeof e.type == "string";
}
var $u = Symbol.for("immer-nothing"), Gl = Symbol.for("immer-draftable"), Ge = Symbol.for("immer-state"), h0 = process.env.NODE_ENV !== "production" ? [
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
function Ve(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = h0[e], o = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${o}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Rn = Object.getPrototypeOf;
function Qt(e) {
  return !!e && !!e[Ge];
}
function Lt(e) {
  var t;
  return e ? Wu(e) || Array.isArray(e) || !!e[Gl] || !!((t = e.constructor) != null && t[Gl]) || Ir(e) || Lr(e) : !1;
}
var m0 = Object.prototype.constructor.toString();
function Wu(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Rn(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === m0;
}
function dr(e, t) {
  zr(e) === 0 ? Reflect.ownKeys(e).forEach((n) => {
    t(n, e[n], e);
  }) : e.forEach((n, o) => t(o, n, e));
}
function zr(e) {
  const t = e[Ge];
  return t ? t.type_ : Array.isArray(e) ? 1 : Ir(e) ? 2 : Lr(e) ? 3 : 0;
}
function Ci(e, t) {
  return zr(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Vu(e, t, n) {
  const o = zr(e);
  o === 2 ? e.set(t, n) : o === 3 ? e.add(n) : e[t] = n;
}
function b0(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Ir(e) {
  return e instanceof Map;
}
function Lr(e) {
  return e instanceof Set;
}
function on(e) {
  return e.copy_ || e.base_;
}
function Ei(e, t) {
  if (Ir(e))
    return new Map(e);
  if (Lr(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && Wu(e))
    return Rn(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[Ge];
  let o = Reflect.ownKeys(n);
  for (let r = 0; r < o.length; r++) {
    const a = o[r], i = n[a];
    i.writable === !1 && (i.writable = !0, i.configurable = !0), (i.get || i.set) && (n[a] = {
      configurable: !0,
      writable: !0,
      // could live with !!desc.set as well here...
      enumerable: i.enumerable,
      value: e[a]
    });
  }
  return Object.create(Rn(e), n);
}
function ds(e, t = !1) {
  return Fr(e) || Qt(e) || !Lt(e) || (zr(e) > 1 && (e.set = e.add = e.clear = e.delete = y0), Object.freeze(e), t && Object.entries(e).forEach(([n, o]) => ds(o, !0))), e;
}
function y0() {
  Ve(2);
}
function Fr(e) {
  return Object.isFrozen(e);
}
var v0 = {};
function fn(e) {
  const t = v0[e];
  return t || Ve(0, e), t;
}
var ao;
function qu() {
  return ao;
}
function x0(e, t) {
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
function Xl(e, t) {
  t && (fn("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function _i(e) {
  ki(e), e.drafts_.forEach(w0), e.drafts_ = null;
}
function ki(e) {
  e === ao && (ao = e.parent_);
}
function Ql(e) {
  return ao = x0(ao, e);
}
function w0(e) {
  const t = e[Ge];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Jl(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[Ge].modified_ && (_i(t), Ve(4)), Lt(e) && (e = fr(t, e), t.parent_ || gr(t, e)), t.patches_ && fn("Patches").generateReplacementPatches_(
    n[Ge].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = fr(t, n, []), _i(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== $u ? e : void 0;
}
function fr(e, t, n) {
  if (Fr(t))
    return t;
  const o = t[Ge];
  if (!o)
    return dr(
      t,
      (r, a) => ec(e, o, t, r, a, n)
    ), t;
  if (o.scope_ !== e)
    return t;
  if (!o.modified_)
    return gr(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    o.finalized_ = !0, o.scope_.unfinalizedDrafts_--;
    const r = o.copy_;
    let a = r, i = !1;
    o.type_ === 3 && (a = new Set(r), r.clear(), i = !0), dr(
      a,
      (s, c) => ec(e, o, r, s, c, n, i)
    ), gr(e, r, !1), n && e.patches_ && fn("Patches").generatePatches_(
      o,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return o.copy_;
}
function ec(e, t, n, o, r, a, i) {
  if (process.env.NODE_ENV !== "production" && r === n && Ve(5), Qt(r)) {
    const s = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Ci(t.assigned_, o) ? a.concat(o) : void 0, c = fr(e, r, s);
    if (Vu(n, o, c), Qt(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    i && n.add(r);
  if (Lt(r) && !Fr(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    fr(e, r), (!t || !t.scope_.parent_) && typeof o != "symbol" && Object.prototype.propertyIsEnumerable.call(n, o) && gr(e, r);
  }
}
function gr(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && ds(t, n);
}
function S0(e, t) {
  const n = Array.isArray(e), o = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : qu(),
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
  let r = o, a = fs;
  n && (r = [o], a = io);
  const { revoke: i, proxy: s } = Proxy.revocable(r, a);
  return o.draft_ = s, o.revoke_ = i, s;
}
var fs = {
  get(e, t) {
    if (t === Ge)
      return e;
    const n = on(e);
    if (!Ci(n, t))
      return C0(e, n, t);
    const o = n[t];
    return e.finalized_ || !Lt(o) ? o : o === Za(e.base_, t) ? (Ka(e), e.copy_[t] = Mi(o, e)) : o;
  },
  has(e, t) {
    return t in on(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(on(e));
  },
  set(e, t, n) {
    const o = Uu(on(e), t);
    if (o != null && o.set)
      return o.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const r = Za(on(e), t), a = r == null ? void 0 : r[Ge];
      if (a && a.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (b0(n, r) && (n !== void 0 || Ci(e.base_, t)))
        return !0;
      Ka(e), Ai(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Za(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Ka(e), Ai(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const n = on(e), o = Reflect.getOwnPropertyDescriptor(n, t);
    return o && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: o.enumerable,
      value: n[t]
    };
  },
  defineProperty() {
    Ve(11);
  },
  getPrototypeOf(e) {
    return Rn(e.base_);
  },
  setPrototypeOf() {
    Ve(12);
  }
}, io = {};
dr(fs, (e, t) => {
  io[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
io.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && Ve(13), io.set.call(this, e, t, void 0);
};
io.set = function(e, t, n) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && Ve(14), fs.set.call(this, e[0], t, n, e[0]);
};
function Za(e, t) {
  const n = e[Ge];
  return (n ? on(n) : e)[t];
}
function C0(e, t, n) {
  var r;
  const o = Uu(t, n);
  return o ? "value" in o ? o.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (r = o.get) == null ? void 0 : r.call(e.draft_)
  ) : void 0;
}
function Uu(e, t) {
  if (!(t in e))
    return;
  let n = Rn(e);
  for (; n; ) {
    const o = Object.getOwnPropertyDescriptor(n, t);
    if (o)
      return o;
    n = Rn(n);
  }
}
function Ai(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Ai(e.parent_));
}
function Ka(e) {
  e.copy_ || (e.copy_ = Ei(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var E0 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, o) => {
      if (typeof t == "function" && typeof n != "function") {
        const a = n;
        n = t;
        const i = this;
        return function(c = a, ...u) {
          return i.produce(c, (l) => n.call(this, l, ...u));
        };
      }
      typeof n != "function" && Ve(6), o !== void 0 && typeof o != "function" && Ve(7);
      let r;
      if (Lt(t)) {
        const a = Ql(this), i = Mi(t, void 0);
        let s = !0;
        try {
          r = n(i), s = !1;
        } finally {
          s ? _i(a) : ki(a);
        }
        return Xl(a, o), Jl(r, a);
      } else if (!t || typeof t != "object") {
        if (r = n(t), r === void 0 && (r = t), r === $u && (r = void 0), this.autoFreeze_ && ds(r, !0), o) {
          const a = [], i = [];
          fn("Patches").generateReplacementPatches_(t, r, a, i), o(a, i);
        }
        return r;
      } else
        Ve(1, t);
    }, this.produceWithPatches = (t, n) => {
      if (typeof t == "function")
        return (i, ...s) => this.produceWithPatches(i, (c) => t(c, ...s));
      let o, r;
      return [this.produce(t, n, (i, s) => {
        o = i, r = s;
      }), o, r];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Lt(e) || Ve(8), Qt(e) && (e = Yu(e));
    const t = Ql(this), n = Mi(e, void 0);
    return n[Ge].isManual_ = !0, ki(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[Ge];
    (!n || !n.isManual_) && Ve(9);
    const { scope_: o } = n;
    return Xl(o, t), Jl(void 0, o);
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
      const r = t[n];
      if (r.path.length === 0 && r.op === "replace") {
        e = r.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const o = fn("Patches").applyPatches_;
    return Qt(e) ? o(e, t) : this.produce(
      e,
      (r) => o(r, t)
    );
  }
};
function Mi(e, t) {
  const n = Ir(e) ? fn("MapSet").proxyMap_(e, t) : Lr(e) ? fn("MapSet").proxySet_(e, t) : S0(e, t);
  return (t ? t.scope_ : qu()).drafts_.push(n), n;
}
function Yu(e) {
  return Qt(e) || Ve(10, e), Zu(e);
}
function Zu(e) {
  if (!Lt(e) || Fr(e))
    return e;
  const t = e[Ge];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = Ei(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = Ei(e, !0);
  return dr(n, (o, r) => {
    Vu(n, o, Zu(r));
  }), t && (t.finalized_ = !1), n;
}
var Xe = new E0(), Ku = Xe.produce;
Xe.produceWithPatches.bind(
  Xe
);
Xe.setAutoFreeze.bind(Xe);
Xe.setUseStrictShallowCopy.bind(Xe);
Xe.applyPatches.bind(Xe);
Xe.createDraft.bind(Xe);
Xe.finishDraft.bind(Xe);
var _0 = (e, t, n) => {
  if (t.length === 1 && t[0] === n) {
    let o = !1;
    try {
      const r = {};
      e(r) === r && (o = !0);
    } catch {
    }
    if (o) {
      let r;
      try {
        throw new Error();
      } catch (a) {
        ({ stack: r } = a);
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
}, k0 = (e, t, n) => {
  const { memoize: o, memoizeOptions: r } = t, { inputSelectorResults: a, inputSelectorResultsCopy: i } = e, s = o(() => ({}), ...r);
  if (!(s.apply(null, a) === s.apply(null, i))) {
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
        firstInputs: a,
        secondInputs: i,
        stack: u
      }
    );
  }
}, A0 = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function M0(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function T0(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function O0(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (o) => typeof o == "function" ? `function ${o.name || "unnamed"}()` : typeof o
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var tc = (e) => Array.isArray(e) ? e : [e];
function N0(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return O0(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function nc(e, t) {
  const n = [], { length: o } = e;
  for (let r = 0; r < o; r++)
    n.push(e[r].apply(null, t));
  return n;
}
var D0 = (e, t) => {
  const { identityFunctionCheck: n, inputStabilityCheck: o } = {
    ...A0,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: _0
    },
    inputStabilityCheck: {
      shouldRun: o === "always" || o === "once" && e,
      run: k0
    }
  };
}, R0 = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, z0 = typeof WeakRef < "u" ? WeakRef : R0, I0 = 0, oc = 1;
function Fo() {
  return {
    s: I0,
    v: void 0,
    o: null,
    p: null
  };
}
function gs(e, t = {}) {
  let n = Fo();
  const { resultEqualityCheck: o } = t;
  let r, a = 0;
  function i() {
    var d;
    let s = n;
    const { length: c } = arguments;
    for (let f = 0, g = c; f < g; f++) {
      const p = arguments[f];
      if (typeof p == "function" || typeof p == "object" && p !== null) {
        let h = s.o;
        h === null && (s.o = h = /* @__PURE__ */ new WeakMap());
        const m = h.get(p);
        m === void 0 ? (s = Fo(), h.set(p, s)) : s = m;
      } else {
        let h = s.p;
        h === null && (s.p = h = /* @__PURE__ */ new Map());
        const m = h.get(p);
        m === void 0 ? (s = Fo(), h.set(p, s)) : s = m;
      }
    }
    const u = s;
    let l;
    if (s.s === oc ? l = s.v : (l = e.apply(null, arguments), a++), u.s = oc, o) {
      const f = ((d = r == null ? void 0 : r.deref) == null ? void 0 : d.call(r)) ?? r;
      f != null && o(f, l) && (l = f, a !== 0 && a--), r = typeof l == "object" && l !== null || typeof l == "function" ? new z0(l) : l;
    }
    return u.v = l, l;
  }
  return i.clearCache = () => {
    n = Fo(), i.resetResultsCount();
  }, i.resultsCount = () => a, i.resetResultsCount = () => {
    a = 0;
  }, i;
}
function Gu(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, o = (...r) => {
    let a = 0, i = 0, s, c = {}, u = r.pop();
    typeof u == "object" && (c = u, u = r.pop()), M0(
      u,
      `createSelector expects an output function after the inputs, but received: [${typeof u}]`
    );
    const l = {
      ...n,
      ...c
    }, {
      memoize: d,
      memoizeOptions: f = [],
      argsMemoize: g = gs,
      argsMemoizeOptions: p = [],
      devModeChecks: h = {}
    } = l, m = tc(f), x = tc(p), b = N0(r), y = d(function() {
      return a++, u.apply(
        null,
        arguments
      );
    }, ...m);
    let w = !0;
    const S = g(function() {
      i++;
      const M = nc(
        b,
        arguments
      );
      if (s = y.apply(null, M), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: C, inputStabilityCheck: T } = D0(w, h);
        if (C.shouldRun && C.run(
          u,
          M,
          s
        ), T.shouldRun) {
          const D = nc(
            b,
            arguments
          );
          T.run(
            { inputSelectorResults: M, inputSelectorResultsCopy: D },
            { memoize: d, memoizeOptions: m },
            arguments
          );
        }
        w && (w = !1);
      }
      return s;
    }, ...x);
    return Object.assign(S, {
      resultFunc: u,
      memoizedResultFunc: y,
      dependencies: b,
      dependencyRecomputations: () => i,
      resetDependencyRecomputations: () => {
        i = 0;
      },
      lastResult: () => s,
      recomputations: () => a,
      resetRecomputations: () => {
        a = 0;
      },
      memoize: d,
      argsMemoize: g
    });
  };
  return Object.assign(o, {
    withTypes: () => o
  }), o;
}
var L0 = /* @__PURE__ */ Gu(gs), F0 = Object.assign(
  (e, t = L0) => {
    T0(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), o = n.map(
      (a) => e[a]
    );
    return t(
      o,
      (...a) => a.reduce((i, s, c) => (i[n[c]] = s, i), {})
    );
  },
  { withTypes: () => F0 }
), j0 = (...e) => {
  const t = Gu(...e), n = Object.assign((...o) => {
    const r = t(...o), a = (i, ...s) => r(Qt(i) ? Yu(i) : i, ...s);
    return Object.assign(a, r), a;
  }, {
    withTypes: () => n
  });
  return n;
};
j0(gs);
function zn(e, t) {
  function n(...o) {
    if (t) {
      let r = t(...o);
      if (!r)
        throw new Error(process.env.NODE_ENV === "production" ? Oe(0) : "prepareAction did not return an object");
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
      payload: o[0]
    };
  }
  return n.toString = () => `${e}`, n.type = e, n.match = (o) => p0(o) && o.type === e, n;
}
function rc(e) {
  return Lt(e) ? Ku(e, () => {
  }) : e;
}
function ac(e, t, n) {
  if (e.has(t)) {
    let r = e.get(t);
    return n.update && (r = n.update(r, t, e), e.set(t, r)), r;
  }
  if (!n.insert)
    throw new Error(process.env.NODE_ENV === "production" ? Oe(10) : "No insert provided for key not already in map");
  const o = n.insert(t, e);
  return e.set(t, o), o;
}
process.env.NODE_ENV;
function Xu(e) {
  const t = {}, n = [];
  let o;
  const r = {
    addCase(a, i) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? Oe(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (o)
          throw new Error(process.env.NODE_ENV === "production" ? Oe(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const s = typeof a == "string" ? a : a.type;
      if (!s)
        throw new Error(process.env.NODE_ENV === "production" ? Oe(28) : "`builder.addCase` cannot be called with an empty action type");
      if (s in t)
        throw new Error(process.env.NODE_ENV === "production" ? Oe(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${s}'`);
      return t[s] = i, r;
    },
    addMatcher(a, i) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? Oe(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: a,
        reducer: i
      }), r;
    },
    addDefaultCase(a) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? Oe(31) : "`builder.addDefaultCase` can only be called once");
      return o = a, r;
    }
  };
  return e(r), [t, n, o];
}
function P0(e) {
  return typeof e == "function";
}
function H0(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? Oe(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, o, r] = Xu(t), a;
  if (P0(e))
    a = () => rc(e());
  else {
    const s = rc(e);
    a = () => s;
  }
  function i(s = a(), c) {
    let u = [n[c.type], ...o.filter(({
      matcher: l
    }) => l(c)).map(({
      reducer: l
    }) => l)];
    return u.filter((l) => !!l).length === 0 && (u = [r]), u.reduce((l, d) => {
      if (d)
        if (Qt(l)) {
          const g = d(l, c);
          return g === void 0 ? l : g;
        } else {
          if (Lt(l))
            return Ku(l, (f) => d(f, c));
          {
            const f = d(l, c);
            if (f === void 0) {
              if (l === null)
                return l;
              throw new Error(process.env.NODE_ENV === "production" ? Oe(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return f;
          }
        }
      return l;
    }, s);
  }
  return i.getInitialState = a, i;
}
var B0 = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", $0 = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += B0[Math.random() * 64 | 0];
  return t;
}, W0 = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function V0(e, t) {
  return `${e}/${t}`;
}
function q0({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[W0];
  return function(r) {
    const {
      name: a,
      reducerPath: i = a
    } = r;
    if (!a)
      throw new Error(process.env.NODE_ENV === "production" ? Oe(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && r.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const s = (typeof r.reducers == "function" ? r.reducers(Y0()) : r.reducers) || {}, c = Object.keys(s), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, l = {
      addCase(y, w) {
        const S = typeof y == "string" ? y : y.type;
        if (!S)
          throw new Error(process.env.NODE_ENV === "production" ? Oe(12) : "`context.addCase` cannot be called with an empty action type");
        if (S in u.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? Oe(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + S);
        return u.sliceCaseReducersByType[S] = w, l;
      },
      addMatcher(y, w) {
        return u.sliceMatchers.push({
          matcher: y,
          reducer: w
        }), l;
      },
      exposeAction(y, w) {
        return u.actionCreators[y] = w, l;
      },
      exposeCaseReducer(y, w) {
        return u.sliceCaseReducersByName[y] = w, l;
      }
    };
    c.forEach((y) => {
      const w = s[y], S = {
        reducerName: y,
        type: V0(a, y),
        createNotation: typeof r.reducers == "function"
      };
      K0(w) ? X0(S, w, l, t) : Z0(S, w, l);
    });
    function d() {
      if (process.env.NODE_ENV !== "production" && typeof r.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? Oe(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [y = {}, w = [], S = void 0] = typeof r.extraReducers == "function" ? Xu(r.extraReducers) : [r.extraReducers], k = {
        ...y,
        ...u.sliceCaseReducersByType
      };
      return H0(r.initialState, (M) => {
        for (let C in k)
          M.addCase(C, k[C]);
        for (let C of u.sliceMatchers)
          M.addMatcher(C.matcher, C.reducer);
        for (let C of w)
          M.addMatcher(C.matcher, C.reducer);
        S && M.addDefaultCase(S);
      });
    }
    const f = (y) => y, g = /* @__PURE__ */ new Map();
    let p;
    function h(y, w) {
      return p || (p = d()), p(y, w);
    }
    function m() {
      return p || (p = d()), p.getInitialState();
    }
    function x(y, w = !1) {
      function S(M) {
        let C = M[y];
        if (typeof C > "u") {
          if (w)
            C = m();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? Oe(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return C;
      }
      function k(M = f) {
        const C = ac(g, w, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return ac(C, M, {
          insert: () => {
            const T = {};
            for (const [D, F] of Object.entries(r.selectors ?? {}))
              T[D] = U0(F, M, m, w);
            return T;
          }
        });
      }
      return {
        reducerPath: y,
        getSelectors: k,
        get selectors() {
          return k(S);
        },
        selectSlice: S
      };
    }
    const b = {
      name: a,
      reducer: h,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...x(i),
      injectInto(y, {
        reducerPath: w,
        ...S
      } = {}) {
        const k = w ?? i;
        return y.inject({
          reducerPath: k,
          reducer: h
        }, S), {
          ...b,
          ...x(k, !0)
        };
      }
    };
    return b;
  };
}
function U0(e, t, n, o) {
  function r(a, ...i) {
    let s = t(a);
    if (typeof s > "u") {
      if (o)
        s = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? Oe(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(s, ...i);
  }
  return r.unwrapped = e, r;
}
var Qu = /* @__PURE__ */ q0();
function Y0() {
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
function Z0({
  type: e,
  reducerName: t,
  createNotation: n
}, o, r) {
  let a, i;
  if ("reducer" in o) {
    if (n && !G0(o))
      throw new Error(process.env.NODE_ENV === "production" ? Oe(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    a = o.reducer, i = o.prepare;
  } else
    a = o;
  r.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, i ? zn(e, i) : zn(e));
}
function K0(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function G0(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function X0({
  type: e,
  reducerName: t
}, n, o, r) {
  if (!r)
    throw new Error(process.env.NODE_ENV === "production" ? Oe(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: a,
    fulfilled: i,
    pending: s,
    rejected: c,
    settled: u,
    options: l
  } = n, d = r(e, a, l);
  o.exposeAction(t, d), i && o.addCase(d.fulfilled, i), s && o.addCase(d.pending, s), c && o.addCase(d.rejected, c), u && o.addMatcher(d.settled, u), o.exposeCaseReducer(t, {
    fulfilled: i || jo,
    pending: s || jo,
    rejected: c || jo,
    settled: u || jo
  });
}
function jo() {
}
var Q0 = (e, t) => {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? Oe(32) : `${t} is not a function`);
}, ps = "listenerMiddleware", J0 = (e) => {
  let {
    type: t,
    actionCreator: n,
    matcher: o,
    predicate: r,
    effect: a
  } = e;
  if (t)
    r = zn(t).match;
  else if (n)
    t = n.type, r = n.match;
  else if (o)
    r = o;
  else if (!r)
    throw new Error(process.env.NODE_ENV === "production" ? Oe(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return Q0(a, "options.listener"), {
    predicate: r,
    type: t,
    effect: a
  };
}, ep = Object.assign((e) => {
  const {
    type: t,
    predicate: n,
    effect: o
  } = J0(e);
  return {
    id: $0(),
    effect: o,
    type: t,
    predicate: n,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? Oe(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => ep
}), tp = Object.assign(zn(`${ps}/add`), {
  withTypes: () => tp
});
zn(`${ps}/removeAll`);
var np = Object.assign(zn(`${ps}/remove`), {
  withTypes: () => np
});
function Oe(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const op = {
  users: {},
  isRightPanelOpen: !1,
  selectedConversationId: void 0,
  conversations: {},
  conversationsLoadingState: et.UNINITIALIZED,
  newConversation: void 0,
  shareId: void 0,
  docsAppRendered: !1,
  currentPage: o0(),
  codeblockLoaded: !1,
  source: is.DBT_DOCS,
  manifest: {}
}, pr = Qu({
  name: "appState",
  initialState: op,
  reducers: {
    setDocsAppRendered: (e, t) => {
      e.docsAppRendered = t.payload;
    },
    setManifest: (e, t) => {
      e.manifest = t.payload;
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
      e.conversationsLoadingState = et.UNINITIALIZED;
    },
    setUsers: (e, t) => {
      var n;
      return (n = t.payload) != null && n.length ? {
        ...e,
        users: t.payload.reduce((o, r) => (o[r.id] = r, o), {})
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
      var r, a;
      const n = { ...t.payload };
      if (!n.meta) {
        console.log("Invalid meta");
        return;
      }
      const o = cs();
      if (!o || o.length < 3) {
        console.error("Unable to find model parts", o);
        return;
      }
      if (console.log("model parts found", o), n.meta.uniqueId = o[2], n.meta.resource_type = o[1], n.meta.range || (n.meta.range = {
        end: { line: 0, character: 0 },
        start: { line: 0, character: 0 }
      }), n.meta.uniqueId) {
        const i = ((r = e.manifest.nodes) == null ? void 0 : r[n.meta.uniqueId]) || ((a = e.manifest.macros) == null ? void 0 : a[n.meta.uniqueId]);
        n.meta.filePath = (i == null ? void 0 : i.original_file_path) || "";
      }
      e.newConversation = n;
    },
    resetNewConversation: (e) => {
      e.newConversation = void 0;
    },
    setConversations: (e, t) => {
      t.payload && (e.conversations = t.payload.reduce(
        (n, o) => (n[o.conversation_group_id] = o, n),
        {}
      ), e.selectedConversationId = e.selectedConversationId || t.payload[0].conversation_group_id);
    }
  }
}), {
  setCurrentUserId: ev,
  setShareId: tv,
  updateSelectedConversationId: hs,
  updateRightPanelState: ms,
  setUsers: rp,
  setConversations: ap,
  resetNewConversation: bs,
  updateNewConversation: ys,
  upsertConversation: nv,
  setDocsAppRendered: ov,
  updateCurrentPage: rv,
  updateCodeblockLoaded: av,
  resolveConversationGroup: ip,
  setConversationsLoadingState: ic,
  refetchConversations: Ju,
  setConversationSource: iv,
  setManifest: sp
} = pr.actions, jr = pt({
  state: pr.getInitialState(),
  dispatch: () => null,
  getValue: () => null
}), lp = ({
  children: e,
  shareId: t,
  userId: n,
  conversationGroupId: o,
  source: r
}) => {
  const [a, i] = Nu(pr.reducer, {
    ...pr.getInitialState(),
    shareId: t,
    currentUserId: n,
    selectedConversationId: o,
    isRightPanelOpen: !!o,
    source: r
  }), s = me(
    (u) => u(a),
    [a]
  ), c = Ee(
    () => ({
      state: a,
      dispatch: i,
      getValue: s
    }),
    [a, i, s]
  );
  return /* @__PURE__ */ v.jsx(jr.Provider, { value: c, children: e });
}, cp = lp, up = () => Ye(jr), we = (e) => {
  const { getValue: t } = Ye(jr);
  return t(e);
}, rt = () => {
  const { dispatch: e } = Ye(jr);
  return e;
}, dp = pt({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
}), fp = pt(null), gp = typeof document < "u", ed = gp ? L1 : ie;
class sc {
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
function pp(e) {
  let t = new sc(), n = new sc(), o = 0, r = !1, a = !1;
  const i = /* @__PURE__ */ new WeakSet(), s = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, u = !1, l = !1) => {
      const d = l && r, f = d ? t : n;
      return u && i.add(c), f.add(c) && d && r && (o = t.order.length), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      n.remove(c), i.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (r) {
        a = !0;
        return;
      }
      if (r = !0, [t, n] = [n, t], n.clear(), o = t.order.length, o)
        for (let u = 0; u < o; u++) {
          const l = t.order[u];
          i.has(l) && (s.schedule(l), e()), l(c);
        }
      r = !1, a && (a = !1, s.process(c));
    }
  };
  return s;
}
const Po = [
  "read",
  "resolveKeyframes",
  "update",
  "preRender",
  "render",
  "postRender"
  // Compute
], hp = 40;
function mp(e, t) {
  let n = !1, o = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, a = Po.reduce((d, f) => (d[f] = pp(() => n = !0), d), {}), i = (d) => {
    a[d].process(r);
  }, s = () => {
    const d = performance.now();
    n = !1, r.delta = o ? 1e3 / 60 : Math.max(Math.min(d - r.timestamp, hp), 1), r.timestamp = d, r.isProcessing = !0, Po.forEach(i), r.isProcessing = !1, n && t && (o = !1, e(s));
  }, c = () => {
    n = !0, o = !0, r.isProcessing || e(s);
  };
  return { schedule: Po.reduce((d, f) => {
    const g = a[f];
    return d[f] = (p, h = !1, m = !1) => (n || c(), g.schedule(p, h, m)), d;
  }, {}), cancel: (d) => Po.forEach((f) => a[f].cancel(d)), state: r, steps: a };
}
const bp = pt({});
function yp(e) {
  const t = ae(null);
  return t.current === null && (t.current = e()), t.current;
}
const vp = (e) => e, { schedule: xp, cancel: sv, state: lv, steps: cv } = mp(typeof requestAnimationFrame < "u" ? requestAnimationFrame : vp, !0);
function td() {
  const e = ae(!1);
  return ed(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function wp() {
  const e = td(), [t, n] = fe(0), o = me(() => {
    e.current && n(t + 1);
  }, [t]);
  return [me(() => xp.postRender(o), [o]), t];
}
class Sp extends B.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const o = this.props.sizeRef.current;
      o.height = n.offsetHeight || 0, o.width = n.offsetWidth || 0, o.top = n.offsetTop, o.left = n.offsetLeft;
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
function Cp({ children: e, isPresent: t }) {
  const n = Du(), o = ae(null), r = ae({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }), { nonce: a } = Ye(dp);
  return F1(() => {
    const { width: i, height: s, top: c, left: u } = r.current;
    if (t || !o.current || !i || !s)
      return;
    o.current.dataset.motionPopId = n;
    const l = document.createElement("style");
    return a && (l.nonce = a), document.head.appendChild(l), l.sheet && l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${i}px !important;
            height: ${s}px !important;
            top: ${c}px !important;
            left: ${u}px !important;
          }
        `), () => {
      document.head.removeChild(l);
    };
  }, [t]), B.createElement(Sp, { isPresent: t, childRef: o, sizeRef: r }, B.cloneElement(e, { ref: o }));
}
const Ga = ({ children: e, initial: t, isPresent: n, onExitComplete: o, custom: r, presenceAffectsLayout: a, mode: i }) => {
  const s = yp(Ep), c = Du(), u = Ee(
    () => ({
      id: c,
      initial: t,
      isPresent: n,
      custom: r,
      onExitComplete: (l) => {
        s.set(l, !0);
        for (const d of s.values())
          if (!d)
            return;
        o && o();
      },
      register: (l) => (s.set(l, !1), () => s.delete(l))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    a ? void 0 : [n]
  );
  return Ee(() => {
    s.forEach((l, d) => s.set(d, !1));
  }, [n]), B.useEffect(() => {
    !n && !s.size && o && o();
  }, [n]), i === "popLayout" && (e = B.createElement(Cp, { isPresent: n }, e)), B.createElement(fp.Provider, { value: u }, e);
};
function Ep() {
  return /* @__PURE__ */ new Map();
}
function _p(e) {
  return ie(() => () => e(), []);
}
const rn = (e) => e.key || "";
function kp(e, t) {
  e.forEach((n) => {
    const o = rn(n);
    t.set(o, n);
  });
}
function Ap(e) {
  const t = [];
  return Dn.forEach(e, (n) => {
    Ou(n) && t.push(n);
  }), t;
}
const Mp = ({ children: e, custom: t, initial: n = !0, onExitComplete: o, exitBeforeEnter: r, presenceAffectsLayout: a = !0, mode: i = "sync" }) => {
  const s = Ye(bp).forceRender || wp()[0], c = td(), u = Ap(e);
  let l = u;
  const d = ae(/* @__PURE__ */ new Map()).current, f = ae(l), g = ae(/* @__PURE__ */ new Map()).current, p = ae(!0);
  if (ed(() => {
    p.current = !1, kp(u, g), f.current = l;
  }), _p(() => {
    p.current = !0, g.clear(), d.clear();
  }), p.current)
    return B.createElement(B.Fragment, null, l.map((b) => B.createElement(Ga, { key: rn(b), isPresent: !0, initial: n ? void 0 : !1, presenceAffectsLayout: a, mode: i }, b)));
  l = [...l];
  const h = f.current.map(rn), m = u.map(rn), x = h.length;
  for (let b = 0; b < x; b++) {
    const y = h[b];
    m.indexOf(y) === -1 && !d.has(y) && d.set(y, void 0);
  }
  return i === "wait" && d.size && (l = []), d.forEach((b, y) => {
    if (m.indexOf(y) !== -1)
      return;
    const w = g.get(y);
    if (!w)
      return;
    const S = h.indexOf(y);
    let k = b;
    if (!k) {
      const M = () => {
        d.delete(y);
        const C = Array.from(g.keys()).filter((T) => !m.includes(T));
        if (C.forEach((T) => g.delete(T)), f.current = u.filter((T) => {
          const D = rn(T);
          return (
            // filter out the node exiting
            D === y || // filter out the leftover children
            C.includes(D)
          );
        }), !d.size) {
          if (c.current === !1)
            return;
          s(), o && o();
        }
      };
      k = B.createElement(Ga, { key: rn(w), isPresent: !1, onExitComplete: M, custom: t, presenceAffectsLayout: a, mode: i }, w), d.set(y, k);
    }
    l.splice(S, 0, k);
  }), l = l.map((b) => {
    const y = b.key;
    return d.has(y) ? b : B.createElement(Ga, { key: rn(b), isPresent: !0, presenceAffectsLayout: a, mode: i }, b);
  }), process.env.NODE_ENV !== "production" && i === "wait" && l.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`), B.createElement(B.Fragment, null, d.size ? l : l.map((b) => j1(b)));
}, Jt = ({
  icon: e,
  className: t = "",
  ...n
}) => /* @__PURE__ */ v.jsx("i", { className: `${t} codicon codicon-${e}`, ...n }), nd = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "code", ...e }), od = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "add", ...e }), Tp = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "comment-unresolved", ...e }), Op = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "check", ...e }), Np = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "debug-restart", ...e }), Dp = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "gear", ...e }), Rp = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "info", ...e }), zp = (e) => /* @__PURE__ */ v.jsx(Jt, { icon: "send", ...e }), Ip = ({ pos: e, onAddComment: t }) => hn(
  /* @__PURE__ */ v.jsx(Mp, { children: e && /* @__PURE__ */ v.jsx(
    qe,
    {
      onClick: t,
      id: `${Rr}-highlight`,
      style: {
        position: "absolute",
        top: e.y,
        left: e.x,
        // right: "15px",
        zIndex: s0 + 5,
        cursor: "pointer",
        background: "#007AFF",
        width: 26,
        height: 26,
        borderRadius: "100%",
        boxShadow: "none",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "13px",
        fontWeight: "bold",
        color: "#fff",
        padding: 0
      },
      children: /* @__PURE__ */ v.jsx(od, {})
    }
  ) }),
  e.element.parentElement
), Lp = Ip, Fp = () => {
  const {
    state: { isRightPanelOpen: e }
  } = up(), t = rt(), n = () => {
    t(ms(!e));
  };
  return /* @__PURE__ */ v.jsx(qe, { onClick: n, children: e ? "Hide conversations" : "Show conversations" });
}, jp = Fp, Pp = (e) => Ne.get(`dbt/dbt_docs_share/${e}`), Hp = (e, t, n) => Ne.post(`dbt/dbt_docs_share/${e}/conversation_group`, {
  ...t,
  telemetry: {
    eventName: "dbtCollaboration:create",
    properties: { source: n }
  }
}), Bp = (e, t, n, o) => Ne.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`,
  {
    ...n,
    telemetry: {
      eventName: "dbtCollaboration:reply",
      properties: { source: o }
    }
  }
), $p = (e) => Ne.get(
  `dbt/dbt_docs_share/${e}/conversations`
), Wp = (e) => Ne.get("users/chat", { company: e }), Vp = (e, t, n) => Ne.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`,
  {
    resolved: !0,
    telemetry: {
      eventName: "dbtCollaboration:resolve",
      properties: { source: n }
    }
  }
), qp = () => {
  const e = we(
    (s) => s.shareId
  ), [t, n] = fe(
    null
  ), [o, r] = fe(!1), a = rt();
  ie(() => {
    t != null && t.manifest_presigned_url && fetch(t.manifest_presigned_url).then((s) => s.json()).then((s) => {
      a(sp(s));
    }).catch(
      (s) => console.error(
        "error loading manifest",
        s,
        t.manifest_presigned_url
      )
    );
  }, [a, t == null ? void 0 : t.manifest_presigned_url]);
  const i = me(async () => {
    if (!e)
      return;
    r(!0);
    const s = await Pp(e);
    if (s) {
      n(s);
      const c = document.getElementById("collapse-sidebar");
      c == null || c.click();
    }
    r(!1);
  }, [e]);
  return ie(() => {
    !e || t || o || i();
  }, [e, t, i, o]), { shareDetails: t, loading: o };
}, Up = () => {
  const e = we(
    (l) => l.selectedConversationId ? l.conversations[l.selectedConversationId] : null
  ), t = we(
    (l) => l.docsAppRendered
  ), n = we(
    (l) => l.newConversation
  ), o = rt(), [r, a] = fe(null), [i, s] = fe(null);
  ie(() => {
    n && (a(null), s(null));
  }, [n]);
  const c = me(() => {
    console.log("resetHighlights"), r && c0(r), s(null), a(null);
  }, [r]);
  return ie(() => {
    !e || !t || e.meta.resource_type && e.meta.uniqueId && (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`);
  }, [e, t, o]), {
    getHighlightedSelectionData: () => r,
    pos: i,
    onSelectionEnd: (l) => {
      const d = l.target, f = d0(d), { end: g, start: p } = l.detail.selectionRange, h = document.getSelection();
      if (!h || !h.rangeCount)
        return c(), null;
      const x = h.getRangeAt(0).toString(), b = d == null ? void 0 : d.innerText;
      if (!x || !b)
        return;
      const { end: y, start: w, x: S, y: k } = f0(
        f,
        d,
        x,
        g,
        p
      );
      console.log("selection range", y, w, S, k);
      const M = {
        meta: {
          filePath: "",
          field: f,
          highlight: x,
          range: {
            end: { line: y, character: 0 },
            start: { line: w, character: 0 }
          }
        }
      };
      o(bs()), s({
        x: S,
        y: k,
        element: d
      }), document.body.addEventListener("click", c, { once: !0 }), a(M);
    }
  };
}, Yp = ({
  conversationGroup: e
}) => {
  const t = we(
    (s) => s.selectedConversationId
  ), n = rt(), o = ae(null), r = Ee(() => u0(e.meta), [e.meta]), a = () => {
    n(
      hs(e.conversation_group_id)
    );
  }, i = Ee(() => {
    if (!r)
      return;
    if (e.meta.field === "description")
      return { top: 0, bottom: r.offsetHeight };
    let s = 0, c = 0;
    for (let u = e.meta.range.start.line; u <= e.meta.range.end.line; u++) {
      const l = r.querySelector(
        `.line-numbers-rows > span:nth-child(${u + 1})`
      );
      l && (u === e.meta.range.start.line && (s = l.offsetTop + 15), u === e.meta.range.end.line && (c = l.offsetTop + l.offsetHeight));
    }
    return { top: s, bottom: c };
  }, [
    r,
    e.meta.field,
    e.meta.range.start.line,
    e.meta.range.end.line
  ]);
  return ie(() => {
    var s;
    t === e.conversation_group_id && ((s = o.current) == null || s.scrollIntoView({
      behavior: "smooth",
      block: "center"
    }));
  }, [e.conversation_group_id, t]), !i || !(r != null && r.parentElement) ? null : hn(
    /* @__PURE__ */ v.jsx(
      "div",
      {
        ref: o,
        className: `altimate-highlighter ${t === e.conversation_group_id ? "active" : ""}`,
        style: { top: i.top, height: i.bottom - i.top },
        onClick: a,
        children: /* @__PURE__ */ v.jsx(Tp, {})
      }
    ),
    r.parentElement
  );
}, Zp = Yp, Kp = () => {
  const e = we(
    (r) => Object.values(r.conversations || {})
  ), t = we(
    (r) => r.codeblockLoaded
  ), n = we(
    (r) => r.currentPage
  ), o = e == null ? void 0 : e.filter(
    (r) => r.meta.resource_type === n.resourceType && r.meta.uniqueId === n.name
  );
  return !(o != null && o.length) || !t ? null : /* @__PURE__ */ v.jsx(v.Fragment, { children: o.map((r) => /* @__PURE__ */ v.jsx(
    Zp,
    {
      conversationGroup: r
    },
    r.conversation_group_id
  )) });
}, Gp = Kp, Xp = "_dbtDocs_14zop_9", Qp = "_hotspotButton_14zop_46", Jp = "_pulse_14zop_1", eh = "_conversationRightPanelCloseButton_14zop_62", th = "_conversationRightPanel_14zop_62", nh = "_newConversationForm_14zop_94", oh = "_highlightText_14zop_108", rh = "_conversationInputForm_14zop_130", ah = "_conversationGroup_14zop_156", ih = "_replyForm_14zop_189", sh = "_resolveButton_14zop_237", Ft = {
  dbtDocs: Xp,
  hotspotButton: Qp,
  pulse: Jp,
  conversationRightPanelCloseButton: eh,
  conversationRightPanel: th,
  newConversationForm: nh,
  highlightText: oh,
  conversationInputForm: rh,
  conversationGroup: ah,
  replyForm: ih,
  resolveButton: sh
}, lh = "_profileImage_11vaf_1", ch = {
  profileImage: lh
}, uh = ({ user: e }) => {
  var t;
  return /* @__PURE__ */ v.jsx("div", { className: ch.profileImage, children: ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "" });
}, rd = uh;
function dh(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++)
      n[t] = e[t];
    return n;
  }
}
function fh(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]")
    return Array.from(e);
}
function gh() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function hr(e) {
  return dh(e) || fh(e) || gh();
}
function ot() {
  return ot = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, ot.apply(this, arguments);
}
function ph(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lc(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
  }
}
function hh(e, t, n) {
  return t && lc(e.prototype, t), n && lc(e, n), e;
}
function de(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ti(e, t) {
  return Ti = Object.setPrototypeOf || function(o, r) {
    return o.__proto__ = r, o;
  }, Ti(e, t);
}
function mh(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Ti(e, t);
}
function An(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? An = function(n) {
    return typeof n;
  } : An = function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, An(e);
}
function or(e) {
  return typeof Symbol == "function" && An(Symbol.iterator) === "symbol" ? or = function(n) {
    return An(n);
  } : or = function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : An(n);
  }, or(e);
}
function bh(e, t) {
  return t && (or(t) === "object" || typeof t == "function") ? t : de(e);
}
function mr(e) {
  return mr = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, mr(e);
}
function le(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var yh = function(e, t, n, o, r, a, i, s) {
  if (process.env.NODE_ENV !== "production" && t === void 0)
    throw new Error("invariant requires an error message argument");
  if (!e) {
    var c;
    if (t === void 0)
      c = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    else {
      var u = [n, o, r, a, i, s], l = 0;
      c = new Error(
        t.replace(/%s/g, function() {
          return u[l++];
        })
      ), c.name = "Invariant Violation";
    }
    throw c.framesToPop = 1, c;
  }
}, vh = yh;
const In = /* @__PURE__ */ mn(vh);
function xh(e) {
  if (Array.isArray(e))
    return e;
}
function wh(e, t) {
  var n = [], o = !0, r = !1, a = void 0;
  try {
    for (var i = e[Symbol.iterator](), s; !(o = (s = i.next()).done) && (n.push(s.value), !(t && n.length === t)); o = !0)
      ;
  } catch (c) {
    r = !0, a = c;
  } finally {
    try {
      !o && i.return != null && i.return();
    } finally {
      if (r)
        throw a;
    }
  }
  return n;
}
function Sh() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function br(e, t) {
  return xh(e) || wh(e, t) || Sh();
}
function Ch(e, t) {
  if (e == null)
    return {};
  var n = {}, o = Object.keys(e), r, a;
  for (a = 0; a < o.length; a++)
    r = o[a], !(t.indexOf(r) >= 0) && (n[r] = e[r]);
  return n;
}
function Eh(e, t) {
  if (e == null)
    return {};
  var n = Ch(e, t), o, r;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      o = a[r], !(t.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(e, o) && (n[o] = e[o]);
  }
  return n;
}
function so(e) {
  "@babel/helpers - typeof";
  return so = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, so(e);
}
function _h(e, t) {
  if (so(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(e, t || "default");
    if (so(o) != "object")
      return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function kh(e) {
  var t = _h(e, "string");
  return so(t) == "symbol" ? t : t + "";
}
function lo(e, t, n) {
  return t = kh(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Oi(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, o = new Array(t); n < t; n++)
    o[n] = e[n];
  return o;
}
function Ah(e) {
  if (Array.isArray(e))
    return Oi(e);
}
function Mh(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Th(e, t) {
  if (e) {
    if (typeof e == "string")
      return Oi(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Oi(e, t);
  }
}
function Oh() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zt(e) {
  return Ah(e) || Mh(e) || Th(e) || Oh();
}
var Wn = function(t) {
  return t === Object(t) ? Object.keys(t) : [];
}, ad = function(t) {
  return t === Object(t) ? Object.values(t) : [];
};
function id(e, t) {
  var n = Object.assign({}, e);
  return rr(e) && rr(t) && Wn(t).forEach(function(o) {
    rr(t[o]) ? o in e ? n[o] = id(e[o], t[o]) : Object.assign(n, lo({}, o, t[o])) : Object.assign(n, lo({}, o, t[o]));
  }), n;
}
var Ni = function(t) {
  for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
    o[r - 1] = arguments[r];
  return o.reduce(function(a, i) {
    return id(a, i);
  }, t);
}, Nh = function(t, n) {
  var o = Object.assign({}, t);
  if (n)
    for (var r = 0; r < n.length; r++)
      delete o[n[r]];
  return o;
}, rr = function(t) {
  return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
}, Dh = function(t) {
  return (t || []).filter(Boolean);
}, vs = function(t) {
  return t[0] === "&";
}, Rh = function(t) {
  return !vs(t);
}, cc = function(t) {
  return t.replace(/-(\w)/g, function(n, o) {
    return o.toUpperCase();
  });
}, zh = function(t) {
  for (var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], o = Wn(t), r = {}, a = 0, i = o.length; a < i; a += 1) {
    var s = o[a], c = Object.prototype.toString.call(t[s]) !== "[object Object]" || // style defs
    s[0] === ":" || // pseudo selectors
    s[0] === "@" || // @media / @keyframes / @supports / @font-face
    n.indexOf(s) >= 0;
    c && (r[s] = t[s]);
  }
  return r;
}, sd = function(t, n) {
  for (var o = n.map(cc), r = Wn(t), a = {}, i = 0, s = r.length; i < s; i += 1) {
    var c = r[i];
    (n.indexOf(c) >= 0 || o.indexOf(cc(c)) >= 0) && (a[c] = t[c]);
  }
  return a;
}, Ih = function e(t, n) {
  for (var o = Ni.apply(void 0, [{}, Nh(t, n)].concat(zt(ad(sd(t, n))))), r = Wn(o).filter(vs), a = 0, i = r.length; a < i; a += 1) {
    var s = r[a], c = e(o[s], n);
    n.indexOf(s) >= 0 ? (delete o[s], o = Ni({}, o, c)) : o[s] = c;
  }
  return o;
};
function uc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function dc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uc(Object(n), !0).forEach(function(o) {
      lo(e, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : uc(Object(n)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return e;
}
var Lh = ["animationName"], Fh = function(t) {
  var n = t.style, o = t.className;
  return dc(dc({}, n ? {
    style: zh(n, Lh)
  } : {}), o ? {
    className: o
  } : {});
};
const ld = Fh;
var cd = /* @__PURE__ */ pt(ld);
cd.Provider;
var ud = function(t) {
  if (t) {
    if (typeof t == "string")
      return [t];
    if (!Array.isArray(t)) {
      var n = t;
      return Wn(t).reduce(function(o, r) {
        return o.concat(n[r] ? [r] : []);
      }, []);
    }
  } else
    return [];
  return t;
}, jh = {}, Ph = function(t) {
  return function(n, o) {
    var r = o || jh;
    t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
    var a;
    t.memoize.has(r) ? a = t.memoize.get(r) : (a = {}, t.memoize.set(r, a));
    var i = ud(n).join(" ");
    return i in a ? a[i] : a[i] = t(n || [], o);
  };
};
function fc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fc(Object(n), !0).forEach(function(o) {
      lo(e, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fc(Object(n)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return e;
}
var Hh = function(t) {
  var n = t && Wn(t)[0];
  return n && n.split("__")[0].split("--")[0];
}, Bh = function(t, n, o) {
  if (t) {
    var r = t.split(" ")[0], a = [].concat(zt(n.length === 0 ? o.map(function(i) {
      return "".concat(r, "--").concat(i.substring(1));
    }) : []), zt(n.map(function(i) {
      return "".concat(r, "__").concat(i);
    })));
    return n.length === 0 ? [t].concat(zt(a)) : a;
  }
};
function dd(e) {
  var t = e.style, n = e.className, o = e.classNames, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ld, a = n || Hh(o) || (t == null ? void 0 : t.className), i = typeof t == "function" ? t : Ph(function(d, f) {
    var g = ud(d);
    In(Array.isArray(g), "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value."), In(!f || rr(f), "Optional second parameter must be a plain object.");
    var p = g.filter(vs), h = g.filter(Rh), m = h.length > 0 ? function(y) {
      return ad(sd(y, h));
    } : function(y) {
      return [y];
    }, x = function() {
      var w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return m(Ih(w, p));
    }, b = Bh(a, h, p);
    return dd(vn(vn(vn({}, (t || f) && {
      style: Ni.apply(void 0, [{}].concat(zt(x(f)), zt(x(t))))
    }), b && {
      className: b.join(" ")
    }), o && {
      classNames: o
    }), r);
  }), s = vn({}, typeof t == "function" ? t : {
    style: t
  }), c = zt(new Set([].concat(zt(s.className ? s.className.split(" ") : []), zt(a ? a.split(" ") : [])))), u = o ? Dh(c.map(function(d) {
    return o[d];
  })) : c, l = r(vn(vn({}, s), u.length > 0 ? {
    className: u.join(" ")
  } : {}));
  return Object.assign(i, l), i;
}
function gc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function Yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gc(Object(n), !0).forEach(function(o) {
      lo(e, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gc(Object(n)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return e;
}
var $h = function() {
  for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
    n[o] = arguments[o];
  return n.reduce(function(r, a) {
    return Yn(Yn(Yn({}, r), typeof a == "function" ? a : {}), {}, {
      style: Yn(Yn({}, r.style), typeof a == "function" ? a.style : a)
    });
  }, {});
}, xs = function(t, n, o) {
  var r = n.style, a = n.className, i = n.classNames, s = Ye(cd), c = Ee(function() {
    return dd({
      style: r,
      className: a,
      classNames: i
    }, s);
  }, [r, a, i, s]);
  return c(o, t);
}, Di = { exports: {} }, Ho = { exports: {} }, be = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pc;
function Wh() {
  if (pc)
    return be;
  pc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, r = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, p = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, b = e ? Symbol.for("react.scope") : 60119;
  function y(S) {
    if (typeof S == "object" && S !== null) {
      var k = S.$$typeof;
      switch (k) {
        case t:
          switch (S = S.type, S) {
            case c:
            case u:
            case o:
            case a:
            case r:
            case d:
              return S;
            default:
              switch (S = S && S.$$typeof, S) {
                case s:
                case l:
                case p:
                case g:
                case i:
                  return S;
                default:
                  return k;
              }
          }
        case n:
          return k;
      }
    }
  }
  function w(S) {
    return y(S) === u;
  }
  return be.AsyncMode = c, be.ConcurrentMode = u, be.ContextConsumer = s, be.ContextProvider = i, be.Element = t, be.ForwardRef = l, be.Fragment = o, be.Lazy = p, be.Memo = g, be.Portal = n, be.Profiler = a, be.StrictMode = r, be.Suspense = d, be.isAsyncMode = function(S) {
    return w(S) || y(S) === c;
  }, be.isConcurrentMode = w, be.isContextConsumer = function(S) {
    return y(S) === s;
  }, be.isContextProvider = function(S) {
    return y(S) === i;
  }, be.isElement = function(S) {
    return typeof S == "object" && S !== null && S.$$typeof === t;
  }, be.isForwardRef = function(S) {
    return y(S) === l;
  }, be.isFragment = function(S) {
    return y(S) === o;
  }, be.isLazy = function(S) {
    return y(S) === p;
  }, be.isMemo = function(S) {
    return y(S) === g;
  }, be.isPortal = function(S) {
    return y(S) === n;
  }, be.isProfiler = function(S) {
    return y(S) === a;
  }, be.isStrictMode = function(S) {
    return y(S) === r;
  }, be.isSuspense = function(S) {
    return y(S) === d;
  }, be.isValidElementType = function(S) {
    return typeof S == "string" || typeof S == "function" || S === o || S === u || S === a || S === r || S === d || S === f || typeof S == "object" && S !== null && (S.$$typeof === p || S.$$typeof === g || S.$$typeof === i || S.$$typeof === s || S.$$typeof === l || S.$$typeof === m || S.$$typeof === x || S.$$typeof === b || S.$$typeof === h);
  }, be.typeOf = y, be;
}
var ye = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hc;
function Vh() {
  return hc || (hc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, r = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, p = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, b = e ? Symbol.for("react.scope") : 60119;
    function y(G) {
      return typeof G == "string" || typeof G == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      G === o || G === u || G === a || G === r || G === d || G === f || typeof G == "object" && G !== null && (G.$$typeof === p || G.$$typeof === g || G.$$typeof === i || G.$$typeof === s || G.$$typeof === l || G.$$typeof === m || G.$$typeof === x || G.$$typeof === b || G.$$typeof === h);
    }
    function w(G) {
      if (typeof G == "object" && G !== null) {
        var pe = G.$$typeof;
        switch (pe) {
          case t:
            var Fe = G.type;
            switch (Fe) {
              case c:
              case u:
              case o:
              case a:
              case r:
              case d:
                return Fe;
              default:
                var Se = Fe && Fe.$$typeof;
                switch (Se) {
                  case s:
                  case l:
                  case p:
                  case g:
                  case i:
                    return Se;
                  default:
                    return pe;
                }
            }
          case n:
            return pe;
        }
      }
    }
    var S = c, k = u, M = s, C = i, T = t, D = l, F = o, $ = p, P = g, E = n, A = a, _ = r, z = d, R = !1;
    function N(G) {
      return R || (R = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(G) || w(G) === c;
    }
    function O(G) {
      return w(G) === u;
    }
    function I(G) {
      return w(G) === s;
    }
    function j(G) {
      return w(G) === i;
    }
    function V(G) {
      return typeof G == "object" && G !== null && G.$$typeof === t;
    }
    function W(G) {
      return w(G) === l;
    }
    function U(G) {
      return w(G) === o;
    }
    function Z(G) {
      return w(G) === p;
    }
    function K(G) {
      return w(G) === g;
    }
    function Q(G) {
      return w(G) === n;
    }
    function te(G) {
      return w(G) === a;
    }
    function q(G) {
      return w(G) === r;
    }
    function se(G) {
      return w(G) === d;
    }
    ye.AsyncMode = S, ye.ConcurrentMode = k, ye.ContextConsumer = M, ye.ContextProvider = C, ye.Element = T, ye.ForwardRef = D, ye.Fragment = F, ye.Lazy = $, ye.Memo = P, ye.Portal = E, ye.Profiler = A, ye.StrictMode = _, ye.Suspense = z, ye.isAsyncMode = N, ye.isConcurrentMode = O, ye.isContextConsumer = I, ye.isContextProvider = j, ye.isElement = V, ye.isForwardRef = W, ye.isFragment = U, ye.isLazy = Z, ye.isMemo = K, ye.isPortal = Q, ye.isProfiler = te, ye.isStrictMode = q, ye.isSuspense = se, ye.isValidElementType = y, ye.typeOf = w;
  }()), ye;
}
var mc;
function fd() {
  return mc || (mc = 1, process.env.NODE_ENV === "production" ? Ho.exports = Wh() : Ho.exports = Vh()), Ho.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Xa, bc;
function qh() {
  if (bc)
    return Xa;
  bc = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function o(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function r() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var i = {}, s = 0; s < 10; s++)
        i["_" + String.fromCharCode(s)] = s;
      var c = Object.getOwnPropertyNames(i).map(function(l) {
        return i[l];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        u[l] = l;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Xa = r() ? Object.assign : function(a, i) {
    for (var s, c = o(a), u, l = 1; l < arguments.length; l++) {
      s = Object(arguments[l]);
      for (var d in s)
        t.call(s, d) && (c[d] = s[d]);
      if (e) {
        u = e(s);
        for (var f = 0; f < u.length; f++)
          n.call(s, u[f]) && (c[u[f]] = s[u[f]]);
      }
    }
    return c;
  }, Xa;
}
var Qa, yc;
function ws() {
  if (yc)
    return Qa;
  yc = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Qa = e, Qa;
}
var Ja, vc;
function gd() {
  return vc || (vc = 1, Ja = Function.call.bind(Object.prototype.hasOwnProperty)), Ja;
}
var ei, xc;
function Uh() {
  if (xc)
    return ei;
  xc = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = ws(), n = {}, o = gd();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function r(a, i, s, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in a)
        if (o(a, l)) {
          var d;
          try {
            if (typeof a[l] != "function") {
              var f = Error(
                (c || "React class") + ": " + s + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            d = a[l](i, l, c, s, null, t);
          } catch (p) {
            d = p;
          }
          if (d && !(d instanceof Error) && e(
            (c || "React class") + ": type specification of " + s + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof d + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), d instanceof Error && !(d.message in n)) {
            n[d.message] = !0;
            var g = u ? u() : "";
            e(
              "Failed " + s + " type: " + d.message + (g ?? "")
            );
          }
        }
    }
  }
  return r.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, ei = r, ei;
}
var ti, wc;
function Yh() {
  if (wc)
    return ti;
  wc = 1;
  var e = fd(), t = qh(), n = ws(), o = gd(), r = Uh(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(s) {
    var c = "Warning: " + s;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return ti = function(s, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function d(O) {
      var I = O && (u && O[u] || O[l]);
      if (typeof I == "function")
        return I;
    }
    var f = "<<anonymous>>", g = {
      array: x("array"),
      bigint: x("bigint"),
      bool: x("boolean"),
      func: x("function"),
      number: x("number"),
      object: x("object"),
      string: x("string"),
      symbol: x("symbol"),
      any: b(),
      arrayOf: y,
      element: w(),
      elementType: S(),
      instanceOf: k,
      node: D(),
      objectOf: C,
      oneOf: M,
      oneOfType: T,
      shape: $,
      exact: P
    };
    function p(O, I) {
      return O === I ? O !== 0 || 1 / O === 1 / I : O !== O && I !== I;
    }
    function h(O, I) {
      this.message = O, this.data = I && typeof I == "object" ? I : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function m(O) {
      if (process.env.NODE_ENV !== "production")
        var I = {}, j = 0;
      function V(U, Z, K, Q, te, q, se) {
        if (Q = Q || f, q = q || K, se !== n) {
          if (c) {
            var G = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw G.name = "Invariant Violation", G;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var pe = Q + ":" + K;
            !I[pe] && // Avoid spamming the console because they are often not actionable except for lib authors
            j < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + q + "` prop on `" + Q + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), I[pe] = !0, j++);
          }
        }
        return Z[K] == null ? U ? Z[K] === null ? new h("The " + te + " `" + q + "` is marked as required " + ("in `" + Q + "`, but its value is `null`.")) : new h("The " + te + " `" + q + "` is marked as required in " + ("`" + Q + "`, but its value is `undefined`.")) : null : O(Z, K, Q, te, q);
      }
      var W = V.bind(null, !1);
      return W.isRequired = V.bind(null, !0), W;
    }
    function x(O) {
      function I(j, V, W, U, Z, K) {
        var Q = j[V], te = _(Q);
        if (te !== O) {
          var q = z(Q);
          return new h(
            "Invalid " + U + " `" + Z + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return m(I);
    }
    function b() {
      return m(i);
    }
    function y(O) {
      function I(j, V, W, U, Z) {
        if (typeof O != "function")
          return new h("Property `" + Z + "` of component `" + W + "` has invalid PropType notation inside arrayOf.");
        var K = j[V];
        if (!Array.isArray(K)) {
          var Q = _(K);
          return new h("Invalid " + U + " `" + Z + "` of type " + ("`" + Q + "` supplied to `" + W + "`, expected an array."));
        }
        for (var te = 0; te < K.length; te++) {
          var q = O(K, te, W, U, Z + "[" + te + "]", n);
          if (q instanceof Error)
            return q;
        }
        return null;
      }
      return m(I);
    }
    function w() {
      function O(I, j, V, W, U) {
        var Z = I[j];
        if (!s(Z)) {
          var K = _(Z);
          return new h("Invalid " + W + " `" + U + "` of type " + ("`" + K + "` supplied to `" + V + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(O);
    }
    function S() {
      function O(I, j, V, W, U) {
        var Z = I[j];
        if (!e.isValidElementType(Z)) {
          var K = _(Z);
          return new h("Invalid " + W + " `" + U + "` of type " + ("`" + K + "` supplied to `" + V + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(O);
    }
    function k(O) {
      function I(j, V, W, U, Z) {
        if (!(j[V] instanceof O)) {
          var K = O.name || f, Q = N(j[V]);
          return new h("Invalid " + U + " `" + Z + "` of type " + ("`" + Q + "` supplied to `" + W + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return m(I);
    }
    function M(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function I(j, V, W, U, Z) {
        for (var K = j[V], Q = 0; Q < O.length; Q++)
          if (p(K, O[Q]))
            return null;
        var te = JSON.stringify(O, function(se, G) {
          var pe = z(G);
          return pe === "symbol" ? String(G) : G;
        });
        return new h("Invalid " + U + " `" + Z + "` of value `" + String(K) + "` " + ("supplied to `" + W + "`, expected one of " + te + "."));
      }
      return m(I);
    }
    function C(O) {
      function I(j, V, W, U, Z) {
        if (typeof O != "function")
          return new h("Property `" + Z + "` of component `" + W + "` has invalid PropType notation inside objectOf.");
        var K = j[V], Q = _(K);
        if (Q !== "object")
          return new h("Invalid " + U + " `" + Z + "` of type " + ("`" + Q + "` supplied to `" + W + "`, expected an object."));
        for (var te in K)
          if (o(K, te)) {
            var q = O(K, te, W, U, Z + "." + te, n);
            if (q instanceof Error)
              return q;
          }
        return null;
      }
      return m(I);
    }
    function T(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var I = 0; I < O.length; I++) {
        var j = O[I];
        if (typeof j != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + R(j) + " at index " + I + "."
          ), i;
      }
      function V(W, U, Z, K, Q) {
        for (var te = [], q = 0; q < O.length; q++) {
          var se = O[q], G = se(W, U, Z, K, Q, n);
          if (G == null)
            return null;
          G.data && o(G.data, "expectedType") && te.push(G.data.expectedType);
        }
        var pe = te.length > 0 ? ", expected one of type [" + te.join(", ") + "]" : "";
        return new h("Invalid " + K + " `" + Q + "` supplied to " + ("`" + Z + "`" + pe + "."));
      }
      return m(V);
    }
    function D() {
      function O(I, j, V, W, U) {
        return E(I[j]) ? null : new h("Invalid " + W + " `" + U + "` supplied to " + ("`" + V + "`, expected a ReactNode."));
      }
      return m(O);
    }
    function F(O, I, j, V, W) {
      return new h(
        (O || "React class") + ": " + I + " type `" + j + "." + V + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + W + "`."
      );
    }
    function $(O) {
      function I(j, V, W, U, Z) {
        var K = j[V], Q = _(K);
        if (Q !== "object")
          return new h("Invalid " + U + " `" + Z + "` of type `" + Q + "` " + ("supplied to `" + W + "`, expected `object`."));
        for (var te in O) {
          var q = O[te];
          if (typeof q != "function")
            return F(W, U, Z, te, z(q));
          var se = q(K, te, W, U, Z + "." + te, n);
          if (se)
            return se;
        }
        return null;
      }
      return m(I);
    }
    function P(O) {
      function I(j, V, W, U, Z) {
        var K = j[V], Q = _(K);
        if (Q !== "object")
          return new h("Invalid " + U + " `" + Z + "` of type `" + Q + "` " + ("supplied to `" + W + "`, expected `object`."));
        var te = t({}, j[V], O);
        for (var q in te) {
          var se = O[q];
          if (o(O, q) && typeof se != "function")
            return F(W, U, Z, q, z(se));
          if (!se)
            return new h(
              "Invalid " + U + " `" + Z + "` key `" + q + "` supplied to `" + W + "`.\nBad object: " + JSON.stringify(j[V], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var G = se(K, q, W, U, Z + "." + q, n);
          if (G)
            return G;
        }
        return null;
      }
      return m(I);
    }
    function E(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(E);
          if (O === null || s(O))
            return !0;
          var I = d(O);
          if (I) {
            var j = I.call(O), V;
            if (I !== O.entries) {
              for (; !(V = j.next()).done; )
                if (!E(V.value))
                  return !1;
            } else
              for (; !(V = j.next()).done; ) {
                var W = V.value;
                if (W && !E(W[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function A(O, I) {
      return O === "symbol" ? !0 : I ? I["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && I instanceof Symbol : !1;
    }
    function _(O) {
      var I = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : A(I, O) ? "symbol" : I;
    }
    function z(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var I = _(O);
      if (I === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return I;
    }
    function R(O) {
      var I = z(O);
      switch (I) {
        case "array":
        case "object":
          return "an " + I;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + I;
        default:
          return I;
      }
    }
    function N(O) {
      return !O.constructor || !O.constructor.name ? f : O.constructor.name;
    }
    return g.checkPropTypes = r, g.resetWarningCache = r.resetWarningCache, g.PropTypes = g, g;
  }, ti;
}
var ni, Sc;
function Zh() {
  if (Sc)
    return ni;
  Sc = 1;
  var e = ws();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, ni = function() {
    function o(i, s, c, u, l, d) {
      if (d !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
      }
    }
    o.isRequired = o;
    function r() {
      return o;
    }
    var a = {
      array: o,
      bigint: o,
      bool: o,
      func: o,
      number: o,
      object: o,
      string: o,
      symbol: o,
      any: o,
      arrayOf: r,
      element: o,
      elementType: o,
      instanceOf: r,
      node: o,
      objectOf: r,
      oneOf: r,
      oneOfType: r,
      shape: r,
      exact: r,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, ni;
}
if (process.env.NODE_ENV !== "production") {
  var Kh = fd(), Gh = !0;
  Di.exports = Yh()(Kh.isElement, Gh);
} else
  Di.exports = Zh()();
var Xh = Di.exports;
const J = /* @__PURE__ */ mn(Xh);
var ar = function(t) {
  return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}, Ct = {
  id: "__id__",
  display: "__display__"
}, Cc = function(t, n) {
  In(n === "id" || n === "display", 'Second arg must be either "id" or "display", got: "'.concat(n, '"'));
  var o = t.indexOf(Ct.display), r = t.indexOf(Ct.id);
  return o < 0 && (o = null), r < 0 && (r = null), In(o !== null || r !== null, "The markup '".concat(t, "' does not contain either of the placeholders '__id__' or '__display__'")), o !== null && r !== null ? n === "id" && r <= o || n === "display" && o <= r ? 0 : 1 : 0;
}, Qh = function(t) {
  var n = /^\/(.+)\/(\w+)?$/;
  return new RegExp(t.map(function(o) {
    var r = n.exec(o.toString()), a = br(r, 3), i = a[1], s = a[2];
    return In(!s, "RegExp flags are not supported. Change /".concat(i, "/").concat(s, " into /").concat(i, "/")), "(".concat(i, ")");
  }).join("|"), "g");
}, pd = function(t) {
  var n = 0;
  return t.indexOf("__id__") >= 0 && n++, t.indexOf("__display__") >= 0 && n++, n;
}, Jh = function() {
}, ko = function(t, n, o) {
  for (var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Jh, a = Qh(n.map(function(S) {
    return S.regex;
  })), i = 2, s = n.map(function(S) {
    var k = S.markup, M = i;
    return i += pd(k) + 1, M;
  }), c, u = 0, l = 0; (c = a.exec(t)) !== null; ) {
    var d = s.find(function(S) {
      return !!c[S];
    }), f = s.indexOf(d), g = n[f], p = g.markup, h = g.displayTransform, m = d + Cc(p, "id"), x = d + Cc(p, "display"), b = c[m], y = h(b, c[x]), w = t.substring(u, c.index);
    r(w, u, l), l += w.length, o(c[0], c.index, l, b, y, f, u), l += y.length, u = a.lastIndex;
  }
  u < t.length && r(t.substring(u), u, l);
}, sn = function(t, n) {
  var o = "";
  return ko(t, n, function(r, a, i, s, c) {
    o += c;
  }, function(r) {
    o += r;
  }), o;
}, Be = function(t, n, o) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
  if (typeof o != "number")
    return o;
  var a, i = function(u, l, d) {
    a === void 0 && d + u.length >= o && (a = l + o - d);
  }, s = function(u, l, d, f, g, p, h) {
    a === void 0 && d + g.length > o && (r === "NULL" ? a = null : a = l + (r === "END" ? u.length : 0));
  };
  return ko(t, n, s, i), a === void 0 ? t.length : a;
}, oo = function(t, n, o, r) {
  return t.substring(0, n) + r + t.substring(o);
}, e2 = function(t, n, o, r) {
  var a = o.selectionStartBefore, i = o.selectionEndBefore, s = o.selectionEndAfter, c = sn(t, r), u = c.length - n.length;
  a === "undefined" && (a = s + u), i === "undefined" && (i = a), a === i && i === s && c.length === n.length && (a = a - 1);
  var l = n.slice(a, s), d = Math.min(a, s), f = i;
  a === s && (f = Math.max(i, a + u));
  var g = Be(t, r, d, "START"), p = Be(t, r, f, "END"), h = Be(t, r, d, "NULL"), m = Be(t, r, f, "NULL"), x = h === null || m === null, b = oo(t, g, p, l);
  if (!x) {
    var y = sn(b, r);
    if (y !== n) {
      for (d = 0; n[d] === y[d]; )
        d++;
      l = n.slice(d, s), f = c.lastIndexOf(n.substring(s)), g = Be(t, r, d, "START"), p = Be(t, r, f, "END"), b = oo(t, g, p, l);
    }
  }
  return b;
}, Ec = function(t, n, o) {
  var r = o, a = !1, i = function(c, u, l, d, f, g, p) {
    l <= o && l + f.length > o && (r = l, a = !0);
  };
  if (ko(t, n, i), a)
    return r;
}, Jn = function(t, n) {
  var o = [];
  return ko(t, n, function(r, a, i, s, c, u, l) {
    o.push({
      id: s,
      display: c,
      childIndex: u,
      index: a,
      plainTextIndex: i
    });
  }), o;
}, hd = function(t, n) {
  return "".concat(t, "-").concat(n);
}, Bo = function(t) {
  return Object.values(t).reduce(function(n, o) {
    var r = o.results;
    return n + r.length;
  }, 0);
}, t2 = function(t, n) {
  var o = Jn(t, n), r = o[o.length - 1];
  return r ? r.plainTextIndex + r.display.length : 0;
}, n2 = function(t) {
  var n = ar(t), o = t[t.indexOf(Ct.display) + Ct.display.length], r = t[t.indexOf(Ct.id) + Ct.id.length];
  return new RegExp(n.replace(Ct.display, "([^".concat(ar(o || ""), "]+?)")).replace(Ct.id, "([^".concat(ar(r || ""), "]+?)")));
}, qt = function(t) {
  return Dn.toArray(t).map(function(n) {
    var o = n.props, r = o.markup, a = o.regex, i = o.displayTransform;
    return {
      markup: r,
      regex: a ? o2(a, r) : n2(r),
      displayTransform: i || function(s, c) {
        return c || s;
      }
    };
  });
}, o2 = function(t, n) {
  var o = new RegExp(t.toString() + "|").exec("").length - 1, r = pd(n);
  return In(o === r, "Number of capturing groups in RegExp ".concat(t.toString(), " (").concat(o, ") does not match the number of placeholders in the markup '").concat(n, "' (").concat(r, ")")), t;
}, r2 = function(t, n, o) {
  return t.replace(Ct.id, n).replace(Ct.display, o);
}, a2 = [{
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
}], i2 = function(t) {
  var n = t;
  return a2.forEach(function(o) {
    n = n.replace(o.letters, o.base);
  }), n;
}, _c = function(t) {
  return i2(t).toLowerCase();
}, md = function(t, n, o) {
  return o ? _c(t).indexOf(_c(n)) : t.toLowerCase().indexOf(n.toLowerCase());
}, s2 = function() {
  return !!document.documentMode;
}, Ri = function(t) {
  return typeof t == "number";
}, l2 = function(t) {
  return t === Object(t) ? Object.keys(t) : [];
}, c2 = function(t) {
  for (var n, o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++)
    r[a - 1] = arguments[a];
  var i = (n = []).concat.apply(n, r);
  return Object.keys(t).reduce(function(s, c) {
    return t.hasOwnProperty(c) && !i.includes(c) && t[c] !== void 0 && (s[c] = t[c]), s;
  }, {});
}, u2 = ["style", "className", "classNames"];
function kc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function Ac(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? kc(Object(n), !0).forEach(function(o) {
      le(e, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : kc(Object(n)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return e;
}
function Pr(e, t) {
  var n = function(r) {
    var a = function(c) {
      var u = c.style, l = c.className, d = c.classNames, f = Eh(c, u2), g = t ? t(f) : void 0, p = xs(e, {
        style: u,
        className: l,
        classNames: d
      }, g);
      return /* @__PURE__ */ H.createElement(r, ot({}, f, {
        style: p
      }));
    }, i = r.displayName || r.name || "Component";
    return a.displayName = "defaultStyle(".concat(i, ")"), /* @__PURE__ */ H.forwardRef(function(s, c) {
      return a(Ac(Ac({}, s), {}, {
        ref: c
      }));
    });
  };
  return n;
}
var d2 = function(t, n) {
  return t.hasOwnProperty(n) ? t[n]++ : t[n] = 0, n + "_" + t[n];
};
function bd(e) {
  var t = e.selectionStart, n = e.selectionEnd, o = e.value, r = o === void 0 ? "" : o, a = e.onCaretPositionChange, i = e.containerRef, s = e.children;
  e.singleLine;
  var c = e.style, u = fe({
    left: void 0,
    top: void 0
  }), l = br(u, 2), d = l[0], f = l[1], g = fe(), p = br(g, 2), h = p[0], m = p[1];
  ie(function() {
    x();
  });
  var x = function() {
    if (h) {
      var E = h.offsetLeft, A = h.offsetTop;
      if (!(d.left === E && d.top === A)) {
        var _ = {
          left: E,
          top: A
        };
        f(_), a(_);
      }
    }
  }, b = qt(s), y;
  n === t && (y = Be(r, b, t, "START"));
  var w = [], S = {}, k = w, M = 0, C = function(E, A, _) {
    if (Ri(y) && y >= A && y <= A + E.length) {
      var z = y - A;
      k.push(D(E.substring(0, z), M)), k = [D(E.substring(z), M)];
    } else
      k.push(D(E, M));
    M++;
  }, T = function(E, A, _, z, R, N, O) {
    var I = d2(S, z);
    k.push(F(z, R, N, I));
  }, D = function(E, A) {
    return /* @__PURE__ */ H.createElement("span", ot({}, c("substring"), {
      key: A
    }), E);
  }, F = function(E, A, _, z) {
    var R = {
      id: E,
      display: A,
      key: z
    }, N = Dn.toArray(s)[_];
    return /* @__PURE__ */ H.cloneElement(N, R);
  }, $ = function(E) {
    return /* @__PURE__ */ H.createElement("span", ot({}, c("caret"), {
      ref: m,
      key: "caret"
    }), E);
  };
  return ko(r, b, T, C), k.push(" "), k !== w && w.push($(k)), /* @__PURE__ */ H.createElement("div", ot({}, c, {
    ref: i
  }), w);
}
bd.propTypes = {
  selectionStart: J.number,
  selectionEnd: J.number,
  value: J.string.isRequired,
  onCaretPositionChange: J.func.isRequired,
  containerRef: J.oneOfType([J.func, J.shape({
    current: typeof Element > "u" ? J.any : J.instanceOf(Element)
  })]),
  children: J.oneOfType([J.element, J.arrayOf(J.element)]).isRequired
};
var f2 = Pr({
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
}), g2 = f2(bd);
function yd(e) {
  var t = e.id, n = e.focused, o = e.ignoreAccents, r = e.index, a = e.onClick, i = e.onMouseEnter, s = e.query, c = e.renderSuggestion, u = e.suggestion, l = e.style;
  e.className, e.classNames;
  var d = {
    onClick: a,
    onMouseEnter: i
  }, f = function() {
    var m = g(), x = p(m);
    return c ? c(u, s, x, r, n) : x;
  }, g = function() {
    if (typeof u == "string")
      return u;
    var m = u.id, x = u.display;
    return m === void 0 || !x ? m : x;
  }, p = function(m) {
    var x = md(m, s, o);
    return x === -1 ? /* @__PURE__ */ H.createElement("span", l("display"), m) : /* @__PURE__ */ H.createElement("span", l("display"), m.substring(0, x), /* @__PURE__ */ H.createElement("b", l("highlight"), m.substring(x, x + s.length)), m.substring(x + s.length));
  };
  return /* @__PURE__ */ H.createElement("li", ot({
    id: t,
    role: "option",
    "aria-selected": n
  }, d, l), f());
}
yd.propTypes = {
  id: J.string.isRequired,
  query: J.string.isRequired,
  index: J.number.isRequired,
  ignoreAccents: J.bool,
  suggestion: J.oneOfType([J.string, J.shape({
    id: J.oneOfType([J.string, J.number]).isRequired,
    display: J.string
  })]).isRequired,
  renderSuggestion: J.func,
  focused: J.bool
};
var p2 = Pr({
  cursor: "pointer"
}, function(e) {
  return {
    "&focused": e.focused
  };
}), h2 = p2(yd);
function m2(e) {
  var t = e.style, n = e.className, o = e.classNames, r = xs(b2, {
    style: t,
    className: n,
    classNames: o
  }), a = r("spinner");
  return /* @__PURE__ */ H.createElement("div", r, /* @__PURE__ */ H.createElement("div", a, /* @__PURE__ */ H.createElement("div", a(["element", "element1"])), /* @__PURE__ */ H.createElement("div", a(["element", "element2"])), /* @__PURE__ */ H.createElement("div", a(["element", "element3"])), /* @__PURE__ */ H.createElement("div", a(["element", "element4"])), /* @__PURE__ */ H.createElement("div", a(["element", "element5"]))));
}
var b2 = {};
function vd(e) {
  var t = e.id, n = e.suggestions, o = n === void 0 ? {} : n, r = e.a11ySuggestionsListLabel, a = e.focusIndex, i = e.position, s = e.left, c = e.right, u = e.top, l = e.scrollFocusedIntoView, d = e.isLoading, f = e.isOpened, g = e.onSelect, p = g === void 0 ? function() {
    return null;
  } : g, h = e.ignoreAccents, m = e.containerRef, x = e.children, b = e.style, y = e.customSuggestionsContainer, w = e.onMouseDown, S = e.onMouseEnter, k = fe(void 0), M = br(k, 2), C = M[0], T = M[1];
  ie(function() {
    if (!(!C || C.offsetHeight >= C.scrollHeight || !l)) {
      var _ = C.scrollTop, z = C.children[a].getBoundingClientRect(), R = z.top, N = z.bottom, O = C.getBoundingClientRect(), I = O.top;
      R = R - I + _, N = N - I + _, R < _ ? C.scrollTop = R : N > C.offsetHeight && (C.scrollTop = N - C.offsetHeight);
    }
  }, [a, l, C]);
  var D = function() {
    var z = /* @__PURE__ */ H.createElement("ul", ot({
      ref: T,
      id: t,
      role: "listbox",
      "aria-label": r
    }, b("list")), Object.values(o).reduce(function(R, N) {
      var O = N.results, I = N.queryInfo;
      return [].concat(hr(R), hr(O.map(function(j, V) {
        return F(j, I, R.length + V);
      })));
    }, []));
    return y ? y(z) : z;
  }, F = function(z, R, N) {
    var O = N === a, I = R.childIndex, j = R.query, V = Dn.toArray(x)[I].props.renderSuggestion;
    return /* @__PURE__ */ H.createElement(h2, {
      style: b("item"),
      key: "".concat(I, "-").concat(A(z)),
      id: hd(t, N),
      query: j,
      index: N,
      ignoreAccents: h,
      renderSuggestion: V,
      suggestion: z,
      focused: O,
      onClick: function() {
        return E(z, R);
      },
      onMouseEnter: function() {
        return P(N);
      }
    });
  }, $ = function() {
    if (d)
      return /* @__PURE__ */ H.createElement(m2, {
        style: b("loadingIndicator")
      });
  }, P = function(z, R) {
    S && S(z);
  }, E = function(z, R) {
    p(z, R);
  }, A = function(z) {
    return typeof z == "string" ? z : z.id;
  };
  return f ? /* @__PURE__ */ H.createElement("div", ot({}, $h({
    position: i || "absolute",
    left: s,
    right: c,
    top: u
  }, b), {
    onMouseDown: w,
    ref: m
  }), D(), $()) : null;
}
vd.propTypes = {
  id: J.string.isRequired,
  suggestions: J.object.isRequired,
  a11ySuggestionsListLabel: J.string,
  focusIndex: J.number,
  position: J.string,
  left: J.number,
  right: J.number,
  top: J.number,
  scrollFocusedIntoView: J.bool,
  isLoading: J.bool,
  isOpened: J.bool.isRequired,
  onSelect: J.func,
  ignoreAccents: J.bool,
  customSuggestionsContainer: J.func,
  containerRef: J.oneOfType([J.func, J.shape({
    current: typeof Element > "u" ? J.any : J.instanceOf(Element)
  })])
};
var y2 = Pr({
  zIndex: 1,
  backgroundColor: "white",
  marginTop: 14,
  minWidth: 100,
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
}), v2 = y2(vd);
function Mc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mc(Object(n), !0).forEach(function(o) {
      le(e, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Mc(Object(n)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return e;
}
function x2(e) {
  var t = w2();
  return function() {
    var o = mr(e), r;
    if (t) {
      var a = mr(this).constructor;
      r = Reflect.construct(o, arguments, a);
    } else
      r = o.apply(this, arguments);
    return bh(this, r);
  };
}
function w2() {
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
var S2 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t instanceof RegExp)
    return t;
  var o = n.allowSpaceInQuery, r = ar(t);
  return new RegExp("(?:^|\\s)(".concat(r, "([^").concat(o ? "" : "\\s").concat(r, "]*))$"));
}, C2 = function(t, n) {
  return t instanceof Array ? function(o, r) {
    for (var a = [], i = 0, s = t.length; i < s; ++i) {
      var c = t[i].display || t[i].id;
      md(c, o, n) >= 0 && a.push(t[i]);
    }
    return a;
  } : t;
}, xn = {
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  UP: 38,
  DOWN: 40
}, $o = !1, xd = {
  /**
   * If set to `true` a regular text input element will be rendered
   * instead of a textarea
   */
  singleLine: J.bool,
  allowSpaceInQuery: J.bool,
  allowSuggestionsAboveCursor: J.bool,
  forceSuggestionsAboveCursor: J.bool,
  ignoreAccents: J.bool,
  a11ySuggestionsListLabel: J.string,
  value: J.string,
  onKeyDown: J.func,
  customSuggestionsContainer: J.func,
  onSelect: J.func,
  onBlur: J.func,
  onChange: J.func,
  suggestionsPortalHost: typeof Element > "u" ? J.any : J.PropTypes.instanceOf(Element),
  inputRef: J.oneOfType([J.func, J.shape({
    current: typeof Element > "u" ? J.any : J.instanceOf(Element)
  })]),
  children: J.oneOfType([J.element, J.arrayOf(J.element)]).isRequired
}, Ss = /* @__PURE__ */ function(e) {
  mh(n, e);
  var t = x2(n);
  function n(o) {
    var r;
    return ph(this, n), r = t.call(this, o), le(de(r), "setContainerElement", function(a) {
      r.containerElement = a;
    }), le(de(r), "getInputProps", function() {
      var a = r.props, i = a.readOnly, s = a.disabled, c = a.style, u = c2(
        r.props,
        ["style", "classNames", "className"],
        // substyle props
        l2(xd)
      );
      return ct(ct(ct(ct({}, u), c("input")), {}, {
        value: r.getPlainText(),
        onScroll: r.updateHighlighterScroll
      }, !i && !s && {
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
        "aria-activedescendant": hd(r.uuidSuggestionsOverlay, r.state.focusIndex)
      });
    }), le(de(r), "renderControl", function() {
      var a = r.props, i = a.singleLine, s = a.style, c = r.getInputProps();
      return /* @__PURE__ */ H.createElement("div", s("control"), r.renderHighlighter(), i ? r.renderInput(c) : r.renderTextarea(c));
    }), le(de(r), "renderInput", function(a) {
      return /* @__PURE__ */ H.createElement("input", ot({
        type: "text",
        ref: r.setInputRef
      }, a));
    }), le(de(r), "renderTextarea", function(a) {
      return /* @__PURE__ */ H.createElement("textarea", ot({
        ref: r.setInputRef
      }, a));
    }), le(de(r), "setInputRef", function(a) {
      r.inputElement = a;
      var i = r.props.inputRef;
      typeof i == "function" ? i(a) : i && (i.current = a);
    }), le(de(r), "setSuggestionsElement", function(a) {
      r.suggestionsElement = a;
    }), le(de(r), "renderSuggestionsOverlay", function() {
      if (!Ri(r.state.selectionStart))
        return null;
      var a = r.state.suggestionsPosition, i = a.position, s = a.left, c = a.top, u = a.right, l = /* @__PURE__ */ H.createElement(v2, {
        id: r.uuidSuggestionsOverlay,
        style: r.props.style("suggestions"),
        position: i,
        left: s,
        top: c,
        right: u,
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
      return r.props.suggestionsPortalHost ? /* @__PURE__ */ Y1.createPortal(l, r.props.suggestionsPortalHost) : l;
    }), le(de(r), "renderHighlighter", function() {
      var a = r.state, i = a.selectionStart, s = a.selectionEnd, c = r.props, u = c.singleLine, l = c.children, d = c.value, f = c.style;
      return /* @__PURE__ */ H.createElement(g2, {
        containerRef: r.setHighlighterElement,
        style: f("highlighter"),
        value: d,
        singleLine: u,
        selectionStart: i,
        selectionEnd: s,
        onCaretPositionChange: r.handleCaretPositionChange
      }, l);
    }), le(de(r), "setHighlighterElement", function(a) {
      r.highlighterElement = a;
    }), le(de(r), "handleCaretPositionChange", function(a) {
      r.setState({
        caretPosition: a
      });
    }), le(de(r), "getPlainText", function() {
      return sn(r.props.value || "", qt(r.props.children));
    }), le(de(r), "executeOnChange", function(a) {
      for (var i = arguments.length, s = new Array(i > 1 ? i - 1 : 0), c = 1; c < i; c++)
        s[c - 1] = arguments[c];
      if (r.props.onChange) {
        var u;
        return (u = r.props).onChange.apply(u, [a].concat(s));
      }
      if (r.props.valueLink) {
        var l;
        return (l = r.props.valueLink).requestChange.apply(l, [a.target.value].concat(s));
      }
    }), le(de(r), "handleChange", function(a) {
      if ($o = !1, s2()) {
        var i = document.activeElement && document.activeElement.contentDocument || document;
        if (i.activeElement !== a.target)
          return;
      }
      var s = r.props.value || "", c = qt(r.props.children), u = a.target.value, l = r.state.selectionStart;
      l == null && (l = a.target.selectionStart);
      var d = r.state.selectionEnd;
      d == null && (d = a.target.selectionEnd);
      var f = e2(s, u, {
        selectionStartBefore: l,
        selectionEndBefore: d,
        selectionEndAfter: a.target.selectionEnd
      }, c);
      u = sn(f, c);
      var g = a.target.selectionStart, p = a.target.selectionEnd, h = !1, m = Ec(s, c, g);
      m !== void 0 && r.state.selectionEnd > m && (g = m + (a.nativeEvent.data ? a.nativeEvent.data.length : 0), p = g, h = !0), r.setState({
        selectionStart: g,
        selectionEnd: p,
        setSelectionAfterMentionChange: h
      });
      var x = Jn(f, c);
      a.nativeEvent.isComposing && g === p && r.updateMentionsQueries(r.inputElement.value, g);
      var b = {
        target: {
          value: f
        }
      };
      r.executeOnChange(b, f, u, x);
    }), le(de(r), "handleSelect", function(a) {
      if (r.setState({
        selectionStart: a.target.selectionStart,
        selectionEnd: a.target.selectionEnd
      }), !$o) {
        var i = r.inputElement;
        a.target.selectionStart === a.target.selectionEnd ? r.updateMentionsQueries(i.value, a.target.selectionStart) : r.clearSuggestions(), r.updateHighlighterScroll(), r.props.onSelect(a);
      }
    }), le(de(r), "handleKeyDown", function(a) {
      var i = Bo(r.state.suggestions);
      if (i === 0 || !r.suggestionsElement) {
        r.props.onKeyDown(a);
        return;
      }
      switch (Object.values(xn).indexOf(a.keyCode) >= 0 && (a.preventDefault(), a.stopPropagation()), a.keyCode) {
        case xn.ESC: {
          r.clearSuggestions();
          return;
        }
        case xn.DOWN: {
          r.shiftFocus(1);
          return;
        }
        case xn.UP: {
          r.shiftFocus(-1);
          return;
        }
        case xn.RETURN: {
          r.selectFocused();
          return;
        }
        case xn.TAB: {
          r.selectFocused();
          return;
        }
        default:
          return;
      }
    }), le(de(r), "shiftFocus", function(a) {
      var i = Bo(r.state.suggestions);
      r.setState({
        focusIndex: (i + r.state.focusIndex + a) % i,
        scrollFocusedIntoView: !0
      });
    }), le(de(r), "selectFocused", function() {
      var a = r.state, i = a.suggestions, s = a.focusIndex, c = Object.values(i).reduce(function(d, f) {
        var g = f.results, p = f.queryInfo;
        return [].concat(hr(d), hr(g.map(function(h) {
          return {
            result: h,
            queryInfo: p
          };
        })));
      }, [])[s], u = c.result, l = c.queryInfo;
      r.addMention(u, l), r.setState({
        focusIndex: 0
      });
    }), le(de(r), "handleBlur", function(a) {
      var i = r._suggestionsMouseDown;
      r._suggestionsMouseDown = !1, i || r.setState({
        selectionStart: null,
        selectionEnd: null
      }), window.setTimeout(function() {
        r.updateHighlighterScroll();
      }, 1), r.props.onBlur(a, i);
    }), le(de(r), "handleSuggestionsMouseDown", function(a) {
      r._suggestionsMouseDown = !0;
    }), le(de(r), "handleSuggestionsMouseEnter", function(a) {
      r.setState({
        focusIndex: a,
        scrollFocusedIntoView: !1
      });
    }), le(de(r), "updateSuggestionsPosition", function() {
      var a = r.state.caretPosition, i = r.props, s = i.suggestionsPortalHost, c = i.allowSuggestionsAboveCursor, u = i.forceSuggestionsAboveCursor;
      if (!(!a || !r.suggestionsElement)) {
        var l = r.suggestionsElement, d = r.highlighterElement, f = d.getBoundingClientRect(), g = oi(d, "font-size"), p = {
          left: f.left + a.left,
          top: f.top + a.top + g
        }, h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (l) {
          var m = {};
          if (s) {
            m.position = "fixed";
            var x = p.left, b = p.top;
            x -= oi(l, "margin-left"), b -= oi(l, "margin-top"), x -= d.scrollLeft, b -= d.scrollTop;
            var y = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            x + l.offsetWidth > y ? m.left = Math.max(0, y - l.offsetWidth) : m.left = x, c && b + l.offsetHeight > h && l.offsetHeight < b - g || u ? m.top = Math.max(0, b - l.offsetHeight - g) : m.top = b;
          } else {
            var w = a.left - d.scrollLeft, S = a.top - d.scrollTop;
            w + l.offsetWidth > r.containerElement.offsetWidth ? m.right = 0 : m.left = w, c && p.top - d.scrollTop + l.offsetHeight > h && l.offsetHeight < f.top - g - d.scrollTop || u ? m.top = S - l.offsetHeight - g : m.top = S;
          }
          m.left === r.state.suggestionsPosition.left && m.top === r.state.suggestionsPosition.top && m.position === r.state.suggestionsPosition.position || r.setState({
            suggestionsPosition: m
          });
        }
      }
    }), le(de(r), "updateHighlighterScroll", function() {
      var a = r.inputElement, i = r.highlighterElement;
      !a || !i || (i.scrollLeft = a.scrollLeft, i.scrollTop = a.scrollTop, i.height = a.height);
    }), le(de(r), "handleCompositionStart", function() {
      $o = !0;
    }), le(de(r), "handleCompositionEnd", function() {
      $o = !1;
    }), le(de(r), "setSelection", function(a, i) {
      if (!(a === null || i === null)) {
        var s = r.inputElement;
        if (s.setSelectionRange)
          s.setSelectionRange(a, i);
        else if (s.createTextRange) {
          var c = s.createTextRange();
          c.collapse(!0), c.moveEnd("character", i), c.moveStart("character", a), c.select();
        }
      }
    }), le(de(r), "updateMentionsQueries", function(a, i) {
      r._queryId++, r.suggestions = {}, r.setState({
        suggestions: {}
      });
      var s = r.props.value || "", c = r.props.children, u = qt(c), l = Be(s, u, i, "NULL");
      if (l !== null) {
        var d = t2(s.substring(0, l), u), f = a.substring(d, i);
        H.Children.forEach(c, function(g, p) {
          if (g) {
            var h = S2(g.props.trigger, r.props), m = f.match(h);
            if (m) {
              var x = d + f.indexOf(m[1], m.index);
              r.queryData(m[2], p, x, x + m[1].length, a);
            }
          }
        });
      }
    }), le(de(r), "clearSuggestions", function() {
      r._queryId++, r.suggestions = {}, r.setState({
        suggestions: {},
        focusIndex: 0
      });
    }), le(de(r), "queryData", function(a, i, s, c, u) {
      var l = r.props, d = l.children, f = l.ignoreAccents, g = Dn.toArray(d)[i], p = C2(g.props.data, f), h = p(a, r.updateSuggestions.bind(null, r._queryId, i, a, s, c, u));
      h instanceof Array && r.updateSuggestions(r._queryId, i, a, s, c, u, h);
    }), le(de(r), "updateSuggestions", function(a, i, s, c, u, l, d) {
      if (a === r._queryId) {
        r.suggestions = ct(ct({}, r.suggestions), {}, le({}, i, {
          queryInfo: {
            childIndex: i,
            query: s,
            querySequenceStart: c,
            querySequenceEnd: u,
            plainTextValue: l
          },
          results: d
        }));
        var f = r.state.focusIndex, g = Bo(r.suggestions);
        r.setState({
          suggestions: r.suggestions,
          focusIndex: f >= g ? Math.max(g - 1, 0) : f
        });
      }
    }), le(de(r), "addMention", function(a, i) {
      var s = a.id, c = a.display, u = i.childIndex, l = i.querySequenceStart, d = i.querySequenceEnd, f = i.plainTextValue, g = r.props.value || "", p = qt(r.props.children), h = Dn.toArray(r.props.children)[u], m = h.props, x = m.markup, b = m.displayTransform, y = m.appendSpaceOnAdd, w = m.onAdd, S = Be(g, p, l, "START"), k = S + d - l, M = r2(x, s, c);
      y && (M += " ");
      var C = oo(g, S, k, M);
      r.inputElement.focus();
      var T = b(s, c);
      y && (T += " ");
      var D = l + T.length;
      r.setState({
        selectionStart: D,
        selectionEnd: D,
        setSelectionAfterMentionChange: !0
      });
      var F = {
        target: {
          value: C
        }
      }, $ = Jn(C, p), P = oo(f, l, d, T);
      r.executeOnChange(F, C, P, $), w && w(s, c, S, k), r.clearSuggestions();
    }), le(de(r), "isLoading", function() {
      var a = !1;
      return H.Children.forEach(r.props.children, function(i) {
        a = a || i && i.props.isLoading;
      }), a;
    }), le(de(r), "isOpened", function() {
      return Ri(r.state.selectionStart) && (Bo(r.state.suggestions) !== 0 || r.isLoading());
    }), le(de(r), "_queryId", 0), r.suggestions = {}, r.uuidSuggestionsOverlay = Math.random().toString(16).substring(2), r.handleCopy = r.handleCopy.bind(de(r)), r.handleCut = r.handleCut.bind(de(r)), r.handlePaste = r.handlePaste.bind(de(r)), r.state = {
      focusIndex: 0,
      selectionStart: null,
      selectionEnd: null,
      suggestions: {},
      caretPosition: null,
      suggestionsPosition: {},
      setSelectionAfterHandlePaste: !1
    }, r;
  }
  return hh(n, [{
    key: "componentDidMount",
    value: function() {
      document.addEventListener("copy", this.handleCopy), document.addEventListener("cut", this.handleCut), document.addEventListener("paste", this.handlePaste), this.updateSuggestionsPosition();
    }
  }, {
    key: "componentDidUpdate",
    value: function(r, a) {
      a.suggestionsPosition === this.state.suggestionsPosition && this.updateSuggestionsPosition(), this.state.setSelectionAfterMentionChange && (this.setState({
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
      return /* @__PURE__ */ H.createElement("div", ot({
        ref: this.setContainerElement
      }, this.props.style), this.renderControl(), this.renderSuggestionsOverlay());
    }
  }, {
    key: "handlePaste",
    value: function(r) {
      if (r.target === this.inputElement && this.supportsClipboardActions(r)) {
        r.preventDefault();
        var a = this.state, i = a.selectionStart, s = a.selectionEnd, c = this.props, u = c.value, l = c.children, d = qt(l), f = Be(u, d, i, "START"), g = Be(u, d, s, "END"), p = r.clipboardData.getData("text/react-mentions"), h = r.clipboardData.getData("text/plain"), m = oo(u, f, g, p || h).replace(/\r/g, ""), x = sn(m, d), b = {
          target: ct(ct({}, r.target), {}, {
            value: m
          })
        };
        this.executeOnChange(b, m, x, Jn(m, d));
        var y = Ec(u, d, i), w = (y || i) + sn(p || h, d).length;
        this.setState({
          selectionStart: w,
          selectionEnd: w,
          setSelectionAfterHandlePaste: !0
        });
      }
    }
  }, {
    key: "saveSelectionToClipboard",
    value: function(r) {
      var a = this.inputElement.selectionStart, i = this.inputElement.selectionEnd, s = this.props, c = s.children, u = s.value, l = qt(c), d = Be(u, l, a, "START"), f = Be(u, l, i, "END");
      r.clipboardData.setData("text/plain", r.target.value.slice(a, i)), r.clipboardData.setData("text/react-mentions", u.slice(d, f));
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
        var a = this.state, i = a.selectionStart, s = a.selectionEnd, c = this.props, u = c.children, l = c.value, d = qt(u), f = Be(l, d, i, "START"), g = Be(l, d, s, "END"), p = [l.slice(0, f), l.slice(g)].join(""), h = sn(p, d), m = {
          target: ct(ct({}, r.target), {}, {
            value: h
          })
        };
        this.executeOnChange(m, p, h, Jn(l, d));
      }
    }
    // Handle input element's change event
  }]), n;
}(H.Component);
le(Ss, "propTypes", xd);
le(Ss, "defaultProps", {
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
var oi = function(t, n) {
  var o = parseFloat(window.getComputedStyle(t, null).getPropertyValue(n));
  return isFinite(o) ? o : 0;
}, E2 = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent), _2 = Pr({
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
    input: ct({
      height: "100%",
      bottom: 0,
      overflow: "hidden",
      resize: "none"
    }, E2 ? {
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
}), k2 = _2(Ss), A2 = {
  fontWeight: "inherit"
}, Cs = function(t) {
  var n = t.display, o = t.style, r = t.className, a = t.classNames, i = xs(A2, {
    style: o,
    className: r,
    classNames: a
  });
  return /* @__PURE__ */ H.createElement("strong", i, n);
};
Cs.propTypes = {
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
  onAdd: J.func,
  onRemove: J.func,
  renderSuggestion: J.func,
  trigger: J.oneOfType([J.string, J.instanceOf(RegExp)]),
  markup: J.string,
  displayTransform: J.func,
  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: J.bool,
  isLoading: J.bool
};
Cs.defaultProps = {
  trigger: "@",
  markup: "@[__display__](__id__)",
  displayTransform: function(t, n) {
    return n || t;
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
const M2 = {
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
    backgroundColor: "var(--background--01)",
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
        backgroundColor: "var(--background--04)"
      }
    }
  }
}, T2 = ({
  value: e,
  setValue: t,
  users: n,
  placeholder: o = "Type your reply here...",
  onEnterKeypress: r
}) => {
  const a = n.map((u) => ({
    ...u,
    display: u.display_name
  })), i = (u) => {
    u.stopPropagation(), u.key === "Enter" && !u.shiftKey && (u.preventDefault(), r == null || r());
  }, s = (u, l) => {
    console.info("[MentionsInputComponent] on mention select", { id: u, display: l });
  }, c = (u) => {
    t(u.target.value);
  };
  return /* @__PURE__ */ v.jsx(
    k2,
    {
      autoFocus: !0,
      value: e,
      onChange: c,
      style: {
        ...M2,
        minHeight: "40px",
        marginBottom: "10px"
      },
      placeholder: o,
      className: "mentions-input",
      onKeyDown: i,
      children: /* @__PURE__ */ v.jsx(
        Cs,
        {
          displayTransform: (u, l) => `@${l}`,
          trigger: "@",
          markup: "@[__id__](__display__)",
          data: a,
          appendSpaceOnAdd: !0,
          renderSuggestion: (u, l) => /* @__PURE__ */ v.jsx("div", { className: `user ${l ? "focused" : ""}`, children: u.display }),
          onAdd: s
        }
      )
    }
  );
}, O2 = T2, N2 = ({
  comment: e,
  setComment: t,
  loading: n,
  users: o,
  currentUser: r,
  placeholder: a,
  onEnterKeypress: i
}) => /* @__PURE__ */ v.jsxs("div", { className: Ft.conversationInputForm, children: [
  r ? /* @__PURE__ */ v.jsx(rd, { user: r }) : null,
  /* @__PURE__ */ v.jsx(
    O2,
    {
      value: e,
      setValue: t,
      users: o,
      placeholder: a,
      onEnterKeypress: i
    }
  ),
  /* @__PURE__ */ v.jsx(Jg, { loading: n, color: "primary", children: /* @__PURE__ */ v.jsx(zp, {}) })
] }), wd = N2, D2 = ({
  meta: { highlight: e, filePath: t, field: n, column: o }
}) => {
  if (!e)
    return null;
  const r = o ? `${t} (${o})` : t;
  return /* @__PURE__ */ v.jsx("div", { className: Ft.highlightText, children: /* @__PURE__ */ v.jsx(
    n0,
    {
      code: e,
      language: n ? "markdown" : "sql",
      showLineNumbers: !n,
      fileName: r
    }
  ) });
}, Sd = D2, R2 = () => {
  const e = we(
    (l) => l.users
  ), t = we(
    (l) => l.newConversation
  ), n = we(
    (l) => l.currentUserId ? l.users[l.currentUserId] : null
  ), o = we(
    (l) => l.shareId
  ), r = rt(), [a, i] = fe(!1), [s, c] = fe(""), u = async (l) => {
    if (l == null || l.stopPropagation(), l == null || l.preventDefault(), !(!t || !o)) {
      i(!0);
      try {
        console.log("saving conversation", t, s);
        const d = await Hp(
          o,
          {
            ...t,
            message: s
          },
          "dbt-docs"
          // this component is used only from dbt docs page
        );
        if (!d.conversation_group_id) {
          console.error(
            "Unable to create conversation group",
            d
          );
          return;
        }
        console.log(
          "Successfully created conversation group",
          d
        );
      } catch (d) {
        console.error("error while saving conversation", t, d);
      }
      r(Ju()), i(!1), r(ms(!0)), r(bs()), c("");
    }
  };
  return /* @__PURE__ */ v.jsx(Eo, { className: Ft.newConversationForm, children: /* @__PURE__ */ v.jsx(_o, { children: /* @__PURE__ */ v.jsxs("form", { onSubmit: u, children: [
    /* @__PURE__ */ v.jsx("h4", { children: "Add comment" }),
    /* @__PURE__ */ v.jsx(
      Sd,
      {
        meta: (t == null ? void 0 : t.meta) || {}
      }
    ),
    /* @__PURE__ */ v.jsx(
      wd,
      {
        comment: s,
        setComment: c,
        loading: a,
        users: Object.values(e),
        currentUser: n,
        placeholder: "Start a conversation or add others with @",
        onEnterKeypress: u
      }
    )
  ] }) }) });
}, z2 = R2;
var Cd = { exports: {} };
(function(e, t) {
  (function(n, o) {
    e.exports = o();
  })(wi, function() {
    var n = 1e3, o = 6e4, r = 36e5, a = "millisecond", i = "second", s = "minute", c = "hour", u = "day", l = "week", d = "month", f = "quarter", g = "year", p = "date", h = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, x = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, b = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(E) {
      var A = ["th", "st", "nd", "rd"], _ = E % 100;
      return "[" + E + (A[(_ - 20) % 10] || A[_] || A[0]) + "]";
    } }, y = function(E, A, _) {
      var z = String(E);
      return !z || z.length >= A ? E : "" + Array(A + 1 - z.length).join(_) + E;
    }, w = { s: y, z: function(E) {
      var A = -E.utcOffset(), _ = Math.abs(A), z = Math.floor(_ / 60), R = _ % 60;
      return (A <= 0 ? "+" : "-") + y(z, 2, "0") + ":" + y(R, 2, "0");
    }, m: function E(A, _) {
      if (A.date() < _.date())
        return -E(_, A);
      var z = 12 * (_.year() - A.year()) + (_.month() - A.month()), R = A.clone().add(z, d), N = _ - R < 0, O = A.clone().add(z + (N ? -1 : 1), d);
      return +(-(z + (_ - R) / (N ? R - O : O - R)) || 0);
    }, a: function(E) {
      return E < 0 ? Math.ceil(E) || 0 : Math.floor(E);
    }, p: function(E) {
      return { M: d, y: g, w: l, d: u, D: p, h: c, m: s, s: i, ms: a, Q: f }[E] || String(E || "").toLowerCase().replace(/s$/, "");
    }, u: function(E) {
      return E === void 0;
    } }, S = "en", k = {};
    k[S] = b;
    var M = "$isDayjsObject", C = function(E) {
      return E instanceof $ || !(!E || !E[M]);
    }, T = function E(A, _, z) {
      var R;
      if (!A)
        return S;
      if (typeof A == "string") {
        var N = A.toLowerCase();
        k[N] && (R = N), _ && (k[N] = _, R = N);
        var O = A.split("-");
        if (!R && O.length > 1)
          return E(O[0]);
      } else {
        var I = A.name;
        k[I] = A, R = I;
      }
      return !z && R && (S = R), R || !z && S;
    }, D = function(E, A) {
      if (C(E))
        return E.clone();
      var _ = typeof A == "object" ? A : {};
      return _.date = E, _.args = arguments, new $(_);
    }, F = w;
    F.l = T, F.i = C, F.w = function(E, A) {
      return D(E, { locale: A.$L, utc: A.$u, x: A.$x, $offset: A.$offset });
    };
    var $ = function() {
      function E(_) {
        this.$L = T(_.locale, null, !0), this.parse(_), this.$x = this.$x || _.x || {}, this[M] = !0;
      }
      var A = E.prototype;
      return A.parse = function(_) {
        this.$d = function(z) {
          var R = z.date, N = z.utc;
          if (R === null)
            return /* @__PURE__ */ new Date(NaN);
          if (F.u(R))
            return /* @__PURE__ */ new Date();
          if (R instanceof Date)
            return new Date(R);
          if (typeof R == "string" && !/Z$/i.test(R)) {
            var O = R.match(m);
            if (O) {
              var I = O[2] - 1 || 0, j = (O[7] || "0").substring(0, 3);
              return N ? new Date(Date.UTC(O[1], I, O[3] || 1, O[4] || 0, O[5] || 0, O[6] || 0, j)) : new Date(O[1], I, O[3] || 1, O[4] || 0, O[5] || 0, O[6] || 0, j);
            }
          }
          return new Date(R);
        }(_), this.init();
      }, A.init = function() {
        var _ = this.$d;
        this.$y = _.getFullYear(), this.$M = _.getMonth(), this.$D = _.getDate(), this.$W = _.getDay(), this.$H = _.getHours(), this.$m = _.getMinutes(), this.$s = _.getSeconds(), this.$ms = _.getMilliseconds();
      }, A.$utils = function() {
        return F;
      }, A.isValid = function() {
        return this.$d.toString() !== h;
      }, A.isSame = function(_, z) {
        var R = D(_);
        return this.startOf(z) <= R && R <= this.endOf(z);
      }, A.isAfter = function(_, z) {
        return D(_) < this.startOf(z);
      }, A.isBefore = function(_, z) {
        return this.endOf(z) < D(_);
      }, A.$g = function(_, z, R) {
        return F.u(_) ? this[z] : this.set(R, _);
      }, A.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, A.valueOf = function() {
        return this.$d.getTime();
      }, A.startOf = function(_, z) {
        var R = this, N = !!F.u(z) || z, O = F.p(_), I = function(te, q) {
          var se = F.w(R.$u ? Date.UTC(R.$y, q, te) : new Date(R.$y, q, te), R);
          return N ? se : se.endOf(u);
        }, j = function(te, q) {
          return F.w(R.toDate()[te].apply(R.toDate("s"), (N ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(q)), R);
        }, V = this.$W, W = this.$M, U = this.$D, Z = "set" + (this.$u ? "UTC" : "");
        switch (O) {
          case g:
            return N ? I(1, 0) : I(31, 11);
          case d:
            return N ? I(1, W) : I(0, W + 1);
          case l:
            var K = this.$locale().weekStart || 0, Q = (V < K ? V + 7 : V) - K;
            return I(N ? U - Q : U + (6 - Q), W);
          case u:
          case p:
            return j(Z + "Hours", 0);
          case c:
            return j(Z + "Minutes", 1);
          case s:
            return j(Z + "Seconds", 2);
          case i:
            return j(Z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, A.endOf = function(_) {
        return this.startOf(_, !1);
      }, A.$set = function(_, z) {
        var R, N = F.p(_), O = "set" + (this.$u ? "UTC" : ""), I = (R = {}, R[u] = O + "Date", R[p] = O + "Date", R[d] = O + "Month", R[g] = O + "FullYear", R[c] = O + "Hours", R[s] = O + "Minutes", R[i] = O + "Seconds", R[a] = O + "Milliseconds", R)[N], j = N === u ? this.$D + (z - this.$W) : z;
        if (N === d || N === g) {
          var V = this.clone().set(p, 1);
          V.$d[I](j), V.init(), this.$d = V.set(p, Math.min(this.$D, V.daysInMonth())).$d;
        } else
          I && this.$d[I](j);
        return this.init(), this;
      }, A.set = function(_, z) {
        return this.clone().$set(_, z);
      }, A.get = function(_) {
        return this[F.p(_)]();
      }, A.add = function(_, z) {
        var R, N = this;
        _ = Number(_);
        var O = F.p(z), I = function(W) {
          var U = D(N);
          return F.w(U.date(U.date() + Math.round(W * _)), N);
        };
        if (O === d)
          return this.set(d, this.$M + _);
        if (O === g)
          return this.set(g, this.$y + _);
        if (O === u)
          return I(1);
        if (O === l)
          return I(7);
        var j = (R = {}, R[s] = o, R[c] = r, R[i] = n, R)[O] || 1, V = this.$d.getTime() + _ * j;
        return F.w(V, this);
      }, A.subtract = function(_, z) {
        return this.add(-1 * _, z);
      }, A.format = function(_) {
        var z = this, R = this.$locale();
        if (!this.isValid())
          return R.invalidDate || h;
        var N = _ || "YYYY-MM-DDTHH:mm:ssZ", O = F.z(this), I = this.$H, j = this.$m, V = this.$M, W = R.weekdays, U = R.months, Z = R.meridiem, K = function(q, se, G, pe) {
          return q && (q[se] || q(z, N)) || G[se].slice(0, pe);
        }, Q = function(q) {
          return F.s(I % 12 || 12, q, "0");
        }, te = Z || function(q, se, G) {
          var pe = q < 12 ? "AM" : "PM";
          return G ? pe.toLowerCase() : pe;
        };
        return N.replace(x, function(q, se) {
          return se || function(G) {
            switch (G) {
              case "YY":
                return String(z.$y).slice(-2);
              case "YYYY":
                return F.s(z.$y, 4, "0");
              case "M":
                return V + 1;
              case "MM":
                return F.s(V + 1, 2, "0");
              case "MMM":
                return K(R.monthsShort, V, U, 3);
              case "MMMM":
                return K(U, V);
              case "D":
                return z.$D;
              case "DD":
                return F.s(z.$D, 2, "0");
              case "d":
                return String(z.$W);
              case "dd":
                return K(R.weekdaysMin, z.$W, W, 2);
              case "ddd":
                return K(R.weekdaysShort, z.$W, W, 3);
              case "dddd":
                return W[z.$W];
              case "H":
                return String(I);
              case "HH":
                return F.s(I, 2, "0");
              case "h":
                return Q(1);
              case "hh":
                return Q(2);
              case "a":
                return te(I, j, !0);
              case "A":
                return te(I, j, !1);
              case "m":
                return String(j);
              case "mm":
                return F.s(j, 2, "0");
              case "s":
                return String(z.$s);
              case "ss":
                return F.s(z.$s, 2, "0");
              case "SSS":
                return F.s(z.$ms, 3, "0");
              case "Z":
                return O;
            }
            return null;
          }(q) || O.replace(":", "");
        });
      }, A.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, A.diff = function(_, z, R) {
        var N, O = this, I = F.p(z), j = D(_), V = (j.utcOffset() - this.utcOffset()) * o, W = this - j, U = function() {
          return F.m(O, j);
        };
        switch (I) {
          case g:
            N = U() / 12;
            break;
          case d:
            N = U();
            break;
          case f:
            N = U() / 3;
            break;
          case l:
            N = (W - V) / 6048e5;
            break;
          case u:
            N = (W - V) / 864e5;
            break;
          case c:
            N = W / r;
            break;
          case s:
            N = W / o;
            break;
          case i:
            N = W / n;
            break;
          default:
            N = W;
        }
        return R ? N : F.a(N);
      }, A.daysInMonth = function() {
        return this.endOf(d).$D;
      }, A.$locale = function() {
        return k[this.$L];
      }, A.locale = function(_, z) {
        if (!_)
          return this.$L;
        var R = this.clone(), N = T(_, z, !0);
        return N && (R.$L = N), R;
      }, A.clone = function() {
        return F.w(this.$d, this);
      }, A.toDate = function() {
        return new Date(this.valueOf());
      }, A.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, A.toISOString = function() {
        return this.$d.toISOString();
      }, A.toString = function() {
        return this.$d.toUTCString();
      }, E;
    }(), P = $.prototype;
    return D.prototype = P, [["$ms", a], ["$s", i], ["$m", s], ["$H", c], ["$W", u], ["$M", d], ["$y", g], ["$D", p]].forEach(function(E) {
      P[E[1]] = function(A) {
        return this.$g(A, E[0], E[1]);
      };
    }), D.extend = function(E, A) {
      return E.$i || (E(A, $, D), E.$i = !0), D;
    }, D.locale = T, D.isDayjs = C, D.unix = function(E) {
      return D(1e3 * E);
    }, D.en = k[S], D.Ls = k, D.p = {}, D;
  });
})(Cd);
var I2 = Cd.exports;
const L2 = /* @__PURE__ */ mn(I2), F2 = ({
  conversationGroupId: e,
  shareId: t
}) => {
  const { onResolve: n, source: o } = co(), [r, a] = fe(!1), i = async () => {
    e && (a(!0), await Vp(t, e, o), n(), a(!1));
  };
  return e ? /* @__PURE__ */ v.jsx(
    rs,
    {
      disabled: r,
      className: Ft.resolveButton,
      title: "Resolve conversation",
      onClick: i,
      children: /* @__PURE__ */ v.jsx(Op, {})
    }
  ) : null;
}, j2 = F2, P2 = ({
  user: e,
  timestamp: t,
  showResolveButton: n,
  conversationGroupId: o,
  shareId: r
}) => /* @__PURE__ */ v.jsxs(zu, { className: "d-flex align-items-center justify-content-between mb-0", children: [
  /* @__PURE__ */ v.jsxs("div", { className: "d-flex align-items-center gap-1", children: [
    /* @__PURE__ */ v.jsx(rd, { user: e }),
    /* @__PURE__ */ v.jsxs("h4", { children: [
      e == null ? void 0 : e.first_name,
      " ",
      e == null ? void 0 : e.last_name
    ] }),
    /* @__PURE__ */ v.jsx("span", { children: L2(t).format("HH:mm, DD MMM YY") })
  ] }),
  n ? /* @__PURE__ */ v.jsx(
    j2,
    {
      conversationGroupId: o,
      shareId: r
    }
  ) : null
] }), Ed = P2, H2 = ({ conversation: e, shareId: t }) => {
  const { users: n } = co(), o = Ee(() => {
    if (e != null && e.user_id)
      return n[e.user_id];
  }, [e.user_id, n]);
  return /* @__PURE__ */ v.jsxs(Eo, { children: [
    /* @__PURE__ */ v.jsx(
      Ed,
      {
        user: o,
        timestamp: e.timestamp,
        shareId: t
      }
    ),
    /* @__PURE__ */ v.jsx(_o, { children: /* @__PURE__ */ v.jsx("p", { children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2") }) })
  ] });
}, B2 = H2, $2 = ({ conversationGroupId: e, shareId: t }) => {
  const { currentUser: n, users: o, onReplyAdd: r, source: a } = co(), i = Object.values(o), [s, c] = fe(""), [u, l] = fe(!1), d = async (f) => {
    if (f == null || f.stopPropagation(), f == null || f.preventDefault(), !(!t || !e)) {
      l(!0), console.log("saving reply", t, e, {
        message: s
      });
      try {
        await Bp(
          t,
          e,
          {
            message: s
          },
          a
        ), r();
      } catch (g) {
        console.error("error while saving reply", g);
      }
      l(!1), c("");
    }
  };
  return /* @__PURE__ */ v.jsx("div", { className: Ft.replyForm, children: /* @__PURE__ */ v.jsx("form", { onSubmit: d, className: "", children: /* @__PURE__ */ v.jsx(
    wd,
    {
      comment: s,
      setComment: c,
      loading: u,
      users: Object.values(i),
      currentUser: n || null,
      onEnterKeypress: d
    }
  ) }) });
}, W2 = $2, V2 = ({
  conversationGroup: e,
  shareId: t,
  onSelect: n
}) => {
  var f;
  const { users: o } = co(), r = Ee(() => {
    if (e.owner)
      return o[e.owner];
  }, [e.owner, o]), { isSelected: a } = co(), [i, s] = fe(!1), c = me(
    (g) => {
      !a || !g || (console.log(
        "ConversationGroupComponent scrolling",
        e.conversation_group_id
      ), setTimeout(() => {
        g.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 1e3));
    },
    [e.conversation_group_id, a]
  );
  if (!((f = e == null ? void 0 : e.conversations) != null && f.length) || (e == null ? void 0 : e.status) !== "Pending")
    return null;
  const [u, ...l] = e.conversations, d = l.length ? l.length > 1 ? `${l.length} replies` : `${l.length} reply` : "Reply";
  return /* @__PURE__ */ v.jsx("div", { ref: c, className: Ft.conversationGroup, children: /* @__PURE__ */ v.jsxs(Eo, { className: `${a ? "active" : ""}`, onClick: n, children: [
    /* @__PURE__ */ v.jsx(
      Ed,
      {
        user: r,
        timestamp: u.timestamp,
        showResolveButton: !0,
        conversationGroupId: e.conversation_group_id,
        shareId: t
      }
    ),
    /* @__PURE__ */ v.jsxs(_o, { children: [
      /* @__PURE__ */ v.jsx(Sd, { meta: e.meta }),
      /* @__PURE__ */ v.jsx("p", { children: u.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2") }),
      /* @__PURE__ */ v.jsx(qe, { onClick: () => s((g) => !g), color: "link", children: d }),
      l.length ? /* @__PURE__ */ v.jsx(v.Fragment, { children: i ? /* @__PURE__ */ v.jsx(v.Fragment, { children: l.map((g) => /* @__PURE__ */ v.jsx(
        B2,
        {
          conversation: g,
          shareId: t
        },
        g.conversation_id
      )) }) : null }) : null,
      i ? /* @__PURE__ */ v.jsx(
        W2,
        {
          conversationGroupId: e.conversation_group_id,
          shareId: t
        }
      ) : null
    ] })
  ] }) });
}, q2 = V2, _d = pt({
  users: {},
  conversationGroup: void 0,
  currentUser: void 0,
  isSelected: !1,
  shareId: void 0,
  onSelect: () => null,
  onResolve: () => null,
  onReplyAdd: () => null,
  source: is.DBT_DOCS
}), U2 = ({
  currentUser: e,
  conversationGroup: t,
  shareId: n,
  onSelect: o,
  isSelected: r,
  users: a,
  onResolve: i,
  onReplyAdd: s,
  source: c
}) => {
  const u = Ee(
    () => ({
      currentUser: e,
      conversationGroup: t,
      shareId: n,
      onSelect: o,
      isSelected: r,
      users: a,
      onResolve: i,
      onReplyAdd: s,
      source: c
    }),
    [
      e,
      t,
      n,
      o,
      r,
      a,
      i,
      s,
      c
    ]
  );
  return !t || !n ? null : /* @__PURE__ */ v.jsx(_d.Provider, { value: u, children: /* @__PURE__ */ v.jsx(
    q2,
    {
      conversationGroup: t,
      shareId: n,
      onSelect: o
    }
  ) });
}, Y2 = U2, co = () => Ye(_d), Z2 = () => {
  const e = we(
    (d) => d.source
  ), t = we(
    (d) => d.conversations
  ), n = we(
    (d) => d.selectedConversationId
  ), o = we(
    (d) => d.shareId
  ), r = we(
    (d) => d.users
  ), a = we(
    (d) => d.currentUserId
  ), i = rt();
  if (!a || !o)
    return null;
  const s = r[a], c = (d) => {
    i(ip({ shareId: o, conversationGroupId: d }));
  }, u = (d) => {
    i(hs(d));
  }, l = (d) => {
    console.log("onReplyAdd", d), i(Ju());
  };
  return !t || !Object.keys(t).length ? /* @__PURE__ */ v.jsx("div", { children: "No conversations yet!" }) : /* @__PURE__ */ v.jsx("div", { children: Object.values(t).map((d) => /* @__PURE__ */ v.jsx(
    Y2,
    {
      conversationGroup: d,
      shareId: o,
      isSelected: n === d.conversation_group_id,
      currentUser: s,
      onResolve: () => c(d.conversation_group_id),
      onSelect: () => u(d.conversation_group_id),
      users: r,
      onReplyAdd: () => l(d.conversation_group_id),
      source: e
    },
    d.conversation_group_id
  )) });
}, K2 = Z2, G2 = () => {
  const e = we(
    (i) => i.isRightPanelOpen
  ), t = we(
    (i) => i.selectedConversationId
  ), n = we(
    (i) => i.newConversation
  ), o = rt(), r = () => {
    o(ms(!1)), o(hs(void 0)), o(bs());
  };
  return !!n || e || t ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsx(
      W1,
      {
        onClick: r,
        className: Ft.conversationRightPanelCloseButton
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Ft.conversationRightPanel, children: [
      /* @__PURE__ */ v.jsx("h3", { children: "Comments" }),
      n ? /* @__PURE__ */ v.jsx(z2, {}) : /* @__PURE__ */ v.jsx(K2, {})
    ] })
  ] }) : null;
}, X2 = G2, Q2 = 10, J2 = () => {
  const e = ae(), t = we(
    (i) => i.shareId
  ), n = we(
    (i) => i.conversationsLoadingState
  ), o = rt(), r = we(
    (i) => Object.keys(i.conversations || {})
  ), a = me(
    (i) => {
      clearTimeout(e.current), $p(i).then((s) => {
        console.log("useConversations", s), o(ap(s == null ? void 0 : s.dbt_docs_share_conversations)), e.current = setTimeout(() => {
          a(i);
        }, Q2 * 1e3);
      }).catch(
        (s) => console.error("error while fetching conversations list", s)
      ).finally(() => {
        o(ic(et.INITIALIZED));
      });
    },
    [o]
  );
  return ie(() => {
    n !== et.UNINITIALIZED || !t || (o(ic(et.LOADING)), a(t));
  }, [o, n, r, t, a]), { isLoading: n === et.LOADING };
}, em = () => {
  const e = rt(), t = we(
    (r) => Object.keys(r.users || {})
  ), [n, o] = fe(et.UNINITIALIZED);
  return ie(() => {
    n !== et.UNINITIALIZED || Object.keys(t).length || (o(et.LOADING), Wp().then((r) => {
      console.log("useConversationUsers", r), e(rp(r));
    }).catch((r) => console.error("error while fetching users list", r)).finally(() => {
      o(et.INITIALIZED);
    }));
  }, [e, n, t]), { isLoading: n === et.LOADING };
}, tm = () => (em(), J2(), /* @__PURE__ */ v.jsxs("div", { children: [
  /* @__PURE__ */ v.jsx(X2, {}),
  /* @__PURE__ */ v.jsx(Gp, {})
] })), nm = tm, om = ({ target: e, ...t }) => hn(
  /* @__PURE__ */ v.jsx(
    rs,
    {
      className: Ft.hotspotButton,
      title: "Click to start conversation",
      ...t,
      children: /* @__PURE__ */ v.jsx(od, {})
    }
  ),
  e
), kd = om, rm = () => {
  var c;
  const e = rt(), t = we(
    (u) => u.codeblockLoaded
  ), n = we(
    (u) => u.manifest
  ), [o, r] = fe(0), a = (c = ls()) == null ? void 0 : c.parentElement, i = () => {
    var f;
    if (!a || !n.nodes)
      return;
    const u = cs();
    if (!u || u.length < 3) {
      console.error("Unable to find model parts", u);
      return;
    }
    const d = {
      highlight: ((f = n.nodes[u[2]]) == null ? void 0 : f.raw_code).split(`
`)[o],
      range: {
        end: { line: o, character: 0 },
        start: { line: o, character: 0 }
      }
    };
    e(ys({ meta: d }));
  }, s = me(
    (u) => {
      if (!a)
        return;
      const l = u.y, d = a.querySelectorAll(
        ".line-numbers-rows > span"
      ), f = Array.from(d).findIndex((g) => {
        const { height: p, y: h } = g.getBoundingClientRect();
        return l >= h && l <= h + p;
      });
      r(f);
    },
    [a]
  );
  return ie(() => {
    if (!(!t || !a))
      return a.addEventListener("mousemove", s), () => {
        a.removeEventListener("mousemove", s);
      };
  }, [t, a, s]), !t || !a ? null : /* @__PURE__ */ v.jsx(
    kd,
    {
      target: a,
      onClick: i,
      style: { top: o * 21.2 }
    }
  );
}, am = rm, im = () => {
  const e = rt(), t = we(
    (r) => r.codeblockLoaded
  ), n = us(), o = () => {
    const r = {
      field: "description",
      highlight: n == null ? void 0 : n.innerText
    };
    e(ys({ meta: r }));
  };
  return !t || !n ? null : /* @__PURE__ */ v.jsx(kd, { target: n, onClick: o });
}, sm = im, lm = () => /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
  /* @__PURE__ */ v.jsx(sm, {}),
  /* @__PURE__ */ v.jsx(am, {})
] }), cm = lm, um = P1(() => import("./DbtDocsRenderer.js")), dm = () => {
  const { loading: e, shareDetails: t } = qp(), n = rt(), { getHighlightedSelectionData: o, pos: r, onSelectionEnd: a } = Up(), i = (s) => {
    s.stopPropagation();
    const c = o();
    c && n(ys(c));
  };
  return e ? /* @__PURE__ */ v.jsx("div", { children: "Loading..." }) : !(t != null && t.catalog_presigned_url) || !(t != null && t.manifest_presigned_url) ? /* @__PURE__ */ v.jsx("div", { children: "Unable to load required artifacts. Please try again." }) : /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs("div", { className: "d-flex justify-content-end mb-2", children: [
      /* @__PURE__ */ v.jsx(cm, {}),
      /* @__PURE__ */ v.jsx(jp, {})
    ] }),
    /* @__PURE__ */ v.jsx(nm, {}),
    /* @__PURE__ */ v.jsx(
      um,
      {
        shareDetails: t,
        onSelectionEnd: a
      }
    ),
    r ? /* @__PURE__ */ v.jsx(Lp, { pos: r, onAddComment: i }) : null
  ] });
}, fm = dm, gm = ({ shareId: e, userId: t, conversationGroupId: n, source: o }) => /* @__PURE__ */ v.jsx("div", { className: "altimate-component", children: /* @__PURE__ */ v.jsx(
  cp,
  {
    shareId: e,
    userId: t,
    conversationGroupId: n,
    source: o,
    children: /* @__PURE__ */ v.jsx(fm, {})
  }
) }), uv = gm, pm = {
  selectedTable: "",
  moreTables: {},
  sidebarScreen: "",
  selectedColumn: { name: "", table: "" },
  collectColumns: {},
  confidence: { confidence: "high" },
  leftExpansion: 0,
  rightExpansion: 0,
  minRange: [0, 0],
  nodeCount: 0,
  selectCheck: !0,
  nonSelectCheck: !0,
  defaultExpansion: 5,
  aiEnabled: !1,
  viewsCodeModal: null
}, yr = Qu({
  name: "lineageState",
  initialState: pm,
  reducers: {
    setSelectedTable: (e, t) => {
      e.selectedTable = t.payload;
    },
    setViewsCodeModal: (e, t) => {
      e.viewsCodeModal = t.payload;
    },
    setAiEnabled: (e, t) => {
      e.aiEnabled = t.payload;
    },
    setMoreTables: (e, t) => {
      e.moreTables = t.payload;
    },
    mergeSeeMoreTables: (e, t) => {
      e.moreTables = {
        ...e.moreTables,
        lineage: [...e.moreTables.lineage || [], ...t.payload]
      };
    },
    setSidebarScreen: (e, t) => {
      e.sidebarScreen = t.payload;
    },
    setSelectedColumn: (e, t) => {
      e.selectedColumn = t.payload;
    },
    setCollectColumns: (e, t) => {
      e.collectColumns = t.payload;
    },
    mergeCollectColumns: (e, t) => {
      const n = t.payload, o = {
        ...e.collectColumns
      };
      for (const r in n) {
        const a = n[r];
        if (!(r in o)) {
          o[r] = a;
          continue;
        }
        const i = a.map((s) => {
          const c = o[r].findIndex(
            (u) => u.column === s.column
          );
          return c === -1 ? s : (s.viewsType && (o[r][c].viewsType = s.viewsType), null);
        }).filter((s) => s !== null);
        o[r].push(...i);
      }
      e.collectColumns = o;
    },
    setConfidence: (e, t) => {
      e.confidence = t.payload;
    },
    updateConfidenceWithOperatorList: (e, t) => {
      const n = { ...e.confidence, confidence: "low" };
      n.operator_list = n.operator_list || [], n.operator_list.push(...t.payload.operatorList || []), e.confidence = n;
    },
    setLeftExpansion: (e, t) => {
      e.leftExpansion = t.payload;
    },
    setRightExpansion: (e, t) => {
      e.rightExpansion = t.payload;
    },
    setMinRange: (e, t) => {
      e.minRange = t.payload;
    },
    setNodeCount: (e, t) => {
      e.nodeCount = t.payload;
    },
    setSelectCheck: (e, t) => {
      e.selectCheck = t.payload;
    },
    setNonSelectCheck: (e, t) => {
      e.nonSelectCheck = t.payload;
    },
    setDefaultExpansion: (e, t) => {
      e.defaultExpansion = t.payload;
    }
  }
}), {
  setSelectedTable: vr,
  setMoreTables: Es,
  mergeSeeMoreTables: Ad,
  setSidebarScreen: _t,
  setSelectedColumn: ln,
  setCollectColumns: xr,
  mergeCollectColumns: Md,
  setConfidence: hm,
  updateConfidenceWithOperatorList: Td,
  setLeftExpansion: ri,
  setRightExpansion: ai,
  setMinRange: uo,
  setNodeCount: Ln,
  setSelectCheck: Od,
  setNonSelectCheck: Nd,
  setDefaultExpansion: Dd,
  setAiEnabled: mm,
  setViewsCodeModal: zi
} = yr.actions;
function $e(e) {
  if (typeof e == "string" || typeof e == "number")
    return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, o; n < e.length; n++)
      (o = $e(e[n])) !== "" && (t += (t && " ") + o);
  else
    for (let n in e)
      e[n] && (t += (t && " ") + n);
  return t;
}
var Ii = { exports: {} }, ii = {}, Wo = { exports: {} }, si = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tc;
function bm() {
  if (Tc)
    return si;
  Tc = 1;
  var e = H;
  function t(d, f) {
    return d === f && (d !== 0 || 1 / d === 1 / f) || d !== d && f !== f;
  }
  var n = typeof Object.is == "function" ? Object.is : t, o = e.useState, r = e.useEffect, a = e.useLayoutEffect, i = e.useDebugValue;
  function s(d, f) {
    var g = f(), p = o({ inst: { value: g, getSnapshot: f } }), h = p[0].inst, m = p[1];
    return a(function() {
      h.value = g, h.getSnapshot = f, c(h) && m({ inst: h });
    }, [d, g, f]), r(function() {
      return c(h) && m({ inst: h }), d(function() {
        c(h) && m({ inst: h });
      });
    }, [d]), i(g), g;
  }
  function c(d) {
    var f = d.getSnapshot;
    d = d.value;
    try {
      var g = f();
      return !n(d, g);
    } catch {
      return !0;
    }
  }
  function u(d, f) {
    return f();
  }
  var l = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : s;
  return si.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : l, si;
}
var li = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oc;
function ym() {
  return Oc || (Oc = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = H, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function n(y) {
      {
        for (var w = arguments.length, S = new Array(w > 1 ? w - 1 : 0), k = 1; k < w; k++)
          S[k - 1] = arguments[k];
        o("error", y, S);
      }
    }
    function o(y, w, S) {
      {
        var k = t.ReactDebugCurrentFrame, M = k.getStackAddendum();
        M !== "" && (w += "%s", S = S.concat([M]));
        var C = S.map(function(T) {
          return String(T);
        });
        C.unshift("Warning: " + w), Function.prototype.apply.call(console[y], console, C);
      }
    }
    function r(y, w) {
      return y === w && (y !== 0 || 1 / y === 1 / w) || y !== y && w !== w;
    }
    var a = typeof Object.is == "function" ? Object.is : r, i = e.useState, s = e.useEffect, c = e.useLayoutEffect, u = e.useDebugValue, l = !1, d = !1;
    function f(y, w, S) {
      l || e.startTransition !== void 0 && (l = !0, n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var k = w();
      if (!d) {
        var M = w();
        a(k, M) || (n("The result of getSnapshot should be cached to avoid an infinite loop"), d = !0);
      }
      var C = i({
        inst: {
          value: k,
          getSnapshot: w
        }
      }), T = C[0].inst, D = C[1];
      return c(function() {
        T.value = k, T.getSnapshot = w, g(T) && D({
          inst: T
        });
      }, [y, k, w]), s(function() {
        g(T) && D({
          inst: T
        });
        var F = function() {
          g(T) && D({
            inst: T
          });
        };
        return y(F);
      }, [y]), u(k), k;
    }
    function g(y) {
      var w = y.getSnapshot, S = y.value;
      try {
        var k = w();
        return !a(S, k);
      } catch {
        return !0;
      }
    }
    function p(y, w, S) {
      return w();
    }
    var h = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", m = !h, x = m ? p : f, b = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : x;
    li.useSyncExternalStore = b, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), li;
}
var Nc;
function Rd() {
  return Nc || (Nc = 1, process.env.NODE_ENV === "production" ? Wo.exports = bm() : Wo.exports = ym()), Wo.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dc;
function vm() {
  if (Dc)
    return ii;
  Dc = 1;
  var e = H, t = Rd();
  function n(u, l) {
    return u === l && (u !== 0 || 1 / u === 1 / l) || u !== u && l !== l;
  }
  var o = typeof Object.is == "function" ? Object.is : n, r = t.useSyncExternalStore, a = e.useRef, i = e.useEffect, s = e.useMemo, c = e.useDebugValue;
  return ii.useSyncExternalStoreWithSelector = function(u, l, d, f, g) {
    var p = a(null);
    if (p.current === null) {
      var h = { hasValue: !1, value: null };
      p.current = h;
    } else
      h = p.current;
    p = s(function() {
      function x(k) {
        if (!b) {
          if (b = !0, y = k, k = f(k), g !== void 0 && h.hasValue) {
            var M = h.value;
            if (g(M, k))
              return w = M;
          }
          return w = k;
        }
        if (M = w, o(y, k))
          return M;
        var C = f(k);
        return g !== void 0 && g(M, C) ? M : (y = k, w = C);
      }
      var b = !1, y, w, S = d === void 0 ? null : d;
      return [function() {
        return x(l());
      }, S === null ? void 0 : function() {
        return x(S());
      }];
    }, [l, d, f, g]);
    var m = r(u, p[0], p[1]);
    return i(function() {
      h.hasValue = !0, h.value = m;
    }, [m]), c(m), m;
  }, ii;
}
var ci = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rc;
function xm() {
  return Rc || (Rc = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = H, t = Rd();
    function n(l, d) {
      return l === d && (l !== 0 || 1 / l === 1 / d) || l !== l && d !== d;
    }
    var o = typeof Object.is == "function" ? Object.is : n, r = t.useSyncExternalStore, a = e.useRef, i = e.useEffect, s = e.useMemo, c = e.useDebugValue;
    function u(l, d, f, g, p) {
      var h = a(null), m;
      h.current === null ? (m = {
        hasValue: !1,
        value: null
      }, h.current = m) : m = h.current;
      var x = s(function() {
        var S = !1, k, M, C = function($) {
          if (!S) {
            S = !0, k = $;
            var P = g($);
            if (p !== void 0 && m.hasValue) {
              var E = m.value;
              if (p(E, P))
                return M = E, E;
            }
            return M = P, P;
          }
          var A = k, _ = M;
          if (o(A, $))
            return _;
          var z = g($);
          return p !== void 0 && p(_, z) ? _ : (k = $, M = z, z);
        }, T = f === void 0 ? null : f, D = function() {
          return C(d());
        }, F = T === null ? void 0 : function() {
          return C(T());
        };
        return [D, F];
      }, [d, f, g, p]), b = x[0], y = x[1], w = r(l, b, y);
      return i(function() {
        m.hasValue = !0, m.value = w;
      }, [w]), c(w), w;
    }
    ci.useSyncExternalStoreWithSelector = u, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ci;
}
process.env.NODE_ENV === "production" ? Ii.exports = vm() : Ii.exports = xm();
var wm = Ii.exports;
const Sm = /* @__PURE__ */ mn(wm);
var Cm = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const zc = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), o = (l, d) => {
    const f = typeof l == "function" ? l(t) : l;
    if (!Object.is(f, t)) {
      const g = t;
      t = d ?? (typeof f != "object" || f === null) ? f : Object.assign({}, t, f), n.forEach((p) => p(t, g));
    }
  }, r = () => t, c = { setState: o, getState: r, getInitialState: () => u, subscribe: (l) => (n.add(l), () => n.delete(l)), destroy: () => {
    (Cm ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, u = t = e(o, r, c);
  return c;
}, Em = (e) => e ? zc(e) : zc, { useDebugValue: _m } = H, { useSyncExternalStoreWithSelector: km } = Sm, Am = (e) => e;
function zd(e, t = Am, n) {
  const o = km(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return _m(o), o;
}
const Ic = (e, t) => {
  const n = Em(e), o = (r, a = t) => zd(n, r, a);
  return Object.assign(o, n), o;
}, Mm = (e, t) => e ? Ic(e, t) : Ic;
function je(e, t) {
  if (Object.is(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size)
      return !1;
    for (const [o, r] of e)
      if (!Object.is(r, t.get(o)))
        return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size)
      return !1;
    for (const o of e)
      if (!t.has(o))
        return !1;
    return !0;
  }
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length)
    return !1;
  for (const o of n)
    if (!Object.prototype.hasOwnProperty.call(t, o) || !Object.is(e[o], t[o]))
      return !1;
  return !0;
}
var Tm = { value: () => {
} };
function Hr() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o))
      throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new ir(n);
}
function ir(e) {
  this._ = e;
}
function Om(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", r = n.indexOf(".");
    if (r >= 0 && (o = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
ir.prototype = Hr.prototype = {
  constructor: ir,
  on: function(e, t) {
    var n = this._, o = Om(e + "", n), r, a = -1, i = o.length;
    if (arguments.length < 2) {
      for (; ++a < i; )
        if ((r = (e = o[a]).type) && (r = Nm(n[r], e.name)))
          return r;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++a < i; )
      if (r = (e = o[a]).type)
        n[r] = Lc(n[r], e.name, t);
      else if (t == null)
        for (r in n)
          n[r] = Lc(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new ir(e);
  },
  call: function(e, t) {
    if ((r = arguments.length - 2) > 0)
      for (var n = new Array(r), o = 0, r, a; o < r; ++o)
        n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (a = this._[e], o = 0, r = a.length; o < r; ++o)
      a[o].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (var o = this._[e], r = 0, a = o.length; r < a; ++r)
      o[r].value.apply(t, n);
  }
};
function Nm(e, t) {
  for (var n = 0, o = e.length, r; n < o; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Lc(e, t, n) {
  for (var o = 0, r = e.length; o < r; ++o)
    if (e[o].name === t) {
      e[o] = Tm, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Li = "http://www.w3.org/1999/xhtml";
const Fc = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Li,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Br(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Fc.hasOwnProperty(t) ? { space: Fc[t], local: e } : e;
}
function Dm(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Li && t.documentElement.namespaceURI === Li ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Rm(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Id(e) {
  var t = Br(e);
  return (t.local ? Rm : Dm)(t);
}
function zm() {
}
function _s(e) {
  return e == null ? zm : function() {
    return this.querySelector(e);
  };
}
function Im(e) {
  typeof e != "function" && (e = _s(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var a = t[r], i = a.length, s = o[r] = new Array(i), c, u, l = 0; l < i; ++l)
      (c = a[l]) && (u = e.call(c, c.__data__, l, a)) && ("__data__" in c && (u.__data__ = c.__data__), s[l] = u);
  return new Qe(o, this._parents);
}
function Lm(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Fm() {
  return [];
}
function Ld(e) {
  return e == null ? Fm : function() {
    return this.querySelectorAll(e);
  };
}
function jm(e) {
  return function() {
    return Lm(e.apply(this, arguments));
  };
}
function Pm(e) {
  typeof e == "function" ? e = jm(e) : e = Ld(e);
  for (var t = this._groups, n = t.length, o = [], r = [], a = 0; a < n; ++a)
    for (var i = t[a], s = i.length, c, u = 0; u < s; ++u)
      (c = i[u]) && (o.push(e.call(c, c.__data__, u, i)), r.push(c));
  return new Qe(o, r);
}
function Fd(e) {
  return function() {
    return this.matches(e);
  };
}
function jd(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Hm = Array.prototype.find;
function Bm(e) {
  return function() {
    return Hm.call(this.children, e);
  };
}
function $m() {
  return this.firstElementChild;
}
function Wm(e) {
  return this.select(e == null ? $m : Bm(typeof e == "function" ? e : jd(e)));
}
var Vm = Array.prototype.filter;
function qm() {
  return Array.from(this.children);
}
function Um(e) {
  return function() {
    return Vm.call(this.children, e);
  };
}
function Ym(e) {
  return this.selectAll(e == null ? qm : Um(typeof e == "function" ? e : jd(e)));
}
function Zm(e) {
  typeof e != "function" && (e = Fd(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var a = t[r], i = a.length, s = o[r] = [], c, u = 0; u < i; ++u)
      (c = a[u]) && e.call(c, c.__data__, u, a) && s.push(c);
  return new Qe(o, this._parents);
}
function Pd(e) {
  return new Array(e.length);
}
function Km() {
  return new Qe(this._enter || this._groups.map(Pd), this._parents);
}
function wr(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
wr.prototype = {
  constructor: wr,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function Gm(e) {
  return function() {
    return e;
  };
}
function Xm(e, t, n, o, r, a) {
  for (var i = 0, s, c = t.length, u = a.length; i < u; ++i)
    (s = t[i]) ? (s.__data__ = a[i], o[i] = s) : n[i] = new wr(e, a[i]);
  for (; i < c; ++i)
    (s = t[i]) && (r[i] = s);
}
function Qm(e, t, n, o, r, a, i) {
  var s, c, u = /* @__PURE__ */ new Map(), l = t.length, d = a.length, f = new Array(l), g;
  for (s = 0; s < l; ++s)
    (c = t[s]) && (f[s] = g = i.call(c, c.__data__, s, t) + "", u.has(g) ? r[s] = c : u.set(g, c));
  for (s = 0; s < d; ++s)
    g = i.call(e, a[s], s, a) + "", (c = u.get(g)) ? (o[s] = c, c.__data__ = a[s], u.delete(g)) : n[s] = new wr(e, a[s]);
  for (s = 0; s < l; ++s)
    (c = t[s]) && u.get(f[s]) === c && (r[s] = c);
}
function Jm(e) {
  return e.__data__;
}
function e3(e, t) {
  if (!arguments.length)
    return Array.from(this, Jm);
  var n = t ? Qm : Xm, o = this._parents, r = this._groups;
  typeof e != "function" && (e = Gm(e));
  for (var a = r.length, i = new Array(a), s = new Array(a), c = new Array(a), u = 0; u < a; ++u) {
    var l = o[u], d = r[u], f = d.length, g = t3(e.call(l, l && l.__data__, u, o)), p = g.length, h = s[u] = new Array(p), m = i[u] = new Array(p), x = c[u] = new Array(f);
    n(l, d, h, m, x, g, t);
    for (var b = 0, y = 0, w, S; b < p; ++b)
      if (w = h[b]) {
        for (b >= y && (y = b + 1); !(S = m[y]) && ++y < p; )
          ;
        w._next = S || null;
      }
  }
  return i = new Qe(i, o), i._enter = s, i._exit = c, i;
}
function t3(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function n3() {
  return new Qe(this._exit || this._groups.map(Pd), this._parents);
}
function o3(e, t, n) {
  var o = this.enter(), r = this, a = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? a.remove() : n(a), o && r ? o.merge(r).order() : r;
}
function r3(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, r = n.length, a = o.length, i = Math.min(r, a), s = new Array(r), c = 0; c < i; ++c)
    for (var u = n[c], l = o[c], d = u.length, f = s[c] = new Array(d), g, p = 0; p < d; ++p)
      (g = u[p] || l[p]) && (f[p] = g);
  for (; c < r; ++c)
    s[c] = n[c];
  return new Qe(s, this._parents);
}
function a3() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], r = o.length - 1, a = o[r], i; --r >= 0; )
      (i = o[r]) && (a && i.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(i, a), a = i);
  return this;
}
function i3(e) {
  e || (e = s3);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, o = n.length, r = new Array(o), a = 0; a < o; ++a) {
    for (var i = n[a], s = i.length, c = r[a] = new Array(s), u, l = 0; l < s; ++l)
      (u = i[l]) && (c[l] = u);
    c.sort(t);
  }
  return new Qe(r, this._parents).order();
}
function s3(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function l3() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function c3() {
  return Array.from(this);
}
function u3() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, a = o.length; r < a; ++r) {
      var i = o[r];
      if (i)
        return i;
    }
  return null;
}
function d3() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function f3() {
  return !this.node();
}
function g3(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var r = t[n], a = 0, i = r.length, s; a < i; ++a)
      (s = r[a]) && e.call(s, s.__data__, a, r);
  return this;
}
function p3(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function h3(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function m3(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function b3(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function y3(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function v3(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function x3(e, t) {
  var n = Br(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? h3 : p3 : typeof t == "function" ? n.local ? v3 : y3 : n.local ? b3 : m3)(n, t));
}
function Hd(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function w3(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function S3(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function C3(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function E3(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? w3 : typeof t == "function" ? C3 : S3)(e, t, n ?? "")) : Fn(this.node(), e);
}
function Fn(e, t) {
  return e.style.getPropertyValue(t) || Hd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function _3(e) {
  return function() {
    delete this[e];
  };
}
function k3(e, t) {
  return function() {
    this[e] = t;
  };
}
function A3(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function M3(e, t) {
  return arguments.length > 1 ? this.each((t == null ? _3 : typeof t == "function" ? A3 : k3)(e, t)) : this.node()[e];
}
function Bd(e) {
  return e.trim().split(/^|\s+/);
}
function ks(e) {
  return e.classList || new $d(e);
}
function $d(e) {
  this._node = e, this._names = Bd(e.getAttribute("class") || "");
}
$d.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Wd(e, t) {
  for (var n = ks(e), o = -1, r = t.length; ++o < r; )
    n.add(t[o]);
}
function Vd(e, t) {
  for (var n = ks(e), o = -1, r = t.length; ++o < r; )
    n.remove(t[o]);
}
function T3(e) {
  return function() {
    Wd(this, e);
  };
}
function O3(e) {
  return function() {
    Vd(this, e);
  };
}
function N3(e, t) {
  return function() {
    (t.apply(this, arguments) ? Wd : Vd)(this, e);
  };
}
function D3(e, t) {
  var n = Bd(e + "");
  if (arguments.length < 2) {
    for (var o = ks(this.node()), r = -1, a = n.length; ++r < a; )
      if (!o.contains(n[r]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? N3 : t ? T3 : O3)(n, t));
}
function R3() {
  this.textContent = "";
}
function z3(e) {
  return function() {
    this.textContent = e;
  };
}
function I3(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function L3(e) {
  return arguments.length ? this.each(e == null ? R3 : (typeof e == "function" ? I3 : z3)(e)) : this.node().textContent;
}
function F3() {
  this.innerHTML = "";
}
function j3(e) {
  return function() {
    this.innerHTML = e;
  };
}
function P3(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function H3(e) {
  return arguments.length ? this.each(e == null ? F3 : (typeof e == "function" ? P3 : j3)(e)) : this.node().innerHTML;
}
function B3() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function $3() {
  return this.each(B3);
}
function W3() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function V3() {
  return this.each(W3);
}
function q3(e) {
  var t = typeof e == "function" ? e : Id(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function U3() {
  return null;
}
function Y3(e, t) {
  var n = typeof e == "function" ? e : Id(e), o = t == null ? U3 : typeof t == "function" ? t : _s(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function Z3() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function K3() {
  return this.each(Z3);
}
function G3() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function X3() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Q3(e) {
  return this.select(e ? X3 : G3);
}
function J3(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function eb(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function tb(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function nb(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, r = t.length, a; n < r; ++n)
        a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++o] = a;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function ob(e, t, n) {
  return function() {
    var o = this.__on, r, a = eb(t);
    if (o) {
      for (var i = 0, s = o.length; i < s; ++i)
        if ((r = o[i]).type === e.type && r.name === e.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = a, r.options = n), r.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, n), r = { type: e.type, name: e.name, value: t, listener: a, options: n }, o ? o.push(r) : this.__on = [r];
  };
}
function rb(e, t, n) {
  var o = tb(e + ""), r, a = o.length, i;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var c = 0, u = s.length, l; c < u; ++c)
        for (r = 0, l = s[c]; r < a; ++r)
          if ((i = o[r]).type === l.type && i.name === l.name)
            return l.value;
    }
    return;
  }
  for (s = t ? ob : nb, r = 0; r < a; ++r)
    this.each(s(o[r], t, n));
  return this;
}
function qd(e, t, n) {
  var o = Hd(e), r = o.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = o.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function ab(e, t) {
  return function() {
    return qd(this, e, t);
  };
}
function ib(e, t) {
  return function() {
    return qd(this, e, t.apply(this, arguments));
  };
}
function sb(e, t) {
  return this.each((typeof t == "function" ? ib : ab)(e, t));
}
function* lb() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, a = o.length, i; r < a; ++r)
      (i = o[r]) && (yield i);
}
var Ud = [null];
function Qe(e, t) {
  this._groups = e, this._parents = t;
}
function Ao() {
  return new Qe([[document.documentElement]], Ud);
}
function cb() {
  return this;
}
Qe.prototype = Ao.prototype = {
  constructor: Qe,
  select: Im,
  selectAll: Pm,
  selectChild: Wm,
  selectChildren: Ym,
  filter: Zm,
  data: e3,
  enter: Km,
  exit: n3,
  join: o3,
  merge: r3,
  selection: cb,
  order: a3,
  sort: i3,
  call: l3,
  nodes: c3,
  node: u3,
  size: d3,
  empty: f3,
  each: g3,
  attr: x3,
  style: E3,
  property: M3,
  classed: D3,
  text: L3,
  html: H3,
  raise: $3,
  lower: V3,
  append: q3,
  insert: Y3,
  remove: K3,
  clone: Q3,
  datum: J3,
  on: rb,
  dispatch: sb,
  [Symbol.iterator]: lb
};
function ut(e) {
  return typeof e == "string" ? new Qe([[document.querySelector(e)]], [document.documentElement]) : new Qe([[e]], Ud);
}
function ub(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function St(e, t) {
  if (e = ub(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var o = n.createSVGPoint();
      return o.x = e.clientX, o.y = e.clientY, o = o.matrixTransform(t.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (t.getBoundingClientRect) {
      var r = t.getBoundingClientRect();
      return [e.clientX - r.left - t.clientLeft, e.clientY - r.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const db = { passive: !1 }, fo = { capture: !0, passive: !1 };
function ui(e) {
  e.stopImmediatePropagation();
}
function Mn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Yd(e) {
  var t = e.document.documentElement, n = ut(e).on("dragstart.drag", Mn, fo);
  "onselectstart" in t ? n.on("selectstart.drag", Mn, fo) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Zd(e, t) {
  var n = e.document.documentElement, o = ut(e).on("dragstart.drag", null);
  t && (o.on("click.drag", Mn, fo), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Vo = (e) => () => e;
function Fi(e, {
  sourceEvent: t,
  subject: n,
  target: o,
  identifier: r,
  active: a,
  x: i,
  y: s,
  dx: c,
  dy: u,
  dispatch: l
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: r, enumerable: !0, configurable: !0 },
    active: { value: a, enumerable: !0, configurable: !0 },
    x: { value: i, enumerable: !0, configurable: !0 },
    y: { value: s, enumerable: !0, configurable: !0 },
    dx: { value: c, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: l }
  });
}
Fi.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function fb(e) {
  return !e.ctrlKey && !e.button;
}
function gb() {
  return this.parentNode;
}
function pb(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function hb() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function mb() {
  var e = fb, t = gb, n = pb, o = hb, r = {}, a = Hr("start", "drag", "end"), i = 0, s, c, u, l, d = 0;
  function f(w) {
    w.on("mousedown.drag", g).filter(o).on("touchstart.drag", m).on("touchmove.drag", x, db).on("touchend.drag touchcancel.drag", b).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(w, S) {
    if (!(l || !e.call(this, w, S))) {
      var k = y(this, t.call(this, w, S), w, S, "mouse");
      k && (ut(w.view).on("mousemove.drag", p, fo).on("mouseup.drag", h, fo), Yd(w.view), ui(w), u = !1, s = w.clientX, c = w.clientY, k("start", w));
    }
  }
  function p(w) {
    if (Mn(w), !u) {
      var S = w.clientX - s, k = w.clientY - c;
      u = S * S + k * k > d;
    }
    r.mouse("drag", w);
  }
  function h(w) {
    ut(w.view).on("mousemove.drag mouseup.drag", null), Zd(w.view, u), Mn(w), r.mouse("end", w);
  }
  function m(w, S) {
    if (e.call(this, w, S)) {
      var k = w.changedTouches, M = t.call(this, w, S), C = k.length, T, D;
      for (T = 0; T < C; ++T)
        (D = y(this, M, w, S, k[T].identifier, k[T])) && (ui(w), D("start", w, k[T]));
    }
  }
  function x(w) {
    var S = w.changedTouches, k = S.length, M, C;
    for (M = 0; M < k; ++M)
      (C = r[S[M].identifier]) && (Mn(w), C("drag", w, S[M]));
  }
  function b(w) {
    var S = w.changedTouches, k = S.length, M, C;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), M = 0; M < k; ++M)
      (C = r[S[M].identifier]) && (ui(w), C("end", w, S[M]));
  }
  function y(w, S, k, M, C, T) {
    var D = a.copy(), F = St(T || k, S), $, P, E;
    if ((E = n.call(w, new Fi("beforestart", {
      sourceEvent: k,
      target: f,
      identifier: C,
      active: i,
      x: F[0],
      y: F[1],
      dx: 0,
      dy: 0,
      dispatch: D
    }), M)) != null)
      return $ = E.x - F[0] || 0, P = E.y - F[1] || 0, function A(_, z, R) {
        var N = F, O;
        switch (_) {
          case "start":
            r[C] = A, O = i++;
            break;
          case "end":
            delete r[C], --i;
          case "drag":
            F = St(R || z, S), O = i;
            break;
        }
        D.call(
          _,
          w,
          new Fi(_, {
            sourceEvent: z,
            subject: E,
            target: f,
            identifier: C,
            active: O,
            x: F[0] + $,
            y: F[1] + P,
            dx: F[0] - N[0],
            dy: F[1] - N[1],
            dispatch: D
          }),
          M
        );
      };
  }
  return f.filter = function(w) {
    return arguments.length ? (e = typeof w == "function" ? w : Vo(!!w), f) : e;
  }, f.container = function(w) {
    return arguments.length ? (t = typeof w == "function" ? w : Vo(w), f) : t;
  }, f.subject = function(w) {
    return arguments.length ? (n = typeof w == "function" ? w : Vo(w), f) : n;
  }, f.touchable = function(w) {
    return arguments.length ? (o = typeof w == "function" ? w : Vo(!!w), f) : o;
  }, f.on = function() {
    var w = a.on.apply(a, arguments);
    return w === a ? f : w;
  }, f.clickDistance = function(w) {
    return arguments.length ? (d = (w = +w) * w, f) : Math.sqrt(d);
  }, f;
}
function As(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Kd(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t)
    n[o] = t[o];
  return n;
}
function Mo() {
}
var go = 0.7, Sr = 1 / go, Tn = "\\s*([+-]?\\d+)\\s*", po = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", bb = /^#([0-9a-f]{3,8})$/, yb = new RegExp(`^rgb\\(${Tn},${Tn},${Tn}\\)$`), vb = new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`), xb = new RegExp(`^rgba\\(${Tn},${Tn},${Tn},${po}\\)$`), wb = new RegExp(`^rgba\\(${Et},${Et},${Et},${po}\\)$`), Sb = new RegExp(`^hsl\\(${po},${Et},${Et}\\)$`), Cb = new RegExp(`^hsla\\(${po},${Et},${Et},${po}\\)$`), jc = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
As(Mo, ho, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Pc,
  // Deprecated! Use color.formatHex.
  formatHex: Pc,
  formatHex8: Eb,
  formatHsl: _b,
  formatRgb: Hc,
  toString: Hc
});
function Pc() {
  return this.rgb().formatHex();
}
function Eb() {
  return this.rgb().formatHex8();
}
function _b() {
  return Gd(this).formatHsl();
}
function Hc() {
  return this.rgb().formatRgb();
}
function ho(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = bb.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Bc(t) : n === 3 ? new Ue(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? qo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? qo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = yb.exec(e)) ? new Ue(t[1], t[2], t[3], 1) : (t = vb.exec(e)) ? new Ue(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = xb.exec(e)) ? qo(t[1], t[2], t[3], t[4]) : (t = wb.exec(e)) ? qo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Sb.exec(e)) ? Vc(t[1], t[2] / 100, t[3] / 100, 1) : (t = Cb.exec(e)) ? Vc(t[1], t[2] / 100, t[3] / 100, t[4]) : jc.hasOwnProperty(e) ? Bc(jc[e]) : e === "transparent" ? new Ue(NaN, NaN, NaN, 0) : null;
}
function Bc(e) {
  return new Ue(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function qo(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Ue(e, t, n, o);
}
function kb(e) {
  return e instanceof Mo || (e = ho(e)), e ? (e = e.rgb(), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue();
}
function ji(e, t, n, o) {
  return arguments.length === 1 ? kb(e) : new Ue(e, t, n, o ?? 1);
}
function Ue(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
As(Ue, ji, Kd(Mo, {
  brighter(e) {
    return e = e == null ? Sr : Math.pow(Sr, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? go : Math.pow(go, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ue(dn(this.r), dn(this.g), dn(this.b), Cr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: $c,
  // Deprecated! Use color.formatHex.
  formatHex: $c,
  formatHex8: Ab,
  formatRgb: Wc,
  toString: Wc
}));
function $c() {
  return `#${cn(this.r)}${cn(this.g)}${cn(this.b)}`;
}
function Ab() {
  return `#${cn(this.r)}${cn(this.g)}${cn(this.b)}${cn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Wc() {
  const e = Cr(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${dn(this.r)}, ${dn(this.g)}, ${dn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Cr(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function dn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function cn(e) {
  return e = dn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Vc(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new dt(e, t, n, o);
}
function Gd(e) {
  if (e instanceof dt)
    return new dt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Mo || (e = ho(e)), !e)
    return new dt();
  if (e instanceof dt)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, r = Math.min(t, n, o), a = Math.max(t, n, o), i = NaN, s = a - r, c = (a + r) / 2;
  return s ? (t === a ? i = (n - o) / s + (n < o) * 6 : n === a ? i = (o - t) / s + 2 : i = (t - n) / s + 4, s /= c < 0.5 ? a + r : 2 - a - r, i *= 60) : s = c > 0 && c < 1 ? 0 : i, new dt(i, s, c, e.opacity);
}
function Mb(e, t, n, o) {
  return arguments.length === 1 ? Gd(e) : new dt(e, t, n, o ?? 1);
}
function dt(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
As(dt, Mb, Kd(Mo, {
  brighter(e) {
    return e = e == null ? Sr : Math.pow(Sr, e), new dt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? go : Math.pow(go, e), new dt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - o;
    return new Ue(
      di(e >= 240 ? e - 240 : e + 120, r, o),
      di(e, r, o),
      di(e < 120 ? e + 240 : e - 120, r, o),
      this.opacity
    );
  },
  clamp() {
    return new dt(qc(this.h), Uo(this.s), Uo(this.l), Cr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Cr(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${qc(this.h)}, ${Uo(this.s) * 100}%, ${Uo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function qc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Uo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function di(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Xd = (e) => () => e;
function Tb(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Ob(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function Nb(e) {
  return (e = +e) == 1 ? Qd : function(t, n) {
    return n - t ? Ob(t, n, e) : Xd(isNaN(t) ? n : t);
  };
}
function Qd(e, t) {
  var n = t - e;
  return n ? Tb(e, n) : Xd(isNaN(e) ? t : e);
}
const Uc = function e(t) {
  var n = Nb(t);
  function o(r, a) {
    var i = n((r = ji(r)).r, (a = ji(a)).r), s = n(r.g, a.g), c = n(r.b, a.b), u = Qd(r.opacity, a.opacity);
    return function(l) {
      return r.r = i(l), r.g = s(l), r.b = c(l), r.opacity = u(l), r + "";
    };
  }
  return o.gamma = e, o;
}(1);
function Ut(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Pi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, fi = new RegExp(Pi.source, "g");
function Db(e) {
  return function() {
    return e;
  };
}
function Rb(e) {
  return function(t) {
    return e(t) + "";
  };
}
function zb(e, t) {
  var n = Pi.lastIndex = fi.lastIndex = 0, o, r, a, i = -1, s = [], c = [];
  for (e = e + "", t = t + ""; (o = Pi.exec(e)) && (r = fi.exec(t)); )
    (a = r.index) > n && (a = t.slice(n, a), s[i] ? s[i] += a : s[++i] = a), (o = o[0]) === (r = r[0]) ? s[i] ? s[i] += r : s[++i] = r : (s[++i] = null, c.push({ i, x: Ut(o, r) })), n = fi.lastIndex;
  return n < t.length && (a = t.slice(n), s[i] ? s[i] += a : s[++i] = a), s.length < 2 ? c[0] ? Rb(c[0].x) : Db(t) : (t = c.length, function(u) {
    for (var l = 0, d; l < t; ++l)
      s[(d = c[l]).i] = d.x(u);
    return s.join("");
  });
}
var Yc = 180 / Math.PI, Hi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Jd(e, t, n, o, r, a) {
  var i, s, c;
  return (i = Math.sqrt(e * e + t * t)) && (e /= i, t /= i), (c = e * n + t * o) && (n -= e * c, o -= t * c), (s = Math.sqrt(n * n + o * o)) && (n /= s, o /= s, c /= s), e * o < t * n && (e = -e, t = -t, c = -c, i = -i), {
    translateX: r,
    translateY: a,
    rotate: Math.atan2(t, e) * Yc,
    skewX: Math.atan(c) * Yc,
    scaleX: i,
    scaleY: s
  };
}
var Yo;
function Ib(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Hi : Jd(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Lb(e) {
  return e == null || (Yo || (Yo = document.createElementNS("http://www.w3.org/2000/svg", "g")), Yo.setAttribute("transform", e), !(e = Yo.transform.baseVal.consolidate())) ? Hi : (e = e.matrix, Jd(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ef(e, t, n, o) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function a(u, l, d, f, g, p) {
    if (u !== d || l !== f) {
      var h = g.push("translate(", null, t, null, n);
      p.push({ i: h - 4, x: Ut(u, d) }, { i: h - 2, x: Ut(l, f) });
    } else
      (d || f) && g.push("translate(" + d + t + f + n);
  }
  function i(u, l, d, f) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), f.push({ i: d.push(r(d) + "rotate(", null, o) - 2, x: Ut(u, l) })) : l && d.push(r(d) + "rotate(" + l + o);
  }
  function s(u, l, d, f) {
    u !== l ? f.push({ i: d.push(r(d) + "skewX(", null, o) - 2, x: Ut(u, l) }) : l && d.push(r(d) + "skewX(" + l + o);
  }
  function c(u, l, d, f, g, p) {
    if (u !== d || l !== f) {
      var h = g.push(r(g) + "scale(", null, ",", null, ")");
      p.push({ i: h - 4, x: Ut(u, d) }, { i: h - 2, x: Ut(l, f) });
    } else
      (d !== 1 || f !== 1) && g.push(r(g) + "scale(" + d + "," + f + ")");
  }
  return function(u, l) {
    var d = [], f = [];
    return u = e(u), l = e(l), a(u.translateX, u.translateY, l.translateX, l.translateY, d, f), i(u.rotate, l.rotate, d, f), s(u.skewX, l.skewX, d, f), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, d, f), u = l = null, function(g) {
      for (var p = -1, h = f.length, m; ++p < h; )
        d[(m = f[p]).i] = m.x(g);
      return d.join("");
    };
  };
}
var Fb = ef(Ib, "px, ", "px)", "deg)"), jb = ef(Lb, ", ", ")", ")"), Pb = 1e-12;
function Zc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Hb(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Bb(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const $b = function e(t, n, o) {
  function r(a, i) {
    var s = a[0], c = a[1], u = a[2], l = i[0], d = i[1], f = i[2], g = l - s, p = d - c, h = g * g + p * p, m, x;
    if (h < Pb)
      x = Math.log(f / u) / t, m = function(M) {
        return [
          s + M * g,
          c + M * p,
          u * Math.exp(t * M * x)
        ];
      };
    else {
      var b = Math.sqrt(h), y = (f * f - u * u + o * h) / (2 * u * n * b), w = (f * f - u * u - o * h) / (2 * f * n * b), S = Math.log(Math.sqrt(y * y + 1) - y), k = Math.log(Math.sqrt(w * w + 1) - w);
      x = (k - S) / t, m = function(M) {
        var C = M * x, T = Zc(S), D = u / (n * b) * (T * Bb(t * C + S) - Hb(S));
        return [
          s + D * g,
          c + D * p,
          u * T / Zc(t * C + S)
        ];
      };
    }
    return m.duration = x * 1e3 * t / Math.SQRT2, m;
  }
  return r.rho = function(a) {
    var i = Math.max(1e-3, +a), s = i * i, c = s * s;
    return e(i, s, c);
  }, r;
}(Math.SQRT2, 2, 4);
var jn = 0, eo = 0, Zn = 0, tf = 1e3, Er, to, _r = 0, gn = 0, $r = 0, mo = typeof performance == "object" && performance.now ? performance : Date, nf = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Ms() {
  return gn || (nf(Wb), gn = mo.now() + $r);
}
function Wb() {
  gn = 0;
}
function kr() {
  this._call = this._time = this._next = null;
}
kr.prototype = of.prototype = {
  constructor: kr,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? Ms() : +n) + (t == null ? 0 : +t), !this._next && to !== this && (to ? to._next = this : Er = this, to = this), this._call = e, this._time = n, Bi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Bi());
  }
};
function of(e, t, n) {
  var o = new kr();
  return o.restart(e, t, n), o;
}
function Vb() {
  Ms(), ++jn;
  for (var e = Er, t; e; )
    (t = gn - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --jn;
}
function Kc() {
  gn = (_r = mo.now()) + $r, jn = eo = 0;
  try {
    Vb();
  } finally {
    jn = 0, Ub(), gn = 0;
  }
}
function qb() {
  var e = mo.now(), t = e - _r;
  t > tf && ($r -= t, _r = e);
}
function Ub() {
  for (var e, t = Er, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Er = n);
  to = e, Bi(o);
}
function Bi(e) {
  if (!jn) {
    eo && (eo = clearTimeout(eo));
    var t = e - gn;
    t > 24 ? (e < 1 / 0 && (eo = setTimeout(Kc, e - mo.now() - $r)), Zn && (Zn = clearInterval(Zn))) : (Zn || (_r = mo.now(), Zn = setInterval(qb, tf)), jn = 1, nf(Kc));
  }
}
function Gc(e, t, n) {
  var o = new kr();
  return t = t == null ? 0 : +t, o.restart((r) => {
    o.stop(), e(r + t);
  }, t, n), o;
}
var Yb = Hr("start", "end", "cancel", "interrupt"), Zb = [], rf = 0, Xc = 1, $i = 2, sr = 3, Qc = 4, Wi = 5, lr = 6;
function Wr(e, t, n, o, r, a) {
  var i = e.__transition;
  if (!i)
    e.__transition = {};
  else if (n in i)
    return;
  Kb(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Yb,
    tween: Zb,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: rf
  });
}
function Ts(e, t) {
  var n = ht(e, t);
  if (n.state > rf)
    throw new Error("too late; already scheduled");
  return n;
}
function kt(e, t) {
  var n = ht(e, t);
  if (n.state > sr)
    throw new Error("too late; already running");
  return n;
}
function ht(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function Kb(e, t, n) {
  var o = e.__transition, r;
  o[t] = n, n.timer = of(a, 0, n.time);
  function a(u) {
    n.state = Xc, n.timer.restart(i, n.delay, n.time), n.delay <= u && i(u - n.delay);
  }
  function i(u) {
    var l, d, f, g;
    if (n.state !== Xc)
      return c();
    for (l in o)
      if (g = o[l], g.name === n.name) {
        if (g.state === sr)
          return Gc(i);
        g.state === Qc ? (g.state = lr, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete o[l]) : +l < t && (g.state = lr, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete o[l]);
      }
    if (Gc(function() {
      n.state === sr && (n.state = Qc, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = $i, n.on.call("start", e, e.__data__, n.index, n.group), n.state === $i) {
      for (n.state = sr, r = new Array(f = n.tween.length), l = 0, d = -1; l < f; ++l)
        (g = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (r[++d] = g);
      r.length = d + 1;
    }
  }
  function s(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = Wi, 1), d = -1, f = r.length; ++d < f; )
      r[d].call(e, l);
    n.state === Wi && (n.on.call("end", e, e.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = lr, n.timer.stop(), delete o[t];
    for (var u in o)
      return;
    delete e.__transition;
  }
}
function cr(e, t) {
  var n = e.__transition, o, r, a = !0, i;
  if (n) {
    t = t == null ? null : t + "";
    for (i in n) {
      if ((o = n[i]).name !== t) {
        a = !1;
        continue;
      }
      r = o.state > $i && o.state < Wi, o.state = lr, o.timer.stop(), o.on.call(r ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[i];
    }
    a && delete e.__transition;
  }
}
function Gb(e) {
  return this.each(function() {
    cr(this, e);
  });
}
function Xb(e, t) {
  var n, o;
  return function() {
    var r = kt(this, e), a = r.tween;
    if (a !== n) {
      o = n = a;
      for (var i = 0, s = o.length; i < s; ++i)
        if (o[i].name === t) {
          o = o.slice(), o.splice(i, 1);
          break;
        }
    }
    r.tween = o;
  };
}
function Qb(e, t, n) {
  var o, r;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var a = kt(this, e), i = a.tween;
    if (i !== o) {
      r = (o = i).slice();
      for (var s = { name: t, value: n }, c = 0, u = r.length; c < u; ++c)
        if (r[c].name === t) {
          r[c] = s;
          break;
        }
      c === u && r.push(s);
    }
    a.tween = r;
  };
}
function Jb(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = ht(this.node(), n).tween, r = 0, a = o.length, i; r < a; ++r)
      if ((i = o[r]).name === e)
        return i.value;
    return null;
  }
  return this.each((t == null ? Xb : Qb)(n, e, t));
}
function Os(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var r = kt(this, o);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return ht(r, o).value[t];
  };
}
function af(e, t) {
  var n;
  return (typeof t == "number" ? Ut : t instanceof ho ? Uc : (n = ho(t)) ? (t = n, Uc) : zb)(e, t);
}
function e5(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function t5(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function n5(e, t, n) {
  var o, r = n + "", a;
  return function() {
    var i = this.getAttribute(e);
    return i === r ? null : i === o ? a : a = t(o = i, n);
  };
}
function o5(e, t, n) {
  var o, r = n + "", a;
  return function() {
    var i = this.getAttributeNS(e.space, e.local);
    return i === r ? null : i === o ? a : a = t(o = i, n);
  };
}
function r5(e, t, n) {
  var o, r, a;
  return function() {
    var i, s = n(this), c;
    return s == null ? void this.removeAttribute(e) : (i = this.getAttribute(e), c = s + "", i === c ? null : i === o && c === r ? a : (r = c, a = t(o = i, s)));
  };
}
function a5(e, t, n) {
  var o, r, a;
  return function() {
    var i, s = n(this), c;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (i = this.getAttributeNS(e.space, e.local), c = s + "", i === c ? null : i === o && c === r ? a : (r = c, a = t(o = i, s)));
  };
}
function i5(e, t) {
  var n = Br(e), o = n === "transform" ? jb : af;
  return this.attrTween(e, typeof t == "function" ? (n.local ? a5 : r5)(n, o, Os(this, "attr." + e, t)) : t == null ? (n.local ? t5 : e5)(n) : (n.local ? o5 : n5)(n, o, t));
}
function s5(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function l5(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function c5(e, t) {
  var n, o;
  function r() {
    var a = t.apply(this, arguments);
    return a !== o && (n = (o = a) && l5(e, a)), n;
  }
  return r._value = t, r;
}
function u5(e, t) {
  var n, o;
  function r() {
    var a = t.apply(this, arguments);
    return a !== o && (n = (o = a) && s5(e, a)), n;
  }
  return r._value = t, r;
}
function d5(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var o = Br(e);
  return this.tween(n, (o.local ? c5 : u5)(o, t));
}
function f5(e, t) {
  return function() {
    Ts(this, e).delay = +t.apply(this, arguments);
  };
}
function g5(e, t) {
  return t = +t, function() {
    Ts(this, e).delay = t;
  };
}
function p5(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? f5 : g5)(t, e)) : ht(this.node(), t).delay;
}
function h5(e, t) {
  return function() {
    kt(this, e).duration = +t.apply(this, arguments);
  };
}
function m5(e, t) {
  return t = +t, function() {
    kt(this, e).duration = t;
  };
}
function b5(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? h5 : m5)(t, e)) : ht(this.node(), t).duration;
}
function y5(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    kt(this, e).ease = t;
  };
}
function v5(e) {
  var t = this._id;
  return arguments.length ? this.each(y5(t, e)) : ht(this.node(), t).ease;
}
function x5(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    kt(this, e).ease = n;
  };
}
function w5(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(x5(this._id, e));
}
function S5(e) {
  typeof e != "function" && (e = Fd(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var a = t[r], i = a.length, s = o[r] = [], c, u = 0; u < i; ++u)
      (c = a[u]) && e.call(c, c.__data__, u, a) && s.push(c);
  return new jt(o, this._parents, this._name, this._id);
}
function C5(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, r = n.length, a = Math.min(o, r), i = new Array(o), s = 0; s < a; ++s)
    for (var c = t[s], u = n[s], l = c.length, d = i[s] = new Array(l), f, g = 0; g < l; ++g)
      (f = c[g] || u[g]) && (d[g] = f);
  for (; s < o; ++s)
    i[s] = t[s];
  return new jt(i, this._parents, this._name, this._id);
}
function E5(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function _5(e, t, n) {
  var o, r, a = E5(t) ? Ts : kt;
  return function() {
    var i = a(this, e), s = i.on;
    s !== o && (r = (o = s).copy()).on(t, n), i.on = r;
  };
}
function k5(e, t) {
  var n = this._id;
  return arguments.length < 2 ? ht(this.node(), n).on.on(e) : this.each(_5(n, e, t));
}
function A5(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function M5() {
  return this.on("end.remove", A5(this._id));
}
function T5(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = _s(e));
  for (var o = this._groups, r = o.length, a = new Array(r), i = 0; i < r; ++i)
    for (var s = o[i], c = s.length, u = a[i] = new Array(c), l, d, f = 0; f < c; ++f)
      (l = s[f]) && (d = e.call(l, l.__data__, f, s)) && ("__data__" in l && (d.__data__ = l.__data__), u[f] = d, Wr(u[f], t, n, f, u, ht(l, n)));
  return new jt(a, this._parents, t, n);
}
function O5(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ld(e));
  for (var o = this._groups, r = o.length, a = [], i = [], s = 0; s < r; ++s)
    for (var c = o[s], u = c.length, l, d = 0; d < u; ++d)
      if (l = c[d]) {
        for (var f = e.call(l, l.__data__, d, c), g, p = ht(l, n), h = 0, m = f.length; h < m; ++h)
          (g = f[h]) && Wr(g, t, n, h, f, p);
        a.push(f), i.push(l);
      }
  return new jt(a, i, t, n);
}
var N5 = Ao.prototype.constructor;
function D5() {
  return new N5(this._groups, this._parents);
}
function R5(e, t) {
  var n, o, r;
  return function() {
    var a = Fn(this, e), i = (this.style.removeProperty(e), Fn(this, e));
    return a === i ? null : a === n && i === o ? r : r = t(n = a, o = i);
  };
}
function sf(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function z5(e, t, n) {
  var o, r = n + "", a;
  return function() {
    var i = Fn(this, e);
    return i === r ? null : i === o ? a : a = t(o = i, n);
  };
}
function I5(e, t, n) {
  var o, r, a;
  return function() {
    var i = Fn(this, e), s = n(this), c = s + "";
    return s == null && (c = s = (this.style.removeProperty(e), Fn(this, e))), i === c ? null : i === o && c === r ? a : (r = c, a = t(o = i, s));
  };
}
function L5(e, t) {
  var n, o, r, a = "style." + t, i = "end." + a, s;
  return function() {
    var c = kt(this, e), u = c.on, l = c.value[a] == null ? s || (s = sf(t)) : void 0;
    (u !== n || r !== l) && (o = (n = u).copy()).on(i, r = l), c.on = o;
  };
}
function F5(e, t, n) {
  var o = (e += "") == "transform" ? Fb : af;
  return t == null ? this.styleTween(e, R5(e, o)).on("end.style." + e, sf(e)) : typeof t == "function" ? this.styleTween(e, I5(e, o, Os(this, "style." + e, t))).each(L5(this._id, e)) : this.styleTween(e, z5(e, o, t), n).on("end.style." + e, null);
}
function j5(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function P5(e, t, n) {
  var o, r;
  function a() {
    var i = t.apply(this, arguments);
    return i !== r && (o = (r = i) && j5(e, i, n)), o;
  }
  return a._value = t, a;
}
function H5(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2)
    return (o = this.tween(o)) && o._value;
  if (t == null)
    return this.tween(o, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(o, P5(e, t, n ?? ""));
}
function B5(e) {
  return function() {
    this.textContent = e;
  };
}
function $5(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function W5(e) {
  return this.tween("text", typeof e == "function" ? $5(Os(this, "text", e)) : B5(e == null ? "" : e + ""));
}
function V5(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function q5(e) {
  var t, n;
  function o() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && V5(r)), t;
  }
  return o._value = e, o;
}
function U5(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, q5(e));
}
function Y5() {
  for (var e = this._name, t = this._id, n = lf(), o = this._groups, r = o.length, a = 0; a < r; ++a)
    for (var i = o[a], s = i.length, c, u = 0; u < s; ++u)
      if (c = i[u]) {
        var l = ht(c, t);
        Wr(c, e, n, u, i, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new jt(o, this._parents, e, n);
}
function Z5() {
  var e, t, n = this, o = n._id, r = n.size();
  return new Promise(function(a, i) {
    var s = { value: i }, c = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var u = kt(this, o), l = u.on;
      l !== e && (t = (e = l).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), u.on = t;
    }), r === 0 && a();
  });
}
var K5 = 0;
function jt(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function lf() {
  return ++K5;
}
var Rt = Ao.prototype;
jt.prototype = {
  constructor: jt,
  select: T5,
  selectAll: O5,
  selectChild: Rt.selectChild,
  selectChildren: Rt.selectChildren,
  filter: S5,
  merge: C5,
  selection: D5,
  transition: Y5,
  call: Rt.call,
  nodes: Rt.nodes,
  node: Rt.node,
  size: Rt.size,
  empty: Rt.empty,
  each: Rt.each,
  on: k5,
  attr: i5,
  attrTween: d5,
  style: F5,
  styleTween: H5,
  text: W5,
  textTween: U5,
  remove: M5,
  tween: Jb,
  delay: p5,
  duration: b5,
  ease: v5,
  easeVarying: w5,
  end: Z5,
  [Symbol.iterator]: Rt[Symbol.iterator]
};
function G5(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var X5 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: G5
};
function Q5(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function J5(e) {
  var t, n;
  e instanceof jt ? (t = e._id, e = e._name) : (t = lf(), (n = X5).time = Ms(), e = e == null ? null : e + "");
  for (var o = this._groups, r = o.length, a = 0; a < r; ++a)
    for (var i = o[a], s = i.length, c, u = 0; u < s; ++u)
      (c = i[u]) && Wr(c, e, t, u, i, n || Q5(c, t));
  return new jt(o, this._parents, e, t);
}
Ao.prototype.interrupt = Gb;
Ao.prototype.transition = J5;
const Zo = (e) => () => e;
function e6(e, {
  sourceEvent: t,
  target: n,
  transform: o,
  dispatch: r
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: r }
  });
}
function It(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
It.prototype = {
  constructor: It,
  scale: function(e) {
    return e === 1 ? this : new It(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new It(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Gt = new It(1, 0, 0);
It.prototype;
function gi(e) {
  e.stopImmediatePropagation();
}
function Kn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function t6(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function n6() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Jc() {
  return this.__zoom || Gt;
}
function o6(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function r6() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function a6(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], i = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r),
    i > a ? (a + i) / 2 : Math.min(0, a) || Math.max(0, i)
  );
}
function i6() {
  var e = t6, t = n6, n = a6, o = o6, r = r6, a = [0, 1 / 0], i = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, c = $b, u = Hr("start", "zoom", "end"), l, d, f, g = 500, p = 150, h = 0, m = 10;
  function x(E) {
    E.property("__zoom", Jc).on("wheel.zoom", C, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", D).filter(r).on("touchstart.zoom", F).on("touchmove.zoom", $).on("touchend.zoom touchcancel.zoom", P).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(E, A, _, z) {
    var R = E.selection ? E.selection() : E;
    R.property("__zoom", Jc), E !== R ? S(E, A, _, z) : R.interrupt().each(function() {
      k(this, arguments).event(z).start().zoom(null, typeof A == "function" ? A.apply(this, arguments) : A).end();
    });
  }, x.scaleBy = function(E, A, _, z) {
    x.scaleTo(E, function() {
      var R = this.__zoom.k, N = typeof A == "function" ? A.apply(this, arguments) : A;
      return R * N;
    }, _, z);
  }, x.scaleTo = function(E, A, _, z) {
    x.transform(E, function() {
      var R = t.apply(this, arguments), N = this.__zoom, O = _ == null ? w(R) : typeof _ == "function" ? _.apply(this, arguments) : _, I = N.invert(O), j = typeof A == "function" ? A.apply(this, arguments) : A;
      return n(y(b(N, j), O, I), R, i);
    }, _, z);
  }, x.translateBy = function(E, A, _, z) {
    x.transform(E, function() {
      return n(this.__zoom.translate(
        typeof A == "function" ? A.apply(this, arguments) : A,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), t.apply(this, arguments), i);
    }, null, z);
  }, x.translateTo = function(E, A, _, z, R) {
    x.transform(E, function() {
      var N = t.apply(this, arguments), O = this.__zoom, I = z == null ? w(N) : typeof z == "function" ? z.apply(this, arguments) : z;
      return n(Gt.translate(I[0], I[1]).scale(O.k).translate(
        typeof A == "function" ? -A.apply(this, arguments) : -A,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), N, i);
    }, z, R);
  };
  function b(E, A) {
    return A = Math.max(a[0], Math.min(a[1], A)), A === E.k ? E : new It(A, E.x, E.y);
  }
  function y(E, A, _) {
    var z = A[0] - _[0] * E.k, R = A[1] - _[1] * E.k;
    return z === E.x && R === E.y ? E : new It(E.k, z, R);
  }
  function w(E) {
    return [(+E[0][0] + +E[1][0]) / 2, (+E[0][1] + +E[1][1]) / 2];
  }
  function S(E, A, _, z) {
    E.on("start.zoom", function() {
      k(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var R = this, N = arguments, O = k(R, N).event(z), I = t.apply(R, N), j = _ == null ? w(I) : typeof _ == "function" ? _.apply(R, N) : _, V = Math.max(I[1][0] - I[0][0], I[1][1] - I[0][1]), W = R.__zoom, U = typeof A == "function" ? A.apply(R, N) : A, Z = c(W.invert(j).concat(V / W.k), U.invert(j).concat(V / U.k));
      return function(K) {
        if (K === 1)
          K = U;
        else {
          var Q = Z(K), te = V / Q[2];
          K = new It(te, j[0] - Q[0] * te, j[1] - Q[1] * te);
        }
        O.zoom(null, K);
      };
    });
  }
  function k(E, A, _) {
    return !_ && E.__zooming || new M(E, A);
  }
  function M(E, A) {
    this.that = E, this.args = A, this.active = 0, this.sourceEvent = null, this.extent = t.apply(E, A), this.taps = 0;
  }
  M.prototype = {
    event: function(E) {
      return E && (this.sourceEvent = E), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(E, A) {
      return this.mouse && E !== "mouse" && (this.mouse[1] = A.invert(this.mouse[0])), this.touch0 && E !== "touch" && (this.touch0[1] = A.invert(this.touch0[0])), this.touch1 && E !== "touch" && (this.touch1[1] = A.invert(this.touch1[0])), this.that.__zoom = A, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(E) {
      var A = ut(this.that).datum();
      u.call(
        E,
        this.that,
        new e6(E, {
          sourceEvent: this.sourceEvent,
          target: x,
          type: E,
          transform: this.that.__zoom,
          dispatch: u
        }),
        A
      );
    }
  };
  function C(E, ...A) {
    if (!e.apply(this, arguments))
      return;
    var _ = k(this, A).event(E), z = this.__zoom, R = Math.max(a[0], Math.min(a[1], z.k * Math.pow(2, o.apply(this, arguments)))), N = St(E);
    if (_.wheel)
      (_.mouse[0][0] !== N[0] || _.mouse[0][1] !== N[1]) && (_.mouse[1] = z.invert(_.mouse[0] = N)), clearTimeout(_.wheel);
    else {
      if (z.k === R)
        return;
      _.mouse = [N, z.invert(N)], cr(this), _.start();
    }
    Kn(E), _.wheel = setTimeout(O, p), _.zoom("mouse", n(y(b(z, R), _.mouse[0], _.mouse[1]), _.extent, i));
    function O() {
      _.wheel = null, _.end();
    }
  }
  function T(E, ...A) {
    if (f || !e.apply(this, arguments))
      return;
    var _ = E.currentTarget, z = k(this, A, !0).event(E), R = ut(E.view).on("mousemove.zoom", j, !0).on("mouseup.zoom", V, !0), N = St(E, _), O = E.clientX, I = E.clientY;
    Yd(E.view), gi(E), z.mouse = [N, this.__zoom.invert(N)], cr(this), z.start();
    function j(W) {
      if (Kn(W), !z.moved) {
        var U = W.clientX - O, Z = W.clientY - I;
        z.moved = U * U + Z * Z > h;
      }
      z.event(W).zoom("mouse", n(y(z.that.__zoom, z.mouse[0] = St(W, _), z.mouse[1]), z.extent, i));
    }
    function V(W) {
      R.on("mousemove.zoom mouseup.zoom", null), Zd(W.view, z.moved), Kn(W), z.event(W).end();
    }
  }
  function D(E, ...A) {
    if (e.apply(this, arguments)) {
      var _ = this.__zoom, z = St(E.changedTouches ? E.changedTouches[0] : E, this), R = _.invert(z), N = _.k * (E.shiftKey ? 0.5 : 2), O = n(y(b(_, N), z, R), t.apply(this, A), i);
      Kn(E), s > 0 ? ut(this).transition().duration(s).call(S, O, z, E) : ut(this).call(x.transform, O, z, E);
    }
  }
  function F(E, ...A) {
    if (e.apply(this, arguments)) {
      var _ = E.touches, z = _.length, R = k(this, A, E.changedTouches.length === z).event(E), N, O, I, j;
      for (gi(E), O = 0; O < z; ++O)
        I = _[O], j = St(I, this), j = [j, this.__zoom.invert(j), I.identifier], R.touch0 ? !R.touch1 && R.touch0[2] !== j[2] && (R.touch1 = j, R.taps = 0) : (R.touch0 = j, N = !0, R.taps = 1 + !!l);
      l && (l = clearTimeout(l)), N && (R.taps < 2 && (d = j[0], l = setTimeout(function() {
        l = null;
      }, g)), cr(this), R.start());
    }
  }
  function $(E, ...A) {
    if (this.__zooming) {
      var _ = k(this, A).event(E), z = E.changedTouches, R = z.length, N, O, I, j;
      for (Kn(E), N = 0; N < R; ++N)
        O = z[N], I = St(O, this), _.touch0 && _.touch0[2] === O.identifier ? _.touch0[0] = I : _.touch1 && _.touch1[2] === O.identifier && (_.touch1[0] = I);
      if (O = _.that.__zoom, _.touch1) {
        var V = _.touch0[0], W = _.touch0[1], U = _.touch1[0], Z = _.touch1[1], K = (K = U[0] - V[0]) * K + (K = U[1] - V[1]) * K, Q = (Q = Z[0] - W[0]) * Q + (Q = Z[1] - W[1]) * Q;
        O = b(O, Math.sqrt(K / Q)), I = [(V[0] + U[0]) / 2, (V[1] + U[1]) / 2], j = [(W[0] + Z[0]) / 2, (W[1] + Z[1]) / 2];
      } else if (_.touch0)
        I = _.touch0[0], j = _.touch0[1];
      else
        return;
      _.zoom("touch", n(y(O, I, j), _.extent, i));
    }
  }
  function P(E, ...A) {
    if (this.__zooming) {
      var _ = k(this, A).event(E), z = E.changedTouches, R = z.length, N, O;
      for (gi(E), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, g), N = 0; N < R; ++N)
        O = z[N], _.touch0 && _.touch0[2] === O.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === O.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0)
        _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (O = St(O, this), Math.hypot(d[0] - O[0], d[1] - O[1]) < m)) {
        var I = ut(this).on("dblclick.zoom");
        I && I.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(E) {
    return arguments.length ? (o = typeof E == "function" ? E : Zo(+E), x) : o;
  }, x.filter = function(E) {
    return arguments.length ? (e = typeof E == "function" ? E : Zo(!!E), x) : e;
  }, x.touchable = function(E) {
    return arguments.length ? (r = typeof E == "function" ? E : Zo(!!E), x) : r;
  }, x.extent = function(E) {
    return arguments.length ? (t = typeof E == "function" ? E : Zo([[+E[0][0], +E[0][1]], [+E[1][0], +E[1][1]]]), x) : t;
  }, x.scaleExtent = function(E) {
    return arguments.length ? (a[0] = +E[0], a[1] = +E[1], x) : [a[0], a[1]];
  }, x.translateExtent = function(E) {
    return arguments.length ? (i[0][0] = +E[0][0], i[1][0] = +E[1][0], i[0][1] = +E[0][1], i[1][1] = +E[1][1], x) : [[i[0][0], i[0][1]], [i[1][0], i[1][1]]];
  }, x.constrain = function(E) {
    return arguments.length ? (n = E, x) : n;
  }, x.duration = function(E) {
    return arguments.length ? (s = +E, x) : s;
  }, x.interpolate = function(E) {
    return arguments.length ? (c = E, x) : c;
  }, x.on = function() {
    var E = u.on.apply(u, arguments);
    return E === u ? x : E;
  }, x.clickDistance = function(E) {
    return arguments.length ? (h = (E = +E) * E, x) : Math.sqrt(h);
  }, x.tapDistance = function(E) {
    return arguments.length ? (m = +E, x) : m;
  }, x;
}
const Vr = pt(null), s6 = Vr.Provider, gt = {
  error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
  error004: () => "The React Flow parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (e) => `The old edge with id=${e} does not exist.`,
  error009: (e) => `Marker type "${e}" doesn't exist.`,
  error008: (e, t) => `Couldn't create edge for ${e ? "target" : "source"} handle id: "${e ? t.targetHandle : t.sourceHandle}", edge id: ${t.id}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
  error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`
}, cf = gt.error001();
function ke(e, t) {
  const n = Ye(Vr);
  if (n === null)
    throw new Error(cf);
  return zd(n, e, t);
}
const Le = () => {
  const e = Ye(Vr);
  if (e === null)
    throw new Error(cf);
  return Ee(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe,
    destroy: e.destroy
  }), [e]);
}, l6 = (e) => e.userSelectionActive ? "none" : "all";
function uf({ position: e, children: t, className: n, style: o, ...r }) {
  const a = ke(l6), i = `${e}`.split("-");
  return H.createElement("div", { className: $e(["react-flow__panel", n, ...i]), style: { ...o, pointerEvents: a }, ...r }, t);
}
function c6({ proOptions: e, position: t = "bottom-right" }) {
  return e != null && e.hideAttribution ? null : H.createElement(
    uf,
    { position: t, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://reactflow.dev/pro" },
    H.createElement("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution" }, "React Flow")
  );
}
const u6 = ({ x: e, y: t, label: n, labelStyle: o = {}, labelShowBg: r = !0, labelBgStyle: a = {}, labelBgPadding: i = [2, 4], labelBgBorderRadius: s = 2, children: c, className: u, ...l }) => {
  const d = ae(null), [f, g] = fe({ x: 0, y: 0, width: 0, height: 0 }), p = $e(["react-flow__edge-textwrapper", u]);
  return ie(() => {
    if (d.current) {
      const h = d.current.getBBox();
      g({
        x: h.x,
        y: h.y,
        width: h.width,
        height: h.height
      });
    }
  }, [n]), typeof n > "u" || !n ? null : H.createElement(
    "g",
    { transform: `translate(${e - f.width / 2} ${t - f.height / 2})`, className: p, visibility: f.width ? "visible" : "hidden", ...l },
    r && H.createElement("rect", { width: f.width + 2 * i[0], x: -i[0], y: -i[1], height: f.height + 2 * i[1], className: "react-flow__edge-textbg", style: a, rx: s, ry: s }),
    H.createElement("text", { className: "react-flow__edge-text", y: f.height / 2, dy: "0.3em", ref: d, style: o }, n),
    c
  );
};
var d6 = Te(u6);
const Ns = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), Pn = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), Ds = (e = { x: 0, y: 0 }, t) => ({
  x: Pn(e.x, t[0][0], t[1][0]),
  y: Pn(e.y, t[0][1], t[1][1])
}), eu = (e, t, n) => e < t ? Pn(Math.abs(e - t), 1, 50) / 50 : e > n ? -Pn(Math.abs(e - n), 1, 50) / 50 : 0, df = (e, t) => {
  const n = eu(e.x, 35, t.width - 35) * 20, o = eu(e.y, 35, t.height - 35) * 20;
  return [n, o];
}, ff = (e) => {
  var t;
  return ((t = e.getRootNode) == null ? void 0 : t.call(e)) || (window == null ? void 0 : window.document);
}, f6 = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  x2: Math.max(e.x2, t.x2),
  y2: Math.max(e.y2, t.y2)
}), Rs = ({ x: e, y: t, width: n, height: o }) => ({
  x: e,
  y: t,
  x2: e + n,
  y2: t + o
}), g6 = ({ x: e, y: t, x2: n, y2: o }) => ({
  x: e,
  y: t,
  width: n - e,
  height: o - t
}), tu = (e) => ({
  ...e.positionAbsolute || { x: 0, y: 0 },
  width: e.width || 0,
  height: e.height || 0
}), Vi = (e, t) => {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}, p6 = (e) => nt(e.width) && nt(e.height) && nt(e.x) && nt(e.y), nt = (e) => !isNaN(e) && isFinite(e), Me = Symbol.for("internals"), gf = ["Enter", " ", "Escape"], pf = (e, t) => {
  process.env.NODE_ENV === "development" && console.warn(`[React Flow]: ${t} Help: https://reactflow.dev/error#${e}`);
}, h6 = (e) => "nativeEvent" in e;
function qi(e) {
  var r, a;
  const t = h6(e) ? e.nativeEvent : e, n = ((a = (r = t.composedPath) == null ? void 0 : r.call(t)) == null ? void 0 : a[0]) || e.target;
  return ["INPUT", "SELECT", "TEXTAREA"].includes(n == null ? void 0 : n.nodeName) || (n == null ? void 0 : n.hasAttribute("contenteditable")) || !!(n != null && n.closest(".nokey"));
}
const hf = (e) => "clientX" in e, Xt = (e, t) => {
  var a, i;
  const n = hf(e), o = n ? e.clientX : (a = e.touches) == null ? void 0 : a[0].clientX, r = n ? e.clientY : (i = e.touches) == null ? void 0 : i[0].clientY;
  return {
    x: o - ((t == null ? void 0 : t.left) ?? 0),
    y: r - ((t == null ? void 0 : t.top) ?? 0)
  };
}, Ar = () => {
  var e;
  return typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0;
}, Vn = ({ id: e, path: t, labelX: n, labelY: o, label: r, labelStyle: a, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u, style: l, markerEnd: d, markerStart: f, interactionWidth: g = 20 }) => H.createElement(
  H.Fragment,
  null,
  H.createElement("path", { id: e, style: l, d: t, fill: "none", className: "react-flow__edge-path", markerEnd: d, markerStart: f }),
  g && H.createElement("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: g, className: "react-flow__edge-interaction" }),
  r && nt(n) && nt(o) ? H.createElement(d6, { x: n, y: o, label: r, labelStyle: a, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u }) : null
);
Vn.displayName = "BaseEdge";
function Gn(e, t, n) {
  return n === void 0 ? n : (o) => {
    const r = t().edges.find((a) => a.id === e);
    r && n(o, { ...r });
  };
}
function mf({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const r = Math.abs(n - e) / 2, a = n < e ? n + r : n - r, i = Math.abs(o - t) / 2, s = o < t ? o + i : o - i;
  return [a, s, r, i];
}
function bf({ sourceX: e, sourceY: t, targetX: n, targetY: o, sourceControlX: r, sourceControlY: a, targetControlX: i, targetControlY: s }) {
  const c = e * 0.125 + r * 0.375 + i * 0.375 + n * 0.125, u = t * 0.125 + a * 0.375 + s * 0.375 + o * 0.125, l = Math.abs(c - e), d = Math.abs(u - t);
  return [c, u, l, d];
}
var pn;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(pn || (pn = {}));
var un;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(un || (un = {}));
var bo;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(bo || (bo = {}));
var Zt;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Zt || (Zt = {}));
var Mr;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(Mr || (Mr = {}));
var ne;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(ne || (ne = {}));
function nu({ pos: e, x1: t, y1: n, x2: o, y2: r }) {
  return e === ne.Left || e === ne.Right ? [0.5 * (t + o), n] : [t, 0.5 * (n + r)];
}
function yf({ sourceX: e, sourceY: t, sourcePosition: n = ne.Bottom, targetX: o, targetY: r, targetPosition: a = ne.Top }) {
  const [i, s] = nu({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r
  }), [c, u] = nu({
    pos: a,
    x1: o,
    y1: r,
    x2: e,
    y2: t
  }), [l, d, f, g] = bf({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: i,
    sourceControlY: s,
    targetControlX: c,
    targetControlY: u
  });
  return [
    `M${e},${t} C${i},${s} ${c},${u} ${o},${r}`,
    l,
    d,
    f,
    g
  ];
}
const zs = Te(({ sourceX: e, sourceY: t, targetX: n, targetY: o, sourcePosition: r = ne.Bottom, targetPosition: a = ne.Top, label: i, labelStyle: s, labelShowBg: c, labelBgStyle: u, labelBgPadding: l, labelBgBorderRadius: d, style: f, markerEnd: g, markerStart: p, interactionWidth: h }) => {
  const [m, x, b] = yf({
    sourceX: e,
    sourceY: t,
    sourcePosition: r,
    targetX: n,
    targetY: o,
    targetPosition: a
  });
  return H.createElement(Vn, { path: m, labelX: x, labelY: b, label: i, labelStyle: s, labelShowBg: c, labelBgStyle: u, labelBgPadding: l, labelBgBorderRadius: d, style: f, markerEnd: g, markerStart: p, interactionWidth: h });
});
zs.displayName = "SimpleBezierEdge";
const ou = {
  [ne.Left]: { x: -1, y: 0 },
  [ne.Right]: { x: 1, y: 0 },
  [ne.Top]: { x: 0, y: -1 },
  [ne.Bottom]: { x: 0, y: 1 }
}, m6 = ({ source: e, sourcePosition: t = ne.Bottom, target: n }) => t === ne.Left || t === ne.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, ru = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function b6({ source: e, sourcePosition: t = ne.Bottom, target: n, targetPosition: o = ne.Top, center: r, offset: a }) {
  const i = ou[t], s = ou[o], c = { x: e.x + i.x * a, y: e.y + i.y * a }, u = { x: n.x + s.x * a, y: n.y + s.y * a }, l = m6({
    source: c,
    sourcePosition: t,
    target: u
  }), d = l.x !== 0 ? "x" : "y", f = l[d];
  let g = [], p, h;
  const m = { x: 0, y: 0 }, x = { x: 0, y: 0 }, [b, y, w, S] = mf({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (i[d] * s[d] === -1) {
    p = r.x ?? b, h = r.y ?? y;
    const M = [
      { x: p, y: c.y },
      { x: p, y: u.y }
    ], C = [
      { x: c.x, y: h },
      { x: u.x, y: h }
    ];
    i[d] === f ? g = d === "x" ? M : C : g = d === "x" ? C : M;
  } else {
    const M = [{ x: c.x, y: u.y }], C = [{ x: u.x, y: c.y }];
    if (d === "x" ? g = i.x === f ? C : M : g = i.y === f ? M : C, t === o) {
      const P = Math.abs(e[d] - n[d]);
      if (P <= a) {
        const E = Math.min(a - 1, a - P);
        i[d] === f ? m[d] = (c[d] > e[d] ? -1 : 1) * E : x[d] = (u[d] > n[d] ? -1 : 1) * E;
      }
    }
    if (t !== o) {
      const P = d === "x" ? "y" : "x", E = i[d] === s[P], A = c[P] > u[P], _ = c[P] < u[P];
      (i[d] === 1 && (!E && A || E && _) || i[d] !== 1 && (!E && _ || E && A)) && (g = d === "x" ? M : C);
    }
    const T = { x: c.x + m.x, y: c.y + m.y }, D = { x: u.x + x.x, y: u.y + x.y }, F = Math.max(Math.abs(T.x - g[0].x), Math.abs(D.x - g[0].x)), $ = Math.max(Math.abs(T.y - g[0].y), Math.abs(D.y - g[0].y));
    F >= $ ? (p = (T.x + D.x) / 2, h = g[0].y) : (p = g[0].x, h = (T.y + D.y) / 2);
  }
  return [[
    e,
    { x: c.x + m.x, y: c.y + m.y },
    ...g,
    { x: u.x + x.x, y: u.y + x.y },
    n
  ], p, h, w, S];
}
function y6(e, t, n, o) {
  const r = Math.min(ru(e, t) / 2, ru(t, n) / 2, o), { x: a, y: i } = t;
  if (e.x === a && a === n.x || e.y === i && i === n.y)
    return `L${a} ${i}`;
  if (e.y === i) {
    const u = e.x < n.x ? -1 : 1, l = e.y < n.y ? 1 : -1;
    return `L ${a + r * u},${i}Q ${a},${i} ${a},${i + r * l}`;
  }
  const s = e.x < n.x ? 1 : -1, c = e.y < n.y ? -1 : 1;
  return `L ${a},${i + r * c}Q ${a},${i} ${a + r * s},${i}`;
}
function Ui({ sourceX: e, sourceY: t, sourcePosition: n = ne.Bottom, targetX: o, targetY: r, targetPosition: a = ne.Top, borderRadius: i = 5, centerX: s, centerY: c, offset: u = 20 }) {
  const [l, d, f, g, p] = b6({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: o, y: r },
    targetPosition: a,
    center: { x: s, y: c },
    offset: u
  });
  return [l.reduce((m, x, b) => {
    let y = "";
    return b > 0 && b < l.length - 1 ? y = y6(l[b - 1], x, l[b + 1], i) : y = `${b === 0 ? "M" : "L"}${x.x} ${x.y}`, m += y, m;
  }, ""), d, f, g, p];
}
const qr = Te(({ sourceX: e, sourceY: t, targetX: n, targetY: o, label: r, labelStyle: a, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u, style: l, sourcePosition: d = ne.Bottom, targetPosition: f = ne.Top, markerEnd: g, markerStart: p, pathOptions: h, interactionWidth: m }) => {
  const [x, b, y] = Ui({
    sourceX: e,
    sourceY: t,
    sourcePosition: d,
    targetX: n,
    targetY: o,
    targetPosition: f,
    borderRadius: h == null ? void 0 : h.borderRadius,
    offset: h == null ? void 0 : h.offset
  });
  return H.createElement(Vn, { path: x, labelX: b, labelY: y, label: r, labelStyle: a, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u, style: l, markerEnd: g, markerStart: p, interactionWidth: m });
});
qr.displayName = "SmoothStepEdge";
const Is = Te((e) => {
  var t;
  return H.createElement(qr, { ...e, pathOptions: Ee(() => {
    var n;
    return { borderRadius: 0, offset: (n = e.pathOptions) == null ? void 0 : n.offset };
  }, [(t = e.pathOptions) == null ? void 0 : t.offset]) });
});
Is.displayName = "StepEdge";
function v6({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const [r, a, i, s] = mf({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o
  });
  return [`M ${e},${t}L ${n},${o}`, r, a, i, s];
}
const Ls = Te(({ sourceX: e, sourceY: t, targetX: n, targetY: o, label: r, labelStyle: a, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u, style: l, markerEnd: d, markerStart: f, interactionWidth: g }) => {
  const [p, h, m] = v6({ sourceX: e, sourceY: t, targetX: n, targetY: o });
  return H.createElement(Vn, { path: p, labelX: h, labelY: m, label: r, labelStyle: a, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u, style: l, markerEnd: d, markerStart: f, interactionWidth: g });
});
Ls.displayName = "StraightEdge";
function Ko(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function au({ pos: e, x1: t, y1: n, x2: o, y2: r, c: a }) {
  switch (e) {
    case ne.Left:
      return [t - Ko(t - o, a), n];
    case ne.Right:
      return [t + Ko(o - t, a), n];
    case ne.Top:
      return [t, n - Ko(n - r, a)];
    case ne.Bottom:
      return [t, n + Ko(r - n, a)];
  }
}
function vf({ sourceX: e, sourceY: t, sourcePosition: n = ne.Bottom, targetX: o, targetY: r, targetPosition: a = ne.Top, curvature: i = 0.25 }) {
  const [s, c] = au({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r,
    c: i
  }), [u, l] = au({
    pos: a,
    x1: o,
    y1: r,
    x2: e,
    y2: t,
    c: i
  }), [d, f, g, p] = bf({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: s,
    sourceControlY: c,
    targetControlX: u,
    targetControlY: l
  });
  return [
    `M${e},${t} C${s},${c} ${u},${l} ${o},${r}`,
    d,
    f,
    g,
    p
  ];
}
const Tr = Te(({ sourceX: e, sourceY: t, targetX: n, targetY: o, sourcePosition: r = ne.Bottom, targetPosition: a = ne.Top, label: i, labelStyle: s, labelShowBg: c, labelBgStyle: u, labelBgPadding: l, labelBgBorderRadius: d, style: f, markerEnd: g, markerStart: p, pathOptions: h, interactionWidth: m }) => {
  const [x, b, y] = vf({
    sourceX: e,
    sourceY: t,
    sourcePosition: r,
    targetX: n,
    targetY: o,
    targetPosition: a,
    curvature: h == null ? void 0 : h.curvature
  });
  return H.createElement(Vn, { path: x, labelX: b, labelY: y, label: i, labelStyle: s, labelShowBg: c, labelBgStyle: u, labelBgPadding: l, labelBgBorderRadius: d, style: f, markerEnd: g, markerStart: p, interactionWidth: m });
});
Tr.displayName = "BezierEdge";
const Fs = pt(null), x6 = Fs.Provider;
Fs.Consumer;
const w6 = () => Ye(Fs), S6 = (e) => "id" in e && "source" in e && "target" in e, C6 = (e) => "id" in e && !("source" in e) && !("target" in e), E6 = ({ source: e, sourceHandle: t, target: n, targetHandle: o }) => `reactflow__edge-${e}${t || ""}-${n}${o || ""}`, Yi = (e, t) => typeof e > "u" ? "" : typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}`, _6 = (e, t) => t.some((n) => n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)), k6 = (e, t) => {
  if (!e.source || !e.target)
    return pf("006", gt.error006()), t;
  let n;
  return S6(e) ? n = { ...e } : n = {
    ...e,
    id: E6(e)
  }, _6(n, t) ? t : t.concat(n);
}, Zi = ({ x: e, y: t }, [n, o, r], a, [i, s]) => {
  const c = {
    x: (e - n) / r,
    y: (t - o) / r
  };
  return a ? {
    x: i * Math.round(c.x / i),
    y: s * Math.round(c.y / s)
  } : c;
}, xf = ({ x: e, y: t }, [n, o, r]) => ({
  x: e * r + n,
  y: t * r + o
}), On = (e, t = [0, 0]) => {
  if (!e)
    return {
      x: 0,
      y: 0,
      positionAbsolute: {
        x: 0,
        y: 0
      }
    };
  const n = (e.width ?? 0) * t[0], o = (e.height ?? 0) * t[1], r = {
    x: e.position.x - n,
    y: e.position.y - o
  };
  return {
    ...r,
    positionAbsolute: e.positionAbsolute ? {
      x: e.positionAbsolute.x - n,
      y: e.positionAbsolute.y - o
    } : r
  };
}, js = (e, t = [0, 0]) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = e.reduce((o, r) => {
    const { x: a, y: i } = On(r, t).positionAbsolute;
    return f6(o, Rs({
      x: a,
      y: i,
      width: r.width || 0,
      height: r.height || 0
    }));
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return g6(n);
}, wf = (e, t, [n, o, r] = [0, 0, 1], a = !1, i = !1, s = [0, 0]) => {
  const c = {
    x: (t.x - n) / r,
    y: (t.y - o) / r,
    width: t.width / r,
    height: t.height / r
  }, u = [];
  return e.forEach((l) => {
    const { width: d, height: f, selectable: g = !0, hidden: p = !1 } = l;
    if (i && !g || p)
      return !1;
    const { positionAbsolute: h } = On(l, s), m = {
      x: h.x,
      y: h.y,
      width: d || 0,
      height: f || 0
    }, x = Vi(c, m), b = typeof d > "u" || typeof f > "u" || d === null || f === null, y = a && x > 0, w = (d || 0) * (f || 0);
    (b || y || x >= w || l.dragging) && u.push(l);
  }), u;
}, Sf = (e, t) => {
  const n = e.map((o) => o.id);
  return t.filter((o) => n.includes(o.source) || n.includes(o.target));
}, Cf = (e, t, n, o, r, a = 0.1) => {
  const i = t / (e.width * (1 + a)), s = n / (e.height * (1 + a)), c = Math.min(i, s), u = Pn(c, o, r), l = e.x + e.width / 2, d = e.y + e.height / 2, f = t / 2 - l * u, g = n / 2 - d * u;
  return { x: f, y: g, zoom: u };
}, an = (e, t = 0) => e.transition().duration(t);
function iu(e, t, n, o) {
  return (t[n] || []).reduce((r, a) => {
    var i, s;
    return `${e.id}-${a.id}-${n}` !== o && r.push({
      id: a.id || null,
      type: n,
      nodeId: e.id,
      x: (((i = e.positionAbsolute) == null ? void 0 : i.x) ?? 0) + a.x + a.width / 2,
      y: (((s = e.positionAbsolute) == null ? void 0 : s.y) ?? 0) + a.y + a.height / 2
    }), r;
  }, []);
}
function A6(e, t, n, o, r, a) {
  const { x: i, y: s } = Xt(e), u = t.elementsFromPoint(i, s).find((p) => p.classList.contains("react-flow__handle"));
  if (u) {
    const p = u.getAttribute("data-nodeid");
    if (p) {
      const h = Ps(void 0, u), m = u.getAttribute("data-handleid"), x = a({ nodeId: p, id: m, type: h });
      if (x) {
        const b = r.find((y) => y.nodeId === p && y.type === h && y.id === m);
        return {
          handle: {
            id: m,
            type: h,
            nodeId: p,
            x: (b == null ? void 0 : b.x) || n.x,
            y: (b == null ? void 0 : b.y) || n.y
          },
          validHandleResult: x
        };
      }
    }
  }
  let l = [], d = 1 / 0;
  if (r.forEach((p) => {
    const h = Math.sqrt((p.x - n.x) ** 2 + (p.y - n.y) ** 2);
    if (h <= o) {
      const m = a(p);
      h <= d && (h < d ? l = [{ handle: p, validHandleResult: m }] : h === d && l.push({
        handle: p,
        validHandleResult: m
      }), d = h);
    }
  }), !l.length)
    return { handle: null, validHandleResult: Ef() };
  if (l.length === 1)
    return l[0];
  const f = l.some(({ validHandleResult: p }) => p.isValid), g = l.some(({ handle: p }) => p.type === "target");
  return l.find(({ handle: p, validHandleResult: h }) => g ? p.type === "target" : f ? h.isValid : !0) || l[0];
}
const M6 = { source: null, target: null, sourceHandle: null, targetHandle: null }, Ef = () => ({
  handleDomNode: null,
  isValid: !1,
  connection: M6,
  endHandle: null
});
function _f(e, t, n, o, r, a, i) {
  const s = r === "target", c = i.querySelector(`.react-flow__handle[data-id="${e == null ? void 0 : e.nodeId}-${e == null ? void 0 : e.id}-${e == null ? void 0 : e.type}"]`), u = {
    ...Ef(),
    handleDomNode: c
  };
  if (c) {
    const l = Ps(void 0, c), d = c.getAttribute("data-nodeid"), f = c.getAttribute("data-handleid"), g = c.classList.contains("connectable"), p = c.classList.contains("connectableend"), h = {
      source: s ? d : n,
      sourceHandle: s ? f : o,
      target: s ? n : d,
      targetHandle: s ? o : f
    };
    u.connection = h, g && p && (t === pn.Strict ? s && l === "source" || !s && l === "target" : d !== n || f !== o) && (u.endHandle = {
      nodeId: d,
      handleId: f,
      type: l
    }, u.isValid = a(h));
  }
  return u;
}
function T6({ nodes: e, nodeId: t, handleId: n, handleType: o }) {
  return e.reduce((r, a) => {
    if (a[Me]) {
      const { handleBounds: i } = a[Me];
      let s = [], c = [];
      i && (s = iu(a, i, "source", `${t}-${n}-${o}`), c = iu(a, i, "target", `${t}-${n}-${o}`)), r.push(...s, ...c);
    }
    return r;
  }, []);
}
function Ps(e, t) {
  return e || (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null);
}
function pi(e) {
  e == null || e.classList.remove("valid", "connecting", "react-flow__handle-valid", "react-flow__handle-connecting");
}
function O6(e, t) {
  let n = null;
  return t ? n = "valid" : e && !t && (n = "invalid"), n;
}
function kf({ event: e, handleId: t, nodeId: n, onConnect: o, isTarget: r, getState: a, setState: i, isValidConnection: s, edgeUpdaterType: c, onEdgeUpdateEnd: u }) {
  const l = ff(e.target), { connectionMode: d, domNode: f, autoPanOnConnect: g, connectionRadius: p, onConnectStart: h, panBy: m, getNodes: x, cancelConnection: b } = a();
  let y = 0, w;
  const { x: S, y: k } = Xt(e), M = l == null ? void 0 : l.elementFromPoint(S, k), C = Ps(c, M), T = f == null ? void 0 : f.getBoundingClientRect();
  if (!T || !C)
    return;
  let D, F = Xt(e, T), $ = !1, P = null, E = !1, A = null;
  const _ = T6({
    nodes: x(),
    nodeId: n,
    handleId: t,
    handleType: C
  }), z = () => {
    if (!g)
      return;
    const [O, I] = df(F, T);
    m({ x: O, y: I }), y = requestAnimationFrame(z);
  };
  i({
    connectionPosition: F,
    connectionStatus: null,
    // connectionNodeId etc will be removed in the next major in favor of connectionStartHandle
    connectionNodeId: n,
    connectionHandleId: t,
    connectionHandleType: C,
    connectionStartHandle: {
      nodeId: n,
      handleId: t,
      type: C
    },
    connectionEndHandle: null
  }), h == null || h(e, { nodeId: n, handleId: t, handleType: C });
  function R(O) {
    const { transform: I } = a();
    F = Xt(O, T);
    const { handle: j, validHandleResult: V } = A6(O, l, Zi(F, I, !1, [1, 1]), p, _, (W) => _f(W, d, n, t, r ? "target" : "source", s, l));
    if (w = j, $ || (z(), $ = !0), A = V.handleDomNode, P = V.connection, E = V.isValid, i({
      connectionPosition: w && E ? xf({
        x: w.x,
        y: w.y
      }, I) : F,
      connectionStatus: O6(!!w, E),
      connectionEndHandle: V.endHandle
    }), !w && !E && !A)
      return pi(D);
    P.source !== P.target && A && (pi(D), D = A, A.classList.add("connecting", "react-flow__handle-connecting"), A.classList.toggle("valid", E), A.classList.toggle("react-flow__handle-valid", E));
  }
  function N(O) {
    var I, j;
    (w || A) && P && E && (o == null || o(P)), (j = (I = a()).onConnectEnd) == null || j.call(I, O), c && (u == null || u(O)), pi(D), b(), cancelAnimationFrame(y), $ = !1, E = !1, P = null, A = null, l.removeEventListener("mousemove", R), l.removeEventListener("mouseup", N), l.removeEventListener("touchmove", R), l.removeEventListener("touchend", N);
  }
  l.addEventListener("mousemove", R), l.addEventListener("mouseup", N), l.addEventListener("touchmove", R), l.addEventListener("touchend", N);
}
const su = () => !0, N6 = (e) => ({
  connectionStartHandle: e.connectionStartHandle,
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName
}), D6 = (e, t, n) => (o) => {
  const { connectionStartHandle: r, connectionEndHandle: a, connectionClickStartHandle: i } = o;
  return {
    connecting: (r == null ? void 0 : r.nodeId) === e && (r == null ? void 0 : r.handleId) === t && (r == null ? void 0 : r.type) === n || (a == null ? void 0 : a.nodeId) === e && (a == null ? void 0 : a.handleId) === t && (a == null ? void 0 : a.type) === n,
    clickConnecting: (i == null ? void 0 : i.nodeId) === e && (i == null ? void 0 : i.handleId) === t && (i == null ? void 0 : i.type) === n
  };
}, Af = Ru(({ type: e = "source", position: t = ne.Top, isValidConnection: n, isConnectable: o = !0, isConnectableStart: r = !0, isConnectableEnd: a = !0, id: i, onConnect: s, children: c, className: u, onMouseDown: l, onTouchStart: d, ...f }, g) => {
  var T, D;
  const p = i || null, h = e === "target", m = Le(), x = w6(), { connectOnClick: b, noPanClassName: y } = ke(N6, je), { connecting: w, clickConnecting: S } = ke(D6(x, p, e), je);
  x || (D = (T = m.getState()).onError) == null || D.call(T, "010", gt.error010());
  const k = (F) => {
    const { defaultEdgeOptions: $, onConnect: P, hasDefaultEdges: E } = m.getState(), A = {
      ...$,
      ...F
    };
    if (E) {
      const { edges: _, setEdges: z } = m.getState();
      z(k6(A, _));
    }
    P == null || P(A), s == null || s(A);
  }, M = (F) => {
    if (!x)
      return;
    const $ = hf(F);
    r && ($ && F.button === 0 || !$) && kf({
      event: F,
      handleId: p,
      nodeId: x,
      onConnect: k,
      isTarget: h,
      getState: m.getState,
      setState: m.setState,
      isValidConnection: n || m.getState().isValidConnection || su
    }), $ ? l == null || l(F) : d == null || d(F);
  }, C = (F) => {
    const { onClickConnectStart: $, onClickConnectEnd: P, connectionClickStartHandle: E, connectionMode: A, isValidConnection: _ } = m.getState();
    if (!x || !E && !r)
      return;
    if (!E) {
      $ == null || $(F, { nodeId: x, handleId: p, handleType: e }), m.setState({ connectionClickStartHandle: { nodeId: x, type: e, handleId: p } });
      return;
    }
    const z = ff(F.target), R = n || _ || su, { connection: N, isValid: O } = _f({
      nodeId: x,
      id: p,
      type: e
    }, A, E.nodeId, E.handleId || null, E.type, R, z);
    O && k(N), P == null || P(F), m.setState({ connectionClickStartHandle: null });
  };
  return H.createElement("div", { "data-handleid": p, "data-nodeid": x, "data-handlepos": t, "data-id": `${x}-${p}-${e}`, className: $e([
    "react-flow__handle",
    `react-flow__handle-${t}`,
    "nodrag",
    y,
    u,
    {
      source: !h,
      target: h,
      connectable: o,
      connectablestart: r,
      connectableend: a,
      connecting: S,
      // this class is used to style the handle when the user is connecting
      connectionindicator: o && (r && !w || a && w)
    }
  ]), onMouseDown: M, onTouchStart: M, onClick: b ? C : void 0, ref: g, ...f }, c);
});
Af.displayName = "Handle";
var Kt = Te(Af);
const Mf = ({ data: e, isConnectable: t, targetPosition: n = ne.Top, sourcePosition: o = ne.Bottom }) => H.createElement(
  H.Fragment,
  null,
  H.createElement(Kt, { type: "target", position: n, isConnectable: t }),
  e == null ? void 0 : e.label,
  H.createElement(Kt, { type: "source", position: o, isConnectable: t })
);
Mf.displayName = "DefaultNode";
var Ki = Te(Mf);
const Tf = ({ data: e, isConnectable: t, sourcePosition: n = ne.Bottom }) => H.createElement(
  H.Fragment,
  null,
  e == null ? void 0 : e.label,
  H.createElement(Kt, { type: "source", position: n, isConnectable: t })
);
Tf.displayName = "InputNode";
var Of = Te(Tf);
const Nf = ({ data: e, isConnectable: t, targetPosition: n = ne.Top }) => H.createElement(
  H.Fragment,
  null,
  H.createElement(Kt, { type: "target", position: n, isConnectable: t }),
  e == null ? void 0 : e.label
);
Nf.displayName = "OutputNode";
var Df = Te(Nf);
const Hs = () => null;
Hs.displayName = "GroupNode";
const R6 = (e) => ({
  selectedNodes: e.getNodes().filter((t) => t.selected),
  selectedEdges: e.edges.filter((t) => t.selected).map((t) => ({ ...t }))
}), Go = (e) => e.id;
function z6(e, t) {
  return je(e.selectedNodes.map(Go), t.selectedNodes.map(Go)) && je(e.selectedEdges.map(Go), t.selectedEdges.map(Go));
}
const Rf = Te(({ onSelectionChange: e }) => {
  const t = Le(), { selectedNodes: n, selectedEdges: o } = ke(R6, z6);
  return ie(() => {
    const r = { nodes: n, edges: o };
    e == null || e(r), t.getState().onSelectionChange.forEach((a) => a(r));
  }, [n, o, e]), null;
});
Rf.displayName = "SelectionListener";
const I6 = (e) => !!e.onSelectionChange;
function L6({ onSelectionChange: e }) {
  const t = ke(I6);
  return e || t ? H.createElement(Rf, { onSelectionChange: e }) : null;
}
const F6 = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset
});
function wn(e, t) {
  ie(() => {
    typeof e < "u" && t(e);
  }, [e]);
}
function ue(e, t, n) {
  ie(() => {
    typeof t < "u" && n({ [e]: t });
  }, [t]);
}
const j6 = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, onConnect: r, onConnectStart: a, onConnectEnd: i, onClickConnectStart: s, onClickConnectEnd: c, nodesDraggable: u, nodesConnectable: l, nodesFocusable: d, edgesFocusable: f, edgesUpdatable: g, elevateNodesOnSelect: p, minZoom: h, maxZoom: m, nodeExtent: x, onNodesChange: b, onEdgesChange: y, elementsSelectable: w, connectionMode: S, snapGrid: k, snapToGrid: M, translateExtent: C, connectOnClick: T, defaultEdgeOptions: D, fitView: F, fitViewOptions: $, onNodesDelete: P, onEdgesDelete: E, onNodeDrag: A, onNodeDragStart: _, onNodeDragStop: z, onSelectionDrag: R, onSelectionDragStart: N, onSelectionDragStop: O, noPanClassName: I, nodeOrigin: j, rfId: V, autoPanOnConnect: W, autoPanOnNodeDrag: U, onError: Z, connectionRadius: K, isValidConnection: Q, nodeDragThreshold: te }) => {
  const { setNodes: q, setEdges: se, setDefaultNodesAndEdges: G, setMinZoom: pe, setMaxZoom: Fe, setTranslateExtent: Se, setNodeExtent: Pe, reset: xe } = ke(F6, je), oe = Le();
  return ie(() => {
    const Re = o == null ? void 0 : o.map((At) => ({ ...At, ...D }));
    return G(n, Re), () => {
      xe();
    };
  }, []), ue("defaultEdgeOptions", D, oe.setState), ue("connectionMode", S, oe.setState), ue("onConnect", r, oe.setState), ue("onConnectStart", a, oe.setState), ue("onConnectEnd", i, oe.setState), ue("onClickConnectStart", s, oe.setState), ue("onClickConnectEnd", c, oe.setState), ue("nodesDraggable", u, oe.setState), ue("nodesConnectable", l, oe.setState), ue("nodesFocusable", d, oe.setState), ue("edgesFocusable", f, oe.setState), ue("edgesUpdatable", g, oe.setState), ue("elementsSelectable", w, oe.setState), ue("elevateNodesOnSelect", p, oe.setState), ue("snapToGrid", M, oe.setState), ue("snapGrid", k, oe.setState), ue("onNodesChange", b, oe.setState), ue("onEdgesChange", y, oe.setState), ue("connectOnClick", T, oe.setState), ue("fitViewOnInit", F, oe.setState), ue("fitViewOnInitOptions", $, oe.setState), ue("onNodesDelete", P, oe.setState), ue("onEdgesDelete", E, oe.setState), ue("onNodeDrag", A, oe.setState), ue("onNodeDragStart", _, oe.setState), ue("onNodeDragStop", z, oe.setState), ue("onSelectionDrag", R, oe.setState), ue("onSelectionDragStart", N, oe.setState), ue("onSelectionDragStop", O, oe.setState), ue("noPanClassName", I, oe.setState), ue("nodeOrigin", j, oe.setState), ue("rfId", V, oe.setState), ue("autoPanOnConnect", W, oe.setState), ue("autoPanOnNodeDrag", U, oe.setState), ue("onError", Z, oe.setState), ue("connectionRadius", K, oe.setState), ue("isValidConnection", Q, oe.setState), ue("nodeDragThreshold", te, oe.setState), wn(e, q), wn(t, se), wn(h, pe), wn(m, Fe), wn(C, Se), wn(x, Pe), null;
}, lu = { display: "none" }, P6 = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, zf = "react-flow__node-desc", If = "react-flow__edge-desc", H6 = "react-flow__aria-live", B6 = (e) => e.ariaLiveMessage;
function $6({ rfId: e }) {
  const t = ke(B6);
  return H.createElement("div", { id: `${H6}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: P6 }, t);
}
function W6({ rfId: e, disableKeyboardA11y: t }) {
  return H.createElement(
    H.Fragment,
    null,
    H.createElement(
      "div",
      { id: `${zf}-${e}`, style: lu },
      "Press enter or space to select a node.",
      !t && "You can then use the arrow keys to move the node around.",
      " Press delete to remove it and escape to cancel.",
      " "
    ),
    H.createElement("div", { id: `${If}-${e}`, style: lu }, "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel."),
    !t && H.createElement($6, { rfId: e })
  );
}
var yo = (e = null, t = { actInsideInputWithModifier: !0 }) => {
  const [n, o] = fe(!1), r = ae(!1), a = ae(/* @__PURE__ */ new Set([])), [i, s] = Ee(() => {
    if (e !== null) {
      const u = (Array.isArray(e) ? e : [e]).filter((d) => typeof d == "string").map((d) => d.split("+")), l = u.reduce((d, f) => d.concat(...f), []);
      return [u, l];
    }
    return [[], []];
  }, [e]);
  return ie(() => {
    const c = typeof document < "u" ? document : null, u = (t == null ? void 0 : t.target) || c;
    if (e !== null) {
      const l = (g) => {
        if (r.current = g.ctrlKey || g.metaKey || g.shiftKey, (!r.current || r.current && !t.actInsideInputWithModifier) && qi(g))
          return !1;
        const h = uu(g.code, s);
        a.current.add(g[h]), cu(i, a.current, !1) && (g.preventDefault(), o(!0));
      }, d = (g) => {
        if ((!r.current || r.current && !t.actInsideInputWithModifier) && qi(g))
          return !1;
        const h = uu(g.code, s);
        cu(i, a.current, !0) ? (o(!1), a.current.clear()) : a.current.delete(g[h]), g.key === "Meta" && a.current.clear(), r.current = !1;
      }, f = () => {
        a.current.clear(), o(!1);
      };
      return u == null || u.addEventListener("keydown", l), u == null || u.addEventListener("keyup", d), window.addEventListener("blur", f), () => {
        u == null || u.removeEventListener("keydown", l), u == null || u.removeEventListener("keyup", d), window.removeEventListener("blur", f);
      };
    }
  }, [e, o]), n;
};
function cu(e, t, n) {
  return e.filter((o) => n || o.length === t.size).some((o) => o.every((r) => t.has(r)));
}
function uu(e, t) {
  return t.includes(e) ? "code" : "key";
}
function Lf(e, t, n, o) {
  var s, c;
  const r = e.parentNode || e.parentId;
  if (!r)
    return n;
  const a = t.get(r), i = On(a, o);
  return Lf(a, t, {
    x: (n.x ?? 0) + i.x,
    y: (n.y ?? 0) + i.y,
    z: (((s = a[Me]) == null ? void 0 : s.z) ?? 0) > (n.z ?? 0) ? ((c = a[Me]) == null ? void 0 : c.z) ?? 0 : n.z ?? 0
  }, o);
}
function Ff(e, t, n) {
  e.forEach((o) => {
    var a;
    const r = o.parentNode || o.parentId;
    if (r && !e.has(r))
      throw new Error(`Parent node ${r} not found`);
    if (r || n != null && n[o.id]) {
      const { x: i, y: s, z: c } = Lf(o, e, {
        ...o.position,
        z: ((a = o[Me]) == null ? void 0 : a.z) ?? 0
      }, t);
      o.positionAbsolute = {
        x: i,
        y: s
      }, o[Me].z = c, n != null && n[o.id] && (o[Me].isParent = !0);
    }
  });
}
function hi(e, t, n, o) {
  const r = /* @__PURE__ */ new Map(), a = {}, i = o ? 1e3 : 0;
  return e.forEach((s) => {
    var g;
    const c = (nt(s.zIndex) ? s.zIndex : 0) + (s.selected ? i : 0), u = t.get(s.id), l = {
      ...s,
      positionAbsolute: {
        x: s.position.x,
        y: s.position.y
      }
    }, d = s.parentNode || s.parentId;
    d && (a[d] = !0);
    const f = (u == null ? void 0 : u.type) && (u == null ? void 0 : u.type) !== s.type;
    Object.defineProperty(l, Me, {
      enumerable: !1,
      value: {
        handleBounds: f || (g = u == null ? void 0 : u[Me]) == null ? void 0 : g.handleBounds,
        z: c
      }
    }), r.set(s.id, l);
  }), Ff(r, n, a), r;
}
function jf(e, t = {}) {
  const { getNodes: n, width: o, height: r, minZoom: a, maxZoom: i, d3Zoom: s, d3Selection: c, fitViewOnInitDone: u, fitViewOnInit: l, nodeOrigin: d } = e(), f = t.initial && !u && l;
  if (s && c && (f || !t.initial)) {
    const p = n().filter((m) => {
      var b;
      const x = t.includeHiddenNodes ? m.width && m.height : !m.hidden;
      return (b = t.nodes) != null && b.length ? x && t.nodes.some((y) => y.id === m.id) : x;
    }), h = p.every((m) => m.width && m.height);
    if (p.length > 0 && h) {
      const m = js(p, d), { x, y: b, zoom: y } = Cf(m, o, r, t.minZoom ?? a, t.maxZoom ?? i, t.padding ?? 0.1), w = Gt.translate(x, b).scale(y);
      return typeof t.duration == "number" && t.duration > 0 ? s.transform(an(c, t.duration), w) : s.transform(c, w), !0;
    }
  }
  return !1;
}
function V6(e, t) {
  return e.forEach((n) => {
    const o = t.get(n.id);
    o && t.set(o.id, {
      ...o,
      [Me]: o[Me],
      selected: n.selected
    });
  }), new Map(t);
}
function q6(e, t) {
  return t.map((n) => {
    const o = e.find((r) => r.id === n.id);
    return o && (n.selected = o.selected), n;
  });
}
function Xo({ changedNodes: e, changedEdges: t, get: n, set: o }) {
  const { nodeInternals: r, edges: a, onNodesChange: i, onEdgesChange: s, hasDefaultNodes: c, hasDefaultEdges: u } = n();
  e != null && e.length && (c && o({ nodeInternals: V6(e, r) }), i == null || i(e)), t != null && t.length && (u && o({ edges: q6(t, a) }), s == null || s(t));
}
const Sn = () => {
}, U6 = {
  zoomIn: Sn,
  zoomOut: Sn,
  zoomTo: Sn,
  getZoom: () => 1,
  setViewport: Sn,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  fitView: () => !1,
  setCenter: Sn,
  fitBounds: Sn,
  project: (e) => e,
  screenToFlowPosition: (e) => e,
  flowToScreenPosition: (e) => e,
  viewportInitialized: !1
}, Y6 = (e) => ({
  d3Zoom: e.d3Zoom,
  d3Selection: e.d3Selection
}), Z6 = () => {
  const e = Le(), { d3Zoom: t, d3Selection: n } = ke(Y6, je);
  return Ee(() => n && t ? {
    zoomIn: (r) => t.scaleBy(an(n, r == null ? void 0 : r.duration), 1.2),
    zoomOut: (r) => t.scaleBy(an(n, r == null ? void 0 : r.duration), 1 / 1.2),
    zoomTo: (r, a) => t.scaleTo(an(n, a == null ? void 0 : a.duration), r),
    getZoom: () => e.getState().transform[2],
    setViewport: (r, a) => {
      const [i, s, c] = e.getState().transform, u = Gt.translate(r.x ?? i, r.y ?? s).scale(r.zoom ?? c);
      t.transform(an(n, a == null ? void 0 : a.duration), u);
    },
    getViewport: () => {
      const [r, a, i] = e.getState().transform;
      return { x: r, y: a, zoom: i };
    },
    fitView: (r) => jf(e.getState, r),
    setCenter: (r, a, i) => {
      const { width: s, height: c, maxZoom: u } = e.getState(), l = typeof (i == null ? void 0 : i.zoom) < "u" ? i.zoom : u, d = s / 2 - r * l, f = c / 2 - a * l, g = Gt.translate(d, f).scale(l);
      t.transform(an(n, i == null ? void 0 : i.duration), g);
    },
    fitBounds: (r, a) => {
      const { width: i, height: s, minZoom: c, maxZoom: u } = e.getState(), { x: l, y: d, zoom: f } = Cf(r, i, s, c, u, (a == null ? void 0 : a.padding) ?? 0.1), g = Gt.translate(l, d).scale(f);
      t.transform(an(n, a == null ? void 0 : a.duration), g);
    },
    // @deprecated Use `screenToFlowPosition`.
    project: (r) => {
      const { transform: a, snapToGrid: i, snapGrid: s } = e.getState();
      return console.warn("[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position"), Zi(r, a, i, s);
    },
    screenToFlowPosition: (r) => {
      const { transform: a, snapToGrid: i, snapGrid: s, domNode: c } = e.getState();
      if (!c)
        return r;
      const { x: u, y: l } = c.getBoundingClientRect(), d = {
        x: r.x - u,
        y: r.y - l
      };
      return Zi(d, a, i, s);
    },
    flowToScreenPosition: (r) => {
      const { transform: a, domNode: i } = e.getState();
      if (!i)
        return r;
      const { x: s, y: c } = i.getBoundingClientRect(), u = xf(r, a);
      return {
        x: u.x + s,
        y: u.y + c
      };
    },
    viewportInitialized: !0
  } : U6, [t, n]);
};
function mt() {
  const e = Z6(), t = Le(), n = me(() => t.getState().getNodes().map((h) => ({ ...h })), []), o = me((h) => t.getState().nodeInternals.get(h), []), r = me(() => {
    const { edges: h = [] } = t.getState();
    return h.map((m) => ({ ...m }));
  }, []), a = me((h) => {
    const { edges: m = [] } = t.getState();
    return m.find((x) => x.id === h);
  }, []), i = me((h) => {
    const { getNodes: m, setNodes: x, hasDefaultNodes: b, onNodesChange: y } = t.getState(), w = m(), S = typeof h == "function" ? h(w) : h;
    if (b)
      x(S);
    else if (y) {
      const k = S.length === 0 ? w.map((M) => ({ type: "remove", id: M.id })) : S.map((M) => ({ item: M, type: "reset" }));
      y(k);
    }
  }, []), s = me((h) => {
    const { edges: m = [], setEdges: x, hasDefaultEdges: b, onEdgesChange: y } = t.getState(), w = typeof h == "function" ? h(m) : h;
    if (b)
      x(w);
    else if (y) {
      const S = w.length === 0 ? m.map((k) => ({ type: "remove", id: k.id })) : w.map((k) => ({ item: k, type: "reset" }));
      y(S);
    }
  }, []), c = me((h) => {
    const m = Array.isArray(h) ? h : [h], { getNodes: x, setNodes: b, hasDefaultNodes: y, onNodesChange: w } = t.getState();
    if (y) {
      const k = [...x(), ...m];
      b(k);
    } else if (w) {
      const S = m.map((k) => ({ item: k, type: "add" }));
      w(S);
    }
  }, []), u = me((h) => {
    const m = Array.isArray(h) ? h : [h], { edges: x = [], setEdges: b, hasDefaultEdges: y, onEdgesChange: w } = t.getState();
    if (y)
      b([...x, ...m]);
    else if (w) {
      const S = m.map((k) => ({ item: k, type: "add" }));
      w(S);
    }
  }, []), l = me(() => {
    const { getNodes: h, edges: m = [], transform: x } = t.getState(), [b, y, w] = x;
    return {
      nodes: h().map((S) => ({ ...S })),
      edges: m.map((S) => ({ ...S })),
      viewport: {
        x: b,
        y,
        zoom: w
      }
    };
  }, []), d = me(({ nodes: h, edges: m }) => {
    const { nodeInternals: x, getNodes: b, edges: y, hasDefaultNodes: w, hasDefaultEdges: S, onNodesDelete: k, onEdgesDelete: M, onNodesChange: C, onEdgesChange: T } = t.getState(), D = (h || []).map((A) => A.id), F = (m || []).map((A) => A.id), $ = b().reduce((A, _) => {
      const z = _.parentNode || _.parentId, R = !D.includes(_.id) && z && A.find((O) => O.id === z);
      return (typeof _.deletable == "boolean" ? _.deletable : !0) && (D.includes(_.id) || R) && A.push(_), A;
    }, []), P = y.filter((A) => typeof A.deletable == "boolean" ? A.deletable : !0), E = P.filter((A) => F.includes(A.id));
    if ($ || E) {
      const A = Sf($, P), _ = [...E, ...A], z = _.reduce((R, N) => (R.includes(N.id) || R.push(N.id), R), []);
      if ((S || w) && (S && t.setState({
        edges: y.filter((R) => !z.includes(R.id))
      }), w && ($.forEach((R) => {
        x.delete(R.id);
      }), t.setState({
        nodeInternals: new Map(x)
      }))), z.length > 0 && (M == null || M(_), T && T(z.map((R) => ({
        id: R,
        type: "remove"
      })))), $.length > 0 && (k == null || k($), C)) {
        const R = $.map((N) => ({ id: N.id, type: "remove" }));
        C(R);
      }
    }
  }, []), f = me((h) => {
    const m = p6(h), x = m ? null : t.getState().nodeInternals.get(h.id);
    return !m && !x ? [null, null, m] : [m ? h : tu(x), x, m];
  }, []), g = me((h, m = !0, x) => {
    const [b, y, w] = f(h);
    return b ? (x || t.getState().getNodes()).filter((S) => {
      if (!w && (S.id === y.id || !S.positionAbsolute))
        return !1;
      const k = tu(S), M = Vi(k, b);
      return m && M > 0 || M >= b.width * b.height;
    }) : [];
  }, []), p = me((h, m, x = !0) => {
    const [b] = f(h);
    if (!b)
      return !1;
    const y = Vi(b, m);
    return x && y > 0 || y >= b.width * b.height;
  }, []);
  return Ee(() => ({
    ...e,
    getNodes: n,
    getNode: o,
    getEdges: r,
    getEdge: a,
    setNodes: i,
    setEdges: s,
    addNodes: c,
    addEdges: u,
    toObject: l,
    deleteElements: d,
    getIntersectingNodes: g,
    isNodeIntersecting: p
  }), [
    e,
    n,
    o,
    r,
    a,
    i,
    s,
    c,
    u,
    l,
    d,
    g,
    p
  ]);
}
const K6 = { actInsideInputWithModifier: !1 };
var G6 = ({ deleteKeyCode: e, multiSelectionKeyCode: t }) => {
  const n = Le(), { deleteElements: o } = mt(), r = yo(e, K6), a = yo(t);
  ie(() => {
    if (r) {
      const { edges: i, getNodes: s } = n.getState(), c = s().filter((l) => l.selected), u = i.filter((l) => l.selected);
      o({ nodes: c, edges: u }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [r]), ie(() => {
    n.setState({ multiSelectionActive: a });
  }, [a]);
};
function X6(e) {
  const t = Le();
  ie(() => {
    let n;
    const o = () => {
      var a, i;
      if (!e.current)
        return;
      const r = Ns(e.current);
      (r.height === 0 || r.width === 0) && ((i = (a = t.getState()).onError) == null || i.call(a, "004", gt.error004())), t.setState({ width: r.width || 500, height: r.height || 500 });
    };
    return o(), window.addEventListener("resize", o), e.current && (n = new ResizeObserver(() => o()), n.observe(e.current)), () => {
      window.removeEventListener("resize", o), n && e.current && n.unobserve(e.current);
    };
  }, []);
}
const Bs = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, Q6 = (e, t) => e.x !== t.x || e.y !== t.y || e.zoom !== t.k, Qo = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), Cn = (e, t) => e.target.closest(`.${t}`), du = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), fu = (e) => {
  const t = e.ctrlKey && Ar() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
}, J6 = (e) => ({
  d3Zoom: e.d3Zoom,
  d3Selection: e.d3Selection,
  d3ZoomHandler: e.d3ZoomHandler,
  userSelectionActive: e.userSelectionActive
}), e4 = ({ onMove: e, onMoveStart: t, onMoveEnd: n, onPaneContextMenu: o, zoomOnScroll: r = !0, zoomOnPinch: a = !0, panOnScroll: i = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: c = un.Free, zoomOnDoubleClick: u = !0, elementsSelectable: l, panOnDrag: d = !0, defaultViewport: f, translateExtent: g, minZoom: p, maxZoom: h, zoomActivationKeyCode: m, preventScrolling: x = !0, children: b, noWheelClassName: y, noPanClassName: w }) => {
  const S = ae(), k = Le(), M = ae(!1), C = ae(!1), T = ae(null), D = ae({ x: 0, y: 0, zoom: 0 }), { d3Zoom: F, d3Selection: $, d3ZoomHandler: P, userSelectionActive: E } = ke(J6, je), A = yo(m), _ = ae(0), z = ae(!1), R = ae();
  return X6(T), ie(() => {
    if (T.current) {
      const N = T.current.getBoundingClientRect(), O = i6().scaleExtent([p, h]).translateExtent(g), I = ut(T.current).call(O), j = Gt.translate(f.x, f.y).scale(Pn(f.zoom, p, h)), V = [
        [0, 0],
        [N.width, N.height]
      ], W = O.constrain()(j, V, g);
      O.transform(I, W), O.wheelDelta(fu), k.setState({
        d3Zoom: O,
        d3Selection: I,
        d3ZoomHandler: I.on("wheel.zoom"),
        // we need to pass transform because zoom handler is not registered when we set the initial transform
        transform: [W.x, W.y, W.k],
        domNode: T.current.closest(".react-flow")
      });
    }
  }, []), ie(() => {
    $ && F && (i && !A && !E ? $.on("wheel.zoom", (N) => {
      if (Cn(N, y))
        return !1;
      N.preventDefault(), N.stopImmediatePropagation();
      const O = $.property("__zoom").k || 1;
      if (N.ctrlKey && a) {
        const Q = St(N), te = fu(N), q = O * Math.pow(2, te);
        F.scaleTo($, q, Q, N);
        return;
      }
      const I = N.deltaMode === 1 ? 20 : 1;
      let j = c === un.Vertical ? 0 : N.deltaX * I, V = c === un.Horizontal ? 0 : N.deltaY * I;
      !Ar() && N.shiftKey && c !== un.Vertical && (j = N.deltaY * I, V = 0), F.translateBy(
        $,
        -(j / O) * s,
        -(V / O) * s,
        // @ts-ignore
        { internal: !0 }
      );
      const W = Qo($.property("__zoom")), { onViewportChangeStart: U, onViewportChange: Z, onViewportChangeEnd: K } = k.getState();
      clearTimeout(R.current), z.current || (z.current = !0, t == null || t(N, W), U == null || U(W)), z.current && (e == null || e(N, W), Z == null || Z(W), R.current = setTimeout(() => {
        n == null || n(N, W), K == null || K(W), z.current = !1;
      }, 150));
    }, { passive: !1 }) : typeof P < "u" && $.on("wheel.zoom", function(N, O) {
      if (!x && N.type === "wheel" && !N.ctrlKey || Cn(N, y))
        return null;
      N.preventDefault(), P.call(this, N, O);
    }, { passive: !1 }));
  }, [
    E,
    i,
    c,
    $,
    F,
    P,
    A,
    a,
    x,
    y,
    t,
    e,
    n
  ]), ie(() => {
    F && F.on("start", (N) => {
      var j, V;
      if (!N.sourceEvent || N.sourceEvent.internal)
        return null;
      _.current = (j = N.sourceEvent) == null ? void 0 : j.button;
      const { onViewportChangeStart: O } = k.getState(), I = Qo(N.transform);
      M.current = !0, D.current = I, ((V = N.sourceEvent) == null ? void 0 : V.type) === "mousedown" && k.setState({ paneDragging: !0 }), O == null || O(I), t == null || t(N.sourceEvent, I);
    });
  }, [F, t]), ie(() => {
    F && (E && !M.current ? F.on("zoom", null) : E || F.on("zoom", (N) => {
      var I;
      const { onViewportChange: O } = k.getState();
      if (k.setState({ transform: [N.transform.x, N.transform.y, N.transform.k] }), C.current = !!(o && du(d, _.current ?? 0)), (e || O) && !((I = N.sourceEvent) != null && I.internal)) {
        const j = Qo(N.transform);
        O == null || O(j), e == null || e(N.sourceEvent, j);
      }
    }));
  }, [E, F, e, d, o]), ie(() => {
    F && F.on("end", (N) => {
      if (!N.sourceEvent || N.sourceEvent.internal)
        return null;
      const { onViewportChangeEnd: O } = k.getState();
      if (M.current = !1, k.setState({ paneDragging: !1 }), o && du(d, _.current ?? 0) && !C.current && o(N.sourceEvent), C.current = !1, (n || O) && Q6(D.current, N.transform)) {
        const I = Qo(N.transform);
        D.current = I, clearTimeout(S.current), S.current = setTimeout(() => {
          O == null || O(I), n == null || n(N.sourceEvent, I);
        }, i ? 150 : 0);
      }
    });
  }, [F, i, d, n, o]), ie(() => {
    F && F.filter((N) => {
      const O = A || r, I = a && N.ctrlKey;
      if ((d === !0 || Array.isArray(d) && d.includes(1)) && N.button === 1 && N.type === "mousedown" && (Cn(N, "react-flow__node") || Cn(N, "react-flow__edge")))
        return !0;
      if (!d && !O && !i && !u && !a || E || !u && N.type === "dblclick" || Cn(N, y) && N.type === "wheel" || Cn(N, w) && (N.type !== "wheel" || i && N.type === "wheel" && !A) || !a && N.ctrlKey && N.type === "wheel" || !O && !i && !I && N.type === "wheel" || !d && (N.type === "mousedown" || N.type === "touchstart") || Array.isArray(d) && !d.includes(N.button) && N.type === "mousedown")
        return !1;
      const j = Array.isArray(d) && d.includes(N.button) || !N.button || N.button <= 1;
      return (!N.ctrlKey || N.type === "wheel") && j;
    });
  }, [
    E,
    F,
    r,
    a,
    i,
    u,
    d,
    l,
    A
  ]), H.createElement("div", { className: "react-flow__renderer", ref: T, style: Bs }, b);
}, t4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function n4() {
  const { userSelectionActive: e, userSelectionRect: t } = ke(t4, je);
  return e && t ? H.createElement("div", { className: "react-flow__selection react-flow__container", style: {
    width: t.width,
    height: t.height,
    transform: `translate(${t.x}px, ${t.y}px)`
  } }) : null;
}
function gu(e, t) {
  const n = t.parentNode || t.parentId, o = e.find((r) => r.id === n);
  if (o) {
    const r = t.position.x + t.width - o.width, a = t.position.y + t.height - o.height;
    if (r > 0 || a > 0 || t.position.x < 0 || t.position.y < 0) {
      if (o.style = { ...o.style }, o.style.width = o.style.width ?? o.width, o.style.height = o.style.height ?? o.height, r > 0 && (o.style.width += r), a > 0 && (o.style.height += a), t.position.x < 0) {
        const i = Math.abs(t.position.x);
        o.position.x = o.position.x - i, o.style.width += i, t.position.x = 0;
      }
      if (t.position.y < 0) {
        const i = Math.abs(t.position.y);
        o.position.y = o.position.y - i, o.style.height += i, t.position.y = 0;
      }
      o.width = o.style.width, o.height = o.style.height;
    }
  }
}
function o4(e, t) {
  if (e.some((o) => o.type === "reset"))
    return e.filter((o) => o.type === "reset").map((o) => o.item);
  const n = e.filter((o) => o.type === "add").map((o) => o.item);
  return t.reduce((o, r) => {
    const a = e.filter((s) => s.id === r.id);
    if (a.length === 0)
      return o.push(r), o;
    const i = { ...r };
    for (const s of a)
      if (s)
        switch (s.type) {
          case "select": {
            i.selected = s.selected;
            break;
          }
          case "position": {
            typeof s.position < "u" && (i.position = s.position), typeof s.positionAbsolute < "u" && (i.positionAbsolute = s.positionAbsolute), typeof s.dragging < "u" && (i.dragging = s.dragging), i.expandParent && gu(o, i);
            break;
          }
          case "dimensions": {
            typeof s.dimensions < "u" && (i.width = s.dimensions.width, i.height = s.dimensions.height), typeof s.updateStyle < "u" && (i.style = { ...i.style || {}, ...s.dimensions }), typeof s.resizing == "boolean" && (i.resizing = s.resizing), i.expandParent && gu(o, i);
            break;
          }
          case "remove":
            return o;
        }
    return o.push(i), o;
  }, n);
}
function r4(e, t) {
  return o4(e, t);
}
const Yt = (e, t) => ({
  id: e,
  type: "select",
  selected: t
});
function _n(e, t) {
  return e.reduce((n, o) => {
    const r = t.includes(o.id);
    return !o.selected && r ? (o.selected = !0, n.push(Yt(o.id, !0))) : o.selected && !r && (o.selected = !1, n.push(Yt(o.id, !1))), n;
  }, []);
}
const mi = (e, t) => (n) => {
  n.target === t.current && (e == null || e(n));
}, a4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  dragging: e.paneDragging
}), Pf = Te(({ isSelecting: e, selectionMode: t = bo.Full, panOnDrag: n, onSelectionStart: o, onSelectionEnd: r, onPaneClick: a, onPaneContextMenu: i, onPaneScroll: s, onPaneMouseEnter: c, onPaneMouseMove: u, onPaneMouseLeave: l, children: d }) => {
  const f = ae(null), g = Le(), p = ae(0), h = ae(0), m = ae(), { userSelectionActive: x, elementsSelectable: b, dragging: y } = ke(a4, je), w = () => {
    g.setState({ userSelectionActive: !1, userSelectionRect: null }), p.current = 0, h.current = 0;
  }, S = (P) => {
    a == null || a(P), g.getState().resetSelectedElements(), g.setState({ nodesSelectionActive: !1 });
  }, k = (P) => {
    if (Array.isArray(n) && (n != null && n.includes(2))) {
      P.preventDefault();
      return;
    }
    i == null || i(P);
  }, M = s ? (P) => s(P) : void 0, C = (P) => {
    const { resetSelectedElements: E, domNode: A } = g.getState();
    if (m.current = A == null ? void 0 : A.getBoundingClientRect(), !b || !e || P.button !== 0 || P.target !== f.current || !m.current)
      return;
    const { x: _, y: z } = Xt(P, m.current);
    E(), g.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: _,
        startY: z,
        x: _,
        y: z
      }
    }), o == null || o(P);
  }, T = (P) => {
    const { userSelectionRect: E, nodeInternals: A, edges: _, transform: z, onNodesChange: R, onEdgesChange: N, nodeOrigin: O, getNodes: I } = g.getState();
    if (!e || !m.current || !E)
      return;
    g.setState({ userSelectionActive: !0, nodesSelectionActive: !1 });
    const j = Xt(P, m.current), V = E.startX ?? 0, W = E.startY ?? 0, U = {
      ...E,
      x: j.x < V ? j.x : V,
      y: j.y < W ? j.y : W,
      width: Math.abs(j.x - V),
      height: Math.abs(j.y - W)
    }, Z = I(), K = wf(A, U, z, t === bo.Partial, !0, O), Q = Sf(K, _).map((q) => q.id), te = K.map((q) => q.id);
    if (p.current !== te.length) {
      p.current = te.length;
      const q = _n(Z, te);
      q.length && (R == null || R(q));
    }
    if (h.current !== Q.length) {
      h.current = Q.length;
      const q = _n(_, Q);
      q.length && (N == null || N(q));
    }
    g.setState({
      userSelectionRect: U
    });
  }, D = (P) => {
    if (P.button !== 0)
      return;
    const { userSelectionRect: E } = g.getState();
    !x && E && P.target === f.current && (S == null || S(P)), g.setState({ nodesSelectionActive: p.current > 0 }), w(), r == null || r(P);
  }, F = (P) => {
    x && (g.setState({ nodesSelectionActive: p.current > 0 }), r == null || r(P)), w();
  }, $ = b && (e || x);
  return H.createElement(
    "div",
    { className: $e(["react-flow__pane", { dragging: y, selection: e }]), onClick: $ ? void 0 : mi(S, f), onContextMenu: mi(k, f), onWheel: mi(M, f), onMouseEnter: $ ? void 0 : c, onMouseDown: $ ? C : void 0, onMouseMove: $ ? T : u, onMouseUp: $ ? D : void 0, onMouseLeave: $ ? F : l, ref: f, style: Bs },
    d,
    H.createElement(n4, null)
  );
});
Pf.displayName = "Pane";
function Hf(e, t) {
  const n = e.parentNode || e.parentId;
  if (!n)
    return !1;
  const o = t.get(n);
  return o ? o.selected ? !0 : Hf(o, t) : !1;
}
function pu(e, t, n) {
  let o = e;
  do {
    if (o != null && o.matches(t))
      return !0;
    if (o === n.current)
      return !1;
    o = o.parentElement;
  } while (o);
  return !1;
}
function i4(e, t, n, o) {
  return Array.from(e.values()).filter((r) => (r.selected || r.id === o) && (!r.parentNode || r.parentId || !Hf(r, e)) && (r.draggable || t && typeof r.draggable > "u")).map((r) => {
    var a, i;
    return {
      id: r.id,
      position: r.position || { x: 0, y: 0 },
      positionAbsolute: r.positionAbsolute || { x: 0, y: 0 },
      distance: {
        x: n.x - (((a = r.positionAbsolute) == null ? void 0 : a.x) ?? 0),
        y: n.y - (((i = r.positionAbsolute) == null ? void 0 : i.y) ?? 0)
      },
      delta: {
        x: 0,
        y: 0
      },
      extent: r.extent,
      parentNode: r.parentNode || r.parentId,
      parentId: r.parentNode || r.parentId,
      width: r.width,
      height: r.height,
      expandParent: r.expandParent
    };
  });
}
function s4(e, t) {
  return !t || t === "parent" ? t : [t[0], [t[1][0] - (e.width || 0), t[1][1] - (e.height || 0)]];
}
function Bf(e, t, n, o, r = [0, 0], a) {
  const i = s4(e, e.extent || o);
  let s = i;
  const c = e.parentNode || e.parentId;
  if (e.extent === "parent" && !e.expandParent)
    if (c && e.width && e.height) {
      const d = n.get(c), { x: f, y: g } = On(d, r).positionAbsolute;
      s = d && nt(f) && nt(g) && nt(d.width) && nt(d.height) ? [
        [f + e.width * r[0], g + e.height * r[1]],
        [
          f + d.width - e.width + e.width * r[0],
          g + d.height - e.height + e.height * r[1]
        ]
      ] : s;
    } else
      a == null || a("005", gt.error005()), s = i;
  else if (e.extent && c && e.extent !== "parent") {
    const d = n.get(c), { x: f, y: g } = On(d, r).positionAbsolute;
    s = [
      [e.extent[0][0] + f, e.extent[0][1] + g],
      [e.extent[1][0] + f, e.extent[1][1] + g]
    ];
  }
  let u = { x: 0, y: 0 };
  if (c) {
    const d = n.get(c);
    u = On(d, r).positionAbsolute;
  }
  const l = s && s !== "parent" ? Ds(t, s) : t;
  return {
    position: {
      x: l.x - u.x,
      y: l.y - u.y
    },
    positionAbsolute: l
  };
}
function bi({ nodeId: e, dragItems: t, nodeInternals: n }) {
  const o = t.map((r) => ({
    ...n.get(r.id),
    position: r.position,
    positionAbsolute: r.positionAbsolute
  }));
  return [e ? o.find((r) => r.id === e) : o[0], o];
}
const hu = (e, t, n, o) => {
  const r = t.querySelectorAll(e);
  if (!r || !r.length)
    return null;
  const a = Array.from(r), i = t.getBoundingClientRect(), s = {
    x: i.width * o[0],
    y: i.height * o[1]
  };
  return a.map((c) => {
    const u = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      position: c.getAttribute("data-handlepos"),
      x: (u.left - i.left - s.x) / n,
      y: (u.top - i.top - s.y) / n,
      ...Ns(c)
    };
  });
};
function Xn(e, t, n) {
  return n === void 0 ? n : (o) => {
    const r = t().nodeInternals.get(e);
    r && n(o, { ...r });
  };
}
function Gi({ id: e, store: t, unselect: n = !1, nodeRef: o }) {
  const { addSelectedNodes: r, unselectNodesAndEdges: a, multiSelectionActive: i, nodeInternals: s, onError: c } = t.getState(), u = s.get(e);
  if (!u) {
    c == null || c("012", gt.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }), u.selected ? (n || u.selected && i) && (a({ nodes: [u], edges: [] }), requestAnimationFrame(() => {
    var l;
    return (l = o == null ? void 0 : o.current) == null ? void 0 : l.blur();
  })) : r([e]);
}
function l4() {
  const e = Le();
  return me(({ sourceEvent: n }) => {
    const { transform: o, snapGrid: r, snapToGrid: a } = e.getState(), i = n.touches ? n.touches[0].clientX : n.clientX, s = n.touches ? n.touches[0].clientY : n.clientY, c = {
      x: (i - o[0]) / o[2],
      y: (s - o[1]) / o[2]
    };
    return {
      xSnapped: a ? r[0] * Math.round(c.x / r[0]) : c.x,
      ySnapped: a ? r[1] * Math.round(c.y / r[1]) : c.y,
      ...c
    };
  }, []);
}
function yi(e) {
  return (t, n, o) => e == null ? void 0 : e(t, o);
}
function $f({ nodeRef: e, disabled: t = !1, noDragClassName: n, handleSelector: o, nodeId: r, isSelectable: a, selectNodesOnDrag: i }) {
  const s = Le(), [c, u] = fe(!1), l = ae([]), d = ae({ x: null, y: null }), f = ae(0), g = ae(null), p = ae({ x: 0, y: 0 }), h = ae(null), m = ae(!1), x = ae(!1), b = l4();
  return ie(() => {
    if (e != null && e.current) {
      const y = ut(e.current), w = ({ x: M, y: C }) => {
        const { nodeInternals: T, onNodeDrag: D, onSelectionDrag: F, updateNodePositions: $, nodeExtent: P, snapGrid: E, snapToGrid: A, nodeOrigin: _, onError: z } = s.getState();
        d.current = { x: M, y: C };
        let R = !1, N = { x: 0, y: 0, x2: 0, y2: 0 };
        if (l.current.length > 1 && P) {
          const I = js(l.current, _);
          N = Rs(I);
        }
        if (l.current = l.current.map((I) => {
          const j = { x: M - I.distance.x, y: C - I.distance.y };
          A && (j.x = E[0] * Math.round(j.x / E[0]), j.y = E[1] * Math.round(j.y / E[1]));
          const V = [
            [P[0][0], P[0][1]],
            [P[1][0], P[1][1]]
          ];
          l.current.length > 1 && P && !I.extent && (V[0][0] = I.positionAbsolute.x - N.x + P[0][0], V[1][0] = I.positionAbsolute.x + (I.width ?? 0) - N.x2 + P[1][0], V[0][1] = I.positionAbsolute.y - N.y + P[0][1], V[1][1] = I.positionAbsolute.y + (I.height ?? 0) - N.y2 + P[1][1]);
          const W = Bf(I, j, T, V, _, z);
          return R = R || I.position.x !== W.position.x || I.position.y !== W.position.y, I.position = W.position, I.positionAbsolute = W.positionAbsolute, I;
        }), !R)
          return;
        $(l.current, !0, !0), u(!0);
        const O = r ? D : yi(F);
        if (O && h.current) {
          const [I, j] = bi({
            nodeId: r,
            dragItems: l.current,
            nodeInternals: T
          });
          O(h.current, I, j);
        }
      }, S = () => {
        if (!g.current)
          return;
        const [M, C] = df(p.current, g.current);
        if (M !== 0 || C !== 0) {
          const { transform: T, panBy: D } = s.getState();
          d.current.x = (d.current.x ?? 0) - M / T[2], d.current.y = (d.current.y ?? 0) - C / T[2], D({ x: M, y: C }) && w(d.current);
        }
        f.current = requestAnimationFrame(S);
      }, k = (M) => {
        var _;
        const { nodeInternals: C, multiSelectionActive: T, nodesDraggable: D, unselectNodesAndEdges: F, onNodeDragStart: $, onSelectionDragStart: P } = s.getState();
        x.current = !0;
        const E = r ? $ : yi(P);
        (!i || !a) && !T && r && ((_ = C.get(r)) != null && _.selected || F()), r && a && i && Gi({
          id: r,
          store: s,
          nodeRef: e
        });
        const A = b(M);
        if (d.current = A, l.current = i4(C, D, A, r), E && l.current) {
          const [z, R] = bi({
            nodeId: r,
            dragItems: l.current,
            nodeInternals: C
          });
          E(M.sourceEvent, z, R);
        }
      };
      if (t)
        y.on(".drag", null);
      else {
        const M = mb().on("start", (C) => {
          const { domNode: T, nodeDragThreshold: D } = s.getState();
          D === 0 && k(C);
          const F = b(C);
          d.current = F, g.current = (T == null ? void 0 : T.getBoundingClientRect()) || null, p.current = Xt(C.sourceEvent, g.current);
        }).on("drag", (C) => {
          var $, P;
          const T = b(C), { autoPanOnNodeDrag: D, nodeDragThreshold: F } = s.getState();
          if (!m.current && x.current && D && (m.current = !0, S()), !x.current) {
            const E = T.xSnapped - ((($ = d == null ? void 0 : d.current) == null ? void 0 : $.x) ?? 0), A = T.ySnapped - (((P = d == null ? void 0 : d.current) == null ? void 0 : P.y) ?? 0);
            Math.sqrt(E * E + A * A) > F && k(C);
          }
          (d.current.x !== T.xSnapped || d.current.y !== T.ySnapped) && l.current && x.current && (h.current = C.sourceEvent, p.current = Xt(C.sourceEvent, g.current), w(T));
        }).on("end", (C) => {
          if (x.current && (u(!1), m.current = !1, x.current = !1, cancelAnimationFrame(f.current), l.current)) {
            const { updateNodePositions: T, nodeInternals: D, onNodeDragStop: F, onSelectionDragStop: $ } = s.getState(), P = r ? F : yi($);
            if (T(l.current, !1, !1), P) {
              const [E, A] = bi({
                nodeId: r,
                dragItems: l.current,
                nodeInternals: D
              });
              P(C.sourceEvent, E, A);
            }
          }
        }).filter((C) => {
          const T = C.target;
          return !C.button && (!n || !pu(T, `.${n}`, e)) && (!o || pu(T, o, e));
        });
        return y.call(M), () => {
          y.on(".drag", null);
        };
      }
    }
  }, [
    e,
    t,
    n,
    o,
    a,
    s,
    r,
    i,
    b
  ]), c;
}
function Wf() {
  const e = Le();
  return me((n) => {
    const { nodeInternals: o, nodeExtent: r, updateNodePositions: a, getNodes: i, snapToGrid: s, snapGrid: c, onError: u, nodesDraggable: l } = e.getState(), d = i().filter((b) => b.selected && (b.draggable || l && typeof b.draggable > "u")), f = s ? c[0] : 5, g = s ? c[1] : 5, p = n.isShiftPressed ? 4 : 1, h = n.x * f * p, m = n.y * g * p, x = d.map((b) => {
      if (b.positionAbsolute) {
        const y = { x: b.positionAbsolute.x + h, y: b.positionAbsolute.y + m };
        s && (y.x = c[0] * Math.round(y.x / c[0]), y.y = c[1] * Math.round(y.y / c[1]));
        const { positionAbsolute: w, position: S } = Bf(b, y, o, r, void 0, u);
        b.position = S, b.positionAbsolute = w;
      }
      return b;
    });
    a(x, !0, !1);
  }, []);
}
const Nn = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
var Qn = (e) => {
  const t = ({ id: n, type: o, data: r, xPos: a, yPos: i, xPosOrigin: s, yPosOrigin: c, selected: u, onClick: l, onMouseEnter: d, onMouseMove: f, onMouseLeave: g, onContextMenu: p, onDoubleClick: h, style: m, className: x, isDraggable: b, isSelectable: y, isConnectable: w, isFocusable: S, selectNodesOnDrag: k, sourcePosition: M, targetPosition: C, hidden: T, resizeObserver: D, dragHandle: F, zIndex: $, isParent: P, noDragClassName: E, noPanClassName: A, initialized: _, disableKeyboardA11y: z, ariaLabel: R, rfId: N, hasHandleBounds: O }) => {
    const I = Le(), j = ae(null), V = ae(null), W = ae(M), U = ae(C), Z = ae(o), K = y || b || l || d || f || g, Q = Wf(), te = Xn(n, I.getState, d), q = Xn(n, I.getState, f), se = Xn(n, I.getState, g), G = Xn(n, I.getState, p), pe = Xn(n, I.getState, h), Fe = (xe) => {
      const { nodeDragThreshold: oe } = I.getState();
      if (y && (!k || !b || oe > 0) && Gi({
        id: n,
        store: I,
        nodeRef: j
      }), l) {
        const Re = I.getState().nodeInternals.get(n);
        Re && l(xe, { ...Re });
      }
    }, Se = (xe) => {
      if (!qi(xe) && !z)
        if (gf.includes(xe.key) && y) {
          const oe = xe.key === "Escape";
          Gi({
            id: n,
            store: I,
            unselect: oe,
            nodeRef: j
          });
        } else
          b && u && Object.prototype.hasOwnProperty.call(Nn, xe.key) && (I.setState({
            ariaLiveMessage: `Moved selected node ${xe.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~a}, y: ${~~i}`
          }), Q({
            x: Nn[xe.key].x,
            y: Nn[xe.key].y,
            isShiftPressed: xe.shiftKey
          }));
    };
    ie(() => () => {
      V.current && (D == null || D.unobserve(V.current), V.current = null);
    }, []), ie(() => {
      if (j.current && !T) {
        const xe = j.current;
        (!_ || !O || V.current !== xe) && (V.current && (D == null || D.unobserve(V.current)), D == null || D.observe(xe), V.current = xe);
      }
    }, [T, _, O]), ie(() => {
      const xe = Z.current !== o, oe = W.current !== M, Re = U.current !== C;
      j.current && (xe || oe || Re) && (xe && (Z.current = o), oe && (W.current = M), Re && (U.current = C), I.getState().updateNodeDimensions([{ id: n, nodeElement: j.current, forceUpdate: !0 }]));
    }, [n, o, M, C]);
    const Pe = $f({
      nodeRef: j,
      disabled: T || !b,
      noDragClassName: E,
      handleSelector: F,
      nodeId: n,
      isSelectable: y,
      selectNodesOnDrag: k
    });
    return T ? null : H.createElement(
      "div",
      { className: $e([
        "react-flow__node",
        `react-flow__node-${o}`,
        {
          // this is overwritable by passing `nopan` as a class name
          [A]: b
        },
        x,
        {
          selected: u,
          selectable: y,
          parent: P,
          dragging: Pe
        }
      ]), ref: j, style: {
        zIndex: $,
        transform: `translate(${s}px,${c}px)`,
        pointerEvents: K ? "all" : "none",
        visibility: _ ? "visible" : "hidden",
        ...m
      }, "data-id": n, "data-testid": `rf__node-${n}`, onMouseEnter: te, onMouseMove: q, onMouseLeave: se, onContextMenu: G, onClick: Fe, onDoubleClick: pe, onKeyDown: S ? Se : void 0, tabIndex: S ? 0 : void 0, role: S ? "button" : void 0, "aria-describedby": z ? void 0 : `${zf}-${N}`, "aria-label": R },
      H.createElement(
        x6,
        { value: n },
        H.createElement(e, { id: n, data: r, type: o, xPos: a, yPos: i, selected: u, isConnectable: w, sourcePosition: M, targetPosition: C, dragging: Pe, dragHandle: F, zIndex: $ })
      )
    );
  };
  return t.displayName = "NodeWrapper", Te(t);
};
const c4 = (e) => {
  const t = e.getNodes().filter((n) => n.selected);
  return {
    ...js(t, e.nodeOrigin),
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`,
    userSelectionActive: e.userSelectionActive
  };
};
function u4({ onSelectionContextMenu: e, noPanClassName: t, disableKeyboardA11y: n }) {
  const o = Le(), { width: r, height: a, x: i, y: s, transformString: c, userSelectionActive: u } = ke(c4, je), l = Wf(), d = ae(null);
  if (ie(() => {
    var p;
    n || (p = d.current) == null || p.focus({
      preventScroll: !0
    });
  }, [n]), $f({
    nodeRef: d
  }), u || !r || !a)
    return null;
  const f = e ? (p) => {
    const h = o.getState().getNodes().filter((m) => m.selected);
    e(p, h);
  } : void 0, g = (p) => {
    Object.prototype.hasOwnProperty.call(Nn, p.key) && l({
      x: Nn[p.key].x,
      y: Nn[p.key].y,
      isShiftPressed: p.shiftKey
    });
  };
  return H.createElement(
    "div",
    { className: $e(["react-flow__nodesselection", "react-flow__container", t]), style: {
      transform: c
    } },
    H.createElement("div", { ref: d, className: "react-flow__nodesselection-rect", onContextMenu: f, tabIndex: n ? void 0 : -1, onKeyDown: n ? void 0 : g, style: {
      width: r,
      height: a,
      top: s,
      left: i
    } })
  );
}
var d4 = Te(u4);
const f4 = (e) => e.nodesSelectionActive, Vf = ({ children: e, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: a, onPaneScroll: i, deleteKeyCode: s, onMove: c, onMoveStart: u, onMoveEnd: l, selectionKeyCode: d, selectionOnDrag: f, selectionMode: g, onSelectionStart: p, onSelectionEnd: h, multiSelectionKeyCode: m, panActivationKeyCode: x, zoomActivationKeyCode: b, elementsSelectable: y, zoomOnScroll: w, zoomOnPinch: S, panOnScroll: k, panOnScrollSpeed: M, panOnScrollMode: C, zoomOnDoubleClick: T, panOnDrag: D, defaultViewport: F, translateExtent: $, minZoom: P, maxZoom: E, preventScrolling: A, onSelectionContextMenu: _, noWheelClassName: z, noPanClassName: R, disableKeyboardA11y: N }) => {
  const O = ke(f4), I = yo(d), j = yo(x), V = j || D, W = j || k, U = I || f && V !== !0;
  return G6({ deleteKeyCode: s, multiSelectionKeyCode: m }), H.createElement(
    e4,
    { onMove: c, onMoveStart: u, onMoveEnd: l, onPaneContextMenu: a, elementsSelectable: y, zoomOnScroll: w, zoomOnPinch: S, panOnScroll: W, panOnScrollSpeed: M, panOnScrollMode: C, zoomOnDoubleClick: T, panOnDrag: !I && V, defaultViewport: F, translateExtent: $, minZoom: P, maxZoom: E, zoomActivationKeyCode: b, preventScrolling: A, noWheelClassName: z, noPanClassName: R },
    H.createElement(
      Pf,
      { onSelectionStart: p, onSelectionEnd: h, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: a, onPaneScroll: i, panOnDrag: V, isSelecting: !!U, selectionMode: g },
      e,
      O && H.createElement(d4, { onSelectionContextMenu: _, noPanClassName: R, disableKeyboardA11y: N })
    )
  );
};
Vf.displayName = "FlowRenderer";
var g4 = Te(Vf);
function p4(e) {
  return ke(me((n) => e ? wf(n.nodeInternals, { x: 0, y: 0, width: n.width, height: n.height }, n.transform, !0) : n.getNodes(), [e]));
}
function h4(e) {
  const t = {
    input: Qn(e.input || Of),
    default: Qn(e.default || Ki),
    output: Qn(e.output || Df),
    group: Qn(e.group || Hs)
  }, n = {}, o = Object.keys(e).filter((r) => !["input", "default", "output", "group"].includes(r)).reduce((r, a) => (r[a] = Qn(e[a] || Ki), r), n);
  return {
    ...t,
    ...o
  };
}
const m4 = ({ x: e, y: t, width: n, height: o, origin: r }) => !n || !o ? { x: e, y: t } : r[0] < 0 || r[1] < 0 || r[0] > 1 || r[1] > 1 ? { x: e, y: t } : {
  x: e - n * r[0],
  y: t - o * r[1]
}, b4 = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  updateNodeDimensions: e.updateNodeDimensions,
  onError: e.onError
}), qf = (e) => {
  const { nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, updateNodeDimensions: a, onError: i } = ke(b4, je), s = p4(e.onlyRenderVisibleElements), c = ae(), u = Ee(() => {
    if (typeof ResizeObserver > "u")
      return null;
    const l = new ResizeObserver((d) => {
      const f = d.map((g) => ({
        id: g.target.getAttribute("data-id"),
        nodeElement: g.target,
        forceUpdate: !0
      }));
      a(f);
    });
    return c.current = l, l;
  }, []);
  return ie(() => () => {
    var l;
    (l = c == null ? void 0 : c.current) == null || l.disconnect();
  }, []), H.createElement("div", { className: "react-flow__nodes", style: Bs }, s.map((l) => {
    var S, k, M;
    let d = l.type || "default";
    e.nodeTypes[d] || (i == null || i("003", gt.error003(d)), d = "default");
    const f = e.nodeTypes[d] || e.nodeTypes.default, g = !!(l.draggable || t && typeof l.draggable > "u"), p = !!(l.selectable || r && typeof l.selectable > "u"), h = !!(l.connectable || n && typeof l.connectable > "u"), m = !!(l.focusable || o && typeof l.focusable > "u"), x = e.nodeExtent ? Ds(l.positionAbsolute, e.nodeExtent) : l.positionAbsolute, b = (x == null ? void 0 : x.x) ?? 0, y = (x == null ? void 0 : x.y) ?? 0, w = m4({
      x: b,
      y,
      width: l.width ?? 0,
      height: l.height ?? 0,
      origin: e.nodeOrigin
    });
    return H.createElement(f, { key: l.id, id: l.id, className: l.className, style: l.style, type: d, data: l.data, sourcePosition: l.sourcePosition || ne.Bottom, targetPosition: l.targetPosition || ne.Top, hidden: l.hidden, xPos: b, yPos: y, xPosOrigin: w.x, yPosOrigin: w.y, selectNodesOnDrag: e.selectNodesOnDrag, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, selected: !!l.selected, isDraggable: g, isSelectable: p, isConnectable: h, isFocusable: m, resizeObserver: u, dragHandle: l.dragHandle, zIndex: ((S = l[Me]) == null ? void 0 : S.z) ?? 0, isParent: !!((k = l[Me]) != null && k.isParent), noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, initialized: !!l.width && !!l.height, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, ariaLabel: l.ariaLabel, hasHandleBounds: !!((M = l[Me]) != null && M.handleBounds) });
  }));
};
qf.displayName = "NodeRenderer";
var y4 = Te(qf);
const v4 = (e, t, n) => n === ne.Left ? e - t : n === ne.Right ? e + t : e, x4 = (e, t, n) => n === ne.Top ? e - t : n === ne.Bottom ? e + t : e, mu = "react-flow__edgeupdater", bu = ({ position: e, centerX: t, centerY: n, radius: o = 10, onMouseDown: r, onMouseEnter: a, onMouseOut: i, type: s }) => H.createElement("circle", { onMouseDown: r, onMouseEnter: a, onMouseOut: i, className: $e([mu, `${mu}-${s}`]), cx: v4(t, o, e), cy: x4(n, o, e), r: o, stroke: "transparent", fill: "transparent" }), w4 = () => !0;
var En = (e) => {
  const t = ({ id: n, className: o, type: r, data: a, onClick: i, onEdgeDoubleClick: s, selected: c, animated: u, label: l, labelStyle: d, labelShowBg: f, labelBgStyle: g, labelBgPadding: p, labelBgBorderRadius: h, style: m, source: x, target: b, sourceX: y, sourceY: w, targetX: S, targetY: k, sourcePosition: M, targetPosition: C, elementsSelectable: T, hidden: D, sourceHandleId: F, targetHandleId: $, onContextMenu: P, onMouseEnter: E, onMouseMove: A, onMouseLeave: _, edgeUpdaterRadius: z, onEdgeUpdate: R, onEdgeUpdateStart: N, onEdgeUpdateEnd: O, markerEnd: I, markerStart: j, rfId: V, ariaLabel: W, isFocusable: U, isUpdatable: Z, pathOptions: K, interactionWidth: Q, disableKeyboardA11y: te }) => {
    const q = ae(null), [se, G] = fe(!1), [pe, Fe] = fe(!1), Se = Le(), Pe = Ee(() => `url('#${Yi(j, V)}')`, [j, V]), xe = Ee(() => `url('#${Yi(I, V)}')`, [I, V]);
    if (D)
      return null;
    const oe = (De) => {
      var Je;
      const { edges: Ke, addSelectedEdges: Ot, unselectNodesAndEdges: Nt, multiSelectionActive: Dt } = Se.getState(), it = Ke.find((tn) => tn.id === n);
      it && (T && (Se.setState({ nodesSelectionActive: !1 }), it.selected && Dt ? (Nt({ nodes: [], edges: [it] }), (Je = q.current) == null || Je.blur()) : Ot([n])), i && i(De, it));
    }, Re = Gn(n, Se.getState, s), At = Gn(n, Se.getState, P), en = Gn(n, Se.getState, E), vt = Gn(n, Se.getState, A), Pt = Gn(n, Se.getState, _), at = (De, Ke) => {
      if (De.button !== 0)
        return;
      const { edges: Ot, isValidConnection: Nt } = Se.getState(), Dt = Ke ? b : x, it = (Ke ? $ : F) || null, Je = Ke ? "target" : "source", tn = Nt || w4, nn = Ke, $t = Ot.find((st) => st.id === n);
      Fe(!0), N == null || N(De, $t, Je);
      const wt = (st) => {
        Fe(!1), O == null || O(st, $t, Je);
      };
      kf({
        event: De,
        handleId: it,
        nodeId: Dt,
        onConnect: (st) => R == null ? void 0 : R($t, st),
        isTarget: nn,
        getState: Se.getState,
        setState: Se.setState,
        isValidConnection: tn,
        edgeUpdaterType: Je,
        onEdgeUpdateEnd: wt
      });
    }, Mt = (De) => at(De, !0), xt = (De) => at(De, !1), Ze = () => G(!0), Ht = () => G(!1), Tt = !T && !i, Bt = (De) => {
      var Ke;
      if (!te && gf.includes(De.key) && T) {
        const { unselectNodesAndEdges: Ot, addSelectedEdges: Nt, edges: Dt } = Se.getState();
        De.key === "Escape" ? ((Ke = q.current) == null || Ke.blur(), Ot({ edges: [Dt.find((Je) => Je.id === n)] })) : Nt([n]);
      }
    };
    return H.createElement(
      "g",
      { className: $e([
        "react-flow__edge",
        `react-flow__edge-${r}`,
        o,
        { selected: c, animated: u, inactive: Tt, updating: se }
      ]), onClick: oe, onDoubleClick: Re, onContextMenu: At, onMouseEnter: en, onMouseMove: vt, onMouseLeave: Pt, onKeyDown: U ? Bt : void 0, tabIndex: U ? 0 : void 0, role: U ? "button" : "img", "data-testid": `rf__edge-${n}`, "aria-label": W === null ? void 0 : W || `Edge from ${x} to ${b}`, "aria-describedby": U ? `${If}-${V}` : void 0, ref: q },
      !pe && H.createElement(e, { id: n, source: x, target: b, selected: c, animated: u, label: l, labelStyle: d, labelShowBg: f, labelBgStyle: g, labelBgPadding: p, labelBgBorderRadius: h, data: a, style: m, sourceX: y, sourceY: w, targetX: S, targetY: k, sourcePosition: M, targetPosition: C, sourceHandleId: F, targetHandleId: $, markerStart: Pe, markerEnd: xe, pathOptions: K, interactionWidth: Q }),
      Z && H.createElement(
        H.Fragment,
        null,
        (Z === "source" || Z === !0) && H.createElement(bu, { position: M, centerX: y, centerY: w, radius: z, onMouseDown: Mt, onMouseEnter: Ze, onMouseOut: Ht, type: "source" }),
        (Z === "target" || Z === !0) && H.createElement(bu, { position: C, centerX: S, centerY: k, radius: z, onMouseDown: xt, onMouseEnter: Ze, onMouseOut: Ht, type: "target" })
      )
    );
  };
  return t.displayName = "EdgeWrapper", Te(t);
};
function S4(e) {
  const t = {
    default: En(e.default || Tr),
    straight: En(e.bezier || Ls),
    step: En(e.step || Is),
    smoothstep: En(e.step || qr),
    simplebezier: En(e.simplebezier || zs)
  }, n = {}, o = Object.keys(e).filter((r) => !["default", "bezier"].includes(r)).reduce((r, a) => (r[a] = En(e[a] || Tr), r), n);
  return {
    ...t,
    ...o
  };
}
function yu(e, t, n = null) {
  const o = ((n == null ? void 0 : n.x) || 0) + t.x, r = ((n == null ? void 0 : n.y) || 0) + t.y, a = (n == null ? void 0 : n.width) || t.width, i = (n == null ? void 0 : n.height) || t.height;
  switch (e) {
    case ne.Top:
      return {
        x: o + a / 2,
        y: r
      };
    case ne.Right:
      return {
        x: o + a,
        y: r + i / 2
      };
    case ne.Bottom:
      return {
        x: o + a / 2,
        y: r + i
      };
    case ne.Left:
      return {
        x: o,
        y: r + i / 2
      };
  }
}
function vu(e, t) {
  return e ? e.length === 1 || !t ? e[0] : t && e.find((n) => n.id === t) || null : null;
}
const C4 = (e, t, n, o, r, a) => {
  const i = yu(n, e, t), s = yu(a, o, r);
  return {
    sourceX: i.x,
    sourceY: i.y,
    targetX: s.x,
    targetY: s.y
  };
};
function E4({ sourcePos: e, targetPos: t, sourceWidth: n, sourceHeight: o, targetWidth: r, targetHeight: a, width: i, height: s, transform: c }) {
  const u = {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x + n, t.x + r),
    y2: Math.max(e.y + o, t.y + a)
  };
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const l = Rs({
    x: (0 - c[0]) / c[2],
    y: (0 - c[1]) / c[2],
    width: i / c[2],
    height: s / c[2]
  }), d = Math.max(0, Math.min(l.x2, u.x2) - Math.max(l.x, u.x)), f = Math.max(0, Math.min(l.y2, u.y2) - Math.max(l.y, u.y));
  return Math.ceil(d * f) > 0;
}
function xu(e) {
  var o, r, a, i, s;
  const t = ((o = e == null ? void 0 : e[Me]) == null ? void 0 : o.handleBounds) || null, n = t && (e == null ? void 0 : e.width) && (e == null ? void 0 : e.height) && typeof ((r = e == null ? void 0 : e.positionAbsolute) == null ? void 0 : r.x) < "u" && typeof ((a = e == null ? void 0 : e.positionAbsolute) == null ? void 0 : a.y) < "u";
  return [
    {
      x: ((i = e == null ? void 0 : e.positionAbsolute) == null ? void 0 : i.x) || 0,
      y: ((s = e == null ? void 0 : e.positionAbsolute) == null ? void 0 : s.y) || 0,
      width: (e == null ? void 0 : e.width) || 0,
      height: (e == null ? void 0 : e.height) || 0
    },
    t,
    !!n
  ];
}
const _4 = [{ level: 0, isMaxLevel: !0, edges: [] }];
function k4(e, t, n = !1) {
  let o = -1;
  const r = e.reduce((i, s) => {
    var l, d;
    const c = nt(s.zIndex);
    let u = c ? s.zIndex : 0;
    if (n) {
      const f = t.get(s.target), g = t.get(s.source), p = s.selected || (f == null ? void 0 : f.selected) || (g == null ? void 0 : g.selected), h = Math.max(((l = g == null ? void 0 : g[Me]) == null ? void 0 : l.z) || 0, ((d = f == null ? void 0 : f[Me]) == null ? void 0 : d.z) || 0, 1e3);
      u = (c ? s.zIndex : 0) + (p ? h : 0);
    }
    return i[u] ? i[u].push(s) : i[u] = [s], o = u > o ? u : o, i;
  }, {}), a = Object.entries(r).map(([i, s]) => {
    const c = +i;
    return {
      edges: s,
      level: c,
      isMaxLevel: c === o
    };
  });
  return a.length === 0 ? _4 : a;
}
function A4(e, t, n) {
  const o = ke(me((r) => e ? r.edges.filter((a) => {
    const i = t.get(a.source), s = t.get(a.target);
    return (i == null ? void 0 : i.width) && (i == null ? void 0 : i.height) && (s == null ? void 0 : s.width) && (s == null ? void 0 : s.height) && E4({
      sourcePos: i.positionAbsolute || { x: 0, y: 0 },
      targetPos: s.positionAbsolute || { x: 0, y: 0 },
      sourceWidth: i.width,
      sourceHeight: i.height,
      targetWidth: s.width,
      targetHeight: s.height,
      width: r.width,
      height: r.height,
      transform: r.transform
    });
  }) : r.edges, [e, t]));
  return k4(o, t, n);
}
const M4 = ({ color: e = "none", strokeWidth: t = 1 }) => H.createElement("polyline", { style: {
  stroke: e,
  strokeWidth: t
}, strokeLinecap: "round", strokeLinejoin: "round", fill: "none", points: "-5,-4 0,0 -5,4" }), T4 = ({ color: e = "none", strokeWidth: t = 1 }) => H.createElement("polyline", { style: {
  stroke: e,
  fill: e,
  strokeWidth: t
}, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" }), wu = {
  [Mr.Arrow]: M4,
  [Mr.ArrowClosed]: T4
};
function O4(e) {
  const t = Le();
  return Ee(() => {
    var r, a;
    return Object.prototype.hasOwnProperty.call(wu, e) ? wu[e] : ((a = (r = t.getState()).onError) == null || a.call(r, "009", gt.error009(e)), null);
  }, [e]);
}
const N4 = ({ id: e, type: t, color: n, width: o = 12.5, height: r = 12.5, markerUnits: a = "strokeWidth", strokeWidth: i, orient: s = "auto-start-reverse" }) => {
  const c = O4(t);
  return c ? H.createElement(
    "marker",
    { className: "react-flow__arrowhead", id: e, markerWidth: `${o}`, markerHeight: `${r}`, viewBox: "-10 -10 20 20", markerUnits: a, orient: s, refX: "0", refY: "0" },
    H.createElement(c, { color: n, strokeWidth: i })
  ) : null;
}, D4 = ({ defaultColor: e, rfId: t }) => (n) => {
  const o = [];
  return n.edges.reduce((r, a) => ([a.markerStart, a.markerEnd].forEach((i) => {
    if (i && typeof i == "object") {
      const s = Yi(i, t);
      o.includes(s) || (r.push({ id: s, color: i.color || e, ...i }), o.push(s));
    }
  }), r), []).sort((r, a) => r.id.localeCompare(a.id));
}, Uf = ({ defaultColor: e, rfId: t }) => {
  const n = ke(
    me(D4({ defaultColor: e, rfId: t }), [e, t]),
    // the id includes all marker options, so we just need to look at that part of the marker
    (o, r) => !(o.length !== r.length || o.some((a, i) => a.id !== r[i].id))
  );
  return H.createElement("defs", null, n.map((o) => H.createElement(N4, { id: o.id, key: o.id, type: o.type, color: o.color, width: o.width, height: o.height, markerUnits: o.markerUnits, strokeWidth: o.strokeWidth, orient: o.orient })));
};
Uf.displayName = "MarkerDefinitions";
var R4 = Te(Uf);
const z4 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  edgesFocusable: e.edgesFocusable,
  edgesUpdatable: e.edgesUpdatable,
  elementsSelectable: e.elementsSelectable,
  width: e.width,
  height: e.height,
  connectionMode: e.connectionMode,
  nodeInternals: e.nodeInternals,
  onError: e.onError
}), Yf = ({ defaultMarkerColor: e, onlyRenderVisibleElements: t, elevateEdgesOnSelect: n, rfId: o, edgeTypes: r, noPanClassName: a, onEdgeUpdate: i, onEdgeContextMenu: s, onEdgeMouseEnter: c, onEdgeMouseMove: u, onEdgeMouseLeave: l, onEdgeClick: d, edgeUpdaterRadius: f, onEdgeDoubleClick: g, onEdgeUpdateStart: p, onEdgeUpdateEnd: h, children: m, disableKeyboardA11y: x }) => {
  const { edgesFocusable: b, edgesUpdatable: y, elementsSelectable: w, width: S, height: k, connectionMode: M, nodeInternals: C, onError: T } = ke(z4, je), D = A4(t, C, n);
  return S ? H.createElement(
    H.Fragment,
    null,
    D.map(({ level: F, edges: $, isMaxLevel: P }) => H.createElement(
      "svg",
      { key: F, style: { zIndex: F }, width: S, height: k, className: "react-flow__edges react-flow__container" },
      P && H.createElement(R4, { defaultColor: e, rfId: o }),
      H.createElement("g", null, $.map((E) => {
        const [A, _, z] = xu(C.get(E.source)), [R, N, O] = xu(C.get(E.target));
        if (!z || !O)
          return null;
        let I = E.type || "default";
        r[I] || (T == null || T("011", gt.error011(I)), I = "default");
        const j = r[I] || r.default, V = M === pn.Strict ? N.target : (N.target ?? []).concat(N.source ?? []), W = vu(_.source, E.sourceHandle), U = vu(V, E.targetHandle), Z = (W == null ? void 0 : W.position) || ne.Bottom, K = (U == null ? void 0 : U.position) || ne.Top, Q = !!(E.focusable || b && typeof E.focusable > "u"), te = typeof i < "u" && (E.updatable || y && typeof E.updatable > "u");
        if (!W || !U)
          return T == null || T("008", gt.error008(W, E)), null;
        const { sourceX: q, sourceY: se, targetX: G, targetY: pe } = C4(A, W, Z, R, U, K);
        return H.createElement(j, { key: E.id, id: E.id, className: $e([E.className, a]), type: I, data: E.data, selected: !!E.selected, animated: !!E.animated, hidden: !!E.hidden, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, style: E.style, source: E.source, target: E.target, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerEnd: E.markerEnd, markerStart: E.markerStart, sourceX: q, sourceY: se, targetX: G, targetY: pe, sourcePosition: Z, targetPosition: K, elementsSelectable: w, onEdgeUpdate: i, onContextMenu: s, onMouseEnter: c, onMouseMove: u, onMouseLeave: l, onClick: d, edgeUpdaterRadius: f, onEdgeDoubleClick: g, onEdgeUpdateStart: p, onEdgeUpdateEnd: h, rfId: o, ariaLabel: E.ariaLabel, isFocusable: Q, isUpdatable: te, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth, disableKeyboardA11y: x });
      }))
    )),
    m
  ) : null;
};
Yf.displayName = "EdgeRenderer";
var I4 = Te(Yf);
const L4 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function F4({ children: e }) {
  const t = ke(L4);
  return H.createElement("div", { className: "react-flow__viewport react-flow__container", style: { transform: t } }, e);
}
function j4(e) {
  const t = mt(), n = ae(!1);
  ie(() => {
    !n.current && t.viewportInitialized && e && (setTimeout(() => e(t), 1), n.current = !0);
  }, [e, t.viewportInitialized]);
}
const P4 = {
  [ne.Left]: ne.Right,
  [ne.Right]: ne.Left,
  [ne.Top]: ne.Bottom,
  [ne.Bottom]: ne.Top
}, Zf = ({ nodeId: e, handleType: t, style: n, type: o = Zt.Bezier, CustomComponent: r, connectionStatus: a }) => {
  var k, M, C;
  const { fromNode: i, handleId: s, toX: c, toY: u, connectionMode: l } = ke(me((T) => ({
    fromNode: T.nodeInternals.get(e),
    handleId: T.connectionHandleId,
    toX: (T.connectionPosition.x - T.transform[0]) / T.transform[2],
    toY: (T.connectionPosition.y - T.transform[1]) / T.transform[2],
    connectionMode: T.connectionMode
  }), [e]), je), d = (k = i == null ? void 0 : i[Me]) == null ? void 0 : k.handleBounds;
  let f = d == null ? void 0 : d[t];
  if (l === pn.Loose && (f = f || (d == null ? void 0 : d[t === "source" ? "target" : "source"])), !i || !f)
    return null;
  const g = s ? f.find((T) => T.id === s) : f[0], p = g ? g.x + g.width / 2 : (i.width ?? 0) / 2, h = g ? g.y + g.height / 2 : i.height ?? 0, m = (((M = i.positionAbsolute) == null ? void 0 : M.x) ?? 0) + p, x = (((C = i.positionAbsolute) == null ? void 0 : C.y) ?? 0) + h, b = g == null ? void 0 : g.position, y = b ? P4[b] : null;
  if (!b || !y)
    return null;
  if (r)
    return H.createElement(r, { connectionLineType: o, connectionLineStyle: n, fromNode: i, fromHandle: g, fromX: m, fromY: x, toX: c, toY: u, fromPosition: b, toPosition: y, connectionStatus: a });
  let w = "";
  const S = {
    sourceX: m,
    sourceY: x,
    sourcePosition: b,
    targetX: c,
    targetY: u,
    targetPosition: y
  };
  return o === Zt.Bezier ? [w] = vf(S) : o === Zt.Step ? [w] = Ui({
    ...S,
    borderRadius: 0
  }) : o === Zt.SmoothStep ? [w] = Ui(S) : o === Zt.SimpleBezier ? [w] = yf(S) : w = `M${m},${x} ${c},${u}`, H.createElement("path", { d: w, fill: "none", className: "react-flow__connection-path", style: n });
};
Zf.displayName = "ConnectionLine";
const H4 = (e) => ({
  nodeId: e.connectionNodeId,
  handleType: e.connectionHandleType,
  nodesConnectable: e.nodesConnectable,
  connectionStatus: e.connectionStatus,
  width: e.width,
  height: e.height
});
function B4({ containerStyle: e, style: t, type: n, component: o }) {
  const { nodeId: r, handleType: a, nodesConnectable: i, width: s, height: c, connectionStatus: u } = ke(H4, je);
  return !(r && a && s && i) ? null : H.createElement(
    "svg",
    { style: e, width: s, height: c, className: "react-flow__edges react-flow__connectionline react-flow__container" },
    H.createElement(
      "g",
      { className: $e(["react-flow__connection", u]) },
      H.createElement(Zf, { nodeId: r, handleType: a, style: t, type: n, CustomComponent: o, connectionStatus: u })
    )
  );
}
function Su(e, t) {
  const n = ae(null), o = Le();
  return Ee(() => {
    var a, i;
    if (process.env.NODE_ENV === "development") {
      const s = Object.keys(e);
      je(n.current, s) && ((i = (a = o.getState()).onError) == null || i.call(a, "002", gt.error002())), n.current = s;
    }
    return t(e);
  }, [e]);
}
const Kf = ({ nodeTypes: e, edgeTypes: t, onMove: n, onMoveStart: o, onMoveEnd: r, onInit: a, onNodeClick: i, onEdgeClick: s, onNodeDoubleClick: c, onEdgeDoubleClick: u, onNodeMouseEnter: l, onNodeMouseMove: d, onNodeMouseLeave: f, onNodeContextMenu: g, onSelectionContextMenu: p, onSelectionStart: h, onSelectionEnd: m, connectionLineType: x, connectionLineStyle: b, connectionLineComponent: y, connectionLineContainerStyle: w, selectionKeyCode: S, selectionOnDrag: k, selectionMode: M, multiSelectionKeyCode: C, panActivationKeyCode: T, zoomActivationKeyCode: D, deleteKeyCode: F, onlyRenderVisibleElements: $, elementsSelectable: P, selectNodesOnDrag: E, defaultViewport: A, translateExtent: _, minZoom: z, maxZoom: R, preventScrolling: N, defaultMarkerColor: O, zoomOnScroll: I, zoomOnPinch: j, panOnScroll: V, panOnScrollSpeed: W, panOnScrollMode: U, zoomOnDoubleClick: Z, panOnDrag: K, onPaneClick: Q, onPaneMouseEnter: te, onPaneMouseMove: q, onPaneMouseLeave: se, onPaneScroll: G, onPaneContextMenu: pe, onEdgeUpdate: Fe, onEdgeContextMenu: Se, onEdgeMouseEnter: Pe, onEdgeMouseMove: xe, onEdgeMouseLeave: oe, edgeUpdaterRadius: Re, onEdgeUpdateStart: At, onEdgeUpdateEnd: en, noDragClassName: vt, noWheelClassName: Pt, noPanClassName: at, elevateEdgesOnSelect: Mt, disableKeyboardA11y: xt, nodeOrigin: Ze, nodeExtent: Ht, rfId: Tt }) => {
  const Bt = Su(e, h4), De = Su(t, S4);
  return j4(a), H.createElement(
    g4,
    { onPaneClick: Q, onPaneMouseEnter: te, onPaneMouseMove: q, onPaneMouseLeave: se, onPaneContextMenu: pe, onPaneScroll: G, deleteKeyCode: F, selectionKeyCode: S, selectionOnDrag: k, selectionMode: M, onSelectionStart: h, onSelectionEnd: m, multiSelectionKeyCode: C, panActivationKeyCode: T, zoomActivationKeyCode: D, elementsSelectable: P, onMove: n, onMoveStart: o, onMoveEnd: r, zoomOnScroll: I, zoomOnPinch: j, zoomOnDoubleClick: Z, panOnScroll: V, panOnScrollSpeed: W, panOnScrollMode: U, panOnDrag: K, defaultViewport: A, translateExtent: _, minZoom: z, maxZoom: R, onSelectionContextMenu: p, preventScrolling: N, noDragClassName: vt, noWheelClassName: Pt, noPanClassName: at, disableKeyboardA11y: xt },
    H.createElement(
      F4,
      null,
      H.createElement(
        I4,
        { edgeTypes: De, onEdgeClick: s, onEdgeDoubleClick: u, onEdgeUpdate: Fe, onlyRenderVisibleElements: $, onEdgeContextMenu: Se, onEdgeMouseEnter: Pe, onEdgeMouseMove: xe, onEdgeMouseLeave: oe, onEdgeUpdateStart: At, onEdgeUpdateEnd: en, edgeUpdaterRadius: Re, defaultMarkerColor: O, noPanClassName: at, elevateEdgesOnSelect: !!Mt, disableKeyboardA11y: xt, rfId: Tt },
        H.createElement(B4, { style: b, type: x, component: y, containerStyle: w })
      ),
      H.createElement("div", { className: "react-flow__edgelabel-renderer" }),
      H.createElement(y4, { nodeTypes: Bt, onNodeClick: i, onNodeDoubleClick: c, onNodeMouseEnter: l, onNodeMouseMove: d, onNodeMouseLeave: f, onNodeContextMenu: g, selectNodesOnDrag: E, onlyRenderVisibleElements: $, noPanClassName: at, noDragClassName: vt, disableKeyboardA11y: xt, nodeOrigin: Ze, nodeExtent: Ht, rfId: Tt })
    )
  );
};
Kf.displayName = "GraphView";
var $4 = Te(Kf);
const Xi = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Vt = {
  rfId: "1",
  width: 0,
  height: 0,
  transform: [0, 0, 1],
  nodeInternals: /* @__PURE__ */ new Map(),
  edges: [],
  onNodesChange: null,
  onEdgesChange: null,
  hasDefaultNodes: !1,
  hasDefaultEdges: !1,
  d3Zoom: null,
  d3Selection: null,
  d3ZoomHandler: void 0,
  minZoom: 0.5,
  maxZoom: 2,
  translateExtent: Xi,
  nodeExtent: Xi,
  nodesSelectionActive: !1,
  userSelectionActive: !1,
  userSelectionRect: null,
  connectionNodeId: null,
  connectionHandleId: null,
  connectionHandleType: "source",
  connectionPosition: { x: 0, y: 0 },
  connectionStatus: null,
  connectionMode: pn.Strict,
  domNode: null,
  paneDragging: !1,
  noPanClassName: "nopan",
  nodeOrigin: [0, 0],
  nodeDragThreshold: 0,
  snapGrid: [15, 15],
  snapToGrid: !1,
  nodesDraggable: !0,
  nodesConnectable: !0,
  nodesFocusable: !0,
  edgesFocusable: !0,
  edgesUpdatable: !0,
  elementsSelectable: !0,
  elevateNodesOnSelect: !0,
  fitViewOnInit: !1,
  fitViewOnInitDone: !1,
  fitViewOnInitOptions: void 0,
  onSelectionChange: [],
  multiSelectionActive: !1,
  connectionStartHandle: null,
  connectionEndHandle: null,
  connectionClickStartHandle: null,
  connectOnClick: !0,
  ariaLiveMessage: "",
  autoPanOnConnect: !0,
  autoPanOnNodeDrag: !0,
  connectionRadius: 20,
  onError: pf,
  isValidConnection: void 0
}, W4 = () => Mm((e, t) => ({
  ...Vt,
  setNodes: (n) => {
    const { nodeInternals: o, nodeOrigin: r, elevateNodesOnSelect: a } = t();
    e({ nodeInternals: hi(n, o, r, a) });
  },
  getNodes: () => Array.from(t().nodeInternals.values()),
  setEdges: (n) => {
    const { defaultEdgeOptions: o = {} } = t();
    e({ edges: n.map((r) => ({ ...o, ...r })) });
  },
  setDefaultNodesAndEdges: (n, o) => {
    const r = typeof n < "u", a = typeof o < "u", i = r ? hi(n, /* @__PURE__ */ new Map(), t().nodeOrigin, t().elevateNodesOnSelect) : /* @__PURE__ */ new Map();
    e({ nodeInternals: i, edges: a ? o : [], hasDefaultNodes: r, hasDefaultEdges: a });
  },
  updateNodeDimensions: (n) => {
    const { onNodesChange: o, nodeInternals: r, fitViewOnInit: a, fitViewOnInitDone: i, fitViewOnInitOptions: s, domNode: c, nodeOrigin: u } = t(), l = c == null ? void 0 : c.querySelector(".react-flow__viewport");
    if (!l)
      return;
    const d = window.getComputedStyle(l), { m22: f } = new window.DOMMatrixReadOnly(d.transform), g = n.reduce((h, m) => {
      const x = r.get(m.id);
      if (x != null && x.hidden)
        r.set(x.id, {
          ...x,
          [Me]: {
            ...x[Me],
            // we need to reset the handle bounds when the node is hidden
            // in order to force a new observation when the node is shown again
            handleBounds: void 0
          }
        });
      else if (x) {
        const b = Ns(m.nodeElement);
        !!(b.width && b.height && (x.width !== b.width || x.height !== b.height || m.forceUpdate)) && (r.set(x.id, {
          ...x,
          [Me]: {
            ...x[Me],
            handleBounds: {
              source: hu(".source", m.nodeElement, f, u),
              target: hu(".target", m.nodeElement, f, u)
            }
          },
          ...b
        }), h.push({
          id: x.id,
          type: "dimensions",
          dimensions: b
        }));
      }
      return h;
    }, []);
    Ff(r, u);
    const p = i || a && !i && jf(t, { initial: !0, ...s });
    e({ nodeInternals: new Map(r), fitViewOnInitDone: p }), (g == null ? void 0 : g.length) > 0 && (o == null || o(g));
  },
  updateNodePositions: (n, o = !0, r = !1) => {
    const { triggerNodeChanges: a } = t(), i = n.map((s) => {
      const c = {
        id: s.id,
        type: "position",
        dragging: r
      };
      return o && (c.positionAbsolute = s.positionAbsolute, c.position = s.position), c;
    });
    a(i);
  },
  triggerNodeChanges: (n) => {
    const { onNodesChange: o, nodeInternals: r, hasDefaultNodes: a, nodeOrigin: i, getNodes: s, elevateNodesOnSelect: c } = t();
    if (n != null && n.length) {
      if (a) {
        const u = r4(n, s()), l = hi(u, r, i, c);
        e({ nodeInternals: l });
      }
      o == null || o(n);
    }
  },
  addSelectedNodes: (n) => {
    const { multiSelectionActive: o, edges: r, getNodes: a } = t();
    let i, s = null;
    o ? i = n.map((c) => Yt(c, !0)) : (i = _n(a(), n), s = _n(r, [])), Xo({
      changedNodes: i,
      changedEdges: s,
      get: t,
      set: e
    });
  },
  addSelectedEdges: (n) => {
    const { multiSelectionActive: o, edges: r, getNodes: a } = t();
    let i, s = null;
    o ? i = n.map((c) => Yt(c, !0)) : (i = _n(r, n), s = _n(a(), [])), Xo({
      changedNodes: s,
      changedEdges: i,
      get: t,
      set: e
    });
  },
  unselectNodesAndEdges: ({ nodes: n, edges: o } = {}) => {
    const { edges: r, getNodes: a } = t(), i = n || a(), s = o || r, c = i.map((l) => (l.selected = !1, Yt(l.id, !1))), u = s.map((l) => Yt(l.id, !1));
    Xo({
      changedNodes: c,
      changedEdges: u,
      get: t,
      set: e
    });
  },
  setMinZoom: (n) => {
    const { d3Zoom: o, maxZoom: r } = t();
    o == null || o.scaleExtent([n, r]), e({ minZoom: n });
  },
  setMaxZoom: (n) => {
    const { d3Zoom: o, minZoom: r } = t();
    o == null || o.scaleExtent([r, n]), e({ maxZoom: n });
  },
  setTranslateExtent: (n) => {
    var o;
    (o = t().d3Zoom) == null || o.translateExtent(n), e({ translateExtent: n });
  },
  resetSelectedElements: () => {
    const { edges: n, getNodes: o } = t(), a = o().filter((s) => s.selected).map((s) => Yt(s.id, !1)), i = n.filter((s) => s.selected).map((s) => Yt(s.id, !1));
    Xo({
      changedNodes: a,
      changedEdges: i,
      get: t,
      set: e
    });
  },
  setNodeExtent: (n) => {
    const { nodeInternals: o } = t();
    o.forEach((r) => {
      r.positionAbsolute = Ds(r.position, n);
    }), e({
      nodeExtent: n,
      nodeInternals: new Map(o)
    });
  },
  panBy: (n) => {
    const { transform: o, width: r, height: a, d3Zoom: i, d3Selection: s, translateExtent: c } = t();
    if (!i || !s || !n.x && !n.y)
      return !1;
    const u = Gt.translate(o[0] + n.x, o[1] + n.y).scale(o[2]), l = [
      [0, 0],
      [r, a]
    ], d = i == null ? void 0 : i.constrain()(u, l, c);
    return i.transform(s, d), o[0] !== d.x || o[1] !== d.y || o[2] !== d.k;
  },
  cancelConnection: () => e({
    connectionNodeId: Vt.connectionNodeId,
    connectionHandleId: Vt.connectionHandleId,
    connectionHandleType: Vt.connectionHandleType,
    connectionStatus: Vt.connectionStatus,
    connectionStartHandle: Vt.connectionStartHandle,
    connectionEndHandle: Vt.connectionEndHandle
  }),
  reset: () => e({ ...Vt })
}), Object.is), $s = ({ children: e }) => {
  const t = ae(null);
  return t.current || (t.current = W4()), H.createElement(s6, { value: t.current }, e);
};
$s.displayName = "ReactFlowProvider";
const Gf = ({ children: e }) => Ye(Vr) ? H.createElement(H.Fragment, null, e) : H.createElement($s, null, e);
Gf.displayName = "ReactFlowWrapper";
const V4 = {
  input: Of,
  default: Ki,
  output: Df,
  group: Hs
}, q4 = {
  default: Tr,
  straight: Ls,
  step: Is,
  smoothstep: qr,
  simplebezier: zs
}, U4 = [0, 0], Y4 = [15, 15], Z4 = { x: 0, y: 0, zoom: 1 }, K4 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
}, Xf = Ru(({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, className: r, nodeTypes: a = V4, edgeTypes: i = q4, onNodeClick: s, onEdgeClick: c, onInit: u, onMove: l, onMoveStart: d, onMoveEnd: f, onConnect: g, onConnectStart: p, onConnectEnd: h, onClickConnectStart: m, onClickConnectEnd: x, onNodeMouseEnter: b, onNodeMouseMove: y, onNodeMouseLeave: w, onNodeContextMenu: S, onNodeDoubleClick: k, onNodeDragStart: M, onNodeDrag: C, onNodeDragStop: T, onNodesDelete: D, onEdgesDelete: F, onSelectionChange: $, onSelectionDragStart: P, onSelectionDrag: E, onSelectionDragStop: A, onSelectionContextMenu: _, onSelectionStart: z, onSelectionEnd: R, connectionMode: N = pn.Strict, connectionLineType: O = Zt.Bezier, connectionLineStyle: I, connectionLineComponent: j, connectionLineContainerStyle: V, deleteKeyCode: W = "Backspace", selectionKeyCode: U = "Shift", selectionOnDrag: Z = !1, selectionMode: K = bo.Full, panActivationKeyCode: Q = "Space", multiSelectionKeyCode: te = Ar() ? "Meta" : "Control", zoomActivationKeyCode: q = Ar() ? "Meta" : "Control", snapToGrid: se = !1, snapGrid: G = Y4, onlyRenderVisibleElements: pe = !1, selectNodesOnDrag: Fe = !0, nodesDraggable: Se, nodesConnectable: Pe, nodesFocusable: xe, nodeOrigin: oe = U4, edgesFocusable: Re, edgesUpdatable: At, elementsSelectable: en, defaultViewport: vt = Z4, minZoom: Pt = 0.5, maxZoom: at = 2, translateExtent: Mt = Xi, preventScrolling: xt = !0, nodeExtent: Ze, defaultMarkerColor: Ht = "#b1b1b7", zoomOnScroll: Tt = !0, zoomOnPinch: Bt = !0, panOnScroll: De = !1, panOnScrollSpeed: Ke = 0.5, panOnScrollMode: Ot = un.Free, zoomOnDoubleClick: Nt = !0, panOnDrag: Dt = !0, onPaneClick: it, onPaneMouseEnter: Je, onPaneMouseMove: tn, onPaneMouseLeave: nn, onPaneScroll: $t, onPaneContextMenu: wt, children: yn, onEdgeUpdate: st, onEdgeContextMenu: To, onEdgeDoubleClick: Zr, onEdgeMouseEnter: Oo, onEdgeMouseMove: Kr, onEdgeMouseLeave: No, onEdgeUpdateStart: Do, onEdgeUpdateEnd: Gr, edgeUpdaterRadius: Xr = 10, onNodesChange: Ro, onEdgesChange: Qr, noDragClassName: Jr = "nodrag", noWheelClassName: ea = "nowheel", noPanClassName: zo = "nopan", fitView: L = !1, fitViewOptions: Y, connectOnClick: ee = !0, attributionPosition: re, proOptions: he, defaultEdgeOptions: ve, elevateNodesOnSelect: ge = !0, elevateEdgesOnSelect: ce = !1, disableKeyboardA11y: ze = !1, autoPanOnConnect: _e = !0, autoPanOnNodeDrag: Ae = !0, connectionRadius: We = 20, isValidConnection: Wt, onError: Io, style: lt, id: tl, nodeDragThreshold: O1, ...N1 }, D1) => {
  const ta = tl || "1";
  return H.createElement(
    "div",
    { ...N1, style: { ...lt, ...K4 }, ref: D1, className: $e(["react-flow", r]), "data-testid": "rf__wrapper", id: tl },
    H.createElement(
      Gf,
      null,
      H.createElement($4, { onInit: u, onMove: l, onMoveStart: d, onMoveEnd: f, onNodeClick: s, onEdgeClick: c, onNodeMouseEnter: b, onNodeMouseMove: y, onNodeMouseLeave: w, onNodeContextMenu: S, onNodeDoubleClick: k, nodeTypes: a, edgeTypes: i, connectionLineType: O, connectionLineStyle: I, connectionLineComponent: j, connectionLineContainerStyle: V, selectionKeyCode: U, selectionOnDrag: Z, selectionMode: K, deleteKeyCode: W, multiSelectionKeyCode: te, panActivationKeyCode: Q, zoomActivationKeyCode: q, onlyRenderVisibleElements: pe, selectNodesOnDrag: Fe, defaultViewport: vt, translateExtent: Mt, minZoom: Pt, maxZoom: at, preventScrolling: xt, zoomOnScroll: Tt, zoomOnPinch: Bt, zoomOnDoubleClick: Nt, panOnScroll: De, panOnScrollSpeed: Ke, panOnScrollMode: Ot, panOnDrag: Dt, onPaneClick: it, onPaneMouseEnter: Je, onPaneMouseMove: tn, onPaneMouseLeave: nn, onPaneScroll: $t, onPaneContextMenu: wt, onSelectionContextMenu: _, onSelectionStart: z, onSelectionEnd: R, onEdgeUpdate: st, onEdgeContextMenu: To, onEdgeDoubleClick: Zr, onEdgeMouseEnter: Oo, onEdgeMouseMove: Kr, onEdgeMouseLeave: No, onEdgeUpdateStart: Do, onEdgeUpdateEnd: Gr, edgeUpdaterRadius: Xr, defaultMarkerColor: Ht, noDragClassName: Jr, noWheelClassName: ea, noPanClassName: zo, elevateEdgesOnSelect: ce, rfId: ta, disableKeyboardA11y: ze, nodeOrigin: oe, nodeExtent: Ze }),
      H.createElement(j6, { nodes: e, edges: t, defaultNodes: n, defaultEdges: o, onConnect: g, onConnectStart: p, onConnectEnd: h, onClickConnectStart: m, onClickConnectEnd: x, nodesDraggable: Se, nodesConnectable: Pe, nodesFocusable: xe, edgesFocusable: Re, edgesUpdatable: At, elementsSelectable: en, elevateNodesOnSelect: ge, minZoom: Pt, maxZoom: at, nodeExtent: Ze, onNodesChange: Ro, onEdgesChange: Qr, snapToGrid: se, snapGrid: G, connectionMode: N, translateExtent: Mt, connectOnClick: ee, defaultEdgeOptions: ve, fitView: L, fitViewOptions: Y, onNodesDelete: D, onEdgesDelete: F, onNodeDragStart: M, onNodeDrag: C, onNodeDragStop: T, onSelectionDrag: E, onSelectionDragStart: P, onSelectionDragStop: A, noPanClassName: zo, nodeOrigin: oe, rfId: ta, autoPanOnConnect: _e, autoPanOnNodeDrag: Ae, onError: Io, connectionRadius: We, isValidConnection: Wt, nodeDragThreshold: O1 }),
      H.createElement(L6, { onSelectionChange: $ }),
      yn,
      H.createElement(c6, { proOptions: he, position: re }),
      H.createElement(W6, { rfId: ta, disableKeyboardA11y: ze })
    )
  );
});
Xf.displayName = "ReactFlow";
function G4() {
  return H.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
    H.createElement("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" })
  );
}
function X4() {
  return H.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5" },
    H.createElement("path", { d: "M0 0h32v4.2H0z" })
  );
}
function Q4() {
  return H.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30" },
    H.createElement("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" })
  );
}
function J4() {
  return H.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    H.createElement("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" })
  );
}
function e7() {
  return H.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    H.createElement("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" })
  );
}
const no = ({ children: e, className: t, ...n }) => H.createElement("button", { type: "button", className: $e(["react-flow__controls-button", t]), ...n }, e);
no.displayName = "ControlButton";
const t7 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom
}), Qf = ({ style: e, showZoom: t = !0, showFitView: n = !0, showInteractive: o = !0, fitViewOptions: r, onZoomIn: a, onZoomOut: i, onFitView: s, onInteractiveChange: c, className: u, children: l, position: d = "bottom-left" }) => {
  const f = Le(), [g, p] = fe(!1), { isInteractive: h, minZoomReached: m, maxZoomReached: x } = ke(t7, je), { zoomIn: b, zoomOut: y, fitView: w } = mt();
  if (ie(() => {
    p(!0);
  }, []), !g)
    return null;
  const S = () => {
    b(), a == null || a();
  }, k = () => {
    y(), i == null || i();
  }, M = () => {
    w(r), s == null || s();
  }, C = () => {
    f.setState({
      nodesDraggable: !h,
      nodesConnectable: !h,
      elementsSelectable: !h
    }), c == null || c(!h);
  };
  return H.createElement(
    uf,
    { className: $e(["react-flow__controls", u]), position: d, style: e, "data-testid": "rf__controls" },
    t && H.createElement(
      H.Fragment,
      null,
      H.createElement(
        no,
        { onClick: S, className: "react-flow__controls-zoomin", title: "zoom in", "aria-label": "zoom in", disabled: x },
        H.createElement(G4, null)
      ),
      H.createElement(
        no,
        { onClick: k, className: "react-flow__controls-zoomout", title: "zoom out", "aria-label": "zoom out", disabled: m },
        H.createElement(X4, null)
      )
    ),
    n && H.createElement(
      no,
      { className: "react-flow__controls-fitview", onClick: M, title: "fit view", "aria-label": "fit view" },
      H.createElement(Q4, null)
    ),
    o && H.createElement(no, { className: "react-flow__controls-interactive", onClick: C, title: "toggle interactivity", "aria-label": "toggle interactivity" }, h ? H.createElement(e7, null) : H.createElement(J4, null)),
    l
  );
};
Qf.displayName = "Controls";
var n7 = Te(Qf), ft;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(ft || (ft = {}));
function o7({ color: e, dimensions: t, lineWidth: n }) {
  return H.createElement("path", { stroke: e, strokeWidth: n, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}` });
}
function r7({ color: e, radius: t }) {
  return H.createElement("circle", { cx: t, cy: t, r: t, fill: e });
}
const a7 = {
  [ft.Dots]: "#91919a",
  [ft.Lines]: "#eee",
  [ft.Cross]: "#e2e2e2"
}, i7 = {
  [ft.Dots]: 1,
  [ft.Lines]: 1,
  [ft.Cross]: 6
}, s7 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function Jf({
  id: e,
  variant: t = ft.Dots,
  // only used for dots and cross
  gap: n = 20,
  // only used for lines and cross
  size: o,
  lineWidth: r = 1,
  offset: a = 2,
  color: i,
  style: s,
  className: c
}) {
  const u = ae(null), { transform: l, patternId: d } = ke(s7, je), f = i || a7[t], g = o || i7[t], p = t === ft.Dots, h = t === ft.Cross, m = Array.isArray(n) ? n : [n, n], x = [m[0] * l[2] || 1, m[1] * l[2] || 1], b = g * l[2], y = h ? [b, b] : x, w = p ? [b / a, b / a] : [y[0] / a, y[1] / a];
  return H.createElement(
    "svg",
    { className: $e(["react-flow__background", c]), style: {
      ...s,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0
    }, ref: u, "data-testid": "rf__background" },
    H.createElement("pattern", { id: d + e, x: l[0] % x[0], y: l[1] % x[1], width: x[0], height: x[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${w[0]},-${w[1]})` }, p ? H.createElement(r7, { color: f, radius: b / a }) : H.createElement(o7, { dimensions: y, color: f, lineWidth: r })),
    H.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${d + e})` })
  );
}
Jf.displayName = "Background";
var l7 = Te(Jf);
const e1 = "columns", t1 = "exposure", n1 = "tables", c7 = "feedback", o1 = "settings", Hn = "column-", r1 = "see-more-", u7 = 5, d7 = 100, f7 = 100, Ws = 272, Vs = 80, g7 = 12, p7 = Vs, a1 = 30, Cu = 4, h7 = 280, m7 = 80, qs = 0.05, i1 = "#7A899E", Us = "#E38E00", Ys = {
  Original: "#FDD835",
  Alias: "#40C8AE",
  Transformation: "#FF754C",
  Unchanged: "#BC3FBC",
  "Not sure": "#247efe",
  "Non select": "#BC3FBC"
}, Zs = {
  stroke: i1,
  strokeWidth: 1
}, s1 = {
  stroke: Us,
  strokeWidth: 2
}, l1 = {
  stroke: Us,
  strokeWidth: 1,
  strokeDasharray: 10
}, c1 = {
  type: "arrow",
  strokeWidth: 1,
  width: 24,
  height: 24,
  color: i1
}, u1 = {
  type: "arrow",
  strokeWidth: 1,
  width: 16,
  height: 16,
  color: Us
}, tt = (e) => e.id.startsWith(Hn), Jo = (e) => e.id.startsWith(r1), vo = (e) => !e.id.startsWith(Hn), d1 = (e, t, n, o, r) => {
  const [a, i] = r ? [n, o] : [o, n], [s, c] = r ? es(e, t) : es(t, e);
  return {
    id: `${a}-${i}`,
    source: a,
    target: i,
    sourceHandle: s,
    targetHandle: c,
    style: Zs,
    markerEnd: c1,
    type: n === o ? "selfConnecting" : e === t ? "smoothstep" : "default"
  };
}, Ks = (e, t, n) => ({
  id: e.table,
  data: { ...e, level: t, parent: n },
  position: { x: 100, y: 100 },
  type: "table",
  width: Ws,
  height: Vs
}), Qi = (e, t, n, o, r) => ({
  id: Nr(e, t),
  data: { column: t, table: e, viewsType: n, viewsCode: o, nodeType: r },
  parentNode: e,
  extent: "parent",
  draggable: !1,
  type: "column",
  position: { x: 100, y: 100 },
  height: a1
}), Ji = (e, t, n, o, r, a) => {
  const i = Gs(e, t), [s, c] = es(
    n,
    o
  );
  return {
    id: i,
    data: { type: r },
    source: e,
    target: t,
    sourceHandle: s,
    targetHandle: c,
    style: r === "direct" ? s1 : l1,
    zIndex: 1e3,
    markerEnd: u1,
    type: n === o ? "smoothstep" : "default",
    hidden: !a[r]
  };
}, Gs = (e, t) => Hn + `${e}-${t}`, Or = (e, t) => {
  e.style = { opacity: t ? 1 : 0.5 };
}, Bn = (e, t) => {
  var n;
  e.style = t ? ((n = e.data) == null ? void 0 : n.type) === "indirect" ? l1 : s1 : Zs, e.markerEnd = t ? u1 : c1;
}, es = (e, t) => e < t ? ["right", "left"] : e > t ? ["left", "right"] : e < 0 ? ["left", "left"] : ["right", "right"], b7 = (e, t) => {
  const n = {};
  e.forEach((a) => {
    vo(a) && (n[a.id] = a.data.level);
  });
  const o = {};
  e.filter((a) => a.type === "table").forEach((a) => o[a.id] = !0);
  const r = {};
  for (const a of t) {
    if (tt(a))
      continue;
    const i = o[a.source], s = o[a.target];
    if (!(i && s)) {
      if (i) {
        e.find((u) => u.id === a.target).data.tables.forEach((u) => {
          r[u.table] = a.target;
        });
        continue;
      }
      s && e.find((u) => u.id === a.source).data.tables.forEach((u) => {
        r[u.table] = a.source;
      });
    }
  }
  return { levelMap: n, tableNodes: o, seeMoreIdTableReverseMap: r };
}, Nr = (e, t) => Hn + `${e}/${t}`, Dr = (e, t) => r1 + e + "-" + (t ? "1" : "0"), Eu = (e, t) => {
  for (const n of e)
    if (n[0] === t[0] && n[1] === t[1])
      return !0;
  return !1;
}, _u = (e, t, n) => {
  e[t] = e[t] || [], e[t].push(...n);
}, ts = (e, t = 1) => e * (a1 + Cu) + t * Cu, ku = (e, t) => (n) => e <= n && n <= t, y7 = (e, t) => (n) => e < n && n < t, Au = (e, t) => {
  const n = e.findIndex((o) => o.id === t);
  n !== -1 && e.splice(n, 1);
}, Mu = (e, t, n) => e === -1 || n >= t ? t : n >= e ? n : e, xo = (e, t, n = !0) => {
  e.forEach((o) => {
    tt(o) || (o.hidden = !t, n && Bn(o, t));
  });
}, wo = (e, t, n = !0) => {
  e.forEach((o) => {
    tt(o) && (o.hidden = !t, n && Bn(o, t));
  });
}, v7 = (e) => Ne.get("upstreamTables", { table: e }), x7 = (e) => Ne.get("downstreamTables", { table: e }), w7 = (e) => Ne.get("getExposureDetails", {
  name: e
}), f1 = (e, t) => Ne.get("getColumns", {
  table: e,
  refresh: t
}), S7 = (e) => Ne.get("getConnectedColumns", e), C7 = (e) => Ne.get("sendFeedback", e), E7 = () => Ne.get("getLineageSettings", {}), vi = (e) => Ne.get("persistLineageSettings", e), g1 = () => Ne.get("init", {}), _7 = (e) => Ne.get("openFile", { url: e }), k7 = () => Ne.get("openChat", {}), p1 = (e) => Ne.get("showInfoNotification", { message: e }), A7 = () => Ne.get("previewFeature", {}), xi = (e) => Ne.get("columnLineage", { event: e }), M7 = (e) => Ne.get("telemetryEvents", e);
var T7 = /* @__PURE__ */ ((e) => (e.CANCEL = "cancel", e.END = "end", e.START = "start", e))(T7 || {});
const He = class He {
  static onCancel() {
    He.isCancelled = !0, He.inProgress = !1;
  }
  static cancel() {
    He.onCancel(), xi(
      "cancel"
      /* CANCEL */
    );
    const t = new CustomEvent("cll_cancelled", { detail: void 0 });
    document.dispatchEvent(t);
  }
  static start() {
    He.inProgress = !0, He.isCancelled = !1, He.linkCount = 0, xi(
      "start"
      /* START */
    );
  }
  static end() {
    He.inProgress = !1, xi(
      "end"
      /* END */
    ), M7({
      id: "columnLineageNumLinks",
      params: { num: He.linkCount }
    }), He.linkCount = 0;
  }
  static addLinks(t) {
    He.linkCount += t;
  }
  static showCllInProgressMsg() {
    p1(
      "Column lineage is in progress. Either wait for it to complete or cancel the current one."
    );
  }
};
Lo(He, "isCancelled", !1), Lo(He, "inProgress", !1), Lo(He, "linkCount", 0);
let Ie = He;
const h1 = (e, t) => e ? v7(t) : x7(t), m1 = (e, t) => e ? t + 1 : t - 1, b1 = (e, t, n, o, r, a, i = u7) => {
  const s = m1(r, a), c = (l) => {
    var p, h;
    const d = (h = (p = e.find((m) => m.id === l)) == null ? void 0 : p.data) == null ? void 0 : h.level, f = d1(a, d, o, l, r);
    t.find((m) => m.id === f.id) || t.push(f);
  };
  let u = 0;
  for (const l of n) {
    if (u >= i) {
      const f = Dr(o, r);
      e.push({
        id: f,
        data: { tables: n, prevTable: o, right: r, level: s },
        position: { x: 100, y: 100 },
        type: "seeMore",
        width: Ws,
        height: 100
      }), c(f);
      break;
    }
    e.find((f) => f.id === l.table) || (e.push(Ks(l, s, o)), u++), c(l.table);
  }
}, bn = (e, t) => {
  let n = 1 / 0;
  const o = {};
  for (const p of e)
    if (tt(p) && p.parentNode)
      p.parentNode in o || (o[p.parentNode] = 0), p.position = {
        x: g7,
        y: p7 + ts(o[p.parentNode])
      }, o[p.parentNode]++;
    else {
      const { level: h } = p.data;
      n = Math.min(n, h);
    }
  const r = {}, a = {}, i = {}, s = {}, c = {}, u = {};
  for (const p of t)
    tt(p) || Jo(e.find((h) => h.id === p.source)) || Jo(e.find((h) => h.id === p.target)) || (c[p.source] = c[p.source] || [], c[p.source].push(p.target), u[p.target] = u[p.target] || [], u[p.target].push(p.source));
  const l = (p) => {
    const { level: h } = p.data;
    if (a[h] = a[h] || [], !a[h].includes(p.id)) {
      i[p.id] = a[h].length, r[p.id] = 0;
      for (const m of a[h])
        r[p.id] += o[m] || 0;
      a[h].push(p.id);
    }
  }, d = (p, h) => {
    if (!s[p]) {
      s[p] = !0, l(e.find((m) => m.id === p));
      for (const m of h[p] || [])
        d(m, h);
    }
  };
  for (const p of e)
    tt(p) || Jo(p) || s[p.id] || (d(p.id, c), s[p.id] = !1, d(p.id, u));
  for (const p of e)
    tt(p) || Jo(p) && l(p);
  const f = (p) => {
    const h = i[p.id] || 0, m = r[p.id] || 0;
    return f7 + h * (Vs + m7) + ts(m, h);
  }, g = (p) => (p - n) * (Ws + h7) + d7;
  for (const p of e) {
    if (tt(p))
      continue;
    const { level: h } = p.data;
    p.position = { x: g(h), y: f(p) };
  }
}, O7 = (e, t) => (e.forEach((n) => Or(n, !0)), t.forEach((n) => Bn(n, !1)), [e, t]), So = (e, t, n) => {
  xo(t, !0), wo(t, !1);
  const o = {}, r = {}, a = (c, u) => {
    const l = [n], d = {};
    for (; l.length > 0; ) {
      const f = l.shift();
      d[f] = !0, o[f] = !0, t.forEach((g) => {
        g[c] === f && (r[g.id] = !0, d[g[u]] || l.push(g[u]));
      });
    }
  };
  a("source", "target"), a("target", "source");
  const i = [...t];
  i.forEach((c) => Bn(c, r[c.id]));
  const s = [...e];
  return s.forEach((c) => Or(c, !!o[c.id])), [s, i];
}, N7 = async (e, t, n, o, r, a, i, s, c, u, l) => {
  var k, M;
  const d = [], f = [], { column_lineage: g, confidence: p } = await S7({
    targets: r,
    upstreamExpansion: a,
    currAnd1HopTables: i,
    selectedColumn: s
  });
  Ie.addLinks(g.length);
  const h = g.filter(
    (C) => a ? Eu(r, C.source) : Eu(r, C.target)
  ), m = h.map((C) => a ? C.target : C.source), x = {}, b = ([C, T], D) => {
    x[C] = x[C] || [], x[C].find((F) => F.column === T) || x[C].push({ column: T, viewsType: D });
  }, y = (C, T, D, F, $) => {
    const P = Gs(D, F);
    f.find((E) => E.id === P) || f.push(
      Ji(
        D,
        F,
        t[C],
        t[T],
        $,
        l
      )
    );
  }, w = [], S = {};
  for (const C of h) {
    const T = C.source.join("/"), D = C.target.join("/"), F = ($) => u ? C.type : C.type === "indirect" ? "indirect" : $ || C.type;
    a ? (S[D] = S[D] || [], S[D].push(
      F(c[T])
    )) : (S[T] = S[T] || [], S[T].push(
      F(c[D])
    ));
  }
  for (const C in S)
    c[C] = S[C].some((T) => T === "direct") ? "direct" : "indirect";
  for (const C of h) {
    b(C.source), b(C.target, C.viewsType);
    const [T] = C.source, [D] = C.target, F = o[T], $ = o[D], P = C.source.join("/"), E = C.target.join("/"), A = Hn + P, _ = Hn + E, z = c[a ? E : P];
    if (F && $)
      y(T, D, A, _, z);
    else if (F) {
      const R = n[D];
      y(T, R, A, R, z), w.push(C);
    } else if ($) {
      const R = n[T];
      y(R, D, R, _, z), w.push(C);
    } else
      w.push(C);
  }
  for (const C in x)
    if (o[C]) {
      x[C].sort();
      for (const T of x[C]) {
        const D = {};
        h.filter((F) => F.target.join("/") === `${C}/${T.column}`).forEach((F) => {
          F.type !== "indirect" && (D[F.source.join("/")] = F.viewsCode || []);
        }), d.push(
          Qi(
            C,
            T.column,
            T.viewsType,
            D,
            (M = (k = e.find((F) => F.id = C)) == null ? void 0 : k.data) == null ? void 0 : M.nodeType
          )
        );
      }
    }
  return { nodes: d, edges: f, collectColumns: x, newCurr: m, confidence: p, seeMoreLineage: w };
}, D7 = (e, t) => {
  const n = [...e.nodes], o = [...e.edges], r = {}, a = {};
  return n.forEach((i) => r[i.id] = !0), o.forEach((i) => a[i.id] = !0), t.nodes.forEach((i) => {
    r[i.id] || n.push(i);
    const s = n.find((c) => c.id === i.id);
    if (s) {
      const c = i.data.viewsCode && Object.keys(i.data.viewsCode).length ? i.data.viewsCode : s.data.viewsCode;
      s.data = {
        ...s.data,
        ...i.data,
        viewsCode: c,
        viewsType: s.data.viewsType || i.data.viewsType
      };
    }
  }), t.edges.forEach((i) => !a[i.id] && o.push(i)), bn(n, o), [n, o];
}, R7 = (e, t) => {
  const n = e.filter((r) => vo(r)), o = t.filter((r) => vo(r));
  return [n, o];
}, Xs = async (e, t, n, o) => {
  const r = [...e], a = [...t], i = [
    { table: n, level: r.find((c) => c.id === n).data.level }
  ], s = {};
  for (; i.length > 0; ) {
    const { table: c, level: u } = i.shift();
    if (s[c])
      continue;
    s[c] = !0;
    const { tables: l } = await h1(o, c);
    b1(r, a, l, c, o, u), l.forEach((d) => {
      const f = r.find((g) => g.id === d.table);
      (f == null ? void 0 : f.data.materialization) === "ephemeral" && i.push({ table: d.table, level: f.data.level });
    });
  }
  return [r, a];
}, ns = async (e, t, n, o, r) => {
  const a = [...e], i = [...t];
  if (o >= r)
    return [a, i];
  const s = y7(o, r), c = a.find((l) => l.id === n).data.level, u = async (l) => {
    const d = [
      { table: n, level: c }
    ], f = {};
    for (; d.length > 0; ) {
      const g = d.shift();
      if (f[g.table])
        continue;
      f[g.table] = !0;
      const { tables: p } = await h1(l, g.table);
      b1(
        a,
        i,
        p,
        g.table,
        l,
        g.level,
        1 / 0
      );
      const h = m1(l, g.level);
      s(h) ? d.push(...p.map((m) => ({ table: m.table, level: h }))) : d.push(
        ...p.filter((m) => m.materialization === "ephemeral").map((m) => ({ table: m.table, level: h }))
      );
    }
  };
  return r > c && await u(!0), o < c && await u(!1), [a, i];
}, Tu = (e, t, n, o) => {
  if (!n)
    return -1;
  const r = o ? "source" : "target", a = o ? "target" : "source", i = o ? "upstreamCount" : "downstreamCount", s = {}, c = {};
  for (const g of e)
    tt(g) || (s[g.id] = g, c[g.id] = []);
  for (const g of t)
    tt(g) || c[g[r]].push(g[a]);
  const l = (() => {
    const g = [n], p = {};
    for (; g.length > 0; ) {
      const h = g.shift();
      if (p[h])
        continue;
      p[h] = !0;
      const m = s[h].data;
      if (m[i] !== 0) {
        if (c[h].length < m[i])
          return h;
        for (const x of c[h])
          g.push(x);
      }
    }
  })();
  if (!l)
    return -1;
  const { level: d } = s[n].data, { level: f } = s[l].data;
  return o ? f - d : d - f;
}, Co = (e, t, n) => [
  Tu(e, t, n, !1),
  Tu(e, t, n, !0)
], y1 = async (e, t, n, o, r, a, i, s, c, u) => {
  var S, k, M, C, T, D;
  let l = !1;
  const { levelMap: d, tableNodes: f, seeMoreIdTableReverseMap: g } = b7(e, t), p = (F) => e.find(($) => $.id === F), h = {}, m = {};
  let x = o.map((F) => [
    F.table,
    F.name
  ]), b = [];
  const y = {};
  let w = !0;
  for (; !(Ie.isCancelled || (x = x.filter((j) => !h[j.join("/")]), x.length === 0 && b.length === 0)); ) {
    const F = {};
    x.forEach((j) => {
      h[j.join("/")] = !0, F[j[0]] = !0;
    });
    const [$, P] = n ? ["source", "target"] : ["target", "source"], E = [], A = [], _ = [];
    let z = !1;
    for (const j of t) {
      if (tt(j))
        continue;
      const V = j[$], W = j[P], U = f[W] ? [(S = p(W)) == null ? void 0 : S.data] : (C = (M = (k = p(W)) == null ? void 0 : k.data) == null ? void 0 : M.tables) == null ? void 0 : C.filter(
        (Z) => !f[Z.table]
      );
      U == null || U.forEach((Z) => {
        if (!Z)
          return;
        const { table: K, materialization: Q } = Z;
        F[V] ? (z = !0, Q === "ephemeral" ? (_u(
          m,
          K,
          x.filter((te) => te[0] === V)
        ), A.push(K)) : E.push(K)) : b.includes(V) && (z = !0, Q === "ephemeral" ? (_u(
          m,
          K,
          m[V]
        ), A.push(K)) : (_.push(V), E.push(K)));
      });
    }
    if (!z)
      break;
    b = A;
    const R = Object.keys(F).concat(E);
    _.forEach((j) => {
      x.push(...m[j]), R.push(...m[j].map((V) => V[0]));
    });
    const N = await N7(
      e,
      d,
      g,
      f,
      x,
      n,
      Array.from(new Set(R)),
      c,
      y,
      w,
      u
    );
    w = !1, ((T = N.confidence) == null ? void 0 : T.confidence) === "low" && r(((D = N.confidence) == null ? void 0 : D.operator_list) || []), x = N.newCurr, !l && x.length > 0 && (l = !0);
    const [O, I] = D7(
      { nodes: s.getNodes(), edges: s.getEdges() },
      N
    );
    a(N.seeMoreLineage), bn(O, I), s.setNodes(O), s.setEdges(I), i(N.collectColumns);
  }
  return l;
}, z7 = (e, t, n, { prevTable: o, tables: r, right: a, level: i, lineage: s }, c) => {
  var f;
  const { table: u } = n;
  if (e.find((g) => g.id === u))
    return !1;
  e.push(Ks(n, i, o));
  const d = (f = e.find((g) => g.id === o)) == null ? void 0 : f.data.level;
  if (t.push(d1(d, i, o, u, a)), s == null || s.forEach((g) => {
    const p = Nr(g.source[0], g.source[1]), h = Nr(g.target[0], g.target[1]), m = {};
    if (a && s.filter((x) => x.target.join("/") === g.target.join("/")).forEach((x) => {
      m[x.source.join("/")] = x.viewsCode || [];
    }), a) {
      if (g.target[0] !== u)
        return;
      e.push(
        Qi(
          g.target[0],
          g.target[1],
          g.viewsType,
          m,
          n.nodeType
        )
      ), t.push(
        Ji(p, h, i - 1, i, g.type, c)
      );
    } else {
      if (g.source[0] !== u)
        return;
      e.push(
        Qi(
          g.source[0],
          g.source[1],
          g.viewsType,
          m,
          n.nodeType
        )
      ), t.push(
        Ji(p, h, i, i + 1, g.type, c)
      );
    }
  }), r.every((g) => !!e.find((p) => p.id === g.table))) {
    const g = Dr(o, a), p = a ? `${o}-${g}` : `${g}-${o}`;
    return Au(e, g), Au(t, p), !0;
  }
  return !1;
}, $n = async (e, t, n, o, r) => {
  var u;
  if (!n)
    return 0;
  const a = (u = e.find((l) => l.id === n)) == null ? void 0 : u.data;
  if (!a)
    return 0;
  const { level: i } = a, s = e.length, [c] = await ns(
    e,
    t,
    n,
    i - o,
    i + r
  );
  return c.length - s;
}, I7 = (e, t, n, o) => {
  if (!C6(e))
    return { nodes: [], edgeIds: [] };
  const r = n.filter((a) => (o ? a.target : a.source) === e.id);
  return {
    nodes: t.filter(
      (a) => r.find((i) => i.source === a.id || i.target === a.id)
    ),
    edgeIds: r.map((a) => Gs(a.source, a.target))
  };
}, os = (e, t, n, o = [], r) => {
  const { nodes: a, edgeIds: i } = I7(
    e,
    t,
    n,
    r
  );
  return a.reduce(
    (s, c) => {
      if (s.nodes.push(c), s.edges = Array.from(/* @__PURE__ */ new Set([...s.edges, ...i])), o.findIndex((u) => u.id == c.id) === -1) {
        o.push(c);
        const { nodes: u, edges: l } = os(
          c,
          t,
          n,
          o,
          r
        );
        u.forEach((d) => {
          s.nodes.push(d), o.findIndex((f) => f.id == d.id) === -1 && o.push(d);
        }), s.edges = Array.from(/* @__PURE__ */ new Set([...s.edges, ...l]));
      }
      return s;
    },
    { nodes: [], edges: [] }
  );
}, L7 = (e, t) => {
  const n = t.getNodes().filter((i) => tt(i)), o = t.getEdges();
  n.forEach((i) => {
    const s = t.getNode(i.id);
    s && Or(s, !1);
  }), o.forEach((i) => {
    const s = t.getEdge(i.id);
    s && (s.hidden = !0, Bn(s, !1));
  });
  const r = os(e, n, o, [], !0), a = os(e, n, o, [], !1);
  [r, a].forEach(({ nodes: i, edges: s }) => {
    i.forEach((c) => {
      const u = t.getNode(c.id);
      u && Or(u, !0);
    }), s.forEach((c) => {
      const u = t.getEdge(c);
      u && (u.hidden = !1, Bn(u, !0));
    });
  });
}, F7 = "_table_node_ux1x2_1", j7 = "_header_ux1x2_8", P7 = "_collapse_ux1x2_16", H7 = "_selected_ux1x2_21", B7 = "_content_ux1x2_24", $7 = "_table_header_ux1x2_37", W7 = "_seed_ux1x2_47", V7 = "_model_ux1x2_52", q7 = "_source_ux1x2_57", U7 = "_exposure_ux1x2_62", Y7 = "_snapshot_ux1x2_67", Z7 = "_metrics_ux1x2_72", K7 = "_macros_ux1x2_77", G7 = "_analysis_ux1x2_82", X7 = "_node_icon_ux1x2_87", Q7 = "_table_handle_ux1x2_100", J7 = "_see_more_node_ux1x2_114", e8 = "_table_card_ux1x2_125", t8 = "_disabled_ux1x2_137", n8 = "_column_card_ux1x2_142", o8 = "_edit_icon_ux1x2_155", r8 = "_active_ux1x2_163", a8 = "_expand_lineage_icon_ux1x2_167", i8 = "_processing_div_ux1x2_180", s8 = "_gif_img_ux1x2_183", l8 = "_card_ux1x2_188", c8 = "_column_node_ux1x2_195", u8 = "_column_name_ux1x2_206", d8 = "_column_top_right_ux1x2_211", f8 = "_divider_ux1x2_219", g8 = "_table_details_header_ux1x2_225", p8 = "_verticle_divider_ux1x2_233", h8 = "_low_confidence_ux1x2_238", m8 = "_high_confidence_ux1x2_245", b8 = "_alert_icon_ux1x2_252", y8 = "_menu_card_ux1x2_258", v8 = "_menu_card_container_ux1x2_263", x8 = "_table_details_tabs_ux1x2_270", w8 = "_tab_ux1x2_1", S8 = "_table_node_pill_ux1x2_290", C8 = "_icon_ux1x2_300", E8 = "_node-checkbox_ux1x2_307", _8 = "_non_select_node_checkbox_ux1x2_307", k8 = "_select_node_checkbox_ux1x2_307", A8 = "_node_extra_info_ux1x2_323", M8 = "_help_body_ux1x2_327", T8 = "_feedback_body_ux1x2_331", O8 = "_cancel_btn_ux1x2_334", N8 = "_expand_nav_ux1x2_339", D8 = "_expand_nav_btn_ux1x2_347", R8 = "_lineage_legend_ux1x2_374", z8 = "_column_legend_ux1x2_391", I8 = "_dot_ux1x2_407", L8 = "_model_views_type_ux1x2_419", F8 = "_modal_views_code_container_ux1x2_428", j8 = "_close_button_ux1x2_433", P8 = "_code_editor_container_ux1x2_446", H8 = "_code_editor_ux1x2_446", B8 = "_tooltip_container_ux1x2_460", $8 = "_tooltip_text_ux1x2_466", W8 = "_views_type_badge_ux1x2_483", V8 = "_column_code_icon_ux1x2_514", q8 = "_edge_select_ux1x2_530", U8 = "_edge_non_select_ux1x2_540", X = {
  table_node: F7,
  header: j7,
  collapse: P7,
  selected: H7,
  content: B7,
  table_header: $7,
  seed: W7,
  model: V7,
  source: q7,
  exposure: U7,
  snapshot: Y7,
  metrics: Z7,
  macros: K7,
  analysis: G7,
  node_icon: X7,
  table_handle: Q7,
  see_more_node: J7,
  table_card: e8,
  disabled: t8,
  column_card: n8,
  edit_icon: o8,
  active: r8,
  expand_lineage_icon: a8,
  processing_div: i8,
  gif_img: s8,
  card: l8,
  column_node: c8,
  default: "_default_ux1x2_203",
  column_name: u8,
  column_top_right: d8,
  divider: f8,
  table_details_header: g8,
  verticle_divider: p8,
  low_confidence: h8,
  high_confidence: m8,
  alert_icon: b8,
  menu_card: y8,
  menu_card_container: v8,
  table_details_tabs: x8,
  tab: w8,
  table_node_pill: S8,
  icon: C8,
  "node-checkbox": "_node-checkbox_ux1x2_307",
  nodeCheckbox: E8,
  non_select_node_checkbox: _8,
  select_node_checkbox: k8,
  node_extra_info: A8,
  help_body: M8,
  feedback_body: T8,
  cancel_btn: O8,
  expand_nav: N8,
  expand_nav_btn: D8,
  lineage_legend: R8,
  column_legend: z8,
  dot: I8,
  model_views_type: L8,
  modal_views_code_container: F8,
  close_button: j8,
  code_editor_container: P8,
  code_editor: H8,
  tooltip_container: B8,
  tooltip_text: $8,
  views_type_badge: W8,
  column_code_icon: V8,
  edge_select: q8,
  edge_non_select: U8
}, Y8 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M14.4138 13.7953L11.7681 11.9423C11.5927 11.8194 11.4733 11.6319 11.4361 11.421C11.399 11.2101 11.4471 10.9931 11.57 10.8177C11.6928 10.6422 11.8803 10.5228 12.0912 10.4857C12.3022 10.4485 12.5192 10.4966 12.6946 10.6195L15.3402 12.4725C15.5157 12.5953 15.6351 12.7828 15.6722 12.9937C15.7094 13.2047 15.6613 13.4217 15.5384 13.5971C15.4155 13.7725 15.228 13.8919 15.0171 13.9291C14.8062 13.9663 14.5892 13.9181 14.4138 13.7953Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M6.23472 10.7666C6.66662 10.7666 7.07057 10.5991 7.37216 10.2948L10.0514 7.59139C10.6629 6.97429 10.6502 5.98265 10.0231 5.38078C9.39602 4.77904 8.38821 4.79152 7.77672 5.40855L6.205 6.99435L5.92965 6.73088C5.30167 6.13015 4.29393 6.1439 3.6832 6.76187C3.07266 7.37983 3.08677 8.37148 3.71475 8.97241L5.12733 10.3241C5.42551 10.6095 5.81883 10.7666 6.23472 10.7666ZM4.41777 7.46468C4.63478 7.24508 4.9928 7.24052 5.21559 7.45375L5.85755 8.0681C6.0601 8.26201 6.38398 8.25765 6.58135 8.05864L8.51014 6.11251C8.72742 5.89323 9.0853 5.88901 9.3079 6.10258C9.53063 6.31635 9.53505 6.6685 9.31798 6.88763L6.63874 9.59098C6.43168 9.80891 6.05451 9.81354 5.84153 9.60145L4.42895 8.24974C4.20602 8.0363 4.2009 7.68409 4.41777 7.46468Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M1.2696 8.46259C1.23524 8.18365 0.981431 7.98549 0.702382 8.01991C0.423451 8.05439 0.225306 8.3085 0.259604 8.58741C0.29722 8.89279 0.35694 9.19928 0.43695 9.49824C0.894474 11.2074 1.99015 12.6358 3.52208 13.5203C5.05401 14.4047 6.83878 14.6394 8.54776 14.181C10.2568 13.7227 11.6852 12.6262 12.5701 11.0936C13.455 9.56087 13.6903 7.77555 13.2327 6.06641C12.2882 2.53813 8.64974 0.437554 5.12192 1.38363C2.71678 2.02867 0.892688 3.9422 0.361517 6.37751C0.301593 6.65214 0.475849 6.92324 0.750129 6.98306C1.02465 7.04286 1.29584 6.86868 1.35567 6.59407C1.80529 4.53259 3.34929 2.91276 5.38514 2.36679C8.37085 1.56596 11.4504 3.34395 12.2497 6.33007C12.637 7.77666 12.4378 9.28772 11.6889 10.5849C10.94 11.8821 9.73094 12.8101 8.28453 13.198C6.83821 13.5859 5.32757 13.3873 4.031 12.6388C2.73449 11.8902 1.80712 10.6813 1.41988 9.23469C1.35207 8.98094 1.30145 8.72123 1.2696 8.46259Z", fill: "currentColor" })), v1 = Y8, Z8 = (e) => /* @__PURE__ */ B.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 15 15", fill: "none", ...e }, /* @__PURE__ */ B.createElement("circle", { cx: 7.5, cy: 7.5, r: 6.9, stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ B.createElement("path", { d: "M7.05 7.5V7.95H7.5H11C11.1548 7.95 11.2873 8.01395 11.3684 8.10088C11.4447 8.18264 11.4755 8.28138 11.4504 8.39262C11.3415 8.87457 11.1448 9.33503 10.8675 9.75006C10.4224 10.4161 9.78991 10.9352 9.04987 11.2417C8.30983 11.5482 7.49551 11.6285 6.70988 11.4722C5.92426 11.3159 5.20262 10.9302 4.63622 10.3638C4.06981 9.79738 3.68409 9.07574 3.52782 8.29012C3.37155 7.50449 3.45175 6.69017 3.75829 5.95013C4.06482 5.21009 4.58392 4.57757 5.24994 4.13255C5.66497 3.85524 6.12543 3.65849 6.60738 3.54959C6.71862 3.52445 6.81736 3.55531 6.89912 3.6316C6.98605 3.71271 7.05 3.84521 7.05 4V7.5Z", stroke: "currentColor", strokeWidth: 0.9 })), x1 = Z8, K8 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 15, height: 15, viewBox: "0 0 11 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("g", { clipPath: "url(#clip0_19334_15206)" }, /* @__PURE__ */ B.createElement("path", { d: "M8.87489 5.27405C8.77129 5.27405 8.67194 5.3152 8.59868 5.38846C8.52543 5.46171 8.48428 5.56106 8.48428 5.66466V7.23702C8.48393 7.5407 8.36314 7.83185 8.1484 8.0466C7.93366 8.26133 7.64251 8.38213 7.33882 8.38247H2.86441C2.56073 8.38213 2.26958 8.26133 2.05484 8.0466C1.8401 7.83185 1.7193 7.5407 1.71896 7.23702V2.76261C1.7193 2.45892 1.8401 2.16777 2.05484 1.95303C2.26958 1.73829 2.56073 1.6175 2.86441 1.61715H4.43677C4.54037 1.61715 4.63972 1.576 4.71297 1.50275C4.78623 1.42949 4.82738 1.33014 4.82738 1.22654C4.82738 1.12295 4.78623 1.0236 4.71297 0.950344C4.63972 0.877091 4.54037 0.835938 4.43677 0.835938H2.86441C2.35362 0.836541 1.86391 1.03972 1.50272 1.40091C1.14153 1.7621 0.938347 2.25181 0.937744 2.76261V7.23702C0.938347 7.74782 1.14153 8.23752 1.50272 8.59871C1.86391 8.9599 2.35362 9.16308 2.86441 9.16369H7.33882C7.84962 9.16308 8.33933 8.9599 8.70052 8.59871C9.06171 8.23752 9.26489 7.74782 9.26549 7.23702V5.66466C9.26549 5.56106 9.22434 5.46171 9.15109 5.38846C9.07783 5.3152 8.97848 5.27405 8.87489 5.27405Z", fill: "#FFCE73" }), /* @__PURE__ */ B.createElement("path", { d: "M8.86633 0.832031H6.43805C6.33577 0.832012 6.23756 0.872113 6.16452 0.94372C6.09149 1.01533 6.04945 1.11273 6.04745 1.21499C6.04338 1.43422 6.22778 1.61325 6.44684 1.61325H7.93327L4.8224 4.72508C4.74916 4.79834 4.70801 4.89769 4.70801 5.00128C4.70801 5.10487 4.74916 5.20422 4.8224 5.27747C4.89566 5.35072 4.99501 5.39187 5.0986 5.39187C5.20219 5.39187 5.30154 5.35072 5.37479 5.27747L8.48663 2.16661V3.6584C8.48663 3.762 8.52778 3.86135 8.60103 3.9346C8.67429 4.00786 8.77364 4.04901 8.87724 4.04901C8.98083 4.04901 9.08018 4.00786 9.15344 3.9346C9.22669 3.86135 9.26784 3.762 9.26784 3.6584V1.23338C9.26784 1.18066 9.25746 1.12846 9.23728 1.07975C9.2171 1.03105 9.18752 0.986797 9.15023 0.949526C9.11295 0.912255 9.06868 0.882696 9.01997 0.862535C8.97126 0.842375 8.91905 0.83201 8.86633 0.832031Z", fill: "#FFCE73" })), /* @__PURE__ */ B.createElement("defs", null, /* @__PURE__ */ B.createElement("clipPath", { id: "clip0_19334_15206" }, /* @__PURE__ */ B.createElement("rect", { width: 10, height: 10, fill: "white", transform: "translate(0.101318)" })))), G8 = K8, X8 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M4.96894 9.82478V7.14121H4V6.5H6.67883V7.14121H5.68139V9.82478H4.96894Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M6.60431 10.485L8.57544 6.5H9.24039L7.27402 10.485H6.60431Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M9.7534 9.82478V6.5H10.4659V9.82478H9.7534ZM10.0811 8.50437V7.89166H11.8005V8.50437H10.0811ZM10.0811 7.14121V6.5H12V7.14121H10.0811Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("circle", { cx: 8, cy: 8.5, r: 6.5, stroke: "currentColor" })), Q8 = X8, J8 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M3 13.3L6.794 3.5H8.334L12.1 13.3H10.49L8.25 7.392C8.222 7.32667 8.166 7.168 8.082 6.916C8.00733 6.664 7.91867 6.384 7.816 6.076C7.71333 5.768 7.62 5.488 7.536 5.236C7.452 4.97467 7.396 4.80667 7.368 4.732L7.69 4.718C7.634 4.87667 7.564 5.07733 7.48 5.32C7.40533 5.56267 7.32133 5.81933 7.228 6.09C7.144 6.36067 7.06 6.61733 6.976 6.86C6.892 7.09333 6.822 7.28933 6.766 7.448L4.54 13.3H3ZM4.68 10.864L5.24 9.408H9.692L10.336 10.864H4.68Z", fill: "currentColor" })), e9 = J8, t9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M8.13796 13.5L9.81796 3.70001H11.078L9.39796 13.5H8.13796ZM3.43396 11.078V9.91601H11.54V11.078H3.43396ZM4.41396 13.5L6.09396 3.70001H7.35396L5.67396 13.5H4.41396ZM3.96596 7.15801V5.99601H12.058V7.15801H3.96596Z", fill: "currentColor" })), n9 = t9, o9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M3.86339 12.4999C3.56384 12.4353 3.3054 12.356 3.08808 12.262C2.87075 12.168 2.69161 12.0506 2.55064 11.9096C2.40967 11.7745 2.30395 11.61 2.23346 11.4162C2.16885 11.2282 2.13655 11.0109 2.13655 10.7642L2.14536 9.92723C2.14536 9.61593 2.07781 9.38392 1.94272 9.23121C1.80762 9.07262 1.61379 8.99039 1.36123 8.98452H1V8.01537H1.37885C1.63142 8.00949 1.82231 7.9302 1.95153 7.77749C2.08075 7.62477 2.14536 7.38983 2.14536 7.07265L2.13655 6.23566C2.13655 5.75402 2.27164 5.37811 2.54183 5.10792C2.81789 4.83186 3.25841 4.62922 3.86339 4.5L4.1189 5.38104C3.8957 5.4574 3.71949 5.53376 3.59027 5.61012C3.46692 5.68647 3.37882 5.78926 3.32596 5.91848C3.27897 6.04183 3.25547 6.21216 3.25547 6.42949L3.27309 7.196C3.27309 7.53667 3.17618 7.82154 2.98235 8.05061C2.79439 8.27968 2.50071 8.44414 2.10131 8.54399V8.44708C2.50071 8.55868 2.79439 8.72901 2.98235 8.95808C3.17618 9.18716 3.27309 9.46909 3.27309 9.80389L3.25547 10.5704C3.25547 10.776 3.27897 10.9375 3.32596 11.055C3.37882 11.1783 3.46692 11.2782 3.59027 11.3545C3.71949 11.4309 3.8957 11.5072 4.1189 11.5836L3.86339 12.4999Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M5.05191 12.3765V4.53524H7.55408V5.57487H6.17965L6.23251 5.50439V11.4426L6.1444 11.3369H7.55408V12.3765H5.05191Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M8.43567 12.3765V11.3369H9.8101L9.75724 11.4074V5.46915L9.84534 5.57487H8.43567V4.53524H10.9378V12.3765H8.43567Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M12.1366 12.4999L11.8723 11.6188C12.0955 11.5425 12.2688 11.4661 12.3921 11.3898C12.5155 11.3134 12.6036 11.2106 12.6564 11.0814C12.7152 10.9581 12.7445 10.7877 12.7445 10.5704L12.7269 9.80389C12.7269 9.46322 12.8209 9.17835 13.0088 8.94927C13.2027 8.7202 13.4964 8.55574 13.8899 8.45589L13.8987 8.5528C13.4993 8.44121 13.2027 8.27087 13.0088 8.0418C12.8209 7.81273 12.7269 7.53079 12.7269 7.196L12.7445 6.42949C12.7445 6.21804 12.7181 6.05358 12.6652 5.9361C12.6124 5.81863 12.5243 5.72171 12.4009 5.64536C12.2776 5.569 12.1014 5.49264 11.8723 5.41629L12.1366 4.5C12.4362 4.55874 12.6917 4.63803 12.9031 4.73788C13.1204 4.83186 13.2996 4.94933 13.4406 5.0903C13.5874 5.22539 13.6931 5.38986 13.7577 5.58368C13.8282 5.77164 13.8635 5.98897 13.8635 6.23566L13.8546 7.07265C13.8546 7.38395 13.9222 7.6189 14.0573 7.77749C14.1924 7.9302 14.3862 8.00949 14.6388 8.01537H15V8.98452H14.6212C14.3686 8.99039 14.1777 9.06968 14.0485 9.2224C13.9193 9.37511 13.8546 9.61006 13.8546 9.92723L13.8635 10.7642C13.8635 11.2459 13.7254 11.6218 13.4494 11.892C13.1733 12.168 12.7357 12.3707 12.1366 12.4999Z", fill: "currentColor" })), r9 = o9, a9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M5.33325 1.83398V3.83398", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M10.6667 1.83398V3.83398", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M2.33325 6.56055H13.6666", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M14 11.4073V6.16732C14 4.16732 13 2.83398 10.6667 2.83398H5.33333C3 2.83398 2 4.16732 2 6.16732V11.834C2 13.834 3 15.1673 5.33333 15.1673H10.2467", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M2 6.59464L2 11.8346C2 13.8346 3 15.168 5.33333 15.168L10.6667 15.168C13 15.168 14 13.8346 14 11.8346L14 6.16797C14 4.16797 13 2.83464 10.6667 2.83464L5.75333 2.83464", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M10.4955 9H10.5045", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M10.4955 12H10.5045", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M5.4955 9H5.5045", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M5.4955 12H5.5045", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })), i9 = a9, s9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M13 7.40909C13 11.2273 8 14.5 8 14.5C8 14.5 3 11.2273 3 7.40909C3 6.10712 3.52678 4.85847 4.46447 3.93784C5.40215 3.01721 6.67392 2.5 8 2.5C9.32608 2.5 10.5979 3.01721 11.5355 3.93784C12.4732 4.85847 13 6.10712 13 7.40909Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M8 9.5C9.10457 9.5 10 8.60457 10 7.5C10 6.39543 9.10457 5.5 8 5.5C6.89543 5.5 6 6.39543 6 7.5C6 8.60457 6.89543 9.5 8 9.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), l9 = s9, c9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.21021 4.09393C2.32237 3.84159 2.61785 3.72794 2.87019 3.84009L8.00046 6.12021L13.1307 3.84009C13.3831 3.72794 13.6785 3.84159 13.7907 4.09393C13.9029 4.34627 13.7892 4.64175 13.5369 4.7539L8.20353 7.12425C8.07426 7.18172 7.92666 7.18172 7.79739 7.12425L2.46405 4.7539C2.21171 4.64175 2.09806 4.34627 2.21021 4.09393Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.71387 1.35887C7.53267 0.994961 8.46733 0.994961 9.28613 1.35887L12.6195 2.84035C13.763 3.3486 14.5 4.48265 14.5 5.73408V10.2681C14.5 11.5195 13.763 12.6536 12.6195 13.1618L9.28613 14.6433C8.46733 15.0072 7.53267 15.0072 6.71387 14.6433L3.38056 13.1618C2.23699 12.6536 1.5 11.5195 1.5 10.2681V5.73408C1.5 4.48265 2.23699 3.3486 3.38056 2.84035L6.71387 1.35887ZM8.88 2.27268C8.31973 2.02369 7.68027 2.02369 7.12 2.27268L3.7867 3.75416C3.00425 4.10191 2.5 4.87784 2.5 5.73408V10.2681C2.5 11.1244 3.00426 11.9002 3.7867 12.248L7.12 13.7295C7.68027 13.9785 8.31973 13.9785 8.88 13.7295L12.2133 12.248C12.9957 11.9002 13.5 11.1244 13.5 10.2681V5.73408C13.5 4.87784 12.9957 4.10191 12.2133 3.75416L8.88 2.27268Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 6.16406C8.27613 6.16406 8.5 6.38792 8.5 6.66406V13.9974C8.5 14.2735 8.27613 14.4974 8 14.4974C7.72387 14.4974 7.5 14.2735 7.5 13.9974V6.66406C7.5 6.38792 7.72387 6.16406 8 6.16406Z", fill: "currentColor" })), u9 = c9, d9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M13.5445 3.32188L10.532 0.46875C10.2102 0.165625 9.79141 0 9.35078 0H3.61328C2.66641 0 1.89453 0.771875 1.89453 1.71875V14.2812C1.89453 15.2281 2.66641 16 3.61328 16H12.3633C13.3102 16 14.082 15.2281 14.082 14.2812V4.56875C14.082 4.1 13.8852 3.64375 13.5445 3.32188ZM12.6352 3.75H10.3008C10.2133 3.75 10.1445 3.68125 10.1445 3.59375V1.39375L12.6352 3.75ZM12.3633 15.0625H3.61328C3.18203 15.0625 2.83203 14.7125 2.83203 14.2812V1.71875C2.83203 1.2875 3.18203 0.9375 3.61328 0.9375H9.20703V3.59375C9.20703 4.19688 9.69766 4.6875 10.3008 4.6875H13.1445V14.2812C13.1445 14.7125 12.7945 15.0625 12.3633 15.0625Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M11.332 6.25H4.45703C4.19766 6.25 3.98828 6.45937 3.98828 6.71875C3.98828 6.97812 4.19766 7.1875 4.45703 7.1875H11.332C11.5914 7.1875 11.8008 6.97812 11.8008 6.71875C11.8008 6.45937 11.5914 6.25 11.332 6.25Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M11.332 8.75H4.45703C4.19766 8.75 3.98828 8.95937 3.98828 9.21875C3.98828 9.47812 4.19766 9.6875 4.45703 9.6875H11.332C11.5914 9.6875 11.8008 9.47812 11.8008 9.21875C11.8008 8.95937 11.5914 8.75 11.332 8.75Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M6.72891 11.25H4.45703C4.19766 11.25 3.98828 11.4594 3.98828 11.7188C3.98828 11.9781 4.19766 12.1875 4.45703 12.1875H6.72891C6.98828 12.1875 7.19766 11.9781 7.19766 11.7188C7.19766 11.4594 6.98828 11.25 6.72891 11.25Z", fill: "currentColor" })), f9 = d9, g9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M14.9459 3.20159C14.9296 2.34608 14.1459 1.58527 12.732 1.05955C11.4651 0.589349 9.7867 0.328125 8.01364 0.328125C6.23731 0.328125 4.56221 0.589349 3.292 1.05955C1.87813 1.58527 1.09119 2.34935 1.07812 3.20486C1.07812 3.21139 1.07812 3.22119 1.07812 3.22772V13.0889C1.07812 13.9575 1.86506 14.7249 3.292 15.2571C4.56221 15.7306 6.23731 15.9885 8.01364 15.9885C9.78996 15.9885 11.4651 15.7273 12.7353 15.2571C14.1622 14.7281 14.9491 13.9575 14.9491 13.0889V3.22772C14.9459 3.22119 14.9459 3.21139 14.9459 3.20159ZM13.9271 13.0889C13.9271 13.8563 11.6218 14.9698 8.01037 14.9698C4.39894 14.9698 2.09364 13.8563 2.09364 13.0889V11.3747C2.42017 11.5967 2.81853 11.7959 3.28874 11.9722C4.56221 12.4424 6.23731 12.7036 8.01364 12.7036C9.78996 12.7036 11.4683 12.4424 12.7353 11.9722C13.2055 11.7959 13.6038 11.5967 13.9304 11.3747V13.0889H13.9271ZM13.9271 9.78772C13.9271 9.79098 13.9271 9.79751 13.9271 9.80078C13.9271 10.5681 11.6218 11.6816 8.01037 11.6816C4.39894 11.6816 2.09364 10.5681 2.09364 9.80078V8.08649C2.42017 8.30853 2.81853 8.50772 3.28874 8.68404C4.55894 9.15751 6.23404 9.41547 8.01037 9.41547C9.7867 9.41547 11.4618 9.15425 12.732 8.68404C13.2022 8.51098 13.6006 8.30853 13.9271 8.08649V9.78772ZM13.9271 6.50282C13.9271 6.50608 13.9271 6.51261 13.9271 6.51588C13.9271 7.28323 11.6218 8.3967 8.01037 8.3967C4.39894 8.3967 2.09364 7.28323 2.09364 6.51588V4.80159C2.42017 5.02363 2.81853 5.22282 3.28874 5.39588C4.55894 5.86935 6.23404 6.12731 8.01037 6.12731C9.7867 6.12731 11.4618 5.86608 12.732 5.39588C13.1989 5.22282 13.6006 5.02037 13.9271 4.80159V6.50282ZM8.01364 5.10853C4.40221 5.10853 2.0969 3.99506 2.0969 3.22772C2.0969 2.46037 4.40221 1.3469 8.01364 1.3469C11.6251 1.3469 13.9304 2.46037 13.9304 3.22772C13.9271 3.99506 11.6251 5.10853 8.01364 5.10853Z", fill: "currentColor" })), p9 = g9, h9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M14.4866 5.36855C15.0957 6.86998 15.165 8.53621 14.6829 10.0831C14.2007 11.6299 13.1969 12.9616 11.8425 13.8511C10.4882 14.7405 8.86727 15.1325 7.25618 14.9604C5.64508 14.7882 4.1436 14.0624 3.00781 12.9069C1.87202 11.7514 1.17225 10.2376 1.02786 8.62381C0.883469 7.00999 1.30339 5.39605 2.21601 4.05724C3.12863 2.71844 4.47742 1.73768 6.03236 1.28224C7.58731 0.826792 9.25209 0.924866 10.7428 1.55973C10.7925 1.58093 10.8376 1.61172 10.8755 1.65034C10.9133 1.68896 10.9432 1.73466 10.9634 1.78482C10.9836 1.83499 10.9937 1.88864 10.9931 1.94271C10.9926 1.99678 10.9814 2.05022 10.9602 2.09997C10.939 2.14972 10.9082 2.1948 10.8696 2.23265C10.831 2.2705 10.7853 2.30037 10.7351 2.32056C10.685 2.34075 10.6313 2.35086 10.5772 2.35031C10.5232 2.34977 10.4697 2.33858 10.42 2.31738C9.78137 2.05018 9.10237 1.89233 8.41139 1.85044V2.23914C8.41139 2.34835 8.36801 2.45308 8.29079 2.53031C8.21357 2.60753 8.10883 2.65091 7.99963 2.65091C7.89042 2.65091 7.78569 2.60753 7.70846 2.53031C7.63124 2.45308 7.58786 2.34835 7.58786 2.23914V1.84962C6.23566 1.92718 4.94927 2.45909 3.93716 3.35914L4.21139 3.63914C4.27086 3.71844 4.29974 3.81652 4.29271 3.91539C4.28568 4.01426 4.24323 4.10728 4.17314 4.17736C4.10306 4.24745 4.01004 4.2899 3.91117 4.29693C3.8123 4.30396 3.71422 4.27508 3.63492 4.21561L3.35492 3.94138C2.45563 4.95419 1.92309 6.24001 1.84293 7.59208H2.23492C2.34413 7.59208 2.44887 7.63546 2.52609 7.71268C2.60331 7.7899 2.64669 7.89464 2.64669 8.00384C2.64669 8.11305 2.60331 8.21779 2.52609 8.29501C2.44887 8.37223 2.34413 8.41561 2.23492 8.41561H1.84293C1.92277 9.76775 2.45536 11.0537 3.35492 12.0663L3.63492 11.7921C3.71422 11.7326 3.8123 11.7037 3.91117 11.7108C4.01004 11.7178 4.10306 11.7602 4.17314 11.8303C4.24323 11.9004 4.28568 11.9934 4.29271 12.0923C4.29974 12.1912 4.27086 12.2893 4.21139 12.3685L3.93386 12.6461C4.94651 13.5477 6.23421 14.0805 7.58786 14.1581V13.7685C7.58786 13.6593 7.63124 13.5546 7.70846 13.4774C7.78569 13.4002 7.89042 13.3568 7.99963 13.3568C8.10883 13.3568 8.21357 13.4002 8.29079 13.4774C8.36801 13.5546 8.41139 13.6593 8.41139 13.7685V14.1581C9.76359 14.0805 11.05 13.5486 12.0621 12.6485L11.7879 12.3685C11.7284 12.2893 11.6995 12.1912 11.7065 12.0923C11.7136 11.9934 11.756 11.9004 11.8261 11.8303C11.8962 11.7602 11.9892 11.7178 12.0881 11.7108C12.1869 11.7037 12.285 11.7326 12.3643 11.7921L12.6419 12.0696C13.5435 11.0568 14.0768 9.76931 14.1555 8.41561H13.7643C13.6551 8.41561 13.5504 8.37223 13.4732 8.29501C13.3959 8.21779 13.3526 8.11305 13.3526 8.00384C13.3526 7.89464 13.3959 7.7899 13.4732 7.71268C13.5504 7.63546 13.6551 7.59208 13.7643 7.59208H14.1563C14.116 6.93556 13.97 6.28984 13.724 5.67985C13.7015 5.62939 13.6893 5.57492 13.6883 5.51968C13.6873 5.46444 13.6974 5.40957 13.7181 5.35832C13.7387 5.30707 13.7694 5.26049 13.8084 5.22137C13.8474 5.18224 13.8939 5.15137 13.9451 5.13058C13.9963 5.1098 14.0511 5.09953 14.1064 5.10038C14.1616 5.10124 14.2161 5.1132 14.2667 5.13556C14.3172 5.15791 14.3627 5.19021 14.4005 5.23052C14.4382 5.27083 14.4675 5.31834 14.4866 5.3702V5.36855ZM9.13363 6.28679L12.6501 2.7695C12.7274 2.69218 12.8323 2.64874 12.9416 2.64874C13.051 2.64874 13.1558 2.69218 13.2332 2.7695C13.3105 2.84682 13.3539 2.95168 13.3539 3.06103C13.3539 3.17037 13.3105 3.27524 13.2332 3.35256L9.71586 6.86902C9.94005 7.20496 10.0593 7.59997 10.0584 8.00384C10.0584 8.41104 9.9377 8.80909 9.71147 9.14766C9.48525 9.48624 9.1637 9.75012 8.7875 9.90595C8.4113 10.0618 7.99734 10.1025 7.59797 10.0231C7.1986 9.94367 6.83175 9.74758 6.54382 9.45965C6.25589 9.17172 6.0598 8.80487 5.98036 8.4055C5.90092 8.00613 5.9417 7.59217 6.09752 7.21597C6.25335 6.83977 6.51723 6.51822 6.85581 6.292C7.19438 6.06577 7.59243 5.94502 7.99963 5.94502C8.40303 5.94474 8.79742 6.06426 9.1328 6.28843L9.13363 6.28679ZM9.23492 8.00384C9.23492 7.75953 9.16247 7.5207 9.02674 7.31755C8.891 7.11441 8.69807 6.95608 8.47235 6.86258C8.24663 6.76909 7.99826 6.74462 7.75863 6.79229C7.51901 6.83995 7.2989 6.9576 7.12614 7.13036C6.95338 7.30312 6.83573 7.52323 6.78807 7.76285C6.7404 8.00247 6.76487 8.25085 6.85836 8.47657C6.95186 8.70229 7.11019 8.89522 7.31333 9.03095C7.51648 9.16669 7.75531 9.23914 7.99963 9.23914C8.32725 9.23914 8.64145 9.10899 8.87311 8.87733C9.10477 8.64567 9.23492 8.33146 9.23492 8.00384Z", fill: "currentColor" })), m9 = h9, b9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.66065 10.0305L7.83899 6.409C7.78126 6.25246 7.74974 6.08317 7.74974 5.90684C7.74974 5.09996 8.41001 4.4461 9.22481 4.4461C10.0396 4.4461 10.6746 5.07534 10.6994 5.86067L14.0017 7.0057C14.2721 6.6913 14.6753 6.49167 15.1251 6.49167C15.3791 6.49167 15.618 6.55499 15.8262 6.66711L19.6333 3.44619C19.5792 3.29448 19.5499 3.13091 19.5499 2.96074C19.5499 2.15386 20.2101 1.5 21.0249 1.5C21.8397 1.5 22.5 2.15386 22.5 2.96074C22.5 3.76762 21.8397 4.42148 21.0249 4.42148C20.7709 4.42148 20.5321 4.35816 20.3238 4.24603L16.5167 7.46696C16.5709 7.61866 16.6002 7.78224 16.6002 7.95241C16.6002 8.75929 15.9399 9.41315 15.1251 9.41315C14.3103 9.41315 13.6753 8.78391 13.6509 7.99858L10.3486 6.85355C10.0782 7.16795 9.6755 7.36758 9.22525 7.36758C8.97748 7.36758 8.74392 7.3069 8.53922 7.20005L4.36089 10.8216C4.41862 10.9781 4.45014 11.1474 4.45014 11.3237C4.45014 12.1306 3.78987 12.7845 2.97507 12.7845C2.16027 12.7845 1.5 12.1306 1.5 11.3237C1.5 10.5168 2.16027 9.86298 2.97507 9.86298C3.22284 9.86298 3.45596 9.92366 3.66065 10.0305ZM19.9024 7.30646C19.5356 7.30646 19.2364 7.60283 19.2364 7.96604V21.4267C19.2364 21.7899 19.5356 22.0862 19.9024 22.0862H20.8149C21.1817 22.0862 21.4809 21.7899 21.4809 21.4267V7.9656C21.4809 7.60239 21.1817 7.30602 20.8149 7.30602L19.9024 7.30646ZM14.0021 12.6855C13.6354 12.6855 13.3361 12.9819 13.3361 13.3451V21.5647C13.3361 21.9279 13.6354 22.2243 14.0021 22.2243H14.9146C15.2814 22.2243 15.5807 21.9279 15.5807 21.5647V13.3451C15.5807 12.9819 15.2814 12.6855 14.9146 12.6855H14.0021ZM8.1023 10.7543C7.73553 10.7543 7.43625 11.0507 7.43625 11.4139V21.7028C7.43625 22.066 7.73553 22.3624 8.1023 22.3624H9.01478C9.38155 22.3624 9.68083 22.066 9.68083 21.7028V11.4134C9.68083 11.0502 9.38155 10.7538 9.01478 10.7538L8.1023 10.7543ZM2.20246 16.4315H3.11494C3.48171 16.4315 3.78099 16.7278 3.78099 17.091V21.8404C3.78099 22.2036 3.48171 22.5 3.11494 22.5H2.20246C1.83569 22.5 1.53641 22.2036 1.53641 21.8404V17.091C1.53641 16.7278 1.83569 16.4315 2.20246 16.4315Z", fill: "currentColor" })), y9 = b9, v9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M13.674 3.5H11.527L11.277 2.75C11.1565 2.38583 10.9242 2.06897 10.6131 1.84453C10.302 1.62009 9.92808 1.49953 9.5445 1.5H6.4555C6.07202 1.49971 5.69821 1.62035 5.38726 1.84477C5.0763 2.06919 4.84403 2.38596 4.7235 2.75L4.473 3.5H2.326C1.84188 3.50053 1.37773 3.69308 1.03541 4.03541C0.693081 4.37774 0.500529 4.84188 0.5 5.326V12.676C0.501058 13.1598 0.693843 13.6234 1.03611 13.9653C1.37838 14.3072 1.84222 14.4995 2.326 14.5H13.676C14.1598 14.4989 14.6234 14.3062 14.9653 13.9639C15.3072 13.6216 15.4995 13.1578 15.5 12.674V5.324C15.4989 4.84023 15.3062 4.3766 14.9639 4.0347C14.6216 3.69281 14.1578 3.50053 13.674 3.5ZM14.5 12.674C14.4997 12.893 14.4126 13.1029 14.2578 13.2578C14.1029 13.4126 13.893 13.4997 13.674 13.5H2.326C2.10701 13.4997 1.89707 13.4126 1.74222 13.2578C1.58737 13.1029 1.50026 12.893 1.5 12.674V5.324C1.50079 5.10536 1.58814 4.89593 1.74293 4.74152C1.89772 4.5871 2.10736 4.50026 2.326 4.5H4.8335C4.9384 4.49992 5.04061 4.46685 5.12568 4.40548C5.21074 4.3441 5.27435 4.25752 5.3075 4.158L5.672 3.0645C5.72673 2.90003 5.83189 2.75697 5.97253 2.65564C6.11317 2.55431 6.28216 2.49985 6.4555 2.5H9.5445C9.71792 2.49981 9.88699 2.55431 10.0277 2.65575C10.1683 2.75718 10.2734 2.90039 10.328 3.065L10.6925 4.158C10.7256 4.25752 10.7893 4.3441 10.8743 4.40548C10.9594 4.46685 11.0616 4.49992 11.1665 4.5H13.674C13.893 4.50027 14.1029 4.58738 14.2578 4.74222C14.4126 4.89707 14.4997 5.10701 14.5 5.326V12.674Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M8 5C7.25832 5 6.5333 5.21993 5.91661 5.63199C5.29993 6.04404 4.81928 6.62971 4.53545 7.31494C4.25162 8.00016 4.17736 8.75416 4.32206 9.48159C4.46675 10.209 4.8239 10.8772 5.34835 11.4017C5.8728 11.9261 6.54098 12.2833 7.26841 12.4279C7.99584 12.5726 8.74984 12.4984 9.43506 12.2145C10.1203 11.9307 10.706 11.4501 11.118 10.8334C11.5301 10.2167 11.75 9.49168 11.75 8.75C11.7489 7.75576 11.3535 6.80255 10.6505 6.09952C9.94745 5.39649 8.99424 5.00106 8 5ZM8 11.5C7.4561 11.5 6.92442 11.3387 6.47218 11.0365C6.01995 10.7344 5.66747 10.3049 5.45933 9.80238C5.25119 9.29988 5.19673 8.74695 5.30284 8.2135C5.40895 7.68005 5.67086 7.19005 6.05546 6.80546C6.44005 6.42086 6.93006 6.15895 7.4635 6.05284C7.99695 5.94673 8.54988 6.00119 9.05238 6.20933C9.55488 6.41747 9.98437 6.76995 10.2865 7.22218C10.5887 7.67442 10.75 8.2061 10.75 8.75C10.7492 9.4791 10.4592 10.1781 9.94367 10.6937C9.42811 11.2092 8.7291 11.4992 8 11.5Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M13 6.5C13.2761 6.5 13.5 6.27614 13.5 6C13.5 5.72386 13.2761 5.5 13 5.5C12.7239 5.5 12.5 5.72386 12.5 6C12.5 6.27614 12.7239 6.5 13 6.5Z", fill: "currentColor" })), x9 = v9, w9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("g", { clipPath: "url(#clip0_13119_16577)" }, /* @__PURE__ */ B.createElement("mask", { id: "mask0_13119_16577", style: {
  maskType: "luminance"
}, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 16, height: 16 }, /* @__PURE__ */ B.createElement("path", { d: "M0 9.53674e-07H16V16H0V9.53674e-07Z", fill: "white" })), /* @__PURE__ */ B.createElement("g", { mask: "url(#mask0_13119_16577)" }, /* @__PURE__ */ B.createElement("path", { d: "M0.46875 15.5312H15.5312", stroke: "currentColor", strokeWidth: 0.8, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M3 11.7812H1.75C1.57741 11.7812 1.4375 11.9212 1.4375 12.0938V15.5312H3.3125V12.0938C3.3125 11.9212 3.17259 11.7812 3 11.7812Z", stroke: "currentColor", strokeWidth: 0.8, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M6.75 10.6562H5.5C5.32741 10.6562 5.1875 10.7962 5.1875 10.9688V15.5312H7.0625V10.9688C7.0625 10.7962 6.92259 10.6562 6.75 10.6562Z", stroke: "currentColor", strokeWidth: 0.8, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M10.5 8.9375H9.25C9.07741 8.9375 8.9375 9.07741 8.9375 9.25V15.5312H10.8125V9.25C10.8125 9.07741 10.6726 8.9375 10.5 8.9375Z", stroke: "currentColor", strokeWidth: 0.8, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M14.25 5.8125H13C12.8274 5.8125 12.6875 5.95241 12.6875 6.125V15.5312H14.5625V6.125C14.5625 5.95241 14.4226 5.8125 14.25 5.8125Z", stroke: "currentColor", strokeWidth: 0.8, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M0.46875 9.60156C6.62566 9.60156 12.7826 4.89466 14.7636 0.467189", stroke: "currentColor", strokeWidth: 0.8, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ B.createElement("path", { d: "M11.8994 1.23884L14.7641 0.47125L15.5317 3.33594", stroke: "currentColor", strokeWidth: 0.8, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }))), /* @__PURE__ */ B.createElement("defs", null, /* @__PURE__ */ B.createElement("clipPath", { id: "clip0_13119_16577" }, /* @__PURE__ */ B.createElement("rect", { width: 16, height: 16, fill: "white" })))), S9 = w9, C9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("g", { clipPath: "url(#clip0_13132_13629)" }, /* @__PURE__ */ B.createElement("path", { d: "M14.9389 11.3569L12.3125 9.88281L14.9389 8.40875C15.2577 8.22978 15.2573 7.76997 14.9389 7.59122L12.3126 6.11709L14.9388 4.64313C15.2577 4.46416 15.2573 4.00434 14.9388 3.82559L8.2295 0.06C8.08697 -0.02 7.91315 -0.02 7.77062 0.06L1.06128 3.82562C0.742402 4.00462 0.742871 4.46444 1.06128 4.64316L3.68762 6.11719L1.06125 7.59122C0.742371 7.77022 0.74284 8.23003 1.06125 8.40875L3.68762 9.88281L1.06125 11.3569C0.742371 11.5359 0.74284 11.9957 1.06125 12.1744L7.77062 15.94C7.91309 16.02 8.08697 16.02 8.2295 15.94L14.9389 12.1744C15.2577 11.9954 15.2573 11.5356 14.9389 11.3569ZM8.00006 1.00628L13.7517 4.23438L8.00006 7.46247L2.24843 4.23438L8.00006 1.00628ZM4.6454 6.65472L7.77065 8.40875C7.91312 8.48872 8.087 8.48875 8.22953 8.40875L11.3549 6.65462L13.7518 7.99997L8.00006 11.2281L2.24843 8L4.6454 6.65472ZM8.00006 14.9937L2.2484 11.7656L4.64537 10.4203L7.77062 12.1744C7.91309 12.2543 8.08697 12.2544 8.2295 12.1744L11.3547 10.4203L13.7517 11.7656L8.00006 14.9937Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M8 10.1484C8.25888 10.1484 8.46875 9.93857 8.46875 9.67969C8.46875 9.4208 8.25888 9.21094 8 9.21094C7.74112 9.21094 7.53125 9.4208 7.53125 9.67969C7.53125 9.93857 7.74112 10.1484 8 10.1484Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M6.2832 9.25C6.54209 9.25 6.75195 9.04013 6.75195 8.78125C6.75195 8.52237 6.54209 8.3125 6.2832 8.3125C6.02432 8.3125 5.81445 8.52237 5.81445 8.78125C5.81445 9.04013 6.02432 9.25 6.2832 9.25Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M4.56738 8.39062C4.82627 8.39062 5.03613 8.18076 5.03613 7.92188C5.03613 7.66299 4.82627 7.45312 4.56738 7.45312C4.3085 7.45312 4.09863 7.66299 4.09863 7.92188C4.09863 8.18076 4.3085 8.39062 4.56738 8.39062Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M9.7168 9.25C9.97568 9.25 10.1855 9.04013 10.1855 8.78125C10.1855 8.52237 9.97568 8.3125 9.7168 8.3125C9.45791 8.3125 9.24805 8.52237 9.24805 8.78125C9.24805 9.04013 9.45791 9.25 9.7168 9.25Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M11.4326 8.39062C11.6915 8.39062 11.9014 8.18076 11.9014 7.92188C11.9014 7.66299 11.6915 7.45312 11.4326 7.45312C11.1737 7.45312 10.9639 7.66299 10.9639 7.92188C10.9639 8.18076 11.1737 8.39062 11.4326 8.39062Z", fill: "currentColor" })), /* @__PURE__ */ B.createElement("defs", null, /* @__PURE__ */ B.createElement("clipPath", { id: "clip0_13132_13629" }, /* @__PURE__ */ B.createElement("rect", { width: 16, height: 16, fill: "white" })))), E9 = C9, _9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 11, height: 6, viewBox: "0 0 11 6", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M0.812951 5.52021C0.990462 5.69772 1.26824 5.71386 1.46398 5.56862L1.52006 5.52021L5.83317 1.20732L10.1463 5.52021C10.3238 5.69772 10.6016 5.71386 10.7973 5.56862L10.8534 5.52021C11.0309 5.3427 11.047 5.06492 10.9018 4.86918L10.8534 4.8131L6.18672 0.146439C6.00921 -0.031072 5.73144 -0.047207 5.5357 0.0980275L5.47962 0.146439L0.812951 4.8131C0.617688 5.00836 0.617688 5.32495 0.812951 5.52021Z", fill: "currentColor" })), k9 = _9, A9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 11, height: 6, viewBox: "0 0 11 6", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M0.812951 0.47979C0.990462 0.302279 1.26824 0.286142 1.46398 0.431378L1.52006 0.47979L5.83317 4.79268L10.1463 0.47979C10.3238 0.302279 10.6016 0.286142 10.7973 0.431378L10.8534 0.47979C11.0309 0.657301 11.047 0.935077 10.9018 1.13082L10.8534 1.1869L6.18672 5.85356C6.00921 6.03107 5.73144 6.04721 5.5357 5.90198L5.47962 5.85356L0.812951 1.1869C0.617688 0.991635 0.617688 0.675052 0.812951 0.47979Z", fill: "currentColor" })), M9 = A9, T9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("g", { id: "x-close" }, /* @__PURE__ */ B.createElement("path", { id: "Icon", d: "M12 4L4 12M4 4L12 12", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }))), w1 = T9, O9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 10 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("g", { clipPath: "url(#clip0_8292_48040)" }, /* @__PURE__ */ B.createElement("path", { d: "M6.46776 1.25L6.46776 1.66667L4.16929 1.66667C4.11388 1.66667 4.06073 1.68862 4.02154 1.72769C3.98236 1.76676 3.96034 1.81975 3.96034 1.875L3.96034 4.79167L2.49768 4.79167L2.49768 4.375C2.49768 4.20924 2.43164 4.05027 2.31408 3.93306C2.19652 3.81585 2.03708 3.75 1.87083 3.75L0.826073 3.75C0.65982 3.75 0.500378 3.81585 0.38282 3.93306C0.265262 4.05027 0.199219 4.20924 0.199219 4.375L0.199219 5.625C0.199219 5.79076 0.265262 5.94973 0.38282 6.06694C0.500378 6.18415 0.659821 6.25 0.826073 6.25L1.87083 6.25C2.03708 6.25 2.19652 6.18415 2.31408 6.06694C2.43164 5.94973 2.49768 5.79076 2.49768 5.625L2.49768 5.20833L3.96034 5.20833L3.96034 8.125C3.96034 8.18025 3.98236 8.23324 4.02154 8.27231C4.06073 8.31138 4.11388 8.33333 4.16929 8.33333L6.46776 8.33333L6.46776 8.75C6.46776 8.91576 6.5338 9.07473 6.65136 9.19194C6.76892 9.30915 6.92836 9.375 7.09461 9.375L8.13937 9.375C8.30562 9.375 8.46506 9.30915 8.58262 9.19194C8.70018 9.07473 8.76622 8.91576 8.76622 8.75L8.76622 7.5C8.76622 7.33424 8.70018 7.17527 8.58262 7.05806C8.46506 6.94085 8.30562 6.875 8.13937 6.875L7.09461 6.875C6.92836 6.875 6.76892 6.94085 6.65136 7.05806C6.5338 7.17527 6.46776 7.33424 6.46776 7.5L6.46776 7.91667L4.37825 7.91667L4.37825 5.20833L6.46776 5.20833L6.46776 5.625C6.46776 5.79076 6.5338 5.94973 6.65136 6.06694C6.76892 6.18415 6.92836 6.25 7.09461 6.25L8.13937 6.25C8.30562 6.25 8.46506 6.18415 8.58262 6.06694C8.70018 5.94973 8.76622 5.79076 8.76622 5.625L8.76622 4.375C8.76622 4.20924 8.70018 4.05027 8.58262 3.93306C8.46506 3.81585 8.30562 3.75 8.13937 3.75L7.09461 3.75C6.92836 3.75 6.76892 3.81585 6.65136 3.93306C6.5338 4.05027 6.46776 4.20924 6.46776 4.375L6.46776 4.79167L4.37825 4.79167L4.37825 2.08333L6.46776 2.08333L6.46776 2.5C6.46776 2.66576 6.5338 2.82473 6.65136 2.94194C6.76892 3.05915 6.92836 3.125 7.09461 3.125L8.13937 3.125C8.30562 3.125 8.46506 3.05915 8.58262 2.94194C8.70018 2.82473 8.76622 2.66576 8.76622 2.5L8.76622 1.25C8.76622 1.08424 8.70018 0.925271 8.58262 0.80806C8.46506 0.69085 8.30562 0.625002 8.13937 0.625002L7.09461 0.625002C6.92836 0.625002 6.76892 0.69085 6.65136 0.80806C6.5338 0.925271 6.46776 1.08424 6.46776 1.25ZM1.87083 5.83333L0.826073 5.83333C0.770655 5.83333 0.717508 5.81138 0.678322 5.77232C0.639136 5.73324 0.617121 5.68025 0.617121 5.625L0.617121 4.375C0.617121 4.31975 0.639136 4.26676 0.678322 4.22769C0.717508 4.18862 0.770655 4.16667 0.826073 4.16667L1.87083 4.16667C1.92625 4.16667 1.97939 4.18862 2.01858 4.22769C2.05777 4.26676 2.07978 4.31975 2.07978 4.375L2.07978 5.625C2.07978 5.68025 2.05777 5.73324 2.01858 5.77231C1.97939 5.81138 1.92625 5.83333 1.87083 5.83333ZM7.09461 7.29167L8.13937 7.29167C8.19479 7.29167 8.24793 7.31362 8.28712 7.35269C8.32631 7.39176 8.34832 7.44475 8.34832 7.5L8.34832 8.75C8.34832 8.80525 8.32631 8.85824 8.28712 8.89731C8.24793 8.93638 8.19479 8.95833 8.13937 8.95833L7.09461 8.95833C7.0392 8.95833 6.98605 8.93638 6.94686 8.89731C6.90768 8.85824 6.88566 8.80525 6.88566 8.75L6.88566 7.5C6.88566 7.44475 6.90768 7.39176 6.94686 7.35269C6.98605 7.31362 7.0392 7.29167 7.09461 7.29167ZM7.09461 4.16667L8.13937 4.16667C8.19479 4.16667 8.24793 4.18862 8.28712 4.22769C8.32631 4.26676 8.34832 4.31975 8.34832 4.375L8.34832 5.625C8.34832 5.68025 8.32631 5.73324 8.28712 5.77231C8.24793 5.81138 8.19479 5.83333 8.13937 5.83333L7.09461 5.83333C7.0392 5.83333 6.98605 5.81138 6.94686 5.77231C6.90768 5.73324 6.88566 5.68025 6.88566 5.625L6.88566 4.375C6.88566 4.31975 6.90768 4.26676 6.94686 4.22769C6.98605 4.18862 7.0392 4.16667 7.09461 4.16667ZM8.13937 1.04167C8.19479 1.04167 8.24793 1.06362 8.28712 1.10269C8.32631 1.14176 8.34832 1.19475 8.34832 1.25L8.34832 2.5C8.34832 2.55525 8.32631 2.60825 8.28712 2.64732C8.24793 2.68639 8.19479 2.70833 8.13937 2.70833L7.09461 2.70833C7.0392 2.70833 6.98605 2.68639 6.94686 2.64732C6.90768 2.60825 6.88566 2.55525 6.88566 2.5L6.88566 1.25C6.88566 1.19475 6.90768 1.14176 6.94686 1.10269C6.98605 1.06362 7.0392 1.04167 7.09461 1.04167L8.13937 1.04167Z", fill: "white" })), /* @__PURE__ */ B.createElement("defs", null, /* @__PURE__ */ B.createElement("clipPath", { id: "clip0_8292_48040" }, /* @__PURE__ */ B.createElement("rect", { width: 10, height: 10, fill: "white", transform: "translate(0 10) rotate(-90)" })))), N9 = O9, D9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 12, height: 13, viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("circle", { cx: 6, cy: 6.5, r: 6, fill: "#FFCE73" }), /* @__PURE__ */ B.createElement("path", { d: "M6.0013 7.33073C6.46154 7.33073 6.83464 6.95763 6.83464 6.4974C6.83464 6.03716 6.46154 5.66406 6.0013 5.66406C5.54106 5.66406 5.16797 6.03716 5.16797 6.4974C5.16797 6.95763 5.54106 7.33073 6.0013 7.33073Z", fill: "#082247" }), /* @__PURE__ */ B.createElement("path", { d: "M10.1423 6.3533C9.47099 4.65934 7.82261 3.55656 6.00066 3.58248C4.17871 3.55656 2.53033 4.65934 1.85899 6.3533C1.82565 6.44767 1.82565 6.55062 1.85899 6.64497C2.53033 8.33892 4.17871 9.4417 6.00066 9.41581C7.82261 9.4417 9.47099 8.33892 10.1423 6.64497C10.1757 6.55059 10.1757 6.44767 10.1423 6.3533ZM6.00157 8.16581H6.00066C5.08017 8.16581 4.33399 7.41961 4.33399 6.49914C4.33399 5.57866 5.08017 4.83248 6.00066 4.83248C6.92114 4.83248 7.66732 5.57866 7.66732 6.49914C7.66758 7.41935 6.92181 8.16556 6.00157 8.16581Z", fill: "#082247" })), R9 = D9, z9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 32, height: 32, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("rect", { x: -0.5, y: 0.5, width: 31, height: 31, rx: 4.5, transform: "matrix(-1 0 0 1 31 0)", stroke: "#8390A3" }), /* @__PURE__ */ B.createElement("path", { d: "M16.0379 8.91337L16.0378 8.91338L16.0358 8.91024C15.9266 8.74528 15.7106 8.57407 15.432 8.47559C15.1577 8.37865 14.8682 8.36814 14.6194 8.46108L14.6118 8.46395L14.604 8.46656C14.0151 8.66487 13.6311 9.34149 13.75 9.89628L13.7528 9.90933L13.7549 9.92252L14.1882 12.6475L14.1884 12.6475L14.1901 12.66C14.2411 13.0429 14.1382 13.4063 13.9081 13.6906L13.9003 13.7002L13.8921 13.7094C13.6598 13.9691 13.3179 14.1344 12.9444 14.1344H9.51945C8.99591 14.1344 8.59378 14.3433 8.36901 14.6569C8.16112 14.9534 8.10247 15.362 8.26606 15.8266L8.26617 15.8266L8.26948 15.8367L10.3195 22.0784L10.3251 22.0955L10.3295 22.1131C10.5282 22.9078 11.4403 23.6094 12.3444 23.6094H15.5944C15.8229 23.6094 16.1102 23.5692 16.3764 23.4897C16.6529 23.4071 16.8467 23.3 16.9409 23.2058L16.9634 23.1833L16.9885 23.1639L18.0547 22.3393C18.0548 22.3392 18.0548 22.3392 18.0549 22.3391C18.3435 22.1152 18.5111 21.7765 18.5111 21.4177V12.951C18.5111 12.7179 18.4412 12.4895 18.3123 12.2958C18.3121 12.2956 18.3119 12.2953 18.3118 12.2951L16.0379 8.91337Z", stroke: "#8390A3" }), /* @__PURE__ */ B.createElement("path", { d: "M22.5187 11.8263H21.6604C21.0609 11.8263 20.7659 11.9458 20.6121 12.0919C20.4646 12.232 20.3438 12.4961 20.3438 13.0513V21.4346C20.3438 21.9949 20.465 22.2611 20.6128 22.402C20.7664 22.5485 21.0608 22.668 21.6604 22.668H22.5187C23.1184 22.668 23.4128 22.5485 23.5664 22.402C23.7141 22.2611 23.8354 21.9949 23.8354 21.4346V13.0596C23.8354 12.4994 23.7141 12.2332 23.5664 12.0923C23.4128 11.9458 23.1184 11.8263 22.5187 11.8263Z", stroke: "#8390A3" })), I9 = z9, L9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 32, height: 32, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("rect", { x: 0.5, y: -0.5, width: 31, height: 31, rx: 4.5, transform: "matrix(1 0 0 -1 0 31)", stroke: "#8390A3" }), /* @__PURE__ */ B.createElement("path", { d: "M12.2334 10.7084L14.8167 8.70844C15.1501 8.37511 15.9001 8.20844 16.4001 8.20844H19.5667C20.5667 8.20844 21.6501 8.95844 21.9001 9.95844L23.9001 16.0418C24.3167 17.2084 23.5667 18.2084 22.3167 18.2084H18.9834C18.4834 18.2084 18.0667 18.6251 18.1501 19.2084L18.5667 21.8751C18.7334 22.6251 18.2334 23.4584 17.4834 23.7084C16.8167 23.9584 15.9834 23.6251 15.6501 23.1251L12.2334 18.0418", stroke: "#8390A3", strokeWidth: 1.2, strokeMiterlimit: 10 }), /* @__PURE__ */ B.createElement("path", { d: "M7.9834 10.7083V18.8749C7.9834 20.0416 8.4834 20.4583 9.65007 20.4583H10.4834C11.6501 20.4583 12.1501 20.0416 12.1501 18.8749V10.7083C12.1501 9.54158 11.6501 9.12492 10.4834 9.12492H9.65007C8.4834 9.12492 7.9834 9.54158 7.9834 10.7083Z", stroke: "#8390A3", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round" })), F9 = L9, j9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 32, height: 32, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("rect", { width: 32, height: 32, rx: 5, transform: "matrix(-1 0 0 1 32 0)", fill: "#3F8CFF" }), /* @__PURE__ */ B.createElement("path", { d: "M19.0111 21.4177V12.951C19.0111 12.6177 18.9111 12.2927 18.7278 12.0177L16.4528 8.63437C16.0944 8.09271 15.2028 7.70937 14.4444 7.99271C13.6278 8.26771 13.0861 9.18437 13.2611 10.001L13.6944 12.726C13.7278 12.976 13.6611 13.201 13.5194 13.376C13.3778 13.5344 13.1694 13.6344 12.9444 13.6344H9.51945C8.86111 13.6344 8.29445 13.901 7.96111 14.3677C7.64445 14.8177 7.58611 15.401 7.79445 15.9927L9.84445 22.2344C10.1028 23.2677 11.2278 24.1094 12.3444 24.1094H15.5944C16.1528 24.1094 16.9361 23.9177 17.2944 23.5594L18.3611 22.7344C18.7694 22.4177 19.0111 21.9344 19.0111 21.4177Z", fill: "white" }), /* @__PURE__ */ B.createElement("path", { d: "M21.6604 11.3263H22.5187C23.8104 11.3263 24.3354 11.8263 24.3354 13.0596V21.4346C24.3354 22.668 23.8104 23.168 22.5187 23.168H21.6604C20.3688 23.168 19.8438 22.668 19.8438 21.4346V13.0513C19.8438 11.8263 20.3688 11.3263 21.6604 11.3263Z", fill: "white" })), P9 = j9, H9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 32, height: 32, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("rect", { x: 0.5, y: -0.5, width: 31, height: 31, rx: 4.5, transform: "matrix(1 0 0 -1 0 31)", fill: "#247EFE", stroke: "#247EFE" }), /* @__PURE__ */ B.createElement("path", { d: "M12.2334 10.7084L14.8167 8.70844C15.1501 8.37511 15.9001 8.20844 16.4001 8.20844H19.5667C20.5667 8.20844 21.6501 8.95844 21.9001 9.95844L23.9001 16.0418C24.3167 17.2084 23.5667 18.2084 22.3167 18.2084H18.9834C18.4834 18.2084 18.0667 18.6251 18.1501 19.2084L18.5667 21.8751C18.7334 22.6251 18.2334 23.4584 17.4834 23.7084C16.8167 23.9584 15.9834 23.6251 15.6501 23.1251L12.2334 18.0418", fill: "white" }), /* @__PURE__ */ B.createElement("path", { d: "M7.9834 10.7083V18.8749C7.9834 20.0416 8.4834 20.4583 9.65007 20.4583H10.4834C11.6501 20.4583 12.1501 20.0416 12.1501 18.8749V10.7083C12.1501 9.54158 11.6501 9.12492 10.4834 9.12492H9.65007C8.4834 9.12492 7.9834 9.54158 7.9834 10.7083Z", fill: "white", stroke: "#247EFE", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round" })), B9 = H9, $9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("g", { clipPath: "url(#clip0_17179_3800)" }, /* @__PURE__ */ B.createElement("mask", { id: "mask0_17179_3800", style: {
  maskType: "luminance"
}, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 16, height: 16 }, /* @__PURE__ */ B.createElement("path", { d: "M16 0H0V16H16V0Z", fill: "white" })), /* @__PURE__ */ B.createElement("g", { mask: "url(#mask0_17179_3800)" }, /* @__PURE__ */ B.createElement("path", { d: "M13.581 0C12.2681 0 11.2 1.0681 11.2 2.38095C11.2 3.69381 12.2681 4.7619 13.581 4.7619C14.8939 4.7619 15.9619 3.69381 15.9619 2.38095C15.9619 1.0681 14.8939 0 13.581 0ZM13.581 3.96826C12.7057 3.96826 11.9937 3.25619 11.9937 2.38095C11.9937 1.50571 12.7057 0.793651 13.581 0.793651C14.4562 0.793651 15.1683 1.50571 15.1683 2.38095C15.1683 3.25619 14.4562 3.96826 13.581 3.96826Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M13.581 11.1992C12.2681 11.1992 11.2 12.2673 11.2 13.5802C11.2 14.8931 12.2681 15.9611 13.581 15.9611C14.8939 15.9611 15.9619 14.8931 15.9619 13.5802C15.9619 12.2673 14.8939 11.1992 13.581 11.1992ZM13.581 15.1675C12.7057 15.1675 11.9937 14.4554 11.9937 13.5802C11.9937 12.7049 12.7057 11.9929 13.581 11.9929C14.4562 11.9929 15.1683 12.7049 15.1683 13.5802C15.1683 14.4554 14.4562 15.1675 13.581 15.1675Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M2.38095 0C1.0681 0 0 1.0681 0 2.38095C0 3.69381 1.0681 4.7619 2.38095 4.7619C3.69381 4.7619 4.7619 3.69381 4.7619 2.38095C4.7619 1.0681 3.69381 0 2.38095 0ZM2.38095 3.96826C1.50571 3.96826 0.793651 3.25619 0.793651 2.38095C0.793651 1.50571 1.50571 0.793651 2.38095 0.793651C3.25619 0.793651 3.96826 1.50571 3.96826 2.38095C3.96826 3.25619 3.25619 3.96826 2.38095 3.96826Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M2.38095 11.1992C1.0681 11.1992 0 12.2673 0 13.5802C0 14.8931 1.0681 15.9611 2.38095 15.9611C3.69381 15.9611 4.7619 14.8931 4.7619 13.5802C4.7619 12.2673 3.69381 11.1992 2.38095 11.1992ZM2.38095 15.1675C1.50571 15.1675 0.793651 14.4554 0.793651 13.5802C0.793651 12.7049 1.50571 11.9929 2.38095 11.9929C3.25619 11.9929 3.96826 12.7049 3.96826 13.5802C3.96826 14.4554 3.25619 15.1675 2.38095 15.1675Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M4.15473 12.6454L12.64 4.16016L11.7349 3.25506L3.24964 11.7403L4.15473 12.6454Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M3.24958 4.15925L11.7349 12.6445L12.64 11.7394L4.15468 3.25415L3.24958 4.15925Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M7.97714 10.8334C9.5551 10.8334 10.8343 9.55424 10.8343 7.97628C10.8343 6.39833 9.5551 5.11914 7.97714 5.11914C6.39918 5.11914 5.12 6.39833 5.12 7.97628C5.12 9.55424 6.39918 10.8334 7.97714 10.8334Z", fill: "currentColor" }))), /* @__PURE__ */ B.createElement("defs", null, /* @__PURE__ */ B.createElement("clipPath", { id: "clip0_17179_3800" }, /* @__PURE__ */ B.createElement("rect", { width: 16, height: 16, fill: "white" })))), W9 = $9, V9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M7.95106 12.3437C8.12161 12.1731 8.13712 11.9062 7.99757 11.7182L7.95106 11.6643L3.80722 7.52022L7.95106 3.37616C8.12161 3.20561 8.13712 2.93872 7.99757 2.75065L7.95106 2.69677C7.78051 2.52622 7.51362 2.51071 7.32555 2.65026L7.27167 2.69677L2.78792 7.18052C2.61736 7.35108 2.60186 7.61797 2.7414 7.80603L2.78792 7.85992L7.27167 12.3437C7.45928 12.5313 7.76345 12.5313 7.95106 12.3437Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M12.3433 12.3437C12.5139 12.1731 12.5294 11.9062 12.3898 11.7182L12.3433 11.6643L8.19946 7.52022L12.3433 3.37616C12.5139 3.20561 12.5294 2.93872 12.3898 2.75065L12.3433 2.69677C12.1727 2.52622 11.9059 2.51071 11.7178 2.65026L11.6639 2.69677L7.18016 7.18052C7.0096 7.35108 6.9941 7.61797 7.13364 7.80603L7.18016 7.85991L11.6639 12.3437C11.8515 12.5313 12.1557 12.5313 12.3433 12.3437Z", fill: "currentColor" })), q9 = V9, U9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M8.04891 12.3437C7.87836 12.1731 7.86285 11.9062 8.0024 11.7182L8.04891 11.6643L12.1928 7.52022L8.04891 3.37616C7.87836 3.20561 7.86285 2.93872 8.0024 2.75065L8.04891 2.69677C8.21946 2.52622 8.48635 2.51071 8.67442 2.65026L8.7283 2.69677L13.2121 7.18052C13.3826 7.35108 13.3981 7.61797 13.2586 7.80603L13.2121 7.85992L8.7283 12.3437C8.54069 12.5313 8.23652 12.5313 8.04891 12.3437Z", fill: "currentColor" }), /* @__PURE__ */ B.createElement("path", { d: "M3.65667 12.3437C3.48611 12.1731 3.47061 11.9062 3.61015 11.7182L3.65667 11.6643L7.80051 7.52022L3.65667 3.37616C3.48611 3.20561 3.47061 2.93872 3.61015 2.75065L3.65667 2.69677C3.82722 2.52622 4.09411 2.51071 4.28218 2.65026L4.33606 2.69677L8.81981 7.18052C8.99037 7.35108 9.00587 7.61797 8.86633 7.80603L8.81981 7.85991L4.33606 12.3437C4.14845 12.5313 3.84428 12.5313 3.65667 12.3437Z", fill: "currentColor" })), Y9 = U9, Z9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 17, height: 16, viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M10.8335 3.10946C11.004 3.28001 11.0195 3.5469 10.88 3.73497L10.8335 3.78885L6.68964 7.93291L10.8335 12.077C11.004 12.2475 11.0195 12.5144 10.88 12.7025L10.8335 12.7564C10.6629 12.9269 10.396 12.9424 10.208 12.8029L10.1541 12.7564L5.67033 8.2726C5.49978 8.10205 5.48427 7.83516 5.62382 7.64709L5.67033 7.59321L10.1541 3.10946C10.3417 2.92185 10.6459 2.92185 10.8335 3.10946Z", fill: "currentColor" })), K9 = Z9, G9 = (e) => /* @__PURE__ */ B.createElement("svg", { width: 17, height: 16, viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ B.createElement("path", { d: "M6.16648 3.10946C5.99593 3.28001 5.98042 3.5469 6.11996 3.73497L6.16648 3.78885L10.3103 7.93291L6.16648 12.077C5.99593 12.2475 5.98042 12.5144 6.11996 12.7025L6.16648 12.7564C6.33703 12.9269 6.60392 12.9424 6.79199 12.8029L6.84587 12.7564L11.3296 8.2726C11.5002 8.10205 11.5157 7.83516 11.3761 7.64709L11.3296 7.59321L6.84587 3.10946C6.65826 2.92185 6.35409 2.92185 6.16648 3.10946Z", fill: "currentColor" })), X9 = G9, Q9 = ({ viewsType: e }) => /* @__PURE__ */ v.jsx(as, { title: e, children: /* @__PURE__ */ v.jsx(
  "div",
  {
    style: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      "--views-color": Ys[e]
    },
    className: X.views_type_badge,
    children: e[0]
  }
) }), Qs = Q9, J9 = () => {
  const [e, t] = fe(!1);
  ie(() => {
    setTimeout(() => {
      t(!0);
    }, 500);
    const o = setTimeout(() => {
      t(!1);
    }, 3500);
    return () => clearTimeout(o);
  }, []);
  const n = () => {
    t((o) => !o);
  };
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs(
      qe,
      {
        id: "lineageLegend",
        className: X.lineage_legend,
        type: "button",
        onClick: n,
        children: [
          "Legend",
          e ? /* @__PURE__ */ v.jsx(M9, {}) : /* @__PURE__ */ v.jsx(k9, {})
        ]
      }
    ),
    /* @__PURE__ */ v.jsx(
      Iu,
      {
        flip: !0,
        target: "lineageLegend",
        isOpen: e,
        className: X.column_legend,
        placement: "top",
        children: /* @__PURE__ */ v.jsxs(Lu, { children: [
          Object.keys(Ys).map((o) => /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-sm mb-1 align-items-center", children: [
            /* @__PURE__ */ v.jsx(Qs, { viewsType: o }),
            /* @__PURE__ */ v.jsx("div", { children: o })
          ] }, o)),
          /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-sm mb-1 align-items-center", children: [
            /* @__PURE__ */ v.jsx("div", { className: X.column_code_icon, children: /* @__PURE__ */ v.jsx(nd, {}) }),
            /* @__PURE__ */ v.jsx("div", { children: "Code" })
          ] }),
          /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-sm mb-1 align-items-center", children: [
            /* @__PURE__ */ v.jsx("div", { className: X.edge_select, children: /* @__PURE__ */ v.jsx("div", {}) }),
            /* @__PURE__ */ v.jsx("div", { children: "Select" })
          ] }),
          /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-sm mb-1 align-items-center", children: [
            /* @__PURE__ */ v.jsx("div", { className: X.edge_non_select, children: /* @__PURE__ */ v.jsx("div", {}) }),
            /* @__PURE__ */ v.jsx("div", { children: "Non select" })
          ] })
        ] })
      }
    )
  ] });
}, ey = J9;
var S1 = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var t = {}.hasOwnProperty;
    function n() {
      for (var a = "", i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        s && (a = r(a, o(s)));
      }
      return a;
    }
    function o(a) {
      if (typeof a == "string" || typeof a == "number")
        return a;
      if (typeof a != "object")
        return "";
      if (Array.isArray(a))
        return n.apply(null, a);
      if (a.toString !== Object.prototype.toString && !a.toString.toString().includes("[native code]"))
        return a.toString();
      var i = "";
      for (var s in a)
        t.call(a, s) && a[s] && (i = r(i, s));
      return i;
    }
    function r(a, i) {
      return i ? a ? a + " " + i : a + i : a;
    }
    e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
  })();
})(S1);
var ty = S1.exports;
const Ce = /* @__PURE__ */ mn(ty), ny = ({ datatype: e, color: t, size: n = "1rem" }) => {
  const [o, r] = Ee(() => {
    switch (e.toLowerCase()) {
      case "integer":
      case "float":
      case "double precision":
      case "double":
      case "bigint":
        return [n9, "#FF754C"];
      case "bool":
      case "boolean":
        return [Q8, "#00A5DB"];
      case "text":
      case "character":
      case "character varying":
      case "varchar":
        return [e9, "#3F8CFF"];
      case "geospatial":
        return [l9, "#01CD8C"];
      case "date":
      case "timestamp":
      case "timestamp with time zone":
        return [i9, "#247EFE"];
      default:
        return [r9, "#6A24FE"];
    }
  }, [e]);
  return /* @__PURE__ */ v.jsx(
    "div",
    {
      style: { color: t || r },
      className: "d-flex align-items-center",
      children: /* @__PURE__ */ v.jsx(o, { width: n, height: n })
    }
  );
}, Ur = ({
  nodeType: e
}) => /* @__PURE__ */ v.jsxs("div", { children: [
  e === "seed" && /* @__PURE__ */ v.jsx(f9, {}),
  e === "model" && /* @__PURE__ */ v.jsx(u9, {}),
  e === "source" && /* @__PURE__ */ v.jsx(p9, {}),
  e === "exposure" && /* @__PURE__ */ v.jsx(m9, {}),
  e === "analysis" && /* @__PURE__ */ v.jsx(y9, {}),
  e === "snapshot" && /* @__PURE__ */ v.jsx(x9, {}),
  e === "semantic_model" && /* @__PURE__ */ v.jsx(S9, {}),
  e === "macros" && /* @__PURE__ */ v.jsx(E9, {})
] }), ro = ({ id: e, icon: t, text: n, label: o }) => /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
  /* @__PURE__ */ v.jsxs("div", { className: X.table_node_pill, id: e, children: [
    /* @__PURE__ */ v.jsx("div", { className: X.icon, children: t }),
    /* @__PURE__ */ v.jsx("div", { children: n })
  ] }),
  /* @__PURE__ */ v.jsx(V1, { target: e, children: o })
] }), C1 = {
  seed: X.seed,
  model: X.model,
  source: X.source,
  exposure: X.exposure,
  snapshot: X.snapshot,
  semantic_model: X.metrics,
  macros: X.macros,
  analysis: X.analysis
}, E1 = {
  seed: "SED",
  model: "MDL",
  source: "SRC",
  exposure: "EXP",
  snapshot: "SNP",
  semantic_model: "MET",
  macros: "SEM",
  analysis: "ANY"
}, er = "-1px", Js = () => /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
  /* @__PURE__ */ v.jsx(
    Kt,
    {
      id: "left",
      type: "source",
      className: "invisible",
      isConnectable: !1,
      position: ne.Left,
      style: { left: er }
    }
  ),
  /* @__PURE__ */ v.jsx(
    Kt,
    {
      id: "right",
      type: "source",
      className: "invisible",
      isConnectable: !1,
      position: ne.Right,
      style: { right: er }
    }
  ),
  /* @__PURE__ */ v.jsx(
    Kt,
    {
      id: "left",
      type: "target",
      className: "invisible",
      isConnectable: !1,
      position: ne.Left,
      style: { left: er }
    }
  ),
  /* @__PURE__ */ v.jsx(
    Kt,
    {
      id: "right",
      type: "target",
      className: "invisible",
      isConnectable: !1,
      position: ne.Right,
      style: { right: er }
    }
  )
] }), oy = ({ data: e }) => {
  const {
    label: t,
    table: n,
    url: o,
    upstreamCount: r,
    downstreamCount: a,
    nodeType: i,
    tests: s,
    materialization: c,
    isExternalProject: u
  } = e, l = mt(), {
    state: {
      selectedTable: d,
      collectColumns: f,
      selectedColumn: g,
      leftExpansion: p,
      rightExpansion: h,
      selectCheck: m,
      nonSelectCheck: x
    },
    rerender: b
  } = bt(), y = yt(), w = Object.keys(f[n] || {}).length, S = w > 0, k = d === n, M = () => {
    if (g.name && g.table === n)
      return;
    const A = l.getNodes(), _ = l.getEdges(), [z, R] = So(A, _, n);
    l.setNodes(z), l.setEdges(R);
  }, C = async (A) => {
    if (Ie.inProgress) {
      Ie.showCllInProgressMsg();
      return;
    }
    let [_, z] = await Xs(
      l.getNodes(),
      l.getEdges(),
      n,
      A
    );
    if ([_, z] = So(_, z, d), bn(_, z), l.setNodes(_), l.setEdges(z), y(
      uo(Co(_, z, d))
    ), y(
      Ln(
        await $n(
          _,
          z,
          d,
          p,
          h
        )
      )
    ), b(), g.name) {
      try {
        Ie.start();
        const R = l.getEdges();
        xo(R, !1), wo(R, !0), l.setEdges(R), await y1(
          _,
          z,
          A,
          f[n].map((N) => ({ table: n, name: N.column })),
          (N) => {
            y(Td({ operatorList: N }));
          },
          (N) => {
            y(Ad(N));
          },
          (N) => {
            y(Md(N));
          },
          l,
          g,
          { direct: m, indirect: x }
        ), b();
      } catch (R) {
        console.log("cll:error:", R);
      } finally {
        Ie.end();
      }
      return;
    }
  }, T = () => C(!0), D = () => C(!1), F = (A) => {
    if (A.stopPropagation(), !!k && i !== "semantic_model") {
      if (i === "exposure") {
        y(_t(t1));
        return;
      }
      y(_t(e1));
    }
  }, $ = l.getEdges(), P = i, E = n.replace(/[^a-zA-Z0-9]/g, "-");
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: "position-relative",
      style: {
        opacity: g.name ? S ? 1 : 0.5 : 1
      },
      children: [
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: X.table_node,
            onClick: async () => {
              const A = l.getNodes(), _ = l.getEdges();
              y(uo(Co(A, _, n))), y(
                Ln(
                  await $n(
                    A,
                    _,
                    n,
                    p,
                    h
                  )
                )
              ), M(), y(vr(n)), o && _7(o);
            },
            children: [
              /* @__PURE__ */ v.jsx(
                "div",
                {
                  className: Ce(
                    X.header,
                    "d-flex flex-column align-items-start gap-xs",
                    {
                      [X.selected]: k,
                      [X.collapse]: !S
                    }
                  ),
                  children: /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column align-items-start gap-xs w-100", children: [
                    /* @__PURE__ */ v.jsxs("div", { className: X.table_header, children: [
                      /* @__PURE__ */ v.jsxs(
                        "div",
                        {
                          className: Ce(
                            X.node_icon,
                            C1[P]
                          ),
                          children: [
                            /* @__PURE__ */ v.jsx(Ur, { nodeType: P }),
                            /* @__PURE__ */ v.jsx("div", { children: E1[P] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ v.jsx("div", { className: "lines-2", children: t })
                    ] }),
                    /* @__PURE__ */ v.jsxs(
                      "div",
                      {
                        className: Ce(
                          "w-100 d-flex align-items-center gap-xs",
                          X.node_extra_info
                        ),
                        children: [
                          /* @__PURE__ */ v.jsx(
                            "div",
                            {
                              className: Ce("nodrag", X.table_handle, {
                                invisible: a === 0 || a === $.filter((A) => A.target === n).length || l.getNode(Dr(n, !1))
                              }),
                              onClick: (A) => {
                                A.stopPropagation(), D();
                              },
                              "data-testid": "expand-left-btn-" + n,
                              children: "+"
                            }
                          ),
                          (s == null ? void 0 : s.length) > 0 && /* @__PURE__ */ v.jsx(
                            ro,
                            {
                              id: "table-node-tests-" + E,
                              icon: /* @__PURE__ */ v.jsx(v1, {}),
                              text: s.length.toString(),
                              label: "Tests"
                            }
                          ),
                          c && /* @__PURE__ */ v.jsx(
                            ro,
                            {
                              id: "table-node-materilization-" + E,
                              icon: /* @__PURE__ */ v.jsx(x1, {}),
                              text: c,
                              label: "Materialization"
                            }
                          ),
                          u ? /* @__PURE__ */ v.jsx(
                            ro,
                            {
                              id: "table-node-is-external-" + E,
                              icon: /* @__PURE__ */ v.jsx(G8, {}),
                              text: "ext",
                              label: `External Project: ${n}`
                            }
                          ) : null,
                          /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
                          /* @__PURE__ */ v.jsx(
                            "div",
                            {
                              className: Ce(
                                "nodrag",
                                k && i !== "semantic_model" ? "text-blue" : "text-grey"
                              ),
                              onClick: F,
                              "data-testid": "view-details-btn-" + n,
                              children: "Details"
                            }
                          ),
                          /* @__PURE__ */ v.jsx(
                            "div",
                            {
                              className: Ce("nodrag", X.table_handle, {
                                invisible: r === 0 || r === $.filter((A) => A.source === n).length || l.getNode(Dr(n, !0))
                              }),
                              onClick: (A) => {
                                A.stopPropagation(), T();
                              },
                              "data-testid": "expand-right-btn-" + n,
                              children: "+"
                            }
                          )
                        ]
                      }
                    )
                  ] })
                }
              ),
              S && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
                /* @__PURE__ */ v.jsx("div", { className: X.divider }),
                /* @__PURE__ */ v.jsx(
                  "div",
                  {
                    className: Ce(X.content, {
                      [X.selected]: k
                    }),
                    style: { height: ts(w) }
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ v.jsx(Js, {})
      ]
    }
  );
}, ry = ({ data: e }) => {
  const { tables: t = [], prevTable: n, right: o, level: r } = e, {
    state: { moreTables: a }
  } = bt(), i = yt(), s = mt(), c = me(
    (u) => {
      u.stopPropagation(), i(_t(n1)), i(
        Es({ ...a, tables: t, prevTable: n, right: o, level: r })
      );
    },
    [r, i, a, n, o, t]
  );
  return /* @__PURE__ */ v.jsxs("div", { className: X.see_more_node, onClick: c, children: [
    /* @__PURE__ */ v.jsx("div", { className: "fw-semibold", children: "See more" }),
    /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
    /* @__PURE__ */ v.jsx("div", { children: t.filter((u) => !s.getNode(u.table)).length || "" }),
    /* @__PURE__ */ v.jsx(Js, {})
  ] });
}, ay = (e) => {
  const { sourceX: t, sourceY: n, targetX: o, targetY: r, markerEnd: a } = e, i = (t - o) * 0.6, c = `M ${t - 5} ${n} A ${i} 50 0 1 0 ${o + 2} ${r}`;
  return /* @__PURE__ */ v.jsx(Vn, { path: c, markerEnd: a });
}, iy = ({ data: e }) => {
  const { column: t, table: n, viewsType: o, viewsCode: r, nodeType: a } = e, {
    state: { selectedColumn: i }
  } = bt(), s = yt(), c = i.table === n && i.name === t, u = o && Ys[o], l = u ? { borderColor: u } : {}, d = mt(), f = () => {
    const p = d.getNode(Nr(n, t));
    p && (s(vr("")), s(ln({ name: t, table: n })), L7(p, d));
  }, g = Ee(() => {
    const p = Object.values(
      r || {}
    ).flat().filter(([, m]) => m === "transform").map(([m]) => m), h = [];
    for (const m of p)
      h.includes(m) || h.push(m);
    return h;
  }, [r]);
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: Ce(
        X.column_node,
        c ? X.selected : X.default
      ),
      style: l,
      onClick: f,
      children: [
        /* @__PURE__ */ v.jsx("div", { className: X.column_name, children: t }),
        /* @__PURE__ */ v.jsx(Js, {}),
        /* @__PURE__ */ v.jsxs("div", { className: X.column_top_right, children: [
          g.length > 0 && /* @__PURE__ */ v.jsx(as, { title: "Click to view code", children: /* @__PURE__ */ v.jsx(
            "div",
            {
              className: X.column_code_icon,
              onClick: (p) => {
                p.stopPropagation(), s(
                  zi({
                    table: n,
                    viewsType: o,
                    viewsCode: r,
                    nodeType: a,
                    column: t
                  })
                );
              },
              children: /* @__PURE__ */ v.jsx(nd, {})
            }
          ) }),
          o && o !== "Non select" && /* @__PURE__ */ v.jsx(Qs, { viewsType: o })
        ] })
      ]
    }
  );
};
function sy({
  isOpen: e,
  closeModal: t,
  width: n = 350,
  children: o
}) {
  const r = document.getElementById("sidebar");
  return r ? hn(
    /* @__PURE__ */ v.jsx(
      "div",
      {
        className: "sidebar-modal",
        style: {
          width: `${n}px`,
          right: `-${n}px`,
          transform: e ? `translateX(-${n}px)` : "",
          backgroundColor: "var(--card-bg)",
          color: "var(--text-color)"
        },
        children: e && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          /* @__PURE__ */ v.jsx("div", { className: "sidebar-close-button", onClick: t, children: /* @__PURE__ */ v.jsx(w1, {}) }),
          /* @__PURE__ */ v.jsx("div", { className: "sidebar-background-screen", onClick: t }),
          /* @__PURE__ */ v.jsx("div", { className: "sidebar-modal-content", children: o })
        ] })
      }
    ),
    r
  ) : null;
}
function Yr(e) {
  return /* @__PURE__ */ v.jsx(ur, { className: "custom-input", ...e });
}
function ly(e) {
  return /* @__PURE__ */ v.jsx(ur, { className: "custom-input", ...e, type: "textarea", rows: 4 });
}
function cy({
  nodeType: e,
  label: t,
  table: n,
  tests: o,
  materialization: r
}) {
  const a = e, i = n.replace(/[^a-zA-Z0-9]/g, "-");
  return /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column align-items-start gap-xs w-100", children: [
    /* @__PURE__ */ v.jsxs("div", { className: X.table_header, children: [
      /* @__PURE__ */ v.jsxs("div", { className: Ce(X.node_icon, C1[a]), children: [
        /* @__PURE__ */ v.jsx(Ur, { nodeType: a }),
        /* @__PURE__ */ v.jsx("div", { children: E1[a] })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "lines-2", children: t })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Ce("d-flex gap-xs", X.node_extra_info), children: [
      (o == null ? void 0 : o.length) > 0 && /* @__PURE__ */ v.jsx(
        ro,
        {
          id: "table-node-tests-" + i,
          icon: /* @__PURE__ */ v.jsx(v1, {}),
          text: o.length.toString(),
          label: "Tests"
        }
      ),
      r && /* @__PURE__ */ v.jsx(
        ro,
        {
          id: "table-node-materilization-" + i,
          icon: /* @__PURE__ */ v.jsx(x1, {}),
          text: r,
          label: "Materialization"
        }
      )
    ] })
  ] });
}
function uy() {
  const {
    state: { moreTables: e, selectCheck: t, nonSelectCheck: n },
    rerender: o
  } = bt(), r = yt(), { tables: a, level: i } = e, s = mt(), c = async (d) => {
    const f = [...s.getNodes()], g = [...s.getEdges()];
    z7(
      f,
      g,
      d,
      e,
      { direct: t, indirect: n }
    ) && r(_t("")), bn(f, g), s.setNodes(f), s.setEdges(g), o();
  }, [u, l] = fe(a);
  return /* @__PURE__ */ v.jsxs("div", { className: "p-2 h-100 d-flex flex-column", children: [
    /* @__PURE__ */ v.jsx("div", { className: "mb-2 fw-semibold fs-5", children: "Tables" }),
    /* @__PURE__ */ v.jsx(
      Yr,
      {
        bsSize: "sm",
        placeholder: "Search by table name",
        onChange: (d) => {
          const f = d.target.value.toLowerCase();
          l(
            a.filter((g) => g.table.toLowerCase().includes(f))
          );
        }
      }
    ),
    /* @__PURE__ */ v.jsx("div", { className: "mb-3" }),
    /* @__PURE__ */ v.jsx("div", { className: "h-100 overflow-y", children: /* @__PURE__ */ v.jsx("div", { className: "d-flex flex-column gap-sm", children: u.map((d) => {
      const f = s.getNode(d.table), g = f && f.data.level !== i;
      return /* @__PURE__ */ v.jsx(
        "div",
        {
          className: Ce(X.table_card, {
            [X.selected]: f
            // [styles.disabled]: isNodeOnOtherLevel,
          }),
          onClick: (p) => {
            p.stopPropagation(), !g && c(d);
          },
          children: /* @__PURE__ */ v.jsx(
            cy,
            {
              nodeType: d.nodeType,
              label: d.label,
              table: d.table,
              tests: d.tests,
              materialization: d.materialization
            }
          )
        },
        d.table
      );
    }) }) })
  ] });
}
const dy = "_component_1sc6a_1", fy = {
  component: dy
}, _1 = ({ top: e = 50, left: t = 50, label: n }) => /* @__PURE__ */ v.jsx(
  "div",
  {
    className: fy.component,
    style: { top: `${e}%`, left: `${t}%` },
    children: /* @__PURE__ */ v.jsx("div", { style: { marginTop: "-70px" }, children: n })
  }
), gy = "_level_tag_x6wwh_1", py = {
  level_tag: gy
}, hy = ({ label: e }) => /* @__PURE__ */ v.jsx("div", { className: Ce(py.level_tag), children: e }), my = ({ purpose: e }) => /* @__PURE__ */ v.jsx("div", { className: Ce(X.card, "purpose-section"), children: /* @__PURE__ */ v.jsx("div", { className: "d-flex flex-column gap-sm", children: /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-xs flex-column", children: [
  /* @__PURE__ */ v.jsx("div", { className: "fs-5 fw-semibold", children: "Description" }),
  /* @__PURE__ */ v.jsx("div", { className: Ce(X.column_card), children: /* @__PURE__ */ v.jsx("div", { className: "font-normal fs-xxs", children: e }) })
] }) }) }), k1 = my, by = () => /* @__PURE__ */ v.jsxs("div", { className: "tooltip-container", children: [
  /* @__PURE__ */ v.jsx(R9, {}),
  /* @__PURE__ */ v.jsx("div", { className: "tooltip-text", children: "Preview Feature" })
] }), yy = ({ column: e, handleClick: t, selected: n, isSelectable: o }) => /* @__PURE__ */ v.jsxs(
  "div",
  {
    className: Ce(X.column_card, {
      [X.selected]: n,
      "cursor-pointer": o
    }),
    onClick: t,
    "data-testid": "table-details-" + e.name,
    children: [
      /* @__PURE__ */ v.jsxs("div", { className: "d-flex align-items-center gap-xs", children: [
        /* @__PURE__ */ v.jsx(ny, { datatype: e.datatype }),
        /* @__PURE__ */ v.jsx("div", { className: "lines-2", children: e.name }),
        /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
        e.can_lineage_expand && /* @__PURE__ */ v.jsx("div", { className: X.expand_lineage_icon, children: /* @__PURE__ */ v.jsx(N9, {}) }),
        e.datatype && /* @__PURE__ */ v.jsx(hy, { label: e.datatype })
      ] }),
      e.description && /* @__PURE__ */ v.jsx("div", { className: "d-flex flex-column", children: /* @__PURE__ */ v.jsx("div", { className: "font-normal fs-xxs text-grey", children: e.description }) })
    ]
  }
), vy = ({
  columns: e,
  filteredColumn: t,
  setFilteredColumn: n,
  handleColumnClick: o,
  selectedTable: r,
  selectedColumn: a,
  setData: i
}) => {
  const s = (r == null ? void 0 : r.materialization) === "ephemeral", c = (r == null ? void 0 : r.nodeType) === "analysis";
  return /* @__PURE__ */ v.jsx("div", { className: Ce(X.card, "flex-grow column-section"), children: /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-sm h-100 p-2", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "d-flex align-items-center gap-xs", children: [
      /* @__PURE__ */ v.jsx("div", { className: "fs-5 fw-semibold", children: "Columns" }),
      /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
      !s && !c && /* @__PURE__ */ v.jsx(
        qe,
        {
          size: "sm",
          color: "primary",
          onClick: () => {
            r && f1(r.table, !0).then((u) => {
              i(u), n(u.columns);
            });
          },
          children: "Sync with DB"
        }
      )
    ] }),
    /* @__PURE__ */ v.jsx(
      Yr,
      {
        bsSize: "sm",
        type: "text",
        placeholder: "Search by column name",
        onChange: (u) => {
          const l = u.target.value.toLowerCase();
          n(
            e.filter((d) => d.name.toLowerCase().includes(l))
          );
        }
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: "d-flex align-items-center gap-xs", children: [
      !s && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("div", { className: "fs-xxs", children: "Select column for lineage" }),
        /* @__PURE__ */ v.jsx(by, {})
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
      /* @__PURE__ */ v.jsxs("div", { className: "fs-xxs text-grey", children: [
        t.length,
        " columns"
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "d-flex flex-column gap-sm", children: t.map((u) => /* @__PURE__ */ v.jsx(
      yy,
      {
        column: u,
        handleClick: () => {
          s || o(u);
        },
        selected: u.name === a.name && u.table === a.table,
        isSelectable: !s
      },
      u.name
    )) })
  ] }) });
}, xy = ({ tests: e }) => {
  const [t, n] = fe(e);
  return /* @__PURE__ */ v.jsx("div", { className: Ce(X.card, "flex-grow column-section"), children: /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-sm h-100 p-2", children: [
    /* @__PURE__ */ v.jsx("div", { className: "fs-5 fw-semibold", children: "Tests" }),
    /* @__PURE__ */ v.jsx(
      Yr,
      {
        bsSize: "sm",
        type: "text",
        placeholder: "Search by test",
        onChange: (o) => {
          const r = o.target.value.toLowerCase();
          n(
            e.filter((a) => a.key.toLowerCase().includes(r))
          );
        }
      }
    ),
    /* @__PURE__ */ v.jsx("div", { className: "d-flex align-items-center gap-xs", children: /* @__PURE__ */ v.jsxs("div", { className: "fs-xxs text-grey", children: [
      t.length,
      " tests"
    ] }) }),
    /* @__PURE__ */ v.jsx("div", { className: "d-flex flex-column gap-sm", children: t.map((o) => /* @__PURE__ */ v.jsx("div", { className: X.column_card, children: /* @__PURE__ */ v.jsx("div", { className: "d-flex align-items-center gap-xs", children: /* @__PURE__ */ v.jsx("div", { className: "lines-2", children: o.key }) }) }, o.key)) })
  ] }) });
}, A1 = ({
  nodeType: e,
  table: t
}) => /* @__PURE__ */ v.jsxs("div", { className: X.table_details_header, children: [
  /* @__PURE__ */ v.jsx(Ur, { nodeType: e }),
  /* @__PURE__ */ v.jsx("div", { className: "d-flex align-items-center", children: /* @__PURE__ */ v.jsx("div", { className: "fw-semibold fs-5 lines-2", children: t }) })
] }), wy = () => {
  var y;
  const {
    rerender: e,
    state: {
      selectedTable: t,
      selectedColumn: n,
      selectCheck: o,
      nonSelectCheck: r,
      aiEnabled: a
    }
  } = bt(), i = yt(), s = mt(), [c, u] = fe([]), [l, d] = fe(null), [f, g] = fe(0), [p, h] = fe(!0);
  ie(() => {
    t && f1(t, !1).then((w) => {
      d(w), u(w.columns), h(!1);
    });
  }, [t]);
  const m = async (w) => {
    var E;
    if (!a) {
      A7();
      return;
    }
    if (Ie.inProgress) {
      Ie.showCllInProgressMsg();
      return;
    }
    if (n.table === w.table && n.name === w.name) {
      const [A, _] = R7(
        s.getNodes(),
        s.getEdges()
      );
      xo(_, !0), wo(_, !0), s.setNodes(A), s.setEdges(_), i(ln({ table: "", name: "" })), i(xr({})), i(_t(""));
      return;
    }
    const S = (E = s.getNode(w.table)) == null ? void 0 : E.data;
    if (!S)
      throw new Error(`table node ${w.table} isn't visible`);
    let k = s.getNodes(), M = s.getEdges();
    xo(M, !1), wo(M, !0);
    const C = async (A) => {
      [k, M] = await Xs(
        k,
        M,
        w.table,
        A
      ), bn(k, M);
    }, { upstreamCount: T, downstreamCount: D } = S;
    T > 0 && M.filter((A) => A.source === w.table).length < T && await C(!0), D > 0 && M.filter((A) => A.target === w.table).length < D && await C(!1), i(ln({ ...w })), i(_t("")), i(xr({})), i(hm({ confidence: "high" }));
    const [F, $] = O7(
      k.filter(vo),
      M.filter(vo)
    );
    $.forEach((A) => A.style = Zs), s.setNodes(F), s.setEdges($), e();
    const P = (A) => y1(
      F,
      $,
      A,
      [w],
      (_) => {
        i(Td({ operatorList: _ }));
      },
      (_) => {
        i(Ad(_));
      },
      (_) => {
        i(Md(_));
      },
      s,
      w,
      { direct: o, indirect: r }
    );
    try {
      Ie.start(), (await Promise.all([
        P(!0),
        P(!1)
      ])).every((_) => !_) && (Ie.isCancelled ? i(ln({ table: "", name: "" })) : p1(
        `No lineage found for model ${w.table} and column ${w.name}`
      ));
    } catch (A) {
      console.error(
        "Error while performing cll for ",
        w.table,
        w.name,
        ", error:",
        A
      ), i(ln({ table: "", name: "" }));
    } finally {
      Ie.end();
    }
  }, x = (y = s.getNode(t)) == null ? void 0 : y.data;
  if (p || !l || !t)
    return /* @__PURE__ */ v.jsx(_1, {});
  const b = ["Column"];
  return x.tests.length && b.push("Tests"), /* @__PURE__ */ v.jsxs("div", { className: "p-2 h-100 d-flex flex-column gap-md overflow-y", children: [
    /* @__PURE__ */ v.jsx(
      A1,
      {
        nodeType: x.nodeType,
        table: x.label
      }
    ),
    l.purpose && /* @__PURE__ */ v.jsx(k1, { purpose: l.purpose }),
    /* @__PURE__ */ v.jsx("div", { className: X.table_details_tabs, children: b.map((w, S) => /* @__PURE__ */ v.jsx(
      "div",
      {
        className: Ce(X.tab, { [X.selected]: f === S }),
        onClick: () => g(S),
        children: w
      },
      w
    )) }),
    f === 0 && /* @__PURE__ */ v.jsx(
      vy,
      {
        selectedTable: x,
        selectedColumn: n,
        filteredColumn: c,
        setFilteredColumn: u,
        columns: l.columns,
        handleColumnClick: m,
        setData: d
      }
    ),
    f === 1 && /* @__PURE__ */ v.jsx(xy, { tests: x.tests })
  ] });
}, Sy = ({ title: e, value: t }) => /* @__PURE__ */ v.jsxs("div", { className: Ce(X.column_card, {}), children: [
  /* @__PURE__ */ v.jsxs("div", { className: "d-flex align-items-center gap-xs", children: [
    /* @__PURE__ */ v.jsx("div", { className: "lines-2", children: e }),
    /* @__PURE__ */ v.jsx("div", { className: "spacer" })
  ] }),
  /* @__PURE__ */ v.jsx("div", { className: "d-flex flex-column", children: /* @__PURE__ */ v.jsx("div", { className: "font-normal fs-xxs text-grey", children: t }) })
] }), tr = Sy, Cy = ({ label: e }) => /* @__PURE__ */ v.jsx("div", { children: e }), Ey = Cy, _y = () => {
  var s;
  const e = mt(), {
    state: { selectedTable: t }
  } = bt(), [n, o] = fe(null), r = (s = e.getNode(t)) == null ? void 0 : s.data, [a, i] = fe(!0);
  return ie(() => {
    t && w7(t).then((c) => {
      o(c), i(!1);
    });
  }, [t]), a || !n || !t ? /* @__PURE__ */ v.jsx(_1, {}) : /* @__PURE__ */ v.jsxs("div", { className: "p-2 h-100 d-flex flex-column gap-md overflow-y", children: [
    /* @__PURE__ */ v.jsxs("div", { className: X.table_details_header, children: [
      /* @__PURE__ */ v.jsx(Ur, { nodeType: r.nodeType }),
      /* @__PURE__ */ v.jsx("div", { className: "d-flex align-items-center", children: /* @__PURE__ */ v.jsx("div", { className: "fw-semibold fs-5 lines-2", children: r.label }) })
    ] }),
    n.description ? /* @__PURE__ */ v.jsx(k1, { purpose: n.description }) : null,
    /* @__PURE__ */ v.jsxs("div", { className: Ce(X.card, "flex-grow column-section"), children: [
      /* @__PURE__ */ v.jsx(
        tr,
        {
          title: "Owner",
          value: `${n.owner.name} - ${n.owner.email}`
        }
      ),
      /* @__PURE__ */ v.jsx(tr, { title: "Url", value: n.url }),
      /* @__PURE__ */ v.jsx(
        tr,
        {
          title: "Tags",
          value: n.tags.map((c) => /* @__PURE__ */ v.jsx(Ey, { label: c }))
        }
      ),
      /* @__PURE__ */ v.jsx(tr, { title: "Maturity", value: n.maturity })
    ] })
  ] });
}, ky = _y;
function Ay({ close: e }) {
  const [t, n] = fe(
    ""
    /* None */
  ), [o, r] = fe(""), [a, i] = fe(!1);
  return /* @__PURE__ */ v.jsxs("div", { className: "p-2 h-100 d-flex flex-column", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "mb-2 d-flex", children: [
      /* @__PURE__ */ v.jsx("div", { className: "fw-semibold fs-5", children: "Feedback" }),
      /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
      /* @__PURE__ */ v.jsx(
        qe,
        {
          size: "sm",
          color: "primary",
          onClick: (s) => {
            s.stopPropagation(), k7();
          },
          children: "Chat with us"
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: X.feedback_body, children: [
      !a && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-sm m-2", children: [
          t === "good" ? /* @__PURE__ */ v.jsx(
            P9,
            {
              className: "cursor-pointer",
              onClick: () => n(
                ""
                /* None */
              )
            }
          ) : /* @__PURE__ */ v.jsx(
            I9,
            {
              className: "cursor-pointer",
              onClick: () => n(
                "good"
                /* Postive */
              )
            }
          ),
          t === "bad" ? /* @__PURE__ */ v.jsx(
            B9,
            {
              className: "cursor-pointer",
              onClick: () => n(
                ""
                /* None */
              )
            }
          ) : /* @__PURE__ */ v.jsx(
            F9,
            {
              className: "cursor-pointer",
              onClick: () => n(
                "bad"
                /* Negative */
              )
            }
          )
        ] }),
        /* @__PURE__ */ v.jsx("p", { children: "AI still needs humans sometimes, please help it out 🙂" }),
        /* @__PURE__ */ v.jsx(
          ly,
          {
            value: o,
            onChange: (s) => r(s.target.value),
            placeholder: "What did AI do wrong? What it should have done?"
          }
        ),
        /* @__PURE__ */ v.jsxs("div", { className: "mt-3 d-flex gap-sm", children: [
          /* @__PURE__ */ v.jsx(
            qe,
            {
              size: "sm",
              color: "primary",
              onClick: async (s) => {
                s.stopPropagation(), t !== "" && (await C7({
                  feedback_value: t,
                  feedback_text: o
                }), i(!0));
              },
              children: "Submit"
            }
          ),
          /* @__PURE__ */ v.jsx(
            qe,
            {
              size: "sm",
              color: "link",
              className: X.cancel_btn,
              onClick: (s) => {
                s.stopPropagation(), e();
              },
              children: "Cancel"
            }
          )
        ] })
      ] }),
      a && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("p", { children: "Many thanks for your feedback!" }),
        /* @__PURE__ */ v.jsx(
          qe,
          {
            size: "sm",
            color: "primary",
            onClick: (s) => {
              s.stopPropagation(), e();
            },
            children: "Close"
          }
        )
      ] })
    ] })
  ] });
}
function My() {
  const {
    state: { selectCheck: e, nonSelectCheck: t, defaultExpansion: n, aiEnabled: o }
  } = bt(), r = yt();
  return /* @__PURE__ */ v.jsxs("div", { className: "p-2 h-100 d-flex flex-column", children: [
    /* @__PURE__ */ v.jsx("div", { className: "mb-2 fw-semibold fs-5", children: "Settings" }),
    /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-sm", children: [
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsx(na, { check: !0, for: "default-expansion", className: "fs-6 mb-1", children: "Default Expansion" }),
        /* @__PURE__ */ v.jsx(
          Yr,
          {
            id: "default-expansion",
            value: n,
            type: "number",
            onChange: (a) => {
              const i = Math.max(parseInt(a.target.value), 0);
              r(Dd(i)), vi({ defaultExpansion: i });
            }
          }
        )
      ] }),
      o && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("div", { className: "fs-6", children: "Edges visibility" }),
        /* @__PURE__ */ v.jsxs("div", { className: X.select_node_checkbox, children: [
          /* @__PURE__ */ v.jsx(
            ur,
            {
              type: "checkbox",
              id: "select-check",
              className: "mt-2",
              checked: e,
              onChange: (a) => {
                if (Ie.inProgress) {
                  Ie.showCllInProgressMsg();
                  return;
                }
                r(Od(a.target.checked)), vi({
                  showSelectEdges: a.target.checked
                });
              }
            }
          ),
          /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column", children: [
            /* @__PURE__ */ v.jsx(na, { check: !0, for: "select-check", className: "fs-6", children: "Select" }),
            /* @__PURE__ */ v.jsx("div", { className: "text-grey", children: "Select linkages are shown if there is direct flow of data between columns through select statements." })
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: X.non_select_node_checkbox, children: [
          /* @__PURE__ */ v.jsx(
            ur,
            {
              type: "checkbox",
              id: "non-select-check",
              className: "mt-2",
              checked: t,
              onChange: (a) => {
                if (Ie.inProgress) {
                  Ie.showCllInProgressMsg();
                  return;
                }
                r(Nd(a.target.checked)), vi({
                  showNonSelectEdges: a.target.checked
                });
              }
            }
          ),
          /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column", children: [
            /* @__PURE__ */ v.jsx(na, { check: !0, for: "non-select-check", className: "fs-6", children: "Non-Select" }),
            /* @__PURE__ */ v.jsx("div", { className: "text-grey", children: "Non-Select linkages are shown if columns appear in condition/clauses like where, join, having, etc." })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const M1 = pt({ isOpen: !1, setIsOpen: () => {
} });
function Ty({
  trigger: e,
  render: t
}) {
  const n = ae(null), o = "popover-id", { isOpen: r, setIsOpen: a } = Ye(M1);
  return ie(() => {
    const i = (s) => {
      if (!n.current)
        return;
      const { x: c, y: u, width: l, height: d } = n.current.getBoundingClientRect();
      a(
        ku(c - 10, c + l + 10)(s.x) && ku(u - 10, u + d + 10)(s.y)
      );
    };
    return document.body.addEventListener("click", i), () => {
      document.body.removeEventListener("click", i);
    };
  }, [r]), /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsx(
      "div",
      {
        id: o,
        onClick: (i) => {
          i.stopPropagation(), a((s) => !s);
        },
        children: e
      }
    ),
    /* @__PURE__ */ v.jsx(
      Iu,
      {
        placement: "bottom",
        target: o,
        className: X.popover,
        isOpen: r,
        toggle: () => a((i) => !i),
        children: /* @__PURE__ */ v.jsx(Lu, { children: /* @__PURE__ */ v.jsx("div", { ref: n, children: t({ close: () => a(!1) }) }) })
      }
    )
  ] });
}
const Oy = () => {
  const e = mt(), {
    state: {
      selectedTable: t,
      leftExpansion: n,
      rightExpansion: o,
      minRange: r,
      nodeCount: a,
      defaultExpansion: i
    },
    rerender: s
  } = bt(), [c, u] = fe([0, 0]), l = yt();
  ie(() => {
    l(
      ri(
        Mu(r[0], c[0], i)
      )
    ), l(
      ai(
        Mu(r[1], c[1], i)
      )
    );
  }, [i, l, c, r]), ie(() => {
    (async () => l(
      Ln(
        await $n(
          e.getNodes(),
          e.getEdges(),
          t,
          n,
          o
        )
      )
    ))();
  }, [e, n, l, o, t]), ie(() => {
    (async () => {
      var w;
      if (!t)
        return;
      const g = (w = e.getNode(t)) == null ? void 0 : w.data;
      if (!g)
        return;
      const { level: p } = g, h = e.getNodes(), m = e.getEdges(), [x] = await ns(
        h,
        m,
        t,
        -1 / 0,
        1 / 0
      );
      let b = 1 / 0, y = -1 / 0;
      for (const S of x)
        b = Math.min(b, S.data.level), y = Math.max(y, S.data.level);
      u([p - b, y - p]);
    })();
  }, [e, t]);
  const d = me(() => {
    l(
      ri(
        n + 1 <= c[0] ? n + 1 : n
      )
    );
  }, [n, l, c]), f = me(() => {
    l(
      ai(
        o + 1 <= c[0] ? o + 1 : o
      )
    );
  }, [o, l, c]);
  return /* @__PURE__ */ v.jsx(
    Ty,
    {
      trigger: /* @__PURE__ */ v.jsxs(
        qe,
        {
          size: "sm",
          color: "primary",
          className: "d-flex gap-sm align-items-center",
          type: "button",
          children: [
            /* @__PURE__ */ v.jsx(W9, {}),
            "Expand"
          ]
        }
      ),
      render: ({ close: g }) => /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-xs", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "w-100 d-flex gap-xl justify-content-between align-items-center", children: [
          /* @__PURE__ */ v.jsxs(
            "div",
            {
              className: Ce(X.expand_nav, {
                [X.disabled]: r[0] === -1
              }),
              children: [
                /* @__PURE__ */ v.jsxs("div", { className: X.expand_nav_btn, children: [
                  /* @__PURE__ */ v.jsx(
                    "div",
                    {
                      className: X.icon,
                      onClick: (p) => {
                        p.stopPropagation(), t && l(ri(c[0]));
                      },
                      children: /* @__PURE__ */ v.jsx(q9, {})
                    }
                  ),
                  /* @__PURE__ */ v.jsx("div", { className: X.divider }),
                  /* @__PURE__ */ v.jsx(
                    "div",
                    {
                      className: X.icon,
                      onClick: (p) => {
                        p.stopPropagation(), t && d();
                      },
                      children: /* @__PURE__ */ v.jsx(K9, {})
                    }
                  )
                ] }),
                /* @__PURE__ */ v.jsx("div", { className: "text-blue px-2 py-1", children: n })
              ]
            }
          ),
          /* @__PURE__ */ v.jsxs(
            "div",
            {
              className: Ce(X.expand_nav, {
                [X.disabled]: r[1] === -1
              }),
              children: [
                /* @__PURE__ */ v.jsx("div", { className: "text-blue px-2 py-1", children: o }),
                /* @__PURE__ */ v.jsxs("div", { className: X.expand_nav_btn, children: [
                  /* @__PURE__ */ v.jsx(
                    "div",
                    {
                      className: X.icon,
                      onClick: (p) => {
                        p.stopPropagation(), t && f();
                      },
                      children: /* @__PURE__ */ v.jsx(X9, {})
                    }
                  ),
                  /* @__PURE__ */ v.jsx("div", { className: X.divider }),
                  /* @__PURE__ */ v.jsx(
                    "div",
                    {
                      className: X.icon,
                      onClick: (p) => {
                        p.stopPropagation(), t && l(ai(c[1]));
                      },
                      children: /* @__PURE__ */ v.jsx(Y9, {})
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "w-100 d-flex gap-xl justify-content-between align-items-center", children: [
          /* @__PURE__ */ v.jsx("div", { className: "normal-text", children: "Parents" }),
          /* @__PURE__ */ v.jsx("div", { className: "normal-text", children: "Children" })
        ] }),
        /* @__PURE__ */ v.jsxs(
          qe,
          {
            color: a === 0 ? "secondary" : "primary",
            size: "sm",
            disabled: a === 0,
            onClick: async (p) => {
              var b;
              if (p.stopPropagation(), !t)
                return;
              const h = (b = e.getNode(t)) == null ? void 0 : b.data;
              if (!h)
                return;
              const [m, x] = await ns(
                e.getNodes(),
                e.getEdges(),
                t,
                h.level - n,
                h.level + o
              );
              So(m, x, t), bn(m, x), e.setNodes(m), e.setEdges(x), e.fitView({ minZoom: qs }), l(
                uo(Co(m, x, t))
              ), l(
                Ln(
                  await $n(
                    m,
                    x,
                    t,
                    n,
                    o
                  )
                )
              ), s(), g();
            },
            children: [
              "Add ",
              a,
              " tables"
            ]
          }
        )
      ] })
    }
  );
}, Ny = Oy, Dy = () => {
  const {
    state: { selectedColumn: e, confidence: t, aiEnabled: n }
  } = bt(), o = document.getElementById("expand-container");
  if (o)
    return hn(
      /* @__PURE__ */ v.jsx(Eo, { className: X.menu_card_container, children: /* @__PURE__ */ v.jsx(_o, { className: X.menu_card, children: /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-sm", children: [
        /* @__PURE__ */ v.jsx(Ny, {}),
        n && e.name && t.confidence === "low" && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          /* @__PURE__ */ v.jsx("div", { className: X.verticle_divider }),
          /* @__PURE__ */ v.jsxs("div", { className: "d-flex gap-xxs align-items-center", children: [
            /* @__PURE__ */ v.jsx("div", { children: "Confidence" }),
            /* @__PURE__ */ v.jsx(
              rs,
              {
                title: "Depending on the SQL dialect and complexity of queries, there may be situations where we are not completely confident about the lineage shown in this view",
                id: "confidence",
                children: /* @__PURE__ */ v.jsx(Rp, {})
              }
            ),
            /* @__PURE__ */ v.jsx("div", { className: X.low_confidence, children: "Low" })
          ] })
        ] })
      ] }) }) }),
      o
    );
}, Ry = Dy, zy = () => {
  const e = document.getElementById("settings-container"), t = yt();
  if (e)
    return hn(
      /* @__PURE__ */ v.jsxs(
        qe,
        {
          outline: !0,
          onClick: () => t(_t(o1)),
          children: [
            /* @__PURE__ */ v.jsx(Dp, {}),
            "Settings"
          ]
        }
      ),
      e
    );
}, Iy = zy, Ly = ({ flow: e }) => {
  const t = document.getElementById("reset-container"), n = yt();
  if (t)
    return hn(
      /* @__PURE__ */ v.jsxs(
        qe,
        {
          outline: !0,
          onClick: () => {
            e.setNodes([]), e.setEdges([]), n(ln({ table: "", name: "" })), n(xr({})), n(Es({})), g1(), Ie.cancel();
          },
          "data-testid": "reset-btn",
          children: [
            /* @__PURE__ */ v.jsx(Np, {}),
            /* @__PURE__ */ v.jsx("span", { children: "Reset" })
          ]
        }
      ),
      t
    );
}, Fy = Ly;
var T1 = { exports: {} };
(function(e) {
  var t = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */
  var n = function(o) {
    var r = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, a = 0, i = {}, s = {
      /**
       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
       * additional languages or plugins yourself.
       *
       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
       *
       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.manual = true;
       * // add a new <script> to load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      manual: o.Prism && o.Prism.manual,
      /**
       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
       * own worker, you don't want it to do this.
       *
       * By setting this value to `true`, Prism will not add its own listeners to the worker.
       *
       * You obviously have to change this value before Prism executes. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.disableWorkerMessageHandler = true;
       * // Load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      disableWorkerMessageHandler: o.Prism && o.Prism.disableWorkerMessageHandler,
      /**
       * A namespace for utility methods.
       *
       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
       * change or disappear at any time.
       *
       * @namespace
       * @memberof Prism
       */
      util: {
        encode: function b(y) {
          return y instanceof c ? new c(y.type, b(y.content), y.alias) : Array.isArray(y) ? y.map(b) : y.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
        },
        /**
         * Returns the name of the type of the given value.
         *
         * @param {any} o
         * @returns {string}
         * @example
         * type(null)      === 'Null'
         * type(undefined) === 'Undefined'
         * type(123)       === 'Number'
         * type('foo')     === 'String'
         * type(true)      === 'Boolean'
         * type([1, 2])    === 'Array'
         * type({})        === 'Object'
         * type(String)    === 'Function'
         * type(/abc+/)    === 'RegExp'
         */
        type: function(b) {
          return Object.prototype.toString.call(b).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(b) {
          return b.__id || Object.defineProperty(b, "__id", { value: ++a }), b.__id;
        },
        /**
         * Creates a deep clone of the given object.
         *
         * The main intended use of this function is to clone language definitions.
         *
         * @param {T} o
         * @param {Record<number, any>} [visited]
         * @returns {T}
         * @template T
         */
        clone: function b(y, w) {
          w = w || {};
          var S, k;
          switch (s.util.type(y)) {
            case "Object":
              if (k = s.util.objId(y), w[k])
                return w[k];
              S = /** @type {Record<string, any>} */
              {}, w[k] = S;
              for (var M in y)
                y.hasOwnProperty(M) && (S[M] = b(y[M], w));
              return (
                /** @type {any} */
                S
              );
            case "Array":
              return k = s.util.objId(y), w[k] ? w[k] : (S = [], w[k] = S, /** @type {Array} */
              /** @type {any} */
              y.forEach(function(C, T) {
                S[T] = b(C, w);
              }), /** @type {any} */
              S);
            default:
              return y;
          }
        },
        /**
         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
         *
         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
         *
         * @param {Element} element
         * @returns {string}
         */
        getLanguage: function(b) {
          for (; b; ) {
            var y = r.exec(b.className);
            if (y)
              return y[1].toLowerCase();
            b = b.parentElement;
          }
          return "none";
        },
        /**
         * Sets the Prism `language-xxxx` class of the given element.
         *
         * @param {Element} element
         * @param {string} language
         * @returns {void}
         */
        setLanguage: function(b, y) {
          b.className = b.className.replace(RegExp(r, "gi"), ""), b.classList.add("language-" + y);
        },
        /**
         * Returns the script element that is currently executing.
         *
         * This does __not__ work for line script element.
         *
         * @returns {HTMLScriptElement | null}
         */
        currentScript: function() {
          if (typeof document > "u")
            return null;
          if ("currentScript" in document)
            return (
              /** @type {any} */
              document.currentScript
            );
          try {
            throw new Error();
          } catch (S) {
            var b = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(S.stack) || [])[1];
            if (b) {
              var y = document.getElementsByTagName("script");
              for (var w in y)
                if (y[w].src == b)
                  return y[w];
            }
            return null;
          }
        },
        /**
         * Returns whether a given class is active for `element`.
         *
         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
         * given class is just the given class with a `no-` prefix.
         *
         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
         * ancestors have the given class or the negated version of it, then the default activation will be returned.
         *
         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
         * version of it, the class is considered active.
         *
         * @param {Element} element
         * @param {string} className
         * @param {boolean} [defaultActivation=false]
         * @returns {boolean}
         */
        isActive: function(b, y, w) {
          for (var S = "no-" + y; b; ) {
            var k = b.classList;
            if (k.contains(y))
              return !0;
            if (k.contains(S))
              return !1;
            b = b.parentElement;
          }
          return !!w;
        }
      },
      /**
       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
       *
       * @namespace
       * @memberof Prism
       * @public
       */
      languages: {
        /**
         * The grammar for plain, unformatted text.
         */
        plain: i,
        plaintext: i,
        text: i,
        txt: i,
        /**
         * Creates a deep copy of the language with the given id and appends the given tokens.
         *
         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
         * will be overwritten at its original position.
         *
         * ## Best practices
         *
         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
         *
         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
         *
         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
         * @param {Grammar} redef The new tokens to append.
         * @returns {Grammar} The new language created.
         * @public
         * @example
         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
         *     // at its original position
         *     'comment': { ... },
         *     // CSS doesn't have a 'color' token, so this token will be appended
         *     'color': /\b(?:red|green|blue)\b/
         * });
         */
        extend: function(b, y) {
          var w = s.util.clone(s.languages[b]);
          for (var S in y)
            w[S] = y[S];
          return w;
        },
        /**
         * Inserts tokens _before_ another token in a language definition or any other grammar.
         *
         * ## Usage
         *
         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
         * this:
         *
         * ```js
         * Prism.languages.markup.style = {
         *     // token
         * };
         * ```
         *
         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
         * before existing tokens. For the CSS example above, you would use it like this:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'cdata', {
         *     'style': {
         *         // token
         *     }
         * });
         * ```
         *
         * ## Special cases
         *
         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
         * will be ignored.
         *
         * This behavior can be used to insert tokens after `before`:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'comment', {
         *     'comment': Prism.languages.markup.comment,
         *     // tokens after 'comment'
         * });
         * ```
         *
         * ## Limitations
         *
         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
         * deleting properties which is necessary to insert at arbitrary positions.
         *
         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
         * Instead, it will create a new object and replace all references to the target object with the new one. This
         * can be done without temporarily deleting properties, so the iteration order is well-defined.
         *
         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
         * you hold the target object in a variable, then the value of the variable will not change.
         *
         * ```js
         * var oldMarkup = Prism.languages.markup;
         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
         *
         * assert(oldMarkup !== Prism.languages.markup);
         * assert(newMarkup === Prism.languages.markup);
         * ```
         *
         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
         * object to be modified.
         * @param {string} before The key to insert before.
         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
         * object to be modified.
         *
         * Defaults to `Prism.languages`.
         * @returns {Grammar} The new grammar object.
         * @public
         */
        insertBefore: function(b, y, w, S) {
          S = S || /** @type {any} */
          s.languages;
          var k = S[b], M = {};
          for (var C in k)
            if (k.hasOwnProperty(C)) {
              if (C == y)
                for (var T in w)
                  w.hasOwnProperty(T) && (M[T] = w[T]);
              w.hasOwnProperty(C) || (M[C] = k[C]);
            }
          var D = S[b];
          return S[b] = M, s.languages.DFS(s.languages, function(F, $) {
            $ === D && F != b && (this[F] = M);
          }), M;
        },
        // Traverse a language definition with Depth First Search
        DFS: function b(y, w, S, k) {
          k = k || {};
          var M = s.util.objId;
          for (var C in y)
            if (y.hasOwnProperty(C)) {
              w.call(y, C, y[C], S || C);
              var T = y[C], D = s.util.type(T);
              D === "Object" && !k[M(T)] ? (k[M(T)] = !0, b(T, w, null, k)) : D === "Array" && !k[M(T)] && (k[M(T)] = !0, b(T, w, C, k));
            }
        }
      },
      plugins: {},
      /**
       * This is the most high-level function in Prism’s API.
       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
       * each one of them.
       *
       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
       *
       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
       * @memberof Prism
       * @public
       */
      highlightAll: function(b, y) {
        s.highlightAllUnder(document, b, y);
      },
      /**
       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
       * {@link Prism.highlightElement} on each one of them.
       *
       * The following hooks will be run:
       * 1. `before-highlightall`
       * 2. `before-all-elements-highlight`
       * 3. All hooks of {@link Prism.highlightElement} for each element.
       *
       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
       * @memberof Prism
       * @public
       */
      highlightAllUnder: function(b, y, w) {
        var S = {
          callback: w,
          container: b,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        s.hooks.run("before-highlightall", S), S.elements = Array.prototype.slice.apply(S.container.querySelectorAll(S.selector)), s.hooks.run("before-all-elements-highlight", S);
        for (var k = 0, M; M = S.elements[k++]; )
          s.highlightElement(M, y === !0, S.callback);
      },
      /**
       * Highlights the code inside a single element.
       *
       * The following hooks will be run:
       * 1. `before-sanity-check`
       * 2. `before-highlight`
       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
       * 4. `before-insert`
       * 5. `after-highlight`
       * 6. `complete`
       *
       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
       * the element's language.
       *
       * @param {Element} element The element containing the code.
       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
       *
       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
       * asynchronous highlighting to work. You can build your own bundle on the
       * [Download page](https://prismjs.com/download.html).
       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
       * @memberof Prism
       * @public
       */
      highlightElement: function(b, y, w) {
        var S = s.util.getLanguage(b), k = s.languages[S];
        s.util.setLanguage(b, S);
        var M = b.parentElement;
        M && M.nodeName.toLowerCase() === "pre" && s.util.setLanguage(M, S);
        var C = b.textContent, T = {
          element: b,
          language: S,
          grammar: k,
          code: C
        };
        function D($) {
          T.highlightedCode = $, s.hooks.run("before-insert", T), T.element.innerHTML = T.highlightedCode, s.hooks.run("after-highlight", T), s.hooks.run("complete", T), w && w.call(T.element);
        }
        if (s.hooks.run("before-sanity-check", T), M = T.element.parentElement, M && M.nodeName.toLowerCase() === "pre" && !M.hasAttribute("tabindex") && M.setAttribute("tabindex", "0"), !T.code) {
          s.hooks.run("complete", T), w && w.call(T.element);
          return;
        }
        if (s.hooks.run("before-highlight", T), !T.grammar) {
          D(s.util.encode(T.code));
          return;
        }
        if (y && o.Worker) {
          var F = new Worker(s.filename);
          F.onmessage = function($) {
            D($.data);
          }, F.postMessage(JSON.stringify({
            language: T.language,
            code: T.code,
            immediateClose: !0
          }));
        } else
          D(s.highlight(T.code, T.grammar, T.language));
      },
      /**
       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
       * and the language definitions to use, and returns a string with the HTML produced.
       *
       * The following hooks will be run:
       * 1. `before-tokenize`
       * 2. `after-tokenize`
       * 3. `wrap`: On each {@link Token}.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @param {string} language The name of the language definition passed to `grammar`.
       * @returns {string} The highlighted HTML.
       * @memberof Prism
       * @public
       * @example
       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
       */
      highlight: function(b, y, w) {
        var S = {
          code: b,
          grammar: y,
          language: w
        };
        if (s.hooks.run("before-tokenize", S), !S.grammar)
          throw new Error('The language "' + S.language + '" has no grammar.');
        return S.tokens = s.tokenize(S.code, S.grammar), s.hooks.run("after-tokenize", S), c.stringify(s.util.encode(S.tokens), S.language);
      },
      /**
       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
       * and the language definitions to use, and returns an array with the tokenized code.
       *
       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
       *
       * This method could be useful in other contexts as well, as a very crude parser.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @returns {TokenStream} An array of strings and tokens, a token stream.
       * @memberof Prism
       * @public
       * @example
       * let code = `var foo = 0;`;
       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
       * tokens.forEach(token => {
       *     if (token instanceof Prism.Token && token.type === 'number') {
       *         console.log(`Found numeric literal: ${token.content}`);
       *     }
       * });
       */
      tokenize: function(b, y) {
        var w = y.rest;
        if (w) {
          for (var S in w)
            y[S] = w[S];
          delete y.rest;
        }
        var k = new d();
        return f(k, k.head, b), l(b, k, y, k.head, 0), p(k);
      },
      /**
       * @namespace
       * @memberof Prism
       * @public
       */
      hooks: {
        all: {},
        /**
         * Adds the given callback to the list of callbacks for the given hook.
         *
         * The callback will be invoked when the hook it is registered for is run.
         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
         *
         * One callback function can be registered to multiple hooks and the same hook multiple times.
         *
         * @param {string} name The name of the hook.
         * @param {HookCallback} callback The callback function which is given environment variables.
         * @public
         */
        add: function(b, y) {
          var w = s.hooks.all;
          w[b] = w[b] || [], w[b].push(y);
        },
        /**
         * Runs a hook invoking all registered callbacks with the given environment variables.
         *
         * Callbacks will be invoked synchronously and in the order in which they were registered.
         *
         * @param {string} name The name of the hook.
         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
         * @public
         */
        run: function(b, y) {
          var w = s.hooks.all[b];
          if (!(!w || !w.length))
            for (var S = 0, k; k = w[S++]; )
              k(y);
        }
      },
      Token: c
    };
    o.Prism = s;
    function c(b, y, w, S) {
      this.type = b, this.content = y, this.alias = w, this.length = (S || "").length | 0;
    }
    c.stringify = function b(y, w) {
      if (typeof y == "string")
        return y;
      if (Array.isArray(y)) {
        var S = "";
        return y.forEach(function(D) {
          S += b(D, w);
        }), S;
      }
      var k = {
        type: y.type,
        content: b(y.content, w),
        tag: "span",
        classes: ["token", y.type],
        attributes: {},
        language: w
      }, M = y.alias;
      M && (Array.isArray(M) ? Array.prototype.push.apply(k.classes, M) : k.classes.push(M)), s.hooks.run("wrap", k);
      var C = "";
      for (var T in k.attributes)
        C += " " + T + '="' + (k.attributes[T] || "").replace(/"/g, "&quot;") + '"';
      return "<" + k.tag + ' class="' + k.classes.join(" ") + '"' + C + ">" + k.content + "</" + k.tag + ">";
    };
    function u(b, y, w, S) {
      b.lastIndex = y;
      var k = b.exec(w);
      if (k && S && k[1]) {
        var M = k[1].length;
        k.index += M, k[0] = k[0].slice(M);
      }
      return k;
    }
    function l(b, y, w, S, k, M) {
      for (var C in w)
        if (!(!w.hasOwnProperty(C) || !w[C])) {
          var T = w[C];
          T = Array.isArray(T) ? T : [T];
          for (var D = 0; D < T.length; ++D) {
            if (M && M.cause == C + "," + D)
              return;
            var F = T[D], $ = F.inside, P = !!F.lookbehind, E = !!F.greedy, A = F.alias;
            if (E && !F.pattern.global) {
              var _ = F.pattern.toString().match(/[imsuy]*$/)[0];
              F.pattern = RegExp(F.pattern.source, _ + "g");
            }
            for (var z = F.pattern || F, R = S.next, N = k; R !== y.tail && !(M && N >= M.reach); N += R.value.length, R = R.next) {
              var O = R.value;
              if (y.length > b.length)
                return;
              if (!(O instanceof c)) {
                var I = 1, j;
                if (E) {
                  if (j = u(z, N, b, P), !j || j.index >= b.length)
                    break;
                  var Z = j.index, V = j.index + j[0].length, W = N;
                  for (W += R.value.length; Z >= W; )
                    R = R.next, W += R.value.length;
                  if (W -= R.value.length, N = W, R.value instanceof c)
                    continue;
                  for (var U = R; U !== y.tail && (W < V || typeof U.value == "string"); U = U.next)
                    I++, W += U.value.length;
                  I--, O = b.slice(N, W), j.index -= N;
                } else if (j = u(z, 0, O, P), !j)
                  continue;
                var Z = j.index, K = j[0], Q = O.slice(0, Z), te = O.slice(Z + K.length), q = N + O.length;
                M && q > M.reach && (M.reach = q);
                var se = R.prev;
                Q && (se = f(y, se, Q), N += Q.length), g(y, se, I);
                var G = new c(C, $ ? s.tokenize(K, $) : K, A, K);
                if (R = f(y, se, G), te && f(y, R, te), I > 1) {
                  var pe = {
                    cause: C + "," + D,
                    reach: q
                  };
                  l(b, y, w, R.prev, N, pe), M && pe.reach > M.reach && (M.reach = pe.reach);
                }
              }
            }
          }
        }
    }
    function d() {
      var b = { value: null, prev: null, next: null }, y = { value: null, prev: b, next: null };
      b.next = y, this.head = b, this.tail = y, this.length = 0;
    }
    function f(b, y, w) {
      var S = y.next, k = { value: w, prev: y, next: S };
      return y.next = k, S.prev = k, b.length++, k;
    }
    function g(b, y, w) {
      for (var S = y.next, k = 0; k < w && S !== b.tail; k++)
        S = S.next;
      y.next = S, S.prev = y, b.length -= k;
    }
    function p(b) {
      for (var y = [], w = b.head.next; w !== b.tail; )
        y.push(w.value), w = w.next;
      return y;
    }
    if (!o.document)
      return o.addEventListener && (s.disableWorkerMessageHandler || o.addEventListener("message", function(b) {
        var y = JSON.parse(b.data), w = y.language, S = y.code, k = y.immediateClose;
        o.postMessage(s.highlight(S, s.languages[w], w)), k && o.close();
      }, !1)), s;
    var h = s.util.currentScript();
    h && (s.filename = h.src, h.hasAttribute("data-manual") && (s.manual = !0));
    function m() {
      s.manual || s.highlightAll();
    }
    if (!s.manual) {
      var x = document.readyState;
      x === "loading" || x === "interactive" && h && h.defer ? document.addEventListener("DOMContentLoaded", m) : window.requestAnimationFrame ? window.requestAnimationFrame(m) : window.setTimeout(m, 16);
    }
    return s;
  }(t);
  e.exports && (e.exports = n), typeof wi < "u" && (wi.Prism = n), n.languages.markup = {
    comment: {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: !0
    },
    prolog: {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: !0
    },
    doctype: {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: !0,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: !0,
          greedy: !0,
          inside: null
          // see below
        },
        string: {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: !0
        },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /[^\s<>'"]+/
      }
    },
    cdata: {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: !0
    },
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: !0
              }
            ]
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      },
      /&#x?[\da-f]{1,8};/i
    ]
  }, n.languages.markup.tag.inside["attr-value"].inside.entity = n.languages.markup.entity, n.languages.markup.doctype.inside["internal-subset"].inside = n.languages.markup, n.hooks.add("wrap", function(o) {
    o.type === "entity" && (o.attributes.title = o.content.replace(/&amp;/, "&"));
  }), Object.defineProperty(n.languages.markup.tag, "addInlined", {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function(r, a) {
      var i = {};
      i["language-" + a] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: n.languages[a]
      }, i.cdata = /^<!\[CDATA\[|\]\]>$/i;
      var s = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: i
        }
      };
      s["language-" + a] = {
        pattern: /[\s\S]+/,
        inside: n.languages[a]
      };
      var c = {};
      c[r] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return r;
        }), "i"),
        lookbehind: !0,
        greedy: !0,
        inside: s
      }, n.languages.insertBefore("markup", "cdata", c);
    }
  }), Object.defineProperty(n.languages.markup.tag, "addAttribute", {
    /**
     * Adds an pattern to highlight languages embedded in HTML attributes.
     *
     * An example of an inlined language is CSS with `style` attributes.
     *
     * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addAttribute('style', 'css');
     */
    value: function(o, r) {
      n.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source + "(?:" + o + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [r, "language-" + r],
                inside: n.languages[r]
              },
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  }), n.languages.html = n.languages.markup, n.languages.mathml = n.languages.markup, n.languages.svg = n.languages.markup, n.languages.xml = n.languages.extend("markup", {}), n.languages.ssml = n.languages.xml, n.languages.atom = n.languages.xml, n.languages.rss = n.languages.xml, function(o) {
    var r = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    o.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + r.source + ")*?" + /(?:;|(?=\s*\{))/.source),
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: !0,
            alias: "selector"
          },
          keyword: {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: !0
          }
          // See rest below
        }
      },
      url: {
        // https://drafts.csswg.org/css-values-3/#urls
        pattern: RegExp("\\burl\\((?:" + r.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
        greedy: !0,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: {
            pattern: RegExp("^" + r.source + "$"),
            alias: "url"
          }
        }
      },
      selector: {
        pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + r.source + ")*(?=\\s*\\{)"),
        lookbehind: !0
      },
      string: {
        pattern: r,
        greedy: !0
      },
      property: {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: !0
      },
      important: /!important\b/i,
      function: {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: !0
      },
      punctuation: /[(){};:,]/
    }, o.languages.css.atrule.inside.rest = o.languages.css;
    var a = o.languages.markup;
    a && (a.tag.addInlined("style", "css"), a.tag.addAttribute("style", "css"));
  }(n), n.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
      }
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: {
        punctuation: /[.\\]/
      }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
  }, n.languages.javascript = n.languages.extend("clike", {
    "class-name": [
      n.languages.clike["class-name"],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0
      }
    ],
    keyword: [
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: !0
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
      }
    ],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
      pattern: RegExp(
        /(^|[^\w$])/.source + "(?:" + // constant
        (/NaN|Infinity/.source + "|" + // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
        /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
      ),
      lookbehind: !0
    },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  }), n.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, n.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: RegExp(
        // lookbehind
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
        // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
        // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
        // with the only syntax, so we have to define 2 different regex patterns.
        /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
        /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
        /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: n.languages.regex
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/
      }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function"
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: n.languages.javascript
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: n.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: n.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: n.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  }), n.languages.insertBefore("javascript", "string", {
    hashbang: {
      pattern: /^#!.*/,
      greedy: !0,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: n.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    },
    "string-property": {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: "property"
    }
  }), n.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: "property"
    }
  }), n.languages.markup && (n.languages.markup.tag.addInlined("script", "javascript"), n.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    "javascript"
  )), n.languages.js = n.languages.javascript, function() {
    if (typeof n > "u" || typeof document > "u")
      return;
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
    var o = "Loading…", r = function(h, m) {
      return "✖ Error " + h + " while fetching file: " + m;
    }, a = "✖ Error: File does not exist or is empty", i = {
      js: "javascript",
      py: "python",
      rb: "ruby",
      ps1: "powershell",
      psm1: "powershell",
      sh: "bash",
      bat: "batch",
      h: "c",
      tex: "latex"
    }, s = "data-src-status", c = "loading", u = "loaded", l = "failed", d = "pre[data-src]:not([" + s + '="' + u + '"]):not([' + s + '="' + c + '"])';
    function f(h, m, x) {
      var b = new XMLHttpRequest();
      b.open("GET", h, !0), b.onreadystatechange = function() {
        b.readyState == 4 && (b.status < 400 && b.responseText ? m(b.responseText) : b.status >= 400 ? x(r(b.status, b.statusText)) : x(a));
      }, b.send(null);
    }
    function g(h) {
      var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(h || "");
      if (m) {
        var x = Number(m[1]), b = m[2], y = m[3];
        return b ? y ? [x, Number(y)] : [x, void 0] : [x, x];
      }
    }
    n.hooks.add("before-highlightall", function(h) {
      h.selector += ", " + d;
    }), n.hooks.add("before-sanity-check", function(h) {
      var m = (
        /** @type {HTMLPreElement} */
        h.element
      );
      if (m.matches(d)) {
        h.code = "", m.setAttribute(s, c);
        var x = m.appendChild(document.createElement("CODE"));
        x.textContent = o;
        var b = m.getAttribute("data-src"), y = h.language;
        if (y === "none") {
          var w = (/\.(\w+)$/.exec(b) || [, "none"])[1];
          y = i[w] || w;
        }
        n.util.setLanguage(x, y), n.util.setLanguage(m, y);
        var S = n.plugins.autoloader;
        S && S.loadLanguages(y), f(
          b,
          function(k) {
            m.setAttribute(s, u);
            var M = g(m.getAttribute("data-range"));
            if (M) {
              var C = k.split(/\r\n?|\n/g), T = M[0], D = M[1] == null ? C.length : M[1];
              T < 0 && (T += C.length), T = Math.max(0, Math.min(T - 1, C.length)), D < 0 && (D += C.length), D = Math.max(0, Math.min(D, C.length)), k = C.slice(T, D).join(`
`), m.hasAttribute("data-start") || m.setAttribute("data-start", String(T + 1));
            }
            x.textContent = k, n.highlightElement(x);
          },
          function(k) {
            m.setAttribute(s, l), x.textContent = k;
          }
        );
      }
    }), n.plugins.fileHighlight = {
      /**
       * Executes the File Highlight plugin for all matching `pre` elements under the given container.
       *
       * Note: Elements which are already loaded or currently loading will not be touched by this method.
       *
       * @param {ParentNode} [container=document]
       */
      highlight: function(m) {
        for (var x = (m || document).querySelectorAll(d), b = 0, y; y = x[b++]; )
          n.highlightElement(y);
      }
    };
    var p = !1;
    n.fileHighlight = function() {
      p || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), p = !0), n.plugins.fileHighlight.highlight.apply(this, arguments);
    };
  }();
})(T1);
var jy = T1.exports;
const Py = /* @__PURE__ */ mn(jy);
function Hy() {
  const {
    state: { viewsCodeModal: e }
  } = bt(), t = yt();
  ie(() => {
    setTimeout(() => {
      Py.highlightAll(!0);
    }, 500);
  }, [e]);
  const n = mt(), o = Ee(() => {
    var a, i;
    return e ? (i = (a = n.getNode(e.table)) == null ? void 0 : a.data) == null ? void 0 : i.label : "";
  }, [n, e]), r = Ee(() => {
    const a = Object.values((e == null ? void 0 : e.viewsCode) || []).flat().filter(([, s]) => s === "transform").map(([s]) => s), i = [];
    for (const s of a)
      i.includes(s) || i.push(s);
    return i;
  }, [e == null ? void 0 : e.viewsCode]);
  if (e)
    return /* @__PURE__ */ v.jsx(
      q1,
      {
        size: "lg",
        isOpen: !!e,
        toggle: () => t(zi(null)),
        centered: !0,
        unmountOnClose: !0,
        scrollable: !0,
        className: "bs-modal",
        children: /* @__PURE__ */ v.jsxs(U1, { children: [
          /* @__PURE__ */ v.jsx(
            "div",
            {
              className: X.close_button,
              onClick: () => t(zi(null)),
              children: /* @__PURE__ */ v.jsx(w1, {})
            }
          ),
          /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-sm", children: [
            o && /* @__PURE__ */ v.jsx(A1, { nodeType: e.nodeType, table: o }),
            /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-xs", children: [
              /* @__PURE__ */ v.jsx("div", { className: "text-dark-grey fs-xs", children: "Column" }),
              /* @__PURE__ */ v.jsx("div", { className: X.model_views_type, children: e.column })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-xs", children: [
              /* @__PURE__ */ v.jsx("div", { className: "text-dark-grey fs-xs", children: "Type" }),
              /* @__PURE__ */ v.jsxs("div", { className: X.model_views_type, children: [
                /* @__PURE__ */ v.jsx(Qs, { viewsType: e.viewsType }),
                e.viewsType
              ] })
            ] }),
            r.length > 0 && /* @__PURE__ */ v.jsxs("div", { className: "d-flex flex-column gap-xs", children: [
              /* @__PURE__ */ v.jsx("div", { className: "text-dark-grey fs-xs", children: "List of transformations" }),
              r.map((a) => /* @__PURE__ */ v.jsx("div", { className: X.modal_views_code_container, children: /* @__PURE__ */ v.jsx("div", { className: "d-flex gap-sm align-items-center", children: /* @__PURE__ */ v.jsx(
                "pre",
                {
                  className: Ce(
                    X.code_editor_container,
                    "language-sql"
                  ),
                  children: /* @__PURE__ */ v.jsx(
                    "code",
                    {
                      className: Ce(
                        "language-sql",
                        X.code_editor
                      ),
                      children: a
                    }
                  )
                }
              ) }) }, a))
            ] })
          ] })
        ] })
      }
    );
}
const By = {
  table: oy,
  seeMore: ry,
  column: iy
}, $y = { selfConnecting: ay }, Wy = ({
  flow: e,
  afterFlowRender: t,
  theme: n
}) => {
  const [o, r] = fe(!1), {
    state: { selectCheck: a, nonSelectCheck: i, sidebarScreen: s }
  } = bt(), c = yt(), u = me(async () => {
    const l = await E7();
    c(Od(l.showSelectEdges)), c(Nd(l.showNonSelectEdges)), c(Dd(l.defaultExpansion));
  }, [c]);
  return ie(() => {
    g1(), u();
  }, [u]), ie(() => {
    var f;
    const l = e.current;
    if (!l)
      return;
    const d = l.getEdges();
    if (a && i || !a && !i) {
      for (const g of d)
        g.hidden = !1;
      l.setEdges(d);
      return;
    }
    for (const g of d) {
      g.hidden = !1;
      const p = (f = g.data) == null ? void 0 : f.type;
      p && (p === "direct" && (g.hidden = !a), p === "indirect" && (g.hidden = !i));
    }
    l.setEdges(d);
  }, [a, i, e]), /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: "lineage_flow_component",
      style: { width: "100%", height: "100%" },
      "data-theme": n,
      children: [
        /* @__PURE__ */ v.jsx(M1.Provider, { value: { isOpen: o, setIsOpen: r }, children: /* @__PURE__ */ v.jsxs($s, { children: [
          /* @__PURE__ */ v.jsxs(
            Xf,
            {
              defaultNodes: [],
              defaultEdges: [],
              onInit: (l) => t(l),
              nodeTypes: By,
              edgeTypes: $y,
              style: { background: "var(--bg-color)" },
              proOptions: { hideAttribution: !0 },
              minZoom: qs,
              children: [
                /* @__PURE__ */ v.jsx(l7, {}),
                /* @__PURE__ */ v.jsx(n7, {})
              ]
            }
          ),
          /* @__PURE__ */ v.jsx(ey, {}),
          /* @__PURE__ */ v.jsxs(
            sy,
            {
              isOpen: s !== "",
              closeModal: () => c(_t("")),
              width: 446,
              children: [
                s === n1 && /* @__PURE__ */ v.jsx(uy, {}),
                s === e1 && /* @__PURE__ */ v.jsx(wy, {}),
                s === t1 && /* @__PURE__ */ v.jsx(ky, {}),
                s === c7 && /* @__PURE__ */ v.jsx(Ay, { close: () => _t("") }),
                s === o1 && /* @__PURE__ */ v.jsx(My, {})
              ]
            }
          ),
          /* @__PURE__ */ v.jsx(Ry, {}),
          /* @__PURE__ */ v.jsx(Iy, {}),
          e.current ? /* @__PURE__ */ v.jsx(Fy, { flow: e.current }) : null,
          /* @__PURE__ */ v.jsx(Hy, {})
        ] }) }),
        /* @__PURE__ */ v.jsx("div", { id: "sidebar" })
      ]
    }
  );
}, Vy = Wy, el = pt({
  state: yr.getInitialState(),
  dispatch: () => null,
  rerender: () => null
}), qy = ({
  renderNode: e,
  theme: t = "dark"
}) => {
  const [n, o] = Nu(yr.reducer, {
    ...yr.getInitialState()
  }), r = ae(), [, a] = fe(0), i = me(() => a((d) => (d + 1) % 100), []), s = me(
    async (d) => {
      if (o(_t("")), !d)
        return;
      o(mm(d.aiEnabled));
      const { node: f } = d, g = r.current;
      if (!g || !f)
        return;
      if (g.getNode(f.table)) {
        o(vr(f.table));
        let b = g.getNodes(), y = g.getEdges();
        n.selectedColumn.name || ([b, y] = So(b, y, f.table), g.setNodes(b), g.setEdges(y)), o(uo(Co(b, y, f.table))), o(
          Ln(
            await $n(
              b,
              y,
              f.table,
              n.leftExpansion,
              n.rightExpansion
            )
          )
        );
        return;
      }
      let h = [], m = [];
      const x = async (b, y) => {
        [h, m] = await Xs(h, m, b, y);
      };
      h = [Ks(f, 0, "")], f.upstreamCount > 0 && await x(f.table, !0), f.downstreamCount > 0 && await x(f.table, !1), o(vr(f.table)), o(ln({ table: "", name: "" })), o(xr({})), o(Es({})), [h, m] = So(h, m, f.table), bn(h, m), g.setNodes(h), g.setEdges(m), g.fitView({ minZoom: qs, duration: 500 }), o(uo(Co(h, m, f.table))), o(
        Ln(
          await $n(
            h,
            m,
            f.table,
            n.leftExpansion,
            n.rightExpansion
          )
        )
      ), i();
    },
    [
      i,
      n.leftExpansion,
      n.rightExpansion,
      n.selectedColumn.name
    ]
  ), c = () => {
    if (r.current) {
      const d = r.current.getEdges();
      xo(d, !0), wo(d, !1), r.current.setEdges(d);
    }
  };
  ie(() => (document.addEventListener("cll_cancelled", c), () => {
    document.removeEventListener("cll_cancelled", c);
  }), []);
  const u = Ee(
    () => ({
      state: n,
      dispatch: o,
      rerender: i
    }),
    [n, o, i]
  ), l = (d) => {
    r.current = d, s(e);
  };
  return ie(() => {
    !e.node || !r.current || s(e);
  }, [e, s]), /* @__PURE__ */ v.jsx(el.Provider, { value: u, children: /* @__PURE__ */ v.jsx(
    Vy,
    {
      afterFlowRender: l,
      flow: r,
      theme: t
    }
  ) });
}, Uy = qy, bt = () => Ye(el), yt = () => {
  const { dispatch: e } = Ye(el);
  return e;
}, Yy = (e) => /* @__PURE__ */ v.jsx(Uy, { ...e }), dv = Yy;
export {
  Ne as A,
  n0 as C,
  uv as D,
  dv as L,
  we as a,
  rv as b,
  av as c,
  Jy as d,
  ls as e,
  Ft as f,
  o0 as g,
  is as h,
  wd as i,
  v as j,
  Y2 as k,
  T7 as l,
  Ie as m,
  ov as s,
  rt as u
};
