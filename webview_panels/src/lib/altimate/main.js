import "./main.css";
var zd = Object.defineProperty;
var Vd = (e, t, n) =>
  t in e
    ? zd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var kr = (e, t, n) => (Vd(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as F from "react";
import $, {
  createContext as pt,
  Component as Wd,
  createElement as ia,
  isValidElement as Wc,
  useState as de,
  useRef as se,
  useReducer as Uc,
  useCallback as ge,
  useMemo as Ie,
  useContext as Ze,
  useLayoutEffect as Ud,
  useEffect as ie,
  useId as Yc,
  useInsertionEffect as Yd,
  cloneElement as Zd,
  Children as On,
  lazy as qd,
  memo as Ae,
  forwardRef as Zc,
} from "react";
import { Prism as Xd } from "react-syntax-highlighter";
import {
  Tooltip as Kd,
  Button as Ue,
  Spinner as Gd,
  Card as br,
  CardTitle as qc,
  CardBody as wr,
  CloseButton as Jd,
  Popover as Xc,
  PopoverBody as Kc,
  UncontrolledTooltip as Qd,
  Badge as e1,
  Input as co,
  Label as ts,
} from "reactstrap";
import t1, { createPortal as pn } from "react-dom";
var n1 =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function zn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Is = { exports: {} },
  Un = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa;
function r1() {
  if (aa) return Un;
  aa = 1;
  var e = $,
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    r = Object.prototype.hasOwnProperty,
    o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(a, l, u) {
    var c,
      d = {},
      f = null,
      h = null;
    u !== void 0 && (f = "" + u),
      l.key !== void 0 && (f = "" + l.key),
      l.ref !== void 0 && (h = l.ref);
    for (c in l) r.call(l, c) && !s.hasOwnProperty(c) && (d[c] = l[c]);
    if (a && a.defaultProps)
      for (c in ((l = a.defaultProps), l)) d[c] === void 0 && (d[c] = l[c]);
    return {
      $$typeof: t,
      type: a,
      key: f,
      ref: h,
      props: d,
      _owner: o.current,
    };
  }
  return (Un.Fragment = n), (Un.jsx = i), (Un.jsxs = i), Un;
}
var Yn = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ca;
function o1() {
  return (
    ca ||
      ((ca = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = $,
            t = Symbol.for("react.element"),
            n = Symbol.for("react.portal"),
            r = Symbol.for("react.fragment"),
            o = Symbol.for("react.strict_mode"),
            s = Symbol.for("react.profiler"),
            i = Symbol.for("react.provider"),
            a = Symbol.for("react.context"),
            l = Symbol.for("react.forward_ref"),
            u = Symbol.for("react.suspense"),
            c = Symbol.for("react.suspense_list"),
            d = Symbol.for("react.memo"),
            f = Symbol.for("react.lazy"),
            h = Symbol.for("react.offscreen"),
            p = Symbol.iterator,
            g = "@@iterator";
          function m(M) {
            if (M === null || typeof M != "object") return null;
            var U = (p && M[p]) || M[g];
            return typeof U == "function" ? U : null;
          }
          var v = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function x(M) {
            {
              for (
                var U = arguments.length,
                  J = new Array(U > 1 ? U - 1 : 0),
                  oe = 1;
                oe < U;
                oe++
              )
                J[oe - 1] = arguments[oe];
              b("error", M, J);
            }
          }
          function b(M, U, J) {
            {
              var oe = v.ReactDebugCurrentFrame,
                pe = oe.getStackAddendum();
              pe !== "" && ((U += "%s"), (J = J.concat([pe])));
              var Ee = J.map(function (he) {
                return String(he);
              });
              Ee.unshift("Warning: " + U),
                Function.prototype.apply.call(console[M], console, Ee);
            }
          }
          var _ = !1,
            C = !1,
            A = !1,
            I = !1,
            S = !1,
            P;
          P = Symbol.for("react.module.reference");
          function k(M) {
            return !!(
              typeof M == "string" ||
              typeof M == "function" ||
              M === r ||
              M === s ||
              S ||
              M === o ||
              M === u ||
              M === c ||
              I ||
              M === h ||
              _ ||
              C ||
              A ||
              (typeof M == "object" &&
                M !== null &&
                (M.$$typeof === f ||
                  M.$$typeof === d ||
                  M.$$typeof === i ||
                  M.$$typeof === a ||
                  M.$$typeof === l || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  M.$$typeof === P ||
                  M.getModuleId !== void 0))
            );
          }
          function j(M, U, J) {
            var oe = M.displayName;
            if (oe) return oe;
            var pe = U.displayName || U.name || "";
            return pe !== "" ? J + "(" + pe + ")" : J;
          }
          function z(M) {
            return M.displayName || "Context";
          }
          function B(M) {
            if (M == null) return null;
            if (
              (typeof M.tag == "number" &&
                x(
                  "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                ),
              typeof M == "function")
            )
              return M.displayName || M.name || null;
            if (typeof M == "string") return M;
            switch (M) {
              case r:
                return "Fragment";
              case n:
                return "Portal";
              case s:
                return "Profiler";
              case o:
                return "StrictMode";
              case u:
                return "Suspense";
              case c:
                return "SuspenseList";
            }
            if (typeof M == "object")
              switch (M.$$typeof) {
                case a:
                  var U = M;
                  return z(U) + ".Consumer";
                case i:
                  var J = M;
                  return z(J._context) + ".Provider";
                case l:
                  return j(M, M.render, "ForwardRef");
                case d:
                  var oe = M.displayName || null;
                  return oe !== null ? oe : B(M.type) || "Memo";
                case f: {
                  var pe = M,
                    Ee = pe._payload,
                    he = pe._init;
                  try {
                    return B(he(Ee));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var E = Object.assign,
            N = 0,
            w,
            O,
            L,
            D,
            T,
            R,
            H;
          function V() {}
          V.__reactDisabledLog = !0;
          function W() {
            {
              if (N === 0) {
                (w = console.log),
                  (O = console.info),
                  (L = console.warn),
                  (D = console.error),
                  (T = console.group),
                  (R = console.groupCollapsed),
                  (H = console.groupEnd);
                var M = {
                  configurable: !0,
                  enumerable: !0,
                  value: V,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: M,
                  log: M,
                  warn: M,
                  error: M,
                  group: M,
                  groupCollapsed: M,
                  groupEnd: M,
                });
              }
              N++;
            }
          }
          function Y() {
            {
              if ((N--, N === 0)) {
                var M = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: E({}, M, {
                    value: w,
                  }),
                  info: E({}, M, {
                    value: O,
                  }),
                  warn: E({}, M, {
                    value: L,
                  }),
                  error: E({}, M, {
                    value: D,
                  }),
                  group: E({}, M, {
                    value: T,
                  }),
                  groupCollapsed: E({}, M, {
                    value: R,
                  }),
                  groupEnd: E({}, M, {
                    value: H,
                  }),
                });
              }
              N < 0 &&
                x(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                );
            }
          }
          var Z = v.ReactCurrentDispatcher,
            X;
          function Q(M, U, J) {
            {
              if (X === void 0)
                try {
                  throw Error();
                } catch (pe) {
                  var oe = pe.stack.trim().match(/\n( *(at )?)/);
                  X = (oe && oe[1]) || "";
                }
              return (
                `
` +
                X +
                M
              );
            }
          }
          var te = !1,
            K;
          {
            var fe = typeof WeakMap == "function" ? WeakMap : Map;
            K = new fe();
          }
          function q(M, U) {
            if (!M || te) return "";
            {
              var J = K.get(M);
              if (J !== void 0) return J;
            }
            var oe;
            te = !0;
            var pe = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var Ee;
            (Ee = Z.current), (Z.current = null), W();
            try {
              if (U) {
                var he = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(he.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(he, []);
                  } catch (ct) {
                    oe = ct;
                  }
                  Reflect.construct(M, [], he);
                } else {
                  try {
                    he.call();
                  } catch (ct) {
                    oe = ct;
                  }
                  M.call(he.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (ct) {
                  oe = ct;
                }
                M();
              }
            } catch (ct) {
              if (ct && oe && typeof ct.stack == "string") {
                for (
                  var ce = ct.stack.split(`
`),
                    Le = oe.stack.split(`
`),
                    be = ce.length - 1,
                    Se = Le.length - 1;
                  be >= 1 && Se >= 0 && ce[be] !== Le[Se];

                )
                  Se--;
                for (; be >= 1 && Se >= 0; be--, Se--)
                  if (ce[be] !== Le[Se]) {
                    if (be !== 1 || Se !== 1)
                      do
                        if ((be--, Se--, Se < 0 || ce[be] !== Le[Se])) {
                          var Ve =
                            `
` + ce[be].replace(" at new ", " at ");
                          return (
                            M.displayName &&
                              Ve.includes("<anonymous>") &&
                              (Ve = Ve.replace("<anonymous>", M.displayName)),
                            typeof M == "function" && K.set(M, Ve),
                            Ve
                          );
                        }
                      while (be >= 1 && Se >= 0);
                    break;
                  }
              }
            } finally {
              (te = !1), (Z.current = Ee), Y(), (Error.prepareStackTrace = pe);
            }
            var Vt = M ? M.displayName || M.name : "",
              Lr = Vt ? Q(Vt) : "";
            return typeof M == "function" && K.set(M, Lr), Lr;
          }
          function ve(M, U, J) {
            return q(M, !1);
          }
          function je(M) {
            var U = M.prototype;
            return !!(U && U.isReactComponent);
          }
          function _e(M, U, J) {
            if (M == null) return "";
            if (typeof M == "function") return q(M, je(M));
            if (typeof M == "string") return Q(M);
            switch (M) {
              case u:
                return Q("Suspense");
              case c:
                return Q("SuspenseList");
            }
            if (typeof M == "object")
              switch (M.$$typeof) {
                case l:
                  return ve(M.render);
                case d:
                  return _e(M.type, U, J);
                case f: {
                  var oe = M,
                    pe = oe._payload,
                    Ee = oe._init;
                  try {
                    return _e(Ee(pe), U, J);
                  } catch {}
                }
              }
            return "";
          }
          var Fe = Object.prototype.hasOwnProperty,
            Ce = {},
            re = v.ReactDebugCurrentFrame;
          function Me(M) {
            if (M) {
              var U = M._owner,
                J = _e(M.type, M._source, U ? U.type : null);
              re.setExtraStackFrame(J);
            } else re.setExtraStackFrame(null);
          }
          function Tt(M, U, J, oe, pe) {
            {
              var Ee = Function.call.bind(Fe);
              for (var he in M)
                if (Ee(M, he)) {
                  var ce = void 0;
                  try {
                    if (typeof M[he] != "function") {
                      var Le = Error(
                        (oe || "React class") +
                          ": " +
                          J +
                          " type `" +
                          he +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof M[he] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      );
                      throw ((Le.name = "Invariant Violation"), Le);
                    }
                    ce = M[he](
                      U,
                      he,
                      oe,
                      J,
                      null,
                      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                    );
                  } catch (be) {
                    ce = be;
                  }
                  ce &&
                    !(ce instanceof Error) &&
                    (Me(pe),
                    x(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      oe || "React class",
                      J,
                      he,
                      typeof ce,
                    ),
                    Me(null)),
                    ce instanceof Error &&
                      !(ce.message in Ce) &&
                      ((Ce[ce.message] = !0),
                      Me(pe),
                      x("Failed %s type: %s", J, ce.message),
                      Me(null));
                }
            }
          }
          var Qt = Array.isArray;
          function mt(M) {
            return Qt(M);
          }
          function Ft(M) {
            {
              var U = typeof Symbol == "function" && Symbol.toStringTag,
                J =
                  (U && M[Symbol.toStringTag]) ||
                  M.constructor.name ||
                  "Object";
              return J;
            }
          }
          function st(M) {
            try {
              return At(M), !1;
            } catch {
              return !0;
            }
          }
          function At(M) {
            return "" + M;
          }
          function yt(M) {
            if (st(M))
              return (
                x(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  Ft(M),
                ),
                At(M)
              );
          }
          var qe = v.ReactCurrentOwner,
            Ht = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Dt,
            Bt,
            Re;
          Re = {};
          function Xe(M) {
            if (Fe.call(M, "ref")) {
              var U = Object.getOwnPropertyDescriptor(M, "ref").get;
              if (U && U.isReactWarning) return !1;
            }
            return M.ref !== void 0;
          }
          function It(M) {
            if (Fe.call(M, "key")) {
              var U = Object.getOwnPropertyDescriptor(M, "key").get;
              if (U && U.isReactWarning) return !1;
            }
            return M.key !== void 0;
          }
          function Ot(M, U) {
            if (
              typeof M.ref == "string" &&
              qe.current &&
              U &&
              qe.current.stateNode !== U
            ) {
              var J = B(qe.current.type);
              Re[J] ||
                (x(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  B(qe.current.type),
                  M.ref,
                ),
                (Re[J] = !0));
            }
          }
          function Rt(M, U) {
            {
              var J = function () {
                Dt ||
                  ((Dt = !0),
                  x(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    U,
                  ));
              };
              (J.isReactWarning = !0),
                Object.defineProperty(M, "key", {
                  get: J,
                  configurable: !0,
                });
            }
          }
          function it(M, U) {
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
                Object.defineProperty(M, "ref", {
                  get: J,
                  configurable: !0,
                });
            }
          }
          var Qe = function (M, U, J, oe, pe, Ee, he) {
            var ce = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: M,
              key: U,
              ref: J,
              props: he,
              // Record the component responsible for creating this element.
              _owner: Ee,
            };
            return (
              (ce._store = {}),
              Object.defineProperty(ce._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(ce, "_self", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: oe,
              }),
              Object.defineProperty(ce, "_source", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: pe,
              }),
              Object.freeze && (Object.freeze(ce.props), Object.freeze(ce)),
              ce
            );
          };
          function en(M, U, J, oe, pe) {
            {
              var Ee,
                he = {},
                ce = null,
                Le = null;
              J !== void 0 && (yt(J), (ce = "" + J)),
                It(U) && (yt(U.key), (ce = "" + U.key)),
                Xe(U) && ((Le = U.ref), Ot(U, pe));
              for (Ee in U)
                Fe.call(U, Ee) && !Ht.hasOwnProperty(Ee) && (he[Ee] = U[Ee]);
              if (M && M.defaultProps) {
                var be = M.defaultProps;
                for (Ee in be) he[Ee] === void 0 && (he[Ee] = be[Ee]);
              }
              if (ce || Le) {
                var Se =
                  typeof M == "function"
                    ? M.displayName || M.name || "Unknown"
                    : M;
                ce && Rt(he, Se), Le && it(he, Se);
              }
              return Qe(M, ce, Le, pe, oe, qe.current, he);
            }
          }
          var tn = v.ReactCurrentOwner,
            zt = v.ReactDebugCurrentFrame;
          function vt(M) {
            if (M) {
              var U = M._owner,
                J = _e(M.type, M._source, U ? U.type : null);
              zt.setExtraStackFrame(J);
            } else zt.setExtraStackFrame(null);
          }
          var yn;
          yn = !1;
          function at(M) {
            return typeof M == "object" && M !== null && M.$$typeof === t;
          }
          function Ar() {
            {
              if (tn.current) {
                var M = B(tn.current.type);
                if (M)
                  return (
                    `

Check the render method of \`` +
                    M +
                    "`."
                  );
              }
              return "";
            }
          }
          function Zo(M) {
            {
              if (M !== void 0) {
                var U = M.fileName.replace(/^.*[\\\/]/, ""),
                  J = M.lineNumber;
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
          var Dr = {};
          function qo(M) {
            {
              var U = Ar();
              if (!U) {
                var J = typeof M == "string" ? M : M.displayName || M.name;
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
          function Ir(M, U) {
            {
              if (!M._store || M._store.validated || M.key != null) return;
              M._store.validated = !0;
              var J = qo(U);
              if (Dr[J]) return;
              Dr[J] = !0;
              var oe = "";
              M &&
                M._owner &&
                M._owner !== tn.current &&
                (oe = " It was passed a child from " + B(M._owner.type) + "."),
                vt(M),
                x(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  J,
                  oe,
                ),
                vt(null);
            }
          }
          function Or(M, U) {
            {
              if (typeof M != "object") return;
              if (mt(M))
                for (var J = 0; J < M.length; J++) {
                  var oe = M[J];
                  at(oe) && Ir(oe, U);
                }
              else if (at(M)) M._store && (M._store.validated = !0);
              else if (M) {
                var pe = m(M);
                if (typeof pe == "function" && pe !== M.entries)
                  for (var Ee = pe.call(M), he; !(he = Ee.next()).done; )
                    at(he.value) && Ir(he.value, U);
              }
            }
          }
          function Xo(M) {
            {
              var U = M.type;
              if (U == null || typeof U == "string") return;
              var J;
              if (typeof U == "function") J = U.propTypes;
              else if (
                typeof U == "object" &&
                (U.$$typeof === l || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  U.$$typeof === d)
              )
                J = U.propTypes;
              else return;
              if (J) {
                var oe = B(U);
                Tt(J, M.props, "prop", oe, M);
              } else if (U.PropTypes !== void 0 && !yn) {
                yn = !0;
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
          function Ko(M) {
            {
              for (var U = Object.keys(M.props), J = 0; J < U.length; J++) {
                var oe = U[J];
                if (oe !== "children" && oe !== "key") {
                  vt(M),
                    x(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      oe,
                    ),
                    vt(null);
                  break;
                }
              }
              M.ref !== null &&
                (vt(M),
                x("Invalid attribute `ref` supplied to `React.Fragment`."),
                vt(null));
            }
          }
          function Rr(M, U, J, oe, pe, Ee) {
            {
              var he = k(M);
              if (!he) {
                var ce = "";
                (M === void 0 ||
                  (typeof M == "object" &&
                    M !== null &&
                    Object.keys(M).length === 0)) &&
                  (ce +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var Le = Zo(pe);
                Le ? (ce += Le) : (ce += Ar());
                var be;
                M === null
                  ? (be = "null")
                  : mt(M)
                    ? (be = "array")
                    : M !== void 0 && M.$$typeof === t
                      ? ((be = "<" + (B(M.type) || "Unknown") + " />"),
                        (ce =
                          " Did you accidentally export a JSX literal instead of a component?"))
                      : (be = typeof M),
                  x(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    be,
                    ce,
                  );
              }
              var Se = en(M, U, J, pe, Ee);
              if (Se == null) return Se;
              if (he) {
                var Ve = U.children;
                if (Ve !== void 0)
                  if (oe)
                    if (mt(Ve)) {
                      for (var Vt = 0; Vt < Ve.length; Vt++) Or(Ve[Vt], M);
                      Object.freeze && Object.freeze(Ve);
                    } else
                      x(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else Or(Ve, M);
              }
              return M === r ? Ko(Se) : Xo(Se), Se;
            }
          }
          function Go(M, U, J) {
            return Rr(M, U, J, !0);
          }
          function Jo(M, U, J) {
            return Rr(M, U, J, !1);
          }
          var Qo = Jo,
            Mr = Go;
          (Yn.Fragment = r), (Yn.jsx = Qo), (Yn.jsxs = Mr);
        })()),
    Yn
  );
}
process.env.NODE_ENV === "production"
  ? (Is.exports = r1())
  : (Is.exports = o1());
var y = Is.exports;
const s1 = {
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
      hyphens: "none",
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
  },
  i1 = {
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
  },
  a1 = {
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
  },
  c1 = "_codeblock_tsha5_1",
  l1 = {
    codeblock: c1,
  },
  u1 = "_iconButton_eti7u_1",
  d1 = {
    iconButton: u1,
  },
  f1 = (e) =>
    /* @__PURE__ */ y.jsx(y1, {
      title: e.title,
      children: /* @__PURE__ */ y.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${e.className ?? ""} ${d1.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  di = f1,
  h1 = pt(null),
  ns = {
    didCatch: !1,
    error: null,
  };
class p1 extends Wd {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = ns);
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
      for (var n, r, o = arguments.length, s = new Array(o), i = 0; i < o; i++)
        s[i] = arguments[i];
      (n = (r = this.props).onReset) === null ||
        n === void 0 ||
        n.call(r, {
          args: s,
          reason: "imperative-api",
        }),
        this.setState(ns);
    }
  }
  componentDidCatch(t, n) {
    var r, o;
    (r = (o = this.props).onError) === null || r === void 0 || r.call(o, t, n);
  }
  componentDidUpdate(t, n) {
    const { didCatch: r } = this.state,
      { resetKeys: o } = this.props;
    if (r && n.error !== null && g1(t.resetKeys, o)) {
      var s, i;
      (s = (i = this.props).onReset) === null ||
        s === void 0 ||
        s.call(i, {
          next: o,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(ns);
    }
  }
  render() {
    const {
        children: t,
        fallbackRender: n,
        FallbackComponent: r,
        fallback: o,
      } = this.props,
      { didCatch: s, error: i } = this.state;
    let a = t;
    if (s) {
      const l = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (typeof n == "function") a = n(l);
      else if (r) a = ia(r, l);
      else if (o === null || Wc(o)) a = o;
      else throw i;
    }
    return ia(
      h1.Provider,
      {
        value: {
          didCatch: s,
          error: i,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      a,
    );
  }
}
function g1() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, r) => !Object.is(n, t[r]));
}
const m1 = (e) => {
    const [t, n] = de(!1),
      r = () => n(!t),
      o = se(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ y.jsxs(p1, {
      fallback: /* @__PURE__ */ y.jsx("span", {
        id: o.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ y.jsx("span", { id: o.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ y.jsx(Kd, {
              isOpen: t,
              target: o.current,
              toggle: r,
              className: e.className,
              children: e.title,
            })
          : null,
      ],
    });
  },
  y1 = m1,
  v1 = "_loadingBtn_gadec_1",
  E1 = {
    loadingBtn: v1,
  },
  C1 = ({ loading: e, ...t }) =>
    /* @__PURE__ */ y.jsx(Ue, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${E1.loadingBtn}`,
      children: e ? /* @__PURE__ */ y.jsx(Gd, {}) : t.children,
    }),
  x1 = C1,
  _1 = { vs: i1, "vsc-dark-plus": a1, solarizedLight: s1 },
  b1 = ({
    code: e,
    language: t,
    fileName: n,
    theme: r = "vs",
    showLineNumbers: o,
  }) =>
    /* @__PURE__ */ y.jsxs(br, {
      className: l1.codeblock,
      children: [
        n ? /* @__PURE__ */ y.jsx(qc, { children: n }) : null,
        /* @__PURE__ */ y.jsx(wr, {
          children: /* @__PURE__ */ y.jsx(Xd, {
            showLineNumbers: o,
            language: t,
            style: _1[r],
            children: e,
          }),
        }),
      ],
    }),
  w1 = b1,
  Oe = {
    get: async (e, t, n) => ({}),
    post: async (e, t, n) => ({}),
  };
var fi = /* @__PURE__ */ ((e) => (
  (e.DBT_DOCS = "dbt-docs"),
  (e.DOCUMENTATION_EDITOR = "documentation-editor"),
  (e.SAAS = "saas"),
  e
))(fi || {});
const S1 = () => {
  var t, n, r;
  const e =
    (r =
      (n = (t = window.location.hash) == null ? void 0 : t.split("#")[1]) ==
      null
        ? void 0
        : n.replace("!/", "")) == null
      ? void 0
      : r.split("/");
  return {
    name: e == null ? void 0 : e[1],
    resourceType: e == null ? void 0 : e[0],
  };
};
var Gc = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(window, function () {
    return (function (n) {
      var r = {};
      function o(s) {
        if (r[s]) return r[s].exports;
        var i = (r[s] = { i: s, l: !1, exports: {} });
        return n[s].call(i.exports, i, i.exports, o), (i.l = !0), i.exports;
      }
      return (
        (o.m = n),
        (o.c = r),
        (o.d = function (s, i, a) {
          o.o(s, i) || Object.defineProperty(s, i, { enumerable: !0, get: a });
        }),
        (o.r = function (s) {
          typeof Symbol < "u" &&
            Symbol.toStringTag &&
            Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(s, "__esModule", { value: !0 });
        }),
        (o.t = function (s, i) {
          if (
            (1 & i && (s = o(s)),
            8 & i || (4 & i && typeof s == "object" && s && s.__esModule))
          )
            return s;
          var a = /* @__PURE__ */ Object.create(null);
          if (
            (o.r(a),
            Object.defineProperty(a, "default", { enumerable: !0, value: s }),
            2 & i && typeof s != "string")
          )
            for (var l in s)
              o.d(
                a,
                l,
                function (u) {
                  return s[u];
                }.bind(null, l),
              );
          return a;
        }),
        (o.n = function (s) {
          var i =
            s && s.__esModule
              ? function () {
                  return s.default;
                }
              : function () {
                  return s;
                };
          return o.d(i, "a", i), i;
        }),
        (o.o = function (s, i) {
          return Object.prototype.hasOwnProperty.call(s, i);
        }),
        (o.p = ""),
        o((o.s = 7))
      );
    })([
      function (n, r, o) {
        var s,
          i =
            (this && this.__extends) ||
            ((s = function (d, f) {
              return (s =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (h, p) {
                    h.__proto__ = p;
                  }) ||
                function (h, p) {
                  for (var g in p)
                    Object.prototype.hasOwnProperty.call(p, g) && (h[g] = p[g]);
                })(d, f);
            }),
            function (d, f) {
              function h() {
                this.constructor = d;
              }
              s(d, f),
                (d.prototype =
                  f === null
                    ? Object.create(f)
                    : ((h.prototype = f.prototype), new h()));
            }),
          a =
            (this && this.__importDefault) ||
            function (d) {
              return d && d.__esModule ? d : { default: d };
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.eventEmitter =
            r.INTERNAL_ERROR_EVENT =
            r.UNKNOWN_IDX =
            r.ROOT_IDX =
            r.getStylesheet =
            r.getDefaultOptions =
            r.CAMEL_DATASET_SPLIT_TYPE =
            r.CAMEL_DATASET_IDENTIFIER_EXTRA =
            r.CAMEL_DATASET_IDENTIFIER =
            r.DATASET_SPLIT_TYPE =
            r.DATASET_IDENTIFIER_EXTRA =
            r.DATASET_IDENTIFIER =
            r.STYLESHEET_ID =
            r.LOCAL_STORE_KEY =
            r.ID_DIVISION =
              void 0);
        var l = a(o(10)),
          u = a(o(2));
        (r.ID_DIVISION = ";"),
          (r.LOCAL_STORE_KEY = "highlight-mengshou"),
          (r.STYLESHEET_ID = "highlight-mengshou-style"),
          (r.DATASET_IDENTIFIER = "highlight-id"),
          (r.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra"),
          (r.DATASET_SPLIT_TYPE = "highlight-split-type"),
          (r.CAMEL_DATASET_IDENTIFIER = l.default(r.DATASET_IDENTIFIER)),
          (r.CAMEL_DATASET_IDENTIFIER_EXTRA = l.default(
            r.DATASET_IDENTIFIER_EXTRA,
          )),
          (r.CAMEL_DATASET_SPLIT_TYPE = l.default(r.DATASET_SPLIT_TYPE)),
          (r.getDefaultOptions = function () {
            return {
              $root: document || document.documentElement,
              exceptSelectors: null,
              wrapTag: "span",
              verbose: !1,
              style: { className: "highlight-mengshou-wrap" },
            };
          }),
          (r.getStylesheet = function () {
            return (
              `
    .` +
              r.getDefaultOptions().style.className +
              ` {
        background: #ff9;
        cursor: pointer;
    }
    .` +
              r.getDefaultOptions().style.className +
              `.active {
        background: #ffb;
    }
`
            );
          }),
          (r.ROOT_IDX = -2),
          (r.UNKNOWN_IDX = -1),
          (r.INTERNAL_ERROR_EVENT = "error");
        var c = (function (d) {
          function f() {
            return (d !== null && d.apply(this, arguments)) || this;
          }
          return i(f, d), f;
        })(u.default);
        r.eventEmitter = new c();
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.UserInputEvent =
            r.SelectedNodeType =
            r.CreateFrom =
            r.EventType =
            r.ERROR =
            r.SplitType =
              void 0),
          (function (s) {
            (s.none = "none"),
              (s.head = "head"),
              (s.tail = "tail"),
              (s.both = "both");
          })(r.SplitType || (r.SplitType = {})),
          (function (s) {
            (s.DOM_TYPE_ERROR = "[DOM] Receive wrong node type."),
              (s.DOM_SELECTION_EMPTY =
                "[DOM] The selection contains no dom node, may be you except them."),
              (s.RANGE_INVALID =
                "[RANGE] Got invalid dom range, can't convert to a valid highlight range."),
              (s.RANGE_NODE_INVALID =
                "[RANGE] Start or end node isn't a text node, it may occur an error."),
              (s.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict."),
              (s.CACHE_SET_ERROR =
                "[CACHE] Cache.data can't be set manually, please use .save()."),
              (s.SOURCE_TYPE_ERROR =
                "[SOURCE] Object isn't a highlight source instance."),
              (s.HIGHLIGHT_RANGE_FROZEN =
                "[HIGHLIGHT_RANGE] A highlight range must be frozen before render."),
              (s.HIGHLIGHT_SOURCE_RECREATE =
                "[HIGHLIGHT_SOURCE] Recreate highlights from sources error."),
              (s.HIGHLIGHT_SOURCE_NONE_RENDER =
                "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.");
          })(r.ERROR || (r.ERROR = {})),
          (function (s) {
            (s.CREATE = "selection:create"),
              (s.REMOVE = "selection:remove"),
              (s.MODIFY = "selection:modify"),
              (s.HOVER = "selection:hover"),
              (s.HOVER_OUT = "selection:hover-out"),
              (s.CLICK = "selection:click");
          })(r.EventType || (r.EventType = {})),
          (function (s) {
            (s.STORE = "from-store"), (s.INPUT = "from-input");
          })(r.CreateFrom || (r.CreateFrom = {})),
          (function (s) {
            (s.text = "text"), (s.span = "span");
          })(r.SelectedNodeType || (r.SelectedNodeType = {})),
          (function (s) {
            (s.touchend = "touchend"),
              (s.mouseup = "mouseup"),
              (s.touchstart = "touchstart"),
              (s.click = "click"),
              (s.mouseover = "mouseover");
          })(r.UserInputEvent || (r.UserInputEvent = {}));
      },
      function (n, r, o) {
        var s =
            (this && this.__read) ||
            function (l, u) {
              var c = typeof Symbol == "function" && l[Symbol.iterator];
              if (!c) return l;
              var d,
                f,
                h = c.call(l),
                p = [];
              try {
                for (; (u === void 0 || u-- > 0) && !(d = h.next()).done; )
                  p.push(d.value);
              } catch (g) {
                f = { error: g };
              } finally {
                try {
                  d && !d.done && (c = h.return) && c.call(h);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          i =
            (this && this.__spread) ||
            function () {
              for (var l = [], u = 0; u < arguments.length; u++)
                l = l.concat(s(arguments[u]));
              return l;
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var a = (function () {
          function l() {
            this.handlersMap = /* @__PURE__ */ Object.create(null);
          }
          return (
            (l.prototype.on = function (u, c) {
              return (
                this.handlersMap[u] || (this.handlersMap[u] = []),
                this.handlersMap[u].push(c),
                this
              );
            }),
            (l.prototype.off = function (u, c) {
              return (
                this.handlersMap[u] &&
                  this.handlersMap[u].splice(
                    this.handlersMap[u].indexOf(c) >>> 0,
                    1,
                  ),
                this
              );
            }),
            (l.prototype.emit = function (u) {
              for (var c = [], d = 1; d < arguments.length; d++)
                c[d - 1] = arguments[d];
              return (
                this.handlersMap[u] &&
                  this.handlersMap[u].slice().forEach(function (f) {
                    f.apply(void 0, i(c));
                  }),
                this
              );
            }),
            l
          );
        })();
        r.default = a;
      },
      function (n, r, o) {
        var s =
          (this && this.__importDefault) ||
          function (u) {
            return u && u.__esModule ? u : { default: u };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = s(o(5)),
          a = o(9),
          l = (function () {
            function u(c, d, f, h, p) {
              (this.startMeta = c),
                (this.endMeta = d),
                (this.text = f),
                (this.id = h),
                (this.__isHighlightSource = {}),
                p && (this.extra = p);
            }
            return (
              (u.prototype.deSerialize = function (c, d) {
                var f = a.queryElementNode(this, c),
                  h = f.start,
                  p = f.end,
                  g = a.getTextChildByOffset(h, this.startMeta.textOffset),
                  m = a.getTextChildByOffset(p, this.endMeta.textOffset);
                if (!d.Serialize.Restore.isEmpty()) {
                  var v = d.Serialize.Restore.call(this, g, m) || [];
                  (g = v[0] || g), (m = v[1] || m);
                }
                return new i.default(g, m, this.text, this.id, !0);
              }),
              u
            );
          })();
        r.default = l;
      },
      function (n, r, o) {
        var s =
            (this && this.__values) ||
            function (c) {
              var d = typeof Symbol == "function" && Symbol.iterator,
                f = d && c[d],
                h = 0;
              if (f) return f.call(c);
              if (c && typeof c.length == "number")
                return {
                  next: function () {
                    return (
                      c && h >= c.length && (c = void 0),
                      { value: c && c[h++], done: !c }
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
            function (c, d) {
              var f = typeof Symbol == "function" && c[Symbol.iterator];
              if (!f) return c;
              var h,
                p,
                g = f.call(c),
                m = [];
              try {
                for (; (d === void 0 || d-- > 0) && !(h = g.next()).done; )
                  m.push(h.value);
              } catch (v) {
                p = { error: v };
              } finally {
                try {
                  h && !h.done && (f = g.return) && f.call(g);
                } finally {
                  if (p) throw p.error;
                }
              }
              return m;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var c = [], d = 0; d < arguments.length; d++)
                c = c.concat(i(arguments[d]));
              return c;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.hasClass =
            r.removeAllClass =
            r.removeClass =
            r.addClass =
            r.addEventListener =
            r.removeEventListener =
            r.forEach =
            r.getHighlightById =
            r.getHighlightsByRoot =
            r.getExtraHighlightId =
            r.getHighlightId =
            r.isHighlightWrapNode =
              void 0);
        var l = o(0);
        r.isHighlightWrapNode = function (c) {
          return !!c.dataset && !!c.dataset[l.CAMEL_DATASET_IDENTIFIER];
        };
        var u = function (c, d) {
          for (var f = !1, h = null; c; ) {
            if ((r.isHighlightWrapNode(c) && (h = c), c === d)) {
              f = !0;
              break;
            }
            c = c.parentNode;
          }
          return f ? h : null;
        };
        (r.getHighlightId = function (c, d) {
          return (c = u(c, d)) ? c.dataset[l.CAMEL_DATASET_IDENTIFIER] : "";
        }),
          (r.getExtraHighlightId = function (c, d) {
            return (c = u(c, d))
              ? c.dataset[l.CAMEL_DATASET_IDENTIFIER_EXTRA]
                  .split(l.ID_DIVISION)
                  .filter(function (f) {
                    return f;
                  })
              : [];
          }),
          (r.getHighlightsByRoot = function (c, d) {
            var f, h;
            Array.isArray(c) || (c = [c]);
            var p = [];
            try {
              for (var g = s(c), m = g.next(); !m.done; m = g.next()) {
                var v = m.value.querySelectorAll(
                  d + "[data-" + l.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, v);
              }
            } catch (x) {
              f = { error: x };
            } finally {
              try {
                m && !m.done && (h = g.return) && h.call(g);
              } finally {
                if (f) throw f.error;
              }
            }
            return p;
          }),
          (r.getHighlightById = function (c, d, f) {
            var h,
              p,
              g = [],
              m = new RegExp(
                "(" +
                  d +
                  "\\" +
                  l.ID_DIVISION +
                  "|\\" +
                  l.ID_DIVISION +
                  "?" +
                  d +
                  "$)",
              ),
              v = c.querySelectorAll(f + "[data-" + l.DATASET_IDENTIFIER + "]");
            try {
              for (var x = s(v), b = x.next(); !b.done; b = x.next()) {
                var _ = b.value;
                if (_.dataset[l.CAMEL_DATASET_IDENTIFIER] !== d) {
                  var C = _.dataset[l.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  m.test(C) && g.push(_);
                } else g.push(_);
              }
            } catch (A) {
              h = { error: A };
            } finally {
              try {
                b && !b.done && (p = x.return) && p.call(x);
              } finally {
                if (h) throw h.error;
              }
            }
            return g;
          }),
          (r.forEach = function (c, d) {
            for (var f = 0; f < c.length; f++) d(c[f], f, c);
          }),
          (r.removeEventListener = function (c, d, f) {
            c.removeEventListener(d, f);
          }),
          (r.addEventListener = function (c, d, f) {
            return (
              c.addEventListener(d, f),
              function () {
                r.removeEventListener(c, d, f);
              }
            );
          }),
          (r.addClass = function (c, d) {
            var f;
            Array.isArray(d) || (d = [d]), (f = c.classList).add.apply(f, a(d));
          }),
          (r.removeClass = function (c, d) {
            c.classList.remove(d);
          }),
          (r.removeAllClass = function (c) {
            c.className = "";
          }),
          (r.hasClass = function (c, d) {
            return c.classList.contains(d);
          });
      },
      function (n, r, o) {
        var s =
          (this && this.__importDefault) ||
          function (h) {
            return h && h.__esModule ? h : { default: h };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = s(o(3)),
          a = o(1),
          l = o(11),
          u = s(o(6)),
          c = o(12),
          d = o(0),
          f = (function () {
            function h(p, g, m, v, x) {
              x === void 0 && (x = !1),
                (p.$node.nodeType === 3 && g.$node.nodeType === 3) ||
                  d.eventEmitter.emit(d.INTERNAL_ERROR_EVENT, {
                    type: a.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = c.formatDomNode(p)),
                (this.end = c.formatDomNode(g)),
                (this.text = m),
                (this.frozen = x),
                (this.id = v);
            }
            return (
              (h.fromSelection = function (p) {
                var g = l.getDomRange();
                if (!g) return null;
                var m = { $node: g.startContainer, offset: g.startOffset },
                  v = { $node: g.endContainer, offset: g.endOffset },
                  x = g.toString(),
                  b = p.call(m, v, x);
                return new h(m, v, x, (b = b ?? u.default()));
              }),
              (h.prototype.serialize = function (p, g) {
                var m,
                  v = c.getDomMeta(this.start.$node, this.start.offset, p),
                  x = c.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  g.Serialize.RecordInfo.isEmpty() ||
                    (m = g.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new i.default(v, x, this.text, this.id, m)
                );
              }),
              (h.removeDomRange = l.removeSelection),
              h
            );
          })();
        r.default = f;
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = function s(i) {
            return i
              ? (i ^ ((16 * Math.random()) >> (i / 4))).toString(16)
              : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, s);
          });
      },
      function (n, r, o) {
        n.exports = o(8);
      },
      function (n, r, o) {
        var s,
          i =
            (this && this.__extends) ||
            ((s = function (C, A) {
              return (s =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (I, S) {
                    I.__proto__ = S;
                  }) ||
                function (I, S) {
                  for (var P in S)
                    Object.prototype.hasOwnProperty.call(S, P) && (I[P] = S[P]);
                })(C, A);
            }),
            function (C, A) {
              function I() {
                this.constructor = C;
              }
              s(C, A),
                (C.prototype =
                  A === null
                    ? Object.create(A)
                    : ((I.prototype = A.prototype), new I()));
            }),
          a =
            (this && this.__assign) ||
            function () {
              return (a =
                Object.assign ||
                function (C) {
                  for (var A, I = 1, S = arguments.length; I < S; I++)
                    for (var P in (A = arguments[I]))
                      Object.prototype.hasOwnProperty.call(A, P) &&
                        (C[P] = A[P]);
                  return C;
                }).apply(this, arguments);
            },
          l =
            (this && this.__importDefault) ||
            function (C) {
              return C && C.__esModule ? C : { default: C };
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var u = l(o(2)),
          c = l(o(5)),
          d = l(o(3)),
          f = l(o(6)),
          h = l(o(13)),
          p = l(o(14)),
          g = l(o(16)),
          m = l(o(17)),
          v = o(0),
          x = o(1),
          b = o(4),
          _ = (function (C) {
            function A(I) {
              var S = C.call(this) || this;
              (S.event = p.default()),
                (S.run = function () {
                  return b.addEventListener(
                    S.options.$root,
                    S.event.PointerEnd,
                    S._handleSelection,
                  );
                }),
                (S.stop = function () {
                  b.removeEventListener(
                    S.options.$root,
                    S.event.PointerEnd,
                    S._handleSelection,
                  );
                }),
                (S.addClass = function (k, j) {
                  S.getDoms(j).forEach(function (z) {
                    b.addClass(z, k);
                  });
                }),
                (S.removeClass = function (k, j) {
                  S.getDoms(j).forEach(function (z) {
                    b.removeClass(z, k);
                  });
                }),
                (S.getIdByDom = function (k) {
                  return b.getHighlightId(k, S.options.$root);
                }),
                (S.getExtraIdByDom = function (k) {
                  return b.getExtraHighlightId(k, S.options.$root);
                }),
                (S.getDoms = function (k) {
                  return k
                    ? b.getHighlightById(S.options.$root, k, S.options.wrapTag)
                    : b.getHighlightsByRoot(S.options.$root, S.options.wrapTag);
                }),
                (S.dispose = function () {
                  var k = S.options.$root;
                  b.removeEventListener(
                    k,
                    S.event.PointerOver,
                    S._handleHighlightHover,
                  ),
                    b.removeEventListener(
                      k,
                      S.event.PointerEnd,
                      S._handleSelection,
                    ),
                    b.removeEventListener(
                      k,
                      S.event.PointerTap,
                      S._handleHighlightClick,
                    ),
                    S.removeAll();
                }),
                (S.setOption = function (k) {
                  (S.options = a(a({}, S.options), k)),
                    (S.painter = new m.default(
                      {
                        $root: S.options.$root,
                        wrapTag: S.options.wrapTag,
                        className: S.options.style.className,
                        exceptSelectors: S.options.exceptSelectors,
                      },
                      S.hooks,
                    ));
                }),
                (S.fromRange = function (k) {
                  var j = { $node: k.startContainer, offset: k.startOffset },
                    z = { $node: k.endContainer, offset: k.endOffset },
                    B = k.toString(),
                    E = S.hooks.Render.UUID.call(j, z, B);
                  E = E ?? f.default();
                  var N = new c.default(j, z, B, E);
                  return N
                    ? S._highlightFromHRange(N)
                    : (v.eventEmitter.emit(v.INTERNAL_ERROR_EVENT, {
                        type: x.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (S.fromStore = function (k, j, z, B, E) {
                  var N = new d.default(k, j, z, B, E);
                  try {
                    return S._highlightFromHSource(N), N;
                  } catch (w) {
                    return (
                      v.eventEmitter.emit(v.INTERNAL_ERROR_EVENT, {
                        type: x.ERROR.HIGHLIGHT_SOURCE_RECREATE,
                        error: w,
                        detail: N,
                      }),
                      null
                    );
                  }
                }),
                (S._getHooks = function () {
                  return {
                    Render: {
                      UUID: new h.default("Render.UUID"),
                      SelectedNodes: new h.default("Render.SelectedNodes"),
                      WrapNode: new h.default("Render.WrapNode"),
                    },
                    Serialize: {
                      Restore: new h.default("Serialize.Restore"),
                      RecordInfo: new h.default("Serialize.RecordInfo"),
                    },
                    Remove: {
                      UpdateNodes: new h.default("Remove.UpdateNodes"),
                    },
                  };
                }),
                (S._highlightFromHRange = function (k) {
                  var j = k.serialize(S.options.$root, S.hooks);
                  return S.painter.highlightRange(k).length === 0
                    ? (v.eventEmitter.emit(v.INTERNAL_ERROR_EVENT, {
                        type: x.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (S.cache.save(j),
                      S.emit(
                        x.EventType.CREATE,
                        { sources: [j], type: x.CreateFrom.INPUT },
                        S,
                      ),
                      j);
                }),
                (S._handleSelection = function () {
                  var k = c.default.fromSelection(S.hooks.Render.UUID);
                  k && (S._highlightFromHRange(k), c.default.removeDomRange());
                }),
                (S._handleHighlightHover = function (k) {
                  var j = k.target;
                  if (!b.isHighlightWrapNode(j))
                    return (
                      S._hoverId &&
                        S.emit(x.EventType.HOVER_OUT, { id: S._hoverId }, S, k),
                      void (S._hoverId = null)
                    );
                  var z = b.getHighlightId(j, S.options.$root);
                  S._hoverId !== z &&
                    (S._hoverId &&
                      S.emit(x.EventType.HOVER_OUT, { id: S._hoverId }, S, k),
                    (S._hoverId = z),
                    S.emit(x.EventType.HOVER, { id: S._hoverId }, S, k));
                }),
                (S._handleError = function (k) {
                  S.options.verbose && console.warn(k);
                }),
                (S._handleHighlightClick = function (k) {
                  var j = k.target;
                  if (b.isHighlightWrapNode(j)) {
                    var z = b.getHighlightId(j, S.options.$root);
                    S.emit(x.EventType.CLICK, { id: z }, S, k);
                  }
                }),
                (S.options = v.getDefaultOptions()),
                (S.hooks = S._getHooks()),
                S.setOption(I),
                (S.cache = new g.default());
              var P = S.options.$root;
              return (
                b.addEventListener(
                  P,
                  S.event.PointerOver,
                  S._handleHighlightHover,
                ),
                b.addEventListener(
                  P,
                  S.event.PointerTap,
                  S._handleHighlightClick,
                ),
                v.eventEmitter.on(v.INTERNAL_ERROR_EVENT, S._handleError),
                S
              );
            }
            return (
              i(A, C),
              (A.prototype.remove = function (I) {
                if (I) {
                  var S = this.painter.removeHighlight(I);
                  this.cache.remove(I),
                    S && this.emit(x.EventType.REMOVE, { ids: [I] }, this);
                }
              }),
              (A.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var I = this.cache.removeAll();
                this.emit(x.EventType.REMOVE, { ids: I }, this);
              }),
              (A.prototype._highlightFromHSource = function (I) {
                I === void 0 && (I = []);
                var S = this.painter.highlightSource(I);
                this.emit(
                  x.EventType.CREATE,
                  { sources: S, type: x.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(I);
              }),
              (A.event = x.EventType),
              (A.isHighlightWrapNode = b.isHighlightWrapNode),
              (A.isHighlightSource = function (I) {
                return !!I.__isHighlightSource;
              }),
              A
            );
          })(u.default);
        r.default = _;
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.queryElementNode = r.getTextChildByOffset = void 0);
        var s = o(0);
        (r.getTextChildByOffset = function (i, a) {
          for (var l = [i], u = null, c = 0, d = 0; (u = l.pop()); ) {
            for (var f = u.childNodes, h = f.length - 1; h >= 0; h--)
              l.push(f[h]);
            if (
              u.nodeType === 3 &&
              ((d = a - c), (c += u.textContent.length) >= a)
            )
              break;
          }
          return u || (u = i), { $node: u, offset: d };
        }),
          (r.queryElementNode = function (i, a) {
            return {
              start:
                i.startMeta.parentIndex === s.ROOT_IDX
                  ? a
                  : a.getElementsByTagName(i.startMeta.parentTagName)[
                      i.startMeta.parentIndex
                    ],
              end:
                i.endMeta.parentIndex === s.ROOT_IDX
                  ? a
                  : a.getElementsByTagName(i.endMeta.parentTagName)[
                      i.endMeta.parentIndex
                    ],
            };
          });
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = function (s) {
            return s.split("-").reduce(function (i, a, l) {
              return i + (l === 0 ? a : a[0].toUpperCase() + a.slice(1));
            }, "");
          });
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.removeSelection = r.getDomRange = void 0),
          (r.getDomRange = function () {
            var s = window.getSelection();
            return s.isCollapsed
              ? (console.debug("no text selected"), null)
              : s.getRangeAt(0);
          }),
          (r.removeSelection = function () {
            window.getSelection().removeAllRanges();
          });
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.formatDomNode = r.getDomMeta = void 0);
        var s = o(0);
        (r.getDomMeta = function (i, a, l) {
          var u = (function (f) {
              if (
                f instanceof HTMLElement &&
                (!f.dataset || !f.dataset[s.CAMEL_DATASET_IDENTIFIER])
              )
                return f;
              for (
                var h = f.parentNode;
                h != null && h.dataset[s.CAMEL_DATASET_IDENTIFIER];

              )
                h = h.parentNode;
              return h;
            })(i),
            c =
              u === l
                ? s.ROOT_IDX
                : (function (f, h) {
                    for (
                      var p = f.tagName, g = h.getElementsByTagName(p), m = 0;
                      m < g.length;
                      m++
                    )
                      if (f === g[m]) return m;
                    return s.UNKNOWN_IDX;
                  })(u, l),
            d = (function (f, h) {
              for (var p = [f], g = null, m = 0; (g = p.pop()); ) {
                for (var v = g.childNodes, x = v.length - 1; x >= 0; x--)
                  p.push(v[x]);
                if (g.nodeType === 3 && g !== h) m += g.textContent.length;
                else if (g.nodeType === 3) break;
              }
              return m;
            })(u, i);
          return {
            parentTagName: u.tagName,
            parentIndex: c,
            textOffset: d + a,
          };
        }),
          (r.formatDomNode = function (i) {
            return i.$node.nodeType === 3 ||
              i.$node.nodeType === 4 ||
              i.$node.nodeType === 8
              ? i
              : { $node: i.$node.childNodes[i.offset], offset: 0 };
          });
      },
      function (n, r, o) {
        var s =
            (this && this.__read) ||
            function (l, u) {
              var c = typeof Symbol == "function" && l[Symbol.iterator];
              if (!c) return l;
              var d,
                f,
                h = c.call(l),
                p = [];
              try {
                for (; (u === void 0 || u-- > 0) && !(d = h.next()).done; )
                  p.push(d.value);
              } catch (g) {
                f = { error: g };
              } finally {
                try {
                  d && !d.done && (c = h.return) && c.call(h);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          i =
            (this && this.__spread) ||
            function () {
              for (var l = [], u = 0; u < arguments.length; u++)
                l = l.concat(s(arguments[u]));
              return l;
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var a = (function () {
          function l(u) {
            (this.name = ""), (this.ops = []), (this.name = u);
          }
          return (
            (l.prototype.tap = function (u) {
              var c = this;
              return (
                this.ops.indexOf(u) === -1 && this.ops.push(u),
                function () {
                  c.remove(u);
                }
              );
            }),
            (l.prototype.remove = function (u) {
              var c = this.ops.indexOf(u);
              c < 0 || this.ops.splice(c, 1);
            }),
            (l.prototype.isEmpty = function () {
              return this.ops.length === 0;
            }),
            (l.prototype.call = function () {
              for (var u, c = [], d = 0; d < arguments.length; d++)
                c[d] = arguments[d];
              return (
                this.ops.forEach(function (f) {
                  u = f.apply(void 0, i(c));
                }),
                u
              );
            }),
            l
          );
        })();
        r.default = a;
      },
      function (n, r, o) {
        var s =
          (this && this.__importDefault) ||
          function (l) {
            return l && l.__esModule ? l : { default: l };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = o(1),
          a = s(o(15));
        r.default = function () {
          var l = a.default(window.navigator.userAgent);
          return {
            PointerEnd: l
              ? i.UserInputEvent.touchend
              : i.UserInputEvent.mouseup,
            PointerTap: l
              ? i.UserInputEvent.touchstart
              : i.UserInputEvent.click,
            PointerOver: l
              ? i.UserInputEvent.touchstart
              : i.UserInputEvent.mouseover,
          };
        };
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s =
          /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
        r.default = function (i) {
          return s.test(i);
        };
      },
      function (n, r, o) {
        var s,
          i =
            (this && this.__extends) ||
            ((s = function (f, h) {
              return (s =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (p, g) {
                    p.__proto__ = g;
                  }) ||
                function (p, g) {
                  for (var m in g)
                    Object.prototype.hasOwnProperty.call(g, m) && (p[m] = g[m]);
                })(f, h);
            }),
            function (f, h) {
              function p() {
                this.constructor = f;
              }
              s(f, h),
                (f.prototype =
                  h === null
                    ? Object.create(h)
                    : ((p.prototype = h.prototype), new p()));
            }),
          a =
            (this && this.__values) ||
            function (f) {
              var h = typeof Symbol == "function" && Symbol.iterator,
                p = h && f[h],
                g = 0;
              if (p) return p.call(f);
              if (f && typeof f.length == "number")
                return {
                  next: function () {
                    return (
                      f && g >= f.length && (f = void 0),
                      { value: f && f[g++], done: !f }
                    );
                  },
                };
              throw new TypeError(
                h
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          l =
            (this && this.__importDefault) ||
            function (f) {
              return f && f.__esModule ? f : { default: f };
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var u = l(o(2)),
          c = o(1),
          d = (function (f) {
            function h() {
              var p = (f !== null && f.apply(this, arguments)) || this;
              return (p._data = /* @__PURE__ */ new Map()), p;
            }
            return (
              i(h, f),
              Object.defineProperty(h.prototype, "data", {
                get: function () {
                  return this.getAll();
                },
                set: function (p) {
                  throw c.ERROR.CACHE_SET_ERROR;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (h.prototype.save = function (p) {
                var g = this;
                Array.isArray(p)
                  ? p.forEach(function (m) {
                      return g._data.set(m.id, m);
                    })
                  : this._data.set(p.id, p);
              }),
              (h.prototype.get = function (p) {
                return this._data.get(p);
              }),
              (h.prototype.remove = function (p) {
                this._data.delete(p);
              }),
              (h.prototype.getAll = function () {
                var p,
                  g,
                  m = [];
                try {
                  for (
                    var v = a(this._data), x = v.next();
                    !x.done;
                    x = v.next()
                  ) {
                    var b = x.value;
                    m.push(b[1]);
                  }
                } catch (_) {
                  p = { error: _ };
                } finally {
                  try {
                    x && !x.done && (g = v.return) && g.call(v);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return m;
              }),
              (h.prototype.removeAll = function () {
                var p,
                  g,
                  m = [];
                try {
                  for (
                    var v = a(this._data), x = v.next();
                    !x.done;
                    x = v.next()
                  ) {
                    var b = x.value;
                    m.push(b[0]);
                  }
                } catch (_) {
                  p = { error: _ };
                } finally {
                  try {
                    x && !x.done && (g = v.return) && g.call(v);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return (this._data = /* @__PURE__ */ new Map()), m;
              }),
              h
            );
          })(u.default);
        r.default = d;
      },
      function (n, r, o) {
        var s =
            (this && this.__values) ||
            function (m) {
              var v = typeof Symbol == "function" && Symbol.iterator,
                x = v && m[v],
                b = 0;
              if (x) return x.call(m);
              if (m && typeof m.length == "number")
                return {
                  next: function () {
                    return (
                      m && b >= m.length && (m = void 0),
                      { value: m && m[b++], done: !m }
                    );
                  },
                };
              throw new TypeError(
                v
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          i =
            (this && this.__read) ||
            function (m, v) {
              var x = typeof Symbol == "function" && m[Symbol.iterator];
              if (!x) return m;
              var b,
                _,
                C = x.call(m),
                A = [];
              try {
                for (; (v === void 0 || v-- > 0) && !(b = C.next()).done; )
                  A.push(b.value);
              } catch (I) {
                _ = { error: I };
              } finally {
                try {
                  b && !b.done && (x = C.return) && x.call(C);
                } finally {
                  if (_) throw _.error;
                }
              }
              return A;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var m = [], v = 0; v < arguments.length; v++)
                m = m.concat(i(arguments[v]));
              return m;
            },
          l =
            (this && this.__importDefault) ||
            function (m) {
              return m && m.__esModule ? m : { default: m };
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var u = l(o(3)),
          c = o(18),
          d = o(4),
          f = o(1),
          h = o(20),
          p = o(0),
          g = (function () {
            function m(v, x) {
              (this.options = {
                $root: v.$root,
                wrapTag: v.wrapTag,
                exceptSelectors: v.exceptSelectors,
                className: v.className,
              }),
                (this.hooks = x),
                h.initDefaultStylesheet();
            }
            return (
              (m.prototype.highlightRange = function (v) {
                var x = this;
                if (!v.frozen) throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var b = this.options,
                  _ = b.$root,
                  C = b.className,
                  A = b.exceptSelectors,
                  I = this.hooks,
                  S = c.getSelectedNodes(_, v.start, v.end, A);
                return (
                  I.Render.SelectedNodes.isEmpty() ||
                    (S = I.Render.SelectedNodes.call(v.id, S) || []),
                  S.map(function (P) {
                    var k = c.wrapHighlight(P, v, C, x.options.wrapTag);
                    return (
                      I.Render.WrapNode.isEmpty() ||
                        (k = I.Render.WrapNode.call(v.id, k)),
                      k
                    );
                  })
                );
              }),
              (m.prototype.highlightSource = function (v) {
                var x = this,
                  b = Array.isArray(v) ? v : [v],
                  _ = [];
                return (
                  b.forEach(function (C) {
                    if (C instanceof u.default) {
                      var A = C.deSerialize(x.options.$root, x.hooks);
                      x.highlightRange(A).length > 0
                        ? _.push(C)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: C,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: f.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  _
                );
              }),
              (m.prototype.removeHighlight = function (v) {
                var x,
                  b,
                  _ = new RegExp(
                    "(" +
                      v +
                      "\\" +
                      p.ID_DIVISION +
                      "|\\" +
                      p.ID_DIVISION +
                      "?" +
                      v +
                      "$)",
                  ),
                  C = this.hooks,
                  A = this.options.wrapTag,
                  I = document.querySelectorAll(
                    A + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  S = [],
                  P = [],
                  k = [];
                try {
                  for (var j = s(I), z = j.next(); !z.done; z = j.next()) {
                    var B = z.value,
                      E = B.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      N = B.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    E !== v || N
                      ? E === v
                        ? P.push(B)
                        : E !== v && _.test(N) && k.push(B)
                      : S.push(B);
                  }
                } catch (w) {
                  x = { error: w };
                } finally {
                  try {
                    z && !z.done && (b = j.return) && b.call(j);
                  } finally {
                    if (x) throw x.error;
                  }
                }
                return (
                  S.forEach(function (w) {
                    var O = w.parentNode,
                      L = document.createDocumentFragment();
                    d.forEach(w.childNodes, function (R) {
                      return L.appendChild(R.cloneNode(!1));
                    });
                    var D = w.previousSibling,
                      T = w.nextSibling;
                    O.replaceChild(L, w),
                      c.normalizeSiblingText(D, !0),
                      c.normalizeSiblingText(T, !1),
                      C.Remove.UpdateNodes.call(v, w, "remove");
                  }),
                  P.forEach(function (w) {
                    var O = w.dataset,
                      L = O[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      D = L.shift(),
                      T = document.querySelector(
                        A + "[data-" + p.DATASET_IDENTIFIER + '="' + D + '"]',
                      );
                    T && (d.removeAllClass(w), d.addClass(w, a(T.classList))),
                      (O[p.CAMEL_DATASET_IDENTIFIER] = D),
                      (O[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = L.join(
                        p.ID_DIVISION,
                      )),
                      C.Remove.UpdateNodes.call(v, w, "id-update");
                  }),
                  k.forEach(function (w) {
                    var O = w.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (w.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = O.replace(
                      _,
                      "",
                    )),
                      C.Remove.UpdateNodes.call(v, w, "extra-update");
                  }),
                  S.length + P.length + k.length !== 0
                );
              }),
              (m.prototype.removeAllHighlight = function () {
                var v = this.options,
                  x = v.wrapTag,
                  b = v.$root;
                d.getHighlightsByRoot(b, x).forEach(function (_) {
                  var C = _.parentNode,
                    A = document.createDocumentFragment();
                  d.forEach(_.childNodes, function (I) {
                    return A.appendChild(I.cloneNode(!1));
                  }),
                    C.replaceChild(A, _);
                });
              }),
              m
            );
          })();
        r.default = g;
      },
      function (n, r, o) {
        var s =
            (this && this.__read) ||
            function (p, g) {
              var m = typeof Symbol == "function" && p[Symbol.iterator];
              if (!m) return p;
              var v,
                x,
                b = m.call(p),
                _ = [];
              try {
                for (; (g === void 0 || g-- > 0) && !(v = b.next()).done; )
                  _.push(v.value);
              } catch (C) {
                x = { error: C };
              } finally {
                try {
                  v && !v.done && (m = b.return) && m.call(b);
                } finally {
                  if (x) throw x.error;
                }
              }
              return _;
            },
          i =
            (this && this.__spread) ||
            function () {
              for (var p = [], g = 0; g < arguments.length; g++)
                p = p.concat(s(arguments[g]));
              return p;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.normalizeSiblingText =
            r.wrapHighlight =
            r.getSelectedNodes =
              void 0);
        var a = o(1),
          l = o(4),
          u = o(0),
          c = o(19),
          d = function (p, g) {
            if (!p) return !1;
            if (/^\./.test(g)) {
              var m = g.replace(/^\./, "");
              return p && l.hasClass(p, m);
            }
            if (/^#/.test(g)) {
              var v = g.replace(/^#/, "");
              return p && p.id === v;
            }
            var x = g.toUpperCase();
            return p && p.tagName === x;
          };
        r.getSelectedNodes = function (p, g, m, v) {
          var x = g.$node,
            b = m.$node,
            _ = g.offset,
            C = m.offset;
          if (x === b && x instanceof Text)
            return (function (E, N, w, O) {
              for (
                var L = E,
                  D = function (R) {
                    return O == null
                      ? void 0
                      : O.some(function (H) {
                          return d(R, H);
                        });
                  };
                L;

              ) {
                if (L.nodeType === 1 && D(L)) return [];
                L = L.parentNode;
              }
              E.splitText(N);
              var T = E.nextSibling;
              return (
                T.splitText(w - N),
                [
                  {
                    $node: T,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.both,
                  },
                ]
              );
            })(x, _, C, v);
          for (
            var A = [p],
              I = [],
              S = function (E) {
                return v == null
                  ? void 0
                  : v.some(function (N) {
                      return d(E, N);
                    });
              },
              P = !1,
              k = null;
            (k = A.pop());

          )
            if (k.nodeType !== 1 || !S(k)) {
              for (var j = k.childNodes, z = j.length - 1; z >= 0; z--)
                A.push(j[z]);
              if (k === x) {
                if (k.nodeType === 3) {
                  k.splitText(_);
                  var B = k.nextSibling;
                  I.push({
                    $node: B,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.head,
                  });
                }
                P = !0;
              } else {
                if (k === b) {
                  k.nodeType === 3 &&
                    ((B = k).splitText(C),
                    I.push({
                      $node: B,
                      type: a.SelectedNodeType.text,
                      splitType: a.SplitType.tail,
                    }));
                  break;
                }
                P &&
                  k.nodeType === 3 &&
                  I.push({
                    $node: k,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.none,
                  });
              }
            }
          return I;
        };
        var f = function (p, g) {
            var m = Array.isArray(g) ? g : [g];
            return (
              (m =
                m.length === 0
                  ? [u.getDefaultOptions().style.className]
                  : m).forEach(function (v) {
                l.addClass(p, v);
              }),
              p
            );
          },
          h = function (p) {
            return !p || !p.textContent;
          };
        (r.wrapHighlight = function (p, g, m, v) {
          var x = p.$node.parentNode,
            b = p.$node.previousSibling,
            _ = p.$node.nextSibling;
          return l.isHighlightWrapNode(x)
            ? !l.isHighlightWrapNode(x) || (h(b) && h(_))
              ? (function (C, A, I) {
                  var S = C.$node.parentNode,
                    P = S;
                  l.removeAllClass(P), f(P, I);
                  var k = S.dataset,
                    j = k[u.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (k[u.CAMEL_DATASET_IDENTIFIER] = A.id),
                    (k[u.CAMEL_DATASET_IDENTIFIER_EXTRA] = k[
                      u.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? j + u.ID_DIVISION + k[u.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : j),
                    P
                  );
                })(p, g, m)
              : (function (C, A, I, S) {
                  var P = document.createElement(S),
                    k = C.$node.parentNode,
                    j = C.$node.previousSibling,
                    z = C.$node.nextSibling,
                    B = document.createDocumentFragment(),
                    E = k.dataset[u.CAMEL_DATASET_IDENTIFIER],
                    N = k.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    w = N ? E + u.ID_DIVISION + N : E;
                  P.setAttribute("data-" + u.DATASET_IDENTIFIER, A.id),
                    P.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, w),
                    P.appendChild(C.$node.cloneNode(!1));
                  var O,
                    L = !1,
                    D = !1;
                  j &&
                    (((T = k.cloneNode(!1)).textContent = j.textContent),
                    B.appendChild(T),
                    (L = !0));
                  var T,
                    R = [];
                  return (
                    Array.isArray(I) ? R.push.apply(R, i(I)) : R.push(I),
                    f(P, c.unique(R)),
                    B.appendChild(P),
                    z &&
                      (((T = k.cloneNode(!1)).textContent = z.textContent),
                      B.appendChild(T),
                      (D = !0)),
                    (O =
                      L && D
                        ? a.SplitType.both
                        : L
                          ? a.SplitType.head
                          : D
                            ? a.SplitType.tail
                            : a.SplitType.none),
                    P.setAttribute("data-" + u.DATASET_SPLIT_TYPE, O),
                    k.parentNode.replaceChild(B, k),
                    P
                  );
                })(p, g, m, v)
            : (function (C, A, I, S) {
                var P = document.createElement(S);
                return (
                  f(P, I),
                  P.appendChild(C.$node.cloneNode(!1)),
                  C.$node.parentNode.replaceChild(P, C.$node),
                  P.setAttribute("data-" + u.DATASET_IDENTIFIER, A.id),
                  P.setAttribute("data-" + u.DATASET_SPLIT_TYPE, C.splitType),
                  P.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, ""),
                  P
                );
              })(p, g, m, v);
        }),
          (r.normalizeSiblingText = function (p, g) {
            if ((g === void 0 && (g = !0), p && p.nodeType === 3)) {
              var m = g ? p.nextSibling : p.previousSibling;
              if (m.nodeType === 3) {
                var v = m.nodeValue;
                (p.nodeValue = g ? p.nodeValue + v : v + p.nodeValue),
                  m.parentNode.removeChild(m);
              }
            }
          });
      },
      function (n, r, o) {
        var s =
          (this && this.__values) ||
          function (i) {
            var a = typeof Symbol == "function" && Symbol.iterator,
              l = a && i[a],
              u = 0;
            if (l) return l.call(i);
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
              a ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.unique = void 0),
          (r.unique = function (i) {
            var a,
              l,
              u = [];
            try {
              for (var c = s(i), d = c.next(); !d.done; d = c.next()) {
                var f = d.value;
                u.indexOf(f) === -1 && u.push(f);
              }
            } catch (h) {
              a = { error: h };
            } finally {
              try {
                d && !d.done && (l = c.return) && l.call(c);
              } finally {
                if (a) throw a.error;
              }
            }
            return u;
          });
      },
      function (n, r, o) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.initDefaultStylesheet = void 0);
        var s = o(0);
        r.initDefaultStylesheet = function () {
          var i = s.STYLESHEET_ID,
            a = document.getElementById(i);
          if (!a) {
            var l = document.createTextNode(s.getStylesheet());
            ((a = document.createElement("style")).id = i),
              a.appendChild(l),
              document.head.appendChild(a);
          }
          return a;
        };
      },
    ]).default;
  });
})(Gc);
var N1 = Gc.exports;
const Jc = /* @__PURE__ */ zn(N1),
  Ro = "altimate-display-",
  T1 = `${Ro}-highlight`,
  la = `${Ro}-highlight-hover`,
  A1 = `${Ro}-active-highlight`,
  D1 = 1049,
  Sn = new Jc({
    style: {
      className: T1,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  hi = new Jc({
    style: {
      className: A1,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Qc = (e, t) =>
    t.filter((n) => {
      var r;
      return ((r = n.$node.nodeValue) == null ? void 0 : r.trim()) !== "";
    }),
  el = (e, t, n) => {
    const r = t,
      o = n,
      s = ["BR", "HR"];
    return (
      s.includes(r.$node.nodeName) &&
        r.$node.parentNode &&
        (r.$node = r.$node.parentNode),
      s.includes(o.$node.nodeName) &&
        o.$node.parentNode &&
        (o.$node = o.$node.parentNode),
      [r, o]
    );
  };
Sn.hooks.Render.SelectedNodes.tap(Qc);
Sn.hooks.Serialize.Restore.tap(el);
hi.hooks.Render.SelectedNodes.tap(Qc);
hi.hooks.Serialize.Restore.tap(el);
Sn.on("selection:hover", ({ id: e }) => {
  Sn.addClass(la, e);
}).on("selection:hover-out", ({ id: e }) => {
  Sn.removeClass(la, e);
});
const I1 = (e) => {
    var t, n;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((n = e.meta) == null ? void 0 : n.highlight)
      : null;
  },
  O1 = (e) => {
    const t = I1(e);
    t && (Sn.remove(t.id), hi.remove(t.id));
  },
  pi = () => {
    var n, r;
    const e = gi(),
      t =
        (e == null ? void 0 : e[1]) === "analysis"
          ? document.getElementById("sql")
          : document.getElementById("code");
    return (r =
      (n = t == null ? void 0 : t.parentElement) == null
        ? void 0
        : n.querySelector("code-block")) == null
      ? void 0
      : r.querySelector("code.ng-binding.highlight");
  },
  gi = () => {
    var t;
    return (t = window.location.hash
      .split("#")
      .find((n) => n.startsWith("!"))) == null
      ? void 0
      : t.split("/");
  },
  mi = () => document.querySelector('[marked="model.description"]'),
  R1 = (e) => {
    var t, n, r;
    return e.field
      ? e.column
        ? (n =
            (t = Array.from(
              document.querySelectorAll(
                "column-details tr:not(.ng-hide) td:first-child",
              ),
            ).find((s) => s.innerText === e.column)) == null
              ? void 0
              : t.parentElement) == null
          ? void 0
          : n.querySelector("td:nth-child(3)")
        : (r = mi()) == null
          ? void 0
          : r.firstChild
      : pi();
  },
  M1 = (e) => {
    if (e.getAttribute("marked") === "model.description") return "description";
  },
  L1 = (e, t, n, r, o) => {
    if (e === "description")
      return {
        start: 0,
        end: 0,
        x: 0,
        y: 0,
      };
    const s = t.querySelectorAll(".line-numbers-rows > span"),
      i = n.split(`
`),
      a = Math.max(o.y, r.y),
      l = Array.from(s).findIndex((d) => {
        const { height: f, y: h } = d.getBoundingClientRect();
        return a >= h && a <= h + f;
      }),
      u = s[l],
      c = l - i.length + 1;
    return (
      console.log("start and end lines found", c, l),
      {
        x: u.offsetLeft,
        y: u.offsetTop + u.offsetHeight / 2,
        start: c,
        end: l,
      }
    );
  },
  l9 = () => {
    var e;
    return [(e = pi()) == null ? void 0 : e.parentElement, mi()];
  };
var et = /* @__PURE__ */ ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.UNINITIALIZED = 1)] = "UNINITIALIZED"),
  (e[(e.INITIALIZED = 2)] = "INITIALIZED"),
  e
))(et || {});
function k1(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function P1(e) {
  return k1(e) && "type" in e && typeof e.type == "string";
}
var tl = Symbol.for("immer-nothing"),
  ua = Symbol.for("immer-draftable"),
  Ke = Symbol.for("immer-state"),
  j1 =
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
function We(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = j1[e],
      r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Rn = Object.getPrototypeOf;
function Jt(e) {
  return !!e && !!e[Ke];
}
function Pt(e) {
  var t;
  return e
    ? nl(e) ||
        Array.isArray(e) ||
        !!e[ua] ||
        !!((t = e.constructor) != null && t[ua]) ||
        Lo(e) ||
        ko(e)
    : !1;
}
var $1 = Object.prototype.constructor.toString();
function nl(e) {
  if (!e || typeof e != "object") return !1;
  const t = Rn(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === $1;
}
function lo(e, t) {
  Mo(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function Mo(e) {
  const t = e[Ke];
  return t ? t.type_ : Array.isArray(e) ? 1 : Lo(e) ? 2 : ko(e) ? 3 : 0;
}
function Os(e, t) {
  return Mo(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function rl(e, t, n) {
  const r = Mo(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function F1(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Lo(e) {
  return e instanceof Map;
}
function ko(e) {
  return e instanceof Set;
}
function nn(e) {
  return e.copy_ || e.base_;
}
function Rs(e, t) {
  if (Lo(e)) return new Map(e);
  if (ko(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && nl(e))
    return Rn(e)
      ? { ...e }
      : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[Ke];
  let r = Reflect.ownKeys(n);
  for (let o = 0; o < r.length; o++) {
    const s = r[o],
      i = n[s];
    i.writable === !1 && ((i.writable = !0), (i.configurable = !0)),
      (i.get || i.set) &&
        (n[s] = {
          configurable: !0,
          writable: !0,
          // could live with !!desc.set as well here...
          enumerable: i.enumerable,
          value: e[s],
        });
  }
  return Object.create(Rn(e), n);
}
function yi(e, t = !1) {
  return (
    Po(e) ||
      Jt(e) ||
      !Pt(e) ||
      (Mo(e) > 1 && (e.set = e.add = e.clear = e.delete = H1),
      Object.freeze(e),
      t && Object.entries(e).forEach(([n, r]) => yi(r, !0))),
    e
  );
}
function H1() {
  We(2);
}
function Po(e) {
  return Object.isFrozen(e);
}
var B1 = {};
function dn(e) {
  const t = B1[e];
  return t || We(0, e), t;
}
var sr;
function ol() {
  return sr;
}
function z1(e, t) {
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
function da(e, t) {
  t &&
    (dn("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function Ms(e) {
  Ls(e), e.drafts_.forEach(V1), (e.drafts_ = null);
}
function Ls(e) {
  e === sr && (sr = e.parent_);
}
function fa(e) {
  return (sr = z1(sr, e));
}
function V1(e) {
  const t = e[Ke];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function ha(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[Ke].modified_ && (Ms(t), We(4)),
        Pt(e) && ((e = uo(t, e)), t.parent_ || fo(t, e)),
        t.patches_ &&
          dn("Patches").generateReplacementPatches_(
            n[Ke].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = uo(t, n, [])),
    Ms(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== tl ? e : void 0
  );
}
function uo(e, t, n) {
  if (Po(t)) return t;
  const r = t[Ke];
  if (!r) return lo(t, (o, s) => pa(e, r, t, o, s, n)), t;
  if (r.scope_ !== e) return t;
  if (!r.modified_) return fo(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    (r.finalized_ = !0), r.scope_.unfinalizedDrafts_--;
    const o = r.copy_;
    let s = o,
      i = !1;
    r.type_ === 3 && ((s = new Set(o)), o.clear(), (i = !0)),
      lo(s, (a, l) => pa(e, r, o, a, l, n, i)),
      fo(e, o, !1),
      n &&
        e.patches_ &&
        dn("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_);
  }
  return r.copy_;
}
function pa(e, t, n, r, o, s, i) {
  if ((process.env.NODE_ENV !== "production" && o === n && We(5), Jt(o))) {
    const a =
        s &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !Os(t.assigned_, r)
          ? s.concat(r)
          : void 0,
      l = uo(e, o, a);
    if ((rl(n, r, l), Jt(l))) e.canAutoFreeze_ = !1;
    else return;
  } else i && n.add(o);
  if (Pt(o) && !Po(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    uo(e, o),
      (!t || !t.scope_.parent_) &&
        typeof r != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(n, r) &&
        fo(e, o);
  }
}
function fo(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && yi(t, n);
}
function W1(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : ol(),
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
  let o = r,
    s = vi;
  n && ((o = [r]), (s = ir));
  const { revoke: i, proxy: a } = Proxy.revocable(o, s);
  return (r.draft_ = a), (r.revoke_ = i), a;
}
var vi = {
    get(e, t) {
      if (t === Ke) return e;
      const n = nn(e);
      if (!Os(n, t)) return U1(e, n, t);
      const r = n[t];
      return e.finalized_ || !Pt(r)
        ? r
        : r === rs(e.base_, t)
          ? (os(e), (e.copy_[t] = Ps(r, e)))
          : r;
    },
    has(e, t) {
      return t in nn(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(nn(e));
    },
    set(e, t, n) {
      const r = sl(nn(e), t);
      if (r != null && r.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const o = rs(nn(e), t),
          s = o == null ? void 0 : o[Ke];
        if (s && s.base_ === n)
          return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (F1(n, o) && (n !== void 0 || Os(e.base_, t))) return !0;
        os(e), ks(e);
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
        rs(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), os(e), ks(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(e, t) {
      const n = nn(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== "length",
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      We(11);
    },
    getPrototypeOf(e) {
      return Rn(e.base_);
    },
    setPrototypeOf() {
      We(12);
    },
  },
  ir = {};
lo(vi, (e, t) => {
  ir[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
ir.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && We(13),
    ir.set.call(this, e, t, void 0)
  );
};
ir.set = function (e, t, n) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      We(14),
    vi.set.call(this, e[0], t, n, e[0])
  );
};
function rs(e, t) {
  const n = e[Ke];
  return (n ? nn(n) : e)[t];
}
function U1(e, t, n) {
  var o;
  const r = sl(t, n);
  return r
    ? "value" in r
      ? r.value
      : // This is a very special case, if the prop is a getter defined by the
        // prototype, we should invoke it with the draft as context!
        (o = r.get) == null
        ? void 0
        : o.call(e.draft_)
    : void 0;
}
function sl(e, t) {
  if (!(t in e)) return;
  let n = Rn(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = Rn(n);
  }
}
function ks(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && ks(e.parent_));
}
function os(e) {
  e.copy_ || (e.copy_ = Rs(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var Y1 = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, r) => {
        if (typeof t == "function" && typeof n != "function") {
          const s = n;
          n = t;
          const i = this;
          return function (l = s, ...u) {
            return i.produce(l, (c) => n.call(this, c, ...u));
          };
        }
        typeof n != "function" && We(6),
          r !== void 0 && typeof r != "function" && We(7);
        let o;
        if (Pt(t)) {
          const s = fa(this),
            i = Ps(t, void 0);
          let a = !0;
          try {
            (o = n(i)), (a = !1);
          } finally {
            a ? Ms(s) : Ls(s);
          }
          return da(s, r), ha(o, s);
        } else if (!t || typeof t != "object") {
          if (
            ((o = n(t)),
            o === void 0 && (o = t),
            o === tl && (o = void 0),
            this.autoFreeze_ && yi(o, !0),
            r)
          ) {
            const s = [],
              i = [];
            dn("Patches").generateReplacementPatches_(t, o, s, i), r(s, i);
          }
          return o;
        } else We(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (i, ...a) => this.produceWithPatches(i, (l) => t(l, ...a));
        let r, o;
        return [
          this.produce(t, n, (i, a) => {
            (r = i), (o = a);
          }),
          r,
          o,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == "boolean" &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Pt(e) || We(8), Jt(e) && (e = il(e));
    const t = fa(this),
      n = Ps(e, void 0);
    return (n[Ke].isManual_ = !0), Ls(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[Ke];
    (!n || !n.isManual_) && We(9);
    const { scope_: r } = n;
    return da(r, t), ha(void 0, r);
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
      const o = t[n];
      if (o.path.length === 0 && o.op === "replace") {
        e = o.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = dn("Patches").applyPatches_;
    return Jt(e) ? r(e, t) : this.produce(e, (o) => r(o, t));
  }
};
function Ps(e, t) {
  const n = Lo(e)
    ? dn("MapSet").proxyMap_(e, t)
    : ko(e)
      ? dn("MapSet").proxySet_(e, t)
      : W1(e, t);
  return (t ? t.scope_ : ol()).drafts_.push(n), n;
}
function il(e) {
  return Jt(e) || We(10, e), al(e);
}
function al(e) {
  if (!Pt(e) || Po(e)) return e;
  const t = e[Ke];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (n = Rs(e, t.scope_.immer_.useStrictShallowCopy_));
  } else n = Rs(e, !0);
  return (
    lo(n, (r, o) => {
      rl(n, r, al(o));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var Ge = new Y1(),
  cl = Ge.produce;
Ge.produceWithPatches.bind(Ge);
Ge.setAutoFreeze.bind(Ge);
Ge.setUseStrictShallowCopy.bind(Ge);
Ge.applyPatches.bind(Ge);
Ge.createDraft.bind(Ge);
Ge.finishDraft.bind(Ge);
var Z1 = (e, t, n) => {
    if (t.length === 1 && t[0] === n) {
      let r = !1;
      try {
        const o = {};
        e(o) === o && (r = !0);
      } catch {}
      if (r) {
        let o;
        try {
          throw new Error();
        } catch (s) {
          ({ stack: o } = s);
        }
        console.warn(
          `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
          { stack: o },
        );
      }
    }
  },
  q1 = (e, t, n) => {
    const { memoize: r, memoizeOptions: o } = t,
      { inputSelectorResults: s, inputSelectorResultsCopy: i } = e,
      a = r(() => ({}), ...o);
    if (!(a.apply(null, s) === a.apply(null, i))) {
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
          secondInputs: i,
          stack: u,
        },
      );
    }
  },
  X1 = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function K1(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function G1(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function J1(
  e,
  t = "expected all items to be functions, instead received the following types: ",
) {
  if (!e.every((n) => typeof n == "function")) {
    const n = e
      .map((r) =>
        typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r,
      )
      .join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var ga = (e) => (Array.isArray(e) ? e : [e]);
function Q1(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    J1(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function ma(e, t) {
  const n = [],
    { length: r } = e;
  for (let o = 0; o < r; o++) n.push(e[o].apply(null, t));
  return n;
}
var ef = (e, t) => {
    const { identityFunctionCheck: n, inputStabilityCheck: r } = {
      ...X1,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: Z1,
      },
      inputStabilityCheck: {
        shouldRun: r === "always" || (r === "once" && e),
        run: q1,
      },
    };
  },
  tf = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  nf = typeof WeakRef < "u" ? WeakRef : tf,
  rf = 0,
  ya = 1;
function Pr() {
  return {
    s: rf,
    v: void 0,
    o: null,
    p: null,
  };
}
function Ei(e, t = {}) {
  let n = Pr();
  const { resultEqualityCheck: r } = t;
  let o,
    s = 0;
  function i() {
    var d;
    let a = n;
    const { length: l } = arguments;
    for (let f = 0, h = l; f < h; f++) {
      const p = arguments[f];
      if (typeof p == "function" || (typeof p == "object" && p !== null)) {
        let g = a.o;
        g === null && (a.o = g = /* @__PURE__ */ new WeakMap());
        const m = g.get(p);
        m === void 0 ? ((a = Pr()), g.set(p, a)) : (a = m);
      } else {
        let g = a.p;
        g === null && (a.p = g = /* @__PURE__ */ new Map());
        const m = g.get(p);
        m === void 0 ? ((a = Pr()), g.set(p, a)) : (a = m);
      }
    }
    const u = a;
    let c;
    if (
      (a.s === ya ? (c = a.v) : ((c = e.apply(null, arguments)), s++),
      (u.s = ya),
      r)
    ) {
      const f =
        ((d = o == null ? void 0 : o.deref) == null ? void 0 : d.call(o)) ?? o;
      f != null && r(f, c) && ((c = f), s !== 0 && s--),
        (o =
          (typeof c == "object" && c !== null) || typeof c == "function"
            ? new nf(c)
            : c);
    }
    return (u.v = c), c;
  }
  return (
    (i.clearCache = () => {
      (n = Pr()), i.resetResultsCount();
    }),
    (i.resultsCount = () => s),
    (i.resetResultsCount = () => {
      s = 0;
    }),
    i
  );
}
function ll(e, ...t) {
  const n =
      typeof e == "function"
        ? {
            memoize: e,
            memoizeOptions: t,
          }
        : e,
    r = (...o) => {
      let s = 0,
        i = 0,
        a,
        l = {},
        u = o.pop();
      typeof u == "object" && ((l = u), (u = o.pop())),
        K1(
          u,
          `createSelector expects an output function after the inputs, but received: [${typeof u}]`,
        );
      const c = {
          ...n,
          ...l,
        },
        {
          memoize: d,
          memoizeOptions: f = [],
          argsMemoize: h = Ei,
          argsMemoizeOptions: p = [],
          devModeChecks: g = {},
        } = c,
        m = ga(f),
        v = ga(p),
        x = Q1(o),
        b = d(
          function () {
            return s++, u.apply(null, arguments);
          },
          ...m,
        );
      let _ = !0;
      const C = h(
        function () {
          i++;
          const I = ma(x, arguments);
          if (((a = b.apply(null, I)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: S, inputStabilityCheck: P } = ef(
              _,
              g,
            );
            if ((S.shouldRun && S.run(u, I, a), P.shouldRun)) {
              const k = ma(x, arguments);
              P.run(
                { inputSelectorResults: I, inputSelectorResultsCopy: k },
                { memoize: d, memoizeOptions: m },
                arguments,
              );
            }
            _ && (_ = !1);
          }
          return a;
        },
        ...v,
      );
      return Object.assign(C, {
        resultFunc: u,
        memoizedResultFunc: b,
        dependencies: x,
        dependencyRecomputations: () => i,
        resetDependencyRecomputations: () => {
          i = 0;
        },
        lastResult: () => a,
        recomputations: () => s,
        resetRecomputations: () => {
          s = 0;
        },
        memoize: d,
        argsMemoize: h,
      });
    };
  return (
    Object.assign(r, {
      withTypes: () => r,
    }),
    r
  );
}
var of = /* @__PURE__ */ ll(Ei),
  sf = Object.assign(
    (e, t = of) => {
      G1(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const n = Object.keys(e),
        r = n.map((s) => e[s]);
      return t(r, (...s) => s.reduce((i, a, l) => ((i[n[l]] = a), i), {}));
    },
    { withTypes: () => sf },
  ),
  af = (...e) => {
    const t = ll(...e),
      n = Object.assign(
        (...r) => {
          const o = t(...r),
            s = (i, ...a) => o(Jt(i) ? il(i) : i, ...a);
          return Object.assign(s, o), s;
        },
        {
          withTypes: () => n,
        },
      );
    return n;
  };
af(Ei);
function Mn(e, t) {
  function n(...r) {
    if (t) {
      let o = t(...r);
      if (!o)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? De(0)
            : "prepareAction did not return an object",
        );
      return {
        type: e,
        payload: o.payload,
        ...("meta" in o && {
          meta: o.meta,
        }),
        ...("error" in o && {
          error: o.error,
        }),
      };
    }
    return {
      type: e,
      payload: r[0],
    };
  }
  return (
    (n.toString = () => `${e}`),
    (n.type = e),
    (n.match = (r) => P1(r) && r.type === e),
    n
  );
}
function va(e) {
  return Pt(e) ? cl(e, () => {}) : e;
}
function Ea(e, t, n) {
  if (e.has(t)) {
    let o = e.get(t);
    return n.update && ((o = n.update(o, t, e)), e.set(t, o)), o;
  }
  if (!n.insert)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? De(10)
        : "No insert provided for key not already in map",
    );
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
process.env.NODE_ENV;
function ul(e) {
  const t = {},
    n = [];
  let r;
  const o = {
    addCase(s, i) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? De(26)
              : "`builder.addCase` should only be called before calling `builder.addMatcher`",
          );
        if (r)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? De(27)
              : "`builder.addCase` should only be called before calling `builder.addDefaultCase`",
          );
      }
      const a = typeof s == "string" ? s : s.type;
      if (!a)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? De(28)
            : "`builder.addCase` cannot be called with an empty action type",
        );
      if (a in t)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? De(29)
            : `\`builder.addCase\` cannot be called with two reducers for the same action type '${a}'`,
        );
      return (t[a] = i), o;
    },
    addMatcher(s, i) {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? De(30)
            : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`",
        );
      return (
        n.push({
          matcher: s,
          reducer: i,
        }),
        o
      );
    },
    addDefaultCase(s) {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? De(31)
            : "`builder.addDefaultCase` can only be called once",
        );
      return (r = s), o;
    },
  };
  return e(o), [t, n, r];
}
function cf(e) {
  return typeof e == "function";
}
function lf(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? De(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [n, r, o] = ul(t),
    s;
  if (cf(e)) s = () => va(e());
  else {
    const a = va(e);
    s = () => a;
  }
  function i(a = s(), l) {
    let u = [
      n[l.type],
      ...r.filter(({ matcher: c }) => c(l)).map(({ reducer: c }) => c),
    ];
    return (
      u.filter((c) => !!c).length === 0 && (u = [o]),
      u.reduce((c, d) => {
        if (d)
          if (Jt(c)) {
            const h = d(c, l);
            return h === void 0 ? c : h;
          } else {
            if (Pt(c)) return cl(c, (f) => d(f, l));
            {
              const f = d(c, l);
              if (f === void 0) {
                if (c === null) return c;
                throw new Error(
                  process.env.NODE_ENV === "production"
                    ? De(9)
                    : "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return f;
            }
          }
        return c;
      }, a)
    );
  }
  return (i.getInitialState = s), i;
}
var uf = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  df = (e = 21) => {
    let t = "",
      n = e;
    for (; n--; ) t += uf[(Math.random() * 64) | 0];
    return t;
  },
  ff = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function hf(e, t) {
  return `${e}/${t}`;
}
function pf({ creators: e } = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[ff];
  return function (o) {
    const { name: s, reducerPath: i = s } = o;
    if (!s)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? De(11)
          : "`name` is a required option for createSlice",
      );
    typeof process < "u" &&
      process.env.NODE_ENV === "development" &&
      o.initialState === void 0 &&
      console.error(
        "You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`",
      );
    const a =
        (typeof o.reducers == "function" ? o.reducers(mf()) : o.reducers) || {},
      l = Object.keys(a),
      u = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      c = {
        addCase(b, _) {
          const C = typeof b == "string" ? b : b.type;
          if (!C)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? De(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (C in u.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? De(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  C,
            );
          return (u.sliceCaseReducersByType[C] = _), c;
        },
        addMatcher(b, _) {
          return (
            u.sliceMatchers.push({
              matcher: b,
              reducer: _,
            }),
            c
          );
        },
        exposeAction(b, _) {
          return (u.actionCreators[b] = _), c;
        },
        exposeCaseReducer(b, _) {
          return (u.sliceCaseReducersByName[b] = _), c;
        },
      };
    l.forEach((b) => {
      const _ = a[b],
        C = {
          reducerName: b,
          type: hf(s, b),
          createNotation: typeof o.reducers == "function",
        };
      vf(_) ? Cf(C, _, c, t) : yf(C, _, c);
    });
    function d() {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof o.extraReducers == "object"
      )
        throw new Error(
          process.env.NODE_ENV === "production"
            ? De(14)
            : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
        );
      const [b = {}, _ = [], C = void 0] =
          typeof o.extraReducers == "function"
            ? ul(o.extraReducers)
            : [o.extraReducers],
        A = {
          ...b,
          ...u.sliceCaseReducersByType,
        };
      return lf(o.initialState, (I) => {
        for (let S in A) I.addCase(S, A[S]);
        for (let S of u.sliceMatchers) I.addMatcher(S.matcher, S.reducer);
        for (let S of _) I.addMatcher(S.matcher, S.reducer);
        C && I.addDefaultCase(C);
      });
    }
    const f = (b) => b,
      h = /* @__PURE__ */ new Map();
    let p;
    function g(b, _) {
      return p || (p = d()), p(b, _);
    }
    function m() {
      return p || (p = d()), p.getInitialState();
    }
    function v(b, _ = !1) {
      function C(I) {
        let S = I[b];
        if (typeof S > "u") {
          if (_) S = m();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? De(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return S;
      }
      function A(I = f) {
        const S = Ea(h, _, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return Ea(S, I, {
          insert: () => {
            const P = {};
            for (const [k, j] of Object.entries(o.selectors ?? {}))
              P[k] = gf(j, I, m, _);
            return P;
          },
        });
      }
      return {
        reducerPath: b,
        getSelectors: A,
        get selectors() {
          return A(C);
        },
        selectSlice: C,
      };
    }
    const x = {
      name: s,
      reducer: g,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...v(i),
      injectInto(b, { reducerPath: _, ...C } = {}) {
        const A = _ ?? i;
        return (
          b.inject(
            {
              reducerPath: A,
              reducer: g,
            },
            C,
          ),
          {
            ...x,
            ...v(A, !0),
          }
        );
      },
    };
    return x;
  };
}
function gf(e, t, n, r) {
  function o(s, ...i) {
    let a = t(s);
    if (typeof a > "u") {
      if (r) a = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(
          process.env.NODE_ENV === "production"
            ? De(16)
            : "selectState returned undefined for an uninjected slice reducer",
        );
    }
    return e(a, ...i);
  }
  return (o.unwrapped = e), o;
}
var dl = /* @__PURE__ */ pf();
function mf() {
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
function yf({ type: e, reducerName: t, createNotation: n }, r, o) {
  let s, i;
  if ("reducer" in r) {
    if (n && !Ef(r))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? De(17)
          : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.",
      );
    (s = r.reducer), (i = r.prepare);
  } else s = r;
  o.addCase(e, s)
    .exposeCaseReducer(t, s)
    .exposeAction(t, i ? Mn(e, i) : Mn(e));
}
function vf(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Ef(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Cf({ type: e, reducerName: t }, n, r, o) {
  if (!o)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? De(18)
        : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.",
    );
  const {
      payloadCreator: s,
      fulfilled: i,
      pending: a,
      rejected: l,
      settled: u,
      options: c,
    } = n,
    d = o(e, s, c);
  r.exposeAction(t, d),
    i && r.addCase(d.fulfilled, i),
    a && r.addCase(d.pending, a),
    l && r.addCase(d.rejected, l),
    u && r.addMatcher(d.settled, u),
    r.exposeCaseReducer(t, {
      fulfilled: i || jr,
      pending: a || jr,
      rejected: l || jr,
      settled: u || jr,
    });
}
function jr() {}
var xf = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? De(32)
          : `${t} is not a function`,
      );
  },
  Ci = "listenerMiddleware",
  _f = (e) => {
    let { type: t, actionCreator: n, matcher: r, predicate: o, effect: s } = e;
    if (t) o = Mn(t).match;
    else if (n) (t = n.type), (o = n.match);
    else if (r) o = r;
    else if (!o)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? De(21)
          : "Creating or removing a listener requires one of the known fields for matching an action",
      );
    return (
      xf(s, "options.listener"),
      {
        predicate: o,
        type: t,
        effect: s,
      }
    );
  },
  bf = Object.assign(
    (e) => {
      const { type: t, predicate: n, effect: r } = _f(e);
      return {
        id: df(),
        effect: r,
        type: t,
        predicate: n,
        pending: /* @__PURE__ */ new Set(),
        unsubscribe: () => {
          throw new Error(
            process.env.NODE_ENV === "production"
              ? De(22)
              : "Unsubscribe not initialized",
          );
        },
      };
    },
    {
      withTypes: () => bf,
    },
  ),
  wf = Object.assign(Mn(`${Ci}/add`), {
    withTypes: () => wf,
  });
Mn(`${Ci}/removeAll`);
var Sf = Object.assign(Mn(`${Ci}/remove`), {
  withTypes: () => Sf,
});
function De(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Nf = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    conversationsLoadingState: et.UNINITIALIZED,
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: S1(),
    codeblockLoaded: !1,
    source: fi.DBT_DOCS,
    manifest: {},
  },
  ho = dl({
    name: "appState",
    initialState: Nf,
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
              users: t.payload.reduce((r, o) => ((r[o.id] = o), r), {}),
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
        var o, s;
        const n = { ...t.payload };
        if (!n.meta) {
          console.log("Invalid meta");
          return;
        }
        const r = gi();
        if (!r || r.length < 3) {
          console.error("Unable to find model parts", r);
          return;
        }
        if (
          (console.log("model parts found", r),
          (n.meta.uniqueId = r[2]),
          (n.meta.resource_type = r[1]),
          n.meta.range ||
            (n.meta.range = {
              end: { line: 0, character: 0 },
              start: { line: 0, character: 0 },
            }),
          n.meta.uniqueId)
        ) {
          const i =
            ((o = e.manifest.nodes) == null ? void 0 : o[n.meta.uniqueId]) ||
            ((s = e.manifest.macros) == null ? void 0 : s[n.meta.uniqueId]);
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
            (n, r) => ((n[r.conversation_group_id] = r), n),
            {},
          )),
          (e.selectedConversationId =
            e.selectedConversationId || t.payload[0].conversation_group_id));
      },
    },
  }),
  {
    setCurrentUserId: u9,
    setShareId: d9,
    updateSelectedConversationId: xi,
    updateRightPanelState: _i,
    setUsers: Tf,
    setConversations: Af,
    resetNewConversation: bi,
    updateNewConversation: wi,
    upsertConversation: f9,
    setDocsAppRendered: h9,
    updateCurrentPage: p9,
    updateCodeblockLoaded: g9,
    resolveConversationGroup: Df,
    setConversationsLoadingState: Ca,
    refetchConversations: fl,
    setConversationSource: m9,
    setManifest: If,
  } = ho.actions,
  jo = pt({
    state: ho.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  Of = ({
    children: e,
    shareId: t,
    userId: n,
    conversationGroupId: r,
    source: o,
  }) => {
    const [s, i] = Uc(ho.reducer, {
        ...ho.getInitialState(),
        shareId: t,
        currentUserId: n,
        selectedConversationId: r,
        isRightPanelOpen: !!r,
        source: o,
      }),
      a = ge((u) => u(s), [s]),
      l = Ie(
        () => ({
          state: s,
          dispatch: i,
          getValue: a,
        }),
        [s, i, a],
      );
    return /* @__PURE__ */ y.jsx(jo.Provider, { value: l, children: e });
  },
  Rf = Of,
  Mf = () => Ze(jo),
  xe = (e) => {
    const { getValue: t } = Ze(jo);
    return t(e);
  },
  ot = () => {
    const { dispatch: e } = Ze(jo);
    return e;
  },
  Lf = pt({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  kf = pt(null),
  Pf = typeof document < "u",
  hl = Pf ? Ud : ie;
class xa {
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
function jf(e) {
  let t = new xa(),
    n = new xa(),
    r = 0,
    o = !1,
    s = !1;
  const i = /* @__PURE__ */ new WeakSet(),
    a = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (l, u = !1, c = !1) => {
        const d = c && o,
          f = d ? t : n;
        return u && i.add(l), f.add(l) && d && o && (r = t.order.length), l;
      },
      /**
       * Cancel the provided callback from running on the next frame.
       */
      cancel: (l) => {
        n.remove(l), i.delete(l);
      },
      /**
       * Execute all schedule callbacks.
       */
      process: (l) => {
        if (o) {
          s = !0;
          return;
        }
        if (((o = !0), ([t, n] = [n, t]), n.clear(), (r = t.order.length), r))
          for (let u = 0; u < r; u++) {
            const c = t.order[u];
            i.has(c) && (a.schedule(c), e()), c(l);
          }
        (o = !1), s && ((s = !1), a.process(l));
      },
    };
  return a;
}
const $r = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
    // Compute
  ],
  $f = 40;
function Ff(e, t) {
  let n = !1,
    r = !0;
  const o = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    s = $r.reduce((d, f) => ((d[f] = jf(() => (n = !0))), d), {}),
    i = (d) => {
      s[d].process(o);
    },
    a = () => {
      const d = performance.now();
      (n = !1),
        (o.delta = r ? 1e3 / 60 : Math.max(Math.min(d - o.timestamp, $f), 1)),
        (o.timestamp = d),
        (o.isProcessing = !0),
        $r.forEach(i),
        (o.isProcessing = !1),
        n && t && ((r = !1), e(a));
    },
    l = () => {
      (n = !0), (r = !0), o.isProcessing || e(a);
    };
  return {
    schedule: $r.reduce((d, f) => {
      const h = s[f];
      return (d[f] = (p, g = !1, m = !1) => (n || l(), h.schedule(p, g, m))), d;
    }, {}),
    cancel: (d) => $r.forEach((f) => s[f].cancel(d)),
    state: o,
    steps: s,
  };
}
const Hf = pt({});
function Bf(e) {
  const t = se(null);
  return t.current === null && (t.current = e()), t.current;
}
const zf = (e) => e,
  {
    schedule: Vf,
    cancel: y9,
    state: v9,
    steps: E9,
  } = Ff(typeof requestAnimationFrame < "u" ? requestAnimationFrame : zf, !0);
function pl() {
  const e = se(!1);
  return (
    hl(
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
function Wf() {
  const e = pl(),
    [t, n] = de(0),
    r = ge(() => {
      e.current && n(t + 1);
    }, [t]);
  return [ge(() => Vf.postRender(r), [r]), t];
}
class Uf extends F.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const r = this.props.sizeRef.current;
      (r.height = n.offsetHeight || 0),
        (r.width = n.offsetWidth || 0),
        (r.top = n.offsetTop),
        (r.left = n.offsetLeft);
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
function Yf({ children: e, isPresent: t }) {
  const n = Yc(),
    r = se(null),
    o = se({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: s } = Ze(Lf);
  return (
    Yd(() => {
      const { width: i, height: a, top: l, left: u } = o.current;
      if (t || !r.current || !i || !a) return;
      r.current.dataset.motionPopId = n;
      const c = document.createElement("style");
      return (
        s && (c.nonce = s),
        document.head.appendChild(c),
        c.sheet &&
          c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${i}px !important;
            height: ${a}px !important;
            top: ${l}px !important;
            left: ${u}px !important;
          }
        `),
        () => {
          document.head.removeChild(c);
        }
      );
    }, [t]),
    F.createElement(
      Uf,
      { isPresent: t, childRef: r, sizeRef: o },
      F.cloneElement(e, { ref: r }),
    )
  );
}
const ss = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: o,
  presenceAffectsLayout: s,
  mode: i,
}) => {
  const a = Bf(Zf),
    l = Yc(),
    u = Ie(
      () => ({
        id: l,
        initial: t,
        isPresent: n,
        custom: o,
        onExitComplete: (c) => {
          a.set(c, !0);
          for (const d of a.values()) if (!d) return;
          r && r();
        },
        register: (c) => (a.set(c, !1), () => a.delete(c)),
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      s ? void 0 : [n],
    );
  return (
    Ie(() => {
      a.forEach((c, d) => a.set(d, !1));
    }, [n]),
    F.useEffect(() => {
      !n && !a.size && r && r();
    }, [n]),
    i === "popLayout" && (e = F.createElement(Yf, { isPresent: n }, e)),
    F.createElement(kf.Provider, { value: u }, e)
  );
};
function Zf() {
  return /* @__PURE__ */ new Map();
}
function qf(e) {
  return ie(() => () => e(), []);
}
const rn = (e) => e.key || "";
function Xf(e, t) {
  e.forEach((n) => {
    const r = rn(n);
    t.set(r, n);
  });
}
function Kf(e) {
  const t = [];
  return (
    On.forEach(e, (n) => {
      Wc(n) && t.push(n);
    }),
    t
  );
}
const Gf = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    exitBeforeEnter: o,
    presenceAffectsLayout: s = !0,
    mode: i = "sync",
  }) => {
    const a = Ze(Hf).forceRender || Wf()[0],
      l = pl(),
      u = Kf(e);
    let c = u;
    const d = se(/* @__PURE__ */ new Map()).current,
      f = se(c),
      h = se(/* @__PURE__ */ new Map()).current,
      p = se(!0);
    if (
      (hl(() => {
        (p.current = !1), Xf(u, h), (f.current = c);
      }),
      qf(() => {
        (p.current = !0), h.clear(), d.clear();
      }),
      p.current)
    )
      return F.createElement(
        F.Fragment,
        null,
        c.map((x) =>
          F.createElement(
            ss,
            {
              key: rn(x),
              isPresent: !0,
              initial: n ? void 0 : !1,
              presenceAffectsLayout: s,
              mode: i,
            },
            x,
          ),
        ),
      );
    c = [...c];
    const g = f.current.map(rn),
      m = u.map(rn),
      v = g.length;
    for (let x = 0; x < v; x++) {
      const b = g[x];
      m.indexOf(b) === -1 && !d.has(b) && d.set(b, void 0);
    }
    return (
      i === "wait" && d.size && (c = []),
      d.forEach((x, b) => {
        if (m.indexOf(b) !== -1) return;
        const _ = h.get(b);
        if (!_) return;
        const C = g.indexOf(b);
        let A = x;
        if (!A) {
          const I = () => {
            d.delete(b);
            const S = Array.from(h.keys()).filter((P) => !m.includes(P));
            if (
              (S.forEach((P) => h.delete(P)),
              (f.current = u.filter((P) => {
                const k = rn(P);
                return (
                  // filter out the node exiting
                  k === b || // filter out the leftover children
                  S.includes(k)
                );
              })),
              !d.size)
            ) {
              if (l.current === !1) return;
              a(), r && r();
            }
          };
          (A = F.createElement(
            ss,
            {
              key: rn(_),
              isPresent: !1,
              onExitComplete: I,
              custom: t,
              presenceAffectsLayout: s,
              mode: i,
            },
            _,
          )),
            d.set(b, A);
        }
        c.splice(C, 0, A);
      }),
      (c = c.map((x) => {
        const b = x.key;
        return d.has(b)
          ? x
          : F.createElement(
              ss,
              { key: rn(x), isPresent: !0, presenceAffectsLayout: s, mode: i },
              x,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        i === "wait" &&
        c.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      F.createElement(F.Fragment, null, d.size ? c : c.map((x) => Zd(x)))
    );
  },
  gn = ({ icon: e, className: t = "", ...n }) =>
    /* @__PURE__ */ y.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...n,
    }),
  gl = (e) => /* @__PURE__ */ y.jsx(gn, { icon: "add", ...e }),
  Jf = (e) => /* @__PURE__ */ y.jsx(gn, { icon: "comment-unresolved", ...e }),
  Qf = (e) => /* @__PURE__ */ y.jsx(gn, { icon: "check", ...e }),
  e0 = (e) => /* @__PURE__ */ y.jsx(gn, { icon: "debug-restart", ...e }),
  t0 = (e) => /* @__PURE__ */ y.jsx(gn, { icon: "gear", ...e }),
  n0 = (e) => /* @__PURE__ */ y.jsx(gn, { icon: "info", ...e }),
  r0 = (e) => /* @__PURE__ */ y.jsx(gn, { icon: "send", ...e }),
  o0 = ({ pos: e, onAddComment: t }) =>
    pn(
      /* @__PURE__ */ y.jsx(Gf, {
        children:
          e &&
          /* @__PURE__ */ y.jsx(Ue, {
            onClick: t,
            id: `${Ro}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: D1 + 5,
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
            children: /* @__PURE__ */ y.jsx(gl, {}),
          }),
      }),
      e.element.parentElement,
    ),
  s0 = o0,
  i0 = () => {
    const {
        state: { isRightPanelOpen: e },
      } = Mf(),
      t = ot(),
      n = () => {
        t(_i(!e));
      };
    return /* @__PURE__ */ y.jsx(Ue, {
      onClick: n,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  a0 = i0,
  c0 = (e) => Oe.get(`dbt/dbt_docs_share/${e}`),
  l0 = (e, t, n) =>
    Oe.post(`dbt/dbt_docs_share/${e}/conversation_group`, {
      ...t,
      telemetry: {
        eventName: "dbtCollaboration:create",
        properties: { source: n },
      },
    }),
  u0 = (e, t, n, r) =>
    Oe.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, {
      ...n,
      telemetry: {
        eventName: "dbtCollaboration:reply",
        properties: { source: r },
      },
    }),
  d0 = (e) => Oe.get(`dbt/dbt_docs_share/${e}/conversations`),
  f0 = (e) => Oe.get("users/chat", { company: e }),
  h0 = (e, t, n) =>
    Oe.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
      telemetry: {
        eventName: "dbtCollaboration:resolve",
        properties: { source: n },
      },
    }),
  p0 = () => {
    const e = xe((a) => a.shareId),
      [t, n] = de(null),
      [r, o] = de(!1),
      s = ot();
    ie(() => {
      t != null &&
        t.manifest_presigned_url &&
        fetch(t.manifest_presigned_url)
          .then((a) => a.json())
          .then((a) => {
            s(If(a));
          })
          .catch((a) =>
            console.error(
              "error loading manifest",
              a,
              t.manifest_presigned_url,
            ),
          );
    }, [s, t == null ? void 0 : t.manifest_presigned_url]);
    const i = ge(async () => {
      if (!e) return;
      o(!0);
      const a = await c0(e);
      if (a) {
        n(a);
        const l = document.getElementById("collapse-sidebar");
        l == null || l.click();
      }
      o(!1);
    }, [e]);
    return (
      ie(() => {
        !e || t || r || i();
      }, [e, t, i, r]),
      { shareDetails: t, loading: r }
    );
  },
  g0 = () => {
    const e = xe((c) =>
        c.selectedConversationId
          ? c.conversations[c.selectedConversationId]
          : null,
      ),
      t = xe((c) => c.docsAppRendered),
      n = xe((c) => c.newConversation),
      r = ot(),
      [o, s] = de(null),
      [i, a] = de(null);
    ie(() => {
      n && (s(null), a(null));
    }, [n]);
    const l = ge(() => {
      console.log("resetHighlights"), o && O1(o), a(null), s(null);
    }, [o]);
    return (
      ie(() => {
        !e ||
          !t ||
          (e.meta.resource_type &&
            e.meta.uniqueId &&
            (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`));
      }, [e, t, r]),
      {
        getHighlightedSelectionData: () => o,
        pos: i,
        onSelectionEnd: (c) => {
          const d = c.target,
            f = M1(d),
            { end: h, start: p } = c.detail.selectionRange,
            g = document.getSelection();
          if (!g || !g.rangeCount) return l(), null;
          const v = g.getRangeAt(0).toString(),
            x = d == null ? void 0 : d.innerText;
          if (!v || !x) return;
          const { end: b, start: _, x: C, y: A } = L1(f, d, v, h, p);
          console.log("selection range", b, _, C, A);
          const I = {
            meta: {
              filePath: "",
              field: f,
              highlight: v,
              range: {
                end: { line: b, character: 0 },
                start: { line: _, character: 0 },
              },
            },
          };
          r(bi()),
            a({
              x: C,
              y: A,
              element: d,
            }),
            document.body.addEventListener("click", l, { once: !0 }),
            s(I);
        },
      }
    );
  },
  m0 = ({ conversationGroup: e }) => {
    const t = xe((a) => a.selectedConversationId),
      n = ot(),
      r = se(null),
      o = Ie(() => R1(e.meta), [e.meta]),
      s = () => {
        n(xi(e.conversation_group_id));
      },
      i = Ie(() => {
        if (!o) return;
        if (e.meta.field === "description")
          return { top: 0, bottom: o.offsetHeight };
        let a = 0,
          l = 0;
        for (let u = e.meta.range.start.line; u <= e.meta.range.end.line; u++) {
          const c = o.querySelector(
            `.line-numbers-rows > span:nth-child(${u + 1})`,
          );
          c &&
            (u === e.meta.range.start.line && (a = c.offsetTop + 15),
            u === e.meta.range.end.line && (l = c.offsetTop + c.offsetHeight));
        }
        return { top: a, bottom: l };
      }, [o, e.meta.field, e.meta.range.start.line, e.meta.range.end.line]);
    return (
      ie(() => {
        var a;
        t === e.conversation_group_id &&
          ((a = r.current) == null ||
            a.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [e.conversation_group_id, t]),
      !i || !(o != null && o.parentElement)
        ? null
        : pn(
            /* @__PURE__ */ y.jsx("div", {
              ref: r,
              className: `altimate-highlighter ${t === e.conversation_group_id ? "active" : ""}`,
              style: { top: i.top, height: i.bottom - i.top },
              onClick: s,
              children: /* @__PURE__ */ y.jsx(Jf, {}),
            }),
            o.parentElement,
          )
    );
  },
  y0 = m0,
  v0 = () => {
    const e = xe((o) => Object.values(o.conversations || {})),
      t = xe((o) => o.codeblockLoaded),
      n = xe((o) => o.currentPage),
      r =
        e == null
          ? void 0
          : e.filter(
              (o) =>
                o.meta.resource_type === n.resourceType &&
                o.meta.uniqueId === n.name,
            );
    return !(r != null && r.length) || !t
      ? null
      : /* @__PURE__ */ y.jsx(y.Fragment, {
          children: r.map((o) =>
            /* @__PURE__ */ y.jsx(
              y0,
              {
                conversationGroup: o,
              },
              o.conversation_group_id,
            ),
          ),
        });
  },
  E0 = v0,
  C0 = "_dbtDocs_14zop_9",
  x0 = "_hotspotButton_14zop_46",
  _0 = "_pulse_14zop_1",
  b0 = "_conversationRightPanelCloseButton_14zop_62",
  w0 = "_conversationRightPanel_14zop_62",
  S0 = "_newConversationForm_14zop_94",
  N0 = "_highlightText_14zop_108",
  T0 = "_conversationInputForm_14zop_130",
  A0 = "_conversationGroup_14zop_156",
  D0 = "_replyForm_14zop_189",
  I0 = "_resolveButton_14zop_237",
  jt = {
    dbtDocs: C0,
    hotspotButton: x0,
    pulse: _0,
    conversationRightPanelCloseButton: b0,
    conversationRightPanel: w0,
    newConversationForm: S0,
    highlightText: N0,
    conversationInputForm: T0,
    conversationGroup: A0,
    replyForm: D0,
    resolveButton: I0,
  },
  O0 = "_profileImage_11vaf_1",
  R0 = {
    profileImage: O0,
  },
  M0 = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ y.jsx("div", {
      className: R0.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  ml = M0;
function L0(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function k0(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function P0() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function po(e) {
  return L0(e) || k0(e) || P0();
}
function rt() {
  return (
    (rt =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }),
    rt.apply(this, arguments)
  );
}
function j0(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _a(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function $0(e, t, n) {
  return t && _a(e.prototype, t), n && _a(e, n), e;
}
function ue(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function js(e, t) {
  return (
    (js =
      Object.setPrototypeOf ||
      function (r, o) {
        return (r.__proto__ = o), r;
      }),
    js(e, t)
  );
}
function F0(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && js(e, t);
}
function Nn(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (Nn = function (n) {
          return typeof n;
        })
      : (Nn = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : typeof n;
        }),
    Nn(e)
  );
}
function to(e) {
  return (
    typeof Symbol == "function" && Nn(Symbol.iterator) === "symbol"
      ? (to = function (n) {
          return Nn(n);
        })
      : (to = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : Nn(n);
        }),
    to(e)
  );
}
function H0(e, t) {
  return t && (to(t) === "object" || typeof t == "function") ? t : ue(e);
}
function go(e) {
  return (
    (go = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    go(e)
  );
}
function ae(e, t, n) {
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
var B0 = function (e, t, n, r, o, s, i, a) {
    if (process.env.NODE_ENV !== "production" && t === void 0)
      throw new Error("invariant requires an error message argument");
    if (!e) {
      var l;
      if (t === void 0)
        l = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var u = [n, r, o, s, i, a],
          c = 0;
        (l = new Error(
          t.replace(/%s/g, function () {
            return u[c++];
          }),
        )),
          (l.name = "Invariant Violation");
      }
      throw ((l.framesToPop = 1), l);
    }
  },
  z0 = B0;
const Ln = /* @__PURE__ */ zn(z0);
function V0(e) {
  if (Array.isArray(e)) return e;
}
function W0(e, t) {
  var n = [],
    r = !0,
    o = !1,
    s = void 0;
  try {
    for (
      var i = e[Symbol.iterator](), a;
      !(r = (a = i.next()).done) && (n.push(a.value), !(t && n.length === t));
      r = !0
    );
  } catch (l) {
    (o = !0), (s = l);
  } finally {
    try {
      !r && i.return != null && i.return();
    } finally {
      if (o) throw s;
    }
  }
  return n;
}
function U0() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function mo(e, t) {
  return V0(e) || W0(e, t) || U0();
}
function Y0(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    s;
  for (s = 0; s < r.length; s++)
    (o = r[s]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Z0(e, t) {
  if (e == null) return {};
  var n = Y0(e, t),
    r,
    o;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (o = 0; o < s.length; o++)
      (r = s[o]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function ar(e) {
  "@babel/helpers - typeof";
  return (
    (ar =
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
    ar(e)
  );
}
function q0(e, t) {
  if (ar(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (ar(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function X0(e) {
  var t = q0(e, "string");
  return ar(t) == "symbol" ? t : t + "";
}
function cr(e, t, n) {
  return (
    (t = X0(t)),
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
function $s(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function K0(e) {
  if (Array.isArray(e)) return $s(e);
}
function G0(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function J0(e, t) {
  if (e) {
    if (typeof e == "string") return $s(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return $s(e, t);
  }
}
function Q0() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Lt(e) {
  return K0(e) || G0(e) || J0(e) || Q0();
}
var Vn = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  yl = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function vl(e, t) {
  var n = Object.assign({}, e);
  return (
    no(e) &&
      no(t) &&
      Vn(t).forEach(function (r) {
        no(t[r])
          ? r in e
            ? (n[r] = vl(e[r], t[r]))
            : Object.assign(n, cr({}, r, t[r]))
          : Object.assign(n, cr({}, r, t[r]));
      }),
    n
  );
}
var Fs = function (t) {
    for (
      var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1;
      o < n;
      o++
    )
      r[o - 1] = arguments[o];
    return r.reduce(function (s, i) {
      return vl(s, i);
    }, t);
  },
  eh = function (t, n) {
    var r = Object.assign({}, t);
    if (n) for (var o = 0; o < n.length; o++) delete r[n[o]];
    return r;
  },
  no = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  th = function (t) {
    return (t || []).filter(Boolean);
  },
  Si = function (t) {
    return t[0] === "&";
  },
  nh = function (t) {
    return !Si(t);
  },
  ba = function (t) {
    return t.replace(/-(\w)/g, function (n, r) {
      return r.toUpperCase();
    });
  },
  rh = function (t) {
    for (
      var n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        r = Vn(t),
        o = {},
        s = 0,
        i = r.length;
      s < i;
      s += 1
    ) {
      var a = r[s],
        l =
          Object.prototype.toString.call(t[a]) !== "[object Object]" || // style defs
          a[0] === ":" || // pseudo selectors
          a[0] === "@" || // @media / @keyframes / @supports / @font-face
          n.indexOf(a) >= 0;
      l && (o[a] = t[a]);
    }
    return o;
  },
  El = function (t, n) {
    for (
      var r = n.map(ba), o = Vn(t), s = {}, i = 0, a = o.length;
      i < a;
      i += 1
    ) {
      var l = o[i];
      (n.indexOf(l) >= 0 || r.indexOf(ba(l)) >= 0) && (s[l] = t[l]);
    }
    return s;
  },
  oh = function e(t, n) {
    for (
      var r = Fs.apply(void 0, [{}, eh(t, n)].concat(Lt(yl(El(t, n))))),
        o = Vn(r).filter(Si),
        s = 0,
        i = o.length;
      s < i;
      s += 1
    ) {
      var a = o[s],
        l = e(r[a], n);
      n.indexOf(a) >= 0 ? (delete r[a], (r = Fs({}, r, l))) : (r[a] = l);
    }
    return r;
  };
function wa(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Sa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? wa(Object(n), !0).forEach(function (r) {
          cr(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : wa(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
var sh = ["animationName"],
  ih = function (t) {
    var n = t.style,
      r = t.className;
    return Sa(
      Sa(
        {},
        n
          ? {
              style: rh(n, sh),
            }
          : {},
      ),
      r
        ? {
            className: r,
          }
        : {},
    );
  };
const Cl = ih;
var xl = /* @__PURE__ */ pt(Cl);
xl.Provider;
var _l = function (t) {
    if (t) {
      if (typeof t == "string") return [t];
      if (!Array.isArray(t)) {
        var n = t;
        return Vn(t).reduce(function (r, o) {
          return r.concat(n[o] ? [o] : []);
        }, []);
      }
    } else return [];
    return t;
  },
  ah = {},
  ch = function (t) {
    return function (n, r) {
      var o = r || ah;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var s;
      t.memoize.has(o)
        ? (s = t.memoize.get(o))
        : ((s = {}), t.memoize.set(o, s));
      var i = _l(n).join(" ");
      return i in s ? s[i] : (s[i] = t(n || [], r));
    };
  };
function Na(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Na(Object(n), !0).forEach(function (r) {
          cr(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Na(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
var lh = function (t) {
    var n = t && Vn(t)[0];
    return n && n.split("__")[0].split("--")[0];
  },
  uh = function (t, n, r) {
    if (t) {
      var o = t.split(" ")[0],
        s = [].concat(
          Lt(
            n.length === 0
              ? r.map(function (i) {
                  return "".concat(o, "--").concat(i.substring(1));
                })
              : [],
          ),
          Lt(
            n.map(function (i) {
              return "".concat(o, "__").concat(i);
            }),
          ),
        );
      return n.length === 0 ? [t].concat(Lt(s)) : s;
    }
  };
function bl(e) {
  var t = e.style,
    n = e.className,
    r = e.classNames,
    o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Cl,
    s = n || lh(r) || (t == null ? void 0 : t.className),
    i =
      typeof t == "function"
        ? t
        : ch(function (d, f) {
            var h = _l(d);
            Ln(
              Array.isArray(h),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              Ln(
                !f || no(f),
                "Optional second parameter must be a plain object.",
              );
            var p = h.filter(Si),
              g = h.filter(nh),
              m =
                g.length > 0
                  ? function (b) {
                      return yl(El(b, g));
                    }
                  : function (b) {
                      return [b];
                    },
              v = function () {
                var _ =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return m(oh(_, p));
              },
              x = uh(s, g, p);
            return bl(
              vn(
                vn(
                  vn(
                    {},
                    (t || f) && {
                      style: Fs.apply(void 0, [{}].concat(Lt(v(f)), Lt(v(t)))),
                    },
                  ),
                  x && {
                    className: x.join(" "),
                  },
                ),
                r && {
                  classNames: r,
                },
              ),
              o,
            );
          }),
    a = vn(
      {},
      typeof t == "function"
        ? t
        : {
            style: t,
          },
    ),
    l = Lt(
      new Set(
        [].concat(
          Lt(a.className ? a.className.split(" ") : []),
          Lt(s ? s.split(" ") : []),
        ),
      ),
    ),
    u = r
      ? th(
          l.map(function (d) {
            return r[d];
          }),
        )
      : l,
    c = o(
      vn(
        vn({}, a),
        u.length > 0
          ? {
              className: u.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(i, c), i;
}
function Ta(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Zn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ta(Object(n), !0).forEach(function (r) {
          cr(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ta(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
var dh = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return n.reduce(function (o, s) {
      return Zn(
        Zn(Zn({}, o), typeof s == "function" ? s : {}),
        {},
        {
          style: Zn(Zn({}, o.style), typeof s == "function" ? s.style : s),
        },
      );
    }, {});
  },
  Ni = function (t, n, r) {
    var o = n.style,
      s = n.className,
      i = n.classNames,
      a = Ze(xl),
      l = Ie(
        function () {
          return bl(
            {
              style: o,
              className: s,
              classNames: i,
            },
            a,
          );
        },
        [o, s, i, a],
      );
    return l(r, t);
  },
  Hs = { exports: {} },
  Fr = { exports: {} },
  me = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Aa;
function fh() {
  if (Aa) return me;
  Aa = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    t = e ? Symbol.for("react.element") : 60103,
    n = e ? Symbol.for("react.portal") : 60106,
    r = e ? Symbol.for("react.fragment") : 60107,
    o = e ? Symbol.for("react.strict_mode") : 60108,
    s = e ? Symbol.for("react.profiler") : 60114,
    i = e ? Symbol.for("react.provider") : 60109,
    a = e ? Symbol.for("react.context") : 60110,
    l = e ? Symbol.for("react.async_mode") : 60111,
    u = e ? Symbol.for("react.concurrent_mode") : 60111,
    c = e ? Symbol.for("react.forward_ref") : 60112,
    d = e ? Symbol.for("react.suspense") : 60113,
    f = e ? Symbol.for("react.suspense_list") : 60120,
    h = e ? Symbol.for("react.memo") : 60115,
    p = e ? Symbol.for("react.lazy") : 60116,
    g = e ? Symbol.for("react.block") : 60121,
    m = e ? Symbol.for("react.fundamental") : 60117,
    v = e ? Symbol.for("react.responder") : 60118,
    x = e ? Symbol.for("react.scope") : 60119;
  function b(C) {
    if (typeof C == "object" && C !== null) {
      var A = C.$$typeof;
      switch (A) {
        case t:
          switch (((C = C.type), C)) {
            case l:
            case u:
            case r:
            case s:
            case o:
            case d:
              return C;
            default:
              switch (((C = C && C.$$typeof), C)) {
                case a:
                case c:
                case p:
                case h:
                case i:
                  return C;
                default:
                  return A;
              }
          }
        case n:
          return A;
      }
    }
  }
  function _(C) {
    return b(C) === u;
  }
  return (
    (me.AsyncMode = l),
    (me.ConcurrentMode = u),
    (me.ContextConsumer = a),
    (me.ContextProvider = i),
    (me.Element = t),
    (me.ForwardRef = c),
    (me.Fragment = r),
    (me.Lazy = p),
    (me.Memo = h),
    (me.Portal = n),
    (me.Profiler = s),
    (me.StrictMode = o),
    (me.Suspense = d),
    (me.isAsyncMode = function (C) {
      return _(C) || b(C) === l;
    }),
    (me.isConcurrentMode = _),
    (me.isContextConsumer = function (C) {
      return b(C) === a;
    }),
    (me.isContextProvider = function (C) {
      return b(C) === i;
    }),
    (me.isElement = function (C) {
      return typeof C == "object" && C !== null && C.$$typeof === t;
    }),
    (me.isForwardRef = function (C) {
      return b(C) === c;
    }),
    (me.isFragment = function (C) {
      return b(C) === r;
    }),
    (me.isLazy = function (C) {
      return b(C) === p;
    }),
    (me.isMemo = function (C) {
      return b(C) === h;
    }),
    (me.isPortal = function (C) {
      return b(C) === n;
    }),
    (me.isProfiler = function (C) {
      return b(C) === s;
    }),
    (me.isStrictMode = function (C) {
      return b(C) === o;
    }),
    (me.isSuspense = function (C) {
      return b(C) === d;
    }),
    (me.isValidElementType = function (C) {
      return (
        typeof C == "string" ||
        typeof C == "function" ||
        C === r ||
        C === u ||
        C === s ||
        C === o ||
        C === d ||
        C === f ||
        (typeof C == "object" &&
          C !== null &&
          (C.$$typeof === p ||
            C.$$typeof === h ||
            C.$$typeof === i ||
            C.$$typeof === a ||
            C.$$typeof === c ||
            C.$$typeof === m ||
            C.$$typeof === v ||
            C.$$typeof === x ||
            C.$$typeof === g))
      );
    }),
    (me.typeOf = b),
    me
  );
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
var Da;
function hh() {
  return (
    Da ||
      ((Da = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = typeof Symbol == "function" && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            n = e ? Symbol.for("react.portal") : 60106,
            r = e ? Symbol.for("react.fragment") : 60107,
            o = e ? Symbol.for("react.strict_mode") : 60108,
            s = e ? Symbol.for("react.profiler") : 60114,
            i = e ? Symbol.for("react.provider") : 60109,
            a = e ? Symbol.for("react.context") : 60110,
            l = e ? Symbol.for("react.async_mode") : 60111,
            u = e ? Symbol.for("react.concurrent_mode") : 60111,
            c = e ? Symbol.for("react.forward_ref") : 60112,
            d = e ? Symbol.for("react.suspense") : 60113,
            f = e ? Symbol.for("react.suspense_list") : 60120,
            h = e ? Symbol.for("react.memo") : 60115,
            p = e ? Symbol.for("react.lazy") : 60116,
            g = e ? Symbol.for("react.block") : 60121,
            m = e ? Symbol.for("react.fundamental") : 60117,
            v = e ? Symbol.for("react.responder") : 60118,
            x = e ? Symbol.for("react.scope") : 60119;
          function b(q) {
            return (
              typeof q == "string" ||
              typeof q == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              q === r ||
              q === u ||
              q === s ||
              q === o ||
              q === d ||
              q === f ||
              (typeof q == "object" &&
                q !== null &&
                (q.$$typeof === p ||
                  q.$$typeof === h ||
                  q.$$typeof === i ||
                  q.$$typeof === a ||
                  q.$$typeof === c ||
                  q.$$typeof === m ||
                  q.$$typeof === v ||
                  q.$$typeof === x ||
                  q.$$typeof === g))
            );
          }
          function _(q) {
            if (typeof q == "object" && q !== null) {
              var ve = q.$$typeof;
              switch (ve) {
                case t:
                  var je = q.type;
                  switch (je) {
                    case l:
                    case u:
                    case r:
                    case s:
                    case o:
                    case d:
                      return je;
                    default:
                      var _e = je && je.$$typeof;
                      switch (_e) {
                        case a:
                        case c:
                        case p:
                        case h:
                        case i:
                          return _e;
                        default:
                          return ve;
                      }
                  }
                case n:
                  return ve;
              }
            }
          }
          var C = l,
            A = u,
            I = a,
            S = i,
            P = t,
            k = c,
            j = r,
            z = p,
            B = h,
            E = n,
            N = s,
            w = o,
            O = d,
            L = !1;
          function D(q) {
            return (
              L ||
                ((L = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              T(q) || _(q) === l
            );
          }
          function T(q) {
            return _(q) === u;
          }
          function R(q) {
            return _(q) === a;
          }
          function H(q) {
            return _(q) === i;
          }
          function V(q) {
            return typeof q == "object" && q !== null && q.$$typeof === t;
          }
          function W(q) {
            return _(q) === c;
          }
          function Y(q) {
            return _(q) === r;
          }
          function Z(q) {
            return _(q) === p;
          }
          function X(q) {
            return _(q) === h;
          }
          function Q(q) {
            return _(q) === n;
          }
          function te(q) {
            return _(q) === s;
          }
          function K(q) {
            return _(q) === o;
          }
          function fe(q) {
            return _(q) === d;
          }
          (ye.AsyncMode = C),
            (ye.ConcurrentMode = A),
            (ye.ContextConsumer = I),
            (ye.ContextProvider = S),
            (ye.Element = P),
            (ye.ForwardRef = k),
            (ye.Fragment = j),
            (ye.Lazy = z),
            (ye.Memo = B),
            (ye.Portal = E),
            (ye.Profiler = N),
            (ye.StrictMode = w),
            (ye.Suspense = O),
            (ye.isAsyncMode = D),
            (ye.isConcurrentMode = T),
            (ye.isContextConsumer = R),
            (ye.isContextProvider = H),
            (ye.isElement = V),
            (ye.isForwardRef = W),
            (ye.isFragment = Y),
            (ye.isLazy = Z),
            (ye.isMemo = X),
            (ye.isPortal = Q),
            (ye.isProfiler = te),
            (ye.isStrictMode = K),
            (ye.isSuspense = fe),
            (ye.isValidElementType = b),
            (ye.typeOf = _);
        })()),
    ye
  );
}
var Ia;
function wl() {
  return (
    Ia ||
      ((Ia = 1),
      process.env.NODE_ENV === "production"
        ? (Fr.exports = fh())
        : (Fr.exports = hh())),
    Fr.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var is, Oa;
function ph() {
  if (Oa) return is;
  Oa = 1;
  var e = Object.getOwnPropertySymbols,
    t = Object.prototype.hasOwnProperty,
    n = Object.prototype.propertyIsEnumerable;
  function r(s) {
    if (s == null)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined",
      );
    return Object(s);
  }
  function o() {
    try {
      if (!Object.assign) return !1;
      var s = new String("abc");
      if (((s[5] = "de"), Object.getOwnPropertyNames(s)[0] === "5")) return !1;
      for (var i = {}, a = 0; a < 10; a++) i["_" + String.fromCharCode(a)] = a;
      var l = Object.getOwnPropertyNames(i).map(function (c) {
        return i[c];
      });
      if (l.join("") !== "0123456789") return !1;
      var u = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function (c) {
          u[c] = c;
        }),
        Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst"
      );
    } catch {
      return !1;
    }
  }
  return (
    (is = o()
      ? Object.assign
      : function (s, i) {
          for (var a, l = r(s), u, c = 1; c < arguments.length; c++) {
            a = Object(arguments[c]);
            for (var d in a) t.call(a, d) && (l[d] = a[d]);
            if (e) {
              u = e(a);
              for (var f = 0; f < u.length; f++)
                n.call(a, u[f]) && (l[u[f]] = a[u[f]]);
            }
          }
          return l;
        }),
    is
  );
}
var as, Ra;
function Ti() {
  if (Ra) return as;
  Ra = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (as = e), as;
}
var cs, Ma;
function Sl() {
  return (
    Ma ||
      ((Ma = 1), (cs = Function.call.bind(Object.prototype.hasOwnProperty))),
    cs
  );
}
var ls, La;
function gh() {
  if (La) return ls;
  La = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = Ti(),
      n = {},
      r = Sl();
    e = function (s) {
      var i = "Warning: " + s;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {}
    };
  }
  function o(s, i, a, l, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var c in s)
        if (r(s, c)) {
          var d;
          try {
            if (typeof s[c] != "function") {
              var f = Error(
                (l || "React class") +
                  ": " +
                  a +
                  " type `" +
                  c +
                  "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                  typeof s[c] +
                  "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
              );
              throw ((f.name = "Invariant Violation"), f);
            }
            d = s[c](i, c, l, a, null, t);
          } catch (p) {
            d = p;
          }
          if (
            (d &&
              !(d instanceof Error) &&
              e(
                (l || "React class") +
                  ": type specification of " +
                  a +
                  " `" +
                  c +
                  "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
                  typeof d +
                  ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
              ),
            d instanceof Error && !(d.message in n))
          ) {
            n[d.message] = !0;
            var h = u ? u() : "";
            e("Failed " + a + " type: " + d.message + (h ?? ""));
          }
        }
    }
  }
  return (
    (o.resetWarningCache = function () {
      process.env.NODE_ENV !== "production" && (n = {});
    }),
    (ls = o),
    ls
  );
}
var us, ka;
function mh() {
  if (ka) return us;
  ka = 1;
  var e = wl(),
    t = ph(),
    n = Ti(),
    r = Sl(),
    o = gh(),
    s = function () {};
  process.env.NODE_ENV !== "production" &&
    (s = function (a) {
      var l = "Warning: " + a;
      typeof console < "u" && console.error(l);
      try {
        throw new Error(l);
      } catch {}
    });
  function i() {
    return null;
  }
  return (
    (us = function (a, l) {
      var u = typeof Symbol == "function" && Symbol.iterator,
        c = "@@iterator";
      function d(T) {
        var R = T && ((u && T[u]) || T[c]);
        if (typeof R == "function") return R;
      }
      var f = "<<anonymous>>",
        h = {
          array: v("array"),
          bigint: v("bigint"),
          bool: v("boolean"),
          func: v("function"),
          number: v("number"),
          object: v("object"),
          string: v("string"),
          symbol: v("symbol"),
          any: x(),
          arrayOf: b,
          element: _(),
          elementType: C(),
          instanceOf: A,
          node: k(),
          objectOf: S,
          oneOf: I,
          oneOfType: P,
          shape: z,
          exact: B,
        };
      function p(T, R) {
        return T === R ? T !== 0 || 1 / T === 1 / R : T !== T && R !== R;
      }
      function g(T, R) {
        (this.message = T),
          (this.data = R && typeof R == "object" ? R : {}),
          (this.stack = "");
      }
      g.prototype = Error.prototype;
      function m(T) {
        if (process.env.NODE_ENV !== "production")
          var R = {},
            H = 0;
        function V(Y, Z, X, Q, te, K, fe) {
          if (((Q = Q || f), (K = K || X), fe !== n)) {
            if (l) {
              var q = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types",
              );
              throw ((q.name = "Invariant Violation"), q);
            } else if (
              process.env.NODE_ENV !== "production" &&
              typeof console < "u"
            ) {
              var ve = Q + ":" + X;
              !R[ve] && // Avoid spamming the console because they are often not actionable except for lib authors
                H < 3 &&
                (s(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    K +
                    "` prop on `" +
                    Q +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (R[ve] = !0),
                H++);
            }
          }
          return Z[X] == null
            ? Y
              ? Z[X] === null
                ? new g(
                    "The " +
                      te +
                      " `" +
                      K +
                      "` is marked as required " +
                      ("in `" + Q + "`, but its value is `null`."),
                  )
                : new g(
                    "The " +
                      te +
                      " `" +
                      K +
                      "` is marked as required in " +
                      ("`" + Q + "`, but its value is `undefined`."),
                  )
              : null
            : T(Z, X, Q, te, K);
        }
        var W = V.bind(null, !1);
        return (W.isRequired = V.bind(null, !0)), W;
      }
      function v(T) {
        function R(H, V, W, Y, Z, X) {
          var Q = H[V],
            te = w(Q);
          if (te !== T) {
            var K = O(Q);
            return new g(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + K + "` supplied to `" + W + "`, expected ") +
                ("`" + T + "`."),
              { expectedType: T },
            );
          }
          return null;
        }
        return m(R);
      }
      function x() {
        return m(i);
      }
      function b(T) {
        function R(H, V, W, Y, Z) {
          if (typeof T != "function")
            return new g(
              "Property `" +
                Z +
                "` of component `" +
                W +
                "` has invalid PropType notation inside arrayOf.",
            );
          var X = H[V];
          if (!Array.isArray(X)) {
            var Q = w(X);
            return new g(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + Q + "` supplied to `" + W + "`, expected an array."),
            );
          }
          for (var te = 0; te < X.length; te++) {
            var K = T(X, te, W, Y, Z + "[" + te + "]", n);
            if (K instanceof Error) return K;
          }
          return null;
        }
        return m(R);
      }
      function _() {
        function T(R, H, V, W, Y) {
          var Z = R[H];
          if (!a(Z)) {
            var X = w(Z);
            return new g(
              "Invalid " +
                W +
                " `" +
                Y +
                "` of type " +
                ("`" +
                  X +
                  "` supplied to `" +
                  V +
                  "`, expected a single ReactElement."),
            );
          }
          return null;
        }
        return m(T);
      }
      function C() {
        function T(R, H, V, W, Y) {
          var Z = R[H];
          if (!e.isValidElementType(Z)) {
            var X = w(Z);
            return new g(
              "Invalid " +
                W +
                " `" +
                Y +
                "` of type " +
                ("`" +
                  X +
                  "` supplied to `" +
                  V +
                  "`, expected a single ReactElement type."),
            );
          }
          return null;
        }
        return m(T);
      }
      function A(T) {
        function R(H, V, W, Y, Z) {
          if (!(H[V] instanceof T)) {
            var X = T.name || f,
              Q = D(H[V]);
            return new g(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + Q + "` supplied to `" + W + "`, expected ") +
                ("instance of `" + X + "`."),
            );
          }
          return null;
        }
        return m(R);
      }
      function I(T) {
        if (!Array.isArray(T))
          return (
            process.env.NODE_ENV !== "production" &&
              (arguments.length > 1
                ? s(
                    "Invalid arguments supplied to oneOf, expected an array, got " +
                      arguments.length +
                      " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).",
                  )
                : s("Invalid argument supplied to oneOf, expected an array.")),
            i
          );
        function R(H, V, W, Y, Z) {
          for (var X = H[V], Q = 0; Q < T.length; Q++)
            if (p(X, T[Q])) return null;
          var te = JSON.stringify(T, function (fe, q) {
            var ve = O(q);
            return ve === "symbol" ? String(q) : q;
          });
          return new g(
            "Invalid " +
              Y +
              " `" +
              Z +
              "` of value `" +
              String(X) +
              "` " +
              ("supplied to `" + W + "`, expected one of " + te + "."),
          );
        }
        return m(R);
      }
      function S(T) {
        function R(H, V, W, Y, Z) {
          if (typeof T != "function")
            return new g(
              "Property `" +
                Z +
                "` of component `" +
                W +
                "` has invalid PropType notation inside objectOf.",
            );
          var X = H[V],
            Q = w(X);
          if (Q !== "object")
            return new g(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type " +
                ("`" + Q + "` supplied to `" + W + "`, expected an object."),
            );
          for (var te in X)
            if (r(X, te)) {
              var K = T(X, te, W, Y, Z + "." + te, n);
              if (K instanceof Error) return K;
            }
          return null;
        }
        return m(R);
      }
      function P(T) {
        if (!Array.isArray(T))
          return (
            process.env.NODE_ENV !== "production" &&
              s(
                "Invalid argument supplied to oneOfType, expected an instance of array.",
              ),
            i
          );
        for (var R = 0; R < T.length; R++) {
          var H = T[R];
          if (typeof H != "function")
            return (
              s(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                  L(H) +
                  " at index " +
                  R +
                  ".",
              ),
              i
            );
        }
        function V(W, Y, Z, X, Q) {
          for (var te = [], K = 0; K < T.length; K++) {
            var fe = T[K],
              q = fe(W, Y, Z, X, Q, n);
            if (q == null) return null;
            q.data && r(q.data, "expectedType") && te.push(q.data.expectedType);
          }
          var ve =
            te.length > 0
              ? ", expected one of type [" + te.join(", ") + "]"
              : "";
          return new g(
            "Invalid " +
              X +
              " `" +
              Q +
              "` supplied to " +
              ("`" + Z + "`" + ve + "."),
          );
        }
        return m(V);
      }
      function k() {
        function T(R, H, V, W, Y) {
          return E(R[H])
            ? null
            : new g(
                "Invalid " +
                  W +
                  " `" +
                  Y +
                  "` supplied to " +
                  ("`" + V + "`, expected a ReactNode."),
              );
        }
        return m(T);
      }
      function j(T, R, H, V, W) {
        return new g(
          (T || "React class") +
            ": " +
            R +
            " type `" +
            H +
            "." +
            V +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            W +
            "`.",
        );
      }
      function z(T) {
        function R(H, V, W, Y, Z) {
          var X = H[V],
            Q = w(X);
          if (Q !== "object")
            return new g(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + W + "`, expected `object`."),
            );
          for (var te in T) {
            var K = T[te];
            if (typeof K != "function") return j(W, Y, Z, te, O(K));
            var fe = K(X, te, W, Y, Z + "." + te, n);
            if (fe) return fe;
          }
          return null;
        }
        return m(R);
      }
      function B(T) {
        function R(H, V, W, Y, Z) {
          var X = H[V],
            Q = w(X);
          if (Q !== "object")
            return new g(
              "Invalid " +
                Y +
                " `" +
                Z +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + W + "`, expected `object`."),
            );
          var te = t({}, H[V], T);
          for (var K in te) {
            var fe = T[K];
            if (r(T, K) && typeof fe != "function") return j(W, Y, Z, K, O(fe));
            if (!fe)
              return new g(
                "Invalid " +
                  Y +
                  " `" +
                  Z +
                  "` key `" +
                  K +
                  "` supplied to `" +
                  W +
                  "`.\nBad object: " +
                  JSON.stringify(H[V], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(T), null, "  "),
              );
            var q = fe(X, K, W, Y, Z + "." + K, n);
            if (q) return q;
          }
          return null;
        }
        return m(R);
      }
      function E(T) {
        switch (typeof T) {
          case "number":
          case "string":
          case "undefined":
            return !0;
          case "boolean":
            return !T;
          case "object":
            if (Array.isArray(T)) return T.every(E);
            if (T === null || a(T)) return !0;
            var R = d(T);
            if (R) {
              var H = R.call(T),
                V;
              if (R !== T.entries) {
                for (; !(V = H.next()).done; ) if (!E(V.value)) return !1;
              } else
                for (; !(V = H.next()).done; ) {
                  var W = V.value;
                  if (W && !E(W[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function N(T, R) {
        return T === "symbol"
          ? !0
          : R
            ? R["@@toStringTag"] === "Symbol" ||
              (typeof Symbol == "function" && R instanceof Symbol)
            : !1;
      }
      function w(T) {
        var R = typeof T;
        return Array.isArray(T)
          ? "array"
          : T instanceof RegExp
            ? "object"
            : N(R, T)
              ? "symbol"
              : R;
      }
      function O(T) {
        if (typeof T > "u" || T === null) return "" + T;
        var R = w(T);
        if (R === "object") {
          if (T instanceof Date) return "date";
          if (T instanceof RegExp) return "regexp";
        }
        return R;
      }
      function L(T) {
        var R = O(T);
        switch (R) {
          case "array":
          case "object":
            return "an " + R;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + R;
          default:
            return R;
        }
      }
      function D(T) {
        return !T.constructor || !T.constructor.name ? f : T.constructor.name;
      }
      return (
        (h.checkPropTypes = o),
        (h.resetWarningCache = o.resetWarningCache),
        (h.PropTypes = h),
        h
      );
    }),
    us
  );
}
var ds, Pa;
function yh() {
  if (Pa) return ds;
  Pa = 1;
  var e = Ti();
  function t() {}
  function n() {}
  return (
    (n.resetWarningCache = t),
    (ds = function () {
      function r(i, a, l, u, c, d) {
        if (d !== e) {
          var f = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((f.name = "Invariant Violation"), f);
        }
      }
      r.isRequired = r;
      function o() {
        return r;
      }
      var s = {
        array: r,
        bigint: r,
        bool: r,
        func: r,
        number: r,
        object: r,
        string: r,
        symbol: r,
        any: r,
        arrayOf: o,
        element: r,
        elementType: r,
        instanceOf: o,
        node: r,
        objectOf: o,
        oneOf: o,
        oneOfType: o,
        shape: o,
        exact: o,
        checkPropTypes: n,
        resetWarningCache: t,
      };
      return (s.PropTypes = s), s;
    }),
    ds
  );
}
if (process.env.NODE_ENV !== "production") {
  var vh = wl(),
    Eh = !0;
  Hs.exports = mh()(vh.isElement, Eh);
} else Hs.exports = yh()();
var Ch = Hs.exports;
const G = /* @__PURE__ */ zn(Ch);
var ro = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  Ct = {
    id: "__id__",
    display: "__display__",
  },
  ja = function (t, n) {
    Ln(
      n === "id" || n === "display",
      'Second arg must be either "id" or "display", got: "'.concat(n, '"'),
    );
    var r = t.indexOf(Ct.display),
      o = t.indexOf(Ct.id);
    return (
      r < 0 && (r = null),
      o < 0 && (o = null),
      Ln(
        r !== null || o !== null,
        "The markup '".concat(
          t,
          "' does not contain either of the placeholders '__id__' or '__display__'",
        ),
      ),
      r !== null && o !== null
        ? (n === "id" && o <= r) || (n === "display" && r <= o)
          ? 0
          : 1
        : 0
    );
  },
  xh = function (t) {
    var n = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (r) {
          var o = n.exec(r.toString()),
            s = mo(o, 3),
            i = s[1],
            a = s[2];
          return (
            Ln(
              !a,
              "RegExp flags are not supported. Change /"
                .concat(i, "/")
                .concat(a, " into /")
                .concat(i, "/"),
            ),
            "(".concat(i, ")")
          );
        })
        .join("|"),
      "g",
    );
  },
  Nl = function (t) {
    var n = 0;
    return (
      t.indexOf("__id__") >= 0 && n++, t.indexOf("__display__") >= 0 && n++, n
    );
  },
  _h = function () {},
  Sr = function (t, n, r) {
    for (
      var o =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : _h,
        s = xh(
          n.map(function (C) {
            return C.regex;
          }),
        ),
        i = 2,
        a = n.map(function (C) {
          var A = C.markup,
            I = i;
          return (i += Nl(A) + 1), I;
        }),
        l,
        u = 0,
        c = 0;
      (l = s.exec(t)) !== null;

    ) {
      var d = a.find(function (C) {
          return !!l[C];
        }),
        f = a.indexOf(d),
        h = n[f],
        p = h.markup,
        g = h.displayTransform,
        m = d + ja(p, "id"),
        v = d + ja(p, "display"),
        x = l[m],
        b = g(x, l[v]),
        _ = t.substring(u, l.index);
      o(_, u, c),
        (c += _.length),
        r(l[0], l.index, c, x, b, f, u),
        (c += b.length),
        (u = s.lastIndex);
    }
    u < t.length && o(t.substring(u), u, c);
  },
  sn = function (t, n) {
    var r = "";
    return (
      Sr(
        t,
        n,
        function (o, s, i, a, l) {
          r += l;
        },
        function (o) {
          r += o;
        },
      ),
      r
    );
  },
  Be = function (t, n, r) {
    var o =
      arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
    if (typeof r != "number") return r;
    var s,
      i = function (u, c, d) {
        s === void 0 && d + u.length >= r && (s = c + r - d);
      },
      a = function (u, c, d, f, h, p, g) {
        s === void 0 &&
          d + h.length > r &&
          (o === "NULL" ? (s = null) : (s = c + (o === "END" ? u.length : 0)));
      };
    return Sr(t, n, a, i), s === void 0 ? t.length : s;
  },
  rr = function (t, n, r, o) {
    return t.substring(0, n) + o + t.substring(r);
  },
  bh = function (t, n, r, o) {
    var s = r.selectionStartBefore,
      i = r.selectionEndBefore,
      a = r.selectionEndAfter,
      l = sn(t, o),
      u = l.length - n.length;
    s === "undefined" && (s = a + u),
      i === "undefined" && (i = s),
      s === i && i === a && l.length === n.length && (s = s - 1);
    var c = n.slice(s, a),
      d = Math.min(s, a),
      f = i;
    s === a && (f = Math.max(i, s + u));
    var h = Be(t, o, d, "START"),
      p = Be(t, o, f, "END"),
      g = Be(t, o, d, "NULL"),
      m = Be(t, o, f, "NULL"),
      v = g === null || m === null,
      x = rr(t, h, p, c);
    if (!v) {
      var b = sn(x, o);
      if (b !== n) {
        for (d = 0; n[d] === b[d]; ) d++;
        (c = n.slice(d, a)),
          (f = l.lastIndexOf(n.substring(a))),
          (h = Be(t, o, d, "START")),
          (p = Be(t, o, f, "END")),
          (x = rr(t, h, p, c));
      }
    }
    return x;
  },
  $a = function (t, n, r) {
    var o = r,
      s = !1,
      i = function (l, u, c, d, f, h, p) {
        c <= r && c + f.length > r && ((o = c), (s = !0));
      };
    if ((Sr(t, n, i), s)) return o;
  },
  Qn = function (t, n) {
    var r = [];
    return (
      Sr(t, n, function (o, s, i, a, l, u, c) {
        r.push({
          id: a,
          display: l,
          childIndex: u,
          index: s,
          plainTextIndex: i,
        });
      }),
      r
    );
  },
  Tl = function (t, n) {
    return "".concat(t, "-").concat(n);
  },
  Hr = function (t) {
    return Object.values(t).reduce(function (n, r) {
      var o = r.results;
      return n + o.length;
    }, 0);
  },
  wh = function (t, n) {
    var r = Qn(t, n),
      o = r[r.length - 1];
    return o ? o.plainTextIndex + o.display.length : 0;
  },
  Sh = function (t) {
    var n = ro(t),
      r = t[t.indexOf(Ct.display) + Ct.display.length],
      o = t[t.indexOf(Ct.id) + Ct.id.length];
    return new RegExp(
      n
        .replace(Ct.display, "([^".concat(ro(r || ""), "]+?)"))
        .replace(Ct.id, "([^".concat(ro(o || ""), "]+?)")),
    );
  },
  Ut = function (t) {
    return On.toArray(t).map(function (n) {
      var r = n.props,
        o = r.markup,
        s = r.regex,
        i = r.displayTransform;
      return {
        markup: o,
        regex: s ? Nh(s, o) : Sh(o),
        displayTransform:
          i ||
          function (a, l) {
            return l || a;
          },
      };
    });
  },
  Nh = function (t, n) {
    var r = new RegExp(t.toString() + "|").exec("").length - 1,
      o = Nl(n);
    return (
      Ln(
        r === o,
        "Number of capturing groups in RegExp "
          .concat(t.toString(), " (")
          .concat(
            r,
            ") does not match the number of placeholders in the markup '",
          )
          .concat(n, "' (")
          .concat(o, ")"),
      ),
      t
    );
  },
  Th = function (t, n, r) {
    return t.replace(Ct.id, n).replace(Ct.display, r);
  },
  Ah = [
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
  Dh = function (t) {
    var n = t;
    return (
      Ah.forEach(function (r) {
        n = n.replace(r.letters, r.base);
      }),
      n
    );
  },
  Fa = function (t) {
    return Dh(t).toLowerCase();
  },
  Al = function (t, n, r) {
    return r ? Fa(t).indexOf(Fa(n)) : t.toLowerCase().indexOf(n.toLowerCase());
  },
  Ih = function () {
    return !!document.documentMode;
  },
  Bs = function (t) {
    return typeof t == "number";
  },
  Oh = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  Rh = function (t) {
    for (
      var n, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), s = 1;
      s < r;
      s++
    )
      o[s - 1] = arguments[s];
    var i = (n = []).concat.apply(n, o);
    return Object.keys(t).reduce(function (a, l) {
      return (
        t.hasOwnProperty(l) &&
          !i.includes(l) &&
          t[l] !== void 0 &&
          (a[l] = t[l]),
        a
      );
    }, {});
  },
  Mh = ["style", "className", "classNames"];
function Ha(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ba(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ha(Object(n), !0).forEach(function (r) {
          ae(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ha(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function $o(e, t) {
  var n = function (o) {
    var s = function (l) {
        var u = l.style,
          c = l.className,
          d = l.classNames,
          f = Z0(l, Mh),
          h = t ? t(f) : void 0,
          p = Ni(
            e,
            {
              style: u,
              className: c,
              classNames: d,
            },
            h,
          );
        return /* @__PURE__ */ $.createElement(
          o,
          rt({}, f, {
            style: p,
          }),
        );
      },
      i = o.displayName || o.name || "Component";
    return (
      (s.displayName = "defaultStyle(".concat(i, ")")),
      /* @__PURE__ */ $.forwardRef(function (a, l) {
        return s(
          Ba(
            Ba({}, a),
            {},
            {
              ref: l,
            },
          ),
        );
      })
    );
  };
  return n;
}
var Lh = function (t, n) {
  return t.hasOwnProperty(n) ? t[n]++ : (t[n] = 0), n + "_" + t[n];
};
function Dl(e) {
  var t = e.selectionStart,
    n = e.selectionEnd,
    r = e.value,
    o = r === void 0 ? "" : r,
    s = e.onCaretPositionChange,
    i = e.containerRef,
    a = e.children;
  e.singleLine;
  var l = e.style,
    u = de({
      left: void 0,
      top: void 0,
    }),
    c = mo(u, 2),
    d = c[0],
    f = c[1],
    h = de(),
    p = mo(h, 2),
    g = p[0],
    m = p[1];
  ie(function () {
    v();
  });
  var v = function () {
      if (g) {
        var E = g.offsetLeft,
          N = g.offsetTop;
        if (!(d.left === E && d.top === N)) {
          var w = {
            left: E,
            top: N,
          };
          f(w), s(w);
        }
      }
    },
    x = Ut(a),
    b;
  n === t && (b = Be(o, x, t, "START"));
  var _ = [],
    C = {},
    A = _,
    I = 0,
    S = function (E, N, w) {
      if (Bs(b) && b >= N && b <= N + E.length) {
        var O = b - N;
        A.push(k(E.substring(0, O), I)), (A = [k(E.substring(O), I)]);
      } else A.push(k(E, I));
      I++;
    },
    P = function (E, N, w, O, L, D, T) {
      var R = Lh(C, O);
      A.push(j(O, L, D, R));
    },
    k = function (E, N) {
      return /* @__PURE__ */ $.createElement(
        "span",
        rt({}, l("substring"), {
          key: N,
        }),
        E,
      );
    },
    j = function (E, N, w, O) {
      var L = {
          id: E,
          display: N,
          key: O,
        },
        D = On.toArray(a)[w];
      return /* @__PURE__ */ $.cloneElement(D, L);
    },
    z = function (E) {
      return /* @__PURE__ */ $.createElement(
        "span",
        rt({}, l("caret"), {
          ref: m,
          key: "caret",
        }),
        E,
      );
    };
  return (
    Sr(o, x, P, S),
    A.push(" "),
    A !== _ && _.push(z(A)),
    /* @__PURE__ */ $.createElement(
      "div",
      rt({}, l, {
        ref: i,
      }),
      _,
    )
  );
}
Dl.propTypes = {
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
var kh = $o(
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
  Ph = kh(Dl);
function Il(e) {
  var t = e.id,
    n = e.focused,
    r = e.ignoreAccents,
    o = e.index,
    s = e.onClick,
    i = e.onMouseEnter,
    a = e.query,
    l = e.renderSuggestion,
    u = e.suggestion,
    c = e.style;
  e.className, e.classNames;
  var d = {
      onClick: s,
      onMouseEnter: i,
    },
    f = function () {
      var m = h(),
        v = p(m);
      return l ? l(u, a, v, o, n) : v;
    },
    h = function () {
      if (typeof u == "string") return u;
      var m = u.id,
        v = u.display;
      return m === void 0 || !v ? m : v;
    },
    p = function (m) {
      var v = Al(m, a, r);
      return v === -1
        ? /* @__PURE__ */ $.createElement("span", c("display"), m)
        : /* @__PURE__ */ $.createElement(
            "span",
            c("display"),
            m.substring(0, v),
            /* @__PURE__ */ $.createElement(
              "b",
              c("highlight"),
              m.substring(v, v + a.length),
            ),
            m.substring(v + a.length),
          );
    };
  return /* @__PURE__ */ $.createElement(
    "li",
    rt(
      {
        id: t,
        role: "option",
        "aria-selected": n,
      },
      d,
      c,
    ),
    f(),
  );
}
Il.propTypes = {
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
var jh = $o(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  $h = jh(Il);
function Fh(e) {
  var t = e.style,
    n = e.className,
    r = e.classNames,
    o = Ni(Hh, {
      style: t,
      className: n,
      classNames: r,
    }),
    s = o("spinner");
  return /* @__PURE__ */ $.createElement(
    "div",
    o,
    /* @__PURE__ */ $.createElement(
      "div",
      s,
      /* @__PURE__ */ $.createElement("div", s(["element", "element1"])),
      /* @__PURE__ */ $.createElement("div", s(["element", "element2"])),
      /* @__PURE__ */ $.createElement("div", s(["element", "element3"])),
      /* @__PURE__ */ $.createElement("div", s(["element", "element4"])),
      /* @__PURE__ */ $.createElement("div", s(["element", "element5"])),
    ),
  );
}
var Hh = {};
function Ol(e) {
  var t = e.id,
    n = e.suggestions,
    r = n === void 0 ? {} : n,
    o = e.a11ySuggestionsListLabel,
    s = e.focusIndex,
    i = e.position,
    a = e.left,
    l = e.right,
    u = e.top,
    c = e.scrollFocusedIntoView,
    d = e.isLoading,
    f = e.isOpened,
    h = e.onSelect,
    p =
      h === void 0
        ? function () {
            return null;
          }
        : h,
    g = e.ignoreAccents,
    m = e.containerRef,
    v = e.children,
    x = e.style,
    b = e.customSuggestionsContainer,
    _ = e.onMouseDown,
    C = e.onMouseEnter,
    A = de(void 0),
    I = mo(A, 2),
    S = I[0],
    P = I[1];
  ie(
    function () {
      if (!(!S || S.offsetHeight >= S.scrollHeight || !c)) {
        var w = S.scrollTop,
          O = S.children[s].getBoundingClientRect(),
          L = O.top,
          D = O.bottom,
          T = S.getBoundingClientRect(),
          R = T.top;
        (L = L - R + w),
          (D = D - R + w),
          L < w
            ? (S.scrollTop = L)
            : D > S.offsetHeight && (S.scrollTop = D - S.offsetHeight);
      }
    },
    [s, c, S],
  );
  var k = function () {
      var O = /* @__PURE__ */ $.createElement(
        "ul",
        rt(
          {
            ref: P,
            id: t,
            role: "listbox",
            "aria-label": o,
          },
          x("list"),
        ),
        Object.values(r).reduce(function (L, D) {
          var T = D.results,
            R = D.queryInfo;
          return [].concat(
            po(L),
            po(
              T.map(function (H, V) {
                return j(H, R, L.length + V);
              }),
            ),
          );
        }, []),
      );
      return b ? b(O) : O;
    },
    j = function (O, L, D) {
      var T = D === s,
        R = L.childIndex,
        H = L.query,
        V = On.toArray(v)[R].props.renderSuggestion;
      return /* @__PURE__ */ $.createElement($h, {
        style: x("item"),
        key: "".concat(R, "-").concat(N(O)),
        id: Tl(t, D),
        query: H,
        index: D,
        ignoreAccents: g,
        renderSuggestion: V,
        suggestion: O,
        focused: T,
        onClick: function () {
          return E(O, L);
        },
        onMouseEnter: function () {
          return B(D);
        },
      });
    },
    z = function () {
      if (d)
        return /* @__PURE__ */ $.createElement(Fh, {
          style: x("loadingIndicator"),
        });
    },
    B = function (O, L) {
      C && C(O);
    },
    E = function (O, L) {
      p(O, L);
    },
    N = function (O) {
      return typeof O == "string" ? O : O.id;
    };
  return f
    ? /* @__PURE__ */ $.createElement(
        "div",
        rt(
          {},
          dh(
            {
              position: i || "absolute",
              left: a,
              right: l,
              top: u,
            },
            x,
          ),
          {
            onMouseDown: _,
            ref: m,
          },
        ),
        k(),
        z(),
      )
    : null;
}
Ol.propTypes = {
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
var Bh = $o({
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
  zh = Bh(Ol);
function za(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function lt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? za(Object(n), !0).forEach(function (r) {
          ae(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : za(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Vh(e) {
  var t = Wh();
  return function () {
    var r = go(e),
      o;
    if (t) {
      var s = go(this).constructor;
      o = Reflect.construct(r, arguments, s);
    } else o = r.apply(this, arguments);
    return H0(this, o);
  };
}
function Wh() {
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
var Uh = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t instanceof RegExp) return t;
    var r = n.allowSpaceInQuery,
      o = ro(t);
    return new RegExp(
      "(?:^|\\s)("
        .concat(o, "([^")
        .concat(r ? "" : "\\s")
        .concat(o, "]*))$"),
    );
  },
  Yh = function (t, n) {
    return t instanceof Array
      ? function (r, o) {
          for (var s = [], i = 0, a = t.length; i < a; ++i) {
            var l = t[i].display || t[i].id;
            Al(l, r, n) >= 0 && s.push(t[i]);
          }
          return s;
        }
      : t;
  },
  En = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  Br = !1,
  Rl = {
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
  Ai = /* @__PURE__ */ (function (e) {
    F0(n, e);
    var t = Vh(n);
    function n(r) {
      var o;
      return (
        j0(this, n),
        (o = t.call(this, r)),
        ae(ue(o), "setContainerElement", function (s) {
          o.containerElement = s;
        }),
        ae(ue(o), "getInputProps", function () {
          var s = o.props,
            i = s.readOnly,
            a = s.disabled,
            l = s.style,
            u = Rh(
              o.props,
              ["style", "classNames", "className"],
              // substyle props
              Oh(Rl),
            );
          return lt(
            lt(
              lt(lt({}, u), l("input")),
              {},
              {
                value: o.getPlainText(),
                onScroll: o.updateHighlighterScroll,
              },
              !i &&
                !a && {
                  onChange: o.handleChange,
                  onSelect: o.handleSelect,
                  onKeyDown: o.handleKeyDown,
                  onBlur: o.handleBlur,
                  onCompositionStart: o.handleCompositionStart,
                  onCompositionEnd: o.handleCompositionEnd,
                },
            ),
            o.isOpened() && {
              role: "combobox",
              "aria-controls": o.uuidSuggestionsOverlay,
              "aria-expanded": !0,
              "aria-autocomplete": "list",
              "aria-haspopup": "listbox",
              "aria-activedescendant": Tl(
                o.uuidSuggestionsOverlay,
                o.state.focusIndex,
              ),
            },
          );
        }),
        ae(ue(o), "renderControl", function () {
          var s = o.props,
            i = s.singleLine,
            a = s.style,
            l = o.getInputProps();
          return /* @__PURE__ */ $.createElement(
            "div",
            a("control"),
            o.renderHighlighter(),
            i ? o.renderInput(l) : o.renderTextarea(l),
          );
        }),
        ae(ue(o), "renderInput", function (s) {
          return /* @__PURE__ */ $.createElement(
            "input",
            rt(
              {
                type: "text",
                ref: o.setInputRef,
              },
              s,
            ),
          );
        }),
        ae(ue(o), "renderTextarea", function (s) {
          return /* @__PURE__ */ $.createElement(
            "textarea",
            rt(
              {
                ref: o.setInputRef,
              },
              s,
            ),
          );
        }),
        ae(ue(o), "setInputRef", function (s) {
          o.inputElement = s;
          var i = o.props.inputRef;
          typeof i == "function" ? i(s) : i && (i.current = s);
        }),
        ae(ue(o), "setSuggestionsElement", function (s) {
          o.suggestionsElement = s;
        }),
        ae(ue(o), "renderSuggestionsOverlay", function () {
          if (!Bs(o.state.selectionStart)) return null;
          var s = o.state.suggestionsPosition,
            i = s.position,
            a = s.left,
            l = s.top,
            u = s.right,
            c = /* @__PURE__ */ $.createElement(
              zh,
              {
                id: o.uuidSuggestionsOverlay,
                style: o.props.style("suggestions"),
                position: i,
                left: a,
                top: l,
                right: u,
                focusIndex: o.state.focusIndex,
                scrollFocusedIntoView: o.state.scrollFocusedIntoView,
                containerRef: o.setSuggestionsElement,
                suggestions: o.state.suggestions,
                customSuggestionsContainer: o.props.customSuggestionsContainer,
                onSelect: o.addMention,
                onMouseDown: o.handleSuggestionsMouseDown,
                onMouseEnter: o.handleSuggestionsMouseEnter,
                isLoading: o.isLoading(),
                isOpened: o.isOpened(),
                ignoreAccents: o.props.ignoreAccents,
                a11ySuggestionsListLabel: o.props.a11ySuggestionsListLabel,
              },
              o.props.children,
            );
          return o.props.suggestionsPortalHost
            ? /* @__PURE__ */ t1.createPortal(c, o.props.suggestionsPortalHost)
            : c;
        }),
        ae(ue(o), "renderHighlighter", function () {
          var s = o.state,
            i = s.selectionStart,
            a = s.selectionEnd,
            l = o.props,
            u = l.singleLine,
            c = l.children,
            d = l.value,
            f = l.style;
          return /* @__PURE__ */ $.createElement(
            Ph,
            {
              containerRef: o.setHighlighterElement,
              style: f("highlighter"),
              value: d,
              singleLine: u,
              selectionStart: i,
              selectionEnd: a,
              onCaretPositionChange: o.handleCaretPositionChange,
            },
            c,
          );
        }),
        ae(ue(o), "setHighlighterElement", function (s) {
          o.highlighterElement = s;
        }),
        ae(ue(o), "handleCaretPositionChange", function (s) {
          o.setState({
            caretPosition: s,
          });
        }),
        ae(ue(o), "getPlainText", function () {
          return sn(o.props.value || "", Ut(o.props.children));
        }),
        ae(ue(o), "executeOnChange", function (s) {
          for (
            var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), l = 1;
            l < i;
            l++
          )
            a[l - 1] = arguments[l];
          if (o.props.onChange) {
            var u;
            return (u = o.props).onChange.apply(u, [s].concat(a));
          }
          if (o.props.valueLink) {
            var c;
            return (c = o.props.valueLink).requestChange.apply(
              c,
              [s.target.value].concat(a),
            );
          }
        }),
        ae(ue(o), "handleChange", function (s) {
          if (((Br = !1), Ih())) {
            var i =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (i.activeElement !== s.target) return;
          }
          var a = o.props.value || "",
            l = Ut(o.props.children),
            u = s.target.value,
            c = o.state.selectionStart;
          c == null && (c = s.target.selectionStart);
          var d = o.state.selectionEnd;
          d == null && (d = s.target.selectionEnd);
          var f = bh(
            a,
            u,
            {
              selectionStartBefore: c,
              selectionEndBefore: d,
              selectionEndAfter: s.target.selectionEnd,
            },
            l,
          );
          u = sn(f, l);
          var h = s.target.selectionStart,
            p = s.target.selectionEnd,
            g = !1,
            m = $a(a, l, h);
          m !== void 0 &&
            o.state.selectionEnd > m &&
            ((h = m + (s.nativeEvent.data ? s.nativeEvent.data.length : 0)),
            (p = h),
            (g = !0)),
            o.setState({
              selectionStart: h,
              selectionEnd: p,
              setSelectionAfterMentionChange: g,
            });
          var v = Qn(f, l);
          s.nativeEvent.isComposing &&
            h === p &&
            o.updateMentionsQueries(o.inputElement.value, h);
          var x = {
            target: {
              value: f,
            },
          };
          o.executeOnChange(x, f, u, v);
        }),
        ae(ue(o), "handleSelect", function (s) {
          if (
            (o.setState({
              selectionStart: s.target.selectionStart,
              selectionEnd: s.target.selectionEnd,
            }),
            !Br)
          ) {
            var i = o.inputElement;
            s.target.selectionStart === s.target.selectionEnd
              ? o.updateMentionsQueries(i.value, s.target.selectionStart)
              : o.clearSuggestions(),
              o.updateHighlighterScroll(),
              o.props.onSelect(s);
          }
        }),
        ae(ue(o), "handleKeyDown", function (s) {
          var i = Hr(o.state.suggestions);
          if (i === 0 || !o.suggestionsElement) {
            o.props.onKeyDown(s);
            return;
          }
          switch (
            (Object.values(En).indexOf(s.keyCode) >= 0 &&
              (s.preventDefault(), s.stopPropagation()),
            s.keyCode)
          ) {
            case En.ESC: {
              o.clearSuggestions();
              return;
            }
            case En.DOWN: {
              o.shiftFocus(1);
              return;
            }
            case En.UP: {
              o.shiftFocus(-1);
              return;
            }
            case En.RETURN: {
              o.selectFocused();
              return;
            }
            case En.TAB: {
              o.selectFocused();
              return;
            }
            default:
              return;
          }
        }),
        ae(ue(o), "shiftFocus", function (s) {
          var i = Hr(o.state.suggestions);
          o.setState({
            focusIndex: (i + o.state.focusIndex + s) % i,
            scrollFocusedIntoView: !0,
          });
        }),
        ae(ue(o), "selectFocused", function () {
          var s = o.state,
            i = s.suggestions,
            a = s.focusIndex,
            l = Object.values(i).reduce(function (d, f) {
              var h = f.results,
                p = f.queryInfo;
              return [].concat(
                po(d),
                po(
                  h.map(function (g) {
                    return {
                      result: g,
                      queryInfo: p,
                    };
                  }),
                ),
              );
            }, [])[a],
            u = l.result,
            c = l.queryInfo;
          o.addMention(u, c),
            o.setState({
              focusIndex: 0,
            });
        }),
        ae(ue(o), "handleBlur", function (s) {
          var i = o._suggestionsMouseDown;
          (o._suggestionsMouseDown = !1),
            i ||
              o.setState({
                selectionStart: null,
                selectionEnd: null,
              }),
            window.setTimeout(function () {
              o.updateHighlighterScroll();
            }, 1),
            o.props.onBlur(s, i);
        }),
        ae(ue(o), "handleSuggestionsMouseDown", function (s) {
          o._suggestionsMouseDown = !0;
        }),
        ae(ue(o), "handleSuggestionsMouseEnter", function (s) {
          o.setState({
            focusIndex: s,
            scrollFocusedIntoView: !1,
          });
        }),
        ae(ue(o), "updateSuggestionsPosition", function () {
          var s = o.state.caretPosition,
            i = o.props,
            a = i.suggestionsPortalHost,
            l = i.allowSuggestionsAboveCursor,
            u = i.forceSuggestionsAboveCursor;
          if (!(!s || !o.suggestionsElement)) {
            var c = o.suggestionsElement,
              d = o.highlighterElement,
              f = d.getBoundingClientRect(),
              h = fs(d, "font-size"),
              p = {
                left: f.left + s.left,
                top: f.top + s.top + h,
              },
              g = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
              );
            if (c) {
              var m = {};
              if (a) {
                m.position = "fixed";
                var v = p.left,
                  x = p.top;
                (v -= fs(c, "margin-left")),
                  (x -= fs(c, "margin-top")),
                  (v -= d.scrollLeft),
                  (x -= d.scrollTop);
                var b = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                v + c.offsetWidth > b
                  ? (m.left = Math.max(0, b - c.offsetWidth))
                  : (m.left = v),
                  (l && x + c.offsetHeight > g && c.offsetHeight < x - h) || u
                    ? (m.top = Math.max(0, x - c.offsetHeight - h))
                    : (m.top = x);
              } else {
                var _ = s.left - d.scrollLeft,
                  C = s.top - d.scrollTop;
                _ + c.offsetWidth > o.containerElement.offsetWidth
                  ? (m.right = 0)
                  : (m.left = _),
                  (l &&
                    p.top - d.scrollTop + c.offsetHeight > g &&
                    c.offsetHeight < f.top - h - d.scrollTop) ||
                  u
                    ? (m.top = C - c.offsetHeight - h)
                    : (m.top = C);
              }
              (m.left === o.state.suggestionsPosition.left &&
                m.top === o.state.suggestionsPosition.top &&
                m.position === o.state.suggestionsPosition.position) ||
                o.setState({
                  suggestionsPosition: m,
                });
            }
          }
        }),
        ae(ue(o), "updateHighlighterScroll", function () {
          var s = o.inputElement,
            i = o.highlighterElement;
          !s ||
            !i ||
            ((i.scrollLeft = s.scrollLeft),
            (i.scrollTop = s.scrollTop),
            (i.height = s.height));
        }),
        ae(ue(o), "handleCompositionStart", function () {
          Br = !0;
        }),
        ae(ue(o), "handleCompositionEnd", function () {
          Br = !1;
        }),
        ae(ue(o), "setSelection", function (s, i) {
          if (!(s === null || i === null)) {
            var a = o.inputElement;
            if (a.setSelectionRange) a.setSelectionRange(s, i);
            else if (a.createTextRange) {
              var l = a.createTextRange();
              l.collapse(!0),
                l.moveEnd("character", i),
                l.moveStart("character", s),
                l.select();
            }
          }
        }),
        ae(ue(o), "updateMentionsQueries", function (s, i) {
          o._queryId++,
            (o.suggestions = {}),
            o.setState({
              suggestions: {},
            });
          var a = o.props.value || "",
            l = o.props.children,
            u = Ut(l),
            c = Be(a, u, i, "NULL");
          if (c !== null) {
            var d = wh(a.substring(0, c), u),
              f = s.substring(d, i);
            $.Children.forEach(l, function (h, p) {
              if (h) {
                var g = Uh(h.props.trigger, o.props),
                  m = f.match(g);
                if (m) {
                  var v = d + f.indexOf(m[1], m.index);
                  o.queryData(m[2], p, v, v + m[1].length, s);
                }
              }
            });
          }
        }),
        ae(ue(o), "clearSuggestions", function () {
          o._queryId++,
            (o.suggestions = {}),
            o.setState({
              suggestions: {},
              focusIndex: 0,
            });
        }),
        ae(ue(o), "queryData", function (s, i, a, l, u) {
          var c = o.props,
            d = c.children,
            f = c.ignoreAccents,
            h = On.toArray(d)[i],
            p = Yh(h.props.data, f),
            g = p(s, o.updateSuggestions.bind(null, o._queryId, i, s, a, l, u));
          g instanceof Array &&
            o.updateSuggestions(o._queryId, i, s, a, l, u, g);
        }),
        ae(ue(o), "updateSuggestions", function (s, i, a, l, u, c, d) {
          if (s === o._queryId) {
            o.suggestions = lt(
              lt({}, o.suggestions),
              {},
              ae({}, i, {
                queryInfo: {
                  childIndex: i,
                  query: a,
                  querySequenceStart: l,
                  querySequenceEnd: u,
                  plainTextValue: c,
                },
                results: d,
              }),
            );
            var f = o.state.focusIndex,
              h = Hr(o.suggestions);
            o.setState({
              suggestions: o.suggestions,
              focusIndex: f >= h ? Math.max(h - 1, 0) : f,
            });
          }
        }),
        ae(ue(o), "addMention", function (s, i) {
          var a = s.id,
            l = s.display,
            u = i.childIndex,
            c = i.querySequenceStart,
            d = i.querySequenceEnd,
            f = i.plainTextValue,
            h = o.props.value || "",
            p = Ut(o.props.children),
            g = On.toArray(o.props.children)[u],
            m = g.props,
            v = m.markup,
            x = m.displayTransform,
            b = m.appendSpaceOnAdd,
            _ = m.onAdd,
            C = Be(h, p, c, "START"),
            A = C + d - c,
            I = Th(v, a, l);
          b && (I += " ");
          var S = rr(h, C, A, I);
          o.inputElement.focus();
          var P = x(a, l);
          b && (P += " ");
          var k = c + P.length;
          o.setState({
            selectionStart: k,
            selectionEnd: k,
            setSelectionAfterMentionChange: !0,
          });
          var j = {
              target: {
                value: S,
              },
            },
            z = Qn(S, p),
            B = rr(f, c, d, P);
          o.executeOnChange(j, S, B, z),
            _ && _(a, l, C, A),
            o.clearSuggestions();
        }),
        ae(ue(o), "isLoading", function () {
          var s = !1;
          return (
            $.Children.forEach(o.props.children, function (i) {
              s = s || (i && i.props.isLoading);
            }),
            s
          );
        }),
        ae(ue(o), "isOpened", function () {
          return (
            Bs(o.state.selectionStart) &&
            (Hr(o.state.suggestions) !== 0 || o.isLoading())
          );
        }),
        ae(ue(o), "_queryId", 0),
        (o.suggestions = {}),
        (o.uuidSuggestionsOverlay = Math.random().toString(16).substring(2)),
        (o.handleCopy = o.handleCopy.bind(ue(o))),
        (o.handleCut = o.handleCut.bind(ue(o))),
        (o.handlePaste = o.handlePaste.bind(ue(o))),
        (o.state = {
          focusIndex: 0,
          selectionStart: null,
          selectionEnd: null,
          suggestions: {},
          caretPosition: null,
          suggestionsPosition: {},
          setSelectionAfterHandlePaste: !1,
        }),
        o
      );
    }
    return (
      $0(n, [
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
          value: function (o, s) {
            s.suggestionsPosition === this.state.suggestionsPosition &&
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
            return /* @__PURE__ */ $.createElement(
              "div",
              rt(
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
          value: function (o) {
            if (
              o.target === this.inputElement &&
              this.supportsClipboardActions(o)
            ) {
              o.preventDefault();
              var s = this.state,
                i = s.selectionStart,
                a = s.selectionEnd,
                l = this.props,
                u = l.value,
                c = l.children,
                d = Ut(c),
                f = Be(u, d, i, "START"),
                h = Be(u, d, a, "END"),
                p = o.clipboardData.getData("text/react-mentions"),
                g = o.clipboardData.getData("text/plain"),
                m = rr(u, f, h, p || g).replace(/\r/g, ""),
                v = sn(m, d),
                x = {
                  target: lt(
                    lt({}, o.target),
                    {},
                    {
                      value: m,
                    },
                  ),
                };
              this.executeOnChange(x, m, v, Qn(m, d));
              var b = $a(u, d, i),
                _ = (b || i) + sn(p || g, d).length;
              this.setState({
                selectionStart: _,
                selectionEnd: _,
                setSelectionAfterHandlePaste: !0,
              });
            }
          },
        },
        {
          key: "saveSelectionToClipboard",
          value: function (o) {
            var s = this.inputElement.selectionStart,
              i = this.inputElement.selectionEnd,
              a = this.props,
              l = a.children,
              u = a.value,
              c = Ut(l),
              d = Be(u, c, s, "START"),
              f = Be(u, c, i, "END");
            o.clipboardData.setData("text/plain", o.target.value.slice(s, i)),
              o.clipboardData.setData("text/react-mentions", u.slice(d, f));
          },
        },
        {
          key: "supportsClipboardActions",
          value: function (o) {
            return !!o.clipboardData;
          },
        },
        {
          key: "handleCopy",
          value: function (o) {
            o.target === this.inputElement &&
              this.supportsClipboardActions(o) &&
              (o.preventDefault(), this.saveSelectionToClipboard(o));
          },
        },
        {
          key: "handleCut",
          value: function (o) {
            if (
              o.target === this.inputElement &&
              this.supportsClipboardActions(o)
            ) {
              o.preventDefault(), this.saveSelectionToClipboard(o);
              var s = this.state,
                i = s.selectionStart,
                a = s.selectionEnd,
                l = this.props,
                u = l.children,
                c = l.value,
                d = Ut(u),
                f = Be(c, d, i, "START"),
                h = Be(c, d, a, "END"),
                p = [c.slice(0, f), c.slice(h)].join(""),
                g = sn(p, d),
                m = {
                  target: lt(
                    lt({}, o.target),
                    {},
                    {
                      value: g,
                    },
                  ),
                };
              this.executeOnChange(m, p, g, Qn(c, d));
            }
          },
          // Handle input element's change event
        },
      ]),
      n
    );
  })($.Component);
ae(Ai, "propTypes", Rl);
ae(Ai, "defaultProps", {
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
var fs = function (t, n) {
    var r = parseFloat(window.getComputedStyle(t, null).getPropertyValue(n));
    return isFinite(r) ? r : 0;
  },
  Zh = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  qh = $o(
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
        input: lt(
          {
            height: "100%",
            bottom: 0,
            overflow: "hidden",
            resize: "none",
          },
          Zh
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
  Xh = qh(Ai),
  Kh = {
    fontWeight: "inherit",
  },
  Di = function (t) {
    var n = t.display,
      r = t.style,
      o = t.className,
      s = t.classNames,
      i = Ni(Kh, {
        style: r,
        className: o,
        classNames: s,
      });
    return /* @__PURE__ */ $.createElement("strong", i, n);
  };
Di.propTypes = {
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
Di.defaultProps = {
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
const Gh = {
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
  Jh = ({
    value: e,
    setValue: t,
    users: n,
    placeholder: r = "Type your reply here...",
    onEnterKeypress: o,
  }) => {
    const s = n.map((u) => ({
        ...u,
        display: u.display_name,
      })),
      i = (u) => {
        u.stopPropagation(),
          u.key === "Enter" &&
            !u.shiftKey &&
            (u.preventDefault(), o == null || o());
      },
      a = (u, c) => {
        console.info("[MentionsInputComponent] on mention select", {
          id: u,
          display: c,
        });
      },
      l = (u) => {
        t(u.target.value);
      };
    return /* @__PURE__ */ y.jsx(Xh, {
      autoFocus: !0,
      value: e,
      onChange: l,
      style: {
        ...Gh,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: r,
      className: "mentions-input",
      onKeyDown: i,
      children: /* @__PURE__ */ y.jsx(Di, {
        displayTransform: (u, c) => `@${c}`,
        trigger: "@",
        markup: "@[__id__](__display__)",
        data: s,
        appendSpaceOnAdd: !0,
        renderSuggestion: (u, c) =>
          /* @__PURE__ */ y.jsx("div", {
            className: `user ${c ? "focused" : ""}`,
            children: u.display,
          }),
        onAdd: a,
      }),
    });
  },
  Qh = Jh,
  ep = ({
    comment: e,
    setComment: t,
    loading: n,
    users: r,
    currentUser: o,
    placeholder: s,
    onEnterKeypress: i,
  }) =>
    /* @__PURE__ */ y.jsxs("div", {
      className: jt.conversationInputForm,
      children: [
        o ? /* @__PURE__ */ y.jsx(ml, { user: o }) : null,
        /* @__PURE__ */ y.jsx(Qh, {
          value: e,
          setValue: t,
          users: r,
          placeholder: s,
          onEnterKeypress: i,
        }),
        /* @__PURE__ */ y.jsx(x1, {
          loading: n,
          color: "primary",
          children: /* @__PURE__ */ y.jsx(r0, {}),
        }),
      ],
    }),
  Ml = ep,
  tp = ({ meta: { highlight: e, filePath: t, field: n, column: r } }) => {
    if (!e) return null;
    const o = r ? `${t} (${r})` : t;
    return /* @__PURE__ */ y.jsx("div", {
      className: jt.highlightText,
      children: /* @__PURE__ */ y.jsx(w1, {
        code: e,
        language: n ? "markdown" : "sql",
        showLineNumbers: !n,
        fileName: o,
      }),
    });
  },
  Ll = tp,
  np = () => {
    const e = xe((c) => c.users),
      t = xe((c) => c.newConversation),
      n = xe((c) => (c.currentUserId ? c.users[c.currentUserId] : null)),
      r = xe((c) => c.shareId),
      o = ot(),
      [s, i] = de(!1),
      [a, l] = de(""),
      u = async (c) => {
        if (
          (c == null || c.stopPropagation(),
          c == null || c.preventDefault(),
          !(!t || !r))
        ) {
          i(!0);
          try {
            console.log("saving conversation", t, a);
            const d = await l0(
              r,
              {
                ...t,
                message: a,
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
          o(fl()), i(!1), o(_i(!0)), o(bi()), l("");
        }
      };
    return /* @__PURE__ */ y.jsx(br, {
      className: jt.newConversationForm,
      children: /* @__PURE__ */ y.jsx(wr, {
        children: /* @__PURE__ */ y.jsxs("form", {
          onSubmit: u,
          children: [
            /* @__PURE__ */ y.jsx("h4", { children: "Add comment" }),
            /* @__PURE__ */ y.jsx(Ll, {
              meta: (t == null ? void 0 : t.meta) || {},
            }),
            /* @__PURE__ */ y.jsx(Ml, {
              comment: a,
              setComment: l,
              loading: s,
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
  rp = np;
var kl = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(n1, function () {
    var n = 1e3,
      r = 6e4,
      o = 36e5,
      s = "millisecond",
      i = "second",
      a = "minute",
      l = "hour",
      u = "day",
      c = "week",
      d = "month",
      f = "quarter",
      h = "year",
      p = "date",
      g = "Invalid Date",
      m =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      v =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      x = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (E) {
          var N = ["th", "st", "nd", "rd"],
            w = E % 100;
          return "[" + E + (N[(w - 20) % 10] || N[w] || N[0]) + "]";
        },
      },
      b = function (E, N, w) {
        var O = String(E);
        return !O || O.length >= N
          ? E
          : "" + Array(N + 1 - O.length).join(w) + E;
      },
      _ = {
        s: b,
        z: function (E) {
          var N = -E.utcOffset(),
            w = Math.abs(N),
            O = Math.floor(w / 60),
            L = w % 60;
          return (N <= 0 ? "+" : "-") + b(O, 2, "0") + ":" + b(L, 2, "0");
        },
        m: function E(N, w) {
          if (N.date() < w.date()) return -E(w, N);
          var O = 12 * (w.year() - N.year()) + (w.month() - N.month()),
            L = N.clone().add(O, d),
            D = w - L < 0,
            T = N.clone().add(O + (D ? -1 : 1), d);
          return +(-(O + (w - L) / (D ? L - T : T - L)) || 0);
        },
        a: function (E) {
          return E < 0 ? Math.ceil(E) || 0 : Math.floor(E);
        },
        p: function (E) {
          return (
            { M: d, y: h, w: c, d: u, D: p, h: l, m: a, s: i, ms: s, Q: f }[
              E
            ] ||
            String(E || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (E) {
          return E === void 0;
        },
      },
      C = "en",
      A = {};
    A[C] = x;
    var I = "$isDayjsObject",
      S = function (E) {
        return E instanceof z || !(!E || !E[I]);
      },
      P = function E(N, w, O) {
        var L;
        if (!N) return C;
        if (typeof N == "string") {
          var D = N.toLowerCase();
          A[D] && (L = D), w && ((A[D] = w), (L = D));
          var T = N.split("-");
          if (!L && T.length > 1) return E(T[0]);
        } else {
          var R = N.name;
          (A[R] = N), (L = R);
        }
        return !O && L && (C = L), L || (!O && C);
      },
      k = function (E, N) {
        if (S(E)) return E.clone();
        var w = typeof N == "object" ? N : {};
        return (w.date = E), (w.args = arguments), new z(w);
      },
      j = _;
    (j.l = P),
      (j.i = S),
      (j.w = function (E, N) {
        return k(E, { locale: N.$L, utc: N.$u, x: N.$x, $offset: N.$offset });
      });
    var z = (function () {
        function E(w) {
          (this.$L = P(w.locale, null, !0)),
            this.parse(w),
            (this.$x = this.$x || w.x || {}),
            (this[I] = !0);
        }
        var N = E.prototype;
        return (
          (N.parse = function (w) {
            (this.$d = (function (O) {
              var L = O.date,
                D = O.utc;
              if (L === null) return /* @__PURE__ */ new Date(NaN);
              if (j.u(L)) return /* @__PURE__ */ new Date();
              if (L instanceof Date) return new Date(L);
              if (typeof L == "string" && !/Z$/i.test(L)) {
                var T = L.match(m);
                if (T) {
                  var R = T[2] - 1 || 0,
                    H = (T[7] || "0").substring(0, 3);
                  return D
                    ? new Date(
                        Date.UTC(
                          T[1],
                          R,
                          T[3] || 1,
                          T[4] || 0,
                          T[5] || 0,
                          T[6] || 0,
                          H,
                        ),
                      )
                    : new Date(
                        T[1],
                        R,
                        T[3] || 1,
                        T[4] || 0,
                        T[5] || 0,
                        T[6] || 0,
                        H,
                      );
                }
              }
              return new Date(L);
            })(w)),
              this.init();
          }),
          (N.init = function () {
            var w = this.$d;
            (this.$y = w.getFullYear()),
              (this.$M = w.getMonth()),
              (this.$D = w.getDate()),
              (this.$W = w.getDay()),
              (this.$H = w.getHours()),
              (this.$m = w.getMinutes()),
              (this.$s = w.getSeconds()),
              (this.$ms = w.getMilliseconds());
          }),
          (N.$utils = function () {
            return j;
          }),
          (N.isValid = function () {
            return this.$d.toString() !== g;
          }),
          (N.isSame = function (w, O) {
            var L = k(w);
            return this.startOf(O) <= L && L <= this.endOf(O);
          }),
          (N.isAfter = function (w, O) {
            return k(w) < this.startOf(O);
          }),
          (N.isBefore = function (w, O) {
            return this.endOf(O) < k(w);
          }),
          (N.$g = function (w, O, L) {
            return j.u(w) ? this[O] : this.set(L, w);
          }),
          (N.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (N.valueOf = function () {
            return this.$d.getTime();
          }),
          (N.startOf = function (w, O) {
            var L = this,
              D = !!j.u(O) || O,
              T = j.p(w),
              R = function (te, K) {
                var fe = j.w(
                  L.$u ? Date.UTC(L.$y, K, te) : new Date(L.$y, K, te),
                  L,
                );
                return D ? fe : fe.endOf(u);
              },
              H = function (te, K) {
                return j.w(
                  L.toDate()[te].apply(
                    L.toDate("s"),
                    (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(K),
                  ),
                  L,
                );
              },
              V = this.$W,
              W = this.$M,
              Y = this.$D,
              Z = "set" + (this.$u ? "UTC" : "");
            switch (T) {
              case h:
                return D ? R(1, 0) : R(31, 11);
              case d:
                return D ? R(1, W) : R(0, W + 1);
              case c:
                var X = this.$locale().weekStart || 0,
                  Q = (V < X ? V + 7 : V) - X;
                return R(D ? Y - Q : Y + (6 - Q), W);
              case u:
              case p:
                return H(Z + "Hours", 0);
              case l:
                return H(Z + "Minutes", 1);
              case a:
                return H(Z + "Seconds", 2);
              case i:
                return H(Z + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (N.endOf = function (w) {
            return this.startOf(w, !1);
          }),
          (N.$set = function (w, O) {
            var L,
              D = j.p(w),
              T = "set" + (this.$u ? "UTC" : ""),
              R = ((L = {}),
              (L[u] = T + "Date"),
              (L[p] = T + "Date"),
              (L[d] = T + "Month"),
              (L[h] = T + "FullYear"),
              (L[l] = T + "Hours"),
              (L[a] = T + "Minutes"),
              (L[i] = T + "Seconds"),
              (L[s] = T + "Milliseconds"),
              L)[D],
              H = D === u ? this.$D + (O - this.$W) : O;
            if (D === d || D === h) {
              var V = this.clone().set(p, 1);
              V.$d[R](H),
                V.init(),
                (this.$d = V.set(p, Math.min(this.$D, V.daysInMonth())).$d);
            } else R && this.$d[R](H);
            return this.init(), this;
          }),
          (N.set = function (w, O) {
            return this.clone().$set(w, O);
          }),
          (N.get = function (w) {
            return this[j.p(w)]();
          }),
          (N.add = function (w, O) {
            var L,
              D = this;
            w = Number(w);
            var T = j.p(O),
              R = function (W) {
                var Y = k(D);
                return j.w(Y.date(Y.date() + Math.round(W * w)), D);
              };
            if (T === d) return this.set(d, this.$M + w);
            if (T === h) return this.set(h, this.$y + w);
            if (T === u) return R(1);
            if (T === c) return R(7);
            var H = ((L = {}), (L[a] = r), (L[l] = o), (L[i] = n), L)[T] || 1,
              V = this.$d.getTime() + w * H;
            return j.w(V, this);
          }),
          (N.subtract = function (w, O) {
            return this.add(-1 * w, O);
          }),
          (N.format = function (w) {
            var O = this,
              L = this.$locale();
            if (!this.isValid()) return L.invalidDate || g;
            var D = w || "YYYY-MM-DDTHH:mm:ssZ",
              T = j.z(this),
              R = this.$H,
              H = this.$m,
              V = this.$M,
              W = L.weekdays,
              Y = L.months,
              Z = L.meridiem,
              X = function (K, fe, q, ve) {
                return (K && (K[fe] || K(O, D))) || q[fe].slice(0, ve);
              },
              Q = function (K) {
                return j.s(R % 12 || 12, K, "0");
              },
              te =
                Z ||
                function (K, fe, q) {
                  var ve = K < 12 ? "AM" : "PM";
                  return q ? ve.toLowerCase() : ve;
                };
            return D.replace(v, function (K, fe) {
              return (
                fe ||
                (function (q) {
                  switch (q) {
                    case "YY":
                      return String(O.$y).slice(-2);
                    case "YYYY":
                      return j.s(O.$y, 4, "0");
                    case "M":
                      return V + 1;
                    case "MM":
                      return j.s(V + 1, 2, "0");
                    case "MMM":
                      return X(L.monthsShort, V, Y, 3);
                    case "MMMM":
                      return X(Y, V);
                    case "D":
                      return O.$D;
                    case "DD":
                      return j.s(O.$D, 2, "0");
                    case "d":
                      return String(O.$W);
                    case "dd":
                      return X(L.weekdaysMin, O.$W, W, 2);
                    case "ddd":
                      return X(L.weekdaysShort, O.$W, W, 3);
                    case "dddd":
                      return W[O.$W];
                    case "H":
                      return String(R);
                    case "HH":
                      return j.s(R, 2, "0");
                    case "h":
                      return Q(1);
                    case "hh":
                      return Q(2);
                    case "a":
                      return te(R, H, !0);
                    case "A":
                      return te(R, H, !1);
                    case "m":
                      return String(H);
                    case "mm":
                      return j.s(H, 2, "0");
                    case "s":
                      return String(O.$s);
                    case "ss":
                      return j.s(O.$s, 2, "0");
                    case "SSS":
                      return j.s(O.$ms, 3, "0");
                    case "Z":
                      return T;
                  }
                  return null;
                })(K) ||
                T.replace(":", "")
              );
            });
          }),
          (N.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (N.diff = function (w, O, L) {
            var D,
              T = this,
              R = j.p(O),
              H = k(w),
              V = (H.utcOffset() - this.utcOffset()) * r,
              W = this - H,
              Y = function () {
                return j.m(T, H);
              };
            switch (R) {
              case h:
                D = Y() / 12;
                break;
              case d:
                D = Y();
                break;
              case f:
                D = Y() / 3;
                break;
              case c:
                D = (W - V) / 6048e5;
                break;
              case u:
                D = (W - V) / 864e5;
                break;
              case l:
                D = W / o;
                break;
              case a:
                D = W / r;
                break;
              case i:
                D = W / n;
                break;
              default:
                D = W;
            }
            return L ? D : j.a(D);
          }),
          (N.daysInMonth = function () {
            return this.endOf(d).$D;
          }),
          (N.$locale = function () {
            return A[this.$L];
          }),
          (N.locale = function (w, O) {
            if (!w) return this.$L;
            var L = this.clone(),
              D = P(w, O, !0);
            return D && (L.$L = D), L;
          }),
          (N.clone = function () {
            return j.w(this.$d, this);
          }),
          (N.toDate = function () {
            return new Date(this.valueOf());
          }),
          (N.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (N.toISOString = function () {
            return this.$d.toISOString();
          }),
          (N.toString = function () {
            return this.$d.toUTCString();
          }),
          E
        );
      })(),
      B = z.prototype;
    return (
      (k.prototype = B),
      [
        ["$ms", s],
        ["$s", i],
        ["$m", a],
        ["$H", l],
        ["$W", u],
        ["$M", d],
        ["$y", h],
        ["$D", p],
      ].forEach(function (E) {
        B[E[1]] = function (N) {
          return this.$g(N, E[0], E[1]);
        };
      }),
      (k.extend = function (E, N) {
        return E.$i || (E(N, z, k), (E.$i = !0)), k;
      }),
      (k.locale = P),
      (k.isDayjs = S),
      (k.unix = function (E) {
        return k(1e3 * E);
      }),
      (k.en = A[C]),
      (k.Ls = A),
      (k.p = {}),
      k
    );
  });
})(kl);
var op = kl.exports;
const sp = /* @__PURE__ */ zn(op),
  ip = ({ conversationGroupId: e, shareId: t }) => {
    const { onResolve: n, source: r } = lr(),
      [o, s] = de(!1),
      i = async () => {
        e && (s(!0), await h0(t, e, r), n(), s(!1));
      };
    return e
      ? /* @__PURE__ */ y.jsx(di, {
          disabled: o,
          className: jt.resolveButton,
          title: "Resolve conversation",
          onClick: i,
          children: /* @__PURE__ */ y.jsx(Qf, {}),
        })
      : null;
  },
  ap = ip,
  cp = ({
    user: e,
    timestamp: t,
    showResolveButton: n,
    conversationGroupId: r,
    shareId: o,
  }) =>
    /* @__PURE__ */ y.jsxs(qc, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ y.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ y.jsx(ml, { user: e }),
            /* @__PURE__ */ y.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ y.jsx("span", {
              children: sp(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        n
          ? /* @__PURE__ */ y.jsx(ap, {
              conversationGroupId: r,
              shareId: o,
            })
          : null,
      ],
    }),
  Pl = cp,
  lp = ({ conversation: e, shareId: t }) => {
    const { users: n } = lr(),
      r = Ie(() => {
        if (e != null && e.user_id) return n[e.user_id];
      }, [e.user_id, n]);
    return /* @__PURE__ */ y.jsxs(br, {
      children: [
        /* @__PURE__ */ y.jsx(Pl, {
          user: r,
          timestamp: e.timestamp,
          shareId: t,
        }),
        /* @__PURE__ */ y.jsx(wr, {
          children: /* @__PURE__ */ y.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
          }),
        }),
      ],
    });
  },
  up = lp,
  dp = ({ conversationGroupId: e, shareId: t }) => {
    const { currentUser: n, users: r, onReplyAdd: o, source: s } = lr(),
      i = Object.values(r),
      [a, l] = de(""),
      [u, c] = de(!1),
      d = async (f) => {
        if (
          (f == null || f.stopPropagation(),
          f == null || f.preventDefault(),
          !(!t || !e))
        ) {
          c(!0),
            console.log("saving reply", t, e, {
              message: a,
            });
          try {
            await u0(
              t,
              e,
              {
                message: a,
              },
              s,
            ),
              o();
          } catch (h) {
            console.error("error while saving reply", h);
          }
          c(!1), l("");
        }
      };
    return /* @__PURE__ */ y.jsx("div", {
      className: jt.replyForm,
      children: /* @__PURE__ */ y.jsx("form", {
        onSubmit: d,
        className: "",
        children: /* @__PURE__ */ y.jsx(Ml, {
          comment: a,
          setComment: l,
          loading: u,
          users: Object.values(i),
          currentUser: n || null,
          onEnterKeypress: d,
        }),
      }),
    });
  },
  fp = dp,
  hp = ({ conversationGroup: e, shareId: t, onSelect: n }) => {
    var f;
    const { users: r } = lr(),
      o = Ie(() => {
        if (e.owner) return r[e.owner];
      }, [e.owner, r]),
      { isSelected: s } = lr(),
      [i, a] = de(!1),
      l = ge(
        (h) => {
          !s ||
            !h ||
            (console.log(
              "ConversationGroupComponent scrolling",
              e.conversation_group_id,
            ),
            setTimeout(() => {
              h.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }, 1e3));
        },
        [e.conversation_group_id, s],
      );
    if (
      !((f = e == null ? void 0 : e.conversations) != null && f.length) ||
      (e == null ? void 0 : e.status) !== "Pending"
    )
      return null;
    const [u, ...c] = e.conversations,
      d = c.length
        ? c.length > 1
          ? `${c.length} replies`
          : `${c.length} reply`
        : "Reply";
    return /* @__PURE__ */ y.jsx("div", {
      ref: l,
      className: jt.conversationGroup,
      children: /* @__PURE__ */ y.jsxs(br, {
        className: `${s ? "active" : ""}`,
        onClick: n,
        children: [
          /* @__PURE__ */ y.jsx(Pl, {
            user: o,
            timestamp: u.timestamp,
            showResolveButton: !0,
            conversationGroupId: e.conversation_group_id,
            shareId: t,
          }),
          /* @__PURE__ */ y.jsxs(wr, {
            children: [
              /* @__PURE__ */ y.jsx(Ll, { meta: e.meta }),
              /* @__PURE__ */ y.jsx("p", {
                children: u.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
              }),
              /* @__PURE__ */ y.jsx(Ue, {
                onClick: () => a((h) => !h),
                color: "link",
                children: d,
              }),
              c.length
                ? /* @__PURE__ */ y.jsx(y.Fragment, {
                    children: i
                      ? /* @__PURE__ */ y.jsx(y.Fragment, {
                          children: c.map((h) =>
                            /* @__PURE__ */ y.jsx(
                              up,
                              {
                                conversation: h,
                                shareId: t,
                              },
                              h.conversation_id,
                            ),
                          ),
                        })
                      : null,
                  })
                : null,
              i
                ? /* @__PURE__ */ y.jsx(fp, {
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
  pp = hp,
  jl = pt({
    users: {},
    conversationGroup: void 0,
    currentUser: void 0,
    isSelected: !1,
    shareId: void 0,
    onSelect: () => null,
    onResolve: () => null,
    onReplyAdd: () => null,
    source: fi.DBT_DOCS,
  }),
  gp = ({
    currentUser: e,
    conversationGroup: t,
    shareId: n,
    onSelect: r,
    isSelected: o,
    users: s,
    onResolve: i,
    onReplyAdd: a,
    source: l,
  }) => {
    const u = Ie(
      () => ({
        currentUser: e,
        conversationGroup: t,
        shareId: n,
        onSelect: r,
        isSelected: o,
        users: s,
        onResolve: i,
        onReplyAdd: a,
        source: l,
      }),
      [e, t, n, r, o, s, i, a, l],
    );
    return !t || !n
      ? null
      : /* @__PURE__ */ y.jsx(jl.Provider, {
          value: u,
          children: /* @__PURE__ */ y.jsx(pp, {
            conversationGroup: t,
            shareId: n,
            onSelect: r,
          }),
        });
  },
  mp = gp,
  lr = () => Ze(jl),
  yp = () => {
    const e = xe((d) => d.source),
      t = xe((d) => d.conversations),
      n = xe((d) => d.selectedConversationId),
      r = xe((d) => d.shareId),
      o = xe((d) => d.users),
      s = xe((d) => d.currentUserId),
      i = ot();
    if (!s || !r) return null;
    const a = o[s],
      l = (d) => {
        i(Df({ shareId: r, conversationGroupId: d }));
      },
      u = (d) => {
        i(xi(d));
      },
      c = (d) => {
        console.log("onReplyAdd", d), i(fl());
      };
    return !t || !Object.keys(t).length
      ? /* @__PURE__ */ y.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ y.jsx("div", {
          children: Object.values(t).map((d) =>
            /* @__PURE__ */ y.jsx(
              mp,
              {
                conversationGroup: d,
                shareId: r,
                isSelected: n === d.conversation_group_id,
                currentUser: a,
                onResolve: () => l(d.conversation_group_id),
                onSelect: () => u(d.conversation_group_id),
                users: o,
                onReplyAdd: () => c(d.conversation_group_id),
                source: e,
              },
              d.conversation_group_id,
            ),
          ),
        });
  },
  vp = yp,
  Ep = () => {
    const e = xe((i) => i.isRightPanelOpen),
      t = xe((i) => i.selectedConversationId),
      n = xe((i) => i.newConversation),
      r = ot(),
      o = () => {
        r(_i(!1)), r(xi(void 0)), r(bi());
      };
    return !!n || e || t
      ? /* @__PURE__ */ y.jsxs(y.Fragment, {
          children: [
            /* @__PURE__ */ y.jsx(Jd, {
              onClick: o,
              className: jt.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ y.jsxs("div", {
              className: jt.conversationRightPanel,
              children: [
                /* @__PURE__ */ y.jsx("h3", { children: "Comments" }),
                n
                  ? /* @__PURE__ */ y.jsx(rp, {})
                  : /* @__PURE__ */ y.jsx(vp, {}),
              ],
            }),
          ],
        })
      : null;
  },
  Cp = Ep,
  xp = 10,
  _p = () => {
    const e = se(),
      t = xe((i) => i.shareId),
      n = xe((i) => i.conversationsLoadingState),
      r = ot(),
      o = xe((i) => Object.keys(i.conversations || {})),
      s = ge(
        (i) => {
          clearTimeout(e.current),
            d0(i)
              .then((a) => {
                console.log("useConversations", a),
                  r(Af(a == null ? void 0 : a.dbt_docs_share_conversations)),
                  (e.current = setTimeout(() => {
                    s(i);
                  }, xp * 1e3));
              })
              .catch((a) =>
                console.error("error while fetching conversations list", a),
              )
              .finally(() => {
                r(Ca(et.INITIALIZED));
              });
        },
        [r],
      );
    return (
      ie(() => {
        n !== et.UNINITIALIZED || !t || (r(Ca(et.LOADING)), s(t));
      }, [r, n, o, t, s]),
      { isLoading: n === et.LOADING }
    );
  },
  bp = () => {
    const e = ot(),
      t = xe((o) => Object.keys(o.users || {})),
      [n, r] = de(et.UNINITIALIZED);
    return (
      ie(() => {
        n !== et.UNINITIALIZED ||
          Object.keys(t).length ||
          (r(et.LOADING),
          f0()
            .then((o) => {
              console.log("useConversationUsers", o), e(Tf(o));
            })
            .catch((o) => console.error("error while fetching users list", o))
            .finally(() => {
              r(et.INITIALIZED);
            }));
      }, [e, n, t]),
      { isLoading: n === et.LOADING }
    );
  },
  wp = () => (
    bp(),
    _p(),
    /* @__PURE__ */ y.jsxs("div", {
      children: [/* @__PURE__ */ y.jsx(Cp, {}), /* @__PURE__ */ y.jsx(E0, {})],
    })
  ),
  Sp = wp,
  Np = ({ target: e, ...t }) =>
    pn(
      /* @__PURE__ */ y.jsx(di, {
        className: jt.hotspotButton,
        title: "Click to start conversation",
        ...t,
        children: /* @__PURE__ */ y.jsx(gl, {}),
      }),
      e,
    ),
  $l = Np,
  Tp = () => {
    var l;
    const e = ot(),
      t = xe((u) => u.codeblockLoaded),
      n = xe((u) => u.manifest),
      [r, o] = de(0),
      s = (l = pi()) == null ? void 0 : l.parentElement,
      i = () => {
        var f;
        if (!s || !n.nodes) return;
        const u = gi();
        if (!u || u.length < 3) {
          console.error("Unable to find model parts", u);
          return;
        }
        const d = {
          highlight: ((f = n.nodes[u[2]]) == null ? void 0 : f.raw_code).split(`
`)[r],
          range: {
            end: { line: r, character: 0 },
            start: { line: r, character: 0 },
          },
        };
        e(wi({ meta: d }));
      },
      a = ge(
        (u) => {
          if (!s) return;
          const c = u.y,
            d = s.querySelectorAll(".line-numbers-rows > span"),
            f = Array.from(d).findIndex((h) => {
              const { height: p, y: g } = h.getBoundingClientRect();
              return c >= g && c <= g + p;
            });
          o(f);
        },
        [s],
      );
    return (
      ie(() => {
        if (!(!t || !s))
          return (
            s.addEventListener("mousemove", a),
            () => {
              s.removeEventListener("mousemove", a);
            }
          );
      }, [t, s, a]),
      !t || !s
        ? null
        : /* @__PURE__ */ y.jsx($l, {
            target: s,
            onClick: i,
            style: { top: r * 21.2 },
          })
    );
  },
  Ap = Tp,
  Dp = () => {
    const e = ot(),
      t = xe((o) => o.codeblockLoaded),
      n = mi(),
      r = () => {
        const o = {
          field: "description",
          highlight: n == null ? void 0 : n.innerText,
        };
        e(wi({ meta: o }));
      };
    return !t || !n
      ? null
      : /* @__PURE__ */ y.jsx($l, { target: n, onClick: r });
  },
  Ip = Dp,
  Op = () =>
    /* @__PURE__ */ y.jsxs(y.Fragment, {
      children: [/* @__PURE__ */ y.jsx(Ip, {}), /* @__PURE__ */ y.jsx(Ap, {})],
    }),
  Rp = Op,
  Mp = qd(() => import("./DbtDocsRenderer.js")),
  Lp = () => {
    const { loading: e, shareDetails: t } = p0(),
      n = ot(),
      { getHighlightedSelectionData: r, pos: o, onSelectionEnd: s } = g0(),
      i = (a) => {
        a.stopPropagation();
        const l = r();
        l && n(wi(l));
      };
    return e
      ? /* @__PURE__ */ y.jsx("div", { children: "Loading..." })
      : !(t != null && t.catalog_presigned_url) ||
          !(t != null && t.manifest_presigned_url)
        ? /* @__PURE__ */ y.jsx("div", {
            children: "Unable to load required artifacts. Please try again.",
          })
        : /* @__PURE__ */ y.jsxs("div", {
            children: [
              /* @__PURE__ */ y.jsxs("div", {
                className: "d-flex justify-content-end mb-2",
                children: [
                  /* @__PURE__ */ y.jsx(Rp, {}),
                  /* @__PURE__ */ y.jsx(a0, {}),
                ],
              }),
              /* @__PURE__ */ y.jsx(Sp, {}),
              /* @__PURE__ */ y.jsx(Mp, {
                shareDetails: t,
                onSelectionEnd: s,
              }),
              o ? /* @__PURE__ */ y.jsx(s0, { pos: o, onAddComment: i }) : null,
            ],
          });
  },
  kp = Lp,
  Pp = ({ shareId: e, userId: t, conversationGroupId: n, source: r }) =>
    /* @__PURE__ */ y.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ y.jsx(Rf, {
        shareId: e,
        userId: t,
        conversationGroupId: n,
        source: r,
        children: /* @__PURE__ */ y.jsx(kp, {}),
      }),
    }),
  C9 = Pp,
  jp = {
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
  yo = dl({
    name: "lineageState",
    initialState: jp,
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
          r = {
            ...e.collectColumns,
          };
        for (const o in n) {
          const s = n[o];
          if (!(o in r)) {
            r[o] = s;
            continue;
          }
          const i = s
            .map((a) => {
              const l = r[o].findIndex((u) => u.column === a.column);
              return l === -1
                ? a
                : (a.lensType && (r[o][l].lensType = a.lensType), null);
            })
            .filter((a) => a !== null);
          r[o].push(...i);
        }
        e.collectColumns = r;
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
    setSelectedTable: vo,
    setMoreTables: Ii,
    mergeSeeMoreTables: Fl,
    setSidebarScreen: _t,
    setSelectedColumn: an,
    setCollectColumns: Eo,
    mergeCollectColumns: Hl,
    setConfidence: $p,
    updateConfidenceWithOperatorList: Bl,
    setLeftExpansion: hs,
    setRightExpansion: ps,
    setMinRange: ur,
    setNodeCount: kn,
    setSelectCheck: zl,
    setNonSelectCheck: Vl,
    setDefaultExpansion: Wl,
    setAiEnabled: Fp,
  } = yo.actions;
function ze(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, r; n < e.length; n++)
      (r = ze(e[n])) !== "" && (t += (t && " ") + r);
  else for (let n in e) e[n] && (t += (t && " ") + n);
  return t;
}
var zs = { exports: {} },
  gs = {},
  zr = { exports: {} },
  ms = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Va;
function Hp() {
  if (Va) return ms;
  Va = 1;
  var e = $;
  function t(d, f) {
    return (d === f && (d !== 0 || 1 / d === 1 / f)) || (d !== d && f !== f);
  }
  var n = typeof Object.is == "function" ? Object.is : t,
    r = e.useState,
    o = e.useEffect,
    s = e.useLayoutEffect,
    i = e.useDebugValue;
  function a(d, f) {
    var h = f(),
      p = r({ inst: { value: h, getSnapshot: f } }),
      g = p[0].inst,
      m = p[1];
    return (
      s(
        function () {
          (g.value = h), (g.getSnapshot = f), l(g) && m({ inst: g });
        },
        [d, h, f],
      ),
      o(
        function () {
          return (
            l(g) && m({ inst: g }),
            d(function () {
              l(g) && m({ inst: g });
            })
          );
        },
        [d],
      ),
      i(h),
      h
    );
  }
  function l(d) {
    var f = d.getSnapshot;
    d = d.value;
    try {
      var h = f();
      return !n(d, h);
    } catch {
      return !0;
    }
  }
  function u(d, f) {
    return f();
  }
  var c =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? u
      : a;
  return (
    (ms.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c),
    ms
  );
}
var ys = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wa;
function Bp() {
  return (
    Wa ||
      ((Wa = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
              "function" &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
              new Error(),
            );
          var e = $,
            t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function n(b) {
            {
              for (
                var _ = arguments.length,
                  C = new Array(_ > 1 ? _ - 1 : 0),
                  A = 1;
                A < _;
                A++
              )
                C[A - 1] = arguments[A];
              r("error", b, C);
            }
          }
          function r(b, _, C) {
            {
              var A = t.ReactDebugCurrentFrame,
                I = A.getStackAddendum();
              I !== "" && ((_ += "%s"), (C = C.concat([I])));
              var S = C.map(function (P) {
                return String(P);
              });
              S.unshift("Warning: " + _),
                Function.prototype.apply.call(console[b], console, S);
            }
          }
          function o(b, _) {
            return (
              (b === _ && (b !== 0 || 1 / b === 1 / _)) || (b !== b && _ !== _)
            );
          }
          var s = typeof Object.is == "function" ? Object.is : o,
            i = e.useState,
            a = e.useEffect,
            l = e.useLayoutEffect,
            u = e.useDebugValue,
            c = !1,
            d = !1;
          function f(b, _, C) {
            c ||
              (e.startTransition !== void 0 &&
                ((c = !0),
                n(
                  "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.",
                )));
            var A = _();
            if (!d) {
              var I = _();
              s(A, I) ||
                (n(
                  "The result of getSnapshot should be cached to avoid an infinite loop",
                ),
                (d = !0));
            }
            var S = i({
                inst: {
                  value: A,
                  getSnapshot: _,
                },
              }),
              P = S[0].inst,
              k = S[1];
            return (
              l(
                function () {
                  (P.value = A),
                    (P.getSnapshot = _),
                    h(P) &&
                      k({
                        inst: P,
                      });
                },
                [b, A, _],
              ),
              a(
                function () {
                  h(P) &&
                    k({
                      inst: P,
                    });
                  var j = function () {
                    h(P) &&
                      k({
                        inst: P,
                      });
                  };
                  return b(j);
                },
                [b],
              ),
              u(A),
              A
            );
          }
          function h(b) {
            var _ = b.getSnapshot,
              C = b.value;
            try {
              var A = _();
              return !s(C, A);
            } catch {
              return !0;
            }
          }
          function p(b, _, C) {
            return _();
          }
          var g =
              typeof window < "u" &&
              typeof window.document < "u" &&
              typeof window.document.createElement < "u",
            m = !g,
            v = m ? p : f,
            x = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : v;
          (ys.useSyncExternalStore = x),
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                new Error(),
              );
        })()),
    ys
  );
}
var Ua;
function Ul() {
  return (
    Ua ||
      ((Ua = 1),
      process.env.NODE_ENV === "production"
        ? (zr.exports = Hp())
        : (zr.exports = Bp())),
    zr.exports
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
var Ya;
function zp() {
  if (Ya) return gs;
  Ya = 1;
  var e = $,
    t = Ul();
  function n(u, c) {
    return (u === c && (u !== 0 || 1 / u === 1 / c)) || (u !== u && c !== c);
  }
  var r = typeof Object.is == "function" ? Object.is : n,
    o = t.useSyncExternalStore,
    s = e.useRef,
    i = e.useEffect,
    a = e.useMemo,
    l = e.useDebugValue;
  return (
    (gs.useSyncExternalStoreWithSelector = function (u, c, d, f, h) {
      var p = s(null);
      if (p.current === null) {
        var g = { hasValue: !1, value: null };
        p.current = g;
      } else g = p.current;
      p = a(
        function () {
          function v(A) {
            if (!x) {
              if (((x = !0), (b = A), (A = f(A)), h !== void 0 && g.hasValue)) {
                var I = g.value;
                if (h(I, A)) return (_ = I);
              }
              return (_ = A);
            }
            if (((I = _), r(b, A))) return I;
            var S = f(A);
            return h !== void 0 && h(I, S) ? I : ((b = A), (_ = S));
          }
          var x = !1,
            b,
            _,
            C = d === void 0 ? null : d;
          return [
            function () {
              return v(c());
            },
            C === null
              ? void 0
              : function () {
                  return v(C());
                },
          ];
        },
        [c, d, f, h],
      );
      var m = o(u, p[0], p[1]);
      return (
        i(
          function () {
            (g.hasValue = !0), (g.value = m);
          },
          [m],
        ),
        l(m),
        m
      );
    }),
    gs
  );
}
var vs = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Za;
function Vp() {
  return (
    Za ||
      ((Za = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
              "function" &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
              new Error(),
            );
          var e = $,
            t = Ul();
          function n(c, d) {
            return (
              (c === d && (c !== 0 || 1 / c === 1 / d)) || (c !== c && d !== d)
            );
          }
          var r = typeof Object.is == "function" ? Object.is : n,
            o = t.useSyncExternalStore,
            s = e.useRef,
            i = e.useEffect,
            a = e.useMemo,
            l = e.useDebugValue;
          function u(c, d, f, h, p) {
            var g = s(null),
              m;
            g.current === null
              ? ((m = {
                  hasValue: !1,
                  value: null,
                }),
                (g.current = m))
              : (m = g.current);
            var v = a(
                function () {
                  var C = !1,
                    A,
                    I,
                    S = function (z) {
                      if (!C) {
                        (C = !0), (A = z);
                        var B = h(z);
                        if (p !== void 0 && m.hasValue) {
                          var E = m.value;
                          if (p(E, B)) return (I = E), E;
                        }
                        return (I = B), B;
                      }
                      var N = A,
                        w = I;
                      if (r(N, z)) return w;
                      var O = h(z);
                      return p !== void 0 && p(w, O)
                        ? w
                        : ((A = z), (I = O), O);
                    },
                    P = f === void 0 ? null : f,
                    k = function () {
                      return S(d());
                    },
                    j =
                      P === null
                        ? void 0
                        : function () {
                            return S(P());
                          };
                  return [k, j];
                },
                [d, f, h, p],
              ),
              x = v[0],
              b = v[1],
              _ = o(c, x, b);
            return (
              i(
                function () {
                  (m.hasValue = !0), (m.value = _);
                },
                [_],
              ),
              l(_),
              _
            );
          }
          (vs.useSyncExternalStoreWithSelector = u),
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                new Error(),
              );
        })()),
    vs
  );
}
process.env.NODE_ENV === "production"
  ? (zs.exports = zp())
  : (zs.exports = Vp());
var Wp = zs.exports;
const Up = /* @__PURE__ */ zn(Wp);
var Yp = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const qa = (e) => {
    let t;
    const n = /* @__PURE__ */ new Set(),
      r = (c, d) => {
        const f = typeof c == "function" ? c(t) : c;
        if (!Object.is(f, t)) {
          const h = t;
          (t =
            d ?? (typeof f != "object" || f === null)
              ? f
              : Object.assign({}, t, f)),
            n.forEach((p) => p(t, h));
        }
      },
      o = () => t,
      l = {
        setState: r,
        getState: o,
        getInitialState: () => u,
        subscribe: (c) => (n.add(c), () => n.delete(c)),
        destroy: () => {
          (Yp ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            n.clear();
        },
      },
      u = (t = e(r, o, l));
    return l;
  },
  Zp = (e) => (e ? qa(e) : qa),
  { useDebugValue: qp } = $,
  { useSyncExternalStoreWithSelector: Xp } = Up,
  Kp = (e) => e;
function Yl(e, t = Kp, n) {
  const r = Xp(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n,
  );
  return qp(r), r;
}
const Xa = (e, t) => {
    const n = Zp(e),
      r = (o, s = t) => Yl(n, o, s);
    return Object.assign(r, n), r;
  },
  Gp = (e, t) => (e ? Xa(e, t) : Xa);
function $e(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [r, o] of e) if (!Object.is(o, t.get(r))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const r of e) if (!t.has(r)) return !1;
    return !0;
  }
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !1;
  for (const r of n)
    if (!Object.prototype.hasOwnProperty.call(t, r) || !Object.is(e[r], t[r]))
      return !1;
  return !0;
}
var Jp = { value: () => {} };
function Fo() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new oo(n);
}
function oo(e) {
  this._ = e;
}
function Qp(e, t) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var r = "",
        o = n.indexOf(".");
      if (
        (o >= 0 && ((r = n.slice(o + 1)), (n = n.slice(0, o))),
        n && !t.hasOwnProperty(n))
      )
        throw new Error("unknown type: " + n);
      return { type: n, name: r };
    });
}
oo.prototype = Fo.prototype = {
  constructor: oo,
  on: function (e, t) {
    var n = this._,
      r = Qp(e + "", n),
      o,
      s = -1,
      i = r.length;
    if (arguments.length < 2) {
      for (; ++s < i; )
        if ((o = (e = r[s]).type) && (o = e2(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++s < i; )
      if ((o = (e = r[s]).type)) n[o] = Ka(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = Ka(n[o], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new oo(e);
  },
  call: function (e, t) {
    if ((o = arguments.length - 2) > 0)
      for (var n = new Array(o), r = 0, o, s; r < o; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (s = this._[e], r = 0, o = s.length; r < o; ++r) s[r].value.apply(t, n);
  },
  apply: function (e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], o = 0, s = r.length; o < s; ++o)
      r[o].value.apply(t, n);
  },
};
function e2(e, t) {
  for (var n = 0, r = e.length, o; n < r; ++n)
    if ((o = e[n]).name === t) return o.value;
}
function Ka(e, t, n) {
  for (var r = 0, o = e.length; r < o; ++r)
    if (e[r].name === t) {
      (e[r] = Jp), (e = e.slice(0, r).concat(e.slice(r + 1)));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Vs = "http://www.w3.org/1999/xhtml";
const Ga = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Vs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Ho(e) {
  var t = (e += ""),
    n = t.indexOf(":");
  return (
    n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)),
    Ga.hasOwnProperty(t) ? { space: Ga[t], local: e } : e
  );
}
function t2(e) {
  return function () {
    var t = this.ownerDocument,
      n = this.namespaceURI;
    return n === Vs && t.documentElement.namespaceURI === Vs
      ? t.createElement(e)
      : t.createElementNS(n, e);
  };
}
function n2(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Zl(e) {
  var t = Ho(e);
  return (t.local ? n2 : t2)(t);
}
function r2() {}
function Oi(e) {
  return e == null
    ? r2
    : function () {
        return this.querySelector(e);
      };
}
function o2(e) {
  typeof e != "function" && (e = Oi(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (
      var s = t[o], i = s.length, a = (r[o] = new Array(i)), l, u, c = 0;
      c < i;
      ++c
    )
      (l = s[c]) &&
        (u = e.call(l, l.__data__, c, s)) &&
        ("__data__" in l && (u.__data__ = l.__data__), (a[c] = u));
  return new Je(r, this._parents);
}
function s2(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function i2() {
  return [];
}
function ql(e) {
  return e == null
    ? i2
    : function () {
        return this.querySelectorAll(e);
      };
}
function a2(e) {
  return function () {
    return s2(e.apply(this, arguments));
  };
}
function c2(e) {
  typeof e == "function" ? (e = a2(e)) : (e = ql(e));
  for (var t = this._groups, n = t.length, r = [], o = [], s = 0; s < n; ++s)
    for (var i = t[s], a = i.length, l, u = 0; u < a; ++u)
      (l = i[u]) && (r.push(e.call(l, l.__data__, u, i)), o.push(l));
  return new Je(r, o);
}
function Xl(e) {
  return function () {
    return this.matches(e);
  };
}
function Kl(e) {
  return function (t) {
    return t.matches(e);
  };
}
var l2 = Array.prototype.find;
function u2(e) {
  return function () {
    return l2.call(this.children, e);
  };
}
function d2() {
  return this.firstElementChild;
}
function f2(e) {
  return this.select(e == null ? d2 : u2(typeof e == "function" ? e : Kl(e)));
}
var h2 = Array.prototype.filter;
function p2() {
  return Array.from(this.children);
}
function g2(e) {
  return function () {
    return h2.call(this.children, e);
  };
}
function m2(e) {
  return this.selectAll(
    e == null ? p2 : g2(typeof e == "function" ? e : Kl(e)),
  );
}
function y2(e) {
  typeof e != "function" && (e = Xl(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], i = s.length, a = (r[o] = []), l, u = 0; u < i; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && a.push(l);
  return new Je(r, this._parents);
}
function Gl(e) {
  return new Array(e.length);
}
function v2() {
  return new Je(this._enter || this._groups.map(Gl), this._parents);
}
function Co(e, t) {
  (this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = t);
}
Co.prototype = {
  constructor: Co,
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
function E2(e) {
  return function () {
    return e;
  };
}
function C2(e, t, n, r, o, s) {
  for (var i = 0, a, l = t.length, u = s.length; i < u; ++i)
    (a = t[i]) ? ((a.__data__ = s[i]), (r[i] = a)) : (n[i] = new Co(e, s[i]));
  for (; i < l; ++i) (a = t[i]) && (o[i] = a);
}
function x2(e, t, n, r, o, s, i) {
  var a,
    l,
    u = /* @__PURE__ */ new Map(),
    c = t.length,
    d = s.length,
    f = new Array(c),
    h;
  for (a = 0; a < c; ++a)
    (l = t[a]) &&
      ((f[a] = h = i.call(l, l.__data__, a, t) + ""),
      u.has(h) ? (o[a] = l) : u.set(h, l));
  for (a = 0; a < d; ++a)
    (h = i.call(e, s[a], a, s) + ""),
      (l = u.get(h))
        ? ((r[a] = l), (l.__data__ = s[a]), u.delete(h))
        : (n[a] = new Co(e, s[a]));
  for (a = 0; a < c; ++a) (l = t[a]) && u.get(f[a]) === l && (o[a] = l);
}
function _2(e) {
  return e.__data__;
}
function b2(e, t) {
  if (!arguments.length) return Array.from(this, _2);
  var n = t ? x2 : C2,
    r = this._parents,
    o = this._groups;
  typeof e != "function" && (e = E2(e));
  for (
    var s = o.length,
      i = new Array(s),
      a = new Array(s),
      l = new Array(s),
      u = 0;
    u < s;
    ++u
  ) {
    var c = r[u],
      d = o[u],
      f = d.length,
      h = w2(e.call(c, c && c.__data__, u, r)),
      p = h.length,
      g = (a[u] = new Array(p)),
      m = (i[u] = new Array(p)),
      v = (l[u] = new Array(f));
    n(c, d, g, m, v, h, t);
    for (var x = 0, b = 0, _, C; x < p; ++x)
      if ((_ = g[x])) {
        for (x >= b && (b = x + 1); !(C = m[b]) && ++b < p; );
        _._next = C || null;
      }
  }
  return (i = new Je(i, r)), (i._enter = a), (i._exit = l), i;
}
function w2(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function S2() {
  return new Je(this._exit || this._groups.map(Gl), this._parents);
}
function N2(e, t, n) {
  var r = this.enter(),
    o = this,
    s = this.exit();
  return (
    typeof e == "function"
      ? ((r = e(r)), r && (r = r.selection()))
      : (r = r.append(e + "")),
    t != null && ((o = t(o)), o && (o = o.selection())),
    n == null ? s.remove() : n(s),
    r && o ? r.merge(o).order() : o
  );
}
function T2(e) {
  for (
    var t = e.selection ? e.selection() : e,
      n = this._groups,
      r = t._groups,
      o = n.length,
      s = r.length,
      i = Math.min(o, s),
      a = new Array(o),
      l = 0;
    l < i;
    ++l
  )
    for (
      var u = n[l], c = r[l], d = u.length, f = (a[l] = new Array(d)), h, p = 0;
      p < d;
      ++p
    )
      (h = u[p] || c[p]) && (f[p] = h);
  for (; l < o; ++l) a[l] = n[l];
  return new Je(a, this._parents);
}
function A2() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], o = r.length - 1, s = r[o], i; --o >= 0; )
      (i = r[o]) &&
        (s &&
          i.compareDocumentPosition(s) ^ 4 &&
          s.parentNode.insertBefore(i, s),
        (s = i));
  return this;
}
function D2(e) {
  e || (e = I2);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (
    var n = this._groups, r = n.length, o = new Array(r), s = 0;
    s < r;
    ++s
  ) {
    for (
      var i = n[s], a = i.length, l = (o[s] = new Array(a)), u, c = 0;
      c < a;
      ++c
    )
      (u = i[c]) && (l[c] = u);
    l.sort(t);
  }
  return new Je(o, this._parents).order();
}
function I2(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function O2() {
  var e = arguments[0];
  return (arguments[0] = this), e.apply(null, arguments), this;
}
function R2() {
  return Array.from(this);
}
function M2() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, s = r.length; o < s; ++o) {
      var i = r[o];
      if (i) return i;
    }
  return null;
}
function L2() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function k2() {
  return !this.node();
}
function P2(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var o = t[n], s = 0, i = o.length, a; s < i; ++s)
      (a = o[s]) && e.call(a, a.__data__, s, o);
  return this;
}
function j2(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function $2(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function F2(e, t) {
  return function () {
    this.setAttribute(e, t);
  };
}
function H2(e, t) {
  return function () {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function B2(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function z2(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, n);
  };
}
function V2(e, t) {
  var n = Ho(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each(
    (t == null
      ? n.local
        ? $2
        : j2
      : typeof t == "function"
        ? n.local
          ? z2
          : B2
        : n.local
          ? H2
          : F2)(n, t),
  );
}
function Jl(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
function W2(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function U2(e, t, n) {
  return function () {
    this.style.setProperty(e, t, n);
  };
}
function Y2(e, t, n) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function Z2(e, t, n) {
  return arguments.length > 1
    ? this.each(
        (t == null ? W2 : typeof t == "function" ? Y2 : U2)(e, t, n ?? ""),
      )
    : Pn(this.node(), e);
}
function Pn(e, t) {
  return (
    e.style.getPropertyValue(t) ||
    Jl(e).getComputedStyle(e, null).getPropertyValue(t)
  );
}
function q2(e) {
  return function () {
    delete this[e];
  };
}
function X2(e, t) {
  return function () {
    this[e] = t;
  };
}
function K2(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : (this[e] = n);
  };
}
function G2(e, t) {
  return arguments.length > 1
    ? this.each((t == null ? q2 : typeof t == "function" ? K2 : X2)(e, t))
    : this.node()[e];
}
function Ql(e) {
  return e.trim().split(/^|\s+/);
}
function Ri(e) {
  return e.classList || new eu(e);
}
function eu(e) {
  (this._node = e), (this._names = Ql(e.getAttribute("class") || ""));
}
eu.prototype = {
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
function tu(e, t) {
  for (var n = Ri(e), r = -1, o = t.length; ++r < o; ) n.add(t[r]);
}
function nu(e, t) {
  for (var n = Ri(e), r = -1, o = t.length; ++r < o; ) n.remove(t[r]);
}
function J2(e) {
  return function () {
    tu(this, e);
  };
}
function Q2(e) {
  return function () {
    nu(this, e);
  };
}
function eg(e, t) {
  return function () {
    (t.apply(this, arguments) ? tu : nu)(this, e);
  };
}
function tg(e, t) {
  var n = Ql(e + "");
  if (arguments.length < 2) {
    for (var r = Ri(this.node()), o = -1, s = n.length; ++o < s; )
      if (!r.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? eg : t ? J2 : Q2)(n, t));
}
function ng() {
  this.textContent = "";
}
function rg(e) {
  return function () {
    this.textContent = e;
  };
}
function og(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function sg(e) {
  return arguments.length
    ? this.each(e == null ? ng : (typeof e == "function" ? og : rg)(e))
    : this.node().textContent;
}
function ig() {
  this.innerHTML = "";
}
function ag(e) {
  return function () {
    this.innerHTML = e;
  };
}
function cg(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function lg(e) {
  return arguments.length
    ? this.each(e == null ? ig : (typeof e == "function" ? cg : ag)(e))
    : this.node().innerHTML;
}
function ug() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function dg() {
  return this.each(ug);
}
function fg() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function hg() {
  return this.each(fg);
}
function pg(e) {
  var t = typeof e == "function" ? e : Zl(e);
  return this.select(function () {
    return this.appendChild(t.apply(this, arguments));
  });
}
function gg() {
  return null;
}
function mg(e, t) {
  var n = typeof e == "function" ? e : Zl(e),
    r = t == null ? gg : typeof t == "function" ? t : Oi(t);
  return this.select(function () {
    return this.insertBefore(
      n.apply(this, arguments),
      r.apply(this, arguments) || null,
    );
  });
}
function yg() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function vg() {
  return this.each(yg);
}
function Eg() {
  var e = this.cloneNode(!1),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Cg() {
  var e = this.cloneNode(!0),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function xg(e) {
  return this.select(e ? Cg : Eg);
}
function _g(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function bg(e) {
  return function (t) {
    e.call(this, t, this.__data__);
  };
}
function wg(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var n = "",
        r = t.indexOf(".");
      return (
        r >= 0 && ((n = t.slice(r + 1)), (t = t.slice(0, r))),
        { type: t, name: n }
      );
    });
}
function Sg(e) {
  return function () {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, o = t.length, s; n < o; ++n)
        (s = t[n]),
          (!e.type || s.type === e.type) && s.name === e.name
            ? this.removeEventListener(s.type, s.listener, s.options)
            : (t[++r] = s);
      ++r ? (t.length = r) : delete this.__on;
    }
  };
}
function Ng(e, t, n) {
  return function () {
    var r = this.__on,
      o,
      s = bg(t);
    if (r) {
      for (var i = 0, a = r.length; i < a; ++i)
        if ((o = r[i]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options),
            this.addEventListener(o.type, (o.listener = s), (o.options = n)),
            (o.value = t);
          return;
        }
    }
    this.addEventListener(e.type, s, n),
      (o = { type: e.type, name: e.name, value: t, listener: s, options: n }),
      r ? r.push(o) : (this.__on = [o]);
  };
}
function Tg(e, t, n) {
  var r = wg(e + ""),
    o,
    s = r.length,
    i;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, u = a.length, c; l < u; ++l)
        for (o = 0, c = a[l]; o < s; ++o)
          if ((i = r[o]).type === c.type && i.name === c.name) return c.value;
    }
    return;
  }
  for (a = t ? Ng : Sg, o = 0; o < s; ++o) this.each(a(r[o], t, n));
  return this;
}
function ru(e, t, n) {
  var r = Jl(e),
    o = r.CustomEvent;
  typeof o == "function"
    ? (o = new o(t, n))
    : ((o = r.document.createEvent("Event")),
      n
        ? (o.initEvent(t, n.bubbles, n.cancelable), (o.detail = n.detail))
        : o.initEvent(t, !1, !1)),
    e.dispatchEvent(o);
}
function Ag(e, t) {
  return function () {
    return ru(this, e, t);
  };
}
function Dg(e, t) {
  return function () {
    return ru(this, e, t.apply(this, arguments));
  };
}
function Ig(e, t) {
  return this.each((typeof t == "function" ? Dg : Ag)(e, t));
}
function* Og() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, s = r.length, i; o < s; ++o)
      (i = r[o]) && (yield i);
}
var ou = [null];
function Je(e, t) {
  (this._groups = e), (this._parents = t);
}
function Nr() {
  return new Je([[document.documentElement]], ou);
}
function Rg() {
  return this;
}
Je.prototype = Nr.prototype = {
  constructor: Je,
  select: o2,
  selectAll: c2,
  selectChild: f2,
  selectChildren: m2,
  filter: y2,
  data: b2,
  enter: v2,
  exit: S2,
  join: N2,
  merge: T2,
  selection: Rg,
  order: A2,
  sort: D2,
  call: O2,
  nodes: R2,
  node: M2,
  size: L2,
  empty: k2,
  each: P2,
  attr: V2,
  style: Z2,
  property: G2,
  classed: tg,
  text: sg,
  html: lg,
  raise: dg,
  lower: hg,
  append: pg,
  insert: mg,
  remove: vg,
  clone: xg,
  datum: _g,
  on: Tg,
  dispatch: Ig,
  [Symbol.iterator]: Og,
};
function ut(e) {
  return typeof e == "string"
    ? new Je([[document.querySelector(e)]], [document.documentElement])
    : new Je([[e]], ou);
}
function Mg(e) {
  let t;
  for (; (t = e.sourceEvent); ) e = t;
  return e;
}
function Et(e, t) {
  if (((e = Mg(e)), t === void 0 && (t = e.currentTarget), t)) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return (
        (r.x = e.clientX),
        (r.y = e.clientY),
        (r = r.matrixTransform(t.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [
        e.clientX - o.left - t.clientLeft,
        e.clientY - o.top - t.clientTop,
      ];
    }
  }
  return [e.pageX, e.pageY];
}
const Lg = { passive: !1 },
  dr = { capture: !0, passive: !1 };
function Es(e) {
  e.stopImmediatePropagation();
}
function Tn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function su(e) {
  var t = e.document.documentElement,
    n = ut(e).on("dragstart.drag", Tn, dr);
  "onselectstart" in t
    ? n.on("selectstart.drag", Tn, dr)
    : ((t.__noselect = t.style.MozUserSelect),
      (t.style.MozUserSelect = "none"));
}
function iu(e, t) {
  var n = e.document.documentElement,
    r = ut(e).on("dragstart.drag", null);
  t &&
    (r.on("click.drag", Tn, dr),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in n
      ? r.on("selectstart.drag", null)
      : ((n.style.MozUserSelect = n.__noselect), delete n.__noselect);
}
const Vr = (e) => () => e;
function Ws(
  e,
  {
    sourceEvent: t,
    subject: n,
    target: r,
    identifier: o,
    active: s,
    x: i,
    y: a,
    dx: l,
    dy: u,
    dispatch: c,
  },
) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: o, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: i, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: c },
  });
}
Ws.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function kg(e) {
  return !e.ctrlKey && !e.button;
}
function Pg() {
  return this.parentNode;
}
function jg(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function $g() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fg() {
  var e = kg,
    t = Pg,
    n = jg,
    r = $g,
    o = {},
    s = Fo("start", "drag", "end"),
    i = 0,
    a,
    l,
    u,
    c,
    d = 0;
  function f(_) {
    _.on("mousedown.drag", h)
      .filter(r)
      .on("touchstart.drag", m)
      .on("touchmove.drag", v, Lg)
      .on("touchend.drag touchcancel.drag", x)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(_, C) {
    if (!(c || !e.call(this, _, C))) {
      var A = b(this, t.call(this, _, C), _, C, "mouse");
      A &&
        (ut(_.view).on("mousemove.drag", p, dr).on("mouseup.drag", g, dr),
        su(_.view),
        Es(_),
        (u = !1),
        (a = _.clientX),
        (l = _.clientY),
        A("start", _));
    }
  }
  function p(_) {
    if ((Tn(_), !u)) {
      var C = _.clientX - a,
        A = _.clientY - l;
      u = C * C + A * A > d;
    }
    o.mouse("drag", _);
  }
  function g(_) {
    ut(_.view).on("mousemove.drag mouseup.drag", null),
      iu(_.view, u),
      Tn(_),
      o.mouse("end", _);
  }
  function m(_, C) {
    if (e.call(this, _, C)) {
      var A = _.changedTouches,
        I = t.call(this, _, C),
        S = A.length,
        P,
        k;
      for (P = 0; P < S; ++P)
        (k = b(this, I, _, C, A[P].identifier, A[P])) &&
          (Es(_), k("start", _, A[P]));
    }
  }
  function v(_) {
    var C = _.changedTouches,
      A = C.length,
      I,
      S;
    for (I = 0; I < A; ++I)
      (S = o[C[I].identifier]) && (Tn(_), S("drag", _, C[I]));
  }
  function x(_) {
    var C = _.changedTouches,
      A = C.length,
      I,
      S;
    for (
      c && clearTimeout(c),
        c = setTimeout(function () {
          c = null;
        }, 500),
        I = 0;
      I < A;
      ++I
    )
      (S = o[C[I].identifier]) && (Es(_), S("end", _, C[I]));
  }
  function b(_, C, A, I, S, P) {
    var k = s.copy(),
      j = Et(P || A, C),
      z,
      B,
      E;
    if (
      (E = n.call(
        _,
        new Ws("beforestart", {
          sourceEvent: A,
          target: f,
          identifier: S,
          active: i,
          x: j[0],
          y: j[1],
          dx: 0,
          dy: 0,
          dispatch: k,
        }),
        I,
      )) != null
    )
      return (
        (z = E.x - j[0] || 0),
        (B = E.y - j[1] || 0),
        function N(w, O, L) {
          var D = j,
            T;
          switch (w) {
            case "start":
              (o[S] = N), (T = i++);
              break;
            case "end":
              delete o[S], --i;
            case "drag":
              (j = Et(L || O, C)), (T = i);
              break;
          }
          k.call(
            w,
            _,
            new Ws(w, {
              sourceEvent: O,
              subject: E,
              target: f,
              identifier: S,
              active: T,
              x: j[0] + z,
              y: j[1] + B,
              dx: j[0] - D[0],
              dy: j[1] - D[1],
              dispatch: k,
            }),
            I,
          );
        }
      );
  }
  return (
    (f.filter = function (_) {
      return arguments.length
        ? ((e = typeof _ == "function" ? _ : Vr(!!_)), f)
        : e;
    }),
    (f.container = function (_) {
      return arguments.length
        ? ((t = typeof _ == "function" ? _ : Vr(_)), f)
        : t;
    }),
    (f.subject = function (_) {
      return arguments.length
        ? ((n = typeof _ == "function" ? _ : Vr(_)), f)
        : n;
    }),
    (f.touchable = function (_) {
      return arguments.length
        ? ((r = typeof _ == "function" ? _ : Vr(!!_)), f)
        : r;
    }),
    (f.on = function () {
      var _ = s.on.apply(s, arguments);
      return _ === s ? f : _;
    }),
    (f.clickDistance = function (_) {
      return arguments.length ? ((d = (_ = +_) * _), f) : Math.sqrt(d);
    }),
    f
  );
}
function Mi(e, t, n) {
  (e.prototype = t.prototype = n), (n.constructor = e);
}
function au(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function Tr() {}
var fr = 0.7,
  xo = 1 / fr,
  An = "\\s*([+-]?\\d+)\\s*",
  hr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  xt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Hg = /^#([0-9a-f]{3,8})$/,
  Bg = new RegExp(`^rgb\\(${An},${An},${An}\\)$`),
  zg = new RegExp(`^rgb\\(${xt},${xt},${xt}\\)$`),
  Vg = new RegExp(`^rgba\\(${An},${An},${An},${hr}\\)$`),
  Wg = new RegExp(`^rgba\\(${xt},${xt},${xt},${hr}\\)$`),
  Ug = new RegExp(`^hsl\\(${hr},${xt},${xt}\\)$`),
  Yg = new RegExp(`^hsla\\(${hr},${xt},${xt},${hr}\\)$`),
  Ja = {
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
Mi(Tr, pr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qa,
  // Deprecated! Use color.formatHex.
  formatHex: Qa,
  formatHex8: Zg,
  formatHsl: qg,
  formatRgb: ec,
  toString: ec,
});
function Qa() {
  return this.rgb().formatHex();
}
function Zg() {
  return this.rgb().formatHex8();
}
function qg() {
  return cu(this).formatHsl();
}
function ec() {
  return this.rgb().formatRgb();
}
function pr(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = Hg.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? tc(t)
          : n === 3
            ? new Ye(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : n === 8
              ? Wr(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255,
                )
              : n === 4
                ? Wr(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = Bg.exec(e))
        ? new Ye(t[1], t[2], t[3], 1)
        : (t = zg.exec(e))
          ? new Ye(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1,
            )
          : (t = Vg.exec(e))
            ? Wr(t[1], t[2], t[3], t[4])
            : (t = Wg.exec(e))
              ? Wr(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4],
                )
              : (t = Ug.exec(e))
                ? oc(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = Yg.exec(e))
                  ? oc(t[1], t[2] / 100, t[3] / 100, t[4])
                  : Ja.hasOwnProperty(e)
                    ? tc(Ja[e])
                    : e === "transparent"
                      ? new Ye(NaN, NaN, NaN, 0)
                      : null
  );
}
function tc(e) {
  return new Ye((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function Wr(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new Ye(e, t, n, r);
}
function Xg(e) {
  return (
    e instanceof Tr || (e = pr(e)),
    e ? ((e = e.rgb()), new Ye(e.r, e.g, e.b, e.opacity)) : new Ye()
  );
}
function Us(e, t, n, r) {
  return arguments.length === 1 ? Xg(e) : new Ye(e, t, n, r ?? 1);
}
function Ye(e, t, n, r) {
  (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r);
}
Mi(
  Ye,
  Us,
  au(Tr, {
    brighter(e) {
      return (
        (e = e == null ? xo : Math.pow(xo, e)),
        new Ye(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? fr : Math.pow(fr, e)),
        new Ye(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Ye(un(this.r), un(this.g), un(this.b), _o(this.opacity));
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
    hex: nc,
    // Deprecated! Use color.formatHex.
    formatHex: nc,
    formatHex8: Kg,
    formatRgb: rc,
    toString: rc,
  }),
);
function nc() {
  return `#${cn(this.r)}${cn(this.g)}${cn(this.b)}`;
}
function Kg() {
  return `#${cn(this.r)}${cn(this.g)}${cn(this.b)}${cn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rc() {
  const e = _o(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${un(this.r)}, ${un(this.g)}, ${un(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function _o(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function un(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function cn(e) {
  return (e = un(e)), (e < 16 ? "0" : "") + e.toString(16);
}
function oc(e, t, n, r) {
  return (
    r <= 0
      ? (e = t = n = NaN)
      : n <= 0 || n >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new dt(e, t, n, r)
  );
}
function cu(e) {
  if (e instanceof dt) return new dt(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Tr || (e = pr(e)), !e)) return new dt();
  if (e instanceof dt) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    o = Math.min(t, n, r),
    s = Math.max(t, n, r),
    i = NaN,
    a = s - o,
    l = (s + o) / 2;
  return (
    a
      ? (t === s
          ? (i = (n - r) / a + (n < r) * 6)
          : n === s
            ? (i = (r - t) / a + 2)
            : (i = (t - n) / a + 4),
        (a /= l < 0.5 ? s + o : 2 - s - o),
        (i *= 60))
      : (a = l > 0 && l < 1 ? 0 : i),
    new dt(i, a, l, e.opacity)
  );
}
function Gg(e, t, n, r) {
  return arguments.length === 1 ? cu(e) : new dt(e, t, n, r ?? 1);
}
function dt(e, t, n, r) {
  (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r);
}
Mi(
  dt,
  Gg,
  au(Tr, {
    brighter(e) {
      return (
        (e = e == null ? xo : Math.pow(xo, e)),
        new dt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? fr : Math.pow(fr, e)),
        new dt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        o = 2 * n - r;
      return new Ye(
        Cs(e >= 240 ? e - 240 : e + 120, o, r),
        Cs(e, o, r),
        Cs(e < 120 ? e + 240 : e - 120, o, r),
        this.opacity,
      );
    },
    clamp() {
      return new dt(sc(this.h), Ur(this.s), Ur(this.l), _o(this.opacity));
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
      const e = _o(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${sc(this.h)}, ${Ur(this.s) * 100}%, ${Ur(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function sc(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function Ur(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Cs(e, t, n) {
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
const lu = (e) => () => e;
function Jg(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function Qg(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (r) {
      return Math.pow(e + r * t, n);
    }
  );
}
function e3(e) {
  return (e = +e) == 1
    ? uu
    : function (t, n) {
        return n - t ? Qg(t, n, e) : lu(isNaN(t) ? n : t);
      };
}
function uu(e, t) {
  var n = t - e;
  return n ? Jg(e, n) : lu(isNaN(e) ? t : e);
}
const ic = (function e(t) {
  var n = e3(t);
  function r(o, s) {
    var i = n((o = Us(o)).r, (s = Us(s)).r),
      a = n(o.g, s.g),
      l = n(o.b, s.b),
      u = uu(o.opacity, s.opacity);
    return function (c) {
      return (
        (o.r = i(c)), (o.g = a(c)), (o.b = l(c)), (o.opacity = u(c)), o + ""
      );
    };
  }
  return (r.gamma = e), r;
})(1);
function Yt(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
var Ys = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  xs = new RegExp(Ys.source, "g");
function t3(e) {
  return function () {
    return e;
  };
}
function n3(e) {
  return function (t) {
    return e(t) + "";
  };
}
function r3(e, t) {
  var n = (Ys.lastIndex = xs.lastIndex = 0),
    r,
    o,
    s,
    i = -1,
    a = [],
    l = [];
  for (e = e + "", t = t + ""; (r = Ys.exec(e)) && (o = xs.exec(t)); )
    (s = o.index) > n &&
      ((s = t.slice(n, s)), a[i] ? (a[i] += s) : (a[++i] = s)),
      (r = r[0]) === (o = o[0])
        ? a[i]
          ? (a[i] += o)
          : (a[++i] = o)
        : ((a[++i] = null), l.push({ i, x: Yt(r, o) })),
      (n = xs.lastIndex);
  return (
    n < t.length && ((s = t.slice(n)), a[i] ? (a[i] += s) : (a[++i] = s)),
    a.length < 2
      ? l[0]
        ? n3(l[0].x)
        : t3(t)
      : ((t = l.length),
        function (u) {
          for (var c = 0, d; c < t; ++c) a[(d = l[c]).i] = d.x(u);
          return a.join("");
        })
  );
}
var ac = 180 / Math.PI,
  Zs = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function du(e, t, n, r, o, s) {
  var i, a, l;
  return (
    (i = Math.sqrt(e * e + t * t)) && ((e /= i), (t /= i)),
    (l = e * n + t * r) && ((n -= e * l), (r -= t * l)),
    (a = Math.sqrt(n * n + r * r)) && ((n /= a), (r /= a), (l /= a)),
    e * r < t * n && ((e = -e), (t = -t), (l = -l), (i = -i)),
    {
      translateX: o,
      translateY: s,
      rotate: Math.atan2(t, e) * ac,
      skewX: Math.atan(l) * ac,
      scaleX: i,
      scaleY: a,
    }
  );
}
var Yr;
function o3(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + "",
  );
  return t.isIdentity ? Zs : du(t.a, t.b, t.c, t.d, t.e, t.f);
}
function s3(e) {
  return e == null ||
    (Yr || (Yr = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    Yr.setAttribute("transform", e),
    !(e = Yr.transform.baseVal.consolidate()))
    ? Zs
    : ((e = e.matrix), du(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fu(e, t, n, r) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, c, d, f, h, p) {
    if (u !== d || c !== f) {
      var g = h.push("translate(", null, t, null, n);
      p.push({ i: g - 4, x: Yt(u, d) }, { i: g - 2, x: Yt(c, f) });
    } else (d || f) && h.push("translate(" + d + t + f + n);
  }
  function i(u, c, d, f) {
    u !== c
      ? (u - c > 180 ? (c += 360) : c - u > 180 && (u += 360),
        f.push({ i: d.push(o(d) + "rotate(", null, r) - 2, x: Yt(u, c) }))
      : c && d.push(o(d) + "rotate(" + c + r);
  }
  function a(u, c, d, f) {
    u !== c
      ? f.push({ i: d.push(o(d) + "skewX(", null, r) - 2, x: Yt(u, c) })
      : c && d.push(o(d) + "skewX(" + c + r);
  }
  function l(u, c, d, f, h, p) {
    if (u !== d || c !== f) {
      var g = h.push(o(h) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: Yt(u, d) }, { i: g - 2, x: Yt(c, f) });
    } else (d !== 1 || f !== 1) && h.push(o(h) + "scale(" + d + "," + f + ")");
  }
  return function (u, c) {
    var d = [],
      f = [];
    return (
      (u = e(u)),
      (c = e(c)),
      s(u.translateX, u.translateY, c.translateX, c.translateY, d, f),
      i(u.rotate, c.rotate, d, f),
      a(u.skewX, c.skewX, d, f),
      l(u.scaleX, u.scaleY, c.scaleX, c.scaleY, d, f),
      (u = c = null),
      function (h) {
        for (var p = -1, g = f.length, m; ++p < g; ) d[(m = f[p]).i] = m.x(h);
        return d.join("");
      }
    );
  };
}
var i3 = fu(o3, "px, ", "px)", "deg)"),
  a3 = fu(s3, ", ", ")", ")"),
  c3 = 1e-12;
function cc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function l3(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function u3(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const d3 = (function e(t, n, r) {
  function o(s, i) {
    var a = s[0],
      l = s[1],
      u = s[2],
      c = i[0],
      d = i[1],
      f = i[2],
      h = c - a,
      p = d - l,
      g = h * h + p * p,
      m,
      v;
    if (g < c3)
      (v = Math.log(f / u) / t),
        (m = function (I) {
          return [a + I * h, l + I * p, u * Math.exp(t * I * v)];
        });
    else {
      var x = Math.sqrt(g),
        b = (f * f - u * u + r * g) / (2 * u * n * x),
        _ = (f * f - u * u - r * g) / (2 * f * n * x),
        C = Math.log(Math.sqrt(b * b + 1) - b),
        A = Math.log(Math.sqrt(_ * _ + 1) - _);
      (v = (A - C) / t),
        (m = function (I) {
          var S = I * v,
            P = cc(C),
            k = (u / (n * x)) * (P * u3(t * S + C) - l3(C));
          return [a + k * h, l + k * p, (u * P) / cc(t * S + C)];
        });
    }
    return (m.duration = (v * 1e3 * t) / Math.SQRT2), m;
  }
  return (
    (o.rho = function (s) {
      var i = Math.max(1e-3, +s),
        a = i * i,
        l = a * a;
      return e(i, a, l);
    }),
    o
  );
})(Math.SQRT2, 2, 4);
var jn = 0,
  er = 0,
  qn = 0,
  hu = 1e3,
  bo,
  tr,
  wo = 0,
  fn = 0,
  Bo = 0,
  gr = typeof performance == "object" && performance.now ? performance : Date,
  pu =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function Li() {
  return fn || (pu(f3), (fn = gr.now() + Bo));
}
function f3() {
  fn = 0;
}
function So() {
  this._call = this._time = this._next = null;
}
So.prototype = gu.prototype = {
  constructor: So,
  restart: function (e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    (n = (n == null ? Li() : +n) + (t == null ? 0 : +t)),
      !this._next &&
        tr !== this &&
        (tr ? (tr._next = this) : (bo = this), (tr = this)),
      (this._call = e),
      (this._time = n),
      qs();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), qs());
  },
};
function gu(e, t, n) {
  var r = new So();
  return r.restart(e, t, n), r;
}
function h3() {
  Li(), ++jn;
  for (var e = bo, t; e; )
    (t = fn - e._time) >= 0 && e._call.call(void 0, t), (e = e._next);
  --jn;
}
function lc() {
  (fn = (wo = gr.now()) + Bo), (jn = er = 0);
  try {
    h3();
  } finally {
    (jn = 0), g3(), (fn = 0);
  }
}
function p3() {
  var e = gr.now(),
    t = e - wo;
  t > hu && ((Bo -= t), (wo = e));
}
function g3() {
  for (var e, t = bo, n, r = 1 / 0; t; )
    t._call
      ? (r > t._time && (r = t._time), (e = t), (t = t._next))
      : ((n = t._next), (t._next = null), (t = e ? (e._next = n) : (bo = n)));
  (tr = e), qs(r);
}
function qs(e) {
  if (!jn) {
    er && (er = clearTimeout(er));
    var t = e - fn;
    t > 24
      ? (e < 1 / 0 && (er = setTimeout(lc, e - gr.now() - Bo)),
        qn && (qn = clearInterval(qn)))
      : (qn || ((wo = gr.now()), (qn = setInterval(p3, hu))), (jn = 1), pu(lc));
  }
}
function uc(e, t, n) {
  var r = new So();
  return (
    (t = t == null ? 0 : +t),
    r.restart(
      (o) => {
        r.stop(), e(o + t);
      },
      t,
      n,
    ),
    r
  );
}
var m3 = Fo("start", "end", "cancel", "interrupt"),
  y3 = [],
  mu = 0,
  dc = 1,
  Xs = 2,
  so = 3,
  fc = 4,
  Ks = 5,
  io = 6;
function zo(e, t, n, r, o, s) {
  var i = e.__transition;
  if (!i) e.__transition = {};
  else if (n in i) return;
  v3(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: o,
    // For context during callback.
    on: m3,
    tween: y3,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: mu,
  });
}
function ki(e, t) {
  var n = gt(e, t);
  if (n.state > mu) throw new Error("too late; already scheduled");
  return n;
}
function bt(e, t) {
  var n = gt(e, t);
  if (n.state > so) throw new Error("too late; already running");
  return n;
}
function gt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function v3(e, t, n) {
  var r = e.__transition,
    o;
  (r[t] = n), (n.timer = gu(s, 0, n.time));
  function s(u) {
    (n.state = dc),
      n.timer.restart(i, n.delay, n.time),
      n.delay <= u && i(u - n.delay);
  }
  function i(u) {
    var c, d, f, h;
    if (n.state !== dc) return l();
    for (c in r)
      if (((h = r[c]), h.name === n.name)) {
        if (h.state === so) return uc(i);
        h.state === fc
          ? ((h.state = io),
            h.timer.stop(),
            h.on.call("interrupt", e, e.__data__, h.index, h.group),
            delete r[c])
          : +c < t &&
            ((h.state = io),
            h.timer.stop(),
            h.on.call("cancel", e, e.__data__, h.index, h.group),
            delete r[c]);
      }
    if (
      (uc(function () {
        n.state === so &&
          ((n.state = fc), n.timer.restart(a, n.delay, n.time), a(u));
      }),
      (n.state = Xs),
      n.on.call("start", e, e.__data__, n.index, n.group),
      n.state === Xs)
    ) {
      for (
        n.state = so, o = new Array((f = n.tween.length)), c = 0, d = -1;
        c < f;
        ++c
      )
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) &&
          (o[++d] = h);
      o.length = d + 1;
    }
  }
  function a(u) {
    for (
      var c =
          u < n.duration
            ? n.ease.call(null, u / n.duration)
            : (n.timer.restart(l), (n.state = Ks), 1),
        d = -1,
        f = o.length;
      ++d < f;

    )
      o[d].call(e, c);
    n.state === Ks && (n.on.call("end", e, e.__data__, n.index, n.group), l());
  }
  function l() {
    (n.state = io), n.timer.stop(), delete r[t];
    for (var u in r) return;
    delete e.__transition;
  }
}
function ao(e, t) {
  var n = e.__transition,
    r,
    o,
    s = !0,
    i;
  if (n) {
    t = t == null ? null : t + "";
    for (i in n) {
      if ((r = n[i]).name !== t) {
        s = !1;
        continue;
      }
      (o = r.state > Xs && r.state < Ks),
        (r.state = io),
        r.timer.stop(),
        r.on.call(o ? "interrupt" : "cancel", e, e.__data__, r.index, r.group),
        delete n[i];
    }
    s && delete e.__transition;
  }
}
function E3(e) {
  return this.each(function () {
    ao(this, e);
  });
}
function C3(e, t) {
  var n, r;
  return function () {
    var o = bt(this, e),
      s = o.tween;
    if (s !== n) {
      r = n = s;
      for (var i = 0, a = r.length; i < a; ++i)
        if (r[i].name === t) {
          (r = r.slice()), r.splice(i, 1);
          break;
        }
    }
    o.tween = r;
  };
}
function x3(e, t, n) {
  var r, o;
  if (typeof n != "function") throw new Error();
  return function () {
    var s = bt(this, e),
      i = s.tween;
    if (i !== r) {
      o = (r = i).slice();
      for (var a = { name: t, value: n }, l = 0, u = o.length; l < u; ++l)
        if (o[l].name === t) {
          o[l] = a;
          break;
        }
      l === u && o.push(a);
    }
    s.tween = o;
  };
}
function _3(e, t) {
  var n = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var r = gt(this.node(), n).tween, o = 0, s = r.length, i; o < s; ++o)
      if ((i = r[o]).name === e) return i.value;
    return null;
  }
  return this.each((t == null ? C3 : x3)(n, e, t));
}
function Pi(e, t, n) {
  var r = e._id;
  return (
    e.each(function () {
      var o = bt(this, r);
      (o.value || (o.value = {}))[t] = n.apply(this, arguments);
    }),
    function (o) {
      return gt(o, r).value[t];
    }
  );
}
function yu(e, t) {
  var n;
  return (
    typeof t == "number"
      ? Yt
      : t instanceof pr
        ? ic
        : (n = pr(t))
          ? ((t = n), ic)
          : r3
  )(e, t);
}
function b3(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function w3(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function S3(e, t, n) {
  var r,
    o = n + "",
    s;
  return function () {
    var i = this.getAttribute(e);
    return i === o ? null : i === r ? s : (s = t((r = i), n));
  };
}
function N3(e, t, n) {
  var r,
    o = n + "",
    s;
  return function () {
    var i = this.getAttributeNS(e.space, e.local);
    return i === o ? null : i === r ? s : (s = t((r = i), n));
  };
}
function T3(e, t, n) {
  var r, o, s;
  return function () {
    var i,
      a = n(this),
      l;
    return a == null
      ? void this.removeAttribute(e)
      : ((i = this.getAttribute(e)),
        (l = a + ""),
        i === l
          ? null
          : i === r && l === o
            ? s
            : ((o = l), (s = t((r = i), a))));
  };
}
function A3(e, t, n) {
  var r, o, s;
  return function () {
    var i,
      a = n(this),
      l;
    return a == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((i = this.getAttributeNS(e.space, e.local)),
        (l = a + ""),
        i === l
          ? null
          : i === r && l === o
            ? s
            : ((o = l), (s = t((r = i), a))));
  };
}
function D3(e, t) {
  var n = Ho(e),
    r = n === "transform" ? a3 : yu;
  return this.attrTween(
    e,
    typeof t == "function"
      ? (n.local ? A3 : T3)(n, r, Pi(this, "attr." + e, t))
      : t == null
        ? (n.local ? w3 : b3)(n)
        : (n.local ? N3 : S3)(n, r, t),
  );
}
function I3(e, t) {
  return function (n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function O3(e, t) {
  return function (n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function R3(e, t) {
  var n, r;
  function o() {
    var s = t.apply(this, arguments);
    return s !== r && (n = (r = s) && O3(e, s)), n;
  }
  return (o._value = t), o;
}
function M3(e, t) {
  var n, r;
  function o() {
    var s = t.apply(this, arguments);
    return s !== r && (n = (r = s) && I3(e, s)), n;
  }
  return (o._value = t), o;
}
function L3(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = Ho(e);
  return this.tween(n, (r.local ? R3 : M3)(r, t));
}
function k3(e, t) {
  return function () {
    ki(this, e).delay = +t.apply(this, arguments);
  };
}
function P3(e, t) {
  return (
    (t = +t),
    function () {
      ki(this, e).delay = t;
    }
  );
}
function j3(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? k3 : P3)(t, e))
    : gt(this.node(), t).delay;
}
function $3(e, t) {
  return function () {
    bt(this, e).duration = +t.apply(this, arguments);
  };
}
function F3(e, t) {
  return (
    (t = +t),
    function () {
      bt(this, e).duration = t;
    }
  );
}
function H3(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? $3 : F3)(t, e))
    : gt(this.node(), t).duration;
}
function B3(e, t) {
  if (typeof t != "function") throw new Error();
  return function () {
    bt(this, e).ease = t;
  };
}
function z3(e) {
  var t = this._id;
  return arguments.length ? this.each(B3(t, e)) : gt(this.node(), t).ease;
}
function V3(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    bt(this, e).ease = n;
  };
}
function W3(e) {
  if (typeof e != "function") throw new Error();
  return this.each(V3(this._id, e));
}
function U3(e) {
  typeof e != "function" && (e = Xl(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], i = s.length, a = (r[o] = []), l, u = 0; u < i; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && a.push(l);
  return new $t(r, this._parents, this._name, this._id);
}
function Y3(e) {
  if (e._id !== this._id) throw new Error();
  for (
    var t = this._groups,
      n = e._groups,
      r = t.length,
      o = n.length,
      s = Math.min(r, o),
      i = new Array(r),
      a = 0;
    a < s;
    ++a
  )
    for (
      var l = t[a], u = n[a], c = l.length, d = (i[a] = new Array(c)), f, h = 0;
      h < c;
      ++h
    )
      (f = l[h] || u[h]) && (d[h] = f);
  for (; a < r; ++a) i[a] = t[a];
  return new $t(i, this._parents, this._name, this._id);
}
function Z3(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (t) {
      var n = t.indexOf(".");
      return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
    });
}
function q3(e, t, n) {
  var r,
    o,
    s = Z3(t) ? ki : bt;
  return function () {
    var i = s(this, e),
      a = i.on;
    a !== r && (o = (r = a).copy()).on(t, n), (i.on = o);
  };
}
function X3(e, t) {
  var n = this._id;
  return arguments.length < 2
    ? gt(this.node(), n).on.on(e)
    : this.each(q3(n, e, t));
}
function K3(e) {
  return function () {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function G3() {
  return this.on("end.remove", K3(this._id));
}
function J3(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Oi(e));
  for (var r = this._groups, o = r.length, s = new Array(o), i = 0; i < o; ++i)
    for (
      var a = r[i], l = a.length, u = (s[i] = new Array(l)), c, d, f = 0;
      f < l;
      ++f
    )
      (c = a[f]) &&
        (d = e.call(c, c.__data__, f, a)) &&
        ("__data__" in c && (d.__data__ = c.__data__),
        (u[f] = d),
        zo(u[f], t, n, f, u, gt(c, n)));
  return new $t(s, this._parents, t, n);
}
function Q3(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = ql(e));
  for (var r = this._groups, o = r.length, s = [], i = [], a = 0; a < o; ++a)
    for (var l = r[a], u = l.length, c, d = 0; d < u; ++d)
      if ((c = l[d])) {
        for (
          var f = e.call(c, c.__data__, d, l),
            h,
            p = gt(c, n),
            g = 0,
            m = f.length;
          g < m;
          ++g
        )
          (h = f[g]) && zo(h, t, n, g, f, p);
        s.push(f), i.push(c);
      }
  return new $t(s, i, t, n);
}
var em = Nr.prototype.constructor;
function tm() {
  return new em(this._groups, this._parents);
}
function nm(e, t) {
  var n, r, o;
  return function () {
    var s = Pn(this, e),
      i = (this.style.removeProperty(e), Pn(this, e));
    return s === i ? null : s === n && i === r ? o : (o = t((n = s), (r = i)));
  };
}
function vu(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function rm(e, t, n) {
  var r,
    o = n + "",
    s;
  return function () {
    var i = Pn(this, e);
    return i === o ? null : i === r ? s : (s = t((r = i), n));
  };
}
function om(e, t, n) {
  var r, o, s;
  return function () {
    var i = Pn(this, e),
      a = n(this),
      l = a + "";
    return (
      a == null && (l = a = (this.style.removeProperty(e), Pn(this, e))),
      i === l ? null : i === r && l === o ? s : ((o = l), (s = t((r = i), a)))
    );
  };
}
function sm(e, t) {
  var n,
    r,
    o,
    s = "style." + t,
    i = "end." + s,
    a;
  return function () {
    var l = bt(this, e),
      u = l.on,
      c = l.value[s] == null ? a || (a = vu(t)) : void 0;
    (u !== n || o !== c) && (r = (n = u).copy()).on(i, (o = c)), (l.on = r);
  };
}
function im(e, t, n) {
  var r = (e += "") == "transform" ? i3 : yu;
  return t == null
    ? this.styleTween(e, nm(e, r)).on("end.style." + e, vu(e))
    : typeof t == "function"
      ? this.styleTween(e, om(e, r, Pi(this, "style." + e, t))).each(
          sm(this._id, e),
        )
      : this.styleTween(e, rm(e, r, t), n).on("end.style." + e, null);
}
function am(e, t, n) {
  return function (r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function cm(e, t, n) {
  var r, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (r = (o = i) && am(e, i, n)), r;
  }
  return (s._value = t), s;
}
function lm(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, cm(e, t, n ?? ""));
}
function um(e) {
  return function () {
    this.textContent = e;
  };
}
function dm(e) {
  return function () {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function fm(e) {
  return this.tween(
    "text",
    typeof e == "function"
      ? dm(Pi(this, "text", e))
      : um(e == null ? "" : e + ""),
  );
}
function hm(e) {
  return function (t) {
    this.textContent = e.call(this, t);
  };
}
function pm(e) {
  var t, n;
  function r() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && hm(o)), t;
  }
  return (r._value = e), r;
}
function gm(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, pm(e));
}
function mm() {
  for (
    var e = this._name,
      t = this._id,
      n = Eu(),
      r = this._groups,
      o = r.length,
      s = 0;
    s < o;
    ++s
  )
    for (var i = r[s], a = i.length, l, u = 0; u < a; ++u)
      if ((l = i[u])) {
        var c = gt(l, t);
        zo(l, e, n, u, i, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease,
        });
      }
  return new $t(r, this._parents, e, n);
}
function ym() {
  var e,
    t,
    n = this,
    r = n._id,
    o = n.size();
  return new Promise(function (s, i) {
    var a = { value: i },
      l = {
        value: function () {
          --o === 0 && s();
        },
      };
    n.each(function () {
      var u = bt(this, r),
        c = u.on;
      c !== e &&
        ((t = (e = c).copy()),
        t._.cancel.push(a),
        t._.interrupt.push(a),
        t._.end.push(l)),
        (u.on = t);
    }),
      o === 0 && s();
  });
}
var vm = 0;
function $t(e, t, n, r) {
  (this._groups = e), (this._parents = t), (this._name = n), (this._id = r);
}
function Eu() {
  return ++vm;
}
var Mt = Nr.prototype;
$t.prototype = {
  constructor: $t,
  select: J3,
  selectAll: Q3,
  selectChild: Mt.selectChild,
  selectChildren: Mt.selectChildren,
  filter: U3,
  merge: Y3,
  selection: tm,
  transition: mm,
  call: Mt.call,
  nodes: Mt.nodes,
  node: Mt.node,
  size: Mt.size,
  empty: Mt.empty,
  each: Mt.each,
  on: X3,
  attr: D3,
  attrTween: L3,
  style: im,
  styleTween: lm,
  text: fm,
  textTween: gm,
  remove: G3,
  tween: _3,
  delay: j3,
  duration: H3,
  ease: z3,
  easeVarying: W3,
  end: ym,
  [Symbol.iterator]: Mt[Symbol.iterator],
};
function Em(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Cm = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Em,
};
function xm(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
  return n;
}
function _m(e) {
  var t, n;
  e instanceof $t
    ? ((t = e._id), (e = e._name))
    : ((t = Eu()), ((n = Cm).time = Li()), (e = e == null ? null : e + ""));
  for (var r = this._groups, o = r.length, s = 0; s < o; ++s)
    for (var i = r[s], a = i.length, l, u = 0; u < a; ++u)
      (l = i[u]) && zo(l, e, t, u, i, n || xm(l, t));
  return new $t(r, this._parents, e, t);
}
Nr.prototype.interrupt = E3;
Nr.prototype.transition = _m;
const Zr = (e) => () => e;
function bm(e, { sourceEvent: t, target: n, transform: r, dispatch: o }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: o },
  });
}
function kt(e, t, n) {
  (this.k = e), (this.x = t), (this.y = n);
}
kt.prototype = {
  constructor: kt,
  scale: function (e) {
    return e === 1 ? this : new kt(this.k * e, this.x, this.y);
  },
  translate: function (e, t) {
    return (e === 0) & (t === 0)
      ? this
      : new kt(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Kt = new kt(1, 0, 0);
kt.prototype;
function _s(e) {
  e.stopImmediatePropagation();
}
function Xn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function wm(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Sm() {
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
function hc() {
  return this.__zoom || Kt;
}
function Nm(e) {
  return (
    -e.deltaY *
    (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) *
    (e.ctrlKey ? 10 : 1)
  );
}
function Tm() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Am(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0],
    o = e.invertX(t[1][0]) - n[1][0],
    s = e.invertY(t[0][1]) - n[0][1],
    i = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o),
    i > s ? (s + i) / 2 : Math.min(0, s) || Math.max(0, i),
  );
}
function Dm() {
  var e = wm,
    t = Sm,
    n = Am,
    r = Nm,
    o = Tm,
    s = [0, 1 / 0],
    i = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    a = 250,
    l = d3,
    u = Fo("start", "zoom", "end"),
    c,
    d,
    f,
    h = 500,
    p = 150,
    g = 0,
    m = 10;
  function v(E) {
    E.property("__zoom", hc)
      .on("wheel.zoom", S, { passive: !1 })
      .on("mousedown.zoom", P)
      .on("dblclick.zoom", k)
      .filter(o)
      .on("touchstart.zoom", j)
      .on("touchmove.zoom", z)
      .on("touchend.zoom touchcancel.zoom", B)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  (v.transform = function (E, N, w, O) {
    var L = E.selection ? E.selection() : E;
    L.property("__zoom", hc),
      E !== L
        ? C(E, N, w, O)
        : L.interrupt().each(function () {
            A(this, arguments)
              .event(O)
              .start()
              .zoom(null, typeof N == "function" ? N.apply(this, arguments) : N)
              .end();
          });
  }),
    (v.scaleBy = function (E, N, w, O) {
      v.scaleTo(
        E,
        function () {
          var L = this.__zoom.k,
            D = typeof N == "function" ? N.apply(this, arguments) : N;
          return L * D;
        },
        w,
        O,
      );
    }),
    (v.scaleTo = function (E, N, w, O) {
      v.transform(
        E,
        function () {
          var L = t.apply(this, arguments),
            D = this.__zoom,
            T =
              w == null
                ? _(L)
                : typeof w == "function"
                  ? w.apply(this, arguments)
                  : w,
            R = D.invert(T),
            H = typeof N == "function" ? N.apply(this, arguments) : N;
          return n(b(x(D, H), T, R), L, i);
        },
        w,
        O,
      );
    }),
    (v.translateBy = function (E, N, w, O) {
      v.transform(
        E,
        function () {
          return n(
            this.__zoom.translate(
              typeof N == "function" ? N.apply(this, arguments) : N,
              typeof w == "function" ? w.apply(this, arguments) : w,
            ),
            t.apply(this, arguments),
            i,
          );
        },
        null,
        O,
      );
    }),
    (v.translateTo = function (E, N, w, O, L) {
      v.transform(
        E,
        function () {
          var D = t.apply(this, arguments),
            T = this.__zoom,
            R =
              O == null
                ? _(D)
                : typeof O == "function"
                  ? O.apply(this, arguments)
                  : O;
          return n(
            Kt.translate(R[0], R[1])
              .scale(T.k)
              .translate(
                typeof N == "function" ? -N.apply(this, arguments) : -N,
                typeof w == "function" ? -w.apply(this, arguments) : -w,
              ),
            D,
            i,
          );
        },
        O,
        L,
      );
    });
  function x(E, N) {
    return (
      (N = Math.max(s[0], Math.min(s[1], N))),
      N === E.k ? E : new kt(N, E.x, E.y)
    );
  }
  function b(E, N, w) {
    var O = N[0] - w[0] * E.k,
      L = N[1] - w[1] * E.k;
    return O === E.x && L === E.y ? E : new kt(E.k, O, L);
  }
  function _(E) {
    return [(+E[0][0] + +E[1][0]) / 2, (+E[0][1] + +E[1][1]) / 2];
  }
  function C(E, N, w, O) {
    E.on("start.zoom", function () {
      A(this, arguments).event(O).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        A(this, arguments).event(O).end();
      })
      .tween("zoom", function () {
        var L = this,
          D = arguments,
          T = A(L, D).event(O),
          R = t.apply(L, D),
          H = w == null ? _(R) : typeof w == "function" ? w.apply(L, D) : w,
          V = Math.max(R[1][0] - R[0][0], R[1][1] - R[0][1]),
          W = L.__zoom,
          Y = typeof N == "function" ? N.apply(L, D) : N,
          Z = l(W.invert(H).concat(V / W.k), Y.invert(H).concat(V / Y.k));
        return function (X) {
          if (X === 1) X = Y;
          else {
            var Q = Z(X),
              te = V / Q[2];
            X = new kt(te, H[0] - Q[0] * te, H[1] - Q[1] * te);
          }
          T.zoom(null, X);
        };
      });
  }
  function A(E, N, w) {
    return (!w && E.__zooming) || new I(E, N);
  }
  function I(E, N) {
    (this.that = E),
      (this.args = N),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = t.apply(E, N)),
      (this.taps = 0);
  }
  I.prototype = {
    event: function (E) {
      return E && (this.sourceEvent = E), this;
    },
    start: function () {
      return (
        ++this.active === 1 &&
          ((this.that.__zooming = this), this.emit("start")),
        this
      );
    },
    zoom: function (E, N) {
      return (
        this.mouse &&
          E !== "mouse" &&
          (this.mouse[1] = N.invert(this.mouse[0])),
        this.touch0 &&
          E !== "touch" &&
          (this.touch0[1] = N.invert(this.touch0[0])),
        this.touch1 &&
          E !== "touch" &&
          (this.touch1[1] = N.invert(this.touch1[0])),
        (this.that.__zoom = N),
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
    emit: function (E) {
      var N = ut(this.that).datum();
      u.call(
        E,
        this.that,
        new bm(E, {
          sourceEvent: this.sourceEvent,
          target: v,
          type: E,
          transform: this.that.__zoom,
          dispatch: u,
        }),
        N,
      );
    },
  };
  function S(E, ...N) {
    if (!e.apply(this, arguments)) return;
    var w = A(this, N).event(E),
      O = this.__zoom,
      L = Math.max(
        s[0],
        Math.min(s[1], O.k * Math.pow(2, r.apply(this, arguments))),
      ),
      D = Et(E);
    if (w.wheel)
      (w.mouse[0][0] !== D[0] || w.mouse[0][1] !== D[1]) &&
        (w.mouse[1] = O.invert((w.mouse[0] = D))),
        clearTimeout(w.wheel);
    else {
      if (O.k === L) return;
      (w.mouse = [D, O.invert(D)]), ao(this), w.start();
    }
    Xn(E),
      (w.wheel = setTimeout(T, p)),
      w.zoom("mouse", n(b(x(O, L), w.mouse[0], w.mouse[1]), w.extent, i));
    function T() {
      (w.wheel = null), w.end();
    }
  }
  function P(E, ...N) {
    if (f || !e.apply(this, arguments)) return;
    var w = E.currentTarget,
      O = A(this, N, !0).event(E),
      L = ut(E.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", V, !0),
      D = Et(E, w),
      T = E.clientX,
      R = E.clientY;
    su(E.view),
      _s(E),
      (O.mouse = [D, this.__zoom.invert(D)]),
      ao(this),
      O.start();
    function H(W) {
      if ((Xn(W), !O.moved)) {
        var Y = W.clientX - T,
          Z = W.clientY - R;
        O.moved = Y * Y + Z * Z > g;
      }
      O.event(W).zoom(
        "mouse",
        n(b(O.that.__zoom, (O.mouse[0] = Et(W, w)), O.mouse[1]), O.extent, i),
      );
    }
    function V(W) {
      L.on("mousemove.zoom mouseup.zoom", null),
        iu(W.view, O.moved),
        Xn(W),
        O.event(W).end();
    }
  }
  function k(E, ...N) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom,
        O = Et(E.changedTouches ? E.changedTouches[0] : E, this),
        L = w.invert(O),
        D = w.k * (E.shiftKey ? 0.5 : 2),
        T = n(b(x(w, D), O, L), t.apply(this, N), i);
      Xn(E),
        a > 0
          ? ut(this).transition().duration(a).call(C, T, O, E)
          : ut(this).call(v.transform, T, O, E);
    }
  }
  function j(E, ...N) {
    if (e.apply(this, arguments)) {
      var w = E.touches,
        O = w.length,
        L = A(this, N, E.changedTouches.length === O).event(E),
        D,
        T,
        R,
        H;
      for (_s(E), T = 0; T < O; ++T)
        (R = w[T]),
          (H = Et(R, this)),
          (H = [H, this.__zoom.invert(H), R.identifier]),
          L.touch0
            ? !L.touch1 &&
              L.touch0[2] !== H[2] &&
              ((L.touch1 = H), (L.taps = 0))
            : ((L.touch0 = H), (D = !0), (L.taps = 1 + !!c));
      c && (c = clearTimeout(c)),
        D &&
          (L.taps < 2 &&
            ((d = H[0]),
            (c = setTimeout(function () {
              c = null;
            }, h))),
          ao(this),
          L.start());
    }
  }
  function z(E, ...N) {
    if (this.__zooming) {
      var w = A(this, N).event(E),
        O = E.changedTouches,
        L = O.length,
        D,
        T,
        R,
        H;
      for (Xn(E), D = 0; D < L; ++D)
        (T = O[D]),
          (R = Et(T, this)),
          w.touch0 && w.touch0[2] === T.identifier
            ? (w.touch0[0] = R)
            : w.touch1 && w.touch1[2] === T.identifier && (w.touch1[0] = R);
      if (((T = w.that.__zoom), w.touch1)) {
        var V = w.touch0[0],
          W = w.touch0[1],
          Y = w.touch1[0],
          Z = w.touch1[1],
          X = (X = Y[0] - V[0]) * X + (X = Y[1] - V[1]) * X,
          Q = (Q = Z[0] - W[0]) * Q + (Q = Z[1] - W[1]) * Q;
        (T = x(T, Math.sqrt(X / Q))),
          (R = [(V[0] + Y[0]) / 2, (V[1] + Y[1]) / 2]),
          (H = [(W[0] + Z[0]) / 2, (W[1] + Z[1]) / 2]);
      } else if (w.touch0) (R = w.touch0[0]), (H = w.touch0[1]);
      else return;
      w.zoom("touch", n(b(T, R, H), w.extent, i));
    }
  }
  function B(E, ...N) {
    if (this.__zooming) {
      var w = A(this, N).event(E),
        O = E.changedTouches,
        L = O.length,
        D,
        T;
      for (
        _s(E),
          f && clearTimeout(f),
          f = setTimeout(function () {
            f = null;
          }, h),
          D = 0;
        D < L;
        ++D
      )
        (T = O[D]),
          w.touch0 && w.touch0[2] === T.identifier
            ? delete w.touch0
            : w.touch1 && w.touch1[2] === T.identifier && delete w.touch1;
      if (
        (w.touch1 && !w.touch0 && ((w.touch0 = w.touch1), delete w.touch1),
        w.touch0)
      )
        w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (
        (w.end(),
        w.taps === 2 &&
          ((T = Et(T, this)), Math.hypot(d[0] - T[0], d[1] - T[1]) < m))
      ) {
        var R = ut(this).on("dblclick.zoom");
        R && R.apply(this, arguments);
      }
    }
  }
  return (
    (v.wheelDelta = function (E) {
      return arguments.length
        ? ((r = typeof E == "function" ? E : Zr(+E)), v)
        : r;
    }),
    (v.filter = function (E) {
      return arguments.length
        ? ((e = typeof E == "function" ? E : Zr(!!E)), v)
        : e;
    }),
    (v.touchable = function (E) {
      return arguments.length
        ? ((o = typeof E == "function" ? E : Zr(!!E)), v)
        : o;
    }),
    (v.extent = function (E) {
      return arguments.length
        ? ((t =
            typeof E == "function"
              ? E
              : Zr([
                  [+E[0][0], +E[0][1]],
                  [+E[1][0], +E[1][1]],
                ])),
          v)
        : t;
    }),
    (v.scaleExtent = function (E) {
      return arguments.length
        ? ((s[0] = +E[0]), (s[1] = +E[1]), v)
        : [s[0], s[1]];
    }),
    (v.translateExtent = function (E) {
      return arguments.length
        ? ((i[0][0] = +E[0][0]),
          (i[1][0] = +E[1][0]),
          (i[0][1] = +E[0][1]),
          (i[1][1] = +E[1][1]),
          v)
        : [
            [i[0][0], i[0][1]],
            [i[1][0], i[1][1]],
          ];
    }),
    (v.constrain = function (E) {
      return arguments.length ? ((n = E), v) : n;
    }),
    (v.duration = function (E) {
      return arguments.length ? ((a = +E), v) : a;
    }),
    (v.interpolate = function (E) {
      return arguments.length ? ((l = E), v) : l;
    }),
    (v.on = function () {
      var E = u.on.apply(u, arguments);
      return E === u ? v : E;
    }),
    (v.clickDistance = function (E) {
      return arguments.length ? ((g = (E = +E) * E), v) : Math.sqrt(g);
    }),
    (v.tapDistance = function (E) {
      return arguments.length ? ((m = +E), v) : m;
    }),
    v
  );
}
const Vo = pt(null),
  Im = Vo.Provider,
  ht = {
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
  Cu = ht.error001();
function we(e, t) {
  const n = Ze(Vo);
  if (n === null) throw new Error(Cu);
  return Yl(n, e, t);
}
const Pe = () => {
    const e = Ze(Vo);
    if (e === null) throw new Error(Cu);
    return Ie(
      () => ({
        getState: e.getState,
        setState: e.setState,
        subscribe: e.subscribe,
        destroy: e.destroy,
      }),
      [e],
    );
  },
  Om = (e) => (e.userSelectionActive ? "none" : "all");
function xu({ position: e, children: t, className: n, style: r, ...o }) {
  const s = we(Om),
    i = `${e}`.split("-");
  return $.createElement(
    "div",
    {
      className: ze(["react-flow__panel", n, ...i]),
      style: { ...r, pointerEvents: s },
      ...o,
    },
    t,
  );
}
function Rm({ proOptions: e, position: t = "bottom-right" }) {
  return e != null && e.hideAttribution
    ? null
    : $.createElement(
        xu,
        {
          position: t,
          className: "react-flow__attribution",
          "data-message":
            "Please only hide this attribution when you are subscribed to React Flow Pro: https://reactflow.dev/pro",
        },
        $.createElement(
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
const Mm = ({
  x: e,
  y: t,
  label: n,
  labelStyle: r = {},
  labelShowBg: o = !0,
  labelBgStyle: s = {},
  labelBgPadding: i = [2, 4],
  labelBgBorderRadius: a = 2,
  children: l,
  className: u,
  ...c
}) => {
  const d = se(null),
    [f, h] = de({ x: 0, y: 0, width: 0, height: 0 }),
    p = ze(["react-flow__edge-textwrapper", u]);
  return (
    ie(() => {
      if (d.current) {
        const g = d.current.getBBox();
        h({
          x: g.x,
          y: g.y,
          width: g.width,
          height: g.height,
        });
      }
    }, [n]),
    typeof n > "u" || !n
      ? null
      : $.createElement(
          "g",
          {
            transform: `translate(${e - f.width / 2} ${t - f.height / 2})`,
            className: p,
            visibility: f.width ? "visible" : "hidden",
            ...c,
          },
          o &&
            $.createElement("rect", {
              width: f.width + 2 * i[0],
              x: -i[0],
              y: -i[1],
              height: f.height + 2 * i[1],
              className: "react-flow__edge-textbg",
              style: s,
              rx: a,
              ry: a,
            }),
          $.createElement(
            "text",
            {
              className: "react-flow__edge-text",
              y: f.height / 2,
              dy: "0.3em",
              ref: d,
              style: r,
            },
            n,
          ),
          l,
        )
  );
};
var Lm = Ae(Mm);
const ji = (e) => ({
    width: e.offsetWidth,
    height: e.offsetHeight,
  }),
  $n = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n),
  $i = (e = { x: 0, y: 0 }, t) => ({
    x: $n(e.x, t[0][0], t[1][0]),
    y: $n(e.y, t[0][1], t[1][1]),
  }),
  pc = (e, t, n) =>
    e < t
      ? $n(Math.abs(e - t), 1, 50) / 50
      : e > n
        ? -$n(Math.abs(e - n), 1, 50) / 50
        : 0,
  _u = (e, t) => {
    const n = pc(e.x, 35, t.width - 35) * 20,
      r = pc(e.y, 35, t.height - 35) * 20;
    return [n, r];
  },
  bu = (e) => {
    var t;
    return (
      ((t = e.getRootNode) == null ? void 0 : t.call(e)) ||
      (window == null ? void 0 : window.document)
    );
  },
  km = (e, t) => ({
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2),
  }),
  Fi = ({ x: e, y: t, width: n, height: r }) => ({
    x: e,
    y: t,
    x2: e + n,
    y2: t + r,
  }),
  Pm = ({ x: e, y: t, x2: n, y2: r }) => ({
    x: e,
    y: t,
    width: n - e,
    height: r - t,
  }),
  gc = (e) => ({
    ...(e.positionAbsolute || { x: 0, y: 0 }),
    width: e.width || 0,
    height: e.height || 0,
  }),
  Gs = (e, t) => {
    const n = Math.max(
        0,
        Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x),
      ),
      r = Math.max(
        0,
        Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y),
      );
    return Math.ceil(n * r);
  },
  jm = (e) => nt(e.width) && nt(e.height) && nt(e.x) && nt(e.y),
  nt = (e) => !isNaN(e) && isFinite(e),
  Te = Symbol.for("internals"),
  wu = ["Enter", " ", "Escape"],
  Su = (e, t) => {
    process.env.NODE_ENV === "development" &&
      console.warn(`[React Flow]: ${t} Help: https://reactflow.dev/error#${e}`);
  },
  $m = (e) => "nativeEvent" in e;
function Js(e) {
  var o, s;
  const t = $m(e) ? e.nativeEvent : e,
    n =
      ((s = (o = t.composedPath) == null ? void 0 : o.call(t)) == null
        ? void 0
        : s[0]) || e.target;
  return (
    ["INPUT", "SELECT", "TEXTAREA"].includes(n == null ? void 0 : n.nodeName) ||
    (n == null ? void 0 : n.hasAttribute("contenteditable")) ||
    !!(n != null && n.closest(".nokey"))
  );
}
const Nu = (e) => "clientX" in e,
  Gt = (e, t) => {
    var s, i;
    const n = Nu(e),
      r = n ? e.clientX : (s = e.touches) == null ? void 0 : s[0].clientX,
      o = n ? e.clientY : (i = e.touches) == null ? void 0 : i[0].clientY;
    return {
      x: r - ((t == null ? void 0 : t.left) ?? 0),
      y: o - ((t == null ? void 0 : t.top) ?? 0),
    };
  },
  No = () => {
    var e;
    return (
      typeof navigator < "u" &&
      ((e = navigator == null ? void 0 : navigator.userAgent) == null
        ? void 0
        : e.indexOf("Mac")) >= 0
    );
  },
  Wn = ({
    id: e,
    path: t,
    labelX: n,
    labelY: r,
    label: o,
    labelStyle: s,
    labelShowBg: i,
    labelBgStyle: a,
    labelBgPadding: l,
    labelBgBorderRadius: u,
    style: c,
    markerEnd: d,
    markerStart: f,
    interactionWidth: h = 20,
  }) =>
    $.createElement(
      $.Fragment,
      null,
      $.createElement("path", {
        id: e,
        style: c,
        d: t,
        fill: "none",
        className: "react-flow__edge-path",
        markerEnd: d,
        markerStart: f,
      }),
      h &&
        $.createElement("path", {
          d: t,
          fill: "none",
          strokeOpacity: 0,
          strokeWidth: h,
          className: "react-flow__edge-interaction",
        }),
      o && nt(n) && nt(r)
        ? $.createElement(Lm, {
            x: n,
            y: r,
            label: o,
            labelStyle: s,
            labelShowBg: i,
            labelBgStyle: a,
            labelBgPadding: l,
            labelBgBorderRadius: u,
          })
        : null,
    );
Wn.displayName = "BaseEdge";
function Kn(e, t, n) {
  return n === void 0
    ? n
    : (r) => {
        const o = t().edges.find((s) => s.id === e);
        o && n(r, { ...o });
      };
}
function Tu({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const o = Math.abs(n - e) / 2,
    s = n < e ? n + o : n - o,
    i = Math.abs(r - t) / 2,
    a = r < t ? r + i : r - i;
  return [s, a, o, i];
}
function Au({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: r,
  sourceControlX: o,
  sourceControlY: s,
  targetControlX: i,
  targetControlY: a,
}) {
  const l = e * 0.125 + o * 0.375 + i * 0.375 + n * 0.125,
    u = t * 0.125 + s * 0.375 + a * 0.375 + r * 0.125,
    c = Math.abs(l - e),
    d = Math.abs(u - t);
  return [l, u, c, d];
}
var hn;
(function (e) {
  (e.Strict = "strict"), (e.Loose = "loose");
})(hn || (hn = {}));
var ln;
(function (e) {
  (e.Free = "free"), (e.Vertical = "vertical"), (e.Horizontal = "horizontal");
})(ln || (ln = {}));
var mr;
(function (e) {
  (e.Partial = "partial"), (e.Full = "full");
})(mr || (mr = {}));
var qt;
(function (e) {
  (e.Bezier = "default"),
    (e.Straight = "straight"),
    (e.Step = "step"),
    (e.SmoothStep = "smoothstep"),
    (e.SimpleBezier = "simplebezier");
})(qt || (qt = {}));
var To;
(function (e) {
  (e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed");
})(To || (To = {}));
var ne;
(function (e) {
  (e.Left = "left"),
    (e.Top = "top"),
    (e.Right = "right"),
    (e.Bottom = "bottom");
})(ne || (ne = {}));
function mc({ pos: e, x1: t, y1: n, x2: r, y2: o }) {
  return e === ne.Left || e === ne.Right
    ? [0.5 * (t + r), n]
    : [t, 0.5 * (n + o)];
}
function Du({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = ne.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: s = ne.Top,
}) {
  const [i, a] = mc({
      pos: n,
      x1: e,
      y1: t,
      x2: r,
      y2: o,
    }),
    [l, u] = mc({
      pos: s,
      x1: r,
      y1: o,
      x2: e,
      y2: t,
    }),
    [c, d, f, h] = Au({
      sourceX: e,
      sourceY: t,
      targetX: r,
      targetY: o,
      sourceControlX: i,
      sourceControlY: a,
      targetControlX: l,
      targetControlY: u,
    });
  return [`M${e},${t} C${i},${a} ${l},${u} ${r},${o}`, c, d, f, h];
}
const Hi = Ae(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
    sourcePosition: o = ne.Bottom,
    targetPosition: s = ne.Top,
    label: i,
    labelStyle: a,
    labelShowBg: l,
    labelBgStyle: u,
    labelBgPadding: c,
    labelBgBorderRadius: d,
    style: f,
    markerEnd: h,
    markerStart: p,
    interactionWidth: g,
  }) => {
    const [m, v, x] = Du({
      sourceX: e,
      sourceY: t,
      sourcePosition: o,
      targetX: n,
      targetY: r,
      targetPosition: s,
    });
    return $.createElement(Wn, {
      path: m,
      labelX: v,
      labelY: x,
      label: i,
      labelStyle: a,
      labelShowBg: l,
      labelBgStyle: u,
      labelBgPadding: c,
      labelBgBorderRadius: d,
      style: f,
      markerEnd: h,
      markerStart: p,
      interactionWidth: g,
    });
  },
);
Hi.displayName = "SimpleBezierEdge";
const yc = {
    [ne.Left]: { x: -1, y: 0 },
    [ne.Right]: { x: 1, y: 0 },
    [ne.Top]: { x: 0, y: -1 },
    [ne.Bottom]: { x: 0, y: 1 },
  },
  Fm = ({ source: e, sourcePosition: t = ne.Bottom, target: n }) =>
    t === ne.Left || t === ne.Right
      ? e.x < n.x
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 }
      : e.y < n.y
        ? { x: 0, y: 1 }
        : { x: 0, y: -1 },
  vc = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function Hm({
  source: e,
  sourcePosition: t = ne.Bottom,
  target: n,
  targetPosition: r = ne.Top,
  center: o,
  offset: s,
}) {
  const i = yc[t],
    a = yc[r],
    l = { x: e.x + i.x * s, y: e.y + i.y * s },
    u = { x: n.x + a.x * s, y: n.y + a.y * s },
    c = Fm({
      source: l,
      sourcePosition: t,
      target: u,
    }),
    d = c.x !== 0 ? "x" : "y",
    f = c[d];
  let h = [],
    p,
    g;
  const m = { x: 0, y: 0 },
    v = { x: 0, y: 0 },
    [x, b, _, C] = Tu({
      sourceX: e.x,
      sourceY: e.y,
      targetX: n.x,
      targetY: n.y,
    });
  if (i[d] * a[d] === -1) {
    (p = o.x ?? x), (g = o.y ?? b);
    const I = [
        { x: p, y: l.y },
        { x: p, y: u.y },
      ],
      S = [
        { x: l.x, y: g },
        { x: u.x, y: g },
      ];
    i[d] === f ? (h = d === "x" ? I : S) : (h = d === "x" ? S : I);
  } else {
    const I = [{ x: l.x, y: u.y }],
      S = [{ x: u.x, y: l.y }];
    if (
      (d === "x" ? (h = i.x === f ? S : I) : (h = i.y === f ? I : S), t === r)
    ) {
      const B = Math.abs(e[d] - n[d]);
      if (B <= s) {
        const E = Math.min(s - 1, s - B);
        i[d] === f
          ? (m[d] = (l[d] > e[d] ? -1 : 1) * E)
          : (v[d] = (u[d] > n[d] ? -1 : 1) * E);
      }
    }
    if (t !== r) {
      const B = d === "x" ? "y" : "x",
        E = i[d] === a[B],
        N = l[B] > u[B],
        w = l[B] < u[B];
      ((i[d] === 1 && ((!E && N) || (E && w))) ||
        (i[d] !== 1 && ((!E && w) || (E && N)))) &&
        (h = d === "x" ? I : S);
    }
    const P = { x: l.x + m.x, y: l.y + m.y },
      k = { x: u.x + v.x, y: u.y + v.y },
      j = Math.max(Math.abs(P.x - h[0].x), Math.abs(k.x - h[0].x)),
      z = Math.max(Math.abs(P.y - h[0].y), Math.abs(k.y - h[0].y));
    j >= z
      ? ((p = (P.x + k.x) / 2), (g = h[0].y))
      : ((p = h[0].x), (g = (P.y + k.y) / 2));
  }
  return [
    [
      e,
      { x: l.x + m.x, y: l.y + m.y },
      ...h,
      { x: u.x + v.x, y: u.y + v.y },
      n,
    ],
    p,
    g,
    _,
    C,
  ];
}
function Bm(e, t, n, r) {
  const o = Math.min(vc(e, t) / 2, vc(t, n) / 2, r),
    { x: s, y: i } = t;
  if ((e.x === s && s === n.x) || (e.y === i && i === n.y)) return `L${s} ${i}`;
  if (e.y === i) {
    const u = e.x < n.x ? -1 : 1,
      c = e.y < n.y ? 1 : -1;
    return `L ${s + o * u},${i}Q ${s},${i} ${s},${i + o * c}`;
  }
  const a = e.x < n.x ? 1 : -1,
    l = e.y < n.y ? -1 : 1;
  return `L ${s},${i + o * l}Q ${s},${i} ${s + o * a},${i}`;
}
function Qs({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = ne.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: s = ne.Top,
  borderRadius: i = 5,
  centerX: a,
  centerY: l,
  offset: u = 20,
}) {
  const [c, d, f, h, p] = Hm({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: r, y: o },
    targetPosition: s,
    center: { x: a, y: l },
    offset: u,
  });
  return [
    c.reduce((m, v, x) => {
      let b = "";
      return (
        x > 0 && x < c.length - 1
          ? (b = Bm(c[x - 1], v, c[x + 1], i))
          : (b = `${x === 0 ? "M" : "L"}${v.x} ${v.y}`),
        (m += b),
        m
      );
    }, ""),
    d,
    f,
    h,
    p,
  ];
}
const Wo = Ae(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
    label: o,
    labelStyle: s,
    labelShowBg: i,
    labelBgStyle: a,
    labelBgPadding: l,
    labelBgBorderRadius: u,
    style: c,
    sourcePosition: d = ne.Bottom,
    targetPosition: f = ne.Top,
    markerEnd: h,
    markerStart: p,
    pathOptions: g,
    interactionWidth: m,
  }) => {
    const [v, x, b] = Qs({
      sourceX: e,
      sourceY: t,
      sourcePosition: d,
      targetX: n,
      targetY: r,
      targetPosition: f,
      borderRadius: g == null ? void 0 : g.borderRadius,
      offset: g == null ? void 0 : g.offset,
    });
    return $.createElement(Wn, {
      path: v,
      labelX: x,
      labelY: b,
      label: o,
      labelStyle: s,
      labelShowBg: i,
      labelBgStyle: a,
      labelBgPadding: l,
      labelBgBorderRadius: u,
      style: c,
      markerEnd: h,
      markerStart: p,
      interactionWidth: m,
    });
  },
);
Wo.displayName = "SmoothStepEdge";
const Bi = Ae((e) => {
  var t;
  return $.createElement(Wo, {
    ...e,
    pathOptions: Ie(() => {
      var n;
      return {
        borderRadius: 0,
        offset: (n = e.pathOptions) == null ? void 0 : n.offset,
      };
    }, [(t = e.pathOptions) == null ? void 0 : t.offset]),
  });
});
Bi.displayName = "StepEdge";
function zm({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const [o, s, i, a] = Tu({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
  });
  return [`M ${e},${t}L ${n},${r}`, o, s, i, a];
}
const zi = Ae(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
    label: o,
    labelStyle: s,
    labelShowBg: i,
    labelBgStyle: a,
    labelBgPadding: l,
    labelBgBorderRadius: u,
    style: c,
    markerEnd: d,
    markerStart: f,
    interactionWidth: h,
  }) => {
    const [p, g, m] = zm({ sourceX: e, sourceY: t, targetX: n, targetY: r });
    return $.createElement(Wn, {
      path: p,
      labelX: g,
      labelY: m,
      label: o,
      labelStyle: s,
      labelShowBg: i,
      labelBgStyle: a,
      labelBgPadding: l,
      labelBgBorderRadius: u,
      style: c,
      markerEnd: d,
      markerStart: f,
      interactionWidth: h,
    });
  },
);
zi.displayName = "StraightEdge";
function qr(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function Ec({ pos: e, x1: t, y1: n, x2: r, y2: o, c: s }) {
  switch (e) {
    case ne.Left:
      return [t - qr(t - r, s), n];
    case ne.Right:
      return [t + qr(r - t, s), n];
    case ne.Top:
      return [t, n - qr(n - o, s)];
    case ne.Bottom:
      return [t, n + qr(o - n, s)];
  }
}
function Iu({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = ne.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: s = ne.Top,
  curvature: i = 0.25,
}) {
  const [a, l] = Ec({
      pos: n,
      x1: e,
      y1: t,
      x2: r,
      y2: o,
      c: i,
    }),
    [u, c] = Ec({
      pos: s,
      x1: r,
      y1: o,
      x2: e,
      y2: t,
      c: i,
    }),
    [d, f, h, p] = Au({
      sourceX: e,
      sourceY: t,
      targetX: r,
      targetY: o,
      sourceControlX: a,
      sourceControlY: l,
      targetControlX: u,
      targetControlY: c,
    });
  return [`M${e},${t} C${a},${l} ${u},${c} ${r},${o}`, d, f, h, p];
}
const Ao = Ae(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
    sourcePosition: o = ne.Bottom,
    targetPosition: s = ne.Top,
    label: i,
    labelStyle: a,
    labelShowBg: l,
    labelBgStyle: u,
    labelBgPadding: c,
    labelBgBorderRadius: d,
    style: f,
    markerEnd: h,
    markerStart: p,
    pathOptions: g,
    interactionWidth: m,
  }) => {
    const [v, x, b] = Iu({
      sourceX: e,
      sourceY: t,
      sourcePosition: o,
      targetX: n,
      targetY: r,
      targetPosition: s,
      curvature: g == null ? void 0 : g.curvature,
    });
    return $.createElement(Wn, {
      path: v,
      labelX: x,
      labelY: b,
      label: i,
      labelStyle: a,
      labelShowBg: l,
      labelBgStyle: u,
      labelBgPadding: c,
      labelBgBorderRadius: d,
      style: f,
      markerEnd: h,
      markerStart: p,
      interactionWidth: m,
    });
  },
);
Ao.displayName = "BezierEdge";
const Vi = pt(null),
  Vm = Vi.Provider;
Vi.Consumer;
const Wm = () => Ze(Vi),
  Um = (e) => "id" in e && "source" in e && "target" in e,
  Ym = (e) => "id" in e && !("source" in e) && !("target" in e),
  Zm = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) =>
    `reactflow__edge-${e}${t || ""}-${n}${r || ""}`,
  ei = (e, t) =>
    typeof e > "u"
      ? ""
      : typeof e == "string"
        ? e
        : `${t ? `${t}__` : ""}${Object.keys(e)
            .sort()
            .map((r) => `${r}=${e[r]}`)
            .join("&")}`,
  qm = (e, t) =>
    t.some(
      (n) =>
        n.source === e.source &&
        n.target === e.target &&
        (n.sourceHandle === e.sourceHandle ||
          (!n.sourceHandle && !e.sourceHandle)) &&
        (n.targetHandle === e.targetHandle ||
          (!n.targetHandle && !e.targetHandle)),
    ),
  Xm = (e, t) => {
    if (!e.source || !e.target) return Su("006", ht.error006()), t;
    let n;
    return (
      Um(e)
        ? (n = { ...e })
        : (n = {
            ...e,
            id: Zm(e),
          }),
      qm(n, t) ? t : t.concat(n)
    );
  },
  ti = ({ x: e, y: t }, [n, r, o], s, [i, a]) => {
    const l = {
      x: (e - n) / o,
      y: (t - r) / o,
    };
    return s
      ? {
          x: i * Math.round(l.x / i),
          y: a * Math.round(l.y / a),
        }
      : l;
  },
  Ou = ({ x: e, y: t }, [n, r, o]) => ({
    x: e * o + n,
    y: t * o + r,
  }),
  Dn = (e, t = [0, 0]) => {
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
      r = (e.height ?? 0) * t[1],
      o = {
        x: e.position.x - n,
        y: e.position.y - r,
      };
    return {
      ...o,
      positionAbsolute: e.positionAbsolute
        ? {
            x: e.positionAbsolute.x - n,
            y: e.positionAbsolute.y - r,
          }
        : o,
    };
  },
  Wi = (e, t = [0, 0]) => {
    if (e.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    const n = e.reduce(
      (r, o) => {
        const { x: s, y: i } = Dn(o, t).positionAbsolute;
        return km(
          r,
          Fi({
            x: s,
            y: i,
            width: o.width || 0,
            height: o.height || 0,
          }),
        );
      },
      { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
    );
    return Pm(n);
  },
  Ru = (e, t, [n, r, o] = [0, 0, 1], s = !1, i = !1, a = [0, 0]) => {
    const l = {
        x: (t.x - n) / o,
        y: (t.y - r) / o,
        width: t.width / o,
        height: t.height / o,
      },
      u = [];
    return (
      e.forEach((c) => {
        const { width: d, height: f, selectable: h = !0, hidden: p = !1 } = c;
        if ((i && !h) || p) return !1;
        const { positionAbsolute: g } = Dn(c, a),
          m = {
            x: g.x,
            y: g.y,
            width: d || 0,
            height: f || 0,
          },
          v = Gs(l, m),
          x = typeof d > "u" || typeof f > "u" || d === null || f === null,
          b = s && v > 0,
          _ = (d || 0) * (f || 0);
        (x || b || v >= _ || c.dragging) && u.push(c);
      }),
      u
    );
  },
  Mu = (e, t) => {
    const n = e.map((r) => r.id);
    return t.filter((r) => n.includes(r.source) || n.includes(r.target));
  },
  Lu = (e, t, n, r, o, s = 0.1) => {
    const i = t / (e.width * (1 + s)),
      a = n / (e.height * (1 + s)),
      l = Math.min(i, a),
      u = $n(l, r, o),
      c = e.x + e.width / 2,
      d = e.y + e.height / 2,
      f = t / 2 - c * u,
      h = n / 2 - d * u;
    return { x: f, y: h, zoom: u };
  },
  on = (e, t = 0) => e.transition().duration(t);
function Cc(e, t, n, r) {
  return (t[n] || []).reduce((o, s) => {
    var i, a;
    return (
      `${e.id}-${s.id}-${n}` !== r &&
        o.push({
          id: s.id || null,
          type: n,
          nodeId: e.id,
          x:
            (((i = e.positionAbsolute) == null ? void 0 : i.x) ?? 0) +
            s.x +
            s.width / 2,
          y:
            (((a = e.positionAbsolute) == null ? void 0 : a.y) ?? 0) +
            s.y +
            s.height / 2,
        }),
      o
    );
  }, []);
}
function Km(e, t, n, r, o, s) {
  const { x: i, y: a } = Gt(e),
    u = t
      .elementsFromPoint(i, a)
      .find((p) => p.classList.contains("react-flow__handle"));
  if (u) {
    const p = u.getAttribute("data-nodeid");
    if (p) {
      const g = Ui(void 0, u),
        m = u.getAttribute("data-handleid"),
        v = s({ nodeId: p, id: m, type: g });
      if (v) {
        const x = o.find((b) => b.nodeId === p && b.type === g && b.id === m);
        return {
          handle: {
            id: m,
            type: g,
            nodeId: p,
            x: (x == null ? void 0 : x.x) || n.x,
            y: (x == null ? void 0 : x.y) || n.y,
          },
          validHandleResult: v,
        };
      }
    }
  }
  let c = [],
    d = 1 / 0;
  if (
    (o.forEach((p) => {
      const g = Math.sqrt((p.x - n.x) ** 2 + (p.y - n.y) ** 2);
      if (g <= r) {
        const m = s(p);
        g <= d &&
          (g < d
            ? (c = [{ handle: p, validHandleResult: m }])
            : g === d &&
              c.push({
                handle: p,
                validHandleResult: m,
              }),
          (d = g));
      }
    }),
    !c.length)
  )
    return { handle: null, validHandleResult: ku() };
  if (c.length === 1) return c[0];
  const f = c.some(({ validHandleResult: p }) => p.isValid),
    h = c.some(({ handle: p }) => p.type === "target");
  return (
    c.find(({ handle: p, validHandleResult: g }) =>
      h ? p.type === "target" : f ? g.isValid : !0,
    ) || c[0]
  );
}
const Gm = {
    source: null,
    target: null,
    sourceHandle: null,
    targetHandle: null,
  },
  ku = () => ({
    handleDomNode: null,
    isValid: !1,
    connection: Gm,
    endHandle: null,
  });
function Pu(e, t, n, r, o, s, i) {
  const a = o === "target",
    l = i.querySelector(
      `.react-flow__handle[data-id="${e == null ? void 0 : e.nodeId}-${e == null ? void 0 : e.id}-${e == null ? void 0 : e.type}"]`,
    ),
    u = {
      ...ku(),
      handleDomNode: l,
    };
  if (l) {
    const c = Ui(void 0, l),
      d = l.getAttribute("data-nodeid"),
      f = l.getAttribute("data-handleid"),
      h = l.classList.contains("connectable"),
      p = l.classList.contains("connectableend"),
      g = {
        source: a ? d : n,
        sourceHandle: a ? f : r,
        target: a ? n : d,
        targetHandle: a ? r : f,
      };
    (u.connection = g),
      h &&
        p &&
        (t === hn.Strict
          ? (a && c === "source") || (!a && c === "target")
          : d !== n || f !== r) &&
        ((u.endHandle = {
          nodeId: d,
          handleId: f,
          type: c,
        }),
        (u.isValid = s(g)));
  }
  return u;
}
function Jm({ nodes: e, nodeId: t, handleId: n, handleType: r }) {
  return e.reduce((o, s) => {
    if (s[Te]) {
      const { handleBounds: i } = s[Te];
      let a = [],
        l = [];
      i &&
        ((a = Cc(s, i, "source", `${t}-${n}-${r}`)),
        (l = Cc(s, i, "target", `${t}-${n}-${r}`))),
        o.push(...a, ...l);
    }
    return o;
  }, []);
}
function Ui(e, t) {
  return (
    e ||
    (t != null && t.classList.contains("target")
      ? "target"
      : t != null && t.classList.contains("source")
        ? "source"
        : null)
  );
}
function bs(e) {
  e == null ||
    e.classList.remove(
      "valid",
      "connecting",
      "react-flow__handle-valid",
      "react-flow__handle-connecting",
    );
}
function Qm(e, t) {
  let n = null;
  return t ? (n = "valid") : e && !t && (n = "invalid"), n;
}
function ju({
  event: e,
  handleId: t,
  nodeId: n,
  onConnect: r,
  isTarget: o,
  getState: s,
  setState: i,
  isValidConnection: a,
  edgeUpdaterType: l,
  onEdgeUpdateEnd: u,
}) {
  const c = bu(e.target),
    {
      connectionMode: d,
      domNode: f,
      autoPanOnConnect: h,
      connectionRadius: p,
      onConnectStart: g,
      panBy: m,
      getNodes: v,
      cancelConnection: x,
    } = s();
  let b = 0,
    _;
  const { x: C, y: A } = Gt(e),
    I = c == null ? void 0 : c.elementFromPoint(C, A),
    S = Ui(l, I),
    P = f == null ? void 0 : f.getBoundingClientRect();
  if (!P || !S) return;
  let k,
    j = Gt(e, P),
    z = !1,
    B = null,
    E = !1,
    N = null;
  const w = Jm({
      nodes: v(),
      nodeId: n,
      handleId: t,
      handleType: S,
    }),
    O = () => {
      if (!h) return;
      const [T, R] = _u(j, P);
      m({ x: T, y: R }), (b = requestAnimationFrame(O));
    };
  i({
    connectionPosition: j,
    connectionStatus: null,
    // connectionNodeId etc will be removed in the next major in favor of connectionStartHandle
    connectionNodeId: n,
    connectionHandleId: t,
    connectionHandleType: S,
    connectionStartHandle: {
      nodeId: n,
      handleId: t,
      type: S,
    },
    connectionEndHandle: null,
  }),
    g == null || g(e, { nodeId: n, handleId: t, handleType: S });
  function L(T) {
    const { transform: R } = s();
    j = Gt(T, P);
    const { handle: H, validHandleResult: V } = Km(
      T,
      c,
      ti(j, R, !1, [1, 1]),
      p,
      w,
      (W) => Pu(W, d, n, t, o ? "target" : "source", a, c),
    );
    if (
      ((_ = H),
      z || (O(), (z = !0)),
      (N = V.handleDomNode),
      (B = V.connection),
      (E = V.isValid),
      i({
        connectionPosition:
          _ && E
            ? Ou(
                {
                  x: _.x,
                  y: _.y,
                },
                R,
              )
            : j,
        connectionStatus: Qm(!!_, E),
        connectionEndHandle: V.endHandle,
      }),
      !_ && !E && !N)
    )
      return bs(k);
    B.source !== B.target &&
      N &&
      (bs(k),
      (k = N),
      N.classList.add("connecting", "react-flow__handle-connecting"),
      N.classList.toggle("valid", E),
      N.classList.toggle("react-flow__handle-valid", E));
  }
  function D(T) {
    var R, H;
    (_ || N) && B && E && (r == null || r(B)),
      (H = (R = s()).onConnectEnd) == null || H.call(R, T),
      l && (u == null || u(T)),
      bs(k),
      x(),
      cancelAnimationFrame(b),
      (z = !1),
      (E = !1),
      (B = null),
      (N = null),
      c.removeEventListener("mousemove", L),
      c.removeEventListener("mouseup", D),
      c.removeEventListener("touchmove", L),
      c.removeEventListener("touchend", D);
  }
  c.addEventListener("mousemove", L),
    c.addEventListener("mouseup", D),
    c.addEventListener("touchmove", L),
    c.addEventListener("touchend", D);
}
const xc = () => !0,
  e6 = (e) => ({
    connectionStartHandle: e.connectionStartHandle,
    connectOnClick: e.connectOnClick,
    noPanClassName: e.noPanClassName,
  }),
  t6 = (e, t, n) => (r) => {
    const {
      connectionStartHandle: o,
      connectionEndHandle: s,
      connectionClickStartHandle: i,
    } = r;
    return {
      connecting:
        ((o == null ? void 0 : o.nodeId) === e &&
          (o == null ? void 0 : o.handleId) === t &&
          (o == null ? void 0 : o.type) === n) ||
        ((s == null ? void 0 : s.nodeId) === e &&
          (s == null ? void 0 : s.handleId) === t &&
          (s == null ? void 0 : s.type) === n),
      clickConnecting:
        (i == null ? void 0 : i.nodeId) === e &&
        (i == null ? void 0 : i.handleId) === t &&
        (i == null ? void 0 : i.type) === n,
    };
  },
  $u = Zc(
    (
      {
        type: e = "source",
        position: t = ne.Top,
        isValidConnection: n,
        isConnectable: r = !0,
        isConnectableStart: o = !0,
        isConnectableEnd: s = !0,
        id: i,
        onConnect: a,
        children: l,
        className: u,
        onMouseDown: c,
        onTouchStart: d,
        ...f
      },
      h,
    ) => {
      var P, k;
      const p = i || null,
        g = e === "target",
        m = Pe(),
        v = Wm(),
        { connectOnClick: x, noPanClassName: b } = we(e6, $e),
        { connecting: _, clickConnecting: C } = we(t6(v, p, e), $e);
      v ||
        (k = (P = m.getState()).onError) == null ||
        k.call(P, "010", ht.error010());
      const A = (j) => {
          const {
              defaultEdgeOptions: z,
              onConnect: B,
              hasDefaultEdges: E,
            } = m.getState(),
            N = {
              ...z,
              ...j,
            };
          if (E) {
            const { edges: w, setEdges: O } = m.getState();
            O(Xm(N, w));
          }
          B == null || B(N), a == null || a(N);
        },
        I = (j) => {
          if (!v) return;
          const z = Nu(j);
          o &&
            ((z && j.button === 0) || !z) &&
            ju({
              event: j,
              handleId: p,
              nodeId: v,
              onConnect: A,
              isTarget: g,
              getState: m.getState,
              setState: m.setState,
              isValidConnection: n || m.getState().isValidConnection || xc,
            }),
            z ? c == null || c(j) : d == null || d(j);
        },
        S = (j) => {
          const {
            onClickConnectStart: z,
            onClickConnectEnd: B,
            connectionClickStartHandle: E,
            connectionMode: N,
            isValidConnection: w,
          } = m.getState();
          if (!v || (!E && !o)) return;
          if (!E) {
            z == null || z(j, { nodeId: v, handleId: p, handleType: e }),
              m.setState({
                connectionClickStartHandle: { nodeId: v, type: e, handleId: p },
              });
            return;
          }
          const O = bu(j.target),
            L = n || w || xc,
            { connection: D, isValid: T } = Pu(
              {
                nodeId: v,
                id: p,
                type: e,
              },
              N,
              E.nodeId,
              E.handleId || null,
              E.type,
              L,
              O,
            );
          T && A(D),
            B == null || B(j),
            m.setState({ connectionClickStartHandle: null });
        };
      return $.createElement(
        "div",
        {
          "data-handleid": p,
          "data-nodeid": v,
          "data-handlepos": t,
          "data-id": `${v}-${p}-${e}`,
          className: ze([
            "react-flow__handle",
            `react-flow__handle-${t}`,
            "nodrag",
            b,
            u,
            {
              source: !g,
              target: g,
              connectable: r,
              connectablestart: o,
              connectableend: s,
              connecting: C,
              // this class is used to style the handle when the user is connecting
              connectionindicator: r && ((o && !_) || (s && _)),
            },
          ]),
          onMouseDown: I,
          onTouchStart: I,
          onClick: x ? S : void 0,
          ref: h,
          ...f,
        },
        l,
      );
    },
  );
$u.displayName = "Handle";
var Xt = Ae($u);
const Fu = ({
  data: e,
  isConnectable: t,
  targetPosition: n = ne.Top,
  sourcePosition: r = ne.Bottom,
}) =>
  $.createElement(
    $.Fragment,
    null,
    $.createElement(Xt, { type: "target", position: n, isConnectable: t }),
    e == null ? void 0 : e.label,
    $.createElement(Xt, { type: "source", position: r, isConnectable: t }),
  );
Fu.displayName = "DefaultNode";
var ni = Ae(Fu);
const Hu = ({ data: e, isConnectable: t, sourcePosition: n = ne.Bottom }) =>
  $.createElement(
    $.Fragment,
    null,
    e == null ? void 0 : e.label,
    $.createElement(Xt, { type: "source", position: n, isConnectable: t }),
  );
Hu.displayName = "InputNode";
var Bu = Ae(Hu);
const zu = ({ data: e, isConnectable: t, targetPosition: n = ne.Top }) =>
  $.createElement(
    $.Fragment,
    null,
    $.createElement(Xt, { type: "target", position: n, isConnectable: t }),
    e == null ? void 0 : e.label,
  );
zu.displayName = "OutputNode";
var Vu = Ae(zu);
const Yi = () => null;
Yi.displayName = "GroupNode";
const n6 = (e) => ({
    selectedNodes: e.getNodes().filter((t) => t.selected),
    selectedEdges: e.edges.filter((t) => t.selected).map((t) => ({ ...t })),
  }),
  Xr = (e) => e.id;
function r6(e, t) {
  return (
    $e(e.selectedNodes.map(Xr), t.selectedNodes.map(Xr)) &&
    $e(e.selectedEdges.map(Xr), t.selectedEdges.map(Xr))
  );
}
const Wu = Ae(({ onSelectionChange: e }) => {
  const t = Pe(),
    { selectedNodes: n, selectedEdges: r } = we(n6, r6);
  return (
    ie(() => {
      const o = { nodes: n, edges: r };
      e == null || e(o), t.getState().onSelectionChange.forEach((s) => s(o));
    }, [n, r, e]),
    null
  );
});
Wu.displayName = "SelectionListener";
const o6 = (e) => !!e.onSelectionChange;
function s6({ onSelectionChange: e }) {
  const t = we(o6);
  return e || t ? $.createElement(Wu, { onSelectionChange: e }) : null;
}
const i6 = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
});
function Cn(e, t) {
  ie(() => {
    typeof e < "u" && t(e);
  }, [e]);
}
function le(e, t, n) {
  ie(() => {
    typeof t < "u" && n({ [e]: t });
  }, [t]);
}
const a6 = ({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: r,
    onConnect: o,
    onConnectStart: s,
    onConnectEnd: i,
    onClickConnectStart: a,
    onClickConnectEnd: l,
    nodesDraggable: u,
    nodesConnectable: c,
    nodesFocusable: d,
    edgesFocusable: f,
    edgesUpdatable: h,
    elevateNodesOnSelect: p,
    minZoom: g,
    maxZoom: m,
    nodeExtent: v,
    onNodesChange: x,
    onEdgesChange: b,
    elementsSelectable: _,
    connectionMode: C,
    snapGrid: A,
    snapToGrid: I,
    translateExtent: S,
    connectOnClick: P,
    defaultEdgeOptions: k,
    fitView: j,
    fitViewOptions: z,
    onNodesDelete: B,
    onEdgesDelete: E,
    onNodeDrag: N,
    onNodeDragStart: w,
    onNodeDragStop: O,
    onSelectionDrag: L,
    onSelectionDragStart: D,
    onSelectionDragStop: T,
    noPanClassName: R,
    nodeOrigin: H,
    rfId: V,
    autoPanOnConnect: W,
    autoPanOnNodeDrag: Y,
    onError: Z,
    connectionRadius: X,
    isValidConnection: Q,
    nodeDragThreshold: te,
  }) => {
    const {
        setNodes: K,
        setEdges: fe,
        setDefaultNodesAndEdges: q,
        setMinZoom: ve,
        setMaxZoom: je,
        setTranslateExtent: _e,
        setNodeExtent: Fe,
        reset: Ce,
      } = we(i6, $e),
      re = Pe();
    return (
      ie(() => {
        const Me = r == null ? void 0 : r.map((Tt) => ({ ...Tt, ...k }));
        return (
          q(n, Me),
          () => {
            Ce();
          }
        );
      }, []),
      le("defaultEdgeOptions", k, re.setState),
      le("connectionMode", C, re.setState),
      le("onConnect", o, re.setState),
      le("onConnectStart", s, re.setState),
      le("onConnectEnd", i, re.setState),
      le("onClickConnectStart", a, re.setState),
      le("onClickConnectEnd", l, re.setState),
      le("nodesDraggable", u, re.setState),
      le("nodesConnectable", c, re.setState),
      le("nodesFocusable", d, re.setState),
      le("edgesFocusable", f, re.setState),
      le("edgesUpdatable", h, re.setState),
      le("elementsSelectable", _, re.setState),
      le("elevateNodesOnSelect", p, re.setState),
      le("snapToGrid", I, re.setState),
      le("snapGrid", A, re.setState),
      le("onNodesChange", x, re.setState),
      le("onEdgesChange", b, re.setState),
      le("connectOnClick", P, re.setState),
      le("fitViewOnInit", j, re.setState),
      le("fitViewOnInitOptions", z, re.setState),
      le("onNodesDelete", B, re.setState),
      le("onEdgesDelete", E, re.setState),
      le("onNodeDrag", N, re.setState),
      le("onNodeDragStart", w, re.setState),
      le("onNodeDragStop", O, re.setState),
      le("onSelectionDrag", L, re.setState),
      le("onSelectionDragStart", D, re.setState),
      le("onSelectionDragStop", T, re.setState),
      le("noPanClassName", R, re.setState),
      le("nodeOrigin", H, re.setState),
      le("rfId", V, re.setState),
      le("autoPanOnConnect", W, re.setState),
      le("autoPanOnNodeDrag", Y, re.setState),
      le("onError", Z, re.setState),
      le("connectionRadius", X, re.setState),
      le("isValidConnection", Q, re.setState),
      le("nodeDragThreshold", te, re.setState),
      Cn(e, K),
      Cn(t, fe),
      Cn(g, ve),
      Cn(m, je),
      Cn(S, _e),
      Cn(v, Fe),
      null
    );
  },
  _c = { display: "none" },
  c6 = {
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
  Uu = "react-flow__node-desc",
  Yu = "react-flow__edge-desc",
  l6 = "react-flow__aria-live",
  u6 = (e) => e.ariaLiveMessage;
function d6({ rfId: e }) {
  const t = we(u6);
  return $.createElement(
    "div",
    {
      id: `${l6}-${e}`,
      "aria-live": "assertive",
      "aria-atomic": "true",
      style: c6,
    },
    t,
  );
}
function f6({ rfId: e, disableKeyboardA11y: t }) {
  return $.createElement(
    $.Fragment,
    null,
    $.createElement(
      "div",
      { id: `${Uu}-${e}`, style: _c },
      "Press enter or space to select a node.",
      !t && "You can then use the arrow keys to move the node around.",
      " Press delete to remove it and escape to cancel.",
      " ",
    ),
    $.createElement(
      "div",
      { id: `${Yu}-${e}`, style: _c },
      "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
    ),
    !t && $.createElement(d6, { rfId: e }),
  );
}
var yr = (e = null, t = { actInsideInputWithModifier: !0 }) => {
  const [n, r] = de(!1),
    o = se(!1),
    s = se(/* @__PURE__ */ new Set([])),
    [i, a] = Ie(() => {
      if (e !== null) {
        const u = (Array.isArray(e) ? e : [e])
            .filter((d) => typeof d == "string")
            .map((d) => d.split("+")),
          c = u.reduce((d, f) => d.concat(...f), []);
        return [u, c];
      }
      return [[], []];
    }, [e]);
  return (
    ie(() => {
      const l = typeof document < "u" ? document : null,
        u = (t == null ? void 0 : t.target) || l;
      if (e !== null) {
        const c = (h) => {
            if (
              ((o.current = h.ctrlKey || h.metaKey || h.shiftKey),
              (!o.current || (o.current && !t.actInsideInputWithModifier)) &&
                Js(h))
            )
              return !1;
            const g = wc(h.code, a);
            s.current.add(h[g]),
              bc(i, s.current, !1) && (h.preventDefault(), r(!0));
          },
          d = (h) => {
            if (
              (!o.current || (o.current && !t.actInsideInputWithModifier)) &&
              Js(h)
            )
              return !1;
            const g = wc(h.code, a);
            bc(i, s.current, !0)
              ? (r(!1), s.current.clear())
              : s.current.delete(h[g]),
              h.key === "Meta" && s.current.clear(),
              (o.current = !1);
          },
          f = () => {
            s.current.clear(), r(!1);
          };
        return (
          u == null || u.addEventListener("keydown", c),
          u == null || u.addEventListener("keyup", d),
          window.addEventListener("blur", f),
          () => {
            u == null || u.removeEventListener("keydown", c),
              u == null || u.removeEventListener("keyup", d),
              window.removeEventListener("blur", f);
          }
        );
      }
    }, [e, r]),
    n
  );
};
function bc(e, t, n) {
  return e
    .filter((r) => n || r.length === t.size)
    .some((r) => r.every((o) => t.has(o)));
}
function wc(e, t) {
  return t.includes(e) ? "code" : "key";
}
function Zu(e, t, n, r) {
  var a, l;
  const o = e.parentNode || e.parentId;
  if (!o) return n;
  const s = t.get(o),
    i = Dn(s, r);
  return Zu(
    s,
    t,
    {
      x: (n.x ?? 0) + i.x,
      y: (n.y ?? 0) + i.y,
      z:
        (((a = s[Te]) == null ? void 0 : a.z) ?? 0) > (n.z ?? 0)
          ? ((l = s[Te]) == null ? void 0 : l.z) ?? 0
          : n.z ?? 0,
    },
    r,
  );
}
function qu(e, t, n) {
  e.forEach((r) => {
    var s;
    const o = r.parentNode || r.parentId;
    if (o && !e.has(o)) throw new Error(`Parent node ${o} not found`);
    if (o || (n != null && n[r.id])) {
      const {
        x: i,
        y: a,
        z: l,
      } = Zu(
        r,
        e,
        {
          ...r.position,
          z: ((s = r[Te]) == null ? void 0 : s.z) ?? 0,
        },
        t,
      );
      (r.positionAbsolute = {
        x: i,
        y: a,
      }),
        (r[Te].z = l),
        n != null && n[r.id] && (r[Te].isParent = !0);
    }
  });
}
function ws(e, t, n, r) {
  const o = /* @__PURE__ */ new Map(),
    s = {},
    i = r ? 1e3 : 0;
  return (
    e.forEach((a) => {
      var h;
      const l = (nt(a.zIndex) ? a.zIndex : 0) + (a.selected ? i : 0),
        u = t.get(a.id),
        c = {
          ...a,
          positionAbsolute: {
            x: a.position.x,
            y: a.position.y,
          },
        },
        d = a.parentNode || a.parentId;
      d && (s[d] = !0);
      const f =
        (u == null ? void 0 : u.type) &&
        (u == null ? void 0 : u.type) !== a.type;
      Object.defineProperty(c, Te, {
        enumerable: !1,
        value: {
          handleBounds:
            f || (h = u == null ? void 0 : u[Te]) == null
              ? void 0
              : h.handleBounds,
          z: l,
        },
      }),
        o.set(a.id, c);
    }),
    qu(o, n, s),
    o
  );
}
function Xu(e, t = {}) {
  const {
      getNodes: n,
      width: r,
      height: o,
      minZoom: s,
      maxZoom: i,
      d3Zoom: a,
      d3Selection: l,
      fitViewOnInitDone: u,
      fitViewOnInit: c,
      nodeOrigin: d,
    } = e(),
    f = t.initial && !u && c;
  if (a && l && (f || !t.initial)) {
    const p = n().filter((m) => {
        var x;
        const v = t.includeHiddenNodes ? m.width && m.height : !m.hidden;
        return (x = t.nodes) != null && x.length
          ? v && t.nodes.some((b) => b.id === m.id)
          : v;
      }),
      g = p.every((m) => m.width && m.height);
    if (p.length > 0 && g) {
      const m = Wi(p, d),
        {
          x: v,
          y: x,
          zoom: b,
        } = Lu(m, r, o, t.minZoom ?? s, t.maxZoom ?? i, t.padding ?? 0.1),
        _ = Kt.translate(v, x).scale(b);
      return (
        typeof t.duration == "number" && t.duration > 0
          ? a.transform(on(l, t.duration), _)
          : a.transform(l, _),
        !0
      );
    }
  }
  return !1;
}
function h6(e, t) {
  return (
    e.forEach((n) => {
      const r = t.get(n.id);
      r &&
        t.set(r.id, {
          ...r,
          [Te]: r[Te],
          selected: n.selected,
        });
    }),
    new Map(t)
  );
}
function p6(e, t) {
  return t.map((n) => {
    const r = e.find((o) => o.id === n.id);
    return r && (n.selected = r.selected), n;
  });
}
function Kr({ changedNodes: e, changedEdges: t, get: n, set: r }) {
  const {
    nodeInternals: o,
    edges: s,
    onNodesChange: i,
    onEdgesChange: a,
    hasDefaultNodes: l,
    hasDefaultEdges: u,
  } = n();
  e != null &&
    e.length &&
    (l && r({ nodeInternals: h6(e, o) }), i == null || i(e)),
    t != null && t.length && (u && r({ edges: p6(t, s) }), a == null || a(t));
}
const xn = () => {},
  g6 = {
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
  m6 = (e) => ({
    d3Zoom: e.d3Zoom,
    d3Selection: e.d3Selection,
  }),
  y6 = () => {
    const e = Pe(),
      { d3Zoom: t, d3Selection: n } = we(m6, $e);
    return Ie(
      () =>
        n && t
          ? {
              zoomIn: (o) =>
                t.scaleBy(on(n, o == null ? void 0 : o.duration), 1.2),
              zoomOut: (o) =>
                t.scaleBy(on(n, o == null ? void 0 : o.duration), 1 / 1.2),
              zoomTo: (o, s) =>
                t.scaleTo(on(n, s == null ? void 0 : s.duration), o),
              getZoom: () => e.getState().transform[2],
              setViewport: (o, s) => {
                const [i, a, l] = e.getState().transform,
                  u = Kt.translate(o.x ?? i, o.y ?? a).scale(o.zoom ?? l);
                t.transform(on(n, s == null ? void 0 : s.duration), u);
              },
              getViewport: () => {
                const [o, s, i] = e.getState().transform;
                return { x: o, y: s, zoom: i };
              },
              fitView: (o) => Xu(e.getState, o),
              setCenter: (o, s, i) => {
                const { width: a, height: l, maxZoom: u } = e.getState(),
                  c = typeof (i == null ? void 0 : i.zoom) < "u" ? i.zoom : u,
                  d = a / 2 - o * c,
                  f = l / 2 - s * c,
                  h = Kt.translate(d, f).scale(c);
                t.transform(on(n, i == null ? void 0 : i.duration), h);
              },
              fitBounds: (o, s) => {
                const {
                    width: i,
                    height: a,
                    minZoom: l,
                    maxZoom: u,
                  } = e.getState(),
                  {
                    x: c,
                    y: d,
                    zoom: f,
                  } = Lu(
                    o,
                    i,
                    a,
                    l,
                    u,
                    (s == null ? void 0 : s.padding) ?? 0.1,
                  ),
                  h = Kt.translate(c, d).scale(f);
                t.transform(on(n, s == null ? void 0 : s.duration), h);
              },
              // @deprecated Use `screenToFlowPosition`.
              project: (o) => {
                const {
                  transform: s,
                  snapToGrid: i,
                  snapGrid: a,
                } = e.getState();
                return (
                  console.warn(
                    "[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position",
                  ),
                  ti(o, s, i, a)
                );
              },
              screenToFlowPosition: (o) => {
                const {
                  transform: s,
                  snapToGrid: i,
                  snapGrid: a,
                  domNode: l,
                } = e.getState();
                if (!l) return o;
                const { x: u, y: c } = l.getBoundingClientRect(),
                  d = {
                    x: o.x - u,
                    y: o.y - c,
                  };
                return ti(d, s, i, a);
              },
              flowToScreenPosition: (o) => {
                const { transform: s, domNode: i } = e.getState();
                if (!i) return o;
                const { x: a, y: l } = i.getBoundingClientRect(),
                  u = Ou(o, s);
                return {
                  x: u.x + a,
                  y: u.y + l,
                };
              },
              viewportInitialized: !0,
            }
          : g6,
      [t, n],
    );
  };
function wt() {
  const e = y6(),
    t = Pe(),
    n = ge(
      () =>
        t
          .getState()
          .getNodes()
          .map((g) => ({ ...g })),
      [],
    ),
    r = ge((g) => t.getState().nodeInternals.get(g), []),
    o = ge(() => {
      const { edges: g = [] } = t.getState();
      return g.map((m) => ({ ...m }));
    }, []),
    s = ge((g) => {
      const { edges: m = [] } = t.getState();
      return m.find((v) => v.id === g);
    }, []),
    i = ge((g) => {
      const {
          getNodes: m,
          setNodes: v,
          hasDefaultNodes: x,
          onNodesChange: b,
        } = t.getState(),
        _ = m(),
        C = typeof g == "function" ? g(_) : g;
      if (x) v(C);
      else if (b) {
        const A =
          C.length === 0
            ? _.map((I) => ({ type: "remove", id: I.id }))
            : C.map((I) => ({ item: I, type: "reset" }));
        b(A);
      }
    }, []),
    a = ge((g) => {
      const {
          edges: m = [],
          setEdges: v,
          hasDefaultEdges: x,
          onEdgesChange: b,
        } = t.getState(),
        _ = typeof g == "function" ? g(m) : g;
      if (x) v(_);
      else if (b) {
        const C =
          _.length === 0
            ? m.map((A) => ({ type: "remove", id: A.id }))
            : _.map((A) => ({ item: A, type: "reset" }));
        b(C);
      }
    }, []),
    l = ge((g) => {
      const m = Array.isArray(g) ? g : [g],
        {
          getNodes: v,
          setNodes: x,
          hasDefaultNodes: b,
          onNodesChange: _,
        } = t.getState();
      if (b) {
        const A = [...v(), ...m];
        x(A);
      } else if (_) {
        const C = m.map((A) => ({ item: A, type: "add" }));
        _(C);
      }
    }, []),
    u = ge((g) => {
      const m = Array.isArray(g) ? g : [g],
        {
          edges: v = [],
          setEdges: x,
          hasDefaultEdges: b,
          onEdgesChange: _,
        } = t.getState();
      if (b) x([...v, ...m]);
      else if (_) {
        const C = m.map((A) => ({ item: A, type: "add" }));
        _(C);
      }
    }, []),
    c = ge(() => {
      const { getNodes: g, edges: m = [], transform: v } = t.getState(),
        [x, b, _] = v;
      return {
        nodes: g().map((C) => ({ ...C })),
        edges: m.map((C) => ({ ...C })),
        viewport: {
          x,
          y: b,
          zoom: _,
        },
      };
    }, []),
    d = ge(({ nodes: g, edges: m }) => {
      const {
          nodeInternals: v,
          getNodes: x,
          edges: b,
          hasDefaultNodes: _,
          hasDefaultEdges: C,
          onNodesDelete: A,
          onEdgesDelete: I,
          onNodesChange: S,
          onEdgesChange: P,
        } = t.getState(),
        k = (g || []).map((N) => N.id),
        j = (m || []).map((N) => N.id),
        z = x().reduce((N, w) => {
          const O = w.parentNode || w.parentId,
            L = !k.includes(w.id) && O && N.find((T) => T.id === O);
          return (
            (typeof w.deletable == "boolean" ? w.deletable : !0) &&
              (k.includes(w.id) || L) &&
              N.push(w),
            N
          );
        }, []),
        B = b.filter((N) =>
          typeof N.deletable == "boolean" ? N.deletable : !0,
        ),
        E = B.filter((N) => j.includes(N.id));
      if (z || E) {
        const N = Mu(z, B),
          w = [...E, ...N],
          O = w.reduce((L, D) => (L.includes(D.id) || L.push(D.id), L), []);
        if (
          ((C || _) &&
            (C &&
              t.setState({
                edges: b.filter((L) => !O.includes(L.id)),
              }),
            _ &&
              (z.forEach((L) => {
                v.delete(L.id);
              }),
              t.setState({
                nodeInternals: new Map(v),
              }))),
          O.length > 0 &&
            (I == null || I(w),
            P &&
              P(
                O.map((L) => ({
                  id: L,
                  type: "remove",
                })),
              )),
          z.length > 0 && (A == null || A(z), S))
        ) {
          const L = z.map((D) => ({ id: D.id, type: "remove" }));
          S(L);
        }
      }
    }, []),
    f = ge((g) => {
      const m = jm(g),
        v = m ? null : t.getState().nodeInternals.get(g.id);
      return !m && !v ? [null, null, m] : [m ? g : gc(v), v, m];
    }, []),
    h = ge((g, m = !0, v) => {
      const [x, b, _] = f(g);
      return x
        ? (v || t.getState().getNodes()).filter((C) => {
            if (!_ && (C.id === b.id || !C.positionAbsolute)) return !1;
            const A = gc(C),
              I = Gs(A, x);
            return (m && I > 0) || I >= x.width * x.height;
          })
        : [];
    }, []),
    p = ge((g, m, v = !0) => {
      const [x] = f(g);
      if (!x) return !1;
      const b = Gs(x, m);
      return (v && b > 0) || b >= x.width * x.height;
    }, []);
  return Ie(
    () => ({
      ...e,
      getNodes: n,
      getNode: r,
      getEdges: o,
      getEdge: s,
      setNodes: i,
      setEdges: a,
      addNodes: l,
      addEdges: u,
      toObject: c,
      deleteElements: d,
      getIntersectingNodes: h,
      isNodeIntersecting: p,
    }),
    [e, n, r, o, s, i, a, l, u, c, d, h, p],
  );
}
const v6 = { actInsideInputWithModifier: !1 };
var E6 = ({ deleteKeyCode: e, multiSelectionKeyCode: t }) => {
  const n = Pe(),
    { deleteElements: r } = wt(),
    o = yr(e, v6),
    s = yr(t);
  ie(() => {
    if (o) {
      const { edges: i, getNodes: a } = n.getState(),
        l = a().filter((c) => c.selected),
        u = i.filter((c) => c.selected);
      r({ nodes: l, edges: u }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [o]),
    ie(() => {
      n.setState({ multiSelectionActive: s });
    }, [s]);
};
function C6(e) {
  const t = Pe();
  ie(() => {
    let n;
    const r = () => {
      var s, i;
      if (!e.current) return;
      const o = ji(e.current);
      (o.height === 0 || o.width === 0) &&
        ((i = (s = t.getState()).onError) == null ||
          i.call(s, "004", ht.error004())),
        t.setState({ width: o.width || 500, height: o.height || 500 });
    };
    return (
      r(),
      window.addEventListener("resize", r),
      e.current && ((n = new ResizeObserver(() => r())), n.observe(e.current)),
      () => {
        window.removeEventListener("resize", r),
          n && e.current && n.unobserve(e.current);
      }
    );
  }, []);
}
const Zi = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  x6 = (e, t) => e.x !== t.x || e.y !== t.y || e.zoom !== t.k,
  Gr = (e) => ({
    x: e.x,
    y: e.y,
    zoom: e.k,
  }),
  _n = (e, t) => e.target.closest(`.${t}`),
  Sc = (e, t) => t === 2 && Array.isArray(e) && e.includes(2),
  Nc = (e) => {
    const t = e.ctrlKey && No() ? 10 : 1;
    return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
  },
  _6 = (e) => ({
    d3Zoom: e.d3Zoom,
    d3Selection: e.d3Selection,
    d3ZoomHandler: e.d3ZoomHandler,
    userSelectionActive: e.userSelectionActive,
  }),
  b6 = ({
    onMove: e,
    onMoveStart: t,
    onMoveEnd: n,
    onPaneContextMenu: r,
    zoomOnScroll: o = !0,
    zoomOnPinch: s = !0,
    panOnScroll: i = !1,
    panOnScrollSpeed: a = 0.5,
    panOnScrollMode: l = ln.Free,
    zoomOnDoubleClick: u = !0,
    elementsSelectable: c,
    panOnDrag: d = !0,
    defaultViewport: f,
    translateExtent: h,
    minZoom: p,
    maxZoom: g,
    zoomActivationKeyCode: m,
    preventScrolling: v = !0,
    children: x,
    noWheelClassName: b,
    noPanClassName: _,
  }) => {
    const C = se(),
      A = Pe(),
      I = se(!1),
      S = se(!1),
      P = se(null),
      k = se({ x: 0, y: 0, zoom: 0 }),
      {
        d3Zoom: j,
        d3Selection: z,
        d3ZoomHandler: B,
        userSelectionActive: E,
      } = we(_6, $e),
      N = yr(m),
      w = se(0),
      O = se(!1),
      L = se();
    return (
      C6(P),
      ie(() => {
        if (P.current) {
          const D = P.current.getBoundingClientRect(),
            T = Dm().scaleExtent([p, g]).translateExtent(h),
            R = ut(P.current).call(T),
            H = Kt.translate(f.x, f.y).scale($n(f.zoom, p, g)),
            V = [
              [0, 0],
              [D.width, D.height],
            ],
            W = T.constrain()(H, V, h);
          T.transform(R, W),
            T.wheelDelta(Nc),
            A.setState({
              d3Zoom: T,
              d3Selection: R,
              d3ZoomHandler: R.on("wheel.zoom"),
              // we need to pass transform because zoom handler is not registered when we set the initial transform
              transform: [W.x, W.y, W.k],
              domNode: P.current.closest(".react-flow"),
            });
        }
      }, []),
      ie(() => {
        z &&
          j &&
          (i && !N && !E
            ? z.on(
                "wheel.zoom",
                (D) => {
                  if (_n(D, b)) return !1;
                  D.preventDefault(), D.stopImmediatePropagation();
                  const T = z.property("__zoom").k || 1;
                  if (D.ctrlKey && s) {
                    const Q = Et(D),
                      te = Nc(D),
                      K = T * Math.pow(2, te);
                    j.scaleTo(z, K, Q, D);
                    return;
                  }
                  const R = D.deltaMode === 1 ? 20 : 1;
                  let H = l === ln.Vertical ? 0 : D.deltaX * R,
                    V = l === ln.Horizontal ? 0 : D.deltaY * R;
                  !No() &&
                    D.shiftKey &&
                    l !== ln.Vertical &&
                    ((H = D.deltaY * R), (V = 0)),
                    j.translateBy(
                      z,
                      -(H / T) * a,
                      -(V / T) * a,
                      // @ts-ignore
                      { internal: !0 },
                    );
                  const W = Gr(z.property("__zoom")),
                    {
                      onViewportChangeStart: Y,
                      onViewportChange: Z,
                      onViewportChangeEnd: X,
                    } = A.getState();
                  clearTimeout(L.current),
                    O.current ||
                      ((O.current = !0),
                      t == null || t(D, W),
                      Y == null || Y(W)),
                    O.current &&
                      (e == null || e(D, W),
                      Z == null || Z(W),
                      (L.current = setTimeout(() => {
                        n == null || n(D, W),
                          X == null || X(W),
                          (O.current = !1);
                      }, 150)));
                },
                { passive: !1 },
              )
            : typeof B < "u" &&
              z.on(
                "wheel.zoom",
                function (D, T) {
                  if ((!v && D.type === "wheel" && !D.ctrlKey) || _n(D, b))
                    return null;
                  D.preventDefault(), B.call(this, D, T);
                },
                { passive: !1 },
              ));
      }, [E, i, l, z, j, B, N, s, v, b, t, e, n]),
      ie(() => {
        j &&
          j.on("start", (D) => {
            var H, V;
            if (!D.sourceEvent || D.sourceEvent.internal) return null;
            w.current = (H = D.sourceEvent) == null ? void 0 : H.button;
            const { onViewportChangeStart: T } = A.getState(),
              R = Gr(D.transform);
            (I.current = !0),
              (k.current = R),
              ((V = D.sourceEvent) == null ? void 0 : V.type) === "mousedown" &&
                A.setState({ paneDragging: !0 }),
              T == null || T(R),
              t == null || t(D.sourceEvent, R);
          });
      }, [j, t]),
      ie(() => {
        j &&
          (E && !I.current
            ? j.on("zoom", null)
            : E ||
              j.on("zoom", (D) => {
                var R;
                const { onViewportChange: T } = A.getState();
                if (
                  (A.setState({
                    transform: [D.transform.x, D.transform.y, D.transform.k],
                  }),
                  (S.current = !!(r && Sc(d, w.current ?? 0))),
                  (e || T) && !((R = D.sourceEvent) != null && R.internal))
                ) {
                  const H = Gr(D.transform);
                  T == null || T(H), e == null || e(D.sourceEvent, H);
                }
              }));
      }, [E, j, e, d, r]),
      ie(() => {
        j &&
          j.on("end", (D) => {
            if (!D.sourceEvent || D.sourceEvent.internal) return null;
            const { onViewportChangeEnd: T } = A.getState();
            if (
              ((I.current = !1),
              A.setState({ paneDragging: !1 }),
              r && Sc(d, w.current ?? 0) && !S.current && r(D.sourceEvent),
              (S.current = !1),
              (n || T) && x6(k.current, D.transform))
            ) {
              const R = Gr(D.transform);
              (k.current = R),
                clearTimeout(C.current),
                (C.current = setTimeout(
                  () => {
                    T == null || T(R), n == null || n(D.sourceEvent, R);
                  },
                  i ? 150 : 0,
                ));
            }
          });
      }, [j, i, d, n, r]),
      ie(() => {
        j &&
          j.filter((D) => {
            const T = N || o,
              R = s && D.ctrlKey;
            if (
              (d === !0 || (Array.isArray(d) && d.includes(1))) &&
              D.button === 1 &&
              D.type === "mousedown" &&
              (_n(D, "react-flow__node") || _n(D, "react-flow__edge"))
            )
              return !0;
            if (
              (!d && !T && !i && !u && !s) ||
              E ||
              (!u && D.type === "dblclick") ||
              (_n(D, b) && D.type === "wheel") ||
              (_n(D, _) &&
                (D.type !== "wheel" || (i && D.type === "wheel" && !N))) ||
              (!s && D.ctrlKey && D.type === "wheel") ||
              (!T && !i && !R && D.type === "wheel") ||
              (!d && (D.type === "mousedown" || D.type === "touchstart")) ||
              (Array.isArray(d) &&
                !d.includes(D.button) &&
                D.type === "mousedown")
            )
              return !1;
            const H =
              (Array.isArray(d) && d.includes(D.button)) ||
              !D.button ||
              D.button <= 1;
            return (!D.ctrlKey || D.type === "wheel") && H;
          });
      }, [E, j, o, s, i, u, d, c, N]),
      $.createElement(
        "div",
        { className: "react-flow__renderer", ref: P, style: Zi },
        x,
      )
    );
  },
  w6 = (e) => ({
    userSelectionActive: e.userSelectionActive,
    userSelectionRect: e.userSelectionRect,
  });
function S6() {
  const { userSelectionActive: e, userSelectionRect: t } = we(w6, $e);
  return e && t
    ? $.createElement("div", {
        className: "react-flow__selection react-flow__container",
        style: {
          width: t.width,
          height: t.height,
          transform: `translate(${t.x}px, ${t.y}px)`,
        },
      })
    : null;
}
function Tc(e, t) {
  const n = t.parentNode || t.parentId,
    r = e.find((o) => o.id === n);
  if (r) {
    const o = t.position.x + t.width - r.width,
      s = t.position.y + t.height - r.height;
    if (o > 0 || s > 0 || t.position.x < 0 || t.position.y < 0) {
      if (
        ((r.style = { ...r.style }),
        (r.style.width = r.style.width ?? r.width),
        (r.style.height = r.style.height ?? r.height),
        o > 0 && (r.style.width += o),
        s > 0 && (r.style.height += s),
        t.position.x < 0)
      ) {
        const i = Math.abs(t.position.x);
        (r.position.x = r.position.x - i),
          (r.style.width += i),
          (t.position.x = 0);
      }
      if (t.position.y < 0) {
        const i = Math.abs(t.position.y);
        (r.position.y = r.position.y - i),
          (r.style.height += i),
          (t.position.y = 0);
      }
      (r.width = r.style.width), (r.height = r.style.height);
    }
  }
}
function N6(e, t) {
  if (e.some((r) => r.type === "reset"))
    return e.filter((r) => r.type === "reset").map((r) => r.item);
  const n = e.filter((r) => r.type === "add").map((r) => r.item);
  return t.reduce((r, o) => {
    const s = e.filter((a) => a.id === o.id);
    if (s.length === 0) return r.push(o), r;
    const i = { ...o };
    for (const a of s)
      if (a)
        switch (a.type) {
          case "select": {
            i.selected = a.selected;
            break;
          }
          case "position": {
            typeof a.position < "u" && (i.position = a.position),
              typeof a.positionAbsolute < "u" &&
                (i.positionAbsolute = a.positionAbsolute),
              typeof a.dragging < "u" && (i.dragging = a.dragging),
              i.expandParent && Tc(r, i);
            break;
          }
          case "dimensions": {
            typeof a.dimensions < "u" &&
              ((i.width = a.dimensions.width),
              (i.height = a.dimensions.height)),
              typeof a.updateStyle < "u" &&
                (i.style = { ...(i.style || {}), ...a.dimensions }),
              typeof a.resizing == "boolean" && (i.resizing = a.resizing),
              i.expandParent && Tc(r, i);
            break;
          }
          case "remove":
            return r;
        }
    return r.push(i), r;
  }, n);
}
function T6(e, t) {
  return N6(e, t);
}
const Zt = (e, t) => ({
  id: e,
  type: "select",
  selected: t,
});
function wn(e, t) {
  return e.reduce((n, r) => {
    const o = t.includes(r.id);
    return (
      !r.selected && o
        ? ((r.selected = !0), n.push(Zt(r.id, !0)))
        : r.selected && !o && ((r.selected = !1), n.push(Zt(r.id, !1))),
      n
    );
  }, []);
}
const Ss = (e, t) => (n) => {
    n.target === t.current && (e == null || e(n));
  },
  A6 = (e) => ({
    userSelectionActive: e.userSelectionActive,
    elementsSelectable: e.elementsSelectable,
    dragging: e.paneDragging,
  }),
  Ku = Ae(
    ({
      isSelecting: e,
      selectionMode: t = mr.Full,
      panOnDrag: n,
      onSelectionStart: r,
      onSelectionEnd: o,
      onPaneClick: s,
      onPaneContextMenu: i,
      onPaneScroll: a,
      onPaneMouseEnter: l,
      onPaneMouseMove: u,
      onPaneMouseLeave: c,
      children: d,
    }) => {
      const f = se(null),
        h = Pe(),
        p = se(0),
        g = se(0),
        m = se(),
        {
          userSelectionActive: v,
          elementsSelectable: x,
          dragging: b,
        } = we(A6, $e),
        _ = () => {
          h.setState({ userSelectionActive: !1, userSelectionRect: null }),
            (p.current = 0),
            (g.current = 0);
        },
        C = (B) => {
          s == null || s(B),
            h.getState().resetSelectedElements(),
            h.setState({ nodesSelectionActive: !1 });
        },
        A = (B) => {
          if (Array.isArray(n) && n != null && n.includes(2)) {
            B.preventDefault();
            return;
          }
          i == null || i(B);
        },
        I = a ? (B) => a(B) : void 0,
        S = (B) => {
          const { resetSelectedElements: E, domNode: N } = h.getState();
          if (
            ((m.current = N == null ? void 0 : N.getBoundingClientRect()),
            !x || !e || B.button !== 0 || B.target !== f.current || !m.current)
          )
            return;
          const { x: w, y: O } = Gt(B, m.current);
          E(),
            h.setState({
              userSelectionRect: {
                width: 0,
                height: 0,
                startX: w,
                startY: O,
                x: w,
                y: O,
              },
            }),
            r == null || r(B);
        },
        P = (B) => {
          const {
            userSelectionRect: E,
            nodeInternals: N,
            edges: w,
            transform: O,
            onNodesChange: L,
            onEdgesChange: D,
            nodeOrigin: T,
            getNodes: R,
          } = h.getState();
          if (!e || !m.current || !E) return;
          h.setState({ userSelectionActive: !0, nodesSelectionActive: !1 });
          const H = Gt(B, m.current),
            V = E.startX ?? 0,
            W = E.startY ?? 0,
            Y = {
              ...E,
              x: H.x < V ? H.x : V,
              y: H.y < W ? H.y : W,
              width: Math.abs(H.x - V),
              height: Math.abs(H.y - W),
            },
            Z = R(),
            X = Ru(N, Y, O, t === mr.Partial, !0, T),
            Q = Mu(X, w).map((K) => K.id),
            te = X.map((K) => K.id);
          if (p.current !== te.length) {
            p.current = te.length;
            const K = wn(Z, te);
            K.length && (L == null || L(K));
          }
          if (g.current !== Q.length) {
            g.current = Q.length;
            const K = wn(w, Q);
            K.length && (D == null || D(K));
          }
          h.setState({
            userSelectionRect: Y,
          });
        },
        k = (B) => {
          if (B.button !== 0) return;
          const { userSelectionRect: E } = h.getState();
          !v && E && B.target === f.current && (C == null || C(B)),
            h.setState({ nodesSelectionActive: p.current > 0 }),
            _(),
            o == null || o(B);
        },
        j = (B) => {
          v &&
            (h.setState({ nodesSelectionActive: p.current > 0 }),
            o == null || o(B)),
            _();
        },
        z = x && (e || v);
      return $.createElement(
        "div",
        {
          className: ze(["react-flow__pane", { dragging: b, selection: e }]),
          onClick: z ? void 0 : Ss(C, f),
          onContextMenu: Ss(A, f),
          onWheel: Ss(I, f),
          onMouseEnter: z ? void 0 : l,
          onMouseDown: z ? S : void 0,
          onMouseMove: z ? P : u,
          onMouseUp: z ? k : void 0,
          onMouseLeave: z ? j : c,
          ref: f,
          style: Zi,
        },
        d,
        $.createElement(S6, null),
      );
    },
  );
Ku.displayName = "Pane";
function Gu(e, t) {
  const n = e.parentNode || e.parentId;
  if (!n) return !1;
  const r = t.get(n);
  return r ? (r.selected ? !0 : Gu(r, t)) : !1;
}
function Ac(e, t, n) {
  let r = e;
  do {
    if (r != null && r.matches(t)) return !0;
    if (r === n.current) return !1;
    r = r.parentElement;
  } while (r);
  return !1;
}
function D6(e, t, n, r) {
  return Array.from(e.values())
    .filter(
      (o) =>
        (o.selected || o.id === r) &&
        (!o.parentNode || o.parentId || !Gu(o, e)) &&
        (o.draggable || (t && typeof o.draggable > "u")),
    )
    .map((o) => {
      var s, i;
      return {
        id: o.id,
        position: o.position || { x: 0, y: 0 },
        positionAbsolute: o.positionAbsolute || { x: 0, y: 0 },
        distance: {
          x: n.x - (((s = o.positionAbsolute) == null ? void 0 : s.x) ?? 0),
          y: n.y - (((i = o.positionAbsolute) == null ? void 0 : i.y) ?? 0),
        },
        delta: {
          x: 0,
          y: 0,
        },
        extent: o.extent,
        parentNode: o.parentNode || o.parentId,
        parentId: o.parentNode || o.parentId,
        width: o.width,
        height: o.height,
        expandParent: o.expandParent,
      };
    });
}
function I6(e, t) {
  return !t || t === "parent"
    ? t
    : [t[0], [t[1][0] - (e.width || 0), t[1][1] - (e.height || 0)]];
}
function Ju(e, t, n, r, o = [0, 0], s) {
  const i = I6(e, e.extent || r);
  let a = i;
  const l = e.parentNode || e.parentId;
  if (e.extent === "parent" && !e.expandParent)
    if (l && e.width && e.height) {
      const d = n.get(l),
        { x: f, y: h } = Dn(d, o).positionAbsolute;
      a =
        d && nt(f) && nt(h) && nt(d.width) && nt(d.height)
          ? [
              [f + e.width * o[0], h + e.height * o[1]],
              [
                f + d.width - e.width + e.width * o[0],
                h + d.height - e.height + e.height * o[1],
              ],
            ]
          : a;
    } else s == null || s("005", ht.error005()), (a = i);
  else if (e.extent && l && e.extent !== "parent") {
    const d = n.get(l),
      { x: f, y: h } = Dn(d, o).positionAbsolute;
    a = [
      [e.extent[0][0] + f, e.extent[0][1] + h],
      [e.extent[1][0] + f, e.extent[1][1] + h],
    ];
  }
  let u = { x: 0, y: 0 };
  if (l) {
    const d = n.get(l);
    u = Dn(d, o).positionAbsolute;
  }
  const c = a && a !== "parent" ? $i(t, a) : t;
  return {
    position: {
      x: c.x - u.x,
      y: c.y - u.y,
    },
    positionAbsolute: c,
  };
}
function Ns({ nodeId: e, dragItems: t, nodeInternals: n }) {
  const r = t.map((o) => ({
    ...n.get(o.id),
    position: o.position,
    positionAbsolute: o.positionAbsolute,
  }));
  return [e ? r.find((o) => o.id === e) : r[0], r];
}
const Dc = (e, t, n, r) => {
  const o = t.querySelectorAll(e);
  if (!o || !o.length) return null;
  const s = Array.from(o),
    i = t.getBoundingClientRect(),
    a = {
      x: i.width * r[0],
      y: i.height * r[1],
    };
  return s.map((l) => {
    const u = l.getBoundingClientRect();
    return {
      id: l.getAttribute("data-handleid"),
      position: l.getAttribute("data-handlepos"),
      x: (u.left - i.left - a.x) / n,
      y: (u.top - i.top - a.y) / n,
      ...ji(l),
    };
  });
};
function Gn(e, t, n) {
  return n === void 0
    ? n
    : (r) => {
        const o = t().nodeInternals.get(e);
        o && n(r, { ...o });
      };
}
function ri({ id: e, store: t, unselect: n = !1, nodeRef: r }) {
  const {
      addSelectedNodes: o,
      unselectNodesAndEdges: s,
      multiSelectionActive: i,
      nodeInternals: a,
      onError: l,
    } = t.getState(),
    u = a.get(e);
  if (!u) {
    l == null || l("012", ht.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }),
    u.selected
      ? (n || (u.selected && i)) &&
        (s({ nodes: [u], edges: [] }),
        requestAnimationFrame(() => {
          var c;
          return (c = r == null ? void 0 : r.current) == null
            ? void 0
            : c.blur();
        }))
      : o([e]);
}
function O6() {
  const e = Pe();
  return ge(({ sourceEvent: n }) => {
    const { transform: r, snapGrid: o, snapToGrid: s } = e.getState(),
      i = n.touches ? n.touches[0].clientX : n.clientX,
      a = n.touches ? n.touches[0].clientY : n.clientY,
      l = {
        x: (i - r[0]) / r[2],
        y: (a - r[1]) / r[2],
      };
    return {
      xSnapped: s ? o[0] * Math.round(l.x / o[0]) : l.x,
      ySnapped: s ? o[1] * Math.round(l.y / o[1]) : l.y,
      ...l,
    };
  }, []);
}
function Ts(e) {
  return (t, n, r) => (e == null ? void 0 : e(t, r));
}
function Qu({
  nodeRef: e,
  disabled: t = !1,
  noDragClassName: n,
  handleSelector: r,
  nodeId: o,
  isSelectable: s,
  selectNodesOnDrag: i,
}) {
  const a = Pe(),
    [l, u] = de(!1),
    c = se([]),
    d = se({ x: null, y: null }),
    f = se(0),
    h = se(null),
    p = se({ x: 0, y: 0 }),
    g = se(null),
    m = se(!1),
    v = se(!1),
    x = O6();
  return (
    ie(() => {
      if (e != null && e.current) {
        const b = ut(e.current),
          _ = ({ x: I, y: S }) => {
            const {
              nodeInternals: P,
              onNodeDrag: k,
              onSelectionDrag: j,
              updateNodePositions: z,
              nodeExtent: B,
              snapGrid: E,
              snapToGrid: N,
              nodeOrigin: w,
              onError: O,
            } = a.getState();
            d.current = { x: I, y: S };
            let L = !1,
              D = { x: 0, y: 0, x2: 0, y2: 0 };
            if (c.current.length > 1 && B) {
              const R = Wi(c.current, w);
              D = Fi(R);
            }
            if (
              ((c.current = c.current.map((R) => {
                const H = { x: I - R.distance.x, y: S - R.distance.y };
                N &&
                  ((H.x = E[0] * Math.round(H.x / E[0])),
                  (H.y = E[1] * Math.round(H.y / E[1])));
                const V = [
                  [B[0][0], B[0][1]],
                  [B[1][0], B[1][1]],
                ];
                c.current.length > 1 &&
                  B &&
                  !R.extent &&
                  ((V[0][0] = R.positionAbsolute.x - D.x + B[0][0]),
                  (V[1][0] =
                    R.positionAbsolute.x + (R.width ?? 0) - D.x2 + B[1][0]),
                  (V[0][1] = R.positionAbsolute.y - D.y + B[0][1]),
                  (V[1][1] =
                    R.positionAbsolute.y + (R.height ?? 0) - D.y2 + B[1][1]));
                const W = Ju(R, H, P, V, w, O);
                return (
                  (L =
                    L ||
                    R.position.x !== W.position.x ||
                    R.position.y !== W.position.y),
                  (R.position = W.position),
                  (R.positionAbsolute = W.positionAbsolute),
                  R
                );
              })),
              !L)
            )
              return;
            z(c.current, !0, !0), u(!0);
            const T = o ? k : Ts(j);
            if (T && g.current) {
              const [R, H] = Ns({
                nodeId: o,
                dragItems: c.current,
                nodeInternals: P,
              });
              T(g.current, R, H);
            }
          },
          C = () => {
            if (!h.current) return;
            const [I, S] = _u(p.current, h.current);
            if (I !== 0 || S !== 0) {
              const { transform: P, panBy: k } = a.getState();
              (d.current.x = (d.current.x ?? 0) - I / P[2]),
                (d.current.y = (d.current.y ?? 0) - S / P[2]),
                k({ x: I, y: S }) && _(d.current);
            }
            f.current = requestAnimationFrame(C);
          },
          A = (I) => {
            var w;
            const {
              nodeInternals: S,
              multiSelectionActive: P,
              nodesDraggable: k,
              unselectNodesAndEdges: j,
              onNodeDragStart: z,
              onSelectionDragStart: B,
            } = a.getState();
            v.current = !0;
            const E = o ? z : Ts(B);
            (!i || !s) &&
              !P &&
              o &&
              (((w = S.get(o)) != null && w.selected) || j()),
              o &&
                s &&
                i &&
                ri({
                  id: o,
                  store: a,
                  nodeRef: e,
                });
            const N = x(I);
            if (
              ((d.current = N), (c.current = D6(S, k, N, o)), E && c.current)
            ) {
              const [O, L] = Ns({
                nodeId: o,
                dragItems: c.current,
                nodeInternals: S,
              });
              E(I.sourceEvent, O, L);
            }
          };
        if (t) b.on(".drag", null);
        else {
          const I = Fg()
            .on("start", (S) => {
              const { domNode: P, nodeDragThreshold: k } = a.getState();
              k === 0 && A(S);
              const j = x(S);
              (d.current = j),
                (h.current =
                  (P == null ? void 0 : P.getBoundingClientRect()) || null),
                (p.current = Gt(S.sourceEvent, h.current));
            })
            .on("drag", (S) => {
              var z, B;
              const P = x(S),
                { autoPanOnNodeDrag: k, nodeDragThreshold: j } = a.getState();
              if (
                (!m.current && v.current && k && ((m.current = !0), C()),
                !v.current)
              ) {
                const E =
                    P.xSnapped -
                    (((z = d == null ? void 0 : d.current) == null
                      ? void 0
                      : z.x) ?? 0),
                  N =
                    P.ySnapped -
                    (((B = d == null ? void 0 : d.current) == null
                      ? void 0
                      : B.y) ?? 0);
                Math.sqrt(E * E + N * N) > j && A(S);
              }
              (d.current.x !== P.xSnapped || d.current.y !== P.ySnapped) &&
                c.current &&
                v.current &&
                ((g.current = S.sourceEvent),
                (p.current = Gt(S.sourceEvent, h.current)),
                _(P));
            })
            .on("end", (S) => {
              if (
                v.current &&
                (u(!1),
                (m.current = !1),
                (v.current = !1),
                cancelAnimationFrame(f.current),
                c.current)
              ) {
                const {
                    updateNodePositions: P,
                    nodeInternals: k,
                    onNodeDragStop: j,
                    onSelectionDragStop: z,
                  } = a.getState(),
                  B = o ? j : Ts(z);
                if ((P(c.current, !1, !1), B)) {
                  const [E, N] = Ns({
                    nodeId: o,
                    dragItems: c.current,
                    nodeInternals: k,
                  });
                  B(S.sourceEvent, E, N);
                }
              }
            })
            .filter((S) => {
              const P = S.target;
              return (
                !S.button && (!n || !Ac(P, `.${n}`, e)) && (!r || Ac(P, r, e))
              );
            });
          return (
            b.call(I),
            () => {
              b.on(".drag", null);
            }
          );
        }
      }
    }, [e, t, n, r, s, a, o, i, x]),
    l
  );
}
function ed() {
  const e = Pe();
  return ge((n) => {
    const {
        nodeInternals: r,
        nodeExtent: o,
        updateNodePositions: s,
        getNodes: i,
        snapToGrid: a,
        snapGrid: l,
        onError: u,
        nodesDraggable: c,
      } = e.getState(),
      d = i().filter(
        (x) => x.selected && (x.draggable || (c && typeof x.draggable > "u")),
      ),
      f = a ? l[0] : 5,
      h = a ? l[1] : 5,
      p = n.isShiftPressed ? 4 : 1,
      g = n.x * f * p,
      m = n.y * h * p,
      v = d.map((x) => {
        if (x.positionAbsolute) {
          const b = {
            x: x.positionAbsolute.x + g,
            y: x.positionAbsolute.y + m,
          };
          a &&
            ((b.x = l[0] * Math.round(b.x / l[0])),
            (b.y = l[1] * Math.round(b.y / l[1])));
          const { positionAbsolute: _, position: C } = Ju(
            x,
            b,
            r,
            o,
            void 0,
            u,
          );
          (x.position = C), (x.positionAbsolute = _);
        }
        return x;
      });
    s(v, !0, !1);
  }, []);
}
const In = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
var Jn = (e) => {
  const t = ({
    id: n,
    type: r,
    data: o,
    xPos: s,
    yPos: i,
    xPosOrigin: a,
    yPosOrigin: l,
    selected: u,
    onClick: c,
    onMouseEnter: d,
    onMouseMove: f,
    onMouseLeave: h,
    onContextMenu: p,
    onDoubleClick: g,
    style: m,
    className: v,
    isDraggable: x,
    isSelectable: b,
    isConnectable: _,
    isFocusable: C,
    selectNodesOnDrag: A,
    sourcePosition: I,
    targetPosition: S,
    hidden: P,
    resizeObserver: k,
    dragHandle: j,
    zIndex: z,
    isParent: B,
    noDragClassName: E,
    noPanClassName: N,
    initialized: w,
    disableKeyboardA11y: O,
    ariaLabel: L,
    rfId: D,
    hasHandleBounds: T,
  }) => {
    const R = Pe(),
      H = se(null),
      V = se(null),
      W = se(I),
      Y = se(S),
      Z = se(r),
      X = b || x || c || d || f || h,
      Q = ed(),
      te = Gn(n, R.getState, d),
      K = Gn(n, R.getState, f),
      fe = Gn(n, R.getState, h),
      q = Gn(n, R.getState, p),
      ve = Gn(n, R.getState, g),
      je = (Ce) => {
        const { nodeDragThreshold: re } = R.getState();
        if (
          (b &&
            (!A || !x || re > 0) &&
            ri({
              id: n,
              store: R,
              nodeRef: H,
            }),
          c)
        ) {
          const Me = R.getState().nodeInternals.get(n);
          Me && c(Ce, { ...Me });
        }
      },
      _e = (Ce) => {
        if (!Js(Ce) && !O)
          if (wu.includes(Ce.key) && b) {
            const re = Ce.key === "Escape";
            ri({
              id: n,
              store: R,
              unselect: re,
              nodeRef: H,
            });
          } else
            x &&
              u &&
              Object.prototype.hasOwnProperty.call(In, Ce.key) &&
              (R.setState({
                ariaLiveMessage: `Moved selected node ${Ce.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~s}, y: ${~~i}`,
              }),
              Q({
                x: In[Ce.key].x,
                y: In[Ce.key].y,
                isShiftPressed: Ce.shiftKey,
              }));
      };
    ie(
      () => () => {
        V.current && (k == null || k.unobserve(V.current), (V.current = null));
      },
      [],
    ),
      ie(() => {
        if (H.current && !P) {
          const Ce = H.current;
          (!w || !T || V.current !== Ce) &&
            (V.current && (k == null || k.unobserve(V.current)),
            k == null || k.observe(Ce),
            (V.current = Ce));
        }
      }, [P, w, T]),
      ie(() => {
        const Ce = Z.current !== r,
          re = W.current !== I,
          Me = Y.current !== S;
        H.current &&
          (Ce || re || Me) &&
          (Ce && (Z.current = r),
          re && (W.current = I),
          Me && (Y.current = S),
          R.getState().updateNodeDimensions([
            { id: n, nodeElement: H.current, forceUpdate: !0 },
          ]));
      }, [n, r, I, S]);
    const Fe = Qu({
      nodeRef: H,
      disabled: P || !x,
      noDragClassName: E,
      handleSelector: j,
      nodeId: n,
      isSelectable: b,
      selectNodesOnDrag: A,
    });
    return P
      ? null
      : $.createElement(
          "div",
          {
            className: ze([
              "react-flow__node",
              `react-flow__node-${r}`,
              {
                // this is overwritable by passing `nopan` as a class name
                [N]: x,
              },
              v,
              {
                selected: u,
                selectable: b,
                parent: B,
                dragging: Fe,
              },
            ]),
            ref: H,
            style: {
              zIndex: z,
              transform: `translate(${a}px,${l}px)`,
              pointerEvents: X ? "all" : "none",
              visibility: w ? "visible" : "hidden",
              ...m,
            },
            "data-id": n,
            "data-testid": `rf__node-${n}`,
            onMouseEnter: te,
            onMouseMove: K,
            onMouseLeave: fe,
            onContextMenu: q,
            onClick: je,
            onDoubleClick: ve,
            onKeyDown: C ? _e : void 0,
            tabIndex: C ? 0 : void 0,
            role: C ? "button" : void 0,
            "aria-describedby": O ? void 0 : `${Uu}-${D}`,
            "aria-label": L,
          },
          $.createElement(
            Vm,
            { value: n },
            $.createElement(e, {
              id: n,
              data: o,
              type: r,
              xPos: s,
              yPos: i,
              selected: u,
              isConnectable: _,
              sourcePosition: I,
              targetPosition: S,
              dragging: Fe,
              dragHandle: j,
              zIndex: z,
            }),
          ),
        );
  };
  return (t.displayName = "NodeWrapper"), Ae(t);
};
const R6 = (e) => {
  const t = e.getNodes().filter((n) => n.selected);
  return {
    ...Wi(t, e.nodeOrigin),
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`,
    userSelectionActive: e.userSelectionActive,
  };
};
function M6({
  onSelectionContextMenu: e,
  noPanClassName: t,
  disableKeyboardA11y: n,
}) {
  const r = Pe(),
    {
      width: o,
      height: s,
      x: i,
      y: a,
      transformString: l,
      userSelectionActive: u,
    } = we(R6, $e),
    c = ed(),
    d = se(null);
  if (
    (ie(() => {
      var p;
      n ||
        (p = d.current) == null ||
        p.focus({
          preventScroll: !0,
        });
    }, [n]),
    Qu({
      nodeRef: d,
    }),
    u || !o || !s)
  )
    return null;
  const f = e
      ? (p) => {
          const g = r
            .getState()
            .getNodes()
            .filter((m) => m.selected);
          e(p, g);
        }
      : void 0,
    h = (p) => {
      Object.prototype.hasOwnProperty.call(In, p.key) &&
        c({
          x: In[p.key].x,
          y: In[p.key].y,
          isShiftPressed: p.shiftKey,
        });
    };
  return $.createElement(
    "div",
    {
      className: ze(["react-flow__nodesselection", "react-flow__container", t]),
      style: {
        transform: l,
      },
    },
    $.createElement("div", {
      ref: d,
      className: "react-flow__nodesselection-rect",
      onContextMenu: f,
      tabIndex: n ? void 0 : -1,
      onKeyDown: n ? void 0 : h,
      style: {
        width: o,
        height: s,
        top: a,
        left: i,
      },
    }),
  );
}
var L6 = Ae(M6);
const k6 = (e) => e.nodesSelectionActive,
  td = ({
    children: e,
    onPaneClick: t,
    onPaneMouseEnter: n,
    onPaneMouseMove: r,
    onPaneMouseLeave: o,
    onPaneContextMenu: s,
    onPaneScroll: i,
    deleteKeyCode: a,
    onMove: l,
    onMoveStart: u,
    onMoveEnd: c,
    selectionKeyCode: d,
    selectionOnDrag: f,
    selectionMode: h,
    onSelectionStart: p,
    onSelectionEnd: g,
    multiSelectionKeyCode: m,
    panActivationKeyCode: v,
    zoomActivationKeyCode: x,
    elementsSelectable: b,
    zoomOnScroll: _,
    zoomOnPinch: C,
    panOnScroll: A,
    panOnScrollSpeed: I,
    panOnScrollMode: S,
    zoomOnDoubleClick: P,
    panOnDrag: k,
    defaultViewport: j,
    translateExtent: z,
    minZoom: B,
    maxZoom: E,
    preventScrolling: N,
    onSelectionContextMenu: w,
    noWheelClassName: O,
    noPanClassName: L,
    disableKeyboardA11y: D,
  }) => {
    const T = we(k6),
      R = yr(d),
      H = yr(v),
      V = H || k,
      W = H || A,
      Y = R || (f && V !== !0);
    return (
      E6({ deleteKeyCode: a, multiSelectionKeyCode: m }),
      $.createElement(
        b6,
        {
          onMove: l,
          onMoveStart: u,
          onMoveEnd: c,
          onPaneContextMenu: s,
          elementsSelectable: b,
          zoomOnScroll: _,
          zoomOnPinch: C,
          panOnScroll: W,
          panOnScrollSpeed: I,
          panOnScrollMode: S,
          zoomOnDoubleClick: P,
          panOnDrag: !R && V,
          defaultViewport: j,
          translateExtent: z,
          minZoom: B,
          maxZoom: E,
          zoomActivationKeyCode: x,
          preventScrolling: N,
          noWheelClassName: O,
          noPanClassName: L,
        },
        $.createElement(
          Ku,
          {
            onSelectionStart: p,
            onSelectionEnd: g,
            onPaneClick: t,
            onPaneMouseEnter: n,
            onPaneMouseMove: r,
            onPaneMouseLeave: o,
            onPaneContextMenu: s,
            onPaneScroll: i,
            panOnDrag: V,
            isSelecting: !!Y,
            selectionMode: h,
          },
          e,
          T &&
            $.createElement(L6, {
              onSelectionContextMenu: w,
              noPanClassName: L,
              disableKeyboardA11y: D,
            }),
        ),
      )
    );
  };
td.displayName = "FlowRenderer";
var P6 = Ae(td);
function j6(e) {
  return we(
    ge(
      (n) =>
        e
          ? Ru(
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
function $6(e) {
  const t = {
      input: Jn(e.input || Bu),
      default: Jn(e.default || ni),
      output: Jn(e.output || Vu),
      group: Jn(e.group || Yi),
    },
    n = {},
    r = Object.keys(e)
      .filter((o) => !["input", "default", "output", "group"].includes(o))
      .reduce((o, s) => ((o[s] = Jn(e[s] || ni)), o), n);
  return {
    ...t,
    ...r,
  };
}
const F6 = ({ x: e, y: t, width: n, height: r, origin: o }) =>
    !n || !r
      ? { x: e, y: t }
      : o[0] < 0 || o[1] < 0 || o[0] > 1 || o[1] > 1
        ? { x: e, y: t }
        : {
            x: e - n * o[0],
            y: t - r * o[1],
          },
  H6 = (e) => ({
    nodesDraggable: e.nodesDraggable,
    nodesConnectable: e.nodesConnectable,
    nodesFocusable: e.nodesFocusable,
    elementsSelectable: e.elementsSelectable,
    updateNodeDimensions: e.updateNodeDimensions,
    onError: e.onError,
  }),
  nd = (e) => {
    const {
        nodesDraggable: t,
        nodesConnectable: n,
        nodesFocusable: r,
        elementsSelectable: o,
        updateNodeDimensions: s,
        onError: i,
      } = we(H6, $e),
      a = j6(e.onlyRenderVisibleElements),
      l = se(),
      u = Ie(() => {
        if (typeof ResizeObserver > "u") return null;
        const c = new ResizeObserver((d) => {
          const f = d.map((h) => ({
            id: h.target.getAttribute("data-id"),
            nodeElement: h.target,
            forceUpdate: !0,
          }));
          s(f);
        });
        return (l.current = c), c;
      }, []);
    return (
      ie(
        () => () => {
          var c;
          (c = l == null ? void 0 : l.current) == null || c.disconnect();
        },
        [],
      ),
      $.createElement(
        "div",
        { className: "react-flow__nodes", style: Zi },
        a.map((c) => {
          var C, A, I;
          let d = c.type || "default";
          e.nodeTypes[d] ||
            (i == null || i("003", ht.error003(d)), (d = "default"));
          const f = e.nodeTypes[d] || e.nodeTypes.default,
            h = !!(c.draggable || (t && typeof c.draggable > "u")),
            p = !!(c.selectable || (o && typeof c.selectable > "u")),
            g = !!(c.connectable || (n && typeof c.connectable > "u")),
            m = !!(c.focusable || (r && typeof c.focusable > "u")),
            v = e.nodeExtent
              ? $i(c.positionAbsolute, e.nodeExtent)
              : c.positionAbsolute,
            x = (v == null ? void 0 : v.x) ?? 0,
            b = (v == null ? void 0 : v.y) ?? 0,
            _ = F6({
              x,
              y: b,
              width: c.width ?? 0,
              height: c.height ?? 0,
              origin: e.nodeOrigin,
            });
          return $.createElement(f, {
            key: c.id,
            id: c.id,
            className: c.className,
            style: c.style,
            type: d,
            data: c.data,
            sourcePosition: c.sourcePosition || ne.Bottom,
            targetPosition: c.targetPosition || ne.Top,
            hidden: c.hidden,
            xPos: x,
            yPos: b,
            xPosOrigin: _.x,
            yPosOrigin: _.y,
            selectNodesOnDrag: e.selectNodesOnDrag,
            onClick: e.onNodeClick,
            onMouseEnter: e.onNodeMouseEnter,
            onMouseMove: e.onNodeMouseMove,
            onMouseLeave: e.onNodeMouseLeave,
            onContextMenu: e.onNodeContextMenu,
            onDoubleClick: e.onNodeDoubleClick,
            selected: !!c.selected,
            isDraggable: h,
            isSelectable: p,
            isConnectable: g,
            isFocusable: m,
            resizeObserver: u,
            dragHandle: c.dragHandle,
            zIndex: ((C = c[Te]) == null ? void 0 : C.z) ?? 0,
            isParent: !!((A = c[Te]) != null && A.isParent),
            noDragClassName: e.noDragClassName,
            noPanClassName: e.noPanClassName,
            initialized: !!c.width && !!c.height,
            rfId: e.rfId,
            disableKeyboardA11y: e.disableKeyboardA11y,
            ariaLabel: c.ariaLabel,
            hasHandleBounds: !!((I = c[Te]) != null && I.handleBounds),
          });
        }),
      )
    );
  };
nd.displayName = "NodeRenderer";
var B6 = Ae(nd);
const z6 = (e, t, n) => (n === ne.Left ? e - t : n === ne.Right ? e + t : e),
  V6 = (e, t, n) => (n === ne.Top ? e - t : n === ne.Bottom ? e + t : e),
  Ic = "react-flow__edgeupdater",
  Oc = ({
    position: e,
    centerX: t,
    centerY: n,
    radius: r = 10,
    onMouseDown: o,
    onMouseEnter: s,
    onMouseOut: i,
    type: a,
  }) =>
    $.createElement("circle", {
      onMouseDown: o,
      onMouseEnter: s,
      onMouseOut: i,
      className: ze([Ic, `${Ic}-${a}`]),
      cx: z6(t, r, e),
      cy: V6(n, r, e),
      r,
      stroke: "transparent",
      fill: "transparent",
    }),
  W6 = () => !0;
var bn = (e) => {
  const t = ({
    id: n,
    className: r,
    type: o,
    data: s,
    onClick: i,
    onEdgeDoubleClick: a,
    selected: l,
    animated: u,
    label: c,
    labelStyle: d,
    labelShowBg: f,
    labelBgStyle: h,
    labelBgPadding: p,
    labelBgBorderRadius: g,
    style: m,
    source: v,
    target: x,
    sourceX: b,
    sourceY: _,
    targetX: C,
    targetY: A,
    sourcePosition: I,
    targetPosition: S,
    elementsSelectable: P,
    hidden: k,
    sourceHandleId: j,
    targetHandleId: z,
    onContextMenu: B,
    onMouseEnter: E,
    onMouseMove: N,
    onMouseLeave: w,
    edgeUpdaterRadius: O,
    onEdgeUpdate: L,
    onEdgeUpdateStart: D,
    onEdgeUpdateEnd: T,
    markerEnd: R,
    markerStart: H,
    rfId: V,
    ariaLabel: W,
    isFocusable: Y,
    isUpdatable: Z,
    pathOptions: X,
    interactionWidth: Q,
    disableKeyboardA11y: te,
  }) => {
    const K = se(null),
      [fe, q] = de(!1),
      [ve, je] = de(!1),
      _e = Pe(),
      Fe = Ie(() => `url('#${ei(H, V)}')`, [H, V]),
      Ce = Ie(() => `url('#${ei(R, V)}')`, [R, V]);
    if (k) return null;
    const re = (Re) => {
        var Qe;
        const {
            edges: Xe,
            addSelectedEdges: It,
            unselectNodesAndEdges: Ot,
            multiSelectionActive: Rt,
          } = _e.getState(),
          it = Xe.find((en) => en.id === n);
        it &&
          (P &&
            (_e.setState({ nodesSelectionActive: !1 }),
            it.selected && Rt
              ? (Ot({ nodes: [], edges: [it] }),
                (Qe = K.current) == null || Qe.blur())
              : It([n])),
          i && i(Re, it));
      },
      Me = Kn(n, _e.getState, a),
      Tt = Kn(n, _e.getState, B),
      Qt = Kn(n, _e.getState, E),
      mt = Kn(n, _e.getState, N),
      Ft = Kn(n, _e.getState, w),
      st = (Re, Xe) => {
        if (Re.button !== 0) return;
        const { edges: It, isValidConnection: Ot } = _e.getState(),
          Rt = Xe ? x : v,
          it = (Xe ? z : j) || null,
          Qe = Xe ? "target" : "source",
          en = Ot || W6,
          tn = Xe,
          zt = It.find((at) => at.id === n);
        je(!0), D == null || D(Re, zt, Qe);
        const vt = (at) => {
          je(!1), T == null || T(at, zt, Qe);
        };
        ju({
          event: Re,
          handleId: it,
          nodeId: Rt,
          onConnect: (at) => (L == null ? void 0 : L(zt, at)),
          isTarget: tn,
          getState: _e.getState,
          setState: _e.setState,
          isValidConnection: en,
          edgeUpdaterType: Qe,
          onEdgeUpdateEnd: vt,
        });
      },
      At = (Re) => st(Re, !0),
      yt = (Re) => st(Re, !1),
      qe = () => q(!0),
      Ht = () => q(!1),
      Dt = !P && !i,
      Bt = (Re) => {
        var Xe;
        if (!te && wu.includes(Re.key) && P) {
          const {
            unselectNodesAndEdges: It,
            addSelectedEdges: Ot,
            edges: Rt,
          } = _e.getState();
          Re.key === "Escape"
            ? ((Xe = K.current) == null || Xe.blur(),
              It({ edges: [Rt.find((Qe) => Qe.id === n)] }))
            : Ot([n]);
        }
      };
    return $.createElement(
      "g",
      {
        className: ze([
          "react-flow__edge",
          `react-flow__edge-${o}`,
          r,
          { selected: l, animated: u, inactive: Dt, updating: fe },
        ]),
        onClick: re,
        onDoubleClick: Me,
        onContextMenu: Tt,
        onMouseEnter: Qt,
        onMouseMove: mt,
        onMouseLeave: Ft,
        onKeyDown: Y ? Bt : void 0,
        tabIndex: Y ? 0 : void 0,
        role: Y ? "button" : "img",
        "data-testid": `rf__edge-${n}`,
        "aria-label": W === null ? void 0 : W || `Edge from ${v} to ${x}`,
        "aria-describedby": Y ? `${Yu}-${V}` : void 0,
        ref: K,
      },
      !ve &&
        $.createElement(e, {
          id: n,
          source: v,
          target: x,
          selected: l,
          animated: u,
          label: c,
          labelStyle: d,
          labelShowBg: f,
          labelBgStyle: h,
          labelBgPadding: p,
          labelBgBorderRadius: g,
          data: s,
          style: m,
          sourceX: b,
          sourceY: _,
          targetX: C,
          targetY: A,
          sourcePosition: I,
          targetPosition: S,
          sourceHandleId: j,
          targetHandleId: z,
          markerStart: Fe,
          markerEnd: Ce,
          pathOptions: X,
          interactionWidth: Q,
        }),
      Z &&
        $.createElement(
          $.Fragment,
          null,
          (Z === "source" || Z === !0) &&
            $.createElement(Oc, {
              position: I,
              centerX: b,
              centerY: _,
              radius: O,
              onMouseDown: At,
              onMouseEnter: qe,
              onMouseOut: Ht,
              type: "source",
            }),
          (Z === "target" || Z === !0) &&
            $.createElement(Oc, {
              position: S,
              centerX: C,
              centerY: A,
              radius: O,
              onMouseDown: yt,
              onMouseEnter: qe,
              onMouseOut: Ht,
              type: "target",
            }),
        ),
    );
  };
  return (t.displayName = "EdgeWrapper"), Ae(t);
};
function U6(e) {
  const t = {
      default: bn(e.default || Ao),
      straight: bn(e.bezier || zi),
      step: bn(e.step || Bi),
      smoothstep: bn(e.step || Wo),
      simplebezier: bn(e.simplebezier || Hi),
    },
    n = {},
    r = Object.keys(e)
      .filter((o) => !["default", "bezier"].includes(o))
      .reduce((o, s) => ((o[s] = bn(e[s] || Ao)), o), n);
  return {
    ...t,
    ...r,
  };
}
function Rc(e, t, n = null) {
  const r = ((n == null ? void 0 : n.x) || 0) + t.x,
    o = ((n == null ? void 0 : n.y) || 0) + t.y,
    s = (n == null ? void 0 : n.width) || t.width,
    i = (n == null ? void 0 : n.height) || t.height;
  switch (e) {
    case ne.Top:
      return {
        x: r + s / 2,
        y: o,
      };
    case ne.Right:
      return {
        x: r + s,
        y: o + i / 2,
      };
    case ne.Bottom:
      return {
        x: r + s / 2,
        y: o + i,
      };
    case ne.Left:
      return {
        x: r,
        y: o + i / 2,
      };
  }
}
function Mc(e, t) {
  return e
    ? e.length === 1 || !t
      ? e[0]
      : (t && e.find((n) => n.id === t)) || null
    : null;
}
const Y6 = (e, t, n, r, o, s) => {
  const i = Rc(n, e, t),
    a = Rc(s, r, o);
  return {
    sourceX: i.x,
    sourceY: i.y,
    targetX: a.x,
    targetY: a.y,
  };
};
function Z6({
  sourcePos: e,
  targetPos: t,
  sourceWidth: n,
  sourceHeight: r,
  targetWidth: o,
  targetHeight: s,
  width: i,
  height: a,
  transform: l,
}) {
  const u = {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x + n, t.x + o),
    y2: Math.max(e.y + r, t.y + s),
  };
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = Fi({
      x: (0 - l[0]) / l[2],
      y: (0 - l[1]) / l[2],
      width: i / l[2],
      height: a / l[2],
    }),
    d = Math.max(0, Math.min(c.x2, u.x2) - Math.max(c.x, u.x)),
    f = Math.max(0, Math.min(c.y2, u.y2) - Math.max(c.y, u.y));
  return Math.ceil(d * f) > 0;
}
function Lc(e) {
  var r, o, s, i, a;
  const t =
      ((r = e == null ? void 0 : e[Te]) == null ? void 0 : r.handleBounds) ||
      null,
    n =
      t &&
      (e == null ? void 0 : e.width) &&
      (e == null ? void 0 : e.height) &&
      typeof ((o = e == null ? void 0 : e.positionAbsolute) == null
        ? void 0
        : o.x) < "u" &&
      typeof ((s = e == null ? void 0 : e.positionAbsolute) == null
        ? void 0
        : s.y) < "u";
  return [
    {
      x:
        ((i = e == null ? void 0 : e.positionAbsolute) == null
          ? void 0
          : i.x) || 0,
      y:
        ((a = e == null ? void 0 : e.positionAbsolute) == null
          ? void 0
          : a.y) || 0,
      width: (e == null ? void 0 : e.width) || 0,
      height: (e == null ? void 0 : e.height) || 0,
    },
    t,
    !!n,
  ];
}
const q6 = [{ level: 0, isMaxLevel: !0, edges: [] }];
function X6(e, t, n = !1) {
  let r = -1;
  const o = e.reduce((i, a) => {
      var c, d;
      const l = nt(a.zIndex);
      let u = l ? a.zIndex : 0;
      if (n) {
        const f = t.get(a.target),
          h = t.get(a.source),
          p =
            a.selected ||
            (f == null ? void 0 : f.selected) ||
            (h == null ? void 0 : h.selected),
          g = Math.max(
            ((c = h == null ? void 0 : h[Te]) == null ? void 0 : c.z) || 0,
            ((d = f == null ? void 0 : f[Te]) == null ? void 0 : d.z) || 0,
            1e3,
          );
        u = (l ? a.zIndex : 0) + (p ? g : 0);
      }
      return i[u] ? i[u].push(a) : (i[u] = [a]), (r = u > r ? u : r), i;
    }, {}),
    s = Object.entries(o).map(([i, a]) => {
      const l = +i;
      return {
        edges: a,
        level: l,
        isMaxLevel: l === r,
      };
    });
  return s.length === 0 ? q6 : s;
}
function K6(e, t, n) {
  const r = we(
    ge(
      (o) =>
        e
          ? o.edges.filter((s) => {
              const i = t.get(s.source),
                a = t.get(s.target);
              return (
                (i == null ? void 0 : i.width) &&
                (i == null ? void 0 : i.height) &&
                (a == null ? void 0 : a.width) &&
                (a == null ? void 0 : a.height) &&
                Z6({
                  sourcePos: i.positionAbsolute || { x: 0, y: 0 },
                  targetPos: a.positionAbsolute || { x: 0, y: 0 },
                  sourceWidth: i.width,
                  sourceHeight: i.height,
                  targetWidth: a.width,
                  targetHeight: a.height,
                  width: o.width,
                  height: o.height,
                  transform: o.transform,
                })
              );
            })
          : o.edges,
      [e, t],
    ),
  );
  return X6(r, t, n);
}
const G6 = ({ color: e = "none", strokeWidth: t = 1 }) =>
    $.createElement("polyline", {
      style: {
        stroke: e,
        strokeWidth: t,
      },
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      points: "-5,-4 0,0 -5,4",
    }),
  J6 = ({ color: e = "none", strokeWidth: t = 1 }) =>
    $.createElement("polyline", {
      style: {
        stroke: e,
        fill: e,
        strokeWidth: t,
      },
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4 -5,-4",
    }),
  kc = {
    [To.Arrow]: G6,
    [To.ArrowClosed]: J6,
  };
function Q6(e) {
  const t = Pe();
  return Ie(() => {
    var o, s;
    return Object.prototype.hasOwnProperty.call(kc, e)
      ? kc[e]
      : ((s = (o = t.getState()).onError) == null ||
          s.call(o, "009", ht.error009(e)),
        null);
  }, [e]);
}
const e7 = ({
    id: e,
    type: t,
    color: n,
    width: r = 12.5,
    height: o = 12.5,
    markerUnits: s = "strokeWidth",
    strokeWidth: i,
    orient: a = "auto-start-reverse",
  }) => {
    const l = Q6(t);
    return l
      ? $.createElement(
          "marker",
          {
            className: "react-flow__arrowhead",
            id: e,
            markerWidth: `${r}`,
            markerHeight: `${o}`,
            viewBox: "-10 -10 20 20",
            markerUnits: s,
            orient: a,
            refX: "0",
            refY: "0",
          },
          $.createElement(l, { color: n, strokeWidth: i }),
        )
      : null;
  },
  t7 =
    ({ defaultColor: e, rfId: t }) =>
    (n) => {
      const r = [];
      return n.edges
        .reduce(
          (o, s) => (
            [s.markerStart, s.markerEnd].forEach((i) => {
              if (i && typeof i == "object") {
                const a = ei(i, t);
                r.includes(a) ||
                  (o.push({ id: a, color: i.color || e, ...i }), r.push(a));
              }
            }),
            o
          ),
          [],
        )
        .sort((o, s) => o.id.localeCompare(s.id));
    },
  rd = ({ defaultColor: e, rfId: t }) => {
    const n = we(
      ge(t7({ defaultColor: e, rfId: t }), [e, t]),
      // the id includes all marker options, so we just need to look at that part of the marker
      (r, o) => !(r.length !== o.length || r.some((s, i) => s.id !== o[i].id)),
    );
    return $.createElement(
      "defs",
      null,
      n.map((r) =>
        $.createElement(e7, {
          id: r.id,
          key: r.id,
          type: r.type,
          color: r.color,
          width: r.width,
          height: r.height,
          markerUnits: r.markerUnits,
          strokeWidth: r.strokeWidth,
          orient: r.orient,
        }),
      ),
    );
  };
rd.displayName = "MarkerDefinitions";
var n7 = Ae(rd);
const r7 = (e) => ({
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
  od = ({
    defaultMarkerColor: e,
    onlyRenderVisibleElements: t,
    elevateEdgesOnSelect: n,
    rfId: r,
    edgeTypes: o,
    noPanClassName: s,
    onEdgeUpdate: i,
    onEdgeContextMenu: a,
    onEdgeMouseEnter: l,
    onEdgeMouseMove: u,
    onEdgeMouseLeave: c,
    onEdgeClick: d,
    edgeUpdaterRadius: f,
    onEdgeDoubleClick: h,
    onEdgeUpdateStart: p,
    onEdgeUpdateEnd: g,
    children: m,
    disableKeyboardA11y: v,
  }) => {
    const {
        edgesFocusable: x,
        edgesUpdatable: b,
        elementsSelectable: _,
        width: C,
        height: A,
        connectionMode: I,
        nodeInternals: S,
        onError: P,
      } = we(r7, $e),
      k = K6(t, S, n);
    return C
      ? $.createElement(
          $.Fragment,
          null,
          k.map(({ level: j, edges: z, isMaxLevel: B }) =>
            $.createElement(
              "svg",
              {
                key: j,
                style: { zIndex: j },
                width: C,
                height: A,
                className: "react-flow__edges react-flow__container",
              },
              B && $.createElement(n7, { defaultColor: e, rfId: r }),
              $.createElement(
                "g",
                null,
                z.map((E) => {
                  const [N, w, O] = Lc(S.get(E.source)),
                    [L, D, T] = Lc(S.get(E.target));
                  if (!O || !T) return null;
                  let R = E.type || "default";
                  o[R] ||
                    (P == null || P("011", ht.error011(R)), (R = "default"));
                  const H = o[R] || o.default,
                    V =
                      I === hn.Strict
                        ? D.target
                        : (D.target ?? []).concat(D.source ?? []),
                    W = Mc(w.source, E.sourceHandle),
                    Y = Mc(V, E.targetHandle),
                    Z = (W == null ? void 0 : W.position) || ne.Bottom,
                    X = (Y == null ? void 0 : Y.position) || ne.Top,
                    Q = !!(E.focusable || (x && typeof E.focusable > "u")),
                    te =
                      typeof i < "u" &&
                      (E.updatable || (b && typeof E.updatable > "u"));
                  if (!W || !Y)
                    return P == null || P("008", ht.error008(W, E)), null;
                  const {
                    sourceX: K,
                    sourceY: fe,
                    targetX: q,
                    targetY: ve,
                  } = Y6(N, W, Z, L, Y, X);
                  return $.createElement(H, {
                    key: E.id,
                    id: E.id,
                    className: ze([E.className, s]),
                    type: R,
                    data: E.data,
                    selected: !!E.selected,
                    animated: !!E.animated,
                    hidden: !!E.hidden,
                    label: E.label,
                    labelStyle: E.labelStyle,
                    labelShowBg: E.labelShowBg,
                    labelBgStyle: E.labelBgStyle,
                    labelBgPadding: E.labelBgPadding,
                    labelBgBorderRadius: E.labelBgBorderRadius,
                    style: E.style,
                    source: E.source,
                    target: E.target,
                    sourceHandleId: E.sourceHandle,
                    targetHandleId: E.targetHandle,
                    markerEnd: E.markerEnd,
                    markerStart: E.markerStart,
                    sourceX: K,
                    sourceY: fe,
                    targetX: q,
                    targetY: ve,
                    sourcePosition: Z,
                    targetPosition: X,
                    elementsSelectable: _,
                    onEdgeUpdate: i,
                    onContextMenu: a,
                    onMouseEnter: l,
                    onMouseMove: u,
                    onMouseLeave: c,
                    onClick: d,
                    edgeUpdaterRadius: f,
                    onEdgeDoubleClick: h,
                    onEdgeUpdateStart: p,
                    onEdgeUpdateEnd: g,
                    rfId: r,
                    ariaLabel: E.ariaLabel,
                    isFocusable: Q,
                    isUpdatable: te,
                    pathOptions: "pathOptions" in E ? E.pathOptions : void 0,
                    interactionWidth: E.interactionWidth,
                    disableKeyboardA11y: v,
                  });
                }),
              ),
            ),
          ),
          m,
        )
      : null;
  };
od.displayName = "EdgeRenderer";
var o7 = Ae(od);
const s7 = (e) =>
  `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function i7({ children: e }) {
  const t = we(s7);
  return $.createElement(
    "div",
    {
      className: "react-flow__viewport react-flow__container",
      style: { transform: t },
    },
    e,
  );
}
function a7(e) {
  const t = wt(),
    n = se(!1);
  ie(() => {
    !n.current &&
      t.viewportInitialized &&
      e &&
      (setTimeout(() => e(t), 1), (n.current = !0));
  }, [e, t.viewportInitialized]);
}
const c7 = {
    [ne.Left]: ne.Right,
    [ne.Right]: ne.Left,
    [ne.Top]: ne.Bottom,
    [ne.Bottom]: ne.Top,
  },
  sd = ({
    nodeId: e,
    handleType: t,
    style: n,
    type: r = qt.Bezier,
    CustomComponent: o,
    connectionStatus: s,
  }) => {
    var A, I, S;
    const {
        fromNode: i,
        handleId: a,
        toX: l,
        toY: u,
        connectionMode: c,
      } = we(
        ge(
          (P) => ({
            fromNode: P.nodeInternals.get(e),
            handleId: P.connectionHandleId,
            toX: (P.connectionPosition.x - P.transform[0]) / P.transform[2],
            toY: (P.connectionPosition.y - P.transform[1]) / P.transform[2],
            connectionMode: P.connectionMode,
          }),
          [e],
        ),
        $e,
      ),
      d = (A = i == null ? void 0 : i[Te]) == null ? void 0 : A.handleBounds;
    let f = d == null ? void 0 : d[t];
    if (
      (c === hn.Loose &&
        (f =
          f || (d == null ? void 0 : d[t === "source" ? "target" : "source"])),
      !i || !f)
    )
      return null;
    const h = a ? f.find((P) => P.id === a) : f[0],
      p = h ? h.x + h.width / 2 : (i.width ?? 0) / 2,
      g = h ? h.y + h.height / 2 : i.height ?? 0,
      m = (((I = i.positionAbsolute) == null ? void 0 : I.x) ?? 0) + p,
      v = (((S = i.positionAbsolute) == null ? void 0 : S.y) ?? 0) + g,
      x = h == null ? void 0 : h.position,
      b = x ? c7[x] : null;
    if (!x || !b) return null;
    if (o)
      return $.createElement(o, {
        connectionLineType: r,
        connectionLineStyle: n,
        fromNode: i,
        fromHandle: h,
        fromX: m,
        fromY: v,
        toX: l,
        toY: u,
        fromPosition: x,
        toPosition: b,
        connectionStatus: s,
      });
    let _ = "";
    const C = {
      sourceX: m,
      sourceY: v,
      sourcePosition: x,
      targetX: l,
      targetY: u,
      targetPosition: b,
    };
    return (
      r === qt.Bezier
        ? ([_] = Iu(C))
        : r === qt.Step
          ? ([_] = Qs({
              ...C,
              borderRadius: 0,
            }))
          : r === qt.SmoothStep
            ? ([_] = Qs(C))
            : r === qt.SimpleBezier
              ? ([_] = Du(C))
              : (_ = `M${m},${v} ${l},${u}`),
      $.createElement("path", {
        d: _,
        fill: "none",
        className: "react-flow__connection-path",
        style: n,
      })
    );
  };
sd.displayName = "ConnectionLine";
const l7 = (e) => ({
  nodeId: e.connectionNodeId,
  handleType: e.connectionHandleType,
  nodesConnectable: e.nodesConnectable,
  connectionStatus: e.connectionStatus,
  width: e.width,
  height: e.height,
});
function u7({ containerStyle: e, style: t, type: n, component: r }) {
  const {
    nodeId: o,
    handleType: s,
    nodesConnectable: i,
    width: a,
    height: l,
    connectionStatus: u,
  } = we(l7, $e);
  return !(o && s && a && i)
    ? null
    : $.createElement(
        "svg",
        {
          style: e,
          width: a,
          height: l,
          className:
            "react-flow__edges react-flow__connectionline react-flow__container",
        },
        $.createElement(
          "g",
          { className: ze(["react-flow__connection", u]) },
          $.createElement(sd, {
            nodeId: o,
            handleType: s,
            style: t,
            type: n,
            CustomComponent: r,
            connectionStatus: u,
          }),
        ),
      );
}
function Pc(e, t) {
  const n = se(null),
    r = Pe();
  return Ie(() => {
    var s, i;
    if (process.env.NODE_ENV === "development") {
      const a = Object.keys(e);
      $e(n.current, a) &&
        ((i = (s = r.getState()).onError) == null ||
          i.call(s, "002", ht.error002())),
        (n.current = a);
    }
    return t(e);
  }, [e]);
}
const id = ({
  nodeTypes: e,
  edgeTypes: t,
  onMove: n,
  onMoveStart: r,
  onMoveEnd: o,
  onInit: s,
  onNodeClick: i,
  onEdgeClick: a,
  onNodeDoubleClick: l,
  onEdgeDoubleClick: u,
  onNodeMouseEnter: c,
  onNodeMouseMove: d,
  onNodeMouseLeave: f,
  onNodeContextMenu: h,
  onSelectionContextMenu: p,
  onSelectionStart: g,
  onSelectionEnd: m,
  connectionLineType: v,
  connectionLineStyle: x,
  connectionLineComponent: b,
  connectionLineContainerStyle: _,
  selectionKeyCode: C,
  selectionOnDrag: A,
  selectionMode: I,
  multiSelectionKeyCode: S,
  panActivationKeyCode: P,
  zoomActivationKeyCode: k,
  deleteKeyCode: j,
  onlyRenderVisibleElements: z,
  elementsSelectable: B,
  selectNodesOnDrag: E,
  defaultViewport: N,
  translateExtent: w,
  minZoom: O,
  maxZoom: L,
  preventScrolling: D,
  defaultMarkerColor: T,
  zoomOnScroll: R,
  zoomOnPinch: H,
  panOnScroll: V,
  panOnScrollSpeed: W,
  panOnScrollMode: Y,
  zoomOnDoubleClick: Z,
  panOnDrag: X,
  onPaneClick: Q,
  onPaneMouseEnter: te,
  onPaneMouseMove: K,
  onPaneMouseLeave: fe,
  onPaneScroll: q,
  onPaneContextMenu: ve,
  onEdgeUpdate: je,
  onEdgeContextMenu: _e,
  onEdgeMouseEnter: Fe,
  onEdgeMouseMove: Ce,
  onEdgeMouseLeave: re,
  edgeUpdaterRadius: Me,
  onEdgeUpdateStart: Tt,
  onEdgeUpdateEnd: Qt,
  noDragClassName: mt,
  noWheelClassName: Ft,
  noPanClassName: st,
  elevateEdgesOnSelect: At,
  disableKeyboardA11y: yt,
  nodeOrigin: qe,
  nodeExtent: Ht,
  rfId: Dt,
}) => {
  const Bt = Pc(e, $6),
    Re = Pc(t, U6);
  return (
    a7(s),
    $.createElement(
      P6,
      {
        onPaneClick: Q,
        onPaneMouseEnter: te,
        onPaneMouseMove: K,
        onPaneMouseLeave: fe,
        onPaneContextMenu: ve,
        onPaneScroll: q,
        deleteKeyCode: j,
        selectionKeyCode: C,
        selectionOnDrag: A,
        selectionMode: I,
        onSelectionStart: g,
        onSelectionEnd: m,
        multiSelectionKeyCode: S,
        panActivationKeyCode: P,
        zoomActivationKeyCode: k,
        elementsSelectable: B,
        onMove: n,
        onMoveStart: r,
        onMoveEnd: o,
        zoomOnScroll: R,
        zoomOnPinch: H,
        zoomOnDoubleClick: Z,
        panOnScroll: V,
        panOnScrollSpeed: W,
        panOnScrollMode: Y,
        panOnDrag: X,
        defaultViewport: N,
        translateExtent: w,
        minZoom: O,
        maxZoom: L,
        onSelectionContextMenu: p,
        preventScrolling: D,
        noDragClassName: mt,
        noWheelClassName: Ft,
        noPanClassName: st,
        disableKeyboardA11y: yt,
      },
      $.createElement(
        i7,
        null,
        $.createElement(
          o7,
          {
            edgeTypes: Re,
            onEdgeClick: a,
            onEdgeDoubleClick: u,
            onEdgeUpdate: je,
            onlyRenderVisibleElements: z,
            onEdgeContextMenu: _e,
            onEdgeMouseEnter: Fe,
            onEdgeMouseMove: Ce,
            onEdgeMouseLeave: re,
            onEdgeUpdateStart: Tt,
            onEdgeUpdateEnd: Qt,
            edgeUpdaterRadius: Me,
            defaultMarkerColor: T,
            noPanClassName: st,
            elevateEdgesOnSelect: !!At,
            disableKeyboardA11y: yt,
            rfId: Dt,
          },
          $.createElement(u7, {
            style: x,
            type: v,
            component: b,
            containerStyle: _,
          }),
        ),
        $.createElement("div", { className: "react-flow__edgelabel-renderer" }),
        $.createElement(B6, {
          nodeTypes: Bt,
          onNodeClick: i,
          onNodeDoubleClick: l,
          onNodeMouseEnter: c,
          onNodeMouseMove: d,
          onNodeMouseLeave: f,
          onNodeContextMenu: h,
          selectNodesOnDrag: E,
          onlyRenderVisibleElements: z,
          noPanClassName: st,
          noDragClassName: mt,
          disableKeyboardA11y: yt,
          nodeOrigin: qe,
          nodeExtent: Ht,
          rfId: Dt,
        }),
      ),
    )
  );
};
id.displayName = "GraphView";
var d7 = Ae(id);
const oi = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  Wt = {
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
    translateExtent: oi,
    nodeExtent: oi,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionNodeId: null,
    connectionHandleId: null,
    connectionHandleType: "source",
    connectionPosition: { x: 0, y: 0 },
    connectionStatus: null,
    connectionMode: hn.Strict,
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
    onError: Su,
    isValidConnection: void 0,
  },
  f7 = () =>
    Gp(
      (e, t) => ({
        ...Wt,
        setNodes: (n) => {
          const {
            nodeInternals: r,
            nodeOrigin: o,
            elevateNodesOnSelect: s,
          } = t();
          e({ nodeInternals: ws(n, r, o, s) });
        },
        getNodes: () => Array.from(t().nodeInternals.values()),
        setEdges: (n) => {
          const { defaultEdgeOptions: r = {} } = t();
          e({ edges: n.map((o) => ({ ...r, ...o })) });
        },
        setDefaultNodesAndEdges: (n, r) => {
          const o = typeof n < "u",
            s = typeof r < "u",
            i = o
              ? ws(
                  n,
                  /* @__PURE__ */ new Map(),
                  t().nodeOrigin,
                  t().elevateNodesOnSelect,
                )
              : /* @__PURE__ */ new Map();
          e({
            nodeInternals: i,
            edges: s ? r : [],
            hasDefaultNodes: o,
            hasDefaultEdges: s,
          });
        },
        updateNodeDimensions: (n) => {
          const {
              onNodesChange: r,
              nodeInternals: o,
              fitViewOnInit: s,
              fitViewOnInitDone: i,
              fitViewOnInitOptions: a,
              domNode: l,
              nodeOrigin: u,
            } = t(),
            c = l == null ? void 0 : l.querySelector(".react-flow__viewport");
          if (!c) return;
          const d = window.getComputedStyle(c),
            { m22: f } = new window.DOMMatrixReadOnly(d.transform),
            h = n.reduce((g, m) => {
              const v = o.get(m.id);
              if (v != null && v.hidden)
                o.set(v.id, {
                  ...v,
                  [Te]: {
                    ...v[Te],
                    // we need to reset the handle bounds when the node is hidden
                    // in order to force a new observation when the node is shown again
                    handleBounds: void 0,
                  },
                });
              else if (v) {
                const x = ji(m.nodeElement);
                !!(
                  x.width &&
                  x.height &&
                  (v.width !== x.width ||
                    v.height !== x.height ||
                    m.forceUpdate)
                ) &&
                  (o.set(v.id, {
                    ...v,
                    [Te]: {
                      ...v[Te],
                      handleBounds: {
                        source: Dc(".source", m.nodeElement, f, u),
                        target: Dc(".target", m.nodeElement, f, u),
                      },
                    },
                    ...x,
                  }),
                  g.push({
                    id: v.id,
                    type: "dimensions",
                    dimensions: x,
                  }));
              }
              return g;
            }, []);
          qu(o, u);
          const p = i || (s && !i && Xu(t, { initial: !0, ...a }));
          e({ nodeInternals: new Map(o), fitViewOnInitDone: p }),
            (h == null ? void 0 : h.length) > 0 && (r == null || r(h));
        },
        updateNodePositions: (n, r = !0, o = !1) => {
          const { triggerNodeChanges: s } = t(),
            i = n.map((a) => {
              const l = {
                id: a.id,
                type: "position",
                dragging: o,
              };
              return (
                r &&
                  ((l.positionAbsolute = a.positionAbsolute),
                  (l.position = a.position)),
                l
              );
            });
          s(i);
        },
        triggerNodeChanges: (n) => {
          const {
            onNodesChange: r,
            nodeInternals: o,
            hasDefaultNodes: s,
            nodeOrigin: i,
            getNodes: a,
            elevateNodesOnSelect: l,
          } = t();
          if (n != null && n.length) {
            if (s) {
              const u = T6(n, a()),
                c = ws(u, o, i, l);
              e({ nodeInternals: c });
            }
            r == null || r(n);
          }
        },
        addSelectedNodes: (n) => {
          const { multiSelectionActive: r, edges: o, getNodes: s } = t();
          let i,
            a = null;
          r
            ? (i = n.map((l) => Zt(l, !0)))
            : ((i = wn(s(), n)), (a = wn(o, []))),
            Kr({
              changedNodes: i,
              changedEdges: a,
              get: t,
              set: e,
            });
        },
        addSelectedEdges: (n) => {
          const { multiSelectionActive: r, edges: o, getNodes: s } = t();
          let i,
            a = null;
          r
            ? (i = n.map((l) => Zt(l, !0)))
            : ((i = wn(o, n)), (a = wn(s(), []))),
            Kr({
              changedNodes: a,
              changedEdges: i,
              get: t,
              set: e,
            });
        },
        unselectNodesAndEdges: ({ nodes: n, edges: r } = {}) => {
          const { edges: o, getNodes: s } = t(),
            i = n || s(),
            a = r || o,
            l = i.map((c) => ((c.selected = !1), Zt(c.id, !1))),
            u = a.map((c) => Zt(c.id, !1));
          Kr({
            changedNodes: l,
            changedEdges: u,
            get: t,
            set: e,
          });
        },
        setMinZoom: (n) => {
          const { d3Zoom: r, maxZoom: o } = t();
          r == null || r.scaleExtent([n, o]), e({ minZoom: n });
        },
        setMaxZoom: (n) => {
          const { d3Zoom: r, minZoom: o } = t();
          r == null || r.scaleExtent([o, n]), e({ maxZoom: n });
        },
        setTranslateExtent: (n) => {
          var r;
          (r = t().d3Zoom) == null || r.translateExtent(n),
            e({ translateExtent: n });
        },
        resetSelectedElements: () => {
          const { edges: n, getNodes: r } = t(),
            s = r()
              .filter((a) => a.selected)
              .map((a) => Zt(a.id, !1)),
            i = n.filter((a) => a.selected).map((a) => Zt(a.id, !1));
          Kr({
            changedNodes: s,
            changedEdges: i,
            get: t,
            set: e,
          });
        },
        setNodeExtent: (n) => {
          const { nodeInternals: r } = t();
          r.forEach((o) => {
            o.positionAbsolute = $i(o.position, n);
          }),
            e({
              nodeExtent: n,
              nodeInternals: new Map(r),
            });
        },
        panBy: (n) => {
          const {
            transform: r,
            width: o,
            height: s,
            d3Zoom: i,
            d3Selection: a,
            translateExtent: l,
          } = t();
          if (!i || !a || (!n.x && !n.y)) return !1;
          const u = Kt.translate(r[0] + n.x, r[1] + n.y).scale(r[2]),
            c = [
              [0, 0],
              [o, s],
            ],
            d = i == null ? void 0 : i.constrain()(u, c, l);
          return (
            i.transform(a, d), r[0] !== d.x || r[1] !== d.y || r[2] !== d.k
          );
        },
        cancelConnection: () =>
          e({
            connectionNodeId: Wt.connectionNodeId,
            connectionHandleId: Wt.connectionHandleId,
            connectionHandleType: Wt.connectionHandleType,
            connectionStatus: Wt.connectionStatus,
            connectionStartHandle: Wt.connectionStartHandle,
            connectionEndHandle: Wt.connectionEndHandle,
          }),
        reset: () => e({ ...Wt }),
      }),
      Object.is,
    ),
  qi = ({ children: e }) => {
    const t = se(null);
    return (
      t.current || (t.current = f7()),
      $.createElement(Im, { value: t.current }, e)
    );
  };
qi.displayName = "ReactFlowProvider";
const ad = ({ children: e }) =>
  Ze(Vo) ? $.createElement($.Fragment, null, e) : $.createElement(qi, null, e);
ad.displayName = "ReactFlowWrapper";
const h7 = {
    input: Bu,
    default: ni,
    output: Vu,
    group: Yi,
  },
  p7 = {
    default: Ao,
    straight: zi,
    step: Bi,
    smoothstep: Wo,
    simplebezier: Hi,
  },
  g7 = [0, 0],
  m7 = [15, 15],
  y7 = { x: 0, y: 0, zoom: 1 },
  v7 = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
  },
  cd = Zc(
    (
      {
        nodes: e,
        edges: t,
        defaultNodes: n,
        defaultEdges: r,
        className: o,
        nodeTypes: s = h7,
        edgeTypes: i = p7,
        onNodeClick: a,
        onEdgeClick: l,
        onInit: u,
        onMove: c,
        onMoveStart: d,
        onMoveEnd: f,
        onConnect: h,
        onConnectStart: p,
        onConnectEnd: g,
        onClickConnectStart: m,
        onClickConnectEnd: v,
        onNodeMouseEnter: x,
        onNodeMouseMove: b,
        onNodeMouseLeave: _,
        onNodeContextMenu: C,
        onNodeDoubleClick: A,
        onNodeDragStart: I,
        onNodeDrag: S,
        onNodeDragStop: P,
        onNodesDelete: k,
        onEdgesDelete: j,
        onSelectionChange: z,
        onSelectionDragStart: B,
        onSelectionDrag: E,
        onSelectionDragStop: N,
        onSelectionContextMenu: w,
        onSelectionStart: O,
        onSelectionEnd: L,
        connectionMode: D = hn.Strict,
        connectionLineType: T = qt.Bezier,
        connectionLineStyle: R,
        connectionLineComponent: H,
        connectionLineContainerStyle: V,
        deleteKeyCode: W = "Backspace",
        selectionKeyCode: Y = "Shift",
        selectionOnDrag: Z = !1,
        selectionMode: X = mr.Full,
        panActivationKeyCode: Q = "Space",
        multiSelectionKeyCode: te = No() ? "Meta" : "Control",
        zoomActivationKeyCode: K = No() ? "Meta" : "Control",
        snapToGrid: fe = !1,
        snapGrid: q = m7,
        onlyRenderVisibleElements: ve = !1,
        selectNodesOnDrag: je = !0,
        nodesDraggable: _e,
        nodesConnectable: Fe,
        nodesFocusable: Ce,
        nodeOrigin: re = g7,
        edgesFocusable: Me,
        edgesUpdatable: Tt,
        elementsSelectable: Qt,
        defaultViewport: mt = y7,
        minZoom: Ft = 0.5,
        maxZoom: st = 2,
        translateExtent: At = oi,
        preventScrolling: yt = !0,
        nodeExtent: qe,
        defaultMarkerColor: Ht = "#b1b1b7",
        zoomOnScroll: Dt = !0,
        zoomOnPinch: Bt = !0,
        panOnScroll: Re = !1,
        panOnScrollSpeed: Xe = 0.5,
        panOnScrollMode: It = ln.Free,
        zoomOnDoubleClick: Ot = !0,
        panOnDrag: Rt = !0,
        onPaneClick: it,
        onPaneMouseEnter: Qe,
        onPaneMouseMove: en,
        onPaneMouseLeave: tn,
        onPaneScroll: zt,
        onPaneContextMenu: vt,
        children: yn,
        onEdgeUpdate: at,
        onEdgeContextMenu: Ar,
        onEdgeDoubleClick: Zo,
        onEdgeMouseEnter: Dr,
        onEdgeMouseMove: qo,
        onEdgeMouseLeave: Ir,
        onEdgeUpdateStart: Or,
        onEdgeUpdateEnd: Xo,
        edgeUpdaterRadius: Ko = 10,
        onNodesChange: Rr,
        onEdgesChange: Go,
        noDragClassName: Jo = "nodrag",
        noWheelClassName: Qo = "nowheel",
        noPanClassName: Mr = "nopan",
        fitView: M = !1,
        fitViewOptions: U,
        connectOnClick: J = !0,
        attributionPosition: oe,
        proOptions: pe,
        defaultEdgeOptions: Ee,
        elevateNodesOnSelect: he = !0,
        elevateEdgesOnSelect: ce = !1,
        disableKeyboardA11y: Le = !1,
        autoPanOnConnect: be = !0,
        autoPanOnNodeDrag: Se = !0,
        connectionRadius: Ve = 20,
        isValidConnection: Vt,
        onError: Lr,
        style: ct,
        id: sa,
        nodeDragThreshold: Fd,
        ...Hd
      },
      Bd,
    ) => {
      const es = sa || "1";
      return $.createElement(
        "div",
        {
          ...Hd,
          style: { ...ct, ...v7 },
          ref: Bd,
          className: ze(["react-flow", o]),
          "data-testid": "rf__wrapper",
          id: sa,
        },
        $.createElement(
          ad,
          null,
          $.createElement(d7, {
            onInit: u,
            onMove: c,
            onMoveStart: d,
            onMoveEnd: f,
            onNodeClick: a,
            onEdgeClick: l,
            onNodeMouseEnter: x,
            onNodeMouseMove: b,
            onNodeMouseLeave: _,
            onNodeContextMenu: C,
            onNodeDoubleClick: A,
            nodeTypes: s,
            edgeTypes: i,
            connectionLineType: T,
            connectionLineStyle: R,
            connectionLineComponent: H,
            connectionLineContainerStyle: V,
            selectionKeyCode: Y,
            selectionOnDrag: Z,
            selectionMode: X,
            deleteKeyCode: W,
            multiSelectionKeyCode: te,
            panActivationKeyCode: Q,
            zoomActivationKeyCode: K,
            onlyRenderVisibleElements: ve,
            selectNodesOnDrag: je,
            defaultViewport: mt,
            translateExtent: At,
            minZoom: Ft,
            maxZoom: st,
            preventScrolling: yt,
            zoomOnScroll: Dt,
            zoomOnPinch: Bt,
            zoomOnDoubleClick: Ot,
            panOnScroll: Re,
            panOnScrollSpeed: Xe,
            panOnScrollMode: It,
            panOnDrag: Rt,
            onPaneClick: it,
            onPaneMouseEnter: Qe,
            onPaneMouseMove: en,
            onPaneMouseLeave: tn,
            onPaneScroll: zt,
            onPaneContextMenu: vt,
            onSelectionContextMenu: w,
            onSelectionStart: O,
            onSelectionEnd: L,
            onEdgeUpdate: at,
            onEdgeContextMenu: Ar,
            onEdgeDoubleClick: Zo,
            onEdgeMouseEnter: Dr,
            onEdgeMouseMove: qo,
            onEdgeMouseLeave: Ir,
            onEdgeUpdateStart: Or,
            onEdgeUpdateEnd: Xo,
            edgeUpdaterRadius: Ko,
            defaultMarkerColor: Ht,
            noDragClassName: Jo,
            noWheelClassName: Qo,
            noPanClassName: Mr,
            elevateEdgesOnSelect: ce,
            rfId: es,
            disableKeyboardA11y: Le,
            nodeOrigin: re,
            nodeExtent: qe,
          }),
          $.createElement(a6, {
            nodes: e,
            edges: t,
            defaultNodes: n,
            defaultEdges: r,
            onConnect: h,
            onConnectStart: p,
            onConnectEnd: g,
            onClickConnectStart: m,
            onClickConnectEnd: v,
            nodesDraggable: _e,
            nodesConnectable: Fe,
            nodesFocusable: Ce,
            edgesFocusable: Me,
            edgesUpdatable: Tt,
            elementsSelectable: Qt,
            elevateNodesOnSelect: he,
            minZoom: Ft,
            maxZoom: st,
            nodeExtent: qe,
            onNodesChange: Rr,
            onEdgesChange: Go,
            snapToGrid: fe,
            snapGrid: q,
            connectionMode: D,
            translateExtent: At,
            connectOnClick: J,
            defaultEdgeOptions: Ee,
            fitView: M,
            fitViewOptions: U,
            onNodesDelete: k,
            onEdgesDelete: j,
            onNodeDragStart: I,
            onNodeDrag: S,
            onNodeDragStop: P,
            onSelectionDrag: E,
            onSelectionDragStart: B,
            onSelectionDragStop: N,
            noPanClassName: Mr,
            nodeOrigin: re,
            rfId: es,
            autoPanOnConnect: be,
            autoPanOnNodeDrag: Se,
            onError: Lr,
            connectionRadius: Ve,
            isValidConnection: Vt,
            nodeDragThreshold: Fd,
          }),
          $.createElement(s6, { onSelectionChange: z }),
          yn,
          $.createElement(Rm, { proOptions: pe, position: oe }),
          $.createElement(f6, { rfId: es, disableKeyboardA11y: Le }),
        ),
      );
    },
  );
cd.displayName = "ReactFlow";
function E7() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
    $.createElement("path", {
      d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z",
    }),
  );
}
function C7() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5" },
    $.createElement("path", { d: "M0 0h32v4.2H0z" }),
  );
}
function x7() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30" },
    $.createElement("path", {
      d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
    }),
  );
}
function _7() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    $.createElement("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
    }),
  );
}
function b7() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    $.createElement("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
    }),
  );
}
const nr = ({ children: e, className: t, ...n }) =>
  $.createElement(
    "button",
    { type: "button", className: ze(["react-flow__controls-button", t]), ...n },
    e,
  );
nr.displayName = "ControlButton";
const w7 = (e) => ({
    isInteractive:
      e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
    minZoomReached: e.transform[2] <= e.minZoom,
    maxZoomReached: e.transform[2] >= e.maxZoom,
  }),
  ld = ({
    style: e,
    showZoom: t = !0,
    showFitView: n = !0,
    showInteractive: r = !0,
    fitViewOptions: o,
    onZoomIn: s,
    onZoomOut: i,
    onFitView: a,
    onInteractiveChange: l,
    className: u,
    children: c,
    position: d = "bottom-left",
  }) => {
    const f = Pe(),
      [h, p] = de(!1),
      { isInteractive: g, minZoomReached: m, maxZoomReached: v } = we(w7, $e),
      { zoomIn: x, zoomOut: b, fitView: _ } = wt();
    if (
      (ie(() => {
        p(!0);
      }, []),
      !h)
    )
      return null;
    const C = () => {
        x(), s == null || s();
      },
      A = () => {
        b(), i == null || i();
      },
      I = () => {
        _(o), a == null || a();
      },
      S = () => {
        f.setState({
          nodesDraggable: !g,
          nodesConnectable: !g,
          elementsSelectable: !g,
        }),
          l == null || l(!g);
      };
    return $.createElement(
      xu,
      {
        className: ze(["react-flow__controls", u]),
        position: d,
        style: e,
        "data-testid": "rf__controls",
      },
      t &&
        $.createElement(
          $.Fragment,
          null,
          $.createElement(
            nr,
            {
              onClick: C,
              className: "react-flow__controls-zoomin",
              title: "zoom in",
              "aria-label": "zoom in",
              disabled: v,
            },
            $.createElement(E7, null),
          ),
          $.createElement(
            nr,
            {
              onClick: A,
              className: "react-flow__controls-zoomout",
              title: "zoom out",
              "aria-label": "zoom out",
              disabled: m,
            },
            $.createElement(C7, null),
          ),
        ),
      n &&
        $.createElement(
          nr,
          {
            className: "react-flow__controls-fitview",
            onClick: I,
            title: "fit view",
            "aria-label": "fit view",
          },
          $.createElement(x7, null),
        ),
      r &&
        $.createElement(
          nr,
          {
            className: "react-flow__controls-interactive",
            onClick: S,
            title: "toggle interactivity",
            "aria-label": "toggle interactivity",
          },
          g ? $.createElement(b7, null) : $.createElement(_7, null),
        ),
      c,
    );
  };
ld.displayName = "Controls";
var S7 = Ae(ld),
  ft;
(function (e) {
  (e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross");
})(ft || (ft = {}));
function N7({ color: e, dimensions: t, lineWidth: n }) {
  return $.createElement("path", {
    stroke: e,
    strokeWidth: n,
    d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`,
  });
}
function T7({ color: e, radius: t }) {
  return $.createElement("circle", { cx: t, cy: t, r: t, fill: e });
}
const A7 = {
    [ft.Dots]: "#91919a",
    [ft.Lines]: "#eee",
    [ft.Cross]: "#e2e2e2",
  },
  D7 = {
    [ft.Dots]: 1,
    [ft.Lines]: 1,
    [ft.Cross]: 6,
  },
  I7 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function ud({
  id: e,
  variant: t = ft.Dots,
  // only used for dots and cross
  gap: n = 20,
  // only used for lines and cross
  size: r,
  lineWidth: o = 1,
  offset: s = 2,
  color: i,
  style: a,
  className: l,
}) {
  const u = se(null),
    { transform: c, patternId: d } = we(I7, $e),
    f = i || A7[t],
    h = r || D7[t],
    p = t === ft.Dots,
    g = t === ft.Cross,
    m = Array.isArray(n) ? n : [n, n],
    v = [m[0] * c[2] || 1, m[1] * c[2] || 1],
    x = h * c[2],
    b = g ? [x, x] : v,
    _ = p ? [x / s, x / s] : [b[0] / s, b[1] / s];
  return $.createElement(
    "svg",
    {
      className: ze(["react-flow__background", l]),
      style: {
        ...a,
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      },
      ref: u,
      "data-testid": "rf__background",
    },
    $.createElement(
      "pattern",
      {
        id: d + e,
        x: c[0] % v[0],
        y: c[1] % v[1],
        width: v[0],
        height: v[1],
        patternUnits: "userSpaceOnUse",
        patternTransform: `translate(-${_[0]},-${_[1]})`,
      },
      p
        ? $.createElement(T7, { color: f, radius: x / s })
        : $.createElement(N7, { dimensions: b, color: f, lineWidth: o }),
    ),
    $.createElement("rect", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      fill: `url(#${d + e})`,
    }),
  );
}
ud.displayName = "Background";
var O7 = Ae(ud);
const dd = "columns",
  fd = "exposure",
  hd = "tables",
  R7 = "feedback",
  pd = "settings",
  Fn = "column-",
  gd = "see-more-",
  M7 = 5,
  L7 = 100,
  k7 = 100,
  Xi = 272,
  Ki = 80,
  P7 = 12,
  j7 = Ki,
  md = 30,
  jc = 4,
  $7 = 280,
  F7 = 80,
  Gi = 0.05,
  yd = "#7A899E",
  Ji = "#E38E00",
  vd = {
    Original: "#FDD835",
    Alias: "#40C8AE",
    Transformation: "#FF754C",
    Unchanged: "#BC3FBC",
    "Not sure": "#247efe",
  },
  Qi = {
    stroke: yd,
    strokeWidth: 1,
  },
  Ed = {
    stroke: Ji,
    strokeWidth: 2,
  },
  Cd = {
    stroke: Ji,
    strokeWidth: 1,
    strokeDasharray: 10,
  },
  xd = {
    type: "arrow",
    strokeWidth: 1,
    width: 24,
    height: 24,
    color: yd,
  },
  _d = {
    type: "arrow",
    strokeWidth: 1,
    width: 16,
    height: 16,
    color: Ji,
  },
  tt = (e) => e.id.startsWith(Fn),
  Jr = (e) => e.id.startsWith(gd),
  vr = (e) => !e.id.startsWith(Fn),
  bd = (e, t, n, r, o) => {
    const [s, i] = o ? [n, r] : [r, n],
      [a, l] = o ? ai(e, t) : ai(t, e);
    return {
      id: `${s}-${i}`,
      source: s,
      target: i,
      sourceHandle: a,
      targetHandle: l,
      style: Qi,
      markerEnd: xd,
      type: n === r ? "selfConnecting" : e === t ? "smoothstep" : "default",
    };
  },
  ea = (e, t, n) => ({
    id: e.table,
    data: { ...e, level: t, parent: n },
    position: { x: 100, y: 100 },
    type: "table",
    width: Xi,
    height: Ki,
  }),
  si = (e, t, n) => ({
    id: Io(e, t),
    data: { column: t, table: e, lensType: n },
    parentNode: e,
    extent: "parent",
    draggable: !1,
    type: "column",
    position: { x: 100, y: 100 },
    height: md,
  }),
  ii = (e, t, n, r, o, s) => {
    const i = ta(e, t),
      [a, l] = ai(n, r);
    return {
      id: i,
      data: { type: o },
      source: e,
      target: t,
      sourceHandle: a,
      targetHandle: l,
      style: o === "direct" ? Ed : Cd,
      zIndex: 1e3,
      markerEnd: _d,
      type: n === r ? "smoothstep" : "default",
      hidden: !s[o],
    };
  },
  ta = (e, t) => Fn + `${e}-${t}`,
  Do = (e, t) => {
    e.style = { opacity: t ? 1 : 0.5 };
  },
  Hn = (e, t) => {
    var n;
    (e.style = t
      ? ((n = e.data) == null ? void 0 : n.type) === "indirect"
        ? Cd
        : Ed
      : Qi),
      (e.markerEnd = t ? _d : xd);
  },
  ai = (e, t) =>
    e < t
      ? ["right", "left"]
      : e > t
        ? ["left", "right"]
        : e < 0
          ? ["left", "left"]
          : ["right", "right"],
  H7 = (e, t) => {
    const n = {};
    e.forEach((s) => {
      vr(s) && (n[s.id] = s.data.level);
    });
    const r = {};
    e.filter((s) => s.type === "table").forEach((s) => (r[s.id] = !0));
    const o = {};
    for (const s of t) {
      if (tt(s)) continue;
      const i = r[s.source],
        a = r[s.target];
      if (!(i && a)) {
        if (i) {
          e.find((u) => u.id === s.target).data.tables.forEach((u) => {
            o[u.table] = s.target;
          });
          continue;
        }
        a &&
          e
            .find((u) => u.id === s.source)
            .data.tables.forEach((u) => {
              o[u.table] = s.source;
            });
      }
    }
    return { levelMap: n, tableNodes: r, seeMoreIdTableReverseMap: o };
  },
  Io = (e, t) => Fn + `${e}/${t}`,
  Oo = (e, t) => gd + e + "-" + (t ? "1" : "0"),
  $c = (e, t) => {
    for (const n of e) if (n[0] === t[0] && n[1] === t[1]) return !0;
    return !1;
  },
  Fc = (e, t, n) => {
    (e[t] = e[t] || []), e[t].push(...n);
  },
  ci = (e, t = 1) => e * (md + jc) + t * jc,
  Hc = (e, t) => (n) => e <= n && n <= t,
  B7 = (e, t) => (n) => e < n && n < t,
  Bc = (e, t) => {
    const n = e.findIndex((r) => r.id === t);
    n !== -1 && e.splice(n, 1);
  },
  zc = (e, t, n) => (e === -1 || n >= t ? t : n >= e ? n : e),
  Er = (e, t, n = !0) => {
    e.forEach((r) => {
      tt(r) || ((r.hidden = !t), n && Hn(r, t));
    });
  },
  Cr = (e, t, n = !0) => {
    e.forEach((r) => {
      tt(r) && ((r.hidden = !t), n && Hn(r, t));
    });
  },
  z7 = (e) => Oe.get("upstreamTables", { table: e }),
  V7 = (e) => Oe.get("downstreamTables", { table: e }),
  W7 = (e) =>
    Oe.get("getExposureDetails", {
      name: e,
    }),
  wd = (e, t) =>
    Oe.get("getColumns", {
      table: e,
      refresh: t,
    }),
  U7 = (e) => Oe.get("getConnectedColumns", e),
  Y7 = (e) => Oe.get("sendFeedback", e),
  Z7 = () => Oe.get("getLineageSettings", {}),
  As = (e) => Oe.get("persistLineageSettings", e),
  Sd = () => Oe.get("init", {}),
  q7 = (e) => Oe.get("openFile", { url: e }),
  X7 = () => Oe.get("openChat", {}),
  Nd = (e) => Oe.get("showInfoNotification", { message: e }),
  K7 = () => Oe.get("previewFeature", {}),
  Ds = (e) => Oe.get("columnLineage", { event: e }),
  G7 = (e) => Oe.get("telemetryEvents", e);
var J7 = /* @__PURE__ */ ((e) => (
  (e.START = "start"), (e.END = "end"), (e.CANCEL = "cancel"), e
))(J7 || {});
const He = class He {
  static onCancel() {
    (He.isCancelled = !0), (He.inProgress = !1);
  }
  static cancel() {
    He.onCancel(),
      Ds(
        "cancel",
        /* CANCEL */
      );
    const t = new CustomEvent("cll_cancelled", { detail: void 0 });
    document.dispatchEvent(t);
  }
  static start() {
    (He.inProgress = !0),
      (He.isCancelled = !1),
      (He.linkCount = 0),
      Ds(
        "start",
        /* START */
      );
  }
  static end() {
    (He.inProgress = !1),
      Ds(
        "end",
        /* END */
      ),
      G7({
        id: "columnLineageNumLinks",
        params: { num: He.linkCount },
      }),
      (He.linkCount = 0);
  }
  static addLinks(t) {
    He.linkCount += t;
  }
  static showCllInProgressMsg() {
    Nd(
      "Column lineage is in progress. Either wait for it to complete or cancel the current one.",
    );
  }
};
kr(He, "isCancelled", !1), kr(He, "inProgress", !1), kr(He, "linkCount", 0);
let ke = He;
const Td = (e, t) => (e ? z7(t) : V7(t)),
  Ad = (e, t) => (e ? t + 1 : t - 1),
  Dd = (e, t, n, r, o, s, i = M7) => {
    const a = Ad(o, s),
      l = (c) => {
        var p, g;
        const d =
            (g = (p = e.find((m) => m.id === c)) == null ? void 0 : p.data) ==
            null
              ? void 0
              : g.level,
          f = bd(s, d, r, c, o);
        t.find((m) => m.id === f.id) || t.push(f);
      };
    let u = 0;
    for (const c of n) {
      if (u >= i) {
        const f = Oo(r, o);
        e.push({
          id: f,
          data: { tables: n, prevTable: r, right: o, level: a },
          position: { x: 100, y: 100 },
          type: "seeMore",
          width: Xi,
          height: 100,
        }),
          l(f);
        break;
      }
      e.find((f) => f.id === c.table) || (e.push(ea(c, a, r)), u++), l(c.table);
    }
  },
  mn = (e, t) => {
    let n = 1 / 0;
    const r = {};
    for (const p of e)
      if (tt(p) && p.parentNode)
        p.parentNode in r || (r[p.parentNode] = 0),
          (p.position = {
            x: P7,
            y: j7 + ci(r[p.parentNode]),
          }),
          r[p.parentNode]++;
      else {
        const { level: g } = p.data;
        n = Math.min(n, g);
      }
    const o = {},
      s = {},
      i = {},
      a = {},
      l = {},
      u = {};
    for (const p of t)
      tt(p) ||
        Jr(e.find((g) => g.id === p.source)) ||
        Jr(e.find((g) => g.id === p.target)) ||
        ((l[p.source] = l[p.source] || []),
        l[p.source].push(p.target),
        (u[p.target] = u[p.target] || []),
        u[p.target].push(p.source));
    const c = (p) => {
        const { level: g } = p.data;
        if (((s[g] = s[g] || []), !s[g].includes(p.id))) {
          (i[p.id] = s[g].length), (o[p.id] = 0);
          for (const m of s[g]) o[p.id] += r[m] || 0;
          s[g].push(p.id);
        }
      },
      d = (p, g) => {
        if (!a[p]) {
          (a[p] = !0), c(e.find((m) => m.id === p));
          for (const m of g[p] || []) d(m, g);
        }
      };
    for (const p of e)
      tt(p) || Jr(p) || a[p.id] || (d(p.id, l), (a[p.id] = !1), d(p.id, u));
    for (const p of e) tt(p) || (Jr(p) && c(p));
    const f = (p) => {
        const g = i[p.id] || 0,
          m = o[p.id] || 0;
        return k7 + g * (Ki + F7) + ci(m, g);
      },
      h = (p) => (p - n) * (Xi + $7) + L7;
    for (const p of e) {
      if (tt(p)) continue;
      const { level: g } = p.data;
      p.position = { x: h(g), y: f(p) };
    }
  },
  Q7 = (e, t) => (
    e.forEach((n) => Do(n, !0)), t.forEach((n) => Hn(n, !1)), [e, t]
  ),
  xr = (e, t, n) => {
    Er(t, !0), Cr(t, !1);
    const r = {},
      o = {},
      s = (l, u) => {
        const c = [n],
          d = {};
        for (; c.length > 0; ) {
          const f = c.shift();
          (d[f] = !0),
            (r[f] = !0),
            t.forEach((h) => {
              h[l] === f && ((o[h.id] = !0), d[h[u]] || c.push(h[u]));
            });
        }
      };
    s("source", "target"), s("target", "source");
    const i = [...t];
    i.forEach((l) => Hn(l, o[l.id]));
    const a = [...e];
    return a.forEach((l) => Do(l, !!r[l.id])), [a, i];
  },
  e8 = async (e, t, n, r, o, s, i, a, l, u) => {
    const c = [],
      d = [],
      { column_lineage: f, confidence: h } = await U7({
        targets: r,
        upstreamExpansion: o,
        currAnd1HopTables: s,
        selectedColumn: i,
      });
    ke.addLinks(f.length);
    const p = f.filter((C) => (o ? $c(r, C.source) : $c(r, C.target))),
      g = p.map((C) => (o ? C.target : C.source)),
      m = {},
      v = ([C, A], I) => {
        (m[C] = m[C] || []),
          m[C].find((S) => S.column === A) ||
            m[C].push({ column: A, lensType: I });
      },
      x = (C, A, I, S, P) => {
        const k = ta(I, S);
        d.find((j) => j.id === k) || d.push(ii(I, S, e[C], e[A], P, u));
      },
      b = [],
      _ = {};
    for (const C of p) {
      const A = C.source.join("/"),
        I = C.target.join("/"),
        S = (P) =>
          l ? C.type : C.type === "indirect" ? "indirect" : P || C.type;
      o
        ? ((_[I] = _[I] || []), _[I].push(S(a[A])))
        : ((_[A] = _[A] || []), _[A].push(S(a[I])));
    }
    for (const C in _)
      a[C] = _[C].some((A) => A === "direct") ? "direct" : "indirect";
    for (const C of p) {
      v(C.source), v(C.target, C.lensType);
      const [A] = C.source,
        [I] = C.target,
        S = n[A],
        P = n[I],
        k = C.source.join("/"),
        j = C.target.join("/"),
        z = Fn + k,
        B = Fn + j,
        E = a[o ? j : k];
      if (S && P) x(A, I, z, B, E);
      else if (S) {
        const N = t[I];
        x(A, N, z, N, E), b.push(C);
      } else if (P) {
        const N = t[A];
        x(N, I, N, B, E), b.push(C);
      } else b.push(C);
    }
    for (const C in m)
      if (n[C]) {
        m[C].sort();
        for (const A of m[C]) c.push(si(C, A.column, A.lensType));
      }
    return {
      nodes: c,
      edges: d,
      collectColumns: m,
      newCurr: g,
      confidence: h,
      seeMoreLineage: b,
    };
  },
  t8 = (e, t) => {
    const n = [...e.nodes],
      r = [...e.edges],
      o = {},
      s = {};
    return (
      n.forEach((i) => (o[i.id] = !0)),
      r.forEach((i) => (s[i.id] = !0)),
      t.nodes.forEach((i) => {
        o[i.id] || n.push(i);
        const a = n.find((l) => l.id === i.id);
        a &&
          (a.data = {
            ...a.data,
            ...i.data,
            lensType: a.data.lensType || i.data.lensType,
          });
      }),
      t.edges.forEach((i) => !s[i.id] && r.push(i)),
      mn(n, r),
      [n, r]
    );
  },
  n8 = (e, t) => {
    const n = e.filter((o) => vr(o)),
      r = t.filter((o) => vr(o));
    return [n, r];
  },
  na = async (e, t, n, r) => {
    const o = [...e],
      s = [...t],
      i = [{ table: n, level: o.find((l) => l.id === n).data.level }],
      a = {};
    for (; i.length > 0; ) {
      const { table: l, level: u } = i.shift();
      if (a[l]) continue;
      a[l] = !0;
      const { tables: c } = await Td(r, l);
      Dd(o, s, c, l, r, u),
        c.forEach((d) => {
          const f = o.find((h) => h.id === d.table);
          (f == null ? void 0 : f.data.materialization) === "ephemeral" &&
            i.push({ table: d.table, level: f.data.level });
        });
    }
    return [o, s];
  },
  li = async (e, t, n, r, o) => {
    const s = [...e],
      i = [...t];
    if (r >= o) return [s, i];
    const a = B7(r, o),
      l = s.find((c) => c.id === n).data.level,
      u = async (c) => {
        const d = [{ table: n, level: l }],
          f = {};
        for (; d.length > 0; ) {
          const h = d.shift();
          if (f[h.table]) continue;
          f[h.table] = !0;
          const { tables: p } = await Td(c, h.table);
          Dd(s, i, p, h.table, c, h.level, 1 / 0);
          const g = Ad(c, h.level);
          a(g)
            ? d.push(...p.map((m) => ({ table: m.table, level: g })))
            : d.push(
                ...p
                  .filter((m) => m.materialization === "ephemeral")
                  .map((m) => ({ table: m.table, level: g })),
              );
        }
      };
    return o > l && (await u(!0)), r < l && (await u(!1)), [s, i];
  },
  Vc = (e, t, n, r) => {
    if (!n) return -1;
    const o = r ? "source" : "target",
      s = r ? "target" : "source",
      i = r ? "upstreamCount" : "downstreamCount",
      a = {},
      l = {};
    for (const h of e) tt(h) || ((a[h.id] = h), (l[h.id] = []));
    for (const h of t) tt(h) || l[h[o]].push(h[s]);
    const c = (() => {
      const h = [n],
        p = {};
      for (; h.length > 0; ) {
        const g = h.shift();
        if (p[g]) continue;
        p[g] = !0;
        const m = a[g].data;
        if (m[i] !== 0) {
          if (l[g].length < m[i]) return g;
          for (const v of l[g]) h.push(v);
        }
      }
    })();
    if (!c) return -1;
    const { level: d } = a[n].data,
      { level: f } = a[c].data;
    return r ? f - d : d - f;
  },
  _r = (e, t, n) => [Vc(e, t, n, !1), Vc(e, t, n, !0)],
  Id = async (e, t, n, r, o, s, i, a, l, u) => {
    var C, A, I, S, P, k;
    let c = !1;
    const {
        levelMap: d,
        tableNodes: f,
        seeMoreIdTableReverseMap: h,
      } = H7(e, t),
      p = (j) => e.find((z) => z.id === j),
      g = {},
      m = {};
    let v = r.map((j) => [j.table, j.name]),
      x = [];
    const b = {};
    let _ = !0;
    for (
      ;
      !(
        ke.isCancelled ||
        ((v = v.filter((H) => !g[H.join("/")])),
        v.length === 0 && x.length === 0)
      );

    ) {
      const j = {};
      v.forEach((H) => {
        (g[H.join("/")] = !0), (j[H[0]] = !0);
      });
      const [z, B] = n ? ["source", "target"] : ["target", "source"],
        E = [],
        N = [],
        w = [];
      let O = !1;
      for (const H of t) {
        if (tt(H)) continue;
        const V = H[z],
          W = H[B],
          Y = f[W]
            ? [(C = p(W)) == null ? void 0 : C.data]
            : (S =
                  (I = (A = p(W)) == null ? void 0 : A.data) == null
                    ? void 0
                    : I.tables) == null
              ? void 0
              : S.filter((Z) => !f[Z.table]);
        Y == null ||
          Y.forEach(({ table: Z, materialization: X }) => {
            j[V]
              ? ((O = !0),
                X === "ephemeral"
                  ? (Fc(
                      m,
                      Z,
                      v.filter((Q) => Q[0] === V),
                    ),
                    N.push(Z))
                  : E.push(Z))
              : x.includes(V) &&
                ((O = !0),
                X === "ephemeral"
                  ? (Fc(m, Z, m[V]), N.push(Z))
                  : (w.push(V), E.push(Z)));
          });
      }
      if (!O) break;
      x = N;
      const L = Object.keys(j).concat(E);
      w.forEach((H) => {
        v.push(...m[H]), L.push(...m[H].map((V) => V[0]));
      });
      const D = await e8(d, h, f, v, n, Array.from(new Set(L)), l, b, _, u);
      (_ = !1),
        ((P = D.confidence) == null ? void 0 : P.confidence) === "low" &&
          o(((k = D.confidence) == null ? void 0 : k.operator_list) || []),
        (v = D.newCurr),
        !c && v.length > 0 && (c = !0);
      const [T, R] = t8({ nodes: a.getNodes(), edges: a.getEdges() }, D);
      s(D.seeMoreLineage),
        mn(T, R),
        a.setNodes(T),
        a.setEdges(R),
        i(D.collectColumns);
    }
    return c;
  },
  r8 = (
    e,
    t,
    n,
    { prevTable: r, tables: o, right: s, level: i, lineage: a },
    l,
  ) => {
    var f;
    const { table: u } = n;
    if (e.find((h) => h.id === u)) return !1;
    e.push(ea(n, i, r));
    const d = (f = e.find((h) => h.id === r)) == null ? void 0 : f.data.level;
    if (
      (t.push(bd(d, i, r, u, s)),
      a == null ||
        a.forEach((h) => {
          const p = Io(h.source[0], h.source[1]),
            g = Io(h.target[0], h.target[1]);
          if (s) {
            if (h.target[0] !== u) return;
            e.push(si(h.target[0], h.target[1], h.lensType)),
              t.push(ii(p, g, i - 1, i, h.type, l));
          } else {
            if (h.source[0] !== u) return;
            e.push(si(h.source[0], h.source[1], h.lensType)),
              t.push(ii(p, g, i, i + 1, h.type, l));
          }
        }),
      o.every((h) => !!e.find((p) => p.id === h.table)))
    ) {
      const h = Oo(r, s),
        p = s ? `${r}-${h}` : `${h}-${r}`;
      return Bc(e, h), Bc(t, p), !0;
    }
    return !1;
  },
  Bn = async (e, t, n, r, o) => {
    var u;
    if (!n) return 0;
    const s = (u = e.find((c) => c.id === n)) == null ? void 0 : u.data;
    if (!s) return 0;
    const { level: i } = s,
      a = e.length,
      [l] = await li(e, t, n, i - r, i + o);
    return l.length - a;
  },
  o8 = (e, t, n, r) => {
    if (!Ym(e)) return { nodes: [], edgeIds: [] };
    const o = n.filter((s) => (r ? s.target : s.source) === e.id);
    return {
      nodes: t.filter((s) =>
        o.find((i) => i.source === s.id || i.target === s.id),
      ),
      edgeIds: o.map((s) => ta(s.source, s.target)),
    };
  },
  ui = (e, t, n, r = [], o) => {
    const { nodes: s, edgeIds: i } = o8(e, t, n, o);
    return s.reduce(
      (a, l) => {
        if (
          (a.nodes.push(l),
          (a.edges = Array.from(/* @__PURE__ */ new Set([...a.edges, ...i]))),
          r.findIndex((u) => u.id == l.id) === -1)
        ) {
          r.push(l);
          const { nodes: u, edges: c } = ui(l, t, n, r, o);
          u.forEach((d) => {
            a.nodes.push(d),
              r.findIndex((f) => f.id == d.id) === -1 && r.push(d);
          }),
            (a.edges = Array.from(/* @__PURE__ */ new Set([...a.edges, ...c])));
        }
        return a;
      },
      { nodes: [], edges: [] },
    );
  },
  s8 = (e, t) => {
    const n = t.getNodes().filter((i) => tt(i)),
      r = t.getEdges();
    n.forEach((i) => {
      const a = t.getNode(i.id);
      a && Do(a, !1);
    }),
      r.forEach((i) => {
        const a = t.getEdge(i.id);
        a && ((a.hidden = !0), Hn(a, !1));
      });
    const o = ui(e, n, r, [], !0),
      s = ui(e, n, r, [], !1);
    [o, s].forEach(({ nodes: i, edges: a }) => {
      i.forEach((l) => {
        const u = t.getNode(l.id);
        u && Do(u, !0);
      }),
        a.forEach((l) => {
          const u = t.getEdge(l);
          u && ((u.hidden = !1), Hn(u, !0));
        });
    });
  },
  i8 = "_table_node_1mtoa_1",
  a8 = "_header_1mtoa_8",
  c8 = "_collapse_1mtoa_16",
  l8 = "_selected_1mtoa_21",
  u8 = "_content_1mtoa_24",
  d8 = "_table_header_1mtoa_37",
  f8 = "_seed_1mtoa_47",
  h8 = "_model_1mtoa_52",
  p8 = "_source_1mtoa_57",
  g8 = "_exposure_1mtoa_62",
  m8 = "_snapshot_1mtoa_67",
  y8 = "_metrics_1mtoa_72",
  v8 = "_macros_1mtoa_77",
  E8 = "_analysis_1mtoa_82",
  C8 = "_node_icon_1mtoa_87",
  x8 = "_table_handle_1mtoa_100",
  _8 = "_see_more_node_1mtoa_114",
  b8 = "_table_card_1mtoa_125",
  w8 = "_disabled_1mtoa_137",
  S8 = "_column_card_1mtoa_142",
  N8 = "_edit_icon_1mtoa_155",
  T8 = "_active_1mtoa_163",
  A8 = "_expand_lineage_icon_1mtoa_167",
  D8 = "_processing_div_1mtoa_180",
  I8 = "_gif_img_1mtoa_183",
  O8 = "_card_1mtoa_188",
  R8 = "_column_node_1mtoa_195",
  M8 = "_column_name_1mtoa_206",
  L8 = "_column_badge_1mtoa_211",
  k8 = "_divider_1mtoa_223",
  P8 = "_table_details_header_1mtoa_229",
  j8 = "_verticle_divider_1mtoa_237",
  $8 = "_low_confidence_1mtoa_242",
  F8 = "_high_confidence_1mtoa_249",
  H8 = "_alert_icon_1mtoa_256",
  B8 = "_menu_card_1mtoa_262",
  z8 = "_menu_card_container_1mtoa_267",
  V8 = "_table_details_tabs_1mtoa_274",
  W8 = "_tab_1mtoa_1",
  U8 = "_table_node_pill_1mtoa_294",
  Y8 = "_icon_1mtoa_304",
  Z8 = "_node-checkbox_1mtoa_311",
  q8 = "_non_select_node_checkbox_1mtoa_311",
  X8 = "_select_node_checkbox_1mtoa_311",
  K8 = "_node_extra_info_1mtoa_327",
  G8 = "_help_body_1mtoa_331",
  J8 = "_feedback_body_1mtoa_335",
  Q8 = "_cancel_btn_1mtoa_338",
  e4 = "_expand_nav_1mtoa_343",
  t4 = "_expand_nav_btn_1mtoa_351",
  n4 = "_lineage_legend_1mtoa_378",
  r4 = "_column_legend_1mtoa_395",
  o4 = "_dot_1mtoa_408",
  ee = {
    table_node: i8,
    header: a8,
    collapse: c8,
    selected: l8,
    content: u8,
    table_header: d8,
    seed: f8,
    model: h8,
    source: p8,
    exposure: g8,
    snapshot: m8,
    metrics: y8,
    macros: v8,
    analysis: E8,
    node_icon: C8,
    table_handle: x8,
    see_more_node: _8,
    table_card: b8,
    disabled: w8,
    column_card: S8,
    edit_icon: N8,
    active: T8,
    expand_lineage_icon: A8,
    processing_div: D8,
    gif_img: I8,
    card: O8,
    column_node: R8,
    default: "_default_1mtoa_203",
    column_name: M8,
    column_badge: L8,
    divider: k8,
    table_details_header: P8,
    verticle_divider: j8,
    low_confidence: $8,
    high_confidence: F8,
    alert_icon: H8,
    menu_card: B8,
    menu_card_container: z8,
    table_details_tabs: V8,
    tab: W8,
    table_node_pill: U8,
    icon: Y8,
    "node-checkbox": "_node-checkbox_1mtoa_311",
    nodeCheckbox: Z8,
    non_select_node_checkbox: q8,
    select_node_checkbox: X8,
    node_extra_info: K8,
    help_body: G8,
    feedback_body: J8,
    cancel_btn: Q8,
    expand_nav: e4,
    expand_nav_btn: t4,
    lineage_legend: n4,
    column_legend: r4,
    dot: o4,
  },
  s4 = (e) =>
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
  Od = s4,
  i4 = (e) =>
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
  Rd = i4,
  a4 = (e) =>
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
  c4 = a4,
  l4 = (e) =>
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
  u4 = l4,
  d4 = (e) =>
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
  f4 = d4,
  h4 = (e) =>
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
  p4 = h4,
  g4 = (e) =>
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
  m4 = g4,
  y4 = (e) =>
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
  v4 = y4,
  E4 = (e) =>
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
  C4 = E4,
  x4 = (e) =>
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
  _4 = x4,
  b4 = (e) =>
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
  w4 = b4,
  S4 = (e) =>
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
  N4 = S4,
  T4 = (e) =>
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
  A4 = T4,
  D4 = (e) =>
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
  I4 = D4,
  O4 = (e) =>
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
  R4 = O4,
  M4 = (e) =>
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
  L4 = M4,
  k4 = (e) =>
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
  P4 = k4,
  j4 = (e) =>
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
  $4 = j4,
  F4 = (e) =>
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
  H4 = F4,
  B4 = (e) =>
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
  z4 = B4,
  V4 = (e) =>
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
  W4 = V4,
  U4 = (e) =>
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
  Y4 = U4,
  Z4 = (e) =>
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
  q4 = Z4,
  X4 = (e) =>
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
  K4 = X4,
  G4 = (e) =>
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
  J4 = G4,
  Q4 = (e) =>
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
  e5 = Q4,
  t5 = (e) =>
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
  n5 = t5,
  r5 = (e) =>
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
  o5 = r5,
  s5 = (e) =>
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
  i5 = s5,
  a5 = (e) =>
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
  c5 = a5,
  l5 = (e) =>
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
  u5 = l5,
  d5 = () => {
    const [e, t] = de(!1),
      n = () => t(!e);
    return /* @__PURE__ */ y.jsxs(y.Fragment, {
      children: [
        /* @__PURE__ */ y.jsxs(Ue, {
          id: "lineageLegend",
          className: ee.lineage_legend,
          type: "button",
          onClick: n,
          children: [
            "Legend",
            e ? /* @__PURE__ */ y.jsx(H4, {}) : /* @__PURE__ */ y.jsx($4, {}),
          ],
        }),
        /* @__PURE__ */ y.jsx(Xc, {
          flip: !0,
          target: "lineageLegend",
          isOpen: e,
          className: ee.column_legend,
          placement: "top",
          children: /* @__PURE__ */ y.jsx(Kc, {
            children: Object.entries(vd).map(([r, o]) =>
              /* @__PURE__ */ y.jsxs(
                "div",
                {
                  children: [
                    /* @__PURE__ */ y.jsx("div", {
                      className: ee.dot,
                      style: { backgroundColor: o },
                      children: r[0],
                    }),
                    " ",
                    r,
                  ],
                },
                r,
              ),
            ),
          }),
        }),
      ],
    });
  },
  f5 = d5;
var Md = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var s = "", i = 0; i < arguments.length; i++) {
        var a = arguments[i];
        a && (s = o(s, r(a)));
      }
      return s;
    }
    function r(s) {
      if (typeof s == "string" || typeof s == "number") return s;
      if (typeof s != "object") return "";
      if (Array.isArray(s)) return n.apply(null, s);
      if (
        s.toString !== Object.prototype.toString &&
        !s.toString.toString().includes("[native code]")
      )
        return s.toString();
      var i = "";
      for (var a in s) t.call(s, a) && s[a] && (i = o(i, a));
      return i;
    }
    function o(s, i) {
      return i ? (s ? s + " " + i : s + i) : s;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(Md);
var h5 = Md.exports;
const Ne = /* @__PURE__ */ zn(h5),
  p5 = ({ datatype: e, color: t, size: n = "1rem" }) => {
    const [r, o] = Ie(() => {
      switch (e.toLowerCase()) {
        case "integer":
        case "float":
        case "double precision":
        case "double":
        case "bigint":
          return [p4, "#FF754C"];
        case "bool":
        case "boolean":
          return [u4, "#00A5DB"];
        case "text":
        case "character":
        case "character varying":
        case "varchar":
          return [f4, "#3F8CFF"];
        case "geospatial":
          return [C4, "#01CD8C"];
        case "date":
        case "timestamp":
        case "timestamp with time zone":
          return [v4, "#247EFE"];
        default:
          return [m4, "#6A24FE"];
      }
    }, [e]);
    return /* @__PURE__ */ y.jsx("div", {
      style: { color: t || o },
      className: "d-flex align-items-center",
      children: /* @__PURE__ */ y.jsx(r, { width: n, height: n }),
    });
  },
  Uo = ({ nodeType: e }) =>
    /* @__PURE__ */ y.jsxs("div", {
      children: [
        e === "seed" && /* @__PURE__ */ y.jsx(w4, {}),
        e === "model" && /* @__PURE__ */ y.jsx(_4, {}),
        e === "source" && /* @__PURE__ */ y.jsx(N4, {}),
        e === "exposure" && /* @__PURE__ */ y.jsx(A4, {}),
        e === "analysis" && /* @__PURE__ */ y.jsx(I4, {}),
        e === "snapshot" && /* @__PURE__ */ y.jsx(R4, {}),
        e === "semantic_model" && /* @__PURE__ */ y.jsx(L4, {}),
        e === "macros" && /* @__PURE__ */ y.jsx(P4, {}),
      ],
    }),
  or = ({ id: e, icon: t, text: n, label: r }) =>
    /* @__PURE__ */ y.jsxs(y.Fragment, {
      children: [
        /* @__PURE__ */ y.jsxs("div", {
          className: ee.table_node_pill,
          id: e,
          children: [
            /* @__PURE__ */ y.jsx("div", { className: ee.icon, children: t }),
            /* @__PURE__ */ y.jsx("div", { children: n }),
          ],
        }),
        /* @__PURE__ */ y.jsx(Qd, { target: e, children: r }),
      ],
    }),
  Ld = {
    seed: ee.seed,
    model: ee.model,
    source: ee.source,
    exposure: ee.exposure,
    snapshot: ee.snapshot,
    semantic_model: ee.metrics,
    macros: ee.macros,
    analysis: ee.analysis,
  },
  kd = {
    seed: "SED",
    model: "MDL",
    source: "SRC",
    exposure: "EXP",
    snapshot: "SNP",
    semantic_model: "MET",
    macros: "SEM",
    analysis: "ANY",
  },
  Qr = "-1px",
  ra = () =>
    /* @__PURE__ */ y.jsxs(y.Fragment, {
      children: [
        /* @__PURE__ */ y.jsx(Xt, {
          id: "left",
          type: "source",
          className: "invisible",
          isConnectable: !1,
          position: ne.Left,
          style: { left: Qr },
        }),
        /* @__PURE__ */ y.jsx(Xt, {
          id: "right",
          type: "source",
          className: "invisible",
          isConnectable: !1,
          position: ne.Right,
          style: { right: Qr },
        }),
        /* @__PURE__ */ y.jsx(Xt, {
          id: "left",
          type: "target",
          className: "invisible",
          isConnectable: !1,
          position: ne.Left,
          style: { left: Qr },
        }),
        /* @__PURE__ */ y.jsx(Xt, {
          id: "right",
          type: "target",
          className: "invisible",
          isConnectable: !1,
          position: ne.Right,
          style: { right: Qr },
        }),
      ],
    }),
  g5 = ({ data: e }) => {
    const {
        label: t,
        table: n,
        url: r,
        upstreamCount: o,
        downstreamCount: s,
        nodeType: i,
        tests: a,
        materialization: l,
        isExternalProject: u,
      } = e,
      c = wt(),
      {
        state: {
          selectedTable: d,
          collectColumns: f,
          selectedColumn: h,
          leftExpansion: p,
          rightExpansion: g,
          selectCheck: m,
          nonSelectCheck: v,
        },
        rerender: x,
      } = St(),
      b = Nt(),
      _ = Object.keys(f[n] || {}).length,
      C = _ > 0,
      A = d === n,
      I = () => {
        if (h.name && h.table === n) return;
        const N = c.getNodes(),
          w = c.getEdges(),
          [O, L] = xr(N, w, n);
        c.setNodes(O), c.setEdges(L);
      },
      S = async (N) => {
        if (ke.inProgress) {
          ke.showCllInProgressMsg();
          return;
        }
        let [w, O] = await na(c.getNodes(), c.getEdges(), n, N);
        if (
          (([w, O] = xr(w, O, d)),
          mn(w, O),
          c.setNodes(w),
          c.setEdges(O),
          b(ur(_r(w, O, d))),
          b(kn(await Bn(w, O, d, p, g))),
          x(),
          h.name)
        ) {
          try {
            ke.start();
            const L = c.getEdges();
            Er(L, !1),
              Cr(L, !0),
              c.setEdges(L),
              await Id(
                w,
                O,
                N,
                f[n].map((D) => ({ table: n, name: D.column })),
                (D) => {
                  b(Bl({ operatorList: D }));
                },
                (D) => {
                  b(Fl(D));
                },
                (D) => {
                  b(Hl(D));
                },
                c,
                h,
                { direct: m, indirect: v },
              ),
              x();
          } catch (L) {
            console.log("cll:error:", L);
          } finally {
            ke.end();
          }
          return;
        }
      },
      P = () => S(!0),
      k = () => S(!1),
      j = (N) => {
        if ((N.stopPropagation(), !!A && i !== "semantic_model")) {
          if (i === "exposure") {
            b(_t(fd));
            return;
          }
          b(_t(dd));
        }
      },
      z = c.getEdges(),
      B = i,
      E = n.replace(/[^a-zA-Z0-9]/g, "-");
    return /* @__PURE__ */ y.jsxs("div", {
      className: "position-relative",
      style: {
        opacity: h.name ? (C ? 1 : 0.5) : 1,
      },
      children: [
        /* @__PURE__ */ y.jsxs("div", {
          className: ee.table_node,
          onClick: async () => {
            const N = c.getNodes(),
              w = c.getEdges();
            b(ur(_r(N, w, n))),
              b(kn(await Bn(N, w, n, p, g))),
              I(),
              b(vo(n)),
              r && q7(r);
          },
          children: [
            /* @__PURE__ */ y.jsx("div", {
              className: Ne(
                ee.header,
                "d-flex flex-column align-items-start gap-xs",
                {
                  [ee.selected]: A,
                  [ee.collapse]: !C,
                },
              ),
              children: /* @__PURE__ */ y.jsxs("div", {
                className: "d-flex flex-column align-items-start gap-xs w-100",
                children: [
                  /* @__PURE__ */ y.jsxs("div", {
                    className: ee.table_header,
                    children: [
                      /* @__PURE__ */ y.jsxs("div", {
                        className: Ne(ee.node_icon, Ld[B]),
                        children: [
                          /* @__PURE__ */ y.jsx(Uo, { nodeType: B }),
                          /* @__PURE__ */ y.jsx("div", { children: kd[B] }),
                        ],
                      }),
                      /* @__PURE__ */ y.jsx("div", {
                        className: "lines-2",
                        children: t,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ y.jsxs("div", {
                    className: Ne(
                      "w-100 d-flex align-items-center gap-xs",
                      ee.node_extra_info,
                    ),
                    children: [
                      /* @__PURE__ */ y.jsx("div", {
                        className: Ne("nodrag", ee.table_handle, {
                          invisible:
                            s === 0 ||
                            s === z.filter((N) => N.target === n).length ||
                            c.getNode(Oo(n, !1)),
                        }),
                        onClick: (N) => {
                          N.stopPropagation(), k();
                        },
                        "data-testid": "expand-left-btn-" + n,
                        children: "+",
                      }),
                      (a == null ? void 0 : a.length) > 0 &&
                        /* @__PURE__ */ y.jsx(or, {
                          id: "table-node-tests-" + E,
                          icon: /* @__PURE__ */ y.jsx(Od, {}),
                          text: a.length.toString(),
                          label: "Tests",
                        }),
                      l &&
                        /* @__PURE__ */ y.jsx(or, {
                          id: "table-node-materilization-" + E,
                          icon: /* @__PURE__ */ y.jsx(Rd, {}),
                          text: l,
                          label: "Materialization",
                        }),
                      u
                        ? /* @__PURE__ */ y.jsx(or, {
                            id: "table-node-is-external-" + E,
                            icon: /* @__PURE__ */ y.jsx(c4, {}),
                            text: "ext",
                            label: `External Project: ${n}`,
                          })
                        : null,
                      /* @__PURE__ */ y.jsx("div", { className: "spacer" }),
                      /* @__PURE__ */ y.jsx("div", {
                        className: Ne(
                          "nodrag",
                          A && i !== "semantic_model"
                            ? "text-blue"
                            : "text-grey",
                        ),
                        onClick: j,
                        "data-testid": "view-details-btn-" + n,
                        children: "Details",
                      }),
                      /* @__PURE__ */ y.jsx("div", {
                        className: Ne("nodrag", ee.table_handle, {
                          invisible:
                            o === 0 ||
                            o === z.filter((N) => N.source === n).length ||
                            c.getNode(Oo(n, !0)),
                        }),
                        onClick: (N) => {
                          N.stopPropagation(), P();
                        },
                        "data-testid": "expand-right-btn-" + n,
                        children: "+",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            C &&
              /* @__PURE__ */ y.jsxs(y.Fragment, {
                children: [
                  /* @__PURE__ */ y.jsx("div", { className: ee.divider }),
                  /* @__PURE__ */ y.jsx("div", {
                    className: Ne(ee.content, {
                      [ee.selected]: A,
                    }),
                    style: { height: ci(_) },
                  }),
                ],
              }),
          ],
        }),
        /* @__PURE__ */ y.jsx(ra, {}),
      ],
    });
  },
  m5 = ({ data: e }) => {
    const { tables: t = [], prevTable: n, right: r, level: o } = e,
      {
        state: { moreTables: s },
      } = St(),
      i = Nt(),
      a = wt(),
      l = ge(
        (u) => {
          u.stopPropagation(),
            i(_t(hd)),
            i(Ii({ ...s, tables: t, prevTable: n, right: r, level: o }));
        },
        [o, i, s, n, r, t],
      );
    return /* @__PURE__ */ y.jsxs("div", {
      className: ee.see_more_node,
      onClick: l,
      children: [
        /* @__PURE__ */ y.jsx("div", {
          className: "fw-semibold",
          children: "See more",
        }),
        /* @__PURE__ */ y.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ y.jsx("div", {
          children: t.filter((u) => !a.getNode(u.table)).length || "",
        }),
        /* @__PURE__ */ y.jsx(ra, {}),
      ],
    });
  },
  y5 = (e) => {
    const { sourceX: t, sourceY: n, targetX: r, targetY: o, markerEnd: s } = e,
      i = (t - r) * 0.6,
      l = `M ${t - 5} ${n} A ${i} 50 0 1 0 ${r + 2} ${o}`;
    return /* @__PURE__ */ y.jsx(Wn, { path: l, markerEnd: s });
  },
  v5 = ({ data: e }) => {
    const { column: t, table: n, lensType: r } = e,
      {
        state: { selectedColumn: o },
      } = St(),
      s = Nt(),
      i = o.table === n && o.name === t,
      a = r && vd[r],
      l = a ? { borderColor: a } : {},
      u = wt(),
      c = () => {
        const d = u.getNode(Io(n, t));
        d && (s(vo("")), s(an({ name: t, table: n })), s8(d, u));
      };
    return /* @__PURE__ */ y.jsxs("div", {
      className: Ne(ee.column_node, i ? ee.selected : ee.default),
      style: l,
      onClick: c,
      children: [
        /* @__PURE__ */ y.jsx("div", {
          className: ee.column_name,
          children: t,
        }),
        /* @__PURE__ */ y.jsx(ra, {}),
        a
          ? /* @__PURE__ */ y.jsx(e1, {
              style: { "--lens-color": a },
              className: ee.column_badge,
              children: r[0],
            })
          : null,
      ],
    });
  },
  E5 = document.getElementById("sidebar");
function C5({ isOpen: e, closeModal: t, width: n = 350, children: r }) {
  return pn(
    /* @__PURE__ */ y.jsx("div", {
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
        /* @__PURE__ */ y.jsxs(y.Fragment, {
          children: [
            /* @__PURE__ */ y.jsx("div", {
              className: "sidebar-close-button",
              onClick: t,
              children: /* @__PURE__ */ y.jsx(z4, {}),
            }),
            /* @__PURE__ */ y.jsx("div", {
              className: "sidebar-background-screen",
              onClick: t,
            }),
            /* @__PURE__ */ y.jsx("div", {
              className: "sidebar-modal-content",
              children: r,
            }),
          ],
        }),
    }),
    E5,
  );
}
function Yo(e) {
  return /* @__PURE__ */ y.jsx(co, { className: "custom-input", ...e });
}
function x5(e) {
  return /* @__PURE__ */ y.jsx(co, {
    className: "custom-input",
    ...e,
    type: "textarea",
    rows: 4,
  });
}
function _5({ nodeType: e, label: t, table: n, tests: r, materialization: o }) {
  const s = e,
    i = n.replace(/[^a-zA-Z0-9]/g, "-");
  return /* @__PURE__ */ y.jsxs("div", {
    className: "d-flex flex-column align-items-start gap-xs w-100",
    children: [
      /* @__PURE__ */ y.jsxs("div", {
        className: ee.table_header,
        children: [
          /* @__PURE__ */ y.jsxs("div", {
            className: Ne(ee.node_icon, Ld[s]),
            children: [
              /* @__PURE__ */ y.jsx(Uo, { nodeType: s }),
              /* @__PURE__ */ y.jsx("div", { children: kd[s] }),
            ],
          }),
          /* @__PURE__ */ y.jsx("div", { className: "lines-2", children: t }),
        ],
      }),
      /* @__PURE__ */ y.jsxs("div", {
        className: Ne("d-flex gap-xs", ee.node_extra_info),
        children: [
          (r == null ? void 0 : r.length) > 0 &&
            /* @__PURE__ */ y.jsx(or, {
              id: "table-node-tests-" + i,
              icon: /* @__PURE__ */ y.jsx(Od, {}),
              text: r.length.toString(),
              label: "Tests",
            }),
          o &&
            /* @__PURE__ */ y.jsx(or, {
              id: "table-node-materilization-" + i,
              icon: /* @__PURE__ */ y.jsx(Rd, {}),
              text: o,
              label: "Materialization",
            }),
        ],
      }),
    ],
  });
}
function b5() {
  const {
      state: { moreTables: e, selectCheck: t, nonSelectCheck: n },
      rerender: r,
    } = St(),
    o = Nt(),
    { tables: s, level: i } = e,
    a = wt(),
    l = async (d) => {
      const f = [...a.getNodes()],
        h = [...a.getEdges()];
      r8(f, h, d, e, { direct: t, indirect: n }) && o(_t("")),
        mn(f, h),
        a.setNodes(f),
        a.setEdges(h),
        r();
    },
    [u, c] = de(s);
  return /* @__PURE__ */ y.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ y.jsx("div", {
        className: "mb-2 fw-semibold fs-5",
        children: "Tables",
      }),
      /* @__PURE__ */ y.jsx(Yo, {
        bsSize: "sm",
        placeholder: "Search by table name",
        onChange: (d) => {
          const f = d.target.value.toLowerCase();
          c(s.filter((h) => h.table.toLowerCase().includes(f)));
        },
      }),
      /* @__PURE__ */ y.jsx("div", { className: "mb-3" }),
      /* @__PURE__ */ y.jsx("div", {
        className: "h-100 overflow-y",
        children: /* @__PURE__ */ y.jsx("div", {
          className: "d-flex flex-column gap-sm",
          children: u.map((d) => {
            const f = a.getNode(d.table),
              h = f && f.data.level !== i;
            return /* @__PURE__ */ y.jsx(
              "div",
              {
                className: Ne(ee.table_card, {
                  [ee.selected]: f,
                  // [styles.disabled]: isNodeOnOtherLevel,
                }),
                onClick: (p) => {
                  p.stopPropagation(), !h && l(d);
                },
                children: /* @__PURE__ */ y.jsx(_5, {
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
const w5 = "_component_1sc6a_1",
  S5 = {
    component: w5,
  },
  Pd = ({ top: e = 50, left: t = 50, label: n }) =>
    /* @__PURE__ */ y.jsx("div", {
      className: S5.component,
      style: { top: `${e}%`, left: `${t}%` },
      children: /* @__PURE__ */ y.jsx("div", {
        style: { marginTop: "-70px" },
        children: n,
      }),
    }),
  N5 = "_level_tag_x6wwh_1",
  T5 = {
    level_tag: N5,
  },
  A5 = ({ label: e }) =>
    /* @__PURE__ */ y.jsx("div", { className: Ne(T5.level_tag), children: e }),
  D5 = ({ purpose: e }) =>
    /* @__PURE__ */ y.jsx("div", {
      className: Ne(ee.card, "purpose-section"),
      children: /* @__PURE__ */ y.jsx("div", {
        className: "d-flex flex-column gap-sm",
        children: /* @__PURE__ */ y.jsxs("div", {
          className: "d-flex gap-xs flex-column",
          children: [
            /* @__PURE__ */ y.jsx("div", {
              className: "fs-5 fw-semibold",
              children: "Description",
            }),
            /* @__PURE__ */ y.jsx("div", {
              className: Ne(ee.column_card),
              children: /* @__PURE__ */ y.jsx("div", {
                className: "font-normal fs-xxs",
                children: e,
              }),
            }),
          ],
        }),
      }),
    }),
  jd = D5,
  I5 = () =>
    /* @__PURE__ */ y.jsxs("div", {
      className: "tooltip-container",
      children: [
        /* @__PURE__ */ y.jsx(Y4, {}),
        /* @__PURE__ */ y.jsx("div", {
          className: "tooltip-text",
          children: "Preview Feature",
        }),
      ],
    }),
  O5 = ({ column: e, handleClick: t, selected: n, isSelectable: r }) =>
    /* @__PURE__ */ y.jsxs("div", {
      className: Ne(ee.column_card, {
        [ee.selected]: n,
        "cursor-pointer": r,
      }),
      onClick: t,
      "data-testid": "table-details-" + e.name,
      children: [
        /* @__PURE__ */ y.jsxs("div", {
          className: "d-flex align-items-center gap-xs",
          children: [
            /* @__PURE__ */ y.jsx(p5, { datatype: e.datatype }),
            /* @__PURE__ */ y.jsx("div", {
              className: "lines-2",
              children: e.name,
            }),
            /* @__PURE__ */ y.jsx("div", { className: "spacer" }),
            e.can_lineage_expand &&
              /* @__PURE__ */ y.jsx("div", {
                className: ee.expand_lineage_icon,
                children: /* @__PURE__ */ y.jsx(W4, {}),
              }),
            e.datatype && /* @__PURE__ */ y.jsx(A5, { label: e.datatype }),
          ],
        }),
        e.description &&
          /* @__PURE__ */ y.jsx("div", {
            className: "d-flex flex-column",
            children: /* @__PURE__ */ y.jsx("div", {
              className: "font-normal fs-xxs text-grey",
              children: e.description,
            }),
          }),
      ],
    }),
  R5 = ({
    columns: e,
    filteredColumn: t,
    setFilteredColumn: n,
    handleColumnClick: r,
    selectedTable: o,
    selectedColumn: s,
    setData: i,
  }) => {
    const a = (o == null ? void 0 : o.materialization) === "ephemeral",
      l = (o == null ? void 0 : o.nodeType) === "analysis";
    return /* @__PURE__ */ y.jsx("div", {
      className: Ne(ee.card, "flex-grow column-section"),
      children: /* @__PURE__ */ y.jsxs("div", {
        className: "d-flex flex-column gap-sm h-100 p-2",
        children: [
          /* @__PURE__ */ y.jsxs("div", {
            className: "d-flex align-items-center gap-xs",
            children: [
              /* @__PURE__ */ y.jsx("div", {
                className: "fs-5 fw-semibold",
                children: "Columns",
              }),
              /* @__PURE__ */ y.jsx("div", { className: "spacer" }),
              !a &&
                !l &&
                /* @__PURE__ */ y.jsx(Ue, {
                  size: "sm",
                  color: "primary",
                  onClick: () => {
                    o &&
                      wd(o.table, !0).then((u) => {
                        i(u), n(u.columns);
                      });
                  },
                  children: "Sync with DB",
                }),
            ],
          }),
          /* @__PURE__ */ y.jsx(Yo, {
            bsSize: "sm",
            type: "text",
            placeholder: "Search by column name",
            onChange: (u) => {
              const c = u.target.value.toLowerCase();
              n(e.filter((d) => d.name.toLowerCase().includes(c)));
            },
          }),
          /* @__PURE__ */ y.jsxs("div", {
            className: "d-flex align-items-center gap-xs",
            children: [
              !a &&
                /* @__PURE__ */ y.jsxs(y.Fragment, {
                  children: [
                    /* @__PURE__ */ y.jsx("div", {
                      className: "fs-xxs",
                      children: "Select column for lineage",
                    }),
                    /* @__PURE__ */ y.jsx(I5, {}),
                  ],
                }),
              /* @__PURE__ */ y.jsx("div", { className: "spacer" }),
              /* @__PURE__ */ y.jsxs("div", {
                className: "fs-xxs text-grey",
                children: [t.length, " columns"],
              }),
            ],
          }),
          /* @__PURE__ */ y.jsx("div", {
            className: "d-flex flex-column gap-sm",
            children: t.map((u) =>
              /* @__PURE__ */ y.jsx(
                O5,
                {
                  column: u,
                  handleClick: () => {
                    a || r(u);
                  },
                  selected: u.name === s.name && u.table === s.table,
                  isSelectable: !a,
                },
                u.name,
              ),
            ),
          }),
        ],
      }),
    });
  },
  M5 = ({ tests: e }) => {
    const [t, n] = de(e);
    return /* @__PURE__ */ y.jsx("div", {
      className: Ne(ee.card, "flex-grow column-section"),
      children: /* @__PURE__ */ y.jsxs("div", {
        className: "d-flex flex-column gap-sm h-100 p-2",
        children: [
          /* @__PURE__ */ y.jsx("div", {
            className: "fs-5 fw-semibold",
            children: "Tests",
          }),
          /* @__PURE__ */ y.jsx(Yo, {
            bsSize: "sm",
            type: "text",
            placeholder: "Search by test",
            onChange: (r) => {
              const o = r.target.value.toLowerCase();
              n(e.filter((s) => s.key.toLowerCase().includes(o)));
            },
          }),
          /* @__PURE__ */ y.jsx("div", {
            className: "d-flex align-items-center gap-xs",
            children: /* @__PURE__ */ y.jsxs("div", {
              className: "fs-xxs text-grey",
              children: [t.length, " tests"],
            }),
          }),
          /* @__PURE__ */ y.jsx("div", {
            className: "d-flex flex-column gap-sm",
            children: t.map((r) =>
              /* @__PURE__ */ y.jsx(
                "div",
                {
                  className: ee.column_card,
                  children: /* @__PURE__ */ y.jsx("div", {
                    className: "d-flex align-items-center gap-xs",
                    children: /* @__PURE__ */ y.jsx("div", {
                      className: "lines-2",
                      children: r.key,
                    }),
                  }),
                },
                r.key,
              ),
            ),
          }),
        ],
      }),
    });
  },
  L5 = () => {
    var b;
    const {
        rerender: e,
        state: {
          selectedTable: t,
          selectedColumn: n,
          selectCheck: r,
          nonSelectCheck: o,
          aiEnabled: s,
        },
      } = St(),
      i = Nt(),
      a = wt(),
      [l, u] = de([]),
      [c, d] = de(null),
      [f, h] = de(0),
      [p, g] = de(!0);
    ie(() => {
      t &&
        wd(t, !1).then((_) => {
          d(_), u(_.columns), g(!1);
        });
    }, [t]);
    const m = async (_) => {
        var E;
        if (!s) {
          K7();
          return;
        }
        if (ke.inProgress) {
          ke.showCllInProgressMsg();
          return;
        }
        if (n.table === _.table && n.name === _.name) {
          const [N, w] = n8(a.getNodes(), a.getEdges());
          Er(w, !0),
            Cr(w, !0),
            a.setNodes(N),
            a.setEdges(w),
            i(an({ table: "", name: "" })),
            i(Eo({})),
            i(_t(""));
          return;
        }
        const C = (E = a.getNode(_.table)) == null ? void 0 : E.data;
        if (!C) throw new Error(`table node ${_.table} isn't visible`);
        let A = a.getNodes(),
          I = a.getEdges();
        Er(I, !1), Cr(I, !0);
        const S = async (N) => {
            ([A, I] = await na(A, I, _.table, N)), mn(A, I);
          },
          { upstreamCount: P, downstreamCount: k } = C;
        P > 0 &&
          I.filter((N) => N.source === _.table).length < P &&
          (await S(!0)),
          k > 0 &&
            I.filter((N) => N.target === _.table).length < k &&
            (await S(!1)),
          i(an({ ..._ })),
          i(_t("")),
          i(Eo({})),
          i($p({ confidence: "high" }));
        const [j, z] = Q7(A.filter(vr), I.filter(vr));
        z.forEach((N) => (N.style = Qi)), a.setNodes(j), a.setEdges(z), e();
        const B = (N) =>
          Id(
            j,
            z,
            N,
            [_],
            (w) => {
              i(Bl({ operatorList: w }));
            },
            (w) => {
              i(Fl(w));
            },
            (w) => {
              i(Hl(w));
            },
            a,
            _,
            { direct: r, indirect: o },
          );
        try {
          ke.start(),
            (await Promise.all([B(!0), B(!1)])).every((w) => !w) &&
              (ke.isCancelled
                ? i(an({ table: "", name: "" }))
                : Nd(
                    `No lineage found for model ${_.table} and column ${_.name}`,
                  ));
        } catch (N) {
          console.error(
            "Error while performing cll for ",
            _.table,
            _.name,
            ", error:",
            N,
          ),
            i(an({ table: "", name: "" }));
        } finally {
          ke.end();
        }
      },
      v = (b = a.getNode(t)) == null ? void 0 : b.data;
    if (p || !c || !t) return /* @__PURE__ */ y.jsx(Pd, {});
    const x = ["Column"];
    return (
      v.tests.length && x.push("Tests"),
      /* @__PURE__ */ y.jsxs("div", {
        className: "p-2 h-100 d-flex flex-column gap-md overflow-y",
        children: [
          /* @__PURE__ */ y.jsxs("div", {
            className: ee.table_details_header,
            children: [
              /* @__PURE__ */ y.jsx(Uo, { nodeType: v.nodeType }),
              /* @__PURE__ */ y.jsx("div", {
                className: "d-flex align-items-center",
                children: /* @__PURE__ */ y.jsx("div", {
                  className: "fw-semibold fs-5 lines-2",
                  children: v.label,
                }),
              }),
            ],
          }),
          c.purpose && /* @__PURE__ */ y.jsx(jd, { purpose: c.purpose }),
          /* @__PURE__ */ y.jsx("div", {
            className: ee.table_details_tabs,
            children: x.map((_, C) =>
              /* @__PURE__ */ y.jsx(
                "div",
                {
                  className: Ne(ee.tab, { [ee.selected]: f === C }),
                  onClick: () => h(C),
                  children: _,
                },
                _,
              ),
            ),
          }),
          f === 0 &&
            /* @__PURE__ */ y.jsx(R5, {
              selectedTable: v,
              selectedColumn: n,
              filteredColumn: l,
              setFilteredColumn: u,
              columns: c.columns,
              handleColumnClick: m,
              setData: d,
            }),
          f === 1 && /* @__PURE__ */ y.jsx(M5, { tests: v.tests }),
        ],
      })
    );
  },
  k5 = ({ title: e, value: t }) =>
    /* @__PURE__ */ y.jsxs("div", {
      className: Ne(ee.column_card, {}),
      children: [
        /* @__PURE__ */ y.jsxs("div", {
          className: "d-flex align-items-center gap-xs",
          children: [
            /* @__PURE__ */ y.jsx("div", { className: "lines-2", children: e }),
            /* @__PURE__ */ y.jsx("div", { className: "spacer" }),
          ],
        }),
        /* @__PURE__ */ y.jsx("div", {
          className: "d-flex flex-column",
          children: /* @__PURE__ */ y.jsx("div", {
            className: "font-normal fs-xxs text-grey",
            children: t,
          }),
        }),
      ],
    }),
  eo = k5,
  P5 = ({ label: e }) => /* @__PURE__ */ y.jsx("div", { children: e }),
  j5 = P5,
  $5 = () => {
    var a;
    const e = wt(),
      {
        state: { selectedTable: t },
      } = St(),
      [n, r] = de(null),
      o = (a = e.getNode(t)) == null ? void 0 : a.data,
      [s, i] = de(!0);
    return (
      ie(() => {
        t &&
          W7(t).then((l) => {
            r(l), i(!1);
          });
      }, [t]),
      s || !n || !t
        ? /* @__PURE__ */ y.jsx(Pd, {})
        : /* @__PURE__ */ y.jsxs("div", {
            className: "p-2 h-100 d-flex flex-column gap-md overflow-y",
            children: [
              /* @__PURE__ */ y.jsxs("div", {
                className: ee.table_details_header,
                children: [
                  /* @__PURE__ */ y.jsx(Uo, { nodeType: o.nodeType }),
                  /* @__PURE__ */ y.jsx("div", {
                    className: "d-flex align-items-center",
                    children: /* @__PURE__ */ y.jsx("div", {
                      className: "fw-semibold fs-5 lines-2",
                      children: o.label,
                    }),
                  }),
                ],
              }),
              n.description
                ? /* @__PURE__ */ y.jsx(jd, { purpose: n.description })
                : null,
              /* @__PURE__ */ y.jsxs("div", {
                className: Ne(ee.card, "flex-grow column-section"),
                children: [
                  /* @__PURE__ */ y.jsx(eo, {
                    title: "Owner",
                    value: `${n.owner.name} - ${n.owner.email}`,
                  }),
                  /* @__PURE__ */ y.jsx(eo, { title: "Url", value: n.url }),
                  /* @__PURE__ */ y.jsx(eo, {
                    title: "Tags",
                    value: n.tags.map((l) =>
                      /* @__PURE__ */ y.jsx(j5, { label: l }),
                    ),
                  }),
                  /* @__PURE__ */ y.jsx(eo, {
                    title: "Maturity",
                    value: n.maturity,
                  }),
                ],
              }),
            ],
          })
    );
  },
  F5 = $5;
function H5({ close: e }) {
  const [t, n] = de(
      "",
      /* None */
    ),
    [r, o] = de(""),
    [s, i] = de(!1);
  return /* @__PURE__ */ y.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ y.jsxs("div", {
        className: "mb-2 d-flex",
        children: [
          /* @__PURE__ */ y.jsx("div", {
            className: "fw-semibold fs-5",
            children: "Feedback",
          }),
          /* @__PURE__ */ y.jsx("div", { className: "spacer" }),
          /* @__PURE__ */ y.jsx(Ue, {
            size: "sm",
            color: "primary",
            onClick: (a) => {
              a.stopPropagation(), X7();
            },
            children: "Chat with us",
          }),
        ],
      }),
      /* @__PURE__ */ y.jsxs("div", {
        className: ee.feedback_body,
        children: [
          !s &&
            /* @__PURE__ */ y.jsxs(y.Fragment, {
              children: [
                /* @__PURE__ */ y.jsxs("div", {
                  className: "d-flex gap-sm m-2",
                  children: [
                    t === "good"
                      ? /* @__PURE__ */ y.jsx(J4, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "",
                              /* None */
                            ),
                        })
                      : /* @__PURE__ */ y.jsx(q4, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "good",
                              /* Postive */
                            ),
                        }),
                    t === "bad"
                      ? /* @__PURE__ */ y.jsx(e5, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "",
                              /* None */
                            ),
                        })
                      : /* @__PURE__ */ y.jsx(K4, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "bad",
                              /* Negative */
                            ),
                        }),
                  ],
                }),
                /* @__PURE__ */ y.jsx("p", {
                  children:
                    "AI still needs humans sometimes, please help it out 🙂",
                }),
                /* @__PURE__ */ y.jsx(x5, {
                  value: r,
                  onChange: (a) => o(a.target.value),
                  placeholder:
                    "What did AI do wrong? What it should have done?",
                }),
                /* @__PURE__ */ y.jsxs("div", {
                  className: "mt-3 d-flex gap-sm",
                  children: [
                    /* @__PURE__ */ y.jsx(Ue, {
                      size: "sm",
                      color: "primary",
                      onClick: async (a) => {
                        a.stopPropagation(),
                          t !== "" &&
                            (await Y7({
                              feedback_value: t,
                              feedback_text: r,
                            }),
                            i(!0));
                      },
                      children: "Submit",
                    }),
                    /* @__PURE__ */ y.jsx(Ue, {
                      size: "sm",
                      color: "link",
                      className: ee.cancel_btn,
                      onClick: (a) => {
                        a.stopPropagation(), e();
                      },
                      children: "Cancel",
                    }),
                  ],
                }),
              ],
            }),
          s &&
            /* @__PURE__ */ y.jsxs(y.Fragment, {
              children: [
                /* @__PURE__ */ y.jsx("p", {
                  children: "Many thanks for your feedback!",
                }),
                /* @__PURE__ */ y.jsx(Ue, {
                  size: "sm",
                  color: "primary",
                  onClick: (a) => {
                    a.stopPropagation(), e();
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
function B5() {
  const {
      state: {
        selectCheck: e,
        nonSelectCheck: t,
        defaultExpansion: n,
        aiEnabled: r,
      },
    } = St(),
    o = Nt();
  return /* @__PURE__ */ y.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ y.jsx("div", {
        className: "mb-2 fw-semibold fs-5",
        children: "Settings",
      }),
      /* @__PURE__ */ y.jsxs("div", {
        className: "d-flex flex-column gap-sm",
        children: [
          /* @__PURE__ */ y.jsxs("div", {
            children: [
              /* @__PURE__ */ y.jsx(ts, {
                check: !0,
                for: "default-expansion",
                className: "fs-6 mb-1",
                children: "Default Expansion",
              }),
              /* @__PURE__ */ y.jsx(Yo, {
                id: "default-expansion",
                value: n,
                type: "number",
                onChange: (s) => {
                  const i = Math.max(parseInt(s.target.value), 0);
                  o(Wl(i)), As({ defaultExpansion: i });
                },
              }),
            ],
          }),
          r &&
            /* @__PURE__ */ y.jsxs(y.Fragment, {
              children: [
                /* @__PURE__ */ y.jsx("div", {
                  className: "fs-6",
                  children: "Edges visibility",
                }),
                /* @__PURE__ */ y.jsxs("div", {
                  className: ee.select_node_checkbox,
                  children: [
                    /* @__PURE__ */ y.jsx(co, {
                      type: "checkbox",
                      id: "select-check",
                      className: "mt-2",
                      checked: e,
                      onChange: (s) => {
                        if (ke.inProgress) {
                          ke.showCllInProgressMsg();
                          return;
                        }
                        o(zl(s.target.checked)),
                          As({
                            showSelectEdges: s.target.checked,
                          });
                      },
                    }),
                    /* @__PURE__ */ y.jsxs("div", {
                      className: "d-flex flex-column",
                      children: [
                        /* @__PURE__ */ y.jsx(ts, {
                          check: !0,
                          for: "select-check",
                          className: "fs-6",
                          children: "Select",
                        }),
                        /* @__PURE__ */ y.jsx("div", {
                          className: "text-grey",
                          children:
                            "Select linkages are shown if there is direct flow of data between columns through select statements.",
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ y.jsxs("div", {
                  className: ee.non_select_node_checkbox,
                  children: [
                    /* @__PURE__ */ y.jsx(co, {
                      type: "checkbox",
                      id: "non-select-check",
                      className: "mt-2",
                      checked: t,
                      onChange: (s) => {
                        if (ke.inProgress) {
                          ke.showCllInProgressMsg();
                          return;
                        }
                        o(Vl(s.target.checked)),
                          As({
                            showNonSelectEdges: s.target.checked,
                          });
                      },
                    }),
                    /* @__PURE__ */ y.jsxs("div", {
                      className: "d-flex flex-column",
                      children: [
                        /* @__PURE__ */ y.jsx(ts, {
                          check: !0,
                          for: "non-select-check",
                          className: "fs-6",
                          children: "Non-Select",
                        }),
                        /* @__PURE__ */ y.jsx("div", {
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
const $d = pt({ isOpen: !1, setIsOpen: () => {} });
function z5({ trigger: e, render: t }) {
  const n = se(null),
    r = "popover-id",
    { isOpen: o, setIsOpen: s } = Ze($d);
  return (
    ie(() => {
      const i = (a) => {
        if (!n.current) return;
        const {
          x: l,
          y: u,
          width: c,
          height: d,
        } = n.current.getBoundingClientRect();
        s(Hc(l - 10, l + c + 10)(a.x) && Hc(u - 10, u + d + 10)(a.y));
      };
      return (
        document.body.addEventListener("click", i),
        () => {
          document.body.removeEventListener("click", i);
        }
      );
    }, [o]),
    /* @__PURE__ */ y.jsxs(y.Fragment, {
      children: [
        /* @__PURE__ */ y.jsx("div", {
          id: r,
          onClick: (i) => {
            i.stopPropagation(), s((a) => !a);
          },
          children: e,
        }),
        /* @__PURE__ */ y.jsx(Xc, {
          placement: "bottom",
          target: r,
          className: ee.popover,
          isOpen: o,
          toggle: () => s((i) => !i),
          children: /* @__PURE__ */ y.jsx(Kc, {
            children: /* @__PURE__ */ y.jsx("div", {
              ref: n,
              children: t({ close: () => s(!1) }),
            }),
          }),
        }),
      ],
    })
  );
}
const V5 = () => {
    const e = wt(),
      {
        state: {
          selectedTable: t,
          leftExpansion: n,
          rightExpansion: r,
          minRange: o,
          nodeCount: s,
          defaultExpansion: i,
        },
        rerender: a,
      } = St(),
      [l, u] = de([0, 0]),
      c = Nt();
    ie(() => {
      c(hs(zc(o[0], l[0], i))), c(ps(zc(o[1], l[1], i)));
    }, [i, c, l, o]),
      ie(() => {
        (async () => c(kn(await Bn(e.getNodes(), e.getEdges(), t, n, r))))();
      }, [e, n, c, r, t]),
      ie(() => {
        (async () => {
          var _;
          if (!t) return;
          const h = (_ = e.getNode(t)) == null ? void 0 : _.data;
          if (!h) return;
          const { level: p } = h,
            g = e.getNodes(),
            m = e.getEdges(),
            [v] = await li(g, m, t, -1 / 0, 1 / 0);
          let x = 1 / 0,
            b = -1 / 0;
          for (const C of v)
            (x = Math.min(x, C.data.level)), (b = Math.max(b, C.data.level));
          u([p - x, b - p]);
        })();
      }, [e, t]);
    const d = ge(() => {
        c(hs(n + 1 <= l[0] ? n + 1 : n));
      }, [n, c, l]),
      f = ge(() => {
        c(ps(r + 1 <= l[0] ? r + 1 : r));
      }, [r, c, l]);
    return /* @__PURE__ */ y.jsx(z5, {
      trigger: /* @__PURE__ */ y.jsxs(Ue, {
        size: "sm",
        color: "primary",
        className: "d-flex gap-sm align-items-center",
        type: "button",
        children: [/* @__PURE__ */ y.jsx(n5, {}), "Expand"],
      }),
      render: ({ close: h }) =>
        /* @__PURE__ */ y.jsxs("div", {
          className: "d-flex flex-column gap-xs",
          children: [
            /* @__PURE__ */ y.jsxs("div", {
              className:
                "w-100 d-flex gap-xl justify-content-between align-items-center",
              children: [
                /* @__PURE__ */ y.jsxs("div", {
                  className: Ne(ee.expand_nav, {
                    [ee.disabled]: o[0] === -1,
                  }),
                  children: [
                    /* @__PURE__ */ y.jsxs("div", {
                      className: ee.expand_nav_btn,
                      children: [
                        /* @__PURE__ */ y.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && c(hs(l[0]));
                          },
                          children: /* @__PURE__ */ y.jsx(o5, {}),
                        }),
                        /* @__PURE__ */ y.jsx("div", { className: ee.divider }),
                        /* @__PURE__ */ y.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && d();
                          },
                          children: /* @__PURE__ */ y.jsx(c5, {}),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ y.jsx("div", {
                      className: "text-blue px-2 py-1",
                      children: n,
                    }),
                  ],
                }),
                /* @__PURE__ */ y.jsxs("div", {
                  className: Ne(ee.expand_nav, {
                    [ee.disabled]: o[1] === -1,
                  }),
                  children: [
                    /* @__PURE__ */ y.jsx("div", {
                      className: "text-blue px-2 py-1",
                      children: r,
                    }),
                    /* @__PURE__ */ y.jsxs("div", {
                      className: ee.expand_nav_btn,
                      children: [
                        /* @__PURE__ */ y.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && f();
                          },
                          children: /* @__PURE__ */ y.jsx(u5, {}),
                        }),
                        /* @__PURE__ */ y.jsx("div", { className: ee.divider }),
                        /* @__PURE__ */ y.jsx("div", {
                          className: ee.icon,
                          onClick: (p) => {
                            p.stopPropagation(), t && c(ps(l[1]));
                          },
                          children: /* @__PURE__ */ y.jsx(i5, {}),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ y.jsxs("div", {
              className:
                "w-100 d-flex gap-xl justify-content-between align-items-center",
              children: [
                /* @__PURE__ */ y.jsx("div", {
                  className: "normal-text",
                  children: "Parents",
                }),
                /* @__PURE__ */ y.jsx("div", {
                  className: "normal-text",
                  children: "Children",
                }),
              ],
            }),
            /* @__PURE__ */ y.jsxs(Ue, {
              color: s === 0 ? "secondary" : "primary",
              size: "sm",
              disabled: s === 0,
              onClick: async (p) => {
                var x;
                if ((p.stopPropagation(), !t)) return;
                const g = (x = e.getNode(t)) == null ? void 0 : x.data;
                if (!g) return;
                const [m, v] = await li(
                  e.getNodes(),
                  e.getEdges(),
                  t,
                  g.level - n,
                  g.level + r,
                );
                xr(m, v, t),
                  mn(m, v),
                  e.setNodes(m),
                  e.setEdges(v),
                  e.fitView({ minZoom: Gi }),
                  c(ur(_r(m, v, t))),
                  c(kn(await Bn(m, v, t, n, r))),
                  a(),
                  h();
              },
              children: ["Add ", s, " tables"],
            }),
          ],
        }),
    });
  },
  W5 = V5,
  U5 = () => {
    const {
        state: { selectedColumn: e, confidence: t, aiEnabled: n },
      } = St(),
      r = document.getElementById("expand-container");
    if (r)
      return pn(
        /* @__PURE__ */ y.jsx(br, {
          className: ee.menu_card_container,
          children: /* @__PURE__ */ y.jsx(wr, {
            className: ee.menu_card,
            children: /* @__PURE__ */ y.jsxs("div", {
              className: "d-flex gap-sm",
              children: [
                /* @__PURE__ */ y.jsx(W5, {}),
                n &&
                  e.name &&
                  t.confidence === "low" &&
                  /* @__PURE__ */ y.jsxs(y.Fragment, {
                    children: [
                      /* @__PURE__ */ y.jsx("div", {
                        className: ee.verticle_divider,
                      }),
                      /* @__PURE__ */ y.jsxs("div", {
                        className: "d-flex gap-xxs align-items-center",
                        children: [
                          /* @__PURE__ */ y.jsx("div", {
                            children: "Confidence",
                          }),
                          /* @__PURE__ */ y.jsx(di, {
                            title:
                              "Depending on the SQL dialect and complexity of queries, there may be situations where we are not completely confident about the lineage shown in this view",
                            id: "confidence",
                            children: /* @__PURE__ */ y.jsx(n0, {}),
                          }),
                          /* @__PURE__ */ y.jsx("div", {
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
        r,
      );
  },
  Y5 = U5,
  Z5 = () => {
    const e = document.getElementById("settings-container"),
      t = Nt();
    if (e)
      return pn(
        /* @__PURE__ */ y.jsxs(Ue, {
          outline: !0,
          onClick: () => t(_t(pd)),
          children: [/* @__PURE__ */ y.jsx(t0, {}), "Settings"],
        }),
        e,
      );
  },
  q5 = Z5,
  X5 = ({ flow: e }) => {
    const t = document.getElementById("reset-container"),
      n = Nt();
    if (t)
      return pn(
        /* @__PURE__ */ y.jsxs(Ue, {
          outline: !0,
          onClick: () => {
            e.setNodes([]),
              e.setEdges([]),
              n(an({ table: "", name: "" })),
              n(Eo({})),
              n(Ii({})),
              Sd(),
              ke.cancel();
          },
          "data-testid": "reset-btn",
          children: [
            /* @__PURE__ */ y.jsx(e0, {}),
            /* @__PURE__ */ y.jsx("span", { children: "Reset" }),
          ],
        }),
        t,
      );
  },
  K5 = X5,
  G5 = {
    table: g5,
    seeMore: m5,
    column: v5,
  },
  J5 = { selfConnecting: y5 },
  Q5 = ({ flow: e, afterFlowRender: t, theme: n }) => {
    const [r, o] = de(!1),
      {
        state: { selectCheck: s, nonSelectCheck: i, sidebarScreen: a },
      } = St(),
      l = Nt(),
      u = ge(async () => {
        const c = await Z7();
        l(zl(c.showSelectEdges)),
          l(Vl(c.showNonSelectEdges)),
          l(Wl(c.defaultExpansion));
      }, [l]);
    return (
      ie(() => {
        Sd(), u();
      }, [u]),
      ie(() => {
        var f;
        const c = e.current;
        if (!c) return;
        const d = c.getEdges();
        if ((s && i) || (!s && !i)) {
          for (const h of d) h.hidden = !1;
          c.setEdges(d);
          return;
        }
        for (const h of d) {
          h.hidden = !1;
          const p = (f = h.data) == null ? void 0 : f.type;
          p &&
            (p === "direct" && (h.hidden = !s),
            p === "indirect" && (h.hidden = !i));
        }
        c.setEdges(d);
      }, [s, i, e]),
      /* @__PURE__ */ y.jsx("div", {
        className: "lineage_flow_component",
        style: { width: "100%", height: "100%" },
        "data-theme": n,
        children: /* @__PURE__ */ y.jsx($d.Provider, {
          value: { isOpen: r, setIsOpen: o },
          children: /* @__PURE__ */ y.jsxs(qi, {
            children: [
              /* @__PURE__ */ y.jsxs(cd, {
                defaultNodes: [],
                defaultEdges: [],
                onInit: (c) => t(c),
                nodeTypes: G5,
                edgeTypes: J5,
                style: { background: "var(--bg-color)" },
                proOptions: { hideAttribution: !0 },
                minZoom: Gi,
                children: [
                  /* @__PURE__ */ y.jsx(O7, {}),
                  /* @__PURE__ */ y.jsx(S7, {}),
                ],
              }),
              /* @__PURE__ */ y.jsx(f5, {}),
              /* @__PURE__ */ y.jsxs(C5, {
                isOpen: a !== "",
                closeModal: () => l(_t("")),
                width: 446,
                children: [
                  a === hd && /* @__PURE__ */ y.jsx(b5, {}),
                  a === dd && /* @__PURE__ */ y.jsx(L5, {}),
                  a === fd && /* @__PURE__ */ y.jsx(F5, {}),
                  a === R7 &&
                    /* @__PURE__ */ y.jsx(H5, { close: () => _t("") }),
                  a === pd && /* @__PURE__ */ y.jsx(B5, {}),
                ],
              }),
              /* @__PURE__ */ y.jsx(Y5, {}),
              /* @__PURE__ */ y.jsx(q5, {}),
              e.current ? /* @__PURE__ */ y.jsx(K5, { flow: e.current }) : null,
            ],
          }),
        }),
      })
    );
  },
  e9 = Q5,
  oa = pt({
    state: yo.getInitialState(),
    dispatch: () => null,
    rerender: () => null,
  }),
  t9 = ({ renderNode: e, theme: t = "dark" }) => {
    const [n, r] = Uc(yo.reducer, {
        ...yo.getInitialState(),
      }),
      o = se(),
      [, s] = de(0),
      i = ge(() => s((d) => (d + 1) % 100), []),
      a = ge(
        async (d) => {
          if ((r(_t("")), !d)) return;
          r(Fp(d.aiEnabled));
          const { node: f } = d,
            h = o.current;
          if (!h || !f) return;
          if (h.getNode(f.table)) {
            r(vo(f.table));
            let x = h.getNodes(),
              b = h.getEdges();
            n.selectedColumn.name ||
              (([x, b] = xr(x, b, f.table)), h.setNodes(x), h.setEdges(b)),
              r(ur(_r(x, b, f.table))),
              r(kn(await Bn(x, b, f.table, n.leftExpansion, n.rightExpansion)));
            return;
          }
          let g = [],
            m = [];
          const v = async (x, b) => {
            [g, m] = await na(g, m, x, b);
          };
          (g = [ea(f, 0, "")]),
            f.upstreamCount > 0 && (await v(f.table, !0)),
            f.downstreamCount > 0 && (await v(f.table, !1)),
            r(vo(f.table)),
            r(an({ table: "", name: "" })),
            r(Eo({})),
            r(Ii({})),
            ([g, m] = xr(g, m, f.table)),
            mn(g, m),
            h.setNodes(g),
            h.setEdges(m),
            h.fitView({ minZoom: Gi, duration: 500 }),
            r(ur(_r(g, m, f.table))),
            r(kn(await Bn(g, m, f.table, n.leftExpansion, n.rightExpansion))),
            i();
        },
        [i, n.leftExpansion, n.rightExpansion, n.selectedColumn.name],
      ),
      l = () => {
        if (o.current) {
          const d = o.current.getEdges();
          Er(d, !0), Cr(d, !1), o.current.setEdges(d);
        }
      };
    ie(
      () => (
        document.addEventListener("cll_cancelled", l),
        () => {
          document.removeEventListener("cll_cancelled", l);
        }
      ),
      [],
    );
    const u = Ie(
        () => ({
          state: n,
          dispatch: r,
          rerender: i,
        }),
        [n, r, i],
      ),
      c = (d) => {
        (o.current = d), a(e);
      };
    return (
      ie(() => {
        !e.node || !o.current || a(e);
      }, [e, a]),
      /* @__PURE__ */ y.jsx(oa.Provider, {
        value: u,
        children: /* @__PURE__ */ y.jsx(e9, {
          afterFlowRender: c,
          flow: o,
          theme: t,
        }),
      })
    );
  },
  n9 = t9,
  St = () => Ze(oa),
  Nt = () => {
    const { dispatch: e } = Ze(oa);
    return e;
  },
  r9 = (e) => /* @__PURE__ */ y.jsx(n9, { ...e }),
  x9 = r9;
export {
  Oe as A,
  w1 as C,
  C9 as D,
  x9 as L,
  xe as a,
  p9 as b,
  g9 as c,
  l9 as d,
  pi as e,
  jt as f,
  S1 as g,
  fi as h,
  Ml as i,
  y as j,
  mp as k,
  J7 as l,
  ke as m,
  h9 as s,
  ot as u,
};
