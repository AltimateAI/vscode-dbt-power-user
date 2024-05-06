import "./main.css";
import * as Ee from "react";
import oe, {
  createContext as ze,
  useReducer as Zo,
  useCallback as Me,
  useMemo as Ne,
  useContext as qe,
  useLayoutEffect as Jo,
  useEffect as Oe,
  useRef as De,
  useState as ge,
  useId as kr,
  useInsertionEffect as Qo,
  cloneElement as ei,
  Children as Qe,
  isValidElement as Lr,
  Component as ti,
  createElement as tr,
  lazy as ni,
} from "react";
import {
  Tooltip as ri,
  Button as Ft,
  Spinner as oi,
  Card as Mt,
  CardTitle as Br,
  CardBody as $t,
  CloseButton as ii,
} from "reactstrap";
import si, { createPortal as Cn } from "react-dom";
import { Light as kt } from "react-syntax-highlighter";
var Tn = /* @__PURE__ */ ((e) => (
    (e.DBT_DOCS = "dbt-docs"),
    (e.DOCUMENTATION_EDITOR = "documentation-editor"),
    (e.SAAS = "saas"),
    e
  ))(Tn || {}),
  ai =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {};
function Ve(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var dn = { exports: {} },
  st = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr;
function ui() {
  if (nr) return st;
  nr = 1;
  var e = oe,
    t = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    n = Object.prototype.hasOwnProperty,
    r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(u, c, d) {
    var a,
      l = {},
      f = null,
      h = null;
    d !== void 0 && (f = "" + d),
      c.key !== void 0 && (f = "" + c.key),
      c.ref !== void 0 && (h = c.ref);
    for (a in c) n.call(c, a) && !i.hasOwnProperty(a) && (l[a] = c[a]);
    if (u && u.defaultProps)
      for (a in ((c = u.defaultProps), c)) l[a] === void 0 && (l[a] = c[a]);
    return {
      $$typeof: t,
      type: u,
      key: f,
      ref: h,
      props: l,
      _owner: r.current,
    };
  }
  return (st.Fragment = o), (st.jsx = s), (st.jsxs = s), st;
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
var rr;
function ci() {
  return (
    rr ||
      ((rr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = oe,
            t = Symbol.for("react.element"),
            o = Symbol.for("react.portal"),
            n = Symbol.for("react.fragment"),
            r = Symbol.for("react.strict_mode"),
            i = Symbol.for("react.profiler"),
            s = Symbol.for("react.provider"),
            u = Symbol.for("react.context"),
            c = Symbol.for("react.forward_ref"),
            d = Symbol.for("react.suspense"),
            a = Symbol.for("react.suspense_list"),
            l = Symbol.for("react.memo"),
            f = Symbol.for("react.lazy"),
            h = Symbol.for("react.offscreen"),
            p = Symbol.iterator,
            m = "@@iterator";
          function v(g) {
            if (g === null || typeof g != "object") return null;
            var P = (p && g[p]) || g[m];
            return typeof P == "function" ? P : null;
          }
          var E = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function b(g) {
            {
              for (
                var P = arguments.length,
                  B = new Array(P > 1 ? P - 1 : 0),
                  X = 1;
                X < P;
                X++
              )
                B[X - 1] = arguments[X];
              S("error", g, B);
            }
          }
          function S(g, P, B) {
            {
              var X = E.ReactDebugCurrentFrame,
                ie = X.getStackAddendum();
              ie !== "" && ((P += "%s"), (B = B.concat([ie])));
              var ce = B.map(function (re) {
                return String(re);
              });
              ce.unshift("Warning: " + P),
                Function.prototype.apply.call(console[g], console, ce);
            }
          }
          var A = !1,
            y = !1,
            N = !1,
            F = !1,
            _ = !1,
            H;
          H = Symbol.for("react.module.reference");
          function O(g) {
            return !!(
              typeof g == "string" ||
              typeof g == "function" ||
              g === n ||
              g === i ||
              _ ||
              g === r ||
              g === d ||
              g === a ||
              F ||
              g === h ||
              A ||
              y ||
              N ||
              (typeof g == "object" &&
                g !== null &&
                (g.$$typeof === f ||
                  g.$$typeof === l ||
                  g.$$typeof === s ||
                  g.$$typeof === u ||
                  g.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  g.$$typeof === H ||
                  g.getModuleId !== void 0))
            );
          }
          function k(g, P, B) {
            var X = g.displayName;
            if (X) return X;
            var ie = P.displayName || P.name || "";
            return ie !== "" ? B + "(" + ie + ")" : B;
          }
          function Z(g) {
            return g.displayName || "Context";
          }
          function G(g) {
            if (g == null) return null;
            if (
              (typeof g.tag == "number" &&
                b(
                  "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                ),
              typeof g == "function")
            )
              return g.displayName || g.name || null;
            if (typeof g == "string") return g;
            switch (g) {
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
              case a:
                return "SuspenseList";
            }
            if (typeof g == "object")
              switch (g.$$typeof) {
                case u:
                  var P = g;
                  return Z(P) + ".Consumer";
                case s:
                  var B = g;
                  return Z(B._context) + ".Provider";
                case c:
                  return k(g, g.render, "ForwardRef");
                case l:
                  var X = g.displayName || null;
                  return X !== null ? X : G(g.type) || "Memo";
                case f: {
                  var ie = g,
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
          var j = Object.assign,
            I = 0,
            T,
            x,
            D,
            L,
            C,
            R,
            U;
          function z() {}
          z.__reactDisabledLog = !0;
          function q() {
            {
              if (I === 0) {
                (T = console.log),
                  (x = console.info),
                  (D = console.warn),
                  (L = console.error),
                  (C = console.group),
                  (R = console.groupCollapsed),
                  (U = console.groupEnd);
                var g = {
                  configurable: !0,
                  enumerable: !0,
                  value: z,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: g,
                  log: g,
                  warn: g,
                  error: g,
                  group: g,
                  groupCollapsed: g,
                  groupEnd: g,
                });
              }
              I++;
            }
          }
          function K() {
            {
              if ((I--, I === 0)) {
                var g = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: j({}, g, {
                    value: T,
                  }),
                  info: j({}, g, {
                    value: x,
                  }),
                  warn: j({}, g, {
                    value: D,
                  }),
                  error: j({}, g, {
                    value: L,
                  }),
                  group: j({}, g, {
                    value: C,
                  }),
                  groupCollapsed: j({}, g, {
                    value: R,
                  }),
                  groupEnd: j({}, g, {
                    value: U,
                  }),
                });
              }
              I < 0 &&
                b(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                );
            }
          }
          var W = E.ReactCurrentDispatcher,
            Y;
          function J(g, P, B) {
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
                g
              );
            }
          }
          var Q = !1,
            V;
          {
            var le = typeof WeakMap == "function" ? WeakMap : Map;
            V = new le();
          }
          function $(g, P) {
            if (!g || Q) return "";
            {
              var B = V.get(g);
              if (B !== void 0) return B;
            }
            var X;
            Q = !0;
            var ie = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var ce;
            (ce = W.current), (W.current = null), q();
            try {
              if (P) {
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
                  Reflect.construct(g, [], re);
                } else {
                  try {
                    re.call();
                  } catch (Ie) {
                    X = Ie;
                  }
                  g.call(re.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Ie) {
                  X = Ie;
                }
                g();
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
                            g.displayName &&
                              Se.includes("<anonymous>") &&
                              (Se = Se.replace("<anonymous>", g.displayName)),
                            typeof g == "function" && V.set(g, Se),
                            Se
                          );
                        }
                      while (de >= 1 && pe >= 0);
                    break;
                  }
              }
            } finally {
              (Q = !1), (W.current = ce), K(), (Error.prepareStackTrace = ie);
            }
            var Ke = g ? g.displayName || g.name : "",
              er = Ke ? J(Ke) : "";
            return typeof g == "function" && V.set(g, er), er;
          }
          function he(g, P, B) {
            return $(g, !1);
          }
          function We(g) {
            var P = g.prototype;
            return !!(P && P.isReactComponent);
          }
          function ke(g, P, B) {
            if (g == null) return "";
            if (typeof g == "function") return $(g, We(g));
            if (typeof g == "string") return J(g);
            switch (g) {
              case d:
                return J("Suspense");
              case a:
                return J("SuspenseList");
            }
            if (typeof g == "object")
              switch (g.$$typeof) {
                case c:
                  return he(g.render);
                case l:
                  return ke(g.type, P, B);
                case f: {
                  var X = g,
                    ie = X._payload,
                    ce = X._init;
                  try {
                    return ke(ce(ie), P, B);
                  } catch {}
                }
              }
            return "";
          }
          var mt = Object.prototype.hasOwnProperty,
            Un = {},
            zn = E.ReactDebugCurrentFrame;
          function yt(g) {
            if (g) {
              var P = g._owner,
                B = ke(g.type, g._source, P ? P.type : null);
              zn.setExtraStackFrame(B);
            } else zn.setExtraStackFrame(null);
          }
          function xo(g, P, B, X, ie) {
            {
              var ce = Function.call.bind(mt);
              for (var re in g)
                if (ce(g, re)) {
                  var ne = void 0;
                  try {
                    if (typeof g[re] != "function") {
                      var ve = Error(
                        (X || "React class") +
                          ": " +
                          B +
                          " type `" +
                          re +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof g[re] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      );
                      throw ((ve.name = "Invariant Violation"), ve);
                    }
                    ne = g[re](
                      P,
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
                    (yt(ie),
                    b(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      X || "React class",
                      B,
                      re,
                      typeof ne,
                    ),
                    yt(null)),
                    ne instanceof Error &&
                      !(ne.message in Un) &&
                      ((Un[ne.message] = !0),
                      yt(ie),
                      b("Failed %s type: %s", B, ne.message),
                      yt(null));
                }
            }
          }
          var No = Array.isArray;
          function Yt(g) {
            return No(g);
          }
          function jo(g) {
            {
              var P = typeof Symbol == "function" && Symbol.toStringTag,
                B =
                  (P && g[Symbol.toStringTag]) ||
                  g.constructor.name ||
                  "Object";
              return B;
            }
          }
          function Po(g) {
            try {
              return qn(g), !1;
            } catch {
              return !0;
            }
          }
          function qn(g) {
            return "" + g;
          }
          function Vn(g) {
            if (Po(g))
              return (
                b(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  jo(g),
                ),
                qn(g)
              );
          }
          var it = E.ReactCurrentOwner,
            Fo = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Wn,
            Yn,
            Kt;
          Kt = {};
          function Mo(g) {
            if (mt.call(g, "ref")) {
              var P = Object.getOwnPropertyDescriptor(g, "ref").get;
              if (P && P.isReactWarning) return !1;
            }
            return g.ref !== void 0;
          }
          function $o(g) {
            if (mt.call(g, "key")) {
              var P = Object.getOwnPropertyDescriptor(g, "key").get;
              if (P && P.isReactWarning) return !1;
            }
            return g.key !== void 0;
          }
          function ko(g, P) {
            if (
              typeof g.ref == "string" &&
              it.current &&
              P &&
              it.current.stateNode !== P
            ) {
              var B = G(it.current.type);
              Kt[B] ||
                (b(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  G(it.current.type),
                  g.ref,
                ),
                (Kt[B] = !0));
            }
          }
          function Lo(g, P) {
            {
              var B = function () {
                Wn ||
                  ((Wn = !0),
                  b(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    P,
                  ));
              };
              (B.isReactWarning = !0),
                Object.defineProperty(g, "key", {
                  get: B,
                  configurable: !0,
                });
            }
          }
          function Bo(g, P) {
            {
              var B = function () {
                Yn ||
                  ((Yn = !0),
                  b(
                    "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    P,
                  ));
              };
              (B.isReactWarning = !0),
                Object.defineProperty(g, "ref", {
                  get: B,
                  configurable: !0,
                });
            }
          }
          var Ho = function (g, P, B, X, ie, ce, re) {
            var ne = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: g,
              key: P,
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
          function Uo(g, P, B, X, ie) {
            {
              var ce,
                re = {},
                ne = null,
                ve = null;
              B !== void 0 && (Vn(B), (ne = "" + B)),
                $o(P) && (Vn(P.key), (ne = "" + P.key)),
                Mo(P) && ((ve = P.ref), ko(P, ie));
              for (ce in P)
                mt.call(P, ce) && !Fo.hasOwnProperty(ce) && (re[ce] = P[ce]);
              if (g && g.defaultProps) {
                var de = g.defaultProps;
                for (ce in de) re[ce] === void 0 && (re[ce] = de[ce]);
              }
              if (ne || ve) {
                var pe =
                  typeof g == "function"
                    ? g.displayName || g.name || "Unknown"
                    : g;
                ne && Lo(re, pe), ve && Bo(re, pe);
              }
              return Ho(g, ne, ve, ie, X, it.current, re);
            }
          }
          var Gt = E.ReactCurrentOwner,
            Kn = E.ReactDebugCurrentFrame;
          function Ye(g) {
            if (g) {
              var P = g._owner,
                B = ke(g.type, g._source, P ? P.type : null);
              Kn.setExtraStackFrame(B);
            } else Kn.setExtraStackFrame(null);
          }
          var Xt;
          Xt = !1;
          function Zt(g) {
            return typeof g == "object" && g !== null && g.$$typeof === t;
          }
          function Gn() {
            {
              if (Gt.current) {
                var g = G(Gt.current.type);
                if (g)
                  return (
                    `

Check the render method of \`` +
                    g +
                    "`."
                  );
              }
              return "";
            }
          }
          function zo(g) {
            {
              if (g !== void 0) {
                var P = g.fileName.replace(/^.*[\\\/]/, ""),
                  B = g.lineNumber;
                return (
                  `

Check your code at ` +
                  P +
                  ":" +
                  B +
                  "."
                );
              }
              return "";
            }
          }
          var Xn = {};
          function qo(g) {
            {
              var P = Gn();
              if (!P) {
                var B = typeof g == "string" ? g : g.displayName || g.name;
                B &&
                  (P =
                    `

Check the top-level render call using <` +
                    B +
                    ">.");
              }
              return P;
            }
          }
          function Zn(g, P) {
            {
              if (!g._store || g._store.validated || g.key != null) return;
              g._store.validated = !0;
              var B = qo(P);
              if (Xn[B]) return;
              Xn[B] = !0;
              var X = "";
              g &&
                g._owner &&
                g._owner !== Gt.current &&
                (X = " It was passed a child from " + G(g._owner.type) + "."),
                Ye(g),
                b(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  B,
                  X,
                ),
                Ye(null);
            }
          }
          function Jn(g, P) {
            {
              if (typeof g != "object") return;
              if (Yt(g))
                for (var B = 0; B < g.length; B++) {
                  var X = g[B];
                  Zt(X) && Zn(X, P);
                }
              else if (Zt(g)) g._store && (g._store.validated = !0);
              else if (g) {
                var ie = v(g);
                if (typeof ie == "function" && ie !== g.entries)
                  for (var ce = ie.call(g), re; !(re = ce.next()).done; )
                    Zt(re.value) && Zn(re.value, P);
              }
            }
          }
          function Vo(g) {
            {
              var P = g.type;
              if (P == null || typeof P == "string") return;
              var B;
              if (typeof P == "function") B = P.propTypes;
              else if (
                typeof P == "object" &&
                (P.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  P.$$typeof === l)
              )
                B = P.propTypes;
              else return;
              if (B) {
                var X = G(P);
                xo(B, g.props, "prop", X, g);
              } else if (P.PropTypes !== void 0 && !Xt) {
                Xt = !0;
                var ie = G(P);
                b(
                  "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                  ie || "Unknown",
                );
              }
              typeof P.getDefaultProps == "function" &&
                !P.getDefaultProps.isReactClassApproved &&
                b(
                  "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                );
            }
          }
          function Wo(g) {
            {
              for (var P = Object.keys(g.props), B = 0; B < P.length; B++) {
                var X = P[B];
                if (X !== "children" && X !== "key") {
                  Ye(g),
                    b(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      X,
                    ),
                    Ye(null);
                  break;
                }
              }
              g.ref !== null &&
                (Ye(g),
                b("Invalid attribute `ref` supplied to `React.Fragment`."),
                Ye(null));
            }
          }
          function Qn(g, P, B, X, ie, ce) {
            {
              var re = O(g);
              if (!re) {
                var ne = "";
                (g === void 0 ||
                  (typeof g == "object" &&
                    g !== null &&
                    Object.keys(g).length === 0)) &&
                  (ne +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var ve = zo(ie);
                ve ? (ne += ve) : (ne += Gn());
                var de;
                g === null
                  ? (de = "null")
                  : Yt(g)
                  ? (de = "array")
                  : g !== void 0 && g.$$typeof === t
                  ? ((de = "<" + (G(g.type) || "Unknown") + " />"),
                    (ne =
                      " Did you accidentally export a JSX literal instead of a component?"))
                  : (de = typeof g),
                  b(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    de,
                    ne,
                  );
              }
              var pe = Uo(g, P, B, ie, ce);
              if (pe == null) return pe;
              if (re) {
                var Se = P.children;
                if (Se !== void 0)
                  if (X)
                    if (Yt(Se)) {
                      for (var Ke = 0; Ke < Se.length; Ke++) Jn(Se[Ke], g);
                      Object.freeze && Object.freeze(Se);
                    } else
                      b(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else Jn(Se, g);
              }
              return g === n ? Wo(pe) : Vo(pe), pe;
            }
          }
          function Yo(g, P, B) {
            return Qn(g, P, B, !0);
          }
          function Ko(g, P, B) {
            return Qn(g, P, B, !1);
          }
          var Go = Ko,
            Xo = Yo;
          (at.Fragment = n), (at.jsx = Go), (at.jsxs = Xo);
        })()),
    at
  );
}
process.env.NODE_ENV === "production"
  ? (dn.exports = ui())
  : (dn.exports = ci());
var w = dn.exports;
const li = () => {
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
var Hr = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function (e, t) {
  (function (o, n) {
    e.exports = n();
  })(window, function () {
    return (function (o) {
      var n = {};
      function r(i) {
        if (n[i]) return n[i].exports;
        var s = (n[i] = { i, l: !1, exports: {} });
        return o[i].call(s.exports, s, s.exports, r), (s.l = !0), s.exports;
      }
      return (
        (r.m = o),
        (r.c = n),
        (r.d = function (i, s, u) {
          r.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: u });
        }),
        (r.r = function (i) {
          typeof Symbol < "u" &&
            Symbol.toStringTag &&
            Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(i, "__esModule", { value: !0 });
        }),
        (r.t = function (i, s) {
          if (
            (1 & s && (i = r(i)),
            8 & s || (4 & s && typeof i == "object" && i && i.__esModule))
          )
            return i;
          var u = /* @__PURE__ */ Object.create(null);
          if (
            (r.r(u),
            Object.defineProperty(u, "default", { enumerable: !0, value: i }),
            2 & s && typeof i != "string")
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
          var s =
            i && i.__esModule
              ? function () {
                  return i.default;
                }
              : function () {
                  return i;
                };
          return r.d(s, "a", s), s;
        }),
        (r.o = function (i, s) {
          return Object.prototype.hasOwnProperty.call(i, s);
        }),
        (r.p = ""),
        r((r.s = 7))
      );
    })([
      function (o, n, r) {
        var i,
          s =
            (this && this.__extends) ||
            ((i = function (l, f) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (h, p) {
                    h.__proto__ = p;
                  }) ||
                function (h, p) {
                  for (var m in p)
                    Object.prototype.hasOwnProperty.call(p, m) && (h[m] = p[m]);
                })(l, f);
            }),
            function (l, f) {
              function h() {
                this.constructor = l;
              }
              i(l, f),
                (l.prototype =
                  f === null
                    ? Object.create(f)
                    : ((h.prototype = f.prototype), new h()));
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
        var a = (function (l) {
          function f() {
            return (l !== null && l.apply(this, arguments)) || this;
          }
          return s(f, l), f;
        })(d.default);
        n.eventEmitter = new a();
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
              var a = typeof Symbol == "function" && c[Symbol.iterator];
              if (!a) return c;
              var l,
                f,
                h = a.call(c),
                p = [];
              try {
                for (; (d === void 0 || d-- > 0) && !(l = h.next()).done; )
                  p.push(l.value);
              } catch (m) {
                f = { error: m };
              } finally {
                try {
                  l && !l.done && (a = h.return) && a.call(h);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          s =
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
            (c.prototype.on = function (d, a) {
              return (
                this.handlersMap[d] || (this.handlersMap[d] = []),
                this.handlersMap[d].push(a),
                this
              );
            }),
            (c.prototype.off = function (d, a) {
              return (
                this.handlersMap[d] &&
                  this.handlersMap[d].splice(
                    this.handlersMap[d].indexOf(a) >>> 0,
                    1,
                  ),
                this
              );
            }),
            (c.prototype.emit = function (d) {
              for (var a = [], l = 1; l < arguments.length; l++)
                a[l - 1] = arguments[l];
              return (
                this.handlersMap[d] &&
                  this.handlersMap[d].slice().forEach(function (f) {
                    f.apply(void 0, s(a));
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
        var s = i(r(5)),
          u = r(9),
          c = (function () {
            function d(a, l, f, h, p) {
              (this.startMeta = a),
                (this.endMeta = l),
                (this.text = f),
                (this.id = h),
                (this.__isHighlightSource = {}),
                p && (this.extra = p);
            }
            return (
              (d.prototype.deSerialize = function (a, l) {
                var f = u.queryElementNode(this, a),
                  h = f.start,
                  p = f.end,
                  m = u.getTextChildByOffset(h, this.startMeta.textOffset),
                  v = u.getTextChildByOffset(p, this.endMeta.textOffset);
                if (!l.Serialize.Restore.isEmpty()) {
                  var E = l.Serialize.Restore.call(this, m, v) || [];
                  (m = E[0] || m), (v = E[1] || v);
                }
                return new s.default(m, v, this.text, this.id, !0);
              }),
              d
            );
          })();
        n.default = c;
      },
      function (o, n, r) {
        var i =
            (this && this.__values) ||
            function (a) {
              var l = typeof Symbol == "function" && Symbol.iterator,
                f = l && a[l],
                h = 0;
              if (f) return f.call(a);
              if (a && typeof a.length == "number")
                return {
                  next: function () {
                    return (
                      a && h >= a.length && (a = void 0),
                      { value: a && a[h++], done: !a }
                    );
                  },
                };
              throw new TypeError(
                l
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          s =
            (this && this.__read) ||
            function (a, l) {
              var f = typeof Symbol == "function" && a[Symbol.iterator];
              if (!f) return a;
              var h,
                p,
                m = f.call(a),
                v = [];
              try {
                for (; (l === void 0 || l-- > 0) && !(h = m.next()).done; )
                  v.push(h.value);
              } catch (E) {
                p = { error: E };
              } finally {
                try {
                  h && !h.done && (f = m.return) && f.call(m);
                } finally {
                  if (p) throw p.error;
                }
              }
              return v;
            },
          u =
            (this && this.__spread) ||
            function () {
              for (var a = [], l = 0; l < arguments.length; l++)
                a = a.concat(s(arguments[l]));
              return a;
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
        n.isHighlightWrapNode = function (a) {
          return !!a.dataset && !!a.dataset[c.CAMEL_DATASET_IDENTIFIER];
        };
        var d = function (a, l) {
          for (var f = !1, h = null; a; ) {
            if ((n.isHighlightWrapNode(a) && (h = a), a === l)) {
              f = !0;
              break;
            }
            a = a.parentNode;
          }
          return f ? h : null;
        };
        (n.getHighlightId = function (a, l) {
          return (a = d(a, l)) ? a.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
        }),
          (n.getExtraHighlightId = function (a, l) {
            return (a = d(a, l))
              ? a.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA]
                  .split(c.ID_DIVISION)
                  .filter(function (f) {
                    return f;
                  })
              : [];
          }),
          (n.getHighlightsByRoot = function (a, l) {
            var f, h;
            Array.isArray(a) || (a = [a]);
            var p = [];
            try {
              for (var m = i(a), v = m.next(); !v.done; v = m.next()) {
                var E = v.value.querySelectorAll(
                  l + "[data-" + c.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, E);
              }
            } catch (b) {
              f = { error: b };
            } finally {
              try {
                v && !v.done && (h = m.return) && h.call(m);
              } finally {
                if (f) throw f.error;
              }
            }
            return p;
          }),
          (n.getHighlightById = function (a, l, f) {
            var h,
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
              E = a.querySelectorAll(f + "[data-" + c.DATASET_IDENTIFIER + "]");
            try {
              for (var b = i(E), S = b.next(); !S.done; S = b.next()) {
                var A = S.value;
                if (A.dataset[c.CAMEL_DATASET_IDENTIFIER] !== l) {
                  var y = A.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  v.test(y) && m.push(A);
                } else m.push(A);
              }
            } catch (N) {
              h = { error: N };
            } finally {
              try {
                S && !S.done && (p = b.return) && p.call(b);
              } finally {
                if (h) throw h.error;
              }
            }
            return m;
          }),
          (n.forEach = function (a, l) {
            for (var f = 0; f < a.length; f++) l(a[f], f, a);
          }),
          (n.removeEventListener = function (a, l, f) {
            a.removeEventListener(l, f);
          }),
          (n.addEventListener = function (a, l, f) {
            return (
              a.addEventListener(l, f),
              function () {
                n.removeEventListener(a, l, f);
              }
            );
          }),
          (n.addClass = function (a, l) {
            var f;
            Array.isArray(l) || (l = [l]), (f = a.classList).add.apply(f, u(l));
          }),
          (n.removeClass = function (a, l) {
            a.classList.remove(l);
          }),
          (n.removeAllClass = function (a) {
            a.className = "";
          }),
          (n.hasClass = function (a, l) {
            return a.classList.contains(l);
          });
      },
      function (o, n, r) {
        var i =
          (this && this.__importDefault) ||
          function (h) {
            return h && h.__esModule ? h : { default: h };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = i(r(3)),
          u = r(1),
          c = r(11),
          d = i(r(6)),
          a = r(12),
          l = r(0),
          f = (function () {
            function h(p, m, v, E, b) {
              b === void 0 && (b = !1),
                (p.$node.nodeType === 3 && m.$node.nodeType === 3) ||
                  l.eventEmitter.emit(l.INTERNAL_ERROR_EVENT, {
                    type: u.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = a.formatDomNode(p)),
                (this.end = a.formatDomNode(m)),
                (this.text = v),
                (this.frozen = b),
                (this.id = E);
            }
            return (
              (h.fromSelection = function (p) {
                var m = c.getDomRange();
                if (!m) return null;
                var v = { $node: m.startContainer, offset: m.startOffset },
                  E = { $node: m.endContainer, offset: m.endOffset },
                  b = m.toString(),
                  S = p.call(v, E, b);
                return new h(v, E, b, (S = S ?? d.default()));
              }),
              (h.prototype.serialize = function (p, m) {
                var v,
                  E = a.getDomMeta(this.start.$node, this.start.offset, p),
                  b = a.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  m.Serialize.RecordInfo.isEmpty() ||
                    (v = m.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new s.default(E, b, this.text, this.id, v)
                );
              }),
              (h.removeDomRange = c.removeSelection),
              h
            );
          })();
        n.default = f;
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function i(s) {
            return s
              ? (s ^ ((16 * Math.random()) >> (s / 4))).toString(16)
              : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, i);
          });
      },
      function (o, n, r) {
        o.exports = r(8);
      },
      function (o, n, r) {
        var i,
          s =
            (this && this.__extends) ||
            ((i = function (y, N) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (F, _) {
                    F.__proto__ = _;
                  }) ||
                function (F, _) {
                  for (var H in _)
                    Object.prototype.hasOwnProperty.call(_, H) && (F[H] = _[H]);
                })(y, N);
            }),
            function (y, N) {
              function F() {
                this.constructor = y;
              }
              i(y, N),
                (y.prototype =
                  N === null
                    ? Object.create(N)
                    : ((F.prototype = N.prototype), new F()));
            }),
          u =
            (this && this.__assign) ||
            function () {
              return (u =
                Object.assign ||
                function (y) {
                  for (var N, F = 1, _ = arguments.length; F < _; F++)
                    for (var H in (N = arguments[F]))
                      Object.prototype.hasOwnProperty.call(N, H) &&
                        (y[H] = N[H]);
                  return y;
                }).apply(this, arguments);
            },
          c =
            (this && this.__importDefault) ||
            function (y) {
              return y && y.__esModule ? y : { default: y };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var d = c(r(2)),
          a = c(r(5)),
          l = c(r(3)),
          f = c(r(6)),
          h = c(r(13)),
          p = c(r(14)),
          m = c(r(16)),
          v = c(r(17)),
          E = r(0),
          b = r(1),
          S = r(4),
          A = (function (y) {
            function N(F) {
              var _ = y.call(this) || this;
              (_.event = p.default()),
                (_.run = function () {
                  return S.addEventListener(
                    _.options.$root,
                    _.event.PointerEnd,
                    _._handleSelection,
                  );
                }),
                (_.stop = function () {
                  S.removeEventListener(
                    _.options.$root,
                    _.event.PointerEnd,
                    _._handleSelection,
                  );
                }),
                (_.addClass = function (O, k) {
                  _.getDoms(k).forEach(function (Z) {
                    S.addClass(Z, O);
                  });
                }),
                (_.removeClass = function (O, k) {
                  _.getDoms(k).forEach(function (Z) {
                    S.removeClass(Z, O);
                  });
                }),
                (_.getIdByDom = function (O) {
                  return S.getHighlightId(O, _.options.$root);
                }),
                (_.getExtraIdByDom = function (O) {
                  return S.getExtraHighlightId(O, _.options.$root);
                }),
                (_.getDoms = function (O) {
                  return O
                    ? S.getHighlightById(_.options.$root, O, _.options.wrapTag)
                    : S.getHighlightsByRoot(_.options.$root, _.options.wrapTag);
                }),
                (_.dispose = function () {
                  var O = _.options.$root;
                  S.removeEventListener(
                    O,
                    _.event.PointerOver,
                    _._handleHighlightHover,
                  ),
                    S.removeEventListener(
                      O,
                      _.event.PointerEnd,
                      _._handleSelection,
                    ),
                    S.removeEventListener(
                      O,
                      _.event.PointerTap,
                      _._handleHighlightClick,
                    ),
                    _.removeAll();
                }),
                (_.setOption = function (O) {
                  (_.options = u(u({}, _.options), O)),
                    (_.painter = new v.default(
                      {
                        $root: _.options.$root,
                        wrapTag: _.options.wrapTag,
                        className: _.options.style.className,
                        exceptSelectors: _.options.exceptSelectors,
                      },
                      _.hooks,
                    ));
                }),
                (_.fromRange = function (O) {
                  var k = { $node: O.startContainer, offset: O.startOffset },
                    Z = { $node: O.endContainer, offset: O.endOffset },
                    G = O.toString(),
                    j = _.hooks.Render.UUID.call(k, Z, G);
                  j = j ?? f.default();
                  var I = new a.default(k, Z, G, j);
                  return I
                    ? _._highlightFromHRange(I)
                    : (E.eventEmitter.emit(E.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (_.fromStore = function (O, k, Z, G, j) {
                  var I = new l.default(O, k, Z, G, j);
                  try {
                    return _._highlightFromHSource(I), I;
                  } catch (T) {
                    return (
                      E.eventEmitter.emit(E.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.HIGHLIGHT_SOURCE_RECREATE,
                        error: T,
                        detail: I,
                      }),
                      null
                    );
                  }
                }),
                (_._getHooks = function () {
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
                (_._highlightFromHRange = function (O) {
                  var k = O.serialize(_.options.$root, _.hooks);
                  return _.painter.highlightRange(O).length === 0
                    ? (E.eventEmitter.emit(E.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (_.cache.save(k),
                      _.emit(
                        b.EventType.CREATE,
                        { sources: [k], type: b.CreateFrom.INPUT },
                        _,
                      ),
                      k);
                }),
                (_._handleSelection = function () {
                  var O = a.default.fromSelection(_.hooks.Render.UUID);
                  O && (_._highlightFromHRange(O), a.default.removeDomRange());
                }),
                (_._handleHighlightHover = function (O) {
                  var k = O.target;
                  if (!S.isHighlightWrapNode(k))
                    return (
                      _._hoverId &&
                        _.emit(b.EventType.HOVER_OUT, { id: _._hoverId }, _, O),
                      void (_._hoverId = null)
                    );
                  var Z = S.getHighlightId(k, _.options.$root);
                  _._hoverId !== Z &&
                    (_._hoverId &&
                      _.emit(b.EventType.HOVER_OUT, { id: _._hoverId }, _, O),
                    (_._hoverId = Z),
                    _.emit(b.EventType.HOVER, { id: _._hoverId }, _, O));
                }),
                (_._handleError = function (O) {
                  _.options.verbose && console.warn(O);
                }),
                (_._handleHighlightClick = function (O) {
                  var k = O.target;
                  if (S.isHighlightWrapNode(k)) {
                    var Z = S.getHighlightId(k, _.options.$root);
                    _.emit(b.EventType.CLICK, { id: Z }, _, O);
                  }
                }),
                (_.options = E.getDefaultOptions()),
                (_.hooks = _._getHooks()),
                _.setOption(F),
                (_.cache = new m.default());
              var H = _.options.$root;
              return (
                S.addEventListener(
                  H,
                  _.event.PointerOver,
                  _._handleHighlightHover,
                ),
                S.addEventListener(
                  H,
                  _.event.PointerTap,
                  _._handleHighlightClick,
                ),
                E.eventEmitter.on(E.INTERNAL_ERROR_EVENT, _._handleError),
                _
              );
            }
            return (
              s(N, y),
              (N.prototype.remove = function (F) {
                if (F) {
                  var _ = this.painter.removeHighlight(F);
                  this.cache.remove(F),
                    _ && this.emit(b.EventType.REMOVE, { ids: [F] }, this);
                }
              }),
              (N.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var F = this.cache.removeAll();
                this.emit(b.EventType.REMOVE, { ids: F }, this);
              }),
              (N.prototype._highlightFromHSource = function (F) {
                F === void 0 && (F = []);
                var _ = this.painter.highlightSource(F);
                this.emit(
                  b.EventType.CREATE,
                  { sources: _, type: b.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(F);
              }),
              (N.event = b.EventType),
              (N.isHighlightWrapNode = S.isHighlightWrapNode),
              (N.isHighlightSource = function (F) {
                return !!F.__isHighlightSource;
              }),
              N
            );
          })(d.default);
        n.default = A;
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.queryElementNode = n.getTextChildByOffset = void 0);
        var i = r(0);
        (n.getTextChildByOffset = function (s, u) {
          for (var c = [s], d = null, a = 0, l = 0; (d = c.pop()); ) {
            for (var f = d.childNodes, h = f.length - 1; h >= 0; h--)
              c.push(f[h]);
            if (
              d.nodeType === 3 &&
              ((l = u - a), (a += d.textContent.length) >= u)
            )
              break;
          }
          return d || (d = s), { $node: d, offset: l };
        }),
          (n.queryElementNode = function (s, u) {
            return {
              start:
                s.startMeta.parentIndex === i.ROOT_IDX
                  ? u
                  : u.getElementsByTagName(s.startMeta.parentTagName)[
                      s.startMeta.parentIndex
                    ],
              end:
                s.endMeta.parentIndex === i.ROOT_IDX
                  ? u
                  : u.getElementsByTagName(s.endMeta.parentTagName)[
                      s.endMeta.parentIndex
                    ],
            };
          });
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (i) {
            return i.split("-").reduce(function (s, u, c) {
              return s + (c === 0 ? u : u[0].toUpperCase() + u.slice(1));
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
        (n.getDomMeta = function (s, u, c) {
          var d = (function (f) {
              if (
                f instanceof HTMLElement &&
                (!f.dataset || !f.dataset[i.CAMEL_DATASET_IDENTIFIER])
              )
                return f;
              for (
                var h = f.parentNode;
                h != null && h.dataset[i.CAMEL_DATASET_IDENTIFIER];

              )
                h = h.parentNode;
              return h;
            })(s),
            a =
              d === c
                ? i.ROOT_IDX
                : (function (f, h) {
                    for (
                      var p = f.tagName, m = h.getElementsByTagName(p), v = 0;
                      v < m.length;
                      v++
                    )
                      if (f === m[v]) return v;
                    return i.UNKNOWN_IDX;
                  })(d, c),
            l = (function (f, h) {
              for (var p = [f], m = null, v = 0; (m = p.pop()); ) {
                for (var E = m.childNodes, b = E.length - 1; b >= 0; b--)
                  p.push(E[b]);
                if (m.nodeType === 3 && m !== h) v += m.textContent.length;
                else if (m.nodeType === 3) break;
              }
              return v;
            })(d, s);
          return {
            parentTagName: d.tagName,
            parentIndex: a,
            textOffset: l + u,
          };
        }),
          (n.formatDomNode = function (s) {
            return s.$node.nodeType === 3 ||
              s.$node.nodeType === 4 ||
              s.$node.nodeType === 8
              ? s
              : { $node: s.$node.childNodes[s.offset], offset: 0 };
          });
      },
      function (o, n, r) {
        var i =
            (this && this.__read) ||
            function (c, d) {
              var a = typeof Symbol == "function" && c[Symbol.iterator];
              if (!a) return c;
              var l,
                f,
                h = a.call(c),
                p = [];
              try {
                for (; (d === void 0 || d-- > 0) && !(l = h.next()).done; )
                  p.push(l.value);
              } catch (m) {
                f = { error: m };
              } finally {
                try {
                  l && !l.done && (a = h.return) && a.call(h);
                } finally {
                  if (f) throw f.error;
                }
              }
              return p;
            },
          s =
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
              var a = this;
              return (
                this.ops.indexOf(d) === -1 && this.ops.push(d),
                function () {
                  a.remove(d);
                }
              );
            }),
            (c.prototype.remove = function (d) {
              var a = this.ops.indexOf(d);
              a < 0 || this.ops.splice(a, 1);
            }),
            (c.prototype.isEmpty = function () {
              return this.ops.length === 0;
            }),
            (c.prototype.call = function () {
              for (var d, a = [], l = 0; l < arguments.length; l++)
                a[l] = arguments[l];
              return (
                this.ops.forEach(function (f) {
                  d = f.apply(void 0, s(a));
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
        var s = r(1),
          u = i(r(15));
        n.default = function () {
          var c = u.default(window.navigator.userAgent);
          return {
            PointerEnd: c
              ? s.UserInputEvent.touchend
              : s.UserInputEvent.mouseup,
            PointerTap: c
              ? s.UserInputEvent.touchstart
              : s.UserInputEvent.click,
            PointerOver: c
              ? s.UserInputEvent.touchstart
              : s.UserInputEvent.mouseover,
          };
        };
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i =
          /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
        n.default = function (s) {
          return i.test(s);
        };
      },
      function (o, n, r) {
        var i,
          s =
            (this && this.__extends) ||
            ((i = function (f, h) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (p, m) {
                    p.__proto__ = m;
                  }) ||
                function (p, m) {
                  for (var v in m)
                    Object.prototype.hasOwnProperty.call(m, v) && (p[v] = m[v]);
                })(f, h);
            }),
            function (f, h) {
              function p() {
                this.constructor = f;
              }
              i(f, h),
                (f.prototype =
                  h === null
                    ? Object.create(h)
                    : ((p.prototype = h.prototype), new p()));
            }),
          u =
            (this && this.__values) ||
            function (f) {
              var h = typeof Symbol == "function" && Symbol.iterator,
                p = h && f[h],
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
                h
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
          a = r(1),
          l = (function (f) {
            function h() {
              var p = (f !== null && f.apply(this, arguments)) || this;
              return (p._data = /* @__PURE__ */ new Map()), p;
            }
            return (
              s(h, f),
              Object.defineProperty(h.prototype, "data", {
                get: function () {
                  return this.getAll();
                },
                set: function (p) {
                  throw a.ERROR.CACHE_SET_ERROR;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (h.prototype.save = function (p) {
                var m = this;
                Array.isArray(p)
                  ? p.forEach(function (v) {
                      return m._data.set(v.id, v);
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
                  v = [];
                try {
                  for (
                    var E = u(this._data), b = E.next();
                    !b.done;
                    b = E.next()
                  ) {
                    var S = b.value;
                    v.push(S[1]);
                  }
                } catch (A) {
                  p = { error: A };
                } finally {
                  try {
                    b && !b.done && (m = E.return) && m.call(E);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return v;
              }),
              (h.prototype.removeAll = function () {
                var p,
                  m,
                  v = [];
                try {
                  for (
                    var E = u(this._data), b = E.next();
                    !b.done;
                    b = E.next()
                  ) {
                    var S = b.value;
                    v.push(S[0]);
                  }
                } catch (A) {
                  p = { error: A };
                } finally {
                  try {
                    b && !b.done && (m = E.return) && m.call(E);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return (this._data = /* @__PURE__ */ new Map()), v;
              }),
              h
            );
          })(d.default);
        n.default = l;
      },
      function (o, n, r) {
        var i =
            (this && this.__values) ||
            function (v) {
              var E = typeof Symbol == "function" && Symbol.iterator,
                b = E && v[E],
                S = 0;
              if (b) return b.call(v);
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
                E
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          s =
            (this && this.__read) ||
            function (v, E) {
              var b = typeof Symbol == "function" && v[Symbol.iterator];
              if (!b) return v;
              var S,
                A,
                y = b.call(v),
                N = [];
              try {
                for (; (E === void 0 || E-- > 0) && !(S = y.next()).done; )
                  N.push(S.value);
              } catch (F) {
                A = { error: F };
              } finally {
                try {
                  S && !S.done && (b = y.return) && b.call(y);
                } finally {
                  if (A) throw A.error;
                }
              }
              return N;
            },
          u =
            (this && this.__spread) ||
            function () {
              for (var v = [], E = 0; E < arguments.length; E++)
                v = v.concat(s(arguments[E]));
              return v;
            },
          c =
            (this && this.__importDefault) ||
            function (v) {
              return v && v.__esModule ? v : { default: v };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var d = c(r(3)),
          a = r(18),
          l = r(4),
          f = r(1),
          h = r(20),
          p = r(0),
          m = (function () {
            function v(E, b) {
              (this.options = {
                $root: E.$root,
                wrapTag: E.wrapTag,
                exceptSelectors: E.exceptSelectors,
                className: E.className,
              }),
                (this.hooks = b),
                h.initDefaultStylesheet();
            }
            return (
              (v.prototype.highlightRange = function (E) {
                var b = this;
                if (!E.frozen) throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var S = this.options,
                  A = S.$root,
                  y = S.className,
                  N = S.exceptSelectors,
                  F = this.hooks,
                  _ = a.getSelectedNodes(A, E.start, E.end, N);
                return (
                  F.Render.SelectedNodes.isEmpty() ||
                    (_ = F.Render.SelectedNodes.call(E.id, _) || []),
                  _.map(function (H) {
                    var O = a.wrapHighlight(H, E, y, b.options.wrapTag);
                    return (
                      F.Render.WrapNode.isEmpty() ||
                        (O = F.Render.WrapNode.call(E.id, O)),
                      O
                    );
                  })
                );
              }),
              (v.prototype.highlightSource = function (E) {
                var b = this,
                  S = Array.isArray(E) ? E : [E],
                  A = [];
                return (
                  S.forEach(function (y) {
                    if (y instanceof d.default) {
                      var N = y.deSerialize(b.options.$root, b.hooks);
                      b.highlightRange(N).length > 0
                        ? A.push(y)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: y,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: f.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  A
                );
              }),
              (v.prototype.removeHighlight = function (E) {
                var b,
                  S,
                  A = new RegExp(
                    "(" +
                      E +
                      "\\" +
                      p.ID_DIVISION +
                      "|\\" +
                      p.ID_DIVISION +
                      "?" +
                      E +
                      "$)",
                  ),
                  y = this.hooks,
                  N = this.options.wrapTag,
                  F = document.querySelectorAll(
                    N + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  _ = [],
                  H = [],
                  O = [];
                try {
                  for (var k = i(F), Z = k.next(); !Z.done; Z = k.next()) {
                    var G = Z.value,
                      j = G.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      I = G.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    j !== E || I
                      ? j === E
                        ? H.push(G)
                        : j !== E && A.test(I) && O.push(G)
                      : _.push(G);
                  }
                } catch (T) {
                  b = { error: T };
                } finally {
                  try {
                    Z && !Z.done && (S = k.return) && S.call(k);
                  } finally {
                    if (b) throw b.error;
                  }
                }
                return (
                  _.forEach(function (T) {
                    var x = T.parentNode,
                      D = document.createDocumentFragment();
                    l.forEach(T.childNodes, function (R) {
                      return D.appendChild(R.cloneNode(!1));
                    });
                    var L = T.previousSibling,
                      C = T.nextSibling;
                    x.replaceChild(D, T),
                      a.normalizeSiblingText(L, !0),
                      a.normalizeSiblingText(C, !1),
                      y.Remove.UpdateNodes.call(E, T, "remove");
                  }),
                  H.forEach(function (T) {
                    var x = T.dataset,
                      D = x[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      L = D.shift(),
                      C = document.querySelector(
                        N + "[data-" + p.DATASET_IDENTIFIER + '="' + L + '"]',
                      );
                    C && (l.removeAllClass(T), l.addClass(T, u(C.classList))),
                      (x[p.CAMEL_DATASET_IDENTIFIER] = L),
                      (x[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = D.join(
                        p.ID_DIVISION,
                      )),
                      y.Remove.UpdateNodes.call(E, T, "id-update");
                  }),
                  O.forEach(function (T) {
                    var x = T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = x.replace(
                      A,
                      "",
                    )),
                      y.Remove.UpdateNodes.call(E, T, "extra-update");
                  }),
                  _.length + H.length + O.length !== 0
                );
              }),
              (v.prototype.removeAllHighlight = function () {
                var E = this.options,
                  b = E.wrapTag,
                  S = E.$root;
                l.getHighlightsByRoot(S, b).forEach(function (A) {
                  var y = A.parentNode,
                    N = document.createDocumentFragment();
                  l.forEach(A.childNodes, function (F) {
                    return N.appendChild(F.cloneNode(!1));
                  }),
                    y.replaceChild(N, A);
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
              var E,
                b,
                S = v.call(p),
                A = [];
              try {
                for (; (m === void 0 || m-- > 0) && !(E = S.next()).done; )
                  A.push(E.value);
              } catch (y) {
                b = { error: y };
              } finally {
                try {
                  E && !E.done && (v = S.return) && v.call(S);
                } finally {
                  if (b) throw b.error;
                }
              }
              return A;
            },
          s =
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
          a = r(19),
          l = function (p, m) {
            if (!p) return !1;
            if (/^\./.test(m)) {
              var v = m.replace(/^\./, "");
              return p && c.hasClass(p, v);
            }
            if (/^#/.test(m)) {
              var E = m.replace(/^#/, "");
              return p && p.id === E;
            }
            var b = m.toUpperCase();
            return p && p.tagName === b;
          };
        n.getSelectedNodes = function (p, m, v, E) {
          var b = m.$node,
            S = v.$node,
            A = m.offset,
            y = v.offset;
          if (b === S && b instanceof Text)
            return (function (j, I, T, x) {
              for (
                var D = j,
                  L = function (R) {
                    return x == null
                      ? void 0
                      : x.some(function (U) {
                          return l(R, U);
                        });
                  };
                D;

              ) {
                if (D.nodeType === 1 && L(D)) return [];
                D = D.parentNode;
              }
              j.splitText(I);
              var C = j.nextSibling;
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
            })(b, A, y, E);
          for (
            var N = [p],
              F = [],
              _ = function (j) {
                return E == null
                  ? void 0
                  : E.some(function (I) {
                      return l(j, I);
                    });
              },
              H = !1,
              O = null;
            (O = N.pop());

          )
            if (O.nodeType !== 1 || !_(O)) {
              for (var k = O.childNodes, Z = k.length - 1; Z >= 0; Z--)
                N.push(k[Z]);
              if (O === b) {
                if (O.nodeType === 3) {
                  O.splitText(A);
                  var G = O.nextSibling;
                  F.push({
                    $node: G,
                    type: u.SelectedNodeType.text,
                    splitType: u.SplitType.head,
                  });
                }
                H = !0;
              } else {
                if (O === S) {
                  O.nodeType === 3 &&
                    ((G = O).splitText(y),
                    F.push({
                      $node: G,
                      type: u.SelectedNodeType.text,
                      splitType: u.SplitType.tail,
                    }));
                  break;
                }
                H &&
                  O.nodeType === 3 &&
                  F.push({
                    $node: O,
                    type: u.SelectedNodeType.text,
                    splitType: u.SplitType.none,
                  });
              }
            }
          return F;
        };
        var f = function (p, m) {
            var v = Array.isArray(m) ? m : [m];
            return (
              (v =
                v.length === 0
                  ? [d.getDefaultOptions().style.className]
                  : v).forEach(function (E) {
                c.addClass(p, E);
              }),
              p
            );
          },
          h = function (p) {
            return !p || !p.textContent;
          };
        (n.wrapHighlight = function (p, m, v, E) {
          var b = p.$node.parentNode,
            S = p.$node.previousSibling,
            A = p.$node.nextSibling;
          return c.isHighlightWrapNode(b)
            ? !c.isHighlightWrapNode(b) || (h(S) && h(A))
              ? (function (y, N, F) {
                  var _ = y.$node.parentNode,
                    H = _;
                  c.removeAllClass(H), f(H, F);
                  var O = _.dataset,
                    k = O[d.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (O[d.CAMEL_DATASET_IDENTIFIER] = N.id),
                    (O[d.CAMEL_DATASET_IDENTIFIER_EXTRA] = O[
                      d.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? k + d.ID_DIVISION + O[d.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : k),
                    H
                  );
                })(p, m, v)
              : (function (y, N, F, _) {
                  var H = document.createElement(_),
                    O = y.$node.parentNode,
                    k = y.$node.previousSibling,
                    Z = y.$node.nextSibling,
                    G = document.createDocumentFragment(),
                    j = O.dataset[d.CAMEL_DATASET_IDENTIFIER],
                    I = O.dataset[d.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    T = I ? j + d.ID_DIVISION + I : j;
                  H.setAttribute("data-" + d.DATASET_IDENTIFIER, N.id),
                    H.setAttribute("data-" + d.DATASET_IDENTIFIER_EXTRA, T),
                    H.appendChild(y.$node.cloneNode(!1));
                  var x,
                    D = !1,
                    L = !1;
                  k &&
                    (((C = O.cloneNode(!1)).textContent = k.textContent),
                    G.appendChild(C),
                    (D = !0));
                  var C,
                    R = [];
                  return (
                    Array.isArray(F) ? R.push.apply(R, s(F)) : R.push(F),
                    f(H, a.unique(R)),
                    G.appendChild(H),
                    Z &&
                      (((C = O.cloneNode(!1)).textContent = Z.textContent),
                      G.appendChild(C),
                      (L = !0)),
                    (x =
                      D && L
                        ? u.SplitType.both
                        : D
                        ? u.SplitType.head
                        : L
                        ? u.SplitType.tail
                        : u.SplitType.none),
                    H.setAttribute("data-" + d.DATASET_SPLIT_TYPE, x),
                    O.parentNode.replaceChild(G, O),
                    H
                  );
                })(p, m, v, E)
            : (function (y, N, F, _) {
                var H = document.createElement(_);
                return (
                  f(H, F),
                  H.appendChild(y.$node.cloneNode(!1)),
                  y.$node.parentNode.replaceChild(H, y.$node),
                  H.setAttribute("data-" + d.DATASET_IDENTIFIER, N.id),
                  H.setAttribute("data-" + d.DATASET_SPLIT_TYPE, y.splitType),
                  H.setAttribute("data-" + d.DATASET_IDENTIFIER_EXTRA, ""),
                  H
                );
              })(p, m, v, E);
        }),
          (n.normalizeSiblingText = function (p, m) {
            if ((m === void 0 && (m = !0), p && p.nodeType === 3)) {
              var v = m ? p.nextSibling : p.previousSibling;
              if (v.nodeType === 3) {
                var E = v.nodeValue;
                (p.nodeValue = m ? p.nodeValue + E : E + p.nodeValue),
                  v.parentNode.removeChild(v);
              }
            }
          });
      },
      function (o, n, r) {
        var i =
          (this && this.__values) ||
          function (s) {
            var u = typeof Symbol == "function" && Symbol.iterator,
              c = u && s[u],
              d = 0;
            if (c) return c.call(s);
            if (s && typeof s.length == "number")
              return {
                next: function () {
                  return (
                    s && d >= s.length && (s = void 0),
                    { value: s && s[d++], done: !s }
                  );
                },
              };
            throw new TypeError(
              u ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          };
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.unique = void 0),
          (n.unique = function (s) {
            var u,
              c,
              d = [];
            try {
              for (var a = i(s), l = a.next(); !l.done; l = a.next()) {
                var f = l.value;
                d.indexOf(f) === -1 && d.push(f);
              }
            } catch (h) {
              u = { error: h };
            } finally {
              try {
                l && !l.done && (c = a.return) && c.call(a);
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
          var s = i.STYLESHEET_ID,
            u = document.getElementById(s);
          if (!u) {
            var c = document.createTextNode(i.getStylesheet());
            ((u = document.createElement("style")).id = s),
              u.appendChild(c),
              document.head.appendChild(u);
          }
          return u;
        };
      },
    ]).default;
  });
})(Hr);
var di = Hr.exports;
const Ur = /* @__PURE__ */ Ve(di),
  Lt = "altimate-display-",
  fi = `${Lt}-highlight`,
  or = `${Lt}-highlight-hover`,
  pi = `${Lt}-active-highlight`,
  hi = 1049,
  Ze = new Ur({
    style: {
      className: fi,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  On = new Ur({
    style: {
      className: pi,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  zr = (e, t) =>
    t.filter((o) => {
      var n;
      return ((n = o.$node.nodeValue) == null ? void 0 : n.trim()) !== "";
    }),
  qr = (e, t, o) => {
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
Ze.hooks.Render.SelectedNodes.tap(zr);
Ze.hooks.Serialize.Restore.tap(qr);
On.hooks.Render.SelectedNodes.tap(zr);
On.hooks.Serialize.Restore.tap(qr);
Ze.on("selection:hover", ({ id: e }) => {
  Ze.addClass(or, e);
}).on("selection:hover-out", ({ id: e }) => {
  Ze.removeClass(or, e);
});
const gi = (e) => {
    var t, o;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((o = e.meta) == null ? void 0 : o.highlight)
      : null;
  },
  vi = (e) => {
    const t = gi(e);
    t && (Ze.remove(t.id), On.remove(t.id));
  },
  An = () => {
    var o, n;
    const e = Rn(),
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
  Rn = () => {
    var t;
    return (t = window.location.hash
      .split("#")
      .find((o) => o.startsWith("!"))) == null
      ? void 0
      : t.split("/");
  },
  Dn = () => document.querySelector('[marked="model.description"]'),
  mi = (e) => {
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
        : (n = Dn()) == null
        ? void 0
        : n.firstChild
      : An();
  },
  yi = (e) => {
    if (e.getAttribute("marked") === "model.description") return "description";
  },
  Ei = (e, t, o, n, r) => {
    if (e === "description")
      return {
        start: 0,
        end: 0,
        x: 0,
        y: 0,
      };
    const i = t.querySelectorAll(".line-numbers-rows > span"),
      s = o.split(`
`),
      u = Math.max(r.y, n.y),
      c = Array.from(i).findIndex((l) => {
        const { height: f, y: h } = l.getBoundingClientRect();
        return u >= h && u <= h + f;
      }),
      d = i[c],
      a = c - s.length + 1;
    return (
      console.log("start and end lines found", a, c),
      {
        x: d.offsetLeft,
        y: d.offsetTop + d.offsetHeight / 2,
        start: a,
        end: c,
      }
    );
  },
  tl = () => {
    var e;
    return [(e = An()) == null ? void 0 : e.parentElement, Dn()];
  };
var Ce = /* @__PURE__ */ ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.UNINITIALIZED = 1)] = "UNINITIALIZED"),
  (e[(e.INITIALIZED = 2)] = "INITIALIZED"),
  e
))(Ce || {});
function bi(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function _i(e) {
  return bi(e) && "type" in e && typeof e.type == "string";
}
var Vr = Symbol.for("immer-nothing"),
  ir = Symbol.for("immer-draftable"),
  be = Symbol.for("immer-state"),
  Si =
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
    const o = Si[e],
      n = typeof o == "function" ? o.apply(null, t) : o;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var et = Object.getPrototypeOf;
function $e(e) {
  return !!e && !!e[be];
}
function je(e) {
  var t;
  return e
    ? Wr(e) ||
        Array.isArray(e) ||
        !!e[ir] ||
        !!((t = e.constructor) != null && t[ir]) ||
        Ht(e) ||
        Ut(e)
    : !1;
}
var Ci = Object.prototype.constructor.toString();
function Wr(e) {
  if (!e || typeof e != "object") return !1;
  const t = et(e);
  if (t === null) return !0;
  const o = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return o === Object
    ? !0
    : typeof o == "function" && Function.toString.call(o) === Ci;
}
function Dt(e, t) {
  Bt(e) === 0
    ? Reflect.ownKeys(e).forEach((o) => {
        t(o, e[o], e);
      })
    : e.forEach((o, n) => t(n, o, e));
}
function Bt(e) {
  const t = e[be];
  return t ? t.type_ : Array.isArray(e) ? 1 : Ht(e) ? 2 : Ut(e) ? 3 : 0;
}
function fn(e, t) {
  return Bt(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Yr(e, t, o) {
  const n = Bt(e);
  n === 2 ? e.set(t, o) : n === 3 ? e.add(o) : (e[t] = o);
}
function Ti(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Ht(e) {
  return e instanceof Map;
}
function Ut(e) {
  return e instanceof Set;
}
function Le(e) {
  return e.copy_ || e.base_;
}
function pn(e, t) {
  if (Ht(e)) return new Map(e);
  if (Ut(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && Wr(e))
    return et(e)
      ? { ...e }
      : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const o = Object.getOwnPropertyDescriptors(e);
  delete o[be];
  let n = Reflect.ownKeys(o);
  for (let r = 0; r < n.length; r++) {
    const i = n[r],
      s = o[i];
    s.writable === !1 && ((s.writable = !0), (s.configurable = !0)),
      (s.get || s.set) &&
        (o[i] = {
          configurable: !0,
          writable: !0,
          // could live with !!desc.set as well here...
          enumerable: s.enumerable,
          value: e[i],
        });
  }
  return Object.create(et(e), o);
}
function wn(e, t = !1) {
  return (
    zt(e) ||
      $e(e) ||
      !je(e) ||
      (Bt(e) > 1 && (e.set = e.add = e.clear = e.delete = Oi),
      Object.freeze(e),
      t && Object.entries(e).forEach(([o, n]) => wn(n, !0))),
    e
  );
}
function Oi() {
  ye(2);
}
function zt(e) {
  return Object.isFrozen(e);
}
var Ai = {};
function Ue(e) {
  const t = Ai[e];
  return t || ye(0, e), t;
}
var dt;
function Kr() {
  return dt;
}
function Ri(e, t) {
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
function sr(e, t) {
  t &&
    (Ue("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function hn(e) {
  gn(e), e.drafts_.forEach(Di), (e.drafts_ = null);
}
function gn(e) {
  e === dt && (dt = e.parent_);
}
function ar(e) {
  return (dt = Ri(dt, e));
}
function Di(e) {
  const t = e[be];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function ur(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const o = t.drafts_[0];
  return (
    e !== void 0 && e !== o
      ? (o[be].modified_ && (hn(t), ye(4)),
        je(e) && ((e = wt(t, e)), t.parent_ || It(t, e)),
        t.patches_ &&
          Ue("Patches").generateReplacementPatches_(
            o[be].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = wt(t, o, [])),
    hn(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Vr ? e : void 0
  );
}
function wt(e, t, o) {
  if (zt(t)) return t;
  const n = t[be];
  if (!n) return Dt(t, (r, i) => cr(e, n, t, r, i, o)), t;
  if (n.scope_ !== e) return t;
  if (!n.modified_) return It(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    (n.finalized_ = !0), n.scope_.unfinalizedDrafts_--;
    const r = n.copy_;
    let i = r,
      s = !1;
    n.type_ === 3 && ((i = new Set(r)), r.clear(), (s = !0)),
      Dt(i, (u, c) => cr(e, n, r, u, c, o, s)),
      It(e, r, !1),
      o &&
        e.patches_ &&
        Ue("Patches").generatePatches_(n, o, e.patches_, e.inversePatches_);
  }
  return n.copy_;
}
function cr(e, t, o, n, r, i, s) {
  if ((process.env.NODE_ENV !== "production" && r === o && ye(5), $e(r))) {
    const u =
        i &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !fn(t.assigned_, n)
          ? i.concat(n)
          : void 0,
      c = wt(e, r, u);
    if ((Yr(o, n, c), $e(c))) e.canAutoFreeze_ = !1;
    else return;
  } else s && o.add(r);
  if (je(r) && !zt(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    wt(e, r),
      (!t || !t.scope_.parent_) &&
        typeof n != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(o, n) &&
        It(e, r);
  }
}
function It(e, t, o = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && wn(t, o);
}
function wi(e, t) {
  const o = Array.isArray(e),
    n = {
      type_: o ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : Kr(),
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
    i = In;
  o && ((r = [n]), (i = ft));
  const { revoke: s, proxy: u } = Proxy.revocable(r, i);
  return (n.draft_ = u), (n.revoke_ = s), u;
}
var In = {
    get(e, t) {
      if (t === be) return e;
      const o = Le(e);
      if (!fn(o, t)) return Ii(e, o, t);
      const n = o[t];
      return e.finalized_ || !je(n)
        ? n
        : n === Jt(e.base_, t)
        ? (Qt(e), (e.copy_[t] = mn(n, e)))
        : n;
    },
    has(e, t) {
      return t in Le(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Le(e));
    },
    set(e, t, o) {
      const n = Gr(Le(e), t);
      if (n != null && n.set) return n.set.call(e.draft_, o), !0;
      if (!e.modified_) {
        const r = Jt(Le(e), t),
          i = r == null ? void 0 : r[be];
        if (i && i.base_ === o)
          return (e.copy_[t] = o), (e.assigned_[t] = !1), !0;
        if (Ti(o, r) && (o !== void 0 || fn(e.base_, t))) return !0;
        Qt(e), vn(e);
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
        Jt(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), Qt(e), vn(e))
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
      return et(e.base_);
    },
    setPrototypeOf() {
      ye(12);
    },
  },
  ft = {};
Dt(In, (e, t) => {
  ft[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
ft.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && ye(13),
    ft.set.call(this, e, t, void 0)
  );
};
ft.set = function (e, t, o) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      ye(14),
    In.set.call(this, e[0], t, o, e[0])
  );
};
function Jt(e, t) {
  const o = e[be];
  return (o ? Le(o) : e)[t];
}
function Ii(e, t, o) {
  var r;
  const n = Gr(t, o);
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
function Gr(e, t) {
  if (!(t in e)) return;
  let o = et(e);
  for (; o; ) {
    const n = Object.getOwnPropertyDescriptor(o, t);
    if (n) return n;
    o = et(o);
  }
}
function vn(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && vn(e.parent_));
}
function Qt(e) {
  e.copy_ || (e.copy_ = pn(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var xi = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, o, n) => {
        if (typeof t == "function" && typeof o != "function") {
          const i = o;
          o = t;
          const s = this;
          return function (c = i, ...d) {
            return s.produce(c, (a) => o.call(this, a, ...d));
          };
        }
        typeof o != "function" && ye(6),
          n !== void 0 && typeof n != "function" && ye(7);
        let r;
        if (je(t)) {
          const i = ar(this),
            s = mn(t, void 0);
          let u = !0;
          try {
            (r = o(s)), (u = !1);
          } finally {
            u ? hn(i) : gn(i);
          }
          return sr(i, n), ur(r, i);
        } else if (!t || typeof t != "object") {
          if (
            ((r = o(t)),
            r === void 0 && (r = t),
            r === Vr && (r = void 0),
            this.autoFreeze_ && wn(r, !0),
            n)
          ) {
            const i = [],
              s = [];
            Ue("Patches").generateReplacementPatches_(t, r, i, s), n(i, s);
          }
          return r;
        } else ye(1, t);
      }),
      (this.produceWithPatches = (t, o) => {
        if (typeof t == "function")
          return (s, ...u) => this.produceWithPatches(s, (c) => t(c, ...u));
        let n, r;
        return [
          this.produce(t, o, (s, u) => {
            (n = s), (r = u);
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
    je(e) || ye(8), $e(e) && (e = Xr(e));
    const t = ar(this),
      o = mn(e, void 0);
    return (o[be].isManual_ = !0), gn(t), o;
  }
  finishDraft(e, t) {
    const o = e && e[be];
    (!o || !o.isManual_) && ye(9);
    const { scope_: n } = o;
    return sr(n, t), ur(void 0, n);
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
    const n = Ue("Patches").applyPatches_;
    return $e(e) ? n(e, t) : this.produce(e, (r) => n(r, t));
  }
};
function mn(e, t) {
  const o = Ht(e)
    ? Ue("MapSet").proxyMap_(e, t)
    : Ut(e)
    ? Ue("MapSet").proxySet_(e, t)
    : wi(e, t);
  return (t ? t.scope_ : Kr()).drafts_.push(o), o;
}
function Xr(e) {
  return $e(e) || ye(10, e), Zr(e);
}
function Zr(e) {
  if (!je(e) || zt(e)) return e;
  const t = e[be];
  let o;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (o = pn(e, t.scope_.immer_.useStrictShallowCopy_));
  } else o = pn(e, !0);
  return (
    Dt(o, (n, r) => {
      Yr(o, n, Zr(r));
    }),
    t && (t.finalized_ = !1),
    o
  );
}
var _e = new xi(),
  Jr = _e.produce;
_e.produceWithPatches.bind(_e);
_e.setAutoFreeze.bind(_e);
_e.setUseStrictShallowCopy.bind(_e);
_e.applyPatches.bind(_e);
_e.createDraft.bind(_e);
_e.finishDraft.bind(_e);
var Ni = (e, t, o) => {
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
  ji = (e, t, o) => {
    const { memoize: n, memoizeOptions: r } = t,
      { inputSelectorResults: i, inputSelectorResultsCopy: s } = e,
      u = n(() => ({}), ...r);
    if (!(u.apply(null, i) === u.apply(null, s))) {
      let d;
      try {
        throw new Error();
      } catch (a) {
        ({ stack: d } = a);
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
          stack: d,
        },
      );
    }
  },
  Pi = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function Fi(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function Mi(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function $i(
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
var lr = (e) => (Array.isArray(e) ? e : [e]);
function ki(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    $i(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function dr(e, t) {
  const o = [],
    { length: n } = e;
  for (let r = 0; r < n; r++) o.push(e[r].apply(null, t));
  return o;
}
var Li = (e, t) => {
    const { identityFunctionCheck: o, inputStabilityCheck: n } = {
      ...Pi,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: o === "always" || (o === "once" && e),
        run: Ni,
      },
      inputStabilityCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: ji,
      },
    };
  },
  Bi = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Hi = typeof WeakRef < "u" ? WeakRef : Bi,
  Ui = 0,
  fr = 1;
function Et() {
  return {
    s: Ui,
    v: void 0,
    o: null,
    p: null,
  };
}
function xn(e, t = {}) {
  let o = Et();
  const { resultEqualityCheck: n } = t;
  let r,
    i = 0;
  function s() {
    var l;
    let u = o;
    const { length: c } = arguments;
    for (let f = 0, h = c; f < h; f++) {
      const p = arguments[f];
      if (typeof p == "function" || (typeof p == "object" && p !== null)) {
        let m = u.o;
        m === null && (u.o = m = /* @__PURE__ */ new WeakMap());
        const v = m.get(p);
        v === void 0 ? ((u = Et()), m.set(p, u)) : (u = v);
      } else {
        let m = u.p;
        m === null && (u.p = m = /* @__PURE__ */ new Map());
        const v = m.get(p);
        v === void 0 ? ((u = Et()), m.set(p, u)) : (u = v);
      }
    }
    const d = u;
    let a;
    if (
      (u.s === fr ? (a = u.v) : ((a = e.apply(null, arguments)), i++),
      (d.s = fr),
      n)
    ) {
      const f =
        ((l = r == null ? void 0 : r.deref) == null ? void 0 : l.call(r)) ?? r;
      f != null && n(f, a) && ((a = f), i !== 0 && i--),
        (r =
          (typeof a == "object" && a !== null) || typeof a == "function"
            ? new Hi(a)
            : a);
    }
    return (d.v = a), a;
  }
  return (
    (s.clearCache = () => {
      (o = Et()), s.resetResultsCount();
    }),
    (s.resultsCount = () => i),
    (s.resetResultsCount = () => {
      i = 0;
    }),
    s
  );
}
function Qr(e, ...t) {
  const o =
      typeof e == "function"
        ? {
            memoize: e,
            memoizeOptions: t,
          }
        : e,
    n = (...r) => {
      let i = 0,
        s = 0,
        u,
        c = {},
        d = r.pop();
      typeof d == "object" && ((c = d), (d = r.pop())),
        Fi(
          d,
          `createSelector expects an output function after the inputs, but received: [${typeof d}]`,
        );
      const a = {
          ...o,
          ...c,
        },
        {
          memoize: l,
          memoizeOptions: f = [],
          argsMemoize: h = xn,
          argsMemoizeOptions: p = [],
          devModeChecks: m = {},
        } = a,
        v = lr(f),
        E = lr(p),
        b = ki(r),
        S = l(
          function () {
            return i++, d.apply(null, arguments);
          },
          ...v,
        );
      let A = !0;
      const y = h(
        function () {
          s++;
          const F = dr(b, arguments);
          if (((u = S.apply(null, F)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: _, inputStabilityCheck: H } = Li(
              A,
              m,
            );
            if ((_.shouldRun && _.run(d, F, u), H.shouldRun)) {
              const O = dr(b, arguments);
              H.run(
                { inputSelectorResults: F, inputSelectorResultsCopy: O },
                { memoize: l, memoizeOptions: v },
                arguments,
              );
            }
            A && (A = !1);
          }
          return u;
        },
        ...E,
      );
      return Object.assign(y, {
        resultFunc: d,
        memoizedResultFunc: S,
        dependencies: b,
        dependencyRecomputations: () => s,
        resetDependencyRecomputations: () => {
          s = 0;
        },
        lastResult: () => u,
        recomputations: () => i,
        resetRecomputations: () => {
          i = 0;
        },
        memoize: l,
        argsMemoize: h,
      });
    };
  return (
    Object.assign(n, {
      withTypes: () => n,
    }),
    n
  );
}
var zi = /* @__PURE__ */ Qr(xn),
  qi = Object.assign(
    (e, t = zi) => {
      Mi(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const o = Object.keys(e),
        n = o.map((i) => e[i]);
      return t(n, (...i) => i.reduce((s, u, c) => ((s[o[c]] = u), s), {}));
    },
    { withTypes: () => qi },
  ),
  Vi = (...e) => {
    const t = Qr(...e),
      o = Object.assign(
        (...n) => {
          const r = t(...n),
            i = (s, ...u) => r($e(s) ? Xr(s) : s, ...u);
          return Object.assign(i, r), i;
        },
        {
          withTypes: () => o,
        },
      );
    return o;
  };
Vi(xn);
function tt(e, t) {
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
    (o.match = (n) => _i(n) && n.type === e),
    o
  );
}
function pr(e) {
  return je(e) ? Jr(e, () => {}) : e;
}
function hr(e, t, o) {
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
function eo(e) {
  const t = {},
    o = [];
  let n;
  const r = {
    addCase(i, s) {
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
      return (t[u] = s), r;
    },
    addMatcher(i, s) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? fe(30)
            : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`",
        );
      return (
        o.push({
          matcher: i,
          reducer: s,
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
function Wi(e) {
  return typeof e == "function";
}
function Yi(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? fe(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [o, n, r] = eo(t),
    i;
  if (Wi(e)) i = () => pr(e());
  else {
    const u = pr(e);
    i = () => u;
  }
  function s(u = i(), c) {
    let d = [
      o[c.type],
      ...n.filter(({ matcher: a }) => a(c)).map(({ reducer: a }) => a),
    ];
    return (
      d.filter((a) => !!a).length === 0 && (d = [r]),
      d.reduce((a, l) => {
        if (l)
          if ($e(a)) {
            const h = l(a, c);
            return h === void 0 ? a : h;
          } else {
            if (je(a)) return Jr(a, (f) => l(f, c));
            {
              const f = l(a, c);
              if (f === void 0) {
                if (a === null) return a;
                throw new Error(
                  process.env.NODE_ENV === "production"
                    ? fe(9)
                    : "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return f;
            }
          }
        return a;
      }, u)
    );
  }
  return (s.getInitialState = i), s;
}
var Ki = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  Gi = (e = 21) => {
    let t = "",
      o = e;
    for (; o--; ) t += Ki[(Math.random() * 64) | 0];
    return t;
  },
  Xi = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Zi(e, t) {
  return `${e}/${t}`;
}
function Ji({ creators: e } = {}) {
  var o;
  const t = (o = e == null ? void 0 : e.asyncThunk) == null ? void 0 : o[Xi];
  return function (r) {
    const { name: i, reducerPath: s = i } = r;
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
        (typeof r.reducers == "function" ? r.reducers(ts()) : r.reducers) || {},
      c = Object.keys(u),
      d = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      a = {
        addCase(S, A) {
          const y = typeof S == "string" ? S : S.type;
          if (!y)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? fe(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (y in d.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? fe(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  y,
            );
          return (d.sliceCaseReducersByType[y] = A), a;
        },
        addMatcher(S, A) {
          return (
            d.sliceMatchers.push({
              matcher: S,
              reducer: A,
            }),
            a
          );
        },
        exposeAction(S, A) {
          return (d.actionCreators[S] = A), a;
        },
        exposeCaseReducer(S, A) {
          return (d.sliceCaseReducersByName[S] = A), a;
        },
      };
    c.forEach((S) => {
      const A = u[S],
        y = {
          reducerName: S,
          type: Zi(i, S),
          createNotation: typeof r.reducers == "function",
        };
      rs(A) ? is(y, A, a, t) : ns(y, A, a);
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
      const [S = {}, A = [], y = void 0] =
          typeof r.extraReducers == "function"
            ? eo(r.extraReducers)
            : [r.extraReducers],
        N = {
          ...S,
          ...d.sliceCaseReducersByType,
        };
      return Yi(r.initialState, (F) => {
        for (let _ in N) F.addCase(_, N[_]);
        for (let _ of d.sliceMatchers) F.addMatcher(_.matcher, _.reducer);
        for (let _ of A) F.addMatcher(_.matcher, _.reducer);
        y && F.addDefaultCase(y);
      });
    }
    const f = (S) => S,
      h = /* @__PURE__ */ new Map();
    let p;
    function m(S, A) {
      return p || (p = l()), p(S, A);
    }
    function v() {
      return p || (p = l()), p.getInitialState();
    }
    function E(S, A = !1) {
      function y(F) {
        let _ = F[S];
        if (typeof _ > "u") {
          if (A) _ = v();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? fe(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return _;
      }
      function N(F = f) {
        const _ = hr(h, A, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return hr(_, F, {
          insert: () => {
            const H = {};
            for (const [O, k] of Object.entries(r.selectors ?? {}))
              H[O] = Qi(k, F, v, A);
            return H;
          },
        });
      }
      return {
        reducerPath: S,
        getSelectors: N,
        get selectors() {
          return N(y);
        },
        selectSlice: y,
      };
    }
    const b = {
      name: i,
      reducer: m,
      actions: d.actionCreators,
      caseReducers: d.sliceCaseReducersByName,
      getInitialState: v,
      ...E(s),
      injectInto(S, { reducerPath: A, ...y } = {}) {
        const N = A ?? s;
        return (
          S.inject(
            {
              reducerPath: N,
              reducer: m,
            },
            y,
          ),
          {
            ...b,
            ...E(N, !0),
          }
        );
      },
    };
    return b;
  };
}
function Qi(e, t, o, n) {
  function r(i, ...s) {
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
    return e(u, ...s);
  }
  return (r.unwrapped = e), r;
}
var es = /* @__PURE__ */ Ji();
function ts() {
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
function ns({ type: e, reducerName: t, createNotation: o }, n, r) {
  let i, s;
  if ("reducer" in n) {
    if (o && !os(n))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? fe(17)
          : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.",
      );
    (i = n.reducer), (s = n.prepare);
  } else i = n;
  r.addCase(e, i)
    .exposeCaseReducer(t, i)
    .exposeAction(t, s ? tt(e, s) : tt(e));
}
function rs(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function os(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function is({ type: e, reducerName: t }, o, n, r) {
  if (!r)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? fe(18)
        : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.",
    );
  const {
      payloadCreator: i,
      fulfilled: s,
      pending: u,
      rejected: c,
      settled: d,
      options: a,
    } = o,
    l = r(e, i, a);
  n.exposeAction(t, l),
    s && n.addCase(l.fulfilled, s),
    u && n.addCase(l.pending, u),
    c && n.addCase(l.rejected, c),
    d && n.addMatcher(l.settled, d),
    n.exposeCaseReducer(t, {
      fulfilled: s || bt,
      pending: u || bt,
      rejected: c || bt,
      settled: d || bt,
    });
}
function bt() {}
var ss = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? fe(32)
          : `${t} is not a function`,
      );
  },
  Nn = "listenerMiddleware",
  as = (e) => {
    let { type: t, actionCreator: o, matcher: n, predicate: r, effect: i } = e;
    if (t) r = tt(t).match;
    else if (o) (t = o.type), (r = o.match);
    else if (n) r = n;
    else if (!r)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? fe(21)
          : "Creating or removing a listener requires one of the known fields for matching an action",
      );
    return (
      ss(i, "options.listener"),
      {
        predicate: r,
        type: t,
        effect: i,
      }
    );
  },
  us = Object.assign(
    (e) => {
      const { type: t, predicate: o, effect: n } = as(e);
      return {
        id: Gi(),
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
      withTypes: () => us,
    },
  ),
  cs = Object.assign(tt(`${Nn}/add`), {
    withTypes: () => cs,
  });
tt(`${Nn}/removeAll`);
var ls = Object.assign(tt(`${Nn}/remove`), {
  withTypes: () => ls,
});
function fe(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const ds = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    conversationsLoadingState: Ce.UNINITIALIZED,
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: li(),
    codeblockLoaded: !1,
    source: Tn.DBT_DOCS,
    manifest: {},
  },
  xt = es({
    name: "appState",
    initialState: ds,
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
        const n = Rn();
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
          const s =
            ((r = e.manifest.nodes) == null ? void 0 : r[o.meta.uniqueId]) ||
            ((i = e.manifest.macros) == null ? void 0 : i[o.meta.uniqueId]);
          o.meta.filePath = (s == null ? void 0 : s.original_file_path) || "";
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
    setCurrentUserId: nl,
    setShareId: rl,
    updateSelectedConversationId: jn,
    updateRightPanelState: Pn,
    setUsers: fs,
    setConversations: ps,
    resetNewConversation: Fn,
    updateNewConversation: Mn,
    upsertConversation: ol,
    setDocsAppRendered: il,
    updateCurrentPage: sl,
    updateCodeblockLoaded: al,
    resolveConversationGroup: hs,
    setConversationsLoadingState: gr,
    refetchConversations: to,
    setConversationSource: ul,
    setManifest: gs,
  } = xt.actions,
  qt = ze({
    state: xt.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  vs = ({
    children: e,
    shareId: t,
    userId: o,
    conversationGroupId: n,
    source: r,
  }) => {
    const [i, s] = Zo(xt.reducer, {
        ...xt.getInitialState(),
        shareId: t,
        currentUserId: o,
        selectedConversationId: n,
        isRightPanelOpen: !!n,
        source: r,
      }),
      u = Me((d) => d(i), [i]),
      c = Ne(
        () => ({
          state: i,
          dispatch: s,
          getValue: u,
        }),
        [i, s, u],
      );
    return /* @__PURE__ */ w.jsx(qt.Provider, { value: c, children: e });
  },
  ms = vs,
  ys = () => qe(qt),
  ue = (e) => {
    const { getValue: t } = qe(qt);
    return t(e);
  },
  Ae = () => {
    const { dispatch: e } = qe(qt);
    return e;
  },
  Es = ze({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  bs = ze(null),
  _s = typeof document < "u",
  no = _s ? Jo : Oe;
class vr {
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
function Ss(e) {
  let t = new vr(),
    o = new vr(),
    n = 0,
    r = !1,
    i = !1;
  const s = /* @__PURE__ */ new WeakSet(),
    u = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (c, d = !1, a = !1) => {
        const l = a && r,
          f = l ? t : o;
        return d && s.add(c), f.add(c) && l && r && (n = t.order.length), c;
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
        if (((r = !0), ([t, o] = [o, t]), o.clear(), (n = t.order.length), n))
          for (let d = 0; d < n; d++) {
            const a = t.order[d];
            s.has(a) && (u.schedule(a), e()), a(c);
          }
        (r = !1), i && ((i = !1), u.process(c));
      },
    };
  return u;
}
const _t = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
    // Compute
  ],
  Cs = 40;
function Ts(e, t) {
  let o = !1,
    n = !0;
  const r = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    i = _t.reduce((l, f) => ((l[f] = Ss(() => (o = !0))), l), {}),
    s = (l) => {
      i[l].process(r);
    },
    u = () => {
      const l = performance.now();
      (o = !1),
        (r.delta = n ? 1e3 / 60 : Math.max(Math.min(l - r.timestamp, Cs), 1)),
        (r.timestamp = l),
        (r.isProcessing = !0),
        _t.forEach(s),
        (r.isProcessing = !1),
        o && t && ((n = !1), e(u));
    },
    c = () => {
      (o = !0), (n = !0), r.isProcessing || e(u);
    };
  return {
    schedule: _t.reduce((l, f) => {
      const h = i[f];
      return (l[f] = (p, m = !1, v = !1) => (o || c(), h.schedule(p, m, v))), l;
    }, {}),
    cancel: (l) => _t.forEach((f) => i[f].cancel(l)),
    state: r,
    steps: i,
  };
}
const Os = ze({});
function As(e) {
  const t = De(null);
  return t.current === null && (t.current = e()), t.current;
}
const Rs = (e) => e,
  {
    schedule: Ds,
    cancel: cl,
    state: ll,
    steps: dl,
  } = Ts(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Rs, !0);
function ro() {
  const e = De(!1);
  return (
    no(
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
function ws() {
  const e = ro(),
    [t, o] = ge(0),
    n = Me(() => {
      e.current && o(t + 1);
    }, [t]);
  return [Me(() => Ds.postRender(n), [n]), t];
}
class Is extends Ee.Component {
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
function xs({ children: e, isPresent: t }) {
  const o = kr(),
    n = De(null),
    r = De({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: i } = qe(Es);
  return (
    Qo(() => {
      const { width: s, height: u, top: c, left: d } = r.current;
      if (t || !n.current || !s || !u) return;
      n.current.dataset.motionPopId = o;
      const a = document.createElement("style");
      return (
        i && (a.nonce = i),
        document.head.appendChild(a),
        a.sheet &&
          a.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${u}px !important;
            top: ${c}px !important;
            left: ${d}px !important;
          }
        `),
        () => {
          document.head.removeChild(a);
        }
      );
    }, [t]),
    Ee.createElement(
      Is,
      { isPresent: t, childRef: n, sizeRef: r },
      Ee.cloneElement(e, { ref: n }),
    )
  );
}
const en = ({
  children: e,
  initial: t,
  isPresent: o,
  onExitComplete: n,
  custom: r,
  presenceAffectsLayout: i,
  mode: s,
}) => {
  const u = As(Ns),
    c = kr(),
    d = Ne(
      () => ({
        id: c,
        initial: t,
        isPresent: o,
        custom: r,
        onExitComplete: (a) => {
          u.set(a, !0);
          for (const l of u.values()) if (!l) return;
          n && n();
        },
        register: (a) => (u.set(a, !1), () => u.delete(a)),
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      i ? void 0 : [o],
    );
  return (
    Ne(() => {
      u.forEach((a, l) => u.set(l, !1));
    }, [o]),
    Ee.useEffect(() => {
      !o && !u.size && n && n();
    }, [o]),
    s === "popLayout" && (e = Ee.createElement(xs, { isPresent: o }, e)),
    Ee.createElement(bs.Provider, { value: d }, e)
  );
};
function Ns() {
  return /* @__PURE__ */ new Map();
}
function js(e) {
  return Oe(() => () => e(), []);
}
const Be = (e) => e.key || "";
function Ps(e, t) {
  e.forEach((o) => {
    const n = Be(o);
    t.set(n, o);
  });
}
function Fs(e) {
  const t = [];
  return (
    Qe.forEach(e, (o) => {
      Lr(o) && t.push(o);
    }),
    t
  );
}
const Ms = ({
    children: e,
    custom: t,
    initial: o = !0,
    onExitComplete: n,
    exitBeforeEnter: r,
    presenceAffectsLayout: i = !0,
    mode: s = "sync",
  }) => {
    const u = qe(Os).forceRender || ws()[0],
      c = ro(),
      d = Fs(e);
    let a = d;
    const l = De(/* @__PURE__ */ new Map()).current,
      f = De(a),
      h = De(/* @__PURE__ */ new Map()).current,
      p = De(!0);
    if (
      (no(() => {
        (p.current = !1), Ps(d, h), (f.current = a);
      }),
      js(() => {
        (p.current = !0), h.clear(), l.clear();
      }),
      p.current)
    )
      return Ee.createElement(
        Ee.Fragment,
        null,
        a.map((b) =>
          Ee.createElement(
            en,
            {
              key: Be(b),
              isPresent: !0,
              initial: o ? void 0 : !1,
              presenceAffectsLayout: i,
              mode: s,
            },
            b,
          ),
        ),
      );
    a = [...a];
    const m = f.current.map(Be),
      v = d.map(Be),
      E = m.length;
    for (let b = 0; b < E; b++) {
      const S = m[b];
      v.indexOf(S) === -1 && !l.has(S) && l.set(S, void 0);
    }
    return (
      s === "wait" && l.size && (a = []),
      l.forEach((b, S) => {
        if (v.indexOf(S) !== -1) return;
        const A = h.get(S);
        if (!A) return;
        const y = m.indexOf(S);
        let N = b;
        if (!N) {
          const F = () => {
            l.delete(S);
            const _ = Array.from(h.keys()).filter((H) => !v.includes(H));
            if (
              (_.forEach((H) => h.delete(H)),
              (f.current = d.filter((H) => {
                const O = Be(H);
                return (
                  // filter out the node exiting
                  O === S || // filter out the leftover children
                  _.includes(O)
                );
              })),
              !l.size)
            ) {
              if (c.current === !1) return;
              u(), n && n();
            }
          };
          (N = Ee.createElement(
            en,
            {
              key: Be(A),
              isPresent: !1,
              onExitComplete: F,
              custom: t,
              presenceAffectsLayout: i,
              mode: s,
            },
            A,
          )),
            l.set(S, N);
        }
        a.splice(y, 0, N);
      }),
      (a = a.map((b) => {
        const S = b.key;
        return l.has(S)
          ? b
          : Ee.createElement(
              en,
              { key: Be(b), isPresent: !0, presenceAffectsLayout: i, mode: s },
              b,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        s === "wait" &&
        a.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      Ee.createElement(Ee.Fragment, null, l.size ? a : a.map((b) => ei(b)))
    );
  },
  Vt = ({ icon: e, className: t = "", ...o }) =>
    /* @__PURE__ */ w.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...o,
    }),
  oo = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "add", ...e }),
  $s = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "comment-unresolved", ...e }),
  ks = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "check", ...e }),
  Ls = (e) => /* @__PURE__ */ w.jsx(Vt, { icon: "send", ...e }),
  Bs = "_iconButton_eti7u_1",
  Hs = {
    iconButton: Bs,
  },
  Us = (e) =>
    /* @__PURE__ */ w.jsx(Ys, {
      title: e.title,
      children: /* @__PURE__ */ w.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${
          e.className ?? ""
        } ${Hs.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  io = Us,
  zs = ze(null),
  tn = {
    didCatch: !1,
    error: null,
  };
class qs extends ti {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = tn);
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
      for (var o, n, r = arguments.length, i = new Array(r), s = 0; s < r; s++)
        i[s] = arguments[s];
      (o = (n = this.props).onReset) === null ||
        o === void 0 ||
        o.call(n, {
          args: i,
          reason: "imperative-api",
        }),
        this.setState(tn);
    }
  }
  componentDidCatch(t, o) {
    var n, r;
    (n = (r = this.props).onError) === null || n === void 0 || n.call(r, t, o);
  }
  componentDidUpdate(t, o) {
    const { didCatch: n } = this.state,
      { resetKeys: r } = this.props;
    if (n && o.error !== null && Vs(t.resetKeys, r)) {
      var i, s;
      (i = (s = this.props).onReset) === null ||
        i === void 0 ||
        i.call(s, {
          next: r,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(tn);
    }
  }
  render() {
    const {
        children: t,
        fallbackRender: o,
        FallbackComponent: n,
        fallback: r,
      } = this.props,
      { didCatch: i, error: s } = this.state;
    let u = t;
    if (i) {
      const c = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (typeof o == "function") u = o(c);
      else if (n) u = tr(n, c);
      else if (r === null || Lr(r)) u = r;
      else throw s;
    }
    return tr(
      zs.Provider,
      {
        value: {
          didCatch: i,
          error: s,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      u,
    );
  }
}
function Vs() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((o, n) => !Object.is(o, t[n]));
}
const Ws = (e) => {
    const [t, o] = ge(!1),
      n = () => o(!t),
      r = De(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ w.jsxs(qs, {
      fallback: /* @__PURE__ */ w.jsx("span", {
        id: r.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ w.jsx("span", { id: r.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ w.jsx(ri, {
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
  Ys = Ws,
  Ks = "_loadingBtn_gadec_1",
  Gs = {
    loadingBtn: Ks,
  },
  Xs = ({ loading: e, ...t }) =>
    /* @__PURE__ */ w.jsx(Ft, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${Gs.loadingBtn}`,
      children: e ? /* @__PURE__ */ w.jsx(oi, {}) : t.children,
    }),
  Zs = Xs;
function so(e) {
  return e ? (typeof e == "string" ? e : e.source) : null;
}
function Js(...e) {
  return e.map((o) => so(o)).join("");
}
function nn(...e) {
  return "(" + e.map((o) => so(o)).join("|") + ")";
}
function Qs(e) {
  const t = e.COMMENT("--", "$"),
    o = {
      className: "string",
      variants: [
        {
          begin: /'/,
          end: /'/,
          contains: [{ begin: /''/ }],
        },
      ],
    },
    n = {
      begin: /"/,
      end: /"/,
      contains: [{ begin: /""/ }],
    },
    r = [
      "true",
      "false",
      // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
      // "null",
      "unknown",
    ],
    i = [
      "double precision",
      "large object",
      "with timezone",
      "without timezone",
    ],
    s = [
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
      "varbinary",
    ],
    u = ["add", "asc", "collation", "desc", "final", "first", "last", "view"],
    c = [
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
      "year",
    ],
    d = [
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
      "width_bucket",
    ],
    a = [
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
      "localtimestamp",
    ],
    l = [
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
      "breadth first",
    ],
    f = d,
    h = [...c, ...u].filter((b) => !d.includes(b)),
    p = {
      className: "variable",
      begin: /@[a-z0-9]+/,
    },
    m = {
      className: "operator",
      begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
      relevance: 0,
    },
    v = {
      begin: Js(/\b/, nn(...f), /\s*\(/),
      keywords: {
        built_in: f,
      },
    };
  function E(b, { exceptions: S, when: A } = {}) {
    const y = A;
    return (
      (S = S || []),
      b.map((N) =>
        N.match(/\|\d+$/) || S.includes(N) ? N : y(N) ? `${N}|0` : N,
      )
    );
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: E(h, { when: (b) => b.length < 3 }),
      literal: r,
      type: s,
      built_in: a,
    },
    contains: [
      {
        begin: nn(...l),
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: h.concat(l),
          literal: r,
          type: s,
        },
      },
      {
        className: "type",
        begin: nn(...i),
      },
      v,
      p,
      o,
      n,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      t,
      m,
    ],
  };
}
var ea = Qs;
const ta = /* @__PURE__ */ Ve(ea);
function na(e) {
  var t = "true false yes no null",
    o = "[\\w#;/?:@&=+$,.~*'()[\\]]+",
    n = {
      className: "attr",
      variants: [
        { begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)" },
        { begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)' },
        // double quoted keys
        { begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)" },
        // single quoted keys
      ],
    },
    r = {
      className: "template-variable",
      variants: [
        { begin: /\{\{/, end: /\}\}/ },
        // jinja templates Ansible
        { begin: /%\{/, end: /\}/ },
        // Ruby i18n
      ],
    },
    i = {
      className: "string",
      relevance: 0,
      variants: [
        { begin: /'/, end: /'/ },
        { begin: /"/, end: /"/ },
        { begin: /\S+/ },
      ],
      contains: [e.BACKSLASH_ESCAPE, r],
    },
    s = e.inherit(i, {
      variants: [
        { begin: /'/, end: /'/ },
        { begin: /"/, end: /"/ },
        { begin: /[^\s,{}[\]]+/ },
      ],
    }),
    u = "[0-9]{4}(-[0-9][0-9]){0,2}",
    c = "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?",
    d = "(\\.[0-9]*)?",
    a = "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?",
    l = {
      className: "number",
      begin: "\\b" + u + c + d + a + "\\b",
    },
    f = {
      end: ",",
      endsWithParent: !0,
      excludeEnd: !0,
      keywords: t,
      relevance: 0,
    },
    h = {
      begin: /\{/,
      end: /\}/,
      contains: [f],
      illegal: "\\n",
      relevance: 0,
    },
    p = {
      begin: "\\[",
      end: "\\]",
      contains: [f],
      illegal: "\\n",
      relevance: 0,
    },
    m = [
      n,
      {
        className: "meta",
        begin: "^---\\s*$",
        relevance: 10,
      },
      {
        // multi line string
        // Blocks start with a | or > followed by a newline
        //
        // Indentation of subsequent lines must be the same to
        // be considered part of the block
        className: "string",
        begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*",
      },
      {
        // Ruby/Rails erb
        begin: "<%[%=-]?",
        end: "[%-]?%>",
        subLanguage: "ruby",
        excludeBegin: !0,
        excludeEnd: !0,
        relevance: 0,
      },
      {
        // named tags
        className: "type",
        begin: "!\\w+!" + o,
      },
      // https://yaml.org/spec/1.2/spec.html#id2784064
      {
        // verbatim tags
        className: "type",
        begin: "!<" + o + ">",
      },
      {
        // primary tags
        className: "type",
        begin: "!" + o,
      },
      {
        // secondary tags
        className: "type",
        begin: "!!" + o,
      },
      {
        // fragment id &ref
        className: "meta",
        begin: "&" + e.UNDERSCORE_IDENT_RE + "$",
      },
      {
        // fragment reference *ref
        className: "meta",
        begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$",
      },
      {
        // array listing
        className: "bullet",
        // TODO: remove |$ hack when we have proper look-ahead support
        begin: "-(?=[ ]|$)",
        relevance: 0,
      },
      e.HASH_COMMENT_MODE,
      {
        beginKeywords: t,
        keywords: { literal: t },
      },
      l,
      // numbers are any valid C-style number that
      // sit isolated from other words
      {
        className: "number",
        begin: e.C_NUMBER_RE + "\\b",
        relevance: 0,
      },
      h,
      p,
      i,
    ],
    v = [...m];
  return (
    v.pop(),
    v.push(s),
    (f.contains = v),
    {
      name: "YAML",
      case_insensitive: !0,
      aliases: ["yml"],
      contains: m,
    }
  );
}
var ra = na;
const oa = /* @__PURE__ */ Ve(ra);
function ia(e) {
  return e ? (typeof e == "string" ? e : e.source) : null;
}
function sa(...e) {
  return e.map((o) => ia(o)).join("");
}
function aa(e) {
  const t = {
      begin: /<\/?[A-Za-z_]/,
      end: ">",
      subLanguage: "xml",
      relevance: 0,
    },
    o = {
      begin: "^[-\\*]{3,}",
      end: "$",
    },
    n = {
      className: "code",
      variants: [
        // TODO: fix to allow these to work with sublanguage also
        {
          begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*",
        },
        {
          begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*",
        },
        // needed to allow markdown as a sublanguage to work
        {
          begin: "```",
          end: "```+[ ]*$",
        },
        {
          begin: "~~~",
          end: "~~~+[ ]*$",
        },
        {
          begin: "`.+?`",
        },
        {
          begin: "(?=^( {4}|\\t))",
          // use contains to gobble up multiple lines to allow the block to be whatever size
          // but only have a single open/close tag vs one per line
          contains: [
            {
              begin: "^( {4}|\\t)",
              end: "(\\n)$",
            },
          ],
          relevance: 0,
        },
      ],
    },
    r = {
      className: "bullet",
      begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
      end: "\\s+",
      excludeEnd: !0,
    },
    i = {
      begin: /^\[[^\n]+\]:/,
      returnBegin: !0,
      contains: [
        {
          className: "symbol",
          begin: /\[/,
          end: /\]/,
          excludeBegin: !0,
          excludeEnd: !0,
        },
        {
          className: "link",
          begin: /:\s*/,
          end: /$/,
          excludeBegin: !0,
        },
      ],
    },
    u = {
      variants: [
        // too much like nested array access in so many languages
        // to have any real relevance
        {
          begin: /\[.+?\]\[.*?\]/,
          relevance: 0,
        },
        // popular internet URLs
        {
          begin:
            /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
          relevance: 2,
        },
        {
          begin: sa(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
          relevance: 2,
        },
        // relative urls
        {
          begin: /\[.+?\]\([./?&#].*?\)/,
          relevance: 1,
        },
        // whatever else, lower relevance (might not be a link at all)
        {
          begin: /\[.+?\]\(.*?\)/,
          relevance: 0,
        },
      ],
      returnBegin: !0,
      contains: [
        {
          className: "string",
          relevance: 0,
          begin: "\\[",
          end: "\\]",
          excludeBegin: !0,
          returnEnd: !0,
        },
        {
          className: "link",
          relevance: 0,
          begin: "\\]\\(",
          end: "\\)",
          excludeBegin: !0,
          excludeEnd: !0,
        },
        {
          className: "symbol",
          relevance: 0,
          begin: "\\]\\[",
          end: "\\]",
          excludeBegin: !0,
          excludeEnd: !0,
        },
      ],
    },
    c = {
      className: "strong",
      contains: [],
      // defined later
      variants: [
        {
          begin: /_{2}/,
          end: /_{2}/,
        },
        {
          begin: /\*{2}/,
          end: /\*{2}/,
        },
      ],
    },
    d = {
      className: "emphasis",
      contains: [],
      // defined later
      variants: [
        {
          begin: /\*(?!\*)/,
          end: /\*/,
        },
        {
          begin: /_(?!_)/,
          end: /_/,
          relevance: 0,
        },
      ],
    };
  c.contains.push(d), d.contains.push(c);
  let a = [t, u];
  return (
    (c.contains = c.contains.concat(a)),
    (d.contains = d.contains.concat(a)),
    (a = a.concat(c, d)),
    {
      name: "Markdown",
      aliases: ["md", "mkdown", "mkd"],
      contains: [
        {
          className: "section",
          variants: [
            {
              begin: "^#{1,6}",
              end: "$",
              contains: a,
            },
            {
              begin: "(?=^.+?\\n[=-]{2,}$)",
              contains: [
                {
                  begin: "^[=-]*$",
                },
                {
                  begin: "^",
                  end: "\\n",
                  contains: a,
                },
              ],
            },
          ],
        },
        t,
        r,
        c,
        d,
        {
          className: "quote",
          begin: "^>\\s+",
          contains: a,
          end: "$",
        },
        n,
        o,
        u,
        i,
      ],
    }
  );
}
var ua = aa;
const ca = /* @__PURE__ */ Ve(ua),
  la = {
    hljs: {
      display: "block",
      overflowX: "auto",
      padding: "0.5em",
      background: "#002b36",
      color: "#839496",
    },
    "hljs-comment": {
      color: "#586e75",
    },
    "hljs-quote": {
      color: "#586e75",
    },
    "hljs-keyword": {
      color: "#859900",
    },
    "hljs-selector-tag": {
      color: "#859900",
    },
    "hljs-addition": {
      color: "#859900",
    },
    "hljs-number": {
      color: "#2aa198",
    },
    "hljs-string": {
      color: "#2aa198",
    },
    "hljs-meta .hljs-meta-string": {
      color: "#2aa198",
    },
    "hljs-literal": {
      color: "#2aa198",
    },
    "hljs-doctag": {
      color: "#2aa198",
    },
    "hljs-regexp": {
      color: "#2aa198",
    },
    "hljs-title": {
      color: "#268bd2",
    },
    "hljs-section": {
      color: "#268bd2",
    },
    "hljs-name": {
      color: "#268bd2",
    },
    "hljs-selector-id": {
      color: "#268bd2",
    },
    "hljs-selector-class": {
      color: "#268bd2",
    },
    "hljs-attribute": {
      color: "#b58900",
    },
    "hljs-attr": {
      color: "#b58900",
    },
    "hljs-variable": {
      color: "#b58900",
    },
    "hljs-template-variable": {
      color: "#b58900",
    },
    "hljs-class .hljs-title": {
      color: "#b58900",
    },
    "hljs-type": {
      color: "#b58900",
    },
    "hljs-symbol": {
      color: "#cb4b16",
    },
    "hljs-bullet": {
      color: "#cb4b16",
    },
    "hljs-subst": {
      color: "#cb4b16",
    },
    "hljs-meta": {
      color: "#cb4b16",
    },
    "hljs-meta .hljs-keyword": {
      color: "#cb4b16",
    },
    "hljs-selector-attr": {
      color: "#cb4b16",
    },
    "hljs-selector-pseudo": {
      color: "#cb4b16",
    },
    "hljs-link": {
      color: "#cb4b16",
    },
    "hljs-built_in": {
      color: "#dc322f",
    },
    "hljs-deletion": {
      color: "#dc322f",
    },
    "hljs-formula": {
      background: "#073642",
    },
    "hljs-emphasis": {
      fontStyle: "italic",
    },
    "hljs-strong": {
      fontWeight: "bold",
    },
  },
  da = {
    hljs: {
      display: "block",
      overflowX: "auto",
      padding: "0.5em",
      background: "#fdf6e3",
      color: "#657b83",
    },
    "hljs-comment": {
      color: "#93a1a1",
    },
    "hljs-quote": {
      color: "#93a1a1",
    },
    "hljs-keyword": {
      color: "#859900",
    },
    "hljs-selector-tag": {
      color: "#859900",
    },
    "hljs-addition": {
      color: "#859900",
    },
    "hljs-number": {
      color: "#2aa198",
    },
    "hljs-string": {
      color: "#2aa198",
    },
    "hljs-meta .hljs-meta-string": {
      color: "#2aa198",
    },
    "hljs-literal": {
      color: "#2aa198",
    },
    "hljs-doctag": {
      color: "#2aa198",
    },
    "hljs-regexp": {
      color: "#2aa198",
    },
    "hljs-title": {
      color: "#268bd2",
    },
    "hljs-section": {
      color: "#268bd2",
    },
    "hljs-name": {
      color: "#268bd2",
    },
    "hljs-selector-id": {
      color: "#268bd2",
    },
    "hljs-selector-class": {
      color: "#268bd2",
    },
    "hljs-attribute": {
      color: "#b58900",
    },
    "hljs-attr": {
      color: "#b58900",
    },
    "hljs-variable": {
      color: "#b58900",
    },
    "hljs-template-variable": {
      color: "#b58900",
    },
    "hljs-class .hljs-title": {
      color: "#b58900",
    },
    "hljs-type": {
      color: "#b58900",
    },
    "hljs-symbol": {
      color: "#cb4b16",
    },
    "hljs-bullet": {
      color: "#cb4b16",
    },
    "hljs-subst": {
      color: "#cb4b16",
    },
    "hljs-meta": {
      color: "#cb4b16",
    },
    "hljs-meta .hljs-keyword": {
      color: "#cb4b16",
    },
    "hljs-selector-attr": {
      color: "#cb4b16",
    },
    "hljs-selector-pseudo": {
      color: "#cb4b16",
    },
    "hljs-link": {
      color: "#cb4b16",
    },
    "hljs-built_in": {
      color: "#dc322f",
    },
    "hljs-deletion": {
      color: "#dc322f",
    },
    "hljs-formula": {
      background: "#eee8d5",
    },
    "hljs-emphasis": {
      fontStyle: "italic",
    },
    "hljs-strong": {
      fontWeight: "bold",
    },
  },
  fa = {
    hljs: {
      display: "block",
      overflowX: "auto",
      padding: "0.5em",
      background: "white",
      color: "black",
    },
    "hljs-comment": {
      color: "#008000",
    },
    "hljs-quote": {
      color: "#008000",
    },
    "hljs-variable": {
      color: "#008000",
    },
    "hljs-keyword": {
      color: "#00f",
    },
    "hljs-selector-tag": {
      color: "#00f",
    },
    "hljs-built_in": {
      color: "#00f",
    },
    "hljs-name": {
      color: "#00f",
    },
    "hljs-tag": {
      color: "#00f",
    },
    "hljs-string": {
      color: "#a31515",
    },
    "hljs-title": {
      color: "#a31515",
    },
    "hljs-section": {
      color: "#a31515",
    },
    "hljs-attribute": {
      color: "#a31515",
    },
    "hljs-literal": {
      color: "#a31515",
    },
    "hljs-template-tag": {
      color: "#a31515",
    },
    "hljs-template-variable": {
      color: "#a31515",
    },
    "hljs-type": {
      color: "#a31515",
    },
    "hljs-addition": {
      color: "#a31515",
    },
    "hljs-deletion": {
      color: "#2b91af",
    },
    "hljs-selector-attr": {
      color: "#2b91af",
    },
    "hljs-selector-pseudo": {
      color: "#2b91af",
    },
    "hljs-meta": {
      color: "#2b91af",
    },
    "hljs-doctag": {
      color: "#808080",
    },
    "hljs-attr": {
      color: "#f00",
    },
    "hljs-symbol": {
      color: "#00b0e8",
    },
    "hljs-bullet": {
      color: "#00b0e8",
    },
    "hljs-link": {
      color: "#00b0e8",
    },
    "hljs-emphasis": {
      fontStyle: "italic",
    },
    "hljs-strong": {
      fontWeight: "bold",
    },
  },
  pa = "_codeblock_309cc_1",
  ha = {
    codeblock: pa,
  };
kt.registerLanguage("javascript", ta);
kt.registerLanguage("javascript", oa);
kt.registerLanguage("markdown", ca);
const ga = { vs: fa, solarizedDark: la, solarizedLight: da },
  va = ({
    code: e,
    language: t,
    fileName: o,
    theme: n = "vs",
    showLineNumbers: r,
  }) =>
    /* @__PURE__ */ w.jsxs(Mt, {
      className: ha.codeblock,
      children: [
        o ? /* @__PURE__ */ w.jsx(Br, { children: o }) : null,
        /* @__PURE__ */ w.jsx($t, {
          children: /* @__PURE__ */ w.jsx(kt, {
            showLineNumbers: r,
            language: t,
            style: ga[n],
            children: e,
          }),
        }),
      ],
    }),
  ma = va,
  ya = ({ pos: e, onAddComment: t }) =>
    Cn(
      /* @__PURE__ */ w.jsx(Ms, {
        children:
          e &&
          /* @__PURE__ */ w.jsx(Ft, {
            onClick: t,
            id: `${Lt}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: hi + 5,
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
            children: /* @__PURE__ */ w.jsx(oo, {}),
          }),
      }),
      e.element.parentElement,
    ),
  Ea = ya,
  ba = () => {
    const {
        state: { isRightPanelOpen: e },
      } = ys(),
      t = Ae(),
      o = () => {
        t(Pn(!e));
      };
    return /* @__PURE__ */ w.jsx(Ft, {
      onClick: o,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  _a = ba,
  rt = {
    get: async (e, t, o) => ({}),
    post: async (e, t, o) => ({}),
  },
  Sa = (e) => rt.get(`dbt/dbt_docs_share/${e}`),
  Ca = (e, t, o) =>
    rt.post(`dbt/dbt_docs_share/${e}/conversation_group`, {
      ...t,
      telemetry: {
        eventName: "dbtCollaboration:create",
        properties: { source: o },
      },
    }),
  Ta = (e, t, o, n) =>
    rt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, {
      ...o,
      telemetry: {
        eventName: "dbtCollaboration:reply",
        properties: { source: n },
      },
    }),
  Oa = (e) => rt.get(`dbt/dbt_docs_share/${e}/conversations`),
  Aa = (e) => rt.get("users/chat", { company: e }),
  Ra = (e, t, o) =>
    rt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
      telemetry: {
        eventName: "dbtCollaboration:resolve",
        properties: { source: o },
      },
    }),
  Da = () => {
    const e = ue((u) => u.shareId),
      [t, o] = ge(null),
      [n, r] = ge(!1),
      i = Ae();
    Oe(() => {
      t != null &&
        t.manifest_presigned_url &&
        fetch(t.manifest_presigned_url)
          .then((u) => u.json())
          .then((u) => {
            i(gs(u));
          })
          .catch((u) =>
            console.error(
              "error loading manifest",
              u,
              t.manifest_presigned_url,
            ),
          );
    }, [i, t == null ? void 0 : t.manifest_presigned_url]);
    const s = Me(async () => {
      if (!e) return;
      r(!0);
      const u = await Sa(e);
      if (u) {
        o(u);
        const c = document.getElementById("collapse-sidebar");
        c == null || c.click();
      }
      r(!1);
    }, [e]);
    return (
      Oe(() => {
        !e || t || n || s();
      }, [e, t, s, n]),
      { shareDetails: t, loading: n }
    );
  },
  wa = () => {
    const e = ue((a) =>
        a.selectedConversationId
          ? a.conversations[a.selectedConversationId]
          : null,
      ),
      t = ue((a) => a.docsAppRendered),
      o = ue((a) => a.newConversation),
      n = Ae(),
      [r, i] = ge(null),
      [s, u] = ge(null);
    Oe(() => {
      o && (i(null), u(null));
    }, [o]);
    const c = Me(() => {
      console.log("resetHighlights"), r && vi(r), u(null), i(null);
    }, [r]);
    return (
      Oe(() => {
        !e ||
          !t ||
          (e.meta.resource_type &&
            e.meta.uniqueId &&
            (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`));
      }, [e, t, n]),
      {
        getHighlightedSelectionData: () => r,
        pos: s,
        onSelectionEnd: (a) => {
          const l = a.target,
            f = yi(l),
            { end: h, start: p } = a.detail.selectionRange,
            m = document.getSelection();
          if (!m || !m.rangeCount) return c(), null;
          const E = m.getRangeAt(0).toString(),
            b = l == null ? void 0 : l.innerText;
          if (!E || !b) return;
          const { end: S, start: A, x: y, y: N } = Ei(f, l, E, h, p);
          console.log("selection range", S, A, y, N);
          const F = {
            meta: {
              filePath: "",
              field: f,
              highlight: E,
              range: {
                end: { line: S, character: 0 },
                start: { line: A, character: 0 },
              },
            },
          };
          n(Fn()),
            u({
              x: y,
              y: N,
              element: l,
            }),
            document.body.addEventListener("click", c, { once: !0 }),
            i(F);
        },
      }
    );
  },
  Ia = ({ conversationGroup: e }) => {
    const t = ue((u) => u.selectedConversationId),
      o = Ae(),
      n = De(null),
      r = Ne(() => mi(e.meta), [e.meta]),
      i = () => {
        o(jn(e.conversation_group_id));
      },
      s = Ne(() => {
        if (!r) return;
        if (e.meta.field === "description")
          return { top: 0, bottom: r.offsetHeight };
        let u = 0,
          c = 0;
        for (let d = e.meta.range.start.line; d <= e.meta.range.end.line; d++) {
          const a = r.querySelector(
            `.line-numbers-rows > span:nth-child(${d + 1})`,
          );
          a &&
            (d === e.meta.range.start.line && (u = a.offsetTop + 15),
            d === e.meta.range.end.line && (c = a.offsetTop + a.offsetHeight));
        }
        return { top: u, bottom: c };
      }, [r, e.meta.field, e.meta.range.start.line, e.meta.range.end.line]);
    return (
      Oe(() => {
        var u;
        t === e.conversation_group_id &&
          ((u = n.current) == null ||
            u.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [e.conversation_group_id, t]),
      !s || !(r != null && r.parentElement)
        ? null
        : Cn(
            /* @__PURE__ */ w.jsx("div", {
              ref: n,
              className: `altimate-highlighter ${
                t === e.conversation_group_id ? "active" : ""
              }`,
              style: { top: s.top, height: s.bottom - s.top },
              onClick: i,
              children: /* @__PURE__ */ w.jsx($s, {}),
            }),
            r.parentElement,
          )
    );
  },
  xa = Ia,
  Na = () => {
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
              xa,
              {
                conversationGroup: r,
              },
              r.conversation_group_id,
            ),
          ),
        });
  },
  ja = Na,
  Pa = "_dbtDocs_14zop_9",
  Fa = "_hotspotButton_14zop_46",
  Ma = "_pulse_14zop_1",
  $a = "_conversationRightPanelCloseButton_14zop_62",
  ka = "_conversationRightPanel_14zop_62",
  La = "_newConversationForm_14zop_94",
  Ba = "_highlightText_14zop_108",
  Ha = "_conversationInputForm_14zop_130",
  Ua = "_conversationGroup_14zop_156",
  za = "_replyForm_14zop_189",
  qa = "_resolveButton_14zop_237",
  Pe = {
    dbtDocs: Pa,
    hotspotButton: Fa,
    pulse: Ma,
    conversationRightPanelCloseButton: $a,
    conversationRightPanel: ka,
    newConversationForm: La,
    highlightText: Ba,
    conversationInputForm: Ha,
    conversationGroup: Ua,
    replyForm: za,
    resolveButton: qa,
  },
  Va = "_profileImage_11vaf_1",
  Wa = {
    profileImage: Va,
  },
  Ya = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ w.jsx("div", {
      className: Wa.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  ao = Ya;
function Ka(e) {
  if (Array.isArray(e)) {
    for (var t = 0, o = new Array(e.length); t < e.length; t++) o[t] = e[t];
    return o;
  }
}
function Ga(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function Xa() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function Nt(e) {
  return Ka(e) || Ga(e) || Xa();
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
function Za(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function mr(e, t) {
  for (var o = 0; o < t.length; o++) {
    var n = t[o];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function Ja(e, t, o) {
  return t && mr(e.prototype, t), o && mr(e, o), e;
}
function te(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function yn(e, t) {
  return (
    (yn =
      Object.setPrototypeOf ||
      function (n, r) {
        return (n.__proto__ = r), n;
      }),
    yn(e, t)
  );
}
function Qa(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && yn(e, t);
}
function Je(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (Je = function (o) {
          return typeof o;
        })
      : (Je = function (o) {
          return o &&
            typeof Symbol == "function" &&
            o.constructor === Symbol &&
            o !== Symbol.prototype
            ? "symbol"
            : typeof o;
        }),
    Je(e)
  );
}
function Ot(e) {
  return (
    typeof Symbol == "function" && Je(Symbol.iterator) === "symbol"
      ? (Ot = function (o) {
          return Je(o);
        })
      : (Ot = function (o) {
          return o &&
            typeof Symbol == "function" &&
            o.constructor === Symbol &&
            o !== Symbol.prototype
            ? "symbol"
            : Je(o);
        }),
    Ot(e)
  );
}
function eu(e, t) {
  return t && (Ot(t) === "object" || typeof t == "function") ? t : te(e);
}
function jt(e) {
  return (
    (jt = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        }),
    jt(e)
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
var tu = function (e, t, o, n, r, i, s, u) {
    if (process.env.NODE_ENV !== "production" && t === void 0)
      throw new Error("invariant requires an error message argument");
    if (!e) {
      var c;
      if (t === void 0)
        c = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var d = [o, n, r, i, s, u],
          a = 0;
        (c = new Error(
          t.replace(/%s/g, function () {
            return d[a++];
          }),
        )),
          (c.name = "Invariant Violation");
      }
      throw ((c.framesToPop = 1), c);
    }
  },
  nu = tu;
const nt = /* @__PURE__ */ Ve(nu);
function ru(e) {
  if (Array.isArray(e)) return e;
}
function ou(e, t) {
  var o = [],
    n = !0,
    r = !1,
    i = void 0;
  try {
    for (
      var s = e[Symbol.iterator](), u;
      !(n = (u = s.next()).done) && (o.push(u.value), !(t && o.length === t));
      n = !0
    );
  } catch (c) {
    (r = !0), (i = c);
  } finally {
    try {
      !n && s.return != null && s.return();
    } finally {
      if (r) throw i;
    }
  }
  return o;
}
function iu() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function Pt(e, t) {
  return ru(e) || ou(e, t) || iu();
}
function su(e, t) {
  if (e == null) return {};
  var o = {},
    n = Object.keys(e),
    r,
    i;
  for (i = 0; i < n.length; i++)
    (r = n[i]), !(t.indexOf(r) >= 0) && (o[r] = e[r]);
  return o;
}
function au(e, t) {
  if (e == null) return {};
  var o = su(e, t),
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
function pt(e) {
  "@babel/helpers - typeof";
  return (
    (pt =
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
    pt(e)
  );
}
function uu(e, t) {
  if (pt(e) != "object" || !e) return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var n = o.call(e, t || "default");
    if (pt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function cu(e) {
  var t = uu(e, "string");
  return pt(t) == "symbol" ? t : t + "";
}
function ht(e, t, o) {
  return (
    (t = cu(t)),
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
function En(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
  return n;
}
function lu(e) {
  if (Array.isArray(e)) return En(e);
}
function du(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function fu(e, t) {
  if (e) {
    if (typeof e == "string") return En(e, t);
    var o = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (o === "Object" && e.constructor && (o = e.constructor.name),
      o === "Map" || o === "Set")
    )
      return Array.from(e);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return En(e, t);
  }
}
function pu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xe(e) {
  return lu(e) || du(e) || fu(e) || pu();
}
var ot = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  uo = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function co(e, t) {
  var o = Object.assign({}, e);
  return (
    At(e) &&
      At(t) &&
      ot(t).forEach(function (n) {
        At(t[n])
          ? n in e
            ? (o[n] = co(e[n], t[n]))
            : Object.assign(o, ht({}, n, t[n]))
          : Object.assign(o, ht({}, n, t[n]));
      }),
    o
  );
}
var bn = function (t) {
    for (
      var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1;
      r < o;
      r++
    )
      n[r - 1] = arguments[r];
    return n.reduce(function (i, s) {
      return co(i, s);
    }, t);
  },
  hu = function (t, o) {
    var n = Object.assign({}, t);
    if (o) for (var r = 0; r < o.length; r++) delete n[o[r]];
    return n;
  },
  At = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  gu = function (t) {
    return (t || []).filter(Boolean);
  },
  $n = function (t) {
    return t[0] === "&";
  },
  vu = function (t) {
    return !$n(t);
  },
  yr = function (t) {
    return t.replace(/-(\w)/g, function (o, n) {
      return n.toUpperCase();
    });
  },
  mu = function (t) {
    for (
      var o =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        n = ot(t),
        r = {},
        i = 0,
        s = n.length;
      i < s;
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
  lo = function (t, o) {
    for (
      var n = o.map(yr), r = ot(t), i = {}, s = 0, u = r.length;
      s < u;
      s += 1
    ) {
      var c = r[s];
      (o.indexOf(c) >= 0 || n.indexOf(yr(c)) >= 0) && (i[c] = t[c]);
    }
    return i;
  },
  yu = function e(t, o) {
    for (
      var n = bn.apply(void 0, [{}, hu(t, o)].concat(xe(uo(lo(t, o))))),
        r = ot(n).filter($n),
        i = 0,
        s = r.length;
      i < s;
      i += 1
    ) {
      var u = r[i],
        c = e(n[u], o);
      o.indexOf(u) >= 0 ? (delete n[u], (n = bn({}, n, c))) : (n[u] = c);
    }
    return n;
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
function br(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Er(Object(o), !0).forEach(function (n) {
          ht(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : Er(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var Eu = ["animationName"],
  bu = function (t) {
    var o = t.style,
      n = t.className;
    return br(
      br(
        {},
        o
          ? {
              style: mu(o, Eu),
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
const fo = bu;
var po = /* @__PURE__ */ ze(fo);
po.Provider;
var ho = function (t) {
    if (t) {
      if (typeof t == "string") return [t];
      if (!Array.isArray(t)) {
        var o = t;
        return ot(t).reduce(function (n, r) {
          return n.concat(o[r] ? [r] : []);
        }, []);
      }
    } else return [];
    return t;
  },
  _u = {},
  Su = function (t) {
    return function (o, n) {
      var r = n || _u;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var i;
      t.memoize.has(r)
        ? (i = t.memoize.get(r))
        : ((i = {}), t.memoize.set(r, i));
      var s = ho(o).join(" ");
      return s in i ? i[s] : (i[s] = t(o || [], n));
    };
  };
function _r(e, t) {
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
function Ge(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? _r(Object(o), !0).forEach(function (n) {
          ht(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : _r(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var Cu = function (t) {
    var o = t && ot(t)[0];
    return o && o.split("__")[0].split("--")[0];
  },
  Tu = function (t, o, n) {
    if (t) {
      var r = t.split(" ")[0],
        i = [].concat(
          xe(
            o.length === 0
              ? n.map(function (s) {
                  return "".concat(r, "--").concat(s.substring(1));
                })
              : [],
          ),
          xe(
            o.map(function (s) {
              return "".concat(r, "__").concat(s);
            }),
          ),
        );
      return o.length === 0 ? [t].concat(xe(i)) : i;
    }
  };
function go(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fo,
    i = o || Cu(n) || (t == null ? void 0 : t.className),
    s =
      typeof t == "function"
        ? t
        : Su(function (l, f) {
            var h = ho(l);
            nt(
              Array.isArray(h),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              nt(
                !f || At(f),
                "Optional second parameter must be a plain object.",
              );
            var p = h.filter($n),
              m = h.filter(vu),
              v =
                m.length > 0
                  ? function (S) {
                      return uo(lo(S, m));
                    }
                  : function (S) {
                      return [S];
                    },
              E = function () {
                var A =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return v(yu(A, p));
              },
              b = Tu(i, m, p);
            return go(
              Ge(
                Ge(
                  Ge(
                    {},
                    (t || f) && {
                      style: bn.apply(void 0, [{}].concat(xe(E(f)), xe(E(t)))),
                    },
                  ),
                  b && {
                    className: b.join(" "),
                  },
                ),
                n && {
                  classNames: n,
                },
              ),
              r,
            );
          }),
    u = Ge(
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
      ? gu(
          c.map(function (l) {
            return n[l];
          }),
        )
      : c,
    a = r(
      Ge(
        Ge({}, u),
        d.length > 0
          ? {
              className: d.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(s, a), s;
}
function Sr(e, t) {
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
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Sr(Object(o), !0).forEach(function (n) {
          ht(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : Sr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var Ou = function () {
    for (var t = arguments.length, o = new Array(t), n = 0; n < t; n++)
      o[n] = arguments[n];
    return o.reduce(function (r, i) {
      return ut(
        ut(ut({}, r), typeof i == "function" ? i : {}),
        {},
        {
          style: ut(ut({}, r.style), typeof i == "function" ? i.style : i),
        },
      );
    }, {});
  },
  kn = function (t, o, n) {
    var r = o.style,
      i = o.className,
      s = o.classNames,
      u = qe(po),
      c = Ne(
        function () {
          return go(
            {
              style: r,
              className: i,
              classNames: s,
            },
            u,
          );
        },
        [r, i, s, u],
      );
    return c(n, t);
  },
  _n = { exports: {} },
  St = { exports: {} },
  se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cr;
function Au() {
  if (Cr) return se;
  Cr = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    t = e ? Symbol.for("react.element") : 60103,
    o = e ? Symbol.for("react.portal") : 60106,
    n = e ? Symbol.for("react.fragment") : 60107,
    r = e ? Symbol.for("react.strict_mode") : 60108,
    i = e ? Symbol.for("react.profiler") : 60114,
    s = e ? Symbol.for("react.provider") : 60109,
    u = e ? Symbol.for("react.context") : 60110,
    c = e ? Symbol.for("react.async_mode") : 60111,
    d = e ? Symbol.for("react.concurrent_mode") : 60111,
    a = e ? Symbol.for("react.forward_ref") : 60112,
    l = e ? Symbol.for("react.suspense") : 60113,
    f = e ? Symbol.for("react.suspense_list") : 60120,
    h = e ? Symbol.for("react.memo") : 60115,
    p = e ? Symbol.for("react.lazy") : 60116,
    m = e ? Symbol.for("react.block") : 60121,
    v = e ? Symbol.for("react.fundamental") : 60117,
    E = e ? Symbol.for("react.responder") : 60118,
    b = e ? Symbol.for("react.scope") : 60119;
  function S(y) {
    if (typeof y == "object" && y !== null) {
      var N = y.$$typeof;
      switch (N) {
        case t:
          switch (((y = y.type), y)) {
            case c:
            case d:
            case n:
            case i:
            case r:
            case l:
              return y;
            default:
              switch (((y = y && y.$$typeof), y)) {
                case u:
                case a:
                case p:
                case h:
                case s:
                  return y;
                default:
                  return N;
              }
          }
        case o:
          return N;
      }
    }
  }
  function A(y) {
    return S(y) === d;
  }
  return (
    (se.AsyncMode = c),
    (se.ConcurrentMode = d),
    (se.ContextConsumer = u),
    (se.ContextProvider = s),
    (se.Element = t),
    (se.ForwardRef = a),
    (se.Fragment = n),
    (se.Lazy = p),
    (se.Memo = h),
    (se.Portal = o),
    (se.Profiler = i),
    (se.StrictMode = r),
    (se.Suspense = l),
    (se.isAsyncMode = function (y) {
      return A(y) || S(y) === c;
    }),
    (se.isConcurrentMode = A),
    (se.isContextConsumer = function (y) {
      return S(y) === u;
    }),
    (se.isContextProvider = function (y) {
      return S(y) === s;
    }),
    (se.isElement = function (y) {
      return typeof y == "object" && y !== null && y.$$typeof === t;
    }),
    (se.isForwardRef = function (y) {
      return S(y) === a;
    }),
    (se.isFragment = function (y) {
      return S(y) === n;
    }),
    (se.isLazy = function (y) {
      return S(y) === p;
    }),
    (se.isMemo = function (y) {
      return S(y) === h;
    }),
    (se.isPortal = function (y) {
      return S(y) === o;
    }),
    (se.isProfiler = function (y) {
      return S(y) === i;
    }),
    (se.isStrictMode = function (y) {
      return S(y) === r;
    }),
    (se.isSuspense = function (y) {
      return S(y) === l;
    }),
    (se.isValidElementType = function (y) {
      return (
        typeof y == "string" ||
        typeof y == "function" ||
        y === n ||
        y === d ||
        y === i ||
        y === r ||
        y === l ||
        y === f ||
        (typeof y == "object" &&
          y !== null &&
          (y.$$typeof === p ||
            y.$$typeof === h ||
            y.$$typeof === s ||
            y.$$typeof === u ||
            y.$$typeof === a ||
            y.$$typeof === v ||
            y.$$typeof === E ||
            y.$$typeof === b ||
            y.$$typeof === m))
      );
    }),
    (se.typeOf = S),
    se
  );
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
var Tr;
function Ru() {
  return (
    Tr ||
      ((Tr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = typeof Symbol == "function" && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            o = e ? Symbol.for("react.portal") : 60106,
            n = e ? Symbol.for("react.fragment") : 60107,
            r = e ? Symbol.for("react.strict_mode") : 60108,
            i = e ? Symbol.for("react.profiler") : 60114,
            s = e ? Symbol.for("react.provider") : 60109,
            u = e ? Symbol.for("react.context") : 60110,
            c = e ? Symbol.for("react.async_mode") : 60111,
            d = e ? Symbol.for("react.concurrent_mode") : 60111,
            a = e ? Symbol.for("react.forward_ref") : 60112,
            l = e ? Symbol.for("react.suspense") : 60113,
            f = e ? Symbol.for("react.suspense_list") : 60120,
            h = e ? Symbol.for("react.memo") : 60115,
            p = e ? Symbol.for("react.lazy") : 60116,
            m = e ? Symbol.for("react.block") : 60121,
            v = e ? Symbol.for("react.fundamental") : 60117,
            E = e ? Symbol.for("react.responder") : 60118,
            b = e ? Symbol.for("react.scope") : 60119;
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
                  $.$$typeof === h ||
                  $.$$typeof === s ||
                  $.$$typeof === u ||
                  $.$$typeof === a ||
                  $.$$typeof === v ||
                  $.$$typeof === E ||
                  $.$$typeof === b ||
                  $.$$typeof === m))
            );
          }
          function A($) {
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
                        case a:
                        case p:
                        case h:
                        case s:
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
          var y = c,
            N = d,
            F = u,
            _ = s,
            H = t,
            O = a,
            k = n,
            Z = p,
            G = h,
            j = o,
            I = i,
            T = r,
            x = l,
            D = !1;
          function L($) {
            return (
              D ||
                ((D = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              C($) || A($) === c
            );
          }
          function C($) {
            return A($) === d;
          }
          function R($) {
            return A($) === u;
          }
          function U($) {
            return A($) === s;
          }
          function z($) {
            return typeof $ == "object" && $ !== null && $.$$typeof === t;
          }
          function q($) {
            return A($) === a;
          }
          function K($) {
            return A($) === n;
          }
          function W($) {
            return A($) === p;
          }
          function Y($) {
            return A($) === h;
          }
          function J($) {
            return A($) === o;
          }
          function Q($) {
            return A($) === i;
          }
          function V($) {
            return A($) === r;
          }
          function le($) {
            return A($) === l;
          }
          (ae.AsyncMode = y),
            (ae.ConcurrentMode = N),
            (ae.ContextConsumer = F),
            (ae.ContextProvider = _),
            (ae.Element = H),
            (ae.ForwardRef = O),
            (ae.Fragment = k),
            (ae.Lazy = Z),
            (ae.Memo = G),
            (ae.Portal = j),
            (ae.Profiler = I),
            (ae.StrictMode = T),
            (ae.Suspense = x),
            (ae.isAsyncMode = L),
            (ae.isConcurrentMode = C),
            (ae.isContextConsumer = R),
            (ae.isContextProvider = U),
            (ae.isElement = z),
            (ae.isForwardRef = q),
            (ae.isFragment = K),
            (ae.isLazy = W),
            (ae.isMemo = Y),
            (ae.isPortal = J),
            (ae.isProfiler = Q),
            (ae.isStrictMode = V),
            (ae.isSuspense = le),
            (ae.isValidElementType = S),
            (ae.typeOf = A);
        })()),
    ae
  );
}
var Or;
function vo() {
  return (
    Or ||
      ((Or = 1),
      process.env.NODE_ENV === "production"
        ? (St.exports = Au())
        : (St.exports = Ru())),
    St.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var rn, Ar;
function Du() {
  if (Ar) return rn;
  Ar = 1;
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
      for (var s = {}, u = 0; u < 10; u++) s["_" + String.fromCharCode(u)] = u;
      var c = Object.getOwnPropertyNames(s).map(function (a) {
        return s[a];
      });
      if (c.join("") !== "0123456789") return !1;
      var d = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function (a) {
          d[a] = a;
        }),
        Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst"
      );
    } catch {
      return !1;
    }
  }
  return (
    (rn = r()
      ? Object.assign
      : function (i, s) {
          for (var u, c = n(i), d, a = 1; a < arguments.length; a++) {
            u = Object(arguments[a]);
            for (var l in u) t.call(u, l) && (c[l] = u[l]);
            if (e) {
              d = e(u);
              for (var f = 0; f < d.length; f++)
                o.call(u, d[f]) && (c[d[f]] = u[d[f]]);
            }
          }
          return c;
        }),
    rn
  );
}
var on, Rr;
function Ln() {
  if (Rr) return on;
  Rr = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (on = e), on;
}
var sn, Dr;
function mo() {
  return (
    Dr ||
      ((Dr = 1), (sn = Function.call.bind(Object.prototype.hasOwnProperty))),
    sn
  );
}
var an, wr;
function wu() {
  if (wr) return an;
  wr = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = Ln(),
      o = {},
      n = mo();
    e = function (i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function r(i, s, u, c, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var a in i)
        if (n(i, a)) {
          var l;
          try {
            if (typeof i[a] != "function") {
              var f = Error(
                (c || "React class") +
                  ": " +
                  u +
                  " type `" +
                  a +
                  "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                  typeof i[a] +
                  "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
              );
              throw ((f.name = "Invariant Violation"), f);
            }
            l = i[a](s, a, c, u, null, t);
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
                  a +
                  "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
                  typeof l +
                  ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
              ),
            l instanceof Error && !(l.message in o))
          ) {
            o[l.message] = !0;
            var h = d ? d() : "";
            e("Failed " + u + " type: " + l.message + (h ?? ""));
          }
        }
    }
  }
  return (
    (r.resetWarningCache = function () {
      process.env.NODE_ENV !== "production" && (o = {});
    }),
    (an = r),
    an
  );
}
var un, Ir;
function Iu() {
  if (Ir) return un;
  Ir = 1;
  var e = vo(),
    t = Du(),
    o = Ln(),
    n = mo(),
    r = wu(),
    i = function () {};
  process.env.NODE_ENV !== "production" &&
    (i = function (u) {
      var c = "Warning: " + u;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {}
    });
  function s() {
    return null;
  }
  return (
    (un = function (u, c) {
      var d = typeof Symbol == "function" && Symbol.iterator,
        a = "@@iterator";
      function l(C) {
        var R = C && ((d && C[d]) || C[a]);
        if (typeof R == "function") return R;
      }
      var f = "<<anonymous>>",
        h = {
          array: E("array"),
          bigint: E("bigint"),
          bool: E("boolean"),
          func: E("function"),
          number: E("number"),
          object: E("object"),
          string: E("string"),
          symbol: E("symbol"),
          any: b(),
          arrayOf: S,
          element: A(),
          elementType: y(),
          instanceOf: N,
          node: O(),
          objectOf: _,
          oneOf: F,
          oneOfType: H,
          shape: Z,
          exact: G,
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
      function v(C) {
        if (process.env.NODE_ENV !== "production")
          var R = {},
            U = 0;
        function z(K, W, Y, J, Q, V, le) {
          if (((J = J || f), (V = V || Y), le !== o)) {
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
              !R[he] && // Avoid spamming the console because they are often not actionable except for lib authors
                U < 3 &&
                (i(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    V +
                    "` prop on `" +
                    J +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (R[he] = !0),
                U++);
            }
          }
          return W[Y] == null
            ? K
              ? W[Y] === null
                ? new m(
                    "The " +
                      Q +
                      " `" +
                      V +
                      "` is marked as required " +
                      ("in `" + J + "`, but its value is `null`."),
                  )
                : new m(
                    "The " +
                      Q +
                      " `" +
                      V +
                      "` is marked as required in " +
                      ("`" + J + "`, but its value is `undefined`."),
                  )
              : null
            : C(W, Y, J, Q, V);
        }
        var q = z.bind(null, !1);
        return (q.isRequired = z.bind(null, !0)), q;
      }
      function E(C) {
        function R(U, z, q, K, W, Y) {
          var J = U[z],
            Q = T(J);
          if (Q !== C) {
            var V = x(J);
            return new m(
              "Invalid " +
                K +
                " `" +
                W +
                "` of type " +
                ("`" + V + "` supplied to `" + q + "`, expected ") +
                ("`" + C + "`."),
              { expectedType: C },
            );
          }
          return null;
        }
        return v(R);
      }
      function b() {
        return v(s);
      }
      function S(C) {
        function R(U, z, q, K, W) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                W +
                "` of component `" +
                q +
                "` has invalid PropType notation inside arrayOf.",
            );
          var Y = U[z];
          if (!Array.isArray(Y)) {
            var J = T(Y);
            return new m(
              "Invalid " +
                K +
                " `" +
                W +
                "` of type " +
                ("`" + J + "` supplied to `" + q + "`, expected an array."),
            );
          }
          for (var Q = 0; Q < Y.length; Q++) {
            var V = C(Y, Q, q, K, W + "[" + Q + "]", o);
            if (V instanceof Error) return V;
          }
          return null;
        }
        return v(R);
      }
      function A() {
        function C(R, U, z, q, K) {
          var W = R[U];
          if (!u(W)) {
            var Y = T(W);
            return new m(
              "Invalid " +
                q +
                " `" +
                K +
                "` of type " +
                ("`" +
                  Y +
                  "` supplied to `" +
                  z +
                  "`, expected a single ReactElement."),
            );
          }
          return null;
        }
        return v(C);
      }
      function y() {
        function C(R, U, z, q, K) {
          var W = R[U];
          if (!e.isValidElementType(W)) {
            var Y = T(W);
            return new m(
              "Invalid " +
                q +
                " `" +
                K +
                "` of type " +
                ("`" +
                  Y +
                  "` supplied to `" +
                  z +
                  "`, expected a single ReactElement type."),
            );
          }
          return null;
        }
        return v(C);
      }
      function N(C) {
        function R(U, z, q, K, W) {
          if (!(U[z] instanceof C)) {
            var Y = C.name || f,
              J = L(U[z]);
            return new m(
              "Invalid " +
                K +
                " `" +
                W +
                "` of type " +
                ("`" + J + "` supplied to `" + q + "`, expected ") +
                ("instance of `" + Y + "`."),
            );
          }
          return null;
        }
        return v(R);
      }
      function F(C) {
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
            s
          );
        function R(U, z, q, K, W) {
          for (var Y = U[z], J = 0; J < C.length; J++)
            if (p(Y, C[J])) return null;
          var Q = JSON.stringify(C, function (le, $) {
            var he = x($);
            return he === "symbol" ? String($) : $;
          });
          return new m(
            "Invalid " +
              K +
              " `" +
              W +
              "` of value `" +
              String(Y) +
              "` " +
              ("supplied to `" + q + "`, expected one of " + Q + "."),
          );
        }
        return v(R);
      }
      function _(C) {
        function R(U, z, q, K, W) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                W +
                "` of component `" +
                q +
                "` has invalid PropType notation inside objectOf.",
            );
          var Y = U[z],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                K +
                " `" +
                W +
                "` of type " +
                ("`" + J + "` supplied to `" + q + "`, expected an object."),
            );
          for (var Q in Y)
            if (n(Y, Q)) {
              var V = C(Y, Q, q, K, W + "." + Q, o);
              if (V instanceof Error) return V;
            }
          return null;
        }
        return v(R);
      }
      function H(C) {
        if (!Array.isArray(C))
          return (
            process.env.NODE_ENV !== "production" &&
              i(
                "Invalid argument supplied to oneOfType, expected an instance of array.",
              ),
            s
          );
        for (var R = 0; R < C.length; R++) {
          var U = C[R];
          if (typeof U != "function")
            return (
              i(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                  D(U) +
                  " at index " +
                  R +
                  ".",
              ),
              s
            );
        }
        function z(q, K, W, Y, J) {
          for (var Q = [], V = 0; V < C.length; V++) {
            var le = C[V],
              $ = le(q, K, W, Y, J, o);
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
              ("`" + W + "`" + he + "."),
          );
        }
        return v(z);
      }
      function O() {
        function C(R, U, z, q, K) {
          return j(R[U])
            ? null
            : new m(
                "Invalid " +
                  q +
                  " `" +
                  K +
                  "` supplied to " +
                  ("`" + z + "`, expected a ReactNode."),
              );
        }
        return v(C);
      }
      function k(C, R, U, z, q) {
        return new m(
          (C || "React class") +
            ": " +
            R +
            " type `" +
            U +
            "." +
            z +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            q +
            "`.",
        );
      }
      function Z(C) {
        function R(U, z, q, K, W) {
          var Y = U[z],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                K +
                " `" +
                W +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + q + "`, expected `object`."),
            );
          for (var Q in C) {
            var V = C[Q];
            if (typeof V != "function") return k(q, K, W, Q, x(V));
            var le = V(Y, Q, q, K, W + "." + Q, o);
            if (le) return le;
          }
          return null;
        }
        return v(R);
      }
      function G(C) {
        function R(U, z, q, K, W) {
          var Y = U[z],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                K +
                " `" +
                W +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + q + "`, expected `object`."),
            );
          var Q = t({}, U[z], C);
          for (var V in Q) {
            var le = C[V];
            if (n(C, V) && typeof le != "function") return k(q, K, W, V, x(le));
            if (!le)
              return new m(
                "Invalid " +
                  K +
                  " `" +
                  W +
                  "` key `" +
                  V +
                  "` supplied to `" +
                  q +
                  "`.\nBad object: " +
                  JSON.stringify(U[z], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(C), null, "  "),
              );
            var $ = le(Y, V, q, K, W + "." + V, o);
            if ($) return $;
          }
          return null;
        }
        return v(R);
      }
      function j(C) {
        switch (typeof C) {
          case "number":
          case "string":
          case "undefined":
            return !0;
          case "boolean":
            return !C;
          case "object":
            if (Array.isArray(C)) return C.every(j);
            if (C === null || u(C)) return !0;
            var R = l(C);
            if (R) {
              var U = R.call(C),
                z;
              if (R !== C.entries) {
                for (; !(z = U.next()).done; ) if (!j(z.value)) return !1;
              } else
                for (; !(z = U.next()).done; ) {
                  var q = z.value;
                  if (q && !j(q[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function I(C, R) {
        return C === "symbol"
          ? !0
          : R
          ? R["@@toStringTag"] === "Symbol" ||
            (typeof Symbol == "function" && R instanceof Symbol)
          : !1;
      }
      function T(C) {
        var R = typeof C;
        return Array.isArray(C)
          ? "array"
          : C instanceof RegExp
          ? "object"
          : I(R, C)
          ? "symbol"
          : R;
      }
      function x(C) {
        if (typeof C > "u" || C === null) return "" + C;
        var R = T(C);
        if (R === "object") {
          if (C instanceof Date) return "date";
          if (C instanceof RegExp) return "regexp";
        }
        return R;
      }
      function D(C) {
        var R = x(C);
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
      function L(C) {
        return !C.constructor || !C.constructor.name ? f : C.constructor.name;
      }
      return (
        (h.checkPropTypes = r),
        (h.resetWarningCache = r.resetWarningCache),
        (h.PropTypes = h),
        h
      );
    }),
    un
  );
}
var cn, xr;
function xu() {
  if (xr) return cn;
  xr = 1;
  var e = Ln();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (cn = function () {
      function n(s, u, c, d, a, l) {
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
    cn
  );
}
if (process.env.NODE_ENV !== "production") {
  var Nu = vo(),
    ju = !0;
  _n.exports = Iu()(Nu.isElement, ju);
} else _n.exports = xu()();
var Pu = _n.exports;
const M = /* @__PURE__ */ Ve(Pu);
var Rt = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  we = {
    id: "__id__",
    display: "__display__",
  },
  Nr = function (t, o) {
    nt(
      o === "id" || o === "display",
      'Second arg must be either "id" or "display", got: "'.concat(o, '"'),
    );
    var n = t.indexOf(we.display),
      r = t.indexOf(we.id);
    return (
      n < 0 && (n = null),
      r < 0 && (r = null),
      nt(
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
  Fu = function (t) {
    var o = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (n) {
          var r = o.exec(n.toString()),
            i = Pt(r, 3),
            s = i[1],
            u = i[2];
          return (
            nt(
              !u,
              "RegExp flags are not supported. Change /"
                .concat(s, "/")
                .concat(u, " into /")
                .concat(s, "/"),
            ),
            "(".concat(s, ")")
          );
        })
        .join("|"),
      "g",
    );
  },
  yo = function (t) {
    var o = 0;
    return (
      t.indexOf("__id__") >= 0 && o++, t.indexOf("__display__") >= 0 && o++, o
    );
  },
  Mu = function () {},
  vt = function (t, o, n) {
    for (
      var r =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Mu,
        i = Fu(
          o.map(function (y) {
            return y.regex;
          }),
        ),
        s = 2,
        u = o.map(function (y) {
          var N = y.markup,
            F = s;
          return (s += yo(N) + 1), F;
        }),
        c,
        d = 0,
        a = 0;
      (c = i.exec(t)) !== null;

    ) {
      var l = u.find(function (y) {
          return !!c[y];
        }),
        f = u.indexOf(l),
        h = o[f],
        p = h.markup,
        m = h.displayTransform,
        v = l + Nr(p, "id"),
        E = l + Nr(p, "display"),
        b = c[v],
        S = m(b, c[E]),
        A = t.substring(d, c.index);
      r(A, d, a),
        (a += A.length),
        n(c[0], c.index, a, b, S, f, d),
        (a += S.length),
        (d = i.lastIndex);
    }
    d < t.length && r(t.substring(d), d, a);
  },
  He = function (t, o) {
    var n = "";
    return (
      vt(
        t,
        o,
        function (r, i, s, u, c) {
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
      s = function (d, a, l) {
        i === void 0 && l + d.length >= n && (i = a + n - l);
      },
      u = function (d, a, l, f, h, p, m) {
        i === void 0 &&
          l + h.length > n &&
          (r === "NULL" ? (i = null) : (i = a + (r === "END" ? d.length : 0)));
      };
    return vt(t, o, u, s), i === void 0 ? t.length : i;
  },
  lt = function (t, o, n, r) {
    return t.substring(0, o) + r + t.substring(n);
  },
  $u = function (t, o, n, r) {
    var i = n.selectionStartBefore,
      s = n.selectionEndBefore,
      u = n.selectionEndAfter,
      c = He(t, r),
      d = c.length - o.length;
    i === "undefined" && (i = u + d),
      s === "undefined" && (s = i),
      i === s && s === u && c.length === o.length && (i = i - 1);
    var a = o.slice(i, u),
      l = Math.min(i, u),
      f = s;
    i === u && (f = Math.max(s, i + d));
    var h = me(t, r, l, "START"),
      p = me(t, r, f, "END"),
      m = me(t, r, l, "NULL"),
      v = me(t, r, f, "NULL"),
      E = m === null || v === null,
      b = lt(t, h, p, a);
    if (!E) {
      var S = He(b, r);
      if (S !== o) {
        for (l = 0; o[l] === S[l]; ) l++;
        (a = o.slice(l, u)),
          (f = c.lastIndexOf(o.substring(u))),
          (h = me(t, r, l, "START")),
          (p = me(t, r, f, "END")),
          (b = lt(t, h, p, a));
      }
    }
    return b;
  },
  jr = function (t, o, n) {
    var r = n,
      i = !1,
      s = function (c, d, a, l, f, h, p) {
        a <= n && a + f.length > n && ((r = a), (i = !0));
      };
    if ((vt(t, o, s), i)) return r;
  },
  ct = function (t, o) {
    var n = [];
    return (
      vt(t, o, function (r, i, s, u, c, d, a) {
        n.push({
          id: u,
          display: c,
          childIndex: d,
          index: i,
          plainTextIndex: s,
        });
      }),
      n
    );
  },
  Eo = function (t, o) {
    return "".concat(t, "-").concat(o);
  },
  Ct = function (t) {
    return Object.values(t).reduce(function (o, n) {
      var r = n.results;
      return o + r.length;
    }, 0);
  },
  ku = function (t, o) {
    var n = ct(t, o),
      r = n[n.length - 1];
    return r ? r.plainTextIndex + r.display.length : 0;
  },
  Lu = function (t) {
    var o = Rt(t),
      n = t[t.indexOf(we.display) + we.display.length],
      r = t[t.indexOf(we.id) + we.id.length];
    return new RegExp(
      o
        .replace(we.display, "([^".concat(Rt(n || ""), "]+?)"))
        .replace(we.id, "([^".concat(Rt(r || ""), "]+?)")),
    );
  },
  Fe = function (t) {
    return Qe.toArray(t).map(function (o) {
      var n = o.props,
        r = n.markup,
        i = n.regex,
        s = n.displayTransform;
      return {
        markup: r,
        regex: i ? Bu(i, r) : Lu(r),
        displayTransform:
          s ||
          function (u, c) {
            return c || u;
          },
      };
    });
  },
  Bu = function (t, o) {
    var n = new RegExp(t.toString() + "|").exec("").length - 1,
      r = yo(o);
    return (
      nt(
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
  Hu = function (t, o, n) {
    return t.replace(we.id, o).replace(we.display, n);
  },
  Uu = [
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
  zu = function (t) {
    var o = t;
    return (
      Uu.forEach(function (n) {
        o = o.replace(n.letters, n.base);
      }),
      o
    );
  },
  Pr = function (t) {
    return zu(t).toLowerCase();
  },
  bo = function (t, o, n) {
    return n ? Pr(t).indexOf(Pr(o)) : t.toLowerCase().indexOf(o.toLowerCase());
  },
  qu = function () {
    return !!document.documentMode;
  },
  Sn = function (t) {
    return typeof t == "number";
  },
  Vu = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  Wu = function (t) {
    for (
      var o, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
      i < n;
      i++
    )
      r[i - 1] = arguments[i];
    var s = (o = []).concat.apply(o, r);
    return Object.keys(t).reduce(function (u, c) {
      return (
        t.hasOwnProperty(c) &&
          !s.includes(c) &&
          t[c] !== void 0 &&
          (u[c] = t[c]),
        u
      );
    }, {});
  },
  Yu = ["style", "className", "classNames"];
function Fr(e, t) {
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
function Mr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Fr(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : Fr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
function Wt(e, t) {
  var o = function (r) {
    var i = function (c) {
        var d = c.style,
          a = c.className,
          l = c.classNames,
          f = au(c, Yu),
          h = t ? t(f) : void 0,
          p = kn(
            e,
            {
              style: d,
              className: a,
              classNames: l,
            },
            h,
          );
        return /* @__PURE__ */ oe.createElement(
          r,
          Te({}, f, {
            style: p,
          }),
        );
      },
      s = r.displayName || r.name || "Component";
    return (
      (i.displayName = "defaultStyle(".concat(s, ")")),
      /* @__PURE__ */ oe.forwardRef(function (u, c) {
        return i(
          Mr(
            Mr({}, u),
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
var Ku = function (t, o) {
  return t.hasOwnProperty(o) ? t[o]++ : (t[o] = 0), o + "_" + t[o];
};
function _o(e) {
  var t = e.selectionStart,
    o = e.selectionEnd,
    n = e.value,
    r = n === void 0 ? "" : n,
    i = e.onCaretPositionChange,
    s = e.containerRef,
    u = e.children;
  e.singleLine;
  var c = e.style,
    d = ge({
      left: void 0,
      top: void 0,
    }),
    a = Pt(d, 2),
    l = a[0],
    f = a[1],
    h = ge(),
    p = Pt(h, 2),
    m = p[0],
    v = p[1];
  Oe(function () {
    E();
  });
  var E = function () {
      if (m) {
        var j = m.offsetLeft,
          I = m.offsetTop;
        if (!(l.left === j && l.top === I)) {
          var T = {
            left: j,
            top: I,
          };
          f(T), i(T);
        }
      }
    },
    b = Fe(u),
    S;
  o === t && (S = me(r, b, t, "START"));
  var A = [],
    y = {},
    N = A,
    F = 0,
    _ = function (j, I, T) {
      if (Sn(S) && S >= I && S <= I + j.length) {
        var x = S - I;
        N.push(O(j.substring(0, x), F)), (N = [O(j.substring(x), F)]);
      } else N.push(O(j, F));
      F++;
    },
    H = function (j, I, T, x, D, L, C) {
      var R = Ku(y, x);
      N.push(k(x, D, L, R));
    },
    O = function (j, I) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Te({}, c("substring"), {
          key: I,
        }),
        j,
      );
    },
    k = function (j, I, T, x) {
      var D = {
          id: j,
          display: I,
          key: x,
        },
        L = Qe.toArray(u)[T];
      return /* @__PURE__ */ oe.cloneElement(L, D);
    },
    Z = function (j) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Te({}, c("caret"), {
          ref: v,
          key: "caret",
        }),
        j,
      );
    };
  return (
    vt(r, b, H, _),
    N.push(" "),
    N !== A && A.push(Z(N)),
    /* @__PURE__ */ oe.createElement(
      "div",
      Te({}, c, {
        ref: s,
      }),
      A,
    )
  );
}
_o.propTypes = {
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
var Gu = Wt(
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
  Xu = Gu(_o);
function So(e) {
  var t = e.id,
    o = e.focused,
    n = e.ignoreAccents,
    r = e.index,
    i = e.onClick,
    s = e.onMouseEnter,
    u = e.query,
    c = e.renderSuggestion,
    d = e.suggestion,
    a = e.style;
  e.className, e.classNames;
  var l = {
      onClick: i,
      onMouseEnter: s,
    },
    f = function () {
      var v = h(),
        E = p(v);
      return c ? c(d, u, E, r, o) : E;
    },
    h = function () {
      if (typeof d == "string") return d;
      var v = d.id,
        E = d.display;
      return v === void 0 || !E ? v : E;
    },
    p = function (v) {
      var E = bo(v, u, n);
      return E === -1
        ? /* @__PURE__ */ oe.createElement("span", a("display"), v)
        : /* @__PURE__ */ oe.createElement(
            "span",
            a("display"),
            v.substring(0, E),
            /* @__PURE__ */ oe.createElement(
              "b",
              a("highlight"),
              v.substring(E, E + u.length),
            ),
            v.substring(E + u.length),
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
      a,
    ),
    f(),
  );
}
So.propTypes = {
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
var Zu = Wt(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  Ju = Zu(So);
function Qu(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = kn(ec, {
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
var ec = {};
function Co(e) {
  var t = e.id,
    o = e.suggestions,
    n = o === void 0 ? {} : o,
    r = e.a11ySuggestionsListLabel,
    i = e.focusIndex,
    s = e.position,
    u = e.left,
    c = e.right,
    d = e.top,
    a = e.scrollFocusedIntoView,
    l = e.isLoading,
    f = e.isOpened,
    h = e.onSelect,
    p =
      h === void 0
        ? function () {
            return null;
          }
        : h,
    m = e.ignoreAccents,
    v = e.containerRef,
    E = e.children,
    b = e.style,
    S = e.customSuggestionsContainer,
    A = e.onMouseDown,
    y = e.onMouseEnter,
    N = ge(void 0),
    F = Pt(N, 2),
    _ = F[0],
    H = F[1];
  Oe(
    function () {
      if (!(!_ || _.offsetHeight >= _.scrollHeight || !a)) {
        var T = _.scrollTop,
          x = _.children[i].getBoundingClientRect(),
          D = x.top,
          L = x.bottom,
          C = _.getBoundingClientRect(),
          R = C.top;
        (D = D - R + T),
          (L = L - R + T),
          D < T
            ? (_.scrollTop = D)
            : L > _.offsetHeight && (_.scrollTop = L - _.offsetHeight);
      }
    },
    [i, a, _],
  );
  var O = function () {
      var x = /* @__PURE__ */ oe.createElement(
        "ul",
        Te(
          {
            ref: H,
            id: t,
            role: "listbox",
            "aria-label": r,
          },
          b("list"),
        ),
        Object.values(n).reduce(function (D, L) {
          var C = L.results,
            R = L.queryInfo;
          return [].concat(
            Nt(D),
            Nt(
              C.map(function (U, z) {
                return k(U, R, D.length + z);
              }),
            ),
          );
        }, []),
      );
      return S ? S(x) : x;
    },
    k = function (x, D, L) {
      var C = L === i,
        R = D.childIndex,
        U = D.query,
        z = Qe.toArray(E)[R].props.renderSuggestion;
      return /* @__PURE__ */ oe.createElement(Ju, {
        style: b("item"),
        key: "".concat(R, "-").concat(I(x)),
        id: Eo(t, L),
        query: U,
        index: L,
        ignoreAccents: m,
        renderSuggestion: z,
        suggestion: x,
        focused: C,
        onClick: function () {
          return j(x, D);
        },
        onMouseEnter: function () {
          return G(L);
        },
      });
    },
    Z = function () {
      if (l)
        return /* @__PURE__ */ oe.createElement(Qu, {
          style: b("loadingIndicator"),
        });
    },
    G = function (x, D) {
      y && y(x);
    },
    j = function (x, D) {
      p(x, D);
    },
    I = function (x) {
      return typeof x == "string" ? x : x.id;
    };
  return f
    ? /* @__PURE__ */ oe.createElement(
        "div",
        Te(
          {},
          Ou(
            {
              position: s || "absolute",
              left: u,
              right: c,
              top: d,
            },
            b,
          ),
          {
            onMouseDown: A,
            ref: v,
          },
        ),
        O(),
        Z(),
      )
    : null;
}
Co.propTypes = {
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
var tc = Wt({
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
  nc = tc(Co);
function $r(e, t) {
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
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? $r(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : $r(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
function rc(e) {
  var t = oc();
  return function () {
    var n = jt(e),
      r;
    if (t) {
      var i = jt(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return eu(this, r);
  };
}
function oc() {
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
var ic = function (t) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t instanceof RegExp) return t;
    var n = o.allowSpaceInQuery,
      r = Rt(t);
    return new RegExp(
      "(?:^|\\s)("
        .concat(r, "([^")
        .concat(n ? "" : "\\s")
        .concat(r, "]*))$"),
    );
  },
  sc = function (t, o) {
    return t instanceof Array
      ? function (n, r) {
          for (var i = [], s = 0, u = t.length; s < u; ++s) {
            var c = t[s].display || t[s].id;
            bo(c, n, o) >= 0 && i.push(t[s]);
          }
          return i;
        }
      : t;
  },
  Xe = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  Tt = !1,
  To = {
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
  Bn = /* @__PURE__ */ (function (e) {
    Qa(o, e);
    var t = rc(o);
    function o(n) {
      var r;
      return (
        Za(this, o),
        (r = t.call(this, n)),
        ee(te(r), "setContainerElement", function (i) {
          r.containerElement = i;
        }),
        ee(te(r), "getInputProps", function () {
          var i = r.props,
            s = i.readOnly,
            u = i.disabled,
            c = i.style,
            d = Wu(
              r.props,
              ["style", "classNames", "className"],
              // substyle props
              Vu(To),
            );
          return Re(
            Re(
              Re(Re({}, d), c("input")),
              {},
              {
                value: r.getPlainText(),
                onScroll: r.updateHighlighterScroll,
              },
              !s &&
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
              "aria-activedescendant": Eo(
                r.uuidSuggestionsOverlay,
                r.state.focusIndex,
              ),
            },
          );
        }),
        ee(te(r), "renderControl", function () {
          var i = r.props,
            s = i.singleLine,
            u = i.style,
            c = r.getInputProps();
          return /* @__PURE__ */ oe.createElement(
            "div",
            u("control"),
            r.renderHighlighter(),
            s ? r.renderInput(c) : r.renderTextarea(c),
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
          var s = r.props.inputRef;
          typeof s == "function" ? s(i) : s && (s.current = i);
        }),
        ee(te(r), "setSuggestionsElement", function (i) {
          r.suggestionsElement = i;
        }),
        ee(te(r), "renderSuggestionsOverlay", function () {
          if (!Sn(r.state.selectionStart)) return null;
          var i = r.state.suggestionsPosition,
            s = i.position,
            u = i.left,
            c = i.top,
            d = i.right,
            a = /* @__PURE__ */ oe.createElement(
              nc,
              {
                id: r.uuidSuggestionsOverlay,
                style: r.props.style("suggestions"),
                position: s,
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
            ? /* @__PURE__ */ si.createPortal(a, r.props.suggestionsPortalHost)
            : a;
        }),
        ee(te(r), "renderHighlighter", function () {
          var i = r.state,
            s = i.selectionStart,
            u = i.selectionEnd,
            c = r.props,
            d = c.singleLine,
            a = c.children,
            l = c.value,
            f = c.style;
          return /* @__PURE__ */ oe.createElement(
            Xu,
            {
              containerRef: r.setHighlighterElement,
              style: f("highlighter"),
              value: l,
              singleLine: d,
              selectionStart: s,
              selectionEnd: u,
              onCaretPositionChange: r.handleCaretPositionChange,
            },
            a,
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
          return He(r.props.value || "", Fe(r.props.children));
        }),
        ee(te(r), "executeOnChange", function (i) {
          for (
            var s = arguments.length, u = new Array(s > 1 ? s - 1 : 0), c = 1;
            c < s;
            c++
          )
            u[c - 1] = arguments[c];
          if (r.props.onChange) {
            var d;
            return (d = r.props).onChange.apply(d, [i].concat(u));
          }
          if (r.props.valueLink) {
            var a;
            return (a = r.props.valueLink).requestChange.apply(
              a,
              [i.target.value].concat(u),
            );
          }
        }),
        ee(te(r), "handleChange", function (i) {
          if (((Tt = !1), qu())) {
            var s =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (s.activeElement !== i.target) return;
          }
          var u = r.props.value || "",
            c = Fe(r.props.children),
            d = i.target.value,
            a = r.state.selectionStart;
          a == null && (a = i.target.selectionStart);
          var l = r.state.selectionEnd;
          l == null && (l = i.target.selectionEnd);
          var f = $u(
            u,
            d,
            {
              selectionStartBefore: a,
              selectionEndBefore: l,
              selectionEndAfter: i.target.selectionEnd,
            },
            c,
          );
          d = He(f, c);
          var h = i.target.selectionStart,
            p = i.target.selectionEnd,
            m = !1,
            v = jr(u, c, h);
          v !== void 0 &&
            r.state.selectionEnd > v &&
            ((h = v + (i.nativeEvent.data ? i.nativeEvent.data.length : 0)),
            (p = h),
            (m = !0)),
            r.setState({
              selectionStart: h,
              selectionEnd: p,
              setSelectionAfterMentionChange: m,
            });
          var E = ct(f, c);
          i.nativeEvent.isComposing &&
            h === p &&
            r.updateMentionsQueries(r.inputElement.value, h);
          var b = {
            target: {
              value: f,
            },
          };
          r.executeOnChange(b, f, d, E);
        }),
        ee(te(r), "handleSelect", function (i) {
          if (
            (r.setState({
              selectionStart: i.target.selectionStart,
              selectionEnd: i.target.selectionEnd,
            }),
            !Tt)
          ) {
            var s = r.inputElement;
            i.target.selectionStart === i.target.selectionEnd
              ? r.updateMentionsQueries(s.value, i.target.selectionStart)
              : r.clearSuggestions(),
              r.updateHighlighterScroll(),
              r.props.onSelect(i);
          }
        }),
        ee(te(r), "handleKeyDown", function (i) {
          var s = Ct(r.state.suggestions);
          if (s === 0 || !r.suggestionsElement) {
            r.props.onKeyDown(i);
            return;
          }
          switch (
            (Object.values(Xe).indexOf(i.keyCode) >= 0 &&
              (i.preventDefault(), i.stopPropagation()),
            i.keyCode)
          ) {
            case Xe.ESC: {
              r.clearSuggestions();
              return;
            }
            case Xe.DOWN: {
              r.shiftFocus(1);
              return;
            }
            case Xe.UP: {
              r.shiftFocus(-1);
              return;
            }
            case Xe.RETURN: {
              r.selectFocused();
              return;
            }
            case Xe.TAB: {
              r.selectFocused();
              return;
            }
            default:
              return;
          }
        }),
        ee(te(r), "shiftFocus", function (i) {
          var s = Ct(r.state.suggestions);
          r.setState({
            focusIndex: (s + r.state.focusIndex + i) % s,
            scrollFocusedIntoView: !0,
          });
        }),
        ee(te(r), "selectFocused", function () {
          var i = r.state,
            s = i.suggestions,
            u = i.focusIndex,
            c = Object.values(s).reduce(function (l, f) {
              var h = f.results,
                p = f.queryInfo;
              return [].concat(
                Nt(l),
                Nt(
                  h.map(function (m) {
                    return {
                      result: m,
                      queryInfo: p,
                    };
                  }),
                ),
              );
            }, [])[u],
            d = c.result,
            a = c.queryInfo;
          r.addMention(d, a),
            r.setState({
              focusIndex: 0,
            });
        }),
        ee(te(r), "handleBlur", function (i) {
          var s = r._suggestionsMouseDown;
          (r._suggestionsMouseDown = !1),
            s ||
              r.setState({
                selectionStart: null,
                selectionEnd: null,
              }),
            window.setTimeout(function () {
              r.updateHighlighterScroll();
            }, 1),
            r.props.onBlur(i, s);
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
            s = r.props,
            u = s.suggestionsPortalHost,
            c = s.allowSuggestionsAboveCursor,
            d = s.forceSuggestionsAboveCursor;
          if (!(!i || !r.suggestionsElement)) {
            var a = r.suggestionsElement,
              l = r.highlighterElement,
              f = l.getBoundingClientRect(),
              h = ln(l, "font-size"),
              p = {
                left: f.left + i.left,
                top: f.top + i.top + h,
              },
              m = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
              );
            if (a) {
              var v = {};
              if (u) {
                v.position = "fixed";
                var E = p.left,
                  b = p.top;
                (E -= ln(a, "margin-left")),
                  (b -= ln(a, "margin-top")),
                  (E -= l.scrollLeft),
                  (b -= l.scrollTop);
                var S = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                E + a.offsetWidth > S
                  ? (v.left = Math.max(0, S - a.offsetWidth))
                  : (v.left = E),
                  (c && b + a.offsetHeight > m && a.offsetHeight < b - h) || d
                    ? (v.top = Math.max(0, b - a.offsetHeight - h))
                    : (v.top = b);
              } else {
                var A = i.left - l.scrollLeft,
                  y = i.top - l.scrollTop;
                A + a.offsetWidth > r.containerElement.offsetWidth
                  ? (v.right = 0)
                  : (v.left = A),
                  (c &&
                    p.top - l.scrollTop + a.offsetHeight > m &&
                    a.offsetHeight < f.top - h - l.scrollTop) ||
                  d
                    ? (v.top = y - a.offsetHeight - h)
                    : (v.top = y);
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
            s = r.highlighterElement;
          !i ||
            !s ||
            ((s.scrollLeft = i.scrollLeft),
            (s.scrollTop = i.scrollTop),
            (s.height = i.height));
        }),
        ee(te(r), "handleCompositionStart", function () {
          Tt = !0;
        }),
        ee(te(r), "handleCompositionEnd", function () {
          Tt = !1;
        }),
        ee(te(r), "setSelection", function (i, s) {
          if (!(i === null || s === null)) {
            var u = r.inputElement;
            if (u.setSelectionRange) u.setSelectionRange(i, s);
            else if (u.createTextRange) {
              var c = u.createTextRange();
              c.collapse(!0),
                c.moveEnd("character", s),
                c.moveStart("character", i),
                c.select();
            }
          }
        }),
        ee(te(r), "updateMentionsQueries", function (i, s) {
          r._queryId++,
            (r.suggestions = {}),
            r.setState({
              suggestions: {},
            });
          var u = r.props.value || "",
            c = r.props.children,
            d = Fe(c),
            a = me(u, d, s, "NULL");
          if (a !== null) {
            var l = ku(u.substring(0, a), d),
              f = i.substring(l, s);
            oe.Children.forEach(c, function (h, p) {
              if (h) {
                var m = ic(h.props.trigger, r.props),
                  v = f.match(m);
                if (v) {
                  var E = l + f.indexOf(v[1], v.index);
                  r.queryData(v[2], p, E, E + v[1].length, i);
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
        ee(te(r), "queryData", function (i, s, u, c, d) {
          var a = r.props,
            l = a.children,
            f = a.ignoreAccents,
            h = Qe.toArray(l)[s],
            p = sc(h.props.data, f),
            m = p(i, r.updateSuggestions.bind(null, r._queryId, s, i, u, c, d));
          m instanceof Array &&
            r.updateSuggestions(r._queryId, s, i, u, c, d, m);
        }),
        ee(te(r), "updateSuggestions", function (i, s, u, c, d, a, l) {
          if (i === r._queryId) {
            r.suggestions = Re(
              Re({}, r.suggestions),
              {},
              ee({}, s, {
                queryInfo: {
                  childIndex: s,
                  query: u,
                  querySequenceStart: c,
                  querySequenceEnd: d,
                  plainTextValue: a,
                },
                results: l,
              }),
            );
            var f = r.state.focusIndex,
              h = Ct(r.suggestions);
            r.setState({
              suggestions: r.suggestions,
              focusIndex: f >= h ? Math.max(h - 1, 0) : f,
            });
          }
        }),
        ee(te(r), "addMention", function (i, s) {
          var u = i.id,
            c = i.display,
            d = s.childIndex,
            a = s.querySequenceStart,
            l = s.querySequenceEnd,
            f = s.plainTextValue,
            h = r.props.value || "",
            p = Fe(r.props.children),
            m = Qe.toArray(r.props.children)[d],
            v = m.props,
            E = v.markup,
            b = v.displayTransform,
            S = v.appendSpaceOnAdd,
            A = v.onAdd,
            y = me(h, p, a, "START"),
            N = y + l - a,
            F = Hu(E, u, c);
          S && (F += " ");
          var _ = lt(h, y, N, F);
          r.inputElement.focus();
          var H = b(u, c);
          S && (H += " ");
          var O = a + H.length;
          r.setState({
            selectionStart: O,
            selectionEnd: O,
            setSelectionAfterMentionChange: !0,
          });
          var k = {
              target: {
                value: _,
              },
            },
            Z = ct(_, p),
            G = lt(f, a, l, H);
          r.executeOnChange(k, _, G, Z),
            A && A(u, c, y, N),
            r.clearSuggestions();
        }),
        ee(te(r), "isLoading", function () {
          var i = !1;
          return (
            oe.Children.forEach(r.props.children, function (s) {
              i = i || (s && s.props.isLoading);
            }),
            i
          );
        }),
        ee(te(r), "isOpened", function () {
          return (
            Sn(r.state.selectionStart) &&
            (Ct(r.state.suggestions) !== 0 || r.isLoading())
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
      Ja(o, [
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
                s = i.selectionStart,
                u = i.selectionEnd,
                c = this.props,
                d = c.value,
                a = c.children,
                l = Fe(a),
                f = me(d, l, s, "START"),
                h = me(d, l, u, "END"),
                p = r.clipboardData.getData("text/react-mentions"),
                m = r.clipboardData.getData("text/plain"),
                v = lt(d, f, h, p || m).replace(/\r/g, ""),
                E = He(v, l),
                b = {
                  target: Re(
                    Re({}, r.target),
                    {},
                    {
                      value: v,
                    },
                  ),
                };
              this.executeOnChange(b, v, E, ct(v, l));
              var S = jr(d, l, s),
                A = (S || s) + He(p || m, l).length;
              this.setState({
                selectionStart: A,
                selectionEnd: A,
                setSelectionAfterHandlePaste: !0,
              });
            }
          },
        },
        {
          key: "saveSelectionToClipboard",
          value: function (r) {
            var i = this.inputElement.selectionStart,
              s = this.inputElement.selectionEnd,
              u = this.props,
              c = u.children,
              d = u.value,
              a = Fe(c),
              l = me(d, a, i, "START"),
              f = me(d, a, s, "END");
            r.clipboardData.setData("text/plain", r.target.value.slice(i, s)),
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
                s = i.selectionStart,
                u = i.selectionEnd,
                c = this.props,
                d = c.children,
                a = c.value,
                l = Fe(d),
                f = me(a, l, s, "START"),
                h = me(a, l, u, "END"),
                p = [a.slice(0, f), a.slice(h)].join(""),
                m = He(p, l),
                v = {
                  target: Re(
                    Re({}, r.target),
                    {},
                    {
                      value: m,
                    },
                  ),
                };
              this.executeOnChange(v, p, m, ct(a, l));
            }
          },
          // Handle input element's change event
        },
      ]),
      o
    );
  })(oe.Component);
ee(Bn, "propTypes", To);
ee(Bn, "defaultProps", {
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
var ln = function (t, o) {
    var n = parseFloat(window.getComputedStyle(t, null).getPropertyValue(o));
    return isFinite(n) ? n : 0;
  },
  ac = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  uc = Wt(
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
        input: Re(
          {
            height: "100%",
            bottom: 0,
            overflow: "hidden",
            resize: "none",
          },
          ac
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
  cc = uc(Bn),
  lc = {
    fontWeight: "inherit",
  },
  Hn = function (t) {
    var o = t.display,
      n = t.style,
      r = t.className,
      i = t.classNames,
      s = kn(lc, {
        style: n,
        className: r,
        classNames: i,
      });
    return /* @__PURE__ */ oe.createElement("strong", s, o);
  };
Hn.propTypes = {
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
Hn.defaultProps = {
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
const dc = {
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
  fc = ({
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
      s = (d) => {
        d.stopPropagation(),
          d.key === "Enter" &&
            !d.shiftKey &&
            (d.preventDefault(), r == null || r());
      },
      u = (d, a) => {
        console.info("[MentionsInputComponent] on mention select", {
          id: d,
          display: a,
        });
      },
      c = (d) => {
        t(d.target.value);
      };
    return /* @__PURE__ */ w.jsx(cc, {
      autoFocus: !0,
      value: e,
      onChange: c,
      style: {
        ...dc,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: n,
      className: "mentions-input",
      onKeyDown: s,
      children: /* @__PURE__ */ w.jsx(Hn, {
        displayTransform: (d, a) => `@${a}`,
        trigger: "@",
        markup: "@[__id__](__display__)",
        data: i,
        appendSpaceOnAdd: !0,
        renderSuggestion: (d, a) =>
          /* @__PURE__ */ w.jsx("div", {
            className: `user ${a ? "focused" : ""}`,
            children: d.display,
          }),
        onAdd: u,
      }),
    });
  },
  pc = fc,
  hc = ({
    comment: e,
    setComment: t,
    loading: o,
    users: n,
    currentUser: r,
    placeholder: i,
    onEnterKeypress: s,
  }) =>
    /* @__PURE__ */ w.jsxs("div", {
      className: Pe.conversationInputForm,
      children: [
        r ? /* @__PURE__ */ w.jsx(ao, { user: r }) : null,
        /* @__PURE__ */ w.jsx(pc, {
          value: e,
          setValue: t,
          users: n,
          placeholder: i,
          onEnterKeypress: s,
        }),
        /* @__PURE__ */ w.jsx(Zs, {
          loading: o,
          color: "primary",
          children: /* @__PURE__ */ w.jsx(Ls, {}),
        }),
      ],
    }),
  Oo = hc,
  gc = ({ meta: { highlight: e, filePath: t, field: o, column: n } }) => {
    if (!e) return null;
    const r = n ? `${t} (${n})` : t;
    return /* @__PURE__ */ w.jsx("div", {
      className: Pe.highlightText,
      children: /* @__PURE__ */ w.jsx(ma, {
        code: e,
        language: o ? "markdown" : "sql",
        showLineNumbers: !o,
        fileName: r,
      }),
    });
  },
  Ao = gc,
  vc = () => {
    const e = ue((a) => a.users),
      t = ue((a) => a.newConversation),
      o = ue((a) => (a.currentUserId ? a.users[a.currentUserId] : null)),
      n = ue((a) => a.shareId),
      r = Ae(),
      [i, s] = ge(!1),
      [u, c] = ge(""),
      d = async (a) => {
        if (
          (a == null || a.stopPropagation(),
          a == null || a.preventDefault(),
          !(!t || !n))
        ) {
          s(!0);
          try {
            console.log("saving conversation", t, u);
            const l = await Ca(
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
          r(to()), s(!1), r(Pn(!0)), r(Fn()), c("");
        }
      };
    return /* @__PURE__ */ w.jsx(Mt, {
      className: Pe.newConversationForm,
      children: /* @__PURE__ */ w.jsx($t, {
        children: /* @__PURE__ */ w.jsxs("form", {
          onSubmit: d,
          children: [
            /* @__PURE__ */ w.jsx("h4", { children: "Add comment" }),
            /* @__PURE__ */ w.jsx(Ao, {
              meta: (t == null ? void 0 : t.meta) || {},
            }),
            /* @__PURE__ */ w.jsx(Oo, {
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
  mc = vc;
var Ro = { exports: {} };
(function (e, t) {
  (function (o, n) {
    e.exports = n();
  })(ai, function () {
    var o = 1e3,
      n = 6e4,
      r = 36e5,
      i = "millisecond",
      s = "second",
      u = "minute",
      c = "hour",
      d = "day",
      a = "week",
      l = "month",
      f = "quarter",
      h = "year",
      p = "date",
      m = "Invalid Date",
      v =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      E =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      b = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (j) {
          var I = ["th", "st", "nd", "rd"],
            T = j % 100;
          return "[" + j + (I[(T - 20) % 10] || I[T] || I[0]) + "]";
        },
      },
      S = function (j, I, T) {
        var x = String(j);
        return !x || x.length >= I
          ? j
          : "" + Array(I + 1 - x.length).join(T) + j;
      },
      A = {
        s: S,
        z: function (j) {
          var I = -j.utcOffset(),
            T = Math.abs(I),
            x = Math.floor(T / 60),
            D = T % 60;
          return (I <= 0 ? "+" : "-") + S(x, 2, "0") + ":" + S(D, 2, "0");
        },
        m: function j(I, T) {
          if (I.date() < T.date()) return -j(T, I);
          var x = 12 * (T.year() - I.year()) + (T.month() - I.month()),
            D = I.clone().add(x, l),
            L = T - D < 0,
            C = I.clone().add(x + (L ? -1 : 1), l);
          return +(-(x + (T - D) / (L ? D - C : C - D)) || 0);
        },
        a: function (j) {
          return j < 0 ? Math.ceil(j) || 0 : Math.floor(j);
        },
        p: function (j) {
          return (
            { M: l, y: h, w: a, d, D: p, h: c, m: u, s, ms: i, Q: f }[j] ||
            String(j || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (j) {
          return j === void 0;
        },
      },
      y = "en",
      N = {};
    N[y] = b;
    var F = "$isDayjsObject",
      _ = function (j) {
        return j instanceof Z || !(!j || !j[F]);
      },
      H = function j(I, T, x) {
        var D;
        if (!I) return y;
        if (typeof I == "string") {
          var L = I.toLowerCase();
          N[L] && (D = L), T && ((N[L] = T), (D = L));
          var C = I.split("-");
          if (!D && C.length > 1) return j(C[0]);
        } else {
          var R = I.name;
          (N[R] = I), (D = R);
        }
        return !x && D && (y = D), D || (!x && y);
      },
      O = function (j, I) {
        if (_(j)) return j.clone();
        var T = typeof I == "object" ? I : {};
        return (T.date = j), (T.args = arguments), new Z(T);
      },
      k = A;
    (k.l = H),
      (k.i = _),
      (k.w = function (j, I) {
        return O(j, { locale: I.$L, utc: I.$u, x: I.$x, $offset: I.$offset });
      });
    var Z = (function () {
        function j(T) {
          (this.$L = H(T.locale, null, !0)),
            this.parse(T),
            (this.$x = this.$x || T.x || {}),
            (this[F] = !0);
        }
        var I = j.prototype;
        return (
          (I.parse = function (T) {
            (this.$d = (function (x) {
              var D = x.date,
                L = x.utc;
              if (D === null) return /* @__PURE__ */ new Date(NaN);
              if (k.u(D)) return /* @__PURE__ */ new Date();
              if (D instanceof Date) return new Date(D);
              if (typeof D == "string" && !/Z$/i.test(D)) {
                var C = D.match(v);
                if (C) {
                  var R = C[2] - 1 || 0,
                    U = (C[7] || "0").substring(0, 3);
                  return L
                    ? new Date(
                        Date.UTC(
                          C[1],
                          R,
                          C[3] || 1,
                          C[4] || 0,
                          C[5] || 0,
                          C[6] || 0,
                          U,
                        ),
                      )
                    : new Date(
                        C[1],
                        R,
                        C[3] || 1,
                        C[4] || 0,
                        C[5] || 0,
                        C[6] || 0,
                        U,
                      );
                }
              }
              return new Date(D);
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
            var D = O(T);
            return this.startOf(x) <= D && D <= this.endOf(x);
          }),
          (I.isAfter = function (T, x) {
            return O(T) < this.startOf(x);
          }),
          (I.isBefore = function (T, x) {
            return this.endOf(x) < O(T);
          }),
          (I.$g = function (T, x, D) {
            return k.u(T) ? this[x] : this.set(D, T);
          }),
          (I.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (I.valueOf = function () {
            return this.$d.getTime();
          }),
          (I.startOf = function (T, x) {
            var D = this,
              L = !!k.u(x) || x,
              C = k.p(T),
              R = function (Q, V) {
                var le = k.w(
                  D.$u ? Date.UTC(D.$y, V, Q) : new Date(D.$y, V, Q),
                  D,
                );
                return L ? le : le.endOf(d);
              },
              U = function (Q, V) {
                return k.w(
                  D.toDate()[Q].apply(
                    D.toDate("s"),
                    (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(V),
                  ),
                  D,
                );
              },
              z = this.$W,
              q = this.$M,
              K = this.$D,
              W = "set" + (this.$u ? "UTC" : "");
            switch (C) {
              case h:
                return L ? R(1, 0) : R(31, 11);
              case l:
                return L ? R(1, q) : R(0, q + 1);
              case a:
                var Y = this.$locale().weekStart || 0,
                  J = (z < Y ? z + 7 : z) - Y;
                return R(L ? K - J : K + (6 - J), q);
              case d:
              case p:
                return U(W + "Hours", 0);
              case c:
                return U(W + "Minutes", 1);
              case u:
                return U(W + "Seconds", 2);
              case s:
                return U(W + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (I.endOf = function (T) {
            return this.startOf(T, !1);
          }),
          (I.$set = function (T, x) {
            var D,
              L = k.p(T),
              C = "set" + (this.$u ? "UTC" : ""),
              R = ((D = {}),
              (D[d] = C + "Date"),
              (D[p] = C + "Date"),
              (D[l] = C + "Month"),
              (D[h] = C + "FullYear"),
              (D[c] = C + "Hours"),
              (D[u] = C + "Minutes"),
              (D[s] = C + "Seconds"),
              (D[i] = C + "Milliseconds"),
              D)[L],
              U = L === d ? this.$D + (x - this.$W) : x;
            if (L === l || L === h) {
              var z = this.clone().set(p, 1);
              z.$d[R](U),
                z.init(),
                (this.$d = z.set(p, Math.min(this.$D, z.daysInMonth())).$d);
            } else R && this.$d[R](U);
            return this.init(), this;
          }),
          (I.set = function (T, x) {
            return this.clone().$set(T, x);
          }),
          (I.get = function (T) {
            return this[k.p(T)]();
          }),
          (I.add = function (T, x) {
            var D,
              L = this;
            T = Number(T);
            var C = k.p(x),
              R = function (q) {
                var K = O(L);
                return k.w(K.date(K.date() + Math.round(q * T)), L);
              };
            if (C === l) return this.set(l, this.$M + T);
            if (C === h) return this.set(h, this.$y + T);
            if (C === d) return R(1);
            if (C === a) return R(7);
            var U = ((D = {}), (D[u] = n), (D[c] = r), (D[s] = o), D)[C] || 1,
              z = this.$d.getTime() + T * U;
            return k.w(z, this);
          }),
          (I.subtract = function (T, x) {
            return this.add(-1 * T, x);
          }),
          (I.format = function (T) {
            var x = this,
              D = this.$locale();
            if (!this.isValid()) return D.invalidDate || m;
            var L = T || "YYYY-MM-DDTHH:mm:ssZ",
              C = k.z(this),
              R = this.$H,
              U = this.$m,
              z = this.$M,
              q = D.weekdays,
              K = D.months,
              W = D.meridiem,
              Y = function (V, le, $, he) {
                return (V && (V[le] || V(x, L))) || $[le].slice(0, he);
              },
              J = function (V) {
                return k.s(R % 12 || 12, V, "0");
              },
              Q =
                W ||
                function (V, le, $) {
                  var he = V < 12 ? "AM" : "PM";
                  return $ ? he.toLowerCase() : he;
                };
            return L.replace(E, function (V, le) {
              return (
                le ||
                (function ($) {
                  switch ($) {
                    case "YY":
                      return String(x.$y).slice(-2);
                    case "YYYY":
                      return k.s(x.$y, 4, "0");
                    case "M":
                      return z + 1;
                    case "MM":
                      return k.s(z + 1, 2, "0");
                    case "MMM":
                      return Y(D.monthsShort, z, K, 3);
                    case "MMMM":
                      return Y(K, z);
                    case "D":
                      return x.$D;
                    case "DD":
                      return k.s(x.$D, 2, "0");
                    case "d":
                      return String(x.$W);
                    case "dd":
                      return Y(D.weekdaysMin, x.$W, q, 2);
                    case "ddd":
                      return Y(D.weekdaysShort, x.$W, q, 3);
                    case "dddd":
                      return q[x.$W];
                    case "H":
                      return String(R);
                    case "HH":
                      return k.s(R, 2, "0");
                    case "h":
                      return J(1);
                    case "hh":
                      return J(2);
                    case "a":
                      return Q(R, U, !0);
                    case "A":
                      return Q(R, U, !1);
                    case "m":
                      return String(U);
                    case "mm":
                      return k.s(U, 2, "0");
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
                })(V) ||
                C.replace(":", "")
              );
            });
          }),
          (I.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (I.diff = function (T, x, D) {
            var L,
              C = this,
              R = k.p(x),
              U = O(T),
              z = (U.utcOffset() - this.utcOffset()) * n,
              q = this - U,
              K = function () {
                return k.m(C, U);
              };
            switch (R) {
              case h:
                L = K() / 12;
                break;
              case l:
                L = K();
                break;
              case f:
                L = K() / 3;
                break;
              case a:
                L = (q - z) / 6048e5;
                break;
              case d:
                L = (q - z) / 864e5;
                break;
              case c:
                L = q / r;
                break;
              case u:
                L = q / n;
                break;
              case s:
                L = q / o;
                break;
              default:
                L = q;
            }
            return D ? L : k.a(L);
          }),
          (I.daysInMonth = function () {
            return this.endOf(l).$D;
          }),
          (I.$locale = function () {
            return N[this.$L];
          }),
          (I.locale = function (T, x) {
            if (!T) return this.$L;
            var D = this.clone(),
              L = H(T, x, !0);
            return L && (D.$L = L), D;
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
          j
        );
      })(),
      G = Z.prototype;
    return (
      (O.prototype = G),
      [
        ["$ms", i],
        ["$s", s],
        ["$m", u],
        ["$H", c],
        ["$W", d],
        ["$M", l],
        ["$y", h],
        ["$D", p],
      ].forEach(function (j) {
        G[j[1]] = function (I) {
          return this.$g(I, j[0], j[1]);
        };
      }),
      (O.extend = function (j, I) {
        return j.$i || (j(I, Z, O), (j.$i = !0)), O;
      }),
      (O.locale = H),
      (O.isDayjs = _),
      (O.unix = function (j) {
        return O(1e3 * j);
      }),
      (O.en = N[y]),
      (O.Ls = N),
      (O.p = {}),
      O
    );
  });
})(Ro);
var yc = Ro.exports;
const Ec = /* @__PURE__ */ Ve(yc),
  bc = ({ conversationGroupId: e, shareId: t }) => {
    const { onResolve: o, source: n } = gt(),
      [r, i] = ge(!1),
      s = async () => {
        e && (i(!0), await Ra(t, e, n), o(), i(!1));
      };
    return e
      ? /* @__PURE__ */ w.jsx(io, {
          disabled: r,
          className: Pe.resolveButton,
          title: "Resolve conversation",
          onClick: s,
          children: /* @__PURE__ */ w.jsx(ks, {}),
        })
      : null;
  },
  _c = bc,
  Sc = ({
    user: e,
    timestamp: t,
    showResolveButton: o,
    conversationGroupId: n,
    shareId: r,
  }) =>
    /* @__PURE__ */ w.jsxs(Br, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ w.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ w.jsx(ao, { user: e }),
            /* @__PURE__ */ w.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ w.jsx("span", {
              children: Ec(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        o
          ? /* @__PURE__ */ w.jsx(_c, {
              conversationGroupId: n,
              shareId: r,
            })
          : null,
      ],
    }),
  Do = Sc,
  Cc = ({ conversation: e, shareId: t }) => {
    const { users: o } = gt(),
      n = Ne(() => {
        if (e != null && e.user_id) return o[e.user_id];
      }, [e.user_id, o]);
    return /* @__PURE__ */ w.jsxs(Mt, {
      children: [
        /* @__PURE__ */ w.jsx(Do, {
          user: n,
          timestamp: e.timestamp,
          shareId: t,
        }),
        /* @__PURE__ */ w.jsx($t, {
          children: /* @__PURE__ */ w.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
          }),
        }),
      ],
    });
  },
  Tc = Cc,
  Oc = ({ conversationGroupId: e, shareId: t }) => {
    const { currentUser: o, users: n, onReplyAdd: r, source: i } = gt(),
      s = Object.values(n),
      [u, c] = ge(""),
      [d, a] = ge(!1),
      l = async (f) => {
        if (
          (f == null || f.stopPropagation(),
          f == null || f.preventDefault(),
          !(!t || !e))
        ) {
          a(!0),
            console.log("saving reply", t, e, {
              message: u,
            });
          try {
            await Ta(
              t,
              e,
              {
                message: u,
              },
              i,
            ),
              r();
          } catch (h) {
            console.error("error while saving reply", h);
          }
          a(!1), c("");
        }
      };
    return /* @__PURE__ */ w.jsx("div", {
      className: Pe.replyForm,
      children: /* @__PURE__ */ w.jsx("form", {
        onSubmit: l,
        className: "",
        children: /* @__PURE__ */ w.jsx(Oo, {
          comment: u,
          setComment: c,
          loading: d,
          users: Object.values(s),
          currentUser: o || null,
          onEnterKeypress: l,
        }),
      }),
    });
  },
  Ac = Oc,
  Rc = ({ conversationGroup: e, shareId: t, onSelect: o }) => {
    var f;
    const { users: n } = gt(),
      r = Ne(() => {
        if (e.owner) return n[e.owner];
      }, [e.owner, n]),
      { isSelected: i } = gt(),
      [s, u] = ge(!1),
      c = Me(
        (h) => {
          !i ||
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
        [e.conversation_group_id, i],
      );
    if (
      !((f = e == null ? void 0 : e.conversations) != null && f.length) ||
      (e == null ? void 0 : e.status) !== "Pending"
    )
      return null;
    const [d, ...a] = e.conversations,
      l = a.length
        ? a.length > 1
          ? `${a.length} replies`
          : `${a.length} reply`
        : "Reply";
    return /* @__PURE__ */ w.jsx("div", {
      ref: c,
      className: Pe.conversationGroup,
      children: /* @__PURE__ */ w.jsxs(Mt, {
        className: `${i ? "active" : ""}`,
        onClick: o,
        children: [
          /* @__PURE__ */ w.jsx(Do, {
            user: r,
            timestamp: d.timestamp,
            showResolveButton: !0,
            conversationGroupId: e.conversation_group_id,
            shareId: t,
          }),
          /* @__PURE__ */ w.jsxs($t, {
            children: [
              /* @__PURE__ */ w.jsx(Ao, { meta: e.meta }),
              /* @__PURE__ */ w.jsx("p", {
                children: d.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
              }),
              /* @__PURE__ */ w.jsx(Ft, {
                onClick: () => u((h) => !h),
                color: "link",
                children: l,
              }),
              a.length
                ? /* @__PURE__ */ w.jsx(w.Fragment, {
                    children: s
                      ? /* @__PURE__ */ w.jsx(w.Fragment, {
                          children: a.map((h) =>
                            /* @__PURE__ */ w.jsx(
                              Tc,
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
              s
                ? /* @__PURE__ */ w.jsx(Ac, {
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
  Dc = Rc,
  wo = ze({
    users: {},
    conversationGroup: void 0,
    currentUser: void 0,
    isSelected: !1,
    shareId: void 0,
    onSelect: () => null,
    onResolve: () => null,
    onReplyAdd: () => null,
    source: Tn.DBT_DOCS,
  }),
  wc = ({
    currentUser: e,
    conversationGroup: t,
    shareId: o,
    onSelect: n,
    isSelected: r,
    users: i,
    onResolve: s,
    onReplyAdd: u,
    source: c,
  }) => {
    const d = Ne(
      () => ({
        currentUser: e,
        conversationGroup: t,
        shareId: o,
        onSelect: n,
        isSelected: r,
        users: i,
        onResolve: s,
        onReplyAdd: u,
        source: c,
      }),
      [e, t, o, n, r, i, s, u, c],
    );
    return !t || !o
      ? null
      : /* @__PURE__ */ w.jsx(wo.Provider, {
          value: d,
          children: /* @__PURE__ */ w.jsx(Dc, {
            conversationGroup: t,
            shareId: o,
            onSelect: n,
          }),
        });
  },
  Ic = wc,
  gt = () => qe(wo),
  xc = () => {
    const e = ue((l) => l.source),
      t = ue((l) => l.conversations),
      o = ue((l) => l.selectedConversationId),
      n = ue((l) => l.shareId),
      r = ue((l) => l.users),
      i = ue((l) => l.currentUserId),
      s = Ae();
    if (!i || !n) return null;
    const u = r[i],
      c = (l) => {
        s(hs({ shareId: n, conversationGroupId: l }));
      },
      d = (l) => {
        s(jn(l));
      },
      a = (l) => {
        console.log("onReplyAdd", l), s(to());
      };
    return !t || !Object.keys(t).length
      ? /* @__PURE__ */ w.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ w.jsx("div", {
          children: Object.values(t).map((l) =>
            /* @__PURE__ */ w.jsx(
              Ic,
              {
                conversationGroup: l,
                shareId: n,
                isSelected: o === l.conversation_group_id,
                currentUser: u,
                onResolve: () => c(l.conversation_group_id),
                onSelect: () => d(l.conversation_group_id),
                users: r,
                onReplyAdd: () => a(l.conversation_group_id),
                source: e,
              },
              l.conversation_group_id,
            ),
          ),
        });
  },
  Nc = xc,
  jc = () => {
    const e = ue((s) => s.isRightPanelOpen),
      t = ue((s) => s.selectedConversationId),
      o = ue((s) => s.newConversation),
      n = Ae(),
      r = () => {
        n(Pn(!1)), n(jn(void 0)), n(Fn());
      };
    return !!o || e || t
      ? /* @__PURE__ */ w.jsxs(w.Fragment, {
          children: [
            /* @__PURE__ */ w.jsx(ii, {
              onClick: r,
              className: Pe.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ w.jsxs("div", {
              className: Pe.conversationRightPanel,
              children: [
                /* @__PURE__ */ w.jsx("h3", { children: "Comments" }),
                o
                  ? /* @__PURE__ */ w.jsx(mc, {})
                  : /* @__PURE__ */ w.jsx(Nc, {}),
              ],
            }),
          ],
        })
      : null;
  },
  Pc = jc,
  Fc = 10,
  Mc = () => {
    const e = De(),
      t = ue((s) => s.shareId),
      o = ue((s) => s.conversationsLoadingState),
      n = Ae(),
      r = ue((s) => Object.keys(s.conversations || {})),
      i = Me(
        (s) => {
          clearTimeout(e.current),
            Oa(s)
              .then((u) => {
                console.log("useConversations", u),
                  n(ps(u == null ? void 0 : u.dbt_docs_share_conversations)),
                  (e.current = setTimeout(() => {
                    i(s);
                  }, Fc * 1e3));
              })
              .catch((u) =>
                console.error("error while fetching conversations list", u),
              )
              .finally(() => {
                n(gr(Ce.INITIALIZED));
              });
        },
        [n],
      );
    return (
      Oe(() => {
        o !== Ce.UNINITIALIZED || !t || (n(gr(Ce.LOADING)), i(t));
      }, [n, o, r, t, i]),
      { isLoading: o === Ce.LOADING }
    );
  },
  $c = () => {
    const e = Ae(),
      t = ue((r) => Object.keys(r.users || {})),
      [o, n] = ge(Ce.UNINITIALIZED);
    return (
      Oe(() => {
        o !== Ce.UNINITIALIZED ||
          Object.keys(t).length ||
          (n(Ce.LOADING),
          Aa()
            .then((r) => {
              console.log("useConversationUsers", r), e(fs(r));
            })
            .catch((r) => console.error("error while fetching users list", r))
            .finally(() => {
              n(Ce.INITIALIZED);
            }));
      }, [e, o, t]),
      { isLoading: o === Ce.LOADING }
    );
  },
  kc = () => (
    $c(),
    Mc(),
    /* @__PURE__ */ w.jsxs("div", {
      children: [/* @__PURE__ */ w.jsx(Pc, {}), /* @__PURE__ */ w.jsx(ja, {})],
    })
  ),
  Lc = kc,
  Bc = ({ target: e, ...t }) =>
    Cn(
      /* @__PURE__ */ w.jsx(io, {
        className: Pe.hotspotButton,
        title: "Click to start conversation",
        ...t,
        children: /* @__PURE__ */ w.jsx(oo, {}),
      }),
      e,
    ),
  Io = Bc,
  Hc = () => {
    var c;
    const e = Ae(),
      t = ue((d) => d.codeblockLoaded),
      o = ue((d) => d.manifest),
      [n, r] = ge(0),
      i = (c = An()) == null ? void 0 : c.parentElement,
      s = () => {
        var f;
        if (!i || !o.nodes) return;
        const d = Rn();
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
        e(Mn({ meta: l }));
      },
      u = Me(
        (d) => {
          if (!i) return;
          const a = d.y,
            l = i.querySelectorAll(".line-numbers-rows > span"),
            f = Array.from(l).findIndex((h) => {
              const { height: p, y: m } = h.getBoundingClientRect();
              return a >= m && a <= m + p;
            });
          r(f);
        },
        [i],
      );
    return (
      Oe(() => {
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
        : /* @__PURE__ */ w.jsx(Io, {
            target: i,
            onClick: s,
            style: { top: n * 21.2 },
          })
    );
  },
  Uc = Hc,
  zc = () => {
    const e = Ae(),
      t = ue((r) => r.codeblockLoaded),
      o = Dn(),
      n = () => {
        const r = {
          field: "description",
          highlight: o == null ? void 0 : o.innerText,
        };
        e(Mn({ meta: r }));
      };
    return !t || !o
      ? null
      : /* @__PURE__ */ w.jsx(Io, { target: o, onClick: n });
  },
  qc = zc,
  Vc = () =>
    /* @__PURE__ */ w.jsxs(w.Fragment, {
      children: [/* @__PURE__ */ w.jsx(qc, {}), /* @__PURE__ */ w.jsx(Uc, {})],
    }),
  Wc = Vc,
  Yc = ni(() => import("./DbtDocsRenderer.js")),
  Kc = () => {
    const { loading: e, shareDetails: t } = Da(),
      o = Ae(),
      { getHighlightedSelectionData: n, pos: r, onSelectionEnd: i } = wa(),
      s = (u) => {
        u.stopPropagation();
        const c = n();
        c && o(Mn(c));
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
                /* @__PURE__ */ w.jsx(Wc, {}),
                /* @__PURE__ */ w.jsx(_a, {}),
              ],
            }),
            /* @__PURE__ */ w.jsx(Lc, {}),
            /* @__PURE__ */ w.jsx(Yc, {
              shareDetails: t,
              onSelectionEnd: i,
            }),
            r ? /* @__PURE__ */ w.jsx(Ea, { pos: r, onAddComment: s }) : null,
          ],
        });
  },
  Gc = Kc,
  Xc = ({ shareId: e, userId: t, conversationGroupId: o, source: n }) =>
    /* @__PURE__ */ w.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ w.jsx(ms, {
        shareId: e,
        userId: t,
        conversationGroupId: o,
        source: n,
        children: /* @__PURE__ */ w.jsx(Gc, {}),
      }),
    }),
  fl = Xc;
export {
  rt as A,
  Tn as C,
  fl as D,
  ue as a,
  sl as b,
  al as c,
  tl as d,
  An as e,
  Pe as f,
  li as g,
  Oo as h,
  Ic as i,
  w as j,
  ma as k,
  il as s,
  Ae as u,
};
