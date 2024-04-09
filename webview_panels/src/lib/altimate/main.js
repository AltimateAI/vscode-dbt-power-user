import "./main.css";
import * as Ee from "react";
import oe, {
  createContext as Qe,
  useReducer as zo,
  useCallback as Ke,
  useMemo as lt,
  useContext as et,
  useLayoutEffect as Vo,
  useEffect as Re,
  useRef as Te,
  useState as ge,
  useId as xr,
  useInsertionEffect as qo,
  cloneElement as Wo,
  Children as Ge,
  isValidElement as Nr,
  Component as Yo,
  createElement as Kn,
  lazy as Ko,
} from "react";
import {
  Tooltip as Go,
  Button as Pt,
  Spinner as Xo,
  Card as Ft,
  CardTitle as jr,
  CardBody as Mt,
  CloseButton as Zo,
} from "reactstrap";
import Jo, { createPortal as Pr } from "react-dom";
import { Light as bn } from "react-syntax-highlighter";
var Qo =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function tt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var un = { exports: {} },
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
var Gn;
function ei() {
  if (Gn) return it;
  Gn = 1;
  var e = oe,
    t = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    n = Object.prototype.hasOwnProperty,
    r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(a, c, f) {
    var u,
      l = {},
      d = null,
      h = null;
    f !== void 0 && (d = "" + f),
      c.key !== void 0 && (d = "" + c.key),
      c.ref !== void 0 && (h = c.ref);
    for (u in c) n.call(c, u) && !i.hasOwnProperty(u) && (l[u] = c[u]);
    if (a && a.defaultProps)
      for (u in ((c = a.defaultProps), c)) l[u] === void 0 && (l[u] = c[u]);
    return {
      $$typeof: t,
      type: a,
      key: d,
      ref: h,
      props: l,
      _owner: r.current,
    };
  }
  return (it.Fragment = o), (it.jsx = s), (it.jsxs = s), it;
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
var Xn;
function ti() {
  return (
    Xn ||
      ((Xn = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = oe,
            t = Symbol.for("react.element"),
            o = Symbol.for("react.portal"),
            n = Symbol.for("react.fragment"),
            r = Symbol.for("react.strict_mode"),
            i = Symbol.for("react.profiler"),
            s = Symbol.for("react.provider"),
            a = Symbol.for("react.context"),
            c = Symbol.for("react.forward_ref"),
            f = Symbol.for("react.suspense"),
            u = Symbol.for("react.suspense_list"),
            l = Symbol.for("react.memo"),
            d = Symbol.for("react.lazy"),
            h = Symbol.for("react.offscreen"),
            p = Symbol.iterator,
            m = "@@iterator";
          function v(g) {
            if (g === null || typeof g != "object") return null;
            var j = (p && g[p]) || g[m];
            return typeof j == "function" ? j : null;
          }
          var _ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function b(g) {
            {
              for (
                var j = arguments.length,
                  H = new Array(j > 1 ? j - 1 : 0),
                  Z = 1;
                Z < j;
                Z++
              )
                H[Z - 1] = arguments[Z];
              S("error", g, H);
            }
          }
          function S(g, j, H) {
            {
              var Z = _.ReactDebugCurrentFrame,
                ie = Z.getStackAddendum();
              ie !== "" && ((j += "%s"), (H = H.concat([ie])));
              var ue = H.map(function (re) {
                return String(re);
              });
              ue.unshift("Warning: " + j),
                Function.prototype.apply.call(console[g], console, ue);
            }
          }
          var R = !1,
            E = !1,
            x = !1,
            F = !1,
            y = !1,
            B;
          B = Symbol.for("react.module.reference");
          function O(g) {
            return !!(
              typeof g == "string" ||
              typeof g == "function" ||
              g === n ||
              g === i ||
              y ||
              g === r ||
              g === f ||
              g === u ||
              F ||
              g === h ||
              R ||
              E ||
              x ||
              (typeof g == "object" &&
                g !== null &&
                (g.$$typeof === d ||
                  g.$$typeof === l ||
                  g.$$typeof === s ||
                  g.$$typeof === a ||
                  g.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  g.$$typeof === B ||
                  g.getModuleId !== void 0))
            );
          }
          function M(g, j, H) {
            var Z = g.displayName;
            if (Z) return Z;
            var ie = j.displayName || j.name || "";
            return ie !== "" ? H + "(" + ie + ")" : H;
          }
          function K(g) {
            return g.displayName || "Context";
          }
          function X(g) {
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
              case f:
                return "Suspense";
              case u:
                return "SuspenseList";
            }
            if (typeof g == "object")
              switch (g.$$typeof) {
                case a:
                  var j = g;
                  return K(j) + ".Consumer";
                case s:
                  var H = g;
                  return K(H._context) + ".Provider";
                case c:
                  return M(g, g.render, "ForwardRef");
                case l:
                  var Z = g.displayName || null;
                  return Z !== null ? Z : X(g.type) || "Memo";
                case d: {
                  var ie = g,
                    ue = ie._payload,
                    re = ie._init;
                  try {
                    return X(re(ue));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var N = Object.assign,
            I = 0,
            T,
            w,
            D,
            L,
            C,
            A,
            U;
          function z() {}
          z.__reactDisabledLog = !0;
          function V() {
            {
              if (I === 0) {
                (T = console.log),
                  (w = console.info),
                  (D = console.warn),
                  (L = console.error),
                  (C = console.group),
                  (A = console.groupCollapsed),
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
          function G() {
            {
              if ((I--, I === 0)) {
                var g = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: N({}, g, {
                    value: T,
                  }),
                  info: N({}, g, {
                    value: w,
                  }),
                  warn: N({}, g, {
                    value: D,
                  }),
                  error: N({}, g, {
                    value: L,
                  }),
                  group: N({}, g, {
                    value: C,
                  }),
                  groupCollapsed: N({}, g, {
                    value: A,
                  }),
                  groupEnd: N({}, g, {
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
          var W = _.ReactCurrentDispatcher,
            Y;
          function J(g, j, H) {
            {
              if (Y === void 0)
                try {
                  throw Error();
                } catch (ie) {
                  var Z = ie.stack.trim().match(/\n( *(at )?)/);
                  Y = (Z && Z[1]) || "";
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
            q;
          {
            var ce = typeof WeakMap == "function" ? WeakMap : Map;
            q = new ce();
          }
          function k(g, j) {
            if (!g || Q) return "";
            {
              var H = q.get(g);
              if (H !== void 0) return H;
            }
            var Z;
            Q = !0;
            var ie = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var ue;
            (ue = W.current), (W.current = null), V();
            try {
              if (j) {
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
                  } catch (we) {
                    Z = we;
                  }
                  Reflect.construct(g, [], re);
                } else {
                  try {
                    re.call();
                  } catch (we) {
                    Z = we;
                  }
                  g.call(re.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (we) {
                  Z = we;
                }
                g();
              }
            } catch (we) {
              if (we && Z && typeof we.stack == "string") {
                for (
                  var ne = we.stack.split(`
`),
                    ve = Z.stack.split(`
`),
                    fe = ne.length - 1,
                    pe = ve.length - 1;
                  fe >= 1 && pe >= 0 && ne[fe] !== ve[pe];

                )
                  pe--;
                for (; fe >= 1 && pe >= 0; fe--, pe--)
                  if (ne[fe] !== ve[pe]) {
                    if (fe !== 1 || pe !== 1)
                      do
                        if ((fe--, pe--, pe < 0 || ne[fe] !== ve[pe])) {
                          var Se =
                            `
` + ne[fe].replace(" at new ", " at ");
                          return (
                            g.displayName &&
                              Se.includes("<anonymous>") &&
                              (Se = Se.replace("<anonymous>", g.displayName)),
                            typeof g == "function" && q.set(g, Se),
                            Se
                          );
                        }
                      while (fe >= 1 && pe >= 0);
                    break;
                  }
              }
            } finally {
              (Q = !1), (W.current = ue), G(), (Error.prepareStackTrace = ie);
            }
            var ze = g ? g.displayName || g.name : "",
              Yn = ze ? J(ze) : "";
            return typeof g == "function" && q.set(g, Yn), Yn;
          }
          function he(g, j, H) {
            return k(g, !1);
          }
          function He(g) {
            var j = g.prototype;
            return !!(j && j.isReactComponent);
          }
          function Me(g, j, H) {
            if (g == null) return "";
            if (typeof g == "function") return k(g, He(g));
            if (typeof g == "string") return J(g);
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
                  var Z = g,
                    ie = Z._payload,
                    ue = Z._init;
                  try {
                    return Me(ue(ie), j, H);
                  } catch {}
                }
              }
            return "";
          }
          var vt = Object.prototype.hasOwnProperty,
            Fn = {},
            Mn = _.ReactDebugCurrentFrame;
          function mt(g) {
            if (g) {
              var j = g._owner,
                H = Me(g.type, g._source, j ? j.type : null);
              Mn.setExtraStackFrame(H);
            } else Mn.setExtraStackFrame(null);
          }
          function Co(g, j, H, Z, ie) {
            {
              var ue = Function.call.bind(vt);
              for (var re in g)
                if (ue(g, re)) {
                  var ne = void 0;
                  try {
                    if (typeof g[re] != "function") {
                      var ve = Error(
                        (Z || "React class") +
                          ": " +
                          H +
                          " type `" +
                          re +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof g[re] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      );
                      throw ((ve.name = "Invariant Violation"), ve);
                    }
                    ne = g[re](
                      j,
                      re,
                      Z,
                      H,
                      null,
                      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                    );
                  } catch (fe) {
                    ne = fe;
                  }
                  ne &&
                    !(ne instanceof Error) &&
                    (mt(ie),
                    b(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      Z || "React class",
                      H,
                      re,
                      typeof ne,
                    ),
                    mt(null)),
                    ne instanceof Error &&
                      !(ne.message in Fn) &&
                      ((Fn[ne.message] = !0),
                      mt(ie),
                      b("Failed %s type: %s", H, ne.message),
                      mt(null));
                }
            }
          }
          var To = Array.isArray;
          function Vt(g) {
            return To(g);
          }
          function Oo(g) {
            {
              var j = typeof Symbol == "function" && Symbol.toStringTag,
                H =
                  (j && g[Symbol.toStringTag]) ||
                  g.constructor.name ||
                  "Object";
              return H;
            }
          }
          function Ro(g) {
            try {
              return $n(g), !1;
            } catch {
              return !0;
            }
          }
          function $n(g) {
            return "" + g;
          }
          function kn(g) {
            if (Ro(g))
              return (
                b(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  Oo(g),
                ),
                $n(g)
              );
          }
          var ot = _.ReactCurrentOwner,
            Ao = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Ln,
            Bn,
            qt;
          qt = {};
          function Do(g) {
            if (vt.call(g, "ref")) {
              var j = Object.getOwnPropertyDescriptor(g, "ref").get;
              if (j && j.isReactWarning) return !1;
            }
            return g.ref !== void 0;
          }
          function Io(g) {
            if (vt.call(g, "key")) {
              var j = Object.getOwnPropertyDescriptor(g, "key").get;
              if (j && j.isReactWarning) return !1;
            }
            return g.key !== void 0;
          }
          function wo(g, j) {
            if (
              typeof g.ref == "string" &&
              ot.current &&
              j &&
              ot.current.stateNode !== j
            ) {
              var H = X(ot.current.type);
              qt[H] ||
                (b(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  X(ot.current.type),
                  g.ref,
                ),
                (qt[H] = !0));
            }
          }
          function xo(g, j) {
            {
              var H = function () {
                Ln ||
                  ((Ln = !0),
                  b(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    j,
                  ));
              };
              (H.isReactWarning = !0),
                Object.defineProperty(g, "key", {
                  get: H,
                  configurable: !0,
                });
            }
          }
          function No(g, j) {
            {
              var H = function () {
                Bn ||
                  ((Bn = !0),
                  b(
                    "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    j,
                  ));
              };
              (H.isReactWarning = !0),
                Object.defineProperty(g, "ref", {
                  get: H,
                  configurable: !0,
                });
            }
          }
          var jo = function (g, j, H, Z, ie, ue, re) {
            var ne = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: g,
              key: j,
              ref: H,
              props: re,
              // Record the component responsible for creating this element.
              _owner: ue,
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
                value: Z,
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
          function Po(g, j, H, Z, ie) {
            {
              var ue,
                re = {},
                ne = null,
                ve = null;
              H !== void 0 && (kn(H), (ne = "" + H)),
                Io(j) && (kn(j.key), (ne = "" + j.key)),
                Do(j) && ((ve = j.ref), wo(j, ie));
              for (ue in j)
                vt.call(j, ue) && !Ao.hasOwnProperty(ue) && (re[ue] = j[ue]);
              if (g && g.defaultProps) {
                var fe = g.defaultProps;
                for (ue in fe) re[ue] === void 0 && (re[ue] = fe[ue]);
              }
              if (ne || ve) {
                var pe =
                  typeof g == "function"
                    ? g.displayName || g.name || "Unknown"
                    : g;
                ne && xo(re, pe), ve && No(re, pe);
              }
              return jo(g, ne, ve, ie, Z, ot.current, re);
            }
          }
          var Wt = _.ReactCurrentOwner,
            Hn = _.ReactDebugCurrentFrame;
          function Ue(g) {
            if (g) {
              var j = g._owner,
                H = Me(g.type, g._source, j ? j.type : null);
              Hn.setExtraStackFrame(H);
            } else Hn.setExtraStackFrame(null);
          }
          var Yt;
          Yt = !1;
          function Kt(g) {
            return typeof g == "object" && g !== null && g.$$typeof === t;
          }
          function Un() {
            {
              if (Wt.current) {
                var g = X(Wt.current.type);
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
          function Fo(g) {
            {
              if (g !== void 0) {
                var j = g.fileName.replace(/^.*[\\\/]/, ""),
                  H = g.lineNumber;
                return (
                  `

Check your code at ` +
                  j +
                  ":" +
                  H +
                  "."
                );
              }
              return "";
            }
          }
          var zn = {};
          function Mo(g) {
            {
              var j = Un();
              if (!j) {
                var H = typeof g == "string" ? g : g.displayName || g.name;
                H &&
                  (j =
                    `

Check the top-level render call using <` +
                    H +
                    ">.");
              }
              return j;
            }
          }
          function Vn(g, j) {
            {
              if (!g._store || g._store.validated || g.key != null) return;
              g._store.validated = !0;
              var H = Mo(j);
              if (zn[H]) return;
              zn[H] = !0;
              var Z = "";
              g &&
                g._owner &&
                g._owner !== Wt.current &&
                (Z = " It was passed a child from " + X(g._owner.type) + "."),
                Ue(g),
                b(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  H,
                  Z,
                ),
                Ue(null);
            }
          }
          function qn(g, j) {
            {
              if (typeof g != "object") return;
              if (Vt(g))
                for (var H = 0; H < g.length; H++) {
                  var Z = g[H];
                  Kt(Z) && Vn(Z, j);
                }
              else if (Kt(g)) g._store && (g._store.validated = !0);
              else if (g) {
                var ie = v(g);
                if (typeof ie == "function" && ie !== g.entries)
                  for (var ue = ie.call(g), re; !(re = ue.next()).done; )
                    Kt(re.value) && Vn(re.value, j);
              }
            }
          }
          function $o(g) {
            {
              var j = g.type;
              if (j == null || typeof j == "string") return;
              var H;
              if (typeof j == "function") H = j.propTypes;
              else if (
                typeof j == "object" &&
                (j.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  j.$$typeof === l)
              )
                H = j.propTypes;
              else return;
              if (H) {
                var Z = X(j);
                Co(H, g.props, "prop", Z, g);
              } else if (j.PropTypes !== void 0 && !Yt) {
                Yt = !0;
                var ie = X(j);
                b(
                  "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                  ie || "Unknown",
                );
              }
              typeof j.getDefaultProps == "function" &&
                !j.getDefaultProps.isReactClassApproved &&
                b(
                  "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                );
            }
          }
          function ko(g) {
            {
              for (var j = Object.keys(g.props), H = 0; H < j.length; H++) {
                var Z = j[H];
                if (Z !== "children" && Z !== "key") {
                  Ue(g),
                    b(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      Z,
                    ),
                    Ue(null);
                  break;
                }
              }
              g.ref !== null &&
                (Ue(g),
                b("Invalid attribute `ref` supplied to `React.Fragment`."),
                Ue(null));
            }
          }
          function Wn(g, j, H, Z, ie, ue) {
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
                var ve = Fo(ie);
                ve ? (ne += ve) : (ne += Un());
                var fe;
                g === null
                  ? (fe = "null")
                  : Vt(g)
                  ? (fe = "array")
                  : g !== void 0 && g.$$typeof === t
                  ? ((fe = "<" + (X(g.type) || "Unknown") + " />"),
                    (ne =
                      " Did you accidentally export a JSX literal instead of a component?"))
                  : (fe = typeof g),
                  b(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    fe,
                    ne,
                  );
              }
              var pe = Po(g, j, H, ie, ue);
              if (pe == null) return pe;
              if (re) {
                var Se = j.children;
                if (Se !== void 0)
                  if (Z)
                    if (Vt(Se)) {
                      for (var ze = 0; ze < Se.length; ze++) qn(Se[ze], g);
                      Object.freeze && Object.freeze(Se);
                    } else
                      b(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else qn(Se, g);
              }
              return g === n ? ko(pe) : $o(pe), pe;
            }
          }
          function Lo(g, j, H) {
            return Wn(g, j, H, !0);
          }
          function Bo(g, j, H) {
            return Wn(g, j, H, !1);
          }
          var Ho = Bo,
            Uo = Lo;
          (st.Fragment = n), (st.jsx = Ho), (st.jsxs = Uo);
        })()),
    st
  );
}
process.env.NODE_ENV === "production"
  ? (un.exports = ei())
  : (un.exports = ti());
var P = un.exports;
const ni = () => {
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
var Ce = /* @__PURE__ */ ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.UNINITIALIZED = 1)] = "UNINITIALIZED"),
  (e[(e.INITIALIZED = 2)] = "INITIALIZED"),
  e
))(Ce || {});
function ri(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function oi(e) {
  return ri(e) && "type" in e && typeof e.type == "string";
}
var Fr = Symbol.for("immer-nothing"),
  Zn = Symbol.for("immer-draftable"),
  be = Symbol.for("immer-state"),
  ii =
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
    const o = ii[e],
      n = typeof o == "function" ? o.apply(null, t) : o;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Xe = Object.getPrototypeOf;
function Pe(e) {
  return !!e && !!e[be];
}
function Ne(e) {
  var t;
  return e
    ? Mr(e) ||
        Array.isArray(e) ||
        !!e[Zn] ||
        !!((t = e.constructor) != null && t[Zn]) ||
        kt(e) ||
        Lt(e)
    : !1;
}
var si = Object.prototype.constructor.toString();
function Mr(e) {
  if (!e || typeof e != "object") return !1;
  const t = Xe(e);
  if (t === null) return !0;
  const o = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return o === Object
    ? !0
    : typeof o == "function" && Function.toString.call(o) === si;
}
function At(e, t) {
  $t(e) === 0
    ? Reflect.ownKeys(e).forEach((o) => {
        t(o, e[o], e);
      })
    : e.forEach((o, n) => t(n, o, e));
}
function $t(e) {
  const t = e[be];
  return t ? t.type_ : Array.isArray(e) ? 1 : kt(e) ? 2 : Lt(e) ? 3 : 0;
}
function cn(e, t) {
  return $t(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function $r(e, t, o) {
  const n = $t(e);
  n === 2 ? e.set(t, o) : n === 3 ? e.add(o) : (e[t] = o);
}
function ai(e, t) {
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
  if (kt(e)) return new Map(e);
  if (Lt(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && Mr(e))
    return Xe(e)
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
  return Object.create(Xe(e), o);
}
function _n(e, t = !1) {
  return (
    Bt(e) ||
      Pe(e) ||
      !Ne(e) ||
      ($t(e) > 1 && (e.set = e.add = e.clear = e.delete = ui),
      Object.freeze(e),
      t && Object.entries(e).forEach(([o, n]) => _n(n, !0))),
    e
  );
}
function ui() {
  ye(2);
}
function Bt(e) {
  return Object.isFrozen(e);
}
var ci = {};
function Be(e) {
  const t = ci[e];
  return t || ye(0, e), t;
}
var ft;
function kr() {
  return ft;
}
function li(e, t) {
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
function Jn(e, t) {
  t &&
    (Be("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function fn(e) {
  dn(e), e.drafts_.forEach(fi), (e.drafts_ = null);
}
function dn(e) {
  e === ft && (ft = e.parent_);
}
function Qn(e) {
  return (ft = li(ft, e));
}
function fi(e) {
  const t = e[be];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function er(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const o = t.drafts_[0];
  return (
    e !== void 0 && e !== o
      ? (o[be].modified_ && (fn(t), ye(4)),
        Ne(e) && ((e = Dt(t, e)), t.parent_ || It(t, e)),
        t.patches_ &&
          Be("Patches").generateReplacementPatches_(
            o[be].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = Dt(t, o, [])),
    fn(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Fr ? e : void 0
  );
}
function Dt(e, t, o) {
  if (Bt(t)) return t;
  const n = t[be];
  if (!n) return At(t, (r, i) => tr(e, n, t, r, i, o)), t;
  if (n.scope_ !== e) return t;
  if (!n.modified_) return It(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    (n.finalized_ = !0), n.scope_.unfinalizedDrafts_--;
    const r = n.copy_;
    let i = r,
      s = !1;
    n.type_ === 3 && ((i = new Set(r)), r.clear(), (s = !0)),
      At(i, (a, c) => tr(e, n, r, a, c, o, s)),
      It(e, r, !1),
      o &&
        e.patches_ &&
        Be("Patches").generatePatches_(n, o, e.patches_, e.inversePatches_);
  }
  return n.copy_;
}
function tr(e, t, o, n, r, i, s) {
  if ((process.env.NODE_ENV !== "production" && r === o && ye(5), Pe(r))) {
    const a =
        i &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !cn(t.assigned_, n)
          ? i.concat(n)
          : void 0,
      c = Dt(e, r, a);
    if (($r(o, n, c), Pe(c))) e.canAutoFreeze_ = !1;
    else return;
  } else s && o.add(r);
  if (Ne(r) && !Bt(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    Dt(e, r),
      (!t || !t.scope_.parent_) &&
        typeof n != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(o, n) &&
        It(e, r);
  }
}
function It(e, t, o = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && _n(t, o);
}
function di(e, t) {
  const o = Array.isArray(e),
    n = {
      type_: o ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : kr(),
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
    i = Sn;
  o && ((r = [n]), (i = dt));
  const { revoke: s, proxy: a } = Proxy.revocable(r, i);
  return (n.draft_ = a), (n.revoke_ = s), a;
}
var Sn = {
    get(e, t) {
      if (t === be) return e;
      const o = $e(e);
      if (!cn(o, t)) return pi(e, o, t);
      const n = o[t];
      return e.finalized_ || !Ne(n)
        ? n
        : n === Gt(e.base_, t)
        ? (Xt(e), (e.copy_[t] = hn(n, e)))
        : n;
    },
    has(e, t) {
      return t in $e(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys($e(e));
    },
    set(e, t, o) {
      const n = Lr($e(e), t);
      if (n != null && n.set) return n.set.call(e.draft_, o), !0;
      if (!e.modified_) {
        const r = Gt($e(e), t),
          i = r == null ? void 0 : r[be];
        if (i && i.base_ === o)
          return (e.copy_[t] = o), (e.assigned_[t] = !1), !0;
        if (ai(o, r) && (o !== void 0 || cn(e.base_, t))) return !0;
        Xt(e), pn(e);
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
        Gt(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), Xt(e), pn(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(e, t) {
      const o = $e(e),
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
      return Xe(e.base_);
    },
    setPrototypeOf() {
      ye(12);
    },
  },
  dt = {};
At(Sn, (e, t) => {
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
    Sn.set.call(this, e[0], t, o, e[0])
  );
};
function Gt(e, t) {
  const o = e[be];
  return (o ? $e(o) : e)[t];
}
function pi(e, t, o) {
  var r;
  const n = Lr(t, o);
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
function Lr(e, t) {
  if (!(t in e)) return;
  let o = Xe(e);
  for (; o; ) {
    const n = Object.getOwnPropertyDescriptor(o, t);
    if (n) return n;
    o = Xe(o);
  }
}
function pn(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && pn(e.parent_));
}
function Xt(e) {
  e.copy_ || (e.copy_ = ln(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var hi = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, o, n) => {
        if (typeof t == "function" && typeof o != "function") {
          const i = o;
          o = t;
          const s = this;
          return function (c = i, ...f) {
            return s.produce(c, (u) => o.call(this, u, ...f));
          };
        }
        typeof o != "function" && ye(6),
          n !== void 0 && typeof n != "function" && ye(7);
        let r;
        if (Ne(t)) {
          const i = Qn(this),
            s = hn(t, void 0);
          let a = !0;
          try {
            (r = o(s)), (a = !1);
          } finally {
            a ? fn(i) : dn(i);
          }
          return Jn(i, n), er(r, i);
        } else if (!t || typeof t != "object") {
          if (
            ((r = o(t)),
            r === void 0 && (r = t),
            r === Fr && (r = void 0),
            this.autoFreeze_ && _n(r, !0),
            n)
          ) {
            const i = [],
              s = [];
            Be("Patches").generateReplacementPatches_(t, r, i, s), n(i, s);
          }
          return r;
        } else ye(1, t);
      }),
      (this.produceWithPatches = (t, o) => {
        if (typeof t == "function")
          return (s, ...a) => this.produceWithPatches(s, (c) => t(c, ...a));
        let n, r;
        return [
          this.produce(t, o, (s, a) => {
            (n = s), (r = a);
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
    Ne(e) || ye(8), Pe(e) && (e = Br(e));
    const t = Qn(this),
      o = hn(e, void 0);
    return (o[be].isManual_ = !0), dn(t), o;
  }
  finishDraft(e, t) {
    const o = e && e[be];
    (!o || !o.isManual_) && ye(9);
    const { scope_: n } = o;
    return Jn(n, t), er(void 0, n);
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
    return Pe(e) ? n(e, t) : this.produce(e, (r) => n(r, t));
  }
};
function hn(e, t) {
  const o = kt(e)
    ? Be("MapSet").proxyMap_(e, t)
    : Lt(e)
    ? Be("MapSet").proxySet_(e, t)
    : di(e, t);
  return (t ? t.scope_ : kr()).drafts_.push(o), o;
}
function Br(e) {
  return Pe(e) || ye(10, e), Hr(e);
}
function Hr(e) {
  if (!Ne(e) || Bt(e)) return e;
  const t = e[be];
  let o;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (o = ln(e, t.scope_.immer_.useStrictShallowCopy_));
  } else o = ln(e, !0);
  return (
    At(o, (n, r) => {
      $r(o, n, Hr(r));
    }),
    t && (t.finalized_ = !1),
    o
  );
}
var _e = new hi(),
  Ur = _e.produce;
_e.produceWithPatches.bind(_e);
_e.setAutoFreeze.bind(_e);
_e.setUseStrictShallowCopy.bind(_e);
_e.applyPatches.bind(_e);
_e.createDraft.bind(_e);
_e.finishDraft.bind(_e);
var gi = (e, t, o) => {
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
  vi = (e, t, o) => {
    const { memoize: n, memoizeOptions: r } = t,
      { inputSelectorResults: i, inputSelectorResultsCopy: s } = e,
      a = n(() => ({}), ...r);
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
          stack: f,
        },
      );
    }
  },
  mi = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function yi(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function Ei(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function bi(
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
var nr = (e) => (Array.isArray(e) ? e : [e]);
function _i(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    bi(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function rr(e, t) {
  const o = [],
    { length: n } = e;
  for (let r = 0; r < n; r++) o.push(e[r].apply(null, t));
  return o;
}
var Si = (e, t) => {
    const { identityFunctionCheck: o, inputStabilityCheck: n } = {
      ...mi,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: o === "always" || (o === "once" && e),
        run: gi,
      },
      inputStabilityCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: vi,
      },
    };
  },
  Ci = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Ti = typeof WeakRef < "u" ? WeakRef : Ci,
  Oi = 0,
  or = 1;
function yt() {
  return {
    s: Oi,
    v: void 0,
    o: null,
    p: null,
  };
}
function Cn(e, t = {}) {
  let o = yt();
  const { resultEqualityCheck: n } = t;
  let r,
    i = 0;
  function s() {
    var l;
    let a = o;
    const { length: c } = arguments;
    for (let d = 0, h = c; d < h; d++) {
      const p = arguments[d];
      if (typeof p == "function" || (typeof p == "object" && p !== null)) {
        let m = a.o;
        m === null && (a.o = m = /* @__PURE__ */ new WeakMap());
        const v = m.get(p);
        v === void 0 ? ((a = yt()), m.set(p, a)) : (a = v);
      } else {
        let m = a.p;
        m === null && (a.p = m = /* @__PURE__ */ new Map());
        const v = m.get(p);
        v === void 0 ? ((a = yt()), m.set(p, a)) : (a = v);
      }
    }
    const f = a;
    let u;
    if (
      (a.s === or ? (u = a.v) : ((u = e.apply(null, arguments)), i++),
      (f.s = or),
      n)
    ) {
      const d =
        ((l = r == null ? void 0 : r.deref) == null ? void 0 : l.call(r)) ?? r;
      d != null && n(d, u) && ((u = d), i !== 0 && i--),
        (r =
          (typeof u == "object" && u !== null) || typeof u == "function"
            ? new Ti(u)
            : u);
    }
    return (f.v = u), u;
  }
  return (
    (s.clearCache = () => {
      (o = yt()), s.resetResultsCount();
    }),
    (s.resultsCount = () => i),
    (s.resetResultsCount = () => {
      i = 0;
    }),
    s
  );
}
function zr(e, ...t) {
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
        a,
        c = {},
        f = r.pop();
      typeof f == "object" && ((c = f), (f = r.pop())),
        yi(
          f,
          `createSelector expects an output function after the inputs, but received: [${typeof f}]`,
        );
      const u = {
          ...o,
          ...c,
        },
        {
          memoize: l,
          memoizeOptions: d = [],
          argsMemoize: h = Cn,
          argsMemoizeOptions: p = [],
          devModeChecks: m = {},
        } = u,
        v = nr(d),
        _ = nr(p),
        b = _i(r),
        S = l(
          function () {
            return i++, f.apply(null, arguments);
          },
          ...v,
        );
      let R = !0;
      const E = h(
        function () {
          s++;
          const F = rr(b, arguments);
          if (((a = S.apply(null, F)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: y, inputStabilityCheck: B } = Si(
              R,
              m,
            );
            if ((y.shouldRun && y.run(f, F, a), B.shouldRun)) {
              const O = rr(b, arguments);
              B.run(
                { inputSelectorResults: F, inputSelectorResultsCopy: O },
                { memoize: l, memoizeOptions: v },
                arguments,
              );
            }
            R && (R = !1);
          }
          return a;
        },
        ..._,
      );
      return Object.assign(E, {
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
var Ri = /* @__PURE__ */ zr(Cn),
  Ai = Object.assign(
    (e, t = Ri) => {
      Ei(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const o = Object.keys(e),
        n = o.map((i) => e[i]);
      return t(n, (...i) => i.reduce((s, a, c) => ((s[o[c]] = a), s), {}));
    },
    { withTypes: () => Ai },
  ),
  Di = (...e) => {
    const t = zr(...e),
      o = Object.assign(
        (...n) => {
          const r = t(...n),
            i = (s, ...a) => r(Pe(s) ? Br(s) : s, ...a);
          return Object.assign(i, r), i;
        },
        {
          withTypes: () => o,
        },
      );
    return o;
  };
Di(Cn);
function Ze(e, t) {
  function o(...n) {
    if (t) {
      let r = t(...n);
      if (!r)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? de(0)
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
    (o.match = (n) => oi(n) && n.type === e),
    o
  );
}
function ir(e) {
  return Ne(e) ? Ur(e, () => {}) : e;
}
function sr(e, t, o) {
  if (e.has(t)) {
    let r = e.get(t);
    return o.update && ((r = o.update(r, t, e)), e.set(t, r)), r;
  }
  if (!o.insert)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? de(10)
        : "No insert provided for key not already in map",
    );
  const n = o.insert(t, e);
  return e.set(t, n), n;
}
process.env.NODE_ENV;
function Vr(e) {
  const t = {},
    o = [];
  let n;
  const r = {
    addCase(i, s) {
      if (process.env.NODE_ENV !== "production") {
        if (o.length > 0)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? de(26)
              : "`builder.addCase` should only be called before calling `builder.addMatcher`",
          );
        if (n)
          throw new Error(
            process.env.NODE_ENV === "production"
              ? de(27)
              : "`builder.addCase` should only be called before calling `builder.addDefaultCase`",
          );
      }
      const a = typeof i == "string" ? i : i.type;
      if (!a)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? de(28)
            : "`builder.addCase` cannot be called with an empty action type",
        );
      if (a in t)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? de(29)
            : `\`builder.addCase\` cannot be called with two reducers for the same action type '${a}'`,
        );
      return (t[a] = s), r;
    },
    addMatcher(i, s) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(
          process.env.NODE_ENV === "production"
            ? de(30)
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
            ? de(31)
            : "`builder.addDefaultCase` can only be called once",
        );
      return (n = i), r;
    },
  };
  return e(r), [t, o, n];
}
function Ii(e) {
  return typeof e == "function";
}
function wi(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? de(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [o, n, r] = Vr(t),
    i;
  if (Ii(e)) i = () => ir(e());
  else {
    const a = ir(e);
    i = () => a;
  }
  function s(a = i(), c) {
    let f = [
      o[c.type],
      ...n.filter(({ matcher: u }) => u(c)).map(({ reducer: u }) => u),
    ];
    return (
      f.filter((u) => !!u).length === 0 && (f = [r]),
      f.reduce((u, l) => {
        if (l)
          if (Pe(u)) {
            const h = l(u, c);
            return h === void 0 ? u : h;
          } else {
            if (Ne(u)) return Ur(u, (d) => l(d, c));
            {
              const d = l(u, c);
              if (d === void 0) {
                if (u === null) return u;
                throw new Error(
                  process.env.NODE_ENV === "production"
                    ? de(9)
                    : "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return d;
            }
          }
        return u;
      }, a)
    );
  }
  return (s.getInitialState = i), s;
}
var xi = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  Ni = (e = 21) => {
    let t = "",
      o = e;
    for (; o--; ) t += xi[(Math.random() * 64) | 0];
    return t;
  },
  ji = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Pi(e, t) {
  return `${e}/${t}`;
}
function Fi({ creators: e } = {}) {
  var o;
  const t = (o = e == null ? void 0 : e.asyncThunk) == null ? void 0 : o[ji];
  return function (r) {
    const { name: i, reducerPath: s = i } = r;
    if (!i)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? de(11)
          : "`name` is a required option for createSlice",
      );
    typeof process < "u" &&
      process.env.NODE_ENV === "development" &&
      r.initialState === void 0 &&
      console.error(
        "You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`",
      );
    const a =
        (typeof r.reducers == "function" ? r.reducers(ki()) : r.reducers) || {},
      c = Object.keys(a),
      f = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      u = {
        addCase(S, R) {
          const E = typeof S == "string" ? S : S.type;
          if (!E)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? de(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (E in f.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? de(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  E,
            );
          return (f.sliceCaseReducersByType[E] = R), u;
        },
        addMatcher(S, R) {
          return (
            f.sliceMatchers.push({
              matcher: S,
              reducer: R,
            }),
            u
          );
        },
        exposeAction(S, R) {
          return (f.actionCreators[S] = R), u;
        },
        exposeCaseReducer(S, R) {
          return (f.sliceCaseReducersByName[S] = R), u;
        },
      };
    c.forEach((S) => {
      const R = a[S],
        E = {
          reducerName: S,
          type: Pi(i, S),
          createNotation: typeof r.reducers == "function",
        };
      Bi(R) ? Ui(E, R, u, t) : Li(E, R, u);
    });
    function l() {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof r.extraReducers == "object"
      )
        throw new Error(
          process.env.NODE_ENV === "production"
            ? de(14)
            : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
        );
      const [S = {}, R = [], E = void 0] =
          typeof r.extraReducers == "function"
            ? Vr(r.extraReducers)
            : [r.extraReducers],
        x = {
          ...S,
          ...f.sliceCaseReducersByType,
        };
      return wi(r.initialState, (F) => {
        for (let y in x) F.addCase(y, x[y]);
        for (let y of f.sliceMatchers) F.addMatcher(y.matcher, y.reducer);
        for (let y of R) F.addMatcher(y.matcher, y.reducer);
        E && F.addDefaultCase(E);
      });
    }
    const d = (S) => S,
      h = /* @__PURE__ */ new Map();
    let p;
    function m(S, R) {
      return p || (p = l()), p(S, R);
    }
    function v() {
      return p || (p = l()), p.getInitialState();
    }
    function _(S, R = !1) {
      function E(F) {
        let y = F[S];
        if (typeof y > "u") {
          if (R) y = v();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? de(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return y;
      }
      function x(F = d) {
        const y = sr(h, R, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return sr(y, F, {
          insert: () => {
            const B = {};
            for (const [O, M] of Object.entries(r.selectors ?? {}))
              B[O] = Mi(M, F, v, R);
            return B;
          },
        });
      }
      return {
        reducerPath: S,
        getSelectors: x,
        get selectors() {
          return x(E);
        },
        selectSlice: E,
      };
    }
    const b = {
      name: i,
      reducer: m,
      actions: f.actionCreators,
      caseReducers: f.sliceCaseReducersByName,
      getInitialState: v,
      ..._(s),
      injectInto(S, { reducerPath: R, ...E } = {}) {
        const x = R ?? s;
        return (
          S.inject(
            {
              reducerPath: x,
              reducer: m,
            },
            E,
          ),
          {
            ...b,
            ..._(x, !0),
          }
        );
      },
    };
    return b;
  };
}
function Mi(e, t, o, n) {
  function r(i, ...s) {
    let a = t(i);
    if (typeof a > "u") {
      if (n) a = o();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(
          process.env.NODE_ENV === "production"
            ? de(16)
            : "selectState returned undefined for an uninjected slice reducer",
        );
    }
    return e(a, ...s);
  }
  return (r.unwrapped = e), r;
}
var $i = /* @__PURE__ */ Fi();
function ki() {
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
function Li({ type: e, reducerName: t, createNotation: o }, n, r) {
  let i, s;
  if ("reducer" in n) {
    if (o && !Hi(n))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? de(17)
          : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.",
      );
    (i = n.reducer), (s = n.prepare);
  } else i = n;
  r.addCase(e, i)
    .exposeCaseReducer(t, i)
    .exposeAction(t, s ? Ze(e, s) : Ze(e));
}
function Bi(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Hi(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Ui({ type: e, reducerName: t }, o, n, r) {
  if (!r)
    throw new Error(
      process.env.NODE_ENV === "production"
        ? de(18)
        : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.",
    );
  const {
      payloadCreator: i,
      fulfilled: s,
      pending: a,
      rejected: c,
      settled: f,
      options: u,
    } = o,
    l = r(e, i, u);
  n.exposeAction(t, l),
    s && n.addCase(l.fulfilled, s),
    a && n.addCase(l.pending, a),
    c && n.addCase(l.rejected, c),
    f && n.addMatcher(l.settled, f),
    n.exposeCaseReducer(t, {
      fulfilled: s || Et,
      pending: a || Et,
      rejected: c || Et,
      settled: f || Et,
    });
}
function Et() {}
var zi = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? de(32)
          : `${t} is not a function`,
      );
  },
  Tn = "listenerMiddleware",
  Vi = (e) => {
    let { type: t, actionCreator: o, matcher: n, predicate: r, effect: i } = e;
    if (t) r = Ze(t).match;
    else if (o) (t = o.type), (r = o.match);
    else if (n) r = n;
    else if (!r)
      throw new Error(
        process.env.NODE_ENV === "production"
          ? de(21)
          : "Creating or removing a listener requires one of the known fields for matching an action",
      );
    return (
      zi(i, "options.listener"),
      {
        predicate: r,
        type: t,
        effect: i,
      }
    );
  },
  qi = Object.assign(
    (e) => {
      const { type: t, predicate: o, effect: n } = Vi(e);
      return {
        id: Ni(),
        effect: n,
        type: t,
        predicate: o,
        pending: /* @__PURE__ */ new Set(),
        unsubscribe: () => {
          throw new Error(
            process.env.NODE_ENV === "production"
              ? de(22)
              : "Unsubscribe not initialized",
          );
        },
      };
    },
    {
      withTypes: () => qi,
    },
  ),
  Wi = Object.assign(Ze(`${Tn}/add`), {
    withTypes: () => Wi,
  });
Ze(`${Tn}/removeAll`);
var Yi = Object.assign(Ze(`${Tn}/remove`), {
  withTypes: () => Yi,
});
function de(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Ki = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    conversationsLoadingState: Ce.UNINITIALIZED,
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: ni(),
    codeblockLoaded: !1,
    source: void 0,
    manifest: {},
  },
  wt = $i({
    name: "appState",
    initialState: Ki,
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
        var n, r;
        const o = t.payload;
        if (o.meta && o.meta.uniqueId) {
          const i =
            ((n = e.manifest.nodes) == null ? void 0 : n[o.meta.uniqueId]) ||
            ((r = e.manifest.macros) == null ? void 0 : r[o.meta.uniqueId]);
          o.meta.filePath = (i == null ? void 0 : i.original_file_path) || "";
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
    setCurrentUserId: wc,
    setShareId: xc,
    updateSelectedConversationId: On,
    updateRightPanelState: Rn,
    setUsers: Gi,
    setConversations: Xi,
    resetNewConversation: An,
    updateNewConversation: Zi,
    upsertConversation: Nc,
    setDocsAppRendered: jc,
    updateCurrentPage: Pc,
    updateCodeblockLoaded: Fc,
    resolveConversationGroup: Ji,
    setConversationsLoadingState: ar,
    refetchConversations: qr,
    setConversationSource: Mc,
    setManifest: Qi,
  } = wt.actions,
  Ht = Qe({
    state: wt.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  es = ({
    children: e,
    shareId: t,
    userId: o,
    conversationGroupId: n,
    source: r,
  }) => {
    const [i, s] = zo(wt.reducer, {
        ...wt.getInitialState(),
        shareId: t,
        currentUserId: o,
        selectedConversationId: n,
        isRightPanelOpen: !!n,
        source: r,
      }),
      a = Ke((f) => f(i), [i]),
      c = lt(
        () => ({
          state: i,
          dispatch: s,
          getValue: a,
        }),
        [i, s, a],
      );
    return /* @__PURE__ */ P.jsx(Ht.Provider, { value: c, children: e });
  },
  ts = es,
  ns = () => et(Ht),
  le = (e) => {
    const { getValue: t } = et(Ht);
    return t(e);
  },
  Ae = () => {
    const { dispatch: e } = et(Ht);
    return e;
  },
  rs = Qe({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  os = Qe(null),
  is = typeof document < "u",
  Wr = is ? Vo : Re;
class ur {
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
function ss(e) {
  let t = new ur(),
    o = new ur(),
    n = 0,
    r = !1,
    i = !1;
  const s = /* @__PURE__ */ new WeakSet(),
    a = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (c, f = !1, u = !1) => {
        const l = u && r,
          d = l ? t : o;
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
        if (((r = !0), ([t, o] = [o, t]), o.clear(), (n = t.order.length), n))
          for (let f = 0; f < n; f++) {
            const u = t.order[f];
            s.has(u) && (a.schedule(u), e()), u(c);
          }
        (r = !1), i && ((i = !1), a.process(c));
      },
    };
  return a;
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
  as = 40;
function us(e, t) {
  let o = !1,
    n = !0;
  const r = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    i = bt.reduce((l, d) => ((l[d] = ss(() => (o = !0))), l), {}),
    s = (l) => {
      i[l].process(r);
    },
    a = () => {
      const l = performance.now();
      (o = !1),
        (r.delta = n ? 1e3 / 60 : Math.max(Math.min(l - r.timestamp, as), 1)),
        (r.timestamp = l),
        (r.isProcessing = !0),
        bt.forEach(s),
        (r.isProcessing = !1),
        o && t && ((n = !1), e(a));
    },
    c = () => {
      (o = !0), (n = !0), r.isProcessing || e(a);
    };
  return {
    schedule: bt.reduce((l, d) => {
      const h = i[d];
      return (l[d] = (p, m = !1, v = !1) => (o || c(), h.schedule(p, m, v))), l;
    }, {}),
    cancel: (l) => bt.forEach((d) => i[d].cancel(l)),
    state: r,
    steps: i,
  };
}
const cs = Qe({});
function ls(e) {
  const t = Te(null);
  return t.current === null && (t.current = e()), t.current;
}
const fs = (e) => e,
  {
    schedule: ds,
    cancel: $c,
    state: kc,
    steps: Lc,
  } = us(typeof requestAnimationFrame < "u" ? requestAnimationFrame : fs, !0);
function Yr() {
  const e = Te(!1);
  return (
    Wr(
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
function ps() {
  const e = Yr(),
    [t, o] = ge(0),
    n = Ke(() => {
      e.current && o(t + 1);
    }, [t]);
  return [Ke(() => ds.postRender(n), [n]), t];
}
class hs extends Ee.Component {
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
function gs({ children: e, isPresent: t }) {
  const o = xr(),
    n = Te(null),
    r = Te({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: i } = et(rs);
  return (
    qo(() => {
      const { width: s, height: a, top: c, left: f } = r.current;
      if (t || !n.current || !s || !a) return;
      n.current.dataset.motionPopId = o;
      const u = document.createElement("style");
      return (
        i && (u.nonce = i),
        document.head.appendChild(u),
        u.sheet &&
          u.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${a}px !important;
            top: ${c}px !important;
            left: ${f}px !important;
          }
        `),
        () => {
          document.head.removeChild(u);
        }
      );
    }, [t]),
    Ee.createElement(
      hs,
      { isPresent: t, childRef: n, sizeRef: r },
      Ee.cloneElement(e, { ref: n }),
    )
  );
}
const Zt = ({
  children: e,
  initial: t,
  isPresent: o,
  onExitComplete: n,
  custom: r,
  presenceAffectsLayout: i,
  mode: s,
}) => {
  const a = ls(vs),
    c = xr(),
    f = lt(
      () => ({
        id: c,
        initial: t,
        isPresent: o,
        custom: r,
        onExitComplete: (u) => {
          a.set(u, !0);
          for (const l of a.values()) if (!l) return;
          n && n();
        },
        register: (u) => (a.set(u, !1), () => a.delete(u)),
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      i ? void 0 : [o],
    );
  return (
    lt(() => {
      a.forEach((u, l) => a.set(l, !1));
    }, [o]),
    Ee.useEffect(() => {
      !o && !a.size && n && n();
    }, [o]),
    s === "popLayout" && (e = Ee.createElement(gs, { isPresent: o }, e)),
    Ee.createElement(os.Provider, { value: f }, e)
  );
};
function vs() {
  return /* @__PURE__ */ new Map();
}
function ms(e) {
  return Re(() => () => e(), []);
}
const ke = (e) => e.key || "";
function ys(e, t) {
  e.forEach((o) => {
    const n = ke(o);
    t.set(n, o);
  });
}
function Es(e) {
  const t = [];
  return (
    Ge.forEach(e, (o) => {
      Nr(o) && t.push(o);
    }),
    t
  );
}
const bs = ({
    children: e,
    custom: t,
    initial: o = !0,
    onExitComplete: n,
    exitBeforeEnter: r,
    presenceAffectsLayout: i = !0,
    mode: s = "sync",
  }) => {
    const a = et(cs).forceRender || ps()[0],
      c = Yr(),
      f = Es(e);
    let u = f;
    const l = Te(/* @__PURE__ */ new Map()).current,
      d = Te(u),
      h = Te(/* @__PURE__ */ new Map()).current,
      p = Te(!0);
    if (
      (Wr(() => {
        (p.current = !1), ys(f, h), (d.current = u);
      }),
      ms(() => {
        (p.current = !0), h.clear(), l.clear();
      }),
      p.current)
    )
      return Ee.createElement(
        Ee.Fragment,
        null,
        u.map((b) =>
          Ee.createElement(
            Zt,
            {
              key: ke(b),
              isPresent: !0,
              initial: o ? void 0 : !1,
              presenceAffectsLayout: i,
              mode: s,
            },
            b,
          ),
        ),
      );
    u = [...u];
    const m = d.current.map(ke),
      v = f.map(ke),
      _ = m.length;
    for (let b = 0; b < _; b++) {
      const S = m[b];
      v.indexOf(S) === -1 && !l.has(S) && l.set(S, void 0);
    }
    return (
      s === "wait" && l.size && (u = []),
      l.forEach((b, S) => {
        if (v.indexOf(S) !== -1) return;
        const R = h.get(S);
        if (!R) return;
        const E = m.indexOf(S);
        let x = b;
        if (!x) {
          const F = () => {
            l.delete(S);
            const y = Array.from(h.keys()).filter((B) => !v.includes(B));
            if (
              (y.forEach((B) => h.delete(B)),
              (d.current = f.filter((B) => {
                const O = ke(B);
                return (
                  // filter out the node exiting
                  O === S || // filter out the leftover children
                  y.includes(O)
                );
              })),
              !l.size)
            ) {
              if (c.current === !1) return;
              a(), n && n();
            }
          };
          (x = Ee.createElement(
            Zt,
            {
              key: ke(R),
              isPresent: !1,
              onExitComplete: F,
              custom: t,
              presenceAffectsLayout: i,
              mode: s,
            },
            R,
          )),
            l.set(S, x);
        }
        u.splice(E, 0, x);
      }),
      (u = u.map((b) => {
        const S = b.key;
        return l.has(S)
          ? b
          : Ee.createElement(
              Zt,
              { key: ke(b), isPresent: !0, presenceAffectsLayout: i, mode: s },
              b,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        s === "wait" &&
        u.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      Ee.createElement(Ee.Fragment, null, l.size ? u : u.map((b) => Wo(b)))
    );
  },
  Ut = "altimate-display-",
  _s = `${Ut}-highlight`,
  cr = `${Ut}-highlight-hover`,
  Ss = `${Ut}-active-highlight`,
  Cs = 1049,
  Dn = ({ icon: e, className: t = "", ...o }) =>
    /* @__PURE__ */ P.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...o,
    }),
  Ts = (e) => /* @__PURE__ */ P.jsx(Dn, { icon: "comment", ...e }),
  Os = (e) => /* @__PURE__ */ P.jsx(Dn, { icon: "check", ...e }),
  Rs = (e) => /* @__PURE__ */ P.jsx(Dn, { icon: "send", ...e }),
  As = "_iconButton_eti7u_1",
  Ds = {
    iconButton: As,
  },
  Is = (e) =>
    /* @__PURE__ */ P.jsx(Fs, {
      title: e.title,
      children: /* @__PURE__ */ P.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${
          e.className ?? ""
        } ${Ds.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  ws = Is,
  xs = Qe(null),
  Jt = {
    didCatch: !1,
    error: null,
  };
class Ns extends Yo {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = Jt);
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
        this.setState(Jt);
    }
  }
  componentDidCatch(t, o) {
    var n, r;
    (n = (r = this.props).onError) === null || n === void 0 || n.call(r, t, o);
  }
  componentDidUpdate(t, o) {
    const { didCatch: n } = this.state,
      { resetKeys: r } = this.props;
    if (n && o.error !== null && js(t.resetKeys, r)) {
      var i, s;
      (i = (s = this.props).onReset) === null ||
        i === void 0 ||
        i.call(s, {
          next: r,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(Jt);
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
    let a = t;
    if (i) {
      const c = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (typeof o == "function") a = o(c);
      else if (n) a = Kn(n, c);
      else if (r === null || Nr(r)) a = r;
      else throw s;
    }
    return Kn(
      xs.Provider,
      {
        value: {
          didCatch: i,
          error: s,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      a,
    );
  }
}
function js() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((o, n) => !Object.is(o, t[n]));
}
const Ps = (e) => {
    const [t, o] = ge(!1),
      n = () => o(!t),
      r = Te(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ P.jsxs(Ns, {
      fallback: /* @__PURE__ */ P.jsx("span", {
        id: r.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ P.jsx("span", { id: r.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ P.jsx(Go, {
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
  Fs = Ps,
  Ms = "_loadingBtn_gadec_1",
  $s = {
    loadingBtn: Ms,
  },
  ks = ({ loading: e, ...t }) =>
    /* @__PURE__ */ P.jsx(Pt, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${$s.loadingBtn}`,
      children: e ? /* @__PURE__ */ P.jsx(Xo, {}) : t.children,
    }),
  Ls = ks;
function Kr(e) {
  return e ? (typeof e == "string" ? e : e.source) : null;
}
function Bs(...e) {
  return e.map((o) => Kr(o)).join("");
}
function Qt(...e) {
  return "(" + e.map((o) => Kr(o)).join("|") + ")";
}
function Hs(e) {
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
    a = ["add", "asc", "collation", "desc", "final", "first", "last", "view"],
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
    f = [
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
    u = [
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
    d = f,
    h = [...c, ...a].filter((b) => !f.includes(b)),
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
      begin: Bs(/\b/, Qt(...d), /\s*\(/),
      keywords: {
        built_in: d,
      },
    };
  function _(b, { exceptions: S, when: R } = {}) {
    const E = R;
    return (
      (S = S || []),
      b.map((x) =>
        x.match(/\|\d+$/) || S.includes(x) ? x : E(x) ? `${x}|0` : x,
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
      keyword: _(h, { when: (b) => b.length < 3 }),
      literal: r,
      type: s,
      built_in: u,
    },
    contains: [
      {
        begin: Qt(...l),
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: h.concat(l),
          literal: r,
          type: s,
        },
      },
      {
        className: "type",
        begin: Qt(...i),
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
var Us = Hs;
const zs = /* @__PURE__ */ tt(Us);
function Vs(e) {
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
    a = "[0-9]{4}(-[0-9][0-9]){0,2}",
    c = "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?",
    f = "(\\.[0-9]*)?",
    u = "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?",
    l = {
      className: "number",
      begin: "\\b" + a + c + f + u + "\\b",
    },
    d = {
      end: ",",
      endsWithParent: !0,
      excludeEnd: !0,
      keywords: t,
      relevance: 0,
    },
    h = {
      begin: /\{/,
      end: /\}/,
      contains: [d],
      illegal: "\\n",
      relevance: 0,
    },
    p = {
      begin: "\\[",
      end: "\\]",
      contains: [d],
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
    (d.contains = v),
    {
      name: "YAML",
      case_insensitive: !0,
      aliases: ["yml"],
      contains: m,
    }
  );
}
var qs = Vs;
const Ws = /* @__PURE__ */ tt(qs),
  Ys = {
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
  Ks = {
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
  Gs = {
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
  Xs = "_codeblock_1dekk_1",
  Zs = {
    codeblock: Xs,
  };
bn.registerLanguage("javascript", zs);
bn.registerLanguage("javascript", Ws);
const Js = { vs: Gs, solarizedDark: Ys, solarizedLight: Ks },
  Qs = ({
    code: e,
    language: t,
    fileName: o,
    theme: n = "vs",
    showLineNumbers: r,
  }) =>
    /* @__PURE__ */ P.jsxs(Ft, {
      className: Zs.codeblock,
      children: [
        o ? /* @__PURE__ */ P.jsx(jr, { children: o }) : null,
        /* @__PURE__ */ P.jsx(Mt, {
          children: /* @__PURE__ */ P.jsx(bn, {
            showLineNumbers: r,
            language: t,
            style: Js[n],
            children: e,
          }),
        }),
      ],
    }),
  ea = Qs,
  ta = ({ pos: e, onAddComment: t }) =>
    Pr(
      /* @__PURE__ */ P.jsx(bs, {
        children:
          e &&
          /* @__PURE__ */ P.jsx(Pt, {
            onClick: t,
            id: `${Ut}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: Cs + 5,
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
            children: /* @__PURE__ */ P.jsx(Ts, {}),
          }),
      }),
      e.element.parentElement,
    ),
  na = ta,
  ra = () => {
    const {
        state: { isRightPanelOpen: e },
      } = ns(),
      t = Ae(),
      o = () => {
        t(Rn(!e));
      };
    return /* @__PURE__ */ P.jsx(Pt, {
      onClick: o,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  oa = ra,
  nt = {
    get: async (e, t, o) => ({}),
    post: async (e, t, o) => ({}),
  },
  ia = (e) => nt.get(`dbt/dbt_docs_share/${e}`),
  sa = (e, t) => nt.post(`dbt/dbt_docs_share/${e}/conversation_group`, t),
  aa = (e, t, o) =>
    nt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, o),
  ua = (e) => nt.get(`dbt/dbt_docs_share/${e}/conversations`),
  ca = (e) => nt.get("/users/chat", { company: e }),
  la = (e, t) =>
    nt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
    }),
  fa = () => {
    const e = le((a) => a.shareId),
      [t, o] = ge(null),
      [n, r] = ge(!1),
      i = Ae();
    Re(() => {
      t != null &&
        t.manifest_presigned_url &&
        fetch(t.manifest_presigned_url)
          .then((a) => a.json())
          .then((a) => {
            i(Qi(a));
          })
          .catch((a) =>
            console.error(
              "error loading manifest",
              a,
              t.manifest_presigned_url,
            ),
          );
    }, [i, t == null ? void 0 : t.manifest_presigned_url]);
    const s = Ke(async () => {
      if (!e) return;
      r(!0);
      const a = await ia(e);
      if (a) {
        o(a);
        const c = document.getElementById("collapse-sidebar");
        c == null || c.click();
      }
      r(!1);
    }, [e]);
    return (
      Re(() => {
        !e || t || n || s();
      }, [e, t, s, n]),
      { shareDetails: t, loading: n }
    );
  };
var Gr = { exports: {} };
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
        (r.d = function (i, s, a) {
          r.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: a });
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
          var a = /* @__PURE__ */ Object.create(null);
          if (
            (r.r(a),
            Object.defineProperty(a, "default", { enumerable: !0, value: i }),
            2 & s && typeof i != "string")
          )
            for (var c in i)
              r.d(
                a,
                c,
                function (f) {
                  return i[f];
                }.bind(null, c),
              );
          return a;
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
            ((i = function (l, d) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (h, p) {
                    h.__proto__ = p;
                  }) ||
                function (h, p) {
                  for (var m in p)
                    Object.prototype.hasOwnProperty.call(p, m) && (h[m] = p[m]);
                })(l, d);
            }),
            function (l, d) {
              function h() {
                this.constructor = l;
              }
              i(l, d),
                (l.prototype =
                  d === null
                    ? Object.create(d)
                    : ((h.prototype = d.prototype), new h()));
            }),
          a =
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
        var c = a(r(10)),
          f = a(r(2));
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
        var u = (function (l) {
          function d() {
            return (l !== null && l.apply(this, arguments)) || this;
          }
          return s(d, l), d;
        })(f.default);
        n.eventEmitter = new u();
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
            function (c, f) {
              var u = typeof Symbol == "function" && c[Symbol.iterator];
              if (!u) return c;
              var l,
                d,
                h = u.call(c),
                p = [];
              try {
                for (; (f === void 0 || f-- > 0) && !(l = h.next()).done; )
                  p.push(l.value);
              } catch (m) {
                d = { error: m };
              } finally {
                try {
                  l && !l.done && (u = h.return) && u.call(h);
                } finally {
                  if (d) throw d.error;
                }
              }
              return p;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var c = [], f = 0; f < arguments.length; f++)
                c = c.concat(i(arguments[f]));
              return c;
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = (function () {
          function c() {
            this.handlersMap = /* @__PURE__ */ Object.create(null);
          }
          return (
            (c.prototype.on = function (f, u) {
              return (
                this.handlersMap[f] || (this.handlersMap[f] = []),
                this.handlersMap[f].push(u),
                this
              );
            }),
            (c.prototype.off = function (f, u) {
              return (
                this.handlersMap[f] &&
                  this.handlersMap[f].splice(
                    this.handlersMap[f].indexOf(u) >>> 0,
                    1,
                  ),
                this
              );
            }),
            (c.prototype.emit = function (f) {
              for (var u = [], l = 1; l < arguments.length; l++)
                u[l - 1] = arguments[l];
              return (
                this.handlersMap[f] &&
                  this.handlersMap[f].slice().forEach(function (d) {
                    d.apply(void 0, s(u));
                  }),
                this
              );
            }),
            c
          );
        })();
        n.default = a;
      },
      function (o, n, r) {
        var i =
          (this && this.__importDefault) ||
          function (f) {
            return f && f.__esModule ? f : { default: f };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = i(r(5)),
          a = r(9),
          c = (function () {
            function f(u, l, d, h, p) {
              (this.startMeta = u),
                (this.endMeta = l),
                (this.text = d),
                (this.id = h),
                (this.__isHighlightSource = {}),
                p && (this.extra = p);
            }
            return (
              (f.prototype.deSerialize = function (u, l) {
                var d = a.queryElementNode(this, u),
                  h = d.start,
                  p = d.end,
                  m = a.getTextChildByOffset(h, this.startMeta.textOffset),
                  v = a.getTextChildByOffset(p, this.endMeta.textOffset);
                if (!l.Serialize.Restore.isEmpty()) {
                  var _ = l.Serialize.Restore.call(this, m, v) || [];
                  (m = _[0] || m), (v = _[1] || v);
                }
                return new s.default(m, v, this.text, this.id, !0);
              }),
              f
            );
          })();
        n.default = c;
      },
      function (o, n, r) {
        var i =
            (this && this.__values) ||
            function (u) {
              var l = typeof Symbol == "function" && Symbol.iterator,
                d = l && u[l],
                h = 0;
              if (d) return d.call(u);
              if (u && typeof u.length == "number")
                return {
                  next: function () {
                    return (
                      u && h >= u.length && (u = void 0),
                      { value: u && u[h++], done: !u }
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
            function (u, l) {
              var d = typeof Symbol == "function" && u[Symbol.iterator];
              if (!d) return u;
              var h,
                p,
                m = d.call(u),
                v = [];
              try {
                for (; (l === void 0 || l-- > 0) && !(h = m.next()).done; )
                  v.push(h.value);
              } catch (_) {
                p = { error: _ };
              } finally {
                try {
                  h && !h.done && (d = m.return) && d.call(m);
                } finally {
                  if (p) throw p.error;
                }
              }
              return v;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var u = [], l = 0; l < arguments.length; l++)
                u = u.concat(s(arguments[l]));
              return u;
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
        n.isHighlightWrapNode = function (u) {
          return !!u.dataset && !!u.dataset[c.CAMEL_DATASET_IDENTIFIER];
        };
        var f = function (u, l) {
          for (var d = !1, h = null; u; ) {
            if ((n.isHighlightWrapNode(u) && (h = u), u === l)) {
              d = !0;
              break;
            }
            u = u.parentNode;
          }
          return d ? h : null;
        };
        (n.getHighlightId = function (u, l) {
          return (u = f(u, l)) ? u.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
        }),
          (n.getExtraHighlightId = function (u, l) {
            return (u = f(u, l))
              ? u.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA]
                  .split(c.ID_DIVISION)
                  .filter(function (d) {
                    return d;
                  })
              : [];
          }),
          (n.getHighlightsByRoot = function (u, l) {
            var d, h;
            Array.isArray(u) || (u = [u]);
            var p = [];
            try {
              for (var m = i(u), v = m.next(); !v.done; v = m.next()) {
                var _ = v.value.querySelectorAll(
                  l + "[data-" + c.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, _);
              }
            } catch (b) {
              d = { error: b };
            } finally {
              try {
                v && !v.done && (h = m.return) && h.call(m);
              } finally {
                if (d) throw d.error;
              }
            }
            return p;
          }),
          (n.getHighlightById = function (u, l, d) {
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
              _ = u.querySelectorAll(d + "[data-" + c.DATASET_IDENTIFIER + "]");
            try {
              for (var b = i(_), S = b.next(); !S.done; S = b.next()) {
                var R = S.value;
                if (R.dataset[c.CAMEL_DATASET_IDENTIFIER] !== l) {
                  var E = R.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  v.test(E) && m.push(R);
                } else m.push(R);
              }
            } catch (x) {
              h = { error: x };
            } finally {
              try {
                S && !S.done && (p = b.return) && p.call(b);
              } finally {
                if (h) throw h.error;
              }
            }
            return m;
          }),
          (n.forEach = function (u, l) {
            for (var d = 0; d < u.length; d++) l(u[d], d, u);
          }),
          (n.removeEventListener = function (u, l, d) {
            u.removeEventListener(l, d);
          }),
          (n.addEventListener = function (u, l, d) {
            return (
              u.addEventListener(l, d),
              function () {
                n.removeEventListener(u, l, d);
              }
            );
          }),
          (n.addClass = function (u, l) {
            var d;
            Array.isArray(l) || (l = [l]), (d = u.classList).add.apply(d, a(l));
          }),
          (n.removeClass = function (u, l) {
            u.classList.remove(l);
          }),
          (n.removeAllClass = function (u) {
            u.className = "";
          }),
          (n.hasClass = function (u, l) {
            return u.classList.contains(l);
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
          a = r(1),
          c = r(11),
          f = i(r(6)),
          u = r(12),
          l = r(0),
          d = (function () {
            function h(p, m, v, _, b) {
              b === void 0 && (b = !1),
                (p.$node.nodeType === 3 && m.$node.nodeType === 3) ||
                  l.eventEmitter.emit(l.INTERNAL_ERROR_EVENT, {
                    type: a.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = u.formatDomNode(p)),
                (this.end = u.formatDomNode(m)),
                (this.text = v),
                (this.frozen = b),
                (this.id = _);
            }
            return (
              (h.fromSelection = function (p) {
                var m = c.getDomRange();
                if (!m) return null;
                var v = { $node: m.startContainer, offset: m.startOffset },
                  _ = { $node: m.endContainer, offset: m.endOffset },
                  b = m.toString(),
                  S = p.call(v, _, b);
                return new h(v, _, b, (S = S ?? f.default()));
              }),
              (h.prototype.serialize = function (p, m) {
                var v,
                  _ = u.getDomMeta(this.start.$node, this.start.offset, p),
                  b = u.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  m.Serialize.RecordInfo.isEmpty() ||
                    (v = m.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new s.default(_, b, this.text, this.id, v)
                );
              }),
              (h.removeDomRange = c.removeSelection),
              h
            );
          })();
        n.default = d;
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
            ((i = function (E, x) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (F, y) {
                    F.__proto__ = y;
                  }) ||
                function (F, y) {
                  for (var B in y)
                    Object.prototype.hasOwnProperty.call(y, B) && (F[B] = y[B]);
                })(E, x);
            }),
            function (E, x) {
              function F() {
                this.constructor = E;
              }
              i(E, x),
                (E.prototype =
                  x === null
                    ? Object.create(x)
                    : ((F.prototype = x.prototype), new F()));
            }),
          a =
            (this && this.__assign) ||
            function () {
              return (a =
                Object.assign ||
                function (E) {
                  for (var x, F = 1, y = arguments.length; F < y; F++)
                    for (var B in (x = arguments[F]))
                      Object.prototype.hasOwnProperty.call(x, B) &&
                        (E[B] = x[B]);
                  return E;
                }).apply(this, arguments);
            },
          c =
            (this && this.__importDefault) ||
            function (E) {
              return E && E.__esModule ? E : { default: E };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var f = c(r(2)),
          u = c(r(5)),
          l = c(r(3)),
          d = c(r(6)),
          h = c(r(13)),
          p = c(r(14)),
          m = c(r(16)),
          v = c(r(17)),
          _ = r(0),
          b = r(1),
          S = r(4),
          R = (function (E) {
            function x(F) {
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
                (y.addClass = function (O, M) {
                  y.getDoms(M).forEach(function (K) {
                    S.addClass(K, O);
                  });
                }),
                (y.removeClass = function (O, M) {
                  y.getDoms(M).forEach(function (K) {
                    S.removeClass(K, O);
                  });
                }),
                (y.getIdByDom = function (O) {
                  return S.getHighlightId(O, y.options.$root);
                }),
                (y.getExtraIdByDom = function (O) {
                  return S.getExtraHighlightId(O, y.options.$root);
                }),
                (y.getDoms = function (O) {
                  return O
                    ? S.getHighlightById(y.options.$root, O, y.options.wrapTag)
                    : S.getHighlightsByRoot(y.options.$root, y.options.wrapTag);
                }),
                (y.dispose = function () {
                  var O = y.options.$root;
                  S.removeEventListener(
                    O,
                    y.event.PointerOver,
                    y._handleHighlightHover,
                  ),
                    S.removeEventListener(
                      O,
                      y.event.PointerEnd,
                      y._handleSelection,
                    ),
                    S.removeEventListener(
                      O,
                      y.event.PointerTap,
                      y._handleHighlightClick,
                    ),
                    y.removeAll();
                }),
                (y.setOption = function (O) {
                  (y.options = a(a({}, y.options), O)),
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
                (y.fromRange = function (O) {
                  var M = { $node: O.startContainer, offset: O.startOffset },
                    K = { $node: O.endContainer, offset: O.endOffset },
                    X = O.toString(),
                    N = y.hooks.Render.UUID.call(M, K, X);
                  N = N ?? d.default();
                  var I = new u.default(M, K, X, N);
                  return I
                    ? y._highlightFromHRange(I)
                    : (_.eventEmitter.emit(_.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (y.fromStore = function (O, M, K, X, N) {
                  var I = new l.default(O, M, K, X, N);
                  try {
                    return y._highlightFromHSource(I), I;
                  } catch (T) {
                    return (
                      _.eventEmitter.emit(_.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.HIGHLIGHT_SOURCE_RECREATE,
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
                (y._highlightFromHRange = function (O) {
                  var M = O.serialize(y.options.$root, y.hooks);
                  return y.painter.highlightRange(O).length === 0
                    ? (_.eventEmitter.emit(_.INTERNAL_ERROR_EVENT, {
                        type: b.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (y.cache.save(M),
                      y.emit(
                        b.EventType.CREATE,
                        { sources: [M], type: b.CreateFrom.INPUT },
                        y,
                      ),
                      M);
                }),
                (y._handleSelection = function () {
                  var O = u.default.fromSelection(y.hooks.Render.UUID);
                  O && (y._highlightFromHRange(O), u.default.removeDomRange());
                }),
                (y._handleHighlightHover = function (O) {
                  var M = O.target;
                  if (!S.isHighlightWrapNode(M))
                    return (
                      y._hoverId &&
                        y.emit(b.EventType.HOVER_OUT, { id: y._hoverId }, y, O),
                      void (y._hoverId = null)
                    );
                  var K = S.getHighlightId(M, y.options.$root);
                  y._hoverId !== K &&
                    (y._hoverId &&
                      y.emit(b.EventType.HOVER_OUT, { id: y._hoverId }, y, O),
                    (y._hoverId = K),
                    y.emit(b.EventType.HOVER, { id: y._hoverId }, y, O));
                }),
                (y._handleError = function (O) {
                  y.options.verbose && console.warn(O);
                }),
                (y._handleHighlightClick = function (O) {
                  var M = O.target;
                  if (S.isHighlightWrapNode(M)) {
                    var K = S.getHighlightId(M, y.options.$root);
                    y.emit(b.EventType.CLICK, { id: K }, y, O);
                  }
                }),
                (y.options = _.getDefaultOptions()),
                (y.hooks = y._getHooks()),
                y.setOption(F),
                (y.cache = new m.default());
              var B = y.options.$root;
              return (
                S.addEventListener(
                  B,
                  y.event.PointerOver,
                  y._handleHighlightHover,
                ),
                S.addEventListener(
                  B,
                  y.event.PointerTap,
                  y._handleHighlightClick,
                ),
                _.eventEmitter.on(_.INTERNAL_ERROR_EVENT, y._handleError),
                y
              );
            }
            return (
              s(x, E),
              (x.prototype.remove = function (F) {
                if (F) {
                  var y = this.painter.removeHighlight(F);
                  this.cache.remove(F),
                    y && this.emit(b.EventType.REMOVE, { ids: [F] }, this);
                }
              }),
              (x.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var F = this.cache.removeAll();
                this.emit(b.EventType.REMOVE, { ids: F }, this);
              }),
              (x.prototype._highlightFromHSource = function (F) {
                F === void 0 && (F = []);
                var y = this.painter.highlightSource(F);
                this.emit(
                  b.EventType.CREATE,
                  { sources: y, type: b.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(F);
              }),
              (x.event = b.EventType),
              (x.isHighlightWrapNode = S.isHighlightWrapNode),
              (x.isHighlightSource = function (F) {
                return !!F.__isHighlightSource;
              }),
              x
            );
          })(f.default);
        n.default = R;
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.queryElementNode = n.getTextChildByOffset = void 0);
        var i = r(0);
        (n.getTextChildByOffset = function (s, a) {
          for (var c = [s], f = null, u = 0, l = 0; (f = c.pop()); ) {
            for (var d = f.childNodes, h = d.length - 1; h >= 0; h--)
              c.push(d[h]);
            if (
              f.nodeType === 3 &&
              ((l = a - u), (u += f.textContent.length) >= a)
            )
              break;
          }
          return f || (f = s), { $node: f, offset: l };
        }),
          (n.queryElementNode = function (s, a) {
            return {
              start:
                s.startMeta.parentIndex === i.ROOT_IDX
                  ? a
                  : a.getElementsByTagName(s.startMeta.parentTagName)[
                      s.startMeta.parentIndex
                    ],
              end:
                s.endMeta.parentIndex === i.ROOT_IDX
                  ? a
                  : a.getElementsByTagName(s.endMeta.parentTagName)[
                      s.endMeta.parentIndex
                    ],
            };
          });
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (i) {
            return i.split("-").reduce(function (s, a, c) {
              return s + (c === 0 ? a : a[0].toUpperCase() + a.slice(1));
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
        (n.getDomMeta = function (s, a, c) {
          var f = (function (d) {
              if (
                d instanceof HTMLElement &&
                (!d.dataset || !d.dataset[i.CAMEL_DATASET_IDENTIFIER])
              )
                return d;
              for (
                var h = d.parentNode;
                h != null && h.dataset[i.CAMEL_DATASET_IDENTIFIER];

              )
                h = h.parentNode;
              return h;
            })(s),
            u =
              f === c
                ? i.ROOT_IDX
                : (function (d, h) {
                    for (
                      var p = d.tagName, m = h.getElementsByTagName(p), v = 0;
                      v < m.length;
                      v++
                    )
                      if (d === m[v]) return v;
                    return i.UNKNOWN_IDX;
                  })(f, c),
            l = (function (d, h) {
              for (var p = [d], m = null, v = 0; (m = p.pop()); ) {
                for (var _ = m.childNodes, b = _.length - 1; b >= 0; b--)
                  p.push(_[b]);
                if (m.nodeType === 3 && m !== h) v += m.textContent.length;
                else if (m.nodeType === 3) break;
              }
              return v;
            })(f, s);
          return {
            parentTagName: f.tagName,
            parentIndex: u,
            textOffset: l + a,
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
            function (c, f) {
              var u = typeof Symbol == "function" && c[Symbol.iterator];
              if (!u) return c;
              var l,
                d,
                h = u.call(c),
                p = [];
              try {
                for (; (f === void 0 || f-- > 0) && !(l = h.next()).done; )
                  p.push(l.value);
              } catch (m) {
                d = { error: m };
              } finally {
                try {
                  l && !l.done && (u = h.return) && u.call(h);
                } finally {
                  if (d) throw d.error;
                }
              }
              return p;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var c = [], f = 0; f < arguments.length; f++)
                c = c.concat(i(arguments[f]));
              return c;
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = (function () {
          function c(f) {
            (this.name = ""), (this.ops = []), (this.name = f);
          }
          return (
            (c.prototype.tap = function (f) {
              var u = this;
              return (
                this.ops.indexOf(f) === -1 && this.ops.push(f),
                function () {
                  u.remove(f);
                }
              );
            }),
            (c.prototype.remove = function (f) {
              var u = this.ops.indexOf(f);
              u < 0 || this.ops.splice(u, 1);
            }),
            (c.prototype.isEmpty = function () {
              return this.ops.length === 0;
            }),
            (c.prototype.call = function () {
              for (var f, u = [], l = 0; l < arguments.length; l++)
                u[l] = arguments[l];
              return (
                this.ops.forEach(function (d) {
                  f = d.apply(void 0, s(u));
                }),
                f
              );
            }),
            c
          );
        })();
        n.default = a;
      },
      function (o, n, r) {
        var i =
          (this && this.__importDefault) ||
          function (c) {
            return c && c.__esModule ? c : { default: c };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = r(1),
          a = i(r(15));
        n.default = function () {
          var c = a.default(window.navigator.userAgent);
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
            ((i = function (d, h) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (p, m) {
                    p.__proto__ = m;
                  }) ||
                function (p, m) {
                  for (var v in m)
                    Object.prototype.hasOwnProperty.call(m, v) && (p[v] = m[v]);
                })(d, h);
            }),
            function (d, h) {
              function p() {
                this.constructor = d;
              }
              i(d, h),
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
          c =
            (this && this.__importDefault) ||
            function (d) {
              return d && d.__esModule ? d : { default: d };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var f = c(r(2)),
          u = r(1),
          l = (function (d) {
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
                  throw u.ERROR.CACHE_SET_ERROR;
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
                    var _ = a(this._data), b = _.next();
                    !b.done;
                    b = _.next()
                  ) {
                    var S = b.value;
                    v.push(S[1]);
                  }
                } catch (R) {
                  p = { error: R };
                } finally {
                  try {
                    b && !b.done && (m = _.return) && m.call(_);
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
                    var _ = a(this._data), b = _.next();
                    !b.done;
                    b = _.next()
                  ) {
                    var S = b.value;
                    v.push(S[0]);
                  }
                } catch (R) {
                  p = { error: R };
                } finally {
                  try {
                    b && !b.done && (m = _.return) && m.call(_);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return (this._data = /* @__PURE__ */ new Map()), v;
              }),
              h
            );
          })(f.default);
        n.default = l;
      },
      function (o, n, r) {
        var i =
            (this && this.__values) ||
            function (v) {
              var _ = typeof Symbol == "function" && Symbol.iterator,
                b = _ && v[_],
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
                _
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            },
          s =
            (this && this.__read) ||
            function (v, _) {
              var b = typeof Symbol == "function" && v[Symbol.iterator];
              if (!b) return v;
              var S,
                R,
                E = b.call(v),
                x = [];
              try {
                for (; (_ === void 0 || _-- > 0) && !(S = E.next()).done; )
                  x.push(S.value);
              } catch (F) {
                R = { error: F };
              } finally {
                try {
                  S && !S.done && (b = E.return) && b.call(E);
                } finally {
                  if (R) throw R.error;
                }
              }
              return x;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var v = [], _ = 0; _ < arguments.length; _++)
                v = v.concat(s(arguments[_]));
              return v;
            },
          c =
            (this && this.__importDefault) ||
            function (v) {
              return v && v.__esModule ? v : { default: v };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var f = c(r(3)),
          u = r(18),
          l = r(4),
          d = r(1),
          h = r(20),
          p = r(0),
          m = (function () {
            function v(_, b) {
              (this.options = {
                $root: _.$root,
                wrapTag: _.wrapTag,
                exceptSelectors: _.exceptSelectors,
                className: _.className,
              }),
                (this.hooks = b),
                h.initDefaultStylesheet();
            }
            return (
              (v.prototype.highlightRange = function (_) {
                var b = this;
                if (!_.frozen) throw d.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var S = this.options,
                  R = S.$root,
                  E = S.className,
                  x = S.exceptSelectors,
                  F = this.hooks,
                  y = u.getSelectedNodes(R, _.start, _.end, x);
                return (
                  F.Render.SelectedNodes.isEmpty() ||
                    (y = F.Render.SelectedNodes.call(_.id, y) || []),
                  y.map(function (B) {
                    var O = u.wrapHighlight(B, _, E, b.options.wrapTag);
                    return (
                      F.Render.WrapNode.isEmpty() ||
                        (O = F.Render.WrapNode.call(_.id, O)),
                      O
                    );
                  })
                );
              }),
              (v.prototype.highlightSource = function (_) {
                var b = this,
                  S = Array.isArray(_) ? _ : [_],
                  R = [];
                return (
                  S.forEach(function (E) {
                    if (E instanceof f.default) {
                      var x = E.deSerialize(b.options.$root, b.hooks);
                      b.highlightRange(x).length > 0
                        ? R.push(E)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: d.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: E,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: d.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  R
                );
              }),
              (v.prototype.removeHighlight = function (_) {
                var b,
                  S,
                  R = new RegExp(
                    "(" +
                      _ +
                      "\\" +
                      p.ID_DIVISION +
                      "|\\" +
                      p.ID_DIVISION +
                      "?" +
                      _ +
                      "$)",
                  ),
                  E = this.hooks,
                  x = this.options.wrapTag,
                  F = document.querySelectorAll(
                    x + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  y = [],
                  B = [],
                  O = [];
                try {
                  for (var M = i(F), K = M.next(); !K.done; K = M.next()) {
                    var X = K.value,
                      N = X.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      I = X.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    N !== _ || I
                      ? N === _
                        ? B.push(X)
                        : N !== _ && R.test(I) && O.push(X)
                      : y.push(X);
                  }
                } catch (T) {
                  b = { error: T };
                } finally {
                  try {
                    K && !K.done && (S = M.return) && S.call(M);
                  } finally {
                    if (b) throw b.error;
                  }
                }
                return (
                  y.forEach(function (T) {
                    var w = T.parentNode,
                      D = document.createDocumentFragment();
                    l.forEach(T.childNodes, function (A) {
                      return D.appendChild(A.cloneNode(!1));
                    });
                    var L = T.previousSibling,
                      C = T.nextSibling;
                    w.replaceChild(D, T),
                      u.normalizeSiblingText(L, !0),
                      u.normalizeSiblingText(C, !1),
                      E.Remove.UpdateNodes.call(_, T, "remove");
                  }),
                  B.forEach(function (T) {
                    var w = T.dataset,
                      D = w[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      L = D.shift(),
                      C = document.querySelector(
                        x + "[data-" + p.DATASET_IDENTIFIER + '="' + L + '"]',
                      );
                    C && (l.removeAllClass(T), l.addClass(T, a(C.classList))),
                      (w[p.CAMEL_DATASET_IDENTIFIER] = L),
                      (w[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = D.join(
                        p.ID_DIVISION,
                      )),
                      E.Remove.UpdateNodes.call(_, T, "id-update");
                  }),
                  O.forEach(function (T) {
                    var w = T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = w.replace(
                      R,
                      "",
                    )),
                      E.Remove.UpdateNodes.call(_, T, "extra-update");
                  }),
                  y.length + B.length + O.length !== 0
                );
              }),
              (v.prototype.removeAllHighlight = function () {
                var _ = this.options,
                  b = _.wrapTag,
                  S = _.$root;
                l.getHighlightsByRoot(S, b).forEach(function (R) {
                  var E = R.parentNode,
                    x = document.createDocumentFragment();
                  l.forEach(R.childNodes, function (F) {
                    return x.appendChild(F.cloneNode(!1));
                  }),
                    E.replaceChild(x, R);
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
              var _,
                b,
                S = v.call(p),
                R = [];
              try {
                for (; (m === void 0 || m-- > 0) && !(_ = S.next()).done; )
                  R.push(_.value);
              } catch (E) {
                b = { error: E };
              } finally {
                try {
                  _ && !_.done && (v = S.return) && v.call(S);
                } finally {
                  if (b) throw b.error;
                }
              }
              return R;
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
        var a = r(1),
          c = r(4),
          f = r(0),
          u = r(19),
          l = function (p, m) {
            if (!p) return !1;
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
        n.getSelectedNodes = function (p, m, v, _) {
          var b = m.$node,
            S = v.$node,
            R = m.offset,
            E = v.offset;
          if (b === S && b instanceof Text)
            return (function (N, I, T, w) {
              for (
                var D = N,
                  L = function (A) {
                    return w == null
                      ? void 0
                      : w.some(function (U) {
                          return l(A, U);
                        });
                  };
                D;

              ) {
                if (D.nodeType === 1 && L(D)) return [];
                D = D.parentNode;
              }
              N.splitText(I);
              var C = N.nextSibling;
              return (
                C.splitText(T - I),
                [
                  {
                    $node: C,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.both,
                  },
                ]
              );
            })(b, R, E, _);
          for (
            var x = [p],
              F = [],
              y = function (N) {
                return _ == null
                  ? void 0
                  : _.some(function (I) {
                      return l(N, I);
                    });
              },
              B = !1,
              O = null;
            (O = x.pop());

          )
            if (O.nodeType !== 1 || !y(O)) {
              for (var M = O.childNodes, K = M.length - 1; K >= 0; K--)
                x.push(M[K]);
              if (O === b) {
                if (O.nodeType === 3) {
                  O.splitText(R);
                  var X = O.nextSibling;
                  F.push({
                    $node: X,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.head,
                  });
                }
                B = !0;
              } else {
                if (O === S) {
                  O.nodeType === 3 &&
                    ((X = O).splitText(E),
                    F.push({
                      $node: X,
                      type: a.SelectedNodeType.text,
                      splitType: a.SplitType.tail,
                    }));
                  break;
                }
                B &&
                  O.nodeType === 3 &&
                  F.push({
                    $node: O,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.none,
                  });
              }
            }
          return F;
        };
        var d = function (p, m) {
            var v = Array.isArray(m) ? m : [m];
            return (
              (v =
                v.length === 0
                  ? [f.getDefaultOptions().style.className]
                  : v).forEach(function (_) {
                c.addClass(p, _);
              }),
              p
            );
          },
          h = function (p) {
            return !p || !p.textContent;
          };
        (n.wrapHighlight = function (p, m, v, _) {
          var b = p.$node.parentNode,
            S = p.$node.previousSibling,
            R = p.$node.nextSibling;
          return c.isHighlightWrapNode(b)
            ? !c.isHighlightWrapNode(b) || (h(S) && h(R))
              ? (function (E, x, F) {
                  var y = E.$node.parentNode,
                    B = y;
                  c.removeAllClass(B), d(B, F);
                  var O = y.dataset,
                    M = O[f.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (O[f.CAMEL_DATASET_IDENTIFIER] = x.id),
                    (O[f.CAMEL_DATASET_IDENTIFIER_EXTRA] = O[
                      f.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? M + f.ID_DIVISION + O[f.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : M),
                    B
                  );
                })(p, m, v)
              : (function (E, x, F, y) {
                  var B = document.createElement(y),
                    O = E.$node.parentNode,
                    M = E.$node.previousSibling,
                    K = E.$node.nextSibling,
                    X = document.createDocumentFragment(),
                    N = O.dataset[f.CAMEL_DATASET_IDENTIFIER],
                    I = O.dataset[f.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    T = I ? N + f.ID_DIVISION + I : N;
                  B.setAttribute("data-" + f.DATASET_IDENTIFIER, x.id),
                    B.setAttribute("data-" + f.DATASET_IDENTIFIER_EXTRA, T),
                    B.appendChild(E.$node.cloneNode(!1));
                  var w,
                    D = !1,
                    L = !1;
                  M &&
                    (((C = O.cloneNode(!1)).textContent = M.textContent),
                    X.appendChild(C),
                    (D = !0));
                  var C,
                    A = [];
                  return (
                    Array.isArray(F) ? A.push.apply(A, s(F)) : A.push(F),
                    d(B, u.unique(A)),
                    X.appendChild(B),
                    K &&
                      (((C = O.cloneNode(!1)).textContent = K.textContent),
                      X.appendChild(C),
                      (L = !0)),
                    (w =
                      D && L
                        ? a.SplitType.both
                        : D
                        ? a.SplitType.head
                        : L
                        ? a.SplitType.tail
                        : a.SplitType.none),
                    B.setAttribute("data-" + f.DATASET_SPLIT_TYPE, w),
                    O.parentNode.replaceChild(X, O),
                    B
                  );
                })(p, m, v, _)
            : (function (E, x, F, y) {
                var B = document.createElement(y);
                return (
                  d(B, F),
                  B.appendChild(E.$node.cloneNode(!1)),
                  E.$node.parentNode.replaceChild(B, E.$node),
                  B.setAttribute("data-" + f.DATASET_IDENTIFIER, x.id),
                  B.setAttribute("data-" + f.DATASET_SPLIT_TYPE, E.splitType),
                  B.setAttribute("data-" + f.DATASET_IDENTIFIER_EXTRA, ""),
                  B
                );
              })(p, m, v, _);
        }),
          (n.normalizeSiblingText = function (p, m) {
            if ((m === void 0 && (m = !0), p && p.nodeType === 3)) {
              var v = m ? p.nextSibling : p.previousSibling;
              if (v.nodeType === 3) {
                var _ = v.nodeValue;
                (p.nodeValue = m ? p.nodeValue + _ : _ + p.nodeValue),
                  v.parentNode.removeChild(v);
              }
            }
          });
      },
      function (o, n, r) {
        var i =
          (this && this.__values) ||
          function (s) {
            var a = typeof Symbol == "function" && Symbol.iterator,
              c = a && s[a],
              f = 0;
            if (c) return c.call(s);
            if (s && typeof s.length == "number")
              return {
                next: function () {
                  return (
                    s && f >= s.length && (s = void 0),
                    { value: s && s[f++], done: !s }
                  );
                },
              };
            throw new TypeError(
              a ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          };
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.unique = void 0),
          (n.unique = function (s) {
            var a,
              c,
              f = [];
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
                if (a) throw a.error;
              }
            }
            return f;
          });
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.initDefaultStylesheet = void 0);
        var i = r(0);
        n.initDefaultStylesheet = function () {
          var s = i.STYLESHEET_ID,
            a = document.getElementById(s);
          if (!a) {
            var c = document.createTextNode(i.getStylesheet());
            ((a = document.createElement("style")).id = s),
              a.appendChild(c),
              document.head.appendChild(a);
          }
          return a;
        };
      },
    ]).default;
  });
})(Gr);
var da = Gr.exports;
const Xr = /* @__PURE__ */ tt(da),
  We = new Xr({
    style: {
      className: _s,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  In = new Xr({
    style: {
      className: Ss,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Zr = (e, t) =>
    t.filter((o) => {
      var n;
      return ((n = o.$node.nodeValue) == null ? void 0 : n.trim()) !== "";
    }),
  Jr = (e, t, o) => {
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
We.hooks.Render.SelectedNodes.tap(Zr);
We.hooks.Serialize.Restore.tap(Jr);
In.hooks.Render.SelectedNodes.tap(Zr);
In.hooks.Serialize.Restore.tap(Jr);
We.on("selection:hover", ({ id: e }) => {
  We.addClass(cr, e);
}).on("selection:hover-out", ({ id: e }) => {
  We.removeClass(cr, e);
});
const pa = (e) => {
    var t, o;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((o = e.meta) == null ? void 0 : o.highlight)
      : null;
  },
  ha = (e) => {
    const t = pa(e);
    t && (We.remove(t.id), In.remove(t.id));
  },
  Qr = () => {
    var o, n;
    const e = eo(),
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
  eo = () => {
    var t;
    return (t = window.location.hash
      .split("#")
      .find((o) => o.startsWith("!"))) == null
      ? void 0
      : t.split("/");
  },
  ga = () => {
    const e = le((u) =>
        u.selectedConversationId
          ? u.conversations[u.selectedConversationId]
          : null,
      ),
      t = le((u) => u.docsAppRendered),
      o = le((u) => u.newConversation),
      n = Ae(),
      [r, i] = ge(null),
      [s, a] = ge(null);
    Re(() => {
      o && (i(null), a(null));
    }, [o]);
    const c = Ke(() => {
      console.log("resetHighlights"), r && ha(r), a(null), i(null);
    }, [r]);
    return (
      Re(() => {
        !e ||
          !t ||
          (e.meta.resource_type &&
            e.meta.uniqueId &&
            (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`));
      }, [e, t, n]),
      {
        getHighlightedSelectionData: () => r,
        pos: s,
        onSelectionEnd: (u) => {
          const { end: l, start: d } = u.detail.selectionRange,
            h = document.getSelection();
          if (!h || !h.rangeCount) return c(), null;
          const m = h.getRangeAt(0).toString(),
            v = Qr(),
            _ = v == null ? void 0 : v.innerText;
          if (!m || !_) return;
          const b = v.querySelectorAll(".line-numbers-rows > span"),
            S = m.split(`
`),
            R = Math.max(d.y, l.y),
            E = Array.from(b).findIndex((O) => {
              const { height: M, y: K } = O.getBoundingClientRect();
              return R >= K && R <= K + M;
            }),
            x = b[E],
            F = E - S.length + 1;
          console.log("start and end lines found", F, E);
          const y = eo();
          if (!y || y.length < 3) {
            console.error("Unable to find model parts", y);
            return;
          }
          console.log("model parts found", y);
          const B = {
            meta: {
              filePath: "",
              // setting to empty string here and will be updated in conversationReducer when newConversation is set
              highlight: m,
              uniqueId: y[2],
              resource_type: y[1],
              range: {
                end: { line: E, character: 0 },
                start: { line: F, character: 0 },
              },
            },
          };
          n(An()),
            a({
              x: x.offsetLeft,
              y: x.offsetTop + x.offsetHeight / 2,
              element: v,
            }),
            i(B);
        },
      }
    );
  },
  va = ({ conversationGroup: e, codeSection: t }) => {
    const o = le((a) => a.selectedConversationId),
      n = Ae(),
      r = Te(null),
      i = () => {
        n(On(e.conversation_group_id));
      },
      s = lt(() => {
        if (!t) return;
        let a = 0,
          c = 0;
        for (let f = e.meta.range.start.line; f <= e.meta.range.end.line; f++) {
          const u = t.querySelector(
            `.line-numbers-rows > span:nth-child(${f + 1})`,
          );
          u &&
            (f === e.meta.range.start.line && (a = u.offsetTop),
            f === e.meta.range.end.line && (c = u.offsetTop + u.offsetHeight));
        }
        return { top: a, bottom: c };
      }, [t, e.meta.range.end.line, e.meta.range.start.line]);
    return (
      Re(() => {
        var a;
        o &&
          ((a = r.current) == null ||
            a.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [o]),
      !s || !(t != null && t.parentElement)
        ? null
        : Pr(
            /* @__PURE__ */ P.jsx("div", {
              ref: r,
              className: `altimate-highlighter ${
                o === e.conversation_group_id ? "active" : ""
              }`,
              style: { top: s.top + 15, height: s.bottom - s.top },
              onClick: i,
            }),
            t.parentElement,
          )
    );
  },
  ma = va,
  ya = () => {
    const e = le((i) => Object.values(i.conversations || {})),
      t = le((i) => i.codeblockLoaded),
      o = le((i) => i.currentPage),
      n =
        e == null
          ? void 0
          : e.filter(
              (i) =>
                i.meta.resource_type === o.resourceType &&
                i.meta.uniqueId === o.name,
            );
    if (!(n != null && n.length) || !t) return null;
    const r = Qr();
    return /* @__PURE__ */ P.jsx(P.Fragment, {
      children: n.map((i) =>
        /* @__PURE__ */ P.jsx(
          ma,
          {
            codeSection: r,
            conversationGroup: i,
          },
          i.conversation_group_id,
        ),
      ),
    });
  },
  Ea = ya,
  ba = "_dbtDocs_1yt0b_1",
  _a = "_conversationRightPanelCloseButton_1yt0b_14",
  Sa = "_conversationRightPanel_1yt0b_14",
  Ca = "_newConversationForm_1yt0b_46",
  Ta = "_highlightText_1yt0b_60",
  Oa = "_conversationInputForm_1yt0b_81",
  Ra = "_conversationGroup_1yt0b_107",
  Aa = "_replyForm_1yt0b_139",
  Da = "_resolveButton_1yt0b_165",
  Fe = {
    dbtDocs: ba,
    conversationRightPanelCloseButton: _a,
    conversationRightPanel: Sa,
    newConversationForm: Ca,
    highlightText: Ta,
    conversationInputForm: Oa,
    conversationGroup: Ra,
    replyForm: Aa,
    resolveButton: Da,
  },
  Ia = "_profileImage_11vaf_1",
  wa = {
    profileImage: Ia,
  },
  xa = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ P.jsx("div", {
      className: wa.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  to = xa;
function Na(e) {
  if (Array.isArray(e)) {
    for (var t = 0, o = new Array(e.length); t < e.length; t++) o[t] = e[t];
    return o;
  }
}
function ja(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function Pa() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function xt(e) {
  return Na(e) || ja(e) || Pa();
}
function Oe() {
  return (
    (Oe =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var o = arguments[t];
          for (var n in o)
            Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
        }
        return e;
      }),
    Oe.apply(this, arguments)
  );
}
function Fa(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lr(e, t) {
  for (var o = 0; o < t.length; o++) {
    var n = t[o];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function Ma(e, t, o) {
  return t && lr(e.prototype, t), o && lr(e, o), e;
}
function te(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function gn(e, t) {
  return (
    (gn =
      Object.setPrototypeOf ||
      function (n, r) {
        return (n.__proto__ = r), n;
      }),
    gn(e, t)
  );
}
function $a(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && gn(e, t);
}
function Ye(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (Ye = function (o) {
          return typeof o;
        })
      : (Ye = function (o) {
          return o &&
            typeof Symbol == "function" &&
            o.constructor === Symbol &&
            o !== Symbol.prototype
            ? "symbol"
            : typeof o;
        }),
    Ye(e)
  );
}
function Tt(e) {
  return (
    typeof Symbol == "function" && Ye(Symbol.iterator) === "symbol"
      ? (Tt = function (o) {
          return Ye(o);
        })
      : (Tt = function (o) {
          return o &&
            typeof Symbol == "function" &&
            o.constructor === Symbol &&
            o !== Symbol.prototype
            ? "symbol"
            : Ye(o);
        }),
    Tt(e)
  );
}
function ka(e, t) {
  return t && (Tt(t) === "object" || typeof t == "function") ? t : te(e);
}
function Nt(e) {
  return (
    (Nt = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        }),
    Nt(e)
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
var La = function (e, t, o, n, r, i, s, a) {
    if (process.env.NODE_ENV !== "production" && t === void 0)
      throw new Error("invariant requires an error message argument");
    if (!e) {
      var c;
      if (t === void 0)
        c = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var f = [o, n, r, i, s, a],
          u = 0;
        (c = new Error(
          t.replace(/%s/g, function () {
            return f[u++];
          }),
        )),
          (c.name = "Invariant Violation");
      }
      throw ((c.framesToPop = 1), c);
    }
  },
  Ba = La;
const Je = /* @__PURE__ */ tt(Ba);
function Ha(e) {
  if (Array.isArray(e)) return e;
}
function Ua(e, t) {
  var o = [],
    n = !0,
    r = !1,
    i = void 0;
  try {
    for (
      var s = e[Symbol.iterator](), a;
      !(n = (a = s.next()).done) && (o.push(a.value), !(t && o.length === t));
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
function za() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function jt(e, t) {
  return Ha(e) || Ua(e, t) || za();
}
function Va(e, t) {
  if (e == null) return {};
  var o = {},
    n = Object.keys(e),
    r,
    i;
  for (i = 0; i < n.length; i++)
    (r = n[i]), !(t.indexOf(r) >= 0) && (o[r] = e[r]);
  return o;
}
function qa(e, t) {
  if (e == null) return {};
  var o = Va(e, t),
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
function Wa(e, t) {
  if (pt(e) != "object" || !e) return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var n = o.call(e, t || "default");
    if (pt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ya(e) {
  var t = Wa(e, "string");
  return pt(t) == "symbol" ? t : t + "";
}
function ht(e, t, o) {
  return (
    (t = Ya(t)),
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
function vn(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
  return n;
}
function Ka(e) {
  if (Array.isArray(e)) return vn(e);
}
function Ga(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function Xa(e, t) {
  if (e) {
    if (typeof e == "string") return vn(e, t);
    var o = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (o === "Object" && e.constructor && (o = e.constructor.name),
      o === "Map" || o === "Set")
    )
      return Array.from(e);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return vn(e, t);
  }
}
function Za() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xe(e) {
  return Ka(e) || Ga(e) || Xa(e) || Za();
}
var rt = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  no = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function ro(e, t) {
  var o = Object.assign({}, e);
  return (
    Ot(e) &&
      Ot(t) &&
      rt(t).forEach(function (n) {
        Ot(t[n])
          ? n in e
            ? (o[n] = ro(e[n], t[n]))
            : Object.assign(o, ht({}, n, t[n]))
          : Object.assign(o, ht({}, n, t[n]));
      }),
    o
  );
}
var mn = function (t) {
    for (
      var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1;
      r < o;
      r++
    )
      n[r - 1] = arguments[r];
    return n.reduce(function (i, s) {
      return ro(i, s);
    }, t);
  },
  Ja = function (t, o) {
    var n = Object.assign({}, t);
    if (o) for (var r = 0; r < o.length; r++) delete n[o[r]];
    return n;
  },
  Ot = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  Qa = function (t) {
    return (t || []).filter(Boolean);
  },
  wn = function (t) {
    return t[0] === "&";
  },
  eu = function (t) {
    return !wn(t);
  },
  fr = function (t) {
    return t.replace(/-(\w)/g, function (o, n) {
      return n.toUpperCase();
    });
  },
  tu = function (t) {
    for (
      var o =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        n = rt(t),
        r = {},
        i = 0,
        s = n.length;
      i < s;
      i += 1
    ) {
      var a = n[i],
        c =
          Object.prototype.toString.call(t[a]) !== "[object Object]" || // style defs
          a[0] === ":" || // pseudo selectors
          a[0] === "@" || // @media / @keyframes / @supports / @font-face
          o.indexOf(a) >= 0;
      c && (r[a] = t[a]);
    }
    return r;
  },
  oo = function (t, o) {
    for (
      var n = o.map(fr), r = rt(t), i = {}, s = 0, a = r.length;
      s < a;
      s += 1
    ) {
      var c = r[s];
      (o.indexOf(c) >= 0 || n.indexOf(fr(c)) >= 0) && (i[c] = t[c]);
    }
    return i;
  },
  nu = function e(t, o) {
    for (
      var n = mn.apply(void 0, [{}, Ja(t, o)].concat(xe(no(oo(t, o))))),
        r = rt(n).filter(wn),
        i = 0,
        s = r.length;
      i < s;
      i += 1
    ) {
      var a = r[i],
        c = e(n[a], o);
      o.indexOf(a) >= 0 ? (delete n[a], (n = mn({}, n, c))) : (n[a] = c);
    }
    return n;
  };
function dr(e, t) {
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
function pr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? dr(Object(o), !0).forEach(function (n) {
          ht(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : dr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var ru = ["animationName"],
  ou = function (t) {
    var o = t.style,
      n = t.className;
    return pr(
      pr(
        {},
        o
          ? {
              style: tu(o, ru),
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
const io = ou;
var so = /* @__PURE__ */ Qe(io);
so.Provider;
var ao = function (t) {
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
  iu = {},
  su = function (t) {
    return function (o, n) {
      var r = n || iu;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var i;
      t.memoize.has(r)
        ? (i = t.memoize.get(r))
        : ((i = {}), t.memoize.set(r, i));
      var s = ao(o).join(" ");
      return s in i ? i[s] : (i[s] = t(o || [], n));
    };
  };
function hr(e, t) {
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
function Ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? hr(Object(o), !0).forEach(function (n) {
          ht(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : hr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var au = function (t) {
    var o = t && rt(t)[0];
    return o && o.split("__")[0].split("--")[0];
  },
  uu = function (t, o, n) {
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
function uo(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : io,
    i = o || au(n) || (t == null ? void 0 : t.className),
    s =
      typeof t == "function"
        ? t
        : su(function (l, d) {
            var h = ao(l);
            Je(
              Array.isArray(h),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              Je(
                !d || Ot(d),
                "Optional second parameter must be a plain object.",
              );
            var p = h.filter(wn),
              m = h.filter(eu),
              v =
                m.length > 0
                  ? function (S) {
                      return no(oo(S, m));
                    }
                  : function (S) {
                      return [S];
                    },
              _ = function () {
                var R =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return v(nu(R, p));
              },
              b = uu(i, m, p);
            return uo(
              Ve(
                Ve(
                  Ve(
                    {},
                    (t || d) && {
                      style: mn.apply(void 0, [{}].concat(xe(_(d)), xe(_(t)))),
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
    a = Ve(
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
          xe(a.className ? a.className.split(" ") : []),
          xe(i ? i.split(" ") : []),
        ),
      ),
    ),
    f = n
      ? Qa(
          c.map(function (l) {
            return n[l];
          }),
        )
      : c,
    u = r(
      Ve(
        Ve({}, a),
        f.length > 0
          ? {
              className: f.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(s, u), s;
}
function gr(e, t) {
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
function at(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? gr(Object(o), !0).forEach(function (n) {
          ht(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : gr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var cu = function () {
    for (var t = arguments.length, o = new Array(t), n = 0; n < t; n++)
      o[n] = arguments[n];
    return o.reduce(function (r, i) {
      return at(
        at(at({}, r), typeof i == "function" ? i : {}),
        {},
        {
          style: at(at({}, r.style), typeof i == "function" ? i.style : i),
        },
      );
    }, {});
  },
  xn = function (t, o, n) {
    var r = o.style,
      i = o.className,
      s = o.classNames,
      a = et(so),
      c = lt(
        function () {
          return uo(
            {
              style: r,
              className: i,
              classNames: s,
            },
            a,
          );
        },
        [r, i, s, a],
      );
    return c(n, t);
  },
  yn = { exports: {} },
  _t = { exports: {} },
  se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vr;
function lu() {
  if (vr) return se;
  vr = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    t = e ? Symbol.for("react.element") : 60103,
    o = e ? Symbol.for("react.portal") : 60106,
    n = e ? Symbol.for("react.fragment") : 60107,
    r = e ? Symbol.for("react.strict_mode") : 60108,
    i = e ? Symbol.for("react.profiler") : 60114,
    s = e ? Symbol.for("react.provider") : 60109,
    a = e ? Symbol.for("react.context") : 60110,
    c = e ? Symbol.for("react.async_mode") : 60111,
    f = e ? Symbol.for("react.concurrent_mode") : 60111,
    u = e ? Symbol.for("react.forward_ref") : 60112,
    l = e ? Symbol.for("react.suspense") : 60113,
    d = e ? Symbol.for("react.suspense_list") : 60120,
    h = e ? Symbol.for("react.memo") : 60115,
    p = e ? Symbol.for("react.lazy") : 60116,
    m = e ? Symbol.for("react.block") : 60121,
    v = e ? Symbol.for("react.fundamental") : 60117,
    _ = e ? Symbol.for("react.responder") : 60118,
    b = e ? Symbol.for("react.scope") : 60119;
  function S(E) {
    if (typeof E == "object" && E !== null) {
      var x = E.$$typeof;
      switch (x) {
        case t:
          switch (((E = E.type), E)) {
            case c:
            case f:
            case n:
            case i:
            case r:
            case l:
              return E;
            default:
              switch (((E = E && E.$$typeof), E)) {
                case a:
                case u:
                case p:
                case h:
                case s:
                  return E;
                default:
                  return x;
              }
          }
        case o:
          return x;
      }
    }
  }
  function R(E) {
    return S(E) === f;
  }
  return (
    (se.AsyncMode = c),
    (se.ConcurrentMode = f),
    (se.ContextConsumer = a),
    (se.ContextProvider = s),
    (se.Element = t),
    (se.ForwardRef = u),
    (se.Fragment = n),
    (se.Lazy = p),
    (se.Memo = h),
    (se.Portal = o),
    (se.Profiler = i),
    (se.StrictMode = r),
    (se.Suspense = l),
    (se.isAsyncMode = function (E) {
      return R(E) || S(E) === c;
    }),
    (se.isConcurrentMode = R),
    (se.isContextConsumer = function (E) {
      return S(E) === a;
    }),
    (se.isContextProvider = function (E) {
      return S(E) === s;
    }),
    (se.isElement = function (E) {
      return typeof E == "object" && E !== null && E.$$typeof === t;
    }),
    (se.isForwardRef = function (E) {
      return S(E) === u;
    }),
    (se.isFragment = function (E) {
      return S(E) === n;
    }),
    (se.isLazy = function (E) {
      return S(E) === p;
    }),
    (se.isMemo = function (E) {
      return S(E) === h;
    }),
    (se.isPortal = function (E) {
      return S(E) === o;
    }),
    (se.isProfiler = function (E) {
      return S(E) === i;
    }),
    (se.isStrictMode = function (E) {
      return S(E) === r;
    }),
    (se.isSuspense = function (E) {
      return S(E) === l;
    }),
    (se.isValidElementType = function (E) {
      return (
        typeof E == "string" ||
        typeof E == "function" ||
        E === n ||
        E === f ||
        E === i ||
        E === r ||
        E === l ||
        E === d ||
        (typeof E == "object" &&
          E !== null &&
          (E.$$typeof === p ||
            E.$$typeof === h ||
            E.$$typeof === s ||
            E.$$typeof === a ||
            E.$$typeof === u ||
            E.$$typeof === v ||
            E.$$typeof === _ ||
            E.$$typeof === b ||
            E.$$typeof === m))
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
var mr;
function fu() {
  return (
    mr ||
      ((mr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var e = typeof Symbol == "function" && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            o = e ? Symbol.for("react.portal") : 60106,
            n = e ? Symbol.for("react.fragment") : 60107,
            r = e ? Symbol.for("react.strict_mode") : 60108,
            i = e ? Symbol.for("react.profiler") : 60114,
            s = e ? Symbol.for("react.provider") : 60109,
            a = e ? Symbol.for("react.context") : 60110,
            c = e ? Symbol.for("react.async_mode") : 60111,
            f = e ? Symbol.for("react.concurrent_mode") : 60111,
            u = e ? Symbol.for("react.forward_ref") : 60112,
            l = e ? Symbol.for("react.suspense") : 60113,
            d = e ? Symbol.for("react.suspense_list") : 60120,
            h = e ? Symbol.for("react.memo") : 60115,
            p = e ? Symbol.for("react.lazy") : 60116,
            m = e ? Symbol.for("react.block") : 60121,
            v = e ? Symbol.for("react.fundamental") : 60117,
            _ = e ? Symbol.for("react.responder") : 60118,
            b = e ? Symbol.for("react.scope") : 60119;
          function S(k) {
            return (
              typeof k == "string" ||
              typeof k == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              k === n ||
              k === f ||
              k === i ||
              k === r ||
              k === l ||
              k === d ||
              (typeof k == "object" &&
                k !== null &&
                (k.$$typeof === p ||
                  k.$$typeof === h ||
                  k.$$typeof === s ||
                  k.$$typeof === a ||
                  k.$$typeof === u ||
                  k.$$typeof === v ||
                  k.$$typeof === _ ||
                  k.$$typeof === b ||
                  k.$$typeof === m))
            );
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
          var E = c,
            x = f,
            F = a,
            y = s,
            B = t,
            O = u,
            M = n,
            K = p,
            X = h,
            N = o,
            I = i,
            T = r,
            w = l,
            D = !1;
          function L(k) {
            return (
              D ||
                ((D = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              C(k) || R(k) === c
            );
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
          function G(k) {
            return R(k) === n;
          }
          function W(k) {
            return R(k) === p;
          }
          function Y(k) {
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
          (ae.AsyncMode = E),
            (ae.ConcurrentMode = x),
            (ae.ContextConsumer = F),
            (ae.ContextProvider = y),
            (ae.Element = B),
            (ae.ForwardRef = O),
            (ae.Fragment = M),
            (ae.Lazy = K),
            (ae.Memo = X),
            (ae.Portal = N),
            (ae.Profiler = I),
            (ae.StrictMode = T),
            (ae.Suspense = w),
            (ae.isAsyncMode = L),
            (ae.isConcurrentMode = C),
            (ae.isContextConsumer = A),
            (ae.isContextProvider = U),
            (ae.isElement = z),
            (ae.isForwardRef = V),
            (ae.isFragment = G),
            (ae.isLazy = W),
            (ae.isMemo = Y),
            (ae.isPortal = J),
            (ae.isProfiler = Q),
            (ae.isStrictMode = q),
            (ae.isSuspense = ce),
            (ae.isValidElementType = S),
            (ae.typeOf = R);
        })()),
    ae
  );
}
var yr;
function co() {
  return (
    yr ||
      ((yr = 1),
      process.env.NODE_ENV === "production"
        ? (_t.exports = lu())
        : (_t.exports = fu())),
    _t.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var en, Er;
function du() {
  if (Er) return en;
  Er = 1;
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
      for (var s = {}, a = 0; a < 10; a++) s["_" + String.fromCharCode(a)] = a;
      var c = Object.getOwnPropertyNames(s).map(function (u) {
        return s[u];
      });
      if (c.join("") !== "0123456789") return !1;
      var f = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function (u) {
          f[u] = u;
        }),
        Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst"
      );
    } catch {
      return !1;
    }
  }
  return (
    (en = r()
      ? Object.assign
      : function (i, s) {
          for (var a, c = n(i), f, u = 1; u < arguments.length; u++) {
            a = Object(arguments[u]);
            for (var l in a) t.call(a, l) && (c[l] = a[l]);
            if (e) {
              f = e(a);
              for (var d = 0; d < f.length; d++)
                o.call(a, f[d]) && (c[f[d]] = a[f[d]]);
            }
          }
          return c;
        }),
    en
  );
}
var tn, br;
function Nn() {
  if (br) return tn;
  br = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (tn = e), tn;
}
var nn, _r;
function lo() {
  return (
    _r ||
      ((_r = 1), (nn = Function.call.bind(Object.prototype.hasOwnProperty))),
    nn
  );
}
var rn, Sr;
function pu() {
  if (Sr) return rn;
  Sr = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = Nn(),
      o = {},
      n = lo();
    e = function (i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {}
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
                (c || "React class") +
                  ": " +
                  a +
                  " type `" +
                  u +
                  "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                  typeof i[u] +
                  "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
              );
              throw ((d.name = "Invariant Violation"), d);
            }
            l = i[u](s, u, c, a, null, t);
          } catch (p) {
            l = p;
          }
          if (
            (l &&
              !(l instanceof Error) &&
              e(
                (c || "React class") +
                  ": type specification of " +
                  a +
                  " `" +
                  u +
                  "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
                  typeof l +
                  ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
              ),
            l instanceof Error && !(l.message in o))
          ) {
            o[l.message] = !0;
            var h = f ? f() : "";
            e("Failed " + a + " type: " + l.message + (h ?? ""));
          }
        }
    }
  }
  return (
    (r.resetWarningCache = function () {
      process.env.NODE_ENV !== "production" && (o = {});
    }),
    (rn = r),
    rn
  );
}
var on, Cr;
function hu() {
  if (Cr) return on;
  Cr = 1;
  var e = co(),
    t = du(),
    o = Nn(),
    n = lo(),
    r = pu(),
    i = function () {};
  process.env.NODE_ENV !== "production" &&
    (i = function (a) {
      var c = "Warning: " + a;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {}
    });
  function s() {
    return null;
  }
  return (
    (on = function (a, c) {
      var f = typeof Symbol == "function" && Symbol.iterator,
        u = "@@iterator";
      function l(C) {
        var A = C && ((f && C[f]) || C[u]);
        if (typeof A == "function") return A;
      }
      var d = "<<anonymous>>",
        h = {
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
          elementType: E(),
          instanceOf: x,
          node: O(),
          objectOf: y,
          oneOf: F,
          oneOfType: B,
          shape: K,
          exact: X,
        };
      function p(C, A) {
        return C === A ? C !== 0 || 1 / C === 1 / A : C !== C && A !== A;
      }
      function m(C, A) {
        (this.message = C),
          (this.data = A && typeof A == "object" ? A : {}),
          (this.stack = "");
      }
      m.prototype = Error.prototype;
      function v(C) {
        if (process.env.NODE_ENV !== "production")
          var A = {},
            U = 0;
        function z(G, W, Y, J, Q, q, ce) {
          if (((J = J || d), (q = q || Y), ce !== o)) {
            if (c) {
              var k = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types",
              );
              throw ((k.name = "Invariant Violation"), k);
            } else if (
              process.env.NODE_ENV !== "production" &&
              typeof console < "u"
            ) {
              var he = J + ":" + Y;
              !A[he] && // Avoid spamming the console because they are often not actionable except for lib authors
                U < 3 &&
                (i(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    q +
                    "` prop on `" +
                    J +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (A[he] = !0),
                U++);
            }
          }
          return W[Y] == null
            ? G
              ? W[Y] === null
                ? new m(
                    "The " +
                      Q +
                      " `" +
                      q +
                      "` is marked as required " +
                      ("in `" + J + "`, but its value is `null`."),
                  )
                : new m(
                    "The " +
                      Q +
                      " `" +
                      q +
                      "` is marked as required in " +
                      ("`" + J + "`, but its value is `undefined`."),
                  )
              : null
            : C(W, Y, J, Q, q);
        }
        var V = z.bind(null, !1);
        return (V.isRequired = z.bind(null, !0)), V;
      }
      function _(C) {
        function A(U, z, V, G, W, Y) {
          var J = U[z],
            Q = T(J);
          if (Q !== C) {
            var q = w(J);
            return new m(
              "Invalid " +
                G +
                " `" +
                W +
                "` of type " +
                ("`" + q + "` supplied to `" + V + "`, expected ") +
                ("`" + C + "`."),
              { expectedType: C },
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
        function A(U, z, V, G, W) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                W +
                "` of component `" +
                V +
                "` has invalid PropType notation inside arrayOf.",
            );
          var Y = U[z];
          if (!Array.isArray(Y)) {
            var J = T(Y);
            return new m(
              "Invalid " +
                G +
                " `" +
                W +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected an array."),
            );
          }
          for (var Q = 0; Q < Y.length; Q++) {
            var q = C(Y, Q, V, G, W + "[" + Q + "]", o);
            if (q instanceof Error) return q;
          }
          return null;
        }
        return v(A);
      }
      function R() {
        function C(A, U, z, V, G) {
          var W = A[U];
          if (!a(W)) {
            var Y = T(W);
            return new m(
              "Invalid " +
                V +
                " `" +
                G +
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
      function E() {
        function C(A, U, z, V, G) {
          var W = A[U];
          if (!e.isValidElementType(W)) {
            var Y = T(W);
            return new m(
              "Invalid " +
                V +
                " `" +
                G +
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
      function x(C) {
        function A(U, z, V, G, W) {
          if (!(U[z] instanceof C)) {
            var Y = C.name || d,
              J = L(U[z]);
            return new m(
              "Invalid " +
                G +
                " `" +
                W +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected ") +
                ("instance of `" + Y + "`."),
            );
          }
          return null;
        }
        return v(A);
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
        function A(U, z, V, G, W) {
          for (var Y = U[z], J = 0; J < C.length; J++)
            if (p(Y, C[J])) return null;
          var Q = JSON.stringify(C, function (ce, k) {
            var he = w(k);
            return he === "symbol" ? String(k) : k;
          });
          return new m(
            "Invalid " +
              G +
              " `" +
              W +
              "` of value `" +
              String(Y) +
              "` " +
              ("supplied to `" + V + "`, expected one of " + Q + "."),
          );
        }
        return v(A);
      }
      function y(C) {
        function A(U, z, V, G, W) {
          if (typeof C != "function")
            return new m(
              "Property `" +
                W +
                "` of component `" +
                V +
                "` has invalid PropType notation inside objectOf.",
            );
          var Y = U[z],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                G +
                " `" +
                W +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected an object."),
            );
          for (var Q in Y)
            if (n(Y, Q)) {
              var q = C(Y, Q, V, G, W + "." + Q, o);
              if (q instanceof Error) return q;
            }
          return null;
        }
        return v(A);
      }
      function B(C) {
        if (!Array.isArray(C))
          return (
            process.env.NODE_ENV !== "production" &&
              i(
                "Invalid argument supplied to oneOfType, expected an instance of array.",
              ),
            s
          );
        for (var A = 0; A < C.length; A++) {
          var U = C[A];
          if (typeof U != "function")
            return (
              i(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                  D(U) +
                  " at index " +
                  A +
                  ".",
              ),
              s
            );
        }
        function z(V, G, W, Y, J) {
          for (var Q = [], q = 0; q < C.length; q++) {
            var ce = C[q],
              k = ce(V, G, W, Y, J, o);
            if (k == null) return null;
            k.data && n(k.data, "expectedType") && Q.push(k.data.expectedType);
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
        function C(A, U, z, V, G) {
          return N(A[U])
            ? null
            : new m(
                "Invalid " +
                  V +
                  " `" +
                  G +
                  "` supplied to " +
                  ("`" + z + "`, expected a ReactNode."),
              );
        }
        return v(C);
      }
      function M(C, A, U, z, V) {
        return new m(
          (C || "React class") +
            ": " +
            A +
            " type `" +
            U +
            "." +
            z +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            V +
            "`.",
        );
      }
      function K(C) {
        function A(U, z, V, G, W) {
          var Y = U[z],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                G +
                " `" +
                W +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          for (var Q in C) {
            var q = C[Q];
            if (typeof q != "function") return M(V, G, W, Q, w(q));
            var ce = q(Y, Q, V, G, W + "." + Q, o);
            if (ce) return ce;
          }
          return null;
        }
        return v(A);
      }
      function X(C) {
        function A(U, z, V, G, W) {
          var Y = U[z],
            J = T(Y);
          if (J !== "object")
            return new m(
              "Invalid " +
                G +
                " `" +
                W +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          var Q = t({}, U[z], C);
          for (var q in Q) {
            var ce = C[q];
            if (n(C, q) && typeof ce != "function") return M(V, G, W, q, w(ce));
            if (!ce)
              return new m(
                "Invalid " +
                  G +
                  " `" +
                  W +
                  "` key `" +
                  q +
                  "` supplied to `" +
                  V +
                  "`.\nBad object: " +
                  JSON.stringify(U[z], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(C), null, "  "),
              );
            var k = ce(Y, q, V, G, W + "." + q, o);
            if (k) return k;
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
            if (Array.isArray(C)) return C.every(N);
            if (C === null || a(C)) return !0;
            var A = l(C);
            if (A) {
              var U = A.call(C),
                z;
              if (A !== C.entries) {
                for (; !(z = U.next()).done; ) if (!N(z.value)) return !1;
              } else
                for (; !(z = U.next()).done; ) {
                  var V = z.value;
                  if (V && !N(V[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function I(C, A) {
        return C === "symbol"
          ? !0
          : A
          ? A["@@toStringTag"] === "Symbol" ||
            (typeof Symbol == "function" && A instanceof Symbol)
          : !1;
      }
      function T(C) {
        var A = typeof C;
        return Array.isArray(C)
          ? "array"
          : C instanceof RegExp
          ? "object"
          : I(A, C)
          ? "symbol"
          : A;
      }
      function w(C) {
        if (typeof C > "u" || C === null) return "" + C;
        var A = T(C);
        if (A === "object") {
          if (C instanceof Date) return "date";
          if (C instanceof RegExp) return "regexp";
        }
        return A;
      }
      function D(C) {
        var A = w(C);
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
      return (
        (h.checkPropTypes = r),
        (h.resetWarningCache = r.resetWarningCache),
        (h.PropTypes = h),
        h
      );
    }),
    on
  );
}
var sn, Tr;
function gu() {
  if (Tr) return sn;
  Tr = 1;
  var e = Nn();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (sn = function () {
      function n(s, a, c, f, u, l) {
        if (l !== e) {
          var d = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((d.name = "Invariant Violation"), d);
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
  var vu = co(),
    mu = !0;
  yn.exports = hu()(vu.isElement, mu);
} else yn.exports = gu()();
var yu = yn.exports;
const $ = /* @__PURE__ */ tt(yu);
var Rt = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  Ie = {
    id: "__id__",
    display: "__display__",
  },
  Or = function (t, o) {
    Je(
      o === "id" || o === "display",
      'Second arg must be either "id" or "display", got: "'.concat(o, '"'),
    );
    var n = t.indexOf(Ie.display),
      r = t.indexOf(Ie.id);
    return (
      n < 0 && (n = null),
      r < 0 && (r = null),
      Je(
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
  Eu = function (t) {
    var o = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (n) {
          var r = o.exec(n.toString()),
            i = jt(r, 3),
            s = i[1],
            a = i[2];
          return (
            Je(
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
  fo = function (t) {
    var o = 0;
    return (
      t.indexOf("__id__") >= 0 && o++, t.indexOf("__display__") >= 0 && o++, o
    );
  },
  bu = function () {},
  gt = function (t, o, n) {
    for (
      var r =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : bu,
        i = Eu(
          o.map(function (E) {
            return E.regex;
          }),
        ),
        s = 2,
        a = o.map(function (E) {
          var x = E.markup,
            F = s;
          return (s += fo(x) + 1), F;
        }),
        c,
        f = 0,
        u = 0;
      (c = i.exec(t)) !== null;

    ) {
      var l = a.find(function (E) {
          return !!c[E];
        }),
        d = a.indexOf(l),
        h = o[d],
        p = h.markup,
        m = h.displayTransform,
        v = l + Or(p, "id"),
        _ = l + Or(p, "display"),
        b = c[v],
        S = m(b, c[_]),
        R = t.substring(f, c.index);
      r(R, f, u),
        (u += R.length),
        n(c[0], c.index, u, b, S, d, f),
        (u += S.length),
        (f = i.lastIndex);
    }
    f < t.length && r(t.substring(f), f, u);
  },
  Le = function (t, o) {
    var n = "";
    return (
      gt(
        t,
        o,
        function (r, i, s, a, c) {
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
      s = function (f, u, l) {
        i === void 0 && l + f.length >= n && (i = u + n - l);
      },
      a = function (f, u, l, d, h, p, m) {
        i === void 0 &&
          l + h.length > n &&
          (r === "NULL" ? (i = null) : (i = u + (r === "END" ? f.length : 0)));
      };
    return gt(t, o, a, s), i === void 0 ? t.length : i;
  },
  ct = function (t, o, n, r) {
    return t.substring(0, o) + r + t.substring(n);
  },
  _u = function (t, o, n, r) {
    var i = n.selectionStartBefore,
      s = n.selectionEndBefore,
      a = n.selectionEndAfter,
      c = Le(t, r),
      f = c.length - o.length;
    i === "undefined" && (i = a + f),
      s === "undefined" && (s = i),
      i === s && s === a && c.length === o.length && (i = i - 1);
    var u = o.slice(i, a),
      l = Math.min(i, a),
      d = s;
    i === a && (d = Math.max(s, i + f));
    var h = me(t, r, l, "START"),
      p = me(t, r, d, "END"),
      m = me(t, r, l, "NULL"),
      v = me(t, r, d, "NULL"),
      _ = m === null || v === null,
      b = ct(t, h, p, u);
    if (!_) {
      var S = Le(b, r);
      if (S !== o) {
        for (l = 0; o[l] === S[l]; ) l++;
        (u = o.slice(l, a)),
          (d = c.lastIndexOf(o.substring(a))),
          (h = me(t, r, l, "START")),
          (p = me(t, r, d, "END")),
          (b = ct(t, h, p, u));
      }
    }
    return b;
  },
  Rr = function (t, o, n) {
    var r = n,
      i = !1,
      s = function (c, f, u, l, d, h, p) {
        u <= n && u + d.length > n && ((r = u), (i = !0));
      };
    if ((gt(t, o, s), i)) return r;
  },
  ut = function (t, o) {
    var n = [];
    return (
      gt(t, o, function (r, i, s, a, c, f, u) {
        n.push({
          id: a,
          display: c,
          childIndex: f,
          index: i,
          plainTextIndex: s,
        });
      }),
      n
    );
  },
  po = function (t, o) {
    return "".concat(t, "-").concat(o);
  },
  St = function (t) {
    return Object.values(t).reduce(function (o, n) {
      var r = n.results;
      return o + r.length;
    }, 0);
  },
  Su = function (t, o) {
    var n = ut(t, o),
      r = n[n.length - 1];
    return r ? r.plainTextIndex + r.display.length : 0;
  },
  Cu = function (t) {
    var o = Rt(t),
      n = t[t.indexOf(Ie.display) + Ie.display.length],
      r = t[t.indexOf(Ie.id) + Ie.id.length];
    return new RegExp(
      o
        .replace(Ie.display, "([^".concat(Rt(n || ""), "]+?)"))
        .replace(Ie.id, "([^".concat(Rt(r || ""), "]+?)")),
    );
  },
  je = function (t) {
    return Ge.toArray(t).map(function (o) {
      var n = o.props,
        r = n.markup,
        i = n.regex,
        s = n.displayTransform;
      return {
        markup: r,
        regex: i ? Tu(i, r) : Cu(r),
        displayTransform:
          s ||
          function (a, c) {
            return c || a;
          },
      };
    });
  },
  Tu = function (t, o) {
    var n = new RegExp(t.toString() + "|").exec("").length - 1,
      r = fo(o);
    return (
      Je(
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
  Ou = function (t, o, n) {
    return t.replace(Ie.id, o).replace(Ie.display, n);
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
  Au = function (t) {
    var o = t;
    return (
      Ru.forEach(function (n) {
        o = o.replace(n.letters, n.base);
      }),
      o
    );
  },
  Ar = function (t) {
    return Au(t).toLowerCase();
  },
  ho = function (t, o, n) {
    return n ? Ar(t).indexOf(Ar(o)) : t.toLowerCase().indexOf(o.toLowerCase());
  },
  Du = function () {
    return !!document.documentMode;
  },
  En = function (t) {
    return typeof t == "number";
  },
  Iu = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  wu = function (t) {
    for (
      var o, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
      i < n;
      i++
    )
      r[i - 1] = arguments[i];
    var s = (o = []).concat.apply(o, r);
    return Object.keys(t).reduce(function (a, c) {
      return (
        t.hasOwnProperty(c) &&
          !s.includes(c) &&
          t[c] !== void 0 &&
          (a[c] = t[c]),
        a
      );
    }, {});
  },
  xu = ["style", "className", "classNames"];
function Dr(e, t) {
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
function Ir(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Dr(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : Dr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
function zt(e, t) {
  var o = function (r) {
    var i = function (c) {
        var f = c.style,
          u = c.className,
          l = c.classNames,
          d = qa(c, xu),
          h = t ? t(d) : void 0,
          p = xn(
            e,
            {
              style: f,
              className: u,
              classNames: l,
            },
            h,
          );
        return /* @__PURE__ */ oe.createElement(
          r,
          Oe({}, d, {
            style: p,
          }),
        );
      },
      s = r.displayName || r.name || "Component";
    return (
      (i.displayName = "defaultStyle(".concat(s, ")")),
      /* @__PURE__ */ oe.forwardRef(function (a, c) {
        return i(
          Ir(
            Ir({}, a),
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
var Nu = function (t, o) {
  return t.hasOwnProperty(o) ? t[o]++ : (t[o] = 0), o + "_" + t[o];
};
function go(e) {
  var t = e.selectionStart,
    o = e.selectionEnd,
    n = e.value,
    r = n === void 0 ? "" : n,
    i = e.onCaretPositionChange,
    s = e.containerRef,
    a = e.children;
  e.singleLine;
  var c = e.style,
    f = ge({
      left: void 0,
      top: void 0,
    }),
    u = jt(f, 2),
    l = u[0],
    d = u[1],
    h = ge(),
    p = jt(h, 2),
    m = p[0],
    v = p[1];
  Re(function () {
    _();
  });
  var _ = function () {
      if (m) {
        var N = m.offsetLeft,
          I = m.offsetTop;
        if (!(l.left === N && l.top === I)) {
          var T = {
            left: N,
            top: I,
          };
          d(T), i(T);
        }
      }
    },
    b = je(a),
    S;
  o === t && (S = me(r, b, t, "START"));
  var R = [],
    E = {},
    x = R,
    F = 0,
    y = function (N, I, T) {
      if (En(S) && S >= I && S <= I + N.length) {
        var w = S - I;
        x.push(O(N.substring(0, w), F)), (x = [O(N.substring(w), F)]);
      } else x.push(O(N, F));
      F++;
    },
    B = function (N, I, T, w, D, L, C) {
      var A = Nu(E, w);
      x.push(M(w, D, L, A));
    },
    O = function (N, I) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Oe({}, c("substring"), {
          key: I,
        }),
        N,
      );
    },
    M = function (N, I, T, w) {
      var D = {
          id: N,
          display: I,
          key: w,
        },
        L = Ge.toArray(a)[T];
      return /* @__PURE__ */ oe.cloneElement(L, D);
    },
    K = function (N) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Oe({}, c("caret"), {
          ref: v,
          key: "caret",
        }),
        N,
      );
    };
  return (
    gt(r, b, B, y),
    x.push(" "),
    x !== R && R.push(K(x)),
    /* @__PURE__ */ oe.createElement(
      "div",
      Oe({}, c, {
        ref: s,
      }),
      R,
    )
  );
}
go.propTypes = {
  selectionStart: $.number,
  selectionEnd: $.number,
  value: $.string.isRequired,
  onCaretPositionChange: $.func.isRequired,
  containerRef: $.oneOfType([
    $.func,
    $.shape({
      current: typeof Element > "u" ? $.any : $.instanceOf(Element),
    }),
  ]),
  children: $.oneOfType([$.element, $.arrayOf($.element)]).isRequired,
};
var ju = zt(
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
  Pu = ju(go);
function vo(e) {
  var t = e.id,
    o = e.focused,
    n = e.ignoreAccents,
    r = e.index,
    i = e.onClick,
    s = e.onMouseEnter,
    a = e.query,
    c = e.renderSuggestion,
    f = e.suggestion,
    u = e.style;
  e.className, e.classNames;
  var l = {
      onClick: i,
      onMouseEnter: s,
    },
    d = function () {
      var v = h(),
        _ = p(v);
      return c ? c(f, a, _, r, o) : _;
    },
    h = function () {
      if (typeof f == "string") return f;
      var v = f.id,
        _ = f.display;
      return v === void 0 || !_ ? v : _;
    },
    p = function (v) {
      var _ = ho(v, a, n);
      return _ === -1
        ? /* @__PURE__ */ oe.createElement("span", u("display"), v)
        : /* @__PURE__ */ oe.createElement(
            "span",
            u("display"),
            v.substring(0, _),
            /* @__PURE__ */ oe.createElement(
              "b",
              u("highlight"),
              v.substring(_, _ + a.length),
            ),
            v.substring(_ + a.length),
          );
    };
  return /* @__PURE__ */ oe.createElement(
    "li",
    Oe(
      {
        id: t,
        role: "option",
        "aria-selected": o,
      },
      l,
      u,
    ),
    d(),
  );
}
vo.propTypes = {
  id: $.string.isRequired,
  query: $.string.isRequired,
  index: $.number.isRequired,
  ignoreAccents: $.bool,
  suggestion: $.oneOfType([
    $.string,
    $.shape({
      id: $.oneOfType([$.string, $.number]).isRequired,
      display: $.string,
    }),
  ]).isRequired,
  renderSuggestion: $.func,
  focused: $.bool,
};
var Fu = zt(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  Mu = Fu(vo);
function $u(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = xn(ku, {
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
var ku = {};
function mo(e) {
  var t = e.id,
    o = e.suggestions,
    n = o === void 0 ? {} : o,
    r = e.a11ySuggestionsListLabel,
    i = e.focusIndex,
    s = e.position,
    a = e.left,
    c = e.right,
    f = e.top,
    u = e.scrollFocusedIntoView,
    l = e.isLoading,
    d = e.isOpened,
    h = e.onSelect,
    p =
      h === void 0
        ? function () {
            return null;
          }
        : h,
    m = e.ignoreAccents,
    v = e.containerRef,
    _ = e.children,
    b = e.style,
    S = e.customSuggestionsContainer,
    R = e.onMouseDown,
    E = e.onMouseEnter,
    x = ge(void 0),
    F = jt(x, 2),
    y = F[0],
    B = F[1];
  Re(
    function () {
      if (!(!y || y.offsetHeight >= y.scrollHeight || !u)) {
        var T = y.scrollTop,
          w = y.children[i].getBoundingClientRect(),
          D = w.top,
          L = w.bottom,
          C = y.getBoundingClientRect(),
          A = C.top;
        (D = D - A + T),
          (L = L - A + T),
          D < T
            ? (y.scrollTop = D)
            : L > y.offsetHeight && (y.scrollTop = L - y.offsetHeight);
      }
    },
    [i, u, y],
  );
  var O = function () {
      var w = /* @__PURE__ */ oe.createElement(
        "ul",
        Oe(
          {
            ref: B,
            id: t,
            role: "listbox",
            "aria-label": r,
          },
          b("list"),
        ),
        Object.values(n).reduce(function (D, L) {
          var C = L.results,
            A = L.queryInfo;
          return [].concat(
            xt(D),
            xt(
              C.map(function (U, z) {
                return M(U, A, D.length + z);
              }),
            ),
          );
        }, []),
      );
      return S ? S(w) : w;
    },
    M = function (w, D, L) {
      var C = L === i,
        A = D.childIndex,
        U = D.query,
        z = Ge.toArray(_)[A].props.renderSuggestion;
      return /* @__PURE__ */ oe.createElement(Mu, {
        style: b("item"),
        key: "".concat(A, "-").concat(I(w)),
        id: po(t, L),
        query: U,
        index: L,
        ignoreAccents: m,
        renderSuggestion: z,
        suggestion: w,
        focused: C,
        onClick: function () {
          return N(w, D);
        },
        onMouseEnter: function () {
          return X(L);
        },
      });
    },
    K = function () {
      if (l)
        return /* @__PURE__ */ oe.createElement($u, {
          style: b("loadingIndicator"),
        });
    },
    X = function (w, D) {
      E && E(w);
    },
    N = function (w, D) {
      p(w, D);
    },
    I = function (w) {
      return typeof w == "string" ? w : w.id;
    };
  return d
    ? /* @__PURE__ */ oe.createElement(
        "div",
        Oe(
          {},
          cu(
            {
              position: s || "absolute",
              left: a,
              right: c,
              top: f,
            },
            b,
          ),
          {
            onMouseDown: R,
            ref: v,
          },
        ),
        O(),
        K(),
      )
    : null;
}
mo.propTypes = {
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
  containerRef: $.oneOfType([
    $.func,
    $.shape({
      current: typeof Element > "u" ? $.any : $.instanceOf(Element),
    }),
  ]),
};
var Lu = zt({
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
  Bu = Lu(mo);
function wr(e, t) {
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
      ? wr(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : wr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
function Hu(e) {
  var t = Uu();
  return function () {
    var n = Nt(e),
      r;
    if (t) {
      var i = Nt(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return ka(this, r);
  };
}
function Uu() {
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
var zu = function (t) {
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
  Vu = function (t, o) {
    return t instanceof Array
      ? function (n, r) {
          for (var i = [], s = 0, a = t.length; s < a; ++s) {
            var c = t[s].display || t[s].id;
            ho(c, n, o) >= 0 && i.push(t[s]);
          }
          return i;
        }
      : t;
  },
  qe = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  Ct = !1,
  yo = {
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
    suggestionsPortalHost:
      typeof Element > "u" ? $.any : $.PropTypes.instanceOf(Element),
    inputRef: $.oneOfType([
      $.func,
      $.shape({
        current: typeof Element > "u" ? $.any : $.instanceOf(Element),
      }),
    ]),
    children: $.oneOfType([$.element, $.arrayOf($.element)]).isRequired,
  },
  jn = /* @__PURE__ */ (function (e) {
    $a(o, e);
    var t = Hu(o);
    function o(n) {
      var r;
      return (
        Fa(this, o),
        (r = t.call(this, n)),
        ee(te(r), "setContainerElement", function (i) {
          r.containerElement = i;
        }),
        ee(te(r), "getInputProps", function () {
          var i = r.props,
            s = i.readOnly,
            a = i.disabled,
            c = i.style,
            f = wu(
              r.props,
              ["style", "classNames", "className"],
              // substyle props
              Iu(yo),
            );
          return De(
            De(
              De(De({}, f), c("input")),
              {},
              {
                value: r.getPlainText(),
                onScroll: r.updateHighlighterScroll,
              },
              !s &&
                !a && {
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
              "aria-activedescendant": po(
                r.uuidSuggestionsOverlay,
                r.state.focusIndex,
              ),
            },
          );
        }),
        ee(te(r), "renderControl", function () {
          var i = r.props,
            s = i.singleLine,
            a = i.style,
            c = r.getInputProps();
          return /* @__PURE__ */ oe.createElement(
            "div",
            a("control"),
            r.renderHighlighter(),
            s ? r.renderInput(c) : r.renderTextarea(c),
          );
        }),
        ee(te(r), "renderInput", function (i) {
          return /* @__PURE__ */ oe.createElement(
            "input",
            Oe(
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
            Oe(
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
          if (!En(r.state.selectionStart)) return null;
          var i = r.state.suggestionsPosition,
            s = i.position,
            a = i.left,
            c = i.top,
            f = i.right,
            u = /* @__PURE__ */ oe.createElement(
              Bu,
              {
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
                a11ySuggestionsListLabel: r.props.a11ySuggestionsListLabel,
              },
              r.props.children,
            );
          return r.props.suggestionsPortalHost
            ? /* @__PURE__ */ Jo.createPortal(u, r.props.suggestionsPortalHost)
            : u;
        }),
        ee(te(r), "renderHighlighter", function () {
          var i = r.state,
            s = i.selectionStart,
            a = i.selectionEnd,
            c = r.props,
            f = c.singleLine,
            u = c.children,
            l = c.value,
            d = c.style;
          return /* @__PURE__ */ oe.createElement(
            Pu,
            {
              containerRef: r.setHighlighterElement,
              style: d("highlighter"),
              value: l,
              singleLine: f,
              selectionStart: s,
              selectionEnd: a,
              onCaretPositionChange: r.handleCaretPositionChange,
            },
            u,
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
          return Le(r.props.value || "", je(r.props.children));
        }),
        ee(te(r), "executeOnChange", function (i) {
          for (
            var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), c = 1;
            c < s;
            c++
          )
            a[c - 1] = arguments[c];
          if (r.props.onChange) {
            var f;
            return (f = r.props).onChange.apply(f, [i].concat(a));
          }
          if (r.props.valueLink) {
            var u;
            return (u = r.props.valueLink).requestChange.apply(
              u,
              [i.target.value].concat(a),
            );
          }
        }),
        ee(te(r), "handleChange", function (i) {
          if (((Ct = !1), Du())) {
            var s =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (s.activeElement !== i.target) return;
          }
          var a = r.props.value || "",
            c = je(r.props.children),
            f = i.target.value,
            u = r.state.selectionStart;
          u == null && (u = i.target.selectionStart);
          var l = r.state.selectionEnd;
          l == null && (l = i.target.selectionEnd);
          var d = _u(
            a,
            f,
            {
              selectionStartBefore: u,
              selectionEndBefore: l,
              selectionEndAfter: i.target.selectionEnd,
            },
            c,
          );
          f = Le(d, c);
          var h = i.target.selectionStart,
            p = i.target.selectionEnd,
            m = !1,
            v = Rr(a, c, h);
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
          var _ = ut(d, c);
          i.nativeEvent.isComposing &&
            h === p &&
            r.updateMentionsQueries(r.inputElement.value, h);
          var b = {
            target: {
              value: d,
            },
          };
          r.executeOnChange(b, d, f, _);
        }),
        ee(te(r), "handleSelect", function (i) {
          if (
            (r.setState({
              selectionStart: i.target.selectionStart,
              selectionEnd: i.target.selectionEnd,
            }),
            !Ct)
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
          var s = St(r.state.suggestions);
          if (s === 0 || !r.suggestionsElement) {
            r.props.onKeyDown(i);
            return;
          }
          switch (
            (Object.values(qe).indexOf(i.keyCode) >= 0 &&
              (i.preventDefault(), i.stopPropagation()),
            i.keyCode)
          ) {
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
        }),
        ee(te(r), "shiftFocus", function (i) {
          var s = St(r.state.suggestions);
          r.setState({
            focusIndex: (s + r.state.focusIndex + i) % s,
            scrollFocusedIntoView: !0,
          });
        }),
        ee(te(r), "selectFocused", function () {
          var i = r.state,
            s = i.suggestions,
            a = i.focusIndex,
            c = Object.values(s).reduce(function (l, d) {
              var h = d.results,
                p = d.queryInfo;
              return [].concat(
                xt(l),
                xt(
                  h.map(function (m) {
                    return {
                      result: m,
                      queryInfo: p,
                    };
                  }),
                ),
              );
            }, [])[a],
            f = c.result,
            u = c.queryInfo;
          r.addMention(f, u),
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
            a = s.suggestionsPortalHost,
            c = s.allowSuggestionsAboveCursor,
            f = s.forceSuggestionsAboveCursor;
          if (!(!i || !r.suggestionsElement)) {
            var u = r.suggestionsElement,
              l = r.highlighterElement,
              d = l.getBoundingClientRect(),
              h = an(l, "font-size"),
              p = {
                left: d.left + i.left,
                top: d.top + i.top + h,
              },
              m = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
              );
            if (u) {
              var v = {};
              if (a) {
                v.position = "fixed";
                var _ = p.left,
                  b = p.top;
                (_ -= an(u, "margin-left")),
                  (b -= an(u, "margin-top")),
                  (_ -= l.scrollLeft),
                  (b -= l.scrollTop);
                var S = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                _ + u.offsetWidth > S
                  ? (v.left = Math.max(0, S - u.offsetWidth))
                  : (v.left = _),
                  (c && b + u.offsetHeight > m && u.offsetHeight < b - h) || f
                    ? (v.top = Math.max(0, b - u.offsetHeight - h))
                    : (v.top = b);
              } else {
                var R = i.left - l.scrollLeft,
                  E = i.top - l.scrollTop;
                R + u.offsetWidth > r.containerElement.offsetWidth
                  ? (v.right = 0)
                  : (v.left = R),
                  (c &&
                    p.top - l.scrollTop + u.offsetHeight > m &&
                    u.offsetHeight < d.top - h - l.scrollTop) ||
                  f
                    ? (v.top = E - u.offsetHeight - h)
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
            s = r.highlighterElement;
          !i ||
            !s ||
            ((s.scrollLeft = i.scrollLeft),
            (s.scrollTop = i.scrollTop),
            (s.height = i.height));
        }),
        ee(te(r), "handleCompositionStart", function () {
          Ct = !0;
        }),
        ee(te(r), "handleCompositionEnd", function () {
          Ct = !1;
        }),
        ee(te(r), "setSelection", function (i, s) {
          if (!(i === null || s === null)) {
            var a = r.inputElement;
            if (a.setSelectionRange) a.setSelectionRange(i, s);
            else if (a.createTextRange) {
              var c = a.createTextRange();
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
          var a = r.props.value || "",
            c = r.props.children,
            f = je(c),
            u = me(a, f, s, "NULL");
          if (u !== null) {
            var l = Su(a.substring(0, u), f),
              d = i.substring(l, s);
            oe.Children.forEach(c, function (h, p) {
              if (h) {
                var m = zu(h.props.trigger, r.props),
                  v = d.match(m);
                if (v) {
                  var _ = l + d.indexOf(v[1], v.index);
                  r.queryData(v[2], p, _, _ + v[1].length, i);
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
        ee(te(r), "queryData", function (i, s, a, c, f) {
          var u = r.props,
            l = u.children,
            d = u.ignoreAccents,
            h = Ge.toArray(l)[s],
            p = Vu(h.props.data, d),
            m = p(i, r.updateSuggestions.bind(null, r._queryId, s, i, a, c, f));
          m instanceof Array &&
            r.updateSuggestions(r._queryId, s, i, a, c, f, m);
        }),
        ee(te(r), "updateSuggestions", function (i, s, a, c, f, u, l) {
          if (i === r._queryId) {
            r.suggestions = De(
              De({}, r.suggestions),
              {},
              ee({}, s, {
                queryInfo: {
                  childIndex: s,
                  query: a,
                  querySequenceStart: c,
                  querySequenceEnd: f,
                  plainTextValue: u,
                },
                results: l,
              }),
            );
            var d = r.state.focusIndex,
              h = St(r.suggestions);
            r.setState({
              suggestions: r.suggestions,
              focusIndex: d >= h ? Math.max(h - 1, 0) : d,
            });
          }
        }),
        ee(te(r), "addMention", function (i, s) {
          var a = i.id,
            c = i.display,
            f = s.childIndex,
            u = s.querySequenceStart,
            l = s.querySequenceEnd,
            d = s.plainTextValue,
            h = r.props.value || "",
            p = je(r.props.children),
            m = Ge.toArray(r.props.children)[f],
            v = m.props,
            _ = v.markup,
            b = v.displayTransform,
            S = v.appendSpaceOnAdd,
            R = v.onAdd,
            E = me(h, p, u, "START"),
            x = E + l - u,
            F = Ou(_, a, c);
          S && (F += " ");
          var y = ct(h, E, x, F);
          r.inputElement.focus();
          var B = b(a, c);
          S && (B += " ");
          var O = u + B.length;
          r.setState({
            selectionStart: O,
            selectionEnd: O,
            setSelectionAfterMentionChange: !0,
          });
          var M = {
              target: {
                value: y,
              },
            },
            K = ut(y, p),
            X = ct(d, u, l, B);
          r.executeOnChange(M, y, X, K),
            R && R(a, c, E, x),
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
            En(r.state.selectionStart) &&
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
      Ma(o, [
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
              Oe(
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
                a = i.selectionEnd,
                c = this.props,
                f = c.value,
                u = c.children,
                l = je(u),
                d = me(f, l, s, "START"),
                h = me(f, l, a, "END"),
                p = r.clipboardData.getData("text/react-mentions"),
                m = r.clipboardData.getData("text/plain"),
                v = ct(f, d, h, p || m).replace(/\r/g, ""),
                _ = Le(v, l),
                b = {
                  target: De(
                    De({}, r.target),
                    {},
                    {
                      value: v,
                    },
                  ),
                };
              this.executeOnChange(b, v, _, ut(v, l));
              var S = Rr(f, l, s),
                R = (S || s) + Le(p || m, l).length;
              this.setState({
                selectionStart: R,
                selectionEnd: R,
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
              a = this.props,
              c = a.children,
              f = a.value,
              u = je(c),
              l = me(f, u, i, "START"),
              d = me(f, u, s, "END");
            r.clipboardData.setData("text/plain", r.target.value.slice(i, s)),
              r.clipboardData.setData("text/react-mentions", f.slice(l, d));
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
                a = i.selectionEnd,
                c = this.props,
                f = c.children,
                u = c.value,
                l = je(f),
                d = me(u, l, s, "START"),
                h = me(u, l, a, "END"),
                p = [u.slice(0, d), u.slice(h)].join(""),
                m = Le(p, l),
                v = {
                  target: De(
                    De({}, r.target),
                    {},
                    {
                      value: m,
                    },
                  ),
                };
              this.executeOnChange(v, p, m, ut(u, l));
            }
          },
          // Handle input element's change event
        },
      ]),
      o
    );
  })(oe.Component);
ee(jn, "propTypes", yo);
ee(jn, "defaultProps", {
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
var an = function (t, o) {
    var n = parseFloat(window.getComputedStyle(t, null).getPropertyValue(o));
    return isFinite(n) ? n : 0;
  },
  qu = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  Wu = zt(
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
          qu
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
  Yu = Wu(jn),
  Ku = {
    fontWeight: "inherit",
  },
  Pn = function (t) {
    var o = t.display,
      n = t.style,
      r = t.className,
      i = t.classNames,
      s = xn(Ku, {
        style: n,
        className: r,
        classNames: i,
      });
    return /* @__PURE__ */ oe.createElement("strong", s, o);
  };
Pn.propTypes = {
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
  isLoading: $.bool,
};
Pn.defaultProps = {
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
const Gu = {
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
  Xu = ({ value: e, setValue: t }) => {
    const o = le((a) => a.users),
      n = Object.values(o).map((a) => ({
        ...a,
        display: a.display_name,
      })),
      r = (a) => {
        a.stopPropagation();
      },
      i = (a, c) => {
        console.info("[MentionsInputComponent] on mention select", {
          id: a,
          display: c,
        });
      },
      s = (a) => {
        t(a.target.value);
      };
    return /* @__PURE__ */ P.jsx(Yu, {
      autoFocus: !0,
      value: e,
      onChange: s,
      style: {
        ...Gu,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: "Type your reply here...",
      className: "mentions-input",
      onKeyDown: r,
      children: /* @__PURE__ */ P.jsx(Pn, {
        displayTransform: (a, c) => `@${c}`,
        trigger: "@",
        markup: "@[__id__](__display__)",
        data: n,
        appendSpaceOnAdd: !0,
        renderSuggestion: (a, c) =>
          /* @__PURE__ */ P.jsx("div", {
            className: `user ${c ? "focused" : ""}`,
            children: a.display,
          }),
        onAdd: i,
      }),
    });
  },
  Zu = Xu,
  Ju = ({ comment: e, setComment: t, loading: o }) => {
    const n = le((r) => (r.currentUserId ? r.users[r.currentUserId] : null));
    return /* @__PURE__ */ P.jsxs("div", {
      className: Fe.conversationInputForm,
      children: [
        /* @__PURE__ */ P.jsx(to, { user: n }),
        /* @__PURE__ */ P.jsx(Zu, { value: e, setValue: t }),
        /* @__PURE__ */ P.jsx(Ls, {
          loading: o,
          color: "primary",
          children: /* @__PURE__ */ P.jsx(Rs, {}),
        }),
      ],
    });
  },
  Eo = Ju,
  Qu = ({ text: e, filePath: t }) =>
    e
      ? /* @__PURE__ */ P.jsx("div", {
          className: Fe.highlightText,
          children: /* @__PURE__ */ P.jsx(ea, {
            code: e,
            language: "sql",
            showLineNumbers: !0,
            fileName: t,
          }),
        })
      : null,
  bo = Qu,
  ec = () => {
    var c, f;
    const e = le((u) => u.newConversation),
      t = le((u) => u.shareId),
      o = Ae(),
      [n, r] = ge(!1),
      [i, s] = ge(""),
      a = async (u) => {
        if ((u.stopPropagation(), u.preventDefault(), !(!e || !t))) {
          r(!0);
          try {
            console.log("saving conversation", e, i);
            const l = await sa(t, {
              ...e,
              message: i,
            });
            if (!l.conversation_group_id) {
              console.error("Unable to create conversation group", l);
              return;
            }
            console.log("Successfully created conversation group", l);
          } catch (l) {
            console.error("error while saving conversation", e, l);
          }
          o(qr()), r(!1), o(Rn(!0)), o(An()), s("");
        }
      };
    return /* @__PURE__ */ P.jsx(Ft, {
      className: Fe.newConversationForm,
      children: /* @__PURE__ */ P.jsx(Mt, {
        children: /* @__PURE__ */ P.jsxs("form", {
          onSubmit: a,
          children: [
            /* @__PURE__ */ P.jsx("h4", { children: "Add comment" }),
            /* @__PURE__ */ P.jsx(bo, {
              text:
                (c = e == null ? void 0 : e.meta) == null
                  ? void 0
                  : c.highlight,
              filePath:
                ((f = e == null ? void 0 : e.meta) == null
                  ? void 0
                  : f.filePath) || "",
            }),
            /* @__PURE__ */ P.jsx(Eo, {
              comment: i,
              setComment: s,
              loading: n,
            }),
          ],
        }),
      }),
    });
  },
  tc = ec;
var _o = { exports: {} };
(function (e, t) {
  (function (o, n) {
    e.exports = n();
  })(Qo, function () {
    var o = 1e3,
      n = 6e4,
      r = 36e5,
      i = "millisecond",
      s = "second",
      a = "minute",
      c = "hour",
      f = "day",
      u = "week",
      l = "month",
      d = "quarter",
      h = "year",
      p = "date",
      m = "Invalid Date",
      v =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      _ =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      b = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (N) {
          var I = ["th", "st", "nd", "rd"],
            T = N % 100;
          return "[" + N + (I[(T - 20) % 10] || I[T] || I[0]) + "]";
        },
      },
      S = function (N, I, T) {
        var w = String(N);
        return !w || w.length >= I
          ? N
          : "" + Array(I + 1 - w.length).join(T) + N;
      },
      R = {
        s: S,
        z: function (N) {
          var I = -N.utcOffset(),
            T = Math.abs(I),
            w = Math.floor(T / 60),
            D = T % 60;
          return (I <= 0 ? "+" : "-") + S(w, 2, "0") + ":" + S(D, 2, "0");
        },
        m: function N(I, T) {
          if (I.date() < T.date()) return -N(T, I);
          var w = 12 * (T.year() - I.year()) + (T.month() - I.month()),
            D = I.clone().add(w, l),
            L = T - D < 0,
            C = I.clone().add(w + (L ? -1 : 1), l);
          return +(-(w + (T - D) / (L ? D - C : C - D)) || 0);
        },
        a: function (N) {
          return N < 0 ? Math.ceil(N) || 0 : Math.floor(N);
        },
        p: function (N) {
          return (
            { M: l, y: h, w: u, d: f, D: p, h: c, m: a, s, ms: i, Q: d }[N] ||
            String(N || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (N) {
          return N === void 0;
        },
      },
      E = "en",
      x = {};
    x[E] = b;
    var F = "$isDayjsObject",
      y = function (N) {
        return N instanceof K || !(!N || !N[F]);
      },
      B = function N(I, T, w) {
        var D;
        if (!I) return E;
        if (typeof I == "string") {
          var L = I.toLowerCase();
          x[L] && (D = L), T && ((x[L] = T), (D = L));
          var C = I.split("-");
          if (!D && C.length > 1) return N(C[0]);
        } else {
          var A = I.name;
          (x[A] = I), (D = A);
        }
        return !w && D && (E = D), D || (!w && E);
      },
      O = function (N, I) {
        if (y(N)) return N.clone();
        var T = typeof I == "object" ? I : {};
        return (T.date = N), (T.args = arguments), new K(T);
      },
      M = R;
    (M.l = B),
      (M.i = y),
      (M.w = function (N, I) {
        return O(N, { locale: I.$L, utc: I.$u, x: I.$x, $offset: I.$offset });
      });
    var K = (function () {
        function N(T) {
          (this.$L = B(T.locale, null, !0)),
            this.parse(T),
            (this.$x = this.$x || T.x || {}),
            (this[F] = !0);
        }
        var I = N.prototype;
        return (
          (I.parse = function (T) {
            (this.$d = (function (w) {
              var D = w.date,
                L = w.utc;
              if (D === null) return /* @__PURE__ */ new Date(NaN);
              if (M.u(D)) return /* @__PURE__ */ new Date();
              if (D instanceof Date) return new Date(D);
              if (typeof D == "string" && !/Z$/i.test(D)) {
                var C = D.match(v);
                if (C) {
                  var A = C[2] - 1 || 0,
                    U = (C[7] || "0").substring(0, 3);
                  return L
                    ? new Date(
                        Date.UTC(
                          C[1],
                          A,
                          C[3] || 1,
                          C[4] || 0,
                          C[5] || 0,
                          C[6] || 0,
                          U,
                        ),
                      )
                    : new Date(
                        C[1],
                        A,
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
            return M;
          }),
          (I.isValid = function () {
            return this.$d.toString() !== m;
          }),
          (I.isSame = function (T, w) {
            var D = O(T);
            return this.startOf(w) <= D && D <= this.endOf(w);
          }),
          (I.isAfter = function (T, w) {
            return O(T) < this.startOf(w);
          }),
          (I.isBefore = function (T, w) {
            return this.endOf(w) < O(T);
          }),
          (I.$g = function (T, w, D) {
            return M.u(T) ? this[w] : this.set(D, T);
          }),
          (I.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (I.valueOf = function () {
            return this.$d.getTime();
          }),
          (I.startOf = function (T, w) {
            var D = this,
              L = !!M.u(w) || w,
              C = M.p(T),
              A = function (Q, q) {
                var ce = M.w(
                  D.$u ? Date.UTC(D.$y, q, Q) : new Date(D.$y, q, Q),
                  D,
                );
                return L ? ce : ce.endOf(f);
              },
              U = function (Q, q) {
                return M.w(
                  D.toDate()[Q].apply(
                    D.toDate("s"),
                    (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(q),
                  ),
                  D,
                );
              },
              z = this.$W,
              V = this.$M,
              G = this.$D,
              W = "set" + (this.$u ? "UTC" : "");
            switch (C) {
              case h:
                return L ? A(1, 0) : A(31, 11);
              case l:
                return L ? A(1, V) : A(0, V + 1);
              case u:
                var Y = this.$locale().weekStart || 0,
                  J = (z < Y ? z + 7 : z) - Y;
                return A(L ? G - J : G + (6 - J), V);
              case f:
              case p:
                return U(W + "Hours", 0);
              case c:
                return U(W + "Minutes", 1);
              case a:
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
          (I.$set = function (T, w) {
            var D,
              L = M.p(T),
              C = "set" + (this.$u ? "UTC" : ""),
              A = ((D = {}),
              (D[f] = C + "Date"),
              (D[p] = C + "Date"),
              (D[l] = C + "Month"),
              (D[h] = C + "FullYear"),
              (D[c] = C + "Hours"),
              (D[a] = C + "Minutes"),
              (D[s] = C + "Seconds"),
              (D[i] = C + "Milliseconds"),
              D)[L],
              U = L === f ? this.$D + (w - this.$W) : w;
            if (L === l || L === h) {
              var z = this.clone().set(p, 1);
              z.$d[A](U),
                z.init(),
                (this.$d = z.set(p, Math.min(this.$D, z.daysInMonth())).$d);
            } else A && this.$d[A](U);
            return this.init(), this;
          }),
          (I.set = function (T, w) {
            return this.clone().$set(T, w);
          }),
          (I.get = function (T) {
            return this[M.p(T)]();
          }),
          (I.add = function (T, w) {
            var D,
              L = this;
            T = Number(T);
            var C = M.p(w),
              A = function (V) {
                var G = O(L);
                return M.w(G.date(G.date() + Math.round(V * T)), L);
              };
            if (C === l) return this.set(l, this.$M + T);
            if (C === h) return this.set(h, this.$y + T);
            if (C === f) return A(1);
            if (C === u) return A(7);
            var U = ((D = {}), (D[a] = n), (D[c] = r), (D[s] = o), D)[C] || 1,
              z = this.$d.getTime() + T * U;
            return M.w(z, this);
          }),
          (I.subtract = function (T, w) {
            return this.add(-1 * T, w);
          }),
          (I.format = function (T) {
            var w = this,
              D = this.$locale();
            if (!this.isValid()) return D.invalidDate || m;
            var L = T || "YYYY-MM-DDTHH:mm:ssZ",
              C = M.z(this),
              A = this.$H,
              U = this.$m,
              z = this.$M,
              V = D.weekdays,
              G = D.months,
              W = D.meridiem,
              Y = function (q, ce, k, he) {
                return (q && (q[ce] || q(w, L))) || k[ce].slice(0, he);
              },
              J = function (q) {
                return M.s(A % 12 || 12, q, "0");
              },
              Q =
                W ||
                function (q, ce, k) {
                  var he = q < 12 ? "AM" : "PM";
                  return k ? he.toLowerCase() : he;
                };
            return L.replace(_, function (q, ce) {
              return (
                ce ||
                (function (k) {
                  switch (k) {
                    case "YY":
                      return String(w.$y).slice(-2);
                    case "YYYY":
                      return M.s(w.$y, 4, "0");
                    case "M":
                      return z + 1;
                    case "MM":
                      return M.s(z + 1, 2, "0");
                    case "MMM":
                      return Y(D.monthsShort, z, G, 3);
                    case "MMMM":
                      return Y(G, z);
                    case "D":
                      return w.$D;
                    case "DD":
                      return M.s(w.$D, 2, "0");
                    case "d":
                      return String(w.$W);
                    case "dd":
                      return Y(D.weekdaysMin, w.$W, V, 2);
                    case "ddd":
                      return Y(D.weekdaysShort, w.$W, V, 3);
                    case "dddd":
                      return V[w.$W];
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
                      return String(w.$s);
                    case "ss":
                      return M.s(w.$s, 2, "0");
                    case "SSS":
                      return M.s(w.$ms, 3, "0");
                    case "Z":
                      return C;
                  }
                  return null;
                })(q) ||
                C.replace(":", "")
              );
            });
          }),
          (I.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (I.diff = function (T, w, D) {
            var L,
              C = this,
              A = M.p(w),
              U = O(T),
              z = (U.utcOffset() - this.utcOffset()) * n,
              V = this - U,
              G = function () {
                return M.m(C, U);
              };
            switch (A) {
              case h:
                L = G() / 12;
                break;
              case l:
                L = G();
                break;
              case d:
                L = G() / 3;
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
            return D ? L : M.a(L);
          }),
          (I.daysInMonth = function () {
            return this.endOf(l).$D;
          }),
          (I.$locale = function () {
            return x[this.$L];
          }),
          (I.locale = function (T, w) {
            if (!T) return this.$L;
            var D = this.clone(),
              L = B(T, w, !0);
            return L && (D.$L = L), D;
          }),
          (I.clone = function () {
            return M.w(this.$d, this);
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
          N
        );
      })(),
      X = K.prototype;
    return (
      (O.prototype = X),
      [
        ["$ms", i],
        ["$s", s],
        ["$m", a],
        ["$H", c],
        ["$W", f],
        ["$M", l],
        ["$y", h],
        ["$D", p],
      ].forEach(function (N) {
        X[N[1]] = function (I) {
          return this.$g(I, N[0], N[1]);
        };
      }),
      (O.extend = function (N, I) {
        return N.$i || (N(I, K, O), (N.$i = !0)), O;
      }),
      (O.locale = B),
      (O.isDayjs = y),
      (O.unix = function (N) {
        return O(1e3 * N);
      }),
      (O.en = x[E]),
      (O.Ls = x),
      (O.p = {}),
      O
    );
  });
})(_o);
var nc = _o.exports;
const rc = /* @__PURE__ */ tt(nc),
  oc = ({ conversationGroupId: e }) => {
    const t = le((s) => s.shareId),
      o = Ae(),
      [n, r] = ge(!1),
      i = async () => {
        e &&
          (r(!0),
          await la(t, e),
          o(Ji({ conversationGroupId: e, shareId: t })),
          r(!1));
      };
    return e
      ? /* @__PURE__ */ P.jsx(ws, {
          disabled: n,
          className: Fe.resolveButton,
          title: "Resolve conversation",
          onClick: i,
          children: /* @__PURE__ */ P.jsx(Os, {}),
        })
      : null;
  },
  ic = oc,
  sc = ({
    user: e,
    timestamp: t,
    showResolveButton: o,
    conversationGroupId: n,
  }) =>
    /* @__PURE__ */ P.jsxs(jr, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ P.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ P.jsx(to, { user: e }),
            /* @__PURE__ */ P.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ P.jsx("span", {
              children: rc(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        o ? /* @__PURE__ */ P.jsx(ic, { conversationGroupId: n }) : null,
      ],
    }),
  So = sc,
  ac = ({ conversation: e }) => {
    const t = le((o) => {
      var n;
      return (n = o.users) == null ? void 0 : n[e == null ? void 0 : e.user_id];
    });
    return /* @__PURE__ */ P.jsxs(Ft, {
      children: [
        /* @__PURE__ */ P.jsx(So, { user: t, timestamp: e.timestamp }),
        /* @__PURE__ */ P.jsx(Mt, {
          children: /* @__PURE__ */ P.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
          }),
        }),
      ],
    });
  },
  uc = ac,
  cc = ({ conversationGroupId: e }) => {
    const t = le((c) => c.shareId),
      [o, n] = ge(""),
      [r, i] = ge(!1),
      s = Ae(),
      a = async (c) => {
        if ((c.stopPropagation(), c.preventDefault(), !(!t || !e))) {
          i(!0),
            console.log("saving reply", t, e, {
              message: o,
            });
          try {
            await aa(t, e, {
              message: o,
            });
          } catch (f) {
            console.error("error while saving reply", f);
          }
          s(qr()), i(!1), n("");
        }
      };
    return /* @__PURE__ */ P.jsx("div", {
      className: Fe.replyForm,
      children: /* @__PURE__ */ P.jsx("form", {
        onSubmit: a,
        className: "",
        children: /* @__PURE__ */ P.jsx(Eo, {
          comment: o,
          setComment: n,
          loading: r,
        }),
      }),
    });
  },
  lc = cc,
  fc = ({ conversationGroup: e }) => {
    var l, d;
    const t = Te(null),
      o = le((h) => {
        var p;
        return (p = h.users) == null ? void 0 : p[e == null ? void 0 : e.owner];
      }),
      n = le((h) => h.selectedConversationId),
      r = Ae(),
      [i, s] = ge(!1);
    if (
      (Re(() => {
        var h;
        n &&
          ((h = t.current) == null ||
            h.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [n]),
      !((l = e == null ? void 0 : e.conversations) != null && l.length) ||
        (e == null ? void 0 : e.status) !== "Pending")
    )
      return null;
    const a = () => {
        r(On(e.conversation_group_id));
      },
      [c, ...f] = e.conversations,
      u = f.length
        ? f.length > 1
          ? `${f.length} replies`
          : `${f.length} reply`
        : "Reply";
    return /* @__PURE__ */ P.jsxs(Ft, {
      className: `${Fe.conversationGroup} ${
        n === e.conversation_group_id ? "active" : ""
      }`,
      onClick: a,
      ref: t,
      children: [
        /* @__PURE__ */ P.jsx(So, {
          user: o,
          timestamp: c.timestamp,
          showResolveButton: !0,
          conversationGroupId: e.conversation_group_id,
        }),
        /* @__PURE__ */ P.jsxs(Mt, {
          children: [
            /* @__PURE__ */ P.jsx(bo, {
              text: (d = e.meta) == null ? void 0 : d.highlight,
              filePath: e.meta.filePath,
            }),
            /* @__PURE__ */ P.jsx("p", {
              children: c.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
            }),
            /* @__PURE__ */ P.jsx(Pt, {
              onClick: () => s((h) => !h),
              color: "link",
              children: u,
            }),
            f.length
              ? /* @__PURE__ */ P.jsx(P.Fragment, {
                  children: i
                    ? /* @__PURE__ */ P.jsx(P.Fragment, {
                        children: f.map((h) =>
                          /* @__PURE__ */ P.jsx(
                            uc,
                            { conversation: h },
                            h.conversation_id,
                          ),
                        ),
                      })
                    : null,
                })
              : null,
            i
              ? /* @__PURE__ */ P.jsx(lc, {
                  conversationGroupId: e.conversation_group_id,
                })
              : null,
          ],
        }),
      ],
    });
  },
  dc = fc,
  pc = () => {
    const e = le((t) => t.conversations);
    return !e || !Object.keys(e).length
      ? /* @__PURE__ */ P.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ P.jsx("div", {
          children: Object.values(e).map((t) =>
            /* @__PURE__ */ P.jsx(
              dc,
              {
                conversationGroup: t,
              },
              t.conversation_group_id,
            ),
          ),
        });
  },
  hc = pc,
  gc = () => {
    const e = le((s) => s.isRightPanelOpen),
      t = le((s) => s.selectedConversationId),
      o = le((s) => s.newConversation),
      n = Ae(),
      r = () => {
        n(Rn(!1)), n(On(void 0)), n(An());
      };
    return !!o || e || t
      ? /* @__PURE__ */ P.jsxs(P.Fragment, {
          children: [
            /* @__PURE__ */ P.jsx(Zo, {
              onClick: r,
              className: Fe.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ P.jsxs("div", {
              className: Fe.conversationRightPanel,
              children: [
                /* @__PURE__ */ P.jsx("h3", { children: "Comments" }),
                o
                  ? /* @__PURE__ */ P.jsx(tc, {})
                  : /* @__PURE__ */ P.jsx(hc, {}),
              ],
            }),
          ],
        })
      : null;
  },
  vc = gc,
  mc = 120,
  yc = () => {
    const e = Te(),
      t = le((s) => s.shareId),
      o = le((s) => s.conversationsLoadingState),
      n = Ae(),
      r = le((s) => Object.keys(s.conversations || {})),
      i = Ke(
        (s) => {
          clearTimeout(e.current),
            ua(s)
              .then((a) => {
                console.log("useConversations", a),
                  n(Xi(a == null ? void 0 : a.dbt_docs_share_conversations)),
                  (e.current = setTimeout(() => {
                    i(s);
                  }, mc * 1e3));
              })
              .catch((a) =>
                console.error("error while fetching conversations list", a),
              )
              .finally(() => {
                n(ar(Ce.INITIALIZED));
              });
        },
        [n],
      );
    return (
      Re(() => {
        o !== Ce.UNINITIALIZED || !t || (n(ar(Ce.LOADING)), i(t));
      }, [n, o, r, t, i]),
      { isLoading: o === Ce.LOADING }
    );
  },
  Ec = () => {
    const e = Ae(),
      t = le((r) => Object.keys(r.users || {})),
      [o, n] = ge(Ce.UNINITIALIZED);
    return (
      Re(() => {
        o !== Ce.UNINITIALIZED ||
          Object.keys(t).length ||
          (n(Ce.LOADING),
          ca()
            .then((r) => {
              console.log("useConversationUsers", r), e(Gi(r));
            })
            .catch((r) => console.error("error while fetching users list", r))
            .finally(() => {
              n(Ce.INITIALIZED);
            }));
      }, [e, o, t]),
      { isLoading: o === Ce.LOADING }
    );
  },
  bc = () => (
    Ec(),
    yc(),
    /* @__PURE__ */ P.jsxs("div", {
      children: [/* @__PURE__ */ P.jsx(vc, {}), /* @__PURE__ */ P.jsx(Ea, {})],
    })
  ),
  _c = bc,
  Sc = Ko(() => import("./DbtDocsRenderer.js")),
  Cc = () => {
    const { loading: e, shareDetails: t } = fa(),
      o = Ae(),
      { getHighlightedSelectionData: n, pos: r, onSelectionEnd: i } = ga(),
      s = () => {
        const a = n();
        a && o(Zi(a));
      };
    return e
      ? /* @__PURE__ */ P.jsx("div", { children: "Loading..." })
      : !(t != null && t.catalog_presigned_url) ||
        !(t != null && t.manifest_presigned_url)
      ? /* @__PURE__ */ P.jsx("div", {
          children: "Unable to load required artifacts. Please try again.",
        })
      : /* @__PURE__ */ P.jsxs("div", {
          children: [
            /* @__PURE__ */ P.jsx("div", {
              className: "d-flex justify-content-end mb-2",
              children: /* @__PURE__ */ P.jsx(oa, {}),
            }),
            /* @__PURE__ */ P.jsx(_c, {}),
            /* @__PURE__ */ P.jsx(Sc, {
              shareDetails: t,
              onSelectionEnd: i,
            }),
            r ? /* @__PURE__ */ P.jsx(na, { pos: r, onAddComment: s }) : null,
          ],
        });
  },
  Tc = Cc,
  Oc = ({ shareId: e, userId: t, conversationGroupId: o, source: n }) =>
    /* @__PURE__ */ P.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ P.jsx(ts, {
        shareId: e,
        userId: t,
        conversationGroupId: o,
        source: n,
        children: /* @__PURE__ */ P.jsx(Tc, {}),
      }),
    }),
  Bc = Oc;
export {
  nt as A,
  ea as C,
  Bc as D,
  le as a,
  Pc as b,
  Fc as c,
  Qr as d,
  Fe as e,
  ni as g,
  P as j,
  jc as s,
  Ae as u,
};
