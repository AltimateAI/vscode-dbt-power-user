import "./main.css";
import * as Ee from "react";
import oe, {
  createContext as Qe,
  useReducer as Lo,
  useCallback as Ke,
  useMemo as ct,
  useContext as et,
  useLayoutEffect as ko,
  useEffect as Re,
  useRef as Te,
  useState as ge,
  useId as Dr,
  useInsertionEffect as Bo,
  cloneElement as Ho,
  Children as Ge,
  isValidElement as Ir,
  Component as Uo,
  createElement as Wn,
  lazy as zo,
} from "react";
import {
  Tooltip as Vo,
  Button as Nt,
  Spinner as Wo,
  Card as yn,
  CardBody as mn,
  CardTitle as qo,
  CloseButton as Yo,
} from "reactstrap";
import Ko, { createPortal as wr } from "react-dom";
var Go =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Ft(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var on = { exports: {} },
  ot = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qn;
function Xo() {
  if (qn) return ot;
  qn = 1;
  var e = oe,
    t = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    n = Object.prototype.hasOwnProperty,
    r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(a, c, l) {
    var u,
      f = {},
      d = null,
      g = null;
    l !== void 0 && (d = "" + l),
      c.key !== void 0 && (d = "" + c.key),
      c.ref !== void 0 && (g = c.ref);
    for (u in c) n.call(c, u) && !i.hasOwnProperty(u) && (f[u] = c[u]);
    if (a && a.defaultProps)
      for (u in ((c = a.defaultProps), c)) f[u] === void 0 && (f[u] = c[u]);
    return {
      $$typeof: t,
      type: a,
      key: d,
      ref: g,
      props: f,
      _owner: r.current,
    };
  }
  return (ot.Fragment = o), (ot.jsx = s), (ot.jsxs = s), ot;
}
var it = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yn;
function Zo() {
  return (
    Yn ||
      ((Yn = 1),
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
            l = Symbol.for("react.suspense"),
            u = Symbol.for("react.suspense_list"),
            f = Symbol.for("react.memo"),
            d = Symbol.for("react.lazy"),
            g = Symbol.for("react.offscreen"),
            p = Symbol.iterator,
            y = "@@iterator";
          function v(h) {
            if (h === null || typeof h != "object") return null;
            var N = (p && h[p]) || h[y];
            return typeof N == "function" ? N : null;
          }
          var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function _(h) {
            {
              for (
                var N = arguments.length,
                  H = new Array(N > 1 ? N - 1 : 0),
                  Z = 1;
                Z < N;
                Z++
              )
                H[Z - 1] = arguments[Z];
              S("error", h, H);
            }
          }
          function S(h, N, H) {
            {
              var Z = b.ReactDebugCurrentFrame,
                ie = Z.getStackAddendum();
              ie !== "" && ((N += "%s"), (H = H.concat([ie])));
              var ue = H.map(function (re) {
                return String(re);
              });
              ue.unshift("Warning: " + N),
                Function.prototype.apply.call(console[h], console, ue);
            }
          }
          var A = !1,
            E = !1,
            P = !1,
            F = !1,
            m = !1,
            $;
          $ = Symbol.for("react.module.reference");
          function O(h) {
            return !!(
              typeof h == "string" ||
              typeof h == "function" ||
              h === n ||
              h === i ||
              m ||
              h === r ||
              h === l ||
              h === u ||
              F ||
              h === g ||
              A ||
              E ||
              P ||
              (typeof h == "object" &&
                h !== null &&
                (h.$$typeof === d ||
                  h.$$typeof === f ||
                  h.$$typeof === s ||
                  h.$$typeof === a ||
                  h.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  h.$$typeof === $ ||
                  h.getModuleId !== void 0))
            );
          }
          function M(h, N, H) {
            var Z = h.displayName;
            if (Z) return Z;
            var ie = N.displayName || N.name || "";
            return ie !== "" ? H + "(" + ie + ")" : H;
          }
          function q(h) {
            return h.displayName || "Context";
          }
          function Y(h) {
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
              case l:
                return "Suspense";
              case u:
                return "SuspenseList";
            }
            if (typeof h == "object")
              switch (h.$$typeof) {
                case a:
                  var N = h;
                  return q(N) + ".Consumer";
                case s:
                  var H = h;
                  return q(H._context) + ".Provider";
                case c:
                  return M(h, h.render, "ForwardRef");
                case f:
                  var Z = h.displayName || null;
                  return Z !== null ? Z : Y(h.type) || "Memo";
                case d: {
                  var ie = h,
                    ue = ie._payload,
                    re = ie._init;
                  try {
                    return Y(re(ue));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var x = Object.assign,
            I = 0,
            T,
            w,
            D,
            B,
            C,
            R,
            U;
          function z() {}
          z.__reactDisabledLog = !0;
          function V() {
            {
              if (I === 0) {
                (T = console.log),
                  (w = console.info),
                  (D = console.warn),
                  (B = console.error),
                  (C = console.group),
                  (R = console.groupCollapsed),
                  (U = console.groupEnd);
                var h = {
                  configurable: !0,
                  enumerable: !0,
                  value: z,
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
          function X() {
            {
              if ((I--, I === 0)) {
                var h = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: x({}, h, {
                    value: T,
                  }),
                  info: x({}, h, {
                    value: w,
                  }),
                  warn: x({}, h, {
                    value: D,
                  }),
                  error: x({}, h, {
                    value: B,
                  }),
                  group: x({}, h, {
                    value: C,
                  }),
                  groupCollapsed: x({}, h, {
                    value: R,
                  }),
                  groupEnd: x({}, h, {
                    value: U,
                  }),
                });
              }
              I < 0 &&
                _(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                );
            }
          }
          var K = b.ReactCurrentDispatcher,
            G;
          function J(h, N, H) {
            {
              if (G === void 0)
                try {
                  throw Error();
                } catch (ie) {
                  var Z = ie.stack.trim().match(/\n( *(at )?)/);
                  G = (Z && Z[1]) || "";
                }
              return (
                `
` +
                G +
                h
              );
            }
          }
          var Q = !1,
            W;
          {
            var ce = typeof WeakMap == "function" ? WeakMap : Map;
            W = new ce();
          }
          function k(h, N) {
            if (!h || Q) return "";
            {
              var H = W.get(h);
              if (H !== void 0) return H;
            }
            var Z;
            Q = !0;
            var ie = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var ue;
            (ue = K.current), (K.current = null), V();
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
                  } catch (we) {
                    Z = we;
                  }
                  Reflect.construct(h, [], re);
                } else {
                  try {
                    re.call();
                  } catch (we) {
                    Z = we;
                  }
                  h.call(re.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (we) {
                  Z = we;
                }
                h();
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
                            h.displayName &&
                              Se.includes("<anonymous>") &&
                              (Se = Se.replace("<anonymous>", h.displayName)),
                            typeof h == "function" && W.set(h, Se),
                            Se
                          );
                        }
                      while (fe >= 1 && pe >= 0);
                    break;
                  }
              }
            } finally {
              (Q = !1), (K.current = ue), X(), (Error.prepareStackTrace = ie);
            }
            var ze = h ? h.displayName || h.name : "",
              Vn = ze ? J(ze) : "";
            return typeof h == "function" && W.set(h, Vn), Vn;
          }
          function he(h, N, H) {
            return k(h, !1);
          }
          function He(h) {
            var N = h.prototype;
            return !!(N && N.isReactComponent);
          }
          function Me(h, N, H) {
            if (h == null) return "";
            if (typeof h == "function") return k(h, He(h));
            if (typeof h == "string") return J(h);
            switch (h) {
              case l:
                return J("Suspense");
              case u:
                return J("SuspenseList");
            }
            if (typeof h == "object")
              switch (h.$$typeof) {
                case c:
                  return he(h.render);
                case f:
                  return Me(h.type, N, H);
                case d: {
                  var Z = h,
                    ie = Z._payload,
                    ue = Z._init;
                  try {
                    return Me(ue(ie), N, H);
                  } catch {}
                }
              }
            return "";
          }
          var gt = Object.prototype.hasOwnProperty,
            Pn = {},
            Nn = b.ReactDebugCurrentFrame;
          function vt(h) {
            if (h) {
              var N = h._owner,
                H = Me(h.type, h._source, N ? N.type : null);
              Nn.setExtraStackFrame(H);
            } else Nn.setExtraStackFrame(null);
          }
          function mo(h, N, H, Z, ie) {
            {
              var ue = Function.call.bind(gt);
              for (var re in h)
                if (ue(h, re)) {
                  var ne = void 0;
                  try {
                    if (typeof h[re] != "function") {
                      var ve = Error(
                        (Z || "React class") +
                          ": " +
                          H +
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
                    (vt(ie),
                    _(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      Z || "React class",
                      H,
                      re,
                      typeof ne,
                    ),
                    vt(null)),
                    ne instanceof Error &&
                      !(ne.message in Pn) &&
                      ((Pn[ne.message] = !0),
                      vt(ie),
                      _("Failed %s type: %s", H, ne.message),
                      vt(null));
                }
            }
          }
          var Eo = Array.isArray;
          function Ut(h) {
            return Eo(h);
          }
          function bo(h) {
            {
              var N = typeof Symbol == "function" && Symbol.toStringTag,
                H =
                  (N && h[Symbol.toStringTag]) ||
                  h.constructor.name ||
                  "Object";
              return H;
            }
          }
          function _o(h) {
            try {
              return Fn(h), !1;
            } catch {
              return !0;
            }
          }
          function Fn(h) {
            return "" + h;
          }
          function jn(h) {
            if (_o(h))
              return (
                _(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  bo(h),
                ),
                Fn(h)
              );
          }
          var rt = b.ReactCurrentOwner,
            So = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Mn,
            $n,
            zt;
          zt = {};
          function Co(h) {
            if (gt.call(h, "ref")) {
              var N = Object.getOwnPropertyDescriptor(h, "ref").get;
              if (N && N.isReactWarning) return !1;
            }
            return h.ref !== void 0;
          }
          function To(h) {
            if (gt.call(h, "key")) {
              var N = Object.getOwnPropertyDescriptor(h, "key").get;
              if (N && N.isReactWarning) return !1;
            }
            return h.key !== void 0;
          }
          function Oo(h, N) {
            if (
              typeof h.ref == "string" &&
              rt.current &&
              N &&
              rt.current.stateNode !== N
            ) {
              var H = Y(rt.current.type);
              zt[H] ||
                (_(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  Y(rt.current.type),
                  h.ref,
                ),
                (zt[H] = !0));
            }
          }
          function Ao(h, N) {
            {
              var H = function () {
                Mn ||
                  ((Mn = !0),
                  _(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    N,
                  ));
              };
              (H.isReactWarning = !0),
                Object.defineProperty(h, "key", {
                  get: H,
                  configurable: !0,
                });
            }
          }
          function Ro(h, N) {
            {
              var H = function () {
                $n ||
                  (($n = !0),
                  _(
                    "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    N,
                  ));
              };
              (H.isReactWarning = !0),
                Object.defineProperty(h, "ref", {
                  get: H,
                  configurable: !0,
                });
            }
          }
          var Do = function (h, N, H, Z, ie, ue, re) {
            var ne = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: h,
              key: N,
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
          function Io(h, N, H, Z, ie) {
            {
              var ue,
                re = {},
                ne = null,
                ve = null;
              H !== void 0 && (jn(H), (ne = "" + H)),
                To(N) && (jn(N.key), (ne = "" + N.key)),
                Co(N) && ((ve = N.ref), Oo(N, ie));
              for (ue in N)
                gt.call(N, ue) && !So.hasOwnProperty(ue) && (re[ue] = N[ue]);
              if (h && h.defaultProps) {
                var fe = h.defaultProps;
                for (ue in fe) re[ue] === void 0 && (re[ue] = fe[ue]);
              }
              if (ne || ve) {
                var pe =
                  typeof h == "function"
                    ? h.displayName || h.name || "Unknown"
                    : h;
                ne && Ao(re, pe), ve && Ro(re, pe);
              }
              return Do(h, ne, ve, ie, Z, rt.current, re);
            }
          }
          var Vt = b.ReactCurrentOwner,
            Ln = b.ReactDebugCurrentFrame;
          function Ue(h) {
            if (h) {
              var N = h._owner,
                H = Me(h.type, h._source, N ? N.type : null);
              Ln.setExtraStackFrame(H);
            } else Ln.setExtraStackFrame(null);
          }
          var Wt;
          Wt = !1;
          function qt(h) {
            return typeof h == "object" && h !== null && h.$$typeof === t;
          }
          function kn() {
            {
              if (Vt.current) {
                var h = Y(Vt.current.type);
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
          function wo(h) {
            {
              if (h !== void 0) {
                var N = h.fileName.replace(/^.*[\\\/]/, ""),
                  H = h.lineNumber;
                return (
                  `

Check your code at ` +
                  N +
                  ":" +
                  H +
                  "."
                );
              }
              return "";
            }
          }
          var Bn = {};
          function xo(h) {
            {
              var N = kn();
              if (!N) {
                var H = typeof h == "string" ? h : h.displayName || h.name;
                H &&
                  (N =
                    `

Check the top-level render call using <` +
                    H +
                    ">.");
              }
              return N;
            }
          }
          function Hn(h, N) {
            {
              if (!h._store || h._store.validated || h.key != null) return;
              h._store.validated = !0;
              var H = xo(N);
              if (Bn[H]) return;
              Bn[H] = !0;
              var Z = "";
              h &&
                h._owner &&
                h._owner !== Vt.current &&
                (Z = " It was passed a child from " + Y(h._owner.type) + "."),
                Ue(h),
                _(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  H,
                  Z,
                ),
                Ue(null);
            }
          }
          function Un(h, N) {
            {
              if (typeof h != "object") return;
              if (Ut(h))
                for (var H = 0; H < h.length; H++) {
                  var Z = h[H];
                  qt(Z) && Hn(Z, N);
                }
              else if (qt(h)) h._store && (h._store.validated = !0);
              else if (h) {
                var ie = v(h);
                if (typeof ie == "function" && ie !== h.entries)
                  for (var ue = ie.call(h), re; !(re = ue.next()).done; )
                    qt(re.value) && Hn(re.value, N);
              }
            }
          }
          function Po(h) {
            {
              var N = h.type;
              if (N == null || typeof N == "string") return;
              var H;
              if (typeof N == "function") H = N.propTypes;
              else if (
                typeof N == "object" &&
                (N.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  N.$$typeof === f)
              )
                H = N.propTypes;
              else return;
              if (H) {
                var Z = Y(N);
                mo(H, h.props, "prop", Z, h);
              } else if (N.PropTypes !== void 0 && !Wt) {
                Wt = !0;
                var ie = Y(N);
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
          function No(h) {
            {
              for (var N = Object.keys(h.props), H = 0; H < N.length; H++) {
                var Z = N[H];
                if (Z !== "children" && Z !== "key") {
                  Ue(h),
                    _(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      Z,
                    ),
                    Ue(null);
                  break;
                }
              }
              h.ref !== null &&
                (Ue(h),
                _("Invalid attribute `ref` supplied to `React.Fragment`."),
                Ue(null));
            }
          }
          function zn(h, N, H, Z, ie, ue) {
            {
              var re = O(h);
              if (!re) {
                var ne = "";
                (h === void 0 ||
                  (typeof h == "object" &&
                    h !== null &&
                    Object.keys(h).length === 0)) &&
                  (ne +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var ve = wo(ie);
                ve ? (ne += ve) : (ne += kn());
                var fe;
                h === null
                  ? (fe = "null")
                  : Ut(h)
                  ? (fe = "array")
                  : h !== void 0 && h.$$typeof === t
                  ? ((fe = "<" + (Y(h.type) || "Unknown") + " />"),
                    (ne =
                      " Did you accidentally export a JSX literal instead of a component?"))
                  : (fe = typeof h),
                  _(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    fe,
                    ne,
                  );
              }
              var pe = Io(h, N, H, ie, ue);
              if (pe == null) return pe;
              if (re) {
                var Se = N.children;
                if (Se !== void 0)
                  if (Z)
                    if (Ut(Se)) {
                      for (var ze = 0; ze < Se.length; ze++) Un(Se[ze], h);
                      Object.freeze && Object.freeze(Se);
                    } else
                      _(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      );
                  else Un(Se, h);
              }
              return h === n ? No(pe) : Po(pe), pe;
            }
          }
          function Fo(h, N, H) {
            return zn(h, N, H, !0);
          }
          function jo(h, N, H) {
            return zn(h, N, H, !1);
          }
          var Mo = jo,
            $o = Fo;
          (it.Fragment = n), (it.jsx = Mo), (it.jsxs = $o);
        })()),
    it
  );
}
process.env.NODE_ENV === "production"
  ? (on.exports = Xo())
  : (on.exports = Zo());
var j = on.exports;
const Jo = () => {
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
function Qo(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function ei(e) {
  return Qo(e) && "type" in e && typeof e.type == "string";
}
var xr = Symbol.for("immer-nothing"),
  Kn = Symbol.for("immer-draftable"),
  be = Symbol.for("immer-state"),
  ti =
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
function me(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const o = ti[e],
      n = typeof o == "function" ? o.apply(null, t) : o;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Xe = Object.getPrototypeOf;
function Fe(e) {
  return !!e && !!e[be];
}
function Pe(e) {
  var t;
  return e
    ? Pr(e) ||
        Array.isArray(e) ||
        !!e[Kn] ||
        !!((t = e.constructor) != null && t[Kn]) ||
        Mt(e) ||
        $t(e)
    : !1;
}
var ni = Object.prototype.constructor.toString();
function Pr(e) {
  if (!e || typeof e != "object") return !1;
  const t = Xe(e);
  if (t === null) return !0;
  const o = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return o === Object
    ? !0
    : typeof o == "function" && Function.toString.call(o) === ni;
}
function At(e, t) {
  jt(e) === 0
    ? Reflect.ownKeys(e).forEach((o) => {
        t(o, e[o], e);
      })
    : e.forEach((o, n) => t(n, o, e));
}
function jt(e) {
  const t = e[be];
  return t ? t.type_ : Array.isArray(e) ? 1 : Mt(e) ? 2 : $t(e) ? 3 : 0;
}
function sn(e, t) {
  return jt(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Nr(e, t, o) {
  const n = jt(e);
  n === 2 ? e.set(t, o) : n === 3 ? e.add(o) : (e[t] = o);
}
function ri(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Mt(e) {
  return e instanceof Map;
}
function $t(e) {
  return e instanceof Set;
}
function $e(e) {
  return e.copy_ || e.base_;
}
function an(e, t) {
  if (Mt(e)) return new Map(e);
  if ($t(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  if (!t && Pr(e))
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
function En(e, t = !1) {
  return (
    Lt(e) ||
      Fe(e) ||
      !Pe(e) ||
      (jt(e) > 1 && (e.set = e.add = e.clear = e.delete = oi),
      Object.freeze(e),
      t && Object.entries(e).forEach(([o, n]) => En(n, !0))),
    e
  );
}
function oi() {
  me(2);
}
function Lt(e) {
  return Object.isFrozen(e);
}
var ii = {};
function Be(e) {
  const t = ii[e];
  return t || me(0, e), t;
}
var lt;
function Fr() {
  return lt;
}
function si(e, t) {
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
function Gn(e, t) {
  t &&
    (Be("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function un(e) {
  cn(e), e.drafts_.forEach(ai), (e.drafts_ = null);
}
function cn(e) {
  e === lt && (lt = e.parent_);
}
function Xn(e) {
  return (lt = si(lt, e));
}
function ai(e) {
  const t = e[be];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function Zn(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const o = t.drafts_[0];
  return (
    e !== void 0 && e !== o
      ? (o[be].modified_ && (un(t), me(4)),
        Pe(e) && ((e = Rt(t, e)), t.parent_ || Dt(t, e)),
        t.patches_ &&
          Be("Patches").generateReplacementPatches_(
            o[be].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = Rt(t, o, [])),
    un(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== xr ? e : void 0
  );
}
function Rt(e, t, o) {
  if (Lt(t)) return t;
  const n = t[be];
  if (!n) return At(t, (r, i) => Jn(e, n, t, r, i, o)), t;
  if (n.scope_ !== e) return t;
  if (!n.modified_) return Dt(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    (n.finalized_ = !0), n.scope_.unfinalizedDrafts_--;
    const r = n.copy_;
    let i = r,
      s = !1;
    n.type_ === 3 && ((i = new Set(r)), r.clear(), (s = !0)),
      At(i, (a, c) => Jn(e, n, r, a, c, o, s)),
      Dt(e, r, !1),
      o &&
        e.patches_ &&
        Be("Patches").generatePatches_(n, o, e.patches_, e.inversePatches_);
  }
  return n.copy_;
}
function Jn(e, t, o, n, r, i, s) {
  if ((process.env.NODE_ENV !== "production" && r === o && me(5), Fe(r))) {
    const a =
        i &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !sn(t.assigned_, n)
          ? i.concat(n)
          : void 0,
      c = Rt(e, r, a);
    if ((Nr(o, n, c), Fe(c))) e.canAutoFreeze_ = !1;
    else return;
  } else s && o.add(r);
  if (Pe(r) && !Lt(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    Rt(e, r),
      (!t || !t.scope_.parent_) &&
        typeof n != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(o, n) &&
        Dt(e, r);
  }
}
function Dt(e, t, o = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && En(t, o);
}
function ui(e, t) {
  const o = Array.isArray(e),
    n = {
      type_: o ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : Fr(),
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
    i = bn;
  o && ((r = [n]), (i = ft));
  const { revoke: s, proxy: a } = Proxy.revocable(r, i);
  return (n.draft_ = a), (n.revoke_ = s), a;
}
var bn = {
    get(e, t) {
      if (t === be) return e;
      const o = $e(e);
      if (!sn(o, t)) return ci(e, o, t);
      const n = o[t];
      return e.finalized_ || !Pe(n)
        ? n
        : n === Yt(e.base_, t)
        ? (Kt(e), (e.copy_[t] = fn(n, e)))
        : n;
    },
    has(e, t) {
      return t in $e(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys($e(e));
    },
    set(e, t, o) {
      const n = jr($e(e), t);
      if (n != null && n.set) return n.set.call(e.draft_, o), !0;
      if (!e.modified_) {
        const r = Yt($e(e), t),
          i = r == null ? void 0 : r[be];
        if (i && i.base_ === o)
          return (e.copy_[t] = o), (e.assigned_[t] = !1), !0;
        if (ri(o, r) && (o !== void 0 || sn(e.base_, t))) return !0;
        Kt(e), ln(e);
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
        Yt(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), Kt(e), ln(e))
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
      me(11);
    },
    getPrototypeOf(e) {
      return Xe(e.base_);
    },
    setPrototypeOf() {
      me(12);
    },
  },
  ft = {};
At(bn, (e, t) => {
  ft[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
ft.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && me(13),
    ft.set.call(this, e, t, void 0)
  );
};
ft.set = function (e, t, o) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      me(14),
    bn.set.call(this, e[0], t, o, e[0])
  );
};
function Yt(e, t) {
  const o = e[be];
  return (o ? $e(o) : e)[t];
}
function ci(e, t, o) {
  var r;
  const n = jr(t, o);
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
function jr(e, t) {
  if (!(t in e)) return;
  let o = Xe(e);
  for (; o; ) {
    const n = Object.getOwnPropertyDescriptor(o, t);
    if (n) return n;
    o = Xe(o);
  }
}
function ln(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && ln(e.parent_));
}
function Kt(e) {
  e.copy_ || (e.copy_ = an(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var li = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, o, n) => {
        if (typeof t == "function" && typeof o != "function") {
          const i = o;
          o = t;
          const s = this;
          return function (c = i, ...l) {
            return s.produce(c, (u) => o.call(this, u, ...l));
          };
        }
        typeof o != "function" && me(6),
          n !== void 0 && typeof n != "function" && me(7);
        let r;
        if (Pe(t)) {
          const i = Xn(this),
            s = fn(t, void 0);
          let a = !0;
          try {
            (r = o(s)), (a = !1);
          } finally {
            a ? un(i) : cn(i);
          }
          return Gn(i, n), Zn(r, i);
        } else if (!t || typeof t != "object") {
          if (
            ((r = o(t)),
            r === void 0 && (r = t),
            r === xr && (r = void 0),
            this.autoFreeze_ && En(r, !0),
            n)
          ) {
            const i = [],
              s = [];
            Be("Patches").generateReplacementPatches_(t, r, i, s), n(i, s);
          }
          return r;
        } else me(1, t);
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
    Pe(e) || me(8), Fe(e) && (e = Mr(e));
    const t = Xn(this),
      o = fn(e, void 0);
    return (o[be].isManual_ = !0), cn(t), o;
  }
  finishDraft(e, t) {
    const o = e && e[be];
    (!o || !o.isManual_) && me(9);
    const { scope_: n } = o;
    return Gn(n, t), Zn(void 0, n);
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
    return Fe(e) ? n(e, t) : this.produce(e, (r) => n(r, t));
  }
};
function fn(e, t) {
  const o = Mt(e)
    ? Be("MapSet").proxyMap_(e, t)
    : $t(e)
    ? Be("MapSet").proxySet_(e, t)
    : ui(e, t);
  return (t ? t.scope_ : Fr()).drafts_.push(o), o;
}
function Mr(e) {
  return Fe(e) || me(10, e), $r(e);
}
function $r(e) {
  if (!Pe(e) || Lt(e)) return e;
  const t = e[be];
  let o;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (o = an(e, t.scope_.immer_.useStrictShallowCopy_));
  } else o = an(e, !0);
  return (
    At(o, (n, r) => {
      Nr(o, n, $r(r));
    }),
    t && (t.finalized_ = !1),
    o
  );
}
var _e = new li(),
  Lr = _e.produce;
_e.produceWithPatches.bind(_e);
_e.setAutoFreeze.bind(_e);
_e.setUseStrictShallowCopy.bind(_e);
_e.applyPatches.bind(_e);
_e.createDraft.bind(_e);
_e.finishDraft.bind(_e);
var fi = (e, t, o) => {
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
  di = (e, t, o) => {
    const { memoize: n, memoizeOptions: r } = t,
      { inputSelectorResults: i, inputSelectorResultsCopy: s } = e,
      a = n(() => ({}), ...r);
    if (!(a.apply(null, i) === a.apply(null, s))) {
      let l;
      try {
        throw new Error();
      } catch (u) {
        ({ stack: l } = u);
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
          stack: l,
        },
      );
    }
  },
  pi = {
    inputStabilityCheck: "once",
    identityFunctionCheck: "once",
  };
function hi(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function gi(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function vi(
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
var Qn = (e) => (Array.isArray(e) ? e : [e]);
function yi(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    vi(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function er(e, t) {
  const o = [],
    { length: n } = e;
  for (let r = 0; r < n; r++) o.push(e[r].apply(null, t));
  return o;
}
var mi = (e, t) => {
    const { identityFunctionCheck: o, inputStabilityCheck: n } = {
      ...pi,
      ...t,
    };
    return {
      identityFunctionCheck: {
        shouldRun: o === "always" || (o === "once" && e),
        run: fi,
      },
      inputStabilityCheck: {
        shouldRun: n === "always" || (n === "once" && e),
        run: di,
      },
    };
  },
  Ei = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  bi = typeof WeakRef < "u" ? WeakRef : Ei,
  _i = 0,
  tr = 1;
function yt() {
  return {
    s: _i,
    v: void 0,
    o: null,
    p: null,
  };
}
function _n(e, t = {}) {
  let o = yt();
  const { resultEqualityCheck: n } = t;
  let r,
    i = 0;
  function s() {
    var f;
    let a = o;
    const { length: c } = arguments;
    for (let d = 0, g = c; d < g; d++) {
      const p = arguments[d];
      if (typeof p == "function" || (typeof p == "object" && p !== null)) {
        let y = a.o;
        y === null && (a.o = y = /* @__PURE__ */ new WeakMap());
        const v = y.get(p);
        v === void 0 ? ((a = yt()), y.set(p, a)) : (a = v);
      } else {
        let y = a.p;
        y === null && (a.p = y = /* @__PURE__ */ new Map());
        const v = y.get(p);
        v === void 0 ? ((a = yt()), y.set(p, a)) : (a = v);
      }
    }
    const l = a;
    let u;
    if (
      (a.s === tr ? (u = a.v) : ((u = e.apply(null, arguments)), i++),
      (l.s = tr),
      n)
    ) {
      const d =
        ((f = r == null ? void 0 : r.deref) == null ? void 0 : f.call(r)) ?? r;
      d != null && n(d, u) && ((u = d), i !== 0 && i--),
        (r =
          (typeof u == "object" && u !== null) || typeof u == "function"
            ? new bi(u)
            : u);
    }
    return (l.v = u), u;
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
function kr(e, ...t) {
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
        l = r.pop();
      typeof l == "object" && ((c = l), (l = r.pop())),
        hi(
          l,
          `createSelector expects an output function after the inputs, but received: [${typeof l}]`,
        );
      const u = {
          ...o,
          ...c,
        },
        {
          memoize: f,
          memoizeOptions: d = [],
          argsMemoize: g = _n,
          argsMemoizeOptions: p = [],
          devModeChecks: y = {},
        } = u,
        v = Qn(d),
        b = Qn(p),
        _ = yi(r),
        S = f(
          function () {
            return i++, l.apply(null, arguments);
          },
          ...v,
        );
      let A = !0;
      const E = g(
        function () {
          s++;
          const F = er(_, arguments);
          if (((a = S.apply(null, F)), process.env.NODE_ENV !== "production")) {
            const { identityFunctionCheck: m, inputStabilityCheck: $ } = mi(
              A,
              y,
            );
            if ((m.shouldRun && m.run(l, F, a), $.shouldRun)) {
              const O = er(_, arguments);
              $.run(
                { inputSelectorResults: F, inputSelectorResultsCopy: O },
                { memoize: f, memoizeOptions: v },
                arguments,
              );
            }
            A && (A = !1);
          }
          return a;
        },
        ...b,
      );
      return Object.assign(E, {
        resultFunc: l,
        memoizedResultFunc: S,
        dependencies: _,
        dependencyRecomputations: () => s,
        resetDependencyRecomputations: () => {
          s = 0;
        },
        lastResult: () => a,
        recomputations: () => i,
        resetRecomputations: () => {
          i = 0;
        },
        memoize: f,
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
var Si = /* @__PURE__ */ kr(_n),
  Ci = Object.assign(
    (e, t = Si) => {
      gi(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const o = Object.keys(e),
        n = o.map((i) => e[i]);
      return t(n, (...i) => i.reduce((s, a, c) => ((s[o[c]] = a), s), {}));
    },
    { withTypes: () => Ci },
  ),
  Ti = (...e) => {
    const t = kr(...e),
      o = Object.assign(
        (...n) => {
          const r = t(...n),
            i = (s, ...a) => r(Fe(s) ? Mr(s) : s, ...a);
          return Object.assign(i, r), i;
        },
        {
          withTypes: () => o,
        },
      );
    return o;
  };
Ti(_n);
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
    (o.match = (n) => ei(n) && n.type === e),
    o
  );
}
function nr(e) {
  return Pe(e) ? Lr(e, () => {}) : e;
}
function rr(e, t, o) {
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
function Br(e) {
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
function Oi(e) {
  return typeof e == "function";
}
function Ai(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(
      process.env.NODE_ENV === "production"
        ? de(8)
        : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer",
    );
  let [o, n, r] = Br(t),
    i;
  if (Oi(e)) i = () => nr(e());
  else {
    const a = nr(e);
    i = () => a;
  }
  function s(a = i(), c) {
    let l = [
      o[c.type],
      ...n.filter(({ matcher: u }) => u(c)).map(({ reducer: u }) => u),
    ];
    return (
      l.filter((u) => !!u).length === 0 && (l = [r]),
      l.reduce((u, f) => {
        if (f)
          if (Fe(u)) {
            const g = f(u, c);
            return g === void 0 ? u : g;
          } else {
            if (Pe(u)) return Lr(u, (d) => f(d, c));
            {
              const d = f(u, c);
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
var Ri = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  Di = (e = 21) => {
    let t = "",
      o = e;
    for (; o--; ) t += Ri[(Math.random() * 64) | 0];
    return t;
  },
  Ii = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function wi(e, t) {
  return `${e}/${t}`;
}
function xi({ creators: e } = {}) {
  var o;
  const t = (o = e == null ? void 0 : e.asyncThunk) == null ? void 0 : o[Ii];
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
        (typeof r.reducers == "function" ? r.reducers(Fi()) : r.reducers) || {},
      c = Object.keys(a),
      l = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      u = {
        addCase(S, A) {
          const E = typeof S == "string" ? S : S.type;
          if (!E)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? de(12)
                : "`context.addCase` cannot be called with an empty action type",
            );
          if (E in l.sliceCaseReducersByType)
            throw new Error(
              process.env.NODE_ENV === "production"
                ? de(13)
                : "`context.addCase` cannot be called with two reducers for the same action type: " +
                  E,
            );
          return (l.sliceCaseReducersByType[E] = A), u;
        },
        addMatcher(S, A) {
          return (
            l.sliceMatchers.push({
              matcher: S,
              reducer: A,
            }),
            u
          );
        },
        exposeAction(S, A) {
          return (l.actionCreators[S] = A), u;
        },
        exposeCaseReducer(S, A) {
          return (l.sliceCaseReducersByName[S] = A), u;
        },
      };
    c.forEach((S) => {
      const A = a[S],
        E = {
          reducerName: S,
          type: wi(i, S),
          createNotation: typeof r.reducers == "function",
        };
      Mi(A) ? Li(E, A, u, t) : ji(E, A, u);
    });
    function f() {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof r.extraReducers == "object"
      )
        throw new Error(
          process.env.NODE_ENV === "production"
            ? de(14)
            : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
        );
      const [S = {}, A = [], E = void 0] =
          typeof r.extraReducers == "function"
            ? Br(r.extraReducers)
            : [r.extraReducers],
        P = {
          ...S,
          ...l.sliceCaseReducersByType,
        };
      return Ai(r.initialState, (F) => {
        for (let m in P) F.addCase(m, P[m]);
        for (let m of l.sliceMatchers) F.addMatcher(m.matcher, m.reducer);
        for (let m of A) F.addMatcher(m.matcher, m.reducer);
        E && F.addDefaultCase(E);
      });
    }
    const d = (S) => S,
      g = /* @__PURE__ */ new Map();
    let p;
    function y(S, A) {
      return p || (p = f()), p(S, A);
    }
    function v() {
      return p || (p = f()), p.getInitialState();
    }
    function b(S, A = !1) {
      function E(F) {
        let m = F[S];
        if (typeof m > "u") {
          if (A) m = v();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(
              process.env.NODE_ENV === "production"
                ? de(15)
                : "selectSlice returned undefined for an uninjected slice reducer",
            );
        }
        return m;
      }
      function P(F = d) {
        const m = rr(g, A, {
          insert: () => /* @__PURE__ */ new WeakMap(),
        });
        return rr(m, F, {
          insert: () => {
            const $ = {};
            for (const [O, M] of Object.entries(r.selectors ?? {}))
              $[O] = Pi(M, F, v, A);
            return $;
          },
        });
      }
      return {
        reducerPath: S,
        getSelectors: P,
        get selectors() {
          return P(E);
        },
        selectSlice: E,
      };
    }
    const _ = {
      name: i,
      reducer: y,
      actions: l.actionCreators,
      caseReducers: l.sliceCaseReducersByName,
      getInitialState: v,
      ...b(s),
      injectInto(S, { reducerPath: A, ...E } = {}) {
        const P = A ?? s;
        return (
          S.inject(
            {
              reducerPath: P,
              reducer: y,
            },
            E,
          ),
          {
            ..._,
            ...b(P, !0),
          }
        );
      },
    };
    return _;
  };
}
function Pi(e, t, o, n) {
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
var Ni = /* @__PURE__ */ xi();
function Fi() {
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
function ji({ type: e, reducerName: t, createNotation: o }, n, r) {
  let i, s;
  if ("reducer" in n) {
    if (o && !$i(n))
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
function Mi(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function $i(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Li({ type: e, reducerName: t }, o, n, r) {
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
      settled: l,
      options: u,
    } = o,
    f = r(e, i, u);
  n.exposeAction(t, f),
    s && n.addCase(f.fulfilled, s),
    a && n.addCase(f.pending, a),
    c && n.addCase(f.rejected, c),
    l && n.addMatcher(f.settled, l),
    n.exposeCaseReducer(t, {
      fulfilled: s || mt,
      pending: a || mt,
      rejected: c || mt,
      settled: l || mt,
    });
}
function mt() {}
var ki = (e, t) => {
    if (typeof e != "function")
      throw new Error(
        process.env.NODE_ENV === "production"
          ? de(32)
          : `${t} is not a function`,
      );
  },
  Sn = "listenerMiddleware",
  Bi = (e) => {
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
      ki(i, "options.listener"),
      {
        predicate: r,
        type: t,
        effect: i,
      }
    );
  },
  Hi = Object.assign(
    (e) => {
      const { type: t, predicate: o, effect: n } = Bi(e);
      return {
        id: Di(),
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
      withTypes: () => Hi,
    },
  ),
  Ui = Object.assign(Ze(`${Sn}/add`), {
    withTypes: () => Ui,
  });
Ze(`${Sn}/removeAll`);
var zi = Object.assign(Ze(`${Sn}/remove`), {
  withTypes: () => zi,
});
function de(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Vi = {
    users: {},
    isRightPanelOpen: !1,
    selectedConversationId: void 0,
    conversations: {},
    conversationsLoadingState: Ce.UNINITIALIZED,
    newConversation: void 0,
    shareId: void 0,
    docsAppRendered: !1,
    currentPage: Jo(),
    codeblockLoaded: !1,
    source: void 0,
  },
  It = Ni({
    name: "appState",
    initialState: Vi,
    reducers: {
      setDocsAppRendered: (e, t) => {
        e.docsAppRendered = t.payload;
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
        e.newConversation = { ...e.newConversation, ...t.payload };
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
    setCurrentUserId: cc,
    setShareId: lc,
    updateSelectedConversationId: Cn,
    updateRightPanelState: Tn,
    setUsers: Wi,
    setConversations: qi,
    resetNewConversation: Hr,
    updateNewConversation: Yi,
    upsertConversation: fc,
    setDocsAppRendered: dc,
    updateCurrentPage: pc,
    updateCodeblockLoaded: hc,
    resolveConversationGroup: Ki,
    setConversationsLoadingState: or,
    refetchConversations: Ur,
    setConversationSource: gc,
  } = It.actions,
  kt = Qe({
    state: It.getInitialState(),
    dispatch: () => null,
    getValue: () => null,
  }),
  Gi = ({
    children: e,
    shareId: t,
    userId: o,
    conversationGroupId: n,
    source: r,
  }) => {
    const [i, s] = Lo(It.reducer, {
        ...It.getInitialState(),
        shareId: t,
        currentUserId: o,
        selectedConversationId: n,
        isRightPanelOpen: !!n,
        source: r,
      }),
      a = Ke((l) => l(i), [i]),
      c = ct(
        () => ({
          state: i,
          dispatch: s,
          getValue: a,
        }),
        [i, s, a],
      );
    return /* @__PURE__ */ j.jsx(kt.Provider, { value: c, children: e });
  },
  Xi = Gi,
  Zi = () => et(kt),
  le = (e) => {
    const { getValue: t } = et(kt);
    return t(e);
  },
  De = () => {
    const { dispatch: e } = et(kt);
    return e;
  },
  Ji = Qe({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  Qi = Qe(null),
  es = typeof document < "u",
  zr = es ? ko : Re;
class ir {
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
function ts(e) {
  let t = new ir(),
    o = new ir(),
    n = 0,
    r = !1,
    i = !1;
  const s = /* @__PURE__ */ new WeakSet(),
    a = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (c, l = !1, u = !1) => {
        const f = u && r,
          d = f ? t : o;
        return l && s.add(c), d.add(c) && f && r && (n = t.order.length), c;
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
          for (let l = 0; l < n; l++) {
            const u = t.order[l];
            s.has(u) && (a.schedule(u), e()), u(c);
          }
        (r = !1), i && ((i = !1), a.process(c));
      },
    };
  return a;
}
const Et = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
    // Compute
  ],
  ns = 40;
function rs(e, t) {
  let o = !1,
    n = !0;
  const r = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    i = Et.reduce((f, d) => ((f[d] = ts(() => (o = !0))), f), {}),
    s = (f) => {
      i[f].process(r);
    },
    a = () => {
      const f = performance.now();
      (o = !1),
        (r.delta = n ? 1e3 / 60 : Math.max(Math.min(f - r.timestamp, ns), 1)),
        (r.timestamp = f),
        (r.isProcessing = !0),
        Et.forEach(s),
        (r.isProcessing = !1),
        o && t && ((n = !1), e(a));
    },
    c = () => {
      (o = !0), (n = !0), r.isProcessing || e(a);
    };
  return {
    schedule: Et.reduce((f, d) => {
      const g = i[d];
      return (f[d] = (p, y = !1, v = !1) => (o || c(), g.schedule(p, y, v))), f;
    }, {}),
    cancel: (f) => Et.forEach((d) => i[d].cancel(f)),
    state: r,
    steps: i,
  };
}
const os = Qe({});
function is(e) {
  const t = Te(null);
  return t.current === null && (t.current = e()), t.current;
}
const ss = (e) => e,
  {
    schedule: as,
    cancel: vc,
    state: yc,
    steps: mc,
  } = rs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ss, !0);
function Vr() {
  const e = Te(!1);
  return (
    zr(
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
function us() {
  const e = Vr(),
    [t, o] = ge(0),
    n = Ke(() => {
      e.current && o(t + 1);
    }, [t]);
  return [Ke(() => as.postRender(n), [n]), t];
}
class cs extends Ee.Component {
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
function ls({ children: e, isPresent: t }) {
  const o = Dr(),
    n = Te(null),
    r = Te({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce: i } = et(Ji);
  return (
    Bo(() => {
      const { width: s, height: a, top: c, left: l } = r.current;
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
            left: ${l}px !important;
          }
        `),
        () => {
          document.head.removeChild(u);
        }
      );
    }, [t]),
    Ee.createElement(
      cs,
      { isPresent: t, childRef: n, sizeRef: r },
      Ee.cloneElement(e, { ref: n }),
    )
  );
}
const Gt = ({
  children: e,
  initial: t,
  isPresent: o,
  onExitComplete: n,
  custom: r,
  presenceAffectsLayout: i,
  mode: s,
}) => {
  const a = is(fs),
    c = Dr(),
    l = ct(
      () => ({
        id: c,
        initial: t,
        isPresent: o,
        custom: r,
        onExitComplete: (u) => {
          a.set(u, !0);
          for (const f of a.values()) if (!f) return;
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
    ct(() => {
      a.forEach((u, f) => a.set(f, !1));
    }, [o]),
    Ee.useEffect(() => {
      !o && !a.size && n && n();
    }, [o]),
    s === "popLayout" && (e = Ee.createElement(ls, { isPresent: o }, e)),
    Ee.createElement(Qi.Provider, { value: l }, e)
  );
};
function fs() {
  return /* @__PURE__ */ new Map();
}
function ds(e) {
  return Re(() => () => e(), []);
}
const Le = (e) => e.key || "";
function ps(e, t) {
  e.forEach((o) => {
    const n = Le(o);
    t.set(n, o);
  });
}
function hs(e) {
  const t = [];
  return (
    Ge.forEach(e, (o) => {
      Ir(o) && t.push(o);
    }),
    t
  );
}
const gs = ({
    children: e,
    custom: t,
    initial: o = !0,
    onExitComplete: n,
    exitBeforeEnter: r,
    presenceAffectsLayout: i = !0,
    mode: s = "sync",
  }) => {
    const a = et(os).forceRender || us()[0],
      c = Vr(),
      l = hs(e);
    let u = l;
    const f = Te(/* @__PURE__ */ new Map()).current,
      d = Te(u),
      g = Te(/* @__PURE__ */ new Map()).current,
      p = Te(!0);
    if (
      (zr(() => {
        (p.current = !1), ps(l, g), (d.current = u);
      }),
      ds(() => {
        (p.current = !0), g.clear(), f.clear();
      }),
      p.current)
    )
      return Ee.createElement(
        Ee.Fragment,
        null,
        u.map((_) =>
          Ee.createElement(
            Gt,
            {
              key: Le(_),
              isPresent: !0,
              initial: o ? void 0 : !1,
              presenceAffectsLayout: i,
              mode: s,
            },
            _,
          ),
        ),
      );
    u = [...u];
    const y = d.current.map(Le),
      v = l.map(Le),
      b = y.length;
    for (let _ = 0; _ < b; _++) {
      const S = y[_];
      v.indexOf(S) === -1 && !f.has(S) && f.set(S, void 0);
    }
    return (
      s === "wait" && f.size && (u = []),
      f.forEach((_, S) => {
        if (v.indexOf(S) !== -1) return;
        const A = g.get(S);
        if (!A) return;
        const E = y.indexOf(S);
        let P = _;
        if (!P) {
          const F = () => {
            f.delete(S);
            const m = Array.from(g.keys()).filter(($) => !v.includes($));
            if (
              (m.forEach(($) => g.delete($)),
              (d.current = l.filter(($) => {
                const O = Le($);
                return (
                  // filter out the node exiting
                  O === S || // filter out the leftover children
                  m.includes(O)
                );
              })),
              !f.size)
            ) {
              if (c.current === !1) return;
              a(), n && n();
            }
          };
          (P = Ee.createElement(
            Gt,
            {
              key: Le(A),
              isPresent: !1,
              onExitComplete: F,
              custom: t,
              presenceAffectsLayout: i,
              mode: s,
            },
            A,
          )),
            f.set(S, P);
        }
        u.splice(E, 0, P);
      }),
      (u = u.map((_) => {
        const S = _.key;
        return f.has(S)
          ? _
          : Ee.createElement(
              Gt,
              { key: Le(_), isPresent: !0, presenceAffectsLayout: i, mode: s },
              _,
            );
      })),
      process.env.NODE_ENV !== "production" &&
        s === "wait" &&
        u.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
        ),
      Ee.createElement(Ee.Fragment, null, f.size ? u : u.map((_) => Ho(_)))
    );
  },
  Bt = "altimate-display-",
  vs = `${Bt}-highlight`,
  sr = `${Bt}-highlight-hover`,
  ys = `${Bt}-active-highlight`,
  ms = 1049,
  On = ({ icon: e, className: t = "", ...o }) =>
    /* @__PURE__ */ j.jsx("i", {
      className: `${t} codicon codicon-${e}`,
      ...o,
    }),
  Es = (e) => /* @__PURE__ */ j.jsx(On, { icon: "comment", ...e }),
  bs = (e) => /* @__PURE__ */ j.jsx(On, { icon: "check", ...e }),
  _s = (e) => /* @__PURE__ */ j.jsx(On, { icon: "send", ...e }),
  Ss = "_iconButton_eti7u_1",
  Cs = {
    iconButton: Ss,
  },
  Ts = (e) =>
    /* @__PURE__ */ j.jsx(ws, {
      title: e.title,
      children: /* @__PURE__ */ j.jsx("button", {
        ...e,
        className: `btn ${e.color ? `btn-${e.color}` : ""} ${
          e.className ?? ""
        } ${Cs.iconButton}`,
        type: e.type ?? "button",
        children: e.children,
      }),
    }),
  Os = Ts,
  As = Qe(null),
  Xt = {
    didCatch: !1,
    error: null,
  };
class Rs extends Uo {
  constructor(t) {
    super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = Xt);
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
        this.setState(Xt);
    }
  }
  componentDidCatch(t, o) {
    var n, r;
    (n = (r = this.props).onError) === null || n === void 0 || n.call(r, t, o);
  }
  componentDidUpdate(t, o) {
    const { didCatch: n } = this.state,
      { resetKeys: r } = this.props;
    if (n && o.error !== null && Ds(t.resetKeys, r)) {
      var i, s;
      (i = (s = this.props).onReset) === null ||
        i === void 0 ||
        i.call(s, {
          next: r,
          prev: t.resetKeys,
          reason: "keys",
        }),
        this.setState(Xt);
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
      else if (n) a = Wn(n, c);
      else if (r === null || Ir(r)) a = r;
      else throw s;
    }
    return Wn(
      As.Provider,
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
function Ds() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((o, n) => !Object.is(o, t[n]));
}
const Is = (e) => {
    const [t, o] = ge(!1),
      n = () => o(!t),
      r = Te(
        (
          e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
        ).replace(/\s/g, "-"),
      );
    return /* @__PURE__ */ j.jsxs(Rs, {
      fallback: /* @__PURE__ */ j.jsx("span", {
        id: r.current,
        children: e.children,
      }),
      children: [
        /* @__PURE__ */ j.jsx("span", { id: r.current, children: e.children }),
        e.title
          ? /* @__PURE__ */ j.jsx(Vo, {
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
  ws = Is,
  xs = "_loadingBtn_gadec_1",
  Ps = {
    loadingBtn: xs,
  },
  Ns = ({ loading: e, ...t }) =>
    /* @__PURE__ */ j.jsx(Nt, {
      ...t,
      disabled: e ?? t.disabled,
      className: `${t.className ?? ""} ${Ps.loadingBtn}`,
      children: e ? /* @__PURE__ */ j.jsx(Wo, {}) : t.children,
    }),
  Fs = Ns,
  js = ({ pos: e, onAddComment: t }) =>
    wr(
      /* @__PURE__ */ j.jsx(gs, {
        children:
          e &&
          /* @__PURE__ */ j.jsx(Nt, {
            onClick: t,
            id: `${Bt}-highlight`,
            style: {
              position: "absolute",
              top: e.y,
              left: e.x,
              // right: "15px",
              zIndex: ms + 5,
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
            children: /* @__PURE__ */ j.jsx(Es, {}),
          }),
      }),
      e.element.parentElement,
    ),
  Ms = js,
  $s = () => {
    const {
        state: { isRightPanelOpen: e },
      } = Zi(),
      t = De(),
      o = () => {
        t(Tn(!e));
      };
    return /* @__PURE__ */ j.jsx(Nt, {
      onClick: o,
      children: e ? "Hide conversations" : "Show conversations",
    });
  },
  Ls = $s,
  tt = {
    get: async (e, t, o) => ({}),
    post: async (e, t, o) => ({}),
  },
  ks = (e) => tt.get(`dbt/dbt_docs_share/${e}`),
  Bs = (e, t) => tt.post(`dbt/dbt_docs_share/${e}/conversation_group`, t),
  Hs = (e, t, o) =>
    tt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`, o),
  Us = (e) => tt.get(`dbt/dbt_docs_share/${e}/conversations`),
  zs = (e) => tt.get("/users/", { company: e }),
  Vs = (e, t) =>
    tt.post(`dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`, {
      resolved: !0,
    }),
  Ws = () => {
    const e = le((s) => s.shareId),
      [t, o] = ge(null),
      [n, r] = ge(!1),
      i = Ke(async () => {
        if (!e) return;
        r(!0);
        const s = await ks(e);
        if (s) {
          o(s);
          const a = document.getElementById("collapse-sidebar");
          a == null || a.click();
        }
        r(!1);
      }, [e]);
    return (
      Re(() => {
        !e || t || n || i();
      }, [e, t, i, n]),
      { shareDetails: t, loading: n }
    );
  };
var Wr = { exports: {} };
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
                function (l) {
                  return i[l];
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
            ((i = function (f, d) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (g, p) {
                    g.__proto__ = p;
                  }) ||
                function (g, p) {
                  for (var y in p)
                    Object.prototype.hasOwnProperty.call(p, y) && (g[y] = p[y]);
                })(f, d);
            }),
            function (f, d) {
              function g() {
                this.constructor = f;
              }
              i(f, d),
                (f.prototype =
                  d === null
                    ? Object.create(d)
                    : ((g.prototype = d.prototype), new g()));
            }),
          a =
            (this && this.__importDefault) ||
            function (f) {
              return f && f.__esModule ? f : { default: f };
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
          l = a(r(2));
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
        var u = (function (f) {
          function d() {
            return (f !== null && f.apply(this, arguments)) || this;
          }
          return s(d, f), d;
        })(l.default);
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
            function (c, l) {
              var u = typeof Symbol == "function" && c[Symbol.iterator];
              if (!u) return c;
              var f,
                d,
                g = u.call(c),
                p = [];
              try {
                for (; (l === void 0 || l-- > 0) && !(f = g.next()).done; )
                  p.push(f.value);
              } catch (y) {
                d = { error: y };
              } finally {
                try {
                  f && !f.done && (u = g.return) && u.call(g);
                } finally {
                  if (d) throw d.error;
                }
              }
              return p;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var c = [], l = 0; l < arguments.length; l++)
                c = c.concat(i(arguments[l]));
              return c;
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = (function () {
          function c() {
            this.handlersMap = /* @__PURE__ */ Object.create(null);
          }
          return (
            (c.prototype.on = function (l, u) {
              return (
                this.handlersMap[l] || (this.handlersMap[l] = []),
                this.handlersMap[l].push(u),
                this
              );
            }),
            (c.prototype.off = function (l, u) {
              return (
                this.handlersMap[l] &&
                  this.handlersMap[l].splice(
                    this.handlersMap[l].indexOf(u) >>> 0,
                    1,
                  ),
                this
              );
            }),
            (c.prototype.emit = function (l) {
              for (var u = [], f = 1; f < arguments.length; f++)
                u[f - 1] = arguments[f];
              return (
                this.handlersMap[l] &&
                  this.handlersMap[l].slice().forEach(function (d) {
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
          function (l) {
            return l && l.__esModule ? l : { default: l };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = i(r(5)),
          a = r(9),
          c = (function () {
            function l(u, f, d, g, p) {
              (this.startMeta = u),
                (this.endMeta = f),
                (this.text = d),
                (this.id = g),
                (this.__isHighlightSource = {}),
                p && (this.extra = p);
            }
            return (
              (l.prototype.deSerialize = function (u, f) {
                var d = a.queryElementNode(this, u),
                  g = d.start,
                  p = d.end,
                  y = a.getTextChildByOffset(g, this.startMeta.textOffset),
                  v = a.getTextChildByOffset(p, this.endMeta.textOffset);
                if (!f.Serialize.Restore.isEmpty()) {
                  var b = f.Serialize.Restore.call(this, y, v) || [];
                  (y = b[0] || y), (v = b[1] || v);
                }
                return new s.default(y, v, this.text, this.id, !0);
              }),
              l
            );
          })();
        n.default = c;
      },
      function (o, n, r) {
        var i =
            (this && this.__values) ||
            function (u) {
              var f = typeof Symbol == "function" && Symbol.iterator,
                d = f && u[f],
                g = 0;
              if (d) return d.call(u);
              if (u && typeof u.length == "number")
                return {
                  next: function () {
                    return (
                      u && g >= u.length && (u = void 0),
                      { value: u && u[g++], done: !u }
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
            function (u, f) {
              var d = typeof Symbol == "function" && u[Symbol.iterator];
              if (!d) return u;
              var g,
                p,
                y = d.call(u),
                v = [];
              try {
                for (; (f === void 0 || f-- > 0) && !(g = y.next()).done; )
                  v.push(g.value);
              } catch (b) {
                p = { error: b };
              } finally {
                try {
                  g && !g.done && (d = y.return) && d.call(y);
                } finally {
                  if (p) throw p.error;
                }
              }
              return v;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var u = [], f = 0; f < arguments.length; f++)
                u = u.concat(s(arguments[f]));
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
        var l = function (u, f) {
          for (var d = !1, g = null; u; ) {
            if ((n.isHighlightWrapNode(u) && (g = u), u === f)) {
              d = !0;
              break;
            }
            u = u.parentNode;
          }
          return d ? g : null;
        };
        (n.getHighlightId = function (u, f) {
          return (u = l(u, f)) ? u.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
        }),
          (n.getExtraHighlightId = function (u, f) {
            return (u = l(u, f))
              ? u.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA]
                  .split(c.ID_DIVISION)
                  .filter(function (d) {
                    return d;
                  })
              : [];
          }),
          (n.getHighlightsByRoot = function (u, f) {
            var d, g;
            Array.isArray(u) || (u = [u]);
            var p = [];
            try {
              for (var y = i(u), v = y.next(); !v.done; v = y.next()) {
                var b = v.value.querySelectorAll(
                  f + "[data-" + c.DATASET_IDENTIFIER + "]",
                );
                p.push.apply(p, b);
              }
            } catch (_) {
              d = { error: _ };
            } finally {
              try {
                v && !v.done && (g = y.return) && g.call(y);
              } finally {
                if (d) throw d.error;
              }
            }
            return p;
          }),
          (n.getHighlightById = function (u, f, d) {
            var g,
              p,
              y = [],
              v = new RegExp(
                "(" +
                  f +
                  "\\" +
                  c.ID_DIVISION +
                  "|\\" +
                  c.ID_DIVISION +
                  "?" +
                  f +
                  "$)",
              ),
              b = u.querySelectorAll(d + "[data-" + c.DATASET_IDENTIFIER + "]");
            try {
              for (var _ = i(b), S = _.next(); !S.done; S = _.next()) {
                var A = S.value;
                if (A.dataset[c.CAMEL_DATASET_IDENTIFIER] !== f) {
                  var E = A.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
                  v.test(E) && y.push(A);
                } else y.push(A);
              }
            } catch (P) {
              g = { error: P };
            } finally {
              try {
                S && !S.done && (p = _.return) && p.call(_);
              } finally {
                if (g) throw g.error;
              }
            }
            return y;
          }),
          (n.forEach = function (u, f) {
            for (var d = 0; d < u.length; d++) f(u[d], d, u);
          }),
          (n.removeEventListener = function (u, f, d) {
            u.removeEventListener(f, d);
          }),
          (n.addEventListener = function (u, f, d) {
            return (
              u.addEventListener(f, d),
              function () {
                n.removeEventListener(u, f, d);
              }
            );
          }),
          (n.addClass = function (u, f) {
            var d;
            Array.isArray(f) || (f = [f]), (d = u.classList).add.apply(d, a(f));
          }),
          (n.removeClass = function (u, f) {
            u.classList.remove(f);
          }),
          (n.removeAllClass = function (u) {
            u.className = "";
          }),
          (n.hasClass = function (u, f) {
            return u.classList.contains(f);
          });
      },
      function (o, n, r) {
        var i =
          (this && this.__importDefault) ||
          function (g) {
            return g && g.__esModule ? g : { default: g };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = i(r(3)),
          a = r(1),
          c = r(11),
          l = i(r(6)),
          u = r(12),
          f = r(0),
          d = (function () {
            function g(p, y, v, b, _) {
              _ === void 0 && (_ = !1),
                (p.$node.nodeType === 3 && y.$node.nodeType === 3) ||
                  f.eventEmitter.emit(f.INTERNAL_ERROR_EVENT, {
                    type: a.ERROR.RANGE_NODE_INVALID,
                  }),
                (this.start = u.formatDomNode(p)),
                (this.end = u.formatDomNode(y)),
                (this.text = v),
                (this.frozen = _),
                (this.id = b);
            }
            return (
              (g.fromSelection = function (p) {
                var y = c.getDomRange();
                if (!y) return null;
                var v = { $node: y.startContainer, offset: y.startOffset },
                  b = { $node: y.endContainer, offset: y.endOffset },
                  _ = y.toString(),
                  S = p.call(v, b, _);
                return new g(v, b, _, (S = S ?? l.default()));
              }),
              (g.prototype.serialize = function (p, y) {
                var v,
                  b = u.getDomMeta(this.start.$node, this.start.offset, p),
                  _ = u.getDomMeta(this.end.$node, this.end.offset, p);
                return (
                  y.Serialize.RecordInfo.isEmpty() ||
                    (v = y.Serialize.RecordInfo.call(this.start, this.end, p)),
                  (this.frozen = !0),
                  new s.default(b, _, this.text, this.id, v)
                );
              }),
              (g.removeDomRange = c.removeSelection),
              g
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
            ((i = function (E, P) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (F, m) {
                    F.__proto__ = m;
                  }) ||
                function (F, m) {
                  for (var $ in m)
                    Object.prototype.hasOwnProperty.call(m, $) && (F[$] = m[$]);
                })(E, P);
            }),
            function (E, P) {
              function F() {
                this.constructor = E;
              }
              i(E, P),
                (E.prototype =
                  P === null
                    ? Object.create(P)
                    : ((F.prototype = P.prototype), new F()));
            }),
          a =
            (this && this.__assign) ||
            function () {
              return (a =
                Object.assign ||
                function (E) {
                  for (var P, F = 1, m = arguments.length; F < m; F++)
                    for (var $ in (P = arguments[F]))
                      Object.prototype.hasOwnProperty.call(P, $) &&
                        (E[$] = P[$]);
                  return E;
                }).apply(this, arguments);
            },
          c =
            (this && this.__importDefault) ||
            function (E) {
              return E && E.__esModule ? E : { default: E };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var l = c(r(2)),
          u = c(r(5)),
          f = c(r(3)),
          d = c(r(6)),
          g = c(r(13)),
          p = c(r(14)),
          y = c(r(16)),
          v = c(r(17)),
          b = r(0),
          _ = r(1),
          S = r(4),
          A = (function (E) {
            function P(F) {
              var m = E.call(this) || this;
              (m.event = p.default()),
                (m.run = function () {
                  return S.addEventListener(
                    m.options.$root,
                    m.event.PointerEnd,
                    m._handleSelection,
                  );
                }),
                (m.stop = function () {
                  S.removeEventListener(
                    m.options.$root,
                    m.event.PointerEnd,
                    m._handleSelection,
                  );
                }),
                (m.addClass = function (O, M) {
                  m.getDoms(M).forEach(function (q) {
                    S.addClass(q, O);
                  });
                }),
                (m.removeClass = function (O, M) {
                  m.getDoms(M).forEach(function (q) {
                    S.removeClass(q, O);
                  });
                }),
                (m.getIdByDom = function (O) {
                  return S.getHighlightId(O, m.options.$root);
                }),
                (m.getExtraIdByDom = function (O) {
                  return S.getExtraHighlightId(O, m.options.$root);
                }),
                (m.getDoms = function (O) {
                  return O
                    ? S.getHighlightById(m.options.$root, O, m.options.wrapTag)
                    : S.getHighlightsByRoot(m.options.$root, m.options.wrapTag);
                }),
                (m.dispose = function () {
                  var O = m.options.$root;
                  S.removeEventListener(
                    O,
                    m.event.PointerOver,
                    m._handleHighlightHover,
                  ),
                    S.removeEventListener(
                      O,
                      m.event.PointerEnd,
                      m._handleSelection,
                    ),
                    S.removeEventListener(
                      O,
                      m.event.PointerTap,
                      m._handleHighlightClick,
                    ),
                    m.removeAll();
                }),
                (m.setOption = function (O) {
                  (m.options = a(a({}, m.options), O)),
                    (m.painter = new v.default(
                      {
                        $root: m.options.$root,
                        wrapTag: m.options.wrapTag,
                        className: m.options.style.className,
                        exceptSelectors: m.options.exceptSelectors,
                      },
                      m.hooks,
                    ));
                }),
                (m.fromRange = function (O) {
                  var M = { $node: O.startContainer, offset: O.startOffset },
                    q = { $node: O.endContainer, offset: O.endOffset },
                    Y = O.toString(),
                    x = m.hooks.Render.UUID.call(M, q, Y);
                  x = x ?? d.default();
                  var I = new u.default(M, q, Y, x);
                  return I
                    ? m._highlightFromHRange(I)
                    : (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.RANGE_INVALID,
                      }),
                      null);
                }),
                (m.fromStore = function (O, M, q, Y, x) {
                  var I = new f.default(O, M, q, Y, x);
                  try {
                    return m._highlightFromHSource(I), I;
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
                (m._getHooks = function () {
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
                (m._highlightFromHRange = function (O) {
                  var M = O.serialize(m.options.$root, m.hooks);
                  return m.painter.highlightRange(O).length === 0
                    ? (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, {
                        type: _.ERROR.DOM_SELECTION_EMPTY,
                      }),
                      null)
                    : (m.cache.save(M),
                      m.emit(
                        _.EventType.CREATE,
                        { sources: [M], type: _.CreateFrom.INPUT },
                        m,
                      ),
                      M);
                }),
                (m._handleSelection = function () {
                  var O = u.default.fromSelection(m.hooks.Render.UUID);
                  O && (m._highlightFromHRange(O), u.default.removeDomRange());
                }),
                (m._handleHighlightHover = function (O) {
                  var M = O.target;
                  if (!S.isHighlightWrapNode(M))
                    return (
                      m._hoverId &&
                        m.emit(_.EventType.HOVER_OUT, { id: m._hoverId }, m, O),
                      void (m._hoverId = null)
                    );
                  var q = S.getHighlightId(M, m.options.$root);
                  m._hoverId !== q &&
                    (m._hoverId &&
                      m.emit(_.EventType.HOVER_OUT, { id: m._hoverId }, m, O),
                    (m._hoverId = q),
                    m.emit(_.EventType.HOVER, { id: m._hoverId }, m, O));
                }),
                (m._handleError = function (O) {
                  m.options.verbose && console.warn(O);
                }),
                (m._handleHighlightClick = function (O) {
                  var M = O.target;
                  if (S.isHighlightWrapNode(M)) {
                    var q = S.getHighlightId(M, m.options.$root);
                    m.emit(_.EventType.CLICK, { id: q }, m, O);
                  }
                }),
                (m.options = b.getDefaultOptions()),
                (m.hooks = m._getHooks()),
                m.setOption(F),
                (m.cache = new y.default());
              var $ = m.options.$root;
              return (
                S.addEventListener(
                  $,
                  m.event.PointerOver,
                  m._handleHighlightHover,
                ),
                S.addEventListener(
                  $,
                  m.event.PointerTap,
                  m._handleHighlightClick,
                ),
                b.eventEmitter.on(b.INTERNAL_ERROR_EVENT, m._handleError),
                m
              );
            }
            return (
              s(P, E),
              (P.prototype.remove = function (F) {
                if (F) {
                  var m = this.painter.removeHighlight(F);
                  this.cache.remove(F),
                    m && this.emit(_.EventType.REMOVE, { ids: [F] }, this);
                }
              }),
              (P.prototype.removeAll = function () {
                this.painter.removeAllHighlight();
                var F = this.cache.removeAll();
                this.emit(_.EventType.REMOVE, { ids: F }, this);
              }),
              (P.prototype._highlightFromHSource = function (F) {
                F === void 0 && (F = []);
                var m = this.painter.highlightSource(F);
                this.emit(
                  _.EventType.CREATE,
                  { sources: m, type: _.CreateFrom.STORE },
                  this,
                ),
                  this.cache.save(F);
              }),
              (P.event = _.EventType),
              (P.isHighlightWrapNode = S.isHighlightWrapNode),
              (P.isHighlightSource = function (F) {
                return !!F.__isHighlightSource;
              }),
              P
            );
          })(l.default);
        n.default = A;
      },
      function (o, n, r) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.queryElementNode = n.getTextChildByOffset = void 0);
        var i = r(0);
        (n.getTextChildByOffset = function (s, a) {
          for (var c = [s], l = null, u = 0, f = 0; (l = c.pop()); ) {
            for (var d = l.childNodes, g = d.length - 1; g >= 0; g--)
              c.push(d[g]);
            if (
              l.nodeType === 3 &&
              ((f = a - u), (u += l.textContent.length) >= a)
            )
              break;
          }
          return l || (l = s), { $node: l, offset: f };
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
          var l = (function (d) {
              if (
                d instanceof HTMLElement &&
                (!d.dataset || !d.dataset[i.CAMEL_DATASET_IDENTIFIER])
              )
                return d;
              for (
                var g = d.parentNode;
                g != null && g.dataset[i.CAMEL_DATASET_IDENTIFIER];

              )
                g = g.parentNode;
              return g;
            })(s),
            u =
              l === c
                ? i.ROOT_IDX
                : (function (d, g) {
                    for (
                      var p = d.tagName, y = g.getElementsByTagName(p), v = 0;
                      v < y.length;
                      v++
                    )
                      if (d === y[v]) return v;
                    return i.UNKNOWN_IDX;
                  })(l, c),
            f = (function (d, g) {
              for (var p = [d], y = null, v = 0; (y = p.pop()); ) {
                for (var b = y.childNodes, _ = b.length - 1; _ >= 0; _--)
                  p.push(b[_]);
                if (y.nodeType === 3 && y !== g) v += y.textContent.length;
                else if (y.nodeType === 3) break;
              }
              return v;
            })(l, s);
          return {
            parentTagName: l.tagName,
            parentIndex: u,
            textOffset: f + a,
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
            function (c, l) {
              var u = typeof Symbol == "function" && c[Symbol.iterator];
              if (!u) return c;
              var f,
                d,
                g = u.call(c),
                p = [];
              try {
                for (; (l === void 0 || l-- > 0) && !(f = g.next()).done; )
                  p.push(f.value);
              } catch (y) {
                d = { error: y };
              } finally {
                try {
                  f && !f.done && (u = g.return) && u.call(g);
                } finally {
                  if (d) throw d.error;
                }
              }
              return p;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var c = [], l = 0; l < arguments.length; l++)
                c = c.concat(i(arguments[l]));
              return c;
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = (function () {
          function c(l) {
            (this.name = ""), (this.ops = []), (this.name = l);
          }
          return (
            (c.prototype.tap = function (l) {
              var u = this;
              return (
                this.ops.indexOf(l) === -1 && this.ops.push(l),
                function () {
                  u.remove(l);
                }
              );
            }),
            (c.prototype.remove = function (l) {
              var u = this.ops.indexOf(l);
              u < 0 || this.ops.splice(u, 1);
            }),
            (c.prototype.isEmpty = function () {
              return this.ops.length === 0;
            }),
            (c.prototype.call = function () {
              for (var l, u = [], f = 0; f < arguments.length; f++)
                u[f] = arguments[f];
              return (
                this.ops.forEach(function (d) {
                  l = d.apply(void 0, s(u));
                }),
                l
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
            ((i = function (d, g) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (p, y) {
                    p.__proto__ = y;
                  }) ||
                function (p, y) {
                  for (var v in y)
                    Object.prototype.hasOwnProperty.call(y, v) && (p[v] = y[v]);
                })(d, g);
            }),
            function (d, g) {
              function p() {
                this.constructor = d;
              }
              i(d, g),
                (d.prototype =
                  g === null
                    ? Object.create(g)
                    : ((p.prototype = g.prototype), new p()));
            }),
          a =
            (this && this.__values) ||
            function (d) {
              var g = typeof Symbol == "function" && Symbol.iterator,
                p = g && d[g],
                y = 0;
              if (p) return p.call(d);
              if (d && typeof d.length == "number")
                return {
                  next: function () {
                    return (
                      d && y >= d.length && (d = void 0),
                      { value: d && d[y++], done: !d }
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
            function (d) {
              return d && d.__esModule ? d : { default: d };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var l = c(r(2)),
          u = r(1),
          f = (function (d) {
            function g() {
              var p = (d !== null && d.apply(this, arguments)) || this;
              return (p._data = /* @__PURE__ */ new Map()), p;
            }
            return (
              s(g, d),
              Object.defineProperty(g.prototype, "data", {
                get: function () {
                  return this.getAll();
                },
                set: function (p) {
                  throw u.ERROR.CACHE_SET_ERROR;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (g.prototype.save = function (p) {
                var y = this;
                Array.isArray(p)
                  ? p.forEach(function (v) {
                      return y._data.set(v.id, v);
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
                  y,
                  v = [];
                try {
                  for (
                    var b = a(this._data), _ = b.next();
                    !_.done;
                    _ = b.next()
                  ) {
                    var S = _.value;
                    v.push(S[1]);
                  }
                } catch (A) {
                  p = { error: A };
                } finally {
                  try {
                    _ && !_.done && (y = b.return) && y.call(b);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return v;
              }),
              (g.prototype.removeAll = function () {
                var p,
                  y,
                  v = [];
                try {
                  for (
                    var b = a(this._data), _ = b.next();
                    !_.done;
                    _ = b.next()
                  ) {
                    var S = _.value;
                    v.push(S[0]);
                  }
                } catch (A) {
                  p = { error: A };
                } finally {
                  try {
                    _ && !_.done && (y = b.return) && y.call(b);
                  } finally {
                    if (p) throw p.error;
                  }
                }
                return (this._data = /* @__PURE__ */ new Map()), v;
              }),
              g
            );
          })(l.default);
        n.default = f;
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
          s =
            (this && this.__read) ||
            function (v, b) {
              var _ = typeof Symbol == "function" && v[Symbol.iterator];
              if (!_) return v;
              var S,
                A,
                E = _.call(v),
                P = [];
              try {
                for (; (b === void 0 || b-- > 0) && !(S = E.next()).done; )
                  P.push(S.value);
              } catch (F) {
                A = { error: F };
              } finally {
                try {
                  S && !S.done && (_ = E.return) && _.call(E);
                } finally {
                  if (A) throw A.error;
                }
              }
              return P;
            },
          a =
            (this && this.__spread) ||
            function () {
              for (var v = [], b = 0; b < arguments.length; b++)
                v = v.concat(s(arguments[b]));
              return v;
            },
          c =
            (this && this.__importDefault) ||
            function (v) {
              return v && v.__esModule ? v : { default: v };
            };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var l = c(r(3)),
          u = r(18),
          f = r(4),
          d = r(1),
          g = r(20),
          p = r(0),
          y = (function () {
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
                if (!b.frozen) throw d.ERROR.HIGHLIGHT_RANGE_FROZEN;
                var S = this.options,
                  A = S.$root,
                  E = S.className,
                  P = S.exceptSelectors,
                  F = this.hooks,
                  m = u.getSelectedNodes(A, b.start, b.end, P);
                return (
                  F.Render.SelectedNodes.isEmpty() ||
                    (m = F.Render.SelectedNodes.call(b.id, m) || []),
                  m.map(function ($) {
                    var O = u.wrapHighlight($, b, E, _.options.wrapTag);
                    return (
                      F.Render.WrapNode.isEmpty() ||
                        (O = F.Render.WrapNode.call(b.id, O)),
                      O
                    );
                  })
                );
              }),
              (v.prototype.highlightSource = function (b) {
                var _ = this,
                  S = Array.isArray(b) ? b : [b],
                  A = [];
                return (
                  S.forEach(function (E) {
                    if (E instanceof l.default) {
                      var P = E.deSerialize(_.options.$root, _.hooks);
                      _.highlightRange(P).length > 0
                        ? A.push(E)
                        : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                            type: d.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER,
                            detail: E,
                          });
                    } else
                      p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, {
                        type: d.ERROR.SOURCE_TYPE_ERROR,
                      });
                  }),
                  A
                );
              }),
              (v.prototype.removeHighlight = function (b) {
                var _,
                  S,
                  A = new RegExp(
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
                  P = this.options.wrapTag,
                  F = document.querySelectorAll(
                    P + "[data-" + p.DATASET_IDENTIFIER + "]",
                  ),
                  m = [],
                  $ = [],
                  O = [];
                try {
                  for (var M = i(F), q = M.next(); !q.done; q = M.next()) {
                    var Y = q.value,
                      x = Y.dataset[p.CAMEL_DATASET_IDENTIFIER],
                      I = Y.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    x !== b || I
                      ? x === b
                        ? $.push(Y)
                        : x !== b && A.test(I) && O.push(Y)
                      : m.push(Y);
                  }
                } catch (T) {
                  _ = { error: T };
                } finally {
                  try {
                    q && !q.done && (S = M.return) && S.call(M);
                  } finally {
                    if (_) throw _.error;
                  }
                }
                return (
                  m.forEach(function (T) {
                    var w = T.parentNode,
                      D = document.createDocumentFragment();
                    f.forEach(T.childNodes, function (R) {
                      return D.appendChild(R.cloneNode(!1));
                    });
                    var B = T.previousSibling,
                      C = T.nextSibling;
                    w.replaceChild(D, T),
                      u.normalizeSiblingText(B, !0),
                      u.normalizeSiblingText(C, !1),
                      E.Remove.UpdateNodes.call(b, T, "remove");
                  }),
                  $.forEach(function (T) {
                    var w = T.dataset,
                      D = w[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(
                        p.ID_DIVISION,
                      ),
                      B = D.shift(),
                      C = document.querySelector(
                        P + "[data-" + p.DATASET_IDENTIFIER + '="' + B + '"]',
                      );
                    C && (f.removeAllClass(T), f.addClass(T, a(C.classList))),
                      (w[p.CAMEL_DATASET_IDENTIFIER] = B),
                      (w[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = D.join(
                        p.ID_DIVISION,
                      )),
                      E.Remove.UpdateNodes.call(b, T, "id-update");
                  }),
                  O.forEach(function (T) {
                    var w = T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
                    (T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = w.replace(
                      A,
                      "",
                    )),
                      E.Remove.UpdateNodes.call(b, T, "extra-update");
                  }),
                  m.length + $.length + O.length !== 0
                );
              }),
              (v.prototype.removeAllHighlight = function () {
                var b = this.options,
                  _ = b.wrapTag,
                  S = b.$root;
                f.getHighlightsByRoot(S, _).forEach(function (A) {
                  var E = A.parentNode,
                    P = document.createDocumentFragment();
                  f.forEach(A.childNodes, function (F) {
                    return P.appendChild(F.cloneNode(!1));
                  }),
                    E.replaceChild(P, A);
                });
              }),
              v
            );
          })();
        n.default = y;
      },
      function (o, n, r) {
        var i =
            (this && this.__read) ||
            function (p, y) {
              var v = typeof Symbol == "function" && p[Symbol.iterator];
              if (!v) return p;
              var b,
                _,
                S = v.call(p),
                A = [];
              try {
                for (; (y === void 0 || y-- > 0) && !(b = S.next()).done; )
                  A.push(b.value);
              } catch (E) {
                _ = { error: E };
              } finally {
                try {
                  b && !b.done && (v = S.return) && v.call(S);
                } finally {
                  if (_) throw _.error;
                }
              }
              return A;
            },
          s =
            (this && this.__spread) ||
            function () {
              for (var p = [], y = 0; y < arguments.length; y++)
                p = p.concat(i(arguments[y]));
              return p;
            };
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.normalizeSiblingText =
            n.wrapHighlight =
            n.getSelectedNodes =
              void 0);
        var a = r(1),
          c = r(4),
          l = r(0),
          u = r(19),
          f = function (p, y) {
            if (!p) return !1;
            if (/^\./.test(y)) {
              var v = y.replace(/^\./, "");
              return p && c.hasClass(p, v);
            }
            if (/^#/.test(y)) {
              var b = y.replace(/^#/, "");
              return p && p.id === b;
            }
            var _ = y.toUpperCase();
            return p && p.tagName === _;
          };
        n.getSelectedNodes = function (p, y, v, b) {
          var _ = y.$node,
            S = v.$node,
            A = y.offset,
            E = v.offset;
          if (_ === S && _ instanceof Text)
            return (function (x, I, T, w) {
              for (
                var D = x,
                  B = function (R) {
                    return w == null
                      ? void 0
                      : w.some(function (U) {
                          return f(R, U);
                        });
                  };
                D;

              ) {
                if (D.nodeType === 1 && B(D)) return [];
                D = D.parentNode;
              }
              x.splitText(I);
              var C = x.nextSibling;
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
            })(_, A, E, b);
          for (
            var P = [p],
              F = [],
              m = function (x) {
                return b == null
                  ? void 0
                  : b.some(function (I) {
                      return f(x, I);
                    });
              },
              $ = !1,
              O = null;
            (O = P.pop());

          )
            if (O.nodeType !== 1 || !m(O)) {
              for (var M = O.childNodes, q = M.length - 1; q >= 0; q--)
                P.push(M[q]);
              if (O === _) {
                if (O.nodeType === 3) {
                  O.splitText(A);
                  var Y = O.nextSibling;
                  F.push({
                    $node: Y,
                    type: a.SelectedNodeType.text,
                    splitType: a.SplitType.head,
                  });
                }
                $ = !0;
              } else {
                if (O === S) {
                  O.nodeType === 3 &&
                    ((Y = O).splitText(E),
                    F.push({
                      $node: Y,
                      type: a.SelectedNodeType.text,
                      splitType: a.SplitType.tail,
                    }));
                  break;
                }
                $ &&
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
        var d = function (p, y) {
            var v = Array.isArray(y) ? y : [y];
            return (
              (v =
                v.length === 0
                  ? [l.getDefaultOptions().style.className]
                  : v).forEach(function (b) {
                c.addClass(p, b);
              }),
              p
            );
          },
          g = function (p) {
            return !p || !p.textContent;
          };
        (n.wrapHighlight = function (p, y, v, b) {
          var _ = p.$node.parentNode,
            S = p.$node.previousSibling,
            A = p.$node.nextSibling;
          return c.isHighlightWrapNode(_)
            ? !c.isHighlightWrapNode(_) || (g(S) && g(A))
              ? (function (E, P, F) {
                  var m = E.$node.parentNode,
                    $ = m;
                  c.removeAllClass($), d($, F);
                  var O = m.dataset,
                    M = O[l.CAMEL_DATASET_IDENTIFIER];
                  return (
                    (O[l.CAMEL_DATASET_IDENTIFIER] = P.id),
                    (O[l.CAMEL_DATASET_IDENTIFIER_EXTRA] = O[
                      l.CAMEL_DATASET_IDENTIFIER_EXTRA
                    ]
                      ? M + l.ID_DIVISION + O[l.CAMEL_DATASET_IDENTIFIER_EXTRA]
                      : M),
                    $
                  );
                })(p, y, v)
              : (function (E, P, F, m) {
                  var $ = document.createElement(m),
                    O = E.$node.parentNode,
                    M = E.$node.previousSibling,
                    q = E.$node.nextSibling,
                    Y = document.createDocumentFragment(),
                    x = O.dataset[l.CAMEL_DATASET_IDENTIFIER],
                    I = O.dataset[l.CAMEL_DATASET_IDENTIFIER_EXTRA],
                    T = I ? x + l.ID_DIVISION + I : x;
                  $.setAttribute("data-" + l.DATASET_IDENTIFIER, P.id),
                    $.setAttribute("data-" + l.DATASET_IDENTIFIER_EXTRA, T),
                    $.appendChild(E.$node.cloneNode(!1));
                  var w,
                    D = !1,
                    B = !1;
                  M &&
                    (((C = O.cloneNode(!1)).textContent = M.textContent),
                    Y.appendChild(C),
                    (D = !0));
                  var C,
                    R = [];
                  return (
                    Array.isArray(F) ? R.push.apply(R, s(F)) : R.push(F),
                    d($, u.unique(R)),
                    Y.appendChild($),
                    q &&
                      (((C = O.cloneNode(!1)).textContent = q.textContent),
                      Y.appendChild(C),
                      (B = !0)),
                    (w =
                      D && B
                        ? a.SplitType.both
                        : D
                        ? a.SplitType.head
                        : B
                        ? a.SplitType.tail
                        : a.SplitType.none),
                    $.setAttribute("data-" + l.DATASET_SPLIT_TYPE, w),
                    O.parentNode.replaceChild(Y, O),
                    $
                  );
                })(p, y, v, b)
            : (function (E, P, F, m) {
                var $ = document.createElement(m);
                return (
                  d($, F),
                  $.appendChild(E.$node.cloneNode(!1)),
                  E.$node.parentNode.replaceChild($, E.$node),
                  $.setAttribute("data-" + l.DATASET_IDENTIFIER, P.id),
                  $.setAttribute("data-" + l.DATASET_SPLIT_TYPE, E.splitType),
                  $.setAttribute("data-" + l.DATASET_IDENTIFIER_EXTRA, ""),
                  $
                );
              })(p, y, v, b);
        }),
          (n.normalizeSiblingText = function (p, y) {
            if ((y === void 0 && (y = !0), p && p.nodeType === 3)) {
              var v = y ? p.nextSibling : p.previousSibling;
              if (v.nodeType === 3) {
                var b = v.nodeValue;
                (p.nodeValue = y ? p.nodeValue + b : b + p.nodeValue),
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
              l = 0;
            if (c) return c.call(s);
            if (s && typeof s.length == "number")
              return {
                next: function () {
                  return (
                    s && l >= s.length && (s = void 0),
                    { value: s && s[l++], done: !s }
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
              l = [];
            try {
              for (var u = i(s), f = u.next(); !f.done; f = u.next()) {
                var d = f.value;
                l.indexOf(d) === -1 && l.push(d);
              }
            } catch (g) {
              a = { error: g };
            } finally {
              try {
                f && !f.done && (c = u.return) && c.call(u);
              } finally {
                if (a) throw a.error;
              }
            }
            return l;
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
})(Wr);
var qs = Wr.exports;
const qr = /* @__PURE__ */ Ft(qs),
  qe = new qr({
    style: {
      className: vs,
    },
    // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  An = new qr({
    style: {
      className: ys,
    },
    // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
  }),
  Yr = (e, t) =>
    t.filter((o) => {
      var n;
      return ((n = o.$node.nodeValue) == null ? void 0 : n.trim()) !== "";
    }),
  Kr = (e, t, o) => {
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
qe.hooks.Render.SelectedNodes.tap(Yr);
qe.hooks.Serialize.Restore.tap(Kr);
An.hooks.Render.SelectedNodes.tap(Yr);
An.hooks.Serialize.Restore.tap(Kr);
qe.on("selection:hover", ({ id: e }) => {
  qe.addClass(sr, e);
}).on("selection:hover-out", ({ id: e }) => {
  qe.removeClass(sr, e);
});
const Ys = (e) => {
    var t, o;
    return (t = e.meta) != null && t.highlight
      ? JSON.parse((o = e.meta) == null ? void 0 : o.highlight)
      : null;
  },
  Ks = (e) => {
    const t = Ys(e);
    t && (qe.remove(t.id), An.remove(t.id));
  },
  Gr = () => {
    var e, t, o;
    return (o =
      (t =
        (e = document.getElementById("code")) == null
          ? void 0
          : e.parentElement) == null
        ? void 0
        : t.querySelector("code-block")) == null
      ? void 0
      : o.querySelector("code.ng-binding.highlight");
  },
  Gs = () => {
    const e = le((u) =>
        u.selectedConversationId
          ? u.conversations[u.selectedConversationId]
          : null,
      ),
      t = le((u) => u.docsAppRendered),
      o = le((u) => u.newConversation),
      n = De(),
      [r, i] = ge(null),
      [s, a] = ge(null);
    Re(() => {
      o && (i(null), a(null));
    }, [o]);
    const c = Ke(() => {
      console.log("resetHighlights"), r && Ks(r), a(null), i(null);
    }, [r]);
    return (
      Re(() => {
        !e ||
          !t ||
          (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`);
      }, [e, t, n]),
      {
        getHighlightedSelectionData: () => r,
        pos: s,
        onSelectionEnd: (u) => {
          var M;
          const { end: f, start: d } = u.detail.selectionRange,
            g = document.getSelection();
          if (!g || !g.rangeCount) return c(), null;
          const y = g.getRangeAt(0).toString(),
            v = Gr(),
            b = v == null ? void 0 : v.innerText;
          if (!y || !b) return;
          const _ = v.querySelectorAll(".line-numbers-rows > span"),
            S = y.split(`
`),
            A = Math.max(d.y, f.y),
            E = Array.from(_).findIndex((q) => {
              const { height: Y, y: x } = q.getBoundingClientRect();
              return A >= x && A <= x + Y;
            }),
            P = _[E],
            F = E - S.length + 1;
          console.log("start and end lines found", F, E);
          const m = window.location.hash.split("#"),
            $ =
              (M = m.find((q) => q.startsWith("!"))) == null
                ? void 0
                : M.split("/");
          if (!$ || $.length < 3) {
            console.error("Unable to find model parts", m, $);
            return;
          }
          console.log("model parts found", $);
          const O = {
            meta: {
              highlight: y,
              uniqueId: $[2],
              resource_type: $[1],
              range: {
                end: { line: E, character: 0 },
                start: { line: F, character: 0 },
              },
            },
          };
          a({
            x: P.offsetLeft,
            y: P.offsetTop + P.offsetHeight / 2,
            element: v,
          }),
            i(O);
        },
      }
    );
  },
  Xs = ({ conversationGroup: e, codeSection: t }) => {
    const o = le((a) => a.selectedConversationId),
      n = De(),
      r = Te(null),
      i = () => {
        n(Cn(e.conversation_group_id));
      },
      s = ct(() => {
        if (!t) return;
        let a = 0,
          c = 0;
        for (let l = e.meta.range.start.line; l <= e.meta.range.end.line; l++) {
          const u = t.querySelector(
            `.line-numbers-rows > span:nth-child(${l + 1})`,
          );
          u &&
            (l === e.meta.range.start.line && (a = u.offsetTop),
            l === e.meta.range.end.line && (c = u.offsetTop + u.offsetHeight));
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
        : wr(
            /* @__PURE__ */ j.jsx("div", {
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
  Zs = Xs,
  Js = () => {
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
    const r = Gr();
    return /* @__PURE__ */ j.jsx(j.Fragment, {
      children: n.map((i) =>
        /* @__PURE__ */ j.jsx(
          Zs,
          {
            codeSection: r,
            conversationGroup: i,
          },
          i.conversation_group_id,
        ),
      ),
    });
  },
  Qs = Js,
  ea = "_dbtDocs_mtayd_1",
  ta = "_conversationRightPanelCloseButton_mtayd_14",
  na = "_conversationRightPanel_mtayd_14",
  ra = "_newConversationForm_mtayd_46",
  oa = "_highlightText_mtayd_60",
  ia = "_conversationInputForm_mtayd_69",
  sa = "_conversationGroup_mtayd_95",
  aa = "_replyForm_mtayd_127",
  ua = "_resolveButton_mtayd_153",
  je = {
    dbtDocs: ea,
    conversationRightPanelCloseButton: ta,
    conversationRightPanel: na,
    newConversationForm: ra,
    highlightText: oa,
    conversationInputForm: ia,
    conversationGroup: sa,
    replyForm: aa,
    resolveButton: ua,
  },
  ca = "_profileImage_11vaf_1",
  la = {
    profileImage: ca,
  },
  fa = ({ user: e }) => {
    var t;
    return /* @__PURE__ */ j.jsx("div", {
      className: la.profileImage,
      children:
        ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "",
    });
  },
  Xr = fa;
function da(e) {
  if (Array.isArray(e)) {
    for (var t = 0, o = new Array(e.length); t < e.length; t++) o[t] = e[t];
    return o;
  }
}
function pa(e) {
  if (
    Symbol.iterator in Object(e) ||
    Object.prototype.toString.call(e) === "[object Arguments]"
  )
    return Array.from(e);
}
function ha() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function wt(e) {
  return da(e) || pa(e) || ha();
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
function ga(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ar(e, t) {
  for (var o = 0; o < t.length; o++) {
    var n = t[o];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function va(e, t, o) {
  return t && ar(e.prototype, t), o && ar(e, o), e;
}
function te(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function dn(e, t) {
  return (
    (dn =
      Object.setPrototypeOf ||
      function (n, r) {
        return (n.__proto__ = r), n;
      }),
    dn(e, t)
  );
}
function ya(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    t && dn(e, t);
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
function Ct(e) {
  return (
    typeof Symbol == "function" && Ye(Symbol.iterator) === "symbol"
      ? (Ct = function (o) {
          return Ye(o);
        })
      : (Ct = function (o) {
          return o &&
            typeof Symbol == "function" &&
            o.constructor === Symbol &&
            o !== Symbol.prototype
            ? "symbol"
            : Ye(o);
        }),
    Ct(e)
  );
}
function ma(e, t) {
  return t && (Ct(t) === "object" || typeof t == "function") ? t : te(e);
}
function xt(e) {
  return (
    (xt = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        }),
    xt(e)
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
var Ea = function (e, t, o, n, r, i, s, a) {
    if (process.env.NODE_ENV !== "production" && t === void 0)
      throw new Error("invariant requires an error message argument");
    if (!e) {
      var c;
      if (t === void 0)
        c = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var l = [o, n, r, i, s, a],
          u = 0;
        (c = new Error(
          t.replace(/%s/g, function () {
            return l[u++];
          }),
        )),
          (c.name = "Invariant Violation");
      }
      throw ((c.framesToPop = 1), c);
    }
  },
  ba = Ea;
const Je = /* @__PURE__ */ Ft(ba);
function _a(e) {
  if (Array.isArray(e)) return e;
}
function Sa(e, t) {
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
function Ca() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function Pt(e, t) {
  return _a(e) || Sa(e, t) || Ca();
}
function Ta(e, t) {
  if (e == null) return {};
  var o = {},
    n = Object.keys(e),
    r,
    i;
  for (i = 0; i < n.length; i++)
    (r = n[i]), !(t.indexOf(r) >= 0) && (o[r] = e[r]);
  return o;
}
function Oa(e, t) {
  if (e == null) return {};
  var o = Ta(e, t),
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
function dt(e) {
  "@babel/helpers - typeof";
  return (
    (dt =
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
    dt(e)
  );
}
function Aa(e, t) {
  if (dt(e) != "object" || !e) return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var n = o.call(e, t || "default");
    if (dt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ra(e) {
  var t = Aa(e, "string");
  return dt(t) == "symbol" ? t : t + "";
}
function pt(e, t, o) {
  return (
    (t = Ra(t)),
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
function pn(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
  return n;
}
function Da(e) {
  if (Array.isArray(e)) return pn(e);
}
function Ia(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function wa(e, t) {
  if (e) {
    if (typeof e == "string") return pn(e, t);
    var o = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (o === "Object" && e.constructor && (o = e.constructor.name),
      o === "Map" || o === "Set")
    )
      return Array.from(e);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return pn(e, t);
  }
}
function xa() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xe(e) {
  return Da(e) || Ia(e) || wa(e) || xa();
}
var nt = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  Zr = function (t) {
    return t === Object(t) ? Object.values(t) : [];
  };
function Jr(e, t) {
  var o = Object.assign({}, e);
  return (
    Tt(e) &&
      Tt(t) &&
      nt(t).forEach(function (n) {
        Tt(t[n])
          ? n in e
            ? (o[n] = Jr(e[n], t[n]))
            : Object.assign(o, pt({}, n, t[n]))
          : Object.assign(o, pt({}, n, t[n]));
      }),
    o
  );
}
var hn = function (t) {
    for (
      var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1;
      r < o;
      r++
    )
      n[r - 1] = arguments[r];
    return n.reduce(function (i, s) {
      return Jr(i, s);
    }, t);
  },
  Pa = function (t, o) {
    var n = Object.assign({}, t);
    if (o) for (var r = 0; r < o.length; r++) delete n[o[r]];
    return n;
  },
  Tt = function (t) {
    return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
  },
  Na = function (t) {
    return (t || []).filter(Boolean);
  },
  Rn = function (t) {
    return t[0] === "&";
  },
  Fa = function (t) {
    return !Rn(t);
  },
  ur = function (t) {
    return t.replace(/-(\w)/g, function (o, n) {
      return n.toUpperCase();
    });
  },
  ja = function (t) {
    for (
      var o =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        n = nt(t),
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
  Qr = function (t, o) {
    for (
      var n = o.map(ur), r = nt(t), i = {}, s = 0, a = r.length;
      s < a;
      s += 1
    ) {
      var c = r[s];
      (o.indexOf(c) >= 0 || n.indexOf(ur(c)) >= 0) && (i[c] = t[c]);
    }
    return i;
  },
  Ma = function e(t, o) {
    for (
      var n = hn.apply(void 0, [{}, Pa(t, o)].concat(xe(Zr(Qr(t, o))))),
        r = nt(n).filter(Rn),
        i = 0,
        s = r.length;
      i < s;
      i += 1
    ) {
      var a = r[i],
        c = e(n[a], o);
      o.indexOf(a) >= 0 ? (delete n[a], (n = hn({}, n, c))) : (n[a] = c);
    }
    return n;
  };
function cr(e, t) {
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
function lr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? cr(Object(o), !0).forEach(function (n) {
          pt(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : cr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var $a = ["animationName"],
  La = function (t) {
    var o = t.style,
      n = t.className;
    return lr(
      lr(
        {},
        o
          ? {
              style: ja(o, $a),
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
const eo = La;
var to = /* @__PURE__ */ Qe(eo);
to.Provider;
var no = function (t) {
    if (t) {
      if (typeof t == "string") return [t];
      if (!Array.isArray(t)) {
        var o = t;
        return nt(t).reduce(function (n, r) {
          return n.concat(o[r] ? [r] : []);
        }, []);
      }
    } else return [];
    return t;
  },
  ka = {},
  Ba = function (t) {
    return function (o, n) {
      var r = n || ka;
      t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
      var i;
      t.memoize.has(r)
        ? (i = t.memoize.get(r))
        : ((i = {}), t.memoize.set(r, i));
      var s = no(o).join(" ");
      return s in i ? i[s] : (i[s] = t(o || [], n));
    };
  };
function fr(e, t) {
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
      ? fr(Object(o), !0).forEach(function (n) {
          pt(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : fr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var Ha = function (t) {
    var o = t && nt(t)[0];
    return o && o.split("__")[0].split("--")[0];
  },
  Ua = function (t, o, n) {
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
function ro(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : eo,
    i = o || Ha(n) || (t == null ? void 0 : t.className),
    s =
      typeof t == "function"
        ? t
        : Ba(function (f, d) {
            var g = no(f);
            Je(
              Array.isArray(g),
              "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value.",
            ),
              Je(
                !d || Tt(d),
                "Optional second parameter must be a plain object.",
              );
            var p = g.filter(Rn),
              y = g.filter(Fa),
              v =
                y.length > 0
                  ? function (S) {
                      return Zr(Qr(S, y));
                    }
                  : function (S) {
                      return [S];
                    },
              b = function () {
                var A =
                  arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
                return v(Ma(A, p));
              },
              _ = Ua(i, y, p);
            return ro(
              Ve(
                Ve(
                  Ve(
                    {},
                    (t || d) && {
                      style: hn.apply(void 0, [{}].concat(xe(b(d)), xe(b(t)))),
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
    l = n
      ? Na(
          c.map(function (f) {
            return n[f];
          }),
        )
      : c,
    u = r(
      Ve(
        Ve({}, a),
        l.length > 0
          ? {
              className: l.join(" "),
            }
          : {},
      ),
    );
  return Object.assign(s, u), s;
}
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
function st(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? dr(Object(o), !0).forEach(function (n) {
          pt(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : dr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
var za = function () {
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
  Dn = function (t, o, n) {
    var r = o.style,
      i = o.className,
      s = o.classNames,
      a = et(to),
      c = ct(
        function () {
          return ro(
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
  gn = { exports: {} },
  bt = { exports: {} },
  se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pr;
function Va() {
  if (pr) return se;
  pr = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    t = e ? Symbol.for("react.element") : 60103,
    o = e ? Symbol.for("react.portal") : 60106,
    n = e ? Symbol.for("react.fragment") : 60107,
    r = e ? Symbol.for("react.strict_mode") : 60108,
    i = e ? Symbol.for("react.profiler") : 60114,
    s = e ? Symbol.for("react.provider") : 60109,
    a = e ? Symbol.for("react.context") : 60110,
    c = e ? Symbol.for("react.async_mode") : 60111,
    l = e ? Symbol.for("react.concurrent_mode") : 60111,
    u = e ? Symbol.for("react.forward_ref") : 60112,
    f = e ? Symbol.for("react.suspense") : 60113,
    d = e ? Symbol.for("react.suspense_list") : 60120,
    g = e ? Symbol.for("react.memo") : 60115,
    p = e ? Symbol.for("react.lazy") : 60116,
    y = e ? Symbol.for("react.block") : 60121,
    v = e ? Symbol.for("react.fundamental") : 60117,
    b = e ? Symbol.for("react.responder") : 60118,
    _ = e ? Symbol.for("react.scope") : 60119;
  function S(E) {
    if (typeof E == "object" && E !== null) {
      var P = E.$$typeof;
      switch (P) {
        case t:
          switch (((E = E.type), E)) {
            case c:
            case l:
            case n:
            case i:
            case r:
            case f:
              return E;
            default:
              switch (((E = E && E.$$typeof), E)) {
                case a:
                case u:
                case p:
                case g:
                case s:
                  return E;
                default:
                  return P;
              }
          }
        case o:
          return P;
      }
    }
  }
  function A(E) {
    return S(E) === l;
  }
  return (
    (se.AsyncMode = c),
    (se.ConcurrentMode = l),
    (se.ContextConsumer = a),
    (se.ContextProvider = s),
    (se.Element = t),
    (se.ForwardRef = u),
    (se.Fragment = n),
    (se.Lazy = p),
    (se.Memo = g),
    (se.Portal = o),
    (se.Profiler = i),
    (se.StrictMode = r),
    (se.Suspense = f),
    (se.isAsyncMode = function (E) {
      return A(E) || S(E) === c;
    }),
    (se.isConcurrentMode = A),
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
      return S(E) === g;
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
      return S(E) === f;
    }),
    (se.isValidElementType = function (E) {
      return (
        typeof E == "string" ||
        typeof E == "function" ||
        E === n ||
        E === l ||
        E === i ||
        E === r ||
        E === f ||
        E === d ||
        (typeof E == "object" &&
          E !== null &&
          (E.$$typeof === p ||
            E.$$typeof === g ||
            E.$$typeof === s ||
            E.$$typeof === a ||
            E.$$typeof === u ||
            E.$$typeof === v ||
            E.$$typeof === b ||
            E.$$typeof === _ ||
            E.$$typeof === y))
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
var hr;
function Wa() {
  return (
    hr ||
      ((hr = 1),
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
            l = e ? Symbol.for("react.concurrent_mode") : 60111,
            u = e ? Symbol.for("react.forward_ref") : 60112,
            f = e ? Symbol.for("react.suspense") : 60113,
            d = e ? Symbol.for("react.suspense_list") : 60120,
            g = e ? Symbol.for("react.memo") : 60115,
            p = e ? Symbol.for("react.lazy") : 60116,
            y = e ? Symbol.for("react.block") : 60121,
            v = e ? Symbol.for("react.fundamental") : 60117,
            b = e ? Symbol.for("react.responder") : 60118,
            _ = e ? Symbol.for("react.scope") : 60119;
          function S(k) {
            return (
              typeof k == "string" ||
              typeof k == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              k === n ||
              k === l ||
              k === i ||
              k === r ||
              k === f ||
              k === d ||
              (typeof k == "object" &&
                k !== null &&
                (k.$$typeof === p ||
                  k.$$typeof === g ||
                  k.$$typeof === s ||
                  k.$$typeof === a ||
                  k.$$typeof === u ||
                  k.$$typeof === v ||
                  k.$$typeof === b ||
                  k.$$typeof === _ ||
                  k.$$typeof === y))
            );
          }
          function A(k) {
            if (typeof k == "object" && k !== null) {
              var he = k.$$typeof;
              switch (he) {
                case t:
                  var He = k.type;
                  switch (He) {
                    case c:
                    case l:
                    case n:
                    case i:
                    case r:
                    case f:
                      return He;
                    default:
                      var Me = He && He.$$typeof;
                      switch (Me) {
                        case a:
                        case u:
                        case p:
                        case g:
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
            P = l,
            F = a,
            m = s,
            $ = t,
            O = u,
            M = n,
            q = p,
            Y = g,
            x = o,
            I = i,
            T = r,
            w = f,
            D = !1;
          function B(k) {
            return (
              D ||
                ((D = !0),
                console.warn(
                  "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.",
                )),
              C(k) || A(k) === c
            );
          }
          function C(k) {
            return A(k) === l;
          }
          function R(k) {
            return A(k) === a;
          }
          function U(k) {
            return A(k) === s;
          }
          function z(k) {
            return typeof k == "object" && k !== null && k.$$typeof === t;
          }
          function V(k) {
            return A(k) === u;
          }
          function X(k) {
            return A(k) === n;
          }
          function K(k) {
            return A(k) === p;
          }
          function G(k) {
            return A(k) === g;
          }
          function J(k) {
            return A(k) === o;
          }
          function Q(k) {
            return A(k) === i;
          }
          function W(k) {
            return A(k) === r;
          }
          function ce(k) {
            return A(k) === f;
          }
          (ae.AsyncMode = E),
            (ae.ConcurrentMode = P),
            (ae.ContextConsumer = F),
            (ae.ContextProvider = m),
            (ae.Element = $),
            (ae.ForwardRef = O),
            (ae.Fragment = M),
            (ae.Lazy = q),
            (ae.Memo = Y),
            (ae.Portal = x),
            (ae.Profiler = I),
            (ae.StrictMode = T),
            (ae.Suspense = w),
            (ae.isAsyncMode = B),
            (ae.isConcurrentMode = C),
            (ae.isContextConsumer = R),
            (ae.isContextProvider = U),
            (ae.isElement = z),
            (ae.isForwardRef = V),
            (ae.isFragment = X),
            (ae.isLazy = K),
            (ae.isMemo = G),
            (ae.isPortal = J),
            (ae.isProfiler = Q),
            (ae.isStrictMode = W),
            (ae.isSuspense = ce),
            (ae.isValidElementType = S),
            (ae.typeOf = A);
        })()),
    ae
  );
}
var gr;
function oo() {
  return (
    gr ||
      ((gr = 1),
      process.env.NODE_ENV === "production"
        ? (bt.exports = Va())
        : (bt.exports = Wa())),
    bt.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Zt, vr;
function qa() {
  if (vr) return Zt;
  vr = 1;
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
      var l = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function (u) {
          l[u] = u;
        }),
        Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst"
      );
    } catch {
      return !1;
    }
  }
  return (
    (Zt = r()
      ? Object.assign
      : function (i, s) {
          for (var a, c = n(i), l, u = 1; u < arguments.length; u++) {
            a = Object(arguments[u]);
            for (var f in a) t.call(a, f) && (c[f] = a[f]);
            if (e) {
              l = e(a);
              for (var d = 0; d < l.length; d++)
                o.call(a, l[d]) && (c[l[d]] = a[l[d]]);
            }
          }
          return c;
        }),
    Zt
  );
}
var Jt, yr;
function In() {
  if (yr) return Jt;
  yr = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (Jt = e), Jt;
}
var Qt, mr;
function io() {
  return (
    mr ||
      ((mr = 1), (Qt = Function.call.bind(Object.prototype.hasOwnProperty))),
    Qt
  );
}
var en, Er;
function Ya() {
  if (Er) return en;
  Er = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== "production") {
    var t = In(),
      o = {},
      n = io();
    e = function (i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function r(i, s, a, c, l) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in i)
        if (n(i, u)) {
          var f;
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
            f = i[u](s, u, c, a, null, t);
          } catch (p) {
            f = p;
          }
          if (
            (f &&
              !(f instanceof Error) &&
              e(
                (c || "React class") +
                  ": type specification of " +
                  a +
                  " `" +
                  u +
                  "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
                  typeof f +
                  ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
              ),
            f instanceof Error && !(f.message in o))
          ) {
            o[f.message] = !0;
            var g = l ? l() : "";
            e("Failed " + a + " type: " + f.message + (g ?? ""));
          }
        }
    }
  }
  return (
    (r.resetWarningCache = function () {
      process.env.NODE_ENV !== "production" && (o = {});
    }),
    (en = r),
    en
  );
}
var tn, br;
function Ka() {
  if (br) return tn;
  br = 1;
  var e = oo(),
    t = qa(),
    o = In(),
    n = io(),
    r = Ya(),
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
    (tn = function (a, c) {
      var l = typeof Symbol == "function" && Symbol.iterator,
        u = "@@iterator";
      function f(C) {
        var R = C && ((l && C[l]) || C[u]);
        if (typeof R == "function") return R;
      }
      var d = "<<anonymous>>",
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
          element: A(),
          elementType: E(),
          instanceOf: P,
          node: O(),
          objectOf: m,
          oneOf: F,
          oneOfType: $,
          shape: q,
          exact: Y,
        };
      function p(C, R) {
        return C === R ? C !== 0 || 1 / C === 1 / R : C !== C && R !== R;
      }
      function y(C, R) {
        (this.message = C),
          (this.data = R && typeof R == "object" ? R : {}),
          (this.stack = "");
      }
      y.prototype = Error.prototype;
      function v(C) {
        if (process.env.NODE_ENV !== "production")
          var R = {},
            U = 0;
        function z(X, K, G, J, Q, W, ce) {
          if (((J = J || d), (W = W || G), ce !== o)) {
            if (c) {
              var k = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types",
              );
              throw ((k.name = "Invariant Violation"), k);
            } else if (
              process.env.NODE_ENV !== "production" &&
              typeof console < "u"
            ) {
              var he = J + ":" + G;
              !R[he] && // Avoid spamming the console because they are often not actionable except for lib authors
                U < 3 &&
                (i(
                  "You are manually calling a React.PropTypes validation function for the `" +
                    W +
                    "` prop on `" +
                    J +
                    "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                ),
                (R[he] = !0),
                U++);
            }
          }
          return K[G] == null
            ? X
              ? K[G] === null
                ? new y(
                    "The " +
                      Q +
                      " `" +
                      W +
                      "` is marked as required " +
                      ("in `" + J + "`, but its value is `null`."),
                  )
                : new y(
                    "The " +
                      Q +
                      " `" +
                      W +
                      "` is marked as required in " +
                      ("`" + J + "`, but its value is `undefined`."),
                  )
              : null
            : C(K, G, J, Q, W);
        }
        var V = z.bind(null, !1);
        return (V.isRequired = z.bind(null, !0)), V;
      }
      function b(C) {
        function R(U, z, V, X, K, G) {
          var J = U[z],
            Q = T(J);
          if (Q !== C) {
            var W = w(J);
            return new y(
              "Invalid " +
                X +
                " `" +
                K +
                "` of type " +
                ("`" + W + "` supplied to `" + V + "`, expected ") +
                ("`" + C + "`."),
              { expectedType: C },
            );
          }
          return null;
        }
        return v(R);
      }
      function _() {
        return v(s);
      }
      function S(C) {
        function R(U, z, V, X, K) {
          if (typeof C != "function")
            return new y(
              "Property `" +
                K +
                "` of component `" +
                V +
                "` has invalid PropType notation inside arrayOf.",
            );
          var G = U[z];
          if (!Array.isArray(G)) {
            var J = T(G);
            return new y(
              "Invalid " +
                X +
                " `" +
                K +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected an array."),
            );
          }
          for (var Q = 0; Q < G.length; Q++) {
            var W = C(G, Q, V, X, K + "[" + Q + "]", o);
            if (W instanceof Error) return W;
          }
          return null;
        }
        return v(R);
      }
      function A() {
        function C(R, U, z, V, X) {
          var K = R[U];
          if (!a(K)) {
            var G = T(K);
            return new y(
              "Invalid " +
                V +
                " `" +
                X +
                "` of type " +
                ("`" +
                  G +
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
        function C(R, U, z, V, X) {
          var K = R[U];
          if (!e.isValidElementType(K)) {
            var G = T(K);
            return new y(
              "Invalid " +
                V +
                " `" +
                X +
                "` of type " +
                ("`" +
                  G +
                  "` supplied to `" +
                  z +
                  "`, expected a single ReactElement type."),
            );
          }
          return null;
        }
        return v(C);
      }
      function P(C) {
        function R(U, z, V, X, K) {
          if (!(U[z] instanceof C)) {
            var G = C.name || d,
              J = B(U[z]);
            return new y(
              "Invalid " +
                X +
                " `" +
                K +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected ") +
                ("instance of `" + G + "`."),
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
        function R(U, z, V, X, K) {
          for (var G = U[z], J = 0; J < C.length; J++)
            if (p(G, C[J])) return null;
          var Q = JSON.stringify(C, function (ce, k) {
            var he = w(k);
            return he === "symbol" ? String(k) : k;
          });
          return new y(
            "Invalid " +
              X +
              " `" +
              K +
              "` of value `" +
              String(G) +
              "` " +
              ("supplied to `" + V + "`, expected one of " + Q + "."),
          );
        }
        return v(R);
      }
      function m(C) {
        function R(U, z, V, X, K) {
          if (typeof C != "function")
            return new y(
              "Property `" +
                K +
                "` of component `" +
                V +
                "` has invalid PropType notation inside objectOf.",
            );
          var G = U[z],
            J = T(G);
          if (J !== "object")
            return new y(
              "Invalid " +
                X +
                " `" +
                K +
                "` of type " +
                ("`" + J + "` supplied to `" + V + "`, expected an object."),
            );
          for (var Q in G)
            if (n(G, Q)) {
              var W = C(G, Q, V, X, K + "." + Q, o);
              if (W instanceof Error) return W;
            }
          return null;
        }
        return v(R);
      }
      function $(C) {
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
        function z(V, X, K, G, J) {
          for (var Q = [], W = 0; W < C.length; W++) {
            var ce = C[W],
              k = ce(V, X, K, G, J, o);
            if (k == null) return null;
            k.data && n(k.data, "expectedType") && Q.push(k.data.expectedType);
          }
          var he =
            Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
          return new y(
            "Invalid " +
              G +
              " `" +
              J +
              "` supplied to " +
              ("`" + K + "`" + he + "."),
          );
        }
        return v(z);
      }
      function O() {
        function C(R, U, z, V, X) {
          return x(R[U])
            ? null
            : new y(
                "Invalid " +
                  V +
                  " `" +
                  X +
                  "` supplied to " +
                  ("`" + z + "`, expected a ReactNode."),
              );
        }
        return v(C);
      }
      function M(C, R, U, z, V) {
        return new y(
          (C || "React class") +
            ": " +
            R +
            " type `" +
            U +
            "." +
            z +
            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
            V +
            "`.",
        );
      }
      function q(C) {
        function R(U, z, V, X, K) {
          var G = U[z],
            J = T(G);
          if (J !== "object")
            return new y(
              "Invalid " +
                X +
                " `" +
                K +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          for (var Q in C) {
            var W = C[Q];
            if (typeof W != "function") return M(V, X, K, Q, w(W));
            var ce = W(G, Q, V, X, K + "." + Q, o);
            if (ce) return ce;
          }
          return null;
        }
        return v(R);
      }
      function Y(C) {
        function R(U, z, V, X, K) {
          var G = U[z],
            J = T(G);
          if (J !== "object")
            return new y(
              "Invalid " +
                X +
                " `" +
                K +
                "` of type `" +
                J +
                "` " +
                ("supplied to `" + V + "`, expected `object`."),
            );
          var Q = t({}, U[z], C);
          for (var W in Q) {
            var ce = C[W];
            if (n(C, W) && typeof ce != "function") return M(V, X, K, W, w(ce));
            if (!ce)
              return new y(
                "Invalid " +
                  X +
                  " `" +
                  K +
                  "` key `" +
                  W +
                  "` supplied to `" +
                  V +
                  "`.\nBad object: " +
                  JSON.stringify(U[z], null, "  ") +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(C), null, "  "),
              );
            var k = ce(G, W, V, X, K + "." + W, o);
            if (k) return k;
          }
          return null;
        }
        return v(R);
      }
      function x(C) {
        switch (typeof C) {
          case "number":
          case "string":
          case "undefined":
            return !0;
          case "boolean":
            return !C;
          case "object":
            if (Array.isArray(C)) return C.every(x);
            if (C === null || a(C)) return !0;
            var R = f(C);
            if (R) {
              var U = R.call(C),
                z;
              if (R !== C.entries) {
                for (; !(z = U.next()).done; ) if (!x(z.value)) return !1;
              } else
                for (; !(z = U.next()).done; ) {
                  var V = z.value;
                  if (V && !x(V[1])) return !1;
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
      function w(C) {
        if (typeof C > "u" || C === null) return "" + C;
        var R = T(C);
        if (R === "object") {
          if (C instanceof Date) return "date";
          if (C instanceof RegExp) return "regexp";
        }
        return R;
      }
      function D(C) {
        var R = w(C);
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
      function B(C) {
        return !C.constructor || !C.constructor.name ? d : C.constructor.name;
      }
      return (
        (g.checkPropTypes = r),
        (g.resetWarningCache = r.resetWarningCache),
        (g.PropTypes = g),
        g
      );
    }),
    tn
  );
}
var nn, _r;
function Ga() {
  if (_r) return nn;
  _r = 1;
  var e = In();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (nn = function () {
      function n(s, a, c, l, u, f) {
        if (f !== e) {
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
    nn
  );
}
if (process.env.NODE_ENV !== "production") {
  var Xa = oo(),
    Za = !0;
  gn.exports = Ka()(Xa.isElement, Za);
} else gn.exports = Ga()();
var Ja = gn.exports;
const L = /* @__PURE__ */ Ft(Ja);
var Ot = function (t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },
  Ie = {
    id: "__id__",
    display: "__display__",
  },
  Sr = function (t, o) {
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
  Qa = function (t) {
    var o = /^\/(.+)\/(\w+)?$/;
    return new RegExp(
      t
        .map(function (n) {
          var r = o.exec(n.toString()),
            i = Pt(r, 3),
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
  so = function (t) {
    var o = 0;
    return (
      t.indexOf("__id__") >= 0 && o++, t.indexOf("__display__") >= 0 && o++, o
    );
  },
  eu = function () {},
  ht = function (t, o, n) {
    for (
      var r =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : eu,
        i = Qa(
          o.map(function (E) {
            return E.regex;
          }),
        ),
        s = 2,
        a = o.map(function (E) {
          var P = E.markup,
            F = s;
          return (s += so(P) + 1), F;
        }),
        c,
        l = 0,
        u = 0;
      (c = i.exec(t)) !== null;

    ) {
      var f = a.find(function (E) {
          return !!c[E];
        }),
        d = a.indexOf(f),
        g = o[d],
        p = g.markup,
        y = g.displayTransform,
        v = f + Sr(p, "id"),
        b = f + Sr(p, "display"),
        _ = c[v],
        S = y(_, c[b]),
        A = t.substring(l, c.index);
      r(A, l, u),
        (u += A.length),
        n(c[0], c.index, u, _, S, d, l),
        (u += S.length),
        (l = i.lastIndex);
    }
    l < t.length && r(t.substring(l), l, u);
  },
  ke = function (t, o) {
    var n = "";
    return (
      ht(
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
  ye = function (t, o, n) {
    var r =
      arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
    if (typeof n != "number") return n;
    var i,
      s = function (l, u, f) {
        i === void 0 && f + l.length >= n && (i = u + n - f);
      },
      a = function (l, u, f, d, g, p, y) {
        i === void 0 &&
          f + g.length > n &&
          (r === "NULL" ? (i = null) : (i = u + (r === "END" ? l.length : 0)));
      };
    return ht(t, o, a, s), i === void 0 ? t.length : i;
  },
  ut = function (t, o, n, r) {
    return t.substring(0, o) + r + t.substring(n);
  },
  tu = function (t, o, n, r) {
    var i = n.selectionStartBefore,
      s = n.selectionEndBefore,
      a = n.selectionEndAfter,
      c = ke(t, r),
      l = c.length - o.length;
    i === "undefined" && (i = a + l),
      s === "undefined" && (s = i),
      i === s && s === a && c.length === o.length && (i = i - 1);
    var u = o.slice(i, a),
      f = Math.min(i, a),
      d = s;
    i === a && (d = Math.max(s, i + l));
    var g = ye(t, r, f, "START"),
      p = ye(t, r, d, "END"),
      y = ye(t, r, f, "NULL"),
      v = ye(t, r, d, "NULL"),
      b = y === null || v === null,
      _ = ut(t, g, p, u);
    if (!b) {
      var S = ke(_, r);
      if (S !== o) {
        for (f = 0; o[f] === S[f]; ) f++;
        (u = o.slice(f, a)),
          (d = c.lastIndexOf(o.substring(a))),
          (g = ye(t, r, f, "START")),
          (p = ye(t, r, d, "END")),
          (_ = ut(t, g, p, u));
      }
    }
    return _;
  },
  Cr = function (t, o, n) {
    var r = n,
      i = !1,
      s = function (c, l, u, f, d, g, p) {
        u <= n && u + d.length > n && ((r = u), (i = !0));
      };
    if ((ht(t, o, s), i)) return r;
  },
  at = function (t, o) {
    var n = [];
    return (
      ht(t, o, function (r, i, s, a, c, l, u) {
        n.push({
          id: a,
          display: c,
          childIndex: l,
          index: i,
          plainTextIndex: s,
        });
      }),
      n
    );
  },
  ao = function (t, o) {
    return "".concat(t, "-").concat(o);
  },
  _t = function (t) {
    return Object.values(t).reduce(function (o, n) {
      var r = n.results;
      return o + r.length;
    }, 0);
  },
  nu = function (t, o) {
    var n = at(t, o),
      r = n[n.length - 1];
    return r ? r.plainTextIndex + r.display.length : 0;
  },
  ru = function (t) {
    var o = Ot(t),
      n = t[t.indexOf(Ie.display) + Ie.display.length],
      r = t[t.indexOf(Ie.id) + Ie.id.length];
    return new RegExp(
      o
        .replace(Ie.display, "([^".concat(Ot(n || ""), "]+?)"))
        .replace(Ie.id, "([^".concat(Ot(r || ""), "]+?)")),
    );
  },
  Ne = function (t) {
    return Ge.toArray(t).map(function (o) {
      var n = o.props,
        r = n.markup,
        i = n.regex,
        s = n.displayTransform;
      return {
        markup: r,
        regex: i ? ou(i, r) : ru(r),
        displayTransform:
          s ||
          function (a, c) {
            return c || a;
          },
      };
    });
  },
  ou = function (t, o) {
    var n = new RegExp(t.toString() + "|").exec("").length - 1,
      r = so(o);
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
  iu = function (t, o, n) {
    return t.replace(Ie.id, o).replace(Ie.display, n);
  },
  su = [
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
  au = function (t) {
    var o = t;
    return (
      su.forEach(function (n) {
        o = o.replace(n.letters, n.base);
      }),
      o
    );
  },
  Tr = function (t) {
    return au(t).toLowerCase();
  },
  uo = function (t, o, n) {
    return n ? Tr(t).indexOf(Tr(o)) : t.toLowerCase().indexOf(o.toLowerCase());
  },
  uu = function () {
    return !!document.documentMode;
  },
  vn = function (t) {
    return typeof t == "number";
  },
  cu = function (t) {
    return t === Object(t) ? Object.keys(t) : [];
  },
  lu = function (t) {
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
  fu = ["style", "className", "classNames"];
function Or(e, t) {
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
function Ar(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Or(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : Or(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
function Ht(e, t) {
  var o = function (r) {
    var i = function (c) {
        var l = c.style,
          u = c.className,
          f = c.classNames,
          d = Oa(c, fu),
          g = t ? t(d) : void 0,
          p = Dn(
            e,
            {
              style: l,
              className: u,
              classNames: f,
            },
            g,
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
          Ar(
            Ar({}, a),
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
var du = function (t, o) {
  return t.hasOwnProperty(o) ? t[o]++ : (t[o] = 0), o + "_" + t[o];
};
function co(e) {
  var t = e.selectionStart,
    o = e.selectionEnd,
    n = e.value,
    r = n === void 0 ? "" : n,
    i = e.onCaretPositionChange,
    s = e.containerRef,
    a = e.children;
  e.singleLine;
  var c = e.style,
    l = ge({
      left: void 0,
      top: void 0,
    }),
    u = Pt(l, 2),
    f = u[0],
    d = u[1],
    g = ge(),
    p = Pt(g, 2),
    y = p[0],
    v = p[1];
  Re(function () {
    b();
  });
  var b = function () {
      if (y) {
        var x = y.offsetLeft,
          I = y.offsetTop;
        if (!(f.left === x && f.top === I)) {
          var T = {
            left: x,
            top: I,
          };
          d(T), i(T);
        }
      }
    },
    _ = Ne(a),
    S;
  o === t && (S = ye(r, _, t, "START"));
  var A = [],
    E = {},
    P = A,
    F = 0,
    m = function (x, I, T) {
      if (vn(S) && S >= I && S <= I + x.length) {
        var w = S - I;
        P.push(O(x.substring(0, w), F)), (P = [O(x.substring(w), F)]);
      } else P.push(O(x, F));
      F++;
    },
    $ = function (x, I, T, w, D, B, C) {
      var R = du(E, w);
      P.push(M(w, D, B, R));
    },
    O = function (x, I) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Oe({}, c("substring"), {
          key: I,
        }),
        x,
      );
    },
    M = function (x, I, T, w) {
      var D = {
          id: x,
          display: I,
          key: w,
        },
        B = Ge.toArray(a)[T];
      return /* @__PURE__ */ oe.cloneElement(B, D);
    },
    q = function (x) {
      return /* @__PURE__ */ oe.createElement(
        "span",
        Oe({}, c("caret"), {
          ref: v,
          key: "caret",
        }),
        x,
      );
    };
  return (
    ht(r, _, $, m),
    P.push(" "),
    P !== A && A.push(q(P)),
    /* @__PURE__ */ oe.createElement(
      "div",
      Oe({}, c, {
        ref: s,
      }),
      A,
    )
  );
}
co.propTypes = {
  selectionStart: L.number,
  selectionEnd: L.number,
  value: L.string.isRequired,
  onCaretPositionChange: L.func.isRequired,
  containerRef: L.oneOfType([
    L.func,
    L.shape({
      current: typeof Element > "u" ? L.any : L.instanceOf(Element),
    }),
  ]),
  children: L.oneOfType([L.element, L.arrayOf(L.element)]).isRequired,
};
var pu = Ht(
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
  hu = pu(co);
function lo(e) {
  var t = e.id,
    o = e.focused,
    n = e.ignoreAccents,
    r = e.index,
    i = e.onClick,
    s = e.onMouseEnter,
    a = e.query,
    c = e.renderSuggestion,
    l = e.suggestion,
    u = e.style;
  e.className, e.classNames;
  var f = {
      onClick: i,
      onMouseEnter: s,
    },
    d = function () {
      var v = g(),
        b = p(v);
      return c ? c(l, a, b, r, o) : b;
    },
    g = function () {
      if (typeof l == "string") return l;
      var v = l.id,
        b = l.display;
      return v === void 0 || !b ? v : b;
    },
    p = function (v) {
      var b = uo(v, a, n);
      return b === -1
        ? /* @__PURE__ */ oe.createElement("span", u("display"), v)
        : /* @__PURE__ */ oe.createElement(
            "span",
            u("display"),
            v.substring(0, b),
            /* @__PURE__ */ oe.createElement(
              "b",
              u("highlight"),
              v.substring(b, b + a.length),
            ),
            v.substring(b + a.length),
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
      f,
      u,
    ),
    d(),
  );
}
lo.propTypes = {
  id: L.string.isRequired,
  query: L.string.isRequired,
  index: L.number.isRequired,
  ignoreAccents: L.bool,
  suggestion: L.oneOfType([
    L.string,
    L.shape({
      id: L.oneOfType([L.string, L.number]).isRequired,
      display: L.string,
    }),
  ]).isRequired,
  renderSuggestion: L.func,
  focused: L.bool,
};
var gu = Ht(
    {
      cursor: "pointer",
    },
    function (e) {
      return {
        "&focused": e.focused,
      };
    },
  ),
  vu = gu(lo);
function yu(e) {
  var t = e.style,
    o = e.className,
    n = e.classNames,
    r = Dn(mu, {
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
var mu = {};
function fo(e) {
  var t = e.id,
    o = e.suggestions,
    n = o === void 0 ? {} : o,
    r = e.a11ySuggestionsListLabel,
    i = e.focusIndex,
    s = e.position,
    a = e.left,
    c = e.right,
    l = e.top,
    u = e.scrollFocusedIntoView,
    f = e.isLoading,
    d = e.isOpened,
    g = e.onSelect,
    p =
      g === void 0
        ? function () {
            return null;
          }
        : g,
    y = e.ignoreAccents,
    v = e.containerRef,
    b = e.children,
    _ = e.style,
    S = e.customSuggestionsContainer,
    A = e.onMouseDown,
    E = e.onMouseEnter,
    P = ge(void 0),
    F = Pt(P, 2),
    m = F[0],
    $ = F[1];
  Re(
    function () {
      if (!(!m || m.offsetHeight >= m.scrollHeight || !u)) {
        var T = m.scrollTop,
          w = m.children[i].getBoundingClientRect(),
          D = w.top,
          B = w.bottom,
          C = m.getBoundingClientRect(),
          R = C.top;
        (D = D - R + T),
          (B = B - R + T),
          D < T
            ? (m.scrollTop = D)
            : B > m.offsetHeight && (m.scrollTop = B - m.offsetHeight);
      }
    },
    [i, u, m],
  );
  var O = function () {
      var w = /* @__PURE__ */ oe.createElement(
        "ul",
        Oe(
          {
            ref: $,
            id: t,
            role: "listbox",
            "aria-label": r,
          },
          _("list"),
        ),
        Object.values(n).reduce(function (D, B) {
          var C = B.results,
            R = B.queryInfo;
          return [].concat(
            wt(D),
            wt(
              C.map(function (U, z) {
                return M(U, R, D.length + z);
              }),
            ),
          );
        }, []),
      );
      return S ? S(w) : w;
    },
    M = function (w, D, B) {
      var C = B === i,
        R = D.childIndex,
        U = D.query,
        z = Ge.toArray(b)[R].props.renderSuggestion;
      return /* @__PURE__ */ oe.createElement(vu, {
        style: _("item"),
        key: "".concat(R, "-").concat(I(w)),
        id: ao(t, B),
        query: U,
        index: B,
        ignoreAccents: y,
        renderSuggestion: z,
        suggestion: w,
        focused: C,
        onClick: function () {
          return x(w, D);
        },
        onMouseEnter: function () {
          return Y(B);
        },
      });
    },
    q = function () {
      if (f)
        return /* @__PURE__ */ oe.createElement(yu, {
          style: _("loadingIndicator"),
        });
    },
    Y = function (w, D) {
      E && E(w);
    },
    x = function (w, D) {
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
          za(
            {
              position: s || "absolute",
              left: a,
              right: c,
              top: l,
            },
            _,
          ),
          {
            onMouseDown: A,
            ref: v,
          },
        ),
        O(),
        q(),
      )
    : null;
}
fo.propTypes = {
  id: L.string.isRequired,
  suggestions: L.object.isRequired,
  a11ySuggestionsListLabel: L.string,
  focusIndex: L.number,
  position: L.string,
  left: L.number,
  right: L.number,
  top: L.number,
  scrollFocusedIntoView: L.bool,
  isLoading: L.bool,
  isOpened: L.bool.isRequired,
  onSelect: L.func,
  ignoreAccents: L.bool,
  customSuggestionsContainer: L.func,
  containerRef: L.oneOfType([
    L.func,
    L.shape({
      current: typeof Element > "u" ? L.any : L.instanceOf(Element),
    }),
  ]),
};
var Eu = Ht({
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
  bu = Eu(fo);
function Rr(e, t) {
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
function Ae(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Rr(Object(o), !0).forEach(function (n) {
          ee(e, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
      : Rr(Object(o)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }
  return e;
}
function _u(e) {
  var t = Su();
  return function () {
    var n = xt(e),
      r;
    if (t) {
      var i = xt(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return ma(this, r);
  };
}
function Su() {
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
var Cu = function (t) {
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
  Tu = function (t, o) {
    return t instanceof Array
      ? function (n, r) {
          for (var i = [], s = 0, a = t.length; s < a; ++s) {
            var c = t[s].display || t[s].id;
            uo(c, n, o) >= 0 && i.push(t[s]);
          }
          return i;
        }
      : t;
  },
  We = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40,
  },
  St = !1,
  po = {
    /**
     * If set to `true` a regular text input element will be rendered
     * instead of a textarea
     */
    singleLine: L.bool,
    allowSpaceInQuery: L.bool,
    allowSuggestionsAboveCursor: L.bool,
    forceSuggestionsAboveCursor: L.bool,
    ignoreAccents: L.bool,
    a11ySuggestionsListLabel: L.string,
    value: L.string,
    onKeyDown: L.func,
    customSuggestionsContainer: L.func,
    onSelect: L.func,
    onBlur: L.func,
    onChange: L.func,
    suggestionsPortalHost:
      typeof Element > "u" ? L.any : L.PropTypes.instanceOf(Element),
    inputRef: L.oneOfType([
      L.func,
      L.shape({
        current: typeof Element > "u" ? L.any : L.instanceOf(Element),
      }),
    ]),
    children: L.oneOfType([L.element, L.arrayOf(L.element)]).isRequired,
  },
  wn = /* @__PURE__ */ (function (e) {
    ya(o, e);
    var t = _u(o);
    function o(n) {
      var r;
      return (
        ga(this, o),
        (r = t.call(this, n)),
        ee(te(r), "setContainerElement", function (i) {
          r.containerElement = i;
        }),
        ee(te(r), "getInputProps", function () {
          var i = r.props,
            s = i.readOnly,
            a = i.disabled,
            c = i.style,
            l = lu(
              r.props,
              ["style", "classNames", "className"],
              // substyle props
              cu(po),
            );
          return Ae(
            Ae(
              Ae(Ae({}, l), c("input")),
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
              "aria-activedescendant": ao(
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
          if (!vn(r.state.selectionStart)) return null;
          var i = r.state.suggestionsPosition,
            s = i.position,
            a = i.left,
            c = i.top,
            l = i.right,
            u = /* @__PURE__ */ oe.createElement(
              bu,
              {
                id: r.uuidSuggestionsOverlay,
                style: r.props.style("suggestions"),
                position: s,
                left: a,
                top: c,
                right: l,
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
            ? /* @__PURE__ */ Ko.createPortal(u, r.props.suggestionsPortalHost)
            : u;
        }),
        ee(te(r), "renderHighlighter", function () {
          var i = r.state,
            s = i.selectionStart,
            a = i.selectionEnd,
            c = r.props,
            l = c.singleLine,
            u = c.children,
            f = c.value,
            d = c.style;
          return /* @__PURE__ */ oe.createElement(
            hu,
            {
              containerRef: r.setHighlighterElement,
              style: d("highlighter"),
              value: f,
              singleLine: l,
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
          return ke(r.props.value || "", Ne(r.props.children));
        }),
        ee(te(r), "executeOnChange", function (i) {
          for (
            var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), c = 1;
            c < s;
            c++
          )
            a[c - 1] = arguments[c];
          if (r.props.onChange) {
            var l;
            return (l = r.props).onChange.apply(l, [i].concat(a));
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
          if (((St = !1), uu())) {
            var s =
              (document.activeElement &&
                document.activeElement.contentDocument) ||
              document;
            if (s.activeElement !== i.target) return;
          }
          var a = r.props.value || "",
            c = Ne(r.props.children),
            l = i.target.value,
            u = r.state.selectionStart;
          u == null && (u = i.target.selectionStart);
          var f = r.state.selectionEnd;
          f == null && (f = i.target.selectionEnd);
          var d = tu(
            a,
            l,
            {
              selectionStartBefore: u,
              selectionEndBefore: f,
              selectionEndAfter: i.target.selectionEnd,
            },
            c,
          );
          l = ke(d, c);
          var g = i.target.selectionStart,
            p = i.target.selectionEnd,
            y = !1,
            v = Cr(a, c, g);
          v !== void 0 &&
            r.state.selectionEnd > v &&
            ((g = v + (i.nativeEvent.data ? i.nativeEvent.data.length : 0)),
            (p = g),
            (y = !0)),
            r.setState({
              selectionStart: g,
              selectionEnd: p,
              setSelectionAfterMentionChange: y,
            });
          var b = at(d, c);
          i.nativeEvent.isComposing &&
            g === p &&
            r.updateMentionsQueries(r.inputElement.value, g);
          var _ = {
            target: {
              value: d,
            },
          };
          r.executeOnChange(_, d, l, b);
        }),
        ee(te(r), "handleSelect", function (i) {
          if (
            (r.setState({
              selectionStart: i.target.selectionStart,
              selectionEnd: i.target.selectionEnd,
            }),
            !St)
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
          var s = _t(r.state.suggestions);
          if (s === 0 || !r.suggestionsElement) {
            r.props.onKeyDown(i);
            return;
          }
          switch (
            (Object.values(We).indexOf(i.keyCode) >= 0 &&
              (i.preventDefault(), i.stopPropagation()),
            i.keyCode)
          ) {
            case We.ESC: {
              r.clearSuggestions();
              return;
            }
            case We.DOWN: {
              r.shiftFocus(1);
              return;
            }
            case We.UP: {
              r.shiftFocus(-1);
              return;
            }
            case We.RETURN: {
              r.selectFocused();
              return;
            }
            case We.TAB: {
              r.selectFocused();
              return;
            }
            default:
              return;
          }
        }),
        ee(te(r), "shiftFocus", function (i) {
          var s = _t(r.state.suggestions);
          r.setState({
            focusIndex: (s + r.state.focusIndex + i) % s,
            scrollFocusedIntoView: !0,
          });
        }),
        ee(te(r), "selectFocused", function () {
          var i = r.state,
            s = i.suggestions,
            a = i.focusIndex,
            c = Object.values(s).reduce(function (f, d) {
              var g = d.results,
                p = d.queryInfo;
              return [].concat(
                wt(f),
                wt(
                  g.map(function (y) {
                    return {
                      result: y,
                      queryInfo: p,
                    };
                  }),
                ),
              );
            }, [])[a],
            l = c.result,
            u = c.queryInfo;
          r.addMention(l, u),
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
            l = s.forceSuggestionsAboveCursor;
          if (!(!i || !r.suggestionsElement)) {
            var u = r.suggestionsElement,
              f = r.highlighterElement,
              d = f.getBoundingClientRect(),
              g = rn(f, "font-size"),
              p = {
                left: d.left + i.left,
                top: d.top + i.top + g,
              },
              y = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
              );
            if (u) {
              var v = {};
              if (a) {
                v.position = "fixed";
                var b = p.left,
                  _ = p.top;
                (b -= rn(u, "margin-left")),
                  (_ -= rn(u, "margin-top")),
                  (b -= f.scrollLeft),
                  (_ -= f.scrollTop);
                var S = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0,
                );
                b + u.offsetWidth > S
                  ? (v.left = Math.max(0, S - u.offsetWidth))
                  : (v.left = b),
                  (c && _ + u.offsetHeight > y && u.offsetHeight < _ - g) || l
                    ? (v.top = Math.max(0, _ - u.offsetHeight - g))
                    : (v.top = _);
              } else {
                var A = i.left - f.scrollLeft,
                  E = i.top - f.scrollTop;
                A + u.offsetWidth > r.containerElement.offsetWidth
                  ? (v.right = 0)
                  : (v.left = A),
                  (c &&
                    p.top - f.scrollTop + u.offsetHeight > y &&
                    u.offsetHeight < d.top - g - f.scrollTop) ||
                  l
                    ? (v.top = E - u.offsetHeight - g)
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
          St = !0;
        }),
        ee(te(r), "handleCompositionEnd", function () {
          St = !1;
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
            l = Ne(c),
            u = ye(a, l, s, "NULL");
          if (u !== null) {
            var f = nu(a.substring(0, u), l),
              d = i.substring(f, s);
            oe.Children.forEach(c, function (g, p) {
              if (g) {
                var y = Cu(g.props.trigger, r.props),
                  v = d.match(y);
                if (v) {
                  var b = f + d.indexOf(v[1], v.index);
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
        ee(te(r), "queryData", function (i, s, a, c, l) {
          var u = r.props,
            f = u.children,
            d = u.ignoreAccents,
            g = Ge.toArray(f)[s],
            p = Tu(g.props.data, d),
            y = p(i, r.updateSuggestions.bind(null, r._queryId, s, i, a, c, l));
          y instanceof Array &&
            r.updateSuggestions(r._queryId, s, i, a, c, l, y);
        }),
        ee(te(r), "updateSuggestions", function (i, s, a, c, l, u, f) {
          if (i === r._queryId) {
            r.suggestions = Ae(
              Ae({}, r.suggestions),
              {},
              ee({}, s, {
                queryInfo: {
                  childIndex: s,
                  query: a,
                  querySequenceStart: c,
                  querySequenceEnd: l,
                  plainTextValue: u,
                },
                results: f,
              }),
            );
            var d = r.state.focusIndex,
              g = _t(r.suggestions);
            r.setState({
              suggestions: r.suggestions,
              focusIndex: d >= g ? Math.max(g - 1, 0) : d,
            });
          }
        }),
        ee(te(r), "addMention", function (i, s) {
          var a = i.id,
            c = i.display,
            l = s.childIndex,
            u = s.querySequenceStart,
            f = s.querySequenceEnd,
            d = s.plainTextValue,
            g = r.props.value || "",
            p = Ne(r.props.children),
            y = Ge.toArray(r.props.children)[l],
            v = y.props,
            b = v.markup,
            _ = v.displayTransform,
            S = v.appendSpaceOnAdd,
            A = v.onAdd,
            E = ye(g, p, u, "START"),
            P = E + f - u,
            F = iu(b, a, c);
          S && (F += " ");
          var m = ut(g, E, P, F);
          r.inputElement.focus();
          var $ = _(a, c);
          S && ($ += " ");
          var O = u + $.length;
          r.setState({
            selectionStart: O,
            selectionEnd: O,
            setSelectionAfterMentionChange: !0,
          });
          var M = {
              target: {
                value: m,
              },
            },
            q = at(m, p),
            Y = ut(d, u, f, $);
          r.executeOnChange(M, m, Y, q),
            A && A(a, c, E, P),
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
            vn(r.state.selectionStart) &&
            (_t(r.state.suggestions) !== 0 || r.isLoading())
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
      va(o, [
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
                l = c.value,
                u = c.children,
                f = Ne(u),
                d = ye(l, f, s, "START"),
                g = ye(l, f, a, "END"),
                p = r.clipboardData.getData("text/react-mentions"),
                y = r.clipboardData.getData("text/plain"),
                v = ut(l, d, g, p || y).replace(/\r/g, ""),
                b = ke(v, f),
                _ = {
                  target: Ae(
                    Ae({}, r.target),
                    {},
                    {
                      value: v,
                    },
                  ),
                };
              this.executeOnChange(_, v, b, at(v, f));
              var S = Cr(l, f, s),
                A = (S || s) + ke(p || y, f).length;
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
              a = this.props,
              c = a.children,
              l = a.value,
              u = Ne(c),
              f = ye(l, u, i, "START"),
              d = ye(l, u, s, "END");
            r.clipboardData.setData("text/plain", r.target.value.slice(i, s)),
              r.clipboardData.setData("text/react-mentions", l.slice(f, d));
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
                l = c.children,
                u = c.value,
                f = Ne(l),
                d = ye(u, f, s, "START"),
                g = ye(u, f, a, "END"),
                p = [u.slice(0, d), u.slice(g)].join(""),
                y = ke(p, f),
                v = {
                  target: Ae(
                    Ae({}, r.target),
                    {},
                    {
                      value: y,
                    },
                  ),
                };
              this.executeOnChange(v, p, y, at(u, f));
            }
          },
          // Handle input element's change event
        },
      ]),
      o
    );
  })(oe.Component);
ee(wn, "propTypes", po);
ee(wn, "defaultProps", {
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
var rn = function (t, o) {
    var n = parseFloat(window.getComputedStyle(t, null).getPropertyValue(o));
    return isFinite(n) ? n : 0;
  },
  Ou = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent),
  Au = Ht(
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
        input: Ae(
          {
            height: "100%",
            bottom: 0,
            overflow: "hidden",
            resize: "none",
          },
          Ou
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
  Ru = Au(wn),
  Du = {
    fontWeight: "inherit",
  },
  xn = function (t) {
    var o = t.display,
      n = t.style,
      r = t.className,
      i = t.classNames,
      s = Dn(Du, {
        style: n,
        className: r,
        classNames: i,
      });
    return /* @__PURE__ */ oe.createElement("strong", s, o);
  };
xn.propTypes = {
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
  onAdd: L.func,
  onRemove: L.func,
  renderSuggestion: L.func,
  trigger: L.oneOfType([L.string, L.instanceOf(RegExp)]),
  markup: L.string,
  displayTransform: L.func,
  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: L.bool,
  isLoading: L.bool,
};
xn.defaultProps = {
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
const Iu = {
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
  wu = ({ value: e, setValue: t }) => {
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
    return /* @__PURE__ */ j.jsx(Ru, {
      autoFocus: !0,
      value: e,
      onChange: s,
      style: {
        ...Iu,
        minHeight: "40px",
        marginBottom: "10px",
      },
      placeholder: "Type your reply here...",
      className: "mentions-input",
      onKeyDown: r,
      children: /* @__PURE__ */ j.jsx(xn, {
        displayTransform: (a, c) => `@${c}`,
        trigger: "@",
        data: n,
        appendSpaceOnAdd: !0,
        renderSuggestion: (a, c) =>
          /* @__PURE__ */ j.jsx("div", {
            className: `user ${c ? "focused" : ""}`,
            children: a.display,
          }),
        onAdd: i,
      }),
    });
  },
  xu = wu,
  Pu = ({ comment: e, setComment: t, loading: o }) => {
    const n = le((r) => (r.currentUserId ? r.users[r.currentUserId] : null));
    return /* @__PURE__ */ j.jsxs("div", {
      className: je.conversationInputForm,
      children: [
        /* @__PURE__ */ j.jsx(Xr, { user: n }),
        /* @__PURE__ */ j.jsx(xu, { value: e, setValue: t }),
        /* @__PURE__ */ j.jsx(Fs, {
          loading: o,
          color: "primary",
          children: /* @__PURE__ */ j.jsx(_s, {}),
        }),
      ],
    });
  },
  ho = Pu,
  Nu = ({ text: e }) =>
    e
      ? /* @__PURE__ */ j.jsx("div", {
          className: je.highlightText,
          children: e,
        })
      : null,
  go = Nu,
  Fu = () => {
    var c;
    const e = le((l) => l.newConversation),
      t = le((l) => l.shareId),
      o = De(),
      [n, r] = ge(!1),
      [i, s] = ge(""),
      a = async (l) => {
        if ((l.stopPropagation(), l.preventDefault(), !(!e || !t))) {
          r(!0);
          try {
            console.log("saving conversation", e, i);
            const u = await Bs(t, {
              ...e,
              message: i,
            });
            if (!u.conversation_group_id) {
              console.error("Unable to create conversation group", u);
              return;
            }
            console.log("Successfully created conversation group", u);
          } catch (u) {
            console.error("error while saving conversation", e, u);
          }
          o(Ur()), r(!1), o(Tn(!0)), o(Hr()), s("");
        }
      };
    return /* @__PURE__ */ j.jsx(yn, {
      className: je.newConversationForm,
      children: /* @__PURE__ */ j.jsx(mn, {
        children: /* @__PURE__ */ j.jsxs("form", {
          onSubmit: a,
          children: [
            /* @__PURE__ */ j.jsx("h4", { children: "Add comment" }),
            /* @__PURE__ */ j.jsx(go, {
              text:
                (c = e == null ? void 0 : e.meta) == null
                  ? void 0
                  : c.highlight,
            }),
            /* @__PURE__ */ j.jsx(ho, {
              comment: i,
              setComment: s,
              loading: n,
            }),
          ],
        }),
      }),
    });
  },
  ju = Fu;
var vo = { exports: {} };
(function (e, t) {
  (function (o, n) {
    e.exports = n();
  })(Go, function () {
    var o = 1e3,
      n = 6e4,
      r = 36e5,
      i = "millisecond",
      s = "second",
      a = "minute",
      c = "hour",
      l = "day",
      u = "week",
      f = "month",
      d = "quarter",
      g = "year",
      p = "date",
      y = "Invalid Date",
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
        ordinal: function (x) {
          var I = ["th", "st", "nd", "rd"],
            T = x % 100;
          return "[" + x + (I[(T - 20) % 10] || I[T] || I[0]) + "]";
        },
      },
      S = function (x, I, T) {
        var w = String(x);
        return !w || w.length >= I
          ? x
          : "" + Array(I + 1 - w.length).join(T) + x;
      },
      A = {
        s: S,
        z: function (x) {
          var I = -x.utcOffset(),
            T = Math.abs(I),
            w = Math.floor(T / 60),
            D = T % 60;
          return (I <= 0 ? "+" : "-") + S(w, 2, "0") + ":" + S(D, 2, "0");
        },
        m: function x(I, T) {
          if (I.date() < T.date()) return -x(T, I);
          var w = 12 * (T.year() - I.year()) + (T.month() - I.month()),
            D = I.clone().add(w, f),
            B = T - D < 0,
            C = I.clone().add(w + (B ? -1 : 1), f);
          return +(-(w + (T - D) / (B ? D - C : C - D)) || 0);
        },
        a: function (x) {
          return x < 0 ? Math.ceil(x) || 0 : Math.floor(x);
        },
        p: function (x) {
          return (
            { M: f, y: g, w: u, d: l, D: p, h: c, m: a, s, ms: i, Q: d }[x] ||
            String(x || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (x) {
          return x === void 0;
        },
      },
      E = "en",
      P = {};
    P[E] = _;
    var F = "$isDayjsObject",
      m = function (x) {
        return x instanceof q || !(!x || !x[F]);
      },
      $ = function x(I, T, w) {
        var D;
        if (!I) return E;
        if (typeof I == "string") {
          var B = I.toLowerCase();
          P[B] && (D = B), T && ((P[B] = T), (D = B));
          var C = I.split("-");
          if (!D && C.length > 1) return x(C[0]);
        } else {
          var R = I.name;
          (P[R] = I), (D = R);
        }
        return !w && D && (E = D), D || (!w && E);
      },
      O = function (x, I) {
        if (m(x)) return x.clone();
        var T = typeof I == "object" ? I : {};
        return (T.date = x), (T.args = arguments), new q(T);
      },
      M = A;
    (M.l = $),
      (M.i = m),
      (M.w = function (x, I) {
        return O(x, { locale: I.$L, utc: I.$u, x: I.$x, $offset: I.$offset });
      });
    var q = (function () {
        function x(T) {
          (this.$L = $(T.locale, null, !0)),
            this.parse(T),
            (this.$x = this.$x || T.x || {}),
            (this[F] = !0);
        }
        var I = x.prototype;
        return (
          (I.parse = function (T) {
            (this.$d = (function (w) {
              var D = w.date,
                B = w.utc;
              if (D === null) return /* @__PURE__ */ new Date(NaN);
              if (M.u(D)) return /* @__PURE__ */ new Date();
              if (D instanceof Date) return new Date(D);
              if (typeof D == "string" && !/Z$/i.test(D)) {
                var C = D.match(v);
                if (C) {
                  var R = C[2] - 1 || 0,
                    U = (C[7] || "0").substring(0, 3);
                  return B
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
            return M;
          }),
          (I.isValid = function () {
            return this.$d.toString() !== y;
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
              B = !!M.u(w) || w,
              C = M.p(T),
              R = function (Q, W) {
                var ce = M.w(
                  D.$u ? Date.UTC(D.$y, W, Q) : new Date(D.$y, W, Q),
                  D,
                );
                return B ? ce : ce.endOf(l);
              },
              U = function (Q, W) {
                return M.w(
                  D.toDate()[Q].apply(
                    D.toDate("s"),
                    (B ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(W),
                  ),
                  D,
                );
              },
              z = this.$W,
              V = this.$M,
              X = this.$D,
              K = "set" + (this.$u ? "UTC" : "");
            switch (C) {
              case g:
                return B ? R(1, 0) : R(31, 11);
              case f:
                return B ? R(1, V) : R(0, V + 1);
              case u:
                var G = this.$locale().weekStart || 0,
                  J = (z < G ? z + 7 : z) - G;
                return R(B ? X - J : X + (6 - J), V);
              case l:
              case p:
                return U(K + "Hours", 0);
              case c:
                return U(K + "Minutes", 1);
              case a:
                return U(K + "Seconds", 2);
              case s:
                return U(K + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (I.endOf = function (T) {
            return this.startOf(T, !1);
          }),
          (I.$set = function (T, w) {
            var D,
              B = M.p(T),
              C = "set" + (this.$u ? "UTC" : ""),
              R = ((D = {}),
              (D[l] = C + "Date"),
              (D[p] = C + "Date"),
              (D[f] = C + "Month"),
              (D[g] = C + "FullYear"),
              (D[c] = C + "Hours"),
              (D[a] = C + "Minutes"),
              (D[s] = C + "Seconds"),
              (D[i] = C + "Milliseconds"),
              D)[B],
              U = B === l ? this.$D + (w - this.$W) : w;
            if (B === f || B === g) {
              var z = this.clone().set(p, 1);
              z.$d[R](U),
                z.init(),
                (this.$d = z.set(p, Math.min(this.$D, z.daysInMonth())).$d);
            } else R && this.$d[R](U);
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
              B = this;
            T = Number(T);
            var C = M.p(w),
              R = function (V) {
                var X = O(B);
                return M.w(X.date(X.date() + Math.round(V * T)), B);
              };
            if (C === f) return this.set(f, this.$M + T);
            if (C === g) return this.set(g, this.$y + T);
            if (C === l) return R(1);
            if (C === u) return R(7);
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
            if (!this.isValid()) return D.invalidDate || y;
            var B = T || "YYYY-MM-DDTHH:mm:ssZ",
              C = M.z(this),
              R = this.$H,
              U = this.$m,
              z = this.$M,
              V = D.weekdays,
              X = D.months,
              K = D.meridiem,
              G = function (W, ce, k, he) {
                return (W && (W[ce] || W(w, B))) || k[ce].slice(0, he);
              },
              J = function (W) {
                return M.s(R % 12 || 12, W, "0");
              },
              Q =
                K ||
                function (W, ce, k) {
                  var he = W < 12 ? "AM" : "PM";
                  return k ? he.toLowerCase() : he;
                };
            return B.replace(b, function (W, ce) {
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
                      return G(D.monthsShort, z, X, 3);
                    case "MMMM":
                      return G(X, z);
                    case "D":
                      return w.$D;
                    case "DD":
                      return M.s(w.$D, 2, "0");
                    case "d":
                      return String(w.$W);
                    case "dd":
                      return G(D.weekdaysMin, w.$W, V, 2);
                    case "ddd":
                      return G(D.weekdaysShort, w.$W, V, 3);
                    case "dddd":
                      return V[w.$W];
                    case "H":
                      return String(R);
                    case "HH":
                      return M.s(R, 2, "0");
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
                })(W) ||
                C.replace(":", "")
              );
            });
          }),
          (I.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (I.diff = function (T, w, D) {
            var B,
              C = this,
              R = M.p(w),
              U = O(T),
              z = (U.utcOffset() - this.utcOffset()) * n,
              V = this - U,
              X = function () {
                return M.m(C, U);
              };
            switch (R) {
              case g:
                B = X() / 12;
                break;
              case f:
                B = X();
                break;
              case d:
                B = X() / 3;
                break;
              case u:
                B = (V - z) / 6048e5;
                break;
              case l:
                B = (V - z) / 864e5;
                break;
              case c:
                B = V / r;
                break;
              case a:
                B = V / n;
                break;
              case s:
                B = V / o;
                break;
              default:
                B = V;
            }
            return D ? B : M.a(B);
          }),
          (I.daysInMonth = function () {
            return this.endOf(f).$D;
          }),
          (I.$locale = function () {
            return P[this.$L];
          }),
          (I.locale = function (T, w) {
            if (!T) return this.$L;
            var D = this.clone(),
              B = $(T, w, !0);
            return B && (D.$L = B), D;
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
          x
        );
      })(),
      Y = q.prototype;
    return (
      (O.prototype = Y),
      [
        ["$ms", i],
        ["$s", s],
        ["$m", a],
        ["$H", c],
        ["$W", l],
        ["$M", f],
        ["$y", g],
        ["$D", p],
      ].forEach(function (x) {
        Y[x[1]] = function (I) {
          return this.$g(I, x[0], x[1]);
        };
      }),
      (O.extend = function (x, I) {
        return x.$i || (x(I, q, O), (x.$i = !0)), O;
      }),
      (O.locale = $),
      (O.isDayjs = m),
      (O.unix = function (x) {
        return O(1e3 * x);
      }),
      (O.en = P[E]),
      (O.Ls = P),
      (O.p = {}),
      O
    );
  });
})(vo);
var Mu = vo.exports;
const $u = /* @__PURE__ */ Ft(Mu),
  Lu = ({ conversationGroupId: e }) => {
    const t = le((s) => s.shareId),
      o = De(),
      [n, r] = ge(!1),
      i = async () => {
        e &&
          (r(!0),
          await Vs(t, e),
          o(Ki({ conversationGroupId: e, shareId: t })),
          r(!1));
      };
    return e
      ? /* @__PURE__ */ j.jsx(Os, {
          disabled: n,
          className: je.resolveButton,
          title: "Resolve conversation",
          onClick: i,
          children: /* @__PURE__ */ j.jsx(bs, {}),
        })
      : null;
  },
  ku = Lu,
  Bu = ({
    user: e,
    timestamp: t,
    showResolveButton: o,
    conversationGroupId: n,
  }) =>
    /* @__PURE__ */ j.jsxs(qo, {
      className: "d-flex align-items-center justify-content-between mb-0",
      children: [
        /* @__PURE__ */ j.jsxs("div", {
          className: "d-flex align-items-center gap-1",
          children: [
            /* @__PURE__ */ j.jsx(Xr, { user: e }),
            /* @__PURE__ */ j.jsxs("h4", {
              children: [
                e == null ? void 0 : e.first_name,
                " ",
                e == null ? void 0 : e.last_name,
              ],
            }),
            /* @__PURE__ */ j.jsx("span", {
              children: $u(t).format("HH:mm, DD MMM YY"),
            }),
          ],
        }),
        o ? /* @__PURE__ */ j.jsx(ku, { conversationGroupId: n }) : null,
      ],
    }),
  yo = Bu,
  Hu = ({ conversation: e }) => {
    const t = le((o) => {
      var n;
      return (n = o.users) == null ? void 0 : n[e == null ? void 0 : e.user_id];
    });
    return /* @__PURE__ */ j.jsxs(yn, {
      children: [
        /* @__PURE__ */ j.jsx(yo, { user: t, timestamp: e.timestamp }),
        /* @__PURE__ */ j.jsx(mn, {
          children: /* @__PURE__ */ j.jsx("p", {
            children: e.message.replace(/@\[(.*?)\]\(\w+\)/g, "@$1"),
          }),
        }),
      ],
    });
  },
  Uu = Hu,
  zu = ({ conversationGroupId: e }) => {
    const t = le((c) => c.shareId),
      [o, n] = ge(""),
      [r, i] = ge(!1),
      s = De(),
      a = async (c) => {
        if ((c.stopPropagation(), c.preventDefault(), !(!t || !e))) {
          i(!0),
            console.log("saving reply", t, e, {
              message: o,
            });
          try {
            await Hs(t, e, {
              message: o,
            });
          } catch (l) {
            console.error("error while saving reply", l);
          }
          s(Ur()), i(!1), n("");
        }
      };
    return /* @__PURE__ */ j.jsx("div", {
      className: je.replyForm,
      children: /* @__PURE__ */ j.jsx("form", {
        onSubmit: a,
        className: "",
        children: /* @__PURE__ */ j.jsx(ho, {
          comment: o,
          setComment: n,
          loading: r,
        }),
      }),
    });
  },
  Vu = zu,
  Wu = ({ conversationGroup: e }) => {
    var f, d;
    const t = Te(null),
      o = le((g) => {
        var p;
        return (p = g.users) == null ? void 0 : p[e == null ? void 0 : e.owner];
      }),
      n = le((g) => g.selectedConversationId),
      r = De(),
      [i, s] = ge(!1);
    if (
      (Re(() => {
        var g;
        n &&
          ((g = t.current) == null ||
            g.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }));
      }, [n]),
      !((f = e == null ? void 0 : e.conversations) != null && f.length) ||
        (e == null ? void 0 : e.status) !== "Pending")
    )
      return null;
    const a = () => {
        r(Cn(e.conversation_group_id));
      },
      [c, ...l] = e.conversations,
      u = l.length
        ? l.length > 1
          ? `${l.length} replies`
          : `${l.length} reply`
        : "Reply";
    return /* @__PURE__ */ j.jsxs(yn, {
      className: `${je.conversationGroup} ${
        n === e.conversation_group_id ? "active" : ""
      }`,
      onClick: a,
      ref: t,
      children: [
        /* @__PURE__ */ j.jsx(yo, {
          user: o,
          timestamp: c.timestamp,
          showResolveButton: !0,
          conversationGroupId: e.conversation_group_id,
        }),
        /* @__PURE__ */ j.jsxs(mn, {
          children: [
            /* @__PURE__ */ j.jsx(go, {
              text: (d = e.meta) == null ? void 0 : d.highlight,
            }),
            /* @__PURE__ */ j.jsx("p", {
              children: c.message.replace(/@\[(.*?)\]\(\w+\)/g, "@$1"),
            }),
            /* @__PURE__ */ j.jsx(Nt, {
              onClick: () => s((g) => !g),
              color: "link",
              children: u,
            }),
            l.length
              ? /* @__PURE__ */ j.jsx(j.Fragment, {
                  children: i
                    ? /* @__PURE__ */ j.jsx(j.Fragment, {
                        children: l.map((g) =>
                          /* @__PURE__ */ j.jsx(
                            Uu,
                            { conversation: g },
                            g.conversation_id,
                          ),
                        ),
                      })
                    : null,
                })
              : null,
            i
              ? /* @__PURE__ */ j.jsx(Vu, {
                  conversationGroupId: e.conversation_group_id,
                })
              : null,
          ],
        }),
      ],
    });
  },
  qu = Wu,
  Yu = () => {
    const e = le((t) => t.conversations);
    return !e || !Object.keys(e).length
      ? /* @__PURE__ */ j.jsx("div", { children: "No conversations yet!" })
      : /* @__PURE__ */ j.jsx("div", {
          children: Object.values(e).map((t) =>
            /* @__PURE__ */ j.jsx(
              qu,
              {
                conversationGroup: t,
              },
              t.conversation_group_id,
            ),
          ),
        });
  },
  Ku = Yu,
  Gu = () => {
    const e = le((s) => s.isRightPanelOpen),
      t = le((s) => s.selectedConversationId),
      o = le((s) => s.newConversation),
      n = De(),
      r = () => {
        n(Tn(!1)), n(Cn(void 0)), n(Hr());
      };
    return !!o || e || t
      ? /* @__PURE__ */ j.jsxs(j.Fragment, {
          children: [
            /* @__PURE__ */ j.jsx(Yo, {
              onClick: r,
              className: je.conversationRightPanelCloseButton,
            }),
            /* @__PURE__ */ j.jsxs("div", {
              className: je.conversationRightPanel,
              children: [
                /* @__PURE__ */ j.jsx("h3", { children: "Comments" }),
                o
                  ? /* @__PURE__ */ j.jsx(ju, {})
                  : /* @__PURE__ */ j.jsx(Ku, {}),
              ],
            }),
          ],
        })
      : null;
  },
  Xu = Gu,
  Zu = 120,
  Ju = () => {
    const e = Te(),
      t = le((s) => s.shareId),
      o = le((s) => s.conversationsLoadingState),
      n = De(),
      r = le((s) => Object.keys(s.conversations || {})),
      i = Ke(
        (s) => {
          clearTimeout(e.current),
            Us(s)
              .then((a) => {
                console.log("useConversations", a),
                  n(qi(a == null ? void 0 : a.dbt_docs_share_conversations)),
                  (e.current = setTimeout(() => {
                    i(s);
                  }, Zu * 1e3));
              })
              .catch((a) =>
                console.error("error while fetching conversations list", a),
              )
              .finally(() => {
                n(or(Ce.INITIALIZED));
              });
        },
        [n],
      );
    return (
      Re(() => {
        o !== Ce.UNINITIALIZED || !t || (n(or(Ce.LOADING)), i(t));
      }, [n, o, r, t, i]),
      { isLoading: o === Ce.LOADING }
    );
  },
  Qu = () => {
    const e = De(),
      t = le((r) => Object.keys(r.users || {})),
      [o, n] = ge(Ce.UNINITIALIZED);
    return (
      Re(() => {
        o !== Ce.UNINITIALIZED ||
          Object.keys(t).length ||
          (n(Ce.LOADING),
          zs()
            .then((r) => {
              console.log("useConversationUsers", r), e(Wi(r));
            })
            .catch((r) => console.error("error while fetching users list", r))
            .finally(() => {
              n(Ce.INITIALIZED);
            }));
      }, [e, o, t]),
      { isLoading: o === Ce.LOADING }
    );
  },
  ec = () => (
    Qu(),
    Ju(),
    /* @__PURE__ */ j.jsxs("div", {
      children: [/* @__PURE__ */ j.jsx(Xu, {}), /* @__PURE__ */ j.jsx(Qs, {})],
    })
  ),
  tc = ec,
  nc = zo(() => import("./DbtDocsRenderer.js")),
  rc = () => {
    const { loading: e, shareDetails: t } = Ws(),
      o = De(),
      { getHighlightedSelectionData: n, pos: r, onSelectionEnd: i } = Gs(),
      s = () => {
        const a = n();
        a && o(Yi(a));
      };
    return e
      ? /* @__PURE__ */ j.jsx("div", { children: "Loading..." })
      : !(t != null && t.catalog_presigned_url) ||
        !(t != null && t.manifest_presigned_url)
      ? /* @__PURE__ */ j.jsx("div", {
          children: "Unable to load required artifacts. Please try again.",
        })
      : /* @__PURE__ */ j.jsxs("div", {
          children: [
            /* @__PURE__ */ j.jsx("div", {
              className: "d-flex justify-content-end mb-2",
              children: /* @__PURE__ */ j.jsx(Ls, {}),
            }),
            /* @__PURE__ */ j.jsx(tc, {}),
            /* @__PURE__ */ j.jsx(nc, {
              shareDetails: t,
              onSelectionEnd: i,
            }),
            r ? /* @__PURE__ */ j.jsx(Ms, { pos: r, onAddComment: s }) : null,
          ],
        });
  },
  oc = rc,
  ic = ({ shareId: e, userId: t, conversationGroupId: o, source: n }) =>
    /* @__PURE__ */ j.jsx("div", {
      className: "altimate-component",
      children: /* @__PURE__ */ j.jsx(Xi, {
        shareId: e,
        userId: t,
        conversationGroupId: o,
        source: n,
        children: /* @__PURE__ */ j.jsx(oc, {}),
      }),
    }),
  Ec = ic;
export {
  tt as A,
  Ec as D,
  le as a,
  pc as b,
  hc as c,
  Gr as d,
  je as e,
  Jo as g,
  j,
  dc as s,
  De as u,
};
