import "./main.css";
var Md = Object.defineProperty;
var kd = (e, t, n) =>
  t in e
    ? Md(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Nr = (e, t, n) => (kd(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as z from "react";
import $, {
  createContext as bt,
  Component as Ld,
  createElement as ea,
  isValidElement as Pc,
  useState as he,
  useRef as se,
  useReducer as jc,
  useCallback as ge,
  useMemo as De,
  useContext as Ge,
  useLayoutEffect as Pd,
  useEffect as ie,
  useId as $c,
  useInsertionEffect as jd,
  cloneElement as $d,
  Children as An,
  lazy as Fd,
  memo as Te,
  forwardRef as Fc,
} from "react";
import { Prism as Hd } from "react-syntax-highlighter";
import {
  Tooltip as Bd,
  Button as dt,
  Spinner as zd,
  Card as To,
  CardTitle as Hc,
  CardBody as Ao,
  CloseButton as Vd,
  Popover as Wd,
  PopoverBody as Ud,
  UncontrolledTooltip as Yd,
  Badge as qd,
  Input as Qr,
  Label as es,
} from "reactstrap";
import Zd, { createPortal as Do } from "react-dom";
var Xd =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function jn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ts = { exports: {} },
  Bn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ta;
function Kd() {
  if (ta) return Bn;
  ta = 1;
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
  return (Bn.Fragment = n), (Bn.jsx = i), (Bn.jsxs = i), Bn;
}
var zn = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var na;
function Gd() {
  return (
    na ||
      ((na = 1),
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
          var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function _(M) {
            {
              for (
                var U = arguments.length,
                  J = new Array(U > 1 ? U - 1 : 0),
                  oe = 1;
                oe < U;
                oe++
              )
                J[oe - 1] = arguments[oe];
              x("error", M, J);
            }
          }
          function x(M, U, J) {
            {
              var oe = y.ReactDebugCurrentFrame,
                pe = oe.getStackAddendum();
              pe !== "" && ((U += "%s"), (J = J.concat([pe])));
              var Ee = J.map(function (fe) {
                return String(fe);
              });
              Ee.unshift("Warning: " + U),
                Function.prototype.apply.call(console[M], console, Ee);
            }
          }
          var b = !1,
            C = !1,
            A = !1,
            O = !1,
            S = !1,
            P;
          P = Symbol.for("react.module.reference");
          function L(M) {
            return !!(
              typeof M == "string" ||
              typeof M == "function" ||
              M === r ||
              M === s ||
              S ||
              M === o ||
              M === u ||
              M === c ||
              O ||
              M === h ||
              b ||
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
          function B(M) {
            return M.displayName || "Context";
          }
          function H(M) {
            if (M == null) return null;
            if (
              (typeof M.tag == "number" &&
                _(
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
                  return B(U) + ".Consumer";
                case i:
                  var J = M;
                  return B(J._context) + ".Provider";
                case l:
                  return j(M, M.render, "ForwardRef");
                case d:
                  var oe = M.displayName || null;
                  return oe !== null ? oe : H(M.type) || "Memo";
                case f: {
                  var pe = M,
                    Ee = pe._payload,
                    fe = pe._init;
                  try {
                    return H(fe(Ee));
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
            I,
            k,
            D,
            T,
            R,
            F;
          function V() {}
          V.__reactDisabledLog = !0;
          function W() {
            {
              if (N === 0) {
                (w = console.log),
                  (I = console.info),
                  (k = console.warn),
                  (D = console.error),
                  (T = console.group),
                  (R = console.groupCollapsed),
                  (F = console.groupEnd);
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
                    value: I,
                  }),
                  warn: E({}, M, {
                    value: k,
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
                    value: F,
                  }),
                });
              }
              N < 0 &&
                _(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                );
            }
          }
          var q = y.ReactCurrentDispatcher,
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
          var ee = !1,
            K;
          {
            var de = typeof WeakMap == "function" ? WeakMap : Map;
            K = new de();
          }
          function Z(M, U) {
            if (!M || ee) return "";
            {
              var J = K.get(M);
              if (J !== void 0) return J;
            }
            var oe;
            ee = !0;
            var pe = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var Ee;
            (Ee = q.current), (q.current = null), W();
            try {
              if (U) {
                var fe = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(fe.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(fe, []);
                  } catch (at) {
                    oe = at;
                  }
                  Reflect.construct(M, [], fe);
                } else {
                  try {
                    fe.call();
                  } catch (at) {
                    oe = at;
                  }
                  M.call(fe.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (at) {
                  oe = at;
                }
                M();
              }
            } catch (at) {
              if (at && oe && typeof at.stack == "string") {
                for (
                  var ce = at.stack.split(`
`),
                    ke = oe.stack.split(`
`),
                    xe = ce.length - 1,
                    Se = ke.length - 1;
                  xe >= 1 && Se >= 0 && ce[xe] !== ke[Se];

                )
                  Se--;
                for (; xe >= 1 && Se >= 0; xe--, Se--)
                  if (ce[xe] !== ke[Se]) {
                    if (xe !== 1 || Se !== 1)
                      do
                        if ((xe--, Se--, Se < 0 || ce[xe] !== ke[Se])) {
                          var Ve =
                            `
` + ce[xe].replace(" at new ", " at ");
                          return (
                            M.displayName &&
                              Ve.includes("<anonymous>") &&
                              (Ve = Ve.replace("<anonymous>", M.displayName)),
                            typeof M == "function" && K.set(M, Ve),
                            Ve
                          );
                        }
                      while (xe >= 1 && Se >= 0);
                    break;
                  }
              }
            } finally {
              (ee = !1), (q.current = Ee), Y(), (Error.prepareStackTrace = pe);
            }
            var Bt = M ? M.displayName || M.name : "",
              Sr = Bt ? Q(Bt) : "";
            return typeof M == "function" && K.set(M, Sr), Sr;
          }
          function ve(M, U, J) {
            return Z(M, !1);
          }
          function Pe(M) {
            var U = M.prototype;
            return !!(U && U.isReactComponent);
          }
          function _e(M, U, J) {
            if (M == null) return "";
            if (typeof M == "function") return Z(M, Pe(M));
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
            re = y.ReactDebugCurrentFrame;
          function Me(M) {
            if (M) {
              var U = M._owner,
                J = _e(M.type, M._source, U ? U.type : null);
              re.setExtraStackFrame(J);
            } else re.setExtraStackFrame(null);
          }
          function xt(M, U, J, oe, pe) {
            {
              var Ee = Function.call.bind(Fe);
              for (var fe in M)
                if (Ee(M, fe)) {
                  var ce = void 0;
                  try {
                    if (typeof M[fe] != "function") {
                      var ke = Error(
                        (oe || "React class") +
                          ": " +
                          J +
                          " type `" +
                          fe +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof M[fe] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      );
                      throw ((ke.name = "Invariant Violation"), ke);
                    }
                    ce = M[fe](
                      U,
                      fe,
                      oe,
                      J,
                      null,
                      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                    );
                  } catch (xe) {
                    ce = xe;
                  }
                  ce &&
                    !(ce instanceof Error) &&
                    (Me(pe),
                    _(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      oe || "React class",
                      J,
                      fe,
                      typeof ce,
                    ),
                    Me(null)),
                    ce instanceof Error &&
                      !(ce.message in Ce) &&
                      ((Ce[ce.message] = !0),
                      Me(pe),
                      _("Failed %s type: %s", J, ce.message),
                      Me(null));
                }
            }
          }
          var Jt = Array.isArray;
          function gt(M) {
            return Jt(M);
          }
          function jt(M) {
            {
              var U = typeof Symbol == "function" && Symbol.toStringTag,
                J =
                  (U && M[Symbol.toStringTag]) ||
                  M.constructor.name ||
                  "Object";
              return J;
            }
          }
          function ot(M) {
            try {
              return wt(M), !1;
            } catch {
              return !0;
            }
          }
          function wt(M) {
            return "" + M;
          }
          function mt(M) {
            if (ot(M))
              return (
                _(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  jt(M),
                ),
                wt(M)
              );
          }
          var Ye = y.ReactCurrentOwner,
            $t = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            St,
            Ft,
            Ie;
          Ie = {};
          function qe(M) {
            if (Fe.call(M, "ref")) {
              var U = Object.getOwnPropertyDescriptor(M, "ref").get;
              if (U && U.isReactWarning) return !1;
            }
            return M.ref !== void 0;
          }
          function Nt(M) {
            if (Fe.call(M, "key")) {
              var U = Object.getOwnPropertyDescriptor(M, "key").get;
              if (U && U.isReactWarning) return !1;
            }
            return M.key !== void 0;
          }
          function Tt(M, U) {
            if (
              typeof M.ref == "string" &&
              Ye.current &&
              U &&
              Ye.current.stateNode !== U
            ) {
              var J = H(Ye.current.type);
              Ie[J] ||
                (_(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  H(Ye.current.type),
                  M.ref,
                ),
                (Ie[J] = !0));
            }
          }
          function At(M, U) {
            {
              var J = function () {
                St ||
                  ((St = !0),
                  _(
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
          function st(M, U) {
            {
              var J = function () {
                Ft ||
                  ((Ft = !0),
                  _(
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
          var Je = function (M, U, J, oe, pe, Ee, fe) {
            var ce = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: M,
              key: U,
              ref: J,
              props: fe,
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
          function Qt(M, U, J, oe, pe) {
            {
              var Ee,
                fe = {},
                ce = null,
                ke = null;
              J !== void 0 && (mt(J), (ce = "" + J)),
                Nt(U) && (mt(U.key), (ce = "" + U.key)),
                qe(U) && ((ke = U.ref), Tt(U, pe));
              for (Ee in U)
                Fe.call(U, Ee) && !$t.hasOwnProperty(Ee) && (fe[Ee] = U[Ee]);
              if (M && M.defaultProps) {
                var xe = M.defaultProps;
                for (Ee in xe) fe[Ee] === void 0 && (fe[Ee] = xe[Ee]);
              }
              if (ce || ke) {
                var Se =
                  typeof M == "function"
                    ? M.displayName || M.name || "Unknown"
                    : M;
                ce && At(fe, Se), ke && st(fe, Se);
              }
              return Je(M, ce, ke, pe, oe, Ye.current, fe);
            }
          }
          var en = y.ReactCurrentOwner,
            Ht = y.ReactDebugCurrentFrame;
          function yt(M) {
            if (M) {
              var U = M._owner,
                J = _e(M.type, M._source, U ? U.type : null);
              Ht.setExtraStackFrame(J);
            } else Ht.setExtraStackFrame(null);
          }
          var hn;
          hn = !1;
          function it(M) {
            return typeof M == "object" && M !== null && M.$$typeof === t;
          }
          function Er() {
            {
              if (en.current) {
                var M = H(en.current.type);
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
          function Yo(M) {
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
          var Cr = {};
          function qo(M) {
            {
              var U = Er();
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
          function br(M, U) {
            {
              if (!M._store || M._store.validated || M.key != null) return;
              M._store.validated = !0;
              var J = qo(U);
              if (Cr[J]) return;
              Cr[J] = !0;
              var oe = "";
              M &&
                M._owner &&
                M._owner !== en.current &&
                (oe = " It was passed a child from " + H(M._owner.type) + "."),
                yt(M),
                _(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  J,
                  oe,
                ),
                yt(null);
            }
          }
          function _r(M, U) {
            {
              if (typeof M != "object") return;
              if (gt(M))
                for (var J = 0; J < M.length; J++) {
                  var oe = M[J];
                  it(oe) && br(oe, U);
                }
              else if (it(M)) M._store && (M._store.validated = !0);
              else if (M) {
                var pe = m(M);
                if (typeof pe == "function" && pe !== M.entries)
                  for (var Ee = pe.call(M), fe; !(fe = Ee.next()).done; )
                    it(fe.value) && br(fe.value, U);
              }
            }
          }
          function Zo(M) {
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
                var oe = H(U);
                xt(J, M.props, "prop", oe, M);
              } else if (U.PropTypes !== void 0 && !hn) {
                hn = !0;
                var pe = H(U);
                _(
                  "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                  pe || "Unknown",
                );
              }
              typeof U.getDefaultProps == "function" &&
                !U.getDefaultProps.isReactClassApproved &&
                _(
                  "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                );
            }
          }
          function Xo(M) {
            {
              for (var U = Object.keys(M.props), J = 0; J < U.length; J++) {
                var oe = U[J];
                if (oe !== "children" && oe !== "key") {
                  yt(M),
                    _(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      oe,
                    ),
                    yt(null);
                  break;
                }
              }
              M.ref !== null &&
                (yt(M),
                _("Invalid attribute `ref` supplied to `React.Fragment`."),
                yt(null));
            }
          }
          function xr(M, U, J, oe, pe, Ee) {
            {
              var fe = L(M);
              if (!fe) {
                var ce = "";
                (M === void 0 ||
                  (typeof M == "object" &&
                    M !== null &&
                    Object.keys(M).length === 0)) &&
                  (ce +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var ke = Yo(pe);
                ke ? (ce += ke) : (ce += Er());
                var xe;
                M === null
                  ? (xe = "null")
                  : gt(M)
                    ? (xe = "array")
                    : M !== void 0 && M.$$typeof === t
                      ? ((xe = "<" + (H(M.type) || "Unknown") + " />"),
                        (ce =
                          " Did you accidentally export a JSX literal instead of a component?"))
                      : (xe = typeof M),
                  _(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    xe,
                    ce,
                  );
              }
              var Se = Qt(M, U, J, pe, Ee);
              if (Se == null) return Se;
              if (fe) {
                var Ve = U.children;
                if (Ve !== void 0)
                  if (oe)
                    if (gt(Ve)) {
                      for (var Bt = 0; Bt < Ve.length; Bt++) _r(Ve[Bt], M);
                      Object.freeze && Object.freeze(Ve);
                    } else
                      _(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else _r(Ve, M);
              }
              return M === r ? Xo(Se) : Zo(Se), Se;
            }
          }
          function Ko(M, U, J) {
            return xr(M, U, J, !0);
          }
          function Go(M, U, J) {
            return xr(M, U, J, !1);
          }
          var Jo = Go,
            wr = Ko;
          (zn.Fragment = r), (zn.jsx = Jo), (zn.jsxs = wr);
        })()),
    zn
  );
}
process.env.NODE_ENV === "production"
  ? (Ts.exports = Kd())
  : (Ts.exports = Gd());
var v = Ts.exports;
const Jd = {
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
  Qd = {
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
  ef = {
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
  tf = "_codeblock_tsha5_1",
  nf = {
    codeblock: tf,
  },
  rf = "_iconButton_eti7u_1",
  of = {
    iconButton: rf,
  },
  sf = (e) =>
    /* @__PURE__ */ v.jsx(df, {
      title: e.title,
      children: /* @__PURE__ */ v.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${e.className ?? ""} ${of.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  Bc = sf,
  af = bt(null),
  ts = {
    didCatch: !1,
    error: null,
  };
class cf extends Ld {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = ts);
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
        this.setState(ts);
    }
  }
  componentDidCatch(t, n) {
    var r, o;
    (r = (o = this.props).onError) === null || r === void 0 || r.call(o, t, n);
  }
  componentDidUpdate(t, n) {
    const { didCatch: r } = this.state,
      { resetKeys: o } = this.props;
    if (r && n.error !== null && lf(t.resetKeys, o)) {
      var s, i;
      (s = (i = this.props).onReset) === null ||
        s === void 0 ||
        s.call(i, {
          next: o,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(ts);
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
      else if (r) a = ea(r, l);
      else if (o === null || Pc(o)) a = o;
      else throw i;
    }
    return ea(
      af.Provider,
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
function lf() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, r) => !Object.is(n, t[r]));
}
const uf = (e) => {
    const [t, n] = he(!1),
      r = () => n(!t),
      o = se(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ v.jsxs(cf, {
      fallback: /* @__PURE__ */ v.jsx("span", {
        id: o.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ v.jsx("span", { id: o.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ v.jsx(Bd, {
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
  df = uf,
  ff = "_loadingBtn_gadec_1",
  hf = {
    loadingBtn: ff,
  },
  pf = ({ loading: e, ...t }) =>
    /* @__PURE__ */ v.jsx(dt, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${hf.loadingBtn}`,
      children: e ? /* @__PURE__ */ v.jsx(zd, {}) : t.children,
    }),
  gf = pf,
  mf = { vs: Qd, "vsc-dark-plus": ef, solarizedLight: Jd },
  yf = ({
    code: e,
    language: t,
    fileName: n,
    theme: r = "vs",
    showLineNumbers: o,
  }) =>
    /* @__PURE__ */ v.jsxs(To, {
      className: nf.codeblock,
      children: [
        n ? /* @__PURE__ */ v.jsx(Hc, { children: n }) : null,
        /* @__PURE__ */ v.jsx(Ao, {
          children: /* @__PURE__ */ v.jsx(Hd, {
            showLineNumbers: o,
            language: t,
            style: mf[r],
            children: e,
          }),
        }),
      ],
    }),
  vf = yf,
  Oe = {
    get: async (e, t, n) => ({}),
    post: async (e, t, n) => ({}),
  };
var ci = /* @__PURE__ */ ((e) => (
  (e.DBT_DOCS = "dbt-docs"),
  (e.DOCUMENTATION_EDITOR = "documentation-editor"),
  (e.SAAS = "saas"),
  e
))(ci || {});
const Ef = () => {
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
var zc = { exports: {} };
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
                  var y = d.Serialize.Restore.call(this, g, m) || [];
                  (g = y[0] || g), (m = y[1] || m);
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
              } catch (y) {
                p = { error: y };
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
                var y = m.value.querySelectorAll(
                  d + "[data-" + l.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, y);
              }
            } catch (_) {
              f = { error: _ };
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
              y = c.querySelectorAll(f + "[data-" + l.DATASET_IDENTIFIER + "]");
            try {
              for (var _ = s(y), x = _.next(); !x.done; x = _.next()) {
                var b = x.value;
                if (b.dataset[l.CAMEL_DATASET_IDENTIFIER] !== d) {
                  var C = b.dataset[l.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  m.test(C) && g.push(b);
                } else g.push(b);
              }
            } catch (A) {
              h = { error: A };
            } finally {
              try {
                x && !x.done && (p = _.return) && p.call(_);
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
            function h(p, g, m, y, _) {
              _ === void 0 && (_ = !1),
                (p.$node.nodeType === 3 && g.$node.nodeType === 3) ||
                  d.eventEmitter.emit(d.INTERNAL_ERROR_EVENT, {
                    type: a.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = c.formatDomNode(p)),
                (this.end = c.formatDomNode(g)),
                (this.text = m),
                (this.frozen = _),
                (this.id = y);
            }
            return (
              (h.fromSelection = function (p) {
                var g = l.getDomRange();
                if (!g) return null;
                var m = { $node: g.startContainer, offset: g.startOffset },
                  y = { $node: g.endContainer, offset: g.endOffset },
                  _ = g.toString(),
                  x = p.call(m, y, _);
                return new h(m, y, _, (x = x ?? u.default()));
              }),
              (h.prototype.serialize = function (p, g) {
                var m,
                  y = c.getDomMeta(this.start.$node, this.start.offset, p),
                  _ = c.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  g.Serialize.RecordInfo.isEmpty() ||
                    (m = g.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new i.default(y, _, this.text, this.id, m)
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
                  function (O, S) {
                    O.__proto__ = S;
                  }) ||
                function (O, S) {
                  for (var P in S)
                    Object.prototype.hasOwnProperty.call(S, P) && (O[P] = S[P]);
                })(C, A);
            }),
            function (C, A) {
              function O() {
                this.constructor = C;
              }
              s(C, A),
                (C.prototype =
                  A === null
                    ? Object.create(A)
                    : ((O.prototype = A.prototype), new O()));
            }),
          a =
            (this && this.__assign) ||
            function () {
              return (a =
                Object.assign ||
                function (C) {
                  for (var A, O = 1, S = arguments.length; O < S; O++)
                    for (var P in (A = arguments[O]))
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
          y = o(0),
          _ = o(1),
          x = o(4),
          b = (function (C) {
            function A(O) {
              var S = C.call(this) || this;
              (S.event = p.default()),
                (S.run = function () {
                  return x.addEventListener(
                    S.options.$root,
                    S.event.PointerEnd,
                    S._handleSelection,
                  );
                }),
                (S.stop = function () {
                  x.removeEventListener(
                    S.options.$root,
                    S.event.PointerEnd,
                    S._handleSelection,
                  );
                }),
                (S.addClass = function (L, j) {
                  S.getDoms(j).forEach(function (B) {
                    x.addClass(B, L);
                  });
                }),
                (S.removeClass = function (L, j) {
                  S.getDoms(j).forEach(function (B) {
                    x.removeClass(B, L);
                  });
                }),
                (S.getIdByDom = function (L) {
                  return x.getHighlightId(L, S.options.$root);
                }),
                (S.getExtraIdByDom = function (L) {
                  return x.getExtraHighlightId(L, S.options.$root);
                }),
                (S.getDoms = function (L) {
                  return L
                    ? x.getHighlightById(S.options.$root, L, S.options.wrapTag)
                    : x.getHighlightsByRoot(S.options.$root, S.options.wrapTag);
                }),
                (S.dispose = function () {
                  var L = S.options.$root;
                  x.removeEventListener(
                    L,
                    S.event.PointerOver,
                    S._handleHighlightHover,
                  ),
                    x.removeEventListener(
                      L,
                      S.event.PointerEnd,
                      S._handleSelection,
                    ),
                    x.removeEventListener(
                      L,
                      S.event.PointerTap,
                      S._handleHighlightClick,
                    ),
                    S.removeAll();
                }),
                (S.setOption = function (L) {
                  (S.options = a(a({}, S.options), L)),
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
                (S.fromRange = function (L) {
                  var j = { $node: L.startContainer, offset: L.startOffset },
                    B = { $node: L.endContainer, offset: L.endOffset },
                    H = L.toString(),
                    E = S.hooks.Render.UUID.call(j, B, H);
                  E = E ?? f.default();
                  var N = new c.default(j, B, H, E);
                  return N
                    ? S._highlightFromHRange(N)
                    : (y.eventEmitter.emit(y.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (S.fromStore = function (L, j, B, H, E) {
                  var N = new d.default(L, j, B, H, E);
                  try {
                    return S._highlightFromHSource(N), N;
                  } catch (w) {
                    return (
                      y.eventEmitter.emit(y.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.HIGHLIGHT_SOURCE_RECREATE,
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
                (S._highlightFromHRange = function (L) {
                  var j = L.serialize(S.options.$root, S.hooks);
                  return S.painter.highlightRange(L).length === 0
                    ? (y.eventEmitter.emit(y.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (S.cache.save(j),
                      S.emit(
                        _.EventType.CREATE,
                        { sources: [j], type: _.CreateFrom.INPUT },
                        S,
                      ),
                      j);
                }),
                (S._handleSelection = function () {
                  var L = c.default.fromSelection(S.hooks.Render.UUID);
                  L && (S._highlightFromHRange(L), c.default.removeDomRange());
                }),
                (S._handleHighlightHover = function (L) {
                  var j = L.target;
                  if (!x.isHighlightWrapNode(j))
                    return (
                      S._hoverId &&
                        S.emit(_.EventType.HOVER_OUT, { id: S._hoverId }, S, L),
                      void (S._hoverId = null)
                    );
                  var B = x.getHighlightId(j, S.options.$root);
                  S._hoverId !== B &&
                    (S._hoverId &&
                      S.emit(_.EventType.HOVER_OUT, { id: S._hoverId }, S, L),
                    (S._hoverId = B),
                    S.emit(_.EventType.HOVER, { id: S._hoverId }, S, L));
                }),
                (S._handleError = function (L) {
                  S.options.verbose && console.warn(L);
                }),
                (S._handleHighlightClick = function (L) {
                  var j = L.target;
                  if (x.isHighlightWrapNode(j)) {
                    var B = x.getHighlightId(j, S.options.$root);
                    S.emit(_.EventType.CLICK, { id: B }, S, L);
                  }
                }),
                (S.options = y.getDefaultOptions()),
                (S.hooks = S._getHooks()),
                S.setOption(O),
                (S.cache = new g.default());
              var P = S.options.$root;
              return (
                x.addEventListener(
                  P,
                  S.event.PointerOver,
                  S._handleHighlightHover,
                ),
                x.addEventListener(
                  P,
                  S.event.PointerTap,
                  S._handleHighlightClick,
                ),
                y.eventEmitter.on(y.INTERNAL_ERROR_EVENT, S._handleError),
                S
              );
            }
            return (
              i(A, C),
              (A.prototype.remove = function (O) {
                if (O) {
                  var S = this.painter.removeHighlight(O);
                  this.cache.remove(O),
                    S && this.emit(_.EventType.REMOVE, { ids: [O] }, this);
                }
              }),
              (A.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var O = this.cache.removeAll();
                this.emit(_.EventType.REMOVE, { ids: O }, this);
              }),
              (A.prototype._highlightFromHSource = function (O) {
                O === void 0 && (O = []);
                var S = this.painter.highlightSource(O);
                this.emit(
                  _.EventType.CREATE,
                  { sources: S, type: _.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(O);
              }),
              (A.event = _.EventType),
              (A.isHighlightWrapNode = x.isHighlightWrapNode),
              (A.isHighlightSource = function (O) {
                return !!O.__isHighlightSource;
              }),
              A
            );
          })(u.default);
        r.default = b;
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
                for (var y = g.childNodes, _ = y.length - 1; _ >= 0; _--)
                  p.push(y[_]);
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
                    var y = a(this._data), _ = y.next();
                    !_.done;
                    _ = y.next()
                  ) {
                    var x = _.value;
                    m.push(x[1]);
                  }
                } catch (b) {
                  p = { error: b };
                } finally {
                  try {
                    _ && !_.done && (g = y.return) && g.call(y);
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
                    var y = a(this._data), _ = y.next();
                    !_.done;
                    _ = y.next()
                  ) {
                    var x = _.value;
                    m.push(x[0]);
                  }
                } catch (b) {
                  p = { error: b };
                } finally {
                  try {
                    _ && !_.done && (g = y.return) && g.call(y);
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
              var y = typeof Symbol == "function" && Symbol.iterator,
                _ = y && m[y],
                x = 0;
              if (_) return _.call(m);
              if (m && typeof m.length == "number")
                return {
                  next: function () {
                    return (
                      m && x >= m.length && (m = void 0),
                      { value: m && m[x++], done: !m }
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
              var _ = typeof Symbol == "function" && m[Symbol.iterator];
              if (!_) return m;
              var x,
                b,
                C = _.call(m),
                A = [];
              try {
                for (; (y === void 0 || y-- > 0) && !(x = C.next()).done; )
                  A.push(x.value);
              } catch (O) {
                b = { error: O };
              } finally {
                try {
                  x && !x.done && (_ = C.return) && _.call(C);
                } finally {
                  if (b) throw b.error;
                }
              }
              return A;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var m = [], y = 0; y < arguments.length; y++)
                m = m.concat(i(arguments[y]));
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
            function m(y, _) {
              (this.options = {
                $root: y.$root,
                wrapTag: y.wrapTag,
                exceptSelectors: y.exceptSelectors,
                className: y.className,
              }),
                (this.hooks = _),
                h.initDefaultStylesheet();
            }
            return (
              (m.prototype.highlightRange = function (y) {
                var _ = this;
                if (!y.frozen) throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var x = this.options,
                  b = x.$root,
                  C = x.className,
                  A = x.exceptSelectors,
                  O = this.hooks,
                  S = c.getSelectedNodes(b, y.start, y.end, A);
                return (
                  O.Render.SelectedNodes.isEmpty() ||
                    (S = O.Render.SelectedNodes.call(y.id, S) || []),
                  S.map(function (P) {
                    var L = c.wrapHighlight(P, y, C, _.options.wrapTag);
                    return (
                      O.Render.WrapNode.isEmpty() ||
                        (L = O.Render.WrapNode.call(y.id, L)),
                      L
                    );
                  })
                );
              }),
              (m.prototype.highlightSource = function (y) {
                var _ = this,
                  x = Array.isArray(y) ? y : [y],
                  b = [];
                return (
                  x.forEach(function (C) {
                    if (C instanceof u.default) {
                      var A = C.deSerialize(_.options.$root, _.hooks);
                      _.highlightRange(A).length > 0
                        ? b.push(C)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: C,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: f.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  b
                );
              }),
              (m.prototype.removeHighlight = function (y) {
                var _,
                  x,
                  b = new RegExp(
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
                  C = this.hooks,
                  A = this.options.wrapTag,
                  O = document.querySelectorAll(
                    A + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  S = [],
                  P = [],
                  L = [];
                try {
                  for (var j = s(O), B = j.next(); !B.done; B = j.next()) {
                    var H = B.value,
                      E = H.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      N = H.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    E !== y || N
                      ? E === y
                        ? P.push(H)
                        : E !== y && b.test(N) && L.push(H)
                      : S.push(H);
                  }
                } catch (w) {
                  _ = { error: w };
                } finally {
                  try {
                    B && !B.done && (x = j.return) && x.call(j);
                  } finally {
                    if (_) throw _.error;
                  }
                }
                return (
                  S.forEach(function (w) {
                    var I = w.parentNode,
                      k = document.createDocumentFragment();
                    d.forEach(w.childNodes, function (R) {
                      return k.appendChild(R.cloneNode(!1));
                    });
                    var D = w.previousSibling,
                      T = w.nextSibling;
                    I.replaceChild(k, w),
                      c.normalizeSiblingText(D, !0),
                      c.normalizeSiblingText(T, !1),
                      C.Remove.UpdateNodes.call(y, w, "remove");
                  }),
                  P.forEach(function (w) {
                    var I = w.dataset,
                      k = I[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      D = k.shift(),
                      T = document.querySelector(
                        A + "[data-" + p.DATASET_IDENTIFIER + '="' + D + '"]',
                      );
                    T && (d.removeAllClass(w), d.addClass(w, a(T.classList))),
                      (I[p.CAMEL_DATASET_IDENTIFIER] = D),
                      (I[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = k.join(
                        p.ID_DIVISION,
                      )),
                      C.Remove.UpdateNodes.call(y, w, "id-update");
                  }),
                  L.forEach(function (w) {
                    var I = w.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (w.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = I.replace(
                      b,
                      "",
                    )),
                      C.Remove.UpdateNodes.call(y, w, "extra-update");
                  }),
                  S.length + P.length + L.length !== 0
                );
              }),
              (m.prototype.removeAllHighlight = function () {
                var y = this.options,
                  _ = y.wrapTag,
                  x = y.$root;
                d.getHighlightsByRoot(x, _).forEach(function (b) {
                  var C = b.parentNode,
                    A = document.createDocumentFragment();
                  d.forEach(b.childNodes, function (O) {
                    return A.appendChild(O.cloneNode(!1));
                  }),
                    C.replaceChild(A, b);
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
              var y,
                _,
                x = m.call(p),
                b = [];
              try {
                for (; (g === void 0 || g-- > 0) && !(y = x.next()).done; )
                  b.push(y.value);
              } catch (C) {
                _ = { error: C };
              } finally {
                try {
                  y && !y.done && (m = x.return) && m.call(x);
                } finally {
                  if (_) throw _.error;
                }
              }
              return b;
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
              var y = g.replace(/^#/, "");
              return p && p.id === y;
            }
            var _ = g.toUpperCase();
            return p && p.tagName === _;
          };
        r.getSelectedNodes = function (p, g, m, y) {
          var _ = g.$node,
            x = m.$node,
            b = g.offset,
            C = m.offset;
          if (_ === x && _ instanceof Text)
            return (function (E, N, w, I) {
              for (
                var k = E,
                  D = function (R) {
                    return I == null
                      ? void 0
                      : I.some(function (F) {
                          return d(R, F);
                        });
                  };
                k;

              ) {
                if (k.nodeType === 1 && D(k)) return [];
                k = k.parentNode;
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
            })(_, b, C, y);
          for (
            var A = [p],
              O = [],
              S = function (E) {
                return y == null
                  ? void 0
                  : y.some(function (N) {
                      return d(E, N);
                    });
              },
              P = !1,
              L = null;
            (L = A.pop());

          )
            if (L.nodeType !== 1 || !S(L)) {
              for (var j = L.childNodes, B = j.length - 1; B >= 0; B--)
                A.push(j[B]);
              if (L === _) {
                if (L.nodeType === 3) {
                  L.splitText(b);
                  var H = L.nextSibling;
                  O.push({
                    $node: H,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.head,
                  });
                }
                P = !0;
              } else {
                if (L === x) {
                  L.nodeType === 3 &&
                    ((H = L).splitText(C),
                    O.push({
                      $node: H,
                      type: a.SelectedNodeType.text,
                      splitType: a.SplitType.tail,
                    }));
                  break;
                }
                P &&
                  L.nodeType === 3 &&
                  O.push({
                    $node: L,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.none,
                  });
              }
            }
          return O;
        };
        var f = function (p, g) {
            var m = Array.isArray(g) ? g : [g];
            return (
              (m =
                m.length === 0
                  ? [u.getDefaultOptions().style.className]
                  : m).forEach(function (y) {
                l.addClass(p, y);
              }),
              p
            );
          },
          h = function (p) {
            return !p || !p.textContent;
          };
        (r.wrapHighlight = function (p, g, m, y) {
          var _ = p.$node.parentNode,
            x = p.$node.previousSibling,
            b = p.$node.nextSibling;
          return l.isHighlightWrapNode(_)
            ? !l.isHighlightWrapNode(_) || (h(x) && h(b))
              ? (function (C, A, O) {
                  var S = C.$node.parentNode,
                    P = S;
                  l.removeAllClass(P), f(P, O);
                  var L = S.dataset,
                    j = L[u.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (L[u.CAMEL_DATASET_IDENTIFIER] = A.id),
                    (L[u.CAMEL_DATASET_IDENTIFIER_EXTRA] = L[
                      u.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? j + u.ID_DIVISION + L[u.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : j),
                    P
                  );
                })(p, g, m)
              : (function (C, A, O, S) {
                  var P = document.createElement(S),
                    L = C.$node.parentNode,
                    j = C.$node.previousSibling,
                    B = C.$node.nextSibling,
                    H = document.createDocumentFragment(),
                    E = L.dataset[u.CAMEL_DATASET_IDENTIFIER],
                    N = L.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    w = N ? E + u.ID_DIVISION + N : E;
                  P.setAttribute("data-" + u.DATASET_IDENTIFIER, A.id),
                    P.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, w),
                    P.appendChild(C.$node.cloneNode(!1));
                  var I,
                    k = !1,
                    D = !1;
                  j &&
                    (((T = L.cloneNode(!1)).textContent = j.textContent),
                    H.appendChild(T),
                    (k = !0));
                  var T,
                    R = [];
                  return (
                    Array.isArray(O) ? R.push.apply(R, i(O)) : R.push(O),
                    f(P, c.unique(R)),
                    H.appendChild(P),
                    B &&
                      (((T = L.cloneNode(!1)).textContent = B.textContent),
                      H.appendChild(T),
                      (D = !0)),
                    (I =
                      k && D
                        ? a.SplitType.both
                        : k
                          ? a.SplitType.head
                          : D
                            ? a.SplitType.tail
                            : a.SplitType.none),
                    P.setAttribute("data-" + u.DATASET_SPLIT_TYPE, I),
                    L.parentNode.replaceChild(H, L),
                    P
                  );
                })(p, g, m, y)
            : (function (C, A, O, S) {
                var P = document.createElement(S);
                return (
                  f(P, O),
                  P.appendChild(C.$node.cloneNode(!1)),
                  C.$node.parentNode.replaceChild(P, C.$node),
                  P.setAttribute("data-" + u.DATASET_IDENTIFIER, A.id),
                  P.setAttribute("data-" + u.DATASET_SPLIT_TYPE, C.splitType),
                  P.setAttribute("data-" + u.DATASET_IDENTIFIER_EXTRA, ""),
                  P
                );
              })(p, g, m, y);
        }),
          (r.normalizeSiblingText = function (p, g) {
            if ((g === void 0 && (g = !0), p && p.nodeType === 3)) {
              var m = g ? p.nextSibling : p.previousSibling;
              if (m.nodeType === 3) {
                var y = m.nodeValue;
                (p.nodeValue = g ? p.nodeValue + y : y + p.nodeValue),
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
})(zc);
var Cf = zc.exports;
const Vc = /* @__PURE__ */ jn(Cf),
  Oo = "altimate-display-",
  bf = `${Oo}-highlight`,
  ra = `${Oo}-highlight-hover`,
  _f = `${Oo}-active-highlight`,
  xf = 1049,
  _n = new Vc({
    style: {
      className: bf,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  li = new Vc({
    style: {
      className: _f,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Wc = (e, t) =>
    t.filter((n) => {
      var r;
      return ((r = n.$node.nodeValue) == null ? void 0 : r.trim()) !== "";
    }),
  Uc = (e, t, n) => {
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
_n.hooks.Render.SelectedNodes.tap(Wc);
_n.hooks.Serialize.Restore.tap(Uc);
li.hooks.Render.SelectedNodes.tap(Wc);
li.hooks.Serialize.Restore.tap(Uc);
_n.on("selection:hover", ({ id: e }) => {
  _n.addClass(ra, e);
}).on("selection:hover-out", ({ id: e }) => {
  _n.removeClass(ra, e);
});
const wf = (e) => {
    var t, n;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((n = e.meta) == null ? void 0 : n.highlight)
      : null;
  },
  Sf = (e) => {
    const t = wf(e);
    t && (_n.remove(t.id), li.remove(t.id));
  },
  ui = () => {
    var n, r;
    const e = di(),
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
  di = () => {
    var t;
    return (t = window.location.hash
      .split("#")
      .find((n) => n.startsWith("!"))) == null
      ? void 0
      : t.split("/");
  },
  fi = () => document.querySelector('[marked="model.description"]'),
  Nf = (e) => {
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
        : (r = fi()) == null
          ? void 0
          : r.firstChild
      : ui();
  },
  Tf = (e) => {
    if (e.getAttribute("marked") === "model.description") return "description";
  },
  Af = (e, t, n, r, o) => {
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
  $5 = () => {
    var e;
    return [(e = ui()) == null ? void 0 : e.parentElement, fi()];
  };
var Qe = /* @__PURE__ */ ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.UNINITIALIZED = 1)] = "UNINITIALIZED"),
  (e[(e.INITIALIZED = 2)] = "INITIALIZED"),
  e
))(Qe || {});
function Df(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Of(e) {
  return Df(e) && "type" in e && typeof e.type == "string";
}
var Yc = Symbol.for("immer-nothing"),
  oa = Symbol.for("immer-draftable"),
  Ze = Symbol.for("immer-state"),
  If =
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
    const n = If[e],
      r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Dn = Object.getPrototypeOf;
function Kt(e) {
  return !!e && !!e[Ze];
}
function Rt(e) {
  var t;
  return e
    ? qc(e) ||
        Array.isArray(e) ||
        !!e[oa] ||
        !!((t = e.constructor) != null && t[oa]) ||
        Ro(e) ||
        Mo(e)
    : !1;
}
var Rf = Object.prototype.constructor.toString();
function qc(e) {
  if (!e || typeof e != "object") return !1;
  const t = Dn(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === Rf;
}
function eo(e, t) {
  Io(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function Io(e) {
  const t = e[Ze];
  return t ? t.type_ : Array.isArray(e) ? 1 : Ro(e) ? 2 : Mo(e) ? 3 : 0;
}
function As(e, t) {
  return Io(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Zc(e, t, n) {
  const r = Io(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function Mf(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Ro(e) {
  return e instanceof Map;
}
function Mo(e) {
  return e instanceof Set;
}
function tn(e) {
  return e.copy_ || e.base_;
}
function Ds(e, t) {
  if (Ro(e)) return new Map(e);
  if (Mo(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && qc(e))
    return Dn(e)
      ? { ...e }
      : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[Ze];
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
  return Object.create(Dn(e), n);
}
function hi(e, t = !1) {
  return (
    ko(e) ||
      Kt(e) ||
      !Rt(e) ||
      (Io(e) > 1 && (e.set = e.add = e.clear = e.delete = kf),
      Object.freeze(e),
      t && Object.entries(e).forEach(([n, r]) => hi(r, !0))),
    e
  );
}
function kf() {
  We(2);
}
function ko(e) {
  return Object.isFrozen(e);
}
var Lf = {};
function ln(e) {
  const t = Lf[e];
  return t || We(0, e), t;
}
var tr;
function Xc() {
  return tr;
}
function Pf(e, t) {
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
function sa(e, t) {
  t &&
    (ln("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function Os(e) {
  Is(e), e.drafts_.forEach(jf), (e.drafts_ = null);
}
function Is(e) {
  e === tr && (tr = e.parent_);
}
function ia(e) {
  return (tr = Pf(tr, e));
}
function jf(e) {
  const t = e[Ze];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function aa(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[Ze].modified_ && (Os(t), We(4)),
        Rt(e) && ((e = to(t, e)), t.parent_ || no(t, e)),
        t.patches_ &&
          ln("Patches").generateReplacementPatches_(
            n[Ze].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = to(t, n, [])),
    Os(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Yc ? e : void 0
  );
}
function to(e, t, n) {
  if (ko(t)) return t;
  const r = t[Ze];
  if (!r) return eo(t, (o, s) => ca(e, r, t, o, s, n)), t;
  if (r.scope_ !== e) return t;
  if (!r.modified_) return no(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    (r.finalized_ = !0), r.scope_.unfinalizedDrafts_--;
    const o = r.copy_;
    let s = o,
      i = !1;
    r.type_ === 3 && ((s = new Set(o)), o.clear(), (i = !0)),
      eo(s, (a, l) => ca(e, r, o, a, l, n, i)),
      no(e, o, !1),
      n &&
        e.patches_ &&
        ln("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_);
  }
  return r.copy_;
}
function ca(e, t, n, r, o, s, i) {
  if ((process.env.NODE_ENV !== "production" && o === n && We(5), Kt(o))) {
    const a =
        s &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !As(t.assigned_, r)
          ? s.concat(r)
          : void 0,
      l = to(e, o, a);
    if ((Zc(n, r, l), Kt(l))) e.canAutoFreeze_ = !1;
    else return;
  } else i && n.add(o);
  if (Rt(o) && !ko(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    to(e, o),
      (!t || !t.scope_.parent_) &&
        typeof r != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(n, r) &&
        no(e, o);
  }
}
function no(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && hi(t, n);
}
function $f(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : Xc(),
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
    s = pi;
  n && ((o = [r]), (s = nr));
  const { revoke: i, proxy: a } = Proxy.revocable(o, s);
  return (r.draft_ = a), (r.revoke_ = i), a;
}
var pi = {
    get(e, t) {
      if (t === Ze) return e;
      const n = tn(e);
      if (!As(n, t)) return Ff(e, n, t);
      const r = n[t];
      return e.finalized_ || !Rt(r)
        ? r
        : r === ns(e.base_, t)
          ? (rs(e), (e.copy_[t] = Ms(r, e)))
          : r;
    },
    has(e, t) {
      return t in tn(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(tn(e));
    },
    set(e, t, n) {
      const r = Kc(tn(e), t);
      if (r != null && r.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const o = ns(tn(e), t),
          s = o == null ? void 0 : o[Ze];
        if (s && s.base_ === n)
          return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (Mf(n, o) && (n !== void 0 || As(e.base_, t))) return !0;
        rs(e), Rs(e);
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
        ns(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), rs(e), Rs(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(e, t) {
      const n = tn(e),
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
      return Dn(e.base_);
    },
    setPrototypeOf() {
      We(12);
    },
  },
  nr = {};
eo(pi, (e, t) => {
  nr[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
nr.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && We(13),
    nr.set.call(this, e, t, void 0)
  );
};
nr.set = function (e, t, n) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      We(14),
    pi.set.call(this, e[0], t, n, e[0])
  );
};
function ns(e, t) {
  const n = e[Ze];
  return (n ? tn(n) : e)[t];
}
function Ff(e, t, n) {
  var o;
  const r = Kc(t, n);
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
function Kc(e, t) {
  if (!(t in e)) return;
  let n = Dn(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = Dn(n);
  }
}
function Rs(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && Rs(e.parent_));
}
function rs(e) {
  e.copy_ || (e.copy_ = Ds(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var Hf = class {
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
        if (Rt(t)) {
          const s = ia(this),
            i = Ms(t, void 0);
          let a = !0;
          try {
            (o = n(i)), (a = !1);
          } finally {
            a ? Os(s) : Is(s);
          }
          return sa(s, r), aa(o, s);
        } else if (!t || typeof t != "object") {
          if (
            ((o = n(t)),
            o === void 0 && (o = t),
            o === Yc && (o = void 0),
            this.autoFreeze_ && hi(o, !0),
            r)
          ) {
            const s = [],
              i = [];
            ln("Patches").generateReplacementPatches_(t, o, s, i), r(s, i);
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
    Rt(e) || We(8), Kt(e) && (e = Gc(e));
    const t = ia(this),
      n = Ms(e, void 0);
    return (n[Ze].isManual_ = !0), Is(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[Ze];
    (!n || !n.isManual_) && We(9);
    const { scope_: r } = n;
    return sa(r, t), aa(void 0, r);
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
    const r = ln("Patches").applyPatches_;
    return Kt(e) ? r(e, t) : this.produce(e, (o) => r(o, t));
  }
};
function Ms(e, t) {
  const n = Ro(e)
    ? ln("MapSet").proxyMap_(e, t)
    : Mo(e)
      ? ln("MapSet").proxySet_(e, t)
      : $f(e, t);
  return (t ? t.scope_ : Xc()).drafts_.push(n), n;
}
function Gc(e) {
  return Kt(e) || We(10, e), Jc(e);
}
function Jc(e) {
  if (!Rt(e) || ko(e)) return e;
  const t = e[Ze];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (n = Ds(e, t.scope_.immer_.useStrictShallowCopy_));
  } else n = Ds(e, !0);
  return (
    eo(n, (r, o) => {
      Zc(n, r, Jc(o));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var Xe = new Hf(),
  Qc = Xe.produce;
Xe.produceWithPatches.bind(Xe);
Xe.setAutoFreeze.bind(Xe);
Xe.setUseStrictShallowCopy.bind(Xe);
Xe.applyPatches.bind(Xe);
Xe.createDraft.bind(Xe);
Xe.finishDraft.bind(Xe);
var Bf = (e, t, n) => {
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
  zf = (e, t, n) => {
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
  Vf = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function Wf(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function Uf(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function Yf(
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
var la = (e) => (Array.isArray(e) ? e : [e]);
function qf(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    Yf(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function ua(e, t) {
  const n = [],
    { length: r } = e;
  for (let o = 0; o < r; o++) n.push(e[o].apply(null, t));
  return n;
}
var Zf = (e, t) => {
    const { identityFunctionCheck: n, inputStabilityCheck: r } = {
      ...Vf,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: Bf,
      },
      inputStabilityCheck: {
        shouldRun: r === "always" || (r === "once" && e),
        run: zf,
      },
    };
  },
  Xf = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Kf = typeof WeakRef < "u" ? WeakRef : Xf,
  Gf = 0,
  da = 1;
function Tr() {
  return {
    s: Gf,
    v: void 0,
    o: null,
    p: null,
  };
}
function gi(e, t = {}) {
  let n = Tr();
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
        m === void 0 ? ((a = Tr()), g.set(p, a)) : (a = m);
      } else {
        let g = a.p;
        g === null && (a.p = g = /* @__PURE__ */ new Map());
        const m = g.get(p);
        m === void 0 ? ((a = Tr()), g.set(p, a)) : (a = m);
      }
    }
    const u = a;
    let c;
    if (
      (a.s === da ? (c = a.v) : ((c = e.apply(null, arguments)), s++),
      (u.s = da),
      r)
    ) {
      const f =
        ((d = o == null ? void 0 : o.deref) == null ? void 0 : d.call(o)) ?? o;
      f != null && r(f, c) && ((c = f), s !== 0 && s--),
        (o =
          (typeof c == "object" && c !== null) || typeof c == "function"
            ? new Kf(c)
            : c);
    }
    return (u.v = c), c;
  }
  return (
    (i.clearCache = () => {
      (n = Tr()), i.resetResultsCount();
    }),
    (i.resultsCount = () => s),
    (i.resetResultsCount = () => {
      s = 0;
    }),
    i
  );
}
function el(e, ...t) {
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
        Wf(
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
          argsMemoize: h = gi,
          argsMemoizeOptions: p = [],
          devModeChecks: g = {},
        } = c,
        m = la(f),
        y = la(p),
        _ = qf(o),
        x = d(
          function () {
            return s++, u.apply(null, arguments);
          },
          ...m,
        );
      let b = !0;
      const C = h(
        function () {
          i++;
          const O = ua(_, arguments);
          if (((a = x.apply(null, O)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: S, inputStabilityCheck: P } = Zf(
              b,
              g,
            );
            if ((S.shouldRun && S.run(u, O, a), P.shouldRun)) {
              const L = ua(_, arguments);
              P.run(
                { inputSelectorResults: O, inputSelectorResultsCopy: L },
                { memoize: d, memoizeOptions: m },
                arguments,
              );
            }
            b && (b = !1);
          }
          return a;
        },
        ...y,
      );
      return Object.assign(C, {
        resultFunc: u,
        memoizedResultFunc: x,
        dependencies: _,
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
var Jf = /* @__PURE__ */ el(gi),
  Qf = Object.assign(
    (e, t = Jf) => {
      Uf(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const n = Object.keys(e),
        r = n.map((s) => e[s]);
      return t(r, (...s) => s.reduce((i, a, l) => ((i[n[l]] = a), i), {}));
    },
    { withTypes: () => Qf },
  ),
  e1 = (...e) => {
    const t = el(...e),
      n = Object.assign(
        (...r) => {
          const o = t(...r),
            s = (i, ...a) => o(Kt(i) ? Gc(i) : i, ...a);
          return Object.assign(s, o), s;
        },
        {
          withTypes: () => n,
        },
      );
    return n;
  };
e1(gi);
function On(e, t) {
  function n(...r) {
    if (t) {
      let o = t(...r);
      if (!o)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Ae(0)
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
    (n.match = (r) => Of(r) && r.type === e),
    n
  );
}
function fa(e) {
  return Rt(e) ? Qc(e, () => {}) : e;
}
function ha(e, t, n) {
  if (e.has(t)) {
    let o = e.get(t);
    return n.update && ((o = n.update(o, t, e)), e.set(t, o)), o;
  }
  if (!n.insert)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? Ae(10)
        : "No insert provided for key not already in map",
    );
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
process.env.NODE_ENV;
function tl(e) {
  const t = {},
    n = [];
  let r;
  const o = {
    addCase(s, i) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? Ae(26)
              : "`builder.addCase` should only be called before calling `builder.addMatcher`",
          );
        if (r)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? Ae(27)
              : "`builder.addCase` should only be called before calling `builder.addDefaultCase`",
          );
      }
      const a = typeof s == "string" ? s : s.type;
      if (!a)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Ae(28)
            : "`builder.addCase` cannot be called with an empty action type",
        );
      if (a in t)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Ae(29)
            : `\`builder.addCase\` cannot be called with two reducers for the same action type '${a}'`,
        );
      return (t[a] = i), o;
    },
    addMatcher(s, i) {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Ae(30)
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
            ? Ae(31)
            : "`builder.addDefaultCase` can only be called once",
        );
      return (r = s), o;
    },
  };
  return e(o), [t, n, r];
}
function t1(e) {
  return typeof e == "function";
}
function n1(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? Ae(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [n, r, o] = tl(t),
    s;
  if (t1(e)) s = () => fa(e());
  else {
    const a = fa(e);
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
          if (Kt(c)) {
            const h = d(c, l);
            return h === void 0 ? c : h;
          } else {
            if (Rt(c)) return Qc(c, (f) => d(f, l));
            {
              const f = d(c, l);
              if (f === void 0) {
                if (c === null) return c;
                throw new Error(
                  process.env.NODE_ENV === "production"
                    ? Ae(9)
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
var r1 = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  o1 = (e = 21) => {
    let t = "",
      n = e;
    for (; n--; ) t += r1[(Math.random() * 64) | 0];
    return t;
  },
  s1 = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function i1(e, t) {
  return `${e}/${t}`;
}
function a1({ creators: e } = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[s1];
  return function (o) {
    const { name: s, reducerPath: i = s } = o;
    if (!s)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Ae(11)
          : "`name` is a required option for createSlice",
      );
    typeof process < "u" &&
      process.env.NODE_ENV === "development" &&
      o.initialState === void 0 &&
      console.error(
        "You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`",
      );
    const a =
        (typeof o.reducers == "function" ? o.reducers(l1()) : o.reducers) || {},
      l = Object.keys(a),
      u = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      c = {
        addCase(x, b) {
          const C = typeof x == "string" ? x : x.type;
          if (!C)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? Ae(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (C in u.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? Ae(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  C,
            );
          return (u.sliceCaseReducersByType[C] = b), c;
        },
        addMatcher(x, b) {
          return (
            u.sliceMatchers.push({
              matcher: x,
              reducer: b,
            }),
            c
          );
        },
        exposeAction(x, b) {
          return (u.actionCreators[x] = b), c;
        },
        exposeCaseReducer(x, b) {
          return (u.sliceCaseReducersByName[x] = b), c;
        },
      };
    l.forEach((x) => {
      const b = a[x],
        C = {
          reducerName: x,
          type: i1(s, x),
          createNotation: typeof o.reducers == "function",
        };
      d1(b) ? h1(C, b, c, t) : u1(C, b, c);
    });
    function d() {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof o.extraReducers == "object"
      )
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Ae(14)
            : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
        );
      const [x = {}, b = [], C = void 0] =
          typeof o.extraReducers == "function"
            ? tl(o.extraReducers)
            : [o.extraReducers],
        A = {
          ...x,
          ...u.sliceCaseReducersByType,
        };
      return n1(o.initialState, (O) => {
        for (let S in A) O.addCase(S, A[S]);
        for (let S of u.sliceMatchers) O.addMatcher(S.matcher, S.reducer);
        for (let S of b) O.addMatcher(S.matcher, S.reducer);
        C && O.addDefaultCase(C);
      });
    }
    const f = (x) => x,
      h = /* @__PURE__ */ new Map();
    let p;
    function g(x, b) {
      return p || (p = d()), p(x, b);
    }
    function m() {
      return p || (p = d()), p.getInitialState();
    }
    function y(x, b = !1) {
      function C(O) {
        let S = O[x];
        if (typeof S > "u") {
          if (b) S = m();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? Ae(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return S;
      }
      function A(O = f) {
        const S = ha(h, b, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return ha(S, O, {
          insert: () => {
            const P = {};
            for (const [L, j] of Object.entries(o.selectors ?? {}))
              P[L] = c1(j, O, m, b);
            return P;
          },
        });
      }
      return {
        reducerPath: x,
        getSelectors: A,
        get selectors() {
          return A(C);
        },
        selectSlice: C,
      };
    }
    const _ = {
      name: s,
      reducer: g,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...y(i),
      injectInto(x, { reducerPath: b, ...C } = {}) {
        const A = b ?? i;
        return (
          x.inject(
            {
              reducerPath: A,
              reducer: g,
            },
            C,
          ),
          {
            ..._,
            ...y(A, !0),
          }
        );
      },
    };
    return _;
  };
}
function c1(e, t, n, r) {
  function o(s, ...i) {
    let a = t(s);
    if (typeof a > "u") {
      if (r) a = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(
          process.env.NODE_ENV === "production"
            ? Ae(16)
            : "selectState returned undefined for an uninjected slice reducer",
        );
    }
    return e(a, ...i);
  }
  return (o.unwrapped = e), o;
}
var nl = /* @__PURE__ */ a1();
function l1() {
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
function u1({ type: e, reducerName: t, createNotation: n }, r, o) {
  let s, i;
  if ("reducer" in r) {
    if (n && !f1(r))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Ae(17)
          : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.",
      );
    (s = r.reducer), (i = r.prepare);
  } else s = r;
  o.addCase(e, s)
    .exposeCaseReducer(t, s)
    .exposeAction(t, i ? On(e, i) : On(e));
}
function d1(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function f1(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function h1({ type: e, reducerName: t }, n, r, o) {
  if (!o)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? Ae(18)
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
      fulfilled: i || Ar,
      pending: a || Ar,
      rejected: l || Ar,
      settled: u || Ar,
    });
}
function Ar() {}
var p1 = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Ae(32)
          : `${t} is not a function`,
      );
  },
  mi = "listenerMiddleware",
  g1 = (e) => {
    let { type: t, actionCreator: n, matcher: r, predicate: o, effect: s } = e;
    if (t) o = On(t).match;
    else if (n) (t = n.type), (o = n.match);
    else if (r) o = r;
    else if (!o)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? Ae(21)
          : "Creating or removing a listener requires one of the known fields for matching an action",
      );
    return (
      p1(s, "options.listener"),
      {
        predicate: o,
        type: t,
        effect: s,
      }
    );
  },
  m1 = Object.assign(
    (e) => {
      const { type: t, predicate: n, effect: r } = g1(e);
      return {
        id: o1(),
        effect: r,
        type: t,
        predicate: n,
        pending: /* @__PURE__ */ new Set(),
        unsubscribe: () => {
          throw new Error(
            process.env.NODE_ENV === "production"
              ? Ae(22)
              : "Unsubscribe not initialized",
          );
        },
      };
    },
    {
      withTypes: () => m1,
    },
  ),
  y1 = Object.assign(On(`${mi}/add`), {
    withTypes: () => y1,
  });
On(`${mi}/removeAll`);
var v1 = Object.assign(On(`${mi}/remove`), {
  withTypes: () => v1,
});
function Ae(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const E1 = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    conversationsLoadingState: Qe.UNINITIALIZED,
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: Ef(),
    codeblockLoaded: !1,
    source: ci.DBT_DOCS,
    manifest: {},
  },
  ro = nl({
    name: "appState",
    initialState: E1,
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
        e.conversationsLoadingState = Qe.UNINITIALIZED;
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
        const r = di();
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
    setCurrentUserId: F5,
    setShareId: H5,
    updateSelectedConversationId: yi,
    updateRightPanelState: vi,
    setUsers: C1,
    setConversations: b1,
    resetNewConversation: Ei,
    updateNewConversation: Ci,
    upsertConversation: B5,
    setDocsAppRendered: z5,
    updateCurrentPage: V5,
    updateCodeblockLoaded: W5,
    resolveConversationGroup: _1,
    setConversationsLoadingState: pa,
    refetchConversations: rl,
    setConversationSource: U5,
    setManifest: x1,
  } = ro.actions,
  Lo = bt({
    state: ro.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  w1 = ({
    children: e,
    shareId: t,
    userId: n,
    conversationGroupId: r,
    source: o,
  }) => {
    const [s, i] = jc(ro.reducer, {
        ...ro.getInitialState(),
        shareId: t,
        currentUserId: n,
        selectedConversationId: r,
        isRightPanelOpen: !!r,
        source: o,
      }),
      a = ge((u) => u(s), [s]),
      l = De(
        () => ({
          state: s,
          dispatch: i,
          getValue: a,
        }),
        [s, i, a],
      );
    return /* @__PURE__ */ v.jsx(Lo.Provider, { value: l, children: e });
  },
  S1 = w1,
  N1 = () => Ge(Lo),
  be = (e) => {
    const { getValue: t } = Ge(Lo);
    return t(e);
  },
  rt = () => {
    const { dispatch: e } = Ge(Lo);
    return e;
  },
  T1 = bt({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  A1 = bt(null),
  D1 = typeof document < "u",
  ol = D1 ? Pd : ie;
class ga {
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
function O1(e) {
  let t = new ga(),
    n = new ga(),
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
const Dr = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
    // Compute
  ],
  I1 = 40;
function R1(e, t) {
  let n = !1,
    r = !0;
  const o = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    s = Dr.reduce((d, f) => ((d[f] = O1(() => (n = !0))), d), {}),
    i = (d) => {
      s[d].process(o);
    },
    a = () => {
      const d = performance.now();
      (n = !1),
        (o.delta = r ? 1e3 / 60 : Math.max(Math.min(d - o.timestamp, I1), 1)),
        (o.timestamp = d),
        (o.isProcessing = !0),
        Dr.forEach(i),
        (o.isProcessing = !1),
        n && t && ((r = !1), e(a));
    },
    l = () => {
      (n = !0), (r = !0), o.isProcessing || e(a);
    };
  return {
    schedule: Dr.reduce((d, f) => {
      const h = s[f];
      return (d[f] = (p, g = !1, m = !1) => (n || l(), h.schedule(p, g, m))), d;
    }, {}),
    cancel: (d) => Dr.forEach((f) => s[f].cancel(d)),
    state: o,
    steps: s,
  };
}
const M1 = bt({});
function k1(e) {
  const t = se(null);
  return t.current === null && (t.current = e()), t.current;
}
const L1 = (e) => e,
  {
    schedule: P1,
    cancel: Y5,
    state: q5,
    steps: Z5,
  } = R1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : L1, !0);
function sl() {
  const e = se(!1);
  return (
    ol(
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
function j1() {
  const e = sl(),
    [t, n] = he(0),
    r = ge(() => {
      e.current && n(t + 1);
    }, [t]);
  return [ge(() => P1.postRender(r), [r]), t];
}
class $1 extends z.Component {
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
function F1({ children: e, isPresent: t }) {
  const n = $c(),
    r = se(null),
    o = se({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: s } = Ge(T1);
  return (
    jd(() => {
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
    z.createElement(
      $1,
      { isPresent: t, childRef: r, sizeRef: o },
      z.cloneElement(e, { ref: r }),
    )
  );
}
const os = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: o,
  presenceAffectsLayout: s,
  mode: i,
}) => {
  const a = k1(H1),
    l = $c(),
    u = De(
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
    De(() => {
      a.forEach((c, d) => a.set(d, !1));
    }, [n]),
    z.useEffect(() => {
      !n && !a.size && r && r();
    }, [n]),
    i === "popLayout" && (e = z.createElement(F1, { isPresent: n }, e)),
    z.createElement(A1.Provider, { value: u }, e)
  );
};
function H1() {
  return /* @__PURE__ */ new Map();
}
function B1(e) {
  return ie(() => () => e(), []);
}
const nn = (e) => e.key || "";
function z1(e, t) {
  e.forEach((n) => {
    const r = nn(n);
    t.set(r, n);
  });
}
function V1(e) {
  const t = [];
  return (
    An.forEach(e, (n) => {
      Pc(n) && t.push(n);
    }),
    t
  );
}
const W1 = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    exitBeforeEnter: o,
    presenceAffectsLayout: s = !0,
    mode: i = "sync",
  }) => {
    const a = Ge(M1).forceRender || j1()[0],
      l = sl(),
      u = V1(e);
    let c = u;
    const d = se(/* @__PURE__ */ new Map()).current,
      f = se(c),
      h = se(/* @__PURE__ */ new Map()).current,
      p = se(!0);
    if (
      (ol(() => {
        (p.current = !1), z1(u, h), (f.current = c);
      }),
      B1(() => {
        (p.current = !0), h.clear(), d.clear();
      }),
      p.current)
    )
      return z.createElement(
        z.Fragment,
        null,
        c.map((_) =>
          z.createElement(
            os,
            {
              key: nn(_),
              isPresent: !0,
              initial: n ? void 0 : !1,
              presenceAffectsLayout: s,
              mode: i,
            },
            _,
          ),
        ),
      );
    c = [...c];
    const g = f.current.map(nn),
      m = u.map(nn),
      y = g.length;
    for (let _ = 0; _ < y; _++) {
      const x = g[_];
      m.indexOf(x) === -1 && !d.has(x) && d.set(x, void 0);
    }
    return (
      i === "wait" && d.size && (c = []),
      d.forEach((_, x) => {
        if (m.indexOf(x) !== -1) return;
        const b = h.get(x);
        if (!b) return;
        const C = g.indexOf(x);
        let A = _;
        if (!A) {
          const O = () => {
            d.delete(x);
            const S = Array.from(h.keys()).filter((P) => !m.includes(P));
            if (
              (S.forEach((P) => h.delete(P)),
              (f.current = u.filter((P) => {
                const L = nn(P);
                return (
                  // filter out the node exiting
                  L === x || // filter out the leftover children
                  S.includes(L)
                );
              })),
              !d.size)
            ) {
              if (l.current === !1) return;
              a(), r && r();
            }
          };
          (A = z.createElement(
            os,
            {
              key: nn(b),
              isPresent: !1,
              onExitComplete: O,
              custom: t,
              presenceAffectsLayout: s,
              mode: i,
            },
            b,
          )),
            d.set(x, A);
        }
        c.splice(C, 0, A);
      }),
      (c = c.map((_) => {
        const x = _.key;
        return d.has(x)
          ? _
          : z.createElement(
              os,
              { key: nn(_), isPresent: !0, presenceAffectsLayout: s, mode: i },
              _,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        i === "wait" &&
        c.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      z.createElement(z.Fragment, null, d.size ? c : c.map((_) => $d(_)))
    );
  },
  Po = ({ icon: e, className: t = "", ...n }) =>
    /* @__PURE__ */ v.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...n,
    }),
  il = (e) => /* @__PURE__ */ v.jsx(Po, { icon: "add", ...e }),
  U1 = (e) => /* @__PURE__ */ v.jsx(Po, { icon: "comment-unresolved", ...e }),
  Y1 = (e) => /* @__PURE__ */ v.jsx(Po, { icon: "check", ...e }),
  q1 = (e) => /* @__PURE__ */ v.jsx(Po, { icon: "send", ...e }),
  Z1 = ({ pos: e, onAddComment: t }) =>
    Do(
      /* @__PURE__ */ v.jsx(W1, {
        children:
          e &&
          /* @__PURE__ */ v.jsx(dt, {
            onClick: t,
            id: `${Oo}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: xf + 5,
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
            children: /* @__PURE__ */ v.jsx(il, {}),
          }),
      }),
      e.element.parentElement,
    ),
  X1 = Z1,
  K1 = () => {
    const {
        state: { isRightPanelOpen: e },
      } = N1(),
      t = rt(),
      n = () => {
        t(vi(!e));
      };
    return /* @__PURE__ */ v.jsx(dt, {
      onClick: n,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  G1 = K1,
  J1 = (e) => Oe.get(`dbt/dbt_docs_share/${e}`),
  Q1 = (e, t, n) =>
    Oe.post(`dbt/dbt_docs_share/${e}/conversation_group`, {
      ...t,
      telemetry: {
        eventName: "dbtCollaboration:create",
        properties: { source: n },
      },
    }),
  e0 = (e, t, n, r) =>
    Oe.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, {
      ...n,
      telemetry: {
        eventName: "dbtCollaboration:reply",
        properties: { source: r },
      },
    }),
  t0 = (e) => Oe.get(`dbt/dbt_docs_share/${e}/conversations`),
  n0 = (e) => Oe.get("users/chat", { company: e }),
  r0 = (e, t, n) =>
    Oe.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
      telemetry: {
        eventName: "dbtCollaboration:resolve",
        properties: { source: n },
      },
    }),
  o0 = () => {
    const e = be((a) => a.shareId),
      [t, n] = he(null),
      [r, o] = he(!1),
      s = rt();
    ie(() => {
      t != null &&
        t.manifest_presigned_url &&
        fetch(t.manifest_presigned_url)
          .then((a) => a.json())
          .then((a) => {
            s(x1(a));
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
      const a = await J1(e);
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
  s0 = () => {
    const e = be((c) =>
        c.selectedConversationId
          ? c.conversations[c.selectedConversationId]
          : null,
      ),
      t = be((c) => c.docsAppRendered),
      n = be((c) => c.newConversation),
      r = rt(),
      [o, s] = he(null),
      [i, a] = he(null);
    ie(() => {
      n && (s(null), a(null));
    }, [n]);
    const l = ge(() => {
      console.log("resetHighlights"), o && Sf(o), a(null), s(null);
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
            f = Tf(d),
            { end: h, start: p } = c.detail.selectionRange,
            g = document.getSelection();
          if (!g || !g.rangeCount) return l(), null;
          const y = g.getRangeAt(0).toString(),
            _ = d == null ? void 0 : d.innerText;
          if (!y || !_) return;
          const { end: x, start: b, x: C, y: A } = Af(f, d, y, h, p);
          console.log("selection range", x, b, C, A);
          const O = {
            meta: {
              filePath: "",
              field: f,
              highlight: y,
              range: {
                end: { line: x, character: 0 },
                start: { line: b, character: 0 },
              },
            },
          };
          r(Ei()),
            a({
              x: C,
              y: A,
              element: d,
            }),
            document.body.addEventListener("click", l, { once: !0 }),
            s(O);
        },
      }
    );
  },
  i0 = ({ conversationGroup: e }) => {
    const t = be((a) => a.selectedConversationId),
      n = rt(),
      r = se(null),
      o = De(() => Nf(e.meta), [e.meta]),
      s = () => {
        n(yi(e.conversation_group_id));
      },
      i = De(() => {
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
        : Do(
            /* @__PURE__ */ v.jsx("div", {
              ref: r,
              className: `altimate-highlighter ${t === e.conversation_group_id ? "active" : ""}`,
              style: { top: i.top, height: i.bottom - i.top },
              onClick: s,
              children: /* @__PURE__ */ v.jsx(U1, {}),
            }),
            o.parentElement,
          )
    );
  },
  a0 = i0,
  c0 = () => {
    const e = be((o) => Object.values(o.conversations || {})),
      t = be((o) => o.codeblockLoaded),
      n = be((o) => o.currentPage),
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
      : /* @__PURE__ */ v.jsx(v.Fragment, {
          children: r.map((o) =>
            /* @__PURE__ */ v.jsx(
              a0,
              {
                conversationGroup: o,
              },
              o.conversation_group_id,
            ),
          ),
        });
  },
  l0 = c0,
  u0 = "_dbtDocs_14zop_9",
  d0 = "_hotspotButton_14zop_46",
  f0 = "_pulse_14zop_1",
  h0 = "_conversationRightPanelCloseButton_14zop_62",
  p0 = "_conversationRightPanel_14zop_62",
  g0 = "_newConversationForm_14zop_94",
  m0 = "_highlightText_14zop_108",
  y0 = "_conversationInputForm_14zop_130",
  v0 = "_conversationGroup_14zop_156",
  E0 = "_replyForm_14zop_189",
  C0 = "_resolveButton_14zop_237",
  Mt = {
    dbtDocs: u0,
    hotspotButton: d0,
    pulse: f0,
    conversationRightPanelCloseButton: h0,
    conversationRightPanel: p0,
    newConversationForm: g0,
    highlightText: m0,
    conversationInputForm: y0,
    conversationGroup: v0,
    replyForm: E0,
    resolveButton: C0,
  },
  b0 = "_profileImage_11vaf_1",
  _0 = {
    profileImage: b0,
  },
  x0 = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ v.jsx("div", {
      className: _0.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  al = x0;
function w0(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function S0(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function N0() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function oo(e) {
  return w0(e) || S0(e) || N0();
}
function nt() {
  return (
    (nt =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }),
    nt.apply(this, arguments)
  );
}
function T0(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ma(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function A0(e, t, n) {
  return t && ma(e.prototype, t), n && ma(e, n), e;
}
function ue(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function ks(e, t) {
  return (
    (ks =
      Object.setPrototypeOf ||
      function (r, o) {
        return (r.__proto__ = o), r;
      }),
    ks(e, t)
  );
}
function D0(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && ks(e, t);
}
function xn(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (xn = function (n) {
          return typeof n;
        })
      : (xn = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : typeof n;
        }),
    xn(e)
  );
}
function Yr(e) {
  return (
    typeof Symbol == "function" && xn(Symbol.iterator) === "symbol"
      ? (Yr = function (n) {
          return xn(n);
        })
      : (Yr = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : xn(n);
        }),
    Yr(e)
  );
}
function O0(e, t) {
  return t && (Yr(t) === "object" || typeof t == "function") ? t : ue(e);
}
function so(e) {
  return (
    (so = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    so(e)
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
var I0 = function (e, t, n, r, o, s, i, a) {
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
  R0 = I0;
const In = /* @__PURE__ */ jn(R0);
function M0(e) {
  if (Array.isArray(e)) return e;
}
function k0(e, t) {
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
function L0() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function io(e, t) {
  return M0(e) || k0(e, t) || L0();
}
function P0(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    s;
  for (s = 0; s < r.length; s++)
    (o = r[s]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function j0(e, t) {
  if (e == null) return {};
  var n = P0(e, t),
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
function rr(e) {
  "@babel/helpers - typeof";
  return (
    (rr =
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
    rr(e)
  );
}
function $0(e, t) {
  if (rr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (rr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function F0(e) {
  var t = $0(e, "string");
  return rr(t) == "symbol" ? t : t + "";
}
function or(e, t, n) {
  return (
    (t = F0(t)),
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
function Ls(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function H0(e) {
  if (Array.isArray(e)) return Ls(e);
}
function B0(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function z0(e, t) {
  if (e) {
    if (typeof e == "string") return Ls(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ls(e, t);
  }
}
function V0() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ot(e) {
  return H0(e) || B0(e) || z0(e) || V0();
}
var $n = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  cl = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function ll(e, t) {
  var n = Object.assign({}, e);
  return (
    qr(e) &&
      qr(t) &&
      $n(t).forEach(function (r) {
        qr(t[r])
          ? r in e
            ? (n[r] = ll(e[r], t[r]))
            : Object.assign(n, or({}, r, t[r]))
          : Object.assign(n, or({}, r, t[r]));
      }),
    n
  );
}
var Ps = function (t) {
    for (
      var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1;
      o < n;
      o++
    )
      r[o - 1] = arguments[o];
    return r.reduce(function (s, i) {
      return ll(s, i);
    }, t);
  },
  W0 = function (t, n) {
    var r = Object.assign({}, t);
    if (n) for (var o = 0; o < n.length; o++) delete r[n[o]];
    return r;
  },
  qr = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  U0 = function (t) {
    return (t || []).filter(Boolean);
  },
  bi = function (t) {
    return t[0] === "&";
  },
  Y0 = function (t) {
    return !bi(t);
  },
  ya = function (t) {
    return t.replace(/-(\w)/g, function (n, r) {
      return r.toUpperCase();
    });
  },
  q0 = function (t) {
    for (
      var n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        r = $n(t),
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
  ul = function (t, n) {
    for (
      var r = n.map(ya), o = $n(t), s = {}, i = 0, a = o.length;
      i < a;
      i += 1
    ) {
      var l = o[i];
      (n.indexOf(l) >= 0 || r.indexOf(ya(l)) >= 0) && (s[l] = t[l]);
    }
    return s;
  },
  Z0 = function e(t, n) {
    for (
      var r = Ps.apply(void 0, [{}, W0(t, n)].concat(Ot(cl(ul(t, n))))),
        o = $n(r).filter(bi),
        s = 0,
        i = o.length;
      s < i;
      s += 1
    ) {
      var a = o[s],
        l = e(r[a], n);
      n.indexOf(a) >= 0 ? (delete r[a], (r = Ps({}, r, l))) : (r[a] = l);
    }
    return r;
  };
function va(e, t) {
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
function Ea(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? va(Object(n), !0).forEach(function (r) {
          or(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : va(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
var X0 = ["animationName"],
  K0 = function (t) {
    var n = t.style,
      r = t.className;
    return Ea(
      Ea(
        {},
        n
          ? {
              style: q0(n, X0),
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
const dl = K0;
var fl = /* @__PURE__ */ bt(dl);
fl.Provider;
var hl = function (t) {
    if (t) {
      if (typeof t == "string") return [t];
      if (!Array.isArray(t)) {
        var n = t;
        return $n(t).reduce(function (r, o) {
          return r.concat(n[o] ? [o] : []);
        }, []);
      }
    } else return [];
    return t;
  },
  G0 = {},
  J0 = function (t) {
    return function (n, r) {
      var o = r || G0;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var s;
      t.memoize.has(o)
        ? (s = t.memoize.get(o))
        : ((s = {}), t.memoize.set(o, s));
      var i = hl(n).join(" ");
      return i in s ? s[i] : (s[i] = t(n || [], r));
    };
  };
function Ca(e, t) {
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
function pn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ca(Object(n), !0).forEach(function (r) {
          or(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ca(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
var Q0 = function (t) {
    var n = t && $n(t)[0];
    return n && n.split("__")[0].split("--")[0];
  },
  eh = function (t, n, r) {
    if (t) {
      var o = t.split(" ")[0],
        s = [].concat(
          Ot(
            n.length === 0
              ? r.map(function (i) {
                  return "".concat(o, "--").concat(i.substring(1));
                })
              : [],
          ),
          Ot(
            n.map(function (i) {
              return "".concat(o, "__").concat(i);
            }),
          ),
        );
      return n.length === 0 ? [t].concat(Ot(s)) : s;
    }
  };
function pl(e) {
  var t = e.style,
    n = e.className,
    r = e.classNames,
    o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : dl,
    s = n || Q0(r) || (t == null ? void 0 : t.className),
    i =
      typeof t == "function"
        ? t
        : J0(function (d, f) {
            var h = hl(d);
            In(
              Array.isArray(h),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              In(
                !f || qr(f),
                "Optional second parameter must be a plain object.",
              );
            var p = h.filter(bi),
              g = h.filter(Y0),
              m =
                g.length > 0
                  ? function (x) {
                      return cl(ul(x, g));
                    }
                  : function (x) {
                      return [x];
                    },
              y = function () {
                var b =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return m(Z0(b, p));
              },
              _ = eh(s, g, p);
            return pl(
              pn(
                pn(
                  pn(
                    {},
                    (t || f) && {
                      style: Ps.apply(void 0, [{}].concat(Ot(y(f)), Ot(y(t)))),
                    },
                  ),
                  _ && {
                    className: _.join(" "),
                  },
                ),
                r && {
                  classNames: r,
                },
              ),
              o,
            );
          }),
    a = pn(
      {},
      typeof t == "function"
        ? t
        : {
            style: t,
          },
    ),
    l = Ot(
      new Set(
        [].concat(
          Ot(a.className ? a.className.split(" ") : []),
          Ot(s ? s.split(" ") : []),
        ),
      ),
    ),
    u = r
      ? U0(
          l.map(function (d) {
            return r[d];
          }),
        )
      : l,
    c = o(
      pn(
        pn({}, a),
        u.length > 0
          ? {
              className: u.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(i, c), i;
}
function ba(e, t) {
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
function Vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? ba(Object(n), !0).forEach(function (r) {
          or(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ba(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
var th = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return n.reduce(function (o, s) {
      return Vn(
        Vn(Vn({}, o), typeof s == "function" ? s : {}),
        {},
        {
          style: Vn(Vn({}, o.style), typeof s == "function" ? s.style : s),
        },
      );
    }, {});
  },
  _i = function (t, n, r) {
    var o = n.style,
      s = n.className,
      i = n.classNames,
      a = Ge(fl),
      l = De(
        function () {
          return pl(
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
  js = { exports: {} },
  Or = { exports: {} },
  me = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _a;
function nh() {
  if (_a) return me;
  _a = 1;
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
    y = e ? Symbol.for("react.responder") : 60118,
    _ = e ? Symbol.for("react.scope") : 60119;
  function x(C) {
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
  function b(C) {
    return x(C) === u;
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
      return b(C) || x(C) === l;
    }),
    (me.isConcurrentMode = b),
    (me.isContextConsumer = function (C) {
      return x(C) === a;
    }),
    (me.isContextProvider = function (C) {
      return x(C) === i;
    }),
    (me.isElement = function (C) {
      return typeof C == "object" && C !== null && C.$$typeof === t;
    }),
    (me.isForwardRef = function (C) {
      return x(C) === c;
    }),
    (me.isFragment = function (C) {
      return x(C) === r;
    }),
    (me.isLazy = function (C) {
      return x(C) === p;
    }),
    (me.isMemo = function (C) {
      return x(C) === h;
    }),
    (me.isPortal = function (C) {
      return x(C) === n;
    }),
    (me.isProfiler = function (C) {
      return x(C) === s;
    }),
    (me.isStrictMode = function (C) {
      return x(C) === o;
    }),
    (me.isSuspense = function (C) {
      return x(C) === d;
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
            C.$$typeof === y ||
            C.$$typeof === _ ||
            C.$$typeof === g))
      );
    }),
    (me.typeOf = x),
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
var xa;
function rh() {
  return (
    xa ||
      ((xa = 1),
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
            y = e ? Symbol.for("react.responder") : 60118,
            _ = e ? Symbol.for("react.scope") : 60119;
          function x(Z) {
            return (
              typeof Z == "string" ||
              typeof Z == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              Z === r ||
              Z === u ||
              Z === s ||
              Z === o ||
              Z === d ||
              Z === f ||
              (typeof Z == "object" &&
                Z !== null &&
                (Z.$$typeof === p ||
                  Z.$$typeof === h ||
                  Z.$$typeof === i ||
                  Z.$$typeof === a ||
                  Z.$$typeof === c ||
                  Z.$$typeof === m ||
                  Z.$$typeof === y ||
                  Z.$$typeof === _ ||
                  Z.$$typeof === g))
            );
          }
          function b(Z) {
            if (typeof Z == "object" && Z !== null) {
              var ve = Z.$$typeof;
              switch (ve) {
                case t:
                  var Pe = Z.type;
                  switch (Pe) {
                    case l:
                    case u:
                    case r:
                    case s:
                    case o:
                    case d:
                      return Pe;
                    default:
                      var _e = Pe && Pe.$$typeof;
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
            O = a,
            S = i,
            P = t,
            L = c,
            j = r,
            B = p,
            H = h,
            E = n,
            N = s,
            w = o,
            I = d,
            k = !1;
          function D(Z) {
            return (
              k ||
                ((k = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              T(Z) || b(Z) === l
            );
          }
          function T(Z) {
            return b(Z) === u;
          }
          function R(Z) {
            return b(Z) === a;
          }
          function F(Z) {
            return b(Z) === i;
          }
          function V(Z) {
            return typeof Z == "object" && Z !== null && Z.$$typeof === t;
          }
          function W(Z) {
            return b(Z) === c;
          }
          function Y(Z) {
            return b(Z) === r;
          }
          function q(Z) {
            return b(Z) === p;
          }
          function X(Z) {
            return b(Z) === h;
          }
          function Q(Z) {
            return b(Z) === n;
          }
          function ee(Z) {
            return b(Z) === s;
          }
          function K(Z) {
            return b(Z) === o;
          }
          function de(Z) {
            return b(Z) === d;
          }
          (ye.AsyncMode = C),
            (ye.ConcurrentMode = A),
            (ye.ContextConsumer = O),
            (ye.ContextProvider = S),
            (ye.Element = P),
            (ye.ForwardRef = L),
            (ye.Fragment = j),
            (ye.Lazy = B),
            (ye.Memo = H),
            (ye.Portal = E),
            (ye.Profiler = N),
            (ye.StrictMode = w),
            (ye.Suspense = I),
            (ye.isAsyncMode = D),
            (ye.isConcurrentMode = T),
            (ye.isContextConsumer = R),
            (ye.isContextProvider = F),
            (ye.isElement = V),
            (ye.isForwardRef = W),
            (ye.isFragment = Y),
            (ye.isLazy = q),
            (ye.isMemo = X),
            (ye.isPortal = Q),
            (ye.isProfiler = ee),
            (ye.isStrictMode = K),
            (ye.isSuspense = de),
            (ye.isValidElementType = x),
            (ye.typeOf = b);
        })()),
    ye
  );
}
var wa;
function gl() {
  return (
    wa ||
      ((wa = 1),
      process.env.NODE_ENV === "production"
        ? (Or.exports = nh())
        : (Or.exports = rh())),
    Or.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ss, Sa;
function oh() {
  if (Sa) return ss;
  Sa = 1;
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
    (ss = o()
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
    ss
  );
}
var is, Na;
function xi() {
  if (Na) return is;
  Na = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (is = e), is;
}
var as, Ta;
function ml() {
  return (
    Ta ||
      ((Ta = 1), (as = Function.call.bind(Object.prototype.hasOwnProperty))),
    as
  );
}
var cs, Aa;
function sh() {
  if (Aa) return cs;
  Aa = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = xi(),
      n = {},
      r = ml();
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
    (cs = o),
    cs
  );
}
var ls, Da;
function ih() {
  if (Da) return ls;
  Da = 1;
  var e = gl(),
    t = oh(),
    n = xi(),
    r = ml(),
    o = sh(),
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
    (ls = function (a, l) {
      var u = typeof Symbol == "function" && Symbol.iterator,
        c = "@@iterator";
      function d(T) {
        var R = T && ((u && T[u]) || T[c]);
        if (typeof R == "function") return R;
      }
      var f = "<<anonymous>>",
        h = {
          array: y("array"),
          bigint: y("bigint"),
          bool: y("boolean"),
          func: y("function"),
          number: y("number"),
          object: y("object"),
          string: y("string"),
          symbol: y("symbol"),
          any: _(),
          arrayOf: x,
          element: b(),
          elementType: C(),
          instanceOf: A,
          node: L(),
          objectOf: S,
          oneOf: O,
          oneOfType: P,
          shape: B,
          exact: H,
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
            F = 0;
        function V(Y, q, X, Q, ee, K, de) {
          if (((Q = Q || f), (K = K || X), de !== n)) {
            if (l) {
              var Z = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types",
              );
              throw ((Z.name = "Invariant Violation"), Z);
            } else if (
              process.env.NODE_ENV !== "production" &&
              typeof console < "u"
            ) {
              var ve = Q + ":" + X;
              !R[ve] && // Avoid spamming the console because they are often not actionable except for lib authors
                F < 3 &&
                (s(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    K +
                    "` prop on `" +
                    Q +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (R[ve] = !0),
                F++);
            }
          }
          return q[X] == null
            ? Y
              ? q[X] === null
                ? new g(
                    "The " +
                      ee +
                      " `" +
                      K +
                      "` is marked as required " +
                      ("in `" + Q + "`, but its value is `null`."),
                  )
                : new g(
                    "The " +
                      ee +
                      " `" +
                      K +
                      "` is marked as required in " +
                      ("`" + Q + "`, but its value is `undefined`."),
                  )
              : null
            : T(q, X, Q, ee, K);
        }
        var W = V.bind(null, !1);
        return (W.isRequired = V.bind(null, !0)), W;
      }
      function y(T) {
        function R(F, V, W, Y, q, X) {
          var Q = F[V],
            ee = w(Q);
          if (ee !== T) {
            var K = I(Q);
            return new g(
              "Invalid " +
                Y +
                " `" +
                q +
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
      function _() {
        return m(i);
      }
      function x(T) {
        function R(F, V, W, Y, q) {
          if (typeof T != "function")
            return new g(
              "Property `" +
                q +
                "` of component `" +
                W +
                "` has invalid PropType notation inside arrayOf.",
            );
          var X = F[V];
          if (!Array.isArray(X)) {
            var Q = w(X);
            return new g(
              "Invalid " +
                Y +
                " `" +
                q +
                "` of type " +
                ("`" + Q + "` supplied to `" + W + "`, expected an array."),
            );
          }
          for (var ee = 0; ee < X.length; ee++) {
            var K = T(X, ee, W, Y, q + "[" + ee + "]", n);
            if (K instanceof Error) return K;
          }
          return null;
        }
        return m(R);
      }
      function b() {
        function T(R, F, V, W, Y) {
          var q = R[F];
          if (!a(q)) {
            var X = w(q);
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
        function T(R, F, V, W, Y) {
          var q = R[F];
          if (!e.isValidElementType(q)) {
            var X = w(q);
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
        function R(F, V, W, Y, q) {
          if (!(F[V] instanceof T)) {
            var X = T.name || f,
              Q = D(F[V]);
            return new g(
              "Invalid " +
                Y +
                " `" +
                q +
                "` of type " +
                ("`" + Q + "` supplied to `" + W + "`, expected ") +
                ("instance of `" + X + "`."),
            );
          }
          return null;
        }
        return m(R);
      }
      function O(T) {
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
        function R(F, V, W, Y, q) {
          for (var X = F[V], Q = 0; Q < T.length; Q++)
            if (p(X, T[Q])) return null;
          var ee = JSON.stringify(T, function (de, Z) {
            var ve = I(Z);
            return ve === "symbol" ? String(Z) : Z;
          });
          return new g(
            "Invalid " +
              Y +
              " `" +
              q +
              "` of value `" +
              String(X) +
              "` " +
              ("supplied to `" + W + "`, expected one of " + ee + "."),
          );
        }
        return m(R);
      }
      function S(T) {
        function R(F, V, W, Y, q) {
          if (typeof T != "function")
            return new g(
              "Property `" +
                q +
                "` of component `" +
                W +
                "` has invalid PropType notation inside objectOf.",
            );
          var X = F[V],
            Q = w(X);
          if (Q !== "object")
            return new g(
              "Invalid " +
                Y +
                " `" +
                q +
                "` of type " +
                ("`" + Q + "` supplied to `" + W + "`, expected an object."),
            );
          for (var ee in X)
            if (r(X, ee)) {
              var K = T(X, ee, W, Y, q + "." + ee, n);
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
          var F = T[R];
          if (typeof F != "function")
            return (
              s(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                  k(F) +
                  " at index " +
                  R +
                  ".",
              ),
              i
            );
        }
        function V(W, Y, q, X, Q) {
          for (var ee = [], K = 0; K < T.length; K++) {
            var de = T[K],
              Z = de(W, Y, q, X, Q, n);
            if (Z == null) return null;
            Z.data && r(Z.data, "expectedType") && ee.push(Z.data.expectedType);
          }
          var ve =
            ee.length > 0
              ? ", expected one of type [" + ee.join(", ") + "]"
              : "";
          return new g(
            "Invalid " +
              X +
              " `" +
              Q +
              "` supplied to " +
              ("`" + q + "`" + ve + "."),
          );
        }
        return m(V);
      }
      function L() {
        function T(R, F, V, W, Y) {
          return E(R[F])
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
      function j(T, R, F, V, W) {
        return new g(
          (T || "React class") +
            ": " +
            R +
            " type `" +
            F +
            "." +
            V +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            W +
            "`.",
        );
      }
      function B(T) {
        function R(F, V, W, Y, q) {
          var X = F[V],
            Q = w(X);
          if (Q !== "object")
            return new g(
              "Invalid " +
                Y +
                " `" +
                q +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + W + "`, expected `object`."),
            );
          for (var ee in T) {
            var K = T[ee];
            if (typeof K != "function") return j(W, Y, q, ee, I(K));
            var de = K(X, ee, W, Y, q + "." + ee, n);
            if (de) return de;
          }
          return null;
        }
        return m(R);
      }
      function H(T) {
        function R(F, V, W, Y, q) {
          var X = F[V],
            Q = w(X);
          if (Q !== "object")
            return new g(
              "Invalid " +
                Y +
                " `" +
                q +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + W + "`, expected `object`."),
            );
          var ee = t({}, F[V], T);
          for (var K in ee) {
            var de = T[K];
            if (r(T, K) && typeof de != "function") return j(W, Y, q, K, I(de));
            if (!de)
              return new g(
                "Invalid " +
                  Y +
                  " `" +
                  q +
                  "` key `" +
                  K +
                  "` supplied to `" +
                  W +
                  "`.\nBad object: " +
                  JSON.stringify(F[V], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(T), null, "  "),
              );
            var Z = de(X, K, W, Y, q + "." + K, n);
            if (Z) return Z;
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
              var F = R.call(T),
                V;
              if (R !== T.entries) {
                for (; !(V = F.next()).done; ) if (!E(V.value)) return !1;
              } else
                for (; !(V = F.next()).done; ) {
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
      function I(T) {
        if (typeof T > "u" || T === null) return "" + T;
        var R = w(T);
        if (R === "object") {
          if (T instanceof Date) return "date";
          if (T instanceof RegExp) return "regexp";
        }
        return R;
      }
      function k(T) {
        var R = I(T);
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
    ls
  );
}
var us, Oa;
function ah() {
  if (Oa) return us;
  Oa = 1;
  var e = xi();
  function t() {}
  function n() {}
  return (
    (n.resetWarningCache = t),
    (us = function () {
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
    us
  );
}
if (process.env.NODE_ENV !== "production") {
  var ch = gl(),
    lh = !0;
  js.exports = ih()(ch.isElement, lh);
} else js.exports = ah()();
var uh = js.exports;
const G = /* @__PURE__ */ jn(uh);
var Zr = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  Et = {
    id: "__id__",
    display: "__display__",
  },
  Ia = function (t, n) {
    In(
      n === "id" || n === "display",
      'Second arg must be either "id" or "display", got: "'.concat(n, '"'),
    );
    var r = t.indexOf(Et.display),
      o = t.indexOf(Et.id);
    return (
      r < 0 && (r = null),
      o < 0 && (o = null),
      In(
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
  dh = function (t) {
    var n = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (r) {
          var o = n.exec(r.toString()),
            s = io(o, 3),
            i = s[1],
            a = s[2];
          return (
            In(
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
  yl = function (t) {
    var n = 0;
    return (
      t.indexOf("__id__") >= 0 && n++, t.indexOf("__display__") >= 0 && n++, n
    );
  },
  fh = function () {},
  mr = function (t, n, r) {
    for (
      var o =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : fh,
        s = dh(
          n.map(function (C) {
            return C.regex;
          }),
        ),
        i = 2,
        a = n.map(function (C) {
          var A = C.markup,
            O = i;
          return (i += yl(A) + 1), O;
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
        m = d + Ia(p, "id"),
        y = d + Ia(p, "display"),
        _ = l[m],
        x = g(_, l[y]),
        b = t.substring(u, l.index);
      o(b, u, c),
        (c += b.length),
        r(l[0], l.index, c, _, x, f, u),
        (c += x.length),
        (u = s.lastIndex);
    }
    u < t.length && o(t.substring(u), u, c);
  },
  on = function (t, n) {
    var r = "";
    return (
      mr(
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
    return mr(t, n, a, i), s === void 0 ? t.length : s;
  },
  Qn = function (t, n, r, o) {
    return t.substring(0, n) + o + t.substring(r);
  },
  hh = function (t, n, r, o) {
    var s = r.selectionStartBefore,
      i = r.selectionEndBefore,
      a = r.selectionEndAfter,
      l = on(t, o),
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
      y = g === null || m === null,
      _ = Qn(t, h, p, c);
    if (!y) {
      var x = on(_, o);
      if (x !== n) {
        for (d = 0; n[d] === x[d]; ) d++;
        (c = n.slice(d, a)),
          (f = l.lastIndexOf(n.substring(a))),
          (h = Be(t, o, d, "START")),
          (p = Be(t, o, f, "END")),
          (_ = Qn(t, h, p, c));
      }
    }
    return _;
  },
  Ra = function (t, n, r) {
    var o = r,
      s = !1,
      i = function (l, u, c, d, f, h, p) {
        c <= r && c + f.length > r && ((o = c), (s = !0));
      };
    if ((mr(t, n, i), s)) return o;
  },
  Xn = function (t, n) {
    var r = [];
    return (
      mr(t, n, function (o, s, i, a, l, u, c) {
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
  vl = function (t, n) {
    return "".concat(t, "-").concat(n);
  },
  Ir = function (t) {
    return Object.values(t).reduce(function (n, r) {
      var o = r.results;
      return n + o.length;
    }, 0);
  },
  ph = function (t, n) {
    var r = Xn(t, n),
      o = r[r.length - 1];
    return o ? o.plainTextIndex + o.display.length : 0;
  },
  gh = function (t) {
    var n = Zr(t),
      r = t[t.indexOf(Et.display) + Et.display.length],
      o = t[t.indexOf(Et.id) + Et.id.length];
    return new RegExp(
      n
        .replace(Et.display, "([^".concat(Zr(r || ""), "]+?)"))
        .replace(Et.id, "([^".concat(Zr(o || ""), "]+?)")),
    );
  },
  Vt = function (t) {
    return An.toArray(t).map(function (n) {
      var r = n.props,
        o = r.markup,
        s = r.regex,
        i = r.displayTransform;
      return {
        markup: o,
        regex: s ? mh(s, o) : gh(o),
        displayTransform:
          i ||
          function (a, l) {
            return l || a;
          },
      };
    });
  },
  mh = function (t, n) {
    var r = new RegExp(t.toString() + "|").exec("").length - 1,
      o = yl(n);
    return (
      In(
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
  yh = function (t, n, r) {
    return t.replace(Et.id, n).replace(Et.display, r);
  },
  vh = [
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
  Eh = function (t) {
    var n = t;
    return (
      vh.forEach(function (r) {
        n = n.replace(r.letters, r.base);
      }),
      n
    );
  },
  Ma = function (t) {
    return Eh(t).toLowerCase();
  },
  El = function (t, n, r) {
    return r ? Ma(t).indexOf(Ma(n)) : t.toLowerCase().indexOf(n.toLowerCase());
  },
  Ch = function () {
    return !!document.documentMode;
  },
  $s = function (t) {
    return typeof t == "number";
  },
  bh = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  _h = function (t) {
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
  xh = ["style", "className", "classNames"];
function ka(e, t) {
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
function La(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? ka(Object(n), !0).forEach(function (r) {
          ae(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ka(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function jo(e, t) {
  var n = function (o) {
    var s = function (l) {
        var u = l.style,
          c = l.className,
          d = l.classNames,
          f = j0(l, xh),
          h = t ? t(f) : void 0,
          p = _i(
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
          nt({}, f, {
            style: p,
          }),
        );
      },
      i = o.displayName || o.name || "Component";
    return (
      (s.displayName = "defaultStyle(".concat(i, ")")),
      /* @__PURE__ */ $.forwardRef(function (a, l) {
        return s(
          La(
            La({}, a),
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
var wh = function (t, n) {
  return t.hasOwnProperty(n) ? t[n]++ : (t[n] = 0), n + "_" + t[n];
};
function Cl(e) {
  var t = e.selectionStart,
    n = e.selectionEnd,
    r = e.value,
    o = r === void 0 ? "" : r,
    s = e.onCaretPositionChange,
    i = e.containerRef,
    a = e.children;
  e.singleLine;
  var l = e.style,
    u = he({
      left: void 0,
      top: void 0,
    }),
    c = io(u, 2),
    d = c[0],
    f = c[1],
    h = he(),
    p = io(h, 2),
    g = p[0],
    m = p[1];
  ie(function () {
    y();
  });
  var y = function () {
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
    _ = Vt(a),
    x;
  n === t && (x = Be(o, _, t, "START"));
  var b = [],
    C = {},
    A = b,
    O = 0,
    S = function (E, N, w) {
      if ($s(x) && x >= N && x <= N + E.length) {
        var I = x - N;
        A.push(L(E.substring(0, I), O)), (A = [L(E.substring(I), O)]);
      } else A.push(L(E, O));
      O++;
    },
    P = function (E, N, w, I, k, D, T) {
      var R = wh(C, I);
      A.push(j(I, k, D, R));
    },
    L = function (E, N) {
      return /* @__PURE__ */ $.createElement(
        "span",
        nt({}, l("substring"), {
          key: N,
        }),
        E,
      );
    },
    j = function (E, N, w, I) {
      var k = {
          id: E,
          display: N,
          key: I,
        },
        D = An.toArray(a)[w];
      return /* @__PURE__ */ $.cloneElement(D, k);
    },
    B = function (E) {
      return /* @__PURE__ */ $.createElement(
        "span",
        nt({}, l("caret"), {
          ref: m,
          key: "caret",
        }),
        E,
      );
    };
  return (
    mr(o, _, P, S),
    A.push(" "),
    A !== b && b.push(B(A)),
    /* @__PURE__ */ $.createElement(
      "div",
      nt({}, l, {
        ref: i,
      }),
      b,
    )
  );
}
Cl.propTypes = {
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
var Sh = jo(
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
  Nh = Sh(Cl);
function bl(e) {
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
        y = p(m);
      return l ? l(u, a, y, o, n) : y;
    },
    h = function () {
      if (typeof u == "string") return u;
      var m = u.id,
        y = u.display;
      return m === void 0 || !y ? m : y;
    },
    p = function (m) {
      var y = El(m, a, r);
      return y === -1
        ? /* @__PURE__ */ $.createElement("span", c("display"), m)
        : /* @__PURE__ */ $.createElement(
            "span",
            c("display"),
            m.substring(0, y),
            /* @__PURE__ */ $.createElement(
              "b",
              c("highlight"),
              m.substring(y, y + a.length),
            ),
            m.substring(y + a.length),
          );
    };
  return /* @__PURE__ */ $.createElement(
    "li",
    nt(
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
bl.propTypes = {
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
var Th = jo(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  Ah = Th(bl);
function Dh(e) {
  var t = e.style,
    n = e.className,
    r = e.classNames,
    o = _i(Oh, {
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
var Oh = {};
function _l(e) {
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
    y = e.children,
    _ = e.style,
    x = e.customSuggestionsContainer,
    b = e.onMouseDown,
    C = e.onMouseEnter,
    A = he(void 0),
    O = io(A, 2),
    S = O[0],
    P = O[1];
  ie(
    function () {
      if (!(!S || S.offsetHeight >= S.scrollHeight || !c)) {
        var w = S.scrollTop,
          I = S.children[s].getBoundingClientRect(),
          k = I.top,
          D = I.bottom,
          T = S.getBoundingClientRect(),
          R = T.top;
        (k = k - R + w),
          (D = D - R + w),
          k < w
            ? (S.scrollTop = k)
            : D > S.offsetHeight && (S.scrollTop = D - S.offsetHeight);
      }
    },
    [s, c, S],
  );
  var L = function () {
      var I = /* @__PURE__ */ $.createElement(
        "ul",
        nt(
          {
            ref: P,
            id: t,
            role: "listbox",
            "aria-label": o,
          },
          _("list"),
        ),
        Object.values(r).reduce(function (k, D) {
          var T = D.results,
            R = D.queryInfo;
          return [].concat(
            oo(k),
            oo(
              T.map(function (F, V) {
                return j(F, R, k.length + V);
              }),
            ),
          );
        }, []),
      );
      return x ? x(I) : I;
    },
    j = function (I, k, D) {
      var T = D === s,
        R = k.childIndex,
        F = k.query,
        V = An.toArray(y)[R].props.renderSuggestion;
      return /* @__PURE__ */ $.createElement(Ah, {
        style: _("item"),
        key: "".concat(R, "-").concat(N(I)),
        id: vl(t, D),
        query: F,
        index: D,
        ignoreAccents: g,
        renderSuggestion: V,
        suggestion: I,
        focused: T,
        onClick: function () {
          return E(I, k);
        },
        onMouseEnter: function () {
          return H(D);
        },
      });
    },
    B = function () {
      if (d)
        return /* @__PURE__ */ $.createElement(Dh, {
          style: _("loadingIndicator"),
        });
    },
    H = function (I, k) {
      C && C(I);
    },
    E = function (I, k) {
      p(I, k);
    },
    N = function (I) {
      return typeof I == "string" ? I : I.id;
    };
  return f
    ? /* @__PURE__ */ $.createElement(
        "div",
        nt(
          {},
          th(
            {
              position: i || "absolute",
              left: a,
              right: l,
              top: u,
            },
            _,
          ),
          {
            onMouseDown: b,
            ref: m,
          },
        ),
        L(),
        B(),
      )
    : null;
}
_l.propTypes = {
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
var Ih = jo({
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
  Rh = Ih(_l);
function Pa(e, t) {
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
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Pa(Object(n), !0).forEach(function (r) {
          ae(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Pa(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Mh(e) {
  var t = kh();
  return function () {
    var r = so(e),
      o;
    if (t) {
      var s = so(this).constructor;
      o = Reflect.construct(r, arguments, s);
    } else o = r.apply(this, arguments);
    return O0(this, o);
  };
}
function kh() {
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
var Lh = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t instanceof RegExp) return t;
    var r = n.allowSpaceInQuery,
      o = Zr(t);
    return new RegExp(
      "(?:^|\\s)("
        .concat(o, "([^")
        .concat(r ? "" : "\\s")
        .concat(o, "]*))$"),
    );
  },
  Ph = function (t, n) {
    return t instanceof Array
      ? function (r, o) {
          for (var s = [], i = 0, a = t.length; i < a; ++i) {
            var l = t[i].display || t[i].id;
            El(l, r, n) >= 0 && s.push(t[i]);
          }
          return s;
        }
      : t;
  },
  gn = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  Rr = !1,
  xl = {
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
  wi = /* @__PURE__ */ (function (e) {
    D0(n, e);
    var t = Mh(n);
    function n(r) {
      var o;
      return (
        T0(this, n),
        (o = t.call(this, r)),
        ae(ue(o), "setContainerElement", function (s) {
          o.containerElement = s;
        }),
        ae(ue(o), "getInputProps", function () {
          var s = o.props,
            i = s.readOnly,
            a = s.disabled,
            l = s.style,
            u = _h(
              o.props,
              ["style", "classNames", "className"],
              // substyle props
              bh(xl),
            );
          return ct(
            ct(
              ct(ct({}, u), l("input")),
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
              "aria-activedescendant": vl(
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
            nt(
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
            nt(
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
          if (!$s(o.state.selectionStart)) return null;
          var s = o.state.suggestionsPosition,
            i = s.position,
            a = s.left,
            l = s.top,
            u = s.right,
            c = /* @__PURE__ */ $.createElement(
              Rh,
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
            ? /* @__PURE__ */ Zd.createPortal(c, o.props.suggestionsPortalHost)
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
            Nh,
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
          return on(o.props.value || "", Vt(o.props.children));
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
          if (((Rr = !1), Ch())) {
            var i =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (i.activeElement !== s.target) return;
          }
          var a = o.props.value || "",
            l = Vt(o.props.children),
            u = s.target.value,
            c = o.state.selectionStart;
          c == null && (c = s.target.selectionStart);
          var d = o.state.selectionEnd;
          d == null && (d = s.target.selectionEnd);
          var f = hh(
            a,
            u,
            {
              selectionStartBefore: c,
              selectionEndBefore: d,
              selectionEndAfter: s.target.selectionEnd,
            },
            l,
          );
          u = on(f, l);
          var h = s.target.selectionStart,
            p = s.target.selectionEnd,
            g = !1,
            m = Ra(a, l, h);
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
          var y = Xn(f, l);
          s.nativeEvent.isComposing &&
            h === p &&
            o.updateMentionsQueries(o.inputElement.value, h);
          var _ = {
            target: {
              value: f,
            },
          };
          o.executeOnChange(_, f, u, y);
        }),
        ae(ue(o), "handleSelect", function (s) {
          if (
            (o.setState({
              selectionStart: s.target.selectionStart,
              selectionEnd: s.target.selectionEnd,
            }),
            !Rr)
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
          var i = Ir(o.state.suggestions);
          if (i === 0 || !o.suggestionsElement) {
            o.props.onKeyDown(s);
            return;
          }
          switch (
            (Object.values(gn).indexOf(s.keyCode) >= 0 &&
              (s.preventDefault(), s.stopPropagation()),
            s.keyCode)
          ) {
            case gn.ESC: {
              o.clearSuggestions();
              return;
            }
            case gn.DOWN: {
              o.shiftFocus(1);
              return;
            }
            case gn.UP: {
              o.shiftFocus(-1);
              return;
            }
            case gn.RETURN: {
              o.selectFocused();
              return;
            }
            case gn.TAB: {
              o.selectFocused();
              return;
            }
            default:
              return;
          }
        }),
        ae(ue(o), "shiftFocus", function (s) {
          var i = Ir(o.state.suggestions);
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
                oo(d),
                oo(
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
              h = ds(d, "font-size"),
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
                var y = p.left,
                  _ = p.top;
                (y -= ds(c, "margin-left")),
                  (_ -= ds(c, "margin-top")),
                  (y -= d.scrollLeft),
                  (_ -= d.scrollTop);
                var x = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                y + c.offsetWidth > x
                  ? (m.left = Math.max(0, x - c.offsetWidth))
                  : (m.left = y),
                  (l && _ + c.offsetHeight > g && c.offsetHeight < _ - h) || u
                    ? (m.top = Math.max(0, _ - c.offsetHeight - h))
                    : (m.top = _);
              } else {
                var b = s.left - d.scrollLeft,
                  C = s.top - d.scrollTop;
                b + c.offsetWidth > o.containerElement.offsetWidth
                  ? (m.right = 0)
                  : (m.left = b),
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
          Rr = !0;
        }),
        ae(ue(o), "handleCompositionEnd", function () {
          Rr = !1;
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
            u = Vt(l),
            c = Be(a, u, i, "NULL");
          if (c !== null) {
            var d = ph(a.substring(0, c), u),
              f = s.substring(d, i);
            $.Children.forEach(l, function (h, p) {
              if (h) {
                var g = Lh(h.props.trigger, o.props),
                  m = f.match(g);
                if (m) {
                  var y = d + f.indexOf(m[1], m.index);
                  o.queryData(m[2], p, y, y + m[1].length, s);
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
            h = An.toArray(d)[i],
            p = Ph(h.props.data, f),
            g = p(s, o.updateSuggestions.bind(null, o._queryId, i, s, a, l, u));
          g instanceof Array &&
            o.updateSuggestions(o._queryId, i, s, a, l, u, g);
        }),
        ae(ue(o), "updateSuggestions", function (s, i, a, l, u, c, d) {
          if (s === o._queryId) {
            o.suggestions = ct(
              ct({}, o.suggestions),
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
              h = Ir(o.suggestions);
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
            p = Vt(o.props.children),
            g = An.toArray(o.props.children)[u],
            m = g.props,
            y = m.markup,
            _ = m.displayTransform,
            x = m.appendSpaceOnAdd,
            b = m.onAdd,
            C = Be(h, p, c, "START"),
            A = C + d - c,
            O = yh(y, a, l);
          x && (O += " ");
          var S = Qn(h, C, A, O);
          o.inputElement.focus();
          var P = _(a, l);
          x && (P += " ");
          var L = c + P.length;
          o.setState({
            selectionStart: L,
            selectionEnd: L,
            setSelectionAfterMentionChange: !0,
          });
          var j = {
              target: {
                value: S,
              },
            },
            B = Xn(S, p),
            H = Qn(f, c, d, P);
          o.executeOnChange(j, S, H, B),
            b && b(a, l, C, A),
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
            $s(o.state.selectionStart) &&
            (Ir(o.state.suggestions) !== 0 || o.isLoading())
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
      A0(n, [
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
              nt(
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
                d = Vt(c),
                f = Be(u, d, i, "START"),
                h = Be(u, d, a, "END"),
                p = o.clipboardData.getData("text/react-mentions"),
                g = o.clipboardData.getData("text/plain"),
                m = Qn(u, f, h, p || g).replace(/\r/g, ""),
                y = on(m, d),
                _ = {
                  target: ct(
                    ct({}, o.target),
                    {},
                    {
                      value: m,
                    },
                  ),
                };
              this.executeOnChange(_, m, y, Xn(m, d));
              var x = Ra(u, d, i),
                b = (x || i) + on(p || g, d).length;
              this.setState({
                selectionStart: b,
                selectionEnd: b,
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
              c = Vt(l),
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
                d = Vt(u),
                f = Be(c, d, i, "START"),
                h = Be(c, d, a, "END"),
                p = [c.slice(0, f), c.slice(h)].join(""),
                g = on(p, d),
                m = {
                  target: ct(
                    ct({}, o.target),
                    {},
                    {
                      value: g,
                    },
                  ),
                };
              this.executeOnChange(m, p, g, Xn(c, d));
            }
          },
          // Handle input element's change event
        },
      ]),
      n
    );
  })($.Component);
ae(wi, "propTypes", xl);
ae(wi, "defaultProps", {
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
var ds = function (t, n) {
    var r = parseFloat(window.getComputedStyle(t, null).getPropertyValue(n));
    return isFinite(r) ? r : 0;
  },
  jh = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  $h = jo(
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
          jh
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
  Fh = $h(wi),
  Hh = {
    fontWeight: "inherit",
  },
  Si = function (t) {
    var n = t.display,
      r = t.style,
      o = t.className,
      s = t.classNames,
      i = _i(Hh, {
        style: r,
        className: o,
        classNames: s,
      });
    return /* @__PURE__ */ $.createElement("strong", i, n);
  };
Si.propTypes = {
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
Si.defaultProps = {
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
const Bh = {
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
  zh = ({
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
    return /* @__PURE__ */ v.jsx(Fh, {
      autoFocus: !0,
      value: e,
      onChange: l,
      style: {
        ...Bh,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: r,
      className: "mentions-input",
      onKeyDown: i,
      children: /* @__PURE__ */ v.jsx(Si, {
        displayTransform: (u, c) => `@${c}`,
        trigger: "@",
        markup: "@[__id__](__display__)",
        data: s,
        appendSpaceOnAdd: !0,
        renderSuggestion: (u, c) =>
          /* @__PURE__ */ v.jsx("div", {
            className: `user ${c ? "focused" : ""}`,
            children: u.display,
          }),
        onAdd: a,
      }),
    });
  },
  Vh = zh,
  Wh = ({
    comment: e,
    setComment: t,
    loading: n,
    users: r,
    currentUser: o,
    placeholder: s,
    onEnterKeypress: i,
  }) =>
    /* @__PURE__ */ v.jsxs("div", {
      className: Mt.conversationInputForm,
      children: [
        o ? /* @__PURE__ */ v.jsx(al, { user: o }) : null,
        /* @__PURE__ */ v.jsx(Vh, {
          value: e,
          setValue: t,
          users: r,
          placeholder: s,
          onEnterKeypress: i,
        }),
        /* @__PURE__ */ v.jsx(gf, {
          loading: n,
          color: "primary",
          children: /* @__PURE__ */ v.jsx(q1, {}),
        }),
      ],
    }),
  wl = Wh,
  Uh = ({ meta: { highlight: e, filePath: t, field: n, column: r } }) => {
    if (!e) return null;
    const o = r ? `${t} (${r})` : t;
    return /* @__PURE__ */ v.jsx("div", {
      className: Mt.highlightText,
      children: /* @__PURE__ */ v.jsx(vf, {
        code: e,
        language: n ? "markdown" : "sql",
        showLineNumbers: !n,
        fileName: o,
      }),
    });
  },
  Sl = Uh,
  Yh = () => {
    const e = be((c) => c.users),
      t = be((c) => c.newConversation),
      n = be((c) => (c.currentUserId ? c.users[c.currentUserId] : null)),
      r = be((c) => c.shareId),
      o = rt(),
      [s, i] = he(!1),
      [a, l] = he(""),
      u = async (c) => {
        if (
          (c == null || c.stopPropagation(),
          c == null || c.preventDefault(),
          !(!t || !r))
        ) {
          i(!0);
          try {
            console.log("saving conversation", t, a);
            const d = await Q1(
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
          o(rl()), i(!1), o(vi(!0)), o(Ei()), l("");
        }
      };
    return /* @__PURE__ */ v.jsx(To, {
      className: Mt.newConversationForm,
      children: /* @__PURE__ */ v.jsx(Ao, {
        children: /* @__PURE__ */ v.jsxs("form", {
          onSubmit: u,
          children: [
            /* @__PURE__ */ v.jsx("h4", { children: "Add comment" }),
            /* @__PURE__ */ v.jsx(Sl, {
              meta: (t == null ? void 0 : t.meta) || {},
            }),
            /* @__PURE__ */ v.jsx(wl, {
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
  qh = Yh;
var Nl = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(Xd, function () {
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
      y =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      _ = {
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
      x = function (E, N, w) {
        var I = String(E);
        return !I || I.length >= N
          ? E
          : "" + Array(N + 1 - I.length).join(w) + E;
      },
      b = {
        s: x,
        z: function (E) {
          var N = -E.utcOffset(),
            w = Math.abs(N),
            I = Math.floor(w / 60),
            k = w % 60;
          return (N <= 0 ? "+" : "-") + x(I, 2, "0") + ":" + x(k, 2, "0");
        },
        m: function E(N, w) {
          if (N.date() < w.date()) return -E(w, N);
          var I = 12 * (w.year() - N.year()) + (w.month() - N.month()),
            k = N.clone().add(I, d),
            D = w - k < 0,
            T = N.clone().add(I + (D ? -1 : 1), d);
          return +(-(I + (w - k) / (D ? k - T : T - k)) || 0);
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
    A[C] = _;
    var O = "$isDayjsObject",
      S = function (E) {
        return E instanceof B || !(!E || !E[O]);
      },
      P = function E(N, w, I) {
        var k;
        if (!N) return C;
        if (typeof N == "string") {
          var D = N.toLowerCase();
          A[D] && (k = D), w && ((A[D] = w), (k = D));
          var T = N.split("-");
          if (!k && T.length > 1) return E(T[0]);
        } else {
          var R = N.name;
          (A[R] = N), (k = R);
        }
        return !I && k && (C = k), k || (!I && C);
      },
      L = function (E, N) {
        if (S(E)) return E.clone();
        var w = typeof N == "object" ? N : {};
        return (w.date = E), (w.args = arguments), new B(w);
      },
      j = b;
    (j.l = P),
      (j.i = S),
      (j.w = function (E, N) {
        return L(E, { locale: N.$L, utc: N.$u, x: N.$x, $offset: N.$offset });
      });
    var B = (function () {
        function E(w) {
          (this.$L = P(w.locale, null, !0)),
            this.parse(w),
            (this.$x = this.$x || w.x || {}),
            (this[O] = !0);
        }
        var N = E.prototype;
        return (
          (N.parse = function (w) {
            (this.$d = (function (I) {
              var k = I.date,
                D = I.utc;
              if (k === null) return /* @__PURE__ */ new Date(NaN);
              if (j.u(k)) return /* @__PURE__ */ new Date();
              if (k instanceof Date) return new Date(k);
              if (typeof k == "string" && !/Z$/i.test(k)) {
                var T = k.match(m);
                if (T) {
                  var R = T[2] - 1 || 0,
                    F = (T[7] || "0").substring(0, 3);
                  return D
                    ? new Date(
                        Date.UTC(
                          T[1],
                          R,
                          T[3] || 1,
                          T[4] || 0,
                          T[5] || 0,
                          T[6] || 0,
                          F,
                        ),
                      )
                    : new Date(
                        T[1],
                        R,
                        T[3] || 1,
                        T[4] || 0,
                        T[5] || 0,
                        T[6] || 0,
                        F,
                      );
                }
              }
              return new Date(k);
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
          (N.isSame = function (w, I) {
            var k = L(w);
            return this.startOf(I) <= k && k <= this.endOf(I);
          }),
          (N.isAfter = function (w, I) {
            return L(w) < this.startOf(I);
          }),
          (N.isBefore = function (w, I) {
            return this.endOf(I) < L(w);
          }),
          (N.$g = function (w, I, k) {
            return j.u(w) ? this[I] : this.set(k, w);
          }),
          (N.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (N.valueOf = function () {
            return this.$d.getTime();
          }),
          (N.startOf = function (w, I) {
            var k = this,
              D = !!j.u(I) || I,
              T = j.p(w),
              R = function (ee, K) {
                var de = j.w(
                  k.$u ? Date.UTC(k.$y, K, ee) : new Date(k.$y, K, ee),
                  k,
                );
                return D ? de : de.endOf(u);
              },
              F = function (ee, K) {
                return j.w(
                  k
                    .toDate()
                    [
                      ee
                    ].apply(k.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(K)),
                  k,
                );
              },
              V = this.$W,
              W = this.$M,
              Y = this.$D,
              q = "set" + (this.$u ? "UTC" : "");
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
                return F(q + "Hours", 0);
              case l:
                return F(q + "Minutes", 1);
              case a:
                return F(q + "Seconds", 2);
              case i:
                return F(q + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (N.endOf = function (w) {
            return this.startOf(w, !1);
          }),
          (N.$set = function (w, I) {
            var k,
              D = j.p(w),
              T = "set" + (this.$u ? "UTC" : ""),
              R = ((k = {}),
              (k[u] = T + "Date"),
              (k[p] = T + "Date"),
              (k[d] = T + "Month"),
              (k[h] = T + "FullYear"),
              (k[l] = T + "Hours"),
              (k[a] = T + "Minutes"),
              (k[i] = T + "Seconds"),
              (k[s] = T + "Milliseconds"),
              k)[D],
              F = D === u ? this.$D + (I - this.$W) : I;
            if (D === d || D === h) {
              var V = this.clone().set(p, 1);
              V.$d[R](F),
                V.init(),
                (this.$d = V.set(p, Math.min(this.$D, V.daysInMonth())).$d);
            } else R && this.$d[R](F);
            return this.init(), this;
          }),
          (N.set = function (w, I) {
            return this.clone().$set(w, I);
          }),
          (N.get = function (w) {
            return this[j.p(w)]();
          }),
          (N.add = function (w, I) {
            var k,
              D = this;
            w = Number(w);
            var T = j.p(I),
              R = function (W) {
                var Y = L(D);
                return j.w(Y.date(Y.date() + Math.round(W * w)), D);
              };
            if (T === d) return this.set(d, this.$M + w);
            if (T === h) return this.set(h, this.$y + w);
            if (T === u) return R(1);
            if (T === c) return R(7);
            var F = ((k = {}), (k[a] = r), (k[l] = o), (k[i] = n), k)[T] || 1,
              V = this.$d.getTime() + w * F;
            return j.w(V, this);
          }),
          (N.subtract = function (w, I) {
            return this.add(-1 * w, I);
          }),
          (N.format = function (w) {
            var I = this,
              k = this.$locale();
            if (!this.isValid()) return k.invalidDate || g;
            var D = w || "YYYY-MM-DDTHH:mm:ssZ",
              T = j.z(this),
              R = this.$H,
              F = this.$m,
              V = this.$M,
              W = k.weekdays,
              Y = k.months,
              q = k.meridiem,
              X = function (K, de, Z, ve) {
                return (K && (K[de] || K(I, D))) || Z[de].slice(0, ve);
              },
              Q = function (K) {
                return j.s(R % 12 || 12, K, "0");
              },
              ee =
                q ||
                function (K, de, Z) {
                  var ve = K < 12 ? "AM" : "PM";
                  return Z ? ve.toLowerCase() : ve;
                };
            return D.replace(y, function (K, de) {
              return (
                de ||
                (function (Z) {
                  switch (Z) {
                    case "YY":
                      return String(I.$y).slice(-2);
                    case "YYYY":
                      return j.s(I.$y, 4, "0");
                    case "M":
                      return V + 1;
                    case "MM":
                      return j.s(V + 1, 2, "0");
                    case "MMM":
                      return X(k.monthsShort, V, Y, 3);
                    case "MMMM":
                      return X(Y, V);
                    case "D":
                      return I.$D;
                    case "DD":
                      return j.s(I.$D, 2, "0");
                    case "d":
                      return String(I.$W);
                    case "dd":
                      return X(k.weekdaysMin, I.$W, W, 2);
                    case "ddd":
                      return X(k.weekdaysShort, I.$W, W, 3);
                    case "dddd":
                      return W[I.$W];
                    case "H":
                      return String(R);
                    case "HH":
                      return j.s(R, 2, "0");
                    case "h":
                      return Q(1);
                    case "hh":
                      return Q(2);
                    case "a":
                      return ee(R, F, !0);
                    case "A":
                      return ee(R, F, !1);
                    case "m":
                      return String(F);
                    case "mm":
                      return j.s(F, 2, "0");
                    case "s":
                      return String(I.$s);
                    case "ss":
                      return j.s(I.$s, 2, "0");
                    case "SSS":
                      return j.s(I.$ms, 3, "0");
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
          (N.diff = function (w, I, k) {
            var D,
              T = this,
              R = j.p(I),
              F = L(w),
              V = (F.utcOffset() - this.utcOffset()) * r,
              W = this - F,
              Y = function () {
                return j.m(T, F);
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
            return k ? D : j.a(D);
          }),
          (N.daysInMonth = function () {
            return this.endOf(d).$D;
          }),
          (N.$locale = function () {
            return A[this.$L];
          }),
          (N.locale = function (w, I) {
            if (!w) return this.$L;
            var k = this.clone(),
              D = P(w, I, !0);
            return D && (k.$L = D), k;
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
      H = B.prototype;
    return (
      (L.prototype = H),
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
        H[E[1]] = function (N) {
          return this.$g(N, E[0], E[1]);
        };
      }),
      (L.extend = function (E, N) {
        return E.$i || (E(N, B, L), (E.$i = !0)), L;
      }),
      (L.locale = P),
      (L.isDayjs = S),
      (L.unix = function (E) {
        return L(1e3 * E);
      }),
      (L.en = A[C]),
      (L.Ls = A),
      (L.p = {}),
      L
    );
  });
})(Nl);
var Zh = Nl.exports;
const Xh = /* @__PURE__ */ jn(Zh),
  Kh = ({ conversationGroupId: e, shareId: t }) => {
    const { onResolve: n, source: r } = sr(),
      [o, s] = he(!1),
      i = async () => {
        e && (s(!0), await r0(t, e, r), n(), s(!1));
      };
    return e
      ? /* @__PURE__ */ v.jsx(Bc, {
          disabled: o,
          className: Mt.resolveButton,
          title: "Resolve conversation",
          onClick: i,
          children: /* @__PURE__ */ v.jsx(Y1, {}),
        })
      : null;
  },
  Gh = Kh,
  Jh = ({
    user: e,
    timestamp: t,
    showResolveButton: n,
    conversationGroupId: r,
    shareId: o,
  }) =>
    /* @__PURE__ */ v.jsxs(Hc, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ v.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ v.jsx(al, { user: e }),
            /* @__PURE__ */ v.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ v.jsx("span", {
              children: Xh(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        n
          ? /* @__PURE__ */ v.jsx(Gh, {
              conversationGroupId: r,
              shareId: o,
            })
          : null,
      ],
    }),
  Tl = Jh,
  Qh = ({ conversation: e, shareId: t }) => {
    const { users: n } = sr(),
      r = De(() => {
        if (e != null && e.user_id) return n[e.user_id];
      }, [e.user_id, n]);
    return /* @__PURE__ */ v.jsxs(To, {
      children: [
        /* @__PURE__ */ v.jsx(Tl, {
          user: r,
          timestamp: e.timestamp,
          shareId: t,
        }),
        /* @__PURE__ */ v.jsx(Ao, {
          children: /* @__PURE__ */ v.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
          }),
        }),
      ],
    });
  },
  ep = Qh,
  tp = ({ conversationGroupId: e, shareId: t }) => {
    const { currentUser: n, users: r, onReplyAdd: o, source: s } = sr(),
      i = Object.values(r),
      [a, l] = he(""),
      [u, c] = he(!1),
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
            await e0(
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
    return /* @__PURE__ */ v.jsx("div", {
      className: Mt.replyForm,
      children: /* @__PURE__ */ v.jsx("form", {
        onSubmit: d,
        className: "",
        children: /* @__PURE__ */ v.jsx(wl, {
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
  np = tp,
  rp = ({ conversationGroup: e, shareId: t, onSelect: n }) => {
    var f;
    const { users: r } = sr(),
      o = De(() => {
        if (e.owner) return r[e.owner];
      }, [e.owner, r]),
      { isSelected: s } = sr(),
      [i, a] = he(!1),
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
    return /* @__PURE__ */ v.jsx("div", {
      ref: l,
      className: Mt.conversationGroup,
      children: /* @__PURE__ */ v.jsxs(To, {
        className: `${s ? "active" : ""}`,
        onClick: n,
        children: [
          /* @__PURE__ */ v.jsx(Tl, {
            user: o,
            timestamp: u.timestamp,
            showResolveButton: !0,
            conversationGroupId: e.conversation_group_id,
            shareId: t,
          }),
          /* @__PURE__ */ v.jsxs(Ao, {
            children: [
              /* @__PURE__ */ v.jsx(Sl, { meta: e.meta }),
              /* @__PURE__ */ v.jsx("p", {
                children: u.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
              }),
              /* @__PURE__ */ v.jsx(dt, {
                onClick: () => a((h) => !h),
                color: "link",
                children: d,
              }),
              c.length
                ? /* @__PURE__ */ v.jsx(v.Fragment, {
                    children: i
                      ? /* @__PURE__ */ v.jsx(v.Fragment, {
                          children: c.map((h) =>
                            /* @__PURE__ */ v.jsx(
                              ep,
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
                ? /* @__PURE__ */ v.jsx(np, {
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
  op = rp,
  Al = bt({
    users: {},
    conversationGroup: void 0,
    currentUser: void 0,
    isSelected: !1,
    shareId: void 0,
    onSelect: () => null,
    onResolve: () => null,
    onReplyAdd: () => null,
    source: ci.DBT_DOCS,
  }),
  sp = ({
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
    const u = De(
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
      : /* @__PURE__ */ v.jsx(Al.Provider, {
          value: u,
          children: /* @__PURE__ */ v.jsx(op, {
            conversationGroup: t,
            shareId: n,
            onSelect: r,
          }),
        });
  },
  ip = sp,
  sr = () => Ge(Al),
  ap = () => {
    const e = be((d) => d.source),
      t = be((d) => d.conversations),
      n = be((d) => d.selectedConversationId),
      r = be((d) => d.shareId),
      o = be((d) => d.users),
      s = be((d) => d.currentUserId),
      i = rt();
    if (!s || !r) return null;
    const a = o[s],
      l = (d) => {
        i(_1({ shareId: r, conversationGroupId: d }));
      },
      u = (d) => {
        i(yi(d));
      },
      c = (d) => {
        console.log("onReplyAdd", d), i(rl());
      };
    return !t || !Object.keys(t).length
      ? /* @__PURE__ */ v.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ v.jsx("div", {
          children: Object.values(t).map((d) =>
            /* @__PURE__ */ v.jsx(
              ip,
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
  cp = ap,
  lp = () => {
    const e = be((i) => i.isRightPanelOpen),
      t = be((i) => i.selectedConversationId),
      n = be((i) => i.newConversation),
      r = rt(),
      o = () => {
        r(vi(!1)), r(yi(void 0)), r(Ei());
      };
    return !!n || e || t
      ? /* @__PURE__ */ v.jsxs(v.Fragment, {
          children: [
            /* @__PURE__ */ v.jsx(Vd, {
              onClick: o,
              className: Mt.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ v.jsxs("div", {
              className: Mt.conversationRightPanel,
              children: [
                /* @__PURE__ */ v.jsx("h3", { children: "Comments" }),
                n
                  ? /* @__PURE__ */ v.jsx(qh, {})
                  : /* @__PURE__ */ v.jsx(cp, {}),
              ],
            }),
          ],
        })
      : null;
  },
  up = lp,
  dp = 10,
  fp = () => {
    const e = se(),
      t = be((i) => i.shareId),
      n = be((i) => i.conversationsLoadingState),
      r = rt(),
      o = be((i) => Object.keys(i.conversations || {})),
      s = ge(
        (i) => {
          clearTimeout(e.current),
            t0(i)
              .then((a) => {
                console.log("useConversations", a),
                  r(b1(a == null ? void 0 : a.dbt_docs_share_conversations)),
                  (e.current = setTimeout(() => {
                    s(i);
                  }, dp * 1e3));
              })
              .catch((a) =>
                console.error("error while fetching conversations list", a),
              )
              .finally(() => {
                r(pa(Qe.INITIALIZED));
              });
        },
        [r],
      );
    return (
      ie(() => {
        n !== Qe.UNINITIALIZED || !t || (r(pa(Qe.LOADING)), s(t));
      }, [r, n, o, t, s]),
      { isLoading: n === Qe.LOADING }
    );
  },
  hp = () => {
    const e = rt(),
      t = be((o) => Object.keys(o.users || {})),
      [n, r] = he(Qe.UNINITIALIZED);
    return (
      ie(() => {
        n !== Qe.UNINITIALIZED ||
          Object.keys(t).length ||
          (r(Qe.LOADING),
          n0()
            .then((o) => {
              console.log("useConversationUsers", o), e(C1(o));
            })
            .catch((o) => console.error("error while fetching users list", o))
            .finally(() => {
              r(Qe.INITIALIZED);
            }));
      }, [e, n, t]),
      { isLoading: n === Qe.LOADING }
    );
  },
  pp = () => (
    hp(),
    fp(),
    /* @__PURE__ */ v.jsxs("div", {
      children: [/* @__PURE__ */ v.jsx(up, {}), /* @__PURE__ */ v.jsx(l0, {})],
    })
  ),
  gp = pp,
  mp = ({ target: e, ...t }) =>
    Do(
      /* @__PURE__ */ v.jsx(Bc, {
        className: Mt.hotspotButton,
        title: "Click to start conversation",
        ...t,
        children: /* @__PURE__ */ v.jsx(il, {}),
      }),
      e,
    ),
  Dl = mp,
  yp = () => {
    var l;
    const e = rt(),
      t = be((u) => u.codeblockLoaded),
      n = be((u) => u.manifest),
      [r, o] = he(0),
      s = (l = ui()) == null ? void 0 : l.parentElement,
      i = () => {
        var f;
        if (!s || !n.nodes) return;
        const u = di();
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
        e(Ci({ meta: d }));
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
        : /* @__PURE__ */ v.jsx(Dl, {
            target: s,
            onClick: i,
            style: { top: r * 21.2 },
          })
    );
  },
  vp = yp,
  Ep = () => {
    const e = rt(),
      t = be((o) => o.codeblockLoaded),
      n = fi(),
      r = () => {
        const o = {
          field: "description",
          highlight: n == null ? void 0 : n.innerText,
        };
        e(Ci({ meta: o }));
      };
    return !t || !n
      ? null
      : /* @__PURE__ */ v.jsx(Dl, { target: n, onClick: r });
  },
  Cp = Ep,
  bp = () =>
    /* @__PURE__ */ v.jsxs(v.Fragment, {
      children: [/* @__PURE__ */ v.jsx(Cp, {}), /* @__PURE__ */ v.jsx(vp, {})],
    }),
  _p = bp,
  xp = Fd(() => import("./DbtDocsRenderer.js")),
  wp = () => {
    const { loading: e, shareDetails: t } = o0(),
      n = rt(),
      { getHighlightedSelectionData: r, pos: o, onSelectionEnd: s } = s0(),
      i = (a) => {
        a.stopPropagation();
        const l = r();
        l && n(Ci(l));
      };
    return e
      ? /* @__PURE__ */ v.jsx("div", { children: "Loading..." })
      : !(t != null && t.catalog_presigned_url) ||
          !(t != null && t.manifest_presigned_url)
        ? /* @__PURE__ */ v.jsx("div", {
            children: "Unable to load required artifacts. Please try again.",
          })
        : /* @__PURE__ */ v.jsxs("div", {
            children: [
              /* @__PURE__ */ v.jsxs("div", {
                className: "d-flex justify-content-end mb-2",
                children: [
                  /* @__PURE__ */ v.jsx(_p, {}),
                  /* @__PURE__ */ v.jsx(G1, {}),
                ],
              }),
              /* @__PURE__ */ v.jsx(gp, {}),
              /* @__PURE__ */ v.jsx(xp, {
                shareDetails: t,
                onSelectionEnd: s,
              }),
              o ? /* @__PURE__ */ v.jsx(X1, { pos: o, onAddComment: i }) : null,
            ],
          });
  },
  Sp = wp,
  Np = ({ shareId: e, userId: t, conversationGroupId: n, source: r }) =>
    /* @__PURE__ */ v.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ v.jsx(S1, {
        shareId: e,
        userId: t,
        conversationGroupId: n,
        source: r,
        children: /* @__PURE__ */ v.jsx(Sp, {}),
      }),
    }),
  X5 = Np,
  Tp = {
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
  ao = nl({
    name: "lineageState",
    initialState: Tp,
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
    setSelectedTable: co,
    setMoreTables: Ol,
    mergeSeeMoreTables: Il,
    setSidebarScreen: kt,
    setSelectedColumn: Cn,
    setCollectColumns: Fs,
    mergeCollectColumns: Rl,
    setConfidence: Ap,
    updateConfidenceWithOperatorList: Ml,
    setLeftExpansion: K5,
    setRightExpansion: G5,
    setMinRange: lo,
    setNodeCount: uo,
    setSelectCheck: kl,
    setNonSelectCheck: Ll,
    setDefaultExpansion: Pl,
    setAiEnabled: Dp,
  } = ao.actions;
function ze(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, r; n < e.length; n++)
      (r = ze(e[n])) !== "" && (t += (t && " ") + r);
  else for (let n in e) e[n] && (t += (t && " ") + n);
  return t;
}
var Hs = { exports: {} },
  fs = {},
  Mr = { exports: {} },
  hs = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ja;
function Op() {
  if (ja) return hs;
  ja = 1;
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
    (hs.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c),
    hs
  );
}
var ps = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $a;
function Ip() {
  return (
    $a ||
      (($a = 1),
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
          function n(x) {
            {
              for (
                var b = arguments.length,
                  C = new Array(b > 1 ? b - 1 : 0),
                  A = 1;
                A < b;
                A++
              )
                C[A - 1] = arguments[A];
              r("error", x, C);
            }
          }
          function r(x, b, C) {
            {
              var A = t.ReactDebugCurrentFrame,
                O = A.getStackAddendum();
              O !== "" && ((b += "%s"), (C = C.concat([O])));
              var S = C.map(function (P) {
                return String(P);
              });
              S.unshift("Warning: " + b),
                Function.prototype.apply.call(console[x], console, S);
            }
          }
          function o(x, b) {
            return (
              (x === b && (x !== 0 || 1 / x === 1 / b)) || (x !== x && b !== b)
            );
          }
          var s = typeof Object.is == "function" ? Object.is : o,
            i = e.useState,
            a = e.useEffect,
            l = e.useLayoutEffect,
            u = e.useDebugValue,
            c = !1,
            d = !1;
          function f(x, b, C) {
            c ||
              (e.startTransition !== void 0 &&
                ((c = !0),
                n(
                  "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.",
                )));
            var A = b();
            if (!d) {
              var O = b();
              s(A, O) ||
                (n(
                  "The result of getSnapshot should be cached to avoid an infinite loop",
                ),
                (d = !0));
            }
            var S = i({
                inst: {
                  value: A,
                  getSnapshot: b,
                },
              }),
              P = S[0].inst,
              L = S[1];
            return (
              l(
                function () {
                  (P.value = A),
                    (P.getSnapshot = b),
                    h(P) &&
                      L({
                        inst: P,
                      });
                },
                [x, A, b],
              ),
              a(
                function () {
                  h(P) &&
                    L({
                      inst: P,
                    });
                  var j = function () {
                    h(P) &&
                      L({
                        inst: P,
                      });
                  };
                  return x(j);
                },
                [x],
              ),
              u(A),
              A
            );
          }
          function h(x) {
            var b = x.getSnapshot,
              C = x.value;
            try {
              var A = b();
              return !s(C, A);
            } catch {
              return !0;
            }
          }
          function p(x, b, C) {
            return b();
          }
          var g =
              typeof window < "u" &&
              typeof window.document < "u" &&
              typeof window.document.createElement < "u",
            m = !g,
            y = m ? p : f,
            _ = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y;
          (ps.useSyncExternalStore = _),
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                new Error(),
              );
        })()),
    ps
  );
}
var Fa;
function jl() {
  return (
    Fa ||
      ((Fa = 1),
      process.env.NODE_ENV === "production"
        ? (Mr.exports = Op())
        : (Mr.exports = Ip())),
    Mr.exports
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
var Ha;
function Rp() {
  if (Ha) return fs;
  Ha = 1;
  var e = $,
    t = jl();
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
    (fs.useSyncExternalStoreWithSelector = function (u, c, d, f, h) {
      var p = s(null);
      if (p.current === null) {
        var g = { hasValue: !1, value: null };
        p.current = g;
      } else g = p.current;
      p = a(
        function () {
          function y(A) {
            if (!_) {
              if (((_ = !0), (x = A), (A = f(A)), h !== void 0 && g.hasValue)) {
                var O = g.value;
                if (h(O, A)) return (b = O);
              }
              return (b = A);
            }
            if (((O = b), r(x, A))) return O;
            var S = f(A);
            return h !== void 0 && h(O, S) ? O : ((x = A), (b = S));
          }
          var _ = !1,
            x,
            b,
            C = d === void 0 ? null : d;
          return [
            function () {
              return y(c());
            },
            C === null
              ? void 0
              : function () {
                  return y(C());
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
    fs
  );
}
var gs = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ba;
function Mp() {
  return (
    Ba ||
      ((Ba = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
              "function" &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
              new Error(),
            );
          var e = $,
            t = jl();
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
            var y = a(
                function () {
                  var C = !1,
                    A,
                    O,
                    S = function (B) {
                      if (!C) {
                        (C = !0), (A = B);
                        var H = h(B);
                        if (p !== void 0 && m.hasValue) {
                          var E = m.value;
                          if (p(E, H)) return (O = E), E;
                        }
                        return (O = H), H;
                      }
                      var N = A,
                        w = O;
                      if (r(N, B)) return w;
                      var I = h(B);
                      return p !== void 0 && p(w, I)
                        ? w
                        : ((A = B), (O = I), I);
                    },
                    P = f === void 0 ? null : f,
                    L = function () {
                      return S(d());
                    },
                    j =
                      P === null
                        ? void 0
                        : function () {
                            return S(P());
                          };
                  return [L, j];
                },
                [d, f, h, p],
              ),
              _ = y[0],
              x = y[1],
              b = o(c, _, x);
            return (
              i(
                function () {
                  (m.hasValue = !0), (m.value = b);
                },
                [b],
              ),
              l(b),
              b
            );
          }
          (gs.useSyncExternalStoreWithSelector = u),
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                new Error(),
              );
        })()),
    gs
  );
}
process.env.NODE_ENV === "production"
  ? (Hs.exports = Rp())
  : (Hs.exports = Mp());
var kp = Hs.exports;
const Lp = /* @__PURE__ */ jn(kp);
var Pp = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const za = (e) => {
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
          (Pp ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            n.clear();
        },
      },
      u = (t = e(r, o, l));
    return l;
  },
  jp = (e) => (e ? za(e) : za),
  { useDebugValue: $p } = $,
  { useSyncExternalStoreWithSelector: Fp } = Lp,
  Hp = (e) => e;
function $l(e, t = Hp, n) {
  const r = Fp(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n,
  );
  return $p(r), r;
}
const Va = (e, t) => {
    const n = jp(e),
      r = (o, s = t) => $l(n, o, s);
    return Object.assign(r, n), r;
  },
  Bp = (e, t) => (e ? Va(e, t) : Va);
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
var zp = { value: () => {} };
function $o() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Xr(n);
}
function Xr(e) {
  this._ = e;
}
function Vp(e, t) {
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
Xr.prototype = $o.prototype = {
  constructor: Xr,
  on: function (e, t) {
    var n = this._,
      r = Vp(e + "", n),
      o,
      s = -1,
      i = r.length;
    if (arguments.length < 2) {
      for (; ++s < i; )
        if ((o = (e = r[s]).type) && (o = Wp(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++s < i; )
      if ((o = (e = r[s]).type)) n[o] = Wa(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = Wa(n[o], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Xr(e);
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
function Wp(e, t) {
  for (var n = 0, r = e.length, o; n < r; ++n)
    if ((o = e[n]).name === t) return o.value;
}
function Wa(e, t, n) {
  for (var r = 0, o = e.length; r < o; ++r)
    if (e[r].name === t) {
      (e[r] = zp), (e = e.slice(0, r).concat(e.slice(r + 1)));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Bs = "http://www.w3.org/1999/xhtml";
const Ua = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Bs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Fo(e) {
  var t = (e += ""),
    n = t.indexOf(":");
  return (
    n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)),
    Ua.hasOwnProperty(t) ? { space: Ua[t], local: e } : e
  );
}
function Up(e) {
  return function () {
    var t = this.ownerDocument,
      n = this.namespaceURI;
    return n === Bs && t.documentElement.namespaceURI === Bs
      ? t.createElement(e)
      : t.createElementNS(n, e);
  };
}
function Yp(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Fl(e) {
  var t = Fo(e);
  return (t.local ? Yp : Up)(t);
}
function qp() {}
function Ni(e) {
  return e == null
    ? qp
    : function () {
        return this.querySelector(e);
      };
}
function Zp(e) {
  typeof e != "function" && (e = Ni(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (
      var s = t[o], i = s.length, a = (r[o] = new Array(i)), l, u, c = 0;
      c < i;
      ++c
    )
      (l = s[c]) &&
        (u = e.call(l, l.__data__, c, s)) &&
        ("__data__" in l && (u.__data__ = l.__data__), (a[c] = u));
  return new Ke(r, this._parents);
}
function Xp(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Kp() {
  return [];
}
function Hl(e) {
  return e == null
    ? Kp
    : function () {
        return this.querySelectorAll(e);
      };
}
function Gp(e) {
  return function () {
    return Xp(e.apply(this, arguments));
  };
}
function Jp(e) {
  typeof e == "function" ? (e = Gp(e)) : (e = Hl(e));
  for (var t = this._groups, n = t.length, r = [], o = [], s = 0; s < n; ++s)
    for (var i = t[s], a = i.length, l, u = 0; u < a; ++u)
      (l = i[u]) && (r.push(e.call(l, l.__data__, u, i)), o.push(l));
  return new Ke(r, o);
}
function Bl(e) {
  return function () {
    return this.matches(e);
  };
}
function zl(e) {
  return function (t) {
    return t.matches(e);
  };
}
var Qp = Array.prototype.find;
function eg(e) {
  return function () {
    return Qp.call(this.children, e);
  };
}
function tg() {
  return this.firstElementChild;
}
function ng(e) {
  return this.select(e == null ? tg : eg(typeof e == "function" ? e : zl(e)));
}
var rg = Array.prototype.filter;
function og() {
  return Array.from(this.children);
}
function sg(e) {
  return function () {
    return rg.call(this.children, e);
  };
}
function ig(e) {
  return this.selectAll(
    e == null ? og : sg(typeof e == "function" ? e : zl(e)),
  );
}
function ag(e) {
  typeof e != "function" && (e = Bl(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], i = s.length, a = (r[o] = []), l, u = 0; u < i; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && a.push(l);
  return new Ke(r, this._parents);
}
function Vl(e) {
  return new Array(e.length);
}
function cg() {
  return new Ke(this._enter || this._groups.map(Vl), this._parents);
}
function fo(e, t) {
  (this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = t);
}
fo.prototype = {
  constructor: fo,
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
function lg(e) {
  return function () {
    return e;
  };
}
function ug(e, t, n, r, o, s) {
  for (var i = 0, a, l = t.length, u = s.length; i < u; ++i)
    (a = t[i]) ? ((a.__data__ = s[i]), (r[i] = a)) : (n[i] = new fo(e, s[i]));
  for (; i < l; ++i) (a = t[i]) && (o[i] = a);
}
function dg(e, t, n, r, o, s, i) {
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
        : (n[a] = new fo(e, s[a]));
  for (a = 0; a < c; ++a) (l = t[a]) && u.get(f[a]) === l && (o[a] = l);
}
function fg(e) {
  return e.__data__;
}
function hg(e, t) {
  if (!arguments.length) return Array.from(this, fg);
  var n = t ? dg : ug,
    r = this._parents,
    o = this._groups;
  typeof e != "function" && (e = lg(e));
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
      h = pg(e.call(c, c && c.__data__, u, r)),
      p = h.length,
      g = (a[u] = new Array(p)),
      m = (i[u] = new Array(p)),
      y = (l[u] = new Array(f));
    n(c, d, g, m, y, h, t);
    for (var _ = 0, x = 0, b, C; _ < p; ++_)
      if ((b = g[_])) {
        for (_ >= x && (x = _ + 1); !(C = m[x]) && ++x < p; );
        b._next = C || null;
      }
  }
  return (i = new Ke(i, r)), (i._enter = a), (i._exit = l), i;
}
function pg(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function gg() {
  return new Ke(this._exit || this._groups.map(Vl), this._parents);
}
function mg(e, t, n) {
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
function yg(e) {
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
  return new Ke(a, this._parents);
}
function vg() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], o = r.length - 1, s = r[o], i; --o >= 0; )
      (i = r[o]) &&
        (s &&
          i.compareDocumentPosition(s) ^ 4 &&
          s.parentNode.insertBefore(i, s),
        (s = i));
  return this;
}
function Eg(e) {
  e || (e = Cg);
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
  return new Ke(o, this._parents).order();
}
function Cg(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function bg() {
  var e = arguments[0];
  return (arguments[0] = this), e.apply(null, arguments), this;
}
function _g() {
  return Array.from(this);
}
function xg() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, s = r.length; o < s; ++o) {
      var i = r[o];
      if (i) return i;
    }
  return null;
}
function wg() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Sg() {
  return !this.node();
}
function Ng(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var o = t[n], s = 0, i = o.length, a; s < i; ++s)
      (a = o[s]) && e.call(a, a.__data__, s, o);
  return this;
}
function Tg(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function Ag(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Dg(e, t) {
  return function () {
    this.setAttribute(e, t);
  };
}
function Og(e, t) {
  return function () {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ig(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Rg(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, n);
  };
}
function Mg(e, t) {
  var n = Fo(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each(
    (t == null
      ? n.local
        ? Ag
        : Tg
      : typeof t == "function"
        ? n.local
          ? Rg
          : Ig
        : n.local
          ? Og
          : Dg)(n, t),
  );
}
function Wl(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
function kg(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function Lg(e, t, n) {
  return function () {
    this.style.setProperty(e, t, n);
  };
}
function Pg(e, t, n) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function jg(e, t, n) {
  return arguments.length > 1
    ? this.each(
        (t == null ? kg : typeof t == "function" ? Pg : Lg)(e, t, n ?? ""),
      )
    : Rn(this.node(), e);
}
function Rn(e, t) {
  return (
    e.style.getPropertyValue(t) ||
    Wl(e).getComputedStyle(e, null).getPropertyValue(t)
  );
}
function $g(e) {
  return function () {
    delete this[e];
  };
}
function Fg(e, t) {
  return function () {
    this[e] = t;
  };
}
function Hg(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : (this[e] = n);
  };
}
function Bg(e, t) {
  return arguments.length > 1
    ? this.each((t == null ? $g : typeof t == "function" ? Hg : Fg)(e, t))
    : this.node()[e];
}
function Ul(e) {
  return e.trim().split(/^|\s+/);
}
function Ti(e) {
  return e.classList || new Yl(e);
}
function Yl(e) {
  (this._node = e), (this._names = Ul(e.getAttribute("class") || ""));
}
Yl.prototype = {
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
function ql(e, t) {
  for (var n = Ti(e), r = -1, o = t.length; ++r < o; ) n.add(t[r]);
}
function Zl(e, t) {
  for (var n = Ti(e), r = -1, o = t.length; ++r < o; ) n.remove(t[r]);
}
function zg(e) {
  return function () {
    ql(this, e);
  };
}
function Vg(e) {
  return function () {
    Zl(this, e);
  };
}
function Wg(e, t) {
  return function () {
    (t.apply(this, arguments) ? ql : Zl)(this, e);
  };
}
function Ug(e, t) {
  var n = Ul(e + "");
  if (arguments.length < 2) {
    for (var r = Ti(this.node()), o = -1, s = n.length; ++o < s; )
      if (!r.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Wg : t ? zg : Vg)(n, t));
}
function Yg() {
  this.textContent = "";
}
function qg(e) {
  return function () {
    this.textContent = e;
  };
}
function Zg(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Xg(e) {
  return arguments.length
    ? this.each(e == null ? Yg : (typeof e == "function" ? Zg : qg)(e))
    : this.node().textContent;
}
function Kg() {
  this.innerHTML = "";
}
function Gg(e) {
  return function () {
    this.innerHTML = e;
  };
}
function Jg(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Qg(e) {
  return arguments.length
    ? this.each(e == null ? Kg : (typeof e == "function" ? Jg : Gg)(e))
    : this.node().innerHTML;
}
function e2() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function t2() {
  return this.each(e2);
}
function n2() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function r2() {
  return this.each(n2);
}
function o2(e) {
  var t = typeof e == "function" ? e : Fl(e);
  return this.select(function () {
    return this.appendChild(t.apply(this, arguments));
  });
}
function s2() {
  return null;
}
function i2(e, t) {
  var n = typeof e == "function" ? e : Fl(e),
    r = t == null ? s2 : typeof t == "function" ? t : Ni(t);
  return this.select(function () {
    return this.insertBefore(
      n.apply(this, arguments),
      r.apply(this, arguments) || null,
    );
  });
}
function a2() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function c2() {
  return this.each(a2);
}
function l2() {
  var e = this.cloneNode(!1),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function u2() {
  var e = this.cloneNode(!0),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function d2(e) {
  return this.select(e ? u2 : l2);
}
function f2(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function h2(e) {
  return function (t) {
    e.call(this, t, this.__data__);
  };
}
function p2(e) {
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
function g2(e) {
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
function m2(e, t, n) {
  return function () {
    var r = this.__on,
      o,
      s = h2(t);
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
function y2(e, t, n) {
  var r = p2(e + ""),
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
  for (a = t ? m2 : g2, o = 0; o < s; ++o) this.each(a(r[o], t, n));
  return this;
}
function Xl(e, t, n) {
  var r = Wl(e),
    o = r.CustomEvent;
  typeof o == "function"
    ? (o = new o(t, n))
    : ((o = r.document.createEvent("Event")),
      n
        ? (o.initEvent(t, n.bubbles, n.cancelable), (o.detail = n.detail))
        : o.initEvent(t, !1, !1)),
    e.dispatchEvent(o);
}
function v2(e, t) {
  return function () {
    return Xl(this, e, t);
  };
}
function E2(e, t) {
  return function () {
    return Xl(this, e, t.apply(this, arguments));
  };
}
function C2(e, t) {
  return this.each((typeof t == "function" ? E2 : v2)(e, t));
}
function* b2() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, s = r.length, i; o < s; ++o)
      (i = r[o]) && (yield i);
}
var Kl = [null];
function Ke(e, t) {
  (this._groups = e), (this._parents = t);
}
function yr() {
  return new Ke([[document.documentElement]], Kl);
}
function _2() {
  return this;
}
Ke.prototype = yr.prototype = {
  constructor: Ke,
  select: Zp,
  selectAll: Jp,
  selectChild: ng,
  selectChildren: ig,
  filter: ag,
  data: hg,
  enter: cg,
  exit: gg,
  join: mg,
  merge: yg,
  selection: _2,
  order: vg,
  sort: Eg,
  call: bg,
  nodes: _g,
  node: xg,
  size: wg,
  empty: Sg,
  each: Ng,
  attr: Mg,
  style: jg,
  property: Bg,
  classed: Ug,
  text: Xg,
  html: Qg,
  raise: t2,
  lower: r2,
  append: o2,
  insert: i2,
  remove: c2,
  clone: d2,
  datum: f2,
  on: y2,
  dispatch: C2,
  [Symbol.iterator]: b2,
};
function lt(e) {
  return typeof e == "string"
    ? new Ke([[document.querySelector(e)]], [document.documentElement])
    : new Ke([[e]], Kl);
}
function x2(e) {
  let t;
  for (; (t = e.sourceEvent); ) e = t;
  return e;
}
function vt(e, t) {
  if (((e = x2(e)), t === void 0 && (t = e.currentTarget), t)) {
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
const w2 = { passive: !1 },
  ir = { capture: !0, passive: !1 };
function ms(e) {
  e.stopImmediatePropagation();
}
function wn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Gl(e) {
  var t = e.document.documentElement,
    n = lt(e).on("dragstart.drag", wn, ir);
  "onselectstart" in t
    ? n.on("selectstart.drag", wn, ir)
    : ((t.__noselect = t.style.MozUserSelect),
      (t.style.MozUserSelect = "none"));
}
function Jl(e, t) {
  var n = e.document.documentElement,
    r = lt(e).on("dragstart.drag", null);
  t &&
    (r.on("click.drag", wn, ir),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in n
      ? r.on("selectstart.drag", null)
      : ((n.style.MozUserSelect = n.__noselect), delete n.__noselect);
}
const kr = (e) => () => e;
function zs(
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
zs.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function S2(e) {
  return !e.ctrlKey && !e.button;
}
function N2() {
  return this.parentNode;
}
function T2(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function A2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function D2() {
  var e = S2,
    t = N2,
    n = T2,
    r = A2,
    o = {},
    s = $o("start", "drag", "end"),
    i = 0,
    a,
    l,
    u,
    c,
    d = 0;
  function f(b) {
    b.on("mousedown.drag", h)
      .filter(r)
      .on("touchstart.drag", m)
      .on("touchmove.drag", y, w2)
      .on("touchend.drag touchcancel.drag", _)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, C) {
    if (!(c || !e.call(this, b, C))) {
      var A = x(this, t.call(this, b, C), b, C, "mouse");
      A &&
        (lt(b.view).on("mousemove.drag", p, ir).on("mouseup.drag", g, ir),
        Gl(b.view),
        ms(b),
        (u = !1),
        (a = b.clientX),
        (l = b.clientY),
        A("start", b));
    }
  }
  function p(b) {
    if ((wn(b), !u)) {
      var C = b.clientX - a,
        A = b.clientY - l;
      u = C * C + A * A > d;
    }
    o.mouse("drag", b);
  }
  function g(b) {
    lt(b.view).on("mousemove.drag mouseup.drag", null),
      Jl(b.view, u),
      wn(b),
      o.mouse("end", b);
  }
  function m(b, C) {
    if (e.call(this, b, C)) {
      var A = b.changedTouches,
        O = t.call(this, b, C),
        S = A.length,
        P,
        L;
      for (P = 0; P < S; ++P)
        (L = x(this, O, b, C, A[P].identifier, A[P])) &&
          (ms(b), L("start", b, A[P]));
    }
  }
  function y(b) {
    var C = b.changedTouches,
      A = C.length,
      O,
      S;
    for (O = 0; O < A; ++O)
      (S = o[C[O].identifier]) && (wn(b), S("drag", b, C[O]));
  }
  function _(b) {
    var C = b.changedTouches,
      A = C.length,
      O,
      S;
    for (
      c && clearTimeout(c),
        c = setTimeout(function () {
          c = null;
        }, 500),
        O = 0;
      O < A;
      ++O
    )
      (S = o[C[O].identifier]) && (ms(b), S("end", b, C[O]));
  }
  function x(b, C, A, O, S, P) {
    var L = s.copy(),
      j = vt(P || A, C),
      B,
      H,
      E;
    if (
      (E = n.call(
        b,
        new zs("beforestart", {
          sourceEvent: A,
          target: f,
          identifier: S,
          active: i,
          x: j[0],
          y: j[1],
          dx: 0,
          dy: 0,
          dispatch: L,
        }),
        O,
      )) != null
    )
      return (
        (B = E.x - j[0] || 0),
        (H = E.y - j[1] || 0),
        function N(w, I, k) {
          var D = j,
            T;
          switch (w) {
            case "start":
              (o[S] = N), (T = i++);
              break;
            case "end":
              delete o[S], --i;
            case "drag":
              (j = vt(k || I, C)), (T = i);
              break;
          }
          L.call(
            w,
            b,
            new zs(w, {
              sourceEvent: I,
              subject: E,
              target: f,
              identifier: S,
              active: T,
              x: j[0] + B,
              y: j[1] + H,
              dx: j[0] - D[0],
              dy: j[1] - D[1],
              dispatch: L,
            }),
            O,
          );
        }
      );
  }
  return (
    (f.filter = function (b) {
      return arguments.length
        ? ((e = typeof b == "function" ? b : kr(!!b)), f)
        : e;
    }),
    (f.container = function (b) {
      return arguments.length
        ? ((t = typeof b == "function" ? b : kr(b)), f)
        : t;
    }),
    (f.subject = function (b) {
      return arguments.length
        ? ((n = typeof b == "function" ? b : kr(b)), f)
        : n;
    }),
    (f.touchable = function (b) {
      return arguments.length
        ? ((r = typeof b == "function" ? b : kr(!!b)), f)
        : r;
    }),
    (f.on = function () {
      var b = s.on.apply(s, arguments);
      return b === s ? f : b;
    }),
    (f.clickDistance = function (b) {
      return arguments.length ? ((d = (b = +b) * b), f) : Math.sqrt(d);
    }),
    f
  );
}
function Ai(e, t, n) {
  (e.prototype = t.prototype = n), (n.constructor = e);
}
function Ql(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function vr() {}
var ar = 0.7,
  ho = 1 / ar,
  Sn = "\\s*([+-]?\\d+)\\s*",
  cr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  O2 = /^#([0-9a-f]{3,8})$/,
  I2 = new RegExp(`^rgb\\(${Sn},${Sn},${Sn}\\)$`),
  R2 = new RegExp(`^rgb\\(${Ct},${Ct},${Ct}\\)$`),
  M2 = new RegExp(`^rgba\\(${Sn},${Sn},${Sn},${cr}\\)$`),
  k2 = new RegExp(`^rgba\\(${Ct},${Ct},${Ct},${cr}\\)$`),
  L2 = new RegExp(`^hsl\\(${cr},${Ct},${Ct}\\)$`),
  P2 = new RegExp(`^hsla\\(${cr},${Ct},${Ct},${cr}\\)$`),
  Ya = {
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
Ai(vr, lr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: qa,
  // Deprecated! Use color.formatHex.
  formatHex: qa,
  formatHex8: j2,
  formatHsl: $2,
  formatRgb: Za,
  toString: Za,
});
function qa() {
  return this.rgb().formatHex();
}
function j2() {
  return this.rgb().formatHex8();
}
function $2() {
  return eu(this).formatHsl();
}
function Za() {
  return this.rgb().formatRgb();
}
function lr(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = O2.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? Xa(t)
          : n === 3
            ? new Ue(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : n === 8
              ? Lr(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255,
                )
              : n === 4
                ? Lr(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = I2.exec(e))
        ? new Ue(t[1], t[2], t[3], 1)
        : (t = R2.exec(e))
          ? new Ue(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1,
            )
          : (t = M2.exec(e))
            ? Lr(t[1], t[2], t[3], t[4])
            : (t = k2.exec(e))
              ? Lr(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4],
                )
              : (t = L2.exec(e))
                ? Ja(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = P2.exec(e))
                  ? Ja(t[1], t[2] / 100, t[3] / 100, t[4])
                  : Ya.hasOwnProperty(e)
                    ? Xa(Ya[e])
                    : e === "transparent"
                      ? new Ue(NaN, NaN, NaN, 0)
                      : null
  );
}
function Xa(e) {
  return new Ue((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function Lr(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new Ue(e, t, n, r);
}
function F2(e) {
  return (
    e instanceof vr || (e = lr(e)),
    e ? ((e = e.rgb()), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue()
  );
}
function Vs(e, t, n, r) {
  return arguments.length === 1 ? F2(e) : new Ue(e, t, n, r ?? 1);
}
function Ue(e, t, n, r) {
  (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r);
}
Ai(
  Ue,
  Vs,
  Ql(vr, {
    brighter(e) {
      return (
        (e = e == null ? ho : Math.pow(ho, e)),
        new Ue(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? ar : Math.pow(ar, e)),
        new Ue(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Ue(cn(this.r), cn(this.g), cn(this.b), po(this.opacity));
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
    hex: Ka,
    // Deprecated! Use color.formatHex.
    formatHex: Ka,
    formatHex8: H2,
    formatRgb: Ga,
    toString: Ga,
  }),
);
function Ka() {
  return `#${sn(this.r)}${sn(this.g)}${sn(this.b)}`;
}
function H2() {
  return `#${sn(this.r)}${sn(this.g)}${sn(this.b)}${sn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ga() {
  const e = po(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${cn(this.r)}, ${cn(this.g)}, ${cn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function po(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function cn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function sn(e) {
  return (e = cn(e)), (e < 16 ? "0" : "") + e.toString(16);
}
function Ja(e, t, n, r) {
  return (
    r <= 0
      ? (e = t = n = NaN)
      : n <= 0 || n >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new ut(e, t, n, r)
  );
}
function eu(e) {
  if (e instanceof ut) return new ut(e.h, e.s, e.l, e.opacity);
  if ((e instanceof vr || (e = lr(e)), !e)) return new ut();
  if (e instanceof ut) return e;
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
    new ut(i, a, l, e.opacity)
  );
}
function B2(e, t, n, r) {
  return arguments.length === 1 ? eu(e) : new ut(e, t, n, r ?? 1);
}
function ut(e, t, n, r) {
  (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r);
}
Ai(
  ut,
  B2,
  Ql(vr, {
    brighter(e) {
      return (
        (e = e == null ? ho : Math.pow(ho, e)),
        new ut(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? ar : Math.pow(ar, e)),
        new ut(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        o = 2 * n - r;
      return new Ue(
        ys(e >= 240 ? e - 240 : e + 120, o, r),
        ys(e, o, r),
        ys(e < 120 ? e + 240 : e - 120, o, r),
        this.opacity,
      );
    },
    clamp() {
      return new ut(Qa(this.h), Pr(this.s), Pr(this.l), po(this.opacity));
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
      const e = po(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${Qa(this.h)}, ${Pr(this.s) * 100}%, ${Pr(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function Qa(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function Pr(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ys(e, t, n) {
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
const tu = (e) => () => e;
function z2(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function V2(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (r) {
      return Math.pow(e + r * t, n);
    }
  );
}
function W2(e) {
  return (e = +e) == 1
    ? nu
    : function (t, n) {
        return n - t ? V2(t, n, e) : tu(isNaN(t) ? n : t);
      };
}
function nu(e, t) {
  var n = t - e;
  return n ? z2(e, n) : tu(isNaN(e) ? t : e);
}
const ec = (function e(t) {
  var n = W2(t);
  function r(o, s) {
    var i = n((o = Vs(o)).r, (s = Vs(s)).r),
      a = n(o.g, s.g),
      l = n(o.b, s.b),
      u = nu(o.opacity, s.opacity);
    return function (c) {
      return (
        (o.r = i(c)), (o.g = a(c)), (o.b = l(c)), (o.opacity = u(c)), o + ""
      );
    };
  }
  return (r.gamma = e), r;
})(1);
function Wt(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
var Ws = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  vs = new RegExp(Ws.source, "g");
function U2(e) {
  return function () {
    return e;
  };
}
function Y2(e) {
  return function (t) {
    return e(t) + "";
  };
}
function q2(e, t) {
  var n = (Ws.lastIndex = vs.lastIndex = 0),
    r,
    o,
    s,
    i = -1,
    a = [],
    l = [];
  for (e = e + "", t = t + ""; (r = Ws.exec(e)) && (o = vs.exec(t)); )
    (s = o.index) > n &&
      ((s = t.slice(n, s)), a[i] ? (a[i] += s) : (a[++i] = s)),
      (r = r[0]) === (o = o[0])
        ? a[i]
          ? (a[i] += o)
          : (a[++i] = o)
        : ((a[++i] = null), l.push({ i, x: Wt(r, o) })),
      (n = vs.lastIndex);
  return (
    n < t.length && ((s = t.slice(n)), a[i] ? (a[i] += s) : (a[++i] = s)),
    a.length < 2
      ? l[0]
        ? Y2(l[0].x)
        : U2(t)
      : ((t = l.length),
        function (u) {
          for (var c = 0, d; c < t; ++c) a[(d = l[c]).i] = d.x(u);
          return a.join("");
        })
  );
}
var tc = 180 / Math.PI,
  Us = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function ru(e, t, n, r, o, s) {
  var i, a, l;
  return (
    (i = Math.sqrt(e * e + t * t)) && ((e /= i), (t /= i)),
    (l = e * n + t * r) && ((n -= e * l), (r -= t * l)),
    (a = Math.sqrt(n * n + r * r)) && ((n /= a), (r /= a), (l /= a)),
    e * r < t * n && ((e = -e), (t = -t), (l = -l), (i = -i)),
    {
      translateX: o,
      translateY: s,
      rotate: Math.atan2(t, e) * tc,
      skewX: Math.atan(l) * tc,
      scaleX: i,
      scaleY: a,
    }
  );
}
var jr;
function Z2(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + "",
  );
  return t.isIdentity ? Us : ru(t.a, t.b, t.c, t.d, t.e, t.f);
}
function X2(e) {
  return e == null ||
    (jr || (jr = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    jr.setAttribute("transform", e),
    !(e = jr.transform.baseVal.consolidate()))
    ? Us
    : ((e = e.matrix), ru(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ou(e, t, n, r) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, c, d, f, h, p) {
    if (u !== d || c !== f) {
      var g = h.push("translate(", null, t, null, n);
      p.push({ i: g - 4, x: Wt(u, d) }, { i: g - 2, x: Wt(c, f) });
    } else (d || f) && h.push("translate(" + d + t + f + n);
  }
  function i(u, c, d, f) {
    u !== c
      ? (u - c > 180 ? (c += 360) : c - u > 180 && (u += 360),
        f.push({ i: d.push(o(d) + "rotate(", null, r) - 2, x: Wt(u, c) }))
      : c && d.push(o(d) + "rotate(" + c + r);
  }
  function a(u, c, d, f) {
    u !== c
      ? f.push({ i: d.push(o(d) + "skewX(", null, r) - 2, x: Wt(u, c) })
      : c && d.push(o(d) + "skewX(" + c + r);
  }
  function l(u, c, d, f, h, p) {
    if (u !== d || c !== f) {
      var g = h.push(o(h) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: Wt(u, d) }, { i: g - 2, x: Wt(c, f) });
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
var K2 = ou(Z2, "px, ", "px)", "deg)"),
  G2 = ou(X2, ", ", ")", ")"),
  J2 = 1e-12;
function nc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Q2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function em(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const tm = (function e(t, n, r) {
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
      y;
    if (g < J2)
      (y = Math.log(f / u) / t),
        (m = function (O) {
          return [a + O * h, l + O * p, u * Math.exp(t * O * y)];
        });
    else {
      var _ = Math.sqrt(g),
        x = (f * f - u * u + r * g) / (2 * u * n * _),
        b = (f * f - u * u - r * g) / (2 * f * n * _),
        C = Math.log(Math.sqrt(x * x + 1) - x),
        A = Math.log(Math.sqrt(b * b + 1) - b);
      (y = (A - C) / t),
        (m = function (O) {
          var S = O * y,
            P = nc(C),
            L = (u / (n * _)) * (P * em(t * S + C) - Q2(C));
          return [a + L * h, l + L * p, (u * P) / nc(t * S + C)];
        });
    }
    return (m.duration = (y * 1e3 * t) / Math.SQRT2), m;
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
var Mn = 0,
  Kn = 0,
  Wn = 0,
  su = 1e3,
  go,
  Gn,
  mo = 0,
  un = 0,
  Ho = 0,
  ur = typeof performance == "object" && performance.now ? performance : Date,
  iu =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function Di() {
  return un || (iu(nm), (un = ur.now() + Ho));
}
function nm() {
  un = 0;
}
function yo() {
  this._call = this._time = this._next = null;
}
yo.prototype = au.prototype = {
  constructor: yo,
  restart: function (e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    (n = (n == null ? Di() : +n) + (t == null ? 0 : +t)),
      !this._next &&
        Gn !== this &&
        (Gn ? (Gn._next = this) : (go = this), (Gn = this)),
      (this._call = e),
      (this._time = n),
      Ys();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ys());
  },
};
function au(e, t, n) {
  var r = new yo();
  return r.restart(e, t, n), r;
}
function rm() {
  Di(), ++Mn;
  for (var e = go, t; e; )
    (t = un - e._time) >= 0 && e._call.call(void 0, t), (e = e._next);
  --Mn;
}
function rc() {
  (un = (mo = ur.now()) + Ho), (Mn = Kn = 0);
  try {
    rm();
  } finally {
    (Mn = 0), sm(), (un = 0);
  }
}
function om() {
  var e = ur.now(),
    t = e - mo;
  t > su && ((Ho -= t), (mo = e));
}
function sm() {
  for (var e, t = go, n, r = 1 / 0; t; )
    t._call
      ? (r > t._time && (r = t._time), (e = t), (t = t._next))
      : ((n = t._next), (t._next = null), (t = e ? (e._next = n) : (go = n)));
  (Gn = e), Ys(r);
}
function Ys(e) {
  if (!Mn) {
    Kn && (Kn = clearTimeout(Kn));
    var t = e - un;
    t > 24
      ? (e < 1 / 0 && (Kn = setTimeout(rc, e - ur.now() - Ho)),
        Wn && (Wn = clearInterval(Wn)))
      : (Wn || ((mo = ur.now()), (Wn = setInterval(om, su))), (Mn = 1), iu(rc));
  }
}
function oc(e, t, n) {
  var r = new yo();
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
var im = $o("start", "end", "cancel", "interrupt"),
  am = [],
  cu = 0,
  sc = 1,
  qs = 2,
  Kr = 3,
  ic = 4,
  Zs = 5,
  Gr = 6;
function Bo(e, t, n, r, o, s) {
  var i = e.__transition;
  if (!i) e.__transition = {};
  else if (n in i) return;
  cm(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: o,
    // For context during callback.
    on: im,
    tween: am,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: cu,
  });
}
function Oi(e, t) {
  var n = pt(e, t);
  if (n.state > cu) throw new Error("too late; already scheduled");
  return n;
}
function _t(e, t) {
  var n = pt(e, t);
  if (n.state > Kr) throw new Error("too late; already running");
  return n;
}
function pt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function cm(e, t, n) {
  var r = e.__transition,
    o;
  (r[t] = n), (n.timer = au(s, 0, n.time));
  function s(u) {
    (n.state = sc),
      n.timer.restart(i, n.delay, n.time),
      n.delay <= u && i(u - n.delay);
  }
  function i(u) {
    var c, d, f, h;
    if (n.state !== sc) return l();
    for (c in r)
      if (((h = r[c]), h.name === n.name)) {
        if (h.state === Kr) return oc(i);
        h.state === ic
          ? ((h.state = Gr),
            h.timer.stop(),
            h.on.call("interrupt", e, e.__data__, h.index, h.group),
            delete r[c])
          : +c < t &&
            ((h.state = Gr),
            h.timer.stop(),
            h.on.call("cancel", e, e.__data__, h.index, h.group),
            delete r[c]);
      }
    if (
      (oc(function () {
        n.state === Kr &&
          ((n.state = ic), n.timer.restart(a, n.delay, n.time), a(u));
      }),
      (n.state = qs),
      n.on.call("start", e, e.__data__, n.index, n.group),
      n.state === qs)
    ) {
      for (
        n.state = Kr, o = new Array((f = n.tween.length)), c = 0, d = -1;
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
            : (n.timer.restart(l), (n.state = Zs), 1),
        d = -1,
        f = o.length;
      ++d < f;

    )
      o[d].call(e, c);
    n.state === Zs && (n.on.call("end", e, e.__data__, n.index, n.group), l());
  }
  function l() {
    (n.state = Gr), n.timer.stop(), delete r[t];
    for (var u in r) return;
    delete e.__transition;
  }
}
function Jr(e, t) {
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
      (o = r.state > qs && r.state < Zs),
        (r.state = Gr),
        r.timer.stop(),
        r.on.call(o ? "interrupt" : "cancel", e, e.__data__, r.index, r.group),
        delete n[i];
    }
    s && delete e.__transition;
  }
}
function lm(e) {
  return this.each(function () {
    Jr(this, e);
  });
}
function um(e, t) {
  var n, r;
  return function () {
    var o = _t(this, e),
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
function dm(e, t, n) {
  var r, o;
  if (typeof n != "function") throw new Error();
  return function () {
    var s = _t(this, e),
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
function fm(e, t) {
  var n = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var r = pt(this.node(), n).tween, o = 0, s = r.length, i; o < s; ++o)
      if ((i = r[o]).name === e) return i.value;
    return null;
  }
  return this.each((t == null ? um : dm)(n, e, t));
}
function Ii(e, t, n) {
  var r = e._id;
  return (
    e.each(function () {
      var o = _t(this, r);
      (o.value || (o.value = {}))[t] = n.apply(this, arguments);
    }),
    function (o) {
      return pt(o, r).value[t];
    }
  );
}
function lu(e, t) {
  var n;
  return (
    typeof t == "number"
      ? Wt
      : t instanceof lr
        ? ec
        : (n = lr(t))
          ? ((t = n), ec)
          : q2
  )(e, t);
}
function hm(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function pm(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function gm(e, t, n) {
  var r,
    o = n + "",
    s;
  return function () {
    var i = this.getAttribute(e);
    return i === o ? null : i === r ? s : (s = t((r = i), n));
  };
}
function mm(e, t, n) {
  var r,
    o = n + "",
    s;
  return function () {
    var i = this.getAttributeNS(e.space, e.local);
    return i === o ? null : i === r ? s : (s = t((r = i), n));
  };
}
function ym(e, t, n) {
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
function vm(e, t, n) {
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
function Em(e, t) {
  var n = Fo(e),
    r = n === "transform" ? G2 : lu;
  return this.attrTween(
    e,
    typeof t == "function"
      ? (n.local ? vm : ym)(n, r, Ii(this, "attr." + e, t))
      : t == null
        ? (n.local ? pm : hm)(n)
        : (n.local ? mm : gm)(n, r, t),
  );
}
function Cm(e, t) {
  return function (n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function bm(e, t) {
  return function (n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function _m(e, t) {
  var n, r;
  function o() {
    var s = t.apply(this, arguments);
    return s !== r && (n = (r = s) && bm(e, s)), n;
  }
  return (o._value = t), o;
}
function xm(e, t) {
  var n, r;
  function o() {
    var s = t.apply(this, arguments);
    return s !== r && (n = (r = s) && Cm(e, s)), n;
  }
  return (o._value = t), o;
}
function wm(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = Fo(e);
  return this.tween(n, (r.local ? _m : xm)(r, t));
}
function Sm(e, t) {
  return function () {
    Oi(this, e).delay = +t.apply(this, arguments);
  };
}
function Nm(e, t) {
  return (
    (t = +t),
    function () {
      Oi(this, e).delay = t;
    }
  );
}
function Tm(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? Sm : Nm)(t, e))
    : pt(this.node(), t).delay;
}
function Am(e, t) {
  return function () {
    _t(this, e).duration = +t.apply(this, arguments);
  };
}
function Dm(e, t) {
  return (
    (t = +t),
    function () {
      _t(this, e).duration = t;
    }
  );
}
function Om(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? Am : Dm)(t, e))
    : pt(this.node(), t).duration;
}
function Im(e, t) {
  if (typeof t != "function") throw new Error();
  return function () {
    _t(this, e).ease = t;
  };
}
function Rm(e) {
  var t = this._id;
  return arguments.length ? this.each(Im(t, e)) : pt(this.node(), t).ease;
}
function Mm(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    _t(this, e).ease = n;
  };
}
function km(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Mm(this._id, e));
}
function Lm(e) {
  typeof e != "function" && (e = Bl(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], i = s.length, a = (r[o] = []), l, u = 0; u < i; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && a.push(l);
  return new Lt(r, this._parents, this._name, this._id);
}
function Pm(e) {
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
  return new Lt(i, this._parents, this._name, this._id);
}
function jm(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (t) {
      var n = t.indexOf(".");
      return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
    });
}
function $m(e, t, n) {
  var r,
    o,
    s = jm(t) ? Oi : _t;
  return function () {
    var i = s(this, e),
      a = i.on;
    a !== r && (o = (r = a).copy()).on(t, n), (i.on = o);
  };
}
function Fm(e, t) {
  var n = this._id;
  return arguments.length < 2
    ? pt(this.node(), n).on.on(e)
    : this.each($m(n, e, t));
}
function Hm(e) {
  return function () {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Bm() {
  return this.on("end.remove", Hm(this._id));
}
function zm(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Ni(e));
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
        Bo(u[f], t, n, f, u, pt(c, n)));
  return new Lt(s, this._parents, t, n);
}
function Vm(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Hl(e));
  for (var r = this._groups, o = r.length, s = [], i = [], a = 0; a < o; ++a)
    for (var l = r[a], u = l.length, c, d = 0; d < u; ++d)
      if ((c = l[d])) {
        for (
          var f = e.call(c, c.__data__, d, l),
            h,
            p = pt(c, n),
            g = 0,
            m = f.length;
          g < m;
          ++g
        )
          (h = f[g]) && Bo(h, t, n, g, f, p);
        s.push(f), i.push(c);
      }
  return new Lt(s, i, t, n);
}
var Wm = yr.prototype.constructor;
function Um() {
  return new Wm(this._groups, this._parents);
}
function Ym(e, t) {
  var n, r, o;
  return function () {
    var s = Rn(this, e),
      i = (this.style.removeProperty(e), Rn(this, e));
    return s === i ? null : s === n && i === r ? o : (o = t((n = s), (r = i)));
  };
}
function uu(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function qm(e, t, n) {
  var r,
    o = n + "",
    s;
  return function () {
    var i = Rn(this, e);
    return i === o ? null : i === r ? s : (s = t((r = i), n));
  };
}
function Zm(e, t, n) {
  var r, o, s;
  return function () {
    var i = Rn(this, e),
      a = n(this),
      l = a + "";
    return (
      a == null && (l = a = (this.style.removeProperty(e), Rn(this, e))),
      i === l ? null : i === r && l === o ? s : ((o = l), (s = t((r = i), a)))
    );
  };
}
function Xm(e, t) {
  var n,
    r,
    o,
    s = "style." + t,
    i = "end." + s,
    a;
  return function () {
    var l = _t(this, e),
      u = l.on,
      c = l.value[s] == null ? a || (a = uu(t)) : void 0;
    (u !== n || o !== c) && (r = (n = u).copy()).on(i, (o = c)), (l.on = r);
  };
}
function Km(e, t, n) {
  var r = (e += "") == "transform" ? K2 : lu;
  return t == null
    ? this.styleTween(e, Ym(e, r)).on("end.style." + e, uu(e))
    : typeof t == "function"
      ? this.styleTween(e, Zm(e, r, Ii(this, "style." + e, t))).each(
          Xm(this._id, e),
        )
      : this.styleTween(e, qm(e, r, t), n).on("end.style." + e, null);
}
function Gm(e, t, n) {
  return function (r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function Jm(e, t, n) {
  var r, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (r = (o = i) && Gm(e, i, n)), r;
  }
  return (s._value = t), s;
}
function Qm(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, Jm(e, t, n ?? ""));
}
function e3(e) {
  return function () {
    this.textContent = e;
  };
}
function t3(e) {
  return function () {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function n3(e) {
  return this.tween(
    "text",
    typeof e == "function"
      ? t3(Ii(this, "text", e))
      : e3(e == null ? "" : e + ""),
  );
}
function r3(e) {
  return function (t) {
    this.textContent = e.call(this, t);
  };
}
function o3(e) {
  var t, n;
  function r() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && r3(o)), t;
  }
  return (r._value = e), r;
}
function s3(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, o3(e));
}
function i3() {
  for (
    var e = this._name,
      t = this._id,
      n = du(),
      r = this._groups,
      o = r.length,
      s = 0;
    s < o;
    ++s
  )
    for (var i = r[s], a = i.length, l, u = 0; u < a; ++u)
      if ((l = i[u])) {
        var c = pt(l, t);
        Bo(l, e, n, u, i, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease,
        });
      }
  return new Lt(r, this._parents, e, n);
}
function a3() {
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
      var u = _t(this, r),
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
var c3 = 0;
function Lt(e, t, n, r) {
  (this._groups = e), (this._parents = t), (this._name = n), (this._id = r);
}
function du() {
  return ++c3;
}
var Dt = yr.prototype;
Lt.prototype = {
  constructor: Lt,
  select: zm,
  selectAll: Vm,
  selectChild: Dt.selectChild,
  selectChildren: Dt.selectChildren,
  filter: Lm,
  merge: Pm,
  selection: Um,
  transition: i3,
  call: Dt.call,
  nodes: Dt.nodes,
  node: Dt.node,
  size: Dt.size,
  empty: Dt.empty,
  each: Dt.each,
  on: Fm,
  attr: Em,
  attrTween: wm,
  style: Km,
  styleTween: Qm,
  text: n3,
  textTween: s3,
  remove: Bm,
  tween: fm,
  delay: Tm,
  duration: Om,
  ease: Rm,
  easeVarying: km,
  end: a3,
  [Symbol.iterator]: Dt[Symbol.iterator],
};
function l3(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var u3 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: l3,
};
function d3(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
  return n;
}
function f3(e) {
  var t, n;
  e instanceof Lt
    ? ((t = e._id), (e = e._name))
    : ((t = du()), ((n = u3).time = Di()), (e = e == null ? null : e + ""));
  for (var r = this._groups, o = r.length, s = 0; s < o; ++s)
    for (var i = r[s], a = i.length, l, u = 0; u < a; ++u)
      (l = i[u]) && Bo(l, e, t, u, i, n || d3(l, t));
  return new Lt(r, this._parents, e, t);
}
yr.prototype.interrupt = lm;
yr.prototype.transition = f3;
const $r = (e) => () => e;
function h3(e, { sourceEvent: t, target: n, transform: r, dispatch: o }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: o },
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
var Zt = new It(1, 0, 0);
It.prototype;
function Es(e) {
  e.stopImmediatePropagation();
}
function Un(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function p3(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function g3() {
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
function ac() {
  return this.__zoom || Zt;
}
function m3(e) {
  return (
    -e.deltaY *
    (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) *
    (e.ctrlKey ? 10 : 1)
  );
}
function y3() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function v3(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0],
    o = e.invertX(t[1][0]) - n[1][0],
    s = e.invertY(t[0][1]) - n[0][1],
    i = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o),
    i > s ? (s + i) / 2 : Math.min(0, s) || Math.max(0, i),
  );
}
function E3() {
  var e = p3,
    t = g3,
    n = v3,
    r = m3,
    o = y3,
    s = [0, 1 / 0],
    i = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    a = 250,
    l = tm,
    u = $o("start", "zoom", "end"),
    c,
    d,
    f,
    h = 500,
    p = 150,
    g = 0,
    m = 10;
  function y(E) {
    E.property("__zoom", ac)
      .on("wheel.zoom", S, { passive: !1 })
      .on("mousedown.zoom", P)
      .on("dblclick.zoom", L)
      .filter(o)
      .on("touchstart.zoom", j)
      .on("touchmove.zoom", B)
      .on("touchend.zoom touchcancel.zoom", H)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  (y.transform = function (E, N, w, I) {
    var k = E.selection ? E.selection() : E;
    k.property("__zoom", ac),
      E !== k
        ? C(E, N, w, I)
        : k.interrupt().each(function () {
            A(this, arguments)
              .event(I)
              .start()
              .zoom(null, typeof N == "function" ? N.apply(this, arguments) : N)
              .end();
          });
  }),
    (y.scaleBy = function (E, N, w, I) {
      y.scaleTo(
        E,
        function () {
          var k = this.__zoom.k,
            D = typeof N == "function" ? N.apply(this, arguments) : N;
          return k * D;
        },
        w,
        I,
      );
    }),
    (y.scaleTo = function (E, N, w, I) {
      y.transform(
        E,
        function () {
          var k = t.apply(this, arguments),
            D = this.__zoom,
            T =
              w == null
                ? b(k)
                : typeof w == "function"
                  ? w.apply(this, arguments)
                  : w,
            R = D.invert(T),
            F = typeof N == "function" ? N.apply(this, arguments) : N;
          return n(x(_(D, F), T, R), k, i);
        },
        w,
        I,
      );
    }),
    (y.translateBy = function (E, N, w, I) {
      y.transform(
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
        I,
      );
    }),
    (y.translateTo = function (E, N, w, I, k) {
      y.transform(
        E,
        function () {
          var D = t.apply(this, arguments),
            T = this.__zoom,
            R =
              I == null
                ? b(D)
                : typeof I == "function"
                  ? I.apply(this, arguments)
                  : I;
          return n(
            Zt.translate(R[0], R[1])
              .scale(T.k)
              .translate(
                typeof N == "function" ? -N.apply(this, arguments) : -N,
                typeof w == "function" ? -w.apply(this, arguments) : -w,
              ),
            D,
            i,
          );
        },
        I,
        k,
      );
    });
  function _(E, N) {
    return (
      (N = Math.max(s[0], Math.min(s[1], N))),
      N === E.k ? E : new It(N, E.x, E.y)
    );
  }
  function x(E, N, w) {
    var I = N[0] - w[0] * E.k,
      k = N[1] - w[1] * E.k;
    return I === E.x && k === E.y ? E : new It(E.k, I, k);
  }
  function b(E) {
    return [(+E[0][0] + +E[1][0]) / 2, (+E[0][1] + +E[1][1]) / 2];
  }
  function C(E, N, w, I) {
    E.on("start.zoom", function () {
      A(this, arguments).event(I).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        A(this, arguments).event(I).end();
      })
      .tween("zoom", function () {
        var k = this,
          D = arguments,
          T = A(k, D).event(I),
          R = t.apply(k, D),
          F = w == null ? b(R) : typeof w == "function" ? w.apply(k, D) : w,
          V = Math.max(R[1][0] - R[0][0], R[1][1] - R[0][1]),
          W = k.__zoom,
          Y = typeof N == "function" ? N.apply(k, D) : N,
          q = l(W.invert(F).concat(V / W.k), Y.invert(F).concat(V / Y.k));
        return function (X) {
          if (X === 1) X = Y;
          else {
            var Q = q(X),
              ee = V / Q[2];
            X = new It(ee, F[0] - Q[0] * ee, F[1] - Q[1] * ee);
          }
          T.zoom(null, X);
        };
      });
  }
  function A(E, N, w) {
    return (!w && E.__zooming) || new O(E, N);
  }
  function O(E, N) {
    (this.that = E),
      (this.args = N),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = t.apply(E, N)),
      (this.taps = 0);
  }
  O.prototype = {
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
      var N = lt(this.that).datum();
      u.call(
        E,
        this.that,
        new h3(E, {
          sourceEvent: this.sourceEvent,
          target: y,
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
      I = this.__zoom,
      k = Math.max(
        s[0],
        Math.min(s[1], I.k * Math.pow(2, r.apply(this, arguments))),
      ),
      D = vt(E);
    if (w.wheel)
      (w.mouse[0][0] !== D[0] || w.mouse[0][1] !== D[1]) &&
        (w.mouse[1] = I.invert((w.mouse[0] = D))),
        clearTimeout(w.wheel);
    else {
      if (I.k === k) return;
      (w.mouse = [D, I.invert(D)]), Jr(this), w.start();
    }
    Un(E),
      (w.wheel = setTimeout(T, p)),
      w.zoom("mouse", n(x(_(I, k), w.mouse[0], w.mouse[1]), w.extent, i));
    function T() {
      (w.wheel = null), w.end();
    }
  }
  function P(E, ...N) {
    if (f || !e.apply(this, arguments)) return;
    var w = E.currentTarget,
      I = A(this, N, !0).event(E),
      k = lt(E.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", V, !0),
      D = vt(E, w),
      T = E.clientX,
      R = E.clientY;
    Gl(E.view),
      Es(E),
      (I.mouse = [D, this.__zoom.invert(D)]),
      Jr(this),
      I.start();
    function F(W) {
      if ((Un(W), !I.moved)) {
        var Y = W.clientX - T,
          q = W.clientY - R;
        I.moved = Y * Y + q * q > g;
      }
      I.event(W).zoom(
        "mouse",
        n(x(I.that.__zoom, (I.mouse[0] = vt(W, w)), I.mouse[1]), I.extent, i),
      );
    }
    function V(W) {
      k.on("mousemove.zoom mouseup.zoom", null),
        Jl(W.view, I.moved),
        Un(W),
        I.event(W).end();
    }
  }
  function L(E, ...N) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom,
        I = vt(E.changedTouches ? E.changedTouches[0] : E, this),
        k = w.invert(I),
        D = w.k * (E.shiftKey ? 0.5 : 2),
        T = n(x(_(w, D), I, k), t.apply(this, N), i);
      Un(E),
        a > 0
          ? lt(this).transition().duration(a).call(C, T, I, E)
          : lt(this).call(y.transform, T, I, E);
    }
  }
  function j(E, ...N) {
    if (e.apply(this, arguments)) {
      var w = E.touches,
        I = w.length,
        k = A(this, N, E.changedTouches.length === I).event(E),
        D,
        T,
        R,
        F;
      for (Es(E), T = 0; T < I; ++T)
        (R = w[T]),
          (F = vt(R, this)),
          (F = [F, this.__zoom.invert(F), R.identifier]),
          k.touch0
            ? !k.touch1 &&
              k.touch0[2] !== F[2] &&
              ((k.touch1 = F), (k.taps = 0))
            : ((k.touch0 = F), (D = !0), (k.taps = 1 + !!c));
      c && (c = clearTimeout(c)),
        D &&
          (k.taps < 2 &&
            ((d = F[0]),
            (c = setTimeout(function () {
              c = null;
            }, h))),
          Jr(this),
          k.start());
    }
  }
  function B(E, ...N) {
    if (this.__zooming) {
      var w = A(this, N).event(E),
        I = E.changedTouches,
        k = I.length,
        D,
        T,
        R,
        F;
      for (Un(E), D = 0; D < k; ++D)
        (T = I[D]),
          (R = vt(T, this)),
          w.touch0 && w.touch0[2] === T.identifier
            ? (w.touch0[0] = R)
            : w.touch1 && w.touch1[2] === T.identifier && (w.touch1[0] = R);
      if (((T = w.that.__zoom), w.touch1)) {
        var V = w.touch0[0],
          W = w.touch0[1],
          Y = w.touch1[0],
          q = w.touch1[1],
          X = (X = Y[0] - V[0]) * X + (X = Y[1] - V[1]) * X,
          Q = (Q = q[0] - W[0]) * Q + (Q = q[1] - W[1]) * Q;
        (T = _(T, Math.sqrt(X / Q))),
          (R = [(V[0] + Y[0]) / 2, (V[1] + Y[1]) / 2]),
          (F = [(W[0] + q[0]) / 2, (W[1] + q[1]) / 2]);
      } else if (w.touch0) (R = w.touch0[0]), (F = w.touch0[1]);
      else return;
      w.zoom("touch", n(x(T, R, F), w.extent, i));
    }
  }
  function H(E, ...N) {
    if (this.__zooming) {
      var w = A(this, N).event(E),
        I = E.changedTouches,
        k = I.length,
        D,
        T;
      for (
        Es(E),
          f && clearTimeout(f),
          f = setTimeout(function () {
            f = null;
          }, h),
          D = 0;
        D < k;
        ++D
      )
        (T = I[D]),
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
          ((T = vt(T, this)), Math.hypot(d[0] - T[0], d[1] - T[1]) < m))
      ) {
        var R = lt(this).on("dblclick.zoom");
        R && R.apply(this, arguments);
      }
    }
  }
  return (
    (y.wheelDelta = function (E) {
      return arguments.length
        ? ((r = typeof E == "function" ? E : $r(+E)), y)
        : r;
    }),
    (y.filter = function (E) {
      return arguments.length
        ? ((e = typeof E == "function" ? E : $r(!!E)), y)
        : e;
    }),
    (y.touchable = function (E) {
      return arguments.length
        ? ((o = typeof E == "function" ? E : $r(!!E)), y)
        : o;
    }),
    (y.extent = function (E) {
      return arguments.length
        ? ((t =
            typeof E == "function"
              ? E
              : $r([
                  [+E[0][0], +E[0][1]],
                  [+E[1][0], +E[1][1]],
                ])),
          y)
        : t;
    }),
    (y.scaleExtent = function (E) {
      return arguments.length
        ? ((s[0] = +E[0]), (s[1] = +E[1]), y)
        : [s[0], s[1]];
    }),
    (y.translateExtent = function (E) {
      return arguments.length
        ? ((i[0][0] = +E[0][0]),
          (i[1][0] = +E[1][0]),
          (i[0][1] = +E[0][1]),
          (i[1][1] = +E[1][1]),
          y)
        : [
            [i[0][0], i[0][1]],
            [i[1][0], i[1][1]],
          ];
    }),
    (y.constrain = function (E) {
      return arguments.length ? ((n = E), y) : n;
    }),
    (y.duration = function (E) {
      return arguments.length ? ((a = +E), y) : a;
    }),
    (y.interpolate = function (E) {
      return arguments.length ? ((l = E), y) : l;
    }),
    (y.on = function () {
      var E = u.on.apply(u, arguments);
      return E === u ? y : E;
    }),
    (y.clickDistance = function (E) {
      return arguments.length ? ((g = (E = +E) * E), y) : Math.sqrt(g);
    }),
    (y.tapDistance = function (E) {
      return arguments.length ? ((m = +E), y) : m;
    }),
    y
  );
}
const zo = bt(null),
  C3 = zo.Provider,
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
  fu = ht.error001();
function we(e, t) {
  const n = Ge(zo);
  if (n === null) throw new Error(fu);
  return $l(n, e, t);
}
const Le = () => {
    const e = Ge(zo);
    if (e === null) throw new Error(fu);
    return De(
      () => ({
        getState: e.getState,
        setState: e.setState,
        subscribe: e.subscribe,
        destroy: e.destroy,
      }),
      [e],
    );
  },
  b3 = (e) => (e.userSelectionActive ? "none" : "all");
function hu({ position: e, children: t, className: n, style: r, ...o }) {
  const s = we(b3),
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
function _3({ proOptions: e, position: t = "bottom-right" }) {
  return e != null && e.hideAttribution
    ? null
    : $.createElement(
        hu,
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
const x3 = ({
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
    [f, h] = he({ x: 0, y: 0, width: 0, height: 0 }),
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
var w3 = Te(x3);
const Ri = (e) => ({
    width: e.offsetWidth,
    height: e.offsetHeight,
  }),
  kn = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n),
  Mi = (e = { x: 0, y: 0 }, t) => ({
    x: kn(e.x, t[0][0], t[1][0]),
    y: kn(e.y, t[0][1], t[1][1]),
  }),
  cc = (e, t, n) =>
    e < t
      ? kn(Math.abs(e - t), 1, 50) / 50
      : e > n
        ? -kn(Math.abs(e - n), 1, 50) / 50
        : 0,
  pu = (e, t) => {
    const n = cc(e.x, 35, t.width - 35) * 20,
      r = cc(e.y, 35, t.height - 35) * 20;
    return [n, r];
  },
  gu = (e) => {
    var t;
    return (
      ((t = e.getRootNode) == null ? void 0 : t.call(e)) ||
      (window == null ? void 0 : window.document)
    );
  },
  S3 = (e, t) => ({
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2),
  }),
  ki = ({ x: e, y: t, width: n, height: r }) => ({
    x: e,
    y: t,
    x2: e + n,
    y2: t + r,
  }),
  N3 = ({ x: e, y: t, x2: n, y2: r }) => ({
    x: e,
    y: t,
    width: n - e,
    height: r - t,
  }),
  lc = (e) => ({
    ...(e.positionAbsolute || { x: 0, y: 0 }),
    width: e.width || 0,
    height: e.height || 0,
  }),
  Xs = (e, t) => {
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
  T3 = (e) => tt(e.width) && tt(e.height) && tt(e.x) && tt(e.y),
  tt = (e) => !isNaN(e) && isFinite(e),
  Ne = Symbol.for("internals"),
  mu = ["Enter", " ", "Escape"],
  yu = (e, t) => {
    process.env.NODE_ENV === "development" &&
      console.warn(`[React Flow]: ${t} Help: https://reactflow.dev/error#${e}`);
  },
  A3 = (e) => "nativeEvent" in e;
function Ks(e) {
  var o, s;
  const t = A3(e) ? e.nativeEvent : e,
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
const vu = (e) => "clientX" in e,
  Xt = (e, t) => {
    var s, i;
    const n = vu(e),
      r = n ? e.clientX : (s = e.touches) == null ? void 0 : s[0].clientX,
      o = n ? e.clientY : (i = e.touches) == null ? void 0 : i[0].clientY;
    return {
      x: r - ((t == null ? void 0 : t.left) ?? 0),
      y: o - ((t == null ? void 0 : t.top) ?? 0),
    };
  },
  vo = () => {
    var e;
    return (
      typeof navigator < "u" &&
      ((e = navigator == null ? void 0 : navigator.userAgent) == null
        ? void 0
        : e.indexOf("Mac")) >= 0
    );
  },
  Fn = ({
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
      o && tt(n) && tt(r)
        ? $.createElement(w3, {
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
Fn.displayName = "BaseEdge";
function Yn(e, t, n) {
  return n === void 0
    ? n
    : (r) => {
        const o = t().edges.find((s) => s.id === e);
        o && n(r, { ...o });
      };
}
function Eu({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const o = Math.abs(n - e) / 2,
    s = n < e ? n + o : n - o,
    i = Math.abs(r - t) / 2,
    a = r < t ? r + i : r - i;
  return [s, a, o, i];
}
function Cu({
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
var dn;
(function (e) {
  (e.Strict = "strict"), (e.Loose = "loose");
})(dn || (dn = {}));
var an;
(function (e) {
  (e.Free = "free"), (e.Vertical = "vertical"), (e.Horizontal = "horizontal");
})(an || (an = {}));
var dr;
(function (e) {
  (e.Partial = "partial"), (e.Full = "full");
})(dr || (dr = {}));
var Yt;
(function (e) {
  (e.Bezier = "default"),
    (e.Straight = "straight"),
    (e.Step = "step"),
    (e.SmoothStep = "smoothstep"),
    (e.SimpleBezier = "simplebezier");
})(Yt || (Yt = {}));
var Eo;
(function (e) {
  (e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed");
})(Eo || (Eo = {}));
var te;
(function (e) {
  (e.Left = "left"),
    (e.Top = "top"),
    (e.Right = "right"),
    (e.Bottom = "bottom");
})(te || (te = {}));
function uc({ pos: e, x1: t, y1: n, x2: r, y2: o }) {
  return e === te.Left || e === te.Right
    ? [0.5 * (t + r), n]
    : [t, 0.5 * (n + o)];
}
function bu({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = te.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: s = te.Top,
}) {
  const [i, a] = uc({
      pos: n,
      x1: e,
      y1: t,
      x2: r,
      y2: o,
    }),
    [l, u] = uc({
      pos: s,
      x1: r,
      y1: o,
      x2: e,
      y2: t,
    }),
    [c, d, f, h] = Cu({
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
const Li = Te(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
    sourcePosition: o = te.Bottom,
    targetPosition: s = te.Top,
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
    const [m, y, _] = bu({
      sourceX: e,
      sourceY: t,
      sourcePosition: o,
      targetX: n,
      targetY: r,
      targetPosition: s,
    });
    return $.createElement(Fn, {
      path: m,
      labelX: y,
      labelY: _,
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
Li.displayName = "SimpleBezierEdge";
const dc = {
    [te.Left]: { x: -1, y: 0 },
    [te.Right]: { x: 1, y: 0 },
    [te.Top]: { x: 0, y: -1 },
    [te.Bottom]: { x: 0, y: 1 },
  },
  D3 = ({ source: e, sourcePosition: t = te.Bottom, target: n }) =>
    t === te.Left || t === te.Right
      ? e.x < n.x
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 }
      : e.y < n.y
        ? { x: 0, y: 1 }
        : { x: 0, y: -1 },
  fc = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function O3({
  source: e,
  sourcePosition: t = te.Bottom,
  target: n,
  targetPosition: r = te.Top,
  center: o,
  offset: s,
}) {
  const i = dc[t],
    a = dc[r],
    l = { x: e.x + i.x * s, y: e.y + i.y * s },
    u = { x: n.x + a.x * s, y: n.y + a.y * s },
    c = D3({
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
    y = { x: 0, y: 0 },
    [_, x, b, C] = Eu({
      sourceX: e.x,
      sourceY: e.y,
      targetX: n.x,
      targetY: n.y,
    });
  if (i[d] * a[d] === -1) {
    (p = o.x ?? _), (g = o.y ?? x);
    const O = [
        { x: p, y: l.y },
        { x: p, y: u.y },
      ],
      S = [
        { x: l.x, y: g },
        { x: u.x, y: g },
      ];
    i[d] === f ? (h = d === "x" ? O : S) : (h = d === "x" ? S : O);
  } else {
    const O = [{ x: l.x, y: u.y }],
      S = [{ x: u.x, y: l.y }];
    if (
      (d === "x" ? (h = i.x === f ? S : O) : (h = i.y === f ? O : S), t === r)
    ) {
      const H = Math.abs(e[d] - n[d]);
      if (H <= s) {
        const E = Math.min(s - 1, s - H);
        i[d] === f
          ? (m[d] = (l[d] > e[d] ? -1 : 1) * E)
          : (y[d] = (u[d] > n[d] ? -1 : 1) * E);
      }
    }
    if (t !== r) {
      const H = d === "x" ? "y" : "x",
        E = i[d] === a[H],
        N = l[H] > u[H],
        w = l[H] < u[H];
      ((i[d] === 1 && ((!E && N) || (E && w))) ||
        (i[d] !== 1 && ((!E && w) || (E && N)))) &&
        (h = d === "x" ? O : S);
    }
    const P = { x: l.x + m.x, y: l.y + m.y },
      L = { x: u.x + y.x, y: u.y + y.y },
      j = Math.max(Math.abs(P.x - h[0].x), Math.abs(L.x - h[0].x)),
      B = Math.max(Math.abs(P.y - h[0].y), Math.abs(L.y - h[0].y));
    j >= B
      ? ((p = (P.x + L.x) / 2), (g = h[0].y))
      : ((p = h[0].x), (g = (P.y + L.y) / 2));
  }
  return [
    [
      e,
      { x: l.x + m.x, y: l.y + m.y },
      ...h,
      { x: u.x + y.x, y: u.y + y.y },
      n,
    ],
    p,
    g,
    b,
    C,
  ];
}
function I3(e, t, n, r) {
  const o = Math.min(fc(e, t) / 2, fc(t, n) / 2, r),
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
function Gs({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = te.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: s = te.Top,
  borderRadius: i = 5,
  centerX: a,
  centerY: l,
  offset: u = 20,
}) {
  const [c, d, f, h, p] = O3({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: r, y: o },
    targetPosition: s,
    center: { x: a, y: l },
    offset: u,
  });
  return [
    c.reduce((m, y, _) => {
      let x = "";
      return (
        _ > 0 && _ < c.length - 1
          ? (x = I3(c[_ - 1], y, c[_ + 1], i))
          : (x = `${_ === 0 ? "M" : "L"}${y.x} ${y.y}`),
        (m += x),
        m
      );
    }, ""),
    d,
    f,
    h,
    p,
  ];
}
const Vo = Te(
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
    sourcePosition: d = te.Bottom,
    targetPosition: f = te.Top,
    markerEnd: h,
    markerStart: p,
    pathOptions: g,
    interactionWidth: m,
  }) => {
    const [y, _, x] = Gs({
      sourceX: e,
      sourceY: t,
      sourcePosition: d,
      targetX: n,
      targetY: r,
      targetPosition: f,
      borderRadius: g == null ? void 0 : g.borderRadius,
      offset: g == null ? void 0 : g.offset,
    });
    return $.createElement(Fn, {
      path: y,
      labelX: _,
      labelY: x,
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
Vo.displayName = "SmoothStepEdge";
const Pi = Te((e) => {
  var t;
  return $.createElement(Vo, {
    ...e,
    pathOptions: De(() => {
      var n;
      return {
        borderRadius: 0,
        offset: (n = e.pathOptions) == null ? void 0 : n.offset,
      };
    }, [(t = e.pathOptions) == null ? void 0 : t.offset]),
  });
});
Pi.displayName = "StepEdge";
function R3({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const [o, s, i, a] = Eu({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
  });
  return [`M ${e},${t}L ${n},${r}`, o, s, i, a];
}
const ji = Te(
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
    const [p, g, m] = R3({ sourceX: e, sourceY: t, targetX: n, targetY: r });
    return $.createElement(Fn, {
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
ji.displayName = "StraightEdge";
function Fr(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function hc({ pos: e, x1: t, y1: n, x2: r, y2: o, c: s }) {
  switch (e) {
    case te.Left:
      return [t - Fr(t - r, s), n];
    case te.Right:
      return [t + Fr(r - t, s), n];
    case te.Top:
      return [t, n - Fr(n - o, s)];
    case te.Bottom:
      return [t, n + Fr(o - n, s)];
  }
}
function _u({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = te.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: s = te.Top,
  curvature: i = 0.25,
}) {
  const [a, l] = hc({
      pos: n,
      x1: e,
      y1: t,
      x2: r,
      y2: o,
      c: i,
    }),
    [u, c] = hc({
      pos: s,
      x1: r,
      y1: o,
      x2: e,
      y2: t,
      c: i,
    }),
    [d, f, h, p] = Cu({
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
const Co = Te(
  ({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r,
    sourcePosition: o = te.Bottom,
    targetPosition: s = te.Top,
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
    const [y, _, x] = _u({
      sourceX: e,
      sourceY: t,
      sourcePosition: o,
      targetX: n,
      targetY: r,
      targetPosition: s,
      curvature: g == null ? void 0 : g.curvature,
    });
    return $.createElement(Fn, {
      path: y,
      labelX: _,
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
      interactionWidth: m,
    });
  },
);
Co.displayName = "BezierEdge";
const $i = bt(null),
  M3 = $i.Provider;
$i.Consumer;
const k3 = () => Ge($i),
  L3 = (e) => "id" in e && "source" in e && "target" in e,
  P3 = (e) => "id" in e && !("source" in e) && !("target" in e),
  j3 = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) =>
    `reactflow__edge-${e}${t || ""}-${n}${r || ""}`,
  Js = (e, t) =>
    typeof e > "u"
      ? ""
      : typeof e == "string"
        ? e
        : `${t ? `${t}__` : ""}${Object.keys(e)
            .sort()
            .map((r) => `${r}=${e[r]}`)
            .join("&")}`,
  $3 = (e, t) =>
    t.some(
      (n) =>
        n.source === e.source &&
        n.target === e.target &&
        (n.sourceHandle === e.sourceHandle ||
          (!n.sourceHandle && !e.sourceHandle)) &&
        (n.targetHandle === e.targetHandle ||
          (!n.targetHandle && !e.targetHandle)),
    ),
  F3 = (e, t) => {
    if (!e.source || !e.target) return yu("006", ht.error006()), t;
    let n;
    return (
      L3(e)
        ? (n = { ...e })
        : (n = {
            ...e,
            id: j3(e),
          }),
      $3(n, t) ? t : t.concat(n)
    );
  },
  Qs = ({ x: e, y: t }, [n, r, o], s, [i, a]) => {
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
  xu = ({ x: e, y: t }, [n, r, o]) => ({
    x: e * o + n,
    y: t * o + r,
  }),
  Nn = (e, t = [0, 0]) => {
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
  Fi = (e, t = [0, 0]) => {
    if (e.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    const n = e.reduce(
      (r, o) => {
        const { x: s, y: i } = Nn(o, t).positionAbsolute;
        return S3(
          r,
          ki({
            x: s,
            y: i,
            width: o.width || 0,
            height: o.height || 0,
          }),
        );
      },
      { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
    );
    return N3(n);
  },
  wu = (e, t, [n, r, o] = [0, 0, 1], s = !1, i = !1, a = [0, 0]) => {
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
        const { positionAbsolute: g } = Nn(c, a),
          m = {
            x: g.x,
            y: g.y,
            width: d || 0,
            height: f || 0,
          },
          y = Xs(l, m),
          _ = typeof d > "u" || typeof f > "u" || d === null || f === null,
          x = s && y > 0,
          b = (d || 0) * (f || 0);
        (_ || x || y >= b || c.dragging) && u.push(c);
      }),
      u
    );
  },
  Su = (e, t) => {
    const n = e.map((r) => r.id);
    return t.filter((r) => n.includes(r.source) || n.includes(r.target));
  },
  Nu = (e, t, n, r, o, s = 0.1) => {
    const i = t / (e.width * (1 + s)),
      a = n / (e.height * (1 + s)),
      l = Math.min(i, a),
      u = kn(l, r, o),
      c = e.x + e.width / 2,
      d = e.y + e.height / 2,
      f = t / 2 - c * u,
      h = n / 2 - d * u;
    return { x: f, y: h, zoom: u };
  },
  rn = (e, t = 0) => e.transition().duration(t);
function pc(e, t, n, r) {
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
function H3(e, t, n, r, o, s) {
  const { x: i, y: a } = Xt(e),
    u = t
      .elementsFromPoint(i, a)
      .find((p) => p.classList.contains("react-flow__handle"));
  if (u) {
    const p = u.getAttribute("data-nodeid");
    if (p) {
      const g = Hi(void 0, u),
        m = u.getAttribute("data-handleid"),
        y = s({ nodeId: p, id: m, type: g });
      if (y) {
        const _ = o.find((x) => x.nodeId === p && x.type === g && x.id === m);
        return {
          handle: {
            id: m,
            type: g,
            nodeId: p,
            x: (_ == null ? void 0 : _.x) || n.x,
            y: (_ == null ? void 0 : _.y) || n.y,
          },
          validHandleResult: y,
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
    return { handle: null, validHandleResult: Tu() };
  if (c.length === 1) return c[0];
  const f = c.some(({ validHandleResult: p }) => p.isValid),
    h = c.some(({ handle: p }) => p.type === "target");
  return (
    c.find(({ handle: p, validHandleResult: g }) =>
      h ? p.type === "target" : f ? g.isValid : !0,
    ) || c[0]
  );
}
const B3 = {
    source: null,
    target: null,
    sourceHandle: null,
    targetHandle: null,
  },
  Tu = () => ({
    handleDomNode: null,
    isValid: !1,
    connection: B3,
    endHandle: null,
  });
function Au(e, t, n, r, o, s, i) {
  const a = o === "target",
    l = i.querySelector(
      `.react-flow__handle[data-id="${e == null ? void 0 : e.nodeId}-${e == null ? void 0 : e.id}-${e == null ? void 0 : e.type}"]`,
    ),
    u = {
      ...Tu(),
      handleDomNode: l,
    };
  if (l) {
    const c = Hi(void 0, l),
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
        (t === dn.Strict
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
function z3({ nodes: e, nodeId: t, handleId: n, handleType: r }) {
  return e.reduce((o, s) => {
    if (s[Ne]) {
      const { handleBounds: i } = s[Ne];
      let a = [],
        l = [];
      i &&
        ((a = pc(s, i, "source", `${t}-${n}-${r}`)),
        (l = pc(s, i, "target", `${t}-${n}-${r}`))),
        o.push(...a, ...l);
    }
    return o;
  }, []);
}
function Hi(e, t) {
  return (
    e ||
    (t != null && t.classList.contains("target")
      ? "target"
      : t != null && t.classList.contains("source")
        ? "source"
        : null)
  );
}
function Cs(e) {
  e == null ||
    e.classList.remove(
      "valid",
      "connecting",
      "react-flow__handle-valid",
      "react-flow__handle-connecting",
    );
}
function V3(e, t) {
  let n = null;
  return t ? (n = "valid") : e && !t && (n = "invalid"), n;
}
function Du({
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
  const c = gu(e.target),
    {
      connectionMode: d,
      domNode: f,
      autoPanOnConnect: h,
      connectionRadius: p,
      onConnectStart: g,
      panBy: m,
      getNodes: y,
      cancelConnection: _,
    } = s();
  let x = 0,
    b;
  const { x: C, y: A } = Xt(e),
    O = c == null ? void 0 : c.elementFromPoint(C, A),
    S = Hi(l, O),
    P = f == null ? void 0 : f.getBoundingClientRect();
  if (!P || !S) return;
  let L,
    j = Xt(e, P),
    B = !1,
    H = null,
    E = !1,
    N = null;
  const w = z3({
      nodes: y(),
      nodeId: n,
      handleId: t,
      handleType: S,
    }),
    I = () => {
      if (!h) return;
      const [T, R] = pu(j, P);
      m({ x: T, y: R }), (x = requestAnimationFrame(I));
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
  function k(T) {
    const { transform: R } = s();
    j = Xt(T, P);
    const { handle: F, validHandleResult: V } = H3(
      T,
      c,
      Qs(j, R, !1, [1, 1]),
      p,
      w,
      (W) => Au(W, d, n, t, o ? "target" : "source", a, c),
    );
    if (
      ((b = F),
      B || (I(), (B = !0)),
      (N = V.handleDomNode),
      (H = V.connection),
      (E = V.isValid),
      i({
        connectionPosition:
          b && E
            ? xu(
                {
                  x: b.x,
                  y: b.y,
                },
                R,
              )
            : j,
        connectionStatus: V3(!!b, E),
        connectionEndHandle: V.endHandle,
      }),
      !b && !E && !N)
    )
      return Cs(L);
    H.source !== H.target &&
      N &&
      (Cs(L),
      (L = N),
      N.classList.add("connecting", "react-flow__handle-connecting"),
      N.classList.toggle("valid", E),
      N.classList.toggle("react-flow__handle-valid", E));
  }
  function D(T) {
    var R, F;
    (b || N) && H && E && (r == null || r(H)),
      (F = (R = s()).onConnectEnd) == null || F.call(R, T),
      l && (u == null || u(T)),
      Cs(L),
      _(),
      cancelAnimationFrame(x),
      (B = !1),
      (E = !1),
      (H = null),
      (N = null),
      c.removeEventListener("mousemove", k),
      c.removeEventListener("mouseup", D),
      c.removeEventListener("touchmove", k),
      c.removeEventListener("touchend", D);
  }
  c.addEventListener("mousemove", k),
    c.addEventListener("mouseup", D),
    c.addEventListener("touchmove", k),
    c.addEventListener("touchend", D);
}
const gc = () => !0,
  W3 = (e) => ({
    connectionStartHandle: e.connectionStartHandle,
    connectOnClick: e.connectOnClick,
    noPanClassName: e.noPanClassName,
  }),
  U3 = (e, t, n) => (r) => {
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
  Ou = Fc(
    (
      {
        type: e = "source",
        position: t = te.Top,
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
      var P, L;
      const p = i || null,
        g = e === "target",
        m = Le(),
        y = k3(),
        { connectOnClick: _, noPanClassName: x } = we(W3, $e),
        { connecting: b, clickConnecting: C } = we(U3(y, p, e), $e);
      y ||
        (L = (P = m.getState()).onError) == null ||
        L.call(P, "010", ht.error010());
      const A = (j) => {
          const {
              defaultEdgeOptions: B,
              onConnect: H,
              hasDefaultEdges: E,
            } = m.getState(),
            N = {
              ...B,
              ...j,
            };
          if (E) {
            const { edges: w, setEdges: I } = m.getState();
            I(F3(N, w));
          }
          H == null || H(N), a == null || a(N);
        },
        O = (j) => {
          if (!y) return;
          const B = vu(j);
          o &&
            ((B && j.button === 0) || !B) &&
            Du({
              event: j,
              handleId: p,
              nodeId: y,
              onConnect: A,
              isTarget: g,
              getState: m.getState,
              setState: m.setState,
              isValidConnection: n || m.getState().isValidConnection || gc,
            }),
            B ? c == null || c(j) : d == null || d(j);
        },
        S = (j) => {
          const {
            onClickConnectStart: B,
            onClickConnectEnd: H,
            connectionClickStartHandle: E,
            connectionMode: N,
            isValidConnection: w,
          } = m.getState();
          if (!y || (!E && !o)) return;
          if (!E) {
            B == null || B(j, { nodeId: y, handleId: p, handleType: e }),
              m.setState({
                connectionClickStartHandle: { nodeId: y, type: e, handleId: p },
              });
            return;
          }
          const I = gu(j.target),
            k = n || w || gc,
            { connection: D, isValid: T } = Au(
              {
                nodeId: y,
                id: p,
                type: e,
              },
              N,
              E.nodeId,
              E.handleId || null,
              E.type,
              k,
              I,
            );
          T && A(D),
            H == null || H(j),
            m.setState({ connectionClickStartHandle: null });
        };
      return $.createElement(
        "div",
        {
          "data-handleid": p,
          "data-nodeid": y,
          "data-handlepos": t,
          "data-id": `${y}-${p}-${e}`,
          className: ze([
            "react-flow__handle",
            `react-flow__handle-${t}`,
            "nodrag",
            x,
            u,
            {
              source: !g,
              target: g,
              connectable: r,
              connectablestart: o,
              connectableend: s,
              connecting: C,
              // this class is used to style the handle when the user is connecting
              connectionindicator: r && ((o && !b) || (s && b)),
            },
          ]),
          onMouseDown: O,
          onTouchStart: O,
          onClick: _ ? S : void 0,
          ref: h,
          ...f,
        },
        l,
      );
    },
  );
Ou.displayName = "Handle";
var qt = Te(Ou);
const Iu = ({
  data: e,
  isConnectable: t,
  targetPosition: n = te.Top,
  sourcePosition: r = te.Bottom,
}) =>
  $.createElement(
    $.Fragment,
    null,
    $.createElement(qt, { type: "target", position: n, isConnectable: t }),
    e == null ? void 0 : e.label,
    $.createElement(qt, { type: "source", position: r, isConnectable: t }),
  );
Iu.displayName = "DefaultNode";
var ei = Te(Iu);
const Ru = ({ data: e, isConnectable: t, sourcePosition: n = te.Bottom }) =>
  $.createElement(
    $.Fragment,
    null,
    e == null ? void 0 : e.label,
    $.createElement(qt, { type: "source", position: n, isConnectable: t }),
  );
Ru.displayName = "InputNode";
var Mu = Te(Ru);
const ku = ({ data: e, isConnectable: t, targetPosition: n = te.Top }) =>
  $.createElement(
    $.Fragment,
    null,
    $.createElement(qt, { type: "target", position: n, isConnectable: t }),
    e == null ? void 0 : e.label,
  );
ku.displayName = "OutputNode";
var Lu = Te(ku);
const Bi = () => null;
Bi.displayName = "GroupNode";
const Y3 = (e) => ({
    selectedNodes: e.getNodes().filter((t) => t.selected),
    selectedEdges: e.edges.filter((t) => t.selected).map((t) => ({ ...t })),
  }),
  Hr = (e) => e.id;
function q3(e, t) {
  return (
    $e(e.selectedNodes.map(Hr), t.selectedNodes.map(Hr)) &&
    $e(e.selectedEdges.map(Hr), t.selectedEdges.map(Hr))
  );
}
const Pu = Te(({ onSelectionChange: e }) => {
  const t = Le(),
    { selectedNodes: n, selectedEdges: r } = we(Y3, q3);
  return (
    ie(() => {
      const o = { nodes: n, edges: r };
      e == null || e(o), t.getState().onSelectionChange.forEach((s) => s(o));
    }, [n, r, e]),
    null
  );
});
Pu.displayName = "SelectionListener";
const Z3 = (e) => !!e.onSelectionChange;
function X3({ onSelectionChange: e }) {
  const t = we(Z3);
  return e || t ? $.createElement(Pu, { onSelectionChange: e }) : null;
}
const K3 = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
});
function mn(e, t) {
  ie(() => {
    typeof e < "u" && t(e);
  }, [e]);
}
function le(e, t, n) {
  ie(() => {
    typeof t < "u" && n({ [e]: t });
  }, [t]);
}
const G3 = ({
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
    nodeExtent: y,
    onNodesChange: _,
    onEdgesChange: x,
    elementsSelectable: b,
    connectionMode: C,
    snapGrid: A,
    snapToGrid: O,
    translateExtent: S,
    connectOnClick: P,
    defaultEdgeOptions: L,
    fitView: j,
    fitViewOptions: B,
    onNodesDelete: H,
    onEdgesDelete: E,
    onNodeDrag: N,
    onNodeDragStart: w,
    onNodeDragStop: I,
    onSelectionDrag: k,
    onSelectionDragStart: D,
    onSelectionDragStop: T,
    noPanClassName: R,
    nodeOrigin: F,
    rfId: V,
    autoPanOnConnect: W,
    autoPanOnNodeDrag: Y,
    onError: q,
    connectionRadius: X,
    isValidConnection: Q,
    nodeDragThreshold: ee,
  }) => {
    const {
        setNodes: K,
        setEdges: de,
        setDefaultNodesAndEdges: Z,
        setMinZoom: ve,
        setMaxZoom: Pe,
        setTranslateExtent: _e,
        setNodeExtent: Fe,
        reset: Ce,
      } = we(K3, $e),
      re = Le();
    return (
      ie(() => {
        const Me = r == null ? void 0 : r.map((xt) => ({ ...xt, ...L }));
        return (
          Z(n, Me),
          () => {
            Ce();
          }
        );
      }, []),
      le("defaultEdgeOptions", L, re.setState),
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
      le("elementsSelectable", b, re.setState),
      le("elevateNodesOnSelect", p, re.setState),
      le("snapToGrid", O, re.setState),
      le("snapGrid", A, re.setState),
      le("onNodesChange", _, re.setState),
      le("onEdgesChange", x, re.setState),
      le("connectOnClick", P, re.setState),
      le("fitViewOnInit", j, re.setState),
      le("fitViewOnInitOptions", B, re.setState),
      le("onNodesDelete", H, re.setState),
      le("onEdgesDelete", E, re.setState),
      le("onNodeDrag", N, re.setState),
      le("onNodeDragStart", w, re.setState),
      le("onNodeDragStop", I, re.setState),
      le("onSelectionDrag", k, re.setState),
      le("onSelectionDragStart", D, re.setState),
      le("onSelectionDragStop", T, re.setState),
      le("noPanClassName", R, re.setState),
      le("nodeOrigin", F, re.setState),
      le("rfId", V, re.setState),
      le("autoPanOnConnect", W, re.setState),
      le("autoPanOnNodeDrag", Y, re.setState),
      le("onError", q, re.setState),
      le("connectionRadius", X, re.setState),
      le("isValidConnection", Q, re.setState),
      le("nodeDragThreshold", ee, re.setState),
      mn(e, K),
      mn(t, de),
      mn(g, ve),
      mn(m, Pe),
      mn(S, _e),
      mn(y, Fe),
      null
    );
  },
  mc = { display: "none" },
  J3 = {
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
  ju = "react-flow__node-desc",
  $u = "react-flow__edge-desc",
  Q3 = "react-flow__aria-live",
  e4 = (e) => e.ariaLiveMessage;
function t4({ rfId: e }) {
  const t = we(e4);
  return $.createElement(
    "div",
    {
      id: `${Q3}-${e}`,
      "aria-live": "assertive",
      "aria-atomic": "true",
      style: J3,
    },
    t,
  );
}
function n4({ rfId: e, disableKeyboardA11y: t }) {
  return $.createElement(
    $.Fragment,
    null,
    $.createElement(
      "div",
      { id: `${ju}-${e}`, style: mc },
      "Press enter or space to select a node.",
      !t && "You can then use the arrow keys to move the node around.",
      " Press delete to remove it and escape to cancel.",
      " ",
    ),
    $.createElement(
      "div",
      { id: `${$u}-${e}`, style: mc },
      "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
    ),
    !t && $.createElement(t4, { rfId: e }),
  );
}
var fr = (e = null, t = { actInsideInputWithModifier: !0 }) => {
  const [n, r] = he(!1),
    o = se(!1),
    s = se(/* @__PURE__ */ new Set([])),
    [i, a] = De(() => {
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
                Ks(h))
            )
              return !1;
            const g = vc(h.code, a);
            s.current.add(h[g]),
              yc(i, s.current, !1) && (h.preventDefault(), r(!0));
          },
          d = (h) => {
            if (
              (!o.current || (o.current && !t.actInsideInputWithModifier)) &&
              Ks(h)
            )
              return !1;
            const g = vc(h.code, a);
            yc(i, s.current, !0)
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
function yc(e, t, n) {
  return e
    .filter((r) => n || r.length === t.size)
    .some((r) => r.every((o) => t.has(o)));
}
function vc(e, t) {
  return t.includes(e) ? "code" : "key";
}
function Fu(e, t, n, r) {
  var a, l;
  const o = e.parentNode || e.parentId;
  if (!o) return n;
  const s = t.get(o),
    i = Nn(s, r);
  return Fu(
    s,
    t,
    {
      x: (n.x ?? 0) + i.x,
      y: (n.y ?? 0) + i.y,
      z:
        (((a = s[Ne]) == null ? void 0 : a.z) ?? 0) > (n.z ?? 0)
          ? ((l = s[Ne]) == null ? void 0 : l.z) ?? 0
          : n.z ?? 0,
    },
    r,
  );
}
function Hu(e, t, n) {
  e.forEach((r) => {
    var s;
    const o = r.parentNode || r.parentId;
    if (o && !e.has(o)) throw new Error(`Parent node ${o} not found`);
    if (o || (n != null && n[r.id])) {
      const {
        x: i,
        y: a,
        z: l,
      } = Fu(
        r,
        e,
        {
          ...r.position,
          z: ((s = r[Ne]) == null ? void 0 : s.z) ?? 0,
        },
        t,
      );
      (r.positionAbsolute = {
        x: i,
        y: a,
      }),
        (r[Ne].z = l),
        n != null && n[r.id] && (r[Ne].isParent = !0);
    }
  });
}
function bs(e, t, n, r) {
  const o = /* @__PURE__ */ new Map(),
    s = {},
    i = r ? 1e3 : 0;
  return (
    e.forEach((a) => {
      var h;
      const l = (tt(a.zIndex) ? a.zIndex : 0) + (a.selected ? i : 0),
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
      Object.defineProperty(c, Ne, {
        enumerable: !1,
        value: {
          handleBounds:
            f || (h = u == null ? void 0 : u[Ne]) == null
              ? void 0
              : h.handleBounds,
          z: l,
        },
      }),
        o.set(a.id, c);
    }),
    Hu(o, n, s),
    o
  );
}
function Bu(e, t = {}) {
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
        var _;
        const y = t.includeHiddenNodes ? m.width && m.height : !m.hidden;
        return (_ = t.nodes) != null && _.length
          ? y && t.nodes.some((x) => x.id === m.id)
          : y;
      }),
      g = p.every((m) => m.width && m.height);
    if (p.length > 0 && g) {
      const m = Fi(p, d),
        {
          x: y,
          y: _,
          zoom: x,
        } = Nu(m, r, o, t.minZoom ?? s, t.maxZoom ?? i, t.padding ?? 0.1),
        b = Zt.translate(y, _).scale(x);
      return (
        typeof t.duration == "number" && t.duration > 0
          ? a.transform(rn(l, t.duration), b)
          : a.transform(l, b),
        !0
      );
    }
  }
  return !1;
}
function r4(e, t) {
  return (
    e.forEach((n) => {
      const r = t.get(n.id);
      r &&
        t.set(r.id, {
          ...r,
          [Ne]: r[Ne],
          selected: n.selected,
        });
    }),
    new Map(t)
  );
}
function o4(e, t) {
  return t.map((n) => {
    const r = e.find((o) => o.id === n.id);
    return r && (n.selected = r.selected), n;
  });
}
function Br({ changedNodes: e, changedEdges: t, get: n, set: r }) {
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
    (l && r({ nodeInternals: r4(e, o) }), i == null || i(e)),
    t != null && t.length && (u && r({ edges: o4(t, s) }), a == null || a(t));
}
const yn = () => {},
  s4 = {
    zoomIn: yn,
    zoomOut: yn,
    zoomTo: yn,
    getZoom: () => 1,
    setViewport: yn,
    getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
    fitView: () => !1,
    setCenter: yn,
    fitBounds: yn,
    project: (e) => e,
    screenToFlowPosition: (e) => e,
    flowToScreenPosition: (e) => e,
    viewportInitialized: !1,
  },
  i4 = (e) => ({
    d3Zoom: e.d3Zoom,
    d3Selection: e.d3Selection,
  }),
  a4 = () => {
    const e = Le(),
      { d3Zoom: t, d3Selection: n } = we(i4, $e);
    return De(
      () =>
        n && t
          ? {
              zoomIn: (o) =>
                t.scaleBy(rn(n, o == null ? void 0 : o.duration), 1.2),
              zoomOut: (o) =>
                t.scaleBy(rn(n, o == null ? void 0 : o.duration), 1 / 1.2),
              zoomTo: (o, s) =>
                t.scaleTo(rn(n, s == null ? void 0 : s.duration), o),
              getZoom: () => e.getState().transform[2],
              setViewport: (o, s) => {
                const [i, a, l] = e.getState().transform,
                  u = Zt.translate(o.x ?? i, o.y ?? a).scale(o.zoom ?? l);
                t.transform(rn(n, s == null ? void 0 : s.duration), u);
              },
              getViewport: () => {
                const [o, s, i] = e.getState().transform;
                return { x: o, y: s, zoom: i };
              },
              fitView: (o) => Bu(e.getState, o),
              setCenter: (o, s, i) => {
                const { width: a, height: l, maxZoom: u } = e.getState(),
                  c = typeof (i == null ? void 0 : i.zoom) < "u" ? i.zoom : u,
                  d = a / 2 - o * c,
                  f = l / 2 - s * c,
                  h = Zt.translate(d, f).scale(c);
                t.transform(rn(n, i == null ? void 0 : i.duration), h);
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
                  } = Nu(
                    o,
                    i,
                    a,
                    l,
                    u,
                    (s == null ? void 0 : s.padding) ?? 0.1,
                  ),
                  h = Zt.translate(c, d).scale(f);
                t.transform(rn(n, s == null ? void 0 : s.duration), h);
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
                  Qs(o, s, i, a)
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
                return Qs(d, s, i, a);
              },
              flowToScreenPosition: (o) => {
                const { transform: s, domNode: i } = e.getState();
                if (!i) return o;
                const { x: a, y: l } = i.getBoundingClientRect(),
                  u = xu(o, s);
                return {
                  x: u.x + a,
                  y: u.y + l,
                };
              },
              viewportInitialized: !0,
            }
          : s4,
      [t, n],
    );
  };
function Pt() {
  const e = a4(),
    t = Le(),
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
      return m.find((y) => y.id === g);
    }, []),
    i = ge((g) => {
      const {
          getNodes: m,
          setNodes: y,
          hasDefaultNodes: _,
          onNodesChange: x,
        } = t.getState(),
        b = m(),
        C = typeof g == "function" ? g(b) : g;
      if (_) y(C);
      else if (x) {
        const A =
          C.length === 0
            ? b.map((O) => ({ type: "remove", id: O.id }))
            : C.map((O) => ({ item: O, type: "reset" }));
        x(A);
      }
    }, []),
    a = ge((g) => {
      const {
          edges: m = [],
          setEdges: y,
          hasDefaultEdges: _,
          onEdgesChange: x,
        } = t.getState(),
        b = typeof g == "function" ? g(m) : g;
      if (_) y(b);
      else if (x) {
        const C =
          b.length === 0
            ? m.map((A) => ({ type: "remove", id: A.id }))
            : b.map((A) => ({ item: A, type: "reset" }));
        x(C);
      }
    }, []),
    l = ge((g) => {
      const m = Array.isArray(g) ? g : [g],
        {
          getNodes: y,
          setNodes: _,
          hasDefaultNodes: x,
          onNodesChange: b,
        } = t.getState();
      if (x) {
        const A = [...y(), ...m];
        _(A);
      } else if (b) {
        const C = m.map((A) => ({ item: A, type: "add" }));
        b(C);
      }
    }, []),
    u = ge((g) => {
      const m = Array.isArray(g) ? g : [g],
        {
          edges: y = [],
          setEdges: _,
          hasDefaultEdges: x,
          onEdgesChange: b,
        } = t.getState();
      if (x) _([...y, ...m]);
      else if (b) {
        const C = m.map((A) => ({ item: A, type: "add" }));
        b(C);
      }
    }, []),
    c = ge(() => {
      const { getNodes: g, edges: m = [], transform: y } = t.getState(),
        [_, x, b] = y;
      return {
        nodes: g().map((C) => ({ ...C })),
        edges: m.map((C) => ({ ...C })),
        viewport: {
          x: _,
          y: x,
          zoom: b,
        },
      };
    }, []),
    d = ge(({ nodes: g, edges: m }) => {
      const {
          nodeInternals: y,
          getNodes: _,
          edges: x,
          hasDefaultNodes: b,
          hasDefaultEdges: C,
          onNodesDelete: A,
          onEdgesDelete: O,
          onNodesChange: S,
          onEdgesChange: P,
        } = t.getState(),
        L = (g || []).map((N) => N.id),
        j = (m || []).map((N) => N.id),
        B = _().reduce((N, w) => {
          const I = w.parentNode || w.parentId,
            k = !L.includes(w.id) && I && N.find((T) => T.id === I);
          return (
            (typeof w.deletable == "boolean" ? w.deletable : !0) &&
              (L.includes(w.id) || k) &&
              N.push(w),
            N
          );
        }, []),
        H = x.filter((N) =>
          typeof N.deletable == "boolean" ? N.deletable : !0,
        ),
        E = H.filter((N) => j.includes(N.id));
      if (B || E) {
        const N = Su(B, H),
          w = [...E, ...N],
          I = w.reduce((k, D) => (k.includes(D.id) || k.push(D.id), k), []);
        if (
          ((C || b) &&
            (C &&
              t.setState({
                edges: x.filter((k) => !I.includes(k.id)),
              }),
            b &&
              (B.forEach((k) => {
                y.delete(k.id);
              }),
              t.setState({
                nodeInternals: new Map(y),
              }))),
          I.length > 0 &&
            (O == null || O(w),
            P &&
              P(
                I.map((k) => ({
                  id: k,
                  type: "remove",
                })),
              )),
          B.length > 0 && (A == null || A(B), S))
        ) {
          const k = B.map((D) => ({ id: D.id, type: "remove" }));
          S(k);
        }
      }
    }, []),
    f = ge((g) => {
      const m = T3(g),
        y = m ? null : t.getState().nodeInternals.get(g.id);
      return !m && !y ? [null, null, m] : [m ? g : lc(y), y, m];
    }, []),
    h = ge((g, m = !0, y) => {
      const [_, x, b] = f(g);
      return _
        ? (y || t.getState().getNodes()).filter((C) => {
            if (!b && (C.id === x.id || !C.positionAbsolute)) return !1;
            const A = lc(C),
              O = Xs(A, _);
            return (m && O > 0) || O >= _.width * _.height;
          })
        : [];
    }, []),
    p = ge((g, m, y = !0) => {
      const [_] = f(g);
      if (!_) return !1;
      const x = Xs(_, m);
      return (y && x > 0) || x >= _.width * _.height;
    }, []);
  return De(
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
const c4 = { actInsideInputWithModifier: !1 };
var l4 = ({ deleteKeyCode: e, multiSelectionKeyCode: t }) => {
  const n = Le(),
    { deleteElements: r } = Pt(),
    o = fr(e, c4),
    s = fr(t);
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
function u4(e) {
  const t = Le();
  ie(() => {
    let n;
    const r = () => {
      var s, i;
      if (!e.current) return;
      const o = Ri(e.current);
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
const zi = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  d4 = (e, t) => e.x !== t.x || e.y !== t.y || e.zoom !== t.k,
  zr = (e) => ({
    x: e.x,
    y: e.y,
    zoom: e.k,
  }),
  vn = (e, t) => e.target.closest(`.${t}`),
  Ec = (e, t) => t === 2 && Array.isArray(e) && e.includes(2),
  Cc = (e) => {
    const t = e.ctrlKey && vo() ? 10 : 1;
    return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
  },
  f4 = (e) => ({
    d3Zoom: e.d3Zoom,
    d3Selection: e.d3Selection,
    d3ZoomHandler: e.d3ZoomHandler,
    userSelectionActive: e.userSelectionActive,
  }),
  h4 = ({
    onMove: e,
    onMoveStart: t,
    onMoveEnd: n,
    onPaneContextMenu: r,
    zoomOnScroll: o = !0,
    zoomOnPinch: s = !0,
    panOnScroll: i = !1,
    panOnScrollSpeed: a = 0.5,
    panOnScrollMode: l = an.Free,
    zoomOnDoubleClick: u = !0,
    elementsSelectable: c,
    panOnDrag: d = !0,
    defaultViewport: f,
    translateExtent: h,
    minZoom: p,
    maxZoom: g,
    zoomActivationKeyCode: m,
    preventScrolling: y = !0,
    children: _,
    noWheelClassName: x,
    noPanClassName: b,
  }) => {
    const C = se(),
      A = Le(),
      O = se(!1),
      S = se(!1),
      P = se(null),
      L = se({ x: 0, y: 0, zoom: 0 }),
      {
        d3Zoom: j,
        d3Selection: B,
        d3ZoomHandler: H,
        userSelectionActive: E,
      } = we(f4, $e),
      N = fr(m),
      w = se(0),
      I = se(!1),
      k = se();
    return (
      u4(P),
      ie(() => {
        if (P.current) {
          const D = P.current.getBoundingClientRect(),
            T = E3().scaleExtent([p, g]).translateExtent(h),
            R = lt(P.current).call(T),
            F = Zt.translate(f.x, f.y).scale(kn(f.zoom, p, g)),
            V = [
              [0, 0],
              [D.width, D.height],
            ],
            W = T.constrain()(F, V, h);
          T.transform(R, W),
            T.wheelDelta(Cc),
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
        B &&
          j &&
          (i && !N && !E
            ? B.on(
                "wheel.zoom",
                (D) => {
                  if (vn(D, x)) return !1;
                  D.preventDefault(), D.stopImmediatePropagation();
                  const T = B.property("__zoom").k || 1;
                  if (D.ctrlKey && s) {
                    const Q = vt(D),
                      ee = Cc(D),
                      K = T * Math.pow(2, ee);
                    j.scaleTo(B, K, Q, D);
                    return;
                  }
                  const R = D.deltaMode === 1 ? 20 : 1;
                  let F = l === an.Vertical ? 0 : D.deltaX * R,
                    V = l === an.Horizontal ? 0 : D.deltaY * R;
                  !vo() &&
                    D.shiftKey &&
                    l !== an.Vertical &&
                    ((F = D.deltaY * R), (V = 0)),
                    j.translateBy(
                      B,
                      -(F / T) * a,
                      -(V / T) * a,
                      // @ts-ignore
                      { internal: !0 },
                    );
                  const W = zr(B.property("__zoom")),
                    {
                      onViewportChangeStart: Y,
                      onViewportChange: q,
                      onViewportChangeEnd: X,
                    } = A.getState();
                  clearTimeout(k.current),
                    I.current ||
                      ((I.current = !0),
                      t == null || t(D, W),
                      Y == null || Y(W)),
                    I.current &&
                      (e == null || e(D, W),
                      q == null || q(W),
                      (k.current = setTimeout(() => {
                        n == null || n(D, W),
                          X == null || X(W),
                          (I.current = !1);
                      }, 150)));
                },
                { passive: !1 },
              )
            : typeof H < "u" &&
              B.on(
                "wheel.zoom",
                function (D, T) {
                  if ((!y && D.type === "wheel" && !D.ctrlKey) || vn(D, x))
                    return null;
                  D.preventDefault(), H.call(this, D, T);
                },
                { passive: !1 },
              ));
      }, [E, i, l, B, j, H, N, s, y, x, t, e, n]),
      ie(() => {
        j &&
          j.on("start", (D) => {
            var F, V;
            if (!D.sourceEvent || D.sourceEvent.internal) return null;
            w.current = (F = D.sourceEvent) == null ? void 0 : F.button;
            const { onViewportChangeStart: T } = A.getState(),
              R = zr(D.transform);
            (O.current = !0),
              (L.current = R),
              ((V = D.sourceEvent) == null ? void 0 : V.type) === "mousedown" &&
                A.setState({ paneDragging: !0 }),
              T == null || T(R),
              t == null || t(D.sourceEvent, R);
          });
      }, [j, t]),
      ie(() => {
        j &&
          (E && !O.current
            ? j.on("zoom", null)
            : E ||
              j.on("zoom", (D) => {
                var R;
                const { onViewportChange: T } = A.getState();
                if (
                  (A.setState({
                    transform: [D.transform.x, D.transform.y, D.transform.k],
                  }),
                  (S.current = !!(r && Ec(d, w.current ?? 0))),
                  (e || T) && !((R = D.sourceEvent) != null && R.internal))
                ) {
                  const F = zr(D.transform);
                  T == null || T(F), e == null || e(D.sourceEvent, F);
                }
              }));
      }, [E, j, e, d, r]),
      ie(() => {
        j &&
          j.on("end", (D) => {
            if (!D.sourceEvent || D.sourceEvent.internal) return null;
            const { onViewportChangeEnd: T } = A.getState();
            if (
              ((O.current = !1),
              A.setState({ paneDragging: !1 }),
              r && Ec(d, w.current ?? 0) && !S.current && r(D.sourceEvent),
              (S.current = !1),
              (n || T) && d4(L.current, D.transform))
            ) {
              const R = zr(D.transform);
              (L.current = R),
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
              (vn(D, "react-flow__node") || vn(D, "react-flow__edge"))
            )
              return !0;
            if (
              (!d && !T && !i && !u && !s) ||
              E ||
              (!u && D.type === "dblclick") ||
              (vn(D, x) && D.type === "wheel") ||
              (vn(D, b) &&
                (D.type !== "wheel" || (i && D.type === "wheel" && !N))) ||
              (!s && D.ctrlKey && D.type === "wheel") ||
              (!T && !i && !R && D.type === "wheel") ||
              (!d && (D.type === "mousedown" || D.type === "touchstart")) ||
              (Array.isArray(d) &&
                !d.includes(D.button) &&
                D.type === "mousedown")
            )
              return !1;
            const F =
              (Array.isArray(d) && d.includes(D.button)) ||
              !D.button ||
              D.button <= 1;
            return (!D.ctrlKey || D.type === "wheel") && F;
          });
      }, [E, j, o, s, i, u, d, c, N]),
      $.createElement(
        "div",
        { className: "react-flow__renderer", ref: P, style: zi },
        _,
      )
    );
  },
  p4 = (e) => ({
    userSelectionActive: e.userSelectionActive,
    userSelectionRect: e.userSelectionRect,
  });
function g4() {
  const { userSelectionActive: e, userSelectionRect: t } = we(p4, $e);
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
function bc(e, t) {
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
function m4(e, t) {
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
              i.expandParent && bc(r, i);
            break;
          }
          case "dimensions": {
            typeof a.dimensions < "u" &&
              ((i.width = a.dimensions.width),
              (i.height = a.dimensions.height)),
              typeof a.updateStyle < "u" &&
                (i.style = { ...(i.style || {}), ...a.dimensions }),
              typeof a.resizing == "boolean" && (i.resizing = a.resizing),
              i.expandParent && bc(r, i);
            break;
          }
          case "remove":
            return r;
        }
    return r.push(i), r;
  }, n);
}
function y4(e, t) {
  return m4(e, t);
}
const Ut = (e, t) => ({
  id: e,
  type: "select",
  selected: t,
});
function bn(e, t) {
  return e.reduce((n, r) => {
    const o = t.includes(r.id);
    return (
      !r.selected && o
        ? ((r.selected = !0), n.push(Ut(r.id, !0)))
        : r.selected && !o && ((r.selected = !1), n.push(Ut(r.id, !1))),
      n
    );
  }, []);
}
const _s = (e, t) => (n) => {
    n.target === t.current && (e == null || e(n));
  },
  v4 = (e) => ({
    userSelectionActive: e.userSelectionActive,
    elementsSelectable: e.elementsSelectable,
    dragging: e.paneDragging,
  }),
  zu = Te(
    ({
      isSelecting: e,
      selectionMode: t = dr.Full,
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
        h = Le(),
        p = se(0),
        g = se(0),
        m = se(),
        {
          userSelectionActive: y,
          elementsSelectable: _,
          dragging: x,
        } = we(v4, $e),
        b = () => {
          h.setState({ userSelectionActive: !1, userSelectionRect: null }),
            (p.current = 0),
            (g.current = 0);
        },
        C = (H) => {
          s == null || s(H),
            h.getState().resetSelectedElements(),
            h.setState({ nodesSelectionActive: !1 });
        },
        A = (H) => {
          if (Array.isArray(n) && n != null && n.includes(2)) {
            H.preventDefault();
            return;
          }
          i == null || i(H);
        },
        O = a ? (H) => a(H) : void 0,
        S = (H) => {
          const { resetSelectedElements: E, domNode: N } = h.getState();
          if (
            ((m.current = N == null ? void 0 : N.getBoundingClientRect()),
            !_ || !e || H.button !== 0 || H.target !== f.current || !m.current)
          )
            return;
          const { x: w, y: I } = Xt(H, m.current);
          E(),
            h.setState({
              userSelectionRect: {
                width: 0,
                height: 0,
                startX: w,
                startY: I,
                x: w,
                y: I,
              },
            }),
            r == null || r(H);
        },
        P = (H) => {
          const {
            userSelectionRect: E,
            nodeInternals: N,
            edges: w,
            transform: I,
            onNodesChange: k,
            onEdgesChange: D,
            nodeOrigin: T,
            getNodes: R,
          } = h.getState();
          if (!e || !m.current || !E) return;
          h.setState({ userSelectionActive: !0, nodesSelectionActive: !1 });
          const F = Xt(H, m.current),
            V = E.startX ?? 0,
            W = E.startY ?? 0,
            Y = {
              ...E,
              x: F.x < V ? F.x : V,
              y: F.y < W ? F.y : W,
              width: Math.abs(F.x - V),
              height: Math.abs(F.y - W),
            },
            q = R(),
            X = wu(N, Y, I, t === dr.Partial, !0, T),
            Q = Su(X, w).map((K) => K.id),
            ee = X.map((K) => K.id);
          if (p.current !== ee.length) {
            p.current = ee.length;
            const K = bn(q, ee);
            K.length && (k == null || k(K));
          }
          if (g.current !== Q.length) {
            g.current = Q.length;
            const K = bn(w, Q);
            K.length && (D == null || D(K));
          }
          h.setState({
            userSelectionRect: Y,
          });
        },
        L = (H) => {
          if (H.button !== 0) return;
          const { userSelectionRect: E } = h.getState();
          !y && E && H.target === f.current && (C == null || C(H)),
            h.setState({ nodesSelectionActive: p.current > 0 }),
            b(),
            o == null || o(H);
        },
        j = (H) => {
          y &&
            (h.setState({ nodesSelectionActive: p.current > 0 }),
            o == null || o(H)),
            b();
        },
        B = _ && (e || y);
      return $.createElement(
        "div",
        {
          className: ze(["react-flow__pane", { dragging: x, selection: e }]),
          onClick: B ? void 0 : _s(C, f),
          onContextMenu: _s(A, f),
          onWheel: _s(O, f),
          onMouseEnter: B ? void 0 : l,
          onMouseDown: B ? S : void 0,
          onMouseMove: B ? P : u,
          onMouseUp: B ? L : void 0,
          onMouseLeave: B ? j : c,
          ref: f,
          style: zi,
        },
        d,
        $.createElement(g4, null),
      );
    },
  );
zu.displayName = "Pane";
function Vu(e, t) {
  const n = e.parentNode || e.parentId;
  if (!n) return !1;
  const r = t.get(n);
  return r ? (r.selected ? !0 : Vu(r, t)) : !1;
}
function _c(e, t, n) {
  let r = e;
  do {
    if (r != null && r.matches(t)) return !0;
    if (r === n.current) return !1;
    r = r.parentElement;
  } while (r);
  return !1;
}
function E4(e, t, n, r) {
  return Array.from(e.values())
    .filter(
      (o) =>
        (o.selected || o.id === r) &&
        (!o.parentNode || o.parentId || !Vu(o, e)) &&
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
function C4(e, t) {
  return !t || t === "parent"
    ? t
    : [t[0], [t[1][0] - (e.width || 0), t[1][1] - (e.height || 0)]];
}
function Wu(e, t, n, r, o = [0, 0], s) {
  const i = C4(e, e.extent || r);
  let a = i;
  const l = e.parentNode || e.parentId;
  if (e.extent === "parent" && !e.expandParent)
    if (l && e.width && e.height) {
      const d = n.get(l),
        { x: f, y: h } = Nn(d, o).positionAbsolute;
      a =
        d && tt(f) && tt(h) && tt(d.width) && tt(d.height)
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
      { x: f, y: h } = Nn(d, o).positionAbsolute;
    a = [
      [e.extent[0][0] + f, e.extent[0][1] + h],
      [e.extent[1][0] + f, e.extent[1][1] + h],
    ];
  }
  let u = { x: 0, y: 0 };
  if (l) {
    const d = n.get(l);
    u = Nn(d, o).positionAbsolute;
  }
  const c = a && a !== "parent" ? Mi(t, a) : t;
  return {
    position: {
      x: c.x - u.x,
      y: c.y - u.y,
    },
    positionAbsolute: c,
  };
}
function xs({ nodeId: e, dragItems: t, nodeInternals: n }) {
  const r = t.map((o) => ({
    ...n.get(o.id),
    position: o.position,
    positionAbsolute: o.positionAbsolute,
  }));
  return [e ? r.find((o) => o.id === e) : r[0], r];
}
const xc = (e, t, n, r) => {
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
      ...Ri(l),
    };
  });
};
function qn(e, t, n) {
  return n === void 0
    ? n
    : (r) => {
        const o = t().nodeInternals.get(e);
        o && n(r, { ...o });
      };
}
function ti({ id: e, store: t, unselect: n = !1, nodeRef: r }) {
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
function b4() {
  const e = Le();
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
function ws(e) {
  return (t, n, r) => (e == null ? void 0 : e(t, r));
}
function Uu({
  nodeRef: e,
  disabled: t = !1,
  noDragClassName: n,
  handleSelector: r,
  nodeId: o,
  isSelectable: s,
  selectNodesOnDrag: i,
}) {
  const a = Le(),
    [l, u] = he(!1),
    c = se([]),
    d = se({ x: null, y: null }),
    f = se(0),
    h = se(null),
    p = se({ x: 0, y: 0 }),
    g = se(null),
    m = se(!1),
    y = se(!1),
    _ = b4();
  return (
    ie(() => {
      if (e != null && e.current) {
        const x = lt(e.current),
          b = ({ x: O, y: S }) => {
            const {
              nodeInternals: P,
              onNodeDrag: L,
              onSelectionDrag: j,
              updateNodePositions: B,
              nodeExtent: H,
              snapGrid: E,
              snapToGrid: N,
              nodeOrigin: w,
              onError: I,
            } = a.getState();
            d.current = { x: O, y: S };
            let k = !1,
              D = { x: 0, y: 0, x2: 0, y2: 0 };
            if (c.current.length > 1 && H) {
              const R = Fi(c.current, w);
              D = ki(R);
            }
            if (
              ((c.current = c.current.map((R) => {
                const F = { x: O - R.distance.x, y: S - R.distance.y };
                N &&
                  ((F.x = E[0] * Math.round(F.x / E[0])),
                  (F.y = E[1] * Math.round(F.y / E[1])));
                const V = [
                  [H[0][0], H[0][1]],
                  [H[1][0], H[1][1]],
                ];
                c.current.length > 1 &&
                  H &&
                  !R.extent &&
                  ((V[0][0] = R.positionAbsolute.x - D.x + H[0][0]),
                  (V[1][0] =
                    R.positionAbsolute.x + (R.width ?? 0) - D.x2 + H[1][0]),
                  (V[0][1] = R.positionAbsolute.y - D.y + H[0][1]),
                  (V[1][1] =
                    R.positionAbsolute.y + (R.height ?? 0) - D.y2 + H[1][1]));
                const W = Wu(R, F, P, V, w, I);
                return (
                  (k =
                    k ||
                    R.position.x !== W.position.x ||
                    R.position.y !== W.position.y),
                  (R.position = W.position),
                  (R.positionAbsolute = W.positionAbsolute),
                  R
                );
              })),
              !k)
            )
              return;
            B(c.current, !0, !0), u(!0);
            const T = o ? L : ws(j);
            if (T && g.current) {
              const [R, F] = xs({
                nodeId: o,
                dragItems: c.current,
                nodeInternals: P,
              });
              T(g.current, R, F);
            }
          },
          C = () => {
            if (!h.current) return;
            const [O, S] = pu(p.current, h.current);
            if (O !== 0 || S !== 0) {
              const { transform: P, panBy: L } = a.getState();
              (d.current.x = (d.current.x ?? 0) - O / P[2]),
                (d.current.y = (d.current.y ?? 0) - S / P[2]),
                L({ x: O, y: S }) && b(d.current);
            }
            f.current = requestAnimationFrame(C);
          },
          A = (O) => {
            var w;
            const {
              nodeInternals: S,
              multiSelectionActive: P,
              nodesDraggable: L,
              unselectNodesAndEdges: j,
              onNodeDragStart: B,
              onSelectionDragStart: H,
            } = a.getState();
            y.current = !0;
            const E = o ? B : ws(H);
            (!i || !s) &&
              !P &&
              o &&
              (((w = S.get(o)) != null && w.selected) || j()),
              o &&
                s &&
                i &&
                ti({
                  id: o,
                  store: a,
                  nodeRef: e,
                });
            const N = _(O);
            if (
              ((d.current = N), (c.current = E4(S, L, N, o)), E && c.current)
            ) {
              const [I, k] = xs({
                nodeId: o,
                dragItems: c.current,
                nodeInternals: S,
              });
              E(O.sourceEvent, I, k);
            }
          };
        if (t) x.on(".drag", null);
        else {
          const O = D2()
            .on("start", (S) => {
              const { domNode: P, nodeDragThreshold: L } = a.getState();
              L === 0 && A(S);
              const j = _(S);
              (d.current = j),
                (h.current =
                  (P == null ? void 0 : P.getBoundingClientRect()) || null),
                (p.current = Xt(S.sourceEvent, h.current));
            })
            .on("drag", (S) => {
              var B, H;
              const P = _(S),
                { autoPanOnNodeDrag: L, nodeDragThreshold: j } = a.getState();
              if (
                (!m.current && y.current && L && ((m.current = !0), C()),
                !y.current)
              ) {
                const E =
                    P.xSnapped -
                    (((B = d == null ? void 0 : d.current) == null
                      ? void 0
                      : B.x) ?? 0),
                  N =
                    P.ySnapped -
                    (((H = d == null ? void 0 : d.current) == null
                      ? void 0
                      : H.y) ?? 0);
                Math.sqrt(E * E + N * N) > j && A(S);
              }
              (d.current.x !== P.xSnapped || d.current.y !== P.ySnapped) &&
                c.current &&
                y.current &&
                ((g.current = S.sourceEvent),
                (p.current = Xt(S.sourceEvent, h.current)),
                b(P));
            })
            .on("end", (S) => {
              if (
                y.current &&
                (u(!1),
                (m.current = !1),
                (y.current = !1),
                cancelAnimationFrame(f.current),
                c.current)
              ) {
                const {
                    updateNodePositions: P,
                    nodeInternals: L,
                    onNodeDragStop: j,
                    onSelectionDragStop: B,
                  } = a.getState(),
                  H = o ? j : ws(B);
                if ((P(c.current, !1, !1), H)) {
                  const [E, N] = xs({
                    nodeId: o,
                    dragItems: c.current,
                    nodeInternals: L,
                  });
                  H(S.sourceEvent, E, N);
                }
              }
            })
            .filter((S) => {
              const P = S.target;
              return (
                !S.button && (!n || !_c(P, `.${n}`, e)) && (!r || _c(P, r, e))
              );
            });
          return (
            x.call(O),
            () => {
              x.on(".drag", null);
            }
          );
        }
      }
    }, [e, t, n, r, s, a, o, i, _]),
    l
  );
}
function Yu() {
  const e = Le();
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
        (_) => _.selected && (_.draggable || (c && typeof _.draggable > "u")),
      ),
      f = a ? l[0] : 5,
      h = a ? l[1] : 5,
      p = n.isShiftPressed ? 4 : 1,
      g = n.x * f * p,
      m = n.y * h * p,
      y = d.map((_) => {
        if (_.positionAbsolute) {
          const x = {
            x: _.positionAbsolute.x + g,
            y: _.positionAbsolute.y + m,
          };
          a &&
            ((x.x = l[0] * Math.round(x.x / l[0])),
            (x.y = l[1] * Math.round(x.y / l[1])));
          const { positionAbsolute: b, position: C } = Wu(
            _,
            x,
            r,
            o,
            void 0,
            u,
          );
          (_.position = C), (_.positionAbsolute = b);
        }
        return _;
      });
    s(y, !0, !1);
  }, []);
}
const Tn = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
var Zn = (e) => {
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
    className: y,
    isDraggable: _,
    isSelectable: x,
    isConnectable: b,
    isFocusable: C,
    selectNodesOnDrag: A,
    sourcePosition: O,
    targetPosition: S,
    hidden: P,
    resizeObserver: L,
    dragHandle: j,
    zIndex: B,
    isParent: H,
    noDragClassName: E,
    noPanClassName: N,
    initialized: w,
    disableKeyboardA11y: I,
    ariaLabel: k,
    rfId: D,
    hasHandleBounds: T,
  }) => {
    const R = Le(),
      F = se(null),
      V = se(null),
      W = se(O),
      Y = se(S),
      q = se(r),
      X = x || _ || c || d || f || h,
      Q = Yu(),
      ee = qn(n, R.getState, d),
      K = qn(n, R.getState, f),
      de = qn(n, R.getState, h),
      Z = qn(n, R.getState, p),
      ve = qn(n, R.getState, g),
      Pe = (Ce) => {
        const { nodeDragThreshold: re } = R.getState();
        if (
          (x &&
            (!A || !_ || re > 0) &&
            ti({
              id: n,
              store: R,
              nodeRef: F,
            }),
          c)
        ) {
          const Me = R.getState().nodeInternals.get(n);
          Me && c(Ce, { ...Me });
        }
      },
      _e = (Ce) => {
        if (!Ks(Ce) && !I)
          if (mu.includes(Ce.key) && x) {
            const re = Ce.key === "Escape";
            ti({
              id: n,
              store: R,
              unselect: re,
              nodeRef: F,
            });
          } else
            _ &&
              u &&
              Object.prototype.hasOwnProperty.call(Tn, Ce.key) &&
              (R.setState({
                ariaLiveMessage: `Moved selected node ${Ce.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~s}, y: ${~~i}`,
              }),
              Q({
                x: Tn[Ce.key].x,
                y: Tn[Ce.key].y,
                isShiftPressed: Ce.shiftKey,
              }));
      };
    ie(
      () => () => {
        V.current && (L == null || L.unobserve(V.current), (V.current = null));
      },
      [],
    ),
      ie(() => {
        if (F.current && !P) {
          const Ce = F.current;
          (!w || !T || V.current !== Ce) &&
            (V.current && (L == null || L.unobserve(V.current)),
            L == null || L.observe(Ce),
            (V.current = Ce));
        }
      }, [P, w, T]),
      ie(() => {
        const Ce = q.current !== r,
          re = W.current !== O,
          Me = Y.current !== S;
        F.current &&
          (Ce || re || Me) &&
          (Ce && (q.current = r),
          re && (W.current = O),
          Me && (Y.current = S),
          R.getState().updateNodeDimensions([
            { id: n, nodeElement: F.current, forceUpdate: !0 },
          ]));
      }, [n, r, O, S]);
    const Fe = Uu({
      nodeRef: F,
      disabled: P || !_,
      noDragClassName: E,
      handleSelector: j,
      nodeId: n,
      isSelectable: x,
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
                [N]: _,
              },
              y,
              {
                selected: u,
                selectable: x,
                parent: H,
                dragging: Fe,
              },
            ]),
            ref: F,
            style: {
              zIndex: B,
              transform: `translate(${a}px,${l}px)`,
              pointerEvents: X ? "all" : "none",
              visibility: w ? "visible" : "hidden",
              ...m,
            },
            "data-id": n,
            "data-testid": `rf__node-${n}`,
            onMouseEnter: ee,
            onMouseMove: K,
            onMouseLeave: de,
            onContextMenu: Z,
            onClick: Pe,
            onDoubleClick: ve,
            onKeyDown: C ? _e : void 0,
            tabIndex: C ? 0 : void 0,
            role: C ? "button" : void 0,
            "aria-describedby": I ? void 0 : `${ju}-${D}`,
            "aria-label": k,
          },
          $.createElement(
            M3,
            { value: n },
            $.createElement(e, {
              id: n,
              data: o,
              type: r,
              xPos: s,
              yPos: i,
              selected: u,
              isConnectable: b,
              sourcePosition: O,
              targetPosition: S,
              dragging: Fe,
              dragHandle: j,
              zIndex: B,
            }),
          ),
        );
  };
  return (t.displayName = "NodeWrapper"), Te(t);
};
const _4 = (e) => {
  const t = e.getNodes().filter((n) => n.selected);
  return {
    ...Fi(t, e.nodeOrigin),
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`,
    userSelectionActive: e.userSelectionActive,
  };
};
function x4({
  onSelectionContextMenu: e,
  noPanClassName: t,
  disableKeyboardA11y: n,
}) {
  const r = Le(),
    {
      width: o,
      height: s,
      x: i,
      y: a,
      transformString: l,
      userSelectionActive: u,
    } = we(_4, $e),
    c = Yu(),
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
    Uu({
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
      Object.prototype.hasOwnProperty.call(Tn, p.key) &&
        c({
          x: Tn[p.key].x,
          y: Tn[p.key].y,
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
var w4 = Te(x4);
const S4 = (e) => e.nodesSelectionActive,
  qu = ({
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
    panActivationKeyCode: y,
    zoomActivationKeyCode: _,
    elementsSelectable: x,
    zoomOnScroll: b,
    zoomOnPinch: C,
    panOnScroll: A,
    panOnScrollSpeed: O,
    panOnScrollMode: S,
    zoomOnDoubleClick: P,
    panOnDrag: L,
    defaultViewport: j,
    translateExtent: B,
    minZoom: H,
    maxZoom: E,
    preventScrolling: N,
    onSelectionContextMenu: w,
    noWheelClassName: I,
    noPanClassName: k,
    disableKeyboardA11y: D,
  }) => {
    const T = we(S4),
      R = fr(d),
      F = fr(y),
      V = F || L,
      W = F || A,
      Y = R || (f && V !== !0);
    return (
      l4({ deleteKeyCode: a, multiSelectionKeyCode: m }),
      $.createElement(
        h4,
        {
          onMove: l,
          onMoveStart: u,
          onMoveEnd: c,
          onPaneContextMenu: s,
          elementsSelectable: x,
          zoomOnScroll: b,
          zoomOnPinch: C,
          panOnScroll: W,
          panOnScrollSpeed: O,
          panOnScrollMode: S,
          zoomOnDoubleClick: P,
          panOnDrag: !R && V,
          defaultViewport: j,
          translateExtent: B,
          minZoom: H,
          maxZoom: E,
          zoomActivationKeyCode: _,
          preventScrolling: N,
          noWheelClassName: I,
          noPanClassName: k,
        },
        $.createElement(
          zu,
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
            $.createElement(w4, {
              onSelectionContextMenu: w,
              noPanClassName: k,
              disableKeyboardA11y: D,
            }),
        ),
      )
    );
  };
qu.displayName = "FlowRenderer";
var N4 = Te(qu);
function T4(e) {
  return we(
    ge(
      (n) =>
        e
          ? wu(
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
function A4(e) {
  const t = {
      input: Zn(e.input || Mu),
      default: Zn(e.default || ei),
      output: Zn(e.output || Lu),
      group: Zn(e.group || Bi),
    },
    n = {},
    r = Object.keys(e)
      .filter((o) => !["input", "default", "output", "group"].includes(o))
      .reduce((o, s) => ((o[s] = Zn(e[s] || ei)), o), n);
  return {
    ...t,
    ...r,
  };
}
const D4 = ({ x: e, y: t, width: n, height: r, origin: o }) =>
    !n || !r
      ? { x: e, y: t }
      : o[0] < 0 || o[1] < 0 || o[0] > 1 || o[1] > 1
        ? { x: e, y: t }
        : {
            x: e - n * o[0],
            y: t - r * o[1],
          },
  O4 = (e) => ({
    nodesDraggable: e.nodesDraggable,
    nodesConnectable: e.nodesConnectable,
    nodesFocusable: e.nodesFocusable,
    elementsSelectable: e.elementsSelectable,
    updateNodeDimensions: e.updateNodeDimensions,
    onError: e.onError,
  }),
  Zu = (e) => {
    const {
        nodesDraggable: t,
        nodesConnectable: n,
        nodesFocusable: r,
        elementsSelectable: o,
        updateNodeDimensions: s,
        onError: i,
      } = we(O4, $e),
      a = T4(e.onlyRenderVisibleElements),
      l = se(),
      u = De(() => {
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
        { className: "react-flow__nodes", style: zi },
        a.map((c) => {
          var C, A, O;
          let d = c.type || "default";
          e.nodeTypes[d] ||
            (i == null || i("003", ht.error003(d)), (d = "default"));
          const f = e.nodeTypes[d] || e.nodeTypes.default,
            h = !!(c.draggable || (t && typeof c.draggable > "u")),
            p = !!(c.selectable || (o && typeof c.selectable > "u")),
            g = !!(c.connectable || (n && typeof c.connectable > "u")),
            m = !!(c.focusable || (r && typeof c.focusable > "u")),
            y = e.nodeExtent
              ? Mi(c.positionAbsolute, e.nodeExtent)
              : c.positionAbsolute,
            _ = (y == null ? void 0 : y.x) ?? 0,
            x = (y == null ? void 0 : y.y) ?? 0,
            b = D4({
              x: _,
              y: x,
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
            sourcePosition: c.sourcePosition || te.Bottom,
            targetPosition: c.targetPosition || te.Top,
            hidden: c.hidden,
            xPos: _,
            yPos: x,
            xPosOrigin: b.x,
            yPosOrigin: b.y,
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
            zIndex: ((C = c[Ne]) == null ? void 0 : C.z) ?? 0,
            isParent: !!((A = c[Ne]) != null && A.isParent),
            noDragClassName: e.noDragClassName,
            noPanClassName: e.noPanClassName,
            initialized: !!c.width && !!c.height,
            rfId: e.rfId,
            disableKeyboardA11y: e.disableKeyboardA11y,
            ariaLabel: c.ariaLabel,
            hasHandleBounds: !!((O = c[Ne]) != null && O.handleBounds),
          });
        }),
      )
    );
  };
Zu.displayName = "NodeRenderer";
var I4 = Te(Zu);
const R4 = (e, t, n) => (n === te.Left ? e - t : n === te.Right ? e + t : e),
  M4 = (e, t, n) => (n === te.Top ? e - t : n === te.Bottom ? e + t : e),
  wc = "react-flow__edgeupdater",
  Sc = ({
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
      className: ze([wc, `${wc}-${a}`]),
      cx: R4(t, r, e),
      cy: M4(n, r, e),
      r,
      stroke: "transparent",
      fill: "transparent",
    }),
  k4 = () => !0;
var En = (e) => {
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
    source: y,
    target: _,
    sourceX: x,
    sourceY: b,
    targetX: C,
    targetY: A,
    sourcePosition: O,
    targetPosition: S,
    elementsSelectable: P,
    hidden: L,
    sourceHandleId: j,
    targetHandleId: B,
    onContextMenu: H,
    onMouseEnter: E,
    onMouseMove: N,
    onMouseLeave: w,
    edgeUpdaterRadius: I,
    onEdgeUpdate: k,
    onEdgeUpdateStart: D,
    onEdgeUpdateEnd: T,
    markerEnd: R,
    markerStart: F,
    rfId: V,
    ariaLabel: W,
    isFocusable: Y,
    isUpdatable: q,
    pathOptions: X,
    interactionWidth: Q,
    disableKeyboardA11y: ee,
  }) => {
    const K = se(null),
      [de, Z] = he(!1),
      [ve, Pe] = he(!1),
      _e = Le(),
      Fe = De(() => `url('#${Js(F, V)}')`, [F, V]),
      Ce = De(() => `url('#${Js(R, V)}')`, [R, V]);
    if (L) return null;
    const re = (Ie) => {
        var Je;
        const {
            edges: qe,
            addSelectedEdges: Nt,
            unselectNodesAndEdges: Tt,
            multiSelectionActive: At,
          } = _e.getState(),
          st = qe.find((Qt) => Qt.id === n);
        st &&
          (P &&
            (_e.setState({ nodesSelectionActive: !1 }),
            st.selected && At
              ? (Tt({ nodes: [], edges: [st] }),
                (Je = K.current) == null || Je.blur())
              : Nt([n])),
          i && i(Ie, st));
      },
      Me = Yn(n, _e.getState, a),
      xt = Yn(n, _e.getState, H),
      Jt = Yn(n, _e.getState, E),
      gt = Yn(n, _e.getState, N),
      jt = Yn(n, _e.getState, w),
      ot = (Ie, qe) => {
        if (Ie.button !== 0) return;
        const { edges: Nt, isValidConnection: Tt } = _e.getState(),
          At = qe ? _ : y,
          st = (qe ? B : j) || null,
          Je = qe ? "target" : "source",
          Qt = Tt || k4,
          en = qe,
          Ht = Nt.find((it) => it.id === n);
        Pe(!0), D == null || D(Ie, Ht, Je);
        const yt = (it) => {
          Pe(!1), T == null || T(it, Ht, Je);
        };
        Du({
          event: Ie,
          handleId: st,
          nodeId: At,
          onConnect: (it) => (k == null ? void 0 : k(Ht, it)),
          isTarget: en,
          getState: _e.getState,
          setState: _e.setState,
          isValidConnection: Qt,
          edgeUpdaterType: Je,
          onEdgeUpdateEnd: yt,
        });
      },
      wt = (Ie) => ot(Ie, !0),
      mt = (Ie) => ot(Ie, !1),
      Ye = () => Z(!0),
      $t = () => Z(!1),
      St = !P && !i,
      Ft = (Ie) => {
        var qe;
        if (!ee && mu.includes(Ie.key) && P) {
          const {
            unselectNodesAndEdges: Nt,
            addSelectedEdges: Tt,
            edges: At,
          } = _e.getState();
          Ie.key === "Escape"
            ? ((qe = K.current) == null || qe.blur(),
              Nt({ edges: [At.find((Je) => Je.id === n)] }))
            : Tt([n]);
        }
      };
    return $.createElement(
      "g",
      {
        className: ze([
          "react-flow__edge",
          `react-flow__edge-${o}`,
          r,
          { selected: l, animated: u, inactive: St, updating: de },
        ]),
        onClick: re,
        onDoubleClick: Me,
        onContextMenu: xt,
        onMouseEnter: Jt,
        onMouseMove: gt,
        onMouseLeave: jt,
        onKeyDown: Y ? Ft : void 0,
        tabIndex: Y ? 0 : void 0,
        role: Y ? "button" : "img",
        "data-testid": `rf__edge-${n}`,
        "aria-label": W === null ? void 0 : W || `Edge from ${y} to ${_}`,
        "aria-describedby": Y ? `${$u}-${V}` : void 0,
        ref: K,
      },
      !ve &&
        $.createElement(e, {
          id: n,
          source: y,
          target: _,
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
          sourceX: x,
          sourceY: b,
          targetX: C,
          targetY: A,
          sourcePosition: O,
          targetPosition: S,
          sourceHandleId: j,
          targetHandleId: B,
          markerStart: Fe,
          markerEnd: Ce,
          pathOptions: X,
          interactionWidth: Q,
        }),
      q &&
        $.createElement(
          $.Fragment,
          null,
          (q === "source" || q === !0) &&
            $.createElement(Sc, {
              position: O,
              centerX: x,
              centerY: b,
              radius: I,
              onMouseDown: wt,
              onMouseEnter: Ye,
              onMouseOut: $t,
              type: "source",
            }),
          (q === "target" || q === !0) &&
            $.createElement(Sc, {
              position: S,
              centerX: C,
              centerY: A,
              radius: I,
              onMouseDown: mt,
              onMouseEnter: Ye,
              onMouseOut: $t,
              type: "target",
            }),
        ),
    );
  };
  return (t.displayName = "EdgeWrapper"), Te(t);
};
function L4(e) {
  const t = {
      default: En(e.default || Co),
      straight: En(e.bezier || ji),
      step: En(e.step || Pi),
      smoothstep: En(e.step || Vo),
      simplebezier: En(e.simplebezier || Li),
    },
    n = {},
    r = Object.keys(e)
      .filter((o) => !["default", "bezier"].includes(o))
      .reduce((o, s) => ((o[s] = En(e[s] || Co)), o), n);
  return {
    ...t,
    ...r,
  };
}
function Nc(e, t, n = null) {
  const r = ((n == null ? void 0 : n.x) || 0) + t.x,
    o = ((n == null ? void 0 : n.y) || 0) + t.y,
    s = (n == null ? void 0 : n.width) || t.width,
    i = (n == null ? void 0 : n.height) || t.height;
  switch (e) {
    case te.Top:
      return {
        x: r + s / 2,
        y: o,
      };
    case te.Right:
      return {
        x: r + s,
        y: o + i / 2,
      };
    case te.Bottom:
      return {
        x: r + s / 2,
        y: o + i,
      };
    case te.Left:
      return {
        x: r,
        y: o + i / 2,
      };
  }
}
function Tc(e, t) {
  return e
    ? e.length === 1 || !t
      ? e[0]
      : (t && e.find((n) => n.id === t)) || null
    : null;
}
const P4 = (e, t, n, r, o, s) => {
  const i = Nc(n, e, t),
    a = Nc(s, r, o);
  return {
    sourceX: i.x,
    sourceY: i.y,
    targetX: a.x,
    targetY: a.y,
  };
};
function j4({
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
  const c = ki({
      x: (0 - l[0]) / l[2],
      y: (0 - l[1]) / l[2],
      width: i / l[2],
      height: a / l[2],
    }),
    d = Math.max(0, Math.min(c.x2, u.x2) - Math.max(c.x, u.x)),
    f = Math.max(0, Math.min(c.y2, u.y2) - Math.max(c.y, u.y));
  return Math.ceil(d * f) > 0;
}
function Ac(e) {
  var r, o, s, i, a;
  const t =
      ((r = e == null ? void 0 : e[Ne]) == null ? void 0 : r.handleBounds) ||
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
const $4 = [{ level: 0, isMaxLevel: !0, edges: [] }];
function F4(e, t, n = !1) {
  let r = -1;
  const o = e.reduce((i, a) => {
      var c, d;
      const l = tt(a.zIndex);
      let u = l ? a.zIndex : 0;
      if (n) {
        const f = t.get(a.target),
          h = t.get(a.source),
          p =
            a.selected ||
            (f == null ? void 0 : f.selected) ||
            (h == null ? void 0 : h.selected),
          g = Math.max(
            ((c = h == null ? void 0 : h[Ne]) == null ? void 0 : c.z) || 0,
            ((d = f == null ? void 0 : f[Ne]) == null ? void 0 : d.z) || 0,
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
  return s.length === 0 ? $4 : s;
}
function H4(e, t, n) {
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
                j4({
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
  return F4(r, t, n);
}
const B4 = ({ color: e = "none", strokeWidth: t = 1 }) =>
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
  z4 = ({ color: e = "none", strokeWidth: t = 1 }) =>
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
  Dc = {
    [Eo.Arrow]: B4,
    [Eo.ArrowClosed]: z4,
  };
function V4(e) {
  const t = Le();
  return De(() => {
    var o, s;
    return Object.prototype.hasOwnProperty.call(Dc, e)
      ? Dc[e]
      : ((s = (o = t.getState()).onError) == null ||
          s.call(o, "009", ht.error009(e)),
        null);
  }, [e]);
}
const W4 = ({
    id: e,
    type: t,
    color: n,
    width: r = 12.5,
    height: o = 12.5,
    markerUnits: s = "strokeWidth",
    strokeWidth: i,
    orient: a = "auto-start-reverse",
  }) => {
    const l = V4(t);
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
  U4 =
    ({ defaultColor: e, rfId: t }) =>
    (n) => {
      const r = [];
      return n.edges
        .reduce(
          (o, s) => (
            [s.markerStart, s.markerEnd].forEach((i) => {
              if (i && typeof i == "object") {
                const a = Js(i, t);
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
  Xu = ({ defaultColor: e, rfId: t }) => {
    const n = we(
      ge(U4({ defaultColor: e, rfId: t }), [e, t]),
      // the id includes all marker options, so we just need to look at that part of the marker
      (r, o) => !(r.length !== o.length || r.some((s, i) => s.id !== o[i].id)),
    );
    return $.createElement(
      "defs",
      null,
      n.map((r) =>
        $.createElement(W4, {
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
Xu.displayName = "MarkerDefinitions";
var Y4 = Te(Xu);
const q4 = (e) => ({
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
  Ku = ({
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
    disableKeyboardA11y: y,
  }) => {
    const {
        edgesFocusable: _,
        edgesUpdatable: x,
        elementsSelectable: b,
        width: C,
        height: A,
        connectionMode: O,
        nodeInternals: S,
        onError: P,
      } = we(q4, $e),
      L = H4(t, S, n);
    return C
      ? $.createElement(
          $.Fragment,
          null,
          L.map(({ level: j, edges: B, isMaxLevel: H }) =>
            $.createElement(
              "svg",
              {
                key: j,
                style: { zIndex: j },
                width: C,
                height: A,
                className: "react-flow__edges react-flow__container",
              },
              H && $.createElement(Y4, { defaultColor: e, rfId: r }),
              $.createElement(
                "g",
                null,
                B.map((E) => {
                  const [N, w, I] = Ac(S.get(E.source)),
                    [k, D, T] = Ac(S.get(E.target));
                  if (!I || !T) return null;
                  let R = E.type || "default";
                  o[R] ||
                    (P == null || P("011", ht.error011(R)), (R = "default"));
                  const F = o[R] || o.default,
                    V =
                      O === dn.Strict
                        ? D.target
                        : (D.target ?? []).concat(D.source ?? []),
                    W = Tc(w.source, E.sourceHandle),
                    Y = Tc(V, E.targetHandle),
                    q = (W == null ? void 0 : W.position) || te.Bottom,
                    X = (Y == null ? void 0 : Y.position) || te.Top,
                    Q = !!(E.focusable || (_ && typeof E.focusable > "u")),
                    ee =
                      typeof i < "u" &&
                      (E.updatable || (x && typeof E.updatable > "u"));
                  if (!W || !Y)
                    return P == null || P("008", ht.error008(W, E)), null;
                  const {
                    sourceX: K,
                    sourceY: de,
                    targetX: Z,
                    targetY: ve,
                  } = P4(N, W, q, k, Y, X);
                  return $.createElement(F, {
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
                    sourceY: de,
                    targetX: Z,
                    targetY: ve,
                    sourcePosition: q,
                    targetPosition: X,
                    elementsSelectable: b,
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
                    isUpdatable: ee,
                    pathOptions: "pathOptions" in E ? E.pathOptions : void 0,
                    interactionWidth: E.interactionWidth,
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
Ku.displayName = "EdgeRenderer";
var Z4 = Te(Ku);
const X4 = (e) =>
  `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function K4({ children: e }) {
  const t = we(X4);
  return $.createElement(
    "div",
    {
      className: "react-flow__viewport react-flow__container",
      style: { transform: t },
    },
    e,
  );
}
function G4(e) {
  const t = Pt(),
    n = se(!1);
  ie(() => {
    !n.current &&
      t.viewportInitialized &&
      e &&
      (setTimeout(() => e(t), 1), (n.current = !0));
  }, [e, t.viewportInitialized]);
}
const J4 = {
    [te.Left]: te.Right,
    [te.Right]: te.Left,
    [te.Top]: te.Bottom,
    [te.Bottom]: te.Top,
  },
  Gu = ({
    nodeId: e,
    handleType: t,
    style: n,
    type: r = Yt.Bezier,
    CustomComponent: o,
    connectionStatus: s,
  }) => {
    var A, O, S;
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
      d = (A = i == null ? void 0 : i[Ne]) == null ? void 0 : A.handleBounds;
    let f = d == null ? void 0 : d[t];
    if (
      (c === dn.Loose &&
        (f =
          f || (d == null ? void 0 : d[t === "source" ? "target" : "source"])),
      !i || !f)
    )
      return null;
    const h = a ? f.find((P) => P.id === a) : f[0],
      p = h ? h.x + h.width / 2 : (i.width ?? 0) / 2,
      g = h ? h.y + h.height / 2 : i.height ?? 0,
      m = (((O = i.positionAbsolute) == null ? void 0 : O.x) ?? 0) + p,
      y = (((S = i.positionAbsolute) == null ? void 0 : S.y) ?? 0) + g,
      _ = h == null ? void 0 : h.position,
      x = _ ? J4[_] : null;
    if (!_ || !x) return null;
    if (o)
      return $.createElement(o, {
        connectionLineType: r,
        connectionLineStyle: n,
        fromNode: i,
        fromHandle: h,
        fromX: m,
        fromY: y,
        toX: l,
        toY: u,
        fromPosition: _,
        toPosition: x,
        connectionStatus: s,
      });
    let b = "";
    const C = {
      sourceX: m,
      sourceY: y,
      sourcePosition: _,
      targetX: l,
      targetY: u,
      targetPosition: x,
    };
    return (
      r === Yt.Bezier
        ? ([b] = _u(C))
        : r === Yt.Step
          ? ([b] = Gs({
              ...C,
              borderRadius: 0,
            }))
          : r === Yt.SmoothStep
            ? ([b] = Gs(C))
            : r === Yt.SimpleBezier
              ? ([b] = bu(C))
              : (b = `M${m},${y} ${l},${u}`),
      $.createElement("path", {
        d: b,
        fill: "none",
        className: "react-flow__connection-path",
        style: n,
      })
    );
  };
Gu.displayName = "ConnectionLine";
const Q4 = (e) => ({
  nodeId: e.connectionNodeId,
  handleType: e.connectionHandleType,
  nodesConnectable: e.nodesConnectable,
  connectionStatus: e.connectionStatus,
  width: e.width,
  height: e.height,
});
function e8({ containerStyle: e, style: t, type: n, component: r }) {
  const {
    nodeId: o,
    handleType: s,
    nodesConnectable: i,
    width: a,
    height: l,
    connectionStatus: u,
  } = we(Q4, $e);
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
          $.createElement(Gu, {
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
function Oc(e, t) {
  const n = se(null),
    r = Le();
  return De(() => {
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
const Ju = ({
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
  connectionLineType: y,
  connectionLineStyle: _,
  connectionLineComponent: x,
  connectionLineContainerStyle: b,
  selectionKeyCode: C,
  selectionOnDrag: A,
  selectionMode: O,
  multiSelectionKeyCode: S,
  panActivationKeyCode: P,
  zoomActivationKeyCode: L,
  deleteKeyCode: j,
  onlyRenderVisibleElements: B,
  elementsSelectable: H,
  selectNodesOnDrag: E,
  defaultViewport: N,
  translateExtent: w,
  minZoom: I,
  maxZoom: k,
  preventScrolling: D,
  defaultMarkerColor: T,
  zoomOnScroll: R,
  zoomOnPinch: F,
  panOnScroll: V,
  panOnScrollSpeed: W,
  panOnScrollMode: Y,
  zoomOnDoubleClick: q,
  panOnDrag: X,
  onPaneClick: Q,
  onPaneMouseEnter: ee,
  onPaneMouseMove: K,
  onPaneMouseLeave: de,
  onPaneScroll: Z,
  onPaneContextMenu: ve,
  onEdgeUpdate: Pe,
  onEdgeContextMenu: _e,
  onEdgeMouseEnter: Fe,
  onEdgeMouseMove: Ce,
  onEdgeMouseLeave: re,
  edgeUpdaterRadius: Me,
  onEdgeUpdateStart: xt,
  onEdgeUpdateEnd: Jt,
  noDragClassName: gt,
  noWheelClassName: jt,
  noPanClassName: ot,
  elevateEdgesOnSelect: wt,
  disableKeyboardA11y: mt,
  nodeOrigin: Ye,
  nodeExtent: $t,
  rfId: St,
}) => {
  const Ft = Oc(e, A4),
    Ie = Oc(t, L4);
  return (
    G4(s),
    $.createElement(
      N4,
      {
        onPaneClick: Q,
        onPaneMouseEnter: ee,
        onPaneMouseMove: K,
        onPaneMouseLeave: de,
        onPaneContextMenu: ve,
        onPaneScroll: Z,
        deleteKeyCode: j,
        selectionKeyCode: C,
        selectionOnDrag: A,
        selectionMode: O,
        onSelectionStart: g,
        onSelectionEnd: m,
        multiSelectionKeyCode: S,
        panActivationKeyCode: P,
        zoomActivationKeyCode: L,
        elementsSelectable: H,
        onMove: n,
        onMoveStart: r,
        onMoveEnd: o,
        zoomOnScroll: R,
        zoomOnPinch: F,
        zoomOnDoubleClick: q,
        panOnScroll: V,
        panOnScrollSpeed: W,
        panOnScrollMode: Y,
        panOnDrag: X,
        defaultViewport: N,
        translateExtent: w,
        minZoom: I,
        maxZoom: k,
        onSelectionContextMenu: p,
        preventScrolling: D,
        noDragClassName: gt,
        noWheelClassName: jt,
        noPanClassName: ot,
        disableKeyboardA11y: mt,
      },
      $.createElement(
        K4,
        null,
        $.createElement(
          Z4,
          {
            edgeTypes: Ie,
            onEdgeClick: a,
            onEdgeDoubleClick: u,
            onEdgeUpdate: Pe,
            onlyRenderVisibleElements: B,
            onEdgeContextMenu: _e,
            onEdgeMouseEnter: Fe,
            onEdgeMouseMove: Ce,
            onEdgeMouseLeave: re,
            onEdgeUpdateStart: xt,
            onEdgeUpdateEnd: Jt,
            edgeUpdaterRadius: Me,
            defaultMarkerColor: T,
            noPanClassName: ot,
            elevateEdgesOnSelect: !!wt,
            disableKeyboardA11y: mt,
            rfId: St,
          },
          $.createElement(e8, {
            style: _,
            type: y,
            component: x,
            containerStyle: b,
          }),
        ),
        $.createElement("div", { className: "react-flow__edgelabel-renderer" }),
        $.createElement(I4, {
          nodeTypes: Ft,
          onNodeClick: i,
          onNodeDoubleClick: l,
          onNodeMouseEnter: c,
          onNodeMouseMove: d,
          onNodeMouseLeave: f,
          onNodeContextMenu: h,
          selectNodesOnDrag: E,
          onlyRenderVisibleElements: B,
          noPanClassName: ot,
          noDragClassName: gt,
          disableKeyboardA11y: mt,
          nodeOrigin: Ye,
          nodeExtent: $t,
          rfId: St,
        }),
      ),
    )
  );
};
Ju.displayName = "GraphView";
var t8 = Te(Ju);
const ni = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  zt = {
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
    translateExtent: ni,
    nodeExtent: ni,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionNodeId: null,
    connectionHandleId: null,
    connectionHandleType: "source",
    connectionPosition: { x: 0, y: 0 },
    connectionStatus: null,
    connectionMode: dn.Strict,
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
    onError: yu,
    isValidConnection: void 0,
  },
  n8 = () =>
    Bp(
      (e, t) => ({
        ...zt,
        setNodes: (n) => {
          const {
            nodeInternals: r,
            nodeOrigin: o,
            elevateNodesOnSelect: s,
          } = t();
          e({ nodeInternals: bs(n, r, o, s) });
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
              ? bs(
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
              const y = o.get(m.id);
              if (y != null && y.hidden)
                o.set(y.id, {
                  ...y,
                  [Ne]: {
                    ...y[Ne],
                    // we need to reset the handle bounds when the node is hidden
                    // in order to force a new observation when the node is shown again
                    handleBounds: void 0,
                  },
                });
              else if (y) {
                const _ = Ri(m.nodeElement);
                !!(
                  _.width &&
                  _.height &&
                  (y.width !== _.width ||
                    y.height !== _.height ||
                    m.forceUpdate)
                ) &&
                  (o.set(y.id, {
                    ...y,
                    [Ne]: {
                      ...y[Ne],
                      handleBounds: {
                        source: xc(".source", m.nodeElement, f, u),
                        target: xc(".target", m.nodeElement, f, u),
                      },
                    },
                    ..._,
                  }),
                  g.push({
                    id: y.id,
                    type: "dimensions",
                    dimensions: _,
                  }));
              }
              return g;
            }, []);
          Hu(o, u);
          const p = i || (s && !i && Bu(t, { initial: !0, ...a }));
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
              const u = y4(n, a()),
                c = bs(u, o, i, l);
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
            ? (i = n.map((l) => Ut(l, !0)))
            : ((i = bn(s(), n)), (a = bn(o, []))),
            Br({
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
            ? (i = n.map((l) => Ut(l, !0)))
            : ((i = bn(o, n)), (a = bn(s(), []))),
            Br({
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
            l = i.map((c) => ((c.selected = !1), Ut(c.id, !1))),
            u = a.map((c) => Ut(c.id, !1));
          Br({
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
              .map((a) => Ut(a.id, !1)),
            i = n.filter((a) => a.selected).map((a) => Ut(a.id, !1));
          Br({
            changedNodes: s,
            changedEdges: i,
            get: t,
            set: e,
          });
        },
        setNodeExtent: (n) => {
          const { nodeInternals: r } = t();
          r.forEach((o) => {
            o.positionAbsolute = Mi(o.position, n);
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
          const u = Zt.translate(r[0] + n.x, r[1] + n.y).scale(r[2]),
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
            connectionNodeId: zt.connectionNodeId,
            connectionHandleId: zt.connectionHandleId,
            connectionHandleType: zt.connectionHandleType,
            connectionStatus: zt.connectionStatus,
            connectionStartHandle: zt.connectionStartHandle,
            connectionEndHandle: zt.connectionEndHandle,
          }),
        reset: () => e({ ...zt }),
      }),
      Object.is,
    ),
  Vi = ({ children: e }) => {
    const t = se(null);
    return (
      t.current || (t.current = n8()),
      $.createElement(C3, { value: t.current }, e)
    );
  };
Vi.displayName = "ReactFlowProvider";
const Qu = ({ children: e }) =>
  Ge(zo) ? $.createElement($.Fragment, null, e) : $.createElement(Vi, null, e);
Qu.displayName = "ReactFlowWrapper";
const r8 = {
    input: Mu,
    default: ei,
    output: Lu,
    group: Bi,
  },
  o8 = {
    default: Co,
    straight: ji,
    step: Pi,
    smoothstep: Vo,
    simplebezier: Li,
  },
  s8 = [0, 0],
  i8 = [15, 15],
  a8 = { x: 0, y: 0, zoom: 1 },
  c8 = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
  },
  ed = Fc(
    (
      {
        nodes: e,
        edges: t,
        defaultNodes: n,
        defaultEdges: r,
        className: o,
        nodeTypes: s = r8,
        edgeTypes: i = o8,
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
        onClickConnectEnd: y,
        onNodeMouseEnter: _,
        onNodeMouseMove: x,
        onNodeMouseLeave: b,
        onNodeContextMenu: C,
        onNodeDoubleClick: A,
        onNodeDragStart: O,
        onNodeDrag: S,
        onNodeDragStop: P,
        onNodesDelete: L,
        onEdgesDelete: j,
        onSelectionChange: B,
        onSelectionDragStart: H,
        onSelectionDrag: E,
        onSelectionDragStop: N,
        onSelectionContextMenu: w,
        onSelectionStart: I,
        onSelectionEnd: k,
        connectionMode: D = dn.Strict,
        connectionLineType: T = Yt.Bezier,
        connectionLineStyle: R,
        connectionLineComponent: F,
        connectionLineContainerStyle: V,
        deleteKeyCode: W = "Backspace",
        selectionKeyCode: Y = "Shift",
        selectionOnDrag: q = !1,
        selectionMode: X = dr.Full,
        panActivationKeyCode: Q = "Space",
        multiSelectionKeyCode: ee = vo() ? "Meta" : "Control",
        zoomActivationKeyCode: K = vo() ? "Meta" : "Control",
        snapToGrid: de = !1,
        snapGrid: Z = i8,
        onlyRenderVisibleElements: ve = !1,
        selectNodesOnDrag: Pe = !0,
        nodesDraggable: _e,
        nodesConnectable: Fe,
        nodesFocusable: Ce,
        nodeOrigin: re = s8,
        edgesFocusable: Me,
        edgesUpdatable: xt,
        elementsSelectable: Jt,
        defaultViewport: gt = a8,
        minZoom: jt = 0.5,
        maxZoom: ot = 2,
        translateExtent: wt = ni,
        preventScrolling: mt = !0,
        nodeExtent: Ye,
        defaultMarkerColor: $t = "#b1b1b7",
        zoomOnScroll: St = !0,
        zoomOnPinch: Ft = !0,
        panOnScroll: Ie = !1,
        panOnScrollSpeed: qe = 0.5,
        panOnScrollMode: Nt = an.Free,
        zoomOnDoubleClick: Tt = !0,
        panOnDrag: At = !0,
        onPaneClick: st,
        onPaneMouseEnter: Je,
        onPaneMouseMove: Qt,
        onPaneMouseLeave: en,
        onPaneScroll: Ht,
        onPaneContextMenu: yt,
        children: hn,
        onEdgeUpdate: it,
        onEdgeContextMenu: Er,
        onEdgeDoubleClick: Yo,
        onEdgeMouseEnter: Cr,
        onEdgeMouseMove: qo,
        onEdgeMouseLeave: br,
        onEdgeUpdateStart: _r,
        onEdgeUpdateEnd: Zo,
        edgeUpdaterRadius: Xo = 10,
        onNodesChange: xr,
        onEdgesChange: Ko,
        noDragClassName: Go = "nodrag",
        noWheelClassName: Jo = "nowheel",
        noPanClassName: wr = "nopan",
        fitView: M = !1,
        fitViewOptions: U,
        connectOnClick: J = !0,
        attributionPosition: oe,
        proOptions: pe,
        defaultEdgeOptions: Ee,
        elevateNodesOnSelect: fe = !0,
        elevateEdgesOnSelect: ce = !1,
        disableKeyboardA11y: ke = !1,
        autoPanOnConnect: xe = !0,
        autoPanOnNodeDrag: Se = !0,
        connectionRadius: Ve = 20,
        isValidConnection: Bt,
        onError: Sr,
        style: at,
        id: Qi,
        nodeDragThreshold: Od,
        ...Id
      },
      Rd,
    ) => {
      const Qo = Qi || "1";
      return $.createElement(
        "div",
        {
          ...Id,
          style: { ...at, ...c8 },
          ref: Rd,
          className: ze(["react-flow", o]),
          "data-testid": "rf__wrapper",
          id: Qi,
        },
        $.createElement(
          Qu,
          null,
          $.createElement(t8, {
            onInit: u,
            onMove: c,
            onMoveStart: d,
            onMoveEnd: f,
            onNodeClick: a,
            onEdgeClick: l,
            onNodeMouseEnter: _,
            onNodeMouseMove: x,
            onNodeMouseLeave: b,
            onNodeContextMenu: C,
            onNodeDoubleClick: A,
            nodeTypes: s,
            edgeTypes: i,
            connectionLineType: T,
            connectionLineStyle: R,
            connectionLineComponent: F,
            connectionLineContainerStyle: V,
            selectionKeyCode: Y,
            selectionOnDrag: q,
            selectionMode: X,
            deleteKeyCode: W,
            multiSelectionKeyCode: ee,
            panActivationKeyCode: Q,
            zoomActivationKeyCode: K,
            onlyRenderVisibleElements: ve,
            selectNodesOnDrag: Pe,
            defaultViewport: gt,
            translateExtent: wt,
            minZoom: jt,
            maxZoom: ot,
            preventScrolling: mt,
            zoomOnScroll: St,
            zoomOnPinch: Ft,
            zoomOnDoubleClick: Tt,
            panOnScroll: Ie,
            panOnScrollSpeed: qe,
            panOnScrollMode: Nt,
            panOnDrag: At,
            onPaneClick: st,
            onPaneMouseEnter: Je,
            onPaneMouseMove: Qt,
            onPaneMouseLeave: en,
            onPaneScroll: Ht,
            onPaneContextMenu: yt,
            onSelectionContextMenu: w,
            onSelectionStart: I,
            onSelectionEnd: k,
            onEdgeUpdate: it,
            onEdgeContextMenu: Er,
            onEdgeDoubleClick: Yo,
            onEdgeMouseEnter: Cr,
            onEdgeMouseMove: qo,
            onEdgeMouseLeave: br,
            onEdgeUpdateStart: _r,
            onEdgeUpdateEnd: Zo,
            edgeUpdaterRadius: Xo,
            defaultMarkerColor: $t,
            noDragClassName: Go,
            noWheelClassName: Jo,
            noPanClassName: wr,
            elevateEdgesOnSelect: ce,
            rfId: Qo,
            disableKeyboardA11y: ke,
            nodeOrigin: re,
            nodeExtent: Ye,
          }),
          $.createElement(G3, {
            nodes: e,
            edges: t,
            defaultNodes: n,
            defaultEdges: r,
            onConnect: h,
            onConnectStart: p,
            onConnectEnd: g,
            onClickConnectStart: m,
            onClickConnectEnd: y,
            nodesDraggable: _e,
            nodesConnectable: Fe,
            nodesFocusable: Ce,
            edgesFocusable: Me,
            edgesUpdatable: xt,
            elementsSelectable: Jt,
            elevateNodesOnSelect: fe,
            minZoom: jt,
            maxZoom: ot,
            nodeExtent: Ye,
            onNodesChange: xr,
            onEdgesChange: Ko,
            snapToGrid: de,
            snapGrid: Z,
            connectionMode: D,
            translateExtent: wt,
            connectOnClick: J,
            defaultEdgeOptions: Ee,
            fitView: M,
            fitViewOptions: U,
            onNodesDelete: L,
            onEdgesDelete: j,
            onNodeDragStart: O,
            onNodeDrag: S,
            onNodeDragStop: P,
            onSelectionDrag: E,
            onSelectionDragStart: H,
            onSelectionDragStop: N,
            noPanClassName: wr,
            nodeOrigin: re,
            rfId: Qo,
            autoPanOnConnect: xe,
            autoPanOnNodeDrag: Se,
            onError: Sr,
            connectionRadius: Ve,
            isValidConnection: Bt,
            nodeDragThreshold: Od,
          }),
          $.createElement(X3, { onSelectionChange: B }),
          hn,
          $.createElement(_3, { proOptions: pe, position: oe }),
          $.createElement(n4, { rfId: Qo, disableKeyboardA11y: ke }),
        ),
      );
    },
  );
ed.displayName = "ReactFlow";
function l8() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
    $.createElement("path", {
      d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z",
    }),
  );
}
function u8() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5" },
    $.createElement("path", { d: "M0 0h32v4.2H0z" }),
  );
}
function d8() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30" },
    $.createElement("path", {
      d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
    }),
  );
}
function f8() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    $.createElement("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
    }),
  );
}
function h8() {
  return $.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32" },
    $.createElement("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
    }),
  );
}
const Jn = ({ children: e, className: t, ...n }) =>
  $.createElement(
    "button",
    { type: "button", className: ze(["react-flow__controls-button", t]), ...n },
    e,
  );
Jn.displayName = "ControlButton";
const p8 = (e) => ({
    isInteractive:
      e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
    minZoomReached: e.transform[2] <= e.minZoom,
    maxZoomReached: e.transform[2] >= e.maxZoom,
  }),
  td = ({
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
    const f = Le(),
      [h, p] = he(!1),
      { isInteractive: g, minZoomReached: m, maxZoomReached: y } = we(p8, $e),
      { zoomIn: _, zoomOut: x, fitView: b } = Pt();
    if (
      (ie(() => {
        p(!0);
      }, []),
      !h)
    )
      return null;
    const C = () => {
        _(), s == null || s();
      },
      A = () => {
        x(), i == null || i();
      },
      O = () => {
        b(o), a == null || a();
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
      hu,
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
            Jn,
            {
              onClick: C,
              className: "react-flow__controls-zoomin",
              title: "zoom in",
              "aria-label": "zoom in",
              disabled: y,
            },
            $.createElement(l8, null),
          ),
          $.createElement(
            Jn,
            {
              onClick: A,
              className: "react-flow__controls-zoomout",
              title: "zoom out",
              "aria-label": "zoom out",
              disabled: m,
            },
            $.createElement(u8, null),
          ),
        ),
      n &&
        $.createElement(
          Jn,
          {
            className: "react-flow__controls-fitview",
            onClick: O,
            title: "fit view",
            "aria-label": "fit view",
          },
          $.createElement(d8, null),
        ),
      r &&
        $.createElement(
          Jn,
          {
            className: "react-flow__controls-interactive",
            onClick: S,
            title: "toggle interactivity",
            "aria-label": "toggle interactivity",
          },
          g ? $.createElement(h8, null) : $.createElement(f8, null),
        ),
      c,
    );
  };
td.displayName = "Controls";
var g8 = Te(td),
  ft;
(function (e) {
  (e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross");
})(ft || (ft = {}));
function m8({ color: e, dimensions: t, lineWidth: n }) {
  return $.createElement("path", {
    stroke: e,
    strokeWidth: n,
    d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`,
  });
}
function y8({ color: e, radius: t }) {
  return $.createElement("circle", { cx: t, cy: t, r: t, fill: e });
}
const v8 = {
    [ft.Dots]: "#91919a",
    [ft.Lines]: "#eee",
    [ft.Cross]: "#e2e2e2",
  },
  E8 = {
    [ft.Dots]: 1,
    [ft.Lines]: 1,
    [ft.Cross]: 6,
  },
  C8 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function nd({
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
    { transform: c, patternId: d } = we(C8, $e),
    f = i || v8[t],
    h = r || E8[t],
    p = t === ft.Dots,
    g = t === ft.Cross,
    m = Array.isArray(n) ? n : [n, n],
    y = [m[0] * c[2] || 1, m[1] * c[2] || 1],
    _ = h * c[2],
    x = g ? [_, _] : y,
    b = p ? [_ / s, _ / s] : [x[0] / s, x[1] / s];
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
        x: c[0] % y[0],
        y: c[1] % y[1],
        width: y[0],
        height: y[1],
        patternUnits: "userSpaceOnUse",
        patternTransform: `translate(-${b[0]},-${b[1]})`,
      },
      p
        ? $.createElement(y8, { color: f, radius: _ / s })
        : $.createElement(m8, { dimensions: x, color: f, lineWidth: o }),
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
nd.displayName = "Background";
var b8 = Te(nd);
const rd = "columns",
  od = "exposure",
  sd = "tables",
  _8 = "feedback",
  x8 = "help",
  w8 = "settings",
  Ln = "column-",
  id = "see-more-",
  S8 = 5,
  N8 = 100,
  T8 = 100,
  Wi = 272,
  Ui = 80,
  A8 = 12,
  D8 = Ui,
  ad = 30,
  Ic = 4,
  O8 = 280,
  I8 = 80,
  cd = 0.05,
  ld = "#7A899E",
  Yi = "#E38E00",
  ud = {
    Original: "#FDD835",
    Alias: "#40C8AE",
    Transformation: "#FF754C",
    Unchanged: "#BC3FBC",
    "Not sure": "#247efe",
  },
  qi = {
    stroke: ld,
    strokeWidth: 1,
  },
  dd = {
    stroke: Yi,
    strokeWidth: 2,
  },
  fd = {
    stroke: Yi,
    strokeWidth: 1,
    strokeDasharray: 10,
  },
  hd = {
    type: "arrow",
    strokeWidth: 1,
    width: 24,
    height: 24,
    color: ld,
  },
  pd = {
    type: "arrow",
    strokeWidth: 1,
    width: 16,
    height: 16,
    color: Yi,
  },
  et = (e) => e.id.startsWith(Ln),
  Vr = (e) => e.id.startsWith(id),
  hr = (e) => !e.id.startsWith(Ln),
  gd = (e, t, n, r, o) => {
    const [s, i] = o ? [n, r] : [r, n],
      [a, l] = o ? si(e, t) : si(t, e);
    return {
      id: `${s}-${i}`,
      source: s,
      target: i,
      sourceHandle: a,
      targetHandle: l,
      style: qi,
      markerEnd: hd,
      type: n === r ? "selfConnecting" : e === t ? "smoothstep" : "default",
    };
  },
  Zi = (e, t, n) => ({
    id: e.table,
    data: { ...e, level: t, parent: n },
    position: { x: 100, y: 100 },
    type: "table",
    width: Wi,
    height: Ui,
  }),
  ri = (e, t, n) => ({
    id: _o(e, t),
    data: { column: t, table: e, lensType: n },
    parentNode: e,
    extent: "parent",
    draggable: !1,
    type: "column",
    position: { x: 100, y: 100 },
    height: ad,
  }),
  oi = (e, t, n, r, o, s) => {
    const i = Xi(e, t),
      [a, l] = si(n, r);
    return {
      id: i,
      data: { type: o },
      source: e,
      target: t,
      sourceHandle: a,
      targetHandle: l,
      style: o === "direct" ? dd : fd,
      zIndex: 1e3,
      markerEnd: pd,
      type: n === r ? "smoothstep" : "default",
      hidden: !s[o],
    };
  },
  Xi = (e, t) => Ln + `${e}-${t}`,
  bo = (e, t) => {
    e.style = { opacity: t ? 1 : 0.5 };
  },
  Pn = (e, t) => {
    var n;
    (e.style = t
      ? ((n = e.data) == null ? void 0 : n.type) === "indirect"
        ? fd
        : dd
      : qi),
      (e.markerEnd = t ? pd : hd);
  },
  si = (e, t) =>
    e < t
      ? ["right", "left"]
      : e > t
        ? ["left", "right"]
        : e < 0
          ? ["left", "left"]
          : ["right", "right"],
  R8 = (e, t) => {
    const n = {};
    e.forEach((s) => {
      hr(s) && (n[s.id] = s.data.level);
    });
    const r = {};
    e.filter((s) => s.type === "table").forEach((s) => (r[s.id] = !0));
    const o = {};
    for (const s of t) {
      if (et(s)) continue;
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
  _o = (e, t) => Ln + `${e}/${t}`,
  xo = (e, t) => id + e + "-" + (t ? "1" : "0"),
  Rc = (e, t) => {
    for (const n of e) if (n[0] === t[0] && n[1] === t[1]) return !0;
    return !1;
  },
  Mc = (e, t, n) => {
    (e[t] = e[t] || []), e[t].push(...n);
  },
  ii = (e, t = 1) => e * (ad + Ic) + t * Ic,
  M8 = (e, t) => (n) => e < n && n < t,
  kc = (e, t) => {
    const n = e.findIndex((r) => r.id === t);
    n !== -1 && e.splice(n, 1);
  },
  pr = (e, t, n = !0) => {
    e.forEach((r) => {
      et(r) || ((r.hidden = !t), n && Pn(r, t));
    });
  },
  gr = (e, t, n = !0) => {
    e.forEach((r) => {
      et(r) && ((r.hidden = !t), n && Pn(r, t));
    });
  },
  k8 = (e) => Oe.get("upstreamTables", { table: e }),
  L8 = (e) => Oe.get("downstreamTables", { table: e }),
  P8 = (e) =>
    Oe.get("getExposureDetails", {
      name: e,
    }),
  md = (e, t) =>
    Oe.get("getColumns", {
      table: e,
      refresh: t,
    }),
  j8 = (e) => Oe.get("getConnectedColumns", e),
  $8 = (e) => Oe.get("sendFeedback", e),
  F8 = () => Oe.get("getLineageSettings", {}),
  Ss = (e) => Oe.get("persistLineageSettings", e),
  H8 = () => Oe.get("init", {}),
  B8 = (e) => Oe.get("openFile", { url: e }),
  yd = () => Oe.get("openChat", {}),
  vd = (e) => Oe.get("showInfoNotification", { message: e }),
  z8 = () => Oe.get("previewFeature", {}),
  Ns = (e) => Oe.get("columnLineage", { event: e }),
  V8 = (e) => Oe.get("telemetryEvents", e);
var W8 = /* @__PURE__ */ ((e) => (
  (e.START = "start"), (e.END = "end"), (e.CANCEL = "cancel"), e
))(W8 || {});
const He = class He {
  static onCancel() {
    (He.isCancelled = !0), (He.inProgress = !1);
  }
  static cancel() {
    He.onCancel(),
      Ns(
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
      Ns(
        "start",
        /* START */
      );
  }
  static end() {
    (He.inProgress = !1),
      Ns(
        "end",
        /* END */
      ),
      V8({
        id: "columnLineageNumLinks",
        params: { num: He.linkCount },
      }),
      (He.linkCount = 0);
  }
  static addLinks(t) {
    He.linkCount += t;
  }
  static showCllInProgressMsg() {
    vd(
      "Column lineage is in progress. Either wait for it to complete or cancel the current one.",
    );
  }
};
Nr(He, "isCancelled", !1), Nr(He, "inProgress", !1), Nr(He, "linkCount", 0);
let je = He;
const Ed = (e, t) => (e ? k8(t) : L8(t)),
  Cd = (e, t) => (e ? t + 1 : t - 1),
  bd = (e, t, n, r, o, s, i = S8) => {
    const a = Cd(o, s),
      l = (c) => {
        var p, g;
        const d =
            (g = (p = e.find((m) => m.id === c)) == null ? void 0 : p.data) ==
            null
              ? void 0
              : g.level,
          f = gd(s, d, r, c, o);
        t.find((m) => m.id === f.id) || t.push(f);
      };
    let u = 0;
    for (const c of n) {
      if (u >= i) {
        const f = xo(r, o);
        e.push({
          id: f,
          data: { tables: n, prevTable: r, right: o, level: a },
          position: { x: 100, y: 100 },
          type: "seeMore",
          width: Wi,
          height: 100,
        }),
          l(f);
        break;
      }
      e.find((f) => f.id === c.table) || (e.push(Zi(c, a, r)), u++), l(c.table);
    }
  },
  Hn = (e, t) => {
    let n = 1 / 0;
    const r = {};
    for (const p of e)
      if (et(p) && p.parentNode)
        p.parentNode in r || (r[p.parentNode] = 0),
          (p.position = {
            x: A8,
            y: D8 + ii(r[p.parentNode]),
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
      et(p) ||
        Vr(e.find((g) => g.id === p.source)) ||
        Vr(e.find((g) => g.id === p.target)) ||
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
      et(p) || Vr(p) || a[p.id] || (d(p.id, l), (a[p.id] = !1), d(p.id, u));
    for (const p of e) et(p) || (Vr(p) && c(p));
    const f = (p) => {
        const g = i[p.id] || 0,
          m = o[p.id] || 0;
        return T8 + g * (Ui + I8) + ii(m, g);
      },
      h = (p) => (p - n) * (Wi + O8) + N8;
    for (const p of e) {
      if (et(p)) continue;
      const { level: g } = p.data;
      p.position = { x: h(g), y: f(p) };
    }
  },
  U8 = (e, t) => (
    e.forEach((n) => bo(n, !0)), t.forEach((n) => Pn(n, !1)), [e, t]
  ),
  wo = (e, t, n) => {
    pr(t, !0), gr(t, !1);
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
    i.forEach((l) => Pn(l, o[l.id]));
    const a = [...e];
    return a.forEach((l) => bo(l, !!r[l.id])), [a, i];
  },
  Y8 = async (e, t, n, r, o, s, i, a, l, u) => {
    const c = [],
      d = [],
      { column_lineage: f, confidence: h } = await j8({
        targets: r,
        upstreamExpansion: o,
        currAnd1HopTables: s,
        selectedColumn: i,
      });
    je.addLinks(f.length);
    const p = f.filter((C) => (o ? Rc(r, C.source) : Rc(r, C.target))),
      g = p.map((C) => (o ? C.target : C.source)),
      m = {},
      y = ([C, A], O) => {
        (m[C] = m[C] || []),
          m[C].find((S) => S.column === A) ||
            m[C].push({ column: A, lensType: O });
      },
      _ = (C, A, O, S, P) => {
        const L = Xi(O, S);
        d.find((j) => j.id === L) || d.push(oi(O, S, e[C], e[A], P, u));
      },
      x = [],
      b = {};
    for (const C of p) {
      const A = C.source.join("/"),
        O = C.target.join("/"),
        S = (P) =>
          l ? C.type : C.type === "indirect" ? "indirect" : P || C.type;
      o
        ? ((b[O] = b[O] || []), b[O].push(S(a[A])))
        : ((b[A] = b[A] || []), b[A].push(S(a[O])));
    }
    for (const C in b)
      a[C] = b[C].some((A) => A === "direct") ? "direct" : "indirect";
    for (const C of p) {
      y(C.source), y(C.target, C.lensType);
      const [A] = C.source,
        [O] = C.target,
        S = n[A],
        P = n[O],
        L = C.source.join("/"),
        j = C.target.join("/"),
        B = Ln + L,
        H = Ln + j,
        E = a[o ? j : L];
      if (S && P) _(A, O, B, H, E);
      else if (S) {
        const N = t[O];
        _(A, N, B, N, E), x.push(C);
      } else if (P) {
        const N = t[A];
        _(N, O, N, H, E), x.push(C);
      } else x.push(C);
    }
    for (const C in m)
      if (n[C]) {
        m[C].sort();
        for (const A of m[C]) c.push(ri(C, A.column, A.lensType));
      }
    return {
      nodes: c,
      edges: d,
      collectColumns: m,
      newCurr: g,
      confidence: h,
      seeMoreLineage: x,
    };
  },
  q8 = (e, t) => {
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
      Hn(n, r),
      [n, r]
    );
  },
  Z8 = (e, t) => {
    const n = e.filter((o) => hr(o)),
      r = t.filter((o) => hr(o));
    return [n, r];
  },
  Ki = async (e, t, n, r) => {
    const o = [...e],
      s = [...t],
      i = [{ table: n, level: o.find((l) => l.id === n).data.level }],
      a = {};
    for (; i.length > 0; ) {
      const { table: l, level: u } = i.shift();
      if (a[l]) continue;
      a[l] = !0;
      const { tables: c } = await Ed(r, l);
      bd(o, s, c, l, r, u),
        c.forEach((d) => {
          const f = o.find((h) => h.id === d.table);
          (f == null ? void 0 : f.data.materialization) === "ephemeral" &&
            i.push({ table: d.table, level: f.data.level });
        });
    }
    return [o, s];
  },
  X8 = async (e, t, n, r, o) => {
    const s = [...e],
      i = [...t];
    if (r >= o) return [s, i];
    const a = M8(r, o),
      l = s.find((c) => c.id === n).data.level,
      u = async (c) => {
        const d = [{ table: n, level: l }],
          f = {};
        for (; d.length > 0; ) {
          const h = d.shift();
          if (f[h.table]) continue;
          f[h.table] = !0;
          const { tables: p } = await Ed(c, h.table);
          bd(s, i, p, h.table, c, h.level, 1 / 0);
          const g = Cd(c, h.level);
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
  Lc = (e, t, n, r) => {
    if (!n) return -1;
    const o = r ? "source" : "target",
      s = r ? "target" : "source",
      i = r ? "upstreamCount" : "downstreamCount",
      a = {},
      l = {};
    for (const h of e) et(h) || ((a[h.id] = h), (l[h.id] = []));
    for (const h of t) et(h) || l[h[o]].push(h[s]);
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
          for (const y of l[g]) h.push(y);
        }
      }
    })();
    if (!c) return -1;
    const { level: d } = a[n].data,
      { level: f } = a[c].data;
    return r ? f - d : d - f;
  },
  So = (e, t, n) => [Lc(e, t, n, !1), Lc(e, t, n, !0)],
  _d = async (e, t, n, r, o, s, i, a, l, u) => {
    var C, A, O, S, P, L;
    let c = !1;
    const {
        levelMap: d,
        tableNodes: f,
        seeMoreIdTableReverseMap: h,
      } = R8(e, t),
      p = (j) => e.find((B) => B.id === j),
      g = {},
      m = {};
    let y = r.map((j) => [j.table, j.name]),
      _ = [];
    const x = {};
    let b = !0;
    for (
      ;
      !(
        je.isCancelled ||
        ((y = y.filter((F) => !g[F.join("/")])),
        y.length === 0 && _.length === 0)
      );

    ) {
      const j = {};
      y.forEach((F) => {
        (g[F.join("/")] = !0), (j[F[0]] = !0);
      });
      const [B, H] = n ? ["source", "target"] : ["target", "source"],
        E = [],
        N = [],
        w = [];
      let I = !1;
      for (const F of t) {
        if (et(F)) continue;
        const V = F[B],
          W = F[H],
          Y = f[W]
            ? [(C = p(W)) == null ? void 0 : C.data]
            : (S =
                  (O = (A = p(W)) == null ? void 0 : A.data) == null
                    ? void 0
                    : O.tables) == null
              ? void 0
              : S.filter((q) => !f[q.table]);
        Y == null ||
          Y.forEach(({ table: q, materialization: X }) => {
            j[V]
              ? ((I = !0),
                X === "ephemeral"
                  ? (Mc(
                      m,
                      q,
                      y.filter((Q) => Q[0] === V),
                    ),
                    N.push(q))
                  : E.push(q))
              : _.includes(V) &&
                ((I = !0),
                X === "ephemeral"
                  ? (Mc(m, q, m[V]), N.push(q))
                  : (w.push(V), E.push(q)));
          });
      }
      if (!I) break;
      _ = N;
      const k = Object.keys(j).concat(E);
      w.forEach((F) => {
        y.push(...m[F]), k.push(...m[F].map((V) => V[0]));
      });
      const D = await Y8(d, h, f, y, n, Array.from(new Set(k)), l, x, b, u);
      (b = !1),
        ((P = D.confidence) == null ? void 0 : P.confidence) === "low" &&
          o(((L = D.confidence) == null ? void 0 : L.operator_list) || []),
        (y = D.newCurr),
        !c && y.length > 0 && (c = !0);
      const [T, R] = q8({ nodes: a.getNodes(), edges: a.getEdges() }, D);
      s(D.seeMoreLineage),
        Hn(T, R),
        a.setNodes(T),
        a.setEdges(R),
        i(D.collectColumns);
    }
    return c;
  },
  K8 = (
    e,
    t,
    n,
    { prevTable: r, tables: o, right: s, level: i, lineage: a },
    l,
  ) => {
    var f;
    const { table: u } = n;
    if (e.find((h) => h.id === u)) return !1;
    e.push(Zi(n, i, r));
    const d = (f = e.find((h) => h.id === r)) == null ? void 0 : f.data.level;
    if (
      (t.push(gd(d, i, r, u, s)),
      a == null ||
        a.forEach((h) => {
          const p = _o(h.source[0], h.source[1]),
            g = _o(h.target[0], h.target[1]);
          if (s) {
            if (h.target[0] !== u) return;
            e.push(ri(h.target[0], h.target[1], h.lensType)),
              t.push(oi(p, g, i - 1, i, h.type, l));
          } else {
            if (h.source[0] !== u) return;
            e.push(ri(h.source[0], h.source[1], h.lensType)),
              t.push(oi(p, g, i, i + 1, h.type, l));
          }
        }),
      o.every((h) => !!e.find((p) => p.id === h.table)))
    ) {
      const h = xo(r, s),
        p = s ? `${r}-${h}` : `${h}-${r}`;
      return kc(e, h), kc(t, p), !0;
    }
    return !1;
  },
  No = async (e, t, n, r, o) => {
    var u;
    if (!n) return 0;
    const s = (u = e.find((c) => c.id === n)) == null ? void 0 : u.data;
    if (!s) return 0;
    const { level: i } = s,
      a = e.length,
      [l] = await X8(e, t, n, i - r, i + o);
    return l.length - a;
  },
  G8 = (e, t, n, r) => {
    if (!P3(e)) return { nodes: [], edgeIds: [] };
    const o = n.filter((s) => (r ? s.target : s.source) === e.id);
    return {
      nodes: t.filter((s) =>
        o.find((i) => i.source === s.id || i.target === s.id),
      ),
      edgeIds: o.map((s) => Xi(s.source, s.target)),
    };
  },
  ai = (e, t, n, r = [], o) => {
    const { nodes: s, edgeIds: i } = G8(e, t, n, o);
    return s.reduce(
      (a, l) => {
        if (
          (a.nodes.push(l),
          (a.edges = Array.from(/* @__PURE__ */ new Set([...a.edges, ...i]))),
          r.findIndex((u) => u.id == l.id) === -1)
        ) {
          r.push(l);
          const { nodes: u, edges: c } = ai(l, t, n, r, o);
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
  J8 = (e, t) => {
    const n = t.getNodes().filter((i) => et(i)),
      r = t.getEdges();
    n.forEach((i) => {
      const a = t.getNode(i.id);
      a && bo(a, !1);
    }),
      r.forEach((i) => {
        const a = t.getEdge(i.id);
        a && ((a.hidden = !0), Pn(a, !1));
      });
    const o = ai(e, n, r, [], !0),
      s = ai(e, n, r, [], !1);
    [o, s].forEach(({ nodes: i, edges: a }) => {
      i.forEach((l) => {
        const u = t.getNode(l.id);
        u && bo(u, !0);
      }),
        a.forEach((l) => {
          const u = t.getEdge(l);
          u && ((u.hidden = !1), Pn(u, !0));
        });
    });
  },
  Q8 = "_table_node_1lhr8_1",
  e7 = "_header_1lhr8_8",
  t7 = "_collapse_1lhr8_16",
  n7 = "_selected_1lhr8_21",
  r7 = "_content_1lhr8_24",
  o7 = "_table_header_1lhr8_37",
  s7 = "_seed_1lhr8_47",
  i7 = "_model_1lhr8_52",
  a7 = "_source_1lhr8_57",
  c7 = "_exposure_1lhr8_62",
  l7 = "_snapshot_1lhr8_67",
  u7 = "_metrics_1lhr8_72",
  d7 = "_macros_1lhr8_77",
  f7 = "_analysis_1lhr8_82",
  h7 = "_node_icon_1lhr8_87",
  p7 = "_table_handle_1lhr8_100",
  g7 = "_see_more_node_1lhr8_114",
  m7 = "_table_card_1lhr8_125",
  y7 = "_disabled_1lhr8_137",
  v7 = "_column_card_1lhr8_142",
  E7 = "_edit_icon_1lhr8_155",
  C7 = "_active_1lhr8_163",
  b7 = "_expand_lineage_icon_1lhr8_167",
  _7 = "_processing_div_1lhr8_180",
  x7 = "_gif_img_1lhr8_183",
  w7 = "_card_1lhr8_188",
  S7 = "_column_node_1lhr8_195",
  N7 = "_column_name_1lhr8_206",
  T7 = "_column_badge_1lhr8_211",
  A7 = "_divider_1lhr8_223",
  D7 = "_table_details_header_1lhr8_229",
  O7 = "_verticle_divider_1lhr8_237",
  I7 = "_low_confidence_1lhr8_242",
  R7 = "_high_confidence_1lhr8_249",
  M7 = "_alert_icon_1lhr8_256",
  k7 = "_menu_card_1lhr8_262",
  L7 = "_menu_card_container_1lhr8_267",
  P7 = "_table_details_tabs_1lhr8_273",
  j7 = "_tab_1lhr8_1",
  $7 = "_table_node_pill_1lhr8_293",
  F7 = "_icon_1lhr8_303",
  H7 = "_node-checkbox_1lhr8_310",
  B7 = "_non_select_node_checkbox_1lhr8_310",
  z7 = "_select_node_checkbox_1lhr8_310",
  V7 = "_node_extra_info_1lhr8_326",
  W7 = "_help_body_1lhr8_330",
  U7 = "_feedback_body_1lhr8_334",
  Y7 = "_cancel_btn_1lhr8_337",
  q7 = "_expand_nav_1lhr8_342",
  Z7 = "_expand_nav_btn_1lhr8_350",
  X7 = "_lineage_legend_1lhr8_377",
  K7 = "_column_legend_1lhr8_394",
  G7 = "_dot_1lhr8_407",
  ne = {
    table_node: Q8,
    header: e7,
    collapse: t7,
    selected: n7,
    content: r7,
    table_header: o7,
    seed: s7,
    model: i7,
    source: a7,
    exposure: c7,
    snapshot: l7,
    metrics: u7,
    macros: d7,
    analysis: f7,
    node_icon: h7,
    table_handle: p7,
    see_more_node: g7,
    table_card: m7,
    disabled: y7,
    column_card: v7,
    edit_icon: E7,
    active: C7,
    expand_lineage_icon: b7,
    processing_div: _7,
    gif_img: x7,
    card: w7,
    column_node: S7,
    default: "_default_1lhr8_203",
    column_name: N7,
    column_badge: T7,
    divider: A7,
    table_details_header: D7,
    verticle_divider: O7,
    low_confidence: I7,
    high_confidence: R7,
    alert_icon: M7,
    menu_card: k7,
    menu_card_container: L7,
    table_details_tabs: P7,
    tab: j7,
    table_node_pill: $7,
    icon: F7,
    "node-checkbox": "_node-checkbox_1lhr8_310",
    nodeCheckbox: H7,
    non_select_node_checkbox: B7,
    select_node_checkbox: z7,
    node_extra_info: V7,
    help_body: W7,
    feedback_body: U7,
    cancel_btn: Y7,
    expand_nav: q7,
    expand_nav_btn: Z7,
    lineage_legend: X7,
    column_legend: K7,
    dot: G7,
  },
  J7 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M14.4138 13.7953L11.7681 11.9423C11.5927 11.8194 11.4733 11.6319 11.4361 11.421C11.399 11.2101 11.4471 10.9931 11.57 10.8177C11.6928 10.6422 11.8803 10.5228 12.0912 10.4857C12.3022 10.4485 12.5192 10.4966 12.6946 10.6195L15.3402 12.4725C15.5157 12.5953 15.6351 12.7828 15.6722 12.9937C15.7094 13.2047 15.6613 13.4217 15.5384 13.5971C15.4155 13.7725 15.228 13.8919 15.0171 13.9291C14.8062 13.9663 14.5892 13.9181 14.4138 13.7953Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M6.23472 10.7666C6.66662 10.7666 7.07057 10.5991 7.37216 10.2948L10.0514 7.59139C10.6629 6.97429 10.6502 5.98265 10.0231 5.38078C9.39602 4.77904 8.38821 4.79152 7.77672 5.40855L6.205 6.99435L5.92965 6.73088C5.30167 6.13015 4.29393 6.1439 3.6832 6.76187C3.07266 7.37983 3.08677 8.37148 3.71475 8.97241L5.12733 10.3241C5.42551 10.6095 5.81883 10.7666 6.23472 10.7666ZM4.41777 7.46468C4.63478 7.24508 4.9928 7.24052 5.21559 7.45375L5.85755 8.0681C6.0601 8.26201 6.38398 8.25765 6.58135 8.05864L8.51014 6.11251C8.72742 5.89323 9.0853 5.88901 9.3079 6.10258C9.53063 6.31635 9.53505 6.6685 9.31798 6.88763L6.63874 9.59098C6.43168 9.80891 6.05451 9.81354 5.84153 9.60145L4.42895 8.24974C4.20602 8.0363 4.2009 7.68409 4.41777 7.46468Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M1.2696 8.46259C1.23524 8.18365 0.981431 7.98549 0.702382 8.01991C0.423451 8.05439 0.225306 8.3085 0.259604 8.58741C0.29722 8.89279 0.35694 9.19928 0.43695 9.49824C0.894474 11.2074 1.99015 12.6358 3.52208 13.5203C5.05401 14.4047 6.83878 14.6394 8.54776 14.181C10.2568 13.7227 11.6852 12.6262 12.5701 11.0936C13.455 9.56087 13.6903 7.77555 13.2327 6.06641C12.2882 2.53813 8.64974 0.437554 5.12192 1.38363C2.71678 2.02867 0.892688 3.9422 0.361517 6.37751C0.301593 6.65214 0.475849 6.92324 0.750129 6.98306C1.02465 7.04286 1.29584 6.86868 1.35567 6.59407C1.80529 4.53259 3.34929 2.91276 5.38514 2.36679C8.37085 1.56596 11.4504 3.34395 12.2497 6.33007C12.637 7.77666 12.4378 9.28772 11.6889 10.5849C10.94 11.8821 9.73094 12.8101 8.28453 13.198C6.83821 13.5859 5.32757 13.3873 4.031 12.6388C2.73449 11.8902 1.80712 10.6813 1.41988 9.23469C1.35207 8.98094 1.30145 8.72123 1.2696 8.46259Z",
        fill: "currentColor",
      }),
    ),
  xd = J7,
  Q7 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 15 15",
        fill: "none",
        ...e,
      },
      /* @__PURE__ */ z.createElement("circle", {
        cx: 7.5,
        cy: 7.5,
        r: 6.9,
        stroke: "currentColor",
        strokeWidth: 1.2,
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M7.05 7.5V7.95H7.5H11C11.1548 7.95 11.2873 8.01395 11.3684 8.10088C11.4447 8.18264 11.4755 8.28138 11.4504 8.39262C11.3415 8.87457 11.1448 9.33503 10.8675 9.75006C10.4224 10.4161 9.78991 10.9352 9.04987 11.2417C8.30983 11.5482 7.49551 11.6285 6.70988 11.4722C5.92426 11.3159 5.20262 10.9302 4.63622 10.3638C4.06981 9.79738 3.68409 9.07574 3.52782 8.29012C3.37155 7.50449 3.45175 6.69017 3.75829 5.95013C4.06482 5.21009 4.58392 4.57757 5.24994 4.13255C5.66497 3.85524 6.12543 3.65849 6.60738 3.54959C6.71862 3.52445 6.81736 3.55531 6.89912 3.6316C6.98605 3.71271 7.05 3.84521 7.05 4V7.5Z",
        stroke: "currentColor",
        strokeWidth: 0.9,
      }),
    ),
  wd = Q7,
  e6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 15,
        height: 15,
        viewBox: "0 0 11 10",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement(
        "g",
        { clipPath: "url(#clip0_19334_15206)" },
        /* @__PURE__ */ z.createElement("path", {
          d: "M8.87489 5.27405C8.77129 5.27405 8.67194 5.3152 8.59868 5.38846C8.52543 5.46171 8.48428 5.56106 8.48428 5.66466V7.23702C8.48393 7.5407 8.36314 7.83185 8.1484 8.0466C7.93366 8.26133 7.64251 8.38213 7.33882 8.38247H2.86441C2.56073 8.38213 2.26958 8.26133 2.05484 8.0466C1.8401 7.83185 1.7193 7.5407 1.71896 7.23702V2.76261C1.7193 2.45892 1.8401 2.16777 2.05484 1.95303C2.26958 1.73829 2.56073 1.6175 2.86441 1.61715H4.43677C4.54037 1.61715 4.63972 1.576 4.71297 1.50275C4.78623 1.42949 4.82738 1.33014 4.82738 1.22654C4.82738 1.12295 4.78623 1.0236 4.71297 0.950344C4.63972 0.877091 4.54037 0.835938 4.43677 0.835938H2.86441C2.35362 0.836541 1.86391 1.03972 1.50272 1.40091C1.14153 1.7621 0.938347 2.25181 0.937744 2.76261V7.23702C0.938347 7.74782 1.14153 8.23752 1.50272 8.59871C1.86391 8.9599 2.35362 9.16308 2.86441 9.16369H7.33882C7.84962 9.16308 8.33933 8.9599 8.70052 8.59871C9.06171 8.23752 9.26489 7.74782 9.26549 7.23702V5.66466C9.26549 5.56106 9.22434 5.46171 9.15109 5.38846C9.07783 5.3152 8.97848 5.27405 8.87489 5.27405Z",
          fill: "#FFCE73",
        }),
        /* @__PURE__ */ z.createElement("path", {
          d: "M8.86633 0.832031H6.43805C6.33577 0.832012 6.23756 0.872113 6.16452 0.94372C6.09149 1.01533 6.04945 1.11273 6.04745 1.21499C6.04338 1.43422 6.22778 1.61325 6.44684 1.61325H7.93327L4.8224 4.72508C4.74916 4.79834 4.70801 4.89769 4.70801 5.00128C4.70801 5.10487 4.74916 5.20422 4.8224 5.27747C4.89566 5.35072 4.99501 5.39187 5.0986 5.39187C5.20219 5.39187 5.30154 5.35072 5.37479 5.27747L8.48663 2.16661V3.6584C8.48663 3.762 8.52778 3.86135 8.60103 3.9346C8.67429 4.00786 8.77364 4.04901 8.87724 4.04901C8.98083 4.04901 9.08018 4.00786 9.15344 3.9346C9.22669 3.86135 9.26784 3.762 9.26784 3.6584V1.23338C9.26784 1.18066 9.25746 1.12846 9.23728 1.07975C9.2171 1.03105 9.18752 0.986797 9.15023 0.949526C9.11295 0.912255 9.06868 0.882696 9.01997 0.862535C8.97126 0.842375 8.91905 0.83201 8.86633 0.832031Z",
          fill: "#FFCE73",
        }),
      ),
      /* @__PURE__ */ z.createElement(
        "defs",
        null,
        /* @__PURE__ */ z.createElement(
          "clipPath",
          { id: "clip0_19334_15206" },
          /* @__PURE__ */ z.createElement("rect", {
            width: 10,
            height: 10,
            fill: "white",
            transform: "translate(0.101318)",
          }),
        ),
      ),
    ),
  t6 = e6,
  n6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M4.96894 9.82478V7.14121H4V6.5H6.67883V7.14121H5.68139V9.82478H4.96894Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M6.60431 10.485L8.57544 6.5H9.24039L7.27402 10.485H6.60431Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M9.7534 9.82478V6.5H10.4659V9.82478H9.7534ZM10.0811 8.50437V7.89166H11.8005V8.50437H10.0811ZM10.0811 7.14121V6.5H12V7.14121H10.0811Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("circle", {
        cx: 8,
        cy: 8.5,
        r: 6.5,
        stroke: "currentColor",
      }),
    ),
  r6 = n6,
  o6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M3 13.3L6.794 3.5H8.334L12.1 13.3H10.49L8.25 7.392C8.222 7.32667 8.166 7.168 8.082 6.916C8.00733 6.664 7.91867 6.384 7.816 6.076C7.71333 5.768 7.62 5.488 7.536 5.236C7.452 4.97467 7.396 4.80667 7.368 4.732L7.69 4.718C7.634 4.87667 7.564 5.07733 7.48 5.32C7.40533 5.56267 7.32133 5.81933 7.228 6.09C7.144 6.36067 7.06 6.61733 6.976 6.86C6.892 7.09333 6.822 7.28933 6.766 7.448L4.54 13.3H3ZM4.68 10.864L5.24 9.408H9.692L10.336 10.864H4.68Z",
        fill: "currentColor",
      }),
    ),
  s6 = o6,
  i6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M8.13796 13.5L9.81796 3.70001H11.078L9.39796 13.5H8.13796ZM3.43396 11.078V9.91601H11.54V11.078H3.43396ZM4.41396 13.5L6.09396 3.70001H7.35396L5.67396 13.5H4.41396ZM3.96596 7.15801V5.99601H12.058V7.15801H3.96596Z",
        fill: "currentColor",
      }),
    ),
  a6 = i6,
  c6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M3.86339 12.4999C3.56384 12.4353 3.3054 12.356 3.08808 12.262C2.87075 12.168 2.69161 12.0506 2.55064 11.9096C2.40967 11.7745 2.30395 11.61 2.23346 11.4162C2.16885 11.2282 2.13655 11.0109 2.13655 10.7642L2.14536 9.92723C2.14536 9.61593 2.07781 9.38392 1.94272 9.23121C1.80762 9.07262 1.61379 8.99039 1.36123 8.98452H1V8.01537H1.37885C1.63142 8.00949 1.82231 7.9302 1.95153 7.77749C2.08075 7.62477 2.14536 7.38983 2.14536 7.07265L2.13655 6.23566C2.13655 5.75402 2.27164 5.37811 2.54183 5.10792C2.81789 4.83186 3.25841 4.62922 3.86339 4.5L4.1189 5.38104C3.8957 5.4574 3.71949 5.53376 3.59027 5.61012C3.46692 5.68647 3.37882 5.78926 3.32596 5.91848C3.27897 6.04183 3.25547 6.21216 3.25547 6.42949L3.27309 7.196C3.27309 7.53667 3.17618 7.82154 2.98235 8.05061C2.79439 8.27968 2.50071 8.44414 2.10131 8.54399V8.44708C2.50071 8.55868 2.79439 8.72901 2.98235 8.95808C3.17618 9.18716 3.27309 9.46909 3.27309 9.80389L3.25547 10.5704C3.25547 10.776 3.27897 10.9375 3.32596 11.055C3.37882 11.1783 3.46692 11.2782 3.59027 11.3545C3.71949 11.4309 3.8957 11.5072 4.1189 11.5836L3.86339 12.4999Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M5.05191 12.3765V4.53524H7.55408V5.57487H6.17965L6.23251 5.50439V11.4426L6.1444 11.3369H7.55408V12.3765H5.05191Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M8.43567 12.3765V11.3369H9.8101L9.75724 11.4074V5.46915L9.84534 5.57487H8.43567V4.53524H10.9378V12.3765H8.43567Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M12.1366 12.4999L11.8723 11.6188C12.0955 11.5425 12.2688 11.4661 12.3921 11.3898C12.5155 11.3134 12.6036 11.2106 12.6564 11.0814C12.7152 10.9581 12.7445 10.7877 12.7445 10.5704L12.7269 9.80389C12.7269 9.46322 12.8209 9.17835 13.0088 8.94927C13.2027 8.7202 13.4964 8.55574 13.8899 8.45589L13.8987 8.5528C13.4993 8.44121 13.2027 8.27087 13.0088 8.0418C12.8209 7.81273 12.7269 7.53079 12.7269 7.196L12.7445 6.42949C12.7445 6.21804 12.7181 6.05358 12.6652 5.9361C12.6124 5.81863 12.5243 5.72171 12.4009 5.64536C12.2776 5.569 12.1014 5.49264 11.8723 5.41629L12.1366 4.5C12.4362 4.55874 12.6917 4.63803 12.9031 4.73788C13.1204 4.83186 13.2996 4.94933 13.4406 5.0903C13.5874 5.22539 13.6931 5.38986 13.7577 5.58368C13.8282 5.77164 13.8635 5.98897 13.8635 6.23566L13.8546 7.07265C13.8546 7.38395 13.9222 7.6189 14.0573 7.77749C14.1924 7.9302 14.3862 8.00949 14.6388 8.01537H15V8.98452H14.6212C14.3686 8.99039 14.1777 9.06968 14.0485 9.2224C13.9193 9.37511 13.8546 9.61006 13.8546 9.92723L13.8635 10.7642C13.8635 11.2459 13.7254 11.6218 13.4494 11.892C13.1733 12.168 12.7357 12.3707 12.1366 12.4999Z",
        fill: "currentColor",
      }),
    ),
  l6 = c6,
  u6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M5.33325 1.83398V3.83398",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M10.6667 1.83398V3.83398",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M2.33325 6.56055H13.6666",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M14 11.4073V6.16732C14 4.16732 13 2.83398 10.6667 2.83398H5.33333C3 2.83398 2 4.16732 2 6.16732V11.834C2 13.834 3 15.1673 5.33333 15.1673H10.2467",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M2 6.59464L2 11.8346C2 13.8346 3 15.168 5.33333 15.168L10.6667 15.168C13 15.168 14 13.8346 14 11.8346L14 6.16797C14 4.16797 13 2.83464 10.6667 2.83464L5.75333 2.83464",
        stroke: "currentColor",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M10.4955 9H10.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M10.4955 12H10.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M5.4955 9H5.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M5.4955 12H5.5045",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  d6 = u6,
  f6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M13 7.40909C13 11.2273 8 14.5 8 14.5C8 14.5 3 11.2273 3 7.40909C3 6.10712 3.52678 4.85847 4.46447 3.93784C5.40215 3.01721 6.67392 2.5 8 2.5C9.32608 2.5 10.5979 3.01721 11.5355 3.93784C12.4732 4.85847 13 6.10712 13 7.40909Z",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M8 9.5C9.10457 9.5 10 8.60457 10 7.5C10 6.39543 9.10457 5.5 8 5.5C6.89543 5.5 6 6.39543 6 7.5C6 8.60457 6.89543 9.5 8 9.5Z",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  h6 = f6,
  p6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M2.21021 4.09393C2.32237 3.84159 2.61785 3.72794 2.87019 3.84009L8.00046 6.12021L13.1307 3.84009C13.3831 3.72794 13.6785 3.84159 13.7907 4.09393C13.9029 4.34627 13.7892 4.64175 13.5369 4.7539L8.20353 7.12425C8.07426 7.18172 7.92666 7.18172 7.79739 7.12425L2.46405 4.7539C2.21171 4.64175 2.09806 4.34627 2.21021 4.09393Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.71387 1.35887C7.53267 0.994961 8.46733 0.994961 9.28613 1.35887L12.6195 2.84035C13.763 3.3486 14.5 4.48265 14.5 5.73408V10.2681C14.5 11.5195 13.763 12.6536 12.6195 13.1618L9.28613 14.6433C8.46733 15.0072 7.53267 15.0072 6.71387 14.6433L3.38056 13.1618C2.23699 12.6536 1.5 11.5195 1.5 10.2681V5.73408C1.5 4.48265 2.23699 3.3486 3.38056 2.84035L6.71387 1.35887ZM8.88 2.27268C8.31973 2.02369 7.68027 2.02369 7.12 2.27268L3.7867 3.75416C3.00425 4.10191 2.5 4.87784 2.5 5.73408V10.2681C2.5 11.1244 3.00426 11.9002 3.7867 12.248L7.12 13.7295C7.68027 13.9785 8.31973 13.9785 8.88 13.7295L12.2133 12.248C12.9957 11.9002 13.5 11.1244 13.5 10.2681V5.73408C13.5 4.87784 12.9957 4.10191 12.2133 3.75416L8.88 2.27268Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8 6.16406C8.27613 6.16406 8.5 6.38792 8.5 6.66406V13.9974C8.5 14.2735 8.27613 14.4974 8 14.4974C7.72387 14.4974 7.5 14.2735 7.5 13.9974V6.66406C7.5 6.38792 7.72387 6.16406 8 6.16406Z",
        fill: "currentColor",
      }),
    ),
  g6 = p6,
  m6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M13.5445 3.32188L10.532 0.46875C10.2102 0.165625 9.79141 0 9.35078 0H3.61328C2.66641 0 1.89453 0.771875 1.89453 1.71875V14.2812C1.89453 15.2281 2.66641 16 3.61328 16H12.3633C13.3102 16 14.082 15.2281 14.082 14.2812V4.56875C14.082 4.1 13.8852 3.64375 13.5445 3.32188ZM12.6352 3.75H10.3008C10.2133 3.75 10.1445 3.68125 10.1445 3.59375V1.39375L12.6352 3.75ZM12.3633 15.0625H3.61328C3.18203 15.0625 2.83203 14.7125 2.83203 14.2812V1.71875C2.83203 1.2875 3.18203 0.9375 3.61328 0.9375H9.20703V3.59375C9.20703 4.19688 9.69766 4.6875 10.3008 4.6875H13.1445V14.2812C13.1445 14.7125 12.7945 15.0625 12.3633 15.0625Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M11.332 6.25H4.45703C4.19766 6.25 3.98828 6.45937 3.98828 6.71875C3.98828 6.97812 4.19766 7.1875 4.45703 7.1875H11.332C11.5914 7.1875 11.8008 6.97812 11.8008 6.71875C11.8008 6.45937 11.5914 6.25 11.332 6.25Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M11.332 8.75H4.45703C4.19766 8.75 3.98828 8.95937 3.98828 9.21875C3.98828 9.47812 4.19766 9.6875 4.45703 9.6875H11.332C11.5914 9.6875 11.8008 9.47812 11.8008 9.21875C11.8008 8.95937 11.5914 8.75 11.332 8.75Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M6.72891 11.25H4.45703C4.19766 11.25 3.98828 11.4594 3.98828 11.7188C3.98828 11.9781 4.19766 12.1875 4.45703 12.1875H6.72891C6.98828 12.1875 7.19766 11.9781 7.19766 11.7188C7.19766 11.4594 6.98828 11.25 6.72891 11.25Z",
        fill: "currentColor",
      }),
    ),
  y6 = m6,
  v6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M14.9459 3.20159C14.9296 2.34608 14.1459 1.58527 12.732 1.05955C11.4651 0.589349 9.7867 0.328125 8.01364 0.328125C6.23731 0.328125 4.56221 0.589349 3.292 1.05955C1.87813 1.58527 1.09119 2.34935 1.07812 3.20486C1.07812 3.21139 1.07812 3.22119 1.07812 3.22772V13.0889C1.07812 13.9575 1.86506 14.7249 3.292 15.2571C4.56221 15.7306 6.23731 15.9885 8.01364 15.9885C9.78996 15.9885 11.4651 15.7273 12.7353 15.2571C14.1622 14.7281 14.9491 13.9575 14.9491 13.0889V3.22772C14.9459 3.22119 14.9459 3.21139 14.9459 3.20159ZM13.9271 13.0889C13.9271 13.8563 11.6218 14.9698 8.01037 14.9698C4.39894 14.9698 2.09364 13.8563 2.09364 13.0889V11.3747C2.42017 11.5967 2.81853 11.7959 3.28874 11.9722C4.56221 12.4424 6.23731 12.7036 8.01364 12.7036C9.78996 12.7036 11.4683 12.4424 12.7353 11.9722C13.2055 11.7959 13.6038 11.5967 13.9304 11.3747V13.0889H13.9271ZM13.9271 9.78772C13.9271 9.79098 13.9271 9.79751 13.9271 9.80078C13.9271 10.5681 11.6218 11.6816 8.01037 11.6816C4.39894 11.6816 2.09364 10.5681 2.09364 9.80078V8.08649C2.42017 8.30853 2.81853 8.50772 3.28874 8.68404C4.55894 9.15751 6.23404 9.41547 8.01037 9.41547C9.7867 9.41547 11.4618 9.15425 12.732 8.68404C13.2022 8.51098 13.6006 8.30853 13.9271 8.08649V9.78772ZM13.9271 6.50282C13.9271 6.50608 13.9271 6.51261 13.9271 6.51588C13.9271 7.28323 11.6218 8.3967 8.01037 8.3967C4.39894 8.3967 2.09364 7.28323 2.09364 6.51588V4.80159C2.42017 5.02363 2.81853 5.22282 3.28874 5.39588C4.55894 5.86935 6.23404 6.12731 8.01037 6.12731C9.7867 6.12731 11.4618 5.86608 12.732 5.39588C13.1989 5.22282 13.6006 5.02037 13.9271 4.80159V6.50282ZM8.01364 5.10853C4.40221 5.10853 2.0969 3.99506 2.0969 3.22772C2.0969 2.46037 4.40221 1.3469 8.01364 1.3469C11.6251 1.3469 13.9304 2.46037 13.9304 3.22772C13.9271 3.99506 11.6251 5.10853 8.01364 5.10853Z",
        fill: "currentColor",
      }),
    ),
  E6 = v6,
  C6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M14.4866 5.36855C15.0957 6.86998 15.165 8.53621 14.6829 10.0831C14.2007 11.6299 13.1969 12.9616 11.8425 13.8511C10.4882 14.7405 8.86727 15.1325 7.25618 14.9604C5.64508 14.7882 4.1436 14.0624 3.00781 12.9069C1.87202 11.7514 1.17225 10.2376 1.02786 8.62381C0.883469 7.00999 1.30339 5.39605 2.21601 4.05724C3.12863 2.71844 4.47742 1.73768 6.03236 1.28224C7.58731 0.826792 9.25209 0.924866 10.7428 1.55973C10.7925 1.58093 10.8376 1.61172 10.8755 1.65034C10.9133 1.68896 10.9432 1.73466 10.9634 1.78482C10.9836 1.83499 10.9937 1.88864 10.9931 1.94271C10.9926 1.99678 10.9814 2.05022 10.9602 2.09997C10.939 2.14972 10.9082 2.1948 10.8696 2.23265C10.831 2.2705 10.7853 2.30037 10.7351 2.32056C10.685 2.34075 10.6313 2.35086 10.5772 2.35031C10.5232 2.34977 10.4697 2.33858 10.42 2.31738C9.78137 2.05018 9.10237 1.89233 8.41139 1.85044V2.23914C8.41139 2.34835 8.36801 2.45308 8.29079 2.53031C8.21357 2.60753 8.10883 2.65091 7.99963 2.65091C7.89042 2.65091 7.78569 2.60753 7.70846 2.53031C7.63124 2.45308 7.58786 2.34835 7.58786 2.23914V1.84962C6.23566 1.92718 4.94927 2.45909 3.93716 3.35914L4.21139 3.63914C4.27086 3.71844 4.29974 3.81652 4.29271 3.91539C4.28568 4.01426 4.24323 4.10728 4.17314 4.17736C4.10306 4.24745 4.01004 4.2899 3.91117 4.29693C3.8123 4.30396 3.71422 4.27508 3.63492 4.21561L3.35492 3.94138C2.45563 4.95419 1.92309 6.24001 1.84293 7.59208H2.23492C2.34413 7.59208 2.44887 7.63546 2.52609 7.71268C2.60331 7.7899 2.64669 7.89464 2.64669 8.00384C2.64669 8.11305 2.60331 8.21779 2.52609 8.29501C2.44887 8.37223 2.34413 8.41561 2.23492 8.41561H1.84293C1.92277 9.76775 2.45536 11.0537 3.35492 12.0663L3.63492 11.7921C3.71422 11.7326 3.8123 11.7037 3.91117 11.7108C4.01004 11.7178 4.10306 11.7602 4.17314 11.8303C4.24323 11.9004 4.28568 11.9934 4.29271 12.0923C4.29974 12.1912 4.27086 12.2893 4.21139 12.3685L3.93386 12.6461C4.94651 13.5477 6.23421 14.0805 7.58786 14.1581V13.7685C7.58786 13.6593 7.63124 13.5546 7.70846 13.4774C7.78569 13.4002 7.89042 13.3568 7.99963 13.3568C8.10883 13.3568 8.21357 13.4002 8.29079 13.4774C8.36801 13.5546 8.41139 13.6593 8.41139 13.7685V14.1581C9.76359 14.0805 11.05 13.5486 12.0621 12.6485L11.7879 12.3685C11.7284 12.2893 11.6995 12.1912 11.7065 12.0923C11.7136 11.9934 11.756 11.9004 11.8261 11.8303C11.8962 11.7602 11.9892 11.7178 12.0881 11.7108C12.1869 11.7037 12.285 11.7326 12.3643 11.7921L12.6419 12.0696C13.5435 11.0568 14.0768 9.76931 14.1555 8.41561H13.7643C13.6551 8.41561 13.5504 8.37223 13.4732 8.29501C13.3959 8.21779 13.3526 8.11305 13.3526 8.00384C13.3526 7.89464 13.3959 7.7899 13.4732 7.71268C13.5504 7.63546 13.6551 7.59208 13.7643 7.59208H14.1563C14.116 6.93556 13.97 6.28984 13.724 5.67985C13.7015 5.62939 13.6893 5.57492 13.6883 5.51968C13.6873 5.46444 13.6974 5.40957 13.7181 5.35832C13.7387 5.30707 13.7694 5.26049 13.8084 5.22137C13.8474 5.18224 13.8939 5.15137 13.9451 5.13058C13.9963 5.1098 14.0511 5.09953 14.1064 5.10038C14.1616 5.10124 14.2161 5.1132 14.2667 5.13556C14.3172 5.15791 14.3627 5.19021 14.4005 5.23052C14.4382 5.27083 14.4675 5.31834 14.4866 5.3702V5.36855ZM9.13363 6.28679L12.6501 2.7695C12.7274 2.69218 12.8323 2.64874 12.9416 2.64874C13.051 2.64874 13.1558 2.69218 13.2332 2.7695C13.3105 2.84682 13.3539 2.95168 13.3539 3.06103C13.3539 3.17037 13.3105 3.27524 13.2332 3.35256L9.71586 6.86902C9.94005 7.20496 10.0593 7.59997 10.0584 8.00384C10.0584 8.41104 9.9377 8.80909 9.71147 9.14766C9.48525 9.48624 9.1637 9.75012 8.7875 9.90595C8.4113 10.0618 7.99734 10.1025 7.59797 10.0231C7.1986 9.94367 6.83175 9.74758 6.54382 9.45965C6.25589 9.17172 6.0598 8.80487 5.98036 8.4055C5.90092 8.00613 5.9417 7.59217 6.09752 7.21597C6.25335 6.83977 6.51723 6.51822 6.85581 6.292C7.19438 6.06577 7.59243 5.94502 7.99963 5.94502C8.40303 5.94474 8.79742 6.06426 9.1328 6.28843L9.13363 6.28679ZM9.23492 8.00384C9.23492 7.75953 9.16247 7.5207 9.02674 7.31755C8.891 7.11441 8.69807 6.95608 8.47235 6.86258C8.24663 6.76909 7.99826 6.74462 7.75863 6.79229C7.51901 6.83995 7.2989 6.9576 7.12614 7.13036C6.95338 7.30312 6.83573 7.52323 6.78807 7.76285C6.7404 8.00247 6.76487 8.25085 6.85836 8.47657C6.95186 8.70229 7.11019 8.89522 7.31333 9.03095C7.51648 9.16669 7.75531 9.23914 7.99963 9.23914C8.32725 9.23914 8.64145 9.10899 8.87311 8.87733C9.10477 8.64567 9.23492 8.33146 9.23492 8.00384Z",
        fill: "currentColor",
      }),
    ),
  b6 = C6,
  _6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 28 28",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3.66065 10.0305L7.83899 6.409C7.78126 6.25246 7.74974 6.08317 7.74974 5.90684C7.74974 5.09996 8.41001 4.4461 9.22481 4.4461C10.0396 4.4461 10.6746 5.07534 10.6994 5.86067L14.0017 7.0057C14.2721 6.6913 14.6753 6.49167 15.1251 6.49167C15.3791 6.49167 15.618 6.55499 15.8262 6.66711L19.6333 3.44619C19.5792 3.29448 19.5499 3.13091 19.5499 2.96074C19.5499 2.15386 20.2101 1.5 21.0249 1.5C21.8397 1.5 22.5 2.15386 22.5 2.96074C22.5 3.76762 21.8397 4.42148 21.0249 4.42148C20.7709 4.42148 20.5321 4.35816 20.3238 4.24603L16.5167 7.46696C16.5709 7.61866 16.6002 7.78224 16.6002 7.95241C16.6002 8.75929 15.9399 9.41315 15.1251 9.41315C14.3103 9.41315 13.6753 8.78391 13.6509 7.99858L10.3486 6.85355C10.0782 7.16795 9.6755 7.36758 9.22525 7.36758C8.97748 7.36758 8.74392 7.3069 8.53922 7.20005L4.36089 10.8216C4.41862 10.9781 4.45014 11.1474 4.45014 11.3237C4.45014 12.1306 3.78987 12.7845 2.97507 12.7845C2.16027 12.7845 1.5 12.1306 1.5 11.3237C1.5 10.5168 2.16027 9.86298 2.97507 9.86298C3.22284 9.86298 3.45596 9.92366 3.66065 10.0305ZM19.9024 7.30646C19.5356 7.30646 19.2364 7.60283 19.2364 7.96604V21.4267C19.2364 21.7899 19.5356 22.0862 19.9024 22.0862H20.8149C21.1817 22.0862 21.4809 21.7899 21.4809 21.4267V7.9656C21.4809 7.60239 21.1817 7.30602 20.8149 7.30602L19.9024 7.30646ZM14.0021 12.6855C13.6354 12.6855 13.3361 12.9819 13.3361 13.3451V21.5647C13.3361 21.9279 13.6354 22.2243 14.0021 22.2243H14.9146C15.2814 22.2243 15.5807 21.9279 15.5807 21.5647V13.3451C15.5807 12.9819 15.2814 12.6855 14.9146 12.6855H14.0021ZM8.1023 10.7543C7.73553 10.7543 7.43625 11.0507 7.43625 11.4139V21.7028C7.43625 22.066 7.73553 22.3624 8.1023 22.3624H9.01478C9.38155 22.3624 9.68083 22.066 9.68083 21.7028V11.4134C9.68083 11.0502 9.38155 10.7538 9.01478 10.7538L8.1023 10.7543ZM2.20246 16.4315H3.11494C3.48171 16.4315 3.78099 16.7278 3.78099 17.091V21.8404C3.78099 22.2036 3.48171 22.5 3.11494 22.5H2.20246C1.83569 22.5 1.53641 22.2036 1.53641 21.8404V17.091C1.53641 16.7278 1.83569 16.4315 2.20246 16.4315Z",
        fill: "currentColor",
      }),
    ),
  x6 = _6,
  w6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M13.674 3.5H11.527L11.277 2.75C11.1565 2.38583 10.9242 2.06897 10.6131 1.84453C10.302 1.62009 9.92808 1.49953 9.5445 1.5H6.4555C6.07202 1.49971 5.69821 1.62035 5.38726 1.84477C5.0763 2.06919 4.84403 2.38596 4.7235 2.75L4.473 3.5H2.326C1.84188 3.50053 1.37773 3.69308 1.03541 4.03541C0.693081 4.37774 0.500529 4.84188 0.5 5.326V12.676C0.501058 13.1598 0.693843 13.6234 1.03611 13.9653C1.37838 14.3072 1.84222 14.4995 2.326 14.5H13.676C14.1598 14.4989 14.6234 14.3062 14.9653 13.9639C15.3072 13.6216 15.4995 13.1578 15.5 12.674V5.324C15.4989 4.84023 15.3062 4.3766 14.9639 4.0347C14.6216 3.69281 14.1578 3.50053 13.674 3.5ZM14.5 12.674C14.4997 12.893 14.4126 13.1029 14.2578 13.2578C14.1029 13.4126 13.893 13.4997 13.674 13.5H2.326C2.10701 13.4997 1.89707 13.4126 1.74222 13.2578C1.58737 13.1029 1.50026 12.893 1.5 12.674V5.324C1.50079 5.10536 1.58814 4.89593 1.74293 4.74152C1.89772 4.5871 2.10736 4.50026 2.326 4.5H4.8335C4.9384 4.49992 5.04061 4.46685 5.12568 4.40548C5.21074 4.3441 5.27435 4.25752 5.3075 4.158L5.672 3.0645C5.72673 2.90003 5.83189 2.75697 5.97253 2.65564C6.11317 2.55431 6.28216 2.49985 6.4555 2.5H9.5445C9.71792 2.49981 9.88699 2.55431 10.0277 2.65575C10.1683 2.75718 10.2734 2.90039 10.328 3.065L10.6925 4.158C10.7256 4.25752 10.7893 4.3441 10.8743 4.40548C10.9594 4.46685 11.0616 4.49992 11.1665 4.5H13.674C13.893 4.50027 14.1029 4.58738 14.2578 4.74222C14.4126 4.89707 14.4997 5.10701 14.5 5.326V12.674Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M8 5C7.25832 5 6.5333 5.21993 5.91661 5.63199C5.29993 6.04404 4.81928 6.62971 4.53545 7.31494C4.25162 8.00016 4.17736 8.75416 4.32206 9.48159C4.46675 10.209 4.8239 10.8772 5.34835 11.4017C5.8728 11.9261 6.54098 12.2833 7.26841 12.4279C7.99584 12.5726 8.74984 12.4984 9.43506 12.2145C10.1203 11.9307 10.706 11.4501 11.118 10.8334C11.5301 10.2167 11.75 9.49168 11.75 8.75C11.7489 7.75576 11.3535 6.80255 10.6505 6.09952C9.94745 5.39649 8.99424 5.00106 8 5ZM8 11.5C7.4561 11.5 6.92442 11.3387 6.47218 11.0365C6.01995 10.7344 5.66747 10.3049 5.45933 9.80238C5.25119 9.29988 5.19673 8.74695 5.30284 8.2135C5.40895 7.68005 5.67086 7.19005 6.05546 6.80546C6.44005 6.42086 6.93006 6.15895 7.4635 6.05284C7.99695 5.94673 8.54988 6.00119 9.05238 6.20933C9.55488 6.41747 9.98437 6.76995 10.2865 7.22218C10.5887 7.67442 10.75 8.2061 10.75 8.75C10.7492 9.4791 10.4592 10.1781 9.94367 10.6937C9.42811 11.2092 8.7291 11.4992 8 11.5Z",
        fill: "currentColor",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M13 6.5C13.2761 6.5 13.5 6.27614 13.5 6C13.5 5.72386 13.2761 5.5 13 5.5C12.7239 5.5 12.5 5.72386 12.5 6C12.5 6.27614 12.7239 6.5 13 6.5Z",
        fill: "currentColor",
      }),
    ),
  S6 = w6,
  N6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement(
        "g",
        { clipPath: "url(#clip0_13119_16577)" },
        /* @__PURE__ */ z.createElement(
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
          /* @__PURE__ */ z.createElement("path", {
            d: "M0 9.53674e-07H16V16H0V9.53674e-07Z",
            fill: "white",
          }),
        ),
        /* @__PURE__ */ z.createElement(
          "g",
          { mask: "url(#mask0_13119_16577)" },
          /* @__PURE__ */ z.createElement("path", {
            d: "M0.46875 15.5312H15.5312",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ z.createElement("path", {
            d: "M3 11.7812H1.75C1.57741 11.7812 1.4375 11.9212 1.4375 12.0938V15.5312H3.3125V12.0938C3.3125 11.9212 3.17259 11.7812 3 11.7812Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ z.createElement("path", {
            d: "M6.75 10.6562H5.5C5.32741 10.6562 5.1875 10.7962 5.1875 10.9688V15.5312H7.0625V10.9688C7.0625 10.7962 6.92259 10.6562 6.75 10.6562Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ z.createElement("path", {
            d: "M10.5 8.9375H9.25C9.07741 8.9375 8.9375 9.07741 8.9375 9.25V15.5312H10.8125V9.25C10.8125 9.07741 10.6726 8.9375 10.5 8.9375Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ z.createElement("path", {
            d: "M14.25 5.8125H13C12.8274 5.8125 12.6875 5.95241 12.6875 6.125V15.5312H14.5625V6.125C14.5625 5.95241 14.4226 5.8125 14.25 5.8125Z",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ z.createElement("path", {
            d: "M0.46875 9.60156C6.62566 9.60156 12.7826 4.89466 14.7636 0.467189",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          /* @__PURE__ */ z.createElement("path", {
            d: "M11.8994 1.23884L14.7641 0.47125L15.5317 3.33594",
            stroke: "currentColor",
            strokeWidth: 0.8,
            strokeMiterlimit: 10,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
        ),
      ),
      /* @__PURE__ */ z.createElement(
        "defs",
        null,
        /* @__PURE__ */ z.createElement(
          "clipPath",
          { id: "clip0_13119_16577" },
          /* @__PURE__ */ z.createElement("rect", {
            width: 16,
            height: 16,
            fill: "white",
          }),
        ),
      ),
    ),
  T6 = N6,
  A6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement(
        "g",
        { clipPath: "url(#clip0_13132_13629)" },
        /* @__PURE__ */ z.createElement("path", {
          d: "M14.9389 11.3569L12.3125 9.88281L14.9389 8.40875C15.2577 8.22978 15.2573 7.76997 14.9389 7.59122L12.3126 6.11709L14.9388 4.64313C15.2577 4.46416 15.2573 4.00434 14.9388 3.82559L8.2295 0.06C8.08697 -0.02 7.91315 -0.02 7.77062 0.06L1.06128 3.82562C0.742402 4.00462 0.742871 4.46444 1.06128 4.64316L3.68762 6.11719L1.06125 7.59122C0.742371 7.77022 0.74284 8.23003 1.06125 8.40875L3.68762 9.88281L1.06125 11.3569C0.742371 11.5359 0.74284 11.9957 1.06125 12.1744L7.77062 15.94C7.91309 16.02 8.08697 16.02 8.2295 15.94L14.9389 12.1744C15.2577 11.9954 15.2573 11.5356 14.9389 11.3569ZM8.00006 1.00628L13.7517 4.23438L8.00006 7.46247L2.24843 4.23438L8.00006 1.00628ZM4.6454 6.65472L7.77065 8.40875C7.91312 8.48872 8.087 8.48875 8.22953 8.40875L11.3549 6.65462L13.7518 7.99997L8.00006 11.2281L2.24843 8L4.6454 6.65472ZM8.00006 14.9937L2.2484 11.7656L4.64537 10.4203L7.77062 12.1744C7.91309 12.2543 8.08697 12.2544 8.2295 12.1744L11.3547 10.4203L13.7517 11.7656L8.00006 14.9937Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ z.createElement("path", {
          d: "M8 10.1484C8.25888 10.1484 8.46875 9.93857 8.46875 9.67969C8.46875 9.4208 8.25888 9.21094 8 9.21094C7.74112 9.21094 7.53125 9.4208 7.53125 9.67969C7.53125 9.93857 7.74112 10.1484 8 10.1484Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ z.createElement("path", {
          d: "M6.2832 9.25C6.54209 9.25 6.75195 9.04013 6.75195 8.78125C6.75195 8.52237 6.54209 8.3125 6.2832 8.3125C6.02432 8.3125 5.81445 8.52237 5.81445 8.78125C5.81445 9.04013 6.02432 9.25 6.2832 9.25Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ z.createElement("path", {
          d: "M4.56738 8.39062C4.82627 8.39062 5.03613 8.18076 5.03613 7.92188C5.03613 7.66299 4.82627 7.45312 4.56738 7.45312C4.3085 7.45312 4.09863 7.66299 4.09863 7.92188C4.09863 8.18076 4.3085 8.39062 4.56738 8.39062Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ z.createElement("path", {
          d: "M9.7168 9.25C9.97568 9.25 10.1855 9.04013 10.1855 8.78125C10.1855 8.52237 9.97568 8.3125 9.7168 8.3125C9.45791 8.3125 9.24805 8.52237 9.24805 8.78125C9.24805 9.04013 9.45791 9.25 9.7168 9.25Z",
          fill: "currentColor",
        }),
        /* @__PURE__ */ z.createElement("path", {
          d: "M11.4326 8.39062C11.6915 8.39062 11.9014 8.18076 11.9014 7.92188C11.9014 7.66299 11.6915 7.45312 11.4326 7.45312C11.1737 7.45312 10.9639 7.66299 10.9639 7.92188C10.9639 8.18076 11.1737 8.39062 11.4326 8.39062Z",
          fill: "currentColor",
        }),
      ),
      /* @__PURE__ */ z.createElement(
        "defs",
        null,
        /* @__PURE__ */ z.createElement(
          "clipPath",
          { id: "clip0_13132_13629" },
          /* @__PURE__ */ z.createElement("rect", {
            width: 16,
            height: 16,
            fill: "white",
          }),
        ),
      ),
    ),
  D6 = A6,
  O6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 11,
        height: 6,
        viewBox: "0 0 11 6",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M0.812951 5.52021C0.990462 5.69772 1.26824 5.71386 1.46398 5.56862L1.52006 5.52021L5.83317 1.20732L10.1463 5.52021C10.3238 5.69772 10.6016 5.71386 10.7973 5.56862L10.8534 5.52021C11.0309 5.3427 11.047 5.06492 10.9018 4.86918L10.8534 4.8131L6.18672 0.146439C6.00921 -0.031072 5.73144 -0.047207 5.5357 0.0980275L5.47962 0.146439L0.812951 4.8131C0.617688 5.00836 0.617688 5.32495 0.812951 5.52021Z",
        fill: "currentColor",
      }),
    ),
  I6 = O6,
  R6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 11,
        height: 6,
        viewBox: "0 0 11 6",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("path", {
        d: "M0.812951 0.47979C0.990462 0.302279 1.26824 0.286142 1.46398 0.431378L1.52006 0.47979L5.83317 4.79268L10.1463 0.47979C10.3238 0.302279 10.6016 0.286142 10.7973 0.431378L10.8534 0.47979C11.0309 0.657301 11.047 0.935077 10.9018 1.13082L10.8534 1.1869L6.18672 5.85356C6.00921 6.03107 5.73144 6.04721 5.5357 5.90198L5.47962 5.85356L0.812951 1.1869C0.617688 0.991635 0.617688 0.675052 0.812951 0.47979Z",
        fill: "currentColor",
      }),
    ),
  M6 = R6,
  k6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 16,
        height: 16,
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement(
        "g",
        { id: "x-close" },
        /* @__PURE__ */ z.createElement("path", {
          id: "Icon",
          d: "M12 4L4 12M4 4L12 12",
          stroke: "currentColor",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      ),
    ),
  L6 = k6,
  P6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        viewBox: "0 0 10 10",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement(
        "g",
        { clipPath: "url(#clip0_8292_48040)" },
        /* @__PURE__ */ z.createElement("path", {
          d: "M6.46776 1.25L6.46776 1.66667L4.16929 1.66667C4.11388 1.66667 4.06073 1.68862 4.02154 1.72769C3.98236 1.76676 3.96034 1.81975 3.96034 1.875L3.96034 4.79167L2.49768 4.79167L2.49768 4.375C2.49768 4.20924 2.43164 4.05027 2.31408 3.93306C2.19652 3.81585 2.03708 3.75 1.87083 3.75L0.826073 3.75C0.65982 3.75 0.500378 3.81585 0.38282 3.93306C0.265262 4.05027 0.199219 4.20924 0.199219 4.375L0.199219 5.625C0.199219 5.79076 0.265262 5.94973 0.38282 6.06694C0.500378 6.18415 0.659821 6.25 0.826073 6.25L1.87083 6.25C2.03708 6.25 2.19652 6.18415 2.31408 6.06694C2.43164 5.94973 2.49768 5.79076 2.49768 5.625L2.49768 5.20833L3.96034 5.20833L3.96034 8.125C3.96034 8.18025 3.98236 8.23324 4.02154 8.27231C4.06073 8.31138 4.11388 8.33333 4.16929 8.33333L6.46776 8.33333L6.46776 8.75C6.46776 8.91576 6.5338 9.07473 6.65136 9.19194C6.76892 9.30915 6.92836 9.375 7.09461 9.375L8.13937 9.375C8.30562 9.375 8.46506 9.30915 8.58262 9.19194C8.70018 9.07473 8.76622 8.91576 8.76622 8.75L8.76622 7.5C8.76622 7.33424 8.70018 7.17527 8.58262 7.05806C8.46506 6.94085 8.30562 6.875 8.13937 6.875L7.09461 6.875C6.92836 6.875 6.76892 6.94085 6.65136 7.05806C6.5338 7.17527 6.46776 7.33424 6.46776 7.5L6.46776 7.91667L4.37825 7.91667L4.37825 5.20833L6.46776 5.20833L6.46776 5.625C6.46776 5.79076 6.5338 5.94973 6.65136 6.06694C6.76892 6.18415 6.92836 6.25 7.09461 6.25L8.13937 6.25C8.30562 6.25 8.46506 6.18415 8.58262 6.06694C8.70018 5.94973 8.76622 5.79076 8.76622 5.625L8.76622 4.375C8.76622 4.20924 8.70018 4.05027 8.58262 3.93306C8.46506 3.81585 8.30562 3.75 8.13937 3.75L7.09461 3.75C6.92836 3.75 6.76892 3.81585 6.65136 3.93306C6.5338 4.05027 6.46776 4.20924 6.46776 4.375L6.46776 4.79167L4.37825 4.79167L4.37825 2.08333L6.46776 2.08333L6.46776 2.5C6.46776 2.66576 6.5338 2.82473 6.65136 2.94194C6.76892 3.05915 6.92836 3.125 7.09461 3.125L8.13937 3.125C8.30562 3.125 8.46506 3.05915 8.58262 2.94194C8.70018 2.82473 8.76622 2.66576 8.76622 2.5L8.76622 1.25C8.76622 1.08424 8.70018 0.925271 8.58262 0.80806C8.46506 0.69085 8.30562 0.625002 8.13937 0.625002L7.09461 0.625002C6.92836 0.625002 6.76892 0.69085 6.65136 0.80806C6.5338 0.925271 6.46776 1.08424 6.46776 1.25ZM1.87083 5.83333L0.826073 5.83333C0.770655 5.83333 0.717508 5.81138 0.678322 5.77232C0.639136 5.73324 0.617121 5.68025 0.617121 5.625L0.617121 4.375C0.617121 4.31975 0.639136 4.26676 0.678322 4.22769C0.717508 4.18862 0.770655 4.16667 0.826073 4.16667L1.87083 4.16667C1.92625 4.16667 1.97939 4.18862 2.01858 4.22769C2.05777 4.26676 2.07978 4.31975 2.07978 4.375L2.07978 5.625C2.07978 5.68025 2.05777 5.73324 2.01858 5.77231C1.97939 5.81138 1.92625 5.83333 1.87083 5.83333ZM7.09461 7.29167L8.13937 7.29167C8.19479 7.29167 8.24793 7.31362 8.28712 7.35269C8.32631 7.39176 8.34832 7.44475 8.34832 7.5L8.34832 8.75C8.34832 8.80525 8.32631 8.85824 8.28712 8.89731C8.24793 8.93638 8.19479 8.95833 8.13937 8.95833L7.09461 8.95833C7.0392 8.95833 6.98605 8.93638 6.94686 8.89731C6.90768 8.85824 6.88566 8.80525 6.88566 8.75L6.88566 7.5C6.88566 7.44475 6.90768 7.39176 6.94686 7.35269C6.98605 7.31362 7.0392 7.29167 7.09461 7.29167ZM7.09461 4.16667L8.13937 4.16667C8.19479 4.16667 8.24793 4.18862 8.28712 4.22769C8.32631 4.26676 8.34832 4.31975 8.34832 4.375L8.34832 5.625C8.34832 5.68025 8.32631 5.73324 8.28712 5.77231C8.24793 5.81138 8.19479 5.83333 8.13937 5.83333L7.09461 5.83333C7.0392 5.83333 6.98605 5.81138 6.94686 5.77231C6.90768 5.73324 6.88566 5.68025 6.88566 5.625L6.88566 4.375C6.88566 4.31975 6.90768 4.26676 6.94686 4.22769C6.98605 4.18862 7.0392 4.16667 7.09461 4.16667ZM8.13937 1.04167C8.19479 1.04167 8.24793 1.06362 8.28712 1.10269C8.32631 1.14176 8.34832 1.19475 8.34832 1.25L8.34832 2.5C8.34832 2.55525 8.32631 2.60825 8.28712 2.64732C8.24793 2.68639 8.19479 2.70833 8.13937 2.70833L7.09461 2.70833C7.0392 2.70833 6.98605 2.68639 6.94686 2.64732C6.90768 2.60825 6.88566 2.55525 6.88566 2.5L6.88566 1.25C6.88566 1.19475 6.90768 1.14176 6.94686 1.10269C6.98605 1.06362 7.0392 1.04167 7.09461 1.04167L8.13937 1.04167Z",
          fill: "white",
        }),
      ),
      /* @__PURE__ */ z.createElement(
        "defs",
        null,
        /* @__PURE__ */ z.createElement(
          "clipPath",
          { id: "clip0_8292_48040" },
          /* @__PURE__ */ z.createElement("rect", {
            width: 10,
            height: 10,
            fill: "white",
            transform: "translate(0 10) rotate(-90)",
          }),
        ),
      ),
    ),
  j6 = P6,
  $6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 12,
        height: 13,
        viewBox: "0 0 12 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("circle", {
        cx: 6,
        cy: 6.5,
        r: 6,
        fill: "#FFCE73",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M6.0013 7.33073C6.46154 7.33073 6.83464 6.95763 6.83464 6.4974C6.83464 6.03716 6.46154 5.66406 6.0013 5.66406C5.54106 5.66406 5.16797 6.03716 5.16797 6.4974C5.16797 6.95763 5.54106 7.33073 6.0013 7.33073Z",
        fill: "#082247",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M10.1423 6.3533C9.47099 4.65934 7.82261 3.55656 6.00066 3.58248C4.17871 3.55656 2.53033 4.65934 1.85899 6.3533C1.82565 6.44767 1.82565 6.55062 1.85899 6.64497C2.53033 8.33892 4.17871 9.4417 6.00066 9.41581C7.82261 9.4417 9.47099 8.33892 10.1423 6.64497C10.1757 6.55059 10.1757 6.44767 10.1423 6.3533ZM6.00157 8.16581H6.00066C5.08017 8.16581 4.33399 7.41961 4.33399 6.49914C4.33399 5.57866 5.08017 4.83248 6.00066 4.83248C6.92114 4.83248 7.66732 5.57866 7.66732 6.49914C7.66758 7.41935 6.92181 8.16556 6.00157 8.16581Z",
        fill: "#082247",
      }),
    ),
  F6 = $6,
  H6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("rect", {
        x: -0.5,
        y: 0.5,
        width: 31,
        height: 31,
        rx: 4.5,
        transform: "matrix(-1 0 0 1 31 0)",
        stroke: "#8390A3",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M16.0379 8.91337L16.0378 8.91338L16.0358 8.91024C15.9266 8.74528 15.7106 8.57407 15.432 8.47559C15.1577 8.37865 14.8682 8.36814 14.6194 8.46108L14.6118 8.46395L14.604 8.46656C14.0151 8.66487 13.6311 9.34149 13.75 9.89628L13.7528 9.90933L13.7549 9.92252L14.1882 12.6475L14.1884 12.6475L14.1901 12.66C14.2411 13.0429 14.1382 13.4063 13.9081 13.6906L13.9003 13.7002L13.8921 13.7094C13.6598 13.9691 13.3179 14.1344 12.9444 14.1344H9.51945C8.99591 14.1344 8.59378 14.3433 8.36901 14.6569C8.16112 14.9534 8.10247 15.362 8.26606 15.8266L8.26617 15.8266L8.26948 15.8367L10.3195 22.0784L10.3251 22.0955L10.3295 22.1131C10.5282 22.9078 11.4403 23.6094 12.3444 23.6094H15.5944C15.8229 23.6094 16.1102 23.5692 16.3764 23.4897C16.6529 23.4071 16.8467 23.3 16.9409 23.2058L16.9634 23.1833L16.9885 23.1639L18.0547 22.3393C18.0548 22.3392 18.0548 22.3392 18.0549 22.3391C18.3435 22.1152 18.5111 21.7765 18.5111 21.4177V12.951C18.5111 12.7179 18.4412 12.4895 18.3123 12.2958C18.3121 12.2956 18.3119 12.2953 18.3118 12.2951L16.0379 8.91337Z",
        stroke: "#8390A3",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M22.5187 11.8263H21.6604C21.0609 11.8263 20.7659 11.9458 20.6121 12.0919C20.4646 12.232 20.3438 12.4961 20.3438 13.0513V21.4346C20.3438 21.9949 20.465 22.2611 20.6128 22.402C20.7664 22.5485 21.0608 22.668 21.6604 22.668H22.5187C23.1184 22.668 23.4128 22.5485 23.5664 22.402C23.7141 22.2611 23.8354 21.9949 23.8354 21.4346V13.0596C23.8354 12.4994 23.7141 12.2332 23.5664 12.0923C23.4128 11.9458 23.1184 11.8263 22.5187 11.8263Z",
        stroke: "#8390A3",
      }),
    ),
  B6 = H6,
  z6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("rect", {
        x: 0.5,
        y: -0.5,
        width: 31,
        height: 31,
        rx: 4.5,
        transform: "matrix(1 0 0 -1 0 31)",
        stroke: "#8390A3",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M12.2334 10.7084L14.8167 8.70844C15.1501 8.37511 15.9001 8.20844 16.4001 8.20844H19.5667C20.5667 8.20844 21.6501 8.95844 21.9001 9.95844L23.9001 16.0418C24.3167 17.2084 23.5667 18.2084 22.3167 18.2084H18.9834C18.4834 18.2084 18.0667 18.6251 18.1501 19.2084L18.5667 21.8751C18.7334 22.6251 18.2334 23.4584 17.4834 23.7084C16.8167 23.9584 15.9834 23.6251 15.6501 23.1251L12.2334 18.0418",
        stroke: "#8390A3",
        strokeWidth: 1.2,
        strokeMiterlimit: 10,
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M7.9834 10.7083V18.8749C7.9834 20.0416 8.4834 20.4583 9.65007 20.4583H10.4834C11.6501 20.4583 12.1501 20.0416 12.1501 18.8749V10.7083C12.1501 9.54158 11.6501 9.12492 10.4834 9.12492H9.65007C8.4834 9.12492 7.9834 9.54158 7.9834 10.7083Z",
        stroke: "#8390A3",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  V6 = z6,
  W6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("rect", {
        width: 32,
        height: 32,
        rx: 5,
        transform: "matrix(-1 0 0 1 32 0)",
        fill: "#3F8CFF",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M19.0111 21.4177V12.951C19.0111 12.6177 18.9111 12.2927 18.7278 12.0177L16.4528 8.63437C16.0944 8.09271 15.2028 7.70937 14.4444 7.99271C13.6278 8.26771 13.0861 9.18437 13.2611 10.001L13.6944 12.726C13.7278 12.976 13.6611 13.201 13.5194 13.376C13.3778 13.5344 13.1694 13.6344 12.9444 13.6344H9.51945C8.86111 13.6344 8.29445 13.901 7.96111 14.3677C7.64445 14.8177 7.58611 15.401 7.79445 15.9927L9.84445 22.2344C10.1028 23.2677 11.2278 24.1094 12.3444 24.1094H15.5944C16.1528 24.1094 16.9361 23.9177 17.2944 23.5594L18.3611 22.7344C18.7694 22.4177 19.0111 21.9344 19.0111 21.4177Z",
        fill: "white",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M21.6604 11.3263H22.5187C23.8104 11.3263 24.3354 11.8263 24.3354 13.0596V21.4346C24.3354 22.668 23.8104 23.168 22.5187 23.168H21.6604C20.3688 23.168 19.8438 22.668 19.8438 21.4346V13.0513C19.8438 11.8263 20.3688 11.3263 21.6604 11.3263Z",
        fill: "white",
      }),
    ),
  U6 = W6,
  Y6 = (e) =>
    /* @__PURE__ */ z.createElement(
      "svg",
      {
        width: 32,
        height: 32,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
      },
      /* @__PURE__ */ z.createElement("rect", {
        x: 0.5,
        y: -0.5,
        width: 31,
        height: 31,
        rx: 4.5,
        transform: "matrix(1 0 0 -1 0 31)",
        fill: "#247EFE",
        stroke: "#247EFE",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M12.2334 10.7084L14.8167 8.70844C15.1501 8.37511 15.9001 8.20844 16.4001 8.20844H19.5667C20.5667 8.20844 21.6501 8.95844 21.9001 9.95844L23.9001 16.0418C24.3167 17.2084 23.5667 18.2084 22.3167 18.2084H18.9834C18.4834 18.2084 18.0667 18.6251 18.1501 19.2084L18.5667 21.8751C18.7334 22.6251 18.2334 23.4584 17.4834 23.7084C16.8167 23.9584 15.9834 23.6251 15.6501 23.1251L12.2334 18.0418",
        fill: "white",
      }),
      /* @__PURE__ */ z.createElement("path", {
        d: "M7.9834 10.7083V18.8749C7.9834 20.0416 8.4834 20.4583 9.65007 20.4583H10.4834C11.6501 20.4583 12.1501 20.0416 12.1501 18.8749V10.7083C12.1501 9.54158 11.6501 9.12492 10.4834 9.12492H9.65007C8.4834 9.12492 7.9834 9.54158 7.9834 10.7083Z",
        fill: "white",
        stroke: "#247EFE",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ),
  q6 = Y6,
  Z6 = () => {
    const [e, t] = he(!1),
      n = () => t(!e);
    return /* @__PURE__ */ v.jsxs(v.Fragment, {
      children: [
        /* @__PURE__ */ v.jsxs(dt, {
          id: "lineageLegend",
          className: ne.lineage_legend,
          type: "button",
          onClick: n,
          children: [
            "Legend",
            e ? /* @__PURE__ */ v.jsx(M6, {}) : /* @__PURE__ */ v.jsx(I6, {}),
          ],
        }),
        /* @__PURE__ */ v.jsx(Wd, {
          flip: !0,
          target: "lineageLegend",
          isOpen: e,
          className: ne.column_legend,
          placement: "top",
          children: /* @__PURE__ */ v.jsx(Ud, {
            children: Object.entries(ud).map(([r, o]) =>
              /* @__PURE__ */ v.jsxs(
                "div",
                {
                  children: [
                    /* @__PURE__ */ v.jsx("div", {
                      className: ne.dot,
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
  X6 = Z6;
var Sd = { exports: {} };
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
})(Sd);
var K6 = Sd.exports;
const Re = /* @__PURE__ */ jn(K6),
  G6 = ({ datatype: e, color: t, size: n = "1rem" }) => {
    const [r, o] = De(() => {
      switch (e.toLowerCase()) {
        case "integer":
        case "float":
        case "double precision":
        case "double":
        case "bigint":
          return [a6, "#FF754C"];
        case "bool":
        case "boolean":
          return [r6, "#00A5DB"];
        case "text":
        case "character":
        case "character varying":
        case "varchar":
          return [s6, "#3F8CFF"];
        case "geospatial":
          return [h6, "#01CD8C"];
        case "date":
        case "timestamp":
        case "timestamp with time zone":
          return [d6, "#247EFE"];
        default:
          return [l6, "#6A24FE"];
      }
    }, [e]);
    return /* @__PURE__ */ v.jsx("div", {
      style: { color: t || o },
      className: "d-flex align-items-center",
      children: /* @__PURE__ */ v.jsx(r, { width: n, height: n }),
    });
  },
  Wo = ({ nodeType: e }) =>
    /* @__PURE__ */ v.jsxs("div", {
      children: [
        e === "seed" && /* @__PURE__ */ v.jsx(y6, {}),
        e === "model" && /* @__PURE__ */ v.jsx(g6, {}),
        e === "source" && /* @__PURE__ */ v.jsx(E6, {}),
        e === "exposure" && /* @__PURE__ */ v.jsx(b6, {}),
        e === "analysis" && /* @__PURE__ */ v.jsx(x6, {}),
        e === "snapshot" && /* @__PURE__ */ v.jsx(S6, {}),
        e === "semantic_model" && /* @__PURE__ */ v.jsx(T6, {}),
        e === "macros" && /* @__PURE__ */ v.jsx(D6, {}),
      ],
    }),
  er = ({ id: e, icon: t, text: n, label: r }) =>
    /* @__PURE__ */ v.jsxs(v.Fragment, {
      children: [
        /* @__PURE__ */ v.jsxs("div", {
          className: ne.table_node_pill,
          id: e,
          children: [
            /* @__PURE__ */ v.jsx("div", { className: ne.icon, children: t }),
            /* @__PURE__ */ v.jsx("div", { children: n }),
          ],
        }),
        /* @__PURE__ */ v.jsx(Yd, { target: e, children: r }),
      ],
    }),
  Nd = {
    seed: ne.seed,
    model: ne.model,
    source: ne.source,
    exposure: ne.exposure,
    snapshot: ne.snapshot,
    semantic_model: ne.metrics,
    macros: ne.macros,
    analysis: ne.analysis,
  },
  Td = {
    seed: "SED",
    model: "MDL",
    source: "SRC",
    exposure: "EXP",
    snapshot: "SNP",
    semantic_model: "MET",
    macros: "SEM",
    analysis: "ANY",
  },
  Wr = "-1px",
  Gi = () =>
    /* @__PURE__ */ v.jsxs(v.Fragment, {
      children: [
        /* @__PURE__ */ v.jsx(qt, {
          id: "left",
          type: "source",
          className: "invisible",
          isConnectable: !1,
          position: te.Left,
          style: { left: Wr },
        }),
        /* @__PURE__ */ v.jsx(qt, {
          id: "right",
          type: "source",
          className: "invisible",
          isConnectable: !1,
          position: te.Right,
          style: { right: Wr },
        }),
        /* @__PURE__ */ v.jsx(qt, {
          id: "left",
          type: "target",
          className: "invisible",
          isConnectable: !1,
          position: te.Left,
          style: { left: Wr },
        }),
        /* @__PURE__ */ v.jsx(qt, {
          id: "right",
          type: "target",
          className: "invisible",
          isConnectable: !1,
          position: te.Right,
          style: { right: Wr },
        }),
      ],
    }),
  J6 = ({ data: e }) => {
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
      c = Pt(),
      {
        state: {
          selectedTable: d,
          collectColumns: f,
          selectedColumn: h,
          leftExpansion: p,
          rightExpansion: g,
          selectCheck: m,
          nonSelectCheck: y,
        },
        rerender: _,
      } = Gt(),
      x = fn(),
      b = Object.keys(f[n] || {}).length,
      C = b > 0,
      A = d === n,
      O = () => {
        if (h.name && h.table === n) return;
        const N = c.getNodes(),
          w = c.getEdges(),
          [I, k] = wo(N, w, n);
        c.setNodes(I), c.setEdges(k);
      },
      S = async (N) => {
        if (je.inProgress) {
          je.showCllInProgressMsg();
          return;
        }
        let [w, I] = await Ki(c.getNodes(), c.getEdges(), n, N);
        if (
          (([w, I] = wo(w, I, d)),
          Hn(w, I),
          c.setNodes(w),
          c.setEdges(I),
          x(lo(So(w, I, d))),
          x(uo(await No(w, I, d, p, g))),
          _(),
          h.name)
        ) {
          try {
            je.start();
            const k = c.getEdges();
            pr(k, !1),
              gr(k, !0),
              c.setEdges(k),
              await _d(
                w,
                I,
                N,
                f[n].map((D) => ({ table: n, name: D.column })),
                (D) => {
                  x(Ml({ operatorList: D }));
                },
                (D) => {
                  x(Il(D));
                },
                (D) => {
                  x(Rl(D));
                },
                c,
                h,
                { direct: m, indirect: y },
              ),
              _();
          } catch (k) {
            console.log("cll:error:", k);
          } finally {
            je.end();
          }
          return;
        }
      },
      P = () => S(!0),
      L = () => S(!1),
      j = (N) => {
        if ((N.stopPropagation(), !!A && i !== "semantic_model")) {
          if (i === "exposure") {
            x(kt(od));
            return;
          }
          x(kt(rd));
        }
      },
      B = c.getEdges(),
      H = i,
      E = n.replace(/[^a-zA-Z0-9]/g, "-");
    return /* @__PURE__ */ v.jsxs("div", {
      className: "position-relative",
      style: {
        opacity: h.name ? (C ? 1 : 0.5) : 1,
      },
      children: [
        /* @__PURE__ */ v.jsxs("div", {
          className: ne.table_node,
          onClick: async () => {
            const N = c.getNodes(),
              w = c.getEdges();
            x(lo(So(N, w, n))),
              x(uo(await No(N, w, n, p, g))),
              O(),
              x(co(n)),
              r && B8(r);
          },
          children: [
            /* @__PURE__ */ v.jsx("div", {
              className: Re(
                ne.header,
                "d-flex flex-column align-items-start gap-xs",
                {
                  [ne.selected]: A,
                  [ne.collapse]: !C,
                },
              ),
              children: /* @__PURE__ */ v.jsxs("div", {
                className: "d-flex flex-column align-items-start gap-xs w-100",
                children: [
                  /* @__PURE__ */ v.jsxs("div", {
                    className: ne.table_header,
                    children: [
                      /* @__PURE__ */ v.jsxs("div", {
                        className: Re(ne.node_icon, Nd[H]),
                        children: [
                          /* @__PURE__ */ v.jsx(Wo, { nodeType: H }),
                          /* @__PURE__ */ v.jsx("div", { children: Td[H] }),
                        ],
                      }),
                      /* @__PURE__ */ v.jsx("div", {
                        className: "lines-2",
                        children: t,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ v.jsxs("div", {
                    className: Re(
                      "w-100 d-flex align-items-center gap-xs",
                      ne.node_extra_info,
                    ),
                    children: [
                      /* @__PURE__ */ v.jsx("div", {
                        className: Re("nodrag", ne.table_handle, {
                          invisible:
                            s === 0 ||
                            s === B.filter((N) => N.target === n).length ||
                            c.getNode(xo(n, !1)),
                        }),
                        onClick: (N) => {
                          N.stopPropagation(), L();
                        },
                        "data-testid": "expand-left-btn-" + n,
                        children: "+",
                      }),
                      (a == null ? void 0 : a.length) > 0 &&
                        /* @__PURE__ */ v.jsx(er, {
                          id: "table-node-tests-" + E,
                          icon: /* @__PURE__ */ v.jsx(xd, {}),
                          text: a.length.toString(),
                          label: "Tests",
                        }),
                      l &&
                        /* @__PURE__ */ v.jsx(er, {
                          id: "table-node-materilization-" + E,
                          icon: /* @__PURE__ */ v.jsx(wd, {}),
                          text: l,
                          label: "Materialization",
                        }),
                      u
                        ? /* @__PURE__ */ v.jsx(er, {
                            id: "table-node-is-external-" + E,
                            icon: /* @__PURE__ */ v.jsx(t6, {}),
                            text: "ext",
                            label: `External Project: ${n}`,
                          })
                        : null,
                      /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
                      /* @__PURE__ */ v.jsx("div", {
                        className: Re(
                          "nodrag",
                          A && i !== "semantic_model"
                            ? "text-blue"
                            : "text-grey",
                        ),
                        onClick: j,
                        "data-testid": "view-details-btn-" + n,
                        children: "Details",
                      }),
                      /* @__PURE__ */ v.jsx("div", {
                        className: Re("nodrag", ne.table_handle, {
                          invisible:
                            o === 0 ||
                            o === B.filter((N) => N.source === n).length ||
                            c.getNode(xo(n, !0)),
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
              /* @__PURE__ */ v.jsxs(v.Fragment, {
                children: [
                  /* @__PURE__ */ v.jsx("div", { className: ne.divider }),
                  /* @__PURE__ */ v.jsx("div", {
                    className: Re(ne.content, {
                      [ne.selected]: A,
                    }),
                    style: { height: ii(b) },
                  }),
                ],
              }),
          ],
        }),
        /* @__PURE__ */ v.jsx(Gi, {}),
      ],
    });
  },
  Q6 = ({ data: e }) => {
    const { tables: t = [], prevTable: n, right: r, level: o } = e,
      {
        state: { moreTables: s },
      } = Gt(),
      i = fn(),
      a = Pt(),
      l = ge(
        (u) => {
          u.stopPropagation(),
            i(kt(sd)),
            i(Ol({ ...s, tables: t, prevTable: n, right: r, level: o }));
        },
        [o, i, s, n, r, t],
      );
    return /* @__PURE__ */ v.jsxs("div", {
      className: ne.see_more_node,
      onClick: l,
      children: [
        /* @__PURE__ */ v.jsx("div", {
          className: "fw-semibold",
          children: "See more",
        }),
        /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ v.jsx("div", {
          children: t.filter((u) => !a.getNode(u.table)).length || "",
        }),
        /* @__PURE__ */ v.jsx(Gi, {}),
      ],
    });
  },
  e5 = (e) => {
    const { sourceX: t, sourceY: n, targetX: r, targetY: o, markerEnd: s } = e,
      i = (t - r) * 0.6,
      l = `M ${t - 5} ${n} A ${i} 50 0 1 0 ${r + 2} ${o}`;
    return /* @__PURE__ */ v.jsx(Fn, { path: l, markerEnd: s });
  },
  t5 = ({ data: e }) => {
    const { column: t, table: n, lensType: r } = e,
      {
        state: { selectedColumn: o },
      } = Gt(),
      s = fn(),
      i = o.table === n && o.name === t,
      a = r && ud[r],
      l = a ? { borderColor: a } : {},
      u = Pt(),
      c = () => {
        const d = u.getNode(_o(n, t));
        d && (s(co("")), s(Cn({ name: t, table: n })), J8(d, u));
      };
    return /* @__PURE__ */ v.jsxs("div", {
      className: Re(ne.column_node, i ? ne.selected : ne.default),
      style: l,
      onClick: c,
      children: [
        /* @__PURE__ */ v.jsx("div", {
          className: ne.column_name,
          children: t,
        }),
        /* @__PURE__ */ v.jsx(Gi, {}),
        a
          ? /* @__PURE__ */ v.jsx(qd, {
              style: { "--lens-color": a },
              className: ne.column_badge,
              children: r[0],
            })
          : null,
      ],
    });
  },
  n5 = document.getElementById("sidebar");
function r5({ isOpen: e, closeModal: t, width: n = 350, children: r }) {
  return Do(
    /* @__PURE__ */ v.jsx("div", {
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
        /* @__PURE__ */ v.jsxs(v.Fragment, {
          children: [
            /* @__PURE__ */ v.jsx("div", {
              className: "sidebar-close-button",
              onClick: t,
              children: /* @__PURE__ */ v.jsx(L6, {}),
            }),
            /* @__PURE__ */ v.jsx("div", {
              className: "sidebar-background-screen",
              onClick: t,
            }),
            /* @__PURE__ */ v.jsx("div", {
              className: "sidebar-modal-content",
              children: r,
            }),
          ],
        }),
    }),
    n5,
  );
}
function Uo(e) {
  return /* @__PURE__ */ v.jsx(Qr, { className: "custom-input", ...e });
}
function o5(e) {
  return /* @__PURE__ */ v.jsx(Qr, {
    className: "custom-input",
    ...e,
    type: "textarea",
    rows: 4,
  });
}
function s5({ nodeType: e, label: t, table: n, tests: r, materialization: o }) {
  const s = e,
    i = n.replace(/[^a-zA-Z0-9]/g, "-");
  return /* @__PURE__ */ v.jsxs("div", {
    className: "d-flex flex-column align-items-start gap-xs w-100",
    children: [
      /* @__PURE__ */ v.jsxs("div", {
        className: ne.table_header,
        children: [
          /* @__PURE__ */ v.jsxs("div", {
            className: Re(ne.node_icon, Nd[s]),
            children: [
              /* @__PURE__ */ v.jsx(Wo, { nodeType: s }),
              /* @__PURE__ */ v.jsx("div", { children: Td[s] }),
            ],
          }),
          /* @__PURE__ */ v.jsx("div", { className: "lines-2", children: t }),
        ],
      }),
      /* @__PURE__ */ v.jsxs("div", {
        className: Re("d-flex gap-xs", ne.node_extra_info),
        children: [
          (r == null ? void 0 : r.length) > 0 &&
            /* @__PURE__ */ v.jsx(er, {
              id: "table-node-tests-" + i,
              icon: /* @__PURE__ */ v.jsx(xd, {}),
              text: r.length.toString(),
              label: "Tests",
            }),
          o &&
            /* @__PURE__ */ v.jsx(er, {
              id: "table-node-materilization-" + i,
              icon: /* @__PURE__ */ v.jsx(wd, {}),
              text: o,
              label: "Materialization",
            }),
        ],
      }),
    ],
  });
}
function i5() {
  const {
      state: { moreTables: e, selectCheck: t, nonSelectCheck: n },
      rerender: r,
    } = Gt(),
    o = fn(),
    { tables: s, level: i } = e,
    a = Pt(),
    l = async (d) => {
      const f = [...a.getNodes()],
        h = [...a.getEdges()];
      K8(f, h, d, e, { direct: t, indirect: n }) && o(kt("")),
        Hn(f, h),
        a.setNodes(f),
        a.setEdges(h),
        r();
    },
    [u, c] = he(s);
  return /* @__PURE__ */ v.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ v.jsx("div", {
        className: "mb-2 fw-semibold fs-5",
        children: "Tables",
      }),
      /* @__PURE__ */ v.jsx(Uo, {
        bsSize: "sm",
        placeholder: "Search by table name",
        onChange: (d) => {
          const f = d.target.value.toLowerCase();
          c(s.filter((h) => h.table.toLowerCase().includes(f)));
        },
      }),
      /* @__PURE__ */ v.jsx("div", { className: "mb-3" }),
      /* @__PURE__ */ v.jsx("div", {
        className: "h-100 overflow-y",
        children: /* @__PURE__ */ v.jsx("div", {
          className: "d-flex flex-column gap-sm",
          children: u.map((d) => {
            const f = a.getNode(d.table),
              h = f && f.data.level !== i;
            return /* @__PURE__ */ v.jsx(
              "div",
              {
                className: Re(ne.table_card, {
                  [ne.selected]: f,
                  // [styles.disabled]: isNodeOnOtherLevel,
                }),
                onClick: (p) => {
                  p.stopPropagation(), !h && l(d);
                },
                children: /* @__PURE__ */ v.jsx(s5, {
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
const a5 = "_component_1sc6a_1",
  c5 = {
    component: a5,
  },
  Ad = ({ top: e = 50, left: t = 50, label: n }) =>
    /* @__PURE__ */ v.jsx("div", {
      className: c5.component,
      style: { top: `${e}%`, left: `${t}%` },
      children: /* @__PURE__ */ v.jsx("div", {
        style: { marginTop: "-70px" },
        children: n,
      }),
    }),
  l5 = "_level_tag_x6wwh_1",
  u5 = {
    level_tag: l5,
  },
  d5 = ({ label: e }) =>
    /* @__PURE__ */ v.jsx("div", { className: Re(u5.level_tag), children: e }),
  f5 = ({ purpose: e }) =>
    /* @__PURE__ */ v.jsx("div", {
      className: Re(ne.card, "purpose-section"),
      children: /* @__PURE__ */ v.jsx("div", {
        className: "d-flex flex-column gap-sm",
        children: /* @__PURE__ */ v.jsxs("div", {
          className: "d-flex gap-xs flex-column",
          children: [
            /* @__PURE__ */ v.jsx("div", {
              className: "fs-5 fw-semibold",
              children: "Description",
            }),
            /* @__PURE__ */ v.jsx("div", {
              className: Re(ne.column_card),
              children: /* @__PURE__ */ v.jsx("div", {
                className: "font-normal fs-xxs",
                children: e,
              }),
            }),
          ],
        }),
      }),
    }),
  Dd = f5,
  h5 = () =>
    /* @__PURE__ */ v.jsxs("div", {
      className: "tooltip-container",
      children: [
        /* @__PURE__ */ v.jsx(F6, {}),
        /* @__PURE__ */ v.jsx("div", {
          className: "tooltip-text",
          children: "Preview Feature",
        }),
      ],
    }),
  p5 = ({ column: e, handleClick: t, selected: n, isSelectable: r }) =>
    /* @__PURE__ */ v.jsxs("div", {
      className: Re(ne.column_card, {
        [ne.selected]: n,
        "cursor-pointer": r,
      }),
      onClick: t,
      "data-testid": "table-details-" + e.name,
      children: [
        /* @__PURE__ */ v.jsxs("div", {
          className: "d-flex align-items-center gap-xs",
          children: [
            /* @__PURE__ */ v.jsx(G6, { datatype: e.datatype }),
            /* @__PURE__ */ v.jsx("div", {
              className: "lines-2",
              children: e.name,
            }),
            /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
            e.can_lineage_expand &&
              /* @__PURE__ */ v.jsx("div", {
                className: ne.expand_lineage_icon,
                children: /* @__PURE__ */ v.jsx(j6, {}),
              }),
            e.datatype && /* @__PURE__ */ v.jsx(d5, { label: e.datatype }),
          ],
        }),
        e.description &&
          /* @__PURE__ */ v.jsx("div", {
            className: "d-flex flex-column",
            children: /* @__PURE__ */ v.jsx("div", {
              className: "font-normal fs-xxs text-grey",
              children: e.description,
            }),
          }),
      ],
    }),
  g5 = ({
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
    return /* @__PURE__ */ v.jsx("div", {
      className: Re(ne.card, "flex-grow column-section"),
      children: /* @__PURE__ */ v.jsxs("div", {
        className: "d-flex flex-column gap-sm h-100 p-2",
        children: [
          /* @__PURE__ */ v.jsxs("div", {
            className: "d-flex align-items-center gap-xs",
            children: [
              /* @__PURE__ */ v.jsx("div", {
                className: "fs-5 fw-semibold",
                children: "Columns",
              }),
              /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
              !a &&
                !l &&
                /* @__PURE__ */ v.jsx(dt, {
                  size: "sm",
                  color: "primary",
                  onClick: () => {
                    o &&
                      md(o.table, !0).then((u) => {
                        i(u), n(u.columns);
                      });
                  },
                  children: "Sync with DB",
                }),
            ],
          }),
          /* @__PURE__ */ v.jsx(Uo, {
            bsSize: "sm",
            type: "text",
            placeholder: "Search by column name",
            onChange: (u) => {
              const c = u.target.value.toLowerCase();
              n(e.filter((d) => d.name.toLowerCase().includes(c)));
            },
          }),
          /* @__PURE__ */ v.jsxs("div", {
            className: "d-flex align-items-center gap-xs",
            children: [
              !a &&
                /* @__PURE__ */ v.jsxs(v.Fragment, {
                  children: [
                    /* @__PURE__ */ v.jsx("div", {
                      className: "fs-xxs",
                      children: "Select column for lineage",
                    }),
                    /* @__PURE__ */ v.jsx(h5, {}),
                  ],
                }),
              /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
              /* @__PURE__ */ v.jsxs("div", {
                className: "fs-xxs text-grey",
                children: [t.length, " columns"],
              }),
            ],
          }),
          /* @__PURE__ */ v.jsx("div", {
            className: "d-flex flex-column gap-sm",
            children: t.map((u) =>
              /* @__PURE__ */ v.jsx(
                p5,
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
  m5 = ({ tests: e }) => {
    const [t, n] = he(e);
    return /* @__PURE__ */ v.jsx("div", {
      className: Re(ne.card, "flex-grow column-section"),
      children: /* @__PURE__ */ v.jsxs("div", {
        className: "d-flex flex-column gap-sm h-100 p-2",
        children: [
          /* @__PURE__ */ v.jsx("div", {
            className: "fs-5 fw-semibold",
            children: "Tests",
          }),
          /* @__PURE__ */ v.jsx(Uo, {
            bsSize: "sm",
            type: "text",
            placeholder: "Search by test",
            onChange: (r) => {
              const o = r.target.value.toLowerCase();
              n(e.filter((s) => s.key.toLowerCase().includes(o)));
            },
          }),
          /* @__PURE__ */ v.jsx("div", {
            className: "d-flex align-items-center gap-xs",
            children: /* @__PURE__ */ v.jsxs("div", {
              className: "fs-xxs text-grey",
              children: [t.length, " tests"],
            }),
          }),
          /* @__PURE__ */ v.jsx("div", {
            className: "d-flex flex-column gap-sm",
            children: t.map((r) =>
              /* @__PURE__ */ v.jsx(
                "div",
                {
                  className: ne.column_card,
                  children: /* @__PURE__ */ v.jsx("div", {
                    className: "d-flex align-items-center gap-xs",
                    children: /* @__PURE__ */ v.jsx("div", {
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
  y5 = () => {
    var x;
    const {
        rerender: e,
        state: {
          selectedTable: t,
          selectedColumn: n,
          selectCheck: r,
          nonSelectCheck: o,
          aiEnabled: s,
        },
      } = Gt(),
      i = fn(),
      a = Pt(),
      [l, u] = he([]),
      [c, d] = he(null),
      [f, h] = he(0),
      [p, g] = he(!0);
    ie(() => {
      t &&
        md(t, !1).then((b) => {
          d(b), u(b.columns), g(!1);
        });
    }, [t]);
    const m = async (b) => {
        var E;
        if (!s) {
          z8();
          return;
        }
        if (je.inProgress) {
          je.showCllInProgressMsg();
          return;
        }
        if (n.table === b.table && n.name === b.name) {
          const [N, w] = Z8(a.getNodes(), a.getEdges());
          pr(w, !0),
            gr(w, !0),
            a.setNodes(N),
            a.setEdges(w),
            i(Cn({ table: "", name: "" })),
            i(Fs({})),
            i(kt(""));
          return;
        }
        const C = (E = a.getNode(b.table)) == null ? void 0 : E.data;
        if (!C) throw new Error(`table node ${b.table} isn't visible`);
        let A = a.getNodes(),
          O = a.getEdges();
        pr(O, !1), gr(O, !0);
        const S = async (N) => {
            ([A, O] = await Ki(A, O, b.table, N)), Hn(A, O);
          },
          { upstreamCount: P, downstreamCount: L } = C;
        P > 0 &&
          O.filter((N) => N.source === b.table).length < P &&
          (await S(!0)),
          L > 0 &&
            O.filter((N) => N.target === b.table).length < L &&
            (await S(!1)),
          i(Cn({ ...b })),
          i(kt("")),
          i(Fs({})),
          i(Ap({ confidence: "high" }));
        const [j, B] = U8(A.filter(hr), O.filter(hr));
        B.forEach((N) => (N.style = qi)), a.setNodes(j), a.setEdges(B), e();
        const H = (N) =>
          _d(
            j,
            B,
            N,
            [b],
            (w) => {
              i(Ml({ operatorList: w }));
            },
            (w) => {
              i(Il(w));
            },
            (w) => {
              i(Rl(w));
            },
            a,
            b,
            { direct: r, indirect: o },
          );
        try {
          je.start(),
            (await Promise.all([H(!0), H(!1)])).every((w) => !w) &&
              (je.isCancelled
                ? i(Cn({ table: "", name: "" }))
                : vd(
                    `No lineage found for model ${b.table} and column ${b.name}`,
                  ));
        } catch (N) {
          console.error(
            "Error while performing cll for ",
            b.table,
            b.name,
            ", error:",
            N,
          ),
            i(Cn({ table: "", name: "" }));
        } finally {
          je.end();
        }
      },
      y = (x = a.getNode(t)) == null ? void 0 : x.data;
    if (p || !c || !t) return /* @__PURE__ */ v.jsx(Ad, {});
    const _ = ["Column"];
    return (
      y.tests.length && _.push("Tests"),
      /* @__PURE__ */ v.jsxs("div", {
        className: "p-2 h-100 d-flex flex-column gap-md overflow-y",
        children: [
          /* @__PURE__ */ v.jsxs("div", {
            className: ne.table_details_header,
            children: [
              /* @__PURE__ */ v.jsx(Wo, { nodeType: y.nodeType }),
              /* @__PURE__ */ v.jsx("div", {
                className: "d-flex align-items-center",
                children: /* @__PURE__ */ v.jsx("div", {
                  className: "fw-semibold fs-5 lines-2",
                  children: y.label,
                }),
              }),
            ],
          }),
          c.purpose && /* @__PURE__ */ v.jsx(Dd, { purpose: c.purpose }),
          /* @__PURE__ */ v.jsx("div", {
            className: ne.table_details_tabs,
            children: _.map((b, C) =>
              /* @__PURE__ */ v.jsx(
                "div",
                {
                  className: Re(ne.tab, { [ne.selected]: f === C }),
                  onClick: () => h(C),
                  children: b,
                },
                b,
              ),
            ),
          }),
          f === 0 &&
            /* @__PURE__ */ v.jsx(g5, {
              selectedTable: y,
              selectedColumn: n,
              filteredColumn: l,
              setFilteredColumn: u,
              columns: c.columns,
              handleColumnClick: m,
              setData: d,
            }),
          f === 1 && /* @__PURE__ */ v.jsx(m5, { tests: y.tests }),
        ],
      })
    );
  },
  v5 = ({ title: e, value: t }) =>
    /* @__PURE__ */ v.jsxs("div", {
      className: Re(ne.column_card, {}),
      children: [
        /* @__PURE__ */ v.jsxs("div", {
          className: "d-flex align-items-center gap-xs",
          children: [
            /* @__PURE__ */ v.jsx("div", { className: "lines-2", children: e }),
            /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
          ],
        }),
        /* @__PURE__ */ v.jsx("div", {
          className: "d-flex flex-column",
          children: /* @__PURE__ */ v.jsx("div", {
            className: "font-normal fs-xxs text-grey",
            children: t,
          }),
        }),
      ],
    }),
  Ur = v5,
  E5 = ({ label: e }) => /* @__PURE__ */ v.jsx("div", { children: e }),
  C5 = E5,
  b5 = () => {
    var a;
    const e = Pt(),
      {
        state: { selectedTable: t },
      } = Gt(),
      [n, r] = he(null),
      o = (a = e.getNode(t)) == null ? void 0 : a.data,
      [s, i] = he(!0);
    return (
      ie(() => {
        t &&
          P8(t).then((l) => {
            r(l), i(!1);
          });
      }, [t]),
      s || !n || !t
        ? /* @__PURE__ */ v.jsx(Ad, {})
        : /* @__PURE__ */ v.jsxs("div", {
            className: "p-2 h-100 d-flex flex-column gap-md overflow-y",
            children: [
              /* @__PURE__ */ v.jsxs("div", {
                className: ne.table_details_header,
                children: [
                  /* @__PURE__ */ v.jsx(Wo, { nodeType: o.nodeType }),
                  /* @__PURE__ */ v.jsx("div", {
                    className: "d-flex align-items-center",
                    children: /* @__PURE__ */ v.jsx("div", {
                      className: "fw-semibold fs-5 lines-2",
                      children: o.label,
                    }),
                  }),
                ],
              }),
              n.description
                ? /* @__PURE__ */ v.jsx(Dd, { purpose: n.description })
                : null,
              /* @__PURE__ */ v.jsxs("div", {
                className: Re(ne.card, "flex-grow column-section"),
                children: [
                  /* @__PURE__ */ v.jsx(Ur, {
                    title: "Owner",
                    value: `${n.owner.name} - ${n.owner.email}`,
                  }),
                  /* @__PURE__ */ v.jsx(Ur, { title: "Url", value: n.url }),
                  /* @__PURE__ */ v.jsx(Ur, {
                    title: "Tags",
                    value: n.tags.map((l) =>
                      /* @__PURE__ */ v.jsx(C5, { label: l }),
                    ),
                  }),
                  /* @__PURE__ */ v.jsx(Ur, {
                    title: "Maturity",
                    value: n.maturity,
                  }),
                ],
              }),
            ],
          })
    );
  },
  _5 = b5;
function x5({ close: e }) {
  const [t, n] = he(
      "",
      /* None */
    ),
    [r, o] = he(""),
    [s, i] = he(!1);
  return /* @__PURE__ */ v.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ v.jsxs("div", {
        className: "mb-2 d-flex",
        children: [
          /* @__PURE__ */ v.jsx("div", {
            className: "fw-semibold fs-5",
            children: "Feedback",
          }),
          /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
          /* @__PURE__ */ v.jsx(dt, {
            size: "sm",
            color: "primary",
            onClick: (a) => {
              a.stopPropagation(), yd();
            },
            children: "Chat with us",
          }),
        ],
      }),
      /* @__PURE__ */ v.jsxs("div", {
        className: ne.feedback_body,
        children: [
          !s &&
            /* @__PURE__ */ v.jsxs(v.Fragment, {
              children: [
                /* @__PURE__ */ v.jsxs("div", {
                  className: "d-flex gap-sm m-2",
                  children: [
                    t === "good"
                      ? /* @__PURE__ */ v.jsx(U6, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "",
                              /* None */
                            ),
                        })
                      : /* @__PURE__ */ v.jsx(B6, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "good",
                              /* Postive */
                            ),
                        }),
                    t === "bad"
                      ? /* @__PURE__ */ v.jsx(q6, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "",
                              /* None */
                            ),
                        })
                      : /* @__PURE__ */ v.jsx(V6, {
                          className: "cursor-pointer",
                          onClick: () =>
                            n(
                              "bad",
                              /* Negative */
                            ),
                        }),
                  ],
                }),
                /* @__PURE__ */ v.jsx("p", {
                  children:
                    "AI still needs humans sometimes, please help it out 🙂",
                }),
                /* @__PURE__ */ v.jsx(o5, {
                  value: r,
                  onChange: (a) => o(a.target.value),
                  placeholder:
                    "What did AI do wrong? What it should have done?",
                }),
                /* @__PURE__ */ v.jsxs("div", {
                  className: "mt-3 d-flex gap-sm",
                  children: [
                    /* @__PURE__ */ v.jsx(dt, {
                      size: "sm",
                      color: "primary",
                      onClick: async (a) => {
                        a.stopPropagation(),
                          t !== "" &&
                            (await $8({
                              feedback_value: t,
                              feedback_text: r,
                            }),
                            i(!0));
                      },
                      children: "Submit",
                    }),
                    /* @__PURE__ */ v.jsx(dt, {
                      size: "sm",
                      color: "link",
                      className: ne.cancel_btn,
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
            /* @__PURE__ */ v.jsxs(v.Fragment, {
              children: [
                /* @__PURE__ */ v.jsx("p", {
                  children: "Many thanks for your feedback!",
                }),
                /* @__PURE__ */ v.jsx(dt, {
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
function w5() {
  return /* @__PURE__ */ v.jsxs("div", {
    className: "p-3 h-100 d-flex flex-column overflow-y",
    children: [
      /* @__PURE__ */ v.jsxs("div", {
        className: "mb-2 d-flex",
        children: [
          /* @__PURE__ */ v.jsx("div", {
            className: "fw-semibold fs-5",
            children: "Help",
          }),
          /* @__PURE__ */ v.jsx("div", { className: "spacer" }),
          /* @__PURE__ */ v.jsx(dt, {
            size: "sm",
            color: "primary",
            onClick: (e) => {
              e.stopPropagation(), yd();
            },
            children: "Chat with us",
          }),
        ],
      }),
      /* @__PURE__ */ v.jsxs("div", {
        className: ne.help_body,
        children: [
          /* @__PURE__ */ v.jsx("p", {
            children:
              "Lineage is available in two forms - model level lineage and column level lineage. You need to add API key in the extension settings to view column level lineage. You can view model level lineage without an API key.",
          }),
          /* @__PURE__ */ v.jsxs("ul", {
            children: [
              /* @__PURE__ */ v.jsx("li", {
                children:
                  "Different dbt entities like sources, seeds, models, tests and model types are shown in the lineage view. You can expand lineage from that component by click on (+) sign in the component.",
              }),
              /* @__PURE__ */ v.jsx("li", {
                children:
                  'For applicable components, column lineage view includes list of columns with descriptions as well as dbt tests that are written for that particular component. You can see columns and tests by clicking on "view details" in the component',
              }),
              /* @__PURE__ */ v.jsx("li", {
                children:
                  "In column lineage view, links between components (columns) are shown as direct links and indirect links. Direct links are shown as solid lines if there is direct flow of data between columns through select statements. Indirect links are shown as dotted line if columns appear in condition/clauses like where, join, having, etc. These links can be filters in the column lineage view.",
              }),
            ],
          }),
          /* @__PURE__ */ v.jsxs("div", {
            children: [
              /* @__PURE__ */ v.jsx("span", {
                children: "If you want to know more please check our ",
              }),
              /* @__PURE__ */ v.jsx("a", {
                href: "https://docs.myaltimate.com",
                className: "text-blue",
                children: "Documentation",
              }),
              /* @__PURE__ */ v.jsx("span", {
                children:
                  " or still have issue no problem Get in touch with us ",
              }),
              /* @__PURE__ */ v.jsx("a", {
                href: "https://www.altimate.ai/support",
                className: "text-blue",
                children: "Contact us",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function S5() {
  const {
      state: {
        selectCheck: e,
        nonSelectCheck: t,
        defaultExpansion: n,
        aiEnabled: r,
      },
    } = Gt(),
    o = fn();
  return /* @__PURE__ */ v.jsxs("div", {
    className: "p-2 h-100 d-flex flex-column",
    children: [
      /* @__PURE__ */ v.jsx("div", {
        className: "mb-2 fw-semibold fs-5",
        children: "Settings",
      }),
      /* @__PURE__ */ v.jsxs("div", {
        className: "d-flex flex-column gap-sm",
        children: [
          /* @__PURE__ */ v.jsxs("div", {
            children: [
              /* @__PURE__ */ v.jsx(es, {
                check: !0,
                for: "default-expansion",
                className: "fs-6 mb-1",
                children: "Default Expansion",
              }),
              /* @__PURE__ */ v.jsx(Uo, {
                id: "default-expansion",
                value: n,
                type: "number",
                onChange: (s) => {
                  const i = Math.max(parseInt(s.target.value), 0);
                  o(Pl(i)), Ss({ defaultExpansion: i });
                },
              }),
            ],
          }),
          r &&
            /* @__PURE__ */ v.jsxs(v.Fragment, {
              children: [
                /* @__PURE__ */ v.jsx("div", {
                  className: "fs-6",
                  children: "Edges visibility",
                }),
                /* @__PURE__ */ v.jsxs("div", {
                  className: ne.select_node_checkbox,
                  children: [
                    /* @__PURE__ */ v.jsx(Qr, {
                      type: "checkbox",
                      id: "select-check",
                      className: "mt-2",
                      checked: e,
                      onChange: (s) => {
                        if (je.inProgress) {
                          je.showCllInProgressMsg();
                          return;
                        }
                        o(kl(s.target.checked)),
                          Ss({
                            showSelectEdges: s.target.checked,
                          });
                      },
                    }),
                    /* @__PURE__ */ v.jsxs("div", {
                      className: "d-flex flex-column",
                      children: [
                        /* @__PURE__ */ v.jsx(es, {
                          check: !0,
                          for: "select-check",
                          className: "fs-6",
                          children: "Select",
                        }),
                        /* @__PURE__ */ v.jsx("div", {
                          className: "text-grey",
                          children:
                            "Select linkages are shown if there is direct flow of data between columns through select statements.",
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ v.jsxs("div", {
                  className: ne.non_select_node_checkbox,
                  children: [
                    /* @__PURE__ */ v.jsx(Qr, {
                      type: "checkbox",
                      id: "non-select-check",
                      className: "mt-2",
                      checked: t,
                      onChange: (s) => {
                        if (je.inProgress) {
                          je.showCllInProgressMsg();
                          return;
                        }
                        o(Ll(s.target.checked)),
                          Ss({
                            showNonSelectEdges: s.target.checked,
                          });
                      },
                    }),
                    /* @__PURE__ */ v.jsxs("div", {
                      className: "d-flex flex-column",
                      children: [
                        /* @__PURE__ */ v.jsx(es, {
                          check: !0,
                          for: "non-select-check",
                          className: "fs-6",
                          children: "Non-Select",
                        }),
                        /* @__PURE__ */ v.jsx("div", {
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
const N5 = {
    table: J6,
    seeMore: Q6,
    column: t5,
  },
  T5 = { selfConnecting: e5 },
  A5 = ({ flow: e, afterFlowRender: t, theme: n }) => {
    const {
        state: { selectCheck: r, nonSelectCheck: o, sidebarScreen: s },
      } = Gt(),
      i = fn(),
      a = ge(async () => {
        const l = await F8();
        i(kl(l.showSelectEdges)),
          i(Ll(l.showNonSelectEdges)),
          i(Pl(l.defaultExpansion));
      }, [i]);
    return (
      ie(() => {
        H8(), a();
      }, [a]),
      ie(() => {
        var c;
        const l = e.current;
        if (!l) return;
        const u = l.getEdges();
        if ((r && o) || (!r && !o)) {
          for (const d of u) d.hidden = !1;
          l.setEdges(u);
          return;
        }
        for (const d of u) {
          d.hidden = !1;
          const f = (c = d.data) == null ? void 0 : c.type;
          f &&
            (f === "direct" && (d.hidden = !r),
            f === "indirect" && (d.hidden = !o));
        }
        l.setEdges(u);
      }, [r, o, e]),
      /* @__PURE__ */ v.jsx("div", {
        className: "lineage_flow_component",
        style: { width: "100%", height: "100%" },
        "data-theme": n,
        children: /* @__PURE__ */ v.jsxs(Vi, {
          children: [
            /* @__PURE__ */ v.jsxs(ed, {
              defaultNodes: [],
              defaultEdges: [],
              onInit: (l) => t(l),
              nodeTypes: N5,
              edgeTypes: T5,
              style: { background: "var(--bg-color)" },
              proOptions: { hideAttribution: !0 },
              minZoom: cd,
              children: [
                /* @__PURE__ */ v.jsx(b8, {}),
                /* @__PURE__ */ v.jsx(g8, {}),
              ],
            }),
            /* @__PURE__ */ v.jsx(X6, {}),
            /* @__PURE__ */ v.jsxs(r5, {
              isOpen: s !== "",
              closeModal: () => i(kt("")),
              width: 446,
              children: [
                s === sd && /* @__PURE__ */ v.jsx(i5, {}),
                s === rd && /* @__PURE__ */ v.jsx(y5, {}),
                s === od && /* @__PURE__ */ v.jsx(_5, {}),
                s === _8 && /* @__PURE__ */ v.jsx(x5, { close: () => kt("") }),
                s === x8 && /* @__PURE__ */ v.jsx(w5, {}),
                s === w8 && /* @__PURE__ */ v.jsx(S5, {}),
              ],
            }),
          ],
        }),
      })
    );
  },
  D5 = A5,
  Ji = bt({
    state: ao.getInitialState(),
    dispatch: () => null,
    rerender: () => null,
  }),
  O5 = ({ renderNode: e, theme: t = "dark" }) => {
    const [n, r] = jc(ao.reducer, {
        ...ao.getInitialState(),
      }),
      o = se(),
      [, s] = he(0),
      i = ge(() => s((d) => (d + 1) % 100), []),
      a = ge(
        async (d) => {
          if ((r(kt("")), !d)) return;
          r(Dp(d.aiEnabled));
          const { node: f } = d,
            h = o.current;
          if (!h || !f) return;
          if (h.getNode(f.table)) {
            r(co(f.table));
            let _ = h.getNodes(),
              x = h.getEdges();
            n.selectedColumn.name ||
              (([_, x] = wo(_, x, f.table)), h.setNodes(_), h.setEdges(x)),
              r(lo(So(_, x, f.table))),
              r(uo(await No(_, x, f.table, n.leftExpansion, n.rightExpansion)));
            return;
          }
          let g = [],
            m = [];
          const y = async (_, x) => {
            [g, m] = await Ki(g, m, _, x);
          };
          (g = [Zi(f, 0, "")]),
            f.upstreamCount > 0 && (await y(f.table, !0)),
            f.downstreamCount > 0 && (await y(f.table, !1)),
            r(co(f.table)),
            r(Cn({ table: "", name: "" })),
            r(Fs({})),
            r(Ol({})),
            ([g, m] = wo(g, m, f.table)),
            Hn(g, m),
            h.setNodes(g),
            h.setEdges(m),
            h.fitView({ minZoom: cd, duration: 500 }),
            r(lo(So(g, m, f.table))),
            r(uo(await No(g, m, f.table, n.leftExpansion, n.rightExpansion))),
            i();
        },
        [i, n.leftExpansion, n.rightExpansion, n.selectedColumn.name],
      ),
      l = () => {
        if (o.current) {
          const d = o.current.getEdges();
          pr(d, !0), gr(d, !1), o.current.setEdges(d);
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
    const u = De(
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
      /* @__PURE__ */ v.jsx(Ji.Provider, {
        value: u,
        children: /* @__PURE__ */ v.jsx(D5, {
          afterFlowRender: c,
          flow: o,
          theme: t,
        }),
      })
    );
  },
  I5 = O5,
  Gt = () => Ge(Ji),
  fn = () => {
    const { dispatch: e } = Ge(Ji);
    return e;
  },
  R5 = (e) => /* @__PURE__ */ v.jsx(I5, { ...e }),
  J5 = R5;
export {
  Oe as A,
  vf as C,
  X5 as D,
  J5 as L,
  be as a,
  V5 as b,
  W5 as c,
  $5 as d,
  ui as e,
  Mt as f,
  Ef as g,
  ci as h,
  wl as i,
  v as j,
  ip as k,
  W8 as l,
  je as m,
  z5 as s,
  rt as u,
};
