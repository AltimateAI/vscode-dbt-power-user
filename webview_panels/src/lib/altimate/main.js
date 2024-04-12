import './main.css';
import * as be from "react";
import oe, { createContext as tt, useReducer as Ko, useCallback as Fe, useMemo as Ge, useContext as nt, useLayoutEffect as Xo, useEffect as Ae, useRef as De, useState as ge, useId as Mr, useInsertionEffect as Go, cloneElement as Zo, Children as Ze, isValidElement as $r, Component as Jo, createElement as Qn, lazy as Qo } from "react";
import { Tooltip as ei, Button as Pt, Spinner as ti, Card as Ft, CardTitle as kr, CardBody as Mt, CloseButton as ni } from "reactstrap";
import ri, { createPortal as Cn } from "react-dom";
import { Light as $t } from "react-syntax-highlighter";
var oi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ue(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var dn = { exports: {} }, st = {};
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
function ii() {
  if (er)
    return st;
  er = 1;
  var e = oe, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(u, c, l) {
    var a, d = {}, f = null, h = null;
    l !== void 0 && (f = "" + l), c.key !== void 0 && (f = "" + c.key), c.ref !== void 0 && (h = c.ref);
    for (a in c)
      n.call(c, a) && !i.hasOwnProperty(a) && (d[a] = c[a]);
    if (u && u.defaultProps)
      for (a in c = u.defaultProps, c)
        d[a] === void 0 && (d[a] = c[a]);
    return { $$typeof: t, type: u, key: f, ref: h, props: d, _owner: r.current };
  }
  return st.Fragment = o, st.jsx = s, st.jsxs = s, st;
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
  return tr || (tr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = oe, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), u = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), a = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), p = Symbol.iterator, m = "@@iterator";
    function v(g) {
      if (g === null || typeof g != "object")
        return null;
      var P = p && g[p] || g[m];
      return typeof P == "function" ? P : null;
    }
    var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(g) {
      {
        for (var P = arguments.length, B = new Array(P > 1 ? P - 1 : 0), G = 1; G < P; G++)
          B[G - 1] = arguments[G];
        S("error", g, B);
      }
    }
    function S(g, P, B) {
      {
        var G = b.ReactDebugCurrentFrame, ie = G.getStackAddendum();
        ie !== "" && (P += "%s", B = B.concat([ie]));
        var ce = B.map(function(re) {
          return String(re);
        });
        ce.unshift("Warning: " + P), Function.prototype.apply.call(console[g], console, ce);
      }
    }
    var A = !1, E = !1, N = !1, F = !1, y = !1, H;
    H = Symbol.for("react.module.reference");
    function O(g) {
      return !!(typeof g == "string" || typeof g == "function" || g === n || g === i || y || g === r || g === l || g === a || F || g === h || A || E || N || typeof g == "object" && g !== null && (g.$$typeof === f || g.$$typeof === d || g.$$typeof === s || g.$$typeof === u || g.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      g.$$typeof === H || g.getModuleId !== void 0));
    }
    function k(g, P, B) {
      var G = g.displayName;
      if (G)
        return G;
      var ie = P.displayName || P.name || "";
      return ie !== "" ? B + "(" + ie + ")" : B;
    }
    function Z(g) {
      return g.displayName || "Context";
    }
    function X(g) {
      if (g == null)
        return null;
      if (typeof g.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof g == "function")
        return g.displayName || g.name || null;
      if (typeof g == "string")
        return g;
      switch (g) {
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
          case d:
            var G = g.displayName || null;
            return G !== null ? G : X(g.type) || "Memo";
          case f: {
            var ie = g, ce = ie._payload, re = ie._init;
            try {
              return X(re(ce));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var j = Object.assign, I = 0, T, x, D, L, C, R, U;
    function z() {
    }
    z.__reactDisabledLog = !0;
    function q() {
      {
        if (I === 0) {
          T = console.log, x = console.info, D = console.warn, L = console.error, C = console.group, R = console.groupCollapsed, U = console.groupEnd;
          var g = {
            configurable: !0,
            enumerable: !0,
            value: z,
            writable: !0
          };
          Object.defineProperties(console, {
            info: g,
            log: g,
            warn: g,
            error: g,
            group: g,
            groupCollapsed: g,
            groupEnd: g
          });
        }
        I++;
      }
    }
    function K() {
      {
        if (I--, I === 0) {
          var g = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: j({}, g, {
              value: T
            }),
            info: j({}, g, {
              value: x
            }),
            warn: j({}, g, {
              value: D
            }),
            error: j({}, g, {
              value: L
            }),
            group: j({}, g, {
              value: C
            }),
            groupCollapsed: j({}, g, {
              value: R
            }),
            groupEnd: j({}, g, {
              value: U
            })
          });
        }
        I < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var W = b.ReactCurrentDispatcher, Y;
    function J(g, P, B) {
      {
        if (Y === void 0)
          try {
            throw Error();
          } catch (ie) {
            var G = ie.stack.trim().match(/\n( *(at )?)/);
            Y = G && G[1] || "";
          }
        return `
` + Y + g;
      }
    }
    var Q = !1, V;
    {
      var le = typeof WeakMap == "function" ? WeakMap : Map;
      V = new le();
    }
    function $(g, P) {
      if (!g || Q)
        return "";
      {
        var B = V.get(g);
        if (B !== void 0)
          return B;
      }
      var G;
      Q = !0;
      var ie = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ce;
      ce = W.current, W.current = null, q();
      try {
        if (P) {
          var re = function() {
            throw Error();
          };
          if (Object.defineProperty(re.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(re, []);
            } catch (we) {
              G = we;
            }
            Reflect.construct(g, [], re);
          } else {
            try {
              re.call();
            } catch (we) {
              G = we;
            }
            g.call(re.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (we) {
            G = we;
          }
          g();
        }
      } catch (we) {
        if (we && G && typeof we.stack == "string") {
          for (var ne = we.stack.split(`
`), ve = G.stack.split(`
`), de = ne.length - 1, pe = ve.length - 1; de >= 1 && pe >= 0 && ne[de] !== ve[pe]; )
            pe--;
          for (; de >= 1 && pe >= 0; de--, pe--)
            if (ne[de] !== ve[pe]) {
              if (de !== 1 || pe !== 1)
                do
                  if (de--, pe--, pe < 0 || ne[de] !== ve[pe]) {
                    var Ce = `
` + ne[de].replace(" at new ", " at ");
                    return g.displayName && Ce.includes("<anonymous>") && (Ce = Ce.replace("<anonymous>", g.displayName)), typeof g == "function" && V.set(g, Ce), Ce;
                  }
                while (de >= 1 && pe >= 0);
              break;
            }
        }
      } finally {
        Q = !1, W.current = ce, K(), Error.prepareStackTrace = ie;
      }
      var Ve = g ? g.displayName || g.name : "", Jn = Ve ? J(Ve) : "";
      return typeof g == "function" && V.set(g, Jn), Jn;
    }
    function he(g, P, B) {
      return $(g, !1);
    }
    function ze(g) {
      var P = g.prototype;
      return !!(P && P.isReactComponent);
    }
    function $e(g, P, B) {
      if (g == null)
        return "";
      if (typeof g == "function")
        return $(g, ze(g));
      if (typeof g == "string")
        return J(g);
      switch (g) {
        case l:
          return J("Suspense");
        case a:
          return J("SuspenseList");
      }
      if (typeof g == "object")
        switch (g.$$typeof) {
          case c:
            return he(g.render);
          case d:
            return $e(g.type, P, B);
          case f: {
            var G = g, ie = G._payload, ce = G._init;
            try {
              return $e(ce(ie), P, B);
            } catch {
            }
          }
        }
      return "";
    }
    var vt = Object.prototype.hasOwnProperty, Bn = {}, Hn = b.ReactDebugCurrentFrame;
    function mt(g) {
      if (g) {
        var P = g._owner, B = $e(g.type, g._source, P ? P.type : null);
        Hn.setExtraStackFrame(B);
      } else
        Hn.setExtraStackFrame(null);
    }
    function Do(g, P, B, G, ie) {
      {
        var ce = Function.call.bind(vt);
        for (var re in g)
          if (ce(g, re)) {
            var ne = void 0;
            try {
              if (typeof g[re] != "function") {
                var ve = Error((G || "React class") + ": " + B + " type `" + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ve.name = "Invariant Violation", ve;
              }
              ne = g[re](P, re, G, B, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (de) {
              ne = de;
            }
            ne && !(ne instanceof Error) && (mt(ie), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", G || "React class", B, re, typeof ne), mt(null)), ne instanceof Error && !(ne.message in Bn) && (Bn[ne.message] = !0, mt(ie), _("Failed %s type: %s", B, ne.message), mt(null));
          }
      }
    }
    var Io = Array.isArray;
    function Yt(g) {
      return Io(g);
    }
    function wo(g) {
      {
        var P = typeof Symbol == "function" && Symbol.toStringTag, B = P && g[Symbol.toStringTag] || g.constructor.name || "Object";
        return B;
      }
    }
    function xo(g) {
      try {
        return Un(g), !1;
      } catch {
        return !0;
      }
    }
    function Un(g) {
      return "" + g;
    }
    function zn(g) {
      if (xo(g))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wo(g)), Un(g);
    }
    var it = b.ReactCurrentOwner, No = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, qn, Vn, Kt;
    Kt = {};
    function jo(g) {
      if (vt.call(g, "ref")) {
        var P = Object.getOwnPropertyDescriptor(g, "ref").get;
        if (P && P.isReactWarning)
          return !1;
      }
      return g.ref !== void 0;
    }
    function Po(g) {
      if (vt.call(g, "key")) {
        var P = Object.getOwnPropertyDescriptor(g, "key").get;
        if (P && P.isReactWarning)
          return !1;
      }
      return g.key !== void 0;
    }
    function Fo(g, P) {
      if (typeof g.ref == "string" && it.current && P && it.current.stateNode !== P) {
        var B = X(it.current.type);
        Kt[B] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', X(it.current.type), g.ref), Kt[B] = !0);
      }
    }
    function Mo(g, P) {
      {
        var B = function() {
          qn || (qn = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", P));
        };
        B.isReactWarning = !0, Object.defineProperty(g, "key", {
          get: B,
          configurable: !0
        });
      }
    }
    function $o(g, P) {
      {
        var B = function() {
          Vn || (Vn = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", P));
        };
        B.isReactWarning = !0, Object.defineProperty(g, "ref", {
          get: B,
          configurable: !0
        });
      }
    }
    var ko = function(g, P, B, G, ie, ce, re) {
      var ne = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: g,
        key: P,
        ref: B,
        props: re,
        // Record the component responsible for creating this element.
        _owner: ce
      };
      return ne._store = {}, Object.defineProperty(ne._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ne, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.defineProperty(ne, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ie
      }), Object.freeze && (Object.freeze(ne.props), Object.freeze(ne)), ne;
    };
    function Lo(g, P, B, G, ie) {
      {
        var ce, re = {}, ne = null, ve = null;
        B !== void 0 && (zn(B), ne = "" + B), Po(P) && (zn(P.key), ne = "" + P.key), jo(P) && (ve = P.ref, Fo(P, ie));
        for (ce in P)
          vt.call(P, ce) && !No.hasOwnProperty(ce) && (re[ce] = P[ce]);
        if (g && g.defaultProps) {
          var de = g.defaultProps;
          for (ce in de)
            re[ce] === void 0 && (re[ce] = de[ce]);
        }
        if (ne || ve) {
          var pe = typeof g == "function" ? g.displayName || g.name || "Unknown" : g;
          ne && Mo(re, pe), ve && $o(re, pe);
        }
        return ko(g, ne, ve, ie, G, it.current, re);
      }
    }
    var Xt = b.ReactCurrentOwner, Wn = b.ReactDebugCurrentFrame;
    function qe(g) {
      if (g) {
        var P = g._owner, B = $e(g.type, g._source, P ? P.type : null);
        Wn.setExtraStackFrame(B);
      } else
        Wn.setExtraStackFrame(null);
    }
    var Gt;
    Gt = !1;
    function Zt(g) {
      return typeof g == "object" && g !== null && g.$$typeof === t;
    }
    function Yn() {
      {
        if (Xt.current) {
          var g = X(Xt.current.type);
          if (g)
            return `

Check the render method of \`` + g + "`.";
        }
        return "";
      }
    }
    function Bo(g) {
      {
        if (g !== void 0) {
          var P = g.fileName.replace(/^.*[\\\/]/, ""), B = g.lineNumber;
          return `

Check your code at ` + P + ":" + B + ".";
        }
        return "";
      }
    }
    var Kn = {};
    function Ho(g) {
      {
        var P = Yn();
        if (!P) {
          var B = typeof g == "string" ? g : g.displayName || g.name;
          B && (P = `

Check the top-level render call using <` + B + ">.");
        }
        return P;
      }
    }
    function Xn(g, P) {
      {
        if (!g._store || g._store.validated || g.key != null)
          return;
        g._store.validated = !0;
        var B = Ho(P);
        if (Kn[B])
          return;
        Kn[B] = !0;
        var G = "";
        g && g._owner && g._owner !== Xt.current && (G = " It was passed a child from " + X(g._owner.type) + "."), qe(g), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', B, G), qe(null);
      }
    }
    function Gn(g, P) {
      {
        if (typeof g != "object")
          return;
        if (Yt(g))
          for (var B = 0; B < g.length; B++) {
            var G = g[B];
            Zt(G) && Xn(G, P);
          }
        else if (Zt(g))
          g._store && (g._store.validated = !0);
        else if (g) {
          var ie = v(g);
          if (typeof ie == "function" && ie !== g.entries)
            for (var ce = ie.call(g), re; !(re = ce.next()).done; )
              Zt(re.value) && Xn(re.value, P);
        }
      }
    }
    function Uo(g) {
      {
        var P = g.type;
        if (P == null || typeof P == "string")
          return;
        var B;
        if (typeof P == "function")
          B = P.propTypes;
        else if (typeof P == "object" && (P.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        P.$$typeof === d))
          B = P.propTypes;
        else
          return;
        if (B) {
          var G = X(P);
          Do(B, g.props, "prop", G, g);
        } else if (P.PropTypes !== void 0 && !Gt) {
          Gt = !0;
          var ie = X(P);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ie || "Unknown");
        }
        typeof P.getDefaultProps == "function" && !P.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function zo(g) {
      {
        for (var P = Object.keys(g.props), B = 0; B < P.length; B++) {
          var G = P[B];
          if (G !== "children" && G !== "key") {
            qe(g), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", G), qe(null);
            break;
          }
        }
        g.ref !== null && (qe(g), _("Invalid attribute `ref` supplied to `React.Fragment`."), qe(null));
      }
    }
    function Zn(g, P, B, G, ie, ce) {
      {
        var re = O(g);
        if (!re) {
          var ne = "";
          (g === void 0 || typeof g == "object" && g !== null && Object.keys(g).length === 0) && (ne += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ve = Bo(ie);
          ve ? ne += ve : ne += Yn();
          var de;
          g === null ? de = "null" : Yt(g) ? de = "array" : g !== void 0 && g.$$typeof === t ? (de = "<" + (X(g.type) || "Unknown") + " />", ne = " Did you accidentally export a JSX literal instead of a component?") : de = typeof g, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", de, ne);
        }
        var pe = Lo(g, P, B, ie, ce);
        if (pe == null)
          return pe;
        if (re) {
          var Ce = P.children;
          if (Ce !== void 0)
            if (G)
              if (Yt(Ce)) {
                for (var Ve = 0; Ve < Ce.length; Ve++)
                  Gn(Ce[Ve], g);
                Object.freeze && Object.freeze(Ce);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Gn(Ce, g);
        }
        return g === n ? zo(pe) : Uo(pe), pe;
      }
    }
    function qo(g, P, B) {
      return Zn(g, P, B, !0);
    }
    function Vo(g, P, B) {
      return Zn(g, P, B, !1);
    }
    var Wo = Vo, Yo = qo;
    at.Fragment = n, at.jsx = Wo, at.jsxs = Yo;
  }()), at;
}
process.env.NODE_ENV === "production" ? dn.exports = ii() : dn.exports = si();
var w = dn.exports;
const ai = () => {
  var t, o, n;
  const e = (n = (o = (t = window.location.hash) == null ? void 0 : t.split("#")[1]) == null ? void 0 : o.replace("!/", "")) == null ? void 0 : n.split("/");
  return { name: e == null ? void 0 : e[1], resourceType: e == null ? void 0 : e[0] };
};
var Te = /* @__PURE__ */ ((e) => (e[e.LOADING = 0] = "LOADING", e[e.UNINITIALIZED = 1] = "UNINITIALIZED", e[e.INITIALIZED = 2] = "INITIALIZED", e))(Te || {});
function ui(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function ci(e) {
  return ui(e) && "type" in e && typeof e.type == "string";
}
var Lr = Symbol.for("immer-nothing"), nr = Symbol.for("immer-draftable"), _e = Symbol.for("immer-state"), li = process.env.NODE_ENV !== "production" ? [
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
function ye(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const o = li[e], n = typeof o == "function" ? o.apply(null, t) : o;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Je = Object.getPrototypeOf;
function Me(e) {
  return !!e && !!e[_e];
}
function Ne(e) {
  var t;
  return e ? Br(e) || Array.isArray(e) || !!e[nr] || !!((t = e.constructor) != null && t[nr]) || Lt(e) || Bt(e) : !1;
}
var di = Object.prototype.constructor.toString();
function Br(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Je(e);
  if (t === null)
    return !0;
  const o = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return o === Object ? !0 : typeof o == "function" && Function.toString.call(o) === di;
}
function Rt(e, t) {
  kt(e) === 0 ? Reflect.ownKeys(e).forEach((o) => {
    t(o, e[o], e);
  }) : e.forEach((o, n) => t(n, o, e));
}
function kt(e) {
  const t = e[_e];
  return t ? t.type_ : Array.isArray(e) ? 1 : Lt(e) ? 2 : Bt(e) ? 3 : 0;
}
function fn(e, t) {
  return kt(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Hr(e, t, o) {
  const n = kt(e);
  n === 2 ? e.set(t, o) : n === 3 ? e.add(o) : e[t] = o;
}
function fi(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Lt(e) {
  return e instanceof Map;
}
function Bt(e) {
  return e instanceof Set;
}
function ke(e) {
  return e.copy_ || e.base_;
}
function pn(e, t) {
  if (Lt(e))
    return new Map(e);
  if (Bt(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && Br(e))
    return Je(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const o = Object.getOwnPropertyDescriptors(e);
  delete o[_e];
  let n = Reflect.ownKeys(o);
  for (let r = 0; r < n.length; r++) {
    const i = n[r], s = o[i];
    s.writable === !1 && (s.writable = !0, s.configurable = !0), (s.get || s.set) && (o[i] = {
      configurable: !0,
      writable: !0,
      // could live with !!desc.set as well here...
      enumerable: s.enumerable,
      value: e[i]
    });
  }
  return Object.create(Je(e), o);
}
function Tn(e, t = !1) {
  return Ht(e) || Me(e) || !Ne(e) || (kt(e) > 1 && (e.set = e.add = e.clear = e.delete = pi), Object.freeze(e), t && Object.entries(e).forEach(([o, n]) => Tn(n, !0))), e;
}
function pi() {
  ye(2);
}
function Ht(e) {
  return Object.isFrozen(e);
}
var hi = {};
function He(e) {
  const t = hi[e];
  return t || ye(0, e), t;
}
var dt;
function Ur() {
  return dt;
}
function gi(e, t) {
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
function rr(e, t) {
  t && (He("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function hn(e) {
  gn(e), e.drafts_.forEach(vi), e.drafts_ = null;
}
function gn(e) {
  e === dt && (dt = e.parent_);
}
function or(e) {
  return dt = gi(dt, e);
}
function vi(e) {
  const t = e[_e];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function ir(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const o = t.drafts_[0];
  return e !== void 0 && e !== o ? (o[_e].modified_ && (hn(t), ye(4)), Ne(e) && (e = Dt(t, e), t.parent_ || It(t, e)), t.patches_ && He("Patches").generateReplacementPatches_(
    o[_e].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Dt(t, o, []), hn(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Lr ? e : void 0;
}
function Dt(e, t, o) {
  if (Ht(t))
    return t;
  const n = t[_e];
  if (!n)
    return Rt(
      t,
      (r, i) => sr(e, n, t, r, i, o)
    ), t;
  if (n.scope_ !== e)
    return t;
  if (!n.modified_)
    return It(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    n.finalized_ = !0, n.scope_.unfinalizedDrafts_--;
    const r = n.copy_;
    let i = r, s = !1;
    n.type_ === 3 && (i = new Set(r), r.clear(), s = !0), Rt(
      i,
      (u, c) => sr(e, n, r, u, c, o, s)
    ), It(e, r, !1), o && e.patches_ && He("Patches").generatePatches_(
      n,
      o,
      e.patches_,
      e.inversePatches_
    );
  }
  return n.copy_;
}
function sr(e, t, o, n, r, i, s) {
  if (process.env.NODE_ENV !== "production" && r === o && ye(5), Me(r)) {
    const u = i && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !fn(t.assigned_, n) ? i.concat(n) : void 0, c = Dt(e, r, u);
    if (Hr(o, n, c), Me(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    s && o.add(r);
  if (Ne(r) && !Ht(r)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Dt(e, r), (!t || !t.scope_.parent_) && typeof n != "symbol" && Object.prototype.propertyIsEnumerable.call(o, n) && It(e, r);
  }
}
function It(e, t, o = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Tn(t, o);
}
function mi(e, t) {
  const o = Array.isArray(e), n = {
    type_: o ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Ur(),
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
  let r = n, i = On;
  o && (r = [n], i = ft);
  const { revoke: s, proxy: u } = Proxy.revocable(r, i);
  return n.draft_ = u, n.revoke_ = s, u;
}
var On = {
  get(e, t) {
    if (t === _e)
      return e;
    const o = ke(e);
    if (!fn(o, t))
      return yi(e, o, t);
    const n = o[t];
    return e.finalized_ || !Ne(n) ? n : n === Jt(e.base_, t) ? (Qt(e), e.copy_[t] = mn(n, e)) : n;
  },
  has(e, t) {
    return t in ke(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(ke(e));
  },
  set(e, t, o) {
    const n = zr(ke(e), t);
    if (n != null && n.set)
      return n.set.call(e.draft_, o), !0;
    if (!e.modified_) {
      const r = Jt(ke(e), t), i = r == null ? void 0 : r[_e];
      if (i && i.base_ === o)
        return e.copy_[t] = o, e.assigned_[t] = !1, !0;
      if (fi(o, r) && (o !== void 0 || fn(e.base_, t)))
        return !0;
      Qt(e), vn(e);
    }
    return e.copy_[t] === o && // special case: handle new props with value 'undefined'
    (o !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(o) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = o, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Jt(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Qt(e), vn(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const o = ke(e), n = Reflect.getOwnPropertyDescriptor(o, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: o[t]
    };
  },
  defineProperty() {
    ye(11);
  },
  getPrototypeOf(e) {
    return Je(e.base_);
  },
  setPrototypeOf() {
    ye(12);
  }
}, ft = {};
Rt(On, (e, t) => {
  ft[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
ft.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && ye(13), ft.set.call(this, e, t, void 0);
};
ft.set = function(e, t, o) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && ye(14), On.set.call(this, e[0], t, o, e[0]);
};
function Jt(e, t) {
  const o = e[_e];
  return (o ? ke(o) : e)[t];
}
function yi(e, t, o) {
  var r;
  const n = zr(t, o);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (r = n.get) == null ? void 0 : r.call(e.draft_)
  ) : void 0;
}
function zr(e, t) {
  if (!(t in e))
    return;
  let o = Je(e);
  for (; o; ) {
    const n = Object.getOwnPropertyDescriptor(o, t);
    if (n)
      return n;
    o = Je(o);
  }
}
function vn(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && vn(e.parent_));
}
function Qt(e) {
  e.copy_ || (e.copy_ = pn(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var Ei = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, o, n) => {
      if (typeof t == "function" && typeof o != "function") {
        const i = o;
        o = t;
        const s = this;
        return function(c = i, ...l) {
          return s.produce(c, (a) => o.call(this, a, ...l));
        };
      }
      typeof o != "function" && ye(6), n !== void 0 && typeof n != "function" && ye(7);
      let r;
      if (Ne(t)) {
        const i = or(this), s = mn(t, void 0);
        let u = !0;
        try {
          r = o(s), u = !1;
        } finally {
          u ? hn(i) : gn(i);
        }
        return rr(i, n), ir(r, i);
      } else if (!t || typeof t != "object") {
        if (r = o(t), r === void 0 && (r = t), r === Lr && (r = void 0), this.autoFreeze_ && Tn(r, !0), n) {
          const i = [], s = [];
          He("Patches").generateReplacementPatches_(t, r, i, s), n(i, s);
        }
        return r;
      } else
        ye(1, t);
    }, this.produceWithPatches = (t, o) => {
      if (typeof t == "function")
        return (s, ...u) => this.produceWithPatches(s, (c) => t(c, ...u));
      let n, r;
      return [this.produce(t, o, (s, u) => {
        n = s, r = u;
      }), n, r];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Ne(e) || ye(8), Me(e) && (e = qr(e));
    const t = or(this), o = mn(e, void 0);
    return o[_e].isManual_ = !0, gn(t), o;
  }
  finishDraft(e, t) {
    const o = e && e[_e];
    (!o || !o.isManual_) && ye(9);
    const { scope_: n } = o;
    return rr(n, t), ir(void 0, n);
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
    const n = He("Patches").applyPatches_;
    return Me(e) ? n(e, t) : this.produce(
      e,
      (r) => n(r, t)
    );
  }
};
function mn(e, t) {
  const o = Lt(e) ? He("MapSet").proxyMap_(e, t) : Bt(e) ? He("MapSet").proxySet_(e, t) : mi(e, t);
  return (t ? t.scope_ : Ur()).drafts_.push(o), o;
}
function qr(e) {
  return Me(e) || ye(10, e), Vr(e);
}
function Vr(e) {
  if (!Ne(e) || Ht(e))
    return e;
  const t = e[_e];
  let o;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, o = pn(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    o = pn(e, !0);
  return Rt(o, (n, r) => {
    Hr(o, n, Vr(r));
  }), t && (t.finalized_ = !1), o;
}
var Se = new Ei(), Wr = Se.produce;
Se.produceWithPatches.bind(
  Se
);
Se.setAutoFreeze.bind(Se);
Se.setUseStrictShallowCopy.bind(Se);
Se.applyPatches.bind(Se);
Se.createDraft.bind(Se);
Se.finishDraft.bind(Se);
var bi = (e, t, o) => {
  if (t.length === 1 && t[0] === o) {
    let n = !1;
    try {
      const r = {};
      e(r) === r && (n = !0);
    } catch {
    }
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
        { stack: r }
      );
    }
  }
}, _i = (e, t, o) => {
  const { memoize: n, memoizeOptions: r } = t, { inputSelectorResults: i, inputSelectorResultsCopy: s } = e, u = n(() => ({}), ...r);
  if (!(u.apply(null, i) === u.apply(null, s))) {
    let l;
    try {
      throw new Error();
    } catch (a) {
      ({ stack: l } = a);
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
        stack: l
      }
    );
  }
}, Si = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function Ci(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function Ti(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function Oi(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((o) => typeof o == "function")) {
    const o = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${o}]`);
  }
}
var ar = (e) => Array.isArray(e) ? e : [e];
function Ai(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return Oi(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function ur(e, t) {
  const o = [], { length: n } = e;
  for (let r = 0; r < n; r++)
    o.push(e[r].apply(null, t));
  return o;
}
var Ri = (e, t) => {
  const { identityFunctionCheck: o, inputStabilityCheck: n } = {
    ...Si,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: o === "always" || o === "once" && e,
      run: bi
    },
    inputStabilityCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: _i
    }
  };
}, Di = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Ii = typeof WeakRef < "u" ? WeakRef : Di, wi = 0, cr = 1;
function yt() {
  return {
    s: wi,
    v: void 0,
    o: null,
    p: null
  };
}
function An(e, t = {}) {
  let o = yt();
  const { resultEqualityCheck: n } = t;
  let r, i = 0;
  function s() {
    var d;
    let u = o;
    const { length: c } = arguments;
    for (let f = 0, h = c; f < h; f++) {
      const p = arguments[f];
      if (typeof p == "function" || typeof p == "object" && p !== null) {
        let m = u.o;
        m === null && (u.o = m = /* @__PURE__ */ new WeakMap());
        const v = m.get(p);
        v === void 0 ? (u = yt(), m.set(p, u)) : u = v;
      } else {
        let m = u.p;
        m === null && (u.p = m = /* @__PURE__ */ new Map());
        const v = m.get(p);
        v === void 0 ? (u = yt(), m.set(p, u)) : u = v;
      }
    }
    const l = u;
    let a;
    if (u.s === cr ? a = u.v : (a = e.apply(null, arguments), i++), l.s = cr, n) {
      const f = ((d = r == null ? void 0 : r.deref) == null ? void 0 : d.call(r)) ?? r;
      f != null && n(f, a) && (a = f, i !== 0 && i--), r = typeof a == "object" && a !== null || typeof a == "function" ? new Ii(a) : a;
    }
    return l.v = a, a;
  }
  return s.clearCache = () => {
    o = yt(), s.resetResultsCount();
  }, s.resultsCount = () => i, s.resetResultsCount = () => {
    i = 0;
  }, s;
}
function Yr(e, ...t) {
  const o = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...r) => {
    let i = 0, s = 0, u, c = {}, l = r.pop();
    typeof l == "object" && (c = l, l = r.pop()), Ci(
      l,
      `createSelector expects an output function after the inputs, but received: [${typeof l}]`
    );
    const a = {
      ...o,
      ...c
    }, {
      memoize: d,
      memoizeOptions: f = [],
      argsMemoize: h = An,
      argsMemoizeOptions: p = [],
      devModeChecks: m = {}
    } = a, v = ar(f), b = ar(p), _ = Ai(r), S = d(function() {
      return i++, l.apply(
        null,
        arguments
      );
    }, ...v);
    let A = !0;
    const E = h(function() {
      s++;
      const F = ur(
        _,
        arguments
      );
      if (u = S.apply(null, F), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: y, inputStabilityCheck: H } = Ri(A, m);
        if (y.shouldRun && y.run(
          l,
          F,
          u
        ), H.shouldRun) {
          const O = ur(
            _,
            arguments
          );
          H.run(
            { inputSelectorResults: F, inputSelectorResultsCopy: O },
            { memoize: d, memoizeOptions: v },
            arguments
          );
        }
        A && (A = !1);
      }
      return u;
    }, ...b);
    return Object.assign(E, {
      resultFunc: l,
      memoizedResultFunc: S,
      dependencies: _,
      dependencyRecomputations: () => s,
      resetDependencyRecomputations: () => {
        s = 0;
      },
      lastResult: () => u,
      recomputations: () => i,
      resetRecomputations: () => {
        i = 0;
      },
      memoize: d,
      argsMemoize: h
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var xi = /* @__PURE__ */ Yr(An), Ni = Object.assign(
  (e, t = xi) => {
    Ti(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const o = Object.keys(e), n = o.map(
      (i) => e[i]
    );
    return t(
      n,
      (...i) => i.reduce((s, u, c) => (s[o[c]] = u, s), {})
    );
  },
  { withTypes: () => Ni }
), ji = (...e) => {
  const t = Yr(...e), o = Object.assign((...n) => {
    const r = t(...n), i = (s, ...u) => r(Me(s) ? qr(s) : s, ...u);
    return Object.assign(i, r), i;
  }, {
    withTypes: () => o
  });
  return o;
};
ji(An);
function Qe(e, t) {
  function o(...n) {
    if (t) {
      let r = t(...n);
      if (!r)
        throw new Error(process.env.NODE_ENV === "production" ? fe(0) : "prepareAction did not return an object");
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
      payload: n[0]
    };
  }
  return o.toString = () => `${e}`, o.type = e, o.match = (n) => ci(n) && n.type === e, o;
}
function lr(e) {
  return Ne(e) ? Wr(e, () => {
  }) : e;
}
function dr(e, t, o) {
  if (e.has(t)) {
    let r = e.get(t);
    return o.update && (r = o.update(r, t, e), e.set(t, r)), r;
  }
  if (!o.insert)
    throw new Error(process.env.NODE_ENV === "production" ? fe(10) : "No insert provided for key not already in map");
  const n = o.insert(t, e);
  return e.set(t, n), n;
}
process.env.NODE_ENV;
function Kr(e) {
  const t = {}, o = [];
  let n;
  const r = {
    addCase(i, s) {
      if (process.env.NODE_ENV !== "production") {
        if (o.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? fe(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error(process.env.NODE_ENV === "production" ? fe(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const u = typeof i == "string" ? i : i.type;
      if (!u)
        throw new Error(process.env.NODE_ENV === "production" ? fe(28) : "`builder.addCase` cannot be called with an empty action type");
      if (u in t)
        throw new Error(process.env.NODE_ENV === "production" ? fe(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${u}'`);
      return t[u] = s, r;
    },
    addMatcher(i, s) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? fe(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return o.push({
        matcher: i,
        reducer: s
      }), r;
    },
    addDefaultCase(i) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? fe(31) : "`builder.addDefaultCase` can only be called once");
      return n = i, r;
    }
  };
  return e(r), [t, o, n];
}
function Pi(e) {
  return typeof e == "function";
}
function Fi(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? fe(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [o, n, r] = Kr(t), i;
  if (Pi(e))
    i = () => lr(e());
  else {
    const u = lr(e);
    i = () => u;
  }
  function s(u = i(), c) {
    let l = [o[c.type], ...n.filter(({
      matcher: a
    }) => a(c)).map(({
      reducer: a
    }) => a)];
    return l.filter((a) => !!a).length === 0 && (l = [r]), l.reduce((a, d) => {
      if (d)
        if (Me(a)) {
          const h = d(a, c);
          return h === void 0 ? a : h;
        } else {
          if (Ne(a))
            return Wr(a, (f) => d(f, c));
          {
            const f = d(a, c);
            if (f === void 0) {
              if (a === null)
                return a;
              throw new Error(process.env.NODE_ENV === "production" ? fe(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return f;
          }
        }
      return a;
    }, u);
  }
  return s.getInitialState = i, s;
}
var Mi = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", $i = (e = 21) => {
  let t = "", o = e;
  for (; o--; )
    t += Mi[Math.random() * 64 | 0];
  return t;
}, ki = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Li(e, t) {
  return `${e}/${t}`;
}
function Bi({
  creators: e
} = {}) {
  var o;
  const t = (o = e == null ? void 0 : e.asyncThunk) == null ? void 0 : o[ki];
  return function(r) {
    const {
      name: i,
      reducerPath: s = i
    } = r;
    if (!i)
      throw new Error(process.env.NODE_ENV === "production" ? fe(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && r.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const u = (typeof r.reducers == "function" ? r.reducers(zi()) : r.reducers) || {}, c = Object.keys(u), l = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, a = {
      addCase(S, A) {
        const E = typeof S == "string" ? S : S.type;
        if (!E)
          throw new Error(process.env.NODE_ENV === "production" ? fe(12) : "`context.addCase` cannot be called with an empty action type");
        if (E in l.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? fe(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + E);
        return l.sliceCaseReducersByType[E] = A, a;
      },
      addMatcher(S, A) {
        return l.sliceMatchers.push({
          matcher: S,
          reducer: A
        }), a;
      },
      exposeAction(S, A) {
        return l.actionCreators[S] = A, a;
      },
      exposeCaseReducer(S, A) {
        return l.sliceCaseReducersByName[S] = A, a;
      }
    };
    c.forEach((S) => {
      const A = u[S], E = {
        reducerName: S,
        type: Li(i, S),
        createNotation: typeof r.reducers == "function"
      };
      Vi(A) ? Yi(E, A, a, t) : qi(E, A, a);
    });
    function d() {
      if (process.env.NODE_ENV !== "production" && typeof r.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? fe(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [S = {}, A = [], E = void 0] = typeof r.extraReducers == "function" ? Kr(r.extraReducers) : [r.extraReducers], N = {
        ...S,
        ...l.sliceCaseReducersByType
      };
      return Fi(r.initialState, (F) => {
        for (let y in N)
          F.addCase(y, N[y]);
        for (let y of l.sliceMatchers)
          F.addMatcher(y.matcher, y.reducer);
        for (let y of A)
          F.addMatcher(y.matcher, y.reducer);
        E && F.addDefaultCase(E);
      });
    }
    const f = (S) => S, h = /* @__PURE__ */ new Map();
    let p;
    function m(S, A) {
      return p || (p = d()), p(S, A);
    }
    function v() {
      return p || (p = d()), p.getInitialState();
    }
    function b(S, A = !1) {
      function E(F) {
        let y = F[S];
        if (typeof y > "u") {
          if (A)
            y = v();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? fe(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return y;
      }
      function N(F = f) {
        const y = dr(h, A, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return dr(y, F, {
          insert: () => {
            const H = {};
            for (const [O, k] of Object.entries(r.selectors ?? {}))
              H[O] = Hi(k, F, v, A);
            return H;
          }
        });
      }
      return {
        reducerPath: S,
        getSelectors: N,
        get selectors() {
          return N(E);
        },
        selectSlice: E
      };
    }
    const _ = {
      name: i,
      reducer: m,
      actions: l.actionCreators,
      caseReducers: l.sliceCaseReducersByName,
      getInitialState: v,
      ...b(s),
      injectInto(S, {
        reducerPath: A,
        ...E
      } = {}) {
        const N = A ?? s;
        return S.inject({
          reducerPath: N,
          reducer: m
        }, E), {
          ..._,
          ...b(N, !0)
        };
      }
    };
    return _;
  };
}
function Hi(e, t, o, n) {
  function r(i, ...s) {
    let u = t(i);
    if (typeof u > "u") {
      if (n)
        u = o();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? fe(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(u, ...s);
  }
  return r.unwrapped = e, r;
}
var Ui = /* @__PURE__ */ Bi();
function zi() {
  function e(t, o) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...o
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...o) {
          return t(...o);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, o) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: o
      };
    },
    asyncThunk: e
  };
}
function qi({
  type: e,
  reducerName: t,
  createNotation: o
}, n, r) {
  let i, s;
  if ("reducer" in n) {
    if (o && !Wi(n))
      throw new Error(process.env.NODE_ENV === "production" ? fe(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    i = n.reducer, s = n.prepare;
  } else
    i = n;
  r.addCase(e, i).exposeCaseReducer(t, i).exposeAction(t, s ? Qe(e, s) : Qe(e));
}
function Vi(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Wi(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Yi({
  type: e,
  reducerName: t
}, o, n, r) {
  if (!r)
    throw new Error(process.env.NODE_ENV === "production" ? fe(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: i,
    fulfilled: s,
    pending: u,
    rejected: c,
    settled: l,
    options: a
  } = o, d = r(e, i, a);
  n.exposeAction(t, d), s && n.addCase(d.fulfilled, s), u && n.addCase(d.pending, u), c && n.addCase(d.rejected, c), l && n.addMatcher(d.settled, l), n.exposeCaseReducer(t, {
    fulfilled: s || Et,
    pending: u || Et,
    rejected: c || Et,
    settled: l || Et
  });
}
function Et() {
}
var Ki = (e, t) => {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? fe(32) : `${t} is not a function`);
}, Rn = "listenerMiddleware", Xi = (e) => {
  let {
    type: t,
    actionCreator: o,
    matcher: n,
    predicate: r,
    effect: i
  } = e;
  if (t)
    r = Qe(t).match;
  else if (o)
    t = o.type, r = o.match;
  else if (n)
    r = n;
  else if (!r)
    throw new Error(process.env.NODE_ENV === "production" ? fe(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return Ki(i, "options.listener"), {
    predicate: r,
    type: t,
    effect: i
  };
}, Gi = Object.assign((e) => {
  const {
    type: t,
    predicate: o,
    effect: n
  } = Xi(e);
  return {
    id: $i(),
    effect: n,
    type: t,
    predicate: o,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? fe(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => Gi
}), Zi = Object.assign(Qe(`${Rn}/add`), {
  withTypes: () => Zi
});
Qe(`${Rn}/removeAll`);
var Ji = Object.assign(Qe(`${Rn}/remove`), {
  withTypes: () => Ji
});
function fe(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Qi = {
  users: {},
  isRightPanelOpen: !1,
  selectedConversationId: void 0,
  conversations: {},
  conversationsLoadingState: Te.UNINITIALIZED,
  newConversation: void 0,
  shareId: void 0,
  docsAppRendered: !1,
  currentPage: ai(),
  codeblockLoaded: !1,
  source: void 0,
  manifest: {}
  // showHotspots: false,
}, wt = Ui({
  name: "appState",
  initialState: Qi,
  reducers: {
    setDocsAppRendered: (e, t) => {
      e.docsAppRendered = t.payload;
    },
    // toggleHotspots: (
    //   state,
    //   action: PayloadAction<ConversationsState["showHotspots"]>
    // ) => {
    //   state.showHotspots = action.payload;
    // },
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
      e.conversationsLoadingState = Te.UNINITIALIZED;
    },
    setUsers: (e, t) => {
      var o;
      return (o = t.payload) != null && o.length ? {
        ...e,
        users: t.payload.reduce((n, r) => (n[r.id] = r, n), {})
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
      var n, r;
      const o = t.payload;
      if (o.meta && o.meta.uniqueId) {
        const i = ((n = e.manifest.nodes) == null ? void 0 : n[o.meta.uniqueId]) || ((r = e.manifest.macros) == null ? void 0 : r[o.meta.uniqueId]);
        o.meta.filePath = (i == null ? void 0 : i.original_file_path) || "";
      }
      e.newConversation = o;
    },
    resetNewConversation: (e) => {
      e.newConversation = void 0;
    },
    setConversations: (e, t) => {
      t.payload && (e.conversations = t.payload.reduce(
        (o, n) => (o[n.conversation_group_id] = n, o),
        {}
      ));
    }
  }
}), {
  setCurrentUserId: Gc,
  setShareId: Zc,
  updateSelectedConversationId: Dn,
  updateRightPanelState: In,
  setUsers: es,
  setConversations: ts,
  resetNewConversation: wn,
  updateNewConversation: xn,
  upsertConversation: Jc,
  setDocsAppRendered: Qc,
  updateCurrentPage: el,
  updateCodeblockLoaded: tl,
  resolveConversationGroup: ns,
  setConversationsLoadingState: fr,
  refetchConversations: Xr,
  setConversationSource: nl,
  setManifest: rs
  // toggleHotspots,
} = wt.actions, Ut = tt({
  state: wt.getInitialState(),
  dispatch: () => null,
  getValue: () => null
}), os = ({
  children: e,
  shareId: t,
  userId: o,
  conversationGroupId: n,
  source: r
}) => {
  const [i, s] = Ko(wt.reducer, {
    ...wt.getInitialState(),
    shareId: t,
    currentUserId: o,
    selectedConversationId: n,
    isRightPanelOpen: !!n,
    source: r
  }), u = Fe(
    (l) => l(i),
    [i]
  ), c = Ge(
    () => ({
      state: i,
      dispatch: s,
      getValue: u
    }),
    [i, s, u]
  );
  return /* @__PURE__ */ w.jsx(Ut.Provider, { value: c, children: e });
}, is = os, ss = () => nt(Ut), se = (e) => {
  const { getValue: t } = nt(Ut);
  return t(e);
}, Ee = () => {
  const { dispatch: e } = nt(Ut);
  return e;
}, as = tt({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
}), us = tt(null), cs = typeof document < "u", Gr = cs ? Xo : Ae;
class pr {
  constructor() {
    this.order = [], this.scheduled = /* @__PURE__ */ new Set();
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
    this.order.length = 0, this.scheduled.clear();
  }
}
function ls(e) {
  let t = new pr(), o = new pr(), n = 0, r = !1, i = !1;
  const s = /* @__PURE__ */ new WeakSet(), u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, l = !1, a = !1) => {
      const d = a && r, f = d ? t : o;
      return l && s.add(c), f.add(c) && d && r && (n = t.order.length), c;
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
      if (r = !0, [t, o] = [o, t], o.clear(), n = t.order.length, n)
        for (let l = 0; l < n; l++) {
          const a = t.order[l];
          s.has(a) && (u.schedule(a), e()), a(c);
        }
      r = !1, i && (i = !1, u.process(c));
    }
  };
  return u;
}
const bt = [
  "read",
  "resolveKeyframes",
  "update",
  "preRender",
  "render",
  "postRender"
  // Compute
], ds = 40;
function fs(e, t) {
  let o = !1, n = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = bt.reduce((d, f) => (d[f] = ls(() => o = !0), d), {}), s = (d) => {
    i[d].process(r);
  }, u = () => {
    const d = performance.now();
    o = !1, r.delta = n ? 1e3 / 60 : Math.max(Math.min(d - r.timestamp, ds), 1), r.timestamp = d, r.isProcessing = !0, bt.forEach(s), r.isProcessing = !1, o && t && (n = !1, e(u));
  }, c = () => {
    o = !0, n = !0, r.isProcessing || e(u);
  };
  return { schedule: bt.reduce((d, f) => {
    const h = i[f];
    return d[f] = (p, m = !1, v = !1) => (o || c(), h.schedule(p, m, v)), d;
  }, {}), cancel: (d) => bt.forEach((f) => i[f].cancel(d)), state: r, steps: i };
}
const ps = tt({});
function hs(e) {
  const t = De(null);
  return t.current === null && (t.current = e()), t.current;
}
const gs = (e) => e, { schedule: vs, cancel: rl, state: ol, steps: il } = fs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : gs, !0);
function Zr() {
  const e = De(!1);
  return Gr(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function ms() {
  const e = Zr(), [t, o] = ge(0), n = Fe(() => {
    e.current && o(t + 1);
  }, [t]);
  return [Fe(() => vs.postRender(n), [n]), t];
}
class ys extends be.Component {
  getSnapshotBeforeUpdate(t) {
    const o = this.props.childRef.current;
    if (o && t.isPresent && !this.props.isPresent) {
      const n = this.props.sizeRef.current;
      n.height = o.offsetHeight || 0, n.width = o.offsetWidth || 0, n.top = o.offsetTop, n.left = o.offsetLeft;
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
function Es({ children: e, isPresent: t }) {
  const o = Mr(), n = De(null), r = De({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }), { nonce: i } = nt(as);
  return Go(() => {
    const { width: s, height: u, top: c, left: l } = r.current;
    if (t || !n.current || !s || !u)
      return;
    n.current.dataset.motionPopId = o;
    const a = document.createElement("style");
    return i && (a.nonce = i), document.head.appendChild(a), a.sheet && a.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${u}px !important;
            top: ${c}px !important;
            left: ${l}px !important;
          }
        `), () => {
      document.head.removeChild(a);
    };
  }, [t]), be.createElement(ys, { isPresent: t, childRef: n, sizeRef: r }, be.cloneElement(e, { ref: n }));
}
const en = ({ children: e, initial: t, isPresent: o, onExitComplete: n, custom: r, presenceAffectsLayout: i, mode: s }) => {
  const u = hs(bs), c = Mr(), l = Ge(
    () => ({
      id: c,
      initial: t,
      isPresent: o,
      custom: r,
      onExitComplete: (a) => {
        u.set(a, !0);
        for (const d of u.values())
          if (!d)
            return;
        n && n();
      },
      register: (a) => (u.set(a, !1), () => u.delete(a))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    i ? void 0 : [o]
  );
  return Ge(() => {
    u.forEach((a, d) => u.set(d, !1));
  }, [o]), be.useEffect(() => {
    !o && !u.size && n && n();
  }, [o]), s === "popLayout" && (e = be.createElement(Es, { isPresent: o }, e)), be.createElement(us.Provider, { value: l }, e);
};
function bs() {
  return /* @__PURE__ */ new Map();
}
function _s(e) {
  return Ae(() => () => e(), []);
}
const Le = (e) => e.key || "";
function Ss(e, t) {
  e.forEach((o) => {
    const n = Le(o);
    t.set(n, o);
  });
}
function Cs(e) {
  const t = [];
  return Ze.forEach(e, (o) => {
    $r(o) && t.push(o);
  }), t;
}
const Ts = ({ children: e, custom: t, initial: o = !0, onExitComplete: n, exitBeforeEnter: r, presenceAffectsLayout: i = !0, mode: s = "sync" }) => {
  const u = nt(ps).forceRender || ms()[0], c = Zr(), l = Cs(e);
  let a = l;
  const d = De(/* @__PURE__ */ new Map()).current, f = De(a), h = De(/* @__PURE__ */ new Map()).current, p = De(!0);
  if (Gr(() => {
    p.current = !1, Ss(l, h), f.current = a;
  }), _s(() => {
    p.current = !0, h.clear(), d.clear();
  }), p.current)
    return be.createElement(be.Fragment, null, a.map((_) => be.createElement(en, { key: Le(_), isPresent: !0, initial: o ? void 0 : !1, presenceAffectsLayout: i, mode: s }, _)));
  a = [...a];
  const m = f.current.map(Le), v = l.map(Le), b = m.length;
  for (let _ = 0; _ < b; _++) {
    const S = m[_];
    v.indexOf(S) === -1 && !d.has(S) && d.set(S, void 0);
  }
  return s === "wait" && d.size && (a = []), d.forEach((_, S) => {
    if (v.indexOf(S) !== -1)
      return;
    const A = h.get(S);
    if (!A)
      return;
    const E = m.indexOf(S);
    let N = _;
    if (!N) {
      const F = () => {
        d.delete(S);
        const y = Array.from(h.keys()).filter((H) => !v.includes(H));
        if (y.forEach((H) => h.delete(H)), f.current = l.filter((H) => {
          const O = Le(H);
          return (
            // filter out the node exiting
            O === S || // filter out the leftover children
            y.includes(O)
          );
        }), !d.size) {
          if (c.current === !1)
            return;
          u(), n && n();
        }
      };
      N = be.createElement(en, { key: Le(A), isPresent: !1, onExitComplete: F, custom: t, presenceAffectsLayout: i, mode: s }, A), d.set(S, N);
    }
    a.splice(E, 0, N);
  }), a = a.map((_) => {
    const S = _.key;
    return d.has(S) ? _ : be.createElement(en, { key: Le(_), isPresent: !0, presenceAffectsLayout: i, mode: s }, _);
  }), process.env.NODE_ENV !== "production" && s === "wait" && a.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`), be.createElement(be.Fragment, null, d.size ? a : a.map((_) => Zo(_)));
}, zt = "altimate-display-", Os = `${zt}-highlight`, hr = `${zt}-highlight-hover`, As = `${zt}-active-highlight`, Rs = 1049, qt = ({
  icon: e,
  className: t = "",
  ...o
}) => /* @__PURE__ */ w.jsx("i", { className: `${t} codicon codicon-${e}`, ...o }), Jr = (e) => /* @__PURE__ */ w.jsx(qt, { icon: "add", ...e }), Ds = (e) => /* @__PURE__ */ w.jsx(qt, { icon: "comment-unresolved", ...e }), Is = (e) => /* @__PURE__ */ w.jsx(qt, { icon: "check", ...e }), ws = (e) => /* @__PURE__ */ w.jsx(qt, { icon: "send", ...e }), xs = "_iconButton_eti7u_1", Ns = {
  iconButton: xs
}, js = (e) => /* @__PURE__ */ w.jsx(ks, { title: e.title, children: /* @__PURE__ */ w.jsx(
  "button",
  {
    ...e,
    className: `btn ${e.color ? `btn-${e.color}` : ""} ${e.className ?? ""} ${Ns.iconButton}`,
    type: e.type ?? "button",
    children: e.children
  }
) }), Qr = js, Ps = tt(null), tn = {
  didCatch: !1,
  error: null
};
class Fs extends Jo {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = tn;
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
      for (var o, n, r = arguments.length, i = new Array(r), s = 0; s < r; s++)
        i[s] = arguments[s];
      (o = (n = this.props).onReset) === null || o === void 0 || o.call(n, {
        args: i,
        reason: "imperative-api"
      }), this.setState(tn);
    }
  }
  componentDidCatch(t, o) {
    var n, r;
    (n = (r = this.props).onError) === null || n === void 0 || n.call(r, t, o);
  }
  componentDidUpdate(t, o) {
    const {
      didCatch: n
    } = this.state, {
      resetKeys: r
    } = this.props;
    if (n && o.error !== null && Ms(t.resetKeys, r)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: r,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(tn);
    }
  }
  render() {
    const {
      children: t,
      fallbackRender: o,
      FallbackComponent: n,
      fallback: r
    } = this.props, {
      didCatch: i,
      error: s
    } = this.state;
    let u = t;
    if (i) {
      const c = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof o == "function")
        u = o(c);
      else if (n)
        u = Qn(n, c);
      else if (r === null || $r(r))
        u = r;
      else
        throw s;
    }
    return Qn(Ps.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, u);
  }
}
function Ms() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((o, n) => !Object.is(o, t[n]));
}
const $s = (e) => {
  const [t, o] = ge(!1), n = () => o(!t), r = De(
    (e.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`).replace(/\s/g, "-")
  );
  return /* @__PURE__ */ w.jsxs(Fs, { fallback: /* @__PURE__ */ w.jsx("span", { id: r.current, children: e.children }), children: [
    /* @__PURE__ */ w.jsx("span", { id: r.current, children: e.children }),
    e.title ? /* @__PURE__ */ w.jsx(
      ei,
      {
        isOpen: t,
        target: r.current,
        toggle: n,
        className: e.className,
        children: e.title
      }
    ) : null
  ] });
}, ks = $s, Ls = "_loadingBtn_gadec_1", Bs = {
  loadingBtn: Ls
}, Hs = ({ loading: e, ...t }) => /* @__PURE__ */ w.jsx(
  Pt,
  {
    ...t,
    disabled: e ?? t.disabled,
    className: `${t.className ?? ""} ${Bs.loadingBtn}`,
    children: e ? /* @__PURE__ */ w.jsx(ti, {}) : t.children
  }
), Us = Hs;
function eo(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function zs(...e) {
  return e.map((o) => eo(o)).join("");
}
function nn(...e) {
  return "(" + e.map((o) => eo(o)).join("|") + ")";
}
function qs(e) {
  const t = e.COMMENT("--", "$"), o = {
    className: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [
          { begin: /''/ }
        ]
      }
    ]
  }, n = {
    begin: /"/,
    end: /"/,
    contains: [{ begin: /""/ }]
  }, r = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ], i = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ], s = [
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
    "varbinary"
  ], u = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ], c = [
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
    "year"
  ], l = [
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
    "width_bucket"
  ], a = [
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
    "localtimestamp"
  ], d = [
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
    "breadth first"
  ], f = l, h = [...c, ...u].filter((_) => !l.includes(_)), p = {
    className: "variable",
    begin: /@[a-z0-9]+/
  }, m = {
    className: "operator",
    begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, v = {
    begin: zs(/\b/, nn(...f), /\s*\(/),
    keywords: {
      built_in: f
    }
  };
  function b(_, { exceptions: S, when: A } = {}) {
    const E = A;
    return S = S || [], _.map((N) => N.match(/\|\d+$/) || S.includes(N) ? N : E(N) ? `${N}|0` : N);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: b(h, { when: (_) => _.length < 3 }),
      literal: r,
      type: s,
      built_in: a
    },
    contains: [
      {
        begin: nn(...d),
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: h.concat(d),
          literal: r,
          type: s
        }
      },
      {
        className: "type",
        begin: nn(...i)
      },
      v,
      p,
      o,
      n,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      t,
      m
    ]
  };
}
var Vs = qs;
const Ws = /* @__PURE__ */ Ue(Vs);
function Ys(e) {
  var t = "true false yes no null", o = "[\\w#;/?:@&=+$,.~*'()[\\]]+", n = {
    className: "attr",
    variants: [
      { begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)" },
      { begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)' },
      // double quoted keys
      { begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)" }
      // single quoted keys
    ]
  }, r = {
    className: "template-variable",
    variants: [
      { begin: /\{\{/, end: /\}\}/ },
      // jinja templates Ansible
      { begin: /%\{/, end: /\}/ }
      // Ruby i18n
    ]
  }, i = {
    className: "string",
    relevance: 0,
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /\S+/ }
    ],
    contains: [
      e.BACKSLASH_ESCAPE,
      r
    ]
  }, s = e.inherit(i, {
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /[^\s,{}[\]]+/ }
    ]
  }), u = "[0-9]{4}(-[0-9][0-9]){0,2}", c = "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?", l = "(\\.[0-9]*)?", a = "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?", d = {
    className: "number",
    begin: "\\b" + u + c + l + a + "\\b"
  }, f = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: t,
    relevance: 0
  }, h = {
    begin: /\{/,
    end: /\}/,
    contains: [f],
    illegal: "\\n",
    relevance: 0
  }, p = {
    begin: "\\[",
    end: "\\]",
    contains: [f],
    illegal: "\\n",
    relevance: 0
  }, m = [
    n,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Ruby/Rails erb
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0
    },
    {
      // named tags
      className: "type",
      begin: "!\\w+!" + o
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + o + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + o
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + o
    },
    {
      // fragment id &ref
      className: "meta",
      begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // fragment reference *ref
      className: "meta",
      begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // array listing
      className: "bullet",
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    e.HASH_COMMENT_MODE,
    {
      beginKeywords: t,
      keywords: { literal: t }
    },
    d,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: e.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    h,
    p,
    i
  ], v = [...m];
  return v.pop(), v.push(s), f.contains = v, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: m
  };
}
var Ks = Ys;
const Xs = /* @__PURE__ */ Ue(Ks);
function Gs(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function Zs(...e) {
  return e.map((o) => Gs(o)).join("");
}
function Js(e) {
  const t = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, o = {
    begin: "^[-\\*]{3,}",
    end: "$"
  }, n = {
    className: "code",
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      {
        begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
      },
      {
        begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
      },
      // needed to allow markdown as a sublanguage to work
      {
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        begin: "~~~",
        end: "~~~+[ ]*$"
      },
      {
        begin: "`.+?`"
      },
      {
        begin: "(?=^( {4}|\\t))",
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }
        ],
        relevance: 0
      }
    ]
  }, r = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: !0
  }, i = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: !0,
    contains: [
      {
        className: "symbol",
        begin: /\[/,
        end: /\]/,
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "link",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: !0
      }
    ]
  }, u = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: Zs(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.+?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: !0,
    contains: [
      {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: !0,
        returnEnd: !0
      },
      {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: !0,
        excludeEnd: !0
      }
    ]
  }, c = {
    className: "strong",
    contains: [],
    // defined later
    variants: [
      {
        begin: /_{2}/,
        end: /_{2}/
      },
      {
        begin: /\*{2}/,
        end: /\*{2}/
      }
    ]
  }, l = {
    className: "emphasis",
    contains: [],
    // defined later
    variants: [
      {
        begin: /\*(?!\*)/,
        end: /\*/
      },
      {
        begin: /_(?!_)/,
        end: /_/,
        relevance: 0
      }
    ]
  };
  c.contains.push(l), l.contains.push(c);
  let a = [
    t,
    u
  ];
  return c.contains = c.contains.concat(a), l.contains = l.contains.concat(a), a = a.concat(c, l), {
    name: "Markdown",
    aliases: [
      "md",
      "mkdown",
      "mkd"
    ],
    contains: [
      {
        className: "section",
        variants: [
          {
            begin: "^#{1,6}",
            end: "$",
            contains: a
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              {
                begin: "^[=-]*$"
              },
              {
                begin: "^",
                end: "\\n",
                contains: a
              }
            ]
          }
        ]
      },
      t,
      r,
      c,
      l,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: a,
        end: "$"
      },
      n,
      o,
      u,
      i
    ]
  };
}
var Qs = Js;
const ea = /* @__PURE__ */ Ue(Qs), ta = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    background: "#002b36",
    color: "#839496"
  },
  "hljs-comment": {
    color: "#586e75"
  },
  "hljs-quote": {
    color: "#586e75"
  },
  "hljs-keyword": {
    color: "#859900"
  },
  "hljs-selector-tag": {
    color: "#859900"
  },
  "hljs-addition": {
    color: "#859900"
  },
  "hljs-number": {
    color: "#2aa198"
  },
  "hljs-string": {
    color: "#2aa198"
  },
  "hljs-meta .hljs-meta-string": {
    color: "#2aa198"
  },
  "hljs-literal": {
    color: "#2aa198"
  },
  "hljs-doctag": {
    color: "#2aa198"
  },
  "hljs-regexp": {
    color: "#2aa198"
  },
  "hljs-title": {
    color: "#268bd2"
  },
  "hljs-section": {
    color: "#268bd2"
  },
  "hljs-name": {
    color: "#268bd2"
  },
  "hljs-selector-id": {
    color: "#268bd2"
  },
  "hljs-selector-class": {
    color: "#268bd2"
  },
  "hljs-attribute": {
    color: "#b58900"
  },
  "hljs-attr": {
    color: "#b58900"
  },
  "hljs-variable": {
    color: "#b58900"
  },
  "hljs-template-variable": {
    color: "#b58900"
  },
  "hljs-class .hljs-title": {
    color: "#b58900"
  },
  "hljs-type": {
    color: "#b58900"
  },
  "hljs-symbol": {
    color: "#cb4b16"
  },
  "hljs-bullet": {
    color: "#cb4b16"
  },
  "hljs-subst": {
    color: "#cb4b16"
  },
  "hljs-meta": {
    color: "#cb4b16"
  },
  "hljs-meta .hljs-keyword": {
    color: "#cb4b16"
  },
  "hljs-selector-attr": {
    color: "#cb4b16"
  },
  "hljs-selector-pseudo": {
    color: "#cb4b16"
  },
  "hljs-link": {
    color: "#cb4b16"
  },
  "hljs-built_in": {
    color: "#dc322f"
  },
  "hljs-deletion": {
    color: "#dc322f"
  },
  "hljs-formula": {
    background: "#073642"
  },
  "hljs-emphasis": {
    fontStyle: "italic"
  },
  "hljs-strong": {
    fontWeight: "bold"
  }
}, na = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    background: "#fdf6e3",
    color: "#657b83"
  },
  "hljs-comment": {
    color: "#93a1a1"
  },
  "hljs-quote": {
    color: "#93a1a1"
  },
  "hljs-keyword": {
    color: "#859900"
  },
  "hljs-selector-tag": {
    color: "#859900"
  },
  "hljs-addition": {
    color: "#859900"
  },
  "hljs-number": {
    color: "#2aa198"
  },
  "hljs-string": {
    color: "#2aa198"
  },
  "hljs-meta .hljs-meta-string": {
    color: "#2aa198"
  },
  "hljs-literal": {
    color: "#2aa198"
  },
  "hljs-doctag": {
    color: "#2aa198"
  },
  "hljs-regexp": {
    color: "#2aa198"
  },
  "hljs-title": {
    color: "#268bd2"
  },
  "hljs-section": {
    color: "#268bd2"
  },
  "hljs-name": {
    color: "#268bd2"
  },
  "hljs-selector-id": {
    color: "#268bd2"
  },
  "hljs-selector-class": {
    color: "#268bd2"
  },
  "hljs-attribute": {
    color: "#b58900"
  },
  "hljs-attr": {
    color: "#b58900"
  },
  "hljs-variable": {
    color: "#b58900"
  },
  "hljs-template-variable": {
    color: "#b58900"
  },
  "hljs-class .hljs-title": {
    color: "#b58900"
  },
  "hljs-type": {
    color: "#b58900"
  },
  "hljs-symbol": {
    color: "#cb4b16"
  },
  "hljs-bullet": {
    color: "#cb4b16"
  },
  "hljs-subst": {
    color: "#cb4b16"
  },
  "hljs-meta": {
    color: "#cb4b16"
  },
  "hljs-meta .hljs-keyword": {
    color: "#cb4b16"
  },
  "hljs-selector-attr": {
    color: "#cb4b16"
  },
  "hljs-selector-pseudo": {
    color: "#cb4b16"
  },
  "hljs-link": {
    color: "#cb4b16"
  },
  "hljs-built_in": {
    color: "#dc322f"
  },
  "hljs-deletion": {
    color: "#dc322f"
  },
  "hljs-formula": {
    background: "#eee8d5"
  },
  "hljs-emphasis": {
    fontStyle: "italic"
  },
  "hljs-strong": {
    fontWeight: "bold"
  }
}, ra = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    background: "white",
    color: "black"
  },
  "hljs-comment": {
    color: "#008000"
  },
  "hljs-quote": {
    color: "#008000"
  },
  "hljs-variable": {
    color: "#008000"
  },
  "hljs-keyword": {
    color: "#00f"
  },
  "hljs-selector-tag": {
    color: "#00f"
  },
  "hljs-built_in": {
    color: "#00f"
  },
  "hljs-name": {
    color: "#00f"
  },
  "hljs-tag": {
    color: "#00f"
  },
  "hljs-string": {
    color: "#a31515"
  },
  "hljs-title": {
    color: "#a31515"
  },
  "hljs-section": {
    color: "#a31515"
  },
  "hljs-attribute": {
    color: "#a31515"
  },
  "hljs-literal": {
    color: "#a31515"
  },
  "hljs-template-tag": {
    color: "#a31515"
  },
  "hljs-template-variable": {
    color: "#a31515"
  },
  "hljs-type": {
    color: "#a31515"
  },
  "hljs-addition": {
    color: "#a31515"
  },
  "hljs-deletion": {
    color: "#2b91af"
  },
  "hljs-selector-attr": {
    color: "#2b91af"
  },
  "hljs-selector-pseudo": {
    color: "#2b91af"
  },
  "hljs-meta": {
    color: "#2b91af"
  },
  "hljs-doctag": {
    color: "#808080"
  },
  "hljs-attr": {
    color: "#f00"
  },
  "hljs-symbol": {
    color: "#00b0e8"
  },
  "hljs-bullet": {
    color: "#00b0e8"
  },
  "hljs-link": {
    color: "#00b0e8"
  },
  "hljs-emphasis": {
    fontStyle: "italic"
  },
  "hljs-strong": {
    fontWeight: "bold"
  }
}, oa = "_codeblock_309cc_1", ia = {
  codeblock: oa
};
$t.registerLanguage("javascript", Ws);
$t.registerLanguage("javascript", Xs);
$t.registerLanguage("markdown", ea);
const sa = { vs: ra, solarizedDark: ta, solarizedLight: na }, aa = ({
  code: e,
  language: t,
  fileName: o,
  theme: n = "vs",
  showLineNumbers: r
}) => /* @__PURE__ */ w.jsxs(Ft, { className: ia.codeblock, children: [
  o ? /* @__PURE__ */ w.jsx(kr, { children: o }) : null,
  /* @__PURE__ */ w.jsx(Mt, { children: /* @__PURE__ */ w.jsx(
    $t,
    {
      showLineNumbers: r,
      language: t,
      style: sa[n],
      children: e
    }
  ) })
] }), ua = aa, ca = ({ pos: e, onAddComment: t }) => Cn(
  /* @__PURE__ */ w.jsx(Ts, { children: e && /* @__PURE__ */ w.jsx(
    Pt,
    {
      onClick: t,
      id: `${zt}-highlight`,
      style: {
        position: "absolute",
        top: e.y,
        left: e.x,
        // right: "15px",
        zIndex: Rs + 5,
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
      children: /* @__PURE__ */ w.jsx(Jr, {})
    }
  ) }),
  e.element.parentElement
), la = ca, da = () => {
  const {
    state: { isRightPanelOpen: e }
  } = ss(), t = Ee(), o = () => {
    t(In(!e));
  };
  return /* @__PURE__ */ w.jsx(Pt, { onClick: o, children: e ? "Hide conversations" : "Show conversations" });
}, fa = da, rt = {
  get: async (e, t, o) => ({}),
  post: async (e, t, o) => ({})
}, pa = (e) => rt.get(`dbt/dbt_docs_share/${e}`), ha = (e, t) => rt.post(`dbt/dbt_docs_share/${e}/conversation_group`, t), ga = (e, t, o) => rt.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/conversation`,
  o
), va = (e) => rt.get(`dbt/dbt_docs_share/${e}/conversations`), ma = (e) => rt.get("/users/chat", { company: e }), ya = (e, t) => rt.post(
  `dbt/dbt_docs_share/${e}/conversation_group/${t}/resolve`,
  { resolved: !0 }
), Ea = () => {
  const e = se(
    (u) => u.shareId
  ), [t, o] = ge(
    null
  ), [n, r] = ge(!1), i = Ee();
  Ae(() => {
    t != null && t.manifest_presigned_url && fetch(t.manifest_presigned_url).then((u) => u.json()).then((u) => {
      i(rs(u));
    }).catch(
      (u) => console.error(
        "error loading manifest",
        u,
        t.manifest_presigned_url
      )
    );
  }, [i, t == null ? void 0 : t.manifest_presigned_url]);
  const s = Fe(async () => {
    if (!e)
      return;
    r(!0);
    const u = await pa(e);
    if (u) {
      o(u);
      const c = document.getElementById("collapse-sidebar");
      c == null || c.click();
    }
    r(!1);
  }, [e]);
  return Ae(() => {
    !e || t || n || s();
  }, [e, t, s, n]), { shareDetails: t, loading: n };
};
var to = { exports: {} };
/*! web-highlighter v0.7.4 https://github.com/alienzhou/web-highlighter */
(function(e, t) {
  (function(o, n) {
    e.exports = n();
  })(window, function() {
    return function(o) {
      var n = {};
      function r(i) {
        if (n[i])
          return n[i].exports;
        var s = n[i] = { i, l: !1, exports: {} };
        return o[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
      }
      return r.m = o, r.c = n, r.d = function(i, s, u) {
        r.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: u });
      }, r.r = function(i) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
      }, r.t = function(i, s) {
        if (1 & s && (i = r(i)), 8 & s || 4 & s && typeof i == "object" && i && i.__esModule)
          return i;
        var u = /* @__PURE__ */ Object.create(null);
        if (r.r(u), Object.defineProperty(u, "default", { enumerable: !0, value: i }), 2 & s && typeof i != "string")
          for (var c in i)
            r.d(u, c, (function(l) {
              return i[l];
            }).bind(null, c));
        return u;
      }, r.n = function(i) {
        var s = i && i.__esModule ? function() {
          return i.default;
        } : function() {
          return i;
        };
        return r.d(s, "a", s), s;
      }, r.o = function(i, s) {
        return Object.prototype.hasOwnProperty.call(i, s);
      }, r.p = "", r(r.s = 7);
    }([function(o, n, r) {
      var i, s = this && this.__extends || (i = function(d, f) {
        return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, p) {
          h.__proto__ = p;
        } || function(h, p) {
          for (var m in p)
            Object.prototype.hasOwnProperty.call(p, m) && (h[m] = p[m]);
        })(d, f);
      }, function(d, f) {
        function h() {
          this.constructor = d;
        }
        i(d, f), d.prototype = f === null ? Object.create(f) : (h.prototype = f.prototype, new h());
      }), u = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.eventEmitter = n.INTERNAL_ERROR_EVENT = n.UNKNOWN_IDX = n.ROOT_IDX = n.getStylesheet = n.getDefaultOptions = n.CAMEL_DATASET_SPLIT_TYPE = n.CAMEL_DATASET_IDENTIFIER_EXTRA = n.CAMEL_DATASET_IDENTIFIER = n.DATASET_SPLIT_TYPE = n.DATASET_IDENTIFIER_EXTRA = n.DATASET_IDENTIFIER = n.STYLESHEET_ID = n.LOCAL_STORE_KEY = n.ID_DIVISION = void 0;
      var c = u(r(10)), l = u(r(2));
      n.ID_DIVISION = ";", n.LOCAL_STORE_KEY = "highlight-mengshou", n.STYLESHEET_ID = "highlight-mengshou-style", n.DATASET_IDENTIFIER = "highlight-id", n.DATASET_IDENTIFIER_EXTRA = "highlight-id-extra", n.DATASET_SPLIT_TYPE = "highlight-split-type", n.CAMEL_DATASET_IDENTIFIER = c.default(n.DATASET_IDENTIFIER), n.CAMEL_DATASET_IDENTIFIER_EXTRA = c.default(n.DATASET_IDENTIFIER_EXTRA), n.CAMEL_DATASET_SPLIT_TYPE = c.default(n.DATASET_SPLIT_TYPE), n.getDefaultOptions = function() {
        return { $root: document || document.documentElement, exceptSelectors: null, wrapTag: "span", verbose: !1, style: { className: "highlight-mengshou-wrap" } };
      }, n.getStylesheet = function() {
        return `
    .` + n.getDefaultOptions().style.className + ` {
        background: #ff9;
        cursor: pointer;
    }
    .` + n.getDefaultOptions().style.className + `.active {
        background: #ffb;
    }
`;
      }, n.ROOT_IDX = -2, n.UNKNOWN_IDX = -1, n.INTERNAL_ERROR_EVENT = "error";
      var a = function(d) {
        function f() {
          return d !== null && d.apply(this, arguments) || this;
        }
        return s(f, d), f;
      }(l.default);
      n.eventEmitter = new a();
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.UserInputEvent = n.SelectedNodeType = n.CreateFrom = n.EventType = n.ERROR = n.SplitType = void 0, function(i) {
        i.none = "none", i.head = "head", i.tail = "tail", i.both = "both";
      }(n.SplitType || (n.SplitType = {})), function(i) {
        i.DOM_TYPE_ERROR = "[DOM] Receive wrong node type.", i.DOM_SELECTION_EMPTY = "[DOM] The selection contains no dom node, may be you except them.", i.RANGE_INVALID = "[RANGE] Got invalid dom range, can't convert to a valid highlight range.", i.RANGE_NODE_INVALID = "[RANGE] Start or end node isn't a text node, it may occur an error.", i.DB_ID_DUPLICATE_ERROR = "[STORE] Unique id conflict.", i.CACHE_SET_ERROR = "[CACHE] Cache.data can't be set manually, please use .save().", i.SOURCE_TYPE_ERROR = "[SOURCE] Object isn't a highlight source instance.", i.HIGHLIGHT_RANGE_FROZEN = "[HIGHLIGHT_RANGE] A highlight range must be frozen before render.", i.HIGHLIGHT_SOURCE_RECREATE = "[HIGHLIGHT_SOURCE] Recreate highlights from sources error.", i.HIGHLIGHT_SOURCE_NONE_RENDER = "[HIGHLIGHT_SOURCE] This highlight source isn't rendered. May be the exception skips it or the dom structure has changed.";
      }(n.ERROR || (n.ERROR = {})), function(i) {
        i.CREATE = "selection:create", i.REMOVE = "selection:remove", i.MODIFY = "selection:modify", i.HOVER = "selection:hover", i.HOVER_OUT = "selection:hover-out", i.CLICK = "selection:click";
      }(n.EventType || (n.EventType = {})), function(i) {
        i.STORE = "from-store", i.INPUT = "from-input";
      }(n.CreateFrom || (n.CreateFrom = {})), function(i) {
        i.text = "text", i.span = "span";
      }(n.SelectedNodeType || (n.SelectedNodeType = {})), function(i) {
        i.touchend = "touchend", i.mouseup = "mouseup", i.touchstart = "touchstart", i.click = "click", i.mouseover = "mouseover";
      }(n.UserInputEvent || (n.UserInputEvent = {}));
    }, function(o, n, r) {
      var i = this && this.__read || function(c, l) {
        var a = typeof Symbol == "function" && c[Symbol.iterator];
        if (!a)
          return c;
        var d, f, h = a.call(c), p = [];
        try {
          for (; (l === void 0 || l-- > 0) && !(d = h.next()).done; )
            p.push(d.value);
        } catch (m) {
          f = { error: m };
        } finally {
          try {
            d && !d.done && (a = h.return) && a.call(h);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return p;
      }, s = this && this.__spread || function() {
        for (var c = [], l = 0; l < arguments.length; l++)
          c = c.concat(i(arguments[l]));
        return c;
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var u = function() {
        function c() {
          this.handlersMap = /* @__PURE__ */ Object.create(null);
        }
        return c.prototype.on = function(l, a) {
          return this.handlersMap[l] || (this.handlersMap[l] = []), this.handlersMap[l].push(a), this;
        }, c.prototype.off = function(l, a) {
          return this.handlersMap[l] && this.handlersMap[l].splice(this.handlersMap[l].indexOf(a) >>> 0, 1), this;
        }, c.prototype.emit = function(l) {
          for (var a = [], d = 1; d < arguments.length; d++)
            a[d - 1] = arguments[d];
          return this.handlersMap[l] && this.handlersMap[l].slice().forEach(function(f) {
            f.apply(void 0, s(a));
          }), this;
        }, c;
      }();
      n.default = u;
    }, function(o, n, r) {
      var i = this && this.__importDefault || function(l) {
        return l && l.__esModule ? l : { default: l };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var s = i(r(5)), u = r(9), c = function() {
        function l(a, d, f, h, p) {
          this.startMeta = a, this.endMeta = d, this.text = f, this.id = h, this.__isHighlightSource = {}, p && (this.extra = p);
        }
        return l.prototype.deSerialize = function(a, d) {
          var f = u.queryElementNode(this, a), h = f.start, p = f.end, m = u.getTextChildByOffset(h, this.startMeta.textOffset), v = u.getTextChildByOffset(p, this.endMeta.textOffset);
          if (!d.Serialize.Restore.isEmpty()) {
            var b = d.Serialize.Restore.call(this, m, v) || [];
            m = b[0] || m, v = b[1] || v;
          }
          return new s.default(m, v, this.text, this.id, !0);
        }, l;
      }();
      n.default = c;
    }, function(o, n, r) {
      var i = this && this.__values || function(a) {
        var d = typeof Symbol == "function" && Symbol.iterator, f = d && a[d], h = 0;
        if (f)
          return f.call(a);
        if (a && typeof a.length == "number")
          return { next: function() {
            return a && h >= a.length && (a = void 0), { value: a && a[h++], done: !a };
          } };
        throw new TypeError(d ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, s = this && this.__read || function(a, d) {
        var f = typeof Symbol == "function" && a[Symbol.iterator];
        if (!f)
          return a;
        var h, p, m = f.call(a), v = [];
        try {
          for (; (d === void 0 || d-- > 0) && !(h = m.next()).done; )
            v.push(h.value);
        } catch (b) {
          p = { error: b };
        } finally {
          try {
            h && !h.done && (f = m.return) && f.call(m);
          } finally {
            if (p)
              throw p.error;
          }
        }
        return v;
      }, u = this && this.__spread || function() {
        for (var a = [], d = 0; d < arguments.length; d++)
          a = a.concat(s(arguments[d]));
        return a;
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.hasClass = n.removeAllClass = n.removeClass = n.addClass = n.addEventListener = n.removeEventListener = n.forEach = n.getHighlightById = n.getHighlightsByRoot = n.getExtraHighlightId = n.getHighlightId = n.isHighlightWrapNode = void 0;
      var c = r(0);
      n.isHighlightWrapNode = function(a) {
        return !!a.dataset && !!a.dataset[c.CAMEL_DATASET_IDENTIFIER];
      };
      var l = function(a, d) {
        for (var f = !1, h = null; a; ) {
          if (n.isHighlightWrapNode(a) && (h = a), a === d) {
            f = !0;
            break;
          }
          a = a.parentNode;
        }
        return f ? h : null;
      };
      n.getHighlightId = function(a, d) {
        return (a = l(a, d)) ? a.dataset[c.CAMEL_DATASET_IDENTIFIER] : "";
      }, n.getExtraHighlightId = function(a, d) {
        return (a = l(a, d)) ? a.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA].split(c.ID_DIVISION).filter(function(f) {
          return f;
        }) : [];
      }, n.getHighlightsByRoot = function(a, d) {
        var f, h;
        Array.isArray(a) || (a = [a]);
        var p = [];
        try {
          for (var m = i(a), v = m.next(); !v.done; v = m.next()) {
            var b = v.value.querySelectorAll(d + "[data-" + c.DATASET_IDENTIFIER + "]");
            p.push.apply(p, b);
          }
        } catch (_) {
          f = { error: _ };
        } finally {
          try {
            v && !v.done && (h = m.return) && h.call(m);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return p;
      }, n.getHighlightById = function(a, d, f) {
        var h, p, m = [], v = new RegExp("(" + d + "\\" + c.ID_DIVISION + "|\\" + c.ID_DIVISION + "?" + d + "$)"), b = a.querySelectorAll(f + "[data-" + c.DATASET_IDENTIFIER + "]");
        try {
          for (var _ = i(b), S = _.next(); !S.done; S = _.next()) {
            var A = S.value;
            if (A.dataset[c.CAMEL_DATASET_IDENTIFIER] !== d) {
              var E = A.dataset[c.CAMEL_DATASET_IDENTIFIER_EXTRA];
              v.test(E) && m.push(A);
            } else
              m.push(A);
          }
        } catch (N) {
          h = { error: N };
        } finally {
          try {
            S && !S.done && (p = _.return) && p.call(_);
          } finally {
            if (h)
              throw h.error;
          }
        }
        return m;
      }, n.forEach = function(a, d) {
        for (var f = 0; f < a.length; f++)
          d(a[f], f, a);
      }, n.removeEventListener = function(a, d, f) {
        a.removeEventListener(d, f);
      }, n.addEventListener = function(a, d, f) {
        return a.addEventListener(d, f), function() {
          n.removeEventListener(a, d, f);
        };
      }, n.addClass = function(a, d) {
        var f;
        Array.isArray(d) || (d = [d]), (f = a.classList).add.apply(f, u(d));
      }, n.removeClass = function(a, d) {
        a.classList.remove(d);
      }, n.removeAllClass = function(a) {
        a.className = "";
      }, n.hasClass = function(a, d) {
        return a.classList.contains(d);
      };
    }, function(o, n, r) {
      var i = this && this.__importDefault || function(h) {
        return h && h.__esModule ? h : { default: h };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var s = i(r(3)), u = r(1), c = r(11), l = i(r(6)), a = r(12), d = r(0), f = function() {
        function h(p, m, v, b, _) {
          _ === void 0 && (_ = !1), p.$node.nodeType === 3 && m.$node.nodeType === 3 || d.eventEmitter.emit(d.INTERNAL_ERROR_EVENT, { type: u.ERROR.RANGE_NODE_INVALID }), this.start = a.formatDomNode(p), this.end = a.formatDomNode(m), this.text = v, this.frozen = _, this.id = b;
        }
        return h.fromSelection = function(p) {
          var m = c.getDomRange();
          if (!m)
            return null;
          var v = { $node: m.startContainer, offset: m.startOffset }, b = { $node: m.endContainer, offset: m.endOffset }, _ = m.toString(), S = p.call(v, b, _);
          return new h(v, b, _, S = S ?? l.default());
        }, h.prototype.serialize = function(p, m) {
          var v, b = a.getDomMeta(this.start.$node, this.start.offset, p), _ = a.getDomMeta(this.end.$node, this.end.offset, p);
          return m.Serialize.RecordInfo.isEmpty() || (v = m.Serialize.RecordInfo.call(this.start, this.end, p)), this.frozen = !0, new s.default(b, _, this.text, this.id, v);
        }, h.removeDomRange = c.removeSelection, h;
      }();
      n.default = f;
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.default = function i(s) {
        return s ? (s ^ 16 * Math.random() >> s / 4).toString(16) : ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, i);
      };
    }, function(o, n, r) {
      o.exports = r(8);
    }, function(o, n, r) {
      var i, s = this && this.__extends || (i = function(E, N) {
        return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(F, y) {
          F.__proto__ = y;
        } || function(F, y) {
          for (var H in y)
            Object.prototype.hasOwnProperty.call(y, H) && (F[H] = y[H]);
        })(E, N);
      }, function(E, N) {
        function F() {
          this.constructor = E;
        }
        i(E, N), E.prototype = N === null ? Object.create(N) : (F.prototype = N.prototype, new F());
      }), u = this && this.__assign || function() {
        return (u = Object.assign || function(E) {
          for (var N, F = 1, y = arguments.length; F < y; F++)
            for (var H in N = arguments[F])
              Object.prototype.hasOwnProperty.call(N, H) && (E[H] = N[H]);
          return E;
        }).apply(this, arguments);
      }, c = this && this.__importDefault || function(E) {
        return E && E.__esModule ? E : { default: E };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var l = c(r(2)), a = c(r(5)), d = c(r(3)), f = c(r(6)), h = c(r(13)), p = c(r(14)), m = c(r(16)), v = c(r(17)), b = r(0), _ = r(1), S = r(4), A = function(E) {
        function N(F) {
          var y = E.call(this) || this;
          y.event = p.default(), y.run = function() {
            return S.addEventListener(y.options.$root, y.event.PointerEnd, y._handleSelection);
          }, y.stop = function() {
            S.removeEventListener(y.options.$root, y.event.PointerEnd, y._handleSelection);
          }, y.addClass = function(O, k) {
            y.getDoms(k).forEach(function(Z) {
              S.addClass(Z, O);
            });
          }, y.removeClass = function(O, k) {
            y.getDoms(k).forEach(function(Z) {
              S.removeClass(Z, O);
            });
          }, y.getIdByDom = function(O) {
            return S.getHighlightId(O, y.options.$root);
          }, y.getExtraIdByDom = function(O) {
            return S.getExtraHighlightId(O, y.options.$root);
          }, y.getDoms = function(O) {
            return O ? S.getHighlightById(y.options.$root, O, y.options.wrapTag) : S.getHighlightsByRoot(y.options.$root, y.options.wrapTag);
          }, y.dispose = function() {
            var O = y.options.$root;
            S.removeEventListener(O, y.event.PointerOver, y._handleHighlightHover), S.removeEventListener(O, y.event.PointerEnd, y._handleSelection), S.removeEventListener(O, y.event.PointerTap, y._handleHighlightClick), y.removeAll();
          }, y.setOption = function(O) {
            y.options = u(u({}, y.options), O), y.painter = new v.default({ $root: y.options.$root, wrapTag: y.options.wrapTag, className: y.options.style.className, exceptSelectors: y.options.exceptSelectors }, y.hooks);
          }, y.fromRange = function(O) {
            var k = { $node: O.startContainer, offset: O.startOffset }, Z = { $node: O.endContainer, offset: O.endOffset }, X = O.toString(), j = y.hooks.Render.UUID.call(k, Z, X);
            j = j ?? f.default();
            var I = new a.default(k, Z, X, j);
            return I ? y._highlightFromHRange(I) : (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: _.ERROR.RANGE_INVALID }), null);
          }, y.fromStore = function(O, k, Z, X, j) {
            var I = new d.default(O, k, Z, X, j);
            try {
              return y._highlightFromHSource(I), I;
            } catch (T) {
              return b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: _.ERROR.HIGHLIGHT_SOURCE_RECREATE, error: T, detail: I }), null;
            }
          }, y._getHooks = function() {
            return { Render: { UUID: new h.default("Render.UUID"), SelectedNodes: new h.default("Render.SelectedNodes"), WrapNode: new h.default("Render.WrapNode") }, Serialize: { Restore: new h.default("Serialize.Restore"), RecordInfo: new h.default("Serialize.RecordInfo") }, Remove: { UpdateNodes: new h.default("Remove.UpdateNodes") } };
          }, y._highlightFromHRange = function(O) {
            var k = O.serialize(y.options.$root, y.hooks);
            return y.painter.highlightRange(O).length === 0 ? (b.eventEmitter.emit(b.INTERNAL_ERROR_EVENT, { type: _.ERROR.DOM_SELECTION_EMPTY }), null) : (y.cache.save(k), y.emit(_.EventType.CREATE, { sources: [k], type: _.CreateFrom.INPUT }, y), k);
          }, y._handleSelection = function() {
            var O = a.default.fromSelection(y.hooks.Render.UUID);
            O && (y._highlightFromHRange(O), a.default.removeDomRange());
          }, y._handleHighlightHover = function(O) {
            var k = O.target;
            if (!S.isHighlightWrapNode(k))
              return y._hoverId && y.emit(_.EventType.HOVER_OUT, { id: y._hoverId }, y, O), void (y._hoverId = null);
            var Z = S.getHighlightId(k, y.options.$root);
            y._hoverId !== Z && (y._hoverId && y.emit(_.EventType.HOVER_OUT, { id: y._hoverId }, y, O), y._hoverId = Z, y.emit(_.EventType.HOVER, { id: y._hoverId }, y, O));
          }, y._handleError = function(O) {
            y.options.verbose && console.warn(O);
          }, y._handleHighlightClick = function(O) {
            var k = O.target;
            if (S.isHighlightWrapNode(k)) {
              var Z = S.getHighlightId(k, y.options.$root);
              y.emit(_.EventType.CLICK, { id: Z }, y, O);
            }
          }, y.options = b.getDefaultOptions(), y.hooks = y._getHooks(), y.setOption(F), y.cache = new m.default();
          var H = y.options.$root;
          return S.addEventListener(H, y.event.PointerOver, y._handleHighlightHover), S.addEventListener(H, y.event.PointerTap, y._handleHighlightClick), b.eventEmitter.on(b.INTERNAL_ERROR_EVENT, y._handleError), y;
        }
        return s(N, E), N.prototype.remove = function(F) {
          if (F) {
            var y = this.painter.removeHighlight(F);
            this.cache.remove(F), y && this.emit(_.EventType.REMOVE, { ids: [F] }, this);
          }
        }, N.prototype.removeAll = function() {
          this.painter.removeAllHighlight();
          var F = this.cache.removeAll();
          this.emit(_.EventType.REMOVE, { ids: F }, this);
        }, N.prototype._highlightFromHSource = function(F) {
          F === void 0 && (F = []);
          var y = this.painter.highlightSource(F);
          this.emit(_.EventType.CREATE, { sources: y, type: _.CreateFrom.STORE }, this), this.cache.save(F);
        }, N.event = _.EventType, N.isHighlightWrapNode = S.isHighlightWrapNode, N.isHighlightSource = function(F) {
          return !!F.__isHighlightSource;
        }, N;
      }(l.default);
      n.default = A;
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.queryElementNode = n.getTextChildByOffset = void 0;
      var i = r(0);
      n.getTextChildByOffset = function(s, u) {
        for (var c = [s], l = null, a = 0, d = 0; l = c.pop(); ) {
          for (var f = l.childNodes, h = f.length - 1; h >= 0; h--)
            c.push(f[h]);
          if (l.nodeType === 3 && (d = u - a, (a += l.textContent.length) >= u))
            break;
        }
        return l || (l = s), { $node: l, offset: d };
      }, n.queryElementNode = function(s, u) {
        return { start: s.startMeta.parentIndex === i.ROOT_IDX ? u : u.getElementsByTagName(s.startMeta.parentTagName)[s.startMeta.parentIndex], end: s.endMeta.parentIndex === i.ROOT_IDX ? u : u.getElementsByTagName(s.endMeta.parentTagName)[s.endMeta.parentIndex] };
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.default = function(i) {
        return i.split("-").reduce(function(s, u, c) {
          return s + (c === 0 ? u : u[0].toUpperCase() + u.slice(1));
        }, "");
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.removeSelection = n.getDomRange = void 0, n.getDomRange = function() {
        var i = window.getSelection();
        return i.isCollapsed ? (console.debug("no text selected"), null) : i.getRangeAt(0);
      }, n.removeSelection = function() {
        window.getSelection().removeAllRanges();
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.formatDomNode = n.getDomMeta = void 0;
      var i = r(0);
      n.getDomMeta = function(s, u, c) {
        var l = function(f) {
          if (f instanceof HTMLElement && (!f.dataset || !f.dataset[i.CAMEL_DATASET_IDENTIFIER]))
            return f;
          for (var h = f.parentNode; h != null && h.dataset[i.CAMEL_DATASET_IDENTIFIER]; )
            h = h.parentNode;
          return h;
        }(s), a = l === c ? i.ROOT_IDX : function(f, h) {
          for (var p = f.tagName, m = h.getElementsByTagName(p), v = 0; v < m.length; v++)
            if (f === m[v])
              return v;
          return i.UNKNOWN_IDX;
        }(l, c), d = function(f, h) {
          for (var p = [f], m = null, v = 0; m = p.pop(); ) {
            for (var b = m.childNodes, _ = b.length - 1; _ >= 0; _--)
              p.push(b[_]);
            if (m.nodeType === 3 && m !== h)
              v += m.textContent.length;
            else if (m.nodeType === 3)
              break;
          }
          return v;
        }(l, s);
        return { parentTagName: l.tagName, parentIndex: a, textOffset: d + u };
      }, n.formatDomNode = function(s) {
        return s.$node.nodeType === 3 || s.$node.nodeType === 4 || s.$node.nodeType === 8 ? s : { $node: s.$node.childNodes[s.offset], offset: 0 };
      };
    }, function(o, n, r) {
      var i = this && this.__read || function(c, l) {
        var a = typeof Symbol == "function" && c[Symbol.iterator];
        if (!a)
          return c;
        var d, f, h = a.call(c), p = [];
        try {
          for (; (l === void 0 || l-- > 0) && !(d = h.next()).done; )
            p.push(d.value);
        } catch (m) {
          f = { error: m };
        } finally {
          try {
            d && !d.done && (a = h.return) && a.call(h);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return p;
      }, s = this && this.__spread || function() {
        for (var c = [], l = 0; l < arguments.length; l++)
          c = c.concat(i(arguments[l]));
        return c;
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var u = function() {
        function c(l) {
          this.name = "", this.ops = [], this.name = l;
        }
        return c.prototype.tap = function(l) {
          var a = this;
          return this.ops.indexOf(l) === -1 && this.ops.push(l), function() {
            a.remove(l);
          };
        }, c.prototype.remove = function(l) {
          var a = this.ops.indexOf(l);
          a < 0 || this.ops.splice(a, 1);
        }, c.prototype.isEmpty = function() {
          return this.ops.length === 0;
        }, c.prototype.call = function() {
          for (var l, a = [], d = 0; d < arguments.length; d++)
            a[d] = arguments[d];
          return this.ops.forEach(function(f) {
            l = f.apply(void 0, s(a));
          }), l;
        }, c;
      }();
      n.default = u;
    }, function(o, n, r) {
      var i = this && this.__importDefault || function(c) {
        return c && c.__esModule ? c : { default: c };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var s = r(1), u = i(r(15));
      n.default = function() {
        var c = u.default(window.navigator.userAgent);
        return { PointerEnd: c ? s.UserInputEvent.touchend : s.UserInputEvent.mouseup, PointerTap: c ? s.UserInputEvent.touchstart : s.UserInputEvent.click, PointerOver: c ? s.UserInputEvent.touchstart : s.UserInputEvent.mouseover };
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 });
      var i = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
      n.default = function(s) {
        return i.test(s);
      };
    }, function(o, n, r) {
      var i, s = this && this.__extends || (i = function(f, h) {
        return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, m) {
          p.__proto__ = m;
        } || function(p, m) {
          for (var v in m)
            Object.prototype.hasOwnProperty.call(m, v) && (p[v] = m[v]);
        })(f, h);
      }, function(f, h) {
        function p() {
          this.constructor = f;
        }
        i(f, h), f.prototype = h === null ? Object.create(h) : (p.prototype = h.prototype, new p());
      }), u = this && this.__values || function(f) {
        var h = typeof Symbol == "function" && Symbol.iterator, p = h && f[h], m = 0;
        if (p)
          return p.call(f);
        if (f && typeof f.length == "number")
          return { next: function() {
            return f && m >= f.length && (f = void 0), { value: f && f[m++], done: !f };
          } };
        throw new TypeError(h ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, c = this && this.__importDefault || function(f) {
        return f && f.__esModule ? f : { default: f };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var l = c(r(2)), a = r(1), d = function(f) {
        function h() {
          var p = f !== null && f.apply(this, arguments) || this;
          return p._data = /* @__PURE__ */ new Map(), p;
        }
        return s(h, f), Object.defineProperty(h.prototype, "data", { get: function() {
          return this.getAll();
        }, set: function(p) {
          throw a.ERROR.CACHE_SET_ERROR;
        }, enumerable: !1, configurable: !0 }), h.prototype.save = function(p) {
          var m = this;
          Array.isArray(p) ? p.forEach(function(v) {
            return m._data.set(v.id, v);
          }) : this._data.set(p.id, p);
        }, h.prototype.get = function(p) {
          return this._data.get(p);
        }, h.prototype.remove = function(p) {
          this._data.delete(p);
        }, h.prototype.getAll = function() {
          var p, m, v = [];
          try {
            for (var b = u(this._data), _ = b.next(); !_.done; _ = b.next()) {
              var S = _.value;
              v.push(S[1]);
            }
          } catch (A) {
            p = { error: A };
          } finally {
            try {
              _ && !_.done && (m = b.return) && m.call(b);
            } finally {
              if (p)
                throw p.error;
            }
          }
          return v;
        }, h.prototype.removeAll = function() {
          var p, m, v = [];
          try {
            for (var b = u(this._data), _ = b.next(); !_.done; _ = b.next()) {
              var S = _.value;
              v.push(S[0]);
            }
          } catch (A) {
            p = { error: A };
          } finally {
            try {
              _ && !_.done && (m = b.return) && m.call(b);
            } finally {
              if (p)
                throw p.error;
            }
          }
          return this._data = /* @__PURE__ */ new Map(), v;
        }, h;
      }(l.default);
      n.default = d;
    }, function(o, n, r) {
      var i = this && this.__values || function(v) {
        var b = typeof Symbol == "function" && Symbol.iterator, _ = b && v[b], S = 0;
        if (_)
          return _.call(v);
        if (v && typeof v.length == "number")
          return { next: function() {
            return v && S >= v.length && (v = void 0), { value: v && v[S++], done: !v };
          } };
        throw new TypeError(b ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, s = this && this.__read || function(v, b) {
        var _ = typeof Symbol == "function" && v[Symbol.iterator];
        if (!_)
          return v;
        var S, A, E = _.call(v), N = [];
        try {
          for (; (b === void 0 || b-- > 0) && !(S = E.next()).done; )
            N.push(S.value);
        } catch (F) {
          A = { error: F };
        } finally {
          try {
            S && !S.done && (_ = E.return) && _.call(E);
          } finally {
            if (A)
              throw A.error;
          }
        }
        return N;
      }, u = this && this.__spread || function() {
        for (var v = [], b = 0; b < arguments.length; b++)
          v = v.concat(s(arguments[b]));
        return v;
      }, c = this && this.__importDefault || function(v) {
        return v && v.__esModule ? v : { default: v };
      };
      Object.defineProperty(n, "__esModule", { value: !0 });
      var l = c(r(3)), a = r(18), d = r(4), f = r(1), h = r(20), p = r(0), m = function() {
        function v(b, _) {
          this.options = { $root: b.$root, wrapTag: b.wrapTag, exceptSelectors: b.exceptSelectors, className: b.className }, this.hooks = _, h.initDefaultStylesheet();
        }
        return v.prototype.highlightRange = function(b) {
          var _ = this;
          if (!b.frozen)
            throw f.ERROR.HIGHLIGHT_RANGE_FROZEN;
          var S = this.options, A = S.$root, E = S.className, N = S.exceptSelectors, F = this.hooks, y = a.getSelectedNodes(A, b.start, b.end, N);
          return F.Render.SelectedNodes.isEmpty() || (y = F.Render.SelectedNodes.call(b.id, y) || []), y.map(function(H) {
            var O = a.wrapHighlight(H, b, E, _.options.wrapTag);
            return F.Render.WrapNode.isEmpty() || (O = F.Render.WrapNode.call(b.id, O)), O;
          });
        }, v.prototype.highlightSource = function(b) {
          var _ = this, S = Array.isArray(b) ? b : [b], A = [];
          return S.forEach(function(E) {
            if (E instanceof l.default) {
              var N = E.deSerialize(_.options.$root, _.hooks);
              _.highlightRange(N).length > 0 ? A.push(E) : p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, { type: f.ERROR.HIGHLIGHT_SOURCE_NONE_RENDER, detail: E });
            } else
              p.eventEmitter.emit(p.INTERNAL_ERROR_EVENT, { type: f.ERROR.SOURCE_TYPE_ERROR });
          }), A;
        }, v.prototype.removeHighlight = function(b) {
          var _, S, A = new RegExp("(" + b + "\\" + p.ID_DIVISION + "|\\" + p.ID_DIVISION + "?" + b + "$)"), E = this.hooks, N = this.options.wrapTag, F = document.querySelectorAll(N + "[data-" + p.DATASET_IDENTIFIER + "]"), y = [], H = [], O = [];
          try {
            for (var k = i(F), Z = k.next(); !Z.done; Z = k.next()) {
              var X = Z.value, j = X.dataset[p.CAMEL_DATASET_IDENTIFIER], I = X.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
              j !== b || I ? j === b ? H.push(X) : j !== b && A.test(I) && O.push(X) : y.push(X);
            }
          } catch (T) {
            _ = { error: T };
          } finally {
            try {
              Z && !Z.done && (S = k.return) && S.call(k);
            } finally {
              if (_)
                throw _.error;
            }
          }
          return y.forEach(function(T) {
            var x = T.parentNode, D = document.createDocumentFragment();
            d.forEach(T.childNodes, function(R) {
              return D.appendChild(R.cloneNode(!1));
            });
            var L = T.previousSibling, C = T.nextSibling;
            x.replaceChild(D, T), a.normalizeSiblingText(L, !0), a.normalizeSiblingText(C, !1), E.Remove.UpdateNodes.call(b, T, "remove");
          }), H.forEach(function(T) {
            var x = T.dataset, D = x[p.CAMEL_DATASET_IDENTIFIER_EXTRA].split(p.ID_DIVISION), L = D.shift(), C = document.querySelector(N + "[data-" + p.DATASET_IDENTIFIER + '="' + L + '"]');
            C && (d.removeAllClass(T), d.addClass(T, u(C.classList))), x[p.CAMEL_DATASET_IDENTIFIER] = L, x[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = D.join(p.ID_DIVISION), E.Remove.UpdateNodes.call(b, T, "id-update");
          }), O.forEach(function(T) {
            var x = T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA];
            T.dataset[p.CAMEL_DATASET_IDENTIFIER_EXTRA] = x.replace(A, ""), E.Remove.UpdateNodes.call(b, T, "extra-update");
          }), y.length + H.length + O.length !== 0;
        }, v.prototype.removeAllHighlight = function() {
          var b = this.options, _ = b.wrapTag, S = b.$root;
          d.getHighlightsByRoot(S, _).forEach(function(A) {
            var E = A.parentNode, N = document.createDocumentFragment();
            d.forEach(A.childNodes, function(F) {
              return N.appendChild(F.cloneNode(!1));
            }), E.replaceChild(N, A);
          });
        }, v;
      }();
      n.default = m;
    }, function(o, n, r) {
      var i = this && this.__read || function(p, m) {
        var v = typeof Symbol == "function" && p[Symbol.iterator];
        if (!v)
          return p;
        var b, _, S = v.call(p), A = [];
        try {
          for (; (m === void 0 || m-- > 0) && !(b = S.next()).done; )
            A.push(b.value);
        } catch (E) {
          _ = { error: E };
        } finally {
          try {
            b && !b.done && (v = S.return) && v.call(S);
          } finally {
            if (_)
              throw _.error;
          }
        }
        return A;
      }, s = this && this.__spread || function() {
        for (var p = [], m = 0; m < arguments.length; m++)
          p = p.concat(i(arguments[m]));
        return p;
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.normalizeSiblingText = n.wrapHighlight = n.getSelectedNodes = void 0;
      var u = r(1), c = r(4), l = r(0), a = r(19), d = function(p, m) {
        if (!p)
          return !1;
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
      n.getSelectedNodes = function(p, m, v, b) {
        var _ = m.$node, S = v.$node, A = m.offset, E = v.offset;
        if (_ === S && _ instanceof Text)
          return function(j, I, T, x) {
            for (var D = j, L = function(R) {
              return x == null ? void 0 : x.some(function(U) {
                return d(R, U);
              });
            }; D; ) {
              if (D.nodeType === 1 && L(D))
                return [];
              D = D.parentNode;
            }
            j.splitText(I);
            var C = j.nextSibling;
            return C.splitText(T - I), [{ $node: C, type: u.SelectedNodeType.text, splitType: u.SplitType.both }];
          }(_, A, E, b);
        for (var N = [p], F = [], y = function(j) {
          return b == null ? void 0 : b.some(function(I) {
            return d(j, I);
          });
        }, H = !1, O = null; O = N.pop(); )
          if (O.nodeType !== 1 || !y(O)) {
            for (var k = O.childNodes, Z = k.length - 1; Z >= 0; Z--)
              N.push(k[Z]);
            if (O === _) {
              if (O.nodeType === 3) {
                O.splitText(A);
                var X = O.nextSibling;
                F.push({ $node: X, type: u.SelectedNodeType.text, splitType: u.SplitType.head });
              }
              H = !0;
            } else {
              if (O === S) {
                O.nodeType === 3 && ((X = O).splitText(E), F.push({ $node: X, type: u.SelectedNodeType.text, splitType: u.SplitType.tail }));
                break;
              }
              H && O.nodeType === 3 && F.push({ $node: O, type: u.SelectedNodeType.text, splitType: u.SplitType.none });
            }
          }
        return F;
      };
      var f = function(p, m) {
        var v = Array.isArray(m) ? m : [m];
        return (v = v.length === 0 ? [l.getDefaultOptions().style.className] : v).forEach(function(b) {
          c.addClass(p, b);
        }), p;
      }, h = function(p) {
        return !p || !p.textContent;
      };
      n.wrapHighlight = function(p, m, v, b) {
        var _ = p.$node.parentNode, S = p.$node.previousSibling, A = p.$node.nextSibling;
        return c.isHighlightWrapNode(_) ? !c.isHighlightWrapNode(_) || h(S) && h(A) ? function(E, N, F) {
          var y = E.$node.parentNode, H = y;
          c.removeAllClass(H), f(H, F);
          var O = y.dataset, k = O[l.CAMEL_DATASET_IDENTIFIER];
          return O[l.CAMEL_DATASET_IDENTIFIER] = N.id, O[l.CAMEL_DATASET_IDENTIFIER_EXTRA] = O[l.CAMEL_DATASET_IDENTIFIER_EXTRA] ? k + l.ID_DIVISION + O[l.CAMEL_DATASET_IDENTIFIER_EXTRA] : k, H;
        }(p, m, v) : function(E, N, F, y) {
          var H = document.createElement(y), O = E.$node.parentNode, k = E.$node.previousSibling, Z = E.$node.nextSibling, X = document.createDocumentFragment(), j = O.dataset[l.CAMEL_DATASET_IDENTIFIER], I = O.dataset[l.CAMEL_DATASET_IDENTIFIER_EXTRA], T = I ? j + l.ID_DIVISION + I : j;
          H.setAttribute("data-" + l.DATASET_IDENTIFIER, N.id), H.setAttribute("data-" + l.DATASET_IDENTIFIER_EXTRA, T), H.appendChild(E.$node.cloneNode(!1));
          var x, D = !1, L = !1;
          k && ((C = O.cloneNode(!1)).textContent = k.textContent, X.appendChild(C), D = !0);
          var C, R = [];
          return Array.isArray(F) ? R.push.apply(R, s(F)) : R.push(F), f(H, a.unique(R)), X.appendChild(H), Z && ((C = O.cloneNode(!1)).textContent = Z.textContent, X.appendChild(C), L = !0), x = D && L ? u.SplitType.both : D ? u.SplitType.head : L ? u.SplitType.tail : u.SplitType.none, H.setAttribute("data-" + l.DATASET_SPLIT_TYPE, x), O.parentNode.replaceChild(X, O), H;
        }(p, m, v, b) : function(E, N, F, y) {
          var H = document.createElement(y);
          return f(H, F), H.appendChild(E.$node.cloneNode(!1)), E.$node.parentNode.replaceChild(H, E.$node), H.setAttribute("data-" + l.DATASET_IDENTIFIER, N.id), H.setAttribute("data-" + l.DATASET_SPLIT_TYPE, E.splitType), H.setAttribute("data-" + l.DATASET_IDENTIFIER_EXTRA, ""), H;
        }(p, m, v, b);
      }, n.normalizeSiblingText = function(p, m) {
        if (m === void 0 && (m = !0), p && p.nodeType === 3) {
          var v = m ? p.nextSibling : p.previousSibling;
          if (v.nodeType === 3) {
            var b = v.nodeValue;
            p.nodeValue = m ? p.nodeValue + b : b + p.nodeValue, v.parentNode.removeChild(v);
          }
        }
      };
    }, function(o, n, r) {
      var i = this && this.__values || function(s) {
        var u = typeof Symbol == "function" && Symbol.iterator, c = u && s[u], l = 0;
        if (c)
          return c.call(s);
        if (s && typeof s.length == "number")
          return { next: function() {
            return s && l >= s.length && (s = void 0), { value: s && s[l++], done: !s };
          } };
        throw new TypeError(u ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(n, "__esModule", { value: !0 }), n.unique = void 0, n.unique = function(s) {
        var u, c, l = [];
        try {
          for (var a = i(s), d = a.next(); !d.done; d = a.next()) {
            var f = d.value;
            l.indexOf(f) === -1 && l.push(f);
          }
        } catch (h) {
          u = { error: h };
        } finally {
          try {
            d && !d.done && (c = a.return) && c.call(a);
          } finally {
            if (u)
              throw u.error;
          }
        }
        return l;
      };
    }, function(o, n, r) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.initDefaultStylesheet = void 0;
      var i = r(0);
      n.initDefaultStylesheet = function() {
        var s = i.STYLESHEET_ID, u = document.getElementById(s);
        if (!u) {
          var c = document.createTextNode(i.getStylesheet());
          (u = document.createElement("style")).id = s, u.appendChild(c), document.head.appendChild(u);
        }
        return u;
      };
    }]).default;
  });
})(to);
var ba = to.exports;
const no = /* @__PURE__ */ Ue(ba), Ke = new no({
  style: {
    className: Os
  }
  // wrapTag: HIGHLIGHT_WRAPPER_TAGNAME,
}), Nn = new no({
  style: {
    className: As
  }
  // wrapTag: ACTIVE_HIGHLIGHT_WRAPPER_TAGNAME,
}), ro = (e, t) => t.filter(
  (o) => {
    var n;
    return ((n = o.$node.nodeValue) == null ? void 0 : n.trim()) !== "";
  }
), oo = (e, t, o) => {
  const n = t, r = o, i = ["BR", "HR"];
  return i.includes(n.$node.nodeName) && n.$node.parentNode && (n.$node = n.$node.parentNode), i.includes(r.$node.nodeName) && r.$node.parentNode && (r.$node = r.$node.parentNode), [n, r];
};
Ke.hooks.Render.SelectedNodes.tap(ro);
Ke.hooks.Serialize.Restore.tap(oo);
Nn.hooks.Render.SelectedNodes.tap(ro);
Nn.hooks.Serialize.Restore.tap(oo);
Ke.on("selection:hover", ({ id: e }) => {
  Ke.addClass(hr, e);
}).on("selection:hover-out", ({ id: e }) => {
  Ke.removeClass(hr, e);
});
const _a = (e) => {
  var t, o;
  return (t = e.meta) != null && t.highlight ? JSON.parse((o = e.meta) == null ? void 0 : o.highlight) : null;
}, Sa = (e) => {
  const t = _a(e);
  t && (Ke.remove(t.id), Nn.remove(t.id));
}, jn = () => {
  var o, n;
  const e = Vt(), t = (e == null ? void 0 : e[1]) === "analysis" ? document.getElementById("sql") : document.getElementById("code");
  return (n = (o = t == null ? void 0 : t.parentElement) == null ? void 0 : o.querySelector("code-block")) == null ? void 0 : n.querySelector("code.ng-binding.highlight");
}, Vt = () => {
  var t;
  return (t = window.location.hash.split("#").find((o) => o.startsWith("!"))) == null ? void 0 : t.split("/");
}, Pn = () => document.querySelector(
  '[marked="model.description"]'
), Ca = (e) => {
  var t, o, n;
  return e.field ? e.column ? (o = (t = Array.from(
    document.querySelectorAll(
      "column-details tr:not(.ng-hide) td:first-child"
    )
  ).find((i) => i.innerText === e.column)) == null ? void 0 : t.parentElement) == null ? void 0 : o.querySelector("td:nth-child(3)") : (n = Pn()) == null ? void 0 : n.firstChild : jn();
}, Ta = (e) => {
  if (e.getAttribute("marked") === "model.description")
    return "description";
}, Oa = (e, t, o, n, r) => {
  if (e === "description")
    return {
      start: 0,
      end: 0,
      x: 0,
      y: 0
    };
  const i = t.querySelectorAll(".line-numbers-rows > span"), s = o.split(`
`), u = Math.max(r.y, n.y), c = Array.from(i).findIndex((d) => {
    const { height: f, y: h } = d.getBoundingClientRect();
    return u >= h && u <= h + f;
  }), l = i[c], a = c - s.length + 1;
  return console.log("start and end lines found", a, c), {
    x: l.offsetLeft,
    y: l.offsetTop + l.offsetHeight / 2,
    start: a,
    end: c
  };
}, sl = () => {
  var e;
  return [
    (e = jn()) == null ? void 0 : e.parentElement,
    Pn()
  ];
}, Aa = () => {
  const e = se(
    (a) => a.selectedConversationId ? a.conversations[a.selectedConversationId] : null
  ), t = se(
    (a) => a.docsAppRendered
  ), o = se(
    (a) => a.newConversation
  ), n = Ee(), [r, i] = ge(null), [s, u] = ge(null);
  Ae(() => {
    o && (i(null), u(null));
  }, [o]);
  const c = Fe(() => {
    console.log("resetHighlights"), r && Sa(r), u(null), i(null);
  }, [r]);
  return Ae(() => {
    !e || !t || e.meta.resource_type && e.meta.uniqueId && (window.location.hash = `#!/${e.meta.resource_type}/${e.meta.uniqueId}`);
  }, [e, t, n]), {
    getHighlightedSelectionData: () => r,
    pos: s,
    onSelectionEnd: (a) => {
      const d = a.target, f = Ta(d), { end: h, start: p } = a.detail.selectionRange, m = document.getSelection();
      if (!m || !m.rangeCount)
        return c(), null;
      const b = m.getRangeAt(0).toString(), _ = d == null ? void 0 : d.innerText;
      if (!b || !_)
        return;
      const { end: S, start: A, x: E, y: N } = Oa(
        f,
        d,
        b,
        h,
        p
      );
      console.log("selection range", S, A, E, N);
      const F = Vt();
      if (!F || F.length < 3) {
        console.error("Unable to find model parts", F);
        return;
      }
      console.log("model parts found", F);
      const y = {
        meta: {
          field: f,
          filePath: "",
          // setting to empty string here and will be updated in conversationReducer when newConversation is set
          highlight: b,
          uniqueId: F[2],
          resource_type: F[1],
          range: {
            end: { line: S, character: 0 },
            start: { line: A, character: 0 }
          }
        }
      };
      n(wn()), u({
        x: E,
        y: N,
        element: d
      }), document.body.addEventListener("click", c, { once: !0 }), i(y);
    }
  };
}, Ra = ({
  conversationGroup: e
}) => {
  const t = se(
    (u) => u.selectedConversationId
  ), o = Ee(), n = De(null), r = Ge(() => Ca(e.meta), [e.meta]), i = () => {
    o(
      Dn(e.conversation_group_id)
    );
  }, s = Ge(() => {
    if (!r)
      return;
    if (e.meta.field === "description")
      return { top: 0, bottom: r.offsetHeight };
    let u = 0, c = 0;
    for (let l = e.meta.range.start.line; l <= e.meta.range.end.line; l++) {
      const a = r.querySelector(
        `.line-numbers-rows > span:nth-child(${l + 1})`
      );
      a && (l === e.meta.range.start.line && (u = a.offsetTop + 15), l === e.meta.range.end.line && (c = a.offsetTop + a.offsetHeight));
    }
    return { top: u, bottom: c };
  }, [
    r,
    e.meta.field,
    e.meta.range.start.line,
    e.meta.range.end.line
  ]);
  return Ae(() => {
    var u;
    t && ((u = n.current) == null || u.scrollIntoView({
      behavior: "smooth",
      block: "center"
    }));
  }, [t]), !s || !(r != null && r.parentElement) ? null : Cn(
    /* @__PURE__ */ w.jsx(
      "div",
      {
        ref: n,
        className: `altimate-highlighter ${t === e.conversation_group_id ? "active" : ""}`,
        style: { top: s.top, height: s.bottom - s.top },
        onClick: i,
        children: /* @__PURE__ */ w.jsx(Ds, {})
      }
    ),
    r.parentElement
  );
}, Da = Ra, Ia = () => {
  const e = se(
    (r) => Object.values(r.conversations || {})
  ), t = se(
    (r) => r.codeblockLoaded
  ), o = se(
    (r) => r.currentPage
  ), n = e == null ? void 0 : e.filter(
    (r) => r.meta.resource_type === o.resourceType && r.meta.uniqueId === o.name
  );
  return !(n != null && n.length) || !t ? null : /* @__PURE__ */ w.jsx(w.Fragment, { children: n.map((r) => /* @__PURE__ */ w.jsx(
    Da,
    {
      conversationGroup: r
    },
    r.conversation_group_id
  )) });
}, wa = Ia, xa = "_dbtDocs_194u2_9", Na = "_hotspotButton_194u2_41", ja = "_pulse_194u2_1", Pa = "_conversationRightPanelCloseButton_194u2_57", Fa = "_conversationRightPanel_194u2_57", Ma = "_newConversationForm_194u2_89", $a = "_highlightText_194u2_103", ka = "_conversationInputForm_194u2_124", La = "_conversationGroup_194u2_150", Ba = "_replyForm_194u2_182", Ha = "_resolveButton_194u2_227", je = {
  dbtDocs: xa,
  hotspotButton: Na,
  pulse: ja,
  conversationRightPanelCloseButton: Pa,
  conversationRightPanel: Fa,
  newConversationForm: Ma,
  highlightText: $a,
  conversationInputForm: ka,
  conversationGroup: La,
  replyForm: Ba,
  resolveButton: Ha
}, Ua = "_profileImage_11vaf_1", za = {
  profileImage: Ua
}, qa = ({ user: e }) => {
  var t;
  return /* @__PURE__ */ w.jsx("div", { className: za.profileImage, children: ((t = e == null ? void 0 : e.first_name) == null ? void 0 : t[0]) || "" });
}, io = qa;
function Va(e) {
  if (Array.isArray(e)) {
    for (var t = 0, o = new Array(e.length); t < e.length; t++)
      o[t] = e[t];
    return o;
  }
}
function Wa(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]")
    return Array.from(e);
}
function Ya() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function xt(e) {
  return Va(e) || Wa(e) || Ya();
}
function Oe() {
  return Oe = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, Oe.apply(this, arguments);
}
function Ka(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function gr(e, t) {
  for (var o = 0; o < t.length; o++) {
    var n = t[o];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Xa(e, t, o) {
  return t && gr(e.prototype, t), o && gr(e, o), e;
}
function te(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function yn(e, t) {
  return yn = Object.setPrototypeOf || function(n, r) {
    return n.__proto__ = r, n;
  }, yn(e, t);
}
function Ga(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && yn(e, t);
}
function Xe(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Xe = function(o) {
    return typeof o;
  } : Xe = function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, Xe(e);
}
function Tt(e) {
  return typeof Symbol == "function" && Xe(Symbol.iterator) === "symbol" ? Tt = function(o) {
    return Xe(o);
  } : Tt = function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : Xe(o);
  }, Tt(e);
}
function Za(e, t) {
  return t && (Tt(t) === "object" || typeof t == "function") ? t : te(e);
}
function Nt(e) {
  return Nt = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, Nt(e);
}
function ee(e, t, o) {
  return t in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}
var Ja = function(e, t, o, n, r, i, s, u) {
  if (process.env.NODE_ENV !== "production" && t === void 0)
    throw new Error("invariant requires an error message argument");
  if (!e) {
    var c;
    if (t === void 0)
      c = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    else {
      var l = [o, n, r, i, s, u], a = 0;
      c = new Error(
        t.replace(/%s/g, function() {
          return l[a++];
        })
      ), c.name = "Invariant Violation";
    }
    throw c.framesToPop = 1, c;
  }
}, Qa = Ja;
const et = /* @__PURE__ */ Ue(Qa);
function eu(e) {
  if (Array.isArray(e))
    return e;
}
function tu(e, t) {
  var o = [], n = !0, r = !1, i = void 0;
  try {
    for (var s = e[Symbol.iterator](), u; !(n = (u = s.next()).done) && (o.push(u.value), !(t && o.length === t)); n = !0)
      ;
  } catch (c) {
    r = !0, i = c;
  } finally {
    try {
      !n && s.return != null && s.return();
    } finally {
      if (r)
        throw i;
    }
  }
  return o;
}
function nu() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function jt(e, t) {
  return eu(e) || tu(e, t) || nu();
}
function ru(e, t) {
  if (e == null)
    return {};
  var o = {}, n = Object.keys(e), r, i;
  for (i = 0; i < n.length; i++)
    r = n[i], !(t.indexOf(r) >= 0) && (o[r] = e[r]);
  return o;
}
function ou(e, t) {
  if (e == null)
    return {};
  var o = ru(e, t), n, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++)
      n = i[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function pt(e) {
  "@babel/helpers - typeof";
  return pt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pt(e);
}
function iu(e, t) {
  if (pt(e) != "object" || !e)
    return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var n = o.call(e, t || "default");
    if (pt(n) != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function su(e) {
  var t = iu(e, "string");
  return pt(t) == "symbol" ? t : t + "";
}
function ht(e, t, o) {
  return t = su(t), t in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}
function En(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, n = new Array(t); o < t; o++)
    n[o] = e[o];
  return n;
}
function au(e) {
  if (Array.isArray(e))
    return En(e);
}
function uu(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function cu(e, t) {
  if (e) {
    if (typeof e == "string")
      return En(e, t);
    var o = Object.prototype.toString.call(e).slice(8, -1);
    if (o === "Object" && e.constructor && (o = e.constructor.name), o === "Map" || o === "Set")
      return Array.from(e);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return En(e, t);
  }
}
function lu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xe(e) {
  return au(e) || uu(e) || cu(e) || lu();
}
var ot = function(t) {
  return t === Object(t) ? Object.keys(t) : [];
}, so = function(t) {
  return t === Object(t) ? Object.values(t) : [];
};
function ao(e, t) {
  var o = Object.assign({}, e);
  return Ot(e) && Ot(t) && ot(t).forEach(function(n) {
    Ot(t[n]) ? n in e ? o[n] = ao(e[n], t[n]) : Object.assign(o, ht({}, n, t[n])) : Object.assign(o, ht({}, n, t[n]));
  }), o;
}
var bn = function(t) {
  for (var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, s) {
    return ao(i, s);
  }, t);
}, du = function(t, o) {
  var n = Object.assign({}, t);
  if (o)
    for (var r = 0; r < o.length; r++)
      delete n[o[r]];
  return n;
}, Ot = function(t) {
  return t === Object(t) && !(t instanceof Date) && !Array.isArray(t);
}, fu = function(t) {
  return (t || []).filter(Boolean);
}, Fn = function(t) {
  return t[0] === "&";
}, pu = function(t) {
  return !Fn(t);
}, vr = function(t) {
  return t.replace(/-(\w)/g, function(o, n) {
    return n.toUpperCase();
  });
}, hu = function(t) {
  for (var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = ot(t), r = {}, i = 0, s = n.length; i < s; i += 1) {
    var u = n[i], c = Object.prototype.toString.call(t[u]) !== "[object Object]" || // style defs
    u[0] === ":" || // pseudo selectors
    u[0] === "@" || // @media / @keyframes / @supports / @font-face
    o.indexOf(u) >= 0;
    c && (r[u] = t[u]);
  }
  return r;
}, uo = function(t, o) {
  for (var n = o.map(vr), r = ot(t), i = {}, s = 0, u = r.length; s < u; s += 1) {
    var c = r[s];
    (o.indexOf(c) >= 0 || n.indexOf(vr(c)) >= 0) && (i[c] = t[c]);
  }
  return i;
}, gu = function e(t, o) {
  for (var n = bn.apply(void 0, [{}, du(t, o)].concat(xe(so(uo(t, o))))), r = ot(n).filter(Fn), i = 0, s = r.length; i < s; i += 1) {
    var u = r[i], c = e(n[u], o);
    o.indexOf(u) >= 0 ? (delete n[u], n = bn({}, n, c)) : n[u] = c;
  }
  return n;
};
function mr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function yr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mr(Object(o), !0).forEach(function(n) {
      ht(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : mr(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
var vu = ["animationName"], mu = function(t) {
  var o = t.style, n = t.className;
  return yr(yr({}, o ? {
    style: hu(o, vu)
  } : {}), n ? {
    className: n
  } : {});
};
const co = mu;
var lo = /* @__PURE__ */ tt(co);
lo.Provider;
var fo = function(t) {
  if (t) {
    if (typeof t == "string")
      return [t];
    if (!Array.isArray(t)) {
      var o = t;
      return ot(t).reduce(function(n, r) {
        return n.concat(o[r] ? [r] : []);
      }, []);
    }
  } else
    return [];
  return t;
}, yu = {}, Eu = function(t) {
  return function(o, n) {
    var r = n || yu;
    t.memoize = t.memoize || /* @__PURE__ */ new WeakMap();
    var i;
    t.memoize.has(r) ? i = t.memoize.get(r) : (i = {}, t.memoize.set(r, i));
    var s = fo(o).join(" ");
    return s in i ? i[s] : i[s] = t(o || [], n);
  };
};
function Er(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function We(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Er(Object(o), !0).forEach(function(n) {
      ht(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : Er(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
var bu = function(t) {
  var o = t && ot(t)[0];
  return o && o.split("__")[0].split("--")[0];
}, _u = function(t, o, n) {
  if (t) {
    var r = t.split(" ")[0], i = [].concat(xe(o.length === 0 ? n.map(function(s) {
      return "".concat(r, "--").concat(s.substring(1));
    }) : []), xe(o.map(function(s) {
      return "".concat(r, "__").concat(s);
    })));
    return o.length === 0 ? [t].concat(xe(i)) : i;
  }
};
function po(e) {
  var t = e.style, o = e.className, n = e.classNames, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : co, i = o || bu(n) || (t == null ? void 0 : t.className), s = typeof t == "function" ? t : Eu(function(d, f) {
    var h = fo(d);
    et(Array.isArray(h), "First parameter must be a string, an array of strings, a plain object with boolean values, or a falsy value."), et(!f || Ot(f), "Optional second parameter must be a plain object.");
    var p = h.filter(Fn), m = h.filter(pu), v = m.length > 0 ? function(S) {
      return so(uo(S, m));
    } : function(S) {
      return [S];
    }, b = function() {
      var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return v(gu(A, p));
    }, _ = _u(i, m, p);
    return po(We(We(We({}, (t || f) && {
      style: bn.apply(void 0, [{}].concat(xe(b(f)), xe(b(t))))
    }), _ && {
      className: _.join(" ")
    }), n && {
      classNames: n
    }), r);
  }), u = We({}, typeof t == "function" ? t : {
    style: t
  }), c = xe(new Set([].concat(xe(u.className ? u.className.split(" ") : []), xe(i ? i.split(" ") : [])))), l = n ? fu(c.map(function(d) {
    return n[d];
  })) : c, a = r(We(We({}, u), l.length > 0 ? {
    className: l.join(" ")
  } : {}));
  return Object.assign(s, a), s;
}
function br(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? br(Object(o), !0).forEach(function(n) {
      ht(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : br(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
var Su = function() {
  for (var t = arguments.length, o = new Array(t), n = 0; n < t; n++)
    o[n] = arguments[n];
  return o.reduce(function(r, i) {
    return ut(ut(ut({}, r), typeof i == "function" ? i : {}), {}, {
      style: ut(ut({}, r.style), typeof i == "function" ? i.style : i)
    });
  }, {});
}, Mn = function(t, o, n) {
  var r = o.style, i = o.className, s = o.classNames, u = nt(lo), c = Ge(function() {
    return po({
      style: r,
      className: i,
      classNames: s
    }, u);
  }, [r, i, s, u]);
  return c(n, t);
}, _n = { exports: {} }, _t = { exports: {} }, ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _r;
function Cu() {
  if (_r)
    return ae;
  _r = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, r = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, a = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, p = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
  function S(E) {
    if (typeof E == "object" && E !== null) {
      var N = E.$$typeof;
      switch (N) {
        case t:
          switch (E = E.type, E) {
            case c:
            case l:
            case n:
            case i:
            case r:
            case d:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case u:
                case a:
                case p:
                case h:
                case s:
                  return E;
                default:
                  return N;
              }
          }
        case o:
          return N;
      }
    }
  }
  function A(E) {
    return S(E) === l;
  }
  return ae.AsyncMode = c, ae.ConcurrentMode = l, ae.ContextConsumer = u, ae.ContextProvider = s, ae.Element = t, ae.ForwardRef = a, ae.Fragment = n, ae.Lazy = p, ae.Memo = h, ae.Portal = o, ae.Profiler = i, ae.StrictMode = r, ae.Suspense = d, ae.isAsyncMode = function(E) {
    return A(E) || S(E) === c;
  }, ae.isConcurrentMode = A, ae.isContextConsumer = function(E) {
    return S(E) === u;
  }, ae.isContextProvider = function(E) {
    return S(E) === s;
  }, ae.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === t;
  }, ae.isForwardRef = function(E) {
    return S(E) === a;
  }, ae.isFragment = function(E) {
    return S(E) === n;
  }, ae.isLazy = function(E) {
    return S(E) === p;
  }, ae.isMemo = function(E) {
    return S(E) === h;
  }, ae.isPortal = function(E) {
    return S(E) === o;
  }, ae.isProfiler = function(E) {
    return S(E) === i;
  }, ae.isStrictMode = function(E) {
    return S(E) === r;
  }, ae.isSuspense = function(E) {
    return S(E) === d;
  }, ae.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === n || E === l || E === i || E === r || E === d || E === f || typeof E == "object" && E !== null && (E.$$typeof === p || E.$$typeof === h || E.$$typeof === s || E.$$typeof === u || E.$$typeof === a || E.$$typeof === v || E.$$typeof === b || E.$$typeof === _ || E.$$typeof === m);
  }, ae.typeOf = S, ae;
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
var Sr;
function Tu() {
  return Sr || (Sr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, r = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, a = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, p = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
    function S($) {
      return typeof $ == "string" || typeof $ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      $ === n || $ === l || $ === i || $ === r || $ === d || $ === f || typeof $ == "object" && $ !== null && ($.$$typeof === p || $.$$typeof === h || $.$$typeof === s || $.$$typeof === u || $.$$typeof === a || $.$$typeof === v || $.$$typeof === b || $.$$typeof === _ || $.$$typeof === m);
    }
    function A($) {
      if (typeof $ == "object" && $ !== null) {
        var he = $.$$typeof;
        switch (he) {
          case t:
            var ze = $.type;
            switch (ze) {
              case c:
              case l:
              case n:
              case i:
              case r:
              case d:
                return ze;
              default:
                var $e = ze && ze.$$typeof;
                switch ($e) {
                  case u:
                  case a:
                  case p:
                  case h:
                  case s:
                    return $e;
                  default:
                    return he;
                }
            }
          case o:
            return he;
        }
      }
    }
    var E = c, N = l, F = u, y = s, H = t, O = a, k = n, Z = p, X = h, j = o, I = i, T = r, x = d, D = !1;
    function L($) {
      return D || (D = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C($) || A($) === c;
    }
    function C($) {
      return A($) === l;
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
      return A($) === d;
    }
    ue.AsyncMode = E, ue.ConcurrentMode = N, ue.ContextConsumer = F, ue.ContextProvider = y, ue.Element = H, ue.ForwardRef = O, ue.Fragment = k, ue.Lazy = Z, ue.Memo = X, ue.Portal = j, ue.Profiler = I, ue.StrictMode = T, ue.Suspense = x, ue.isAsyncMode = L, ue.isConcurrentMode = C, ue.isContextConsumer = R, ue.isContextProvider = U, ue.isElement = z, ue.isForwardRef = q, ue.isFragment = K, ue.isLazy = W, ue.isMemo = Y, ue.isPortal = J, ue.isProfiler = Q, ue.isStrictMode = V, ue.isSuspense = le, ue.isValidElementType = S, ue.typeOf = A;
  }()), ue;
}
var Cr;
function ho() {
  return Cr || (Cr = 1, process.env.NODE_ENV === "production" ? _t.exports = Cu() : _t.exports = Tu()), _t.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var rn, Tr;
function Ou() {
  if (Tr)
    return rn;
  Tr = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function r() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, u = 0; u < 10; u++)
        s["_" + String.fromCharCode(u)] = u;
      var c = Object.getOwnPropertyNames(s).map(function(a) {
        return s[a];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(a) {
        l[a] = a;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return rn = r() ? Object.assign : function(i, s) {
    for (var u, c = n(i), l, a = 1; a < arguments.length; a++) {
      u = Object(arguments[a]);
      for (var d in u)
        t.call(u, d) && (c[d] = u[d]);
      if (e) {
        l = e(u);
        for (var f = 0; f < l.length; f++)
          o.call(u, l[f]) && (c[l[f]] = u[l[f]]);
      }
    }
    return c;
  }, rn;
}
var on, Or;
function $n() {
  if (Or)
    return on;
  Or = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return on = e, on;
}
var sn, Ar;
function go() {
  return Ar || (Ar = 1, sn = Function.call.bind(Object.prototype.hasOwnProperty)), sn;
}
var an, Rr;
function Au() {
  if (Rr)
    return an;
  Rr = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = $n(), o = {}, n = go();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function r(i, s, u, c, l) {
    if (process.env.NODE_ENV !== "production") {
      for (var a in i)
        if (n(i, a)) {
          var d;
          try {
            if (typeof i[a] != "function") {
              var f = Error(
                (c || "React class") + ": " + u + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            d = i[a](s, a, c, u, null, t);
          } catch (p) {
            d = p;
          }
          if (d && !(d instanceof Error) && e(
            (c || "React class") + ": type specification of " + u + " `" + a + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof d + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), d instanceof Error && !(d.message in o)) {
            o[d.message] = !0;
            var h = l ? l() : "";
            e(
              "Failed " + u + " type: " + d.message + (h ?? "")
            );
          }
        }
    }
  }
  return r.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (o = {});
  }, an = r, an;
}
var un, Dr;
function Ru() {
  if (Dr)
    return un;
  Dr = 1;
  var e = ho(), t = Ou(), o = $n(), n = go(), r = Au(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(u) {
    var c = "Warning: " + u;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return un = function(u, c) {
    var l = typeof Symbol == "function" && Symbol.iterator, a = "@@iterator";
    function d(C) {
      var R = C && (l && C[l] || C[a]);
      if (typeof R == "function")
        return R;
    }
    var f = "<<anonymous>>", h = {
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
      instanceOf: N,
      node: O(),
      objectOf: y,
      oneOf: F,
      oneOfType: H,
      shape: Z,
      exact: X
    };
    function p(C, R) {
      return C === R ? C !== 0 || 1 / C === 1 / R : C !== C && R !== R;
    }
    function m(C, R) {
      this.message = C, this.data = R && typeof R == "object" ? R : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function v(C) {
      if (process.env.NODE_ENV !== "production")
        var R = {}, U = 0;
      function z(K, W, Y, J, Q, V, le) {
        if (J = J || f, V = V || Y, le !== o) {
          if (c) {
            var $ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw $.name = "Invariant Violation", $;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var he = J + ":" + Y;
            !R[he] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + V + "` prop on `" + J + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[he] = !0, U++);
          }
        }
        return W[Y] == null ? K ? W[Y] === null ? new m("The " + Q + " `" + V + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new m("The " + Q + " `" + V + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : C(W, Y, J, Q, V);
      }
      var q = z.bind(null, !1);
      return q.isRequired = z.bind(null, !0), q;
    }
    function b(C) {
      function R(U, z, q, K, W, Y) {
        var J = U[z], Q = T(J);
        if (Q !== C) {
          var V = x(J);
          return new m(
            "Invalid " + K + " `" + W + "` of type " + ("`" + V + "` supplied to `" + q + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
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
      function R(U, z, q, K, W) {
        if (typeof C != "function")
          return new m("Property `" + W + "` of component `" + q + "` has invalid PropType notation inside arrayOf.");
        var Y = U[z];
        if (!Array.isArray(Y)) {
          var J = T(Y);
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + J + "` supplied to `" + q + "`, expected an array."));
        }
        for (var Q = 0; Q < Y.length; Q++) {
          var V = C(Y, Q, q, K, W + "[" + Q + "]", o);
          if (V instanceof Error)
            return V;
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
          return new m("Invalid " + q + " `" + K + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(C);
    }
    function E() {
      function C(R, U, z, q, K) {
        var W = R[U];
        if (!e.isValidElementType(W)) {
          var Y = T(W);
          return new m("Invalid " + q + " `" + K + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(C);
    }
    function N(C) {
      function R(U, z, q, K, W) {
        if (!(U[z] instanceof C)) {
          var Y = C.name || f, J = L(U[z]);
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + J + "` supplied to `" + q + "`, expected ") + ("instance of `" + Y + "`."));
        }
        return null;
      }
      return v(R);
    }
    function F(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function R(U, z, q, K, W) {
        for (var Y = U[z], J = 0; J < C.length; J++)
          if (p(Y, C[J]))
            return null;
        var Q = JSON.stringify(C, function(le, $) {
          var he = x($);
          return he === "symbol" ? String($) : $;
        });
        return new m("Invalid " + K + " `" + W + "` of value `" + String(Y) + "` " + ("supplied to `" + q + "`, expected one of " + Q + "."));
      }
      return v(R);
    }
    function y(C) {
      function R(U, z, q, K, W) {
        if (typeof C != "function")
          return new m("Property `" + W + "` of component `" + q + "` has invalid PropType notation inside objectOf.");
        var Y = U[z], J = T(Y);
        if (J !== "object")
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + J + "` supplied to `" + q + "`, expected an object."));
        for (var Q in Y)
          if (n(Y, Q)) {
            var V = C(Y, Q, q, K, W + "." + Q, o);
            if (V instanceof Error)
              return V;
          }
        return null;
      }
      return v(R);
    }
    function H(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var R = 0; R < C.length; R++) {
        var U = C[R];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + D(U) + " at index " + R + "."
          ), s;
      }
      function z(q, K, W, Y, J) {
        for (var Q = [], V = 0; V < C.length; V++) {
          var le = C[V], $ = le(q, K, W, Y, J, o);
          if ($ == null)
            return null;
          $.data && n($.data, "expectedType") && Q.push($.data.expectedType);
        }
        var he = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new m("Invalid " + Y + " `" + J + "` supplied to " + ("`" + W + "`" + he + "."));
      }
      return v(z);
    }
    function O() {
      function C(R, U, z, q, K) {
        return j(R[U]) ? null : new m("Invalid " + q + " `" + K + "` supplied to " + ("`" + z + "`, expected a ReactNode."));
      }
      return v(C);
    }
    function k(C, R, U, z, q) {
      return new m(
        (C || "React class") + ": " + R + " type `" + U + "." + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + q + "`."
      );
    }
    function Z(C) {
      function R(U, z, q, K, W) {
        var Y = U[z], J = T(Y);
        if (J !== "object")
          return new m("Invalid " + K + " `" + W + "` of type `" + J + "` " + ("supplied to `" + q + "`, expected `object`."));
        for (var Q in C) {
          var V = C[Q];
          if (typeof V != "function")
            return k(q, K, W, Q, x(V));
          var le = V(Y, Q, q, K, W + "." + Q, o);
          if (le)
            return le;
        }
        return null;
      }
      return v(R);
    }
    function X(C) {
      function R(U, z, q, K, W) {
        var Y = U[z], J = T(Y);
        if (J !== "object")
          return new m("Invalid " + K + " `" + W + "` of type `" + J + "` " + ("supplied to `" + q + "`, expected `object`."));
        var Q = t({}, U[z], C);
        for (var V in Q) {
          var le = C[V];
          if (n(C, V) && typeof le != "function")
            return k(q, K, W, V, x(le));
          if (!le)
            return new m(
              "Invalid " + K + " `" + W + "` key `" + V + "` supplied to `" + q + "`.\nBad object: " + JSON.stringify(U[z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var $ = le(Y, V, q, K, W + "." + V, o);
          if ($)
            return $;
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
          if (Array.isArray(C))
            return C.every(j);
          if (C === null || u(C))
            return !0;
          var R = d(C);
          if (R) {
            var U = R.call(C), z;
            if (R !== C.entries) {
              for (; !(z = U.next()).done; )
                if (!j(z.value))
                  return !1;
            } else
              for (; !(z = U.next()).done; ) {
                var q = z.value;
                if (q && !j(q[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function I(C, R) {
      return C === "symbol" ? !0 : R ? R["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && R instanceof Symbol : !1;
    }
    function T(C) {
      var R = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : I(R, C) ? "symbol" : R;
    }
    function x(C) {
      if (typeof C > "u" || C === null)
        return "" + C;
      var R = T(C);
      if (R === "object") {
        if (C instanceof Date)
          return "date";
        if (C instanceof RegExp)
          return "regexp";
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
    return h.checkPropTypes = r, h.resetWarningCache = r.resetWarningCache, h.PropTypes = h, h;
  }, un;
}
var cn, Ir;
function Du() {
  if (Ir)
    return cn;
  Ir = 1;
  var e = $n();
  function t() {
  }
  function o() {
  }
  return o.resetWarningCache = t, cn = function() {
    function n(s, u, c, l, a, d) {
      if (d !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
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
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, cn;
}
if (process.env.NODE_ENV !== "production") {
  var Iu = ho(), wu = !0;
  _n.exports = Ru()(Iu.isElement, wu);
} else
  _n.exports = Du()();
var xu = _n.exports;
const M = /* @__PURE__ */ Ue(xu);
var At = function(t) {
  return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}, Ie = {
  id: "__id__",
  display: "__display__"
}, wr = function(t, o) {
  et(o === "id" || o === "display", 'Second arg must be either "id" or "display", got: "'.concat(o, '"'));
  var n = t.indexOf(Ie.display), r = t.indexOf(Ie.id);
  return n < 0 && (n = null), r < 0 && (r = null), et(n !== null || r !== null, "The markup '".concat(t, "' does not contain either of the placeholders '__id__' or '__display__'")), n !== null && r !== null ? o === "id" && r <= n || o === "display" && n <= r ? 0 : 1 : 0;
}, Nu = function(t) {
  var o = /^\/(.+)\/(\w+)?$/;
  return new RegExp(t.map(function(n) {
    var r = o.exec(n.toString()), i = jt(r, 3), s = i[1], u = i[2];
    return et(!u, "RegExp flags are not supported. Change /".concat(s, "/").concat(u, " into /").concat(s, "/")), "(".concat(s, ")");
  }).join("|"), "g");
}, vo = function(t) {
  var o = 0;
  return t.indexOf("__id__") >= 0 && o++, t.indexOf("__display__") >= 0 && o++, o;
}, ju = function() {
}, gt = function(t, o, n) {
  for (var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ju, i = Nu(o.map(function(E) {
    return E.regex;
  })), s = 2, u = o.map(function(E) {
    var N = E.markup, F = s;
    return s += vo(N) + 1, F;
  }), c, l = 0, a = 0; (c = i.exec(t)) !== null; ) {
    var d = u.find(function(E) {
      return !!c[E];
    }), f = u.indexOf(d), h = o[f], p = h.markup, m = h.displayTransform, v = d + wr(p, "id"), b = d + wr(p, "display"), _ = c[v], S = m(_, c[b]), A = t.substring(l, c.index);
    r(A, l, a), a += A.length, n(c[0], c.index, a, _, S, f, l), a += S.length, l = i.lastIndex;
  }
  l < t.length && r(t.substring(l), l, a);
}, Be = function(t, o) {
  var n = "";
  return gt(t, o, function(r, i, s, u, c) {
    n += c;
  }, function(r) {
    n += r;
  }), n;
}, me = function(t, o, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "START";
  if (typeof n != "number")
    return n;
  var i, s = function(l, a, d) {
    i === void 0 && d + l.length >= n && (i = a + n - d);
  }, u = function(l, a, d, f, h, p, m) {
    i === void 0 && d + h.length > n && (r === "NULL" ? i = null : i = a + (r === "END" ? l.length : 0));
  };
  return gt(t, o, u, s), i === void 0 ? t.length : i;
}, lt = function(t, o, n, r) {
  return t.substring(0, o) + r + t.substring(n);
}, Pu = function(t, o, n, r) {
  var i = n.selectionStartBefore, s = n.selectionEndBefore, u = n.selectionEndAfter, c = Be(t, r), l = c.length - o.length;
  i === "undefined" && (i = u + l), s === "undefined" && (s = i), i === s && s === u && c.length === o.length && (i = i - 1);
  var a = o.slice(i, u), d = Math.min(i, u), f = s;
  i === u && (f = Math.max(s, i + l));
  var h = me(t, r, d, "START"), p = me(t, r, f, "END"), m = me(t, r, d, "NULL"), v = me(t, r, f, "NULL"), b = m === null || v === null, _ = lt(t, h, p, a);
  if (!b) {
    var S = Be(_, r);
    if (S !== o) {
      for (d = 0; o[d] === S[d]; )
        d++;
      a = o.slice(d, u), f = c.lastIndexOf(o.substring(u)), h = me(t, r, d, "START"), p = me(t, r, f, "END"), _ = lt(t, h, p, a);
    }
  }
  return _;
}, xr = function(t, o, n) {
  var r = n, i = !1, s = function(c, l, a, d, f, h, p) {
    a <= n && a + f.length > n && (r = a, i = !0);
  };
  if (gt(t, o, s), i)
    return r;
}, ct = function(t, o) {
  var n = [];
  return gt(t, o, function(r, i, s, u, c, l, a) {
    n.push({
      id: u,
      display: c,
      childIndex: l,
      index: i,
      plainTextIndex: s
    });
  }), n;
}, mo = function(t, o) {
  return "".concat(t, "-").concat(o);
}, St = function(t) {
  return Object.values(t).reduce(function(o, n) {
    var r = n.results;
    return o + r.length;
  }, 0);
}, Fu = function(t, o) {
  var n = ct(t, o), r = n[n.length - 1];
  return r ? r.plainTextIndex + r.display.length : 0;
}, Mu = function(t) {
  var o = At(t), n = t[t.indexOf(Ie.display) + Ie.display.length], r = t[t.indexOf(Ie.id) + Ie.id.length];
  return new RegExp(o.replace(Ie.display, "([^".concat(At(n || ""), "]+?)")).replace(Ie.id, "([^".concat(At(r || ""), "]+?)")));
}, Pe = function(t) {
  return Ze.toArray(t).map(function(o) {
    var n = o.props, r = n.markup, i = n.regex, s = n.displayTransform;
    return {
      markup: r,
      regex: i ? $u(i, r) : Mu(r),
      displayTransform: s || function(u, c) {
        return c || u;
      }
    };
  });
}, $u = function(t, o) {
  var n = new RegExp(t.toString() + "|").exec("").length - 1, r = vo(o);
  return et(n === r, "Number of capturing groups in RegExp ".concat(t.toString(), " (").concat(n, ") does not match the number of placeholders in the markup '").concat(o, "' (").concat(r, ")")), t;
}, ku = function(t, o, n) {
  return t.replace(Ie.id, o).replace(Ie.display, n);
}, Lu = [{
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
}], Bu = function(t) {
  var o = t;
  return Lu.forEach(function(n) {
    o = o.replace(n.letters, n.base);
  }), o;
}, Nr = function(t) {
  return Bu(t).toLowerCase();
}, yo = function(t, o, n) {
  return n ? Nr(t).indexOf(Nr(o)) : t.toLowerCase().indexOf(o.toLowerCase());
}, Hu = function() {
  return !!document.documentMode;
}, Sn = function(t) {
  return typeof t == "number";
}, Uu = function(t) {
  return t === Object(t) ? Object.keys(t) : [];
}, zu = function(t) {
  for (var o, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  var s = (o = []).concat.apply(o, r);
  return Object.keys(t).reduce(function(u, c) {
    return t.hasOwnProperty(c) && !s.includes(c) && t[c] !== void 0 && (u[c] = t[c]), u;
  }, {});
}, qu = ["style", "className", "classNames"];
function jr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function Pr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jr(Object(o), !0).forEach(function(n) {
      ee(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : jr(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
function Wt(e, t) {
  var o = function(r) {
    var i = function(c) {
      var l = c.style, a = c.className, d = c.classNames, f = ou(c, qu), h = t ? t(f) : void 0, p = Mn(e, {
        style: l,
        className: a,
        classNames: d
      }, h);
      return /* @__PURE__ */ oe.createElement(r, Oe({}, f, {
        style: p
      }));
    }, s = r.displayName || r.name || "Component";
    return i.displayName = "defaultStyle(".concat(s, ")"), /* @__PURE__ */ oe.forwardRef(function(u, c) {
      return i(Pr(Pr({}, u), {}, {
        ref: c
      }));
    });
  };
  return o;
}
var Vu = function(t, o) {
  return t.hasOwnProperty(o) ? t[o]++ : t[o] = 0, o + "_" + t[o];
};
function Eo(e) {
  var t = e.selectionStart, o = e.selectionEnd, n = e.value, r = n === void 0 ? "" : n, i = e.onCaretPositionChange, s = e.containerRef, u = e.children;
  e.singleLine;
  var c = e.style, l = ge({
    left: void 0,
    top: void 0
  }), a = jt(l, 2), d = a[0], f = a[1], h = ge(), p = jt(h, 2), m = p[0], v = p[1];
  Ae(function() {
    b();
  });
  var b = function() {
    if (m) {
      var j = m.offsetLeft, I = m.offsetTop;
      if (!(d.left === j && d.top === I)) {
        var T = {
          left: j,
          top: I
        };
        f(T), i(T);
      }
    }
  }, _ = Pe(u), S;
  o === t && (S = me(r, _, t, "START"));
  var A = [], E = {}, N = A, F = 0, y = function(j, I, T) {
    if (Sn(S) && S >= I && S <= I + j.length) {
      var x = S - I;
      N.push(O(j.substring(0, x), F)), N = [O(j.substring(x), F)];
    } else
      N.push(O(j, F));
    F++;
  }, H = function(j, I, T, x, D, L, C) {
    var R = Vu(E, x);
    N.push(k(x, D, L, R));
  }, O = function(j, I) {
    return /* @__PURE__ */ oe.createElement("span", Oe({}, c("substring"), {
      key: I
    }), j);
  }, k = function(j, I, T, x) {
    var D = {
      id: j,
      display: I,
      key: x
    }, L = Ze.toArray(u)[T];
    return /* @__PURE__ */ oe.cloneElement(L, D);
  }, Z = function(j) {
    return /* @__PURE__ */ oe.createElement("span", Oe({}, c("caret"), {
      ref: v,
      key: "caret"
    }), j);
  };
  return gt(r, _, H, y), N.push(" "), N !== A && A.push(Z(N)), /* @__PURE__ */ oe.createElement("div", Oe({}, c, {
    ref: s
  }), A);
}
Eo.propTypes = {
  selectionStart: M.number,
  selectionEnd: M.number,
  value: M.string.isRequired,
  onCaretPositionChange: M.func.isRequired,
  containerRef: M.oneOfType([M.func, M.shape({
    current: typeof Element > "u" ? M.any : M.instanceOf(Element)
  })]),
  children: M.oneOfType([M.element, M.arrayOf(M.element)]).isRequired
};
var Wu = Wt({
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
}), Yu = Wu(Eo);
function bo(e) {
  var t = e.id, o = e.focused, n = e.ignoreAccents, r = e.index, i = e.onClick, s = e.onMouseEnter, u = e.query, c = e.renderSuggestion, l = e.suggestion, a = e.style;
  e.className, e.classNames;
  var d = {
    onClick: i,
    onMouseEnter: s
  }, f = function() {
    var v = h(), b = p(v);
    return c ? c(l, u, b, r, o) : b;
  }, h = function() {
    if (typeof l == "string")
      return l;
    var v = l.id, b = l.display;
    return v === void 0 || !b ? v : b;
  }, p = function(v) {
    var b = yo(v, u, n);
    return b === -1 ? /* @__PURE__ */ oe.createElement("span", a("display"), v) : /* @__PURE__ */ oe.createElement("span", a("display"), v.substring(0, b), /* @__PURE__ */ oe.createElement("b", a("highlight"), v.substring(b, b + u.length)), v.substring(b + u.length));
  };
  return /* @__PURE__ */ oe.createElement("li", Oe({
    id: t,
    role: "option",
    "aria-selected": o
  }, d, a), f());
}
bo.propTypes = {
  id: M.string.isRequired,
  query: M.string.isRequired,
  index: M.number.isRequired,
  ignoreAccents: M.bool,
  suggestion: M.oneOfType([M.string, M.shape({
    id: M.oneOfType([M.string, M.number]).isRequired,
    display: M.string
  })]).isRequired,
  renderSuggestion: M.func,
  focused: M.bool
};
var Ku = Wt({
  cursor: "pointer"
}, function(e) {
  return {
    "&focused": e.focused
  };
}), Xu = Ku(bo);
function Gu(e) {
  var t = e.style, o = e.className, n = e.classNames, r = Mn(Zu, {
    style: t,
    className: o,
    classNames: n
  }), i = r("spinner");
  return /* @__PURE__ */ oe.createElement("div", r, /* @__PURE__ */ oe.createElement("div", i, /* @__PURE__ */ oe.createElement("div", i(["element", "element1"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element2"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element3"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element4"])), /* @__PURE__ */ oe.createElement("div", i(["element", "element5"]))));
}
var Zu = {};
function _o(e) {
  var t = e.id, o = e.suggestions, n = o === void 0 ? {} : o, r = e.a11ySuggestionsListLabel, i = e.focusIndex, s = e.position, u = e.left, c = e.right, l = e.top, a = e.scrollFocusedIntoView, d = e.isLoading, f = e.isOpened, h = e.onSelect, p = h === void 0 ? function() {
    return null;
  } : h, m = e.ignoreAccents, v = e.containerRef, b = e.children, _ = e.style, S = e.customSuggestionsContainer, A = e.onMouseDown, E = e.onMouseEnter, N = ge(void 0), F = jt(N, 2), y = F[0], H = F[1];
  Ae(function() {
    if (!(!y || y.offsetHeight >= y.scrollHeight || !a)) {
      var T = y.scrollTop, x = y.children[i].getBoundingClientRect(), D = x.top, L = x.bottom, C = y.getBoundingClientRect(), R = C.top;
      D = D - R + T, L = L - R + T, D < T ? y.scrollTop = D : L > y.offsetHeight && (y.scrollTop = L - y.offsetHeight);
    }
  }, [i, a, y]);
  var O = function() {
    var x = /* @__PURE__ */ oe.createElement("ul", Oe({
      ref: H,
      id: t,
      role: "listbox",
      "aria-label": r
    }, _("list")), Object.values(n).reduce(function(D, L) {
      var C = L.results, R = L.queryInfo;
      return [].concat(xt(D), xt(C.map(function(U, z) {
        return k(U, R, D.length + z);
      })));
    }, []));
    return S ? S(x) : x;
  }, k = function(x, D, L) {
    var C = L === i, R = D.childIndex, U = D.query, z = Ze.toArray(b)[R].props.renderSuggestion;
    return /* @__PURE__ */ oe.createElement(Xu, {
      style: _("item"),
      key: "".concat(R, "-").concat(I(x)),
      id: mo(t, L),
      query: U,
      index: L,
      ignoreAccents: m,
      renderSuggestion: z,
      suggestion: x,
      focused: C,
      onClick: function() {
        return j(x, D);
      },
      onMouseEnter: function() {
        return X(L);
      }
    });
  }, Z = function() {
    if (d)
      return /* @__PURE__ */ oe.createElement(Gu, {
        style: _("loadingIndicator")
      });
  }, X = function(x, D) {
    E && E(x);
  }, j = function(x, D) {
    p(x, D);
  }, I = function(x) {
    return typeof x == "string" ? x : x.id;
  };
  return f ? /* @__PURE__ */ oe.createElement("div", Oe({}, Su({
    position: s || "absolute",
    left: u,
    right: c,
    top: l
  }, _), {
    onMouseDown: A,
    ref: v
  }), O(), Z()) : null;
}
_o.propTypes = {
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
  containerRef: M.oneOfType([M.func, M.shape({
    current: typeof Element > "u" ? M.any : M.instanceOf(Element)
  })])
};
var Ju = Wt({
  zIndex: 1,
  backgroundColor: "white",
  marginTop: 14,
  minWidth: 100,
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
}), Qu = Ju(_o);
function Fr(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), o.push.apply(o, n);
  }
  return o;
}
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fr(Object(o), !0).forEach(function(n) {
      ee(e, n, o[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : Fr(Object(o)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(o, n));
    });
  }
  return e;
}
function ec(e) {
  var t = tc();
  return function() {
    var n = Nt(e), r;
    if (t) {
      var i = Nt(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else
      r = n.apply(this, arguments);
    return Za(this, r);
  };
}
function tc() {
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
var nc = function(t) {
  var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t instanceof RegExp)
    return t;
  var n = o.allowSpaceInQuery, r = At(t);
  return new RegExp("(?:^|\\s)(".concat(r, "([^").concat(n ? "" : "\\s").concat(r, "]*))$"));
}, rc = function(t, o) {
  return t instanceof Array ? function(n, r) {
    for (var i = [], s = 0, u = t.length; s < u; ++s) {
      var c = t[s].display || t[s].id;
      yo(c, n, o) >= 0 && i.push(t[s]);
    }
    return i;
  } : t;
}, Ye = {
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  UP: 38,
  DOWN: 40
}, Ct = !1, So = {
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
  suggestionsPortalHost: typeof Element > "u" ? M.any : M.PropTypes.instanceOf(Element),
  inputRef: M.oneOfType([M.func, M.shape({
    current: typeof Element > "u" ? M.any : M.instanceOf(Element)
  })]),
  children: M.oneOfType([M.element, M.arrayOf(M.element)]).isRequired
}, kn = /* @__PURE__ */ function(e) {
  Ga(o, e);
  var t = ec(o);
  function o(n) {
    var r;
    return Ka(this, o), r = t.call(this, n), ee(te(r), "setContainerElement", function(i) {
      r.containerElement = i;
    }), ee(te(r), "getInputProps", function() {
      var i = r.props, s = i.readOnly, u = i.disabled, c = i.style, l = zu(
        r.props,
        ["style", "classNames", "className"],
        // substyle props
        Uu(So)
      );
      return Re(Re(Re(Re({}, l), c("input")), {}, {
        value: r.getPlainText(),
        onScroll: r.updateHighlighterScroll
      }, !s && !u && {
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
        "aria-activedescendant": mo(r.uuidSuggestionsOverlay, r.state.focusIndex)
      });
    }), ee(te(r), "renderControl", function() {
      var i = r.props, s = i.singleLine, u = i.style, c = r.getInputProps();
      return /* @__PURE__ */ oe.createElement("div", u("control"), r.renderHighlighter(), s ? r.renderInput(c) : r.renderTextarea(c));
    }), ee(te(r), "renderInput", function(i) {
      return /* @__PURE__ */ oe.createElement("input", Oe({
        type: "text",
        ref: r.setInputRef
      }, i));
    }), ee(te(r), "renderTextarea", function(i) {
      return /* @__PURE__ */ oe.createElement("textarea", Oe({
        ref: r.setInputRef
      }, i));
    }), ee(te(r), "setInputRef", function(i) {
      r.inputElement = i;
      var s = r.props.inputRef;
      typeof s == "function" ? s(i) : s && (s.current = i);
    }), ee(te(r), "setSuggestionsElement", function(i) {
      r.suggestionsElement = i;
    }), ee(te(r), "renderSuggestionsOverlay", function() {
      if (!Sn(r.state.selectionStart))
        return null;
      var i = r.state.suggestionsPosition, s = i.position, u = i.left, c = i.top, l = i.right, a = /* @__PURE__ */ oe.createElement(Qu, {
        id: r.uuidSuggestionsOverlay,
        style: r.props.style("suggestions"),
        position: s,
        left: u,
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
        a11ySuggestionsListLabel: r.props.a11ySuggestionsListLabel
      }, r.props.children);
      return r.props.suggestionsPortalHost ? /* @__PURE__ */ ri.createPortal(a, r.props.suggestionsPortalHost) : a;
    }), ee(te(r), "renderHighlighter", function() {
      var i = r.state, s = i.selectionStart, u = i.selectionEnd, c = r.props, l = c.singleLine, a = c.children, d = c.value, f = c.style;
      return /* @__PURE__ */ oe.createElement(Yu, {
        containerRef: r.setHighlighterElement,
        style: f("highlighter"),
        value: d,
        singleLine: l,
        selectionStart: s,
        selectionEnd: u,
        onCaretPositionChange: r.handleCaretPositionChange
      }, a);
    }), ee(te(r), "setHighlighterElement", function(i) {
      r.highlighterElement = i;
    }), ee(te(r), "handleCaretPositionChange", function(i) {
      r.setState({
        caretPosition: i
      });
    }), ee(te(r), "getPlainText", function() {
      return Be(r.props.value || "", Pe(r.props.children));
    }), ee(te(r), "executeOnChange", function(i) {
      for (var s = arguments.length, u = new Array(s > 1 ? s - 1 : 0), c = 1; c < s; c++)
        u[c - 1] = arguments[c];
      if (r.props.onChange) {
        var l;
        return (l = r.props).onChange.apply(l, [i].concat(u));
      }
      if (r.props.valueLink) {
        var a;
        return (a = r.props.valueLink).requestChange.apply(a, [i.target.value].concat(u));
      }
    }), ee(te(r), "handleChange", function(i) {
      if (Ct = !1, Hu()) {
        var s = document.activeElement && document.activeElement.contentDocument || document;
        if (s.activeElement !== i.target)
          return;
      }
      var u = r.props.value || "", c = Pe(r.props.children), l = i.target.value, a = r.state.selectionStart;
      a == null && (a = i.target.selectionStart);
      var d = r.state.selectionEnd;
      d == null && (d = i.target.selectionEnd);
      var f = Pu(u, l, {
        selectionStartBefore: a,
        selectionEndBefore: d,
        selectionEndAfter: i.target.selectionEnd
      }, c);
      l = Be(f, c);
      var h = i.target.selectionStart, p = i.target.selectionEnd, m = !1, v = xr(u, c, h);
      v !== void 0 && r.state.selectionEnd > v && (h = v + (i.nativeEvent.data ? i.nativeEvent.data.length : 0), p = h, m = !0), r.setState({
        selectionStart: h,
        selectionEnd: p,
        setSelectionAfterMentionChange: m
      });
      var b = ct(f, c);
      i.nativeEvent.isComposing && h === p && r.updateMentionsQueries(r.inputElement.value, h);
      var _ = {
        target: {
          value: f
        }
      };
      r.executeOnChange(_, f, l, b);
    }), ee(te(r), "handleSelect", function(i) {
      if (r.setState({
        selectionStart: i.target.selectionStart,
        selectionEnd: i.target.selectionEnd
      }), !Ct) {
        var s = r.inputElement;
        i.target.selectionStart === i.target.selectionEnd ? r.updateMentionsQueries(s.value, i.target.selectionStart) : r.clearSuggestions(), r.updateHighlighterScroll(), r.props.onSelect(i);
      }
    }), ee(te(r), "handleKeyDown", function(i) {
      var s = St(r.state.suggestions);
      if (s === 0 || !r.suggestionsElement) {
        r.props.onKeyDown(i);
        return;
      }
      switch (Object.values(Ye).indexOf(i.keyCode) >= 0 && (i.preventDefault(), i.stopPropagation()), i.keyCode) {
        case Ye.ESC: {
          r.clearSuggestions();
          return;
        }
        case Ye.DOWN: {
          r.shiftFocus(1);
          return;
        }
        case Ye.UP: {
          r.shiftFocus(-1);
          return;
        }
        case Ye.RETURN: {
          r.selectFocused();
          return;
        }
        case Ye.TAB: {
          r.selectFocused();
          return;
        }
        default:
          return;
      }
    }), ee(te(r), "shiftFocus", function(i) {
      var s = St(r.state.suggestions);
      r.setState({
        focusIndex: (s + r.state.focusIndex + i) % s,
        scrollFocusedIntoView: !0
      });
    }), ee(te(r), "selectFocused", function() {
      var i = r.state, s = i.suggestions, u = i.focusIndex, c = Object.values(s).reduce(function(d, f) {
        var h = f.results, p = f.queryInfo;
        return [].concat(xt(d), xt(h.map(function(m) {
          return {
            result: m,
            queryInfo: p
          };
        })));
      }, [])[u], l = c.result, a = c.queryInfo;
      r.addMention(l, a), r.setState({
        focusIndex: 0
      });
    }), ee(te(r), "handleBlur", function(i) {
      var s = r._suggestionsMouseDown;
      r._suggestionsMouseDown = !1, s || r.setState({
        selectionStart: null,
        selectionEnd: null
      }), window.setTimeout(function() {
        r.updateHighlighterScroll();
      }, 1), r.props.onBlur(i, s);
    }), ee(te(r), "handleSuggestionsMouseDown", function(i) {
      r._suggestionsMouseDown = !0;
    }), ee(te(r), "handleSuggestionsMouseEnter", function(i) {
      r.setState({
        focusIndex: i,
        scrollFocusedIntoView: !1
      });
    }), ee(te(r), "updateSuggestionsPosition", function() {
      var i = r.state.caretPosition, s = r.props, u = s.suggestionsPortalHost, c = s.allowSuggestionsAboveCursor, l = s.forceSuggestionsAboveCursor;
      if (!(!i || !r.suggestionsElement)) {
        var a = r.suggestionsElement, d = r.highlighterElement, f = d.getBoundingClientRect(), h = ln(d, "font-size"), p = {
          left: f.left + i.left,
          top: f.top + i.top + h
        }, m = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (a) {
          var v = {};
          if (u) {
            v.position = "fixed";
            var b = p.left, _ = p.top;
            b -= ln(a, "margin-left"), _ -= ln(a, "margin-top"), b -= d.scrollLeft, _ -= d.scrollTop;
            var S = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            b + a.offsetWidth > S ? v.left = Math.max(0, S - a.offsetWidth) : v.left = b, c && _ + a.offsetHeight > m && a.offsetHeight < _ - h || l ? v.top = Math.max(0, _ - a.offsetHeight - h) : v.top = _;
          } else {
            var A = i.left - d.scrollLeft, E = i.top - d.scrollTop;
            A + a.offsetWidth > r.containerElement.offsetWidth ? v.right = 0 : v.left = A, c && p.top - d.scrollTop + a.offsetHeight > m && a.offsetHeight < f.top - h - d.scrollTop || l ? v.top = E - a.offsetHeight - h : v.top = E;
          }
          v.left === r.state.suggestionsPosition.left && v.top === r.state.suggestionsPosition.top && v.position === r.state.suggestionsPosition.position || r.setState({
            suggestionsPosition: v
          });
        }
      }
    }), ee(te(r), "updateHighlighterScroll", function() {
      var i = r.inputElement, s = r.highlighterElement;
      !i || !s || (s.scrollLeft = i.scrollLeft, s.scrollTop = i.scrollTop, s.height = i.height);
    }), ee(te(r), "handleCompositionStart", function() {
      Ct = !0;
    }), ee(te(r), "handleCompositionEnd", function() {
      Ct = !1;
    }), ee(te(r), "setSelection", function(i, s) {
      if (!(i === null || s === null)) {
        var u = r.inputElement;
        if (u.setSelectionRange)
          u.setSelectionRange(i, s);
        else if (u.createTextRange) {
          var c = u.createTextRange();
          c.collapse(!0), c.moveEnd("character", s), c.moveStart("character", i), c.select();
        }
      }
    }), ee(te(r), "updateMentionsQueries", function(i, s) {
      r._queryId++, r.suggestions = {}, r.setState({
        suggestions: {}
      });
      var u = r.props.value || "", c = r.props.children, l = Pe(c), a = me(u, l, s, "NULL");
      if (a !== null) {
        var d = Fu(u.substring(0, a), l), f = i.substring(d, s);
        oe.Children.forEach(c, function(h, p) {
          if (h) {
            var m = nc(h.props.trigger, r.props), v = f.match(m);
            if (v) {
              var b = d + f.indexOf(v[1], v.index);
              r.queryData(v[2], p, b, b + v[1].length, i);
            }
          }
        });
      }
    }), ee(te(r), "clearSuggestions", function() {
      r._queryId++, r.suggestions = {}, r.setState({
        suggestions: {},
        focusIndex: 0
      });
    }), ee(te(r), "queryData", function(i, s, u, c, l) {
      var a = r.props, d = a.children, f = a.ignoreAccents, h = Ze.toArray(d)[s], p = rc(h.props.data, f), m = p(i, r.updateSuggestions.bind(null, r._queryId, s, i, u, c, l));
      m instanceof Array && r.updateSuggestions(r._queryId, s, i, u, c, l, m);
    }), ee(te(r), "updateSuggestions", function(i, s, u, c, l, a, d) {
      if (i === r._queryId) {
        r.suggestions = Re(Re({}, r.suggestions), {}, ee({}, s, {
          queryInfo: {
            childIndex: s,
            query: u,
            querySequenceStart: c,
            querySequenceEnd: l,
            plainTextValue: a
          },
          results: d
        }));
        var f = r.state.focusIndex, h = St(r.suggestions);
        r.setState({
          suggestions: r.suggestions,
          focusIndex: f >= h ? Math.max(h - 1, 0) : f
        });
      }
    }), ee(te(r), "addMention", function(i, s) {
      var u = i.id, c = i.display, l = s.childIndex, a = s.querySequenceStart, d = s.querySequenceEnd, f = s.plainTextValue, h = r.props.value || "", p = Pe(r.props.children), m = Ze.toArray(r.props.children)[l], v = m.props, b = v.markup, _ = v.displayTransform, S = v.appendSpaceOnAdd, A = v.onAdd, E = me(h, p, a, "START"), N = E + d - a, F = ku(b, u, c);
      S && (F += " ");
      var y = lt(h, E, N, F);
      r.inputElement.focus();
      var H = _(u, c);
      S && (H += " ");
      var O = a + H.length;
      r.setState({
        selectionStart: O,
        selectionEnd: O,
        setSelectionAfterMentionChange: !0
      });
      var k = {
        target: {
          value: y
        }
      }, Z = ct(y, p), X = lt(f, a, d, H);
      r.executeOnChange(k, y, X, Z), A && A(u, c, E, N), r.clearSuggestions();
    }), ee(te(r), "isLoading", function() {
      var i = !1;
      return oe.Children.forEach(r.props.children, function(s) {
        i = i || s && s.props.isLoading;
      }), i;
    }), ee(te(r), "isOpened", function() {
      return Sn(r.state.selectionStart) && (St(r.state.suggestions) !== 0 || r.isLoading());
    }), ee(te(r), "_queryId", 0), r.suggestions = {}, r.uuidSuggestionsOverlay = Math.random().toString(16).substring(2), r.handleCopy = r.handleCopy.bind(te(r)), r.handleCut = r.handleCut.bind(te(r)), r.handlePaste = r.handlePaste.bind(te(r)), r.state = {
      focusIndex: 0,
      selectionStart: null,
      selectionEnd: null,
      suggestions: {},
      caretPosition: null,
      suggestionsPosition: {},
      setSelectionAfterHandlePaste: !1
    }, r;
  }
  return Xa(o, [{
    key: "componentDidMount",
    value: function() {
      document.addEventListener("copy", this.handleCopy), document.addEventListener("cut", this.handleCut), document.addEventListener("paste", this.handlePaste), this.updateSuggestionsPosition();
    }
  }, {
    key: "componentDidUpdate",
    value: function(r, i) {
      i.suggestionsPosition === this.state.suggestionsPosition && this.updateSuggestionsPosition(), this.state.setSelectionAfterMentionChange && (this.setState({
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
      return /* @__PURE__ */ oe.createElement("div", Oe({
        ref: this.setContainerElement
      }, this.props.style), this.renderControl(), this.renderSuggestionsOverlay());
    }
  }, {
    key: "handlePaste",
    value: function(r) {
      if (r.target === this.inputElement && this.supportsClipboardActions(r)) {
        r.preventDefault();
        var i = this.state, s = i.selectionStart, u = i.selectionEnd, c = this.props, l = c.value, a = c.children, d = Pe(a), f = me(l, d, s, "START"), h = me(l, d, u, "END"), p = r.clipboardData.getData("text/react-mentions"), m = r.clipboardData.getData("text/plain"), v = lt(l, f, h, p || m).replace(/\r/g, ""), b = Be(v, d), _ = {
          target: Re(Re({}, r.target), {}, {
            value: v
          })
        };
        this.executeOnChange(_, v, b, ct(v, d));
        var S = xr(l, d, s), A = (S || s) + Be(p || m, d).length;
        this.setState({
          selectionStart: A,
          selectionEnd: A,
          setSelectionAfterHandlePaste: !0
        });
      }
    }
  }, {
    key: "saveSelectionToClipboard",
    value: function(r) {
      var i = this.inputElement.selectionStart, s = this.inputElement.selectionEnd, u = this.props, c = u.children, l = u.value, a = Pe(c), d = me(l, a, i, "START"), f = me(l, a, s, "END");
      r.clipboardData.setData("text/plain", r.target.value.slice(i, s)), r.clipboardData.setData("text/react-mentions", l.slice(d, f));
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
        var i = this.state, s = i.selectionStart, u = i.selectionEnd, c = this.props, l = c.children, a = c.value, d = Pe(l), f = me(a, d, s, "START"), h = me(a, d, u, "END"), p = [a.slice(0, f), a.slice(h)].join(""), m = Be(p, d), v = {
          target: Re(Re({}, r.target), {}, {
            value: m
          })
        };
        this.executeOnChange(v, p, m, ct(a, d));
      }
    }
    // Handle input element's change event
  }]), o;
}(oe.Component);
ee(kn, "propTypes", So);
ee(kn, "defaultProps", {
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
var ln = function(t, o) {
  var n = parseFloat(window.getComputedStyle(t, null).getPropertyValue(o));
  return isFinite(n) ? n : 0;
}, oc = typeof navigator < "u" && /iPhone|iPad|iPod/i.test(navigator.userAgent), ic = Wt({
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
    input: Re({
      height: "100%",
      bottom: 0,
      overflow: "hidden",
      resize: "none"
    }, oc ? {
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
}), sc = ic(kn), ac = {
  fontWeight: "inherit"
}, Ln = function(t) {
  var o = t.display, n = t.style, r = t.className, i = t.classNames, s = Mn(ac, {
    style: n,
    className: r,
    classNames: i
  });
  return /* @__PURE__ */ oe.createElement("strong", s, o);
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
  isLoading: M.bool
};
Ln.defaultProps = {
  trigger: "@",
  markup: "@[__display__](__id__)",
  displayTransform: function(t, o) {
    return o || t;
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
const uc = {
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
        backgroundColor: "#F5F6F8"
      }
    }
  }
}, cc = ({
  value: e,
  setValue: t,
  users: o,
  placeholder: n = "Type your reply here...",
  onEnterKeypress: r
}) => {
  const i = o.map((l) => ({
    ...l,
    display: l.display_name
  })), s = (l) => {
    l.stopPropagation(), l.key === "Enter" && !l.shiftKey && (l.preventDefault(), r == null || r());
  }, u = (l, a) => {
    console.info("[MentionsInputComponent] on mention select", { id: l, display: a });
  }, c = (l) => {
    t(l.target.value);
  };
  return /* @__PURE__ */ w.jsx(
    sc,
    {
      autoFocus: !0,
      value: e,
      onChange: c,
      style: {
        ...uc,
        minHeight: "40px",
        marginBottom: "10px"
      },
      placeholder: n,
      className: "mentions-input",
      onKeyDown: s,
      children: /* @__PURE__ */ w.jsx(
        Ln,
        {
          displayTransform: (l, a) => `@${a}`,
          trigger: "@",
          markup: "@[__id__](__display__)",
          data: i,
          appendSpaceOnAdd: !0,
          renderSuggestion: (l, a) => /* @__PURE__ */ w.jsx("div", { className: `user ${a ? "focused" : ""}`, children: l.display }),
          onAdd: u
        }
      )
    }
  );
}, lc = cc, dc = ({
  comment: e,
  setComment: t,
  loading: o,
  users: n,
  currentUser: r,
  placeholder: i,
  onEnterKeypress: s
}) => /* @__PURE__ */ w.jsxs("div", { className: je.conversationInputForm, children: [
  r ? /* @__PURE__ */ w.jsx(io, { user: r }) : null,
  /* @__PURE__ */ w.jsx(
    lc,
    {
      value: e,
      setValue: t,
      users: n,
      placeholder: i,
      onEnterKeypress: s
    }
  ),
  /* @__PURE__ */ w.jsx(Us, { loading: o, color: "primary", children: /* @__PURE__ */ w.jsx(ws, {}) })
] }), Co = dc, fc = ({
  meta: { highlight: e, filePath: t, field: o }
}) => e ? /* @__PURE__ */ w.jsx("div", { className: je.highlightText, children: /* @__PURE__ */ w.jsx(
  ua,
  {
    code: e,
    language: o ? "markdown" : "sql",
    showLineNumbers: !o,
    fileName: t
  }
) }) : null, To = fc, pc = () => {
  const e = se((a) => a.users), t = se(
    (a) => a.newConversation
  ), o = se(
    (a) => a.currentUserId ? a.users[a.currentUserId] : null
  ), n = se(
    (a) => a.shareId
  ), r = Ee(), [i, s] = ge(!1), [u, c] = ge(""), l = async (a) => {
    if (a == null || a.stopPropagation(), a == null || a.preventDefault(), !(!t || !n)) {
      s(!0);
      try {
        console.log("saving conversation", t, u);
        const d = await ha(n, {
          ...t,
          message: u
        });
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
      r(Xr()), s(!1), r(In(!0)), r(wn()), c("");
    }
  };
  return /* @__PURE__ */ w.jsx(Ft, { className: je.newConversationForm, children: /* @__PURE__ */ w.jsx(Mt, { children: /* @__PURE__ */ w.jsxs("form", { onSubmit: l, children: [
    /* @__PURE__ */ w.jsx("h4", { children: "Add comment" }),
    /* @__PURE__ */ w.jsx(
      To,
      {
        meta: (t == null ? void 0 : t.meta) || {}
      }
    ),
    /* @__PURE__ */ w.jsx(
      Co,
      {
        comment: u,
        setComment: c,
        loading: i,
        users: Object.values(e),
        currentUser: o,
        placeholder: "Start a conversation or add others with @",
        onEnterKeypress: l
      }
    )
  ] }) }) });
}, hc = pc;
var Oo = { exports: {} };
(function(e, t) {
  (function(o, n) {
    e.exports = n();
  })(oi, function() {
    var o = 1e3, n = 6e4, r = 36e5, i = "millisecond", s = "second", u = "minute", c = "hour", l = "day", a = "week", d = "month", f = "quarter", h = "year", p = "date", m = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, _ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(j) {
      var I = ["th", "st", "nd", "rd"], T = j % 100;
      return "[" + j + (I[(T - 20) % 10] || I[T] || I[0]) + "]";
    } }, S = function(j, I, T) {
      var x = String(j);
      return !x || x.length >= I ? j : "" + Array(I + 1 - x.length).join(T) + j;
    }, A = { s: S, z: function(j) {
      var I = -j.utcOffset(), T = Math.abs(I), x = Math.floor(T / 60), D = T % 60;
      return (I <= 0 ? "+" : "-") + S(x, 2, "0") + ":" + S(D, 2, "0");
    }, m: function j(I, T) {
      if (I.date() < T.date())
        return -j(T, I);
      var x = 12 * (T.year() - I.year()) + (T.month() - I.month()), D = I.clone().add(x, d), L = T - D < 0, C = I.clone().add(x + (L ? -1 : 1), d);
      return +(-(x + (T - D) / (L ? D - C : C - D)) || 0);
    }, a: function(j) {
      return j < 0 ? Math.ceil(j) || 0 : Math.floor(j);
    }, p: function(j) {
      return { M: d, y: h, w: a, d: l, D: p, h: c, m: u, s, ms: i, Q: f }[j] || String(j || "").toLowerCase().replace(/s$/, "");
    }, u: function(j) {
      return j === void 0;
    } }, E = "en", N = {};
    N[E] = _;
    var F = "$isDayjsObject", y = function(j) {
      return j instanceof Z || !(!j || !j[F]);
    }, H = function j(I, T, x) {
      var D;
      if (!I)
        return E;
      if (typeof I == "string") {
        var L = I.toLowerCase();
        N[L] && (D = L), T && (N[L] = T, D = L);
        var C = I.split("-");
        if (!D && C.length > 1)
          return j(C[0]);
      } else {
        var R = I.name;
        N[R] = I, D = R;
      }
      return !x && D && (E = D), D || !x && E;
    }, O = function(j, I) {
      if (y(j))
        return j.clone();
      var T = typeof I == "object" ? I : {};
      return T.date = j, T.args = arguments, new Z(T);
    }, k = A;
    k.l = H, k.i = y, k.w = function(j, I) {
      return O(j, { locale: I.$L, utc: I.$u, x: I.$x, $offset: I.$offset });
    };
    var Z = function() {
      function j(T) {
        this.$L = H(T.locale, null, !0), this.parse(T), this.$x = this.$x || T.x || {}, this[F] = !0;
      }
      var I = j.prototype;
      return I.parse = function(T) {
        this.$d = function(x) {
          var D = x.date, L = x.utc;
          if (D === null)
            return /* @__PURE__ */ new Date(NaN);
          if (k.u(D))
            return /* @__PURE__ */ new Date();
          if (D instanceof Date)
            return new Date(D);
          if (typeof D == "string" && !/Z$/i.test(D)) {
            var C = D.match(v);
            if (C) {
              var R = C[2] - 1 || 0, U = (C[7] || "0").substring(0, 3);
              return L ? new Date(Date.UTC(C[1], R, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, U)) : new Date(C[1], R, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, U);
            }
          }
          return new Date(D);
        }(T), this.init();
      }, I.init = function() {
        var T = this.$d;
        this.$y = T.getFullYear(), this.$M = T.getMonth(), this.$D = T.getDate(), this.$W = T.getDay(), this.$H = T.getHours(), this.$m = T.getMinutes(), this.$s = T.getSeconds(), this.$ms = T.getMilliseconds();
      }, I.$utils = function() {
        return k;
      }, I.isValid = function() {
        return this.$d.toString() !== m;
      }, I.isSame = function(T, x) {
        var D = O(T);
        return this.startOf(x) <= D && D <= this.endOf(x);
      }, I.isAfter = function(T, x) {
        return O(T) < this.startOf(x);
      }, I.isBefore = function(T, x) {
        return this.endOf(x) < O(T);
      }, I.$g = function(T, x, D) {
        return k.u(T) ? this[x] : this.set(D, T);
      }, I.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, I.valueOf = function() {
        return this.$d.getTime();
      }, I.startOf = function(T, x) {
        var D = this, L = !!k.u(x) || x, C = k.p(T), R = function(Q, V) {
          var le = k.w(D.$u ? Date.UTC(D.$y, V, Q) : new Date(D.$y, V, Q), D);
          return L ? le : le.endOf(l);
        }, U = function(Q, V) {
          return k.w(D.toDate()[Q].apply(D.toDate("s"), (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(V)), D);
        }, z = this.$W, q = this.$M, K = this.$D, W = "set" + (this.$u ? "UTC" : "");
        switch (C) {
          case h:
            return L ? R(1, 0) : R(31, 11);
          case d:
            return L ? R(1, q) : R(0, q + 1);
          case a:
            var Y = this.$locale().weekStart || 0, J = (z < Y ? z + 7 : z) - Y;
            return R(L ? K - J : K + (6 - J), q);
          case l:
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
      }, I.endOf = function(T) {
        return this.startOf(T, !1);
      }, I.$set = function(T, x) {
        var D, L = k.p(T), C = "set" + (this.$u ? "UTC" : ""), R = (D = {}, D[l] = C + "Date", D[p] = C + "Date", D[d] = C + "Month", D[h] = C + "FullYear", D[c] = C + "Hours", D[u] = C + "Minutes", D[s] = C + "Seconds", D[i] = C + "Milliseconds", D)[L], U = L === l ? this.$D + (x - this.$W) : x;
        if (L === d || L === h) {
          var z = this.clone().set(p, 1);
          z.$d[R](U), z.init(), this.$d = z.set(p, Math.min(this.$D, z.daysInMonth())).$d;
        } else
          R && this.$d[R](U);
        return this.init(), this;
      }, I.set = function(T, x) {
        return this.clone().$set(T, x);
      }, I.get = function(T) {
        return this[k.p(T)]();
      }, I.add = function(T, x) {
        var D, L = this;
        T = Number(T);
        var C = k.p(x), R = function(q) {
          var K = O(L);
          return k.w(K.date(K.date() + Math.round(q * T)), L);
        };
        if (C === d)
          return this.set(d, this.$M + T);
        if (C === h)
          return this.set(h, this.$y + T);
        if (C === l)
          return R(1);
        if (C === a)
          return R(7);
        var U = (D = {}, D[u] = n, D[c] = r, D[s] = o, D)[C] || 1, z = this.$d.getTime() + T * U;
        return k.w(z, this);
      }, I.subtract = function(T, x) {
        return this.add(-1 * T, x);
      }, I.format = function(T) {
        var x = this, D = this.$locale();
        if (!this.isValid())
          return D.invalidDate || m;
        var L = T || "YYYY-MM-DDTHH:mm:ssZ", C = k.z(this), R = this.$H, U = this.$m, z = this.$M, q = D.weekdays, K = D.months, W = D.meridiem, Y = function(V, le, $, he) {
          return V && (V[le] || V(x, L)) || $[le].slice(0, he);
        }, J = function(V) {
          return k.s(R % 12 || 12, V, "0");
        }, Q = W || function(V, le, $) {
          var he = V < 12 ? "AM" : "PM";
          return $ ? he.toLowerCase() : he;
        };
        return L.replace(b, function(V, le) {
          return le || function($) {
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
          }(V) || C.replace(":", "");
        });
      }, I.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, I.diff = function(T, x, D) {
        var L, C = this, R = k.p(x), U = O(T), z = (U.utcOffset() - this.utcOffset()) * n, q = this - U, K = function() {
          return k.m(C, U);
        };
        switch (R) {
          case h:
            L = K() / 12;
            break;
          case d:
            L = K();
            break;
          case f:
            L = K() / 3;
            break;
          case a:
            L = (q - z) / 6048e5;
            break;
          case l:
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
      }, I.daysInMonth = function() {
        return this.endOf(d).$D;
      }, I.$locale = function() {
        return N[this.$L];
      }, I.locale = function(T, x) {
        if (!T)
          return this.$L;
        var D = this.clone(), L = H(T, x, !0);
        return L && (D.$L = L), D;
      }, I.clone = function() {
        return k.w(this.$d, this);
      }, I.toDate = function() {
        return new Date(this.valueOf());
      }, I.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, I.toISOString = function() {
        return this.$d.toISOString();
      }, I.toString = function() {
        return this.$d.toUTCString();
      }, j;
    }(), X = Z.prototype;
    return O.prototype = X, [["$ms", i], ["$s", s], ["$m", u], ["$H", c], ["$W", l], ["$M", d], ["$y", h], ["$D", p]].forEach(function(j) {
      X[j[1]] = function(I) {
        return this.$g(I, j[0], j[1]);
      };
    }), O.extend = function(j, I) {
      return j.$i || (j(I, Z, O), j.$i = !0), O;
    }, O.locale = H, O.isDayjs = y, O.unix = function(j) {
      return O(1e3 * j);
    }, O.en = N[E], O.Ls = N, O.p = {}, O;
  });
})(Oo);
var gc = Oo.exports;
const vc = /* @__PURE__ */ Ue(gc), mc = ({
  conversationGroupId: e
}) => {
  const t = se(
    (s) => s.shareId
  ), o = Ee(), [n, r] = ge(!1), i = async () => {
    e && (r(!0), await ya(t, e), o(ns({ conversationGroupId: e, shareId: t })), r(!1));
  };
  return e ? /* @__PURE__ */ w.jsx(
    Qr,
    {
      disabled: n,
      className: je.resolveButton,
      title: "Resolve conversation",
      onClick: i,
      children: /* @__PURE__ */ w.jsx(Is, {})
    }
  ) : null;
}, yc = mc, Ec = ({
  user: e,
  timestamp: t,
  showResolveButton: o,
  conversationGroupId: n
}) => /* @__PURE__ */ w.jsxs(kr, { className: "d-flex align-items-center justify-content-between mb-0", children: [
  /* @__PURE__ */ w.jsxs("div", { className: "d-flex align-items-center gap-1", children: [
    /* @__PURE__ */ w.jsx(io, { user: e }),
    /* @__PURE__ */ w.jsxs("h4", { children: [
      e == null ? void 0 : e.first_name,
      " ",
      e == null ? void 0 : e.last_name
    ] }),
    /* @__PURE__ */ w.jsx("span", { children: vc(t).format("HH:mm, DD MMM YY") })
  ] }),
  o ? /* @__PURE__ */ w.jsx(yc, { conversationGroupId: n }) : null
] }), Ao = Ec, bc = ({ conversation: e }) => {
  const t = se((o) => {
    var n;
    return (n = o.users) == null ? void 0 : n[e == null ? void 0 : e.user_id];
  });
  return /* @__PURE__ */ w.jsxs(Ft, { children: [
    /* @__PURE__ */ w.jsx(Ao, { user: t, timestamp: e.timestamp }),
    /* @__PURE__ */ w.jsx(Mt, { children: /* @__PURE__ */ w.jsx("p", { children: e.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2") }) })
  ] });
}, _c = bc, Sc = ({ conversationGroupId: e }) => {
  const t = se((a) => a.users), o = se(
    (a) => a.currentUserId ? a.users[a.currentUserId] : null
  ), n = se(
    (a) => a.shareId
  ), [r, i] = ge(""), [s, u] = ge(!1), c = Ee(), l = async (a) => {
    if (a == null || a.stopPropagation(), a == null || a.preventDefault(), !(!n || !e)) {
      u(!0), console.log("saving reply", n, e, {
        message: r
      });
      try {
        await ga(n, e, {
          message: r
        });
      } catch (d) {
        console.error("error while saving reply", d);
      }
      c(Xr()), u(!1), i("");
    }
  };
  return /* @__PURE__ */ w.jsx("div", { className: je.replyForm, children: /* @__PURE__ */ w.jsx("form", { onSubmit: l, className: "", children: /* @__PURE__ */ w.jsx(
    Co,
    {
      comment: r,
      setComment: i,
      loading: s,
      users: Object.values(t),
      currentUser: o,
      onEnterKeypress: l
    }
  ) }) });
}, Cc = Sc, Tc = ({ conversationGroup: e }) => {
  var f;
  const t = se((h) => {
    var p;
    return (p = h.users) == null ? void 0 : p[e == null ? void 0 : e.owner];
  }), o = se((h) => h.codeblockLoaded), n = se(
    (h) => h.selectedConversationId
  ), r = Ee(), [i, s] = ge(!1), u = Fe(
    (h) => {
      !o || n !== e.conversation_group_id || !h || setTimeout(() => {
        h.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    },
    [
      e.conversation_group_id,
      n,
      o
    ]
  );
  if (!((f = e == null ? void 0 : e.conversations) != null && f.length) || (e == null ? void 0 : e.status) !== "Pending")
    return null;
  const c = () => {
    r(
      Dn(e.conversation_group_id)
    );
  }, [l, ...a] = e.conversations, d = a.length ? a.length > 1 ? `${a.length} replies` : `${a.length} reply` : "Reply";
  return /* @__PURE__ */ w.jsx("div", { ref: u, className: je.conversationGroup, children: /* @__PURE__ */ w.jsxs(
    Ft,
    {
      className: `${n === e.conversation_group_id ? "active" : ""}`,
      onClick: c,
      children: [
        /* @__PURE__ */ w.jsx(
          Ao,
          {
            user: t,
            timestamp: l.timestamp,
            showResolveButton: !0,
            conversationGroupId: e.conversation_group_id
          }
        ),
        /* @__PURE__ */ w.jsxs(Mt, { children: [
          /* @__PURE__ */ w.jsx(To, { meta: e.meta }),
          /* @__PURE__ */ w.jsx("p", { children: l.message.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2") }),
          /* @__PURE__ */ w.jsx(Pt, { onClick: () => s((h) => !h), color: "link", children: d }),
          a.length ? /* @__PURE__ */ w.jsx(w.Fragment, { children: i ? /* @__PURE__ */ w.jsx(w.Fragment, { children: a.map((h) => /* @__PURE__ */ w.jsx(_c, { conversation: h }, h.conversation_id)) }) : null }) : null,
          i ? /* @__PURE__ */ w.jsx(
            Cc,
            {
              conversationGroupId: e.conversation_group_id
            }
          ) : null
        ] })
      ]
    }
  ) });
}, Oc = Tc, Ac = () => {
  const e = se(
    (t) => t.conversations
  );
  return !e || !Object.keys(e).length ? /* @__PURE__ */ w.jsx("div", { children: "No conversations yet!" }) : /* @__PURE__ */ w.jsx("div", { children: Object.values(e).map((t) => /* @__PURE__ */ w.jsx(
    Oc,
    {
      conversationGroup: t
    },
    t.conversation_group_id
  )) });
}, Rc = Ac, Dc = () => {
  const e = se((s) => s.isRightPanelOpen), t = se(
    (s) => s.selectedConversationId
  ), o = se((s) => s.newConversation), n = Ee(), r = () => {
    n(In(!1)), n(Dn(void 0)), n(wn());
  };
  return !!o || e || t ? /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
    /* @__PURE__ */ w.jsx(
      ni,
      {
        onClick: r,
        className: je.conversationRightPanelCloseButton
      }
    ),
    /* @__PURE__ */ w.jsxs("div", { className: je.conversationRightPanel, children: [
      /* @__PURE__ */ w.jsx("h3", { children: "Comments" }),
      o ? /* @__PURE__ */ w.jsx(hc, {}) : /* @__PURE__ */ w.jsx(Rc, {})
    ] })
  ] }) : null;
}, Ic = Dc, wc = 120, xc = () => {
  const e = De(), t = se(
    (s) => s.shareId
  ), o = se(
    (s) => s.conversationsLoadingState
  ), n = Ee(), r = se(
    (s) => Object.keys(s.conversations || {})
  ), i = Fe(
    (s) => {
      clearTimeout(e.current), va(s).then(
        (u) => {
          console.log("useConversations", u), n(ts(u == null ? void 0 : u.dbt_docs_share_conversations)), e.current = setTimeout(() => {
            i(s);
          }, wc * 1e3);
        }
      ).catch(
        (u) => console.error("error while fetching conversations list", u)
      ).finally(() => {
        n(fr(Te.INITIALIZED));
      });
    },
    [n]
  );
  return Ae(() => {
    o !== Te.UNINITIALIZED || !t || (n(fr(Te.LOADING)), i(t));
  }, [n, o, r, t, i]), { isLoading: o === Te.LOADING };
}, Nc = () => {
  const e = Ee(), t = se(
    (r) => Object.keys(r.users || {})
  ), [o, n] = ge(Te.UNINITIALIZED);
  return Ae(() => {
    o !== Te.UNINITIALIZED || Object.keys(t).length || (n(Te.LOADING), ma().then((r) => {
      console.log("useConversationUsers", r), e(es(r));
    }).catch((r) => console.error("error while fetching users list", r)).finally(() => {
      n(Te.INITIALIZED);
    }));
  }, [e, o, t]), { isLoading: o === Te.LOADING };
}, jc = () => (Nc(), xc(), /* @__PURE__ */ w.jsxs("div", { children: [
  /* @__PURE__ */ w.jsx(Ic, {}),
  /* @__PURE__ */ w.jsx(wa, {})
] })), Pc = jc, Fc = ({ target: e, ...t }) => Cn(
  /* @__PURE__ */ w.jsx(
    Qr,
    {
      className: je.hotspotButton,
      title: "Click to start conversation",
      ...t,
      children: /* @__PURE__ */ w.jsx(Jr, {})
    }
  ),
  e
), Ro = Fc, Mc = () => {
  var c;
  const e = Ee(), t = se(
    (l) => l.codeblockLoaded
  ), o = se((l) => l.manifest), [n, r] = ge(0), i = (c = jn()) == null ? void 0 : c.parentElement, s = () => {
    var f;
    if (!i || !o.nodes)
      return;
    const l = Vt();
    if (!l || l.length < 3) {
      console.error("Unable to find model parts", l);
      return;
    }
    console.log("model parts found", l);
    const d = {
      filePath: "",
      // setting to empty string here and will be updated in conversationReducer when newConversation is set
      highlight: ((f = o.nodes[l[2]]) == null ? void 0 : f.raw_code).split(`
`)[n],
      uniqueId: l[2],
      resource_type: l[1],
      range: {
        end: { line: n, character: 0 },
        start: { line: n, character: 0 }
      }
    };
    e(xn({ meta: d }));
  }, u = Fe(
    (l) => {
      if (!i)
        return;
      const a = l.y, d = i.querySelectorAll(
        ".line-numbers-rows > span"
      ), f = Array.from(d).findIndex((h) => {
        const { height: p, y: m } = h.getBoundingClientRect();
        return a >= m && a <= m + p;
      });
      r(f);
    },
    [i]
  );
  return Ae(() => {
    if (!(!t || !i))
      return i.addEventListener("mousemove", u), () => {
        i.removeEventListener("mousemove", u);
      };
  }, [t, i, u]), !t || !i ? null : /* @__PURE__ */ w.jsx(
    Ro,
    {
      target: i,
      onClick: s,
      style: { top: n * 21.2 }
    }
  );
}, $c = Mc, kc = () => {
  const e = Ee(), t = se(
    (r) => r.codeblockLoaded
  ), o = Pn(), n = () => {
    const r = Vt();
    if (!r || r.length < 3) {
      console.error("Unable to find model parts", r);
      return;
    }
    console.log("model parts found", r);
    const i = {
      field: "description",
      filePath: "",
      // setting to empty string here and will be updated in conversationReducer when newConversation is set
      highlight: o == null ? void 0 : o.innerText,
      uniqueId: r[2],
      resource_type: r[1],
      range: {
        end: { line: 0, character: 0 },
        start: { line: 0, character: 0 }
      }
    };
    e(xn({ meta: i }));
  };
  return !t || !o ? null : /* @__PURE__ */ w.jsx(Ro, { target: o, onClick: n });
}, Lc = kc, Bc = () => /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
  /* @__PURE__ */ w.jsx(Lc, {}),
  /* @__PURE__ */ w.jsx($c, {})
] }), Hc = Bc, Uc = Qo(() => import("./DbtDocsRenderer.js")), zc = () => {
  const { loading: e, shareDetails: t } = Ea(), o = Ee(), { getHighlightedSelectionData: n, pos: r, onSelectionEnd: i } = Aa(), s = (u) => {
    u.stopPropagation();
    const c = n();
    c && o(xn(c));
  };
  return e ? /* @__PURE__ */ w.jsx("div", { children: "Loading..." }) : !(t != null && t.catalog_presigned_url) || !(t != null && t.manifest_presigned_url) ? /* @__PURE__ */ w.jsx("div", { children: "Unable to load required artifacts. Please try again." }) : /* @__PURE__ */ w.jsxs("div", { children: [
    /* @__PURE__ */ w.jsxs("div", { className: "d-flex justify-content-end mb-2", children: [
      /* @__PURE__ */ w.jsx(Hc, {}),
      /* @__PURE__ */ w.jsx(fa, {})
    ] }),
    /* @__PURE__ */ w.jsx(Pc, {}),
    /* @__PURE__ */ w.jsx(
      Uc,
      {
        shareDetails: t,
        onSelectionEnd: i
      }
    ),
    r ? /* @__PURE__ */ w.jsx(la, { pos: r, onAddComment: s }) : null
  ] });
}, qc = zc, Vc = ({ shareId: e, userId: t, conversationGroupId: o, source: n }) => /* @__PURE__ */ w.jsx("div", { className: "altimate-component", children: /* @__PURE__ */ w.jsx(
  is,
  {
    shareId: e,
    userId: t,
    conversationGroupId: o,
    source: n,
    children: /* @__PURE__ */ w.jsx(qc, {})
  }
) }), al = Vc;
export {
  rt as A,
  Co as C,
  al as D,
  se as a,
  el as b,
  tl as c,
  sl as d,
  jn as e,
  je as f,
  ai as g,
  ua as h,
  w as j,
  Qc as s,
  Ee as u
};
