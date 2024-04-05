import "./main.css";
import * as we from "react";
import ie, {
  createContext as et,
  useReducer as Nl,
  useCallback as qe,
  useMemo as Je,
  useContext as ye,
  useLayoutEffect as jl,
  useEffect as De,
  useRef as Re,
  useInsertionEffect as ua,
  forwardRef as la,
  Fragment as Ll,
  createElement as Lr,
  useId as ci,
  useState as ve,
  cloneElement as Vl,
  Children as Mt,
  isValidElement as ca,
  Component as kl,
  lazy as $l,
} from "react";
import {
  Tooltip as Bl,
  Button as ln,
  Spinner as Hl,
  Card as fi,
  CardBody as di,
  CardTitle as Ul,
  CloseButton as zl,
} from "reactstrap";
import Wl, { createPortal as hi } from "react-dom";
import { CodeBlock as Yl, solarizedLight as ql } from "react-code-blocks";
var Kl =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function qn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Vr = { exports: {} },
  Ut = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vo;
function Gl() {
  if (vo) return Ut;
  vo = 1;
  var e = ie,
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(a, u, c) {
    var l,
      f = {},
      d = null,
      h = null;
    c !== void 0 && (d = "" + c),
      u.key !== void 0 && (d = "" + u.key),
      u.ref !== void 0 && (h = u.ref);
    for (l in u) r.call(u, l) && !o.hasOwnProperty(l) && (f[l] = u[l]);
    if (a && a.defaultProps)
      for (l in ((u = a.defaultProps), u)) f[l] === void 0 && (f[l] = u[l]);
    return {
      $$typeof: t,
      type: a,
      key: d,
      ref: h,
      props: f,
      _owner: i.current,
    };
  }
  return (Ut.Fragment = n), (Ut.jsx = s), (Ut.jsxs = s), Ut;
}
var zt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eo;
function Xl() {
  return (
    Eo ||
      ((Eo = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = ie,
            t = Symbol.for("react.element"),
            n = Symbol.for("react.portal"),
            r = Symbol.for("react.fragment"),
            i = Symbol.for("react.strict_mode"),
            o = Symbol.for("react.profiler"),
            s = Symbol.for("react.provider"),
            a = Symbol.for("react.context"),
            u = Symbol.for("react.forward_ref"),
            c = Symbol.for("react.suspense"),
            l = Symbol.for("react.suspense_list"),
            f = Symbol.for("react.memo"),
            d = Symbol.for("react.lazy"),
            h = Symbol.for("react.offscreen"),
            p = Symbol.iterator,
            m = "@@iterator";
          function g(y) {
            if (y === null || typeof y != "object") return null;
            var N = (p && y[p]) || y[m];
            return typeof N == "function" ? N : null;
          }
          var v = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function b(y) {
            {
              for (
                var N = arguments.length,
                  B = new Array(N > 1 ? N - 1 : 0),
                  J = 1;
                J < N;
                J++
              )
                B[J - 1] = arguments[J];
              E("error", y, B);
            }
          }
          function E(y, N, B) {
            {
              var J = v.ReactDebugCurrentFrame,
                se = J.getStackAddendum();
              se !== "" && ((N += "%s"), (B = B.concat([se])));
              var le = B.map(function (oe) {
                return String(oe);
              });
              le.unshift("Warning: " + N),
                Function.prototype.apply.call(console[y], console, le);
            }
          }
          var x = !1,
            S = !1,
            P = !1,
            I = !1,
            T = !1,
            L;
          L = Symbol.for("react.module.reference");
          function A(y) {
            return !!(
              typeof y == "string" ||
              typeof y == "function" ||
              y === r ||
              y === o ||
              T ||
              y === i ||
              y === c ||
              y === l ||
              I ||
              y === h ||
              x ||
              S ||
              P ||
              (typeof y == "object" &&
                y !== null &&
                (y.$$typeof === d ||
                  y.$$typeof === f ||
                  y.$$typeof === s ||
                  y.$$typeof === a ||
                  y.$$typeof === u || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  y.$$typeof === L ||
                  y.getModuleId !== void 0))
            );
          }
          function j(y, N, B) {
            var J = y.displayName;
            if (J) return J;
            var se = N.displayName || N.name || "";
            return se !== "" ? B + "(" + se + ")" : B;
          }
          function X(y) {
            return y.displayName || "Context";
          }
          function q(y) {
            if (y == null) return null;
            if (
              (typeof y.tag == "number" &&
                b(
                  "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                ),
              typeof y == "function")
            )
              return y.displayName || y.name || null;
            if (typeof y == "string") return y;
            switch (y) {
              case r:
                return "Fragment";
              case n:
                return "Portal";
              case o:
                return "Profiler";
              case i:
                return "StrictMode";
              case c:
                return "Suspense";
              case l:
                return "SuspenseList";
            }
            if (typeof y == "object")
              switch (y.$$typeof) {
                case a:
                  var N = y;
                  return X(N) + ".Consumer";
                case s:
                  var B = y;
                  return X(B._context) + ".Provider";
                case u:
                  return j(y, y.render, "ForwardRef");
                case f:
                  var J = y.displayName || null;
                  return J !== null ? J : q(y.type) || "Memo";
                case d: {
                  var se = y,
                    le = se._payload,
                    oe = se._init;
                  try {
                    return q(oe(le));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var M = Object.assign,
            w = 0,
            _,
            O,
            D,
            $,
            C,
            R,
            H;
          function U() {}
          U.__reactDisabledLog = !0;
          function z() {
            {
              if (w === 0) {
                (_ = console.log),
                  (O = console.info),
                  (D = console.warn),
                  ($ = console.error),
                  (C = console.group),
                  (R = console.groupCollapsed),
                  (H = console.groupEnd);
                var y = {
                  configurable: !0,
                  enumerable: !0,
                  value: U,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: y,
                  log: y,
                  warn: y,
                  error: y,
                  group: y,
                  groupCollapsed: y,
                  groupEnd: y,
                });
              }
              w++;
            }
          }
          function Z() {
            {
              if ((w--, w === 0)) {
                var y = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: M({}, y, {
                    value: _,
                  }),
                  info: M({}, y, {
                    value: O,
                  }),
                  warn: M({}, y, {
                    value: D,
                  }),
                  error: M({}, y, {
                    value: $,
                  }),
                  group: M({}, y, {
                    value: C,
                  }),
                  groupCollapsed: M({}, y, {
                    value: R,
                  }),
                  groupEnd: M({}, y, {
                    value: H,
                  }),
                });
              }
              w < 0 &&
                b(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                );
            }
          }
          var K = v.ReactCurrentDispatcher,
            G;
          function Q(y, N, B) {
            {
              if (G === void 0)
                try {
                  throw Error();
                } catch (se) {
                  var J = se.stack.trim().match(/\n( *(at )?)/);
                  G = (J && J[1]) || "";
                }
              return (
                `
` +
                G +
                y
              );
            }
          }
          var ee = !1,
            W;
          {
            var ce = typeof WeakMap == "function" ? WeakMap : Map;
            W = new ce();
          }
          function k(y, N) {
            if (!y || ee) return "";
            {
              var B = W.get(y);
              if (B !== void 0) return B;
            }
            var J;
            ee = !0;
            var se = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var le;
            (le = K.current), (K.current = null), z();
            try {
              if (N) {
                var oe = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(oe.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(oe, []);
                  } catch (ze) {
                    J = ze;
                  }
                  Reflect.construct(y, [], oe);
                } else {
                  try {
                    oe.call();
                  } catch (ze) {
                    J = ze;
                  }
                  y.call(oe.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (ze) {
                  J = ze;
                }
                y();
              }
            } catch (ze) {
              if (ze && J && typeof ze.stack == "string") {
                for (
                  var re = ze.stack.split(`
`),
                    Ae = J.stack.split(`
`),
                    he = re.length - 1,
                    ge = Ae.length - 1;
                  he >= 1 && ge >= 0 && re[he] !== Ae[ge];

                )
                  ge--;
                for (; he >= 1 && ge >= 0; he--, ge--)
                  if (re[he] !== Ae[ge]) {
                    if (he !== 1 || ge !== 1)
                      do
                        if ((he--, ge--, ge < 0 || re[he] !== Ae[ge])) {
                          var Fe =
                            `
` + re[he].replace(" at new ", " at ");
                          return (
                            y.displayName &&
                              Fe.includes("<anonymous>") &&
                              (Fe = Fe.replace("<anonymous>", y.displayName)),
                            typeof y == "function" && W.set(y, Fe),
                            Fe
                          );
                        }
                      while (he >= 1 && ge >= 0);
                    break;
                  }
              }
            } finally {
              (ee = !1), (K.current = le), Z(), (Error.prepareStackTrace = se);
            }
            var xt = y ? y.displayName || y.name : "",
              yo = xt ? Q(xt) : "";
            return typeof y == "function" && W.set(y, yo), yo;
          }
          function be(y, N, B) {
            return k(y, !1);
          }
          function St(y) {
            var N = y.prototype;
            return !!(N && N.isReactComponent);
          }
          function ft(y, N, B) {
            if (y == null) return "";
            if (typeof y == "function") return k(y, St(y));
            if (typeof y == "string") return Q(y);
            switch (y) {
              case c:
                return Q("Suspense");
              case l:
                return Q("SuspenseList");
            }
            if (typeof y == "object")
              switch (y.$$typeof) {
                case u:
                  return be(y.render);
                case f:
                  return ft(y.type, N, B);
                case d: {
                  var J = y,
                    se = J._payload,
                    le = J._init;
                  try {
                    return ft(le(se), N, B);
                  } catch {}
                }
              }
            return "";
          }
          var gn = Object.prototype.hasOwnProperty,
            io = {},
            oo = v.ReactDebugCurrentFrame;
          function yn(y) {
            if (y) {
              var N = y._owner,
                B = ft(y.type, y._source, N ? N.type : null);
              oo.setExtraStackFrame(B);
            } else oo.setExtraStackFrame(null);
          }
          function ml(y, N, B, J, se) {
            {
              var le = Function.call.bind(gn);
              for (var oe in y)
                if (le(y, oe)) {
                  var re = void 0;
                  try {
                    if (typeof y[oe] != "function") {
                      var Ae = Error(
                        (J || "React class") +
                          ": " +
                          B +
                          " type `" +
                          oe +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof y[oe] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      );
                      throw ((Ae.name = "Invariant Violation"), Ae);
                    }
                    re = y[oe](
                      N,
                      oe,
                      J,
                      B,
                      null,
                      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                    );
                  } catch (he) {
                    re = he;
                  }
                  re &&
                    !(re instanceof Error) &&
                    (yn(se),
                    b(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      J || "React class",
                      B,
                      oe,
                      typeof re,
                    ),
                    yn(null)),
                    re instanceof Error &&
                      !(re.message in io) &&
                      ((io[re.message] = !0),
                      yn(se),
                      b("Failed %s type: %s", B, re.message),
                      yn(null));
                }
            }
          }
          var gl = Array.isArray;
          function ar(y) {
            return gl(y);
          }
          function yl(y) {
            {
              var N = typeof Symbol == "function" && Symbol.toStringTag,
                B =
                  (N && y[Symbol.toStringTag]) ||
                  y.constructor.name ||
                  "Object";
              return B;
            }
          }
          function vl(y) {
            try {
              return so(y), !1;
            } catch {
              return !0;
            }
          }
          function so(y) {
            return "" + y;
          }
          function ao(y) {
            if (vl(y))
              return (
                b(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  yl(y),
                ),
                so(y)
              );
          }
          var Ht = v.ReactCurrentOwner,
            El = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            uo,
            lo,
            ur;
          ur = {};
          function bl(y) {
            if (gn.call(y, "ref")) {
              var N = Object.getOwnPropertyDescriptor(y, "ref").get;
              if (N && N.isReactWarning) return !1;
            }
            return y.ref !== void 0;
          }
          function Tl(y) {
            if (gn.call(y, "key")) {
              var N = Object.getOwnPropertyDescriptor(y, "key").get;
              if (N && N.isReactWarning) return !1;
            }
            return y.key !== void 0;
          }
          function Sl(y, N) {
            if (
              typeof y.ref == "string" &&
              Ht.current &&
              N &&
              Ht.current.stateNode !== N
            ) {
              var B = q(Ht.current.type);
              ur[B] ||
                (b(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  q(Ht.current.type),
                  y.ref,
                ),
                (ur[B] = !0));
            }
          }
          function Cl(y, N) {
            {
              var B = function () {
                uo ||
                  ((uo = !0),
                  b(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    N,
                  ));
              };
              (B.isReactWarning = !0),
                Object.defineProperty(y, "key", {
                  get: B,
                  configurable: !0,
                });
            }
          }
          function xl(y, N) {
            {
              var B = function () {
                lo ||
                  ((lo = !0),
                  b(
                    "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    N,
                  ));
              };
              (B.isReactWarning = !0),
                Object.defineProperty(y, "ref", {
                  get: B,
                  configurable: !0,
                });
            }
          }
          var Al = function (y, N, B, J, se, le, oe) {
            var re = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: y,
              key: N,
              ref: B,
              props: oe,
              // Record the component responsible for creating this element.
              _owner: le,
            };
            return (
              (re._store = {}),
              Object.defineProperty(re._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(re, "_self", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: J,
              }),
              Object.defineProperty(re, "_source", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: se,
              }),
              Object.freeze && (Object.freeze(re.props), Object.freeze(re)),
              re
            );
          };
          function _l(y, N, B, J, se) {
            {
              var le,
                oe = {},
                re = null,
                Ae = null;
              B !== void 0 && (ao(B), (re = "" + B)),
                Tl(N) && (ao(N.key), (re = "" + N.key)),
                bl(N) && ((Ae = N.ref), Sl(N, se));
              for (le in N)
                gn.call(N, le) && !El.hasOwnProperty(le) && (oe[le] = N[le]);
              if (y && y.defaultProps) {
                var he = y.defaultProps;
                for (le in he) oe[le] === void 0 && (oe[le] = he[le]);
              }
              if (re || Ae) {
                var ge =
                  typeof y == "function"
                    ? y.displayName || y.name || "Unknown"
                    : y;
                re && Cl(oe, ge), Ae && xl(oe, ge);
              }
              return Al(y, re, Ae, se, J, Ht.current, oe);
            }
          }
          var lr = v.ReactCurrentOwner,
            co = v.ReactDebugCurrentFrame;
          function Ct(y) {
            if (y) {
              var N = y._owner,
                B = ft(y.type, y._source, N ? N.type : null);
              co.setExtraStackFrame(B);
            } else co.setExtraStackFrame(null);
          }
          var cr;
          cr = !1;
          function fr(y) {
            return typeof y == "object" && y !== null && y.$$typeof === t;
          }
          function fo() {
            {
              if (lr.current) {
                var y = q(lr.current.type);
                if (y)
                  return (
                    `

Check the render method of \`` +
                    y +
                    "`."
                  );
              }
              return "";
            }
          }
          function wl(y) {
            {
              if (y !== void 0) {
                var N = y.fileName.replace(/^.*[\\\/]/, ""),
                  B = y.lineNumber;
                return (
                  `

Check your code at ` +
                  N +
                  ":" +
                  B +
                  "."
                );
              }
              return "";
            }
          }
          var ho = {};
          function Dl(y) {
            {
              var N = fo();
              if (!N) {
                var B = typeof y == "string" ? y : y.displayName || y.name;
                B &&
                  (N =
                    `

Check the top-level render call using <` +
                    B +
                    ">.");
              }
              return N;
            }
          }
          function po(y, N) {
            {
              if (!y._store || y._store.validated || y.key != null) return;
              y._store.validated = !0;
              var B = Dl(N);
              if (ho[B]) return;
              ho[B] = !0;
              var J = "";
              y &&
                y._owner &&
                y._owner !== lr.current &&
                (J = " It was passed a child from " + q(y._owner.type) + "."),
                Ct(y),
                b(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  B,
                  J,
                ),
                Ct(null);
            }
          }
          function mo(y, N) {
            {
              if (typeof y != "object") return;
              if (ar(y))
                for (var B = 0; B < y.length; B++) {
                  var J = y[B];
                  fr(J) && po(J, N);
                }
              else if (fr(y)) y._store && (y._store.validated = !0);
              else if (y) {
                var se = g(y);
                if (typeof se == "function" && se !== y.entries)
                  for (var le = se.call(y), oe; !(oe = le.next()).done; )
                    fr(oe.value) && po(oe.value, N);
              }
            }
          }
          function Pl(y) {
            {
              var N = y.type;
              if (N == null || typeof N == "string") return;
              var B;
              if (typeof N == "function") B = N.propTypes;
              else if (
                typeof N == "object" &&
                (N.$$typeof === u || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  N.$$typeof === f)
              )
                B = N.propTypes;
              else return;
              if (B) {
                var J = q(N);
                ml(B, y.props, "prop", J, y);
              } else if (N.PropTypes !== void 0 && !cr) {
                cr = !0;
                var se = q(N);
                b(
                  "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                  se || "Unknown",
                );
              }
              typeof N.getDefaultProps == "function" &&
                !N.getDefaultProps.isReactClassApproved &&
                b(
                  "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                );
            }
          }
          function Rl(y) {
            {
              for (var N = Object.keys(y.props), B = 0; B < N.length; B++) {
                var J = N[B];
                if (J !== "children" && J !== "key") {
                  Ct(y),
                    b(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      J,
                    ),
                    Ct(null);
                  break;
                }
              }
              y.ref !== null &&
                (Ct(y),
                b("Invalid attribute `ref` supplied to `React.Fragment`."),
                Ct(null));
            }
          }
          function go(y, N, B, J, se, le) {
            {
              var oe = A(y);
              if (!oe) {
                var re = "";
                (y === void 0 ||
                  (typeof y == "object" &&
                    y !== null &&
                    Object.keys(y).length === 0)) &&
                  (re +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var Ae = wl(se);
                Ae ? (re += Ae) : (re += fo());
                var he;
                y === null
                  ? (he = "null")
                  : ar(y)
                  ? (he = "array")
                  : y !== void 0 && y.$$typeof === t
                  ? ((he = "<" + (q(y.type) || "Unknown") + " />"),
                    (re =
                      " Did you accidentally export a JSX literal instead of a component?"))
                  : (he = typeof y),
                  b(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    he,
                    re,
                  );
              }
              var ge = _l(y, N, B, se, le);
              if (ge == null) return ge;
              if (oe) {
                var Fe = N.children;
                if (Fe !== void 0)
                  if (J)
                    if (ar(Fe)) {
                      for (var xt = 0; xt < Fe.length; xt++) mo(Fe[xt], y);
                      Object.freeze && Object.freeze(Fe);
                    } else
                      b(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else mo(Fe, y);
              }
              return y === r ? Rl(ge) : Pl(ge), ge;
            }
          }
          function Ol(y, N, B) {
            return go(y, N, B, !0);
          }
          function Il(y, N, B) {
            return go(y, N, B, !1);
          }
          var Ml = Il,
            Fl = Ol;
          (zt.Fragment = r), (zt.jsx = Ml), (zt.jsxs = Fl);
        })()),
    zt
  );
}
process.env.NODE_ENV === "production"
  ? (Vr.exports = Gl())
  : (Vr.exports = Xl());
var F = Vr.exports;
const Zl = () => {
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
function Jl(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Ql(e) {
  return Jl(e) && "type" in e && typeof e.type == "string";
}
var fa = Symbol.for("immer-nothing"),
  bo = Symbol.for("immer-draftable"),
  Oe = Symbol.for("immer-state"),
  ec =
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
function Pe(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = ec[e],
      r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Ft = Object.getPrototypeOf;
function ot(e) {
  return !!e && !!e[Oe];
}
function Qe(e) {
  var t;
  return e
    ? da(e) ||
        Array.isArray(e) ||
        !!e[bo] ||
        !!((t = e.constructor) != null && t[bo]) ||
        Gn(e) ||
        Xn(e)
    : !1;
}
var tc = Object.prototype.constructor.toString();
function da(e) {
  if (!e || typeof e != "object") return !1;
  const t = Ft(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === tc;
}
function In(e, t) {
  Kn(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function Kn(e) {
  const t = e[Oe];
  return t ? t.type_ : Array.isArray(e) ? 1 : Gn(e) ? 2 : Xn(e) ? 3 : 0;
}
function kr(e, t) {
  return Kn(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function ha(e, t, n) {
  const r = Kn(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function nc(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Gn(e) {
  return e instanceof Map;
}
function Xn(e) {
  return e instanceof Set;
}
function ht(e) {
  return e.copy_ || e.base_;
}
function $r(e, t) {
  if (Gn(e)) return new Map(e);
  if (Xn(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && da(e))
    return Ft(e)
      ? { ...e }
      : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[Oe];
  let r = Reflect.ownKeys(n);
  for (let i = 0; i < r.length; i++) {
    const o = r[i],
      s = n[o];
    s.writable === !1 && ((s.writable = !0), (s.configurable = !0)),
      (s.get || s.set) &&
        (n[o] = {
          configurable: !0,
          writable: !0,
          // could live with !!desc.set as well here...
          enumerable: s.enumerable,
          value: e[o],
        });
  }
  return Object.create(Ft(e), n);
}
function pi(e, t = !1) {
  return (
    Zn(e) ||
      ot(e) ||
      !Qe(e) ||
      (Kn(e) > 1 && (e.set = e.add = e.clear = e.delete = rc),
      Object.freeze(e),
      t && Object.entries(e).forEach(([n, r]) => pi(r, !0))),
    e
  );
}
function rc() {
  Pe(2);
}
function Zn(e) {
  return Object.isFrozen(e);
}
var ic = {};
function bt(e) {
  const t = ic[e];
  return t || Pe(0, e), t;
}
var en;
function pa() {
  return en;
}
function oc(e, t) {
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
function To(e, t) {
  t &&
    (bt("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function Br(e) {
  Hr(e), e.drafts_.forEach(sc), (e.drafts_ = null);
}
function Hr(e) {
  e === en && (en = e.parent_);
}
function So(e) {
  return (en = oc(en, e));
}
function sc(e) {
  const t = e[Oe];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function Co(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[Oe].modified_ && (Br(t), Pe(4)),
        Qe(e) && ((e = Mn(t, e)), t.parent_ || Fn(t, e)),
        t.patches_ &&
          bt("Patches").generateReplacementPatches_(
            n[Oe].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = Mn(t, n, [])),
    Br(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== fa ? e : void 0
  );
}
function Mn(e, t, n) {
  if (Zn(t)) return t;
  const r = t[Oe];
  if (!r) return In(t, (i, o) => xo(e, r, t, i, o, n)), t;
  if (r.scope_ !== e) return t;
  if (!r.modified_) return Fn(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    (r.finalized_ = !0), r.scope_.unfinalizedDrafts_--;
    const i = r.copy_;
    let o = i,
      s = !1;
    r.type_ === 3 && ((o = new Set(i)), i.clear(), (s = !0)),
      In(o, (a, u) => xo(e, r, i, a, u, n, s)),
      Fn(e, i, !1),
      n &&
        e.patches_ &&
        bt("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_);
  }
  return r.copy_;
}
function xo(e, t, n, r, i, o, s) {
  if ((process.env.NODE_ENV !== "production" && i === n && Pe(5), ot(i))) {
    const a =
        o &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !kr(t.assigned_, r)
          ? o.concat(r)
          : void 0,
      u = Mn(e, i, a);
    if ((ha(n, r, u), ot(u))) e.canAutoFreeze_ = !1;
    else return;
  } else s && n.add(i);
  if (Qe(i) && !Zn(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    Mn(e, i),
      (!t || !t.scope_.parent_) &&
        typeof r != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(n, r) &&
        Fn(e, i);
  }
}
function Fn(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && pi(t, n);
}
function ac(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : pa(),
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
  let i = r,
    o = mi;
  n && ((i = [r]), (o = tn));
  const { revoke: s, proxy: a } = Proxy.revocable(i, o);
  return (r.draft_ = a), (r.revoke_ = s), a;
}
var mi = {
    get(e, t) {
      if (t === Oe) return e;
      const n = ht(e);
      if (!kr(n, t)) return uc(e, n, t);
      const r = n[t];
      return e.finalized_ || !Qe(r)
        ? r
        : r === dr(e.base_, t)
        ? (hr(e), (e.copy_[t] = zr(r, e)))
        : r;
    },
    has(e, t) {
      return t in ht(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(ht(e));
    },
    set(e, t, n) {
      const r = ma(ht(e), t);
      if (r != null && r.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const i = dr(ht(e), t),
          o = i == null ? void 0 : i[Oe];
        if (o && o.base_ === n)
          return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (nc(n, i) && (n !== void 0 || kr(e.base_, t))) return !0;
        hr(e), Ur(e);
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
        dr(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), hr(e), Ur(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(e, t) {
      const n = ht(e),
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
      Pe(11);
    },
    getPrototypeOf(e) {
      return Ft(e.base_);
    },
    setPrototypeOf() {
      Pe(12);
    },
  },
  tn = {};
In(mi, (e, t) => {
  tn[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
tn.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && Pe(13),
    tn.set.call(this, e, t, void 0)
  );
};
tn.set = function (e, t, n) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      Pe(14),
    mi.set.call(this, e[0], t, n, e[0])
  );
};
function dr(e, t) {
  const n = e[Oe];
  return (n ? ht(n) : e)[t];
}
function uc(e, t, n) {
  var i;
  const r = ma(t, n);
  return r
    ? "value" in r
      ? r.value
      : // This is a very special case, if the prop is a getter defined by the
      // prototype, we should invoke it with the draft as context!
      (i = r.get) == null
      ? void 0
      : i.call(e.draft_)
    : void 0;
}
function ma(e, t) {
  if (!(t in e)) return;
  let n = Ft(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = Ft(n);
  }
}
function Ur(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && Ur(e.parent_));
}
function hr(e) {
  e.copy_ || (e.copy_ = $r(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var lc = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, r) => {
        if (typeof t == "function" && typeof n != "function") {
          const o = n;
          n = t;
          const s = this;
          return function (u = o, ...c) {
            return s.produce(u, (l) => n.call(this, l, ...c));
          };
        }
        typeof n != "function" && Pe(6),
          r !== void 0 && typeof r != "function" && Pe(7);
        let i;
        if (Qe(t)) {
          const o = So(this),
            s = zr(t, void 0);
          let a = !0;
          try {
            (i = n(s)), (a = !1);
          } finally {
            a ? Br(o) : Hr(o);
          }
          return To(o, r), Co(i, o);
        } else if (!t || typeof t != "object") {
          if (
            ((i = n(t)),
            i === void 0 && (i = t),
            i === fa && (i = void 0),
            this.autoFreeze_ && pi(i, !0),
            r)
          ) {
            const o = [],
              s = [];
            bt("Patches").generateReplacementPatches_(t, i, o, s), r(o, s);
          }
          return i;
        } else Pe(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (s, ...a) => this.produceWithPatches(s, (u) => t(u, ...a));
        let r, i;
        return [
          this.produce(t, n, (s, a) => {
            (r = s), (i = a);
          }),
          r,
          i,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == "boolean" &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Qe(e) || Pe(8), ot(e) && (e = ga(e));
    const t = So(this),
      n = zr(e, void 0);
    return (n[Oe].isManual_ = !0), Hr(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[Oe];
    (!n || !n.isManual_) && Pe(9);
    const { scope_: r } = n;
    return To(r, t), Co(void 0, r);
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
    const r = bt("Patches").applyPatches_;
    return ot(e) ? r(e, t) : this.produce(e, (i) => r(i, t));
  }
};
function zr(e, t) {
  const n = Gn(e)
    ? bt("MapSet").proxyMap_(e, t)
    : Xn(e)
    ? bt("MapSet").proxySet_(e, t)
    : ac(e, t);
  return (t ? t.scope_ : pa()).drafts_.push(n), n;
}
function ga(e) {
  return ot(e) || Pe(10, e), ya(e);
}
function ya(e) {
  if (!Qe(e) || Zn(e)) return e;
  const t = e[Oe];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (n = $r(e, t.scope_.immer_.useStrictShallowCopy_));
  } else n = $r(e, !0);
  return (
    In(n, (r, i) => {
      ha(n, r, ya(i));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var Ie = new lc(),
  va = Ie.produce;
Ie.produceWithPatches.bind(Ie);
Ie.setAutoFreeze.bind(Ie);
Ie.setUseStrictShallowCopy.bind(Ie);
Ie.applyPatches.bind(Ie);
Ie.createDraft.bind(Ie);
Ie.finishDraft.bind(Ie);
var cc = (e, t, n) => {
    if (t.length === 1 && t[0] === n) {
      let r = !1;
      try {
        const i = {};
        e(i) === i && (r = !0);
      } catch {}
      if (r) {
        let i;
        try {
          throw new Error();
        } catch (o) {
          ({ stack: i } = o);
        }
        console.warn(
          `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
          { stack: i },
        );
      }
    }
  },
  fc = (e, t, n) => {
    const { memoize: r, memoizeOptions: i } = t,
      { inputSelectorResults: o, inputSelectorResultsCopy: s } = e,
      a = r(() => ({}), ...i);
    if (!(a.apply(null, o) === a.apply(null, s))) {
      let c;
      try {
        throw new Error();
      } catch (l) {
        ({ stack: c } = l);
      }
      console.warn(
        `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
        {
          arguments: n,
          firstInputs: o,
          secondInputs: s,
          stack: c,
        },
      );
    }
  },
  dc = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function hc(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function pc(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function mc(
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
var Ao = (e) => (Array.isArray(e) ? e : [e]);
function gc(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    mc(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function _o(e, t) {
  const n = [],
    { length: r } = e;
  for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
  return n;
}
var yc = (e, t) => {
    const { identityFunctionCheck: n, inputStabilityCheck: r } = {
      ...dc,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: cc,
      },
      inputStabilityCheck: {
        shouldRun: r === "always" || (r === "once" && e),
        run: fc,
      },
    };
  },
  vc = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Ec = typeof WeakRef < "u" ? WeakRef : vc,
  bc = 0,
  wo = 1;
function vn() {
  return {
    s: bc,
    v: void 0,
    o: null,
    p: null,
  };
}
function gi(e, t = {}) {
  let n = vn();
  const { resultEqualityCheck: r } = t;
  let i,
    o = 0;
  function s() {
    var f;
    let a = n;
    const { length: u } = arguments;
    for (let d = 0, h = u; d < h; d++) {
      const p = arguments[d];
      if (typeof p == "function" || (typeof p == "object" && p !== null)) {
        let m = a.o;
        m === null && (a.o = m = /* @__PURE__ */ new WeakMap());
        const g = m.get(p);
        g === void 0 ? ((a = vn()), m.set(p, a)) : (a = g);
      } else {
        let m = a.p;
        m === null && (a.p = m = /* @__PURE__ */ new Map());
        const g = m.get(p);
        g === void 0 ? ((a = vn()), m.set(p, a)) : (a = g);
      }
    }
    const c = a;
    let l;
    if (
      (a.s === wo ? (l = a.v) : ((l = e.apply(null, arguments)), o++),
      (c.s = wo),
      r)
    ) {
      const d =
        ((f = i == null ? void 0 : i.deref) == null ? void 0 : f.call(i)) ?? i;
      d != null && r(d, l) && ((l = d), o !== 0 && o--),
        (i =
          (typeof l == "object" && l !== null) || typeof l == "function"
            ? new Ec(l)
            : l);
    }
    return (c.v = l), l;
  }
  return (
    (s.clearCache = () => {
      (n = vn()), s.resetResultsCount();
    }),
    (s.resultsCount = () => o),
    (s.resetResultsCount = () => {
      o = 0;
    }),
    s
  );
}
function Ea(e, ...t) {
  const n =
      typeof e == "function"
        ? {
            memoize: e,
            memoizeOptions: t,
          }
        : e,
    r = (...i) => {
      let o = 0,
        s = 0,
        a,
        u = {},
        c = i.pop();
      typeof c == "object" && ((u = c), (c = i.pop())),
        hc(
          c,
          `createSelector expects an output function after the inputs, but received: [${typeof c}]`,
        );
      const l = {
          ...n,
          ...u,
        },
        {
          memoize: f,
          memoizeOptions: d = [],
          argsMemoize: h = gi,
          argsMemoizeOptions: p = [],
          devModeChecks: m = {},
        } = l,
        g = Ao(d),
        v = Ao(p),
        b = gc(i),
        E = f(
          function () {
            return o++, c.apply(null, arguments);
          },
          ...g,
        );
      let x = !0;
      const S = h(
        function () {
          s++;
          const I = _o(b, arguments);
          if (((a = E.apply(null, I)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: T, inputStabilityCheck: L } = yc(
              x,
              m,
            );
            if ((T.shouldRun && T.run(c, I, a), L.shouldRun)) {
              const A = _o(b, arguments);
              L.run(
                { inputSelectorResults: I, inputSelectorResultsCopy: A },
                { memoize: f, memoizeOptions: g },
                arguments,
              );
            }
            x && (x = !1);
          }
          return a;
        },
        ...v,
      );
      return Object.assign(S, {
        resultFunc: c,
        memoizedResultFunc: E,
        dependencies: b,
        dependencyRecomputations: () => s,
        resetDependencyRecomputations: () => {
          s = 0;
        },
        lastResult: () => a,
        recomputations: () => o,
        resetRecomputations: () => {
          o = 0;
        },
        memoize: f,
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
var Tc = /* @__PURE__ */ Ea(gi),
  Sc = Object.assign(
    (e, t = Tc) => {
      pc(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const n = Object.keys(e),
        r = n.map((o) => e[o]);
      return t(r, (...o) => o.reduce((s, a, u) => ((s[n[u]] = a), s), {}));
    },
    { withTypes: () => Sc },
  ),
  Cc = (...e) => {
    const t = Ea(...e),
      n = Object.assign(
        (...r) => {
          const i = t(...r),
            o = (s, ...a) => i(ot(s) ? ga(s) : s, ...a);
          return Object.assign(o, i), o;
        },
        {
          withTypes: () => n,
        },
      );
    return n;
  };
Cc(gi);
function Nt(e, t) {
  function n(...r) {
    if (t) {
      let i = t(...r);
      if (!i)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? me(0)
            : "prepareAction did not return an object",
        );
      return {
        type: e,
        payload: i.payload,
        ...("meta" in i && {
          meta: i.meta,
        }),
        ...("error" in i && {
          error: i.error,
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
    (n.match = (r) => Ql(r) && r.type === e),
    n
  );
}
function Do(e) {
  return Qe(e) ? va(e, () => {}) : e;
}
function Po(e, t, n) {
  if (e.has(t)) {
    let i = e.get(t);
    return n.update && ((i = n.update(i, t, e)), e.set(t, i)), i;
  }
  if (!n.insert)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? me(10)
        : "No insert provided for key not already in map",
    );
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
process.env.NODE_ENV;
function ba(e) {
  const t = {},
    n = [];
  let r;
  const i = {
    addCase(o, s) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? me(26)
              : "`builder.addCase` should only be called before calling `builder.addMatcher`",
          );
        if (r)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? me(27)
              : "`builder.addCase` should only be called before calling `builder.addDefaultCase`",
          );
      }
      const a = typeof o == "string" ? o : o.type;
      if (!a)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? me(28)
            : "`builder.addCase` cannot be called with an empty action type",
        );
      if (a in t)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? me(29)
            : `\`builder.addCase\` cannot be called with two reducers for the same action type '${a}'`,
        );
      return (t[a] = s), i;
    },
    addMatcher(o, s) {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? me(30)
            : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`",
        );
      return (
        n.push({
          matcher: o,
          reducer: s,
        }),
        i
      );
    },
    addDefaultCase(o) {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? me(31)
            : "`builder.addDefaultCase` can only be called once",
        );
      return (r = o), i;
    },
  };
  return e(i), [t, n, r];
}
function xc(e) {
  return typeof e == "function";
}
function Ac(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? me(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [n, r, i] = ba(t),
    o;
  if (xc(e)) o = () => Do(e());
  else {
    const a = Do(e);
    o = () => a;
  }
  function s(a = o(), u) {
    let c = [
      n[u.type],
      ...r.filter(({ matcher: l }) => l(u)).map(({ reducer: l }) => l),
    ];
    return (
      c.filter((l) => !!l).length === 0 && (c = [i]),
      c.reduce((l, f) => {
        if (f)
          if (ot(l)) {
            const h = f(l, u);
            return h === void 0 ? l : h;
          } else {
            if (Qe(l)) return va(l, (d) => f(d, u));
            {
              const d = f(l, u);
              if (d === void 0) {
                if (l === null) return l;
                throw new Error(
                  process.env.NODE_ENV === "production"
                    ? me(9)
                    : "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return d;
            }
          }
        return l;
      }, a)
    );
  }
  return (s.getInitialState = o), s;
}
var _c = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  wc = (e = 21) => {
    let t = "",
      n = e;
    for (; n--; ) t += _c[(Math.random() * 64) | 0];
    return t;
  },
  Dc = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Pc(e, t) {
  return `${e}/${t}`;
}
function Rc({ creators: e } = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Dc];
  return function (i) {
    const { name: o, reducerPath: s = o } = i;
    if (!o)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? me(11)
          : "`name` is a required option for createSlice",
      );
    typeof process < "u" &&
      process.env.NODE_ENV === "development" &&
      i.initialState === void 0 &&
      console.error(
        "You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`",
      );
    const a =
        (typeof i.reducers == "function" ? i.reducers(Mc()) : i.reducers) || {},
      u = Object.keys(a),
      c = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      l = {
        addCase(E, x) {
          const S = typeof E == "string" ? E : E.type;
          if (!S)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? me(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (S in c.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? me(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  S,
            );
          return (c.sliceCaseReducersByType[S] = x), l;
        },
        addMatcher(E, x) {
          return (
            c.sliceMatchers.push({
              matcher: E,
              reducer: x,
            }),
            l
          );
        },
        exposeAction(E, x) {
          return (c.actionCreators[E] = x), l;
        },
        exposeCaseReducer(E, x) {
          return (c.sliceCaseReducersByName[E] = x), l;
        },
      };
    u.forEach((E) => {
      const x = a[E],
        S = {
          reducerName: E,
          type: Pc(o, E),
          createNotation: typeof i.reducers == "function",
        };
      Nc(x) ? Lc(S, x, l, t) : Fc(S, x, l);
    });
    function f() {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof i.extraReducers == "object"
      )
        throw new Error(
          process.env.NODE_ENV === "production"
            ? me(14)
            : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
        );
      const [E = {}, x = [], S = void 0] =
          typeof i.extraReducers == "function"
            ? ba(i.extraReducers)
            : [i.extraReducers],
        P = {
          ...E,
          ...c.sliceCaseReducersByType,
        };
      return Ac(i.initialState, (I) => {
        for (let T in P) I.addCase(T, P[T]);
        for (let T of c.sliceMatchers) I.addMatcher(T.matcher, T.reducer);
        for (let T of x) I.addMatcher(T.matcher, T.reducer);
        S && I.addDefaultCase(S);
      });
    }
    const d = (E) => E,
      h = /* @__PURE__ */ new Map();
    let p;
    function m(E, x) {
      return p || (p = f()), p(E, x);
    }
    function g() {
      return p || (p = f()), p.getInitialState();
    }
    function v(E, x = !1) {
      function S(I) {
        let T = I[E];
        if (typeof T > "u") {
          if (x) T = g();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? me(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return T;
      }
      function P(I = d) {
        const T = Po(h, x, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return Po(T, I, {
          insert: () => {
            const L = {};
            for (const [A, j] of Object.entries(i.selectors ?? {}))
              L[A] = Oc(j, I, g, x);
            return L;
          },
        });
      }
      return {
        reducerPath: E,
        getSelectors: P,
        get selectors() {
          return P(S);
        },
        selectSlice: S,
      };
    }
    const b = {
      name: o,
      reducer: m,
      actions: c.actionCreators,
      caseReducers: c.sliceCaseReducersByName,
      getInitialState: g,
      ...v(s),
      injectInto(E, { reducerPath: x, ...S } = {}) {
        const P = x ?? s;
        return (
          E.inject(
            {
              reducerPath: P,
              reducer: m,
            },
            S,
          ),
          {
            ...b,
            ...v(P, !0),
          }
        );
      },
    };
    return b;
  };
}
function Oc(e, t, n, r) {
  function i(o, ...s) {
    let a = t(o);
    if (typeof a > "u") {
      if (r) a = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(
          process.env.NODE_ENV === "production"
            ? me(16)
            : "selectState returned undefined for an uninjected slice reducer",
        );
    }
    return e(a, ...s);
  }
  return (i.unwrapped = e), i;
}
var Ic = /* @__PURE__ */ Rc();
function Mc() {
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
function Fc({ type: e, reducerName: t, createNotation: n }, r, i) {
  let o, s;
  if ("reducer" in r) {
    if (n && !jc(r))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? me(17)
          : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.",
      );
    (o = r.reducer), (s = r.prepare);
  } else o = r;
  i.addCase(e, o)
    .exposeCaseReducer(t, o)
    .exposeAction(t, s ? Nt(e, s) : Nt(e));
}
function Nc(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function jc(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Lc({ type: e, reducerName: t }, n, r, i) {
  if (!i)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? me(18)
        : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.",
    );
  const {
      payloadCreator: o,
      fulfilled: s,
      pending: a,
      rejected: u,
      settled: c,
      options: l,
    } = n,
    f = i(e, o, l);
  r.exposeAction(t, f),
    s && r.addCase(f.fulfilled, s),
    a && r.addCase(f.pending, a),
    u && r.addCase(f.rejected, u),
    c && r.addMatcher(f.settled, c),
    r.exposeCaseReducer(t, {
      fulfilled: s || En,
      pending: a || En,
      rejected: u || En,
      settled: c || En,
    });
}
function En() {}
var Vc = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? me(32)
          : `${t} is not a function`,
      );
  },
  yi = "listenerMiddleware",
  kc = (e) => {
    let { type: t, actionCreator: n, matcher: r, predicate: i, effect: o } = e;
    if (t) i = Nt(t).match;
    else if (n) (t = n.type), (i = n.match);
    else if (r) i = r;
    else if (!i)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? me(21)
          : "Creating or removing a listener requires one of the known fields for matching an action",
      );
    return (
      Vc(o, "options.listener"),
      {
        predicate: i,
        type: t,
        effect: o,
      }
    );
  },
  $c = Object.assign(
    (e) => {
      const { type: t, predicate: n, effect: r } = kc(e);
      return {
        id: wc(),
        effect: r,
        type: t,
        predicate: n,
        pending: /* @__PURE__ */ new Set(),
        unsubscribe: () => {
          throw new Error(
            process.env.NODE_ENV === "production"
              ? me(22)
              : "Unsubscribe not initialized",
          );
        },
      };
    },
    {
      withTypes: () => $c,
    },
  ),
  Bc = Object.assign(Nt(`${yi}/add`), {
    withTypes: () => Bc,
  });
Nt(`${yi}/removeAll`);
var Hc = Object.assign(Nt(`${yi}/remove`), {
  withTypes: () => Hc,
});
function me(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Uc = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: Zl(),
    codeblockLoaded: !1,
  },
  Nn = Ic({
    name: "appState",
    initialState: Uc,
    reducers: {
      setDocsAppRendered: (e, t) => {
        e.docsAppRendered = t.payload;
      },
      updateCurrentPage: (e, t) => {
        e.currentPage = t.payload;
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
      setUsers: (e, t) => {
        var n;
        return (n = t.payload) != null && n.length
          ? {
              ...e,
              users: t.payload.reduce((r, i) => ((r[i.id] = i), r), {}),
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
        e.newConversation = { ...e.newConversation, ...t.payload };
      },
      resetNewConversation: (e) => {
        e.newConversation = void 0;
      },
      setConversations: (e, t) => {
        t.payload &&
          (e.conversations = t.payload.reduce(
            (n, r) => ((n[r.conversation_group_id] = r), n),
            {},
          ));
      },
    },
  }),
  {
    setCurrentUserId: gv,
    setShareId: yv,
    updateSelectedConversationId: vi,
    updateRightPanelState: Ei,
    setUsers: zc,
    setConversations: bi,
    resetNewConversation: Ta,
    updateNewConversation: Sa,
    upsertConversation: vv,
    setDocsAppRendered: Ev,
    updateCurrentPage: bv,
    updateCodeblockLoaded: Tv,
    resolveConversationGroup: Wc,
  } = Nn.actions,
  Jn = et({
    state: Nn.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  Yc = ({ children: e, shareId: t, userId: n, conversationGroupId: r }) => {
    const [i, o] = Nl(Nn.reducer, {
        ...Nn.getInitialState(),
        shareId: t,
        currentUserId: n,
        selectedConversationId: r,
        isRightPanelOpen: !!r,
      }),
      s = qe((u) => u(i), [i]),
      a = Je(
        () => ({
          state: i,
          dispatch: o,
          getValue: s,
        }),
        [i, o, s],
      );
    return /* @__PURE__ */ F.jsx(Jn.Provider, { value: a, children: e });
  },
  qc = Yc,
  Kc = () => ye(Jn),
  fe = (e) => {
    const { getValue: t } = ye(Jn);
    return t(e);
  },
  Ve = () => {
    const { dispatch: e } = ye(Jn);
    return e;
  },
  Ti = et({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  Qn = et({}),
  er = et(null),
  Si = typeof document < "u",
  Ci = Si ? jl : De,
  Ca = et({ strict: !1 }),
  xi = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  Gc = "framerAppearId",
  xa = "data-" + xi(Gc),
  Xc = {
    skipAnimations: !1,
    useManualTiming: !1,
  };
class Ro {
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
function Zc(e) {
  let t = new Ro(),
    n = new Ro(),
    r = 0,
    i = !1,
    o = !1;
  const s = /* @__PURE__ */ new WeakSet(),
    a = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (u, c = !1, l = !1) => {
        const f = l && i,
          d = f ? t : n;
        return c && s.add(u), d.add(u) && f && i && (r = t.order.length), u;
      },
      /**
       * Cancel the provided callback from running on the next frame.
       */
      cancel: (u) => {
        n.remove(u), s.delete(u);
      },
      /**
       * Execute all schedule callbacks.
       */
      process: (u) => {
        if (i) {
          o = !0;
          return;
        }
        if (((i = !0), ([t, n] = [n, t]), n.clear(), (r = t.order.length), r))
          for (let c = 0; c < r; c++) {
            const l = t.order[c];
            s.has(l) && (a.schedule(l), e()), l(u);
          }
        (i = !1), o && ((o = !1), a.process(u));
      },
    };
  return a;
}
const bn = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
    // Compute
  ],
  Jc = 40;
function Aa(e, t) {
  let n = !1,
    r = !0;
  const i = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    o = bn.reduce((f, d) => ((f[d] = Zc(() => (n = !0))), f), {}),
    s = (f) => {
      o[f].process(i);
    },
    a = () => {
      const f = performance.now();
      (n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(f - i.timestamp, Jc), 1)),
        (i.timestamp = f),
        (i.isProcessing = !0),
        bn.forEach(s),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(a));
    },
    u = () => {
      (n = !0), (r = !0), i.isProcessing || e(a);
    };
  return {
    schedule: bn.reduce((f, d) => {
      const h = o[d];
      return (f[d] = (p, m = !1, g = !1) => (n || u(), h.schedule(p, m, g))), f;
    }, {}),
    cancel: (f) => bn.forEach((d) => o[d].cancel(f)),
    state: i,
    steps: o,
  };
}
const { schedule: Ai, cancel: Sv } = Aa(queueMicrotask, !1);
function Qc(e, t, n, r) {
  const { visualElement: i } = ye(Qn),
    o = ye(Ca),
    s = ye(er),
    a = ye(Ti).reducedMotion,
    u = Re();
  (r = r || o.renderer),
    !u.current &&
      r &&
      (u.current = r(e, {
        visualState: t,
        parent: i,
        props: n,
        presenceContext: s,
        blockInitialAnimation: s ? s.initial === !1 : !1,
        reducedMotionConfig: a,
      }));
  const c = u.current;
  ua(() => {
    c && c.update(n, s);
  });
  const l = Re(!!(n[xa] && !window.HandoffComplete));
  return (
    Ci(() => {
      c &&
        (Ai.postRender(c.render),
        l.current && c.animationState && c.animationState.animateChanges());
    }),
    De(() => {
      c &&
        (c.updateFeatures(),
        !l.current && c.animationState && c.animationState.animateChanges(),
        l.current && ((l.current = !1), (window.HandoffComplete = !0)));
    }),
    c
  );
}
function wt(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function ef(e, t, n) {
  return qe(
    (r) => {
      r && e.mount && e.mount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == "function" ? n(r) : wt(n) && (n.current = r));
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [t],
  );
}
function nn(e) {
  return typeof e == "string" || Array.isArray(e);
}
function tr(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const _i = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  wi = ["initial", ..._i];
function nr(e) {
  return tr(e.animate) || wi.some((t) => nn(e[t]));
}
function _a(e) {
  return !!(nr(e) || e.variants);
}
function tf(e, t) {
  if (nr(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || nn(n) ? n : void 0,
      animate: nn(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function nf(e) {
  const { initial: t, animate: n } = tf(e, ye(Qn));
  return Je(() => ({ initial: t, animate: n }), [Oo(t), Oo(n)]);
}
function Oo(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Io = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  rn = {};
for (const e in Io)
  rn[e] = {
    isEnabled: (t) => Io[e].some((n) => !!t[n]),
  };
function rf(e) {
  for (const t in e)
    rn[t] = {
      ...rn[t],
      ...e[t],
    };
}
const Di = et({}),
  wa = et({}),
  of = Symbol.for("motionComponentSymbol");
function sf({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  e && rf(e);
  function o(a, u) {
    let c;
    const l = {
        ...ye(Ti),
        ...a,
        layoutId: af(a),
      },
      { isStatic: f } = l,
      d = nf(a),
      h = r(a, f);
    if (!f && Si) {
      d.visualElement = Qc(i, h, l, t);
      const p = ye(wa),
        m = ye(Ca).strict;
      d.visualElement &&
        (c = d.visualElement.loadFeatures(
          // Note: Pass the full new combined props to correctly re-render dynamic feature components.
          l,
          m,
          e,
          p,
        ));
    }
    return we.createElement(
      Qn.Provider,
      { value: d },
      c && d.visualElement
        ? we.createElement(c, { visualElement: d.visualElement, ...l })
        : null,
      n(i, a, ef(h, d.visualElement, u), h, f, d.visualElement),
    );
  }
  const s = la(o);
  return (s[of] = i), s;
}
function af({ layoutId: e }) {
  const t = ye(Di).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function uf(e) {
  function t(r, i = {}) {
    return sf(e(r, i));
  }
  if (typeof Proxy > "u") return t;
  const n = /* @__PURE__ */ new Map();
  return new Proxy(t, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, i) => (n.has(i) || n.set(i, t(i)), n.get(i)),
  });
}
const lf = [
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
  "view",
];
function Pi(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */ || e.includes("-")
      ? !1
      : /**
         * If it's in our list of lowercase SVG tags, it's an SVG component
         */
        !!(
          lf.indexOf(e) > -1 /**
           * If it contains a capital letter, it's an SVG component
           */ || /[A-Z]/u.test(e)
        )
  );
}
const jn = {};
function cf(e) {
  Object.assign(jn, e);
}
const cn = [
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
    "skewY",
  ],
  Tt = new Set(cn);
function Da(e, { layout: t, layoutId: n }) {
  return (
    Tt.has(e) ||
    e.startsWith("origin") ||
    ((t || n !== void 0) && (!!jn[e] || e === "opacity"))
  );
}
const xe = (e) => !!(e && e.getVelocity),
  ff = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  df = cn.length;
function hf(
  e,
  { enableHardwareAcceleration: t = !0, allowTransformNone: n = !0 },
  r,
  i,
) {
  let o = "";
  for (let s = 0; s < df; s++) {
    const a = cn[s];
    if (e[a] !== void 0) {
      const u = ff[a] || a;
      o += `${u}(${e[a]}) `;
    }
  }
  return (
    t && !e.z && (o += "translateZ(0)"),
    (o = o.trim()),
    i ? (o = i(e, r ? "" : o)) : n && r && (o = "none"),
    o
  );
}
const Pa = (e) => (t) => typeof t == "string" && t.startsWith(e),
  Ra = Pa("--"),
  pf = Pa("var(--"),
  Ri = (e) => (pf(e) ? mf.test(e.split("/*")[0].trim()) : !1),
  mf =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  gf = (e, t) => (t && typeof e == "number" ? t.transform(e) : e),
  st = (e, t, n) => (n > t ? t : n < e ? e : n),
  Vt = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  Gt = {
    ...Vt,
    transform: (e) => st(0, 1, e),
  },
  Tn = {
    ...Vt,
    default: 1,
  },
  Xt = (e) => Math.round(e * 1e5) / 1e5,
  Oi = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
  yf =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
  vf =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function fn(e) {
  return typeof e == "string";
}
const dn = (e) => ({
    test: (t) => fn(t) && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  tt = dn("deg"),
  He = dn("%"),
  Y = dn("px"),
  Ef = dn("vh"),
  bf = dn("vw"),
  Mo = {
    ...He,
    parse: (e) => He.parse(e) / 100,
    transform: (e) => He.transform(e * 100),
  },
  Fo = {
    ...Vt,
    transform: Math.round,
  },
  Oa = {
    // Border props
    borderWidth: Y,
    borderTopWidth: Y,
    borderRightWidth: Y,
    borderBottomWidth: Y,
    borderLeftWidth: Y,
    borderRadius: Y,
    radius: Y,
    borderTopLeftRadius: Y,
    borderTopRightRadius: Y,
    borderBottomRightRadius: Y,
    borderBottomLeftRadius: Y,
    // Positioning props
    width: Y,
    maxWidth: Y,
    height: Y,
    maxHeight: Y,
    size: Y,
    top: Y,
    right: Y,
    bottom: Y,
    left: Y,
    // Spacing props
    padding: Y,
    paddingTop: Y,
    paddingRight: Y,
    paddingBottom: Y,
    paddingLeft: Y,
    margin: Y,
    marginTop: Y,
    marginRight: Y,
    marginBottom: Y,
    marginLeft: Y,
    // Transform props
    rotate: tt,
    rotateX: tt,
    rotateY: tt,
    rotateZ: tt,
    scale: Tn,
    scaleX: Tn,
    scaleY: Tn,
    scaleZ: Tn,
    skew: tt,
    skewX: tt,
    skewY: tt,
    distance: Y,
    translateX: Y,
    translateY: Y,
    translateZ: Y,
    x: Y,
    y: Y,
    z: Y,
    perspective: Y,
    transformPerspective: Y,
    opacity: Gt,
    originX: Mo,
    originY: Mo,
    originZ: Y,
    // Misc
    zIndex: Fo,
    backgroundPositionX: Y,
    backgroundPositionY: Y,
    // SVG
    fillOpacity: Gt,
    strokeOpacity: Gt,
    numOctaves: Fo,
  };
function Ii(e, t, n, r) {
  const { style: i, vars: o, transform: s, transformOrigin: a } = e;
  let u = !1,
    c = !1,
    l = !0;
  for (const f in t) {
    const d = t[f];
    if (Ra(f)) {
      o[f] = d;
      continue;
    }
    const h = Oa[f],
      p = gf(d, h);
    if (Tt.has(f)) {
      if (((u = !0), (s[f] = p), !l)) continue;
      d !== (h.default || 0) && (l = !1);
    } else f.startsWith("origin") ? ((c = !0), (a[f] = p)) : (i[f] = p);
  }
  if (
    (t.transform ||
      (u || r
        ? (i.transform = hf(e.transform, n, l, r))
        : i.transform && (i.transform = "none")),
    c)
  ) {
    const { originX: f = "50%", originY: d = "50%", originZ: h = 0 } = a;
    i.transformOrigin = `${f} ${d} ${h}`;
  }
}
const Mi = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {},
});
function Ia(e, t, n) {
  for (const r in t) !xe(t[r]) && !Da(r, n) && (e[r] = t[r]);
}
function Tf({ transformTemplate: e }, t, n) {
  return Je(() => {
    const r = Mi();
    return (
      Ii(r, t, { enableHardwareAcceleration: !n }, e),
      Object.assign({}, r.vars, r.style)
    );
  }, [t]);
}
function Sf(e, t, n) {
  const r = e.style || {},
    i = {};
  return Ia(i, r, e), Object.assign(i, Tf(e, t, n)), i;
}
function Cf(e, t, n) {
  const r = {},
    i = Sf(e, t, n);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
      (i.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (r.tabIndex = 0),
    (r.style = i),
    r
  );
}
const xf = /* @__PURE__ */ new Set([
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
  "viewport",
]);
function Ln(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    xf.has(e)
  );
}
let Ma = (e) => !Ln(e);
function Af(e) {
  e && (Ma = (t) => (t.startsWith("on") ? !Ln(t) : e(t)));
}
try {
  Af(require("@emotion/is-prop-valid").default);
} catch {}
function _f(e, t, n) {
  const r = {};
  for (const i in e)
    (i === "values" && typeof e.values == "object") ||
      ((Ma(i) ||
        (n === !0 && Ln(i)) ||
        (!t && !Ln(i)) || // If trying to use native HTML drag events, forward drag listeners
        (e.draggable && i.startsWith("onDrag"))) &&
        (r[i] = e[i]));
  return r;
}
function No(e, t, n) {
  return typeof e == "string" ? e : Y.transform(t + n * e);
}
function wf(e, t, n) {
  const r = No(t, e.x, e.width),
    i = No(n, e.y, e.height);
  return `${r} ${i}`;
}
const Df = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
  },
  Pf = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
  };
function Rf(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const o = i ? Df : Pf;
  e[o.offset] = Y.transform(-r);
  const s = Y.transform(t),
    a = Y.transform(n);
  e[o.array] = `${s} ${a}`;
}
function Fi(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: o,
    pathLength: s,
    pathSpacing: a = 1,
    pathOffset: u = 0,
    // This is object creation, which we try to avoid per-frame.
    ...c
  },
  l,
  f,
  d,
) {
  if ((Ii(e, c, l, d), f)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: h, style: p, dimensions: m } = e;
  h.transform && (m && (p.transform = h.transform), delete h.transform),
    m &&
      (i !== void 0 || o !== void 0 || p.transform) &&
      (p.transformOrigin = wf(
        m,
        i !== void 0 ? i : 0.5,
        o !== void 0 ? o : 0.5,
      )),
    t !== void 0 && (h.x = t),
    n !== void 0 && (h.y = n),
    r !== void 0 && (h.scale = r),
    s !== void 0 && Rf(h, s, a, u, !1);
}
const Fa = () => ({
    ...Mi(),
    attrs: {},
  }),
  Ni = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function Of(e, t, n, r) {
  const i = Je(() => {
    const o = Fa();
    return (
      Fi(o, t, { enableHardwareAcceleration: !1 }, Ni(r), e.transformTemplate),
      {
        ...o.attrs,
        style: { ...o.style },
      }
    );
  }, [t]);
  if (e.style) {
    const o = {};
    Ia(o, e.style, e), (i.style = { ...o, ...i.style });
  }
  return i;
}
function If(e = !1) {
  return (n, r, i, { latestValues: o }, s) => {
    const u = (Pi(n) ? Of : Cf)(r, o, s, n),
      c = _f(r, typeof n == "string", e),
      l = n !== Ll ? { ...c, ...u, ref: i } : {},
      { children: f } = r,
      d = Je(() => (xe(f) ? f.get() : f), [f]);
    return Lr(n, {
      ...l,
      children: d,
    });
  };
}
function Na(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const o in n) e.style.setProperty(o, n[o]);
}
const ja = /* @__PURE__ */ new Set([
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
  "lengthAdjust",
]);
function La(e, t, n, r) {
  Na(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(ja.has(i) ? i : xi(i), t.attrs[i]);
}
function ji(e, t) {
  const { style: n } = e,
    r = {};
  for (const i in n)
    (xe(n[i]) || (t.style && xe(t.style[i])) || Da(i, e)) && (r[i] = n[i]);
  return r;
}
function Va(e, t) {
  const n = ji(e, t);
  for (const r in e)
    if (xe(e[r]) || xe(t[r])) {
      const i =
        cn.indexOf(r) !== -1
          ? "attr" + r.charAt(0).toUpperCase() + r.substring(1)
          : r;
      n[i] = e[r];
    }
  return n;
}
function Li(e, t, n, r = {}, i = {}) {
  return (
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    t
  );
}
function ka(e) {
  const t = Re(null);
  return t.current === null && (t.current = e()), t.current;
}
const Wr = (e) => Array.isArray(e),
  Mf = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  Ff = (e) => (Wr(e) ? e[e.length - 1] || 0 : e);
function _n(e) {
  const t = xe(e) ? e.get() : e;
  return Mf(t) ? t.toValue() : t;
}
function Nf(
  { scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n },
  r,
  i,
  o,
) {
  const s = {
    latestValues: jf(r, i, o, e),
    renderState: t(),
  };
  return n && (s.mount = (a) => n(r, a, s)), s;
}
const $a = (e) => (t, n) => {
  const r = ye(Qn),
    i = ye(er),
    o = () => Nf(e, t, r, i);
  return n ? o() : ka(o);
};
function jf(e, t, n, r) {
  const i = {},
    o = r(e, {});
  for (const d in o) i[d] = _n(o[d]);
  let { initial: s, animate: a } = e;
  const u = nr(e),
    c = _a(e);
  t &&
    c &&
    !u &&
    e.inherit !== !1 &&
    (s === void 0 && (s = t.initial), a === void 0 && (a = t.animate));
  let l = n ? n.initial === !1 : !1;
  l = l || s === !1;
  const f = l ? a : s;
  return (
    f &&
      typeof f != "boolean" &&
      !tr(f) &&
      (Array.isArray(f) ? f : [f]).forEach((h) => {
        const p = Li(e, h);
        if (!p) return;
        const { transitionEnd: m, transition: g, ...v } = p;
        for (const b in v) {
          let E = v[b];
          if (Array.isArray(E)) {
            const x = l ? E.length - 1 : 0;
            E = E[x];
          }
          E !== null && (i[b] = E);
        }
        for (const b in m) i[b] = m[b];
      }),
    i
  );
}
const Se = (e) => e,
  {
    schedule: Ee,
    cancel: at,
    state: Te,
    steps: pr,
  } = Aa(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Se, !0),
  Lf = {
    useVisualState: $a({
      scrapeMotionValuesFromProps: Va,
      createRenderState: Fa,
      onMount: (e, t, { renderState: n, latestValues: r }) => {
        Ee.read(() => {
          try {
            n.dimensions =
              typeof t.getBBox == "function"
                ? t.getBBox()
                : t.getBoundingClientRect();
          } catch {
            n.dimensions = {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            };
          }
        }),
          Ee.render(() => {
            Fi(
              n,
              r,
              { enableHardwareAcceleration: !1 },
              Ni(t.tagName),
              e.transformTemplate,
            ),
              La(t, n);
          });
      },
    }),
  },
  Vf = {
    useVisualState: $a({
      scrapeMotionValuesFromProps: ji,
      createRenderState: Mi,
    }),
  };
function kf(e, { forwardMotionProps: t = !1 }, n, r) {
  return {
    ...(Pi(e) ? Lf : Vf),
    preloadedFeatures: n,
    useRender: If(t),
    createVisualElement: r,
    Component: e,
  };
}
function Ye(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const Ba = (e) =>
  e.pointerType === "mouse"
    ? typeof e.button != "number" || e.button <= 0
    : e.isPrimary !== !1;
function rr(e, t = "page") {
  return {
    point: {
      x: e[t + "X"],
      y: e[t + "Y"],
    },
  };
}
const $f = (e) => (t) => Ba(t) && e(t, rr(t));
function Ke(e, t, n, r) {
  return Ye(e, t, $f(n), r);
}
const Bf = (e, t) => (n) => t(e(n)),
  Ge = (...e) => e.reduce(Bf);
function Ha(e) {
  let t = null;
  return () => {
    const n = () => {
      t = null;
    };
    return t === null ? ((t = e), n) : !1;
  };
}
const jo = Ha("dragHorizontal"),
  Lo = Ha("dragVertical");
function Ua(e) {
  let t = !1;
  if (e === "y") t = Lo();
  else if (e === "x") t = jo();
  else {
    const n = jo(),
      r = Lo();
    n && r
      ? (t = () => {
          n(), r();
        })
      : (n && n(), r && r());
  }
  return t;
}
function za() {
  const e = Ua(!0);
  return e ? (e(), !1) : !0;
}
class ct {
  constructor(t) {
    (this.isMounted = !1), (this.node = t);
  }
  update() {}
}
function Vo(e, t) {
  const n = "pointer" + (t ? "enter" : "leave"),
    r = "onHover" + (t ? "Start" : "End"),
    i = (o, s) => {
      if (o.pointerType === "touch" || za()) return;
      const a = e.getProps();
      e.animationState &&
        a.whileHover &&
        e.animationState.setActive("whileHover", t),
        a[r] && a[r](o, s);
    };
  return Ke(e.current, n, i, {
    passive: !e.getProps()[r],
  });
}
class Hf extends ct {
  mount() {
    this.unmount = Ge(Vo(this.node, !0), Vo(this.node, !1));
  }
  unmount() {}
}
class Uf extends ct {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Ge(
      Ye(this.node.current, "focus", () => this.onFocus()),
      Ye(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
const Wa = (e, t) => (t ? (e === t ? !0 : Wa(e, t.parentElement)) : !1);
function mr(e, t) {
  if (!t) return;
  const n = new PointerEvent("pointer" + e);
  t(n, rr(n));
}
class zf extends ct {
  constructor() {
    super(...arguments),
      (this.removeStartListeners = Se),
      (this.removeEndListeners = Se),
      (this.removeAccessibleListeners = Se),
      (this.startPointerPress = (t, n) => {
        if (this.isPressing) return;
        this.removeEndListeners();
        const r = this.node.getProps(),
          o = Ke(
            window,
            "pointerup",
            (a, u) => {
              if (!this.checkPressEnd()) return;
              const {
                onTap: c,
                onTapCancel: l,
                globalTapTarget: f,
              } = this.node.getProps();
              !f && !Wa(this.node.current, a.target)
                ? l && l(a, u)
                : c && c(a, u);
            },
            { passive: !(r.onTap || r.onPointerUp) },
          ),
          s = Ke(window, "pointercancel", (a, u) => this.cancelPress(a, u), {
            passive: !(r.onTapCancel || r.onPointerCancel),
          });
        (this.removeEndListeners = Ge(o, s)), this.startPress(t, n);
      }),
      (this.startAccessiblePress = () => {
        const t = (o) => {
            if (o.key !== "Enter" || this.isPressing) return;
            const s = (a) => {
              a.key !== "Enter" ||
                !this.checkPressEnd() ||
                mr("up", (u, c) => {
                  const { onTap: l } = this.node.getProps();
                  l && l(u, c);
                });
            };
            this.removeEndListeners(),
              (this.removeEndListeners = Ye(this.node.current, "keyup", s)),
              mr("down", (a, u) => {
                this.startPress(a, u);
              });
          },
          n = Ye(this.node.current, "keydown", t),
          r = () => {
            this.isPressing && mr("cancel", (o, s) => this.cancelPress(o, s));
          },
          i = Ye(this.node.current, "blur", r);
        this.removeAccessibleListeners = Ge(n, i);
      });
  }
  startPress(t, n) {
    this.isPressing = !0;
    const { onTapStart: r, whileTap: i } = this.node.getProps();
    i &&
      this.node.animationState &&
      this.node.animationState.setActive("whileTap", !0),
      r && r(t, n);
  }
  checkPressEnd() {
    return (
      this.removeEndListeners(),
      (this.isPressing = !1),
      this.node.getProps().whileTap &&
        this.node.animationState &&
        this.node.animationState.setActive("whileTap", !1),
      !za()
    );
  }
  cancelPress(t, n) {
    if (!this.checkPressEnd()) return;
    const { onTapCancel: r } = this.node.getProps();
    r && r(t, n);
  }
  mount() {
    const t = this.node.getProps(),
      n = Ke(
        t.globalTapTarget ? window : this.node.current,
        "pointerdown",
        this.startPointerPress,
        { passive: !(t.onTapStart || t.onPointerStart) },
      ),
      r = Ye(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = Ge(n, r);
  }
  unmount() {
    this.removeStartListeners(),
      this.removeEndListeners(),
      this.removeAccessibleListeners();
  }
}
const Yr = /* @__PURE__ */ new WeakMap(),
  gr = /* @__PURE__ */ new WeakMap(),
  Wf = (e) => {
    const t = Yr.get(e.target);
    t && t(e);
  },
  Yf = (e) => {
    e.forEach(Wf);
  };
function qf({ root: e, ...t }) {
  const n = e || document;
  gr.has(n) || gr.set(n, {});
  const r = gr.get(n),
    i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(Yf, { root: e, ...t })), r[i];
}
function Kf(e, t, n) {
  const r = qf(t);
  return (
    Yr.set(e, n),
    r.observe(e),
    () => {
      Yr.delete(e), r.unobserve(e);
    }
  );
}
const Gf = {
  some: 0,
  all: 1,
};
class Xf extends ct {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: r, amount: i = "some", once: o } = t,
      s = {
        root: n ? n.current : void 0,
        rootMargin: r,
        threshold: typeof i == "number" ? i : Gf[i],
      },
      a = (u) => {
        const { isIntersecting: c } = u;
        if (
          this.isInView === c ||
          ((this.isInView = c), o && !c && this.hasEnteredView)
        )
          return;
        c && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", c);
        const { onViewportEnter: l, onViewportLeave: f } = this.node.getProps(),
          d = c ? l : f;
        d && d(u);
      };
    return Kf(this.node.current, s, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Zf(t, n)) && this.startObserver();
  }
  unmount() {}
}
function Zf({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Jf = {
  inView: {
    Feature: Xf,
  },
  tap: {
    Feature: zf,
  },
  focus: {
    Feature: Uf,
  },
  hover: {
    Feature: Hf,
  },
};
function Ya(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function Qf(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.get())), t;
}
function ed(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.getVelocity())), t;
}
function ir(e, t, n) {
  const r = e.getProps();
  return Li(r, t, n !== void 0 ? n : r.custom, Qf(e), ed(e));
}
const Xe = (e) => e * 1e3,
  Ze = (e) => e / 1e3,
  td = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
  },
  nd = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  rd = {
    type: "keyframes",
    duration: 0.8,
  },
  id = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
  },
  od = (e, { keyframes: t }) =>
    t.length > 2
      ? rd
      : Tt.has(e)
      ? e.startsWith("scale")
        ? nd(t[1])
        : td
      : id;
function sd({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: o,
  repeatType: s,
  repeatDelay: a,
  from: u,
  elapsed: c,
  ...l
}) {
  return !!Object.keys(l).length;
}
function Vi(e, t) {
  return e[t] || e.default || e;
}
const ad = (e) => e !== null;
function or(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(ad),
    o = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !o || r === void 0 ? i[o] : r;
}
let wn;
function ud() {
  wn = void 0;
}
const it = {
    now: () => (
      wn === void 0 &&
        it.set(
          Te.isProcessing || Xc.useManualTiming
            ? Te.timestamp
            : performance.now(),
        ),
      wn
    ),
    set: (e) => {
      (wn = e), queueMicrotask(ud);
    },
  },
  qa = (e) => /^0[^.\s]+$/u.test(e);
function ld(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
    ? e === "none" || e === "0" || qa(e)
    : !0;
}
let hn = Se,
  Ue = Se;
process.env.NODE_ENV !== "production" &&
  ((hn = (e, t) => {
    !e && typeof console < "u" && console.warn(t);
  }),
  (Ue = (e, t) => {
    if (!e) throw new Error(t);
  }));
const Ka = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  cd =
    // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
    /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function fd(e) {
  const t = cd.exec(e);
  if (!t) return [,];
  const [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
const dd = 4;
function Ga(e, t, n = 1) {
  Ue(
    n <= dd,
    `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
  );
  const [r, i] = fd(e);
  if (!r) return;
  const o = window.getComputedStyle(t).getPropertyValue(r);
  if (o) {
    const s = o.trim();
    return Ka(s) ? parseFloat(s) : s;
  }
  return Ri(i) ? Ga(i, t, n + 1) : i;
}
const hd = /* @__PURE__ */ new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
    "translateX",
    "translateY",
  ]),
  ko = (e) => e === Vt || e === Y,
  $o = (e, t) => parseFloat(e.split(", ")[t]),
  Bo =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === "none" || !r) return 0;
      const i = r.match(/^matrix3d\((.+)\)$/u);
      if (i) return $o(i[1], t);
      {
        const o = r.match(/^matrix\((.+)\)$/u);
        return o ? $o(o[1], e) : 0;
      }
    },
  pd = /* @__PURE__ */ new Set(["x", "y", "z"]),
  md = cn.filter((e) => !pd.has(e));
function Ho(e) {
  const t = [];
  return (
    md.forEach((n) => {
      const r = e.getValue(n);
      r !== void 0 &&
        (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const jt = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: Bo(4, 13),
  y: Bo(5, 14),
};
jt.translateX = jt.x;
jt.translateY = jt.y;
const Xa = (e) => (t) => t.test(e),
  gd = {
    test: (e) => e === "auto",
    parse: (e) => e,
  },
  Za = [Vt, Y, He, tt, bf, Ef, gd],
  Uo = (e) => Za.find(Xa(e)),
  Et = /* @__PURE__ */ new Set();
let qr = !1,
  Kr = !1;
function Ja() {
  if (Kr) {
    const e = Array.from(Et).filter((r) => r.needsMeasurement),
      t = new Set(e.map((r) => r.element)),
      n = /* @__PURE__ */ new Map();
    t.forEach((r) => {
      Ho(r).length && (n.set(r, Ho(r)), r.render());
    }),
      e.forEach((r) => r.measureInitialState()),
      t.forEach((r) => {
        r.render();
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      });
  }
  (Kr = !1), (qr = !1), Et.forEach((e) => e.complete()), Et.clear();
}
function Qa() {
  Et.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Kr = !0);
  });
}
function yd() {
  Qa(), Ja();
}
class ki {
  constructor(t, n, r, i, o, s = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = r),
      (this.motionValue = i),
      (this.element = o),
      (this.isAsync = s);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (Et.add(this),
          qr || ((qr = !0), Ee.read(Qa), Ee.resolveKeyframes(Ja)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n,
      element: r,
      motionValue: i,
    } = this;
    for (let o = 0; o < t.length; o++)
      if (t[o] === null)
        if (o === 0) {
          const s = i == null ? void 0 : i.get(),
            a = t[t.length - 1];
          if (s !== void 0) t[0] = s;
          else if (r && n) {
            const u = r.readValue(n, a);
            u != null && (t[0] = u);
          }
          t[0] === void 0 && (t[0] = a), i && s === void 0 && i.set(t[0]);
        } else t[o] = t[o - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      Et.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Et.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const $i = (e, t) => (n) =>
    !!(
      (fn(n) && vf.test(n) && n.startsWith(e)) ||
      (t && Object.prototype.hasOwnProperty.call(n, t))
    ),
  eu = (e, t, n) => (r) => {
    if (!fn(r)) return r;
    const [i, o, s, a] = r.match(Oi);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(o),
      [n]: parseFloat(s),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  vd = (e) => st(0, 255, e),
  yr = {
    ...Vt,
    transform: (e) => Math.round(vd(e)),
  },
  vt = {
    test: $i("rgb", "red"),
    parse: eu("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      "rgba(" +
      yr.transform(e) +
      ", " +
      yr.transform(t) +
      ", " +
      yr.transform(n) +
      ", " +
      Xt(Gt.transform(r)) +
      ")",
  };
function Ed(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const Gr = {
    test: $i("#"),
    parse: Ed,
    transform: vt.transform,
  },
  Dt = {
    test: $i("hsl", "hue"),
    parse: eu("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      He.transform(Xt(t)) +
      ", " +
      He.transform(Xt(n)) +
      ", " +
      Xt(Gt.transform(r)) +
      ")",
  },
  Ce = {
    test: (e) => vt.test(e) || Gr.test(e) || Dt.test(e),
    parse: (e) =>
      vt.test(e) ? vt.parse(e) : Dt.test(e) ? Dt.parse(e) : Gr.parse(e),
    transform: (e) =>
      fn(e) ? e : e.hasOwnProperty("red") ? vt.transform(e) : Dt.transform(e),
  };
function bd(e) {
  var t, n;
  return (
    isNaN(e) &&
    fn(e) &&
    (((t = e.match(Oi)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(yf)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const tu = "number",
  nu = "color",
  Td = "var",
  Sd = "var(",
  zo = "${}",
  Cd =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Vn(e) {
  const t = e.toString(),
    n = [],
    r = {
      color: [],
      number: [],
      var: [],
    },
    i = [];
  let o = 0;
  const a = t
    .replace(
      Cd,
      (u) => (
        Ce.test(u)
          ? (r.color.push(o), i.push(nu), n.push(Ce.parse(u)))
          : u.startsWith(Sd)
          ? (r.var.push(o), i.push(Td), n.push(u))
          : (r.number.push(o), i.push(tu), n.push(parseFloat(u))),
        ++o,
        zo
      ),
    )
    .split(zo);
  return { values: n, split: a, indexes: r, types: i };
}
function ru(e) {
  return Vn(e).values;
}
function iu(e) {
  const { split: t, types: n } = Vn(e),
    r = t.length;
  return (i) => {
    let o = "";
    for (let s = 0; s < r; s++)
      if (((o += t[s]), i[s] !== void 0)) {
        const a = n[s];
        a === tu
          ? (o += Xt(i[s]))
          : a === nu
          ? (o += Ce.transform(i[s]))
          : (o += i[s]);
      }
    return o;
  };
}
const xd = (e) => (typeof e == "number" ? 0 : e);
function Ad(e) {
  const t = ru(e);
  return iu(e)(t.map(xd));
}
const ut = {
    test: bd,
    parse: ru,
    createTransformer: iu,
    getAnimatableNone: Ad,
  },
  _d = /* @__PURE__ */ new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity",
  ]);
function wd(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [r] = n.match(Oi) || [];
  if (!r) return e;
  const i = n.replace(r, "");
  let o = _d.has(t) ? 1 : 0;
  return r !== n && (o *= 100), t + "(" + o + i + ")";
}
const Dd = /\b([a-z-]*)\(.*?\)/gu,
  Xr = {
    ...ut,
    getAnimatableNone: (e) => {
      const t = e.match(Dd);
      return t ? t.map(wd).join(" ") : e;
    },
  },
  Pd = {
    ...Oa,
    // Color props
    color: Ce,
    backgroundColor: Ce,
    outlineColor: Ce,
    fill: Ce,
    stroke: Ce,
    // Border props
    borderColor: Ce,
    borderTopColor: Ce,
    borderRightColor: Ce,
    borderBottomColor: Ce,
    borderLeftColor: Ce,
    filter: Xr,
    WebkitFilter: Xr,
  },
  Bi = (e) => Pd[e];
function ou(e, t) {
  let n = Bi(e);
  return (
    n !== Xr && (n = ut), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
  );
}
function Rd(e, t, n) {
  let r = 0,
    i;
  for (; r < e.length && !i; )
    typeof e[r] == "string" && e[r] !== "none" && e[r] !== "0" && (i = e[r]),
      r++;
  if (i && n) for (const o of t) e[o] = ou(n, i);
}
class su extends ki {
  constructor(t, n, r, i) {
    super(t, n, r, i, i == null ? void 0 : i.owner, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n.current) return;
    super.readKeyframes();
    for (let u = 0; u < t.length; u++) {
      const c = t[u];
      if (typeof c == "string" && Ri(c)) {
        const l = Ga(c, n.current);
        l !== void 0 && (t[u] = l);
      }
    }
    if (!hd.has(r) || t.length !== 2) return this.resolveNoneKeyframes();
    const [i, o] = t,
      s = Uo(i),
      a = Uo(o);
    if (s !== a)
      if (ko(s) && ko(a))
        for (let u = 0; u < t.length; u++) {
          const c = t[u];
          typeof c == "string" && (t[u] = parseFloat(c));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      r = [];
    for (let i = 0; i < t.length; i++) ld(t[i]) && r.push(i);
    r.length && Rd(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t.current) return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = jt[r](
        t.measureViewportBox(),
        window.getComputedStyle(t.current),
      )),
      (n[0] = this.measuredOrigin);
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    var t;
    const { element: n, name: r, unresolvedKeyframes: i } = this;
    if (!n.current) return;
    const o = n.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const s = i.length - 1,
      a = i[s];
    (i[s] = jt[r](n.measureViewportBox(), window.getComputedStyle(n.current))),
      a !== null && (this.finalKeyframe = a),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([u, c]) => {
          n.getValue(u).set(c);
        }),
      this.resolveNoneKeyframes();
  }
}
function Od(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Wo = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" && // It's animatable if we have a string
          (ut.test(e) || e === "0") && // And it contains numbers and/or colors
          !e.startsWith("url("))
      );
function Id(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Md(e, t, n, r) {
  const i = e[0];
  if (i === null) return !1;
  const o = e[e.length - 1],
    s = Wo(i, t),
    a = Wo(o, t);
  return (
    hn(
      s === a,
      `You are trying to animate ${t} from "${i}" to "${o}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${o} via the \`style\` property.`,
    ),
    !s || !a ? !1 : Id(e) || (n === "spring" && r)
  );
}
class au {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = "keyframes",
    repeat: i = 0,
    repeatDelay: o = 0,
    repeatType: s = "loop",
    ...a
  }) {
    (this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.options = {
        autoplay: t,
        delay: n,
        type: r,
        repeat: i,
        repeatDelay: o,
        repeatType: s,
        ...a,
      }),
      this.updateFinishedPromise();
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && yd(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(t, n) {
    this.hasAttemptedResolve = !0;
    const {
      name: r,
      type: i,
      velocity: o,
      delay: s,
      onComplete: a,
      onUpdate: u,
      isGenerator: c,
    } = this.options;
    if (!c && !Md(t, r, i, o))
      if (s) this.options.duration = 0;
      else {
        u == null || u(or(t, this.options, n)),
          a == null || a(),
          this.resolveFinishedPromise();
        return;
      }
    const l = this.initPlayback(t, n);
    l !== !1 &&
      ((this._resolved = {
        keyframes: t,
        finalKeyframe: n,
        ...l,
      }),
      this.onPostResolved());
  }
  onPostResolved() {}
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
function uu(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Fd = 5;
function lu(e, t, n) {
  const r = Math.max(t - Fd, 0);
  return uu(n - e(r), t - r);
}
const vr = 1e-3,
  Nd = 0.01,
  Yo = 10,
  jd = 0.05,
  Ld = 1;
function Vd({
  duration: e = 800,
  bounce: t = 0.25,
  velocity: n = 0,
  mass: r = 1,
}) {
  let i, o;
  hn(e <= Xe(Yo), "Spring duration must be 10 seconds or less");
  let s = 1 - t;
  (s = st(jd, Ld, s)),
    (e = st(Nd, Yo, Ze(e))),
    s < 1
      ? ((i = (c) => {
          const l = c * s,
            f = l * e,
            d = l - n,
            h = Zr(c, s),
            p = Math.exp(-f);
          return vr - (d / h) * p;
        }),
        (o = (c) => {
          const f = c * s * e,
            d = f * n + n,
            h = Math.pow(s, 2) * Math.pow(c, 2) * e,
            p = Math.exp(-f),
            m = Zr(Math.pow(c, 2), s);
          return ((-i(c) + vr > 0 ? -1 : 1) * ((d - h) * p)) / m;
        }))
      : ((i = (c) => {
          const l = Math.exp(-c * e),
            f = (c - n) * e + 1;
          return -vr + l * f;
        }),
        (o = (c) => {
          const l = Math.exp(-c * e),
            f = (n - c) * (e * e);
          return l * f;
        }));
  const a = 5 / e,
    u = $d(i, o, a);
  if (((e = Xe(e)), isNaN(u)))
    return {
      stiffness: 100,
      damping: 10,
      duration: e,
    };
  {
    const c = Math.pow(u, 2) * r;
    return {
      stiffness: c,
      damping: s * 2 * Math.sqrt(r * c),
      duration: e,
    };
  }
}
const kd = 12;
function $d(e, t, n) {
  let r = n;
  for (let i = 1; i < kd; i++) r = r - e(r) / t(r);
  return r;
}
function Zr(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const Bd = ["duration", "bounce"],
  Hd = ["stiffness", "damping", "mass"];
function qo(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function Ud(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!qo(e, Hd) && qo(e, Bd)) {
    const n = Vd(e);
    (t = {
      ...t,
      ...n,
      mass: 1,
    }),
      (t.isResolvedFromDuration = !0);
  }
  return t;
}
function cu({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
  const i = e[0],
    o = e[e.length - 1],
    s = { done: !1, value: i },
    {
      stiffness: a,
      damping: u,
      mass: c,
      duration: l,
      velocity: f,
      isResolvedFromDuration: d,
    } = Ud({
      ...r,
      velocity: -Ze(r.velocity || 0),
    }),
    h = f || 0,
    p = u / (2 * Math.sqrt(a * c)),
    m = o - i,
    g = Ze(Math.sqrt(a / c)),
    v = Math.abs(m) < 5;
  n || (n = v ? 0.01 : 2), t || (t = v ? 5e-3 : 0.5);
  let b;
  if (p < 1) {
    const E = Zr(g, p);
    b = (x) => {
      const S = Math.exp(-p * g * x);
      return (
        o - S * (((h + p * g * m) / E) * Math.sin(E * x) + m * Math.cos(E * x))
      );
    };
  } else if (p === 1) b = (E) => o - Math.exp(-g * E) * (m + (h + g * m) * E);
  else {
    const E = g * Math.sqrt(p * p - 1);
    b = (x) => {
      const S = Math.exp(-p * g * x),
        P = Math.min(E * x, 300);
      return (
        o - (S * ((h + p * g * m) * Math.sinh(P) + E * m * Math.cosh(P))) / E
      );
    };
  }
  return {
    calculatedDuration: (d && l) || null,
    next: (E) => {
      const x = b(E);
      if (d) s.done = E >= l;
      else {
        let S = h;
        E !== 0 && (p < 1 ? (S = lu(b, E, x)) : (S = 0));
        const P = Math.abs(S) <= n,
          I = Math.abs(o - x) <= t;
        s.done = P && I;
      }
      return (s.value = s.done ? o : x), s;
    },
  };
}
function Ko({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: o = 500,
  modifyTarget: s,
  min: a,
  max: u,
  restDelta: c = 0.5,
  restSpeed: l,
}) {
  const f = e[0],
    d = {
      done: !1,
      value: f,
    },
    h = (T) => (a !== void 0 && T < a) || (u !== void 0 && T > u),
    p = (T) =>
      a === void 0
        ? u
        : u === void 0 || Math.abs(a - T) < Math.abs(u - T)
        ? a
        : u;
  let m = n * t;
  const g = f + m,
    v = s === void 0 ? g : s(g);
  v !== g && (m = v - f);
  const b = (T) => -m * Math.exp(-T / r),
    E = (T) => v + b(T),
    x = (T) => {
      const L = b(T),
        A = E(T);
      (d.done = Math.abs(L) <= c), (d.value = d.done ? v : A);
    };
  let S, P;
  const I = (T) => {
    h(d.value) &&
      ((S = T),
      (P = cu({
        keyframes: [d.value, p(d.value)],
        velocity: lu(E, T, d.value),
        damping: i,
        stiffness: o,
        restDelta: c,
        restSpeed: l,
      })));
  };
  return (
    I(0),
    {
      calculatedDuration: null,
      next: (T) => {
        let L = !1;
        return (
          !P && S === void 0 && ((L = !0), x(T), I(T)),
          S !== void 0 && T >= S ? P.next(T - S) : (!L && x(T), d)
        );
      },
    }
  );
}
const fu = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  zd = 1e-7,
  Wd = 12;
function Yd(e, t, n, r, i) {
  let o,
    s,
    a = 0;
  do (s = t + (n - t) / 2), (o = fu(s, r, i) - e), o > 0 ? (n = s) : (t = s);
  while (Math.abs(o) > zd && ++a < Wd);
  return s;
}
function pn(e, t, n, r) {
  if (e === t && n === r) return Se;
  const i = (o) => Yd(o, 0, 1, e, n);
  return (o) => (o === 0 || o === 1 ? o : fu(i(o), t, r));
}
const qd = pn(0.42, 0, 1, 1),
  Kd = pn(0, 0, 0.58, 1),
  du = pn(0.42, 0, 0.58, 1),
  Gd = (e) => Array.isArray(e) && typeof e[0] != "number",
  hu = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  pu = (e) => (t) => 1 - e(1 - t),
  Hi = (e) => 1 - Math.sin(Math.acos(e)),
  mu = pu(Hi),
  Xd = hu(Hi),
  gu = pn(0.33, 1.53, 0.69, 0.99),
  Ui = pu(gu),
  Zd = hu(Ui),
  Jd = (e) =>
    (e *= 2) < 1 ? 0.5 * Ui(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  Go = {
    linear: Se,
    easeIn: qd,
    easeInOut: du,
    easeOut: Kd,
    circIn: Hi,
    circInOut: Xd,
    circOut: mu,
    backIn: Ui,
    backInOut: Zd,
    backOut: gu,
    anticipate: Jd,
  },
  Xo = (e) => {
    if (Array.isArray(e)) {
      Ue(
        e.length === 4,
        "Cubic bezier arrays must contain four numerical values.",
      );
      const [t, n, r, i] = e;
      return pn(t, n, r, i);
    } else if (typeof e == "string")
      return Ue(Go[e] !== void 0, `Invalid easing type '${e}'`), Go[e];
    return e;
  },
  on = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  de = (e, t, n) => e + (t - e) * n;
function Er(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function Qd({ hue: e, saturation: t, lightness: n, alpha: r }) {
  (e /= 360), (t /= 100), (n /= 100);
  let i = 0,
    o = 0,
    s = 0;
  if (!t) i = o = s = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      u = 2 * n - a;
    (i = Er(u, a, e + 1 / 3)), (o = Er(u, a, e)), (s = Er(u, a, e - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(s * 255),
    alpha: r,
  };
}
const br = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  eh = [Gr, vt, Dt],
  th = (e) => eh.find((t) => t.test(e));
function Zo(e) {
  const t = th(e);
  Ue(
    !!t,
    `'${e}' is not an animatable color. Use the equivalent color code instead.`,
  );
  let n = t.parse(e);
  return t === Dt && (n = Qd(n)), n;
}
const Jo = (e, t) => {
  const n = Zo(e),
    r = Zo(t),
    i = { ...n };
  return (o) => (
    (i.red = br(n.red, r.red, o)),
    (i.green = br(n.green, r.green, o)),
    (i.blue = br(n.blue, r.blue, o)),
    (i.alpha = de(n.alpha, r.alpha, o)),
    vt.transform(i)
  );
};
function Jr(e, t) {
  return (n) => (n > 0 ? t : e);
}
function nh(e, t) {
  return (n) => de(e, t, n);
}
function zi(e) {
  return typeof e == "number"
    ? nh
    : typeof e == "string"
    ? Ri(e)
      ? Jr
      : Ce.test(e)
      ? Jo
      : oh
    : Array.isArray(e)
    ? yu
    : typeof e == "object"
    ? Ce.test(e)
      ? Jo
      : rh
    : Jr;
}
function yu(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((o, s) => zi(o)(o, t[s]));
  return (o) => {
    for (let s = 0; s < r; s++) n[s] = i[s](o);
    return n;
  };
}
function rh(e, t) {
  const n = { ...e, ...t },
    r = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (r[i] = zi(e[i])(e[i], t[i]));
  return (i) => {
    for (const o in r) n[o] = r[o](i);
    return n;
  };
}
function ih(e, t) {
  var n;
  const r = [],
    i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < t.values.length; o++) {
    const s = t.types[o],
      a = e.indexes[s][i[s]],
      u = (n = e.values[a]) !== null && n !== void 0 ? n : 0;
    (r[o] = u), i[s]++;
  }
  return r;
}
const oh = (e, t) => {
  const n = ut.createTransformer(t),
    r = Vn(e),
    i = Vn(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? Ge(yu(ih(r, i), i.values), n)
    : (hn(
        !0,
        `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
      ),
      Jr(e, t));
};
function vu(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number"
    ? de(e, t, n)
    : zi(e)(e, t);
}
function sh(e, t, n) {
  const r = [],
    i = n || vu,
    o = e.length - 1;
  for (let s = 0; s < o; s++) {
    let a = i(e[s], e[s + 1]);
    if (t) {
      const u = Array.isArray(t) ? t[s] || Se : t;
      a = Ge(u, a);
    }
    r.push(a);
  }
  return r;
}
function ah(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const o = e.length;
  if (
    (Ue(o === t.length, "Both input and output ranges must be the same length"),
    o === 1)
  )
    return () => t[0];
  if (o === 2 && e[0] === e[1]) return () => t[1];
  e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const s = sh(t, r, i),
    a = s.length,
    u = (c) => {
      let l = 0;
      if (a > 1) for (; l < e.length - 2 && !(c < e[l + 1]); l++);
      const f = on(e[l], e[l + 1], c);
      return s[l](f);
    };
  return n ? (c) => u(st(e[0], e[o - 1], c)) : u;
}
function uh(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = on(0, t, r);
    e.push(de(n, 1, i));
  }
}
function lh(e) {
  const t = [0];
  return uh(t, e.length - 1), t;
}
function ch(e, t) {
  return e.map((n) => n * t);
}
function fh(e, t) {
  return e.map(() => t || du).splice(0, e.length - 1);
}
function kn({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: r = "easeInOut",
}) {
  const i = Gd(r) ? r.map(Xo) : Xo(r),
    o = {
      done: !1,
      value: t[0],
    },
    s = ch(
      // Only use the provided offsets if they're the correct length
      // TODO Maybe we should warn here if there's a length mismatch
      n && n.length === t.length ? n : lh(t),
      e,
    ),
    a = ah(s, t, {
      ease: Array.isArray(i) ? i : fh(t, i),
    });
  return {
    calculatedDuration: e,
    next: (u) => ((o.value = a(u)), (o.done = u >= e), o),
  };
}
const Qo = 2e4;
function dh(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < Qo; ) (t += n), (r = e.next(t));
  return t >= Qo ? 1 / 0 : t;
}
const hh = (e) => {
    const t = ({ timestamp: n }) => e(n);
    return {
      start: () => Ee.update(t, !0),
      stop: () => at(t),
      /**
       * If we're processing this frame we can use the
       * framelocked timestamp to keep things in sync.
       */
      now: () => (Te.isProcessing ? Te.timestamp : it.now()),
    };
  },
  ph = {
    decay: Ko,
    inertia: Ko,
    tween: kn,
    keyframes: kn,
    spring: cu,
  },
  mh = (e) => e / 100;
class Wi extends au {
  constructor({ KeyframeResolver: t = ki, ...n }) {
    super(n),
      (this.holdTime = null),
      (this.startTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.state = "idle");
    const { name: r, motionValue: i, keyframes: o } = this.options,
      s = (a, u) => this.onKeyframesResolved(a, u);
    r && i && i.owner
      ? (this.resolver = i.owner.resolveKeyframes(o, s, r, i))
      : (this.resolver = new t(o, s, r, i)),
      this.resolver.scheduleResolve();
  }
  initPlayback(t) {
    const {
        type: n = "keyframes",
        repeat: r = 0,
        repeatDelay: i = 0,
        repeatType: o,
        velocity: s = 0,
      } = this.options,
      a = ph[n] || kn;
    let u, c;
    a !== kn &&
      typeof t[0] != "number" &&
      (process.env.NODE_ENV !== "production" &&
        Ue(
          t.length === 2,
          `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${t}`,
        ),
      (u = Ge(mh, vu(t[0], t[1]))),
      (t = [0, 100]));
    const l = a({ ...this.options, keyframes: t });
    o === "mirror" &&
      (c = a({
        ...this.options,
        keyframes: [...t].reverse(),
        velocity: -s,
      })),
      l.calculatedDuration === null && (l.calculatedDuration = dh(l));
    const { calculatedDuration: f } = l,
      d = f + i,
      h = d * (r + 1) - i;
    return {
      generator: l,
      mirroredGenerator: c,
      mapPercentToKeyframes: u,
      calculatedDuration: f,
      resolvedDuration: d,
      totalDuration: h,
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    this.play(),
      this.pendingPlayState === "paused" || !t
        ? this.pause()
        : (this.state = this.pendingPlayState);
  }
  tick(t, n = !1) {
    const { resolved: r } = this;
    if (!r) {
      const { keyframes: T } = this.options;
      return { done: !0, value: T[T.length - 1] };
    }
    const {
      finalKeyframe: i,
      generator: o,
      mirroredGenerator: s,
      mapPercentToKeyframes: a,
      keyframes: u,
      calculatedDuration: c,
      totalDuration: l,
      resolvedDuration: f,
    } = r;
    if (this.startTime === null) return o.next(0);
    const {
      delay: d,
      repeat: h,
      repeatType: p,
      repeatDelay: m,
      onUpdate: g,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 &&
        (this.startTime = Math.min(t - l / this.speed, this.startTime)),
      n
        ? (this.currentTime = t)
        : this.holdTime !== null
        ? (this.currentTime = this.holdTime)
        : (this.currentTime = Math.round(t - this.startTime) * this.speed);
    const v = this.currentTime - d * (this.speed >= 0 ? 1 : -1),
      b = this.speed >= 0 ? v < 0 : v > l;
    (this.currentTime = Math.max(v, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = l);
    let E = this.currentTime,
      x = o;
    if (h) {
      const T = Math.min(this.currentTime, l) / f;
      let L = Math.floor(T),
        A = T % 1;
      !A && T >= 1 && (A = 1),
        A === 1 && L--,
        (L = Math.min(L, h + 1)),
        !!(L % 2) &&
          (p === "reverse"
            ? ((A = 1 - A), m && (A -= m / f))
            : p === "mirror" && (x = s)),
        (E = st(0, 1, A) * f);
    }
    const S = b ? { done: !1, value: u[0] } : x.next(E);
    a && (S.value = a(S.value));
    let { done: P } = S;
    !b &&
      c !== null &&
      (P = this.speed >= 0 ? this.currentTime >= l : this.currentTime <= 0);
    const I =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && P));
    return (
      I && i !== void 0 && (S.value = or(u, this.options, i)),
      g && g(S.value),
      I && this.finish(),
      S
    );
  }
  get duration() {
    const { resolved: t } = this;
    return t ? Ze(t.calculatedDuration) : 0;
  }
  get time() {
    return Ze(this.currentTime);
  }
  set time(t) {
    (t = Xe(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    (this.playbackSpeed = t), n && (this.time = Ze(this.currentTime));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: t = hh, onPlay: n } = this.options;
    this.driver || (this.driver = t((i) => this.tick(i))), n && n();
    const r = this.driver.now();
    this.holdTime !== null
      ? (this.startTime = r - this.holdTime)
      : (!this.startTime || this.state === "finished") && (this.startTime = r),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    (this.state = "paused"),
      (this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0);
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    this.teardown();
    const { onStop: t } = this.options;
    t && t();
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.teardown(), (this.state = "finished");
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return (this.startTime = 0), this.tick(t, !0);
  }
}
const Eu = (e) => Array.isArray(e) && typeof e[0] == "number";
function bu(e) {
  return !!(
    !e ||
    (typeof e == "string" && Tu[e]) ||
    Eu(e) ||
    (Array.isArray(e) && e.every(bu))
  );
}
const qt = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Tu = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: qt([0, 0.65, 0.55, 1]),
    circOut: qt([0.55, 0, 1, 0.45]),
    backIn: qt([0.31, 0.01, 0.66, -0.59]),
    backOut: qt([0.33, 1.53, 0.69, 0.99]),
  };
function Su(e) {
  if (e) return Eu(e) ? qt(e) : Array.isArray(e) ? e.map(Su) : Tu[e];
}
function gh(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: o = 0,
    repeatType: s = "loop",
    ease: a,
    times: u,
  } = {},
) {
  const c = { [t]: n };
  u && (c.offset = u);
  const l = Su(a);
  return (
    Array.isArray(l) && (c.easing = l),
    e.animate(c, {
      delay: r,
      duration: i,
      easing: Array.isArray(l) ? "linear" : l,
      fill: "both",
      iterations: o + 1,
      direction: s === "reverse" ? "alternate" : "normal",
    })
  );
}
const yh = Od(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  vh = /* @__PURE__ */ new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform",
    // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
    // or until we implement support for linear() easing.
    // "background-color"
  ]),
  $n = 10,
  Eh = 2e4;
function bh(e) {
  return e.type === "spring" || e.name === "backgroundColor" || !bu(e.ease);
}
function Th(e, t) {
  const n = new Wi({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let r = { done: !1, value: e[0] };
  const i = [];
  let o = 0;
  for (; !r.done && o < Eh; ) (r = n.sample(o)), i.push(r.value), (o += $n);
  return {
    times: void 0,
    keyframes: i,
    duration: o - $n,
    ease: "linear",
  };
}
class es extends au {
  constructor(t) {
    super(t);
    const { name: n, motionValue: r, keyframes: i } = this.options;
    (this.resolver = new su(i, (o, s) => this.onKeyframesResolved(o, s), n, r)),
      this.resolver.scheduleResolve();
  }
  initPlayback(t, n) {
    var r;
    let {
      duration: i = 300,
      times: o,
      ease: s,
      type: a,
      motionValue: u,
      name: c,
    } = this.options;
    if (!(!((r = u.owner) === null || r === void 0) && r.current)) return !1;
    if (bh(this.options)) {
      const { onComplete: f, onUpdate: d, motionValue: h, ...p } = this.options,
        m = Th(t, p);
      (t = m.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (i = m.duration),
        (o = m.times),
        (s = m.ease),
        (a = "keyframes");
    }
    const l = gh(u.owner.current, c, t, {
      ...this.options,
      duration: i,
      times: o,
      ease: s,
    });
    return (
      (l.startTime = it.now()),
      this.pendingTimeline
        ? ((l.timeline = this.pendingTimeline), (this.pendingTimeline = void 0))
        : (l.onfinish = () => {
            const { onComplete: f } = this.options;
            u.set(or(t, this.options, n)),
              f && f(),
              this.cancel(),
              this.resolveFinishedPromise();
          }),
      {
        animation: l,
        duration: i,
        times: o,
        type: a,
        ease: s,
        keyframes: t,
      }
    );
  }
  get duration() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { duration: n } = t;
    return Ze(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { animation: n } = t;
    return Ze(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.currentTime = Xe(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t) return 1;
    const { animation: n } = t;
    return n.playbackRate;
  }
  set speed(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t) return "idle";
    const { animation: n } = t;
    return n.playState;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      const { resolved: n } = this;
      if (!n) return Se;
      const { animation: r } = n;
      (r.timeline = t), (r.onfinish = null);
    }
    return Se;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    const { resolved: t } = this;
    if (!t) return;
    const {
      animation: n,
      keyframes: r,
      duration: i,
      type: o,
      ease: s,
      times: a,
    } = t;
    if (!(n.playState === "idle" || n.playState === "finished")) {
      if (this.time) {
        const {
            motionValue: u,
            onUpdate: c,
            onComplete: l,
            ...f
          } = this.options,
          d = new Wi({
            ...f,
            keyframes: r,
            duration: i,
            type: o,
            ease: s,
            times: a,
            isGenerator: !0,
          }),
          h = Xe(this.time);
        u.setWithVelocity(d.sample(h - $n).value, d.sample(h).value, $n);
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
    const {
      motionValue: n,
      name: r,
      repeatDelay: i,
      repeatType: o,
      damping: s,
      type: a,
    } = t;
    return (
      yh() &&
      r &&
      vh.has(r) &&
      n &&
      n.owner &&
      n.owner.current instanceof HTMLElement /**
       * If we're outputting values to onUpdate then we can't use WAAPI as there's
       * no way to read the value from WAAPI every frame.
       */ &&
      !n.owner.getProps().onUpdate &&
      !i &&
      o !== "mirror" &&
      s !== 0 &&
      a !== "inertia"
    );
  }
}
const Yi =
  (e, t, n, r = {}, i, o) =>
  (s) => {
    const a = Vi(r, e) || {},
      u = a.delay || r.delay || 0;
    let { elapsed: c = 0 } = r;
    c = c - Xe(u);
    let l = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...a,
      delay: -c,
      onUpdate: (d) => {
        t.set(d), a.onUpdate && a.onUpdate(d);
      },
      onComplete: () => {
        s(), a.onComplete && a.onComplete();
      },
      name: e,
      motionValue: t,
      element: o ? void 0 : i,
    };
    sd(a) ||
      (l = {
        ...l,
        ...od(e, l),
      }),
      l.duration && (l.duration = Xe(l.duration)),
      l.repeatDelay && (l.repeatDelay = Xe(l.repeatDelay)),
      l.from !== void 0 && (l.keyframes[0] = l.from);
    let f = !1;
    if (
      (l.type === !1 && ((l.duration = 0), l.delay === 0 && (f = !0)),
      f && !o && t.get() !== void 0)
    ) {
      const d = or(l.keyframes, a);
      if (d !== void 0) {
        Ee.update(() => {
          l.onUpdate(d), l.onComplete();
        });
        return;
      }
    }
    return !o && es.supports(l) ? new es(l) : new Wi(l);
  };
function Bn(e) {
  return !!(xe(e) && e.add);
}
function qi(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Ki(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class Gi {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return qi(this.subscriptions, t), () => Ki(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let o = 0; o < i; o++) {
          const s = this.subscriptions[o];
          s && s(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const ts = /* @__PURE__ */ new Set();
function Xi(e, t, n) {
  e || ts.has(t) || (console.warn(t), n && console.warn(n), ts.add(t));
}
const ns = 30,
  Sh = (e) => !isNaN(parseFloat(e));
class Ch {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(t, n = {}) {
    (this.version = "11.0.23"),
      (this.canTrackVelocity = !1),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        const o = it.now();
        this.updatedAt !== o && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.canTrackVelocity = Sh(this.current)),
      (this.owner = n.owner);
  }
  setCurrent(t) {
    (this.current = t), (this.updatedAt = it.now());
  }
  setPrevFrameValue(t = this.current) {
    (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
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
    return (
      process.env.NODE_ENV !== "production" &&
        Xi(
          !1,
          'value.onChange(callback) is deprecated. Switch to value.on("change", callback).',
        ),
      this.on("change", t)
    );
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Gi());
    const r = this.events[t].add(n);
    return t === "change"
      ? () => {
          r(),
            Ee.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(t, n) {
    (this.passiveEffect = t), (this.stopPassiveEffect = n);
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
    !n || !this.passiveEffect
      ? this.updateAndNotify(t, n)
      : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, r) {
    this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - r);
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
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
    const t = it.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      t - this.updatedAt > ns
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, ns);
    return uu(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
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
    this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function sn(e, t) {
  return new Ch(e, t);
}
function xh(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, sn(n));
}
function Ah(e, t) {
  const n = ir(e, t);
  let { transitionEnd: r = {}, transition: i = {}, ...o } = n || {};
  o = { ...o, ...r };
  for (const s in o) {
    const a = Ff(o[s]);
    xh(e, s, a);
  }
}
function _h({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return (t[n] = !1), r;
}
function Cu(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var o;
  let { transition: s = e.getDefaultTransition(), transitionEnd: a, ...u } = t;
  const c = e.getValue("willChange");
  r && (s = r);
  const l = [],
    f = i && e.animationState && e.animationState.getState()[i];
  for (const d in u) {
    const h = e.getValue(
        d,
        (o = e.latestValues[d]) !== null && o !== void 0 ? o : null,
      ),
      p = u[d];
    if (p === void 0 || (f && _h(f, d))) continue;
    const m = {
      delay: n,
      elapsed: 0,
      ...Vi(s || {}, d),
    };
    let g = !1;
    if (window.HandoffAppearAnimations) {
      const b = e.getProps()[xa];
      if (b) {
        const E = window.HandoffAppearAnimations(b, d);
        E !== null && ((m.elapsed = E), (g = !0));
      }
    }
    h.start(
      Yi(d, h, p, e.shouldReduceMotion && Tt.has(d) ? { type: !1 } : m, e, g),
    );
    const v = h.animation;
    v && (Bn(c) && (c.add(d), v.then(() => c.remove(d))), l.push(v));
  }
  return (
    a &&
      Promise.all(l).then(() => {
        Ee.update(() => {
          a && Ah(e, a);
        });
      }),
    l
  );
}
function Qr(e, t, n = {}) {
  var r;
  const i = ir(
    e,
    t,
    n.type === "exit"
      ? (r = e.presenceContext) === null || r === void 0
        ? void 0
        : r.custom
      : void 0,
  );
  let { transition: o = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (o = n.transitionOverride);
  const s = i ? () => Promise.all(Cu(e, i, n)) : () => Promise.resolve(),
    a =
      e.variantChildren && e.variantChildren.size
        ? (c = 0) => {
            const {
              delayChildren: l = 0,
              staggerChildren: f,
              staggerDirection: d,
            } = o;
            return wh(e, t, l + c, f, d, n);
          }
        : () => Promise.resolve(),
    { when: u } = o;
  if (u) {
    const [c, l] = u === "beforeChildren" ? [s, a] : [a, s];
    return c().then(() => l());
  } else return Promise.all([s(), a(n.delay)]);
}
function wh(e, t, n = 0, r = 0, i = 1, o) {
  const s = [],
    a = (e.variantChildren.size - 1) * r,
    u = i === 1 ? (c = 0) => c * r : (c = 0) => a - c * r;
  return (
    Array.from(e.variantChildren)
      .sort(Dh)
      .forEach((c, l) => {
        c.notify("AnimationStart", t),
          s.push(
            Qr(c, t, {
              ...o,
              delay: n + u(l),
            }).then(() => c.notify("AnimationComplete", t)),
          );
      }),
    Promise.all(s)
  );
}
function Dh(e, t) {
  return e.sortNodePosition(t);
}
function Ph(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((o) => Qr(e, o, n));
    r = Promise.all(i);
  } else if (typeof t == "string") r = Qr(e, t, n);
  else {
    const i = typeof t == "function" ? ir(e, t, n.custom) : t;
    r = Promise.all(Cu(e, i, n));
  }
  return r.then(() => {
    Ee.postRender(() => {
      e.notify("AnimationComplete", t);
    });
  });
}
const Rh = [..._i].reverse(),
  Oh = _i.length;
function Ih(e) {
  return (t) =>
    Promise.all(t.map(({ animation: n, options: r }) => Ph(e, n, r)));
}
function Mh(e) {
  let t = Ih(e);
  const n = Nh();
  let r = !0;
  const i = (u) => (c, l) => {
    var f;
    const d = ir(
      e,
      l,
      u === "exit"
        ? (f = e.presenceContext) === null || f === void 0
          ? void 0
          : f.custom
        : void 0,
    );
    if (d) {
      const { transition: h, transitionEnd: p, ...m } = d;
      c = { ...c, ...m, ...p };
    }
    return c;
  };
  function o(u) {
    t = u(e);
  }
  function s(u) {
    const c = e.getProps(),
      l = e.getVariantContext(!0) || {},
      f = [],
      d = /* @__PURE__ */ new Set();
    let h = {},
      p = 1 / 0;
    for (let g = 0; g < Oh; g++) {
      const v = Rh[g],
        b = n[v],
        E = c[v] !== void 0 ? c[v] : l[v],
        x = nn(E),
        S = v === u ? b.isActive : null;
      S === !1 && (p = g);
      let P = E === l[v] && E !== c[v] && x;
      if (
        (P && r && e.manuallyAnimateOnMount && (P = !1),
        (b.protectedKeys = { ...h }), // If it isn't active and hasn't *just* been set as inactive
        (!b.isActive && S === null) || // If we didn't and don't have any defined prop for this animation type
          (!E && !b.prevProp) || // Or if the prop doesn't define an animation
          tr(E) ||
          typeof E == "boolean")
      )
        continue;
      let T =
          Fh(b.prevProp, E) || // If we're making this variant active, we want to always make it active
          (v === u && b.isActive && !P && x) || // If we removed a higher-priority variant (i is in reverse order)
          (g > p && x),
        L = !1;
      const A = Array.isArray(E) ? E : [E];
      let j = A.reduce(i(v), {});
      S === !1 && (j = {});
      const { prevResolvedValues: X = {} } = b,
        q = {
          ...X,
          ...j,
        },
        M = (w) => {
          (T = !0),
            d.has(w) && ((L = !0), d.delete(w)),
            (b.needsAnimating[w] = !0);
        };
      for (const w in q) {
        const _ = j[w],
          O = X[w];
        if (h.hasOwnProperty(w)) continue;
        let D = !1;
        Wr(_) && Wr(O) ? (D = !Ya(_, O)) : (D = _ !== O),
          D
            ? _ != null
              ? M(w)
              : d.add(w)
            : _ !== void 0 && d.has(w)
            ? M(w)
            : (b.protectedKeys[w] = !0);
      }
      (b.prevProp = E),
        (b.prevResolvedValues = j),
        b.isActive && (h = { ...h, ...j }),
        r && e.blockInitialAnimation && (T = !1),
        T &&
          (!P || L) &&
          f.push(
            ...A.map((w) => ({
              animation: w,
              options: { type: v },
            })),
          );
    }
    if (d.size) {
      const g = {};
      d.forEach((v) => {
        const b = e.getBaseTarget(v);
        g[v] = b === void 0 ? null : b;
      }),
        f.push({ animation: g });
    }
    let m = !!f.length;
    return (
      r &&
        (c.initial === !1 || c.initial === c.animate) &&
        !e.manuallyAnimateOnMount &&
        (m = !1),
      (r = !1),
      m ? t(f) : Promise.resolve()
    );
  }
  function a(u, c) {
    var l;
    if (n[u].isActive === c) return Promise.resolve();
    (l = e.variantChildren) === null ||
      l === void 0 ||
      l.forEach((d) => {
        var h;
        return (h = d.animationState) === null || h === void 0
          ? void 0
          : h.setActive(u, c);
      }),
      (n[u].isActive = c);
    const f = s(u);
    for (const d in n) n[d].protectedKeys = {};
    return f;
  }
  return {
    animateChanges: s,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
  };
}
function Fh(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !Ya(t, e) : !1;
}
function dt(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function Nh() {
  return {
    animate: dt(!0),
    whileInView: dt(),
    whileHover: dt(),
    whileTap: dt(),
    whileDrag: dt(),
    whileFocus: dt(),
    exit: dt(),
  };
}
class jh extends ct {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = Mh(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    this.unmount(), tr(t) && (this.unmount = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {}
}
let Lh = 0;
class Vh extends ct {
  constructor() {
    super(...arguments), (this.id = Lh++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r) return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => n(this.id));
  }
  mount() {
    const { register: t } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const kh = {
    animation: {
      Feature: jh,
    },
    exit: {
      Feature: Vh,
    },
  },
  rs = (e, t) => Math.abs(e - t);
function $h(e, t) {
  const n = rs(e.x, t.x),
    r = rs(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class xu {
  constructor(
    t,
    n,
    { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: o = !1 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const f = Sr(this.lastMoveEventInfo, this.history),
          d = this.startEvent !== null,
          h = $h(f.offset, { x: 0, y: 0 }) >= 3;
        if (!d && !h) return;
        const { point: p } = f,
          { timestamp: m } = Te;
        this.history.push({ ...p, timestamp: m });
        const { onStart: g, onMove: v } = this.handlers;
        d ||
          (g && g(this.lastMoveEvent, f),
          (this.startEvent = this.lastMoveEvent)),
          v && v(this.lastMoveEvent, f);
      }),
      (this.handlePointerMove = (f, d) => {
        (this.lastMoveEvent = f),
          (this.lastMoveEventInfo = Tr(d, this.transformPagePoint)),
          Ee.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (f, d) => {
        this.end();
        const { onEnd: h, onSessionEnd: p, resumeAnimation: m } = this.handlers;
        if (
          (this.dragSnapToOrigin && m && m(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const g = Sr(
          f.type === "pointercancel"
            ? this.lastMoveEventInfo
            : Tr(d, this.transformPagePoint),
          this.history,
        );
        this.startEvent && h && h(f, g), p && p(f, g);
      }),
      !Ba(t))
    )
      return;
    (this.dragSnapToOrigin = o),
      (this.handlers = n),
      (this.transformPagePoint = r),
      (this.contextWindow = i || window);
    const s = rr(t),
      a = Tr(s, this.transformPagePoint),
      { point: u } = a,
      { timestamp: c } = Te;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: l } = n;
    l && l(t, Sr(a, this.history)),
      (this.removeListeners = Ge(
        Ke(this.contextWindow, "pointermove", this.handlePointerMove),
        Ke(this.contextWindow, "pointerup", this.handlePointerUp),
        Ke(this.contextWindow, "pointercancel", this.handlePointerUp),
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), at(this.updatePoint);
  }
}
function Tr(e, t) {
  return t ? { point: t(e.point) } : e;
}
function is(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Sr({ point: e }, t) {
  return {
    point: e,
    delta: is(e, Au(t)),
    offset: is(e, Bh(t)),
    velocity: Hh(t, 0.1),
  };
}
function Bh(e) {
  return e[0];
}
function Au(e) {
  return e[e.length - 1];
}
function Hh(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null;
  const i = Au(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > Xe(t))); ) n--;
  if (!r) return { x: 0, y: 0 };
  const o = Ze(i.timestamp - r.timestamp);
  if (o === 0) return { x: 0, y: 0 };
  const s = {
    x: (i.x - r.x) / o,
    y: (i.y - r.y) / o,
  };
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
function Me(e) {
  return e.max - e.min;
}
function ei(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function os(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = de(t.min, t.max, e.origin)),
    (e.scale = Me(n) / Me(t)),
    (ei(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
    (e.translate = de(n.min, n.max, e.origin) - e.originPoint),
    (ei(e.translate) || isNaN(e.translate)) && (e.translate = 0);
}
function Zt(e, t, n, r) {
  os(e.x, t.x, n.x, r ? r.originX : void 0),
    os(e.y, t.y, n.y, r ? r.originY : void 0);
}
function ss(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + Me(t));
}
function Uh(e, t, n) {
  ss(e.x, t.x, n.x), ss(e.y, t.y, n.y);
}
function as(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + Me(t));
}
function Jt(e, t, n) {
  as(e.x, t.x, n.x), as(e.y, t.y, n.y);
}
function zh(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? de(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? de(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function us(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function Wh(e, { top: t, left: n, bottom: r, right: i }) {
  return {
    x: us(e.x, n, i),
    y: us(e.y, t, r),
  };
}
function ls(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function Yh(e, t) {
  return {
    x: ls(e.x, t.x),
    y: ls(e.y, t.y),
  };
}
function qh(e, t) {
  let n = 0.5;
  const r = Me(e),
    i = Me(t);
  return (
    i > r
      ? (n = on(t.min, t.max - r, e.min))
      : r > i && (n = on(e.min, e.max - i, t.min)),
    st(0, 1, n)
  );
}
function Kh(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const ti = 0.35;
function Gh(e = ti) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = ti),
    {
      x: cs(e, "left", "right"),
      y: cs(e, "top", "bottom"),
    }
  );
}
function cs(e, t, n) {
  return {
    min: fs(e, t),
    max: fs(e, n),
  };
}
function fs(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const ds = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
  }),
  Pt = () => ({
    x: ds(),
    y: ds(),
  }),
  hs = () => ({ min: 0, max: 0 }),
  pe = () => ({
    x: hs(),
    y: hs(),
  });
function je(e) {
  return [e("x"), e("y")];
}
function _u({ top: e, left: t, right: n, bottom: r }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: r },
  };
}
function Xh({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Zh(e, t) {
  if (!t) return e;
  const n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x,
  };
}
function Cr(e) {
  return e === void 0 || e === 1;
}
function ni({ scale: e, scaleX: t, scaleY: n }) {
  return !Cr(e) || !Cr(t) || !Cr(n);
}
function pt(e) {
  return (
    ni(e) ||
    wu(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function wu(e) {
  return ps(e.x) || ps(e.y);
}
function ps(e) {
  return e && e !== "0%";
}
function Hn(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i;
}
function ms(e, t, n, r, i) {
  return i !== void 0 && (e = Hn(e, i, r)), Hn(e, n, r) + t;
}
function ri(e, t = 0, n = 1, r, i) {
  (e.min = ms(e.min, t, n, r, i)), (e.max = ms(e.max, t, n, r, i));
}
function Du(e, { x: t, y: n }) {
  ri(e.x, t.translate, t.scale, t.originPoint),
    ri(e.y, n.translate, n.scale, n.originPoint);
}
function Jh(e, t, n, r = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let o, s;
  for (let a = 0; a < i; a++) {
    (o = n[a]), (s = o.projectionDelta);
    const u = o.instance;
    (u && u.style && u.style.display === "contents") ||
      (r &&
        o.options.layoutScroll &&
        o.scroll &&
        o !== o.root &&
        Rt(e, {
          x: -o.scroll.offset.x,
          y: -o.scroll.offset.y,
        }),
      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), Du(e, s)),
      r && pt(o.latestValues) && Rt(e, o.latestValues));
  }
  (t.x = gs(t.x)), (t.y = gs(t.y));
}
function gs(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999
    ? e
    : 1;
}
function rt(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function ys(e, t, [n, r, i]) {
  const o = t[i] !== void 0 ? t[i] : 0.5,
    s = de(e.min, e.max, o);
  ri(e, t[n], t[r], s, t.scale);
}
const Qh = ["x", "scaleX", "originX"],
  ep = ["y", "scaleY", "originY"];
function Rt(e, t) {
  ys(e.x, t, Qh), ys(e.y, t, ep);
}
function Pu(e, t) {
  return _u(Zh(e.getBoundingClientRect(), t));
}
function tp(e, t, n) {
  const r = Pu(e, n),
    { scroll: i } = t;
  return i && (rt(r.x, i.offset.x), rt(r.y, i.offset.y)), r;
}
const Ru = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  np = /* @__PURE__ */ new WeakMap();
class rp {
  constructor(t) {
    (this.openGlobalLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = pe()),
      (this.visualElement = t);
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1) return;
    const i = (l) => {
        const { dragSnapToOrigin: f } = this.getProps();
        f ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(rr(l, "page").point);
      },
      o = (l, f) => {
        const { drag: d, dragPropagation: h, onDragStart: p } = this.getProps();
        if (
          d &&
          !h &&
          (this.openGlobalLock && this.openGlobalLock(),
          (this.openGlobalLock = Ua(d)),
          !this.openGlobalLock)
        )
          return;
        (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          je((g) => {
            let v = this.getAxisMotionValue(g).get() || 0;
            if (He.test(v)) {
              const { projection: b } = this.visualElement;
              if (b && b.layout) {
                const E = b.layout.layoutBox[g];
                E && (v = Me(E) * (parseFloat(v) / 100));
              }
            }
            this.originPoint[g] = v;
          }),
          p && p(l, f);
        const { animationState: m } = this.visualElement;
        m && m.setActive("whileDrag", !0);
      },
      s = (l, f) => {
        const {
          dragPropagation: d,
          dragDirectionLock: h,
          onDirectionLock: p,
          onDrag: m,
        } = this.getProps();
        if (!d && !this.openGlobalLock) return;
        const { offset: g } = f;
        if (h && this.currentDirection === null) {
          (this.currentDirection = ip(g)),
            this.currentDirection !== null && p && p(this.currentDirection);
          return;
        }
        this.updateAxis("x", f.point, g),
          this.updateAxis("y", f.point, g),
          this.visualElement.render(),
          m && m(l, f);
      },
      a = (l, f) => this.stop(l, f),
      u = () =>
        je((l) => {
          var f;
          return (
            this.getAnimationState(l) === "paused" &&
            ((f = this.getAxisMotionValue(l).animation) === null || f === void 0
              ? void 0
              : f.play())
          );
        }),
      { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new xu(
      t,
      {
        onSessionStart: i,
        onStart: o,
        onMove: s,
        onSessionEnd: a,
        resumeAnimation: u,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: c,
        contextWindow: Ru(this.visualElement),
      },
    );
  }
  stop(t, n) {
    const r = this.isDragging;
    if ((this.cancel(), !r)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: o } = this.getProps();
    o && o(t, n);
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: r } = this.getProps();
    !r &&
      this.openGlobalLock &&
      (this.openGlobalLock(), (this.openGlobalLock = null)),
      n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Sn(t, i, this.currentDirection)) return;
    const o = this.getAxisMotionValue(t);
    let s = this.originPoint[t] + r[t];
    this.constraints &&
      this.constraints[t] &&
      (s = zh(s, this.constraints[t], this.elastic[t])),
      o.set(s);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: r } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
          ? void 0
          : t.layout,
      o = this.constraints;
    n && wt(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
      ? (this.constraints = Wh(i.layoutBox, n))
      : (this.constraints = !1),
      (this.elastic = Gh(r)),
      o !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        je((s) => {
          this.getAxisMotionValue(s) &&
            (this.constraints[s] = Kh(i.layoutBox[s], this.constraints[s]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !wt(t)) return !1;
    const r = t.current;
    Ue(
      r !== null,
      "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
    );
    const { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const o = tp(r, i.root, this.visualElement.getTransformPagePoint());
    let s = Yh(i.layout.layoutBox, o);
    if (n) {
      const a = n(Xh(s));
      (this.hasMutatedConstraints = !!a), a && (s = _u(a));
    }
    return s;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: o,
        dragSnapToOrigin: s,
        onDragTransitionEnd: a,
      } = this.getProps(),
      u = this.constraints || {},
      c = je((l) => {
        if (!Sn(l, n, this.currentDirection)) return;
        let f = (u && u[l]) || {};
        s && (f = { min: 0, max: 0 });
        const d = i ? 200 : 1e6,
          h = i ? 40 : 1e7,
          p = {
            type: "inertia",
            velocity: r ? t[l] : 0,
            bounceStiffness: d,
            bounceDamping: h,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...o,
            ...f,
          };
        return this.startAxisValueAnimation(l, p);
      });
    return Promise.all(c).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return r.start(Yi(t, r, 0, n, this.visualElement));
  }
  stopAnimation() {
    je((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    je((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
      ? void 0
      : n.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = "_drag" + t.toUpperCase(),
      r = this.visualElement.getProps(),
      i = r[n];
    return (
      i ||
      this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    je((n) => {
      const { drag: r } = this.getProps();
      if (!Sn(n, r, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: s, max: a } = i.layout.layoutBox[n];
        o.set(t[n] - de(s, a, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!wt(n) || !r || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    je((s) => {
      const a = this.getAxisMotionValue(s);
      if (a) {
        const u = a.get();
        i[s] = qh({ min: u, max: u }, this.constraints[s]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = o ? o({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      je((s) => {
        if (!Sn(s, t, null)) return;
        const a = this.getAxisMotionValue(s),
          { min: u, max: c } = this.constraints[s];
        a.set(de(u, c, i[s]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    np.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = Ke(t, "pointerdown", (u) => {
        const { drag: c, dragListener: l = !0 } = this.getProps();
        c && l && this.start(u);
      }),
      r = () => {
        const { dragConstraints: u } = this.getProps();
        wt(u) && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      o = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), r();
    const s = Ye(window, "resize", () => this.scalePositionWithinConstraints()),
      a = i.addEventListener(
        "didUpdate",
        ({ delta: u, hasLayoutChanged: c }) => {
          this.isDragging &&
            c &&
            (je((l) => {
              const f = this.getAxisMotionValue(l);
              f &&
                ((this.originPoint[l] += u[l].translate),
                f.set(f.get() + u[l].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      s(), n(), o(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: o = !1,
        dragElastic: s = ti,
        dragMomentum: a = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: s,
      dragMomentum: a,
    };
  }
}
function Sn(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function ip(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n;
}
class op extends ct {
  constructor(t) {
    super(t),
      (this.removeGroupControls = Se),
      (this.removeListeners = Se),
      (this.controls = new rp(t));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Se);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const vs = (e) => (t, n) => {
  e && e(t, n);
};
class sp extends ct {
  constructor() {
    super(...arguments), (this.removePointerDownListener = Se);
  }
  onPointerDown(t) {
    this.session = new xu(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Ru(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: r,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: vs(t),
      onStart: vs(n),
      onMove: r,
      onEnd: (o, s) => {
        delete this.session, i && i(o, s);
      },
    };
  }
  mount() {
    this.removePointerDownListener = Ke(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function ap() {
  const e = ye(er);
  if (e === null) return [!0, null];
  const { isPresent: t, onExitComplete: n, register: r } = e,
    i = ci();
  return De(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0];
}
const Dn = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1,
};
function Es(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const Wt = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (Y.test(e)) e = parseFloat(e);
        else return e;
      const n = Es(e, t.target.x),
        r = Es(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  up = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = ut.parse(e);
      if (i.length > 5) return r;
      const o = ut.createTransformer(e),
        s = typeof i[0] != "number" ? 1 : 0,
        a = n.x.scale * t.x,
        u = n.y.scale * t.y;
      (i[0 + s] /= a), (i[1 + s] /= u);
      const c = de(a, u, 0.5);
      return (
        typeof i[2 + s] == "number" && (i[2 + s] /= c),
        typeof i[3 + s] == "number" && (i[3 + s] /= c),
        o(i)
      );
    },
  };
class lp extends ie.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
        layoutId: i,
      } = this.props,
      { projection: o } = t;
    cf(cp),
      o &&
        (n.group && n.group.add(o),
        r && r.register && i && r.register(o),
        o.root.didUpdate(),
        o.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        o.setOptions({
          ...o.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Dn.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: r,
        drag: i,
        isPresent: o,
      } = this.props,
      s = r.projection;
    return (
      s &&
        ((s.isPresent = o),
        i || t.layoutDependency !== n || n === void 0
          ? s.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== o &&
          (o
            ? s.promote()
            : s.relegate() ||
              Ee.postRender(() => {
                const a = s.getStack();
                (!a || !a.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      Ai.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
      } = this.props,
      { projection: i } = t;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Ou(e) {
  const [t, n] = ap(),
    r = ye(Di);
  return ie.createElement(lp, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: ye(wa),
    isPresent: t,
    safeToRemove: n,
  });
}
const cp = {
    borderRadius: {
      ...Wt,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: Wt,
    borderTopRightRadius: Wt,
    borderBottomLeftRadius: Wt,
    borderBottomRightRadius: Wt,
    boxShadow: up,
  },
  Iu = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  fp = Iu.length,
  bs = (e) => (typeof e == "string" ? parseFloat(e) : e),
  Ts = (e) => typeof e == "number" || Y.test(e);
function dp(e, t, n, r, i, o) {
  i
    ? ((e.opacity = de(
        0,
        // TODO Reinstate this if only child
        n.opacity !== void 0 ? n.opacity : 1,
        hp(r),
      )),
      (e.opacityExit = de(t.opacity !== void 0 ? t.opacity : 1, 0, pp(r))))
    : o &&
      (e.opacity = de(
        t.opacity !== void 0 ? t.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        r,
      ));
  for (let s = 0; s < fp; s++) {
    const a = `border${Iu[s]}Radius`;
    let u = Ss(t, a),
      c = Ss(n, a);
    if (u === void 0 && c === void 0) continue;
    u || (u = 0),
      c || (c = 0),
      u === 0 || c === 0 || Ts(u) === Ts(c)
        ? ((e[a] = Math.max(de(bs(u), bs(c), r), 0)),
          (He.test(c) || He.test(u)) && (e[a] += "%"))
        : (e[a] = c);
  }
  (t.rotate || n.rotate) && (e.rotate = de(t.rotate || 0, n.rotate || 0, r));
}
function Ss(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const hp = Mu(0, 0.5, mu),
  pp = Mu(0.5, 0.95, Se);
function Mu(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(on(e, t, r)));
}
function Cs(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function Ne(e, t) {
  Cs(e.x, t.x), Cs(e.y, t.y);
}
function xs(e, t, n, r, i) {
  return (
    (e -= t), (e = Hn(e, 1 / n, r)), i !== void 0 && (e = Hn(e, 1 / i, r)), e
  );
}
function mp(e, t = 0, n = 1, r = 0.5, i, o = e, s = e) {
  if (
    (He.test(t) &&
      ((t = parseFloat(t)), (t = de(s.min, s.max, t / 100) - s.min)),
    typeof t != "number")
  )
    return;
  let a = de(o.min, o.max, r);
  e === o && (a -= t),
    (e.min = xs(e.min, t, n, a, i)),
    (e.max = xs(e.max, t, n, a, i));
}
function As(e, t, [n, r, i], o, s) {
  mp(e, t[n], t[r], t[i], t.scale, o, s);
}
const gp = ["x", "scaleX", "originX"],
  yp = ["y", "scaleY", "originY"];
function _s(e, t, n, r) {
  As(e.x, t, gp, n ? n.x : void 0, r ? r.x : void 0),
    As(e.y, t, yp, n ? n.y : void 0, r ? r.y : void 0);
}
function ws(e) {
  return e.translate === 0 && e.scale === 1;
}
function Fu(e) {
  return ws(e.x) && ws(e.y);
}
function vp(e, t) {
  return (
    e.x.min === t.x.min &&
    e.x.max === t.x.max &&
    e.y.min === t.y.min &&
    e.y.max === t.y.max
  );
}
function Nu(e, t) {
  return (
    Math.round(e.x.min) === Math.round(t.x.min) &&
    Math.round(e.x.max) === Math.round(t.x.max) &&
    Math.round(e.y.min) === Math.round(t.y.min) &&
    Math.round(e.y.max) === Math.round(t.y.max)
  );
}
function Ds(e) {
  return Me(e.x) / Me(e.y);
}
class Ep {
  constructor() {
    this.members = [];
  }
  add(t) {
    qi(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (
      (Ki(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        r = o;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot &&
          ((t.snapshot = r.snapshot),
          (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(),
        r && r.options.onExitComplete && r.options.onExitComplete();
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
function Ps(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x,
    o = e.y.translate / t.y,
    s = (n == null ? void 0 : n.z) || 0;
  if (
    ((i || o || s) && (r = `translate3d(${i}px, ${o}px, ${s}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const { rotate: c, rotateX: l, rotateY: f, skewX: d, skewY: h } = n;
    c && (r += `rotate(${c}deg) `),
      l && (r += `rotateX(${l}deg) `),
      f && (r += `rotateY(${f}deg) `),
      d && (r += `skewX(${d}deg) `),
      h && (r += `skewY(${h}deg) `);
  }
  const a = e.x.scale * t.x,
    u = e.y.scale * t.y;
  return (a !== 1 || u !== 1) && (r += `scale(${a}, ${u})`), r || "none";
}
const bp = (e, t) => e.depth - t.depth;
class Tp {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    qi(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    Ki(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(bp),
      (this.isDirty = !1),
      this.children.forEach(t);
  }
}
function Sp(e, t) {
  const n = it.now(),
    r = ({ timestamp: i }) => {
      const o = i - n;
      o >= t && (at(r), e(o - t));
    };
  return Ee.read(r, !0), () => at(r);
}
function Cp(e) {
  window.MotionDebug && window.MotionDebug.record(e);
}
function xp(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
function Ap(e, t, n) {
  const r = xe(e) ? e : sn(e);
  return r.start(Yi("", r, t, n)), r.animation;
}
const xr = ["", "X", "Y", "Z"],
  _p = { visibility: "hidden" },
  Rs = 1e3;
let wp = 0;
const mt = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0,
};
function Ar(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function ju({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(s = {}, a = t == null ? void 0 : t()) {
      (this.id = wp++),
        (this.animationId = 0),
        (this.children = /* @__PURE__ */ new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = /* @__PURE__ */ new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            (mt.totalNodes =
              mt.resolvedTargetDeltas =
              mt.recalculatedProjection =
                0),
            this.nodes.forEach(Rp),
            this.nodes.forEach(Np),
            this.nodes.forEach(jp),
            this.nodes.forEach(Op),
            Cp(mt);
        }),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = /* @__PURE__ */ new Map()),
        (this.latestValues = s),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0);
      for (let u = 0; u < this.path.length; u++)
        this.path[u].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Tp());
    }
    addEventListener(s, a) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new Gi()),
        this.eventHandlers.get(s).add(a)
      );
    }
    notifyListeners(s, ...a) {
      const u = this.eventHandlers.get(s);
      u && u.notify(...a);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    /**
     * Lifecycles
     */
    mount(s, a = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = xp(s)), (this.instance = s);
      const { layoutId: u, layout: c, visualElement: l } = this.options;
      if (
        (l && !l.current && l.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        a && (c || u) && (this.isLayoutDirty = !0),
        e)
      ) {
        let f;
        const d = () => (this.root.updateBlockedByResize = !1);
        e(s, () => {
          (this.root.updateBlockedByResize = !0),
            f && f(),
            (f = Sp(d, 250)),
            Dn.hasAnimatedSinceResize &&
              ((Dn.hasAnimatedSinceResize = !1), this.nodes.forEach(Is));
        });
      }
      u && this.root.registerSharedNode(u, this),
        this.options.animate !== !1 &&
          l &&
          (u || c) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: f,
              hasLayoutChanged: d,
              hasRelativeTargetChanged: h,
              layout: p,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const m =
                  this.options.transition || l.getDefaultTransition() || Bp,
                { onLayoutAnimationStart: g, onLayoutAnimationComplete: v } =
                  l.getProps(),
                b = !this.targetLayout || !Nu(this.targetLayout, p) || h,
                E = !d && h;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                E ||
                (d && (b || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(f, E);
                const x = {
                  ...Vi(m, "layout"),
                  onPlay: g,
                  onComplete: v,
                };
                (l.shouldReduceMotion || this.options.layoutRoot) &&
                  ((x.delay = 0), (x.type = !1)),
                  this.startAnimation(x);
              } else
                d || Is(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = p;
            },
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const s = this.getStack();
      s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        at(this.updateProjection);
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
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(Lp),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let l = 0; l < this.path.length; l++) {
        const f = this.path[l];
        (f.shouldResetTransform = !0),
          f.updateScroll("snapshot"),
          f.options.layoutRoot && f.willUpdate(!1);
      }
      const { layoutId: a, layout: u } = this.options;
      if (a === void 0 && !u) return;
      const c = this.getTransformTemplate();
      (this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Os);
        return;
      }
      this.isUpdating || this.nodes.forEach(Mp),
        (this.isUpdating = !1),
        window.HandoffCancelAllAnimations &&
          window.HandoffCancelAllAnimations(),
        this.nodes.forEach(Fp),
        this.nodes.forEach(Dp),
        this.nodes.forEach(Pp),
        this.clearAllSnapshots();
      const a = it.now();
      (Te.delta = st(0, 1e3 / 60, a - Te.timestamp)),
        (Te.timestamp = a),
        (Te.isProcessing = !0),
        pr.update.process(Te),
        pr.preRender.process(Te),
        pr.render.process(Te),
        (Te.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Ai.read(() => this.update()));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Ip), this.sharedNodes.forEach(Vp);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        Ee.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ee.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let u = 0; u < this.path.length; u++) this.path[u].updateScroll();
      const s = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = pe()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a &&
        a.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          s ? s.layoutBox : void 0,
        );
    }
    updateScroll(s = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      this.scroll &&
        this.scroll.animationId === this.root.animationId &&
        this.scroll.phase === s &&
        (a = !1),
        a &&
          (this.scroll = {
            animationId: this.root.animationId,
            phase: s,
            isRoot: r(this.instance),
            offset: n(this.instance),
          });
    }
    resetTransform() {
      if (!i) return;
      const s = this.isLayoutDirty || this.shouldResetTransform,
        a = this.projectionDelta && !Fu(this.projectionDelta),
        u = this.getTransformTemplate(),
        c = u ? u(this.latestValues, "") : void 0,
        l = c !== this.prevTransformTemplateValue;
      s &&
        (a || pt(this.latestValues) || l) &&
        (i(this.instance, c),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(s = !0) {
      const a = this.measurePageBox();
      let u = this.removeElementScroll(a);
      return (
        s && (u = this.removeTransform(u)),
        Hp(u),
        {
          animationId: this.root.animationId,
          measuredBox: a,
          layoutBox: u,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: s } = this.options;
      if (!s) return pe();
      const a = s.measureViewportBox(),
        { scroll: u } = this.root;
      return u && (rt(a.x, u.offset.x), rt(a.y, u.offset.y)), a;
    }
    removeElementScroll(s) {
      const a = pe();
      Ne(a, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u],
          { scroll: l, options: f } = c;
        if (c !== this.root && l && f.layoutScroll) {
          if (l.isRoot) {
            Ne(a, s);
            const { scroll: d } = this.root;
            d && (rt(a.x, -d.offset.x), rt(a.y, -d.offset.y));
          }
          rt(a.x, l.offset.x), rt(a.y, l.offset.y);
        }
      }
      return a;
    }
    applyTransform(s, a = !1) {
      const u = pe();
      Ne(u, s);
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c];
        !a &&
          l.options.layoutScroll &&
          l.scroll &&
          l !== l.root &&
          Rt(u, {
            x: -l.scroll.offset.x,
            y: -l.scroll.offset.y,
          }),
          pt(l.latestValues) && Rt(u, l.latestValues);
      }
      return pt(this.latestValues) && Rt(u, this.latestValues), u;
    }
    removeTransform(s) {
      const a = pe();
      Ne(a, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        if (!c.instance || !pt(c.latestValues)) continue;
        ni(c.latestValues) && c.updateSnapshot();
        const l = pe(),
          f = c.measurePageBox();
        Ne(l, f),
          _s(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, l);
      }
      return pt(this.latestValues) && _s(a, this.latestValues), a;
    }
    setTargetDelta(s) {
      (this.targetDelta = s),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Te.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(s = !1) {
      var a;
      const u = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = u.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = u.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = u.isSharedProjectionDirty);
      const c = !!this.resumingFrom || this !== u;
      if (
        !(
          s ||
          (c && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((a = this.parent) === null || a === void 0) &&
            a.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget
        )
      )
        return;
      const { layout: f, layoutId: d } = this.options;
      if (!(!this.layout || !(f || d))) {
        if (
          ((this.resolvedRelativeTargetAt = Te.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const h = this.getClosestProjectingParent();
          h && h.layout && this.animationProgress !== 1
            ? ((this.relativeParent = h),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = pe()),
              (this.relativeTargetOrigin = pe()),
              Jt(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                h.layout.layoutBox,
              ),
              Ne(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = pe()), (this.targetWithTransforms = pe())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                Uh(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target,
                ))
              : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : Ne(this.target, this.layout.layoutBox),
                Du(this.target, this.targetDelta))
              : Ne(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const h = this.getClosestProjectingParent();
            h &&
            !!h.resumingFrom == !!this.resumingFrom &&
            !h.options.layoutScroll &&
            h.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = h),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = pe()),
                (this.relativeTargetOrigin = pe()),
                Jt(this.relativeTargetOrigin, this.target, h.target),
                Ne(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          mt.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          ni(this.parent.latestValues) ||
          wu(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var s;
      const a = this.getLead(),
        u = !!this.resumingFrom || this !== a;
      let c = !0;
      if (
        ((this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) &&
            s.isProjectionDirty)) &&
          (c = !1),
        u &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (c = !1),
        this.resolvedRelativeTargetAt === Te.timestamp && (c = !1),
        c)
      )
        return;
      const { layout: l, layoutId: f } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(l || f))
      )
        return;
      Ne(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x,
        h = this.treeScale.y;
      Jh(this.layoutCorrected, this.treeScale, this.path, u),
        a.layout &&
          !a.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((a.target = a.layout.layoutBox), (a.targetWithTransforms = pe()));
      const { target: p } = a;
      if (!p) {
        this.projectionTransform &&
          ((this.projectionDelta = Pt()),
          (this.projectionTransform = "none"),
          this.scheduleRender());
        return;
      }
      this.projectionDelta ||
        ((this.projectionDelta = Pt()),
        (this.projectionDeltaWithTransform = Pt()));
      const m = this.projectionTransform;
      Zt(this.projectionDelta, this.layoutCorrected, p, this.latestValues),
        (this.projectionTransform = Ps(this.projectionDelta, this.treeScale)),
        (this.projectionTransform !== m ||
          this.treeScale.x !== d ||
          this.treeScale.y !== h) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", p)),
        mt.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      if ((this.options.scheduleRender && this.options.scheduleRender(), s)) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    setAnimationOrigin(s, a = !1) {
      const u = this.snapshot,
        c = u ? u.latestValues : {},
        l = { ...this.latestValues },
        f = Pt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a);
      const d = pe(),
        h = u ? u.source : void 0,
        p = this.layout ? this.layout.source : void 0,
        m = h !== p,
        g = this.getStack(),
        v = !g || g.members.length <= 1,
        b = !!(m && !v && this.options.crossfade === !0 && !this.path.some($p));
      this.animationProgress = 0;
      let E;
      (this.mixTargetDelta = (x) => {
        const S = x / 1e3;
        Ms(f.x, s.x, S),
          Ms(f.y, s.y, S),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Jt(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            kp(this.relativeTarget, this.relativeTargetOrigin, d, S),
            E && vp(this.relativeTarget, E) && (this.isProjectionDirty = !1),
            E || (E = pe()),
            Ne(E, this.relativeTarget)),
          m &&
            ((this.animationValues = l), dp(l, c, this.latestValues, S, b, v)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = S);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(s) {
      this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (at(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Ee.update(() => {
          (Dn.hasAnimatedSinceResize = !0),
            (this.currentAnimation = Ap(0, Rs, {
              ...s,
              onUpdate: (a) => {
                this.mixTargetDelta(a), s.onUpdate && s.onUpdate(a);
              },
              onComplete: () => {
                s.onComplete && s.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const s = this.getStack();
      s && s.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Rs),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let {
        targetWithTransforms: a,
        target: u,
        layout: c,
        latestValues: l,
      } = s;
      if (!(!a || !u || !c)) {
        if (
          this !== s &&
          this.layout &&
          c &&
          Lu(this.options.animationType, this.layout.layoutBox, c.layoutBox)
        ) {
          u = this.target || pe();
          const f = Me(this.layout.layoutBox.x);
          (u.x.min = s.target.x.min), (u.x.max = u.x.min + f);
          const d = Me(this.layout.layoutBox.y);
          (u.y.min = s.target.y.min), (u.y.max = u.y.min + d);
        }
        Ne(a, u),
          Rt(a, l),
          Zt(this.projectionDeltaWithTransform, this.layoutCorrected, a, l);
      }
    }
    registerSharedNode(s, a) {
      this.sharedNodes.has(s) || this.sharedNodes.set(s, new Ep()),
        this.sharedNodes.get(s).add(a);
      const c = a.options.initialPromotionConfig;
      a.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity:
          c && c.shouldPreserveFollowOpacity
            ? c.shouldPreserveFollowOpacity(a)
            : void 0,
      });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      const { layoutId: a } = this.options;
      return a
        ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var s;
      const { layoutId: a } = this.options;
      return a
        ? (s = this.getStack()) === null || s === void 0
          ? void 0
          : s.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: s } = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: a, preserveFollowOpacity: u } = {}) {
      const c = this.getStack();
      c && c.promote(this, u),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a });
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options;
      if (!s) return;
      let a = !1;
      const { latestValues: u } = s;
      if (
        ((u.z ||
          u.rotate ||
          u.rotateX ||
          u.rotateY ||
          u.rotateZ ||
          u.skewX ||
          u.skewY) &&
          (a = !0),
        !a)
      )
        return;
      const c = {};
      u.z && Ar("z", s, c, this.animationValues);
      for (let l = 0; l < xr.length; l++)
        Ar(`rotate${xr[l]}`, s, c, this.animationValues),
          Ar(`skew${xr[l]}`, s, c, this.animationValues);
      s.render();
      for (const l in c)
        s.setStaticValue(l, c[l]),
          this.animationValues && (this.animationValues[l] = c[l]);
      s.scheduleRender();
    }
    getProjectionStyles(s) {
      var a, u;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return _p;
      const c = {
          visibility: "",
        },
        l = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (c.opacity = ""),
          (c.pointerEvents = _n(s == null ? void 0 : s.pointerEvents) || ""),
          (c.transform = l ? l(this.latestValues, "") : "none"),
          c
        );
      const f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        const m = {};
        return (
          this.options.layoutId &&
            ((m.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (m.pointerEvents = _n(s == null ? void 0 : s.pointerEvents) || "")),
          this.hasProjected &&
            !pt(this.latestValues) &&
            ((m.transform = l ? l({}, "") : "none"), (this.hasProjected = !1)),
          m
        );
      }
      const d = f.animationValues || f.latestValues;
      this.applyTransformsToTarget(),
        (c.transform = Ps(
          this.projectionDeltaWithTransform,
          this.treeScale,
          d,
        )),
        l && (c.transform = l(d, c.transform));
      const { x: h, y: p } = this.projectionDelta;
      (c.transformOrigin = `${h.origin * 100}% ${p.origin * 100}% 0`),
        f.animationValues
          ? (c.opacity =
              f === this
                ? (u =
                    (a = d.opacity) !== null && a !== void 0
                      ? a
                      : this.latestValues.opacity) !== null && u !== void 0
                  ? u
                  : 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : d.opacityExit)
          : (c.opacity =
              f === this
                ? d.opacity !== void 0
                  ? d.opacity
                  : ""
                : d.opacityExit !== void 0
                ? d.opacityExit
                : 0);
      for (const m in jn) {
        if (d[m] === void 0) continue;
        const { correct: g, applyTo: v } = jn[m],
          b = c.transform === "none" ? d[m] : g(d[m], f);
        if (v) {
          const E = v.length;
          for (let x = 0; x < E; x++) c[v[x]] = b;
        } else c[m] = b;
      }
      return (
        this.options.layoutId &&
          (c.pointerEvents =
            f === this
              ? _n(s == null ? void 0 : s.pointerEvents) || ""
              : "none"),
        c
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((s) => {
        var a;
        return (a = s.currentAnimation) === null || a === void 0
          ? void 0
          : a.stop();
      }),
        this.root.nodes.forEach(Os),
        this.root.sharedNodes.clear();
    }
  };
}
function Dp(e) {
  e.updateLayout();
}
function Pp(e) {
  var t;
  const n =
    ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
    e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout,
      { animationType: o } = e.options,
      s = n.source !== e.layout.source;
    o === "size"
      ? je((f) => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            h = Me(d);
          (d.min = r[f].min), (d.max = d.min + h);
        })
      : Lu(o, n.layoutBox, r) &&
        je((f) => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            h = Me(r[f]);
          (d.max = d.min + h),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[f].max = e.relativeTarget[f].min + h));
        });
    const a = Pt();
    Zt(a, r, n.layoutBox);
    const u = Pt();
    s ? Zt(u, e.applyTransform(i, !0), n.measuredBox) : Zt(u, r, n.layoutBox);
    const c = !Fu(a);
    let l = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const { snapshot: d, layout: h } = f;
        if (d && h) {
          const p = pe();
          Jt(p, n.layoutBox, d.layoutBox);
          const m = pe();
          Jt(m, r, h.layoutBox),
            Nu(p, m) || (l = !0),
            f.options.layoutRoot &&
              ((e.relativeTarget = m),
              (e.relativeTargetOrigin = p),
              (e.relativeParent = f));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: u,
      layoutDelta: a,
      hasLayoutChanged: c,
      hasRelativeTargetChanged: l,
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function Rp(e) {
  mt.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function Op(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function Ip(e) {
  e.clearSnapshot();
}
function Os(e) {
  e.clearMeasurements();
}
function Mp(e) {
  e.isLayoutDirty = !1;
}
function Fp(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform();
}
function Is(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function Np(e) {
  e.resolveTargetDelta();
}
function jp(e) {
  e.calcProjection();
}
function Lp(e) {
  e.resetSkewAndRotation();
}
function Vp(e) {
  e.removeLeadSnapshot();
}
function Ms(e, t, n) {
  (e.translate = de(t.translate, 0, n)),
    (e.scale = de(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function Fs(e, t, n, r) {
  (e.min = de(t.min, n.min, r)), (e.max = de(t.max, n.max, r));
}
function kp(e, t, n, r) {
  Fs(e.x, t.x, n.x, r), Fs(e.y, t.y, n.y, r);
}
function $p(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Bp = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
  },
  Ns = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  js = Ns("applewebkit/") && !Ns("chrome/") ? Math.round : Se;
function Ls(e) {
  (e.min = js(e.min)), (e.max = js(e.max));
}
function Hp(e) {
  Ls(e.x), Ls(e.y);
}
function Lu(e, t, n) {
  return (
    e === "position" || (e === "preserve-aspect" && !ei(Ds(t), Ds(n), 0.2))
  );
}
const Up = ju({
    attachResizeListener: (e, t) => Ye(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  _r = {
    current: void 0,
  },
  Vu = ju({
    measureScroll: (e) => ({
      x: e.scrollLeft,
      y: e.scrollTop,
    }),
    defaultParent: () => {
      if (!_r.current) {
        const e = new Up({});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (_r.current = e);
      }
      return _r.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  zp = {
    pan: {
      Feature: sp,
    },
    drag: {
      Feature: op,
      ProjectionNode: Vu,
      MeasureLayout: Ou,
    },
  },
  ii = { current: null },
  ku = { current: !1 };
function Wp() {
  if (((ku.current = !0), !!Si))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (ii.current = e.matches);
      e.addListener(t), t();
    } else ii.current = !1;
}
function Yp(e, t, n) {
  const { willChange: r } = t;
  for (const i in t) {
    const o = t[i],
      s = n[i];
    if (xe(o))
      e.addValue(i, o),
        Bn(r) && r.add(i),
        process.env.NODE_ENV === "development" &&
          Xi(
            o.version === "11.0.23",
            `Attempting to mix Framer Motion versions ${o.version} with 11.0.23 may not work as expected.`,
          );
    else if (xe(s)) e.addValue(i, sn(o, { owner: e })), Bn(r) && r.remove(i);
    else if (s !== o)
      if (e.hasValue(i)) {
        const a = e.getValue(i);
        !a.hasAnimated && a.set(o);
      } else {
        const a = e.getStaticValue(i);
        e.addValue(i, sn(a !== void 0 ? a : o, { owner: e }));
      }
  }
  for (const i in n) t[i] === void 0 && e.removeValue(i);
  return t;
}
const Vs = /* @__PURE__ */ new WeakMap(),
  qp = [...Za, Ce, ut],
  Kp = (e) => qp.find(Xa(e)),
  $u = Object.keys(rn),
  Gp = $u.length,
  ks = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
  ],
  Xp = wi.length;
class Zp {
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: r,
      reducedMotionConfig: i,
      blockInitialAnimation: o,
      visualState: s,
    },
    a = {},
  ) {
    (this.resolveKeyframes = (d, h, p, m) =>
      new this.KeyframeResolver(d, h, p, m, this)),
      (this.current = null),
      (this.children = /* @__PURE__ */ new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = /* @__PURE__ */ new Map()),
      (this.KeyframeResolver = ki),
      (this.features = {}),
      (this.valueSubscriptions = /* @__PURE__ */ new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.scheduleRender = () => Ee.render(this.render, !1, !0));
    const { latestValues: u, renderState: c } = s;
    (this.latestValues = u),
      (this.baseTarget = { ...u }),
      (this.initialValues = n.initial ? { ...u } : {}),
      (this.renderState = c),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = a),
      (this.blockInitialAnimation = !!o),
      (this.isControllingVariants = nr(n)),
      (this.isVariantNode = _a(n)),
      this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const { willChange: l, ...f } = this.scrapeMotionValuesFromProps(n, {});
    for (const d in f) {
      const h = f[d];
      u[d] !== void 0 && xe(h) && (h.set(u[d], !1), Bn(l) && l.add(d));
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
    (this.current = t),
      Vs.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      ku.current || Wp(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : ii.current),
      process.env.NODE_ENV !== "production" &&
        Xi(
          this.shouldReduceMotion !== !0,
          "You have Reduced Motion enabled on your device. Animations may not appear as expected.",
        ),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    Vs.delete(this.current),
      this.projection && this.projection.unmount(),
      at(this.notifyUpdate),
      at(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const t in this.events) this.events[t].clear();
    for (const t in this.features) this.features[t].unmount();
    this.current = null;
  }
  bindToMotionValue(t, n) {
    const r = Tt.has(t),
      i = n.on("change", (s) => {
        (this.latestValues[t] = s),
          this.props.onUpdate && Ee.preRender(this.notifyUpdate),
          r && this.projection && (this.projection.isTransformDirty = !0);
      }),
      o = n.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(t, () => {
      i(), o(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  loadFeatures({ children: t, ...n }, r, i, o) {
    let s, a;
    if (process.env.NODE_ENV !== "production" && i && r) {
      const u =
        "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
      n.ignoreStrict ? hn(!1, u) : Ue(!1, u);
    }
    for (let u = 0; u < Gp; u++) {
      const c = $u[u],
        {
          isEnabled: l,
          Feature: f,
          ProjectionNode: d,
          MeasureLayout: h,
        } = rn[c];
      d && (s = d),
        l(n) &&
          (!this.features[c] && f && (this.features[c] = new f(this)),
          h && (a = h));
    }
    if (
      (this.type === "html" || this.type === "svg") &&
      !this.projection &&
      s
    ) {
      this.projection = new s(
        this.latestValues,
        this.parent && this.parent.projection,
      );
      const {
        layoutId: u,
        layout: c,
        drag: l,
        dragConstraints: f,
        layoutScroll: d,
        layoutRoot: h,
      } = n;
      this.projection.setOptions({
        layoutId: u,
        layout: c,
        alwaysMeasureLayout: !!l || (f && wt(f)),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof c == "string" ? c : "both",
        initialPromotionConfig: o,
        layoutScroll: d,
        layoutRoot: h,
      });
    }
    return a;
  }
  updateFeatures() {
    for (const t in this.features) {
      const n = this.features[t];
      n.isMounted ? n.update() : (n.mount(), (n.isMounted = !0));
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
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : pe();
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
    (t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n);
    for (let r = 0; r < ks.length; r++) {
      const i = ks[r];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const o = t["on" + i];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    (this.prevMotionValues = Yp(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
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
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  getVariantContext(t = !1) {
    if (t) return this.parent ? this.parent.getVariantContext() : void 0;
    if (!this.isControllingVariants) {
      const r = this.parent ? this.parent.getVariantContext() || {} : {};
      return (
        this.props.initial !== void 0 && (r.initial = this.props.initial), r
      );
    }
    const n = {};
    for (let r = 0; r < Xp; r++) {
      const i = wi[r],
        o = this.props[i];
      (nn(o) || o === !1) && (n[i] = o);
    }
    return n;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(t),
        () => n.variantChildren.delete(t)
      );
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    n !== this.values.get(t) &&
      (this.removeValue(t), this.bindToMotionValue(t, n)),
      this.values.set(t, n),
      (this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = sn(n === null ? void 0 : n, { owner: this })),
        this.addValue(t, r)),
      r
    );
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    var r;
    let i =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (r = this.getBaseTargetFromProps(this.props, t)) !== null &&
          r !== void 0
        ? r
        : this.readValueFromInstance(this.current, t, this.options);
    return (
      i != null &&
        (typeof i == "string" && (Ka(i) || qa(i))
          ? (i = parseFloat(i))
          : !Kp(i) && ut.test(n) && (i = ou(t, n)),
        this.setBaseTarget(t, xe(i) ? i.get() : i)),
      xe(i) ? i.get() : i
    );
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
    const { initial: i } = this.props,
      o =
        typeof i == "string" || typeof i == "object"
          ? (r = Li(
              this.props,
              i,
              (n = this.presenceContext) === null || n === void 0
                ? void 0
                : n.custom,
            )) === null || r === void 0
            ? void 0
            : r[t]
          : void 0;
    if (i && o !== void 0) return o;
    const s = this.getBaseTargetFromProps(this.props, t);
    return s !== void 0 && !xe(s)
      ? s
      : this.initialValues[t] !== void 0 && o === void 0
      ? void 0
      : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Gi()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class Bu extends Zp {
  constructor() {
    super(...arguments), (this.KeyframeResolver = su);
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
function Jp(e) {
  return window.getComputedStyle(e);
}
class Qp extends Bu {
  constructor() {
    super(...arguments), (this.type = "html");
  }
  readValueFromInstance(t, n) {
    if (Tt.has(n)) {
      const r = Bi(n);
      return (r && r.default) || 0;
    } else {
      const r = Jp(t),
        i = (Ra(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Pu(t, n);
  }
  build(t, n, r, i) {
    Ii(t, n, r, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n) {
    return ji(t, n);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    xe(t) &&
      (this.childSubscription = t.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
  renderInstance(t, n, r, i) {
    Na(t, n, r, i);
  }
}
class em extends Bu {
  constructor() {
    super(...arguments), (this.type = "svg"), (this.isSVGTag = !1);
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (Tt.has(n)) {
      const r = Bi(n);
      return (r && r.default) || 0;
    }
    return (n = ja.has(n) ? n : xi(n)), t.getAttribute(n);
  }
  measureInstanceViewportBox() {
    return pe();
  }
  scrapeMotionValuesFromProps(t, n) {
    return Va(t, n);
  }
  build(t, n, r, i) {
    Fi(t, n, r, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    La(t, n, r, i);
  }
  mount(t) {
    (this.isSVGTag = Ni(t.tagName)), super.mount(t);
  }
}
const tm = (e, t) =>
    Pi(e)
      ? new em(t, { enableHardwareAcceleration: !1 })
      : new Qp(t, { enableHardwareAcceleration: !0 }),
  nm = {
    layout: {
      ProjectionNode: Vu,
      MeasureLayout: Ou,
    },
  },
  rm = {
    ...kh,
    ...Jf,
    ...zp,
    ...nm,
  },
  im = /* @__PURE__ */ uf((e, t) => kf(e, t, rm, tm));
function Hu() {
  const e = Re(!1);
  return (
    Ci(
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
function om() {
  const e = Hu(),
    [t, n] = ve(0),
    r = qe(() => {
      e.current && n(t + 1);
    }, [t]);
  return [qe(() => Ee.postRender(r), [r]), t];
}
class sm extends we.Component {
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
function am({ children: e, isPresent: t }) {
  const n = ci(),
    r = Re(null),
    i = Re({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: o } = ye(Ti);
  return (
    ua(() => {
      const { width: s, height: a, top: u, left: c } = i.current;
      if (t || !r.current || !s || !a) return;
      r.current.dataset.motionPopId = n;
      const l = document.createElement("style");
      return (
        o && (l.nonce = o),
        document.head.appendChild(l),
        l.sheet &&
          l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${a}px !important;
            top: ${u}px !important;
            left: ${c}px !important;
          }
        `),
        () => {
          document.head.removeChild(l);
        }
      );
    }, [t]),
    we.createElement(
      sm,
      { isPresent: t, childRef: r, sizeRef: i },
      we.cloneElement(e, { ref: r }),
    )
  );
}
const wr = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: i,
  presenceAffectsLayout: o,
  mode: s,
}) => {
  const a = ka(um),
    u = ci(),
    c = Je(
      () => ({
        id: u,
        initial: t,
        isPresent: n,
        custom: i,
        onExitComplete: (l) => {
          a.set(l, !0);
          for (const f of a.values()) if (!f) return;
          r && r();
        },
        register: (l) => (a.set(l, !1), () => a.delete(l)),
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      o ? void 0 : [n],
    );
  return (
    Je(() => {
      a.forEach((l, f) => a.set(f, !1));
    }, [n]),
    we.useEffect(() => {
      !n && !a.size && r && r();
    }, [n]),
    s === "popLayout" && (e = we.createElement(am, { isPresent: n }, e)),
    we.createElement(er.Provider, { value: c }, e)
  );
};
function um() {
  return /* @__PURE__ */ new Map();
}
function lm(e) {
  return De(() => () => e(), []);
}
const gt = (e) => e.key || "";
function cm(e, t) {
  e.forEach((n) => {
    const r = gt(n);
    t.set(r, n);
  });
}
function fm(e) {
  const t = [];
  return (
    Mt.forEach(e, (n) => {
      ca(n) && t.push(n);
    }),
    t
  );
}
const Uu = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    exitBeforeEnter: i,
    presenceAffectsLayout: o = !0,
    mode: s = "sync",
  }) => {
    Ue(!i, "Replace exitBeforeEnter with mode='wait'");
    const a = ye(Di).forceRender || om()[0],
      u = Hu(),
      c = fm(e);
    let l = c;
    const f = Re(/* @__PURE__ */ new Map()).current,
      d = Re(l),
      h = Re(/* @__PURE__ */ new Map()).current,
      p = Re(!0);
    if (
      (Ci(() => {
        (p.current = !1), cm(c, h), (d.current = l);
      }),
      lm(() => {
        (p.current = !0), h.clear(), f.clear();
      }),
      p.current)
    )
      return we.createElement(
        we.Fragment,
        null,
        l.map((b) =>
          we.createElement(
            wr,
            {
              key: gt(b),
              isPresent: !0,
              initial: n ? void 0 : !1,
              presenceAffectsLayout: o,
              mode: s,
            },
            b,
          ),
        ),
      );
    l = [...l];
    const m = d.current.map(gt),
      g = c.map(gt),
      v = m.length;
    for (let b = 0; b < v; b++) {
      const E = m[b];
      g.indexOf(E) === -1 && !f.has(E) && f.set(E, void 0);
    }
    return (
      s === "wait" && f.size && (l = []),
      f.forEach((b, E) => {
        if (g.indexOf(E) !== -1) return;
        const x = h.get(E);
        if (!x) return;
        const S = m.indexOf(E);
        let P = b;
        if (!P) {
          const I = () => {
            f.delete(E);
            const T = Array.from(h.keys()).filter((L) => !g.includes(L));
            if (
              (T.forEach((L) => h.delete(L)),
              (d.current = c.filter((L) => {
                const A = gt(L);
                return (
                  // filter out the node exiting
                  A === E || // filter out the leftover children
                  T.includes(A)
                );
              })),
              !f.size)
            ) {
              if (u.current === !1) return;
              a(), r && r();
            }
          };
          (P = we.createElement(
            wr,
            {
              key: gt(x),
              isPresent: !1,
              onExitComplete: I,
              custom: t,
              presenceAffectsLayout: o,
              mode: s,
            },
            x,
          )),
            f.set(E, P);
        }
        l.splice(S, 0, P);
      }),
      (l = l.map((b) => {
        const E = b.key;
        return f.has(E)
          ? b
          : we.createElement(
              wr,
              { key: gt(b), isPresent: !0, presenceAffectsLayout: o, mode: s },
              b,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        s === "wait" &&
        l.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      we.createElement(we.Fragment, null, f.size ? l : l.map((b) => Vl(b)))
    );
  },
  kt = "altimate-display-",
  dm = `${kt}-highlight`,
  $s = `${kt}-highlight-hover`,
  hm = `${kt}-active-highlight`,
  pm = 1049,
  Zi = ({ icon: e, className: t = "", ...n }) =>
    /* @__PURE__ */ F.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...n,
    }),
  mm = (e) => /* @__PURE__ */ F.jsx(Zi, { icon: "comment", ...e }),
  gm = (e) => /* @__PURE__ */ F.jsx(Zi, { icon: "check", ...e }),
  ym = (e) => /* @__PURE__ */ F.jsx(Zi, { icon: "send", ...e }),
  vm = "_iconButton_eti7u_1",
  Em = {
    iconButton: vm,
  },
  bm = (e) =>
    /* @__PURE__ */ F.jsx(_m, {
      title: e.title,
      children: /* @__PURE__ */ F.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${
          e.className ?? ""
        } ${Em.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  Tm = bm,
  Sm = et(null),
  Dr = {
    didCatch: !1,
    error: null,
  };
class Cm extends kl {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = Dr);
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
      for (var n, r, i = arguments.length, o = new Array(i), s = 0; s < i; s++)
        o[s] = arguments[s];
      (n = (r = this.props).onReset) === null ||
        n === void 0 ||
        n.call(r, {
          args: o,
          reason: "imperative-api",
        }),
        this.setState(Dr);
    }
  }
  componentDidCatch(t, n) {
    var r, i;
    (r = (i = this.props).onError) === null || r === void 0 || r.call(i, t, n);
  }
  componentDidUpdate(t, n) {
    const { didCatch: r } = this.state,
      { resetKeys: i } = this.props;
    if (r && n.error !== null && xm(t.resetKeys, i)) {
      var o, s;
      (o = (s = this.props).onReset) === null ||
        o === void 0 ||
        o.call(s, {
          next: i,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(Dr);
    }
  }
  render() {
    const {
        children: t,
        fallbackRender: n,
        FallbackComponent: r,
        fallback: i,
      } = this.props,
      { didCatch: o, error: s } = this.state;
    let a = t;
    if (o) {
      const u = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (typeof n == "function") a = n(u);
      else if (r) a = Lr(r, u);
      else if (i === null || ca(i)) a = i;
      else throw s;
    }
    return Lr(
      Sm.Provider,
      {
        value: {
          didCatch: o,
          error: s,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      a,
    );
  }
}
function xm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, r) => !Object.is(n, t[r]));
}
const Am = (e) => {
    const [t, n] = ve(!1),
      r = () => n(!t),
      i = Re(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ F.jsxs(Cm, {
      fallback: /* @__PURE__ */ F.jsx("span", {
        id: i.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ F.jsx("span", { id: i.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ F.jsx(Bl, {
              isOpen: t,
              target: i.current,
              toggle: r,
              className: e.className,
              children: e.title,
            })
          : null,
      ],
    });
  },
  _m = Am,
  wm = "_loadingBtn_gadec_1",
  Dm = {
    loadingBtn: wm,
  },
  Pm = ({ loading: e, ...t }) =>
    /* @__PURE__ */ F.jsx(ln, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${Dm.loadingBtn}`,
      children: e ? /* @__PURE__ */ F.jsx(Hl, {}) : t.children,
    }),
  Rm = Pm,
  Om = ({ pos: e, onAddComment: t }) =>
    hi(
      /* @__PURE__ */ F.jsx(Uu, {
        children:
          e &&
          /* @__PURE__ */ F.jsx(ln, {
            onClick: t,
            id: `${kt}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: pm + 5,
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
              color: "#fff",
            },
            children: /* @__PURE__ */ F.jsx(mm, {}),
          }),
      }),
      e.element.parentElement,
    ),
  Im = Om,
  Mm = () => {
    const {
        state: { isRightPanelOpen: e },
      } = Kc(),
      t = Ve(),
      n = () => {
        t(Ei(!e));
      };
    return /* @__PURE__ */ F.jsx(ln, {
      onClick: n,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  Fm = Mm,
  $t = {
    get: async (e, t, n) => ({}),
    post: async (e, t, n) => ({}),
  },
  Nm = (e) => $t.get(`dbt/dbt_docs_share/${e}`),
  jm = (e, t) => $t.post(`dbt/dbt_docs_share/${e}/conversation_group`, t),
  Lm = (e, t, n) =>
    $t.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, n),
  Vm = (e) => $t.get(`dbt/dbt_docs_share/${e}/conversations`),
  km = (e) => $t.get("/users/", { company: e }),
  $m = (e, t) =>
    $t.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
    }),
  Bm = () => {
    const e = fe((s) => s.shareId),
      [t, n] = ve(null),
      [r, i] = ve(!1),
      o = qe(async () => {
        if (!e) return;
        i(!0);
        const s = await Nm(e);
        if (s) {
          n(s);
          const a = document.getElementById("collapse-sidebar");
          a == null || a.click();
        }
        i(!1);
      }, [e]);
    return (
      De(() => {
        !e || t || r || o();
      }, [e, t, o, r]),
      { shareDetails: t, loading: r }
    );
  };
var zu = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(window, function () {
    return (function (n) {
      var r = {};
      function i(o) {
        if (r[o]) return r[o].exports;
        var s = (r[o] = { i: o, l: !1, exports: {} });
        return n[o].call(s.exports, s, s.exports, i), (s.l = !0), s.exports;
      }
      return (
        (i.m = n),
        (i.c = r),
        (i.d = function (o, s, a) {
          i.o(o, s) || Object.defineProperty(o, s, { enumerable: !0, get: a });
        }),
        (i.r = function (o) {
          typeof Symbol < "u" &&
            Symbol.toStringTag &&
            Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(o, "__esModule", { value: !0 });
        }),
        (i.t = function (o, s) {
          if (
            (1 & s && (o = i(o)),
            8 & s || (4 & s && typeof o == "object" && o && o.__esModule))
          )
            return o;
          var a = /* @__PURE__ */ Object.create(null);
          if (
            (i.r(a),
            Object.defineProperty(a, "default", { enumerable: !0, value: o }),
            2 & s && typeof o != "string")
          )
            for (var u in o)
              i.d(
                a,
                u,
                function (c) {
                  return o[c];
                }.bind(null, u),
              );
          return a;
        }),
        (i.n = function (o) {
          var s =
            o && o.__esModule
              ? function () {
                  return o.default;
                }
              : function () {
                  return o;
                };
          return i.d(s, "a", s), s;
        }),
        (i.o = function (o, s) {
          return Object.prototype.hasOwnProperty.call(o, s);
        }),
        (i.p = ""),
        i((i.s = 7))
      );
    })([
      function (n, r, i) {
        var o,
          s =
            (this && this.__extends) ||
            ((o = function (f, d) {
              return (o =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (h, p) {
                    h.__proto__ = p;
                  }) ||
                function (h, p) {
                  for (var m in p)
                    Object.prototype.hasOwnProperty.call(p, m) && (h[m] = p[m]);
                })(f, d);
            }),
            function (f, d) {
              function h() {
                this.constructor = f;
              }
              o(f, d),
                (f.prototype =
                  d === null
                    ? Object.create(d)
                    : ((h.prototype = d.prototype), new h()));
            }),
          a =
            (this && this.__importDefault) ||
            function (f) {
              return f && f.__esModule ? f : { default: f };
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
        var u = a(i(10)),
          c = a(i(2));
        (r.ID_DIVISION = ";"),
          (r.LOCAL_STORE_KEY = "highlight-mengshou"),
          (r.STYLESHEET_ID = "highlight-mengshou-style"),
          (r.DATASET_IDENTIFIER = "highlight-id"),
          (r.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra"),
          (r.DATASET_SPLIT_TYPE = "highlight-split-type"),
          (r.CAMEL_DATASET_IDENTIFIER = u.default(r.DATASET_IDENTIFIER)),
          (r.CAMEL_DATASET_IDENTIFIER_EXTRA = u.default(
            r.DATASET_IDENTIFIER_EXTRA,
          )),
          (r.CAMEL_DATASET_SPLIT_TYPE = u.default(r.DATASET_SPLIT_TYPE)),
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
        var l = (function (f) {
          function d() {
            return (f !== null && f.apply(this, arguments)) || this;
          }
          return s(d, f), d;
        })(c.default);
        r.eventEmitter = new l();
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.UserInputEvent =
            r.SelectedNodeType =
            r.CreateFrom =
            r.EventType =
            r.ERROR =
            r.SplitType =
              void 0),
          (function (o) {
            (o.none = "none"),
              (o.head = "head"),
              (o.tail = "tail"),
              (o.both = "both");
          })(r.SplitType || (r.SplitType = {})),
          (function (o) {
            (o.DOM_TYPE_ERROR = "[DOM] Receive wrong node type."),
              (o.DOM_SELECTION_EMPTY =
                "[DOM] The selection contains no dom node, may be you except them."),
              (o.RANGE_INVALID =
                "[RANGE] Got invalid dom range, can't convert to a valid highlight range."),
              (o.RANGE_NODE_INVALID =
                "[RANGE] Start or end node isn't a text node, it may occur an error."),
              (o.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict."),
              (o.CACHE_SET_ERROR =
                "[CACHE] Cache.data can't be set manually, please use .save()."),
              (o.SOURCE_TYPE_ERROR =
                "[SOURCE] Object isn't a highlight source instance."),
              (o.HIGHLIGHT_RANGE_FROZEN =
                "[HIGHLIGHT_RANGE] A highlight range must be frozen before render."),
              (o.HIGHLIGHT_SOURCE_RECREATE =
                "[HIGHLIGHT_SOURCE] Recreate highlights from sources error."),
              (o.HIGHLIGHT_SOURCE_NONE_RENDER =
                "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.");
          })(r.ERROR || (r.ERROR = {})),
          (function (o) {
            (o.CREATE = "selection:create"),
              (o.REMOVE = "selection:remove"),
              (o.MODIFY = "selection:modify"),
              (o.HOVER = "selection:hover"),
              (o.HOVER_OUT = "selection:hover-out"),
              (o.CLICK = "selection:click");
          })(r.EventType || (r.EventType = {})),
          (function (o) {
            (o.STORE = "from-store"), (o.INPUT = "from-input");
          })(r.CreateFrom || (r.CreateFrom = {})),
          (function (o) {
            (o.text = "text"), (o.span = "span");
          })(r.SelectedNodeType || (r.SelectedNodeType = {})),
          (function (o) {
            (o.touchend = "touchend"),
              (o.mouseup = "mouseup"),
              (o.touchstart = "touchstart"),
              (o.click = "click"),
              (o.mouseover = "mouseover");
          })(r.UserInputEvent || (r.UserInputEvent = {}));
      },
      function (n, r, i) {
        var o =
            (this && this.__read) ||
            function (u, c) {
              var l = typeof Symbol == "function" && u[Symbol.iterator];
              if (!l) return u;
              var f,
                d,
                h = l.call(u),
                p = [];
              try {
                for (; (c === void 0 || c-- > 0) && !(f = h.next()).done; )
                  p.push(f.value);
              } catch (m) {
                d = { error: m };
              } finally {
                try {
                  f && !f.done && (l = h.return) && l.call(h);
                } finally {
                  if (d) throw d.error;
                }
              }
              return p;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var u = [], c = 0; c < arguments.length; c++)
                u = u.concat(o(arguments[c]));
              return u;
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var a = (function () {
          function u() {
            this.handlersMap = /* @__PURE__ */ Object.create(null);
          }
          return (
            (u.prototype.on = function (c, l) {
              return (
                this.handlersMap[c] || (this.handlersMap[c] = []),
                this.handlersMap[c].push(l),
                this
              );
            }),
            (u.prototype.off = function (c, l) {
              return (
                this.handlersMap[c] &&
                  this.handlersMap[c].splice(
                    this.handlersMap[c].indexOf(l) >>> 0,
                    1,
                  ),
                this
              );
            }),
            (u.prototype.emit = function (c) {
              for (var l = [], f = 1; f < arguments.length; f++)
                l[f - 1] = arguments[f];
              return (
                this.handlersMap[c] &&
                  this.handlersMap[c].slice().forEach(function (d) {
                    d.apply(void 0, s(l));
                  }),
                this
              );
            }),
            u
          );
        })();
        r.default = a;
      },
      function (n, r, i) {
        var o =
          (this && this.__importDefault) ||
          function (c) {
            return c && c.__esModule ? c : { default: c };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = o(i(5)),
          a = i(9),
          u = (function () {
            function c(l, f, d, h, p) {
              (this.startMeta = l),
                (this.endMeta = f),
                (this.text = d),
                (this.id = h),
                (this.__isHighlightSource = {}),
                p && (this.extra = p);
            }
            return (
              (c.prototype.deSerialize = function (l, f) {
                var d = a.queryElementNode(this, l),
                  h = d.start,
                  p = d.end,
                  m = a.getTextChildByOffset(h, this.startMeta.textOffset),
                  g = a.getTextChildByOffset(p, this.endMeta.textOffset);
                if (!f.Serialize.Restore.isEmpty()) {
                  var v = f.Serialize.Restore.call(this, m, g) || [];
                  (m = v[0] || m), (g = v[1] || g);
                }
                return new s.default(m, g, this.text, this.id, !0);
              }),
              c
            );
          })();
        r.default = u;
      },
      function (n, r, i) {
        var o =
            (this && this.__values) ||
            function (l) {
              var f = typeof Symbol == "function" && Symbol.iterator,
                d = f && l[f],
                h = 0;
              if (d) return d.call(l);
              if (l && typeof l.length == "number")
                return {
                  next: function () {
                    return (
                      l && h >= l.length && (l = void 0),
                      { value: l && l[h++], done: !l }
                    );
                  },
                };
              throw new TypeError(
                f
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          s =
            (this && this.__read) ||
            function (l, f) {
              var d = typeof Symbol == "function" && l[Symbol.iterator];
              if (!d) return l;
              var h,
                p,
                m = d.call(l),
                g = [];
              try {
                for (; (f === void 0 || f-- > 0) && !(h = m.next()).done; )
                  g.push(h.value);
              } catch (v) {
                p = { error: v };
              } finally {
                try {
                  h && !h.done && (d = m.return) && d.call(m);
                } finally {
                  if (p) throw p.error;
                }
              }
              return g;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var l = [], f = 0; f < arguments.length; f++)
                l = l.concat(s(arguments[f]));
              return l;
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
        var u = i(0);
        r.isHighlightWrapNode = function (l) {
          return !!l.dataset && !!l.dataset[u.CAMEL_DATASET_IDENTIFIER];
        };
        var c = function (l, f) {
          for (var d = !1, h = null; l; ) {
            if ((r.isHighlightWrapNode(l) && (h = l), l === f)) {
              d = !0;
              break;
            }
            l = l.parentNode;
          }
          return d ? h : null;
        };
        (r.getHighlightId = function (l, f) {
          return (l = c(l, f)) ? l.dataset[u.CAMEL_DATASET_IDENTIFIER] : "";
        }),
          (r.getExtraHighlightId = function (l, f) {
            return (l = c(l, f))
              ? l.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA]
                  .split(u.ID_DIVISION)
                  .filter(function (d) {
                    return d;
                  })
              : [];
          }),
          (r.getHighlightsByRoot = function (l, f) {
            var d, h;
            Array.isArray(l) || (l = [l]);
            var p = [];
            try {
              for (var m = o(l), g = m.next(); !g.done; g = m.next()) {
                var v = g.value.querySelectorAll(
                  f + "[data-" + u.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, v);
              }
            } catch (b) {
              d = { error: b };
            } finally {
              try {
                g && !g.done && (h = m.return) && h.call(m);
              } finally {
                if (d) throw d.error;
              }
            }
            return p;
          }),
          (r.getHighlightById = function (l, f, d) {
            var h,
              p,
              m = [],
              g = new RegExp(
                "(" +
                  f +
                  "\\" +
                  u.ID_DIVISION +
                  "|\\" +
                  u.ID_DIVISION +
                  "?" +
                  f +
                  "$)",
              ),
              v = l.querySelectorAll(d + "[data-" + u.DATASET_IDENTIFIER + "]");
            try {
              for (var b = o(v), E = b.next(); !E.done; E = b.next()) {
                var x = E.value;
                if (x.dataset[u.CAMEL_DATASET_IDENTIFIER] !== f) {
                  var S = x.dataset[u.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  g.test(S) && m.push(x);
                } else m.push(x);
              }
            } catch (P) {
              h = { error: P };
            } finally {
              try {
                E && !E.done && (p = b.return) && p.call(b);
              } finally {
                if (h) throw h.error;
              }
            }
            return m;
          }),
          (r.forEach = function (l, f) {
            for (var d = 0; d < l.length; d++) f(l[d], d, l);
          }),
          (r.removeEventListener = function (l, f, d) {
            l.removeEventListener(f, d);
          }),
          (r.addEventListener = function (l, f, d) {
            return (
              l.addEventListener(f, d),
              function () {
                r.removeEventListener(l, f, d);
              }
            );
          }),
          (r.addClass = function (l, f) {
            var d;
            Array.isArray(f) || (f = [f]), (d = l.classList).add.apply(d, a(f));
          }),
          (r.removeClass = function (l, f) {
            l.classList.remove(f);
          }),
          (r.removeAllClass = function (l) {
            l.className = "";
          }),
          (r.hasClass = function (l, f) {
            return l.classList.contains(f);
          });
      },
      function (n, r, i) {
        var o =
          (this && this.__importDefault) ||
          function (h) {
            return h && h.__esModule ? h : { default: h };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = o(i(3)),
          a = i(1),
          u = i(11),
          c = o(i(6)),
          l = i(12),
          f = i(0),
          d = (function () {
            function h(p, m, g, v, b) {
              b === void 0 && (b = !1),
                (p.$node.nodeType === 3 && m.$node.nodeType === 3) ||
                  f.eventEmitter.emit(f.INTERNAL_ERROR_EVENT, {
                    type: a.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = l.formatDomNode(p)),
                (this.end = l.formatDomNode(m)),
                (this.text = g),
                (this.frozen = b),
                (this.id = v);
            }
            return (
              (h.fromSelection = function (p) {
                var m = u.getDomRange();
                if (!m) return null;
                var g = { $node: m.startContainer, offset: m.startOffset },
                  v = { $node: m.endContainer, offset: m.endOffset },
                  b = m.toString(),
                  E = p.call(g, v, b);
                return new h(g, v, b, (E = E ?? c.default()));
              }),
              (h.prototype.serialize = function (p, m) {
                var g,
                  v = l.getDomMeta(this.start.$node, this.start.offset, p),
                  b = l.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  m.Serialize.RecordInfo.isEmpty() ||
                    (g = m.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new s.default(v, b, this.text, this.id, g)
                );
              }),
              (h.removeDomRange = u.removeSelection),
              h
            );
          })();
        r.default = d;
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = function o(s) {
            return s
              ? (s ^ ((16 * Math.random()) >> (s / 4))).toString(16)
              : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, o);
          });
      },
      function (n, r, i) {
        n.exports = i(8);
      },
      function (n, r, i) {
        var o,
          s =
            (this && this.__extends) ||
            ((o = function (S, P) {
              return (o =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (I, T) {
                    I.__proto__ = T;
                  }) ||
                function (I, T) {
                  for (var L in T)
                    Object.prototype.hasOwnProperty.call(T, L) && (I[L] = T[L]);
                })(S, P);
            }),
            function (S, P) {
              function I() {
                this.constructor = S;
              }
              o(S, P),
                (S.prototype =
                  P === null
                    ? Object.create(P)
                    : ((I.prototype = P.prototype), new I()));
            }),
          a =
            (this && this.__assign) ||
            function () {
              return (a =
                Object.assign ||
                function (S) {
                  for (var P, I = 1, T = arguments.length; I < T; I++)
                    for (var L in (P = arguments[I]))
                      Object.prototype.hasOwnProperty.call(P, L) &&
                        (S[L] = P[L]);
                  return S;
                }).apply(this, arguments);
            },
          u =
            (this && this.__importDefault) ||
            function (S) {
              return S && S.__esModule ? S : { default: S };
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var c = u(i(2)),
          l = u(i(5)),
          f = u(i(3)),
          d = u(i(6)),
          h = u(i(13)),
          p = u(i(14)),
          m = u(i(16)),
          g = u(i(17)),
          v = i(0),
          b = i(1),
          E = i(4),
          x = (function (S) {
            function P(I) {
              var T = S.call(this) || this;
              (T.event = p.default()),
                (T.run = function () {
                  return E.addEventListener(
                    T.options.$root,
                    T.event.PointerEnd,
                    T._handleSelection,
                  );
                }),
                (T.stop = function () {
                  E.removeEventListener(
                    T.options.$root,
                    T.event.PointerEnd,
                    T._handleSelection,
                  );
                }),
                (T.addClass = function (A, j) {
                  T.getDoms(j).forEach(function (X) {
                    E.addClass(X, A);
                  });
                }),
                (T.removeClass = function (A, j) {
                  T.getDoms(j).forEach(function (X) {
                    E.removeClass(X, A);
                  });
                }),
                (T.getIdByDom = function (A) {
                  return E.getHighlightId(A, T.options.$root);
                }),
                (T.getExtraIdByDom = function (A) {
                  return E.getExtraHighlightId(A, T.options.$root);
                }),
                (T.getDoms = function (A) {
                  return A
                    ? E.getHighlightById(T.options.$root, A, T.options.wrapTag)
                    : E.getHighlightsByRoot(T.options.$root, T.options.wrapTag);
                }),
                (T.dispose = function () {
                  var A = T.options.$root;
                  E.removeEventListener(
                    A,
                    T.event.PointerOver,
                    T._handleHighlightHover,
                  ),
                    E.removeEventListener(
                      A,
                      T.event.PointerEnd,
                      T._handleSelection,
                    ),
                    E.removeEventListener(
                      A,
                      T.event.PointerTap,
                      T._handleHighlightClick,
                    ),
                    T.removeAll();
                }),
                (T.setOption = function (A) {
                  (T.options = a(a({}, T.options), A)),
                    (T.painter = new g.default(
                      {
                        $root: T.options.$root,
                        wrapTag: T.options.wrapTag,
                        className: T.options.style.className,
                        exceptSelectors: T.options.exceptSelectors,
                      },
                      T.hooks,
                    ));
                }),
                (T.fromRange = function (A) {
                  var j = { $node: A.startContainer, offset: A.startOffset },
                    X = { $node: A.endContainer, offset: A.endOffset },
                    q = A.toString(),
                    M = T.hooks.Render.UUID.call(j, X, q);
                  M = M ?? d.default();
                  var w = new l.default(j, X, q, M);
                  return w
                    ? T._highlightFromHRange(w)
                    : (v.eventEmitter.emit(v.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (T.fromStore = function (A, j, X, q, M) {
                  var w = new f.default(A, j, X, q, M);
                  try {
                    return T._highlightFromHSource(w), w;
                  } catch (_) {
                    return (
                      v.eventEmitter.emit(v.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.HIGHLIGHT_SOURCE_RECREATE,
                        error: _,
                        detail: w,
                      }),
                      null
                    );
                  }
                }),
                (T._getHooks = function () {
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
                (T._highlightFromHRange = function (A) {
                  var j = A.serialize(T.options.$root, T.hooks);
                  return T.painter.highlightRange(A).length === 0
                    ? (v.eventEmitter.emit(v.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (T.cache.save(j),
                      T.emit(
                        b.EventType.CREATE,
                        { sources: [j], type: b.CreateFrom.INPUT },
                        T,
                      ),
                      j);
                }),
                (T._handleSelection = function () {
                  var A = l.default.fromSelection(T.hooks.Render.UUID);
                  A && (T._highlightFromHRange(A), l.default.removeDomRange());
                }),
                (T._handleHighlightHover = function (A) {
                  var j = A.target;
                  if (!E.isHighlightWrapNode(j))
                    return (
                      T._hoverId &&
                        T.emit(b.EventType.HOVER_OUT, { id: T._hoverId }, T, A),
                      void (T._hoverId = null)
                    );
                  var X = E.getHighlightId(j, T.options.$root);
                  T._hoverId !== X &&
                    (T._hoverId &&
                      T.emit(b.EventType.HOVER_OUT, { id: T._hoverId }, T, A),
                    (T._hoverId = X),
                    T.emit(b.EventType.HOVER, { id: T._hoverId }, T, A));
                }),
                (T._handleError = function (A) {
                  T.options.verbose && console.warn(A);
                }),
                (T._handleHighlightClick = function (A) {
                  var j = A.target;
                  if (E.isHighlightWrapNode(j)) {
                    var X = E.getHighlightId(j, T.options.$root);
                    T.emit(b.EventType.CLICK, { id: X }, T, A);
                  }
                }),
                (T.options = v.getDefaultOptions()),
                (T.hooks = T._getHooks()),
                T.setOption(I),
                (T.cache = new m.default());
              var L = T.options.$root;
              return (
                E.addEventListener(
                  L,
                  T.event.PointerOver,
                  T._handleHighlightHover,
                ),
                E.addEventListener(
                  L,
                  T.event.PointerTap,
                  T._handleHighlightClick,
                ),
                v.eventEmitter.on(v.INTERNAL_ERROR_EVENT, T._handleError),
                T
              );
            }
            return (
              s(P, S),
              (P.prototype.remove = function (I) {
                if (I) {
                  var T = this.painter.removeHighlight(I);
                  this.cache.remove(I),
                    T && this.emit(b.EventType.REMOVE, { ids: [I] }, this);
                }
              }),
              (P.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var I = this.cache.removeAll();
                this.emit(b.EventType.REMOVE, { ids: I }, this);
              }),
              (P.prototype._highlightFromHSource = function (I) {
                I === void 0 && (I = []);
                var T = this.painter.highlightSource(I);
                this.emit(
                  b.EventType.CREATE,
                  { sources: T, type: b.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(I);
              }),
              (P.event = b.EventType),
              (P.isHighlightWrapNode = E.isHighlightWrapNode),
              (P.isHighlightSource = function (I) {
                return !!I.__isHighlightSource;
              }),
              P
            );
          })(c.default);
        r.default = x;
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.queryElementNode = r.getTextChildByOffset = void 0);
        var o = i(0);
        (r.getTextChildByOffset = function (s, a) {
          for (var u = [s], c = null, l = 0, f = 0; (c = u.pop()); ) {
            for (var d = c.childNodes, h = d.length - 1; h >= 0; h--)
              u.push(d[h]);
            if (
              c.nodeType === 3 &&
              ((f = a - l), (l += c.textContent.length) >= a)
            )
              break;
          }
          return c || (c = s), { $node: c, offset: f };
        }),
          (r.queryElementNode = function (s, a) {
            return {
              start:
                s.startMeta.parentIndex === o.ROOT_IDX
                  ? a
                  : a.getElementsByTagName(s.startMeta.parentTagName)[
                      s.startMeta.parentIndex
                    ],
              end:
                s.endMeta.parentIndex === o.ROOT_IDX
                  ? a
                  : a.getElementsByTagName(s.endMeta.parentTagName)[
                      s.endMeta.parentIndex
                    ],
            };
          });
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = function (o) {
            return o.split("-").reduce(function (s, a, u) {
              return s + (u === 0 ? a : a[0].toUpperCase() + a.slice(1));
            }, "");
          });
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.removeSelection = r.getDomRange = void 0),
          (r.getDomRange = function () {
            var o = window.getSelection();
            return o.isCollapsed
              ? (console.debug("no text selected"), null)
              : o.getRangeAt(0);
          }),
          (r.removeSelection = function () {
            window.getSelection().removeAllRanges();
          });
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.formatDomNode = r.getDomMeta = void 0);
        var o = i(0);
        (r.getDomMeta = function (s, a, u) {
          var c = (function (d) {
              if (
                d instanceof HTMLElement &&
                (!d.dataset || !d.dataset[o.CAMEL_DATASET_IDENTIFIER])
              )
                return d;
              for (
                var h = d.parentNode;
                h != null && h.dataset[o.CAMEL_DATASET_IDENTIFIER];

              )
                h = h.parentNode;
              return h;
            })(s),
            l =
              c === u
                ? o.ROOT_IDX
                : (function (d, h) {
                    for (
                      var p = d.tagName, m = h.getElementsByTagName(p), g = 0;
                      g < m.length;
                      g++
                    )
                      if (d === m[g]) return g;
                    return o.UNKNOWN_IDX;
                  })(c, u),
            f = (function (d, h) {
              for (var p = [d], m = null, g = 0; (m = p.pop()); ) {
                for (var v = m.childNodes, b = v.length - 1; b >= 0; b--)
                  p.push(v[b]);
                if (m.nodeType === 3 && m !== h) g += m.textContent.length;
                else if (m.nodeType === 3) break;
              }
              return g;
            })(c, s);
          return {
            parentTagName: c.tagName,
            parentIndex: l,
            textOffset: f + a,
          };
        }),
          (r.formatDomNode = function (s) {
            return s.$node.nodeType === 3 ||
              s.$node.nodeType === 4 ||
              s.$node.nodeType === 8
              ? s
              : { $node: s.$node.childNodes[s.offset], offset: 0 };
          });
      },
      function (n, r, i) {
        var o =
            (this && this.__read) ||
            function (u, c) {
              var l = typeof Symbol == "function" && u[Symbol.iterator];
              if (!l) return u;
              var f,
                d,
                h = l.call(u),
                p = [];
              try {
                for (; (c === void 0 || c-- > 0) && !(f = h.next()).done; )
                  p.push(f.value);
              } catch (m) {
                d = { error: m };
              } finally {
                try {
                  f && !f.done && (l = h.return) && l.call(h);
                } finally {
                  if (d) throw d.error;
                }
              }
              return p;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var u = [], c = 0; c < arguments.length; c++)
                u = u.concat(o(arguments[c]));
              return u;
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var a = (function () {
          function u(c) {
            (this.name = ""), (this.ops = []), (this.name = c);
          }
          return (
            (u.prototype.tap = function (c) {
              var l = this;
              return (
                this.ops.indexOf(c) === -1 && this.ops.push(c),
                function () {
                  l.remove(c);
                }
              );
            }),
            (u.prototype.remove = function (c) {
              var l = this.ops.indexOf(c);
              l < 0 || this.ops.splice(l, 1);
            }),
            (u.prototype.isEmpty = function () {
              return this.ops.length === 0;
            }),
            (u.prototype.call = function () {
              for (var c, l = [], f = 0; f < arguments.length; f++)
                l[f] = arguments[f];
              return (
                this.ops.forEach(function (d) {
                  c = d.apply(void 0, s(l));
                }),
                c
              );
            }),
            u
          );
        })();
        r.default = a;
      },
      function (n, r, i) {
        var o =
          (this && this.__importDefault) ||
          function (u) {
            return u && u.__esModule ? u : { default: u };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = i(1),
          a = o(i(15));
        r.default = function () {
          var u = a.default(window.navigator.userAgent);
          return {
            PointerEnd: u
              ? s.UserInputEvent.touchend
              : s.UserInputEvent.mouseup,
            PointerTap: u
              ? s.UserInputEvent.touchstart
              : s.UserInputEvent.click,
            PointerOver: u
              ? s.UserInputEvent.touchstart
              : s.UserInputEvent.mouseover,
          };
        };
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o =
          /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
        r.default = function (s) {
          return o.test(s);
        };
      },
      function (n, r, i) {
        var o,
          s =
            (this && this.__extends) ||
            ((o = function (d, h) {
              return (o =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (p, m) {
                    p.__proto__ = m;
                  }) ||
                function (p, m) {
                  for (var g in m)
                    Object.prototype.hasOwnProperty.call(m, g) && (p[g] = m[g]);
                })(d, h);
            }),
            function (d, h) {
              function p() {
                this.constructor = d;
              }
              o(d, h),
                (d.prototype =
                  h === null
                    ? Object.create(h)
                    : ((p.prototype = h.prototype), new p()));
            }),
          a =
            (this && this.__values) ||
            function (d) {
              var h = typeof Symbol == "function" && Symbol.iterator,
                p = h && d[h],
                m = 0;
              if (p) return p.call(d);
              if (d && typeof d.length == "number")
                return {
                  next: function () {
                    return (
                      d && m >= d.length && (d = void 0),
                      { value: d && d[m++], done: !d }
                    );
                  },
                };
              throw new TypeError(
                h
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          u =
            (this && this.__importDefault) ||
            function (d) {
              return d && d.__esModule ? d : { default: d };
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var c = u(i(2)),
          l = i(1),
          f = (function (d) {
            function h() {
              var p = (d !== null && d.apply(this, arguments)) || this;
              return (p._data = /* @__PURE__ */ new Map()), p;
            }
            return (
              s(h, d),
              Object.defineProperty(h.prototype, "data", {
                get: function () {
                  return this.getAll();
                },
                set: function (p) {
                  throw l.ERROR.CACHE_SET_ERROR;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (h.prototype.save = function (p) {
                var m = this;
                Array.isArray(p)
                  ? p.forEach(function (g) {
                      return m._data.set(g.id, g);
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
                  m,
                  g = [];
                try {
                  for (
                    var v = a(this._data), b = v.next();
                    !b.done;
                    b = v.next()
                  ) {
                    var E = b.value;
                    g.push(E[1]);
                  }
                } catch (x) {
                  p = { error: x };
                } finally {
                  try {
                    b && !b.done && (m = v.return) && m.call(v);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return g;
              }),
              (h.prototype.removeAll = function () {
                var p,
                  m,
                  g = [];
                try {
                  for (
                    var v = a(this._data), b = v.next();
                    !b.done;
                    b = v.next()
                  ) {
                    var E = b.value;
                    g.push(E[0]);
                  }
                } catch (x) {
                  p = { error: x };
                } finally {
                  try {
                    b && !b.done && (m = v.return) && m.call(v);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return (this._data = /* @__PURE__ */ new Map()), g;
              }),
              h
            );
          })(c.default);
        r.default = f;
      },
      function (n, r, i) {
        var o =
            (this && this.__values) ||
            function (g) {
              var v = typeof Symbol == "function" && Symbol.iterator,
                b = v && g[v],
                E = 0;
              if (b) return b.call(g);
              if (g && typeof g.length == "number")
                return {
                  next: function () {
                    return (
                      g && E >= g.length && (g = void 0),
                      { value: g && g[E++], done: !g }
                    );
                  },
                };
              throw new TypeError(
                v
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          s =
            (this && this.__read) ||
            function (g, v) {
              var b = typeof Symbol == "function" && g[Symbol.iterator];
              if (!b) return g;
              var E,
                x,
                S = b.call(g),
                P = [];
              try {
                for (; (v === void 0 || v-- > 0) && !(E = S.next()).done; )
                  P.push(E.value);
              } catch (I) {
                x = { error: I };
              } finally {
                try {
                  E && !E.done && (b = S.return) && b.call(S);
                } finally {
                  if (x) throw x.error;
                }
              }
              return P;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var g = [], v = 0; v < arguments.length; v++)
                g = g.concat(s(arguments[v]));
              return g;
            },
          u =
            (this && this.__importDefault) ||
            function (g) {
              return g && g.__esModule ? g : { default: g };
            };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var c = u(i(3)),
          l = i(18),
          f = i(4),
          d = i(1),
          h = i(20),
          p = i(0),
          m = (function () {
            function g(v, b) {
              (this.options = {
                $root: v.$root,
                wrapTag: v.wrapTag,
                exceptSelectors: v.exceptSelectors,
                className: v.className,
              }),
                (this.hooks = b),
                h.initDefaultStylesheet();
            }
            return (
              (g.prototype.highlightRange = function (v) {
                var b = this;
                if (!v.frozen) throw d.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var E = this.options,
                  x = E.$root,
                  S = E.className,
                  P = E.exceptSelectors,
                  I = this.hooks,
                  T = l.getSelectedNodes(x, v.start, v.end, P);
                return (
                  I.Render.SelectedNodes.isEmpty() ||
                    (T = I.Render.SelectedNodes.call(v.id, T) || []),
                  T.map(function (L) {
                    var A = l.wrapHighlight(L, v, S, b.options.wrapTag);
                    return (
                      I.Render.WrapNode.isEmpty() ||
                        (A = I.Render.WrapNode.call(v.id, A)),
                      A
                    );
                  })
                );
              }),
              (g.prototype.highlightSource = function (v) {
                var b = this,
                  E = Array.isArray(v) ? v : [v],
                  x = [];
                return (
                  E.forEach(function (S) {
                    if (S instanceof c.default) {
                      var P = S.deSerialize(b.options.$root, b.hooks);
                      b.highlightRange(P).length > 0
                        ? x.push(S)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: d.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: S,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: d.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  x
                );
              }),
              (g.prototype.removeHighlight = function (v) {
                var b,
                  E,
                  x = new RegExp(
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
                  S = this.hooks,
                  P = this.options.wrapTag,
                  I = document.querySelectorAll(
                    P + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  T = [],
                  L = [],
                  A = [];
                try {
                  for (var j = o(I), X = j.next(); !X.done; X = j.next()) {
                    var q = X.value,
                      M = q.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      w = q.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    M !== v || w
                      ? M === v
                        ? L.push(q)
                        : M !== v && x.test(w) && A.push(q)
                      : T.push(q);
                  }
                } catch (_) {
                  b = { error: _ };
                } finally {
                  try {
                    X && !X.done && (E = j.return) && E.call(j);
                  } finally {
                    if (b) throw b.error;
                  }
                }
                return (
                  T.forEach(function (_) {
                    var O = _.parentNode,
                      D = document.createDocumentFragment();
                    f.forEach(_.childNodes, function (R) {
                      return D.appendChild(R.cloneNode(!1));
                    });
                    var $ = _.previousSibling,
                      C = _.nextSibling;
                    O.replaceChild(D, _),
                      l.normalizeSiblingText($, !0),
                      l.normalizeSiblingText(C, !1),
                      S.Remove.UpdateNodes.call(v, _, "remove");
                  }),
                  L.forEach(function (_) {
                    var O = _.dataset,
                      D = O[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      $ = D.shift(),
                      C = document.querySelector(
                        P + "[data-" + p.DATASET_IDENTIFIER + '="' + $ + '"]',
                      );
                    C && (f.removeAllClass(_), f.addClass(_, a(C.classList))),
                      (O[p.CAMEL_DATASET_IDENTIFIER] = $),
                      (O[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = D.join(
                        p.ID_DIVISION,
                      )),
                      S.Remove.UpdateNodes.call(v, _, "id-update");
                  }),
                  A.forEach(function (_) {
                    var O = _.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (_.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = O.replace(
                      x,
                      "",
                    )),
                      S.Remove.UpdateNodes.call(v, _, "extra-update");
                  }),
                  T.length + L.length + A.length !== 0
                );
              }),
              (g.prototype.removeAllHighlight = function () {
                var v = this.options,
                  b = v.wrapTag,
                  E = v.$root;
                f.getHighlightsByRoot(E, b).forEach(function (x) {
                  var S = x.parentNode,
                    P = document.createDocumentFragment();
                  f.forEach(x.childNodes, function (I) {
                    return P.appendChild(I.cloneNode(!1));
                  }),
                    S.replaceChild(P, x);
                });
              }),
              g
            );
          })();
        r.default = m;
      },
      function (n, r, i) {
        var o =
            (this && this.__read) ||
            function (p, m) {
              var g = typeof Symbol == "function" && p[Symbol.iterator];
              if (!g) return p;
              var v,
                b,
                E = g.call(p),
                x = [];
              try {
                for (; (m === void 0 || m-- > 0) && !(v = E.next()).done; )
                  x.push(v.value);
              } catch (S) {
                b = { error: S };
              } finally {
                try {
                  v && !v.done && (g = E.return) && g.call(E);
                } finally {
                  if (b) throw b.error;
                }
              }
              return x;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var p = [], m = 0; m < arguments.length; m++)
                p = p.concat(o(arguments[m]));
              return p;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.normalizeSiblingText =
            r.wrapHighlight =
            r.getSelectedNodes =
              void 0);
        var a = i(1),
          u = i(4),
          c = i(0),
          l = i(19),
          f = function (p, m) {
            if (!p) return !1;
            if (/^\./.test(m)) {
              var g = m.replace(/^\./, "");
              return p && u.hasClass(p, g);
            }
            if (/^#/.test(m)) {
              var v = m.replace(/^#/, "");
              return p && p.id === v;
            }
            var b = m.toUpperCase();
            return p && p.tagName === b;
          };
        r.getSelectedNodes = function (p, m, g, v) {
          var b = m.$node,
            E = g.$node,
            x = m.offset,
            S = g.offset;
          if (b === E && b instanceof Text)
            return (function (M, w, _, O) {
              for (
                var D = M,
                  $ = function (R) {
                    return O == null
                      ? void 0
                      : O.some(function (H) {
                          return f(R, H);
                        });
                  };
                D;

              ) {
                if (D.nodeType === 1 && $(D)) return [];
                D = D.parentNode;
              }
              M.splitText(w);
              var C = M.nextSibling;
              return (
                C.splitText(_ - w),
                [
                  {
                    $node: C,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.both,
                  },
                ]
              );
            })(b, x, S, v);
          for (
            var P = [p],
              I = [],
              T = function (M) {
                return v == null
                  ? void 0
                  : v.some(function (w) {
                      return f(M, w);
                    });
              },
              L = !1,
              A = null;
            (A = P.pop());

          )
            if (A.nodeType !== 1 || !T(A)) {
              for (var j = A.childNodes, X = j.length - 1; X >= 0; X--)
                P.push(j[X]);
              if (A === b) {
                if (A.nodeType === 3) {
                  A.splitText(x);
                  var q = A.nextSibling;
                  I.push({
                    $node: q,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.head,
                  });
                }
                L = !0;
              } else {
                if (A === E) {
                  A.nodeType === 3 &&
                    ((q = A).splitText(S),
                    I.push({
                      $node: q,
                      type: a.SelectedNodeType.text,
                      splitType: a.SplitType.tail,
                    }));
                  break;
                }
                L &&
                  A.nodeType === 3 &&
                  I.push({
                    $node: A,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.none,
                  });
              }
            }
          return I;
        };
        var d = function (p, m) {
            var g = Array.isArray(m) ? m : [m];
            return (
              (g =
                g.length === 0
                  ? [c.getDefaultOptions().style.className]
                  : g).forEach(function (v) {
                u.addClass(p, v);
              }),
              p
            );
          },
          h = function (p) {
            return !p || !p.textContent;
          };
        (r.wrapHighlight = function (p, m, g, v) {
          var b = p.$node.parentNode,
            E = p.$node.previousSibling,
            x = p.$node.nextSibling;
          return u.isHighlightWrapNode(b)
            ? !u.isHighlightWrapNode(b) || (h(E) && h(x))
              ? (function (S, P, I) {
                  var T = S.$node.parentNode,
                    L = T;
                  u.removeAllClass(L), d(L, I);
                  var A = T.dataset,
                    j = A[c.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (A[c.CAMEL_DATASET_IDENTIFIER] = P.id),
                    (A[c.CAMEL_DATASET_IDENTIFIER_EXTRA] = A[
                      c.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? j + c.ID_DIVISION + A[c.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : j),
                    L
                  );
                })(p, m, g)
              : (function (S, P, I, T) {
                  var L = document.createElement(T),
                    A = S.$node.parentNode,
                    j = S.$node.previousSibling,
                    X = S.$node.nextSibling,
                    q = document.createDocumentFragment(),
                    M = A.dataset[c.CAMEL_DATASET_IDENTIFIER],
                    w = A.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    _ = w ? M + c.ID_DIVISION + w : M;
                  L.setAttribute("data-" + c.DATASET_IDENTIFIER, P.id),
                    L.setAttribute("data-" + c.DATASET_IDENTIFIER_EXTRA, _),
                    L.appendChild(S.$node.cloneNode(!1));
                  var O,
                    D = !1,
                    $ = !1;
                  j &&
                    (((C = A.cloneNode(!1)).textContent = j.textContent),
                    q.appendChild(C),
                    (D = !0));
                  var C,
                    R = [];
                  return (
                    Array.isArray(I) ? R.push.apply(R, s(I)) : R.push(I),
                    d(L, l.unique(R)),
                    q.appendChild(L),
                    X &&
                      (((C = A.cloneNode(!1)).textContent = X.textContent),
                      q.appendChild(C),
                      ($ = !0)),
                    (O =
                      D && $
                        ? a.SplitType.both
                        : D
                        ? a.SplitType.head
                        : $
                        ? a.SplitType.tail
                        : a.SplitType.none),
                    L.setAttribute("data-" + c.DATASET_SPLIT_TYPE, O),
                    A.parentNode.replaceChild(q, A),
                    L
                  );
                })(p, m, g, v)
            : (function (S, P, I, T) {
                var L = document.createElement(T);
                return (
                  d(L, I),
                  L.appendChild(S.$node.cloneNode(!1)),
                  S.$node.parentNode.replaceChild(L, S.$node),
                  L.setAttribute("data-" + c.DATASET_IDENTIFIER, P.id),
                  L.setAttribute("data-" + c.DATASET_SPLIT_TYPE, S.splitType),
                  L.setAttribute("data-" + c.DATASET_IDENTIFIER_EXTRA, ""),
                  L
                );
              })(p, m, g, v);
        }),
          (r.normalizeSiblingText = function (p, m) {
            if ((m === void 0 && (m = !0), p && p.nodeType === 3)) {
              var g = m ? p.nextSibling : p.previousSibling;
              if (g.nodeType === 3) {
                var v = g.nodeValue;
                (p.nodeValue = m ? p.nodeValue + v : v + p.nodeValue),
                  g.parentNode.removeChild(g);
              }
            }
          });
      },
      function (n, r, i) {
        var o =
          (this && this.__values) ||
          function (s) {
            var a = typeof Symbol == "function" && Symbol.iterator,
              u = a && s[a],
              c = 0;
            if (u) return u.call(s);
            if (s && typeof s.length == "number")
              return {
                next: function () {
                  return (
                    s && c >= s.length && (s = void 0),
                    { value: s && s[c++], done: !s }
                  );
                },
              };
            throw new TypeError(
              a ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.unique = void 0),
          (r.unique = function (s) {
            var a,
              u,
              c = [];
            try {
              for (var l = o(s), f = l.next(); !f.done; f = l.next()) {
                var d = f.value;
                c.indexOf(d) === -1 && c.push(d);
              }
            } catch (h) {
              a = { error: h };
            } finally {
              try {
                f && !f.done && (u = l.return) && u.call(l);
              } finally {
                if (a) throw a.error;
              }
            }
            return c;
          });
      },
      function (n, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.initDefaultStylesheet = void 0);
        var o = i(0);
        r.initDefaultStylesheet = function () {
          var s = o.STYLESHEET_ID,
            a = document.getElementById(s);
          if (!a) {
            var u = document.createTextNode(o.getStylesheet());
            ((a = document.createElement("style")).id = s),
              a.appendChild(u),
              document.head.appendChild(a);
          }
          return a;
        };
      },
    ]).default;
  });
})(zu);
var Hm = zu.exports;
const Wu = /* @__PURE__ */ qn(Hm),
  Ot = new Wu({
    style: {
      className: dm,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Ji = new Wu({
    style: {
      className: hm,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Yu = (e, t) =>
    t.filter((n) => {
      var r;
      return ((r = n.$node.nodeValue) == null ? void 0 : r.trim()) !== "";
    }),
  qu = (e, t, n) => {
    const r = t,
      i = n,
      o = ["BR", "HR"];
    return (
      o.includes(r.$node.nodeName) &&
        r.$node.parentNode &&
        (r.$node = r.$node.parentNode),
      o.includes(i.$node.nodeName) &&
        i.$node.parentNode &&
        (i.$node = i.$node.parentNode),
      [r, i]
    );
  };
Ot.hooks.Render.SelectedNodes.tap(Yu);
Ot.hooks.Serialize.Restore.tap(qu);
Ji.hooks.Render.SelectedNodes.tap(Yu);
Ji.hooks.Serialize.Restore.tap(qu);
Ot.on("selection:hover", ({ id: e }) => {
  Ot.addClass($s, e);
}).on("selection:hover-out", ({ id: e }) => {
  Ot.removeClass($s, e);
});
const Um = (e) => {
    var t, n;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((n = e.meta) == null ? void 0 : n.highlight)
      : null;
  },
  zm = (e) => {
    const t = Um(e);
    t && (Ot.remove(t.id), Ji.remove(t.id));
  },
  Un = () => {
    var e, t, n;
    return (n =
      (t =
        (e = document.getElementById("code")) == null
          ? void 0
          : e.parentElement) == null
        ? void 0
        : t.querySelector("code-block")) == null
      ? void 0
      : n.querySelector("code");
  },
  Wm = () => {
    const e = fe((l) =>
        l.selectedConversationId
          ? l.conversations[l.selectedConversationId]
          : null,
      ),
      t = fe((l) => l.docsAppRendered),
      n = fe((l) => l.newConversation),
      r = Ve(),
      [i, o] = ve(null),
      [s, a] = ve(null);
    De(() => {
      n && (o(null), a(null));
    }, [n]);
    const u = qe(() => {
      console.log("resetHighlights"), i && zm(i), a(null), o(null);
    }, [i]);
    return (
      De(() => {
        !e ||
          !t ||
          (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`);
      }, [e, t, r]),
      {
        getHighlightedSelectionData: () => i,
        pos: s,
        onSelectionEnd: () => {
          var I, T, L;
          const l = document.getSelection();
          if (!l || !l.rangeCount) return u(), null;
          const d = l.getRangeAt(0).toString(),
            h =
              (T = (I = Un()) == null ? void 0 : I.parentElement) == null
                ? void 0
                : T.querySelector(".altimate-code-block"),
            p = h == null ? void 0 : h.innerText;
          if (!d || !p) return;
          const m = d.split(`
`),
            g = p.split(`
`);
          let v = 0,
            b = 0;
          for (let A = 0; A < g.length; A++)
            if (g[A].trim().includes(m[0].trim())) {
              for (let j = 1; j < m.length; j++)
                g[A + j].trim().includes(m[j].trim());
              (v = A), (b = v + m.length - 1);
            }
          console.log("start and end lines found", v, b);
          const E = h.querySelectorAll("code .linenumber")[b],
            x = window.location.hash.split("#"),
            S =
              (L = x.find((A) => A.startsWith("!"))) == null
                ? void 0
                : L.split("/");
          if (!S || S.length < 3) {
            console.error("Unable to find model parts", x, S);
            return;
          }
          console.log("model parts found", S);
          const P = {
            meta: {
              highlight: d,
              uniqueId: S[2],
              resource_type: S[1],
              range: {
                end: { line: b, character: 0 },
                start: { line: v, character: 0 },
              },
            },
          };
          a({
            x: E.offsetLeft,
            y: E.offsetTop,
            element: h,
          }),
            o(P);
        },
      }
    );
  },
  Ym = la(({ onClick: e, rect: t }, n) =>
    /* @__PURE__ */ F.jsx(Uu, {
      children:
        t &&
        /* @__PURE__ */ F.jsx(im.div, {
          ref: n,
          onClick: (r) => e(r.nativeEvent),
          id: `${kt}highlight-blocker`,
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
            transition: "all 0.15s cubic-bezier(0, 0, 1, 1)",
          },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }),
    }),
  ),
  qm = [
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
    "textarea",
  ],
  Km = (e) =>
    e.hasAttribute("altimate-anchor") && e.id !== `${kt}highlight-blocker`,
  Gm = (e) =>
    document != null && document.body
      ? document.body.contains(e)
      : (console.error(
          "Error in utils isElementInsideBody: document or document.body is not available",
        ),
        !1),
  Xm = (e) => {
    if (qm.includes(e.tagName.toLowerCase()) || e.nodeType === Node.TEXT_NODE)
      return !0;
    {
      let t = !1;
      return (
        e.childNodes.forEach((n) => {
          var r;
          n.nodeType === Node.TEXT_NODE &&
            ((r = n.textContent) == null ? void 0 : r.trim()) !== "" &&
            (t = !0);
        }),
        t
      );
    }
  },
  Zm = (e, t) => {
    try {
      const n = document.elementsFromPoint(e, t);
      let r = [],
        i = !1;
      n.forEach((s) => {
        Km(s) ? ((r = []), (i = !0)) : Gm(s) && Xm(s) && r.push(s);
      });
      let o = 0;
      return !r.length || i
        ? null
        : (r.forEach((s, a) => {
            s.tagName.toLowerCase() === "svg" && (o = a);
          }),
          r[o]);
    } catch (n) {
      return (
        console.error(
          "Error in CommentService getBackgroundElement: ",
          void 0,
          n,
        ),
        null
      );
    }
  },
  Jm = () => {
    const e = Ve(),
      [t, n] = ve(!1),
      [r, i] = ve(null),
      o = qe((c) => {
        const l = Zm(c.clientX, c.clientY);
        i(l ? l.getBoundingClientRect() : null);
      }, []);
    De(
      () => (
        document.body.removeEventListener("pointermove", o),
        t && document.body.addEventListener("pointermove", o),
        () => {
          document.body.removeEventListener("pointermove", o);
        }
      ),
      [t, o],
    );
    const s = qe((c) => {
        c && console.log(c);
      }, []),
      a = qe(
        (c) => {
          c.preventDefault(),
            c.stopPropagation(),
            e(
              Sa({
                meta: {
                  highlight: "",
                  range: {
                    start: { line: 0, character: 0 },
                    end: { line: 0, character: 0 },
                  },
                  resource_type: "",
                  uniqueId: "",
                },
              }),
            ),
            n(!1);
        },
        [e],
      ),
      u = (c) => {
        c.stopPropagation(), c.preventDefault(), n(!0);
      };
    return /* @__PURE__ */ F.jsxs(F.Fragment, {
      children: [
        t &&
          /* @__PURE__ */ F.jsx(Ym, {
            onClick: a,
            rect: r,
            ref: s,
          }),
        /* @__PURE__ */ F.jsx(ln, {
          onClick: u,
          style: { zIndex: 1, marginRight: "1rem" },
          children: "Add comment",
        }),
      ],
    });
  },
  Qm = Jm,
  eg = ({ conversationGroup: e, codeSection: t }) => {
    const n = fe((a) => a.selectedConversationId),
      r = Ve(),
      i = Re(null),
      o = () => {
        r(vi(e.conversation_group_id));
      },
      s = Je(() => {
        if (!t) return;
        let a = 0,
          u = 0;
        for (let c = e.meta.range.start.line; c <= e.meta.range.end.line; c++) {
          const l = t.querySelector(
            `.line-numbers-rows > span:nth-child(${c + 1})`,
          );
          l &&
            (c === e.meta.range.start.line && (a = l.offsetTop),
            c === e.meta.range.end.line && (u = l.offsetTop + l.offsetHeight));
        }
        return { top: a, bottom: u };
      }, [t, e.meta.range.end.line, e.meta.range.start.line]);
    return (
      De(() => {
        var a;
        n &&
          ((a = i.current) == null ||
            a.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [n]),
      !s || !(t != null && t.parentElement)
        ? null
        : hi(
            /* @__PURE__ */ F.jsx("div", {
              ref: i,
              className: `altimate-highlighter ${
                n === e.conversation_group_id ? "active" : ""
              }`,
              style: { top: s.top + 15, height: s.bottom - s.top },
              onClick: o,
            }),
            t.parentElement,
          )
    );
  },
  tg = eg,
  ng = () => {
    const e = fe((o) => Object.values(o.conversations || {})),
      t = fe((o) => o.codeblockLoaded),
      n = fe((o) => o.currentPage),
      r =
        e == null
          ? void 0
          : e.filter(
              (o) =>
                o.meta.resource_type === n.resourceType &&
                o.meta.uniqueId === n.name,
            );
    if (!(r != null && r.length) || !t) return null;
    const i = Un();
    return /* @__PURE__ */ F.jsx(F.Fragment, {
      children: r.map((o) =>
        /* @__PURE__ */ F.jsx(
          tg,
          {
            codeSection: i,
            conversationGroup: o,
          },
          o.conversation_group_id,
        ),
      ),
    });
  },
  Ku = ng,
  rg = ({ code: e, language: t }) =>
    /* @__PURE__ */ F.jsx("div", {
      className: "altimate-code-block",
      children: /* @__PURE__ */ F.jsx(Yl, {
        showLineNumbers: !0,
        text: e,
        theme: ql,
        language: t,
      }),
    }),
  ig = rg;
let Pr;
const og = (e) => {
    ["mouseup", "selectionchange"].map((t) => {
      (e || document).addEventListener(t.toString(), (n) => {
        console.log(n, window.getSelection()),
          Pr && n.type == "selectionchange" && clearTimeout(Pr),
          (Pr = setTimeout(function () {
            var r;
            n.type == "mouseup" &&
              ((r = window.getSelection()) == null ? void 0 : r.toString()) !=
                "" &&
              (e || document).dispatchEvent(
                new CustomEvent("selectionend", { detail: {} }),
              );
          }, 100));
      });
    });
  },
  sg = ({ onSelectionEnd: e }) => {
    const [t, n] = ve(""),
      r = fe((s) => s.codeblockLoaded);
    if (
      (De(() => {
        if (!r) return;
        const s = Un(),
          a = (s == null ? void 0 : s.innerText) || "";
        n(a);
      }, [r]),
      !r)
    )
      return null;
    const i = (s) => {
        var a, u;
        s &&
          (og(s),
          s.removeEventListener("selectionend", e),
          s.addEventListener("selectionend", e),
          (u =
            (a = o == null ? void 0 : o.parentElement) == null
              ? void 0
              : a.querySelector(".highlight")) == null ||
            u.classList.add("hide"));
      },
      o = Un();
    return !(o != null && o.parentElement) || !t
      ? (console.log(o), null)
      : hi(
          /* @__PURE__ */ F.jsxs("div", {
            ref: i,
            children: [
              /* @__PURE__ */ F.jsx(ig, { code: t, language: "sql" }),
              /* @__PURE__ */ F.jsx(Ku, {}),
            ],
          }),
          o.parentElement,
        );
  },
  ag = sg,
  ug = "_dbtDocs_u8ty1_1",
  lg = "_conversationRightPanelCloseButton_u8ty1_14",
  cg = "_conversationRightPanel_u8ty1_14",
  fg = "_newConversationForm_u8ty1_46",
  dg = "_highlightText_u8ty1_59",
  hg = "_conversationInputForm_u8ty1_65",
  pg = "_conversationGroup_u8ty1_91",
  mg = "_replyForm_u8ty1_123",
  gg = "_resolveButton_u8ty1_145",
  lt = {
    dbtDocs: ug,
    conversationRightPanelCloseButton: lg,
    conversationRightPanel: cg,
    newConversationForm: fg,
    highlightText: dg,
    conversationInputForm: hg,
    conversationGroup: pg,
    replyForm: mg,
    resolveButton: gg,
  },
  yg = "_profileImage_11vaf_1",
  vg = {
    profileImage: yg,
  },
  Eg = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ F.jsx("div", {
      className: vg.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  Gu = Eg;
function bg(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function Tg(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function Sg() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function zn(e) {
  return bg(e) || Tg(e) || Sg();
}
function Le() {
  return (
    (Le =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }),
    Le.apply(this, arguments)
  );
}
function Cg(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Bs(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function xg(e, t, n) {
  return t && Bs(e.prototype, t), n && Bs(e, n), e;
}
function ne(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function oi(e, t) {
  return (
    (oi =
      Object.setPrototypeOf ||
      function (r, i) {
        return (r.__proto__ = i), r;
      }),
    oi(e, t)
  );
}
function Ag(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && oi(e, t);
}
function It(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (It = function (n) {
          return typeof n;
        })
      : (It = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : typeof n;
        }),
    It(e)
  );
}
function Pn(e) {
  return (
    typeof Symbol == "function" && It(Symbol.iterator) === "symbol"
      ? (Pn = function (n) {
          return It(n);
        })
      : (Pn = function (n) {
          return n &&
            typeof Symbol == "function" &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : It(n);
        }),
    Pn(e)
  );
}
function _g(e, t) {
  return t && (Pn(t) === "object" || typeof t == "function") ? t : ne(e);
}
function Wn(e) {
  return (
    (Wn = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Wn(e)
  );
}
function te(e, t, n) {
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
var wg = function (e, t, n, r, i, o, s, a) {
    if (process.env.NODE_ENV !== "production" && t === void 0)
      throw new Error("invariant requires an error message argument");
    if (!e) {
      var u;
      if (t === void 0)
        u = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var c = [n, r, i, o, s, a],
          l = 0;
        (u = new Error(
          t.replace(/%s/g, function () {
            return c[l++];
          }),
        )),
          (u.name = "Invariant Violation");
      }
      throw ((u.framesToPop = 1), u);
    }
  },
  Dg = wg;
const Lt = /* @__PURE__ */ qn(Dg);
function Pg(e) {
  if (Array.isArray(e)) return e;
}
function Rg(e, t) {
  var n = [],
    r = !0,
    i = !1,
    o = void 0;
  try {
    for (
      var s = e[Symbol.iterator](), a;
      !(r = (a = s.next()).done) && (n.push(a.value), !(t && n.length === t));
      r = !0
    );
  } catch (u) {
    (i = !0), (o = u);
  } finally {
    try {
      !r && s.return != null && s.return();
    } finally {
      if (i) throw o;
    }
  }
  return n;
}
function Og() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function Yn(e, t) {
  return Pg(e) || Rg(e, t) || Og();
}
function Ig(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Mg(e, t) {
  if (e == null) return {};
  var n = Ig(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function an(e) {
  "@babel/helpers - typeof";
  return (
    (an =
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
    an(e)
  );
}
function Fg(e, t) {
  if (an(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (an(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ng(e) {
  var t = Fg(e, "string");
  return an(t) == "symbol" ? t : t + "";
}
function un(e, t, n) {
  return (
    (t = Ng(t)),
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
function si(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function jg(e) {
  if (Array.isArray(e)) return si(e);
}
function Lg(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function Vg(e, t) {
  if (e) {
    if (typeof e == "string") return si(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return si(e, t);
  }
}
function kg() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function We(e) {
  return jg(e) || Lg(e) || Vg(e) || kg();
}
var Bt = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  Xu = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function Zu(e, t) {
  var n = Object.assign({}, e);
  return (
    Rn(e) &&
      Rn(t) &&
      Bt(t).forEach(function (r) {
        Rn(t[r])
          ? r in e
            ? (n[r] = Zu(e[r], t[r]))
            : Object.assign(n, un({}, r, t[r]))
          : Object.assign(n, un({}, r, t[r]));
      }),
    n
  );
}
var ai = function (t) {
    for (
      var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
      i < n;
      i++
    )
      r[i - 1] = arguments[i];
    return r.reduce(function (o, s) {
      return Zu(o, s);
    }, t);
  },
  $g = function (t, n) {
    var r = Object.assign({}, t);
    if (n) for (var i = 0; i < n.length; i++) delete r[n[i]];
    return r;
  },
  Rn = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  Bg = function (t) {
    return (t || []).filter(Boolean);
  },
  Qi = function (t) {
    return t[0] === "&";
  },
  Hg = function (t) {
    return !Qi(t);
  },
  Hs = function (t) {
    return t.replace(/-(\w)/g, function (n, r) {
      return r.toUpperCase();
    });
  },
  Ug = function (t) {
    for (
      var n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        r = Bt(t),
        i = {},
        o = 0,
        s = r.length;
      o < s;
      o += 1
    ) {
      var a = r[o],
        u =
          Object.prototype.toString.call(t[a]) !== "[object Object]" || // style defs
          a[0] === ":" || // pseudo selectors
          a[0] === "@" || // @media / @keyframes / @supports / @font-face
          n.indexOf(a) >= 0;
      u && (i[a] = t[a]);
    }
    return i;
  },
  Ju = function (t, n) {
    for (
      var r = n.map(Hs), i = Bt(t), o = {}, s = 0, a = i.length;
      s < a;
      s += 1
    ) {
      var u = i[s];
      (n.indexOf(u) >= 0 || r.indexOf(Hs(u)) >= 0) && (o[u] = t[u]);
    }
    return o;
  },
  zg = function e(t, n) {
    for (
      var r = ai.apply(void 0, [{}, $g(t, n)].concat(We(Xu(Ju(t, n))))),
        i = Bt(r).filter(Qi),
        o = 0,
        s = i.length;
      o < s;
      o += 1
    ) {
      var a = i[o],
        u = e(r[a], n);
      n.indexOf(a) >= 0 ? (delete r[a], (r = ai({}, r, u))) : (r[a] = u);
    }
    return r;
  };
function Us(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function zs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Us(Object(n), !0).forEach(function (r) {
          un(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Us(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
var Wg = ["animationName"],
  Yg = function (t) {
    var n = t.style,
      r = t.className;
    return zs(
      zs(
        {},
        n
          ? {
              style: Ug(n, Wg),
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
const Qu = Yg;
var el = /* @__PURE__ */ et(Qu);
el.Provider;
var tl = function (t) {
    if (t) {
      if (typeof t == "string") return [t];
      if (!Array.isArray(t)) {
        var n = t;
        return Bt(t).reduce(function (r, i) {
          return r.concat(n[i] ? [i] : []);
        }, []);
      }
    } else return [];
    return t;
  },
  qg = {},
  Kg = function (t) {
    return function (n, r) {
      var i = r || qg;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var o;
      t.memoize.has(i)
        ? (o = t.memoize.get(i))
        : ((o = {}), t.memoize.set(i, o));
      var s = tl(n).join(" ");
      return s in o ? o[s] : (o[s] = t(n || [], r));
    };
  };
function Ws(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function At(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ws(Object(n), !0).forEach(function (r) {
          un(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Ws(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
var Gg = function (t) {
    var n = t && Bt(t)[0];
    return n && n.split("__")[0].split("--")[0];
  },
  Xg = function (t, n, r) {
    if (t) {
      var i = t.split(" ")[0],
        o = [].concat(
          We(
            n.length === 0
              ? r.map(function (s) {
                  return "".concat(i, "--").concat(s.substring(1));
                })
              : [],
          ),
          We(
            n.map(function (s) {
              return "".concat(i, "__").concat(s);
            }),
          ),
        );
      return n.length === 0 ? [t].concat(We(o)) : o;
    }
  };
function nl(e) {
  var t = e.style,
    n = e.className,
    r = e.classNames,
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qu,
    o = n || Gg(r) || (t == null ? void 0 : t.className),
    s =
      typeof t == "function"
        ? t
        : Kg(function (f, d) {
            var h = tl(f);
            Lt(
              Array.isArray(h),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              Lt(
                !d || Rn(d),
                "Optional second parameter must be a plain object.",
              );
            var p = h.filter(Qi),
              m = h.filter(Hg),
              g =
                m.length > 0
                  ? function (E) {
                      return Xu(Ju(E, m));
                    }
                  : function (E) {
                      return [E];
                    },
              v = function () {
                var x =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return g(zg(x, p));
              },
              b = Xg(o, m, p);
            return nl(
              At(
                At(
                  At(
                    {},
                    (t || d) && {
                      style: ai.apply(void 0, [{}].concat(We(v(d)), We(v(t)))),
                    },
                  ),
                  b && {
                    className: b.join(" "),
                  },
                ),
                r && {
                  classNames: r,
                },
              ),
              i,
            );
          }),
    a = At(
      {},
      typeof t == "function"
        ? t
        : {
            style: t,
          },
    ),
    u = We(
      new Set(
        [].concat(
          We(a.className ? a.className.split(" ") : []),
          We(o ? o.split(" ") : []),
        ),
      ),
    ),
    c = r
      ? Bg(
          u.map(function (f) {
            return r[f];
          }),
        )
      : u,
    l = i(
      At(
        At({}, a),
        c.length > 0
          ? {
              className: c.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(s, l), s;
}
function Ys(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Yt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ys(Object(n), !0).forEach(function (r) {
          un(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Ys(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
var Zg = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return n.reduce(function (i, o) {
      return Yt(
        Yt(Yt({}, i), typeof o == "function" ? o : {}),
        {},
        {
          style: Yt(Yt({}, i.style), typeof o == "function" ? o.style : o),
        },
      );
    }, {});
  },
  eo = function (t, n, r) {
    var i = n.style,
      o = n.className,
      s = n.classNames,
      a = ye(el),
      u = Je(
        function () {
          return nl(
            {
              style: i,
              className: o,
              classNames: s,
            },
            a,
          );
        },
        [i, o, s, a],
      );
    return u(r, t);
  },
  ui = { exports: {} },
  Cn = { exports: {} },
  ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qs;
function Jg() {
  if (qs) return ae;
  qs = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    t = e ? Symbol.for("react.element") : 60103,
    n = e ? Symbol.for("react.portal") : 60106,
    r = e ? Symbol.for("react.fragment") : 60107,
    i = e ? Symbol.for("react.strict_mode") : 60108,
    o = e ? Symbol.for("react.profiler") : 60114,
    s = e ? Symbol.for("react.provider") : 60109,
    a = e ? Symbol.for("react.context") : 60110,
    u = e ? Symbol.for("react.async_mode") : 60111,
    c = e ? Symbol.for("react.concurrent_mode") : 60111,
    l = e ? Symbol.for("react.forward_ref") : 60112,
    f = e ? Symbol.for("react.suspense") : 60113,
    d = e ? Symbol.for("react.suspense_list") : 60120,
    h = e ? Symbol.for("react.memo") : 60115,
    p = e ? Symbol.for("react.lazy") : 60116,
    m = e ? Symbol.for("react.block") : 60121,
    g = e ? Symbol.for("react.fundamental") : 60117,
    v = e ? Symbol.for("react.responder") : 60118,
    b = e ? Symbol.for("react.scope") : 60119;
  function E(S) {
    if (typeof S == "object" && S !== null) {
      var P = S.$$typeof;
      switch (P) {
        case t:
          switch (((S = S.type), S)) {
            case u:
            case c:
            case r:
            case o:
            case i:
            case f:
              return S;
            default:
              switch (((S = S && S.$$typeof), S)) {
                case a:
                case l:
                case p:
                case h:
                case s:
                  return S;
                default:
                  return P;
              }
          }
        case n:
          return P;
      }
    }
  }
  function x(S) {
    return E(S) === c;
  }
  return (
    (ae.AsyncMode = u),
    (ae.ConcurrentMode = c),
    (ae.ContextConsumer = a),
    (ae.ContextProvider = s),
    (ae.Element = t),
    (ae.ForwardRef = l),
    (ae.Fragment = r),
    (ae.Lazy = p),
    (ae.Memo = h),
    (ae.Portal = n),
    (ae.Profiler = o),
    (ae.StrictMode = i),
    (ae.Suspense = f),
    (ae.isAsyncMode = function (S) {
      return x(S) || E(S) === u;
    }),
    (ae.isConcurrentMode = x),
    (ae.isContextConsumer = function (S) {
      return E(S) === a;
    }),
    (ae.isContextProvider = function (S) {
      return E(S) === s;
    }),
    (ae.isElement = function (S) {
      return typeof S == "object" && S !== null && S.$$typeof === t;
    }),
    (ae.isForwardRef = function (S) {
      return E(S) === l;
    }),
    (ae.isFragment = function (S) {
      return E(S) === r;
    }),
    (ae.isLazy = function (S) {
      return E(S) === p;
    }),
    (ae.isMemo = function (S) {
      return E(S) === h;
    }),
    (ae.isPortal = function (S) {
      return E(S) === n;
    }),
    (ae.isProfiler = function (S) {
      return E(S) === o;
    }),
    (ae.isStrictMode = function (S) {
      return E(S) === i;
    }),
    (ae.isSuspense = function (S) {
      return E(S) === f;
    }),
    (ae.isValidElementType = function (S) {
      return (
        typeof S == "string" ||
        typeof S == "function" ||
        S === r ||
        S === c ||
        S === o ||
        S === i ||
        S === f ||
        S === d ||
        (typeof S == "object" &&
          S !== null &&
          (S.$$typeof === p ||
            S.$$typeof === h ||
            S.$$typeof === s ||
            S.$$typeof === a ||
            S.$$typeof === l ||
            S.$$typeof === g ||
            S.$$typeof === v ||
            S.$$typeof === b ||
            S.$$typeof === m))
      );
    }),
    (ae.typeOf = E),
    ae
  );
}
var ue = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ks;
function Qg() {
  return (
    Ks ||
      ((Ks = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = typeof Symbol == "function" && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            n = e ? Symbol.for("react.portal") : 60106,
            r = e ? Symbol.for("react.fragment") : 60107,
            i = e ? Symbol.for("react.strict_mode") : 60108,
            o = e ? Symbol.for("react.profiler") : 60114,
            s = e ? Symbol.for("react.provider") : 60109,
            a = e ? Symbol.for("react.context") : 60110,
            u = e ? Symbol.for("react.async_mode") : 60111,
            c = e ? Symbol.for("react.concurrent_mode") : 60111,
            l = e ? Symbol.for("react.forward_ref") : 60112,
            f = e ? Symbol.for("react.suspense") : 60113,
            d = e ? Symbol.for("react.suspense_list") : 60120,
            h = e ? Symbol.for("react.memo") : 60115,
            p = e ? Symbol.for("react.lazy") : 60116,
            m = e ? Symbol.for("react.block") : 60121,
            g = e ? Symbol.for("react.fundamental") : 60117,
            v = e ? Symbol.for("react.responder") : 60118,
            b = e ? Symbol.for("react.scope") : 60119;
          function E(k) {
            return (
              typeof k == "string" ||
              typeof k == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              k === r ||
              k === c ||
              k === o ||
              k === i ||
              k === f ||
              k === d ||
              (typeof k == "object" &&
                k !== null &&
                (k.$$typeof === p ||
                  k.$$typeof === h ||
                  k.$$typeof === s ||
                  k.$$typeof === a ||
                  k.$$typeof === l ||
                  k.$$typeof === g ||
                  k.$$typeof === v ||
                  k.$$typeof === b ||
                  k.$$typeof === m))
            );
          }
          function x(k) {
            if (typeof k == "object" && k !== null) {
              var be = k.$$typeof;
              switch (be) {
                case t:
                  var St = k.type;
                  switch (St) {
                    case u:
                    case c:
                    case r:
                    case o:
                    case i:
                    case f:
                      return St;
                    default:
                      var ft = St && St.$$typeof;
                      switch (ft) {
                        case a:
                        case l:
                        case p:
                        case h:
                        case s:
                          return ft;
                        default:
                          return be;
                      }
                  }
                case n:
                  return be;
              }
            }
          }
          var S = u,
            P = c,
            I = a,
            T = s,
            L = t,
            A = l,
            j = r,
            X = p,
            q = h,
            M = n,
            w = o,
            _ = i,
            O = f,
            D = !1;
          function $(k) {
            return (
              D ||
                ((D = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              C(k) || x(k) === u
            );
          }
          function C(k) {
            return x(k) === c;
          }
          function R(k) {
            return x(k) === a;
          }
          function H(k) {
            return x(k) === s;
          }
          function U(k) {
            return typeof k == "object" && k !== null && k.$$typeof === t;
          }
          function z(k) {
            return x(k) === l;
          }
          function Z(k) {
            return x(k) === r;
          }
          function K(k) {
            return x(k) === p;
          }
          function G(k) {
            return x(k) === h;
          }
          function Q(k) {
            return x(k) === n;
          }
          function ee(k) {
            return x(k) === o;
          }
          function W(k) {
            return x(k) === i;
          }
          function ce(k) {
            return x(k) === f;
          }
          (ue.AsyncMode = S),
            (ue.ConcurrentMode = P),
            (ue.ContextConsumer = I),
            (ue.ContextProvider = T),
            (ue.Element = L),
            (ue.ForwardRef = A),
            (ue.Fragment = j),
            (ue.Lazy = X),
            (ue.Memo = q),
            (ue.Portal = M),
            (ue.Profiler = w),
            (ue.StrictMode = _),
            (ue.Suspense = O),
            (ue.isAsyncMode = $),
            (ue.isConcurrentMode = C),
            (ue.isContextConsumer = R),
            (ue.isContextProvider = H),
            (ue.isElement = U),
            (ue.isForwardRef = z),
            (ue.isFragment = Z),
            (ue.isLazy = K),
            (ue.isMemo = G),
            (ue.isPortal = Q),
            (ue.isProfiler = ee),
            (ue.isStrictMode = W),
            (ue.isSuspense = ce),
            (ue.isValidElementType = E),
            (ue.typeOf = x);
        })()),
    ue
  );
}
var Gs;
function rl() {
  return (
    Gs ||
      ((Gs = 1),
      process.env.NODE_ENV === "production"
        ? (Cn.exports = Jg())
        : (Cn.exports = Qg())),
    Cn.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Rr, Xs;
function ey() {
  if (Xs) return Rr;
  Xs = 1;
  var e = Object.getOwnPropertySymbols,
    t = Object.prototype.hasOwnProperty,
    n = Object.prototype.propertyIsEnumerable;
  function r(o) {
    if (o == null)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined",
      );
    return Object(o);
  }
  function i() {
    try {
      if (!Object.assign) return !1;
      var o = new String("abc");
      if (((o[5] = "de"), Object.getOwnPropertyNames(o)[0] === "5")) return !1;
      for (var s = {}, a = 0; a < 10; a++) s["_" + String.fromCharCode(a)] = a;
      var u = Object.getOwnPropertyNames(s).map(function (l) {
        return s[l];
      });
      if (u.join("") !== "0123456789") return !1;
      var c = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function (l) {
          c[l] = l;
        }),
        Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst"
      );
    } catch {
      return !1;
    }
  }
  return (
    (Rr = i()
      ? Object.assign
      : function (o, s) {
          for (var a, u = r(o), c, l = 1; l < arguments.length; l++) {
            a = Object(arguments[l]);
            for (var f in a) t.call(a, f) && (u[f] = a[f]);
            if (e) {
              c = e(a);
              for (var d = 0; d < c.length; d++)
                n.call(a, c[d]) && (u[c[d]] = a[c[d]]);
            }
          }
          return u;
        }),
    Rr
  );
}
var Or, Zs;
function to() {
  if (Zs) return Or;
  Zs = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (Or = e), Or;
}
var Ir, Js;
function il() {
  return (
    Js ||
      ((Js = 1), (Ir = Function.call.bind(Object.prototype.hasOwnProperty))),
    Ir
  );
}
var Mr, Qs;
function ty() {
  if (Qs) return Mr;
  Qs = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = to(),
      n = {},
      r = il();
    e = function (o) {
      var s = "Warning: " + o;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function i(o, s, a, u, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in o)
        if (r(o, l)) {
          var f;
          try {
            if (typeof o[l] != "function") {
              var d = Error(
                (u || "React class") +
                  ": " +
                  a +
                  " type `" +
                  l +
                  "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                  typeof o[l] +
                  "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
              );
              throw ((d.name = "Invariant Violation"), d);
            }
            f = o[l](s, l, u, a, null, t);
          } catch (p) {
            f = p;
          }
          if (
            (f &&
              !(f instanceof Error) &&
              e(
                (u || "React class") +
                  ": type specification of " +
                  a +
                  " `" +
                  l +
                  "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
                  typeof f +
                  ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
              ),
            f instanceof Error && !(f.message in n))
          ) {
            n[f.message] = !0;
            var h = c ? c() : "";
            e("Failed " + a + " type: " + f.message + (h ?? ""));
          }
        }
    }
  }
  return (
    (i.resetWarningCache = function () {
      process.env.NODE_ENV !== "production" && (n = {});
    }),
    (Mr = i),
    Mr
  );
}
var Fr, ea;
function ny() {
  if (ea) return Fr;
  ea = 1;
  var e = rl(),
    t = ey(),
    n = to(),
    r = il(),
    i = ty(),
    o = function () {};
  process.env.NODE_ENV !== "production" &&
    (o = function (a) {
      var u = "Warning: " + a;
      typeof console < "u" && console.error(u);
      try {
        throw new Error(u);
      } catch {}
    });
  function s() {
    return null;
  }
  return (
    (Fr = function (a, u) {
      var c = typeof Symbol == "function" && Symbol.iterator,
        l = "@@iterator";
      function f(C) {
        var R = C && ((c && C[c]) || C[l]);
        if (typeof R == "function") return R;
      }
      var d = "<<anonymous>>",
        h = {
          array: v("array"),
          bigint: v("bigint"),
          bool: v("boolean"),
          func: v("function"),
          number: v("number"),
          object: v("object"),
          string: v("string"),
          symbol: v("symbol"),
          any: b(),
          arrayOf: E,
          element: x(),
          elementType: S(),
          instanceOf: P,
          node: A(),
          objectOf: T,
          oneOf: I,
          oneOfType: L,
          shape: X,
          exact: q,
        };
      function p(C, R) {
        return C === R ? C !== 0 || 1 / C === 1 / R : C !== C && R !== R;
      }
      function m(C, R) {
        (this.message = C),
          (this.data = R && typeof R == "object" ? R : {}),
          (this.stack = "");
      }
      m.prototype = Error.prototype;
      function g(C) {
        if (process.env.NODE_ENV !== "production")
          var R = {},
            H = 0;
        function U(Z, K, G, Q, ee, W, ce) {
          if (((Q = Q || d), (W = W || G), ce !== n)) {
            if (u) {
              var k = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types",
              );
              throw ((k.name = "Invariant Violation"), k);
            } else if (
              process.env.NODE_ENV !== "production" &&
              typeof console < "u"
            ) {
              var be = Q + ":" + G;
              !R[be] && // Avoid spamming the console because they are often not actionable except for lib authors
                H < 3 &&
                (o(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    W +
                    "` prop on `" +
                    Q +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (R[be] = !0),
                H++);
            }
          }
          return K[G] == null
            ? Z
              ? K[G] === null
                ? new m(
                    "The " +
                      ee +
                      " `" +
                      W +
                      "` is marked as required " +
                      ("in `" + Q + "`, but its value is `null`."),
                  )
                : new m(
                    "The " +
                      ee +
                      " `" +
                      W +
                      "` is marked as required in " +
                      ("`" + Q + "`, but its value is `undefined`."),
                  )
              : null
            : C(K, G, Q, ee, W);
        }
        var z = U.bind(null, !1);
        return (z.isRequired = U.bind(null, !0)), z;
      }
      function v(C) {
        function R(H, U, z, Z, K, G) {
          var Q = H[U],
            ee = _(Q);
          if (ee !== C) {
            var W = O(Q);
            return new m(
              "Invalid " +
                Z +
                " `" +
                K +
                "` of type " +
                ("`" + W + "` supplied to `" + z + "`, expected ") +
                ("`" + C + "`."),
              { expectedType: C },
            );
          }
          return null;
        }
        return g(R);
      }
      function b() {
        return g(s);
      }
      function E(C) {
        function R(H, U, z, Z, K) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                K +
                "` of component `" +
                z +
                "` has invalid PropType notation inside arrayOf.",
            );
          var G = H[U];
          if (!Array.isArray(G)) {
            var Q = _(G);
            return new m(
              "Invalid " +
                Z +
                " `" +
                K +
                "` of type " +
                ("`" + Q + "` supplied to `" + z + "`, expected an array."),
            );
          }
          for (var ee = 0; ee < G.length; ee++) {
            var W = C(G, ee, z, Z, K + "[" + ee + "]", n);
            if (W instanceof Error) return W;
          }
          return null;
        }
        return g(R);
      }
      function x() {
        function C(R, H, U, z, Z) {
          var K = R[H];
          if (!a(K)) {
            var G = _(K);
            return new m(
              "Invalid " +
                z +
                " `" +
                Z +
                "` of type " +
                ("`" +
                  G +
                  "` supplied to `" +
                  U +
                  "`, expected a single ReactElement."),
            );
          }
          return null;
        }
        return g(C);
      }
      function S() {
        function C(R, H, U, z, Z) {
          var K = R[H];
          if (!e.isValidElementType(K)) {
            var G = _(K);
            return new m(
              "Invalid " +
                z +
                " `" +
                Z +
                "` of type " +
                ("`" +
                  G +
                  "` supplied to `" +
                  U +
                  "`, expected a single ReactElement type."),
            );
          }
          return null;
        }
        return g(C);
      }
      function P(C) {
        function R(H, U, z, Z, K) {
          if (!(H[U] instanceof C)) {
            var G = C.name || d,
              Q = $(H[U]);
            return new m(
              "Invalid " +
                Z +
                " `" +
                K +
                "` of type " +
                ("`" + Q + "` supplied to `" + z + "`, expected ") +
                ("instance of `" + G + "`."),
            );
          }
          return null;
        }
        return g(R);
      }
      function I(C) {
        if (!Array.isArray(C))
          return (
            process.env.NODE_ENV !== "production" &&
              (arguments.length > 1
                ? o(
                    "Invalid arguments supplied to oneOf, expected an array, got " +
                      arguments.length +
                      " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).",
                  )
                : o("Invalid argument supplied to oneOf, expected an array.")),
            s
          );
        function R(H, U, z, Z, K) {
          for (var G = H[U], Q = 0; Q < C.length; Q++)
            if (p(G, C[Q])) return null;
          var ee = JSON.stringify(C, function (ce, k) {
            var be = O(k);
            return be === "symbol" ? String(k) : k;
          });
          return new m(
            "Invalid " +
              Z +
              " `" +
              K +
              "` of value `" +
              String(G) +
              "` " +
              ("supplied to `" + z + "`, expected one of " + ee + "."),
          );
        }
        return g(R);
      }
      function T(C) {
        function R(H, U, z, Z, K) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                K +
                "` of component `" +
                z +
                "` has invalid PropType notation inside objectOf.",
            );
          var G = H[U],
            Q = _(G);
          if (Q !== "object")
            return new m(
              "Invalid " +
                Z +
                " `" +
                K +
                "` of type " +
                ("`" + Q + "` supplied to `" + z + "`, expected an object."),
            );
          for (var ee in G)
            if (r(G, ee)) {
              var W = C(G, ee, z, Z, K + "." + ee, n);
              if (W instanceof Error) return W;
            }
          return null;
        }
        return g(R);
      }
      function L(C) {
        if (!Array.isArray(C))
          return (
            process.env.NODE_ENV !== "production" &&
              o(
                "Invalid argument supplied to oneOfType, expected an instance of array.",
              ),
            s
          );
        for (var R = 0; R < C.length; R++) {
          var H = C[R];
          if (typeof H != "function")
            return (
              o(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                  D(H) +
                  " at index " +
                  R +
                  ".",
              ),
              s
            );
        }
        function U(z, Z, K, G, Q) {
          for (var ee = [], W = 0; W < C.length; W++) {
            var ce = C[W],
              k = ce(z, Z, K, G, Q, n);
            if (k == null) return null;
            k.data && r(k.data, "expectedType") && ee.push(k.data.expectedType);
          }
          var be =
            ee.length > 0
              ? ", expected one of type [" + ee.join(", ") + "]"
              : "";
          return new m(
            "Invalid " +
              G +
              " `" +
              Q +
              "` supplied to " +
              ("`" + K + "`" + be + "."),
          );
        }
        return g(U);
      }
      function A() {
        function C(R, H, U, z, Z) {
          return M(R[H])
            ? null
            : new m(
                "Invalid " +
                  z +
                  " `" +
                  Z +
                  "` supplied to " +
                  ("`" + U + "`, expected a ReactNode."),
              );
        }
        return g(C);
      }
      function j(C, R, H, U, z) {
        return new m(
          (C || "React class") +
            ": " +
            R +
            " type `" +
            H +
            "." +
            U +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            z +
            "`.",
        );
      }
      function X(C) {
        function R(H, U, z, Z, K) {
          var G = H[U],
            Q = _(G);
          if (Q !== "object")
            return new m(
              "Invalid " +
                Z +
                " `" +
                K +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + z + "`, expected `object`."),
            );
          for (var ee in C) {
            var W = C[ee];
            if (typeof W != "function") return j(z, Z, K, ee, O(W));
            var ce = W(G, ee, z, Z, K + "." + ee, n);
            if (ce) return ce;
          }
          return null;
        }
        return g(R);
      }
      function q(C) {
        function R(H, U, z, Z, K) {
          var G = H[U],
            Q = _(G);
          if (Q !== "object")
            return new m(
              "Invalid " +
                Z +
                " `" +
                K +
                "` of type `" +
                Q +
                "` " +
                ("supplied to `" + z + "`, expected `object`."),
            );
          var ee = t({}, H[U], C);
          for (var W in ee) {
            var ce = C[W];
            if (r(C, W) && typeof ce != "function") return j(z, Z, K, W, O(ce));
            if (!ce)
              return new m(
                "Invalid " +
                  Z +
                  " `" +
                  K +
                  "` key `" +
                  W +
                  "` supplied to `" +
                  z +
                  "`.\nBad object: " +
                  JSON.stringify(H[U], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(C), null, "  "),
              );
            var k = ce(G, W, z, Z, K + "." + W, n);
            if (k) return k;
          }
          return null;
        }
        return g(R);
      }
      function M(C) {
        switch (typeof C) {
          case "number":
          case "string":
          case "undefined":
            return !0;
          case "boolean":
            return !C;
          case "object":
            if (Array.isArray(C)) return C.every(M);
            if (C === null || a(C)) return !0;
            var R = f(C);
            if (R) {
              var H = R.call(C),
                U;
              if (R !== C.entries) {
                for (; !(U = H.next()).done; ) if (!M(U.value)) return !1;
              } else
                for (; !(U = H.next()).done; ) {
                  var z = U.value;
                  if (z && !M(z[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function w(C, R) {
        return C === "symbol"
          ? !0
          : R
          ? R["@@toStringTag"] === "Symbol" ||
            (typeof Symbol == "function" && R instanceof Symbol)
          : !1;
      }
      function _(C) {
        var R = typeof C;
        return Array.isArray(C)
          ? "array"
          : C instanceof RegExp
          ? "object"
          : w(R, C)
          ? "symbol"
          : R;
      }
      function O(C) {
        if (typeof C > "u" || C === null) return "" + C;
        var R = _(C);
        if (R === "object") {
          if (C instanceof Date) return "date";
          if (C instanceof RegExp) return "regexp";
        }
        return R;
      }
      function D(C) {
        var R = O(C);
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
      function $(C) {
        return !C.constructor || !C.constructor.name ? d : C.constructor.name;
      }
      return (
        (h.checkPropTypes = i),
        (h.resetWarningCache = i.resetWarningCache),
        (h.PropTypes = h),
        h
      );
    }),
    Fr
  );
}
var Nr, ta;
function ry() {
  if (ta) return Nr;
  ta = 1;
  var e = to();
  function t() {}
  function n() {}
  return (
    (n.resetWarningCache = t),
    (Nr = function () {
      function r(s, a, u, c, l, f) {
        if (f !== e) {
          var d = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((d.name = "Invariant Violation"), d);
        }
      }
      r.isRequired = r;
      function i() {
        return r;
      }
      var o = {
        array: r,
        bigint: r,
        bool: r,
        func: r,
        number: r,
        object: r,
        string: r,
        symbol: r,
        any: r,
        arrayOf: i,
        element: r,
        elementType: r,
        instanceOf: i,
        node: r,
        objectOf: i,
        oneOf: i,
        oneOfType: i,
        shape: i,
        exact: i,
        checkPropTypes: n,
        resetWarningCache: t,
      };
      return (o.PropTypes = o), o;
    }),
    Nr
  );
}
if (process.env.NODE_ENV !== "production") {
  var iy = rl(),
    oy = !0;
  ui.exports = ny()(iy.isElement, oy);
} else ui.exports = ry()();
var sy = ui.exports;
const V = /* @__PURE__ */ qn(sy);
var On = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  Be = {
    id: "__id__",
    display: "__display__",
  },
  na = function (t, n) {
    Lt(
      n === "id" || n === "display",
      'Second arg must be either "id" or "display", got: "'.concat(n, '"'),
    );
    var r = t.indexOf(Be.display),
      i = t.indexOf(Be.id);
    return (
      r < 0 && (r = null),
      i < 0 && (i = null),
      Lt(
        r !== null || i !== null,
        "The markup '".concat(
          t,
          "' does not contain either of the placeholders '__id__' or '__display__'",
        ),
      ),
      r !== null && i !== null
        ? (n === "id" && i <= r) || (n === "display" && r <= i)
          ? 0
          : 1
        : 0
    );
  },
  ay = function (t) {
    var n = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (r) {
          var i = n.exec(r.toString()),
            o = Yn(i, 3),
            s = o[1],
            a = o[2];
          return (
            Lt(
              !a,
              "RegExp flags are not supported. Change /"
                .concat(s, "/")
                .concat(a, " into /")
                .concat(s, "/"),
            ),
            "(".concat(s, ")")
          );
        })
        .join("|"),
      "g",
    );
  },
  ol = function (t) {
    var n = 0;
    return (
      t.indexOf("__id__") >= 0 && n++, t.indexOf("__display__") >= 0 && n++, n
    );
  },
  uy = function () {},
  mn = function (t, n, r) {
    for (
      var i =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : uy,
        o = ay(
          n.map(function (S) {
            return S.regex;
          }),
        ),
        s = 2,
        a = n.map(function (S) {
          var P = S.markup,
            I = s;
          return (s += ol(P) + 1), I;
        }),
        u,
        c = 0,
        l = 0;
      (u = o.exec(t)) !== null;

    ) {
      var f = a.find(function (S) {
          return !!u[S];
        }),
        d = a.indexOf(f),
        h = n[d],
        p = h.markup,
        m = h.displayTransform,
        g = f + na(p, "id"),
        v = f + na(p, "display"),
        b = u[g],
        E = m(b, u[v]),
        x = t.substring(c, u.index);
      i(x, c, l),
        (l += x.length),
        r(u[0], u.index, l, b, E, d, c),
        (l += E.length),
        (c = o.lastIndex);
    }
    c < t.length && i(t.substring(c), c, l);
  },
  yt = function (t, n) {
    var r = "";
    return (
      mn(
        t,
        n,
        function (i, o, s, a, u) {
          r += u;
        },
        function (i) {
          r += i;
        },
      ),
      r
    );
  },
  _e = function (t, n, r) {
    var i =
      arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
    if (typeof r != "number") return r;
    var o,
      s = function (c, l, f) {
        o === void 0 && f + c.length >= r && (o = l + r - f);
      },
      a = function (c, l, f, d, h, p, m) {
        o === void 0 &&
          f + h.length > r &&
          (i === "NULL" ? (o = null) : (o = l + (i === "END" ? c.length : 0)));
      };
    return mn(t, n, a, s), o === void 0 ? t.length : o;
  },
  Qt = function (t, n, r, i) {
    return t.substring(0, n) + i + t.substring(r);
  },
  ly = function (t, n, r, i) {
    var o = r.selectionStartBefore,
      s = r.selectionEndBefore,
      a = r.selectionEndAfter,
      u = yt(t, i),
      c = u.length - n.length;
    o === "undefined" && (o = a + c),
      s === "undefined" && (s = o),
      o === s && s === a && u.length === n.length && (o = o - 1);
    var l = n.slice(o, a),
      f = Math.min(o, a),
      d = s;
    o === a && (d = Math.max(s, o + c));
    var h = _e(t, i, f, "START"),
      p = _e(t, i, d, "END"),
      m = _e(t, i, f, "NULL"),
      g = _e(t, i, d, "NULL"),
      v = m === null || g === null,
      b = Qt(t, h, p, l);
    if (!v) {
      var E = yt(b, i);
      if (E !== n) {
        for (f = 0; n[f] === E[f]; ) f++;
        (l = n.slice(f, a)),
          (d = u.lastIndexOf(n.substring(a))),
          (h = _e(t, i, f, "START")),
          (p = _e(t, i, d, "END")),
          (b = Qt(t, h, p, l));
      }
    }
    return b;
  },
  ra = function (t, n, r) {
    var i = r,
      o = !1,
      s = function (u, c, l, f, d, h, p) {
        l <= r && l + d.length > r && ((i = l), (o = !0));
      };
    if ((mn(t, n, s), o)) return i;
  },
  Kt = function (t, n) {
    var r = [];
    return (
      mn(t, n, function (i, o, s, a, u, c, l) {
        r.push({
          id: a,
          display: u,
          childIndex: c,
          index: o,
          plainTextIndex: s,
        });
      }),
      r
    );
  },
  sl = function (t, n) {
    return "".concat(t, "-").concat(n);
  },
  xn = function (t) {
    return Object.values(t).reduce(function (n, r) {
      var i = r.results;
      return n + i.length;
    }, 0);
  },
  cy = function (t, n) {
    var r = Kt(t, n),
      i = r[r.length - 1];
    return i ? i.plainTextIndex + i.display.length : 0;
  },
  fy = function (t) {
    var n = On(t),
      r = t[t.indexOf(Be.display) + Be.display.length],
      i = t[t.indexOf(Be.id) + Be.id.length];
    return new RegExp(
      n
        .replace(Be.display, "([^".concat(On(r || ""), "]+?)"))
        .replace(Be.id, "([^".concat(On(i || ""), "]+?)")),
    );
  },
  nt = function (t) {
    return Mt.toArray(t).map(function (n) {
      var r = n.props,
        i = r.markup,
        o = r.regex,
        s = r.displayTransform;
      return {
        markup: i,
        regex: o ? dy(o, i) : fy(i),
        displayTransform:
          s ||
          function (a, u) {
            return u || a;
          },
      };
    });
  },
  dy = function (t, n) {
    var r = new RegExp(t.toString() + "|").exec("").length - 1,
      i = ol(n);
    return (
      Lt(
        r === i,
        "Number of capturing groups in RegExp "
          .concat(t.toString(), " (")
          .concat(
            r,
            ") does not match the number of placeholders in the markup '",
          )
          .concat(n, "' (")
          .concat(i, ")"),
      ),
      t
    );
  },
  hy = function (t, n, r) {
    return t.replace(Be.id, n).replace(Be.display, r);
  },
  py = [
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
  my = function (t) {
    var n = t;
    return (
      py.forEach(function (r) {
        n = n.replace(r.letters, r.base);
      }),
      n
    );
  },
  ia = function (t) {
    return my(t).toLowerCase();
  },
  al = function (t, n, r) {
    return r ? ia(t).indexOf(ia(n)) : t.toLowerCase().indexOf(n.toLowerCase());
  },
  gy = function () {
    return !!document.documentMode;
  },
  li = function (t) {
    return typeof t == "number";
  },
  yy = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  vy = function (t) {
    for (
      var n, r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1;
      o < r;
      o++
    )
      i[o - 1] = arguments[o];
    var s = (n = []).concat.apply(n, i);
    return Object.keys(t).reduce(function (a, u) {
      return (
        t.hasOwnProperty(u) &&
          !s.includes(u) &&
          t[u] !== void 0 &&
          (a[u] = t[u]),
        a
      );
    }, {});
  },
  Ey = ["style", "className", "classNames"];
function oa(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function sa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? oa(Object(n), !0).forEach(function (r) {
          te(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : oa(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function sr(e, t) {
  var n = function (i) {
    var o = function (u) {
        var c = u.style,
          l = u.className,
          f = u.classNames,
          d = Mg(u, Ey),
          h = t ? t(d) : void 0,
          p = eo(
            e,
            {
              style: c,
              className: l,
              classNames: f,
            },
            h,
          );
        return /* @__PURE__ */ ie.createElement(
          i,
          Le({}, d, {
            style: p,
          }),
        );
      },
      s = i.displayName || i.name || "Component";
    return (
      (o.displayName = "defaultStyle(".concat(s, ")")),
      /* @__PURE__ */ ie.forwardRef(function (a, u) {
        return o(
          sa(
            sa({}, a),
            {},
            {
              ref: u,
            },
          ),
        );
      })
    );
  };
  return n;
}
var by = function (t, n) {
  return t.hasOwnProperty(n) ? t[n]++ : (t[n] = 0), n + "_" + t[n];
};
function ul(e) {
  var t = e.selectionStart,
    n = e.selectionEnd,
    r = e.value,
    i = r === void 0 ? "" : r,
    o = e.onCaretPositionChange,
    s = e.containerRef,
    a = e.children;
  e.singleLine;
  var u = e.style,
    c = ve({
      left: void 0,
      top: void 0,
    }),
    l = Yn(c, 2),
    f = l[0],
    d = l[1],
    h = ve(),
    p = Yn(h, 2),
    m = p[0],
    g = p[1];
  De(function () {
    v();
  });
  var v = function () {
      if (m) {
        var M = m.offsetLeft,
          w = m.offsetTop;
        if (!(f.left === M && f.top === w)) {
          var _ = {
            left: M,
            top: w,
          };
          d(_), o(_);
        }
      }
    },
    b = nt(a),
    E;
  n === t && (E = _e(i, b, t, "START"));
  var x = [],
    S = {},
    P = x,
    I = 0,
    T = function (M, w, _) {
      if (li(E) && E >= w && E <= w + M.length) {
        var O = E - w;
        P.push(A(M.substring(0, O), I)), (P = [A(M.substring(O), I)]);
      } else P.push(A(M, I));
      I++;
    },
    L = function (M, w, _, O, D, $, C) {
      var R = by(S, O);
      P.push(j(O, D, $, R));
    },
    A = function (M, w) {
      return /* @__PURE__ */ ie.createElement(
        "span",
        Le({}, u("substring"), {
          key: w,
        }),
        M,
      );
    },
    j = function (M, w, _, O) {
      var D = {
          id: M,
          display: w,
          key: O,
        },
        $ = Mt.toArray(a)[_];
      return /* @__PURE__ */ ie.cloneElement($, D);
    },
    X = function (M) {
      return /* @__PURE__ */ ie.createElement(
        "span",
        Le({}, u("caret"), {
          ref: g,
          key: "caret",
        }),
        M,
      );
    };
  return (
    mn(i, b, L, T),
    P.push(" "),
    P !== x && x.push(X(P)),
    /* @__PURE__ */ ie.createElement(
      "div",
      Le({}, u, {
        ref: s,
      }),
      x,
    )
  );
}
ul.propTypes = {
  selectionStart: V.number,
  selectionEnd: V.number,
  value: V.string.isRequired,
  onCaretPositionChange: V.func.isRequired,
  containerRef: V.oneOfType([
    V.func,
    V.shape({
      current: typeof Element > "u" ? V.any : V.instanceOf(Element),
    }),
  ]),
  children: V.oneOfType([V.element, V.arrayOf(V.element)]).isRequired,
};
var Ty = sr(
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
  Sy = Ty(ul);
function ll(e) {
  var t = e.id,
    n = e.focused,
    r = e.ignoreAccents,
    i = e.index,
    o = e.onClick,
    s = e.onMouseEnter,
    a = e.query,
    u = e.renderSuggestion,
    c = e.suggestion,
    l = e.style;
  e.className, e.classNames;
  var f = {
      onClick: o,
      onMouseEnter: s,
    },
    d = function () {
      var g = h(),
        v = p(g);
      return u ? u(c, a, v, i, n) : v;
    },
    h = function () {
      if (typeof c == "string") return c;
      var g = c.id,
        v = c.display;
      return g === void 0 || !v ? g : v;
    },
    p = function (g) {
      var v = al(g, a, r);
      return v === -1
        ? /* @__PURE__ */ ie.createElement("span", l("display"), g)
        : /* @__PURE__ */ ie.createElement(
            "span",
            l("display"),
            g.substring(0, v),
            /* @__PURE__ */ ie.createElement(
              "b",
              l("highlight"),
              g.substring(v, v + a.length),
            ),
            g.substring(v + a.length),
          );
    };
  return /* @__PURE__ */ ie.createElement(
    "li",
    Le(
      {
        id: t,
        role: "option",
        "aria-selected": n,
      },
      f,
      l,
    ),
    d(),
  );
}
ll.propTypes = {
  id: V.string.isRequired,
  query: V.string.isRequired,
  index: V.number.isRequired,
  ignoreAccents: V.bool,
  suggestion: V.oneOfType([
    V.string,
    V.shape({
      id: V.oneOfType([V.string, V.number]).isRequired,
      display: V.string,
    }),
  ]).isRequired,
  renderSuggestion: V.func,
  focused: V.bool,
};
var Cy = sr(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  xy = Cy(ll);
function Ay(e) {
  var t = e.style,
    n = e.className,
    r = e.classNames,
    i = eo(_y, {
      style: t,
      className: n,
      classNames: r,
    }),
    o = i("spinner");
  return /* @__PURE__ */ ie.createElement(
    "div",
    i,
    /* @__PURE__ */ ie.createElement(
      "div",
      o,
      /* @__PURE__ */ ie.createElement("div", o(["element", "element1"])),
      /* @__PURE__ */ ie.createElement("div", o(["element", "element2"])),
      /* @__PURE__ */ ie.createElement("div", o(["element", "element3"])),
      /* @__PURE__ */ ie.createElement("div", o(["element", "element4"])),
      /* @__PURE__ */ ie.createElement("div", o(["element", "element5"])),
    ),
  );
}
var _y = {};
function cl(e) {
  var t = e.id,
    n = e.suggestions,
    r = n === void 0 ? {} : n,
    i = e.a11ySuggestionsListLabel,
    o = e.focusIndex,
    s = e.position,
    a = e.left,
    u = e.right,
    c = e.top,
    l = e.scrollFocusedIntoView,
    f = e.isLoading,
    d = e.isOpened,
    h = e.onSelect,
    p =
      h === void 0
        ? function () {
            return null;
          }
        : h,
    m = e.ignoreAccents,
    g = e.containerRef,
    v = e.children,
    b = e.style,
    E = e.customSuggestionsContainer,
    x = e.onMouseDown,
    S = e.onMouseEnter,
    P = ve(void 0),
    I = Yn(P, 2),
    T = I[0],
    L = I[1];
  De(
    function () {
      if (!(!T || T.offsetHeight >= T.scrollHeight || !l)) {
        var _ = T.scrollTop,
          O = T.children[o].getBoundingClientRect(),
          D = O.top,
          $ = O.bottom,
          C = T.getBoundingClientRect(),
          R = C.top;
        (D = D - R + _),
          ($ = $ - R + _),
          D < _
            ? (T.scrollTop = D)
            : $ > T.offsetHeight && (T.scrollTop = $ - T.offsetHeight);
      }
    },
    [o, l, T],
  );
  var A = function () {
      var O = /* @__PURE__ */ ie.createElement(
        "ul",
        Le(
          {
            ref: L,
            id: t,
            role: "listbox",
            "aria-label": i,
          },
          b("list"),
        ),
        Object.values(r).reduce(function (D, $) {
          var C = $.results,
            R = $.queryInfo;
          return [].concat(
            zn(D),
            zn(
              C.map(function (H, U) {
                return j(H, R, D.length + U);
              }),
            ),
          );
        }, []),
      );
      return E ? E(O) : O;
    },
    j = function (O, D, $) {
      var C = $ === o,
        R = D.childIndex,
        H = D.query,
        U = Mt.toArray(v)[R].props.renderSuggestion;
      return /* @__PURE__ */ ie.createElement(xy, {
        style: b("item"),
        key: "".concat(R, "-").concat(w(O)),
        id: sl(t, $),
        query: H,
        index: $,
        ignoreAccents: m,
        renderSuggestion: U,
        suggestion: O,
        focused: C,
        onClick: function () {
          return M(O, D);
        },
        onMouseEnter: function () {
          return q($);
        },
      });
    },
    X = function () {
      if (f)
        return /* @__PURE__ */ ie.createElement(Ay, {
          style: b("loadingIndicator"),
        });
    },
    q = function (O, D) {
      S && S(O);
    },
    M = function (O, D) {
      p(O, D);
    },
    w = function (O) {
      return typeof O == "string" ? O : O.id;
    };
  return d
    ? /* @__PURE__ */ ie.createElement(
        "div",
        Le(
          {},
          Zg(
            {
              position: s || "absolute",
              left: a,
              right: u,
              top: c,
            },
            b,
          ),
          {
            onMouseDown: x,
            ref: g,
          },
        ),
        A(),
        X(),
      )
    : null;
}
cl.propTypes = {
  id: V.string.isRequired,
  suggestions: V.object.isRequired,
  a11ySuggestionsListLabel: V.string,
  focusIndex: V.number,
  position: V.string,
  left: V.number,
  right: V.number,
  top: V.number,
  scrollFocusedIntoView: V.bool,
  isLoading: V.bool,
  isOpened: V.bool.isRequired,
  onSelect: V.func,
  ignoreAccents: V.bool,
  customSuggestionsContainer: V.func,
  containerRef: V.oneOfType([
    V.func,
    V.shape({
      current: typeof Element > "u" ? V.any : V.instanceOf(Element),
    }),
  ]),
};
var wy = sr({
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
  Dy = wy(cl);
function aa(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? aa(Object(n), !0).forEach(function (r) {
          te(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : aa(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Py(e) {
  var t = Ry();
  return function () {
    var r = Wn(e),
      i;
    if (t) {
      var o = Wn(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else i = r.apply(this, arguments);
    return _g(this, i);
  };
}
function Ry() {
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
var Oy = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t instanceof RegExp) return t;
    var r = n.allowSpaceInQuery,
      i = On(t);
    return new RegExp(
      "(?:^|\\s)("
        .concat(i, "([^")
        .concat(r ? "" : "\\s")
        .concat(i, "]*))$"),
    );
  },
  Iy = function (t, n) {
    return t instanceof Array
      ? function (r, i) {
          for (var o = [], s = 0, a = t.length; s < a; ++s) {
            var u = t[s].display || t[s].id;
            al(u, r, n) >= 0 && o.push(t[s]);
          }
          return o;
        }
      : t;
  },
  _t = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  An = !1,
  fl = {
    /**
     * If set to `true` a regular text input element will be rendered
     * instead of a textarea
     */
    singleLine: V.bool,
    allowSpaceInQuery: V.bool,
    allowSuggestionsAboveCursor: V.bool,
    forceSuggestionsAboveCursor: V.bool,
    ignoreAccents: V.bool,
    a11ySuggestionsListLabel: V.string,
    value: V.string,
    onKeyDown: V.func,
    customSuggestionsContainer: V.func,
    onSelect: V.func,
    onBlur: V.func,
    onChange: V.func,
    suggestionsPortalHost:
      typeof Element > "u" ? V.any : V.PropTypes.instanceOf(Element),
    inputRef: V.oneOfType([
      V.func,
      V.shape({
        current: typeof Element > "u" ? V.any : V.instanceOf(Element),
      }),
    ]),
    children: V.oneOfType([V.element, V.arrayOf(V.element)]).isRequired,
  },
  no = /* @__PURE__ */ (function (e) {
    Ag(n, e);
    var t = Py(n);
    function n(r) {
      var i;
      return (
        Cg(this, n),
        (i = t.call(this, r)),
        te(ne(i), "setContainerElement", function (o) {
          i.containerElement = o;
        }),
        te(ne(i), "getInputProps", function () {
          var o = i.props,
            s = o.readOnly,
            a = o.disabled,
            u = o.style,
            c = vy(
              i.props,
              ["style", "classNames", "className"],
              // substyle props
              yy(fl),
            );
          return ke(
            ke(
              ke(ke({}, c), u("input")),
              {},
              {
                value: i.getPlainText(),
                onScroll: i.updateHighlighterScroll,
              },
              !s &&
                !a && {
                  onChange: i.handleChange,
                  onSelect: i.handleSelect,
                  onKeyDown: i.handleKeyDown,
                  onBlur: i.handleBlur,
                  onCompositionStart: i.handleCompositionStart,
                  onCompositionEnd: i.handleCompositionEnd,
                },
            ),
            i.isOpened() && {
              role: "combobox",
              "aria-controls": i.uuidSuggestionsOverlay,
              "aria-expanded": !0,
              "aria-autocomplete": "list",
              "aria-haspopup": "listbox",
              "aria-activedescendant": sl(
                i.uuidSuggestionsOverlay,
                i.state.focusIndex,
              ),
            },
          );
        }),
        te(ne(i), "renderControl", function () {
          var o = i.props,
            s = o.singleLine,
            a = o.style,
            u = i.getInputProps();
          return /* @__PURE__ */ ie.createElement(
            "div",
            a("control"),
            i.renderHighlighter(),
            s ? i.renderInput(u) : i.renderTextarea(u),
          );
        }),
        te(ne(i), "renderInput", function (o) {
          return /* @__PURE__ */ ie.createElement(
            "input",
            Le(
              {
                type: "text",
                ref: i.setInputRef,
              },
              o,
            ),
          );
        }),
        te(ne(i), "renderTextarea", function (o) {
          return /* @__PURE__ */ ie.createElement(
            "textarea",
            Le(
              {
                ref: i.setInputRef,
              },
              o,
            ),
          );
        }),
        te(ne(i), "setInputRef", function (o) {
          i.inputElement = o;
          var s = i.props.inputRef;
          typeof s == "function" ? s(o) : s && (s.current = o);
        }),
        te(ne(i), "setSuggestionsElement", function (o) {
          i.suggestionsElement = o;
        }),
        te(ne(i), "renderSuggestionsOverlay", function () {
          if (!li(i.state.selectionStart)) return null;
          var o = i.state.suggestionsPosition,
            s = o.position,
            a = o.left,
            u = o.top,
            c = o.right,
            l = /* @__PURE__ */ ie.createElement(
              Dy,
              {
                id: i.uuidSuggestionsOverlay,
                style: i.props.style("suggestions"),
                position: s,
                left: a,
                top: u,
                right: c,
                focusIndex: i.state.focusIndex,
                scrollFocusedIntoView: i.state.scrollFocusedIntoView,
                containerRef: i.setSuggestionsElement,
                suggestions: i.state.suggestions,
                customSuggestionsContainer: i.props.customSuggestionsContainer,
                onSelect: i.addMention,
                onMouseDown: i.handleSuggestionsMouseDown,
                onMouseEnter: i.handleSuggestionsMouseEnter,
                isLoading: i.isLoading(),
                isOpened: i.isOpened(),
                ignoreAccents: i.props.ignoreAccents,
                a11ySuggestionsListLabel: i.props.a11ySuggestionsListLabel,
              },
              i.props.children,
            );
          return i.props.suggestionsPortalHost
            ? /* @__PURE__ */ Wl.createPortal(l, i.props.suggestionsPortalHost)
            : l;
        }),
        te(ne(i), "renderHighlighter", function () {
          var o = i.state,
            s = o.selectionStart,
            a = o.selectionEnd,
            u = i.props,
            c = u.singleLine,
            l = u.children,
            f = u.value,
            d = u.style;
          return /* @__PURE__ */ ie.createElement(
            Sy,
            {
              containerRef: i.setHighlighterElement,
              style: d("highlighter"),
              value: f,
              singleLine: c,
              selectionStart: s,
              selectionEnd: a,
              onCaretPositionChange: i.handleCaretPositionChange,
            },
            l,
          );
        }),
        te(ne(i), "setHighlighterElement", function (o) {
          i.highlighterElement = o;
        }),
        te(ne(i), "handleCaretPositionChange", function (o) {
          i.setState({
            caretPosition: o,
          });
        }),
        te(ne(i), "getPlainText", function () {
          return yt(i.props.value || "", nt(i.props.children));
        }),
        te(ne(i), "executeOnChange", function (o) {
          for (
            var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), u = 1;
            u < s;
            u++
          )
            a[u - 1] = arguments[u];
          if (i.props.onChange) {
            var c;
            return (c = i.props).onChange.apply(c, [o].concat(a));
          }
          if (i.props.valueLink) {
            var l;
            return (l = i.props.valueLink).requestChange.apply(
              l,
              [o.target.value].concat(a),
            );
          }
        }),
        te(ne(i), "handleChange", function (o) {
          if (((An = !1), gy())) {
            var s =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (s.activeElement !== o.target) return;
          }
          var a = i.props.value || "",
            u = nt(i.props.children),
            c = o.target.value,
            l = i.state.selectionStart;
          l == null && (l = o.target.selectionStart);
          var f = i.state.selectionEnd;
          f == null && (f = o.target.selectionEnd);
          var d = ly(
            a,
            c,
            {
              selectionStartBefore: l,
              selectionEndBefore: f,
              selectionEndAfter: o.target.selectionEnd,
            },
            u,
          );
          c = yt(d, u);
          var h = o.target.selectionStart,
            p = o.target.selectionEnd,
            m = !1,
            g = ra(a, u, h);
          g !== void 0 &&
            i.state.selectionEnd > g &&
            ((h = g + (o.nativeEvent.data ? o.nativeEvent.data.length : 0)),
            (p = h),
            (m = !0)),
            i.setState({
              selectionStart: h,
              selectionEnd: p,
              setSelectionAfterMentionChange: m,
            });
          var v = Kt(d, u);
          o.nativeEvent.isComposing &&
            h === p &&
            i.updateMentionsQueries(i.inputElement.value, h);
          var b = {
            target: {
              value: d,
            },
          };
          i.executeOnChange(b, d, c, v);
        }),
        te(ne(i), "handleSelect", function (o) {
          if (
            (i.setState({
              selectionStart: o.target.selectionStart,
              selectionEnd: o.target.selectionEnd,
            }),
            !An)
          ) {
            var s = i.inputElement;
            o.target.selectionStart === o.target.selectionEnd
              ? i.updateMentionsQueries(s.value, o.target.selectionStart)
              : i.clearSuggestions(),
              i.updateHighlighterScroll(),
              i.props.onSelect(o);
          }
        }),
        te(ne(i), "handleKeyDown", function (o) {
          var s = xn(i.state.suggestions);
          if (s === 0 || !i.suggestionsElement) {
            i.props.onKeyDown(o);
            return;
          }
          switch (
            (Object.values(_t).indexOf(o.keyCode) >= 0 &&
              (o.preventDefault(), o.stopPropagation()),
            o.keyCode)
          ) {
            case _t.ESC: {
              i.clearSuggestions();
              return;
            }
            case _t.DOWN: {
              i.shiftFocus(1);
              return;
            }
            case _t.UP: {
              i.shiftFocus(-1);
              return;
            }
            case _t.RETURN: {
              i.selectFocused();
              return;
            }
            case _t.TAB: {
              i.selectFocused();
              return;
            }
            default:
              return;
          }
        }),
        te(ne(i), "shiftFocus", function (o) {
          var s = xn(i.state.suggestions);
          i.setState({
            focusIndex: (s + i.state.focusIndex + o) % s,
            scrollFocusedIntoView: !0,
          });
        }),
        te(ne(i), "selectFocused", function () {
          var o = i.state,
            s = o.suggestions,
            a = o.focusIndex,
            u = Object.values(s).reduce(function (f, d) {
              var h = d.results,
                p = d.queryInfo;
              return [].concat(
                zn(f),
                zn(
                  h.map(function (m) {
                    return {
                      result: m,
                      queryInfo: p,
                    };
                  }),
                ),
              );
            }, [])[a],
            c = u.result,
            l = u.queryInfo;
          i.addMention(c, l),
            i.setState({
              focusIndex: 0,
            });
        }),
        te(ne(i), "handleBlur", function (o) {
          var s = i._suggestionsMouseDown;
          (i._suggestionsMouseDown = !1),
            s ||
              i.setState({
                selectionStart: null,
                selectionEnd: null,
              }),
            window.setTimeout(function () {
              i.updateHighlighterScroll();
            }, 1),
            i.props.onBlur(o, s);
        }),
        te(ne(i), "handleSuggestionsMouseDown", function (o) {
          i._suggestionsMouseDown = !0;
        }),
        te(ne(i), "handleSuggestionsMouseEnter", function (o) {
          i.setState({
            focusIndex: o,
            scrollFocusedIntoView: !1,
          });
        }),
        te(ne(i), "updateSuggestionsPosition", function () {
          var o = i.state.caretPosition,
            s = i.props,
            a = s.suggestionsPortalHost,
            u = s.allowSuggestionsAboveCursor,
            c = s.forceSuggestionsAboveCursor;
          if (!(!o || !i.suggestionsElement)) {
            var l = i.suggestionsElement,
              f = i.highlighterElement,
              d = f.getBoundingClientRect(),
              h = jr(f, "font-size"),
              p = {
                left: d.left + o.left,
                top: d.top + o.top + h,
              },
              m = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
              );
            if (l) {
              var g = {};
              if (a) {
                g.position = "fixed";
                var v = p.left,
                  b = p.top;
                (v -= jr(l, "margin-left")),
                  (b -= jr(l, "margin-top")),
                  (v -= f.scrollLeft),
                  (b -= f.scrollTop);
                var E = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                v + l.offsetWidth > E
                  ? (g.left = Math.max(0, E - l.offsetWidth))
                  : (g.left = v),
                  (u && b + l.offsetHeight > m && l.offsetHeight < b - h) || c
                    ? (g.top = Math.max(0, b - l.offsetHeight - h))
                    : (g.top = b);
              } else {
                var x = o.left - f.scrollLeft,
                  S = o.top - f.scrollTop;
                x + l.offsetWidth > i.containerElement.offsetWidth
                  ? (g.right = 0)
                  : (g.left = x),
                  (u &&
                    p.top - f.scrollTop + l.offsetHeight > m &&
                    l.offsetHeight < d.top - h - f.scrollTop) ||
                  c
                    ? (g.top = S - l.offsetHeight - h)
                    : (g.top = S);
              }
              (g.left === i.state.suggestionsPosition.left &&
                g.top === i.state.suggestionsPosition.top &&
                g.position === i.state.suggestionsPosition.position) ||
                i.setState({
                  suggestionsPosition: g,
                });
            }
          }
        }),
        te(ne(i), "updateHighlighterScroll", function () {
          var o = i.inputElement,
            s = i.highlighterElement;
          !o ||
            !s ||
            ((s.scrollLeft = o.scrollLeft),
            (s.scrollTop = o.scrollTop),
            (s.height = o.height));
        }),
        te(ne(i), "handleCompositionStart", function () {
          An = !0;
        }),
        te(ne(i), "handleCompositionEnd", function () {
          An = !1;
        }),
        te(ne(i), "setSelection", function (o, s) {
          if (!(o === null || s === null)) {
            var a = i.inputElement;
            if (a.setSelectionRange) a.setSelectionRange(o, s);
            else if (a.createTextRange) {
              var u = a.createTextRange();
              u.collapse(!0),
                u.moveEnd("character", s),
                u.moveStart("character", o),
                u.select();
            }
          }
        }),
        te(ne(i), "updateMentionsQueries", function (o, s) {
          i._queryId++,
            (i.suggestions = {}),
            i.setState({
              suggestions: {},
            });
          var a = i.props.value || "",
            u = i.props.children,
            c = nt(u),
            l = _e(a, c, s, "NULL");
          if (l !== null) {
            var f = cy(a.substring(0, l), c),
              d = o.substring(f, s);
            ie.Children.forEach(u, function (h, p) {
              if (h) {
                var m = Oy(h.props.trigger, i.props),
                  g = d.match(m);
                if (g) {
                  var v = f + d.indexOf(g[1], g.index);
                  i.queryData(g[2], p, v, v + g[1].length, o);
                }
              }
            });
          }
        }),
        te(ne(i), "clearSuggestions", function () {
          i._queryId++,
            (i.suggestions = {}),
            i.setState({
              suggestions: {},
              focusIndex: 0,
            });
        }),
        te(ne(i), "queryData", function (o, s, a, u, c) {
          var l = i.props,
            f = l.children,
            d = l.ignoreAccents,
            h = Mt.toArray(f)[s],
            p = Iy(h.props.data, d),
            m = p(o, i.updateSuggestions.bind(null, i._queryId, s, o, a, u, c));
          m instanceof Array &&
            i.updateSuggestions(i._queryId, s, o, a, u, c, m);
        }),
        te(ne(i), "updateSuggestions", function (o, s, a, u, c, l, f) {
          if (o === i._queryId) {
            i.suggestions = ke(
              ke({}, i.suggestions),
              {},
              te({}, s, {
                queryInfo: {
                  childIndex: s,
                  query: a,
                  querySequenceStart: u,
                  querySequenceEnd: c,
                  plainTextValue: l,
                },
                results: f,
              }),
            );
            var d = i.state.focusIndex,
              h = xn(i.suggestions);
            i.setState({
              suggestions: i.suggestions,
              focusIndex: d >= h ? Math.max(h - 1, 0) : d,
            });
          }
        }),
        te(ne(i), "addMention", function (o, s) {
          var a = o.id,
            u = o.display,
            c = s.childIndex,
            l = s.querySequenceStart,
            f = s.querySequenceEnd,
            d = s.plainTextValue,
            h = i.props.value || "",
            p = nt(i.props.children),
            m = Mt.toArray(i.props.children)[c],
            g = m.props,
            v = g.markup,
            b = g.displayTransform,
            E = g.appendSpaceOnAdd,
            x = g.onAdd,
            S = _e(h, p, l, "START"),
            P = S + f - l,
            I = hy(v, a, u);
          E && (I += " ");
          var T = Qt(h, S, P, I);
          i.inputElement.focus();
          var L = b(a, u);
          E && (L += " ");
          var A = l + L.length;
          i.setState({
            selectionStart: A,
            selectionEnd: A,
            setSelectionAfterMentionChange: !0,
          });
          var j = {
              target: {
                value: T,
              },
            },
            X = Kt(T, p),
            q = Qt(d, l, f, L);
          i.executeOnChange(j, T, q, X),
            x && x(a, u, S, P),
            i.clearSuggestions();
        }),
        te(ne(i), "isLoading", function () {
          var o = !1;
          return (
            ie.Children.forEach(i.props.children, function (s) {
              o = o || (s && s.props.isLoading);
            }),
            o
          );
        }),
        te(ne(i), "isOpened", function () {
          return (
            li(i.state.selectionStart) &&
            (xn(i.state.suggestions) !== 0 || i.isLoading())
          );
        }),
        te(ne(i), "_queryId", 0),
        (i.suggestions = {}),
        (i.uuidSuggestionsOverlay = Math.random().toString(16).substring(2)),
        (i.handleCopy = i.handleCopy.bind(ne(i))),
        (i.handleCut = i.handleCut.bind(ne(i))),
        (i.handlePaste = i.handlePaste.bind(ne(i))),
        (i.state = {
          focusIndex: 0,
          selectionStart: null,
          selectionEnd: null,
          suggestions: {},
          caretPosition: null,
          suggestionsPosition: {},
          setSelectionAfterHandlePaste: !1,
        }),
        i
      );
    }
    return (
      xg(n, [
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
          value: function (i, o) {
            o.suggestionsPosition === this.state.suggestionsPosition &&
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
            return /* @__PURE__ */ ie.createElement(
              "div",
              Le(
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
          value: function (i) {
            if (
              i.target === this.inputElement &&
              this.supportsClipboardActions(i)
            ) {
              i.preventDefault();
              var o = this.state,
                s = o.selectionStart,
                a = o.selectionEnd,
                u = this.props,
                c = u.value,
                l = u.children,
                f = nt(l),
                d = _e(c, f, s, "START"),
                h = _e(c, f, a, "END"),
                p = i.clipboardData.getData("text/react-mentions"),
                m = i.clipboardData.getData("text/plain"),
                g = Qt(c, d, h, p || m).replace(/\r/g, ""),
                v = yt(g, f),
                b = {
                  target: ke(
                    ke({}, i.target),
                    {},
                    {
                      value: g,
                    },
                  ),
                };
              this.executeOnChange(b, g, v, Kt(g, f));
              var E = ra(c, f, s),
                x = (E || s) + yt(p || m, f).length;
              this.setState({
                selectionStart: x,
                selectionEnd: x,
                setSelectionAfterHandlePaste: !0,
              });
            }
          },
        },
        {
          key: "saveSelectionToClipboard",
          value: function (i) {
            var o = this.inputElement.selectionStart,
              s = this.inputElement.selectionEnd,
              a = this.props,
              u = a.children,
              c = a.value,
              l = nt(u),
              f = _e(c, l, o, "START"),
              d = _e(c, l, s, "END");
            i.clipboardData.setData("text/plain", i.target.value.slice(o, s)),
              i.clipboardData.setData("text/react-mentions", c.slice(f, d));
          },
        },
        {
          key: "supportsClipboardActions",
          value: function (i) {
            return !!i.clipboardData;
          },
        },
        {
          key: "handleCopy",
          value: function (i) {
            i.target === this.inputElement &&
              this.supportsClipboardActions(i) &&
              (i.preventDefault(), this.saveSelectionToClipboard(i));
          },
        },
        {
          key: "handleCut",
          value: function (i) {
            if (
              i.target === this.inputElement &&
              this.supportsClipboardActions(i)
            ) {
              i.preventDefault(), this.saveSelectionToClipboard(i);
              var o = this.state,
                s = o.selectionStart,
                a = o.selectionEnd,
                u = this.props,
                c = u.children,
                l = u.value,
                f = nt(c),
                d = _e(l, f, s, "START"),
                h = _e(l, f, a, "END"),
                p = [l.slice(0, d), l.slice(h)].join(""),
                m = yt(p, f),
                g = {
                  target: ke(
                    ke({}, i.target),
                    {},
                    {
                      value: m,
                    },
                  ),
                };
              this.executeOnChange(g, p, m, Kt(l, f));
            }
          },
          // Handle input element's change event
        },
      ]),
      n
    );
  })(ie.Component);
te(no, "propTypes", fl);
te(no, "defaultProps", {
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
var jr = function (t, n) {
    var r = parseFloat(window.getComputedStyle(t, null).getPropertyValue(n));
    return isFinite(r) ? r : 0;
  },
  My = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  Fy = sr(
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
        input: ke(
          {
            height: "100%",
            bottom: 0,
            overflow: "hidden",
            resize: "none",
          },
          My
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
  Ny = Fy(no),
  jy = {
    fontWeight: "inherit",
  },
  ro = function (t) {
    var n = t.display,
      r = t.style,
      i = t.className,
      o = t.classNames,
      s = eo(jy, {
        style: r,
        className: i,
        classNames: o,
      });
    return /* @__PURE__ */ ie.createElement("strong", s, n);
  };
ro.propTypes = {
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
  onAdd: V.func,
  onRemove: V.func,
  renderSuggestion: V.func,
  trigger: V.oneOfType([V.string, V.instanceOf(RegExp)]),
  markup: V.string,
  displayTransform: V.func,
  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: V.bool,
  isLoading: V.bool,
};
ro.defaultProps = {
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
const Ly = {
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
          backgroundColor: "#F5F6F8",
        },
      },
    },
  },
  Vy = ({ value: e, setValue: t }) => {
    const n = fe((a) => a.users),
      r = Object.values(n).map((a) => ({
        ...a,
        display: a.display_name,
      })),
      i = (a) => {
        a.stopPropagation();
      },
      o = (a, u) => {
        console.info("[MentionsInputComponent] on mention select", {
          id: a,
          display: u,
        });
      },
      s = (a) => {
        t(a.target.value);
      };
    return /* @__PURE__ */ F.jsx(Ny, {
      autoFocus: !0,
      value: e,
      onChange: s,
      style: {
        ...Ly,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: "Type your reply here...",
      className: "mentions-input",
      onKeyDown: i,
      children: /* @__PURE__ */ F.jsx(ro, {
        displayTransform: (a, u) => `@${u}`,
        trigger: "@",
        data: r,
        appendSpaceOnAdd: !0,
        renderSuggestion: (a, u) =>
          /* @__PURE__ */ F.jsx("div", {
            className: `user ${u ? "focused" : ""}`,
            children: a.display,
          }),
        onAdd: o,
      }),
    });
  },
  ky = Vy,
  $y = ({ comment: e, setComment: t, loading: n }) => {
    const r = fe((i) => (i.currentUserId ? i.users[i.currentUserId] : null));
    return /* @__PURE__ */ F.jsxs("div", {
      className: lt.conversationInputForm,
      children: [
        /* @__PURE__ */ F.jsx(Gu, { user: r }),
        /* @__PURE__ */ F.jsx(ky, { value: e, setValue: t }),
        /* @__PURE__ */ F.jsx(Rm, {
          loading: n,
          color: "primary",
          children: /* @__PURE__ */ F.jsx(ym, {}),
        }),
      ],
    });
  },
  dl = $y,
  By = () => {
    var u;
    const e = fe((c) => c.newConversation),
      t = fe((c) => c.shareId),
      n = Ve(),
      [r, i] = ve(!1),
      [o, s] = ve(""),
      a = async (c) => {
        if ((c.stopPropagation(), c.preventDefault(), !(!e || !t))) {
          i(!0);
          try {
            console.log("saving conversation", e, o);
            const l = await jm(t, {
              ...e,
              message: o,
            });
            if (!l.conversation_group_id) {
              console.error("Unable to create conversation group", l);
              return;
            }
            console.log("Successfully created conversation group", l);
          } catch (l) {
            console.error("error while saving conversation", e, l);
          }
          n(bi([])), i(!1), n(Ei(!0)), n(Ta()), s("");
        }
      };
    return /* @__PURE__ */ F.jsx(fi, {
      className: lt.newConversationForm,
      children: /* @__PURE__ */ F.jsx(di, {
        children: /* @__PURE__ */ F.jsxs("form", {
          onSubmit: a,
          children: [
            /* @__PURE__ */ F.jsx("h4", { children: "Add comment" }),
            (u = e == null ? void 0 : e.meta) != null && u.highlight
              ? /* @__PURE__ */ F.jsx("div", {
                  className: lt.highlightText,
                  children: e.meta.highlight,
                })
              : null,
            /* @__PURE__ */ F.jsx(dl, {
              comment: o,
              setComment: s,
              loading: r,
            }),
          ],
        }),
      }),
    });
  },
  Hy = By;
var hl = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(Kl, function () {
    var n = 1e3,
      r = 6e4,
      i = 36e5,
      o = "millisecond",
      s = "second",
      a = "minute",
      u = "hour",
      c = "day",
      l = "week",
      f = "month",
      d = "quarter",
      h = "year",
      p = "date",
      m = "Invalid Date",
      g =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      v =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      b = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (M) {
          var w = ["th", "st", "nd", "rd"],
            _ = M % 100;
          return "[" + M + (w[(_ - 20) % 10] || w[_] || w[0]) + "]";
        },
      },
      E = function (M, w, _) {
        var O = String(M);
        return !O || O.length >= w
          ? M
          : "" + Array(w + 1 - O.length).join(_) + M;
      },
      x = {
        s: E,
        z: function (M) {
          var w = -M.utcOffset(),
            _ = Math.abs(w),
            O = Math.floor(_ / 60),
            D = _ % 60;
          return (w <= 0 ? "+" : "-") + E(O, 2, "0") + ":" + E(D, 2, "0");
        },
        m: function M(w, _) {
          if (w.date() < _.date()) return -M(_, w);
          var O = 12 * (_.year() - w.year()) + (_.month() - w.month()),
            D = w.clone().add(O, f),
            $ = _ - D < 0,
            C = w.clone().add(O + ($ ? -1 : 1), f);
          return +(-(O + (_ - D) / ($ ? D - C : C - D)) || 0);
        },
        a: function (M) {
          return M < 0 ? Math.ceil(M) || 0 : Math.floor(M);
        },
        p: function (M) {
          return (
            { M: f, y: h, w: l, d: c, D: p, h: u, m: a, s, ms: o, Q: d }[M] ||
            String(M || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (M) {
          return M === void 0;
        },
      },
      S = "en",
      P = {};
    P[S] = b;
    var I = "$isDayjsObject",
      T = function (M) {
        return M instanceof X || !(!M || !M[I]);
      },
      L = function M(w, _, O) {
        var D;
        if (!w) return S;
        if (typeof w == "string") {
          var $ = w.toLowerCase();
          P[$] && (D = $), _ && ((P[$] = _), (D = $));
          var C = w.split("-");
          if (!D && C.length > 1) return M(C[0]);
        } else {
          var R = w.name;
          (P[R] = w), (D = R);
        }
        return !O && D && (S = D), D || (!O && S);
      },
      A = function (M, w) {
        if (T(M)) return M.clone();
        var _ = typeof w == "object" ? w : {};
        return (_.date = M), (_.args = arguments), new X(_);
      },
      j = x;
    (j.l = L),
      (j.i = T),
      (j.w = function (M, w) {
        return A(M, { locale: w.$L, utc: w.$u, x: w.$x, $offset: w.$offset });
      });
    var X = (function () {
        function M(_) {
          (this.$L = L(_.locale, null, !0)),
            this.parse(_),
            (this.$x = this.$x || _.x || {}),
            (this[I] = !0);
        }
        var w = M.prototype;
        return (
          (w.parse = function (_) {
            (this.$d = (function (O) {
              var D = O.date,
                $ = O.utc;
              if (D === null) return /* @__PURE__ */ new Date(NaN);
              if (j.u(D)) return /* @__PURE__ */ new Date();
              if (D instanceof Date) return new Date(D);
              if (typeof D == "string" && !/Z$/i.test(D)) {
                var C = D.match(g);
                if (C) {
                  var R = C[2] - 1 || 0,
                    H = (C[7] || "0").substring(0, 3);
                  return $
                    ? new Date(
                        Date.UTC(
                          C[1],
                          R,
                          C[3] || 1,
                          C[4] || 0,
                          C[5] || 0,
                          C[6] || 0,
                          H,
                        ),
                      )
                    : new Date(
                        C[1],
                        R,
                        C[3] || 1,
                        C[4] || 0,
                        C[5] || 0,
                        C[6] || 0,
                        H,
                      );
                }
              }
              return new Date(D);
            })(_)),
              this.init();
          }),
          (w.init = function () {
            var _ = this.$d;
            (this.$y = _.getFullYear()),
              (this.$M = _.getMonth()),
              (this.$D = _.getDate()),
              (this.$W = _.getDay()),
              (this.$H = _.getHours()),
              (this.$m = _.getMinutes()),
              (this.$s = _.getSeconds()),
              (this.$ms = _.getMilliseconds());
          }),
          (w.$utils = function () {
            return j;
          }),
          (w.isValid = function () {
            return this.$d.toString() !== m;
          }),
          (w.isSame = function (_, O) {
            var D = A(_);
            return this.startOf(O) <= D && D <= this.endOf(O);
          }),
          (w.isAfter = function (_, O) {
            return A(_) < this.startOf(O);
          }),
          (w.isBefore = function (_, O) {
            return this.endOf(O) < A(_);
          }),
          (w.$g = function (_, O, D) {
            return j.u(_) ? this[O] : this.set(D, _);
          }),
          (w.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (w.valueOf = function () {
            return this.$d.getTime();
          }),
          (w.startOf = function (_, O) {
            var D = this,
              $ = !!j.u(O) || O,
              C = j.p(_),
              R = function (ee, W) {
                var ce = j.w(
                  D.$u ? Date.UTC(D.$y, W, ee) : new Date(D.$y, W, ee),
                  D,
                );
                return $ ? ce : ce.endOf(c);
              },
              H = function (ee, W) {
                return j.w(
                  D.toDate()[ee].apply(
                    D.toDate("s"),
                    ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(W),
                  ),
                  D,
                );
              },
              U = this.$W,
              z = this.$M,
              Z = this.$D,
              K = "set" + (this.$u ? "UTC" : "");
            switch (C) {
              case h:
                return $ ? R(1, 0) : R(31, 11);
              case f:
                return $ ? R(1, z) : R(0, z + 1);
              case l:
                var G = this.$locale().weekStart || 0,
                  Q = (U < G ? U + 7 : U) - G;
                return R($ ? Z - Q : Z + (6 - Q), z);
              case c:
              case p:
                return H(K + "Hours", 0);
              case u:
                return H(K + "Minutes", 1);
              case a:
                return H(K + "Seconds", 2);
              case s:
                return H(K + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (w.endOf = function (_) {
            return this.startOf(_, !1);
          }),
          (w.$set = function (_, O) {
            var D,
              $ = j.p(_),
              C = "set" + (this.$u ? "UTC" : ""),
              R = ((D = {}),
              (D[c] = C + "Date"),
              (D[p] = C + "Date"),
              (D[f] = C + "Month"),
              (D[h] = C + "FullYear"),
              (D[u] = C + "Hours"),
              (D[a] = C + "Minutes"),
              (D[s] = C + "Seconds"),
              (D[o] = C + "Milliseconds"),
              D)[$],
              H = $ === c ? this.$D + (O - this.$W) : O;
            if ($ === f || $ === h) {
              var U = this.clone().set(p, 1);
              U.$d[R](H),
                U.init(),
                (this.$d = U.set(p, Math.min(this.$D, U.daysInMonth())).$d);
            } else R && this.$d[R](H);
            return this.init(), this;
          }),
          (w.set = function (_, O) {
            return this.clone().$set(_, O);
          }),
          (w.get = function (_) {
            return this[j.p(_)]();
          }),
          (w.add = function (_, O) {
            var D,
              $ = this;
            _ = Number(_);
            var C = j.p(O),
              R = function (z) {
                var Z = A($);
                return j.w(Z.date(Z.date() + Math.round(z * _)), $);
              };
            if (C === f) return this.set(f, this.$M + _);
            if (C === h) return this.set(h, this.$y + _);
            if (C === c) return R(1);
            if (C === l) return R(7);
            var H = ((D = {}), (D[a] = r), (D[u] = i), (D[s] = n), D)[C] || 1,
              U = this.$d.getTime() + _ * H;
            return j.w(U, this);
          }),
          (w.subtract = function (_, O) {
            return this.add(-1 * _, O);
          }),
          (w.format = function (_) {
            var O = this,
              D = this.$locale();
            if (!this.isValid()) return D.invalidDate || m;
            var $ = _ || "YYYY-MM-DDTHH:mm:ssZ",
              C = j.z(this),
              R = this.$H,
              H = this.$m,
              U = this.$M,
              z = D.weekdays,
              Z = D.months,
              K = D.meridiem,
              G = function (W, ce, k, be) {
                return (W && (W[ce] || W(O, $))) || k[ce].slice(0, be);
              },
              Q = function (W) {
                return j.s(R % 12 || 12, W, "0");
              },
              ee =
                K ||
                function (W, ce, k) {
                  var be = W < 12 ? "AM" : "PM";
                  return k ? be.toLowerCase() : be;
                };
            return $.replace(v, function (W, ce) {
              return (
                ce ||
                (function (k) {
                  switch (k) {
                    case "YY":
                      return String(O.$y).slice(-2);
                    case "YYYY":
                      return j.s(O.$y, 4, "0");
                    case "M":
                      return U + 1;
                    case "MM":
                      return j.s(U + 1, 2, "0");
                    case "MMM":
                      return G(D.monthsShort, U, Z, 3);
                    case "MMMM":
                      return G(Z, U);
                    case "D":
                      return O.$D;
                    case "DD":
                      return j.s(O.$D, 2, "0");
                    case "d":
                      return String(O.$W);
                    case "dd":
                      return G(D.weekdaysMin, O.$W, z, 2);
                    case "ddd":
                      return G(D.weekdaysShort, O.$W, z, 3);
                    case "dddd":
                      return z[O.$W];
                    case "H":
                      return String(R);
                    case "HH":
                      return j.s(R, 2, "0");
                    case "h":
                      return Q(1);
                    case "hh":
                      return Q(2);
                    case "a":
                      return ee(R, H, !0);
                    case "A":
                      return ee(R, H, !1);
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
                      return C;
                  }
                  return null;
                })(W) ||
                C.replace(":", "")
              );
            });
          }),
          (w.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (w.diff = function (_, O, D) {
            var $,
              C = this,
              R = j.p(O),
              H = A(_),
              U = (H.utcOffset() - this.utcOffset()) * r,
              z = this - H,
              Z = function () {
                return j.m(C, H);
              };
            switch (R) {
              case h:
                $ = Z() / 12;
                break;
              case f:
                $ = Z();
                break;
              case d:
                $ = Z() / 3;
                break;
              case l:
                $ = (z - U) / 6048e5;
                break;
              case c:
                $ = (z - U) / 864e5;
                break;
              case u:
                $ = z / i;
                break;
              case a:
                $ = z / r;
                break;
              case s:
                $ = z / n;
                break;
              default:
                $ = z;
            }
            return D ? $ : j.a($);
          }),
          (w.daysInMonth = function () {
            return this.endOf(f).$D;
          }),
          (w.$locale = function () {
            return P[this.$L];
          }),
          (w.locale = function (_, O) {
            if (!_) return this.$L;
            var D = this.clone(),
              $ = L(_, O, !0);
            return $ && (D.$L = $), D;
          }),
          (w.clone = function () {
            return j.w(this.$d, this);
          }),
          (w.toDate = function () {
            return new Date(this.valueOf());
          }),
          (w.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (w.toISOString = function () {
            return this.$d.toISOString();
          }),
          (w.toString = function () {
            return this.$d.toUTCString();
          }),
          M
        );
      })(),
      q = X.prototype;
    return (
      (A.prototype = q),
      [
        ["$ms", o],
        ["$s", s],
        ["$m", a],
        ["$H", u],
        ["$W", c],
        ["$M", f],
        ["$y", h],
        ["$D", p],
      ].forEach(function (M) {
        q[M[1]] = function (w) {
          return this.$g(w, M[0], M[1]);
        };
      }),
      (A.extend = function (M, w) {
        return M.$i || (M(w, X, A), (M.$i = !0)), A;
      }),
      (A.locale = L),
      (A.isDayjs = T),
      (A.unix = function (M) {
        return A(1e3 * M);
      }),
      (A.en = P[S]),
      (A.Ls = P),
      (A.p = {}),
      A
    );
  });
})(hl);
var Uy = hl.exports;
const zy = /* @__PURE__ */ qn(Uy),
  Wy = ({ conversationGroupId: e }) => {
    const t = fe((s) => s.shareId),
      n = Ve(),
      [r, i] = ve(!1),
      o = async () => {
        e &&
          (i(!0),
          await $m(t, e),
          n(Wc({ conversationGroupId: e, shareId: t })),
          i(!1));
      };
    return e
      ? /* @__PURE__ */ F.jsx(Tm, {
          disabled: r,
          className: lt.resolveButton,
          title: "Resolve conversation",
          onClick: o,
          children: /* @__PURE__ */ F.jsx(gm, {}),
        })
      : null;
  },
  Yy = Wy,
  qy = ({
    user: e,
    timestamp: t,
    showResolveButton: n,
    conversationGroupId: r,
  }) =>
    /* @__PURE__ */ F.jsxs(Ul, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ F.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ F.jsx(Gu, { user: e }),
            /* @__PURE__ */ F.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ F.jsx("span", {
              children: zy(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        n ? /* @__PURE__ */ F.jsx(Yy, { conversationGroupId: r }) : null,
      ],
    }),
  pl = qy,
  Ky = ({ conversation: e }) => {
    const t = fe((n) => {
      var r;
      return (r = n.users) == null ? void 0 : r[e == null ? void 0 : e.user_id];
    });
    return /* @__PURE__ */ F.jsxs(fi, {
      children: [
        /* @__PURE__ */ F.jsx(pl, { user: t, timestamp: e.timestamp }),
        /* @__PURE__ */ F.jsx(di, {
          children: /* @__PURE__ */ F.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\(\d+\)/g, "@$1"),
          }),
        }),
      ],
    });
  },
  Gy = Ky,
  Xy = ({ conversationGroupId: e }) => {
    const t = fe((u) => u.shareId),
      [n, r] = ve(""),
      [i, o] = ve(!1),
      s = Ve(),
      a = async (u) => {
        if ((u.stopPropagation(), u.preventDefault(), !(!t || !e))) {
          o(!0),
            console.log("saving reply", t, e, {
              message: n,
            });
          try {
            await Lm(t, e, {
              message: n,
            });
          } catch (c) {
            console.error("error while saving reply", c);
          }
          s(bi([])), o(!1);
        }
      };
    return /* @__PURE__ */ F.jsx("div", {
      className: lt.replyForm,
      children: /* @__PURE__ */ F.jsx("form", {
        onSubmit: a,
        className: "",
        children: /* @__PURE__ */ F.jsx(dl, {
          comment: n,
          setComment: r,
          loading: i,
        }),
      }),
    });
  },
  Zy = Xy,
  Jy = ({ conversationGroup: e }) => {
    var f;
    const t = Re(null),
      n = fe((d) => {
        var h;
        return (h = d.users) == null ? void 0 : h[e == null ? void 0 : e.owner];
      }),
      r = fe((d) => d.selectedConversationId),
      i = Ve(),
      [o, s] = ve(!1);
    if (
      (De(() => {
        var d;
        r &&
          ((d = t.current) == null ||
            d.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [r]),
      !((f = e == null ? void 0 : e.conversations) != null && f.length) ||
        (e == null ? void 0 : e.status) !== "Pending")
    )
      return null;
    const a = () => {
        i(vi(e.conversation_group_id));
      },
      [u, ...c] = e.conversations,
      l = c.length
        ? c.length > 1
          ? `${c.length} replies`
          : `${c.length} reply`
        : "Reply";
    return /* @__PURE__ */ F.jsxs(fi, {
      className: `${lt.conversationGroup} ${
        r === e.conversation_group_id ? "active" : ""
      }`,
      onClick: a,
      ref: t,
      children: [
        /* @__PURE__ */ F.jsx(pl, {
          user: n,
          timestamp: u.timestamp,
          showResolveButton: !0,
          conversationGroupId: e.conversation_group_id,
        }),
        /* @__PURE__ */ F.jsxs(di, {
          children: [
            /* @__PURE__ */ F.jsx("p", {
              children: u.message.replace(/@\[(.*?)\]\(\d+\)/g, "@$1"),
            }),
            /* @__PURE__ */ F.jsx(ln, {
              onClick: () => s((d) => !d),
              color: "link",
              children: l,
            }),
            c.length
              ? /* @__PURE__ */ F.jsx(F.Fragment, {
                  children: o
                    ? /* @__PURE__ */ F.jsx(F.Fragment, {
                        children: c.map((d) =>
                          /* @__PURE__ */ F.jsx(
                            Gy,
                            { conversation: d },
                            d.conversation_id,
                          ),
                        ),
                      })
                    : null,
                })
              : null,
            o
              ? /* @__PURE__ */ F.jsx(Zy, {
                  conversationGroupId: e.conversation_group_id,
                })
              : null,
          ],
        }),
      ],
    });
  },
  Qy = Jy,
  ev = () => {
    const e = fe((t) => t.conversations);
    return !e || !Object.keys(e).length
      ? /* @__PURE__ */ F.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ F.jsx("div", {
          children: Object.values(e).map((t) =>
            /* @__PURE__ */ F.jsx(
              Qy,
              {
                conversationGroup: t,
              },
              t.conversation_group_id,
            ),
          ),
        });
  },
  tv = ev,
  nv = () => {
    const e = fe((s) => s.isRightPanelOpen),
      t = fe((s) => s.selectedConversationId),
      n = fe((s) => s.newConversation),
      r = Ve(),
      i = () => {
        r(Ei(!1)), r(vi(void 0)), r(Ta());
      };
    return !!n || e || t
      ? /* @__PURE__ */ F.jsxs(F.Fragment, {
          children: [
            /* @__PURE__ */ F.jsx(zl, {
              onClick: i,
              className: lt.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ F.jsxs("div", {
              className: lt.conversationRightPanel,
              children: [
                /* @__PURE__ */ F.jsx("h3", { children: "Comments" }),
                n
                  ? /* @__PURE__ */ F.jsx(Hy, {})
                  : /* @__PURE__ */ F.jsx(tv, {}),
              ],
            }),
          ],
        })
      : null;
  },
  rv = nv;
var $e = /* @__PURE__ */ ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.UNINITIALIZED = 1)] = "UNINITIALIZED"),
  (e[(e.INITIALIZED = 2)] = "INITIALIZED"),
  e
))($e || {});
const iv = () => {
    const e = fe((o) => o.shareId),
      t = Ve(),
      n = fe((o) => Object.keys(o.conversations || {})),
      [r, i] = ve($e.UNINITIALIZED);
    return (
      De(() => {
        r !== $e.UNINITIALIZED ||
          !e ||
          Object.keys(n || {}).length ||
          (i($e.LOADING),
          Vm(e)
            .then((o) => {
              console.log("useConversations", o),
                t(bi(o == null ? void 0 : o.dbt_docs_share_conversations));
            })
            .catch((o) =>
              console.error("error while fetching conversations list", o),
            )
            .finally(() => {
              i($e.INITIALIZED);
            }));
      }, [t, r, n, e]),
      { isLoading: r === $e.LOADING }
    );
  },
  ov = () => {
    const e = Ve(),
      t = fe((i) => Object.keys(i.users || {})),
      [n, r] = ve($e.UNINITIALIZED);
    return (
      De(() => {
        n !== $e.UNINITIALIZED ||
          Object.keys(t).length ||
          (r($e.LOADING),
          km()
            .then((i) => {
              console.log("useConversationUsers", i), e(zc(i));
            })
            .catch((i) => console.error("error while fetching users list", i))
            .finally(() => {
              r($e.INITIALIZED);
            }));
      }, [e, n, t]),
      { isLoading: n === $e.LOADING }
    );
  },
  sv = ({ onSelectionEnd: e }) => (
    ov(),
    iv(),
    /* @__PURE__ */ F.jsxs("div", {
      children: [
        /* @__PURE__ */ F.jsx(rv, {}),
        /* @__PURE__ */ F.jsx(Ku, {}),
        /* @__PURE__ */ F.jsx(ag, { onSelectionEnd: e }),
      ],
    })
  ),
  av = sv,
  uv = $l(() => import("./DbtDocsRenderer.js")),
  lv = () => {
    const { loading: e, shareDetails: t } = Bm(),
      n = Ve(),
      { getHighlightedSelectionData: r, pos: i, onSelectionEnd: o } = Wm(),
      s = () => {
        const a = r();
        a && n(Sa(a));
      };
    return e
      ? /* @__PURE__ */ F.jsx("div", { children: "Loading..." })
      : !(t != null && t.catalog_presigned_url) ||
        !(t != null && t.manifest_presigned_url)
      ? /* @__PURE__ */ F.jsx("div", {
          children: "Unable to load required artifacts. Please try again.",
        })
      : /* @__PURE__ */ F.jsxs("div", {
          children: [
            /* @__PURE__ */ F.jsxs("div", {
              className: "d-flex justify-content-end mb-2",
              children: [
                /* @__PURE__ */ F.jsx(Qm, {}),
                /* @__PURE__ */ F.jsx(Fm, {}),
              ],
            }),
            /* @__PURE__ */ F.jsx(av, { onSelectionEnd: o }),
            /* @__PURE__ */ F.jsx(uv, {
              shareDetails: t,
              onSelectionEnd: o,
            }),
            i ? /* @__PURE__ */ F.jsx(Im, { pos: i, onAddComment: s }) : null,
          ],
        });
  },
  cv = lv,
  fv = ({ shareId: e, userId: t, conversationGroupId: n }) =>
    /* @__PURE__ */ F.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ F.jsx(qc, {
        shareId: e,
        userId: t,
        conversationGroupId: n,
        children: /* @__PURE__ */ F.jsx(cv, {}),
      }),
    }),
  xv = fv;
export {
  $t as A,
  xv as D,
  fe as a,
  bv as b,
  Tv as c,
  Un as d,
  lt as e,
  Zl as g,
  F as j,
  Ev as s,
  Ve as u,
};
