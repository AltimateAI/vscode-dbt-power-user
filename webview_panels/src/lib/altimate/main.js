import "./main.css";
import * as Ee from "react";
import oe, {
  createContext as Ue,
  useReducer as Ko,
  useCallback as Me,
  useMemo as Pe,
  useContext as Ve,
  useLayoutEffect as Go,
  useEffect as Ae,
  useRef as Re,
  useState as ge,
  useId as Mr,
  useInsertionEffect as Xo,
  cloneElement as Zo,
  Children as Je,
  isValidElement as $r,
  Component as Jo,
  createElement as Qn,
  lazy as Qo,
} from "react";
import {
  Tooltip as ei,
  Button as Ft,
  Spinner as ti,
  Card as jt,
  CardTitle as kr,
  CardBody as Mt,
  CloseButton as ni,
} from "reactstrap";
import ri, { createPortal as _n } from "react-dom";
import { Prism as oi } from "react-syntax-highlighter";
var Sn = /* @__PURE__ */ ((e) => (
    (e.DBT_DOCS = "dbt-docs"),
    (e.DOCUMENTATION_EDITOR = "documentation-editor"),
    (e.SAAS = "saas"),
    e
  ))(Sn || {}),
  ii =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {};
function $t(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var cn = { exports: {} },
  it = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var er;
function ai() {
  if (er) return it;
  er = 1;
  var e = oe,
    t = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    n = Object.prototype.hasOwnProperty,
    r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(u, c, d) {
    var s,
      l = {},
      f = null,
      g = null;
    d !== void 0 && (f = "" + d),
      c.key !== void 0 && (f = "" + c.key),
      c.ref !== void 0 && (g = c.ref);
    for (s in c) n.call(c, s) && !i.hasOwnProperty(s) && (l[s] = c[s]);
    if (u && u.defaultProps)
      for (s in ((c = u.defaultProps), c)) l[s] === void 0 && (l[s] = c[s]);
    return {
      $$typeof: t,
      type: u,
      key: f,
      ref: g,
      props: l,
      _owner: r.current,
    };
  }
  return (it.Fragment = o), (it.jsx = a), (it.jsxs = a), it;
}
var at = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tr;
function si() {
  return (
    tr ||
      ((tr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = oe,
            t = Symbol.for("react.element"),
            o = Symbol.for("react.portal"),
            n = Symbol.for("react.fragment"),
            r = Symbol.for("react.strict_mode"),
            i = Symbol.for("react.profiler"),
            a = Symbol.for("react.provider"),
            u = Symbol.for("react.context"),
            c = Symbol.for("react.forward_ref"),
            d = Symbol.for("react.suspense"),
            s = Symbol.for("react.suspense_list"),
            l = Symbol.for("react.memo"),
            f = Symbol.for("react.lazy"),
            g = Symbol.for("react.offscreen"),
            p = Symbol.iterator,
            m = "@@iterator";
          function v(h) {
            if (h === null || typeof h != "object") return null;
            var N = (p && h[p]) || h[m];
            return typeof N == "function" ? N : null;
          }
          var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function _(h) {
            {
              for (
                var N = arguments.length,
                  B = new Array(N > 1 ? N - 1 : 0),
                  X = 1;
                X < N;
                X++
              )
                B[X - 1] = arguments[X];
              S("error", h, B);
            }
          }
          function S(h, N, B) {
            {
              var X = b.ReactDebugCurrentFrame,
                ie = X.getStackAddendum();
              ie !== "" && ((N += "%s"), (B = B.concat([ie])));
              var ce = B.map(function (re) {
                return String(re);
              });
              ce.unshift("Warning: " + N),
                Function.prototype.apply.call(console[h], console, ce);
            }
          }
          var O = !1,
            E = !1,
            F = !1,
            j = !1,
            y = !1,
            H;
          H = Symbol.for("react.module.reference");
          function A(h) {
            return !!(
              typeof h == "string" ||
              typeof h == "function" ||
              h === n ||
              h === i ||
              y ||
              h === r ||
              h === d ||
              h === s ||
              j ||
              h === g ||
              O ||
              E ||
              F ||
              (typeof h == "object" &&
                h !== null &&
                (h.$$typeof === f ||
                  h.$$typeof === l ||
                  h.$$typeof === a ||
                  h.$$typeof === u ||
                  h.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  h.$$typeof === H ||
                  h.getModuleId !== void 0))
            );
          }
          function k(h, N, B) {
            var X = h.displayName;
            if (X) return X;
            var ie = N.displayName || N.name || "";
            return ie !== "" ? B + "(" + ie + ")" : B;
          }
          function Z(h) {
            return h.displayName || "Context";
          }
          function G(h) {
            if (h == null) return null;
            if (
              (typeof h.tag == "number" &&
                _(
                  "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                ),
              typeof h == "function")
            )
              return h.displayName || h.name || null;
            if (typeof h == "string") return h;
            switch (h) {
              case n:
                return "Fragment";
              case o:
                return "Portal";
              case i:
                return "Profiler";
              case r:
                return "StrictMode";
              case d:
                return "Suspense";
              case s:
                return "SuspenseList";
            }
            if (typeof h == "object")
              switch (h.$$typeof) {
                case u:
                  var N = h;
                  return Z(N) + ".Consumer";
                case a:
                  var B = h;
                  return Z(B._context) + ".Provider";
                case c:
                  return k(h, h.render, "ForwardRef");
                case l:
                  var X = h.displayName || null;
                  return X !== null ? X : G(h.type) || "Memo";
                case f: {
                  var ie = h,
                    ce = ie._payload,
                    re = ie._init;
                  try {
                    return G(re(ce));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var P = Object.assign,
            I = 0,
            T,
            x,
            R,
            L,
            C,
            D,
            z;
          function U() {}
          U.__reactDisabledLog = !0;
          function V() {
            {
              if (I === 0) {
                (T = console.log),
                  (x = console.info),
                  (R = console.warn),
                  (L = console.error),
                  (C = console.group),
                  (D = console.groupCollapsed),
                  (z = console.groupEnd);
                var h = {
                  configurable: !0,
                  enumerable: !0,
                  value: U,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: h,
                  log: h,
                  warn: h,
                  error: h,
                  group: h,
                  groupCollapsed: h,
                  groupEnd: h,
                });
              }
              I++;
            }
          }
          function K() {
            {
              if ((I--, I === 0)) {
                var h = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: P({}, h, {
                    value: T,
                  }),
                  info: P({}, h, {
                    value: x,
                  }),
                  warn: P({}, h, {
                    value: R,
                  }),
                  error: P({}, h, {
                    value: L,
                  }),
                  group: P({}, h, {
                    value: C,
                  }),
                  groupCollapsed: P({}, h, {
                    value: D,
                  }),
                  groupEnd: P({}, h, {
                    value: z,
                  }),
                });
              }
              I < 0 &&
                _(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                );
            }
          }
          var q = b.ReactCurrentDispatcher,
            Y;
          function J(h, N, B) {
            {
              if (Y === void 0)
                try {
                  throw Error();
                } catch (ie) {
                  var X = ie.stack.trim().match(/\n( *(at )?)/);
                  Y = (X && X[1]) || "";
                }
              return (
                `
` +
                Y +
                h
              );
            }
          }
          var Q = !1,
            W;
          {
            var le = typeof WeakMap == "function" ? WeakMap : Map;
            W = new le();
          }
          function $(h, N) {
            if (!h || Q) return "";
            {
              var B = W.get(h);
              if (B !== void 0) return B;
            }
            var X;
            Q = !0;
            var ie = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var ce;
            (ce = q.current), (q.current = null), V();
            try {
              if (N) {
                var re = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(re.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(re, []);
                  } catch (Ie) {
                    X = Ie;
                  }
                  Reflect.construct(h, [], re);
                } else {
                  try {
                    re.call();
                  } catch (Ie) {
                    X = Ie;
                  }
                  h.call(re.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Ie) {
                  X = Ie;
                }
                h();
              }
            } catch (Ie) {
              if (Ie && X && typeof Ie.stack == "string") {
                for (
                  var ne = Ie.stack.split(`
`),
                    ve = X.stack.split(`
`),
                    de = ne.length - 1,
                    pe = ve.length - 1;
                  de >= 1 && pe >= 0 && ne[de] !== ve[pe];

                )
                  pe--;
                for (; de >= 1 && pe >= 0; de--, pe--)
                  if (ne[de] !== ve[pe]) {
                    if (de !== 1 || pe !== 1)
                      do
                        if ((de--, pe--, pe < 0 || ne[de] !== ve[pe])) {
                          var Se =
                            `
` + ne[de].replace(" at new ", " at ");
                          return (
                            h.displayName &&
                              Se.includes("<anonymous>") &&
                              (Se = Se.replace("<anonymous>", h.displayName)),
                            typeof h == "function" && W.set(h, Se),
                            Se
                          );
                        }
                      while (de >= 1 && pe >= 0);
                    break;
                  }
              }
            } finally {
              (Q = !1), (q.current = ce), K(), (Error.prepareStackTrace = ie);
            }
            var Ye = h ? h.displayName || h.name : "",
              Jn = Ye ? J(Ye) : "";
            return typeof h == "function" && W.set(h, Jn), Jn;
          }
          function he(h, N, B) {
            return $(h, !1);
          }
          function We(h) {
            var N = h.prototype;
            return !!(N && N.isReactComponent);
          }
          function ke(h, N, B) {
            if (h == null) return "";
            if (typeof h == "function") return $(h, We(h));
            if (typeof h == "string") return J(h);
            switch (h) {
              case d:
                return J("Suspense");
              case s:
                return J("SuspenseList");
            }
            if (typeof h == "object")
              switch (h.$$typeof) {
                case c:
                  return he(h.render);
                case l:
                  return ke(h.type, N, B);
                case f: {
                  var X = h,
                    ie = X._payload,
                    ce = X._init;
                  try {
                    return ke(ce(ie), N, B);
                  } catch {}
                }
              }
            return "";
          }
          var vt = Object.prototype.hasOwnProperty,
            Bn = {},
            Hn = b.ReactDebugCurrentFrame;
          function mt(h) {
            if (h) {
              var N = h._owner,
                B = ke(h.type, h._source, N ? N.type : null);
              Hn.setExtraStackFrame(B);
            } else Hn.setExtraStackFrame(null);
          }
          function Ro(h, N, B, X, ie) {
            {
              var ce = Function.call.bind(vt);
              for (var re in h)
                if (ce(h, re)) {
                  var ne = void 0;
                  try {
                    if (typeof h[re] != "function") {
                      var ve = Error(
                        (X || "React class") +
                          ": " +
                          B +
                          " type `" +
                          re +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof h[re] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      );
                      throw ((ve.name = "Invariant Violation"), ve);
                    }
                    ne = h[re](
                      N,
                      re,
                      X,
                      B,
                      null,
                      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                    );
                  } catch (de) {
                    ne = de;
                  }
                  ne &&
                    !(ne instanceof Error) &&
                    (mt(ie),
                    _(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      X || "React class",
                      B,
                      re,
                      typeof ne,
                    ),
                    mt(null)),
                    ne instanceof Error &&
                      !(ne.message in Bn) &&
                      ((Bn[ne.message] = !0),
                      mt(ie),
                      _("Failed %s type: %s", B, ne.message),
                      mt(null));
                }
            }
          }
          var wo = Array.isArray;
          function qt(h) {
            return wo(h);
          }
          function Io(h) {
            {
              var N = typeof Symbol == "function" && Symbol.toStringTag,
                B =
                  (N && h[Symbol.toStringTag]) ||
                  h.constructor.name ||
                  "Object";
              return B;
            }
          }
          function xo(h) {
            try {
              return zn(h), !1;
            } catch {
              return !0;
            }
          }
          function zn(h) {
            return "" + h;
          }
          function Un(h) {
            if (xo(h))
              return (
                _(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  Io(h),
                ),
                zn(h)
              );
          }
          var ot = b.ReactCurrentOwner,
            Po = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Vn,
            Wn,
            Yt;
          Yt = {};
          function No(h) {
            if (vt.call(h, "ref")) {
              var N = Object.getOwnPropertyDescriptor(h, "ref").get;
              if (N && N.isReactWarning) return !1;
            }
            return h.ref !== void 0;
          }
          function Fo(h) {
            if (vt.call(h, "key")) {
              var N = Object.getOwnPropertyDescriptor(h, "key").get;
              if (N && N.isReactWarning) return !1;
            }
            return h.key !== void 0;
          }
          function jo(h, N) {
            if (
              typeof h.ref == "string" &&
              ot.current &&
              N &&
              ot.current.stateNode !== N
            ) {
              var B = G(ot.current.type);
              Yt[B] ||
                (_(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  G(ot.current.type),
                  h.ref,
                ),
                (Yt[B] = !0));
            }
          }
          function Mo(h, N) {
            {
              var B = function () {
                Vn ||
                  ((Vn = !0),
                  _(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    N,
                  ));
              };
              (B.isReactWarning = !0),
                Object.defineProperty(h, "key", {
                  get: B,
                  configurable: !0,
                });
            }
          }
          function $o(h, N) {
            {
              var B = function () {
                Wn ||
                  ((Wn = !0),
                  _(
                    "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    N,
                  ));
              };
              (B.isReactWarning = !0),
                Object.defineProperty(h, "ref", {
                  get: B,
                  configurable: !0,
                });
            }
          }
          var ko = function (h, N, B, X, ie, ce, re) {
            var ne = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: h,
              key: N,
              ref: B,
              props: re,
              // Record the component responsible for creating this element.
              _owner: ce,
            };
            return (
              (ne._store = {}),
              Object.defineProperty(ne._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(ne, "_self", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: X,
              }),
              Object.defineProperty(ne, "_source", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: ie,
              }),
              Object.freeze && (Object.freeze(ne.props), Object.freeze(ne)),
              ne
            );
          };
          function Lo(h, N, B, X, ie) {
            {
              var ce,
                re = {},
                ne = null,
                ve = null;
              B !== void 0 && (Un(B), (ne = "" + B)),
                Fo(N) && (Un(N.key), (ne = "" + N.key)),
                No(N) && ((ve = N.ref), jo(N, ie));
              for (ce in N)
                vt.call(N, ce) && !Po.hasOwnProperty(ce) && (re[ce] = N[ce]);
              if (h && h.defaultProps) {
                var de = h.defaultProps;
                for (ce in de) re[ce] === void 0 && (re[ce] = de[ce]);
              }
              if (ne || ve) {
                var pe =
                  typeof h == "function"
                    ? h.displayName || h.name || "Unknown"
                    : h;
                ne && Mo(re, pe), ve && $o(re, pe);
              }
              return ko(h, ne, ve, ie, X, ot.current, re);
            }
          }
          var Kt = b.ReactCurrentOwner,
            qn = b.ReactDebugCurrentFrame;
          function qe(h) {
            if (h) {
              var N = h._owner,
                B = ke(h.type, h._source, N ? N.type : null);
              qn.setExtraStackFrame(B);
            } else qn.setExtraStackFrame(null);
          }
          var Gt;
          Gt = !1;
          function Xt(h) {
            return typeof h == "object" && h !== null && h.$$typeof === t;
          }
          function Yn() {
            {
              if (Kt.current) {
                var h = G(Kt.current.type);
                if (h)
                  return (
                    `

Check the render method of \`` +
                    h +
                    "`."
                  );
              }
              return "";
            }
          }
          function Bo(h) {
            {
              if (h !== void 0) {
                var N = h.fileName.replace(/^.*[\\\/]/, ""),
                  B = h.lineNumber;
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
          var Kn = {};
          function Ho(h) {
            {
              var N = Yn();
              if (!N) {
                var B = typeof h == "string" ? h : h.displayName || h.name;
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
          function Gn(h, N) {
            {
              if (!h._store || h._store.validated || h.key != null) return;
              h._store.validated = !0;
              var B = Ho(N);
              if (Kn[B]) return;
              Kn[B] = !0;
              var X = "";
              h &&
                h._owner &&
                h._owner !== Kt.current &&
                (X = " It was passed a child from " + G(h._owner.type) + "."),
                qe(h),
                _(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  B,
                  X,
                ),
                qe(null);
            }
          }
          function Xn(h, N) {
            {
              if (typeof h != "object") return;
              if (qt(h))
                for (var B = 0; B < h.length; B++) {
                  var X = h[B];
                  Xt(X) && Gn(X, N);
                }
              else if (Xt(h)) h._store && (h._store.validated = !0);
              else if (h) {
                var ie = v(h);
                if (typeof ie == "function" && ie !== h.entries)
                  for (var ce = ie.call(h), re; !(re = ce.next()).done; )
                    Xt(re.value) && Gn(re.value, N);
              }
            }
          }
          function zo(h) {
            {
              var N = h.type;
              if (N == null || typeof N == "string") return;
              var B;
              if (typeof N == "function") B = N.propTypes;
              else if (
                typeof N == "object" &&
                (N.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  N.$$typeof === l)
              )
                B = N.propTypes;
              else return;
              if (B) {
                var X = G(N);
                Ro(B, h.props, "prop", X, h);
              } else if (N.PropTypes !== void 0 && !Gt) {
                Gt = !0;
                var ie = G(N);
                _(
                  "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                  ie || "Unknown",
                );
              }
              typeof N.getDefaultProps == "function" &&
                !N.getDefaultProps.isReactClassApproved &&
                _(
                  "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                );
            }
          }
          function Uo(h) {
            {
              for (var N = Object.keys(h.props), B = 0; B < N.length; B++) {
                var X = N[B];
                if (X !== "children" && X !== "key") {
                  qe(h),
                    _(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      X,
                    ),
                    qe(null);
                  break;
                }
              }
              h.ref !== null &&
                (qe(h),
                _("Invalid attribute `ref` supplied to `React.Fragment`."),
                qe(null));
            }
          }
          function Zn(h, N, B, X, ie, ce) {
            {
              var re = A(h);
              if (!re) {
                var ne = "";
                (h === void 0 ||
                  (typeof h == "object" &&
                    h !== null &&
                    Object.keys(h).length === 0)) &&
                  (ne +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var ve = Bo(ie);
                ve ? (ne += ve) : (ne += Yn());
                var de;
                h === null
                  ? (de = "null")
                  : qt(h)
                    ? (de = "array")
                    : h !== void 0 && h.$$typeof === t
                      ? ((de = "<" + (G(h.type) || "Unknown") + " />"),
                        (ne =
                          " Did you accidentally export a JSX literal instead of a component?"))
                      : (de = typeof h),
                  _(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    de,
                    ne,
                  );
              }
              var pe = Lo(h, N, B, ie, ce);
              if (pe == null) return pe;
              if (re) {
                var Se = N.children;
                if (Se !== void 0)
                  if (X)
                    if (qt(Se)) {
                      for (var Ye = 0; Ye < Se.length; Ye++) Xn(Se[Ye], h);
                      Object.freeze && Object.freeze(Se);
                    } else
                      _(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else Xn(Se, h);
              }
              return h === n ? Uo(pe) : zo(pe), pe;
            }
          }
          function Vo(h, N, B) {
            return Zn(h, N, B, !0);
          }
          function Wo(h, N, B) {
            return Zn(h, N, B, !1);
          }
          var qo = Wo,
            Yo = Vo;
          (at.Fragment = n), (at.jsx = qo), (at.jsxs = Yo);
        })()),
    at
  );
}
process.env.NODE_ENV === "production"
  ? (cn.exports = ai())
  : (cn.exports = si());
var w = cn.exports;
const ui = () => {
  var t, o, n;
  const e =
    (n =
      (o = (t = window.location.hash) == null ? void 0 : t.split("#")[1]) ==
      null
        ? void 0
        : o.replace("!/", "")) == null
      ? void 0
      : n.split("/");
  return {
    name: e == null ? void 0 : e[1],
    resourceType: e == null ? void 0 : e[0],
  };
};
var Lr = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function (e, t) {
  (function (o, n) {
    e.exports = n();
  })(window, function () {
    return (function (o) {
      var n = {};
      function r(i) {
        if (n[i]) return n[i].exports;
        var a = (n[i] = { i, l: !1, exports: {} });
        return o[i].call(a.exports, a, a.exports, r), (a.l = !0), a.exports;
      }
      return (
        (r.m = o),
        (r.c = n),
        (r.d = function (i, a, u) {
          r.o(i, a) || Object.defineProperty(i, a, { enumerable: !0, get: u });
        }),
        (r.r = function (i) {
          typeof Symbol < "u" &&
            Symbol.toStringTag &&
            Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(i, "__esModule", { value: !0 });
        }),
        (r.t = function (i, a) {
          if (
            (1 & a && (i = r(i)),
            8 & a || (4 & a && typeof i == "object" && i && i.__esModule))
          )
            return i;
          var u = /* @__PURE__ */ Object.create(null);
          if (
            (r.r(u),
            Object.defineProperty(u, "default", { enumerable: !0, value: i }),
            2 & a && typeof i != "string")
          )
            for (var c in i)
              r.d(
                u,
                c,
                function (d) {
                  return i[d];
                }.bind(null, c),
              );
          return u;
        }),
        (r.n = function (i) {
          var a =
            i && i.__esModule
              ? function () {
                  return i.default;
                }
              : function () {
                  return i;
                };
          return r.d(a, "a", a), a;
        }),
        (r.o = function (i, a) {
          return Object.prototype.hasOwnProperty.call(i, a);
        }),
        (r.p = ""),
        r((r.s = 7))
      );
    })([
      function (o, n, r) {
        var i,
          a =
            (this && this.__extends) ||
            ((i = function (l, f) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (g, p) {
                    g.__proto__ = p;
                  }) ||
                function (g, p) {
                  for (var m in p)
                    Object.prototype.hasOwnProperty.call(p, m) && (g[m] = p[m]);
                })(l, f);
            }),
            function (l, f) {
              function g() {
                this.constructor = l;
              }
              i(l, f),
                (l.prototype =
                  f === null
                    ? Object.create(f)
                    : ((g.prototype = f.prototype), new g()));
            }),
          u =
            (this && this.__importDefault) ||
            function (l) {
              return l && l.__esModule ? l : { default: l };
            };
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.eventEmitter =
            n.INTERNAL_ERROR_EVENT =
            n.UNKNOWN_IDX =
            n.ROOT_IDX =
            n.getStylesheet =
            n.getDefaultOptions =
            n.CAMEL_DATASET_SPLIT_TYPE =
            n.CAMEL_DATASET_IDENTIFIER_EXTRA =
            n.CAMEL_DATASET_IDENTIFIER =
            n.DATASET_SPLIT_TYPE =
            n.DATASET_IDENTIFIER_EXTRA =
            n.DATASET_IDENTIFIER =
            n.STYLESHEET_ID =
            n.LOCAL_STORE_KEY =
            n.ID_DIVISION =
              void 0);
        var c = u(r(10)),
          d = u(r(2));
        (n.ID_DIVISION = ";"),
          (n.LOCAL_STORE_KEY = "highlight-mengshou"),
          (n.STYLESHEET_ID = "highlight-mengshou-style"),
          (n.DATASET_IDENTIFIER = "highlight-id"),
          (n.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra"),
          (n.DATASET_SPLIT_TYPE = "highlight-split-type"),
          (n.CAMEL_DATASET_IDENTIFIER = c.default(n.DATASET_IDENTIFIER)),
          (n.CAMEL_DATASET_IDENTIFIER_EXTRA = c.default(
            n.DATASET_IDENTIFIER_EXTRA,
          )),
          (n.CAMEL_DATASET_SPLIT_TYPE = c.default(n.DATASET_SPLIT_TYPE)),
          (n.getDefaultOptions = function () {
            return {
              $root: document || document.documentElement,
              exceptSelectors: null,
              wrapTag: "span",
              verbose: !1,
              style: { className: "highlight-mengshou-wrap" },
            };
          }),
          (n.getStylesheet = function () {
            return (
              `
    .` +
              n.getDefaultOptions().style.className +
              ` {
        background: #ff9;
        cursor: pointer;
    }
    .` +
              n.getDefaultOptions().style.className +
              `.active {
        background: #ffb;
    }
`
            );
          }),
          (n.ROOT_IDX = -2),
          (n.UNKNOWN_IDX = -1),
          (n.INTERNAL_ERROR_EVENT = "error");
        var s = (function (l) {
          function f() {
            return (l !== null && l.apply(this, arguments)) || this;
          }
          return a(f, l), f;
        })(d.default);
        n.eventEmitter = new s();
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.UserInputEvent =
            n.SelectedNodeType =
            n.CreateFrom =
            n.EventType =
            n.ERROR =
            n.SplitType =
              void 0),
          (function (i) {
            (i.none = "none"),
              (i.head = "head"),
              (i.tail = "tail"),
              (i.both = "both");
          })(n.SplitType || (n.SplitType = {})),
          (function (i) {
            (i.DOM_TYPE_ERROR = "[DOM] Receive wrong node type."),
              (i.DOM_SELECTION_EMPTY =
                "[DOM] The selection contains no dom node, may be you except them."),
              (i.RANGE_INVALID =
                "[RANGE] Got invalid dom range, can't convert to a valid highlight range."),
              (i.RANGE_NODE_INVALID =
                "[RANGE] Start or end node isn't a text node, it may occur an error."),
              (i.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict."),
              (i.CACHE_SET_ERROR =
                "[CACHE] Cache.data can't be set manually, please use .save()."),
              (i.SOURCE_TYPE_ERROR =
                "[SOURCE] Object isn't a highlight source instance."),
              (i.HIGHLIGHT_RANGE_FROZEN =
                "[HIGHLIGHT_RANGE] A highlight range must be frozen before render."),
              (i.HIGHLIGHT_SOURCE_RECREATE =
                "[HIGHLIGHT_SOURCE] Recreate highlights from sources error."),
              (i.HIGHLIGHT_SOURCE_NONE_RENDER =
                "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.");
          })(n.ERROR || (n.ERROR = {})),
          (function (i) {
            (i.CREATE = "selection:create"),
              (i.REMOVE = "selection:remove"),
              (i.MODIFY = "selection:modify"),
              (i.HOVER = "selection:hover"),
              (i.HOVER_OUT = "selection:hover-out"),
              (i.CLICK = "selection:click");
          })(n.EventType || (n.EventType = {})),
          (function (i) {
            (i.STORE = "from-store"), (i.INPUT = "from-input");
          })(n.CreateFrom || (n.CreateFrom = {})),
          (function (i) {
            (i.text = "text"), (i.span = "span");
          })(n.SelectedNodeType || (n.SelectedNodeType = {})),
          (function (i) {
            (i.touchend = "touchend"),
              (i.mouseup = "mouseup"),
              (i.touchstart = "touchstart"),
              (i.click = "click"),
              (i.mouseover = "mouseover");
          })(n.UserInputEvent || (n.UserInputEvent = {}));
      },
      function (o, n, r) {
        var i =
            (this && this.__read) ||
            function (c, d) {
              var s = typeof Symbol == "function" && c[Symbol.iterator];
              if (!s) return c;
              var l,
                f,
                g = s.call(c),
                p = [];
              try {
                for (; (d === void 0 || d-- > 0) && !(l = g.next()).done; )
                  p.push(l.value);
              } catch (m) {
                f = { error: m };
              } finally {
                try {
                  l && !l.done && (s = g.return) && s.call(g);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var c = [], d = 0; d < arguments.length; d++)
                c = c.concat(i(arguments[d]));
              return c;
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var u = (function () {
          function c() {
            this.handlersMap = /* @__PURE__ */ Object.create(null);
          }
          return (
            (c.prototype.on = function (d, s) {
              return (
                this.handlersMap[d] || (this.handlersMap[d] = []),
                this.handlersMap[d].push(s),
                this
              );
            }),
            (c.prototype.off = function (d, s) {
              return (
                this.handlersMap[d] &&
                  this.handlersMap[d].splice(
                    this.handlersMap[d].indexOf(s) >>> 0,
                    1,
                  ),
                this
              );
            }),
            (c.prototype.emit = function (d) {
              for (var s = [], l = 1; l < arguments.length; l++)
                s[l - 1] = arguments[l];
              return (
                this.handlersMap[d] &&
                  this.handlersMap[d].slice().forEach(function (f) {
                    f.apply(void 0, a(s));
                  }),
                this
              );
            }),
            c
          );
        })();
        n.default = u;
      },
      function (o, n, r) {
        var i =
          (this && this.__importDefault) ||
          function (d) {
            return d && d.__esModule ? d : { default: d };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = i(r(5)),
          u = r(9),
          c = (function () {
            function d(s, l, f, g, p) {
              (this.startMeta = s),
                (this.endMeta = l),
                (this.text = f),
                (this.id = g),
                (this.__isHighlightSource = {}),
                p && (this.extra = p);
            }
            return (
              (d.prototype.deSerialize = function (s, l) {
                var f = u.queryElementNode(this, s),
                  g = f.start,
                  p = f.end,
                  m = u.getTextChildByOffset(g, this.startMeta.textOffset),
                  v = u.getTextChildByOffset(p, this.endMeta.textOffset);
                if (!l.Serialize.Restore.isEmpty()) {
                  var b = l.Serialize.Restore.call(this, m, v) || [];
                  (m = b[0] || m), (v = b[1] || v);
                }
                return new a.default(m, v, this.text, this.id, !0);
              }),
              d
            );
          })();
        n.default = c;
      },
      function (o, n, r) {
        var i =
            (this && this.__values) ||
            function (s) {
              var l = typeof Symbol == "function" && Symbol.iterator,
                f = l && s[l],
                g = 0;
              if (f) return f.call(s);
              if (s && typeof s.length == "number")
                return {
                  next: function () {
                    return (
                      s && g >= s.length && (s = void 0),
                      { value: s && s[g++], done: !s }
                    );
                  },
                };
              throw new TypeError(
                l
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          a =
            (this && this.__read) ||
            function (s, l) {
              var f = typeof Symbol == "function" && s[Symbol.iterator];
              if (!f) return s;
              var g,
                p,
                m = f.call(s),
                v = [];
              try {
                for (; (l === void 0 || l-- > 0) && !(g = m.next()).done; )
                  v.push(g.value);
              } catch (b) {
                p = { error: b };
              } finally {
                try {
                  g && !g.done && (f = m.return) && f.call(m);
                } finally {
                  if (p) throw p.error;
                }
              }
              return v;
            },
          u =
            (this && this.__spread) ||
            function () {
              for (var s = [], l = 0; l < arguments.length; l++)
                s = s.concat(a(arguments[l]));
              return s;
            };
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.hasClass =
            n.removeAllClass =
            n.removeClass =
            n.addClass =
            n.addEventListener =
            n.removeEventListener =
            n.forEach =
            n.getHighlightById =
            n.getHighlightsByRoot =
            n.getExtraHighlightId =
            n.getHighlightId =
            n.isHighlightWrapNode =
              void 0);
        var c = r(0);
        n.isHighlightWrapNode = function (s) {
          return !!s.dataset && !!s.dataset[c.CAMEL_DATASET_IDENTIFIER];
        };
        var d = function (s, l) {
          for (var f = !1, g = null; s; ) {
            if ((n.isHighlightWrapNode(s) && (g = s), s === l)) {
              f = !0;
              break;
            }
            s = s.parentNode;
          }
          return f ? g : null;
        };
        (n.getHighlightId = function (s, l) {
          return (s = d(s, l)) ? s.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
        }),
          (n.getExtraHighlightId = function (s, l) {
            return (s = d(s, l))
              ? s.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA]
                  .split(c.ID_DIVISION)
                  .filter(function (f) {
                    return f;
                  })
              : [];
          }),
          (n.getHighlightsByRoot = function (s, l) {
            var f, g;
            Array.isArray(s) || (s = [s]);
            var p = [];
            try {
              for (var m = i(s), v = m.next(); !v.done; v = m.next()) {
                var b = v.value.querySelectorAll(
                  l + "[data-" + c.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, b);
              }
            } catch (_) {
              f = { error: _ };
            } finally {
              try {
                v && !v.done && (g = m.return) && g.call(m);
              } finally {
                if (f) throw f.error;
              }
            }
            return p;
          }),
          (n.getHighlightById = function (s, l, f) {
            var g,
              p,
              m = [],
              v = new RegExp(
                "(" +
                  l +
                  "\\" +
                  c.ID_DIVISION +
                  "|\\" +
                  c.ID_DIVISION +
                  "?" +
                  l +
                  "$)",
              ),
              b = s.querySelectorAll(f + "[data-" + c.DATASET_IDENTIFIER + "]");
            try {
              for (var _ = i(b), S = _.next(); !S.done; S = _.next()) {
                var O = S.value;
                if (O.dataset[c.CAMEL_DATASET_IDENTIFIER] !== l) {
                  var E = O.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  v.test(E) && m.push(O);
                } else m.push(O);
              }
            } catch (F) {
              g = { error: F };
            } finally {
              try {
                S && !S.done && (p = _.return) && p.call(_);
              } finally {
                if (g) throw g.error;
              }
            }
            return m;
          }),
          (n.forEach = function (s, l) {
            for (var f = 0; f < s.length; f++) l(s[f], f, s);
          }),
          (n.removeEventListener = function (s, l, f) {
            s.removeEventListener(l, f);
          }),
          (n.addEventListener = function (s, l, f) {
            return (
              s.addEventListener(l, f),
              function () {
                n.removeEventListener(s, l, f);
              }
            );
          }),
          (n.addClass = function (s, l) {
            var f;
            Array.isArray(l) || (l = [l]), (f = s.classList).add.apply(f, u(l));
          }),
          (n.removeClass = function (s, l) {
            s.classList.remove(l);
          }),
          (n.removeAllClass = function (s) {
            s.className = "";
          }),
          (n.hasClass = function (s, l) {
            return s.classList.contains(l);
          });
      },
      function (o, n, r) {
        var i =
          (this && this.__importDefault) ||
          function (g) {
            return g && g.__esModule ? g : { default: g };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = i(r(3)),
          u = r(1),
          c = r(11),
          d = i(r(6)),
          s = r(12),
          l = r(0),
          f = (function () {
            function g(p, m, v, b, _) {
              _ === void 0 && (_ = !1),
                (p.$node.nodeType === 3 && m.$node.nodeType === 3) ||
                  l.eventEmitter.emit(l.INTERNAL_ERROR_EVENT, {
                    type: u.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = s.formatDomNode(p)),
                (this.end = s.formatDomNode(m)),
                (this.text = v),
                (this.frozen = _),
                (this.id = b);
            }
            return (
              (g.fromSelection = function (p) {
                var m = c.getDomRange();
                if (!m) return null;
                var v = { $node: m.startContainer, offset: m.startOffset },
                  b = { $node: m.endContainer, offset: m.endOffset },
                  _ = m.toString(),
                  S = p.call(v, b, _);
                return new g(v, b, _, (S = S ?? d.default()));
              }),
              (g.prototype.serialize = function (p, m) {
                var v,
                  b = s.getDomMeta(this.start.$node, this.start.offset, p),
                  _ = s.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  m.Serialize.RecordInfo.isEmpty() ||
                    (v = m.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new a.default(b, _, this.text, this.id, v)
                );
              }),
              (g.removeDomRange = c.removeSelection),
              g
            );
          })();
        n.default = f;
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function i(a) {
            return a
              ? (a ^ ((16 * Math.random()) >> (a / 4))).toString(16)
              : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, i);
          });
      },
      function (o, n, r) {
        o.exports = r(8);
      },
      function (o, n, r) {
        var i,
          a =
            (this && this.__extends) ||
            ((i = function (E, F) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (j, y) {
                    j.__proto__ = y;
                  }) ||
                function (j, y) {
                  for (var H in y)
                    Object.prototype.hasOwnProperty.call(y, H) && (j[H] = y[H]);
                })(E, F);
            }),
            function (E, F) {
              function j() {
                this.constructor = E;
              }
              i(E, F),
                (E.prototype =
                  F === null
                    ? Object.create(F)
                    : ((j.prototype = F.prototype), new j()));
            }),
          u =
            (this && this.__assign) ||
            function () {
              return (u =
                Object.assign ||
                function (E) {
                  for (var F, j = 1, y = arguments.length; j < y; j++)
                    for (var H in (F = arguments[j]))
                      Object.prototype.hasOwnProperty.call(F, H) &&
                        (E[H] = F[H]);
                  return E;
                }).apply(this, arguments);
            },
          c =
            (this && this.__importDefault) ||
            function (E) {
              return E && E.__esModule ? E : { default: E };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var d = c(r(2)),
          s = c(r(5)),
          l = c(r(3)),
          f = c(r(6)),
          g = c(r(13)),
          p = c(r(14)),
          m = c(r(16)),
          v = c(r(17)),
          b = r(0),
          _ = r(1),
          S = r(4),
          O = (function (E) {
            function F(j) {
              var y = E.call(this) || this;
              (y.event = p.default()),
                (y.run = function () {
                  return S.addEventListener(
                    y.options.$root,
                    y.event.PointerEnd,
                    y._handleSelection,
                  );
                }),
                (y.stop = function () {
                  S.removeEventListener(
                    y.options.$root,
                    y.event.PointerEnd,
                    y._handleSelection,
                  );
                }),
                (y.addClass = function (A, k) {
                  y.getDoms(k).forEach(function (Z) {
                    S.addClass(Z, A);
                  });
                }),
                (y.removeClass = function (A, k) {
                  y.getDoms(k).forEach(function (Z) {
                    S.removeClass(Z, A);
                  });
                }),
                (y.getIdByDom = function (A) {
                  return S.getHighlightId(A, y.options.$root);
                }),
                (y.getExtraIdByDom = function (A) {
                  return S.getExtraHighlightId(A, y.options.$root);
                }),
                (y.getDoms = function (A) {
                  return A
                    ? S.getHighlightById(y.options.$root, A, y.options.wrapTag)
                    : S.getHighlightsByRoot(y.options.$root, y.options.wrapTag);
                }),
                (y.dispose = function () {
                  var A = y.options.$root;
                  S.removeEventListener(
                    A,
                    y.event.PointerOver,
                    y._handleHighlightHover,
                  ),
                    S.removeEventListener(
                      A,
                      y.event.PointerEnd,
                      y._handleSelection,
                    ),
                    S.removeEventListener(
                      A,
                      y.event.PointerTap,
                      y._handleHighlightClick,
                    ),
                    y.removeAll();
                }),
                (y.setOption = function (A) {
                  (y.options = u(u({}, y.options), A)),
                    (y.painter = new v.default(
                      {
                        $root: y.options.$root,
                        wrapTag: y.options.wrapTag,
                        className: y.options.style.className,
                        exceptSelectors: y.options.exceptSelectors,
                      },
                      y.hooks,
                    ));
                }),
                (y.fromRange = function (A) {
                  var k = { $node: A.startContainer, offset: A.startOffset },
                    Z = { $node: A.endContainer, offset: A.endOffset },
                    G = A.toString(),
                    P = y.hooks.Render.UUID.call(k, Z, G);
                  P = P ?? f.default();
                  var I = new s.default(k, Z, G, P);
                  return I
                    ? y._highlightFromHRange(I)
                    : (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (y.fromStore = function (A, k, Z, G, P) {
                  var I = new l.default(A, k, Z, G, P);
                  try {
                    return y._highlightFromHSource(I), I;
                  } catch (T) {
                    return (
                      b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.HIGHLIGHT_SOURCE_RECREATE,
                        error: T,
                        detail: I,
                      }),
                      null
                    );
                  }
                }),
                (y._getHooks = function () {
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
                (y._highlightFromHRange = function (A) {
                  var k = A.serialize(y.options.$root, y.hooks);
                  return y.painter.highlightRange(A).length === 0
                    ? (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (y.cache.save(k),
                      y.emit(
                        _.EventType.CREATE,
                        { sources: [k], type: _.CreateFrom.INPUT },
                        y,
                      ),
                      k);
                }),
                (y._handleSelection = function () {
                  var A = s.default.fromSelection(y.hooks.Render.UUID);
                  A && (y._highlightFromHRange(A), s.default.removeDomRange());
                }),
                (y._handleHighlightHover = function (A) {
                  var k = A.target;
                  if (!S.isHighlightWrapNode(k))
                    return (
                      y._hoverId &&
                        y.emit(_.EventType.HOVER_OUT, { id: y._hoverId }, y, A),
                      void (y._hoverId = null)
                    );
                  var Z = S.getHighlightId(k, y.options.$root);
                  y._hoverId !== Z &&
                    (y._hoverId &&
                      y.emit(_.EventType.HOVER_OUT, { id: y._hoverId }, y, A),
                    (y._hoverId = Z),
                    y.emit(_.EventType.HOVER, { id: y._hoverId }, y, A));
                }),
                (y._handleError = function (A) {
                  y.options.verbose && console.warn(A);
                }),
                (y._handleHighlightClick = function (A) {
                  var k = A.target;
                  if (S.isHighlightWrapNode(k)) {
                    var Z = S.getHighlightId(k, y.options.$root);
                    y.emit(_.EventType.CLICK, { id: Z }, y, A);
                  }
                }),
                (y.options = b.getDefaultOptions()),
                (y.hooks = y._getHooks()),
                y.setOption(j),
                (y.cache = new m.default());
              var H = y.options.$root;
              return (
                S.addEventListener(
                  H,
                  y.event.PointerOver,
                  y._handleHighlightHover,
                ),
                S.addEventListener(
                  H,
                  y.event.PointerTap,
                  y._handleHighlightClick,
                ),
                b.eventEmitter.on(b.INTERNAL_ERROR_EVENT, y._handleError),
                y
              );
            }
            return (
              a(F, E),
              (F.prototype.remove = function (j) {
                if (j) {
                  var y = this.painter.removeHighlight(j);
                  this.cache.remove(j),
                    y && this.emit(_.EventType.REMOVE, { ids: [j] }, this);
                }
              }),
              (F.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var j = this.cache.removeAll();
                this.emit(_.EventType.REMOVE, { ids: j }, this);
              }),
              (F.prototype._highlightFromHSource = function (j) {
                j === void 0 && (j = []);
                var y = this.painter.highlightSource(j);
                this.emit(
                  _.EventType.CREATE,
                  { sources: y, type: _.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(j);
              }),
              (F.event = _.EventType),
              (F.isHighlightWrapNode = S.isHighlightWrapNode),
              (F.isHighlightSource = function (j) {
                return !!j.__isHighlightSource;
              }),
              F
            );
          })(d.default);
        n.default = O;
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.queryElementNode = n.getTextChildByOffset = void 0);
        var i = r(0);
        (n.getTextChildByOffset = function (a, u) {
          for (var c = [a], d = null, s = 0, l = 0; (d = c.pop()); ) {
            for (var f = d.childNodes, g = f.length - 1; g >= 0; g--)
              c.push(f[g]);
            if (
              d.nodeType === 3 &&
              ((l = u - s), (s += d.textContent.length) >= u)
            )
              break;
          }
          return d || (d = a), { $node: d, offset: l };
        }),
          (n.queryElementNode = function (a, u) {
            return {
              start:
                a.startMeta.parentIndex === i.ROOT_IDX
                  ? u
                  : u.getElementsByTagName(a.startMeta.parentTagName)[
                      a.startMeta.parentIndex
                    ],
              end:
                a.endMeta.parentIndex === i.ROOT_IDX
                  ? u
                  : u.getElementsByTagName(a.endMeta.parentTagName)[
                      a.endMeta.parentIndex
                    ],
            };
          });
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (i) {
            return i.split("-").reduce(function (a, u, c) {
              return a + (c === 0 ? u : u[0].toUpperCase() + u.slice(1));
            }, "");
          });
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.removeSelection = n.getDomRange = void 0),
          (n.getDomRange = function () {
            var i = window.getSelection();
            return i.isCollapsed
              ? (console.debug("no text selected"), null)
              : i.getRangeAt(0);
          }),
          (n.removeSelection = function () {
            window.getSelection().removeAllRanges();
          });
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.formatDomNode = n.getDomMeta = void 0);
        var i = r(0);
        (n.getDomMeta = function (a, u, c) {
          var d = (function (f) {
              if (
                f instanceof HTMLElement &&
                (!f.dataset || !f.dataset[i.CAMEL_DATASET_IDENTIFIER])
              )
                return f;
              for (
                var g = f.parentNode;
                g != null && g.dataset[i.CAMEL_DATASET_IDENTIFIER];

              )
                g = g.parentNode;
              return g;
            })(a),
            s =
              d === c
                ? i.ROOT_IDX
                : (function (f, g) {
                    for (
                      var p = f.tagName, m = g.getElementsByTagName(p), v = 0;
                      v < m.length;
                      v++
                    )
                      if (f === m[v]) return v;
                    return i.UNKNOWN_IDX;
                  })(d, c),
            l = (function (f, g) {
              for (var p = [f], m = null, v = 0; (m = p.pop()); ) {
                for (var b = m.childNodes, _ = b.length - 1; _ >= 0; _--)
                  p.push(b[_]);
                if (m.nodeType === 3 && m !== g) v += m.textContent.length;
                else if (m.nodeType === 3) break;
              }
              return v;
            })(d, a);
          return {
            parentTagName: d.tagName,
            parentIndex: s,
            textOffset: l + u,
          };
        }),
          (n.formatDomNode = function (a) {
            return a.$node.nodeType === 3 ||
              a.$node.nodeType === 4 ||
              a.$node.nodeType === 8
              ? a
              : { $node: a.$node.childNodes[a.offset], offset: 0 };
          });
      },
      function (o, n, r) {
        var i =
            (this && this.__read) ||
            function (c, d) {
              var s = typeof Symbol == "function" && c[Symbol.iterator];
              if (!s) return c;
              var l,
                f,
                g = s.call(c),
                p = [];
              try {
                for (; (d === void 0 || d-- > 0) && !(l = g.next()).done; )
                  p.push(l.value);
              } catch (m) {
                f = { error: m };
              } finally {
                try {
                  l && !l.done && (s = g.return) && s.call(g);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var c = [], d = 0; d < arguments.length; d++)
                c = c.concat(i(arguments[d]));
              return c;
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var u = (function () {
          function c(d) {
            (this.name = ""), (this.ops = []), (this.name = d);
          }
          return (
            (c.prototype.tap = function (d) {
              var s = this;
              return (
                this.ops.indexOf(d) === -1 && this.ops.push(d),
                function () {
                  s.remove(d);
                }
              );
            }),
            (c.prototype.remove = function (d) {
              var s = this.ops.indexOf(d);
              s < 0 || this.ops.splice(s, 1);
            }),
            (c.prototype.isEmpty = function () {
              return this.ops.length === 0;
            }),
            (c.prototype.call = function () {
              for (var d, s = [], l = 0; l < arguments.length; l++)
                s[l] = arguments[l];
              return (
                this.ops.forEach(function (f) {
                  d = f.apply(void 0, a(s));
                }),
                d
              );
            }),
            c
          );
        })();
        n.default = u;
      },
      function (o, n, r) {
        var i =
          (this && this.__importDefault) ||
          function (c) {
            return c && c.__esModule ? c : { default: c };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = r(1),
          u = i(r(15));
        n.default = function () {
          var c = u.default(window.navigator.userAgent);
          return {
            PointerEnd: c
              ? a.UserInputEvent.touchend
              : a.UserInputEvent.mouseup,
            PointerTap: c
              ? a.UserInputEvent.touchstart
              : a.UserInputEvent.click,
            PointerOver: c
              ? a.UserInputEvent.touchstart
              : a.UserInputEvent.mouseover,
          };
        };
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i =
          /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
        n.default = function (a) {
          return i.test(a);
        };
      },
      function (o, n, r) {
        var i,
          a =
            (this && this.__extends) ||
            ((i = function (f, g) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (p, m) {
                    p.__proto__ = m;
                  }) ||
                function (p, m) {
                  for (var v in m)
                    Object.prototype.hasOwnProperty.call(m, v) && (p[v] = m[v]);
                })(f, g);
            }),
            function (f, g) {
              function p() {
                this.constructor = f;
              }
              i(f, g),
                (f.prototype =
                  g === null
                    ? Object.create(g)
                    : ((p.prototype = g.prototype), new p()));
            }),
          u =
            (this && this.__values) ||
            function (f) {
              var g = typeof Symbol == "function" && Symbol.iterator,
                p = g && f[g],
                m = 0;
              if (p) return p.call(f);
              if (f && typeof f.length == "number")
                return {
                  next: function () {
                    return (
                      f && m >= f.length && (f = void 0),
                      { value: f && f[m++], done: !f }
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
        Object.defineProperty(n, "__esModule", { value: !0 });
        var d = c(r(2)),
          s = r(1),
          l = (function (f) {
            function g() {
              var p = (f !== null && f.apply(this, arguments)) || this;
              return (p._data = /* @__PURE__ */ new Map()), p;
            }
            return (
              a(g, f),
              Object.defineProperty(g.prototype, "data", {
                get: function () {
                  return this.getAll();
                },
                set: function (p) {
                  throw s.ERROR.CACHE_SET_ERROR;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (g.prototype.save = function (p) {
                var m = this;
                Array.isArray(p)
                  ? p.forEach(function (v) {
                      return m._data.set(v.id, v);
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
                  m,
                  v = [];
                try {
                  for (
                    var b = u(this._data), _ = b.next();
                    !_.done;
                    _ = b.next()
                  ) {
                    var S = _.value;
                    v.push(S[1]);
                  }
                } catch (O) {
                  p = { error: O };
                } finally {
                  try {
                    _ && !_.done && (m = b.return) && m.call(b);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return v;
              }),
              (g.prototype.removeAll = function () {
                var p,
                  m,
                  v = [];
                try {
                  for (
                    var b = u(this._data), _ = b.next();
                    !_.done;
                    _ = b.next()
                  ) {
                    var S = _.value;
                    v.push(S[0]);
                  }
                } catch (O) {
                  p = { error: O };
                } finally {
                  try {
                    _ && !_.done && (m = b.return) && m.call(b);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return (this._data = /* @__PURE__ */ new Map()), v;
              }),
              g
            );
          })(d.default);
        n.default = l;
      },
      function (o, n, r) {
        var i =
            (this && this.__values) ||
            function (v) {
              var b = typeof Symbol == "function" && Symbol.iterator,
                _ = b && v[b],
                S = 0;
              if (_) return _.call(v);
              if (v && typeof v.length == "number")
                return {
                  next: function () {
                    return (
                      v && S >= v.length && (v = void 0),
                      { value: v && v[S++], done: !v }
                    );
                  },
                };
              throw new TypeError(
                b
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          a =
            (this && this.__read) ||
            function (v, b) {
              var _ = typeof Symbol == "function" && v[Symbol.iterator];
              if (!_) return v;
              var S,
                O,
                E = _.call(v),
                F = [];
              try {
                for (; (b === void 0 || b-- > 0) && !(S = E.next()).done; )
                  F.push(S.value);
              } catch (j) {
                O = { error: j };
              } finally {
                try {
                  S && !S.done && (_ = E.return) && _.call(E);
                } finally {
                  if (O) throw O.error;
                }
              }
              return F;
            },
          u =
            (this && this.__spread) ||
            function () {
              for (var v = [], b = 0; b < arguments.length; b++)
                v = v.concat(a(arguments[b]));
              return v;
            },
          c =
            (this && this.__importDefault) ||
            function (v) {
              return v && v.__esModule ? v : { default: v };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var d = c(r(3)),
          s = r(18),
          l = r(4),
          f = r(1),
          g = r(20),
          p = r(0),
          m = (function () {
            function v(b, _) {
              (this.options = {
                $root: b.$root,
                wrapTag: b.wrapTag,
                exceptSelectors: b.exceptSelectors,
                className: b.className,
              }),
                (this.hooks = _),
                g.initDefaultStylesheet();
            }
            return (
              (v.prototype.highlightRange = function (b) {
                var _ = this;
                if (!b.frozen) throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var S = this.options,
                  O = S.$root,
                  E = S.className,
                  F = S.exceptSelectors,
                  j = this.hooks,
                  y = s.getSelectedNodes(O, b.start, b.end, F);
                return (
                  j.Render.SelectedNodes.isEmpty() ||
                    (y = j.Render.SelectedNodes.call(b.id, y) || []),
                  y.map(function (H) {
                    var A = s.wrapHighlight(H, b, E, _.options.wrapTag);
                    return (
                      j.Render.WrapNode.isEmpty() ||
                        (A = j.Render.WrapNode.call(b.id, A)),
                      A
                    );
                  })
                );
              }),
              (v.prototype.highlightSource = function (b) {
                var _ = this,
                  S = Array.isArray(b) ? b : [b],
                  O = [];
                return (
                  S.forEach(function (E) {
                    if (E instanceof d.default) {
                      var F = E.deSerialize(_.options.$root, _.hooks);
                      _.highlightRange(F).length > 0
                        ? O.push(E)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: E,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: f.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  O
                );
              }),
              (v.prototype.removeHighlight = function (b) {
                var _,
                  S,
                  O = new RegExp(
                    "(" +
                      b +
                      "\\" +
                      p.ID_DIVISION +
                      "|\\" +
                      p.ID_DIVISION +
                      "?" +
                      b +
                      "$)",
                  ),
                  E = this.hooks,
                  F = this.options.wrapTag,
                  j = document.querySelectorAll(
                    F + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  y = [],
                  H = [],
                  A = [];
                try {
                  for (var k = i(j), Z = k.next(); !Z.done; Z = k.next()) {
                    var G = Z.value,
                      P = G.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      I = G.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    P !== b || I
                      ? P === b
                        ? H.push(G)
                        : P !== b && O.test(I) && A.push(G)
                      : y.push(G);
                  }
                } catch (T) {
                  _ = { error: T };
                } finally {
                  try {
                    Z && !Z.done && (S = k.return) && S.call(k);
                  } finally {
                    if (_) throw _.error;
                  }
                }
                return (
                  y.forEach(function (T) {
                    var x = T.parentNode,
                      R = document.createDocumentFragment();
                    l.forEach(T.childNodes, function (D) {
                      return R.appendChild(D.cloneNode(!1));
                    });
                    var L = T.previousSibling,
                      C = T.nextSibling;
                    x.replaceChild(R, T),
                      s.normalizeSiblingText(L, !0),
                      s.normalizeSiblingText(C, !1),
                      E.Remove.UpdateNodes.call(b, T, "remove");
                  }),
                  H.forEach(function (T) {
                    var x = T.dataset,
                      R = x[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      L = R.shift(),
                      C = document.querySelector(
                        F + "[data-" + p.DATASET_IDENTIFIER + '="' + L + '"]',
                      );
                    C && (l.removeAllClass(T), l.addClass(T, u(C.classList))),
                      (x[p.CAMEL_DATASET_IDENTIFIER] = L),
                      (x[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = R.join(
                        p.ID_DIVISION,
                      )),
                      E.Remove.UpdateNodes.call(b, T, "id-update");
                  }),
                  A.forEach(function (T) {
                    var x = T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = x.replace(
                      O,
                      "",
                    )),
                      E.Remove.UpdateNodes.call(b, T, "extra-update");
                  }),
                  y.length + H.length + A.length !== 0
                );
              }),
              (v.prototype.removeAllHighlight = function () {
                var b = this.options,
                  _ = b.wrapTag,
                  S = b.$root;
                l.getHighlightsByRoot(S, _).forEach(function (O) {
                  var E = O.parentNode,
                    F = document.createDocumentFragment();
                  l.forEach(O.childNodes, function (j) {
                    return F.appendChild(j.cloneNode(!1));
                  }),
                    E.replaceChild(F, O);
                });
              }),
              v
            );
          })();
        n.default = m;
      },
      function (o, n, r) {
        var i =
            (this && this.__read) ||
            function (p, m) {
              var v = typeof Symbol == "function" && p[Symbol.iterator];
              if (!v) return p;
              var b,
                _,
                S = v.call(p),
                O = [];
              try {
                for (; (m === void 0 || m-- > 0) && !(b = S.next()).done; )
                  O.push(b.value);
              } catch (E) {
                _ = { error: E };
              } finally {
                try {
                  b && !b.done && (v = S.return) && v.call(S);
                } finally {
                  if (_) throw _.error;
                }
              }
              return O;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var p = [], m = 0; m < arguments.length; m++)
                p = p.concat(i(arguments[m]));
              return p;
            };
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.normalizeSiblingText =
            n.wrapHighlight =
            n.getSelectedNodes =
              void 0);
        var u = r(1),
          c = r(4),
          d = r(0),
          s = r(19),
          l = function (p, m) {
            if (!p) return !1;
            if (/^\./.test(m)) {
              var v = m.replace(/^\./, "");
              return p && c.hasClass(p, v);
            }
            if (/^#/.test(m)) {
              var b = m.replace(/^#/, "");
              return p && p.id === b;
            }
            var _ = m.toUpperCase();
            return p && p.tagName === _;
          };
        n.getSelectedNodes = function (p, m, v, b) {
          var _ = m.$node,
            S = v.$node,
            O = m.offset,
            E = v.offset;
          if (_ === S && _ instanceof Text)
            return (function (P, I, T, x) {
              for (
                var R = P,
                  L = function (D) {
                    return x == null
                      ? void 0
                      : x.some(function (z) {
                          return l(D, z);
                        });
                  };
                R;

              ) {
                if (R.nodeType === 1 && L(R)) return [];
                R = R.parentNode;
              }
              P.splitText(I);
              var C = P.nextSibling;
              return (
                C.splitText(T - I),
                [
                  {
                    $node: C,
                    type: u.SelectedNodeType.text,
                    splitType: u.SplitType.both,
                  },
                ]
              );
            })(_, O, E, b);
          for (
            var F = [p],
              j = [],
              y = function (P) {
                return b == null
                  ? void 0
                  : b.some(function (I) {
                      return l(P, I);
                    });
              },
              H = !1,
              A = null;
            (A = F.pop());

          )
            if (A.nodeType !== 1 || !y(A)) {
              for (var k = A.childNodes, Z = k.length - 1; Z >= 0; Z--)
                F.push(k[Z]);
              if (A === _) {
                if (A.nodeType === 3) {
                  A.splitText(O);
                  var G = A.nextSibling;
                  j.push({
                    $node: G,
                    type: u.SelectedNodeType.text,
                    splitType: u.SplitType.head,
                  });
                }
                H = !0;
              } else {
                if (A === S) {
                  A.nodeType === 3 &&
                    ((G = A).splitText(E),
                    j.push({
                      $node: G,
                      type: u.SelectedNodeType.text,
                      splitType: u.SplitType.tail,
                    }));
                  break;
                }
                H &&
                  A.nodeType === 3 &&
                  j.push({
                    $node: A,
                    type: u.SelectedNodeType.text,
                    splitType: u.SplitType.none,
                  });
              }
            }
          return j;
        };
        var f = function (p, m) {
            var v = Array.isArray(m) ? m : [m];
            return (
              (v =
                v.length === 0
                  ? [d.getDefaultOptions().style.className]
                  : v).forEach(function (b) {
                c.addClass(p, b);
              }),
              p
            );
          },
          g = function (p) {
            return !p || !p.textContent;
          };
        (n.wrapHighlight = function (p, m, v, b) {
          var _ = p.$node.parentNode,
            S = p.$node.previousSibling,
            O = p.$node.nextSibling;
          return c.isHighlightWrapNode(_)
            ? !c.isHighlightWrapNode(_) || (g(S) && g(O))
              ? (function (E, F, j) {
                  var y = E.$node.parentNode,
                    H = y;
                  c.removeAllClass(H), f(H, j);
                  var A = y.dataset,
                    k = A[d.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (A[d.CAMEL_DATASET_IDENTIFIER] = F.id),
                    (A[d.CAMEL_DATASET_IDENTIFIER_EXTRA] = A[
                      d.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? k + d.ID_DIVISION + A[d.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : k),
                    H
                  );
                })(p, m, v)
              : (function (E, F, j, y) {
                  var H = document.createElement(y),
                    A = E.$node.parentNode,
                    k = E.$node.previousSibling,
                    Z = E.$node.nextSibling,
                    G = document.createDocumentFragment(),
                    P = A.dataset[d.CAMEL_DATASET_IDENTIFIER],
                    I = A.dataset[d.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    T = I ? P + d.ID_DIVISION + I : P;
                  H.setAttribute("data-" + d.DATASET_IDENTIFIER, F.id),
                    H.setAttribute("data-" + d.DATASET_IDENTIFIER_EXTRA, T),
                    H.appendChild(E.$node.cloneNode(!1));
                  var x,
                    R = !1,
                    L = !1;
                  k &&
                    (((C = A.cloneNode(!1)).textContent = k.textContent),
                    G.appendChild(C),
                    (R = !0));
                  var C,
                    D = [];
                  return (
                    Array.isArray(j) ? D.push.apply(D, a(j)) : D.push(j),
                    f(H, s.unique(D)),
                    G.appendChild(H),
                    Z &&
                      (((C = A.cloneNode(!1)).textContent = Z.textContent),
                      G.appendChild(C),
                      (L = !0)),
                    (x =
                      R && L
                        ? u.SplitType.both
                        : R
                          ? u.SplitType.head
                          : L
                            ? u.SplitType.tail
                            : u.SplitType.none),
                    H.setAttribute("data-" + d.DATASET_SPLIT_TYPE, x),
                    A.parentNode.replaceChild(G, A),
                    H
                  );
                })(p, m, v, b)
            : (function (E, F, j, y) {
                var H = document.createElement(y);
                return (
                  f(H, j),
                  H.appendChild(E.$node.cloneNode(!1)),
                  E.$node.parentNode.replaceChild(H, E.$node),
                  H.setAttribute("data-" + d.DATASET_IDENTIFIER, F.id),
                  H.setAttribute("data-" + d.DATASET_SPLIT_TYPE, E.splitType),
                  H.setAttribute("data-" + d.DATASET_IDENTIFIER_EXTRA, ""),
                  H
                );
              })(p, m, v, b);
        }),
          (n.normalizeSiblingText = function (p, m) {
            if ((m === void 0 && (m = !0), p && p.nodeType === 3)) {
              var v = m ? p.nextSibling : p.previousSibling;
              if (v.nodeType === 3) {
                var b = v.nodeValue;
                (p.nodeValue = m ? p.nodeValue + b : b + p.nodeValue),
                  v.parentNode.removeChild(v);
              }
            }
          });
      },
      function (o, n, r) {
        var i =
          (this && this.__values) ||
          function (a) {
            var u = typeof Symbol == "function" && Symbol.iterator,
              c = u && a[u],
              d = 0;
            if (c) return c.call(a);
            if (a && typeof a.length == "number")
              return {
                next: function () {
                  return (
                    a && d >= a.length && (a = void 0),
                    { value: a && a[d++], done: !a }
                  );
                },
              };
            throw new TypeError(
              u ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          };
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.unique = void 0),
          (n.unique = function (a) {
            var u,
              c,
              d = [];
            try {
              for (var s = i(a), l = s.next(); !l.done; l = s.next()) {
                var f = l.value;
                d.indexOf(f) === -1 && d.push(f);
              }
            } catch (g) {
              u = { error: g };
            } finally {
              try {
                l && !l.done && (c = s.return) && c.call(s);
              } finally {
                if (u) throw u.error;
              }
            }
            return d;
          });
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.initDefaultStylesheet = void 0);
        var i = r(0);
        n.initDefaultStylesheet = function () {
          var a = i.STYLESHEET_ID,
            u = document.getElementById(a);
          if (!u) {
            var c = document.createTextNode(i.getStylesheet());
            ((u = document.createElement("style")).id = a),
              u.appendChild(c),
              document.head.appendChild(u);
          }
          return u;
        };
      },
    ]).default;
  });
})(Lr);
var ci = Lr.exports;
const Br = /* @__PURE__ */ $t(ci),
  kt = "altimate-display-",
  li = `${kt}-highlight`,
  nr = `${kt}-highlight-hover`,
  di = `${kt}-active-highlight`,
  fi = 1049,
  Xe = new Br({
    style: {
      className: li,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Cn = new Br({
    style: {
      className: di,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Hr = (e, t) =>
    t.filter((o) => {
      var n;
      return ((n = o.$node.nodeValue) == null ? void 0 : n.trim()) !== "";
    }),
  zr = (e, t, o) => {
    const n = t,
      r = o,
      i = ["BR", "HR"];
    return (
      i.includes(n.$node.nodeName) &&
        n.$node.parentNode &&
        (n.$node = n.$node.parentNode),
      i.includes(r.$node.nodeName) &&
        r.$node.parentNode &&
        (r.$node = r.$node.parentNode),
      [n, r]
    );
  };
Xe.hooks.Render.SelectedNodes.tap(Hr);
Xe.hooks.Serialize.Restore.tap(zr);
Cn.hooks.Render.SelectedNodes.tap(Hr);
Cn.hooks.Serialize.Restore.tap(zr);
Xe.on("selection:hover", ({ id: e }) => {
  Xe.addClass(nr, e);
}).on("selection:hover-out", ({ id: e }) => {
  Xe.removeClass(nr, e);
});
const pi = (e) => {
    var t, o;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((o = e.meta) == null ? void 0 : o.highlight)
      : null;
  },
  hi = (e) => {
    const t = pi(e);
    t && (Xe.remove(t.id), Cn.remove(t.id));
  },
  Tn = () => {
    var o, n;
    const e = An(),
      t =
        (e == null ? void 0 : e[1]) === "analysis"
          ? document.getElementById("sql")
          : document.getElementById("code");
    return (n =
      (o = t == null ? void 0 : t.parentElement) == null
        ? void 0
        : o.querySelector("code-block")) == null
      ? void 0
      : n.querySelector("code.ng-binding.highlight");
  },
  An = () => {
    var t;
    return (t = window.location.hash
      .split("#")
      .find((o) => o.startsWith("!"))) == null
      ? void 0
      : t.split("/");
  },
  On = () => document.querySelector('[marked="model.description"]'),
  gi = (e) => {
    var t, o, n;
    return e.field
      ? e.column
        ? (o =
            (t = Array.from(
              document.querySelectorAll(
                "column-details tr:not(.ng-hide) td:first-child",
              ),
            ).find((i) => i.innerText === e.column)) == null
              ? void 0
              : t.parentElement) == null
          ? void 0
          : o.querySelector("td:nth-child(3)")
        : (n = On()) == null
          ? void 0
          : n.firstChild
      : Tn();
  },
  vi = (e) => {
    if (e.getAttribute("marked") === "model.description") return "description";
  },
  mi = (e, t, o, n, r) => {
    if (e === "description")
      return {
        start: 0,
        end: 0,
        x: 0,
        y: 0,
      };
    const i = t.querySelectorAll(".line-numbers-rows > span"),
      a = o.split(`
`),
      u = Math.max(r.y, n.y),
      c = Array.from(i).findIndex((l) => {
        const { height: f, y: g } = l.getBoundingClientRect();
        return u >= g && u <= g + f;
      }),
      d = i[c],
      s = c - a.length + 1;
    return (
      console.log("start and end lines found", s, c),
      {
        x: d.offsetLeft,
        y: d.offsetTop + d.offsetHeight / 2,
        start: s,
        end: c,
      }
    );
  },
  Hc = () => {
    var e;
    return [(e = Tn()) == null ? void 0 : e.parentElement, On()];
  };
var Ce = /* @__PURE__ */ ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.UNINITIALIZED = 1)] = "UNINITIALIZED"),
  (e[(e.INITIALIZED = 2)] = "INITIALIZED"),
  e
))(Ce || {});
function yi(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Ei(e) {
  return yi(e) && "type" in e && typeof e.type == "string";
}
var Ur = Symbol.for("immer-nothing"),
  rr = Symbol.for("immer-draftable"),
  be = Symbol.for("immer-state"),
  bi =
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
function ye(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const o = bi[e],
      n = typeof o == "function" ? o.apply(null, t) : o;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Qe = Object.getPrototypeOf;
function $e(e) {
  return !!e && !!e[be];
}
function Ne(e) {
  var t;
  return e
    ? Vr(e) ||
        Array.isArray(e) ||
        !!e[rr] ||
        !!((t = e.constructor) != null && t[rr]) ||
        Bt(e) ||
        Ht(e)
    : !1;
}
var _i = Object.prototype.constructor.toString();
function Vr(e) {
  if (!e || typeof e != "object") return !1;
  const t = Qe(e);
  if (t === null) return !0;
  const o = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return o === Object
    ? !0
    : typeof o == "function" && Function.toString.call(o) === _i;
}
function Dt(e, t) {
  Lt(e) === 0
    ? Reflect.ownKeys(e).forEach((o) => {
        t(o, e[o], e);
      })
    : e.forEach((o, n) => t(n, o, e));
}
function Lt(e) {
  const t = e[be];
  return t ? t.type_ : Array.isArray(e) ? 1 : Bt(e) ? 2 : Ht(e) ? 3 : 0;
}
function ln(e, t) {
  return Lt(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Wr(e, t, o) {
  const n = Lt(e);
  n === 2 ? e.set(t, o) : n === 3 ? e.add(o) : (e[t] = o);
}
function Si(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Bt(e) {
  return e instanceof Map;
}
function Ht(e) {
  return e instanceof Set;
}
function Le(e) {
  return e.copy_ || e.base_;
}
function dn(e, t) {
  if (Bt(e)) return new Map(e);
  if (Ht(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && Vr(e))
    return Qe(e)
      ? { ...e }
      : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const o = Object.getOwnPropertyDescriptors(e);
  delete o[be];
  let n = Reflect.ownKeys(o);
  for (let r = 0; r < n.length; r++) {
    const i = n[r],
      a = o[i];
    a.writable === !1 && ((a.writable = !0), (a.configurable = !0)),
      (a.get || a.set) &&
        (o[i] = {
          configurable: !0,
          writable: !0,
          // could live with !!desc.set as well here...
          enumerable: a.enumerable,
          value: e[i],
        });
  }
  return Object.create(Qe(e), o);
}
function Dn(e, t = !1) {
  return (
    zt(e) ||
      $e(e) ||
      !Ne(e) ||
      (Lt(e) > 1 && (e.set = e.add = e.clear = e.delete = Ci),
      Object.freeze(e),
      t && Object.entries(e).forEach(([o, n]) => Dn(n, !0))),
    e
  );
}
function Ci() {
  ye(2);
}
function zt(e) {
  return Object.isFrozen(e);
}
var Ti = {};
function ze(e) {
  const t = Ti[e];
  return t || ye(0, e), t;
}
var lt;
function qr() {
  return lt;
}
function Ai(e, t) {
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
function or(e, t) {
  t &&
    (ze("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function fn(e) {
  pn(e), e.drafts_.forEach(Oi), (e.drafts_ = null);
}
function pn(e) {
  e === lt && (lt = e.parent_);
}
function ir(e) {
  return (lt = Ai(lt, e));
}
function Oi(e) {
  const t = e[be];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function ar(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const o = t.drafts_[0];
  return (
    e !== void 0 && e !== o
      ? (o[be].modified_ && (fn(t), ye(4)),
        Ne(e) && ((e = Rt(t, e)), t.parent_ || wt(t, e)),
        t.patches_ &&
          ze("Patches").generateReplacementPatches_(
            o[be].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = Rt(t, o, [])),
    fn(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Ur ? e : void 0
  );
}
function Rt(e, t, o) {
  if (zt(t)) return t;
  const n = t[be];
  if (!n) return Dt(t, (r, i) => sr(e, n, t, r, i, o)), t;
  if (n.scope_ !== e) return t;
  if (!n.modified_) return wt(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    (n.finalized_ = !0), n.scope_.unfinalizedDrafts_--;
    const r = n.copy_;
    let i = r,
      a = !1;
    n.type_ === 3 && ((i = new Set(r)), r.clear(), (a = !0)),
      Dt(i, (u, c) => sr(e, n, r, u, c, o, a)),
      wt(e, r, !1),
      o &&
        e.patches_ &&
        ze("Patches").generatePatches_(n, o, e.patches_, e.inversePatches_);
  }
  return n.copy_;
}
function sr(e, t, o, n, r, i, a) {
  if ((process.env.NODE_ENV !== "production" && r === o && ye(5), $e(r))) {
    const u =
        i &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !ln(t.assigned_, n)
          ? i.concat(n)
          : void 0,
      c = Rt(e, r, u);
    if ((Wr(o, n, c), $e(c))) e.canAutoFreeze_ = !1;
    else return;
  } else a && o.add(r);
  if (Ne(r) && !zt(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    Rt(e, r),
      (!t || !t.scope_.parent_) &&
        typeof n != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(o, n) &&
        wt(e, r);
  }
}
function wt(e, t, o = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Dn(t, o);
}
function Di(e, t) {
  const o = Array.isArray(e),
    n = {
      type_: o ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : qr(),
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
  let r = n,
    i = Rn;
  o && ((r = [n]), (i = dt));
  const { revoke: a, proxy: u } = Proxy.revocable(r, i);
  return (n.draft_ = u), (n.revoke_ = a), u;
}
var Rn = {
    get(e, t) {
      if (t === be) return e;
      const o = Le(e);
      if (!ln(o, t)) return Ri(e, o, t);
      const n = o[t];
      return e.finalized_ || !Ne(n)
        ? n
        : n === Zt(e.base_, t)
          ? (Jt(e), (e.copy_[t] = gn(n, e)))
          : n;
    },
    has(e, t) {
      return t in Le(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Le(e));
    },
    set(e, t, o) {
      const n = Yr(Le(e), t);
      if (n != null && n.set) return n.set.call(e.draft_, o), !0;
      if (!e.modified_) {
        const r = Zt(Le(e), t),
          i = r == null ? void 0 : r[be];
        if (i && i.base_ === o)
          return (e.copy_[t] = o), (e.assigned_[t] = !1), !0;
        if (Si(o, r) && (o !== void 0 || ln(e.base_, t))) return !0;
        Jt(e), hn(e);
      }
      return (
        (e.copy_[t] === o && // special case: handle new props with value 'undefined'
          (o !== void 0 || t in e.copy_)) || // special case: NaN
          (Number.isNaN(o) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = o), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        Zt(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), Jt(e), hn(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(e, t) {
      const o = Le(e),
        n = Reflect.getOwnPropertyDescriptor(o, t);
      return (
        n && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== "length",
          enumerable: n.enumerable,
          value: o[t],
        }
      );
    },
    defineProperty() {
      ye(11);
    },
    getPrototypeOf(e) {
      return Qe(e.base_);
    },
    setPrototypeOf() {
      ye(12);
    },
  },
  dt = {};
Dt(Rn, (e, t) => {
  dt[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
dt.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && ye(13),
    dt.set.call(this, e, t, void 0)
  );
};
dt.set = function (e, t, o) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      ye(14),
    Rn.set.call(this, e[0], t, o, e[0])
  );
};
function Zt(e, t) {
  const o = e[be];
  return (o ? Le(o) : e)[t];
}
function Ri(e, t, o) {
  var r;
  const n = Yr(t, o);
  return n
    ? "value" in n
      ? n.value
      : // This is a very special case, if the prop is a getter defined by the
        // prototype, we should invoke it with the draft as context!
        (r = n.get) == null
        ? void 0
        : r.call(e.draft_)
    : void 0;
}
function Yr(e, t) {
  if (!(t in e)) return;
  let o = Qe(e);
  for (; o; ) {
    const n = Object.getOwnPropertyDescriptor(o, t);
    if (n) return n;
    o = Qe(o);
  }
}
function hn(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && hn(e.parent_));
}
function Jt(e) {
  e.copy_ || (e.copy_ = dn(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var wi = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, o, n) => {
        if (typeof t == "function" && typeof o != "function") {
          const i = o;
          o = t;
          const a = this;
          return function (c = i, ...d) {
            return a.produce(c, (s) => o.call(this, s, ...d));
          };
        }
        typeof o != "function" && ye(6),
          n !== void 0 && typeof n != "function" && ye(7);
        let r;
        if (Ne(t)) {
          const i = ir(this),
            a = gn(t, void 0);
          let u = !0;
          try {
            (r = o(a)), (u = !1);
          } finally {
            u ? fn(i) : pn(i);
          }
          return or(i, n), ar(r, i);
        } else if (!t || typeof t != "object") {
          if (
            ((r = o(t)),
            r === void 0 && (r = t),
            r === Ur && (r = void 0),
            this.autoFreeze_ && Dn(r, !0),
            n)
          ) {
            const i = [],
              a = [];
            ze("Patches").generateReplacementPatches_(t, r, i, a), n(i, a);
          }
          return r;
        } else ye(1, t);
      }),
      (this.produceWithPatches = (t, o) => {
        if (typeof t == "function")
          return (a, ...u) => this.produceWithPatches(a, (c) => t(c, ...u));
        let n, r;
        return [
          this.produce(t, o, (a, u) => {
            (n = a), (r = u);
          }),
          n,
          r,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == "boolean" &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Ne(e) || ye(8), $e(e) && (e = Kr(e));
    const t = ir(this),
      o = gn(e, void 0);
    return (o[be].isManual_ = !0), pn(t), o;
  }
  finishDraft(e, t) {
    const o = e && e[be];
    (!o || !o.isManual_) && ye(9);
    const { scope_: n } = o;
    return or(n, t), ar(void 0, n);
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
    const n = ze("Patches").applyPatches_;
    return $e(e) ? n(e, t) : this.produce(e, (r) => n(r, t));
  }
};
function gn(e, t) {
  const o = Bt(e)
    ? ze("MapSet").proxyMap_(e, t)
    : Ht(e)
      ? ze("MapSet").proxySet_(e, t)
      : Di(e, t);
  return (t ? t.scope_ : qr()).drafts_.push(o), o;
}
function Kr(e) {
  return $e(e) || ye(10, e), Gr(e);
}
function Gr(e) {
  if (!Ne(e) || zt(e)) return e;
  const t = e[be];
  let o;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (o = dn(e, t.scope_.immer_.useStrictShallowCopy_));
  } else o = dn(e, !0);
  return (
    Dt(o, (n, r) => {
      Wr(o, n, Gr(r));
    }),
    t && (t.finalized_ = !1),
    o
  );
}
var _e = new wi(),
  Xr = _e.produce;
_e.produceWithPatches.bind(_e);
_e.setAutoFreeze.bind(_e);
_e.setUseStrictShallowCopy.bind(_e);
_e.applyPatches.bind(_e);
_e.createDraft.bind(_e);
_e.finishDraft.bind(_e);
var Ii = (e, t, o) => {
    if (t.length === 1 && t[0] === o) {
      let n = !1;
      try {
        const r = {};
        e(r) === r && (n = !0);
      } catch {}
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
          { stack: r },
        );
      }
    }
  },
  xi = (e, t, o) => {
    const { memoize: n, memoizeOptions: r } = t,
      { inputSelectorResults: i, inputSelectorResultsCopy: a } = e,
      u = n(() => ({}), ...r);
    if (!(u.apply(null, i) === u.apply(null, a))) {
      let d;
      try {
        throw new Error();
      } catch (s) {
        ({ stack: d } = s);
      }
      console.warn(
        `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
        {
          arguments: o,
          firstInputs: i,
          secondInputs: a,
          stack: d,
        },
      );
    }
  },
  Pi = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function Ni(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function Fi(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function ji(
  e,
  t = "expected all items to be functions, instead received the following types: ",
) {
  if (!e.every((o) => typeof o == "function")) {
    const o = e
      .map((n) =>
        typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n,
      )
      .join(", ");
    throw new TypeError(`${t}[${o}]`);
  }
}
var ur = (e) => (Array.isArray(e) ? e : [e]);
function Mi(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    ji(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function cr(e, t) {
  const o = [],
    { length: n } = e;
  for (let r = 0; r < n; r++) o.push(e[r].apply(null, t));
  return o;
}
var $i = (e, t) => {
    const { identityFunctionCheck: o, inputStabilityCheck: n } = {
      ...Pi,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: o === "always" || (o === "once" && e),
        run: Ii,
      },
      inputStabilityCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: xi,
      },
    };
  },
  ki = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Li = typeof WeakRef < "u" ? WeakRef : ki,
  Bi = 0,
  lr = 1;
function yt() {
  return {
    s: Bi,
    v: void 0,
    o: null,
    p: null,
  };
}
function wn(e, t = {}) {
  let o = yt();
  const { resultEqualityCheck: n } = t;
  let r,
    i = 0;
  function a() {
    var l;
    let u = o;
    const { length: c } = arguments;
    for (let f = 0, g = c; f < g; f++) {
      const p = arguments[f];
      if (typeof p == "function" || (typeof p == "object" && p !== null)) {
        let m = u.o;
        m === null && (u.o = m = /* @__PURE__ */ new WeakMap());
        const v = m.get(p);
        v === void 0 ? ((u = yt()), m.set(p, u)) : (u = v);
      } else {
        let m = u.p;
        m === null && (u.p = m = /* @__PURE__ */ new Map());
        const v = m.get(p);
        v === void 0 ? ((u = yt()), m.set(p, u)) : (u = v);
      }
    }
    const d = u;
    let s;
    if (
      (u.s === lr ? (s = u.v) : ((s = e.apply(null, arguments)), i++),
      (d.s = lr),
      n)
    ) {
      const f =
        ((l = r == null ? void 0 : r.deref) == null ? void 0 : l.call(r)) ?? r;
      f != null && n(f, s) && ((s = f), i !== 0 && i--),
        (r =
          (typeof s == "object" && s !== null) || typeof s == "function"
            ? new Li(s)
            : s);
    }
    return (d.v = s), s;
  }
  return (
    (a.clearCache = () => {
      (o = yt()), a.resetResultsCount();
    }),
    (a.resultsCount = () => i),
    (a.resetResultsCount = () => {
      i = 0;
    }),
    a
  );
}
function Zr(e, ...t) {
  const o =
      typeof e == "function"
        ? {
            memoize: e,
            memoizeOptions: t,
          }
        : e,
    n = (...r) => {
      let i = 0,
        a = 0,
        u,
        c = {},
        d = r.pop();
      typeof d == "object" && ((c = d), (d = r.pop())),
        Ni(
          d,
          `createSelector expects an output function after the inputs, but received: [${typeof d}]`,
        );
      const s = {
          ...o,
          ...c,
        },
        {
          memoize: l,
          memoizeOptions: f = [],
          argsMemoize: g = wn,
          argsMemoizeOptions: p = [],
          devModeChecks: m = {},
        } = s,
        v = ur(f),
        b = ur(p),
        _ = Mi(r),
        S = l(
          function () {
            return i++, d.apply(null, arguments);
          },
          ...v,
        );
      let O = !0;
      const E = g(
        function () {
          a++;
          const j = cr(_, arguments);
          if (((u = S.apply(null, j)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: y, inputStabilityCheck: H } = $i(
              O,
              m,
            );
            if ((y.shouldRun && y.run(d, j, u), H.shouldRun)) {
              const A = cr(_, arguments);
              H.run(
                { inputSelectorResults: j, inputSelectorResultsCopy: A },
                { memoize: l, memoizeOptions: v },
                arguments,
              );
            }
            O && (O = !1);
          }
          return u;
        },
        ...b,
      );
      return Object.assign(E, {
        resultFunc: d,
        memoizedResultFunc: S,
        dependencies: _,
        dependencyRecomputations: () => a,
        resetDependencyRecomputations: () => {
          a = 0;
        },
        lastResult: () => u,
        recomputations: () => i,
        resetRecomputations: () => {
          i = 0;
        },
        memoize: l,
        argsMemoize: g,
      });
    };
  return (
    Object.assign(n, {
      withTypes: () => n,
    }),
    n
  );
}
var Hi = /* @__PURE__ */ Zr(wn),
  zi = Object.assign(
    (e, t = Hi) => {
      Fi(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const o = Object.keys(e),
        n = o.map((i) => e[i]);
      return t(n, (...i) => i.reduce((a, u, c) => ((a[o[c]] = u), a), {}));
    },
    { withTypes: () => zi },
  ),
  Ui = (...e) => {
    const t = Zr(...e),
      o = Object.assign(
        (...n) => {
          const r = t(...n),
            i = (a, ...u) => r($e(a) ? Kr(a) : a, ...u);
          return Object.assign(i, r), i;
        },
        {
          withTypes: () => o,
        },
      );
    return o;
  };
Ui(wn);
function et(e, t) {
  function o(...n) {
    if (t) {
      let r = t(...n);
      if (!r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(0)
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
      payload: n[0],
    };
  }
  return (
    (o.toString = () => `${e}`),
    (o.type = e),
    (o.match = (n) => Ei(n) && n.type === e),
    o
  );
}
function dr(e) {
  return Ne(e) ? Xr(e, () => {}) : e;
}
function fr(e, t, o) {
  if (e.has(t)) {
    let r = e.get(t);
    return o.update && ((r = o.update(r, t, e)), e.set(t, r)), r;
  }
  if (!o.insert)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? fe(10)
        : "No insert provided for key not already in map",
    );
  const n = o.insert(t, e);
  return e.set(t, n), n;
}
process.env.NODE_ENV;
function Jr(e) {
  const t = {},
    o = [];
  let n;
  const r = {
    addCase(i, a) {
      if (process.env.NODE_ENV !== "production") {
        if (o.length > 0)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? fe(26)
              : "`builder.addCase` should only be called before calling `builder.addMatcher`",
          );
        if (n)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? fe(27)
              : "`builder.addCase` should only be called before calling `builder.addDefaultCase`",
          );
      }
      const u = typeof i == "string" ? i : i.type;
      if (!u)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(28)
            : "`builder.addCase` cannot be called with an empty action type",
        );
      if (u in t)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(29)
            : `\`builder.addCase\` cannot be called with two reducers for the same action type '${u}'`,
        );
      return (t[u] = a), r;
    },
    addMatcher(i, a) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(30)
            : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`",
        );
      return (
        o.push({
          matcher: i,
          reducer: a,
        }),
        r
      );
    },
    addDefaultCase(i) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(31)
            : "`builder.addDefaultCase` can only be called once",
        );
      return (n = i), r;
    },
  };
  return e(r), [t, o, n];
}
function Vi(e) {
  return typeof e == "function";
}
function Wi(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? fe(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [o, n, r] = Jr(t),
    i;
  if (Vi(e)) i = () => dr(e());
  else {
    const u = dr(e);
    i = () => u;
  }
  function a(u = i(), c) {
    let d = [
      o[c.type],
      ...n.filter(({ matcher: s }) => s(c)).map(({ reducer: s }) => s),
    ];
    return (
      d.filter((s) => !!s).length === 0 && (d = [r]),
      d.reduce((s, l) => {
        if (l)
          if ($e(s)) {
            const g = l(s, c);
            return g === void 0 ? s : g;
          } else {
            if (Ne(s)) return Xr(s, (f) => l(f, c));
            {
              const f = l(s, c);
              if (f === void 0) {
                if (s === null) return s;
                throw new Error(
                  process.env.NODE_ENV === "production"
                    ? fe(9)
                    : "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return f;
            }
          }
        return s;
      }, u)
    );
  }
  return (a.getInitialState = i), a;
}
var qi = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  Yi = (e = 21) => {
    let t = "",
      o = e;
    for (; o--; ) t += qi[(Math.random() * 64) | 0];
    return t;
  },
  Ki = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Gi(e, t) {
  return `${e}/${t}`;
}
function Xi({ creators: e } = {}) {
  var o;
  const t = (o = e == null ? void 0 : e.asyncThunk) == null ? void 0 : o[Ki];
  return function (r) {
    const { name: i, reducerPath: a = i } = r;
    if (!i)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? fe(11)
          : "`name` is a required option for createSlice",
      );
    typeof process < "u" &&
      process.env.NODE_ENV === "development" &&
      r.initialState === void 0 &&
      console.error(
        "You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`",
      );
    const u =
        (typeof r.reducers == "function" ? r.reducers(Qi()) : r.reducers) || {},
      c = Object.keys(u),
      d = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      s = {
        addCase(S, O) {
          const E = typeof S == "string" ? S : S.type;
          if (!E)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? fe(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (E in d.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? fe(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  E,
            );
          return (d.sliceCaseReducersByType[E] = O), s;
        },
        addMatcher(S, O) {
          return (
            d.sliceMatchers.push({
              matcher: S,
              reducer: O,
            }),
            s
          );
        },
        exposeAction(S, O) {
          return (d.actionCreators[S] = O), s;
        },
        exposeCaseReducer(S, O) {
          return (d.sliceCaseReducersByName[S] = O), s;
        },
      };
    c.forEach((S) => {
      const O = u[S],
        E = {
          reducerName: S,
          type: Gi(i, S),
          createNotation: typeof r.reducers == "function",
        };
      ta(O) ? ra(E, O, s, t) : ea(E, O, s);
    });
    function l() {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof r.extraReducers == "object"
      )
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(14)
            : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
        );
      const [S = {}, O = [], E = void 0] =
          typeof r.extraReducers == "function"
            ? Jr(r.extraReducers)
            : [r.extraReducers],
        F = {
          ...S,
          ...d.sliceCaseReducersByType,
        };
      return Wi(r.initialState, (j) => {
        for (let y in F) j.addCase(y, F[y]);
        for (let y of d.sliceMatchers) j.addMatcher(y.matcher, y.reducer);
        for (let y of O) j.addMatcher(y.matcher, y.reducer);
        E && j.addDefaultCase(E);
      });
    }
    const f = (S) => S,
      g = /* @__PURE__ */ new Map();
    let p;
    function m(S, O) {
      return p || (p = l()), p(S, O);
    }
    function v() {
      return p || (p = l()), p.getInitialState();
    }
    function b(S, O = !1) {
      function E(j) {
        let y = j[S];
        if (typeof y > "u") {
          if (O) y = v();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? fe(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return y;
      }
      function F(j = f) {
        const y = fr(g, O, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return fr(y, j, {
          insert: () => {
            const H = {};
            for (const [A, k] of Object.entries(r.selectors ?? {}))
              H[A] = Zi(k, j, v, O);
            return H;
          },
        });
      }
      return {
        reducerPath: S,
        getSelectors: F,
        get selectors() {
          return F(E);
        },
        selectSlice: E,
      };
    }
    const _ = {
      name: i,
      reducer: m,
      actions: d.actionCreators,
      caseReducers: d.sliceCaseReducersByName,
      getInitialState: v,
      ...b(a),
      injectInto(S, { reducerPath: O, ...E } = {}) {
        const F = O ?? a;
        return (
          S.inject(
            {
              reducerPath: F,
              reducer: m,
            },
            E,
          ),
          {
            ..._,
            ...b(F, !0),
          }
        );
      },
    };
    return _;
  };
}
function Zi(e, t, o, n) {
  function r(i, ...a) {
    let u = t(i);
    if (typeof u > "u") {
      if (n) u = o();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(16)
            : "selectState returned undefined for an uninjected slice reducer",
        );
    }
    return e(u, ...a);
  }
  return (r.unwrapped = e), r;
}
var Ji = /* @__PURE__ */ Xi();
function Qi() {
  function e(t, o) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...o,
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
            [t.name](...o) {
              return t(...o);
            },
          }[t.name],
          {
            _reducerDefinitionType: "reducer",
            /* reducer */
          },
        );
      },
      preparedReducer(t, o) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: t,
          reducer: o,
        };
      },
      asyncThunk: e,
    }
  );
}
function ea({ type: e, reducerName: t, createNotation: o }, n, r) {
  let i, a;
  if ("reducer" in n) {
    if (o && !na(n))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? fe(17)
          : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.",
      );
    (i = n.reducer), (a = n.prepare);
  } else i = n;
  r.addCase(e, i)
    .exposeCaseReducer(t, i)
    .exposeAction(t, a ? et(e, a) : et(e));
}
function ta(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function na(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function ra({ type: e, reducerName: t }, o, n, r) {
  if (!r)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? fe(18)
        : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.",
    );
  const {
      payloadCreator: i,
      fulfilled: a,
      pending: u,
      rejected: c,
      settled: d,
      options: s,
    } = o,
    l = r(e, i, s);
  n.exposeAction(t, l),
    a && n.addCase(l.fulfilled, a),
    u && n.addCase(l.pending, u),
    c && n.addCase(l.rejected, c),
    d && n.addMatcher(l.settled, d),
    n.exposeCaseReducer(t, {
      fulfilled: a || Et,
      pending: u || Et,
      rejected: c || Et,
      settled: d || Et,
    });
}
function Et() {}
var oa = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? fe(32)
          : `${t} is not a function`,
      );
  },
  In = "listenerMiddleware",
  ia = (e) => {
    let { type: t, actionCreator: o, matcher: n, predicate: r, effect: i } = e;
    if (t) r = et(t).match;
    else if (o) (t = o.type), (r = o.match);
    else if (n) r = n;
    else if (!r)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? fe(21)
          : "Creating or removing a listener requires one of the known fields for matching an action",
      );
    return (
      oa(i, "options.listener"),
      {
        predicate: r,
        type: t,
        effect: i,
      }
    );
  },
  aa = Object.assign(
    (e) => {
      const { type: t, predicate: o, effect: n } = ia(e);
      return {
        id: Yi(),
        effect: n,
        type: t,
        predicate: o,
        pending: /* @__PURE__ */ new Set(),
        unsubscribe: () => {
          throw new Error(
            process.env.NODE_ENV === "production"
              ? fe(22)
              : "Unsubscribe not initialized",
          );
        },
      };
    },
    {
      withTypes: () => aa,
    },
  ),
  sa = Object.assign(et(`${In}/add`), {
    withTypes: () => sa,
  });
et(`${In}/removeAll`);
var ua = Object.assign(et(`${In}/remove`), {
  withTypes: () => ua,
});
function fe(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const ca = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    conversationsLoadingState: Ce.UNINITIALIZED,
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: ui(),
    codeblockLoaded: !1,
    source: Sn.DBT_DOCS,
    manifest: {},
  },
  It = Ji({
    name: "appState",
    initialState: ca,
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
        e.conversationsLoadingState = Ce.UNINITIALIZED;
      },
      setUsers: (e, t) => {
        var o;
        return (o = t.payload) != null && o.length
          ? {
              ...e,
              users: t.payload.reduce((n, r) => ((n[r.id] = r), n), {}),
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
        var r, i;
        const o = { ...t.payload };
        if (!o.meta) {
          console.log("Invalid meta");
          return;
        }
        const n = An();
        if (!n || n.length < 3) {
          console.error("Unable to find model parts", n);
          return;
        }
        if (
          (console.log("model parts found", n),
          (o.meta.uniqueId = n[2]),
          (o.meta.resource_type = n[1]),
          o.meta.range ||
            (o.meta.range = {
              end: { line: 0, character: 0 },
              start: { line: 0, character: 0 },
            }),
          o.meta.uniqueId)
        ) {
          const a =
            ((r = e.manifest.nodes) == null ? void 0 : r[o.meta.uniqueId]) ||
            ((i = e.manifest.macros) == null ? void 0 : i[o.meta.uniqueId]);
          o.meta.filePath = (a == null ? void 0 : a.original_file_path) || "";
        }
        e.newConversation = o;
      },
      resetNewConversation: (e) => {
        e.newConversation = void 0;
      },
      setConversations: (e, t) => {
        t.payload &&
          (e.conversations = t.payload.reduce(
            (o, n) => ((o[n.conversation_group_id] = n), o),
            {},
          ));
      },
    },
  }),
  {
    setCurrentUserId: zc,
    setShareId: Uc,
    updateSelectedConversationId: xn,
    updateRightPanelState: Pn,
    setUsers: la,
    setConversations: da,
    resetNewConversation: Nn,
    updateNewConversation: Fn,
    upsertConversation: Vc,
    setDocsAppRendered: Wc,
    updateCurrentPage: qc,
    updateCodeblockLoaded: Yc,
    resolveConversationGroup: fa,
    setConversationsLoadingState: pr,
    refetchConversations: Qr,
    setConversationSource: Kc,
    setManifest: pa,
  } = It.actions,
  Ut = Ue({
    state: It.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  ha = ({
    children: e,
    shareId: t,
    userId: o,
    conversationGroupId: n,
    source: r,
  }) => {
    const [i, a] = Ko(It.reducer, {
        ...It.getInitialState(),
        shareId: t,
        currentUserId: o,
        selectedConversationId: n,
        isRightPanelOpen: !!n,
        source: r,
      }),
      u = Me((d) => d(i), [i]),
      c = Pe(
        () => ({
          state: i,
          dispatch: a,
          getValue: u,
        }),
        [i, a, u],
      );
    return /* @__PURE__ */ w.jsx(Ut.Provider, { value: c, children: e });
  },
  ga = ha,
  va = () => Ve(Ut),
  ue = (e) => {
    const { getValue: t } = Ve(Ut);
    return t(e);
  },
  Oe = () => {
    const { dispatch: e } = Ve(Ut);
    return e;
  },
  ma = Ue({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  ya = Ue(null),
  Ea = typeof document < "u",
  eo = Ea ? Go : Ae;
class hr {
  constructor() {
    (this.order = []), (this.scheduled = /* @__PURE__ */ new Set());
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
    (this.order.length = 0), this.scheduled.clear();
  }
}
function ba(e) {
  let t = new hr(),
    o = new hr(),
    n = 0,
    r = !1,
    i = !1;
  const a = /* @__PURE__ */ new WeakSet(),
    u = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (c, d = !1, s = !1) => {
        const l = s && r,
          f = l ? t : o;
        return d && a.add(c), f.add(c) && l && r && (n = t.order.length), c;
      },
      /**
       * Cancel the provided callback from running on the next frame.
       */
      cancel: (c) => {
        o.remove(c), a.delete(c);
      },
      /**
       * Execute all schedule callbacks.
       */
      process: (c) => {
        if (r) {
          i = !0;
          return;
        }
        if (((r = !0), ([t, o] = [o, t]), o.clear(), (n = t.order.length), n))
          for (let d = 0; d < n; d++) {
            const s = t.order[d];
            a.has(s) && (u.schedule(s), e()), s(c);
          }
        (r = !1), i && ((i = !1), u.process(c));
      },
    };
  return u;
}
const bt = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
    // Compute
  ],
  _a = 40;
function Sa(e, t) {
  let o = !1,
    n = !0;
  const r = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    i = bt.reduce((l, f) => ((l[f] = ba(() => (o = !0))), l), {}),
    a = (l) => {
      i[l].process(r);
    },
    u = () => {
      const l = performance.now();
      (o = !1),
        (r.delta = n ? 1e3 / 60 : Math.max(Math.min(l - r.timestamp, _a), 1)),
        (r.timestamp = l),
        (r.isProcessing = !0),
        bt.forEach(a),
        (r.isProcessing = !1),
        o && t && ((n = !1), e(u));
    },
    c = () => {
      (o = !0), (n = !0), r.isProcessing || e(u);
    };
  return {
    schedule: bt.reduce((l, f) => {
      const g = i[f];
      return (l[f] = (p, m = !1, v = !1) => (o || c(), g.schedule(p, m, v))), l;
    }, {}),
    cancel: (l) => bt.forEach((f) => i[f].cancel(l)),
    state: r,
    steps: i,
  };
}
const Ca = Ue({});
function Ta(e) {
  const t = Re(null);
  return t.current === null && (t.current = e()), t.current;
}
const Aa = (e) => e,
  {
    schedule: Oa,
    cancel: Gc,
    state: Xc,
    steps: Zc,
  } = Sa(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Aa, !0);
function to() {
  const e = Re(!1);
  return (
    eo(
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
function Da() {
  const e = to(),
    [t, o] = ge(0),
    n = Me(() => {
      e.current && o(t + 1);
    }, [t]);
  return [Me(() => Oa.postRender(n), [n]), t];
}
class Ra extends Ee.Component {
  getSnapshotBeforeUpdate(t) {
    const o = this.props.childRef.current;
    if (o && t.isPresent && !this.props.isPresent) {
      const n = this.props.sizeRef.current;
      (n.height = o.offsetHeight || 0),
        (n.width = o.offsetWidth || 0),
        (n.top = o.offsetTop),
        (n.left = o.offsetLeft);
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
function wa({ children: e, isPresent: t }) {
  const o = Mr(),
    n = Re(null),
    r = Re({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: i } = Ve(ma);
  return (
    Xo(() => {
      const { width: a, height: u, top: c, left: d } = r.current;
      if (t || !n.current || !a || !u) return;
      n.current.dataset.motionPopId = o;
      const s = document.createElement("style");
      return (
        i && (s.nonce = i),
        document.head.appendChild(s),
        s.sheet &&
          s.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${a}px !important;
            height: ${u}px !important;
            top: ${c}px !important;
            left: ${d}px !important;
          }
        `),
        () => {
          document.head.removeChild(s);
        }
      );
    }, [t]),
    Ee.createElement(
      Ra,
      { isPresent: t, childRef: n, sizeRef: r },
      Ee.cloneElement(e, { ref: n }),
    )
  );
}
const Qt = ({
  children: e,
  initial: t,
  isPresent: o,
  onExitComplete: n,
  custom: r,
  presenceAffectsLayout: i,
  mode: a,
}) => {
  const u = Ta(Ia),
    c = Mr(),
    d = Pe(
      () => ({
        id: c,
        initial: t,
        isPresent: o,
        custom: r,
        onExitComplete: (s) => {
          u.set(s, !0);
          for (const l of u.values()) if (!l) return;
          n && n();
        },
        register: (s) => (u.set(s, !1), () => u.delete(s)),
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      i ? void 0 : [o],
    );
  return (
    Pe(() => {
      u.forEach((s, l) => u.set(l, !1));
    }, [o]),
    Ee.useEffect(() => {
      !o && !u.size && n && n();
    }, [o]),
    a === "popLayout" && (e = Ee.createElement(wa, { isPresent: o }, e)),
    Ee.createElement(ya.Provider, { value: d }, e)
  );
};
function Ia() {
  return /* @__PURE__ */ new Map();
}
function xa(e) {
  return Ae(() => () => e(), []);
}
const Be = (e) => e.key || "";
function Pa(e, t) {
  e.forEach((o) => {
    const n = Be(o);
    t.set(n, o);
  });
}
function Na(e) {
  const t = [];
  return (
    Je.forEach(e, (o) => {
      $r(o) && t.push(o);
    }),
    t
  );
}
const Fa = ({
    children: e,
    custom: t,
    initial: o = !0,
    onExitComplete: n,
    exitBeforeEnter: r,
    presenceAffectsLayout: i = !0,
    mode: a = "sync",
  }) => {
    const u = Ve(Ca).forceRender || Da()[0],
      c = to(),
      d = Na(e);
    let s = d;
    const l = Re(/* @__PURE__ */ new Map()).current,
      f = Re(s),
      g = Re(/* @__PURE__ */ new Map()).current,
      p = Re(!0);
    if (
      (eo(() => {
        (p.current = !1), Pa(d, g), (f.current = s);
      }),
      xa(() => {
        (p.current = !0), g.clear(), l.clear();
      }),
      p.current)
    )
      return Ee.createElement(
        Ee.Fragment,
        null,
        s.map((_) =>
          Ee.createElement(
            Qt,
            {
              key: Be(_),
              isPresent: !0,
              initial: o ? void 0 : !1,
              presenceAffectsLayout: i,
              mode: a,
            },
            _,
          ),
        ),
      );
    s = [...s];
    const m = f.current.map(Be),
      v = d.map(Be),
      b = m.length;
    for (let _ = 0; _ < b; _++) {
      const S = m[_];
      v.indexOf(S) === -1 && !l.has(S) && l.set(S, void 0);
    }
    return (
      a === "wait" && l.size && (s = []),
      l.forEach((_, S) => {
        if (v.indexOf(S) !== -1) return;
        const O = g.get(S);
        if (!O) return;
        const E = m.indexOf(S);
        let F = _;
        if (!F) {
          const j = () => {
            l.delete(S);
            const y = Array.from(g.keys()).filter((H) => !v.includes(H));
            if (
              (y.forEach((H) => g.delete(H)),
              (f.current = d.filter((H) => {
                const A = Be(H);
                return (
                  // filter out the node exiting
                  A === S || // filter out the leftover children
                  y.includes(A)
                );
              })),
              !l.size)
            ) {
              if (c.current === !1) return;
              u(), n && n();
            }
          };
          (F = Ee.createElement(
            Qt,
            {
              key: Be(O),
              isPresent: !1,
              onExitComplete: j,
              custom: t,
              presenceAffectsLayout: i,
              mode: a,
            },
            O,
          )),
            l.set(S, F);
        }
        s.splice(E, 0, F);
      }),
      (s = s.map((_) => {
        const S = _.key;
        return l.has(S)
          ? _
          : Ee.createElement(
              Qt,
              { key: Be(_), isPresent: !0, presenceAffectsLayout: i, mode: a },
              _,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        a === "wait" &&
        s.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      Ee.createElement(Ee.Fragment, null, l.size ? s : s.map((_) => Zo(_)))
    );
  },
  Vt = ({ icon: e, className: t = "", ...o }) =>
    /* @__PURE__ */ w.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...o,
    }),
  no = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "add", ...e }),
  ja = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "comment-unresolved", ...e }),
  Ma = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "check", ...e }),
  $a = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "send", ...e }),
  ka = "_iconButton_eti7u_1",
  La = {
    iconButton: ka,
  },
  Ba = (e) =>
    /* @__PURE__ */ w.jsx(Wa, {
      title: e.title,
      children: /* @__PURE__ */ w.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${
          e.className ?? ""
        } ${La.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  ro = Ba,
  Ha = Ue(null),
  en = {
    didCatch: !1,
    error: null,
  };
class za extends Jo {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = en);
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
      for (var o, n, r = arguments.length, i = new Array(r), a = 0; a < r; a++)
        i[a] = arguments[a];
      (o = (n = this.props).onReset) === null ||
        o === void 0 ||
        o.call(n, {
          args: i,
          reason: "imperative-api",
        }),
        this.setState(en);
    }
  }
  componentDidCatch(t, o) {
    var n, r;
    (n = (r = this.props).onError) === null || n === void 0 || n.call(r, t, o);
  }
  componentDidUpdate(t, o) {
    const { didCatch: n } = this.state,
      { resetKeys: r } = this.props;
    if (n && o.error !== null && Ua(t.resetKeys, r)) {
      var i, a;
      (i = (a = this.props).onReset) === null ||
        i === void 0 ||
        i.call(a, {
          next: r,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(en);
    }
  }
  render() {
    const {
        children: t,
        fallbackRender: o,
        FallbackComponent: n,
        fallback: r,
      } = this.props,
      { didCatch: i, error: a } = this.state;
    let u = t;
    if (i) {
      const c = {
        error: a,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (typeof o == "function") u = o(c);
      else if (n) u = Qn(n, c);
      else if (r === null || $r(r)) u = r;
      else throw a;
    }
    return Qn(
      Ha.Provider,
      {
        value: {
          didCatch: i,
          error: a,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      u,
    );
  }
}
function Ua() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((o, n) => !Object.is(o, t[n]));
}
const Va = (e) => {
    const [t, o] = ge(!1),
      n = () => o(!t),
      r = Re(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ w.jsxs(za, {
      fallback: /* @__PURE__ */ w.jsx("span", {
        id: r.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ w.jsx("span", { id: r.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ w.jsx(ei, {
              isOpen: t,
              target: r.current,
              toggle: n,
              className: e.className,
              children: e.title,
            })
          : null,
      ],
    });
  },
  Wa = Va,
  qa = "_loadingBtn_gadec_1",
  Ya = {
    loadingBtn: qa,
  },
  Ka = ({ loading: e, ...t }) =>
    /* @__PURE__ */ w.jsx(Ft, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${Ya.loadingBtn}`,
      children: e ? /* @__PURE__ */ w.jsx(ti, {}) : t.children,
    }),
  Ga = Ka,
  Xa = {
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
  Za = {
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
  Ja = {
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
  Qa = "_codeblock_tsha5_1",
  es = {
    codeblock: Qa,
  },
  ts = { vs: Za, "vsc-dark-plus": Ja, solarizedLight: Xa },
  ns = ({
    code: e,
    language: t,
    fileName: o,
    theme: n = "vs",
    showLineNumbers: r,
    titleActions: i,
  }) =>
    /* @__PURE__ */ w.jsxs(jt, {
      className: es.codeblock,
      children: [
        o
          ? /* @__PURE__ */ w.jsxs(kr, {
              className: "d-flex justify-content-between",
              children: [o, " ", i],
            })
          : null,
        /* @__PURE__ */ w.jsx(Mt, {
          children: /* @__PURE__ */ w.jsx(oi, {
            showLineNumbers: r,
            language: t,
            style: ts[n],
            children: e,
          }),
        }),
      ],
    }),
  rs = ns,
  os = ({ pos: e, onAddComment: t }) =>
    _n(
      /* @__PURE__ */ w.jsx(Fa, {
        children:
          e &&
          /* @__PURE__ */ w.jsx(Ft, {
            onClick: t,
            id: `${kt}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: fi + 5,
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
            children: /* @__PURE__ */ w.jsx(no, {}),
          }),
      }),
      e.element.parentElement,
    ),
  is = os,
  as = () => {
    const {
        state: { isRightPanelOpen: e },
      } = va(),
      t = Oe(),
      o = () => {
        t(Pn(!e));
      };
    return /* @__PURE__ */ w.jsx(Ft, {
      onClick: o,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  ss = as,
  nt = {
    get: async (e, t, o) => ({}),
    post: async (e, t, o) => ({}),
  },
  us = (e) => nt.get(`dbt/dbt_docs_share/${e}`),
  cs = (e, t, o) =>
    nt.post(`dbt/dbt_docs_share/${e}/conversation_group`, {
      ...t,
      telemetry: {
        eventName: "dbtCollaboration:create",
        properties: { source: o },
      },
    }),
  ls = (e, t, o, n) =>
    nt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, {
      ...o,
      telemetry: {
        eventName: "dbtCollaboration:reply",
        properties: { source: n },
      },
    }),
  ds = (e) => nt.get(`dbt/dbt_docs_share/${e}/conversations`),
  fs = (e) => nt.get("users/chat", { company: e }),
  ps = (e, t, o) =>
    nt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
      telemetry: {
        eventName: "dbtCollaboration:resolve",
        properties: { source: o },
      },
    }),
  hs = () => {
    const e = ue((u) => u.shareId),
      [t, o] = ge(null),
      [n, r] = ge(!1),
      i = Oe();
    Ae(() => {
      t != null &&
        t.manifest_presigned_url &&
        fetch(t.manifest_presigned_url)
          .then((u) => u.json())
          .then((u) => {
            i(pa(u));
          })
          .catch((u) =>
            console.error(
              "error loading manifest",
              u,
              t.manifest_presigned_url,
            ),
          );
    }, [i, t == null ? void 0 : t.manifest_presigned_url]);
    const a = Me(async () => {
      if (!e) return;
      r(!0);
      const u = await us(e);
      if (u) {
        o(u);
        const c = document.getElementById("collapse-sidebar");
        c == null || c.click();
      }
      r(!1);
    }, [e]);
    return (
      Ae(() => {
        !e || t || n || a();
      }, [e, t, a, n]),
      { shareDetails: t, loading: n }
    );
  },
  gs = () => {
    const e = ue((s) =>
        s.selectedConversationId
          ? s.conversations[s.selectedConversationId]
          : null,
      ),
      t = ue((s) => s.docsAppRendered),
      o = ue((s) => s.newConversation),
      n = Oe(),
      [r, i] = ge(null),
      [a, u] = ge(null);
    Ae(() => {
      o && (i(null), u(null));
    }, [o]);
    const c = Me(() => {
      console.log("resetHighlights"), r && hi(r), u(null), i(null);
    }, [r]);
    return (
      Ae(() => {
        !e ||
          !t ||
          (e.meta.resource_type &&
            e.meta.uniqueId &&
            (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`));
      }, [e, t, n]),
      {
        getHighlightedSelectionData: () => r,
        pos: a,
        onSelectionEnd: (s) => {
          const l = s.target,
            f = vi(l),
            { end: g, start: p } = s.detail.selectionRange,
            m = document.getSelection();
          if (!m || !m.rangeCount) return c(), null;
          const b = m.getRangeAt(0).toString(),
            _ = l == null ? void 0 : l.innerText;
          if (!b || !_) return;
          const { end: S, start: O, x: E, y: F } = mi(f, l, b, g, p);
          console.log("selection range", S, O, E, F);
          const j = {
            meta: {
              filePath: "",
              field: f,
              highlight: b,
              range: {
                end: { line: S, character: 0 },
                start: { line: O, character: 0 },
              },
            },
          };
          n(Nn()),
            u({
              x: E,
              y: F,
              element: l,
            }),
            document.body.addEventListener("click", c, { once: !0 }),
            i(j);
        },
      }
    );
  },
  vs = ({ conversationGroup: e }) => {
    const t = ue((u) => u.selectedConversationId),
      o = Oe(),
      n = Re(null),
      r = Pe(() => gi(e.meta), [e.meta]),
      i = () => {
        o(xn(e.conversation_group_id));
      },
      a = Pe(() => {
        if (!r) return;
        if (e.meta.field === "description")
          return { top: 0, bottom: r.offsetHeight };
        let u = 0,
          c = 0;
        for (let d = e.meta.range.start.line; d <= e.meta.range.end.line; d++) {
          const s = r.querySelector(
            `.line-numbers-rows > span:nth-child(${d + 1})`,
          );
          s &&
            (d === e.meta.range.start.line && (u = s.offsetTop + 15),
            d === e.meta.range.end.line && (c = s.offsetTop + s.offsetHeight));
        }
        return { top: u, bottom: c };
      }, [r, e.meta.field, e.meta.range.start.line, e.meta.range.end.line]);
    return (
      Ae(() => {
        var u;
        t === e.conversation_group_id &&
          ((u = n.current) == null ||
            u.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [e.conversation_group_id, t]),
      !a || !(r != null && r.parentElement)
        ? null
        : _n(
            /* @__PURE__ */ w.jsx("div", {
              ref: n,
              className: `altimate-highlighter ${
                t === e.conversation_group_id ? "active" : ""
              }`,
              style: { top: a.top, height: a.bottom - a.top },
              onClick: i,
              children: /* @__PURE__ */ w.jsx(ja, {}),
            }),
            r.parentElement,
          )
    );
  },
  ms = vs,
  ys = () => {
    const e = ue((r) => Object.values(r.conversations || {})),
      t = ue((r) => r.codeblockLoaded),
      o = ue((r) => r.currentPage),
      n =
        e == null
          ? void 0
          : e.filter(
              (r) =>
                r.meta.resource_type === o.resourceType &&
                r.meta.uniqueId === o.name,
            );
    return !(n != null && n.length) || !t
      ? null
      : /* @__PURE__ */ w.jsx(w.Fragment, {
          children: n.map((r) =>
            /* @__PURE__ */ w.jsx(
              ms,
              {
                conversationGroup: r,
              },
              r.conversation_group_id,
            ),
          ),
        });
  },
  Es = ys,
  bs = "_dbtDocs_14zop_9",
  _s = "_hotspotButton_14zop_46",
  Ss = "_pulse_14zop_1",
  Cs = "_conversationRightPanelCloseButton_14zop_62",
  Ts = "_conversationRightPanel_14zop_62",
  As = "_newConversationForm_14zop_94",
  Os = "_highlightText_14zop_108",
  Ds = "_conversationInputForm_14zop_130",
  Rs = "_conversationGroup_14zop_156",
  ws = "_replyForm_14zop_189",
  Is = "_resolveButton_14zop_237",
  Fe = {
    dbtDocs: bs,
    hotspotButton: _s,
    pulse: Ss,
    conversationRightPanelCloseButton: Cs,
    conversationRightPanel: Ts,
    newConversationForm: As,
    highlightText: Os,
    conversationInputForm: Ds,
    conversationGroup: Rs,
    replyForm: ws,
    resolveButton: Is,
  },
  xs = "_profileImage_11vaf_1",
  Ps = {
    profileImage: xs,
  },
  Ns = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ w.jsx("div", {
      className: Ps.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  oo = Ns;
function Fs(e) {
  if (Array.isArray(e)) {
    for (var t = 0, o = new Array(e.length); t < e.length; t++) o[t] = e[t];
    return o;
  }
}
function js(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function Ms() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function xt(e) {
  return Fs(e) || js(e) || Ms();
}
function Te() {
  return (
    (Te =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var o = arguments[t];
          for (var n in o)
            Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
        }
        return e;
      }),
    Te.apply(this, arguments)
  );
}
function $s(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function gr(e, t) {
  for (var o = 0; o < t.length; o++) {
    var n = t[o];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function ks(e, t, o) {
  return t && gr(e.prototype, t), o && gr(e, o), e;
}
function te(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function vn(e, t) {
  return (
    (vn =
      Object.setPrototypeOf ||
      function (n, r) {
        return (n.__proto__ = r), n;
      }),
    vn(e, t)
  );
}
function Ls(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && vn(e, t);
}
function Ze(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (Ze = function (o) {
          return typeof o;
        })
      : (Ze = function (o) {
          return o &&
            typeof Symbol == "function" &&
            o.constructor === Symbol &&
            o !== Symbol.prototype
            ? "symbol"
            : typeof o;
        }),
    Ze(e)
  );
}
function Tt(e) {
  return (
    typeof Symbol == "function" && Ze(Symbol.iterator) === "symbol"
      ? (Tt = function (o) {
          return Ze(o);
        })
      : (Tt = function (o) {
          return o &&
            typeof Symbol == "function" &&
            o.constructor === Symbol &&
            o !== Symbol.prototype
            ? "symbol"
            : Ze(o);
        }),
    Tt(e)
  );
}
function Bs(e, t) {
  return t && (Tt(t) === "object" || typeof t == "function") ? t : te(e);
}
function Pt(e) {
  return (
    (Pt = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        }),
    Pt(e)
  );
}
function ee(e, t, o) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = o),
    e
  );
}
var Hs = function (e, t, o, n, r, i, a, u) {
    if (process.env.NODE_ENV !== "production" && t === void 0)
      throw new Error("invariant requires an error message argument");
    if (!e) {
      var c;
      if (t === void 0)
        c = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var d = [o, n, r, i, a, u],
          s = 0;
        (c = new Error(
          t.replace(/%s/g, function () {
            return d[s++];
          }),
        )),
          (c.name = "Invariant Violation");
      }
      throw ((c.framesToPop = 1), c);
    }
  },
  zs = Hs;
const tt = /* @__PURE__ */ $t(zs);
function Us(e) {
  if (Array.isArray(e)) return e;
}
function Vs(e, t) {
  var o = [],
    n = !0,
    r = !1,
    i = void 0;
  try {
    for (
      var a = e[Symbol.iterator](), u;
      !(n = (u = a.next()).done) && (o.push(u.value), !(t && o.length === t));
      n = !0
    );
  } catch (c) {
    (r = !0), (i = c);
  } finally {
    try {
      !n && a.return != null && a.return();
    } finally {
      if (r) throw i;
    }
  }
  return o;
}
function Ws() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function Nt(e, t) {
  return Us(e) || Vs(e, t) || Ws();
}
function qs(e, t) {
  if (e == null) return {};
  var o = {},
    n = Object.keys(e),
    r,
    i;
  for (i = 0; i < n.length; i++)
    (r = n[i]), !(t.indexOf(r) >= 0) && (o[r] = e[r]);
  return o;
}
function Ys(e, t) {
  if (e == null) return {};
  var o = qs(e, t),
    n,
    r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++)
      (n = i[r]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (o[n] = e[n]);
  }
  return o;
}
function ft(e) {
  "@babel/helpers - typeof";
  return (
    (ft =
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
    ft(e)
  );
}
function Ks(e, t) {
  if (ft(e) != "object" || !e) return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var n = o.call(e, t || "default");
    if (ft(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Gs(e) {
  var t = Ks(e, "string");
  return ft(t) == "symbol" ? t : t + "";
}
function pt(e, t, o) {
  return (
    (t = Gs(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = o),
    e
  );
}
function mn(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
  return n;
}
function Xs(e) {
  if (Array.isArray(e)) return mn(e);
}
function Zs(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function Js(e, t) {
  if (e) {
    if (typeof e == "string") return mn(e, t);
    var o = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (o === "Object" && e.constructor && (o = e.constructor.name),
      o === "Map" || o === "Set")
    )
      return Array.from(e);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return mn(e, t);
  }
}
function Qs() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xe(e) {
  return Xs(e) || Zs(e) || Js(e) || Qs();
}
var rt = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  io = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function ao(e, t) {
  var o = Object.assign({}, e);
  return (
    At(e) &&
      At(t) &&
      rt(t).forEach(function (n) {
        At(t[n])
          ? n in e
            ? (o[n] = ao(e[n], t[n]))
            : Object.assign(o, pt({}, n, t[n]))
          : Object.assign(o, pt({}, n, t[n]));
      }),
    o
  );
}
var yn = function (t) {
    for (
      var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1;
      r < o;
      r++
    )
      n[r - 1] = arguments[r];
    return n.reduce(function (i, a) {
      return ao(i, a);
    }, t);
  },
  eu = function (t, o) {
    var n = Object.assign({}, t);
    if (o) for (var r = 0; r < o.length; r++) delete n[o[r]];
    return n;
  },
  At = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  tu = function (t) {
    return (t || []).filter(Boolean);
  },
  jn = function (t) {
    return t[0] === "&";
  },
  nu = function (t) {
    return !jn(t);
  },
  vr = function (t) {
    return t.replace(/-(\w)/g, function (o, n) {
      return n.toUpperCase();
    });
  },
  ru = function (t) {
    for (
      var o =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        n = rt(t),
        r = {},
        i = 0,
        a = n.length;
      i < a;
      i += 1
    ) {
      var u = n[i],
        c =
          Object.prototype.toString.call(t[u]) !== "[object Object]" || // style defs
          u[0] === ":" || // pseudo selectors
          u[0] === "@" || // @media / @keyframes / @supports / @font-face
          o.indexOf(u) >= 0;
      c && (r[u] = t[u]);
    }
    return r;
  },
  so = function (t, o) {
    for (
      var n = o.map(vr), r = rt(t), i = {}, a = 0, u = r.length;
      a < u;
      a += 1
    ) {
      var c = r[a];
      (o.indexOf(c) >= 0 || n.indexOf(vr(c)) >= 0) && (i[c] = t[c]);
    }
    return i;
  },
  ou = function e(t, o) {
    for (
      var n = yn.apply(void 0, [{}, eu(t, o)].concat(xe(io(so(t, o))))),
        r = rt(n).filter(jn),
        i = 0,
        a = r.length;
      i < a;
      i += 1
    ) {
      var u = r[i],
        c = e(n[u], o);
      o.indexOf(u) >= 0 ? (delete n[u], (n = yn({}, n, c))) : (n[u] = c);
    }
    return n;
  };
function mr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      o.push.apply(o, n);
  }
  return o;
}
function yr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? mr(Object(o), !0).forEach(function (n) {
          pt(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
        : mr(Object(o)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
          });
  }
  return e;
}
var iu = ["animationName"],
  au = function (t) {
    var o = t.style,
      n = t.className;
    return yr(
      yr(
        {},
        o
          ? {
              style: ru(o, iu),
            }
          : {},
      ),
      n
        ? {
            className: n,
          }
        : {},
    );
  };
const uo = au;
var co = /* @__PURE__ */ Ue(uo);
co.Provider;
var lo = function (t) {
    if (t) {
      if (typeof t == "string") return [t];
      if (!Array.isArray(t)) {
        var o = t;
        return rt(t).reduce(function (n, r) {
          return n.concat(o[r] ? [r] : []);
        }, []);
      }
    } else return [];
    return t;
  },
  su = {},
  uu = function (t) {
    return function (o, n) {
      var r = n || su;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var i;
      t.memoize.has(r)
        ? (i = t.memoize.get(r))
        : ((i = {}), t.memoize.set(r, i));
      var a = lo(o).join(" ");
      return a in i ? i[a] : (i[a] = t(o || [], n));
    };
  };
function Er(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      o.push.apply(o, n);
  }
  return o;
}
function Ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Er(Object(o), !0).forEach(function (n) {
          pt(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
        : Er(Object(o)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
          });
  }
  return e;
}
var cu = function (t) {
    var o = t && rt(t)[0];
    return o && o.split("__")[0].split("--")[0];
  },
  lu = function (t, o, n) {
    if (t) {
      var r = t.split(" ")[0],
        i = [].concat(
          xe(
            o.length === 0
              ? n.map(function (a) {
                  return "".concat(r, "--").concat(a.substring(1));
                })
              : [],
          ),
          xe(
            o.map(function (a) {
              return "".concat(r, "__").concat(a);
            }),
          ),
        );
      return o.length === 0 ? [t].concat(xe(i)) : i;
    }
  };
function fo(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : uo,
    i = o || cu(n) || (t == null ? void 0 : t.className),
    a =
      typeof t == "function"
        ? t
        : uu(function (l, f) {
            var g = lo(l);
            tt(
              Array.isArray(g),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              tt(
                !f || At(f),
                "Optional second parameter must be a plain object.",
              );
            var p = g.filter(jn),
              m = g.filter(nu),
              v =
                m.length > 0
                  ? function (S) {
                      return io(so(S, m));
                    }
                  : function (S) {
                      return [S];
                    },
              b = function () {
                var O =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return v(ou(O, p));
              },
              _ = lu(i, m, p);
            return fo(
              Ke(
                Ke(
                  Ke(
                    {},
                    (t || f) && {
                      style: yn.apply(void 0, [{}].concat(xe(b(f)), xe(b(t)))),
                    },
                  ),
                  _ && {
                    className: _.join(" "),
                  },
                ),
                n && {
                  classNames: n,
                },
              ),
              r,
            );
          }),
    u = Ke(
      {},
      typeof t == "function"
        ? t
        : {
            style: t,
          },
    ),
    c = xe(
      new Set(
        [].concat(
          xe(u.className ? u.className.split(" ") : []),
          xe(i ? i.split(" ") : []),
        ),
      ),
    ),
    d = n
      ? tu(
          c.map(function (l) {
            return n[l];
          }),
        )
      : c,
    s = r(
      Ke(
        Ke({}, u),
        d.length > 0
          ? {
              className: d.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(a, s), a;
}
function br(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      o.push.apply(o, n);
  }
  return o;
}
function st(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? br(Object(o), !0).forEach(function (n) {
          pt(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
        : br(Object(o)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
          });
  }
  return e;
}
var du = function () {
    for (var t = arguments.length, o = new Array(t), n = 0; n < t; n++)
      o[n] = arguments[n];
    return o.reduce(function (r, i) {
      return st(
        st(st({}, r), typeof i == "function" ? i : {}),
        {},
        {
          style: st(st({}, r.style), typeof i == "function" ? i.style : i),
        },
      );
    }, {});
  },
  Mn = function (t, o, n) {
    var r = o.style,
      i = o.className,
      a = o.classNames,
      u = Ve(co),
      c = Pe(
        function () {
          return fo(
            {
              style: r,
              className: i,
              classNames: a,
            },
            u,
          );
        },
        [r, i, a, u],
      );
    return c(n, t);
  },
  En = { exports: {} },
  _t = { exports: {} },
  ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _r;
function fu() {
  if (_r) return ae;
  _r = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    t = e ? Symbol.for("react.element") : 60103,
    o = e ? Symbol.for("react.portal") : 60106,
    n = e ? Symbol.for("react.fragment") : 60107,
    r = e ? Symbol.for("react.strict_mode") : 60108,
    i = e ? Symbol.for("react.profiler") : 60114,
    a = e ? Symbol.for("react.provider") : 60109,
    u = e ? Symbol.for("react.context") : 60110,
    c = e ? Symbol.for("react.async_mode") : 60111,
    d = e ? Symbol.for("react.concurrent_mode") : 60111,
    s = e ? Symbol.for("react.forward_ref") : 60112,
    l = e ? Symbol.for("react.suspense") : 60113,
    f = e ? Symbol.for("react.suspense_list") : 60120,
    g = e ? Symbol.for("react.memo") : 60115,
    p = e ? Symbol.for("react.lazy") : 60116,
    m = e ? Symbol.for("react.block") : 60121,
    v = e ? Symbol.for("react.fundamental") : 60117,
    b = e ? Symbol.for("react.responder") : 60118,
    _ = e ? Symbol.for("react.scope") : 60119;
  function S(E) {
    if (typeof E == "object" && E !== null) {
      var F = E.$$typeof;
      switch (F) {
        case t:
          switch (((E = E.type), E)) {
            case c:
            case d:
            case n:
            case i:
            case r:
            case l:
              return E;
            default:
              switch (((E = E && E.$$typeof), E)) {
                case u:
                case s:
                case p:
                case g:
                case a:
                  return E;
                default:
                  return F;
              }
          }
        case o:
          return F;
      }
    }
  }
  function O(E) {
    return S(E) === d;
  }
  return (
    (ae.AsyncMode = c),
    (ae.ConcurrentMode = d),
    (ae.ContextConsumer = u),
    (ae.ContextProvider = a),
    (ae.Element = t),
    (ae.ForwardRef = s),
    (ae.Fragment = n),
    (ae.Lazy = p),
    (ae.Memo = g),
    (ae.Portal = o),
    (ae.Profiler = i),
    (ae.StrictMode = r),
    (ae.Suspense = l),
    (ae.isAsyncMode = function (E) {
      return O(E) || S(E) === c;
    }),
    (ae.isConcurrentMode = O),
    (ae.isContextConsumer = function (E) {
      return S(E) === u;
    }),
    (ae.isContextProvider = function (E) {
      return S(E) === a;
    }),
    (ae.isElement = function (E) {
      return typeof E == "object" && E !== null && E.$$typeof === t;
    }),
    (ae.isForwardRef = function (E) {
      return S(E) === s;
    }),
    (ae.isFragment = function (E) {
      return S(E) === n;
    }),
    (ae.isLazy = function (E) {
      return S(E) === p;
    }),
    (ae.isMemo = function (E) {
      return S(E) === g;
    }),
    (ae.isPortal = function (E) {
      return S(E) === o;
    }),
    (ae.isProfiler = function (E) {
      return S(E) === i;
    }),
    (ae.isStrictMode = function (E) {
      return S(E) === r;
    }),
    (ae.isSuspense = function (E) {
      return S(E) === l;
    }),
    (ae.isValidElementType = function (E) {
      return (
        typeof E == "string" ||
        typeof E == "function" ||
        E === n ||
        E === d ||
        E === i ||
        E === r ||
        E === l ||
        E === f ||
        (typeof E == "object" &&
          E !== null &&
          (E.$$typeof === p ||
            E.$$typeof === g ||
            E.$$typeof === a ||
            E.$$typeof === u ||
            E.$$typeof === s ||
            E.$$typeof === v ||
            E.$$typeof === b ||
            E.$$typeof === _ ||
            E.$$typeof === m))
      );
    }),
    (ae.typeOf = S),
    ae
  );
}
var se = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sr;
function pu() {
  return (
    Sr ||
      ((Sr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = typeof Symbol == "function" && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            o = e ? Symbol.for("react.portal") : 60106,
            n = e ? Symbol.for("react.fragment") : 60107,
            r = e ? Symbol.for("react.strict_mode") : 60108,
            i = e ? Symbol.for("react.profiler") : 60114,
            a = e ? Symbol.for("react.provider") : 60109,
            u = e ? Symbol.for("react.context") : 60110,
            c = e ? Symbol.for("react.async_mode") : 60111,
            d = e ? Symbol.for("react.concurrent_mode") : 60111,
            s = e ? Symbol.for("react.forward_ref") : 60112,
            l = e ? Symbol.for("react.suspense") : 60113,
            f = e ? Symbol.for("react.suspense_list") : 60120,
            g = e ? Symbol.for("react.memo") : 60115,
            p = e ? Symbol.for("react.lazy") : 60116,
            m = e ? Symbol.for("react.block") : 60121,
            v = e ? Symbol.for("react.fundamental") : 60117,
            b = e ? Symbol.for("react.responder") : 60118,
            _ = e ? Symbol.for("react.scope") : 60119;
          function S($) {
            return (
              typeof $ == "string" ||
              typeof $ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              $ === n ||
              $ === d ||
              $ === i ||
              $ === r ||
              $ === l ||
              $ === f ||
              (typeof $ == "object" &&
                $ !== null &&
                ($.$$typeof === p ||
                  $.$$typeof === g ||
                  $.$$typeof === a ||
                  $.$$typeof === u ||
                  $.$$typeof === s ||
                  $.$$typeof === v ||
                  $.$$typeof === b ||
                  $.$$typeof === _ ||
                  $.$$typeof === m))
            );
          }
          function O($) {
            if (typeof $ == "object" && $ !== null) {
              var he = $.$$typeof;
              switch (he) {
                case t:
                  var We = $.type;
                  switch (We) {
                    case c:
                    case d:
                    case n:
                    case i:
                    case r:
                    case l:
                      return We;
                    default:
                      var ke = We && We.$$typeof;
                      switch (ke) {
                        case u:
                        case s:
                        case p:
                        case g:
                        case a:
                          return ke;
                        default:
                          return he;
                      }
                  }
                case o:
                  return he;
              }
            }
          }
          var E = c,
            F = d,
            j = u,
            y = a,
            H = t,
            A = s,
            k = n,
            Z = p,
            G = g,
            P = o,
            I = i,
            T = r,
            x = l,
            R = !1;
          function L($) {
            return (
              R ||
                ((R = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              C($) || O($) === c
            );
          }
          function C($) {
            return O($) === d;
          }
          function D($) {
            return O($) === u;
          }
          function z($) {
            return O($) === a;
          }
          function U($) {
            return typeof $ == "object" && $ !== null && $.$$typeof === t;
          }
          function V($) {
            return O($) === s;
          }
          function K($) {
            return O($) === n;
          }
          function q($) {
            return O($) === p;
          }
          function Y($) {
            return O($) === g;
          }
          function J($) {
            return O($) === o;
          }
          function Q($) {
            return O($) === i;
          }
          function W($) {
            return O($) === r;
          }
          function le($) {
            return O($) === l;
          }
          (se.AsyncMode = E),
            (se.ConcurrentMode = F),
            (se.ContextConsumer = j),
            (se.ContextProvider = y),
            (se.Element = H),
            (se.ForwardRef = A),
            (se.Fragment = k),
            (se.Lazy = Z),
            (se.Memo = G),
            (se.Portal = P),
            (se.Profiler = I),
            (se.StrictMode = T),
            (se.Suspense = x),
            (se.isAsyncMode = L),
            (se.isConcurrentMode = C),
            (se.isContextConsumer = D),
            (se.isContextProvider = z),
            (se.isElement = U),
            (se.isForwardRef = V),
            (se.isFragment = K),
            (se.isLazy = q),
            (se.isMemo = Y),
            (se.isPortal = J),
            (se.isProfiler = Q),
            (se.isStrictMode = W),
            (se.isSuspense = le),
            (se.isValidElementType = S),
            (se.typeOf = O);
        })()),
    se
  );
}
var Cr;
function po() {
  return (
    Cr ||
      ((Cr = 1),
      process.env.NODE_ENV === "production"
        ? (_t.exports = fu())
        : (_t.exports = pu())),
    _t.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var tn, Tr;
function hu() {
  if (Tr) return tn;
  Tr = 1;
  var e = Object.getOwnPropertySymbols,
    t = Object.prototype.hasOwnProperty,
    o = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined",
      );
    return Object(i);
  }
  function r() {
    try {
      if (!Object.assign) return !1;
      var i = new String("abc");
      if (((i[5] = "de"), Object.getOwnPropertyNames(i)[0] === "5")) return !1;
      for (var a = {}, u = 0; u < 10; u++) a["_" + String.fromCharCode(u)] = u;
      var c = Object.getOwnPropertyNames(a).map(function (s) {
        return a[s];
      });
      if (c.join("") !== "0123456789") return !1;
      var d = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function (s) {
          d[s] = s;
        }),
        Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst"
      );
    } catch {
      return !1;
    }
  }
  return (
    (tn = r()
      ? Object.assign
      : function (i, a) {
          for (var u, c = n(i), d, s = 1; s < arguments.length; s++) {
            u = Object(arguments[s]);
            for (var l in u) t.call(u, l) && (c[l] = u[l]);
            if (e) {
              d = e(u);
              for (var f = 0; f < d.length; f++)
                o.call(u, d[f]) && (c[d[f]] = u[d[f]]);
            }
          }
          return c;
        }),
    tn
  );
}
var nn, Ar;
function $n() {
  if (Ar) return nn;
  Ar = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (nn = e), nn;
}
var rn, Or;
function ho() {
  return (
    Or ||
      ((Or = 1), (rn = Function.call.bind(Object.prototype.hasOwnProperty))),
    rn
  );
}
var on, Dr;
function gu() {
  if (Dr) return on;
  Dr = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = $n(),
      o = {},
      n = ho();
    e = function (i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {}
    };
  }
  function r(i, a, u, c, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var s in i)
        if (n(i, s)) {
          var l;
          try {
            if (typeof i[s] != "function") {
              var f = Error(
                (c || "React class") +
                  ": " +
                  u +
                  " type `" +
                  s +
                  "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                  typeof i[s] +
                  "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
              );
              throw ((f.name = "Invariant Violation"), f);
            }
            l = i[s](a, s, c, u, null, t);
          } catch (p) {
            l = p;
          }
          if (
            (l &&
              !(l instanceof Error) &&
              e(
                (c || "React class") +
                  ": type specification of " +
                  u +
                  " `" +
                  s +
                  "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
                  typeof l +
                  ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
              ),
            l instanceof Error && !(l.message in o))
          ) {
            o[l.message] = !0;
            var g = d ? d() : "";
            e("Failed " + u + " type: " + l.message + (g ?? ""));
          }
        }
    }
  }
  return (
    (r.resetWarningCache = function () {
      process.env.NODE_ENV !== "production" && (o = {});
    }),
    (on = r),
    on
  );
}
var an, Rr;
function vu() {
  if (Rr) return an;
  Rr = 1;
  var e = po(),
    t = hu(),
    o = $n(),
    n = ho(),
    r = gu(),
    i = function () {};
  process.env.NODE_ENV !== "production" &&
    (i = function (u) {
      var c = "Warning: " + u;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {}
    });
  function a() {
    return null;
  }
  return (
    (an = function (u, c) {
      var d = typeof Symbol == "function" && Symbol.iterator,
        s = "@@iterator";
      function l(C) {
        var D = C && ((d && C[d]) || C[s]);
        if (typeof D == "function") return D;
      }
      var f = "<<anonymous>>",
        g = {
          array: b("array"),
          bigint: b("bigint"),
          bool: b("boolean"),
          func: b("function"),
          number: b("number"),
          object: b("object"),
          string: b("string"),
          symbol: b("symbol"),
          any: _(),
          arrayOf: S,
          element: O(),
          elementType: E(),
          instanceOf: F,
          node: A(),
          objectOf: y,
          oneOf: j,
          oneOfType: H,
          shape: Z,
          exact: G,
        };
      function p(C, D) {
        return C === D ? C !== 0 || 1 / C === 1 / D : C !== C && D !== D;
      }
      function m(C, D) {
        (this.message = C),
          (this.data = D && typeof D == "object" ? D : {}),
          (this.stack = "");
      }
      m.prototype = Error.prototype;
      function v(C) {
        if (process.env.NODE_ENV !== "production")
          var D = {},
            z = 0;
        function U(K, q, Y, J, Q, W, le) {
          if (((J = J || f), (W = W || Y), le !== o)) {
            if (c) {
              var $ = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types",
              );
              throw (($.name = "Invariant Violation"), $);
            } else if (
              process.env.NODE_ENV !== "production" &&
              typeof console < "u"
            ) {
              var he = J + ":" + Y;
              !D[he] && // Avoid spamming the console because they are often not actionable except for lib authors
                z < 3 &&
                (i(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    W +
                    "` prop on `" +
                    J +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (D[he] = !0),
                z++);
            }
          }
          return q[Y] == null
            ? K
              ? q[Y] === null
                ? new m(
                    "The " +
                      Q +
                      " `" +
                      W +
                      "` is marked as required " +
                      ("in `" + J + "`, but its value is `null`."),
                  )
                : new m(
                    "The " +
                      Q +
                      " `" +
                      W +
                      "` is marked as required in " +
                      ("`" + J + "`, but its value is `undefined`."),
                  )
              : null
            : C(q, Y, J, Q, W);
        }
        var V = U.bind(null, !1);
        return (V.isRequired = U.bind(null, !0)), V;
      }
      function b(C) {
        function D(z, U, V, K, q, Y) {
          var J = z[U],
            Q = T(J);
          if (Q !== C) {
            var W = x(J);
            return new m(
              "Invalid " +
                K +
                " `" +
                q +
                "` of type " +
                ("`" + W + "` supplied to `" + V + "`, expected ") +
                ("`" + C + "`."),
              { expectedType: C },
            );
          }
          return null;
        }
        return v(D);
      }
      function _() {
        return v(a);
      }
      function S(C) {
        function D(z, U, V, K, q) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                q +
                "` of component `" +
                V +
                "` has invalid PropType notation inside arrayOf.",
            );
          var Y = z[U];
          if (!Array.isArray(Y)) {
            var J = T(Y);
            return new m(
              "Invalid " +
                K +
                " `" +
                q +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected an array."),
            );
          }
          for (var Q = 0; Q < Y.length; Q++) {
            var W = C(Y, Q, V, K, q + "[" + Q + "]", o);
            if (W instanceof Error) return W;
          }
          return null;
        }
        return v(D);
      }
      function O() {
        function C(D, z, U, V, K) {
          var q = D[z];
          if (!u(q)) {
            var Y = T(q);
            return new m(
              "Invalid " +
                V +
                " `" +
                K +
                "` of type " +
                ("`" +
                  Y +
                  "` supplied to `" +
                  U +
                  "`, expected a single ReactElement."),
            );
          }
          return null;
        }
        return v(C);
      }
      function E() {
        function C(D, z, U, V, K) {
          var q = D[z];
          if (!e.isValidElementType(q)) {
            var Y = T(q);
            return new m(
              "Invalid " +
                V +
                " `" +
                K +
                "` of type " +
                ("`" +
                  Y +
                  "` supplied to `" +
                  U +
                  "`, expected a single ReactElement type."),
            );
          }
          return null;
        }
        return v(C);
      }
      function F(C) {
        function D(z, U, V, K, q) {
          if (!(z[U] instanceof C)) {
            var Y = C.name || f,
              J = L(z[U]);
            return new m(
              "Invalid " +
                K +
                " `" +
                q +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected ") +
                ("instance of `" + Y + "`."),
            );
          }
          return null;
        }
        return v(D);
      }
      function j(C) {
        if (!Array.isArray(C))
          return (
            process.env.NODE_ENV !== "production" &&
              (arguments.length > 1
                ? i(
                    "Invalid arguments supplied to oneOf, expected an array, got " +
                      arguments.length +
                      " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).",
                  )
                : i("Invalid argument supplied to oneOf, expected an array.")),
            a
          );
        function D(z, U, V, K, q) {
          for (var Y = z[U], J = 0; J < C.length; J++)
            if (p(Y, C[J])) return null;
          var Q = JSON.stringify(C, function (le, $) {
            var he = x($);
            return he === "symbol" ? String($) : $;
          });
          return new m(
            "Invalid " +
              K +
              " `" +
              q +
              "` of value `" +
              String(Y) +
              "` " +
              ("supplied to `" + V + "`, expected one of " + Q + "."),
          );
        }
        return v(D);
      }
      function y(C) {
        function D(z, U, V, K, q) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                q +
                "` of component `" +
                V +
                "` has invalid PropType notation inside objectOf.",
            );
          var Y = z[U],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                K +
                " `" +
                q +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected an object."),
            );
          for (var Q in Y)
            if (n(Y, Q)) {
              var W = C(Y, Q, V, K, q + "." + Q, o);
              if (W instanceof Error) return W;
            }
          return null;
        }
        return v(D);
      }
      function H(C) {
        if (!Array.isArray(C))
          return (
            process.env.NODE_ENV !== "production" &&
              i(
                "Invalid argument supplied to oneOfType, expected an instance of array.",
              ),
            a
          );
        for (var D = 0; D < C.length; D++) {
          var z = C[D];
          if (typeof z != "function")
            return (
              i(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                  R(z) +
                  " at index " +
                  D +
                  ".",
              ),
              a
            );
        }
        function U(V, K, q, Y, J) {
          for (var Q = [], W = 0; W < C.length; W++) {
            var le = C[W],
              $ = le(V, K, q, Y, J, o);
            if ($ == null) return null;
            $.data && n($.data, "expectedType") && Q.push($.data.expectedType);
          }
          var he =
            Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
          return new m(
            "Invalid " +
              Y +
              " `" +
              J +
              "` supplied to " +
              ("`" + q + "`" + he + "."),
          );
        }
        return v(U);
      }
      function A() {
        function C(D, z, U, V, K) {
          return P(D[z])
            ? null
            : new m(
                "Invalid " +
                  V +
                  " `" +
                  K +
                  "` supplied to " +
                  ("`" + U + "`, expected a ReactNode."),
              );
        }
        return v(C);
      }
      function k(C, D, z, U, V) {
        return new m(
          (C || "React class") +
            ": " +
            D +
            " type `" +
            z +
            "." +
            U +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            V +
            "`.",
        );
      }
      function Z(C) {
        function D(z, U, V, K, q) {
          var Y = z[U],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                K +
                " `" +
                q +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          for (var Q in C) {
            var W = C[Q];
            if (typeof W != "function") return k(V, K, q, Q, x(W));
            var le = W(Y, Q, V, K, q + "." + Q, o);
            if (le) return le;
          }
          return null;
        }
        return v(D);
      }
      function G(C) {
        function D(z, U, V, K, q) {
          var Y = z[U],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                K +
                " `" +
                q +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          var Q = t({}, z[U], C);
          for (var W in Q) {
            var le = C[W];
            if (n(C, W) && typeof le != "function") return k(V, K, q, W, x(le));
            if (!le)
              return new m(
                "Invalid " +
                  K +
                  " `" +
                  q +
                  "` key `" +
                  W +
                  "` supplied to `" +
                  V +
                  "`.\nBad object: " +
                  JSON.stringify(z[U], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(C), null, "  "),
              );
            var $ = le(Y, W, V, K, q + "." + W, o);
            if ($) return $;
          }
          return null;
        }
        return v(D);
      }
      function P(C) {
        switch (typeof C) {
          case "number":
          case "string":
          case "undefined":
            return !0;
          case "boolean":
            return !C;
          case "object":
            if (Array.isArray(C)) return C.every(P);
            if (C === null || u(C)) return !0;
            var D = l(C);
            if (D) {
              var z = D.call(C),
                U;
              if (D !== C.entries) {
                for (; !(U = z.next()).done; ) if (!P(U.value)) return !1;
              } else
                for (; !(U = z.next()).done; ) {
                  var V = U.value;
                  if (V && !P(V[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function I(C, D) {
        return C === "symbol"
          ? !0
          : D
            ? D["@@toStringTag"] === "Symbol" ||
              (typeof Symbol == "function" && D instanceof Symbol)
            : !1;
      }
      function T(C) {
        var D = typeof C;
        return Array.isArray(C)
          ? "array"
          : C instanceof RegExp
            ? "object"
            : I(D, C)
              ? "symbol"
              : D;
      }
      function x(C) {
        if (typeof C > "u" || C === null) return "" + C;
        var D = T(C);
        if (D === "object") {
          if (C instanceof Date) return "date";
          if (C instanceof RegExp) return "regexp";
        }
        return D;
      }
      function R(C) {
        var D = x(C);
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
      function L(C) {
        return !C.constructor || !C.constructor.name ? f : C.constructor.name;
      }
      return (
        (g.checkPropTypes = r),
        (g.resetWarningCache = r.resetWarningCache),
        (g.PropTypes = g),
        g
      );
    }),
    an
  );
}
var sn, wr;
function mu() {
  if (wr) return sn;
  wr = 1;
  var e = $n();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (sn = function () {
      function n(a, u, c, d, s, l) {
        if (l !== e) {
          var f = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((f.name = "Invariant Violation"), f);
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
        resetWarningCache: t,
      };
      return (i.PropTypes = i), i;
    }),
    sn
  );
}
if (process.env.NODE_ENV !== "production") {
  var yu = po(),
    Eu = !0;
  En.exports = vu()(yu.isElement, Eu);
} else En.exports = mu()();
var bu = En.exports;
const M = /* @__PURE__ */ $t(bu);
var Ot = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  we = {
    id: "__id__",
    display: "__display__",
  },
  Ir = function (t, o) {
    tt(
      o === "id" || o === "display",
      'Second arg must be either "id" or "display", got: "'.concat(o, '"'),
    );
    var n = t.indexOf(we.display),
      r = t.indexOf(we.id);
    return (
      n < 0 && (n = null),
      r < 0 && (r = null),
      tt(
        n !== null || r !== null,
        "The markup '".concat(
          t,
          "' does not contain either of the placeholders '__id__' or '__display__'",
        ),
      ),
      n !== null && r !== null
        ? (o === "id" && r <= n) || (o === "display" && n <= r)
          ? 0
          : 1
        : 0
    );
  },
  _u = function (t) {
    var o = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (n) {
          var r = o.exec(n.toString()),
            i = Nt(r, 3),
            a = i[1],
            u = i[2];
          return (
            tt(
              !u,
              "RegExp flags are not supported. Change /"
                .concat(a, "/")
                .concat(u, " into /")
                .concat(a, "/"),
            ),
            "(".concat(a, ")")
          );
        })
        .join("|"),
      "g",
    );
  },
  go = function (t) {
    var o = 0;
    return (
      t.indexOf("__id__") >= 0 && o++, t.indexOf("__display__") >= 0 && o++, o
    );
  },
  Su = function () {},
  gt = function (t, o, n) {
    for (
      var r =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Su,
        i = _u(
          o.map(function (E) {
            return E.regex;
          }),
        ),
        a = 2,
        u = o.map(function (E) {
          var F = E.markup,
            j = a;
          return (a += go(F) + 1), j;
        }),
        c,
        d = 0,
        s = 0;
      (c = i.exec(t)) !== null;

    ) {
      var l = u.find(function (E) {
          return !!c[E];
        }),
        f = u.indexOf(l),
        g = o[f],
        p = g.markup,
        m = g.displayTransform,
        v = l + Ir(p, "id"),
        b = l + Ir(p, "display"),
        _ = c[v],
        S = m(_, c[b]),
        O = t.substring(d, c.index);
      r(O, d, s),
        (s += O.length),
        n(c[0], c.index, s, _, S, f, d),
        (s += S.length),
        (d = i.lastIndex);
    }
    d < t.length && r(t.substring(d), d, s);
  },
  He = function (t, o) {
    var n = "";
    return (
      gt(
        t,
        o,
        function (r, i, a, u, c) {
          n += c;
        },
        function (r) {
          n += r;
        },
      ),
      n
    );
  },
  me = function (t, o, n) {
    var r =
      arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
    if (typeof n != "number") return n;
    var i,
      a = function (d, s, l) {
        i === void 0 && l + d.length >= n && (i = s + n - l);
      },
      u = function (d, s, l, f, g, p, m) {
        i === void 0 &&
          l + g.length > n &&
          (r === "NULL" ? (i = null) : (i = s + (r === "END" ? d.length : 0)));
      };
    return gt(t, o, u, a), i === void 0 ? t.length : i;
  },
  ct = function (t, o, n, r) {
    return t.substring(0, o) + r + t.substring(n);
  },
  Cu = function (t, o, n, r) {
    var i = n.selectionStartBefore,
      a = n.selectionEndBefore,
      u = n.selectionEndAfter,
      c = He(t, r),
      d = c.length - o.length;
    i === "undefined" && (i = u + d),
      a === "undefined" && (a = i),
      i === a && a === u && c.length === o.length && (i = i - 1);
    var s = o.slice(i, u),
      l = Math.min(i, u),
      f = a;
    i === u && (f = Math.max(a, i + d));
    var g = me(t, r, l, "START"),
      p = me(t, r, f, "END"),
      m = me(t, r, l, "NULL"),
      v = me(t, r, f, "NULL"),
      b = m === null || v === null,
      _ = ct(t, g, p, s);
    if (!b) {
      var S = He(_, r);
      if (S !== o) {
        for (l = 0; o[l] === S[l]; ) l++;
        (s = o.slice(l, u)),
          (f = c.lastIndexOf(o.substring(u))),
          (g = me(t, r, l, "START")),
          (p = me(t, r, f, "END")),
          (_ = ct(t, g, p, s));
      }
    }
    return _;
  },
  xr = function (t, o, n) {
    var r = n,
      i = !1,
      a = function (c, d, s, l, f, g, p) {
        s <= n && s + f.length > n && ((r = s), (i = !0));
      };
    if ((gt(t, o, a), i)) return r;
  },
  ut = function (t, o) {
    var n = [];
    return (
      gt(t, o, function (r, i, a, u, c, d, s) {
        n.push({
          id: u,
          display: c,
          childIndex: d,
          index: i,
          plainTextIndex: a,
        });
      }),
      n
    );
  },
  vo = function (t, o) {
    return "".concat(t, "-").concat(o);
  },
  St = function (t) {
    return Object.values(t).reduce(function (o, n) {
      var r = n.results;
      return o + r.length;
    }, 0);
  },
  Tu = function (t, o) {
    var n = ut(t, o),
      r = n[n.length - 1];
    return r ? r.plainTextIndex + r.display.length : 0;
  },
  Au = function (t) {
    var o = Ot(t),
      n = t[t.indexOf(we.display) + we.display.length],
      r = t[t.indexOf(we.id) + we.id.length];
    return new RegExp(
      o
        .replace(we.display, "([^".concat(Ot(n || ""), "]+?)"))
        .replace(we.id, "([^".concat(Ot(r || ""), "]+?)")),
    );
  },
  je = function (t) {
    return Je.toArray(t).map(function (o) {
      var n = o.props,
        r = n.markup,
        i = n.regex,
        a = n.displayTransform;
      return {
        markup: r,
        regex: i ? Ou(i, r) : Au(r),
        displayTransform:
          a ||
          function (u, c) {
            return c || u;
          },
      };
    });
  },
  Ou = function (t, o) {
    var n = new RegExp(t.toString() + "|").exec("").length - 1,
      r = go(o);
    return (
      tt(
        n === r,
        "Number of capturing groups in RegExp "
          .concat(t.toString(), " (")
          .concat(
            n,
            ") does not match the number of placeholders in the markup '",
          )
          .concat(o, "' (")
          .concat(r, ")"),
      ),
      t
    );
  },
  Du = function (t, o, n) {
    return t.replace(we.id, o).replace(we.display, n);
  },
  Ru = [
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
  wu = function (t) {
    var o = t;
    return (
      Ru.forEach(function (n) {
        o = o.replace(n.letters, n.base);
      }),
      o
    );
  },
  Pr = function (t) {
    return wu(t).toLowerCase();
  },
  mo = function (t, o, n) {
    return n ? Pr(t).indexOf(Pr(o)) : t.toLowerCase().indexOf(o.toLowerCase());
  },
  Iu = function () {
    return !!document.documentMode;
  },
  bn = function (t) {
    return typeof t == "number";
  },
  xu = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  Pu = function (t) {
    for (
      var o, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
      i < n;
      i++
    )
      r[i - 1] = arguments[i];
    var a = (o = []).concat.apply(o, r);
    return Object.keys(t).reduce(function (u, c) {
      return (
        t.hasOwnProperty(c) &&
          !a.includes(c) &&
          t[c] !== void 0 &&
          (u[c] = t[c]),
        u
      );
    }, {});
  },
  Nu = ["style", "className", "classNames"];
function Nr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      o.push.apply(o, n);
  }
  return o;
}
function Fr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Nr(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
        : Nr(Object(o)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
          });
  }
  return e;
}
function Wt(e, t) {
  var o = function (r) {
    var i = function (c) {
        var d = c.style,
          s = c.className,
          l = c.classNames,
          f = Ys(c, Nu),
          g = t ? t(f) : void 0,
          p = Mn(
            e,
            {
              style: d,
              className: s,
              classNames: l,
            },
            g,
          );
        return /* @__PURE__ */ oe.createElement(
          r,
          Te({}, f, {
            style: p,
          }),
        );
      },
      a = r.displayName || r.name || "Component";
    return (
      (i.displayName = "defaultStyle(".concat(a, ")")),
      /* @__PURE__ */ oe.forwardRef(function (u, c) {
        return i(
          Fr(
            Fr({}, u),
            {},
            {
              ref: c,
            },
          ),
        );
      })
    );
  };
  return o;
}
var Fu = function (t, o) {
  return t.hasOwnProperty(o) ? t[o]++ : (t[o] = 0), o + "_" + t[o];
};
function yo(e) {
  var t = e.selectionStart,
    o = e.selectionEnd,
    n = e.value,
    r = n === void 0 ? "" : n,
    i = e.onCaretPositionChange,
    a = e.containerRef,
    u = e.children;
  e.singleLine;
  var c = e.style,
    d = ge({
      left: void 0,
      top: void 0,
    }),
    s = Nt(d, 2),
    l = s[0],
    f = s[1],
    g = ge(),
    p = Nt(g, 2),
    m = p[0],
    v = p[1];
  Ae(function () {
    b();
  });
  var b = function () {
      if (m) {
        var P = m.offsetLeft,
          I = m.offsetTop;
        if (!(l.left === P && l.top === I)) {
          var T = {
            left: P,
            top: I,
          };
          f(T), i(T);
        }
      }
    },
    _ = je(u),
    S;
  o === t && (S = me(r, _, t, "START"));
  var O = [],
    E = {},
    F = O,
    j = 0,
    y = function (P, I, T) {
      if (bn(S) && S >= I && S <= I + P.length) {
        var x = S - I;
        F.push(A(P.substring(0, x), j)), (F = [A(P.substring(x), j)]);
      } else F.push(A(P, j));
      j++;
    },
    H = function (P, I, T, x, R, L, C) {
      var D = Fu(E, x);
      F.push(k(x, R, L, D));
    },
    A = function (P, I) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Te({}, c("substring"), {
          key: I,
        }),
        P,
      );
    },
    k = function (P, I, T, x) {
      var R = {
          id: P,
          display: I,
          key: x,
        },
        L = Je.toArray(u)[T];
      return /* @__PURE__ */ oe.cloneElement(L, R);
    },
    Z = function (P) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Te({}, c("caret"), {
          ref: v,
          key: "caret",
        }),
        P,
      );
    };
  return (
    gt(r, _, H, y),
    F.push(" "),
    F !== O && O.push(Z(F)),
    /* @__PURE__ */ oe.createElement(
      "div",
      Te({}, c, {
        ref: a,
      }),
      O,
    )
  );
}
yo.propTypes = {
  selectionStart: M.number,
  selectionEnd: M.number,
  value: M.string.isRequired,
  onCaretPositionChange: M.func.isRequired,
  containerRef: M.oneOfType([
    M.func,
    M.shape({
      current: typeof Element > "u" ? M.any : M.instanceOf(Element),
    }),
  ]),
  children: M.oneOfType([M.element, M.arrayOf(M.element)]).isRequired,
};
var ju = Wt(
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
  Mu = ju(yo);
function Eo(e) {
  var t = e.id,
    o = e.focused,
    n = e.ignoreAccents,
    r = e.index,
    i = e.onClick,
    a = e.onMouseEnter,
    u = e.query,
    c = e.renderSuggestion,
    d = e.suggestion,
    s = e.style;
  e.className, e.classNames;
  var l = {
      onClick: i,
      onMouseEnter: a,
    },
    f = function () {
      var v = g(),
        b = p(v);
      return c ? c(d, u, b, r, o) : b;
    },
    g = function () {
      if (typeof d == "string") return d;
      var v = d.id,
        b = d.display;
      return v === void 0 || !b ? v : b;
    },
    p = function (v) {
      var b = mo(v, u, n);
      return b === -1
        ? /* @__PURE__ */ oe.createElement("span", s("display"), v)
        : /* @__PURE__ */ oe.createElement(
            "span",
            s("display"),
            v.substring(0, b),
            /* @__PURE__ */ oe.createElement(
              "b",
              s("highlight"),
              v.substring(b, b + u.length),
            ),
            v.substring(b + u.length),
          );
    };
  return /* @__PURE__ */ oe.createElement(
    "li",
    Te(
      {
        id: t,
        role: "option",
        "aria-selected": o,
      },
      l,
      s,
    ),
    f(),
  );
}
Eo.propTypes = {
  id: M.string.isRequired,
  query: M.string.isRequired,
  index: M.number.isRequired,
  ignoreAccents: M.bool,
  suggestion: M.oneOfType([
    M.string,
    M.shape({
      id: M.oneOfType([M.string, M.number]).isRequired,
      display: M.string,
    }),
  ]).isRequired,
  renderSuggestion: M.func,
  focused: M.bool,
};
var $u = Wt(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  ku = $u(Eo);
function Lu(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = Mn(Bu, {
      style: t,
      className: o,
      classNames: n,
    }),
    i = r("spinner");
  return /* @__PURE__ */ oe.createElement(
    "div",
    r,
    /* @__PURE__ */ oe.createElement(
      "div",
      i,
      /* @__PURE__ */ oe.createElement("div", i(["element", "element1"])),
      /* @__PURE__ */ oe.createElement("div", i(["element", "element2"])),
      /* @__PURE__ */ oe.createElement("div", i(["element", "element3"])),
      /* @__PURE__ */ oe.createElement("div", i(["element", "element4"])),
      /* @__PURE__ */ oe.createElement("div", i(["element", "element5"])),
    ),
  );
}
var Bu = {};
function bo(e) {
  var t = e.id,
    o = e.suggestions,
    n = o === void 0 ? {} : o,
    r = e.a11ySuggestionsListLabel,
    i = e.focusIndex,
    a = e.position,
    u = e.left,
    c = e.right,
    d = e.top,
    s = e.scrollFocusedIntoView,
    l = e.isLoading,
    f = e.isOpened,
    g = e.onSelect,
    p =
      g === void 0
        ? function () {
            return null;
          }
        : g,
    m = e.ignoreAccents,
    v = e.containerRef,
    b = e.children,
    _ = e.style,
    S = e.customSuggestionsContainer,
    O = e.onMouseDown,
    E = e.onMouseEnter,
    F = ge(void 0),
    j = Nt(F, 2),
    y = j[0],
    H = j[1];
  Ae(
    function () {
      if (!(!y || y.offsetHeight >= y.scrollHeight || !s)) {
        var T = y.scrollTop,
          x = y.children[i].getBoundingClientRect(),
          R = x.top,
          L = x.bottom,
          C = y.getBoundingClientRect(),
          D = C.top;
        (R = R - D + T),
          (L = L - D + T),
          R < T
            ? (y.scrollTop = R)
            : L > y.offsetHeight && (y.scrollTop = L - y.offsetHeight);
      }
    },
    [i, s, y],
  );
  var A = function () {
      var x = /* @__PURE__ */ oe.createElement(
        "ul",
        Te(
          {
            ref: H,
            id: t,
            role: "listbox",
            "aria-label": r,
          },
          _("list"),
        ),
        Object.values(n).reduce(function (R, L) {
          var C = L.results,
            D = L.queryInfo;
          return [].concat(
            xt(R),
            xt(
              C.map(function (z, U) {
                return k(z, D, R.length + U);
              }),
            ),
          );
        }, []),
      );
      return S ? S(x) : x;
    },
    k = function (x, R, L) {
      var C = L === i,
        D = R.childIndex,
        z = R.query,
        U = Je.toArray(b)[D].props.renderSuggestion;
      return /* @__PURE__ */ oe.createElement(ku, {
        style: _("item"),
        key: "".concat(D, "-").concat(I(x)),
        id: vo(t, L),
        query: z,
        index: L,
        ignoreAccents: m,
        renderSuggestion: U,
        suggestion: x,
        focused: C,
        onClick: function () {
          return P(x, R);
        },
        onMouseEnter: function () {
          return G(L);
        },
      });
    },
    Z = function () {
      if (l)
        return /* @__PURE__ */ oe.createElement(Lu, {
          style: _("loadingIndicator"),
        });
    },
    G = function (x, R) {
      E && E(x);
    },
    P = function (x, R) {
      p(x, R);
    },
    I = function (x) {
      return typeof x == "string" ? x : x.id;
    };
  return f
    ? /* @__PURE__ */ oe.createElement(
        "div",
        Te(
          {},
          du(
            {
              position: a || "absolute",
              left: u,
              right: c,
              top: d,
            },
            _,
          ),
          {
            onMouseDown: O,
            ref: v,
          },
        ),
        A(),
        Z(),
      )
    : null;
}
bo.propTypes = {
  id: M.string.isRequired,
  suggestions: M.object.isRequired,
  a11ySuggestionsListLabel: M.string,
  focusIndex: M.number,
  position: M.string,
  left: M.number,
  right: M.number,
  top: M.number,
  scrollFocusedIntoView: M.bool,
  isLoading: M.bool,
  isOpened: M.bool.isRequired,
  onSelect: M.func,
  ignoreAccents: M.bool,
  customSuggestionsContainer: M.func,
  containerRef: M.oneOfType([
    M.func,
    M.shape({
      current: typeof Element > "u" ? M.any : M.instanceOf(Element),
    }),
  ]),
};
var Hu = Wt({
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
  zu = Hu(bo);
function jr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      o.push.apply(o, n);
  }
  return o;
}
function De(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? jr(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
        : jr(Object(o)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
          });
  }
  return e;
}
function Uu(e) {
  var t = Vu();
  return function () {
    var n = Pt(e),
      r;
    if (t) {
      var i = Pt(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return Bs(this, r);
  };
}
function Vu() {
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
var Wu = function (t) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t instanceof RegExp) return t;
    var n = o.allowSpaceInQuery,
      r = Ot(t);
    return new RegExp(
      "(?:^|\\s)("
        .concat(r, "([^")
        .concat(n ? "" : "\\s")
        .concat(r, "]*))$"),
    );
  },
  qu = function (t, o) {
    return t instanceof Array
      ? function (n, r) {
          for (var i = [], a = 0, u = t.length; a < u; ++a) {
            var c = t[a].display || t[a].id;
            mo(c, n, o) >= 0 && i.push(t[a]);
          }
          return i;
        }
      : t;
  },
  Ge = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  Ct = !1,
  _o = {
    /**
     * If set to `true` a regular text input element will be rendered
     * instead of a textarea
     */
    singleLine: M.bool,
    allowSpaceInQuery: M.bool,
    allowSuggestionsAboveCursor: M.bool,
    forceSuggestionsAboveCursor: M.bool,
    ignoreAccents: M.bool,
    a11ySuggestionsListLabel: M.string,
    value: M.string,
    onKeyDown: M.func,
    customSuggestionsContainer: M.func,
    onSelect: M.func,
    onBlur: M.func,
    onChange: M.func,
    suggestionsPortalHost:
      typeof Element > "u" ? M.any : M.PropTypes.instanceOf(Element),
    inputRef: M.oneOfType([
      M.func,
      M.shape({
        current: typeof Element > "u" ? M.any : M.instanceOf(Element),
      }),
    ]),
    children: M.oneOfType([M.element, M.arrayOf(M.element)]).isRequired,
  },
  kn = /* @__PURE__ */ (function (e) {
    Ls(o, e);
    var t = Uu(o);
    function o(n) {
      var r;
      return (
        $s(this, o),
        (r = t.call(this, n)),
        ee(te(r), "setContainerElement", function (i) {
          r.containerElement = i;
        }),
        ee(te(r), "getInputProps", function () {
          var i = r.props,
            a = i.readOnly,
            u = i.disabled,
            c = i.style,
            d = Pu(
              r.props,
              ["style", "classNames", "className"],
              // substyle props
              xu(_o),
            );
          return De(
            De(
              De(De({}, d), c("input")),
              {},
              {
                value: r.getPlainText(),
                onScroll: r.updateHighlighterScroll,
              },
              !a &&
                !u && {
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
              "aria-activedescendant": vo(
                r.uuidSuggestionsOverlay,
                r.state.focusIndex,
              ),
            },
          );
        }),
        ee(te(r), "renderControl", function () {
          var i = r.props,
            a = i.singleLine,
            u = i.style,
            c = r.getInputProps();
          return /* @__PURE__ */ oe.createElement(
            "div",
            u("control"),
            r.renderHighlighter(),
            a ? r.renderInput(c) : r.renderTextarea(c),
          );
        }),
        ee(te(r), "renderInput", function (i) {
          return /* @__PURE__ */ oe.createElement(
            "input",
            Te(
              {
                type: "text",
                ref: r.setInputRef,
              },
              i,
            ),
          );
        }),
        ee(te(r), "renderTextarea", function (i) {
          return /* @__PURE__ */ oe.createElement(
            "textarea",
            Te(
              {
                ref: r.setInputRef,
              },
              i,
            ),
          );
        }),
        ee(te(r), "setInputRef", function (i) {
          r.inputElement = i;
          var a = r.props.inputRef;
          typeof a == "function" ? a(i) : a && (a.current = i);
        }),
        ee(te(r), "setSuggestionsElement", function (i) {
          r.suggestionsElement = i;
        }),
        ee(te(r), "renderSuggestionsOverlay", function () {
          if (!bn(r.state.selectionStart)) return null;
          var i = r.state.suggestionsPosition,
            a = i.position,
            u = i.left,
            c = i.top,
            d = i.right,
            s = /* @__PURE__ */ oe.createElement(
              zu,
              {
                id: r.uuidSuggestionsOverlay,
                style: r.props.style("suggestions"),
                position: a,
                left: u,
                top: c,
                right: d,
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
            ? /* @__PURE__ */ ri.createPortal(s, r.props.suggestionsPortalHost)
            : s;
        }),
        ee(te(r), "renderHighlighter", function () {
          var i = r.state,
            a = i.selectionStart,
            u = i.selectionEnd,
            c = r.props,
            d = c.singleLine,
            s = c.children,
            l = c.value,
            f = c.style;
          return /* @__PURE__ */ oe.createElement(
            Mu,
            {
              containerRef: r.setHighlighterElement,
              style: f("highlighter"),
              value: l,
              singleLine: d,
              selectionStart: a,
              selectionEnd: u,
              onCaretPositionChange: r.handleCaretPositionChange,
            },
            s,
          );
        }),
        ee(te(r), "setHighlighterElement", function (i) {
          r.highlighterElement = i;
        }),
        ee(te(r), "handleCaretPositionChange", function (i) {
          r.setState({
            caretPosition: i,
          });
        }),
        ee(te(r), "getPlainText", function () {
          return He(r.props.value || "", je(r.props.children));
        }),
        ee(te(r), "executeOnChange", function (i) {
          for (
            var a = arguments.length, u = new Array(a > 1 ? a - 1 : 0), c = 1;
            c < a;
            c++
          )
            u[c - 1] = arguments[c];
          if (r.props.onChange) {
            var d;
            return (d = r.props).onChange.apply(d, [i].concat(u));
          }
          if (r.props.valueLink) {
            var s;
            return (s = r.props.valueLink).requestChange.apply(
              s,
              [i.target.value].concat(u),
            );
          }
        }),
        ee(te(r), "handleChange", function (i) {
          if (((Ct = !1), Iu())) {
            var a =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (a.activeElement !== i.target) return;
          }
          var u = r.props.value || "",
            c = je(r.props.children),
            d = i.target.value,
            s = r.state.selectionStart;
          s == null && (s = i.target.selectionStart);
          var l = r.state.selectionEnd;
          l == null && (l = i.target.selectionEnd);
          var f = Cu(
            u,
            d,
            {
              selectionStartBefore: s,
              selectionEndBefore: l,
              selectionEndAfter: i.target.selectionEnd,
            },
            c,
          );
          d = He(f, c);
          var g = i.target.selectionStart,
            p = i.target.selectionEnd,
            m = !1,
            v = xr(u, c, g);
          v !== void 0 &&
            r.state.selectionEnd > v &&
            ((g = v + (i.nativeEvent.data ? i.nativeEvent.data.length : 0)),
            (p = g),
            (m = !0)),
            r.setState({
              selectionStart: g,
              selectionEnd: p,
              setSelectionAfterMentionChange: m,
            });
          var b = ut(f, c);
          i.nativeEvent.isComposing &&
            g === p &&
            r.updateMentionsQueries(r.inputElement.value, g);
          var _ = {
            target: {
              value: f,
            },
          };
          r.executeOnChange(_, f, d, b);
        }),
        ee(te(r), "handleSelect", function (i) {
          if (
            (r.setState({
              selectionStart: i.target.selectionStart,
              selectionEnd: i.target.selectionEnd,
            }),
            !Ct)
          ) {
            var a = r.inputElement;
            i.target.selectionStart === i.target.selectionEnd
              ? r.updateMentionsQueries(a.value, i.target.selectionStart)
              : r.clearSuggestions(),
              r.updateHighlighterScroll(),
              r.props.onSelect(i);
          }
        }),
        ee(te(r), "handleKeyDown", function (i) {
          var a = St(r.state.suggestions);
          if (a === 0 || !r.suggestionsElement) {
            r.props.onKeyDown(i);
            return;
          }
          switch (
            (Object.values(Ge).indexOf(i.keyCode) >= 0 &&
              (i.preventDefault(), i.stopPropagation()),
            i.keyCode)
          ) {
            case Ge.ESC: {
              r.clearSuggestions();
              return;
            }
            case Ge.DOWN: {
              r.shiftFocus(1);
              return;
            }
            case Ge.UP: {
              r.shiftFocus(-1);
              return;
            }
            case Ge.RETURN: {
              r.selectFocused();
              return;
            }
            case Ge.TAB: {
              r.selectFocused();
              return;
            }
            default:
              return;
          }
        }),
        ee(te(r), "shiftFocus", function (i) {
          var a = St(r.state.suggestions);
          r.setState({
            focusIndex: (a + r.state.focusIndex + i) % a,
            scrollFocusedIntoView: !0,
          });
        }),
        ee(te(r), "selectFocused", function () {
          var i = r.state,
            a = i.suggestions,
            u = i.focusIndex,
            c = Object.values(a).reduce(function (l, f) {
              var g = f.results,
                p = f.queryInfo;
              return [].concat(
                xt(l),
                xt(
                  g.map(function (m) {
                    return {
                      result: m,
                      queryInfo: p,
                    };
                  }),
                ),
              );
            }, [])[u],
            d = c.result,
            s = c.queryInfo;
          r.addMention(d, s),
            r.setState({
              focusIndex: 0,
            });
        }),
        ee(te(r), "handleBlur", function (i) {
          var a = r._suggestionsMouseDown;
          (r._suggestionsMouseDown = !1),
            a ||
              r.setState({
                selectionStart: null,
                selectionEnd: null,
              }),
            window.setTimeout(function () {
              r.updateHighlighterScroll();
            }, 1),
            r.props.onBlur(i, a);
        }),
        ee(te(r), "handleSuggestionsMouseDown", function (i) {
          r._suggestionsMouseDown = !0;
        }),
        ee(te(r), "handleSuggestionsMouseEnter", function (i) {
          r.setState({
            focusIndex: i,
            scrollFocusedIntoView: !1,
          });
        }),
        ee(te(r), "updateSuggestionsPosition", function () {
          var i = r.state.caretPosition,
            a = r.props,
            u = a.suggestionsPortalHost,
            c = a.allowSuggestionsAboveCursor,
            d = a.forceSuggestionsAboveCursor;
          if (!(!i || !r.suggestionsElement)) {
            var s = r.suggestionsElement,
              l = r.highlighterElement,
              f = l.getBoundingClientRect(),
              g = un(l, "font-size"),
              p = {
                left: f.left + i.left,
                top: f.top + i.top + g,
              },
              m = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
              );
            if (s) {
              var v = {};
              if (u) {
                v.position = "fixed";
                var b = p.left,
                  _ = p.top;
                (b -= un(s, "margin-left")),
                  (_ -= un(s, "margin-top")),
                  (b -= l.scrollLeft),
                  (_ -= l.scrollTop);
                var S = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                b + s.offsetWidth > S
                  ? (v.left = Math.max(0, S - s.offsetWidth))
                  : (v.left = b),
                  (c && _ + s.offsetHeight > m && s.offsetHeight < _ - g) || d
                    ? (v.top = Math.max(0, _ - s.offsetHeight - g))
                    : (v.top = _);
              } else {
                var O = i.left - l.scrollLeft,
                  E = i.top - l.scrollTop;
                O + s.offsetWidth > r.containerElement.offsetWidth
                  ? (v.right = 0)
                  : (v.left = O),
                  (c &&
                    p.top - l.scrollTop + s.offsetHeight > m &&
                    s.offsetHeight < f.top - g - l.scrollTop) ||
                  d
                    ? (v.top = E - s.offsetHeight - g)
                    : (v.top = E);
              }
              (v.left === r.state.suggestionsPosition.left &&
                v.top === r.state.suggestionsPosition.top &&
                v.position === r.state.suggestionsPosition.position) ||
                r.setState({
                  suggestionsPosition: v,
                });
            }
          }
        }),
        ee(te(r), "updateHighlighterScroll", function () {
          var i = r.inputElement,
            a = r.highlighterElement;
          !i ||
            !a ||
            ((a.scrollLeft = i.scrollLeft),
            (a.scrollTop = i.scrollTop),
            (a.height = i.height));
        }),
        ee(te(r), "handleCompositionStart", function () {
          Ct = !0;
        }),
        ee(te(r), "handleCompositionEnd", function () {
          Ct = !1;
        }),
        ee(te(r), "setSelection", function (i, a) {
          if (!(i === null || a === null)) {
            var u = r.inputElement;
            if (u.setSelectionRange) u.setSelectionRange(i, a);
            else if (u.createTextRange) {
              var c = u.createTextRange();
              c.collapse(!0),
                c.moveEnd("character", a),
                c.moveStart("character", i),
                c.select();
            }
          }
        }),
        ee(te(r), "updateMentionsQueries", function (i, a) {
          r._queryId++,
            (r.suggestions = {}),
            r.setState({
              suggestions: {},
            });
          var u = r.props.value || "",
            c = r.props.children,
            d = je(c),
            s = me(u, d, a, "NULL");
          if (s !== null) {
            var l = Tu(u.substring(0, s), d),
              f = i.substring(l, a);
            oe.Children.forEach(c, function (g, p) {
              if (g) {
                var m = Wu(g.props.trigger, r.props),
                  v = f.match(m);
                if (v) {
                  var b = l + f.indexOf(v[1], v.index);
                  r.queryData(v[2], p, b, b + v[1].length, i);
                }
              }
            });
          }
        }),
        ee(te(r), "clearSuggestions", function () {
          r._queryId++,
            (r.suggestions = {}),
            r.setState({
              suggestions: {},
              focusIndex: 0,
            });
        }),
        ee(te(r), "queryData", function (i, a, u, c, d) {
          var s = r.props,
            l = s.children,
            f = s.ignoreAccents,
            g = Je.toArray(l)[a],
            p = qu(g.props.data, f),
            m = p(i, r.updateSuggestions.bind(null, r._queryId, a, i, u, c, d));
          m instanceof Array &&
            r.updateSuggestions(r._queryId, a, i, u, c, d, m);
        }),
        ee(te(r), "updateSuggestions", function (i, a, u, c, d, s, l) {
          if (i === r._queryId) {
            r.suggestions = De(
              De({}, r.suggestions),
              {},
              ee({}, a, {
                queryInfo: {
                  childIndex: a,
                  query: u,
                  querySequenceStart: c,
                  querySequenceEnd: d,
                  plainTextValue: s,
                },
                results: l,
              }),
            );
            var f = r.state.focusIndex,
              g = St(r.suggestions);
            r.setState({
              suggestions: r.suggestions,
              focusIndex: f >= g ? Math.max(g - 1, 0) : f,
            });
          }
        }),
        ee(te(r), "addMention", function (i, a) {
          var u = i.id,
            c = i.display,
            d = a.childIndex,
            s = a.querySequenceStart,
            l = a.querySequenceEnd,
            f = a.plainTextValue,
            g = r.props.value || "",
            p = je(r.props.children),
            m = Je.toArray(r.props.children)[d],
            v = m.props,
            b = v.markup,
            _ = v.displayTransform,
            S = v.appendSpaceOnAdd,
            O = v.onAdd,
            E = me(g, p, s, "START"),
            F = E + l - s,
            j = Du(b, u, c);
          S && (j += " ");
          var y = ct(g, E, F, j);
          r.inputElement.focus();
          var H = _(u, c);
          S && (H += " ");
          var A = s + H.length;
          r.setState({
            selectionStart: A,
            selectionEnd: A,
            setSelectionAfterMentionChange: !0,
          });
          var k = {
              target: {
                value: y,
              },
            },
            Z = ut(y, p),
            G = ct(f, s, l, H);
          r.executeOnChange(k, y, G, Z),
            O && O(u, c, E, F),
            r.clearSuggestions();
        }),
        ee(te(r), "isLoading", function () {
          var i = !1;
          return (
            oe.Children.forEach(r.props.children, function (a) {
              i = i || (a && a.props.isLoading);
            }),
            i
          );
        }),
        ee(te(r), "isOpened", function () {
          return (
            bn(r.state.selectionStart) &&
            (St(r.state.suggestions) !== 0 || r.isLoading())
          );
        }),
        ee(te(r), "_queryId", 0),
        (r.suggestions = {}),
        (r.uuidSuggestionsOverlay = Math.random().toString(16).substring(2)),
        (r.handleCopy = r.handleCopy.bind(te(r))),
        (r.handleCut = r.handleCut.bind(te(r))),
        (r.handlePaste = r.handlePaste.bind(te(r))),
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
      ks(o, [
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
          value: function (r, i) {
            i.suggestionsPosition === this.state.suggestionsPosition &&
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
            return /* @__PURE__ */ oe.createElement(
              "div",
              Te(
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
              var i = this.state,
                a = i.selectionStart,
                u = i.selectionEnd,
                c = this.props,
                d = c.value,
                s = c.children,
                l = je(s),
                f = me(d, l, a, "START"),
                g = me(d, l, u, "END"),
                p = r.clipboardData.getData("text/react-mentions"),
                m = r.clipboardData.getData("text/plain"),
                v = ct(d, f, g, p || m).replace(/\r/g, ""),
                b = He(v, l),
                _ = {
                  target: De(
                    De({}, r.target),
                    {},
                    {
                      value: v,
                    },
                  ),
                };
              this.executeOnChange(_, v, b, ut(v, l));
              var S = xr(d, l, a),
                O = (S || a) + He(p || m, l).length;
              this.setState({
                selectionStart: O,
                selectionEnd: O,
                setSelectionAfterHandlePaste: !0,
              });
            }
          },
        },
        {
          key: "saveSelectionToClipboard",
          value: function (r) {
            var i = this.inputElement.selectionStart,
              a = this.inputElement.selectionEnd,
              u = this.props,
              c = u.children,
              d = u.value,
              s = je(c),
              l = me(d, s, i, "START"),
              f = me(d, s, a, "END");
            r.clipboardData.setData("text/plain", r.target.value.slice(i, a)),
              r.clipboardData.setData("text/react-mentions", d.slice(l, f));
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
              var i = this.state,
                a = i.selectionStart,
                u = i.selectionEnd,
                c = this.props,
                d = c.children,
                s = c.value,
                l = je(d),
                f = me(s, l, a, "START"),
                g = me(s, l, u, "END"),
                p = [s.slice(0, f), s.slice(g)].join(""),
                m = He(p, l),
                v = {
                  target: De(
                    De({}, r.target),
                    {},
                    {
                      value: m,
                    },
                  ),
                };
              this.executeOnChange(v, p, m, ut(s, l));
            }
          },
          // Handle input element's change event
        },
      ]),
      o
    );
  })(oe.Component);
ee(kn, "propTypes", _o);
ee(kn, "defaultProps", {
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
var un = function (t, o) {
    var n = parseFloat(window.getComputedStyle(t, null).getPropertyValue(o));
    return isFinite(n) ? n : 0;
  },
  Yu = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  Ku = Wt(
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
        input: De(
          {
            height: "100%",
            bottom: 0,
            overflow: "hidden",
            resize: "none",
          },
          Yu
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
  Gu = Ku(kn),
  Xu = {
    fontWeight: "inherit",
  },
  Ln = function (t) {
    var o = t.display,
      n = t.style,
      r = t.className,
      i = t.classNames,
      a = Mn(Xu, {
        style: n,
        className: r,
        classNames: i,
      });
    return /* @__PURE__ */ oe.createElement("strong", a, o);
  };
Ln.propTypes = {
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
  onAdd: M.func,
  onRemove: M.func,
  renderSuggestion: M.func,
  trigger: M.oneOfType([M.string, M.instanceOf(RegExp)]),
  markup: M.string,
  displayTransform: M.func,
  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: M.bool,
  isLoading: M.bool,
};
Ln.defaultProps = {
  trigger: "@",
  markup: "@[__display__](__id__)",
  displayTransform: function (t, o) {
    return o || t;
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
const Zu = {
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
  Ju = ({
    value: e,
    setValue: t,
    users: o,
    placeholder: n = "Type your reply here...",
    onEnterKeypress: r,
  }) => {
    const i = o.map((d) => ({
        ...d,
        display: d.display_name,
      })),
      a = (d) => {
        d.stopPropagation(),
          d.key === "Enter" &&
            !d.shiftKey &&
            (d.preventDefault(), r == null || r());
      },
      u = (d, s) => {
        console.info("[MentionsInputComponent] on mention select", {
          id: d,
          display: s,
        });
      },
      c = (d) => {
        t(d.target.value);
      };
    return /* @__PURE__ */ w.jsx(Gu, {
      autoFocus: !0,
      value: e,
      onChange: c,
      style: {
        ...Zu,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: n,
      className: "mentions-input",
      onKeyDown: a,
      children: /* @__PURE__ */ w.jsx(Ln, {
        displayTransform: (d, s) => `@${s}`,
        trigger: "@",
        markup: "@[__id__](__display__)",
        data: i,
        appendSpaceOnAdd: !0,
        renderSuggestion: (d, s) =>
          /* @__PURE__ */ w.jsx("div", {
            className: `user ${s ? "focused" : ""}`,
            children: d.display,
          }),
        onAdd: u,
      }),
    });
  },
  Qu = Ju,
  ec = ({
    comment: e,
    setComment: t,
    loading: o,
    users: n,
    currentUser: r,
    placeholder: i,
    onEnterKeypress: a,
  }) =>
    /* @__PURE__ */ w.jsxs("div", {
      className: Fe.conversationInputForm,
      children: [
        r ? /* @__PURE__ */ w.jsx(oo, { user: r }) : null,
        /* @__PURE__ */ w.jsx(Qu, {
          value: e,
          setValue: t,
          users: n,
          placeholder: i,
          onEnterKeypress: a,
        }),
        /* @__PURE__ */ w.jsx(Ga, {
          loading: o,
          color: "primary",
          children: /* @__PURE__ */ w.jsx($a, {}),
        }),
      ],
    }),
  So = ec,
  tc = ({ meta: { highlight: e, filePath: t, field: o, column: n } }) => {
    if (!e) return null;
    const r = n ? `${t} (${n})` : t;
    return /* @__PURE__ */ w.jsx("div", {
      className: Fe.highlightText,
      children: /* @__PURE__ */ w.jsx(rs, {
        code: e,
        language: o ? "markdown" : "sql",
        showLineNumbers: !o,
        fileName: r,
      }),
    });
  },
  Co = tc,
  nc = () => {
    const e = ue((s) => s.users),
      t = ue((s) => s.newConversation),
      o = ue((s) => (s.currentUserId ? s.users[s.currentUserId] : null)),
      n = ue((s) => s.shareId),
      r = Oe(),
      [i, a] = ge(!1),
      [u, c] = ge(""),
      d = async (s) => {
        if (
          (s == null || s.stopPropagation(),
          s == null || s.preventDefault(),
          !(!t || !n))
        ) {
          a(!0);
          try {
            console.log("saving conversation", t, u);
            const l = await cs(
              n,
              {
                ...t,
                message: u,
              },
              "dbt-docs",
              // this component is used only from dbt docs page
            );
            if (!l.conversation_group_id) {
              console.error("Unable to create conversation group", l);
              return;
            }
            console.log("Successfully created conversation group", l);
          } catch (l) {
            console.error("error while saving conversation", t, l);
          }
          r(Qr()), a(!1), r(Pn(!0)), r(Nn()), c("");
        }
      };
    return /* @__PURE__ */ w.jsx(jt, {
      className: Fe.newConversationForm,
      children: /* @__PURE__ */ w.jsx(Mt, {
        children: /* @__PURE__ */ w.jsxs("form", {
          onSubmit: d,
          children: [
            /* @__PURE__ */ w.jsx("h4", { children: "Add comment" }),
            /* @__PURE__ */ w.jsx(Co, {
              meta: (t == null ? void 0 : t.meta) || {},
            }),
            /* @__PURE__ */ w.jsx(So, {
              comment: u,
              setComment: c,
              loading: i,
              users: Object.values(e),
              currentUser: o,
              placeholder: "Start a conversation or add others with @",
              onEnterKeypress: d,
            }),
          ],
        }),
      }),
    });
  },
  rc = nc;
var To = { exports: {} };
(function (e, t) {
  (function (o, n) {
    e.exports = n();
  })(ii, function () {
    var o = 1e3,
      n = 6e4,
      r = 36e5,
      i = "millisecond",
      a = "second",
      u = "minute",
      c = "hour",
      d = "day",
      s = "week",
      l = "month",
      f = "quarter",
      g = "year",
      p = "date",
      m = "Invalid Date",
      v =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      b =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      _ = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (P) {
          var I = ["th", "st", "nd", "rd"],
            T = P % 100;
          return "[" + P + (I[(T - 20) % 10] || I[T] || I[0]) + "]";
        },
      },
      S = function (P, I, T) {
        var x = String(P);
        return !x || x.length >= I
          ? P
          : "" + Array(I + 1 - x.length).join(T) + P;
      },
      O = {
        s: S,
        z: function (P) {
          var I = -P.utcOffset(),
            T = Math.abs(I),
            x = Math.floor(T / 60),
            R = T % 60;
          return (I <= 0 ? "+" : "-") + S(x, 2, "0") + ":" + S(R, 2, "0");
        },
        m: function P(I, T) {
          if (I.date() < T.date()) return -P(T, I);
          var x = 12 * (T.year() - I.year()) + (T.month() - I.month()),
            R = I.clone().add(x, l),
            L = T - R < 0,
            C = I.clone().add(x + (L ? -1 : 1), l);
          return +(-(x + (T - R) / (L ? R - C : C - R)) || 0);
        },
        a: function (P) {
          return P < 0 ? Math.ceil(P) || 0 : Math.floor(P);
        },
        p: function (P) {
          return (
            { M: l, y: g, w: s, d, D: p, h: c, m: u, s: a, ms: i, Q: f }[P] ||
            String(P || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (P) {
          return P === void 0;
        },
      },
      E = "en",
      F = {};
    F[E] = _;
    var j = "$isDayjsObject",
      y = function (P) {
        return P instanceof Z || !(!P || !P[j]);
      },
      H = function P(I, T, x) {
        var R;
        if (!I) return E;
        if (typeof I == "string") {
          var L = I.toLowerCase();
          F[L] && (R = L), T && ((F[L] = T), (R = L));
          var C = I.split("-");
          if (!R && C.length > 1) return P(C[0]);
        } else {
          var D = I.name;
          (F[D] = I), (R = D);
        }
        return !x && R && (E = R), R || (!x && E);
      },
      A = function (P, I) {
        if (y(P)) return P.clone();
        var T = typeof I == "object" ? I : {};
        return (T.date = P), (T.args = arguments), new Z(T);
      },
      k = O;
    (k.l = H),
      (k.i = y),
      (k.w = function (P, I) {
        return A(P, { locale: I.$L, utc: I.$u, x: I.$x, $offset: I.$offset });
      });
    var Z = (function () {
        function P(T) {
          (this.$L = H(T.locale, null, !0)),
            this.parse(T),
            (this.$x = this.$x || T.x || {}),
            (this[j] = !0);
        }
        var I = P.prototype;
        return (
          (I.parse = function (T) {
            (this.$d = (function (x) {
              var R = x.date,
                L = x.utc;
              if (R === null) return /* @__PURE__ */ new Date(NaN);
              if (k.u(R)) return /* @__PURE__ */ new Date();
              if (R instanceof Date) return new Date(R);
              if (typeof R == "string" && !/Z$/i.test(R)) {
                var C = R.match(v);
                if (C) {
                  var D = C[2] - 1 || 0,
                    z = (C[7] || "0").substring(0, 3);
                  return L
                    ? new Date(
                        Date.UTC(
                          C[1],
                          D,
                          C[3] || 1,
                          C[4] || 0,
                          C[5] || 0,
                          C[6] || 0,
                          z,
                        ),
                      )
                    : new Date(
                        C[1],
                        D,
                        C[3] || 1,
                        C[4] || 0,
                        C[5] || 0,
                        C[6] || 0,
                        z,
                      );
                }
              }
              return new Date(R);
            })(T)),
              this.init();
          }),
          (I.init = function () {
            var T = this.$d;
            (this.$y = T.getFullYear()),
              (this.$M = T.getMonth()),
              (this.$D = T.getDate()),
              (this.$W = T.getDay()),
              (this.$H = T.getHours()),
              (this.$m = T.getMinutes()),
              (this.$s = T.getSeconds()),
              (this.$ms = T.getMilliseconds());
          }),
          (I.$utils = function () {
            return k;
          }),
          (I.isValid = function () {
            return this.$d.toString() !== m;
          }),
          (I.isSame = function (T, x) {
            var R = A(T);
            return this.startOf(x) <= R && R <= this.endOf(x);
          }),
          (I.isAfter = function (T, x) {
            return A(T) < this.startOf(x);
          }),
          (I.isBefore = function (T, x) {
            return this.endOf(x) < A(T);
          }),
          (I.$g = function (T, x, R) {
            return k.u(T) ? this[x] : this.set(R, T);
          }),
          (I.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (I.valueOf = function () {
            return this.$d.getTime();
          }),
          (I.startOf = function (T, x) {
            var R = this,
              L = !!k.u(x) || x,
              C = k.p(T),
              D = function (Q, W) {
                var le = k.w(
                  R.$u ? Date.UTC(R.$y, W, Q) : new Date(R.$y, W, Q),
                  R,
                );
                return L ? le : le.endOf(d);
              },
              z = function (Q, W) {
                return k.w(
                  R.toDate()[Q].apply(
                    R.toDate("s"),
                    (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(W),
                  ),
                  R,
                );
              },
              U = this.$W,
              V = this.$M,
              K = this.$D,
              q = "set" + (this.$u ? "UTC" : "");
            switch (C) {
              case g:
                return L ? D(1, 0) : D(31, 11);
              case l:
                return L ? D(1, V) : D(0, V + 1);
              case s:
                var Y = this.$locale().weekStart || 0,
                  J = (U < Y ? U + 7 : U) - Y;
                return D(L ? K - J : K + (6 - J), V);
              case d:
              case p:
                return z(q + "Hours", 0);
              case c:
                return z(q + "Minutes", 1);
              case u:
                return z(q + "Seconds", 2);
              case a:
                return z(q + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (I.endOf = function (T) {
            return this.startOf(T, !1);
          }),
          (I.$set = function (T, x) {
            var R,
              L = k.p(T),
              C = "set" + (this.$u ? "UTC" : ""),
              D = ((R = {}),
              (R[d] = C + "Date"),
              (R[p] = C + "Date"),
              (R[l] = C + "Month"),
              (R[g] = C + "FullYear"),
              (R[c] = C + "Hours"),
              (R[u] = C + "Minutes"),
              (R[a] = C + "Seconds"),
              (R[i] = C + "Milliseconds"),
              R)[L],
              z = L === d ? this.$D + (x - this.$W) : x;
            if (L === l || L === g) {
              var U = this.clone().set(p, 1);
              U.$d[D](z),
                U.init(),
                (this.$d = U.set(p, Math.min(this.$D, U.daysInMonth())).$d);
            } else D && this.$d[D](z);
            return this.init(), this;
          }),
          (I.set = function (T, x) {
            return this.clone().$set(T, x);
          }),
          (I.get = function (T) {
            return this[k.p(T)]();
          }),
          (I.add = function (T, x) {
            var R,
              L = this;
            T = Number(T);
            var C = k.p(x),
              D = function (V) {
                var K = A(L);
                return k.w(K.date(K.date() + Math.round(V * T)), L);
              };
            if (C === l) return this.set(l, this.$M + T);
            if (C === g) return this.set(g, this.$y + T);
            if (C === d) return D(1);
            if (C === s) return D(7);
            var z = ((R = {}), (R[u] = n), (R[c] = r), (R[a] = o), R)[C] || 1,
              U = this.$d.getTime() + T * z;
            return k.w(U, this);
          }),
          (I.subtract = function (T, x) {
            return this.add(-1 * T, x);
          }),
          (I.format = function (T) {
            var x = this,
              R = this.$locale();
            if (!this.isValid()) return R.invalidDate || m;
            var L = T || "YYYY-MM-DDTHH:mm:ssZ",
              C = k.z(this),
              D = this.$H,
              z = this.$m,
              U = this.$M,
              V = R.weekdays,
              K = R.months,
              q = R.meridiem,
              Y = function (W, le, $, he) {
                return (W && (W[le] || W(x, L))) || $[le].slice(0, he);
              },
              J = function (W) {
                return k.s(D % 12 || 12, W, "0");
              },
              Q =
                q ||
                function (W, le, $) {
                  var he = W < 12 ? "AM" : "PM";
                  return $ ? he.toLowerCase() : he;
                };
            return L.replace(b, function (W, le) {
              return (
                le ||
                (function ($) {
                  switch ($) {
                    case "YY":
                      return String(x.$y).slice(-2);
                    case "YYYY":
                      return k.s(x.$y, 4, "0");
                    case "M":
                      return U + 1;
                    case "MM":
                      return k.s(U + 1, 2, "0");
                    case "MMM":
                      return Y(R.monthsShort, U, K, 3);
                    case "MMMM":
                      return Y(K, U);
                    case "D":
                      return x.$D;
                    case "DD":
                      return k.s(x.$D, 2, "0");
                    case "d":
                      return String(x.$W);
                    case "dd":
                      return Y(R.weekdaysMin, x.$W, V, 2);
                    case "ddd":
                      return Y(R.weekdaysShort, x.$W, V, 3);
                    case "dddd":
                      return V[x.$W];
                    case "H":
                      return String(D);
                    case "HH":
                      return k.s(D, 2, "0");
                    case "h":
                      return J(1);
                    case "hh":
                      return J(2);
                    case "a":
                      return Q(D, z, !0);
                    case "A":
                      return Q(D, z, !1);
                    case "m":
                      return String(z);
                    case "mm":
                      return k.s(z, 2, "0");
                    case "s":
                      return String(x.$s);
                    case "ss":
                      return k.s(x.$s, 2, "0");
                    case "SSS":
                      return k.s(x.$ms, 3, "0");
                    case "Z":
                      return C;
                  }
                  return null;
                })(W) ||
                C.replace(":", "")
              );
            });
          }),
          (I.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (I.diff = function (T, x, R) {
            var L,
              C = this,
              D = k.p(x),
              z = A(T),
              U = (z.utcOffset() - this.utcOffset()) * n,
              V = this - z,
              K = function () {
                return k.m(C, z);
              };
            switch (D) {
              case g:
                L = K() / 12;
                break;
              case l:
                L = K();
                break;
              case f:
                L = K() / 3;
                break;
              case s:
                L = (V - U) / 6048e5;
                break;
              case d:
                L = (V - U) / 864e5;
                break;
              case c:
                L = V / r;
                break;
              case u:
                L = V / n;
                break;
              case a:
                L = V / o;
                break;
              default:
                L = V;
            }
            return R ? L : k.a(L);
          }),
          (I.daysInMonth = function () {
            return this.endOf(l).$D;
          }),
          (I.$locale = function () {
            return F[this.$L];
          }),
          (I.locale = function (T, x) {
            if (!T) return this.$L;
            var R = this.clone(),
              L = H(T, x, !0);
            return L && (R.$L = L), R;
          }),
          (I.clone = function () {
            return k.w(this.$d, this);
          }),
          (I.toDate = function () {
            return new Date(this.valueOf());
          }),
          (I.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (I.toISOString = function () {
            return this.$d.toISOString();
          }),
          (I.toString = function () {
            return this.$d.toUTCString();
          }),
          P
        );
      })(),
      G = Z.prototype;
    return (
      (A.prototype = G),
      [
        ["$ms", i],
        ["$s", a],
        ["$m", u],
        ["$H", c],
        ["$W", d],
        ["$M", l],
        ["$y", g],
        ["$D", p],
      ].forEach(function (P) {
        G[P[1]] = function (I) {
          return this.$g(I, P[0], P[1]);
        };
      }),
      (A.extend = function (P, I) {
        return P.$i || (P(I, Z, A), (P.$i = !0)), A;
      }),
      (A.locale = H),
      (A.isDayjs = y),
      (A.unix = function (P) {
        return A(1e3 * P);
      }),
      (A.en = F[E]),
      (A.Ls = F),
      (A.p = {}),
      A
    );
  });
})(To);
var oc = To.exports;
const ic = /* @__PURE__ */ $t(oc),
  ac = ({ conversationGroupId: e, shareId: t }) => {
    const { onResolve: o, source: n } = ht(),
      [r, i] = ge(!1),
      a = async () => {
        e && (i(!0), await ps(t, e, n), o(), i(!1));
      };
    return e
      ? /* @__PURE__ */ w.jsx(ro, {
          disabled: r,
          className: Fe.resolveButton,
          title: "Resolve conversation",
          onClick: a,
          children: /* @__PURE__ */ w.jsx(Ma, {}),
        })
      : null;
  },
  sc = ac,
  uc = ({
    user: e,
    timestamp: t,
    showResolveButton: o,
    conversationGroupId: n,
    shareId: r,
  }) =>
    /* @__PURE__ */ w.jsxs(kr, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ w.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ w.jsx(oo, { user: e }),
            /* @__PURE__ */ w.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ w.jsx("span", {
              children: ic(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        o
          ? /* @__PURE__ */ w.jsx(sc, {
              conversationGroupId: n,
              shareId: r,
            })
          : null,
      ],
    }),
  Ao = uc,
  cc = ({ conversation: e, shareId: t }) => {
    const { users: o } = ht(),
      n = Pe(() => {
        if (e != null && e.user_id) return o[e.user_id];
      }, [e.user_id, o]);
    return /* @__PURE__ */ w.jsxs(jt, {
      children: [
        /* @__PURE__ */ w.jsx(Ao, {
          user: n,
          timestamp: e.timestamp,
          shareId: t,
        }),
        /* @__PURE__ */ w.jsx(Mt, {
          children: /* @__PURE__ */ w.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
          }),
        }),
      ],
    });
  },
  lc = cc,
  dc = ({ conversationGroupId: e, shareId: t }) => {
    const { currentUser: o, users: n, onReplyAdd: r, source: i } = ht(),
      a = Object.values(n),
      [u, c] = ge(""),
      [d, s] = ge(!1),
      l = async (f) => {
        if (
          (f == null || f.stopPropagation(),
          f == null || f.preventDefault(),
          !(!t || !e))
        ) {
          s(!0),
            console.log("saving reply", t, e, {
              message: u,
            });
          try {
            await ls(
              t,
              e,
              {
                message: u,
              },
              i,
            ),
              r();
          } catch (g) {
            console.error("error while saving reply", g);
          }
          s(!1), c("");
        }
      };
    return /* @__PURE__ */ w.jsx("div", {
      className: Fe.replyForm,
      children: /* @__PURE__ */ w.jsx("form", {
        onSubmit: l,
        className: "",
        children: /* @__PURE__ */ w.jsx(So, {
          comment: u,
          setComment: c,
          loading: d,
          users: Object.values(a),
          currentUser: o || null,
          onEnterKeypress: l,
        }),
      }),
    });
  },
  fc = dc,
  pc = ({ conversationGroup: e, shareId: t, onSelect: o }) => {
    var f;
    const { users: n } = ht(),
      r = Pe(() => {
        if (e.owner) return n[e.owner];
      }, [e.owner, n]),
      { isSelected: i } = ht(),
      [a, u] = ge(!1),
      c = Me(
        (g) => {
          !i ||
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
        [e.conversation_group_id, i],
      );
    if (
      !((f = e == null ? void 0 : e.conversations) != null && f.length) ||
      (e == null ? void 0 : e.status) !== "Pending"
    )
      return null;
    const [d, ...s] = e.conversations,
      l = s.length
        ? s.length > 1
          ? `${s.length} replies`
          : `${s.length} reply`
        : "Reply";
    return /* @__PURE__ */ w.jsx("div", {
      ref: c,
      className: Fe.conversationGroup,
      children: /* @__PURE__ */ w.jsxs(jt, {
        className: `${i ? "active" : ""}`,
        onClick: o,
        children: [
          /* @__PURE__ */ w.jsx(Ao, {
            user: r,
            timestamp: d.timestamp,
            showResolveButton: !0,
            conversationGroupId: e.conversation_group_id,
            shareId: t,
          }),
          /* @__PURE__ */ w.jsxs(Mt, {
            children: [
              /* @__PURE__ */ w.jsx(Co, { meta: e.meta }),
              /* @__PURE__ */ w.jsx("p", {
                children: d.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
              }),
              /* @__PURE__ */ w.jsx(Ft, {
                onClick: () => u((g) => !g),
                color: "link",
                children: l,
              }),
              s.length
                ? /* @__PURE__ */ w.jsx(w.Fragment, {
                    children: a
                      ? /* @__PURE__ */ w.jsx(w.Fragment, {
                          children: s.map((g) =>
                            /* @__PURE__ */ w.jsx(
                              lc,
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
              a
                ? /* @__PURE__ */ w.jsx(fc, {
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
  hc = pc,
  Oo = Ue({
    users: {},
    conversationGroup: void 0,
    currentUser: void 0,
    isSelected: !1,
    shareId: void 0,
    onSelect: () => null,
    onResolve: () => null,
    onReplyAdd: () => null,
    source: Sn.DBT_DOCS,
  }),
  gc = ({
    currentUser: e,
    conversationGroup: t,
    shareId: o,
    onSelect: n,
    isSelected: r,
    users: i,
    onResolve: a,
    onReplyAdd: u,
    source: c,
  }) => {
    const d = Pe(
      () => ({
        currentUser: e,
        conversationGroup: t,
        shareId: o,
        onSelect: n,
        isSelected: r,
        users: i,
        onResolve: a,
        onReplyAdd: u,
        source: c,
      }),
      [e, t, o, n, r, i, a, u, c],
    );
    return !t || !o
      ? null
      : /* @__PURE__ */ w.jsx(Oo.Provider, {
          value: d,
          children: /* @__PURE__ */ w.jsx(hc, {
            conversationGroup: t,
            shareId: o,
            onSelect: n,
          }),
        });
  },
  vc = gc,
  ht = () => Ve(Oo),
  mc = () => {
    const e = ue((l) => l.source),
      t = ue((l) => l.conversations),
      o = ue((l) => l.selectedConversationId),
      n = ue((l) => l.shareId),
      r = ue((l) => l.users),
      i = ue((l) => l.currentUserId),
      a = Oe();
    if (!i || !n) return null;
    const u = r[i],
      c = (l) => {
        a(fa({ shareId: n, conversationGroupId: l }));
      },
      d = (l) => {
        a(xn(l));
      },
      s = (l) => {
        console.log("onReplyAdd", l), a(Qr());
      };
    return !t || !Object.keys(t).length
      ? /* @__PURE__ */ w.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ w.jsx("div", {
          children: Object.values(t).map((l) =>
            /* @__PURE__ */ w.jsx(
              vc,
              {
                conversationGroup: l,
                shareId: n,
                isSelected: o === l.conversation_group_id,
                currentUser: u,
                onResolve: () => c(l.conversation_group_id),
                onSelect: () => d(l.conversation_group_id),
                users: r,
                onReplyAdd: () => s(l.conversation_group_id),
                source: e,
              },
              l.conversation_group_id,
            ),
          ),
        });
  },
  yc = mc,
  Ec = () => {
    const e = ue((a) => a.isRightPanelOpen),
      t = ue((a) => a.selectedConversationId),
      o = ue((a) => a.newConversation),
      n = Oe(),
      r = () => {
        n(Pn(!1)), n(xn(void 0)), n(Nn());
      };
    return !!o || e || t
      ? /* @__PURE__ */ w.jsxs(w.Fragment, {
          children: [
            /* @__PURE__ */ w.jsx(ni, {
              onClick: r,
              className: Fe.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ w.jsxs("div", {
              className: Fe.conversationRightPanel,
              children: [
                /* @__PURE__ */ w.jsx("h3", { children: "Comments" }),
                o
                  ? /* @__PURE__ */ w.jsx(rc, {})
                  : /* @__PURE__ */ w.jsx(yc, {}),
              ],
            }),
          ],
        })
      : null;
  },
  bc = Ec,
  _c = 10,
  Sc = () => {
    const e = Re(),
      t = ue((a) => a.shareId),
      o = ue((a) => a.conversationsLoadingState),
      n = Oe(),
      r = ue((a) => Object.keys(a.conversations || {})),
      i = Me(
        (a) => {
          clearTimeout(e.current),
            ds(a)
              .then((u) => {
                console.log("useConversations", u),
                  n(da(u == null ? void 0 : u.dbt_docs_share_conversations)),
                  (e.current = setTimeout(() => {
                    i(a);
                  }, _c * 1e3));
              })
              .catch((u) =>
                console.error("error while fetching conversations list", u),
              )
              .finally(() => {
                n(pr(Ce.INITIALIZED));
              });
        },
        [n],
      );
    return (
      Ae(() => {
        o !== Ce.UNINITIALIZED || !t || (n(pr(Ce.LOADING)), i(t));
      }, [n, o, r, t, i]),
      { isLoading: o === Ce.LOADING }
    );
  },
  Cc = () => {
    const e = Oe(),
      t = ue((r) => Object.keys(r.users || {})),
      [o, n] = ge(Ce.UNINITIALIZED);
    return (
      Ae(() => {
        o !== Ce.UNINITIALIZED ||
          Object.keys(t).length ||
          (n(Ce.LOADING),
          fs()
            .then((r) => {
              console.log("useConversationUsers", r), e(la(r));
            })
            .catch((r) => console.error("error while fetching users list", r))
            .finally(() => {
              n(Ce.INITIALIZED);
            }));
      }, [e, o, t]),
      { isLoading: o === Ce.LOADING }
    );
  },
  Tc = () => (
    Cc(),
    Sc(),
    /* @__PURE__ */ w.jsxs("div", {
      children: [/* @__PURE__ */ w.jsx(bc, {}), /* @__PURE__ */ w.jsx(Es, {})],
    })
  ),
  Ac = Tc,
  Oc = ({ target: e, ...t }) =>
    _n(
      /* @__PURE__ */ w.jsx(ro, {
        className: Fe.hotspotButton,
        title: "Click to start conversation",
        ...t,
        children: /* @__PURE__ */ w.jsx(no, {}),
      }),
      e,
    ),
  Do = Oc,
  Dc = () => {
    var c;
    const e = Oe(),
      t = ue((d) => d.codeblockLoaded),
      o = ue((d) => d.manifest),
      [n, r] = ge(0),
      i = (c = Tn()) == null ? void 0 : c.parentElement,
      a = () => {
        var f;
        if (!i || !o.nodes) return;
        const d = An();
        if (!d || d.length < 3) {
          console.error("Unable to find model parts", d);
          return;
        }
        const l = {
          highlight: ((f = o.nodes[d[2]]) == null ? void 0 : f.raw_code).split(`
`)[n],
          range: {
            end: { line: n, character: 0 },
            start: { line: n, character: 0 },
          },
        };
        e(Fn({ meta: l }));
      },
      u = Me(
        (d) => {
          if (!i) return;
          const s = d.y,
            l = i.querySelectorAll(".line-numbers-rows > span"),
            f = Array.from(l).findIndex((g) => {
              const { height: p, y: m } = g.getBoundingClientRect();
              return s >= m && s <= m + p;
            });
          r(f);
        },
        [i],
      );
    return (
      Ae(() => {
        if (!(!t || !i))
          return (
            i.addEventListener("mousemove", u),
            () => {
              i.removeEventListener("mousemove", u);
            }
          );
      }, [t, i, u]),
      !t || !i
        ? null
        : /* @__PURE__ */ w.jsx(Do, {
            target: i,
            onClick: a,
            style: { top: n * 21.2 },
          })
    );
  },
  Rc = Dc,
  wc = () => {
    const e = Oe(),
      t = ue((r) => r.codeblockLoaded),
      o = On(),
      n = () => {
        const r = {
          field: "description",
          highlight: o == null ? void 0 : o.innerText,
        };
        e(Fn({ meta: r }));
      };
    return !t || !o
      ? null
      : /* @__PURE__ */ w.jsx(Do, { target: o, onClick: n });
  },
  Ic = wc,
  xc = () =>
    /* @__PURE__ */ w.jsxs(w.Fragment, {
      children: [/* @__PURE__ */ w.jsx(Ic, {}), /* @__PURE__ */ w.jsx(Rc, {})],
    }),
  Pc = xc,
  Nc = Qo(() => import("./DbtDocsRenderer.js")),
  Fc = () => {
    const { loading: e, shareDetails: t } = hs(),
      o = Oe(),
      { getHighlightedSelectionData: n, pos: r, onSelectionEnd: i } = gs(),
      a = (u) => {
        u.stopPropagation();
        const c = n();
        c && o(Fn(c));
      };
    return e
      ? /* @__PURE__ */ w.jsx("div", { children: "Loading..." })
      : !(t != null && t.catalog_presigned_url) ||
          !(t != null && t.manifest_presigned_url)
        ? /* @__PURE__ */ w.jsx("div", {
            children: "Unable to load required artifacts. Please try again.",
          })
        : /* @__PURE__ */ w.jsxs("div", {
            children: [
              /* @__PURE__ */ w.jsxs("div", {
                className: "d-flex justify-content-end mb-2",
                children: [
                  /* @__PURE__ */ w.jsx(Pc, {}),
                  /* @__PURE__ */ w.jsx(ss, {}),
                ],
              }),
              /* @__PURE__ */ w.jsx(Ac, {}),
              /* @__PURE__ */ w.jsx(Nc, {
                shareDetails: t,
                onSelectionEnd: i,
              }),
              r ? /* @__PURE__ */ w.jsx(is, { pos: r, onAddComment: a }) : null,
            ],
          });
  },
  jc = Fc,
  Mc = ({ shareId: e, userId: t, conversationGroupId: o, source: n }) =>
    /* @__PURE__ */ w.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ w.jsx(ga, {
        shareId: e,
        userId: t,
        conversationGroupId: o,
        source: n,
        children: /* @__PURE__ */ w.jsx(jc, {}),
      }),
    }),
  Jc = Mc;
export {
  nt as A,
  Sn as C,
  Jc as D,
  ue as a,
  qc as b,
  Yc as c,
  Hc as d,
  Tn as e,
  Fe as f,
  ui as g,
  So as h,
  vc as i,
  w as j,
  rs as k,
  Wc as s,
  Oe as u,
};
