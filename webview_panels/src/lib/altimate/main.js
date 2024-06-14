import "./main.css";
var _1 = Object.defineProperty;
var k1 = (e, t, n) =>
  t in e
    ? _1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Lo = (e, t, n) => (k1(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as F from "react";
import j, {
  createContext as pt,
  Component as A1,
  createElement as Gs,
  isValidElement as _u,
  useState as de,
  useRef as ae,
  useReducer as ku,
  useCallback as he,
  useMemo as Oe,
  useContext as Ye,
  useLayoutEffect as M1,
  useEffect as ie,
  useId as Au,
  useInsertionEffect as T1,
  cloneElement as O1,
  Children as Nn,
  lazy as N1,
  memo as Me,
  forwardRef as Mu,
} from "react";
import { Prism as D1 } from "react-syntax-highlighter";
import {
  Tooltip as R1,
  Button as qe,
  Spinner as z1,
  Card as Eo,
  CardTitle as Tu,
  CardBody as _o,
  CloseButton as I1,
  Popover as Ou,
  PopoverBody as Nu,
  UncontrolledTooltip as L1,
  Badge as P1,
  Input as ur,
  Label as na,
} from "reactstrap";
import H1, { createPortal as pn } from "react-dom";
var j1 =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function $n(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var xi = { exports: {} },
  qn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qs;
function F1() {
  if (Qs) return qn;
  Qs = 1;
  var e = j,
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    o = Object.prototype.hasOwnProperty,
    r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(s, c, u) {
    var l,
      d = {},
      f = null,
      g = null;
    u !== void 0 && (f = "" + u),
      c.key !== void 0 && (f = "" + c.key),
      c.ref !== void 0 && (g = c.ref);
    for (l in c) o.call(c, l) && !a.hasOwnProperty(l) && (d[l] = c[l]);
    if (s && s.defaultProps)
      for (l in ((c = s.defaultProps), c)) d[l] === void 0 && (d[l] = c[l]);
    return {
      $$typeof: t,
      type: s,
      key: f,
      ref: g,
      props: d,
      _owner: r.current,
    };
  }
  return (qn.Fragment = n), (qn.jsx = i), (qn.jsxs = i), qn;
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
var Js;
function B1() {
  return (
    Js ||
      ((Js = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = j,
            t = Symbol.for("react.element"),
            n = Symbol.for("react.portal"),
            o = Symbol.for("react.fragment"),
            r = Symbol.for("react.strict_mode"),
            a = Symbol.for("react.profiler"),
            i = Symbol.for("react.provider"),
            s = Symbol.for("react.context"),
            c = Symbol.for("react.forward_ref"),
            u = Symbol.for("react.suspense"),
            l = Symbol.for("react.suspense_list"),
            d = Symbol.for("react.memo"),
            f = Symbol.for("react.lazy"),
            g = Symbol.for("react.offscreen"),
            p = Symbol.iterator,
            h = "@@iterator";
          function m(R) {
            if (R === null || typeof R != "object") return null;
            var U = (p && R[p]) || R[h];
            return typeof U == "function" ? U : null;
          }
          var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function x(R) {
            {
              for (
                var U = arguments.length,
                  J = new Array(U > 1 ? U - 1 : 0),
                  re = 1;
                re < U;
                re++
              )
                J[re - 1] = arguments[re];
              C("error", R, J);
            }
          }
          function C(R, U, J) {
            {
              var re = y.ReactDebugCurrentFrame,
                pe = re.getStackAddendum();
              pe !== "" && ((U += "%s"), (J = J.concat([pe])));
              var ve = J.map(function (ge) {
                return String(ge);
              });
              ve.unshift("Warning: " + U),
                Function.prototype.apply.call(console[R], console, ve);
            }
          }
          var S = !1,
            w = !1,
            M = !1,
            O = !1,
            _ = !1,
            L;
          L = Symbol.for("react.module.reference");
          function I(R) {
            return !!(
              typeof R == "string" ||
              typeof R == "function" ||
              R === o ||
              R === a ||
              _ ||
              R === r ||
              R === u ||
              R === l ||
              O ||
              R === g ||
              S ||
              w ||
              M ||
              (typeof R == "object" &&
                R !== null &&
                (R.$$typeof === f ||
                  R.$$typeof === d ||
                  R.$$typeof === i ||
                  R.$$typeof === s ||
                  R.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  R.$$typeof === L ||
                  R.getModuleId !== void 0))
            );
          }
          function P(R, U, J) {
            var re = R.displayName;
            if (re) return re;
            var pe = U.displayName || U.name || "";
            return pe !== "" ? J + "(" + pe + ")" : J;
          }
          function $(R) {
            return R.displayName || "Context";
          }
          function B(R) {
            if (R == null) return null;
            if (
              (typeof R.tag == "number" &&
                x(
                  "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                ),
              typeof R == "function")
            )
              return R.displayName || R.name || null;
            if (typeof R == "string") return R;
            switch (R) {
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
            if (typeof R == "object")
              switch (R.$$typeof) {
                case s:
                  var U = R;
                  return $(U) + ".Consumer";
                case i:
                  var J = R;
                  return $(J._context) + ".Provider";
                case c:
                  return P(R, R.render, "ForwardRef");
                case d:
                  var re = R.displayName || null;
                  return re !== null ? re : B(R.type) || "Memo";
                case f: {
                  var pe = R,
                    ve = pe._payload,
                    ge = pe._init;
                  try {
                    return B(ge(ve));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var v = Object.assign,
            k = 0,
            E,
            N,
            z,
            T,
            A,
            D,
            H;
          function W() {}
          W.__reactDisabledLog = !0;
          function V() {
            {
              if (k === 0) {
                (E = console.log),
                  (N = console.info),
                  (z = console.warn),
                  (T = console.error),
                  (A = console.group),
                  (D = console.groupCollapsed),
                  (H = console.groupEnd);
                var R = {
                  configurable: !0,
                  enumerable: !0,
                  value: W,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: R,
                  log: R,
                  warn: R,
                  error: R,
                  group: R,
                  groupCollapsed: R,
                  groupEnd: R,
                });
              }
              k++;
            }
          }
          function Y() {
            {
              if ((k--, k === 0)) {
                var R = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: v({}, R, {
                    value: E,
                  }),
                  info: v({}, R, {
                    value: N,
                  }),
                  warn: v({}, R, {
                    value: z,
                  }),
                  error: v({}, R, {
                    value: T,
                  }),
                  group: v({}, R, {
                    value: A,
                  }),
                  groupCollapsed: v({}, R, {
                    value: D,
                  }),
                  groupEnd: v({}, R, {
                    value: H,
                  }),
                });
              }
              k < 0 &&
                x(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                );
            }
          }
          var Z = y.ReactCurrentDispatcher,
            X;
          function Q(R, U, J) {
            {
              if (X === void 0)
                try {
                  throw Error();
                } catch (pe) {
                  var re = pe.stack.trim().match(/\n( *(at )?)/);
                  X = (re && re[1]) || "";
                }
              return (
                `
` +
                X +
                R
              );
            }
          }
          var te = !1,
            q;
          {
            var fe = typeof WeakMap == "function" ? WeakMap : Map;
            q = new fe();
          }
          function K(R, U) {
            if (!R || te) return "";
            {
              var J = q.get(R);
              if (J !== void 0) return J;
            }
            var re;
            te = !0;
            var pe = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var ve;
            (ve = Z.current), (Z.current = null), V();
            try {
              if (U) {
                var ge = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(ge.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(ge, []);
                  } catch (lt) {
                    re = lt;
                  }
                  Reflect.construct(R, [], ge);
                } else {
                  try {
                    ge.call();
                  } catch (lt) {
                    re = lt;
                  }
                  R.call(ge.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (lt) {
                  re = lt;
                }
                R();
              }
            } catch (lt) {
              if (lt && re && typeof lt.stack == "string") {
                for (
                  var le = lt.stack.split(`
`),
                    ze = re.stack.split(`
`),
                    Ce = le.length - 1,
                    _e = ze.length - 1;
                  Ce >= 1 && _e >= 0 && le[Ce] !== ze[_e];

                )
                  _e--;
                for (; Ce >= 1 && _e >= 0; Ce--, _e--)
                  if (le[Ce] !== ze[_e]) {
                    if (Ce !== 1 || _e !== 1)
                      do
                        if ((Ce--, _e--, _e < 0 || le[Ce] !== ze[_e])) {
                          var We =
                            `
` + le[Ce].replace(" at new ", " at ");
                          return (
                            R.displayName &&
                              We.includes("<anonymous>") &&
                              (We = We.replace("<anonymous>", R.displayName)),
                            typeof R == "function" && q.set(R, We),
                            We
                          );
                        }
                      while (Ce >= 1 && _e >= 0);
                    break;
                  }
              }
            } finally {
              (te = !1), (Z.current = ve), Y(), (Error.prepareStackTrace = pe);
            }
            var Wt = R ? R.displayName || R.name : "",
              Io = Wt ? Q(Wt) : "";
            return typeof R == "function" && q.set(R, Io), Io;
          }
          function ye(R, U, J) {
            return K(R, !1);
          }
          function Pe(R) {
            var U = R.prototype;
            return !!(U && U.isReactComponent);
          }
          function Se(R, U, J) {
            if (R == null) return "";
            if (typeof R == "function") return K(R, Pe(R));
            if (typeof R == "string") return Q(R);
            switch (R) {
              case u:
                return Q("Suspense");
              case l:
                return Q("SuspenseList");
            }
            if (typeof R == "object")
              switch (R.$$typeof) {
                case c:
                  return ye(R.render);
                case d:
                  return Se(R.type, U, J);
                case f: {
                  var re = R,
                    pe = re._payload,
                    ve = re._init;
                  try {
                    return Se(ve(pe), U, J);
                  } catch {}
                }
              }
            return "";
          }
          var je = Object.prototype.hasOwnProperty,
            we = {},
            oe = y.ReactDebugCurrentFrame;
          function Re(R) {
            if (R) {
              var U = R._owner,
                J = Se(R.type, R._source, U ? U.type : null);
              oe.setExtraStackFrame(J);
            } else oe.setExtraStackFrame(null);
          }
          function At(R, U, J, re, pe) {
            {
              var ve = Function.call.bind(je);
              for (var ge in R)
                if (ve(R, ge)) {
                  var le = void 0;
                  try {
                    if (typeof R[ge] != "function") {
                      var ze = Error(
                        (re || "React class") +
                          ": " +
                          J +
                          " type `" +
                          ge +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof R[ge] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      );
                      throw ((ze.name = "Invariant Violation"), ze);
                    }
                    le = R[ge](
                      U,
                      ge,
                      re,
                      J,
                      null,
                      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                    );
                  } catch (Ce) {
                    le = Ce;
                  }
                  le &&
                    !(le instanceof Error) &&
                    (Re(pe),
                    x(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      re || "React class",
                      J,
                      ge,
                      typeof le,
                    ),
                    Re(null)),
                    le instanceof Error &&
                      !(le.message in we) &&
                      ((we[le.message] = !0),
                      Re(pe),
                      x("Failed %s type: %s", J, le.message),
                      Re(null));
                }
            }
          }
          var Jt = Array.isArray;
          function mt(R) {
            return Jt(R);
          }
          function jt(R) {
            {
              var U = typeof Symbol == "function" && Symbol.toStringTag,
                J =
                  (U && R[Symbol.toStringTag]) ||
                  R.constructor.name ||
                  "Object";
              return J;
            }
          }
          function at(R) {
            try {
              return Mt(R), !1;
            } catch {
              return !0;
            }
          }
          function Mt(R) {
            return "" + R;
          }
          function bt(R) {
            if (at(R))
              return (
                x(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  jt(R),
                ),
                Mt(R)
              );
          }
          var Ze = y.ReactCurrentOwner,
            Ft = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Tt,
            Bt,
            De;
          De = {};
          function Ke(R) {
            if (je.call(R, "ref")) {
              var U = Object.getOwnPropertyDescriptor(R, "ref").get;
              if (U && U.isReactWarning) return !1;
            }
            return R.ref !== void 0;
          }
          function Ot(R) {
            if (je.call(R, "key")) {
              var U = Object.getOwnPropertyDescriptor(R, "key").get;
              if (U && U.isReactWarning) return !1;
            }
            return R.key !== void 0;
          }
          function Nt(R, U) {
            if (
              typeof R.ref == "string" &&
              Ze.current &&
              U &&
              Ze.current.stateNode !== U
            ) {
              var J = B(Ze.current.type);
              De[J] ||
                (x(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  B(Ze.current.type),
                  R.ref,
                ),
                (De[J] = !0));
            }
          }
          function Dt(R, U) {
            {
              var J = function () {
                Tt ||
                  ((Tt = !0),
                  x(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    U,
                  ));
              };
              (J.isReactWarning = !0),
                Object.defineProperty(R, "key", {
                  get: J,
                  configurable: !0,
                });
            }
          }
          function it(R, U) {
            {
              var J = function () {
                Bt ||
                  ((Bt = !0),
                  x(
                    "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    U,
                  ));
              };
              (J.isReactWarning = !0),
                Object.defineProperty(R, "ref", {
                  get: J,
                  configurable: !0,
                });
            }
          }
          var Je = function (R, U, J, re, pe, ve, ge) {
            var le = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: R,
              key: U,
              ref: J,
              props: ge,
              // Record the component responsible for creating this element.
              _owner: ve,
            };
            return (
              (le._store = {}),
              Object.defineProperty(le._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(le, "_self", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: re,
              }),
              Object.defineProperty(le, "_source", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: pe,
              }),
              Object.freeze && (Object.freeze(le.props), Object.freeze(le)),
              le
            );
          };
          function en(R, U, J, re, pe) {
            {
              var ve,
                ge = {},
                le = null,
                ze = null;
              J !== void 0 && (bt(J), (le = "" + J)),
                Ot(U) && (bt(U.key), (le = "" + U.key)),
                Ke(U) && ((ze = U.ref), Nt(U, pe));
              for (ve in U)
                je.call(U, ve) && !Ft.hasOwnProperty(ve) && (ge[ve] = U[ve]);
              if (R && R.defaultProps) {
                var Ce = R.defaultProps;
                for (ve in Ce) ge[ve] === void 0 && (ge[ve] = Ce[ve]);
              }
              if (le || ze) {
                var _e =
                  typeof R == "function"
                    ? R.displayName || R.name || "Unknown"
                    : R;
                le && Dt(ge, _e), ze && it(ge, _e);
              }
              return Je(R, le, ze, pe, re, Ze.current, ge);
            }
          }
          var tn = y.ReactCurrentOwner,
            $t = y.ReactDebugCurrentFrame;
          function yt(R) {
            if (R) {
              var U = R._owner,
                J = Se(R.type, R._source, U ? U.type : null);
              $t.setExtraStackFrame(J);
            } else $t.setExtraStackFrame(null);
          }
          var bn;
          bn = !1;
          function st(R) {
            return typeof R == "object" && R !== null && R.$$typeof === t;
          }
          function To() {
            {
              if (tn.current) {
                var R = B(tn.current.type);
                if (R)
                  return (
                    `

Check the render method of \`` +
                    R +
                    "`."
                  );
              }
              return "";
            }
          }
          function Zr(R) {
            {
              if (R !== void 0) {
                var U = R.fileName.replace(/^.*[\\\/]/, ""),
                  J = R.lineNumber;
                return (
                  `

Check your code at ` +
                  U +
                  ":" +
                  J +
                  "."
                );
              }
              return "";
            }
          }
          var Oo = {};
          function Kr(R) {
            {
              var U = To();
              if (!U) {
                var J = typeof R == "string" ? R : R.displayName || R.name;
                J &&
                  (U =
                    `

Check the top-level render call using <` +
                    J +
                    ">.");
              }
              return U;
            }
          }
          function No(R, U) {
            {
              if (!R._store || R._store.validated || R.key != null) return;
              R._store.validated = !0;
              var J = Kr(U);
              if (Oo[J]) return;
              Oo[J] = !0;
              var re = "";
              R &&
                R._owner &&
                R._owner !== tn.current &&
                (re = " It was passed a child from " + B(R._owner.type) + "."),
                yt(R),
                x(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  J,
                  re,
                ),
                yt(null);
            }
          }
          function Do(R, U) {
            {
              if (typeof R != "object") return;
              if (mt(R))
                for (var J = 0; J < R.length; J++) {
                  var re = R[J];
                  st(re) && No(re, U);
                }
              else if (st(R)) R._store && (R._store.validated = !0);
              else if (R) {
                var pe = m(R);
                if (typeof pe == "function" && pe !== R.entries)
                  for (var ve = pe.call(R), ge; !(ge = ve.next()).done; )
                    st(ge.value) && No(ge.value, U);
              }
            }
          }
          function Xr(R) {
            {
              var U = R.type;
              if (U == null || typeof U == "string") return;
              var J;
              if (typeof U == "function") J = U.propTypes;
              else if (
                typeof U == "object" &&
                (U.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  U.$$typeof === d)
              )
                J = U.propTypes;
              else return;
              if (J) {
                var re = B(U);
                At(J, R.props, "prop", re, R);
              } else if (U.PropTypes !== void 0 && !bn) {
                bn = !0;
                var pe = B(U);
                x(
                  "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                  pe || "Unknown",
                );
              }
              typeof U.getDefaultProps == "function" &&
                !U.getDefaultProps.isReactClassApproved &&
                x(
                  "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                );
            }
          }
          function Gr(R) {
            {
              for (var U = Object.keys(R.props), J = 0; J < U.length; J++) {
                var re = U[J];
                if (re !== "children" && re !== "key") {
                  yt(R),
                    x(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      re,
                    ),
                    yt(null);
                  break;
                }
              }
              R.ref !== null &&
                (yt(R),
                x("Invalid attribute `ref` supplied to `React.Fragment`."),
                yt(null));
            }
          }
          function Ro(R, U, J, re, pe, ve) {
            {
              var ge = I(R);
              if (!ge) {
                var le = "";
                (R === void 0 ||
                  (typeof R == "object" &&
                    R !== null &&
                    Object.keys(R).length === 0)) &&
                  (le +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var ze = Zr(pe);
                ze ? (le += ze) : (le += To());
                var Ce;
                R === null
                  ? (Ce = "null")
                  : mt(R)
                    ? (Ce = "array")
                    : R !== void 0 && R.$$typeof === t
                      ? ((Ce = "<" + (B(R.type) || "Unknown") + " />"),
                        (le =
                          " Did you accidentally export a JSX literal instead of a component?"))
                      : (Ce = typeof R),
                  x(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    Ce,
                    le,
                  );
              }
              var _e = en(R, U, J, pe, ve);
              if (_e == null) return _e;
              if (ge) {
                var We = U.children;
                if (We !== void 0)
                  if (re)
                    if (mt(We)) {
                      for (var Wt = 0; Wt < We.length; Wt++) Do(We[Wt], R);
                      Object.freeze && Object.freeze(We);
                    } else
                      x(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else Do(We, R);
              }
              return R === o ? Gr(_e) : Xr(_e), _e;
            }
          }
          function Qr(R, U, J) {
            return Ro(R, U, J, !0);
          }
          function Jr(R, U, J) {
            return Ro(R, U, J, !1);
          }
          var ea = Jr,
            zo = Qr;
          (Un.Fragment = o), (Un.jsx = ea), (Un.jsxs = zo);
        })()),
    Un
  );
}
process.env.NODE_ENV === "production"
  ? (xi.exports = F1())
  : (xi.exports = B1());
var b = xi.exports,
  nr = {},
  Du = { exports: {} };
(function (e) {
  function t(n) {
    return n && n.__esModule
      ? n
      : {
          default: n,
        };
  }
  (e.exports = t), (e.exports.__esModule = !0), (e.exports.default = e.exports);
})(Du);
var $1 = Du.exports,
  oa = {},
  el;
function W1() {
  return (
    el ||
      ((el = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "black",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            overflow: "auto",
          },
          'pre[class*="language-"]': {
            color: "black",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            marginBottom: "1em",
          },
          'pre[class*="language-"] > code': {
            position: "relative",
            zIndex: "1",
            borderLeft: "10px solid #358ccb",
            boxShadow: "-1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf",
            backgroundColor: "#fdfdfd",
            backgroundImage:
              "linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)",
            backgroundSize: "3em 3em",
            backgroundOrigin: "content-box",
            backgroundAttachment: "local",
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
            whiteSpace: "normal",
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
            transform: "rotate(-2deg)",
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
            right: "0.75em",
          },
          comment: {
            color: "#7D8B99",
          },
          "block-comment": {
            color: "#7D8B99",
          },
          prolog: {
            color: "#7D8B99",
          },
          doctype: {
            color: "#7D8B99",
          },
          cdata: {
            color: "#7D8B99",
          },
          punctuation: {
            color: "#5F6364",
          },
          property: {
            color: "#c92c2c",
          },
          tag: {
            color: "#c92c2c",
          },
          boolean: {
            color: "#c92c2c",
          },
          number: {
            color: "#c92c2c",
          },
          "function-name": {
            color: "#c92c2c",
          },
          constant: {
            color: "#c92c2c",
          },
          symbol: {
            color: "#c92c2c",
          },
          deleted: {
            color: "#c92c2c",
          },
          selector: {
            color: "#2f9c0a",
          },
          "attr-name": {
            color: "#2f9c0a",
          },
          string: {
            color: "#2f9c0a",
          },
          char: {
            color: "#2f9c0a",
          },
          function: {
            color: "#2f9c0a",
          },
          builtin: {
            color: "#2f9c0a",
          },
          inserted: {
            color: "#2f9c0a",
          },
          operator: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          entity: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
            cursor: "help",
          },
          url: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          variable: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          atrule: {
            color: "#1990b8",
          },
          "attr-value": {
            color: "#1990b8",
          },
          keyword: {
            color: "#1990b8",
          },
          "class-name": {
            color: "#1990b8",
          },
          regex: {
            color: "#e90",
          },
          important: {
            color: "#e90",
            fontWeight: "normal",
          },
          ".language-css .token.string": {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          ".style .token.string": {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          namespace: {
            Opacity: ".7",
          },
          'pre[class*="language-"].line-numbers.line-numbers': {
            paddingLeft: "0",
          },
          'pre[class*="language-"].line-numbers.line-numbers code': {
            paddingLeft: "3.8em",
          },
          'pre[class*="language-"].line-numbers.line-numbers .line-numbers-rows':
            {
              left: "0",
            },
          'pre[class*="language-"][data-line]': {
            paddingTop: "0",
            paddingBottom: "0",
            paddingLeft: "0",
          },
          "pre[data-line] code": {
            position: "relative",
            paddingLeft: "4em",
          },
          "pre .line-highlight": {
            marginTop: "0",
          },
        };
        e.default = t;
      })(oa)),
    oa
  );
}
var ra = {},
  tl;
function V1() {
  return (
    tl ||
      ((tl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "white",
            background: "none",
            textShadow: "0 -.1em .2em black",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "white",
            background: "hsl(30, 20%, 25%)",
            textShadow: "0 -.1em .2em black",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            boxShadow: "1px 1px .5em black inset",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "hsl(30, 20%, 25%)",
            padding: ".15em .2em .05em",
            borderRadius: ".3em",
            border: ".13em solid hsl(30, 20%, 40%)",
            boxShadow: "1px 1px .3em -.1em black inset",
            whiteSpace: "normal",
          },
          comment: {
            color: "hsl(30, 20%, 50%)",
          },
          prolog: {
            color: "hsl(30, 20%, 50%)",
          },
          doctype: {
            color: "hsl(30, 20%, 50%)",
          },
          cdata: {
            color: "hsl(30, 20%, 50%)",
          },
          punctuation: {
            Opacity: ".7",
          },
          namespace: {
            Opacity: ".7",
          },
          property: {
            color: "hsl(350, 40%, 70%)",
          },
          tag: {
            color: "hsl(350, 40%, 70%)",
          },
          boolean: {
            color: "hsl(350, 40%, 70%)",
          },
          number: {
            color: "hsl(350, 40%, 70%)",
          },
          constant: {
            color: "hsl(350, 40%, 70%)",
          },
          symbol: {
            color: "hsl(350, 40%, 70%)",
          },
          selector: {
            color: "hsl(75, 70%, 60%)",
          },
          "attr-name": {
            color: "hsl(75, 70%, 60%)",
          },
          string: {
            color: "hsl(75, 70%, 60%)",
          },
          char: {
            color: "hsl(75, 70%, 60%)",
          },
          builtin: {
            color: "hsl(75, 70%, 60%)",
          },
          inserted: {
            color: "hsl(75, 70%, 60%)",
          },
          operator: {
            color: "hsl(40, 90%, 60%)",
          },
          entity: {
            color: "hsl(40, 90%, 60%)",
            cursor: "help",
          },
          url: {
            color: "hsl(40, 90%, 60%)",
          },
          ".language-css .token.string": {
            color: "hsl(40, 90%, 60%)",
          },
          ".style .token.string": {
            color: "hsl(40, 90%, 60%)",
          },
          variable: {
            color: "hsl(40, 90%, 60%)",
          },
          atrule: {
            color: "hsl(350, 40%, 70%)",
          },
          "attr-value": {
            color: "hsl(350, 40%, 70%)",
          },
          keyword: {
            color: "hsl(350, 40%, 70%)",
          },
          regex: {
            color: "#e90",
          },
          important: {
            color: "#e90",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          deleted: {
            color: "red",
          },
        };
        e.default = t;
      })(ra)),
    ra
  );
}
var aa = {},
  nl;
function q1() {
  return (
    nl ||
      ((nl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            boxShadow: "-.3em 0 0 .3em black, .3em 0 0 .3em black",
          },
          'pre[class*="language-"]': {
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            backgroundSize: "1em 1em",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".2em",
            borderRadius: ".3em",
            boxShadow: "none",
            whiteSpace: "normal",
          },
          comment: {
            color: "#aaa",
          },
          prolog: {
            color: "#aaa",
          },
          doctype: {
            color: "#aaa",
          },
          cdata: {
            color: "#aaa",
          },
          punctuation: {
            color: "#999",
          },
          namespace: {
            Opacity: ".7",
          },
          property: {
            color: "#0cf",
          },
          tag: {
            color: "#0cf",
          },
          boolean: {
            color: "#0cf",
          },
          number: {
            color: "#0cf",
          },
          constant: {
            color: "#0cf",
          },
          symbol: {
            color: "#0cf",
          },
          selector: {
            color: "yellow",
          },
          "attr-name": {
            color: "yellow",
          },
          string: {
            color: "yellow",
          },
          char: {
            color: "yellow",
          },
          builtin: {
            color: "yellow",
          },
          operator: {
            color: "yellowgreen",
          },
          entity: {
            color: "yellowgreen",
            cursor: "help",
          },
          url: {
            color: "yellowgreen",
          },
          ".language-css .token.string": {
            color: "yellowgreen",
          },
          variable: {
            color: "yellowgreen",
          },
          inserted: {
            color: "yellowgreen",
          },
          atrule: {
            color: "deeppink",
          },
          "attr-value": {
            color: "deeppink",
          },
          keyword: {
            color: "deeppink",
          },
          regex: {
            color: "orange",
          },
          important: {
            color: "orange",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          deleted: {
            color: "red",
          },
          "pre.diff-highlight.diff-highlight > code .token.deleted:not(.prefix)":
            {
              backgroundColor: "rgba(255, 0, 0, .3)",
              display: "inline",
            },
          "pre > code.diff-highlight.diff-highlight .token.deleted:not(.prefix)":
            {
              backgroundColor: "rgba(255, 0, 0, .3)",
              display: "inline",
            },
          "pre.diff-highlight.diff-highlight > code .token.inserted:not(.prefix)":
            {
              backgroundColor: "rgba(0, 255, 128, .3)",
              display: "inline",
            },
          "pre > code.diff-highlight.diff-highlight .token.inserted:not(.prefix)":
            {
              backgroundColor: "rgba(0, 255, 128, .3)",
              display: "inline",
            },
        };
        e.default = t;
      })(aa)),
    aa
  );
}
var ia = {},
  ol;
function U1() {
  return (
    ol ||
      ((ol = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#f8f8f2",
            background: "none",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#f8f8f2",
            background: "#272822",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#272822",
            padding: ".1em",
            borderRadius: ".3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#8292a2",
          },
          prolog: {
            color: "#8292a2",
          },
          doctype: {
            color: "#8292a2",
          },
          cdata: {
            color: "#8292a2",
          },
          punctuation: {
            color: "#f8f8f2",
          },
          namespace: {
            Opacity: ".7",
          },
          property: {
            color: "#f92672",
          },
          tag: {
            color: "#f92672",
          },
          constant: {
            color: "#f92672",
          },
          symbol: {
            color: "#f92672",
          },
          deleted: {
            color: "#f92672",
          },
          boolean: {
            color: "#ae81ff",
          },
          number: {
            color: "#ae81ff",
          },
          selector: {
            color: "#a6e22e",
          },
          "attr-name": {
            color: "#a6e22e",
          },
          string: {
            color: "#a6e22e",
          },
          char: {
            color: "#a6e22e",
          },
          builtin: {
            color: "#a6e22e",
          },
          inserted: {
            color: "#a6e22e",
          },
          operator: {
            color: "#f8f8f2",
          },
          entity: {
            color: "#f8f8f2",
            cursor: "help",
          },
          url: {
            color: "#f8f8f2",
          },
          ".language-css .token.string": {
            color: "#f8f8f2",
          },
          ".style .token.string": {
            color: "#f8f8f2",
          },
          variable: {
            color: "#f8f8f2",
          },
          atrule: {
            color: "#e6db74",
          },
          "attr-value": {
            color: "#e6db74",
          },
          function: {
            color: "#e6db74",
          },
          "class-name": {
            color: "#e6db74",
          },
          keyword: {
            color: "#66d9ef",
          },
          regex: {
            color: "#fd971f",
          },
          important: {
            color: "#fd971f",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(ia)),
    ia
  );
}
var sa = {},
  rl;
function Y1() {
  return (
    rl ||
      ((rl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#657b83",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#657b83",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            backgroundColor: "#fdf6e3",
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#073642",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#073642",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#073642",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#073642",
          },
          'pre[class*="language-"]::selection': {
            background: "#073642",
          },
          'pre[class*="language-"] ::selection': {
            background: "#073642",
          },
          'code[class*="language-"]::selection': {
            background: "#073642",
          },
          'code[class*="language-"] ::selection': {
            background: "#073642",
          },
          ':not(pre) > code[class*="language-"]': {
            backgroundColor: "#fdf6e3",
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#93a1a1",
          },
          prolog: {
            color: "#93a1a1",
          },
          doctype: {
            color: "#93a1a1",
          },
          cdata: {
            color: "#93a1a1",
          },
          punctuation: {
            color: "#586e75",
          },
          namespace: {
            Opacity: ".7",
          },
          property: {
            color: "#268bd2",
          },
          tag: {
            color: "#268bd2",
          },
          boolean: {
            color: "#268bd2",
          },
          number: {
            color: "#268bd2",
          },
          constant: {
            color: "#268bd2",
          },
          symbol: {
            color: "#268bd2",
          },
          deleted: {
            color: "#268bd2",
          },
          selector: {
            color: "#2aa198",
          },
          "attr-name": {
            color: "#2aa198",
          },
          string: {
            color: "#2aa198",
          },
          char: {
            color: "#2aa198",
          },
          builtin: {
            color: "#2aa198",
          },
          url: {
            color: "#2aa198",
          },
          inserted: {
            color: "#2aa198",
          },
          entity: {
            color: "#657b83",
            background: "#eee8d5",
            cursor: "help",
          },
          atrule: {
            color: "#859900",
          },
          "attr-value": {
            color: "#859900",
          },
          keyword: {
            color: "#859900",
          },
          function: {
            color: "#b58900",
          },
          "class-name": {
            color: "#b58900",
          },
          regex: {
            color: "#cb4b16",
          },
          important: {
            color: "#cb4b16",
            fontWeight: "bold",
          },
          variable: {
            color: "#cb4b16",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(sa)),
    sa
  );
}
var la = {},
  al;
function Z1() {
  return (
    al ||
      ((al = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#ccc",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#ccc",
            background: "#2d2d2d",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#2d2d2d",
            padding: ".1em",
            borderRadius: ".3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#999",
          },
          "block-comment": {
            color: "#999",
          },
          prolog: {
            color: "#999",
          },
          doctype: {
            color: "#999",
          },
          cdata: {
            color: "#999",
          },
          punctuation: {
            color: "#ccc",
          },
          tag: {
            color: "#e2777a",
          },
          "attr-name": {
            color: "#e2777a",
          },
          namespace: {
            color: "#e2777a",
          },
          deleted: {
            color: "#e2777a",
          },
          "function-name": {
            color: "#6196cc",
          },
          boolean: {
            color: "#f08d49",
          },
          number: {
            color: "#f08d49",
          },
          function: {
            color: "#f08d49",
          },
          property: {
            color: "#f8c555",
          },
          "class-name": {
            color: "#f8c555",
          },
          constant: {
            color: "#f8c555",
          },
          symbol: {
            color: "#f8c555",
          },
          selector: {
            color: "#cc99cd",
          },
          important: {
            color: "#cc99cd",
            fontWeight: "bold",
          },
          atrule: {
            color: "#cc99cd",
          },
          keyword: {
            color: "#cc99cd",
          },
          builtin: {
            color: "#cc99cd",
          },
          string: {
            color: "#7ec699",
          },
          char: {
            color: "#7ec699",
          },
          "attr-value": {
            color: "#7ec699",
          },
          regex: {
            color: "#7ec699",
          },
          variable: {
            color: "#7ec699",
          },
          operator: {
            color: "#67cdcc",
          },
          entity: {
            color: "#67cdcc",
            cursor: "help",
          },
          url: {
            color: "#67cdcc",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          inserted: {
            color: "green",
          },
        };
        e.default = t;
      })(la)),
    la
  );
}
var ca = {},
  il;
function K1() {
  return (
    il ||
      ((il = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "white",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "white",
            background: "hsl(0, 0%, 8%)",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            padding: "1em",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "hsl(0, 0%, 8%)",
            borderRadius: ".3em",
            border: ".13em solid hsl(0, 0%, 33%)",
            boxShadow: "1px 1px .3em -.1em black inset",
            padding: ".15em .2em .05em",
            whiteSpace: "normal",
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "hsla(0, 0%, 93%, 0.15)",
            textShadow: "none",
          },
          'pre[class*="language-"]::selection': {
            background: "hsla(0, 0%, 93%, 0.15)",
            textShadow: "none",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "hsla(0, 0%, 93%, 0.15)",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "hsla(0, 0%, 93%, 0.15)",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "hsla(0, 0%, 93%, 0.15)",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "hsla(0, 0%, 93%, 0.15)",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "hsla(0, 0%, 93%, 0.15)",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "hsla(0, 0%, 93%, 0.15)",
          },
          comment: {
            color: "hsl(0, 0%, 47%)",
          },
          prolog: {
            color: "hsl(0, 0%, 47%)",
          },
          doctype: {
            color: "hsl(0, 0%, 47%)",
          },
          cdata: {
            color: "hsl(0, 0%, 47%)",
          },
          punctuation: {
            Opacity: ".7",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "hsl(14, 58%, 55%)",
          },
          boolean: {
            color: "hsl(14, 58%, 55%)",
          },
          number: {
            color: "hsl(14, 58%, 55%)",
          },
          deleted: {
            color: "hsl(14, 58%, 55%)",
          },
          keyword: {
            color: "hsl(53, 89%, 79%)",
          },
          property: {
            color: "hsl(53, 89%, 79%)",
          },
          selector: {
            color: "hsl(53, 89%, 79%)",
          },
          constant: {
            color: "hsl(53, 89%, 79%)",
          },
          symbol: {
            color: "hsl(53, 89%, 79%)",
          },
          builtin: {
            color: "hsl(53, 89%, 79%)",
          },
          "attr-name": {
            color: "hsl(76, 21%, 52%)",
          },
          "attr-value": {
            color: "hsl(76, 21%, 52%)",
          },
          string: {
            color: "hsl(76, 21%, 52%)",
          },
          char: {
            color: "hsl(76, 21%, 52%)",
          },
          operator: {
            color: "hsl(76, 21%, 52%)",
          },
          entity: {
            color: "hsl(76, 21%, 52%)",
            cursor: "help",
          },
          url: {
            color: "hsl(76, 21%, 52%)",
          },
          ".language-css .token.string": {
            color: "hsl(76, 21%, 52%)",
          },
          ".style .token.string": {
            color: "hsl(76, 21%, 52%)",
          },
          variable: {
            color: "hsl(76, 21%, 52%)",
          },
          inserted: {
            color: "hsl(76, 21%, 52%)",
          },
          atrule: {
            color: "hsl(218, 22%, 55%)",
          },
          regex: {
            color: "hsl(42, 75%, 65%)",
          },
          important: {
            color: "hsl(42, 75%, 65%)",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          ".language-markup .token.tag": {
            color: "hsl(33, 33%, 52%)",
          },
          ".language-markup .token.attr-name": {
            color: "hsl(33, 33%, 52%)",
          },
          ".language-markup .token.punctuation": {
            color: "hsl(33, 33%, 52%)",
          },
          "": {
            position: "relative",
            zIndex: "1",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, hsla(0, 0%, 33%, .1) 70%, hsla(0, 0%, 33%, 0))",
            borderBottom: "1px dashed hsl(0, 0%, 33%)",
            borderTop: "1px dashed hsl(0, 0%, 33%)",
            marginTop: "0.75em",
            zIndex: "0",
          },
          ".line-highlight.line-highlight:before": {
            backgroundColor: "hsl(215, 15%, 59%)",
            color: "hsl(24, 20%, 95%)",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            backgroundColor: "hsl(215, 15%, 59%)",
            color: "hsl(24, 20%, 95%)",
          },
        };
        e.default = t;
      })(ca)),
    ca
  );
}
var ua = {},
  sl;
function X1() {
  return (
    sl ||
      ((sl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "black",
            background: "none",
            textShadow: "0 1px white",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "black",
            background: "#f5f2f0",
            textShadow: "0 1px white",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#b3d4fc",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#f5f2f0",
            padding: ".1em",
            borderRadius: ".3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "slategray",
          },
          prolog: {
            color: "slategray",
          },
          doctype: {
            color: "slategray",
          },
          cdata: {
            color: "slategray",
          },
          punctuation: {
            color: "#999",
          },
          namespace: {
            Opacity: ".7",
          },
          property: {
            color: "#905",
          },
          tag: {
            color: "#905",
          },
          boolean: {
            color: "#905",
          },
          number: {
            color: "#905",
          },
          constant: {
            color: "#905",
          },
          symbol: {
            color: "#905",
          },
          deleted: {
            color: "#905",
          },
          selector: {
            color: "#690",
          },
          "attr-name": {
            color: "#690",
          },
          string: {
            color: "#690",
          },
          char: {
            color: "#690",
          },
          builtin: {
            color: "#690",
          },
          inserted: {
            color: "#690",
          },
          operator: {
            color: "#9a6e3a",
            background: "hsla(0, 0%, 100%, .5)",
          },
          entity: {
            color: "#9a6e3a",
            background: "hsla(0, 0%, 100%, .5)",
            cursor: "help",
          },
          url: {
            color: "#9a6e3a",
            background: "hsla(0, 0%, 100%, .5)",
          },
          ".language-css .token.string": {
            color: "#9a6e3a",
            background: "hsla(0, 0%, 100%, .5)",
          },
          ".style .token.string": {
            color: "#9a6e3a",
            background: "hsla(0, 0%, 100%, .5)",
          },
          atrule: {
            color: "#07a",
          },
          "attr-value": {
            color: "#07a",
          },
          keyword: {
            color: "#07a",
          },
          function: {
            color: "#DD4A68",
          },
          "class-name": {
            color: "#DD4A68",
          },
          regex: {
            color: "#e90",
          },
          important: {
            color: "#e90",
            fontWeight: "bold",
          },
          variable: {
            color: "#e90",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(ua)),
    ua
  );
}
var da = {},
  ll;
function G1() {
  return (
    ll ||
      ((ll = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#f8f8f2",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#f8f8f2",
            background: "#2b2b2b",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            borderRadius: "0.3em",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#2b2b2b",
            padding: "0.1em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#d4d0ab",
          },
          prolog: {
            color: "#d4d0ab",
          },
          doctype: {
            color: "#d4d0ab",
          },
          cdata: {
            color: "#d4d0ab",
          },
          punctuation: {
            color: "#fefefe",
          },
          property: {
            color: "#ffa07a",
          },
          tag: {
            color: "#ffa07a",
          },
          constant: {
            color: "#ffa07a",
          },
          symbol: {
            color: "#ffa07a",
          },
          deleted: {
            color: "#ffa07a",
          },
          boolean: {
            color: "#00e0e0",
          },
          number: {
            color: "#00e0e0",
          },
          selector: {
            color: "#abe338",
          },
          "attr-name": {
            color: "#abe338",
          },
          string: {
            color: "#abe338",
          },
          char: {
            color: "#abe338",
          },
          builtin: {
            color: "#abe338",
          },
          inserted: {
            color: "#abe338",
          },
          operator: {
            color: "#00e0e0",
          },
          entity: {
            color: "#00e0e0",
            cursor: "help",
          },
          url: {
            color: "#00e0e0",
          },
          ".language-css .token.string": {
            color: "#00e0e0",
          },
          ".style .token.string": {
            color: "#00e0e0",
          },
          variable: {
            color: "#00e0e0",
          },
          atrule: {
            color: "#ffd700",
          },
          "attr-value": {
            color: "#ffd700",
          },
          function: {
            color: "#ffd700",
          },
          keyword: {
            color: "#00e0e0",
          },
          regex: {
            color: "#ffd700",
          },
          important: {
            color: "#ffd700",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(da)),
    da
  );
}
var fa = {},
  cl;
function Q1() {
  return (
    cl ||
      ((cl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#c5c8c6",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#c5c8c6",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
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
            background: "#1d1f21",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#1d1f21",
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#7C7C7C",
          },
          prolog: {
            color: "#7C7C7C",
          },
          doctype: {
            color: "#7C7C7C",
          },
          cdata: {
            color: "#7C7C7C",
          },
          punctuation: {
            color: "#c5c8c6",
          },
          ".namespace": {
            Opacity: ".7",
          },
          property: {
            color: "#96CBFE",
          },
          keyword: {
            color: "#96CBFE",
          },
          tag: {
            color: "#96CBFE",
          },
          "class-name": {
            color: "#FFFFB6",
            textDecoration: "underline",
          },
          boolean: {
            color: "#99CC99",
          },
          constant: {
            color: "#99CC99",
          },
          symbol: {
            color: "#f92672",
          },
          deleted: {
            color: "#f92672",
          },
          number: {
            color: "#FF73FD",
          },
          selector: {
            color: "#A8FF60",
          },
          "attr-name": {
            color: "#A8FF60",
          },
          string: {
            color: "#A8FF60",
          },
          char: {
            color: "#A8FF60",
          },
          builtin: {
            color: "#A8FF60",
          },
          inserted: {
            color: "#A8FF60",
          },
          variable: {
            color: "#C6C5FE",
          },
          operator: {
            color: "#EDEDED",
          },
          entity: {
            color: "#FFFFB6",
            cursor: "help",
          },
          url: {
            color: "#96CBFE",
          },
          ".language-css .token.string": {
            color: "#87C38A",
          },
          ".style .token.string": {
            color: "#87C38A",
          },
          atrule: {
            color: "#F9EE98",
          },
          "attr-value": {
            color: "#F9EE98",
          },
          function: {
            color: "#DAD085",
          },
          regex: {
            color: "#E9C062",
          },
          important: {
            color: "#fd971f",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(fa)),
    fa
  );
}
var ga = {},
  ul;
function J1() {
  return (
    ul ||
      ((ul = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#dfe2f1",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#898ea4",
          },
          prolog: {
            color: "#898ea4",
          },
          doctype: {
            color: "#898ea4",
          },
          cdata: {
            color: "#898ea4",
          },
          punctuation: {
            color: "#5e6687",
          },
          namespace: {
            Opacity: ".7",
          },
          operator: {
            color: "#c76b29",
          },
          boolean: {
            color: "#c76b29",
          },
          number: {
            color: "#c76b29",
          },
          property: {
            color: "#c08b30",
          },
          tag: {
            color: "#3d8fd1",
          },
          string: {
            color: "#22a2c9",
          },
          selector: {
            color: "#6679cc",
          },
          "attr-name": {
            color: "#c76b29",
          },
          entity: {
            color: "#22a2c9",
            cursor: "help",
          },
          url: {
            color: "#22a2c9",
          },
          ".language-css .token.string": {
            color: "#22a2c9",
          },
          ".style .token.string": {
            color: "#22a2c9",
          },
          "attr-value": {
            color: "#ac9739",
          },
          keyword: {
            color: "#ac9739",
          },
          control: {
            color: "#ac9739",
          },
          directive: {
            color: "#ac9739",
          },
          unit: {
            color: "#ac9739",
          },
          statement: {
            color: "#22a2c9",
          },
          regex: {
            color: "#22a2c9",
          },
          atrule: {
            color: "#22a2c9",
          },
          placeholder: {
            color: "#3d8fd1",
          },
          variable: {
            color: "#3d8fd1",
          },
          deleted: {
            textDecoration: "line-through",
          },
          inserted: {
            borderBottom: "1px dotted #202746",
            textDecoration: "none",
          },
          italic: {
            fontStyle: "italic",
          },
          important: {
            fontWeight: "bold",
            color: "#c94922",
          },
          bold: {
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: "0.4em solid #c94922",
            OutlineOffset: ".4em",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#dfe2f1",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#979db4",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(107, 115, 148, 0.2) 70%, rgba(107, 115, 148, 0))",
          },
        };
        e.default = t;
      })(ga)),
    ga
  );
}
var pa = {},
  dl;
function e0() {
  return (
    dl ||
      ((dl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            borderRadius: "8px",
          },
          'pre[class*="language-"] code': {
            float: "left",
            padding: "0 15px 0 0",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#222",
            padding: "5px 10px",
            lineHeight: "1",
            MozBorderRadius: "3px",
            WebkitBorderRadius: "3px",
            borderRadius: "3px",
          },
          comment: {
            color: "#797979",
          },
          prolog: {
            color: "#797979",
          },
          doctype: {
            color: "#797979",
          },
          cdata: {
            color: "#797979",
          },
          selector: {
            color: "#fff",
          },
          operator: {
            color: "#fff",
          },
          punctuation: {
            color: "#fff",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "#ffd893",
          },
          boolean: {
            color: "#ffd893",
          },
          atrule: {
            color: "#B0C975",
          },
          "attr-value": {
            color: "#B0C975",
          },
          hex: {
            color: "#B0C975",
          },
          string: {
            color: "#B0C975",
          },
          property: {
            color: "#c27628",
          },
          entity: {
            color: "#c27628",
            cursor: "help",
          },
          url: {
            color: "#c27628",
          },
          "attr-name": {
            color: "#c27628",
          },
          keyword: {
            color: "#c27628",
          },
          regex: {
            color: "#9B71C6",
          },
          function: {
            color: "#e5a638",
          },
          constant: {
            color: "#e5a638",
          },
          variable: {
            color: "#fdfba8",
          },
          number: {
            color: "#8799B0",
          },
          important: {
            color: "#E45734",
          },
          deliminator: {
            color: "#E45734",
          },
          ".line-highlight.line-highlight": {
            background: "rgba(255, 255, 255, .2)",
          },
          ".line-highlight.line-highlight:before": {
            top: ".3em",
            backgroundColor: "rgba(255, 255, 255, .3)",
            color: "#fff",
            MozBorderRadius: "8px",
            WebkitBorderRadius: "8px",
            borderRadius: "8px",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            top: ".3em",
            backgroundColor: "rgba(255, 255, 255, .3)",
            color: "#fff",
            MozBorderRadius: "8px",
            WebkitBorderRadius: "8px",
            borderRadius: "8px",
          },
          ".line-numbers .line-numbers-rows > span": {
            borderRight: "3px #d9d336 solid",
          },
        };
        e.default = t;
      })(pa)),
    pa
  );
}
var ha = {},
  fl;
function t0() {
  return (
    fl ||
      ((fl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#111b27",
            background: "none",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
          },
          'pre[class*="language-"]': {
            color: "#111b27",
            background: "#e3eaf2",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#8da1b9",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#8da1b9",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#8da1b9",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#8da1b9",
          },
          'pre[class*="language-"]::selection': {
            background: "#8da1b9",
          },
          'pre[class*="language-"] ::selection': {
            background: "#8da1b9",
          },
          'code[class*="language-"]::selection': {
            background: "#8da1b9",
          },
          'code[class*="language-"] ::selection': {
            background: "#8da1b9",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#e3eaf2",
            padding: "0.1em 0.3em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#3c526d",
          },
          prolog: {
            color: "#3c526d",
          },
          doctype: {
            color: "#3c526d",
          },
          cdata: {
            color: "#3c526d",
          },
          punctuation: {
            color: "#111b27",
          },
          "delimiter.important": {
            color: "#006d6d",
            fontWeight: "inherit",
          },
          "selector.parent": {
            color: "#006d6d",
          },
          tag: {
            color: "#006d6d",
          },
          "tag.punctuation": {
            color: "#006d6d",
          },
          "attr-name": {
            color: "#755f00",
          },
          boolean: {
            color: "#755f00",
          },
          "boolean.important": {
            color: "#755f00",
          },
          number: {
            color: "#755f00",
          },
          constant: {
            color: "#755f00",
          },
          "selector.attribute": {
            color: "#755f00",
          },
          "class-name": {
            color: "#005a8e",
          },
          key: {
            color: "#005a8e",
          },
          parameter: {
            color: "#005a8e",
          },
          property: {
            color: "#005a8e",
          },
          "property-access": {
            color: "#005a8e",
          },
          variable: {
            color: "#005a8e",
          },
          "attr-value": {
            color: "#116b00",
          },
          inserted: {
            color: "#116b00",
          },
          color: {
            color: "#116b00",
          },
          "selector.value": {
            color: "#116b00",
          },
          string: {
            color: "#116b00",
          },
          "string.url-link": {
            color: "#116b00",
          },
          builtin: {
            color: "#af00af",
          },
          "keyword-array": {
            color: "#af00af",
          },
          package: {
            color: "#af00af",
          },
          regex: {
            color: "#af00af",
          },
          function: {
            color: "#7c00aa",
          },
          "selector.class": {
            color: "#7c00aa",
          },
          "selector.id": {
            color: "#7c00aa",
          },
          "atrule.rule": {
            color: "#a04900",
          },
          combinator: {
            color: "#a04900",
          },
          keyword: {
            color: "#a04900",
          },
          operator: {
            color: "#a04900",
          },
          "pseudo-class": {
            color: "#a04900",
          },
          "pseudo-element": {
            color: "#a04900",
          },
          selector: {
            color: "#a04900",
          },
          unit: {
            color: "#a04900",
          },
          deleted: {
            color: "#c22f2e",
          },
          important: {
            color: "#c22f2e",
            fontWeight: "bold",
          },
          "keyword-this": {
            color: "#005a8e",
            fontWeight: "bold",
          },
          this: {
            color: "#005a8e",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          entity: {
            cursor: "help",
          },
          ".language-markdown .token.title": {
            color: "#005a8e",
            fontWeight: "bold",
          },
          ".language-markdown .token.title .token.punctuation": {
            color: "#005a8e",
            fontWeight: "bold",
          },
          ".language-markdown .token.blockquote.punctuation": {
            color: "#af00af",
          },
          ".language-markdown .token.code": {
            color: "#006d6d",
          },
          ".language-markdown .token.hr.punctuation": {
            color: "#005a8e",
          },
          ".language-markdown .token.url > .token.content": {
            color: "#116b00",
          },
          ".language-markdown .token.url-link": {
            color: "#755f00",
          },
          ".language-markdown .token.list.punctuation": {
            color: "#af00af",
          },
          ".language-markdown .token.table-header": {
            color: "#111b27",
          },
          ".language-json .token.operator": {
            color: "#111b27",
          },
          ".language-scss .token.variable": {
            color: "#006d6d",
          },
          "token.tab:not(:empty):before": {
            color: "#3c526d",
          },
          "token.cr:before": {
            color: "#3c526d",
          },
          "token.lf:before": {
            color: "#3c526d",
          },
          "token.space:before": {
            color: "#3c526d",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
            color: "#e3eaf2",
            background: "#005a8e",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
            color: "#e3eaf2",
            background: "#005a8e",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
            color: "#e3eaf2",
            background: "#005a8eda",
            textDecoration: "none",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
            color: "#e3eaf2",
            background: "#005a8eda",
            textDecoration: "none",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":
            {
              color: "#e3eaf2",
              background: "#005a8eda",
              textDecoration: "none",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":
            {
              color: "#e3eaf2",
              background: "#005a8eda",
              textDecoration: "none",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
            color: "#e3eaf2",
            background: "#3c526d",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
            color: "#e3eaf2",
            background: "#3c526d",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
            color: "#e3eaf2",
            background: "#3c526d",
          },
          ".line-highlight.line-highlight": {
            background: "linear-gradient(to right, #8da1b92f 70%, #8da1b925)",
          },
          ".line-highlight.line-highlight:before": {
            backgroundColor: "#3c526d",
            color: "#e3eaf2",
            boxShadow: "0 1px #8da1b9",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            backgroundColor: "#3c526d",
            color: "#e3eaf2",
            boxShadow: "0 1px #8da1b9",
          },
          "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":
            {
              backgroundColor: "#3c526d1f",
            },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRight: "1px solid #8da1b97a",
            background: "#d0dae77a",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#3c526dda",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-1": {
            color: "#755f00",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-5": {
            color: "#755f00",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-9": {
            color: "#755f00",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-2": {
            color: "#af00af",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-6": {
            color: "#af00af",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-10": {
            color: "#af00af",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-3": {
            color: "#005a8e",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-7": {
            color: "#005a8e",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-11": {
            color: "#005a8e",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-4": {
            color: "#7c00aa",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-8": {
            color: "#7c00aa",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-12": {
            color: "#7c00aa",
          },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
            backgroundColor: "#c22f2e1f",
          },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
            backgroundColor: "#c22f2e1f",
          },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
            backgroundColor: "#116b001f",
          },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
            backgroundColor: "#116b001f",
          },
          ".command-line .command-line-prompt": {
            borderRight: "1px solid #8da1b97a",
          },
          ".command-line .command-line-prompt > span:before": {
            color: "#3c526dda",
          },
        };
        e.default = t;
      })(ha)),
    ha
  );
}
var ma = {},
  gl;
function n0() {
  return (
    gl ||
      ((gl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#e3eaf2",
            background: "none",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
          },
          'pre[class*="language-"]': {
            color: "#e3eaf2",
            background: "#111b27",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#3c526d",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#3c526d",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#3c526d",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#3c526d",
          },
          'pre[class*="language-"]::selection': {
            background: "#3c526d",
          },
          'pre[class*="language-"] ::selection': {
            background: "#3c526d",
          },
          'code[class*="language-"]::selection': {
            background: "#3c526d",
          },
          'code[class*="language-"] ::selection': {
            background: "#3c526d",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#111b27",
            padding: "0.1em 0.3em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#8da1b9",
          },
          prolog: {
            color: "#8da1b9",
          },
          doctype: {
            color: "#8da1b9",
          },
          cdata: {
            color: "#8da1b9",
          },
          punctuation: {
            color: "#e3eaf2",
          },
          "delimiter.important": {
            color: "#66cccc",
            fontWeight: "inherit",
          },
          "selector.parent": {
            color: "#66cccc",
          },
          tag: {
            color: "#66cccc",
          },
          "tag.punctuation": {
            color: "#66cccc",
          },
          "attr-name": {
            color: "#e6d37a",
          },
          boolean: {
            color: "#e6d37a",
          },
          "boolean.important": {
            color: "#e6d37a",
          },
          number: {
            color: "#e6d37a",
          },
          constant: {
            color: "#e6d37a",
          },
          "selector.attribute": {
            color: "#e6d37a",
          },
          "class-name": {
            color: "#6cb8e6",
          },
          key: {
            color: "#6cb8e6",
          },
          parameter: {
            color: "#6cb8e6",
          },
          property: {
            color: "#6cb8e6",
          },
          "property-access": {
            color: "#6cb8e6",
          },
          variable: {
            color: "#6cb8e6",
          },
          "attr-value": {
            color: "#91d076",
          },
          inserted: {
            color: "#91d076",
          },
          color: {
            color: "#91d076",
          },
          "selector.value": {
            color: "#91d076",
          },
          string: {
            color: "#91d076",
          },
          "string.url-link": {
            color: "#91d076",
          },
          builtin: {
            color: "#f4adf4",
          },
          "keyword-array": {
            color: "#f4adf4",
          },
          package: {
            color: "#f4adf4",
          },
          regex: {
            color: "#f4adf4",
          },
          function: {
            color: "#c699e3",
          },
          "selector.class": {
            color: "#c699e3",
          },
          "selector.id": {
            color: "#c699e3",
          },
          "atrule.rule": {
            color: "#e9ae7e",
          },
          combinator: {
            color: "#e9ae7e",
          },
          keyword: {
            color: "#e9ae7e",
          },
          operator: {
            color: "#e9ae7e",
          },
          "pseudo-class": {
            color: "#e9ae7e",
          },
          "pseudo-element": {
            color: "#e9ae7e",
          },
          selector: {
            color: "#e9ae7e",
          },
          unit: {
            color: "#e9ae7e",
          },
          deleted: {
            color: "#cd6660",
          },
          important: {
            color: "#cd6660",
            fontWeight: "bold",
          },
          "keyword-this": {
            color: "#6cb8e6",
            fontWeight: "bold",
          },
          this: {
            color: "#6cb8e6",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          entity: {
            cursor: "help",
          },
          ".language-markdown .token.title": {
            color: "#6cb8e6",
            fontWeight: "bold",
          },
          ".language-markdown .token.title .token.punctuation": {
            color: "#6cb8e6",
            fontWeight: "bold",
          },
          ".language-markdown .token.blockquote.punctuation": {
            color: "#f4adf4",
          },
          ".language-markdown .token.code": {
            color: "#66cccc",
          },
          ".language-markdown .token.hr.punctuation": {
            color: "#6cb8e6",
          },
          ".language-markdown .token.url .token.content": {
            color: "#91d076",
          },
          ".language-markdown .token.url-link": {
            color: "#e6d37a",
          },
          ".language-markdown .token.list.punctuation": {
            color: "#f4adf4",
          },
          ".language-markdown .token.table-header": {
            color: "#e3eaf2",
          },
          ".language-json .token.operator": {
            color: "#e3eaf2",
          },
          ".language-scss .token.variable": {
            color: "#66cccc",
          },
          "token.tab:not(:empty):before": {
            color: "#8da1b9",
          },
          "token.cr:before": {
            color: "#8da1b9",
          },
          "token.lf:before": {
            color: "#8da1b9",
          },
          "token.space:before": {
            color: "#8da1b9",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
            color: "#111b27",
            background: "#6cb8e6",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
            color: "#111b27",
            background: "#6cb8e6",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
            color: "#111b27",
            background: "#6cb8e6da",
            textDecoration: "none",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
            color: "#111b27",
            background: "#6cb8e6da",
            textDecoration: "none",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":
            {
              color: "#111b27",
              background: "#6cb8e6da",
              textDecoration: "none",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":
            {
              color: "#111b27",
              background: "#6cb8e6da",
              textDecoration: "none",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
            color: "#111b27",
            background: "#8da1b9",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
            color: "#111b27",
            background: "#8da1b9",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
            color: "#111b27",
            background: "#8da1b9",
          },
          ".line-highlight.line-highlight": {
            background: "linear-gradient(to right, #3c526d5f 70%, #3c526d55)",
          },
          ".line-highlight.line-highlight:before": {
            backgroundColor: "#8da1b9",
            color: "#111b27",
            boxShadow: "0 1px #3c526d",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            backgroundColor: "#8da1b9",
            color: "#111b27",
            boxShadow: "0 1px #3c526d",
          },
          "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":
            {
              backgroundColor: "#8da1b918",
            },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRight: "1px solid #0b121b",
            background: "#0b121b7a",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#8da1b9da",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-1": {
            color: "#e6d37a",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-5": {
            color: "#e6d37a",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-9": {
            color: "#e6d37a",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-2": {
            color: "#f4adf4",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-6": {
            color: "#f4adf4",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-10": {
            color: "#f4adf4",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-3": {
            color: "#6cb8e6",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-7": {
            color: "#6cb8e6",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-11": {
            color: "#6cb8e6",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-4": {
            color: "#c699e3",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-8": {
            color: "#c699e3",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-12": {
            color: "#c699e3",
          },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
            backgroundColor: "#cd66601f",
          },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
            backgroundColor: "#cd66601f",
          },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
            backgroundColor: "#91d0761f",
          },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
            backgroundColor: "#91d0761f",
          },
          ".command-line .command-line-prompt": {
            borderRight: "1px solid #0b121b",
          },
          ".command-line .command-line-prompt > span:before": {
            color: "#8da1b9da",
          },
        };
        e.default = t;
      })(ma)),
    ma
  );
}
var ba = {},
  pl;
function o0() {
  return (
    pl ||
      ((pl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "black",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "black",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            backgroundImage:
              "linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)",
            backgroundSize: "3em 3em",
            backgroundOrigin: "content-box",
            backgroundAttachment: "local",
            margin: ".5em 0",
            padding: "0 1em",
          },
          'pre[class*="language-"] > code': {
            display: "block",
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
            boxSizing: "border-box",
          },
          comment: {
            color: "#7D8B99",
          },
          "block-comment": {
            color: "#7D8B99",
          },
          prolog: {
            color: "#7D8B99",
          },
          doctype: {
            color: "#7D8B99",
          },
          cdata: {
            color: "#7D8B99",
          },
          punctuation: {
            color: "#5F6364",
          },
          property: {
            color: "#c92c2c",
          },
          tag: {
            color: "#c92c2c",
          },
          boolean: {
            color: "#c92c2c",
          },
          number: {
            color: "#c92c2c",
          },
          "function-name": {
            color: "#c92c2c",
          },
          constant: {
            color: "#c92c2c",
          },
          symbol: {
            color: "#c92c2c",
          },
          deleted: {
            color: "#c92c2c",
          },
          selector: {
            color: "#2f9c0a",
          },
          "attr-name": {
            color: "#2f9c0a",
          },
          string: {
            color: "#2f9c0a",
          },
          char: {
            color: "#2f9c0a",
          },
          function: {
            color: "#2f9c0a",
          },
          builtin: {
            color: "#2f9c0a",
          },
          inserted: {
            color: "#2f9c0a",
          },
          operator: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          entity: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
            cursor: "help",
          },
          url: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          variable: {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          atrule: {
            color: "#1990b8",
          },
          "attr-value": {
            color: "#1990b8",
          },
          keyword: {
            color: "#1990b8",
          },
          "class-name": {
            color: "#1990b8",
          },
          regex: {
            color: "#e90",
          },
          important: {
            color: "#e90",
            fontWeight: "normal",
          },
          ".language-css .token.string": {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          ".style .token.string": {
            color: "#a67f59",
            background: "rgba(255, 255, 255, 0.5)",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          namespace: {
            Opacity: ".7",
          },
        };
        e.default = t;
      })(ba)),
    ba
  );
}
var ya = {},
  hl;
function r0() {
  return (
    hl ||
      ((hl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            background: "#2b2b2b",
          },
          'pre[class*="language-"]::-moz-selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          'pre[class*="language-"] ::-moz-selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          'code[class*="language-"]::-moz-selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          'code[class*="language-"] ::-moz-selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          'pre[class*="language-"]::selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          'pre[class*="language-"] ::selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          'code[class*="language-"]::selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          'code[class*="language-"] ::selection': {
            color: "inherit",
            background: "rgba(33, 66, 131, .85)",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#2b2b2b",
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#808080",
          },
          prolog: {
            color: "#808080",
          },
          cdata: {
            color: "#808080",
          },
          delimiter: {
            color: "#cc7832",
          },
          boolean: {
            color: "#cc7832",
          },
          keyword: {
            color: "#cc7832",
          },
          selector: {
            color: "#cc7832",
          },
          important: {
            color: "#cc7832",
          },
          atrule: {
            color: "#cc7832",
          },
          operator: {
            color: "#a9b7c6",
          },
          punctuation: {
            color: "#a9b7c6",
          },
          "attr-name": {
            color: "#a9b7c6",
          },
          tag: {
            color: "#e8bf6a",
          },
          "tag.punctuation": {
            color: "#e8bf6a",
          },
          doctype: {
            color: "#e8bf6a",
          },
          builtin: {
            color: "#e8bf6a",
          },
          entity: {
            color: "#6897bb",
          },
          number: {
            color: "#6897bb",
          },
          symbol: {
            color: "#6897bb",
          },
          property: {
            color: "#9876aa",
          },
          constant: {
            color: "#9876aa",
          },
          variable: {
            color: "#9876aa",
          },
          string: {
            color: "#6a8759",
          },
          char: {
            color: "#6a8759",
          },
          "attr-value": {
            color: "#a5c261",
          },
          "attr-value.punctuation": {
            color: "#a5c261",
          },
          "attr-value.punctuation:first-child": {
            color: "#a9b7c6",
          },
          url: {
            color: "#287bde",
            textDecoration: "underline",
          },
          function: {
            color: "#ffc66d",
          },
          regex: {
            background: "#364135",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          inserted: {
            background: "#294436",
          },
          deleted: {
            background: "#484a4a",
          },
          "code.language-css .token.property": {
            color: "#a9b7c6",
          },
          "code.language-css .token.property + .token.punctuation": {
            color: "#a9b7c6",
          },
          "code.language-css .token.id": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.class": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.attribute": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.pseudo-class": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.pseudo-element": {
            color: "#ffc66d",
          },
        };
        e.default = t;
      })(ya)),
    ya
  );
}
var va = {},
  ml;
function a0() {
  return (
    ml ||
      ((ml = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#f8f8f2",
            background: "none",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#f8f8f2",
            background: "#282a36",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#282a36",
            padding: ".1em",
            borderRadius: ".3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#6272a4",
          },
          prolog: {
            color: "#6272a4",
          },
          doctype: {
            color: "#6272a4",
          },
          cdata: {
            color: "#6272a4",
          },
          punctuation: {
            color: "#f8f8f2",
          },
          ".namespace": {
            Opacity: ".7",
          },
          property: {
            color: "#ff79c6",
          },
          tag: {
            color: "#ff79c6",
          },
          constant: {
            color: "#ff79c6",
          },
          symbol: {
            color: "#ff79c6",
          },
          deleted: {
            color: "#ff79c6",
          },
          boolean: {
            color: "#bd93f9",
          },
          number: {
            color: "#bd93f9",
          },
          selector: {
            color: "#50fa7b",
          },
          "attr-name": {
            color: "#50fa7b",
          },
          string: {
            color: "#50fa7b",
          },
          char: {
            color: "#50fa7b",
          },
          builtin: {
            color: "#50fa7b",
          },
          inserted: {
            color: "#50fa7b",
          },
          operator: {
            color: "#f8f8f2",
          },
          entity: {
            color: "#f8f8f2",
            cursor: "help",
          },
          url: {
            color: "#f8f8f2",
          },
          ".language-css .token.string": {
            color: "#f8f8f2",
          },
          ".style .token.string": {
            color: "#f8f8f2",
          },
          variable: {
            color: "#f8f8f2",
          },
          atrule: {
            color: "#f1fa8c",
          },
          "attr-value": {
            color: "#f1fa8c",
          },
          function: {
            color: "#f1fa8c",
          },
          "class-name": {
            color: "#f1fa8c",
          },
          keyword: {
            color: "#8be9fd",
          },
          regex: {
            color: "#ffb86c",
          },
          important: {
            color: "#ffb86c",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(va)),
    va
  );
}
var wa = {},
  bl;
function i0() {
  return (
    bl ||
      ((bl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#6a51e6",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#6c6783",
          },
          prolog: {
            color: "#6c6783",
          },
          doctype: {
            color: "#6c6783",
          },
          cdata: {
            color: "#6c6783",
          },
          punctuation: {
            color: "#6c6783",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "#e09142",
          },
          operator: {
            color: "#e09142",
          },
          number: {
            color: "#e09142",
          },
          property: {
            color: "#9a86fd",
          },
          function: {
            color: "#9a86fd",
          },
          "tag-id": {
            color: "#eeebff",
          },
          selector: {
            color: "#eeebff",
          },
          "atrule-id": {
            color: "#eeebff",
          },
          "code.language-javascript": {
            color: "#c4b9fe",
          },
          "attr-name": {
            color: "#c4b9fe",
          },
          "code.language-css": {
            color: "#ffcc99",
          },
          "code.language-scss": {
            color: "#ffcc99",
          },
          boolean: {
            color: "#ffcc99",
          },
          string: {
            color: "#ffcc99",
          },
          entity: {
            color: "#ffcc99",
            cursor: "help",
          },
          url: {
            color: "#ffcc99",
          },
          ".language-css .token.string": {
            color: "#ffcc99",
          },
          ".language-scss .token.string": {
            color: "#ffcc99",
          },
          ".style .token.string": {
            color: "#ffcc99",
          },
          "attr-value": {
            color: "#ffcc99",
          },
          keyword: {
            color: "#ffcc99",
          },
          control: {
            color: "#ffcc99",
          },
          directive: {
            color: "#ffcc99",
          },
          unit: {
            color: "#ffcc99",
          },
          statement: {
            color: "#ffcc99",
          },
          regex: {
            color: "#ffcc99",
          },
          atrule: {
            color: "#ffcc99",
          },
          placeholder: {
            color: "#ffcc99",
          },
          variable: {
            color: "#ffcc99",
          },
          deleted: {
            textDecoration: "line-through",
          },
          inserted: {
            borderBottom: "1px dotted #eeebff",
            textDecoration: "none",
          },
          italic: {
            fontStyle: "italic",
          },
          important: {
            fontWeight: "bold",
            color: "#c4b9fe",
          },
          bold: {
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: ".4em solid #8a75f5",
            OutlineOffset: ".4em",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#2c2937",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#3c3949",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(224, 145, 66, 0.2) 70%, rgba(224, 145, 66, 0))",
          },
        };
        e.default = t;
      })(wa)),
    wa
  );
}
var xa = {},
  yl;
function s0() {
  return (
    yl ||
      ((yl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#6f5849",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#6a5f58",
          },
          prolog: {
            color: "#6a5f58",
          },
          doctype: {
            color: "#6a5f58",
          },
          cdata: {
            color: "#6a5f58",
          },
          punctuation: {
            color: "#6a5f58",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "#bfa05a",
          },
          operator: {
            color: "#bfa05a",
          },
          number: {
            color: "#bfa05a",
          },
          property: {
            color: "#88786d",
          },
          function: {
            color: "#88786d",
          },
          "tag-id": {
            color: "#fff3eb",
          },
          selector: {
            color: "#fff3eb",
          },
          "atrule-id": {
            color: "#fff3eb",
          },
          "code.language-javascript": {
            color: "#a48774",
          },
          "attr-name": {
            color: "#a48774",
          },
          "code.language-css": {
            color: "#fcc440",
          },
          "code.language-scss": {
            color: "#fcc440",
          },
          boolean: {
            color: "#fcc440",
          },
          string: {
            color: "#fcc440",
          },
          entity: {
            color: "#fcc440",
            cursor: "help",
          },
          url: {
            color: "#fcc440",
          },
          ".language-css .token.string": {
            color: "#fcc440",
          },
          ".language-scss .token.string": {
            color: "#fcc440",
          },
          ".style .token.string": {
            color: "#fcc440",
          },
          "attr-value": {
            color: "#fcc440",
          },
          keyword: {
            color: "#fcc440",
          },
          control: {
            color: "#fcc440",
          },
          directive: {
            color: "#fcc440",
          },
          unit: {
            color: "#fcc440",
          },
          statement: {
            color: "#fcc440",
          },
          regex: {
            color: "#fcc440",
          },
          atrule: {
            color: "#fcc440",
          },
          placeholder: {
            color: "#fcc440",
          },
          variable: {
            color: "#fcc440",
          },
          deleted: {
            textDecoration: "line-through",
          },
          inserted: {
            borderBottom: "1px dotted #fff3eb",
            textDecoration: "none",
          },
          italic: {
            fontStyle: "italic",
          },
          important: {
            fontWeight: "bold",
            color: "#a48774",
          },
          bold: {
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: ".4em solid #816d5f",
            OutlineOffset: ".4em",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#35302b",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#46403d",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(191, 160, 90, 0.2) 70%, rgba(191, 160, 90, 0))",
          },
        };
        e.default = t;
      })(xa)),
    xa
  );
}
var Sa = {},
  vl;
function l0() {
  return (
    vl ||
      ((vl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#435643",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#435643",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#435643",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#435643",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#435643",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#435643",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#435643",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#435643",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#535f53",
          },
          prolog: {
            color: "#535f53",
          },
          doctype: {
            color: "#535f53",
          },
          cdata: {
            color: "#535f53",
          },
          punctuation: {
            color: "#535f53",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "#a2b34d",
          },
          operator: {
            color: "#a2b34d",
          },
          number: {
            color: "#a2b34d",
          },
          property: {
            color: "#687d68",
          },
          function: {
            color: "#687d68",
          },
          "tag-id": {
            color: "#f0fff0",
          },
          selector: {
            color: "#f0fff0",
          },
          "atrule-id": {
            color: "#f0fff0",
          },
          "code.language-javascript": {
            color: "#b3d6b3",
          },
          "attr-name": {
            color: "#b3d6b3",
          },
          "code.language-css": {
            color: "#e5fb79",
          },
          "code.language-scss": {
            color: "#e5fb79",
          },
          boolean: {
            color: "#e5fb79",
          },
          string: {
            color: "#e5fb79",
          },
          entity: {
            color: "#e5fb79",
            cursor: "help",
          },
          url: {
            color: "#e5fb79",
          },
          ".language-css .token.string": {
            color: "#e5fb79",
          },
          ".language-scss .token.string": {
            color: "#e5fb79",
          },
          ".style .token.string": {
            color: "#e5fb79",
          },
          "attr-value": {
            color: "#e5fb79",
          },
          keyword: {
            color: "#e5fb79",
          },
          control: {
            color: "#e5fb79",
          },
          directive: {
            color: "#e5fb79",
          },
          unit: {
            color: "#e5fb79",
          },
          statement: {
            color: "#e5fb79",
          },
          regex: {
            color: "#e5fb79",
          },
          atrule: {
            color: "#e5fb79",
          },
          placeholder: {
            color: "#e5fb79",
          },
          variable: {
            color: "#e5fb79",
          },
          deleted: {
            textDecoration: "line-through",
          },
          inserted: {
            borderBottom: "1px dotted #f0fff0",
            textDecoration: "none",
          },
          italic: {
            fontStyle: "italic",
          },
          important: {
            fontWeight: "bold",
            color: "#b3d6b3",
          },
          bold: {
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: ".4em solid #5c705c",
            OutlineOffset: ".4em",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#2c302c",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#3b423b",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(162, 179, 77, 0.2) 70%, rgba(162, 179, 77, 0))",
          },
        };
        e.default = t;
      })(Sa)),
    Sa
  );
}
var Ca = {},
  wl;
function c0() {
  return (
    wl ||
      ((wl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#faf8f5",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#b6ad9a",
          },
          prolog: {
            color: "#b6ad9a",
          },
          doctype: {
            color: "#b6ad9a",
          },
          cdata: {
            color: "#b6ad9a",
          },
          punctuation: {
            color: "#b6ad9a",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "#063289",
          },
          operator: {
            color: "#063289",
          },
          number: {
            color: "#063289",
          },
          property: {
            color: "#b29762",
          },
          function: {
            color: "#b29762",
          },
          "tag-id": {
            color: "#2d2006",
          },
          selector: {
            color: "#2d2006",
          },
          "atrule-id": {
            color: "#2d2006",
          },
          "code.language-javascript": {
            color: "#896724",
          },
          "attr-name": {
            color: "#896724",
          },
          "code.language-css": {
            color: "#728fcb",
          },
          "code.language-scss": {
            color: "#728fcb",
          },
          boolean: {
            color: "#728fcb",
          },
          string: {
            color: "#728fcb",
          },
          entity: {
            color: "#728fcb",
            cursor: "help",
          },
          url: {
            color: "#728fcb",
          },
          ".language-css .token.string": {
            color: "#728fcb",
          },
          ".language-scss .token.string": {
            color: "#728fcb",
          },
          ".style .token.string": {
            color: "#728fcb",
          },
          "attr-value": {
            color: "#728fcb",
          },
          keyword: {
            color: "#728fcb",
          },
          control: {
            color: "#728fcb",
          },
          directive: {
            color: "#728fcb",
          },
          unit: {
            color: "#728fcb",
          },
          statement: {
            color: "#728fcb",
          },
          regex: {
            color: "#728fcb",
          },
          atrule: {
            color: "#728fcb",
          },
          placeholder: {
            color: "#93abdc",
          },
          variable: {
            color: "#93abdc",
          },
          deleted: {
            textDecoration: "line-through",
          },
          inserted: {
            borderBottom: "1px dotted #2d2006",
            textDecoration: "none",
          },
          italic: {
            fontStyle: "italic",
          },
          important: {
            fontWeight: "bold",
            color: "#896724",
          },
          bold: {
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: ".4em solid #896724",
            OutlineOffset: ".4em",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#ece8de",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#cdc4b1",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(45, 32, 6, 0.2) 70%, rgba(45, 32, 6, 0))",
          },
        };
        e.default = t;
      })(Ca)),
    Ca
  );
}
var Ea = {},
  xl;
function u0() {
  return (
    xl ||
      ((xl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#004a9e",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#4a5f78",
          },
          prolog: {
            color: "#4a5f78",
          },
          doctype: {
            color: "#4a5f78",
          },
          cdata: {
            color: "#4a5f78",
          },
          punctuation: {
            color: "#4a5f78",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "#0aa370",
          },
          operator: {
            color: "#0aa370",
          },
          number: {
            color: "#0aa370",
          },
          property: {
            color: "#57718e",
          },
          function: {
            color: "#57718e",
          },
          "tag-id": {
            color: "#ebf4ff",
          },
          selector: {
            color: "#ebf4ff",
          },
          "atrule-id": {
            color: "#ebf4ff",
          },
          "code.language-javascript": {
            color: "#7eb6f6",
          },
          "attr-name": {
            color: "#7eb6f6",
          },
          "code.language-css": {
            color: "#47ebb4",
          },
          "code.language-scss": {
            color: "#47ebb4",
          },
          boolean: {
            color: "#47ebb4",
          },
          string: {
            color: "#47ebb4",
          },
          entity: {
            color: "#47ebb4",
            cursor: "help",
          },
          url: {
            color: "#47ebb4",
          },
          ".language-css .token.string": {
            color: "#47ebb4",
          },
          ".language-scss .token.string": {
            color: "#47ebb4",
          },
          ".style .token.string": {
            color: "#47ebb4",
          },
          "attr-value": {
            color: "#47ebb4",
          },
          keyword: {
            color: "#47ebb4",
          },
          control: {
            color: "#47ebb4",
          },
          directive: {
            color: "#47ebb4",
          },
          unit: {
            color: "#47ebb4",
          },
          statement: {
            color: "#47ebb4",
          },
          regex: {
            color: "#47ebb4",
          },
          atrule: {
            color: "#47ebb4",
          },
          placeholder: {
            color: "#47ebb4",
          },
          variable: {
            color: "#47ebb4",
          },
          deleted: {
            textDecoration: "line-through",
          },
          inserted: {
            borderBottom: "1px dotted #ebf4ff",
            textDecoration: "none",
          },
          italic: {
            fontStyle: "italic",
          },
          important: {
            fontWeight: "bold",
            color: "#7eb6f6",
          },
          bold: {
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: ".4em solid #34659d",
            OutlineOffset: ".4em",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#1f2932",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#2c3847",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(10, 163, 112, 0.2) 70%, rgba(10, 163, 112, 0))",
          },
        };
        e.default = t;
      })(Ea)),
    Ea
  );
}
var _a = {},
  Sl;
function d0() {
  return (
    Sl ||
      ((Sl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "#5151e6",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#5b5b76",
          },
          prolog: {
            color: "#5b5b76",
          },
          doctype: {
            color: "#5b5b76",
          },
          cdata: {
            color: "#5b5b76",
          },
          punctuation: {
            color: "#5b5b76",
          },
          namespace: {
            Opacity: ".7",
          },
          tag: {
            color: "#dd672c",
          },
          operator: {
            color: "#dd672c",
          },
          number: {
            color: "#dd672c",
          },
          property: {
            color: "#767693",
          },
          function: {
            color: "#767693",
          },
          "tag-id": {
            color: "#ebebff",
          },
          selector: {
            color: "#ebebff",
          },
          "atrule-id": {
            color: "#ebebff",
          },
          "code.language-javascript": {
            color: "#aaaaca",
          },
          "attr-name": {
            color: "#aaaaca",
          },
          "code.language-css": {
            color: "#fe8c52",
          },
          "code.language-scss": {
            color: "#fe8c52",
          },
          boolean: {
            color: "#fe8c52",
          },
          string: {
            color: "#fe8c52",
          },
          entity: {
            color: "#fe8c52",
            cursor: "help",
          },
          url: {
            color: "#fe8c52",
          },
          ".language-css .token.string": {
            color: "#fe8c52",
          },
          ".language-scss .token.string": {
            color: "#fe8c52",
          },
          ".style .token.string": {
            color: "#fe8c52",
          },
          "attr-value": {
            color: "#fe8c52",
          },
          keyword: {
            color: "#fe8c52",
          },
          control: {
            color: "#fe8c52",
          },
          directive: {
            color: "#fe8c52",
          },
          unit: {
            color: "#fe8c52",
          },
          statement: {
            color: "#fe8c52",
          },
          regex: {
            color: "#fe8c52",
          },
          atrule: {
            color: "#fe8c52",
          },
          placeholder: {
            color: "#fe8c52",
          },
          variable: {
            color: "#fe8c52",
          },
          deleted: {
            textDecoration: "line-through",
          },
          inserted: {
            borderBottom: "1px dotted #ebebff",
            textDecoration: "none",
          },
          italic: {
            fontStyle: "italic",
          },
          important: {
            fontWeight: "bold",
            color: "#aaaaca",
          },
          bold: {
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: ".4em solid #7676f4",
            OutlineOffset: ".4em",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#262631",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#393949",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(221, 103, 44, 0.2) 70%, rgba(221, 103, 44, 0))",
          },
        };
        e.default = t;
      })(_a)),
    _a
  );
}
var ka = {},
  Cl;
function f0() {
  return (
    Cl ||
      ((Cl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#393A34",
            fontFamily:
              '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            color: "#393A34",
            fontFamily:
              '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
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
            backgroundColor: "white",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#b3d4fc",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#b3d4fc",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#b3d4fc",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#b3d4fc",
          },
          'pre[class*="language-"]::selection': {
            background: "#b3d4fc",
          },
          'pre[class*="language-"] ::selection': {
            background: "#b3d4fc",
          },
          'code[class*="language-"]::selection': {
            background: "#b3d4fc",
          },
          'code[class*="language-"] ::selection': {
            background: "#b3d4fc",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".2em",
            paddingTop: "1px",
            paddingBottom: "1px",
            background: "#f8f8f8",
            border: "1px solid #dddddd",
          },
          comment: {
            color: "#999988",
            fontStyle: "italic",
          },
          prolog: {
            color: "#999988",
            fontStyle: "italic",
          },
          doctype: {
            color: "#999988",
            fontStyle: "italic",
          },
          cdata: {
            color: "#999988",
            fontStyle: "italic",
          },
          namespace: {
            Opacity: ".7",
          },
          string: {
            color: "#e3116c",
          },
          "attr-value": {
            color: "#e3116c",
          },
          punctuation: {
            color: "#393A34",
          },
          operator: {
            color: "#393A34",
          },
          entity: {
            color: "#36acaa",
          },
          url: {
            color: "#36acaa",
          },
          symbol: {
            color: "#36acaa",
          },
          number: {
            color: "#36acaa",
          },
          boolean: {
            color: "#36acaa",
          },
          variable: {
            color: "#36acaa",
          },
          constant: {
            color: "#36acaa",
          },
          property: {
            color: "#36acaa",
          },
          regex: {
            color: "#36acaa",
          },
          inserted: {
            color: "#36acaa",
          },
          atrule: {
            color: "#00a4db",
          },
          keyword: {
            color: "#00a4db",
          },
          "attr-name": {
            color: "#00a4db",
          },
          ".language-autohotkey .token.selector": {
            color: "#00a4db",
          },
          function: {
            color: "#9a050f",
            fontWeight: "bold",
          },
          deleted: {
            color: "#9a050f",
          },
          ".language-autohotkey .token.tag": {
            color: "#9a050f",
          },
          tag: {
            color: "#00009f",
          },
          selector: {
            color: "#00009f",
          },
          ".language-autohotkey .token.keyword": {
            color: "#00009f",
          },
          important: {
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(ka)),
    ka
  );
}
var Aa = {},
  El;
function g0() {
  return (
    El ||
      ((El = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            background: "#1d2021",
          },
          'pre[class*="language-"]::-moz-selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          'pre[class*="language-"] ::-moz-selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          'code[class*="language-"]::-moz-selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          'code[class*="language-"] ::-moz-selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          'pre[class*="language-"]::selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          'pre[class*="language-"] ::selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          'code[class*="language-"]::selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          'code[class*="language-"] ::selection': {
            color: "#fbf1c7",
            background: "#7c6f64",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#1d2021",
            padding: "0.1em",
            borderRadius: "0.3em",
          },
          comment: {
            color: "#a89984",
          },
          prolog: {
            color: "#a89984",
          },
          cdata: {
            color: "#a89984",
          },
          delimiter: {
            color: "#fb4934",
          },
          boolean: {
            color: "#fb4934",
          },
          keyword: {
            color: "#fb4934",
          },
          selector: {
            color: "#fb4934",
          },
          important: {
            color: "#fb4934",
          },
          atrule: {
            color: "#fb4934",
          },
          operator: {
            color: "#a89984",
          },
          punctuation: {
            color: "#a89984",
          },
          "attr-name": {
            color: "#a89984",
          },
          tag: {
            color: "#fabd2f",
          },
          "tag.punctuation": {
            color: "#fabd2f",
          },
          doctype: {
            color: "#fabd2f",
          },
          builtin: {
            color: "#fabd2f",
          },
          entity: {
            color: "#d3869b",
          },
          number: {
            color: "#d3869b",
          },
          symbol: {
            color: "#d3869b",
          },
          property: {
            color: "#fb4934",
          },
          constant: {
            color: "#fb4934",
          },
          variable: {
            color: "#fb4934",
          },
          string: {
            color: "#b8bb26",
          },
          char: {
            color: "#b8bb26",
          },
          "attr-value": {
            color: "#a89984",
          },
          "attr-value.punctuation": {
            color: "#a89984",
          },
          url: {
            color: "#b8bb26",
            textDecoration: "underline",
          },
          function: {
            color: "#fabd2f",
          },
          regex: {
            background: "#b8bb26",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          inserted: {
            background: "#a89984",
          },
          deleted: {
            background: "#fb4934",
          },
        };
        e.default = t;
      })(Aa)),
    Aa
  );
}
var Ma = {},
  _l;
function p0() {
  return (
    _l ||
      ((_l = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            background: "#f9f5d7",
          },
          'pre[class*="language-"]::-moz-selection': {
            color: "#282828",
            background: "#a89984",
          },
          'pre[class*="language-"] ::-moz-selection': {
            color: "#282828",
            background: "#a89984",
          },
          'code[class*="language-"]::-moz-selection': {
            color: "#282828",
            background: "#a89984",
          },
          'code[class*="language-"] ::-moz-selection': {
            color: "#282828",
            background: "#a89984",
          },
          'pre[class*="language-"]::selection': {
            color: "#282828",
            background: "#a89984",
          },
          'pre[class*="language-"] ::selection': {
            color: "#282828",
            background: "#a89984",
          },
          'code[class*="language-"]::selection': {
            color: "#282828",
            background: "#a89984",
          },
          'code[class*="language-"] ::selection': {
            color: "#282828",
            background: "#a89984",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#f9f5d7",
            padding: "0.1em",
            borderRadius: "0.3em",
          },
          comment: {
            color: "#7c6f64",
          },
          prolog: {
            color: "#7c6f64",
          },
          cdata: {
            color: "#7c6f64",
          },
          delimiter: {
            color: "#9d0006",
          },
          boolean: {
            color: "#9d0006",
          },
          keyword: {
            color: "#9d0006",
          },
          selector: {
            color: "#9d0006",
          },
          important: {
            color: "#9d0006",
          },
          atrule: {
            color: "#9d0006",
          },
          operator: {
            color: "#7c6f64",
          },
          punctuation: {
            color: "#7c6f64",
          },
          "attr-name": {
            color: "#7c6f64",
          },
          tag: {
            color: "#b57614",
          },
          "tag.punctuation": {
            color: "#b57614",
          },
          doctype: {
            color: "#b57614",
          },
          builtin: {
            color: "#b57614",
          },
          entity: {
            color: "#8f3f71",
          },
          number: {
            color: "#8f3f71",
          },
          symbol: {
            color: "#8f3f71",
          },
          property: {
            color: "#9d0006",
          },
          constant: {
            color: "#9d0006",
          },
          variable: {
            color: "#9d0006",
          },
          string: {
            color: "#797403",
          },
          char: {
            color: "#797403",
          },
          "attr-value": {
            color: "#7c6f64",
          },
          "attr-value.punctuation": {
            color: "#7c6f64",
          },
          url: {
            color: "#797403",
            textDecoration: "underline",
          },
          function: {
            color: "#b57614",
          },
          regex: {
            background: "#797403",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          inserted: {
            background: "#7c6f64",
          },
          deleted: {
            background: "#9d0006",
          },
        };
        e.default = t;
      })(Ma)),
    Ma
  );
}
var Ta = {},
  kl;
function h0() {
  return (
    kl ||
      ((kl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          "code[class*='language-']": {
            color: "#d6e7ff",
            background: "#030314",
            textShadow: "none",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
          },
          "pre[class*='language-']": {
            color: "#d6e7ff",
            background: "#030314",
            textShadow: "none",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
            overflow: "auto",
          },
          "pre[class*='language-']::-moz-selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          "pre[class*='language-'] ::-moz-selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          "code[class*='language-']::-moz-selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          "code[class*='language-'] ::-moz-selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          "pre[class*='language-']::selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          "pre[class*='language-'] ::selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          "code[class*='language-']::selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          "code[class*='language-'] ::selection": {
            color: "inherit",
            background: "#1d3b54",
            textShadow: "none",
          },
          ":not(pre) > code[class*='language-']": {
            color: "#f0f6f6",
            background: "#2a4555",
            padding: "0.2em 0.3em",
            borderRadius: "0.2em",
            boxDecorationBreak: "clone",
          },
          comment: {
            color: "#446e69",
          },
          prolog: {
            color: "#446e69",
          },
          doctype: {
            color: "#446e69",
          },
          cdata: {
            color: "#446e69",
          },
          punctuation: {
            color: "#d6b007",
          },
          property: {
            color: "#d6e7ff",
          },
          tag: {
            color: "#d6e7ff",
          },
          boolean: {
            color: "#d6e7ff",
          },
          number: {
            color: "#d6e7ff",
          },
          constant: {
            color: "#d6e7ff",
          },
          symbol: {
            color: "#d6e7ff",
          },
          deleted: {
            color: "#d6e7ff",
          },
          selector: {
            color: "#e60067",
          },
          "attr-name": {
            color: "#e60067",
          },
          builtin: {
            color: "#e60067",
          },
          inserted: {
            color: "#e60067",
          },
          string: {
            color: "#49c6ec",
          },
          char: {
            color: "#49c6ec",
          },
          operator: {
            color: "#ec8e01",
            background: "transparent",
          },
          entity: {
            color: "#ec8e01",
            background: "transparent",
          },
          url: {
            color: "#ec8e01",
            background: "transparent",
          },
          ".language-css .token.string": {
            color: "#ec8e01",
            background: "transparent",
          },
          ".style .token.string": {
            color: "#ec8e01",
            background: "transparent",
          },
          atrule: {
            color: "#0fe468",
          },
          "attr-value": {
            color: "#0fe468",
          },
          keyword: {
            color: "#0fe468",
          },
          function: {
            color: "#78f3e9",
          },
          "class-name": {
            color: "#78f3e9",
          },
          regex: {
            color: "#d6e7ff",
          },
          important: {
            color: "#d6e7ff",
          },
          variable: {
            color: "#d6e7ff",
          },
        };
        e.default = t;
      })(Ta)),
    Ta
  );
}
var Oa = {},
  Al;
function m0() {
  return (
    Al ||
      ((Al = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            fontFamily:
              '"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            fontFamily:
              '"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',
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
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#797379",
          },
          prolog: {
            color: "#797379",
          },
          doctype: {
            color: "#797379",
          },
          cdata: {
            color: "#797379",
          },
          punctuation: {
            color: "#b9b5b8",
          },
          ".namespace": {
            Opacity: ".7",
          },
          null: {
            color: "#fd8b19",
          },
          operator: {
            color: "#fd8b19",
          },
          boolean: {
            color: "#fd8b19",
          },
          number: {
            color: "#fd8b19",
          },
          property: {
            color: "#fdcc59",
          },
          tag: {
            color: "#1290bf",
          },
          string: {
            color: "#149b93",
          },
          selector: {
            color: "#c85e7c",
          },
          "attr-name": {
            color: "#fd8b19",
          },
          entity: {
            color: "#149b93",
            cursor: "help",
          },
          url: {
            color: "#149b93",
          },
          ".language-css .token.string": {
            color: "#149b93",
          },
          ".style .token.string": {
            color: "#149b93",
          },
          "attr-value": {
            color: "#8fc13e",
          },
          keyword: {
            color: "#8fc13e",
          },
          control: {
            color: "#8fc13e",
          },
          directive: {
            color: "#8fc13e",
          },
          unit: {
            color: "#8fc13e",
          },
          statement: {
            color: "#149b93",
          },
          regex: {
            color: "#149b93",
          },
          atrule: {
            color: "#149b93",
          },
          placeholder: {
            color: "#1290bf",
          },
          variable: {
            color: "#1290bf",
          },
          important: {
            color: "#dd464c",
            fontWeight: "bold",
          },
          "pre > code.highlight": {
            Outline: ".4em solid red",
            OutlineOffset: ".4em",
          },
        };
        e.default = t;
      })(Oa)),
    Oa
  );
}
var Na = {},
  Ml;
function b0() {
  return (
    Ml ||
      ((Ml = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#f8f8f2",
            background: "none",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#f8f8f2",
            background: "#263E52",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#263E52",
            padding: ".1em",
            borderRadius: ".3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#5c98cd",
          },
          prolog: {
            color: "#5c98cd",
          },
          doctype: {
            color: "#5c98cd",
          },
          cdata: {
            color: "#5c98cd",
          },
          punctuation: {
            color: "#f8f8f2",
          },
          ".namespace": {
            Opacity: ".7",
          },
          property: {
            color: "#F05E5D",
          },
          tag: {
            color: "#F05E5D",
          },
          constant: {
            color: "#F05E5D",
          },
          symbol: {
            color: "#F05E5D",
          },
          deleted: {
            color: "#F05E5D",
          },
          boolean: {
            color: "#BC94F9",
          },
          number: {
            color: "#BC94F9",
          },
          selector: {
            color: "#FCFCD6",
          },
          "attr-name": {
            color: "#FCFCD6",
          },
          string: {
            color: "#FCFCD6",
          },
          char: {
            color: "#FCFCD6",
          },
          builtin: {
            color: "#FCFCD6",
          },
          inserted: {
            color: "#FCFCD6",
          },
          operator: {
            color: "#f8f8f2",
          },
          entity: {
            color: "#f8f8f2",
            cursor: "help",
          },
          url: {
            color: "#f8f8f2",
          },
          ".language-css .token.string": {
            color: "#f8f8f2",
          },
          ".style .token.string": {
            color: "#f8f8f2",
          },
          variable: {
            color: "#f8f8f2",
          },
          atrule: {
            color: "#66D8EF",
          },
          "attr-value": {
            color: "#66D8EF",
          },
          function: {
            color: "#66D8EF",
          },
          "class-name": {
            color: "#66D8EF",
          },
          keyword: {
            color: "#6EB26E",
          },
          regex: {
            color: "#F05E5D",
          },
          important: {
            color: "#F05E5D",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(Na)),
    Na
  );
}
var Da = {},
  Tl;
function y0() {
  return (
    Tl ||
      ((Tl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            padding: "1.25em 1em",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#363636",
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#363636",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#363636",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#363636",
          },
          'code[class*="language-"]::selection': {
            background: "#363636",
          },
          'pre[class*="language-"]::selection': {
            background: "#363636",
          },
          'code[class*="language-"] ::selection': {
            background: "#363636",
          },
          'pre[class*="language-"] ::selection': {
            background: "#363636",
          },
          ':not(pre) > code[class*="language-"]': {
            whiteSpace: "normal",
            borderRadius: "0.2em",
            padding: "0.1em",
          },
          ".language-css > code": {
            color: "#fd9170",
          },
          ".language-sass > code": {
            color: "#fd9170",
          },
          ".language-scss > code": {
            color: "#fd9170",
          },
          '[class*="language-"] .namespace': {
            Opacity: "0.7",
          },
          atrule: {
            color: "#c792ea",
          },
          "attr-name": {
            color: "#ffcb6b",
          },
          "attr-value": {
            color: "#a5e844",
          },
          attribute: {
            color: "#a5e844",
          },
          boolean: {
            color: "#c792ea",
          },
          builtin: {
            color: "#ffcb6b",
          },
          cdata: {
            color: "#80cbc4",
          },
          char: {
            color: "#80cbc4",
          },
          class: {
            color: "#ffcb6b",
          },
          "class-name": {
            color: "#f2ff00",
          },
          comment: {
            color: "#616161",
          },
          constant: {
            color: "#c792ea",
          },
          deleted: {
            color: "#ff6666",
          },
          doctype: {
            color: "#616161",
          },
          entity: {
            color: "#ff6666",
          },
          function: {
            color: "#c792ea",
          },
          hexcode: {
            color: "#f2ff00",
          },
          id: {
            color: "#c792ea",
            fontWeight: "bold",
          },
          important: {
            color: "#c792ea",
            fontWeight: "bold",
          },
          inserted: {
            color: "#80cbc4",
          },
          keyword: {
            color: "#c792ea",
          },
          number: {
            color: "#fd9170",
          },
          operator: {
            color: "#89ddff",
          },
          prolog: {
            color: "#616161",
          },
          property: {
            color: "#80cbc4",
          },
          "pseudo-class": {
            color: "#a5e844",
          },
          "pseudo-element": {
            color: "#a5e844",
          },
          punctuation: {
            color: "#89ddff",
          },
          regex: {
            color: "#f2ff00",
          },
          selector: {
            color: "#ff6666",
          },
          string: {
            color: "#a5e844",
          },
          symbol: {
            color: "#c792ea",
          },
          tag: {
            color: "#ff6666",
          },
          unit: {
            color: "#fd9170",
          },
          url: {
            color: "#ff6666",
          },
          variable: {
            color: "#ff6666",
          },
        };
        e.default = t;
      })(Da)),
    Da
  );
}
var Ra = {},
  Ol;
function v0() {
  return (
    Ol ||
      ((Ol = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            padding: "1.25em 1em",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#cceae7",
            color: "#263238",
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#cceae7",
            color: "#263238",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#cceae7",
            color: "#263238",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#cceae7",
            color: "#263238",
          },
          'code[class*="language-"]::selection': {
            background: "#cceae7",
            color: "#263238",
          },
          'pre[class*="language-"]::selection': {
            background: "#cceae7",
            color: "#263238",
          },
          'code[class*="language-"] ::selection': {
            background: "#cceae7",
            color: "#263238",
          },
          'pre[class*="language-"] ::selection': {
            background: "#cceae7",
            color: "#263238",
          },
          ':not(pre) > code[class*="language-"]': {
            whiteSpace: "normal",
            borderRadius: "0.2em",
            padding: "0.1em",
          },
          ".language-css > code": {
            color: "#f76d47",
          },
          ".language-sass > code": {
            color: "#f76d47",
          },
          ".language-scss > code": {
            color: "#f76d47",
          },
          '[class*="language-"] .namespace': {
            Opacity: "0.7",
          },
          atrule: {
            color: "#7c4dff",
          },
          "attr-name": {
            color: "#39adb5",
          },
          "attr-value": {
            color: "#f6a434",
          },
          attribute: {
            color: "#f6a434",
          },
          boolean: {
            color: "#7c4dff",
          },
          builtin: {
            color: "#39adb5",
          },
          cdata: {
            color: "#39adb5",
          },
          char: {
            color: "#39adb5",
          },
          class: {
            color: "#39adb5",
          },
          "class-name": {
            color: "#6182b8",
          },
          comment: {
            color: "#aabfc9",
          },
          constant: {
            color: "#7c4dff",
          },
          deleted: {
            color: "#e53935",
          },
          doctype: {
            color: "#aabfc9",
          },
          entity: {
            color: "#e53935",
          },
          function: {
            color: "#7c4dff",
          },
          hexcode: {
            color: "#f76d47",
          },
          id: {
            color: "#7c4dff",
            fontWeight: "bold",
          },
          important: {
            color: "#7c4dff",
            fontWeight: "bold",
          },
          inserted: {
            color: "#39adb5",
          },
          keyword: {
            color: "#7c4dff",
          },
          number: {
            color: "#f76d47",
          },
          operator: {
            color: "#39adb5",
          },
          prolog: {
            color: "#aabfc9",
          },
          property: {
            color: "#39adb5",
          },
          "pseudo-class": {
            color: "#f6a434",
          },
          "pseudo-element": {
            color: "#f6a434",
          },
          punctuation: {
            color: "#39adb5",
          },
          regex: {
            color: "#6182b8",
          },
          selector: {
            color: "#e53935",
          },
          string: {
            color: "#f6a434",
          },
          symbol: {
            color: "#7c4dff",
          },
          tag: {
            color: "#e53935",
          },
          unit: {
            color: "#f76d47",
          },
          url: {
            color: "#e53935",
          },
          variable: {
            color: "#e53935",
          },
        };
        e.default = t;
      })(Ra)),
    Ra
  );
}
var za = {},
  Nl;
function w0() {
  return (
    Nl ||
      ((Nl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            padding: "1.25em 1em",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#363636",
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#363636",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#363636",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#363636",
          },
          'code[class*="language-"]::selection': {
            background: "#363636",
          },
          'pre[class*="language-"]::selection': {
            background: "#363636",
          },
          'code[class*="language-"] ::selection': {
            background: "#363636",
          },
          'pre[class*="language-"] ::selection': {
            background: "#363636",
          },
          ':not(pre) > code[class*="language-"]': {
            whiteSpace: "normal",
            borderRadius: "0.2em",
            padding: "0.1em",
          },
          ".language-css > code": {
            color: "#fd9170",
          },
          ".language-sass > code": {
            color: "#fd9170",
          },
          ".language-scss > code": {
            color: "#fd9170",
          },
          '[class*="language-"] .namespace': {
            Opacity: "0.7",
          },
          atrule: {
            color: "#c792ea",
          },
          "attr-name": {
            color: "#ffcb6b",
          },
          "attr-value": {
            color: "#c3e88d",
          },
          attribute: {
            color: "#c3e88d",
          },
          boolean: {
            color: "#c792ea",
          },
          builtin: {
            color: "#ffcb6b",
          },
          cdata: {
            color: "#80cbc4",
          },
          char: {
            color: "#80cbc4",
          },
          class: {
            color: "#ffcb6b",
          },
          "class-name": {
            color: "#f2ff00",
          },
          color: {
            color: "#f2ff00",
          },
          comment: {
            color: "#546e7a",
          },
          constant: {
            color: "#c792ea",
          },
          deleted: {
            color: "#f07178",
          },
          doctype: {
            color: "#546e7a",
          },
          entity: {
            color: "#f07178",
          },
          function: {
            color: "#c792ea",
          },
          hexcode: {
            color: "#f2ff00",
          },
          id: {
            color: "#c792ea",
            fontWeight: "bold",
          },
          important: {
            color: "#c792ea",
            fontWeight: "bold",
          },
          inserted: {
            color: "#80cbc4",
          },
          keyword: {
            color: "#c792ea",
            fontStyle: "italic",
          },
          number: {
            color: "#fd9170",
          },
          operator: {
            color: "#89ddff",
          },
          prolog: {
            color: "#546e7a",
          },
          property: {
            color: "#80cbc4",
          },
          "pseudo-class": {
            color: "#c3e88d",
          },
          "pseudo-element": {
            color: "#c3e88d",
          },
          punctuation: {
            color: "#89ddff",
          },
          regex: {
            color: "#f2ff00",
          },
          selector: {
            color: "#f07178",
          },
          string: {
            color: "#c3e88d",
          },
          symbol: {
            color: "#c792ea",
          },
          tag: {
            color: "#f07178",
          },
          unit: {
            color: "#f07178",
          },
          url: {
            color: "#fd9170",
          },
          variable: {
            color: "#f07178",
          },
        };
        e.default = t;
      })(za)),
    za
  );
}
var Ia = {},
  Dl;
function x0() {
  return (
    Dl ||
      ((Dl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#d6deeb",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
          },
          'pre[class*="language-"]': {
            color: "white",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
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
            background: "#011627",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          ':not(pre) > code[class*="language-"]': {
            color: "white",
            background: "#011627",
            padding: "0.1em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "rgb(99, 119, 119)",
            fontStyle: "italic",
          },
          prolog: {
            color: "rgb(99, 119, 119)",
            fontStyle: "italic",
          },
          cdata: {
            color: "rgb(99, 119, 119)",
            fontStyle: "italic",
          },
          punctuation: {
            color: "rgb(199, 146, 234)",
          },
          ".namespace": {
            color: "rgb(178, 204, 214)",
          },
          deleted: {
            color: "rgba(239, 83, 80, 0.56)",
            fontStyle: "italic",
          },
          symbol: {
            color: "rgb(128, 203, 196)",
          },
          property: {
            color: "rgb(128, 203, 196)",
          },
          tag: {
            color: "rgb(127, 219, 202)",
          },
          operator: {
            color: "rgb(127, 219, 202)",
          },
          keyword: {
            color: "rgb(127, 219, 202)",
          },
          boolean: {
            color: "rgb(255, 88, 116)",
          },
          number: {
            color: "rgb(247, 140, 108)",
          },
          constant: {
            color: "rgb(130, 170, 255)",
          },
          function: {
            color: "rgb(130, 170, 255)",
          },
          builtin: {
            color: "rgb(130, 170, 255)",
          },
          char: {
            color: "rgb(130, 170, 255)",
          },
          selector: {
            color: "rgb(199, 146, 234)",
            fontStyle: "italic",
          },
          doctype: {
            color: "rgb(199, 146, 234)",
            fontStyle: "italic",
          },
          "attr-name": {
            color: "rgb(173, 219, 103)",
            fontStyle: "italic",
          },
          inserted: {
            color: "rgb(173, 219, 103)",
            fontStyle: "italic",
          },
          string: {
            color: "rgb(173, 219, 103)",
          },
          url: {
            color: "rgb(173, 219, 103)",
          },
          entity: {
            color: "rgb(173, 219, 103)",
          },
          ".language-css .token.string": {
            color: "rgb(173, 219, 103)",
          },
          ".style .token.string": {
            color: "rgb(173, 219, 103)",
          },
          "class-name": {
            color: "rgb(255, 203, 139)",
          },
          atrule: {
            color: "rgb(255, 203, 139)",
          },
          "attr-value": {
            color: "rgb(255, 203, 139)",
          },
          regex: {
            color: "rgb(214, 222, 235)",
          },
          important: {
            color: "rgb(214, 222, 235)",
            fontWeight: "bold",
          },
          variable: {
            color: "rgb(214, 222, 235)",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(Ia)),
    Ia
  );
}
var La = {},
  Rl;
function S0() {
  return (
    Rl ||
      ((Rl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            hyphens: "none",
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
            borderRadius: "0.3em",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#2E3440",
            padding: ".1em",
            borderRadius: ".3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#636f88",
          },
          prolog: {
            color: "#636f88",
          },
          doctype: {
            color: "#636f88",
          },
          cdata: {
            color: "#636f88",
          },
          punctuation: {
            color: "#81A1C1",
          },
          ".namespace": {
            Opacity: ".7",
          },
          property: {
            color: "#81A1C1",
          },
          tag: {
            color: "#81A1C1",
          },
          constant: {
            color: "#81A1C1",
          },
          symbol: {
            color: "#81A1C1",
          },
          deleted: {
            color: "#81A1C1",
          },
          number: {
            color: "#B48EAD",
          },
          boolean: {
            color: "#81A1C1",
          },
          selector: {
            color: "#A3BE8C",
          },
          "attr-name": {
            color: "#A3BE8C",
          },
          string: {
            color: "#A3BE8C",
          },
          char: {
            color: "#A3BE8C",
          },
          builtin: {
            color: "#A3BE8C",
          },
          inserted: {
            color: "#A3BE8C",
          },
          operator: {
            color: "#81A1C1",
          },
          entity: {
            color: "#81A1C1",
            cursor: "help",
          },
          url: {
            color: "#81A1C1",
          },
          ".language-css .token.string": {
            color: "#81A1C1",
          },
          ".style .token.string": {
            color: "#81A1C1",
          },
          variable: {
            color: "#81A1C1",
          },
          atrule: {
            color: "#88C0D0",
          },
          "attr-value": {
            color: "#88C0D0",
          },
          function: {
            color: "#88C0D0",
          },
          "class-name": {
            color: "#88C0D0",
          },
          keyword: {
            color: "#81A1C1",
          },
          regex: {
            color: "#EBCB8B",
          },
          important: {
            color: "#EBCB8B",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(La)),
    La
  );
}
var Pa = {},
  zl;
function C0() {
  return (
    zl ||
      ((zl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            background: "hsl(220, 13%, 18%)",
            color: "hsl(220, 14%, 71%)",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
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
          },
          'pre[class*="language-"]': {
            background: "hsl(220, 13%, 18%)",
            color: "hsl(220, 14%, 71%)",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
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
            borderRadius: "0.3em",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "hsl(220, 13%, 28%)",
            color: "inherit",
            textShadow: "none",
          },
          'code[class*="language-"] *::-moz-selection': {
            background: "hsl(220, 13%, 28%)",
            color: "inherit",
            textShadow: "none",
          },
          'pre[class*="language-"] *::-moz-selection': {
            background: "hsl(220, 13%, 28%)",
            color: "inherit",
            textShadow: "none",
          },
          'code[class*="language-"]::selection': {
            background: "hsl(220, 13%, 28%)",
            color: "inherit",
            textShadow: "none",
          },
          'code[class*="language-"] *::selection': {
            background: "hsl(220, 13%, 28%)",
            color: "inherit",
            textShadow: "none",
          },
          'pre[class*="language-"] *::selection': {
            background: "hsl(220, 13%, 28%)",
            color: "inherit",
            textShadow: "none",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: "0.2em 0.3em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "hsl(220, 10%, 40%)",
            fontStyle: "italic",
          },
          prolog: {
            color: "hsl(220, 10%, 40%)",
          },
          cdata: {
            color: "hsl(220, 10%, 40%)",
          },
          doctype: {
            color: "hsl(220, 14%, 71%)",
          },
          punctuation: {
            color: "hsl(220, 14%, 71%)",
          },
          entity: {
            color: "hsl(220, 14%, 71%)",
            cursor: "help",
          },
          "attr-name": {
            color: "hsl(29, 54%, 61%)",
          },
          "class-name": {
            color: "hsl(29, 54%, 61%)",
          },
          boolean: {
            color: "hsl(29, 54%, 61%)",
          },
          constant: {
            color: "hsl(29, 54%, 61%)",
          },
          number: {
            color: "hsl(29, 54%, 61%)",
          },
          atrule: {
            color: "hsl(29, 54%, 61%)",
          },
          keyword: {
            color: "hsl(286, 60%, 67%)",
          },
          property: {
            color: "hsl(355, 65%, 65%)",
          },
          tag: {
            color: "hsl(355, 65%, 65%)",
          },
          symbol: {
            color: "hsl(355, 65%, 65%)",
          },
          deleted: {
            color: "hsl(355, 65%, 65%)",
          },
          important: {
            color: "hsl(355, 65%, 65%)",
          },
          selector: {
            color: "hsl(95, 38%, 62%)",
          },
          string: {
            color: "hsl(95, 38%, 62%)",
          },
          char: {
            color: "hsl(95, 38%, 62%)",
          },
          builtin: {
            color: "hsl(95, 38%, 62%)",
          },
          inserted: {
            color: "hsl(95, 38%, 62%)",
          },
          regex: {
            color: "hsl(95, 38%, 62%)",
          },
          "attr-value": {
            color: "hsl(95, 38%, 62%)",
          },
          "attr-value > .token.punctuation": {
            color: "hsl(95, 38%, 62%)",
          },
          variable: {
            color: "hsl(207, 82%, 66%)",
          },
          operator: {
            color: "hsl(207, 82%, 66%)",
          },
          function: {
            color: "hsl(207, 82%, 66%)",
          },
          url: {
            color: "hsl(187, 47%, 55%)",
          },
          "attr-value > .token.punctuation.attr-equals": {
            color: "hsl(220, 14%, 71%)",
          },
          "special-attr > .token.attr-value > .token.value.css": {
            color: "hsl(220, 14%, 71%)",
          },
          ".language-css .token.selector": {
            color: "hsl(355, 65%, 65%)",
          },
          ".language-css .token.property": {
            color: "hsl(220, 14%, 71%)",
          },
          ".language-css .token.function": {
            color: "hsl(187, 47%, 55%)",
          },
          ".language-css .token.url > .token.function": {
            color: "hsl(187, 47%, 55%)",
          },
          ".language-css .token.url > .token.string.url": {
            color: "hsl(95, 38%, 62%)",
          },
          ".language-css .token.important": {
            color: "hsl(286, 60%, 67%)",
          },
          ".language-css .token.atrule .token.rule": {
            color: "hsl(286, 60%, 67%)",
          },
          ".language-javascript .token.operator": {
            color: "hsl(286, 60%, 67%)",
          },
          ".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation":
            {
              color: "hsl(5, 48%, 51%)",
            },
          ".language-json .token.operator": {
            color: "hsl(220, 14%, 71%)",
          },
          ".language-json .token.null.keyword": {
            color: "hsl(29, 54%, 61%)",
          },
          ".language-markdown .token.url": {
            color: "hsl(220, 14%, 71%)",
          },
          ".language-markdown .token.url > .token.operator": {
            color: "hsl(220, 14%, 71%)",
          },
          ".language-markdown .token.url-reference.url > .token.string": {
            color: "hsl(220, 14%, 71%)",
          },
          ".language-markdown .token.url > .token.content": {
            color: "hsl(207, 82%, 66%)",
          },
          ".language-markdown .token.url > .token.url": {
            color: "hsl(187, 47%, 55%)",
          },
          ".language-markdown .token.url-reference.url": {
            color: "hsl(187, 47%, 55%)",
          },
          ".language-markdown .token.blockquote.punctuation": {
            color: "hsl(220, 10%, 40%)",
            fontStyle: "italic",
          },
          ".language-markdown .token.hr.punctuation": {
            color: "hsl(220, 10%, 40%)",
            fontStyle: "italic",
          },
          ".language-markdown .token.code-snippet": {
            color: "hsl(95, 38%, 62%)",
          },
          ".language-markdown .token.bold .token.content": {
            color: "hsl(29, 54%, 61%)",
          },
          ".language-markdown .token.italic .token.content": {
            color: "hsl(286, 60%, 67%)",
          },
          ".language-markdown .token.strike .token.content": {
            color: "hsl(355, 65%, 65%)",
          },
          ".language-markdown .token.strike .token.punctuation": {
            color: "hsl(355, 65%, 65%)",
          },
          ".language-markdown .token.list.punctuation": {
            color: "hsl(355, 65%, 65%)",
          },
          ".language-markdown .token.title.important > .token.punctuation": {
            color: "hsl(355, 65%, 65%)",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          namespace: {
            Opacity: "0.8",
          },
          "token.tab:not(:empty):before": {
            color: "hsla(220, 14%, 71%, 0.15)",
            textShadow: "none",
          },
          "token.cr:before": {
            color: "hsla(220, 14%, 71%, 0.15)",
            textShadow: "none",
          },
          "token.lf:before": {
            color: "hsla(220, 14%, 71%, 0.15)",
            textShadow: "none",
          },
          "token.space:before": {
            color: "hsla(220, 14%, 71%, 0.15)",
            textShadow: "none",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item": {
            marginRight: "0.4em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
            background: "hsl(220, 13%, 26%)",
            color: "hsl(220, 9%, 55%)",
            padding: "0.1em 0.4em",
            borderRadius: "0.3em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
            background: "hsl(220, 13%, 26%)",
            color: "hsl(220, 9%, 55%)",
            padding: "0.1em 0.4em",
            borderRadius: "0.3em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
            background: "hsl(220, 13%, 26%)",
            color: "hsl(220, 9%, 55%)",
            padding: "0.1em 0.4em",
            borderRadius: "0.3em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":
            {
              background: "hsl(220, 13%, 28%)",
              color: "hsl(220, 14%, 71%)",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":
            {
              background: "hsl(220, 13%, 28%)",
              color: "hsl(220, 14%, 71%)",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
            background: "hsl(220, 13%, 28%)",
            color: "hsl(220, 14%, 71%)",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
            background: "hsl(220, 13%, 28%)",
            color: "hsl(220, 14%, 71%)",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
            background: "hsl(220, 13%, 28%)",
            color: "hsl(220, 14%, 71%)",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
            background: "hsl(220, 13%, 28%)",
            color: "hsl(220, 14%, 71%)",
          },
          ".line-highlight.line-highlight": {
            background: "hsla(220, 100%, 80%, 0.04)",
          },
          ".line-highlight.line-highlight:before": {
            background: "hsl(220, 13%, 26%)",
            color: "hsl(220, 14%, 71%)",
            padding: "0.1em 0.6em",
            borderRadius: "0.3em",
            boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            background: "hsl(220, 13%, 26%)",
            color: "hsl(220, 14%, 71%)",
            padding: "0.1em 0.6em",
            borderRadius: "0.3em",
            boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)",
          },
          "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":
            {
              backgroundColor: "hsla(220, 100%, 80%, 0.04)",
            },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "hsla(220, 14%, 71%, 0.15)",
          },
          ".command-line .command-line-prompt": {
            borderRightColor: "hsla(220, 14%, 71%, 0.15)",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "hsl(220, 14%, 45%)",
          },
          ".command-line .command-line-prompt > span:before": {
            color: "hsl(220, 14%, 45%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-1": {
            color: "hsl(355, 65%, 65%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-5": {
            color: "hsl(355, 65%, 65%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-9": {
            color: "hsl(355, 65%, 65%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-2": {
            color: "hsl(95, 38%, 62%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-6": {
            color: "hsl(95, 38%, 62%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-10": {
            color: "hsl(95, 38%, 62%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-3": {
            color: "hsl(207, 82%, 66%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-7": {
            color: "hsl(207, 82%, 66%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-11": {
            color: "hsl(207, 82%, 66%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-4": {
            color: "hsl(286, 60%, 67%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-8": {
            color: "hsl(286, 60%, 67%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-12": {
            color: "hsl(286, 60%, 67%)",
          },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
            backgroundColor: "hsla(353, 100%, 66%, 0.15)",
          },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
            backgroundColor: "hsla(353, 100%, 66%, 0.15)",
          },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
            backgroundColor: "hsla(137, 100%, 55%, 0.15)",
          },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
            backgroundColor: "hsla(137, 100%, 55%, 0.15)",
          },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          ".prism-previewer.prism-previewer:before": {
            borderColor: "hsl(224, 13%, 17%)",
          },
          ".prism-previewer-gradient.prism-previewer-gradient div": {
            borderColor: "hsl(224, 13%, 17%)",
            borderRadius: "0.3em",
          },
          ".prism-previewer-color.prism-previewer-color:before": {
            borderRadius: "0.3em",
          },
          ".prism-previewer-easing.prism-previewer-easing:before": {
            borderRadius: "0.3em",
          },
          ".prism-previewer.prism-previewer:after": {
            borderTopColor: "hsl(224, 13%, 17%)",
          },
          ".prism-previewer-flipped.prism-previewer-flipped.after": {
            borderBottomColor: "hsl(224, 13%, 17%)",
          },
          ".prism-previewer-angle.prism-previewer-angle:before": {
            background: "hsl(219, 13%, 22%)",
          },
          ".prism-previewer-time.prism-previewer-time:before": {
            background: "hsl(219, 13%, 22%)",
          },
          ".prism-previewer-easing.prism-previewer-easing": {
            background: "hsl(219, 13%, 22%)",
          },
          ".prism-previewer-angle.prism-previewer-angle circle": {
            stroke: "hsl(220, 14%, 71%)",
            strokeOpacity: "1",
          },
          ".prism-previewer-time.prism-previewer-time circle": {
            stroke: "hsl(220, 14%, 71%)",
            strokeOpacity: "1",
          },
          ".prism-previewer-easing.prism-previewer-easing circle": {
            stroke: "hsl(220, 14%, 71%)",
            fill: "transparent",
          },
          ".prism-previewer-easing.prism-previewer-easing path": {
            stroke: "hsl(220, 14%, 71%)",
          },
          ".prism-previewer-easing.prism-previewer-easing line": {
            stroke: "hsl(220, 14%, 71%)",
          },
        };
        e.default = t;
      })(Pa)),
    Pa
  );
}
var Ha = {},
  Il;
function E0() {
  return (
    Il ||
      ((Il = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            background: "hsl(230, 1%, 98%)",
            color: "hsl(230, 8%, 24%)",
            fontFamily:
              '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
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
          },
          'pre[class*="language-"]': {
            background: "hsl(230, 1%, 98%)",
            color: "hsl(230, 8%, 24%)",
            fontFamily:
              '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
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
            borderRadius: "0.3em",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "hsl(230, 1%, 90%)",
            color: "inherit",
          },
          'code[class*="language-"] *::-moz-selection': {
            background: "hsl(230, 1%, 90%)",
            color: "inherit",
          },
          'pre[class*="language-"] *::-moz-selection': {
            background: "hsl(230, 1%, 90%)",
            color: "inherit",
          },
          'code[class*="language-"]::selection': {
            background: "hsl(230, 1%, 90%)",
            color: "inherit",
          },
          'code[class*="language-"] *::selection': {
            background: "hsl(230, 1%, 90%)",
            color: "inherit",
          },
          'pre[class*="language-"] *::selection': {
            background: "hsl(230, 1%, 90%)",
            color: "inherit",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: "0.2em 0.3em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "hsl(230, 4%, 64%)",
            fontStyle: "italic",
          },
          prolog: {
            color: "hsl(230, 4%, 64%)",
          },
          cdata: {
            color: "hsl(230, 4%, 64%)",
          },
          doctype: {
            color: "hsl(230, 8%, 24%)",
          },
          punctuation: {
            color: "hsl(230, 8%, 24%)",
          },
          entity: {
            color: "hsl(230, 8%, 24%)",
            cursor: "help",
          },
          "attr-name": {
            color: "hsl(35, 99%, 36%)",
          },
          "class-name": {
            color: "hsl(35, 99%, 36%)",
          },
          boolean: {
            color: "hsl(35, 99%, 36%)",
          },
          constant: {
            color: "hsl(35, 99%, 36%)",
          },
          number: {
            color: "hsl(35, 99%, 36%)",
          },
          atrule: {
            color: "hsl(35, 99%, 36%)",
          },
          keyword: {
            color: "hsl(301, 63%, 40%)",
          },
          property: {
            color: "hsl(5, 74%, 59%)",
          },
          tag: {
            color: "hsl(5, 74%, 59%)",
          },
          symbol: {
            color: "hsl(5, 74%, 59%)",
          },
          deleted: {
            color: "hsl(5, 74%, 59%)",
          },
          important: {
            color: "hsl(5, 74%, 59%)",
          },
          selector: {
            color: "hsl(119, 34%, 47%)",
          },
          string: {
            color: "hsl(119, 34%, 47%)",
          },
          char: {
            color: "hsl(119, 34%, 47%)",
          },
          builtin: {
            color: "hsl(119, 34%, 47%)",
          },
          inserted: {
            color: "hsl(119, 34%, 47%)",
          },
          regex: {
            color: "hsl(119, 34%, 47%)",
          },
          "attr-value": {
            color: "hsl(119, 34%, 47%)",
          },
          "attr-value > .token.punctuation": {
            color: "hsl(119, 34%, 47%)",
          },
          variable: {
            color: "hsl(221, 87%, 60%)",
          },
          operator: {
            color: "hsl(221, 87%, 60%)",
          },
          function: {
            color: "hsl(221, 87%, 60%)",
          },
          url: {
            color: "hsl(198, 99%, 37%)",
          },
          "attr-value > .token.punctuation.attr-equals": {
            color: "hsl(230, 8%, 24%)",
          },
          "special-attr > .token.attr-value > .token.value.css": {
            color: "hsl(230, 8%, 24%)",
          },
          ".language-css .token.selector": {
            color: "hsl(5, 74%, 59%)",
          },
          ".language-css .token.property": {
            color: "hsl(230, 8%, 24%)",
          },
          ".language-css .token.function": {
            color: "hsl(198, 99%, 37%)",
          },
          ".language-css .token.url > .token.function": {
            color: "hsl(198, 99%, 37%)",
          },
          ".language-css .token.url > .token.string.url": {
            color: "hsl(119, 34%, 47%)",
          },
          ".language-css .token.important": {
            color: "hsl(301, 63%, 40%)",
          },
          ".language-css .token.atrule .token.rule": {
            color: "hsl(301, 63%, 40%)",
          },
          ".language-javascript .token.operator": {
            color: "hsl(301, 63%, 40%)",
          },
          ".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation":
            {
              color: "hsl(344, 84%, 43%)",
            },
          ".language-json .token.operator": {
            color: "hsl(230, 8%, 24%)",
          },
          ".language-json .token.null.keyword": {
            color: "hsl(35, 99%, 36%)",
          },
          ".language-markdown .token.url": {
            color: "hsl(230, 8%, 24%)",
          },
          ".language-markdown .token.url > .token.operator": {
            color: "hsl(230, 8%, 24%)",
          },
          ".language-markdown .token.url-reference.url > .token.string": {
            color: "hsl(230, 8%, 24%)",
          },
          ".language-markdown .token.url > .token.content": {
            color: "hsl(221, 87%, 60%)",
          },
          ".language-markdown .token.url > .token.url": {
            color: "hsl(198, 99%, 37%)",
          },
          ".language-markdown .token.url-reference.url": {
            color: "hsl(198, 99%, 37%)",
          },
          ".language-markdown .token.blockquote.punctuation": {
            color: "hsl(230, 4%, 64%)",
            fontStyle: "italic",
          },
          ".language-markdown .token.hr.punctuation": {
            color: "hsl(230, 4%, 64%)",
            fontStyle: "italic",
          },
          ".language-markdown .token.code-snippet": {
            color: "hsl(119, 34%, 47%)",
          },
          ".language-markdown .token.bold .token.content": {
            color: "hsl(35, 99%, 36%)",
          },
          ".language-markdown .token.italic .token.content": {
            color: "hsl(301, 63%, 40%)",
          },
          ".language-markdown .token.strike .token.content": {
            color: "hsl(5, 74%, 59%)",
          },
          ".language-markdown .token.strike .token.punctuation": {
            color: "hsl(5, 74%, 59%)",
          },
          ".language-markdown .token.list.punctuation": {
            color: "hsl(5, 74%, 59%)",
          },
          ".language-markdown .token.title.important > .token.punctuation": {
            color: "hsl(5, 74%, 59%)",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          namespace: {
            Opacity: "0.8",
          },
          "token.tab:not(:empty):before": {
            color: "hsla(230, 8%, 24%, 0.2)",
          },
          "token.cr:before": {
            color: "hsla(230, 8%, 24%, 0.2)",
          },
          "token.lf:before": {
            color: "hsla(230, 8%, 24%, 0.2)",
          },
          "token.space:before": {
            color: "hsla(230, 8%, 24%, 0.2)",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item": {
            marginRight: "0.4em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
            background: "hsl(230, 1%, 90%)",
            color: "hsl(230, 6%, 44%)",
            padding: "0.1em 0.4em",
            borderRadius: "0.3em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
            background: "hsl(230, 1%, 90%)",
            color: "hsl(230, 6%, 44%)",
            padding: "0.1em 0.4em",
            borderRadius: "0.3em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
            background: "hsl(230, 1%, 90%)",
            color: "hsl(230, 6%, 44%)",
            padding: "0.1em 0.4em",
            borderRadius: "0.3em",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":
            {
              background: "hsl(230, 1%, 78%)",
              color: "hsl(230, 8%, 24%)",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":
            {
              background: "hsl(230, 1%, 78%)",
              color: "hsl(230, 8%, 24%)",
            },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
            background: "hsl(230, 1%, 78%)",
            color: "hsl(230, 8%, 24%)",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
            background: "hsl(230, 1%, 78%)",
            color: "hsl(230, 8%, 24%)",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
            background: "hsl(230, 1%, 78%)",
            color: "hsl(230, 8%, 24%)",
          },
          "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
            background: "hsl(230, 1%, 78%)",
            color: "hsl(230, 8%, 24%)",
          },
          ".line-highlight.line-highlight": {
            background: "hsla(230, 8%, 24%, 0.05)",
          },
          ".line-highlight.line-highlight:before": {
            background: "hsl(230, 1%, 90%)",
            color: "hsl(230, 8%, 24%)",
            padding: "0.1em 0.6em",
            borderRadius: "0.3em",
            boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            background: "hsl(230, 1%, 90%)",
            color: "hsl(230, 8%, 24%)",
            padding: "0.1em 0.6em",
            borderRadius: "0.3em",
            boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)",
          },
          "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":
            {
              backgroundColor: "hsla(230, 8%, 24%, 0.05)",
            },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "hsla(230, 8%, 24%, 0.2)",
          },
          ".command-line .command-line-prompt": {
            borderRightColor: "hsla(230, 8%, 24%, 0.2)",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "hsl(230, 1%, 62%)",
          },
          ".command-line .command-line-prompt > span:before": {
            color: "hsl(230, 1%, 62%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-1": {
            color: "hsl(5, 74%, 59%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-5": {
            color: "hsl(5, 74%, 59%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-9": {
            color: "hsl(5, 74%, 59%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-2": {
            color: "hsl(119, 34%, 47%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-6": {
            color: "hsl(119, 34%, 47%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-10": {
            color: "hsl(119, 34%, 47%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-3": {
            color: "hsl(221, 87%, 60%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-7": {
            color: "hsl(221, 87%, 60%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-11": {
            color: "hsl(221, 87%, 60%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-4": {
            color: "hsl(301, 63%, 40%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-8": {
            color: "hsl(301, 63%, 40%)",
          },
          ".rainbow-braces .token.token.punctuation.brace-level-12": {
            color: "hsl(301, 63%, 40%)",
          },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
            backgroundColor: "hsla(353, 100%, 66%, 0.15)",
          },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
            backgroundColor: "hsla(353, 100%, 66%, 0.15)",
          },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(353, 95%, 66%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
            backgroundColor: "hsla(137, 100%, 55%, 0.15)",
          },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
            backgroundColor: "hsla(137, 100%, 55%, 0.15)",
          },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection":
            {
              backgroundColor: "hsla(135, 73%, 55%, 0.25)",
            },
          ".prism-previewer.prism-previewer:before": {
            borderColor: "hsl(0, 0, 95%)",
          },
          ".prism-previewer-gradient.prism-previewer-gradient div": {
            borderColor: "hsl(0, 0, 95%)",
            borderRadius: "0.3em",
          },
          ".prism-previewer-color.prism-previewer-color:before": {
            borderRadius: "0.3em",
          },
          ".prism-previewer-easing.prism-previewer-easing:before": {
            borderRadius: "0.3em",
          },
          ".prism-previewer.prism-previewer:after": {
            borderTopColor: "hsl(0, 0, 95%)",
          },
          ".prism-previewer-flipped.prism-previewer-flipped.after": {
            borderBottomColor: "hsl(0, 0, 95%)",
          },
          ".prism-previewer-angle.prism-previewer-angle:before": {
            background: "hsl(0, 0%, 100%)",
          },
          ".prism-previewer-time.prism-previewer-time:before": {
            background: "hsl(0, 0%, 100%)",
          },
          ".prism-previewer-easing.prism-previewer-easing": {
            background: "hsl(0, 0%, 100%)",
          },
          ".prism-previewer-angle.prism-previewer-angle circle": {
            stroke: "hsl(230, 8%, 24%)",
            strokeOpacity: "1",
          },
          ".prism-previewer-time.prism-previewer-time circle": {
            stroke: "hsl(230, 8%, 24%)",
            strokeOpacity: "1",
          },
          ".prism-previewer-easing.prism-previewer-easing circle": {
            stroke: "hsl(230, 8%, 24%)",
            fill: "transparent",
          },
          ".prism-previewer-easing.prism-previewer-easing path": {
            stroke: "hsl(230, 8%, 24%)",
          },
          ".prism-previewer-easing.prism-previewer-easing line": {
            stroke: "hsl(230, 8%, 24%)",
          },
        };
        e.default = t;
      })(Ha)),
    Ha
  );
}
var ja = {},
  Ll;
function _0() {
  return (
    Ll ||
      ((Ll = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            textShadow: "0",
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
            background:
              "#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",
            padding: "12px",
            overflow: "auto",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          ':not(pre) > code[class*="language-"]': {
            borderRadius: "5px",
            border: "1px solid #000",
            color: "#DCCF8F",
            background:
              "#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",
            padding: "2px 6px",
          },
          namespace: {
            Opacity: ".7",
          },
          comment: {
            color: "#586e75",
            fontStyle: "italic",
          },
          prolog: {
            color: "#586e75",
            fontStyle: "italic",
          },
          doctype: {
            color: "#586e75",
            fontStyle: "italic",
          },
          cdata: {
            color: "#586e75",
            fontStyle: "italic",
          },
          number: {
            color: "#b89859",
          },
          string: {
            color: "#468966",
          },
          char: {
            color: "#468966",
          },
          builtin: {
            color: "#468966",
          },
          inserted: {
            color: "#468966",
          },
          "attr-name": {
            color: "#b89859",
          },
          operator: {
            color: "#dccf8f",
          },
          entity: {
            color: "#dccf8f",
            cursor: "help",
          },
          url: {
            color: "#dccf8f",
          },
          ".language-css .token.string": {
            color: "#dccf8f",
          },
          ".style .token.string": {
            color: "#dccf8f",
          },
          selector: {
            color: "#859900",
          },
          regex: {
            color: "#859900",
          },
          atrule: {
            color: "#cb4b16",
          },
          keyword: {
            color: "#cb4b16",
          },
          "attr-value": {
            color: "#468966",
          },
          function: {
            color: "#b58900",
          },
          variable: {
            color: "#b58900",
          },
          placeholder: {
            color: "#b58900",
          },
          property: {
            color: "#b89859",
          },
          tag: {
            color: "#ffb03b",
          },
          boolean: {
            color: "#b89859",
          },
          constant: {
            color: "#b89859",
          },
          symbol: {
            color: "#b89859",
          },
          important: {
            color: "#dc322f",
          },
          statement: {
            color: "#dc322f",
          },
          deleted: {
            color: "#dc322f",
          },
          punctuation: {
            color: "#dccf8f",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(ja)),
    ja
  );
}
var Fa = {},
  Pl;
function k0() {
  return (
    Pl ||
      ((Pl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            fontFamily:
              "'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
            fontWeight: "400",
            fontSize: "17px",
            lineHeight: "25px",
            letterSpacing: "0.5px",
            textShadow: "0 1px #222245",
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
            fontFamily:
              "'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
            fontWeight: "400",
            fontSize: "17px",
            lineHeight: "25px",
            letterSpacing: "0.5px",
            textShadow: "0 1px #222245",
            padding: "2em",
            margin: "0.5em 0",
            overflow: "auto",
            background: "#1e1e3f",
          },
          "pre[class*='language-']::-moz-selection": {
            color: "inherit",
            background: "#a599e9",
          },
          "pre[class*='language-'] ::-moz-selection": {
            color: "inherit",
            background: "#a599e9",
          },
          "code[class*='language-']::-moz-selection": {
            color: "inherit",
            background: "#a599e9",
          },
          "code[class*='language-'] ::-moz-selection": {
            color: "inherit",
            background: "#a599e9",
          },
          "pre[class*='language-']::selection": {
            color: "inherit",
            background: "#a599e9",
          },
          "pre[class*='language-'] ::selection": {
            color: "inherit",
            background: "#a599e9",
          },
          "code[class*='language-']::selection": {
            color: "inherit",
            background: "#a599e9",
          },
          "code[class*='language-'] ::selection": {
            color: "inherit",
            background: "#a599e9",
          },
          ":not(pre) > code[class*='language-']": {
            background: "#1e1e3f",
            padding: "0.1em",
            borderRadius: "0.3em",
          },
          "": {
            fontWeight: "400",
          },
          comment: {
            color: "#b362ff",
          },
          prolog: {
            color: "#b362ff",
          },
          cdata: {
            color: "#b362ff",
          },
          delimiter: {
            color: "#ff9d00",
          },
          keyword: {
            color: "#ff9d00",
          },
          selector: {
            color: "#ff9d00",
          },
          important: {
            color: "#ff9d00",
          },
          atrule: {
            color: "#ff9d00",
          },
          operator: {
            color: "rgb(255, 180, 84)",
            background: "none",
          },
          "attr-name": {
            color: "rgb(255, 180, 84)",
          },
          punctuation: {
            color: "#ffffff",
          },
          boolean: {
            color: "rgb(255, 98, 140)",
          },
          tag: {
            color: "rgb(255, 157, 0)",
          },
          "tag.punctuation": {
            color: "rgb(255, 157, 0)",
          },
          doctype: {
            color: "rgb(255, 157, 0)",
          },
          builtin: {
            color: "rgb(255, 157, 0)",
          },
          entity: {
            color: "#6897bb",
            background: "none",
          },
          symbol: {
            color: "#6897bb",
          },
          number: {
            color: "#ff628c",
          },
          property: {
            color: "#ff628c",
          },
          constant: {
            color: "#ff628c",
          },
          variable: {
            color: "#ff628c",
          },
          string: {
            color: "#a5ff90",
          },
          char: {
            color: "#a5ff90",
          },
          "attr-value": {
            color: "#a5c261",
          },
          "attr-value.punctuation": {
            color: "#a5c261",
          },
          "attr-value.punctuation:first-child": {
            color: "#a9b7c6",
          },
          url: {
            color: "#287bde",
            textDecoration: "underline",
            background: "none",
          },
          function: {
            color: "rgb(250, 208, 0)",
          },
          regex: {
            background: "#364135",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          inserted: {
            background: "#00ff00",
          },
          deleted: {
            background: "#ff000d",
          },
          "code.language-css .token.property": {
            color: "#a9b7c6",
          },
          "code.language-css .token.property + .token.punctuation": {
            color: "#a9b7c6",
          },
          "code.language-css .token.id": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.class": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.attribute": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.pseudo-class": {
            color: "#ffc66d",
          },
          "code.language-css .token.selector > .token.pseudo-element": {
            color: "#ffc66d",
          },
          "class-name": {
            color: "#fb94ff",
          },
          ".language-css .token.string": {
            background: "none",
          },
          ".style .token.string": {
            background: "none",
          },
          ".line-highlight.line-highlight": {
            marginTop: "36px",
            background:
              "linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent)",
          },
          ".line-highlight.line-highlight:before": {
            content: "''",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            content: "''",
          },
        };
        e.default = t;
      })(Fa)),
    Fa
  );
}
var Ba = {},
  Hl;
function A0() {
  return (
    Hl ||
      ((Hl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#839496",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#839496",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
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
            background: "#002b36",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#002b36",
            padding: ".1em",
            borderRadius: ".3em",
          },
          comment: {
            color: "#586e75",
          },
          prolog: {
            color: "#586e75",
          },
          doctype: {
            color: "#586e75",
          },
          cdata: {
            color: "#586e75",
          },
          punctuation: {
            color: "#93a1a1",
          },
          ".namespace": {
            Opacity: ".7",
          },
          property: {
            color: "#268bd2",
          },
          keyword: {
            color: "#268bd2",
          },
          tag: {
            color: "#268bd2",
          },
          "class-name": {
            color: "#FFFFB6",
            textDecoration: "underline",
          },
          boolean: {
            color: "#b58900",
          },
          constant: {
            color: "#b58900",
          },
          symbol: {
            color: "#dc322f",
          },
          deleted: {
            color: "#dc322f",
          },
          number: {
            color: "#859900",
          },
          selector: {
            color: "#859900",
          },
          "attr-name": {
            color: "#859900",
          },
          string: {
            color: "#859900",
          },
          char: {
            color: "#859900",
          },
          builtin: {
            color: "#859900",
          },
          inserted: {
            color: "#859900",
          },
          variable: {
            color: "#268bd2",
          },
          operator: {
            color: "#EDEDED",
          },
          function: {
            color: "#268bd2",
          },
          regex: {
            color: "#E9C062",
          },
          important: {
            color: "#fd971f",
            fontWeight: "bold",
          },
          entity: {
            color: "#FFFFB6",
            cursor: "help",
          },
          url: {
            color: "#96CBFE",
          },
          ".language-css .token.string": {
            color: "#87C38A",
          },
          ".style .token.string": {
            color: "#87C38A",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          atrule: {
            color: "#F9EE98",
          },
          "attr-value": {
            color: "#F9EE98",
          },
        };
        e.default = t;
      })(Ba)),
    Ba
  );
}
var $a = {},
  jl;
function M0() {
  return (
    jl ||
      ((jl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#f92aad",
            textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
          },
          'pre[class*="language-"]': {
            color: "#f92aad",
            textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
            background: "none",
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
            backgroundImage: "linear-gradient(to bottom, #2a2139 75%, #34294f)",
          },
          ':not(pre) > code[class*="language-"]': {
            backgroundColor: "transparent !important",
            backgroundImage: "linear-gradient(to bottom, #2a2139 75%, #34294f)",
            padding: ".1em",
            borderRadius: ".3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#8e8e8e",
          },
          "block-comment": {
            color: "#8e8e8e",
          },
          prolog: {
            color: "#8e8e8e",
          },
          doctype: {
            color: "#8e8e8e",
          },
          cdata: {
            color: "#8e8e8e",
          },
          punctuation: {
            color: "#ccc",
          },
          tag: {
            color: "#e2777a",
          },
          "attr-name": {
            color: "#e2777a",
          },
          namespace: {
            color: "#e2777a",
          },
          number: {
            color: "#e2777a",
          },
          unit: {
            color: "#e2777a",
          },
          hexcode: {
            color: "#e2777a",
          },
          deleted: {
            color: "#e2777a",
          },
          property: {
            color: "#72f1b8",
            textShadow:
              "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475",
          },
          selector: {
            color: "#72f1b8",
            textShadow:
              "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475",
          },
          "function-name": {
            color: "#6196cc",
          },
          boolean: {
            color: "#fdfdfd",
            textShadow:
              "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975",
          },
          "selector.id": {
            color: "#fdfdfd",
            textShadow:
              "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975",
          },
          function: {
            color: "#fdfdfd",
            textShadow:
              "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975",
          },
          "class-name": {
            color: "#fff5f6",
            textShadow:
              "0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75",
          },
          constant: {
            color: "#f92aad",
            textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
          },
          symbol: {
            color: "#f92aad",
            textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
          },
          important: {
            color: "#f4eee4",
            textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
            fontWeight: "bold",
          },
          atrule: {
            color: "#f4eee4",
            textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
          },
          keyword: {
            color: "#f4eee4",
            textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
          },
          "selector.class": {
            color: "#f4eee4",
            textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
          },
          builtin: {
            color: "#f4eee4",
            textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
          },
          string: {
            color: "#f87c32",
          },
          char: {
            color: "#f87c32",
          },
          "attr-value": {
            color: "#f87c32",
          },
          regex: {
            color: "#f87c32",
          },
          variable: {
            color: "#f87c32",
          },
          operator: {
            color: "#67cdcc",
          },
          entity: {
            color: "#67cdcc",
            cursor: "help",
          },
          url: {
            color: "#67cdcc",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          inserted: {
            color: "green",
          },
        };
        e.default = t;
      })($a)),
    $a
  );
}
var Wa = {},
  Fl;
function T0() {
  return (
    Fl ||
      ((Fl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'code[class*="language-"]': {
            color: "#393A34",
            fontFamily:
              '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
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
          },
          'pre[class*="language-"]': {
            color: "#393A34",
            fontFamily:
              '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
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
            backgroundColor: "white",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          'pre[class*="language-"]::-moz-selection': {
            background: "#C1DEF1",
          },
          'pre[class*="language-"] ::-moz-selection': {
            background: "#C1DEF1",
          },
          'code[class*="language-"]::-moz-selection': {
            background: "#C1DEF1",
          },
          'code[class*="language-"] ::-moz-selection': {
            background: "#C1DEF1",
          },
          'pre[class*="language-"]::selection': {
            background: "#C1DEF1",
          },
          'pre[class*="language-"] ::selection': {
            background: "#C1DEF1",
          },
          'code[class*="language-"]::selection': {
            background: "#C1DEF1",
          },
          'code[class*="language-"] ::selection': {
            background: "#C1DEF1",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".2em",
            paddingTop: "1px",
            paddingBottom: "1px",
            background: "#f8f8f8",
            border: "1px solid #dddddd",
          },
          comment: {
            color: "#008000",
            fontStyle: "italic",
          },
          prolog: {
            color: "#008000",
            fontStyle: "italic",
          },
          doctype: {
            color: "#008000",
            fontStyle: "italic",
          },
          cdata: {
            color: "#008000",
            fontStyle: "italic",
          },
          namespace: {
            Opacity: ".7",
          },
          string: {
            color: "#A31515",
          },
          punctuation: {
            color: "#393A34",
          },
          operator: {
            color: "#393A34",
          },
          url: {
            color: "#36acaa",
          },
          symbol: {
            color: "#36acaa",
          },
          number: {
            color: "#36acaa",
          },
          boolean: {
            color: "#36acaa",
          },
          variable: {
            color: "#36acaa",
          },
          constant: {
            color: "#36acaa",
          },
          inserted: {
            color: "#36acaa",
          },
          atrule: {
            color: "#0000ff",
          },
          keyword: {
            color: "#0000ff",
          },
          "attr-value": {
            color: "#0000ff",
          },
          ".language-autohotkey .token.selector": {
            color: "#0000ff",
          },
          ".language-json .token.boolean": {
            color: "#0000ff",
          },
          ".language-json .token.number": {
            color: "#0000ff",
          },
          'code[class*="language-css"]': {
            color: "#0000ff",
          },
          function: {
            color: "#393A34",
          },
          deleted: {
            color: "#9a050f",
          },
          ".language-autohotkey .token.tag": {
            color: "#9a050f",
          },
          selector: {
            color: "#800000",
          },
          ".language-autohotkey .token.keyword": {
            color: "#00009f",
          },
          important: {
            color: "#e90",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
          "class-name": {
            color: "#2B91AF",
          },
          ".language-json .token.property": {
            color: "#2B91AF",
          },
          tag: {
            color: "#800000",
          },
          "attr-name": {
            color: "#ff0000",
          },
          property: {
            color: "#ff0000",
          },
          regex: {
            color: "#ff0000",
          },
          entity: {
            color: "#ff0000",
          },
          "directive.tag.tag": {
            background: "#ffff00",
            color: "#393A34",
          },
          ".line-numbers.line-numbers .line-numbers-rows": {
            borderRightColor: "#a5a5a5",
          },
          ".line-numbers .line-numbers-rows > span:before": {
            color: "#2B91AF",
          },
          ".line-highlight.line-highlight": {
            background:
              "linear-gradient(to right, rgba(193, 222, 241, 0.2) 70%, rgba(221, 222, 241, 0))",
          },
        };
        e.default = t;
      })(Wa)),
    Wa
  );
}
var Va = {},
  Bl;
function O0() {
  return (
    Bl ||
      ((Bl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
        var t = {
          'pre[class*="language-"]': {
            color: "#d4d4d4",
            fontSize: "13px",
            textShadow: "none",
            fontFamily:
              'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
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
            background: "#1e1e1e",
          },
          'code[class*="language-"]': {
            color: "#d4d4d4",
            fontSize: "13px",
            textShadow: "none",
            fontFamily:
              'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
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
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "#264F78",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "#264F78",
          },
          'pre[class*="language-"] *::selection': {
            textShadow: "none",
            background: "#264F78",
          },
          'code[class*="language-"] *::selection': {
            textShadow: "none",
            background: "#264F78",
          },
          ':not(pre) > code[class*="language-"]': {
            padding: ".1em .3em",
            borderRadius: ".3em",
            color: "#db4c69",
            background: "#1e1e1e",
          },
          ".namespace": {
            Opacity: ".7",
          },
          "doctype.doctype-tag": {
            color: "#569CD6",
          },
          "doctype.name": {
            color: "#9cdcfe",
          },
          comment: {
            color: "#6a9955",
          },
          prolog: {
            color: "#6a9955",
          },
          punctuation: {
            color: "#d4d4d4",
          },
          ".language-html .language-css .token.punctuation": {
            color: "#d4d4d4",
          },
          ".language-html .language-javascript .token.punctuation": {
            color: "#d4d4d4",
          },
          property: {
            color: "#9cdcfe",
          },
          tag: {
            color: "#569cd6",
          },
          boolean: {
            color: "#569cd6",
          },
          number: {
            color: "#b5cea8",
          },
          constant: {
            color: "#9cdcfe",
          },
          symbol: {
            color: "#b5cea8",
          },
          inserted: {
            color: "#b5cea8",
          },
          unit: {
            color: "#b5cea8",
          },
          selector: {
            color: "#d7ba7d",
          },
          "attr-name": {
            color: "#9cdcfe",
          },
          string: {
            color: "#ce9178",
          },
          char: {
            color: "#ce9178",
          },
          builtin: {
            color: "#ce9178",
          },
          deleted: {
            color: "#ce9178",
          },
          ".language-css .token.string.url": {
            textDecoration: "underline",
          },
          operator: {
            color: "#d4d4d4",
          },
          entity: {
            color: "#569cd6",
          },
          "operator.arrow": {
            color: "#569CD6",
          },
          atrule: {
            color: "#ce9178",
          },
          "atrule.rule": {
            color: "#c586c0",
          },
          "atrule.url": {
            color: "#9cdcfe",
          },
          "atrule.url.function": {
            color: "#dcdcaa",
          },
          "atrule.url.punctuation": {
            color: "#d4d4d4",
          },
          keyword: {
            color: "#569CD6",
          },
          "keyword.module": {
            color: "#c586c0",
          },
          "keyword.control-flow": {
            color: "#c586c0",
          },
          function: {
            color: "#dcdcaa",
          },
          "function.maybe-class-name": {
            color: "#dcdcaa",
          },
          regex: {
            color: "#d16969",
          },
          important: {
            color: "#569cd6",
          },
          italic: {
            fontStyle: "italic",
          },
          "class-name": {
            color: "#4ec9b0",
          },
          "maybe-class-name": {
            color: "#4ec9b0",
          },
          console: {
            color: "#9cdcfe",
          },
          parameter: {
            color: "#9cdcfe",
          },
          interpolation: {
            color: "#9cdcfe",
          },
          "punctuation.interpolation-punctuation": {
            color: "#569cd6",
          },
          variable: {
            color: "#9cdcfe",
          },
          "imports.maybe-class-name": {
            color: "#9cdcfe",
          },
          "exports.maybe-class-name": {
            color: "#9cdcfe",
          },
          escape: {
            color: "#d7ba7d",
          },
          "tag.punctuation": {
            color: "#808080",
          },
          cdata: {
            color: "#808080",
          },
          "attr-value": {
            color: "#ce9178",
          },
          "attr-value.punctuation": {
            color: "#ce9178",
          },
          "attr-value.punctuation.attr-equals": {
            color: "#d4d4d4",
          },
          namespace: {
            color: "#4ec9b0",
          },
          'pre[class*="language-javascript"]': {
            color: "#9cdcfe",
          },
          'code[class*="language-javascript"]': {
            color: "#9cdcfe",
          },
          'pre[class*="language-jsx"]': {
            color: "#9cdcfe",
          },
          'code[class*="language-jsx"]': {
            color: "#9cdcfe",
          },
          'pre[class*="language-typescript"]': {
            color: "#9cdcfe",
          },
          'code[class*="language-typescript"]': {
            color: "#9cdcfe",
          },
          'pre[class*="language-tsx"]': {
            color: "#9cdcfe",
          },
          'code[class*="language-tsx"]': {
            color: "#9cdcfe",
          },
          'pre[class*="language-css"]': {
            color: "#ce9178",
          },
          'code[class*="language-css"]': {
            color: "#ce9178",
          },
          'pre[class*="language-html"]': {
            color: "#d4d4d4",
          },
          'code[class*="language-html"]': {
            color: "#d4d4d4",
          },
          ".language-regex .token.anchor": {
            color: "#dcdcaa",
          },
          ".language-html .token.punctuation": {
            color: "#808080",
          },
          'pre[class*="language-"] > code[class*="language-"]': {
            position: "relative",
            zIndex: "1",
          },
          ".line-highlight.line-highlight": {
            background: "#f7ebc6",
            boxShadow: "inset 5px 0 0 #f7d87c",
            zIndex: "0",
          },
        };
        e.default = t;
      })(Va)),
    Va
  );
}
var qa = {},
  $l;
function N0() {
  return (
    $l ||
      (($l = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            textShadow: "none",
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
            position: "relative",
          },
          'pre > code[class*="language-"]': {
            fontSize: "1em",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#2a2a2a",
            padding: "0.15em 0.2em 0.05em",
            borderRadius: ".3em",
            border: "0.13em solid #7a6652",
            boxShadow: "1px 1px 0.3em -0.1em #000 inset",
          },
          'pre[class*="language-"] code': {
            whiteSpace: "pre",
            display: "block",
          },
          namespace: {
            Opacity: ".7",
          },
          comment: {
            color: "#6f705e",
          },
          prolog: {
            color: "#6f705e",
          },
          doctype: {
            color: "#6f705e",
          },
          cdata: {
            color: "#6f705e",
          },
          operator: {
            color: "#a77afe",
          },
          boolean: {
            color: "#a77afe",
          },
          number: {
            color: "#a77afe",
          },
          "attr-name": {
            color: "#e6d06c",
          },
          string: {
            color: "#e6d06c",
          },
          entity: {
            color: "#e6d06c",
            cursor: "help",
          },
          url: {
            color: "#e6d06c",
          },
          ".language-css .token.string": {
            color: "#e6d06c",
          },
          ".style .token.string": {
            color: "#e6d06c",
          },
          selector: {
            color: "#a6e22d",
          },
          inserted: {
            color: "#a6e22d",
          },
          atrule: {
            color: "#ef3b7d",
          },
          "attr-value": {
            color: "#ef3b7d",
          },
          keyword: {
            color: "#ef3b7d",
          },
          important: {
            color: "#ef3b7d",
            fontWeight: "bold",
          },
          deleted: {
            color: "#ef3b7d",
          },
          regex: {
            color: "#76d9e6",
          },
          statement: {
            color: "#76d9e6",
            fontWeight: "bold",
          },
          placeholder: {
            color: "#fff",
          },
          variable: {
            color: "#fff",
          },
          bold: {
            fontWeight: "bold",
          },
          punctuation: {
            color: "#bebec5",
          },
          italic: {
            fontStyle: "italic",
          },
          "code.language-markup": {
            color: "#f9f9f9",
          },
          "code.language-markup .token.tag": {
            color: "#ef3b7d",
          },
          "code.language-markup .token.attr-name": {
            color: "#a6e22d",
          },
          "code.language-markup .token.attr-value": {
            color: "#e6d06c",
          },
          "code.language-markup .token.style": {
            color: "#76d9e6",
          },
          "code.language-markup .token.script": {
            color: "#76d9e6",
          },
          "code.language-markup .token.script .token.keyword": {
            color: "#76d9e6",
          },
          ".line-highlight.line-highlight": {
            padding: "0",
            background: "rgba(255, 255, 255, 0.08)",
          },
          ".line-highlight.line-highlight:before": {
            padding: "0.2em 0.5em",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            color: "black",
            height: "1em",
            lineHeight: "1em",
            boxShadow: "0 1px 1px rgba(255, 255, 255, 0.7)",
          },
          ".line-highlight.line-highlight[data-end]:after": {
            padding: "0.2em 0.5em",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            color: "black",
            height: "1em",
            lineHeight: "1em",
            boxShadow: "0 1px 1px rgba(255, 255, 255, 0.7)",
          },
        };
        e.default = t;
      })(qa)),
    qa
  );
}
var Ua = {},
  Wl;
function D0() {
  return (
    Wl ||
      ((Wl = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }),
          (e.default = void 0);
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
            margin: "5px 0",
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
            overflow: "auto",
          },
          'pre[class*="language-"] *': {
            fontFamily: "monospace",
          },
          ':not(pre) > code[class*="language-"]': {
            color: "white",
            background: "#0a143c",
            padding: "0.1em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          'pre[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'pre[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"]::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"] ::-moz-selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'pre[class*="language-"]::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'pre[class*="language-"] ::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"]::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          'code[class*="language-"] ::selection': {
            textShadow: "none",
            background: "rgba(29, 59, 83, 0.99)",
          },
          comment: {
            color: "rgb(99, 119, 119)",
            fontStyle: "italic",
          },
          prolog: {
            color: "rgb(99, 119, 119)",
            fontStyle: "italic",
          },
          cdata: {
            color: "rgb(99, 119, 119)",
            fontStyle: "italic",
          },
          punctuation: {
            color: "rgb(199, 146, 234)",
          },
          ".namespace": {
            color: "rgb(178, 204, 214)",
          },
          deleted: {
            color: "rgba(239, 83, 80, 0.56)",
            fontStyle: "italic",
          },
          symbol: {
            color: "rgb(128, 203, 196)",
          },
          property: {
            color: "rgb(128, 203, 196)",
          },
          tag: {
            color: "rgb(127, 219, 202)",
          },
          operator: {
            color: "rgb(127, 219, 202)",
          },
          keyword: {
            color: "rgb(127, 219, 202)",
          },
          boolean: {
            color: "rgb(255, 88, 116)",
          },
          number: {
            color: "rgb(247, 140, 108)",
          },
          constant: {
            color: "rgb(34 183 199)",
          },
          function: {
            color: "rgb(34 183 199)",
          },
          builtin: {
            color: "rgb(34 183 199)",
          },
          char: {
            color: "rgb(34 183 199)",
          },
          selector: {
            color: "rgb(199, 146, 234)",
            fontStyle: "italic",
          },
          doctype: {
            color: "rgb(199, 146, 234)",
            fontStyle: "italic",
          },
          "attr-name": {
            color: "rgb(173, 219, 103)",
            fontStyle: "italic",
          },
          inserted: {
            color: "rgb(173, 219, 103)",
            fontStyle: "italic",
          },
          string: {
            color: "rgb(173, 219, 103)",
          },
          url: {
            color: "rgb(173, 219, 103)",
          },
          entity: {
            color: "rgb(173, 219, 103)",
          },
          ".language-css .token.string": {
            color: "rgb(173, 219, 103)",
          },
          ".style .token.string": {
            color: "rgb(173, 219, 103)",
          },
          "class-name": {
            color: "rgb(255, 203, 139)",
          },
          atrule: {
            color: "rgb(255, 203, 139)",
          },
          "attr-value": {
            color: "rgb(255, 203, 139)",
          },
          regex: {
            color: "rgb(214, 222, 235)",
          },
          important: {
            color: "rgb(214, 222, 235)",
            fontWeight: "bold",
          },
          variable: {
            color: "rgb(214, 222, 235)",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        };
        e.default = t;
      })(Ua)),
    Ua
  );
}
(function (e) {
  var t = $1;
  Object.defineProperty(e, "__esModule", {
    value: !0,
  }),
    Object.defineProperty(e, "a11yDark", {
      enumerable: !0,
      get: function () {
        return l.default;
      },
    }),
    Object.defineProperty(e, "atomDark", {
      enumerable: !0,
      get: function () {
        return d.default;
      },
    }),
    Object.defineProperty(e, "base16AteliersulphurpoolLight", {
      enumerable: !0,
      get: function () {
        return f.default;
      },
    }),
    Object.defineProperty(e, "cb", {
      enumerable: !0,
      get: function () {
        return g.default;
      },
    }),
    Object.defineProperty(e, "coldarkCold", {
      enumerable: !0,
      get: function () {
        return p.default;
      },
    }),
    Object.defineProperty(e, "coldarkDark", {
      enumerable: !0,
      get: function () {
        return h.default;
      },
    }),
    Object.defineProperty(e, "coy", {
      enumerable: !0,
      get: function () {
        return n.default;
      },
    }),
    Object.defineProperty(e, "coyWithoutShadows", {
      enumerable: !0,
      get: function () {
        return m.default;
      },
    }),
    Object.defineProperty(e, "darcula", {
      enumerable: !0,
      get: function () {
        return y.default;
      },
    }),
    Object.defineProperty(e, "dark", {
      enumerable: !0,
      get: function () {
        return o.default;
      },
    }),
    Object.defineProperty(e, "dracula", {
      enumerable: !0,
      get: function () {
        return x.default;
      },
    }),
    Object.defineProperty(e, "duotoneDark", {
      enumerable: !0,
      get: function () {
        return C.default;
      },
    }),
    Object.defineProperty(e, "duotoneEarth", {
      enumerable: !0,
      get: function () {
        return S.default;
      },
    }),
    Object.defineProperty(e, "duotoneForest", {
      enumerable: !0,
      get: function () {
        return w.default;
      },
    }),
    Object.defineProperty(e, "duotoneLight", {
      enumerable: !0,
      get: function () {
        return M.default;
      },
    }),
    Object.defineProperty(e, "duotoneSea", {
      enumerable: !0,
      get: function () {
        return O.default;
      },
    }),
    Object.defineProperty(e, "duotoneSpace", {
      enumerable: !0,
      get: function () {
        return _.default;
      },
    }),
    Object.defineProperty(e, "funky", {
      enumerable: !0,
      get: function () {
        return r.default;
      },
    }),
    Object.defineProperty(e, "ghcolors", {
      enumerable: !0,
      get: function () {
        return L.default;
      },
    }),
    Object.defineProperty(e, "gruvboxDark", {
      enumerable: !0,
      get: function () {
        return I.default;
      },
    }),
    Object.defineProperty(e, "gruvboxLight", {
      enumerable: !0,
      get: function () {
        return P.default;
      },
    }),
    Object.defineProperty(e, "holiTheme", {
      enumerable: !0,
      get: function () {
        return $.default;
      },
    }),
    Object.defineProperty(e, "hopscotch", {
      enumerable: !0,
      get: function () {
        return B.default;
      },
    }),
    Object.defineProperty(e, "lucario", {
      enumerable: !0,
      get: function () {
        return v.default;
      },
    }),
    Object.defineProperty(e, "materialDark", {
      enumerable: !0,
      get: function () {
        return k.default;
      },
    }),
    Object.defineProperty(e, "materialLight", {
      enumerable: !0,
      get: function () {
        return E.default;
      },
    }),
    Object.defineProperty(e, "materialOceanic", {
      enumerable: !0,
      get: function () {
        return N.default;
      },
    }),
    Object.defineProperty(e, "nightOwl", {
      enumerable: !0,
      get: function () {
        return z.default;
      },
    }),
    Object.defineProperty(e, "nord", {
      enumerable: !0,
      get: function () {
        return T.default;
      },
    }),
    Object.defineProperty(e, "okaidia", {
      enumerable: !0,
      get: function () {
        return a.default;
      },
    }),
    Object.defineProperty(e, "oneDark", {
      enumerable: !0,
      get: function () {
        return A.default;
      },
    }),
    Object.defineProperty(e, "oneLight", {
      enumerable: !0,
      get: function () {
        return D.default;
      },
    }),
    Object.defineProperty(e, "pojoaque", {
      enumerable: !0,
      get: function () {
        return H.default;
      },
    }),
    Object.defineProperty(e, "prism", {
      enumerable: !0,
      get: function () {
        return u.default;
      },
    }),
    Object.defineProperty(e, "shadesOfPurple", {
      enumerable: !0,
      get: function () {
        return W.default;
      },
    }),
    Object.defineProperty(e, "solarizedDarkAtom", {
      enumerable: !0,
      get: function () {
        return V.default;
      },
    }),
    Object.defineProperty(e, "solarizedlight", {
      enumerable: !0,
      get: function () {
        return i.default;
      },
    }),
    Object.defineProperty(e, "synthwave84", {
      enumerable: !0,
      get: function () {
        return Y.default;
      },
    }),
    Object.defineProperty(e, "tomorrow", {
      enumerable: !0,
      get: function () {
        return s.default;
      },
    }),
    Object.defineProperty(e, "twilight", {
      enumerable: !0,
      get: function () {
        return c.default;
      },
    }),
    Object.defineProperty(e, "vs", {
      enumerable: !0,
      get: function () {
        return Z.default;
      },
    }),
    Object.defineProperty(e, "vscDarkPlus", {
      enumerable: !0,
      get: function () {
        return X.default;
      },
    }),
    Object.defineProperty(e, "xonokai", {
      enumerable: !0,
      get: function () {
        return Q.default;
      },
    }),
    Object.defineProperty(e, "zTouch", {
      enumerable: !0,
      get: function () {
        return te.default;
      },
    });
  var n = t(W1()),
    o = t(V1()),
    r = t(q1()),
    a = t(U1()),
    i = t(Y1()),
    s = t(Z1()),
    c = t(K1()),
    u = t(X1()),
    l = t(G1()),
    d = t(Q1()),
    f = t(J1()),
    g = t(e0()),
    p = t(t0()),
    h = t(n0()),
    m = t(o0()),
    y = t(r0()),
    x = t(a0()),
    C = t(i0()),
    S = t(s0()),
    w = t(l0()),
    M = t(c0()),
    O = t(u0()),
    _ = t(d0()),
    L = t(f0()),
    I = t(g0()),
    P = t(p0()),
    $ = t(h0()),
    B = t(m0()),
    v = t(b0()),
    k = t(y0()),
    E = t(v0()),
    N = t(w0()),
    z = t(x0()),
    T = t(S0()),
    A = t(C0()),
    D = t(E0()),
    H = t(_0()),
    W = t(k0()),
    V = t(A0()),
    Y = t(M0()),
    Z = t(T0()),
    X = t(O0()),
    Q = t(N0()),
    te = t(D0());
})(nr);
const R0 = "_codeblock_tsha5_1",
  z0 = {
    codeblock: R0,
  },
  I0 = "_iconButton_eti7u_1",
  L0 = {
    iconButton: I0,
  },
  P0 = (e) =>
    /* @__PURE__ */ b.jsx($0, {
      title: e.title,
      children: /* @__PURE__ */ b.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${e.className ?? ""} ${L0.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  ns = P0,
  H0 = pt(null),
  Ya = {
    didCatch: !1,
    error: null,
  };
class j0 extends A1 {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = Ya);
  }
  static getDerivedStateFromError(t) {
    return {
      didCatch: !0,
      error: t,
    };
  }
  resetErrorBoundary() {
    const { error: t } = this.state;
    if (t !== null) {
      for (var n, o, r = arguments.length, a = new Array(r), i = 0; i < r; i++)
        a[i] = arguments[i];
      (n = (o = this.props).onReset) === null ||
        n === void 0 ||
        n.call(o, {
          args: a,
          reason: "imperative-api",
        }),
        this.setState(Ya);
    }
  }
  componentDidCatch(t, n) {
    var o, r;
    (o = (r = this.props).onError) === null || o === void 0 || o.call(r, t, n);
  }
  componentDidUpdate(t, n) {
    const { didCatch: o } = this.state,
      { resetKeys: r } = this.props;
    if (o && n.error !== null && F0(t.resetKeys, r)) {
      var a, i;
      (a = (i = this.props).onReset) === null ||
        a === void 0 ||
        a.call(i, {
          next: r,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(Ya);
    }
  }
  render() {
    const {
        children: t,
        fallbackRender: n,
        FallbackComponent: o,
        fallback: r,
      } = this.props,
      { didCatch: a, error: i } = this.state;
    let s = t;
    if (a) {
      const c = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (typeof n == "function") s = n(c);
      else if (o) s = Gs(o, c);
      else if (r === null || _u(r)) s = r;
      else throw i;
    }
    return Gs(
      H0.Provider,
      {
        value: {
          didCatch: a,
          error: i,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      s,
    );
  }
}
function F0() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, o) => !Object.is(n, t[o]));
}
const B0 = (e) => {
    const [t, n] = de(!1),
      o = () => n(!t),
      r = ae(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ b.jsxs(j0, {
      fallback: /* @__PURE__ */ b.jsx("span", {
        id: r.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ b.jsx("span", { id: r.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ b.jsx(R1, {
              isOpen: t,
              target: r.current,
              toggle: o,
              className: e.className,
              children: e.title,
            })
          : null,
      ],
    });
  },
  $0 = B0,
  W0 = "_loadingBtn_gadec_1",
  V0 = {
    loadingBtn: W0,
  },
  q0 = ({ loading: e, ...t }) =>
    /* @__PURE__ */ b.jsx(qe, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${V0.loadingBtn}`,
      children: e ? /* @__PURE__ */ b.jsx(z1, {}) : t.children,
    }),
  U0 = q0,
  Y0 = {
    vs: nr.vs,
    "vsc-dark-plus": nr.vscDarkPlus,
    solarizedLight: nr.solarizedlight,
  },
  Z0 = ({
    code: e,
    language: t,
    fileName: n,
    theme: o = "vs",
    showLineNumbers: r,
  }) =>
    /* @__PURE__ */ b.jsxs(Eo, {
      className: z0.codeblock,
      children: [
        n ? /* @__PURE__ */ b.jsx(Tu, { children: n }) : null,
        /* @__PURE__ */ b.jsx(_o, {
          children: /* @__PURE__ */ b.jsx(D1, {
            showLineNumbers: r,
            language: t,
            style: Y0[o],
            children: e,
          }),
        }),
      ],
    }),
  K0 = Z0,
  Ne = {
    get: async (e, t, n) => ({}),
    post: async (e, t, n) => ({}),
  };
var os = /* @__PURE__ */ ((e) => (
  (e.DBT_DOCS = "dbt-docs"),
  (e.DOCUMENTATION_EDITOR = "documentation-editor"),
  (e.SAAS = "saas"),
  e
))(os || {});
const X0 = () => {
  var t, n, o;
  const e =
    (o =
      (n = (t = window.location.hash) == null ? void 0 : t.split("#")[1]) ==
      null
        ? void 0
        : n.replace("!/", "")) == null
      ? void 0
      : o.split("/");
  return {
    name: e == null ? void 0 : e[1],
    resourceType: e == null ? void 0 : e[0],
  };
};
var Ru = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function (e, t) {
  (function (n, o) {
    e.exports = o();
  })(window, function () {
    return (function (n) {
      var o = {};
      function r(a) {
        if (o[a]) return o[a].exports;
        var i = (o[a] = { i: a, l: !1, exports: {} });
        return n[a].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
      }
      return (
        (r.m = n),
        (r.c = o),
        (r.d = function (a, i, s) {
          r.o(a, i) || Object.defineProperty(a, i, { enumerable: !0, get: s });
        }),
        (r.r = function (a) {
          typeof Symbol < "u" &&
            Symbol.toStringTag &&
            Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(a, "__esModule", { value: !0 });
        }),
        (r.t = function (a, i) {
          if (
            (1 & i && (a = r(a)),
            8 & i || (4 & i && typeof a == "object" && a && a.__esModule))
          )
            return a;
          var s = /* @__PURE__ */ Object.create(null);
          if (
            (r.r(s),
            Object.defineProperty(s, "default", { enumerable: !0, value: a }),
            2 & i && typeof a != "string")
          )
            for (var c in a)
              r.d(
                s,
                c,
                function (u) {
                  return a[u];
                }.bind(null, c),
              );
          return s;
        }),
        (r.n = function (a) {
          var i =
            a && a.__esModule
              ? function () {
                  return a.default;
                }
              : function () {
                  return a;
                };
          return r.d(i, "a", i), i;
        }),
        (r.o = function (a, i) {
          return Object.prototype.hasOwnProperty.call(a, i);
        }),
        (r.p = ""),
        r((r.s = 7))
      );
    })([
      function (n, o, r) {
        var a,
          i =
            (this && this.__extends) ||
            ((a = function (d, f) {
              return (a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (g, p) {
                    g.__proto__ = p;
                  }) ||
                function (g, p) {
                  for (var h in p)
                    Object.prototype.hasOwnProperty.call(p, h) && (g[h] = p[h]);
                })(d, f);
            }),
            function (d, f) {
              function g() {
                this.constructor = d;
              }
              a(d, f),
                (d.prototype =
                  f === null
                    ? Object.create(f)
                    : ((g.prototype = f.prototype), new g()));
            }),
          s =
            (this && this.__importDefault) ||
            function (d) {
              return d && d.__esModule ? d : { default: d };
            };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.eventEmitter =
            o.INTERNAL_ERROR_EVENT =
            o.UNKNOWN_IDX =
            o.ROOT_IDX =
            o.getStylesheet =
            o.getDefaultOptions =
            o.CAMEL_DATASET_SPLIT_TYPE =
            o.CAMEL_DATASET_IDENTIFIER_EXTRA =
            o.CAMEL_DATASET_IDENTIFIER =
            o.DATASET_SPLIT_TYPE =
            o.DATASET_IDENTIFIER_EXTRA =
            o.DATASET_IDENTIFIER =
            o.STYLESHEET_ID =
            o.LOCAL_STORE_KEY =
            o.ID_DIVISION =
              void 0);
        var c = s(r(10)),
          u = s(r(2));
        (o.ID_DIVISION = ";"),
          (o.LOCAL_STORE_KEY = "highlight-mengshou"),
          (o.STYLESHEET_ID = "highlight-mengshou-style"),
          (o.DATASET_IDENTIFIER = "highlight-id"),
          (o.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra"),
          (o.DATASET_SPLIT_TYPE = "highlight-split-type"),
          (o.CAMEL_DATASET_IDENTIFIER = c.default(o.DATASET_IDENTIFIER)),
          (o.CAMEL_DATASET_IDENTIFIER_EXTRA = c.default(
            o.DATASET_IDENTIFIER_EXTRA,
          )),
          (o.CAMEL_DATASET_SPLIT_TYPE = c.default(o.DATASET_SPLIT_TYPE)),
          (o.getDefaultOptions = function () {
            return {
              $root: document || document.documentElement,
              exceptSelectors: null,
              wrapTag: "span",
              verbose: !1,
              style: { className: "highlight-mengshou-wrap" },
            };
          }),
          (o.getStylesheet = function () {
            return (
              `
    .` +
              o.getDefaultOptions().style.className +
              ` {
        background: #ff9;
        cursor: pointer;
    }
    .` +
              o.getDefaultOptions().style.className +
              `.active {
        background: #ffb;
    }
`
            );
          }),
          (o.ROOT_IDX = -2),
          (o.UNKNOWN_IDX = -1),
          (o.INTERNAL_ERROR_EVENT = "error");
        var l = (function (d) {
          function f() {
            return (d !== null && d.apply(this, arguments)) || this;
          }
          return i(f, d), f;
        })(u.default);
        o.eventEmitter = new l();
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.UserInputEvent =
            o.SelectedNodeType =
            o.CreateFrom =
            o.EventType =
            o.ERROR =
            o.SplitType =
              void 0),
          (function (a) {
            (a.none = "none"),
              (a.head = "head"),
              (a.tail = "tail"),
              (a.both = "both");
          })(o.SplitType || (o.SplitType = {})),
          (function (a) {
            (a.DOM_TYPE_ERROR = "[DOM] Receive wrong node type."),
              (a.DOM_SELECTION_EMPTY =
                "[DOM] The selection contains no dom node, may be you except them."),
              (a.RANGE_INVALID =
                "[RANGE] Got invalid dom range, can't convert to a valid highlight range."),
              (a.RANGE_NODE_INVALID =
                "[RANGE] Start or end node isn't a text node, it may occur an error."),
              (a.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict."),
              (a.CACHE_SET_ERROR =
                "[CACHE] Cache.data can't be set manually, please use .save()."),
              (a.SOURCE_TYPE_ERROR =
                "[SOURCE] Object isn't a highlight source instance."),
              (a.HIGHLIGHT_RANGE_FROZEN =
                "[HIGHLIGHT_RANGE] A highlight range must be frozen before render."),
              (a.HIGHLIGHT_SOURCE_RECREATE =
                "[HIGHLIGHT_SOURCE] Recreate highlights from sources error."),
              (a.HIGHLIGHT_SOURCE_NONE_RENDER =
                "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.");
          })(o.ERROR || (o.ERROR = {})),
          (function (a) {
            (a.CREATE = "selection:create"),
              (a.REMOVE = "selection:remove"),
              (a.MODIFY = "selection:modify"),
              (a.HOVER = "selection:hover"),
              (a.HOVER_OUT = "selection:hover-out"),
              (a.CLICK = "selection:click");
          })(o.EventType || (o.EventType = {})),
          (function (a) {
            (a.STORE = "from-store"), (a.INPUT = "from-input");
          })(o.CreateFrom || (o.CreateFrom = {})),
          (function (a) {
            (a.text = "text"), (a.span = "span");
          })(o.SelectedNodeType || (o.SelectedNodeType = {})),
          (function (a) {
            (a.touchend = "touchend"),
              (a.mouseup = "mouseup"),
              (a.touchstart = "touchstart"),
              (a.click = "click"),
              (a.mouseover = "mouseover");
          })(o.UserInputEvent || (o.UserInputEvent = {}));
      },
      function (n, o, r) {
        var a =
            (this && this.__read) ||
            function (c, u) {
              var l = typeof Symbol == "function" && c[Symbol.iterator];
              if (!l) return c;
              var d,
                f,
                g = l.call(c),
                p = [];
              try {
                for (; (u === void 0 || u-- > 0) && !(d = g.next()).done; )
                  p.push(d.value);
              } catch (h) {
                f = { error: h };
              } finally {
                try {
                  d && !d.done && (l = g.return) && l.call(g);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          i =
            (this && this.__spread) ||
            function () {
              for (var c = [], u = 0; u < arguments.length; u++)
                c = c.concat(a(arguments[u]));
              return c;
            };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var s = (function () {
          function c() {
            this.handlersMap = /* @__PURE__ */ Object.create(null);
          }
          return (
            (c.prototype.on = function (u, l) {
              return (
                this.handlersMap[u] || (this.handlersMap[u] = []),
                this.handlersMap[u].push(l),
                this
              );
            }),
            (c.prototype.off = function (u, l) {
              return (
                this.handlersMap[u] &&
                  this.handlersMap[u].splice(
                    this.handlersMap[u].indexOf(l) >>> 0,
                    1,
                  ),
                this
              );
            }),
            (c.prototype.emit = function (u) {
              for (var l = [], d = 1; d < arguments.length; d++)
                l[d - 1] = arguments[d];
              return (
                this.handlersMap[u] &&
                  this.handlersMap[u].slice().forEach(function (f) {
                    f.apply(void 0, i(l));
                  }),
                this
              );
            }),
            c
          );
        })();
        o.default = s;
      },
      function (n, o, r) {
        var a =
          (this && this.__importDefault) ||
          function (u) {
            return u && u.__esModule ? u : { default: u };
          };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var i = a(r(5)),
          s = r(9),
          c = (function () {
            function u(l, d, f, g, p) {
              (this.startMeta = l),
                (this.endMeta = d),
                (this.text = f),
                (this.id = g),
                (this.__isHighlightSource = {}),
                p && (this.extra = p);
            }
            return (
              (u.prototype.deSerialize = function (l, d) {
                var f = s.queryElementNode(this, l),
                  g = f.start,
                  p = f.end,
                  h = s.getTextChildByOffset(g, this.startMeta.textOffset),
                  m = s.getTextChildByOffset(p, this.endMeta.textOffset);
                if (!d.Serialize.Restore.isEmpty()) {
                  var y = d.Serialize.Restore.call(this, h, m) || [];
                  (h = y[0] || h), (m = y[1] || m);
                }
                return new i.default(h, m, this.text, this.id, !0);
              }),
              u
            );
          })();
        o.default = c;
      },
      function (n, o, r) {
        var a =
            (this && this.__values) ||
            function (l) {
              var d = typeof Symbol == "function" && Symbol.iterator,
                f = d && l[d],
                g = 0;
              if (f) return f.call(l);
              if (l && typeof l.length == "number")
                return {
                  next: function () {
                    return (
                      l && g >= l.length && (l = void 0),
                      { value: l && l[g++], done: !l }
                    );
                  },
                };
              throw new TypeError(
                d
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          i =
            (this && this.__read) ||
            function (l, d) {
              var f = typeof Symbol == "function" && l[Symbol.iterator];
              if (!f) return l;
              var g,
                p,
                h = f.call(l),
                m = [];
              try {
                for (; (d === void 0 || d-- > 0) && !(g = h.next()).done; )
                  m.push(g.value);
              } catch (y) {
                p = { error: y };
              } finally {
                try {
                  g && !g.done && (f = h.return) && f.call(h);
                } finally {
                  if (p) throw p.error;
                }
              }
              return m;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var l = [], d = 0; d < arguments.length; d++)
                l = l.concat(i(arguments[d]));
              return l;
            };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.hasClass =
            o.removeAllClass =
            o.removeClass =
            o.addClass =
            o.addEventListener =
            o.removeEventListener =
            o.forEach =
            o.getHighlightById =
            o.getHighlightsByRoot =
            o.getExtraHighlightId =
            o.getHighlightId =
            o.isHighlightWrapNode =
              void 0);
        var c = r(0);
        o.isHighlightWrapNode = function (l) {
          return !!l.dataset && !!l.dataset[c.CAMEL_DATASET_IDENTIFIER];
        };
        var u = function (l, d) {
          for (var f = !1, g = null; l; ) {
            if ((o.isHighlightWrapNode(l) && (g = l), l === d)) {
              f = !0;
              break;
            }
            l = l.parentNode;
          }
          return f ? g : null;
        };
        (o.getHighlightId = function (l, d) {
          return (l = u(l, d)) ? l.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
        }),
          (o.getExtraHighlightId = function (l, d) {
            return (l = u(l, d))
              ? l.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA]
                  .split(c.ID_DIVISION)
                  .filter(function (f) {
                    return f;
                  })
              : [];
          }),
          (o.getHighlightsByRoot = function (l, d) {
            var f, g;
            Array.isArray(l) || (l = [l]);
            var p = [];
            try {
              for (var h = a(l), m = h.next(); !m.done; m = h.next()) {
                var y = m.value.querySelectorAll(
                  d + "[data-" + c.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, y);
              }
            } catch (x) {
              f = { error: x };
            } finally {
              try {
                m && !m.done && (g = h.return) && g.call(h);
              } finally {
                if (f) throw f.error;
              }
            }
            return p;
          }),
          (o.getHighlightById = function (l, d, f) {
            var g,
              p,
              h = [],
              m = new RegExp(
                "(" +
                  d +
                  "\\" +
                  c.ID_DIVISION +
                  "|\\" +
                  c.ID_DIVISION +
                  "?" +
                  d +
                  "$)",
              ),
              y = l.querySelectorAll(f + "[data-" + c.DATASET_IDENTIFIER + "]");
            try {
              for (var x = a(y), C = x.next(); !C.done; C = x.next()) {
                var S = C.value;
                if (S.dataset[c.CAMEL_DATASET_IDENTIFIER] !== d) {
                  var w = S.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  m.test(w) && h.push(S);
                } else h.push(S);
              }
            } catch (M) {
              g = { error: M };
            } finally {
              try {
                C && !C.done && (p = x.return) && p.call(x);
              } finally {
                if (g) throw g.error;
              }
            }
            return h;
          }),
          (o.forEach = function (l, d) {
            for (var f = 0; f < l.length; f++) d(l[f], f, l);
          }),
          (o.removeEventListener = function (l, d, f) {
            l.removeEventListener(d, f);
          }),
          (o.addEventListener = function (l, d, f) {
            return (
              l.addEventListener(d, f),
              function () {
                o.removeEventListener(l, d, f);
              }
            );
          }),
          (o.addClass = function (l, d) {
            var f;
            Array.isArray(d) || (d = [d]), (f = l.classList).add.apply(f, s(d));
          }),
          (o.removeClass = function (l, d) {
            l.classList.remove(d);
          }),
          (o.removeAllClass = function (l) {
            l.className = "";
          }),
          (o.hasClass = function (l, d) {
            return l.classList.contains(d);
          });
      },
      function (n, o, r) {
        var a =
          (this && this.__importDefault) ||
          function (g) {
            return g && g.__esModule ? g : { default: g };
          };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var i = a(r(3)),
          s = r(1),
          c = r(11),
          u = a(r(6)),
          l = r(12),
          d = r(0),
          f = (function () {
            function g(p, h, m, y, x) {
              x === void 0 && (x = !1),
                (p.$node.nodeType === 3 && h.$node.nodeType === 3) ||
                  d.eventEmitter.emit(d.INTERNAL_ERROR_EVENT, {
                    type: s.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = l.formatDomNode(p)),
                (this.end = l.formatDomNode(h)),
                (this.text = m),
                (this.frozen = x),
                (this.id = y);
            }
            return (
              (g.fromSelection = function (p) {
                var h = c.getDomRange();
                if (!h) return null;
                var m = { $node: h.startContainer, offset: h.startOffset },
                  y = { $node: h.endContainer, offset: h.endOffset },
                  x = h.toString(),
                  C = p.call(m, y, x);
                return new g(m, y, x, (C = C ?? u.default()));
              }),
              (g.prototype.serialize = function (p, h) {
                var m,
                  y = l.getDomMeta(this.start.$node, this.start.offset, p),
                  x = l.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  h.Serialize.RecordInfo.isEmpty() ||
                    (m = h.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new i.default(y, x, this.text, this.id, m)
                );
              }),
              (g.removeDomRange = c.removeSelection),
              g
            );
          })();
        o.default = f;
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = function a(i) {
            return i
              ? (i ^ ((16 * Math.random()) >> (i / 4))).toString(16)
              : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, a);
          });
      },
      function (n, o, r) {
        n.exports = r(8);
      },
      function (n, o, r) {
        var a,
          i =
            (this && this.__extends) ||
            ((a = function (w, M) {
              return (a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (O, _) {
                    O.__proto__ = _;
                  }) ||
                function (O, _) {
                  for (var L in _)
                    Object.prototype.hasOwnProperty.call(_, L) && (O[L] = _[L]);
                })(w, M);
            }),
            function (w, M) {
              function O() {
                this.constructor = w;
              }
              a(w, M),
                (w.prototype =
                  M === null
                    ? Object.create(M)
                    : ((O.prototype = M.prototype), new O()));
            }),
          s =
            (this && this.__assign) ||
            function () {
              return (s =
                Object.assign ||
                function (w) {
                  for (var M, O = 1, _ = arguments.length; O < _; O++)
                    for (var L in (M = arguments[O]))
                      Object.prototype.hasOwnProperty.call(M, L) &&
                        (w[L] = M[L]);
                  return w;
                }).apply(this, arguments);
            },
          c =
            (this && this.__importDefault) ||
            function (w) {
              return w && w.__esModule ? w : { default: w };
            };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var u = c(r(2)),
          l = c(r(5)),
          d = c(r(3)),
          f = c(r(6)),
          g = c(r(13)),
          p = c(r(14)),
          h = c(r(16)),
          m = c(r(17)),
          y = r(0),
          x = r(1),
          C = r(4),
          S = (function (w) {
            function M(O) {
              var _ = w.call(this) || this;
              (_.event = p.default()),
                (_.run = function () {
                  return C.addEventListener(
                    _.options.$root,
                    _.event.PointerEnd,
                    _._handleSelection,
                  );
                }),
                (_.stop = function () {
                  C.removeEventListener(
                    _.options.$root,
                    _.event.PointerEnd,
                    _._handleSelection,
                  );
                }),
                (_.addClass = function (I, P) {
                  _.getDoms(P).forEach(function ($) {
                    C.addClass($, I);
                  });
                }),
                (_.removeClass = function (I, P) {
                  _.getDoms(P).forEach(function ($) {
                    C.removeClass($, I);
                  });
                }),
                (_.getIdByDom = function (I) {
                  return C.getHighlightId(I, _.options.$root);
                }),
                (_.getExtraIdByDom = function (I) {
                  return C.getExtraHighlightId(I, _.options.$root);
                }),
                (_.getDoms = function (I) {
                  return I
                    ? C.getHighlightById(_.options.$root, I, _.options.wrapTag)
                    : C.getHighlightsByRoot(_.options.$root, _.options.wrapTag);
                }),
                (_.dispose = function () {
                  var I = _.options.$root;
                  C.removeEventListener(
                    I,
                    _.event.PointerOver,
                    _._handleHighlightHover,
                  ),
                    C.removeEventListener(
                      I,
                      _.event.PointerEnd,
                      _._handleSelection,
                    ),
                    C.removeEventListener(
                      I,
                      _.event.PointerTap,
                      _._handleHighlightClick,
                    ),
                    _.removeAll();
                }),
                (_.setOption = function (I) {
                  (_.options = s(s({}, _.options), I)),
                    (_.painter = new m.default(
                      {
                        $root: _.options.$root,
                        wrapTag: _.options.wrapTag,
                        className: _.options.style.className,
                        exceptSelectors: _.options.exceptSelectors,
                      },
                      _.hooks,
                    ));
                }),
                (_.fromRange = function (I) {
                  var P = { $node: I.startContainer, offset: I.startOffset },
                    $ = { $node: I.endContainer, offset: I.endOffset },
                    B = I.toString(),
                    v = _.hooks.Render.UUID.call(P, $, B);
                  v = v ?? f.default();
                  var k = new l.default(P, $, B, v);
                  return k
                    ? _._highlightFromHRange(k)
                    : (y.eventEmitter.emit(y.INTERNAL_ERROR_EVENT, {
                        type: x.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (_.fromStore = function (I, P, $, B, v) {
                  var k = new d.default(I, P, $, B, v);
                  try {
                    return _._highlightFromHSource(k), k;
                  } catch (E) {
                    return (
                      y.eventEmitter.emit(y.INTERNAL_ERROR_EVENT, {
                        type: x.ERROR.HIGHLIGHT_SOURCE_RECREATE,
                        error: E,
                        detail: k,
                      }),
                      null
                    );
                  }
                }),
                (_._getHooks = function () {
                  return {
                    Render: {
                      UUID: new g.default("Render.UUID"),
                      SelectedNodes: new g.default("Render.SelectedNodes"),
                      WrapNode: new g.default("Render.WrapNode"),
                    },
                    Serialize: {
                      Restore: new g.default("Serialize.Restore"),
                      RecordInfo: new g.default("Serialize.RecordInfo"),
                    },
                    Remove: {
                      UpdateNodes: new g.default("Remove.UpdateNodes"),
                    },
                  };
                }),
                (_._highlightFromHRange = function (I) {
                  var P = I.serialize(_.options.$root, _.hooks);
                  return _.painter.highlightRange(I).length === 0
                    ? (y.eventEmitter.emit(y.INTERNAL_ERROR_EVENT, {
                        type: x.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (_.cache.save(P),
                      _.emit(
                        x.EventType.CREATE,
                        { sources: [P], type: x.CreateFrom.INPUT },
                        _,
                      ),
                      P);
                }),
                (_._handleSelection = function () {
                  var I = l.default.fromSelection(_.hooks.Render.UUID);
                  I && (_._highlightFromHRange(I), l.default.removeDomRange());
                }),
                (_._handleHighlightHover = function (I) {
                  var P = I.target;
                  if (!C.isHighlightWrapNode(P))
                    return (
                      _._hoverId &&
                        _.emit(x.EventType.HOVER_OUT, { id: _._hoverId }, _, I),
                      void (_._hoverId = null)
                    );
                  var $ = C.getHighlightId(P, _.options.$root);
                  _._hoverId !== $ &&
                    (_._hoverId &&
                      _.emit(x.EventType.HOVER_OUT, { id: _._hoverId }, _, I),
                    (_._hoverId = $),
                    _.emit(x.EventType.HOVER, { id: _._hoverId }, _, I));
                }),
                (_._handleError = function (I) {
                  _.options.verbose && console.warn(I);
                }),
                (_._handleHighlightClick = function (I) {
                  var P = I.target;
                  if (C.isHighlightWrapNode(P)) {
                    var $ = C.getHighlightId(P, _.options.$root);
                    _.emit(x.EventType.CLICK, { id: $ }, _, I);
                  }
                }),
                (_.options = y.getDefaultOptions()),
                (_.hooks = _._getHooks()),
                _.setOption(O),
                (_.cache = new h.default());
              var L = _.options.$root;
              return (
                C.addEventListener(
                  L,
                  _.event.PointerOver,
                  _._handleHighlightHover,
                ),
                C.addEventListener(
                  L,
                  _.event.PointerTap,
                  _._handleHighlightClick,
                ),
                y.eventEmitter.on(y.INTERNAL_ERROR_EVENT, _._handleError),
                _
              );
            }
            return (
              i(M, w),
              (M.prototype.remove = function (O) {
                if (O) {
                  var _ = this.painter.removeHighlight(O);
                  this.cache.remove(O),
                    _ && this.emit(x.EventType.REMOVE, { ids: [O] }, this);
                }
              }),
              (M.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var O = this.cache.removeAll();
                this.emit(x.EventType.REMOVE, { ids: O }, this);
              }),
              (M.prototype._highlightFromHSource = function (O) {
                O === void 0 && (O = []);
                var _ = this.painter.highlightSource(O);
                this.emit(
                  x.EventType.CREATE,
                  { sources: _, type: x.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(O);
              }),
              (M.event = x.EventType),
              (M.isHighlightWrapNode = C.isHighlightWrapNode),
              (M.isHighlightSource = function (O) {
                return !!O.__isHighlightSource;
              }),
              M
            );
          })(u.default);
        o.default = S;
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.queryElementNode = o.getTextChildByOffset = void 0);
        var a = r(0);
        (o.getTextChildByOffset = function (i, s) {
          for (var c = [i], u = null, l = 0, d = 0; (u = c.pop()); ) {
            for (var f = u.childNodes, g = f.length - 1; g >= 0; g--)
              c.push(f[g]);
            if (
              u.nodeType === 3 &&
              ((d = s - l), (l += u.textContent.length) >= s)
            )
              break;
          }
          return u || (u = i), { $node: u, offset: d };
        }),
          (o.queryElementNode = function (i, s) {
            return {
              start:
                i.startMeta.parentIndex === a.ROOT_IDX
                  ? s
                  : s.getElementsByTagName(i.startMeta.parentTagName)[
                      i.startMeta.parentIndex
                    ],
              end:
                i.endMeta.parentIndex === a.ROOT_IDX
                  ? s
                  : s.getElementsByTagName(i.endMeta.parentTagName)[
                      i.endMeta.parentIndex
                    ],
            };
          });
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = function (a) {
            return a.split("-").reduce(function (i, s, c) {
              return i + (c === 0 ? s : s[0].toUpperCase() + s.slice(1));
            }, "");
          });
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.removeSelection = o.getDomRange = void 0),
          (o.getDomRange = function () {
            var a = window.getSelection();
            return a.isCollapsed
              ? (console.debug("no text selected"), null)
              : a.getRangeAt(0);
          }),
          (o.removeSelection = function () {
            window.getSelection().removeAllRanges();
          });
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.formatDomNode = o.getDomMeta = void 0);
        var a = r(0);
        (o.getDomMeta = function (i, s, c) {
          var u = (function (f) {
              if (
                f instanceof HTMLElement &&
                (!f.dataset || !f.dataset[a.CAMEL_DATASET_IDENTIFIER])
              )
                return f;
              for (
                var g = f.parentNode;
                g != null && g.dataset[a.CAMEL_DATASET_IDENTIFIER];

              )
                g = g.parentNode;
              return g;
            })(i),
            l =
              u === c
                ? a.ROOT_IDX
                : (function (f, g) {
                    for (
                      var p = f.tagName, h = g.getElementsByTagName(p), m = 0;
                      m < h.length;
                      m++
                    )
                      if (f === h[m]) return m;
                    return a.UNKNOWN_IDX;
                  })(u, c),
            d = (function (f, g) {
              for (var p = [f], h = null, m = 0; (h = p.pop()); ) {
                for (var y = h.childNodes, x = y.length - 1; x >= 0; x--)
                  p.push(y[x]);
                if (h.nodeType === 3 && h !== g) m += h.textContent.length;
                else if (h.nodeType === 3) break;
              }
              return m;
            })(u, i);
          return {
            parentTagName: u.tagName,
            parentIndex: l,
            textOffset: d + s,
          };
        }),
          (o.formatDomNode = function (i) {
            return i.$node.nodeType === 3 ||
              i.$node.nodeType === 4 ||
              i.$node.nodeType === 8
              ? i
              : { $node: i.$node.childNodes[i.offset], offset: 0 };
          });
      },
      function (n, o, r) {
        var a =
            (this && this.__read) ||
            function (c, u) {
              var l = typeof Symbol == "function" && c[Symbol.iterator];
              if (!l) return c;
              var d,
                f,
                g = l.call(c),
                p = [];
              try {
                for (; (u === void 0 || u-- > 0) && !(d = g.next()).done; )
                  p.push(d.value);
              } catch (h) {
                f = { error: h };
              } finally {
                try {
                  d && !d.done && (l = g.return) && l.call(g);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          i =
            (this && this.__spread) ||
            function () {
              for (var c = [], u = 0; u < arguments.length; u++)
                c = c.concat(a(arguments[u]));
              return c;
            };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var s = (function () {
          function c(u) {
            (this.name = ""), (this.ops = []), (this.name = u);
          }
          return (
            (c.prototype.tap = function (u) {
              var l = this;
              return (
                this.ops.indexOf(u) === -1 && this.ops.push(u),
                function () {
                  l.remove(u);
                }
              );
            }),
            (c.prototype.remove = function (u) {
              var l = this.ops.indexOf(u);
              l < 0 || this.ops.splice(l, 1);
            }),
            (c.prototype.isEmpty = function () {
              return this.ops.length === 0;
            }),
            (c.prototype.call = function () {
              for (var u, l = [], d = 0; d < arguments.length; d++)
                l[d] = arguments[d];
              return (
                this.ops.forEach(function (f) {
                  u = f.apply(void 0, i(l));
                }),
                u
              );
            }),
            c
          );
        })();
        o.default = s;
      },
      function (n, o, r) {
        var a =
          (this && this.__importDefault) ||
          function (c) {
            return c && c.__esModule ? c : { default: c };
          };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var i = r(1),
          s = a(r(15));
        o.default = function () {
          var c = s.default(window.navigator.userAgent);
          return {
            PointerEnd: c
              ? i.UserInputEvent.touchend
              : i.UserInputEvent.mouseup,
            PointerTap: c
              ? i.UserInputEvent.touchstart
              : i.UserInputEvent.click,
            PointerOver: c
              ? i.UserInputEvent.touchstart
              : i.UserInputEvent.mouseover,
          };
        };
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 });
        var a =
          /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
        o.default = function (i) {
          return a.test(i);
        };
      },
      function (n, o, r) {
        var a,
          i =
            (this && this.__extends) ||
            ((a = function (f, g) {
              return (a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (p, h) {
                    p.__proto__ = h;
                  }) ||
                function (p, h) {
                  for (var m in h)
                    Object.prototype.hasOwnProperty.call(h, m) && (p[m] = h[m]);
                })(f, g);
            }),
            function (f, g) {
              function p() {
                this.constructor = f;
              }
              a(f, g),
                (f.prototype =
                  g === null
                    ? Object.create(g)
                    : ((p.prototype = g.prototype), new p()));
            }),
          s =
            (this && this.__values) ||
            function (f) {
              var g = typeof Symbol == "function" && Symbol.iterator,
                p = g && f[g],
                h = 0;
              if (p) return p.call(f);
              if (f && typeof f.length == "number")
                return {
                  next: function () {
                    return (
                      f && h >= f.length && (f = void 0),
                      { value: f && f[h++], done: !f }
                    );
                  },
                };
              throw new TypeError(
                g
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          c =
            (this && this.__importDefault) ||
            function (f) {
              return f && f.__esModule ? f : { default: f };
            };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var u = c(r(2)),
          l = r(1),
          d = (function (f) {
            function g() {
              var p = (f !== null && f.apply(this, arguments)) || this;
              return (p._data = /* @__PURE__ */ new Map()), p;
            }
            return (
              i(g, f),
              Object.defineProperty(g.prototype, "data", {
                get: function () {
                  return this.getAll();
                },
                set: function (p) {
                  throw l.ERROR.CACHE_SET_ERROR;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (g.prototype.save = function (p) {
                var h = this;
                Array.isArray(p)
                  ? p.forEach(function (m) {
                      return h._data.set(m.id, m);
                    })
                  : this._data.set(p.id, p);
              }),
              (g.prototype.get = function (p) {
                return this._data.get(p);
              }),
              (g.prototype.remove = function (p) {
                this._data.delete(p);
              }),
              (g.prototype.getAll = function () {
                var p,
                  h,
                  m = [];
                try {
                  for (
                    var y = s(this._data), x = y.next();
                    !x.done;
                    x = y.next()
                  ) {
                    var C = x.value;
                    m.push(C[1]);
                  }
                } catch (S) {
                  p = { error: S };
                } finally {
                  try {
                    x && !x.done && (h = y.return) && h.call(y);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return m;
              }),
              (g.prototype.removeAll = function () {
                var p,
                  h,
                  m = [];
                try {
                  for (
                    var y = s(this._data), x = y.next();
                    !x.done;
                    x = y.next()
                  ) {
                    var C = x.value;
                    m.push(C[0]);
                  }
                } catch (S) {
                  p = { error: S };
                } finally {
                  try {
                    x && !x.done && (h = y.return) && h.call(y);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return (this._data = /* @__PURE__ */ new Map()), m;
              }),
              g
            );
          })(u.default);
        o.default = d;
      },
      function (n, o, r) {
        var a =
            (this && this.__values) ||
            function (m) {
              var y = typeof Symbol == "function" && Symbol.iterator,
                x = y && m[y],
                C = 0;
              if (x) return x.call(m);
              if (m && typeof m.length == "number")
                return {
                  next: function () {
                    return (
                      m && C >= m.length && (m = void 0),
                      { value: m && m[C++], done: !m }
                    );
                  },
                };
              throw new TypeError(
                y
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          i =
            (this && this.__read) ||
            function (m, y) {
              var x = typeof Symbol == "function" && m[Symbol.iterator];
              if (!x) return m;
              var C,
                S,
                w = x.call(m),
                M = [];
              try {
                for (; (y === void 0 || y-- > 0) && !(C = w.next()).done; )
                  M.push(C.value);
              } catch (O) {
                S = { error: O };
              } finally {
                try {
                  C && !C.done && (x = w.return) && x.call(w);
                } finally {
                  if (S) throw S.error;
                }
              }
              return M;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var m = [], y = 0; y < arguments.length; y++)
                m = m.concat(i(arguments[y]));
              return m;
            },
          c =
            (this && this.__importDefault) ||
            function (m) {
              return m && m.__esModule ? m : { default: m };
            };
        Object.defineProperty(o, "__esModule", { value: !0 });
        var u = c(r(3)),
          l = r(18),
          d = r(4),
          f = r(1),
          g = r(20),
          p = r(0),
          h = (function () {
            function m(y, x) {
              (this.options = {
                $root: y.$root,
                wrapTag: y.wrapTag,
                exceptSelectors: y.exceptSelectors,
                className: y.className,
              }),
                (this.hooks = x),
                g.initDefaultStylesheet();
            }
            return (
              (m.prototype.highlightRange = function (y) {
                var x = this;
                if (!y.frozen) throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var C = this.options,
                  S = C.$root,
                  w = C.className,
                  M = C.exceptSelectors,
                  O = this.hooks,
                  _ = l.getSelectedNodes(S, y.start, y.end, M);
                return (
                  O.Render.SelectedNodes.isEmpty() ||
                    (_ = O.Render.SelectedNodes.call(y.id, _) || []),
                  _.map(function (L) {
                    var I = l.wrapHighlight(L, y, w, x.options.wrapTag);
                    return (
                      O.Render.WrapNode.isEmpty() ||
                        (I = O.Render.WrapNode.call(y.id, I)),
                      I
                    );
                  })
                );
              }),
              (m.prototype.highlightSource = function (y) {
                var x = this,
                  C = Array.isArray(y) ? y : [y],
                  S = [];
                return (
                  C.forEach(function (w) {
                    if (w instanceof u.default) {
                      var M = w.deSerialize(x.options.$root, x.hooks);
                      x.highlightRange(M).length > 0
                        ? S.push(w)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: w,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: f.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  S
                );
              }),
              (m.prototype.removeHighlight = function (y) {
                var x,
                  C,
                  S = new RegExp(
                    "(" +
                      y +
                      "\\" +
                      p.ID_DIVISION +
                      "|\\" +
                      p.ID_DIVISION +
                      "?" +
                      y +
                      "$)",
                  ),
                  w = this.hooks,
                  M = this.options.wrapTag,
                  O = document.querySelectorAll(
                    M + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  _ = [],
                  L = [],
                  I = [];
                try {
                  for (var P = a(O), $ = P.next(); !$.done; $ = P.next()) {
                    var B = $.value,
                      v = B.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      k = B.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    v !== y || k
                      ? v === y
                        ? L.push(B)
                        : v !== y && S.test(k) && I.push(B)
                      : _.push(B);
                  }
                } catch (E) {
                  x = { error: E };
                } finally {
                  try {
                    $ && !$.done && (C = P.return) && C.call(P);
                  } finally {
                    if (x) throw x.error;
                  }
                }
                return (
                  _.forEach(function (E) {
                    var N = E.parentNode,
                      z = document.createDocumentFragment();
                    d.forEach(E.childNodes, function (D) {
                      return z.appendChild(D.cloneNode(!1));
                    });
                    var T = E.previousSibling,
                      A = E.nextSibling;
                    N.replaceChild(z, E),
                      l.normalizeSiblingText(T, !0),
                      l.normalizeSiblingText(A, !1),
                      w.Remove.UpdateNodes.call(y, E, "remove");
                  }),
                  L.forEach(function (E) {
                    var N = E.dataset,
                      z = N[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      T = z.shift(),
                      A = document.querySelector(
                        M + "[data-" + p.DATASET_IDENTIFIER + '="' + T + '"]',
                      );
                    A && (d.removeAllClass(E), d.addClass(E, s(A.classList))),
                      (N[p.CAMEL_DATASET_IDENTIFIER] = T),
                      (N[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = z.join(
                        p.ID_DIVISION,
                      )),
                      w.Remove.UpdateNodes.call(y, E, "id-update");
                  }),
                  I.forEach(function (E) {
                    var N = E.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (E.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = N.replace(
                      S,
                      "",
                    )),
                      w.Remove.UpdateNodes.call(y, E, "extra-update");
                  }),
                  _.length + L.length + I.length !== 0
                );
              }),
              (m.prototype.removeAllHighlight = function () {
                var y = this.options,
                  x = y.wrapTag,
                  C = y.$root;
                d.getHighlightsByRoot(C, x).forEach(function (S) {
                  var w = S.parentNode,
                    M = document.createDocumentFragment();
                  d.forEach(S.childNodes, function (O) {
                    return M.appendChild(O.cloneNode(!1));
                  }),
                    w.replaceChild(M, S);
                });
              }),
              m
            );
          })();
        o.default = h;
      },
      function (n, o, r) {
        var a =
            (this && this.__read) ||
            function (p, h) {
              var m = typeof Symbol == "function" && p[Symbol.iterator];
              if (!m) return p;
              var y,
                x,
                C = m.call(p),
                S = [];
              try {
                for (; (h === void 0 || h-- > 0) && !(y = C.next()).done; )
                  S.push(y.value);
              } catch (w) {
                x = { error: w };
              } finally {
                try {
                  y && !y.done && (m = C.return) && m.call(C);
                } finally {
                  if (x) throw x.error;
                }
              }
              return S;
            },
          i =
            (this && this.__spread) ||
            function () {
              for (var p = [], h = 0; h < arguments.length; h++)
                p = p.concat(a(arguments[h]));
              return p;
            };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.normalizeSiblingText =
            o.wrapHighlight =
            o.getSelectedNodes =
              void 0);
        var s = r(1),
          c = r(4),
          u = r(0),
          l = r(19),
          d = function (p, h) {
            if (!p) return !1;
            if (/^\./.test(h)) {
              var m = h.replace(/^\./, "");
              return p && c.hasClass(p, m);
            }
            if (/^#/.test(h)) {
              var y = h.replace(/^#/, "");
              return p && p.id === y;
            }
            var x = h.toUpperCase();
            return p && p.tagName === x;
          };
        o.getSelectedNodes = function (p, h, m, y) {
          var x = h.$node,
            C = m.$node,
            S = h.offset,
            w = m.offset;
          if (x === C && x instanceof Text)
            return (function (v, k, E, N) {
              for (
                var z = v,
                  T = function (D) {
                    return N == null
                      ? void 0
                      : N.some(function (H) {
                          return d(D, H);
                        });
                  };
                z;

              ) {
                if (z.nodeType === 1 && T(z)) return [];
                z = z.parentNode;
              }
              v.splitText(k);
              var A = v.nextSibling;
              return (
                A.splitText(E - k),
                [
                  {
                    $node: A,
                    type: s.SelectedNodeType.text,
                    splitType: s.SplitType.both,
                  },
                ]
              );
            })(x, S, w, y);
          for (
            var M = [p],
              O = [],
              _ = function (v) {
                return y == null
                  ? void 0
                  : y.some(function (k) {
                      return d(v, k);
                    });
              },
              L = !1,
              I = null;
            (I = M.pop());

          )
            if (I.nodeType !== 1 || !_(I)) {
              for (var P = I.childNodes, $ = P.length - 1; $ >= 0; $--)
                M.push(P[$]);
              if (I === x) {
                if (I.nodeType === 3) {
                  I.splitText(S);
                  var B = I.nextSibling;
                  O.push({
                    $node: B,
                    type: s.SelectedNodeType.text,
                    splitType: s.SplitType.head,
                  });
                }
                L = !0;
              } else {
                if (I === C) {
                  I.nodeType === 3 &&
                    ((B = I).splitText(w),
                    O.push({
                      $node: B,
                      type: s.SelectedNodeType.text,
                      splitType: s.SplitType.tail,
                    }));
                  break;
                }
                L &&
                  I.nodeType === 3 &&
                  O.push({
                    $node: I,
                    type: s.SelectedNodeType.text,
                    splitType: s.SplitType.none,
                  });
              }
            }
          return O;
        };
        var f = function (p, h) {
            var m = Array.isArray(h) ? h : [h];
            return (
              (m =
                m.length === 0
                  ? [u.getDefaultOptions().style.className]
                  : m).forEach(function (y) {
                c.addClass(p, y);
              }),
              p
            );
          },
          g = function (p) {
            return !p || !p.textContent;
          };
        (o.wrapHighlight = function (p, h, m, y) {
          var x = p.$node.parentNode,
            C = p.$node.previousSibling,
            S = p.$node.nextSibling;
          return c.isHighlightWrapNode(x)
            ? !c.isHighlightWrapNode(x) || (g(C) && g(S))
              ? (function (w, M, O) {
                  var _ = w.$node.parentNode,
                    L = _;
                  c.removeAllClass(L), f(L, O);
                  var I = _.dataset,
                    P = I[u.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (I[u.CAMEL_DATASET_IDENTIFIER] = M.id),
                    (I[u.CAMEL_DATASET_IDENTIFIER_EXTRA] = I[
                      u.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? P + u.ID_DIVISION + I[u.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : P),
                    L
                  );
                })(p, h, m)
              : (function (w, M, O, _) {
                  var L = document.createElement(_),
                    I = w.$node.parentNode,
                    P = w.$node.previousSibling,
                    $ = w.$node.nextSibling,
                    B = document.createDocumentFragment(),
                    v = I.dataset[u.CAMEL_DATASET_IDENTIFIER],
                    k = I.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    E = k ? v + u.ID_DIVISION + k : v;
                  L.setAttribute("data-" + u.DATASET_IDENTIFIER, M.id),
                    L.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, E),
                    L.appendChild(w.$node.cloneNode(!1));
                  var N,
                    z = !1,
                    T = !1;
                  P &&
                    (((A = I.cloneNode(!1)).textContent = P.textContent),
                    B.appendChild(A),
                    (z = !0));
                  var A,
                    D = [];
                  return (
                    Array.isArray(O) ? D.push.apply(D, i(O)) : D.push(O),
                    f(L, l.unique(D)),
                    B.appendChild(L),
                    $ &&
                      (((A = I.cloneNode(!1)).textContent = $.textContent),
                      B.appendChild(A),
                      (T = !0)),
                    (N =
                      z && T
                        ? s.SplitType.both
                        : z
                          ? s.SplitType.head
                          : T
                            ? s.SplitType.tail
                            : s.SplitType.none),
                    L.setAttribute("data-" + u.DATASET_SPLIT_TYPE, N),
                    I.parentNode.replaceChild(B, I),
                    L
                  );
                })(p, h, m, y)
            : (function (w, M, O, _) {
                var L = document.createElement(_);
                return (
                  f(L, O),
                  L.appendChild(w.$node.cloneNode(!1)),
                  w.$node.parentNode.replaceChild(L, w.$node),
                  L.setAttribute("data-" + u.DATASET_IDENTIFIER, M.id),
                  L.setAttribute("data-" + u.DATASET_SPLIT_TYPE, w.splitType),
                  L.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, ""),
                  L
                );
              })(p, h, m, y);
        }),
          (o.normalizeSiblingText = function (p, h) {
            if ((h === void 0 && (h = !0), p && p.nodeType === 3)) {
              var m = h ? p.nextSibling : p.previousSibling;
              if (m.nodeType === 3) {
                var y = m.nodeValue;
                (p.nodeValue = h ? p.nodeValue + y : y + p.nodeValue),
                  m.parentNode.removeChild(m);
              }
            }
          });
      },
      function (n, o, r) {
        var a =
          (this && this.__values) ||
          function (i) {
            var s = typeof Symbol == "function" && Symbol.iterator,
              c = s && i[s],
              u = 0;
            if (c) return c.call(i);
            if (i && typeof i.length == "number")
              return {
                next: function () {
                  return (
                    i && u >= i.length && (i = void 0),
                    { value: i && i[u++], done: !i }
                  );
                },
              };
            throw new TypeError(
              s ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.unique = void 0),
          (o.unique = function (i) {
            var s,
              c,
              u = [];
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
                if (s) throw s.error;
              }
            }
            return u;
          });
      },
      function (n, o, r) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.initDefaultStylesheet = void 0);
        var a = r(0);
        o.initDefaultStylesheet = function () {
          var i = a.STYLESHEET_ID,
            s = document.getElementById(i);
          if (!s) {
            var c = document.createTextNode(a.getStylesheet());
            ((s = document.createElement("style")).id = i),
              s.appendChild(c),
              document.head.appendChild(s);
          }
          return s;
        };
      },
    ]).default;
  });
})(Ru);
var G0 = Ru.exports;
const zu = /* @__PURE__ */ $n(G0),
  Rr = "altimate-display-",
  Q0 = `${Rr}-highlight`,
  Vl = `${Rr}-highlight-hover`,
  J0 = `${Rr}-active-highlight`,
  eg = 1049,
  _n = new zu({
    style: {
      className: Q0,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  rs = new zu({
    style: {
      className: J0,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Iu = (e, t) =>
    t.filter((n) => {
      var o;
      return ((o = n.$node.nodeValue) == null ? void 0 : o.trim()) !== "";
    }),
  Lu = (e, t, n) => {
    const o = t,
      r = n,
      a = ["BR", "HR"];
    return (
      a.includes(o.$node.nodeName) &&
        o.$node.parentNode &&
        (o.$node = o.$node.parentNode),
      a.includes(r.$node.nodeName) &&
        r.$node.parentNode &&
        (r.$node = r.$node.parentNode),
      [o, r]
    );
  };
_n.hooks.Render.SelectedNodes.tap(Iu);
_n.hooks.Serialize.Restore.tap(Lu);
rs.hooks.Render.SelectedNodes.tap(Iu);
rs.hooks.Serialize.Restore.tap(Lu);
_n.on("selection:hover", ({ id: e }) => {
  _n.addClass(Vl, e);
}).on("selection:hover-out", ({ id: e }) => {
  _n.removeClass(Vl, e);
});
const tg = (e) => {
    var t, n;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((n = e.meta) == null ? void 0 : n.highlight)
      : null;
  },
  ng = (e) => {
    const t = tg(e);
    t && (_n.remove(t.id), rs.remove(t.id));
  },
  as = () => {
    var n, o;
    const e = is(),
      t =
        (e == null ? void 0 : e[1]) === "analysis"
          ? document.getElementById("sql")
          : document.getElementById("code");
    return (o =
      (n = t == null ? void 0 : t.parentElement) == null
        ? void 0
        : n.querySelector("code-block")) == null
      ? void 0
      : o.querySelector("code.ng-binding.highlight");
  },
  is = () => {
    var t;
    return (t = window.location.hash
      .split("#")
      .find((n) => n.startsWith("!"))) == null
      ? void 0
      : t.split("/");
  },
  ss = () => document.querySelector('[marked="model.description"]'),
  og = (e) => {
    var t, n, o;
    return e.field
      ? e.column
        ? (n =
            (t = Array.from(
              document.querySelectorAll(
                "column-details tr:not(.ng-hide) td:first-child",
              ),
            ).find((a) => a.innerText === e.column)) == null
              ? void 0
              : t.parentElement) == null
          ? void 0
          : n.querySelector("td:nth-child(3)")
        : (o = ss()) == null
          ? void 0
          : o.firstChild
      : as();
  },
  rg = (e) => {
    if (e.getAttribute("marked") === "model.description") return "description";
  },
  ag = (e, t, n, o, r) => {
    if (e === "description")
      return {
        start: 0,
        end: 0,
        x: 0,
        y: 0,
      };
    const a = t.querySelectorAll(".line-numbers-rows > span"),
      i = n.split(`
`),
      s = Math.max(r.y, o.y),
      c = Array.from(a).findIndex((d) => {
        const { height: f, y: g } = d.getBoundingClientRect();
        return s >= g && s <= g + f;
      }),
      u = a[c],
      l = c - i.length + 1;
    return (
      console.log("start and end lines found", l, c),
      {
        x: u.offsetLeft,
        y: u.offsetTop + u.offsetHeight / 2,
        start: l,
        end: c,
      }
    );
  },
  Dy = () => {
    var e;
    return [(e = as()) == null ? void 0 : e.parentElement, ss()];
  };
var et = /* @__PURE__ */ ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.UNINITIALIZED = 1)] = "UNINITIALIZED"),
  (e[(e.INITIALIZED = 2)] = "INITIALIZED"),
  e
))(et || {});
function ig(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function sg(e) {
  return ig(e) && "type" in e && typeof e.type == "string";
}
var Pu = Symbol.for("immer-nothing"),
  ql = Symbol.for("immer-draftable"),
  Xe = Symbol.for("immer-state"),
  lg =
    process.env.NODE_ENV !== "production"
      ? [
          // All error codes, starting by 0:
          function (e) {
            return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
          },
          function (e) {
            return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
          },
          "This object has been frozen and should not be mutated",
          function (e) {
            return (
              "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " +
              e
            );
          },
          "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
          "Immer forbids circular references",
          "The first or second argument to `produce` must be a function",
          "The third argument to `produce` must be a function or undefined",
          "First argument to `createDraft` must be a plain object, an array, or an immerable object",
          "First argument to `finishDraft` must be a draft returned by `createDraft`",
          function (e) {
            return `'current' expects a draft, got: ${e}`;
          },
          "Object.defineProperty() cannot be used on an Immer draft",
          "Object.setPrototypeOf() cannot be used on an Immer draft",
          "Immer only supports deleting array indices",
          "Immer only supports setting array indices and the 'length' property",
          function (e) {
            return `'original' expects a draft, got: ${e}`;
          },
          // Note: if more errors are added, the errorOffset in Patches.ts should be increased
          // See Patches.ts for additional errors
        ]
      : [];
function Ve(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = lg[e],
      o = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${o}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Dn = Object.getPrototypeOf;
function Qt(e) {
  return !!e && !!e[Xe];
}
function Lt(e) {
  var t;
  return e
    ? Hu(e) ||
        Array.isArray(e) ||
        !!e[ql] ||
        !!((t = e.constructor) != null && t[ql]) ||
        Ir(e) ||
        Lr(e)
    : !1;
}
var cg = Object.prototype.constructor.toString();
function Hu(e) {
  if (!e || typeof e != "object") return !1;
  const t = Dn(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === cg;
}
function dr(e, t) {
  zr(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, o) => t(o, n, e));
}
function zr(e) {
  const t = e[Xe];
  return t ? t.type_ : Array.isArray(e) ? 1 : Ir(e) ? 2 : Lr(e) ? 3 : 0;
}
function Si(e, t) {
  return zr(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function ju(e, t, n) {
  const o = zr(e);
  o === 2 ? e.set(t, n) : o === 3 ? e.add(n) : (e[t] = n);
}
function ug(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Ir(e) {
  return e instanceof Map;
}
function Lr(e) {
  return e instanceof Set;
}
function nn(e) {
  return e.copy_ || e.base_;
}
function Ci(e, t) {
  if (Ir(e)) return new Map(e);
  if (Lr(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && Hu(e))
    return Dn(e)
      ? { ...e }
      : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[Xe];
  let o = Reflect.ownKeys(n);
  for (let r = 0; r < o.length; r++) {
    const a = o[r],
      i = n[a];
    i.writable === !1 && ((i.writable = !0), (i.configurable = !0)),
      (i.get || i.set) &&
        (n[a] = {
          configurable: !0,
          writable: !0,
          // could live with !!desc.set as well here...
          enumerable: i.enumerable,
          value: e[a],
        });
  }
  return Object.create(Dn(e), n);
}
function ls(e, t = !1) {
  return (
    Pr(e) ||
      Qt(e) ||
      !Lt(e) ||
      (zr(e) > 1 && (e.set = e.add = e.clear = e.delete = dg),
      Object.freeze(e),
      t && Object.entries(e).forEach(([n, o]) => ls(o, !0))),
    e
  );
}
function dg() {
  Ve(2);
}
function Pr(e) {
  return Object.isFrozen(e);
}
var fg = {};
function dn(e) {
  const t = fg[e];
  return t || Ve(0, e), t;
}
var ao;
function Fu() {
  return ao;
}
function gg(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function Ul(e, t) {
  t &&
    (dn("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function Ei(e) {
  _i(e), e.drafts_.forEach(pg), (e.drafts_ = null);
}
function _i(e) {
  e === ao && (ao = e.parent_);
}
function Yl(e) {
  return (ao = gg(ao, e));
}
function pg(e) {
  const t = e[Xe];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function Zl(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[Xe].modified_ && (Ei(t), Ve(4)),
        Lt(e) && ((e = fr(t, e)), t.parent_ || gr(t, e)),
        t.patches_ &&
          dn("Patches").generateReplacementPatches_(
            n[Xe].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = fr(t, n, [])),
    Ei(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Pu ? e : void 0
  );
}
function fr(e, t, n) {
  if (Pr(t)) return t;
  const o = t[Xe];
  if (!o) return dr(t, (r, a) => Kl(e, o, t, r, a, n)), t;
  if (o.scope_ !== e) return t;
  if (!o.modified_) return gr(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    (o.finalized_ = !0), o.scope_.unfinalizedDrafts_--;
    const r = o.copy_;
    let a = r,
      i = !1;
    o.type_ === 3 && ((a = new Set(r)), r.clear(), (i = !0)),
      dr(a, (s, c) => Kl(e, o, r, s, c, n, i)),
      gr(e, r, !1),
      n &&
        e.patches_ &&
        dn("Patches").generatePatches_(o, n, e.patches_, e.inversePatches_);
  }
  return o.copy_;
}
function Kl(e, t, n, o, r, a, i) {
  if ((process.env.NODE_ENV !== "production" && r === n && Ve(5), Qt(r))) {
    const s =
        a &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !Si(t.assigned_, o)
          ? a.concat(o)
          : void 0,
      c = fr(e, r, s);
    if ((ju(n, o, c), Qt(c))) e.canAutoFreeze_ = !1;
    else return;
  } else i && n.add(r);
  if (Lt(r) && !Pr(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    fr(e, r),
      (!t || !t.scope_.parent_) &&
        typeof o != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(n, o) &&
        gr(e, r);
  }
}
function gr(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && ls(t, n);
}
function hg(e, t) {
  const n = Array.isArray(e),
    o = {
      type_: n ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : Fu(),
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
      isManual_: !1,
    };
  let r = o,
    a = cs;
  n && ((r = [o]), (a = io));
  const { revoke: i, proxy: s } = Proxy.revocable(r, a);
  return (o.draft_ = s), (o.revoke_ = i), s;
}
var cs = {
    get(e, t) {
      if (t === Xe) return e;
      const n = nn(e);
      if (!Si(n, t)) return mg(e, n, t);
      const o = n[t];
      return e.finalized_ || !Lt(o)
        ? o
        : o === Za(e.base_, t)
          ? (Ka(e), (e.copy_[t] = Ai(o, e)))
          : o;
    },
    has(e, t) {
      return t in nn(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(nn(e));
    },
    set(e, t, n) {
      const o = Bu(nn(e), t);
      if (o != null && o.set) return o.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const r = Za(nn(e), t),
          a = r == null ? void 0 : r[Xe];
        if (a && a.base_ === n)
          return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (ug(n, r) && (n !== void 0 || Si(e.base_, t))) return !0;
        Ka(e), ki(e);
      }
      return (
        (e.copy_[t] === n && // special case: handle new props with value 'undefined'
          (n !== void 0 || t in e.copy_)) || // special case: NaN
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        Za(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), Ka(e), ki(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(e, t) {
      const n = nn(e),
        o = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        o && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== "length",
          enumerable: o.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      Ve(11);
    },
    getPrototypeOf(e) {
      return Dn(e.base_);
    },
    setPrototypeOf() {
      Ve(12);
    },
  },
  io = {};
dr(cs, (e, t) => {
  io[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
io.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && Ve(13),
    io.set.call(this, e, t, void 0)
  );
};
io.set = function (e, t, n) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      Ve(14),
    cs.set.call(this, e[0], t, n, e[0])
  );
};
function Za(e, t) {
  const n = e[Xe];
  return (n ? nn(n) : e)[t];
}
function mg(e, t, n) {
  var r;
  const o = Bu(t, n);
  return o
    ? "value" in o
      ? o.value
      : // This is a very special case, if the prop is a getter defined by the
        // prototype, we should invoke it with the draft as context!
        (r = o.get) == null
        ? void 0
        : r.call(e.draft_)
    : void 0;
}
function Bu(e, t) {
  if (!(t in e)) return;
  let n = Dn(e);
  for (; n; ) {
    const o = Object.getOwnPropertyDescriptor(n, t);
    if (o) return o;
    n = Dn(n);
  }
}
function ki(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && ki(e.parent_));
}
function Ka(e) {
  e.copy_ || (e.copy_ = Ci(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var bg = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, o) => {
        if (typeof t == "function" && typeof n != "function") {
          const a = n;
          n = t;
          const i = this;
          return function (c = a, ...u) {
            return i.produce(c, (l) => n.call(this, l, ...u));
          };
        }
        typeof n != "function" && Ve(6),
          o !== void 0 && typeof o != "function" && Ve(7);
        let r;
        if (Lt(t)) {
          const a = Yl(this),
            i = Ai(t, void 0);
          let s = !0;
          try {
            (r = n(i)), (s = !1);
          } finally {
            s ? Ei(a) : _i(a);
          }
          return Ul(a, o), Zl(r, a);
        } else if (!t || typeof t != "object") {
          if (
            ((r = n(t)),
            r === void 0 && (r = t),
            r === Pu && (r = void 0),
            this.autoFreeze_ && ls(r, !0),
            o)
          ) {
            const a = [],
              i = [];
            dn("Patches").generateReplacementPatches_(t, r, a, i), o(a, i);
          }
          return r;
        } else Ve(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (i, ...s) => this.produceWithPatches(i, (c) => t(c, ...s));
        let o, r;
        return [
          this.produce(t, n, (i, s) => {
            (o = i), (r = s);
          }),
          o,
          r,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == "boolean" &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Lt(e) || Ve(8), Qt(e) && (e = $u(e));
    const t = Yl(this),
      n = Ai(e, void 0);
    return (n[Xe].isManual_ = !0), _i(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[Xe];
    (!n || !n.isManual_) && Ve(9);
    const { scope_: o } = n;
    return Ul(o, t), Zl(void 0, o);
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
    const o = dn("Patches").applyPatches_;
    return Qt(e) ? o(e, t) : this.produce(e, (r) => o(r, t));
  }
};
function Ai(e, t) {
  const n = Ir(e)
    ? dn("MapSet").proxyMap_(e, t)
    : Lr(e)
      ? dn("MapSet").proxySet_(e, t)
      : hg(e, t);
  return (t ? t.scope_ : Fu()).drafts_.push(n), n;
}
function $u(e) {
  return Qt(e) || Ve(10, e), Wu(e);
}
function Wu(e) {
  if (!Lt(e) || Pr(e)) return e;
  const t = e[Xe];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (n = Ci(e, t.scope_.immer_.useStrictShallowCopy_));
  } else n = Ci(e, !0);
  return (
    dr(n, (o, r) => {
      ju(n, o, Wu(r));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var Ge = new bg(),
  Vu = Ge.produce;
Ge.produceWithPatches.bind(Ge);
Ge.setAutoFreeze.bind(Ge);
Ge.setUseStrictShallowCopy.bind(Ge);
Ge.applyPatches.bind(Ge);
Ge.createDraft.bind(Ge);
Ge.finishDraft.bind(Ge);
var yg = (e, t, n) => {
    if (t.length === 1 && t[0] === n) {
      let o = !1;
      try {
        const r = {};
        e(r) === r && (o = !0);
      } catch {}
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
          { stack: r },
        );
      }
    }
  },
  vg = (e, t, n) => {
    const { memoize: o, memoizeOptions: r } = t,
      { inputSelectorResults: a, inputSelectorResultsCopy: i } = e,
      s = o(() => ({}), ...r);
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
          stack: u,
        },
      );
    }
  },
  wg = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function xg(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function Sg(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function Cg(
  e,
  t = "expected all items to be functions, instead received the following types: ",
) {
  if (!e.every((n) => typeof n == "function")) {
    const n = e
      .map((o) =>
        typeof o == "function" ? `function ${o.name || "unnamed"}()` : typeof o,
      )
      .join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var Xl = (e) => (Array.isArray(e) ? e : [e]);
function Eg(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    Cg(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function Gl(e, t) {
  const n = [],
    { length: o } = e;
  for (let r = 0; r < o; r++) n.push(e[r].apply(null, t));
  return n;
}
var _g = (e, t) => {
    const { identityFunctionCheck: n, inputStabilityCheck: o } = {
      ...wg,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: yg,
      },
      inputStabilityCheck: {
        shouldRun: o === "always" || (o === "once" && e),
        run: vg,
      },
    };
  },
  kg = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Ag = typeof WeakRef < "u" ? WeakRef : kg,
  Mg = 0,
  Ql = 1;
function Po() {
  return {
    s: Mg,
    v: void 0,
    o: null,
    p: null,
  };
}
function us(e, t = {}) {
  let n = Po();
  const { resultEqualityCheck: o } = t;
  let r,
    a = 0;
  function i() {
    var d;
    let s = n;
    const { length: c } = arguments;
    for (let f = 0, g = c; f < g; f++) {
      const p = arguments[f];
      if (typeof p == "function" || (typeof p == "object" && p !== null)) {
        let h = s.o;
        h === null && (s.o = h = /* @__PURE__ */ new WeakMap());
        const m = h.get(p);
        m === void 0 ? ((s = Po()), h.set(p, s)) : (s = m);
      } else {
        let h = s.p;
        h === null && (s.p = h = /* @__PURE__ */ new Map());
        const m = h.get(p);
        m === void 0 ? ((s = Po()), h.set(p, s)) : (s = m);
      }
    }
    const u = s;
    let l;
    if (
      (s.s === Ql ? (l = s.v) : ((l = e.apply(null, arguments)), a++),
      (u.s = Ql),
      o)
    ) {
      const f =
        ((d = r == null ? void 0 : r.deref) == null ? void 0 : d.call(r)) ?? r;
      f != null && o(f, l) && ((l = f), a !== 0 && a--),
        (r =
          (typeof l == "object" && l !== null) || typeof l == "function"
            ? new Ag(l)
            : l);
    }
    return (u.v = l), l;
  }
  return (
    (i.clearCache = () => {
      (n = Po()), i.resetResultsCount();
    }),
    (i.resultsCount = () => a),
    (i.resetResultsCount = () => {
      a = 0;
    }),
    i
  );
}
function qu(e, ...t) {
  const n =
      typeof e == "function"
        ? {
            memoize: e,
            memoizeOptions: t,
          }
        : e,
    o = (...r) => {
      let a = 0,
        i = 0,
        s,
        c = {},
        u = r.pop();
      typeof u == "object" && ((c = u), (u = r.pop())),
        xg(
          u,
          `createSelector expects an output function after the inputs, but received: [${typeof u}]`,
        );
      const l = {
          ...n,
          ...c,
        },
        {
          memoize: d,
          memoizeOptions: f = [],
          argsMemoize: g = us,
          argsMemoizeOptions: p = [],
          devModeChecks: h = {},
        } = l,
        m = Xl(f),
        y = Xl(p),
        x = Eg(r),
        C = d(
          function () {
            return a++, u.apply(null, arguments);
          },
          ...m,
        );
      let S = !0;
      const w = g(
        function () {
          i++;
          const O = Gl(x, arguments);
          if (((s = C.apply(null, O)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: _, inputStabilityCheck: L } = _g(
              S,
              h,
            );
            if ((_.shouldRun && _.run(u, O, s), L.shouldRun)) {
              const I = Gl(x, arguments);
              L.run(
                { inputSelectorResults: O, inputSelectorResultsCopy: I },
                { memoize: d, memoizeOptions: m },
                arguments,
              );
            }
            S && (S = !1);
          }
          return s;
        },
        ...y,
      );
      return Object.assign(w, {
        resultFunc: u,
        memoizedResultFunc: C,
        dependencies: x,
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
        argsMemoize: g,
      });
    };
  return (
    Object.assign(o, {
      withTypes: () => o,
    }),
    o
  );
}
var Tg = /* @__PURE__ */ qu(us),
  Og = Object.assign(
    (e, t = Tg) => {
      Sg(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const n = Object.keys(e),
        o = n.map((a) => e[a]);
      return t(o, (...a) => a.reduce((i, s, c) => ((i[n[c]] = s), i), {}));
    },
    { withTypes: () => Og },
  ),
  Ng = (...e) => {
    const t = qu(...e),
      n = Object.assign(
        (...o) => {
          const r = t(...o),
            a = (i, ...s) => r(Qt(i) ? $u(i) : i, ...s);
          return Object.assign(a, r), a;
        },
        {
          withTypes: () => n,
        },
      );
    return n;
  };
Ng(us);
function Rn(e, t) {
  function n(...o) {
    if (t) {
      let r = t(...o);
      if (!r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Te(0)
            : "prepareAction did not return an object",
        );
      return {
        type: e,
        payload: r.payload,
        ...("meta" in r && {
          meta: r.meta,
        }),
        ...("error" in r && {
          error: r.error,
        }),
      };
    }
    return {
      type: e,
      payload: o[0],
    };
  }
  return (
    (n.toString = () => `${e}`),
    (n.type = e),
    (n.match = (o) => sg(o) && o.type === e),
    n
  );
}
function Jl(e) {
  return Lt(e) ? Vu(e, () => {}) : e;
}
function ec(e, t, n) {
  if (e.has(t)) {
    let r = e.get(t);
    return n.update && ((r = n.update(r, t, e)), e.set(t, r)), r;
  }
  if (!n.insert)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? Te(10)
        : "No insert provided for key not already in map",
    );
  const o = n.insert(t, e);
  return e.set(t, o), o;
}
process.env.NODE_ENV;
function Uu(e) {
  const t = {},
    n = [];
  let o;
  const r = {
    addCase(a, i) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? Te(26)
              : "`builder.addCase` should only be called before calling `builder.addMatcher`",
          );
        if (o)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? Te(27)
              : "`builder.addCase` should only be called before calling `builder.addDefaultCase`",
          );
      }
      const s = typeof a == "string" ? a : a.type;
      if (!s)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Te(28)
            : "`builder.addCase` cannot be called with an empty action type",
        );
      if (s in t)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Te(29)
            : `\`builder.addCase\` cannot be called with two reducers for the same action type '${s}'`,
        );
      return (t[s] = i), r;
    },
    addMatcher(a, i) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Te(30)
            : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`",
        );
      return (
        n.push({
          matcher: a,
          reducer: i,
        }),
        r
      );
    },
    addDefaultCase(a) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Te(31)
            : "`builder.addDefaultCase` can only be called once",
        );
      return (o = a), r;
    },
  };
  return e(r), [t, n, o];
}
function Dg(e) {
  return typeof e == "function";
}
function Rg(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? Te(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [n, o, r] = Uu(t),
    a;
  if (Dg(e)) a = () => Jl(e());
  else {
    const s = Jl(e);
    a = () => s;
  }
  function i(s = a(), c) {
    let u = [
      n[c.type],
      ...o.filter(({ matcher: l }) => l(c)).map(({ reducer: l }) => l),
    ];
    return (
      u.filter((l) => !!l).length === 0 && (u = [r]),
      u.reduce((l, d) => {
        if (d)
          if (Qt(l)) {
            const g = d(l, c);
            return g === void 0 ? l : g;
          } else {
            if (Lt(l)) return Vu(l, (f) => d(f, c));
            {
              const f = d(l, c);
              if (f === void 0) {
                if (l === null) return l;
                throw new Error(
                  process.env.NODE_ENV === "production"
                    ? Te(9)
                    : "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return f;
            }
          }
        return l;
      }, s)
    );
  }
  return (i.getInitialState = a), i;
}
var zg = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  Ig = (e = 21) => {
    let t = "",
      n = e;
    for (; n--; ) t += zg[(Math.random() * 64) | 0];
    return t;
  },
  Lg = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Pg(e, t) {
  return `${e}/${t}`;
}
function Hg({ creators: e } = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Lg];
  return function (r) {
    const { name: a, reducerPath: i = a } = r;
    if (!a)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Te(11)
          : "`name` is a required option for createSlice",
      );
    typeof process < "u" &&
      process.env.NODE_ENV === "development" &&
      r.initialState === void 0 &&
      console.error(
        "You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`",
      );
    const s =
        (typeof r.reducers == "function" ? r.reducers(Fg()) : r.reducers) || {},
      c = Object.keys(s),
      u = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      l = {
        addCase(C, S) {
          const w = typeof C == "string" ? C : C.type;
          if (!w)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? Te(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (w in u.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? Te(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  w,
            );
          return (u.sliceCaseReducersByType[w] = S), l;
        },
        addMatcher(C, S) {
          return (
            u.sliceMatchers.push({
              matcher: C,
              reducer: S,
            }),
            l
          );
        },
        exposeAction(C, S) {
          return (u.actionCreators[C] = S), l;
        },
        exposeCaseReducer(C, S) {
          return (u.sliceCaseReducersByName[C] = S), l;
        },
      };
    c.forEach((C) => {
      const S = s[C],
        w = {
          reducerName: C,
          type: Pg(a, C),
          createNotation: typeof r.reducers == "function",
        };
      $g(S) ? Vg(w, S, l, t) : Bg(w, S, l);
    });
    function d() {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof r.extraReducers == "object"
      )
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Te(14)
            : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
        );
      const [C = {}, S = [], w = void 0] =
          typeof r.extraReducers == "function"
            ? Uu(r.extraReducers)
            : [r.extraReducers],
        M = {
          ...C,
          ...u.sliceCaseReducersByType,
        };
      return Rg(r.initialState, (O) => {
        for (let _ in M) O.addCase(_, M[_]);
        for (let _ of u.sliceMatchers) O.addMatcher(_.matcher, _.reducer);
        for (let _ of S) O.addMatcher(_.matcher, _.reducer);
        w && O.addDefaultCase(w);
      });
    }
    const f = (C) => C,
      g = /* @__PURE__ */ new Map();
    let p;
    function h(C, S) {
      return p || (p = d()), p(C, S);
    }
    function m() {
      return p || (p = d()), p.getInitialState();
    }
    function y(C, S = !1) {
      function w(O) {
        let _ = O[C];
        if (typeof _ > "u") {
          if (S) _ = m();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? Te(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return _;
      }
      function M(O = f) {
        const _ = ec(g, S, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return ec(_, O, {
          insert: () => {
            const L = {};
            for (const [I, P] of Object.entries(r.selectors ?? {}))
              L[I] = jg(P, O, m, S);
            return L;
          },
        });
      }
      return {
        reducerPath: C,
        getSelectors: M,
        get selectors() {
          return M(w);
        },
        selectSlice: w,
      };
    }
    const x = {
      name: a,
      reducer: h,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...y(i),
      injectInto(C, { reducerPath: S, ...w } = {}) {
        const M = S ?? i;
        return (
          C.inject(
            {
              reducerPath: M,
              reducer: h,
            },
            w,
          ),
          {
            ...x,
            ...y(M, !0),
          }
        );
      },
    };
    return x;
  };
}
function jg(e, t, n, o) {
  function r(a, ...i) {
    let s = t(a);
    if (typeof s > "u") {
      if (o) s = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Te(16)
            : "selectState returned undefined for an uninjected slice reducer",
        );
    }
    return e(s, ...i);
  }
  return (r.unwrapped = e), r;
}
var Yu = /* @__PURE__ */ Hg();
function Fg() {
  function e(t, n) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...n,
    };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(t) {
        return Object.assign(
          {
            // hack so the wrapping function has the same name as the original
            // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
            [t.name](...n) {
              return t(...n);
            },
          }[t.name],
          {
            _reducerDefinitionType: "reducer",
            /* reducer */
          },
        );
      },
      preparedReducer(t, n) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: t,
          reducer: n,
        };
      },
      asyncThunk: e,
    }
  );
}
function Bg({ type: e, reducerName: t, createNotation: n }, o, r) {
  let a, i;
  if ("reducer" in o) {
    if (n && !Wg(o))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Te(17)
          : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.",
      );
    (a = o.reducer), (i = o.prepare);
  } else a = o;
  r.addCase(e, a)
    .exposeCaseReducer(t, a)
    .exposeAction(t, i ? Rn(e, i) : Rn(e));
}
function $g(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Wg(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Vg({ type: e, reducerName: t }, n, o, r) {
  if (!r)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? Te(18)
        : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.",
    );
  const {
      payloadCreator: a,
      fulfilled: i,
      pending: s,
      rejected: c,
      settled: u,
      options: l,
    } = n,
    d = r(e, a, l);
  o.exposeAction(t, d),
    i && o.addCase(d.fulfilled, i),
    s && o.addCase(d.pending, s),
    c && o.addCase(d.rejected, c),
    u && o.addMatcher(d.settled, u),
    o.exposeCaseReducer(t, {
      fulfilled: i || Ho,
      pending: s || Ho,
      rejected: c || Ho,
      settled: u || Ho,
    });
}
function Ho() {}
var qg = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Te(32)
          : `${t} is not a function`,
      );
  },
  ds = "listenerMiddleware",
  Ug = (e) => {
    let { type: t, actionCreator: n, matcher: o, predicate: r, effect: a } = e;
    if (t) r = Rn(t).match;
    else if (n) (t = n.type), (r = n.match);
    else if (o) r = o;
    else if (!r)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Te(21)
          : "Creating or removing a listener requires one of the known fields for matching an action",
      );
    return (
      qg(a, "options.listener"),
      {
        predicate: r,
        type: t,
        effect: a,
      }
    );
  },
  Yg = Object.assign(
    (e) => {
      const { type: t, predicate: n, effect: o } = Ug(e);
      return {
        id: Ig(),
        effect: o,
        type: t,
        predicate: n,
        pending: /* @__PURE__ */ new Set(),
        unsubscribe: () => {
          throw new Error(
            process.env.NODE_ENV === "production"
              ? Te(22)
              : "Unsubscribe not initialized",
          );
        },
      };
    },
    {
      withTypes: () => Yg,
    },
  ),
  Zg = Object.assign(Rn(`${ds}/add`), {
    withTypes: () => Zg,
  });
Rn(`${ds}/removeAll`);
var Kg = Object.assign(Rn(`${ds}/remove`), {
  withTypes: () => Kg,
});
function Te(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Xg = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    conversationsLoadingState: et.UNINITIALIZED,
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: X0(),
    codeblockLoaded: !1,
    source: os.DBT_DOCS,
    manifest: {},
  },
  pr = Yu({
    name: "appState",
    initialState: Xg,
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
        return (n = t.payload) != null && n.length
          ? {
              ...e,
              users: t.payload.reduce((o, r) => ((o[r.id] = r), o), {}),
            }
          : e;
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
            ...t.payload,
          },
        };
      },
      resolveConversationGroup: (
        e,
        { payload: { conversationGroupId: t } },
      ) => {
        e.conversations[t] && delete e.conversations[t];
      },
      updateNewConversation: (e, t) => {
        var r, a;
        const n = { ...t.payload };
        if (!n.meta) {
          console.log("Invalid meta");
          return;
        }
        const o = is();
        if (!o || o.length < 3) {
          console.error("Unable to find model parts", o);
          return;
        }
        if (
          (console.log("model parts found", o),
          (n.meta.uniqueId = o[2]),
          (n.meta.resource_type = o[1]),
          n.meta.range ||
            (n.meta.range = {
              end: { line: 0, character: 0 },
              start: { line: 0, character: 0 },
            }),
          n.meta.uniqueId)
        ) {
          const i =
            ((r = e.manifest.nodes) == null ? void 0 : r[n.meta.uniqueId]) ||
            ((a = e.manifest.macros) == null ? void 0 : a[n.meta.uniqueId]);
          n.meta.filePath = (i == null ? void 0 : i.original_file_path) || "";
        }
        e.newConversation = n;
      },
      resetNewConversation: (e) => {
        e.newConversation = void 0;
      },
      setConversations: (e, t) => {
        t.payload &&
          ((e.conversations = t.payload.reduce(
            (n, o) => ((n[o.conversation_group_id] = o), n),
            {},
          )),
          (e.selectedConversationId =
            e.selectedConversationId || t.payload[0].conversation_group_id));
      },
    },
  }),
  {
    setCurrentUserId: Ry,
    setShareId: zy,
    updateSelectedConversationId: fs,
    updateRightPanelState: gs,
    setUsers: Gg,
    setConversations: Qg,
    resetNewConversation: ps,
    updateNewConversation: hs,
    upsertConversation: Iy,
    setDocsAppRendered: Ly,
    updateCurrentPage: Py,
    updateCodeblockLoaded: Hy,
    resolveConversationGroup: Jg,
    setConversationsLoadingState: tc,
    refetchConversations: Zu,
    setConversationSource: jy,
    setManifest: ep,
  } = pr.actions,
  Hr = pt({
    state: pr.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  tp = ({
    children: e,
    shareId: t,
    userId: n,
    conversationGroupId: o,
    source: r,
  }) => {
    const [a, i] = ku(pr.reducer, {
        ...pr.getInitialState(),
        shareId: t,
        currentUserId: n,
        selectedConversationId: o,
        isRightPanelOpen: !!o,
        source: r,
      }),
      s = he((u) => u(a), [a]),
      c = Oe(
        () => ({
          state: a,
          dispatch: i,
          getValue: s,
        }),
        [a, i, s],
      );
    return /* @__PURE__ */ b.jsx(Hr.Provider, { value: c, children: e });
  },
  np = tp,
  op = () => Ye(Hr),
  xe = (e) => {
    const { getValue: t } = Ye(Hr);
    return t(e);
  },
  rt = () => {
    const { dispatch: e } = Ye(Hr);
    return e;
  },
  rp = pt({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  ap = pt(null),
  ip = typeof document < "u",
  Ku = ip ? M1 : ie;
class nc {
  constructor() {
    (this.order = []), (this.scheduled = /* @__PURE__ */ new Set());
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
    (this.order.length = 0), this.scheduled.clear();
  }
}
function sp(e) {
  let t = new nc(),
    n = new nc(),
    o = 0,
    r = !1,
    a = !1;
  const i = /* @__PURE__ */ new WeakSet(),
    s = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (c, u = !1, l = !1) => {
        const d = l && r,
          f = d ? t : n;
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
        if (((r = !0), ([t, n] = [n, t]), n.clear(), (o = t.order.length), o))
          for (let u = 0; u < o; u++) {
            const l = t.order[u];
            i.has(l) && (s.schedule(l), e()), l(c);
          }
        (r = !1), a && ((a = !1), s.process(c));
      },
    };
  return s;
}
const jo = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
    // Compute
  ],
  lp = 40;
function cp(e, t) {
  let n = !1,
    o = !0;
  const r = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    a = jo.reduce((d, f) => ((d[f] = sp(() => (n = !0))), d), {}),
    i = (d) => {
      a[d].process(r);
    },
    s = () => {
      const d = performance.now();
      (n = !1),
        (r.delta = o ? 1e3 / 60 : Math.max(Math.min(d - r.timestamp, lp), 1)),
        (r.timestamp = d),
        (r.isProcessing = !0),
        jo.forEach(i),
        (r.isProcessing = !1),
        n && t && ((o = !1), e(s));
    },
    c = () => {
      (n = !0), (o = !0), r.isProcessing || e(s);
    };
  return {
    schedule: jo.reduce((d, f) => {
      const g = a[f];
      return (d[f] = (p, h = !1, m = !1) => (n || c(), g.schedule(p, h, m))), d;
    }, {}),
    cancel: (d) => jo.forEach((f) => a[f].cancel(d)),
    state: r,
    steps: a,
  };
}
const up = pt({});
function dp(e) {
  const t = ae(null);
  return t.current === null && (t.current = e()), t.current;
}
const fp = (e) => e,
  {
    schedule: gp,
    cancel: Fy,
    state: By,
    steps: $y,
  } = cp(typeof requestAnimationFrame < "u" ? requestAnimationFrame : fp, !0);
function Xu() {
  const e = ae(!1);
  return (
    Ku(
      () => (
        (e.current = !0),
        () => {
          e.current = !1;
        }
      ),
      [],
    ),
    e
  );
}
function pp() {
  const e = Xu(),
    [t, n] = de(0),
    o = he(() => {
      e.current && n(t + 1);
    }, [t]);
  return [he(() => gp.postRender(o), [o]), t];
}
class hp extends F.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const o = this.props.sizeRef.current;
      (o.height = n.offsetHeight || 0),
        (o.width = n.offsetWidth || 0),
        (o.top = n.offsetTop),
        (o.left = n.offsetLeft);
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function mp({ children: e, isPresent: t }) {
  const n = Au(),
    o = ae(null),
    r = ae({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: a } = Ye(rp);
  return (
    T1(() => {
      const { width: i, height: s, top: c, left: u } = r.current;
      if (t || !o.current || !i || !s) return;
      o.current.dataset.motionPopId = n;
      const l = document.createElement("style");
      return (
        a && (l.nonce = a),
        document.head.appendChild(l),
        l.sheet &&
          l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${i}px !important;
            height: ${s}px !important;
            top: ${c}px !important;
            left: ${u}px !important;
          }
        `),
        () => {
          document.head.removeChild(l);
        }
      );
    }, [t]),
    F.createElement(
      hp,
      { isPresent: t, childRef: o, sizeRef: r },
      F.cloneElement(e, { ref: o }),
    )
  );
}
const Xa = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: o,
  custom: r,
  presenceAffectsLayout: a,
  mode: i,
}) => {
  const s = dp(bp),
    c = Au(),
    u = Oe(
      () => ({
        id: c,
        initial: t,
        isPresent: n,
        custom: r,
        onExitComplete: (l) => {
          s.set(l, !0);
          for (const d of s.values()) if (!d) return;
          o && o();
        },
        register: (l) => (s.set(l, !1), () => s.delete(l)),
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      a ? void 0 : [n],
    );
  return (
    Oe(() => {
      s.forEach((l, d) => s.set(d, !1));
    }, [n]),
    F.useEffect(() => {
      !n && !s.size && o && o();
    }, [n]),
    i === "popLayout" && (e = F.createElement(mp, { isPresent: n }, e)),
    F.createElement(ap.Provider, { value: u }, e)
  );
};
function bp() {
  return /* @__PURE__ */ new Map();
}
function yp(e) {
  return ie(() => () => e(), []);
}
const on = (e) => e.key || "";
function vp(e, t) {
  e.forEach((n) => {
    const o = on(n);
    t.set(o, n);
  });
}
function wp(e) {
  const t = [];
  return (
    Nn.forEach(e, (n) => {
      _u(n) && t.push(n);
    }),
    t
  );
}
const xp = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: o,
    exitBeforeEnter: r,
    presenceAffectsLayout: a = !0,
    mode: i = "sync",
  }) => {
    const s = Ye(up).forceRender || pp()[0],
      c = Xu(),
      u = wp(e);
    let l = u;
    const d = ae(/* @__PURE__ */ new Map()).current,
      f = ae(l),
      g = ae(/* @__PURE__ */ new Map()).current,
      p = ae(!0);
    if (
      (Ku(() => {
        (p.current = !1), vp(u, g), (f.current = l);
      }),
      yp(() => {
        (p.current = !0), g.clear(), d.clear();
      }),
      p.current)
    )
      return F.createElement(
        F.Fragment,
        null,
        l.map((x) =>
          F.createElement(
            Xa,
            {
              key: on(x),
              isPresent: !0,
              initial: n ? void 0 : !1,
              presenceAffectsLayout: a,
              mode: i,
            },
            x,
          ),
        ),
      );
    l = [...l];
    const h = f.current.map(on),
      m = u.map(on),
      y = h.length;
    for (let x = 0; x < y; x++) {
      const C = h[x];
      m.indexOf(C) === -1 && !d.has(C) && d.set(C, void 0);
    }
    return (
      i === "wait" && d.size && (l = []),
      d.forEach((x, C) => {
        if (m.indexOf(C) !== -1) return;
        const S = g.get(C);
        if (!S) return;
        const w = h.indexOf(C);
        let M = x;
        if (!M) {
          const O = () => {
            d.delete(C);
            const _ = Array.from(g.keys()).filter((L) => !m.includes(L));
            if (
              (_.forEach((L) => g.delete(L)),
              (f.current = u.filter((L) => {
                const I = on(L);
                return (
                  // filter out the node exiting
                  I === C || // filter out the leftover children
                  _.includes(I)
                );
              })),
              !d.size)
            ) {
              if (c.current === !1) return;
              s(), o && o();
            }
          };
          (M = F.createElement(
            Xa,
            {
              key: on(S),
              isPresent: !1,
              onExitComplete: O,
              custom: t,
              presenceAffectsLayout: a,
              mode: i,
            },
            S,
          )),
            d.set(C, M);
        }
        l.splice(w, 0, M);
      }),
      (l = l.map((x) => {
        const C = x.key;
        return d.has(C)
          ? x
          : F.createElement(
              Xa,
              { key: on(x), isPresent: !0, presenceAffectsLayout: a, mode: i },
              x,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        i === "wait" &&
        l.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      F.createElement(F.Fragment, null, d.size ? l : l.map((x) => O1(x)))
    );
  },
  hn = ({ icon: e, className: t = "", ...n }) =>
    /* @__PURE__ */ b.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...n,
    }),
  Gu = (e) => /* @__PURE__ */ b.jsx(hn, { icon: "add", ...e }),
  Sp = (e) => /* @__PURE__ */ b.jsx(hn, { icon: "comment-unresolved", ...e }),
  Cp = (e) => /* @__PURE__ */ b.jsx(hn, { icon: "check", ...e }),
  Ep = (e) => /* @__PURE__ */ b.jsx(hn, { icon: "debug-restart", ...e }),
  _p = (e) => /* @__PURE__ */ b.jsx(hn, { icon: "gear", ...e }),
  kp = (e) => /* @__PURE__ */ b.jsx(hn, { icon: "info", ...e }),
  Ap = (e) => /* @__PURE__ */ b.jsx(hn, { icon: "send", ...e }),
  Mp = ({ pos: e, onAddComment: t }) =>
    pn(
      /* @__PURE__ */ b.jsx(xp, {
        children:
          e &&
          /* @__PURE__ */ b.jsx(qe, {
            onClick: t,
            id: `${Rr}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: eg + 5,
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
              padding: 0,
            },
            children: /* @__PURE__ */ b.jsx(Gu, {}),
          }),
      }),
      e.element.parentElement,
    ),
  Tp = Mp,
  Op = () => {
    const {
        state: { isRightPanelOpen: e },
      } = op(),
      t = rt(),
      n = () => {
        t(gs(!e));
      };
    return /* @__PURE__ */ b.jsx(qe, {
      onClick: n,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  Np = Op,
  Dp = (e) => Ne.get(`dbt/dbt_docs_share/${e}`),
  Rp = (e, t, n) =>
    Ne.post(`dbt/dbt_docs_share/${e}/conversation_group`, {
      ...t,
      telemetry: {
        eventName: "dbtCollaboration:create",
        properties: { source: n },
      },
    }),
  zp = (e, t, n, o) =>
    Ne.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, {
      ...n,
      telemetry: {
        eventName: "dbtCollaboration:reply",
        properties: { source: o },
      },
    }),
  Ip = (e) => Ne.get(`dbt/dbt_docs_share/${e}/conversations`),
  Lp = (e) => Ne.get("users/chat", { company: e }),
  Pp = (e, t, n) =>
    Ne.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
      telemetry: {
        eventName: "dbtCollaboration:resolve",
        properties: { source: n },
      },
    }),
  Hp = () => {
    const e = xe((s) => s.shareId),
      [t, n] = de(null),
      [o, r] = de(!1),
      a = rt();
    ie(() => {
      t != null &&
        t.manifest_presigned_url &&
        fetch(t.manifest_presigned_url)
          .then((s) => s.json())
          .then((s) => {
            a(ep(s));
          })
          .catch((s) =>
            console.error(
              "error loading manifest",
              s,
              t.manifest_presigned_url,
            ),
          );
    }, [a, t == null ? void 0 : t.manifest_presigned_url]);
    const i = he(async () => {
      if (!e) return;
      r(!0);
      const s = await Dp(e);
      if (s) {
        n(s);
        const c = document.getElementById("collapse-sidebar");
        c == null || c.click();
      }
      r(!1);
    }, [e]);
    return (
      ie(() => {
        !e || t || o || i();
      }, [e, t, i, o]),
      { shareDetails: t, loading: o }
    );
  },
  jp = () => {
    const e = xe((l) =>
        l.selectedConversationId
          ? l.conversations[l.selectedConversationId]
          : null,
      ),
      t = xe((l) => l.docsAppRendered),
      n = xe((l) => l.newConversation),
      o = rt(),
      [r, a] = de(null),
      [i, s] = de(null);
    ie(() => {
      n && (a(null), s(null));
    }, [n]);
    const c = he(() => {
      console.log("resetHighlights"), r && ng(r), s(null), a(null);
    }, [r]);
    return (
      ie(() => {
        !e ||
          !t ||
          (e.meta.resource_type &&
            e.meta.uniqueId &&
            (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`));
      }, [e, t, o]),
      {
        getHighlightedSelectionData: () => r,
        pos: i,
        onSelectionEnd: (l) => {
          const d = l.target,
            f = rg(d),
            { end: g, start: p } = l.detail.selectionRange,
            h = document.getSelection();
          if (!h || !h.rangeCount) return c(), null;
          const y = h.getRangeAt(0).toString(),
            x = d == null ? void 0 : d.innerText;
          if (!y || !x) return;
          const { end: C, start: S, x: w, y: M } = ag(f, d, y, g, p);
          console.log("selection range", C, S, w, M);
          const O = {
            meta: {
              filePath: "",
              field: f,
              highlight: y,
              range: {
                end: { line: C, character: 0 },
                start: { line: S, character: 0 },
              },
            },
          };
          o(ps()),
            s({
              x: w,
              y: M,
              element: d,
            }),
            document.body.addEventListener("click", c, { once: !0 }),
            a(O);
        },
      }
    );
  },
  Fp = ({ conversationGroup: e }) => {
    const t = xe((s) => s.selectedConversationId),
      n = rt(),
      o = ae(null),
      r = Oe(() => og(e.meta), [e.meta]),
      a = () => {
        n(fs(e.conversation_group_id));
      },
      i = Oe(() => {
        if (!r) return;
        if (e.meta.field === "description")
          return { top: 0, bottom: r.offsetHeight };
        let s = 0,
          c = 0;
        for (let u = e.meta.range.start.line; u <= e.meta.range.end.line; u++) {
          const l = r.querySelector(
            `.line-numbers-rows > span:nth-child(${u + 1})`,
          );
          l &&
            (u === e.meta.range.start.line && (s = l.offsetTop + 15),
            u === e.meta.range.end.line && (c = l.offsetTop + l.offsetHeight));
        }
        return { top: s, bottom: c };
      }, [r, e.meta.field, e.meta.range.start.line, e.meta.range.end.line]);
    return (
      ie(() => {
        var s;
        t === e.conversation_group_id &&
          ((s = o.current) == null ||
            s.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [e.conversation_group_id, t]),
      !i || !(r != null && r.parentElement)
        ? null
        : pn(
            /* @__PURE__ */ b.jsx("div", {
              ref: o,
              className: `altimate-highlighter ${t === e.conversation_group_id ? "active" : ""}`,
              style: { top: i.top, height: i.bottom - i.top },
              onClick: a,
              children: /* @__PURE__ */ b.jsx(Sp, {}),
            }),
            r.parentElement,
          )
    );
  },
  Bp = Fp,
  $p = () => {
    const e = xe((r) => Object.values(r.conversations || {})),
      t = xe((r) => r.codeblockLoaded),
      n = xe((r) => r.currentPage),
      o =
        e == null
          ? void 0
          : e.filter(
              (r) =>
                r.meta.resource_type === n.resourceType &&
                r.meta.uniqueId === n.name,
            );
    return !(o != null && o.length) || !t
      ? null
      : /* @__PURE__ */ b.jsx(b.Fragment, {
          children: o.map((r) =>
            /* @__PURE__ */ b.jsx(
              Bp,
              {
                conversationGroup: r,
              },
              r.conversation_group_id,
            ),
          ),
        });
  },
  Wp = $p,
  Vp = "_dbtDocs_14zop_9",
  qp = "_hotspotButton_14zop_46",
  Up = "_pulse_14zop_1",
  Yp = "_conversationRightPanelCloseButton_14zop_62",
  Zp = "_conversationRightPanel_14zop_62",
  Kp = "_newConversationForm_14zop_94",
  Xp = "_highlightText_14zop_108",
  Gp = "_conversationInputForm_14zop_130",
  Qp = "_conversationGroup_14zop_156",
  Jp = "_replyForm_14zop_189",
  eh = "_resolveButton_14zop_237",
  Pt = {
    dbtDocs: Vp,
    hotspotButton: qp,
    pulse: Up,
    conversationRightPanelCloseButton: Yp,
    conversationRightPanel: Zp,
    newConversationForm: Kp,
    highlightText: Xp,
    conversationInputForm: Gp,
    conversationGroup: Qp,
    replyForm: Jp,
    resolveButton: eh,
  },
  th = "_profileImage_11vaf_1",
  nh = {
    profileImage: th,
  },
  oh = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ b.jsx("div", {
      className: nh.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  Qu = oh;
function rh(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function ah(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function ih() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function hr(e) {
  return rh(e) || ah(e) || ih();
}
function ot() {
  return (
    (ot =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
      }),
    ot.apply(this, arguments)
  );
}
function sh(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oc(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(e, o.key, o);
  }
}
function lh(e, t, n) {
  return t && oc(e.prototype, t), n && oc(e, n), e;
}
function ue(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function Mi(e, t) {
  return (
    (Mi =
      Object.setPrototypeOf ||
      function (o, r) {
        return (o.__proto__ = r), o;
      }),
    Mi(e, t)
  );
}
function ch(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && Mi(e, t);
}
function kn(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (kn = function (n) {
          return typeof n;
        })
      : (kn = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : typeof n;
        }),
    kn(e)
  );
}
function or(e) {
  return (
    typeof Symbol == "function" && kn(Symbol.iterator) === "symbol"
      ? (or = function (n) {
          return kn(n);
        })
      : (or = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : kn(n);
        }),
    or(e)
  );
}
function uh(e, t) {
  return t && (or(t) === "object" || typeof t == "function") ? t : ue(e);
}
function mr(e) {
  return (
    (mr = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    mr(e)
  );
}
function se(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
var dh = function (e, t, n, o, r, a, i, s) {
    if (process.env.NODE_ENV !== "production" && t === void 0)
      throw new Error("invariant requires an error message argument");
    if (!e) {
      var c;
      if (t === void 0)
        c = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var u = [n, o, r, a, i, s],
          l = 0;
        (c = new Error(
          t.replace(/%s/g, function () {
            return u[l++];
          }),
        )),
          (c.name = "Invariant Violation");
      }
      throw ((c.framesToPop = 1), c);
    }
  },
  fh = dh;
const zn = /* @__PURE__ */ $n(fh);
function gh(e) {
  if (Array.isArray(e)) return e;
}
function ph(e, t) {
  var n = [],
    o = !0,
    r = !1,
    a = void 0;
  try {
    for (
      var i = e[Symbol.iterator](), s;
      !(o = (s = i.next()).done) && (n.push(s.value), !(t && n.length === t));
      o = !0
    );
  } catch (c) {
    (r = !0), (a = c);
  } finally {
    try {
      !o && i.return != null && i.return();
    } finally {
      if (r) throw a;
    }
  }
  return n;
}
function hh() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function br(e, t) {
  return gh(e) || ph(e, t) || hh();
}
function mh(e, t) {
  if (e == null) return {};
  var n = {},
    o = Object.keys(e),
    r,
    a;
  for (a = 0; a < o.length; a++)
    (r = o[a]), !(t.indexOf(r) >= 0) && (n[r] = e[r]);
  return n;
}
function bh(e, t) {
  if (e == null) return {};
  var n = mh(e, t),
    o,
    r;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      (o = a[r]),
        !(t.indexOf(o) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, o) &&
          (n[o] = e[o]);
  }
  return n;
}
function so(e) {
  "@babel/helpers - typeof";
  return (
    (so =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    so(e)
  );
}
function yh(e, t) {
  if (so(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(e, t || "default");
    if (so(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function vh(e) {
  var t = yh(e, "string");
  return so(t) == "symbol" ? t : t + "";
}
function lo(e, t, n) {
  return (
    (t = vh(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Ti(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
  return o;
}
function wh(e) {
  if (Array.isArray(e)) return Ti(e);
}
function xh(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function Sh(e, t) {
  if (e) {
    if (typeof e == "string") return Ti(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ti(e, t);
  }
}
function Ch() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zt(e) {
  return wh(e) || xh(e) || Sh(e) || Ch();
}
var Wn = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  Ju = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function ed(e, t) {
  var n = Object.assign({}, e);
  return (
    rr(e) &&
      rr(t) &&
      Wn(t).forEach(function (o) {
        rr(t[o])
          ? o in e
            ? (n[o] = ed(e[o], t[o]))
            : Object.assign(n, lo({}, o, t[o]))
          : Object.assign(n, lo({}, o, t[o]));
      }),
    n
  );
}
var Oi = function (t) {
    for (
      var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1;
      r < n;
      r++
    )
      o[r - 1] = arguments[r];
    return o.reduce(function (a, i) {
      return ed(a, i);
    }, t);
  },
  Eh = function (t, n) {
    var o = Object.assign({}, t);
    if (n) for (var r = 0; r < n.length; r++) delete o[n[r]];
    return o;
  },
  rr = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  _h = function (t) {
    return (t || []).filter(Boolean);
  },
  ms = function (t) {
    return t[0] === "&";
  },
  kh = function (t) {
    return !ms(t);
  },
  rc = function (t) {
    return t.replace(/-(\w)/g, function (n, o) {
      return o.toUpperCase();
    });
  },
  Ah = function (t) {
    for (
      var n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        o = Wn(t),
        r = {},
        a = 0,
        i = o.length;
      a < i;
      a += 1
    ) {
      var s = o[a],
        c =
          Object.prototype.toString.call(t[s]) !== "[object Object]" || // style defs
          s[0] === ":" || // pseudo selectors
          s[0] === "@" || // @media / @keyframes / @supports / @font-face
          n.indexOf(s) >= 0;
      c && (r[s] = t[s]);
    }
    return r;
  },
  td = function (t, n) {
    for (
      var o = n.map(rc), r = Wn(t), a = {}, i = 0, s = r.length;
      i < s;
      i += 1
    ) {
      var c = r[i];
      (n.indexOf(c) >= 0 || o.indexOf(rc(c)) >= 0) && (a[c] = t[c]);
    }
    return a;
  },
  Mh = function e(t, n) {
    for (
      var o = Oi.apply(void 0, [{}, Eh(t, n)].concat(zt(Ju(td(t, n))))),
        r = Wn(o).filter(ms),
        a = 0,
        i = r.length;
      a < i;
      a += 1
    ) {
      var s = r[a],
        c = e(o[s], n);
      n.indexOf(s) >= 0 ? (delete o[s], (o = Oi({}, o, c))) : (o[s] = c);
    }
    return o;
  };
function ac(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      n.push.apply(n, o);
  }
  return n;
}
function ic(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? ac(Object(n), !0).forEach(function (o) {
          lo(e, o, n[o]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ac(Object(n)).forEach(function (o) {
            Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
          });
  }
  return e;
}
var Th = ["animationName"],
  Oh = function (t) {
    var n = t.style,
      o = t.className;
    return ic(
      ic(
        {},
        n
          ? {
              style: Ah(n, Th),
            }
          : {},
      ),
      o
        ? {
            className: o,
          }
        : {},
    );
  };
const nd = Oh;
var od = /* @__PURE__ */ pt(nd);
od.Provider;
var rd = function (t) {
    if (t) {
      if (typeof t == "string") return [t];
      if (!Array.isArray(t)) {
        var n = t;
        return Wn(t).reduce(function (o, r) {
          return o.concat(n[r] ? [r] : []);
        }, []);
      }
    } else return [];
    return t;
  },
  Nh = {},
  Dh = function (t) {
    return function (n, o) {
      var r = o || Nh;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var a;
      t.memoize.has(r)
        ? (a = t.memoize.get(r))
        : ((a = {}), t.memoize.set(r, a));
      var i = rd(n).join(" ");
      return i in a ? a[i] : (a[i] = t(n || [], o));
    };
  };
function sc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      n.push.apply(n, o);
  }
  return n;
}
function yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? sc(Object(n), !0).forEach(function (o) {
          lo(e, o, n[o]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : sc(Object(n)).forEach(function (o) {
            Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
          });
  }
  return e;
}
var Rh = function (t) {
    var n = t && Wn(t)[0];
    return n && n.split("__")[0].split("--")[0];
  },
  zh = function (t, n, o) {
    if (t) {
      var r = t.split(" ")[0],
        a = [].concat(
          zt(
            n.length === 0
              ? o.map(function (i) {
                  return "".concat(r, "--").concat(i.substring(1));
                })
              : [],
          ),
          zt(
            n.map(function (i) {
              return "".concat(r, "__").concat(i);
            }),
          ),
        );
      return n.length === 0 ? [t].concat(zt(a)) : a;
    }
  };
function ad(e) {
  var t = e.style,
    n = e.className,
    o = e.classNames,
    r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : nd,
    a = n || Rh(o) || (t == null ? void 0 : t.className),
    i =
      typeof t == "function"
        ? t
        : Dh(function (d, f) {
            var g = rd(d);
            zn(
              Array.isArray(g),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              zn(
                !f || rr(f),
                "Optional second parameter must be a plain object.",
              );
            var p = g.filter(ms),
              h = g.filter(kh),
              m =
                h.length > 0
                  ? function (C) {
                      return Ju(td(C, h));
                    }
                  : function (C) {
                      return [C];
                    },
              y = function () {
                var S =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return m(Mh(S, p));
              },
              x = zh(a, h, p);
            return ad(
              yn(
                yn(
                  yn(
                    {},
                    (t || f) && {
                      style: Oi.apply(void 0, [{}].concat(zt(y(f)), zt(y(t)))),
                    },
                  ),
                  x && {
                    className: x.join(" "),
                  },
                ),
                o && {
                  classNames: o,
                },
              ),
              r,
            );
          }),
    s = yn(
      {},
      typeof t == "function"
        ? t
        : {
            style: t,
          },
    ),
    c = zt(
      new Set(
        [].concat(
          zt(s.className ? s.className.split(" ") : []),
          zt(a ? a.split(" ") : []),
        ),
      ),
    ),
    u = o
      ? _h(
          c.map(function (d) {
            return o[d];
          }),
        )
      : c,
    l = r(
      yn(
        yn({}, s),
        u.length > 0
          ? {
              className: u.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(i, l), i;
}
function lc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      n.push.apply(n, o);
  }
  return n;
}
function Yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? lc(Object(n), !0).forEach(function (o) {
          lo(e, o, n[o]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : lc(Object(n)).forEach(function (o) {
            Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
          });
  }
  return e;
}
var Ih = function () {
    for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
      n[o] = arguments[o];
    return n.reduce(function (r, a) {
      return Yn(
        Yn(Yn({}, r), typeof a == "function" ? a : {}),
        {},
        {
          style: Yn(Yn({}, r.style), typeof a == "function" ? a.style : a),
        },
      );
    }, {});
  },
  bs = function (t, n, o) {
    var r = n.style,
      a = n.className,
      i = n.classNames,
      s = Ye(od),
      c = Oe(
        function () {
          return ad(
            {
              style: r,
              className: a,
              classNames: i,
            },
            s,
          );
        },
        [r, a, i, s],
      );
    return c(o, t);
  },
  Ni = { exports: {} },
  Fo = { exports: {} },
  me = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cc;
function Lh() {
  if (cc) return me;
  cc = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    t = e ? Symbol.for("react.element") : 60103,
    n = e ? Symbol.for("react.portal") : 60106,
    o = e ? Symbol.for("react.fragment") : 60107,
    r = e ? Symbol.for("react.strict_mode") : 60108,
    a = e ? Symbol.for("react.profiler") : 60114,
    i = e ? Symbol.for("react.provider") : 60109,
    s = e ? Symbol.for("react.context") : 60110,
    c = e ? Symbol.for("react.async_mode") : 60111,
    u = e ? Symbol.for("react.concurrent_mode") : 60111,
    l = e ? Symbol.for("react.forward_ref") : 60112,
    d = e ? Symbol.for("react.suspense") : 60113,
    f = e ? Symbol.for("react.suspense_list") : 60120,
    g = e ? Symbol.for("react.memo") : 60115,
    p = e ? Symbol.for("react.lazy") : 60116,
    h = e ? Symbol.for("react.block") : 60121,
    m = e ? Symbol.for("react.fundamental") : 60117,
    y = e ? Symbol.for("react.responder") : 60118,
    x = e ? Symbol.for("react.scope") : 60119;
  function C(w) {
    if (typeof w == "object" && w !== null) {
      var M = w.$$typeof;
      switch (M) {
        case t:
          switch (((w = w.type), w)) {
            case c:
            case u:
            case o:
            case a:
            case r:
            case d:
              return w;
            default:
              switch (((w = w && w.$$typeof), w)) {
                case s:
                case l:
                case p:
                case g:
                case i:
                  return w;
                default:
                  return M;
              }
          }
        case n:
          return M;
      }
    }
  }
  function S(w) {
    return C(w) === u;
  }
  return (
    (me.AsyncMode = c),
    (me.ConcurrentMode = u),
    (me.ContextConsumer = s),
    (me.ContextProvider = i),
    (me.Element = t),
    (me.ForwardRef = l),
    (me.Fragment = o),
    (me.Lazy = p),
    (me.Memo = g),
    (me.Portal = n),
    (me.Profiler = a),
    (me.StrictMode = r),
    (me.Suspense = d),
    (me.isAsyncMode = function (w) {
      return S(w) || C(w) === c;
    }),
    (me.isConcurrentMode = S),
    (me.isContextConsumer = function (w) {
      return C(w) === s;
    }),
    (me.isContextProvider = function (w) {
      return C(w) === i;
    }),
    (me.isElement = function (w) {
      return typeof w == "object" && w !== null && w.$$typeof === t;
    }),
    (me.isForwardRef = function (w) {
      return C(w) === l;
    }),
    (me.isFragment = function (w) {
      return C(w) === o;
    }),
    (me.isLazy = function (w) {
      return C(w) === p;
    }),
    (me.isMemo = function (w) {
      return C(w) === g;
    }),
    (me.isPortal = function (w) {
      return C(w) === n;
    }),
    (me.isProfiler = function (w) {
      return C(w) === a;
    }),
    (me.isStrictMode = function (w) {
      return C(w) === r;
    }),
    (me.isSuspense = function (w) {
      return C(w) === d;
    }),
    (me.isValidElementType = function (w) {
      return (
        typeof w == "string" ||
        typeof w == "function" ||
        w === o ||
        w === u ||
        w === a ||
        w === r ||
        w === d ||
        w === f ||
        (typeof w == "object" &&
          w !== null &&
          (w.$$typeof === p ||
            w.$$typeof === g ||
            w.$$typeof === i ||
            w.$$typeof === s ||
            w.$$typeof === l ||
            w.$$typeof === m ||
            w.$$typeof === y ||
            w.$$typeof === x ||
            w.$$typeof === h))
      );
    }),
    (me.typeOf = C),
    me
  );
}
var be = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uc;
function Ph() {
  return (
    uc ||
      ((uc = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = typeof Symbol == "function" && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            n = e ? Symbol.for("react.portal") : 60106,
            o = e ? Symbol.for("react.fragment") : 60107,
            r = e ? Symbol.for("react.strict_mode") : 60108,
            a = e ? Symbol.for("react.profiler") : 60114,
            i = e ? Symbol.for("react.provider") : 60109,
            s = e ? Symbol.for("react.context") : 60110,
            c = e ? Symbol.for("react.async_mode") : 60111,
            u = e ? Symbol.for("react.concurrent_mode") : 60111,
            l = e ? Symbol.for("react.forward_ref") : 60112,
            d = e ? Symbol.for("react.suspense") : 60113,
            f = e ? Symbol.for("react.suspense_list") : 60120,
            g = e ? Symbol.for("react.memo") : 60115,
            p = e ? Symbol.for("react.lazy") : 60116,
            h = e ? Symbol.for("react.block") : 60121,
            m = e ? Symbol.for("react.fundamental") : 60117,
            y = e ? Symbol.for("react.responder") : 60118,
            x = e ? Symbol.for("react.scope") : 60119;
          function C(K) {
            return (
              typeof K == "string" ||
              typeof K == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              K === o ||
              K === u ||
              K === a ||
              K === r ||
              K === d ||
              K === f ||
              (typeof K == "object" &&
                K !== null &&
                (K.$$typeof === p ||
                  K.$$typeof === g ||
                  K.$$typeof === i ||
                  K.$$typeof === s ||
                  K.$$typeof === l ||
                  K.$$typeof === m ||
                  K.$$typeof === y ||
                  K.$$typeof === x ||
                  K.$$typeof === h))
            );
          }
          function S(K) {
            if (typeof K == "object" && K !== null) {
              var ye = K.$$typeof;
              switch (ye) {
                case t:
                  var Pe = K.type;
                  switch (Pe) {
                    case c:
                    case u:
                    case o:
                    case a:
                    case r:
                    case d:
                      return Pe;
                    default:
                      var Se = Pe && Pe.$$typeof;
                      switch (Se) {
                        case s:
                        case l:
                        case p:
                        case g:
                        case i:
                          return Se;
                        default:
                          return ye;
                      }
                  }
                case n:
                  return ye;
              }
            }
          }
          var w = c,
            M = u,
            O = s,
            _ = i,
            L = t,
            I = l,
            P = o,
            $ = p,
            B = g,
            v = n,
            k = a,
            E = r,
            N = d,
            z = !1;
          function T(K) {
            return (
              z ||
                ((z = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              A(K) || S(K) === c
            );
          }
          function A(K) {
            return S(K) === u;
          }
          function D(K) {
            return S(K) === s;
          }
          function H(K) {
            return S(K) === i;
          }
          function W(K) {
            return typeof K == "object" && K !== null && K.$$typeof === t;
          }
          function V(K) {
            return S(K) === l;
          }
          function Y(K) {
            return S(K) === o;
          }
          function Z(K) {
            return S(K) === p;
          }
          function X(K) {
            return S(K) === g;
          }
          function Q(K) {
            return S(K) === n;
          }
          function te(K) {
            return S(K) === a;
          }
          function q(K) {
            return S(K) === r;
          }
          function fe(K) {
            return S(K) === d;
          }
          (be.AsyncMode = w),
            (be.ConcurrentMode = M),
            (be.ContextConsumer = O),
            (be.ContextProvider = _),
            (be.Element = L),
            (be.ForwardRef = I),
            (be.Fragment = P),
            (be.Lazy = $),
            (be.Memo = B),
            (be.Portal = v),
            (be.Profiler = k),
            (be.StrictMode = E),
            (be.Suspense = N),
            (be.isAsyncMode = T),
            (be.isConcurrentMode = A),
            (be.isContextConsumer = D),
            (be.isContextProvider = H),
            (be.isElement = W),
            (be.isForwardRef = V),
            (be.isFragment = Y),
            (be.isLazy = Z),
            (be.isMemo = X),
            (be.isPortal = Q),
            (be.isProfiler = te),
            (be.isStrictMode = q),
            (be.isSuspense = fe),
            (be.isValidElementType = C),
            (be.typeOf = S);
        })()),
    be
  );
}
var dc;
function id() {
  return (
    dc ||
      ((dc = 1),
      process.env.NODE_ENV === "production"
        ? (Fo.exports = Lh())
        : (Fo.exports = Ph())),
    Fo.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ga, fc;
function Hh() {
  if (fc) return Ga;
  fc = 1;
  var e = Object.getOwnPropertySymbols,
    t = Object.prototype.hasOwnProperty,
    n = Object.prototype.propertyIsEnumerable;
  function o(a) {
    if (a == null)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined",
      );
    return Object(a);
  }
  function r() {
    try {
      if (!Object.assign) return !1;
      var a = new String("abc");
      if (((a[5] = "de"), Object.getOwnPropertyNames(a)[0] === "5")) return !1;
      for (var i = {}, s = 0; s < 10; s++) i["_" + String.fromCharCode(s)] = s;
      var c = Object.getOwnPropertyNames(i).map(function (l) {
        return i[l];
      });
      if (c.join("") !== "0123456789") return !1;
      var u = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function (l) {
          u[l] = l;
        }),
        Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst"
      );
    } catch {
      return !1;
    }
  }
  return (
    (Ga = r()
      ? Object.assign
      : function (a, i) {
          for (var s, c = o(a), u, l = 1; l < arguments.length; l++) {
            s = Object(arguments[l]);
            for (var d in s) t.call(s, d) && (c[d] = s[d]);
            if (e) {
              u = e(s);
              for (var f = 0; f < u.length; f++)
                n.call(s, u[f]) && (c[u[f]] = s[u[f]]);
            }
          }
          return c;
        }),
    Ga
  );
}
var Qa, gc;
function ys() {
  if (gc) return Qa;
  gc = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (Qa = e), Qa;
}
var Ja, pc;
function sd() {
  return (
    pc ||
      ((pc = 1), (Ja = Function.call.bind(Object.prototype.hasOwnProperty))),
    Ja
  );
}
var ei, hc;
function jh() {
  if (hc) return ei;
  hc = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = ys(),
      n = {},
      o = sd();
    e = function (a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {}
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
                (c || "React class") +
                  ": " +
                  s +
                  " type `" +
                  l +
                  "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                  typeof a[l] +
                  "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
              );
              throw ((f.name = "Invariant Violation"), f);
            }
            d = a[l](i, l, c, s, null, t);
          } catch (p) {
            d = p;
          }
          if (
            (d &&
              !(d instanceof Error) &&
              e(
                (c || "React class") +
                  ": type specification of " +
                  s +
                  " `" +
                  l +
                  "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
                  typeof d +
                  ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
              ),
            d instanceof Error && !(d.message in n))
          ) {
            n[d.message] = !0;
            var g = u ? u() : "";
            e("Failed " + s + " type: " + d.message + (g ?? ""));
          }
        }
    }
  }
  return (
    (r.resetWarningCache = function () {
      process.env.NODE_ENV !== "production" && (n = {});
    }),
    (ei = r),
    ei
  );
}
var ti, mc;
function Fh() {
  if (mc) return ti;
  mc = 1;
  var e = id(),
    t = Hh(),
    n = ys(),
    o = sd(),
    r = jh(),
    a = function () {};
  process.env.NODE_ENV !== "production" &&
    (a = function (s) {
      var c = "Warning: " + s;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {}
    });
  function i() {
    return null;
  }
  return (
    (ti = function (s, c) {
      var u = typeof Symbol == "function" && Symbol.iterator,
        l = "@@iterator";
      function d(A) {
        var D = A && ((u && A[u]) || A[l]);
        if (typeof D == "function") return D;
      }
      var f = "<<anonymous>>",
        g = {
          array: y("array"),
          bigint: y("bigint"),
          bool: y("boolean"),
          func: y("function"),
          number: y("number"),
          object: y("object"),
          string: y("string"),
          symbol: y("symbol"),
          any: x(),
          arrayOf: C,
          element: S(),
          elementType: w(),
          instanceOf: M,
          node: I(),
          objectOf: _,
          oneOf: O,
          oneOfType: L,
          shape: $,
          exact: B,
        };
      function p(A, D) {
        return A === D ? A !== 0 || 1 / A === 1 / D : A !== A && D !== D;
      }
      function h(A, D) {
        (this.message = A),
          (this.data = D && typeof D == "object" ? D : {}),
          (this.stack = "");
      }
      h.prototype = Error.prototype;
      function m(A) {
        if (process.env.NODE_ENV !== "production")
          var D = {},
            H = 0;
        function W(Y, Z, X, Q, te, q, fe) {
          if (((Q = Q || f), (q = q || X), fe !== n)) {
            if (c) {
              var K = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types",
              );
              throw ((K.name = "Invariant Violation"), K);
            } else if (
              process.env.NODE_ENV !== "production" &&
              typeof console < "u"
            ) {
              var ye = Q + ":" + X;
              !D[ye] && // Avoid spamming the console because they are often not actionable except for lib authors
                H < 3 &&
                (a(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    q +
                    "` prop on `" +
                    Q +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (D[ye] = !0),
                H++);
            }
          }
          return Z[X] == null
            ? Y
              ? Z[X] === null
                ? new h(
                    "The " +
                      te +
                      " `" +
                      q +
                      "` is marked as required " +
                      ("in `" + Q + "`, but its value is `null`."),
                  )
                : new h(
                    "The " +
                      te +
                      " `" +
                      q +
                      "` is marked as required in " +
                      ("`" + Q + "`, but its value is `undefined`."),
                  )
              : null
            : A(Z, X, Q, te, q);
        }
        var V = W.bind(null, !1);
        return (V.isRequired = W.bind(null, !0)), V;
      }
      function y(A) {
        function D(H, W, V, Y, Z, X) {
          var Q = H[W],
            te = E(Q);
          if (te !== A) {
            var q = N(Q);
            return new h(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + q + "` supplied to `" + V + "`, expected ") +
                ("`" + A + "`."),
              { expectedType: A },
            );
          }
          return null;
        }
        return m(D);
      }
      function x() {
        return m(i);
      }
      function C(A) {
        function D(H, W, V, Y, Z) {
          if (typeof A != "function")
            return new h(
              "Property `" +
                Z +
                "` of component `" +
                V +
                "` has invalid PropType notation inside arrayOf.",
            );
          var X = H[W];
          if (!Array.isArray(X)) {
            var Q = E(X);
            return new h(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + Q + "` supplied to `" + V + "`, expected an array."),
            );
          }
          for (var te = 0; te < X.length; te++) {
            var q = A(X, te, V, Y, Z + "[" + te + "]", n);
            if (q instanceof Error) return q;
          }
          return null;
        }
        return m(D);
      }
      function S() {
        function A(D, H, W, V, Y) {
          var Z = D[H];
          if (!s(Z)) {
            var X = E(Z);
            return new h(
              "Invalid " +
                V +
                " `" +
                Y +
                "` of type " +
                ("`" +
                  X +
                  "` supplied to `" +
                  W +
                  "`, expected a single ReactElement."),
            );
          }
          return null;
        }
        return m(A);
      }
      function w() {
        function A(D, H, W, V, Y) {
          var Z = D[H];
          if (!e.isValidElementType(Z)) {
            var X = E(Z);
            return new h(
              "Invalid " +
                V +
                " `" +
                Y +
                "` of type " +
                ("`" +
                  X +
                  "` supplied to `" +
                  W +
                  "`, expected a single ReactElement type."),
            );
          }
          return null;
        }
        return m(A);
      }
      function M(A) {
        function D(H, W, V, Y, Z) {
          if (!(H[W] instanceof A)) {
            var X = A.name || f,
              Q = T(H[W]);
            return new h(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + Q + "` supplied to `" + V + "`, expected ") +
                ("instance of `" + X + "`."),
            );
          }
          return null;
        }
        return m(D);
      }
      function O(A) {
        if (!Array.isArray(A))
          return (
            process.env.NODE_ENV !== "production" &&
              (arguments.length > 1
                ? a(
                    "Invalid arguments supplied to oneOf, expected an array, got " +
                      arguments.length +
                      " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).",
                  )
                : a("Invalid argument supplied to oneOf, expected an array.")),
            i
          );
        function D(H, W, V, Y, Z) {
          for (var X = H[W], Q = 0; Q < A.length; Q++)
            if (p(X, A[Q])) return null;
          var te = JSON.stringify(A, function (fe, K) {
            var ye = N(K);
            return ye === "symbol" ? String(K) : K;
          });
          return new h(
            "Invalid " +
              Y +
              " `" +
              Z +
              "` of value `" +
              String(X) +
              "` " +
              ("supplied to `" + V + "`, expected one of " + te + "."),
          );
        }
        return m(D);
      }
      function _(A) {
        function D(H, W, V, Y, Z) {
          if (typeof A != "function")
            return new h(
              "Property `" +
                Z +
                "` of component `" +
                V +
                "` has invalid PropType notation inside objectOf.",
            );
          var X = H[W],
            Q = E(X);
          if (Q !== "object")
            return new h(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + Q + "` supplied to `" + V + "`, expected an object."),
            );
          for (var te in X)
            if (o(X, te)) {
              var q = A(X, te, V, Y, Z + "." + te, n);
              if (q instanceof Error) return q;
            }
          return null;
        }
        return m(D);
      }
      function L(A) {
        if (!Array.isArray(A))
          return (
            process.env.NODE_ENV !== "production" &&
              a(
                "Invalid argument supplied to oneOfType, expected an instance of array.",
              ),
            i
          );
        for (var D = 0; D < A.length; D++) {
          var H = A[D];
          if (typeof H != "function")
            return (
              a(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                  z(H) +
                  " at index " +
                  D +
                  ".",
              ),
              i
            );
        }
        function W(V, Y, Z, X, Q) {
          for (var te = [], q = 0; q < A.length; q++) {
            var fe = A[q],
              K = fe(V, Y, Z, X, Q, n);
            if (K == null) return null;
            K.data && o(K.data, "expectedType") && te.push(K.data.expectedType);
          }
          var ye =
            te.length > 0
              ? ", expected one of type [" + te.join(", ") + "]"
              : "";
          return new h(
            "Invalid " +
              X +
              " `" +
              Q +
              "` supplied to " +
              ("`" + Z + "`" + ye + "."),
          );
        }
        return m(W);
      }
      function I() {
        function A(D, H, W, V, Y) {
          return v(D[H])
            ? null
            : new h(
                "Invalid " +
                  V +
                  " `" +
                  Y +
                  "` supplied to " +
                  ("`" + W + "`, expected a ReactNode."),
              );
        }
        return m(A);
      }
      function P(A, D, H, W, V) {
        return new h(
          (A || "React class") +
            ": " +
            D +
            " type `" +
            H +
            "." +
            W +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            V +
            "`.",
        );
      }
      function $(A) {
        function D(H, W, V, Y, Z) {
          var X = H[W],
            Q = E(X);
          if (Q !== "object")
            return new h(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          for (var te in A) {
            var q = A[te];
            if (typeof q != "function") return P(V, Y, Z, te, N(q));
            var fe = q(X, te, V, Y, Z + "." + te, n);
            if (fe) return fe;
          }
          return null;
        }
        return m(D);
      }
      function B(A) {
        function D(H, W, V, Y, Z) {
          var X = H[W],
            Q = E(X);
          if (Q !== "object")
            return new h(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          var te = t({}, H[W], A);
          for (var q in te) {
            var fe = A[q];
            if (o(A, q) && typeof fe != "function") return P(V, Y, Z, q, N(fe));
            if (!fe)
              return new h(
                "Invalid " +
                  Y +
                  " `" +
                  Z +
                  "` key `" +
                  q +
                  "` supplied to `" +
                  V +
                  "`.\nBad object: " +
                  JSON.stringify(H[W], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(A), null, "  "),
              );
            var K = fe(X, q, V, Y, Z + "." + q, n);
            if (K) return K;
          }
          return null;
        }
        return m(D);
      }
      function v(A) {
        switch (typeof A) {
          case "number":
          case "string":
          case "undefined":
            return !0;
          case "boolean":
            return !A;
          case "object":
            if (Array.isArray(A)) return A.every(v);
            if (A === null || s(A)) return !0;
            var D = d(A);
            if (D) {
              var H = D.call(A),
                W;
              if (D !== A.entries) {
                for (; !(W = H.next()).done; ) if (!v(W.value)) return !1;
              } else
                for (; !(W = H.next()).done; ) {
                  var V = W.value;
                  if (V && !v(V[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function k(A, D) {
        return A === "symbol"
          ? !0
          : D
            ? D["@@toStringTag"] === "Symbol" ||
              (typeof Symbol == "function" && D instanceof Symbol)
            : !1;
      }
      function E(A) {
        var D = typeof A;
        return Array.isArray(A)
          ? "array"
          : A instanceof RegExp
            ? "object"
            : k(D, A)
              ? "symbol"
              : D;
      }
      function N(A) {
        if (typeof A > "u" || A === null) return "" + A;
        var D = E(A);
        if (D === "object") {
          if (A instanceof Date) return "date";
          if (A instanceof RegExp) return "regexp";
        }
        return D;
      }
      function z(A) {
        var D = N(A);
        switch (D) {
          case "array":
          case "object":
            return "an " + D;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + D;
          default:
            return D;
        }
      }
      function T(A) {
        return !A.constructor || !A.constructor.name ? f : A.constructor.name;
      }
      return (
        (g.checkPropTypes = r),
        (g.resetWarningCache = r.resetWarningCache),
        (g.PropTypes = g),
        g
      );
    }),
    ti
  );
}
var ni, bc;
function Bh() {
  if (bc) return ni;
  bc = 1;
  var e = ys();
  function t() {}
  function n() {}
  return (
    (n.resetWarningCache = t),
    (ni = function () {
      function o(i, s, c, u, l, d) {
        if (d !== e) {
          var f = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((f.name = "Invariant Violation"), f);
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
        resetWarningCache: t,
      };
      return (a.PropTypes = a), a;
    }),
    ni
  );
}
if (process.env.NODE_ENV !== "production") {
  var $h = id(),
    Wh = !0;
  Ni.exports = Fh()($h.isElement, Wh);
} else Ni.exports = Bh()();
var Vh = Ni.exports;
const G = /* @__PURE__ */ $n(Vh);
var ar = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  wt = {
    id: "__id__",
    display: "__display__",
  },
  yc = function (t, n) {
    zn(
      n === "id" || n === "display",
      'Second arg must be either "id" or "display", got: "'.concat(n, '"'),
    );
    var o = t.indexOf(wt.display),
      r = t.indexOf(wt.id);
    return (
      o < 0 && (o = null),
      r < 0 && (r = null),
      zn(
        o !== null || r !== null,
        "The markup '".concat(
          t,
          "' does not contain either of the placeholders '__id__' or '__display__'",
        ),
      ),
      o !== null && r !== null
        ? (n === "id" && r <= o) || (n === "display" && o <= r)
          ? 0
          : 1
        : 0
    );
  },
  qh = function (t) {
    var n = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (o) {
          var r = n.exec(o.toString()),
            a = br(r, 3),
            i = a[1],
            s = a[2];
          return (
            zn(
              !s,
              "RegExp flags are not supported. Change /"
                .concat(i, "/")
                .concat(s, " into /")
                .concat(i, "/"),
            ),
            "(".concat(i, ")")
          );
        })
        .join("|"),
      "g",
    );
  },
  ld = function (t) {
    var n = 0;
    return (
      t.indexOf("__id__") >= 0 && n++, t.indexOf("__display__") >= 0 && n++, n
    );
  },
  Uh = function () {},
  ko = function (t, n, o) {
    for (
      var r =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Uh,
        a = qh(
          n.map(function (w) {
            return w.regex;
          }),
        ),
        i = 2,
        s = n.map(function (w) {
          var M = w.markup,
            O = i;
          return (i += ld(M) + 1), O;
        }),
        c,
        u = 0,
        l = 0;
      (c = a.exec(t)) !== null;

    ) {
      var d = s.find(function (w) {
          return !!c[w];
        }),
        f = s.indexOf(d),
        g = n[f],
        p = g.markup,
        h = g.displayTransform,
        m = d + yc(p, "id"),
        y = d + yc(p, "display"),
        x = c[m],
        C = h(x, c[y]),
        S = t.substring(u, c.index);
      r(S, u, l),
        (l += S.length),
        o(c[0], c.index, l, x, C, f, u),
        (l += C.length),
        (u = a.lastIndex);
    }
    u < t.length && r(t.substring(u), u, l);
  },
  an = function (t, n) {
    var o = "";
    return (
      ko(
        t,
        n,
        function (r, a, i, s, c) {
          o += c;
        },
        function (r) {
          o += r;
        },
      ),
      o
    );
  },
  Be = function (t, n, o) {
    var r =
      arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
    if (typeof o != "number") return o;
    var a,
      i = function (u, l, d) {
        a === void 0 && d + u.length >= o && (a = l + o - d);
      },
      s = function (u, l, d, f, g, p, h) {
        a === void 0 &&
          d + g.length > o &&
          (r === "NULL" ? (a = null) : (a = l + (r === "END" ? u.length : 0)));
      };
    return ko(t, n, s, i), a === void 0 ? t.length : a;
  },
  oo = function (t, n, o, r) {
    return t.substring(0, n) + r + t.substring(o);
  },
  Yh = function (t, n, o, r) {
    var a = o.selectionStartBefore,
      i = o.selectionEndBefore,
      s = o.selectionEndAfter,
      c = an(t, r),
      u = c.length - n.length;
    a === "undefined" && (a = s + u),
      i === "undefined" && (i = a),
      a === i && i === s && c.length === n.length && (a = a - 1);
    var l = n.slice(a, s),
      d = Math.min(a, s),
      f = i;
    a === s && (f = Math.max(i, a + u));
    var g = Be(t, r, d, "START"),
      p = Be(t, r, f, "END"),
      h = Be(t, r, d, "NULL"),
      m = Be(t, r, f, "NULL"),
      y = h === null || m === null,
      x = oo(t, g, p, l);
    if (!y) {
      var C = an(x, r);
      if (C !== n) {
        for (d = 0; n[d] === C[d]; ) d++;
        (l = n.slice(d, s)),
          (f = c.lastIndexOf(n.substring(s))),
          (g = Be(t, r, d, "START")),
          (p = Be(t, r, f, "END")),
          (x = oo(t, g, p, l));
      }
    }
    return x;
  },
  vc = function (t, n, o) {
    var r = o,
      a = !1,
      i = function (c, u, l, d, f, g, p) {
        l <= o && l + f.length > o && ((r = l), (a = !0));
      };
    if ((ko(t, n, i), a)) return r;
  },
  Jn = function (t, n) {
    var o = [];
    return (
      ko(t, n, function (r, a, i, s, c, u, l) {
        o.push({
          id: s,
          display: c,
          childIndex: u,
          index: a,
          plainTextIndex: i,
        });
      }),
      o
    );
  },
  cd = function (t, n) {
    return "".concat(t, "-").concat(n);
  },
  Bo = function (t) {
    return Object.values(t).reduce(function (n, o) {
      var r = o.results;
      return n + r.length;
    }, 0);
  },
  Zh = function (t, n) {
    var o = Jn(t, n),
      r = o[o.length - 1];
    return r ? r.plainTextIndex + r.display.length : 0;
  },
  Kh = function (t) {
    var n = ar(t),
      o = t[t.indexOf(wt.display) + wt.display.length],
      r = t[t.indexOf(wt.id) + wt.id.length];
    return new RegExp(
      n
        .replace(wt.display, "([^".concat(ar(o || ""), "]+?)"))
        .replace(wt.id, "([^".concat(ar(r || ""), "]+?)")),
    );
  },
  qt = function (t) {
    return Nn.toArray(t).map(function (n) {
      var o = n.props,
        r = o.markup,
        a = o.regex,
        i = o.displayTransform;
      return {
        markup: r,
        regex: a ? Xh(a, r) : Kh(r),
        displayTransform:
          i ||
          function (s, c) {
            return c || s;
          },
      };
    });
  },
  Xh = function (t, n) {
    var o = new RegExp(t.toString() + "|").exec("").length - 1,
      r = ld(n);
    return (
      zn(
        o === r,
        "Number of capturing groups in RegExp "
          .concat(t.toString(), " (")
          .concat(
            o,
            ") does not match the number of placeholders in the markup '",
          )
          .concat(n, "' (")
          .concat(r, ")"),
      ),
      t
    );
  },
  Gh = function (t, n, o) {
    return t.replace(wt.id, n).replace(wt.display, o);
  },
  Qh = [
    {
      base: "A",
      letters:
        /(&#65;|&#9398;|&#65313;|&#192;|&#193;|&#194;|&#7846;|&#7844;|&#7850;|&#7848;|&#195;|&#256;|&#258;|&#7856;|&#7854;|&#7860;|&#7858;|&#550;|&#480;|&#196;|&#478;|&#7842;|&#197;|&#506;|&#461;|&#512;|&#514;|&#7840;|&#7852;|&#7862;|&#7680;|&#260;|&#570;|&#11375;|[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F])/g,
    },
    {
      base: "AA",
      letters: /(&#42802;|[\uA732])/g,
    },
    {
      base: "AE",
      letters: /(&#198;|&#508;|&#482;|[\u00C6\u01FC\u01E2])/g,
    },
    {
      base: "AO",
      letters: /(&#42804;|[\uA734])/g,
    },
    {
      base: "AU",
      letters: /(&#42806;|[\uA736])/g,
    },
    {
      base: "AV",
      letters: /(&#42808;|&#42810;|[\uA738\uA73A])/g,
    },
    {
      base: "AY",
      letters: /(&#42812;|[\uA73C])/g,
    },
    {
      base: "B",
      letters:
        /(&#66;|&#9399;|&#65314;|&#7682;|&#7684;|&#7686;|&#579;|&#386;|&#385;|[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181])/g,
    },
    {
      base: "C",
      letters:
        /(&#67;|&#9400;|&#65315;|&#262;|&#264;|&#266;|&#268;|&#199;|&#7688;|&#391;|&#571;|&#42814;|[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E])/g,
    },
    {
      base: "D",
      letters:
        /(&#68;|&#9401;|&#65316;|&#7690;|&#270;|&#7692;|&#7696;|&#7698;|&#7694;|&#272;|&#395;|&#394;|&#393;|&#42873;|&#208;|[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0])/g,
    },
    {
      base: "DZ",
      letters: /(&#497;|&#452;|[\u01F1\u01C4])/g,
    },
    {
      base: "Dz",
      letters: /(&#498;|&#453;|[\u01F2\u01C5])/g,
    },
    {
      base: "E",
      letters:
        /(&#69;|&#9402;|&#65317;|&#200;|&#201;|&#202;|&#7872;|&#7870;|&#7876;|&#7874;|&#7868;|&#274;|&#7700;|&#7702;|&#276;|&#278;|&#203;|&#7866;|&#282;|&#516;|&#518;|&#7864;|&#7878;|&#552;|&#7708;|&#280;|&#7704;|&#7706;|&#400;|&#398;|[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E])/g,
    },
    {
      base: "F",
      letters:
        /(&#70;|&#9403;|&#65318;|&#7710;|&#401;|&#42875;|[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B])/g,
    },
    {
      base: "G",
      letters:
        /(&#71;|&#9404;|&#65319;|&#500;|&#284;|&#7712;|&#286;|&#288;|&#486;|&#290;|&#484;|&#403;|&#42912;|&#42877;|&#42878;|[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E])/g,
    },
    {
      base: "H",
      letters:
        /(&#72;|&#9405;|&#65320;|&#292;|&#7714;|&#7718;|&#542;|&#7716;|&#7720;|&#7722;|&#294;|&#11367;|&#11381;|&#42893;|[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D])/g,
    },
    {
      base: "I",
      letters:
        /(&#73;|&#9406;|&#65321;|&#204;|&#205;|&#206;|&#296;|&#298;|&#300;|&#304;|&#207;|&#7726;|&#7880;|&#463;|&#520;|&#522;|&#7882;|&#302;|&#7724;|&#407;|[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197])/g,
    },
    {
      base: "J",
      letters:
        /(&#74;|&#9407;|&#65322;|&#308;|&#584;|[\u004A\u24BF\uFF2A\u0134\u0248])/g,
    },
    {
      base: "K",
      letters:
        /(&#75;|&#9408;|&#65323;|&#7728;|&#488;|&#7730;|&#310;|&#7732;|&#408;|&#11369;|&#42816;|&#42818;|&#42820;|&#42914;|[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2])/g,
    },
    {
      base: "L",
      letters:
        /(&#76;|&#9409;|&#65324;|&#319;|&#313;|&#317;|&#7734;|&#7736;|&#315;|&#7740;|&#7738;|&#321;|&#573;|&#11362;|&#11360;|&#42824;|&#42822;|&#42880;|[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780])/g,
    },
    {
      base: "LJ",
      letters: /(&#455;|[\u01C7])/g,
    },
    {
      base: "Lj",
      letters: /(&#456;|[\u01C8])/g,
    },
    {
      base: "M",
      letters:
        /(&#77;|&#9410;|&#65325;|&#7742;|&#7744;|&#7746;|&#11374;|&#412;|[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C])/g,
    },
    {
      base: "N",
      letters:
        /(&#78;|&#9411;|&#65326;|&#504;|&#323;|&#209;|&#7748;|&#327;|&#7750;|&#325;|&#7754;|&#7752;|&#544;|&#413;|&#42896;|&#42916;|&#330;|[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4\u014A])/g,
    },
    {
      base: "NJ",
      letters: /(&#458;|[\u01CA])/g,
    },
    {
      base: "Nj",
      letters: /(&#459;|[\u01CB])/g,
    },
    {
      base: "O",
      letters:
        /(&#79;|&#9412;|&#65327;|&#210;|&#211;|&#212;|&#7890;|&#7888;|&#7894;|&#7892;|&#213;|&#7756;|&#556;|&#7758;|&#332;|&#7760;|&#7762;|&#334;|&#558;|&#560;|&#214;|&#554;|&#7886;|&#336;|&#465;|&#524;|&#526;|&#416;|&#7900;|&#7898;|&#7904;|&#7902;|&#7906;|&#7884;|&#7896;|&#490;|&#492;|&#216;|&#510;|&#390;|&#415;|&#42826;|&#42828;|[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C])/g,
    },
    {
      base: "OE",
      letters: /(&#338;|[\u0152])/g,
    },
    {
      base: "OI",
      letters: /(&#418;|[\u01A2])/g,
    },
    {
      base: "OO",
      letters: /(&#42830;|[\uA74E])/g,
    },
    {
      base: "OU",
      letters: /(&#546;|[\u0222])/g,
    },
    {
      base: "P",
      letters:
        /(&#80;|&#9413;|&#65328;|&#7764;|&#7766;|&#420;|&#11363;|&#42832;|&#42834;|&#42836;|[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754])/g,
    },
    {
      base: "Q",
      letters:
        /(&#81;|&#9414;|&#65329;|&#42838;|&#42840;|&#586;|[\u0051\u24C6\uFF31\uA756\uA758\u024A])/g,
    },
    {
      base: "R",
      letters:
        /(&#82;|&#9415;|&#65330;|&#340;|&#7768;|&#344;|&#528;|&#530;|&#7770;|&#7772;|&#342;|&#7774;|&#588;|&#11364;|&#42842;|&#42918;|&#42882;|[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782])/g,
    },
    {
      base: "S",
      letters:
        /(&#83;|&#9416;|&#65331;|&#7838;|&#346;|&#7780;|&#348;|&#7776;|&#352;|&#7782;|&#7778;|&#7784;|&#536;|&#350;|&#11390;|&#42920;|&#42884;|[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784])/g,
    },
    {
      base: "T",
      letters:
        /(&#84;|&#9417;|&#65332;|&#7786;|&#356;|&#7788;|&#538;|&#354;|&#7792;|&#7790;|&#358;|&#428;|&#430;|&#574;|&#42886;|[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786])/g,
    },
    {
      base: "TH",
      letters: /(&#222;|[\u00DE])/g,
    },
    {
      base: "TZ",
      letters: /(&#42792;|[\uA728])/g,
    },
    {
      base: "U",
      letters:
        /(&#85;|&#9418;|&#65333;|&#217;|&#218;|&#219;|&#360;|&#7800;|&#362;|&#7802;|&#364;|&#220;|&#475;|&#471;|&#469;|&#473;|&#7910;|&#366;|&#368;|&#467;|&#532;|&#534;|&#431;|&#7914;|&#7912;|&#7918;|&#7916;|&#7920;|&#7908;|&#7794;|&#370;|&#7798;|&#7796;|&#580;|[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244])/g,
    },
    {
      base: "V",
      letters:
        /(&#86;|&#9419;|&#65334;|&#7804;|&#7806;|&#434;|&#42846;|&#581;|[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245])/g,
    },
    {
      base: "VY",
      letters: /(&#42848;|[\uA760])/g,
    },
    {
      base: "W",
      letters:
        /(&#87;|&#9420;|&#65335;|&#7808;|&#7810;|&#372;|&#7814;|&#7812;|&#7816;|&#11378;|[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72])/g,
    },
    {
      base: "X",
      letters:
        /(&#88;|&#9421;|&#65336;|&#7818;|&#7820;|[\u0058\u24CD\uFF38\u1E8A\u1E8C])/g,
    },
    {
      base: "Y",
      letters:
        /(&#89;|&#9422;|&#65337;|&#7922;|&#221;|&#374;|&#7928;|&#562;|&#7822;|&#376;|&#7926;|&#7924;|&#435;|&#590;|&#7934;|[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE])/g,
    },
    {
      base: "Z",
      letters:
        /(&#90;|&#9423;|&#65338;|&#377;|&#7824;|&#379;|&#381;|&#7826;|&#7828;|&#437;|&#548;|&#11391;|&#11371;|&#42850;|[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762])/g,
    },
    {
      base: "a",
      letters:
        /(&#97;|&#9424;|&#65345;|&#7834;|&#224;|&#225;|&#226;|&#7847;|&#7845;|&#7851;|&#7849;|&#227;|&#257;|&#259;|&#7857;|&#7855;|&#7861;|&#7859;|&#551;|&#481;|&#228;|&#479;|&#7843;|&#229;|&#507;|&#462;|&#513;|&#515;|&#7841;|&#7853;|&#7863;|&#7681;|&#261;|&#11365;|&#592;|[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250])/g,
    },
    {
      base: "aa",
      letters: /(&#42803;|[\uA733])/g,
    },
    {
      base: "ae",
      letters: /(&#230;|&#509;|&#483;|[\u00E6\u01FD\u01E3])/g,
    },
    {
      base: "ao",
      letters: /(&#42805;|[\uA735])/g,
    },
    {
      base: "au",
      letters: /(&#42807;|[\uA737])/g,
    },
    {
      base: "av",
      letters: /(&#42809;|&#42811;|[\uA739\uA73B])/g,
    },
    {
      base: "ay",
      letters: /(&#42813;|[\uA73D])/g,
    },
    {
      base: "b",
      letters:
        /(&#98;|&#9425;|&#65346;|&#7683;|&#7685;|&#7687;|&#384;|&#387;|&#595;|[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253])/g,
    },
    {
      base: "c",
      letters:
        /(&#99;|&#9426;|&#65347;|&#263;|&#265;|&#267;|&#269;|&#231;|&#7689;|&#392;|&#572;|&#42815;|&#8580;|[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184])/g,
    },
    {
      base: "d",
      letters:
        /(&#100;|&#9427;|&#65348;|&#7691;|&#271;|&#7693;|&#7697;|&#7699;|&#7695;|&#273;|&#396;|&#598;|&#599;|&#42874;|&#240;|[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A\u00F0])/g,
    },
    {
      base: "dz",
      letters: /(&#499;|&#454;|[\u01F3\u01C6])/g,
    },
    {
      base: "e",
      letters:
        /(&#101;|&#9428;|&#65349;|&#232;|&#233;|&#234;|&#7873;|&#7871;|&#7877;|&#7875;|&#7869;|&#275;|&#7701;|&#7703;|&#277;|&#279;|&#235;|&#7867;|&#283;|&#517;|&#519;|&#7865;|&#7879;|&#553;|&#7709;|&#281;|&#7705;|&#7707;|&#583;|&#603;|&#477;|[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD])/g,
    },
    {
      base: "f",
      letters:
        /(&#102;|&#9429;|&#65350;|&#7711;|&#402;|&#42876;|[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C])/g,
    },
    {
      base: "g",
      letters:
        /(&#103;|&#9430;|&#65351;|&#501;|&#285;|&#7713;|&#287;|&#289;|&#487;|&#291;|&#485;|&#608;|&#42913;|&#7545;|&#42879;|[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F])/g,
    },
    {
      base: "h",
      letters:
        /(&#104;|&#9431;|&#65352;|&#293;|&#7715;|&#7719;|&#543;|&#7717;|&#7721;|&#7723;|&#7830;|&#295;|&#11368;|&#11382;|&#613;|[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265])/g,
    },
    {
      base: "hv",
      letters: /(&#405;|[\u0195])/g,
    },
    {
      base: "i",
      letters:
        /(&#105;|&#9432;|&#65353;|&#236;|&#237;|&#238;|&#297;|&#299;|&#301;|&#239;|&#7727;|&#7881;|&#464;|&#521;|&#523;|&#7883;|&#303;|&#7725;|&#616;|&#305;|[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131])/g,
    },
    {
      base: "ij",
      letters: /(&#307;|[\u0133])/g,
    },
    {
      base: "j",
      letters:
        /(&#106;|&#9433;|&#65354;|&#309;|&#496;|&#585;|[\u006A\u24D9\uFF4A\u0135\u01F0\u0249])/g,
    },
    {
      base: "k",
      letters:
        /(&#107;|&#9434;|&#65355;|&#7729;|&#489;|&#7731;|&#311;|&#7733;|&#409;|&#11370;|&#42817;|&#42819;|&#42821;|&#42915;|[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3])/g,
    },
    {
      base: "l",
      letters:
        /(&#108;|&#9435;|&#65356;|&#320;|&#314;|&#318;|&#7735;|&#7737;|&#316;|&#7741;|&#7739;|&#322;|&#410;|&#619;|&#11361;|&#42825;|&#42881;|&#42823;|[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u0142\u019A\u026B\u2C61\uA749\uA781\uA747])/g,
    },
    {
      base: "lj",
      letters: /(&#457;|[\u01C9])/g,
    },
    {
      base: "m",
      letters:
        /(&#109;|&#9436;|&#65357;|&#7743;|&#7745;|&#7747;|&#625;|&#623;|[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F])/g,
    },
    {
      base: "n",
      letters:
        /(&#110;|&#9437;|&#65358;|&#505;|&#324;|&#241;|&#7749;|&#328;|&#7751;|&#326;|&#7755;|&#7753;|&#414;|&#626;|&#329;|&#42897;|&#42917;|&#331;|[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5\u014B])/g,
    },
    {
      base: "nj",
      letters: /(&#460;|[\u01CC])/g,
    },
    {
      base: "o",
      letters:
        /(&#111;|&#9438;|&#65359;|&#242;|&#243;|&#244;|&#7891;|&#7889;|&#7895;|&#7893;|&#245;|&#7757;|&#557;|&#7759;|&#333;|&#7761;|&#7763;|&#335;|&#559;|&#561;|&#246;|&#555;|&#7887;|&#337;|&#466;|&#525;|&#527;|&#417;|&#7901;|&#7899;|&#7905;|&#7903;|&#7907;|&#7885;|&#7897;|&#491;|&#493;|&#248;|&#511;|&#596;|&#42827;|&#42829;|&#629;|[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275])/g,
    },
    {
      base: "oe",
      letters: /(&#339;|[\u0153])/g,
    },
    {
      base: "oi",
      letters: /(&#419;|[\u01A3])/g,
    },
    {
      base: "ou",
      letters: /(&#547;|[\u0223])/g,
    },
    {
      base: "oo",
      letters: /(&#42831;|[\uA74F])/g,
    },
    {
      base: "p",
      letters:
        /(&#112;|&#9439;|&#65360;|&#7765;|&#7767;|&#421;|&#7549;|&#42833;|&#42835;|&#42837;|[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755])/g,
    },
    {
      base: "q",
      letters:
        /(&#113;|&#9440;|&#65361;|&#587;|&#42839;|&#42841;|[\u0071\u24E0\uFF51\u024B\uA757\uA759])/g,
    },
    {
      base: "r",
      letters:
        /(&#114;|&#9441;|&#65362;|&#341;|&#7769;|&#345;|&#529;|&#531;|&#7771;|&#7773;|&#343;|&#7775;|&#589;|&#637;|&#42843;|&#42919;|&#42883;|[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783])/g,
    },
    {
      base: "s",
      letters:
        /(&#115;|&#9442;|&#65363;|&#347;|&#7781;|&#349;|&#7777;|&#353;|&#7783;|&#7779;|&#7785;|&#537;|&#351;|&#575;|&#42921;|&#42885;|&#7835;|&#383;|[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B\u017F])/g,
    },
    {
      base: "ss",
      letters: /(&#223;|[\u00DF])/g,
    },
    {
      base: "t",
      letters:
        /(&#116;|&#9443;|&#65364;|&#7787;|&#7831;|&#357;|&#7789;|&#539;|&#355;|&#7793;|&#7791;|&#359;|&#429;|&#648;|&#11366;|&#42887;|[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787])/g,
    },
    {
      base: "th",
      letters: /(&#254;|[\u00FE])/g,
    },
    {
      base: "tz",
      letters: /(&#42793;|[\uA729])/g,
    },
    {
      base: "u",
      letters:
        /(&#117;|&#9444;|&#65365;|&#249;|&#250;|&#251;|&#361;|&#7801;|&#363;|&#7803;|&#365;|&#252;|&#476;|&#472;|&#470;|&#474;|&#7911;|&#367;|&#369;|&#468;|&#533;|&#535;|&#432;|&#7915;|&#7913;|&#7919;|&#7917;|&#7921;|&#7909;|&#7795;|&#371;|&#7799;|&#7797;|&#649;|[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289])/g,
    },
    {
      base: "v",
      letters:
        /(&#118;|&#9445;|&#65366;|&#7805;|&#7807;|&#651;|&#42847;|&#652;|[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C])/g,
    },
    {
      base: "vy",
      letters: /(&#42849;|[\uA761])/g,
    },
    {
      base: "w",
      letters:
        /(&#119;|&#9446;|&#65367;|&#7809;|&#7811;|&#373;|&#7815;|&#7813;|&#7832;|&#7817;|&#11379;|[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73])/g,
    },
    {
      base: "x",
      letters:
        /(&#120;|&#9447;|&#65368;|&#7819;|&#7821;|[\u0078\u24E7\uFF58\u1E8B\u1E8D])/g,
    },
    {
      base: "y",
      letters:
        /(&#121;|&#9448;|&#65369;|&#7923;|&#253;|&#375;|&#7929;|&#563;|&#7823;|&#255;|&#7927;|&#7833;|&#7925;|&#436;|&#591;|&#7935;|[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF])/g,
    },
    {
      base: "z",
      letters:
        /(&#122;|&#9449;|&#65370;|&#378;|&#7825;|&#380;|&#382;|&#7827;|&#7829;|&#438;|&#549;|&#576;|&#11372;|&#42851;|[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763])/g,
    },
  ],
  Jh = function (t) {
    var n = t;
    return (
      Qh.forEach(function (o) {
        n = n.replace(o.letters, o.base);
      }),
      n
    );
  },
  wc = function (t) {
    return Jh(t).toLowerCase();
  },
  ud = function (t, n, o) {
    return o ? wc(t).indexOf(wc(n)) : t.toLowerCase().indexOf(n.toLowerCase());
  },
  e2 = function () {
    return !!document.documentMode;
  },
  Di = function (t) {
    return typeof t == "number";
  },
  t2 = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  n2 = function (t) {
    for (
      var n, o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), a = 1;
      a < o;
      a++
    )
      r[a - 1] = arguments[a];
    var i = (n = []).concat.apply(n, r);
    return Object.keys(t).reduce(function (s, c) {
      return (
        t.hasOwnProperty(c) &&
          !i.includes(c) &&
          t[c] !== void 0 &&
          (s[c] = t[c]),
        s
      );
    }, {});
  },
  o2 = ["style", "className", "classNames"];
function xc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      n.push.apply(n, o);
  }
  return n;
}
function Sc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? xc(Object(n), !0).forEach(function (o) {
          se(e, o, n[o]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : xc(Object(n)).forEach(function (o) {
            Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
          });
  }
  return e;
}
function jr(e, t) {
  var n = function (r) {
    var a = function (c) {
        var u = c.style,
          l = c.className,
          d = c.classNames,
          f = bh(c, o2),
          g = t ? t(f) : void 0,
          p = bs(
            e,
            {
              style: u,
              className: l,
              classNames: d,
            },
            g,
          );
        return /* @__PURE__ */ j.createElement(
          r,
          ot({}, f, {
            style: p,
          }),
        );
      },
      i = r.displayName || r.name || "Component";
    return (
      (a.displayName = "defaultStyle(".concat(i, ")")),
      /* @__PURE__ */ j.forwardRef(function (s, c) {
        return a(
          Sc(
            Sc({}, s),
            {},
            {
              ref: c,
            },
          ),
        );
      })
    );
  };
  return n;
}
var r2 = function (t, n) {
  return t.hasOwnProperty(n) ? t[n]++ : (t[n] = 0), n + "_" + t[n];
};
function dd(e) {
  var t = e.selectionStart,
    n = e.selectionEnd,
    o = e.value,
    r = o === void 0 ? "" : o,
    a = e.onCaretPositionChange,
    i = e.containerRef,
    s = e.children;
  e.singleLine;
  var c = e.style,
    u = de({
      left: void 0,
      top: void 0,
    }),
    l = br(u, 2),
    d = l[0],
    f = l[1],
    g = de(),
    p = br(g, 2),
    h = p[0],
    m = p[1];
  ie(function () {
    y();
  });
  var y = function () {
      if (h) {
        var v = h.offsetLeft,
          k = h.offsetTop;
        if (!(d.left === v && d.top === k)) {
          var E = {
            left: v,
            top: k,
          };
          f(E), a(E);
        }
      }
    },
    x = qt(s),
    C;
  n === t && (C = Be(r, x, t, "START"));
  var S = [],
    w = {},
    M = S,
    O = 0,
    _ = function (v, k, E) {
      if (Di(C) && C >= k && C <= k + v.length) {
        var N = C - k;
        M.push(I(v.substring(0, N), O)), (M = [I(v.substring(N), O)]);
      } else M.push(I(v, O));
      O++;
    },
    L = function (v, k, E, N, z, T, A) {
      var D = r2(w, N);
      M.push(P(N, z, T, D));
    },
    I = function (v, k) {
      return /* @__PURE__ */ j.createElement(
        "span",
        ot({}, c("substring"), {
          key: k,
        }),
        v,
      );
    },
    P = function (v, k, E, N) {
      var z = {
          id: v,
          display: k,
          key: N,
        },
        T = Nn.toArray(s)[E];
      return /* @__PURE__ */ j.cloneElement(T, z);
    },
    $ = function (v) {
      return /* @__PURE__ */ j.createElement(
        "span",
        ot({}, c("caret"), {
          ref: m,
          key: "caret",
        }),
        v,
      );
    };
  return (
    ko(r, x, L, _),
    M.push(" "),
    M !== S && S.push($(M)),
    /* @__PURE__ */ j.createElement(
      "div",
      ot({}, c, {
        ref: i,
      }),
      S,
    )
  );
}
dd.propTypes = {
  selectionStart: G.number,
  selectionEnd: G.number,
  value: G.string.isRequired,
  onCaretPositionChange: G.func.isRequired,
  containerRef: G.oneOfType([
    G.func,
    G.shape({
      current: typeof Element > "u" ? G.any : G.instanceOf(Element),
    }),
  ]),
  children: G.oneOfType([G.element, G.arrayOf(G.element)]).isRequired,
};
var a2 = jr(
    {
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
        wordWrap: null,
      },
      substring: {
        visibility: "hidden",
      },
    },
    function (e) {
      return {
        "&singleLine": e.singleLine,
      };
    },
  ),
  i2 = a2(dd);
function fd(e) {
  var t = e.id,
    n = e.focused,
    o = e.ignoreAccents,
    r = e.index,
    a = e.onClick,
    i = e.onMouseEnter,
    s = e.query,
    c = e.renderSuggestion,
    u = e.suggestion,
    l = e.style;
  e.className, e.classNames;
  var d = {
      onClick: a,
      onMouseEnter: i,
    },
    f = function () {
      var m = g(),
        y = p(m);
      return c ? c(u, s, y, r, n) : y;
    },
    g = function () {
      if (typeof u == "string") return u;
      var m = u.id,
        y = u.display;
      return m === void 0 || !y ? m : y;
    },
    p = function (m) {
      var y = ud(m, s, o);
      return y === -1
        ? /* @__PURE__ */ j.createElement("span", l("display"), m)
        : /* @__PURE__ */ j.createElement(
            "span",
            l("display"),
            m.substring(0, y),
            /* @__PURE__ */ j.createElement(
              "b",
              l("highlight"),
              m.substring(y, y + s.length),
            ),
            m.substring(y + s.length),
          );
    };
  return /* @__PURE__ */ j.createElement(
    "li",
    ot(
      {
        id: t,
        role: "option",
        "aria-selected": n,
      },
      d,
      l,
    ),
    f(),
  );
}
fd.propTypes = {
  id: G.string.isRequired,
  query: G.string.isRequired,
  index: G.number.isRequired,
  ignoreAccents: G.bool,
  suggestion: G.oneOfType([
    G.string,
    G.shape({
      id: G.oneOfType([G.string, G.number]).isRequired,
      display: G.string,
    }),
  ]).isRequired,
  renderSuggestion: G.func,
  focused: G.bool,
};
var s2 = jr(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  l2 = s2(fd);
function c2(e) {
  var t = e.style,
    n = e.className,
    o = e.classNames,
    r = bs(u2, {
      style: t,
      className: n,
      classNames: o,
    }),
    a = r("spinner");
  return /* @__PURE__ */ j.createElement(
    "div",
    r,
    /* @__PURE__ */ j.createElement(
      "div",
      a,
      /* @__PURE__ */ j.createElement("div", a(["element", "element1"])),
      /* @__PURE__ */ j.createElement("div", a(["element", "element2"])),
      /* @__PURE__ */ j.createElement("div", a(["element", "element3"])),
      /* @__PURE__ */ j.createElement("div", a(["element", "element4"])),
      /* @__PURE__ */ j.createElement("div", a(["element", "element5"])),
    ),
  );
}
var u2 = {};
function gd(e) {
  var t = e.id,
    n = e.suggestions,
    o = n === void 0 ? {} : n,
    r = e.a11ySuggestionsListLabel,
    a = e.focusIndex,
    i = e.position,
    s = e.left,
    c = e.right,
    u = e.top,
    l = e.scrollFocusedIntoView,
    d = e.isLoading,
    f = e.isOpened,
    g = e.onSelect,
    p =
      g === void 0
        ? function () {
            return null;
          }
        : g,
    h = e.ignoreAccents,
    m = e.containerRef,
    y = e.children,
    x = e.style,
    C = e.customSuggestionsContainer,
    S = e.onMouseDown,
    w = e.onMouseEnter,
    M = de(void 0),
    O = br(M, 2),
    _ = O[0],
    L = O[1];
  ie(
    function () {
      if (!(!_ || _.offsetHeight >= _.scrollHeight || !l)) {
        var E = _.scrollTop,
          N = _.children[a].getBoundingClientRect(),
          z = N.top,
          T = N.bottom,
          A = _.getBoundingClientRect(),
          D = A.top;
        (z = z - D + E),
          (T = T - D + E),
          z < E
            ? (_.scrollTop = z)
            : T > _.offsetHeight && (_.scrollTop = T - _.offsetHeight);
      }
    },
    [a, l, _],
  );
  var I = function () {
      var N = /* @__PURE__ */ j.createElement(
        "ul",
        ot(
          {
            ref: L,
            id: t,
            role: "listbox",
            "aria-label": r,
          },
          x("list"),
        ),
        Object.values(o).reduce(function (z, T) {
          var A = T.results,
            D = T.queryInfo;
          return [].concat(
            hr(z),
            hr(
              A.map(function (H, W) {
                return P(H, D, z.length + W);
              }),
            ),
          );
        }, []),
      );
      return C ? C(N) : N;
    },
    P = function (N, z, T) {
      var A = T === a,
        D = z.childIndex,
        H = z.query,
        W = Nn.toArray(y)[D].props.renderSuggestion;
      return /* @__PURE__ */ j.createElement(l2, {
        style: x("item"),
        key: "".concat(D, "-").concat(k(N)),
        id: cd(t, T),
        query: H,
        index: T,
        ignoreAccents: h,
        renderSuggestion: W,
        suggestion: N,
        focused: A,
        onClick: function () {
          return v(N, z);
        },
        onMouseEnter: function () {
          return B(T);
        },
      });
    },
    $ = function () {
      if (d)
        return /* @__PURE__ */ j.createElement(c2, {
          style: x("loadingIndicator"),
        });
    },
    B = function (N, z) {
      w && w(N);
    },
    v = function (N, z) {
      p(N, z);
    },
    k = function (N) {
      return typeof N == "string" ? N : N.id;
    };
  return f
    ? /* @__PURE__ */ j.createElement(
        "div",
        ot(
          {},
          Ih(
            {
              position: i || "absolute",
              left: s,
              right: c,
              top: u,
            },
            x,
          ),
          {
            onMouseDown: S,
            ref: m,
          },
        ),
        I(),
        $(),
      )
    : null;
}
gd.propTypes = {
  id: G.string.isRequired,
  suggestions: G.object.isRequired,
  a11ySuggestionsListLabel: G.string,
  focusIndex: G.number,
  position: G.string,
  left: G.number,
  right: G.number,
  top: G.number,
  scrollFocusedIntoView: G.bool,
  isLoading: G.bool,
  isOpened: G.bool.isRequired,
  onSelect: G.func,
  ignoreAccents: G.bool,
  customSuggestionsContainer: G.func,
  containerRef: G.oneOfType([
    G.func,
    G.shape({
      current: typeof Element > "u" ? G.any : G.instanceOf(Element),
    }),
  ]),
};
var d2 = jr({
    zIndex: 1,
    backgroundColor: "white",
    marginTop: 14,
    minWidth: 100,
    list: {
      margin: 0,
      padding: 0,
      listStyleType: "none",
    },
  }),
  f2 = d2(gd);
function Cc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      n.push.apply(n, o);
  }
  return n;
}
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Cc(Object(n), !0).forEach(function (o) {
          se(e, o, n[o]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Cc(Object(n)).forEach(function (o) {
            Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(n, o));
          });
  }
  return e;
}
function g2(e) {
  var t = p2();
  return function () {
    var o = mr(e),
      r;
    if (t) {
      var a = mr(this).constructor;
      r = Reflect.construct(o, arguments, a);
    } else r = o.apply(this, arguments);
    return uh(this, r);
  };
}
function p2() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {}),
      ),
      !0
    );
  } catch {
    return !1;
  }
}
var h2 = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t instanceof RegExp) return t;
    var o = n.allowSpaceInQuery,
      r = ar(t);
    return new RegExp(
      "(?:^|\\s)("
        .concat(r, "([^")
        .concat(o ? "" : "\\s")
        .concat(r, "]*))$"),
    );
  },
  m2 = function (t, n) {
    return t instanceof Array
      ? function (o, r) {
          for (var a = [], i = 0, s = t.length; i < s; ++i) {
            var c = t[i].display || t[i].id;
            ud(c, o, n) >= 0 && a.push(t[i]);
          }
          return a;
        }
      : t;
  },
  vn = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  $o = !1,
  pd = {
    /**
     * If set to `true` a regular text input element will be rendered
     * instead of a textarea
     */
    singleLine: G.bool,
    allowSpaceInQuery: G.bool,
    allowSuggestionsAboveCursor: G.bool,
    forceSuggestionsAboveCursor: G.bool,
    ignoreAccents: G.bool,
    a11ySuggestionsListLabel: G.string,
    value: G.string,
    onKeyDown: G.func,
    customSuggestionsContainer: G.func,
    onSelect: G.func,
    onBlur: G.func,
    onChange: G.func,
    suggestionsPortalHost:
      typeof Element > "u" ? G.any : G.PropTypes.instanceOf(Element),
    inputRef: G.oneOfType([
      G.func,
      G.shape({
        current: typeof Element > "u" ? G.any : G.instanceOf(Element),
      }),
    ]),
    children: G.oneOfType([G.element, G.arrayOf(G.element)]).isRequired,
  },
  vs = /* @__PURE__ */ (function (e) {
    ch(n, e);
    var t = g2(n);
    function n(o) {
      var r;
      return (
        sh(this, n),
        (r = t.call(this, o)),
        se(ue(r), "setContainerElement", function (a) {
          r.containerElement = a;
        }),
        se(ue(r), "getInputProps", function () {
          var a = r.props,
            i = a.readOnly,
            s = a.disabled,
            c = a.style,
            u = n2(
              r.props,
              ["style", "classNames", "className"],
              // substyle props
              t2(pd),
            );
          return ct(
            ct(
              ct(ct({}, u), c("input")),
              {},
              {
                value: r.getPlainText(),
                onScroll: r.updateHighlighterScroll,
              },
              !i &&
                !s && {
                  onChange: r.handleChange,
                  onSelect: r.handleSelect,
                  onKeyDown: r.handleKeyDown,
                  onBlur: r.handleBlur,
                  onCompositionStart: r.handleCompositionStart,
                  onCompositionEnd: r.handleCompositionEnd,
                },
            ),
            r.isOpened() && {
              role: "combobox",
              "aria-controls": r.uuidSuggestionsOverlay,
              "aria-expanded": !0,
              "aria-autocomplete": "list",
              "aria-haspopup": "listbox",
              "aria-activedescendant": cd(
                r.uuidSuggestionsOverlay,
                r.state.focusIndex,
              ),
            },
          );
        }),
        se(ue(r), "renderControl", function () {
          var a = r.props,
            i = a.singleLine,
            s = a.style,
            c = r.getInputProps();
          return /* @__PURE__ */ j.createElement(
            "div",
            s("control"),
            r.renderHighlighter(),
            i ? r.renderInput(c) : r.renderTextarea(c),
          );
        }),
        se(ue(r), "renderInput", function (a) {
          return /* @__PURE__ */ j.createElement(
            "input",
            ot(
              {
                type: "text",
                ref: r.setInputRef,
              },
              a,
            ),
          );
        }),
        se(ue(r), "renderTextarea", function (a) {
          return /* @__PURE__ */ j.createElement(
            "textarea",
            ot(
              {
                ref: r.setInputRef,
              },
              a,
            ),
          );
        }),
        se(ue(r), "setInputRef", function (a) {
          r.inputElement = a;
          var i = r.props.inputRef;
          typeof i == "function" ? i(a) : i && (i.current = a);
        }),
        se(ue(r), "setSuggestionsElement", function (a) {
          r.suggestionsElement = a;
        }),
        se(ue(r), "renderSuggestionsOverlay", function () {
          if (!Di(r.state.selectionStart)) return null;
          var a = r.state.suggestionsPosition,
            i = a.position,
            s = a.left,
            c = a.top,
            u = a.right,
            l = /* @__PURE__ */ j.createElement(
              f2,
              {
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
                a11ySuggestionsListLabel: r.props.a11ySuggestionsListLabel,
              },
              r.props.children,
            );
          return r.props.suggestionsPortalHost
            ? /* @__PURE__ */ H1.createPortal(l, r.props.suggestionsPortalHost)
            : l;
        }),
        se(ue(r), "renderHighlighter", function () {
          var a = r.state,
            i = a.selectionStart,
            s = a.selectionEnd,
            c = r.props,
            u = c.singleLine,
            l = c.children,
            d = c.value,
            f = c.style;
          return /* @__PURE__ */ j.createElement(
            i2,
            {
              containerRef: r.setHighlighterElement,
              style: f("highlighter"),
              value: d,
              singleLine: u,
              selectionStart: i,
              selectionEnd: s,
              onCaretPositionChange: r.handleCaretPositionChange,
            },
            l,
          );
        }),
        se(ue(r), "setHighlighterElement", function (a) {
          r.highlighterElement = a;
        }),
        se(ue(r), "handleCaretPositionChange", function (a) {
          r.setState({
            caretPosition: a,
          });
        }),
        se(ue(r), "getPlainText", function () {
          return an(r.props.value || "", qt(r.props.children));
        }),
        se(ue(r), "executeOnChange", function (a) {
          for (
            var i = arguments.length, s = new Array(i > 1 ? i - 1 : 0), c = 1;
            c < i;
            c++
          )
            s[c - 1] = arguments[c];
          if (r.props.onChange) {
            var u;
            return (u = r.props).onChange.apply(u, [a].concat(s));
          }
          if (r.props.valueLink) {
            var l;
            return (l = r.props.valueLink).requestChange.apply(
              l,
              [a.target.value].concat(s),
            );
          }
        }),
        se(ue(r), "handleChange", function (a) {
          if ((($o = !1), e2())) {
            var i =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (i.activeElement !== a.target) return;
          }
          var s = r.props.value || "",
            c = qt(r.props.children),
            u = a.target.value,
            l = r.state.selectionStart;
          l == null && (l = a.target.selectionStart);
          var d = r.state.selectionEnd;
          d == null && (d = a.target.selectionEnd);
          var f = Yh(
            s,
            u,
            {
              selectionStartBefore: l,
              selectionEndBefore: d,
              selectionEndAfter: a.target.selectionEnd,
            },
            c,
          );
          u = an(f, c);
          var g = a.target.selectionStart,
            p = a.target.selectionEnd,
            h = !1,
            m = vc(s, c, g);
          m !== void 0 &&
            r.state.selectionEnd > m &&
            ((g = m + (a.nativeEvent.data ? a.nativeEvent.data.length : 0)),
            (p = g),
            (h = !0)),
            r.setState({
              selectionStart: g,
              selectionEnd: p,
              setSelectionAfterMentionChange: h,
            });
          var y = Jn(f, c);
          a.nativeEvent.isComposing &&
            g === p &&
            r.updateMentionsQueries(r.inputElement.value, g);
          var x = {
            target: {
              value: f,
            },
          };
          r.executeOnChange(x, f, u, y);
        }),
        se(ue(r), "handleSelect", function (a) {
          if (
            (r.setState({
              selectionStart: a.target.selectionStart,
              selectionEnd: a.target.selectionEnd,
            }),
            !$o)
          ) {
            var i = r.inputElement;
            a.target.selectionStart === a.target.selectionEnd
              ? r.updateMentionsQueries(i.value, a.target.selectionStart)
              : r.clearSuggestions(),
              r.updateHighlighterScroll(),
              r.props.onSelect(a);
          }
        }),
        se(ue(r), "handleKeyDown", function (a) {
          var i = Bo(r.state.suggestions);
          if (i === 0 || !r.suggestionsElement) {
            r.props.onKeyDown(a);
            return;
          }
          switch (
            (Object.values(vn).indexOf(a.keyCode) >= 0 &&
              (a.preventDefault(), a.stopPropagation()),
            a.keyCode)
          ) {
            case vn.ESC: {
              r.clearSuggestions();
              return;
            }
            case vn.DOWN: {
              r.shiftFocus(1);
              return;
            }
            case vn.UP: {
              r.shiftFocus(-1);
              return;
            }
            case vn.RETURN: {
              r.selectFocused();
              return;
            }
            case vn.TAB: {
              r.selectFocused();
              return;
            }
            default:
              return;
          }
        }),
        se(ue(r), "shiftFocus", function (a) {
          var i = Bo(r.state.suggestions);
          r.setState({
            focusIndex: (i + r.state.focusIndex + a) % i,
            scrollFocusedIntoView: !0,
          });
        }),
        se(ue(r), "selectFocused", function () {
          var a = r.state,
            i = a.suggestions,
            s = a.focusIndex,
            c = Object.values(i).reduce(function (d, f) {
              var g = f.results,
                p = f.queryInfo;
              return [].concat(
                hr(d),
                hr(
                  g.map(function (h) {
                    return {
                      result: h,
                      queryInfo: p,
                    };
                  }),
                ),
              );
            }, [])[s],
            u = c.result,
            l = c.queryInfo;
          r.addMention(u, l),
            r.setState({
              focusIndex: 0,
            });
        }),
        se(ue(r), "handleBlur", function (a) {
          var i = r._suggestionsMouseDown;
          (r._suggestionsMouseDown = !1),
            i ||
              r.setState({
                selectionStart: null,
                selectionEnd: null,
              }),
            window.setTimeout(function () {
              r.updateHighlighterScroll();
            }, 1),
            r.props.onBlur(a, i);
        }),
        se(ue(r), "handleSuggestionsMouseDown", function (a) {
          r._suggestionsMouseDown = !0;
        }),
        se(ue(r), "handleSuggestionsMouseEnter", function (a) {
          r.setState({
            focusIndex: a,
            scrollFocusedIntoView: !1,
          });
        }),
        se(ue(r), "updateSuggestionsPosition", function () {
          var a = r.state.caretPosition,
            i = r.props,
            s = i.suggestionsPortalHost,
            c = i.allowSuggestionsAboveCursor,
            u = i.forceSuggestionsAboveCursor;
          if (!(!a || !r.suggestionsElement)) {
            var l = r.suggestionsElement,
              d = r.highlighterElement,
              f = d.getBoundingClientRect(),
              g = oi(d, "font-size"),
              p = {
                left: f.left + a.left,
                top: f.top + a.top + g,
              },
              h = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
              );
            if (l) {
              var m = {};
              if (s) {
                m.position = "fixed";
                var y = p.left,
                  x = p.top;
                (y -= oi(l, "margin-left")),
                  (x -= oi(l, "margin-top")),
                  (y -= d.scrollLeft),
                  (x -= d.scrollTop);
                var C = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                y + l.offsetWidth > C
                  ? (m.left = Math.max(0, C - l.offsetWidth))
                  : (m.left = y),
                  (c && x + l.offsetHeight > h && l.offsetHeight < x - g) || u
                    ? (m.top = Math.max(0, x - l.offsetHeight - g))
                    : (m.top = x);
              } else {
                var S = a.left - d.scrollLeft,
                  w = a.top - d.scrollTop;
                S + l.offsetWidth > r.containerElement.offsetWidth
                  ? (m.right = 0)
                  : (m.left = S),
                  (c &&
                    p.top - d.scrollTop + l.offsetHeight > h &&
                    l.offsetHeight < f.top - g - d.scrollTop) ||
                  u
                    ? (m.top = w - l.offsetHeight - g)
                    : (m.top = w);
              }
              (m.left === r.state.suggestionsPosition.left &&
                m.top === r.state.suggestionsPosition.top &&
                m.position === r.state.suggestionsPosition.position) ||
                r.setState({
                  suggestionsPosition: m,
                });
            }
          }
        }),
        se(ue(r), "updateHighlighterScroll", function () {
          var a = r.inputElement,
            i = r.highlighterElement;
          !a ||
            !i ||
            ((i.scrollLeft = a.scrollLeft),
            (i.scrollTop = a.scrollTop),
            (i.height = a.height));
        }),
        se(ue(r), "handleCompositionStart", function () {
          $o = !0;
        }),
        se(ue(r), "handleCompositionEnd", function () {
          $o = !1;
        }),
        se(ue(r), "setSelection", function (a, i) {
          if (!(a === null || i === null)) {
            var s = r.inputElement;
            if (s.setSelectionRange) s.setSelectionRange(a, i);
            else if (s.createTextRange) {
              var c = s.createTextRange();
              c.collapse(!0),
                c.moveEnd("character", i),
                c.moveStart("character", a),
                c.select();
            }
          }
        }),
        se(ue(r), "updateMentionsQueries", function (a, i) {
          r._queryId++,
            (r.suggestions = {}),
            r.setState({
              suggestions: {},
            });
          var s = r.props.value || "",
            c = r.props.children,
            u = qt(c),
            l = Be(s, u, i, "NULL");
          if (l !== null) {
            var d = Zh(s.substring(0, l), u),
              f = a.substring(d, i);
            j.Children.forEach(c, function (g, p) {
              if (g) {
                var h = h2(g.props.trigger, r.props),
                  m = f.match(h);
                if (m) {
                  var y = d + f.indexOf(m[1], m.index);
                  r.queryData(m[2], p, y, y + m[1].length, a);
                }
              }
            });
          }
        }),
        se(ue(r), "clearSuggestions", function () {
          r._queryId++,
            (r.suggestions = {}),
            r.setState({
              suggestions: {},
              focusIndex: 0,
            });
        }),
        se(ue(r), "queryData", function (a, i, s, c, u) {
          var l = r.props,
            d = l.children,
            f = l.ignoreAccents,
            g = Nn.toArray(d)[i],
            p = m2(g.props.data, f),
            h = p(a, r.updateSuggestions.bind(null, r._queryId, i, a, s, c, u));
          h instanceof Array &&
            r.updateSuggestions(r._queryId, i, a, s, c, u, h);
        }),
        se(ue(r), "updateSuggestions", function (a, i, s, c, u, l, d) {
          if (a === r._queryId) {
            r.suggestions = ct(
              ct({}, r.suggestions),
              {},
              se({}, i, {
                queryInfo: {
                  childIndex: i,
                  query: s,
                  querySequenceStart: c,
                  querySequenceEnd: u,
                  plainTextValue: l,
                },
                results: d,
              }),
            );
            var f = r.state.focusIndex,
              g = Bo(r.suggestions);
            r.setState({
              suggestions: r.suggestions,
              focusIndex: f >= g ? Math.max(g - 1, 0) : f,
            });
          }
        }),
        se(ue(r), "addMention", function (a, i) {
          var s = a.id,
            c = a.display,
            u = i.childIndex,
            l = i.querySequenceStart,
            d = i.querySequenceEnd,
            f = i.plainTextValue,
            g = r.props.value || "",
            p = qt(r.props.children),
            h = Nn.toArray(r.props.children)[u],
            m = h.props,
            y = m.markup,
            x = m.displayTransform,
            C = m.appendSpaceOnAdd,
            S = m.onAdd,
            w = Be(g, p, l, "START"),
            M = w + d - l,
            O = Gh(y, s, c);
          C && (O += " ");
          var _ = oo(g, w, M, O);
          r.inputElement.focus();
          var L = x(s, c);
          C && (L += " ");
          var I = l + L.length;
          r.setState({
            selectionStart: I,
            selectionEnd: I,
            setSelectionAfterMentionChange: !0,
          });
          var P = {
              target: {
                value: _,
              },
            },
            $ = Jn(_, p),
            B = oo(f, l, d, L);
          r.executeOnChange(P, _, B, $),
            S && S(s, c, w, M),
            r.clearSuggestions();
        }),
        se(ue(r), "isLoading", function () {
          var a = !1;
          return (
            j.Children.forEach(r.props.children, function (i) {
              a = a || (i && i.props.isLoading);
            }),
            a
          );
        }),
        se(ue(r), "isOpened", function () {
          return (
            Di(r.state.selectionStart) &&
            (Bo(r.state.suggestions) !== 0 || r.isLoading())
          );
        }),
        se(ue(r), "_queryId", 0),
        (r.suggestions = {}),
        (r.uuidSuggestionsOverlay = Math.random().toString(16).substring(2)),
        (r.handleCopy = r.handleCopy.bind(ue(r))),
        (r.handleCut = r.handleCut.bind(ue(r))),
        (r.handlePaste = r.handlePaste.bind(ue(r))),
        (r.state = {
          focusIndex: 0,
          selectionStart: null,
          selectionEnd: null,
          suggestions: {},
          caretPosition: null,
          suggestionsPosition: {},
          setSelectionAfterHandlePaste: !1,
        }),
        r
      );
    }
    return (
      lh(n, [
        {
          key: "componentDidMount",
          value: function () {
            document.addEventListener("copy", this.handleCopy),
              document.addEventListener("cut", this.handleCut),
              document.addEventListener("paste", this.handlePaste),
              this.updateSuggestionsPosition();
          },
        },
        {
          key: "componentDidUpdate",
          value: function (r, a) {
            a.suggestionsPosition === this.state.suggestionsPosition &&
              this.updateSuggestionsPosition(),
              this.state.setSelectionAfterMentionChange &&
                (this.setState({
                  setSelectionAfterMentionChange: !1,
                }),
                this.setSelection(
                  this.state.selectionStart,
                  this.state.selectionEnd,
                )),
              this.state.setSelectionAfterHandlePaste &&
                (this.setState({
                  setSelectionAfterHandlePaste: !1,
                }),
                this.setSelection(
                  this.state.selectionStart,
                  this.state.selectionEnd,
                ));
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            document.removeEventListener("copy", this.handleCopy),
              document.removeEventListener("cut", this.handleCut),
              document.removeEventListener("paste", this.handlePaste);
          },
        },
        {
          key: "render",
          value: function () {
            return /* @__PURE__ */ j.createElement(
              "div",
              ot(
                {
                  ref: this.setContainerElement,
                },
                this.props.style,
              ),
              this.renderControl(),
              this.renderSuggestionsOverlay(),
            );
          },
        },
        {
          key: "handlePaste",
          value: function (r) {
            if (
              r.target === this.inputElement &&
              this.supportsClipboardActions(r)
            ) {
              r.preventDefault();
              var a = this.state,
                i = a.selectionStart,
                s = a.selectionEnd,
                c = this.props,
                u = c.value,
                l = c.children,
                d = qt(l),
                f = Be(u, d, i, "START"),
                g = Be(u, d, s, "END"),
                p = r.clipboardData.getData("text/react-mentions"),
                h = r.clipboardData.getData("text/plain"),
                m = oo(u, f, g, p || h).replace(/\r/g, ""),
                y = an(m, d),
                x = {
                  target: ct(
                    ct({}, r.target),
                    {},
                    {
                      value: m,
                    },
                  ),
                };
              this.executeOnChange(x, m, y, Jn(m, d));
              var C = vc(u, d, i),
                S = (C || i) + an(p || h, d).length;
              this.setState({
                selectionStart: S,
                selectionEnd: S,
                setSelectionAfterHandlePaste: !0,
              });
            }
          },
        },
        {
          key: "saveSelectionToClipboard",
          value: function (r) {
            var a = this.inputElement.selectionStart,
              i = this.inputElement.selectionEnd,
              s = this.props,
              c = s.children,
              u = s.value,
              l = qt(c),
              d = Be(u, l, a, "START"),
              f = Be(u, l, i, "END");
            r.clipboardData.setData("text/plain", r.target.value.slice(a, i)),
              r.clipboardData.setData("text/react-mentions", u.slice(d, f));
          },
        },
        {
          key: "supportsClipboardActions",
          value: function (r) {
            return !!r.clipboardData;
          },
        },
        {
          key: "handleCopy",
          value: function (r) {
            r.target === this.inputElement &&
              this.supportsClipboardActions(r) &&
              (r.preventDefault(), this.saveSelectionToClipboard(r));
          },
        },
        {
          key: "handleCut",
          value: function (r) {
            if (
              r.target === this.inputElement &&
              this.supportsClipboardActions(r)
            ) {
              r.preventDefault(), this.saveSelectionToClipboard(r);
              var a = this.state,
                i = a.selectionStart,
                s = a.selectionEnd,
                c = this.props,
                u = c.children,
                l = c.value,
                d = qt(u),
                f = Be(l, d, i, "START"),
                g = Be(l, d, s, "END"),
                p = [l.slice(0, f), l.slice(g)].join(""),
                h = an(p, d),
                m = {
                  target: ct(
                    ct({}, r.target),
                    {},
                    {
                      value: h,
                    },
                  ),
                };
              this.executeOnChange(m, p, h, Jn(l, d));
            }
          },
          // Handle input element's change event
        },
      ]),
      n
    );
  })(j.Component);
se(vs, "propTypes", pd);
se(vs, "defaultProps", {
  ignoreAccents: !1,
  singleLine: !1,
  allowSuggestionsAboveCursor: !1,
  onKeyDown: function () {
    return null;
  },
  onSelect: function () {
    return null;
  },
  onBlur: function () {
    return null;
  },
});
var oi = function (t, n) {
    var o = parseFloat(window.getComputedStyle(t, null).getPropertyValue(n));
    return isFinite(o) ? o : 0;
  },
  b2 = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  y2 = jr(
    {
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
        letterSpacing: "inherit",
      },
      "&multiLine": {
        input: ct(
          {
            height: "100%",
            bottom: 0,
            overflow: "hidden",
            resize: "none",
          },
          b2
            ? {
                marginTop: 1,
                marginLeft: -3,
              }
            : null,
        ),
      },
    },
    function (e) {
      var t = e.singleLine;
      return {
        "&singleLine": t,
        "&multiLine": !t,
      };
    },
  ),
  v2 = y2(vs),
  w2 = {
    fontWeight: "inherit",
  },
  ws = function (t) {
    var n = t.display,
      o = t.style,
      r = t.className,
      a = t.classNames,
      i = bs(w2, {
        style: o,
        className: r,
        classNames: a,
      });
    return /* @__PURE__ */ j.createElement("strong", i, n);
  };
ws.propTypes = {
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
  onAdd: G.func,
  onRemove: G.func,
  renderSuggestion: G.func,
  trigger: G.oneOfType([G.string, G.instanceOf(RegExp)]),
  markup: G.string,
  displayTransform: G.func,
  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: G.bool,
  isLoading: G.bool,
};
ws.defaultProps = {
  trigger: "@",
  markup: "@[__display__](__id__)",
  displayTransform: function (t, n) {
    return n || t;
  },
  onAdd: function () {
    return null;
  },
  onRemove: function () {
    return null;
  },
  renderSuggestion: null,
  isLoading: !1,
  appendSpaceOnAdd: !1,
};
const x2 = {
    "&multiLine": {
      minHeight: "40px",
    },
    input: {
      border: "none",
      outline: "none",
      fontWeight: "500",
      fontSize: "15px",
      color: "rgba(0, 5, 15, 0.85)",
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
          backgroundColor: "var(--background--04)",
        },
      },
    },
  },
  S2 = ({
    value: e,
    setValue: t,
    users: n,
    placeholder: o = "Type your reply here...",
    onEnterKeypress: r,
  }) => {
    const a = n.map((u) => ({
        ...u,
        display: u.display_name,
      })),
      i = (u) => {
        u.stopPropagation(),
          u.key === "Enter" &&
            !u.shiftKey &&
            (u.preventDefault(), r == null || r());
      },
      s = (u, l) => {
        console.info("[MentionsInputComponent] on mention select", {
          id: u,
          display: l,
        });
      },
      c = (u) => {
        t(u.target.value);
      };
    return /* @__PURE__ */ b.jsx(v2, {
      autoFocus: !0,
      value: e,
      onChange: c,
      style: {
        ...x2,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: o,
      className: "mentions-input",
      onKeyDown: i,
      children: /* @__PURE__ */ b.jsx(ws, {
        displayTransform: (u, l) => `@${l}`,
        trigger: "@",
        markup: "@[__id__](__display__)",
        data: a,
        appendSpaceOnAdd: !0,
        renderSuggestion: (u, l) =>
          /* @__PURE__ */ b.jsx("div", {
            className: `user ${l ? "focused" : ""}`,
            children: u.display,
          }),
        onAdd: s,
      }),
    });
  },
  C2 = S2,
  E2 = ({
    comment: e,
    setComment: t,
    loading: n,
    users: o,
    currentUser: r,
    placeholder: a,
    onEnterKeypress: i,
  }) =>
    /* @__PURE__ */ b.jsxs("div", {
      className: Pt.conversationInputForm,
      children: [
        r ? /* @__PURE__ */ b.jsx(Qu, { user: r }) : null,
        /* @__PURE__ */ b.jsx(C2, {
          value: e,
          setValue: t,
          users: o,
          placeholder: a,
          onEnterKeypress: i,
        }),
        /* @__PURE__ */ b.jsx(U0, {
          loading: n,
          color: "primary",
          children: /* @__PURE__ */ b.jsx(Ap, {}),
        }),
      ],
    }),
  hd = E2,
  _2 = ({ meta: { highlight: e, filePath: t, field: n, column: o } }) => {
    if (!e) return null;
    const r = o ? `${t} (${o})` : t;
    return /* @__PURE__ */ b.jsx("div", {
      className: Pt.highlightText,
      children: /* @__PURE__ */ b.jsx(K0, {
        code: e,
        language: n ? "markdown" : "sql",
        showLineNumbers: !n,
        fileName: r,
      }),
    });
  },
  md = _2,
  k2 = () => {
    const e = xe((l) => l.users),
      t = xe((l) => l.newConversation),
      n = xe((l) => (l.currentUserId ? l.users[l.currentUserId] : null)),
      o = xe((l) => l.shareId),
      r = rt(),
      [a, i] = de(!1),
      [s, c] = de(""),
      u = async (l) => {
        if (
          (l == null || l.stopPropagation(),
          l == null || l.preventDefault(),
          !(!t || !o))
        ) {
          i(!0);
          try {
            console.log("saving conversation", t, s);
            const d = await Rp(
              o,
              {
                ...t,
                message: s,
              },
              "dbt-docs",
              // this component is used only from dbt docs page
            );
            if (!d.conversation_group_id) {
              console.error("Unable to create conversation group", d);
              return;
            }
            console.log("Successfully created conversation group", d);
          } catch (d) {
            console.error("error while saving conversation", t, d);
          }
          r(Zu()), i(!1), r(gs(!0)), r(ps()), c("");
        }
      };
    return /* @__PURE__ */ b.jsx(Eo, {
      className: Pt.newConversationForm,
      children: /* @__PURE__ */ b.jsx(_o, {
        children: /* @__PURE__ */ b.jsxs("form", {
          onSubmit: u,
          children: [
            /* @__PURE__ */ b.jsx("h4", { children: "Add comment" }),
            /* @__PURE__ */ b.jsx(md, {
              meta: (t == null ? void 0 : t.meta) || {},
            }),
            /* @__PURE__ */ b.jsx(hd, {
              comment: s,
              setComment: c,
              loading: a,
              users: Object.values(e),
              currentUser: n,
              placeholder: "Start a conversation or add others with @",
              onEnterKeypress: u,
            }),
          ],
        }),
      }),
    });
  },
  A2 = k2;
var bd = { exports: {} };
(function (e, t) {
  (function (n, o) {
    e.exports = o();
  })(j1, function () {
    var n = 1e3,
      o = 6e4,
      r = 36e5,
      a = "millisecond",
      i = "second",
      s = "minute",
      c = "hour",
      u = "day",
      l = "week",
      d = "month",
      f = "quarter",
      g = "year",
      p = "date",
      h = "Invalid Date",
      m =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      y =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      x = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (v) {
          var k = ["th", "st", "nd", "rd"],
            E = v % 100;
          return "[" + v + (k[(E - 20) % 10] || k[E] || k[0]) + "]";
        },
      },
      C = function (v, k, E) {
        var N = String(v);
        return !N || N.length >= k
          ? v
          : "" + Array(k + 1 - N.length).join(E) + v;
      },
      S = {
        s: C,
        z: function (v) {
          var k = -v.utcOffset(),
            E = Math.abs(k),
            N = Math.floor(E / 60),
            z = E % 60;
          return (k <= 0 ? "+" : "-") + C(N, 2, "0") + ":" + C(z, 2, "0");
        },
        m: function v(k, E) {
          if (k.date() < E.date()) return -v(E, k);
          var N = 12 * (E.year() - k.year()) + (E.month() - k.month()),
            z = k.clone().add(N, d),
            T = E - z < 0,
            A = k.clone().add(N + (T ? -1 : 1), d);
          return +(-(N + (E - z) / (T ? z - A : A - z)) || 0);
        },
        a: function (v) {
          return v < 0 ? Math.ceil(v) || 0 : Math.floor(v);
        },
        p: function (v) {
          return (
            { M: d, y: g, w: l, d: u, D: p, h: c, m: s, s: i, ms: a, Q: f }[
              v
            ] ||
            String(v || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (v) {
          return v === void 0;
        },
      },
      w = "en",
      M = {};
    M[w] = x;
    var O = "$isDayjsObject",
      _ = function (v) {
        return v instanceof $ || !(!v || !v[O]);
      },
      L = function v(k, E, N) {
        var z;
        if (!k) return w;
        if (typeof k == "string") {
          var T = k.toLowerCase();
          M[T] && (z = T), E && ((M[T] = E), (z = T));
          var A = k.split("-");
          if (!z && A.length > 1) return v(A[0]);
        } else {
          var D = k.name;
          (M[D] = k), (z = D);
        }
        return !N && z && (w = z), z || (!N && w);
      },
      I = function (v, k) {
        if (_(v)) return v.clone();
        var E = typeof k == "object" ? k : {};
        return (E.date = v), (E.args = arguments), new $(E);
      },
      P = S;
    (P.l = L),
      (P.i = _),
      (P.w = function (v, k) {
        return I(v, { locale: k.$L, utc: k.$u, x: k.$x, $offset: k.$offset });
      });
    var $ = (function () {
        function v(E) {
          (this.$L = L(E.locale, null, !0)),
            this.parse(E),
            (this.$x = this.$x || E.x || {}),
            (this[O] = !0);
        }
        var k = v.prototype;
        return (
          (k.parse = function (E) {
            (this.$d = (function (N) {
              var z = N.date,
                T = N.utc;
              if (z === null) return /* @__PURE__ */ new Date(NaN);
              if (P.u(z)) return /* @__PURE__ */ new Date();
              if (z instanceof Date) return new Date(z);
              if (typeof z == "string" && !/Z$/i.test(z)) {
                var A = z.match(m);
                if (A) {
                  var D = A[2] - 1 || 0,
                    H = (A[7] || "0").substring(0, 3);
                  return T
                    ? new Date(
                        Date.UTC(
                          A[1],
                          D,
                          A[3] || 1,
                          A[4] || 0,
                          A[5] || 0,
                          A[6] || 0,
                          H,
                        ),
                      )
                    : new Date(
                        A[1],
                        D,
                        A[3] || 1,
                        A[4] || 0,
                        A[5] || 0,
                        A[6] || 0,
                        H,
                      );
                }
              }
              return new Date(z);
            })(E)),
              this.init();
          }),
          (k.init = function () {
            var E = this.$d;
            (this.$y = E.getFullYear()),
              (this.$M = E.getMonth()),
              (this.$D = E.getDate()),
              (this.$W = E.getDay()),
              (this.$H = E.getHours()),
              (this.$m = E.getMinutes()),
              (this.$s = E.getSeconds()),
              (this.$ms = E.getMilliseconds());
          }),
          (k.$utils = function () {
            return P;
          }),
          (k.isValid = function () {
            return this.$d.toString() !== h;
          }),
          (k.isSame = function (E, N) {
            var z = I(E);
            return this.startOf(N) <= z && z <= this.endOf(N);
          }),
          (k.isAfter = function (E, N) {
            return I(E) < this.startOf(N);
          }),
          (k.isBefore = function (E, N) {
            return this.endOf(N) < I(E);
          }),
          (k.$g = function (E, N, z) {
            return P.u(E) ? this[N] : this.set(z, E);
          }),
          (k.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (k.valueOf = function () {
            return this.$d.getTime();
          }),
          (k.startOf = function (E, N) {
            var z = this,
              T = !!P.u(N) || N,
              A = P.p(E),
              D = function (te, q) {
                var fe = P.w(
                  z.$u ? Date.UTC(z.$y, q, te) : new Date(z.$y, q, te),
                  z,
                );
                return T ? fe : fe.endOf(u);
              },
              H = function (te, q) {
                return P.w(
                  z
                    .toDate()
                    [
                      te
                    ].apply(z.toDate("s"), (T ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(q)),
                  z,
                );
              },
              W = this.$W,
              V = this.$M,
              Y = this.$D,
              Z = "set" + (this.$u ? "UTC" : "");
            switch (A) {
              case g:
                return T ? D(1, 0) : D(31, 11);
              case d:
                return T ? D(1, V) : D(0, V + 1);
              case l:
                var X = this.$locale().weekStart || 0,
                  Q = (W < X ? W + 7 : W) - X;
                return D(T ? Y - Q : Y + (6 - Q), V);
              case u:
              case p:
                return H(Z + "Hours", 0);
              case c:
                return H(Z + "Minutes", 1);
              case s:
                return H(Z + "Seconds", 2);
              case i:
                return H(Z + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (k.endOf = function (E) {
            return this.startOf(E, !1);
          }),
          (k.$set = function (E, N) {
            var z,
              T = P.p(E),
              A = "set" + (this.$u ? "UTC" : ""),
              D = ((z = {}),
              (z[u] = A + "Date"),
              (z[p] = A + "Date"),
              (z[d] = A + "Month"),
              (z[g] = A + "FullYear"),
              (z[c] = A + "Hours"),
              (z[s] = A + "Minutes"),
              (z[i] = A + "Seconds"),
              (z[a] = A + "Milliseconds"),
              z)[T],
              H = T === u ? this.$D + (N - this.$W) : N;
            if (T === d || T === g) {
              var W = this.clone().set(p, 1);
              W.$d[D](H),
                W.init(),
                (this.$d = W.set(p, Math.min(this.$D, W.daysInMonth())).$d);
            } else D && this.$d[D](H);
            return this.init(), this;
          }),
          (k.set = function (E, N) {
            return this.clone().$set(E, N);
          }),
          (k.get = function (E) {
            return this[P.p(E)]();
          }),
          (k.add = function (E, N) {
            var z,
              T = this;
            E = Number(E);
            var A = P.p(N),
              D = function (V) {
                var Y = I(T);
                return P.w(Y.date(Y.date() + Math.round(V * E)), T);
              };
            if (A === d) return this.set(d, this.$M + E);
            if (A === g) return this.set(g, this.$y + E);
            if (A === u) return D(1);
            if (A === l) return D(7);
            var H = ((z = {}), (z[s] = o), (z[c] = r), (z[i] = n), z)[A] || 1,
              W = this.$d.getTime() + E * H;
            return P.w(W, this);
          }),
          (k.subtract = function (E, N) {
            return this.add(-1 * E, N);
          }),
          (k.format = function (E) {
            var N = this,
              z = this.$locale();
            if (!this.isValid()) return z.invalidDate || h;
            var T = E || "YYYY-MM-DDTHH:mm:ssZ",
              A = P.z(this),
              D = this.$H,
              H = this.$m,
              W = this.$M,
              V = z.weekdays,
              Y = z.months,
              Z = z.meridiem,
              X = function (q, fe, K, ye) {
                return (q && (q[fe] || q(N, T))) || K[fe].slice(0, ye);
              },
              Q = function (q) {
                return P.s(D % 12 || 12, q, "0");
              },
              te =
                Z ||
                function (q, fe, K) {
                  var ye = q < 12 ? "AM" : "PM";
                  return K ? ye.toLowerCase() : ye;
                };
            return T.replace(y, function (q, fe) {
              return (
                fe ||
                (function (K) {
                  switch (K) {
                    case "YY":
                      return String(N.$y).slice(-2);
                    case "YYYY":
                      return P.s(N.$y, 4, "0");
                    case "M":
                      return W + 1;
                    case "MM":
                      return P.s(W + 1, 2, "0");
                    case "MMM":
                      return X(z.monthsShort, W, Y, 3);
                    case "MMMM":
                      return X(Y, W);
                    case "D":
                      return N.$D;
                    case "DD":
                      return P.s(N.$D, 2, "0");
                    case "d":
                      return String(N.$W);
                    case "dd":
                      return X(z.weekdaysMin, N.$W, V, 2);
                    case "ddd":
                      return X(z.weekdaysShort, N.$W, V, 3);
                    case "dddd":
                      return V[N.$W];
                    case "H":
                      return String(D);
                    case "HH":
                      return P.s(D, 2, "0");
                    case "h":
                      return Q(1);
                    case "hh":
                      return Q(2);
                    case "a":
                      return te(D, H, !0);
                    case "A":
                      return te(D, H, !1);
                    case "m":
                      return String(H);
                    case "mm":
                      return P.s(H, 2, "0");
                    case "s":
                      return String(N.$s);
                    case "ss":
                      return P.s(N.$s, 2, "0");
                    case "SSS":
                      return P.s(N.$ms, 3, "0");
                    case "Z":
                      return A;
                  }
                  return null;
                })(q) ||
                A.replace(":", "")
              );
            });
          }),
          (k.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (k.diff = function (E, N, z) {
            var T,
              A = this,
              D = P.p(N),
              H = I(E),
              W = (H.utcOffset() - this.utcOffset()) * o,
              V = this - H,
              Y = function () {
                return P.m(A, H);
              };
            switch (D) {
              case g:
                T = Y() / 12;
                break;
              case d:
                T = Y();
                break;
              case f:
                T = Y() / 3;
                break;
              case l:
                T = (V - W) / 6048e5;
                break;
              case u:
                T = (V - W) / 864e5;
                break;
              case c:
                T = V / r;
                break;
              case s:
                T = V / o;
                break;
              case i:
                T = V / n;
                break;
              default:
                T = V;
            }
            return z ? T : P.a(T);
          }),
          (k.daysInMonth = function () {
            return this.endOf(d).$D;
          }),
          (k.$locale = function () {
            return M[this.$L];
          }),
          (k.locale = function (E, N) {
            if (!E) return this.$L;
            var z = this.clone(),
              T = L(E, N, !0);
            return T && (z.$L = T), z;
          }),
          (k.clone = function () {
            return P.w(this.$d, this);
          }),
          (k.toDate = function () {
            return new Date(this.valueOf());
          }),
          (k.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (k.toISOString = function () {
            return this.$d.toISOString();
          }),
          (k.toString = function () {
            return this.$d.toUTCString();
          }),
          v
        );
      })(),
      B = $.prototype;
    return (
      (I.prototype = B),
      [
        ["$ms", a],
        ["$s", i],
        ["$m", s],
        ["$H", c],
        ["$W", u],
        ["$M", d],
        ["$y", g],
        ["$D", p],
      ].forEach(function (v) {
        B[v[1]] = function (k) {
          return this.$g(k, v[0], v[1]);
        };
      }),
      (I.extend = function (v, k) {
        return v.$i || (v(k, $, I), (v.$i = !0)), I;
      }),
      (I.locale = L),
      (I.isDayjs = _),
      (I.unix = function (v) {
        return I(1e3 * v);
      }),
      (I.en = M[w]),
      (I.Ls = M),
      (I.p = {}),
      I
    );
  });
})(bd);
var M2 = bd.exports;
const T2 = /* @__PURE__ */ $n(M2),
  O2 = ({ conversationGroupId: e, shareId: t }) => {
    const { onResolve: n, source: o } = co(),
      [r, a] = de(!1),
      i = async () => {
        e && (a(!0), await Pp(t, e, o), n(), a(!1));
      };
    return e
      ? /* @__PURE__ */ b.jsx(ns, {
          disabled: r,
          className: Pt.resolveButton,
          title: "Resolve conversation",
          onClick: i,
          children: /* @__PURE__ */ b.jsx(Cp, {}),
        })
      : null;
  },
  N2 = O2,
  D2 = ({
    user: e,
    timestamp: t,
    showResolveButton: n,
    conversationGroupId: o,
    shareId: r,
  }) =>
    /* @__PURE__ */ b.jsxs(Tu, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ b.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ b.jsx(Qu, { user: e }),
            /* @__PURE__ */ b.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ b.jsx("span", {
              children: T2(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        n
          ? /* @__PURE__ */ b.jsx(N2, {
              conversationGroupId: o,
              shareId: r,
            })
          : null,
      ],
    }),
  yd = D2,
  R2 = ({ conversation: e, shareId: t }) => {
    const { users: n } = co(),
      o = Oe(() => {
        if (e != null && e.user_id) return n[e.user_id];
      }, [e.user_id, n]);
    return /* @__PURE__ */ b.jsxs(Eo, {
      children: [
        /* @__PURE__ */ b.jsx(yd, {
          user: o,
          timestamp: e.timestamp,
          shareId: t,
        }),
        /* @__PURE__ */ b.jsx(_o, {
          children: /* @__PURE__ */ b.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
          }),
        }),
      ],
    });
  },
  z2 = R2,
  I2 = ({ conversationGroupId: e, shareId: t }) => {
    const { currentUser: n, users: o, onReplyAdd: r, source: a } = co(),
      i = Object.values(o),
      [s, c] = de(""),
      [u, l] = de(!1),
      d = async (f) => {
        if (
          (f == null || f.stopPropagation(),
          f == null || f.preventDefault(),
          !(!t || !e))
        ) {
          l(!0),
            console.log("saving reply", t, e, {
              message: s,
            });
          try {
            await zp(
              t,
              e,
              {
                message: s,
              },
              a,
            ),
              r();
          } catch (g) {
            console.error("error while saving reply", g);
          }
          l(!1), c("");
        }
      };
    return /* @__PURE__ */ b.jsx("div", {
      className: Pt.replyForm,
      children: /* @__PURE__ */ b.jsx("form", {
        onSubmit: d,
        className: "",
        children: /* @__PURE__ */ b.jsx(hd, {
          comment: s,
          setComment: c,
          loading: u,
          users: Object.values(i),
          currentUser: n || null,
          onEnterKeypress: d,
        }),
      }),
    });
  },
  L2 = I2,
  P2 = ({ conversationGroup: e, shareId: t, onSelect: n }) => {
    var f;
    const { users: o } = co(),
      r = Oe(() => {
        if (e.owner) return o[e.owner];
      }, [e.owner, o]),
      { isSelected: a } = co(),
      [i, s] = de(!1),
      c = he(
        (g) => {
          !a ||
            !g ||
            (console.log(
              "ConversationGroupComponent scrolling",
              e.conversation_group_id,
            ),
            setTimeout(() => {
              g.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }, 1e3));
        },
        [e.conversation_group_id, a],
      );
    if (
      !((f = e == null ? void 0 : e.conversations) != null && f.length) ||
      (e == null ? void 0 : e.status) !== "Pending"
    )
      return null;
    const [u, ...l] = e.conversations,
      d = l.length
        ? l.length > 1
          ? `${l.length} replies`
          : `${l.length} reply`
        : "Reply";
    return /* @__PURE__ */ b.jsx("div", {
      ref: c,
      className: Pt.conversationGroup,
      children: /* @__PURE__ */ b.jsxs(Eo, {
        className: `${a ? "active" : ""}`,
        onClick: n,
        children: [
          /* @__PURE__ */ b.jsx(yd, {
            user: r,
            timestamp: u.timestamp,
            showResolveButton: !0,
            conversationGroupId: e.conversation_group_id,
            shareId: t,
          }),
          /* @__PURE__ */ b.jsxs(_o, {
            children: [
              /* @__PURE__ */ b.jsx(md, { meta: e.meta }),
              /* @__PURE__ */ b.jsx("p", {
                children: u.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
              }),
              /* @__PURE__ */ b.jsx(qe, {
                onClick: () => s((g) => !g),
                color: "link",
                children: d,
              }),
              l.length
                ? /* @__PURE__ */ b.jsx(b.Fragment, {
                    children: i
                      ? /* @__PURE__ */ b.jsx(b.Fragment, {
                          children: l.map((g) =>
                            /* @__PURE__ */ b.jsx(
                              z2,
                              {
                                conversation: g,
                                shareId: t,
                              },
                              g.conversation_id,
                            ),
                          ),
                        })
                      : null,
                  })
                : null,
              i
                ? /* @__PURE__ */ b.jsx(L2, {
                    conversationGroupId: e.conversation_group_id,
                    shareId: t,
                  })
                : null,
            ],
          }),
        ],
      }),
    });
  },
  H2 = P2,
  vd = pt({
    users: {},
    conversationGroup: void 0,
    currentUser: void 0,
    isSelected: !1,
    shareId: void 0,
    onSelect: () => null,
    onResolve: () => null,
    onReplyAdd: () => null,
    source: os.DBT_DOCS,
  }),
  j2 = ({
    currentUser: e,
    conversationGroup: t,
    shareId: n,
    onSelect: o,
    isSelected: r,
    users: a,
    onResolve: i,
    onReplyAdd: s,
    source: c,
  }) => {
    const u = Oe(
      () => ({
        currentUser: e,
        conversationGroup: t,
        shareId: n,
        onSelect: o,
        isSelected: r,
        users: a,
        onResolve: i,
        onReplyAdd: s,
        source: c,
      }),
      [e, t, n, o, r, a, i, s, c],
    );
    return !t || !n
      ? null
      : /* @__PURE__ */ b.jsx(vd.Provider, {
          value: u,
          children: /* @__PURE__ */ b.jsx(H2, {
            conversationGroup: t,
            shareId: n,
            onSelect: o,
          }),
        });
  },
  F2 = j2,
  co = () => Ye(vd),
  B2 = () => {
    const e = xe((d) => d.source),
      t = xe((d) => d.conversations),
      n = xe((d) => d.selectedConversationId),
      o = xe((d) => d.shareId),
      r = xe((d) => d.users),
      a = xe((d) => d.currentUserId),
      i = rt();
    if (!a || !o) return null;
    const s = r[a],
      c = (d) => {
        i(Jg({ shareId: o, conversationGroupId: d }));
      },
      u = (d) => {
        i(fs(d));
      },
      l = (d) => {
        console.log("onReplyAdd", d), i(Zu());
      };
    return !t || !Object.keys(t).length
      ? /* @__PURE__ */ b.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ b.jsx("div", {
          children: Object.values(t).map((d) =>
            /* @__PURE__ */ b.jsx(
              F2,
              {
                conversationGroup: d,
                shareId: o,
                isSelected: n === d.conversation_group_id,
                currentUser: s,
                onResolve: () => c(d.conversation_group_id),
                onSelect: () => u(d.conversation_group_id),
                users: r,
                onReplyAdd: () => l(d.conversation_group_id),
                source: e,
              },
              d.conversation_group_id,
            ),
          ),
        });
  },
  $2 = B2,
  W2 = () => {
    const e = xe((i) => i.isRightPanelOpen),
      t = xe((i) => i.selectedConversationId),
      n = xe((i) => i.newConversation),
      o = rt(),
      r = () => {
        o(gs(!1)), o(fs(void 0)), o(ps());
      };
    return !!n || e || t
      ? /* @__PURE__ */ b.jsxs(b.Fragment, {
          children: [
            /* @__PURE__ */ b.jsx(I1, {
              onClick: r,
              className: Pt.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ b.jsxs("div", {
              className: Pt.conversationRightPanel,
              children: [
                /* @__PURE__ */ b.jsx("h3", { children: "Comments" }),
                n
                  ? /* @__PURE__ */ b.jsx(A2, {})
                  : /* @__PURE__ */ b.jsx($2, {}),
              ],
            }),
          ],
        })
      : null;
  },
  V2 = W2,
  q2 = 10,
  U2 = () => {
    const e = ae(),
      t = xe((i) => i.shareId),
      n = xe((i) => i.conversationsLoadingState),
      o = rt(),
      r = xe((i) => Object.keys(i.conversations || {})),
      a = he(
        (i) => {
          clearTimeout(e.current),
            Ip(i)
              .then((s) => {
                console.log("useConversations", s),
                  o(Qg(s == null ? void 0 : s.dbt_docs_share_conversations)),
                  (e.current = setTimeout(() => {
                    a(i);
                  }, q2 * 1e3));
              })
              .catch((s) =>
                console.error("error while fetching conversations list", s),
              )
              .finally(() => {
                o(tc(et.INITIALIZED));
              });
        },
        [o],
      );
    return (
      ie(() => {
        n !== et.UNINITIALIZED || !t || (o(tc(et.LOADING)), a(t));
      }, [o, n, r, t, a]),
      { isLoading: n === et.LOADING }
    );
  },
  Y2 = () => {
    const e = rt(),
      t = xe((r) => Object.keys(r.users || {})),
      [n, o] = de(et.UNINITIALIZED);
    return (
      ie(() => {
        n !== et.UNINITIALIZED ||
          Object.keys(t).length ||
          (o(et.LOADING),
          Lp()
            .then((r) => {
              console.log("useConversationUsers", r), e(Gg(r));
            })
            .catch((r) => console.error("error while fetching users list", r))
            .finally(() => {
              o(et.INITIALIZED);
            }));
      }, [e, n, t]),
      { isLoading: n === et.LOADING }
    );
  },
  Z2 = () => (
    Y2(),
    U2(),
    /* @__PURE__ */ b.jsxs("div", {
      children: [/* @__PURE__ */ b.jsx(V2, {}), /* @__PURE__ */ b.jsx(Wp, {})],
    })
  ),
  K2 = Z2,
  X2 = ({ target: e, ...t }) =>
    pn(
      /* @__PURE__ */ b.jsx(ns, {
        className: Pt.hotspotButton,
        title: "Click to start conversation",
        ...t,
        children: /* @__PURE__ */ b.jsx(Gu, {}),
      }),
      e,
    ),
  wd = X2,
  G2 = () => {
    var c;
    const e = rt(),
      t = xe((u) => u.codeblockLoaded),
      n = xe((u) => u.manifest),
      [o, r] = de(0),
      a = (c = as()) == null ? void 0 : c.parentElement,
      i = () => {
        var f;
        if (!a || !n.nodes) return;
        const u = is();
        if (!u || u.length < 3) {
          console.error("Unable to find model parts", u);
          return;
        }
        const d = {
          highlight: ((f = n.nodes[u[2]]) == null ? void 0 : f.raw_code).split(`
`)[o],
          range: {
            end: { line: o, character: 0 },
            start: { line: o, character: 0 },
          },
        };
        e(hs({ meta: d }));
      },
      s = he(
        (u) => {
          if (!a) return;
          const l = u.y,
            d = a.querySelectorAll(".line-numbers-rows > span"),
            f = Array.from(d).findIndex((g) => {
              const { height: p, y: h } = g.getBoundingClientRect();
              return l >= h && l <= h + p;
            });
          r(f);
        },
        [a],
      );
    return (
      ie(() => {
        if (!(!t || !a))
          return (
            a.addEventListener("mousemove", s),
            () => {
              a.removeEventListener("mousemove", s);
            }
          );
      }, [t, a, s]),
      !t || !a
        ? null
        : /* @__PURE__ */ b.jsx(wd, {
            target: a,
            onClick: i,
            style: { top: o * 21.2 },
          })
    );
  },
  Q2 = G2,
  J2 = () => {
    const e = rt(),
      t = xe((r) => r.codeblockLoaded),
      n = ss(),
      o = () => {
        const r = {
          field: "description",
          highlight: n == null ? void 0 : n.innerText,
        };
        e(hs({ meta: r }));
      };
    return !t || !n
      ? null
      : /* @__PURE__ */ b.jsx(wd, { target: n, onClick: o });
  },
  em = J2,
  tm = () =>
    /* @__PURE__ */ b.jsxs(b.Fragment, {
      children: [/* @__PURE__ */ b.jsx(em, {}), /* @__PURE__ */ b.jsx(Q2, {})],
    }),
  nm = tm,
  om = N1(() => import("./DbtDocsRenderer.js")),
  rm = () => {
    const { loading: e, shareDetails: t } = Hp(),
      n = rt(),
      { getHighlightedSelectionData: o, pos: r, onSelectionEnd: a } = jp(),
      i = (s) => {
        s.stopPropagation();
        const c = o();
        c && n(hs(c));
      };
    return e
      ? /* @__PURE__ */ b.jsx("div", { children: "Loading..." })
      : !(t != null && t.catalog_presigned_url) ||
          !(t != null && t.manifest_presigned_url)
        ? /* @__PURE__ */ b.jsx("div", {
            children: "Unable to load required artifacts. Please try again.",
          })
        : /* @__PURE__ */ b.jsxs("div", {
            children: [
              /* @__PURE__ */ b.jsxs("div", {
                className: "d-flex justify-content-end mb-2",
                children: [
                  /* @__PURE__ */ b.jsx(nm, {}),
                  /* @__PURE__ */ b.jsx(Np, {}),
                ],
              }),
              /* @__PURE__ */ b.jsx(K2, {}),
              /* @__PURE__ */ b.jsx(om, {
                shareDetails: t,
                onSelectionEnd: a,
              }),
              r ? /* @__PURE__ */ b.jsx(Tp, { pos: r, onAddComment: i }) : null,
            ],
          });
  },
  am = rm,
  im = ({ shareId: e, userId: t, conversationGroupId: n, source: o }) =>
    /* @__PURE__ */ b.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ b.jsx(np, {
        shareId: e,
        userId: t,
        conversationGroupId: n,
        source: o,
        children: /* @__PURE__ */ b.jsx(am, {}),
      }),
    }),
  Wy = im,
  sm = {
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
  },
  yr = Yu({
    name: "lineageState",
    initialState: sm,
    reducers: {
      setSelectedTable: (e, t) => {
        e.selectedTable = t.payload;
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
          lineage: [...(e.moreTables.lineage || []), ...t.payload],
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
        const n = t.payload,
          o = {
            ...e.collectColumns,
          };
        for (const r in n) {
          const a = n[r];
          if (!(r in o)) {
            o[r] = a;
            continue;
          }
          const i = a
            .map((s) => {
              const c = o[r].findIndex((u) => u.column === s.column);
              return c === -1
                ? s
                : (s.lensType && (o[r][c].lensType = s.lensType), null);
            })
            .filter((s) => s !== null);
          o[r].push(...i);
        }
        e.collectColumns = o;
      },
      setConfidence: (e, t) => {
        e.confidence = t.payload;
      },
      updateConfidenceWithOperatorList: (e, t) => {
        const n = { ...e.confidence, confidence: "low" };
        (n.operator_list = n.operator_list || []),
          n.operator_list.push(...(t.payload.operatorList || [])),
          (e.confidence = n);
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
      },
    },
  }),
  {
    setSelectedTable: vr,
    setMoreTables: xs,
    mergeSeeMoreTables: xd,
    setSidebarScreen: St,
    setSelectedColumn: sn,
    setCollectColumns: wr,
    mergeCollectColumns: Sd,
    setConfidence: lm,
    updateConfidenceWithOperatorList: Cd,
    setLeftExpansion: ri,
    setRightExpansion: ai,
    setMinRange: uo,
    setNodeCount: In,
    setSelectCheck: Ed,
    setNonSelectCheck: _d,
    setDefaultExpansion: kd,
    setAiEnabled: cm,
  } = yr.actions;
function $e(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, o; n < e.length; n++)
      (o = $e(e[n])) !== "" && (t += (t && " ") + o);
  else for (let n in e) e[n] && (t += (t && " ") + n);
  return t;
}
var Ri = { exports: {} },
  ii = {},
  Wo = { exports: {} },
  si = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ec;
function um() {
  if (Ec) return si;
  Ec = 1;
  var e = j;
  function t(d, f) {
    return (d === f && (d !== 0 || 1 / d === 1 / f)) || (d !== d && f !== f);
  }
  var n = typeof Object.is == "function" ? Object.is : t,
    o = e.useState,
    r = e.useEffect,
    a = e.useLayoutEffect,
    i = e.useDebugValue;
  function s(d, f) {
    var g = f(),
      p = o({ inst: { value: g, getSnapshot: f } }),
      h = p[0].inst,
      m = p[1];
    return (
      a(
        function () {
          (h.value = g), (h.getSnapshot = f), c(h) && m({ inst: h });
        },
        [d, g, f],
      ),
      r(
        function () {
          return (
            c(h) && m({ inst: h }),
            d(function () {
              c(h) && m({ inst: h });
            })
          );
        },
        [d],
      ),
      i(g),
      g
    );
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
  var l =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? u
      : s;
  return (
    (si.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : l),
    si
  );
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
var _c;
function dm() {
  return (
    _c ||
      ((_c = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
              "function" &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
              new Error(),
            );
          var e = j,
            t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function n(C) {
            {
              for (
                var S = arguments.length,
                  w = new Array(S > 1 ? S - 1 : 0),
                  M = 1;
                M < S;
                M++
              )
                w[M - 1] = arguments[M];
              o("error", C, w);
            }
          }
          function o(C, S, w) {
            {
              var M = t.ReactDebugCurrentFrame,
                O = M.getStackAddendum();
              O !== "" && ((S += "%s"), (w = w.concat([O])));
              var _ = w.map(function (L) {
                return String(L);
              });
              _.unshift("Warning: " + S),
                Function.prototype.apply.call(console[C], console, _);
            }
          }
          function r(C, S) {
            return (
              (C === S && (C !== 0 || 1 / C === 1 / S)) || (C !== C && S !== S)
            );
          }
          var a = typeof Object.is == "function" ? Object.is : r,
            i = e.useState,
            s = e.useEffect,
            c = e.useLayoutEffect,
            u = e.useDebugValue,
            l = !1,
            d = !1;
          function f(C, S, w) {
            l ||
              (e.startTransition !== void 0 &&
                ((l = !0),
                n(
                  "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.",
                )));
            var M = S();
            if (!d) {
              var O = S();
              a(M, O) ||
                (n(
                  "The result of getSnapshot should be cached to avoid an infinite loop",
                ),
                (d = !0));
            }
            var _ = i({
                inst: {
                  value: M,
                  getSnapshot: S,
                },
              }),
              L = _[0].inst,
              I = _[1];
            return (
              c(
                function () {
                  (L.value = M),
                    (L.getSnapshot = S),
                    g(L) &&
                      I({
                        inst: L,
                      });
                },
                [C, M, S],
              ),
              s(
                function () {
                  g(L) &&
                    I({
                      inst: L,
                    });
                  var P = function () {
                    g(L) &&
                      I({
                        inst: L,
                      });
                  };
                  return C(P);
                },
                [C],
              ),
              u(M),
              M
            );
          }
          function g(C) {
            var S = C.getSnapshot,
              w = C.value;
            try {
              var M = S();
              return !a(w, M);
            } catch {
              return !0;
            }
          }
          function p(C, S, w) {
            return S();
          }
          var h =
              typeof window < "u" &&
              typeof window.document < "u" &&
              typeof window.document.createElement < "u",
            m = !h,
            y = m ? p : f,
            x = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y;
          (li.useSyncExternalStore = x),
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                new Error(),
              );
        })()),
    li
  );
}
var kc;
function Ad() {
  return (
    kc ||
      ((kc = 1),
      process.env.NODE_ENV === "production"
        ? (Wo.exports = um())
        : (Wo.exports = dm())),
    Wo.exports
  );
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
var Ac;
function fm() {
  if (Ac) return ii;
  Ac = 1;
  var e = j,
    t = Ad();
  function n(u, l) {
    return (u === l && (u !== 0 || 1 / u === 1 / l)) || (u !== u && l !== l);
  }
  var o = typeof Object.is == "function" ? Object.is : n,
    r = t.useSyncExternalStore,
    a = e.useRef,
    i = e.useEffect,
    s = e.useMemo,
    c = e.useDebugValue;
  return (
    (ii.useSyncExternalStoreWithSelector = function (u, l, d, f, g) {
      var p = a(null);
      if (p.current === null) {
        var h = { hasValue: !1, value: null };
        p.current = h;
      } else h = p.current;
      p = s(
        function () {
          function y(M) {
            if (!x) {
              if (((x = !0), (C = M), (M = f(M)), g !== void 0 && h.hasValue)) {
                var O = h.value;
                if (g(O, M)) return (S = O);
              }
              return (S = M);
            }
            if (((O = S), o(C, M))) return O;
            var _ = f(M);
            return g !== void 0 && g(O, _) ? O : ((C = M), (S = _));
          }
          var x = !1,
            C,
            S,
            w = d === void 0 ? null : d;
          return [
            function () {
              return y(l());
            },
            w === null
              ? void 0
              : function () {
                  return y(w());
                },
          ];
        },
        [l, d, f, g],
      );
      var m = r(u, p[0], p[1]);
      return (
        i(
          function () {
            (h.hasValue = !0), (h.value = m);
          },
          [m],
        ),
        c(m),
        m
      );
    }),
    ii
  );
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
var Mc;
function gm() {
  return (
    Mc ||
      ((Mc = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
              "function" &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
              new Error(),
            );
          var e = j,
            t = Ad();
          function n(l, d) {
            return (
              (l === d && (l !== 0 || 1 / l === 1 / d)) || (l !== l && d !== d)
            );
          }
          var o = typeof Object.is == "function" ? Object.is : n,
            r = t.useSyncExternalStore,
            a = e.useRef,
            i = e.useEffect,
            s = e.useMemo,
            c = e.useDebugValue;
          function u(l, d, f, g, p) {
            var h = a(null),
              m;
            h.current === null
              ? ((m = {
                  hasValue: !1,
                  value: null,
                }),
                (h.current = m))
              : (m = h.current);
            var y = s(
                function () {
                  var w = !1,
                    M,
                    O,
                    _ = function ($) {
                      if (!w) {
                        (w = !0), (M = $);
                        var B = g($);
                        if (p !== void 0 && m.hasValue) {
                          var v = m.value;
                          if (p(v, B)) return (O = v), v;
                        }
                        return (O = B), B;
                      }
                      var k = M,
                        E = O;
                      if (o(k, $)) return E;
                      var N = g($);
                      return p !== void 0 && p(E, N)
                        ? E
                        : ((M = $), (O = N), N);
                    },
                    L = f === void 0 ? null : f,
                    I = function () {
                      return _(d());
                    },
                    P =
                      L === null
                        ? void 0
                        : function () {
                            return _(L());
                          };
                  return [I, P];
                },
                [d, f, g, p],
              ),
              x = y[0],
              C = y[1],
              S = r(l, x, C);
            return (
              i(
                function () {
                  (m.hasValue = !0), (m.value = S);
                },
                [S],
              ),
              c(S),
              S
            );
          }
          (ci.useSyncExternalStoreWithSelector = u),
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                new Error(),
              );
        })()),
    ci
  );
}
process.env.NODE_ENV === "production"
  ? (Ri.exports = fm())
  : (Ri.exports = gm());
var pm = Ri.exports;
const hm = /* @__PURE__ */ $n(pm);
var mm = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Tc = (e) => {
    let t;
    const n = /* @__PURE__ */ new Set(),
      o = (l, d) => {
        const f = typeof l == "function" ? l(t) : l;
        if (!Object.is(f, t)) {
          const g = t;
          (t =
            d ?? (typeof f != "object" || f === null)
              ? f
              : Object.assign({}, t, f)),
            n.forEach((p) => p(t, g));
        }
      },
      r = () => t,
      c = {
        setState: o,
        getState: r,
        getInitialState: () => u,
        subscribe: (l) => (n.add(l), () => n.delete(l)),
        destroy: () => {
          (mm ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            n.clear();
        },
      },
      u = (t = e(o, r, c));
    return c;
  },
  bm = (e) => (e ? Tc(e) : Tc),
  { useDebugValue: ym } = j,
  { useSyncExternalStoreWithSelector: vm } = hm,
  wm = (e) => e;
function Md(e, t = wm, n) {
  const o = vm(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n,
  );
  return ym(o), o;
}
const Oc = (e, t) => {
    const n = bm(e),
      o = (r, a = t) => Md(n, r, a);
    return Object.assign(o, n), o;
  },
  xm = (e, t) => (e ? Oc(e, t) : Oc);
function He(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [o, r] of e) if (!Object.is(r, t.get(o))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const o of e) if (!t.has(o)) return !1;
    return !0;
  }
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !1;
  for (const o of n)
    if (!Object.prototype.hasOwnProperty.call(t, o) || !Object.is(e[o], t[o]))
      return !1;
  return !0;
}
var Sm = { value: () => {} };
function Fr() {
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
function Cm(e, t) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var o = "",
        r = n.indexOf(".");
      if (
        (r >= 0 && ((o = n.slice(r + 1)), (n = n.slice(0, r))),
        n && !t.hasOwnProperty(n))
      )
        throw new Error("unknown type: " + n);
      return { type: n, name: o };
    });
}
ir.prototype = Fr.prototype = {
  constructor: ir,
  on: function (e, t) {
    var n = this._,
      o = Cm(e + "", n),
      r,
      a = -1,
      i = o.length;
    if (arguments.length < 2) {
      for (; ++a < i; )
        if ((r = (e = o[a]).type) && (r = Em(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++a < i; )
      if ((r = (e = o[a]).type)) n[r] = Nc(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Nc(n[r], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new ir(e);
  },
  call: function (e, t) {
    if ((r = arguments.length - 2) > 0)
      for (var n = new Array(r), o = 0, r, a; o < r; ++o)
        n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], o = 0, r = a.length; o < r; ++o) a[o].value.apply(t, n);
  },
  apply: function (e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var o = this._[e], r = 0, a = o.length; r < a; ++r)
      o[r].value.apply(t, n);
  },
};
function Em(e, t) {
  for (var n = 0, o = e.length, r; n < o; ++n)
    if ((r = e[n]).name === t) return r.value;
}
function Nc(e, t, n) {
  for (var o = 0, r = e.length; o < r; ++o)
    if (e[o].name === t) {
      (e[o] = Sm), (e = e.slice(0, o).concat(e.slice(o + 1)));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var zi = "http://www.w3.org/1999/xhtml";
const Dc = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: zi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Br(e) {
  var t = (e += ""),
    n = t.indexOf(":");
  return (
    n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)),
    Dc.hasOwnProperty(t) ? { space: Dc[t], local: e } : e
  );
}
function _m(e) {
  return function () {
    var t = this.ownerDocument,
      n = this.namespaceURI;
    return n === zi && t.documentElement.namespaceURI === zi
      ? t.createElement(e)
      : t.createElementNS(n, e);
  };
}
function km(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Td(e) {
  var t = Br(e);
  return (t.local ? km : _m)(t);
}
function Am() {}
function Ss(e) {
  return e == null
    ? Am
    : function () {
        return this.querySelector(e);
      };
}
function Mm(e) {
  typeof e != "function" && (e = Ss(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (
      var a = t[r], i = a.length, s = (o[r] = new Array(i)), c, u, l = 0;
      l < i;
      ++l
    )
      (c = a[l]) &&
        (u = e.call(c, c.__data__, l, a)) &&
        ("__data__" in c && (u.__data__ = c.__data__), (s[l] = u));
  return new Qe(o, this._parents);
}
function Tm(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Om() {
  return [];
}
function Od(e) {
  return e == null
    ? Om
    : function () {
        return this.querySelectorAll(e);
      };
}
function Nm(e) {
  return function () {
    return Tm(e.apply(this, arguments));
  };
}
function Dm(e) {
  typeof e == "function" ? (e = Nm(e)) : (e = Od(e));
  for (var t = this._groups, n = t.length, o = [], r = [], a = 0; a < n; ++a)
    for (var i = t[a], s = i.length, c, u = 0; u < s; ++u)
      (c = i[u]) && (o.push(e.call(c, c.__data__, u, i)), r.push(c));
  return new Qe(o, r);
}
function Nd(e) {
  return function () {
    return this.matches(e);
  };
}
function Dd(e) {
  return function (t) {
    return t.matches(e);
  };
}
var Rm = Array.prototype.find;
function zm(e) {
  return function () {
    return Rm.call(this.children, e);
  };
}
function Im() {
  return this.firstElementChild;
}
function Lm(e) {
  return this.select(e == null ? Im : zm(typeof e == "function" ? e : Dd(e)));
}
var Pm = Array.prototype.filter;
function Hm() {
  return Array.from(this.children);
}
function jm(e) {
  return function () {
    return Pm.call(this.children, e);
  };
}
function Fm(e) {
  return this.selectAll(
    e == null ? Hm : jm(typeof e == "function" ? e : Dd(e)),
  );
}
function Bm(e) {
  typeof e != "function" && (e = Nd(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var a = t[r], i = a.length, s = (o[r] = []), c, u = 0; u < i; ++u)
      (c = a[u]) && e.call(c, c.__data__, u, a) && s.push(c);
  return new Qe(o, this._parents);
}
function Rd(e) {
  return new Array(e.length);
}
function $m() {
  return new Qe(this._enter || this._groups.map(Rd), this._parents);
}
function xr(e, t) {
  (this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = t);
}
xr.prototype = {
  constructor: xr,
  appendChild: function (e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function (e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function (e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function (e) {
    return this._parent.querySelectorAll(e);
  },
};
function Wm(e) {
  return function () {
    return e;
  };
}
function Vm(e, t, n, o, r, a) {
  for (var i = 0, s, c = t.length, u = a.length; i < u; ++i)
    (s = t[i]) ? ((s.__data__ = a[i]), (o[i] = s)) : (n[i] = new xr(e, a[i]));
  for (; i < c; ++i) (s = t[i]) && (r[i] = s);
}
function qm(e, t, n, o, r, a, i) {
  var s,
    c,
    u = /* @__PURE__ */ new Map(),
    l = t.length,
    d = a.length,
    f = new Array(l),
    g;
  for (s = 0; s < l; ++s)
    (c = t[s]) &&
      ((f[s] = g = i.call(c, c.__data__, s, t) + ""),
      u.has(g) ? (r[s] = c) : u.set(g, c));
  for (s = 0; s < d; ++s)
    (g = i.call(e, a[s], s, a) + ""),
      (c = u.get(g))
        ? ((o[s] = c), (c.__data__ = a[s]), u.delete(g))
        : (n[s] = new xr(e, a[s]));
  for (s = 0; s < l; ++s) (c = t[s]) && u.get(f[s]) === c && (r[s] = c);
}
function Um(e) {
  return e.__data__;
}
function Ym(e, t) {
  if (!arguments.length) return Array.from(this, Um);
  var n = t ? qm : Vm,
    o = this._parents,
    r = this._groups;
  typeof e != "function" && (e = Wm(e));
  for (
    var a = r.length,
      i = new Array(a),
      s = new Array(a),
      c = new Array(a),
      u = 0;
    u < a;
    ++u
  ) {
    var l = o[u],
      d = r[u],
      f = d.length,
      g = Zm(e.call(l, l && l.__data__, u, o)),
      p = g.length,
      h = (s[u] = new Array(p)),
      m = (i[u] = new Array(p)),
      y = (c[u] = new Array(f));
    n(l, d, h, m, y, g, t);
    for (var x = 0, C = 0, S, w; x < p; ++x)
      if ((S = h[x])) {
        for (x >= C && (C = x + 1); !(w = m[C]) && ++C < p; );
        S._next = w || null;
      }
  }
  return (i = new Qe(i, o)), (i._enter = s), (i._exit = c), i;
}
function Zm(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Km() {
  return new Qe(this._exit || this._groups.map(Rd), this._parents);
}
function Xm(e, t, n) {
  var o = this.enter(),
    r = this,
    a = this.exit();
  return (
    typeof e == "function"
      ? ((o = e(o)), o && (o = o.selection()))
      : (o = o.append(e + "")),
    t != null && ((r = t(r)), r && (r = r.selection())),
    n == null ? a.remove() : n(a),
    o && r ? o.merge(r).order() : r
  );
}
function Gm(e) {
  for (
    var t = e.selection ? e.selection() : e,
      n = this._groups,
      o = t._groups,
      r = n.length,
      a = o.length,
      i = Math.min(r, a),
      s = new Array(r),
      c = 0;
    c < i;
    ++c
  )
    for (
      var u = n[c], l = o[c], d = u.length, f = (s[c] = new Array(d)), g, p = 0;
      p < d;
      ++p
    )
      (g = u[p] || l[p]) && (f[p] = g);
  for (; c < r; ++c) s[c] = n[c];
  return new Qe(s, this._parents);
}
function Qm() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], r = o.length - 1, a = o[r], i; --r >= 0; )
      (i = o[r]) &&
        (a &&
          i.compareDocumentPosition(a) ^ 4 &&
          a.parentNode.insertBefore(i, a),
        (a = i));
  return this;
}
function Jm(e) {
  e || (e = e3);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (
    var n = this._groups, o = n.length, r = new Array(o), a = 0;
    a < o;
    ++a
  ) {
    for (
      var i = n[a], s = i.length, c = (r[a] = new Array(s)), u, l = 0;
      l < s;
      ++l
    )
      (u = i[l]) && (c[l] = u);
    c.sort(t);
  }
  return new Qe(r, this._parents).order();
}
function e3(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function t3() {
  var e = arguments[0];
  return (arguments[0] = this), e.apply(null, arguments), this;
}
function n3() {
  return Array.from(this);
}
function o3() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, a = o.length; r < a; ++r) {
      var i = o[r];
      if (i) return i;
    }
  return null;
}
function r3() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function a3() {
  return !this.node();
}
function i3(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var r = t[n], a = 0, i = r.length, s; a < i; ++a)
      (s = r[a]) && e.call(s, s.__data__, a, r);
  return this;
}
function s3(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function l3(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function c3(e, t) {
  return function () {
    this.setAttribute(e, t);
  };
}
function u3(e, t) {
  return function () {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function d3(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function f3(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, n);
  };
}
function g3(e, t) {
  var n = Br(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each(
    (t == null
      ? n.local
        ? l3
        : s3
      : typeof t == "function"
        ? n.local
          ? f3
          : d3
        : n.local
          ? u3
          : c3)(n, t),
  );
}
function zd(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
function p3(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function h3(e, t, n) {
  return function () {
    this.style.setProperty(e, t, n);
  };
}
function m3(e, t, n) {
  return function () {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function b3(e, t, n) {
  return arguments.length > 1
    ? this.each(
        (t == null ? p3 : typeof t == "function" ? m3 : h3)(e, t, n ?? ""),
      )
    : Ln(this.node(), e);
}
function Ln(e, t) {
  return (
    e.style.getPropertyValue(t) ||
    zd(e).getComputedStyle(e, null).getPropertyValue(t)
  );
}
function y3(e) {
  return function () {
    delete this[e];
  };
}
function v3(e, t) {
  return function () {
    this[e] = t;
  };
}
function w3(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : (this[e] = n);
  };
}
function x3(e, t) {
  return arguments.length > 1
    ? this.each((t == null ? y3 : typeof t == "function" ? w3 : v3)(e, t))
    : this.node()[e];
}
function Id(e) {
  return e.trim().split(/^|\s+/);
}
function Cs(e) {
  return e.classList || new Ld(e);
}
function Ld(e) {
  (this._node = e), (this._names = Id(e.getAttribute("class") || ""));
}
Ld.prototype = {
  add: function (e) {
    var t = this._names.indexOf(e);
    t < 0 &&
      (this._names.push(e),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (e) {
    var t = this._names.indexOf(e);
    t >= 0 &&
      (this._names.splice(t, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (e) {
    return this._names.indexOf(e) >= 0;
  },
};
function Pd(e, t) {
  for (var n = Cs(e), o = -1, r = t.length; ++o < r; ) n.add(t[o]);
}
function Hd(e, t) {
  for (var n = Cs(e), o = -1, r = t.length; ++o < r; ) n.remove(t[o]);
}
function S3(e) {
  return function () {
    Pd(this, e);
  };
}
function C3(e) {
  return function () {
    Hd(this, e);
  };
}
function E3(e, t) {
  return function () {
    (t.apply(this, arguments) ? Pd : Hd)(this, e);
  };
}
function _3(e, t) {
  var n = Id(e + "");
  if (arguments.length < 2) {
    for (var o = Cs(this.node()), r = -1, a = n.length; ++r < a; )
      if (!o.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? E3 : t ? S3 : C3)(n, t));
}
function k3() {
  this.textContent = "";
}
function A3(e) {
  return function () {
    this.textContent = e;
  };
}
function M3(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function T3(e) {
  return arguments.length
    ? this.each(e == null ? k3 : (typeof e == "function" ? M3 : A3)(e))
    : this.node().textContent;
}
function O3() {
  this.innerHTML = "";
}
function N3(e) {
  return function () {
    this.innerHTML = e;
  };
}
function D3(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function R3(e) {
  return arguments.length
    ? this.each(e == null ? O3 : (typeof e == "function" ? D3 : N3)(e))
    : this.node().innerHTML;
}
function z3() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function I3() {
  return this.each(z3);
}
function L3() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function P3() {
  return this.each(L3);
}
function H3(e) {
  var t = typeof e == "function" ? e : Td(e);
  return this.select(function () {
    return this.appendChild(t.apply(this, arguments));
  });
}
function j3() {
  return null;
}
function F3(e, t) {
  var n = typeof e == "function" ? e : Td(e),
    o = t == null ? j3 : typeof t == "function" ? t : Ss(t);
  return this.select(function () {
    return this.insertBefore(
      n.apply(this, arguments),
      o.apply(this, arguments) || null,
    );
  });
}
function B3() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function $3() {
  return this.each(B3);
}
function W3() {
  var e = this.cloneNode(!1),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function V3() {
  var e = this.cloneNode(!0),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function q3(e) {
  return this.select(e ? V3 : W3);
}
function U3(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Y3(e) {
  return function (t) {
    e.call(this, t, this.__data__);
  };
}
function Z3(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var n = "",
        o = t.indexOf(".");
      return (
        o >= 0 && ((n = t.slice(o + 1)), (t = t.slice(0, o))),
        { type: t, name: n }
      );
    });
}
function K3(e) {
  return function () {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, r = t.length, a; n < r; ++n)
        (a = t[n]),
          (!e.type || a.type === e.type) && a.name === e.name
            ? this.removeEventListener(a.type, a.listener, a.options)
            : (t[++o] = a);
      ++o ? (t.length = o) : delete this.__on;
    }
  };
}
function X3(e, t, n) {
  return function () {
    var o = this.__on,
      r,
      a = Y3(t);
    if (o) {
      for (var i = 0, s = o.length; i < s; ++i)
        if ((r = o[i]).type === e.type && r.name === e.name) {
          this.removeEventListener(r.type, r.listener, r.options),
            this.addEventListener(r.type, (r.listener = a), (r.options = n)),
            (r.value = t);
          return;
        }
    }
    this.addEventListener(e.type, a, n),
      (r = { type: e.type, name: e.name, value: t, listener: a, options: n }),
      o ? o.push(r) : (this.__on = [r]);
  };
}
function G3(e, t, n) {
  var o = Z3(e + ""),
    r,
    a = o.length,
    i;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var c = 0, u = s.length, l; c < u; ++c)
        for (r = 0, l = s[c]; r < a; ++r)
          if ((i = o[r]).type === l.type && i.name === l.name) return l.value;
    }
    return;
  }
  for (s = t ? X3 : K3, r = 0; r < a; ++r) this.each(s(o[r], t, n));
  return this;
}
function jd(e, t, n) {
  var o = zd(e),
    r = o.CustomEvent;
  typeof r == "function"
    ? (r = new r(t, n))
    : ((r = o.document.createEvent("Event")),
      n
        ? (r.initEvent(t, n.bubbles, n.cancelable), (r.detail = n.detail))
        : r.initEvent(t, !1, !1)),
    e.dispatchEvent(r);
}
function Q3(e, t) {
  return function () {
    return jd(this, e, t);
  };
}
function J3(e, t) {
  return function () {
    return jd(this, e, t.apply(this, arguments));
  };
}
function eb(e, t) {
  return this.each((typeof t == "function" ? J3 : Q3)(e, t));
}
function* tb() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, a = o.length, i; r < a; ++r)
      (i = o[r]) && (yield i);
}
var Fd = [null];
function Qe(e, t) {
  (this._groups = e), (this._parents = t);
}
function Ao() {
  return new Qe([[document.documentElement]], Fd);
}
function nb() {
  return this;
}
Qe.prototype = Ao.prototype = {
  constructor: Qe,
  select: Mm,
  selectAll: Dm,
  selectChild: Lm,
  selectChildren: Fm,
  filter: Bm,
  data: Ym,
  enter: $m,
  exit: Km,
  join: Xm,
  merge: Gm,
  selection: nb,
  order: Qm,
  sort: Jm,
  call: t3,
  nodes: n3,
  node: o3,
  size: r3,
  empty: a3,
  each: i3,
  attr: g3,
  style: b3,
  property: x3,
  classed: _3,
  text: T3,
  html: R3,
  raise: I3,
  lower: P3,
  append: H3,
  insert: F3,
  remove: $3,
  clone: q3,
  datum: U3,
  on: G3,
  dispatch: eb,
  [Symbol.iterator]: tb,
};
function ut(e) {
  return typeof e == "string"
    ? new Qe([[document.querySelector(e)]], [document.documentElement])
    : new Qe([[e]], Fd);
}
function ob(e) {
  let t;
  for (; (t = e.sourceEvent); ) e = t;
  return e;
}
function vt(e, t) {
  if (((e = ob(e)), t === void 0 && (t = e.currentTarget), t)) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var o = n.createSVGPoint();
      return (
        (o.x = e.clientX),
        (o.y = e.clientY),
        (o = o.matrixTransform(t.getScreenCTM().inverse())),
        [o.x, o.y]
      );
    }
    if (t.getBoundingClientRect) {
      var r = t.getBoundingClientRect();
      return [
        e.clientX - r.left - t.clientLeft,
        e.clientY - r.top - t.clientTop,
      ];
    }
  }
  return [e.pageX, e.pageY];
}
const rb = { passive: !1 },
  fo = { capture: !0, passive: !1 };
function ui(e) {
  e.stopImmediatePropagation();
}
function An(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Bd(e) {
  var t = e.document.documentElement,
    n = ut(e).on("dragstart.drag", An, fo);
  "onselectstart" in t
    ? n.on("selectstart.drag", An, fo)
    : ((t.__noselect = t.style.MozUserSelect),
      (t.style.MozUserSelect = "none"));
}
function $d(e, t) {
  var n = e.document.documentElement,
    o = ut(e).on("dragstart.drag", null);
  t &&
    (o.on("click.drag", An, fo),
    setTimeout(function () {
      o.on("click.drag", null);
    }, 0)),
    "onselectstart" in n
      ? o.on("selectstart.drag", null)
      : ((n.style.MozUserSelect = n.__noselect), delete n.__noselect);
}
const Vo = (e) => () => e;
function Ii(
  e,
  {
    sourceEvent: t,
    subject: n,
    target: o,
    identifier: r,
    active: a,
    x: i,
    y: s,
    dx: c,
    dy: u,
    dispatch: l,
  },
) {
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
    _: { value: l },
  });
}
Ii.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function ab(e) {
  return !e.ctrlKey && !e.button;
}
function ib() {
  return this.parentNode;
}
function sb(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function lb() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function cb() {
  var e = ab,
    t = ib,
    n = sb,
    o = lb,
    r = {},
    a = Fr("start", "drag", "end"),
    i = 0,
    s,
    c,
    u,
    l,
    d = 0;
  function f(S) {
    S.on("mousedown.drag", g)
      .filter(o)
      .on("touchstart.drag", m)
      .on("touchmove.drag", y, rb)
      .on("touchend.drag touchcancel.drag", x)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(S, w) {
    if (!(l || !e.call(this, S, w))) {
      var M = C(this, t.call(this, S, w), S, w, "mouse");
      M &&
        (ut(S.view).on("mousemove.drag", p, fo).on("mouseup.drag", h, fo),
        Bd(S.view),
        ui(S),
        (u = !1),
        (s = S.clientX),
        (c = S.clientY),
        M("start", S));
    }
  }
  function p(S) {
    if ((An(S), !u)) {
      var w = S.clientX - s,
        M = S.clientY - c;
      u = w * w + M * M > d;
    }
    r.mouse("drag", S);
  }
  function h(S) {
    ut(S.view).on("mousemove.drag mouseup.drag", null),
      $d(S.view, u),
      An(S),
      r.mouse("end", S);
  }
  function m(S, w) {
    if (e.call(this, S, w)) {
      var M = S.changedTouches,
        O = t.call(this, S, w),
        _ = M.length,
        L,
        I;
      for (L = 0; L < _; ++L)
        (I = C(this, O, S, w, M[L].identifier, M[L])) &&
          (ui(S), I("start", S, M[L]));
    }
  }
  function y(S) {
    var w = S.changedTouches,
      M = w.length,
      O,
      _;
    for (O = 0; O < M; ++O)
      (_ = r[w[O].identifier]) && (An(S), _("drag", S, w[O]));
  }
  function x(S) {
    var w = S.changedTouches,
      M = w.length,
      O,
      _;
    for (
      l && clearTimeout(l),
        l = setTimeout(function () {
          l = null;
        }, 500),
        O = 0;
      O < M;
      ++O
    )
      (_ = r[w[O].identifier]) && (ui(S), _("end", S, w[O]));
  }
  function C(S, w, M, O, _, L) {
    var I = a.copy(),
      P = vt(L || M, w),
      $,
      B,
      v;
    if (
      (v = n.call(
        S,
        new Ii("beforestart", {
          sourceEvent: M,
          target: f,
          identifier: _,
          active: i,
          x: P[0],
          y: P[1],
          dx: 0,
          dy: 0,
          dispatch: I,
        }),
        O,
      )) != null
    )
      return (
        ($ = v.x - P[0] || 0),
        (B = v.y - P[1] || 0),
        function k(E, N, z) {
          var T = P,
            A;
          switch (E) {
            case "start":
              (r[_] = k), (A = i++);
              break;
            case "end":
              delete r[_], --i;
            case "drag":
              (P = vt(z || N, w)), (A = i);
              break;
          }
          I.call(
            E,
            S,
            new Ii(E, {
              sourceEvent: N,
              subject: v,
              target: f,
              identifier: _,
              active: A,
              x: P[0] + $,
              y: P[1] + B,
              dx: P[0] - T[0],
              dy: P[1] - T[1],
              dispatch: I,
            }),
            O,
          );
        }
      );
  }
  return (
    (f.filter = function (S) {
      return arguments.length
        ? ((e = typeof S == "function" ? S : Vo(!!S)), f)
        : e;
    }),
    (f.container = function (S) {
      return arguments.length
        ? ((t = typeof S == "function" ? S : Vo(S)), f)
        : t;
    }),
    (f.subject = function (S) {
      return arguments.length
        ? ((n = typeof S == "function" ? S : Vo(S)), f)
        : n;
    }),
    (f.touchable = function (S) {
      return arguments.length
        ? ((o = typeof S == "function" ? S : Vo(!!S)), f)
        : o;
    }),
    (f.on = function () {
      var S = a.on.apply(a, arguments);
      return S === a ? f : S;
    }),
    (f.clickDistance = function (S) {
      return arguments.length ? ((d = (S = +S) * S), f) : Math.sqrt(d);
    }),
    f
  );
}
function Es(e, t, n) {
  (e.prototype = t.prototype = n), (n.constructor = e);
}
function Wd(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t) n[o] = t[o];
  return n;
}
function Mo() {}
var go = 0.7,
  Sr = 1 / go,
  Mn = "\\s*([+-]?\\d+)\\s*",
  po = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  xt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  ub = /^#([0-9a-f]{3,8})$/,
  db = new RegExp(`^rgb\\(${Mn},${Mn},${Mn}\\)$`),
  fb = new RegExp(`^rgb\\(${xt},${xt},${xt}\\)$`),
  gb = new RegExp(`^rgba\\(${Mn},${Mn},${Mn},${po}\\)$`),
  pb = new RegExp(`^rgba\\(${xt},${xt},${xt},${po}\\)$`),
  hb = new RegExp(`^hsl\\(${po},${xt},${xt}\\)$`),
  mb = new RegExp(`^hsla\\(${po},${xt},${xt},${po}\\)$`),
  Rc = {
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
    yellowgreen: 10145074,
  };
Es(Mo, ho, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: zc,
  // Deprecated! Use color.formatHex.
  formatHex: zc,
  formatHex8: bb,
  formatHsl: yb,
  formatRgb: Ic,
  toString: Ic,
});
function zc() {
  return this.rgb().formatHex();
}
function bb() {
  return this.rgb().formatHex8();
}
function yb() {
  return Vd(this).formatHsl();
}
function Ic() {
  return this.rgb().formatRgb();
}
function ho(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = ub.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? Lc(t)
          : n === 3
            ? new Ue(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : n === 8
              ? qo(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255,
                )
              : n === 4
                ? qo(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = db.exec(e))
        ? new Ue(t[1], t[2], t[3], 1)
        : (t = fb.exec(e))
          ? new Ue(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1,
            )
          : (t = gb.exec(e))
            ? qo(t[1], t[2], t[3], t[4])
            : (t = pb.exec(e))
              ? qo(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4],
                )
              : (t = hb.exec(e))
                ? jc(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = mb.exec(e))
                  ? jc(t[1], t[2] / 100, t[3] / 100, t[4])
                  : Rc.hasOwnProperty(e)
                    ? Lc(Rc[e])
                    : e === "transparent"
                      ? new Ue(NaN, NaN, NaN, 0)
                      : null
  );
}
function Lc(e) {
  return new Ue((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function qo(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Ue(e, t, n, o);
}
function vb(e) {
  return (
    e instanceof Mo || (e = ho(e)),
    e ? ((e = e.rgb()), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue()
  );
}
function Li(e, t, n, o) {
  return arguments.length === 1 ? vb(e) : new Ue(e, t, n, o ?? 1);
}
function Ue(e, t, n, o) {
  (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +o);
}
Es(
  Ue,
  Li,
  Wd(Mo, {
    brighter(e) {
      return (
        (e = e == null ? Sr : Math.pow(Sr, e)),
        new Ue(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? go : Math.pow(go, e)),
        new Ue(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Ue(un(this.r), un(this.g), un(this.b), Cr(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: Pc,
    // Deprecated! Use color.formatHex.
    formatHex: Pc,
    formatHex8: wb,
    formatRgb: Hc,
    toString: Hc,
  }),
);
function Pc() {
  return `#${ln(this.r)}${ln(this.g)}${ln(this.b)}`;
}
function wb() {
  return `#${ln(this.r)}${ln(this.g)}${ln(this.b)}${ln((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Hc() {
  const e = Cr(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${un(this.r)}, ${un(this.g)}, ${un(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Cr(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function un(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ln(e) {
  return (e = un(e)), (e < 16 ? "0" : "") + e.toString(16);
}
function jc(e, t, n, o) {
  return (
    o <= 0
      ? (e = t = n = NaN)
      : n <= 0 || n >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new dt(e, t, n, o)
  );
}
function Vd(e) {
  if (e instanceof dt) return new dt(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Mo || (e = ho(e)), !e)) return new dt();
  if (e instanceof dt) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    o = e.b / 255,
    r = Math.min(t, n, o),
    a = Math.max(t, n, o),
    i = NaN,
    s = a - r,
    c = (a + r) / 2;
  return (
    s
      ? (t === a
          ? (i = (n - o) / s + (n < o) * 6)
          : n === a
            ? (i = (o - t) / s + 2)
            : (i = (t - n) / s + 4),
        (s /= c < 0.5 ? a + r : 2 - a - r),
        (i *= 60))
      : (s = c > 0 && c < 1 ? 0 : i),
    new dt(i, s, c, e.opacity)
  );
}
function xb(e, t, n, o) {
  return arguments.length === 1 ? Vd(e) : new dt(e, t, n, o ?? 1);
}
function dt(e, t, n, o) {
  (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +o);
}
Es(
  dt,
  xb,
  Wd(Mo, {
    brighter(e) {
      return (
        (e = e == null ? Sr : Math.pow(Sr, e)),
        new dt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? go : Math.pow(go, e)),
        new dt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        o = n + (n < 0.5 ? n : 1 - n) * t,
        r = 2 * n - o;
      return new Ue(
        di(e >= 240 ? e - 240 : e + 120, r, o),
        di(e, r, o),
        di(e < 120 ? e + 240 : e - 120, r, o),
        this.opacity,
      );
    },
    clamp() {
      return new dt(Fc(this.h), Uo(this.s), Uo(this.l), Cr(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = Cr(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${Fc(this.h)}, ${Uo(this.s) * 100}%, ${Uo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function Fc(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function Uo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function di(e, t, n) {
  return (
    (e < 60
      ? t + ((n - t) * e) / 60
      : e < 180
        ? n
        : e < 240
          ? t + ((n - t) * (240 - e)) / 60
          : t) * 255
  );
}
const qd = (e) => () => e;
function Sb(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function Cb(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (o) {
      return Math.pow(e + o * t, n);
    }
  );
}
function Eb(e) {
  return (e = +e) == 1
    ? Ud
    : function (t, n) {
        return n - t ? Cb(t, n, e) : qd(isNaN(t) ? n : t);
      };
}
function Ud(e, t) {
  var n = t - e;
  return n ? Sb(e, n) : qd(isNaN(e) ? t : e);
}
const Bc = (function e(t) {
  var n = Eb(t);
  function o(r, a) {
    var i = n((r = Li(r)).r, (a = Li(a)).r),
      s = n(r.g, a.g),
      c = n(r.b, a.b),
      u = Ud(r.opacity, a.opacity);
    return function (l) {
      return (
        (r.r = i(l)), (r.g = s(l)), (r.b = c(l)), (r.opacity = u(l)), r + ""
      );
    };
  }
  return (o.gamma = e), o;
})(1);
function Ut(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
var Pi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  fi = new RegExp(Pi.source, "g");
function _b(e) {
  return function () {
    return e;
  };
}
function kb(e) {
  return function (t) {
    return e(t) + "";
  };
}
function Ab(e, t) {
  var n = (Pi.lastIndex = fi.lastIndex = 0),
    o,
    r,
    a,
    i = -1,
    s = [],
    c = [];
  for (e = e + "", t = t + ""; (o = Pi.exec(e)) && (r = fi.exec(t)); )
    (a = r.index) > n &&
      ((a = t.slice(n, a)), s[i] ? (s[i] += a) : (s[++i] = a)),
      (o = o[0]) === (r = r[0])
        ? s[i]
          ? (s[i] += r)
          : (s[++i] = r)
        : ((s[++i] = null), c.push({ i, x: Ut(o, r) })),
      (n = fi.lastIndex);
  return (
    n < t.length && ((a = t.slice(n)), s[i] ? (s[i] += a) : (s[++i] = a)),
    s.length < 2
      ? c[0]
        ? kb(c[0].x)
        : _b(t)
      : ((t = c.length),
        function (u) {
          for (var l = 0, d; l < t; ++l) s[(d = c[l]).i] = d.x(u);
          return s.join("");
        })
  );
}
var $c = 180 / Math.PI,
  Hi = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Yd(e, t, n, o, r, a) {
  var i, s, c;
  return (
    (i = Math.sqrt(e * e + t * t)) && ((e /= i), (t /= i)),
    (c = e * n + t * o) && ((n -= e * c), (o -= t * c)),
    (s = Math.sqrt(n * n + o * o)) && ((n /= s), (o /= s), (c /= s)),
    e * o < t * n && ((e = -e), (t = -t), (c = -c), (i = -i)),
    {
      translateX: r,
      translateY: a,
      rotate: Math.atan2(t, e) * $c,
      skewX: Math.atan(c) * $c,
      scaleX: i,
      scaleY: s,
    }
  );
}
var Yo;
function Mb(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + "",
  );
  return t.isIdentity ? Hi : Yd(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Tb(e) {
  return e == null ||
    (Yo || (Yo = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    Yo.setAttribute("transform", e),
    !(e = Yo.transform.baseVal.consolidate()))
    ? Hi
    : ((e = e.matrix), Yd(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Zd(e, t, n, o) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function a(u, l, d, f, g, p) {
    if (u !== d || l !== f) {
      var h = g.push("translate(", null, t, null, n);
      p.push({ i: h - 4, x: Ut(u, d) }, { i: h - 2, x: Ut(l, f) });
    } else (d || f) && g.push("translate(" + d + t + f + n);
  }
  function i(u, l, d, f) {
    u !== l
      ? (u - l > 180 ? (l += 360) : l - u > 180 && (u += 360),
        f.push({ i: d.push(r(d) + "rotate(", null, o) - 2, x: Ut(u, l) }))
      : l && d.push(r(d) + "rotate(" + l + o);
  }
  function s(u, l, d, f) {
    u !== l
      ? f.push({ i: d.push(r(d) + "skewX(", null, o) - 2, x: Ut(u, l) })
      : l && d.push(r(d) + "skewX(" + l + o);
  }
  function c(u, l, d, f, g, p) {
    if (u !== d || l !== f) {
      var h = g.push(r(g) + "scale(", null, ",", null, ")");
      p.push({ i: h - 4, x: Ut(u, d) }, { i: h - 2, x: Ut(l, f) });
    } else (d !== 1 || f !== 1) && g.push(r(g) + "scale(" + d + "," + f + ")");
  }
  return function (u, l) {
    var d = [],
      f = [];
    return (
      (u = e(u)),
      (l = e(l)),
      a(u.translateX, u.translateY, l.translateX, l.translateY, d, f),
      i(u.rotate, l.rotate, d, f),
      s(u.skewX, l.skewX, d, f),
      c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, d, f),
      (u = l = null),
      function (g) {
        for (var p = -1, h = f.length, m; ++p < h; ) d[(m = f[p]).i] = m.x(g);
        return d.join("");
      }
    );
  };
}
var Ob = Zd(Mb, "px, ", "px)", "deg)"),
  Nb = Zd(Tb, ", ", ")", ")"),
  Db = 1e-12;
function Wc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Rb(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function zb(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ib = (function e(t, n, o) {
  function r(a, i) {
    var s = a[0],
      c = a[1],
      u = a[2],
      l = i[0],
      d = i[1],
      f = i[2],
      g = l - s,
      p = d - c,
      h = g * g + p * p,
      m,
      y;
    if (h < Db)
      (y = Math.log(f / u) / t),
        (m = function (O) {
          return [s + O * g, c + O * p, u * Math.exp(t * O * y)];
        });
    else {
      var x = Math.sqrt(h),
        C = (f * f - u * u + o * h) / (2 * u * n * x),
        S = (f * f - u * u - o * h) / (2 * f * n * x),
        w = Math.log(Math.sqrt(C * C + 1) - C),
        M = Math.log(Math.sqrt(S * S + 1) - S);
      (y = (M - w) / t),
        (m = function (O) {
          var _ = O * y,
            L = Wc(w),
            I = (u / (n * x)) * (L * zb(t * _ + w) - Rb(w));
          return [s + I * g, c + I * p, (u * L) / Wc(t * _ + w)];
        });
    }
    return (m.duration = (y * 1e3 * t) / Math.SQRT2), m;
  }
  return (
    (r.rho = function (a) {
      var i = Math.max(1e-3, +a),
        s = i * i,
        c = s * s;
      return e(i, s, c);
    }),
    r
  );
})(Math.SQRT2, 2, 4);
var Pn = 0,
  eo = 0,
  Zn = 0,
  Kd = 1e3,
  Er,
  to,
  _r = 0,
  fn = 0,
  $r = 0,
  mo = typeof performance == "object" && performance.now ? performance : Date,
  Xd =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function _s() {
  return fn || (Xd(Lb), (fn = mo.now() + $r));
}
function Lb() {
  fn = 0;
}
function kr() {
  this._call = this._time = this._next = null;
}
kr.prototype = Gd.prototype = {
  constructor: kr,
  restart: function (e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    (n = (n == null ? _s() : +n) + (t == null ? 0 : +t)),
      !this._next &&
        to !== this &&
        (to ? (to._next = this) : (Er = this), (to = this)),
      (this._call = e),
      (this._time = n),
      ji();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), ji());
  },
};
function Gd(e, t, n) {
  var o = new kr();
  return o.restart(e, t, n), o;
}
function Pb() {
  _s(), ++Pn;
  for (var e = Er, t; e; )
    (t = fn - e._time) >= 0 && e._call.call(void 0, t), (e = e._next);
  --Pn;
}
function Vc() {
  (fn = (_r = mo.now()) + $r), (Pn = eo = 0);
  try {
    Pb();
  } finally {
    (Pn = 0), jb(), (fn = 0);
  }
}
function Hb() {
  var e = mo.now(),
    t = e - _r;
  t > Kd && (($r -= t), (_r = e));
}
function jb() {
  for (var e, t = Er, n, o = 1 / 0; t; )
    t._call
      ? (o > t._time && (o = t._time), (e = t), (t = t._next))
      : ((n = t._next), (t._next = null), (t = e ? (e._next = n) : (Er = n)));
  (to = e), ji(o);
}
function ji(e) {
  if (!Pn) {
    eo && (eo = clearTimeout(eo));
    var t = e - fn;
    t > 24
      ? (e < 1 / 0 && (eo = setTimeout(Vc, e - mo.now() - $r)),
        Zn && (Zn = clearInterval(Zn)))
      : (Zn || ((_r = mo.now()), (Zn = setInterval(Hb, Kd))), (Pn = 1), Xd(Vc));
  }
}
function qc(e, t, n) {
  var o = new kr();
  return (
    (t = t == null ? 0 : +t),
    o.restart(
      (r) => {
        o.stop(), e(r + t);
      },
      t,
      n,
    ),
    o
  );
}
var Fb = Fr("start", "end", "cancel", "interrupt"),
  Bb = [],
  Qd = 0,
  Uc = 1,
  Fi = 2,
  sr = 3,
  Yc = 4,
  Bi = 5,
  lr = 6;
function Wr(e, t, n, o, r, a) {
  var i = e.__transition;
  if (!i) e.__transition = {};
  else if (n in i) return;
  $b(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Fb,
    tween: Bb,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: Qd,
  });
}
function ks(e, t) {
  var n = ht(e, t);
  if (n.state > Qd) throw new Error("too late; already scheduled");
  return n;
}
function Ct(e, t) {
  var n = ht(e, t);
  if (n.state > sr) throw new Error("too late; already running");
  return n;
}
function ht(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function $b(e, t, n) {
  var o = e.__transition,
    r;
  (o[t] = n), (n.timer = Gd(a, 0, n.time));
  function a(u) {
    (n.state = Uc),
      n.timer.restart(i, n.delay, n.time),
      n.delay <= u && i(u - n.delay);
  }
  function i(u) {
    var l, d, f, g;
    if (n.state !== Uc) return c();
    for (l in o)
      if (((g = o[l]), g.name === n.name)) {
        if (g.state === sr) return qc(i);
        g.state === Yc
          ? ((g.state = lr),
            g.timer.stop(),
            g.on.call("interrupt", e, e.__data__, g.index, g.group),
            delete o[l])
          : +l < t &&
            ((g.state = lr),
            g.timer.stop(),
            g.on.call("cancel", e, e.__data__, g.index, g.group),
            delete o[l]);
      }
    if (
      (qc(function () {
        n.state === sr &&
          ((n.state = Yc), n.timer.restart(s, n.delay, n.time), s(u));
      }),
      (n.state = Fi),
      n.on.call("start", e, e.__data__, n.index, n.group),
      n.state === Fi)
    ) {
      for (
        n.state = sr, r = new Array((f = n.tween.length)), l = 0, d = -1;
        l < f;
        ++l
      )
        (g = n.tween[l].value.call(e, e.__data__, n.index, n.group)) &&
          (r[++d] = g);
      r.length = d + 1;
    }
  }
  function s(u) {
    for (
      var l =
          u < n.duration
            ? n.ease.call(null, u / n.duration)
            : (n.timer.restart(c), (n.state = Bi), 1),
        d = -1,
        f = r.length;
      ++d < f;

    )
      r[d].call(e, l);
    n.state === Bi && (n.on.call("end", e, e.__data__, n.index, n.group), c());
  }
  function c() {
    (n.state = lr), n.timer.stop(), delete o[t];
    for (var u in o) return;
    delete e.__transition;
  }
}
function cr(e, t) {
  var n = e.__transition,
    o,
    r,
    a = !0,
    i;
  if (n) {
    t = t == null ? null : t + "";
    for (i in n) {
      if ((o = n[i]).name !== t) {
        a = !1;
        continue;
      }
      (r = o.state > Fi && o.state < Bi),
        (o.state = lr),
        o.timer.stop(),
        o.on.call(r ? "interrupt" : "cancel", e, e.__data__, o.index, o.group),
        delete n[i];
    }
    a && delete e.__transition;
  }
}
function Wb(e) {
  return this.each(function () {
    cr(this, e);
  });
}
function Vb(e, t) {
  var n, o;
  return function () {
    var r = Ct(this, e),
      a = r.tween;
    if (a !== n) {
      o = n = a;
      for (var i = 0, s = o.length; i < s; ++i)
        if (o[i].name === t) {
          (o = o.slice()), o.splice(i, 1);
          break;
        }
    }
    r.tween = o;
  };
}
function qb(e, t, n) {
  var o, r;
  if (typeof n != "function") throw new Error();
  return function () {
    var a = Ct(this, e),
      i = a.tween;
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
function Ub(e, t) {
  var n = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var o = ht(this.node(), n).tween, r = 0, a = o.length, i; r < a; ++r)
      if ((i = o[r]).name === e) return i.value;
    return null;
  }
  return this.each((t == null ? Vb : qb)(n, e, t));
}
function As(e, t, n) {
  var o = e._id;
  return (
    e.each(function () {
      var r = Ct(this, o);
      (r.value || (r.value = {}))[t] = n.apply(this, arguments);
    }),
    function (r) {
      return ht(r, o).value[t];
    }
  );
}
function Jd(e, t) {
  var n;
  return (
    typeof t == "number"
      ? Ut
      : t instanceof ho
        ? Bc
        : (n = ho(t))
          ? ((t = n), Bc)
          : Ab
  )(e, t);
}
function Yb(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function Zb(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Kb(e, t, n) {
  var o,
    r = n + "",
    a;
  return function () {
    var i = this.getAttribute(e);
    return i === r ? null : i === o ? a : (a = t((o = i), n));
  };
}
function Xb(e, t, n) {
  var o,
    r = n + "",
    a;
  return function () {
    var i = this.getAttributeNS(e.space, e.local);
    return i === r ? null : i === o ? a : (a = t((o = i), n));
  };
}
function Gb(e, t, n) {
  var o, r, a;
  return function () {
    var i,
      s = n(this),
      c;
    return s == null
      ? void this.removeAttribute(e)
      : ((i = this.getAttribute(e)),
        (c = s + ""),
        i === c
          ? null
          : i === o && c === r
            ? a
            : ((r = c), (a = t((o = i), s))));
  };
}
function Qb(e, t, n) {
  var o, r, a;
  return function () {
    var i,
      s = n(this),
      c;
    return s == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((i = this.getAttributeNS(e.space, e.local)),
        (c = s + ""),
        i === c
          ? null
          : i === o && c === r
            ? a
            : ((r = c), (a = t((o = i), s))));
  };
}
function Jb(e, t) {
  var n = Br(e),
    o = n === "transform" ? Nb : Jd;
  return this.attrTween(
    e,
    typeof t == "function"
      ? (n.local ? Qb : Gb)(n, o, As(this, "attr." + e, t))
      : t == null
        ? (n.local ? Zb : Yb)(n)
        : (n.local ? Xb : Kb)(n, o, t),
  );
}
function e5(e, t) {
  return function (n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function t5(e, t) {
  return function (n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function n5(e, t) {
  var n, o;
  function r() {
    var a = t.apply(this, arguments);
    return a !== o && (n = (o = a) && t5(e, a)), n;
  }
  return (r._value = t), r;
}
function o5(e, t) {
  var n, o;
  function r() {
    var a = t.apply(this, arguments);
    return a !== o && (n = (o = a) && e5(e, a)), n;
  }
  return (r._value = t), r;
}
function r5(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var o = Br(e);
  return this.tween(n, (o.local ? n5 : o5)(o, t));
}
function a5(e, t) {
  return function () {
    ks(this, e).delay = +t.apply(this, arguments);
  };
}
function i5(e, t) {
  return (
    (t = +t),
    function () {
      ks(this, e).delay = t;
    }
  );
}
function s5(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? a5 : i5)(t, e))
    : ht(this.node(), t).delay;
}
function l5(e, t) {
  return function () {
    Ct(this, e).duration = +t.apply(this, arguments);
  };
}
function c5(e, t) {
  return (
    (t = +t),
    function () {
      Ct(this, e).duration = t;
    }
  );
}
function u5(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? l5 : c5)(t, e))
    : ht(this.node(), t).duration;
}
function d5(e, t) {
  if (typeof t != "function") throw new Error();
  return function () {
    Ct(this, e).ease = t;
  };
}
function f5(e) {
  var t = this._id;
  return arguments.length ? this.each(d5(t, e)) : ht(this.node(), t).ease;
}
function g5(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ct(this, e).ease = n;
  };
}
function p5(e) {
  if (typeof e != "function") throw new Error();
  return this.each(g5(this._id, e));
}
function h5(e) {
  typeof e != "function" && (e = Nd(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var a = t[r], i = a.length, s = (o[r] = []), c, u = 0; u < i; ++u)
      (c = a[u]) && e.call(c, c.__data__, u, a) && s.push(c);
  return new Ht(o, this._parents, this._name, this._id);
}
function m5(e) {
  if (e._id !== this._id) throw new Error();
  for (
    var t = this._groups,
      n = e._groups,
      o = t.length,
      r = n.length,
      a = Math.min(o, r),
      i = new Array(o),
      s = 0;
    s < a;
    ++s
  )
    for (
      var c = t[s], u = n[s], l = c.length, d = (i[s] = new Array(l)), f, g = 0;
      g < l;
      ++g
    )
      (f = c[g] || u[g]) && (d[g] = f);
  for (; s < o; ++s) i[s] = t[s];
  return new Ht(i, this._parents, this._name, this._id);
}
function b5(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (t) {
      var n = t.indexOf(".");
      return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
    });
}
function y5(e, t, n) {
  var o,
    r,
    a = b5(t) ? ks : Ct;
  return function () {
    var i = a(this, e),
      s = i.on;
    s !== o && (r = (o = s).copy()).on(t, n), (i.on = r);
  };
}
function v5(e, t) {
  var n = this._id;
  return arguments.length < 2
    ? ht(this.node(), n).on.on(e)
    : this.each(y5(n, e, t));
}
function w5(e) {
  return function () {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function x5() {
  return this.on("end.remove", w5(this._id));
}
function S5(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Ss(e));
  for (var o = this._groups, r = o.length, a = new Array(r), i = 0; i < r; ++i)
    for (
      var s = o[i], c = s.length, u = (a[i] = new Array(c)), l, d, f = 0;
      f < c;
      ++f
    )
      (l = s[f]) &&
        (d = e.call(l, l.__data__, f, s)) &&
        ("__data__" in l && (d.__data__ = l.__data__),
        (u[f] = d),
        Wr(u[f], t, n, f, u, ht(l, n)));
  return new Ht(a, this._parents, t, n);
}
function C5(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Od(e));
  for (var o = this._groups, r = o.length, a = [], i = [], s = 0; s < r; ++s)
    for (var c = o[s], u = c.length, l, d = 0; d < u; ++d)
      if ((l = c[d])) {
        for (
          var f = e.call(l, l.__data__, d, c),
            g,
            p = ht(l, n),
            h = 0,
            m = f.length;
          h < m;
          ++h
        )
          (g = f[h]) && Wr(g, t, n, h, f, p);
        a.push(f), i.push(l);
      }
  return new Ht(a, i, t, n);
}
var E5 = Ao.prototype.constructor;
function _5() {
  return new E5(this._groups, this._parents);
}
function k5(e, t) {
  var n, o, r;
  return function () {
    var a = Ln(this, e),
      i = (this.style.removeProperty(e), Ln(this, e));
    return a === i ? null : a === n && i === o ? r : (r = t((n = a), (o = i)));
  };
}
function ef(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function A5(e, t, n) {
  var o,
    r = n + "",
    a;
  return function () {
    var i = Ln(this, e);
    return i === r ? null : i === o ? a : (a = t((o = i), n));
  };
}
function M5(e, t, n) {
  var o, r, a;
  return function () {
    var i = Ln(this, e),
      s = n(this),
      c = s + "";
    return (
      s == null && (c = s = (this.style.removeProperty(e), Ln(this, e))),
      i === c ? null : i === o && c === r ? a : ((r = c), (a = t((o = i), s)))
    );
  };
}
function T5(e, t) {
  var n,
    o,
    r,
    a = "style." + t,
    i = "end." + a,
    s;
  return function () {
    var c = Ct(this, e),
      u = c.on,
      l = c.value[a] == null ? s || (s = ef(t)) : void 0;
    (u !== n || r !== l) && (o = (n = u).copy()).on(i, (r = l)), (c.on = o);
  };
}
function O5(e, t, n) {
  var o = (e += "") == "transform" ? Ob : Jd;
  return t == null
    ? this.styleTween(e, k5(e, o)).on("end.style." + e, ef(e))
    : typeof t == "function"
      ? this.styleTween(e, M5(e, o, As(this, "style." + e, t))).each(
          T5(this._id, e),
        )
      : this.styleTween(e, A5(e, o, t), n).on("end.style." + e, null);
}
function N5(e, t, n) {
  return function (o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function D5(e, t, n) {
  var o, r;
  function a() {
    var i = t.apply(this, arguments);
    return i !== r && (o = (r = i) && N5(e, i, n)), o;
  }
  return (a._value = t), a;
}
function R5(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (t == null) return this.tween(o, null);
  if (typeof t != "function") throw new Error();
  return this.tween(o, D5(e, t, n ?? ""));
}
function z5(e) {
  return function () {
    this.textContent = e;
  };
}
function I5(e) {
  return function () {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function L5(e) {
  return this.tween(
    "text",
    typeof e == "function"
      ? I5(As(this, "text", e))
      : z5(e == null ? "" : e + ""),
  );
}
function P5(e) {
  return function (t) {
    this.textContent = e.call(this, t);
  };
}
function H5(e) {
  var t, n;
  function o() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && P5(r)), t;
  }
  return (o._value = e), o;
}
function j5(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, H5(e));
}
function F5() {
  for (
    var e = this._name,
      t = this._id,
      n = tf(),
      o = this._groups,
      r = o.length,
      a = 0;
    a < r;
    ++a
  )
    for (var i = o[a], s = i.length, c, u = 0; u < s; ++u)
      if ((c = i[u])) {
        var l = ht(c, t);
        Wr(c, e, n, u, i, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease,
        });
      }
  return new Ht(o, this._parents, e, n);
}
function B5() {
  var e,
    t,
    n = this,
    o = n._id,
    r = n.size();
  return new Promise(function (a, i) {
    var s = { value: i },
      c = {
        value: function () {
          --r === 0 && a();
        },
      };
    n.each(function () {
      var u = Ct(this, o),
        l = u.on;
      l !== e &&
        ((t = (e = l).copy()),
        t._.cancel.push(s),
        t._.interrupt.push(s),
        t._.end.push(c)),
        (u.on = t);
    }),
      r === 0 && a();
  });
}
var $5 = 0;
function Ht(e, t, n, o) {
  (this._groups = e), (this._parents = t), (this._name = n), (this._id = o);
}
function tf() {
  return ++$5;
}
var Rt = Ao.prototype;
Ht.prototype = {
  constructor: Ht,
  select: S5,
  selectAll: C5,
  selectChild: Rt.selectChild,
  selectChildren: Rt.selectChildren,
  filter: h5,
  merge: m5,
  selection: _5,
  transition: F5,
  call: Rt.call,
  nodes: Rt.nodes,
  node: Rt.node,
  size: Rt.size,
  empty: Rt.empty,
  each: Rt.each,
  on: v5,
  attr: Jb,
  attrTween: r5,
  style: O5,
  styleTween: R5,
  text: L5,
  textTween: j5,
  remove: x5,
  tween: Ub,
  delay: s5,
  duration: u5,
  ease: f5,
  easeVarying: p5,
  end: B5,
  [Symbol.iterator]: Rt[Symbol.iterator],
};
function W5(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var V5 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: W5,
};
function q5(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
  return n;
}
function U5(e) {
  var t, n;
  e instanceof Ht
    ? ((t = e._id), (e = e._name))
    : ((t = tf()), ((n = V5).time = _s()), (e = e == null ? null : e + ""));
  for (var o = this._groups, r = o.length, a = 0; a < r; ++a)
    for (var i = o[a], s = i.length, c, u = 0; u < s; ++u)
      (c = i[u]) && Wr(c, e, t, u, i, n || q5(c, t));
  return new Ht(o, this._parents, e, t);
}
Ao.prototype.interrupt = Wb;
Ao.prototype.transition = U5;
const Zo = (e) => () => e;
function Y5(e, { sourceEvent: t, target: n, transform: o, dispatch: r }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: r },
  });
}
function It(e, t, n) {
  (this.k = e), (this.x = t), (this.y = n);
}
It.prototype = {
  constructor: It,
  scale: function (e) {
    return e === 1 ? this : new It(this.k * e, this.x, this.y);
  },
  translate: function (e, t) {
    return (e === 0) & (t === 0)
      ? this
      : new It(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function (e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function (e) {
    return e * this.k + this.x;
  },
  applyY: function (e) {
    return e * this.k + this.y;
  },
  invert: function (e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function (e) {
    return (e - this.x) / this.k;
  },
  invertY: function (e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function (e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function (e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
var Xt = new It(1, 0, 0);
It.prototype;
function gi(e) {
  e.stopImmediatePropagation();
}
function Kn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Z5(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function K5() {
  var e = this;
  return e instanceof SVGElement
    ? ((e = e.ownerSVGElement || e),
      e.hasAttribute("viewBox")
        ? ((e = e.viewBox.baseVal),
          [
            [e.x, e.y],
            [e.x + e.width, e.y + e.height],
          ])
        : [
            [0, 0],
            [e.width.baseVal.value, e.height.baseVal.value],
          ])
    : [
        [0, 0],
        [e.clientWidth, e.clientHeight],
      ];
}
function Zc() {
  return this.__zoom || Xt;
}
function X5(e) {
  return (
    -e.deltaY *
    (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) *
    (e.ctrlKey ? 10 : 1)
  );
}
function G5() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Q5(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0],
    r = e.invertX(t[1][0]) - n[1][0],
    a = e.invertY(t[0][1]) - n[0][1],
    i = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r),
    i > a ? (a + i) / 2 : Math.min(0, a) || Math.max(0, i),
  );
}
function J5() {
  var e = Z5,
    t = K5,
    n = Q5,
    o = X5,
    r = G5,
    a = [0, 1 / 0],
    i = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    s = 250,
    c = Ib,
    u = Fr("start", "zoom", "end"),
    l,
    d,
    f,
    g = 500,
    p = 150,
    h = 0,
    m = 10;
  function y(v) {
    v.property("__zoom", Zc)
      .on("wheel.zoom", _, { passive: !1 })
      .on("mousedown.zoom", L)
      .on("dblclick.zoom", I)
      .filter(r)
      .on("touchstart.zoom", P)
      .on("touchmove.zoom", $)
      .on("touchend.zoom touchcancel.zoom", B)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  (y.transform = function (v, k, E, N) {
    var z = v.selection ? v.selection() : v;
    z.property("__zoom", Zc),
      v !== z
        ? w(v, k, E, N)
        : z.interrupt().each(function () {
            M(this, arguments)
              .event(N)
              .start()
              .zoom(null, typeof k == "function" ? k.apply(this, arguments) : k)
              .end();
          });
  }),
    (y.scaleBy = function (v, k, E, N) {
      y.scaleTo(
        v,
        function () {
          var z = this.__zoom.k,
            T = typeof k == "function" ? k.apply(this, arguments) : k;
          return z * T;
        },
        E,
        N,
      );
    }),
    (y.scaleTo = function (v, k, E, N) {
      y.transform(
        v,
        function () {
          var z = t.apply(this, arguments),
            T = this.__zoom,
            A =
              E == null
                ? S(z)
                : typeof E == "function"
                  ? E.apply(this, arguments)
                  : E,
            D = T.invert(A),
            H = typeof k == "function" ? k.apply(this, arguments) : k;
          return n(C(x(T, H), A, D), z, i);
        },
        E,
        N,
      );
    }),
    (y.translateBy = function (v, k, E, N) {
      y.transform(
        v,
        function () {
          return n(
            this.__zoom.translate(
              typeof k == "function" ? k.apply(this, arguments) : k,
              typeof E == "function" ? E.apply(this, arguments) : E,
            ),
            t.apply(this, arguments),
            i,
          );
        },
        null,
        N,
      );
    }),
    (y.translateTo = function (v, k, E, N, z) {
      y.transform(
        v,
        function () {
          var T = t.apply(this, arguments),
            A = this.__zoom,
            D =
              N == null
                ? S(T)
                : typeof N == "function"
                  ? N.apply(this, arguments)
                  : N;
          return n(
            Xt.translate(D[0], D[1])
              .scale(A.k)
              .translate(
                typeof k == "function" ? -k.apply(this, arguments) : -k,
                typeof E == "function" ? -E.apply(this, arguments) : -E,
              ),
            T,
            i,
          );
        },
        N,
        z,
      );
    });
  function x(v, k) {
    return (
      (k = Math.max(a[0], Math.min(a[1], k))),
      k === v.k ? v : new It(k, v.x, v.y)
    );
  }
  function C(v, k, E) {
    var N = k[0] - E[0] * v.k,
      z = k[1] - E[1] * v.k;
    return N === v.x && z === v.y ? v : new It(v.k, N, z);
  }
  function S(v) {
    return [(+v[0][0] + +v[1][0]) / 2, (+v[0][1] + +v[1][1]) / 2];
  }
  function w(v, k, E, N) {
    v.on("start.zoom", function () {
      M(this, arguments).event(N).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        M(this, arguments).event(N).end();
      })
      .tween("zoom", function () {
        var z = this,
          T = arguments,
          A = M(z, T).event(N),
          D = t.apply(z, T),
          H = E == null ? S(D) : typeof E == "function" ? E.apply(z, T) : E,
          W = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]),
          V = z.__zoom,
          Y = typeof k == "function" ? k.apply(z, T) : k,
          Z = c(V.invert(H).concat(W / V.k), Y.invert(H).concat(W / Y.k));
        return function (X) {
          if (X === 1) X = Y;
          else {
            var Q = Z(X),
              te = W / Q[2];
            X = new It(te, H[0] - Q[0] * te, H[1] - Q[1] * te);
          }
          A.zoom(null, X);
        };
      });
  }
  function M(v, k, E) {
    return (!E && v.__zooming) || new O(v, k);
  }
  function O(v, k) {
    (this.that = v),
      (this.args = k),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = t.apply(v, k)),
      (this.taps = 0);
  }
  O.prototype = {
    event: function (v) {
      return v && (this.sourceEvent = v), this;
    },
    start: function () {
      return (
        ++this.active === 1 &&
          ((this.that.__zooming = this), this.emit("start")),
        this
      );
    },
    zoom: function (v, k) {
      return (
        this.mouse &&
          v !== "mouse" &&
          (this.mouse[1] = k.invert(this.mouse[0])),
        this.touch0 &&
          v !== "touch" &&
          (this.touch0[1] = k.invert(this.touch0[0])),
        this.touch1 &&
          v !== "touch" &&
          (this.touch1[1] = k.invert(this.touch1[0])),
        (this.that.__zoom = k),
        this.emit("zoom"),
        this
      );
    },
    end: function () {
      return (
        --this.active === 0 && (delete this.that.__zooming, this.emit("end")),
        this
      );
    },
    emit: function (v) {
      var k = ut(this.that).datum();
      u.call(
        v,
        this.that,
        new Y5(v, {
          sourceEvent: this.sourceEvent,
          target: y,
          type: v,
          transform: this.that.__zoom,
          dispatch: u,
        }),
        k,
      );
    },
  };
  function _(v, ...k) {
    if (!e.apply(this, arguments)) return;
    var E = M(this, k).event(v),
      N = this.__zoom,
      z = Math.max(
        a[0],
        Math.min(a[1], N.k * Math.pow(2, o.apply(this, arguments))),
      ),
      T = vt(v);
    if (E.wheel)
      (E.mouse[0][0] !== T[0] || E.mouse[0][1] !== T[1]) &&
        (E.mouse[1] = N.invert((E.mouse[0] = T))),
        clearTimeout(E.wheel);
    else {
      if (N.k === z) return;
      (E.mouse = [T, N.invert(T)]), cr(this), E.start();
    }
    Kn(v),
      (E.wheel = setTimeout(A, p)),
      E.zoom("mouse", n(C(x(N, z), E.mouse[0], E.mouse[1]), E.extent, i));
    function A() {
      (E.wheel = null), E.end();
    }
  }
  function L(v, ...k) {
    if (f || !e.apply(this, arguments)) return;
    var E = v.currentTarget,
      N = M(this, k, !0).event(v),
      z = ut(v.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", W, !0),
      T = vt(v, E),
      A = v.clientX,
      D = v.clientY;
    Bd(v.view),
      gi(v),
      (N.mouse = [T, this.__zoom.invert(T)]),
      cr(this),
      N.start();
    function H(V) {
      if ((Kn(V), !N.moved)) {
        var Y = V.clientX - A,
          Z = V.clientY - D;
        N.moved = Y * Y + Z * Z > h;
      }
      N.event(V).zoom(
        "mouse",
        n(C(N.that.__zoom, (N.mouse[0] = vt(V, E)), N.mouse[1]), N.extent, i),
      );
    }
    function W(V) {
      z.on("mousemove.zoom mouseup.zoom", null),
        $d(V.view, N.moved),
        Kn(V),
        N.event(V).end();
    }
  }
  function I(v, ...k) {
    if (e.apply(this, arguments)) {
      var E = this.__zoom,
        N = vt(v.changedTouches ? v.changedTouches[0] : v, this),
        z = E.invert(N),
        T = E.k * (v.shiftKey ? 0.5 : 2),
        A = n(C(x(E, T), N, z), t.apply(this, k), i);
      Kn(v),
        s > 0
          ? ut(this).transition().duration(s).call(w, A, N, v)
          : ut(this).call(y.transform, A, N, v);
    }
  }
  function P(v, ...k) {
    if (e.apply(this, arguments)) {
      var E = v.touches,
        N = E.length,
        z = M(this, k, v.changedTouches.length === N).event(v),
        T,
        A,
        D,
        H;
      for (gi(v), A = 0; A < N; ++A)
        (D = E[A]),
          (H = vt(D, this)),
          (H = [H, this.__zoom.invert(H), D.identifier]),
          z.touch0
            ? !z.touch1 &&
              z.touch0[2] !== H[2] &&
              ((z.touch1 = H), (z.taps = 0))
            : ((z.touch0 = H), (T = !0), (z.taps = 1 + !!l));
      l && (l = clearTimeout(l)),
        T &&
          (z.taps < 2 &&
            ((d = H[0]),
            (l = setTimeout(function () {
              l = null;
            }, g))),
          cr(this),
          z.start());
    }
  }
  function $(v, ...k) {
    if (this.__zooming) {
      var E = M(this, k).event(v),
        N = v.changedTouches,
        z = N.length,
        T,
        A,
        D,
        H;
      for (Kn(v), T = 0; T < z; ++T)
        (A = N[T]),
          (D = vt(A, this)),
          E.touch0 && E.touch0[2] === A.identifier
            ? (E.touch0[0] = D)
            : E.touch1 && E.touch1[2] === A.identifier && (E.touch1[0] = D);
      if (((A = E.that.__zoom), E.touch1)) {
        var W = E.touch0[0],
          V = E.touch0[1],
          Y = E.touch1[0],
          Z = E.touch1[1],
          X = (X = Y[0] - W[0]) * X + (X = Y[1] - W[1]) * X,
          Q = (Q = Z[0] - V[0]) * Q + (Q = Z[1] - V[1]) * Q;
        (A = x(A, Math.sqrt(X / Q))),
          (D = [(W[0] + Y[0]) / 2, (W[1] + Y[1]) / 2]),
          (H = [(V[0] + Z[0]) / 2, (V[1] + Z[1]) / 2]);
      } else if (E.touch0) (D = E.touch0[0]), (H = E.touch0[1]);
      else return;
      E.zoom("touch", n(C(A, D, H), E.extent, i));
    }
  }
  function B(v, ...k) {
    if (this.__zooming) {
      var E = M(this, k).event(v),
        N = v.changedTouches,
        z = N.length,
        T,
        A;
      for (
        gi(v),
          f && clearTimeout(f),
          f = setTimeout(function () {
            f = null;
          }, g),
          T = 0;
        T < z;
        ++T
      )
        (A = N[T]),
          E.touch0 && E.touch0[2] === A.identifier
            ? delete E.touch0
            : E.touch1 && E.touch1[2] === A.identifier && delete E.touch1;
      if (
        (E.touch1 && !E.touch0 && ((E.touch0 = E.touch1), delete E.touch1),
        E.touch0)
      )
        E.touch0[1] = this.__zoom.invert(E.touch0[0]);
      else if (
        (E.end(),
        E.taps === 2 &&
          ((A = vt(A, this)), Math.hypot(d[0] - A[0], d[1] - A[1]) < m))
      ) {
        var D = ut(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return (
    (y.wheelDelta = function (v) {
      return arguments.length
        ? ((o = typeof v == "function" ? v : Zo(+v)), y)
        : o;
    }),
    (y.filter = function (v) {
      return arguments.length
        ? ((e = typeof v == "function" ? v : Zo(!!v)), y)
        : e;
    }),
    (y.touchable = function (v) {
      return arguments.length
        ? ((r = typeof v == "function" ? v : Zo(!!v)), y)
        : r;
    }),
    (y.extent = function (v) {
      return arguments.length
        ? ((t =
            typeof v == "function"
              ? v
              : Zo([
                  [+v[0][0], +v[0][1]],
                  [+v[1][0], +v[1][1]],
                ])),
          y)
        : t;
    }),
    (y.scaleExtent = function (v) {
      return arguments.length
        ? ((a[0] = +v[0]), (a[1] = +v[1]), y)
        : [a[0], a[1]];
    }),
    (y.translateExtent = function (v) {
      return arguments.length
        ? ((i[0][0] = +v[0][0]),
          (i[1][0] = +v[1][0]),
          (i[0][1] = +v[0][1]),
          (i[1][1] = +v[1][1]),
          y)
        : [
            [i[0][0], i[0][1]],
            [i[1][0], i[1][1]],
          ];
    }),
    (y.constrain = function (v) {
      return arguments.length ? ((n = v), y) : n;
    }),
    (y.duration = function (v) {
      return arguments.length ? ((s = +v), y) : s;
    }),
    (y.interpolate = function (v) {
      return arguments.length ? ((c = v), y) : c;
    }),
    (y.on = function () {
      var v = u.on.apply(u, arguments);
      return v === u ? y : v;
    }),
    (y.clickDistance = function (v) {
      return arguments.length ? ((h = (v = +v) * v), y) : Math.sqrt(h);
    }),
    (y.tapDistance = function (v) {
      return arguments.length ? ((m = +v), y) : m;
    }),
    y
  );
}
const Vr = pt(null),
  e6 = Vr.Provider,
  gt = {
    error001: () =>
      "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
    error002: () =>
      "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
    error003: (e) =>
      `Node type "${e}" not found. Using fallback type "default".`,
    error004: () =>
      "The React Flow parent container needs a width and a height to render the graph.",
    error005: () => "Only child nodes can use a parent extent.",
    error006: () => "Can't create edge. An edge needs a source and a target.",
    error007: (e) => `The old edge with id=${e} does not exist.`,
    error009: (e) => `Marker type "${e}" doesn't exist.`,
    error008: (e, t) =>
      `Couldn't create edge for ${e ? "target" : "source"} handle id: "${e ? t.targetHandle : t.sourceHandle}", edge id: ${t.id}.`,
    error010: () =>
      "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
    error011: (e) =>
      `Edge type "${e}" not found. Using fallback type "default".`,
    error012: (e) =>
      `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  },
  nf = gt.error001();
function Ee(e, t) {
  const n = Ye(Vr);
  if (n === null) throw new Error(nf);
  return Md(n, e, t);
}
const Le = () => {
    const e = Ye(Vr);
    if (e === null) throw new Error(nf);
    return Oe(
      () => ({
        getState: e.getState,
        setState: e.setState,
        subscribe: e.subscribe,
        destroy: e.destroy,
      }),
      [e],
    );
  },
  t6 = (e) => (e.userSelectionActive ? "none" : "all");
function of({ position: e, children: t, className: n, style: o, ...r }) {
  const a = Ee(t6),
    i = `${e}`.split("-");
  return j.createElement(
    "div",
    {
      className: $e(["react-flow__panel", n, ...i]),
      style: { ...o, pointerEvents: a },
      ...r,
    },
    t,
  );
}
function n6({ proOptions: e, position: t = "bottom-right" }) {
  return e != null && e.hideAttribution
    ? null
    : j.createElement(
        of,
        {
          position: t,
          className: "react-flow__attribution",
          "data-message":
            "Please only hide this attribution when you are subscribed to React Flow Pro: https://reactflow.dev/pro",
        },
        j.createElement(
          "a",
          {
            href: "https://reactflow.dev",
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "React Flow attribution",
          },
          "React Flow",
        ),
      );
}
const o6 = ({
  x: e,
  y: t,
  label: n,
  labelStyle: o = {},
  labelShowBg: r = !0,
  labelBgStyle: a = {},
  labelBgPadding: i = [2, 4],
  labelBgBorderRadius: s = 2,
  children: c,
  className: u,
  ...l
}) => {
  const d = ae(null),
    [f, g] = de({ x: 0, y: 0, width: 0, height: 0 }),
    p = $e(["react-flow__edge-textwrapper", u]);
  return (
    ie(() => {
      if (d.current) {
        const h = d.current.getBBox();
        g({
          x: h.x,
          y: h.y,
          width: h.width,
          height: h.height,
        });
      }
    }, [n]),
    typeof n > "u" || !n
      ? null
      : j.createElement(
          "g",
          {
            transform: `translate(${e - f.width / 2} ${t - f.height / 2})`,
            className: p,
            visibility: f.width ? "visible" : "hidden",
            ...l,
          },
          r &&
            j.createElement("rect", {
              width: f.width + 2 * i[0],
              x: -i[0],
              y: -i[1],
              height: f.height + 2 * i[1],
              className: "react-flow__edge-textbg",
              style: a,
              rx: s,
              ry: s,
            }),
          j.createElement(
            "text",
            {
              className: "react-flow__edge-text",
              y: f.height / 2,
              dy: "0.3em",
              ref: d,
              style: o,
            },
            n,
          ),
          c,
        )
  );
};
var r6 = Me(o6);
const Ms = (e) => ({
    width: e.offsetWidth,
    height: e.offsetHeight,
  }),
  Hn = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n),
  Ts = (e = { x: 0, y: 0 }, t) => ({
    x: Hn(e.x, t[0][0], t[1][0]),
    y: Hn(e.y, t[0][1], t[1][1]),
  }),
  Kc = (e, t, n) =>
    e < t
      ? Hn(Math.abs(e - t), 1, 50) / 50
      : e > n
        ? -Hn(Math.abs(e - n), 1, 50) / 50
        : 0,
  rf = (e, t) => {
    const n = Kc(e.x, 35, t.width - 35) * 20,
      o = Kc(e.y, 35, t.height - 35) * 20;
    return [n, o];
  },
  af = (e) => {
    var t;
    return (
      ((t = e.getRootNode) == null ? void 0 : t.call(e)) ||
      (window == null ? void 0 : window.document)
    );
  },
  a6 = (e, t) => ({
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2),
  }),
  Os = ({ x: e, y: t, width: n, height: o }) => ({
    x: e,
    y: t,
    x2: e + n,
    y2: t + o,
  }),
  i6 = ({ x: e, y: t, x2: n, y2: o }) => ({
    x: e,
    y: t,
    width: n - e,
    height: o - t,
  }),
  Xc = (e) => ({
    ...(e.positionAbsolute || { x: 0, y: 0 }),
    width: e.width || 0,
    height: e.height || 0,
  }),
  $i = (e, t) => {
    const n = Math.max(
        0,
        Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x),
      ),
      o = Math.max(
        0,
        Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y),
      );
    return Math.ceil(n * o);
  },
  s6 = (e) => nt(e.width) && nt(e.height) && nt(e.x) && nt(e.y),
  nt = (e) => !isNaN(e) && isFinite(e),
  Ae = Symbol.for("internals"),
  sf = ["Enter", " ", "Escape"],
  lf = (e, t) => {
    process.env.NODE_ENV === "development" &&
      console.warn(`[React Flow]: ${t} Help: https://reactflow.dev/error#${e}`);
  },
  l6 = (e) => "nativeEvent" in e;
function Wi(e) {
  var r, a;
  const t = l6(e) ? e.nativeEvent : e,
    n =
      ((a = (r = t.composedPath) == null ? void 0 : r.call(t)) == null
        ? void 0
        : a[0]) || e.target;
  return (
    ["INPUT", "SELECT", "TEXTAREA"].includes(n == null ? void 0 : n.nodeName) ||
    (n == null ? void 0 : n.hasAttribute("contenteditable")) ||
    !!(n != null && n.closest(".nokey"))
  );
}
const cf = (e) => "clientX" in e,
  Gt = (e, t) => {
    var a, i;
    const n = cf(e),
      o = n ? e.clientX : (a = e.touches) == null ? void 0 : a[0].clientX,
      r = n ? e.clientY : (i = e.touches) == null ? void 0 : i[0].clientY;
    return {
      x: o - ((t == null ? void 0 : t.left) ?? 0),
      y: r - ((t == null ? void 0 : t.top) ?? 0),
    };
  },
  Ar = () => {
    var e;
    return (
      typeof navigator < "u" &&
      ((e = navigator == null ? void 0 : navigator.userAgent) == null
        ? void 0
        : e.indexOf("Mac")) >= 0
    );
  },
  Vn = ({
    id: e,
    path: t,
    labelX: n,
    labelY: o,
    label: r,
    labelStyle: a,
    labelShowBg: i,
    labelBgStyle: s,
    labelBgPadding: c,
    labelBgBorderRadius: u,
    style: l,
    markerEnd: d,
    markerStart: f,
    interactionWidth: g = 20,
  }) =>
    j.createElement(
      j.Fragment,
      null,
      j.createElement("path", {
        id: e,
        style: l,
        d: t,
        fill: "none",
        className: "react-flow__edge-path",
        markerEnd: d,
        markerStart: f,
      }),
      g &&
        j.createElement("path", {
          d: t,
          fill: "none",
          strokeOpacity: 0,
          strokeWidth: g,
          className: "react-flow__edge-interaction",
        }),
      r && nt(n) && nt(o)
        ? j.createElement(r6, {
            x: n,
            y: o,
            label: r,
            labelStyle: a,
            labelShowBg: i,
            labelBgStyle: s,
            labelBgPadding: c,
            labelBgBorderRadius: u,
          })
        : null,
    );
Vn.displayName = "BaseEdge";
function Xn(e, t, n) {
  return n === void 0
    ? n
    : (o) => {
        const r = t().edges.find((a) => a.id === e);
        r && n(o, { ...r });
      };
}
function uf({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const r = Math.abs(n - e) / 2,
    a = n < e ? n + r : n - r,
    i = Math.abs(o - t) / 2,
    s = o < t ? o + i : o - i;
  return [a, s, r, i];
}
function df({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o,
  sourceControlX: r,
  sourceControlY: a,
  targetControlX: i,
  targetControlY: s,
}) {
  const c = e * 0.125 + r * 0.375 + i * 0.375 + n * 0.125,
    u = t * 0.125 + a * 0.375 + s * 0.375 + o * 0.125,
    l = Math.abs(c - e),
    d = Math.abs(u - t);
  return [c, u, l, d];
}
var gn;
(function (e) {
  (e.Strict = "strict"), (e.Loose = "loose");
})(gn || (gn = {}));
var cn;
(function (e) {
  (e.Free = "free"), (e.Vertical = "vertical"), (e.Horizontal = "horizontal");
})(cn || (cn = {}));
var bo;
(function (e) {
  (e.Partial = "partial"), (e.Full = "full");
})(bo || (bo = {}));
var Zt;
(function (e) {
  (e.Bezier = "default"),
    (e.Straight = "straight"),
    (e.Step = "step"),
    (e.SmoothStep = "smoothstep"),
    (e.SimpleBezier = "simplebezier");
})(Zt || (Zt = {}));
var Mr;
(function (e) {
  (e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed");
})(Mr || (Mr = {}));
var ne;
(function (e) {
  (e.Left = "left"),
    (e.Top = "top"),
    (e.Right = "right"),
    (e.Bottom = "bottom");
})(ne || (ne = {}));
function Gc({ pos: e, x1: t, y1: n, x2: o, y2: r }) {
  return e === ne.Left || e === ne.Right
    ? [0.5 * (t + o), n]
    : [t, 0.5 * (n + r)];
}
function ff({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = ne.Bottom,
  targetX: o,
  targetY: r,
  targetPosition: a = ne.Top,
}) {
  const [i, s] = Gc({
      pos: n,
      x1: e,
      y1: t,
      x2: o,
      y2: r,
    }),
    [c, u] = Gc({
      pos: a,
      x1: o,
      y1: r,
      x2: e,
      y2: t,
    }),
    [l, d, f, g] = df({
      sourceX: e,
      sourceY: t,
      targetX: o,
      targetY: r,
      sourceControlX: i,
      sourceControlY: s,
      targetControlX: c,
      targetControlY: u,
    });
  return [`M${e},${t} C${i},${s} ${c},${u} ${o},${r}`, l, d, f, g];
}
const Ns = Me(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o,
    sourcePosition: r = ne.Bottom,
    targetPosition: a = ne.Top,
    label: i,
    labelStyle: s,
    labelShowBg: c,
    labelBgStyle: u,
    labelBgPadding: l,
    labelBgBorderRadius: d,
    style: f,
    markerEnd: g,
    markerStart: p,
    interactionWidth: h,
  }) => {
    const [m, y, x] = ff({
      sourceX: e,
      sourceY: t,
      sourcePosition: r,
      targetX: n,
      targetY: o,
      targetPosition: a,
    });
    return j.createElement(Vn, {
      path: m,
      labelX: y,
      labelY: x,
      label: i,
      labelStyle: s,
      labelShowBg: c,
      labelBgStyle: u,
      labelBgPadding: l,
      labelBgBorderRadius: d,
      style: f,
      markerEnd: g,
      markerStart: p,
      interactionWidth: h,
    });
  },
);
Ns.displayName = "SimpleBezierEdge";
const Qc = {
    [ne.Left]: { x: -1, y: 0 },
    [ne.Right]: { x: 1, y: 0 },
    [ne.Top]: { x: 0, y: -1 },
    [ne.Bottom]: { x: 0, y: 1 },
  },
  c6 = ({ source: e, sourcePosition: t = ne.Bottom, target: n }) =>
    t === ne.Left || t === ne.Right
      ? e.x < n.x
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 }
      : e.y < n.y
        ? { x: 0, y: 1 }
        : { x: 0, y: -1 },
  Jc = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function u6({
  source: e,
  sourcePosition: t = ne.Bottom,
  target: n,
  targetPosition: o = ne.Top,
  center: r,
  offset: a,
}) {
  const i = Qc[t],
    s = Qc[o],
    c = { x: e.x + i.x * a, y: e.y + i.y * a },
    u = { x: n.x + s.x * a, y: n.y + s.y * a },
    l = c6({
      source: c,
      sourcePosition: t,
      target: u,
    }),
    d = l.x !== 0 ? "x" : "y",
    f = l[d];
  let g = [],
    p,
    h;
  const m = { x: 0, y: 0 },
    y = { x: 0, y: 0 },
    [x, C, S, w] = uf({
      sourceX: e.x,
      sourceY: e.y,
      targetX: n.x,
      targetY: n.y,
    });
  if (i[d] * s[d] === -1) {
    (p = r.x ?? x), (h = r.y ?? C);
    const O = [
        { x: p, y: c.y },
        { x: p, y: u.y },
      ],
      _ = [
        { x: c.x, y: h },
        { x: u.x, y: h },
      ];
    i[d] === f ? (g = d === "x" ? O : _) : (g = d === "x" ? _ : O);
  } else {
    const O = [{ x: c.x, y: u.y }],
      _ = [{ x: u.x, y: c.y }];
    if (
      (d === "x" ? (g = i.x === f ? _ : O) : (g = i.y === f ? O : _), t === o)
    ) {
      const B = Math.abs(e[d] - n[d]);
      if (B <= a) {
        const v = Math.min(a - 1, a - B);
        i[d] === f
          ? (m[d] = (c[d] > e[d] ? -1 : 1) * v)
          : (y[d] = (u[d] > n[d] ? -1 : 1) * v);
      }
    }
    if (t !== o) {
      const B = d === "x" ? "y" : "x",
        v = i[d] === s[B],
        k = c[B] > u[B],
        E = c[B] < u[B];
      ((i[d] === 1 && ((!v && k) || (v && E))) ||
        (i[d] !== 1 && ((!v && E) || (v && k)))) &&
        (g = d === "x" ? O : _);
    }
    const L = { x: c.x + m.x, y: c.y + m.y },
      I = { x: u.x + y.x, y: u.y + y.y },
      P = Math.max(Math.abs(L.x - g[0].x), Math.abs(I.x - g[0].x)),
      $ = Math.max(Math.abs(L.y - g[0].y), Math.abs(I.y - g[0].y));
    P >= $
      ? ((p = (L.x + I.x) / 2), (h = g[0].y))
      : ((p = g[0].x), (h = (L.y + I.y) / 2));
  }
  return [
    [
      e,
      { x: c.x + m.x, y: c.y + m.y },
      ...g,
      { x: u.x + y.x, y: u.y + y.y },
      n,
    ],
    p,
    h,
    S,
    w,
  ];
}
function d6(e, t, n, o) {
  const r = Math.min(Jc(e, t) / 2, Jc(t, n) / 2, o),
    { x: a, y: i } = t;
  if ((e.x === a && a === n.x) || (e.y === i && i === n.y)) return `L${a} ${i}`;
  if (e.y === i) {
    const u = e.x < n.x ? -1 : 1,
      l = e.y < n.y ? 1 : -1;
    return `L ${a + r * u},${i}Q ${a},${i} ${a},${i + r * l}`;
  }
  const s = e.x < n.x ? 1 : -1,
    c = e.y < n.y ? -1 : 1;
  return `L ${a},${i + r * c}Q ${a},${i} ${a + r * s},${i}`;
}
function Vi({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = ne.Bottom,
  targetX: o,
  targetY: r,
  targetPosition: a = ne.Top,
  borderRadius: i = 5,
  centerX: s,
  centerY: c,
  offset: u = 20,
}) {
  const [l, d, f, g, p] = u6({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: o, y: r },
    targetPosition: a,
    center: { x: s, y: c },
    offset: u,
  });
  return [
    l.reduce((m, y, x) => {
      let C = "";
      return (
        x > 0 && x < l.length - 1
          ? (C = d6(l[x - 1], y, l[x + 1], i))
          : (C = `${x === 0 ? "M" : "L"}${y.x} ${y.y}`),
        (m += C),
        m
      );
    }, ""),
    d,
    f,
    g,
    p,
  ];
}
const qr = Me(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o,
    label: r,
    labelStyle: a,
    labelShowBg: i,
    labelBgStyle: s,
    labelBgPadding: c,
    labelBgBorderRadius: u,
    style: l,
    sourcePosition: d = ne.Bottom,
    targetPosition: f = ne.Top,
    markerEnd: g,
    markerStart: p,
    pathOptions: h,
    interactionWidth: m,
  }) => {
    const [y, x, C] = Vi({
      sourceX: e,
      sourceY: t,
      sourcePosition: d,
      targetX: n,
      targetY: o,
      targetPosition: f,
      borderRadius: h == null ? void 0 : h.borderRadius,
      offset: h == null ? void 0 : h.offset,
    });
    return j.createElement(Vn, {
      path: y,
      labelX: x,
      labelY: C,
      label: r,
      labelStyle: a,
      labelShowBg: i,
      labelBgStyle: s,
      labelBgPadding: c,
      labelBgBorderRadius: u,
      style: l,
      markerEnd: g,
      markerStart: p,
      interactionWidth: m,
    });
  },
);
qr.displayName = "SmoothStepEdge";
const Ds = Me((e) => {
  var t;
  return j.createElement(qr, {
    ...e,
    pathOptions: Oe(() => {
      var n;
      return {
        borderRadius: 0,
        offset: (n = e.pathOptions) == null ? void 0 : n.offset,
      };
    }, [(t = e.pathOptions) == null ? void 0 : t.offset]),
  });
});
Ds.displayName = "StepEdge";
function f6({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const [r, a, i, s] = uf({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o,
  });
  return [`M ${e},${t}L ${n},${o}`, r, a, i, s];
}
const Rs = Me(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o,
    label: r,
    labelStyle: a,
    labelShowBg: i,
    labelBgStyle: s,
    labelBgPadding: c,
    labelBgBorderRadius: u,
    style: l,
    markerEnd: d,
    markerStart: f,
    interactionWidth: g,
  }) => {
    const [p, h, m] = f6({ sourceX: e, sourceY: t, targetX: n, targetY: o });
    return j.createElement(Vn, {
      path: p,
      labelX: h,
      labelY: m,
      label: r,
      labelStyle: a,
      labelShowBg: i,
      labelBgStyle: s,
      labelBgPadding: c,
      labelBgBorderRadius: u,
      style: l,
      markerEnd: d,
      markerStart: f,
      interactionWidth: g,
    });
  },
);
Rs.displayName = "StraightEdge";
function Ko(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function eu({ pos: e, x1: t, y1: n, x2: o, y2: r, c: a }) {
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
function gf({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = ne.Bottom,
  targetX: o,
  targetY: r,
  targetPosition: a = ne.Top,
  curvature: i = 0.25,
}) {
  const [s, c] = eu({
      pos: n,
      x1: e,
      y1: t,
      x2: o,
      y2: r,
      c: i,
    }),
    [u, l] = eu({
      pos: a,
      x1: o,
      y1: r,
      x2: e,
      y2: t,
      c: i,
    }),
    [d, f, g, p] = df({
      sourceX: e,
      sourceY: t,
      targetX: o,
      targetY: r,
      sourceControlX: s,
      sourceControlY: c,
      targetControlX: u,
      targetControlY: l,
    });
  return [`M${e},${t} C${s},${c} ${u},${l} ${o},${r}`, d, f, g, p];
}
const Tr = Me(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o,
    sourcePosition: r = ne.Bottom,
    targetPosition: a = ne.Top,
    label: i,
    labelStyle: s,
    labelShowBg: c,
    labelBgStyle: u,
    labelBgPadding: l,
    labelBgBorderRadius: d,
    style: f,
    markerEnd: g,
    markerStart: p,
    pathOptions: h,
    interactionWidth: m,
  }) => {
    const [y, x, C] = gf({
      sourceX: e,
      sourceY: t,
      sourcePosition: r,
      targetX: n,
      targetY: o,
      targetPosition: a,
      curvature: h == null ? void 0 : h.curvature,
    });
    return j.createElement(Vn, {
      path: y,
      labelX: x,
      labelY: C,
      label: i,
      labelStyle: s,
      labelShowBg: c,
      labelBgStyle: u,
      labelBgPadding: l,
      labelBgBorderRadius: d,
      style: f,
      markerEnd: g,
      markerStart: p,
      interactionWidth: m,
    });
  },
);
Tr.displayName = "BezierEdge";
const zs = pt(null),
  g6 = zs.Provider;
zs.Consumer;
const p6 = () => Ye(zs),
  h6 = (e) => "id" in e && "source" in e && "target" in e,
  m6 = (e) => "id" in e && !("source" in e) && !("target" in e),
  b6 = ({ source: e, sourceHandle: t, target: n, targetHandle: o }) =>
    `reactflow__edge-${e}${t || ""}-${n}${o || ""}`,
  qi = (e, t) =>
    typeof e > "u"
      ? ""
      : typeof e == "string"
        ? e
        : `${t ? `${t}__` : ""}${Object.keys(e)
            .sort()
            .map((o) => `${o}=${e[o]}`)
            .join("&")}`,
  y6 = (e, t) =>
    t.some(
      (n) =>
        n.source === e.source &&
        n.target === e.target &&
        (n.sourceHandle === e.sourceHandle ||
          (!n.sourceHandle && !e.sourceHandle)) &&
        (n.targetHandle === e.targetHandle ||
          (!n.targetHandle && !e.targetHandle)),
    ),
  v6 = (e, t) => {
    if (!e.source || !e.target) return lf("006", gt.error006()), t;
    let n;
    return (
      h6(e)
        ? (n = { ...e })
        : (n = {
            ...e,
            id: b6(e),
          }),
      y6(n, t) ? t : t.concat(n)
    );
  },
  Ui = ({ x: e, y: t }, [n, o, r], a, [i, s]) => {
    const c = {
      x: (e - n) / r,
      y: (t - o) / r,
    };
    return a
      ? {
          x: i * Math.round(c.x / i),
          y: s * Math.round(c.y / s),
        }
      : c;
  },
  pf = ({ x: e, y: t }, [n, o, r]) => ({
    x: e * r + n,
    y: t * r + o,
  }),
  Tn = (e, t = [0, 0]) => {
    if (!e)
      return {
        x: 0,
        y: 0,
        positionAbsolute: {
          x: 0,
          y: 0,
        },
      };
    const n = (e.width ?? 0) * t[0],
      o = (e.height ?? 0) * t[1],
      r = {
        x: e.position.x - n,
        y: e.position.y - o,
      };
    return {
      ...r,
      positionAbsolute: e.positionAbsolute
        ? {
            x: e.positionAbsolute.x - n,
            y: e.positionAbsolute.y - o,
          }
        : r,
    };
  },
  Is = (e, t = [0, 0]) => {
    if (e.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    const n = e.reduce(
      (o, r) => {
        const { x: a, y: i } = Tn(r, t).positionAbsolute;
        return a6(
          o,
          Os({
            x: a,
            y: i,
            width: r.width || 0,
            height: r.height || 0,
          }),
        );
      },
      { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
    );
    return i6(n);
  },
  hf = (e, t, [n, o, r] = [0, 0, 1], a = !1, i = !1, s = [0, 0]) => {
    const c = {
        x: (t.x - n) / r,
        y: (t.y - o) / r,
        width: t.width / r,
        height: t.height / r,
      },
      u = [];
    return (
      e.forEach((l) => {
        const { width: d, height: f, selectable: g = !0, hidden: p = !1 } = l;
        if ((i && !g) || p) return !1;
        const { positionAbsolute: h } = Tn(l, s),
          m = {
            x: h.x,
            y: h.y,
            width: d || 0,
            height: f || 0,
          },
          y = $i(c, m),
          x = typeof d > "u" || typeof f > "u" || d === null || f === null,
          C = a && y > 0,
          S = (d || 0) * (f || 0);
        (x || C || y >= S || l.dragging) && u.push(l);
      }),
      u
    );
  },
  mf = (e, t) => {
    const n = e.map((o) => o.id);
    return t.filter((o) => n.includes(o.source) || n.includes(o.target));
  },
  bf = (e, t, n, o, r, a = 0.1) => {
    const i = t / (e.width * (1 + a)),
      s = n / (e.height * (1 + a)),
      c = Math.min(i, s),
      u = Hn(c, o, r),
      l = e.x + e.width / 2,
      d = e.y + e.height / 2,
      f = t / 2 - l * u,
      g = n / 2 - d * u;
    return { x: f, y: g, zoom: u };
  },
  rn = (e, t = 0) => e.transition().duration(t);
function tu(e, t, n, o) {
  return (t[n] || []).reduce((r, a) => {
    var i, s;
    return (
      `${e.id}-${a.id}-${n}` !== o &&
        r.push({
          id: a.id || null,
          type: n,
          nodeId: e.id,
          x:
            (((i = e.positionAbsolute) == null ? void 0 : i.x) ?? 0) +
            a.x +
            a.width / 2,
          y:
            (((s = e.positionAbsolute) == null ? void 0 : s.y) ?? 0) +
            a.y +
            a.height / 2,
        }),
      r
    );
  }, []);
}
function w6(e, t, n, o, r, a) {
  const { x: i, y: s } = Gt(e),
    u = t
      .elementsFromPoint(i, s)
      .find((p) => p.classList.contains("react-flow__handle"));
  if (u) {
    const p = u.getAttribute("data-nodeid");
    if (p) {
      const h = Ls(void 0, u),
        m = u.getAttribute("data-handleid"),
        y = a({ nodeId: p, id: m, type: h });
      if (y) {
        const x = r.find((C) => C.nodeId === p && C.type === h && C.id === m);
        return {
          handle: {
            id: m,
            type: h,
            nodeId: p,
            x: (x == null ? void 0 : x.x) || n.x,
            y: (x == null ? void 0 : x.y) || n.y,
          },
          validHandleResult: y,
        };
      }
    }
  }
  let l = [],
    d = 1 / 0;
  if (
    (r.forEach((p) => {
      const h = Math.sqrt((p.x - n.x) ** 2 + (p.y - n.y) ** 2);
      if (h <= o) {
        const m = a(p);
        h <= d &&
          (h < d
            ? (l = [{ handle: p, validHandleResult: m }])
            : h === d &&
              l.push({
                handle: p,
                validHandleResult: m,
              }),
          (d = h));
      }
    }),
    !l.length)
  )
    return { handle: null, validHandleResult: yf() };
  if (l.length === 1) return l[0];
  const f = l.some(({ validHandleResult: p }) => p.isValid),
    g = l.some(({ handle: p }) => p.type === "target");
  return (
    l.find(({ handle: p, validHandleResult: h }) =>
      g ? p.type === "target" : f ? h.isValid : !0,
    ) || l[0]
  );
}
const x6 = {
    source: null,
    target: null,
    sourceHandle: null,
    targetHandle: null,
  },
  yf = () => ({
    handleDomNode: null,
    isValid: !1,
    connection: x6,
    endHandle: null,
  });
function vf(e, t, n, o, r, a, i) {
  const s = r === "target",
    c = i.querySelector(
      `.react-flow__handle[data-id="${e == null ? void 0 : e.nodeId}-${e == null ? void 0 : e.id}-${e == null ? void 0 : e.type}"]`,
    ),
    u = {
      ...yf(),
      handleDomNode: c,
    };
  if (c) {
    const l = Ls(void 0, c),
      d = c.getAttribute("data-nodeid"),
      f = c.getAttribute("data-handleid"),
      g = c.classList.contains("connectable"),
      p = c.classList.contains("connectableend"),
      h = {
        source: s ? d : n,
        sourceHandle: s ? f : o,
        target: s ? n : d,
        targetHandle: s ? o : f,
      };
    (u.connection = h),
      g &&
        p &&
        (t === gn.Strict
          ? (s && l === "source") || (!s && l === "target")
          : d !== n || f !== o) &&
        ((u.endHandle = {
          nodeId: d,
          handleId: f,
          type: l,
        }),
        (u.isValid = a(h)));
  }
  return u;
}
function S6({ nodes: e, nodeId: t, handleId: n, handleType: o }) {
  return e.reduce((r, a) => {
    if (a[Ae]) {
      const { handleBounds: i } = a[Ae];
      let s = [],
        c = [];
      i &&
        ((s = tu(a, i, "source", `${t}-${n}-${o}`)),
        (c = tu(a, i, "target", `${t}-${n}-${o}`))),
        r.push(...s, ...c);
    }
    return r;
  }, []);
}
function Ls(e, t) {
  return (
    e ||
    (t != null && t.classList.contains("target")
      ? "target"
      : t != null && t.classList.contains("source")
        ? "source"
        : null)
  );
}
function pi(e) {
  e == null ||
    e.classList.remove(
      "valid",
      "connecting",
      "react-flow__handle-valid",
      "react-flow__handle-connecting",
    );
}
function C6(e, t) {
  let n = null;
  return t ? (n = "valid") : e && !t && (n = "invalid"), n;
}
function wf({
  event: e,
  handleId: t,
  nodeId: n,
  onConnect: o,
  isTarget: r,
  getState: a,
  setState: i,
  isValidConnection: s,
  edgeUpdaterType: c,
  onEdgeUpdateEnd: u,
}) {
  const l = af(e.target),
    {
      connectionMode: d,
      domNode: f,
      autoPanOnConnect: g,
      connectionRadius: p,
      onConnectStart: h,
      panBy: m,
      getNodes: y,
      cancelConnection: x,
    } = a();
  let C = 0,
    S;
  const { x: w, y: M } = Gt(e),
    O = l == null ? void 0 : l.elementFromPoint(w, M),
    _ = Ls(c, O),
    L = f == null ? void 0 : f.getBoundingClientRect();
  if (!L || !_) return;
  let I,
    P = Gt(e, L),
    $ = !1,
    B = null,
    v = !1,
    k = null;
  const E = S6({
      nodes: y(),
      nodeId: n,
      handleId: t,
      handleType: _,
    }),
    N = () => {
      if (!g) return;
      const [A, D] = rf(P, L);
      m({ x: A, y: D }), (C = requestAnimationFrame(N));
    };
  i({
    connectionPosition: P,
    connectionStatus: null,
    // connectionNodeId etc will be removed in the next major in favor of connectionStartHandle
    connectionNodeId: n,
    connectionHandleId: t,
    connectionHandleType: _,
    connectionStartHandle: {
      nodeId: n,
      handleId: t,
      type: _,
    },
    connectionEndHandle: null,
  }),
    h == null || h(e, { nodeId: n, handleId: t, handleType: _ });
  function z(A) {
    const { transform: D } = a();
    P = Gt(A, L);
    const { handle: H, validHandleResult: W } = w6(
      A,
      l,
      Ui(P, D, !1, [1, 1]),
      p,
      E,
      (V) => vf(V, d, n, t, r ? "target" : "source", s, l),
    );
    if (
      ((S = H),
      $ || (N(), ($ = !0)),
      (k = W.handleDomNode),
      (B = W.connection),
      (v = W.isValid),
      i({
        connectionPosition:
          S && v
            ? pf(
                {
                  x: S.x,
                  y: S.y,
                },
                D,
              )
            : P,
        connectionStatus: C6(!!S, v),
        connectionEndHandle: W.endHandle,
      }),
      !S && !v && !k)
    )
      return pi(I);
    B.source !== B.target &&
      k &&
      (pi(I),
      (I = k),
      k.classList.add("connecting", "react-flow__handle-connecting"),
      k.classList.toggle("valid", v),
      k.classList.toggle("react-flow__handle-valid", v));
  }
  function T(A) {
    var D, H;
    (S || k) && B && v && (o == null || o(B)),
      (H = (D = a()).onConnectEnd) == null || H.call(D, A),
      c && (u == null || u(A)),
      pi(I),
      x(),
      cancelAnimationFrame(C),
      ($ = !1),
      (v = !1),
      (B = null),
      (k = null),
      l.removeEventListener("mousemove", z),
      l.removeEventListener("mouseup", T),
      l.removeEventListener("touchmove", z),
      l.removeEventListener("touchend", T);
  }
  l.addEventListener("mousemove", z),
    l.addEventListener("mouseup", T),
    l.addEventListener("touchmove", z),
    l.addEventListener("touchend", T);
}
const nu = () => !0,
  E6 = (e) => ({
    connectionStartHandle: e.connectionStartHandle,
    connectOnClick: e.connectOnClick,
    noPanClassName: e.noPanClassName,
  }),
  _6 = (e, t, n) => (o) => {
    const {
      connectionStartHandle: r,
      connectionEndHandle: a,
      connectionClickStartHandle: i,
    } = o;
    return {
      connecting:
        ((r == null ? void 0 : r.nodeId) === e &&
          (r == null ? void 0 : r.handleId) === t &&
          (r == null ? void 0 : r.type) === n) ||
        ((a == null ? void 0 : a.nodeId) === e &&
          (a == null ? void 0 : a.handleId) === t &&
          (a == null ? void 0 : a.type) === n),
      clickConnecting:
        (i == null ? void 0 : i.nodeId) === e &&
        (i == null ? void 0 : i.handleId) === t &&
        (i == null ? void 0 : i.type) === n,
    };
  },
  xf = Mu(
    (
      {
        type: e = "source",
        position: t = ne.Top,
        isValidConnection: n,
        isConnectable: o = !0,
        isConnectableStart: r = !0,
        isConnectableEnd: a = !0,
        id: i,
        onConnect: s,
        children: c,
        className: u,
        onMouseDown: l,
        onTouchStart: d,
        ...f
      },
      g,
    ) => {
      var L, I;
      const p = i || null,
        h = e === "target",
        m = Le(),
        y = p6(),
        { connectOnClick: x, noPanClassName: C } = Ee(E6, He),
        { connecting: S, clickConnecting: w } = Ee(_6(y, p, e), He);
      y ||
        (I = (L = m.getState()).onError) == null ||
        I.call(L, "010", gt.error010());
      const M = (P) => {
          const {
              defaultEdgeOptions: $,
              onConnect: B,
              hasDefaultEdges: v,
            } = m.getState(),
            k = {
              ...$,
              ...P,
            };
          if (v) {
            const { edges: E, setEdges: N } = m.getState();
            N(v6(k, E));
          }
          B == null || B(k), s == null || s(k);
        },
        O = (P) => {
          if (!y) return;
          const $ = cf(P);
          r &&
            (($ && P.button === 0) || !$) &&
            wf({
              event: P,
              handleId: p,
              nodeId: y,
              onConnect: M,
              isTarget: h,
              getState: m.getState,
              setState: m.setState,
              isValidConnection: n || m.getState().isValidConnection || nu,
            }),
            $ ? l == null || l(P) : d == null || d(P);
        },
        _ = (P) => {
          const {
            onClickConnectStart: $,
            onClickConnectEnd: B,
            connectionClickStartHandle: v,
            connectionMode: k,
            isValidConnection: E,
          } = m.getState();
          if (!y || (!v && !r)) return;
          if (!v) {
            $ == null || $(P, { nodeId: y, handleId: p, handleType: e }),
              m.setState({
                connectionClickStartHandle: { nodeId: y, type: e, handleId: p },
              });
            return;
          }
          const N = af(P.target),
            z = n || E || nu,
            { connection: T, isValid: A } = vf(
              {
                nodeId: y,
                id: p,
                type: e,
              },
              k,
              v.nodeId,
              v.handleId || null,
              v.type,
              z,
              N,
            );
          A && M(T),
            B == null || B(P),
            m.setState({ connectionClickStartHandle: null });
        };
      return j.createElement(
        "div",
        {
          "data-handleid": p,
          "data-nodeid": y,
          "data-handlepos": t,
          "data-id": `${y}-${p}-${e}`,
          className: $e([
            "react-flow__handle",
            `react-flow__handle-${t}`,
            "nodrag",
            C,
            u,
            {
              source: !h,
              target: h,
              connectable: o,
              connectablestart: r,
              connectableend: a,
              connecting: w,
              // this class is used to style the handle when the user is connecting
              connectionindicator: o && ((r && !S) || (a && S)),
            },
          ]),
          onMouseDown: O,
          onTouchStart: O,
          onClick: x ? _ : void 0,
          ref: g,
          ...f,
        },
        c,
      );
    },
  );
xf.displayName = "Handle";
var Kt = Me(xf);
const Sf = ({
  data: e,
  isConnectable: t,
  targetPosition: n = ne.Top,
  sourcePosition: o = ne.Bottom,
}) =>
  j.createElement(
    j.Fragment,
    null,
    j.createElement(Kt, { type: "target", position: n, isConnectable: t }),
    e == null ? void 0 : e.label,
    j.createElement(Kt, { type: "source", position: o, isConnectable: t }),
  );
Sf.displayName = "DefaultNode";
var Yi = Me(Sf);
const Cf = ({ data: e, isConnectable: t, sourcePosition: n = ne.Bottom }) =>
  j.createElement(
    j.Fragment,
    null,
    e == null ? void 0 : e.label,
    j.createElement(Kt, { type: "source", position: n, isConnectable: t }),
  );
Cf.displayName = "InputNode";
var Ef = Me(Cf);
const _f = ({ data: e, isConnectable: t, targetPosition: n = ne.Top }) =>
  j.createElement(
    j.Fragment,
    null,
    j.createElement(Kt, { type: "target", position: n, isConnectable: t }),
    e == null ? void 0 : e.label,
  );
_f.displayName = "OutputNode";
var kf = Me(_f);
const Ps = () => null;
Ps.displayName = "GroupNode";
const k6 = (e) => ({
    selectedNodes: e.getNodes().filter((t) => t.selected),
    selectedEdges: e.edges.filter((t) => t.selected).map((t) => ({ ...t })),
  }),
  Xo = (e) => e.id;
function A6(e, t) {
  return (
    He(e.selectedNodes.map(Xo), t.selectedNodes.map(Xo)) &&
    He(e.selectedEdges.map(Xo), t.selectedEdges.map(Xo))
  );
}
const Af = Me(({ onSelectionChange: e }) => {
  const t = Le(),
    { selectedNodes: n, selectedEdges: o } = Ee(k6, A6);
  return (
    ie(() => {
      const r = { nodes: n, edges: o };
      e == null || e(r), t.getState().onSelectionChange.forEach((a) => a(r));
    }, [n, o, e]),
    null
  );
});
Af.displayName = "SelectionListener";
const M6 = (e) => !!e.onSelectionChange;
function T6({ onSelectionChange: e }) {
  const t = Ee(M6);
  return e || t ? j.createElement(Af, { onSelectionChange: e }) : null;
}
const O6 = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
});
function wn(e, t) {
  ie(() => {
    typeof e < "u" && t(e);
  }, [e]);
}
function ce(e, t, n) {
  ie(() => {
    typeof t < "u" && n({ [e]: t });
  }, [t]);
}
const N6 = ({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: o,
    onConnect: r,
    onConnectStart: a,
    onConnectEnd: i,
    onClickConnectStart: s,
    onClickConnectEnd: c,
    nodesDraggable: u,
    nodesConnectable: l,
    nodesFocusable: d,
    edgesFocusable: f,
    edgesUpdatable: g,
    elevateNodesOnSelect: p,
    minZoom: h,
    maxZoom: m,
    nodeExtent: y,
    onNodesChange: x,
    onEdgesChange: C,
    elementsSelectable: S,
    connectionMode: w,
    snapGrid: M,
    snapToGrid: O,
    translateExtent: _,
    connectOnClick: L,
    defaultEdgeOptions: I,
    fitView: P,
    fitViewOptions: $,
    onNodesDelete: B,
    onEdgesDelete: v,
    onNodeDrag: k,
    onNodeDragStart: E,
    onNodeDragStop: N,
    onSelectionDrag: z,
    onSelectionDragStart: T,
    onSelectionDragStop: A,
    noPanClassName: D,
    nodeOrigin: H,
    rfId: W,
    autoPanOnConnect: V,
    autoPanOnNodeDrag: Y,
    onError: Z,
    connectionRadius: X,
    isValidConnection: Q,
    nodeDragThreshold: te,
  }) => {
    const {
        setNodes: q,
        setEdges: fe,
        setDefaultNodesAndEdges: K,
        setMinZoom: ye,
        setMaxZoom: Pe,
        setTranslateExtent: Se,
        setNodeExtent: je,
        reset: we,
      } = Ee(O6, He),
      oe = Le();
    return (
      ie(() => {
        const Re = o == null ? void 0 : o.map((At) => ({ ...At, ...I }));
        return (
          K(n, Re),
          () => {
            we();
          }
        );
      }, []),
      ce("defaultEdgeOptions", I, oe.setState),
      ce("connectionMode", w, oe.setState),
      ce("onConnect", r, oe.setState),
      ce("onConnectStart", a, oe.setState),
      ce("onConnectEnd", i, oe.setState),
      ce("onClickConnectStart", s, oe.setState),
      ce("onClickConnectEnd", c, oe.setState),
      ce("nodesDraggable", u, oe.setState),
      ce("nodesConnectable", l, oe.setState),
      ce("nodesFocusable", d, oe.setState),
      ce("edgesFocusable", f, oe.setState),
      ce("edgesUpdatable", g, oe.setState),
      ce("elementsSelectable", S, oe.setState),
      ce("elevateNodesOnSelect", p, oe.setState),
      ce("snapToGrid", O, oe.setState),
      ce("snapGrid", M, oe.setState),
      ce("onNodesChange", x, oe.setState),
      ce("onEdgesChange", C, oe.setState),
      ce("connectOnClick", L, oe.setState),
      ce("fitViewOnInit", P, oe.setState),
      ce("fitViewOnInitOptions", $, oe.setState),
      ce("onNodesDelete", B, oe.setState),
      ce("onEdgesDelete", v, oe.setState),
      ce("onNodeDrag", k, oe.setState),
      ce("onNodeDragStart", E, oe.setState),
      ce("onNodeDragStop", N, oe.setState),
      ce("onSelectionDrag", z, oe.setState),
      ce("onSelectionDragStart", T, oe.setState),
      ce("onSelectionDragStop", A, oe.setState),
      ce("noPanClassName", D, oe.setState),
      ce("nodeOrigin", H, oe.setState),
      ce("rfId", W, oe.setState),
      ce("autoPanOnConnect", V, oe.setState),
      ce("autoPanOnNodeDrag", Y, oe.setState),
      ce("onError", Z, oe.setState),
      ce("connectionRadius", X, oe.setState),
      ce("isValidConnection", Q, oe.setState),
      ce("nodeDragThreshold", te, oe.setState),
      wn(e, q),
      wn(t, fe),
      wn(h, ye),
      wn(m, Pe),
      wn(_, Se),
      wn(y, je),
      null
    );
  },
  ou = { display: "none" },
  D6 = {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0px, 0px, 0px, 0px)",
    clipPath: "inset(100%)",
  },
  Mf = "react-flow__node-desc",
  Tf = "react-flow__edge-desc",
  R6 = "react-flow__aria-live",
  z6 = (e) => e.ariaLiveMessage;
function I6({ rfId: e }) {
  const t = Ee(z6);
  return j.createElement(
    "div",
    {
      id: `${R6}-${e}`,
      "aria-live": "assertive",
      "aria-atomic": "true",
      style: D6,
    },
    t,
  );
}
function L6({ rfId: e, disableKeyboardA11y: t }) {
  return j.createElement(
    j.Fragment,
    null,
    j.createElement(
      "div",
      { id: `${Mf}-${e}`, style: ou },
      "Press enter or space to select a node.",
      !t && "You can then use the arrow keys to move the node around.",
      " Press delete to remove it and escape to cancel.",
      " ",
    ),
    j.createElement(
      "div",
      { id: `${Tf}-${e}`, style: ou },
      "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
    ),
    !t && j.createElement(I6, { rfId: e }),
  );
}
var yo = (e = null, t = { actInsideInputWithModifier: !0 }) => {
  const [n, o] = de(!1),
    r = ae(!1),
    a = ae(/* @__PURE__ */ new Set([])),
    [i, s] = Oe(() => {
      if (e !== null) {
        const u = (Array.isArray(e) ? e : [e])
            .filter((d) => typeof d == "string")
            .map((d) => d.split("+")),
          l = u.reduce((d, f) => d.concat(...f), []);
        return [u, l];
      }
      return [[], []];
    }, [e]);
  return (
    ie(() => {
      const c = typeof document < "u" ? document : null,
        u = (t == null ? void 0 : t.target) || c;
      if (e !== null) {
        const l = (g) => {
            if (
              ((r.current = g.ctrlKey || g.metaKey || g.shiftKey),
              (!r.current || (r.current && !t.actInsideInputWithModifier)) &&
                Wi(g))
            )
              return !1;
            const h = au(g.code, s);
            a.current.add(g[h]),
              ru(i, a.current, !1) && (g.preventDefault(), o(!0));
          },
          d = (g) => {
            if (
              (!r.current || (r.current && !t.actInsideInputWithModifier)) &&
              Wi(g)
            )
              return !1;
            const h = au(g.code, s);
            ru(i, a.current, !0)
              ? (o(!1), a.current.clear())
              : a.current.delete(g[h]),
              g.key === "Meta" && a.current.clear(),
              (r.current = !1);
          },
          f = () => {
            a.current.clear(), o(!1);
          };
        return (
          u == null || u.addEventListener("keydown", l),
          u == null || u.addEventListener("keyup", d),
          window.addEventListener("blur", f),
          () => {
            u == null || u.removeEventListener("keydown", l),
              u == null || u.removeEventListener("keyup", d),
              window.removeEventListener("blur", f);
          }
        );
      }
    }, [e, o]),
    n
  );
};
function ru(e, t, n) {
  return e
    .filter((o) => n || o.length === t.size)
    .some((o) => o.every((r) => t.has(r)));
}
function au(e, t) {
  return t.includes(e) ? "code" : "key";
}
function Of(e, t, n, o) {
  var s, c;
  const r = e.parentNode || e.parentId;
  if (!r) return n;
  const a = t.get(r),
    i = Tn(a, o);
  return Of(
    a,
    t,
    {
      x: (n.x ?? 0) + i.x,
      y: (n.y ?? 0) + i.y,
      z:
        (((s = a[Ae]) == null ? void 0 : s.z) ?? 0) > (n.z ?? 0)
          ? ((c = a[Ae]) == null ? void 0 : c.z) ?? 0
          : n.z ?? 0,
    },
    o,
  );
}
function Nf(e, t, n) {
  e.forEach((o) => {
    var a;
    const r = o.parentNode || o.parentId;
    if (r && !e.has(r)) throw new Error(`Parent node ${r} not found`);
    if (r || (n != null && n[o.id])) {
      const {
        x: i,
        y: s,
        z: c,
      } = Of(
        o,
        e,
        {
          ...o.position,
          z: ((a = o[Ae]) == null ? void 0 : a.z) ?? 0,
        },
        t,
      );
      (o.positionAbsolute = {
        x: i,
        y: s,
      }),
        (o[Ae].z = c),
        n != null && n[o.id] && (o[Ae].isParent = !0);
    }
  });
}
function hi(e, t, n, o) {
  const r = /* @__PURE__ */ new Map(),
    a = {},
    i = o ? 1e3 : 0;
  return (
    e.forEach((s) => {
      var g;
      const c = (nt(s.zIndex) ? s.zIndex : 0) + (s.selected ? i : 0),
        u = t.get(s.id),
        l = {
          ...s,
          positionAbsolute: {
            x: s.position.x,
            y: s.position.y,
          },
        },
        d = s.parentNode || s.parentId;
      d && (a[d] = !0);
      const f =
        (u == null ? void 0 : u.type) &&
        (u == null ? void 0 : u.type) !== s.type;
      Object.defineProperty(l, Ae, {
        enumerable: !1,
        value: {
          handleBounds:
            f || (g = u == null ? void 0 : u[Ae]) == null
              ? void 0
              : g.handleBounds,
          z: c,
        },
      }),
        r.set(s.id, l);
    }),
    Nf(r, n, a),
    r
  );
}
function Df(e, t = {}) {
  const {
      getNodes: n,
      width: o,
      height: r,
      minZoom: a,
      maxZoom: i,
      d3Zoom: s,
      d3Selection: c,
      fitViewOnInitDone: u,
      fitViewOnInit: l,
      nodeOrigin: d,
    } = e(),
    f = t.initial && !u && l;
  if (s && c && (f || !t.initial)) {
    const p = n().filter((m) => {
        var x;
        const y = t.includeHiddenNodes ? m.width && m.height : !m.hidden;
        return (x = t.nodes) != null && x.length
          ? y && t.nodes.some((C) => C.id === m.id)
          : y;
      }),
      h = p.every((m) => m.width && m.height);
    if (p.length > 0 && h) {
      const m = Is(p, d),
        {
          x: y,
          y: x,
          zoom: C,
        } = bf(m, o, r, t.minZoom ?? a, t.maxZoom ?? i, t.padding ?? 0.1),
        S = Xt.translate(y, x).scale(C);
      return (
        typeof t.duration == "number" && t.duration > 0
          ? s.transform(rn(c, t.duration), S)
          : s.transform(c, S),
        !0
      );
    }
  }
  return !1;
}
function P6(e, t) {
  return (
    e.forEach((n) => {
      const o = t.get(n.id);
      o &&
        t.set(o.id, {
          ...o,
          [Ae]: o[Ae],
          selected: n.selected,
        });
    }),
    new Map(t)
  );
}
function H6(e, t) {
  return t.map((n) => {
    const o = e.find((r) => r.id === n.id);
    return o && (n.selected = o.selected), n;
  });
}
function Go({ changedNodes: e, changedEdges: t, get: n, set: o }) {
  const {
    nodeInternals: r,
    edges: a,
    onNodesChange: i,
    onEdgesChange: s,
    hasDefaultNodes: c,
    hasDefaultEdges: u,
  } = n();
  e != null &&
    e.length &&
    (c && o({ nodeInternals: P6(e, r) }), i == null || i(e)),
    t != null && t.length && (u && o({ edges: H6(t, a) }), s == null || s(t));
}
const xn = () => {},
  j6 = {
    zoomIn: xn,
    zoomOut: xn,
    zoomTo: xn,
    getZoom: () => 1,
    setViewport: xn,
    getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
    fitView: () => !1,
    setCenter: xn,
    fitBounds: xn,
    project: (e) => e,
    screenToFlowPosition: (e) => e,
    flowToScreenPosition: (e) => e,
    viewportInitialized: !1,
  },
  F6 = (e) => ({
    d3Zoom: e.d3Zoom,
    d3Selection: e.d3Selection,
  }),
  B6 = () => {
    const e = Le(),
      { d3Zoom: t, d3Selection: n } = Ee(F6, He);
    return Oe(
      () =>
        n && t
          ? {
              zoomIn: (r) =>
                t.scaleBy(rn(n, r == null ? void 0 : r.duration), 1.2),
              zoomOut: (r) =>
                t.scaleBy(rn(n, r == null ? void 0 : r.duration), 1 / 1.2),
              zoomTo: (r, a) =>
                t.scaleTo(rn(n, a == null ? void 0 : a.duration), r),
              getZoom: () => e.getState().transform[2],
              setViewport: (r, a) => {
                const [i, s, c] = e.getState().transform,
                  u = Xt.translate(r.x ?? i, r.y ?? s).scale(r.zoom ?? c);
                t.transform(rn(n, a == null ? void 0 : a.duration), u);
              },
              getViewport: () => {
                const [r, a, i] = e.getState().transform;
                return { x: r, y: a, zoom: i };
              },
              fitView: (r) => Df(e.getState, r),
              setCenter: (r, a, i) => {
                const { width: s, height: c, maxZoom: u } = e.getState(),
                  l = typeof (i == null ? void 0 : i.zoom) < "u" ? i.zoom : u,
                  d = s / 2 - r * l,
                  f = c / 2 - a * l,
                  g = Xt.translate(d, f).scale(l);
                t.transform(rn(n, i == null ? void 0 : i.duration), g);
              },
              fitBounds: (r, a) => {
                const {
                    width: i,
                    height: s,
                    minZoom: c,
                    maxZoom: u,
                  } = e.getState(),
                  {
                    x: l,
                    y: d,
                    zoom: f,
                  } = bf(
                    r,
                    i,
                    s,
                    c,
                    u,
                    (a == null ? void 0 : a.padding) ?? 0.1,
                  ),
                  g = Xt.translate(l, d).scale(f);
                t.transform(rn(n, a == null ? void 0 : a.duration), g);
              },
              // @deprecated Use `screenToFlowPosition`.
              project: (r) => {
                const {
                  transform: a,
                  snapToGrid: i,
                  snapGrid: s,
                } = e.getState();
                return (
                  console.warn(
                    "[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position",
                  ),
                  Ui(r, a, i, s)
                );
              },
              screenToFlowPosition: (r) => {
                const {
                  transform: a,
                  snapToGrid: i,
                  snapGrid: s,
                  domNode: c,
                } = e.getState();
                if (!c) return r;
                const { x: u, y: l } = c.getBoundingClientRect(),
                  d = {
                    x: r.x - u,
                    y: r.y - l,
                  };
                return Ui(d, a, i, s);
              },
              flowToScreenPosition: (r) => {
                const { transform: a, domNode: i } = e.getState();
                if (!i) return r;
                const { x: s, y: c } = i.getBoundingClientRect(),
                  u = pf(r, a);
                return {
                  x: u.x + s,
                  y: u.y + c,
                };
              },
              viewportInitialized: !0,
            }
          : j6,
      [t, n],
    );
  };
function Et() {
  const e = B6(),
    t = Le(),
    n = he(
      () =>
        t
          .getState()
          .getNodes()
          .map((h) => ({ ...h })),
      [],
    ),
    o = he((h) => t.getState().nodeInternals.get(h), []),
    r = he(() => {
      const { edges: h = [] } = t.getState();
      return h.map((m) => ({ ...m }));
    }, []),
    a = he((h) => {
      const { edges: m = [] } = t.getState();
      return m.find((y) => y.id === h);
    }, []),
    i = he((h) => {
      const {
          getNodes: m,
          setNodes: y,
          hasDefaultNodes: x,
          onNodesChange: C,
        } = t.getState(),
        S = m(),
        w = typeof h == "function" ? h(S) : h;
      if (x) y(w);
      else if (C) {
        const M =
          w.length === 0
            ? S.map((O) => ({ type: "remove", id: O.id }))
            : w.map((O) => ({ item: O, type: "reset" }));
        C(M);
      }
    }, []),
    s = he((h) => {
      const {
          edges: m = [],
          setEdges: y,
          hasDefaultEdges: x,
          onEdgesChange: C,
        } = t.getState(),
        S = typeof h == "function" ? h(m) : h;
      if (x) y(S);
      else if (C) {
        const w =
          S.length === 0
            ? m.map((M) => ({ type: "remove", id: M.id }))
            : S.map((M) => ({ item: M, type: "reset" }));
        C(w);
      }
    }, []),
    c = he((h) => {
      const m = Array.isArray(h) ? h : [h],
        {
          getNodes: y,
          setNodes: x,
          hasDefaultNodes: C,
          onNodesChange: S,
        } = t.getState();
      if (C) {
        const M = [...y(), ...m];
        x(M);
      } else if (S) {
        const w = m.map((M) => ({ item: M, type: "add" }));
        S(w);
      }
    }, []),
    u = he((h) => {
      const m = Array.isArray(h) ? h : [h],
        {
          edges: y = [],
          setEdges: x,
          hasDefaultEdges: C,
          onEdgesChange: S,
        } = t.getState();
      if (C) x([...y, ...m]);
      else if (S) {
        const w = m.map((M) => ({ item: M, type: "add" }));
        S(w);
      }
    }, []),
    l = he(() => {
      const { getNodes: h, edges: m = [], transform: y } = t.getState(),
        [x, C, S] = y;
      return {
        nodes: h().map((w) => ({ ...w })),
        edges: m.map((w) => ({ ...w })),
        viewport: {
          x,
          y: C,
          zoom: S,
        },
      };
    }, []),
    d = he(({ nodes: h, edges: m }) => {
      const {
          nodeInternals: y,
          getNodes: x,
          edges: C,
          hasDefaultNodes: S,
          hasDefaultEdges: w,
          onNodesDelete: M,
          onEdgesDelete: O,
          onNodesChange: _,
          onEdgesChange: L,
        } = t.getState(),
        I = (h || []).map((k) => k.id),
        P = (m || []).map((k) => k.id),
        $ = x().reduce((k, E) => {
          const N = E.parentNode || E.parentId,
            z = !I.includes(E.id) && N && k.find((A) => A.id === N);
          return (
            (typeof E.deletable == "boolean" ? E.deletable : !0) &&
              (I.includes(E.id) || z) &&
              k.push(E),
            k
          );
        }, []),
        B = C.filter((k) =>
          typeof k.deletable == "boolean" ? k.deletable : !0,
        ),
        v = B.filter((k) => P.includes(k.id));
      if ($ || v) {
        const k = mf($, B),
          E = [...v, ...k],
          N = E.reduce((z, T) => (z.includes(T.id) || z.push(T.id), z), []);
        if (
          ((w || S) &&
            (w &&
              t.setState({
                edges: C.filter((z) => !N.includes(z.id)),
              }),
            S &&
              ($.forEach((z) => {
                y.delete(z.id);
              }),
              t.setState({
                nodeInternals: new Map(y),
              }))),
          N.length > 0 &&
            (O == null || O(E),
            L &&
              L(
                N.map((z) => ({
                  id: z,
                  type: "remove",
                })),
              )),
          $.length > 0 && (M == null || M($), _))
        ) {
          const z = $.map((T) => ({ id: T.id, type: "remove" }));
          _(z);
        }
      }
    }, []),
    f = he((h) => {
      const m = s6(h),
        y = m ? null : t.getState().nodeInternals.get(h.id);
      return !m && !y ? [null, null, m] : [m ? h : Xc(y), y, m];
    }, []),
    g = he((h, m = !0, y) => {
      const [x, C, S] = f(h);
      return x
        ? (y || t.getState().getNodes()).filter((w) => {
            if (!S && (w.id === C.id || !w.positionAbsolute)) return !1;
            const M = Xc(w),
              O = $i(M, x);
            return (m && O > 0) || O >= x.width * x.height;
          })
        : [];
    }, []),
    p = he((h, m, y = !0) => {
      const [x] = f(h);
      if (!x) return !1;
      const C = $i(x, m);
      return (y && C > 0) || C >= x.width * x.height;
    }, []);
  return Oe(
    () => ({
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
      isNodeIntersecting: p,
    }),
    [e, n, o, r, a, i, s, c, u, l, d, g, p],
  );
}
const $6 = { actInsideInputWithModifier: !1 };
var W6 = ({ deleteKeyCode: e, multiSelectionKeyCode: t }) => {
  const n = Le(),
    { deleteElements: o } = Et(),
    r = yo(e, $6),
    a = yo(t);
  ie(() => {
    if (r) {
      const { edges: i, getNodes: s } = n.getState(),
        c = s().filter((l) => l.selected),
        u = i.filter((l) => l.selected);
      o({ nodes: c, edges: u }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [r]),
    ie(() => {
      n.setState({ multiSelectionActive: a });
    }, [a]);
};
function V6(e) {
  const t = Le();
  ie(() => {
    let n;
    const o = () => {
      var a, i;
      if (!e.current) return;
      const r = Ms(e.current);
      (r.height === 0 || r.width === 0) &&
        ((i = (a = t.getState()).onError) == null ||
          i.call(a, "004", gt.error004())),
        t.setState({ width: r.width || 500, height: r.height || 500 });
    };
    return (
      o(),
      window.addEventListener("resize", o),
      e.current && ((n = new ResizeObserver(() => o())), n.observe(e.current)),
      () => {
        window.removeEventListener("resize", o),
          n && e.current && n.unobserve(e.current);
      }
    );
  }, []);
}
const Hs = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  q6 = (e, t) => e.x !== t.x || e.y !== t.y || e.zoom !== t.k,
  Qo = (e) => ({
    x: e.x,
    y: e.y,
    zoom: e.k,
  }),
  Sn = (e, t) => e.target.closest(`.${t}`),
  iu = (e, t) => t === 2 && Array.isArray(e) && e.includes(2),
  su = (e) => {
    const t = e.ctrlKey && Ar() ? 10 : 1;
    return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
  },
  U6 = (e) => ({
    d3Zoom: e.d3Zoom,
    d3Selection: e.d3Selection,
    d3ZoomHandler: e.d3ZoomHandler,
    userSelectionActive: e.userSelectionActive,
  }),
  Y6 = ({
    onMove: e,
    onMoveStart: t,
    onMoveEnd: n,
    onPaneContextMenu: o,
    zoomOnScroll: r = !0,
    zoomOnPinch: a = !0,
    panOnScroll: i = !1,
    panOnScrollSpeed: s = 0.5,
    panOnScrollMode: c = cn.Free,
    zoomOnDoubleClick: u = !0,
    elementsSelectable: l,
    panOnDrag: d = !0,
    defaultViewport: f,
    translateExtent: g,
    minZoom: p,
    maxZoom: h,
    zoomActivationKeyCode: m,
    preventScrolling: y = !0,
    children: x,
    noWheelClassName: C,
    noPanClassName: S,
  }) => {
    const w = ae(),
      M = Le(),
      O = ae(!1),
      _ = ae(!1),
      L = ae(null),
      I = ae({ x: 0, y: 0, zoom: 0 }),
      {
        d3Zoom: P,
        d3Selection: $,
        d3ZoomHandler: B,
        userSelectionActive: v,
      } = Ee(U6, He),
      k = yo(m),
      E = ae(0),
      N = ae(!1),
      z = ae();
    return (
      V6(L),
      ie(() => {
        if (L.current) {
          const T = L.current.getBoundingClientRect(),
            A = J5().scaleExtent([p, h]).translateExtent(g),
            D = ut(L.current).call(A),
            H = Xt.translate(f.x, f.y).scale(Hn(f.zoom, p, h)),
            W = [
              [0, 0],
              [T.width, T.height],
            ],
            V = A.constrain()(H, W, g);
          A.transform(D, V),
            A.wheelDelta(su),
            M.setState({
              d3Zoom: A,
              d3Selection: D,
              d3ZoomHandler: D.on("wheel.zoom"),
              // we need to pass transform because zoom handler is not registered when we set the initial transform
              transform: [V.x, V.y, V.k],
              domNode: L.current.closest(".react-flow"),
            });
        }
      }, []),
      ie(() => {
        $ &&
          P &&
          (i && !k && !v
            ? $.on(
                "wheel.zoom",
                (T) => {
                  if (Sn(T, C)) return !1;
                  T.preventDefault(), T.stopImmediatePropagation();
                  const A = $.property("__zoom").k || 1;
                  if (T.ctrlKey && a) {
                    const Q = vt(T),
                      te = su(T),
                      q = A * Math.pow(2, te);
                    P.scaleTo($, q, Q, T);
                    return;
                  }
                  const D = T.deltaMode === 1 ? 20 : 1;
                  let H = c === cn.Vertical ? 0 : T.deltaX * D,
                    W = c === cn.Horizontal ? 0 : T.deltaY * D;
                  !Ar() &&
                    T.shiftKey &&
                    c !== cn.Vertical &&
                    ((H = T.deltaY * D), (W = 0)),
                    P.translateBy(
                      $,
                      -(H / A) * s,
                      -(W / A) * s,
                      // @ts-ignore
                      { internal: !0 },
                    );
                  const V = Qo($.property("__zoom")),
                    {
                      onViewportChangeStart: Y,
                      onViewportChange: Z,
                      onViewportChangeEnd: X,
                    } = M.getState();
                  clearTimeout(z.current),
                    N.current ||
                      ((N.current = !0),
                      t == null || t(T, V),
                      Y == null || Y(V)),
                    N.current &&
                      (e == null || e(T, V),
                      Z == null || Z(V),
                      (z.current = setTimeout(() => {
                        n == null || n(T, V),
                          X == null || X(V),
                          (N.current = !1);
                      }, 150)));
                },
                { passive: !1 },
              )
            : typeof B < "u" &&
              $.on(
                "wheel.zoom",
                function (T, A) {
                  if ((!y && T.type === "wheel" && !T.ctrlKey) || Sn(T, C))
                    return null;
                  T.preventDefault(), B.call(this, T, A);
                },
                { passive: !1 },
              ));
      }, [v, i, c, $, P, B, k, a, y, C, t, e, n]),
      ie(() => {
        P &&
          P.on("start", (T) => {
            var H, W;
            if (!T.sourceEvent || T.sourceEvent.internal) return null;
            E.current = (H = T.sourceEvent) == null ? void 0 : H.button;
            const { onViewportChangeStart: A } = M.getState(),
              D = Qo(T.transform);
            (O.current = !0),
              (I.current = D),
              ((W = T.sourceEvent) == null ? void 0 : W.type) === "mousedown" &&
                M.setState({ paneDragging: !0 }),
              A == null || A(D),
              t == null || t(T.sourceEvent, D);
          });
      }, [P, t]),
      ie(() => {
        P &&
          (v && !O.current
            ? P.on("zoom", null)
            : v ||
              P.on("zoom", (T) => {
                var D;
                const { onViewportChange: A } = M.getState();
                if (
                  (M.setState({
                    transform: [T.transform.x, T.transform.y, T.transform.k],
                  }),
                  (_.current = !!(o && iu(d, E.current ?? 0))),
                  (e || A) && !((D = T.sourceEvent) != null && D.internal))
                ) {
                  const H = Qo(T.transform);
                  A == null || A(H), e == null || e(T.sourceEvent, H);
                }
              }));
      }, [v, P, e, d, o]),
      ie(() => {
        P &&
          P.on("end", (T) => {
            if (!T.sourceEvent || T.sourceEvent.internal) return null;
            const { onViewportChangeEnd: A } = M.getState();
            if (
              ((O.current = !1),
              M.setState({ paneDragging: !1 }),
              o && iu(d, E.current ?? 0) && !_.current && o(T.sourceEvent),
              (_.current = !1),
              (n || A) && q6(I.current, T.transform))
            ) {
              const D = Qo(T.transform);
              (I.current = D),
                clearTimeout(w.current),
                (w.current = setTimeout(
                  () => {
                    A == null || A(D), n == null || n(T.sourceEvent, D);
                  },
                  i ? 150 : 0,
                ));
            }
          });
      }, [P, i, d, n, o]),
      ie(() => {
        P &&
          P.filter((T) => {
            const A = k || r,
              D = a && T.ctrlKey;
            if (
              (d === !0 || (Array.isArray(d) && d.includes(1))) &&
              T.button === 1 &&
              T.type === "mousedown" &&
              (Sn(T, "react-flow__node") || Sn(T, "react-flow__edge"))
            )
              return !0;
            if (
              (!d && !A && !i && !u && !a) ||
              v ||
              (!u && T.type === "dblclick") ||
              (Sn(T, C) && T.type === "wheel") ||
              (Sn(T, S) &&
                (T.type !== "wheel" || (i && T.type === "wheel" && !k))) ||
              (!a && T.ctrlKey && T.type === "wheel") ||
              (!A && !i && !D && T.type === "wheel") ||
              (!d && (T.type === "mousedown" || T.type === "touchstart")) ||
              (Array.isArray(d) &&
                !d.includes(T.button) &&
                T.type === "mousedown")
            )
              return !1;
            const H =
              (Array.isArray(d) && d.includes(T.button)) ||
              !T.button ||
              T.button <= 1;
            return (!T.ctrlKey || T.type === "wheel") && H;
          });
      }, [v, P, r, a, i, u, d, l, k]),
      j.createElement(
        "div",
        { className: "react-flow__renderer", ref: L, style: Hs },
        x,
      )
    );
  },
  Z6 = (e) => ({
    userSelectionActive: e.userSelectionActive,
    userSelectionRect: e.userSelectionRect,
  });
function K6() {
  const { userSelectionActive: e, userSelectionRect: t } = Ee(Z6, He);
  return e && t
    ? j.createElement("div", {
        className: "react-flow__selection react-flow__container",
        style: {
          width: t.width,
          height: t.height,
          transform: `translate(${t.x}px, ${t.y}px)`,
        },
      })
    : null;
}
function lu(e, t) {
  const n = t.parentNode || t.parentId,
    o = e.find((r) => r.id === n);
  if (o) {
    const r = t.position.x + t.width - o.width,
      a = t.position.y + t.height - o.height;
    if (r > 0 || a > 0 || t.position.x < 0 || t.position.y < 0) {
      if (
        ((o.style = { ...o.style }),
        (o.style.width = o.style.width ?? o.width),
        (o.style.height = o.style.height ?? o.height),
        r > 0 && (o.style.width += r),
        a > 0 && (o.style.height += a),
        t.position.x < 0)
      ) {
        const i = Math.abs(t.position.x);
        (o.position.x = o.position.x - i),
          (o.style.width += i),
          (t.position.x = 0);
      }
      if (t.position.y < 0) {
        const i = Math.abs(t.position.y);
        (o.position.y = o.position.y - i),
          (o.style.height += i),
          (t.position.y = 0);
      }
      (o.width = o.style.width), (o.height = o.style.height);
    }
  }
}
function X6(e, t) {
  if (e.some((o) => o.type === "reset"))
    return e.filter((o) => o.type === "reset").map((o) => o.item);
  const n = e.filter((o) => o.type === "add").map((o) => o.item);
  return t.reduce((o, r) => {
    const a = e.filter((s) => s.id === r.id);
    if (a.length === 0) return o.push(r), o;
    const i = { ...r };
    for (const s of a)
      if (s)
        switch (s.type) {
          case "select": {
            i.selected = s.selected;
            break;
          }
          case "position": {
            typeof s.position < "u" && (i.position = s.position),
              typeof s.positionAbsolute < "u" &&
                (i.positionAbsolute = s.positionAbsolute),
              typeof s.dragging < "u" && (i.dragging = s.dragging),
              i.expandParent && lu(o, i);
            break;
          }
          case "dimensions": {
            typeof s.dimensions < "u" &&
              ((i.width = s.dimensions.width),
              (i.height = s.dimensions.height)),
              typeof s.updateStyle < "u" &&
                (i.style = { ...(i.style || {}), ...s.dimensions }),
              typeof s.resizing == "boolean" && (i.resizing = s.resizing),
              i.expandParent && lu(o, i);
            break;
          }
          case "remove":
            return o;
        }
    return o.push(i), o;
  }, n);
}
function G6(e, t) {
  return X6(e, t);
}
const Yt = (e, t) => ({
  id: e,
  type: "select",
  selected: t,
});
function En(e, t) {
  return e.reduce((n, o) => {
    const r = t.includes(o.id);
    return (
      !o.selected && r
        ? ((o.selected = !0), n.push(Yt(o.id, !0)))
        : o.selected && !r && ((o.selected = !1), n.push(Yt(o.id, !1))),
      n
    );
  }, []);
}
const mi = (e, t) => (n) => {
    n.target === t.current && (e == null || e(n));
  },
  Q6 = (e) => ({
    userSelectionActive: e.userSelectionActive,
    elementsSelectable: e.elementsSelectable,
    dragging: e.paneDragging,
  }),
  Rf = Me(
    ({
      isSelecting: e,
      selectionMode: t = bo.Full,
      panOnDrag: n,
      onSelectionStart: o,
      onSelectionEnd: r,
      onPaneClick: a,
      onPaneContextMenu: i,
      onPaneScroll: s,
      onPaneMouseEnter: c,
      onPaneMouseMove: u,
      onPaneMouseLeave: l,
      children: d,
    }) => {
      const f = ae(null),
        g = Le(),
        p = ae(0),
        h = ae(0),
        m = ae(),
        {
          userSelectionActive: y,
          elementsSelectable: x,
          dragging: C,
        } = Ee(Q6, He),
        S = () => {
          g.setState({ userSelectionActive: !1, userSelectionRect: null }),
            (p.current = 0),
            (h.current = 0);
        },
        w = (B) => {
          a == null || a(B),
            g.getState().resetSelectedElements(),
            g.setState({ nodesSelectionActive: !1 });
        },
        M = (B) => {
          if (Array.isArray(n) && n != null && n.includes(2)) {
            B.preventDefault();
            return;
          }
          i == null || i(B);
        },
        O = s ? (B) => s(B) : void 0,
        _ = (B) => {
          const { resetSelectedElements: v, domNode: k } = g.getState();
          if (
            ((m.current = k == null ? void 0 : k.getBoundingClientRect()),
            !x || !e || B.button !== 0 || B.target !== f.current || !m.current)
          )
            return;
          const { x: E, y: N } = Gt(B, m.current);
          v(),
            g.setState({
              userSelectionRect: {
                width: 0,
                height: 0,
                startX: E,
                startY: N,
                x: E,
                y: N,
              },
            }),
            o == null || o(B);
        },
        L = (B) => {
          const {
            userSelectionRect: v,
            nodeInternals: k,
            edges: E,
            transform: N,
            onNodesChange: z,
            onEdgesChange: T,
            nodeOrigin: A,
            getNodes: D,
          } = g.getState();
          if (!e || !m.current || !v) return;
          g.setState({ userSelectionActive: !0, nodesSelectionActive: !1 });
          const H = Gt(B, m.current),
            W = v.startX ?? 0,
            V = v.startY ?? 0,
            Y = {
              ...v,
              x: H.x < W ? H.x : W,
              y: H.y < V ? H.y : V,
              width: Math.abs(H.x - W),
              height: Math.abs(H.y - V),
            },
            Z = D(),
            X = hf(k, Y, N, t === bo.Partial, !0, A),
            Q = mf(X, E).map((q) => q.id),
            te = X.map((q) => q.id);
          if (p.current !== te.length) {
            p.current = te.length;
            const q = En(Z, te);
            q.length && (z == null || z(q));
          }
          if (h.current !== Q.length) {
            h.current = Q.length;
            const q = En(E, Q);
            q.length && (T == null || T(q));
          }
          g.setState({
            userSelectionRect: Y,
          });
        },
        I = (B) => {
          if (B.button !== 0) return;
          const { userSelectionRect: v } = g.getState();
          !y && v && B.target === f.current && (w == null || w(B)),
            g.setState({ nodesSelectionActive: p.current > 0 }),
            S(),
            r == null || r(B);
        },
        P = (B) => {
          y &&
            (g.setState({ nodesSelectionActive: p.current > 0 }),
            r == null || r(B)),
            S();
        },
        $ = x && (e || y);
      return j.createElement(
        "div",
        {
          className: $e(["react-flow__pane", { dragging: C, selection: e }]),
          onClick: $ ? void 0 : mi(w, f),
          onContextMenu: mi(M, f),
          onWheel: mi(O, f),
          onMouseEnter: $ ? void 0 : c,
          onMouseDown: $ ? _ : void 0,
          onMouseMove: $ ? L : u,
          onMouseUp: $ ? I : void 0,
          onMouseLeave: $ ? P : l,
          ref: f,
          style: Hs,
        },
        d,
        j.createElement(K6, null),
      );
    },
  );
Rf.displayName = "Pane";
function zf(e, t) {
  const n = e.parentNode || e.parentId;
  if (!n) return !1;
  const o = t.get(n);
  return o ? (o.selected ? !0 : zf(o, t)) : !1;
}
function cu(e, t, n) {
  let o = e;
  do {
    if (o != null && o.matches(t)) return !0;
    if (o === n.current) return !1;
    o = o.parentElement;
  } while (o);
  return !1;
}
function J6(e, t, n, o) {
  return Array.from(e.values())
    .filter(
      (r) =>
        (r.selected || r.id === o) &&
        (!r.parentNode || r.parentId || !zf(r, e)) &&
        (r.draggable || (t && typeof r.draggable > "u")),
    )
    .map((r) => {
      var a, i;
      return {
        id: r.id,
        position: r.position || { x: 0, y: 0 },
        positionAbsolute: r.positionAbsolute || { x: 0, y: 0 },
        distance: {
          x: n.x - (((a = r.positionAbsolute) == null ? void 0 : a.x) ?? 0),
          y: n.y - (((i = r.positionAbsolute) == null ? void 0 : i.y) ?? 0),
        },
        delta: {
          x: 0,
          y: 0,
        },
        extent: r.extent,
        parentNode: r.parentNode || r.parentId,
        parentId: r.parentNode || r.parentId,
        width: r.width,
        height: r.height,
        expandParent: r.expandParent,
      };
    });
}
function e7(e, t) {
  return !t || t === "parent"
    ? t
    : [t[0], [t[1][0] - (e.width || 0), t[1][1] - (e.height || 0)]];
}
function If(e, t, n, o, r = [0, 0], a) {
  const i = e7(e, e.extent || o);
  let s = i;
  const c = e.parentNode || e.parentId;
  if (e.extent === "parent" && !e.expandParent)
    if (c && e.width && e.height) {
      const d = n.get(c),
        { x: f, y: g } = Tn(d, r).positionAbsolute;
      s =
        d && nt(f) && nt(g) && nt(d.width) && nt(d.height)
          ? [
              [f + e.width * r[0], g + e.height * r[1]],
              [
                f + d.width - e.width + e.width * r[0],
                g + d.height - e.height + e.height * r[1],
              ],
            ]
          : s;
    } else a == null || a("005", gt.error005()), (s = i);
  else if (e.extent && c && e.extent !== "parent") {
    const d = n.get(c),
      { x: f, y: g } = Tn(d, r).positionAbsolute;
    s = [
      [e.extent[0][0] + f, e.extent[0][1] + g],
      [e.extent[1][0] + f, e.extent[1][1] + g],
    ];
  }
  let u = { x: 0, y: 0 };
  if (c) {
    const d = n.get(c);
    u = Tn(d, r).positionAbsolute;
  }
  const l = s && s !== "parent" ? Ts(t, s) : t;
  return {
    position: {
      x: l.x - u.x,
      y: l.y - u.y,
    },
    positionAbsolute: l,
  };
}
function bi({ nodeId: e, dragItems: t, nodeInternals: n }) {
  const o = t.map((r) => ({
    ...n.get(r.id),
    position: r.position,
    positionAbsolute: r.positionAbsolute,
  }));
  return [e ? o.find((r) => r.id === e) : o[0], o];
}
const uu = (e, t, n, o) => {
  const r = t.querySelectorAll(e);
  if (!r || !r.length) return null;
  const a = Array.from(r),
    i = t.getBoundingClientRect(),
    s = {
      x: i.width * o[0],
      y: i.height * o[1],
    };
  return a.map((c) => {
    const u = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      position: c.getAttribute("data-handlepos"),
      x: (u.left - i.left - s.x) / n,
      y: (u.top - i.top - s.y) / n,
      ...Ms(c),
    };
  });
};
function Gn(e, t, n) {
  return n === void 0
    ? n
    : (o) => {
        const r = t().nodeInternals.get(e);
        r && n(o, { ...r });
      };
}
function Zi({ id: e, store: t, unselect: n = !1, nodeRef: o }) {
  const {
      addSelectedNodes: r,
      unselectNodesAndEdges: a,
      multiSelectionActive: i,
      nodeInternals: s,
      onError: c,
    } = t.getState(),
    u = s.get(e);
  if (!u) {
    c == null || c("012", gt.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }),
    u.selected
      ? (n || (u.selected && i)) &&
        (a({ nodes: [u], edges: [] }),
        requestAnimationFrame(() => {
          var l;
          return (l = o == null ? void 0 : o.current) == null
            ? void 0
            : l.blur();
        }))
      : r([e]);
}
function t7() {
  const e = Le();
  return he(({ sourceEvent: n }) => {
    const { transform: o, snapGrid: r, snapToGrid: a } = e.getState(),
      i = n.touches ? n.touches[0].clientX : n.clientX,
      s = n.touches ? n.touches[0].clientY : n.clientY,
      c = {
        x: (i - o[0]) / o[2],
        y: (s - o[1]) / o[2],
      };
    return {
      xSnapped: a ? r[0] * Math.round(c.x / r[0]) : c.x,
      ySnapped: a ? r[1] * Math.round(c.y / r[1]) : c.y,
      ...c,
    };
  }, []);
}
function yi(e) {
  return (t, n, o) => (e == null ? void 0 : e(t, o));
}
function Lf({
  nodeRef: e,
  disabled: t = !1,
  noDragClassName: n,
  handleSelector: o,
  nodeId: r,
  isSelectable: a,
  selectNodesOnDrag: i,
}) {
  const s = Le(),
    [c, u] = de(!1),
    l = ae([]),
    d = ae({ x: null, y: null }),
    f = ae(0),
    g = ae(null),
    p = ae({ x: 0, y: 0 }),
    h = ae(null),
    m = ae(!1),
    y = ae(!1),
    x = t7();
  return (
    ie(() => {
      if (e != null && e.current) {
        const C = ut(e.current),
          S = ({ x: O, y: _ }) => {
            const {
              nodeInternals: L,
              onNodeDrag: I,
              onSelectionDrag: P,
              updateNodePositions: $,
              nodeExtent: B,
              snapGrid: v,
              snapToGrid: k,
              nodeOrigin: E,
              onError: N,
            } = s.getState();
            d.current = { x: O, y: _ };
            let z = !1,
              T = { x: 0, y: 0, x2: 0, y2: 0 };
            if (l.current.length > 1 && B) {
              const D = Is(l.current, E);
              T = Os(D);
            }
            if (
              ((l.current = l.current.map((D) => {
                const H = { x: O - D.distance.x, y: _ - D.distance.y };
                k &&
                  ((H.x = v[0] * Math.round(H.x / v[0])),
                  (H.y = v[1] * Math.round(H.y / v[1])));
                const W = [
                  [B[0][0], B[0][1]],
                  [B[1][0], B[1][1]],
                ];
                l.current.length > 1 &&
                  B &&
                  !D.extent &&
                  ((W[0][0] = D.positionAbsolute.x - T.x + B[0][0]),
                  (W[1][0] =
                    D.positionAbsolute.x + (D.width ?? 0) - T.x2 + B[1][0]),
                  (W[0][1] = D.positionAbsolute.y - T.y + B[0][1]),
                  (W[1][1] =
                    D.positionAbsolute.y + (D.height ?? 0) - T.y2 + B[1][1]));
                const V = If(D, H, L, W, E, N);
                return (
                  (z =
                    z ||
                    D.position.x !== V.position.x ||
                    D.position.y !== V.position.y),
                  (D.position = V.position),
                  (D.positionAbsolute = V.positionAbsolute),
                  D
                );
              })),
              !z)
            )
              return;
            $(l.current, !0, !0), u(!0);
            const A = r ? I : yi(P);
            if (A && h.current) {
              const [D, H] = bi({
                nodeId: r,
                dragItems: l.current,
                nodeInternals: L,
              });
              A(h.current, D, H);
            }
          },
          w = () => {
            if (!g.current) return;
            const [O, _] = rf(p.current, g.current);
            if (O !== 0 || _ !== 0) {
              const { transform: L, panBy: I } = s.getState();
              (d.current.x = (d.current.x ?? 0) - O / L[2]),
                (d.current.y = (d.current.y ?? 0) - _ / L[2]),
                I({ x: O, y: _ }) && S(d.current);
            }
            f.current = requestAnimationFrame(w);
          },
          M = (O) => {
            var E;
            const {
              nodeInternals: _,
              multiSelectionActive: L,
              nodesDraggable: I,
              unselectNodesAndEdges: P,
              onNodeDragStart: $,
              onSelectionDragStart: B,
            } = s.getState();
            y.current = !0;
            const v = r ? $ : yi(B);
            (!i || !a) &&
              !L &&
              r &&
              (((E = _.get(r)) != null && E.selected) || P()),
              r &&
                a &&
                i &&
                Zi({
                  id: r,
                  store: s,
                  nodeRef: e,
                });
            const k = x(O);
            if (
              ((d.current = k), (l.current = J6(_, I, k, r)), v && l.current)
            ) {
              const [N, z] = bi({
                nodeId: r,
                dragItems: l.current,
                nodeInternals: _,
              });
              v(O.sourceEvent, N, z);
            }
          };
        if (t) C.on(".drag", null);
        else {
          const O = cb()
            .on("start", (_) => {
              const { domNode: L, nodeDragThreshold: I } = s.getState();
              I === 0 && M(_);
              const P = x(_);
              (d.current = P),
                (g.current =
                  (L == null ? void 0 : L.getBoundingClientRect()) || null),
                (p.current = Gt(_.sourceEvent, g.current));
            })
            .on("drag", (_) => {
              var $, B;
              const L = x(_),
                { autoPanOnNodeDrag: I, nodeDragThreshold: P } = s.getState();
              if (
                (!m.current && y.current && I && ((m.current = !0), w()),
                !y.current)
              ) {
                const v =
                    L.xSnapped -
                    ((($ = d == null ? void 0 : d.current) == null
                      ? void 0
                      : $.x) ?? 0),
                  k =
                    L.ySnapped -
                    (((B = d == null ? void 0 : d.current) == null
                      ? void 0
                      : B.y) ?? 0);
                Math.sqrt(v * v + k * k) > P && M(_);
              }
              (d.current.x !== L.xSnapped || d.current.y !== L.ySnapped) &&
                l.current &&
                y.current &&
                ((h.current = _.sourceEvent),
                (p.current = Gt(_.sourceEvent, g.current)),
                S(L));
            })
            .on("end", (_) => {
              if (
                y.current &&
                (u(!1),
                (m.current = !1),
                (y.current = !1),
                cancelAnimationFrame(f.current),
                l.current)
              ) {
                const {
                    updateNodePositions: L,
                    nodeInternals: I,
                    onNodeDragStop: P,
                    onSelectionDragStop: $,
                  } = s.getState(),
                  B = r ? P : yi($);
                if ((L(l.current, !1, !1), B)) {
                  const [v, k] = bi({
                    nodeId: r,
                    dragItems: l.current,
                    nodeInternals: I,
                  });
                  B(_.sourceEvent, v, k);
                }
              }
            })
            .filter((_) => {
              const L = _.target;
              return (
                !_.button && (!n || !cu(L, `.${n}`, e)) && (!o || cu(L, o, e))
              );
            });
          return (
            C.call(O),
            () => {
              C.on(".drag", null);
            }
          );
        }
      }
    }, [e, t, n, o, a, s, r, i, x]),
    c
  );
}
function Pf() {
  const e = Le();
  return he((n) => {
    const {
        nodeInternals: o,
        nodeExtent: r,
        updateNodePositions: a,
        getNodes: i,
        snapToGrid: s,
        snapGrid: c,
        onError: u,
        nodesDraggable: l,
      } = e.getState(),
      d = i().filter(
        (x) => x.selected && (x.draggable || (l && typeof x.draggable > "u")),
      ),
      f = s ? c[0] : 5,
      g = s ? c[1] : 5,
      p = n.isShiftPressed ? 4 : 1,
      h = n.x * f * p,
      m = n.y * g * p,
      y = d.map((x) => {
        if (x.positionAbsolute) {
          const C = {
            x: x.positionAbsolute.x + h,
            y: x.positionAbsolute.y + m,
          };
          s &&
            ((C.x = c[0] * Math.round(C.x / c[0])),
            (C.y = c[1] * Math.round(C.y / c[1])));
          const { positionAbsolute: S, position: w } = If(
            x,
            C,
            o,
            r,
            void 0,
            u,
          );
          (x.position = w), (x.positionAbsolute = S);
        }
        return x;
      });
    a(y, !0, !1);
  }, []);
}
const On = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
var Qn = (e) => {
  const t = ({
    id: n,
    type: o,
    data: r,
    xPos: a,
    yPos: i,
    xPosOrigin: s,
    yPosOrigin: c,
    selected: u,
    onClick: l,
    onMouseEnter: d,
    onMouseMove: f,
    onMouseLeave: g,
    onContextMenu: p,
    onDoubleClick: h,
    style: m,
    className: y,
    isDraggable: x,
    isSelectable: C,
    isConnectable: S,
    isFocusable: w,
    selectNodesOnDrag: M,
    sourcePosition: O,
    targetPosition: _,
    hidden: L,
    resizeObserver: I,
    dragHandle: P,
    zIndex: $,
    isParent: B,
    noDragClassName: v,
    noPanClassName: k,
    initialized: E,
    disableKeyboardA11y: N,
    ariaLabel: z,
    rfId: T,
    hasHandleBounds: A,
  }) => {
    const D = Le(),
      H = ae(null),
      W = ae(null),
      V = ae(O),
      Y = ae(_),
      Z = ae(o),
      X = C || x || l || d || f || g,
      Q = Pf(),
      te = Gn(n, D.getState, d),
      q = Gn(n, D.getState, f),
      fe = Gn(n, D.getState, g),
      K = Gn(n, D.getState, p),
      ye = Gn(n, D.getState, h),
      Pe = (we) => {
        const { nodeDragThreshold: oe } = D.getState();
        if (
          (C &&
            (!M || !x || oe > 0) &&
            Zi({
              id: n,
              store: D,
              nodeRef: H,
            }),
          l)
        ) {
          const Re = D.getState().nodeInternals.get(n);
          Re && l(we, { ...Re });
        }
      },
      Se = (we) => {
        if (!Wi(we) && !N)
          if (sf.includes(we.key) && C) {
            const oe = we.key === "Escape";
            Zi({
              id: n,
              store: D,
              unselect: oe,
              nodeRef: H,
            });
          } else
            x &&
              u &&
              Object.prototype.hasOwnProperty.call(On, we.key) &&
              (D.setState({
                ariaLiveMessage: `Moved selected node ${we.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~a}, y: ${~~i}`,
              }),
              Q({
                x: On[we.key].x,
                y: On[we.key].y,
                isShiftPressed: we.shiftKey,
              }));
      };
    ie(
      () => () => {
        W.current && (I == null || I.unobserve(W.current), (W.current = null));
      },
      [],
    ),
      ie(() => {
        if (H.current && !L) {
          const we = H.current;
          (!E || !A || W.current !== we) &&
            (W.current && (I == null || I.unobserve(W.current)),
            I == null || I.observe(we),
            (W.current = we));
        }
      }, [L, E, A]),
      ie(() => {
        const we = Z.current !== o,
          oe = V.current !== O,
          Re = Y.current !== _;
        H.current &&
          (we || oe || Re) &&
          (we && (Z.current = o),
          oe && (V.current = O),
          Re && (Y.current = _),
          D.getState().updateNodeDimensions([
            { id: n, nodeElement: H.current, forceUpdate: !0 },
          ]));
      }, [n, o, O, _]);
    const je = Lf({
      nodeRef: H,
      disabled: L || !x,
      noDragClassName: v,
      handleSelector: P,
      nodeId: n,
      isSelectable: C,
      selectNodesOnDrag: M,
    });
    return L
      ? null
      : j.createElement(
          "div",
          {
            className: $e([
              "react-flow__node",
              `react-flow__node-${o}`,
              {
                // this is overwritable by passing `nopan` as a class name
                [k]: x,
              },
              y,
              {
                selected: u,
                selectable: C,
                parent: B,
                dragging: je,
              },
            ]),
            ref: H,
            style: {
              zIndex: $,
              transform: `translate(${s}px,${c}px)`,
              pointerEvents: X ? "all" : "none",
              visibility: E ? "visible" : "hidden",
              ...m,
            },
            "data-id": n,
            "data-testid": `rf__node-${n}`,
            onMouseEnter: te,
            onMouseMove: q,
            onMouseLeave: fe,
            onContextMenu: K,
            onClick: Pe,
            onDoubleClick: ye,
            onKeyDown: w ? Se : void 0,
            tabIndex: w ? 0 : void 0,
            role: w ? "button" : void 0,
            "aria-describedby": N ? void 0 : `${Mf}-${T}`,
            "aria-label": z,
          },
          j.createElement(
            g6,
            { value: n },
            j.createElement(e, {
              id: n,
              data: r,
              type: o,
              xPos: a,
              yPos: i,
              selected: u,
              isConnectable: S,
              sourcePosition: O,
              targetPosition: _,
              dragging: je,
              dragHandle: P,
              zIndex: $,
            }),
          ),
        );
  };
  return (t.displayName = "NodeWrapper"), Me(t);
};
const n7 = (e) => {
  const t = e.getNodes().filter((n) => n.selected);
  return {
    ...Is(t, e.nodeOrigin),
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`,
    userSelectionActive: e.userSelectionActive,
  };
};
function o7({
  onSelectionContextMenu: e,
  noPanClassName: t,
  disableKeyboardA11y: n,
}) {
  const o = Le(),
    {
      width: r,
      height: a,
      x: i,
      y: s,
      transformString: c,
      userSelectionActive: u,
    } = Ee(n7, He),
    l = Pf(),
    d = ae(null);
  if (
    (ie(() => {
      var p;
      n ||
        (p = d.current) == null ||
        p.focus({
          preventScroll: !0,
        });
    }, [n]),
    Lf({
      nodeRef: d,
    }),
    u || !r || !a)
  )
    return null;
  const f = e
      ? (p) => {
          const h = o
            .getState()
            .getNodes()
            .filter((m) => m.selected);
          e(p, h);
        }
      : void 0,
    g = (p) => {
      Object.prototype.hasOwnProperty.call(On, p.key) &&
        l({
          x: On[p.key].x,
          y: On[p.key].y,
          isShiftPressed: p.shiftKey,
        });
    };
  return j.createElement(
    "div",
    {
      className: $e(["react-flow__nodesselection", "react-flow__container", t]),
      style: {
        transform: c,
      },
    },
    j.createElement("div", {
      ref: d,
      className: "react-flow__nodesselection-rect",
      onContextMenu: f,
      tabIndex: n ? void 0 : -1,
      onKeyDown: n ? void 0 : g,
      style: {
        width: r,
        height: a,
        top: s,
        left: i,
      },
    }),
  );
}
var r7 = Me(o7);
const a7 = (e) => e.nodesSelectionActive,
  Hf = ({
    children: e,
    onPaneClick: t,
    onPaneMouseEnter: n,
    onPaneMouseMove: o,
    onPaneMouseLeave: r,
    onPaneContextMenu: a,
    onPaneScroll: i,
    deleteKeyCode: s,
    onMove: c,
    onMoveStart: u,
    onMoveEnd: l,
    selectionKeyCode: d,
    selectionOnDrag: f,
    selectionMode: g,
    onSelectionStart: p,
    onSelectionEnd: h,
    multiSelectionKeyCode: m,
    panActivationKeyCode: y,
    zoomActivationKeyCode: x,
    elementsSelectable: C,
    zoomOnScroll: S,
    zoomOnPinch: w,
    panOnScroll: M,
    panOnScrollSpeed: O,
    panOnScrollMode: _,
    zoomOnDoubleClick: L,
    panOnDrag: I,
    defaultViewport: P,
    translateExtent: $,
    minZoom: B,
    maxZoom: v,
    preventScrolling: k,
    onSelectionContextMenu: E,
    noWheelClassName: N,
    noPanClassName: z,
    disableKeyboardA11y: T,
  }) => {
    const A = Ee(a7),
      D = yo(d),
      H = yo(y),
      W = H || I,
      V = H || M,
      Y = D || (f && W !== !0);
    return (
      W6({ deleteKeyCode: s, multiSelectionKeyCode: m }),
      j.createElement(
        Y6,
        {
          onMove: c,
          onMoveStart: u,
          onMoveEnd: l,
          onPaneContextMenu: a,
          elementsSelectable: C,
          zoomOnScroll: S,
          zoomOnPinch: w,
          panOnScroll: V,
          panOnScrollSpeed: O,
          panOnScrollMode: _,
          zoomOnDoubleClick: L,
          panOnDrag: !D && W,
          defaultViewport: P,
          translateExtent: $,
          minZoom: B,
          maxZoom: v,
          zoomActivationKeyCode: x,
          preventScrolling: k,
          noWheelClassName: N,
          noPanClassName: z,
        },
        j.createElement(
          Rf,
          {
            onSelectionStart: p,
            onSelectionEnd: h,
            onPaneClick: t,
            onPaneMouseEnter: n,
            onPaneMouseMove: o,
            onPaneMouseLeave: r,
            onPaneContextMenu: a,
            onPaneScroll: i,
            panOnDrag: W,
            isSelecting: !!Y,
            selectionMode: g,
          },
          e,
          A &&
            j.createElement(r7, {
              onSelectionContextMenu: E,
              noPanClassName: z,
              disableKeyboardA11y: T,
            }),
        ),
      )
    );
  };
Hf.displayName = "FlowRenderer";
var i7 = Me(Hf);
function s7(e) {
  return Ee(
    he(
      (n) =>
        e
          ? hf(
              n.nodeInternals,
              { x: 0, y: 0, width: n.width, height: n.height },
              n.transform,
              !0,
            )
          : n.getNodes(),
      [e],
    ),
  );
}
function l7(e) {
  const t = {
      input: Qn(e.input || Ef),
      default: Qn(e.default || Yi),
      output: Qn(e.output || kf),
      group: Qn(e.group || Ps),
    },
    n = {},
    o = Object.keys(e)
      .filter((r) => !["input", "default", "output", "group"].includes(r))
      .reduce((r, a) => ((r[a] = Qn(e[a] || Yi)), r), n);
  return {
    ...t,
    ...o,
  };
}
const c7 = ({ x: e, y: t, width: n, height: o, origin: r }) =>
    !n || !o
      ? { x: e, y: t }
      : r[0] < 0 || r[1] < 0 || r[0] > 1 || r[1] > 1
        ? { x: e, y: t }
        : {
            x: e - n * r[0],
            y: t - o * r[1],
          },
  u7 = (e) => ({
    nodesDraggable: e.nodesDraggable,
    nodesConnectable: e.nodesConnectable,
    nodesFocusable: e.nodesFocusable,
    elementsSelectable: e.elementsSelectable,
    updateNodeDimensions: e.updateNodeDimensions,
    onError: e.onError,
  }),
  jf = (e) => {
    const {
        nodesDraggable: t,
        nodesConnectable: n,
        nodesFocusable: o,
        elementsSelectable: r,
        updateNodeDimensions: a,
        onError: i,
      } = Ee(u7, He),
      s = s7(e.onlyRenderVisibleElements),
      c = ae(),
      u = Oe(() => {
        if (typeof ResizeObserver > "u") return null;
        const l = new ResizeObserver((d) => {
          const f = d.map((g) => ({
            id: g.target.getAttribute("data-id"),
            nodeElement: g.target,
            forceUpdate: !0,
          }));
          a(f);
        });
        return (c.current = l), l;
      }, []);
    return (
      ie(
        () => () => {
          var l;
          (l = c == null ? void 0 : c.current) == null || l.disconnect();
        },
        [],
      ),
      j.createElement(
        "div",
        { className: "react-flow__nodes", style: Hs },
        s.map((l) => {
          var w, M, O;
          let d = l.type || "default";
          e.nodeTypes[d] ||
            (i == null || i("003", gt.error003(d)), (d = "default"));
          const f = e.nodeTypes[d] || e.nodeTypes.default,
            g = !!(l.draggable || (t && typeof l.draggable > "u")),
            p = !!(l.selectable || (r && typeof l.selectable > "u")),
            h = !!(l.connectable || (n && typeof l.connectable > "u")),
            m = !!(l.focusable || (o && typeof l.focusable > "u")),
            y = e.nodeExtent
              ? Ts(l.positionAbsolute, e.nodeExtent)
              : l.positionAbsolute,
            x = (y == null ? void 0 : y.x) ?? 0,
            C = (y == null ? void 0 : y.y) ?? 0,
            S = c7({
              x,
              y: C,
              width: l.width ?? 0,
              height: l.height ?? 0,
              origin: e.nodeOrigin,
            });
          return j.createElement(f, {
            key: l.id,
            id: l.id,
            className: l.className,
            style: l.style,
            type: d,
            data: l.data,
            sourcePosition: l.sourcePosition || ne.Bottom,
            targetPosition: l.targetPosition || ne.Top,
            hidden: l.hidden,
            xPos: x,
            yPos: C,
            xPosOrigin: S.x,
            yPosOrigin: S.y,
            selectNodesOnDrag: e.selectNodesOnDrag,
            onClick: e.onNodeClick,
            onMouseEnter: e.onNodeMouseEnter,
            onMouseMove: e.onNodeMouseMove,
            onMouseLeave: e.onNodeMouseLeave,
            onContextMenu: e.onNodeContextMenu,
            onDoubleClick: e.onNodeDoubleClick,
            selected: !!l.selected,
            isDraggable: g,
            isSelectable: p,
            isConnectable: h,
            isFocusable: m,
            resizeObserver: u,
            dragHandle: l.dragHandle,
            zIndex: ((w = l[Ae]) == null ? void 0 : w.z) ?? 0,
            isParent: !!((M = l[Ae]) != null && M.isParent),
            noDragClassName: e.noDragClassName,
            noPanClassName: e.noPanClassName,
            initialized: !!l.width && !!l.height,
            rfId: e.rfId,
            disableKeyboardA11y: e.disableKeyboardA11y,
            ariaLabel: l.ariaLabel,
            hasHandleBounds: !!((O = l[Ae]) != null && O.handleBounds),
          });
        }),
      )
    );
  };
jf.displayName = "NodeRenderer";
var d7 = Me(jf);
const f7 = (e, t, n) => (n === ne.Left ? e - t : n === ne.Right ? e + t : e),
  g7 = (e, t, n) => (n === ne.Top ? e - t : n === ne.Bottom ? e + t : e),
  du = "react-flow__edgeupdater",
  fu = ({
    position: e,
    centerX: t,
    centerY: n,
    radius: o = 10,
    onMouseDown: r,
    onMouseEnter: a,
    onMouseOut: i,
    type: s,
  }) =>
    j.createElement("circle", {
      onMouseDown: r,
      onMouseEnter: a,
      onMouseOut: i,
      className: $e([du, `${du}-${s}`]),
      cx: f7(t, o, e),
      cy: g7(n, o, e),
      r: o,
      stroke: "transparent",
      fill: "transparent",
    }),
  p7 = () => !0;
var Cn = (e) => {
  const t = ({
    id: n,
    className: o,
    type: r,
    data: a,
    onClick: i,
    onEdgeDoubleClick: s,
    selected: c,
    animated: u,
    label: l,
    labelStyle: d,
    labelShowBg: f,
    labelBgStyle: g,
    labelBgPadding: p,
    labelBgBorderRadius: h,
    style: m,
    source: y,
    target: x,
    sourceX: C,
    sourceY: S,
    targetX: w,
    targetY: M,
    sourcePosition: O,
    targetPosition: _,
    elementsSelectable: L,
    hidden: I,
    sourceHandleId: P,
    targetHandleId: $,
    onContextMenu: B,
    onMouseEnter: v,
    onMouseMove: k,
    onMouseLeave: E,
    edgeUpdaterRadius: N,
    onEdgeUpdate: z,
    onEdgeUpdateStart: T,
    onEdgeUpdateEnd: A,
    markerEnd: D,
    markerStart: H,
    rfId: W,
    ariaLabel: V,
    isFocusable: Y,
    isUpdatable: Z,
    pathOptions: X,
    interactionWidth: Q,
    disableKeyboardA11y: te,
  }) => {
    const q = ae(null),
      [fe, K] = de(!1),
      [ye, Pe] = de(!1),
      Se = Le(),
      je = Oe(() => `url('#${qi(H, W)}')`, [H, W]),
      we = Oe(() => `url('#${qi(D, W)}')`, [D, W]);
    if (I) return null;
    const oe = (De) => {
        var Je;
        const {
            edges: Ke,
            addSelectedEdges: Ot,
            unselectNodesAndEdges: Nt,
            multiSelectionActive: Dt,
          } = Se.getState(),
          it = Ke.find((en) => en.id === n);
        it &&
          (L &&
            (Se.setState({ nodesSelectionActive: !1 }),
            it.selected && Dt
              ? (Nt({ nodes: [], edges: [it] }),
                (Je = q.current) == null || Je.blur())
              : Ot([n])),
          i && i(De, it));
      },
      Re = Xn(n, Se.getState, s),
      At = Xn(n, Se.getState, B),
      Jt = Xn(n, Se.getState, v),
      mt = Xn(n, Se.getState, k),
      jt = Xn(n, Se.getState, E),
      at = (De, Ke) => {
        if (De.button !== 0) return;
        const { edges: Ot, isValidConnection: Nt } = Se.getState(),
          Dt = Ke ? x : y,
          it = (Ke ? $ : P) || null,
          Je = Ke ? "target" : "source",
          en = Nt || p7,
          tn = Ke,
          $t = Ot.find((st) => st.id === n);
        Pe(!0), T == null || T(De, $t, Je);
        const yt = (st) => {
          Pe(!1), A == null || A(st, $t, Je);
        };
        wf({
          event: De,
          handleId: it,
          nodeId: Dt,
          onConnect: (st) => (z == null ? void 0 : z($t, st)),
          isTarget: tn,
          getState: Se.getState,
          setState: Se.setState,
          isValidConnection: en,
          edgeUpdaterType: Je,
          onEdgeUpdateEnd: yt,
        });
      },
      Mt = (De) => at(De, !0),
      bt = (De) => at(De, !1),
      Ze = () => K(!0),
      Ft = () => K(!1),
      Tt = !L && !i,
      Bt = (De) => {
        var Ke;
        if (!te && sf.includes(De.key) && L) {
          const {
            unselectNodesAndEdges: Ot,
            addSelectedEdges: Nt,
            edges: Dt,
          } = Se.getState();
          De.key === "Escape"
            ? ((Ke = q.current) == null || Ke.blur(),
              Ot({ edges: [Dt.find((Je) => Je.id === n)] }))
            : Nt([n]);
        }
      };
    return j.createElement(
      "g",
      {
        className: $e([
          "react-flow__edge",
          `react-flow__edge-${r}`,
          o,
          { selected: c, animated: u, inactive: Tt, updating: fe },
        ]),
        onClick: oe,
        onDoubleClick: Re,
        onContextMenu: At,
        onMouseEnter: Jt,
        onMouseMove: mt,
        onMouseLeave: jt,
        onKeyDown: Y ? Bt : void 0,
        tabIndex: Y ? 0 : void 0,
        role: Y ? "button" : "img",
        "data-testid": `rf__edge-${n}`,
        "aria-label": V === null ? void 0 : V || `Edge from ${y} to ${x}`,
        "aria-describedby": Y ? `${Tf}-${W}` : void 0,
        ref: q,
      },
      !ye &&
        j.createElement(e, {
          id: n,
          source: y,
          target: x,
          selected: c,
          animated: u,
          label: l,
          labelStyle: d,
          labelShowBg: f,
          labelBgStyle: g,
          labelBgPadding: p,
          labelBgBorderRadius: h,
          data: a,
          style: m,
          sourceX: C,
          sourceY: S,
          targetX: w,
          targetY: M,
          sourcePosition: O,
          targetPosition: _,
          sourceHandleId: P,
          targetHandleId: $,
          markerStart: je,
          markerEnd: we,
          pathOptions: X,
          interactionWidth: Q,
        }),
      Z &&
        j.createElement(
          j.Fragment,
          null,
          (Z === "source" || Z === !0) &&
            j.createElement(fu, {
              position: O,
              centerX: C,
              centerY: S,
              radius: N,
              onMouseDown: Mt,
              onMouseEnter: Ze,
              onMouseOut: Ft,
              type: "source",
            }),
          (Z === "target" || Z === !0) &&
            j.createElement(fu, {
              position: _,
              centerX: w,
              centerY: M,
              radius: N,
              onMouseDown: bt,
              onMouseEnter: Ze,
              onMouseOut: Ft,
              type: "target",
            }),
        ),
    );
  };
  return (t.displayName = "EdgeWrapper"), Me(t);
};
function h7(e) {
  const t = {
      default: Cn(e.default || Tr),
      straight: Cn(e.bezier || Rs),
      step: Cn(e.step || Ds),
      smoothstep: Cn(e.step || qr),
      simplebezier: Cn(e.simplebezier || Ns),
    },
    n = {},
    o = Object.keys(e)
      .filter((r) => !["default", "bezier"].includes(r))
      .reduce((r, a) => ((r[a] = Cn(e[a] || Tr)), r), n);
  return {
    ...t,
    ...o,
  };
}
function gu(e, t, n = null) {
  const o = ((n == null ? void 0 : n.x) || 0) + t.x,
    r = ((n == null ? void 0 : n.y) || 0) + t.y,
    a = (n == null ? void 0 : n.width) || t.width,
    i = (n == null ? void 0 : n.height) || t.height;
  switch (e) {
    case ne.Top:
      return {
        x: o + a / 2,
        y: r,
      };
    case ne.Right:
      return {
        x: o + a,
        y: r + i / 2,
      };
    case ne.Bottom:
      return {
        x: o + a / 2,
        y: r + i,
      };
    case ne.Left:
      return {
        x: o,
        y: r + i / 2,
      };
  }
}
function pu(e, t) {
  return e
    ? e.length === 1 || !t
      ? e[0]
      : (t && e.find((n) => n.id === t)) || null
    : null;
}
const m7 = (e, t, n, o, r, a) => {
  const i = gu(n, e, t),
    s = gu(a, o, r);
  return {
    sourceX: i.x,
    sourceY: i.y,
    targetX: s.x,
    targetY: s.y,
  };
};
function b7({
  sourcePos: e,
  targetPos: t,
  sourceWidth: n,
  sourceHeight: o,
  targetWidth: r,
  targetHeight: a,
  width: i,
  height: s,
  transform: c,
}) {
  const u = {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x + n, t.x + r),
    y2: Math.max(e.y + o, t.y + a),
  };
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const l = Os({
      x: (0 - c[0]) / c[2],
      y: (0 - c[1]) / c[2],
      width: i / c[2],
      height: s / c[2],
    }),
    d = Math.max(0, Math.min(l.x2, u.x2) - Math.max(l.x, u.x)),
    f = Math.max(0, Math.min(l.y2, u.y2) - Math.max(l.y, u.y));
  return Math.ceil(d * f) > 0;
}
function hu(e) {
  var o, r, a, i, s;
  const t =
      ((o = e == null ? void 0 : e[Ae]) == null ? void 0 : o.handleBounds) ||
      null,
    n =
      t &&
      (e == null ? void 0 : e.width) &&
      (e == null ? void 0 : e.height) &&
      typeof ((r = e == null ? void 0 : e.positionAbsolute) == null
        ? void 0
        : r.x) < "u" &&
      typeof ((a = e == null ? void 0 : e.positionAbsolute) == null
        ? void 0
        : a.y) < "u";
  return [
    {
      x:
        ((i = e == null ? void 0 : e.positionAbsolute) == null
          ? void 0
          : i.x) || 0,
      y:
        ((s = e == null ? void 0 : e.positionAbsolute) == null
          ? void 0
          : s.y) || 0,
      width: (e == null ? void 0 : e.width) || 0,
      height: (e == null ? void 0 : e.height) || 0,
    },
    t,
    !!n,
  ];
}
const y7 = [{ level: 0, isMaxLevel: !0, edges: [] }];
function v7(e, t, n = !1) {
  let o = -1;
  const r = e.reduce((i, s) => {
      var l, d;
      const c = nt(s.zIndex);
      let u = c ? s.zIndex : 0;
      if (n) {
        const f = t.get(s.target),
          g = t.get(s.source),
          p =
            s.selected ||
            (f == null ? void 0 : f.selected) ||
            (g == null ? void 0 : g.selected),
          h = Math.max(
            ((l = g == null ? void 0 : g[Ae]) == null ? void 0 : l.z) || 0,
            ((d = f == null ? void 0 : f[Ae]) == null ? void 0 : d.z) || 0,
            1e3,
          );
        u = (c ? s.zIndex : 0) + (p ? h : 0);
      }
      return i[u] ? i[u].push(s) : (i[u] = [s]), (o = u > o ? u : o), i;
    }, {}),
    a = Object.entries(r).map(([i, s]) => {
      const c = +i;
      return {
        edges: s,
        level: c,
        isMaxLevel: c === o,
      };
    });
  return a.length === 0 ? y7 : a;
}
function w7(e, t, n) {
  const o = Ee(
    he(
      (r) =>
        e
          ? r.edges.filter((a) => {
              const i = t.get(a.source),
                s = t.get(a.target);
              return (
                (i == null ? void 0 : i.width) &&
                (i == null ? void 0 : i.height) &&
                (s == null ? void 0 : s.width) &&
                (s == null ? void 0 : s.height) &&
                b7({
                  sourcePos: i.positionAbsolute || { x: 0, y: 0 },
                  targetPos: s.positionAbsolute || { x: 0, y: 0 },
                  sourceWidth: i.width,
                  sourceHeight: i.height,
                  targetWidth: s.width,
                  targetHeight: s.height,
                  width: r.width,
                  height: r.height,
                  transform: r.transform,
                })
              );
            })
          : r.edges,
      [e, t],
    ),
  );
  return v7(o, t, n);
}
const x7 = ({ color: e = "none", strokeWidth: t = 1 }) =>
    j.createElement("polyline", {
      style: {
        stroke: e,
        strokeWidth: t,
      },
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      points: "-5,-4 0,0 -5,4",
    }),
  S7 = ({ color: e = "none", strokeWidth: t = 1 }) =>
    j.createElement("polyline", {
      style: {
        stroke: e,
        fill: e,
        strokeWidth: t,
      },
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4 -5,-4",
    }),
  mu = {
    [Mr.Arrow]: x7,
    [Mr.ArrowClosed]: S7,
  };
function C7(e) {
  const t = Le();
  return Oe(() => {
    var r, a;
    return Object.prototype.hasOwnProperty.call(mu, e)
      ? mu[e]
      : ((a = (r = t.getState()).onError) == null ||
          a.call(r, "009", gt.error009(e)),
        null);
  }, [e]);
}
const E7 = ({
    id: e,
    type: t,
    color: n,
    width: o = 12.5,
    height: r = 12.5,
    markerUnits: a = "strokeWidth",
    strokeWidth: i,
    orient: s = "auto-start-reverse",
  }) => {
    const c = C7(t);
    return c
      ? j.createElement(
          "marker",
          {
            className: "react-flow__arrowhead",
            id: e,
            markerWidth: `${o}`,
            markerHeight: `${r}`,
            viewBox: "-10 -10 20 20",
            markerUnits: a,
            orient: s,
            refX: "0",
            refY: "0",
          },
          j.createElement(c, { color: n, strokeWidth: i }),
        )
      : null;
  },
  _7 =
    ({ defaultColor: e, rfId: t }) =>
    (n) => {
      const o = [];
      return n.edges
        .reduce(
          (r, a) => (
            [a.markerStart, a.markerEnd].forEach((i) => {
              if (i && typeof i == "object") {
                const s = qi(i, t);
                o.includes(s) ||
                  (r.push({ id: s, color: i.color || e, ...i }), o.push(s));
              }
            }),
            r
          ),
          [],
        )
        .sort((r, a) => r.id.localeCompare(a.id));
    },
  Ff = ({ defaultColor: e, rfId: t }) => {
    const n = Ee(
      he(_7({ defaultColor: e, rfId: t }), [e, t]),
      // the id includes all marker options, so we just need to look at that part of the marker
      (o, r) => !(o.length !== r.length || o.some((a, i) => a.id !== r[i].id)),
    );
    return j.createElement(
      "defs",
      null,
      n.map((o) =>
        j.createElement(E7, {
          id: o.id,
          key: o.id,
          type: o.type,
          color: o.color,
          width: o.width,
          height: o.height,
          markerUnits: o.markerUnits,
          strokeWidth: o.strokeWidth,
          orient: o.orient,
        }),
      ),
    );
  };
Ff.displayName = "MarkerDefinitions";
var k7 = Me(Ff);
const A7 = (e) => ({
    nodesConnectable: e.nodesConnectable,
    edgesFocusable: e.edgesFocusable,
    edgesUpdatable: e.edgesUpdatable,
    elementsSelectable: e.elementsSelectable,
    width: e.width,
    height: e.height,
    connectionMode: e.connectionMode,
    nodeInternals: e.nodeInternals,
    onError: e.onError,
  }),
  Bf = ({
    defaultMarkerColor: e,
    onlyRenderVisibleElements: t,
    elevateEdgesOnSelect: n,
    rfId: o,
    edgeTypes: r,
    noPanClassName: a,
    onEdgeUpdate: i,
    onEdgeContextMenu: s,
    onEdgeMouseEnter: c,
    onEdgeMouseMove: u,
    onEdgeMouseLeave: l,
    onEdgeClick: d,
    edgeUpdaterRadius: f,
    onEdgeDoubleClick: g,
    onEdgeUpdateStart: p,
    onEdgeUpdateEnd: h,
    children: m,
    disableKeyboardA11y: y,
  }) => {
    const {
        edgesFocusable: x,
        edgesUpdatable: C,
        elementsSelectable: S,
        width: w,
        height: M,
        connectionMode: O,
        nodeInternals: _,
        onError: L,
      } = Ee(A7, He),
      I = w7(t, _, n);
    return w
      ? j.createElement(
          j.Fragment,
          null,
          I.map(({ level: P, edges: $, isMaxLevel: B }) =>
            j.createElement(
              "svg",
              {
                key: P,
                style: { zIndex: P },
                width: w,
                height: M,
                className: "react-flow__edges react-flow__container",
              },
              B && j.createElement(k7, { defaultColor: e, rfId: o }),
              j.createElement(
                "g",
                null,
                $.map((v) => {
                  const [k, E, N] = hu(_.get(v.source)),
                    [z, T, A] = hu(_.get(v.target));
                  if (!N || !A) return null;
                  let D = v.type || "default";
                  r[D] ||
                    (L == null || L("011", gt.error011(D)), (D = "default"));
                  const H = r[D] || r.default,
                    W =
                      O === gn.Strict
                        ? T.target
                        : (T.target ?? []).concat(T.source ?? []),
                    V = pu(E.source, v.sourceHandle),
                    Y = pu(W, v.targetHandle),
                    Z = (V == null ? void 0 : V.position) || ne.Bottom,
                    X = (Y == null ? void 0 : Y.position) || ne.Top,
                    Q = !!(v.focusable || (x && typeof v.focusable > "u")),
                    te =
                      typeof i < "u" &&
                      (v.updatable || (C && typeof v.updatable > "u"));
                  if (!V || !Y)
                    return L == null || L("008", gt.error008(V, v)), null;
                  const {
                    sourceX: q,
                    sourceY: fe,
                    targetX: K,
                    targetY: ye,
                  } = m7(k, V, Z, z, Y, X);
                  return j.createElement(H, {
                    key: v.id,
                    id: v.id,
                    className: $e([v.className, a]),
                    type: D,
                    data: v.data,
                    selected: !!v.selected,
                    animated: !!v.animated,
                    hidden: !!v.hidden,
                    label: v.label,
                    labelStyle: v.labelStyle,
                    labelShowBg: v.labelShowBg,
                    labelBgStyle: v.labelBgStyle,
                    labelBgPadding: v.labelBgPadding,
                    labelBgBorderRadius: v.labelBgBorderRadius,
                    style: v.style,
                    source: v.source,
                    target: v.target,
                    sourceHandleId: v.sourceHandle,
                    targetHandleId: v.targetHandle,
                    markerEnd: v.markerEnd,
                    markerStart: v.markerStart,
                    sourceX: q,
                    sourceY: fe,
                    targetX: K,
                    targetY: ye,
                    sourcePosition: Z,
                    targetPosition: X,
                    elementsSelectable: S,
                    onEdgeUpdate: i,
                    onContextMenu: s,
                    onMouseEnter: c,
                    onMouseMove: u,
                    onMouseLeave: l,
                    onClick: d,
                    edgeUpdaterRadius: f,
                    onEdgeDoubleClick: g,
                    onEdgeUpdateStart: p,
                    onEdgeUpdateEnd: h,
                    rfId: o,
                    ariaLabel: v.ariaLabel,
                    isFocusable: Q,
                    isUpdatable: te,
                    pathOptions: "pathOptions" in v ? v.pathOptions : void 0,
                    interactionWidth: v.interactionWidth,
                    disableKeyboardA11y: y,
                  });
                }),
              ),
            ),
          ),
          m,
        )
      : null;
  };
Bf.displayName = "EdgeRenderer";
var M7 = Me(Bf);
const T7 = (e) =>
  `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function O7({ children: e }) {
  const t = Ee(T7);
  return j.createElement(
    "div",
    {
      className: "react-flow__viewport react-flow__container",
      style: { transform: t },
    },
    e,
  );
}
function N7(e) {
  const t = Et(),
    n = ae(!1);
  ie(() => {
    !n.current &&
      t.viewportInitialized &&
      e &&
      (setTimeout(() => e(t), 1), (n.current = !0));
  }, [e, t.viewportInitialized]);
}
const D7 = {
    [ne.Left]: ne.Right,
    [ne.Right]: ne.Left,
    [ne.Top]: ne.Bottom,
    [ne.Bottom]: ne.Top,
  },
  $f = ({
    nodeId: e,
    handleType: t,
    style: n,
    type: o = Zt.Bezier,
    CustomComponent: r,
    connectionStatus: a,
  }) => {
    var M, O, _;
    const {
        fromNode: i,
        handleId: s,
        toX: c,
        toY: u,
        connectionMode: l,
      } = Ee(
        he(
          (L) => ({
            fromNode: L.nodeInternals.get(e),
            handleId: L.connectionHandleId,
            toX: (L.connectionPosition.x - L.transform[0]) / L.transform[2],
            toY: (L.connectionPosition.y - L.transform[1]) / L.transform[2],
            connectionMode: L.connectionMode,
          }),
          [e],
        ),
        He,
      ),
      d = (M = i == null ? void 0 : i[Ae]) == null ? void 0 : M.handleBounds;
    let f = d == null ? void 0 : d[t];
    if (
      (l === gn.Loose &&
        (f =
          f || (d == null ? void 0 : d[t === "source" ? "target" : "source"])),
      !i || !f)
    )
      return null;
    const g = s ? f.find((L) => L.id === s) : f[0],
      p = g ? g.x + g.width / 2 : (i.width ?? 0) / 2,
      h = g ? g.y + g.height / 2 : i.height ?? 0,
      m = (((O = i.positionAbsolute) == null ? void 0 : O.x) ?? 0) + p,
      y = (((_ = i.positionAbsolute) == null ? void 0 : _.y) ?? 0) + h,
      x = g == null ? void 0 : g.position,
      C = x ? D7[x] : null;
    if (!x || !C) return null;
    if (r)
      return j.createElement(r, {
        connectionLineType: o,
        connectionLineStyle: n,
        fromNode: i,
        fromHandle: g,
        fromX: m,
        fromY: y,
        toX: c,
        toY: u,
        fromPosition: x,
        toPosition: C,
        connectionStatus: a,
      });
    let S = "";
    const w = {
      sourceX: m,
      sourceY: y,
      sourcePosition: x,
      targetX: c,
      targetY: u,
      targetPosition: C,
    };
    return (
      o === Zt.Bezier
        ? ([S] = gf(w))
        : o === Zt.Step
          ? ([S] = Vi({
              ...w,
              borderRadius: 0,
            }))
          : o === Zt.SmoothStep
            ? ([S] = Vi(w))
            : o === Zt.SimpleBezier
              ? ([S] = ff(w))
              : (S = `M${m},${y} ${c},${u}`),
      j.createElement("path", {
        d: S,
        fill: "none",
        className: "react-flow__connection-path",
        style: n,
      })
    );
  };
$f.displayName = "ConnectionLine";
const R7 = (e) => ({
  nodeId: e.connectionNodeId,
  handleType: e.connectionHandleType,
  nodesConnectable: e.nodesConnectable,
  connectionStatus: e.connectionStatus,
  width: e.width,
  height: e.height,
});
function z7({ containerStyle: e, style: t, type: n, component: o }) {
  const {
    nodeId: r,
    handleType: a,
    nodesConnectable: i,
    width: s,
    height: c,
    connectionStatus: u,
  } = Ee(R7, He);
  return !(r && a && s && i)
    ? null
    : j.createElement(
        "svg",
        {
          style: e,
          width: s,
          height: c,
          className:
            "react-flow__edges react-flow__connectionline react-flow__container",
        },
        j.createElement(
          "g",
          { className: $e(["react-flow__connection", u]) },
          j.createElement($f, {
            nodeId: r,
            handleType: a,
            style: t,
            type: n,
            CustomComponent: o,
            connectionStatus: u,
          }),
        ),
      );
}
function bu(e, t) {
  const n = ae(null),
    o = Le();
  return Oe(() => {
    var a, i;
    if (process.env.NODE_ENV === "development") {
      const s = Object.keys(e);
      He(n.current, s) &&
        ((i = (a = o.getState()).onError) == null ||
          i.call(a, "002", gt.error002())),
        (n.current = s);
    }
    return t(e);
  }, [e]);
}
const Wf = ({
  nodeTypes: e,
  edgeTypes: t,
  onMove: n,
  onMoveStart: o,
  onMoveEnd: r,
  onInit: a,
  onNodeClick: i,
  onEdgeClick: s,
  onNodeDoubleClick: c,
  onEdgeDoubleClick: u,
  onNodeMouseEnter: l,
  onNodeMouseMove: d,
  onNodeMouseLeave: f,
  onNodeContextMenu: g,
  onSelectionContextMenu: p,
  onSelectionStart: h,
  onSelectionEnd: m,
  connectionLineType: y,
  connectionLineStyle: x,
  connectionLineComponent: C,
  connectionLineContainerStyle: S,
  selectionKeyCode: w,
  selectionOnDrag: M,
  selectionMode: O,
  multiSelectionKeyCode: _,
  panActivationKeyCode: L,
  zoomActivationKeyCode: I,
  deleteKeyCode: P,
  onlyRenderVisibleElements: $,
  elementsSelectable: B,
  selectNodesOnDrag: v,
  defaultViewport: k,
  translateExtent: E,
  minZoom: N,
  maxZoom: z,
  preventScrolling: T,
  defaultMarkerColor: A,
  zoomOnScroll: D,
  zoomOnPinch: H,
  panOnScroll: W,
  panOnScrollSpeed: V,
  panOnScrollMode: Y,
  zoomOnDoubleClick: Z,
  panOnDrag: X,
  onPaneClick: Q,
  onPaneMouseEnter: te,
  onPaneMouseMove: q,
  onPaneMouseLeave: fe,
  onPaneScroll: K,
  onPaneContextMenu: ye,
  onEdgeUpdate: Pe,
  onEdgeContextMenu: Se,
  onEdgeMouseEnter: je,
  onEdgeMouseMove: we,
  onEdgeMouseLeave: oe,
  edgeUpdaterRadius: Re,
  onEdgeUpdateStart: At,
  onEdgeUpdateEnd: Jt,
  noDragClassName: mt,
  noWheelClassName: jt,
  noPanClassName: at,
  elevateEdgesOnSelect: Mt,
  disableKeyboardA11y: bt,
  nodeOrigin: Ze,
  nodeExtent: Ft,
  rfId: Tt,
}) => {
  const Bt = bu(e, l7),
    De = bu(t, h7);
  return (
    N7(a),
    j.createElement(
      i7,
      {
        onPaneClick: Q,
        onPaneMouseEnter: te,
        onPaneMouseMove: q,
        onPaneMouseLeave: fe,
        onPaneContextMenu: ye,
        onPaneScroll: K,
        deleteKeyCode: P,
        selectionKeyCode: w,
        selectionOnDrag: M,
        selectionMode: O,
        onSelectionStart: h,
        onSelectionEnd: m,
        multiSelectionKeyCode: _,
        panActivationKeyCode: L,
        zoomActivationKeyCode: I,
        elementsSelectable: B,
        onMove: n,
        onMoveStart: o,
        onMoveEnd: r,
        zoomOnScroll: D,
        zoomOnPinch: H,
        zoomOnDoubleClick: Z,
        panOnScroll: W,
        panOnScrollSpeed: V,
        panOnScrollMode: Y,
        panOnDrag: X,
        defaultViewport: k,
        translateExtent: E,
        minZoom: N,
        maxZoom: z,
        onSelectionContextMenu: p,
        preventScrolling: T,
        noDragClassName: mt,
        noWheelClassName: jt,
        noPanClassName: at,
        disableKeyboardA11y: bt,
      },
      j.createElement(
        O7,
        null,
        j.createElement(
          M7,
          {
            edgeTypes: De,
            onEdgeClick: s,
            onEdgeDoubleClick: u,
            onEdgeUpdate: Pe,
            onlyRenderVisibleElements: $,
            onEdgeContextMenu: Se,
            onEdgeMouseEnter: je,
            onEdgeMouseMove: we,
            onEdgeMouseLeave: oe,
            onEdgeUpdateStart: At,
            onEdgeUpdateEnd: Jt,
            edgeUpdaterRadius: Re,
            defaultMarkerColor: A,
            noPanClassName: at,
            elevateEdgesOnSelect: !!Mt,
            disableKeyboardA11y: bt,
            rfId: Tt,
          },
          j.createElement(z7, {
            style: x,
            type: y,
            component: C,
            containerStyle: S,
          }),
        ),
        j.createElement("div", { className: "react-flow__edgelabel-renderer" }),
        j.createElement(d7, {
          nodeTypes: Bt,
          onNodeClick: i,
          onNodeDoubleClick: c,
          onNodeMouseEnter: l,
          onNodeMouseMove: d,
          onNodeMouseLeave: f,
          onNodeContextMenu: g,
          selectNodesOnDrag: v,
          onlyRenderVisibleElements: $,
          noPanClassName: at,
          noDragClassName: mt,
          disableKeyboardA11y: bt,
          nodeOrigin: Ze,
          nodeExtent: Ft,
          rfId: Tt,
        }),
      ),
    )
  );
};
Wf.displayName = "GraphView";
var I7 = Me(Wf);
const Ki = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  Vt = {
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
    translateExtent: Ki,
    nodeExtent: Ki,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionNodeId: null,
    connectionHandleId: null,
    connectionHandleType: "source",
    connectionPosition: { x: 0, y: 0 },
    connectionStatus: null,
    connectionMode: gn.Strict,
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
    onError: lf,
    isValidConnection: void 0,
  },
  L7 = () =>
    xm(
      (e, t) => ({
        ...Vt,
        setNodes: (n) => {
          const {
            nodeInternals: o,
            nodeOrigin: r,
            elevateNodesOnSelect: a,
          } = t();
          e({ nodeInternals: hi(n, o, r, a) });
        },
        getNodes: () => Array.from(t().nodeInternals.values()),
        setEdges: (n) => {
          const { defaultEdgeOptions: o = {} } = t();
          e({ edges: n.map((r) => ({ ...o, ...r })) });
        },
        setDefaultNodesAndEdges: (n, o) => {
          const r = typeof n < "u",
            a = typeof o < "u",
            i = r
              ? hi(
                  n,
                  /* @__PURE__ */ new Map(),
                  t().nodeOrigin,
                  t().elevateNodesOnSelect,
                )
              : /* @__PURE__ */ new Map();
          e({
            nodeInternals: i,
            edges: a ? o : [],
            hasDefaultNodes: r,
            hasDefaultEdges: a,
          });
        },
        updateNodeDimensions: (n) => {
          const {
              onNodesChange: o,
              nodeInternals: r,
              fitViewOnInit: a,
              fitViewOnInitDone: i,
              fitViewOnInitOptions: s,
              domNode: c,
              nodeOrigin: u,
            } = t(),
            l = c == null ? void 0 : c.querySelector(".react-flow__viewport");
          if (!l) return;
          const d = window.getComputedStyle(l),
            { m22: f } = new window.DOMMatrixReadOnly(d.transform),
            g = n.reduce((h, m) => {
              const y = r.get(m.id);
              if (y != null && y.hidden)
                r.set(y.id, {
                  ...y,
                  [Ae]: {
                    ...y[Ae],
                    // we need to reset the handle bounds when the node is hidden
                    // in order to force a new observation when the node is shown again
                    handleBounds: void 0,
                  },
                });
              else if (y) {
                const x = Ms(m.nodeElement);
                !!(
                  x.width &&
                  x.height &&
                  (y.width !== x.width ||
                    y.height !== x.height ||
                    m.forceUpdate)
                ) &&
                  (r.set(y.id, {
                    ...y,
                    [Ae]: {
                      ...y[Ae],
                      handleBounds: {
                        source: uu(".source", m.nodeElement, f, u),
                        target: uu(".target", m.nodeElement, f, u),
                      },
                    },
                    ...x,
                  }),
                  h.push({
                    id: y.id,
                    type: "dimensions",
                    dimensions: x,
                  }));
              }
              return h;
            }, []);
          Nf(r, u);
          const p = i || (a && !i && Df(t, { initial: !0, ...s }));
          e({ nodeInternals: new Map(r), fitViewOnInitDone: p }),
            (g == null ? void 0 : g.length) > 0 && (o == null || o(g));
        },
        updateNodePositions: (n, o = !0, r = !1) => {
          const { triggerNodeChanges: a } = t(),
            i = n.map((s) => {
              const c = {
                id: s.id,
                type: "position",
                dragging: r,
              };
              return (
                o &&
                  ((c.positionAbsolute = s.positionAbsolute),
                  (c.position = s.position)),
                c
              );
            });
          a(i);
        },
        triggerNodeChanges: (n) => {
          const {
            onNodesChange: o,
            nodeInternals: r,
            hasDefaultNodes: a,
            nodeOrigin: i,
            getNodes: s,
            elevateNodesOnSelect: c,
          } = t();
          if (n != null && n.length) {
            if (a) {
              const u = G6(n, s()),
                l = hi(u, r, i, c);
              e({ nodeInternals: l });
            }
            o == null || o(n);
          }
        },
        addSelectedNodes: (n) => {
          const { multiSelectionActive: o, edges: r, getNodes: a } = t();
          let i,
            s = null;
          o
            ? (i = n.map((c) => Yt(c, !0)))
            : ((i = En(a(), n)), (s = En(r, []))),
            Go({
              changedNodes: i,
              changedEdges: s,
              get: t,
              set: e,
            });
        },
        addSelectedEdges: (n) => {
          const { multiSelectionActive: o, edges: r, getNodes: a } = t();
          let i,
            s = null;
          o
            ? (i = n.map((c) => Yt(c, !0)))
            : ((i = En(r, n)), (s = En(a(), []))),
            Go({
              changedNodes: s,
              changedEdges: i,
              get: t,
              set: e,
            });
        },
        unselectNodesAndEdges: ({ nodes: n, edges: o } = {}) => {
          const { edges: r, getNodes: a } = t(),
            i = n || a(),
            s = o || r,
            c = i.map((l) => ((l.selected = !1), Yt(l.id, !1))),
            u = s.map((l) => Yt(l.id, !1));
          Go({
            changedNodes: c,
            changedEdges: u,
            get: t,
            set: e,
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
          (o = t().d3Zoom) == null || o.translateExtent(n),
            e({ translateExtent: n });
        },
        resetSelectedElements: () => {
          const { edges: n, getNodes: o } = t(),
            a = o()
              .filter((s) => s.selected)
              .map((s) => Yt(s.id, !1)),
            i = n.filter((s) => s.selected).map((s) => Yt(s.id, !1));
          Go({
            changedNodes: a,
            changedEdges: i,
            get: t,
            set: e,
          });
        },
        setNodeExtent: (n) => {
          const { nodeInternals: o } = t();
          o.forEach((r) => {
            r.positionAbsolute = Ts(r.position, n);
          }),
            e({
              nodeExtent: n,
              nodeInternals: new Map(o),
            });
        },
        panBy: (n) => {
          const {
            transform: o,
            width: r,
            height: a,
            d3Zoom: i,
            d3Selection: s,
            translateExtent: c,
          } = t();
          if (!i || !s || (!n.x && !n.y)) return !1;
          const u = Xt.translate(o[0] + n.x, o[1] + n.y).scale(o[2]),
            l = [
              [0, 0],
              [r, a],
            ],
            d = i == null ? void 0 : i.constrain()(u, l, c);
          return (
            i.transform(s, d), o[0] !== d.x || o[1] !== d.y || o[2] !== d.k
          );
        },
        cancelConnection: () =>
          e({
            connectionNodeId: Vt.connectionNodeId,
            connectionHandleId: Vt.connectionHandleId,
            connectionHandleType: Vt.connectionHandleType,
            connectionStatus: Vt.connectionStatus,
            connectionStartHandle: Vt.connectionStartHandle,
            connectionEndHandle: Vt.connectionEndHandle,
          }),
        reset: () => e({ ...Vt }),
      }),
      Object.is,
    ),
  js = ({ children: e }) => {
    const t = ae(null);
    return (
      t.current || (t.current = L7()),
      j.createElement(e6, { value: t.current }, e)
    );
  };
js.displayName = "ReactFlowProvider";
const Vf = ({ children: e }) =>
  Ye(Vr) ? j.createElement(j.Fragment, null, e) : j.createElement(js, null, e);
Vf.displayName = "ReactFlowWrapper";
const P7 = {
    input: Ef,
    default: Yi,
    output: kf,
    group: Ps,
  },
  H7 = {
    default: Tr,
    straight: Rs,
    step: Ds,
    smoothstep: qr,
    simplebezier: Ns,
  },
  j7 = [0, 0],
  F7 = [15, 15],
  B7 = { x: 0, y: 0, zoom: 1 },
  $7 = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
  },
  qf = Mu(
    (
      {
        nodes: e,
        edges: t,
        defaultNodes: n,
        defaultEdges: o,
        className: r,
        nodeTypes: a = P7,
        edgeTypes: i = H7,
        onNodeClick: s,
        onEdgeClick: c,
        onInit: u,
        onMove: l,
        onMoveStart: d,
        onMoveEnd: f,
        onConnect: g,
        onConnectStart: p,
        onConnectEnd: h,
        onClickConnectStart: m,
        onClickConnectEnd: y,
        onNodeMouseEnter: x,
        onNodeMouseMove: C,
        onNodeMouseLeave: S,
        onNodeContextMenu: w,
        onNodeDoubleClick: M,
        onNodeDragStart: O,
        onNodeDrag: _,
        onNodeDragStop: L,
        onNodesDelete: I,
        onEdgesDelete: P,
        onSelectionChange: $,
        onSelectionDragStart: B,
        onSelectionDrag: v,
        onSelectionDragStop: k,
        onSelectionContextMenu: E,
        onSelectionStart: N,
        onSelectionEnd: z,
        connectionMode: T = gn.Strict,
        connectionLineType: A = Zt.Bezier,
        connectionLineStyle: D,
        connectionLineComponent: H,
        connectionLineContainerStyle: W,
        deleteKeyCode: V = "Backspace",
        selectionKeyCode: Y = "Shift",
        selectionOnDrag: Z = !1,
        selectionMode: X = bo.Full,
        panActivationKeyCode: Q = "Space",
        multiSelectionKeyCode: te = Ar() ? "Meta" : "Control",
        zoomActivationKeyCode: q = Ar() ? "Meta" : "Control",
        snapToGrid: fe = !1,
        snapGrid: K = F7,
        onlyRenderVisibleElements: ye = !1,
        selectNodesOnDrag: Pe = !0,
        nodesDraggable: Se,
        nodesConnectable: je,
        nodesFocusable: we,
        nodeOrigin: oe = j7,
        edgesFocusable: Re,
        edgesUpdatable: At,
        elementsSelectable: Jt,
        defaultViewport: mt = B7,
        minZoom: jt = 0.5,
        maxZoom: at = 2,
        translateExtent: Mt = Ki,
        preventScrolling: bt = !0,
        nodeExtent: Ze,
        defaultMarkerColor: Ft = "#b1b1b7",
        zoomOnScroll: Tt = !0,
        zoomOnPinch: Bt = !0,
        panOnScroll: De = !1,
        panOnScrollSpeed: Ke = 0.5,
        panOnScrollMode: Ot = cn.Free,
        zoomOnDoubleClick: Nt = !0,
        panOnDrag: Dt = !0,
        onPaneClick: it,
        onPaneMouseEnter: Je,
        onPaneMouseMove: en,
        onPaneMouseLeave: tn,
        onPaneScroll: $t,
        onPaneContextMenu: yt,
        children: bn,
        onEdgeUpdate: st,
        onEdgeContextMenu: To,
        onEdgeDoubleClick: Zr,
        onEdgeMouseEnter: Oo,
        onEdgeMouseMove: Kr,
        onEdgeMouseLeave: No,
        onEdgeUpdateStart: Do,
        onEdgeUpdateEnd: Xr,
        edgeUpdaterRadius: Gr = 10,
        onNodesChange: Ro,
        onEdgesChange: Qr,
        noDragClassName: Jr = "nodrag",
        noWheelClassName: ea = "nowheel",
        noPanClassName: zo = "nopan",
        fitView: R = !1,
        fitViewOptions: U,
        connectOnClick: J = !0,
        attributionPosition: re,
        proOptions: pe,
        defaultEdgeOptions: ve,
        elevateNodesOnSelect: ge = !0,
        elevateEdgesOnSelect: le = !1,
        disableKeyboardA11y: ze = !1,
        autoPanOnConnect: Ce = !0,
        autoPanOnNodeDrag: _e = !0,
        connectionRadius: We = 20,
        isValidConnection: Wt,
        onError: Io,
        style: lt,
        id: Xs,
        nodeDragThreshold: S1,
        ...C1
      },
      E1,
    ) => {
      const ta = Xs || "1";
      return j.createElement(
        "div",
        {
          ...C1,
          style: { ...lt, ...$7 },
          ref: E1,
          className: $e(["react-flow", r]),
          "data-testid": "rf__wrapper",
          id: Xs,
        },
        j.createElement(
          Vf,
          null,
          j.createElement(I7, {
            onInit: u,
            onMove: l,
            onMoveStart: d,
            onMoveEnd: f,
            onNodeClick: s,
            onEdgeClick: c,
            onNodeMouseEnter: x,
            onNodeMouseMove: C,
            onNodeMouseLeave: S,
            onNodeContextMenu: w,
            onNodeDoubleClick: M,
            nodeTypes: a,
            edgeTypes: i,
            connectionLineType: A,
            connectionLineStyle: D,
            connectionLineComponent: H,
            connectionLineContainerStyle: W,
            selectionKeyCode: Y,
            selectionOnDrag: Z,
            selectionMode: X,
            deleteKeyCode: V,
            multiSelectionKeyCode: te,
            panActivationKeyCode: Q,
            zoomActivationKeyCode: q,
            onlyRenderVisibleElements: ye,
            selectNodesOnDrag: Pe,
            defaultViewport: mt,
            translateExtent: Mt,
            minZoom: jt,
            maxZoom: at,
            preventScrolling: bt,
            zoomOnScroll: Tt,
            zoomOnPinch: Bt,
            zoomOnDoubleClick: Nt,
            panOnScroll: De,
            panOnScrollSpeed: Ke,
            panOnScrollMode: Ot,
            panOnDrag: Dt,
            onPaneClick: it,
            onPaneMouseEnter: Je,
            onPaneMouseMove: en,
            onPaneMouseLeave: tn,
            onPaneScroll: $t,
            onPaneContextMenu: yt,
            onSelectionContextMenu: E,
            onSelectionStart: N,
            onSelectionEnd: z,
            onEdgeUpdate: st,
            onEdgeContextMenu: To,
            onEdgeDoubleClick: Zr,
            onEdgeMouseEnter: Oo,
            onEdgeMouseMove: Kr,
            onEdgeMouseLeave: No,
            onEdgeUpdateStart: Do,
            onEdgeUpdateEnd: Xr,
            edgeUpdaterRadius: Gr,
            defaultMarkerColor: Ft,
            noDragClassName: Jr,
            noWheelClassName: ea,
            noPanClassName: zo,
            elevateEdgesOnSelect: le,
            rfId: ta,
            disableKeyboardA11y: ze,
            nodeOrigin: oe,
            nodeExtent: Ze,
          }),
          j.createElement(N6, {
            nodes: e,
            edges: t,
            defaultNodes: n,
            defaultEdges: o,
            onConnect: g,
            onConnectStart: p,
            onConnectEnd: h,
            onClickConnectStart: m,
            onClickConnectEnd: y,
            nodesDraggable: Se,
            nodesConnectable: je,
            nodesFocusable: we,
            edgesFocusable: Re,
            edgesUpdatable: At,
            elementsSelectable: Jt,
            elevateNodesOnSelect: ge,
            minZoom: jt,
            maxZoom: at,
            nodeExtent: Ze,
            onNodesChange: Ro,
            onEdgesChange: Qr,
            snapToGrid: fe,
            snapGrid: K,
            connectionMode: T,
            translateExtent: Mt,
            connectOnClick: J,
            defaultEdgeOptions: ve,
            fitView: R,
            fitViewOptions: U,
            onNodesDelete: I,
            onEdgesDelete: P,
            onNodeDragStart: O,
            onNodeDrag: _,
            onNodeDragStop: L,
            onSelectionDrag: v,
            onSelectionDragStart: B,
            onSelectionDragStop: k,
            noPanClassName: zo,
            nodeOrigin: oe,
            rfId: ta,
            autoPanOnConnect: Ce,
            autoPanOnNodeDrag: _e,
            onError: Io,
            connectionRadius: We,
            isValidConnection: Wt,
            nodeDragThreshold: S1,
          }),
          j.createElement(T6, { onSelectionChange: $ }),
          bn,
          j.createElement(n6, { proOptions: pe, position: re }),
          j.createElement(L6, { rfId: ta, disableKeyboardA11y: ze }),
        ),
      );
    },
  );
qf.displayName = "ReactFlow";
function W7() {
  return j.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
    j.createElement("path", {
      d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z",
    }),
  );
}
function V7() {
  return j.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5" },
    j.createElement("path", { d: "M0 0h32v4.2H0z" }),
  );
}
function q7() {
  return j.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30" },
    j.createElement("path", {
      d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
    }),
  );
}
function U7() {
  return j.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    j.createElement("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
    }),
  );
}
function Y7() {
  return j.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    j.createElement("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
    }),
  );
}
const no = ({ children: e, className: t, ...n }) =>
  j.createElement(
    "button",
    { type: "button", className: $e(["react-flow__controls-button", t]), ...n },
    e,
  );
no.displayName = "ControlButton";
const Z7 = (e) => ({
    isInteractive:
      e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
    minZoomReached: e.transform[2] <= e.minZoom,
    maxZoomReached: e.transform[2] >= e.maxZoom,
  }),
  Uf = ({
    style: e,
    showZoom: t = !0,
    showFitView: n = !0,
    showInteractive: o = !0,
    fitViewOptions: r,
    onZoomIn: a,
    onZoomOut: i,
    onFitView: s,
    onInteractiveChange: c,
    className: u,
    children: l,
    position: d = "bottom-left",
  }) => {
    const f = Le(),
      [g, p] = de(!1),
      { isInteractive: h, minZoomReached: m, maxZoomReached: y } = Ee(Z7, He),
      { zoomIn: x, zoomOut: C, fitView: S } = Et();
    if (
      (ie(() => {
        p(!0);
      }, []),
      !g)
    )
      return null;
    const w = () => {
        x(), a == null || a();
      },
      M = () => {
        C(), i == null || i();
      },
      O = () => {
        S(r), s == null || s();
      },
      _ = () => {
        f.setState({
          nodesDraggable: !h,
          nodesConnectable: !h,
          elementsSelectable: !h,
        }),
          c == null || c(!h);
      };
    return j.createElement(
      of,
      {
        className: $e(["react-flow__controls", u]),
        position: d,
        style: e,
        "data-testid": "rf__controls",
      },
      t &&
        j.createElement(
          j.Fragment,
          null,
          j.createElement(
            no,
            {
              onClick: w,
              className: "react-flow__controls-zoomin",
              title: "zoom in",
              "aria-label": "zoom in",
              disabled: y,
            },
            j.createElement(W7, null),
          ),
          j.createElement(
            no,
            {
              onClick: M,
              className: "react-flow__controls-zoomout",
              title: "zoom out",
              "aria-label": "zoom out",
              disabled: m,
            },
            j.createElement(V7, null),
          ),
        ),
      n &&
        j.createElement(
          no,
          {
            className: "react-flow__controls-fitview",
            onClick: O,
            title: "fit view",
            "aria-label": "fit view",
          },
          j.createElement(q7, null),
        ),
      o &&
        j.createElement(
          no,
          {
            className: "react-flow__controls-interactive",
            onClick: _,
            title: "toggle interactivity",
            "aria-label": "toggle interactivity",
          },
          h ? j.createElement(Y7, null) : j.createElement(U7, null),
        ),
      l,
    );
  };
Uf.displayName = "Controls";
var K7 = Me(Uf),
  ft;
(function (e) {
  (e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross");
})(ft || (ft = {}));
function X7({ color: e, dimensions: t, lineWidth: n }) {
  return j.createElement("path", {
    stroke: e,
    strokeWidth: n,
    d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`,
  });
}
function G7({ color: e, radius: t }) {
  return j.createElement("circle", { cx: t, cy: t, r: t, fill: e });
}
const Q7 = {
    [ft.Dots]: "#91919a",
    [ft.Lines]: "#eee",
    [ft.Cross]: "#e2e2e2",
  },
  J7 = {
    [ft.Dots]: 1,
    [ft.Lines]: 1,
    [ft.Cross]: 6,
  },
  e4 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function Yf({
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
  className: c,
}) {
  const u = ae(null),
    { transform: l, patternId: d } = Ee(e4, He),
    f = i || Q7[t],
    g = o || J7[t],
    p = t === ft.Dots,
    h = t === ft.Cross,
    m = Array.isArray(n) ? n : [n, n],
    y = [m[0] * l[2] || 1, m[1] * l[2] || 1],
    x = g * l[2],
    C = h ? [x, x] : y,
    S = p ? [x / a, x / a] : [C[0] / a, C[1] / a];
  return j.createElement(
    "svg",
    {
      className: $e(["react-flow__background", c]),
      style: {
        ...s,
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      },
      ref: u,
      "data-testid": "rf__background",
    },
    j.createElement(
      "pattern",
      {
        id: d + e,
        x: l[0] % y[0],
        y: l[1] % y[1],
        width: y[0],
        height: y[1],
        patternUnits: "userSpaceOnUse",
        patternTransform: `translate(-${S[0]},-${S[1]})`,
      },
      p
        ? j.createElement(G7, { color: f, radius: x / a })
        : j.createElement(X7, { dimensions: C, color: f, lineWidth: r }),
    ),
    j.createElement("rect", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      fill: `url(#${d + e})`,
    }),
  );
}
Yf.displayName = "Background";
var t4 = Me(Yf);
const Zf = "columns",
  Kf = "exposure",
  Xf = "tables",
  n4 = "feedback",
  Gf = "settings",
  jn = "column-",
  Qf = "see-more-",
  o4 = 5,
  r4 = 100,
  a4 = 100,
  Fs = 272,
  Bs = 80,
  i4 = 12,
  s4 = Bs,
  Jf = 30,
  yu = 4,
  l4 = 280,
  c4 = 80,
  $s = 0.05,
  e1 = "#7A899E",
  Ws = "#E38E00",
  t1 = {
    Original: "#FDD835",
    Alias: "#40C8AE",
    Transformation: "#FF754C",
    Unchanged: "#BC3FBC",
    "Not sure": "#247efe",
  },
  Vs = {
    stroke: e1,
    strokeWidth: 1,
  },
  n1 = {
    stroke: Ws,
    strokeWidth: 2,
  },
  o1 = {
    stroke: Ws,
    strokeWidth: 1,
    strokeDasharray: 10,
  },
  r1 = {
    type: "arrow",
    strokeWidth: 1,
    width: 24,
    height: 24,
    color: e1,
  },
  a1 = {
    type: "arrow",
    strokeWidth: 1,
    width: 16,
    height: 16,
    color: Ws,
  },
  tt = (e) => e.id.startsWith(jn),
  Jo = (e) => e.id.startsWith(Qf),
  vo = (e) => !e.id.startsWith(jn),
  i1 = (e, t, n, o, r) => {
    const [a, i] = r ? [n, o] : [o, n],
      [s, c] = r ? Qi(e, t) : Qi(t, e);
    return {
      id: `${a}-${i}`,
      source: a,
      target: i,
      sourceHandle: s,
      targetHandle: c,
      style: Vs,
      markerEnd: r1,
      type: n === o ? "selfConnecting" : e === t ? "smoothstep" : "default",
    };
  },
  qs = (e, t, n) => ({
    id: e.table,
    data: { ...e, level: t, parent: n },
    position: { x: 100, y: 100 },
    type: "table",
    width: Fs,
    height: Bs,
  }),
  Xi = (e, t, n) => ({
    id: Nr(e, t),
    data: { column: t, table: e, lensType: n },
    parentNode: e,
    extent: "parent",
    draggable: !1,
    type: "column",
    position: { x: 100, y: 100 },
    height: Jf,
  }),
  Gi = (e, t, n, o, r, a) => {
    const i = Us(e, t),
      [s, c] = Qi(n, o);
    return {
      id: i,
      data: { type: r },
      source: e,
      target: t,
      sourceHandle: s,
      targetHandle: c,
      style: r === "direct" ? n1 : o1,
      zIndex: 1e3,
      markerEnd: a1,
      type: n === o ? "smoothstep" : "default",
      hidden: !a[r],
    };
  },
  Us = (e, t) => jn + `${e}-${t}`,
  Or = (e, t) => {
    e.style = { opacity: t ? 1 : 0.5 };
  },
  Fn = (e, t) => {
    var n;
    (e.style = t
      ? ((n = e.data) == null ? void 0 : n.type) === "indirect"
        ? o1
        : n1
      : Vs),
      (e.markerEnd = t ? a1 : r1);
  },
  Qi = (e, t) =>
    e < t
      ? ["right", "left"]
      : e > t
        ? ["left", "right"]
        : e < 0
          ? ["left", "left"]
          : ["right", "right"],
  u4 = (e, t) => {
    const n = {};
    e.forEach((a) => {
      vo(a) && (n[a.id] = a.data.level);
    });
    const o = {};
    e.filter((a) => a.type === "table").forEach((a) => (o[a.id] = !0));
    const r = {};
    for (const a of t) {
      if (tt(a)) continue;
      const i = o[a.source],
        s = o[a.target];
      if (!(i && s)) {
        if (i) {
          e.find((u) => u.id === a.target).data.tables.forEach((u) => {
            r[u.table] = a.target;
          });
          continue;
        }
        s &&
          e
            .find((u) => u.id === a.source)
            .data.tables.forEach((u) => {
              r[u.table] = a.source;
            });
      }
    }
    return { levelMap: n, tableNodes: o, seeMoreIdTableReverseMap: r };
  },
  Nr = (e, t) => jn + `${e}/${t}`,
  Dr = (e, t) => Qf + e + "-" + (t ? "1" : "0"),
  vu = (e, t) => {
    for (const n of e) if (n[0] === t[0] && n[1] === t[1]) return !0;
    return !1;
  },
  wu = (e, t, n) => {
    (e[t] = e[t] || []), e[t].push(...n);
  },
  Ji = (e, t = 1) => e * (Jf + yu) + t * yu,
  xu = (e, t) => (n) => e <= n && n <= t,
  d4 = (e, t) => (n) => e < n && n < t,
  Su = (e, t) => {
    const n = e.findIndex((o) => o.id === t);
    n !== -1 && e.splice(n, 1);
  },
  Cu = (e, t, n) => (e === -1 || n >= t ? t : n >= e ? n : e),
  wo = (e, t, n = !0) => {
    e.forEach((o) => {
      tt(o) || ((o.hidden = !t), n && Fn(o, t));
    });
  },
  xo = (e, t, n = !0) => {
    e.forEach((o) => {
      tt(o) && ((o.hidden = !t), n && Fn(o, t));
    });
  },
  f4 = (e) => Ne.get("upstreamTables", { table: e }),
  g4 = (e) => Ne.get("downstreamTables", { table: e }),
  p4 = (e) =>
    Ne.get("getExposureDetails", {
      name: e,
    }),
  s1 = (e, t) =>
    Ne.get("getColumns", {
      table: e,
      refresh: t,
    }),
  h4 = (e) => Ne.get("getConnectedColumns", e),
  m4 = (e) => Ne.get("sendFeedback", e),
  b4 = () => Ne.get("getLineageSettings", {}),
  vi = (e) => Ne.get("persistLineageSettings", e),
  l1 = () => Ne.get("init", {}),
  y4 = (e) => Ne.get("openFile", { url: e }),
  v4 = () => Ne.get("openChat", {}),
  c1 = (e) => Ne.get("showInfoNotification", { message: e }),
  w4 = () => Ne.get("previewFeature", {}),
  wi = (e) => Ne.get("columnLineage", { event: e }),
  x4 = (e) => Ne.get("telemetryEvents", e);
var S4 = /* @__PURE__ */ ((e) => (
  (e.START = "start"), (e.END = "end"), (e.CANCEL = "cancel"), e
))(S4 || {});
const Fe = class Fe {
  static onCancel() {
    (Fe.isCancelled = !0), (Fe.inProgress = !1);
  }
  static cancel() {
    Fe.onCancel(),
      wi(
        "cancel",
        /* CANCEL */
      );
    const t = new CustomEvent("cll_cancelled", { detail: void 0 });
    document.dispatchEvent(t);
  }
  static start() {
    (Fe.inProgress = !0),
      (Fe.isCancelled = !1),
      (Fe.linkCount = 0),
      wi(
        "start",
        /* START */
      );
  }
  static end() {
    (Fe.inProgress = !1),
      wi(
        "end",
        /* END */
      ),
      x4({
        id: "columnLineageNumLinks",
        params: { num: Fe.linkCount },
      }),
      (Fe.linkCount = 0);
  }
  static addLinks(t) {
    Fe.linkCount += t;
  }
  static showCllInProgressMsg() {
    c1(
      "Column lineage is in progress. Either wait for it to complete or cancel the current one.",
    );
  }
};
Lo(Fe, "isCancelled", !1), Lo(Fe, "inProgress", !1), Lo(Fe, "linkCount", 0);
let Ie = Fe;
const u1 = (e, t) => (e ? f4(t) : g4(t)),
  d1 = (e, t) => (e ? t + 1 : t - 1),
  f1 = (e, t, n, o, r, a, i = o4) => {
    const s = d1(r, a),
      c = (l) => {
        var p, h;
        const d =
            (h = (p = e.find((m) => m.id === l)) == null ? void 0 : p.data) ==
            null
              ? void 0
              : h.level,
          f = i1(a, d, o, l, r);
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
          width: Fs,
          height: 100,
        }),
          c(f);
        break;
      }
      e.find((f) => f.id === l.table) || (e.push(qs(l, s, o)), u++), c(l.table);
    }
  },
  mn = (e, t) => {
    let n = 1 / 0;
    const o = {};
    for (const p of e)
      if (tt(p) && p.parentNode)
        p.parentNode in o || (o[p.parentNode] = 0),
          (p.position = {
            x: i4,
            y: s4 + Ji(o[p.parentNode]),
          }),
          o[p.parentNode]++;
      else {
        const { level: h } = p.data;
        n = Math.min(n, h);
      }
    const r = {},
      a = {},
      i = {},
      s = {},
      c = {},
      u = {};
    for (const p of t)
      tt(p) ||
        Jo(e.find((h) => h.id === p.source)) ||
        Jo(e.find((h) => h.id === p.target)) ||
        ((c[p.source] = c[p.source] || []),
        c[p.source].push(p.target),
        (u[p.target] = u[p.target] || []),
        u[p.target].push(p.source));
    const l = (p) => {
        const { level: h } = p.data;
        if (((a[h] = a[h] || []), !a[h].includes(p.id))) {
          (i[p.id] = a[h].length), (r[p.id] = 0);
          for (const m of a[h]) r[p.id] += o[m] || 0;
          a[h].push(p.id);
        }
      },
      d = (p, h) => {
        if (!s[p]) {
          (s[p] = !0), l(e.find((m) => m.id === p));
          for (const m of h[p] || []) d(m, h);
        }
      };
    for (const p of e)
      tt(p) || Jo(p) || s[p.id] || (d(p.id, c), (s[p.id] = !1), d(p.id, u));
    for (const p of e) tt(p) || (Jo(p) && l(p));
    const f = (p) => {
        const h = i[p.id] || 0,
          m = r[p.id] || 0;
        return a4 + h * (Bs + c4) + Ji(m, h);
      },
      g = (p) => (p - n) * (Fs + l4) + r4;
    for (const p of e) {
      if (tt(p)) continue;
      const { level: h } = p.data;
      p.position = { x: g(h), y: f(p) };
    }
  },
  C4 = (e, t) => (
    e.forEach((n) => Or(n, !0)), t.forEach((n) => Fn(n, !1)), [e, t]
  ),
  So = (e, t, n) => {
    wo(t, !0), xo(t, !1);
    const o = {},
      r = {},
      a = (c, u) => {
        const l = [n],
          d = {};
        for (; l.length > 0; ) {
          const f = l.shift();
          (d[f] = !0),
            (o[f] = !0),
            t.forEach((g) => {
              g[c] === f && ((r[g.id] = !0), d[g[u]] || l.push(g[u]));
            });
        }
      };
    a("source", "target"), a("target", "source");
    const i = [...t];
    i.forEach((c) => Fn(c, r[c.id]));
    const s = [...e];
    return s.forEach((c) => Or(c, !!o[c.id])), [s, i];
  },
  E4 = async (e, t, n, o, r, a, i, s, c, u) => {
    const l = [],
      d = [],
      { column_lineage: f, confidence: g } = await h4({
        targets: o,
        upstreamExpansion: r,
        currAnd1HopTables: a,
        selectedColumn: i,
      });
    Ie.addLinks(f.length);
    const p = f.filter((w) => (r ? vu(o, w.source) : vu(o, w.target))),
      h = p.map((w) => (r ? w.target : w.source)),
      m = {},
      y = ([w, M], O) => {
        (m[w] = m[w] || []),
          m[w].find((_) => _.column === M) ||
            m[w].push({ column: M, lensType: O });
      },
      x = (w, M, O, _, L) => {
        const I = Us(O, _);
        d.find((P) => P.id === I) || d.push(Gi(O, _, e[w], e[M], L, u));
      },
      C = [],
      S = {};
    for (const w of p) {
      const M = w.source.join("/"),
        O = w.target.join("/"),
        _ = (L) =>
          c ? w.type : w.type === "indirect" ? "indirect" : L || w.type;
      r
        ? ((S[O] = S[O] || []), S[O].push(_(s[M])))
        : ((S[M] = S[M] || []), S[M].push(_(s[O])));
    }
    for (const w in S)
      s[w] = S[w].some((M) => M === "direct") ? "direct" : "indirect";
    for (const w of p) {
      y(w.source), y(w.target, w.lensType);
      const [M] = w.source,
        [O] = w.target,
        _ = n[M],
        L = n[O],
        I = w.source.join("/"),
        P = w.target.join("/"),
        $ = jn + I,
        B = jn + P,
        v = s[r ? P : I];
      if (_ && L) x(M, O, $, B, v);
      else if (_) {
        const k = t[O];
        x(M, k, $, k, v), C.push(w);
      } else if (L) {
        const k = t[M];
        x(k, O, k, B, v), C.push(w);
      } else C.push(w);
    }
    for (const w in m)
      if (n[w]) {
        m[w].sort();
        for (const M of m[w]) l.push(Xi(w, M.column, M.lensType));
      }
    return {
      nodes: l,
      edges: d,
      collectColumns: m,
      newCurr: h,
      confidence: g,
      seeMoreLineage: C,
    };
  },
  _4 = (e, t) => {
    const n = [...e.nodes],
      o = [...e.edges],
      r = {},
      a = {};
    return (
      n.forEach((i) => (r[i.id] = !0)),
      o.forEach((i) => (a[i.id] = !0)),
      t.nodes.forEach((i) => {
        r[i.id] || n.push(i);
        const s = n.find((c) => c.id === i.id);
        s &&
          (s.data = {
            ...s.data,
            ...i.data,
            lensType: s.data.lensType || i.data.lensType,
          });
      }),
      t.edges.forEach((i) => !a[i.id] && o.push(i)),
      mn(n, o),
      [n, o]
    );
  },
  k4 = (e, t) => {
    const n = e.filter((r) => vo(r)),
      o = t.filter((r) => vo(r));
    return [n, o];
  },
  Ys = async (e, t, n, o) => {
    const r = [...e],
      a = [...t],
      i = [{ table: n, level: r.find((c) => c.id === n).data.level }],
      s = {};
    for (; i.length > 0; ) {
      const { table: c, level: u } = i.shift();
      if (s[c]) continue;
      s[c] = !0;
      const { tables: l } = await u1(o, c);
      f1(r, a, l, c, o, u),
        l.forEach((d) => {
          const f = r.find((g) => g.id === d.table);
          (f == null ? void 0 : f.data.materialization) === "ephemeral" &&
            i.push({ table: d.table, level: f.data.level });
        });
    }
    return [r, a];
  },
  es = async (e, t, n, o, r) => {
    const a = [...e],
      i = [...t];
    if (o >= r) return [a, i];
    const s = d4(o, r),
      c = a.find((l) => l.id === n).data.level,
      u = async (l) => {
        const d = [{ table: n, level: c }],
          f = {};
        for (; d.length > 0; ) {
          const g = d.shift();
          if (f[g.table]) continue;
          f[g.table] = !0;
          const { tables: p } = await u1(l, g.table);
          f1(a, i, p, g.table, l, g.level, 1 / 0);
          const h = d1(l, g.level);
          s(h)
            ? d.push(...p.map((m) => ({ table: m.table, level: h })))
            : d.push(
                ...p
                  .filter((m) => m.materialization === "ephemeral")
                  .map((m) => ({ table: m.table, level: h })),
              );
        }
      };
    return r > c && (await u(!0)), o < c && (await u(!1)), [a, i];
  },
  Eu = (e, t, n, o) => {
    if (!n) return -1;
    const r = o ? "source" : "target",
      a = o ? "target" : "source",
      i = o ? "upstreamCount" : "downstreamCount",
      s = {},
      c = {};
    for (const g of e) tt(g) || ((s[g.id] = g), (c[g.id] = []));
    for (const g of t) tt(g) || c[g[r]].push(g[a]);
    const l = (() => {
      const g = [n],
        p = {};
      for (; g.length > 0; ) {
        const h = g.shift();
        if (p[h]) continue;
        p[h] = !0;
        const m = s[h].data;
        if (m[i] !== 0) {
          if (c[h].length < m[i]) return h;
          for (const y of c[h]) g.push(y);
        }
      }
    })();
    if (!l) return -1;
    const { level: d } = s[n].data,
      { level: f } = s[l].data;
    return o ? f - d : d - f;
  },
  Co = (e, t, n) => [Eu(e, t, n, !1), Eu(e, t, n, !0)],
  g1 = async (e, t, n, o, r, a, i, s, c, u) => {
    var w, M, O, _, L, I;
    let l = !1;
    const {
        levelMap: d,
        tableNodes: f,
        seeMoreIdTableReverseMap: g,
      } = u4(e, t),
      p = (P) => e.find(($) => $.id === P),
      h = {},
      m = {};
    let y = o.map((P) => [P.table, P.name]),
      x = [];
    const C = {};
    let S = !0;
    for (
      ;
      !(
        Ie.isCancelled ||
        ((y = y.filter((H) => !h[H.join("/")])),
        y.length === 0 && x.length === 0)
      );

    ) {
      const P = {};
      y.forEach((H) => {
        (h[H.join("/")] = !0), (P[H[0]] = !0);
      });
      const [$, B] = n ? ["source", "target"] : ["target", "source"],
        v = [],
        k = [],
        E = [];
      let N = !1;
      for (const H of t) {
        if (tt(H)) continue;
        const W = H[$],
          V = H[B],
          Y = f[V]
            ? [(w = p(V)) == null ? void 0 : w.data]
            : (_ =
                  (O = (M = p(V)) == null ? void 0 : M.data) == null
                    ? void 0
                    : O.tables) == null
              ? void 0
              : _.filter((Z) => !f[Z.table]);
        Y == null ||
          Y.forEach(({ table: Z, materialization: X }) => {
            P[W]
              ? ((N = !0),
                X === "ephemeral"
                  ? (wu(
                      m,
                      Z,
                      y.filter((Q) => Q[0] === W),
                    ),
                    k.push(Z))
                  : v.push(Z))
              : x.includes(W) &&
                ((N = !0),
                X === "ephemeral"
                  ? (wu(m, Z, m[W]), k.push(Z))
                  : (E.push(W), v.push(Z)));
          });
      }
      if (!N) break;
      x = k;
      const z = Object.keys(P).concat(v);
      E.forEach((H) => {
        y.push(...m[H]), z.push(...m[H].map((W) => W[0]));
      });
      const T = await E4(d, g, f, y, n, Array.from(new Set(z)), c, C, S, u);
      (S = !1),
        ((L = T.confidence) == null ? void 0 : L.confidence) === "low" &&
          r(((I = T.confidence) == null ? void 0 : I.operator_list) || []),
        (y = T.newCurr),
        !l && y.length > 0 && (l = !0);
      const [A, D] = _4({ nodes: s.getNodes(), edges: s.getEdges() }, T);
      a(T.seeMoreLineage),
        mn(A, D),
        s.setNodes(A),
        s.setEdges(D),
        i(T.collectColumns);
    }
    return l;
  },
  A4 = (
    e,
    t,
    n,
    { prevTable: o, tables: r, right: a, level: i, lineage: s },
    c,
  ) => {
    var f;
    const { table: u } = n;
    if (e.find((g) => g.id === u)) return !1;
    e.push(qs(n, i, o));
    const d = (f = e.find((g) => g.id === o)) == null ? void 0 : f.data.level;
    if (
      (t.push(i1(d, i, o, u, a)),
      s == null ||
        s.forEach((g) => {
          const p = Nr(g.source[0], g.source[1]),
            h = Nr(g.target[0], g.target[1]);
          if (a) {
            if (g.target[0] !== u) return;
            e.push(Xi(g.target[0], g.target[1], g.lensType)),
              t.push(Gi(p, h, i - 1, i, g.type, c));
          } else {
            if (g.source[0] !== u) return;
            e.push(Xi(g.source[0], g.source[1], g.lensType)),
              t.push(Gi(p, h, i, i + 1, g.type, c));
          }
        }),
      r.every((g) => !!e.find((p) => p.id === g.table)))
    ) {
      const g = Dr(o, a),
        p = a ? `${o}-${g}` : `${g}-${o}`;
      return Su(e, g), Su(t, p), !0;
    }
    return !1;
  },
  Bn = async (e, t, n, o, r) => {
    var u;
    if (!n) return 0;
    const a = (u = e.find((l) => l.id === n)) == null ? void 0 : u.data;
    if (!a) return 0;
    const { level: i } = a,
      s = e.length,
      [c] = await es(e, t, n, i - o, i + r);
    return c.length - s;
  },
  M4 = (e, t, n, o) => {
    if (!m6(e)) return { nodes: [], edgeIds: [] };
    const r = n.filter((a) => (o ? a.target : a.source) === e.id);
    return {
      nodes: t.filter((a) =>
        r.find((i) => i.source === a.id || i.target === a.id),
      ),
      edgeIds: r.map((a) => Us(a.source, a.target)),
    };
  },
  ts = (e, t, n, o = [], r) => {
    const { nodes: a, edgeIds: i } = M4(e, t, n, r);
    return a.reduce(
      (s, c) => {
        if (
          (s.nodes.push(c),
          (s.edges = Array.from(/* @__PURE__ */ new Set([...s.edges, ...i]))),
          o.findIndex((u) => u.id == c.id) === -1)
        ) {
          o.push(c);
          const { nodes: u, edges: l } = ts(c, t, n, o, r);
          u.forEach((d) => {
            s.nodes.push(d),
              o.findIndex((f) => f.id == d.id) === -1 && o.push(d);
          }),
            (s.edges = Array.from(/* @__PURE__ */ new Set([...s.edges, ...l])));
        }
        return s;
      },
      { nodes: [], edges: [] },
    );
  },
  T4 = (e, t) => {
    const n = t.getNodes().filter((i) => tt(i)),
      o = t.getEdges();
    n.forEach((i) => {
      const s = t.getNode(i.id);
      s && Or(s, !1);
    }),
      o.forEach((i) => {
        const s = t.getEdge(i.id);
        s && ((s.hidden = !0), Fn(s, !1));
      });
    const r = ts(e, n, o, [], !0),
      a = ts(e, n, o, [], !1);
    [r, a].forEach(({ nodes: i, edges: s }) => {
      i.forEach((c) => {
        const u = t.getNode(c.id);
        u && Or(u, !0);
      }),
        s.forEach((c) => {
          const u = t.getEdge(c);
          u && ((u.hidden = !1), Fn(u, !0));
        });
    });
  },
  O4 = "_table_node_16cyp_1",
  N4 = "_header_16cyp_8",
  D4 = "_collapse_16cyp_16",
  R4 = "_selected_16cyp_21",
  z4 = "_content_16cyp_24",
  I4 = "_table_header_16cyp_37",
  L4 = "_seed_16cyp_47",
  P4 = "_model_16cyp_52",
  H4 = "_source_16cyp_57",
  j4 = "_exposure_16cyp_62",
  F4 = "_snapshot_16cyp_67",
  B4 = "_metrics_16cyp_72",
  $4 = "_macros_16cyp_77",
  W4 = "_analysis_16cyp_82",
  V4 = "_node_icon_16cyp_87",
  q4 = "_table_handle_16cyp_100",
  U4 = "_see_more_node_16cyp_114",
  Y4 = "_table_card_16cyp_125",
  Z4 = "_disabled_16cyp_137",
  K4 = "_column_card_16cyp_142",
  X4 = "_edit_icon_16cyp_155",
  G4 = "_active_16cyp_163",
  Q4 = "_expand_lineage_icon_16cyp_167",
  J4 = "_processing_div_16cyp_180",
  e8 = "_gif_img_16cyp_183",
  t8 = "_card_16cyp_188",
  n8 = "_column_node_16cyp_195",
  o8 = "_column_name_16cyp_206",
  r8 = "_column_badge_16cyp_211",
  a8 = "_divider_16cyp_223",
  i8 = "_table_details_header_16cyp_229",
  s8 = "_verticle_divider_16cyp_237",
  l8 = "_low_confidence_16cyp_242",
  c8 = "_high_confidence_16cyp_249",
  u8 = "_alert_icon_16cyp_256",
  d8 = "_menu_card_16cyp_262",
  f8 = "_menu_card_container_16cyp_267",
  g8 = "_table_details_tabs_16cyp_274",
  p8 = "_tab_16cyp_1",
  h8 = "_table_node_pill_16cyp_294",
  m8 = "_icon_16cyp_304",
  b8 = "_node-checkbox_16cyp_311",
  y8 = "_non_select_node_checkbox_16cyp_311",
  v8 = "_select_node_checkbox_16cyp_311",
  w8 = "_node_extra_info_16cyp_327",
  x8 = "_help_body_16cyp_331",
  S8 = "_feedback_body_16cyp_335",
  C8 = "_cancel_btn_16cyp_338",
  E8 = "_expand_nav_16cyp_343",
  _8 = "_expand_nav_btn_16cyp_351",
  k8 = "_lineage_legend_16cyp_378",
  A8 = "_column_legend_16cyp_395",
  M8 = "_dot_16cyp_408",
  ee = {
    table_node: O4,
    header: N4,
    collapse: D4,
    selected: R4,
    content: z4,
    table_header: I4,
    seed: L4,
    model: P4,
    source: H4,
    exposure: j4,
    snapshot: F4,
    metrics: B4,
    macros: $4,
    analysis: W4,
    node_icon: V4,
    table_handle: q4,
    see_more_node: U4,
    table_card: Y4,
    disabled: Z4,
    column_card: K4,
    edit_icon: X4,
    active: G4,
    expand_lineage_icon: Q4,
    processing_div: J4,
    gif_img: e8,
    card: t8,
    column_node: n8,
    default: "_default_16cyp_203",
    column_name: o8,
    column_badge: r8,
    divider: a8,
    table_details_header: i8,
    verticle_divider: s8,
    low_confidence: l8,
    high_confidence: c8,
    alert_icon: u8,
    menu_card: d8,
    menu_card_container: f8,
    table_details_tabs: g8,
    tab: p8,
    table_node_pill: h8,
    icon: m8,
    "node-checkbox": "_node-checkbox_16cyp_311",
    nodeCheckbox: b8,
    non_select_node_checkbox: y8,
    select_node_checkbox: v8,
    node_extra_info: w8,
    help_body: x8,
    feedback_body: S8,
    cancel_btn: C8,
    expand_nav: E8,
    expand_nav_btn: _8,
    lineage_legend: k8,
    column_legend: A8,
    dot: M8,
  },
  T8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M14.4138 13.7953L11.7681 11.9423C11.5927 11.8194 11.4733 11.6319 11.4361 11.421C11.399 11.2101 11.4471 10.9931 11.57 10.8177C11.6928 10.6422 11.8803 10.5228 12.0912 10.4857C12.3022 10.4485 12.5192 10.4966 12.6946 10.6195L15.3402 12.4725C15.5157 12.5953 15.6351 12.7828 15.6722 12.9937C15.7094 13.2047 15.6613 13.4217 15.5384 13.5971C15.4155 13.7725 15.228 13.8919 15.0171 13.9291C14.8062 13.9663 14.5892 13.9181 14.4138 13.7953Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M6.23472 10.7666C6.66662 10.7666 7.07057 10.5991 7.37216 10.2948L10.0514 7.59139C10.6629 6.97429 10.6502 5.98265 10.0231 5.38078C9.39602 4.77904 8.38821 4.79152 7.77672 5.40855L6.205 6.99435L5.92965 6.73088C5.30167 6.13015 4.29393 6.1439 3.6832 6.76187C3.07266 7.37983 3.08677 8.37148 3.71475 8.97241L5.12733 10.3241C5.42551 10.6095 5.81883 10.7666 6.23472 10.7666ZM4.41777 7.46468C4.63478 7.24508 4.9928 7.24052 5.21559 7.45375L5.85755 8.0681C6.0601 8.26201 6.38398 8.25765 6.58135 8.05864L8.51014 6.11251C8.72742 5.89323 9.0853 5.88901 9.3079 6.10258C9.53063 6.31635 9.53505 6.6685 9.31798 6.88763L6.63874 9.59098C6.43168 9.80891 6.05451 9.81354 5.84153 9.60145L4.42895 8.24974C4.20602 8.0363 4.2009 7.68409 4.41777 7.46468Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M1.2696 8.46259C1.23524 8.18365 0.981431 7.98549 0.702382 8.01991C0.423451 8.05439 0.225306 8.3085 0.259604 8.58741C0.29722 8.89279 0.35694 9.19928 0.43695 9.49824C0.894474 11.2074 1.99015 12.6358 3.52208 13.5203C5.05401 14.4047 6.83878 14.6394 8.54776 14.181C10.2568 13.7227 11.6852 12.6262 12.5701 11.0936C13.455 9.56087 13.6903 7.77555 13.2327 6.06641C12.2882 2.53813 8.64974 0.437554 5.12192 1.38363C2.71678 2.02867 0.892688 3.9422 0.361517 6.37751C0.301593 6.65214 0.475849 6.92324 0.750129 6.98306C1.02465 7.04286 1.29584 6.86868 1.35567 6.59407C1.80529 4.53259 3.34929 2.91276 5.38514 2.36679C8.37085 1.56596 11.4504 3.34395 12.2497 6.33007C12.637 7.77666 12.4378 9.28772 11.6889 10.5849C10.94 11.8821 9.73094 12.8101 8.28453 13.198C6.83821 13.5859 5.32757 13.3873 4.031 12.6388C2.73449 11.8902 1.80712 10.6813 1.41988 9.23469C1.35207 8.98094 1.30145 8.72123 1.2696 8.46259Z",
        fill: "currentColor",
      }),
    ),
  p1 = T8,
  O8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 15 15",
        fill: "none",
        ...e,
      },
      /* @__PURE__ */ F.createElement("circle", {
        cx: 7.5,
        cy: 7.5,
        r: 6.9,
        stroke: "currentColor",
        strokeWidth: 1.2,
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M7.05 7.5V7.95H7.5H11C11.1548 7.95 11.2873 8.01395 11.3684 8.10088C11.4447 8.18264 11.4755 8.28138 11.4504 8.39262C11.3415 8.87457 11.1448 9.33503 10.8675 9.75006C10.4224 10.4161 9.78991 10.9352 9.04987 11.2417C8.30983 11.5482 7.49551 11.6285 6.70988 11.4722C5.92426 11.3159 5.20262 10.9302 4.63622 10.3638C4.06981 9.79738 3.68409 9.07574 3.52782 8.29012C3.37155 7.50449 3.45175 6.69017 3.75829 5.95013C4.06482 5.21009 4.58392 4.57757 5.24994 4.13255C5.66497 3.85524 6.12543 3.65849 6.60738 3.54959C6.71862 3.52445 6.81736 3.55531 6.89912 3.6316C6.98605 3.71271 7.05 3.84521 7.05 4V7.5Z",
        stroke: "currentColor",
        strokeWidth: 0.9,
      }),
    ),
  h1 = O8,
  N8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 15,
        height: 15,
        viewBox: "0 0 11 10",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement(
        "g",
        { clipPath: "url(#clip0_19334_15206)" },
        /* @__PURE__ */ F.createElement("path", {
          d: "M8.87489 5.27405C8.77129 5.27405 8.67194 5.3152 8.59868 5.38846C8.52543 5.46171 8.48428 5.56106 8.48428 5.66466V7.23702C8.48393 7.5407 8.36314 7.83185 8.1484 8.0466C7.93366 8.26133 7.64251 8.38213 7.33882 8.38247H2.86441C2.56073 8.38213 2.26958 8.26133 2.05484 8.0466C1.8401 7.83185 1.7193 7.5407 1.71896 7.23702V2.76261C1.7193 2.45892 1.8401 2.16777 2.05484 1.95303C2.26958 1.73829 2.56073 1.6175 2.86441 1.61715H4.43677C4.54037 1.61715 4.63972 1.576 4.71297 1.50275C4.78623 1.42949 4.82738 1.33014 4.82738 1.22654C4.82738 1.12295 4.78623 1.0236 4.71297 0.950344C4.63972 0.877091 4.54037 0.835938 4.43677 0.835938H2.86441C2.35362 0.836541 1.86391 1.03972 1.50272 1.40091C1.14153 1.7621 0.938347 2.25181 0.937744 2.76261V7.23702C0.938347 7.74782 1.14153 8.23752 1.50272 8.59871C1.86391 8.9599 2.35362 9.16308 2.86441 9.16369H7.33882C7.84962 9.16308 8.33933 8.9599 8.70052 8.59871C9.06171 8.23752 9.26489 7.74782 9.26549 7.23702V5.66466C9.26549 5.56106 9.22434 5.46171 9.15109 5.38846C9.07783 5.3152 8.97848 5.27405 8.87489 5.27405Z",
          fill: "#FFCE73",
        }),
        /* @__PURE__ */ F.createElement("path", {
          d: "M8.86633 0.832031H6.43805C6.33577 0.832012 6.23756 0.872113 6.16452 0.94372C6.09149 1.01533 6.04945 1.11273 6.04745 1.21499C6.04338 1.43422 6.22778 1.61325 6.44684 1.61325H7.93327L4.8224 4.72508C4.74916 4.79834 4.70801 4.89769 4.70801 5.00128C4.70801 5.10487 4.74916 5.20422 4.8224 5.27747C4.89566 5.35072 4.99501 5.39187 5.0986 5.39187C5.20219 5.39187 5.30154 5.35072 5.37479 5.27747L8.48663 2.16661V3.6584C8.48663 3.762 8.52778 3.86135 8.60103 3.9346C8.67429 4.00786 8.77364 4.04901 8.87724 4.04901C8.98083 4.04901 9.08018 4.00786 9.15344 3.9346C9.22669 3.86135 9.26784 3.762 9.26784 3.6584V1.23338C9.26784 1.18066 9.25746 1.12846 9.23728 1.07975C9.2171 1.03105 9.18752 0.986797 9.15023 0.949526C9.11295 0.912255 9.06868 0.882696 9.01997 0.862535C8.97126 0.842375 8.91905 0.83201 8.86633 0.832031Z",
          fill: "#FFCE73",
        }),
      ),
      /* @__PURE__ */ F.createElement(
        "defs",
        null,
        /* @__PURE__ */ F.createElement(
          "clipPath",
          { id: "clip0_19334_15206" },
          /* @__PURE__ */ F.createElement("rect", {
            width: 10,
            height: 10,
            fill: "white",
            transform: "translate(0.101318)",
          }),
        ),
      ),
    ),
  D8 = N8,
  R8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M4.96894 9.82478V7.14121H4V6.5H6.67883V7.14121H5.68139V9.82478H4.96894Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M6.60431 10.485L8.57544 6.5H9.24039L7.27402 10.485H6.60431Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M9.7534 9.82478V6.5H10.4659V9.82478H9.7534ZM10.0811 8.50437V7.89166H11.8005V8.50437H10.0811ZM10.0811 7.14121V6.5H12V7.14121H10.0811Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("circle", {
        cx: 8,
        cy: 8.5,
        r: 6.5,
        stroke: "currentColor",
      }),
    ),
  z8 = R8,
  I8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M3 13.3L6.794 3.5H8.334L12.1 13.3H10.49L8.25 7.392C8.222 7.32667 8.166 7.168 8.082 6.916C8.00733 6.664 7.91867 6.384 7.816 6.076C7.71333 5.768 7.62 5.488 7.536 5.236C7.452 4.97467 7.396 4.80667 7.368 4.732L7.69 4.718C7.634 4.87667 7.564 5.07733 7.48 5.32C7.40533 5.56267 7.32133 5.81933 7.228 6.09C7.144 6.36067 7.06 6.61733 6.976 6.86C6.892 7.09333 6.822 7.28933 6.766 7.448L4.54 13.3H3ZM4.68 10.864L5.24 9.408H9.692L10.336 10.864H4.68Z",
        fill: "currentColor",
      }),
    ),
  L8 = I8,
  P8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M8.13796 13.5L9.81796 3.70001H11.078L9.39796 13.5H8.13796ZM3.43396 11.078V9.91601H11.54V11.078H3.43396ZM4.41396 13.5L6.09396 3.70001H7.35396L5.67396 13.5H4.41396ZM3.96596 7.15801V5.99601H12.058V7.15801H3.96596Z",
        fill: "currentColor",
      }),
    ),
  H8 = P8,
  j8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M3.86339 12.4999C3.56384 12.4353 3.3054 12.356 3.08808 12.262C2.87075 12.168 2.69161 12.0506 2.55064 11.9096C2.40967 11.7745 2.30395 11.61 2.23346 11.4162C2.16885 11.2282 2.13655 11.0109 2.13655 10.7642L2.14536 9.92723C2.14536 9.61593 2.07781 9.38392 1.94272 9.23121C1.80762 9.07262 1.61379 8.99039 1.36123 8.98452H1V8.01537H1.37885C1.63142 8.00949 1.82231 7.9302 1.95153 7.77749C2.08075 7.62477 2.14536 7.38983 2.14536 7.07265L2.13655 6.23566C2.13655 5.75402 2.27164 5.37811 2.54183 5.10792C2.81789 4.83186 3.25841 4.62922 3.86339 4.5L4.1189 5.38104C3.8957 5.4574 3.71949 5.53376 3.59027 5.61012C3.46692 5.68647 3.37882 5.78926 3.32596 5.91848C3.27897 6.04183 3.25547 6.21216 3.25547 6.42949L3.27309 7.196C3.27309 7.53667 3.17618 7.82154 2.98235 8.05061C2.79439 8.27968 2.50071 8.44414 2.10131 8.54399V8.44708C2.50071 8.55868 2.79439 8.72901 2.98235 8.95808C3.17618 9.18716 3.27309 9.46909 3.27309 9.80389L3.25547 10.5704C3.25547 10.776 3.27897 10.9375 3.32596 11.055C3.37882 11.1783 3.46692 11.2782 3.59027 11.3545C3.71949 11.4309 3.8957 11.5072 4.1189 11.5836L3.86339 12.4999Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M5.05191 12.3765V4.53524H7.55408V5.57487H6.17965L6.23251 5.50439V11.4426L6.1444 11.3369H7.55408V12.3765H5.05191Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M8.43567 12.3765V11.3369H9.8101L9.75724 11.4074V5.46915L9.84534 5.57487H8.43567V4.53524H10.9378V12.3765H8.43567Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M12.1366 12.4999L11.8723 11.6188C12.0955 11.5425 12.2688 11.4661 12.3921 11.3898C12.5155 11.3134 12.6036 11.2106 12.6564 11.0814C12.7152 10.9581 12.7445 10.7877 12.7445 10.5704L12.7269 9.80389C12.7269 9.46322 12.8209 9.17835 13.0088 8.94927C13.2027 8.7202 13.4964 8.55574 13.8899 8.45589L13.8987 8.5528C13.4993 8.44121 13.2027 8.27087 13.0088 8.0418C12.8209 7.81273 12.7269 7.53079 12.7269 7.196L12.7445 6.42949C12.7445 6.21804 12.7181 6.05358 12.6652 5.9361C12.6124 5.81863 12.5243 5.72171 12.4009 5.64536C12.2776 5.569 12.1014 5.49264 11.8723 5.41629L12.1366 4.5C12.4362 4.55874 12.6917 4.63803 12.9031 4.73788C13.1204 4.83186 13.2996 4.94933 13.4406 5.0903C13.5874 5.22539 13.6931 5.38986 13.7577 5.58368C13.8282 5.77164 13.8635 5.98897 13.8635 6.23566L13.8546 7.07265C13.8546 7.38395 13.9222 7.6189 14.0573 7.77749C14.1924 7.9302 14.3862 8.00949 14.6388 8.01537H15V8.98452H14.6212C14.3686 8.99039 14.1777 9.06968 14.0485 9.2224C13.9193 9.37511 13.8546 9.61006 13.8546 9.92723L13.8635 10.7642C13.8635 11.2459 13.7254 11.6218 13.4494 11.892C13.1733 12.168 12.7357 12.3707 12.1366 12.4999Z",
        fill: "currentColor",
      }),
    ),
  F8 = j8,
  B8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M5.33325 1.83398V3.83398",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M10.6667 1.83398V3.83398",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M2.33325 6.56055H13.6666",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M14 11.4073V6.16732C14 4.16732 13 2.83398 10.6667 2.83398H5.33333C3 2.83398 2 4.16732 2 6.16732V11.834C2 13.834 3 15.1673 5.33333 15.1673H10.2467",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M2 6.59464L2 11.8346C2 13.8346 3 15.168 5.33333 15.168L10.6667 15.168C13 15.168 14 13.8346 14 11.8346L14 6.16797C14 4.16797 13 2.83464 10.6667 2.83464L5.75333 2.83464",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M10.4955 9H10.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M10.4955 12H10.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M5.4955 9H5.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M5.4955 12H5.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  $8 = B8,
  W8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M13 7.40909C13 11.2273 8 14.5 8 14.5C8 14.5 3 11.2273 3 7.40909C3 6.10712 3.52678 4.85847 4.46447 3.93784C5.40215 3.01721 6.67392 2.5 8 2.5C9.32608 2.5 10.5979 3.01721 11.5355 3.93784C12.4732 4.85847 13 6.10712 13 7.40909Z",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M8 9.5C9.10457 9.5 10 8.60457 10 7.5C10 6.39543 9.10457 5.5 8 5.5C6.89543 5.5 6 6.39543 6 7.5C6 8.60457 6.89543 9.5 8 9.5Z",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  V8 = W8,
  q8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M2.21021 4.09393C2.32237 3.84159 2.61785 3.72794 2.87019 3.84009L8.00046 6.12021L13.1307 3.84009C13.3831 3.72794 13.6785 3.84159 13.7907 4.09393C13.9029 4.34627 13.7892 4.64175 13.5369 4.7539L8.20353 7.12425C8.07426 7.18172 7.92666 7.18172 7.79739 7.12425L2.46405 4.7539C2.21171 4.64175 2.09806 4.34627 2.21021 4.09393Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.71387 1.35887C7.53267 0.994961 8.46733 0.994961 9.28613 1.35887L12.6195 2.84035C13.763 3.3486 14.5 4.48265 14.5 5.73408V10.2681C14.5 11.5195 13.763 12.6536 12.6195 13.1618L9.28613 14.6433C8.46733 15.0072 7.53267 15.0072 6.71387 14.6433L3.38056 13.1618C2.23699 12.6536 1.5 11.5195 1.5 10.2681V5.73408C1.5 4.48265 2.23699 3.3486 3.38056 2.84035L6.71387 1.35887ZM8.88 2.27268C8.31973 2.02369 7.68027 2.02369 7.12 2.27268L3.7867 3.75416C3.00425 4.10191 2.5 4.87784 2.5 5.73408V10.2681C2.5 11.1244 3.00426 11.9002 3.7867 12.248L7.12 13.7295C7.68027 13.9785 8.31973 13.9785 8.88 13.7295L12.2133 12.248C12.9957 11.9002 13.5 11.1244 13.5 10.2681V5.73408C13.5 4.87784 12.9957 4.10191 12.2133 3.75416L8.88 2.27268Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8 6.16406C8.27613 6.16406 8.5 6.38792 8.5 6.66406V13.9974C8.5 14.2735 8.27613 14.4974 8 14.4974C7.72387 14.4974 7.5 14.2735 7.5 13.9974V6.66406C7.5 6.38792 7.72387 6.16406 8 6.16406Z",
        fill: "currentColor",
      }),
    ),
  U8 = q8,
  Y8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M13.5445 3.32188L10.532 0.46875C10.2102 0.165625 9.79141 0 9.35078 0H3.61328C2.66641 0 1.89453 0.771875 1.89453 1.71875V14.2812C1.89453 15.2281 2.66641 16 3.61328 16H12.3633C13.3102 16 14.082 15.2281 14.082 14.2812V4.56875C14.082 4.1 13.8852 3.64375 13.5445 3.32188ZM12.6352 3.75H10.3008C10.2133 3.75 10.1445 3.68125 10.1445 3.59375V1.39375L12.6352 3.75ZM12.3633 15.0625H3.61328C3.18203 15.0625 2.83203 14.7125 2.83203 14.2812V1.71875C2.83203 1.2875 3.18203 0.9375 3.61328 0.9375H9.20703V3.59375C9.20703 4.19688 9.69766 4.6875 10.3008 4.6875H13.1445V14.2812C13.1445 14.7125 12.7945 15.0625 12.3633 15.0625Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M11.332 6.25H4.45703C4.19766 6.25 3.98828 6.45937 3.98828 6.71875C3.98828 6.97812 4.19766 7.1875 4.45703 7.1875H11.332C11.5914 7.1875 11.8008 6.97812 11.8008 6.71875C11.8008 6.45937 11.5914 6.25 11.332 6.25Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M11.332 8.75H4.45703C4.19766 8.75 3.98828 8.95937 3.98828 9.21875C3.98828 9.47812 4.19766 9.6875 4.45703 9.6875H11.332C11.5914 9.6875 11.8008 9.47812 11.8008 9.21875C11.8008 8.95937 11.5914 8.75 11.332 8.75Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M6.72891 11.25H4.45703C4.19766 11.25 3.98828 11.4594 3.98828 11.7188C3.98828 11.9781 4.19766 12.1875 4.45703 12.1875H6.72891C6.98828 12.1875 7.19766 11.9781 7.19766 11.7188C7.19766 11.4594 6.98828 11.25 6.72891 11.25Z",
        fill: "currentColor",
      }),
    ),
  Z8 = Y8,
  K8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M14.9459 3.20159C14.9296 2.34608 14.1459 1.58527 12.732 1.05955C11.4651 0.589349 9.7867 0.328125 8.01364 0.328125C6.23731 0.328125 4.56221 0.589349 3.292 1.05955C1.87813 1.58527 1.09119 2.34935 1.07812 3.20486C1.07812 3.21139 1.07812 3.22119 1.07812 3.22772V13.0889C1.07812 13.9575 1.86506 14.7249 3.292 15.2571C4.56221 15.7306 6.23731 15.9885 8.01364 15.9885C9.78996 15.9885 11.4651 15.7273 12.7353 15.2571C14.1622 14.7281 14.9491 13.9575 14.9491 13.0889V3.22772C14.9459 3.22119 14.9459 3.21139 14.9459 3.20159ZM13.9271 13.0889C13.9271 13.8563 11.6218 14.9698 8.01037 14.9698C4.39894 14.9698 2.09364 13.8563 2.09364 13.0889V11.3747C2.42017 11.5967 2.81853 11.7959 3.28874 11.9722C4.56221 12.4424 6.23731 12.7036 8.01364 12.7036C9.78996 12.7036 11.4683 12.4424 12.7353 11.9722C13.2055 11.7959 13.6038 11.5967 13.9304 11.3747V13.0889H13.9271ZM13.9271 9.78772C13.9271 9.79098 13.9271 9.79751 13.9271 9.80078C13.9271 10.5681 11.6218 11.6816 8.01037 11.6816C4.39894 11.6816 2.09364 10.5681 2.09364 9.80078V8.08649C2.42017 8.30853 2.81853 8.50772 3.28874 8.68404C4.55894 9.15751 6.23404 9.41547 8.01037 9.41547C9.7867 9.41547 11.4618 9.15425 12.732 8.68404C13.2022 8.51098 13.6006 8.30853 13.9271 8.08649V9.78772ZM13.9271 6.50282C13.9271 6.50608 13.9271 6.51261 13.9271 6.51588C13.9271 7.28323 11.6218 8.3967 8.01037 8.3967C4.39894 8.3967 2.09364 7.28323 2.09364 6.51588V4.80159C2.42017 5.02363 2.81853 5.22282 3.28874 5.39588C4.55894 5.86935 6.23404 6.12731 8.01037 6.12731C9.7867 6.12731 11.4618 5.86608 12.732 5.39588C13.1989 5.22282 13.6006 5.02037 13.9271 4.80159V6.50282ZM8.01364 5.10853C4.40221 5.10853 2.0969 3.99506 2.0969 3.22772C2.0969 2.46037 4.40221 1.3469 8.01364 1.3469C11.6251 1.3469 13.9304 2.46037 13.9304 3.22772C13.9271 3.99506 11.6251 5.10853 8.01364 5.10853Z",
        fill: "currentColor",
      }),
    ),
  X8 = K8,
  G8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M14.4866 5.36855C15.0957 6.86998 15.165 8.53621 14.6829 10.0831C14.2007 11.6299 13.1969 12.9616 11.8425 13.8511C10.4882 14.7405 8.86727 15.1325 7.25618 14.9604C5.64508 14.7882 4.1436 14.0624 3.00781 12.9069C1.87202 11.7514 1.17225 10.2376 1.02786 8.62381C0.883469 7.00999 1.30339 5.39605 2.21601 4.05724C3.12863 2.71844 4.47742 1.73768 6.03236 1.28224C7.58731 0.826792 9.25209 0.924866 10.7428 1.55973C10.7925 1.58093 10.8376 1.61172 10.8755 1.65034C10.9133 1.68896 10.9432 1.73466 10.9634 1.78482C10.9836 1.83499 10.9937 1.88864 10.9931 1.94271C10.9926 1.99678 10.9814 2.05022 10.9602 2.09997C10.939 2.14972 10.9082 2.1948 10.8696 2.23265C10.831 2.2705 10.7853 2.30037 10.7351 2.32056C10.685 2.34075 10.6313 2.35086 10.5772 2.35031C10.5232 2.34977 10.4697 2.33858 10.42 2.31738C9.78137 2.05018 9.10237 1.89233 8.41139 1.85044V2.23914C8.41139 2.34835 8.36801 2.45308 8.29079 2.53031C8.21357 2.60753 8.10883 2.65091 7.99963 2.65091C7.89042 2.65091 7.78569 2.60753 7.70846 2.53031C7.63124 2.45308 7.58786 2.34835 7.58786 2.23914V1.84962C6.23566 1.92718 4.94927 2.45909 3.93716 3.35914L4.21139 3.63914C4.27086 3.71844 4.29974 3.81652 4.29271 3.91539C4.28568 4.01426 4.24323 4.10728 4.17314 4.17736C4.10306 4.24745 4.01004 4.2899 3.91117 4.29693C3.8123 4.30396 3.71422 4.27508 3.63492 4.21561L3.35492 3.94138C2.45563 4.95419 1.92309 6.24001 1.84293 7.59208H2.23492C2.34413 7.59208 2.44887 7.63546 2.52609 7.71268C2.60331 7.7899 2.64669 7.89464 2.64669 8.00384C2.64669 8.11305 2.60331 8.21779 2.52609 8.29501C2.44887 8.37223 2.34413 8.41561 2.23492 8.41561H1.84293C1.92277 9.76775 2.45536 11.0537 3.35492 12.0663L3.63492 11.7921C3.71422 11.7326 3.8123 11.7037 3.91117 11.7108C4.01004 11.7178 4.10306 11.7602 4.17314 11.8303C4.24323 11.9004 4.28568 11.9934 4.29271 12.0923C4.29974 12.1912 4.27086 12.2893 4.21139 12.3685L3.93386 12.6461C4.94651 13.5477 6.23421 14.0805 7.58786 14.1581V13.7685C7.58786 13.6593 7.63124 13.5546 7.70846 13.4774C7.78569 13.4002 7.89042 13.3568 7.99963 13.3568C8.10883 13.3568 8.21357 13.4002 8.29079 13.4774C8.36801 13.5546 8.41139 13.6593 8.41139 13.7685V14.1581C9.76359 14.0805 11.05 13.5486 12.0621 12.6485L11.7879 12.3685C11.7284 12.2893 11.6995 12.1912 11.7065 12.0923C11.7136 11.9934 11.756 11.9004 11.8261 11.8303C11.8962 11.7602 11.9892 11.7178 12.0881 11.7108C12.1869 11.7037 12.285 11.7326 12.3643 11.7921L12.6419 12.0696C13.5435 11.0568 14.0768 9.76931 14.1555 8.41561H13.7643C13.6551 8.41561 13.5504 8.37223 13.4732 8.29501C13.3959 8.21779 13.3526 8.11305 13.3526 8.00384C13.3526 7.89464 13.3959 7.7899 13.4732 7.71268C13.5504 7.63546 13.6551 7.59208 13.7643 7.59208H14.1563C14.116 6.93556 13.97 6.28984 13.724 5.67985C13.7015 5.62939 13.6893 5.57492 13.6883 5.51968C13.6873 5.46444 13.6974 5.40957 13.7181 5.35832C13.7387 5.30707 13.7694 5.26049 13.8084 5.22137C13.8474 5.18224 13.8939 5.15137 13.9451 5.13058C13.9963 5.1098 14.0511 5.09953 14.1064 5.10038C14.1616 5.10124 14.2161 5.1132 14.2667 5.13556C14.3172 5.15791 14.3627 5.19021 14.4005 5.23052C14.4382 5.27083 14.4675 5.31834 14.4866 5.3702V5.36855ZM9.13363 6.28679L12.6501 2.7695C12.7274 2.69218 12.8323 2.64874 12.9416 2.64874C13.051 2.64874 13.1558 2.69218 13.2332 2.7695C13.3105 2.84682 13.3539 2.95168 13.3539 3.06103C13.3539 3.17037 13.3105 3.27524 13.2332 3.35256L9.71586 6.86902C9.94005 7.20496 10.0593 7.59997 10.0584 8.00384C10.0584 8.41104 9.9377 8.80909 9.71147 9.14766C9.48525 9.48624 9.1637 9.75012 8.7875 9.90595C8.4113 10.0618 7.99734 10.1025 7.59797 10.0231C7.1986 9.94367 6.83175 9.74758 6.54382 9.45965C6.25589 9.17172 6.0598 8.80487 5.98036 8.4055C5.90092 8.00613 5.9417 7.59217 6.09752 7.21597C6.25335 6.83977 6.51723 6.51822 6.85581 6.292C7.19438 6.06577 7.59243 5.94502 7.99963 5.94502C8.40303 5.94474 8.79742 6.06426 9.1328 6.28843L9.13363 6.28679ZM9.23492 8.00384C9.23492 7.75953 9.16247 7.5207 9.02674 7.31755C8.891 7.11441 8.69807 6.95608 8.47235 6.86258C8.24663 6.76909 7.99826 6.74462 7.75863 6.79229C7.51901 6.83995 7.2989 6.9576 7.12614 7.13036C6.95338 7.30312 6.83573 7.52323 6.78807 7.76285C6.7404 8.00247 6.76487 8.25085 6.85836 8.47657C6.95186 8.70229 7.11019 8.89522 7.31333 9.03095C7.51648 9.16669 7.75531 9.23914 7.99963 9.23914C8.32725 9.23914 8.64145 9.10899 8.87311 8.87733C9.10477 8.64567 9.23492 8.33146 9.23492 8.00384Z",
        fill: "currentColor",
      }),
    ),
  Q8 = G8,
  J8 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 28 28",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3.66065 10.0305L7.83899 6.409C7.78126 6.25246 7.74974 6.08317 7.74974 5.90684C7.74974 5.09996 8.41001 4.4461 9.22481 4.4461C10.0396 4.4461 10.6746 5.07534 10.6994 5.86067L14.0017 7.0057C14.2721 6.6913 14.6753 6.49167 15.1251 6.49167C15.3791 6.49167 15.618 6.55499 15.8262 6.66711L19.6333 3.44619C19.5792 3.29448 19.5499 3.13091 19.5499 2.96074C19.5499 2.15386 20.2101 1.5 21.0249 1.5C21.8397 1.5 22.5 2.15386 22.5 2.96074C22.5 3.76762 21.8397 4.42148 21.0249 4.42148C20.7709 4.42148 20.5321 4.35816 20.3238 4.24603L16.5167 7.46696C16.5709 7.61866 16.6002 7.78224 16.6002 7.95241C16.6002 8.75929 15.9399 9.41315 15.1251 9.41315C14.3103 9.41315 13.6753 8.78391 13.6509 7.99858L10.3486 6.85355C10.0782 7.16795 9.6755 7.36758 9.22525 7.36758C8.97748 7.36758 8.74392 7.3069 8.53922 7.20005L4.36089 10.8216C4.41862 10.9781 4.45014 11.1474 4.45014 11.3237C4.45014 12.1306 3.78987 12.7845 2.97507 12.7845C2.16027 12.7845 1.5 12.1306 1.5 11.3237C1.5 10.5168 2.16027 9.86298 2.97507 9.86298C3.22284 9.86298 3.45596 9.92366 3.66065 10.0305ZM19.9024 7.30646C19.5356 7.30646 19.2364 7.60283 19.2364 7.96604V21.4267C19.2364 21.7899 19.5356 22.0862 19.9024 22.0862H20.8149C21.1817 22.0862 21.4809 21.7899 21.4809 21.4267V7.9656C21.4809 7.60239 21.1817 7.30602 20.8149 7.30602L19.9024 7.30646ZM14.0021 12.6855C13.6354 12.6855 13.3361 12.9819 13.3361 13.3451V21.5647C13.3361 21.9279 13.6354 22.2243 14.0021 22.2243H14.9146C15.2814 22.2243 15.5807 21.9279 15.5807 21.5647V13.3451C15.5807 12.9819 15.2814 12.6855 14.9146 12.6855H14.0021ZM8.1023 10.7543C7.73553 10.7543 7.43625 11.0507 7.43625 11.4139V21.7028C7.43625 22.066 7.73553 22.3624 8.1023 22.3624H9.01478C9.38155 22.3624 9.68083 22.066 9.68083 21.7028V11.4134C9.68083 11.0502 9.38155 10.7538 9.01478 10.7538L8.1023 10.7543ZM2.20246 16.4315H3.11494C3.48171 16.4315 3.78099 16.7278 3.78099 17.091V21.8404C3.78099 22.2036 3.48171 22.5 3.11494 22.5H2.20246C1.83569 22.5 1.53641 22.2036 1.53641 21.8404V17.091C1.53641 16.7278 1.83569 16.4315 2.20246 16.4315Z",
        fill: "currentColor",
      }),
    ),
  e9 = J8,
  t9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M13.674 3.5H11.527L11.277 2.75C11.1565 2.38583 10.9242 2.06897 10.6131 1.84453C10.302 1.62009 9.92808 1.49953 9.5445 1.5H6.4555C6.07202 1.49971 5.69821 1.62035 5.38726 1.84477C5.0763 2.06919 4.84403 2.38596 4.7235 2.75L4.473 3.5H2.326C1.84188 3.50053 1.37773 3.69308 1.03541 4.03541C0.693081 4.37774 0.500529 4.84188 0.5 5.326V12.676C0.501058 13.1598 0.693843 13.6234 1.03611 13.9653C1.37838 14.3072 1.84222 14.4995 2.326 14.5H13.676C14.1598 14.4989 14.6234 14.3062 14.9653 13.9639C15.3072 13.6216 15.4995 13.1578 15.5 12.674V5.324C15.4989 4.84023 15.3062 4.3766 14.9639 4.0347C14.6216 3.69281 14.1578 3.50053 13.674 3.5ZM14.5 12.674C14.4997 12.893 14.4126 13.1029 14.2578 13.2578C14.1029 13.4126 13.893 13.4997 13.674 13.5H2.326C2.10701 13.4997 1.89707 13.4126 1.74222 13.2578C1.58737 13.1029 1.50026 12.893 1.5 12.674V5.324C1.50079 5.10536 1.58814 4.89593 1.74293 4.74152C1.89772 4.5871 2.10736 4.50026 2.326 4.5H4.8335C4.9384 4.49992 5.04061 4.46685 5.12568 4.40548C5.21074 4.3441 5.27435 4.25752 5.3075 4.158L5.672 3.0645C5.72673 2.90003 5.83189 2.75697 5.97253 2.65564C6.11317 2.55431 6.28216 2.49985 6.4555 2.5H9.5445C9.71792 2.49981 9.88699 2.55431 10.0277 2.65575C10.1683 2.75718 10.2734 2.90039 10.328 3.065L10.6925 4.158C10.7256 4.25752 10.7893 4.3441 10.8743 4.40548C10.9594 4.46685 11.0616 4.49992 11.1665 4.5H13.674C13.893 4.50027 14.1029 4.58738 14.2578 4.74222C14.4126 4.89707 14.4997 5.10701 14.5 5.326V12.674Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M8 5C7.25832 5 6.5333 5.21993 5.91661 5.63199C5.29993 6.04404 4.81928 6.62971 4.53545 7.31494C4.25162 8.00016 4.17736 8.75416 4.32206 9.48159C4.46675 10.209 4.8239 10.8772 5.34835 11.4017C5.8728 11.9261 6.54098 12.2833 7.26841 12.4279C7.99584 12.5726 8.74984 12.4984 9.43506 12.2145C10.1203 11.9307 10.706 11.4501 11.118 10.8334C11.5301 10.2167 11.75 9.49168 11.75 8.75C11.7489 7.75576 11.3535 6.80255 10.6505 6.09952C9.94745 5.39649 8.99424 5.00106 8 5ZM8 11.5C7.4561 11.5 6.92442 11.3387 6.47218 11.0365C6.01995 10.7344 5.66747 10.3049 5.45933 9.80238C5.25119 9.29988 5.19673 8.74695 5.30284 8.2135C5.40895 7.68005 5.67086 7.19005 6.05546 6.80546C6.44005 6.42086 6.93006 6.15895 7.4635 6.05284C7.99695 5.94673 8.54988 6.00119 9.05238 6.20933C9.55488 6.41747 9.98437 6.76995 10.2865 7.22218C10.5887 7.67442 10.75 8.2061 10.75 8.75C10.7492 9.4791 10.4592 10.1781 9.94367 10.6937C9.42811 11.2092 8.7291 11.4992 8 11.5Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M13 6.5C13.2761 6.5 13.5 6.27614 13.5 6C13.5 5.72386 13.2761 5.5 13 5.5C12.7239 5.5 12.5 5.72386 12.5 6C12.5 6.27614 12.7239 6.5 13 6.5Z",
        fill: "currentColor",
      }),
    ),
  n9 = t9,
  o9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement(
        "g",
        { clipPath: "url(#clip0_13119_16577)" },
        /* @__PURE__ */ F.createElement(
          "mask",
          {
            id: "mask0_13119_16577",
            style: {
              maskType: "luminance",
            },
            maskUnits: "userSpaceOnUse",
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
          /* @__PURE__ */ F.createElement("path", {
            d: "M0 9.53674e-07H16V16H0V9.53674e-07Z",
            fill: "white",
          }),
        ),
        /* @__PURE__ */ F.createElement(
          "g",
          { mask: "url(#mask0_13119_16577)" },
          /* @__PURE__ */ F.createElement("path", {
            d: "M0.46875 15.5312H15.5312",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M3 11.7812H1.75C1.57741 11.7812 1.4375 11.9212 1.4375 12.0938V15.5312H3.3125V12.0938C3.3125 11.9212 3.17259 11.7812 3 11.7812Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M6.75 10.6562H5.5C5.32741 10.6562 5.1875 10.7962 5.1875 10.9688V15.5312H7.0625V10.9688C7.0625 10.7962 6.92259 10.6562 6.75 10.6562Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M10.5 8.9375H9.25C9.07741 8.9375 8.9375 9.07741 8.9375 9.25V15.5312H10.8125V9.25C10.8125 9.07741 10.6726 8.9375 10.5 8.9375Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M14.25 5.8125H13C12.8274 5.8125 12.6875 5.95241 12.6875 6.125V15.5312H14.5625V6.125C14.5625 5.95241 14.4226 5.8125 14.25 5.8125Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M0.46875 9.60156C6.62566 9.60156 12.7826 4.89466 14.7636 0.467189",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M11.8994 1.23884L14.7641 0.47125L15.5317 3.33594",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
        ),
      ),
      /* @__PURE__ */ F.createElement(
        "defs",
        null,
        /* @__PURE__ */ F.createElement(
          "clipPath",
          { id: "clip0_13119_16577" },
          /* @__PURE__ */ F.createElement("rect", {
            width: 16,
            height: 16,
            fill: "white",
          }),
        ),
      ),
    ),
  r9 = o9,
  a9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement(
        "g",
        { clipPath: "url(#clip0_13132_13629)" },
        /* @__PURE__ */ F.createElement("path", {
          d: "M14.9389 11.3569L12.3125 9.88281L14.9389 8.40875C15.2577 8.22978 15.2573 7.76997 14.9389 7.59122L12.3126 6.11709L14.9388 4.64313C15.2577 4.46416 15.2573 4.00434 14.9388 3.82559L8.2295 0.06C8.08697 -0.02 7.91315 -0.02 7.77062 0.06L1.06128 3.82562C0.742402 4.00462 0.742871 4.46444 1.06128 4.64316L3.68762 6.11719L1.06125 7.59122C0.742371 7.77022 0.74284 8.23003 1.06125 8.40875L3.68762 9.88281L1.06125 11.3569C0.742371 11.5359 0.74284 11.9957 1.06125 12.1744L7.77062 15.94C7.91309 16.02 8.08697 16.02 8.2295 15.94L14.9389 12.1744C15.2577 11.9954 15.2573 11.5356 14.9389 11.3569ZM8.00006 1.00628L13.7517 4.23438L8.00006 7.46247L2.24843 4.23438L8.00006 1.00628ZM4.6454 6.65472L7.77065 8.40875C7.91312 8.48872 8.087 8.48875 8.22953 8.40875L11.3549 6.65462L13.7518 7.99997L8.00006 11.2281L2.24843 8L4.6454 6.65472ZM8.00006 14.9937L2.2484 11.7656L4.64537 10.4203L7.77062 12.1744C7.91309 12.2543 8.08697 12.2544 8.2295 12.1744L11.3547 10.4203L13.7517 11.7656L8.00006 14.9937Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ F.createElement("path", {
          d: "M8 10.1484C8.25888 10.1484 8.46875 9.93857 8.46875 9.67969C8.46875 9.4208 8.25888 9.21094 8 9.21094C7.74112 9.21094 7.53125 9.4208 7.53125 9.67969C7.53125 9.93857 7.74112 10.1484 8 10.1484Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ F.createElement("path", {
          d: "M6.2832 9.25C6.54209 9.25 6.75195 9.04013 6.75195 8.78125C6.75195 8.52237 6.54209 8.3125 6.2832 8.3125C6.02432 8.3125 5.81445 8.52237 5.81445 8.78125C5.81445 9.04013 6.02432 9.25 6.2832 9.25Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ F.createElement("path", {
          d: "M4.56738 8.39062C4.82627 8.39062 5.03613 8.18076 5.03613 7.92188C5.03613 7.66299 4.82627 7.45312 4.56738 7.45312C4.3085 7.45312 4.09863 7.66299 4.09863 7.92188C4.09863 8.18076 4.3085 8.39062 4.56738 8.39062Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ F.createElement("path", {
          d: "M9.7168 9.25C9.97568 9.25 10.1855 9.04013 10.1855 8.78125C10.1855 8.52237 9.97568 8.3125 9.7168 8.3125C9.45791 8.3125 9.24805 8.52237 9.24805 8.78125C9.24805 9.04013 9.45791 9.25 9.7168 9.25Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ F.createElement("path", {
          d: "M11.4326 8.39062C11.6915 8.39062 11.9014 8.18076 11.9014 7.92188C11.9014 7.66299 11.6915 7.45312 11.4326 7.45312C11.1737 7.45312 10.9639 7.66299 10.9639 7.92188C10.9639 8.18076 11.1737 8.39062 11.4326 8.39062Z",
          fill: "currentColor",
        }),
      ),
      /* @__PURE__ */ F.createElement(
        "defs",
        null,
        /* @__PURE__ */ F.createElement(
          "clipPath",
          { id: "clip0_13132_13629" },
          /* @__PURE__ */ F.createElement("rect", {
            width: 16,
            height: 16,
            fill: "white",
          }),
        ),
      ),
    ),
  i9 = a9,
  s9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 11,
        height: 6,
        viewBox: "0 0 11 6",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M0.812951 5.52021C0.990462 5.69772 1.26824 5.71386 1.46398 5.56862L1.52006 5.52021L5.83317 1.20732L10.1463 5.52021C10.3238 5.69772 10.6016 5.71386 10.7973 5.56862L10.8534 5.52021C11.0309 5.3427 11.047 5.06492 10.9018 4.86918L10.8534 4.8131L6.18672 0.146439C6.00921 -0.031072 5.73144 -0.047207 5.5357 0.0980275L5.47962 0.146439L0.812951 4.8131C0.617688 5.00836 0.617688 5.32495 0.812951 5.52021Z",
        fill: "currentColor",
      }),
    ),
  l9 = s9,
  c9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 11,
        height: 6,
        viewBox: "0 0 11 6",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M0.812951 0.47979C0.990462 0.302279 1.26824 0.286142 1.46398 0.431378L1.52006 0.47979L5.83317 4.79268L10.1463 0.47979C10.3238 0.302279 10.6016 0.286142 10.7973 0.431378L10.8534 0.47979C11.0309 0.657301 11.047 0.935077 10.9018 1.13082L10.8534 1.1869L6.18672 5.85356C6.00921 6.03107 5.73144 6.04721 5.5357 5.90198L5.47962 5.85356L0.812951 1.1869C0.617688 0.991635 0.617688 0.675052 0.812951 0.47979Z",
        fill: "currentColor",
      }),
    ),
  u9 = c9,
  d9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 16,
        height: 16,
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement(
        "g",
        { id: "x-close" },
        /* @__PURE__ */ F.createElement("path", {
          id: "Icon",
          d: "M12 4L4 12M4 4L12 12",
          stroke: "currentColor",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      ),
    ),
  f9 = d9,
  g9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 10 10",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement(
        "g",
        { clipPath: "url(#clip0_8292_48040)" },
        /* @__PURE__ */ F.createElement("path", {
          d: "M6.46776 1.25L6.46776 1.66667L4.16929 1.66667C4.11388 1.66667 4.06073 1.68862 4.02154 1.72769C3.98236 1.76676 3.96034 1.81975 3.96034 1.875L3.96034 4.79167L2.49768 4.79167L2.49768 4.375C2.49768 4.20924 2.43164 4.05027 2.31408 3.93306C2.19652 3.81585 2.03708 3.75 1.87083 3.75L0.826073 3.75C0.65982 3.75 0.500378 3.81585 0.38282 3.93306C0.265262 4.05027 0.199219 4.20924 0.199219 4.375L0.199219 5.625C0.199219 5.79076 0.265262 5.94973 0.38282 6.06694C0.500378 6.18415 0.659821 6.25 0.826073 6.25L1.87083 6.25C2.03708 6.25 2.19652 6.18415 2.31408 6.06694C2.43164 5.94973 2.49768 5.79076 2.49768 5.625L2.49768 5.20833L3.96034 5.20833L3.96034 8.125C3.96034 8.18025 3.98236 8.23324 4.02154 8.27231C4.06073 8.31138 4.11388 8.33333 4.16929 8.33333L6.46776 8.33333L6.46776 8.75C6.46776 8.91576 6.5338 9.07473 6.65136 9.19194C6.76892 9.30915 6.92836 9.375 7.09461 9.375L8.13937 9.375C8.30562 9.375 8.46506 9.30915 8.58262 9.19194C8.70018 9.07473 8.76622 8.91576 8.76622 8.75L8.76622 7.5C8.76622 7.33424 8.70018 7.17527 8.58262 7.05806C8.46506 6.94085 8.30562 6.875 8.13937 6.875L7.09461 6.875C6.92836 6.875 6.76892 6.94085 6.65136 7.05806C6.5338 7.17527 6.46776 7.33424 6.46776 7.5L6.46776 7.91667L4.37825 7.91667L4.37825 5.20833L6.46776 5.20833L6.46776 5.625C6.46776 5.79076 6.5338 5.94973 6.65136 6.06694C6.76892 6.18415 6.92836 6.25 7.09461 6.25L8.13937 6.25C8.30562 6.25 8.46506 6.18415 8.58262 6.06694C8.70018 5.94973 8.76622 5.79076 8.76622 5.625L8.76622 4.375C8.76622 4.20924 8.70018 4.05027 8.58262 3.93306C8.46506 3.81585 8.30562 3.75 8.13937 3.75L7.09461 3.75C6.92836 3.75 6.76892 3.81585 6.65136 3.93306C6.5338 4.05027 6.46776 4.20924 6.46776 4.375L6.46776 4.79167L4.37825 4.79167L4.37825 2.08333L6.46776 2.08333L6.46776 2.5C6.46776 2.66576 6.5338 2.82473 6.65136 2.94194C6.76892 3.05915 6.92836 3.125 7.09461 3.125L8.13937 3.125C8.30562 3.125 8.46506 3.05915 8.58262 2.94194C8.70018 2.82473 8.76622 2.66576 8.76622 2.5L8.76622 1.25C8.76622 1.08424 8.70018 0.925271 8.58262 0.80806C8.46506 0.69085 8.30562 0.625002 8.13937 0.625002L7.09461 0.625002C6.92836 0.625002 6.76892 0.69085 6.65136 0.80806C6.5338 0.925271 6.46776 1.08424 6.46776 1.25ZM1.87083 5.83333L0.826073 5.83333C0.770655 5.83333 0.717508 5.81138 0.678322 5.77232C0.639136 5.73324 0.617121 5.68025 0.617121 5.625L0.617121 4.375C0.617121 4.31975 0.639136 4.26676 0.678322 4.22769C0.717508 4.18862 0.770655 4.16667 0.826073 4.16667L1.87083 4.16667C1.92625 4.16667 1.97939 4.18862 2.01858 4.22769C2.05777 4.26676 2.07978 4.31975 2.07978 4.375L2.07978 5.625C2.07978 5.68025 2.05777 5.73324 2.01858 5.77231C1.97939 5.81138 1.92625 5.83333 1.87083 5.83333ZM7.09461 7.29167L8.13937 7.29167C8.19479 7.29167 8.24793 7.31362 8.28712 7.35269C8.32631 7.39176 8.34832 7.44475 8.34832 7.5L8.34832 8.75C8.34832 8.80525 8.32631 8.85824 8.28712 8.89731C8.24793 8.93638 8.19479 8.95833 8.13937 8.95833L7.09461 8.95833C7.0392 8.95833 6.98605 8.93638 6.94686 8.89731C6.90768 8.85824 6.88566 8.80525 6.88566 8.75L6.88566 7.5C6.88566 7.44475 6.90768 7.39176 6.94686 7.35269C6.98605 7.31362 7.0392 7.29167 7.09461 7.29167ZM7.09461 4.16667L8.13937 4.16667C8.19479 4.16667 8.24793 4.18862 8.28712 4.22769C8.32631 4.26676 8.34832 4.31975 8.34832 4.375L8.34832 5.625C8.34832 5.68025 8.32631 5.73324 8.28712 5.77231C8.24793 5.81138 8.19479 5.83333 8.13937 5.83333L7.09461 5.83333C7.0392 5.83333 6.98605 5.81138 6.94686 5.77231C6.90768 5.73324 6.88566 5.68025 6.88566 5.625L6.88566 4.375C6.88566 4.31975 6.90768 4.26676 6.94686 4.22769C6.98605 4.18862 7.0392 4.16667 7.09461 4.16667ZM8.13937 1.04167C8.19479 1.04167 8.24793 1.06362 8.28712 1.10269C8.32631 1.14176 8.34832 1.19475 8.34832 1.25L8.34832 2.5C8.34832 2.55525 8.32631 2.60825 8.28712 2.64732C8.24793 2.68639 8.19479 2.70833 8.13937 2.70833L7.09461 2.70833C7.0392 2.70833 6.98605 2.68639 6.94686 2.64732C6.90768 2.60825 6.88566 2.55525 6.88566 2.5L6.88566 1.25C6.88566 1.19475 6.90768 1.14176 6.94686 1.10269C6.98605 1.06362 7.0392 1.04167 7.09461 1.04167L8.13937 1.04167Z",
          fill: "white",
        }),
      ),
      /* @__PURE__ */ F.createElement(
        "defs",
        null,
        /* @__PURE__ */ F.createElement(
          "clipPath",
          { id: "clip0_8292_48040" },
          /* @__PURE__ */ F.createElement("rect", {
            width: 10,
            height: 10,
            fill: "white",
            transform: "translate(0 10) rotate(-90)",
          }),
        ),
      ),
    ),
  p9 = g9,
  h9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 12,
        height: 13,
        viewBox: "0 0 12 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("circle", {
        cx: 6,
        cy: 6.5,
        r: 6,
        fill: "#FFCE73",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M6.0013 7.33073C6.46154 7.33073 6.83464 6.95763 6.83464 6.4974C6.83464 6.03716 6.46154 5.66406 6.0013 5.66406C5.54106 5.66406 5.16797 6.03716 5.16797 6.4974C5.16797 6.95763 5.54106 7.33073 6.0013 7.33073Z",
        fill: "#082247",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M10.1423 6.3533C9.47099 4.65934 7.82261 3.55656 6.00066 3.58248C4.17871 3.55656 2.53033 4.65934 1.85899 6.3533C1.82565 6.44767 1.82565 6.55062 1.85899 6.64497C2.53033 8.33892 4.17871 9.4417 6.00066 9.41581C7.82261 9.4417 9.47099 8.33892 10.1423 6.64497C10.1757 6.55059 10.1757 6.44767 10.1423 6.3533ZM6.00157 8.16581H6.00066C5.08017 8.16581 4.33399 7.41961 4.33399 6.49914C4.33399 5.57866 5.08017 4.83248 6.00066 4.83248C6.92114 4.83248 7.66732 5.57866 7.66732 6.49914C7.66758 7.41935 6.92181 8.16556 6.00157 8.16581Z",
        fill: "#082247",
      }),
    ),
  m9 = h9,
  b9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("rect", {
        x: -0.5,
        y: 0.5,
        width: 31,
        height: 31,
        rx: 4.5,
        transform: "matrix(-1 0 0 1 31 0)",
        stroke: "#8390A3",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M16.0379 8.91337L16.0378 8.91338L16.0358 8.91024C15.9266 8.74528 15.7106 8.57407 15.432 8.47559C15.1577 8.37865 14.8682 8.36814 14.6194 8.46108L14.6118 8.46395L14.604 8.46656C14.0151 8.66487 13.6311 9.34149 13.75 9.89628L13.7528 9.90933L13.7549 9.92252L14.1882 12.6475L14.1884 12.6475L14.1901 12.66C14.2411 13.0429 14.1382 13.4063 13.9081 13.6906L13.9003 13.7002L13.8921 13.7094C13.6598 13.9691 13.3179 14.1344 12.9444 14.1344H9.51945C8.99591 14.1344 8.59378 14.3433 8.36901 14.6569C8.16112 14.9534 8.10247 15.362 8.26606 15.8266L8.26617 15.8266L8.26948 15.8367L10.3195 22.0784L10.3251 22.0955L10.3295 22.1131C10.5282 22.9078 11.4403 23.6094 12.3444 23.6094H15.5944C15.8229 23.6094 16.1102 23.5692 16.3764 23.4897C16.6529 23.4071 16.8467 23.3 16.9409 23.2058L16.9634 23.1833L16.9885 23.1639L18.0547 22.3393C18.0548 22.3392 18.0548 22.3392 18.0549 22.3391C18.3435 22.1152 18.5111 21.7765 18.5111 21.4177V12.951C18.5111 12.7179 18.4412 12.4895 18.3123 12.2958C18.3121 12.2956 18.3119 12.2953 18.3118 12.2951L16.0379 8.91337Z",
        stroke: "#8390A3",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M22.5187 11.8263H21.6604C21.0609 11.8263 20.7659 11.9458 20.6121 12.0919C20.4646 12.232 20.3438 12.4961 20.3438 13.0513V21.4346C20.3438 21.9949 20.465 22.2611 20.6128 22.402C20.7664 22.5485 21.0608 22.668 21.6604 22.668H22.5187C23.1184 22.668 23.4128 22.5485 23.5664 22.402C23.7141 22.2611 23.8354 21.9949 23.8354 21.4346V13.0596C23.8354 12.4994 23.7141 12.2332 23.5664 12.0923C23.4128 11.9458 23.1184 11.8263 22.5187 11.8263Z",
        stroke: "#8390A3",
      }),
    ),
  y9 = b9,
  v9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("rect", {
        x: 0.5,
        y: -0.5,
        width: 31,
        height: 31,
        rx: 4.5,
        transform: "matrix(1 0 0 -1 0 31)",
        stroke: "#8390A3",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M12.2334 10.7084L14.8167 8.70844C15.1501 8.37511 15.9001 8.20844 16.4001 8.20844H19.5667C20.5667 8.20844 21.6501 8.95844 21.9001 9.95844L23.9001 16.0418C24.3167 17.2084 23.5667 18.2084 22.3167 18.2084H18.9834C18.4834 18.2084 18.0667 18.6251 18.1501 19.2084L18.5667 21.8751C18.7334 22.6251 18.2334 23.4584 17.4834 23.7084C16.8167 23.9584 15.9834 23.6251 15.6501 23.1251L12.2334 18.0418",
        stroke: "#8390A3",
        strokeWidth: 1.2,
        strokeMiterlimit: 10,
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M7.9834 10.7083V18.8749C7.9834 20.0416 8.4834 20.4583 9.65007 20.4583H10.4834C11.6501 20.4583 12.1501 20.0416 12.1501 18.8749V10.7083C12.1501 9.54158 11.6501 9.12492 10.4834 9.12492H9.65007C8.4834 9.12492 7.9834 9.54158 7.9834 10.7083Z",
        stroke: "#8390A3",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  w9 = v9,
  x9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("rect", {
        width: 32,
        height: 32,
        rx: 5,
        transform: "matrix(-1 0 0 1 32 0)",
        fill: "#3F8CFF",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M19.0111 21.4177V12.951C19.0111 12.6177 18.9111 12.2927 18.7278 12.0177L16.4528 8.63437C16.0944 8.09271 15.2028 7.70937 14.4444 7.99271C13.6278 8.26771 13.0861 9.18437 13.2611 10.001L13.6944 12.726C13.7278 12.976 13.6611 13.201 13.5194 13.376C13.3778 13.5344 13.1694 13.6344 12.9444 13.6344H9.51945C8.86111 13.6344 8.29445 13.901 7.96111 14.3677C7.64445 14.8177 7.58611 15.401 7.79445 15.9927L9.84445 22.2344C10.1028 23.2677 11.2278 24.1094 12.3444 24.1094H15.5944C16.1528 24.1094 16.9361 23.9177 17.2944 23.5594L18.3611 22.7344C18.7694 22.4177 19.0111 21.9344 19.0111 21.4177Z",
        fill: "white",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M21.6604 11.3263H22.5187C23.8104 11.3263 24.3354 11.8263 24.3354 13.0596V21.4346C24.3354 22.668 23.8104 23.168 22.5187 23.168H21.6604C20.3688 23.168 19.8438 22.668 19.8438 21.4346V13.0513C19.8438 11.8263 20.3688 11.3263 21.6604 11.3263Z",
        fill: "white",
      }),
    ),
  S9 = x9,
  C9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("rect", {
        x: 0.5,
        y: -0.5,
        width: 31,
        height: 31,
        rx: 4.5,
        transform: "matrix(1 0 0 -1 0 31)",
        fill: "#247EFE",
        stroke: "#247EFE",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M12.2334 10.7084L14.8167 8.70844C15.1501 8.37511 15.9001 8.20844 16.4001 8.20844H19.5667C20.5667 8.20844 21.6501 8.95844 21.9001 9.95844L23.9001 16.0418C24.3167 17.2084 23.5667 18.2084 22.3167 18.2084H18.9834C18.4834 18.2084 18.0667 18.6251 18.1501 19.2084L18.5667 21.8751C18.7334 22.6251 18.2334 23.4584 17.4834 23.7084C16.8167 23.9584 15.9834 23.6251 15.6501 23.1251L12.2334 18.0418",
        fill: "white",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M7.9834 10.7083V18.8749C7.9834 20.0416 8.4834 20.4583 9.65007 20.4583H10.4834C11.6501 20.4583 12.1501 20.0416 12.1501 18.8749V10.7083C12.1501 9.54158 11.6501 9.12492 10.4834 9.12492H9.65007C8.4834 9.12492 7.9834 9.54158 7.9834 10.7083Z",
        fill: "white",
        stroke: "#247EFE",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  E9 = C9,
  _9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 16,
        height: 16,
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement(
        "g",
        { clipPath: "url(#clip0_17179_3800)" },
        /* @__PURE__ */ F.createElement(
          "mask",
          {
            id: "mask0_17179_3800",
            style: {
              maskType: "luminance",
            },
            maskUnits: "userSpaceOnUse",
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
          /* @__PURE__ */ F.createElement("path", {
            d: "M16 0H0V16H16V0Z",
            fill: "white",
          }),
        ),
        /* @__PURE__ */ F.createElement(
          "g",
          { mask: "url(#mask0_17179_3800)" },
          /* @__PURE__ */ F.createElement("path", {
            d: "M13.581 0C12.2681 0 11.2 1.0681 11.2 2.38095C11.2 3.69381 12.2681 4.7619 13.581 4.7619C14.8939 4.7619 15.9619 3.69381 15.9619 2.38095C15.9619 1.0681 14.8939 0 13.581 0ZM13.581 3.96826C12.7057 3.96826 11.9937 3.25619 11.9937 2.38095C11.9937 1.50571 12.7057 0.793651 13.581 0.793651C14.4562 0.793651 15.1683 1.50571 15.1683 2.38095C15.1683 3.25619 14.4562 3.96826 13.581 3.96826Z",
            fill: "currentColor",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M13.581 11.1992C12.2681 11.1992 11.2 12.2673 11.2 13.5802C11.2 14.8931 12.2681 15.9611 13.581 15.9611C14.8939 15.9611 15.9619 14.8931 15.9619 13.5802C15.9619 12.2673 14.8939 11.1992 13.581 11.1992ZM13.581 15.1675C12.7057 15.1675 11.9937 14.4554 11.9937 13.5802C11.9937 12.7049 12.7057 11.9929 13.581 11.9929C14.4562 11.9929 15.1683 12.7049 15.1683 13.5802C15.1683 14.4554 14.4562 15.1675 13.581 15.1675Z",
            fill: "currentColor",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M2.38095 0C1.0681 0 0 1.0681 0 2.38095C0 3.69381 1.0681 4.7619 2.38095 4.7619C3.69381 4.7619 4.7619 3.69381 4.7619 2.38095C4.7619 1.0681 3.69381 0 2.38095 0ZM2.38095 3.96826C1.50571 3.96826 0.793651 3.25619 0.793651 2.38095C0.793651 1.50571 1.50571 0.793651 2.38095 0.793651C3.25619 0.793651 3.96826 1.50571 3.96826 2.38095C3.96826 3.25619 3.25619 3.96826 2.38095 3.96826Z",
            fill: "currentColor",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M2.38095 11.1992C1.0681 11.1992 0 12.2673 0 13.5802C0 14.8931 1.0681 15.9611 2.38095 15.9611C3.69381 15.9611 4.7619 14.8931 4.7619 13.5802C4.7619 12.2673 3.69381 11.1992 2.38095 11.1992ZM2.38095 15.1675C1.50571 15.1675 0.793651 14.4554 0.793651 13.5802C0.793651 12.7049 1.50571 11.9929 2.38095 11.9929C3.25619 11.9929 3.96826 12.7049 3.96826 13.5802C3.96826 14.4554 3.25619 15.1675 2.38095 15.1675Z",
            fill: "currentColor",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M4.15473 12.6454L12.64 4.16016L11.7349 3.25506L3.24964 11.7403L4.15473 12.6454Z",
            fill: "currentColor",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M3.24958 4.15925L11.7349 12.6445L12.64 11.7394L4.15468 3.25415L3.24958 4.15925Z",
            fill: "currentColor",
          }),
          /* @__PURE__ */ F.createElement("path", {
            d: "M7.97714 10.8334C9.5551 10.8334 10.8343 9.55424 10.8343 7.97628C10.8343 6.39833 9.5551 5.11914 7.97714 5.11914C6.39918 5.11914 5.12 6.39833 5.12 7.97628C5.12 9.55424 6.39918 10.8334 7.97714 10.8334Z",
            fill: "currentColor",
          }),
        ),
      ),
      /* @__PURE__ */ F.createElement(
        "defs",
        null,
        /* @__PURE__ */ F.createElement(
          "clipPath",
          { id: "clip0_17179_3800" },
          /* @__PURE__ */ F.createElement("rect", {
            width: 16,
            height: 16,
            fill: "white",
          }),
        ),
      ),
    ),
  k9 = _9,
  A9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 16,
        height: 16,
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M7.95106 12.3437C8.12161 12.1731 8.13712 11.9062 7.99757 11.7182L7.95106 11.6643L3.80722 7.52022L7.95106 3.37616C8.12161 3.20561 8.13712 2.93872 7.99757 2.75065L7.95106 2.69677C7.78051 2.52622 7.51362 2.51071 7.32555 2.65026L7.27167 2.69677L2.78792 7.18052C2.61736 7.35108 2.60186 7.61797 2.7414 7.80603L2.78792 7.85992L7.27167 12.3437C7.45928 12.5313 7.76345 12.5313 7.95106 12.3437Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M12.3433 12.3437C12.5139 12.1731 12.5294 11.9062 12.3898 11.7182L12.3433 11.6643L8.19946 7.52022L12.3433 3.37616C12.5139 3.20561 12.5294 2.93872 12.3898 2.75065L12.3433 2.69677C12.1727 2.52622 11.9059 2.51071 11.7178 2.65026L11.6639 2.69677L7.18016 7.18052C7.0096 7.35108 6.9941 7.61797 7.13364 7.80603L7.18016 7.85991L11.6639 12.3437C11.8515 12.5313 12.1557 12.5313 12.3433 12.3437Z",
        fill: "currentColor",
      }),
    ),
  M9 = A9,
  T9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 16,
        height: 16,
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M8.04891 12.3437C7.87836 12.1731 7.86285 11.9062 8.0024 11.7182L8.04891 11.6643L12.1928 7.52022L8.04891 3.37616C7.87836 3.20561 7.86285 2.93872 8.0024 2.75065L8.04891 2.69677C8.21946 2.52622 8.48635 2.51071 8.67442 2.65026L8.7283 2.69677L13.2121 7.18052C13.3826 7.35108 13.3981 7.61797 13.2586 7.80603L13.2121 7.85992L8.7283 12.3437C8.54069 12.5313 8.23652 12.5313 8.04891 12.3437Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ F.createElement("path", {
        d: "M3.65667 12.3437C3.48611 12.1731 3.47061 11.9062 3.61015 11.7182L3.65667 11.6643L7.80051 7.52022L3.65667 3.37616C3.48611 3.20561 3.47061 2.93872 3.61015 2.75065L3.65667 2.69677C3.82722 2.52622 4.09411 2.51071 4.28218 2.65026L4.33606 2.69677L8.81981 7.18052C8.99037 7.35108 9.00587 7.61797 8.86633 7.80603L8.81981 7.85991L4.33606 12.3437C4.14845 12.5313 3.84428 12.5313 3.65667 12.3437Z",
        fill: "currentColor",
      }),
    ),
  O9 = T9,
  N9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 17,
        height: 16,
        viewBox: "0 0 17 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M10.8335 3.10946C11.004 3.28001 11.0195 3.5469 10.88 3.73497L10.8335 3.78885L6.68964 7.93291L10.8335 12.077C11.004 12.2475 11.0195 12.5144 10.88 12.7025L10.8335 12.7564C10.6629 12.9269 10.396 12.9424 10.208 12.8029L10.1541 12.7564L5.67033 8.2726C5.49978 8.10205 5.48427 7.83516 5.62382 7.64709L5.67033 7.59321L10.1541 3.10946C10.3417 2.92185 10.6459 2.92185 10.8335 3.10946Z",
        fill: "currentColor",
      }),
    ),
  D9 = N9,
  R9 = (e) =>
    /* @__PURE__ */ F.createElement(
      "svg",
      {
        width: 17,
        height: 16,
        viewBox: "0 0 17 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ F.createElement("path", {
        d: "M6.16648 3.10946C5.99593 3.28001 5.98042 3.5469 6.11996 3.73497L6.16648 3.78885L10.3103 7.93291L6.16648 12.077C5.99593 12.2475 5.98042 12.5144 6.11996 12.7025L6.16648 12.7564C6.33703 12.9269 6.60392 12.9424 6.79199 12.8029L6.84587 12.7564L11.3296 8.2726C11.5002 8.10205 11.5157 7.83516 11.3761 7.64709L11.3296 7.59321L6.84587 3.10946C6.65826 2.92185 6.35409 2.92185 6.16648 3.10946Z",
        fill: "currentColor",
      }),
    ),
  z9 = R9,
  I9 = () => {
    const [e, t] = de(!1),
      n = () => t(!e);
    return /* @__PURE__ */ b.jsxs(b.Fragment, {
      children: [
        /* @__PURE__ */ b.jsxs(qe, {
          id: "lineageLegend",
          className: ee.lineage_legend,
          type: "button",
          onClick: n,
          children: [
            "Legend",
            e ? /* @__PURE__ */ b.jsx(u9, {}) : /* @__PURE__ */ b.jsx(l9, {}),
          ],
        }),
        /* @__PURE__ */ b.jsx(Ou, {
          flip: !0,
          target: "lineageLegend",
          isOpen: e,
          className: ee.column_legend,
          placement: "top",
          children: /* @__PURE__ */ b.jsx(Nu, {
            children: Object.entries(t1).map(([o, r]) =>
              /* @__PURE__ */ b.jsxs(
                "div",
                {
                  children: [
                    /* @__PURE__ */ b.jsx("div", {
                      className: ee.dot,
                      style: { backgroundColor: r },
                      children: o[0],
                    }),
                    " ",
                    o,
                  ],
                },
                o,
              ),
            ),
          }),
        }),
      ],
    });
  },
  L9 = I9;
var m1 = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var a = "", i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        s && (a = r(a, o(s)));
      }
      return a;
    }
    function o(a) {
      if (typeof a == "string" || typeof a == "number") return a;
      if (typeof a != "object") return "";
      if (Array.isArray(a)) return n.apply(null, a);
      if (
        a.toString !== Object.prototype.toString &&
        !a.toString.toString().includes("[native code]")
      )
        return a.toString();
      var i = "";
      for (var s in a) t.call(a, s) && a[s] && (i = r(i, s));
      return i;
    }
    function r(a, i) {
      return i ? (a ? a + " " + i : a + i) : a;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(m1);
var P9 = m1.exports;
const ke = /* @__PURE__ */ $n(P9),
  H9 = ({ datatype: e, color: t, size: n = "1rem" }) => {
    const [o, r] = Oe(() => {
      switch (e.toLowerCase()) {
        case "integer":
        case "float":
        case "double precision":
        case "double":
        case "bigint":
          return [H8, "#FF754C"];
        case "bool":
        case "boolean":
          return [z8, "#00A5DB"];
        case "text":
        case "character":
        case "character varying":
        case "varchar":
          return [L8, "#3F8CFF"];
        case "geospatial":
          return [V8, "#01CD8C"];
        case "date":
        case "timestamp":
        case "timestamp with time zone":
          return [$8, "#247EFE"];
        default:
          return [F8, "#6A24FE"];
      }
    }, [e]);
    return /* @__PURE__ */ b.jsx("div", {
      style: { color: t || r },
      className: "d-flex align-items-center",
      children: /* @__PURE__ */ b.jsx(o, { width: n, height: n }),
    });
  },
  Ur = ({ nodeType: e }) =>
    /* @__PURE__ */ b.jsxs("div", {
      children: [
        e === "seed" && /* @__PURE__ */ b.jsx(Z8, {}),
        e === "model" && /* @__PURE__ */ b.jsx(U8, {}),
        e === "source" && /* @__PURE__ */ b.jsx(X8, {}),
        e === "exposure" && /* @__PURE__ */ b.jsx(Q8, {}),
        e === "analysis" && /* @__PURE__ */ b.jsx(e9, {}),
        e === "snapshot" && /* @__PURE__ */ b.jsx(n9, {}),
        e === "semantic_model" && /* @__PURE__ */ b.jsx(r9, {}),
        e === "macros" && /* @__PURE__ */ b.jsx(i9, {}),
      ],
    }),
  ro = ({ id: e, icon: t, text: n, label: o }) =>
    /* @__PURE__ */ b.jsxs(b.Fragment, {
      children: [
        /* @__PURE__ */ b.jsxs("div", {
          className: ee.table_node_pill,
          id: e,
          children: [
            /* @__PURE__ */ b.jsx("div", { className: ee.icon, children: t }),
            /* @__PURE__ */ b.jsx("div", { children: n }),
          ],
        }),
        /* @__PURE__ */ b.jsx(L1, { target: e, children: o }),
      ],
    }),
  b1 = {
    seed: ee.seed,
    model: ee.model,
    source: ee.source,
    exposure: ee.exposure,
    snapshot: ee.snapshot,
    semantic_model: ee.metrics,
    macros: ee.macros,
    analysis: ee.analysis,
  },
  y1 = {
    seed: "SED",
    model: "MDL",
    source: "SRC",
    exposure: "EXP",
    snapshot: "SNP",
    semantic_model: "MET",
    macros: "SEM",
    analysis: "ANY",
  },
  er = "-1px",
  Zs = () =>
    /* @__PURE__ */ b.jsxs(b.Fragment, {
      children: [
        /* @__PURE__ */ b.jsx(Kt, {
          id: "left",
          type: "source",
          className: "invisible",
          isConnectable: !1,
          position: ne.Left,
          style: { left: er },
        }),
        /* @__PURE__ */ b.jsx(Kt, {
          id: "right",
          type: "source",
          className: "invisible",
          isConnectable: !1,
          position: ne.Right,
          style: { right: er },
        }),
        /* @__PURE__ */ b.jsx(Kt, {
          id: "left",
          type: "target",
          className: "invisible",
          isConnectable: !1,
          position: ne.Left,
          style: { left: er },
        }),
        /* @__PURE__ */ b.jsx(Kt, {
          id: "right",
          type: "target",
          className: "invisible",
          isConnectable: !1,
          position: ne.Right,
          style: { right: er },
        }),
      ],
    }),
  j9 = ({ data: e }) => {
    const {
        label: t,
        table: n,
        url: o,
        upstreamCount: r,
        downstreamCount: a,
        nodeType: i,
        tests: s,
        materialization: c,
        isExternalProject: u,
      } = e,
      l = Et(),
      {
        state: {
          selectedTable: d,
          collectColumns: f,
          selectedColumn: g,
          leftExpansion: p,
          rightExpansion: h,
          selectCheck: m,
          nonSelectCheck: y,
        },
        rerender: x,
      } = _t(),
      C = kt(),
      S = Object.keys(f[n] || {}).length,
      w = S > 0,
      M = d === n,
      O = () => {
        if (g.name && g.table === n) return;
        const k = l.getNodes(),
          E = l.getEdges(),
          [N, z] = So(k, E, n);
        l.setNodes(N), l.setEdges(z);
      },
      _ = async (k) => {
        if (Ie.inProgress) {
          Ie.showCllInProgressMsg();
          return;
        }
        let [E, N] = await Ys(l.getNodes(), l.getEdges(), n, k);
        if (
          (([E, N] = So(E, N, d)),
          mn(E, N),
          l.setNodes(E),
          l.setEdges(N),
          C(uo(Co(E, N, d))),
          C(In(await Bn(E, N, d, p, h))),
          x(),
          g.name)
        ) {
          try {
            Ie.start();
            const z = l.getEdges();
            wo(z, !1),
              xo(z, !0),
              l.setEdges(z),
              await g1(
                E,
                N,
                k,
                f[n].map((T) => ({ table: n, name: T.column })),
                (T) => {
                  C(Cd({ operatorList: T }));
                },
                (T) => {
                  C(xd(T));
                },
                (T) => {
                  C(Sd(T));
                },
                l,
                g,
                { direct: m, indirect: y },
              ),
              x();
          } catch (z) {
            console.log("cll:error:", z);
          } finally {
            Ie.end();
          }
          return;
        }
      },
      L = () => _(!0),
      I = () => _(!1),
      P = (k) => {
        if ((k.stopPropagation(), !!M && i !== "semantic_model")) {
          if (i === "exposure") {
            C(St(Kf));
            return;
          }
          C(St(Zf));
        }
      },
      $ = l.getEdges(),
      B = i,
      v = n.replace(/[^a-zA-Z0-9]/g, "-");
    return /* @__PURE__ */ b.jsxs("div", {
      className: "position-relative",
      style: {
        opacity: g.name ? (w ? 1 : 0.5) : 1,
      },
      children: [
        /* @__PURE__ */ b.jsxs("div", {
          className: ee.table_node,
          onClick: async () => {
            const k = l.getNodes(),
              E = l.getEdges();
            C(uo(Co(k, E, n))),
              C(In(await Bn(k, E, n, p, h))),
              O(),
              C(vr(n)),
              o && y4(o);
          },
          children: [
            /* @__PURE__ */ b.jsx("div", {
              className: ke(
                ee.header,
                "d-flex flex-column align-items-start gap-xs",
                {
                  [ee.selected]: M,
                  [ee.collapse]: !w,
                },
              ),
              children: /* @__PURE__ */ b.jsxs("div", {
                className: "d-flex flex-column align-items-start gap-xs w-100",
                children: [
                  /* @__PURE__ */ b.jsxs("div", {
                    className: ee.table_header,
                    children: [
                      /* @__PURE__ */ b.jsxs("div", {
                        className: ke(ee.node_icon, b1[B]),
                        children: [
                          /* @__PURE__ */ b.jsx(Ur, { nodeType: B }),
                          /* @__PURE__ */ b.jsx("div", { children: y1[B] }),
                        ],
                      }),
                      /* @__PURE__ */ b.jsx("div", {
                        className: "lines-2",
                        children: t,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ b.jsxs("div", {
                    className: ke(
                      "w-100 d-flex align-items-center gap-xs",
                      ee.node_extra_info,
                    ),
                    children: [
                      /* @__PURE__ */ b.jsx("div", {
                        className: ke("nodrag", ee.table_handle, {
                          invisible:
                            a === 0 ||
                            a === $.filter((k) => k.target === n).length ||
                            l.getNode(Dr(n, !1)),
                        }),
                        onClick: (k) => {
                          k.stopPropagation(), I();
                        },
                        "data-testid": "expand-left-btn-" + n,
                        children: "+",
                      }),
                      (s == null ? void 0 : s.length) > 0 &&
                        /* @__PURE__ */ b.jsx(ro, {
                          id: "table-node-tests-" + v,
                          icon: /* @__PURE__ */ b.jsx(p1, {}),
                          text: s.length.toString(),
                          label: "Tests",
                        }),
                      c &&
                        /* @__PURE__ */ b.jsx(ro, {
                          id: "table-node-materilization-" + v,
                          icon: /* @__PURE__ */ b.jsx(h1, {}),
                          text: c,
                          label: "Materialization",
                        }),
                      u
                        ? /* @__PURE__ */ b.jsx(ro, {
                            id: "table-node-is-external-" + v,
                            icon: /* @__PURE__ */ b.jsx(D8, {}),
                            text: "ext",
                            label: `External Project: ${n}`,
                          })
                        : null,
                      /* @__PURE__ */ b.jsx("div", { className: "spacer" }),
                      /* @__PURE__ */ b.jsx("div", {
                        className: ke(
                          "nodrag",
                          M && i !== "semantic_model"
                            ? "text-blue"
                            : "text-grey",
                        ),
                        onClick: P,
                        "data-testid": "view-details-btn-" + n,
                        children: "Details",
                      }),
                      /* @__PURE__ */ b.jsx("div", {
                        className: ke("nodrag", ee.table_handle, {
                          invisible:
                            r === 0 ||
                            r === $.filter((k) => k.source === n).length ||
                            l.getNode(Dr(n, !0)),
                        }),
                        onClick: (k) => {
                          k.stopPropagation(), L();
                        },
                        "data-testid": "expand-right-btn-" + n,
                        children: "+",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            w &&
              /* @__PURE__ */ b.jsxs(b.Fragment, {
                children: [
                  /* @__PURE__ */ b.jsx("div", { className: ee.divider }),
                  /* @__PURE__ */ b.jsx("div", {
                    className: ke(ee.content, {
                      [ee.selected]: M,
                    }),
                    style: { height: Ji(S) },
                  }),
                ],
              }),
          ],
        }),
        /* @__PURE__ */ b.jsx(Zs, {}),
      ],
    });
  },
  F9 = ({ data: e }) => {
    const { tables: t = [], prevTable: n, right: o, level: r } = e,
      {
        state: { moreTables: a },
      } = _t(),
      i = kt(),
      s = Et(),
      c = he(
        (u) => {
          u.stopPropagation(),
            i(St(Xf)),
            i(xs({ ...a, tables: t, prevTable: n, right: o, level: r }));
        },
        [r, i, a, n, o, t],
      );
    return /* @__PURE__ */ b.jsxs("div", {
      className: ee.see_more_node,
      onClick: c,
      children: [
        /* @__PURE__ */ b.jsx("div", {
          className: "fw-semibold",
          children: "See more",
        }),
        /* @__PURE__ */ b.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ b.jsx("div", {
          children: t.filter((u) => !s.getNode(u.table)).length || "",
        }),
        /* @__PURE__ */ b.jsx(Zs, {}),
      ],
    });
  },
  B9 = (e) => {
    const { sourceX: t, sourceY: n, targetX: o, targetY: r, markerEnd: a } = e,
      i = (t - o) * 0.6,
      c = `M ${t - 5} ${n} A ${i} 50 0 1 0 ${o + 2} ${r}`;
    return /* @__PURE__ */ b.jsx(Vn, { path: c, markerEnd: a });
  },
  $9 = ({ data: e }) => {
    const { column: t, table: n, lensType: o } = e,
      {
        state: { selectedColumn: r },
      } = _t(),
      a = kt(),
      i = r.table === n && r.name === t,
      s = o && t1[o],
      c = s ? { borderColor: s } : {},
      u = Et(),
      l = () => {
        const d = u.getNode(Nr(n, t));
        d && (a(vr("")), a(sn({ name: t, table: n })), T4(d, u));
      };
    return /* @__PURE__ */ b.jsxs("div", {
      className: ke(ee.column_node, i ? ee.selected : ee.default),
      style: c,
      onClick: l,
      children: [
        /* @__PURE__ */ b.jsx("div", {
          className: ee.column_name,
          children: t,
        }),
        /* @__PURE__ */ b.jsx(Zs, {}),
        s
          ? /* @__PURE__ */ b.jsx(P1, {
              style: { "--lens-color": s },
              className: ee.column_badge,
              children: o[0],
            })
          : null,
      ],
    });
  };
function W9({ isOpen: e, closeModal: t, width: n = 350, children: o }) {
  const r = document.getElementById("sidebar");
  return r
    ? pn(
        /* @__PURE__ */ b.jsx("div", {
          className: "sidebar-modal",
          style: {
            width: `${n}px`,
            right: `-${n}px`,
            transform: e ? `translateX(-${n}px)` : "",
            backgroundColor: "var(--card-bg)",
            color: "var(--text-color)",
          },
          children:
            e &&
            /* @__PURE__ */ b.jsxs(b.Fragment, {
              children: [
                /* @__PURE__ */ b.jsx("div", {
                  className: "sidebar-close-button",
                  onClick: t,
                  children: /* @__PURE__ */ b.jsx(f9, {}),
                }),
                /* @__PURE__ */ b.jsx("div", {
                  className: "sidebar-background-screen",
                  onClick: t,
                }),
                /* @__PURE__ */ b.jsx("div", {
                  className: "sidebar-modal-content",
                  children: o,
                }),
              ],
            }),
        }),
        r,
      )
    : null;
}
function Yr(e) {
  return /* @__PURE__ */ b.jsx(ur, { className: "custom-input", ...e });
}
function V9(e) {
  return /* @__PURE__ */ b.jsx(ur, {
    className: "custom-input",
    ...e,
    type: "textarea",
    rows: 4,
  });
}
function q9({ nodeType: e, label: t, table: n, tests: o, materialization: r }) {
  const a = e,
    i = n.replace(/[^a-zA-Z0-9]/g, "-");
  return /* @__PURE__ */ b.jsxs("div", {
    className: "d-flex flex-column align-items-start gap-xs w-100",
    children: [
      /* @__PURE__ */ b.jsxs("div", {
        className: ee.table_header,
        children: [
          /* @__PURE__ */ b.jsxs("div", {
            className: ke(ee.node_icon, b1[a]),
            children: [
              /* @__PURE__ */ b.jsx(Ur, { nodeType: a }),
              /* @__PURE__ */ b.jsx("div", { children: y1[a] }),
            ],
          }),
          /* @__PURE__ */ b.jsx("div", { className: "lines-2", children: t }),
        ],
      }),
      /* @__PURE__ */ b.jsxs("div", {
        className: ke("d-flex gap-xs", ee.node_extra_info),
        children: [
          (o == null ? void 0 : o.length) > 0 &&
            /* @__PURE__ */ b.jsx(ro, {
              id: "table-node-tests-" + i,
              icon: /* @__PURE__ */ b.jsx(p1, {}),
              text: o.length.toString(),
              label: "Tests",
            }),
          r &&
            /* @__PURE__ */ b.jsx(ro, {
              id: "table-node-materilization-" + i,
              icon: /* @__PURE__ */ b.jsx(h1, {}),
              text: r,
              label: "Materialization",
            }),
        ],
      }),
    ],
  });
}
function U9() {
  const {
      state: { moreTables: e, selectCheck: t, nonSelectCheck: n },
      rerender: o,
    } = _t(),
    r = kt(),
    { tables: a, level: i } = e,
    s = Et(),
    c = async (d) => {
      const f = [...s.getNodes()],
        g = [...s.getEdges()];
      A4(f, g, d, e, { direct: t, indirect: n }) && r(St("")),
        mn(f, g),
        s.setNodes(f),
        s.setEdges(g),
        o();
    },
    [u, l] = de(a);
  return /* @__PURE__ */ b.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ b.jsx("div", {
        className: "mb-2 fw-semibold fs-5",
        children: "Tables",
      }),
      /* @__PURE__ */ b.jsx(Yr, {
        bsSize: "sm",
        placeholder: "Search by table name",
        onChange: (d) => {
          const f = d.target.value.toLowerCase();
          l(a.filter((g) => g.table.toLowerCase().includes(f)));
        },
      }),
      /* @__PURE__ */ b.jsx("div", { className: "mb-3" }),
      /* @__PURE__ */ b.jsx("div", {
        className: "h-100 overflow-y",
        children: /* @__PURE__ */ b.jsx("div", {
          className: "d-flex flex-column gap-sm",
          children: u.map((d) => {
            const f = s.getNode(d.table),
              g = f && f.data.level !== i;
            return /* @__PURE__ */ b.jsx(
              "div",
              {
                className: ke(ee.table_card, {
                  [ee.selected]: f,
                  // [styles.disabled]: isNodeOnOtherLevel,
                }),
                onClick: (p) => {
                  p.stopPropagation(), !g && c(d);
                },
                children: /* @__PURE__ */ b.jsx(q9, {
                  nodeType: d.nodeType,
                  label: d.label,
                  table: d.table,
                  tests: d.tests,
                  materialization: d.materialization,
                }),
              },
              d.table,
            );
          }),
        }),
      }),
    ],
  });
}
const Y9 = "_component_1sc6a_1",
  Z9 = {
    component: Y9,
  },
  v1 = ({ top: e = 50, left: t = 50, label: n }) =>
    /* @__PURE__ */ b.jsx("div", {
      className: Z9.component,
      style: { top: `${e}%`, left: `${t}%` },
      children: /* @__PURE__ */ b.jsx("div", {
        style: { marginTop: "-70px" },
        children: n,
      }),
    }),
  K9 = "_level_tag_x6wwh_1",
  X9 = {
    level_tag: K9,
  },
  G9 = ({ label: e }) =>
    /* @__PURE__ */ b.jsx("div", { className: ke(X9.level_tag), children: e }),
  Q9 = ({ purpose: e }) =>
    /* @__PURE__ */ b.jsx("div", {
      className: ke(ee.card, "purpose-section"),
      children: /* @__PURE__ */ b.jsx("div", {
        className: "d-flex flex-column gap-sm",
        children: /* @__PURE__ */ b.jsxs("div", {
          className: "d-flex gap-xs flex-column",
          children: [
            /* @__PURE__ */ b.jsx("div", {
              className: "fs-5 fw-semibold",
              children: "Description",
            }),
            /* @__PURE__ */ b.jsx("div", {
              className: ke(ee.column_card),
              children: /* @__PURE__ */ b.jsx("div", {
                className: "font-normal fs-xxs",
                children: e,
              }),
            }),
          ],
        }),
      }),
    }),
  w1 = Q9,
  J9 = () =>
    /* @__PURE__ */ b.jsxs("div", {
      className: "tooltip-container",
      children: [
        /* @__PURE__ */ b.jsx(m9, {}),
        /* @__PURE__ */ b.jsx("div", {
          className: "tooltip-text",
          children: "Preview Feature",
        }),
      ],
    }),
  ey = ({ column: e, handleClick: t, selected: n, isSelectable: o }) =>
    /* @__PURE__ */ b.jsxs("div", {
      className: ke(ee.column_card, {
        [ee.selected]: n,
        "cursor-pointer": o,
      }),
      onClick: t,
      "data-testid": "table-details-" + e.name,
      children: [
        /* @__PURE__ */ b.jsxs("div", {
          className: "d-flex align-items-center gap-xs",
          children: [
            /* @__PURE__ */ b.jsx(H9, { datatype: e.datatype }),
            /* @__PURE__ */ b.jsx("div", {
              className: "lines-2",
              children: e.name,
            }),
            /* @__PURE__ */ b.jsx("div", { className: "spacer" }),
            e.can_lineage_expand &&
              /* @__PURE__ */ b.jsx("div", {
                className: ee.expand_lineage_icon,
                children: /* @__PURE__ */ b.jsx(p9, {}),
              }),
            e.datatype && /* @__PURE__ */ b.jsx(G9, { label: e.datatype }),
          ],
        }),
        e.description &&
          /* @__PURE__ */ b.jsx("div", {
            className: "d-flex flex-column",
            children: /* @__PURE__ */ b.jsx("div", {
              className: "font-normal fs-xxs text-grey",
              children: e.description,
            }),
          }),
      ],
    }),
  ty = ({
    columns: e,
    filteredColumn: t,
    setFilteredColumn: n,
    handleColumnClick: o,
    selectedTable: r,
    selectedColumn: a,
    setData: i,
  }) => {
    const s = (r == null ? void 0 : r.materialization) === "ephemeral",
      c = (r == null ? void 0 : r.nodeType) === "analysis";
    return /* @__PURE__ */ b.jsx("div", {
      className: ke(ee.card, "flex-grow column-section"),
      children: /* @__PURE__ */ b.jsxs("div", {
        className: "d-flex flex-column gap-sm h-100 p-2",
        children: [
          /* @__PURE__ */ b.jsxs("div", {
            className: "d-flex align-items-center gap-xs",
            children: [
              /* @__PURE__ */ b.jsx("div", {
                className: "fs-5 fw-semibold",
                children: "Columns",
              }),
              /* @__PURE__ */ b.jsx("div", { className: "spacer" }),
              !s &&
                !c &&
                /* @__PURE__ */ b.jsx(qe, {
                  size: "sm",
                  color: "primary",
                  onClick: () => {
                    r &&
                      s1(r.table, !0).then((u) => {
                        i(u), n(u.columns);
                      });
                  },
                  children: "Sync with DB",
                }),
            ],
          }),
          /* @__PURE__ */ b.jsx(Yr, {
            bsSize: "sm",
            type: "text",
            placeholder: "Search by column name",
            onChange: (u) => {
              const l = u.target.value.toLowerCase();
              n(e.filter((d) => d.name.toLowerCase().includes(l)));
            },
          }),
          /* @__PURE__ */ b.jsxs("div", {
            className: "d-flex align-items-center gap-xs",
            children: [
              !s &&
                /* @__PURE__ */ b.jsxs(b.Fragment, {
                  children: [
                    /* @__PURE__ */ b.jsx("div", {
                      className: "fs-xxs",
                      children: "Select column for lineage",
                    }),
                    /* @__PURE__ */ b.jsx(J9, {}),
                  ],
                }),
              /* @__PURE__ */ b.jsx("div", { className: "spacer" }),
              /* @__PURE__ */ b.jsxs("div", {
                className: "fs-xxs text-grey",
                children: [t.length, " columns"],
              }),
            ],
          }),
          /* @__PURE__ */ b.jsx("div", {
            className: "d-flex flex-column gap-sm",
            children: t.map((u) =>
              /* @__PURE__ */ b.jsx(
                ey,
                {
                  column: u,
                  handleClick: () => {
                    s || o(u);
                  },
                  selected: u.name === a.name && u.table === a.table,
                  isSelectable: !s,
                },
                u.name,
              ),
            ),
          }),
        ],
      }),
    });
  },
  ny = ({ tests: e }) => {
    const [t, n] = de(e);
    return /* @__PURE__ */ b.jsx("div", {
      className: ke(ee.card, "flex-grow column-section"),
      children: /* @__PURE__ */ b.jsxs("div", {
        className: "d-flex flex-column gap-sm h-100 p-2",
        children: [
          /* @__PURE__ */ b.jsx("div", {
            className: "fs-5 fw-semibold",
            children: "Tests",
          }),
          /* @__PURE__ */ b.jsx(Yr, {
            bsSize: "sm",
            type: "text",
            placeholder: "Search by test",
            onChange: (o) => {
              const r = o.target.value.toLowerCase();
              n(e.filter((a) => a.key.toLowerCase().includes(r)));
            },
          }),
          /* @__PURE__ */ b.jsx("div", {
            className: "d-flex align-items-center gap-xs",
            children: /* @__PURE__ */ b.jsxs("div", {
              className: "fs-xxs text-grey",
              children: [t.length, " tests"],
            }),
          }),
          /* @__PURE__ */ b.jsx("div", {
            className: "d-flex flex-column gap-sm",
            children: t.map((o) =>
              /* @__PURE__ */ b.jsx(
                "div",
                {
                  className: ee.column_card,
                  children: /* @__PURE__ */ b.jsx("div", {
                    className: "d-flex align-items-center gap-xs",
                    children: /* @__PURE__ */ b.jsx("div", {
                      className: "lines-2",
                      children: o.key,
                    }),
                  }),
                },
                o.key,
              ),
            ),
          }),
        ],
      }),
    });
  },
  oy = () => {
    var C;
    const {
        rerender: e,
        state: {
          selectedTable: t,
          selectedColumn: n,
          selectCheck: o,
          nonSelectCheck: r,
          aiEnabled: a,
        },
      } = _t(),
      i = kt(),
      s = Et(),
      [c, u] = de([]),
      [l, d] = de(null),
      [f, g] = de(0),
      [p, h] = de(!0);
    ie(() => {
      t &&
        s1(t, !1).then((S) => {
          d(S), u(S.columns), h(!1);
        });
    }, [t]);
    const m = async (S) => {
        var v;
        if (!a) {
          w4();
          return;
        }
        if (Ie.inProgress) {
          Ie.showCllInProgressMsg();
          return;
        }
        if (n.table === S.table && n.name === S.name) {
          const [k, E] = k4(s.getNodes(), s.getEdges());
          wo(E, !0),
            xo(E, !0),
            s.setNodes(k),
            s.setEdges(E),
            i(sn({ table: "", name: "" })),
            i(wr({})),
            i(St(""));
          return;
        }
        const w = (v = s.getNode(S.table)) == null ? void 0 : v.data;
        if (!w) throw new Error(`table node ${S.table} isn't visible`);
        let M = s.getNodes(),
          O = s.getEdges();
        wo(O, !1), xo(O, !0);
        const _ = async (k) => {
            ([M, O] = await Ys(M, O, S.table, k)), mn(M, O);
          },
          { upstreamCount: L, downstreamCount: I } = w;
        L > 0 &&
          O.filter((k) => k.source === S.table).length < L &&
          (await _(!0)),
          I > 0 &&
            O.filter((k) => k.target === S.table).length < I &&
            (await _(!1)),
          i(sn({ ...S })),
          i(St("")),
          i(wr({})),
          i(lm({ confidence: "high" }));
        const [P, $] = C4(M.filter(vo), O.filter(vo));
        $.forEach((k) => (k.style = Vs)), s.setNodes(P), s.setEdges($), e();
        const B = (k) =>
          g1(
            P,
            $,
            k,
            [S],
            (E) => {
              i(Cd({ operatorList: E }));
            },
            (E) => {
              i(xd(E));
            },
            (E) => {
              i(Sd(E));
            },
            s,
            S,
            { direct: o, indirect: r },
          );
        try {
          Ie.start(),
            (await Promise.all([B(!0), B(!1)])).every((E) => !E) &&
              (Ie.isCancelled
                ? i(sn({ table: "", name: "" }))
                : c1(
                    `No lineage found for model ${S.table} and column ${S.name}`,
                  ));
        } catch (k) {
          console.error(
            "Error while performing cll for ",
            S.table,
            S.name,
            ", error:",
            k,
          ),
            i(sn({ table: "", name: "" }));
        } finally {
          Ie.end();
        }
      },
      y = (C = s.getNode(t)) == null ? void 0 : C.data;
    if (p || !l || !t) return /* @__PURE__ */ b.jsx(v1, {});
    const x = ["Column"];
    return (
      y.tests.length && x.push("Tests"),
      /* @__PURE__ */ b.jsxs("div", {
        className: "p-2 h-100 d-flex flex-column gap-md overflow-y",
        children: [
          /* @__PURE__ */ b.jsxs("div", {
            className: ee.table_details_header,
            children: [
              /* @__PURE__ */ b.jsx(Ur, { nodeType: y.nodeType }),
              /* @__PURE__ */ b.jsx("div", {
                className: "d-flex align-items-center",
                children: /* @__PURE__ */ b.jsx("div", {
                  className: "fw-semibold fs-5 lines-2",
                  children: y.label,
                }),
              }),
            ],
          }),
          l.purpose && /* @__PURE__ */ b.jsx(w1, { purpose: l.purpose }),
          /* @__PURE__ */ b.jsx("div", {
            className: ee.table_details_tabs,
            children: x.map((S, w) =>
              /* @__PURE__ */ b.jsx(
                "div",
                {
                  className: ke(ee.tab, { [ee.selected]: f === w }),
                  onClick: () => g(w),
                  children: S,
                },
                S,
              ),
            ),
          }),
          f === 0 &&
            /* @__PURE__ */ b.jsx(ty, {
              selectedTable: y,
              selectedColumn: n,
              filteredColumn: c,
              setFilteredColumn: u,
              columns: l.columns,
              handleColumnClick: m,
              setData: d,
            }),
          f === 1 && /* @__PURE__ */ b.jsx(ny, { tests: y.tests }),
        ],
      })
    );
  },
  ry = ({ title: e, value: t }) =>
    /* @__PURE__ */ b.jsxs("div", {
      className: ke(ee.column_card, {}),
      children: [
        /* @__PURE__ */ b.jsxs("div", {
          className: "d-flex align-items-center gap-xs",
          children: [
            /* @__PURE__ */ b.jsx("div", { className: "lines-2", children: e }),
            /* @__PURE__ */ b.jsx("div", { className: "spacer" }),
          ],
        }),
        /* @__PURE__ */ b.jsx("div", {
          className: "d-flex flex-column",
          children: /* @__PURE__ */ b.jsx("div", {
            className: "font-normal fs-xxs text-grey",
            children: t,
          }),
        }),
      ],
    }),
  tr = ry,
  ay = ({ label: e }) => /* @__PURE__ */ b.jsx("div", { children: e }),
  iy = ay,
  sy = () => {
    var s;
    const e = Et(),
      {
        state: { selectedTable: t },
      } = _t(),
      [n, o] = de(null),
      r = (s = e.getNode(t)) == null ? void 0 : s.data,
      [a, i] = de(!0);
    return (
      ie(() => {
        t &&
          p4(t).then((c) => {
            o(c), i(!1);
          });
      }, [t]),
      a || !n || !t
        ? /* @__PURE__ */ b.jsx(v1, {})
        : /* @__PURE__ */ b.jsxs("div", {
            className: "p-2 h-100 d-flex flex-column gap-md overflow-y",
            children: [
              /* @__PURE__ */ b.jsxs("div", {
                className: ee.table_details_header,
                children: [
                  /* @__PURE__ */ b.jsx(Ur, { nodeType: r.nodeType }),
                  /* @__PURE__ */ b.jsx("div", {
                    className: "d-flex align-items-center",
                    children: /* @__PURE__ */ b.jsx("div", {
                      className: "fw-semibold fs-5 lines-2",
                      children: r.label,
                    }),
                  }),
                ],
              }),
              n.description
                ? /* @__PURE__ */ b.jsx(w1, { purpose: n.description })
                : null,
              /* @__PURE__ */ b.jsxs("div", {
                className: ke(ee.card, "flex-grow column-section"),
                children: [
                  /* @__PURE__ */ b.jsx(tr, {
                    title: "Owner",
                    value: `${n.owner.name} - ${n.owner.email}`,
                  }),
                  /* @__PURE__ */ b.jsx(tr, { title: "Url", value: n.url }),
                  /* @__PURE__ */ b.jsx(tr, {
                    title: "Tags",
                    value: n.tags.map((c) =>
                      /* @__PURE__ */ b.jsx(iy, { label: c }),
                    ),
                  }),
                  /* @__PURE__ */ b.jsx(tr, {
                    title: "Maturity",
                    value: n.maturity,
                  }),
                ],
              }),
            ],
          })
    );
  },
  ly = sy;
function cy({ close: e }) {
  const [t, n] = de(
      "",
      /* None */
    ),
    [o, r] = de(""),
    [a, i] = de(!1);
  return /* @__PURE__ */ b.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ b.jsxs("div", {
        className: "mb-2 d-flex",
        children: [
          /* @__PURE__ */ b.jsx("div", {
            className: "fw-semibold fs-5",
            children: "Feedback",
          }),
          /* @__PURE__ */ b.jsx("div", { className: "spacer" }),
          /* @__PURE__ */ b.jsx(qe, {
            size: "sm",
            color: "primary",
            onClick: (s) => {
              s.stopPropagation(), v4();
            },
            children: "Chat with us",
          }),
        ],
      }),
      /* @__PURE__ */ b.jsxs("div", {
        className: ee.feedback_body,
        children: [
          !a &&
            /* @__PURE__ */ b.jsxs(b.Fragment, {
              children: [
                /* @__PURE__ */ b.jsxs("div", {
                  className: "d-flex gap-sm m-2",
                  children: [
                    t === "good"
                      ? /* @__PURE__ */ b.jsx(S9, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "",
                              /* None */
                            ),
                        })
                      : /* @__PURE__ */ b.jsx(y9, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "good",
                              /* Postive */
                            ),
                        }),
                    t === "bad"
                      ? /* @__PURE__ */ b.jsx(E9, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "",
                              /* None */
                            ),
                        })
                      : /* @__PURE__ */ b.jsx(w9, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "bad",
                              /* Negative */
                            ),
                        }),
                  ],
                }),
                /* @__PURE__ */ b.jsx("p", {
                  children:
                    "AI still needs humans sometimes, please help it out 🙂",
                }),
                /* @__PURE__ */ b.jsx(V9, {
                  value: o,
                  onChange: (s) => r(s.target.value),
                  placeholder:
                    "What did AI do wrong? What it should have done?",
                }),
                /* @__PURE__ */ b.jsxs("div", {
                  className: "mt-3 d-flex gap-sm",
                  children: [
                    /* @__PURE__ */ b.jsx(qe, {
                      size: "sm",
                      color: "primary",
                      onClick: async (s) => {
                        s.stopPropagation(),
                          t !== "" &&
                            (await m4({
                              feedback_value: t,
                              feedback_text: o,
                            }),
                            i(!0));
                      },
                      children: "Submit",
                    }),
                    /* @__PURE__ */ b.jsx(qe, {
                      size: "sm",
                      color: "link",
                      className: ee.cancel_btn,
                      onClick: (s) => {
                        s.stopPropagation(), e();
                      },
                      children: "Cancel",
                    }),
                  ],
                }),
              ],
            }),
          a &&
            /* @__PURE__ */ b.jsxs(b.Fragment, {
              children: [
                /* @__PURE__ */ b.jsx("p", {
                  children: "Many thanks for your feedback!",
                }),
                /* @__PURE__ */ b.jsx(qe, {
                  size: "sm",
                  color: "primary",
                  onClick: (s) => {
                    s.stopPropagation(), e();
                  },
                  children: "Close",
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
function uy() {
  const {
      state: {
        selectCheck: e,
        nonSelectCheck: t,
        defaultExpansion: n,
        aiEnabled: o,
      },
    } = _t(),
    r = kt();
  return /* @__PURE__ */ b.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ b.jsx("div", {
        className: "mb-2 fw-semibold fs-5",
        children: "Settings",
      }),
      /* @__PURE__ */ b.jsxs("div", {
        className: "d-flex flex-column gap-sm",
        children: [
          /* @__PURE__ */ b.jsxs("div", {
            children: [
              /* @__PURE__ */ b.jsx(na, {
                check: !0,
                for: "default-expansion",
                className: "fs-6 mb-1",
                children: "Default Expansion",
              }),
              /* @__PURE__ */ b.jsx(Yr, {
                id: "default-expansion",
                value: n,
                type: "number",
                onChange: (a) => {
                  const i = Math.max(parseInt(a.target.value), 0);
                  r(kd(i)), vi({ defaultExpansion: i });
                },
              }),
            ],
          }),
          o &&
            /* @__PURE__ */ b.jsxs(b.Fragment, {
              children: [
                /* @__PURE__ */ b.jsx("div", {
                  className: "fs-6",
                  children: "Edges visibility",
                }),
                /* @__PURE__ */ b.jsxs("div", {
                  className: ee.select_node_checkbox,
                  children: [
                    /* @__PURE__ */ b.jsx(ur, {
                      type: "checkbox",
                      id: "select-check",
                      className: "mt-2",
                      checked: e,
                      onChange: (a) => {
                        if (Ie.inProgress) {
                          Ie.showCllInProgressMsg();
                          return;
                        }
                        r(Ed(a.target.checked)),
                          vi({
                            showSelectEdges: a.target.checked,
                          });
                      },
                    }),
                    /* @__PURE__ */ b.jsxs("div", {
                      className: "d-flex flex-column",
                      children: [
                        /* @__PURE__ */ b.jsx(na, {
                          check: !0,
                          for: "select-check",
                          className: "fs-6",
                          children: "Select",
                        }),
                        /* @__PURE__ */ b.jsx("div", {
                          className: "text-grey",
                          children:
                            "Select linkages are shown if there is direct flow of data between columns through select statements.",
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ b.jsxs("div", {
                  className: ee.non_select_node_checkbox,
                  children: [
                    /* @__PURE__ */ b.jsx(ur, {
                      type: "checkbox",
                      id: "non-select-check",
                      className: "mt-2",
                      checked: t,
                      onChange: (a) => {
                        if (Ie.inProgress) {
                          Ie.showCllInProgressMsg();
                          return;
                        }
                        r(_d(a.target.checked)),
                          vi({
                            showNonSelectEdges: a.target.checked,
                          });
                      },
                    }),
                    /* @__PURE__ */ b.jsxs("div", {
                      className: "d-flex flex-column",
                      children: [
                        /* @__PURE__ */ b.jsx(na, {
                          check: !0,
                          for: "non-select-check",
                          className: "fs-6",
                          children: "Non-Select",
                        }),
                        /* @__PURE__ */ b.jsx("div", {
                          className: "text-grey",
                          children:
                            "Non-Select linkages are shown if columns appear in condition/clauses like where, join, having, etc.",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
const x1 = pt({ isOpen: !1, setIsOpen: () => {} });
function dy({ trigger: e, render: t }) {
  const n = ae(null),
    o = "popover-id",
    { isOpen: r, setIsOpen: a } = Ye(x1);
  return (
    ie(() => {
      const i = (s) => {
        if (!n.current) return;
        const {
          x: c,
          y: u,
          width: l,
          height: d,
        } = n.current.getBoundingClientRect();
        a(xu(c - 10, c + l + 10)(s.x) && xu(u - 10, u + d + 10)(s.y));
      };
      return (
        document.body.addEventListener("click", i),
        () => {
          document.body.removeEventListener("click", i);
        }
      );
    }, [r]),
    /* @__PURE__ */ b.jsxs(b.Fragment, {
      children: [
        /* @__PURE__ */ b.jsx("div", {
          id: o,
          onClick: (i) => {
            i.stopPropagation(), a((s) => !s);
          },
          children: e,
        }),
        /* @__PURE__ */ b.jsx(Ou, {
          placement: "bottom",
          target: o,
          className: ee.popover,
          isOpen: r,
          toggle: () => a((i) => !i),
          children: /* @__PURE__ */ b.jsx(Nu, {
            children: /* @__PURE__ */ b.jsx("div", {
              ref: n,
              children: t({ close: () => a(!1) }),
            }),
          }),
        }),
      ],
    })
  );
}
const fy = () => {
    const e = Et(),
      {
        state: {
          selectedTable: t,
          leftExpansion: n,
          rightExpansion: o,
          minRange: r,
          nodeCount: a,
          defaultExpansion: i,
        },
        rerender: s,
      } = _t(),
      [c, u] = de([0, 0]),
      l = kt();
    ie(() => {
      l(ri(Cu(r[0], c[0], i))), l(ai(Cu(r[1], c[1], i)));
    }, [i, l, c, r]),
      ie(() => {
        (async () => l(In(await Bn(e.getNodes(), e.getEdges(), t, n, o))))();
      }, [e, n, l, o, t]),
      ie(() => {
        (async () => {
          var S;
          if (!t) return;
          const g = (S = e.getNode(t)) == null ? void 0 : S.data;
          if (!g) return;
          const { level: p } = g,
            h = e.getNodes(),
            m = e.getEdges(),
            [y] = await es(h, m, t, -1 / 0, 1 / 0);
          let x = 1 / 0,
            C = -1 / 0;
          for (const w of y)
            (x = Math.min(x, w.data.level)), (C = Math.max(C, w.data.level));
          u([p - x, C - p]);
        })();
      }, [e, t]);
    const d = he(() => {
        l(ri(n + 1 <= c[0] ? n + 1 : n));
      }, [n, l, c]),
      f = he(() => {
        l(ai(o + 1 <= c[0] ? o + 1 : o));
      }, [o, l, c]);
    return /* @__PURE__ */ b.jsx(dy, {
      trigger: /* @__PURE__ */ b.jsxs(qe, {
        size: "sm",
        color: "primary",
        className: "d-flex gap-sm align-items-center",
        type: "button",
        children: [/* @__PURE__ */ b.jsx(k9, {}), "Expand"],
      }),
      render: ({ close: g }) =>
        /* @__PURE__ */ b.jsxs("div", {
          className: "d-flex flex-column gap-xs",
          children: [
            /* @__PURE__ */ b.jsxs("div", {
              className:
                "w-100 d-flex gap-xl justify-content-between align-items-center",
              children: [
                /* @__PURE__ */ b.jsxs("div", {
                  className: ke(ee.expand_nav, {
                    [ee.disabled]: r[0] === -1,
                  }),
                  children: [
                    /* @__PURE__ */ b.jsxs("div", {
                      className: ee.expand_nav_btn,
                      children: [
                        /* @__PURE__ */ b.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && l(ri(c[0]));
                          },
                          children: /* @__PURE__ */ b.jsx(M9, {}),
                        }),
                        /* @__PURE__ */ b.jsx("div", { className: ee.divider }),
                        /* @__PURE__ */ b.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && d();
                          },
                          children: /* @__PURE__ */ b.jsx(D9, {}),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ b.jsx("div", {
                      className: "text-blue px-2 py-1",
                      children: n,
                    }),
                  ],
                }),
                /* @__PURE__ */ b.jsxs("div", {
                  className: ke(ee.expand_nav, {
                    [ee.disabled]: r[1] === -1,
                  }),
                  children: [
                    /* @__PURE__ */ b.jsx("div", {
                      className: "text-blue px-2 py-1",
                      children: o,
                    }),
                    /* @__PURE__ */ b.jsxs("div", {
                      className: ee.expand_nav_btn,
                      children: [
                        /* @__PURE__ */ b.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && f();
                          },
                          children: /* @__PURE__ */ b.jsx(z9, {}),
                        }),
                        /* @__PURE__ */ b.jsx("div", { className: ee.divider }),
                        /* @__PURE__ */ b.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && l(ai(c[1]));
                          },
                          children: /* @__PURE__ */ b.jsx(O9, {}),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ b.jsxs("div", {
              className:
                "w-100 d-flex gap-xl justify-content-between align-items-center",
              children: [
                /* @__PURE__ */ b.jsx("div", {
                  className: "normal-text",
                  children: "Parents",
                }),
                /* @__PURE__ */ b.jsx("div", {
                  className: "normal-text",
                  children: "Children",
                }),
              ],
            }),
            /* @__PURE__ */ b.jsxs(qe, {
              color: a === 0 ? "secondary" : "primary",
              size: "sm",
              disabled: a === 0,
              onClick: async (p) => {
                var x;
                if ((p.stopPropagation(), !t)) return;
                const h = (x = e.getNode(t)) == null ? void 0 : x.data;
                if (!h) return;
                const [m, y] = await es(
                  e.getNodes(),
                  e.getEdges(),
                  t,
                  h.level - n,
                  h.level + o,
                );
                So(m, y, t),
                  mn(m, y),
                  e.setNodes(m),
                  e.setEdges(y),
                  e.fitView({ minZoom: $s }),
                  l(uo(Co(m, y, t))),
                  l(In(await Bn(m, y, t, n, o))),
                  s(),
                  g();
              },
              children: ["Add ", a, " tables"],
            }),
          ],
        }),
    });
  },
  gy = fy,
  py = () => {
    const {
        state: { selectedColumn: e, confidence: t, aiEnabled: n },
      } = _t(),
      o = document.getElementById("expand-container");
    if (o)
      return pn(
        /* @__PURE__ */ b.jsx(Eo, {
          className: ee.menu_card_container,
          children: /* @__PURE__ */ b.jsx(_o, {
            className: ee.menu_card,
            children: /* @__PURE__ */ b.jsxs("div", {
              className: "d-flex gap-sm",
              children: [
                /* @__PURE__ */ b.jsx(gy, {}),
                n &&
                  e.name &&
                  t.confidence === "low" &&
                  /* @__PURE__ */ b.jsxs(b.Fragment, {
                    children: [
                      /* @__PURE__ */ b.jsx("div", {
                        className: ee.verticle_divider,
                      }),
                      /* @__PURE__ */ b.jsxs("div", {
                        className: "d-flex gap-xxs align-items-center",
                        children: [
                          /* @__PURE__ */ b.jsx("div", {
                            children: "Confidence",
                          }),
                          /* @__PURE__ */ b.jsx(ns, {
                            title:
                              "Depending on the SQL dialect and complexity of queries, there may be situations where we are not completely confident about the lineage shown in this view",
                            id: "confidence",
                            children: /* @__PURE__ */ b.jsx(kp, {}),
                          }),
                          /* @__PURE__ */ b.jsx("div", {
                            className: ee.low_confidence,
                            children: "Low",
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
          }),
        }),
        o,
      );
  },
  hy = py,
  my = () => {
    const e = document.getElementById("settings-container"),
      t = kt();
    if (e)
      return pn(
        /* @__PURE__ */ b.jsxs(qe, {
          outline: !0,
          onClick: () => t(St(Gf)),
          children: [/* @__PURE__ */ b.jsx(_p, {}), "Settings"],
        }),
        e,
      );
  },
  by = my,
  yy = ({ flow: e }) => {
    const t = document.getElementById("reset-container"),
      n = kt();
    if (t)
      return pn(
        /* @__PURE__ */ b.jsxs(qe, {
          outline: !0,
          onClick: () => {
            e.setNodes([]),
              e.setEdges([]),
              n(sn({ table: "", name: "" })),
              n(wr({})),
              n(xs({})),
              l1(),
              Ie.cancel();
          },
          "data-testid": "reset-btn",
          children: [
            /* @__PURE__ */ b.jsx(Ep, {}),
            /* @__PURE__ */ b.jsx("span", { children: "Reset" }),
          ],
        }),
        t,
      );
  },
  vy = yy,
  wy = {
    table: j9,
    seeMore: F9,
    column: $9,
  },
  xy = { selfConnecting: B9 },
  Sy = ({ flow: e, afterFlowRender: t, theme: n }) => {
    const [o, r] = de(!1),
      {
        state: { selectCheck: a, nonSelectCheck: i, sidebarScreen: s },
      } = _t(),
      c = kt(),
      u = he(async () => {
        const l = await b4();
        c(Ed(l.showSelectEdges)),
          c(_d(l.showNonSelectEdges)),
          c(kd(l.defaultExpansion));
      }, [c]);
    return (
      ie(() => {
        l1(), u();
      }, [u]),
      ie(() => {
        var f;
        const l = e.current;
        if (!l) return;
        const d = l.getEdges();
        if ((a && i) || (!a && !i)) {
          for (const g of d) g.hidden = !1;
          l.setEdges(d);
          return;
        }
        for (const g of d) {
          g.hidden = !1;
          const p = (f = g.data) == null ? void 0 : f.type;
          p &&
            (p === "direct" && (g.hidden = !a),
            p === "indirect" && (g.hidden = !i));
        }
        l.setEdges(d);
      }, [a, i, e]),
      /* @__PURE__ */ b.jsxs("div", {
        className: "lineage_flow_component",
        style: { width: "100%", height: "100%" },
        "data-theme": n,
        children: [
          /* @__PURE__ */ b.jsx(x1.Provider, {
            value: { isOpen: o, setIsOpen: r },
            children: /* @__PURE__ */ b.jsxs(js, {
              children: [
                /* @__PURE__ */ b.jsxs(qf, {
                  defaultNodes: [],
                  defaultEdges: [],
                  onInit: (l) => t(l),
                  nodeTypes: wy,
                  edgeTypes: xy,
                  style: { background: "var(--bg-color)" },
                  proOptions: { hideAttribution: !0 },
                  minZoom: $s,
                  children: [
                    /* @__PURE__ */ b.jsx(t4, {}),
                    /* @__PURE__ */ b.jsx(K7, {}),
                  ],
                }),
                /* @__PURE__ */ b.jsx(L9, {}),
                /* @__PURE__ */ b.jsxs(W9, {
                  isOpen: s !== "",
                  closeModal: () => c(St("")),
                  width: 446,
                  children: [
                    s === Xf && /* @__PURE__ */ b.jsx(U9, {}),
                    s === Zf && /* @__PURE__ */ b.jsx(oy, {}),
                    s === Kf && /* @__PURE__ */ b.jsx(ly, {}),
                    s === n4 &&
                      /* @__PURE__ */ b.jsx(cy, { close: () => St("") }),
                    s === Gf && /* @__PURE__ */ b.jsx(uy, {}),
                  ],
                }),
                /* @__PURE__ */ b.jsx(hy, {}),
                /* @__PURE__ */ b.jsx(by, {}),
                e.current
                  ? /* @__PURE__ */ b.jsx(vy, { flow: e.current })
                  : null,
              ],
            }),
          }),
          /* @__PURE__ */ b.jsx("div", { id: "sidebar" }),
        ],
      })
    );
  },
  Cy = Sy,
  Ks = pt({
    state: yr.getInitialState(),
    dispatch: () => null,
    rerender: () => null,
  }),
  Ey = ({ renderNode: e, theme: t = "dark" }) => {
    const [n, o] = ku(yr.reducer, {
        ...yr.getInitialState(),
      }),
      r = ae(),
      [, a] = de(0),
      i = he(() => a((d) => (d + 1) % 100), []),
      s = he(
        async (d) => {
          if ((o(St("")), !d)) return;
          o(cm(d.aiEnabled));
          const { node: f } = d,
            g = r.current;
          if (!g || !f) return;
          if (g.getNode(f.table)) {
            o(vr(f.table));
            let x = g.getNodes(),
              C = g.getEdges();
            n.selectedColumn.name ||
              (([x, C] = So(x, C, f.table)), g.setNodes(x), g.setEdges(C)),
              o(uo(Co(x, C, f.table))),
              o(In(await Bn(x, C, f.table, n.leftExpansion, n.rightExpansion)));
            return;
          }
          let h = [],
            m = [];
          const y = async (x, C) => {
            [h, m] = await Ys(h, m, x, C);
          };
          (h = [qs(f, 0, "")]),
            f.upstreamCount > 0 && (await y(f.table, !0)),
            f.downstreamCount > 0 && (await y(f.table, !1)),
            o(vr(f.table)),
            o(sn({ table: "", name: "" })),
            o(wr({})),
            o(xs({})),
            ([h, m] = So(h, m, f.table)),
            mn(h, m),
            g.setNodes(h),
            g.setEdges(m),
            g.fitView({ minZoom: $s, duration: 500 }),
            o(uo(Co(h, m, f.table))),
            o(In(await Bn(h, m, f.table, n.leftExpansion, n.rightExpansion))),
            i();
        },
        [i, n.leftExpansion, n.rightExpansion, n.selectedColumn.name],
      ),
      c = () => {
        if (r.current) {
          const d = r.current.getEdges();
          wo(d, !0), xo(d, !1), r.current.setEdges(d);
        }
      };
    ie(
      () => (
        document.addEventListener("cll_cancelled", c),
        () => {
          document.removeEventListener("cll_cancelled", c);
        }
      ),
      [],
    );
    const u = Oe(
        () => ({
          state: n,
          dispatch: o,
          rerender: i,
        }),
        [n, o, i],
      ),
      l = (d) => {
        (r.current = d), s(e);
      };
    return (
      ie(() => {
        !e.node || !r.current || s(e);
      }, [e, s]),
      /* @__PURE__ */ b.jsx(Ks.Provider, {
        value: u,
        children: /* @__PURE__ */ b.jsx(Cy, {
          afterFlowRender: l,
          flow: r,
          theme: t,
        }),
      })
    );
  },
  _y = Ey,
  _t = () => Ye(Ks),
  kt = () => {
    const { dispatch: e } = Ye(Ks);
    return e;
  },
  ky = (e) => /* @__PURE__ */ b.jsx(_y, { ...e }),
  Vy = ky;
export {
  Ne as A,
  K0 as C,
  Wy as D,
  Vy as L,
  xe as a,
  Py as b,
  Hy as c,
  Dy as d,
  as as e,
  Pt as f,
  X0 as g,
  os as h,
  hd as i,
  b as j,
  F2 as k,
  S4 as l,
  Ie as m,
  Ly as s,
  rt as u,
};
